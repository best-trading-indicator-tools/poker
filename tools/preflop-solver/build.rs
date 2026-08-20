use sha2::{Digest, Sha256};
use std::{
    env, fs,
    path::{Path, PathBuf},
    process::Command,
};

fn source_files(manifest_dir: &Path) -> Vec<PathBuf> {
    let mut files = vec![
        manifest_dir.join("build.rs"),
        manifest_dir.join("Cargo.toml"),
        manifest_dir.join("Cargo.lock"),
    ];
    let mut rust_sources: Vec<PathBuf> = fs::read_dir(manifest_dir.join("src"))
        .expect("reading solver source directory")
        .map(|entry| entry.expect("reading solver source entry").path())
        .filter(|path| path.extension().is_some_and(|extension| extension == "rs"))
        .collect();
    rust_sources.sort();
    files.extend(rust_sources);
    files
}

fn main() {
    let manifest_dir = PathBuf::from(env::var("CARGO_MANIFEST_DIR").expect("manifest directory"));
    let mut source_hasher = Sha256::new();
    for path in source_files(&manifest_dir) {
        println!("cargo:rerun-if-changed={}", path.display());
        let relative = path.strip_prefix(&manifest_dir).unwrap_or(&path);
        let bytes = fs::read(&path).unwrap_or_else(|error| {
            panic!("reading build-identity input {}: {error}", path.display())
        });
        source_hasher.update(relative.to_string_lossy().as_bytes());
        source_hasher.update([0]);
        source_hasher.update((bytes.len() as u64).to_le_bytes());
        source_hasher.update(&bytes);
    }

    let rustc = env::var("RUSTC").expect("RUSTC");
    let rustc_version = Command::new(rustc)
        .args(["--version", "--verbose"])
        .output()
        .expect("querying rustc version");
    assert!(
        rustc_version.status.success(),
        "rustc --version --verbose failed"
    );
    let rustc_version = String::from_utf8(rustc_version.stdout)
        .expect("rustc version is UTF-8")
        .replace(['\r', '\n'], " | ");
    let target = env::var("TARGET").expect("TARGET");

    let source_sha256 = hex::encode(source_hasher.finalize());
    let rustflags = env::var("CARGO_ENCODED_RUSTFLAGS").unwrap_or_default();
    let rustflags_sha256 = hex::encode(Sha256::digest(rustflags.as_bytes()));
    let build_configuration = format!(
        "profile={};opt_level={};debug={};panic={};target_features={};rustflags_sha256={}",
        env::var("PROFILE").unwrap_or_default(),
        env::var("OPT_LEVEL").unwrap_or_default(),
        env::var("DEBUG").unwrap_or_default(),
        env::var("CARGO_CFG_PANIC").unwrap_or_default(),
        env::var("CARGO_CFG_TARGET_FEATURE").unwrap_or_default(),
        rustflags_sha256,
    );

    println!("cargo:rustc-env=PREFLOP_SOLVER_SOURCE_SHA256={source_sha256}");
    println!("cargo:rustc-env=PREFLOP_SOLVER_TARGET_TRIPLE={target}");
    println!("cargo:rustc-env=PREFLOP_SOLVER_RUSTC_VERSION={rustc_version}");
    println!("cargo:rustc-env=PREFLOP_SOLVER_BUILD_CONFIGURATION={build_configuration}");
    println!("cargo:rerun-if-env-changed=RUSTC");
    println!("cargo:rerun-if-env-changed=CARGO_ENCODED_RUSTFLAGS");
}
