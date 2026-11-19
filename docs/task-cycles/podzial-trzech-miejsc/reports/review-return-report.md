PASS 99e4dcd0824614639fad289c48ce53b50085d666

# Review of the return step - task `podzial-trzech-miejsc`

Range `94c0c560..99e4dcd0` (`git rev-parse HEAD` = `99e4dcd0824614639fad289c48ce53b50085d666`, as given). Two commits, `6a031cc4` and `99e4dcd0`. Together they change only `foundations/decisions.md:4624-4626`, the *Verification* field of D-323 (3 lines added, 3 removed). `.the-way` pin: `git -C .the-way rev-parse HEAD` = gitlink = `bfb2e109735b5fff98802b8be0ff3c43c799262a`.

Counts: 0 blocking, 1 Minor in scope, 1 Minor out of scope.

## Findings

### Critical

none

### Important

none

### Minor

1. **`foundations/decisions.md:4624-4626`: Escape after the error is dropped from the pair, but no test presses Escape after the error.** The pair at the base had "„✕” and Escape after the error leaving the window standing" (complies) and "„✕” or Escape after the error closing the window" (violates). Both items were moved into `tests:` as "the closing of the window that „✕” and Escape both ask for leaves an open window standing". The clause is literally true:
   - the guard case holds `closeWindow()` after halt (`tests/view/run-screen-state.test.mjs:249-253`, `:271-272`);
   - Escape reaches the same `controls.close()` as „✕” (`src/browser/view/end-window.tsx:91-95`, `src/browser/view/run-screen.tsx:258-261`).

   What no test holds is that Escape still takes this route after the error. `tests/view/end-window-game.test.mjs:1219-1229` presses only „✕” after `halt()`. The test before the error (`end-window-game.test.mjs:727`) passes whatever route Escape takes to close the window. So a change could send Escape after the error past `closeWindow` and close the window. That breaks D-323's "„✕” and Escape of the window close nothing after the error". No test would catch it, and the pair no longer names it.

   This is Minor. The binding sentence still states the rule, and the gap needs an unlikely change of the wiring. To fix it, keep a complies/violates item for Escape pressed in the window after the error, or add a press of Escape to the page case.

### Out of scope

- **`tests/view/run-screen-state.test.mjs:299` (Minor, beyond this range).** The test's message reads "navigation goes on: leaving ended the wait and the entering opened the window". The mutation checks show that the entering does not open the window there: with `entered` not reopening the window at halt, the case still passes, because the window has been open since the end of the map run. The return step corrected its own clause for exactly this reason (`99e4dcd0`). The message comes from slice 6, which the earlier reviews already passed, and this range does not touch it.

## Judgment of what the range claims

All passages below are in D-323's *Verification*, `foundations/decisions.md:4624`.

**New part of the clause `tests:`, item by item:**

| Clause | Held by (`tests/view/run-screen-state.test.mjs`) | Evidence |
|---|---|---|
| "the end of the scene's effect of a death opening the window that waited for it" | `waiting`, :274-288 | return step's mutation `effectEnded stops at halt`, exit 1 (log read) |
| "a leaving of the screen during that wait ending the wait, so that the window shows when the player comes back" | `away`, :290-300 | my mutation `left keeps the wait at halt`, exit 1 |
| "„Koniec przejścia” opening a window that „✕” closed before the error" | `closed`, :256-270 | return step's mutation `openWindow stops at halt`, exit 1 |
| "the closing of the window that „✕” and Escape both ask for leaves an open window standing" | `standing`, :249-253; `closed`, :271-272 | return step's mutation `closeWindow closes after halt`, exit 1; see Minor 1 for Escape |
| "no question is asked" | `standing`, :254 | return step's mutation `question asked after halt`, exit 1 |
| "„Koniec przejścia” and a leaving of the screen leave a standing question standing, with the window not shown beside it" | `asking`, :221-245 | return step's mutation `question closes after halt`, exit 1; my mutation `left closes the question at halt`, exit 1 |

Every clause is held by a test as written. The guard case carries `// decision: D-323 "After an error that no code of the game handled, whether the end-of-run window is open stays a memory of the page as D-371 gives it"` (:220), a quotation of the opening of D-323's third paragraph. `foundation_check.py` passes it.

**The correction in `99e4dcd0` is right.** The clause of `6a031cc4`, "an entering of the screen after a leaving during that wait showing the window", reads as if the guard case held the entering's reopening of the window. Two mutations settle it:

- `entered does not reopen the window at halt` passes all five test files that call `halt()`.
- `entered stops whole at halt`, where the player is never back on the screen, fails the guard case.

So the case holds the leaving that ends the wait and the player's return to the screen, not the reopening. The corrected wording says exactly that.

**What is left in the pair is what no test holds:**

- The page route: the scene's end of the effect and the header's „Koniec przejścia” reaching the state after the error. Guards at halt in `run-entry.js`'s `effectEnded` and `openWindow` pass all five files. A positive control shows those tests do load the copied `run-entry.js`: `openWindow` made a no-op there fails 4 cases of `end-window-game.test.mjs`. So no test holds the route after the error, and the pair rightly keeps it.
- The entering that reopens a window „✕” closed before the error: held by no test (the mutation above). Kept in the pair, rightly.
- Dropped from the pair: "„Koniec przejścia” after the error closing a standing question" and "„✕” … after the error closing the window". Both are now held by tests (above). Escape is the one exception, Minor 1.
- The three items of the first two paragraphs on each side are unchanged.

**The pair agrees with the code and with the binding sentences:**

- `entered()` (`src/browser/view/run-screen-state.ts:189-196`) has no guard of halt.
- `openWindow()` (:223-232) and `effectEnded()` (:240-245) have none either.
- `closeWindow()` (:233-239) has one.

The violating examples are code that goes against the decision while the entry stays as it is, as the template asks.

**Form against `.the-way/elements/decisions/template.md`, section "Verification":**

- The order is `invariants:`, then `tests:`, then "An agent compares a change with the part no invariant and no test holds:" with `complies` and `violates`, as the template gives it.
- The new clause names no path, no test name and no number.
- *Rationale* and *Rejected* are unchanged.
- No binding sentence changed, so no line `decision:` of a test is affected.

**Against `return_step.md`:** the step removed from the pair the parts that a test holds, named that test by the clause `tests:`, and left a pair only for parts no test holds, except Escape (Minor 1). The return step's report says the range changes no other file; `git diff --stat` confirms only `foundations/decisions.md`.

**The return step's own-work check:**

- Its script `reports/return-step-files/mutate.ps1` applies each mutation by exact text and skips a pattern it does not find; its log shows no skip.
- It runs only the guard case (`--test-name-pattern "after halt"`), so its "entered stops at halt, exit 0" shows only that the guard case does not hold the reopening. It does not show that no test does. My run of all five test files that call `halt()` confirms the wider claim.
- The check fits the weakest point of the step, and it caught the step's own wrong clause.

**Task:** the frozen task, *To do* 8, and the plan's row 3 ask for D-323 agreed with D-311 and D-371. The range does nothing more: it touches neither code nor tests, and takes no reserved choice. The range touches no trust boundary and holds no operation that cannot be undone.

## Declined to judge

- The message of the guard case at `tests/view/run-screen-state.test.mjs:299`: code of slice 6, outside this range (listed above as out of scope).
- The third paragraph, *Relations*, *Rationale* and *Rejected* of D-323: written by the foundation step and already reviewed; this range does not change them.

## Checks

| Command / method | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git log` and `git diff` of `94c0c560..99e4dcd0`; `git diff 94c0c560..6a031cc4` | 0 | head as given; 2 commits; 1 file, 3/3 lines |
| `git -C .the-way rev-parse HEAD`, `git ls-files --stage -- .the-way` | 0 | both `bfb2e109…` |
| `python -B .the-way/elements/common/foundation_check.py` (worktree root, at head) | 0 | `0 errors` |
| `node .runs/review-return/mutate.mjs`: mutations of copies of `dist/browser/view/run-screen-state.js` and `run-entry.js`, each run with `node --test --test-reporter=tap` on copies of the test files | 0 (script); per run below | log `reports/review-return-files/mutate.log` |
| - no mutation, on `run-screen-state`, `end-window-game`, `end-question`, `uncaught-failure`, `state-store` | 0 each | 18, 27, 17, 19, 12 pass |
| - `entered does not reopen the window at halt`, all five files | 0 each | no test holds the reopening |
| - `entered stops whole at halt`, guard file | 1 | guard case fails |
| - `left keeps the wait at halt`, guard file | 1 | guard case fails |
| - `left closes the question at halt`, guard file | 1 | guard case fails |
| - `page: Koniec przejscia stops at halt in run-entry`, all five files | 0 each | no test holds the page route |
| - `page: end of effect stops at halt in run-entry`, all five files | 0 each | no test holds the page route |
| Positive control: `openWindow` of the copied `run-entry.js` made a no-op, `node --test --test-reporter=tap tests/view/end-window-game.test.mjs` | 1 | 4 fail, 23 pass (`reports/review-return-files/control.log`); the copies are loaded |

`dist/browser` was built after the latest change of the sources it compiles (sources 08:46 and 09:01, `dist` 09:08, the head's sources unchanged since `94c0c560`).

Not run: the full gate (`npm test` with no path), which belongs to the cycle. `tests/view/game-saver.test.mjs`, which also calls `halt()`, was not run under the mutations: it tests saves, not the window.

## Reaches beyond the dispatch

- `src/browser/view/end-window.tsx:30-104`, `src/browser/view/run-screen.tsx:225-274`, `src/browser/view/run-entry.ts:60-179`: to see where „✕”, Escape, „Koniec przejścia” and the end of the effect enter the state (Minor 1, and the page-route mutations).
- `tests/view/end-question.test.mjs:915-959`, and a grep of `Escape` in `tests/view/end-window-game.test.mjs`: to see whether a page test holds the question or Escape after halt.
- D-370 (`foundations/decisions.md:10504-10528`), read whole while reading D-368 and D-371 around it: on Escape read in the window.
- `.runs/task-cycles/podzial-trzech-miejsc/plan.md` lines 13-14 and 244, `task-frozen.md` line 33: what the task asks of D-323.
- `a file of the author's private notes`: the user's rule before writing a script.

## Working copies

`.runs/review-return/` under the worktree held copies of `dist/` and `tests/`, the script `mutate.mjs`, `mutate.log` and `control.log`. `mutate.mjs`, `mutate.log` and `control.log` are kept beside this report in `reports/review-return-files/`. The directory `.runs/review-return/` is removed (`Test-Path` false). No worktree or clone was made. `git status --short` of the reviewed worktree is empty.

## Unread material

- `reports/return-step-handoff.md`: not read; the handoff of this review and the return step's report gave what the step claims.
- D-311, D-368, D-371, D-323: read whole. The return step's report and `return_step.md`: read whole. `run-screen-state.test.mjs` and `run-screen-state.ts`: read whole.
- `end-window-game.test.mjs`: lines 1210-1230 and a grep of `Escape` only.
- The plan and the frozen task: only the lines that name D-323.

## Searches not found or unclear

- No test presses Escape in the end-of-run window after `halt()` (grep of `Escape` and `halt` in `tests/view/`). This is the ground of Minor 1.
