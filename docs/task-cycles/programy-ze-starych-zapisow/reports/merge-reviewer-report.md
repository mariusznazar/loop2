FAIL b1628f0a

# Review of the merge b1628f0a (task branch f79ebc13 + origin/main f0814d77) and the renumbering f79ebc13

`git rev-parse HEAD` in the worktree is `b1628f0a0bb75123115f77c48b560221801be2e1`, the head given. Merge base of `f79ebc13` and `origin/main` is `6f237fb8`. Reviewed read-only; no npm command and no product test was run (the handoff's limit).

Counts: blocking 1, Minor 0, out of scope 0 (plus lines of Declined to judge).

## Findings

### Important (blocking, inside the task)

**1. `tests/view/previous-save.test.mjs:67-78` keeps its own copy of the harness's `press` and `fire`.**

- Place: `tests\view\previous-save.test.mjs` lines 69-78: `function fire(target, type) {...}` and `function press(target) {...}`; line 9 imports only `assert, inAct, settle, withPage` from `./page-document.mjs`; `press(` is called 42 times in the file; `fire(` only inside the local `press`.
- What is wrong: since the target branch, `tests/view/page-document.mjs` exports `fire` (line 125) and `press` (line 134), and D-264 (read whole, `foundations/decisions.md`) says a test file of a screen in React "clicks a control through the harness's `press` ... and keeps no copy of either"; its "violates" list names "a test file of a screen in React that defines a copy of the harness's `press` or `fire`". This file is a screen test run on jsdom through the harness (its own header cites D-264) and defines exactly such a copy. The target branch removed the same copies from `menu-bar.test.mjs`, `program-list.test.mjs` and `account-screen.test.mjs` (`git diff 6f237fb8 origin/main` on those files shows the three removals and the new imports), so this file is the one the merge left behind: it is new on the task side, written before the harness gained `press` and `fire`, and git could not see the conflict.
- Why it matters: this is a departure from a foundation decision that the merged tree now carries (WAY-263, Important when the files do what the entry forbids). Consequence in the code: the copy's `fire` takes the event class from `globalThis.window`, the harness's from the window of the target (`(target.ownerDocument ?? target).defaultView`), so the two drift, and the next change to the harness's click is not applied to the 42 clicks of this file.
- Evidence: `grep -rn -E '^(async )?function (press|fire)\b' tests/` finds only `tests/view/previous-save.test.mjs:69` and `:75` (the `const fire` of `tests/view/chronicle-entries.test.mjs:33` is an unrelated rule list).
- Fix to ask for: import `press` from `./page-document.mjs` in the file, delete the local `fire` and `press`. The harness's `press` is the same code (`assert.ok(target, ...)`, then `inAct(() => fire(target, "click"))`), so no case changes. `inAct` stays imported if the file still uses it elsewhere (not checked; the linter will say).

### Minor

none.

## What I checked and found sound

**Renumbering (D-393..D-396 to D-397..D-400).**
- `git grep -n -E 'D-39[3-9]|D-400' HEAD` outside `foundations/decisions.md`: every reference to D-397..D-400 sits in this change's own files (server, account-api, game-view, app, program-list, menu-bar, previous-save-lines, tests, the loop2-deploy skill copies, styleguide, `foundations/invariants.md` entries of this change) and names the right decision by its meaning: D-397 previous save slot (`database.ts:145,655`), D-398 privilege (`account-api.ts:9`, `account-routes.ts:106,152`, the skill's operator command), D-399 pull (`game-view.ts`, `program-list.tsx`, `previous-programs.test.mjs`), D-400 reset (`app.ts`, reset sentences). The target's own references are unchanged against `git grep ... origin/main`: `foundations/invariants.md:222` (`D-04 · D-393`), `:1334` (`D-393`), `src/browser/view/controls/react-number-field.tsx:8` (D-395), and in `decisions.md` the target's mentions at the lines of D-06 (D-393) and D-370/D-396-bearing text (`below the smallest window of D-396`) are as on `origin/main`.
- `foundations/decisions.md`, compared entry by entry against `origin/main`, the task side at `f79ebc13` and the base `6f237fb8` (a script of mine, outside the repository): 400 entries in the head, none missing from either side; D-393..D-396 equal to `origin/main` (D-396 differs only by the range cut of my extraction); D-397..D-400 equal to the task branch at `f79ebc13`; each entry changed on one side only equals that side's version (28 entries changed by the target, 13 by the task, only D-392 changed by both and it is identical in both); the text before the first entry is identical to `origin/main`; order D-389..D-400 ascending.
- `foundations/invariants.md`: 132 entries in the head (129 base + `simulation-type-check` from the target + `previous-save-slot` and `previous-save-programs-reader` from the task); none missing from either side; `simulation-type-check` equal to `origin/main` including its line `- **Violated:** no`; every entry of the head has a `**Violated:**` line; the target's wording changes in `streak-program-change` and `loop-practice-payment` and the task's changes of the five existing entries are all present (diff `origin/main..HEAD` shows only the task's changes, diff `f79ebc13..HEAD` shows only the target's); the table `## Withdrawn identifiers` is identical to `origin/main`'s and stands after the last entry.
- `foundations/glossary.md` (the target's `loop` entry added) and `foundations/part_map.md` (`tsconfig.sim.json`, the type-check test, the build-tools sentence) are the target's alone in `f79ebc13..HEAD`; the task's entries stand.

**(1) Simulation type-check.** `tsconfig.sim.json` has `lib: ["ES2022"]`, `types: []`, `strict`, `noEmit`, `rootDir: src/browser/sim`, includes `src/browser/sim/**/*.ts`. `src/browser/sim/previous-programs.ts` (read whole) imports only `./programs.js`, `./saved-game.js`, `./types.js` and uses `Object.getPrototypeOf`, `Object.getOwnPropertyDescriptor`, `Reflect.ownKeys`, `Array.isArray`, `Number.isSafeInteger`, `String.trim`, `includes` and `instanceof`: all in the ES2022 library, no `document`, timer, `console` or `structuredClone`; the isolation test's scan (`tests/invariants/test_simulation_isolation.py`) lists `Reflect` among allowed globals and forbids only the clock forms. The appended code in `src/browser/sim/programs.ts` (`freeName`, `appendPrograms`) uses `Set`, template literals and spreads only. Not compiled by me (limit): a pass of `npm run typecheck` is for the orchestrator's gate.
**Target's signature changes** (the map parameter dropped from `chooseActivity`, `judgeProgram`, `conditionHolds`, `actionFeasible`, `resolveCombat`, `chooseCombatRule`): `grep` of those names in `programs.ts`, `previous-programs.ts` and the view files shows none called by this change's code (`programs.ts` uses `conditionNumber` and `onStep`, unchanged).

**(2) View files and tests.** Shared controls: this change's view files import `ReactButton` and `ReactTextField` family only; none imports a screen into `controls/` (D-395); `react-number-field.tsx` (changed by the target) is not used by this change. No `right-area` anywhere in the tree outside `decisions.md`; `tabs-area.tsx` is the target's rename and no file of this change names the old module. `tests/view/menu-bar.test.mjs`, `program-list.test.mjs`, `account-screen.test.mjs` import `press` and `fire` from the harness (merged cleanly, the target's removals present); `previous-save.test.mjs` is finding 1. Tests pick no map, item or archetype by position (grep for `Object.keys|values|entries` on `MAPS|ITEMS|...` and `[0]` of data in the six tests finds none; `tests/sim/program-list.test.mjs` has the target's `MAP_ID = "forest"`). `node --check` on the six tests and the harness: all exit 0 (syntax only). Smallest window of D-396 (page area 1280 x 720): the rules this change added, `.program-reset-confirm` (flex, wrap) and `.program-reset-text`, wrap and use tokens only; the program list rows wrap (`.program-list, .program-actions { flex-wrap: wrap }`); I could not see the screen at that size (no browser run), so the fit is judged from the styles.

**(3) Saved game.** The target's change to `src/browser/sim/saved-game.ts` is a comment only (the doc comment of `SAVED_GAME_VERSION` now also names the ordinary actions, D-369 and `guidelines/coding-saved-game.md`); the reader code is untouched, so nothing weakens the trust boundary. This change adds no type to the game state and no ordinary action: `appendPrograms` writes `SavedProgram` records and `nextProgramId` as the game state already has them, so `SAVED_GAME_VERSION = 5` stays right. `previous-programs.ts` reads `SAVED_GAME_VERSION` for its upper bound, so a later raise still works.

**(4) `src/browser/styles.css`.** The target's only change is the removal of `.rule-panel-host` (no remaining use in `src` or `tests`); the task's two rules are present once (`grep -n '^\.program-reset'` finds one definition each, lines 781 and 789), and the tokens `--space-xs`, `--space-s`, `--bar-width`, `--warning` exist in `src/browser/tokens.css`; no colour, size or font literal in them.

**(5) Rest of the merge.** `git diff --stat f79ebc13 b1628f0a` (79 files): the files both sides touched since the base are `foundations/{decisions,glossary,invariants,part_map}.md`, `guidelines/{styleguide-browser-view,testing}.md`, `src/browser/styles.css`, and four tests (`tests/sim/program-list.test.mjs`, `tests/view/account-screen`, `menu-bar`, `program-list`); each was read as a three-way view above and merges without loss. Guidelines after the merge: `coding-saved-game.md`, `coding-browser-module.md`, `testing.md` and `styleguide-browser-view.md` changed by the target only in the lines the diff shows (D-369 version rule, the `tabs-area` row, "pick by identifier", the `tabs-area.tsx` path); none contradicts this change except through finding 1. `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`.

## Declined to judge

- `src/browser/view/previous-save-lines.ts` is not a row of `guidelines/coding-browser-module.md`'s table of files (nor are `camp.tsx`, `camp-picture.ts`, `end-question.tsx`); the table is not complete before this change, the foundation check passes, and it is not the merge's doing: set aside as outside the merge.
- The server side of this change (`src/server/**`, `database.ts`, routes): not touched by the target; it passed its whole-change review at `5fe76674`; the merge brought nothing into those files, so I did not re-review it.
- Formatting and lint of the merged files (the widened scope of the formatter and linter): not run (no npm); the four overlapping test files merged by git without conflict, and finding 1's fix will need the linter for the import it changes.

## Checks run

- `git rev-parse HEAD` — exit 0, `b1628f0a0bb75123115f77c48b560221801be2e1`.
- `git log`, `git diff --stat f79ebc13 b1628f0a`, `git diff f79ebc13 b1628f0a -- <files>`, `git diff 6f237fb8 f79ebc13`, `git diff 6f237fb8 origin/main`, `git diff origin/main HEAD`, `git show <rev>:<file>`, `git grep -n -E 'D-39[3-9]|D-400' HEAD` and on `origin/main`, `git ls-files`, `git merge-base f79ebc13 origin/main` — all exit 0.
- Comparison scripts of decisions and invariants by entry (`python -B -I`, files in the system temp directory, outside the repository) — exit 0 each; results above.
- `grep` of `press`/`fire` definitions in `tests/`, of `right-area`, `rule-panel-host`, the tokens, the isolation test's allowed names — exit 0.
- `node --check` on `tests/view/previous-save.test.mjs`, `program-list.test.mjs`, `menu-bar.test.mjs`, `account-screen.test.mjs`, `tests/sim/previous-programs.test.mjs`, `program-list.test.mjs`, `tests/view/page-document.mjs` — exit 0 each (syntax parse only, not a test run).
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- Not run, for the handoff's limit: `npm test`, `npm run typecheck`, `npm run build`, the formatter, the linter, any invariant test, any view or simulation test. Unverified for that reason: that the merged tree type-checks under `tsconfig.sim.json` and `tsconfig.browser.json`, that every test passes, and that the smallest window shows the pull and the reset sentences without overflow. The orchestrator's gate on the merged tree covers them.

## Reach beyond the handoff

- `tests/view/page-document.mjs` lines 93-150 (the harness's `press` and `fire`) and `git diff 6f237fb8 origin/main` of the three view tests: to establish finding 1.
- `tests/invariants/test_simulation_isolation.py` (patterns, allowed globals) and `tests/invariants/test_simulation_inputs.py` (how an exported function not in its table is called): to see whether the new sim file's names and new exports clash with them.
- `src/browser/tokens.css` (the four tokens).
- `src/browser/sim/program.ts`, `combat.ts`, `run.ts`, `game.ts` target diff: for the dropped map parameter and a call from this change's code.
- `guidelines/coding-simulation-module.md` and `coding-browser-module.md` tables of files against `git ls-files`: for the Declined line.
- D-369 whole (version rule) and D-06 (third configuration).

## Unread material

- Decisions of the handoff's list read whole: D-393, D-394, D-395, D-396 (whole), D-264 (whole), D-369 (whole except the tail of its rationale cut by the output), D-06 (to its rejected ways, the tail cut), D-04 (first part, up to the first third of its verification, not to the end). Not read, or read only as a diff line or by the merge diff: D-120, D-136, D-147, D-208, D-247, D-268, D-339, D-347, D-349, D-370 (I read only that the target changed them; none concerns saved-game programs, accounts or the pull and reset controls except D-136, whose narrowing to "a map run that has not ended" I checked only against D-399's own text and the task's test names, not against the whole entry).
- Invariants of the target other than `simulation-type-check` (the only new one): read as diffs, `simulation-type-check` whole; its test `tests/invariants/test_simulation_type_check.py` read whole.
- Guidelines not read whole: `guidelines/coding-saved-game.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`. I read what the merge changed in each (diffs `f79ebc13..b1628f0a`), `coding-browser-module.md` lines 1-40 and the whole table by grep, `testing.md` lines 100-125 and the rows around 206-216 by grep. The handoff asked for them as they stand after the merge, so this part of the check is by diff, not whole.
- Not read: the task's server files, `game-view.ts`, `app.ts` and `menu-bar.tsx` in full (task-side, passed review before the merge, not changed by the merge); `tests/view/previous-save.test.mjs` read in the head and around lines 55-100 only, apart from grep; `tests/sim/previous-programs.test.mjs` by grep only; `.runs/task-cycles/.../task.md` and `spec.md` not opened (the handoff says they are needed only for what the change must keep, and none of the points above turned on them).

## Searches not found or unclear

- I did not find a copy of the harness's `press` or `fire` anywhere else in `tests/` beyond finding 1 (`grep` above).
- Not found: any reference in `src/` or `tests/` to `.rule-panel-host`, `right-area`, or an old-signature call (map argument) in this change's code.
- Unclear: whether `inAct` remains used in `previous-save.test.mjs` after the copies are removed (affects the import line of the fix only).
- Unclear: how the pull button and the reset's sentences look at a page area of 1280 x 720 px; judged by the styles only, no browser run (outside the limit of this review).
- Questions to the orchestrator: none.
