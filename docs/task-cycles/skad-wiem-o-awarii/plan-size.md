# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 4 | 103176 | 41271 | fits | — |
| 2 | 5 | 213024 | 85210 | fits | — |
| 3 | 6 | 357211 | 142885 | fits | — |
| 4 | 6 | 265198 | 106080 | fits | — |
| 5 | 7 | 176688 | 70676 | fits | — |
| 6 | 4 | 114507 | 45803 | fits | — |
| 7 | 6 | 211704 | 84682 | fits | — |
