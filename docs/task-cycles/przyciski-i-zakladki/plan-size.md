# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 6 | 240433 | 96174 | fits | — |
| 2 | 3 | 248358 | 99344 | fits | — |
| 3 | 2 | 158335 | 63334 | fits | — |
| 4 | 1 | 173667 | 69467 | fits | — |
| 5 | 1 | 101440 | 40576 | fits | — |
