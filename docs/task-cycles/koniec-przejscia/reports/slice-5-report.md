# Report — slice 5 of koniec-przejscia (the lines of the end leave the world area, the band yields to the window)

**Status:** done with concerns (concerns: a reach into `tests/view/end-question.test.mjs`, which the Change list does not name; the kept deposit function of `trip-lines.ts`, where the plan said it leaves; no real-browser check, as binding note 4 allows).

## Commit and files

Commit `87558d20` on `task/koniec-przejscia` (base `35c03cd`), message "feat: :sparkles: take the lines of the end out of the world area and hide the band of an ended map run, as the window names them". Author `the author's address` (checked with `git log --format='%h %ae'`). Staged by path, no `git add -A`. `foundations/` untouched. No CSS but one rule removed.

| File | Added | Removed |
|---|---|---|
| `src/browser/view/world-area.tsx` | 8 | 16 |
| `src/browser/view/trip-lines.ts` | 0 | 20 |
| `src/browser/view/discovery-band.tsx` | 5 | 5 |
| `src/browser/styles.css` | 0 | 5 |
| `tests/view/world-area.test.mjs` | 34 | 28 |
| `tests/view/trip.test.mjs` | 20 | 44 |
| `tests/view/discovery-band.test.mjs` | 10 | 6 |
| `tests/view/end-question.test.mjs` (reach, see below) | 5 | 5 |

Total: 82 added, 129 removed.

## What I made

- **`world-area.tsx`**: the deposit line (`trip.deposited`) and the death settlement line are no longer drawn; the import of `deathSettlementLine` is gone. The world area now draws the scene, „Teraz”, „Potem”, the body row with the backpack, the solved-map line, the practice line, the preview line, the drawing and the tile line. The doc comment says the deposit and the settlement stand in the window (D-185, D-216).
- **`trip-lines.ts`**: `deathSettlementLine` removed. Its only users were the world area and its test; the window already has its own settlement text in `end-window-lines.ts` (`endCostLine`), so no duplicate remains.
- **`discovery-band.tsx`**: returns nothing when the map run has ended (`mapRunEnded`), in death or completion; the `ended ? null :` branch that left out „Wznów” is gone, so „Wznów” is always drawn in a band that stands.
- **`styles.css`**: rule `.trip-result.danger` removed. Nothing else used it (grep of `src/`, `tests/`, kitchen-sink).
- **Tests** (changed first, each against its requirement):
  - `world-area.test.mjs`, the main case: the completed screen expects no deposit line (D-185, the window holds it), the solved line stays; the dead screen expects no settlement line (D-216, the window holds it) and the practice line (D-201, it stays after a death). Title and comment updated.
  - `world-area.test.mjs`, the resurrection case: a death that used a resurrection has no `trip-result` line in the world area (D-216). The replacement that checks the same text in the window is `tests/view/end-window.test.mjs`, the case at line 271 ("a streak that meets the map's condition ... cost ... Do skrzynki: patyk 3" and the settlement text, `Wskrzeszenie nie było gotowe`).
  - `trip.test.mjs`, the "six screens" case: now checks the two lines the world area reads (solved line, preview) and asserts the deposit and the settlement are absent from them (D-185, D-216, D-311). The deposit text remains checked by "completion keeps actual deposit text" (the window reads it).
  - `trip.test.mjs`, the load case: the settlement is compared as the state record `run.deathSettlement` (the window reads that record), no longer through the removed function (D-216, "after a load too").
  - `discovery-band.test.mjs`: the case that expected a band with no „Wznów” at a completion or death is replaced by a case that expects no band at either end, and the running map run keeps the band with „Dodaj regułę z tym” and „Wznów” (D-122). The replacement that checks the same discovery in the window is `tests/view/end-window.test.mjs` line 226 (labels `["Dodaj regułę z tym"]`, the discovery's text) and `tests/view/end-window-game.test.mjs` line 783 (the window's „Dodaj regułę z tym").
  - `end-question.test.mjs` (reach, see below): the completed case expected a band with no „Wznów”; now it expects `place.area` `["run-program-place"]` and no `.discovery-band` (D-122). The comment at the head of the case is updated.

## Checks (command and exit code)

Red runs first, on the old product code, after the test changes:

- `npm test -- tests/view/world-area.test.mjs`: exit 1. Failing: the stand-from-the-top case (`expected ["scene","now-row","next-row","body-row","world-drawing","tile-line"]`, got the same with `trip-result` for the settlement or deposit) and the death case (`expected [], got a note of the author's backlog`). Log `reports/s5-red-world-area.log`.
- `npm test -- tests/view/trip.test.mjs`: first run exit 1 on my own precondition (`undefined` where the state holds `null`); fixed to `null`. Log `reports/s5-red-trip.log`. Rerun: exit 0, 9 pass (`reports/s5-red-trip-2.log`). These cases narrow what is checked; the functions they test still return the same values, so they pass on the old code. The red failures for this slice are in the world area and the band.
- `npm test -- tests/view/discovery-band.test.mjs`: exit 1. Failing: the ended-run case (`expected null, got <div class="discovery-band">`). Log `reports/s5-red-discovery-band.log`.

Green runs after the product change (final, after the two test fixes):

- `npm test -- tests/view/world-area.test.mjs`: exit 0, 21 pass (`s5-final-world.log`).
- `npm test -- tests/view/trip.test.mjs`: exit 0, 9 pass (`s5-final-trip.log`).
- `npm test -- tests/view/discovery-band.test.mjs`: exit 0, 9 pass (`s5-final-band.log`).
- `npm test -- tests/view/run-screen.test.mjs`: exit 0, 20 pass (`s5-final-run-screen.log`).
- `npm test -- tests/view/end-window-game.test.mjs`: exit 0, 20 pass (`s5-final-end-window-game.log`).
- `npm test -- tests/view/end-window.test.mjs`: exit 0, 13 pass (`s5-final-end-window.log`).
- `npm test -- tests/view/end-question.test.mjs`: exit 0, 17 pass (`s5-final-end-question.log`); this was exit 1 on the first run of the code change (the completed case), fixed as the reach below.
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0, "Ran 4 tests … OK" (`s5-final-token-values.log`).
- `npm run typecheck`: exit 0 (`s5-final-typecheck.log`).
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view tests/view`: exit 0 (`s5-final-eslint.log`). The first run was exit 1 on an unused `USED_LINE` constant in `trip.test.mjs`, removed.
- `node node_modules/prettier/bin/prettier.cjs --check src/browser/view src/browser/styles.css tests/view`: exit 0 (`s5-final-prettier.log`).

Not run: the full suite and `foundation_check.py` (the cycle's gate, as the handoff says); the real browser (binding note 4).

## Own-work check

- **Requirement most likely missed:** the band must stand at no ended map run, and the window must still name the discovery, the deposit and the settlement after the lines leave the world area (D-122, D-185, D-216).
- **Check:** the band test's ended-run case, plus a mutant: I deleted the `if (state.run !== null && mapRunEnded(state.run)) return null;` line in `discovery-band.tsx`, ran `npm test -- tests/view/discovery-band.test.mjs`: exit 1, 1 fail (`s5-mutant-band.log`). Restored the file (one occurrence of the line confirmed), reran: exit 0 (`s5-restored-band.log`). The window's own cases for the same texts (end-window.test.mjs, end-window-game.test.mjs) pass: exit 0 both.
- **What it showed:** the new case catches the band drawn at an ended run; the window's texts are still covered by its own cases.
- **Not done:** no mutant for the world area's removed lines; the world-area case that asserts their absence was seen failing on the old code (red run above).

### Real-browser and screenshot check

Not done. Binding note 4 says the orchestrator's real-browser check covers the world area without the lines. No screenshot taken or kept. The states in code: the band has no ended-run branch left; the removed `danger` variant of `.trip-result` had no user.

## Reaches beyond the dispatch

- `tests/view/end-question.test.mjs` (not in *Change*): the case at about line 829 expected the band at a completion (`place.area` with `discovery-band`, and a band button check). Under the new requirement (D-122) no band stands at a completion, so the case failed once the product changed (`expected ["discovery-band","run-program-place"], got ["run-program-place"]`). I changed the two assertions and the comment at the head of the case; I did not weaken any check. The Change list did not name this file, and the handoff's "three test files" did not include it; the orchestrator should confirm this reach.
- `src/browser/view/run-screen.tsx` 168–192 read (the band's placement in the program area; it stays, and `DiscoveryBand` returns nothing for an ended run, so the area holds only `run-program-place`). Not changed.
- `src/browser/view/game-view.ts`: grepped for band or discovery; only a comment at line 305. Not read whole. Not changed.
- `src/browser/view/end-window.tsx`: grepped (`discoveryLine`, `tripWarning`, `end-window-discovery`); not read whole. Not changed.
- `src/browser/view/end-window-lines.ts`: read whole. It calls `tripTexts(state).deposited` at line 105 and `itemList` at line 197. Not changed.
- `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`: read whole. `reserved_choices.md`: not read, the slice needed no language, framework or store choice.
- `guidelines/coding.md`, `coding-browser-module.md`, `styleguide-browser-view.md`, `testing.md` (in two reads), `src/browser/AGENTS.md`: read whole.
- `foundations/invariants.md` 405–500 (eslint-source-rules, prettier-source-format, browser-view-token-values, browser-view-focus-outline, design-token-contrast, design-token-sources) and `foundations/part_map.md` 1–30: read.
- `the author's rules for git`: read before the commit, as the user's instructions say.
- `reports/slice-4-report.md`: read whole.

## Unread material

- The task passages (`task.md:31`, `:42`, `:79-85`, `:116-121`, `:151-176`, `:178-189`, `:208`): used as the handoff copies them. I did not open `task.md` itself.
- `foundations/decisions.md` D-362: named inside the text of D-122 and D-185, not in the handoff's list of current ranges. Not read.
- `run-screen.tsx`, `game-view.ts`, `end-window.tsx`: partial, see Reaches.
- `.the-way/task-cycle/change/fix.md` and `project-level/technology/reserved_choices.md`: not needed for this slice.

## Searches not found or unclear

- The plan (and the Goal) says the deposit function of `trip-lines.ts` leaves with the part of `tripTexts` that gave the deposit. The window's `endCostLine` calls `tripTexts(state).deposited` (`end-window-lines.ts:105`), so that part cannot leave. Binding note 2 says a function leaves only where nothing else uses it. I kept `tripTexts` whole (the deposit branch included) and removed only `deathSettlementLine`. See Choices.
- The handoff's list of changed files has seven entries; `end-question.test.mjs` is the eighth, see Reaches.

## Choices (way rejected, cost if wrong)

1. **Kept the deposit branch of `tripTexts`.** Rejected: removing it and moving its text into the window (a second copy of "Do skrzynki" next to the one in `end-window-lines.ts`). Cost if wrong: the orchestrator's plan says it leaves; if it wants that, the window needs its own deposit function, a small change in `end-window-lines.ts`.
2. **Removed `deathSettlementLine`.** Rejected: keeping it as a second source of the settlement text beside `endCostLine`. Cost if wrong: none found; no caller remains.
3. **Changed `end-question.test.mjs`** (reach). Rejected: leaving that case red, or returning `questions` for a case whose requirement (D-122) is already settled. Cost if wrong: one case is rewritten and can be reverted in one commit.
4. **Settlement load check in `trip.test.mjs` compares `run.deathSettlement`** instead of the removed function's output. Rejected: keeping the removed function alive for a test. Cost: the window's settlement text after a load is not checked by any test (the window test at `end-window.test.mjs:296` uses a state built in memory, not a load). A gap to note for the orchestrator, not a regression.
5. **Band removed as a whole for an ended run** (an early return), not by hiding it. Rejected: `hidden` on the band, which would leave the band in the tree and its buttons reachable. Cost: none found.
6. **Death case of the world area keeps the practice line** (`run-practice`), as D-201 says the line stays after a death. Rejected: dropping that line from the expectation. Cost if wrong: none.

## Problems as observed

- The handoff's file list and the plan's wording do not match the code on two points: the deposit function is used by the window, and `end-question.test.mjs` checks the old band at a completion. Both are handled above; the orchestrator should look at them before the review.
- In the trip file, the two cases that narrow what is checked pass on the old code (the functions still return the same values). This is expected for a removal; the red evidence for this slice is in the world-area and band files.
