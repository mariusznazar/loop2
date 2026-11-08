# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 5 | 445702 | 178281 | fits | — |
| 2 | 3 | 532235 | 212894 | fits | — |
| 3 | 4 | 273677 | 109471 | fits | — |
| 4 | 6 | 367605 | 147042 | fits | — |
| 5 | 10 | 384620 | 153848 | fits | — |
| 6 | 1 | 62857 | 25143 | fits | — |
