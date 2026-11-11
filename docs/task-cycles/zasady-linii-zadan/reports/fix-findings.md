# Findings of the review of the whole change (PASS 9bbed2f8e6110e2c3c02f8d04591a7999783a6ab) — Minor findings within the task

Cut from `docs/task-cycles/zasady-linii-zadan/reports/review-whole-report.md`, in the reviewer's words. No blocking findings.

### Minor (within the task)

1. `foundations/decisions.md:8115`, the sentence added to D-362 *Rationale* ("The rules of a task's line sit with the author's other rules for tasks, so a change to them reaches loop2 without an edit to the agent instructions."). Question 2 and row 1 settle that D-362 lists `task-rules` and that loop2 gets no separate decision; they give no rationale of this kind. The sentence is derived from the task's *Need* (a rule repeated in `AGENTS.md` drifts from the rulebook), which is a fair reading, but it is the author's reasoning in a decision, not something the human settled, and it states the reason for the `Task rules` line of `AGENTS.md` rather than for D-362's pointer-by-entry rule. Effect: low; if the human disagrees with the reason, the entry carries a rationale nobody approved. Fix if wanted: delete the sentence or have the human confirm it.
2. `foundations/decisions.md:8111`, the *Verification* `complies` example was widened from "the entry `projects`" to "an entry under `loop2` ... such as `projects`, `tasks` or `task-rules`". Item 3 of the task asks only that D-362 list the entry. The widened example is coherent with the binding sentence and harmless, but it is an unasked edit of a part of the entry. Effect: low; the example still tells a complying line from the `violates` one.

## Orchestrator's note for the fixer (not a finding)

Both are fixed by returning those two places to their text at the base `01418389`: delete the added sentence of *Rationale*, and restore the `complies` example of *Verification* as it stood. Nothing else in D-362 changes (the binding sentence and the added *Rejected* ways stay). Out-of-scope findings 3 and 4 of the report are not to be fixed.
