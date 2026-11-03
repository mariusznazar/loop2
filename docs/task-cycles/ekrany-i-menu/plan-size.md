# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 1 | 94305 | 37722 | fits | — |
| 2 | 3 | 165404 | 66162 | fits | — |
| 3 | 2 | 164026 | 65611 | fits | — |
| 4 | 3 | 246556 | 98623 | fits | — |
| 5 | 5 | 278004 | 111202 | fits | — |
| 6 | 4 | 242365 | 96946 | fits | — |
| 7 | 8 | 471541 | 188617 | fits | — |
| 8 | 8 | 513441 | 205377 | fits | — |
| 9 | 7 | 404958 | 161984 | fits | — |
| 10 | 6 | 409903 | 163962 | fits | — |
| 11 | 1 | 107602 | 43041 | fits | — |
| 12 | 0 | 19564 | 7826 | fits | — |
