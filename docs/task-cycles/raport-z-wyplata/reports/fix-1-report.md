# Fix report 1 — the three Minor findings of the whole-change review

**Status:** done

**Commit:** `e3f64ea9` (range `1a4b79b8..e3f64ea9`; 9 files: `foundations/decisions.md`, `guidelines/styleguide-browser-view.md`, `src/browser/sim/loop.ts`, `src/browser/styles.css`, `src/browser/view/away-report.ts`, `src/browser/view/controls/button.ts`, `src/browser/view/controls/react-button.tsx`, `src/browser/view/headquarters.tsx`, `tests/sim/loop.test.mjs`). The fourth Minor finding (outside the task) was not touched.

## Findings

1. **Roles table — fixed.** The `positive` row (`guidelines/styleguide-browser-view.md`, row of the Roles table, line 30) now ends its list with "oraz jako tekst przycisku „Odbierz”, który wypłaca czekającą wprawę". `prettier` pads every row of the table to its longest cell, so the 28 lines of the table changed by padding; `git diff -w` shows only the two real differences (the `positive` row and the separator line's width). Check: `npx prettier --check src tests guidelines/styleguide-browser-view.md` → exit 0; `python -B .the-way/elements/common/foundation_check.py` → `0 errors`.
2. **Events of the refusal paths — fixed.** `tests/sim/loop.test.mjs`, the case "taking the practice twice in a row …": the four refusals (a second take, a loop with nothing waiting, a character with no loop, a character not in the team) now assert `result.state` identity and `result.events` equal to `[]`, each named. Stryker on `loop.ts` lines 168–240:
   - before (reviewer): 34 mutants, 30 killed, 4 survived;
   - after my first test change, `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/loop.ts:168-240"` → exit 0, 32 killed, 2 survived (`loop.ts:192` events of `stopLoop`, and `loop.ts:235`);
   - I also added the case "taking the practice while the map run has ended in death pays only the loop's own practice and leaves that map run as it ended" (the branch `loop.run.death === null ? … : loop.run` is code I wrote; the case needs a transient state the loadable states exclude, built as the `stopLoop` case builds it), which kills the `235` mutant: second run → exit 0, 33 killed, **1 survived**.
   - **Survivor left:** `src/browser/sim/loop.ts:192`, `if (!found) return { state, events: [] }` in `stopLoop` made to return `["Stryker was here"]` — older code, not a refusal path of `takeLoopPractice`; your handoff says widen nothing else, so no test was added. (The reviewer's `223`/`226` survivors in `takeLoopPractice` are killed; the line numbers moved after the comment re-wrap.)
   Tests: `npm test -- tests/sim/loop.test.mjs` → exit 0, 44 pass.
3. **Comments not wrapped — fixed.** Re-wrapped to about 100 columns, text unchanged except one typo found while re-wrapping (`loop.ts`: "or none practice waiting" → "or no practice waiting"): `src/browser/sim/loop.ts` (comments of `waitingPractice`, `takeLoopPractice`, `endLoopRun`, `catchUp`), `src/browser/styles.css` (the shared-controls comment), `src/browser/view/headquarters.tsx` (the `AwayReport` comment and the focus comment of `takePractice`), `src/browser/view/controls/button.ts` (the kinds comment; its other lines were re-flowed with it), `src/browser/view/controls/react-button.tsx`, `src/browser/view/away-report.ts` (two comments), and D-241 in `foundations/decisions.md` (the binding paragraph and the rationale from "nothing to settle." to the end of the sentence on the preview), words unchanged. I did not re-wrap lines the task did not add (for example the `endLoopRun` comment was re-flowed whole because the added clause sat in the middle of it).

## Checks (command → exit code)

- `npm run typecheck` → 0
- `npx eslint src tests` → 0
- `npx prettier --check src tests guidelines/styleguide-browser-view.md` → 0 (`prettier --check guidelines` as a whole reports 11 files, among them guidelines this change did not touch; the same 11 before my change)
- `python -B .the-way/elements/common/foundation_check.py` → `0 errors`
- `node --test tests/sim/*.test.mjs` (after `npm run build`) → 0, 775 pass
- `node --test tests/view/*.test.mjs` (without `memory-limit*` and `page-document.test`) → 0, 1128 pass
- `npm test -- tests/invariants/test_browser_view_token_values.py` → 0; `test_design_token_contrast.py` → 0; `test_browser_view_focus_outline.py` → 0 (styles.css comment changed)
- Not run: the full `npm test` (the orchestrator's).

## Unread material

none beyond what the handoff names: I read `fix-handoff.md`, `minor-findings.md` and `.the-way/task-cycle/change/fix.md` whole. I did not read `reports/whole-review-report.md` or `whole-review-handoff.md` (the findings file quotes the review's words).

## Searches not found or unclear

- "the width each file keeps": no stated width in the guidelines; I took 100 columns from the files' own comments (most lines of the original comments stop at 98–100). Many older comment lines in `styles.css`, `headquarters.tsx` and `types.ts` run to 101–143 columns, so the rule is loose; I wrapped only what the task added.
- The reviewer's line numbers (`223`, `226`, `234`) shifted after the re-wrap; I matched the mutants by their code.

## Choices

- Added one test beyond the finding's two refusal paths (a map run ended in death) because Stryker listed the `235` survivor and the test is cheap and exercises code of this change. Cost if wrong: one extra test of a state the saved document cannot hold.
- Re-padded the Roles table as `prettier` requires, rather than shortening the clause until it fits (it cannot fit: the cell was already the widest).
