# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 2 | 175373 | 70150 | fits | — |
| 2 | 5 | 295203 | 118082 | fits | — |
| 3 | 2 | 172835 | 69134 | fits | — |
| 4 | 2 | 92736 | 37095 | fits | — |
| 5 | 3 | 265387 | 106155 | fits | — |
| 6 | 3 | 274660 | 109864 | fits | — |
| 7 | 2 | 119123 | 47650 | fits | — |
| 8 | 4 | 204062 | 81625 | fits | — |
| 9 | 5 | 240869 | 96348 | fits | — |
| 10 | 2 | 127243 | 50898 | fits | — |
| 11 | 7 | 300920 | 120368 | fits | — |
