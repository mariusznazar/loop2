# Handoff — fix of the review of slice 3, task kopia-bazy

You make: the fix of a review's findings. Read `.the-way/task-cycle/change/SKILL.md` again for that variant, and `.the-way/task-cycle/change/fix.md`.

**Findings file.** `docs/task-cycles/kopia-bazy/reports/slice-3-findings.md`. Fix that one finding; the review's Minor findings are not yours. The whole review: `docs/task-cycles/kopia-bazy/reports/slice-3-review-report.md`.

**Bound answers.**
- The requirement is the plan's: any non-zero end, from any cause, calls `pusher` once, and the log never says a backup was sent that was not. Success is proved by a mark set after the send, never by `$?` alone.
- A hand run keeps its lines on standard output; do not take them out of `log` to avoid SIGPIPE.
- Show it with the real tools too, as your own-work check did, in a throwaway `ubuntu:22.04` container: `| true`, `| head -1`, `| head -2`, and SIGUSR1 and SIGALRM during the stream, each with its exit, its count of `pusher` calls, the files on the stand-in Strych and the last log line. A reader that leaves after the size line, with the file really sent, may end in success with no notice.
- Add a test with a pipe whose reader leaves, and one signal from outside HUP, INT and TERM, each seen failing once against the current script, each ending the run by itself. Say in the invariant test's docstring exactly what it makes happen.
- The script stays clean under the gate's ShellCheck with no disabling directive.

**Boundary.** As in your slice's handoff: nothing against Strych, `pusher` or the server. Run the two invariant tests, `tests/deploy/test_loop2_backup.py`, `tests/quality/test_quality_invariants.py` and `foundation_check.py`; the full `npm test` is the orchestrator's. Commit messages in English in the repository's form; `git add` by path.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-3-fix-report.md`, the finding as fixed with the check that shows it, or contested with the evidence, and **Searches not found or unclear**.

**Return.** Your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
