# Handoff - slice 10 of the task cycle `serwer-odczyty-i-straznik`

You make one slice of a planned change. The person who requested this cycle delegated intermediate
choices to the orchestrator; nothing you receive is that person's approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. The slice's base is `9289c29fd9ce9d227bf13f17afdee4ef267c53e4`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), English commit messages in the style of `git log` of the repository. Do not push. Do NOT run the product's whole gate (`npm test`); the machine is short of memory and the gate is the orchestrator's. Run only the focused checks of the slice, one at a time.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your variant is "a slice, or the retry of a slice"; read that `SKILL.md` whole, and a file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish). Read the passages the slice's *Read* names. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - the slice's section is copied below word for word; read nothing else of the plan.
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher `deploy/loop2-watch`); no operation that cannot be undone. A slice's *Risk* is in its section.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-10-report.md`. Return its status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check result naming what failed or did not run, the report path, **Unread material** and **Searches not found or unclear**; the report has each check with its command and exit code, the own-work check your method asks for, and anything you reached beyond this handoff (name it).
- Foundation entries the earlier steps wrote: the four rows of *Settlements to record* are already written as edits of D-233, D-234 and D-356 (commit `9630fb90`); the decision ranges below are the current ones in this worktree and hold where they differ from the plan's *Read*.

## Current ranges of decisions named in the slice's *Read*

- D-08: `foundations/decisions.md:253-272`
- D-10: `foundations/decisions.md:295-310`

## The slice (copied word for word from `plan.md`)

### Slice 10 — The invariants about the application port, the container and the address say only what their tests check

- **Goal:** `loop2-application-port`, `loop2-container-isolation` and `loop2-distinct-address` are
  re-worded, through the project skill `the-way-record-invariant`, to say only what their test checks in
  the files of the repository (the Compose file and the Dockerfile publish no application port, bypass no
  private network and share nothing with the old instance; the deployment workflow declares one public address
  that is not the old game's); the part that spoke of the server leaves each sentence, to stand as the facts
  that already carry it (the published ports of slice 6; that the old game runs as another container) — the
  return step makes D-08 and D-10 name them. The three tests keep their cases and their behaviour: only the
  words of their module docstrings that quote the old sentences or name the acceptance that "also requests
  the old port" change, to the new sentences and to a pointer to the fact; nothing in the assertions
  changes and the `# invariant:` lines keep the identifiers. Search the repository for another use of the
  old wording and repoint it. Where no fact carries a removed part, say so in the report (the return step
  then keeps it in the decision's rationale as the human's check). The report ends with "For the return
  step" as in slice 5.
- **Change:** `foundations/invariants.md` · `tests/invariants/test_loop2_application_port.py` · `tests/invariants/test_loop2_container_isolation.py` · `tests/invariants/test_loop2_distinct_address.py`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `compose.yaml` · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:29-29` To do, item 1 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:122-122` Human actions, the Cloudflare panel · `foundations/decisions.md:253-271` D-08 · `foundations/decisions.md:295-308` D-10 · `foundations/environment_facts.md:59-63` mikrus-host-docker-workloads · `foundations/environment_facts.md:312-316` mikrus-tunnel-outbound-tcp
- **Model:** same — turning an invariant into what its test checks takes judgment about what stays and what leaves
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/invariants/test_loop2_application_port.py` · `python -B scripts/test.py tests/invariants/test_loop2_container_isolation.py` · `python -B scripts/test.py tests/invariants/test_loop2_distinct_address.py` · `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 6 · Slice 9


## Notes from the orchestrator

- The facts that now carry the server parts (written by earlier slices, `foundations/environment_facts.md`): `loop2-containers-published-ports` (the two loop2 containers publish no host port), `loop2-host-installed-copies-agree`, `mikrus-host-docker-workloads` (existing; read again by slice 7), `mikrus-tunnel-outbound-tcp`. Cite those that carry a removed part, by identifier, in the report's "For the return step"; the return step makes the decisions name them. An invariant that rests on a fact names it in *Rests on* only where the template of invariants says a fact holds a condition of its sentence; the skill `the-way-record-invariant` decides.
- This slice does not withdraw any invariant; it narrows three. The invariant tests keep their cases, assertions and `# invariant:` lines.
- Decisions D-08 and D-10 are not edited here (the return step does).

## Note from the orchestrator on running tests on this machine

The machine is short of memory and the Git Bash child processes the tests start are slow. In the previous slice the named runner `python -B scripts/test.py <file>` did not finish in 17 minutes, and the same module run by `python -B -m unittest -v <module>` from the test file's directory (per class where a module is slow) did. Try the named runner first only with a bounded wait of about 10 minutes in the background; if it does not finish, run the substitute and report both commands and what each did, with exit codes. Run one check at a time. Never run `npm test`.
