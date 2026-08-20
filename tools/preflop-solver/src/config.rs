use anyhow::{bail, Context, Result};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::{fs, path::Path};

fn default_small_blind() -> u32 {
    1
}
fn default_big_blind() -> u32 {
    2
}
fn default_iterations() -> u64 {
    100_000
}
fn default_seed() -> u64 {
    73_918_241
}
fn default_checkpoint_every() -> u64 {
    10_000
}
fn default_discount_every() -> u64 {
    1_000
}
fn default_max_raises() -> u8 {
    2
}
fn default_open_bb() -> f64 {
    3.0
}
fn default_reraise_multiplier() -> f64 {
    3.0
}
fn default_bet_fraction() -> f64 {
    0.5
}
fn default_raise_fraction() -> f64 {
    0.75
}
fn default_postflop_buckets() -> u16 {
    64
}
fn default_max_infosets() -> usize {
    2_000_000
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct SolverConfig {
    pub name: String,
    pub players: u8,
    pub stack_bb: u32,
    #[serde(default = "default_small_blind")]
    pub small_blind_units: u32,
    #[serde(default = "default_big_blind")]
    pub big_blind_units: u32,
    #[serde(default = "default_iterations")]
    pub iterations: u64,
    #[serde(default = "default_seed")]
    pub seed: u64,
    #[serde(default = "default_checkpoint_every")]
    pub checkpoint_every: u64,
    #[serde(default = "default_discount_every")]
    pub discount_every: u64,
    /// Cap on ordinary abstract raises. The explicit all-in branch is never
    /// removed by this cap; see `GameState::legal_actions`.
    #[serde(default = "default_max_raises", alias = "max_raises_per_street")]
    pub max_non_all_in_raises_per_street: u8,
    #[serde(default = "default_open_bb")]
    pub preflop_open_bb: f64,
    #[serde(default = "default_reraise_multiplier")]
    pub preflop_reraise_multiplier: f64,
    #[serde(default = "default_bet_fraction")]
    pub postflop_bet_pot_fraction: f64,
    #[serde(default = "default_raise_fraction")]
    pub postflop_raise_pot_fraction: f64,
    #[serde(default = "default_postflop_buckets")]
    pub postflop_buckets: u16,
    #[serde(default = "default_max_infosets")]
    pub max_infosets: usize,
}

impl SolverConfig {
    pub fn load(path: &Path) -> Result<Self> {
        let text = fs::read_to_string(path)
            .with_context(|| format!("reading config {}", path.display()))?;
        let config: Self =
            toml::from_str(&text).with_context(|| format!("parsing config {}", path.display()))?;
        config.validate()?;
        Ok(config)
    }

    pub fn validate(&self) -> Result<()> {
        if !(2..=9).contains(&self.players) {
            bail!("players must be between 2 and 9, got {}", self.players);
        }
        if self.stack_bb < 2 || self.stack_bb > 1_000 {
            bail!("stack_bb must be between 2 and 1000");
        }
        if self.small_blind_units == 0 || self.big_blind_units <= self.small_blind_units {
            bail!("blinds must be positive and big blind must exceed small blind");
        }
        if self.iterations == 0 || self.checkpoint_every == 0 || self.discount_every == 0 {
            bail!("iteration and checkpoint/discount intervals must be positive");
        }
        if self.max_non_all_in_raises_per_street == 0 || self.max_non_all_in_raises_per_street > 8 {
            bail!("max_non_all_in_raises_per_street must be in 1..=8");
        }
        if !(2.0..=5.0).contains(&self.preflop_open_bb)
            || !(2.0..=5.0).contains(&self.preflop_reraise_multiplier)
        {
            bail!("preflop sizing abstraction is outside its supported bounds");
        }
        if !(0.1..=2.0).contains(&self.postflop_bet_pot_fraction)
            || !(0.1..=2.0).contains(&self.postflop_raise_pot_fraction)
        {
            bail!("postflop pot fractions must be in 0.1..=2.0");
        }
        if !(4..=512).contains(&self.postflop_buckets) {
            bail!("postflop_buckets must be in 4..=512");
        }
        if self.max_infosets < 1_000 {
            bail!("max_infosets must be at least 1000");
        }
        Ok(())
    }

    pub fn stack_units(&self) -> u32 {
        self.stack_bb.saturating_mul(self.big_blind_units)
    }

    pub fn model_hash(&self) -> Result<String> {
        // Training budget, seed, checkpoint cadence, and memory ceiling are run
        // provenance. They must not change the identity of the poker game.
        let contract = serde_json::json!({
            "schema": 1,
            "game_engine_version": 1,
            "action_abstraction_version": 1,
            "card_abstraction_version": 1,
            "players": self.players,
            "stack_bb": self.stack_bb,
            "small_blind_units": self.small_blind_units,
            "big_blind_units": self.big_blind_units,
            "ante_units": 0,
            "rake_percent": 0,
            "max_non_all_in_raises_per_street": self.max_non_all_in_raises_per_street,
            "preflop_open_bb": self.preflop_open_bb,
            "preflop_reraise_multiplier": self.preflop_reraise_multiplier,
            "postflop_bet_pot_fraction": self.postflop_bet_pot_fraction,
            "postflop_raise_pot_fraction": self.postflop_raise_pot_fraction,
            "postflop_buckets": self.postflop_buckets,
        });
        let bytes = serde_json::to_vec(&contract)?;
        Ok(hex::encode(Sha256::digest(bytes)))
    }

    pub fn run_hash(&self) -> Result<String> {
        let bytes = serde_json::to_vec(self)?;
        Ok(hex::encode(Sha256::digest(bytes)))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn config(players: u8) -> SolverConfig {
        SolverConfig {
            name: "test".into(),
            players,
            stack_bb: 100,
            small_blind_units: 1,
            big_blind_units: 2,
            iterations: 10,
            seed: 1,
            checkpoint_every: 5,
            discount_every: 5,
            max_non_all_in_raises_per_street: 2,
            preflop_open_bb: 3.0,
            preflop_reraise_multiplier: 3.0,
            postflop_bet_pot_fraction: 0.5,
            postflop_raise_pot_fraction: 0.75,
            postflop_buckets: 16,
            max_infosets: 100_000,
        }
    }

    #[test]
    fn accepts_every_supported_table_size() {
        for players in 2..=9 {
            config(players).validate().unwrap();
        }
    }

    #[test]
    fn rejects_out_of_scope_table_sizes() {
        assert!(config(1).validate().is_err());
        assert!(config(10).validate().is_err());
    }

    #[test]
    fn model_identity_excludes_run_budget_and_seed() {
        let a = config(6);
        let mut b = a.clone();
        b.iterations *= 10;
        b.seed += 1;
        b.checkpoint_every += 7;
        b.max_infosets *= 2;
        assert_eq!(a.model_hash().unwrap(), b.model_hash().unwrap());
        assert_ne!(a.run_hash().unwrap(), b.run_hash().unwrap());
    }
}
