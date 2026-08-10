# Vendored postflop solver

These files pin the official browser build of [`b-inary/wasm-postflop`](https://github.com/b-inary/wasm-postflop) at commit `97360db7644329b1c23a7adf06e9aa59406e4d4b`. Its solver dependency is [`b-inary/postflop-solver`](https://github.com/b-inary/postflop-solver) at commit `9d1509fe5077d019825f833eed04b16d342dfda1`.

Local packaging changes are deliberately narrow:

- the official single-thread chunk is used;
- the worker's runtime capability switch is pinned to that single-thread path, avoiding cross-origin-isolation requirements;
- the WASM filename referenced by the chunk is `solver-st.wasm`;
- Comlink 4.4.1 is vendored so the app remains offline-capable.

SHA-256 checksums:

```text
94d89d56124f0cb121e5db6fb139ef4a91ab73206744f8b85a2c2f17a594e467  7a023623e45ca364f00b.js
71b7fa80947315e1e415a92f5574c1320403945538019921baf3ea756ceeeeb8  comlink.js
4d360a1217bd30a1830497239a9df9951dc20c742d3c3335ceef7cd415a50b2e  solver-st.wasm
cd08dba9940ce65e23db794b4f2b1bad7d0ae9dffd686e8597a4840005a3a5b5  worker.js
```

Licensing is in `LICENSE`, `comlink.LICENSE.txt`, and `worker.LICENSE.txt`. See the repository-root `THIRD_PARTY_NOTICES.md` for attribution.
