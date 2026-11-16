# Slice sizes

Too large: more than 150000 estimated tokens to read at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 2 | 66744 | 26698 | fits | — |
| 2 | 3 | 243312 | 97325 | fits | — |
| 3 | 1 | 532661 | 213065 | too large | reads about 213065 tokens, more than 150000 |
| 4 | 1 | 215919 | 86368 | fits | — |
| 5 | 3 | 270578 | 108232 | fits | — |
| 6 | 5 | 318478 | 127392 | fits | — |
| 7 | 1 | 192949 | 77180 | fits | — |
| 8 | 3 | 327891 | 131157 | fits | — |
| 9 | 4 | 236574 | 94630 | fits | — |
| 10 | 3 | 300842 | 120337 | fits | — |
| 11 | 6 | 278817 | 111527 | fits | — |
| 12 | 9 | 300720 | 120288 | fits | — |
| 13 | 2 | 212897 | 85159 | fits | — |
