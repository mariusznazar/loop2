# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 10 | 322977 | 129191 | fits | — |
| 2 | 9 | 294946 | 117979 | fits | — |
| 3 | 5 | 211328 | 84532 | fits | — |
| 4 | 7 | 140555 | 56222 | fits | — |
| 5 | 8 | 145734 | 58294 | fits | — |
| 6 | 6 | 272597 | 109039 | fits | — |
| 7 | 5 | 176198 | 70480 | fits | — |
| 8 | 6 | 161024 | 64410 | fits | — |
