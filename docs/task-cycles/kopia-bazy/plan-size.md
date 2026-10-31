# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 5 | 143161 | 57265 | fits | — |
| 2 | 5 | 125141 | 50057 | fits | — |
| 3 | 9 | 170052 | 68021 | fits | — |
| 4 | 3 | 117612 | 47045 | fits | — |
| 5 | 2 | 99616 | 39847 | fits | — |
| 6 | 9 | 219337 | 87735 | fits | — |
| 7 | 1 | 99514 | 39806 | fits | — |
