# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 2 | 180143 | 72058 | fits | — |
| 2 | 6 | 221432 | 88573 | fits | — |
| 3 | 3 | 251016 | 100407 | fits | — |
| 4 | 5 | 252910 | 101164 | fits | — |
| 5 | 7 | 205462 | 82185 | fits | — |
| 6 | 8 | 182496 | 72999 | fits | — |
| 7 | 6 | 188329 | 75332 | fits | — |
| 8 | 6 | 206261 | 82505 | fits | — |
| 9 | 2 | 199081 | 79633 | fits | — |
