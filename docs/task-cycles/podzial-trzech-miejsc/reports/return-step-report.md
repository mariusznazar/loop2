# Report of the return step (step 11) - task `podzial-trzech-miejsc`

**Status:** done

**Commits** on `task/podzial-trzech-miejsc` (base of the step `94c0c560`):

- `6a031cc4` - `docs: :card_file_box: name in the Verification of D-323 what the guard case ... holds ..., and keep in its pair of examples only what no test holds ...`
- `99e4dcd0` - `docs: :card_file_box: say in the Verification of D-323 that the guard case holds a leaving of the screen that ends the wait ..., and not an entering that opens the window ...` (a correction of the first commit's clause, found by the own-work check below)

## Files changed

| File | Added / removed lines (both commits) |
|---|---|
| `foundations/decisions.md` (D-323, the *Verification* field only) | 3 / 3 |

Nothing else changed: no code, no test, no guideline, no other entry. `.the-way` pin checked: `git -C .the-way rev-parse HEAD` = `git ls-files --stage -- .the-way` = `bfb2e109735b5fff98802b8be0ff3c43c799262a`.

## Checks (command and exit code)

| Command (from the worktree root) | Exit | Result |
|---|---|---|
| `node tests/quality/eslint-size-rules.mjs` | 0 | `0 functions and files over a threshold in 323 files` |
| `python -B .the-way/elements/common/foundation_check.py` (after the first edit, before `6a031cc4`) | 0 | `0 errors` |
| `npm test -- tests/view/run-screen-state.test.mjs` | 0 | 18 of 18 pass |
| `npm test -- tests/view/end-window-game.test.mjs` | 0 | pass |
| `npm test -- tests/view/run-screen-state.test.mjs tests/view/end-window-game.test.mjs` | 2 | refused by `scripts/test.py`: "Expected exactly one test file, or no argument for the full gate." - my mistake of form, rerun one file at a time above |
| `.runs/return-step/mutate.ps1` (own-work check, below) | 1 (the last mutation's node exit) | log in `reports/return-step-files/mutate.log` |
| `python -B .the-way/elements/common/foundation_check.py` (after the second edit, before `99e4dcd0`) | 0 | `0 errors` |

Not run: the full gate (`npm test` with no path) - the cycle's, as the handoff says.

## 1. Comparison with the code

**D-323** (read whole) with `src/browser/view/run-screen-state.ts` (read whole), `src/browser/view/run-entry.ts:60-230` and the tests that cite it (`grep "D-323"` over `tests/`):

- Third paragraph against the code: the window opens at the end of the effect after halt (`effectEnded` no longer stops at `game.halted()`), at every entering (`entered` has no guard of halt), at „Koniec przejścia” (`openWindow` no guard of halt); „✕” and Escape close nothing (`closeWindow` keeps its guard; `end-window.tsx:92` and `run-entry.ts:160-163` send both to it); the question is neither asked (`ask` returns null at halt) nor closed (`closeQuestionNow` refuses at halt), „Koniec przejścia” included; the window stands only while on screen and with no question (`windowShown`). The only place where the question goes after halt is `forgetQuestion` at the end of a map run, which after halt cannot come, since the store takes no result (`state-store.ts:119`). The paragraph holds.
- *Relations* (`narrows D-311 · D-368 · D-371`), *Rationale*, *Rejected*: hold against the code; no reverse `narrows` in the three.
- *Verification*: see item 3.

**D-311, D-368, D-371** (each read whole): each binds „✕” and Escape to close the window; D-323's third paragraph states the area after the error where it prevails, and the code keeps both before the error. D-371's "„Koniec przejścia” ... opens the window at once" holds after halt too now. D-371's "the window stands only while it is open, the player is on that screen and no question stands" is what `windowShown()` computes, which makes D-323's "„Koniec przejścia” with a question standing leaves the window unshown behind the question" true. Nothing to correct.

**`uncaught-failure-game-state`** (read whole): its sentence speaks of the game state and of saves; `openWindow` and `effectEnded` change only the module's own memory and call no act of the store, so the third paragraph leaves it true. Citations (`grep "invariant: uncaught-failure-game-state"`, `.runs/` excluded): `tests/view/state-store.test.mjs:356`, `tests/view/uncaught-failure.test.mjs:353`, `:441`, `:800`; `tests/view/run-screen-state.test.mjs` cites none, and rightly, since its guard case holds the screen state, not the game state. *Method* `test`, *Violated* `no` hold. Unchanged.

**`function-and-file-size`** (read whole): `node tests/quality/eslint-size-rules.mjs` names no place; `tests/quality/test_function_and_file_size.py:141` carries no `@unittest.expectedFailure`; `Violated: no` holds. `guidelines/coding.md:260-262` ("Dopóki jakiś kod stoi nad progiem ...") is conditional and stays true.

**D-425, D-45, D-269, D-407, D-421, D-408** (each read whole):

- D-425: no function or file over a threshold, the two exceptions unchanged. Its *Rationale* sentence "the invariant of this rule reads as violated while code stands over a threshold, so its test is marked as an expected failure" is conditional and still gives the reason for the run of its own; left as it is.
- D-45 and D-269: the five new modules stand directly in `src/browser/kitchen-sink/`, which `tsconfig.kitchen-sink.json` includes (`src/browser/kitchen-sink/*.ts(x)`) and `tsconfig.browser.json` excludes; they import only `../sim/**` and `../view/**` modules the game uses, and React forms of the controls (`control-samples.tsx` imports `ReactButton`, `ReactNumberField` and the others). Holds.
- D-421: `src/browser/kitchen-sink/index.html` unchanged by the task; the page links what it linked. Holds.
- D-407: `page-places.ts` builds the header and `main` by the DOM API and the roots of the bar, the waiting screen and the sentences, as the decision's places; `programs-pull.ts` and `programs-reset.ts` hold memories that already stood outside the component, in `build` of `createProgramsEntry`, before the split (`fc6e0046:src/browser/view/programs-entry.ts:75` called the pull "a memory of the page alone"), so the split changed nothing D-407 binds. Holds.
- D-408: no screen added; the registry and `game-view.ts` unchanged. Holds.

**Part map** (read whole): the new files `src/browser/view/page-places.ts`, `page-game-acts.ts`, `programs-pull.ts`, `programs-reset.ts` fall under `src/browser/view/**`, and `sample-parts.tsx`, `control-samples.tsx`, `account-samples.tsx`, `role-samples.tsx`, `tile-samples.tsx` under `src/browser/kitchen-sink/**`, both of `browser-view`; `foundation_check.py` reports no file claimed by no part. The descriptions of `browser-view`, `build-tools`, `agent-workflow` and `product-foundation` still hold: no responsibility moved between parts. The trust boundary of `browser-view` lists the called files (`screen-address.ts`, `email-confirmation.ts`, `password-reset.ts`), unchanged; `page-game-acts.ts` is a caller of `screenAddress`, no boundary file. No change.

## 2. Search of the foundation and the guidelines

`grep` over `foundations/` and `guidelines/` for `startApp|app\.ts|createProgramsEntry|programs-entry|kitchen-sink\.tsx|kitchen-sink/kitchen-sink|stoją w \`startApp\`|in \`startApp\``, then for `entry module|module wejściow|moduł wejściow|modułem wejściow|PAGE_MARKER|page's marker`, then for `kitchen-sink`:

- `foundations/`: no hit for `startApp`, `createProgramsEntry`, `programs-entry` or `kitchen-sink.tsx`; `src/server/app.ts` (D-37 area, line 568) is the server's file, unrelated; `foundations/invariants.md:470` names `kitchen-sink.css`, unchanged.
- `guidelines/coding-browser-module.md`: lines 209-216, 291-292, 298, 308-309, 341-348, 355-372, 392, 394-403 read against `src/browser/view/app.ts` (functions found by `grep "function |installLastResort|reportBrowserFailure|onLine|startFrom|createPagePlaces|calls:"`): `startFrom` and the console place `view/app.startFrom` stand in `app.ts` (lines 72-84); `startApp` calls `createPagePlaces` (402), installs `installLastResort` (446) with `onLine: reportLine`, which sends `reportBrowserFailure` (441); `page.calls` stands at 458; `logOut` in `page-game-acts.ts`. All match. The table rows `src/browser/view/app.ts | copy` (line 19) and `programs-entry.ts | do not copy` (line 70) stay: the statuses of files are out of the task's scope.
- `guidelines/styleguide-browser-view.md:456-459` matches row 1 (item 6).
- `src/browser/AGENTS.md`: names `kitchen-sink.css` only; holds.
- The temporary pair of D-323's *Verification*: item 3.

Nothing else made untrue; no other entry changed.

## 3. D-323's pair of examples

What the tests hold, read in `tests/view/run-screen-state.test.mjs:217-301` (the guard case, with `// decision: D-323 "After an error that no code of the game handled, whether the end-of-run window is open stays a memory of the page as D-371 gives it"`) and `tests/view/end-window-game.test.mjs:1219-1229`:

- held by the guard case: after halt, `effectEnded()` shows the window that waited after a death (`waiting`); a leaving during the wait ends it and the window shows on coming back (`away`); `openWindow()` shows a window „✕” closed before the error (`closed`); `closeWindow()`, the one act for „✕” and Escape, leaves an open window (`standing`, `closed`); `ask(null)` returns null (`standing`); `openWindow()` and `left()` leave a standing question, with `windowShown()` false beside it (`asking`).
- `end-window-game.test.mjs` "after halt() the window's buttons change nothing" holds „✕” in the page, but carries no line `decision:` (a comment `// D-323.` only, as it did at the base), so the lines do not find it; I left it as it is.
- held by no test: the route in the page after the error - the scene playing its effect to the end and calling the end, the header's „Koniec przejścia” - which the executor of slice 6 checked once with a throw-away case (`reports/executor-6-files/own-check.test.mjs`), no test of the repository; and an entering that opens again a window „✕” closed before the error (the own-work check below shows the guard case does not hold it).

Written (`foundations/decisions.md:4624-4626`): the clause `tests:` gained "in the state of the screen of the map run after the error, the end of the scene's effect of a death opening the window that waited for it, a leaving of the screen during that wait ending the wait, so that the window shows when the player comes back, and „Koniec przejścia” opening a window that „✕” closed before the error, while the closing of the window that „✕” and Escape both ask for leaves an open window standing, no question is asked, and „Koniec przejścia” and a leaving of the screen leave a standing question standing, with the window not shown beside it". The pair keeps its three original items each side and, for the third paragraph, only:

- complies: "after an error at the game minute of a death, the scene in the page playing its effect to the end and the window shown after it, and the header's „Koniec przejścia” showing the window; a window that „✕” closed before the error shown again at an entering of the screen of the ended map run after the error"
- violates: "a check of the error added in the scene, the screen of the map run or its header that keeps the end of the effect or „Koniec przejścia” from showing the window after the error; an entering of the screen after the error that leaves closed a window „✕” closed before it"

Binding sentences, *Relations*, *Rationale* and *Rejected* unchanged, so step 4.4 of `record-decision` reaches nothing.

## 4. Glossary (WAY-95)

- "window" / "the end-of-run window": the glossary (`foundations/glossary.md`, headings read) holds no entry. The log uses "window" for the end-of-run window (D-368, D-370, D-371, D-323) and bare for the browser window ("in a window 1280 px wide", D-311 *Verification*); both are meanings a reader of a web game's field gives the word, and the new paragraph of D-323 names "the end-of-run window" before "the window". By the template's "A word whose every meaning is one such a reader gives takes none", no entry.
- "memory of the page": search `git grep -n -i "memory of the page"` in `src` at `fc6e0046` and `HEAD`, and over `foundations/*.md`: every use (D-173/D-324 at 10194 and 10210, D-339 chronicle, D-371, D-407, D-323, and the comments of `chronicle.ts`, `game-view.ts`, `program-panel.tsx`, `run-screen-state.ts`, `programs-pull.ts`, `programs-reset.ts`) means what the page holds and loses at a reload, never in the game state or the save - the field's meaning of in-page memory. D-407's "memory several screens share is a memory of the page" names a kind of it and is true in the same meaning. No two meanings, no entry. The guidelines' Polish "pamięć strony" is not held against the glossary (template, last rule of "Which words take an entry").
- No term used against its entry found in the D-323 paragraph (`map run`, `completion`, `manual map run` used as their entries give).

No glossary entry written.

## 5. Environment facts

The change rests on no source outside the product: the third paragraph of D-323 and the split rest on the product's own decisions and code. D-323's *Based on* (`react-uncaught-render-error · react-default-uncaught-report`) is unchanged and `foundation_check.py` finds both. No fact written.

## 6. Rows of *Settlements to record*

Row 1 went to `guidelines/styleguide-browser-view.md:456-459`, rule "The kitchen-sink page", last paragraph: „Źródła strony stoją w `src/browser/kitchen-sink/`. Poza tym katalogiem strona importuje tylko moduły, których używa gra; kod potrzebny tylko jej zostaje w tym katalogu, w modułach obok jej modułu wejściowego, a nie w `src/browser/view/`, gdzie trafiłby do wyniku `npm run build`.” It carries the row's meaning and its reason. The row's column *Goes to* names a guidelines discipline, so no entry; no decision states it already (D-45 binds the directory and the build, not where code inside the page stands), so no second entry is owed. No row is missing; the task has no projected entries (`Project relation: independent`). No choice of the plan binds after the merge outside what the guidelines (slices 1-3) and D-323 already hold: the plan's choices of how to divide are guideline text (`coding-browser-module.md`, styleguide) or end with the work.

## 7. Where each settlement went (the record's *Return step*)

- Decisions written or changed: D-323 - third paragraph, *Relations*, *Rationale*, *Rejected* by the foundation step (`8ca21555`, `the cycle's`); its *Verification* by this step (`6a031cc4`, `99e4dcd0`): the clause `tests:` names what the guard case of the screen state holds, the pair keeps only the page route and the entering after „✕”. In the section of `foundations/decisions.md` where D-323 stands (around line 4613).
- Invariants written or changed: `function-and-file-size`, `Violated: no` (slice 5, `47ef5894`), its rule set by D-425 and the task's *To do* 6. `uncaught-failure-game-state` unchanged (checked, rule set by D-323).
- Environment facts: none.
- Glossary terms: none.
- Part-map changes: none.
- Projected entries: none.
- Rows of *Settlements to record*: row 1 to `guidelines/styleguide-browser-view.md`, rule "The kitchen-sink page", last paragraph (slice 1, `9885485c`).

## Own-work check

Requirement most likely not met: "where a test holds part of the sentence, remove that part from the pair, name the test by the clause `tests:`, and leave a pair only for a part no test holds" - a claim of my clause that the guard case does not in fact hold, or a part dropped from the pair that no test holds.

Check: `reports/return-step-files/mutate.ps1` copied `dist/browser` (built by my `npm test` run from the head's sources), the guard test and its fixture into `.runs/return-step/`, applied one mutation at a time to the copied `run-screen-state.js` and ran `node --test --test-name-pattern "after halt"` on the copy. Result (`reports/return-step-files/mutate.log`): no mutation - exit 0; `openWindow` stopped at halt - exit 1 („Koniec przejścia” opens the window „✕” closed before the error); `effectEnded` stopped at halt - exit 1 (the effect has ended after the error); `closeWindow` closing after halt - exit 1 („✕” does nothing); the question closing after halt - exit 1; the question asked after halt - exit 1; `entered` stopped at halt - **exit 0**. So the guard case does not hold "an entering opens the window" after the error: its `away` part passes on the leaving that ends the wait. My first clause said "an entering of the screen after a leaving during that wait showing the window"; I rewrote it to the leaving ending the wait (`99e4dcd0`) and the pair keeps the entering that opens again a window „✕” closed before the error. Not shown: the page route of the pair, which no test holds by design of this judgment.

## Reaches beyond the dispatch

- `src/browser/view/state-store.ts` (grep for `halt|act(` only), `src/browser/view/end-window.tsx:38,92` and `run-screen.tsx` (grep for Escape) - to see that Escape and „✕” reach the same `closeWindow` and that no other guard of halt stands on the window's route.
- `tsconfig.browser.json`, `tsconfig.kitchen-sink.json` - for D-45 and the invariant `application-build-kitchen-sink`.
- `a file of the author's private notes` and `scripts.md` - the user's rules before a commit and a script.

## Choices

- Left `tests/view/end-window-game.test.mjs:1219-1229` without a line `decision:`; way rejected: adding `// decision: D-323 "„✕” and Escape of the window close nothing after the error"` there, so the clause could name „✕” in the page. Cost if wrong: an agent looking for the tests of D-323 by its lines does not find the page-level case of „✕”; the guard case still holds „✕” at the state, so the clause stays true. Reason: the step changes the foundation, and a test change would be one more file the request has to name (WAY-03) for no part of the sentence left unheld.
- Two commits, the second correcting the first; way rejected: amending. Cost: one more line of history.

## Working copies

`.runs/return-step/` under the worktree held `commit-msg.txt` (the two commit messages, passed with `git commit -F`), `mutate.ps1`, `mutate.log` and the copies `dist/browser/**`, `tests/view/run-screen-state.test.mjs`, `tests/sim/understanding-fixture.mjs`. Kept beside this report in `reports/return-step-files/`: `mutate.ps1`, `mutate.log`. The directory `.runs/return-step/` is removed (`Test-Path` false). No worktree or clone was made. `dist/` of the worktree was rebuilt by `npm test -- <file>`, a file the product's tools make, outside the rule.

## Unread material

- `reports/executor-1-report.md` to `executor-5-report.md`, `fix-report.md`, the review reports: not read; I compared the entries with the code itself. `executor-6-report.md` and `foundation-report.md`: read whole.
- The code of the split: `src/browser/view/app.ts` - only the lines found by grep (function heads, `installLastResort`, `reportBrowserFailure`, `createPagePlaces`, `calls:`); `page-places.ts`, `page-game-acts.ts`, `programs-pull.ts`, `programs-reset.ts` and the five kitchen-sink modules - their first 22 lines (head comments and imports); `programs-entry.ts` - not read. `run-screen-state.ts` read whole; `run-entry.ts:60-230`.
- "Reading the foundation" step 2: I did not run `decision_index.py`; I opened whole the decisions the handoff names (D-323, D-311, D-368, D-370, D-371, D-425, D-45, D-269, D-407, D-421, D-408) and no others, since the step changed no binding sentence.
- `foundations/glossary.md`: headings only. `foundations/environment_facts.md`: not read.
- `guidelines/styleguide-browser-view.md`: lines 426-461 only. `guidelines/coding-browser-module.md`: lines 200-420. `guidelines/coding.md`: lines 240-272. `guidelines/testing.md`: grep for `decision` only.
- the-way: `elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md`, `elements/common/way_of_working.md`, `rules.md`, `elements/glossary/skill/SKILL.md`, `decide_entry.md`, `template.md` - whole; WAY-03 (the decisions example) - first 17 lines; WAY-95 - first 6 lines; `elements/glossary/skill/read.md`, `write.md`, `examples.md`, the invariants, part-map and environment-facts skills - not read, since no entry of those elements changed; `task-cycle/change/SKILL.md` - sections 3 to 6.

## Searches not found or unclear

- `npm test -- <two files>` is refused: the one command takes one test file at a time.
- `git grep` for "window" over every tracked file (the method of `glossary/skill/decide_entry.md`) not run: the word's uses are in the hundreds; I judged it from the log's uses in D-311, D-368, D-370, D-371 and D-323.
- No line `decision: D-323` stands in `tests/view/end-window-game.test.mjs` (item 3).
