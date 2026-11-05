# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 1 | 118388 | 47356 | fits | — |
| 2 | 5 | 182164 | 72866 | fits | — |
| 3 | 10 | 190619 | 76248 | fits | — |
| 4 | 9 | 153470 | 61388 | fits | — |
| 5 | 4 | 275383 | 110154 | fits | — |
| 6 | 6 | 259728 | 103892 | fits | — |
| 7 | 5 | 178374 | 71350 | fits | — |
| 8 | 3 | 191874 | 76750 | fits | — |
| 9 | 3 | 295916 | 118367 | fits | — |
| 10 | 3 | 291067 | 116427 | fits | — |
| 11 | 3 | 210940 | 84376 | fits | — |
| 12 | 6 | 589672 | 235869 | fits | — |
| 13 | 9 | 569508 | 227804 | fits | — |
| 14 | 1 | 71464 | 28586 | fits | — |
