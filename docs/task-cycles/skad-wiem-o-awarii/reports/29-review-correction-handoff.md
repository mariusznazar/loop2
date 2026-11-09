# Handoff 29 — review of the correction for the human's remarks

You review the correction made on the open request of the task cycle `skad-wiem-o-awarii` (pull request 71), as an agent that made none of it, with `review-change`, read-only. The human's remarks stand in place of a findings file.

## The remarks (they bind)

After the request was opened and a conflict with `main` was resolved (that merge was reviewed `PASS 9e9d64b`, `reports/26-review-merge-report.md`), the human wrote: "you may fix those 4 outdated sentences in passing, and anything else you see that is worth fixing", and, asked about one more row, "yes, add that row" (an expected-results row of the testing guidelines for the public report route). The orchestrator chose, from the Minor findings the earlier reviews left open, the nine items listed in `reports/28-correction-rest-handoff.md`.

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the human's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`). Pin `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`. Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`), read whole, and `fix.md` beside it, which gives what you read and what bounds the review of a correction. Change no tracked file; write only your report.
- **Range:** base `9e9d64b8ea560fc040d0df135fffda2bb22f8bd7`, head `d385f01` (confirm `git rev-parse HEAD`): `git diff 9e9d64b..d385f01`, `git log --format='%h %s' 9e9d64b..d385f01`. Eight commits: `494b349` and `d41832d` and `d385f01` (guidelines; report `reports/27-correction-guidelines-report.md`, with its section "Rows for the report route"), `3155d4d`, `5e9d763`, `19fbab8`, `4a43945`, `43c46cd` (nine items; report `reports/28-correction-rest-report.md`).
- Report: `.runs/task-cycles/skad-wiem-o-awarii/reports/29-review-correction-report.md`; first line `PASS <sha>` or `FAIL <sha>`, or `questions`.
- Task, spec, plan and the earlier reviews are in `.runs/task-cycles/skad-wiem-o-awarii/` (`task.md`, `spec.md`, `plan.md`, `reports/`). This change's decisions are D-355 and D-356 (renumbered; D-352 to D-354 are another task's, on `main`).

## What to check

1. The four out-of-date guideline sentences and the new rows: each now true of the code and tests at head; nothing in them states as proved what no test proves; the rows for the report route take their answers, codes and numbers from the route and its tests (check each against `src/server/account-routes.ts`, `src/server/account-policy.ts`, `tests/http.test.mjs`, `tests/transport.test.mjs`); no rule was added beyond what the human approved; `product-guidelines/template.md` of the pinned the-way for the form of the guideline files.
2. The nine items, each against its source in the review reports named in `reports/28-correction-rest-handoff.md`: D-356 names the one `LIMITED` failure line; D-355's *Rationale* no longer overclaims; the skill (both copies, byte-identical) and D-356 state the browser kind's share of the daily messages as `deploy/loop2-watch` really behaves; the part map line; the logrotate fact split in two entries (each says one thing its source says: re-read the source); the D-347 rewrap changes no word; the `account-block` command in the skill refuses an address with a line feed or a carriage return before running, and the shell quoting of the command is sound (the checker `instruction-files/check_instructions.py` now reports two new warnings about `'\''` dead paths in the two skill copies: judge whether the quoting should be changed); the watcher's `flock` status logging, with its test, changes neither what the message nor the state hold and stays clean under shellcheck; the constructor test.
3. The foundation entries the correction wrote or changed (`3155d4d`, `5e9d763`) against the code: do they say what the code does? Foundation entries are read whole.
4. Nothing else changed in substance: `git diff 9e9d64b..d385f01 --stat` lists the files; every changed file belongs to an item.
- Answers of step 4 to apply: trust boundary **yes** (`src/server/**`, `deploy/**`: the correction touches `deploy/loop2-watch`, the skill's command and a test of `src/server/account-policy.ts`); irreversible operation: none performed by the cycle.
- Checks you may run, each with command and exit code (not the whole gate): `python -B .the-way/elements/common/foundation_check.py`; `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`; `npm test -- tests/deploy/test_loop2_watch.py`; `npm test -- tests/deploy/test_loop2_watch_message.py`; `npm test -- tests/quality/test_quality_invariants.py`; `npm test -- tests/http.test.mjs`. Try the skill's `account-block` command text by hand in Git Bash with a stand-in for `docker` on made-up addresses (a normal one, one with a line feed). Windows; `npm ci` is done; quality tools are in `.runs/quality-venv`.
- Forbidden for every agent of this cycle: the earlier 10x checkout of the repository (the directory next to this one ending in `-10x`), branches `10x/*`, tags `archive/10x-*`, the vault folder of the earlier 10x transition, and the session records of the earlier 10x checkout and of the author's notes vault.

## Return

First line as above, graded findings (Critical, Important, Minor, out of scope) with the reason, the checks you ran with command and exit code, your reaches beyond this handoff, and **Searches not found or unclear**.
