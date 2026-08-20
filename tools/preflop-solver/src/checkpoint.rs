use crate::cfr::TrainingState;
use anyhow::{Context, Result};
use std::{
    fs,
    io::{BufReader, BufWriter, Read, Write},
    path::{Path, PathBuf},
};

const CHECKPOINT_MAGIC: &[u8; 8] = b"PAICFR3\0";

fn temporary_path(path: &Path) -> PathBuf {
    let name = path
        .file_name()
        .and_then(|name| name.to_str())
        .unwrap_or("checkpoint");
    path.with_file_name(format!(".{name}.tmp"))
}

pub fn save_checkpoint(path: &Path, state: &TrainingState) -> Result<()> {
    state.verify()?;
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }
    let temporary = temporary_path(path);
    let file = fs::File::create(&temporary)
        .with_context(|| format!("creating checkpoint {}", temporary.display()))?;
    let mut writer = BufWriter::new(file);
    writer.write_all(CHECKPOINT_MAGIC)?;
    bincode::serialize_into(&mut writer, state)?;
    writer.flush()?;
    writer.get_ref().sync_all()?;
    fs::rename(&temporary, path)
        .with_context(|| format!("atomically replacing checkpoint {}", path.display()))?;
    Ok(())
}

pub fn load_checkpoint(path: &Path) -> Result<TrainingState> {
    let file =
        fs::File::open(path).with_context(|| format!("opening checkpoint {}", path.display()))?;
    let mut reader = BufReader::new(file);
    let mut magic = [0u8; 8];
    reader.read_exact(&mut magic)?;
    if &magic != CHECKPOINT_MAGIC {
        anyhow::bail!("{} is not a preflop solver checkpoint", path.display());
    }
    let state: TrainingState = bincode::deserialize_from(reader)
        .with_context(|| format!("parsing checkpoint {}", path.display()))?;
    state.verify()?;
    Ok(state)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{cfr::Trainer, config::SolverConfig};

    fn config() -> SolverConfig {
        SolverConfig {
            name: "checkpoint-test".into(),
            players: 2,
            stack_bb: 6,
            small_blind_units: 1,
            big_blind_units: 2,
            iterations: 1,
            seed: 99,
            checkpoint_every: 1,
            discount_every: 1,
            max_non_all_in_raises_per_street: 1,
            preflop_open_bb: 3.0,
            preflop_reraise_multiplier: 3.0,
            postflop_bet_pot_fraction: 0.5,
            postflop_raise_pot_fraction: 0.75,
            postflop_buckets: 8,
            max_infosets: 100_000,
        }
    }

    #[test]
    fn resume_is_bit_reproducible() {
        let directory = tempfile::tempdir().unwrap();
        let path = directory.path().join("state.bin");
        let mut uninterrupted = Trainer::fresh(config()).unwrap();
        uninterrupted.train_iterations(2).unwrap();

        let mut first = Trainer::fresh(config()).unwrap();
        first.train_iterations(1).unwrap();
        save_checkpoint(&path, &first.state).unwrap();
        let mut resumed = Trainer::resume(load_checkpoint(&path).unwrap()).unwrap();
        resumed.train_iterations(1).unwrap();
        assert_eq!(uninterrupted.state.iteration, resumed.state.iteration);
        assert_eq!(uninterrupted.state.rng_state, resumed.state.rng_state);
        assert_eq!(
            uninterrupted.state.stats.traversals,
            resumed.state.stats.traversals
        );
        assert_eq!(
            uninterrupted.state.stats.terminal_nodes,
            resumed.state.stats.terminal_nodes
        );
        assert_eq!(
            uninterrupted.state.stats.action_nodes,
            resumed.state.stats.action_nodes
        );
        assert_eq!(
            uninterrupted.state.stats.max_depth,
            resumed.state.stats.max_depth
        );
        assert_eq!(
            uninterrupted.state.stats.discounts_applied,
            resumed.state.stats.discounts_applied
        );
        assert_eq!(
            uninterrupted.state.infosets.keys().collect::<Vec<_>>(),
            resumed.state.infosets.keys().collect::<Vec<_>>()
        );
        for (key, expected) in &uninterrupted.state.infosets {
            let actual = &resumed.state.infosets[key];
            assert_eq!(expected.actions, actual.actions, "actions at {key}");
            assert_eq!(expected.visits, actual.visits, "visits at {key}");
            for (index, (a, b)) in expected.regrets.iter().zip(&actual.regrets).enumerate() {
                assert_eq!(
                    a.to_bits(),
                    b.to_bits(),
                    "regret {index} at {key}: {a} != {b}"
                );
            }
            for (index, (a, b)) in expected
                .strategy_sum
                .iter()
                .zip(&actual.strategy_sum)
                .enumerate()
            {
                assert_eq!(
                    a.to_bits(),
                    b.to_bits(),
                    "strategy sum {index} at {key}: {a} != {b}"
                );
            }
        }
    }
}
