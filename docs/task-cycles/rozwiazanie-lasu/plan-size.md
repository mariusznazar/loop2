# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 7 | 151961 | 60785 | fits | — |
| 2 | 3 | 137056 | 54823 | fits | — |
| 3 | 7 | 153104 | 61242 | fits | — |
| 4 | 2 | 111945 | 44778 | fits | — |
| 5 | 6 | 196628 | 78652 | fits | — |
| 6 | 5 | 156660 | 62664 | fits | — |
