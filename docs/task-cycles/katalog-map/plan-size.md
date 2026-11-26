# Slice sizes

Too large: more than 150000 estimated tokens to read at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 7 | 354550 | 141820 | fits | — |
| 2 | 6 | 362976 | 145191 | fits | — |
| 2b | 2 | 272168 | 108868 | fits | — |
| 3 | 6 | 309612 | 123845 | fits | — |
| 4 | 2 | 325099 | 130040 | fits by ranges of tests/view/scene-picture.test.mjs | counted whole it reads about 154131 tokens, more than 150000 |
| 5 | 5 | 167228 | 66892 | fits | — |
| 6 | 3 | 193473 | 77390 | fits | — |
| 7 | 2 | 286422 | 114569 | fits | — |
| 8 | 3 | 296622 | 118649 | fits | — |
| 9 | 4 | 311179 | 124472 | fits by ranges of tests/view/maps-screen.test.mjs | counted whole it reads about 169259 tokens, more than 150000 |
| 10 | 3 | 322978 | 129192 | fits | — |
| 11 | 8 | 351689 | 140676 | fits | — |
| 12 | 1 | 176909 | 70764 | fits | — |
