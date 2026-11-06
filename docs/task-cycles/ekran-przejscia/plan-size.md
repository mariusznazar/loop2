# Slice sizes

Too large: more than 250000 estimated tokens to read, a quarter of a 1000000-token context window at 2.5 characters a token, or more than 10 files to change.

| Slice | Files to change | Characters to read | Estimated tokens | Verdict | Why |
|---|---|---|---|---|---|
| 1 | 2 | 66898 | 26760 | fits | — |
| 2 | 2 | 157201 | 62881 | fits | — |
| 3 | 2 | unknown | unknown | unchecked | `src/browser/view/status-row.ts:118-160` goes beyond the file's 147 lines |
| 4 | 2 | 250483 | 100194 | fits | — |
| 5 | 3 | 263526 | 105411 | fits | — |
| 6 | 7 | unknown | unknown | unchecked | `src/browser/view/terrain-panel.ts` names no file under the root; `src/browser/view/run-screen.ts` names no file under the root; `tests/view/body-row.test.mjs:105-184` goes beyond the file's 105 lines |
| 7 | 1 | unknown | unknown | unchecked | `src/browser/view/terrain-panel.ts` names no file under the root |
| 8 | 3 | 236140 | 94456 | fits | — |
| 9 | 5 | 506131 | 202453 | fits | — |
| 10 | 7 | 156142 | 62457 | fits | — |
| 11 | 5 | 196017 | 78407 | fits | — |
| 12 | 3 | 226307 | 90523 | fits | — |
