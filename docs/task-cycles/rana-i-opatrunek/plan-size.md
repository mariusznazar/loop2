# Slice sizes

Too large: more than 150000 estimated tokens to read at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 5 | 258392 | 103357 | fits | — |
| 2 | 7 | 307566 | 123027 | fits | — |
| 3 | 5 | 247152 | 98861 | fits | — |
| 4 | 8 | 347093 | 138838 | fits | — |
| 5 | 3 | 271417 | 108567 | fits | — |
| 6 | 3 | 281510 | 112604 | fits by ranges of tests/sim/saved-game.test.mjs | counted whole it reads about 174264 tokens, more than 150000 |
| 7 | 5 | 349305 | 139722 | fits | — |
| 8 | 2 | 331313 | 132526 | fits | — |
| 9 | 2 | 336162 | 134465 | fits by ranges of tests/view/program-editor.test.mjs | counted whole it reads about 166706 tokens, more than 150000 |
| 10 | 3 | 350942 | 140377 | fits by ranges of tests/view/rule-editor.test.mjs | counted whole it reads about 180663 tokens, more than 150000 |
| 11 | 4 | 196526 | 78611 | fits | — |
