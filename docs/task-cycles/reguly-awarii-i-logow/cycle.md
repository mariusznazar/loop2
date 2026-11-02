# Cycle record — Sześć reguł o awariach i logach w wytycznych kodowania loop2

- Task source: C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\reguly_awarii_i_logow_loop2.md, `Status: ready for cycle`, accepted 2026-11-02; frozen copy [task.md](task.md) beside this record
- Task relation: independent
- Product repository: C:\Storage\repos\loop2 (worktree C:\Storage\repos\loop2-wt\reguly-awarii-i-logow)
- Process pin: `f45ca40724251a46965aed69f733d0a35c430048`
- Target branch and base: main, 54b2b7831cfb08c8e2d3eda8bfaf87b9a4205470
- Task branch: task/reguly-awarii-i-logow
- Status: request open

## Two questions at start

- Trust boundary: yes — account-server names `src/server/**` and simulation names `src/browser/sim/saved-game.ts`. The change touches `src/server/` (HTTP handling, mail, commands, start-up) and the load of a saved game. Every code review is told so and checks crafted input there: a value from a request, the mail service or a saved document reaching a log line, a log line broken by a crafted value, and a crafted saved document answered with a refusal and not as an unexpected error.
- Irreversible operation: no — no schema change, no data operation; the deployment after the merge stays the human's merge.

The cycle prepares an irreversible operation and never performs it; preparing the code for it does
not authorize running it.

## Spec and execution route

- Open design choice at start: none — rows 1–3 of *Settlements to record* settle the three entries; the form of a line (question 9), the list (question 11), the programs with a last-resort handler (question 4), the player's sentence (question 16) and the statuses (question 14) are settled. Whether the unexpected error of the load reaches the view as a thrown error or a third result is a way of making row 3, which the author makes and names.
- Reserved choice: none — no language, framework, library, store, way of logging in or place to run is opened; the line is written through `console` with no library (question 9).
- Execution route and reason: one author without a plan; ten items, each with its places and fix stated in the task, around one small shared way of writing a line, so one agent can hold it, and an author that finds it too large returns.
- Author: general-purpose agent, class `same` (opus) — the change crosses account-server, simulation, browser-view, agent-workflow and product-foundation, with two trust boundaries.
- Plan: none on the one-author route
- Discarded attempt: none
- Slices returned too large: none
- Agent waiting: native completion notification of the background `Agent`; no polling.
- Whole-change review: general-purpose opus, fresh, `review-change`; 54b2b78..704a03e; `FAIL 704a03e`; [reports/04-review-report.md](reports/04-review-report.md); 35 files +1740 −274; every To do, row of *Settlements to record* checked item by item, To do 3 not met (I1, I2), To do 7 met in behaviour with I3 on its test. The reviewer read a narrower selection of the foundation and guidelines than its method gives and says so.
- Review rounds: whole change, 54b2b78..704a03e, [reports/04-review-report.md](reports/04-review-report.md): I1, I2, I3 blocking; no finding has a slice; fix range 704a03e..43f596f, [reports/06-fix-report.md](reports/06-fix-report.md); review of the fix `PASS 43f596f`, [reports/07-fix-review-report.md](reports/07-fix-review-report.md); no blocking finding remained. Return step, 43f596f..defa71f, [reports/10-return-review-report.md](reports/10-return-review-report.md): I1 blocking; fix defa71f..b891590, [reports/12-return-fix-report.md](reports/12-return-fix-report.md); review of the fix `PASS b891590`, [reports/13-return-fix-review-report.md](reports/13-return-fix-review-report.md); no blocking finding remained.
- Weakest-point checks: author — „every failure handled is written”, beyond the audit's 8 places: every `catch` and `console` of `src/server` read, and the path after the answer has left found and fixed (M1); „a crafted document stays a refusal”: a sweep of every place of three documents with 14 hostile values found a throw inside the program check's message (M6); [reports/02-author-report.md](reports/02-author-report.md).

## Slices

| Slice | Base | Class, executor and model | Risk | Head | Mechanical check and retry | Review, fix and review of the fix |
|---|---|---|---|---|---|---|

One-author route: no rows.

## Events

| Time | Stage | Actor and model | Handoff, skill and inputs | Output or full report | Short result and next step |
|---|---|---|---|---|---|
| 2026-11-02 | start | orchestrator, claude-opus-5-5 | `task-cycle/skill/SKILL.md`, frozen task | this record | sources unchanged: base 54b2b78 and pin f45ca40 are the commits the task cites; branch and worktree made |
| 2026-11-02 | base gate | orchestrator | `npm test` on 54b2b78 | [reports/gate-base.txt](reports/gate-base.txt) | exit 0; no check failing on the base |
| 2026-11-02 | make change | general-purpose, class `same`, opus | [reports/01-author-handoff.md](reports/01-author-handoff.md), `.the-way/task-cycle/change/SKILL.md` | [reports/02-author-report.md](reports/02-author-report.md) | `done with concerns`; commits 3400178, e839cbf, 704a03e; focused checks exit 0; gate left to the orchestrator |
| 2026-11-02 | review of the whole change | general-purpose, opus, fresh | [reports/03-review-handoff.md](reports/03-review-handoff.md), `.the-way/task-cycle/review/SKILL.md`, range 54b2b78..704a03e | [reports/04-review-report.md](reports/04-review-report.md) | `FAIL 704a03e`: 3 Important, 3 Minor, 2 out of scope |
| 2026-11-02 | fix of the review's findings | the one author resumed, class `same`, opus | [reports/05-findings.md](reports/05-findings.md), `.the-way/task-cycle/change/SKILL.md`, variant the fix of a review's findings, range from 704a03e | [reports/06-fix-report.md](reports/06-fix-report.md) | `done with concerns`; commits a62d20f, 717ed83, 43f596f; affected checks exit 0; I1's case C contested with evidence |
| 2026-11-02 | review of the fix | the same reviewer resumed, opus | [reports/05-findings.md](reports/05-findings.md), [reports/06-fix-report.md](reports/06-fix-report.md), `.the-way/task-cycle/review/fix.md`, range 704a03e..43f596f | [reports/07-fix-review-report.md](reports/07-fix-review-report.md) | `PASS 43f596f`: I1, I2, I3 fixed, the contested detail not kept; 3 Minor |
| 2026-11-02 | gate | orchestrator | `npm test` on 43f596f | [reports/gate-43f596f.txt](reports/gate-43f596f.txt) | see Verification |
| 2026-11-02 | return step | the one author resumed, class `same`, opus | `.the-way/task-cycle/skill/return_step.md`, `foundation_step.md` | [reports/08-return-report.md](reports/08-return-report.md) | `done`; commit defa71f, text of `foundations/` and `guidelines/` only |
| 2026-11-02 | review of the return step | fresh general-purpose, opus | [reports/09-return-review-handoff.md](reports/09-return-review-handoff.md), `.the-way/task-cycle/review/SKILL.md`, range 43f596f..defa71f | [reports/10-return-review-report.md](reports/10-return-review-report.md) | `FAIL defa71f`: 1 Important, 2 Minor |
| 2026-11-02 | fix of the return step's finding | the one author resumed, class `same`, opus | [reports/11-return-findings.md](reports/11-return-findings.md), variant the fix of a review's findings, range from defa71f | [reports/12-return-fix-report.md](reports/12-return-fix-report.md) | `done`; commit b891590; `foundation_check.py` exit 0 |
| 2026-11-02 | review of the fix of the return step | the same reviewer resumed, opus | [reports/11-return-findings.md](reports/11-return-findings.md), [reports/12-return-fix-report.md](reports/12-return-fix-report.md), `.the-way/task-cycle/review/fix.md`, range defa71f..b891590 | [reports/13-return-fix-review-report.md](reports/13-return-fix-review-report.md) | `PASS b891590`: I1 fixed; 1 Minor |
| 2026-11-02 | reconciliation | orchestrator | `git fetch origin main` | `origin/main` still 54b2b78 | nothing to merge; no reconciliation review |
| 2026-11-02 | gate on the final tree | orchestrator | `npm test` on b891590 | [reports/gate-b891590.txt](reports/gate-b891590.txt) | exit 1: one flaky test; the background notification showed 0, the exit of `tee`, so the orchestrator's command pushed the branch before reading the result; no request was open |
| 2026-11-02 | diagnosis of the failed test | orchestrator | [reports/flake-probe.mjs](reports/flake-probe.mjs), 40 file runs | Verification | the test's exact expiry reads through two `Date.now()` calls in `new Cookie(sess.cookie)`; a tick between them gives +1 ms; the test's lines are unchanged by this change |
| 2026-11-02 | stages the gate did not reach | orchestrator | `.the-way/gate/run_tests.py`, `foundation_check.py` on b891590 | [reports/gate-b891590-unrun-stages.txt](reports/gate-b891590-unrun-stages.txt) | exit 0 and exit 0 |
| 2026-11-02 | request | orchestrator | draft pull request 51 | https://github.com/mariusznazar/loop2/pull/51 | record committed and removed; marked ready for review |

## Questions and autonomous choices

| ID | Question and source | Answer or choice | Evidence | Alternative rejected | Cost if wrong | Used by |
|---|---|---|---|---|---|---|
| Q1 | Which files are the 16, 6 and 8 of question 14? The task gives counts only. | Every `.ts` of `src/browser/view/**`, of `src/browser/sim/data/` and of `src/browser/sim/` apart from `saved-game.ts` that its kind's table lacks. | `git ls-files`: 27 view − 11 listed = 16; 12 data − 6 = 6; 16 modules − 8 = 8; matches question 14 exactly. | none | a row too many or too few, caught by review | author |
| Q2 | Names of the fixed fields of a line; question 9 says fixed names and gives none. | `event` or `failure`, `kind`, `code`, `place`, and `accountId`; a further field such as `linkPurpose` is a field of the line and no item of the list. | `.runs/coding/failure-rules-proposals.md` P2, `failure-rules-critique-verdict.md` line 7. | other names | a rename across lines before anything reads them | author |
| Q3 | Sources the task cites under `.runs/coding/` are ignored and absent from the worktree. | The handoff names them by absolute path in the main checkout. | `git check-ignore .runs` | copying them into the worktree | none | author, reviewers |
| Q4 | Does the readiness line `Loop: <address>` (I2's second part) collide with row 1, which would make it a question for the human under the foundation step? | No: the line stays and D-252's *Verification* names it as complying. The six rules call for failure and event lines; the readiness line is neither, it predates the decision, and `account-server-occupied-address` and `account-server-default-address` fix its exact form, so it is a program's announcement to what launches it. | `foundations/invariants.md`; [reports/04-review-report.md](reports/04-review-report.md) I2 | a question at a blocked draft request; changing the line and two invariants | the human reads the line as a log line and wants the invariants changed: a small later change, visible in D-252 at the merge | author, reviewer of the fix |
| Q5 | A test outside the task's required work failed once on the final tree, by a flake older than this change. Fix it in this request? | No: list it under *Checks* as failed, with its mechanism, and name the fix for the human to place as a task. The stages the gate did not reach run on their own; the failed gate stays failed. | [reports/gate-b891590.txt](reports/gate-b891590.txt), Verification; `git diff 54b2b78..HEAD` leaves the test's lines alone; `guidelines/testing.md` *Flaky tests* | a one-line change of the test here, with another review and gate: widens the task | the same flake may redden a later gate, about 1 in 7 000 per reading, until the task runs | request |
| A1 | How to make the change (author's choice) | **The load's error reaches the view as a thrown error.** Rejected: a third result. A caller that forgets a third result reads `ok: false` and starts a new game over the save; one that forgets a throw overwrites nothing. If wrong: an uncaught error, until task 8, for a future caller. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A2 | How to make the change (author's choice) | **`ProgramCheckError`, 18 throw sites.** Rejected: a catch-everything around `checkProgram`. It is shorter but brings cause 6 back for any fault inside that function. If wrong: a line more for each new throw site, and a site left as a plain `Error` becomes a retry; the sweep catches that. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A3 | How to make the change (author's choice) | **`shown()` in the check's messages.** Rejected: leaving `String()`. Cost: an object reads „an object” in a message; no test read the old text. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A4 | How to make the change (author's choice) | **`BlockOutcome`, `UnblockOutcome` and `ConfirmOutcome` became objects, `ResetOutcome` gained `accountId`,** as `SaveOutcome` stands. Rejected: a read before or after the block, which is racy, or after the commit could turn a success into „Nothing changed”. Cost: about 60 test lines. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A5 | How to make the change (author's choice) | **`Mailer.send(message, fields?)`.** Rejected: a mail line with no account, against *Identifiers in log lines*; or a second line from the route, against „once”. Cost: an optional parameter the mailer only passes on. D-162 holds: HTTP and the database stay unknown to it. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A6 | How to make the change (author's choice) | **The failure line of a start keeps the sentence as `failure`:** `Invalid or unavailable account configuration: LOOP2_…`. Rejected: a stable word with a `setting` field. It keeps the skill's table of log texts and To do 4's „zachowuje”. Cost: that one field's value varies. Only a `StartupFailure`'s own sentence stands there; `main.ts` no longer reads any other error's `message`, which it did. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A7 | How to make the change (author's choice) | **The commands write a JSON line and then their sentence unchanged.** Rejected: appending kind and code to the sentence, a second way of writing. The usage refusals, `LOOP2_LISTEN_PORT` (its test requires the value) and the readiness line `Loop: …` (the invariant requires it) stay plain: they are no failure with an original error, or are read by exact form. If the review reads Q9 more widely, those lines change with their tests. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A8 | How to make the change (author's choice) | **`errcode` as a further field.** Rejected: folding it into `code`. Cost: one more field. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A9 | How to make the change (author's choice) | **With headers sent, the handler calls `response.destroy()`, then `next()` with no error.** `next` must stay used, since Express needs four parameters and the linter refuses an unused last one; with no error Express's handler stays silent. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A10 | How to make the change (author's choice) | **`failure` values are stable words,** `place` a literal `file.function`. Rejected: parsing the stack, whose text can quote the message; line numbers drift. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A11 | How to make the change (author's choice) | **Events go to standard output, failures to standard error.** `account-backup` writes no event, so its standard output stays the backup's bytes. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A12 | How to make the change (author's choice) | **`already-blocked` and `not-blocked` write no event:** nothing changed. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| A13 | How to make the change (author's choice) | **Event names added beside the task's words in `### Logging scope`,** for a search. Rejected: only the words. Cost: the list names code words. | [reports/02-author-report.md](reports/02-author-report.md) | as the row says | as the row says | author |
| F1 | How to make the fix (author's choice) | `listen` reused for the raw port; rejected: a new field `listenPort`. Cost: the field holds an address in one line and a raw setting in another. | [reports/06-fix-report.md](reports/06-fix-report.md) | as the row says | as the row says | author |
| F2 | How to make the fix (author's choice) | I3's test stands in a commit of its own, since it changes no product code. | [reports/06-fix-report.md](reports/06-fix-report.md) | one commit | none | author |
| R1 | Return step (author's choice) | Reworded the entries rather than add a glossary entry or rename. Rejected: an entry for *process*. Cost if wrong: one word to change back. | [reports/08-return-report.md](reports/08-return-report.md) | as the row says | as the row says | author |
| R2 | Return step (author's choice) | Facts for the runtimes, none for the libraries. If a later review holds that I1's wrapper rests on a source, the fact needs a decision naming it. | [reports/08-return-report.md](reports/08-return-report.md), agreed in [reports/10-return-review-report.md](reports/10-return-review-report.md) | a fact per library | one later fact | author |

## Artifacts

| Kind | Path or commit | Author or agent | Review result |
|---|---|---|---|
| Frozen task | `.runs/task-cycles/reguly-awarii-i-logow/task.md` | orchestrator | — |

## Verification

| Command or manual check | Actor, commit and environment | Exit code and result | Failed or unchecked |
|---|---|---|---|
| `npm test` | orchestrator, 54b2b78, Windows 11, Node 24.17.0, Python 3.14, before any change | exit 0: Node suite passed, 377 Python tests in 4 directories, foundation check 0 errors; 12 min 23 s; [reports/gate-base.txt](reports/gate-base.txt) | none failing on the base |
| `npm test` | orchestrator, 43f596f (reviewed code), same environment | exit 0: Node 1167 pass, 0 skipped; 377 Python tests; foundation check 0 errors; 13 min 28 s; [reports/gate-43f596f.txt](reports/gate-43f596f.txt) | none |
| `npm test` | orchestrator, b891590 (final tree), same environment | **exit 1**: Node 1165 pass, 2 fail (the subtest „unrepresentable renewal age” and its parent „persisted cookies must be usable after database expiry replacement and package renewal”, `tests/account-storage.test.mjs:1828`, `5001 !== 5000`); the gate stopped there; [reports/gate-b891590.txt](reports/gate-b891590.txt) | failed: that test; not run in this gate: the Python tests and `foundation_check.py` |
| `node reports/flake-probe.mjs` (diagnosis) | orchestrator, b891590 | exit 0: `Store.createSession` of express-session gave expiry 5001 in 393 of 3 000 000 runs, 5000 in the rest | none |
| `node --test tests/account-storage.test.mjs`, 40 times (diagnosis only) | orchestrator, b891590 | 40 exit 0, 0 failed | none |
| `python -B .the-way/gate/run_tests.py`, `python -B .the-way/elements/common/foundation_check.py` | orchestrator, b891590, the stages the gate did not reach | exit 0: 377 Python tests in 4 directories; exit 0: 0 errors; [reports/gate-b891590-unrun-stages.txt](reports/gate-b891590-unrun-stages.txt) | none |

## Return step

- Foundation compared with code: D-96, D-213, D-252, D-253, D-28, D-162, D-222 and the entries the search found (D-111, D-137, D-231, D-233, D-13, D-156, D-224, D-211, D-204, D-206) and the part map; corrected: D-252 *backup* for *copy*, *process* for *program*; D-253 *process*, *Based on*, *Scope*, and its exceptions into the binding sentences; [reports/08-return-report.md](reports/08-return-report.md), [reports/12-return-fix-report.md](reports/12-return-fix-report.md)
- Decisions written or changed: D-96, D-213 changed; D-252, D-253 new
- Invariants written or changed: none (question 15)
- Environment facts: `node-uncaught-default-print`, `python-uncaught-default-print`
- Glossary terms: none; the change's own uses of *copy* and *program* moved off those entries
- Part-map changes: none
- Projected entries written whole or in part: none — the task carries no projected entry
- Rows of *Settlements to record* written: 1 — D-252; 2 — D-253; 3 — D-213, with D-96 and the rule „Odmowa zamiast wyjątku”

## Request handoff

- Request URL and status: https://github.com/mariusznazar/loop2/pull/51, ready for review
- Cycle and its reasons: no spec, no open design choice; one author, class `same`; [reports/request-body.md](reports/request-body.md)
- Process pin: `f45ca40`, unchanged
- What this request settles: [reports/request-body.md](reports/request-body.md), section *What this request settles*
- What the foundation puts in front of the human at the merge: the invariant tests altered, listed in [reports/02-author-report.md](reports/02-author-report.md) *Changed tests*; no surface; no *Violated* mark
- Checks: `npm test` on b891590 exit 1, one flaky test; its other stages exit 0 on their own; `npm test` on 43f596f exit 0
- Human actions the request waits for: none
- Questions: none
- Review findings listed: [reports/request-body.md](reports/request-body.md), sections *Minor findings* and *Outside the task's scope*
- Blocked by review: none
- Choices within the request: 22, in the questions table above
- Writes to the task's backlog entry: none
- Process remarks on the-way (make change, [reports/02-author-report.md](reports/02-author-report.md), **Searches not found or unclear**):
  - **Screenshot route:** nothing in the foundation says „screenshot”. D-87 („a changed appearance is inspected in a browser”) was taken as the route.
  - **The glossaries** hold no entry for a log, a failure or a refusal, in either file. „Case flow”, „last resort” stay plain words; no new term seemed needed.
  - **Whether `accountId` belongs in the player's own browser console line:** the rule says a case-flow line carries it, and the player sees only their own account's number. Taken as yes.
  - **Whether „wiersz logu” reaches the owner-facing sentences.** Unclear; see choice 7.
  - (review of the whole change, [reports/04-review-report.md](reports/04-review-report.md)) **My foundation selection is narrower than the method gives.** The decisions whose *Scope* names a touched part come to about 465 KB. I searched them for log, console, error and printing and read whole only D-13, D-96, D-162, D-211, D-213, D-224, D-231, D-233, D-252, D-253, with D-222 up to its *Rationale*; of the invariants `save-version`, `account-server-occupied-address`, `account-server-default-address` and `password-reset-verified-email`. A decision of these parts that bears on the change without those words was not read.
  - (same report) **Guidelines:** `coding.md` and `testing.md` read whole, the longest table row of `testing.md` only in part. Of `coding-http-application.md`, `coding-database-access.md`, `coding-session-store.md`, `coding-mail-sending.md` and `coding-browser-module.md` the rules and examples the change reaches; `coding-saved-game.md`, `coding-simulation-module.md` and `coding-content-data.md` through the diff; the styleguide through its rules on warnings. Unchanged rules there were not compared with the change.
  - (same report) **Whether `failure` may hold a sentence** (choice 6, `main.ts:51`): D-252 fixes the field names, not their values. Taken as allowed; the sentences are literals.
  - (same report) **Whether question 9's „wiersz logu” reaches a command's answer to its operator:** unclear in the task. Read as no for `account-block`'s terminal; for the backup, whose standard error is a log file, N2.
  - (fix of the review's findings, [reports/06-fix-report.md](reports/06-fix-report.md)) whether „exactly one JSON line” in the direction meant C as written, given that its own mechanism gives two. Taken as a slip of the direction, which the finding marks as not binding; see *I1, the contested detail*.
  - (return step, [reports/08-return-report.md](reports/08-return-report.md)) **Whether the template's rule on two meanings binds a Polish guideline's word.** The glossary is in English; „program” in `guidelines/coding.md` was moved anyway, since the file now sits beside D-253.
  - (same report) **Whether `node-uncaught-default-print`'s edition is the one the image runs.** `Dockerfile` pins `node:24-slim`, no patch version. The fact cites the commit the foundation's other Node facts cite; `node --version` here gives 24.17.0.
  - (review of the return step, [reports/10-return-review-report.md](reports/10-return-review-report.md)) **Which Node.js release the image runs.** `Dockerfile` floats on `node:24-slim`, `package.json` says `24.x`, and the local gate runs 24.17.0, while `node-uncaught-default-print` names 24.21.0, as `node-sqlite-database` does. Whether the product „stands on” 24.21.0 (`.the-way/elements/environment-facts/template.md:85`) is unclear. No finding: the entry follows its precedent and nothing rests on the patch number. The return report names the same gap.
  - (same report) **`.github/**` through the search tool.** A first search with a glob returned nothing for that directory; hidden directories are skipped. Read directly with `grep -rn`: no runtime is pinned there.
  - (same report) **Whether „touches the data of accounts” reaches a process that only carries them,** as `deploy/loop2-backup` carries the plain database through a pipe. The return report says it does for `scripts/restore-trial.mjs`, and I read the pipe the same way. I1 stands on either reading through `scripts/restore-trial.mjs`.
