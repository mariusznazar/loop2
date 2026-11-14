# Author report — make-change, the whole change as the one author

Worktree `the root of the task's worktree`, branch `task/podzial-sterownika-widoku`, base `9e13af95`. No push.

**Status:** done with concerns (the concerns are the listed gaps: reading of decisions, quality tests that could not run, behaviours the checks do not pin).

## Commits (oldest first)

| Commit | What |
|---|---|
| `d01611f6` | `state-store.ts` + `tests/view/state-store.test.mjs` |
| `a6935a2c` | `run-screen-state.ts` + `tests/view/run-screen-state.test.mjs` |
| `8b68ec28` | `screen-registry.ts` + `tests/view/screen-registry.test.mjs` |
| `29d5d2c9` | five entries, `program-panel-acts.ts`, `game-view.ts` as the composition, `guidelines/coding-browser-module.md` |
| `0785c763` | decisions D-407, D-408, D-409 in `foundations/decisions.md` |

The order follows the spec's decision 11 (store, state of Przejście, registry and entries); the first three commits add modules not yet used, so every existing test passes at each commit. The wiring (`game-view.ts`) lands in the fourth commit in one move, because a registry serving part of the screens needs throwaway branches (spec decision 11). The tests were not run per commit for the first three beyond their own files; the whole view test set was run once on the fourth.

## Files changed (added / removed lines, `git diff --stat 9e13af95..HEAD`)

- `src/browser/view/game-view.ts` — 1240 lines changed (the file goes from 1300 to 282 lines)
- added: `state-store.ts` 208, `run-screen-state.ts` 199, `screen-registry.ts` 283, `program-panel-acts.ts` 72, `headquarters-entry.ts` 66, `programs-entry.ts` 403, `run-entry.ts` 281, `character-entry.ts` 58, `maps-entry.ts` 126
- tests added: `tests/view/state-store.test.mjs` 380, `tests/view/run-screen-state.test.mjs` 262, `tests/view/screen-registry.test.mjs` 419
- `guidelines/coding-browser-module.md` +30/-13 (two examples, nine rows)
- `foundations/decisions.md` +45 (D-407, D-408, D-409)
- no existing file under `tests/` was changed; `app.ts` is unchanged.

## Checks, each with command and exit code

| Check | Command | Exit |
|---|---|---|
| types | `npm.cmd run typecheck` | 0 |
| lint | `npx.cmd eslint src/browser/view tests/view` | 0 |
| format | `npx.cmd prettier --check src/browser/view tests/view guidelines/coding-browser-module.md` | 0 |
| new tests | `npm.cmd test tests/view/state-store.test.mjs`, `.../run-screen-state.test.mjs`, `.../screen-registry.test.mjs` | 0, 0, 0 (12, 12, 13 cases) |
| tests through `createGameView` | `node scripts/test-node-file.mjs tests/view/<file>` after `node scripts/build.mjs`, for `account-screen`, `chronicle-game`, `end-question`, `end-window-game`, `previous-save`, `uncaught-failure` | 0 each |
| every file of `tests/view/` (54, the three new included; the twelve that call a factory directly among them) | `node scripts/test-node-file.mjs <file>` in a loop | 0 for all |
| invariants and quality | `npm.cmd test tests/invariants/test_cross_part_imports.py`, `test_browser_view_framework.py`, `test_content_identifiers.py`, `test_browser_view_token_values.py`, `tests/quality/test_source_tool_scope.py`, `test_node_test_selection.py` | 0 each |
| foundation | `python -B .the-way/elements/common/foundation_check.py` (after the commits) | 0 (`0 errors`; the 23 notices of decisions held by nothing were there before: the run on the base showed the same list) |
| invariant `uncaught-failure-game-state`, test seen failing | with `if (halted \|\| result.state === state)` changed to `if (result.state === state)` in `state-store.ts` for a moment: `npm.cmd test tests/view/state-store.test.mjs` | 1 (case „after halt() no result is taken…” failed: „the state is the one held at halt”); code restored; same command | 0 |

**Did not run / failed:** `npm.cmd test tests/quality/test_quality_invariants.py` exits 1: its `ruff` and `shellcheck` cases fail with `FileNotFoundError` (the quality tools of the Python virtual environment are not installed in this worktree). They cover Python and Bash files, which this change does not touch; the ESLint and Prettier cases of the same file passed (3 of 5). Not run, as the handoff says: `npm test` with no argument. The same check on the base was not made, so "same on the base" is a guess from the error (a missing executable).

## Choices, with the way rejected and the cost if wrong

1. **Size rule.** `guidelines/coding.md` and `coding-browser-module.md` hold no rule of size, so the section 1 move-first commit (WAY-365) does not apply.
2. **`act(body)` takes `body(take)` only.** The body reads `store.get()` after the reading. Rejected: handing the state to the body as an argument — a body that takes twice would hold a stale one. Cost: none.
3. **`Taken.endedRun` is computed in the store; `RunScreenState.taken()` takes the whole `Taken`.** As the spec has it.
4. **`openWindow()` of the screen state returns a boolean (whether it closed a question), and the entry always calls `syncWindow()` after it,** also where the state did nothing (halted, or no ended map run) and today's code returned before `setWindow`. `setWindow` returns at once when the window is as shown, so nothing is observable. The same for `closeWindow` and `effectEnded`. Rejected: a three-valued return. Cost if wrong: one extra no-op call.
5. **Owed focus:** the state module has `takeOwedFocus(connected)` which returns whether the window shows; the check of `document.activeElement` and the call to `focusWindow` stay in the entry (the state module touches no DOM).
6. **`entered()` is a no-op when the player is already on the screen,** and the entry of Przejście calls `entered()` at its build when the first screen is the run screen, so the state starts with the player on the screen as the old `current.kind === "run"` did.
7. **`left()` also closes the question** (guarded by halt) although the entry closes it first, explicitly, with `setQuestion(false)`, so the screen is told before the pause act, as today. The explicit call is the one that matters.
8. **The registry's "a kind held by no entry throws"** is checked at creation for duplicates and for the first screen, and at each `show` for the screen shown; there is no list of all kinds in the registry, because a list would be one more shared place for a new screen. The test pins both throws. Rejected: a `Record<Screen["kind"], …>` (spec rejection c).
9. **Type-only import of `Screen`:** the registry re-exports `Screen` (`export type { Screen }`); the entries import it from the registry. No hand-written import outside the closed list of decision 1.
10. **Entries get a few options the spec did not name:** `gameElement` (the game's element, for the `isConnected` condition of the owed focus) for the entry of Przejście; `ProgramsEntry` is `ScreenEntry & { setReset }`; the entry of Programy receives `previousSaveAllowed` as a boolean and `onSignedOut`.
11. **Mapy:** the guard (`acting`, `mapsAct`, `draw`) is per built instance, with a `disposed` flag, because „Wejdź” disposes the screen (`show` to the run screen) inside the guard and the draw after the act must then do nothing, as the old `mapsScreen?.update` on a null did.
12. **Test for `send` with a refused send** (spec decision 9) is not written: in this code `send` of the simulation throws while a map run stands, so there is no "refused send" that leaves the state the same; the test says what it can — a send and a start of a loop are each one moment of saving. The reading before the send is pinned by `tests/view/clock.test.mjs`, which stays.
13. **The `saveBeforeLogout`/`saveLine`** are exposed by the store as the spec says; the `saveLine` is a property.
14. **Decisions:** D-407 (row 1, wording „osobny korzeń Reacta” as „a separate React root”), D-408 (row 2), D-409 (row 3), each in the entry form of the-way template, `Based on: none`, `Origin: none`, a pair of examples in *Verification* (no `decision:` line of a test; the spec says the three are checked by review). *Rejected* of D-407 holds the three ways the task keeps under question 1; D-408 and D-409 read `unknown`, as the task keeps no way not chosen for those two rows. No question for the human is left open; none of the three collides with a current entry.

## Foundation entries, one sentence each, marked by row

- D-407, `row 1`. EN: the view keeps a separate React root for each screen and the menu bar; the game state lives in a store and the state of Przejście in a module, both outside React; shared memory is page memory read through `useSyncExternalStore`; a screen's own state is in its component. PL: widok ma osobny korzeń Reacta na każdy ekran i pasek, stan gry mieszka w magazynie, a stan ekranu przejścia w osobnym module poza Reactem, pamięć wspólna w pamięci strony, a stan jednego ekranu w jego komponencie.
- D-408, `row 2`. EN: a new screen is its module, one entry in the registry, its address and its place on the menu bar, with no line in a function the game view shares between screens. PL: nowy ekran to jego moduł, jeden wpis w rejestrze, adres i miejsce na pasku, bez linii we wspólnych funkcjach widoku gry.
- D-409, `row 3`. EN: an act that depends on time goes through the store, which catches up time first; a new character and a bought branch rank do not catch up. PL: akcja zależna od czasu idzie przez magazyn, który dolicza czas przed nią; nowa postać i zakup gałęzi czasu nie doliczają.

## What the pull request description can list (acceptance criterion 1)

The places a new screen changes after this change: its own module; its entry file (copy `character-entry.ts` or `maps-entry.ts`); one line of the table in `createGameView` in `src/browser/view/game-view.ts` with the entry's import; its address in `src/browser/view/screen-address.ts` (the `Screen` type and its `switch` statements); its position on the menu bar. No other function of `game-view.ts` names a screen, apart from `landing` and `firstScreen`, which pick the first screen of the page and stay in the composition (spec decision 6).

## Own-work check (section 3)

**Requirement most likely unmet:** "the player sees nothing change" — the five game-level tests pin the end result, but the spec lists call orders and clock readings that no test pins (the clock's timer before the saver's, the readings before each act, the three update calls of the run screen in order, Postać built before Mapy), and the moves of acts between the entries could change a reading count or a focus move unseen.

**Check:** a differential run. I built the base `9e13af95` view (`tsc -p tsconfig.browser.json` in a copy of the base source under `.runs/author/base`) and drove both builds with the same driver (`reports/author-diff-driver.mjs`, kept) through 7 scenarios on jsdom: the question flow (Zakończ, Wróć, Pauza, Wznów, pace, Zapisz to Postać, Mapy, Wejdź, leave and come back, Nowy program, Restart), death and the window („✕”, „Koniec przejścia”, leave and return, Restart from the window), the window with unsaved changes (question over the window, Wróć, Odrzuć), a privileged account on Programy (the pull's check, „Zacznij od zera”, confirmation, `setReset`, delete), `halt()` with the question standing (buttons after halt, `keep`, navigation after halt), a loop on the map card and on Siedziba, and Postać. The trace holds, after each step, the whole page HTML, the element in focus, each focus move, each address write, each place told to the page, each save request with its game minute, and the count of reads of `Date.now` and of `performance.now`.

**Result:** `cmp` of the two traces (287 lines, 928 KB) exit 0: byte-identical, including the count of clock readings. The check does not reach: the order of calls between two separate roots inside one step (nothing in the page shows it), „Otwarte: {mapa} →” (no ended map run opened a map in the scenario), the creation of a character, „Odbierz”, a pull that returns documents, and the buttons „Pauza” and „Kup” (the driver's lookup found none at those steps; logged as `!! no button`). Those flows are copies of old code read against it and are held by the existing game-level tests where they have any.

I could not show that the trace is sensitive to a reordered pair of calls on two roots: I did not make a mutation to test the driver.

Mutations in my head, for the new tests: a store that ignores `halted` (made and caught, above); a store that reads the clock in `actWithoutCatchUp` (caught by the second state-store case); a registry that appends `while-shown` elements before `always` ones (caught by the table-order case); a screen state that lets `openWindow` ignore the halt (caught by the halt case); `leave` after the address write (caught by the leave case); `left()` that leaves the wait (caught by the leave-ends-wait case). A `drawReading` that passes `shown` true to every instance is caught; a registry that commits on a same-screen show is caught.

## Reaches beyond the dispatch (section 1)

- `foundations/decisions.md`, `grep` for „react root|island|portal|…” and `D-407..D-409` — the step 2 search of the foundation for the three entries (and a read of D-406 as the form sample, since the-way's WAY-03 named by `elements/decisions/examples.md` was not read).
- `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `elements/common/way_of_working.md`, `rules.md`, `examples.md` — the method of the foundation step (the handoff names the skill).
- `scripts/test.py`, `scripts/test-node-file.mjs`, `eslint.config.mjs` (head), `tsconfig.browser.json`, `package.json` scripts — to run focused checks.
- `tests/view/page-document.mjs`, `tests/view/clock.test.mjs`, `game-saver.test.mjs`, `uncaught-failure.test.mjs`, `end-question.test.mjs`, `tests/sim/understanding-fixture.mjs`, `tests/sim/time.test.mjs` (heads) — patterns for the new tests (no helper copied).
- `src/browser/sim/game.ts` (`send`, `restart`, `end`, `advanceMinutes`), `src/browser/sim/programs.ts` (`copyHasUnsavedChanges`), `src/browser/view/scene-picture.ts` (`endEffectBegins`), `src/browser/account-api.ts` (`SaveOutcome`) — to write the tests and the imports; and the headers and types of the screen factories the entries call.
- `the user's rule file for scripts` and `git.md` (the user's rules for scripts and commits).

## Unread material

- **Decisions of the handoff list read whole:** D-36, D-207, D-264, D-265, D-268, D-323, D-324, D-329, D-351, D-370, D-371.
- **Decisions on the list not read** (extracted to a scratch file and not opened; the task and the spec quote fragments of the ones marked *): D-03*, D-04*, D-07, D-28, D-88, D-96, D-97, D-173*, D-208, D-211, D-212, D-217, D-225, D-247, D-250, D-267, D-280*, D-281*, D-282, D-283*, D-284*, D-287, D-295*, D-311*, D-322*, D-339*, D-342, D-346, D-352, D-368*, D-383, D-395, D-396, D-401, D-402.
- **Part map:** read lines 1–28 (the entry `browser-view`) only, not the rest of the file.
- **Invariants:** all 56 whose *Part* names `browser-view` or `every` read whole, ; the invariants `save-version` and `loop2-container-sprites`, which tests of `tests/view/` cite but whose *Part* names neither, were not read.
- **Glossary:** whole. **Guidelines:** `coding.md`, `coding-browser-module.md`, `testing.md` whole.
- **Code:** `game-view.ts` and `clock.ts` whole; `game-saver.ts` lines 1–110 (the options and the type of the saver); `run-screen.tsx` lines 1–130 and 215–325; of `headquarters.tsx`, `character-screen.tsx`, `maps-screen.tsx`, `program-list.tsx`, `program-panel.tsx`, `screen-address.ts`, `email-confirmation.ts`, `chronicle.ts` only the type and boundary parts; `app.ts` only the import of the game view (grep).
- **The-way:** `.the-way/task-cycle/change/SKILL.md` whole, `task-cycle/skill/foundation_step.md` whole; `ui_check.md` not read (no screen's look changed; no state check with a screenshot applies); `elements/common/critique/SKILL.md` not read (a change's entries are not a set shown together before the review).
- **Spec and task:** both whole; the reviews of the spec (`spec-reviewer-report.md`, `spec-reviewer-revision-report.md`) not read; the handoff's two notes were applied from the handoff text.

## Searches not found or unclear

- The spec says the registry throws where "a kind of `Screen` is held by no entry"; the code has no list of kinds, so the check runs at creation (duplicates, the first screen) and at `show` (the screen shown). Unclear whether a throw at creation for every kind was meant; recommended answer: as built.
- Spec decision 9: "`send` after a reading that changed the state is a moment even where the send is refused" — not found true of this code (`send` throws when a run stands); the test says what holds.
- The handoff says the checks `tests/quality/` that cover the new files: the ESLint and Prettier cases of `test_quality_invariants.py` passed; ruff and shellcheck cases cannot run here (missing tools).
- WAY-03 of the-way's log (the example `examples.md` names) not opened.

## Problems observed

- `tests/quality/test_quality_invariants.py` `test_ruff_source_rules` and `test_shellcheck_source_rules` fail with `FileNotFoundError` (executable not found) in this worktree; evidence: the traceback in `subprocess.run`. Cause not verified (a guess: the virtual environment of quality tools is not set up in the worktree).

## Working copies

- `.runs/author/base` — a copy of the base source (`git archive 9e13af95`) with a junction `node_modules` to the worktree's, built with `tsc` for the differential run; **removed** (the junction removed first, `node_modules` of the worktree checked intact), together with all of `.runs/author/` (scratch files of decisions and invariants read, the traces, backups). Kept in `reports/`: `author-diff-driver.mjs`. No `git worktree` was made, so there is nothing to prune.
