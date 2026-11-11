PASS 13988e66a4e5105a73e71867160295e21a83bc87

# Review of the fix — zasady-linii-zadan

Range: base `9bbed2f8` (the head of the review of the whole change) to head `13988e66` (`git rev-parse HEAD` = `13988e66a4e5105a73e71867160295e21a83bc87`, matches the dispatch). One commit: `13988e66`, `foundations/decisions.md` +2 -2.

## Findings of the findings file

1. Minor, `foundations/decisions.md` D-362 *Rationale*, the added sentence about the rules of a task's line: **fixed**. The sentence is gone. Line 8115 of the file at the head is byte-identical to line 8115 at the base `01418389` (`cmp` exit 0).
2. Minor, `foundations/decisions.md` D-362 *Verification*, the widened `complies` example: **fixed**. The example reads again "a line of the agent instructions that names the entry `projects` under `loop2` in the locations file; ...". Line 8111 at the head is byte-identical to line 8111 at the base (`cmp` exit 0).

The fix report claims the same and its claims hold.

## What the fix itself could have broken

The fix diff (`git diff 9bbed2f8..HEAD`) touches only those two lines. The whole difference of D-362 from the base `01418389` is now two lines: the binding sentence (lists `projects`, `tasks` and `task-rules`; the rules of a task's line named among the places) and the *Rejected* line (the two ways of the task's *Not chosen* for question 2 added). *Origin* is the base text, as before. That is what question 2 and row 1 settle and no more. No new finding in the fix diff.

Out-of-scope findings 3 and 4 of the earlier report were not to be fixed and were not touched; they stay as notes.

## Checks run (from the worktree root)

| Check | Command | Exit code | Result |
|---|---|---|---|
| Head and range | `git rev-parse HEAD`; `git log --oneline 9bbed2f8..HEAD`; `git diff 9bbed2f8..HEAD` | 0 | head `13988e66...`; one commit; two lines changed |
| Reverted lines against base | `git show 01418389:foundations/decisions.md \| sed -n <n>p` against `sed -n <n>p foundations/decisions.md`, `cmp`, for n = 8111 and 8115 | 0 | both identical |
| Whole D-362 difference from base | `git diff 01418389 HEAD -- foundations/decisions.md` | 0 | only binding sentence and *Rejected* differ |
| Whitespace | `git diff 9bbed2f8 HEAD --check` | 0 | none |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Tracked private paths | `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` | 0 | `checked: 436 files, 0 listed, 14 binary files not read` |
| Worktree untouched | `git status --short` | 0 | empty |

Not run: `npm test` (the orchestrator's gate) and the focused `tests/agent_workflow`; the fix changes two lines of a foundation file and no test, script or product code.

## Unread material

Read whole: `.the-way/task-cycle/review/fix.md`, the findings file, the fix report, the fix diff. D-362 as the fix leaves it was read in my earlier review and compared line by line with the base here. The decisions of my earlier selection (counts 6 whole, 43 by title) are not re-read for this fix; none bears on the two reverted lines. Guideline files: none selected.

## Searches not found or unclear

none
