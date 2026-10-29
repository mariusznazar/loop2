# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 9 | 446723 | 178690 | fits | — |
| 2 | 10 | 289997 | 115999 | fits | — |
| 3 | 5 | 297078 | 118832 | fits | — |
| 4 | 10 | 403728 | 161492 | fits | — |
| 5 | 10 | 455004 | 182002 | fits | — |
| 6 | 10 | 410274 | 164110 | fits | — |
| 7 | 10 | 448660 | 179464 | fits | — |
| 8 | 10 | 424777 | 169911 | fits | — |
