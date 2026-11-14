# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 2 | 188707 | 75483 | fits | — |
| 2 | 5 | 244275 | 97710 | fits | — |
| 3 | 2 | 87071 | 34829 | fits | — |
| 4 | 2 | 83709 | 33484 | fits | — |
| 5 | 1 | 176704 | 70682 | fits | — |
| 6 | 3 | 222295 | 88918 | fits | — |
| 7 | 1 | 177410 | 70964 | fits | — |
| 8 | 1 | 159040 | 63616 | fits | — |
| 9 | 3 | 219988 | 87996 | fits | — |
| 10 | 4 | 138982 | 55593 | fits | — |
| 11 | 2 | 201870 | 80748 | fits | — |
