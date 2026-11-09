# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 3 | 383154 | 153262 | fits | — |
| 2 | 3 | 126054 | 50422 | fits | — |
| 3 | 2 | 287171 | 114869 | fits | — |
| 4 | 5 | 408560 | 163424 | fits | — |
| 5 | 1 | 244666 | 97867 | fits | — |
| 6 | 2 | 164155 | 65662 | fits | — |
| 7 | 2 | 157689 | 63076 | fits | — |
| 8 | 1 | 170330 | 68132 | fits | — |
| 9 | 2 | 285825 | 114330 | fits | — |
| 10 | 3 | 493575 | 197430 | fits | — |
| 11 | 4 | 165599 | 66240 | fits | — |
| 12 | 8 | 203732 | 81493 | fits | — |
