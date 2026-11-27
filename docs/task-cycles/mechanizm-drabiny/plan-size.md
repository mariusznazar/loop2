# Slice sizes

Too large: more than 150000 estimated tokens to read at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 4 | 268098 | 107240 | fits | — |
| 2 | 3 | 356797 | 142719 | fits by ranges of tests/view/maps-screen.test.mjs | counted whole it reads about 187741 tokens, more than 150000 |
| 3 | 2 | 335920 | 134368 | fits | — |
| 4 | 2 | 180651 | 72261 | fits | — |
| 5 | 2 | 82832 | 33133 | fits | — |
| 6 | 1 | 82531 | 33013 | fits | — |
| 7 | 3 | 334420 | 133768 | fits | — |
| 8 | 3 | 369577 | 147831 | fits by ranges of tests/view/maps-screen.test.mjs | counted whole it reads about 191536 tokens, more than 150000 |
