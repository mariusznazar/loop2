# Planner report — task `podzial-trzech-miejsc`, stage `plan-task`

- Status: **done with concerns**
- Plan: `.runs/task-cycles/podzial-trzech-miejsc/plan.md`
- Size report: `.runs/task-cycles/podzial-trzech-miejsc/plan-size.md` (last run of `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/podzial-trzech-miejsc/plan.md`, exit 0: six slices, all `fits`; the largest, Slice 6, about 132 000 estimated tokens)
- Check result: `slice_size.py` passed (exit 0). No test of the product was run; that is outside this stage. The size estimates of the files after the split come from measured line ranges at the base, not from code that exists yet.
- Worktree: `the worktree's root`, base `fc6e0046`. No tracked file was changed and nothing was committed (`git status --short` is empty).

## What the plan does

Four foundation rows and six slices, made in this order:

0. **Agent of the plan's *Foundation entries*** (before Slice 1, in a commit of its own): D-323 changed through `the-way-record-decision`, and `uncaught-failure-game-state` changed through `the-way-record-invariant` where its wording no longer holds (rows 3 and 4).
1. **Slice 1**: `kitchen-sink.tsx` divided into six modules of `src/browser/kitchen-sink/`, plus the styleguide sentence (row 1). The page's picture (exact markup and a screenshot) is collected before the split and compared after it.
2. **Slice 2**: the drawing of the start page moves out of `startApp` into `src/browser/view/page-places.ts`. `startApp` drops to about 360 lines and the size test keeps its mark.
3. **Slice 3** (Risk: trust boundary): the rest of `startApp` becomes module-level functions with an explicit page context. The acts on a standing game go to `src/browser/view/page-game-acts.ts`, and `startApp` stays at about 100–150 lines.
4. **Slice 4**: `createProgramsEntry`/`build` lose the pull of the previous save (`programs-pull.ts`) and the reset control (`programs-reset.ts`). In the same commit, `@unittest.expectedFailure` and its comment come off the size test.
5. **Slice 5**: `function-and-file-size` set to `Violated: no` through `the-way-record-invariant` (row 2).
6. **Slice 6**: To do 8 code and its test: the guards of `openWindow` and `effectEnded` in `run-screen-state.ts`, plus the guard case of `tests/view/run-screen-state.test.mjs`. Failing test first.

The order relative to the styleguide's example "Plan of a user-interface change" (environment → values → one screen → its states): not followed. The example is about building a look. This change adds no value, role or state; it moves code and changes one behaviour. So the slices follow the task's places and the size rule's mark instead.

## Sizes measured at the base

I measured the line counts with a working script, `.runs/planner/count-lines.mjs`. It parses the file with `@typescript-eslint/parser` and counts the lines that hold a token, which is how `max-lines`/`max-lines-per-function` count with `skipBlankLines` and `skipComments`. The totals match the size run of the base: `kitchen-sink.tsx` 890, `startApp` 449, `createProgramsEntry` 245, `build` 225.

- `kitchen-sink.tsx` groups: header and imports 26 · controls 304 (lines 46–411) · forms 181 (413–618) · menu 47 (620–679) · roles 126 (681–825) · tiles 166 (827–1006) · page and first draw 40 (1008–1064). Shared helpers: `reason` + `Forced` 12, `Section` 8, `FormFigure` 8, `ICONS` + `IconMask` 20. The largest function is `TileDrawing` at 65.
- `startApp` blocks:
  - places and `let` memory: 36
  - last resort: 17
  - `takeNotice`/`gameOf`: 8
  - `release`/`mainContent`/`drawMain`/`draw`/`change`: 67
  - `leaveGame`: 7
  - `placeCard`/`focusCard`: 23
  - waits: 18
  - `onPlace`/`whenNotBusy`: 27
  - `showGame`: 55
  - `showForms`: 13
  - `expire`/`reloadAfterConflict`: 12
  - `enter`/`loadGame`: 34
  - `checkSession`: 13
  - `setLogout`: 4
  - `logOut`: 38
  - `resetGame`: 37
  - `showReset`: 19
  - `start`: 18
- `app.ts` file: 590 lines, of which 141 are outside `startApp`.
- `programs-entry.ts` `build` blocks: memories 16 · `programShownOn`/`drawPrograms` 34 · `setPull`/`askPrevious` 15 · `leavePrograms`/`setResetState` 10 · reset acts 17 · `pullPrevious`/`answerPull` 52 · `setReset` 8 · DOM and list 46 · instance 26. `resetViewOf` at the factory level: about 10.

The working copy `.runs/planner/count-lines.mjs` stood in `.runs\planner\`. It is **removed**, along with the directory. Nothing else was made.

## Concerns and open questions, each with a proposed answer

1. **Does „✕” close the window after an uncaught error?** If the plan is followed, the window will open after the error but „✕” and Escape won't close it until the page is reloaded.
   - Acceptance criterion 1 allows only the guard case in `run-screen-state.test.mjs` to change. But `tests/view/end-window-game.test.mjs:1218-1229`, the case "after halt() the window's buttons change nothing", holds that „✕” does nothing after `halt()`.
   - To do 8 names only the guards at lines 225 (`openWindow`) and 241 (`effectEnded`), not `closeWindow` (234).
   - Proposed answer: keep `closeWindow` and the question guarded after the error, as in *Choices*. The cost is small, because D-323 already tells the player to reload.
   - The alternative is letting „✕” close the window too. That changes a second test's expectation, which the accepted criterion does not allow, so it needs the human.
   - If the orchestrator prefers the alternative, it is a question for the human, because it departs from acceptance criterion 1.
2. **D-323 is written before Slice 1, not with its code.** The slice that writes it would have to list `foundations/decisions.md` in *Change*. `slice_size.py` then counts that whole file, 1 293 884 characters, which is about 517 000 tokens. So D-323 and `uncaught-failure-game-state` go to the agent of the plan's *Foundation entries*.
   - That agent changes an approved decision. I suggest dispatching it on a class no cheaper than `same`.
   - Its handoff should carry the *Choices* row on the window's reach, so that the sentence and Slice 6 agree.
3. **One commit with a stale invariant.** Between Slice 4 and Slice 5, `function-and-file-size` still reads `Violated: yes` while its test passes unmarked.
   - The handoff's rule (no commit with the test failing unmarked, or marked and passing) holds.
   - Merging Slices 4 and 5 makes the slice about 160 000 tokens, over the limit.
   - Proposed answer: accept it. The task says "w tej samej zmianie" (in the same change), which the PR satisfies.
4. **Slice 1's markup comparison could show differences that aren't real changes.** It assumes React writes the same markup when components only change module. That should hold: the component tree and the order of Hooks don't change.
   - Should the comparison show a difference only in React's generated ids, the agent should report it, not accept it silently. A reviewer can then judge it against the screenshots.
5. **`npm run kitchen-sink` also opens the default browser** on the developer's machine (`scripts/kitchen-sink.mjs`, `openInBrowser`), on top of the Playwright session. That is the product's own command; I found no flag that skips the launch.
6. **Expected sizes after the split are estimates.** They come from the measured blocks minus what moves, plus a guess for the extra parameters and wiring: `startApp` about 100–150, `app.ts` about 360, `page-places.ts` about 160, `page-game-acts.ts` about 130, `build` about 130, `createProgramsEntry` about 150. Each slice's `node tests/quality/eslint-size-rules.mjs` check confirms them.

## Guidelines found missing or uncertain

- `guidelines/coding-browser-module.md`, table "Files of this kind": it will get no rows for `page-places.ts`, `page-game-acts.ts`, `programs-pull.ts` and `programs-reset.ts`. That is the task's *Out of scope*, so no finding to act on, only to note.
- `guidelines/testing.md` gives `npm test -- <file>` for exactly one file, and it builds the game each time. Slices 2–4 and 6 name 6–9 view test files each, so each slice repeats the build. Uncertain cost, not a defect.
- `guidelines/coding-browser-module.md`, rule "Nowy ekran i moduły w DOM", reads "Strona (`src/browser/view/app.ts`) … buduje … nagłówek i blok główny". After Slice 2 the page's places are built in `page-places.ts`. Slices 2 and 3 are told to correct exactly such sentences (To do 7).
- I found no product rule on whether module-level functions taking an explicit context are preferred over a factory with nested closures. The view's files use factories with closures throughout. Slice 3's form is my choice under *Choices*; the slice's own review judges it.

## Reaches beyond the dispatch

- `foundations/decisions.md`:
  - Located by heading, with their ranges computed, and named in the slices' *Read*: D-262, D-381, D-280, D-286, D-96, D-97, D-209, D-211, D-213, D-225, D-402, D-401, D-400, D-166, D-281, D-356, D-253, D-368, D-370, D-322, D-324, D-173. Reason: the code that moves names them. Not read whole by me; see Unread.
  - D-253 lines 1962–1975 read, to check the log-line place `view/app.startFrom`.
- `foundations/invariants.md`:
  - Read whole: `eslint-source-rules`, `ruff-source-rules`, `shellcheck-source-rules`, `prettier-source-format`, `node-test-selection`, `focused-test-execution`, `expired-session-unsaved-progress`, `cross-part-imports`, `page-address-fragment`, `browser-failure-report`, `failure-watcher-message`, `loop2-deploy-log-dump`, `deploy-workflow-input`, `instrument-game-agreement`.
  - Listed by *Part* to find what the change reaches.
- `.the-way`, read to follow the cycle and the method:
  - `task-cycle/skill/foundation_step.md` (whole)
  - `task-cycle/skill/SKILL.md:380-459` (how the plan's *Foundation entries* are dispatched)
  - `product-guidelines/reading.md` (whole)
  - `task-cycle/change/ui_check.md` (whole)
  - `elements/invariants/skill/SKILL.md` (whole)
  - `task-cycle/slice_size.py` (head and limits)
  - `elements/common/foundation_check.py:600-640` and a grep for `Violated`, to see whether the check ties `Violated` to an expected failure (it doesn't).
- Code and tests, read for cutting and for checks:
  - `src/browser/view/game-view.ts:160-245`, `src/browser/view/run-entry.ts:125-175`, `src/browser/view/program-list.tsx:93-101`
  - `tests/view/end-window-game.test.mjs:1210-1229`, `tests/view/uncaught-failure.test.mjs` (case names)
  - `tsconfig.kitchen-sink.json`, `tsconfig.browser.json`, `scripts/kitchen-sink.mjs` (parts), `eslint.config.mjs:55-100`
  - `tests/quality/test_quality_invariants.py:10-30,51-85`, `tests/invariants/test_application_build_kitchen_sink.py:1-120`, `tests/invariants/test_browser_view_token_values.py:570-595`
  - `package.json` scripts, `scripts/build.mjs` (grep)
  - `.claude/skills/loop2-play/SKILL.md:1-150` and a grep of the rest
- Searches across `src`, `tests`, `guidelines` and `foundations` for `startApp`, `createProgramsEntry`, `kitchen-sink.tsx`, `app.ts`, `view/app.` and `halt`/`openWindow`/`effectEnded`.

## Unread material

- **Tests of `tests/view/` that cover `startApp` and Programy**: located, not read. They are `account-screen`, `login-card-focus`, `owner-panel`, `previous-save`, `uncaught-failure`, `program-list`, `program-panel`, `screen-registry` and `menu-bar`. I located them by their imports and the strings they use, and from `uncaught-failure` read only the case names. They are named as checks, not as reading.
- **Modules the split moves code into or out of**: read in part.
  - `game-view.ts`: lines 160–245 and its exports.
  - `account-card.tsx`, `menu-bar.tsx`, `waiting-screen.tsx`, `program-list.tsx`, `screen-registry.ts`: only their export lines (plus `program-list.tsx:93-101`).
  - `page-sentences.tsx`, `header-rows.tsx`, `last-resort.ts`, `previous-save-lines.ts`, `email-confirmation.ts`, `password-reset.ts`, `screen-address.ts`: not read (only the first lines of `screen-address.ts`).
  - Each is named in a slice's *Read* as a whole file or a range.
- **`tests/quality/test_function_and_file_size.py`**: read in part (a grep of its marks, comments and test names, lines 77–158).
- **Invariants of `browser-view` and `build-tools` not read whole**: every one not listed above as read, among them `browser-view-token-values` (named in Slice 1's *Read*), `browser-view-focus-outline`, `content-identifiers`, `application-build-output`, `preview-server-access`. I judged them by *Part* and title only.
- **`.runs/orchestrator/index.md`**: not read. I located entries in `foundations/decisions.md` by their headings instead.
- **The entries the plan names that I did not read whole**: the decisions listed under the reaches above, other than D-253 (lines 1962–1975 read).

## Searches not found or unclear

- **The note `the author's private note on three screen matters from a session in the browser`, section 1**, which the task cites for To do 8: not looked up. It is in the author's private notes, outside the worktree and outside this handoff. The plan reads To do 8 from the task's own text and the code's lines 225 and 241.
- **What "w tej samej zmianie" in To do 6 means**: unclear. It could mean the same commit or the same change as a whole. I read it as the change (the PR) for the invariant, and kept the handoff's per-commit rule for the test's mark.
- **A full-page flag of `playwright-cli screenshot`**: not found. The skill shows only `--filename`, so Slice 1 says "a screenshot of the whole page" and leaves the flag to the agent.
- **Whether To do 8 also needs `src/browser/view/app.ts` or `src/browser/view/state-store.ts` changed**: by my reading of `run-entry.ts:155-167` and `run-screen-state.ts`, it doesn't. Those files only make the halt. Slice 6 is told to stop and return if it finds otherwise.
- **The meaning of "the window works after the error" against acceptance criterion 1**: unclear. See concern 1.
