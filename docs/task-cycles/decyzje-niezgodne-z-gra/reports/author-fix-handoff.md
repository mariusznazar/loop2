# Handoff — the fix of a review's findings (the same one author, resumed)

Variant of `make-change`: **"the fix of a review's findings"** (`.the-way/task-cycle/change/SKILL.md`, which you have read; read again the part of the variant if needed).

## Findings

The review of the whole change returned `PASS 6be2ec6c` with four Minor findings within the task and no blocking one. They are in the file `reports/review-whole-findings.md` (full path: `.runs/task-cycles/decyzje-niezgodne-z-gra/reports/review-whole-findings.md`), in the reviewer's words; the full review is `reports/review-whole-report.md`. Fix M1–M4. The finding outside the task (O1, `foundations/part_map.md`) is **not** fixed: it is the reviewer's out-of-scope finding and goes to the request's list.

## Boundaries of the fix

- Worktree and branch as before (`the root of the task's worktree`, `task/decyzje-niezgodne-z-gra`); the reviewed head is `6be2ec6c`; your fix is a range from it. Commit by explicit paths, English message in the style of the log, no push.
- **M1:** drop the second clause or say it as the reason, as the finding gives.
- **M2:** remove the line-number pointers into `foundations/decisions.md` and `foundations/invariants.md` from the test comments the finding lists (`tests/sim/combat.test.mjs:217` and `:257`, `tests/sim/encounters.test.mjs:726`, `:836`, `:871`): keep the decision numbers, or drop the line where the `decision:` / `invariant:` lines already name the entries (D-82: a comment that carries nothing the code needs is not written). Then search the whole repository for any other such pointer (the reviewer's search: `git grep -n -E "(decisions|invariants)\.md:[0-9]" -- tests src scripts deploy`) and report what it finds; fix those of the same kind in test comments, name the others.
- **M3:** `tests/sim/trip.test.mjs:639`, as the finding gives. Also search the other test comments for the old place of the rehearsal mark ("list of maps" for the mark) and fix the same fault where the comment speaks of the mark.
- **M4:** rename "owner" → "operator" in the test comments (comment lines only) where it means the person who runs the server, the places the finding lists and any other of the same sense you find by the same search; keep the role, identifiers, Unix owners and the GitHub owner. Where a comment's sense is doubtful, leave it and name it in the report. No assertion, string or identifier changes.
- Run the affected checks again (each test file you touch, the foundation check `python -B .the-way/elements/common/foundation_check.py`, the comparison script `reports/inv-names-check.py`), each with its command and exit code. Do not run the product's gate. Your fix changes comments only: say so and show it (a diff filtered for non-comment lines).
- Where you hold a finding wrong, answer with evidence in the report instead of changing it.

## Report

Write `.runs/task-cycles/decyzje-niezgodne-z-gra/reports/author-fix-report.md` as your method gives it: the commits, the findings fixed one by one, the checks with command and exit code, the own-work check, **Unread material**, **Searches not found or unclear** (each `none` or the items), your working copies and their removal (directory `.runs/author/`). Return to me: status, commits, a one-line check result, the report path.
