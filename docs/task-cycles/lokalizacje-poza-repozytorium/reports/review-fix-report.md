PASS c83ae6302a7fd7b53a2c067df7209909dbf8cd8a

# Review of the fix — lokalizacje-poza-repozytorium

Range `a4b91978ede3f6393661e4674dba6e35bad92526..c83ae63` (commits `ba9782c`, `c83ae63`); `git rev-parse HEAD` in the worktree is `c83ae6302a7fd7b53a2c067df7209909dbf8cd8a`. Method: variant "the fix" of `review-change` (`.the-way/task-cycle/review/fix.md`). The findings file `reports/fix-findings.md` bounds the review. PASS here means: F2, M1 and M2 are fixed and the fix itself introduced no Critical or Important finding. F1 is not judged as fixed (see below), and by the instruction of the findings file and the coordinator it is a choice for the human, not a defect of the fix.

## Each finding of the findings file

**F1 — remains, on purpose (returned unfixed).** The pinned command still lists the same 12 hits (`checked: 435 files, 12 listed`, exit 1); none of the three files, the pin or any exception was changed (`git diff --stat` of the range touches only `foundations/invariants.md` and the test). The author's reason matches the findings file's instructions (question 3 forbids an exception of loop2's own, question 4 a pin move, the third way is outside the task). I keep the finding as open: item 7 of the task is still unmet. It is not a defect of the fix, and the cycle puts the choice to the human, so it does not make this review FAIL.

**F2 — fixed.** `foundations/invariants.md`, entry `tracked-file-private-paths`: `Violated: yes`; the sentence is unchanged (the template says the entry "stays whole"). The test `tests/agent_workflow/test_tracked_file_private_paths.py` carries `@unittest.expectedFailure` with a comment saying why and when to remove it. This is what `elements/invariants/template.md` section "Violated" requires: `yes` for an invariant the product does not meet today, and the test "marked as an expected failure in the product's test tool, such as `expectedFailure`", removed together with turning `Violated` to `no` in the change in which it starts to pass. The entry and the test now say the same as the files do.
Evidence: `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` -> `OK (expected failures=1)`; `python -B .the-way/elements/common/foundation_check.py` -> `0 errors` (accepts `yes` with its citing test); the command still exits 1 with 12 listed, so the mark is true. `tests/invariants/test_cross_part_imports.py` (reads `Violated: yes` entries of its own kind) -> `OK`, 10 tests, so the new `yes` does not disturb it.
For the request, the template says a change that sets *Violated* names that in its request and the human accepts it at the merge (WAY-51): the request must name that this change sets `Violated: yes` on `tracked-file-private-paths` and alters the invariant test `tests/agent_workflow/test_tracked_file_private_paths.py`. The fix report states this; the request must carry it.

**M1 — fixed.** *Derives from* is now `D-362 · .the-way/installation/README.md § A product whose repository is public adds a second check — "that no file git tracks holds an absolute path on the author's disk or, in a Markdown file, a link to a private note"; read 2026-11-11`. The form is the one of the template (`<address> § <place> — "<passage>"; read <date>`, joined by ` · `). I compared the passage with `.the-way/installation/README.md` lines 78-79 at the pin: it is word for word (the line break read as a space). So a reader following *Derives from* now finds a source for the link clause. The "any disk" against "the author's disk" breadth remains, as the author says; the sentence says "on a disk" because the command reads any absolute path, which is what the test checks. This I leave as it is; it is Minor at most and was not the point of M1 once the source is named.

**M2 — fixed.** `subprocess.run(..., timeout=30)` as `tests/agent_workflow/test_loop2_play_skill.py:37,77,88` do. The test runs in 1.36 s.

## What the fix itself introduced

No new Critical or Important finding. The author's flag, judged on its merits against `elements/invariants/template.md`:

**N1 — Minor (blocks nothing; the author's flagged weakness).** Under `@unittest.expectedFailure` any exception or failed assertion counts as the expected failure: exit code 1 with the 12 hits (the true reason), but also exit code 2 of the command (an error such as an unreadable invariants file) and a `TimeoutExpired`. While `Violated: yes` stands, the test therefore cannot tell the known red apart from a new breakage of the command, and `npm test` is green on this test. Why I do not grade it higher: (1) the template mandates exactly this marking for an invariant that reads `yes` and sets no stricter form; (2) the alternative the author rejected, asserting exit 1 and the 12 hits, would pin a count and lines of three unrelated files and break on any edit of them; (3) an unexpected success (the command returning 0 once the hits are cleared) fails the gate, so the marking cannot go stale silently, and `foundation_check.py` reads the entry; (4) the state is the temporary one the cycle hands to the human. A tightening would need a second, unmarked test that asserts the command never exits with 2 and never times out; I do not ask for it here.

**N2 — Minor (blocks nothing), outside the fix diff's necessity.** The comment above `@unittest.expectedFailure` says "the change that clears the hits removes this marking". It names a future step, not the present behaviour; it is a pointer for the next reader, short, and matches the template's rule, so I leave it.

## Declined to judge

- The choice among the ways out of F1 (a pin move, a text change in the three files, an exception): the human's choice, named in the first review.
- The truth of the commit dates of `76120d8` and `08f7a06`.
- The full gate `npm test`: the orchestrator's run. Note for it: this test now reports `expected failures=1` and passes, so the one command is no longer red on it; the request must say that the red is carried by `Violated: yes` and the marking.

## Checks I ran (command, exit code)

- `git rev-parse HEAD` -> `c83ae6302a7fd7b53a2c067df7209909dbf8cd8a`.
- `git diff a4b9197..c83ae63` read whole (2 files, 7 insertions, 3 deletions); `git status --short` clean.
- `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` -> `OK (expected failures=1)`. (My shell showed the exit code of `tail`; the verdict is read from the output.)
- `python -B .the-way/elements/common/foundation_check.py` -> `0 errors`.
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> `checked: 435 files, 12 listed, 12 binary files not read` (exit 1, as before the fix).
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` -> `OK`, 10 tests.
- Manual: passage of M1 compared with `.the-way/installation/README.md` lines 76-80; `Violated` section of `elements/invariants/template.md` (lines 161-169) read against the fix.
- Not run: `npm test`; a case where the command returns 0 (unexpected success), which is `unittest` behaviour; the earlier scratch check (the three files with the class `[:space:]` between double brackets replaced gives exit 0) stands from the first review and was not repeated.

## Reaches beyond the dispatch

- `.the-way/elements/invariants/template.md` sections "Violated", "Links" and the form of an entry; `.the-way/installation/README.md` lines 76-80; `tests/invariants/test_cross_part_imports.py` (a grep and a run, to see whether `Violated: yes` entries are parsed elsewhere). Why: to judge F2 and the author's flag against the template and to check the fix broke no other test.

## Unread material

The findings file and the fix report were read whole. Of the foundation, I read the template's "Violated" section and form of an entry and the invariant entry itself; I did not re-read decisions, the part map or the glossary (nothing in this fix touches them), and did not read `elements/common/rules.md` on the form of the quoted source (the fix passes `foundation_check.py`, which checks quoted sources). The guideline files were read in the first review; the fix does not change a rule they hold except the time limit, compared above. Decisions: none read in this review.

## Searches not found or unclear

- No other entry of loop2 reads `Violated: yes` with an `expectedFailure` test to compare against (the existing `yes` entries in `tests/invariants/test_cross_part_imports.py` are test fixtures, not entries); I judged the marking by the template alone.
- Unclear: whether the template wants the request to name the change in the commit message as well; it says "in its request", which is the orchestrator's step.
