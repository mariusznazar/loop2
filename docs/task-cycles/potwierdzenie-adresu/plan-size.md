# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 3 | 140486 | 56195 | fits | — |
| 2 | 5 | 315326 | 126131 | fits | — |
| 3 | 2 | 79891 | 31957 | fits | — |
| 4 | 6 | 191937 | 76775 | fits | — |
| 5 | 4 | 236070 | 94428 | fits | — |
| 6 | 2 | 95972 | 38389 | fits | — |
| 7 | 8 | 178746 | 71499 | fits | — |
| 8 | 3 | 123158 | 49264 | fits | — |
| 9 | 8 | 231913 | 92766 | fits | — |
| 10 | 1 | 193421 | 77369 | fits | — |
