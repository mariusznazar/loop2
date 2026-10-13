# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 9 | 78852 | 31541 | fits | — |
| 2 | 2 | 40184 | 16074 | fits | — |
| 3 | 4 | 40184 | 16074 | fits | — |
| 4 | 4 | 59338 | 23736 | fits | — |
| 5 | 6 | 87075 | 34830 | fits | — |
| 6 | 8 | 52305 | 20922 | fits | — |
| 7 | 2 | 56662 | 22665 | fits | — |
| 8 | 8 | 88793 | 35518 | fits | — |
| 9 | 4 | 74015 | 29606 | fits | — |
| 10 | 6 | 86012 | 34405 | fits | — |
