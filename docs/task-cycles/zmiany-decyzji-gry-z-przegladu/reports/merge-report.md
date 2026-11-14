# Merge report — reconciliation with `origin/main`

**Status:** done.

**Commits** (branch `task/zmiany-decyzji-gry-z-przegladu`, head before: `fd1a7e89`; target merged: `e54f23c0`):

- `23634ee9` — the merge commit (parents `fd1a7e89`, `e54f23c0`); no rebase, no force, nothing pushed.
- `c9365b7e` — `docs: :card_file_box:` the renumbering of our decision, by explicit path (`foundations/decisions.md`, +2 / −2).

## How the conflict was resolved

`git fetch origin`, then `git merge origin/main`: one conflict, in `foundations/decisions.md`, at the end of the file (both sides appended a decision). Resolution: the target's three decisions (D-393 "What keeps the simulation from using names outside the JavaScript language?", D-394, D-395) kept word for word, in their order, and our decision placed after them, with one empty line between entries. The merge commit `23634ee9` holds our decision under its old heading (D-393) so that the merge is the plain resolution; the commit `c9365b7e` after it gives the new number. (A foundation check on the merge commit alone would report the doubled number D-393; the check on the head is clean.)

Check that nothing of the target changed: `git diff origin/main -- foundations/decisions.md` shows only our edits (the earning-loop words, D-346, D-383, D-120, D-136, D-179, D-186, D-311, D-367, D-369, D-396 and so on) and no line of D-393, D-394, D-395, D-264, D-06 or the other entries the target changed.

## The number of our decision and every place renumbered

Our decision is now **D-396** (the target's last decision is D-395; `grep -n "^### D-39" foundations/decisions.md` lists D-393 to D-396 in order, each once).

`git grep -n "D-393\|D-396"` over `foundations/` and `guidelines/` after the follow-up commit:

| Place | Meant | What I did |
|---|---|---|
| `foundations/decisions.md:9697`, heading `### D-396 — In which browsers and from which window size …` | our decision | renumbered D-393 → D-396 |
| `foundations/decisions.md:7464`, D-311 *Accepted with it*: "below the smallest window of D-396" | our decision | renumbered D-393 → D-396 |
| `foundations/decisions.md:205`, D-06 *Rationale*: "the configuration of its own that D-393 gives" | the target's D-393 (type check of the simulation) | untouched |
| `foundations/decisions.md:9654`, heading `### D-393 — What keeps the simulation …` | the target's decision | untouched |
| `foundations/invariants.md:222` and `:1334`, *Derives from* `D-393` (`simulation-isolation`, `simulation-type-check`) | the target's D-393 | untouched |

No other mention of our decision's old number stood in our diff (`git diff 5159e8c4..dd0e6cb6 | grep D-393` listed only the heading and the D-311 clause), in `guidelines/coding-saved-game.md` (it names D-206, D-213 and D-369) or in `src/browser/sim/saved-game.ts`. The records of the cycle (`.runs/…`) were not changed, as the handoff says; the reports before this one still say "D-393" for our decision.

## Foundation entries of the merge that bear on our parts, and how they were compared

| Entry or change of the target | Compared with ours | Result |
|---|---|---|
| D-393 (target): the type-check configuration of the simulation (`tsconfig.sim.json`: `lib` ES2022, `types: []`, `noEmit`, every file under `src/browser/sim/`), with `simulation-type-check` and `simulation-isolation` | our one change in the simulation, the comment above `SAVED_GAME_VERSION` in `src/browser/sim/saved-game.ts` (no code, no value, no name) | holds. `npx tsc -p tsconfig.sim.json` exit 0 on the merged tree. |
| D-394 (target): the simulation keeps `actionFeasible` | our entries name `actionFeasible` nowhere (`git grep actionFeasible -- foundations guidelines` shows only the five lines of D-394 itself) | no contact |
| D-395 (target): a shared control imports no module of a screen using it | our decisions about screens (D-346, D-383 chronicle pick; D-311, D-282 layout; D-179, D-186, D-180 trip plan; D-367 scene) name no shared control or its imports | no contact |
| D-264 (target): the harness `press`/`fire` and the test files of screens | none of our entries speaks of tests of screens | no contact |
| D-06 (target): the third configuration, the type check of the simulation | our decision D-396 and the guideline rule on the saved game do not describe the build | holds |
| Code of the target: `src/browser/sim/program.ts`, `run.ts`, `combat.ts`, `game.ts` (the `map` argument dropped from helpers); `src/browser/view/{tabs-area (was right-area),trip-plan,rule-list,rule-panel,run-screen,controls/react-number-field}.tsx`, `trip-editor.ts`; `styles.css` (the class `.rule-panel-host` removed) | our entries against the merged code: `programs.ts:581` (`!mapRunEnded(run) && ruleContentChanged`, `streak-program-change`, D-131), `chronicle.ts:124-125` (`let tab`, `let filter`, D-346/D-383), `program-panel.tsx:635` (`mode === "programs"` shows the trip plan, D-180/D-179/D-186), `styles.css:279` (`@media (min-width: 1074px)`, D-311/D-282), `run-record.ts:16` (`MINUTE_KINDS`, D-369/D-396 text) | all still hold. The rename `right-area.tsx` → `tabs-area.tsx` touches no entry of ours (none names the file); the target's guidelines carry the new name. |
| `foundations/part_map.md` as merged (the target adds `tsconfig.sim.json` and `tests/invariants/test_simulation_type_check.py` to `build-tools`, and "checks the simulation's types under a configuration of their own" to its description) | our D-396 *Scope* (`browser-view`, `agent-workflow`); parts of our change (`product-foundation`, `simulation`, `agent-workflow`) | holds; no part of ours changed |
| `foundations/invariants.md` as merged (`simulation-type-check` new; `simulation-isolation` *Derives from* gains D-393) | our invariant changes: `streak-program-change` (sentence), `loop-practice-payment` (one word) | no contact; the merge touched neither |
| `foundations/glossary.md` | not touched by the target; our entry `loop` stands after `earning loop` | holds |
| `guidelines/testing.md`, `coding-browser-module.md`, `styleguide-browser-view.md` (target) | not touched by us; `guidelines/coding-saved-game.md` (ours) is not touched by the target | no contact |

Nothing collides, so no change to an entry the task does not carry or to the target's entries was needed, and no question arises.

## Checks

| Command | Exit code |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (on the head `c9365b7e`) | 0 (`0 errors`) |
| `python -B .the-way/elements/common/foundation_check.py` (after the conflict resolution, before the commits, with the new number in the tree) | 0 (`0 errors`) |
| `git diff --check` (before each commit) | 0 |
| `npx tsc -p tsconfig.sim.json` (the target's type check of the simulation, on the merged tree) | 0 |

Not run: `npm test`.

## Unread material

- The target's changes to `tests/**` (about 50 files) and `scripts/build.mjs`: not read; I looked at the list of files (`git diff dd0e6cb6...origin/main --stat`) only, since no entry of ours rests on them.
- The code diffs of `src/browser/view/rule-list.tsx`, `rule-panel.tsx`, `controls/react-number-field.tsx`, `trip-editor.ts`, `run-screen.tsx`, `src/browser/sim/program.ts`, `combat.ts`: not read; only the diffs of `styles.css`, `run.ts`, `game.ts` and `trip-plan.tsx` were read, and the lines our entries rest on were checked in the merged tree by search.
- The target's D-06 was read in the lines it changed (lines 183-206 of the merged file), not whole; D-393, D-394, D-395 and D-264 were read whole.
- The target's invariants `simulation-type-check` and the changed part-map text were read in the diff, not whole entries beyond it.

## Searches not found or unclear

none
