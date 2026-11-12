# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 1 | 66406 | 26563 | fits | — |
| 2 | 2 | 120073 | 48030 | fits | — |
| 3 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 4 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 5 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 6 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 7 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 8 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 9 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 10 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 11 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 12 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 13 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 14 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 15 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 16 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 17 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 18 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 19 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 20 | 1 | 864767 | 345907 | too large | reads about 345907 tokens, more than 250000 |
| 21 | 10 | 1124086 | 449635 | too large | reads about 449635 tokens, more than 250000 |
| 22 | 10 | 1164900 | 465960 | too large | reads about 465960 tokens, more than 250000 |
| 23 | 10 | 1089661 | 435865 | too large | reads about 435865 tokens, more than 250000 |
| 24 | 9 | 1043856 | 417543 | too large | reads about 417543 tokens, more than 250000 |
| 25 | 8 | 1344957 | 537983 | too large | reads about 537983 tokens, more than 250000 |
| 26 | 7 | 1284269 | 513708 | too large | reads about 513708 tokens, more than 250000 |
| 27 | 9 | 1280282 | 512113 | too large | reads about 512113 tokens, more than 250000 |
| 28 | 10 | 1180392 | 472157 | too large | reads about 472157 tokens, more than 250000 |
| 29 | 10 | 1151253 | 460502 | too large | reads about 460502 tokens, more than 250000 |
| 30 | 10 | 1101884 | 440754 | too large | reads about 440754 tokens, more than 250000 |
| 31 | 10 | 1049174 | 419670 | too large | reads about 419670 tokens, more than 250000 |
| 32 | 10 | 1062941 | 425177 | too large | reads about 425177 tokens, more than 250000 |
| 33 | 7 | 997111 | 398845 | too large | reads about 398845 tokens, more than 250000 |
| 34 | 1 | 178097 | 71239 | fits | — |
