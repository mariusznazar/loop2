# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 4 | 267195 | 106878 | fits | — |
| 2 | 2 | 172992 | 69197 | fits | — |
| 3 | 4 | 241974 | 96790 | fits | — |
| 4 | 2 | 113109 | 45244 | fits | — |
| 5 | 2 | 148968 | 59588 | fits | — |
| 6 | 4 | 294352 | 117741 | fits | — |
| 7 | 5 | 100159 | 40064 | fits | — |
| 8 | 1 | 191498 | 76600 | fits | — |
| 9 | 6 | 140387 | 56155 | fits | — |
