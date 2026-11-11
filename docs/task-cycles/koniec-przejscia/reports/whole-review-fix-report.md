PASS 4ef0789c2621e263de9472128a59bdd6c8f186a7

# Review of the fix after the review of the whole change — task koniec-przejscia

Range `6de72dbb..4ef0789c2621e263de9472128a59bdd6c8f186a7`; `git rev-parse HEAD` in `` is `4ef0789c…`. Diff and log computed by me (`git diff 6de72db..HEAD`, `git log --oneline 6de72db..HEAD`: `829e2476`, `18239ea7`, `9bc92e50`, `d0f32fff`, `4ef0789c`; 6 files, +131 −39). Findings file `docs/task-cycles/koniec-przejscia/reports/whole-review-findings.md`; fixer's report `fix-1-report.md` read as claims. The reviewed worktree, its index and branch are unchanged (`git status --short` empty).

Counts: 0 blocking; 4 Minor (all in the fix's reach, none blocks); 2 out of scope (Declined to judge).

## Each finding of the findings file

| Finding | Verdict | Evidence |
|---|---|---|
| B1 (D-362 order: discovery before streak) | **fixed** | `foundations/decisions.md:8149` (D-362): the clauses now read "…with the longest streak the map run reached … (D-135, D-133), the discovery of that game minute where there is one (D-122), the line of what the end gave or cost …", the order of `end-window.tsx`, the plan and To do 5 and 9. One-clause edit, nothing else in the entry changed (diff). `python -B .the-way/elements/common/foundation_check.py` exit 0, `0 errors`. |
| M1 (item order of `enteredWith`) | **fixed** | `src/browser/sim/saved-game.ts` `record`: `ordered` demands strictly rising `Object.keys(ITEMS)` positions (also refuses a repeated item). Crafted case in `tests/sim/saved-game.test.mjs` (`CRAFTED`, "out of the order of the data's items"). My probe: `enteredWith.reverse()` and `[fiber, stick]` refused as `shape`. |
| M2 (bound of the counts) | **fixed, no new defect** | See "The bound of M2" below. |
| M3 (fight test repeats the rule) | **fixed**; new Minor N1 | The helper's copy of `minuteKind`'s ladder is gone (`fought()` keeps only the `attacked` event minute and the greatest streak seen). Judgment of the expected values under N1. |
| M4 (heading of D-362) | **kept as Minor, remains** | The fixer contests: the entry binds two halves of one question (what the window says, how it opens and closes), and the projected heading asks the first only. I agree it is a defensible reading: `elements/decisions/template.md` has the heading ask what the binding sentences answer, and rows 1 and 2 of the task's settlements land in this entry. The finding stays as I wrote it (the task's source wording of the question was changed without the task naming it) and its remedy is the one it asked for: the human sees it at the request. Not withdrawn; blocks nothing. |
| M5 (Escape) | **the restatement is fixed; the behaviour remains (Minor)** | D-362 now says "„✕” in the window and the key Escape pressed in the window, which takes the focus when it opens, close it …", which is what `end-window.tsx:89` does (handler on the root, `tabIndex` −1, focus taken at mount). That answers the part of my finding that was a WAY-263 restatement. The code is unchanged by decision, so the case I named stays: after a click outside the window, focus is on the page and Escape closes nothing; it goes to the request. One residue of the same restatement: D-311 still says "„✕” in it and Escape close it and uncover the screen" without the qualification (`foundations/decisions.md`, D-311 statement). Minor, for the return step or the request; it does not change a verdict because the case a player at the window meets holds. |
| M6 (no test of a reloaded ended run through the game view) | **fixed** | New case in `tests/view/end-window-game.test.mjs` builds the view on an ended run, takes the document the view keeps, loads it with `loadSavedGame`, builds the view again and reads the window's streak line and cost line. Expectations are written out (`najdłuższa passa 116/480` after a death with the document's `longestStreak` set to 116 above its streak; the To do 6 sentence with "8 godzinach"; after a completion `najdłuższa passa 480/480` and "Do skrzynki nic nie trafiło."). It asserts the document loads, so it cannot pass on a refused document. I ran it (21 pass). The fixer's two mutants (streak read from `run.streak`; death branch of `endCostLine` dropped) are credible by reading: either changes a string asserted here. |
| M7 (open item lists only the fill and the thickness) | **fixed** | `guidelines/styleguide-browser-view.md`: the open items are now a three-item list; the third names "tor paska czasu w `highlight` i ramka okna w `divider`" as uses inside D-40's words not approved for these places. |
| M8 (history and rationale in the rule) | **fixed** | The history ("sprawdzona w prawdziwej przeglądarce w oknie 1280 × 720 …") and the reasons ("bo nie ma czego zasłaniać", "więc nie trafia w menu „Konto”", "Pasek nie ma tekstu, więc tor nie dostaje roli tekstu", the sentence on why the page of all states has no sample) are gone; Decision, Invariant, Good, Bad untouched; the open items stay as the short list M7 needs. The rule is still about 100 lines; length alone was not the defect named. `foundation_check.py` exit 0; Prettier passes on the file. |

## The bound of M2, and the trust boundary again

Change: `record` refuses `enteredWith` whose counts sum above `run.character.traits.carryingCapacity` (read from the same document, through `plainMapRun`, before `record`).

Does it refuse something the game writes? I read every writer: `startRun` in `src/browser/sim/game.ts` builds the backpack with `takeTrip` or `takeFromNowhere`, both through `clipTrip` with one shared budget `min(capacity, map.carryIn)` (`src/browser/sim/trip.ts`); the backpack starts from `newBackpack()`, so it holds only what was taken; `startRecord` reads that backpack; `restart` calls `startRun` with `run.character.traits`, the same traits the run holds (`newMapRun` copies `{ ...traits }`); no other code assigns `traits`. So the total never exceeds the capacity of the run's character, and the order of `startRecord` is `Object.keys(ITEMS)`, the order the reader demands.

Tried, not taken on the fixer's word: a scratch test (a detached worktree of the head commit with `node_modules` joined by a junction, removed afterwards) built 240 games — maps `forest` and `forestDeep`, solved and unsolved, chests of 4 stock sets, take lists of 5 shapes (all four items at 15, reversed order, 15 + 5, 7 + 8 + 1, empty) — and for each loaded the document of the sent state, of the same state after 40 game minutes, after `restart`, and after a second `restart` (each stamped with `withSaveTime`, as the load requires). All 240 states loaded (`checked 240`). The same script on the previous head `6de72dbb` loaded them too, so the bound refused none of them. Crafted input on the head: a count above the capacity (9 of the document's 8 + 7 = 15), `MAX_SAFE_INTEGER`, a reversed list, a duplicated item, items out of order, each refused as `shape`; the unchanged document loads; the edge "8 + 7 = 15" loads (also a test of the fix). A negative `carryingCapacity` is refused (`count`).

One limit of the bound, not a defect of the fix: the capacity it compares with sits in the same document and `traits` is read leniently (`saved-game.ts:358`, any count from 0), so a hand-made document that raises its own `carryingCapacity` loads with a larger `enteredWith` (probe: capacity 10000 with 500 sticks loads). The refusal is therefore only as strong as the unchecked field; see N2.

No new Critical or Important finding in the fix diff: the TypeScript change is a few lines inside `record`; the tests added are refusals and one edge that loads; the documentation edits touch no code.

## New Minor findings (none blocks)

- **N1 — `tests/sim/run-record.test.mjs`, the figures `explore: 39, wander: 5, gather: 170, combat: 5`, attack at 214, death at 219, `longestStreak` 33 (M3's fix).** The fixer took them from one run of the product and checked only the sums by hand; the split among explore, wander and gather is today's result for this seed. `guidelines/testing.md`, "Where the expected value comes from", forbids an expected value that is only today's result ("Dzisiejszy wynik programu nie jest dowodem poprawności") unless an agreed requirement sets it. Grade: Minor. The defect named in M3 (the helper recomputing the rule) is gone, and the test keeps requirement-based assertions that do not depend on the seed's split: 5 combat minutes, death at the attack minute + 5 (the attack minute from the `attacked` event), the sum of the counts equal to `minute`, no `kick` key, and the fixer's mutant of `minuteKind` makes it fail. The test already depends on this seed for the wolf (`FIGHT_MS`, existing comment), so the new figures add little fragility; a change to exploration or gathering rules that moves minutes between the kinds will fail it and be re-derived by its author. Acceptable as Minor; to be stated at the request, as the fixer did.
- **N2 — `src/browser/sim/saved-game.ts` `record`: the capacity bound is self-referential** (above). A crafted document that also raises `run.character.traits.carryingCapacity` passes the bound. The leniency of `traits` is older than the range and the change (the guideline's "liczby o zakresie swojego typu" would be served by tying the capacity to the team's character or the data); the fix is no worse than before for such a document. Minor.
- **N3 — D-311 keeps "Escape close it" without the qualification** (see M5 row). Minor.
- (M4 and M5 remain as Minor as listed above.)

## Declined to judge

- `dead(going())` in the view tests is refused by `loadSavedGame` as `shape` (the fixer's observation in "Problems as observed"): the fixer's scratch state, cause unexamined, outside the fix diff and the task. Not judged.
- A real browser: the fix changes no view code or style; nothing new to look at there. Not run.

## Checks I ran (detached worktree of `4ef0789c` under `.runs/fix-review-wt` of the reviewed worktree, `node_modules` by junction; a second one of `6de72dbb` under `.runs/fix-review-base` for the same probe on the old head; both removed after, `git worktree remove --force` exit 0, `node_modules` of the reviewed worktree intact)

- `npm run build` exit 0.
- `npm test -- tests/sim/saved-game.test.mjs` exit 0 (36 pass); `tests/sim/run-record.test.mjs` exit 0 (15); `tests/sim/loop.test.mjs` exit 0 (37); `tests/view/end-window-game.test.mjs` exit 0 (21); `tests/view/end-window.test.mjs` exit 0 (13); `tests/view/account-screen.test.mjs` exit 0 (130); `tests/view/trip.test.mjs` exit 0 (9).
- The probe `tests/sim/zz-probe.test.mjs` (scratch, not committed, deleted with the worktree): `node --test` on the head: `checked 240`, every crafted refusal as listed above, exit 0; on `6de72dbb` the 240 states load and the crafted assertions fail, as they should.
- `npm test -- tests/invariants/test_minute_span_split.py`, `test_simulation_inputs.py`, `test_simulation_isolation.py`, `test_content_identifiers.py`, `test_browser_view_token_values.py`: each exit 0.
- `npm run typecheck` exit 0; `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser tests/sim tests/view` exit 0.
- `node node_modules/prettier/bin/prettier.cjs --check src/browser tests/sim tests/view guidelines/styleguide-browser-view.md foundations/decisions.md`: exit 1 only for `foundations/decisions.md`; the same command on `foundations/decisions.md` at `6de72dbb` gives the same warning, so it is older than the fix and `decisions.md` is not under the Prettier invariant; every other file passes.
- `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree (pin `e3825a82386a61930a86f8517fc0c5f422fc2833`): exit 0, `0 errors`. This is the check alone, not the product's gate.

Not run: the product's gate (the cycle's), a real browser, the mutation tool (the fixer's mutants are read, not repeated).

## Reaches beyond the dispatch

- `src/browser/sim/trip.ts`, `src/browser/sim/game.ts` (`startRun`, `restart`, `advanceMinutes` unchanged), `src/browser/sim/saved-game.ts` (`traits` reader at line 358): read to answer whether the bound of M2 refuses something the game writes; the dispatch names the question.
- `foundations/decisions.md` D-311 (statement), read for the Escape residue (N3).
- `tests/sim/understanding-fixture.mjs`, `tests/sim/program-fixture.mjs`: read to write the scratch probe.
- Scratch files only under the ignored `.runs/` and the scratchpad; shell logs went to `/tmp/fr_*.log`.

## Unread material:

This is a fix review and no whole-change selection is repeated; I read whole what the dispatch names: `.the-way/task-cycle/review/fix.md`, the findings file, the fix diff (all six files), `fix-1-report.md` in full to its Choices (its "Problems as observed" read). Read in part: `src/browser/sim/saved-game.ts` (`record`, `tripList`, the `traits` reader), `src/browser/sim/trip.ts` (whole), `src/browser/sim/game.ts` (`startRun`, `restart`), `guidelines/styleguide-browser-view.md` (the window's rule and its diff; the rest I read whole in the previous review), `tests/view/end-window-game.test.mjs` (the new case and its diff). Of the foundation, D-362 whole in its changed form and the passage of D-311; no other decision was read again for this review (the earlier review read 48 whole). Not read: `tests/sim/saved-game.test.mjs` and `tests/sim/run-record.test.mjs` beyond the diff hunks and the cases the files' runs report; the fixer's logs `f1-*.log`.

## Searches not found or unclear:

- None for the findings. I found no document the game writes that the new bound or the order check refuses (240 states tried, plus a reading of every writer of `enteredWith` and of `traits`); a case I did not try is a take list with the same item twice in a plan, which `clipTrip` could turn into two entries of one item — `takeTrip` writes them into a backpack by item, so `startRecord` yields one entry per item (read, not run).
