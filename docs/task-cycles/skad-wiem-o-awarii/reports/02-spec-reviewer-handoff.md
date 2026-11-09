# Handoff 02 — reviewer of the spec

You review the spec of the task cycle `skad-wiem-o-awarii` as an agent that did not write it. The designer's own report is not an input for you except where this handoff names it.

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`, base `00aa818e59ab484358970f98af1f4ab61e969e4c`, pin `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`). You are read-only: change no tracked file; write only your report.
- Method: `.the-way/task-cycle/spec/SKILL.md` (project skill `the-way-write-spec`). Your variant: the reviewer of the spec. Read that `SKILL.md` whole, and `review.md` beside it when its step comes; no other file of the method at the start.
- Full report to `.runs/task-cycles/skad-wiem-o-awarii/reports/02-spec-review.md`; its first line is `PASS` or `FAIL` (as your method gives), or the status `questions`.

## Inputs

- Spec under review: `.runs/task-cycles/skad-wiem-o-awarii/spec.md`.
- Frozen task, whole: `.runs/task-cycles/skad-wiem-o-awarii/task.md`.
- Foundation entries by identifier, each whole: decisions D-252, D-253, D-347, D-233, D-104, D-102, D-12, D-13, D-17, D-09, D-15, D-137, D-110, D-235; invariants `loop2-host-sharing`, `account-mutation-request-guards`, `account-client-requests`, `loop2-api-error-route`, `account-save-backup-failure-notice`, `loop2-deploy-keeps-running`, `loop2-deploy-trigger-input`; environment facts `mikrus-pusher-mail`, `mikrus-host-docker-workloads`; the part map.
- Guideline files whole: `guidelines/coding.md`, `guidelines/coding-http-application.md`, `guidelines/coding-browser-api-client.md`, `guidelines/testing.md`.
- Technology reports the task cites, outside the repository (sources for the safeguards of the task's *Risks taken*; the task document governs where they disagree): `the technology report `skad-wlasciciel-dowiaduje-sie-ze-gra-padla` (kept outside the repository)` and `the technology report `dokad-trafia-zapis-gry-i-jak-dlugo-zyje` (kept outside the repository)`, sections „Rekomendacja i ryzyka”.
- The code the spec depends on, as far as you need to check its claims against it.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, and session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.

## Answers of step 4 the review checks

- Trust boundary: yes (`src/server/**`, `deploy/**`). Check that the spec names, for each new input path (report route, watcher's reading of container logs, the dumped file), the crafted input refused and where.
- Irreversible operation: none performed by the cycle; the installations on the server and the GitHub notification setting are human actions the cycle only prepares. Check that the spec makes each of them doable and checkable by the human from what the repository holds.
- Open design choice: the contract of the browser-report route; the watcher's design; the dump into `/var/log/loop2-app.log` and the `account-block` lines; the shape of the scheduled workflow against the test that counts files in `.github/workflows/`; the additions to the `loop2-deploy` skill.
- Settled by the task and not reopened: the three ways of notification, the dump rotated by logrotate, the driver `local`, D-347 changed as the task's row 3 says.

## Specific points to weigh (the orchestrator's, not findings)

- The designer reports that it did **not** take the safeguard "the watcher counts new failure lines in the dump" and kept that gap as accepted. Judge whether that fits the task's text (To do item 5 says the watcher checks "nowe wiersze awarii") or leaves a requirement of the task unmet.
- The designer reports it will not edit `guidelines/testing.md`. Judge whether the task's scope or a rule of the guidelines requires an entry there.
- Numbers the designer set without a source (30 reports an hour, throttle windows, retry counts, rotation sizes): judge whether any needs a source or an explicit mark as the maker's to report.
- Each requirement of the task's *To do* 1–8 and each of the 8 rows of *Settlements to record* must be coverable from the spec; say which is not.

## Return

`PASS` or `FAIL` first line, graded findings, the checks you ran with command and exit code (the spec's review runs no product check), and **Searches not found or unclear**, as your method gives.
