# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 2 | 66898 | 26760 | fits | — |
| 2 | 2 | 148450 | 59380 | fits | — |
| 3 | 2 | 197800 | 79120 | fits | — |
| 4 | 2 | 240994 | 96398 | fits | — |
| 5 | 3 | 256202 | 102481 | fits | — |
| 6 | 7 | 254161 | 101665 | fits | — |
| 7 | 1 | 189502 | 75801 | fits | — |
| 8 | 3 | 229984 | 91994 | fits | — |
| 9 | 5 | 484696 | 193879 | fits | — |
| 10 | 7 | 174672 | 69869 | fits | — |
| 11 | 5 | 204334 | 81734 | fits | — |
| 12 | 2 | 181770 | 72708 | fits | — |
