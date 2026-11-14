# Author fix report — the fix of a review's findings (six Minor findings of PASS 0785c763)

**Status:** done. Commits (range from `0785c763`): `15cf4273` (code and tests, findings 1, 2 in code, 5, 6) and `4f62fec5` (foundation wording, findings 2 in D-408, 3, 4). No push, no existing test file changed (the edited tests are the three new ones of this change).

## Per finding

1. **Fixed.** `src/browser/view/screen-address.ts` gets `SCREEN_KINDS`, made from a record `KIND_NAMED … as const satisfies Record<Screen["kind"], true>`, so a kind added to `Screen` and left out of it, or a name that is no kind, stops the build (`npm.cmd run typecheck`). `createScreenRegistry` throws at creation for any listed kind that no entry holds (`screen-registry.ts`), beside the duplicate check; `entryOf` is kept as it was. `tests/view/screen-registry.test.mjs` now expects the throw at creation for a table that leaves out Postać, Przejście and Mapy (`/no screen entry holds the kind character/`, nothing written to the address) in place of the throw at `show`. The list stands in the file D-408 already names as a place a new screen changes, so it adds no new shared place; the "one more shared place" reason of my first report is withdrawn.
2. **Fixed.** Module doc of `screen-registry.ts`: "knows no screen but Przejście, whose way back the page is told of (`ScreenPlace`)". D-408's rationale: "turns those functions into loops over the table, with one branch left for the way back to the screen of a map run".
3. **Fixed as the reviewer suggests; for the human to settle.** D-407's binding sentence now reads "keeps React roots of its own for each screen and for the menu bar, none shared between screens, and no single root over the whole view". The wording departs from row 1 of the task's *Settlements to record* ("po jednym na ekran albo pasek"); the request should put it before the human.
4. **Fixed.** D-407 *Rejected*, way c: "a rewrite of the game view's controller".
5. **Fixed.** Comment in `tests/view/state-store.test.mjs` now cites D-21 ("1000 ms of real time are one game minute at pace 1× (D-21)"); D-21's binding sentence gives one game minute per real second at 1×.
6. **Fixed.** The case is renamed "dispose takes every living instance down" and compares the sorted list of disposed instances, no order.

## Checks (affected ones, again)

| Check | Command | Exit |
|---|---|---|
| types | `npm.cmd run typecheck` | 0 |
| lint | `npx.cmd eslint src/browser/view tests/view` | 0 |
| format of code | `npx.cmd prettier --check src/browser/view tests/view` | 0 |
| three new test files, `screen-address.test.mjs`, and the five through `createGameView` plus `uncaught-failure` | `node scripts/build.mjs` (0), then `node scripts/test-node-file.mjs tests/view/<file>` for state-store, run-screen-state, screen-registry, screen-address, account-screen, chronicle-game, end-question, end-window-game, previous-save, uncaught-failure | 0 each; `npm.cmd test tests/view/screen-registry.test.mjs` 0 (13 cases) |
| imports | `npm.cmd test tests/invariants/test_cross_part_imports.py` | 0 |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |

Not run: the full gate. `prettier --check foundations/decisions.md` exits 1, and exits 1 the same on the head `0785c763` (stash and re-run): the Markdown file was not Prettier-formatted before this fix, and no invariant covers Markdown.

## Unread material
None beyond the first report's. For this fix I read both handoff files, `.the-way/task-cycle/change/fix.md`, D-21's heading and first sentence (not whole), and the parts of the files I changed.

## Searches not found or unclear
None. (`reports/review-whole-report.md` was not opened; the findings file holds the findings in the reviewer's words.)

## Reaches
`.the-way/task-cycle/change/fix.md` (named by the skill's section 1); `foundations/decisions.md` D-21 for finding 5.

## Working copies
None made; `.runs/author-fix/` was not created.
