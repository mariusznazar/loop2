# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 1 | 158896 | 63559 | fits | — |
| 2 | 5 | 165212 | 66085 | fits | — |
| 3 | 5 | 300480 | 120192 | fits | — |
| 4 | 8 | 212231 | 84893 | fits | — |
| 5 | 4 | 193764 | 77506 | fits | — |
| 6 | 3 | 189733 | 75894 | fits | — |
| 7 | 3 | 343332 | 137333 | fits | — |
| 8 | 6 | 536879 | 214752 | fits | — |
| 9 | 6 | 383038 | 153216 | fits | — |
| 10 | 9 | 287985 | 115194 | fits | — |
