use crate::rng::SolverRng;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct Card(pub u8);

impl Card {
    pub fn rank(self) -> u8 {
        2 + self.0 / 4
    }
    pub fn suit(self) -> u8 {
        self.0 % 4
    }
}

pub fn shuffled_deck(rng: &mut SolverRng) -> [Card; 52] {
    let mut deck = std::array::from_fn(|index| Card(index as u8));
    for i in (1..deck.len()).rev() {
        let j = rng.index(i + 1);
        deck.swap(i, j);
    }
    deck
}

pub fn preflop_class(cards: [Card; 2]) -> String {
    const RANKS: &[u8] = b"23456789TJQKA";
    let high = cards[0].rank().max(cards[1].rank());
    let low = cards[0].rank().min(cards[1].rank());
    let mut result = String::with_capacity(3);
    result.push(RANKS[(high - 2) as usize] as char);
    result.push(RANKS[(low - 2) as usize] as char);
    if high != low {
        result.push(if cards[0].suit() == cards[1].suit() {
            's'
        } else {
            'o'
        });
    }
    result
}

fn encode_score(category: u8, kickers: &[u8]) -> u64 {
    let mut score = (category as u64) << 24;
    for (index, rank) in kickers.iter().take(5).enumerate() {
        score |= (*rank as u64) << (4 * (4 - index));
    }
    score
}

fn straight_high(counts: &[u8; 15]) -> u8 {
    let mut run = 0;
    for (rank, count) in counts.iter().enumerate().take(15).skip(2) {
        if *count > 0 {
            run += 1;
        } else {
            run = 0;
        }
        if run >= 5 {
            return rank as u8;
        }
    }
    if counts[14] > 0 && counts[2] > 0 && counts[3] > 0 && counts[4] > 0 && counts[5] > 0 {
        return 5;
    }
    0
}

pub fn evaluate_five(cards: [Card; 5]) -> u64 {
    let mut counts = [0u8; 15];
    let mut suits = [0u8; 4];
    for card in cards {
        counts[card.rank() as usize] += 1;
        suits[card.suit() as usize] += 1;
    }
    let flush_suit = suits.iter().position(|count| *count == 5);
    let flush = flush_suit.is_some();
    let high_straight = straight_high(&counts);
    // Keep the condition explicitly suit-scoped. `evaluate_five` receives only
    // five cards, so a flush already implies this, but the separate count makes
    // that invariant robust if the evaluator is generalized later.
    let straight_flush_high = flush_suit
        .map(|suit| {
            let mut suited_counts = [0u8; 15];
            for card in cards {
                if card.suit() as usize == suit {
                    suited_counts[card.rank() as usize] += 1;
                }
            }
            straight_high(&suited_counts)
        })
        .unwrap_or(0);
    if straight_flush_high > 0 {
        return encode_score(8, &[straight_flush_high]);
    }

    let mut groups: Vec<(u8, u8)> = (2..=14)
        .filter(|rank| counts[*rank] > 0)
        .map(|rank| (counts[rank], rank as u8))
        .collect();
    groups.sort_by(|a, b| b.cmp(a));
    if groups[0].0 == 4 {
        return encode_score(7, &[groups[0].1, groups[1].1]);
    }
    if groups[0].0 == 3 && groups[1].0 == 2 {
        return encode_score(6, &[groups[0].1, groups[1].1]);
    }
    let descending: Vec<u8> = (2..=14)
        .rev()
        .filter(|rank| counts[*rank] > 0)
        .map(|x| x as u8)
        .collect();
    if flush {
        return encode_score(5, &descending);
    }
    if high_straight > 0 {
        return encode_score(4, &[high_straight]);
    }
    if groups[0].0 == 3 {
        let mut kickers = vec![groups[0].1];
        kickers.extend(
            descending
                .iter()
                .copied()
                .filter(|rank| *rank != groups[0].1)
                .take(2),
        );
        return encode_score(3, &kickers);
    }
    let pairs: Vec<u8> = groups.iter().filter(|x| x.0 == 2).map(|x| x.1).collect();
    if pairs.len() >= 2 {
        let high = pairs[0].max(pairs[1]);
        let low = pairs[0].min(pairs[1]);
        let kicker = descending
            .iter()
            .copied()
            .find(|rank| *rank != high && *rank != low)
            .unwrap();
        return encode_score(2, &[high, low, kicker]);
    }
    if pairs.len() == 1 {
        let pair = pairs[0];
        let mut kickers = vec![pair];
        kickers.extend(
            descending
                .iter()
                .copied()
                .filter(|rank| *rank != pair)
                .take(3),
        );
        return encode_score(1, &kickers);
    }
    encode_score(0, &descending)
}

pub fn evaluate(cards: &[Card]) -> u64 {
    assert!((5..=7).contains(&cards.len()));
    let mut best = 0;
    for a in 0..cards.len() - 4 {
        for b in a + 1..cards.len() - 3 {
            for c in b + 1..cards.len() - 2 {
                for d in c + 1..cards.len() - 1 {
                    for e in d + 1..cards.len() {
                        best = best.max(evaluate_five([
                            cards[a], cards[b], cards[c], cards[d], cards[e],
                        ]));
                    }
                }
            }
        }
    }
    best
}

pub fn board_texture(board: &[Card]) -> u16 {
    let mut ranks = [0u8; 15];
    let mut suits = [0u8; 4];
    for card in board {
        ranks[card.rank() as usize] += 1;
        suits[card.suit() as usize] += 1;
    }
    let paired = ranks.iter().any(|count| *count >= 2) as u16;
    let trips = ranks.iter().any(|count| *count >= 3) as u16;
    let max_suit = *suits.iter().max().unwrap_or(&0) as u16;
    let rank_mask = (2..=14).fold(0u16, |mask, rank| {
        mask | ((ranks[rank] > 0) as u16) << (rank - 2)
    });
    let mut connected = 0u16;
    for start in 0..=8 {
        let window = (rank_mask >> start) & 0x1f;
        connected = connected.max(window.count_ones() as u16);
    }
    paired | (trips << 1) | (max_suit.min(4) << 2) | (connected.min(5) << 5)
}

pub fn postflop_bucket(hole: [Card; 2], board: &[Card], buckets: u16) -> u16 {
    let mut all = Vec::with_capacity(2 + board.len());
    all.extend(hole);
    all.extend_from_slice(board);
    let score = evaluate(&all);
    let category = (score >> 24) as u16;
    let kicker_signature = ((score >> 8) ^ score) as u16;
    let texture = board_texture(board);
    let made_band = category * buckets / 9;
    let band_width = (buckets / 9).max(1);
    (made_band + ((kicker_signature ^ texture.wrapping_mul(31)) % band_width)).min(buckets - 1)
}

#[cfg(test)]
mod tests {
    use super::*;

    fn c(rank: u8, suit: u8) -> Card {
        Card((rank - 2) * 4 + suit)
    }

    #[test]
    fn evaluator_orders_categories() {
        let straight_flush = evaluate_five([c(14, 0), c(13, 0), c(12, 0), c(11, 0), c(10, 0)]);
        let quads = evaluate_five([c(9, 0), c(9, 1), c(9, 2), c(9, 3), c(14, 0)]);
        let full_house = evaluate_five([c(8, 0), c(8, 1), c(8, 2), c(7, 0), c(7, 1)]);
        assert!(straight_flush > quads && quads > full_house);
    }

    #[test]
    fn evaluator_chooses_best_five_of_seven() {
        let royal = evaluate(&[
            c(14, 0),
            c(13, 0),
            c(12, 0),
            c(11, 0),
            c(10, 0),
            c(2, 1),
            c(2, 2),
        ]);
        assert_eq!(royal >> 24, 8);
    }

    #[test]
    fn flush_plus_off_suit_straight_is_not_a_straight_flush() {
        let score = evaluate(&[
            c(14, 0),
            c(13, 0),
            c(12, 0),
            c(7, 0),
            c(2, 0),
            c(11, 1),
            c(10, 2),
        ]);
        // This seven-card example has an ace-high club flush and an ace-high
        // straight completed off-suit, but no five-card straight flush.
        assert_eq!(score >> 24, 5);
    }

    #[test]
    fn preflop_classes_respect_suit_symmetry() {
        assert_eq!(preflop_class([c(14, 0), c(13, 0)]), "AKs");
        assert_eq!(preflop_class([c(14, 0), c(13, 1)]), "AKo");
        assert_eq!(preflop_class([c(12, 0), c(12, 1)]), "QQ");
    }
}
