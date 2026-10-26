# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 9 | 260661 | 104265 | fits | — |
| 2 | 9 | 285815 | 114326 | fits | — |
| 3 | 10 | 277140 | 110856 | fits | — |
| 4 | 10 | 387250 | 154900 | fits | — |
| 5 | 10 | 309222 | 123689 | fits | — |
| 6 | 6 | 286631 | 114653 | fits | — |
| 7 | 4 | 298876 | 119551 | fits | — |
