# Slice sizes

Too large: more than 150000 estimated tokens to read at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 3 | 308967 | 123587 | fits | — |
| 2 | 3 | 365215 | 146086 | fits by ranges of tests/view/shared-controls.test.mjs | counted whole it reads about 159542 tokens, more than 150000 |
| 3 | 3 | 264524 | 105810 | fits | — |
| 4 | 4 | 360979 | 144392 | fits | — |
| 5 | 4 | 346097 | 138439 | fits | — |
| 6 | 3 | 351276 | 140511 | fits by ranges of src/browser/run-screen.css | counted whole it reads about 161122 tokens, more than 150000 |
| 7 | 3 | 329228 | 131692 | fits by ranges of src/browser/run-screen.css | counted whole it reads about 152302 tokens, more than 150000 |
| 8 | 4 | 339196 | 135679 | fits by ranges of src/browser/run-screen.css | counted whole it reads about 152654 tokens, more than 150000 |
| 9 | 1 | 303621 | 121449 | fits | — |
