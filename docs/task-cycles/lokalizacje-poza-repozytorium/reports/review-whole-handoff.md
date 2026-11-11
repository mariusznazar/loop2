# Handoff — review of the whole change

You review the whole change of one the-way task as an agent that did not make it. The person who
requested this cycle has delegated intermediate choices to the orchestrator; nothing here is that
person's approval. Ask no human anything: questions go to the orchestrator in your return.

## What is reviewed

- Worktree (read-only for you; work from its root): `the task's worktree`
- Range: base `211a4ea556d48f5da98fc08380b3c061b9365709` (main) to head `a4b91978ede3f6393661e4674dba6e35bad92526` (branch `task/lokalizacje-poza-repozytorium`); four commits `a71321b`, `e11b8da`, `f6d19ce`, `a4b9197`.
- Your method: `.the-way/task-cycle/review/SKILL.md` in the worktree, variant **the whole change**; read it whole, then `whole_change.md` beside it as it directs, and a file it names only when the step that names it comes.
- Frozen task (read whole): `.runs/task-cycles/lokalizacje-poza-repozytorium/task.frozen.md`. No spec and no plan exist: the route is one author without a plan; the whole change is one range, with no slice and no earlier review.
- The author's report: `.runs/task-cycles/lokalizacje-poza-repozytorium/reports/author-report.md` (status `done with concerns`).
- Your report: `.runs/task-cycles/lokalizacje-poza-repozytorium/reports/review-whole-report.md`; its first line `PASS <sha>`, `FAIL <sha>` or `questions`.
- You select your own foundation entries and guidelines by the parts of the change (`agent-workflow`, `product-foundation`, and the part of each file the change touches, from `foundations/part_map.md`), as your method gives.

## Answers of the cycle's start

- Trust boundary: no. Irreversible operation: no. Open design choice: none. Reserved choice: none.
- The pin of `.the-way` (`e3825a82386a61930a86f8517fc0c5f422fc2833`) was not moved by this task; it already holds WAY-320, `project-level/backlog_place.md` and `task-cycle/tracked_private_paths_check.py`.
- The task is a **public-repository clean-up**: all nine absolute paths of the author's disk go from tracked files, the backlog lines point to entries of `~/.the-way/locations.json` and never to a path, and the repository gets a test of tracked files that comes from the-way with no exception of its own. Never put the values of the locations file into your report; you need not open it.
- Checks already failing on the base: `tests/quality/test_quality_invariants.py` — `test_ruff_source_rules` and `test_shellcheck_source_rules` (tools not installed on this computer).

## What the orchestrator knows that bears on your judgment (a hypothesis to check, not a finding)

The author reports that item 7 of the task ("after items 1–6 the new test passes") does not hold:
the pinned command still lists 12 hits, the class `[:space:]` between double brackets read as a note link in
`.claude/skills/loop2-deploy/references/backup_and_restore.md`, its `.agents/skills/` copy and
`foundations/environment_facts.md`. The orchestrator re-ran the command and saw the same 12 hits.
By `git log -S`, those lines entered `main` on 2026-11-11 (commits `76120d8`, `08f7a06`), after the
trial of 2026-11-09 on which the task rests. They mirror a block of the deployed script
`deploy/loop2-deploy`, and the fact quotes it word for word. The task's answer to its question 3
forbids exceptions of loop2's own for false hits and its question 4 forbids moving the pin. The
orchestrator's choice: leave the 12 hits, add no exception, end the cycle as a blocked draft request
that puts the choice to the human. Judge the change and that state on the evidence; grade as your
method gives. Check in particular whether the nine paths are gone, whether the sense of D-82 and of
`action-duration-minimum` is unchanged, whether the new decision and invariant meet the foundation's
form and the task's two settlements, whether the test follows the installation README's pattern and
the testing guidelines, and whether anything in the change still gives a path or a note link that
the command does not list.

## Reports of agents whose work is in the range

The one author's report above stands for all four commits; it also states the two entries of its
**Unread material**: decisions of both parts other than D-82, D-13 and D-362 not read; the first 80
lines of `.the-way/task-cycle/private_paths_check.py`; the task note in the vault not opened.

## What you return

Per `review-change`: the report at the path above, its first line, graded findings with the places,
the checks you ran with command and exit code, **Unread material**, **Searches not found or unclear**;
and in your return message the first line of the report, the changed files with their line counts and
the report's path. You do not run the product's gate (`npm test`); the orchestrator does.
