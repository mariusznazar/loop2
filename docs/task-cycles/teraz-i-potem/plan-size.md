# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 1 | 122591 | 49037 | fits | — |
| 2 | 3 | 142139 | 56856 | fits | — |
| 3 | 4 | 260414 | 104166 | fits | — |
| 4 | 2 | 135122 | 54049 | fits | — |
| 5 | 6 | 354889 | 141956 | fits | — |
| 6 | 6 | 334626 | 133851 | fits | — |
| 7 | 8 | 605621 | 242249 | fits | — |
| 8 | 5 | 321014 | 128406 | fits | — |
| 9 | 5 | 310558 | 124224 | fits | — |
| 10 | 1 | 83356 | 33343 | fits | — |
