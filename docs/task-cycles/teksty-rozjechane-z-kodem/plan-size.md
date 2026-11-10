# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 3 | 305652 | 122261 | fits | — |
| 2 | 1 | 54566 | 21827 | fits | — |
| 3 | 3 | 215692 | 86277 | fits | — |
| 4 | 2 | 112988 | 45196 | fits | — |
| 5 | 2 | 278355 | 111342 | fits | — |
| 6 | 1 | 79848 | 31940 | fits | — |
| 7 | 2 | 74053 | 29622 | fits | — |
| 8 | 1 | 154799 | 61920 | fits | — |
| 9 | 1 | 134208 | 53684 | fits | — |
| 10 | 4 | 138399 | 55360 | fits | — |
| 11 | 1 | 200091 | 80037 | fits | — |
| 12 | 1 | 57557 | 23023 | fits | — |
