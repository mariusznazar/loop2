# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 8 | 100456 | 40183 | fits | — |
| 2 | 5 | 121127 | 48451 | fits | — |
| 3 | 9 | 144293 | 57718 | fits | — |
| 4 | 10 | 141527 | 56611 | fits | — |
| 5 | 10 | 228881 | 91553 | fits | — |
| 6 | 6 | 172651 | 69061 | fits | — |
| 7 | 6 | 247257 | 98903 | fits | — |
| 8 | 3 | 121529 | 48612 | fits | — |
| 9 | 6 | 161063 | 64426 | fits | — |
| 10 | 6 | 173349 | 69340 | fits | — |
| 11 | 3 | 162340 | 64936 | fits | — |
| 12 | 4 | 134151 | 53661 | fits | — |
