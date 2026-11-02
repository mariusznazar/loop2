# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 3 | 115092 | 46037 | fits | — |
| 2 | 3 | 367369 | 146948 | fits | — |
| 3 | 10 | 209015 | 83606 | fits | — |
| 4 | 7 | 322939 | 129176 | fits | — |
| 5 | 2 | 139179 | 55672 | fits | — |
| 6 | 2 | 264378 | 105752 | fits | — |
| 7 | 4 | 150196 | 60079 | fits | — |
| 8 | 4 | 165760 | 66304 | fits | — |
| 9 | 3 | 136292 | 54517 | fits | — |
| 10 | 2 | unknown | unknown | unchecked | `src/browser/view/account-screen.ts` names no file under the root |
| 11 | 4 | 318335 | 127334 | fits | — |
| 12 | 4 | 351198 | 140480 | fits | — |
| 13 | 7 | 124690 | 49876 | fits | — |
| 14 | 2 | 76071 | 30429 | fits | — |
| 15 | 1 | 89940 | 35976 | fits | — |
