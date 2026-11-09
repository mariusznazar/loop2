# Handoff 27 — correction: the four out-of-date guideline sentences

You make a correction for the human's remarks on the open request of the task cycle `skad-wiem-o-awarii`. Variant of `make-change`: "a correction for the human's remarks".

## The remarks (they bind)

The human wrote, after the request was opened and a conflict with `main` was resolved: "you may fix those 4 outdated sentences in passing, and anything else you see that is worth fixing". This handoff gives you the four sentences; another agent takes the rest afterwards, so change nothing outside the guideline files named here.

## Delegation and place

- The orchestrator has delegated intermediate choices to itself. Questions go to it.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`, head `9e9d64b`), you alone writing in it. Pin `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`. Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), read whole, and `.the-way/task-cycle/change/fix.md` beside it (the variant for a correction is given there). Commits on the task branch, explicit paths, English messages in the repository's style (`type: :emoji: summary`), no push.
- Guideline files are changed through the pinned project skills: `the-way-maintain-testing-guidelines` (`.claude/skills/the-way-maintain-testing-guidelines/SKILL.md`) for `guidelines/testing.md`, and `the-way-maintain-coding-guidelines` (`.claude/skills/the-way-maintain-coding-guidelines/SKILL.md`) for the coding guideline files. Read the skill of the file you change whole, and each file it sends you to when its step comes. These skills lead a refinement with the human; here the human's remark above is the task, the edit is the narrowest that makes a sentence true, and nothing is audited or extended beyond it. Where a skill's rule would need the human's approval for an edit (a changed meaning of an exemplar, a new rule), do not make that edit: report it as a question, with the sentence as it stands, the sentence you would write, and why.
- Report: `.runs/task-cycles/skad-wiem-o-awarii/reports/27-correction-guidelines-report.md` (what changed per sentence, the old and the new text, checks with command and exit code, the own-work check, reaches beyond this handoff, **Searches not found or unclear**).

## The four sentences (find them; line numbers moved with the merge)

1. `guidelines/testing.md`: (a) the row of the table *Trust boundaries* for `src/server/` says the guard case covers "siedmiu tras" and "ósmej" (the save route); the change added a ninth route (`POST /api/browser-failure`) that the same guard cases now include, and added cases of the report route (limit, patterns, `accountId` only from the session, the one `LIMITED` line); the row of `deploy/` does not name the watcher script or the dump of the log; (b) the *expected results* table rows near the end of *Trust boundaries* list the routes by name and say "dziewięciu trasach" — they must name the new route and count right; (c) *Where in code* does not list the new test files (`tests/deploy/test_loop2_deploy_dump.py`, `tests/deploy/test_loop2_log_storage.py`, `tests/deploy/test_loop2_watch.py`, `tests/deploy/test_loop2_watch_message.py`, `tests/deploy/watch_script_support.py`, `tests/deploy/test_check_address_workflow.py`). Read the tests and the invariants `loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report` to word exactly what is proved; word nothing as proved that is not (the unproved list is in the request description and in `spec.md`).
2. `guidelines/coding-account-policy.md`, section "Zegar w testach": the sentence "wartości progów i okien opcjami nie są" is untrue of its own exemplar file now: `src/server/account-policy.ts` takes the threshold of the browser-report limit as an option so a test can build it small (spec of the change, B2). Make the sentence say what is true, keeping what the rule protects.
3. `guidelines/coding-browser-api-client.md`, the example that says the test "Niczego nie podstawia za fetch": `tests/account-api.test.mjs` has a pass-through spy on the real `fetch` (`withRecordedFetch`) that records the options and passes the call on; the sentence is untrue of that file. Make it true, without permitting a replacement of `fetch`.
4. `guidelines/coding-browser-module.md`, the example "Gra na stronie i odpowiedzi serwera": it describes the last-resort handling as writing one console line; it now also calls an optional callback once per distinct line (`src/browser/view/last-resort.ts`, wired in `src/browser/view/app.ts` to the account client's method). Make it say what the code does.

## Inputs

Task, spec, plan and the review reports of the cycle are in `.runs/task-cycles/skad-wiem-o-awarii/`: `task.md`, `spec.md` (the sections for the report route B1 to B4 and "Tests the change must bring"), `reports/21-review-whole-report.md` (its out-of-scope items O1 to O3 name the sentences), `reports/26-review-merge-report.md`. Decisions D-355 and D-356, the three invariants above and the part map are in `foundations/`. Forbidden for every agent of this cycle: the earlier 10x checkout of the repository (the directory next to this one ending in `-10x`), branches `10x/*`, tags `archive/10x-*`, the vault folder of the earlier 10x transition, and the session records of the earlier 10x checkout and of the author's notes vault.

## Checks

The guideline files are read by tests: run `npm test -- tests/agent_workflow/` is not a single file, so run `python -B .the-way/elements/common/foundation_check.py` (it also checks the guidelines) and the tests that read the guidelines (search `tests/` for `guidelines/`; run the ones that do, one file each with `npm test -- <file>`), each with command and exit code. Not the whole gate.

## Return

Status (`done`, `done with concerns`, `questions`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path.
