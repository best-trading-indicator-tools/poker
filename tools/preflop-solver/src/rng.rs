use serde::{Deserialize, Serialize};

/// Small, fully serializable deterministic generator. SplitMix64 is adequate
/// for reproducible Monte Carlo sampling; it is not used for cryptography.
#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq)]
pub struct SolverRng {
    state: u64,
}

impl SolverRng {
    pub fn new(seed: u64) -> Self {
        Self { state: seed }
    }
    pub fn state(&self) -> u64 {
        self.state
    }
    pub fn from_state(state: u64) -> Self {
        Self { state }
    }

    pub fn next_u64(&mut self) -> u64 {
        self.state = self.state.wrapping_add(0x9E3779B97F4A7C15);
        let mut z = self.state;
        z = (z ^ (z >> 30)).wrapping_mul(0xBF58476D1CE4E5B9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94D049BB133111EB);
        z ^ (z >> 31)
    }

    pub fn index(&mut self, upper: usize) -> usize {
        debug_assert!(upper > 0);
        // Rejection avoids modulo bias without relying on platform RNG APIs.
        let zone = u64::MAX - u64::MAX % upper as u64;
        loop {
            let value = self.next_u64();
            if value < zone {
                return (value % upper as u64) as usize;
            }
        }
    }

    pub fn unit_f64(&mut self) -> f64 {
        const SCALE: f64 = 1.0 / ((1u64 << 53) as f64);
        ((self.next_u64() >> 11) as f64) * SCALE
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn state_round_trip_is_exact() {
        let mut a = SolverRng::new(42);
        for _ in 0..17 {
            a.next_u64();
        }
        let mut b = SolverRng::from_state(a.state());
        for _ in 0..100 {
            assert_eq!(a.next_u64(), b.next_u64());
        }
    }
}
