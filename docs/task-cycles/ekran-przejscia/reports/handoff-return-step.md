# Handoff — the return step of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. Your stage is **the return step** (step
11 of the cycle; no variant row of `make-change` applies to it): you compare the foundation with the
code the change made and correct in the same change whatever no longer matches. You return before
any review, gate or request. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`, branch `task/ekran-przejscia`,
  head `1057f7d` (reviewed: the review of the whole change returned `PASS 1057f7d`). Commit on top
  of it; never push; never reset.
- Methods, read whole from the worktree's `.the-way`: `.the-way/task-cycle/change/SKILL.md` (reading,
  checks, commits, report), `.the-way/task-cycle/skill/return_step.md` (what this step compares and
  writes) and `.the-way/task-cycle/skill/foundation_step.md` (the step writes as the foundation step
  writes). Read the skill of an element when you write an entry of it — the project skills
  `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`,
  `the-way-record-environment-fact`, `the-way-update-part-map` — and select the foundation you read
  as its step 1 gives.
- Frozen task, read whole: `.runs/task-cycles/ekran-przejscia/task.md`. Plan:
  `.runs/task-cycles/ekran-przejscia/plan.md`.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-return-step.md`; if the harness refuses
  the write, return the whole report as text in your final message.

## What the change wrote and touched

- Range of the change: `d50158a..1057f7d` (the pin move `44317eb` holds only the gitlink).
- Entries written or changed by the foundation step and its fixes (`cd8ff84`, `9defb90`, `e35e91d`):
  D-130, D-19, D-311 (new), D-133, D-147, D-185, D-216, D-122, D-312 (new), D-313 (new), D-314 (new),
  D-315 (new), D-272, D-282, D-46 and the invariant `terrain-drawing-numbers`; D-281 confirmed
  unchanged. The writer's report: `.runs/task-cycles/ekran-przejscia/reports/report-foundation.md`
  (its *Questions and concerns* name „terrain panel” left in D-19, D-70, D-125, D-45, and
  „discovery line” in D-121, D-195).
- Entries the task names: its *Decisions in play*, every one, the current decisions it touches
  without change among them (D-62, D-132, D-188, D-186, D-201, D-215, D-125, D-70, D-21, D-129,
  D-131, D-123, D-43, D-44, D-265, D-276, D-279, D-264, D-269, D-273, D-87, D-88, D-254).
- Parts touched: `browser-view` (most files), `simulation` (`src/browser/sim/understanding.ts`,
  `tests/sim/discovery.test.mjs`), `build-tools` (`README.md`), `product-foundation`
  (`foundations/`), and the guidelines. Files added or removed under `src/browser/view/`:
  added `discovery-band.tsx`, `discovery-rule.ts`, `run-header.tsx`, `run-screen.tsx`,
  `terrain-drawing.tsx`, `tile-table.tsx`, `world-area.tsx`; removed `run-screen.ts`,
  `terrain-panel.ts`.
- The cycle's choices (record `.runs/task-cycles/ekran-przejscia/cycle.md`, *Questions and
  autonomous choices*, Q1–Q13): read them to judge which binds after the merge (WAY-36) and which
  stays a row of the table.
- The review of the whole change: `.runs/task-cycles/ekran-przejscia/reports/report-review-whole.md`.
  Its findings are not foundation entries; your own comparison of entries with the code decides.

## Answers of step 4 (binding)

- Trust boundary: yes for the cycle — `assets/sprites/**` (Slice 1's PNG, reviewed). Irreversible
  operation: no. Open design choice: none. Reserved choice: none.
- Orchestrator's answers: the saved game state keeps its shape and `SAVED_GAME_VERSION` stays 3;
  „Dodaj regułę z tym” greyed where the copy holds no rule group; the committed scene size is
  672 × 304 until the human picks — write no entry that fixes the scene's size; new rows of the
  coding guidelines take `copy`; a discovered action the character cannot use yet is written as
  D-313 says and shown greyed (D-289).

## Checks

Run `python -B .the-way/elements/common/foundation_check.py` after your commits. Do not run the
whole gate (`npm test` with no argument); it is the orchestrator's.

## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or
`blocked`), your commits (or none), a one-line check result, and the report's path (or that it is
in your message). The report fills the record's *Return step*: the entries compared with the code
and what no longer matched with its correction, or none; decisions, invariants, environment facts,
glossary terms and part-map changes written or changed, each with its identifier, one sentence of
meaning in English and one in Polish, and its mark (`row <n>`, `projected` or `the cycle's`);
projected entries and rows written; every check with its command and exit code; questions and
concerns; reaches; and **Searches not found or unclear**.
