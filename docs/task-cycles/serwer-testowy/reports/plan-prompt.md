# Dispatch — planner (serwer-testowy)

You are a fresh planner in a the-way task cycle. The user delegated intermediate choices to the
orchestrator; questions go back to the orchestrator in your report, never to the human.

Use the-way's `plan-task`: read `C:/Storage/repos/loop2-serwer-testowy/.the-way/task-cycle/plan/SKILL.md`
in full and the files it names (pinned the-way at `.the-way`, commit d04c3feb). Worktree:
`C:/Storage/repos/loop2-serwer-testowy`, branch `task/serwer-testowy`, base
170118680abec6760291df5d13f908c58409f867.

Inputs:
- frozen task `task-frozen.md` (binding);
- reviewed spec `spec.md` (approved by the independent re-review,
  `reports/spec-re-review.md` "Revision 2 review");
- sources: `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md`
  (projected entries for task 2, gate record) and `plan_mvp_loop2.md` (row 2);
- the product's `foundations/*.md`, code and tests.

Orchestrator answers to the re-review's last notes (fold them into the plan):
- add `.gitattributes` with `deploy/** text eol=lf` (and LF for any other shell file the change
  adds), so scripts keep LF on Windows checkouts and the server;
- the exit-3 test covers a commit absent from the server clone and one already fetched by an
  earlier human run but not on `main`;
- the skill says that when a correction changes `deploy/loop2-deploy` before the merge, the human
  reinstalls from the new request head.

Notes on how this cycle runs (for cutting slices and the *Foundation entries* table):
- The foundation step writes every entry in the spec's "Foundation entries" table before the first
  slice whose code depends on it, through the project skills `the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-environment-fact`, `the-way-update-part-map`.
  An invariant's sentence, its check and the code it covers come from three different agents
  (WAY-69): plan invariant checks as foundation-step work, separate from the slices that write the
  covered code. Extending the typecheck check's tripwire is also foundation-step work and must
  precede the first slice that adds a deployment file.
- Local Docker daemon is not running on this machine; plan checks that need it as conditional and
  name what stays unchecked. Git Bash is available; `flock`, `shellcheck`, `actionlint` are not.
- The deployment skill must follow `C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/konwencje_skilli_i_commandow.md`.
- No server name, SSH port, SSH user or IPv6 address anywhere.

Write boundary: only `plan.md`, `plan-size.md`
(the size report of `python -B .the-way/task-cycle/slice_size.py` as the skill says) and your full
report `reports/plan.md`. No code, test or foundation entry.
Boundary: the finished plan; return before any slice is made. If you find an open design choice the
spec does not settle, return it instead of a plan, as the skill says. Return a summary under 200
words.
