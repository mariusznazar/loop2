# Fix 1 report — findings of the review of the whole change

Status: **done**. Head fixed `8e5af859`; four new commits on top, nothing uncommitted outside `.runs/`.

| Commit | Findings |
|---|---|
| `e305ba3f` | F1 |
| `29d2ebe0` | M1, M2, M3 |
| `8c5d3d7b` | M4, M5 (through the form of `the-way-record-decision`: template, `rules.md`, `way_of_working.md` read for the first change; entries edited in place, `foundation_check.py` run) |
| `b6b4bbff` | M6, M8 |

## F1 — fixed

- `tests/view/program-editor.test.mjs`: `const ITEMS_LISTED = Object.keys(ITEMS);` is now the literal `["stick", "berry", "moss", "fiber"]` with a comment saying why; the first item (`ITEMS_LISTED[0]`), `slice(1)` and the last item are taken from it as before, so the cases at `:158-176`, `:484`, `:524`, `:528` and the rest of the file's uses of the list no longer depend on the data's order. The now unused import of `ITEMS` is removed. No product code changed.
- Check, own trial (not committed, removed): `npm run build`, then `node --test tests/view/program-editor.test.mjs` on clean `dist`: **exit 0**, 59 pass. Then I appended to `dist/browser/sim/data/items.js` a made-up item `dummyFirst` first in `ITEMS` and ran the whole file: **exit 1**, 58 pass, 1 fail. The case that failed before (`:158`, "group conditions offer the same kinds …") and the cases of `:484-528` pass now. `npm run build` restored `dist` (`grep DUMMY` finds none).
- The one remaining failure with a made-up first item is the case „a known resource the map of the map run lacks stands greyed …” (`program-editor.test.mjs:1208`): it asserts the cells of the „Zapas poniżej” target pick, whose cells are the items of the data (`stock`, lines 1242-1250), so it lists the made-up `Dummy` first. That is an assertion of what the data holds (a list the product draws from every item), the kind `data.test.mjs` also makes, not a pick by position, and not the list the test passes to the product; F1 does not name it and I did not touch it. It is the third item of the editor-default group of out-of-scope matter O1 (the product, not the test, orders it); for the request's list.

## M1 — fixed

`src/browser/view/controls/react-number-field.tsx` header: `(D-265)` after "a screen with a rule of its own adds none here" is now `(D-395)`. The other `D-265` in the same header (the two forms) stays, it is right.

## M2 — fixed

Same file: "while a rejected trip count stays in it" is now "while a rejected text stays in it".

## M3 — fixed

`src/browser/view/trip-editor.ts`: `readTripCount(text: string): NumberReading | null`, with `import type { NumberReading } from "./controls/react-number-field.js"` (screen module imports the control's type, the direction D-395 allows). `src/browser/kitchen-sink/` does not import `trip-editor.ts`, so D-269 is not touched; the import is type-only and erased. Check: `npm run typecheck` exit 0, `npm run build` exit 0, `npx eslint src tests` clean, prettier clean, and `node --test` of `program-editor`, `react-controls`, `trip`, `trip-plan`, `rule-editor` tests: **exit 0**, 210 pass.

## M4 — fixed

D-395 *Rejected* was `unknown`; it now reads: "the control picking the rule of a screen by a value of its parameter `rule`, as `rule="trip"` did — the source keeps no cost or reason beside it, so none is known." It holds the way the row's source keeps (the function instead of the parameter) and says the reason is not kept; the binding sentence, *Verification* and *Rationale* are unchanged, so row 4's meaning stands.

## M5 — fixed

D-394 *Rationale*: the last clause is now "…and `actionFeasible` is their simplest point of observation of that." — the general principle about functions of the simulation is gone; row 2's meaning (`actionFeasible` alone) stands, binding sentences and *Rejected* unchanged. Check for M4 and M5: `python -B .the-way/elements/common/foundation_check.py` -> `0 errors` (exit 0).

## M6 — fixed

`tests/invariants/test_simulation_type_check.py`: new case `test_the_build_writes_nothing_beside_the_sources_of_the_simulation` (cites `invariant: simulation-type-check`): in a copy, `npm run build` exits 0 and no file under `src/browser/sim/` ends in `.js`, `.d.ts`, `.js.map` or `.tsbuildinfo`. The docstring's *Covers* lists it.
- Seen failing, once: I removed the line `"noEmit": true,` from `tsconfig.sim.json`, ran `npm test -- tests/invariants/test_simulation_type_check.py`: **exit 1**, `FAILED (failures=1)`, the new case, message "`npm run build` writes files beside src/browser/sim: tsconfig.sim.json emits what it should only check". Restored the file from a backup (`git status` showed only the test modified).
- Passing: same command with `noEmit` back: **exit 0**, 4 tests OK.

## M8 — fixed

Same test file: each planted use now carries its error code (`document` TS2584, `setTimeout` TS2304, `console` TS2584, `structuredClone` TS2304, as the run of the first report gave them). `plant_uses` returns the line of each use in the planted file; the typecheck case collects `(line, code)` of every `src/browser/sim/hex.ts(line,col): error TSnnnn:` in the output and asserts each name's pair is there. The compiler's sentence is no longer matched. It still tells the simulation's configuration apart from the browser's (which gives no error for any of the four). The other cases are as before. Check: the run above, exit 0.

## Checks (command, exit code)

| Command | Exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `node --test tests/view/program-editor.test.mjs` (clean `dist`) | 0 (59 pass) |
| same with a made-up item first (trial, removed) | 1 (58 pass; the one case above) |
| `node --test tests/view/program-editor.test.mjs tests/view/react-controls.test.mjs tests/view/trip.test.mjs tests/view/trip-plan.test.mjs tests/view/rule-editor.test.mjs` | 0 (210 pass) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| `npm test -- tests/invariants/test_simulation_type_check.py` without `noEmit` | 1 (the new case fails) |
| same with `noEmit` | 0 (4 pass) |
| `npx eslint src tests`; `npx prettier --check tests/invariants src/browser/view`; `ruff check` on the test | 0 |

Not run: `npm test` (the orchestrator's), the other invariant tests (no file they read changed except `tsconfig.sim.json`, restored byte for byte).

## Own-work check

- Requirement most likely not met: F1's, "the case holds whichever place a new item takes". Check: the made-up-item trial on the whole file — it showed the F1 cases pass and one data-content case fails, reported above rather than hidden.
- Second: M6's, that the new case really detects a missing `noEmit`. Check: the failing run without it.
- Mutation in my head for M8: a test that did not tie the code to the line would pass if another name got the same code; it is tied to the line of each use.

## Contested

None of the findings. One note for the request's list: the case at `program-editor.test.mjs:1208` (above) fails with a made-up first item and is not in the findings file.

## Unread material

None beyond the first report's list; the files I changed this time I read where I changed them (`react-number-field.tsx` lines 1-30 and 56-70, `trip-editor.ts` 1-30, `test_simulation_type_check.py` lines 22-111, the D-394/D-395 entries, `program-editor.test.mjs` 100-115, 155-180, 470-540, 855-895, 1208-1250). The `.the-way/task-cycle/change/fix.md`, the handoff and the findings file were read whole; `reports/review-whole-report.md` was not read (the handoff says it is for evidence only).

## Searches not found or unclear

- None. The line numbers of F1 (`:112`, `:484`, `:524`, `:528`, `:158-176`) matched the file.
