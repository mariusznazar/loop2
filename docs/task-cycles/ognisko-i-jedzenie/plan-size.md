# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 7 | 104784 | 41914 | fits | — |
| 2 | 7 | 171309 | 68524 | fits | — |
| 3 | 6 | 71350 | 28540 | fits | — |
| 4 | 5 | 131142 | 52457 | fits | — |
| 5 | 5 | 87570 | 35028 | fits | — |
| 6 | 5 | 102658 | 41064 | fits | — |
| 7 | 10 | 205811 | 82325 | fits | — |
| 8 | 9 | 205939 | 82376 | fits | — |
| 9 | 8 | 160103 | 64042 | fits | — |
| 10 | 8 | 192502 | 77001 | fits | — |
| 11 | 6 | 129243 | 51698 | fits | — |
| 12 | 6 | 156783 | 62714 | fits | — |
| 13 | 7 | 191746 | 76699 | fits | — |
| 14 | 3 | 55966 | 22387 | fits | — |
