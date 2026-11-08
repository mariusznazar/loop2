# Handoff 16 — the return step (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh agent of the cycle that made none of the change. Send every question to the orchestrator by returning `questions` (or `blocked` for a question the foundation step leaves to the human); never ask the human.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`, head `52367a97ee32519e9c97a2649be9530f3e50a73c` (the reviewed change, its fix included). Task base `381588fbd31838b9c0075707a6588213cf6e5eaa`.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. Your stage is **the return step** — none of its table's rows; for it read `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md`, each whole, since the return step writes as the foundation step writes; read the skill of an element when you write an entry of that element (project skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map` in `.claude/skills/`).
- Class of model: `same` (Opus), no class cheaper than the orchestrator.
- Boundary: compare and correct the foundation only (`foundations/**`); no code, test or guideline file. Commit what you write by path (`docs: :memo: …`, English). Run `python -B .the-way/elements/common/foundation_check.py` as your focused check. Do not run the product's whole gate.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/16-return-report.md`. It holds, in the order of the record's *Return step*: foundation compared with code (what no longer matched and its correction, or none); decisions written or changed; invariants written or changed; environment facts; glossary terms; part-map changes; projected entries written whole or in part; rows of *Settlements to record* written; plus each check with its command and exit code, your own-work check and **Searches not found or unclear**. Return your status, commits (or none), a one-line check result and the report path.

## What to compare

- Frozen task `.runs/task-cycles/teraz-i-potem/task.md` — read it whole (*To do*, *Decisions in play*, *Settlements to record* rows 1–8).
- Plan `.runs/task-cycles/teraz-i-potem/plan.md`, section *Foundation entries*, and the report of the agent that wrote them: `.runs/task-cycles/teraz-i-potem/reports/02-foundation-report.md` (commit `bd44c39`).
- The entries the change writes or changes: D-334, D-335, D-336, D-337, D-133, D-311, D-147, D-122, D-132, D-39, D-40, D-62, D-135, D-178, D-57, D-46, D-324, D-280, D-291, D-216 (its *Rejected*, changed by the fix `52367a9`), and the invariant `rule-state-from-pick`; each whole, compared with the code at the head.
- The part map's parts `browser-view` and `simulation`: the change adds `src/browser/view/now-lines.ts`, `src/browser/view/now-rows.tsx`, `tests/view/now-lines.test.mjs` (globs `src/browser/view/**`, `tests/view/**` may already claim them — check).
- The code of the change: `git diff 381588f..52367a9`; new simulation functions `minutesUntilChilled`, `minutesUntilStarving`, `needNotes` (`src/browser/sim/body.ts`), `nowAndNext` (`src/browser/sim/game.ts`), `solvingRequirements` (`src/browser/sim/run.ts`); view `clockText` (`src/browser/view/status-row.ts`), `now-lines.ts`, `now-rows.tsx`, `run-header.tsx`, `body-row.ts`, `world-area.tsx`, `program-panel.tsx`, `run-screen.tsx`.
- Choices the cycle made that may bind after the merge (decide for each whether WAY-36 calls for an entry, or it stays a row of the questions table): the rows that name a rule are focusable elements built as the rule rows of `rule-list.tsx` (not the shared button); the program panel scrolls only while it shows the copy; „Teraz” has no label word; the bar's track length 8em; the note's size `--font-size-detail`; the data field `status` of `src/browser/sim/data/actions.ts` left unread after the change. The review left one Minor finding open for the human (the rows look clickable while a saved program is shown; `reports/15-fix-review-report.md`) — a review finding is no foundation entry.
- The glossary terms the change uses („Teraz”, „Potem”, game minute, solving condition, streak, completion) against `foundations/glossary.md` and the-way's glossary at the pin.
