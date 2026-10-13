# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 3 | 64848 | 25940 | fits | — |
| 2 | 3 | 74400 | 29760 | fits | — |
| 3 | 5 | 68848 | 27540 | fits | — |
| 4 | 4 | 52796 | 21119 | fits | — |
| 5 | 2 | 55373 | 22150 | fits | — |
| 6 | 7 | 53693 | 21478 | fits | — |
