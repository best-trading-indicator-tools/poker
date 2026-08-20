use crate::{
    cfr::{InfoNode, TrainingState},
    game::{AbstractAction, Street},
    provenance::{
        TRAINER_ALGORITHM_ID, TRAINER_BUILD_CONFIGURATION, TRAINER_RUSTC_VERSION,
        TRAINER_SOURCE_SHA256, TRAINER_TARGET_TRIPLE,
    },
};
use anyhow::{bail, Context, Result};
use serde::Serialize;
use sha2::{Digest, Sha256};
use std::{
    collections::BTreeMap,
    fs,
    io::{BufWriter, Write},
    path::Path,
};

#[derive(Clone, Debug, Serialize)]
pub struct HandPolicy {
    pub frequencies: Vec<f64>,
    pub visits: u64,
    pub average_updates: u64,
}

#[derive(Clone, Debug, Serialize)]
pub struct PolicyNode {
    pub actor: u8,
    pub public_key: String,
    pub actions: Vec<AbstractAction>,
    pub hands: BTreeMap<String, HandPolicy>,
}

#[derive(Clone, Debug, Serialize)]
pub struct PolicyPack {
    pub schema: &'static str,
    pub model_hash: String,
    pub table_size: u8,
    pub stack_bb: u32,
    pub small_blind_bb: f64,
    pub big_blind_bb: f64,
    pub ante_bb: f64,
    pub rake_percent: f64,
    pub nodes: Vec<PolicyNode>,
}

#[derive(Clone, Debug, Serialize)]
pub struct Manifest {
    pub schema: &'static str,
    pub pack_file: &'static str,
    pub pack_sha256: String,
    pub config: crate::config::SolverConfig,
    pub model_hash: String,
    pub run_hash: String,
    pub trainer_semantics_hash: String,
    pub trainer_source_sha256: &'static str,
    pub trainer_target_triple: &'static str,
    pub trainer_rustc_version: &'static str,
    pub trainer_build_configuration: &'static str,
    pub algorithm: &'static str,
    pub payoff_model: &'static str,
    pub private_card_model: &'static str,
    pub postflop_model: &'static str,
    pub iterations: u64,
    pub traversals: u64,
    pub infosets: usize,
    pub visited_preflop_infosets: usize,
    pub exported_preflop_infosets: usize,
    pub omitted_zero_average_preflop_infosets: usize,
    pub exported_public_preflop_nodes: usize,
    pub seed: u64,
    pub final_rng_state: u64,
    pub target_arch: &'static str,
    pub trainer_commit: &'static str,
    pub continuation_model: &'static str,
    pub continuation_model_sha256: Option<String>,
    pub production_ready: bool,
    pub verification_status: &'static str,
    pub nash_conv_mbb_per_hand: Option<f64>,
    pub nash_conv_ci95_upper_mbb_per_hand: Option<f64>,
    pub average_external_regret_mbb_per_hand: Option<f64>,
    pub max_deviation_gain_mbb_per_hand: Option<f64>,
    pub deviation_gain_ci95_upper_mbb_per_hand: Option<f64>,
    pub independent_seeds: u32,
    pub seed_strategy_l1_max: Option<f64>,
    pub blockers: Vec<String>,
}

struct PendingNode {
    actor: u8,
    public_key: String,
    actions: Vec<AbstractAction>,
    hands: BTreeMap<String, HandPolicy>,
}

pub fn normalize_strategy(strategy: &[f64]) -> Vec<f64> {
    if strategy.is_empty() {
        return Vec::new();
    }
    let total: f64 = strategy
        .iter()
        .copied()
        .filter(|value| value.is_finite() && *value > 0.0)
        .sum();
    if total > 0.0 {
        strategy
            .iter()
            .map(|value| {
                if value.is_finite() {
                    value.max(0.0) / total
                } else {
                    0.0
                }
            })
            .collect()
    } else {
        vec![1.0 / strategy.len() as f64; strategy.len()]
    }
}

fn add_node(groups: &mut BTreeMap<String, PendingNode>, node: &InfoNode) -> Result<()> {
    let group_key = format!("p{}|{}", node.actor, node.public_key);
    let pending = groups.entry(group_key).or_insert_with(|| PendingNode {
        actor: node.actor,
        public_key: node.public_key.clone(),
        actions: node.actions.clone(),
        hands: BTreeMap::new(),
    });
    if pending.actions != node.actions {
        bail!("inconsistent actions while grouping {}", node.public_key);
    }
    if pending
        .hands
        .insert(
            node.hand_key.clone(),
            HandPolicy {
                frequencies: normalize_strategy(&node.average_strategy().ok_or_else(|| {
                    anyhow::anyhow!(
                        "refusing to label zero-update policy as an average at {}",
                        node.public_key
                    )
                })?),
                visits: node.visits,
                average_updates: node.average_updates,
            },
        )
        .is_some()
    {
        bail!(
            "duplicate hand policy {} at {}",
            node.hand_key,
            node.public_key
        );
    }
    Ok(())
}

pub fn export_policy(state: &TrainingState, output: &Path) -> Result<Manifest> {
    state.verify()?;
    fs::create_dir_all(output)
        .with_context(|| format!("creating export directory {}", output.display()))?;
    let mut groups = BTreeMap::new();
    let mut visited_preflop_infosets = 0;
    let mut exported_preflop_infosets = 0;
    let mut omitted_zero_average_preflop_infosets = 0;
    for node in state
        .infosets
        .values()
        .filter(|node| node.street == Street::Preflop)
    {
        visited_preflop_infosets += 1;
        if node.average_updates == 0 {
            omitted_zero_average_preflop_infosets += 1;
            continue;
        }
        add_node(&mut groups, node)?;
        exported_preflop_infosets += 1;
    }
    if visited_preflop_infosets == 0 {
        bail!("checkpoint has no visited preflop policies");
    }
    if exported_preflop_infosets == 0 {
        bail!("checkpoint has no preflop policy with an average-policy update");
    }
    let nodes: Vec<PolicyNode> = groups
        .into_values()
        .map(|node| PolicyNode {
            actor: node.actor,
            public_key: node.public_key,
            actions: node.actions,
            hands: node.hands,
        })
        .collect();
    let pack = PolicyPack {
        schema: "poker-ai-local-preflop-policy-v2",
        model_hash: state.model_hash.clone(),
        table_size: state.config.players,
        stack_bb: state.config.stack_bb,
        small_blind_bb: state.config.small_blind_units as f64 / state.config.big_blind_units as f64,
        big_blind_bb: 1.0,
        ante_bb: 0.0,
        rake_percent: 0.0,
        nodes,
    };
    let pack_path = output.join("policy.json");
    let file = fs::File::create(&pack_path)?;
    let mut writer = BufWriter::new(file);
    serde_json::to_writer(&mut writer, &pack)?;
    writer.flush()?;
    let pack_bytes = fs::read(&pack_path)?;
    let pack_sha256 = hex::encode(Sha256::digest(&pack_bytes));
    let manifest = Manifest {
        schema: "poker-ai-local-preflop-manifest-v2",
        pack_file: "policy.json",
        pack_sha256,
        config: state.config.clone(),
        model_hash: state.model_hash.clone(),
        run_hash: state.run_hash.clone(),
        trainer_semantics_hash: state.trainer_semantics_hash.clone(),
        trainer_source_sha256: TRAINER_SOURCE_SHA256,
        trainer_target_triple: TRAINER_TARGET_TRIPLE,
        trainer_rustc_version: TRAINER_RUSTC_VERSION,
        trainer_build_configuration: TRAINER_BUILD_CONFIGURATION,
        algorithm: TRAINER_ALGORITHM_ID,
        payoff_model: "full-hand-fold-showdown-side-pot-chip-ev",
        private_card_model: "exact-deal-sampling-with-169-class-lossless-preflop-suit-symmetry",
        postflop_model: "sampled-runout-board-aware-hand-buckets-and-discrete-betting",
        iterations: state.iteration,
        traversals: state.stats.traversals,
        infosets: state.infosets.len(),
        visited_preflop_infosets,
        exported_preflop_infosets,
        omitted_zero_average_preflop_infosets,
        exported_public_preflop_nodes: pack.nodes.len(),
        seed: state.config.seed,
        final_rng_state: state.rng_state,
        target_arch: std::env::consts::ARCH,
        trainer_commit: option_env!("PREFLOP_SOLVER_GIT_COMMIT").unwrap_or("uncommitted"),
        continuation_model: "none; sampled hands play the abstract game through river",
        continuation_model_sha256: None,
        production_ready: false,
        verification_status: "unverified_research_output",
        nash_conv_mbb_per_hand: None,
        nash_conv_ci95_upper_mbb_per_hand: None,
        average_external_regret_mbb_per_hand: None,
        max_deviation_gain_mbb_per_hand: None,
        deviation_gain_ci95_upper_mbb_per_hand: None,
        independent_seeds: 1,
        seed_strategy_l1_max: None,
        blockers: vec![
            "no exploitability or deviation-gain acceptance test has passed".into(),
            "postflop cards and actions are abstracted".into(),
            "only visited nodes and hand classes with at least one average-policy update are exported"
                .into(),
            "three-plus-player CFR has no two-player zero-sum Nash convergence guarantee".into(),
            "the in-memory sparse infoset store is not sized for production table-wide training"
                .into(),
        ],
    };
    let manifest_path = output.join("manifest.json");
    let file = fs::File::create(&manifest_path)?;
    let mut writer = BufWriter::new(file);
    serde_json::to_writer_pretty(&mut writer, &manifest)?;
    writer.write_all(b"\n")?;
    writer.flush()?;
    Ok(manifest)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{cfr::Trainer, config::SolverConfig};

    #[test]
    fn exported_rows_normalize_without_erasing_tiny_mixes() {
        for strategy in [
            &[0.5, 0.5][..],
            &[1e-12, 0.2, 0.8 - 1e-12][..],
            &[0.0, 0.0, 0.0][..],
        ] {
            let row = normalize_strategy(strategy);
            assert!((row.iter().sum::<f64>() - 1.0).abs() < 1e-12);
            assert!(row.iter().all(|value| value.is_finite() && *value >= 0.0));
        }
        assert!(normalize_strategy(&[1e-12, 1.0 - 1e-12])[0] > 0.0);
    }

    #[test]
    fn export_omits_rows_without_an_average_update() {
        let config = SolverConfig {
            name: "export-average-test".into(),
            players: 2,
            stack_bb: 6,
            small_blind_units: 1,
            big_blind_units: 2,
            iterations: 1,
            seed: 991,
            checkpoint_every: 1,
            discount_every: 1,
            max_non_all_in_raises_per_street: 1,
            preflop_open_bb: 3.0,
            preflop_reraise_multiplier: 3.0,
            postflop_bet_pot_fraction: 0.5,
            postflop_raise_pot_fraction: 0.75,
            postflop_buckets: 8,
            max_infosets: 100_000,
        };
        let mut trainer = Trainer::fresh(config).unwrap();
        trainer.train_iterations(1).unwrap();
        let preflop: Vec<_> = trainer
            .state
            .infosets
            .values()
            .filter(|node| node.street == Street::Preflop)
            .collect();
        let zero_average = preflop
            .iter()
            .filter(|node| node.average_updates == 0)
            .count();
        assert!(zero_average > 0);
        assert!(preflop.iter().any(|node| node.average_updates > 0));

        let directory = tempfile::tempdir().unwrap();
        let manifest = export_policy(&trainer.state, directory.path()).unwrap();
        assert!(!manifest.production_ready);
        assert_eq!(manifest.visited_preflop_infosets, preflop.len());
        assert_eq!(manifest.omitted_zero_average_preflop_infosets, zero_average);
        assert_eq!(
            manifest.exported_preflop_infosets + zero_average,
            preflop.len()
        );

        let policy: serde_json::Value =
            serde_json::from_slice(&fs::read(directory.path().join("policy.json")).unwrap())
                .unwrap();
        for node in policy["nodes"].as_array().unwrap() {
            for hand in node["hands"].as_object().unwrap().values() {
                assert!(hand["average_updates"].as_u64().unwrap() > 0);
            }
        }
    }
}
