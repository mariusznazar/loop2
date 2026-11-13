# Handoff — review of the whole change, `review-change`

## Delegation and place

- The person who requested this cycle delegated every intermediate choice to the orchestrator; you
  get no human contact. A question goes to the orchestrator in your report (first line `questions`).
- You did not make the change. Read-only: you change no file and make no commit.
- Worktree: `the repository's root`, work from its root. Branch
  `task/testy-same-wlaczaja-dockera`. `.the-way` there is at `55afa8e57aa1b83c77108576a36642722e0dda15`.
- Method: `review-change` — read whole `.the-way/task-cycle/review/SKILL.md`, and `whole_change.md`
  beside it (this is the review of the whole change), and a further file it names only when the step
  that names it comes. You select your own foundation and guidelines as that method gives.

## What to review

- The whole change: range `1b0c8ad4466fdd6d067da7bbc27b10458d81012b..fe779640` (confirm
  `git rev-parse HEAD` is `fe779640…`; compute the diff yourself). Three commits: `7fc5d456`, `4328f44b`,
  `fe779640`.
- Frozen task: `.runs/task-cycles/testy-same-wlaczaja-dockera/task.md` — read it whole; judge every
  item of its *To do*, its *Acceptance criteria*, and each row of its *Settlements to record*
  (rows 1–4 are to be written as foundation entries) against the change, and its source fidelity.
- The author's report (claims to verify, not evidence):
  `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/author_report.md`.
- No spec, no plan: one author, no slices.
- Trust boundary touched: no. Irreversible operation: no. Where the task's *To do* 6 (the real
  check that the gate starts a stopped Docker Desktop) is concerned, it is the orchestrator's after
  your review; it is not for you to run, and you must not stop, start or restart Docker Desktop.
- Base checks: on the base `1b0c8ad4` the full `npm test` failed only in `tests/quality` for two
  tests (`test_ruff_source_rules`, `test_shellcheck_source_rules`) because the fresh worktree had no
  `.runs/quality-venv`; with it, those pass. `foundation_check.py` on the base: 0 errors.

## Carry-over from the author's report (gaps to judge)

The author's **Unread material** says: of the invariants, the other `every`-part entries (about 25)
were not read whole; of the decisions, D-74..D-76, D-79, D-82, D-163, D-273 and the decisions whose
*Scope* names build-tools or deployment that the author did not find by title were not read; the
glossary of the pinned the-way was not read. Your own selection covers these: select by the method
and say in your report how many decisions you read whole and how many by title only.

Open points the author raised, for you to judge as findings with your own grades:
- `guidelines/testing.md` is untouched; a new test needing Docker is steered only by D-390's
  *Verification* (concern 2 of the author's report).
- The author wrote one entry the task did not carry: the environment fact
  `docker-desktop-start-detach`, its source a Docker documentation page with an archived copy.
- `scripts/docker_gate.py` stands in `scripts/` (part build-tools) and is imported by tests of
  deployment; judge it against the part map and D-351 and the decisions you select.
- The real `docker desktop start --detach` and the 180 s default were not exercised; the
  orchestrator makes the real check afterwards. Judge only whether the code could not work and
  whether what the stand-in does not prove is named as unproven.

You run focused checks you need (each with its command and exit code in the report); you do not run
the full `npm test`, which is the orchestrator's (WAY-160). The Docker tests build images and can
take up to 20 minutes each; avoid running them against the computer's real Docker.

## Report

Write it to
`.runs/task-cycles/testy-same-wlaczaja-dockera/reports/review_whole_report.md`.
Its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`); it carries the sections the method
asks for, with **Unread material** and **Searches not found or unclear** (`none` where none), and
each check with its command and exit code. Return: the first line, the changed files with line
counts, the report path, your questions and concerns.
