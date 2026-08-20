use crate::{
    cards::{evaluate, shuffled_deck, Card},
    config::SolverConfig,
    rng::SolverRng,
};
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord, Hash)]
#[serde(rename_all = "lowercase")]
pub enum Street {
    Preflop,
    Flop,
    Turn,
    River,
}

impl Street {
    pub fn board_len(self) -> usize {
        match self {
            Self::Preflop => 0,
            Self::Flop => 3,
            Self::Turn => 4,
            Self::River => 5,
        }
    }

    fn next(self) -> Option<Self> {
        match self {
            Self::Preflop => Some(Self::Flop),
            Self::Flop => Some(Self::Turn),
            Self::Turn => Some(Self::River),
            Self::River => None,
        }
    }
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord, Hash)]
#[serde(rename_all = "snake_case")]
pub enum ActionKind {
    Fold,
    Check,
    Call,
    RaiseTo,
    AllIn,
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct AbstractAction {
    pub kind: ActionKind,
    /// Total contribution on the current street after this action. Zero for
    /// fold/check; calls are resolved against the current bet.
    pub to_units: u32,
}

impl AbstractAction {
    pub fn fold() -> Self {
        Self {
            kind: ActionKind::Fold,
            to_units: 0,
        }
    }
    pub fn check() -> Self {
        Self {
            kind: ActionKind::Check,
            to_units: 0,
        }
    }
    pub fn call(to_units: u32) -> Self {
        Self {
            kind: ActionKind::Call,
            to_units,
        }
    }
    pub fn raise_to(to_units: u32) -> Self {
        Self {
            kind: ActionKind::RaiseTo,
            to_units,
        }
    }
    pub fn all_in(to_units: u32) -> Self {
        Self {
            kind: ActionKind::AllIn,
            to_units,
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct ActionRecord {
    pub street: Street,
    pub actor: u8,
    pub action: AbstractAction,
}

#[derive(Clone, Debug)]
pub struct Deal {
    pub hole: Vec<[Card; 2]>,
    pub board: [Card; 5],
}

impl Deal {
    pub fn sample(players: u8, rng: &mut SolverRng) -> Self {
        let deck = shuffled_deck(rng);
        let mut cursor = 0;
        let mut hole = Vec::with_capacity(players as usize);
        for _ in 0..players {
            hole.push([deck[cursor], deck[cursor + 1]]);
            cursor += 2;
        }
        let board = [
            deck[cursor],
            deck[cursor + 1],
            deck[cursor + 2],
            deck[cursor + 3],
            deck[cursor + 4],
        ];
        Self { hole, board }
    }

    pub fn board_for(&self, street: Street) -> &[Card] {
        &self.board[..street.board_len()]
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct PlayerState {
    pub stack: u32,
    pub street_put: u32,
    pub total_put: u32,
    pub folded: bool,
    pub all_in: bool,
    pub acted: bool,
    pub can_raise: bool,
}

impl PlayerState {
    fn new(stack: u32) -> Self {
        Self {
            stack,
            street_put: 0,
            total_put: 0,
            folded: false,
            all_in: false,
            acted: false,
            can_raise: true,
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct GameState {
    pub players: Vec<PlayerState>,
    pub button: u8,
    pub street: Street,
    pub to_act: Option<u8>,
    pub current_bet: u32,
    pub min_raise: u32,
    pub raises_this_street: u8,
    pub history: Vec<ActionRecord>,
    pub terminal: bool,
}

impl GameState {
    pub fn new(config: &SolverConfig) -> Self {
        let count = config.players as usize;
        let mut state = Self {
            players: (0..count)
                .map(|_| PlayerState::new(config.stack_units()))
                .collect(),
            button: 0,
            street: Street::Preflop,
            to_act: None,
            current_bet: config.big_blind_units,
            min_raise: config.big_blind_units,
            raises_this_street: 0,
            history: Vec::new(),
            terminal: false,
        };
        let small_blind = if count == 2 { 0 } else { 1 };
        let big_blind = if count == 2 { 1 } else { 2 };
        state.commit(small_blind, config.small_blind_units);
        state.commit(big_blind, config.big_blind_units);
        state.to_act = state.next_eligible(big_blind);
        state
    }

    fn commit(&mut self, seat: usize, requested: u32) -> u32 {
        let paid = requested.min(self.players[seat].stack);
        let player = &mut self.players[seat];
        player.stack -= paid;
        player.street_put += paid;
        player.total_put += paid;
        if player.stack == 0 {
            player.all_in = true;
            player.can_raise = false;
        }
        paid
    }

    pub fn pot(&self) -> u32 {
        self.players.iter().map(|p| p.total_put).sum()
    }
    pub fn live_count(&self) -> usize {
        self.players.iter().filter(|p| !p.folded).count()
    }
    pub fn actor(&self) -> Option<usize> {
        self.to_act.map(|x| x as usize)
    }

    fn next_eligible(&self, after: usize) -> Option<u8> {
        let count = self.players.len();
        for offset in 1..=count {
            let seat = (after + offset) % count;
            let player = &self.players[seat];
            if !player.folded
                && !player.all_in
                && (!player.acted || player.street_put < self.current_bet)
            {
                return Some(seat as u8);
            }
        }
        None
    }

    fn can_any_opponent_respond(&self, actor: usize) -> bool {
        self.players.iter().enumerate().any(|(seat, player)| {
            seat != actor && !player.folded && !player.all_in && player.stack > 0
        })
    }

    pub fn legal_actions(&self, config: &SolverConfig) -> Vec<AbstractAction> {
        let Some(actor) = self.actor() else {
            return Vec::new();
        };
        if self.terminal {
            return Vec::new();
        }
        let player = &self.players[actor];
        let call_amount = self
            .current_bet
            .saturating_sub(player.street_put)
            .min(player.stack);
        let mut actions = Vec::with_capacity(4);
        if call_amount > 0 {
            actions.push(AbstractAction::fold());
            actions.push(AbstractAction::call(player.street_put + call_amount));
        } else {
            actions.push(AbstractAction::check());
        }
        if !player.can_raise || !self.can_any_opponent_respond(actor) || player.stack <= call_amount
        {
            return actions;
        }

        let maximum = player.street_put + player.stack;
        let minimum = self.current_bet.saturating_add(self.min_raise);
        if self.raises_this_street < config.max_non_all_in_raises_per_street && maximum >= minimum {
            let desired = if self.street == Street::Preflop {
                if self.raises_this_street == 0 && self.current_bet <= config.big_blind_units {
                    (config.preflop_open_bb * config.big_blind_units as f64).round() as u32
                } else {
                    (self.current_bet as f64 * config.preflop_reraise_multiplier).round() as u32
                }
            } else if self.current_bet == 0 {
                (self.pot() as f64 * config.postflop_bet_pot_fraction).round() as u32
            } else {
                let pot_after_call = self.pot().saturating_add(call_amount);
                self.current_bet.saturating_add(
                    (pot_after_call as f64 * config.postflop_raise_pot_fraction).round() as u32,
                )
            };
            let target = desired.max(minimum).min(maximum);
            if target < maximum {
                actions.push(AbstractAction::raise_to(target));
            }
        }
        // The all-in branch is always explicit when it raises the price. It may
        // be a legal short raise and therefore need not satisfy `minimum`.
        if maximum > self.current_bet {
            actions.push(AbstractAction::all_in(maximum));
        }
        actions
    }

    pub fn apply(&mut self, config: &SolverConfig, action: AbstractAction) {
        let actor = self.actor().expect("cannot act at terminal state");
        assert!(
            self.legal_actions(config).contains(&action),
            "illegal abstract action: {action:?}"
        );
        let before_bet = self.current_bet;
        match action.kind {
            ActionKind::Fold => {
                self.players[actor].folded = true;
                self.players[actor].acted = true;
                self.players[actor].can_raise = false;
            }
            ActionKind::Check => {
                self.players[actor].acted = true;
                self.players[actor].can_raise = false;
            }
            ActionKind::Call => {
                let amount = self
                    .current_bet
                    .saturating_sub(self.players[actor].street_put);
                self.commit(actor, amount);
                self.players[actor].acted = true;
                self.players[actor].can_raise = false;
            }
            ActionKind::RaiseTo | ActionKind::AllIn => {
                let amount = action
                    .to_units
                    .saturating_sub(self.players[actor].street_put);
                self.commit(actor, amount);
                let raise_size = action.to_units.saturating_sub(before_bet);
                self.current_bet = action.to_units;
                self.players[actor].acted = true;
                self.players[actor].can_raise = false;
                if raise_size >= self.min_raise {
                    self.min_raise = raise_size;
                    self.raises_this_street = self.raises_this_street.saturating_add(1);
                    for (seat, player) in self.players.iter_mut().enumerate() {
                        if seat != actor && !player.folded && !player.all_in {
                            player.acted = false;
                            player.can_raise = true;
                        }
                    }
                }
            }
        }
        self.history.push(ActionRecord {
            street: self.street,
            actor: actor as u8,
            action,
        });
        self.finish_or_advance(config, actor);
    }

    fn finish_or_advance(&mut self, config: &SolverConfig, actor: usize) {
        if self.live_count() <= 1 {
            self.terminal = true;
            self.to_act = None;
            return;
        }
        if let Some(next) = self.next_eligible(actor) {
            self.to_act = Some(next);
            return;
        }
        let betting_players = self
            .players
            .iter()
            .filter(|p| !p.folded && !p.all_in)
            .count();
        if self.street == Street::River || betting_players <= 1 {
            self.terminal = true;
            self.to_act = None;
            return;
        }
        self.street = self.street.next().unwrap();
        self.current_bet = 0;
        self.min_raise = config.big_blind_units;
        self.raises_this_street = 0;
        for player in &mut self.players {
            player.street_put = 0;
            player.acted = player.folded || player.all_in;
            player.can_raise = !player.folded && !player.all_in;
        }
        self.to_act = self.next_eligible(self.button as usize);
        if self.to_act.is_none() {
            self.terminal = true;
        }
    }

    pub fn public_key(&self, board_texture_path: u32) -> String {
        let mut key = format!(
            "n{}|{:?}|b{}|t{}|c{}|m{}|r{}|x{}",
            self.players.len(),
            self.street,
            self.button,
            self.to_act.unwrap_or(255),
            self.current_bet,
            self.min_raise,
            self.raises_this_street,
            board_texture_path
        );
        for player in &self.players {
            key.push('|');
            key.push(if player.folded {
                'f'
            } else if player.all_in {
                'a'
            } else {
                'l'
            });
            key.push_str(&format!(
                ":{}:{}:{}:{}",
                player.stack, player.street_put, player.total_put, player.can_raise as u8
            ));
        }
        key.push_str("|h");
        for record in &self.history {
            let kind = match record.action.kind {
                ActionKind::Fold => 'f',
                ActionKind::Check => 'k',
                ActionKind::Call => 'c',
                ActionKind::RaiseTo => 'r',
                ActionKind::AllIn => 'a',
            };
            key.push_str(&format!(
                ".{}{}{}",
                record.actor, kind, record.action.to_units
            ));
        }
        key
    }

    pub fn payoffs(&self, config: &SolverConfig, deal: &Deal) -> Vec<i64> {
        assert!(self.terminal, "payoffs requested before terminal state");
        let count = self.players.len();
        let mut ending: Vec<i64> = self
            .players
            .iter()
            .map(|player| player.stack as i64)
            .collect();
        if self.live_count() == 1 {
            let winner = self
                .players
                .iter()
                .position(|player| !player.folded)
                .unwrap();
            ending[winner] += self.pot() as i64;
        } else {
            let mut levels: Vec<u32> = self
                .players
                .iter()
                .map(|player| player.total_put)
                .filter(|amount| *amount > 0)
                .collect();
            levels.sort_unstable();
            levels.dedup();
            let ranks: Vec<u64> = (0..count)
                .map(|seat| {
                    let mut seven = Vec::with_capacity(7);
                    seven.extend(deal.hole[seat]);
                    seven.extend(deal.board);
                    evaluate(&seven)
                })
                .collect();
            let mut previous = 0;
            for level in levels {
                let contributors: Vec<usize> = (0..count)
                    .filter(|seat| self.players[*seat].total_put >= level)
                    .collect();
                let amount = (level - previous) as i64 * contributors.len() as i64;
                previous = level;
                if amount == 0 {
                    continue;
                }
                let eligible: Vec<usize> = contributors
                    .iter()
                    .copied()
                    .filter(|seat| !self.players[*seat].folded)
                    .collect();
                if eligible.is_empty() {
                    // Defensive refund for an unreachable malformed layer.
                    let share = amount / contributors.len() as i64;
                    for seat in contributors {
                        ending[seat] += share;
                    }
                    continue;
                }
                let best = eligible.iter().map(|seat| ranks[*seat]).max().unwrap();
                let mut winners: Vec<usize> = eligible
                    .into_iter()
                    .filter(|seat| ranks[*seat] == best)
                    .collect();
                winners.sort_by_key(|seat| (seat + count - self.button as usize - 1) % count);
                let share = amount / winners.len() as i64;
                let remainder = amount % winners.len() as i64;
                for (index, seat) in winners.into_iter().enumerate() {
                    ending[seat] += share + i64::from((index as i64) < remainder);
                }
            }
        }
        ending
            .into_iter()
            .map(|chips| chips - config.stack_units() as i64)
            .collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn config(players: u8) -> SolverConfig {
        SolverConfig {
            name: "game-test".into(),
            players,
            stack_bb: 20,
            small_blind_units: 1,
            big_blind_units: 2,
            iterations: 10,
            seed: 7,
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

    fn passive_to_terminal(config: &SolverConfig, deal: &Deal) -> GameState {
        let mut state = GameState::new(config);
        let mut guard = 0;
        while !state.terminal {
            guard += 1;
            assert!(guard < 200);
            let actions = state.legal_actions(config);
            let action = actions
                .iter()
                .find(|a| matches!(a.kind, ActionKind::Check | ActionKind::Call))
                .copied()
                .unwrap();
            state.apply(config, action);
        }
        assert_eq!(state.street, Street::River);
        assert_eq!(state.payoffs(config, deal).iter().sum::<i64>(), 0);
        state
    }

    #[test]
    fn every_table_size_plays_a_real_hand_through_river() {
        for players in 2..=9 {
            let config = config(players);
            let mut rng = SolverRng::new(players as u64);
            let deal = Deal::sample(players, &mut rng);
            passive_to_terminal(&config, &deal);
        }
    }

    #[test]
    fn a_fold_awards_the_real_pot_and_conserves_chips() {
        let config = config(2);
        let mut rng = SolverRng::new(8);
        let deal = Deal::sample(2, &mut rng);
        let mut state = GameState::new(&config);
        state.apply(&config, AbstractAction::fold());
        assert!(state.terminal);
        let payoffs = state.payoffs(&config, &deal);
        assert_eq!(payoffs.iter().sum::<i64>(), 0);
        assert_eq!(payoffs, vec![-1, 1]);
    }

    #[test]
    fn showdown_builds_and_awards_main_and_side_pots() {
        let config = config(3);
        let card = |rank: u8, suit: u8| Card((rank - 2) * 4 + suit);
        let deal = Deal {
            hole: vec![
                [card(14, 0), card(14, 1)],
                [card(12, 0), card(12, 1)],
                [card(11, 0), card(11, 1)],
            ],
            board: [card(2, 0), card(3, 1), card(4, 2), card(9, 3), card(13, 0)],
        };
        let mut state = GameState::new(&config);
        // Seat 0 is all-in for 10 units and wins the 30-unit main pot.
        // Seat 1 beats seat 2 for their 20-unit side pot.
        for (seat, contribution) in [10u32, 20, 20].into_iter().enumerate() {
            state.players[seat].stack = config.stack_units() - contribution;
            state.players[seat].street_put = contribution;
            state.players[seat].total_put = contribution;
            state.players[seat].all_in = true;
            state.players[seat].acted = true;
            state.players[seat].can_raise = false;
        }
        state.street = Street::River;
        state.current_bet = 20;
        state.terminal = true;
        state.to_act = None;
        assert_eq!(state.payoffs(&config, &deal), vec![20, 0, -20]);
    }

    #[test]
    fn short_all_in_does_not_reopen_a_player_who_already_acted() {
        let config = config(3);
        let mut state = GameState::new(&config);
        // Seat 0 opens, seat 1 calls. Make seat 2 short enough to raise by less
        // than the last full raise, exercising the real reopening rule.
        let open = state
            .legal_actions(&config)
            .into_iter()
            .find(|a| a.kind == ActionKind::RaiseTo)
            .unwrap();
        state.apply(&config, open);
        let call = state
            .legal_actions(&config)
            .into_iter()
            .find(|a| a.kind == ActionKind::Call)
            .unwrap();
        state.apply(&config, call);
        let actor = state.actor().unwrap();
        state.players[actor].stack = state.current_bet - state.players[actor].street_put + 1;
        let jam = state
            .legal_actions(&config)
            .into_iter()
            .find(|a| a.kind == ActionKind::AllIn)
            .unwrap();
        state.apply(&config, jam);
        assert!(!state.players[0].can_raise);
        assert!(!state
            .legal_actions(&config)
            .iter()
            .any(|a| matches!(a.kind, ActionKind::RaiseTo | ActionKind::AllIn)));
    }
}
