# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 4 | 268763 | 107506 | fits | — |
| 2 | 5 | 412320 | 164928 | fits | — |
| 3 | 3 | 173466 | 69387 | fits | — |
| 4 | 4 | 138129 | 55252 | fits | — |
| 5 | 3 | 297206 | 118883 | fits | — |
| 6 | 7 | 172419 | 68968 | fits | — |
| 7 | 6 | 444583 | 177834 | fits | — |
| 8 | 6 | 386363 | 154546 | fits | — |
| 9 | 4 | 369309 | 147724 | fits | — |
