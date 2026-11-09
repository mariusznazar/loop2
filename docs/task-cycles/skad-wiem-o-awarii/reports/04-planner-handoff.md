# Handoff 04 — planner

You are the planner for the task cycle `skad-wiem-o-awarii` (where the owner learns that the running game of loop2 failed, and how long its logs live).

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator; you never ask the human.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`, base `00aa818e59ab484358970f98af1f4ab61e969e4c`, pin `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`). You write code, tests and foundation entries nowhere; change no tracked file.
- Method of your stage: `.the-way/task-cycle/plan/SKILL.md` (project skill `the-way-plan-task`), read whole; `too_large.md` and `slice_size.py` only when a step of the method names them. This is the first plan of this task (no discarded attempt).
- Write the plan to `.runs/task-cycles/skad-wiem-o-awarii/plan.md`, the size report to `.runs/task-cycles/skad-wiem-o-awarii/plan-size.md`, and your full report to `.runs/task-cycles/skad-wiem-o-awarii/reports/04-planner-report.md`.

## Inputs

- Frozen task, whole: `.runs/task-cycles/skad-wiem-o-awarii/task.md`. Its eight rows of *Settlements to record* are written as foundation entries before slice 1 (the plan's *Foundation entries*, by the agent the cycle dispatches for them); the spec's *Foundation entries* section says where each takes its content.
- Reviewed spec, whole: `.runs/task-cycles/skad-wiem-o-awarii/spec.md` (reviewed PASS after one revision; its section *Settlements after the spec's review* holds two settlements S1 and S2 that bind). Reviews: `reports/02-spec-review.md`, `reports/03-spec-review-revision.md`.
- Execution route: planning, chosen by the orchestrator because the change spans five parts and five loosely coupled units the spec names (A dump, driver and logrotate; B browser report; C watcher; D scheduled check; E skill) and foundation entries for eight rows.
- Answers of step 4: trust boundary **yes** (`src/server/**`, `deploy/**`); mark every slice whose files the part map names as a boundary, and give the review aimed at that risk. Irreversible operation: **no**, nothing is performed by the cycle; the installations on the server and the GitHub setting are human actions the cycle only prepares (the request opens as a blocked draft). Say in the plan which slice leaves what for the human.
- Foundation entries by identifier, whole, for the plan's *Read* of the slices that touch the parts: decisions D-252, D-253, D-347, D-233, D-104, D-102, D-12, D-13, D-16, D-17, D-09, D-15, D-137, D-110, D-235, D-105, D-323; invariants `loop2-host-sharing`, `account-mutation-request-guards`, `account-request-transport`, `account-client-requests`, `loop2-api-error-route`, `account-save-backup-failure-notice`, `loop2-deploy-keeps-running`, `loop2-deploy-trigger-input`; environment facts `mikrus-pusher-mail`, `mikrus-host-docker-workloads`, `cron-d-file-rules`. Part map: `foundations/part_map.md`.
- Guideline files, each whole, to name in the *Read* of the slices they serve: `guidelines/coding.md`, `guidelines/coding-http-application.md`, `guidelines/coding-browser-api-client.md`, `guidelines/testing.md`; for `browser-view` files also `guidelines/styleguide-browser-view.md` and `src/browser/AGENTS.md` (the change adds no style; the last-resort handler is code). Name what is missing or uncertain in the guidelines in your report.
- Skill the change updates: `.claude/skills/loop2-deploy/SKILL.md` with its `references/`; the skill exists as two copies (`.claude/skills/` and `.agents/skills/`) with four files each, kept byte-identical by a test.
- Code and tests, to name each slice's files and what each executor reads: as the spec names them.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.

## Notes for the plan

- Every slice leaves the gate green on its own: new files must be in `NOT_ROUTES` and `BASH_SCRIPTS` where the spec says, and a slice that edits one skill copy edits the other, because a test compares them.
- Each slice's *Checks* name focused checks (`npm test -- <one file>`); none runs the whole gate (the orchestrator runs it).
- Environment of the maker: Windows; the quality tools live in `.runs/quality-venv` already; `npm ci` is done.
- Say which of the spec's checks have no automated proof (docker, logrotate, pusher, cron, GitHub) and are left to the human, so the request can list them as unchecked.

## Return

Status (`questions`, `done`, `done with concerns`, `returned` or `reserved`), the plan path, the size report path, your report path, the model class you set for each slice with its reason, and **Searches not found or unclear** in the report, as your method gives.
