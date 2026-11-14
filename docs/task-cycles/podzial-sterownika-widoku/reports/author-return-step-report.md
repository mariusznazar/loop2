# Author return-step report

Head before: `4f62fec5`. **One commit:** see `git log -1` on the branch (`docs: name the tests that hold part of D-408 and D-409 …`). No push.

## Foundation compared with the code

- **Entries the change writes.**
  - D-407 matches the code: separate roots (Programy and Przejście hold two each, inside the entry, none shared between screens), the store and the state module outside React, `createFolding` and `createChronicle` as page memory given to the factories. No test holds it, so its pair of examples stays whole.
  - D-408 matches: a screen is a module, an entry, one line of the table in `game-view.ts`, its address in `screen-address.ts` (now also its kind in `SCREEN_KINDS`, the same file), its place on the menu bar. The rationale's "one branch left" matches `tellPlace`.
  - D-409 matches: every act goes through `store.act`; `create` and `onBuy` through `actWithoutCatchUp`; `send`/`startLoop` through the store, which has the clock read.
- **Entries the task names** (D-03, D-04, D-207, D-280, D-281, D-283, D-284, D-173, D-311, D-322, D-368, D-295, D-339, D-323), read in the task's quoted fragments and compared with the code and the test traces: no sentence is contradicted. D-371 and D-173 say the memory is "kept by the game view"; it now stands in the module of the state of Przejście, composed by the game view, so the wording stays true and no entry is edited. The differential trace of the first report held the player-visible parts (window, question, focus, saves, pause on leaving) identical to the base.
- **Entries the search found:** a search of `foundations/` for root, island, portal, store, clock-reading and `flush` found no other entry that answers these questions or collides.
- **Part map, `browser-view`:** files `src/browser/view/**` and `tests/view/**` cover the nine new files and three new tests; responsibility and dependencies unchanged; no entry changes.

## What the step wrote

- **Decisions:** no new one. D-408 and D-409 changed in *Verification* only: each now has `tests:` and a pair for the part no test holds, and the new lines `decision: D-408 "No function the game view shares between its screens names the new screen"` (`tests/view/screen-registry.test.mjs`) and `decision: D-409 "An act of the player that depends on the passing of time goes through the store of the game state, which reads the clock and passes the time elapsed to the simulation before the act runs"` (`tests/view/state-store.test.mjs`). The part the registry test holds is the registry's side; the pair stays for the functions of the composition and for an act written outside the store. D-407's pair stays (no test).
- **Invariants:** none (the task, the decisions and the human set no rule checkable on a commit; the three settlements are checked by review, as the spec says).
- **Environment facts:** none (the change rests on no outside source).
- **Glossary terms:** none ("store", "registry", "entry" keep their ordinary meaning, as the spec says; "page memory" is the wording D-295 and D-339 already use).
- **Part-map changes:** none.
- **Projected entries:** none (the task has no project). **Rows of *Settlements to record* not yet written:** none; rows 1, 2, 3 are D-407, D-408, D-409.
- **A choice that binds after the merge:** the closed list of what each entry may import (spec decision 1) is a rule for how to write code, so by the decisions template's question 2 it belongs to the guidelines, and the spec says "no new decision beyond the task's three settlements"; the spec's exclusion prevails and nothing is written. The nine files stand in the table of `guidelines/coding-browser-module.md` (written in the change). Not proposed for later.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (the 23 notices of decisions "held by nothing" are the same as on the base). A deliberately wrong quotation in the new `decision:` line made it report "the quotation stands in no binding sentence"; restored, it passes.
- `node scripts/test-node-file.mjs tests/view/screen-registry.test.mjs` and `.../state-store.test.mjs` — 0, 0; `npx.cmd eslint tests/view` — 0; `npx.cmd prettier --check` of the two test files — 0. Full gate not run.

## Unread material
The reviews `reports/review-whole-report.md` and `reports/review-fix-report.md` were not opened. `return_step.md` and `foundation_step.md` were read whole (the latter in the first stage; its element `SKILL.md` for decisions was read then; I did not write a new entry now). D-173, D-311, D-322, D-368, D-295, D-339, D-280–D-284 were compared through the task's fragments, not read whole.

## Searches not found or unclear
None.

## Reaches
`.the-way/task-cycle/skill/return_step.md`; `tests/quality/test_test_gate.py` (one line, as the form of a `decision:` line).

## Working copies
None made; `.runs/author-return/` was not created.
