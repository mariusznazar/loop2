# Executor report — slice 6: the chronicle: a row already drawn is not drawn again when an entry arrives above it

**Status:** done

## The test stands

The test is in place. Nothing under `src/` changed. For the return step and D-382's *Verification*: the clause "a row already drawn is not drawn again when an entry is added above it" now has a test. It is the case "an entry recorded above the rows drawn draws its own row alone" in `tests/view/tabs-area.test.mjs`, and it fails when the `memo` around `Row` in `src/browser/view/tabs-area.tsx` is removed. The part of D-382's *Verification* that says "an agent compares a change with the part no invariant and no test holds" for these rows can now name this test. Changing that entry is not this slice's work: the slice writes no foundation entry.

## Files and commits

- `tests/view/tabs-area.test.mjs`: 105 lines added, 3 removed.
- Commit `1f21cf914fcff94475e8e77c599091a1ec607a33`: "test: :white_check_mark: add the case of the chronicle in which an entry recorded above the rows drawn draws its own row alone, read through the hook of React's developer tools with no change of the product, and seen failing with the memo of the row removed". Range: `74308be59d083c3c7d07baa626e4eaad59e4e706..1f21cf91`.

## How the test sees React's draws without a change of product code

- **The hook.** The test file sets `globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__` (fields `supportsFiber`, `inject`, `onCommitFiberRoot`). react-dom looks for this hook once, when it loads (`injectInternals`, `node_modules/react-dom/cjs/react-dom-client.development.js:1113`). After that it passes every committed root to `onCommitFiberRoot` (same file, `:19953`).
- **Load order.** react-dom must load after the hook is set. So the static `import { createRoot } from "react-dom/client"` became `const { createRoot } = await import("react-dom/client")`, placed after the hook. The harness `page-document.mjs` is still the first import, so D-264's order (harness before React) holds. None of the other modules the file imports loads react-dom: a grep for `react-dom` in the dist modules and in `tests/sim/understanding-fixture.mjs` found nothing, exit 1.
- **What counts as a draw.** `watchRows()` walks each committed tree. It finds every `li.chronicle-row` host fiber and takes its parent, which is the `Row` component. A row counts as drawn in a commit in two cases:
  - its element is new;
  - its component is a different object from the one the last commit left, and it carries React's flag of performed work (`1`).
- **Why the object comparison is needed.** React copies a component it reaches in a render and sets that flag only when the component's function ran (`node_modules/react-dom/cjs/react-dom-client.development.js:10584`). A copy resets the flag (`createWorkInProgress`, flags masked to static ones). A component in a part React skipped keeps its old object, and its flag can be left over from an earlier render. Comparing objects first stops a stale flag from counting as a new draw.
- **Whether other cases are affected.** The hook stays in place for every case of the file. `onCommit` is null outside the new case and is reset in `finally`. The 13 other cases pass with the hook in place.

## Checks

| Command | Exit | What it showed |
|---|---|---|
| `npm.cmd test -- tests/view/tabs-area.test.mjs` (first green run, first form of the case) | 0 | 14 of 14 passed |
| `npm.cmd test -- tests/view/tabs-area.test.mjs` with `memo` removed (first red run) | 1 | The case failed at its control step, not at the main assertion: "precondition: the watch sees the paragraph's row drawn again, its encounter changed: expected ["212"], got ["212","200","0"]". The control asked for the paragraph's row *alone*, so without `memo` it failed before the main assertion. I changed the control to ask only that the paragraph's row is among the rows drawn (`includes("212")`). |
| `npm.cmd test -- tests/view/tabs-area.test.mjs` with `memo` removed (second red run, final form of the case) | 1 | 13 passed, 1 failed, at the main assertion: "the new row alone drawn: expected ["230"], got ["230","212","200","0"]" |
| `git checkout -- src/browser/view/tabs-area.tsx` then `git diff --exit-code -- src` | 0 | Product file restored byte for byte |
| `git status --short -- src` | 0 | Empty output |
| `npm.cmd test -- tests/view/tabs-area.test.mjs` (green run, final form, `memo` restored) | 0 | 14 of 14 passed |
| `node node_modules/prettier/bin/prettier.cjs --check tests/view/tabs-area.test.mjs` | 0 | Formatted |
| `node node_modules/eslint/bin/eslint.js tests/view/tabs-area.test.mjs` | 0 | No report |
| `node --test tests/view/tabs-area.test.mjs tests/view/chronicle.test.mjs tests/view/run-screen.test.mjs` | 0 | 63 of 63 passed. This is how the gate runs files (`node --test` with patterns, one process per file), so the load order of the hook holds there too. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors. This includes the check of the new `decision: D-382 "…"` quotation, which starts the sentence it cites. |
| `git status --short` after the commit | 0 | Empty output |

How the temporary break was made: in `src/browser/view/tabs-area.tsx`, `const Row = memo(function Row(...) {...});` became `const Row = function Row(...) {...};` (`memo` stays imported, since `ChronicleView` uses it). It was restored with `git checkout` before the commit, as the table shows.

Not run: the product's gate (`npm.cmd test` without a file, `gate_times.py`), which belongs to the orchestrator alone.

## Own-work check

- **The requirement most likely unmet:** that the case fails *because* rows under the new entry are drawn again, and not because the observation broke or because an earlier step failed.
- **The check:** the red run with `memo` removed, reading where the case fails.
- **What it showed:** the first red run failed at the control step, which hid the main assertion. After the control was narrowed, the case fails at the main assertion with ["230","212","200","0"] where ["230"] is expected.
- **Dead hook (mental mutation):** if the hook were never injected, the first control (`["212","200","0"]` at the first draw) would fail.
- **Watch reporting every row as drawn (mental mutation):** the green run with `memo` in place would fail at the main assertion.
- **Second requirement: no change under `src/`.** Shown by `git status --short -- src` and the restored diff above.

## Choices

- **The DevTools hook, not reading the fiber through the DOM.** The other way was reading React's internal property `__reactFiber$<random>` on the `li` element. Rejected because that property points to whichever of the two copies was set last, not to the committed one. The hook hands the committed root. Cost if wrong: both ways rest on React's internals (the hook's protocol, the fiber fields `child`, `sibling`, `return`, `stateNode`, `flags`, and the value 1 of the flag of performed work). A major React upgrade that changes them would break the case loudly at its controls, not silently.
- **The flag of performed work, not the identity of `memoizedProps`.** On a skip in `updateSimpleMemoComponent` (`:10203`), React keeps the old props object, so props identity would also work. Rejected because it rests on one line of the memo path. The flag is what React's developer tools read to tell a component that rendered.
- **A control before the main step.** The paragraph's row is drawn again when its encounter changes (`show` with `WOLF_AFTER`). This shows the watch sees a redraw of an existing row, not only a new row, so "none of the rows under it" cannot pass by a blind watch. The control asks only that the paragraph's row is among the rows drawn, so the `memo` break shows at the main assertion.
- **Rows by minute.** The case names the rows by their minute ("230", "212", "200", "0"), from the values it records itself.

## Mismatches

- The *Read* passage of the task (To do 1) names `src/browser/view/right-area.tsx`. The plan, the slice and the code use `src/browser/view/tabs-area.tsx`, where `Row` with `memo` stands. This is a small mismatch: I followed the plan and the code.

## Reaches beyond the handoff

- `.the-way/elements/common/foundation_check.py:73-81`: the rule for `decision:` quotation lines, so that the new citation passes (it must start a binding sentence).
- `node_modules/react-dom/cjs/react-dom-client.development.js`: lines 1113-1130 (`injectInternals`), 10203-10236 (`updateSimpleMemoComponent`), about 10578-10584 (`updateFunctionComponent`, flag 1), about 5125-5130 (`createWorkInProgress`, flag reset), 19925-19966 (`onCommitFiberRoot` call), 31115-31154 (injection at load). Read to confirm how React 19.3.1 reports commits and marks a render.
- `scripts/test.py:1-70` and `scripts/test-node-file.mjs`: to confirm that the gate runs `node --test` over patterns with the default isolation of one process per file. If several files shared one process, react-dom would load before the hook.

## Working copies

- `.runs/executor-6/` in the worktree held the logs of the test runs (`green1.log`, `red.log`, `red2.log`, `green2.log`, `multi.log`, `foundation.log`). It was removed before return. No worktree or clone was made.

**Unread material:** none. The guideline files were each read whole: `guidelines/testing.md` and `guidelines/styleguide-browser-view.md` in two pages each, `guidelines/coding.md` in one.

**Searches not found or unclear:** the task's To do 1 names `src/browser/view/right-area.tsx`, which is not where `Row` stands. The code has it in `src/browser/view/tabs-area.tsx`, which the plan names.
