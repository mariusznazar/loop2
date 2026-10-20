# Geist font sources

Official repository: https://github.com/vercel/geist-font
Release: v1.8.1 (https://github.com/vercel/geist-font/releases/tag/v1.8.1).
Pinned commit: `e1f671c727f6de7e97c1e1d26dbb44f349c19459`, resolved by the reviewed design on 2026-10-20.

These are unchanged upstream bytes, stored with stable local filenames. The two WOFF2 files are the variable-weight Geist and Geist Mono faces. UI uses only the separately accepted weights 400 and 500. No upstream scripts, archives or npm font packages are used.

## Exact inputs

| Local file | Pinned raw source | Bytes | SHA-256 |
|---|---|---:|---|
| `Geist.woff2` | https://raw.githubusercontent.com/vercel/geist-font/e1f671c727f6de7e97c1e1d26dbb44f349c19459/fonts/Geist/webfonts/Geist%5Bwght%5D.woff2 | 69760 | `2ffebe993e969069a9789d15164b7715d42491b5835516c5e3b935d5f81b05f1` |
| `GeistMono.woff2` | https://raw.githubusercontent.com/vercel/geist-font/e1f671c727f6de7e97c1e1d26dbb44f349c19459/fonts/GeistMono/webfonts/GeistMono%5Bwght%5D.woff2 | 71596 | `afaacc4c5fbba89d2ebf7a02dc4070208540874592a5504d57175782fe893101` |
| `OFL.txt` | https://raw.githubusercontent.com/vercel/geist-font/e1f671c727f6de7e97c1e1d26dbb44f349c19459/OFL.txt | 4383 | `c683bfbcc7e087f5d37a54ef628f10387c451a83ddc459b151403a164ac46c90` |

## Verification and licence

On 2026-10-21 each public unauthenticated source returned HTTP 200 without redirects. Font signatures are WOFF2 (`wOF2`) and their declared byte lengths match. HTML responses, empty data and truncated WOFF2 headers are rejected before writing. A separate second fetch of each pinned source matched the stored bytes exactly; the table records the measured SHA-256 hashes. Font data is treated as untrusted asset data, never as executable code.

`OFL.txt` is copied byte for byte and retains the upstream copyright notice and SIL Open Font License 1.1. Distribute that file with the fonts. The build must use these local files without foreign-origin font requests; build wiring is separate from this asset provenance.
