# Findings file — fix of the Minor findings of the review of the whole change

Source: `docs/task-cycles/test-granic-czesci/reports/review-whole.md` (first line `PASS 628bd1bb74de5ef90128bde7066c48fcb51b5d4b`). The reviewer lists no blocking finding. The three
Minor findings below are within the task and are fixed before the request opens; Minor findings 2
and 3 of the report are marked by the reviewer outside the task's scope and are not fixed. The text
is cut from the report in the reviewer's words.

1. **Invariant `cross-part-imports` reads `Rests on: none`** — `foundations/invariants.md:1239-1247` (the entry), compare
   the-way's twin at `.the-way/foundations/invariants.md:308-316` (`Rests on: git-path-patterns`). The test gives
   every file its part by matching the part map's *Files* patterns with git (`file_owners`, `tests/invariants/loop2_invariant_support.py:73`),
   so git's attribute-pattern rules decide which part a file is in, and with it whether a commit makes the sentence
   true. The invariants template says *Rests on* names every environment fact holding such a condition and that
   "a link the author knows is missing reads `TODO` rather than `none`" (WAY-17, WAY-73;
   `.the-way/elements/invariants/template.md:119-123`). The author's own report says git's matching is "probably" a fact
   it rests on, so `none` states something the author doubts. Why it does not block: loop2's `foundations/environment_facts.md`
   has no `git-path-patterns` entry, so recording one is a separate step (`the-way-record-environment-fact`) that the
   task's three settlements do not carry; the sibling `application-package-layout` (`foundations/invariants.md:75-83`)
   rests on the same `file_owners` and reads `none` too; nothing breaks if it stays. Fix: record the fact and name it,
   or write `TODO — git's matching of attribute-file path patterns` until it is. Within the task (it is an entry the
   change writes).

4. **Three blank lines before the controls section** — `tests/invariants/test_cross_part_imports.py:527-530`. Ruff
   passes; style only. Within the task.

5. **Docstring of the test paraphrases the invariant** — `tests/invariants/test_cross_part_imports.py:1-5` says "the *Depends on* of
   its part" where `foundations/invariants.md:1240` says "of the importing file's part", and omits "No file of a part
   imports a file of another part" wording identity. The meaning is the same; the sibling `test_simulation_isolation.py`
   quotes its entry word for word. Within the task, polish.

## Orchestrator's note for the fix (not a grading)

For finding 1 the choice between the two fixes the reviewer names is the fixer's. Record an
environment fact only if you can cite an official source for git's matching of path patterns that you
read in this session (WAY-80: never from memory; the-way's `git-path-patterns` fact at
`.the-way/foundations/environment_facts.md:6` shows the form and its source); otherwise write the
`TODO` the reviewer names. Foundation entries only through the project skills. Run the affected
checks again (`foundation_check.py`, the test file, ruff on `tests scripts`) and commit by path.
Write the fix report to `docs/task-cycles/test-granic-czesci/reports/report-fix-minor.md` (or return
its full text if your tool refuses), with the commands and exit codes, the own-work check and
**Searches not found or unclear**.
