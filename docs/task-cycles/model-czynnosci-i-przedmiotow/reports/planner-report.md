# Planner report — model-czynnosci-i-przedmiotow

Status: **done with concerns**

- Plan: `.runs/task-cycles/model-czynnosci-i-przedmiotow/plan.md` — 16 foundation entries, 17 slices.
- Size report: `.runs/task-cycles/model-czynnosci-i-przedmiotow/plan-size.md`, written by
  `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/model-czynnosci-i-przedmiotow/plan.md`, run from
  the worktree root, exit code 0: every slice fits. The largest are Slice 13 (140 749 tokens), Slice 2 (136 154),
  Slice 1 (134 560), Slice 7 (132 756) and Slice 11 (132 243).
- No open design choice and no reserved choice: the spec settles every design, and the plan's own choices stand
  under *Choices*.

## How the change was cut

- The slices of *To do* 15 (1–3) come first, since nothing else touches them. Slice 1 is the fingerprint, the
  record and the cache's stored form 2. Slices 2 and 3 are the two test files that build records by hand
  (`tests/view/maps-screen.test.mjs`, 118 000 characters; `tests/sim/judging.test.mjs`), split off because no
  one slice can read them with the view's guidelines.
- Rule of size (D-425, 200 lines of code for a function and 800 for a file): nothing stands over a threshold at
  the base. I ran `tests/quality/eslint-size-rules.mjs` in the worktree: "0 functions and files over a threshold
  in 338 files". With lower limits it gave the sizes the plan uses:
  - `RulePanelView`: 200 lines, exactly at the limit. Slice 4 moves the field row out before Slice 14 adds to it.
  - `TripPlanView`: 199 lines. Slice 6 adds no line to it.
  - Files: `program-editor.ts` 680, `programs.ts` 654, `run.ts` 649, `rule-panel.tsx` 590, `scene-picture.ts` 542,
    `program.ts` 389.
  - The functions `landUse` (80 lines), `worldRefusal` (71) and `minuteBeforePick` (126) are under the limit.
  - Only `RulePanelView` needs a move. Slice 13 puts the item-target pick in a new module, so
    `program-editor.ts` does not need one.
- Cross-part fact that shaped the cut: once `Action` gains `craft` and `tend`, three things stop compiling:
  `worldRefusal` (`program.ts`), `goalOf` (`scene-picture.ts`) and `withActionKind` (`program-editor.ts`, which
  builds `{ kind }`). New action rows also change the save's shape: `minutesByAction` keys come from
  `MINUTE_KINDS`, and `Backpack` from `ITEMS`. Data, types, those three branches, the targets module and the
  `changedProgram` call therefore sit in one slice, Slice 7 (`same` class). Its tests come later. A named set of
  tests fails from Slice 7 until the slice that owns each; Slice 7's goal lists them.
- Probe: to name those failures from evidence, not guesswork, I built the base in a throwaway worktree and laid
  the bandage row, the two action rows, the fifth group and two icon credits on the built data (`dist/`). The
  node test suite then failed 41 cases in seven files:
  - `data.test.mjs` 6 → Slice 9
  - `trip.test.mjs` 5 → Slice 9
  - `saved-game.test.mjs` 19 → Slice 11
  - `icons.test.mjs` 7 → Slice 8
  - `program-editor.test.mjs` 3 → Slice 13
  - `rule-editor.test.mjs` 1 → Slice 15
  - one case in `repertoire.test.mjs` passed.

  The base had passed all 2 624 cases. The list is kept in
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/planner-probe-failures.txt`.
- The handoff's foundation entries are the plan's rows 1–16; the *From* column names the settlement rows.
  Settlement rows 4 and 7 go to data in Slices 7 and 8. The cost table of *To do* 14 has no slice: Slices 4–17
  each sort the files they change as one-time for the model or for the bandage alone, and the orchestrator counts
  from those sorts plus each slice's *Change*.
- Trust boundaries marked:
  - Slice 1: `judging-cache.ts`
  - Slice 8: `assets/icons/**`
  - Slice 10: the check that both boundaries of the simulation pass through, and the previous-save reader's
    refusal tests
  - Slice 11: `saved-game.ts`

  No slice holds an operation that cannot be undone.

## Order relative to the styleguide's example

The example orders work as environment and library, then values in their source, then one screen, then its
states. The plan keeps that order where it applies:
- no environment or library change;
- the values in their source — the game's data and the words of items — first (Slices 5–7);
- then the one screen, the program editor (Slices 13–14);
- then what it draws in its states and beside it — the pick's groups, the scene and the credits (Slices 8, 15, 16).

Departure: the icons and credits (Slice 8) come right after the data that name them, not with the screen. They
must enter together with the rows that name them, or the credits fail.

## Guidelines found missing or uncertain

- The "Files of this kind" table of `guidelines/coding-simulation-module.md` has no row for
  `src/browser/sim/judging-record.ts` or `src/browser/sim/judging.ts`. The table of
  `guidelines/coding-browser-module.md` has none for `src/browser/view/rule-drag.ts`, among others. These are
  files added after the last audit of the tables. Slice 7 adds the row of its own new module, as the spec asks;
  the others are not this task's.
- The judging-cache row of the "Trust boundaries" table in `guidelines/testing.md` lists the cases of a stored
  value with "four fields". With the fingerprint there are five, so Slice 1 changes that row. Like Slice 7's
  change to `coding-simulation-module.md`, this happens inside the slice and not through
  `the-way-maintain-testing-guidelines` or `the-way-maintain-coding-guidelines` (*Choices*). The orchestrator may
  prefer a run of those skills.
- Not a defect, but it drives the cut. Every slice that changes a file of `browser-view` reads
  `styleguide-browser-view.md` (98 000 characters) and `coding-browser-module.md` whole. Every slice that writes
  tests reads `testing.md` (83 000) whole. That is about 227 000 characters before any code. It is why the view's
  test changes come apart from the code (Slices 2, 3, 15) and the plan has 17 slices.

## Reaches beyond the dispatch

- D-213 (`foundations/decisions.md:675-718`) in Slice 11's *Read*: the exemplar decision of the saved-game kind,
  which `coding-saved-game.md` names.
- D-317 (`:11416-11505`) and D-367 (`:11756-11767`) in Slice 16: the scene's ordinary effects and their reading,
  for `USES_BACKPACK`.
- The code and tests of the parts touched, read to name files and sizes. Mainly:
  - simulation: `items.ts`, `actions.ts`, `resources.ts`, `revelations.ts`, `types.ts`, `program.ts`,
    `programs.ts`, `run.ts`, `understanding.ts`, `saved-game.ts`, `judging-record.ts`, `credits.ts`;
  - view: `credit-lines.ts`, `program-editor.ts`, `rule-panel.tsx`, `scene-picture.ts`;
  - instrument: `balance/overlay.mjs`;
  - test fixtures and lists: `stryker.config.json`, `tests/sim/understanding-fixture.mjs`, and the headings of
    `rule-editor.test.mjs`, `campfire.test.mjs`, `discovery.test.mjs`, `saved-game.test.mjs` and the invariant
    tests.
- `.the-way/task-cycle/skill/planning.md` and parts of `.the-way/task-cycle/skill/SKILL.md` (step 9). I searched
  them for a rule on tests failing between slices and found none (below).

## Working copies

- `.runs/planner/` held my scripts (entry
  ranges and sizes, the size rule run with lower limits) and the probe:
  - a worktree of `aff09e98` at `.runs\planner\probe`, detached, with a junction to the worktree's `node_modules`;
  - in it, the game built with `node scripts/build.mjs`, the built data changed, and the node tests run.
- Removed, in this order:
  - the junction alone, with `[System.IO.Directory]::Delete`; the worktree's `node_modules` checked intact
    afterwards;
  - the worktree, with `git worktree remove --force`, then `git worktree prune`;
  - `.runs\planner\` itself, by its full path.
- No remainder. The worktree's own tree is untouched (`git status` clean).
- Kept for the report: `reports/planner-probe-failures.txt`.

## Unread material

- Read whole: the task, the spec, the method, every guideline file the dispatch names, `foundations/glossary.md`,
  `foundations/part_map.md`, `src/browser/AGENTS.md`, `.claude/skills/loop2-scene-art/SKILL.md`, and every
  invariant the dispatch names.
- Decisions read whole: D-27, D-290, D-425, D-437, D-439, D-440, D-441, D-442.
- Decisions read only as the task's *Decisions in play* quotes them, then located by heading and measured, not
  read whole:
  - D-145, D-121, D-318, D-363, D-293, D-380, D-18, D-23, D-26, D-60
  - D-63, D-71, D-142, D-82, D-64, D-50, D-120, D-126, D-128, D-140
  - D-143, D-144, D-150, D-179, D-181, D-193, D-206, D-401, D-289, D-309
  - D-291, D-306, D-310, D-334, D-340, D-387, D-416, D-34, D-427, D-428, D-429

  Each slice's *Read* names its decisions whole, by range.
- `task-cycle/plan/too_large.md` not read, as the handoff says; its case did not arise.

## Searches not found or unclear

- I found no rule that says whether the gate may stay red between slices. I searched `.the-way/task-cycle/*.md`
  and `*/*.md` for "red until", "stays red", "between slices", and "gate" near "slice". The method asks only that
  a slice's own checks run when it is made. The plan relies on that and names every expected failure.
- Which Python invariant tests fail after Slice 7 is not known: they build in a copy of the working tree, so the
  probe did not reach them. `test_program_closed_lists.py` is certain (its tripwire compares written-out kinds
  with the data), and so is `test_icon_credits.py`. For `test_program_world_reference.py`,
  `test_simulation_inputs.py` and `test_program_rule_pick.py` it is unclear. Slice 7's goal asks its report to
  name any failure beyond those listed.
- Not checked, since I used no network:
  - whether `bandage-roll` and `first-aid-kit` stand in the source repository at `ICON_SOURCE_COMMIT`;
  - who their authors are.

  Slice 8 confirms both at download, against the facts of rows 15 and 16, which the foundation step reads from
  the pages.
- Not tried: making the type checker hold that every `ResourceId` is an `ItemId`, given that the item rows'
  `revealedBy` reads `Revelation`, which reads `ItemId` (a possible circular type). The spec leaves this to the
  maker (Slice 5).

## Concerns and open questions, with proposed answers

1. **The gate is red from Slice 7 until Slice 15.** The named failures close at Slices 8, 9, 10, 11, 13 and 15.
   *Proposed answer:* accept, as *Choices* weighs it. The alternatives are one slice past an agent's reading, or
   code written only to be removed. Evidence: the probe's 41 cases, and the compile breaks named above.
2. **Slice 7 is the heaviest and riskiest slice:** 10 files, simulation and view, class `same`, and no test of
   its own. *Proposed answer:* keep it, and judge it in the review of the whole change together with Slices 10,
   12, 13 and 16, whose tests cover its code.
3. **Guideline rows change outside their maintain skills** (Slices 1 and 7). *Proposed answer:* keep them in the
   slices, one sentence each. Otherwise the orchestrator runs the skill after the slice.
4. **The foundation step needs network access:** rows 15 and 16 need the two titles read from game-icons.net.
   *Proposed answer:* the foundation step reads them, as the spec gives; Slice 8 confirms them.
