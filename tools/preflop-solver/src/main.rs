use anyhow::{bail, Context, Result};
use clap::{Parser, Subcommand};
use poker_ai_preflop_solver::{
    cfr::Trainer,
    checkpoint::{load_checkpoint, save_checkpoint},
    config::SolverConfig,
    export::export_policy,
};
use serde_json::json;
use std::{
    path::{Path, PathBuf},
    time::Instant,
};

#[derive(Parser)]
#[command(
    name = "preflop-solver",
    version,
    about = "Local abstract-game NLHE blueprint trainer"
)]
struct Cli {
    #[command(subcommand)]
    command: Command,
}

#[derive(Subcommand)]
enum Command {
    /// Start a new deterministic training run. Existing checkpoints are refused.
    Train {
        #[arg(long)]
        config: PathBuf,
        #[arg(long)]
        checkpoint: PathBuf,
    },
    /// Resume a checkpoint only with its exact trainer semantics and RNG stream.
    Resume {
        #[arg(long)]
        checkpoint: PathBuf,
        #[arg(long)]
        additional_iterations: u64,
    },
    /// Export sampled preflop averages; zero-average rows are explicitly omitted.
    Export {
        #[arg(long)]
        checkpoint: PathBuf,
        #[arg(long)]
        out: PathBuf,
    },
    /// Validate and summarize a checkpoint without changing it.
    Inspect {
        #[arg(long)]
        checkpoint: PathBuf,
    },
    /// Run strict structural checks; this does not mark a strategy production-ready.
    Verify {
        #[arg(long)]
        checkpoint: PathBuf,
    },
}

fn train_chunks(trainer: &mut Trainer, total: u64, checkpoint: &Path) -> Result<()> {
    let started = Instant::now();
    let mut remaining = total;
    while remaining > 0 {
        let chunk = remaining.min(trainer.state.config.checkpoint_every);
        trainer.train_iterations(chunk)?;
        save_checkpoint(checkpoint, &trainer.state)?;
        remaining -= chunk;
        eprintln!(
            "iteration={} infosets={} traversals={} elapsed={:.1}s checkpoint={}",
            trainer.state.iteration,
            trainer.state.infosets.len(),
            trainer.state.stats.traversals,
            started.elapsed().as_secs_f64(),
            checkpoint.display()
        );
    }
    Ok(())
}

fn summary(trainer: &Trainer) -> serde_json::Value {
    let preflop = trainer
        .state
        .infosets
        .values()
        .filter(|node| node.street == poker_ai_preflop_solver::game::Street::Preflop)
        .count();
    json!({
        "schema": trainer.state.schema,
        "config": trainer.state.config.name,
        "players": trainer.state.config.players,
        "stack_bb": trainer.state.config.stack_bb,
        "iteration": trainer.state.iteration,
        "traversals": trainer.state.stats.traversals,
        "infosets": trainer.state.infosets.len(),
        "preflop_infosets": preflop,
        "terminal_nodes": trainer.state.stats.terminal_nodes,
        "max_depth": trainer.state.stats.max_depth,
        "model_hash": trainer.state.model_hash,
        "run_hash": trainer.state.run_hash,
        "trainer_semantics_hash": trainer.state.trainer_semantics_hash,
        "production_ready": false,
        "status": "unverified_research_output"
    })
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    match cli.command {
        Command::Train { config, checkpoint } => {
            if checkpoint.exists() {
                bail!(
                    "checkpoint {} already exists; use resume rather than overwriting it",
                    checkpoint.display()
                );
            }
            let config = SolverConfig::load(&config)?;
            let iterations = config.iterations;
            let mut trainer = Trainer::fresh(config)?;
            train_chunks(&mut trainer, iterations, &checkpoint)?;
            println!("{}", serde_json::to_string_pretty(&summary(&trainer))?);
        }
        Command::Resume {
            checkpoint,
            additional_iterations,
        } => {
            if additional_iterations == 0 {
                bail!("additional_iterations must be positive");
            }
            let state = load_checkpoint(&checkpoint)?;
            let mut trainer = Trainer::resume(state)?;
            train_chunks(&mut trainer, additional_iterations, &checkpoint)?;
            println!("{}", serde_json::to_string_pretty(&summary(&trainer))?);
        }
        Command::Export { checkpoint, out } => {
            let state = load_checkpoint(&checkpoint)?;
            let manifest = export_policy(&state, &out)?;
            println!("{}", serde_json::to_string_pretty(&manifest)?);
        }
        Command::Inspect { checkpoint } => {
            let trainer = Trainer::resume(load_checkpoint(&checkpoint)?)?;
            println!("{}", serde_json::to_string_pretty(&summary(&trainer))?);
        }
        Command::Verify { checkpoint } => {
            let state = load_checkpoint(&checkpoint).with_context(|| {
                format!("checkpoint verification failed: {}", checkpoint.display())
            })?;
            state.verify()?;
            println!(
                "structurally valid; production_ready=false; infosets={}",
                state.infosets.len()
            );
        }
    }
    Ok(())
}
