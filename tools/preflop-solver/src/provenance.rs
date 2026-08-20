use sha2::{Digest, Sha256};

pub const CHECKPOINT_SCHEMA: u32 = 3;
pub const TRAINER_ALGORITHM_ID: &str = "external-sampling-mccfr-simple-average-periodic-dcfr-v1";
pub const TRAINER_SOURCE_SHA256: &str = env!("PREFLOP_SOLVER_SOURCE_SHA256");
pub const TRAINER_TARGET_TRIPLE: &str = env!("PREFLOP_SOLVER_TARGET_TRIPLE");
pub const TRAINER_RUSTC_VERSION: &str = env!("PREFLOP_SOLVER_RUSTC_VERSION");
pub const TRAINER_BUILD_CONFIGURATION: &str = env!("PREFLOP_SOLVER_BUILD_CONFIGURATION");

/// Fingerprint the executable semantics that may affect a continued run.
///
/// This deliberately binds more than the abstract poker model: exact solver
/// source, locked dependencies, target, toolchain, algorithm contract, package
/// version, and checkpoint schema. A source or toolchain change therefore
/// requires a new run rather than silently resuming incompatible regrets.
pub fn trainer_semantics_hash() -> String {
    let mut hasher = Sha256::new();
    for component in [
        "poker-ai-preflop-trainer-semantics-v1",
        TRAINER_ALGORITHM_ID,
        TRAINER_SOURCE_SHA256,
        TRAINER_TARGET_TRIPLE,
        TRAINER_RUSTC_VERSION,
        TRAINER_BUILD_CONFIGURATION,
        env!("CARGO_PKG_VERSION"),
        &CHECKPOINT_SCHEMA.to_string(),
    ] {
        hasher.update((component.len() as u64).to_le_bytes());
        hasher.update(component.as_bytes());
    }
    hex::encode(hasher.finalize())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn build_identity_is_present_and_stable() {
        assert_eq!(TRAINER_SOURCE_SHA256.len(), 64);
        assert!(!std::hint::black_box(TRAINER_TARGET_TRIPLE).is_empty());
        assert!(!std::hint::black_box(TRAINER_RUSTC_VERSION).is_empty());
        assert!(!std::hint::black_box(TRAINER_BUILD_CONFIGURATION).is_empty());
        assert_eq!(trainer_semantics_hash(), trainer_semantics_hash());
    }
}
