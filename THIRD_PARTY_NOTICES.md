# Third-party notices

## b-inary/postflop-solver and b-inary/wasm-postflop

- Engine: <https://github.com/b-inary/postflop-solver>
- Engine commit: `9d1509fe5077d019825f833eed04b16d342dfda1`
- Browser build: <https://github.com/b-inary/wasm-postflop>
- Browser-build commit: `97360db7644329b1c23a7adf06e9aa59406e4d4b`
- License: GNU Affero General Public License v3.0
- Copyright: the respective b-inary contributors

The vendored browser artifacts are under `vendor/wasm-postflop/`. The local worker is pinned to the official single-thread build so the application does not require COOP/COEP response headers. No poker-solving algorithm was copied into the application JavaScript; `js/solver.js` is the integration/provider layer.

The complete AGPL text is included in [`LICENSE`](LICENSE) and [`vendor/wasm-postflop/LICENSE`](vendor/wasm-postflop/LICENSE).

## Comlink

- Project: <https://github.com/GoogleChromeLabs/comlink>
- Bundled version: 4.4.1
- License: Apache License 2.0
- Copyright 2019 Google LLC

The bundled source and license are included as `vendor/wasm-postflop/comlink.js` and `vendor/wasm-postflop/comlink.LICENSE.txt`.
