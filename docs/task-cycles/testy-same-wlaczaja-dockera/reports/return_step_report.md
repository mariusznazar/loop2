# Return step report (step 11)

**Status: done.** One correction, one commit: `20517ed8` — `foundations/part_map.md` (+1/-1). Branch `task/testy-same-wlaczaja-dockera`, tree clean. Method read whole: `.the-way/task-cycle/skill/return_step.md`, the part-map skill, `decide_entry.md`, `write.md`, and the part-map template (the foundation step file was read in the first round).

## The record's items

- **Foundation compared with code:** D-390, D-391, D-392, `gate-docker-start-waits-once` and `docker-desktop-start-detach` were compared with `scripts/docker_gate.py`, `scripts/test.py`, the eight converted tests and `tests/quality/test_docker_gate.py` at head `39f54705`. All match: the 180 s limit, the single wait per run through the state file, the skip messages (tried to start and what stays unchecked; no Docker Desktop at once), no stop or restart of Docker Desktop, no memory threshold. The environment fact still stands (D-390 *Based on* names it). The invariant is cited by `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once`. Nothing to correct in them.
- **Decisions:** none written or changed. The search of the log for `Docker`, `daemon`, "unchecked" and "skipped" found no other decision that answers the question of D-390–D-392 or says what these now contradict (D-77 and D-84, cited by the task, are consistent).
- **Invariants:** none written or changed. No other invariant says anything on tests skipped without a daemon; the invariants whose tests I converted (`loop2-container-icons`, `loop2-container-sprites`, `loop2-one-serving-process`, `account-schema-lifecycle`) are about the container, not about the skip, and their wording stays true.
- **Environment facts:** none written; `docker-desktop-start-detach` (from the foundation step) kept unchanged. No new source outside the product is relied on (the removed claim about the Docker Desktop status needs none).
- **Glossary terms:** none. "gate" is the-way's term (the one command that runs all of a product's tests) and D-390–D-392 use it so; `docker daemon` and `Docker Desktop` are used in the ordinary meaning of the field.
- **Part-map changes:** one. The sentence of `build-tools` (what it answers for) now says that the part "runs the test gate, which starts Docker Desktop for a test that needs a Docker daemon where none answers"; the gate's new behaviour is what that part answers for, and the template asks the sentence to follow such a change (WAY-11). *Files*, *Depends on* and *Trust boundary* of build-tools unchanged. Files of the change added: `scripts/docker_gate.py` (claimed by `scripts/**`), `tests/quality/docker_standin.py` and `tests/quality/test_docker_gate.py` (claimed by `tests/quality/**`), all build-tools; `foundation_check.py` reports no unclaimed file. `deployment` and `test-helpers`: unchanged (deployment's tests import build-tools, which its *Depends on* already allows; no file of test-helpers was touched).
- **Projected entries written:** none (the task has none).
- **Rows of *Settlements to record* written:** all four were written in the foundation step (row 1 = D-390, row 2 = D-391, row 3 = D-392, row 4 = `gate-docker-start-waits-once`); nothing missed by the step.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` after the part-map edit and after the commit → `0 errors`.
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` (reads the part map) → exit 0, 10 tests OK.
- Not run: full `npm test`; Docker Desktop was not started or stopped.

## Unread material

none (decisions and invariants named in the task and found by the searches were read in the earlier rounds; the search hits of this round were the entries listed above and the glossary entry `gate` of the-way).

## Searches not found or unclear

none
