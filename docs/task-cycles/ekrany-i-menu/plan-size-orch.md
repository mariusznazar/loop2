# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 1 | 98056 | 39223 | fits | — |
| 2 | 3 | 173893 | 69558 | fits | — |
| 3 | 2 | 182417 | 72967 | fits | — |
| 4 | 3 | 283727 | 113491 | fits | — |
| 5 | 5 | 303860 | 121544 | fits | — |
| 6 | 4 | 273689 | 109476 | fits | — |
| 7 | 8 | 550332 | 220133 | fits | — |
| 8 | 8 | 616341 | 246537 | fits | — |
| 9 | 7 | 476426 | 190571 | fits | — |
| 10 | 6 | 507863 | 203146 | fits | — |
| 11a | 10 | 303739 | 121496 | fits | — |
| 11b | 4 | 159642 | 63857 | fits | — |
| 11 | 1 | 122798 | 49120 | fits | — |
| 12 | 0 | 19564 | 7826 | fits | — |
