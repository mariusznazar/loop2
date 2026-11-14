# Return step report — krotsza-bramka-procesu

**Status:** done
**Commits:** none. The return step found nothing that no longer matches, so the tree stays at `32629e02`.

## The foundation compared with the code as it stands

| Entry or file | Compared with | Result |
|---|---|---|
| D-405 (stage order, ends at the first failing stage; Node tests not beside the Python directories) | `scripts/test.py` (build, `node --test`, `run_tests.py --jobs 1`, foundation check, in a loop that returns the first non-zero code) | matches; no test holds the order, so its pair of examples stays whole |
| D-406 (`--jobs 1`; withdrawn only with the repair) | `scripts/test.py:53-54`, `tests/quality/test_test_gate.py` (`decision:` line, argument pinned through the stand-in), `tests/quality/gate_fixture.py`, `tests/quality/test_docker_gate.py` (12 tests, run by the author) | matches; its *Verification* already names the test by the clause `tests:` and keeps a pair only for the part no test holds (the withdrawal), as the step asks |
| D-77, D-83, D-49, D-73, D-28 (the task's *Decisions in play*) | the same code | no change needed: D-77 and D-83 do not say how the directories run; D-49 and D-73 do not touch the runner; D-28 is the size-rule matter given to a later task |
| D-390, D-391, D-392 and invariant `gate-docker-start-waits-once` | `scripts/docker_gate.py` (docstring: "the processes the run starts, one for each directory of Python tests, inherit the variable"; `daemon_gap`, `record_gap`) | still true: with `--jobs 1` the run waits once; the invariant says "in one run of the gate" and its test is the `GateRuns` case; no change |
| Part map `build-tools`, `agent-workflow`, `product-foundation` | the touched files (`scripts/**`, `tests/quality/**`, `README.md` is not claimed by a part, `foundations/**`) | all touched files lie in the files of those parts; no part's responsibility changed |
| `guidelines/testing.md` ("Test files in the gate", `Where in code`) | the new runner call | says only that the runner finds the directories and runs unittest discovery in them: true with either value of `--jobs`; `scripts/test.py` and `.the-way/gate/run_tests.py` already stand in its file list; no change |
| `guidelines/coding.md` | — | the rule of size is not written, as the task's question 5 gives it to a later task |

## Search for the likes of `README.md:76`

`git grep -n -i "run_tests\|in parallel\|concurrent\|at the same time\|each directory\|every directory\|jednocze\|równoleg\|jeden po drugim\|--jobs"` over the tree outside `.the-way`, `foundations/decisions.md`, `src` and `assets`, and the same terms over the five foundation files and `guidelines/`. Everything it found says nothing about whether the runner's directories run at the same time, except `README.md:76` (fixed by `32629e02`). The comments and docstrings that say "each directory in a process of its own" (`scripts/docker_gate.py:12`, `tests/quality/gate_fixture.py:49`, `tests/quality/test_docker_gate.py:150`) stay true. `AGENTS.md`, `.claude/skills` and `deploy/` hold no mention.

## Entries the return step writes

- Decisions: none new. D-405 carries row 1 of *Settlements to record*; D-406 is `the cycle's`. No choice that binds after the merge is left without an entry: the move of the pin to `ec7929d` is a single value in the gitlink (question 3 of the decisions template's "Where it goes": product data), so no entry.
- Invariants: none; no rule the task, a decision or the human sets lacks one that this change adds (the rule of D-406 is held by a test with a `decision:` line).
- Environment facts: none written. The earlier gate time is a note outside the repository, and the three runs' logs stand in the record directory; both are measurements of the product's own people whose records a reader of the repository cannot open, which the template of environment facts says is no fact, and D-406's *Rationale* already says so. The meaning of `--jobs 1` is the behaviour of the pinned runner of the-way read from its `--help` at the pinned commit; the product's own pinned process is no source outside the product, and the effect is held by tests (the pinned argument, and the two Docker-gate tests that fail without it). No private note is named in any entry (D-362).
- Glossary terms: none; "gate", "runner" and "directory" are used in their ordinary meaning, and the glossary holds no entry for them.
- Part-map changes: none. Projected entries: none (the task is independent). Rows of *Settlements to record* written: row 1, in D-405 (by the foundation step).

## Checks

| Check | Command | Exit |
|---|---|---|
| Foundation check on the tree as it stands | `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors"; D-405 and D-406 are not in its "listed" report (`reports/return-foundation-check.log`) |

Not run: the whole gate, as told. No test needed a rerun: no file changed in this step.

## Unread material

- `.the-way/elements/environment-facts/template.md` read to line 80 (of the part on which facts are written); its remaining rules of form are not needed for a decision that writes no fact.
- `.the-way/elements/glossary/skill/SKILL.md` and `elements/part-map/skill/SKILL.md`: not opened, since no glossary term or part-map change arose.
- `foundations/decisions.md`: D-83, D-49, D-73 and D-28 were compared by their binding sentences as the task quotes them, not re-read whole in this step; none was changed.

## Searches not found or unclear

none.

## Working copies

None made. `.runs/author/` stood empty. The log `reports/return-foundation-check.log` stays in `reports/`.
