# Return report — zasady-linii-zadan (step 11)

Status: **done**. No commit: nothing needed correcting or writing.
Head compared: `13988e66`.

## What was compared with the code

- **D-362** (`foundations/decisions.md`, heading `### D-362`), with the change already written as row 1:
  - Binding sentence: lists `projects`, `tasks` and `task-rules` under `loop2` in the locations file; `AGENTS.md` (`## Backlog`) names the same three entries, with the rules of a task's line named as `task-rules`. Matches.
  - Verification `complies` example: back at its base wording (`projects`), which the `AGENTS.md` line still satisfies. Matches.
  - Origin: base wording, naming only the earlier task document (out-of-scope observation, not changed). Not mine to fix.
  - Rationale, Rejected: the two ways from task question 2 and their costs are in *Rejected*; no rationale about the origin of the rules of a task's line (removed in the fix). Matches.
  - Scope (`agent-workflow`, `product-foundation` among the touched parts): matches.
- **Invariant `tracked-file-private-paths`** (`foundations/invariants.md`, `## tracked-file-private-paths`): derives from D-362; its check passes on the tree (436 files, 0 listed). Matches; no change.
- **Part map**, `agent-workflow` (*Files* holds `AGENTS.md`; no new file) and `product-foundation` (`foundations/**`): no file set or trust boundary changed. Matches; no change.
- **Search of the foundation** (WAY-33), for `task-rules`, `task's line`, `locations`, `backlog`, `_zadania` in `foundations/` and `guidelines/`: hits are D-362 (binding sentence, Verification, Rejected, the existing *Origin*), D-82 at `foundations/decisions.md:1548` (names the entry `projects`, which stays true), `guidelines/testing.md:92`. None contradicts the change. Nothing else cites D-362.
- **Glossary** (`foundations/glossary.md`): no term for the task line or the backlog; the words of the change (`task-rules`, the rules of a task's line) are entry names and ordinary words, not glossary terms under WAY-95. Nothing to record.
- **Environment facts**: the change rests on no source outside the product. Nothing to record.

## What no longer matched and its correction

None. No correction was needed.

## Entries written or changed by the return step

None. Row 1 (D-362) was written by the change itself (commits `a46e02fc`, `9bbed2f8`, `13988e66`), and D-362 matches the code now.

## Checks at head `13988e66` (no writes made, so no new commit)

| Check | Command | Exit code | Result |
|---|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Tracked private paths | `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` | 0 | `checked: 436 files, 0 listed, 14 binary files not read` |

No gate was run (per the instruction).

## Unread material

- `guidelines/testing.md`: read only lines 88–96 (the passage that names the `projects` entry and the locations file). The rest was not read; it is a guideline, not an entry named by this return step, and the change touches no test.
- `foundations/decisions.md:1548` and the decision at the `D-82` heading: read by search hit only, not whole. Both name the entry `projects`, which the change does not alter.
- The decisions of the `agent-workflow` and `product-foundation` *Scope* lists other than D-362: not read whole in this step (reading method: the search of the foundation is by identifier and link; none of those decisions links to D-362 or names `task-rules`).
- `reports/review-whole-report.md` and `reports/review-fix-report.md`: not read in this step (the coordinator's message gives their outcome: PASS at `13988e66`).

## Searches not found or unclear

- Searched the glossary for a term of the task's line or the backlog: not found (as above).
- Searched for an environment fact about the locations file or the tools of the task: not found; none needed.
- Unclear: whether the old *Rejected* sentence "removing only the three paths of the backlog section" still describes the alternatives correctly, since the backlog section now holds no path. It describes the alternative weighed at the time and still reads as rejected; left as is.
