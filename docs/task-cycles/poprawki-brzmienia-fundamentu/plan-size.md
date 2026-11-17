# Slice sizes

Too large: more than 150000 estimated tokens to read at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 2 | 104735 | 41894 | fits | — |
| 2 | 1 | 209322 | 83729 | fits | — |
| 3 | 7 | 253559 | 101424 | fits | — |
| 4 | 2 | 145652 | 58261 | fits | — |
| 5 | 3 | 1707573 | 683030 | too large | reads about 683030 tokens, more than 150000 |
| 6 | 7 | 1543705 | 617482 | too large | reads about 617482 tokens, more than 150000 |
| 7 | 2 | 1423234 | 569294 | too large | reads about 569294 tokens, more than 150000 |
| 8 | 5 | 1510885 | 604354 | too large | reads about 604354 tokens, more than 150000 |
| 9 | 2 | 1523842 | 609537 | too large | reads about 609537 tokens, more than 150000 |
| 10 | 10 | 1814512 | 725805 | too large | reads about 725805 tokens, more than 150000 |
| 11 | 2 | 1613793 | 645518 | too large | reads about 645518 tokens, more than 150000 |
| 12 | 12 | 2281447 | 912579 | too large | changes 12 files, more than 10; reads about 912579 tokens, more than 150000 |
| 13 | 5 | 1971621 | 788649 | too large | reads about 788649 tokens, more than 150000 |
| 14 | 5 | 1952081 | 780833 | too large | reads about 780833 tokens, more than 150000 |
| 15 | 6 | 1679299 | 671720 | too large | reads about 671720 tokens, more than 150000 |
| 16 | 4 | 347431 | 138973 | fits | — |
| 17 | 3 | 166282 | 66513 | fits | — |

## Verdicts accepted

The `too large` verdicts of Slices 5–15 (and Slice 12's 12 files) are accepted by the cycle's
orchestrator (autonomous choice, recorded in the cycle record). The script counts each file of
*Change* whole, and every one of these slices changes `foundations/decisions.md` (1 261 318
characters), which no executor reads whole: by rule 7 of the plan each reads decisions by the line
ranges its *Read* names and test files at the quotation lines it finds with `git grep`. Measured by
the ranges each slice reads, every slice fits (largest: Slice 14, about 149 906 estimated tokens;
`reports/planner-size-estimate.md`). Slice 12 changes 12 files because a split would leave the
foundation check failing between the two slices.
