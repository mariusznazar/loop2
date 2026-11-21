# Slice sizes

Too large: more than 150000 estimated tokens to read at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 1 | 209484 | 83794 | fits | — |
| 2 | 6 | 252376 | 100951 | fits | — |
| 3 | 4 | 211853 | 84742 | fits | — |
| 4 | 4 | 246605 | 98642 | fits | — |
| 5 | 5 | 315367 | 126147 | fits | — |
| 6 | 2 | 343590 | 137436 | fits | — |
| 7 | 6 | 248618 | 99448 | fits | — |
| 8 | 2 | 155994 | 62398 | fits | — |
| 9 | 1 | 131995 | 52798 | fits | — |
| 10 | 7 | 367040 | 146816 | fits | — |
| 11 | 8 | 372277 | 148911 | fits | — |
| 12 | 1 | 548467 | 219387 | too large | reads about 219387 tokens, more than 150000 |
| 13 | 2 | 291936 | 116775 | fits | — |
