# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 9 | 263433 | 105374 | fits | — |
| 2 | 9 | 288866 | 115547 | fits | — |
| 3 | 10 | 279665 | 111866 | fits | — |
| 4 | 10 | 395933 | 158374 | fits | — |
| 5 | 5 | 276179 | 110472 | fits | — |
| 6 | 10 | 317103 | 126842 | fits | — |
| 7 | 6 | 294332 | 117733 | fits | — |
| 8 | 4 | 306123 | 122450 | fits | — |
