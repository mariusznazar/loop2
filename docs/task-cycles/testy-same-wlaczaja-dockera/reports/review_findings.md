# Findings for the fix — Minor findings of the review of the whole change within the task

Source: `reports/review_whole_report.md` (first line `PASS fe779640cae69ed6288ac7c664a6b66c639bb966`), the reviewer's words, cut from its *Minor* section. Findings 5 and 6 of that report are marked outside the task's scope and are not given here. No blocking finding.

1. **Within the task — skip message says "started" when the start command may not have worked.**
   `scripts/docker_gate.py:142-143` (the text of `gap`) with `start_desktop` at `:112-118`, which ignores the
   exit code and suppresses `OSError`/`TimeoutExpired`. If `docker desktop start --detach` itself fails
   (exit 1, or cannot be launched) the skip still reads "the gate started Docker Desktop and it did not
   answer within N seconds". The task asks for "the start was tried and did not finish", and the code does
   try, so the sentence is not false enough to block, but a reader of the request will think Docker Desktop
   started and hung. Evidence: reading of `start_desktop`; the stand-in has no case where `desktop start`
   exits non-zero while `desktop --help` exits 0. Cost of leaving: a wrong first guess when diagnosing a skip;
   a fix is the word "tried to start" or recording the start's exit code in the message.

2. **Within the task — a citation in D-390's *Rationale* has neither an environment fact nor a quoted source.**
   `foundations/decisions.md`, D-390 *Rationale*: "the status that Docker Desktop reports can say that it is
   stopped while the daemon answers". This is the behaviour of a tool the process uses, and the decision's
   choice (only an answer of the daemon counts) rests on it; the environment-facts template ("Which facts are
   written", `.the-way/elements/environment-facts/template.md:46`) asks a fact entry for such a citation, or a
   quotation with its source (WAY-90). The task's *Context* holds the observation (a reading of 2026-11-13); the
   change does not carry its source into D-390 (*Based on* names only `docker-desktop-start-detach`). The code is
   right either way (it ignores the status); the gap is in the entry. Graded Minor: the entry's binding
   sentence does not depend on it.

3. **Within the task — `guidelines/testing.md` does not tell a test author how to ask for a Docker daemon.**
   This is the author's concern 2, which I confirm. The file read before writing a test (AGENTS.md) names the
   Docker tests only as smoke tests (`tests/deploy/test_account_backup_stream.py`, line 364) and lists
   `scripts/test.py` in *Where in code*; nothing says "a test that needs a container calls
   `docker_gate.require_daemon`". The rule exists only in D-390's *Verification*, found by a reader of the
   foundation by Scope, not by a reader of the testing guidelines. `product-guidelines/reading.md` ("Distinguish
   the gaps") puts an extension of existing guidelines in the current task unless the human separates it,
   so it lies within the task; nothing in the statements of the guidelines is false today. Cost of leaving:
   the next Docker test written from the guidelines alone keeps its own daemon check, which D-390 forbids,
   and review has to catch it. Route: `the-way-maintain-testing-guidelines` (a line in the integration
   recipe's *Doubles* and `scripts/docker_gate.py` in *Where in code*), or a follow-up task if the human
   separates it.

4. **Within the task — timing assertions of the new tests can fail on a loaded computer.**
   `tests/quality/test_docker_gate.py`: `assertLess(... , 1.5)` in
   `test_after_a_start_that_did_not_finish_the_next_ask_gives_the_gap_at_once`, `assertLess(..., 10)` in the
   no-plugin case, `assertLess(..., 55)` in the whole-run no-plugin case. Each of those intervals contains
   Python and Node process starts; on a machine under memory pressure (the task's *Context* mentions three
   out-of-memory interruptions of the gate) a 1.5 s bound on a call that starts no process but reads one file
   can still be exceeded, as the stand-in launches are slow on Windows. The tests do fail for the right reason
   (my mutation run shows 2.37 s > 1.5 when the recorded gap is ignored), so the bound is useful, only tight.
   Same flaw does not hide anything; grade Minor.
