# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 7 | 60182 | 24073 | fits | — |
| 2 | 2 | 93524 | 37410 | fits | — |
| 3 | 3 | 209273 | 83710 | fits | — |
| 4 | 5 | 310181 | 124073 | fits | — |
| 5 | 5 | 265648 | 106260 | fits | — |
| 6 | 3 | 121131 | 48453 | fits | — |
