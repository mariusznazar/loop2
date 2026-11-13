# Fix report — Minor findings of the whole-change review

**Status: done.** All four findings fixed, none contested. Branch `task/testy-same-wlaczaja-dockera`, range `fe779640..39f54705`, tree clean.

## Commits

- `dfd039ed` fix: findings 1 and 4 — `scripts/docker_gate.py` (+3/-4 with finding 2's docstring), `tests/quality/test_docker_gate.py` (+9/-9)
- `39f54705` docs: findings 2 and 3 — `foundations/decisions.md` (+1/-1), `guidelines/testing.md` (+4/-1)

(`scripts/docker_gate.py`'s docstring edit of finding 2 went into `dfd039ed` with the file.)

## Findings

1. **Skip message said "started" though the start command may not have worked — fixed.** The sentence is now "no Docker daemon answers: the gate tried to start Docker Desktop and no daemon answered within N seconds" (`scripts/docker_gate.py`, text of `gap`). The three assertions on the old words in `tests/quality/test_docker_gate.py` now read "tried to start Docker Desktop". D-390 says the message must say the start "was tried", which the new wording says literally. Check: `test_the_skip_names_what_stays_unchecked_and_tells_a_start_from_no_start` and the whole-run test assert the new words (exit 0 below). I did not add a stand-in case where `desktop start` exits non-zero: the code ignores that exit code on purpose and the message now makes no claim about it.
2. **Unsourced claim in D-390's *Rationale* — fixed by removing the claim.** The sentence about the status Docker Desktop reports is replaced by "Only an answer of the daemon counts as Docker being up, because that answer is what the tests need." The same observation is also removed from the docstring of `daemon_answers` in `scripts/docker_gate.py`. I did not write an environment fact: the only source is a one-off reading on the author's computer, and the claim is not what the decision's binding sentence stands on. `foundation_check.py` → `0 errors`.
3. **`guidelines/testing.md` did not say how a test asks for a Docker daemon — fixed.** Added to the integration recipe's *Doubles* (the smoke recipe takes it through "as in integration test"): a test that needs a Docker daemon asks the gate through `docker_gate.require_daemon` and keeps no daemon check of its own, the gate then starts a stopped Docker Desktop; the gate itself is tested with the stand-in `docker` (`tests/quality/docker_standin.py`), which proves its reaction and not a real start; the field's decision list gained D-390. *Where in code* gained `scripts/docker_gate.py`, `tests/quality/docker_standin.py` and `tests/quality/test_docker_gate.py`. The text is in Polish like the file. I wrote it as the cycle's author from the form of `product-guidelines/template.md` and `product-guidelines/testing/template.md`, read whole; I did not run the refinement skill `the-way-maintain-testing-guidelines`: it leads a human refinement and "never writes the testing guidelines", and the meaning added is only what D-390 already carries (no approval needed for a meaning a decision of the log carries). No human decision was required, so no `questions`.
4. **Tight timing bounds — fixed.** `assertLess` bounds in `tests/quality/test_docker_gate.py`: next ask after a failed start 1.5 s → 3 s, with that test's limit 2 s → 4 s (a repeated wait would take at least 4 s); no-plugin case 10 s → 30 s, with its limit 20 s → 60 s; whole-run no-plugin case 55 s → 100 s, with its limit 60 s → 120 s (a wait would reach the limit). The count of starts, which proves "no new start" directly, is unchanged. Mutation re-run (recorded-gap check removed) still turns two tests red for the right reason: "4.33 not less than 3" in the unit case and "2 != 1" starts in the invariant test; the code was restored (`git diff` of the file shows only the intended change).

## Checks run (all from the worktree root, `npm_execpath` set)

- `python -B scripts/test.py tests/quality/test_docker_gate.py` → exit 0, `Ran 11 tests`, OK (~35 s)
- Mutation: same command with the recorded-gap check removed → exit 1, 2 failures (above); restored.
- `python -B scripts/test.py tests/quality/test_quality_invariants.py` → exit 0 (5 tests; ruff, eslint, prettier, shellcheck over the whole repository)
- `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa .` → exit 0
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` → exit 0 (10 tests)
- `python -B .the-way/elements/common/foundation_check.py` (after the foundation and guidelines edits, and after the commits) → `0 errors` (it also reads the guidelines' decision numbers and parts)
- Not run: full `npm test`; no Docker Desktop start or stop (stand-in only).

## Own-work check

- Requirement most likely not met by a fix of this kind: finding 4 must not blunt the tests. Check: the mutation re-run above — both the unit case and the invariant test still fail, the bounds being above a normal run and below a wait.
- Second: finding 1's wording must stay what D-390 requires ("the start was tried and did not finish"). Check: the tests assert "tried to start Docker Desktop" in the skip of a start that did not finish and its absence in the no-Docker-Desktop skip.

## Unread material

none — I read the findings file and `fix_handoff.md` whole, `fix.md` whole, and the files I changed whole before editing them (the passage of `guidelines/testing.md` I edited was read whole in the first round; the file again by search for the edited lines). The review's full report `reports/review_whole_report.md` was not read: the findings file holds the four findings, which were enough.

## Searches not found or unclear

none
