# Prompt — implementer for the redo against invariant checks (correction 1)

Dispatched by the orchestrator (Claude Opus 5.5), fresh general-purpose agent, inherited model.

- Context: checks in tests/invariants (commit ab34d90) were written blind to the code; task-cycle step 11 / WAY-126 / WAY-03: set aside the covered code, redo it against the accepted check. Checks and foundations/ are read-only.
- Command: `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`; five sentences listed.
- Method: Superpowers 6.4.1 test-driven-development. For invariants 5, 3, 2, 1, 4: name covered code; set it aside minimally; run check, record RED (or record and explain no RED); redo minimal code from the sentence and failing output without restoring from git; run all checks and `npm test`.
- Commit only redo differences with explicit paths, message `fix: redo skeleton code against invariant checks`; none if no difference; never commit .runs/.
- Boundaries: product source/config only; no new packages; do not kill processes it did not start; no sub-dispatch.
- Report: reports/correction-1/redo.md; reply ≤15 lines.
