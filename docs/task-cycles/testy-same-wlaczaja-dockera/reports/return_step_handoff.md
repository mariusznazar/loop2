# Handoff — the return step (step 11), the one author resumed

Stage: the return step, which takes none of `make-change`'s variants; method files: read whole
`.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md` in the worktree,
and the skill of an element (`the-way-record-decision`, `the-way-record-invariant`,
`the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map`) whenever you write an
entry of that element.

- Worktree `the repository's root`, branch `task/testy-same-wlaczaja-dockera`,
  head `39f547056910286d547f6166298345b4dab5310a` (after the whole-change review `PASS fe779640…` and the fix, reviewed `PASS 39f54705…`).
- Frozen task: `.runs/task-cycles/testy-same-wlaczaja-dockera/task.md`.
- Compare with the code, as the return step gives: the entries your change wrote (D-390, D-391, D-392,
  `gate-docker-start-waits-once`, and the environment fact `docker-desktop-start-detach` if it still stands), the part map of the
  touched parts (build-tools, deployment, test-helpers: does any file the change added —
  `scripts/docker_gate.py`, `tests/quality/docker_standin.py`, `tests/quality/test_docker_gate.py` — belong to a part and is
  it claimed; `foundation_check.py` must report the files as claimed), the glossary terms the change uses
  (e.g. "daemon", "gate"), and the entries a search of the foundation finds for Docker and the gate's run. Correct in
  the same change whatever no longer matches. Write nothing the task does not carry except a choice that binds after the
  merge (WAY-36) or a source outside the product the foundation lacks.
- Write nothing for the guidelines (done in the fix).
- Do not run the full `npm test`; do not stop or start Docker Desktop. Run `foundation_check.py` after
  any foundation edit. Commit by path, English messages. If nothing needs correcting, commit nothing.
- Report: `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/return_step_report.md`: for each of the
  record's items — foundation compared with code, decisions, invariants, environment facts, glossary
  terms, part-map changes, projected entries written, rows of *Settlements to record* written — what
  you found and did, or `none`; plus **Unread material** and **Searches not found or unclear** (`none`
  where none), and each check with command and exit code. Return status, commits (or `none`), one-line
  check result.
