# Handoff — planner (plan-task)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator (me); nothing in this
handoff is the human's approval. You never ask the human. Your questions come back to me.
Plans bend: if a value, a line number or a statement in the task does not survive your own check
against the code, say so in the report instead of fitting the plan to it.

## Where you work

- Worktree (work from its root): `the root of the repository` — branch `task/porzadki-z-uwag-pr`.
- Base commit: `00aa818e59ab484358970f98af1f4ab61e969e4c` (the task was verified on `72287c2`; between them no
  code or test file named by the task changed; `guidelines/coding.md` and `guidelines/testing.md` did, by a few lines).
- Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`, already checked out in the worktree.

## Your stage and its boundary

- Stage: the plan of the change. Method: read `.the-way/task-cycle/plan/SKILL.md` whole and follow it; read
  `.the-way/task-cycle/plan/too_large.md` only if the step that names it comes (it does not here).
- Write only `.runs/task-cycles/porzadki-z-uwag-pr/plan.md` and its size report
  `.runs/task-cycles/porzadki-z-uwag-pr/plan-size.md`. No code, no test, no foundation entry. Return before any
  slice is made.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/02-planner-report.md`.

## The task

Frozen task (read whole): `.runs/task-cycles/porzadki-z-uwag-pr/task.md` (copy of the approved task document,
`Status: ready for cycle`, `Project relation: independent`, accepted 2026-11-08). No spec exists; none is needed.

## Answers of the orchestrator's step 4

- Trust boundary: yes. The part map names `src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`
  among others. A slice whose *Change* contains any file of those marks it so.
- Irreversible operation: no. Item 26 writes into the skill the commands that remove a measuring container; nothing runs them.
- Open design choice at start: none found by the orchestrator. The three questions of the task are answered.
  If your reading of the code shows one, return `returned` (section 2 of your method) instead of a plan.
- Reserved choice: none.
- Route: planned slices.

## Foundation and guidelines the orchestrator selected for you (read, whole)

- Part map: `foundations/part_map.md` (small; read whole).
- Decisions of the task's *Decisions in play*, each whole by identifier in `foundations/decisions.md`:
  D-84, D-77, D-252, D-137, D-207, D-213, D-96, D-281, D-156, D-224, D-160, D-13, D-17, D-113.
  Add the decisions whose *Scope* names a part a slice touches, and the invariants whose *Part* names it
  (`foundations/invariants.md`), as the method's "Reading the foundation" gives, for the slices you cut. Name every reach.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/testing.md`, and for the slices that touch the browser view
  `guidelines/styleguide-browser-view.md` (the file `src/browser/AGENTS.md` is also read for `src/browser/`).
  Kind files of `guidelines/coding.md` by *When to read*: `coding-saved-game.md`, `coding-simulation-module.md`,
  `coding-browser-module.md`, `coding-browser-api-client.md`, `coding-http-application.md`, `coding-database-access.md`,
  `coding-session-store.md` as the files each slice changes require. Name in the report what you find missing or uncertain.
- Glossary: `foundations/glossary.md` (read whole; short).

## Facts the plan must respect

1. Foundation entries are written only through the project skills named in `AGENTS.md` of the product:
   `the-way-record-decision` for decisions (the three rows of *Settlements to record*, and item 24, the wrapping of
   the line of D-254 in `foundations/decisions.md`), and `the-way-maintain-coding-guidelines` for the guidelines
   (item 32, the rule "Recording a failure" in `guidelines/coding.md`). A slice cannot write them by hand. List
   the three settlement rows and item 24 and item 32 under *Foundation entries*, as the method says
   (the plan names entries and never words them).
2. Items 22–31 and 24 (the skill line) edit text in **two copies** of the skill: `.claude/skills/` and `.agents/skills/`
   (the second may not exist in the form of a full copy; check the repository for the twin of `loop2-deploy` and `loop2-play`
   and record what you find, including how `tests/agent_workflow/` keeps the copies equal). The plan keeps both copies in one slice.
3. Item 29 and 30 change the same section of `.claude/skills/loop2-deploy/SKILL.md` that the task
   `zadanie_skad_wiem_o_awarii_loop2` (ready for a cycle, not yet merged) also changes; the plan does not depend on it, but
   the slice's *Read* tells the executor to read the section as it stands at the slice's base.
4. Item 4 (`OneExpressProcessServesGameAndApi`): the orchestrator ran it on the base. `npm test -- tests/invariants/test_loop2_one_serving_process.py`
   exits 0 with 5 tests OK (log `.runs/task-cycles/porzadki-z-uwag-pr/base-item4.log`), and the same class passed inside the full gate
   (`base-gate.log`, tests/invariants OK). The task's condition ("when its preparation fails") does not hold on the base, so the item
   needs no change: *Coverage* names this check as the evidence, and the item needs no slice unless you find a reason in the code that the task did not see.
   Base state: the full gate on the base failed only on two tests of `tests/quality` for a missing environment (`.runs/quality-venv`
   absent in the fresh worktree); after the environment was set up as README gives, that file passes and `foundation_check.py` passes.
5. Acceptance criterion of the task: each test added by items 11–19 is seen once failing on code with the defect it is to
   catch. Each such slice's *Checks* names how that run is shown (the defect put in the code temporarily, the run recorded in the
   report with command and exit code, the defect taken out again).
6. Items 5–10, 12–14, 16–18 are changes of behaviour or of tests in trust boundaries. Cut them so that a reviewer can judge one slice alone.
7. Items 5–10 change what the code writes to its failure log; the settlement rows 2 and 3 decide what is a failure.
   The rule "Recording a failure" and the decision D-252 bind.
8. Slices of the planner's own judgment: prefer cutting along parts (account-server; browser-view; simulation; build-tools;
   skill text and guidelines) and along files the slice's agent can hold alone. A slice that changes `foundations/decisions.md`
   or `guidelines/coding.md` is made by the foundation step and not by a slice.
9. The orchestrator will not read your plan again to learn what the task says; *Coverage* must map each of items 1–32 and each of
   the 3 settlement rows to slices or entries, with no item left to "later".

## What to return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved`), the plan's path, a one-line check result, the report's path.
The report holds, besides what the method asks: the twin-copies finding (item 2 above), any statement of the task that did not
survive your check against the code (line numbers, behaviours), and **Searches not found or unclear** — each thing you looked for and did not find
or that was unclear, or `none`.
