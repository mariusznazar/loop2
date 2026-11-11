# Handoff — a correction for the human's remarks

You make a correction of the open request, as the one author, with `make-change` in the variant
**"a correction for the human's remarks"**. Read `.the-way/task-cycle/change/SKILL.md` in the worktree whole first.
The person who requested this cycle has delegated intermediate choices to the orchestrator; nothing
here is that person's approval beyond what the remarks below quote.

- Worktree (work only here, from its root): the task's worktree, branch `task/lokalizacje-poza-repozytorium`.
- The commit the correction starts from: `8c7fe66` (the orchestrator's pin move, below). Your range runs from it.
- Your report: `.runs/task-cycles/lokalizacje-poza-repozytorium/reports/correction-report.md`.
- Class of model: `same` as the orchestrator's.

## The human's remarks (they bind)

The request was blocked by one finding: the new test of tracked files stood red on 12 lines that the
check of the pinned the-way wrongly took for note links. The human chose to wait for the-way to fix
its check, then move the pin of `.the-way` here. In the human's words (2026-11-11): "no to a, ale
będziemy potrzebowali jak rozumiem opisać zadanie dla the way" and, after the-way merged the fix
(its PR #101, commit `52f8164`): "domergowane do the way, musiałbyś chyba zmienić podpiętą do loop2
wersję". So the remarks are: **make the fix the blocking finding called for — the pin now holds the
fixed check — and take off the marking of the temporary state.**

## Done by the orchestrator before you

- The pin of `.the-way` is at `52f8164a354ee1a704af0d58add2f3be8e4f0247` (commit `8c7fe66`, the gitlink alone; the installer changed nothing else).
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` now exits 0, 0 listed.
- `python -B .the-way/elements/common/foundation_check.py` now exits 1 with one error that the earlier pin did not give: `foundations/invariants.md:1244: *Rests on* reads TODO and names no fact: write TODO — <the fact, with its source>` (the invariant `cross-part-imports`, whose *Rests on* is a bare `TODO` since 2026-11-08, commit `842beb7`).

## What you do

1. Take off the expected-failure marking and the comment above it from `tests/agent_workflow/test_tracked_file_private_paths.py`; keep the time limit of 30 seconds. The test must pass as a plain test.
2. Set `Violated: no` on the invariant `tracked-file-private-paths`, written through the project skill `the-way-record-invariant` (read what it requires when an invariant stops being violated), and check that the entry reads right against the new pin. Do not change its sentence unless the skill requires it.
3. The new error of `foundation_check.py` is work this task carries, since the pin move brought it (step 2 of `task-cycle/skill/SKILL.md`). The fact the invariant `cross-part-imports` rests on is not named anywhere in the foundation, and **you must not invent it**. The orchestrator's choice, to be entered in your report as the choice it is: write `TODO — the fact is not named in the foundation; the invariant has carried a bare TODO since 2026-11-08 (commit 842beb7), and the human is to name the fact and its source`, or the shortest wording of that sense the form of the field allows, through `the-way-record-invariant`. If the check still reports an error with that, report the error and what the check wants; do not guess a fact.
4. Look at whether the new pin changes anything else in this repository's own checks or foundation: run `python -B .the-way/elements/common/foundation_check.py` until it reports 0 errors; `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` (expect exit 0, plain pass); `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` (expect exit 0). If `foundation_check.py` or another focused check shows another difference the pin brought, name it in the report with its output; fix what is plainly yours (a form of an entry), and return the rest as a concern.
5. Commit by path, English, the style of `git log`; no `git add -A`. Do not run `npm test`; the orchestrator runs the gate.

## What to read

The frozen task, `.runs/task-cycles/lokalizacje-poza-repozytorium/task.frozen.md`; your earlier reports in `reports/`; the entry `tracked-file-private-paths` and `cross-part-imports` in `foundations/invariants.md`, each whole; `.the-way/elements/invariants/template.md` (section "Violated", the rule on `TODO`) and `.the-way/elements/common/rules.md` on `none` and `TODO`; D-362 for the link of the invariant.

## What you return

Per `make-change`: the report at the path above, with its status, commits, checks with command and
exit code, **Unread material**, **Searches not found or unclear**, concerns and the own-work check;
and in your return message the status, the commits, a one-line check result and the report's path.
