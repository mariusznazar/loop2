PASS 39f547056910286d547f6166298345b4dab5310a

# Review of the fix of the Minor findings — `review-change`, fix (once)

Range `fe779640cae69ed6288ac7c664a6b66c639bb966..39f54705` (commits `dfd039ed`, `39f54705`); `git rev-parse HEAD`
= `39f547056910286d547f6166298345b4dab5310a`, worktree clean. Read-only; no Docker Desktop started or stopped;
no full `npm test`. I read whole: the handoff, `review_findings.md`, `fix.md`, `fix_report.md`, and the diff
`git diff fe779640..HEAD` (4 files, +17/-15: `foundations/decisions.md`, `guidelines/testing.md`,
`scripts/docker_gate.py`, `tests/quality/test_docker_gate.py`).

Result: 4 of 4 findings fixed; 0 Critical, 0 Important new; 0 new Minor; 1 note (below).

## The four findings

1. **Skip message said "started" — fixed.** `scripts/docker_gate.py` (text of `gap`) now reads "no Docker daemon
   answers: the gate tried to start Docker Desktop and no daemon answered within N seconds". That claims only
   the try, which is what D-390 requires ("the start was tried and did not finish"); whether the start
   command worked is no longer asserted. The three assertions in `tests/quality/test_docker_gate.py` follow
   (`assertIn`/`assertNotIn "tried to start Docker Desktop"`, and in the whole-run test), so the
   with-start and no-Desktop messages are still told apart by the test. No other file holds the old wording
   (checked in the diff; D-390 and the invariant do not quote the message).
2. **Unsourced claim in D-390's *Rationale* — fixed (by removal, not by a new fact).** The sentence about the
   status Docker Desktop reports is gone from the *Rationale* and from the docstring of `daemon_answers`; the
   replacement ("because that answer is what the tests need") is no external citation, so no fact entry or
   quoted source is owed (`environment-facts/template.md` "Which facts are written": only a citation that
   would call the decision into question asks one). The decision's binding sentence and the code are unchanged
   by it. I agree with the choice: the observation was a one-off reading and the code never used it.
   `foundation_check.py`: 0 errors.
3. **`guidelines/testing.md` silent on how a test asks for a daemon — fixed.** The integration recipe's
   *Doubles* now says (Polish, as the file) that a test needing a Docker daemon asks the gate through
   `docker_gate.require_daemon` and keeps no daemon check of its own, the gate then starting a stopped Docker
   Desktop, and that the gate itself is tested with the stand-in `docker` (`tests/quality/docker_standin.py`),
   which proves its reaction, not a real start; the field ends with D-390 added to its decision list, as
   `product-guidelines/testing/template.md` asks of a binding field (WAY-241). The smoke recipe's *Doubles*
   ("as in `integration test`") takes it. *Where in code* gained `scripts/docker_gate.py`,
   `tests/quality/docker_standin.py`, `tests/quality/test_docker_gate.py`, each a path git tracks with no value
   copied (WAY-171). Every sentence is carried by D-390 (and its *Verification*), so no new meaning needs
   approval (`the-way-maintain-testing-guidelines/SKILL.md:51`: a meaning a decision of the log already carries
   takes none), and the template's "Writing the file" has the cycle's author write the file from the decisions,
   never from memory (WAY-172). I accept writing it directly instead of through the skill, which writes no
   guideline.
4. **Tight timing bounds — fixed.** `test_after_a_start_that_did_not_finish_the_next_ask_gives_the_gap_at_once`:
   limit 2 -> 4 s, bound 1.5 -> 3 s (a repeated wait would take at least 4 s, so the bound still separates
   the cases); no-plugin unit case: limit 20 -> 60 s, bound 10 -> 30 s; no-plugin whole run: limit 60 -> 120 s,
   bound 55 -> 100 s (a wait would reach the limit). The assertions that carry the claim, the number of starts
   (`len(docker.starts())`), are unchanged. The bounds keep a margin of at least about 2x on a loaded
   computer and still lie under what the broken behaviour would take. I did not re-run the mutation
   (the author's re-run is in `fix_report.md`: 2 failures, "4.33 not less than 3" and "2 != 1"); the margin
   argument stands on the numbers above, and I ran the suite as given (below).

## New findings in the fix diff

none (no Critical, Important or Minor). One note, not a finding: the whole-run no-plugin case now uses a
120-second limit and a 100-second bound, so its bound is loose by design; its real guard is the count of
starts (0) and of the skip lines (2), and the wait is shown by the other cases. It costs nothing to leave.

## Declined to judge

- Everything of the whole-change review marked outside the task (its findings 5 and 6) and the real start of
  Docker Desktop (orchestrator's step 6); unchanged by this fix.

## Checks run (command, exit code)

All from the worktree root, `npm_execpath` set to the installed npm.

1. `git rev-parse HEAD`, `git log --oneline fe779640..HEAD`, `git diff --stat fe779640..HEAD`,
   `git diff fe779640..HEAD` -> exit 0; two commits, four files.
2. `python -B .the-way/elements/common/foundation_check.py` -> exit 0, `0 errors` (reads the guidelines'
   decision numbers and the part claims).
3. `python -B scripts/test.py tests/quality/test_docker_gate.py` -> exit 0, `Ran 11 tests in 50.521s`, OK
   (stand-in `docker`; the computer's Docker not touched).
4. `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa .` -> exit 0,
   `All checks passed!`.
5. `git status --short` after the runs -> empty.

Not run: full `npm test`; the Docker tests that build images; any real start of Docker Desktop; the mutation
of finding 4 (taken on the fix report).

## Reaches beyond the dispatch

- `.the-way/product-guidelines/testing/template.md` (*Recipes*, *Where in code*, "Writing the file") and
  `.the-way/product-guidelines/testing/SKILL.md` (the "Never writes" row and the approval line): to judge
  whether the author may write finding 3's text directly. Read as passages (lines 225-275 and 13-52 area),
  not whole files.

## Unread material

- `guidelines/testing.md` read in this review only by the diff and, in the whole-change review, whole; the
  guideline text outside the two edited hunks was not re-read. The part of `fix_report.md`'s statement that
  the mutation turns two tests red was not re-run by me. The two files of the-way named above were read by
  passage, not whole. Nothing else of the dispatch was left unread.

## Searches not found or unclear

none
