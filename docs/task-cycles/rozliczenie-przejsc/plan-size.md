# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 7 | 275770 | 110308 | fits | — |
| 2 | 9 | 236864 | 94746 | fits | — |
| 3 | 8 | 383737 | 153495 | fits | — |
| 4 | 4 | 164153 | 65662 | fits | — |
| 5 | 7 | 242334 | 96934 | fits | — |
