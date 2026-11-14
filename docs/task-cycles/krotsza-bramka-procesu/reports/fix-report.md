# Fix report — the five Minor findings of the review of the whole change

**Status:** done

## Commits (from the reviewed head `4ffd7b04`)

- `dcc6b3ba` docs: `foundations/decisions.md` (+3 −3): D-406 *Rationale*, D-405 *Rationale* and *Rejected*.
- `32629e02` docs: `README.md` (+1 −1), `tests/quality/test_test_gate.py` (+2 −1).

## Findings

1. Fixed. D-406 *Rationale* no longer says "no other gate running"; it says the three runs were made "on one computer of 32 GB as it was, with other work on it that no file of the repository records". It does not say no other gate ran.
2. Fixed. The earlier measurement is now given with the task's conditions: 23 to 24 minutes on a slow computer, 24.0 to 28.0 minutes with another cycle working beside it, "a note made on 2026-11-12 outside the repository", and the sentence says the conditions of the two sets of runs are not alike. The figure 23.0 is gone. The closing "Accepted with it" now reads: the gate takes longer than in those three runs until the repair is made, "by how much has not been measured under like conditions".
3. Fixed. D-405 *Rejected*: the parenthesis "(an estimate made with the directories at the same time)" is cut, leaving the wording of question 1's *Not chosen*. D-405 *Rationale*: one sentence added, that the figure of about 15 minutes is the estimate for the directories at the same time and the full gate now runs them one after another (D-406). D-405's binding sentences are unchanged.
4. Fixed. `README.md:76` now reads "przez `python -B .the-way/gate/run_tests.py --jobs 1`, więc katalogi biegną jeden po drugim, i sprawdza fundament …" (Polish, in the style of the line).
5. Fixed. The docstring of `tests/quality/test_test_gate.py` now ends "; the whole run gives the Python runner one job at a time (D-406)."

No finding contested. Nothing outside the five touched. The "588 tests in 4 directories" number is not written anywhere.

## Checks

| Check | Command | Exit |
|---|---|---|
| Foundation check after the entry edits | `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors"; D-405 and D-406 not in its "listed" report (`reports/fix-foundation-check.log`) |
| The gate test file, whose docstring changed | `npm test -- tests/quality/test_test_gate.py` | 0, 8 tests OK (`reports/fix-test-gate-green.log`) |
| Ruff on the changed Python file (main checkout's `quality-venv` ruff, repo flags) | `ruff check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/quality/test_test_gate.py` | 0 |

Not run: the whole gate (as told); `test_docker_gate.py` (no code or fixture change in this fix).

## Own-work check

Requirement most likely missed: D-406's wording must not claim more than the sources give. Check: read the changed *Rationale* against the task's *Need* and *Context* lines quoted in the handoff, and grep for "23.0" and "no other gate" in `foundations/decisions.md` (D-406 holds neither); the foundation check passed. The README line was read after the edit and matches the command in `scripts/test.py`.

## Reach beyond the handoff

None beyond `.the-way/task-cycle/change/fix.md` (named by the method row), read whole, and the README paragraph around line 76.

## Unread material

None: the fix handoff, the findings file and `fix.md` were read whole; the entries were edited as the first run did, following `elements/decisions/skill/SKILL.md` and `template.md` read then.

## Searches not found or unclear

None.

## Working copies

None made; `.runs/author/` held the check logs, which were copied to `reports/` (`fix-foundation-check.log`, `fix-test-gate-green.log`) and the directory emptied.
