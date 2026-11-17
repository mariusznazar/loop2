# Author report — poprawki kodu z przeglądu fundamentu

**Status:** done with concerns (the concerns are the unchecked items below; no open question blocks the change).

Worktree: `the task's worktree`, branch `task/poprawki-kodu-z-przegladu-fundamentu`, base `e7b3d071`.

## Commits

| Commit | What |
|---|---|
| `ea35311f` | F-11: `paused: !mapRunEnded(run)` in `advanceMinutes`; new unit case in `tests/sim/discovery.test.mjs`; three new scenarios in `tests/invariants/test_player_map_run_pace.py` and its description |
| `b87424d0` | F-26 code: `sendNow` in `src/browser/view/game-saver.ts` and two cases in `tests/view/game-saver.test.mjs` |
| `881f1a4a` | F-39: `bright` / `faint` in `src/browser/sim/data/scene.ts`, `src/browser/run-screen.css`, `src/browser/tokens.css`, `tests/view/scene-picture.test.mjs`, `tests/view/scene.test.mjs` |
| `79deca06` | F-32 code and guideline: `inSiedziba` to `atCamp`, comments of `camp-picture.ts`, `camp.tsx`, `headquarters.tsx`, `scene.ts`, titles and comments of `tests/view/camp-picture.test.mjs`, two lines of `guidelines/styleguide-browser-view.md` |
| `1d8caf17` | Foundation entries: D-208, D-97, D-323, D-389 in `foundations/decisions.md`; `headquarters` in `foundations/glossary.md` |

Note: the comment line of `tests/view/scene-picture.test.mjs` ("a team of one at the camp") is in `881f1a4a` with the shade rename, because the file holds both changes; it belongs to F-32.

Files and line counts: `git diff --stat e7b3d071 HEAD`.

## Checks (command, exit code)

| Check | Result |
|---|---|
| Red runs, redone in a throwaway worktree of the base `e7b3d071` holding only the new test files (`.runs/author/red`, `node_modules` and `.the-way` junctions to the task worktree), output redirected to a file, no pipe: `npm test -- tests/invariants/test_player_map_run_pace.py` | `exit=1`, `Ran 12 tests`, `FAILED (failures=2)`: `test_a_death_in_the_minute_of_a_discovery_ends_the_run_unpaused_and_keeps_the_discovery` (`AssertionError: True != False : paused after input 2`) and the 16x case (`paused after input 3`); the control passed |
| the same worktree: `npm test -- tests/sim/discovery.test.mjs` | `exit=1`, pass 49, fail 1: `a death in the minute of the first chill leaves the game not paused, holding what the minute revealed` (`actual: true, expected: false`) |
| the same worktree: `npm test -- tests/view/game-saver.test.mjs` | `exit=1`, pass 23, fail 2: both new cases, `TypeError: the saving code broke` thrown out of `saver.moment()` / `saveBeforeLogout()` (the first row of the table; later rows not reached) |
| the task worktree at head `1d8caf17`: the same three commands | `npm test -- tests/invariants/test_player_map_run_pace.py` exit 0, 12 tests; `npm test -- tests/sim/discovery.test.mjs` exit 0, 50 pass; `npm test -- tests/view/game-saver.test.mjs` exit 0, 25 pass |
| `npm run build` | exit 0 |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` (all unit tests of simulation and view, not the gate) | exit 0, 2274 pass, 0 fail |
| `npm test -- tests/invariants/test_browser_view_token_values.py`, `test_design_token_contrast.py`, `test_design_token_sources.py`, `test_minute_span_split.py`, `tests/agent_workflow/test_scene_art_contrast.py`, `test_scene_art_flashes.py` | each exit 0 |
| `npx eslint` on every changed `.ts`, `.tsx`, `.mjs` | exit 0 (one finding on the way: `prefer-promise-reject-errors` on `Promise.reject(error)`, fixed by rethrowing in a `.then`) |
| `npx prettier --check` on every changed `.ts`, `.tsx`, `.mjs`, `.css` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py`, head `1d8caf17`, rerun after the commits | `exit=0`, `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py`, head `1d8caf17`, rerun after the commits | `exit=0`, `0 error, 144 warn, 7 info` (the 144 warnings are the same count as before; I did not look into their sources) |

Did not run: the full gate `npm test` (as instructed), `tests/quality/*` (the quality invariants as a whole), the other Python invariant tests, any real-browser check.

## Own-work check

- The requirement my work most likely does not meet: "the error itself still goes on to D-323's handling … it must still reach `src/browser/view/last-resort.ts`". The saver leaves the error unhandled (`Promise.resolve().then(() => { throw error; })`) and the two new cases hold that an unhandled rejection with that very error is raised, once per failure (`takingRejections` takes the process's `unhandledRejection`, standing in for the window's `unhandledrejection` that `last-resort.ts` listens to). Not checked: the chain through a real `installLastResort` on a window and a real browser. In a browser a rejected promise with no handler reaches the window's `unhandledrejection`, which `last-resort.ts` takes; I did not run that.
- The case that failed and passed: none that was rerun without a code change.

## Foundation entries (the step of `foundation_step.md`)

Each entry through the element's skill and template (read: `elements/decisions/skill/*`, `decisions/template.md`, `glossary/skill/*`, `glossary/template.md`, `common/rules.md`, `common/way_of_working.md`). `foundation_check.py`: 0 errors after writing.

| Entry | Row | Meaning in English | Znaczenie po polsku |
|---|---|---|---|
| D-208, new paragraph, `tests:` clause, *Rejected* | row 1 | A save whose code throws before its request leaves, or whose client's promise is rejected, counts as a failed save for the line, the sentence and the retries, and the error goes on to D-323. | Wyjątek z kodu zapisu przed wysłaniem żądania (i odrzucenie obietnicy klienta) liczy się jak nieudany zapis: zdanie, ponowne próby; błąd idzie dalej do D-323. |
| D-97, new paragraph, `tests:` clause, *Rejected* | row 1 | The same at the save before a logout: it counts as a save failed for want of a connection, logout does not happen, „Wyloguj” works again, the error goes on to D-323. | To samo przy zapisie przed wylogowaniem: liczy się jak brak połączenia, wylogowanie się nie dzieje, „Wyloguj” znów działa, błąd idzie do D-323. |
| D-323, one sentence, a sentence in *Rationale*, a pair in *Verification*, a phrase of `tests:` | the cycle's (task *To do* 3, no row) | After an error no code handled, every decision about the game that goes on gives way to D-323. | Po błędzie, którego nie obsłużył żaden kod gry, każda decyzja o grze, która idzie dalej, ustępuje D-323. |
| D-389, two uses of „Siedziba” as the place of a character | row 2 | The characters at the camp are those in neither a manual map run nor an earning loop. | Postacie „w obozie” to te, które nie są ani w ręcznym przejściu, ani w pętli zarobkowej. |
| glossary `headquarters`, its *Not* | row 2 | „Siedziba” names only the screen; the place of a character in neither a manual map run nor an earning loop is "at the camp". | „Siedziba” nazywa tylko ekran; miejsce postaci poza przejściem i pętlą to „at the camp” / „w obozie”. |

Choices of the foundation step:

- The new word "at the camp" gets no entry of its own. Reason: the template's test for a word the product uses more narrowly than its field is a sentence of the English files a reader of the field's meaning would read wrongly; no sentence does (D-389 defines it where it stands), so it lives in D-389 and in the *Not* of `headquarters`. Cost if wrong: one entry to add later. Rejected: an entry `camp`.
- The additions to D-208 and D-97 are new paragraphs, not edits inside the existing sentences, because tests quote those sentences from their start (`decision:` lines); the sentences stay word for word.
- In D-389 the first sentence says "the characters at the camp"; the second sentence keeps its first words ("The characters that stand in it are those", which five tests quote) and now says what being at the camp means.
- *Rejected* of D-208 and D-97 each get the one way the row's source keeps (only lifting the block, with no sentence and no retries; cost: the player does not know the last save did not go, and the state goes only at „Wyloguj” or on a hidden page). Nothing was derived by me.
- D-323: only the one sentence the task asks for. I did not add `narrows` relations to each decision about a game that goes on (the set is open); D-323 already names D-207, D-208 and D-97 for saving. Cost if wrong: a later reader finds the precedence in the sentence but not in *Relations*.
- The invariant `player-map-run-pace` entry is unchanged (as the task says). Its line `Violated: no` is as it was.

## Choices of the code

- F-11: `paused: !mapRunEnded(run)` in place of `!completed`. Nothing in `understanding.ts` changes (the first-cooling write before `if (after.death) return found;` stays; the discovery of the death minute is meant to be held, D-122). The doc comment of `advanceMinutes` now names both ends. Checked in the view: `scene-picture.ts` (`standingOf`), `status-row.ts` (`clockText`) and `discovery-band.tsx` already read death and ended runs before the pause, so no look changes.
- F-11 test: a death at minute 84 is made by the invariant driver with a new step `patch_body` (replaces the health of the character's body in the game state to 0.3 at minute 83, explicit state like the existing `patch_run`), since no program takes the health that low before the first chill. Scenarios: pace 1, pace 16 (the carry and the rest are dropped), and a control without the patch (paused at 84, alive). The sim-level case uses the existing way of `tests/sim/discovery.test.mjs` (a body at 34.9 °C and health 0.2 at minute 0, dies at minute 1 in the first chill).
- F-26: `sendNow` builds the request in a `try`; an exception or a rejection of the client's promise calls `notSent`, which answers `answered` with a failure of no request (so the flag in flight is cleared, the sentence of D-208 or D-97 shows, the retry at 5, 10, 20, 30 s is planned, a waiting logout is finished with `failed`) and then leaves the error unhandled in a later microtask. I did not rethrow synchronously: `saveBeforeLogout` would then throw before it returns its promise, and the async function of `logOut` in `app.ts` would end with the logout stuck on „Wylogowywanie…”. Rejected: rethrow in the catch; `reportError` (not in Node tests, no use in the source); a callback option through state-store and game-view to `lastResort.report` (more plumbing). Cost if wrong: the error arrives at the last resort as an `unhandledrejection`, never as an `error` event, so its line is the same and the stack is that of the microtask.
- F-26 retries: a retry after an error whose cause is the clock's read runs `read()` again; D-323 then has halted the game, so the read is the last whole state without a new reading of the clock (existing behaviour of `halt()`); not tested here.
- F-32: the function is `atCamp` (words of the glossary's *Not* and D-389).
- F-39: `bright` is the former `ember` (`#b21818`, 4.2:1), `faint` the former `bronze` (`#985a3b`, 3.3:1); values and `Source:` comments unchanged. The task listed 12 data entries; the data holds 24 specks (12 of each shade); all renamed. The comment of `SceneSpeckShade` no longer calls the name a colour.
- Rule of size of the product's coding guidelines: none (`guidelines/coding.md` holds none), so no move of code came first.

## Uses of "Siedziba" left, with the reason

Every use I found in `src`, `tests`, `guidelines`, `foundations`, `README.md` and `.claude/skills` is the screen, except those renamed. Left: the heading `<h2>Siedziba</h2>`, the menu item, the sentence „Załóż ją w Siedzibie.” of the screen Mapy (`maps-screen.tsx`, its test, `styleguide-browser-view.md`), every "on Siedziba / the screen Siedziba / opens Siedziba / the heading Siedziba" in decisions (D-280, D-281, D-282, D-287, D-330 and the like, including "a character on Siedziba", "the row of a character in Siedziba", "no button at a character in Siedziba"), the title "The camp of Siedziba" (D-389's own, the screen's camp), `headquarters.css`, `credits.css`, `styles.css`, `knowledge-screen.css`, `accounts-screen.css`, `maps-screen.css`, `run-screen.css` comments (the screen), the names `headquarters-entry.ts`, `headquarters.tsx` (the screen), and the lines of `guidelines/styleguide-browser-view.md` that say "w Siedzibie" for the row of the team, the report „Odbierz” and the credits (the screen), `guidelines/coding-browser-module.md` („raporcie Siedziby”, the screen), `.claude/skills/loop2-deploy` and `loop2-scene-art`, `README.md`. Also left unchanged: `tests/invariants/test_browser_view_framework.py:51` lists the npm package `ember-source` (a framework to refuse; unrelated to the shade).
Beyond the task's list, I renamed: the "Siedziba" uses at `camp-picture.test.mjs` and `scene-picture.test.mjs:504`, and the two uses in D-389 (the Verification line "where none is in Siedziba"); and, for F-39, the use of `ember` in `tests/view/scene.test.mjs:2305`, which the task did not list.

## Reconciliation with the base (stale places of the task)

Line numbers of the task were stale; every place was found by its symbol. `src/browser/styles.css` no longer holds the speck rules (they are in `src/browser/run-screen.css`). The sim line was `paused: !completed` in `advanceMinutes`. The styleguide lines were 939 and 946.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/skill/*`, `decisions/template.md`, `glossary/skill/*`, `glossary/template.md`, `common/rules.md`, `common/way_of_working.md`: read to write the entries (the handoff names `foundation_step.md` and says to read each element's `SKILL.md`; the files those name are beside it).
- `src/browser/view/app.ts` (`logOut`), `src/browser/view/last-resort.ts`, `src/browser/account-api.ts` (`SaveOutcome`), `src/browser/view/discovery-band.tsx`, `scene-picture.ts`, `status-row.ts`: read to see what the change reaches.
- `tests/invariants/test_player_map_run_pace.py`, `tests/view/game-saver.test.mjs`, `tests/sim/discovery.test.mjs` read whole before changing them.
- `foundations/decisions.md`: D-97, D-208, D-323, D-389 whole (the entry), and every line with "Siedzib" (listed by a script, read as context lines, not whole entries).

## Working copies

`.runs/author/` held, first, two copies of changed sources, three logs and the list of my search of "Siedzib", and, for the red runs, a throwaway git worktree `.runs/author/red` (detached at `e7b3d071`, three new test files copied in, two junctions). I removed the two junctions (the targets `node_modules` and `.the-way` of the task worktree are intact), then the worktree with `git worktree remove --force`, then the directory `.runs/author/`. `git worktree list` shows no `author` worktree, `git status --short` is empty, and the branch holds only my five commits (head `1d8caf17`).

## Unread material

- `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/decision-index.md`: read lines 1-397 of 825 (the part up to D-287); not read: lines 398-825.
- `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/sections.md`: not read.
- D-122, D-207, D-48, D-330: read through the index (binding sentences) and the tests' quotations; their entries (*Rationale*, *Rejected*) not opened whole.
- `guidelines/styleguide-browser-view.md`: read lines 1-400 and 928-955, and the lines a search of "Siedzib" returned; lines 400-928 and 955-1165 not read whole.
- `foundations/part_map.md`, `foundations/invariants.md`: only the entry `player-map-run-pace` and the search results; not read whole. `guidelines/testing.md`: read whole (the Trust-boundaries table is long; I read it).

## Searches not found or unclear

- The `understanding.ts` place the task names (first cooling before `if (after.death) return found;`): found at about line 274-288; it needs no change, and the task's "To do" 1 asks for the pause only; I take it as the explanation of the fault, not as a place to edit. If the human meant a change there too, that is open.
- "12 data entries" of the task: the data holds 24 specks (12 `ember`, 12 `bronze`); all renamed.
- The task's quotation of D-208 and D-97 differs from the log only in being shorter; the log is what I edited.
- A real-browser check of the path error → `unhandledrejection` → `last-resort.ts`: not done (see the own-work check).

## Problems and concerns

- The two retries after a failure caused by an error of the clock's read would, before D-323's halting by the last resort, call the failing code again; after the halt the read goes without the clock (`halt()` of the store). Not tested in this change; I read it in `guidelines/coding-browser-module.md` and `last-resort.ts`, not in a running page.
- The order of the entries of D-323's *Verification*: the pair for the new sentence is folded into the existing `complies:` and `violates:` lines (the check reads those two labels alone).
- The change touches the look of no screen: renames of tokens and shades with the same values (the contrast and source invariants and the scene tests pass), a state of the saving line that was a hang before, and a pause flag the views already read after death. No screenshot was taken; the states were checked in code and by the tests above. The foundation settles a place for screenshots? I did not look it up, since I show none.
