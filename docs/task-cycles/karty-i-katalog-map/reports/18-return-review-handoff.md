# Handoff - review of the return step (stage: review-change)

You review the commit range of the return step of the task cycle of the task `karty-i-katalog-map`. You did not make it. You are read-only: no tracked-file change, no commit.

## Where you work

- Worktree (from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`. Range: `c2a7853e72ce464fc8b34dbbb4517de729836d0d` to `23d42ab` (run `git rev-parse 23d42ab` for the full sha; it is the branch head).
- Method: the project skill `the-way-review-change`; read `.the-way/task-cycle/review/SKILL.md` whole and the file it names for the return step's review when that step comes. The-way is `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Your report: `docs/task-cycles/karty-i-katalog-map/reports/18-return-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`. Return that line, the report path and the checks you ran with commands and exit codes. Never ask the human. Do not run the full gate; focused checks only.

## What you review

The return step compares with the code the entries the change writes or changes, those the task names and those the search of the foundation found, and the part map; it corrects what no longer matches and writes what binds after the merge. Judge the range against the task and the entries the return step writes or corrects: the return agent's report is `docs/task-cycles/karty-i-katalog-map/reports/17-return-report.md` (its eight lines), its handoff `reports/17-return-handoff.md`; the frozen task `docs/task-cycles/karty-i-katalog-map/task.md`; the plan `plan.md`. The code it compares with is the whole change, `git diff 2136709..c2a7853` (the whole-change review of that code and of the earlier foundation entries is `reports/13-review-report.md` and, for its fix, `reports/16-fix-review-report.md`; both PASS in the end). Your range is only what the return step added: the commit(s) in `c2a7853..HEAD`.

Check in particular: D-333 (new) against the code of `src/browser/sim/map-card.ts` and its use (is each definition and example true; does the entry bind more than the task allows); the removal of the third binding sentence from D-327 (is it a loss of anything the accepted Settlement 1 row carries; does D-333 hold what it held; are links consistent); the corrections of D-169 and D-265 (true to the code; wording kept); that the entries are well formed by the decisions template and `python -B .the-way/elements/common/foundation_check.py` passes; that no private path or note title was added. Known and to be read as information: the comments of `src/browser/sim/map-card.ts` cite D-327 for definitions that now stand in D-333 (code is outside this range; grade it as the method gives, probably a Minor of the whole task, not a finding of this range's author); D-189, D-245 and D-246 were left to task 25 on purpose.
