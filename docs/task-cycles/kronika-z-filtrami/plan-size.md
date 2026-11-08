# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 9 | 318063 | 127226 | fits | — |
| 2 | 6 | 221124 | 88450 | fits | — |
| 3 | 7 | 334730 | 133892 | fits | — |
| 4 | 5 | 414973 | 165990 | fits | — |
| 5 | 9 | 460063 | 184026 | fits | — |
| 6 | 1 | 167468 | 66988 | fits | — |
| 7 | 2 | 80131 | 32053 | fits | — |
