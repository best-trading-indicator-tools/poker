use crate::{
    cards::{board_texture, postflop_bucket, preflop_class},
    config::SolverConfig,
    game::{AbstractAction, Deal, GameState, Street},
    provenance::{trainer_semantics_hash, CHECKPOINT_SCHEMA},
    rng::SolverRng,
};
use anyhow::{bail, Result};
use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct InfoNode {
    pub street: Street,
    pub actor: u8,
    pub hand_key: String,
    pub public_key: String,
    pub actions: Vec<AbstractAction>,
    pub regrets: Vec<f64>,
    pub strategy_sum: Vec<f64>,
    pub visits: u64,
    /// Number of simple-average updates contributing to `strategy_sum`.
    /// This differs from `visits`, which counts every regret and opponent pass.
    pub average_updates: u64,
}

impl InfoNode {
    fn new(
        street: Street,
        actor: u8,
        hand_key: String,
        public_key: String,
        actions: Vec<AbstractAction>,
    ) -> Self {
        let count = actions.len();
        Self {
            street,
            actor,
            hand_key,
            public_key,
            actions,
            regrets: vec![0.0; count],
            strategy_sum: vec![0.0; count],
            visits: 0,
            average_updates: 0,
        }
    }

    pub fn current_strategy(&self) -> Vec<f64> {
        let positive: Vec<f64> = self.regrets.iter().map(|regret| regret.max(0.0)).collect();
        let total: f64 = positive.iter().sum();
        if total > 1e-15 {
            positive.into_iter().map(|value| value / total).collect()
        } else {
            vec![1.0 / self.actions.len() as f64; self.actions.len()]
        }
    }

    pub fn average_strategy(&self) -> Option<Vec<f64>> {
        if self.average_updates == 0 {
            return None;
        }
        let total: f64 = self.strategy_sum.iter().sum();
        if total.is_finite() && total > 0.0 {
            Some(
                self.strategy_sum
                    .iter()
                    .map(|value| value / total)
                    .collect(),
            )
        } else {
            None
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct TrainingStats {
    pub traversals: u64,
    pub terminal_nodes: u64,
    pub action_nodes: u64,
    pub max_depth: u32,
    pub discounts_applied: u64,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct TrainingState {
    pub schema: u32,
    pub config: SolverConfig,
    pub model_hash: String,
    pub run_hash: String,
    pub trainer_semantics_hash: String,
    pub iteration: u64,
    pub rng_state: u64,
    pub infosets: BTreeMap<String, InfoNode>,
    pub stats: TrainingStats,
}

impl TrainingState {
    pub fn fresh(config: SolverConfig) -> Result<Self> {
        let model_hash = config.model_hash()?;
        let run_hash = config.run_hash()?;
        Ok(Self {
            schema: CHECKPOINT_SCHEMA,
            rng_state: config.seed,
            config,
            model_hash,
            run_hash,
            trainer_semantics_hash: trainer_semantics_hash(),
            iteration: 0,
            infosets: BTreeMap::new(),
            stats: TrainingStats::default(),
        })
    }

    pub fn verify(&self) -> Result<()> {
        if self.schema != CHECKPOINT_SCHEMA {
            bail!("unsupported checkpoint schema {}", self.schema);
        }
        self.config.validate()?;
        if self.config.model_hash()? != self.model_hash {
            bail!("checkpoint game/abstraction model hash mismatch");
        }
        if self.config.run_hash()? != self.run_hash {
            bail!("checkpoint run-provenance hash mismatch");
        }
        if trainer_semantics_hash() != self.trainer_semantics_hash {
            bail!(
                "checkpoint trainer-semantics hash mismatch; resume it with the exact trainer build that created it"
            );
        }
        let expected_traversals = self
            .iteration
            .checked_mul(self.config.players as u64)
            .ok_or_else(|| anyhow::anyhow!("checkpoint traversal count overflow"))?;
        if self.stats.traversals != expected_traversals {
            bail!(
                "checkpoint traversal count mismatch: expected {expected_traversals}, got {}",
                self.stats.traversals
            );
        }
        let expected_discounts = self.iteration / self.config.discount_every;
        if self.stats.discounts_applied != expected_discounts {
            bail!(
                "checkpoint discount count mismatch: expected {expected_discounts}, got {}",
                self.stats.discounts_applied
            );
        }
        if self.infosets.len() > self.config.max_infosets {
            bail!("checkpoint exceeds max_infosets");
        }
        for (key, node) in &self.infosets {
            let count = node.actions.len();
            if count == 0 || node.regrets.len() != count || node.strategy_sum.len() != count {
                bail!("malformed infoset {key}");
            }
            if node.actor >= self.config.players {
                bail!("out-of-range actor in infoset {key}");
            }
            if node.hand_key.is_empty() || node.public_key.is_empty() {
                bail!("empty information key component in infoset {key}");
            }
            let expected_key = format!(
                "{}|p{}|{}|{}",
                self.model_hash, node.actor, node.hand_key, node.public_key
            );
            if *key != expected_key {
                bail!("checkpoint infoset key/metadata mismatch at {key}");
            }
            if node.visits == 0 {
                bail!("zero-visit infoset {key}");
            }
            if node.average_updates > node.visits {
                bail!("average update count exceeds visits in infoset {key}");
            }
            if node.regrets.iter().any(|value| !value.is_finite()) {
                bail!("non-finite regret in infoset {key}");
            }
            let positive_regret_total: f64 = node.regrets.iter().map(|value| value.max(0.0)).sum();
            if !positive_regret_total.is_finite() {
                bail!("non-finite positive-regret total in infoset {key}");
            }
            if node
                .strategy_sum
                .iter()
                .any(|value| !value.is_finite() || *value < 0.0)
            {
                bail!("invalid cumulative strategy in infoset {key}");
            }
            let strategy_total: f64 = node.strategy_sum.iter().sum();
            if !strategy_total.is_finite() {
                bail!("non-finite cumulative-strategy total in infoset {key}");
            }
            if node.average_updates == 0 && strategy_total != 0.0 {
                bail!("strategy sum without an average update in infoset {key}");
            }
            if node.average_updates > 0 && strategy_total <= 0.0 {
                bail!("average updates without strategy mass in infoset {key}");
            }
            let mut unique = node.actions.clone();
            unique.sort();
            unique.dedup();
            if unique.len() != count {
                bail!("duplicate legal action in infoset {key}");
            }
        }
        Ok(())
    }
}

pub struct Trainer {
    pub state: TrainingState,
    rng: SolverRng,
}

struct InfoDescriptor {
    key: String,
    hand_key: String,
    public_key: String,
}

impl Trainer {
    pub fn fresh(config: SolverConfig) -> Result<Self> {
        let state = TrainingState::fresh(config)?;
        Ok(Self {
            rng: SolverRng::from_state(state.rng_state),
            state,
        })
    }

    pub fn resume(state: TrainingState) -> Result<Self> {
        state.verify()?;
        let rng = SolverRng::from_state(state.rng_state);
        Ok(Self { state, rng })
    }

    pub fn train_iterations(&mut self, iterations: u64) -> Result<()> {
        let target = self.state.iteration.saturating_add(iterations);
        while self.state.iteration < target {
            self.state.iteration += 1;
            let player_count = self.state.config.players as usize;
            for traverser in 0..player_count {
                let deal = Deal::sample(self.state.config.players, &mut self.rng);
                let game = GameState::new(&self.state.config);
                self.state.stats.traversals += 1;
                self.traverse(game, &deal, traverser, 0)?;
            }
            if self.state.iteration % self.state.config.discount_every == 0 {
                self.discount();
            }
            self.state.rng_state = self.rng.state();
        }
        Ok(())
    }

    fn infoset_parts(&self, game: &GameState, deal: &Deal, actor: usize) -> InfoDescriptor {
        let board = deal.board_for(game.street);
        // Preserve the sequence of abstract observations. Keeping only the
        // current street's bucket/texture would merge states a player can
        // distinguish from prior streets and create avoidable imperfect recall.
        let mut texture_path = 0u32;
        if game.street >= Street::Flop {
            texture_path |= board_texture(&deal.board[..3]) as u32;
        }
        if game.street >= Street::Turn {
            texture_path |= (board_texture(&deal.board[..4]) as u32) << 8;
        }
        if game.street >= Street::River {
            texture_path |= (board_texture(&deal.board[..5]) as u32) << 16;
        }
        let hand_key = if game.street == Street::Preflop {
            preflop_class(deal.hole[actor])
        } else {
            let mut key = preflop_class(deal.hole[actor]);
            key.push_str(&format!(
                "/f{}",
                postflop_bucket(
                    deal.hole[actor],
                    &deal.board[..3],
                    self.state.config.postflop_buckets
                )
            ));
            if game.street >= Street::Turn {
                key.push_str(&format!(
                    "/t{}",
                    postflop_bucket(
                        deal.hole[actor],
                        &deal.board[..4],
                        self.state.config.postflop_buckets
                    )
                ));
            }
            if game.street >= Street::River {
                key.push_str(&format!(
                    "/r{}",
                    postflop_bucket(deal.hole[actor], board, self.state.config.postflop_buckets)
                ));
            }
            key
        };
        let public_key = game.public_key(texture_path);
        let key = format!(
            "{}|p{}|{}|{}",
            self.state.model_hash, actor, hand_key, public_key
        );
        InfoDescriptor {
            key,
            hand_key,
            public_key,
        }
    }

    fn get_strategy(
        &mut self,
        info: &InfoDescriptor,
        street: Street,
        actor: usize,
        actions: &[AbstractAction],
    ) -> Result<Vec<f64>> {
        if !self.state.infosets.contains_key(&info.key) {
            if self.state.infosets.len() >= self.state.config.max_infosets {
                bail!("max_infosets={} reached; checkpoint and increase the explicit limit only after measuring memory",
                    self.state.config.max_infosets);
            }
            self.state.infosets.insert(
                info.key.clone(),
                InfoNode::new(
                    street,
                    actor as u8,
                    info.hand_key.clone(),
                    info.public_key.clone(),
                    actions.to_vec(),
                ),
            );
        }
        let node = self.state.infosets.get_mut(&info.key).unwrap();
        if node.actions != actions {
            bail!("action abstraction mismatch at infoset {}", info.key);
        }
        let strategy = node.current_strategy();
        node.visits = node
            .visits
            .checked_add(1)
            .ok_or_else(|| anyhow::anyhow!("visit counter overflow at infoset {}", info.key))?;
        Ok(strategy)
    }

    fn traverse(
        &mut self,
        game: GameState,
        deal: &Deal,
        traverser: usize,
        depth: u32,
    ) -> Result<f64> {
        self.state.stats.max_depth = self.state.stats.max_depth.max(depth);
        if game.terminal {
            self.state.stats.terminal_nodes += 1;
            return Ok(game.payoffs(&self.state.config, deal)[traverser] as f64
                / self.state.config.big_blind_units as f64);
        }
        self.state.stats.action_nodes += 1;
        let actor = game.actor().expect("nonterminal game without actor");
        let actions = game.legal_actions(&self.state.config);
        let info = self.infoset_parts(&game, deal, actor);
        let strategy = self.get_strategy(&info, game.street, actor, &actions)?;

        // External-sampling "simple average": update a player's cumulative
        // policy while that player is the sampled opponent. For N players, the
        // `(traverser + 1) mod N` convention gives every player one averaging
        // pass per outer iteration without pretending sampled reach is a full
        // tree reach probability.
        if actor == (traverser + 1) % self.state.config.players as usize {
            let node = self.state.infosets.get_mut(&info.key).unwrap();
            for (sum, probability) in node.strategy_sum.iter_mut().zip(&strategy) {
                *sum += probability;
            }
            node.average_updates = node.average_updates.checked_add(1).ok_or_else(|| {
                anyhow::anyhow!("average-update counter overflow at infoset {}", info.key)
            })?;
        }

        if actor == traverser {
            let mut utilities = Vec::with_capacity(actions.len());
            for action in &actions {
                let mut child = game.clone();
                child.apply(&self.state.config, *action);
                utilities.push(self.traverse(child, deal, traverser, depth + 1)?);
            }
            let node_utility: f64 = utilities
                .iter()
                .zip(&strategy)
                .map(|(utility, probability)| utility * probability)
                .sum();
            let node = self.state.infosets.get_mut(&info.key).unwrap();
            for (regret, utility) in node.regrets.iter_mut().zip(utilities) {
                *regret += utility - node_utility;
            }
            Ok(node_utility)
        } else {
            let choice = sample_strategy(&strategy, &mut self.rng);
            let mut child = game;
            child.apply(&self.state.config, actions[choice]);
            self.traverse(child, deal, traverser, depth + 1)
        }
    }

    fn discount(&mut self) {
        let period = (self.state.iteration / self.state.config.discount_every).max(1) as f64;
        let positive = period.powf(1.5) / (period.powf(1.5) + 1.0);
        let negative = 0.5; // DCFR beta=0
        let average = (period / (period + 1.0)).powf(2.0);
        for node in self.state.infosets.values_mut() {
            for regret in &mut node.regrets {
                *regret *= if *regret >= 0.0 { positive } else { negative };
            }
            for sum in &mut node.strategy_sum {
                *sum *= average;
            }
        }
        self.state.stats.discounts_applied += 1;
    }
}

fn sample_strategy(strategy: &[f64], rng: &mut SolverRng) -> usize {
    let roll = rng.unit_f64();
    let mut cumulative = 0.0;
    for (index, probability) in strategy.iter().enumerate() {
        cumulative += probability;
        if roll < cumulative || index + 1 == strategy.len() {
            return index;
        }
    }
    strategy.len() - 1
}

#[cfg(test)]
mod tests {
    use super::*;

    fn config(players: u8) -> SolverConfig {
        SolverConfig {
            name: format!("cfr-{players}"),
            players,
            stack_bb: 8,
            small_blind_units: 1,
            big_blind_units: 2,
            iterations: 2,
            seed: 1234,
            checkpoint_every: 1,
            discount_every: 1,
            max_non_all_in_raises_per_street: 1,
            preflop_open_bb: 3.0,
            preflop_reraise_multiplier: 3.0,
            postflop_bet_pot_fraction: 0.5,
            postflop_raise_pot_fraction: 0.75,
            postflop_buckets: 8,
            max_infosets: 200_000,
        }
    }

    #[test]
    fn training_is_deterministic_and_visits_postflop() {
        let mut a = Trainer::fresh(config(2)).unwrap();
        let mut b = Trainer::fresh(config(2)).unwrap();
        a.train_iterations(3).unwrap();
        b.train_iterations(3).unwrap();
        assert_eq!(
            serde_json::to_vec(&a.state).unwrap(),
            serde_json::to_vec(&b.state).unwrap()
        );
        assert!(a
            .state
            .infosets
            .values()
            .any(|node| node.street != Street::Preflop));
        a.state.verify().unwrap();
    }

    #[test]
    fn every_supported_table_size_runs_vector_payoff_traversals() {
        for players in 2..=9 {
            let mut trainer = Trainer::fresh(config(players)).unwrap();
            trainer.train_iterations(1).unwrap();
            assert_eq!(trainer.state.stats.traversals, players as u64);
            assert!(trainer.state.stats.terminal_nodes > 0);
            trainer.state.verify().unwrap();
        }
    }

    #[test]
    fn zero_average_nodes_do_not_fabricate_an_average_policy() {
        let mut node = InfoNode::new(
            Street::Preflop,
            0,
            "AA".into(),
            "public".into(),
            vec![AbstractAction::fold(), AbstractAction::call(2)],
        );
        node.regrets = vec![-1.0, 3.0];
        assert_eq!(node.current_strategy(), vec![0.0, 1.0]);
        assert!(node.average_strategy().is_none());

        node.strategy_sum = vec![0.25, 0.75];
        node.average_updates = 1;
        assert_eq!(node.average_strategy().unwrap(), vec![0.25, 0.75]);
    }

    #[test]
    fn verification_binds_trainer_and_rejects_invalid_strategy_mass() {
        let mut trainer = Trainer::fresh(config(2)).unwrap();
        trainer.train_iterations(1).unwrap();
        trainer.state.verify().unwrap();

        let mut wrong_build = trainer.state.clone();
        wrong_build.trainer_semantics_hash = "different-build".into();
        assert!(wrong_build.verify().is_err());

        let mut invalid_strategy = trainer.state.clone();
        invalid_strategy
            .infosets
            .values_mut()
            .next()
            .unwrap()
            .regrets[0] = -1.0;
        invalid_strategy.verify().unwrap();
        invalid_strategy
            .infosets
            .values_mut()
            .next()
            .unwrap()
            .strategy_sum[0] = -1.0;
        assert!(invalid_strategy.verify().is_err());
    }
}
