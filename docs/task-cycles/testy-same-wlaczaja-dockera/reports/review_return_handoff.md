# Handoff — review of the return step's commits, `review-change`

The cycle's return step committed; you review that range (section 2 of `.the-way/task-cycle/review/SKILL.md`,
read whole; this is no review of the whole change, so you do not read `whole_change.md`). You did not make it.
Read-only; run no full `npm test`; do not stop or start Docker Desktop.

- Worktree `the repository's root`. Range: `39f547056910286d547f6166298345b4dab5310a..20517ed8`
  (one commit `20517ed8`; confirm `git rev-parse HEAD` is `20517ed8…`; compute the diff yourself).
- Review it against the task and the entries the return step writes or corrects, as the method gives. Frozen task:
  `.runs/task-cycles/testy-same-wlaczaja-dockera/task.md`, passages to hold: *Settlements to record* (rows 1–4) and *Out of scope*.
- The return step's report (claims to verify): `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/return_step_report.md`.
  It changed one sentence of the `build-tools` entry in `foundations/part_map.md` and left D-390, D-391, D-392, the invariant
  `gate-docker-start-waits-once` and the environment fact `docker-desktop-start-detach` as written.
- Foundation entries by identifier, each whole: D-390, D-391, D-392 in `foundations/decisions.md`; the invariant
  `gate-docker-start-waits-once` in `foundations/invariants.md`; the environment fact `docker-desktop-start-detach` in
  `foundations/environment_facts.md`; the entries `build-tools`, `deployment` and `test-helpers` of `foundations/part_map.md`.
  The code those entries speak of: `scripts/docker_gate.py`, `scripts/test.py`.
- Judge: does the part-map sentence say what the code does, in the form the part-map element gives its *responsibility*
  line; does it leave any entry mismatched with the code that the return step should have corrected; is anything written
  that the return step may not write. Only Critical and Important findings block.
- Report: `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/review_return_report.md`, first line `PASS <sha>` or
  `FAIL <sha>`, with **Unread material**, **Searches not found or unclear** and the checks with command and exit code
  (`python -B .the-way/elements/common/foundation_check.py` is allowed).
