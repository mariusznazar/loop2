# Author correction-1 report — Minor findings 1 and 2 of the return step's review

**Status:** done. **Commit** (from `527d13b6`): the one commit at the tip of the branch, `docs: mark the store's test of an act without catch-up with decision: D-409 …`. No push. The remarks on the browser check (item 1) and on the unread decisions (item 2) are not mine: the first is made by another agent, the second asks for nothing.

## Per finding

1. **Minor finding 1 — done.** `tests/view/state-store.test.mjs`, the test "an act without catch-up reads no clock and passes no time", now has above its comment the line `// decision: D-409 "A new character and the purchase of a branch rank do not catch up time"` (the second sentence of D-409, quoted whole, as the reviewer suggested). D-409's clause `tests:` now reads "…before the body of an act runs, and that its act without catch-up reads no clock." The pair is unchanged: it still sends an agent to check that a new character and a bought rank go through the act without catch-up, which the test does not prove. No test case changed.
2. **Minor finding 2 — done.** D-408's clause `tests:` reads "…focuses and takes down the screens through those entries, and refuses a table…" ("alone" dropped). The pair keeps the gap: its violates example covers a branch written for a screen in the registry.

## Checks

| Check | Command | Exit |
|---|---|---|
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| test | `npm.cmd test tests/view/state-store.test.mjs` | 0 |
| test | `npm.cmd test tests/view/screen-registry.test.mjs` | 0 |
| format | `npx.cmd prettier --check tests/view/state-store.test.mjs tests/view/screen-registry.test.mjs` | 0 |

Full gate not run; no signal `start` was given.

## Unread material
`reports/review-return-report.md`, section *Minor* (both items), was read; the rest of it was not. The decisions of the first report's unread list stay unread.

## Searches not found or unclear
None.

## Reaches
`reports/correction-1-handoff.md`, `reports/correction-1-remarks.md`, `reports/review-return-report.md` (the two Minor items).

## Working copies
None made; `.runs/author-correction-1/` was not created.
