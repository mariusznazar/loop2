# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 10 | 518593 | 207438 | fits | — |
| 2 | 10 | 383812 | 153525 | fits | — |
| 3 | 10 | 376987 | 150795 | fits | — |
| 4 | 1 | 108374 | 43350 | fits | — |
| 5 | 10 | 430293 | 172118 | fits | — |
| 6 | 7 | 283078 | 113232 | fits | — |
| 7 | 10 | 421386 | 168555 | fits | — |
| 8 | 2 | 263157 | 105263 | fits | — |
| 9 | 7 | 286910 | 114764 | fits | — |
| 10 | 9 | 297057 | 118823 | fits | — |
| 11 | 10 | 186652 | 74661 | fits | — |
| 12 | 9 | 242560 | 97024 | fits | — |
| 13 | 6 | 212639 | 85056 | fits | — |
