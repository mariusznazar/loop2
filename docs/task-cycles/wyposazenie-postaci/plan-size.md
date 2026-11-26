# Slice sizes

Too large: more than 150000 estimated tokens to read at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 10 | 343551 | 137421 | fits by ranges of tests/sim/saved-game.test.mjs | counted whole it reads about 206121 tokens, more than 150000 |
| 2 | 3 | 191578 | 76632 | fits | — |
| 3 | 6 | 292052 | 116821 | fits | — |
| 4 | 10 | 329902 | 131961 | fits by ranges of tests/sim/saved-game.test.mjs | counted whole it reads about 200880 tokens, more than 150000 |
| 4b | 4 | 298880 | 119552 | fits | — |
| 5 | 2 | 357432 | 142973 | fits | — |
| 6 | 9 | 290581 | 116233 | fits | — |
| 7 | 10 | 310346 | 124139 | fits | — |
| 7b | 1 | 160148 | 64060 | fits | — |
| 8 | 9 | 553986 | 221595 | too large | reads about 221595 tokens, more than 150000 |
| 9 | 4 | 370529 | 148212 | fits | — |
| 10 | 4 | 370184 | 148074 | fits by ranges of tests/view/judging-cache.test.mjs | counted whole it reads about 164178 tokens, more than 150000 |
| 11 | 1 | 319692 | 127877 | fits | — |
| 12 | 5 | 362788 | 145116 | fits | — |
| 13 | 3 | 354002 | 141601 | fits by ranges of tests/view/program-editor.test.mjs | counted whole it reads about 173066 tokens, more than 150000 |
| 14 | 4 | 357420 | 142968 | fits by ranges of tests/view/rule-editor.test.mjs | counted whole it reads about 180394 tokens, more than 150000 |
| 15 | 4 | 356738 | 142696 | fits by ranges of tests/view/world-area.test.mjs | counted whole it reads about 159914 tokens, more than 150000 |
| 16 | 3 | 356757 | 142703 | fits by ranges of tests/view/shared-controls.test.mjs | counted whole it reads about 166097 tokens, more than 150000 |
| 17 | 2 | 329427 | 131771 | fits | — |
| 18 | 5 | 354433 | 141774 | fits by ranges of tests/view/character-screen.test.mjs | counted whole it reads about 151979 tokens, more than 150000 |
| 19 | 4 | 333091 | 133237 | fits | — |
| 20 | 5 | 355017 | 142007 | fits | — |
| 21 | 8 | 224559 | 89824 | fits | — |
| 22 | 7 | 212582 | 85033 | fits | — |
| 23 | 1 | 324451 | 129781 | fits | — |
