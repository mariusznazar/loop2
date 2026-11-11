# Fix report — zasady-linii-zadan (findings of the review of the whole change)

Status: **done**
Fix range: `9bbed2f8` (reviewed head) to `13988e66`.
Commit: `13988e66` docs: :memo: return the rationale and the complies example of D-362 to their base wording (`foundations/decisions.md`, +2 −2).

## Findings, as fixed

1. **Minor, within the task — `foundations/decisions.md:8115`, the sentence added to D-362 *Rationale*** ("The rules of a task's line sit with the author's other rules for tasks, so a change to them reaches loop2 without an edit to the agent instructions."). **Fixed:** the sentence is deleted; the line is byte-identical to the base `01418389` (checked with `cmp`).
   - Check: `git show 01418389:foundations/decisions.md | sed -n 8115p | cmp - <(sed -n 8115p foundations/decisions.md)` printed nothing for the difference (same line); the printed confirmation was `RATIONALE_SAME_AS_BASE`.

2. **Minor, within the task — `foundations/decisions.md:8111`, the *Verification* `complies` example** (widened from "the entry `projects`" to the entry family). **Fixed:** the example is restored to its base text, naming the entry `projects` under `loop2`.
   - Check: `cmp` of line 8111 against the base printed `COMPLIES_SAME`.

Nothing else in D-362 changed by this fix. The binding sentence (with `task-rules`), the *Origin* line (base text, from the earlier correction `9bbed2f8`) and the two added *Rejected* ways stay as they were.

Out-of-scope findings 3 and 4 of the review and other Minor findings were not touched, as the fix playbook and the coordinator's note say.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Tracked private paths | `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` | 0 | `checked: 436 files, 0 listed, 14 binary files not read` |
| Diff of the fix range | `git diff 9bbed2f8 --stat` | — | `foundations/decisions.md \| 4 ++--` (2 insertions, 2 deletions) |

Not run in this fix: `tests/agent_workflow` (no test or script changed since its last run, exit 0, 14 tests OK, before the first correction) and `npm test` (the gate, the orchestrator's). Both are unchecked by this fix.

## Own-work check

- Requirement most likely unmet: the two reverted places now differ from the base in no way, and the rest of D-362 still matches the change it records. Check: the two `cmp` runs above and the foundation check. Shown: both reverts identical to the base; foundation check 0 errors.

## Unread material

- The findings file, the fix playbook `.the-way/task-cycle/change/fix.md`: read whole.
- The review's full report `reports/review-whole-report.md`: not read (the findings file is the cut the coordinator names for the fixer).
- None else for this fix; the decision entry D-362 and its base wording were read in the earlier work.

## Searches not found or unclear

- None. The base wording of both places was found directly by line in `01418389`.
