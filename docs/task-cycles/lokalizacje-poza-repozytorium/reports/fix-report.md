# Fix report — lokalizacje-poza-repozytorium

**Status:** done with concerns (F1 returned unfixed on the orchestrator's instruction; F2, M1, M2 fixed).

Range: `a4b9197..c83ae63`.

## Commits

- `ba9782c` docs: `foundations/invariants.md`, entry `tracked-file-private-paths` — `Violated: yes` (F2) and a second source in *Derives from* (M1)
- `c83ae63` test: `tests/agent_workflow/test_tracked_file_private_paths.py` — `@unittest.expectedFailure` (F2) and `timeout=30` (M2)

Files: `foundations/invariants.md` 2 / 2, `tests/agent_workflow/test_tracked_file_private_paths.py` 5 / 1.

## Findings

**F1 — returned unfixed.** Reason, as the orchestrator gave: its ways out are a pin move (task question 4 forbids it), a change of the text of three files that mirrors the deployed script and a fact quoted word for word (outside the task), or an exception of loop2's own (task question 3 forbids it). I changed none of the three files (`.claude/skills/loop2-deploy/references/backup_and_restore.md`, its `.agents` copy, `foundations/environment_facts.md`), added no exception and left the pin. After this fix the pinned command still lists the same 12 hits (6 lines, each twice) and exits 1; the cycle puts the choice to the human.

**F2 — fixed.** Through `the-way-record-invariant` (template "Violated"; `write.md`; the skill's "ask first whether the product is to be fixed instead" was answered by the orchestrator's instruction: the product is not fixed in this task).
- Wording on `{fork-point}` (`211a4ea`): the entry did not exist. Wording on `a4b9197` and now: the sentence is unchanged ("No file git tracks contains an absolute path on a disk or, in a Markdown file, a link to a note, as the check of tracked files in the pinned the-way reads them."); only *Violated* changes `no` -> `yes`. The sentence stays whole, as the template says.
- The test that cites it, `tests/agent_workflow/test_tracked_file_private_paths.py`, is now marked `@unittest.expectedFailure`, as the template requires for an invariant that reads `yes` ("the test ... stands in the product's suite marked as an expected failure"). The change in which the 12 hits go removes the marking and turns *Violated* to `no`; until then, if the check starts to pass, the test reports an unexpected success and fails the gate, so the mark cannot go stale silently.
- Names for the request, per the template: this change sets *Violated* to `yes` on `tracked-file-private-paths` and alters the invariant test `tests/agent_workflow/test_tracked_file_private_paths.py`; the human accepts it at the merge.
- Concern for the orchestrator: with the marking, `npm test` no longer fails on this test (it reports "expected failures=1"), where F1 said the one command would fail. The red is now visible as `Violated: yes` and the marking, not as a failing gate; the request must say so.
- A weakness I chose to keep: an expected failure also covers an exit code 2 of the command (an error), not only exit 1 with the 12 hits. Rejected: asserting exit 1 and the 12 hits, which would pin a count and the lines of three files and break on any edit of them.
- Check: `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` -> exit 0, `OK (expected failures=1)`; `python -B .the-way/elements/common/foundation_check.py` -> exit 0, 0 errors; `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> exit 1, 12 listed (unchanged, as F1 leaves it).

**M1 — fixed, the smaller edit.** Instead of widening D-362 (which would change a decision whose row the human accepted without note links), *Derives from* of the invariant now reads `D-362 · .the-way/installation/README.md § A product whose repository is public adds a second check — "that no file git tracks holds an absolute path on the author's disk or, in a Markdown file, a link to a private note"; read 2026-11-11`, the form the invariant template's "Links" gives for a source outside the log. The passage is the README text at the pinned commit `e3825a8` (line 78-79, the line break read as a space). Check: `foundation_check.py` exit 0, 0 errors. Not covered: the "any disk" against "the author's disk" breadth; the quoted source says "the author's disk" too, so the sentence "on a disk" stays broader than its two sources. I did not narrow it because the pinned command reads any absolute path; narrowing the words would misdescribe what the test checks. Say so if the reviewer wants it narrowed.

**M2 — fixed.** `subprocess.run(..., timeout=30)` as the neighbouring tests do. Check: the test above, exit 0 in 1.3 s. A timeout raises `TimeoutExpired`, which the expected-failure marking would also swallow; same weakness as above, same reason kept.

## Own-work check

Requirement most likely unmet: that the entry and the test now tell the truth about each other (F2). Check: with `Violated: yes` and the marking, the test must pass as an expected failure and `foundation_check.py` must accept `yes`; and the 12 hits must be the only ones. Showed: test exit 0 with `expected failures=1`, `foundation_check.py` exit 0, command exit 1 with 12 listed, none new. I did not run a case where the command returns 0 to see the unexpected success (Python's `unittest` behaviour, not mine); the scratch check of the reviewer (replacing the class `[:space:]` between double brackets by `[ ]` in the three files gives exit 0) shows the command would return 0.

Not run: `npm test` (the orchestrator's step); the base's `test_ruff_source_rules` and `test_shellcheck_source_rules` (tools missing).

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/fix.md`, `fix-findings.md` (named); `.the-way/elements/common/foundation_check.py` (lines 20-50, 70-85, 410-430) for what it checks of *Violated* and quoted sources; `.the-way/installation/README.md` line 78 for the exact passage of M1; `tests/agent_workflow/test_loop2_play_skill.py` for the neighbouring `timeout=30`.

## Unread material

- The review's own report `reports/review-whole-report.md` is not read; I worked from the findings file. Everything else the dispatch names was read whole. The record skill's files were read earlier in this session (this cycle) and were not re-read: `elements/invariants/template.md`, `skill/SKILL.md`, `skill/write.md`.

## Searches not found or unclear

- No file or entry of loop2 uses `Violated: yes` yet, so I had no example of the marking in this repository; I followed the template ("such as `expectedFailure`").
- I did not verify the dates of the lines that bring the class `[:space:]` between double brackets (the reviewer did not either).
