# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 7 | 396060 | 158424 | fits | — |
| 2 | 5 | 290181 | 116073 | fits | — |
| 3 | 3 | 331775 | 132710 | fits | — |
| 4 | 7 | 402194 | 160878 | fits | — |
| 5 | 7 | 318062 | 127225 | fits | — |
| 6 | 1 | 114357 | 45743 | fits | — |
| 7 | 2 | 45301 | 18121 | fits | — |
