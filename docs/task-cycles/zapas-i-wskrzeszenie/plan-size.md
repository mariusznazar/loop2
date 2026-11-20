# Slice sizes

Too large: more than 150000 estimated tokens to read at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 3 | 237419 | 94968 | fits | — |
| 2 | 2 | 314022 | 125609 | fits | — |
| 3 | 5 | 224780 | 89912 | fits | — |
| 4 | 7 | 280232 | 112093 | fits | — |
| 5 | 2 | 272347 | 108939 | fits | — |
| 6 | 6 | 243214 | 97286 | fits | — |
| 7 | 2 | 317218 | 126888 | fits | — |
| 8 | 4 | 279451 | 111781 | fits | — |
| 9 | 3 | 311414 | 124566 | fits | — |
| 10 | 10 | 236333 | 94534 | fits | — |
| 11 | 1 | 107937 | 43175 | fits | — |
| 12 | 6 | 341591 | 136637 | fits | — |
| 13 | 2 | 290272 | 116109 | fits | — |
| 14 | 4 | 344312 | 137725 | fits | — |
| 15 | 6 | 322149 | 128860 | fits | — |
| 16 | 2 | 146754 | 58702 | fits | — |
| 17 | 3 | 297804 | 119122 | fits | — |
| 18 | 1 | 569295 | 227718 | too large | reads about 227718 tokens, more than 150000 |
