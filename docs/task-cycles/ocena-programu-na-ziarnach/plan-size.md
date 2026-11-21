# Slice sizes

Too large: more than 150000 estimated tokens to read at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 9 | 357054 | 142822 | fits | — |
| 2 | 1 | 329124 | 131650 | fits | — |
| 3 | 4 | 308058 | 123224 | fits | — |
| 4 | 4 | 231888 | 92756 | fits | — |
| 5 | 4 | 258598 | 103440 | fits | — |
| 6 | 3 | 368820 | 147528 | fits | — |
| 7 | 1 | 557569 | 223028 | too large | reads about 223028 tokens, more than 150000 |
| 8 | 6 | 352803 | 141122 | fits | — |
| 9 | 10 | 358098 | 143240 | fits | — |
| 10 | 1 | 318933 | 127574 | fits | — |
| 11 | 3 | 353296 | 141319 | fits | — |
| 12 | 2 | 145245 | 58098 | fits | — |
