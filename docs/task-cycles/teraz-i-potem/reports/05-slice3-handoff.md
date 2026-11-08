# Handoff 05 — slice 3 (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh executor of the cycle. Send every question to the orchestrator by returning `questions`; never ask the human, never start the next slice or stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`. The slice's base is the branch's head when you start (`git rev-parse HEAD`); the orchestrator recorded it.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. You make **a slice, or the retry of a slice**; read a file it names (such as `slice.md` or `ui_check.md`) when the step or variant that names it comes.
- Class of model: cheaper (Sonnet), by the plan.
- Boundary: make slice 3 of the plan and nothing else; change only the files its *Change* names (a file outside it is a reach you name in your report, or a question). Commit by path (`git add <file> …`, never `-A`), English commit messages in the repository's form (`feat: :sparkles: …`, `test: …`, `docs: :memo: …`). Do not run the product's whole gate (`npm test` with no argument); run the focused checks of the slice's *Checks*.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/05-slice3-report.md`. Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, your own-work check, every reach beyond this handoff, your questions and concerns, and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## Task, spec, plan and answers of step 4

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` (the human's task note, accepted 2026-11-07). Read the passages your slice's *Read* names.
- Spec: none. Plan: `.runs/task-cycles/teraz-i-potem/plan.md`.
- Trust boundary: no. Irreversible operation: no. No slice touches `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts` or `assets/**`; if yours would have to, return the question.
- The plan's *Foundation entries* are written (commit `bd44c39`): rows 1, 4 and 8 of *Settlements to record* stand in D-334, row 2 in D-335, row 3 in D-336, row 7 in D-337, rows 5 and 6 in D-133. Where the *Read* says "Foundation entries row N", read the entry named here.

## Your slice — copied word for word from `plan.md`

### Slice 3 — What „Teraz” and „Potem” name, in the simulation

- **Goal:** `src/browser/sim/game.ts` exports, beside `ruleSigns`, one function, named by the slice,
  that gives for a game state what the rows „Teraz” and „Potem” name, null without a map run, its
  inputs unchanged. „Teraz”, in this precedence: after a death its cause (`run.death`); after a
  completion the completion; in the minutes of an attack the creature fought, with no rule — from
  the attack minute through the resolution minute, also where the next ordinary action starts in
  the resolution minute, as `statusText` of `src/browser/view/status-row.ts:62-68` decides it today,
  a rule that moves here; otherwise the action under way (`run.current`): a wait, or the rule it
  comes from with its action, the game minutes left and the game minutes in all, as „zostało 3 z
  5 min” reads them (left: from the map run's game minute to the action's end; in all: its end less
  its start; read in `src/browser/sim/run.ts` what `current` holds at the end of a game minute so a
  paused minute reads as the task's example). „Potem”: the winner of the judgement `ruleSigns` gives
  for the same state — the rule that wins now, in the minutes of an attack the combat rule the turn
  would choose, after the end the rule that wins at the stopped minute — or none, taken from that
  one judgement, never from a second pick (the invariant `rule-state-from-pick` in its new wording;
  D-308, D-309). „Teraz” of a rule comes from the pick that started its action, so only the D-147
  exceptions — combat, death, completion — come from elsewhere. Write the failing cases first in
  `tests/sim/rule-signs.test.mjs`: a rule's action with its minutes; a wait; the minutes of an
  attack and its resolution minute with an ordinary action starting in it; a death of cold, of
  hunger and in combat, also a death in the resolution minute; a completion, also in a resolution
  minute; „Potem” the same rule as the winner the signs show, in combat and after a death too; no
  winner. In `tests/sim/encounters.test.mjs` the case "M+5 starts ordinary work immediately, counts
  every combat action once and still shows combat" asserts the combat of the resolution minute and
  its end in the next minute through the new function instead of `statusText`: the requirement is
  D-147's „Teraz”, which that function now carries, so the check moves and is not weakened. The
  comment of `completionText` in `src/browser/sim/data/maps.ts` says the status row shows it;
  „Teraz” does now.
- **Change:** `src/browser/sim/game.ts` · `src/browser/sim/data/maps.ts` ·
  `tests/sim/rule-signs.test.mjs` · `tests/sim/encounters.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:29-37` To do, item 1 ·
  `.runs/task-cycles/teraz-i-potem/task.md:61-72` Questions to settle, Pytanie 1 and Pytanie 2 ·
  `.runs/task-cycles/teraz-i-potem/task.md:93-101` Questions to settle, Pytanie 8 and Pytanie 9 ·
  `.runs/task-cycles/teraz-i-potem/task.md:118-127` Questions to settle, Pytanie 14 and Pytanie 15 ·
  `.runs/task-cycles/teraz-i-potem/task.md:129-148` Context ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries rows 1, 2, 4 and 8, rule-state-from-pick, D-147 and D-132 ·
  `foundations/decisions.md:52-120` D-04 · `foundations/decisions.md:437-451` D-20 ·
  `foundations/decisions.md:525-560` D-23 · `foundations/decisions.md:1223-1237` D-61 ·
  `foundations/decisions.md:1238-1252` D-62 · `foundations/decisions.md:2499-2524` D-132 ·
  `foundations/decisions.md:2657-2681` D-140 · `foundations/decisions.md:2682-2696` D-141 ·
  `foundations/decisions.md:2772-2786` D-147 · `foundations/decisions.md:6559-6618` D-308 ·
  `foundations/decisions.md:6619-6646` D-309 · `foundations/decisions.md:6647-6672` D-310 ·
  `foundations/invariants.md:1219-1228` rule-state-from-pick ·
  `foundations/invariants.md:248-263` program-rule-pick ·
  `foundations/invariants.md:187-197` action-in-progress ·
  `foundations/invariants.md:214-235` simulation-isolation, simulation-inputs ·
  `foundations/glossary.md:18-24` map run · `foundations/glossary.md:73-79` free game minute ·
  `foundations/glossary.md:136-141` completion · `foundations/glossary.md:168-179` combat turn,
  copy · `foundations/part_map.md:30-61` simulation · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md` · `src/browser/sim/program.ts:348-468` judgeProgram ·
  `src/browser/sim/types.ts` · `src/browser/sim/run.ts` · `src/browser/view/status-row.ts` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/rule-signs.test.mjs` (its new cases failing first) ·
  `npm test -- tests/sim/encounters.test.mjs` · `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` · `npm run typecheck`
- **Depends on:** row 1 · row 2 · row 4 · row 8 · rule-state-from-pick · D-147 · D-132

## Current ranges of the foundation entries your *Read* names

The ranges in the *Read* above are from the plan; the foundation step has moved them. These hold now (an entry runs from its heading to the next one):

| Entry | Range now |
|---|---|
| D-147 | `foundations/decisions.md:2786-2800` |
| D-132 | `foundations/decisions.md:2500-2526` |
| D-04 | `foundations/decisions.md:52-120` |
| D-20 | `foundations/decisions.md:437-451` |
| D-23 | `foundations/decisions.md:525-560` |
| D-61 | `foundations/decisions.md:1223-1237` |
| D-62 | `foundations/decisions.md:1238-1252` |
| D-140 | `foundations/decisions.md:2671-2695` |
| D-141 | `foundations/decisions.md:2696-2710` |
| D-308 | `foundations/decisions.md:6576-6635` |
| D-309 | `foundations/decisions.md:6636-6663` |
| D-310 | `foundations/decisions.md:6664-6689` |
| D-334 | `foundations/decisions.md:7216-7261` |
| D-335 | `foundations/decisions.md:7262-7293` |
| `action-in-progress` | `foundations/invariants.md:187-197` |
| `simulation-isolation` | `foundations/invariants.md:214-225` |
| `simulation-inputs` | `foundations/invariants.md:226-235` |
| `program-rule-pick` | `foundations/invariants.md:248-263` |
| `rule-state-from-pick` | `foundations/invariants.md:1219-1228` |

Line ranges of the task, guidelines and code in the *Read* stand as the plan gives them, except where an earlier slice changed a file: find the passage again by its name.

## Orchestrator's notes for this slice

- Slice 2 (commit `35f53cd`) added `minutesUntilChilled`, `minutesUntilStarving` and `needNotes` to `src/browser/sim/body.ts`; they are not yours, named only so you do not duplicate them.
- The plan's concern 7: establish from `src/browser/sim/run.ts` what `run.current` holds at the end of a game minute, so that a paused minute reads as the task's example „zostało 3 z 5 min”, and test it.
