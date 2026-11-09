# Handoff - the fix of a review's findings, part B (`make-change`)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
A finding you hold wrong, or that no change can remove, you answer with evidence in the report instead of fixing it; the reviewer of the fix judges your answer. You do not regrade or rescope a finding.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`. No other checkout of the product.
- Head you start from: `9400aee` (part A of the fix is done: D-353 rewritten, D-354 dropped from the *Decision* field of the rule "Recording a failure" in `guidelines/coding.md`, two comments in `src/server`). Your range runs from `9400aee`. Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Class of model: same as the orchestrator's.

## Your stage and its boundary

- You make: **the fix of a review's findings**. Read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/fix.md` whole. The findings file is
  `.runs/task-cycles/porzadki-z-uwag-pr/reports/findings-fix-b.md` (the reviewer's words, from `reports/whole-change-review.md`); read it whole. It holds Minor findings inside the task; none is blocking.
- Part A's findings (I-1 and m-1) are done: do not touch `foundations/decisions.md`, `guidelines/coding.md` or the comments part A changed.
- Each finding, one by one: change what removes it, with the smallest change; **no behaviour of the product code changes beyond what a finding asks**, and no assertion is weakened (`guidelines/testing.md`, "Changing an existing test"). Where a finding cannot be removed by any change (for example "holds by construction of the stand-in", "a file system that already lists in name order", "jsdom cannot show it", a departure the slice reviewer and the whole-change reviewer accepted), answer it in the report with the evidence, and change nothing for it. Where fixing would contradict a choice the plan settled (the plan is `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, section *Choices*, and the foundation entries D-352 to D-354 and D-253), say so in the answer with the evidence and change nothing for it.
- The skill files change in both copies, `.claude/skills/` and `.agents/skills/`, byte for byte alike (two tests in `tests/agent_workflow/` check it).
- Files you may write are those the findings name, and the test files of the fakes named in m-4. Foundation entries: none (a finding that would need one comes back as a question).
- Checks: run the focused checks of every file you changed, never the product's gate (`npm test` without arguments). A test you add or strengthen is seen failing once on code with the defect it is to catch (put the defect in temporarily, record the failing run and the passing run each as command and exit code, take the defect out). Lint with the pinned tools from the worktree's root: `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache <python file>`, `npx prettier --check <file>`, `npx eslint <file>`; `npm run typecheck` once at the end.
- Trust boundary (the cycle's answer at start: yes - `scripts/local-start.mjs`, `src/browser/sim/saved-game.ts`, `src/server/**`): a change you make there is small and its tests show it.
- Commit with explicit paths (never `git add -A`), one commit per group of findings is welcome; messages in English in the form of the repository's earlier commits. Never return an uncommitted change. A temporary defect is taken out again before you commit.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/fix-b-report.md`.

## What to return

Status (`done`, `done with concerns`, `questions`, `blocked`), the commits, a one-line check result naming what failed or did not run, the report path. The report holds what `make-change` section 6 and `fix.md` give, and: a table with one row per finding of the findings file (its label as the file gives it), saying `fixed` with the commit and the check, or `answered` with the evidence; the own-work check (the requirement you most likely fail, the check, what it showed); reaches beyond the handoff; choices with the way rejected and the cost if wrong; and **Searches not found or unclear** (each thing looked for and not found, or unclear, or `none`).
