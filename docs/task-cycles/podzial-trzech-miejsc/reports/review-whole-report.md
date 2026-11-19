PASS 7e8dcce3ba117edacd056ef3e78becf780b66081

# Review of the whole change (review-whole), task `podzial-trzech-miejsc`

Range: `fc6e0046..7e8dcce3`, eight commits (`8ca21555`, `dadc0afd`, `9885485c`, `7a16a73c`, `26c650cc`, `d0c29c43`, `47ef5894`, `7e8dcce3`). `git rev-parse HEAD` in the worktree is `7e8dcce3ba117edacd056ef3e78becf780b66081`, the head given. 20 files change; the files of each slice stay within its *Change* (the one addition, the comment of `tests/view/end-window-game.test.mjs:1219`, is the orchestrator's ruling for slice 6).

Counts: 0 blocking findings, 2 Minor findings within the task, 0 findings outside the task.

## Findings

### Critical

none

### Important

none

### Minor (within the task)

1. **`guidelines/coding-browser-module.md:365-370` — one clause is broader than the code.** The new sentence says that `startApp` gives the places and the record of memory as a parameter to the functions of the page, "co te działania wołają z powrotem w `app.ts`, dostają przez ten sam parametr". That holds for `logOut` and `resetGame`, which reach `expire`, `showForms`, `focusCard`, `reloadAfterConflict` and `showGame` through `page.calls` (`src/browser/view/page-game-acts.ts:114-160`, `:171-209`). It does not hold for `whenNotBusy`, the other act that calls back into `app.ts`. That function gets only `places`, and what it calls back (`reloadAfterConflict(page)`, `expire(page)`) comes as its own third argument `action`, a closure built in `showGame` (`src/browser/view/app.ts:212-215`, `src/browser/view/page-game-acts.ts:80-101`). `onPlace` gets only `places` too. Why it matters: To do 7 asks that the sentences of the guidelines that name the divided places agree with the code. A reader who adds an act after this sentence will look for a `calls` field that `whenNotBusy` never had and does not need. Nothing goes wrong in the code. Fix: one clause, for example „przez ten sam parametr albo, jak `whenNotBusy`, jako funkcję w osobnym argumencie”. This is the Minor finding of the slice 3 review (`reports/review-3-report.md`, finding 1). It is still true at the head and I grade it the same. It comes from slice 3 (`26c650cc`).

2. **`src/browser/view/run-entry.ts:154-155` — the comment on „Koniec przejścia” is half true after `halt()`.** The comment reads: "„Koniec przejścia” of the header opens the window; a question standing goes as „Wróć” closes it, since the window and the question never stand together (D-311)". Since slice 6, the first half holds after an error that no code handled too. The second half does not: after `halt()` `closeQuestionNow` refuses (`src/browser/view/run-screen-state.ts:131-135`), so a standing question stays, and the window stays unshown behind it (the guard case's `asking` part, `tests/view/run-screen-state.test.mjs:221-238`). The change did not make the comment untrue. At the base the whole comment was untrue after `halt()`, because the button opened nothing. But it describes exactly the behaviour To do 8 changes, and the slice brought the other comments on that behaviour up to date (`run-screen-state.ts:76-85`, `end-window-game.test.mjs:1219`). Why it matters: someone reading the button's handler alone gets a wrong picture after an error: the window and the question do stand "together" in the screen's state (`windowOpen` true with a question), and the question does not go. Two other things make this low-risk: the interface comment that `openWindow` calls says it right, and `closeQuestion` above it says "Nothing after `halt()`" (`run-entry.ts:60-61`). Fix: one clause, for example "a question standing goes as „Wróć” closes it, except after `halt()`, when it stays and the window waits behind it (D-323)". The file was outside slice 6's *Change*, so the finding comes from no slice. It is a gap of the plan's *Change* for slice 6.

## Coverage of the task

| Item | Met by | How I checked |
|---|---|---|
| To do 1: `startApp` under 200, page the same | `7a16a73c`, `26c650cc` | Size run at the head: `startApp` 97 lines (probe below). I compared each function moved out of `startApp` in slice 2 with its body at `fc6e0046`: `release`, `mainContent`, `drawMain`, `draw`, `change`, `gameOf`, `barPropsOf`, `sameBarProps` and the building order of header, bar, failure row, `main`, sentences and waiting screen. They are the same statements in the same order. The only difference is that the first waiting state and the waiting screen now share one object, `options.waiting`, where the base had two equal literals; nothing compares them by identity. Slice 3: I agree with the slice-3 review. I re-ran its crafted-input script on builds of the base `fc6e0046` and the head (whole range, see Checks): the output is byte-identical. |
| To do 2: `createProgramsEntry` and `build` under 200, Programy the same | `d0c29c43` | Sizes 149 and 138. Behaviour compared below (handoff point 2). |
| To do 3: `kitchen-sink.tsx` under 800, page-only code in modules of the directory | `dadc0afd` | The entry has 70 raw lines; the largest module, `control-samples.tsx`, has 305 lines of code. A script compared the top-level declarations of the six modules with the base file, with comments, imports, whitespace and `export` left out: every declaration is in the base and every base declaration is in the new modules. The only differences are four trailing commas that Prettier added when it re-wrapped (`reports/review-whole-ks-compare-out.txt`). |
| To do 4: the styleguide paragraph | `9885485c` | `guidelines/styleguide-browser-view.md:456-459`. It keeps the reason ("gdzie trafiłby do wyniku `npm run build`") and says the code stays in the directory "w modułach obok jej modułu wejściowego", which matches the settlement's „nie w jej module wejściowym”. No other sentence of the styleguide changed. |
| To do 5: no other place over a threshold | — | Size test at the base, with the mark taken off in my worktree: it names exactly `kitchen-sink.tsx` 890, `startApp` 449, `createProgramsEntry` 245 and `build` 225. |
| To do 6: the mark and its comment off, `Violated: no` | `d0c29c43`, `47ef5894` | The mark and the comment above it are gone, in the commit that clears the last place. The module docstring changed to "cannot pass the first case", which is true. The invariant reads `Violated: no`, and nothing else of the entry changed. The size test passes at the head with no expected failure. |
| To do 7: guideline sentences true of the code | `7a16a73c`, `26c650cc`, `dadc0afd` | I read every sentence that names `app.ts`, `startApp`, `page-places`, `page-game-acts`, `programs-*` or `kitchen-sink.tsx`, in `guidelines/`, `foundations/`, `src/browser/AGENTS.md`, `AGENTS.md` and `.claude/skills/`. `coding-browser-module.md:209-216`, `:291-292`, `:298`, `:308-309`, `:341-353`, `:355-366`, `:371`, `:391` and `:393-399` are true. `:369-370` is Minor finding 1. `coding.md:256-270`, "Size of a function and a file", is a rule and stays true. No foundation entry names a divided place. The opening comment of the kitchen-sink entry and of each new module is true. |
| To do 8: the window after an uncaught error | `8ca21555` (entries), `7e8dcce3` (code, a commit of its own) | Below (handoff point 1), and Checks: the unit test, plus the executor's page-level case, which fails on the base build and passes on the head. |
| Acceptance 1 | — | `git diff fc6e0046..7e8dcce3 -- tests/view/`: only the guard case of `run-screen-state.test.mjs` changes an expectation (the old "the wait goes on" becomes "the effect has ended after the error"). The old navigation scenario is kept as `away`. `end-window-game.test.mjs` changes one comment line. Seventeen view test files pass at the head. |
| Acceptance 2 | `7e8dcce3` | The `waiting` and `closed` parts of the guard case. The page-level case of `reports/executor-6-files/own-check.test.mjs`, run by me: it fails on the base build ("the effect's end opens the window after halt: expected a true value, got undefined", `reports/review-whole-own-check-base.log`) and passes 28/28 on the head build. |
| Acceptance 3 | `dadc0afd` | The executor reports byte-identical markup and screenshots before and after. I did not render the page. My own evidence is the declaration-by-declaration comparison above and the page build exiting 0. |
| *Settlements to record*, row 1 | `9885485c` | As To do 4. |
| *Out of scope* | — | The table "Files of this kind" has no new row. |

**Source fidelity of the foundation entries.**
- **D-323, third paragraph** (`foundations/decisions.md:4619`): what the code does and what To do 8 and the acceptance criteria give, with the orchestrator's Q4 ruling on „✕” and Escape. Each clause holds in the code:
  - "opens of itself once the scene's effect … has played": `effectEnded` no longer checks halt.
  - "at every entering": `entered` was never guarded.
  - "at „Koniec przejścia”": `openWindow` no longer checks halt.
  - "„✕” and Escape … close nothing": `closeWindow` keeps its guard.
  - "the question … is neither asked nor closed after it, „Koniec przejścia” included": `ask` and `closeQuestionNow` keep their guards. `left()` closes no question after halt either.
  - `forgetQuestion` clears a question whatever the halt, but it is reached only through `endRun` when the copy holds no unsaved changes (`run-entry.ts:101-108`). A standing question implies unsaved changes, and the copy cannot change after halt. So no path closes a standing question after the error.
  - "standing while the player is on the screen … and no question stands": `windowShown`.
- The precedence `narrows D-311 · narrows D-368 · narrows D-371`: I read the three entries whole. Each binds „✕” and Escape to close the window, so the precedence is needed and correct. It is the cycle's own: the request has to put it before the human, as `reports/foundation-report.md` says.
- On the Q4 reading: To do 8's „okno … po błędzie dalej działa” could be read as „✕” closing too. Acceptance criterion 1 keeps `end-window-game.test.mjs:1220-1229` ("„✕” leaves the window") unchanged, so the ruling follows the task's testable criterion. It is recorded in D-323's *Rejected*. I agree and raise nothing. Nothing regresses: at the base, „✕” after the error also did nothing.
- **`uncaught-failure-game-state`**, unchanged: correct. The window is no part of the game state or the save, and the invariant's tests pass (`state-store`, `uncaught-failure`).
- **Styleguide paragraph**: faithful to row 1 and question 1.
- **`function-and-file-size` `Violated: no`**: true. The test and the invariant agree.

## The handoff's points

1. **Coverage and source fidelity:** see above.
2. **Behaviour kept by the moves, after `halt()` and `dispose()`.**
   - **Slice 2** (`page-places.ts`): nothing it moved reads `halt` or `dispose` except `release`. `release` disposes the card or the view the next value no longer holds, the same as at the base. `onUncaught` still reads the current value (`places.shown()`) and calls `view.halt()` or `card.fail()`.
   - **Slice 4**: I compared `createProgramPull` and `createProgramReset` with the base `build`, line by line:
     - `ask`, `pullPrevious` and `answerPull` keep `options.disposed()` and `store.halted()` in the same places as `disposed` and `store.halted()` at the base. `answerPull` sets `rest` with no line after halt.
     - `set` refuses after dispose. `ask` and `confirm` of the reset refuse after halt, after dispose and with no control shown. `withdraw` and `leave` stay unguarded, as at the base.
     - `leavePrograms` keeps its order (numbering, drop and draw of the pull, then closing the confirmation).
     - The comparison by identity in `drawPrograms` still holds: `view()` and `state()` return the same object until a change.
     - `onReset` is read once at creation rather than at each call. `options` is readonly, so the value is the same.
     - `setReset` is assigned at the same point of `build`, before the list is made.
     - So the behaviour is kept, including after `halt()` and after `dispose()`.
   - The executor's two mutations that no test catches are gaps that were there at the base (Declined to judge).
3. **The comment at `run-entry.ts:151`** (actually `:154-155` at the head): Minor finding 2. It comes from no slice; it is a gap of slice 6's *Change*.
4. **The slice-3 Minor finding:** still true; it is Minor finding 1.
5. **Guideline sentences that name divided places:** true but for Minor finding 1 (see the To do 7 row).
6. **D-425 holds:**
   - `node tests/quality/eslint-size-rules.mjs` at the head ends 0 with `0 functions and files over a threshold`.
   - The size test passes in a worktree of the head with no expected-failure mark.
   - The invariant reads `Violated: no`.
   - A probe with the thresholds lowered to 60 and 100 gives these largest sizes of the changed code: `createProgramsEntry` 149, `build` 138, `createRunScreenState` 128, `createPagePlaces` 99, `startApp` 97, `app.ts` 373, `control-samples.tsx` 305. All are far under 200 and 800.

## Structure of the code the change leaves

- `change_file_sizes.py`: `app.ts` goes from 832 to 518 lines, `programs-entry.ts` from 404 to 233 and `kitchen-sink.tsx` from 1064 to 70. Nine new files, the largest `control-samples.tsx` (361 raw lines) and `page-places.ts` (304). Only `run-screen-state.ts` grew, by 1 line.
- The size test names nothing at the head. At the base it named the four places above. The change pushed nothing over a threshold.
- **Code with no user:** none found. `signedOut` and `GameStart` moved to `page-game-acts.ts` and are imported by `app.ts`. `ResetState` is exported and used by `programs-entry.ts`. The typecheck and ESLint runs are clean.
- **Names that stopped being true:** none in the code. The comments of `startApp`, `PageState` and `PageMemory` were updated. Minor finding 2 is the one comment left half true.

## Declined to judge

- **No test for asking the reset's confirmation after `halt()`, and a dropped `disposed` check on the answer to the pull's question goes unnoticed** (`reports/executor-4-report.md`, mutations 2 and 3). Out of scope: both gaps stand the same at `fc6e0046`. The checks moved unchanged, and the plan's slice 4 named no test file but the size test.
- **The status `copy` of the existing row `src/browser/view/app.ts` in the table "Files of this kind"** (`guidelines/coding-browser-module.md:19`), now that the file delegates to `page-places.ts` and `page-game-acts.ts`. Out of scope: the task's *Out of scope* leaves the table's statuses aside, and an audit of statuses is the work of `the-way-maintain-coding-guidelines`.
- **„Dodaj regułę z tym” in a window that opened after the error**: `closeWindow` does nothing and the act is refused, so the window stays. Out of scope: the same holds at the base for a window that stood before the error, and D-323's second paragraph gives way to nothing here.
- **D-323's *Verification*: the new complies and violates parts** that the guard case's `decision: D-323` line now holds. Out of scope here: the foundation agent leaves trimming them to the return step.

## Checks

All in the reviewed worktree at `7e8dcce3` unless named. No tracked file changed (`git status --short` empty at the end).

| Command | Exit / result |
|---|---|
| `git rev-parse HEAD` | 0, `7e8dcce3ba117edacd056ef3e78becf780b66081` |
| `python -B .the-way/task-cycle/change_file_sizes.py fc6e0046 7e8dcce3` | 0 (table above) |
| `npm test -- tests/quality/test_function_and_file_size.py` in a worktree of `fc6e0046`, mark taken off | 1; names the four places listed under To do 5 |
| `npm test -- tests/quality/test_function_and_file_size.py` in a worktree of `7e8dcce3` | 0, 2 tests OK |
| copy of `tests/quality/eslint-size-rules.mjs` with limits 60 and 100, in the head worktree, removed after | sizes listed in point 6 |
| `npm run typecheck` | 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the 13 changed `.ts`/`.tsx` files and the 2 changed test files | 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the same 15 files | 0 |
| `npm test -- tests/view/run-screen-state.test.mjs` | 0, 18 pass |
| `npm test -- tests/view/end-window-game.test.mjs` | 0, 27 pass |
| `npm test -- tests/view/end-question.test.mjs` | 0, 17 pass |
| `npm test -- tests/view/run-screen.test.mjs` | 0, 21 pass |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0, 19 pass |
| `npm test -- tests/view/state-store.test.mjs` | 0, 12 pass |
| `npm test -- tests/view/previous-save.test.mjs` | 0, 46 pass |
| `npm test -- tests/view/program-list.test.mjs` | 0, 23 pass |
| `npm test -- tests/view/program-panel.test.mjs` | 0, 60 pass |
| `npm test -- tests/view/screen-registry.test.mjs` | 0, 15 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0, 133 pass |
| `npm test -- tests/view/login-card-focus.test.mjs` | 0, 6 pass |
| `npm test -- tests/view/owner-panel.test.mjs` | 0, 4 pass |
| `npm test -- tests/view/menu-bar.test.mjs` | 0, 32 pass |
| `npm test -- tests/view/screen-address.test.mjs` | 0, 68 pass |
| `npm test -- tests/view/email-confirmation.test.mjs` | 0, 5 pass |
| `npm test -- tests/view/password-reset.test.mjs` | 0, 2 pass |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0, 2 OK |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0, 3 OK |
| `npm test -- tests/invariants/test_cross_part_imports.py` | 0, 10 OK |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0, 4 OK |
| `npm run kitchen-sink -- --build-only` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 145 warn, 7 info`; the change touches no instruction file |
| `node scripts/build.mjs` in worktrees of `fc6e0046` and `7e8dcce3` | 0, 0 |
| trust boundary: `reports/review-whole-crafted.mjs` (the slice-3 review's script, with `startMemoryLimit` called first as `guidelines/testing.md` asks of a file outside `tests/`) on the base and head builds | 0, 0; 27 cases each (7 confirmation fragments × 3 answers, 6 reset fragments); `fc /b` of the two outputs: no differences |
| `node --test .runs/rw/own-check.test.mjs` (`reports/executor-6-files/own-check.test.mjs`) in the base worktree | 1: 27 pass, the added case fails |
| the same in the head worktree | 0: 28 pass |
| `node reports/review-whole-ks-compare.mjs` on the base entry and the six head modules | 0: 55 new declarations, 4 differ from the base only by trailing commas, and the same 4 the other way |

Manual checks:
- Every moved function of slices 2 and 4 read against its body at `fc6e0046`.
- The guards of `run-screen-state.ts` and every caller in `run-entry.ts` read for what the question and the window do after `halt()`.
- Every guideline and foundation sentence that names a divided place read against the code.

Not run: the full gate (`npm test` with no path), which is the orchestrator's, as the handoff says. No screenshot was taken and the kitchen-sink page was not rendered; acceptance 3 rests on the executor's comparison and on my comparison of the source.

## Reaches beyond my selection

- `src/browser/view/run-entry.ts:30-260`, `state-store.ts:108-135`, `game-view.ts:104-113` and `:185-214`, `run-screen.tsx` and `run-header.tsx` (by search for `closeWindow` and `Koniec przejścia`): to see every caller of the changed guards and any other guard of halt.
- `tests/view/end-window-game.test.mjs:1200-1229`, `tests/view/memory-limit.mjs`, `tests/view/page-document.mjs:1-10`: to run the page-level case and the crafted-input script under the memory limit.
- `tests/quality/eslint-size-rules.mjs:1-80`: to make the probe of sizes.
- `foundations/decisions.md` D-322, first paragraph: the effect's wait, which slice 6's `effectEnded` touches.
- `a file of the author's private notes` and `git.md`: rules of the user's setup, which a hook asked for before the scripts and the worktrees.

## Working copies

- `.runs/review-whole/` held:
  - the index of my selection of decisions (`index.md`, `sections.md`);
  - `app-base.ts` and `app-s1.ts` (`app.ts` at `fc6e0046` and at `9885485c`);
  - `ks/` (the base entry, the six head modules, the comparison script and its output);
  - `crafted.mjs` and its outputs and logs;
  - the logs of every check;
  - two worktrees, `base/` at `fc6e0046` and `head/` at `7e8dcce3`, each with a directory junction `node_modules` to the task worktree's `node_modules` and with `dist/` and `.runs/rw/own-check.test.mjs`. The base worktree also had its size-test mark taken off.
- Removed, in this order:
  - the two junctions with `rmdir`, so that removing the worktrees could not reach the shared `node_modules` (`node_modules/eslint/package.json` still stands);
  - `git worktree remove --force` of both, then `git worktree prune`; `git worktree list` no longer shows them;
  - the whole directory `.runs/review-whole/`, which no longer exists.
- Kept beside this report:
  - `review-whole-crafted.mjs`;
  - `review-whole-ks-compare.mjs` and `review-whole-ks-compare-out.txt`;
  - `review-whole-own-check-base.log`.
- Not mine to remove: `dist/` and the outputs of `npm run kitchen-sink -- --build-only` in the task worktree, written by the product's own build.

## Unread material

**Decisions read whole: 10 of the 78 listed in full in the index of my selection** (sections "Code rules, exemplars and static checks", "Browser view: screens, navigation and their code", "Screen of a map run and the end-of-run window" and "Look of the browser view: styleguide, controls, pictures and fonts"; `--part` browser-view, build-tools, product-foundation and agent-workflow; `--decision` D-425, D-45, D-269, D-407, D-323, D-311, D-368, D-371). The 10 are D-323, D-311, D-368, D-371, D-324, D-173, D-425, D-407, D-45 and D-269. I ran through the 262 headings outside the sections and opened D-173, D-324 and D-322 from them.

Decisions that bear on the change and stayed unread whole:
- D-322: first paragraph only.
- D-370: binding sentence from the index only.
- D-401, D-402: heading only. Programy's pull and reset; behaviour compared in the code instead.
- D-96, D-97, D-209, D-211, D-213, D-225, D-262, D-281, D-286, D-352, D-381, D-253: heading only. They are kept by slices 2 and 3; the slice-3 review read them, and I compared the code and re-ran the crafted input instead.
- D-265, D-280, D-421: binding sentences from the index only.

Guidelines: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md` and `src/browser/AGENTS.md` were read whole. Of the other guideline files I read only the headers; their *Applies to* or index row does not match the work.

Invariants read whole: `function-and-file-size`, `uncaught-failure-game-state`, `application-build-kitchen-sink`, `page-address-fragment`, `cross-part-imports`. Not read: `eslint-source-rules`, `prettier-source-format` and `browser-view-token-values` (their checks ran and passed), and the other invariants whose *Part* names browser-view, build-tools or agent-workflow. Part map: read whole. Glossary of the product: the entries `map run`, `manual map run`, `completion`, `solved map`, `copy`, `previous save` and `previous-save privilege`. Glossary of the-way: not read.

Not read: `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md`. The change edits sentences inside existing rules and examples of two guideline files and adds or moves no section and no metadata.

## Searches not found or unclear

- The handoff names the comment at `src/browser/view/run-entry.ts:151`. At the head it stands at `:154-155`.
- The note `the author's private note on three screen matters from a session in the browser`, which To do 8 names for how the error arose in the browser session, is in the author's private notes. I did not open it. I judged To do 8 from the frozen task. The case the code covers is an error after the store took the result of the death; `screenState.taken` runs first in `onTaken`, `game-view.ts:194-198`. An error before that take leaves no ended map run in the game state, so no window can open, which D-323 gives.
- `node tests/quality/eslint-size-rules.mjs` "prints no line" in the plan: it prints the summary line `0 functions and files over a threshold …`. As the executors of slices 5 and 6 did, I read it as no line that names a place.
