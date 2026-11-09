PASS 9e9d64b8ea560fc040d0df135fffda2bb22f8bd7

# Review 26: reconciliation of `task/skad-wiem-o-awarii` with `main` (read-only)

Range: `c79fab7..9e9d64b`. `git rev-parse HEAD` = `9e9d64b8ea560fc040d0df135fffda2bb22f8bd7` (confirmed). The gitlink of `.the-way` is `294af7fde45323ac1851c014a03071a97fc38d96` and `git -C .the-way rev-parse HEAD` shows the same commit. `git status --short` was empty before and after my checks (the test runs write to the ignored `dist/`).

Commits in the range: `3d4bb31` (renumbering), `9e9d64b` (merge of `90bf21f`, parents `3d4bb31` and `90bf21f`), and main's own commits that the merge brought in (`c931b73` to `a1f4912`, all from main's pull request 72).

## Verdict in one paragraph

The two sides hold together. The renumbering is complete and touches only the numbers; the four conflicted files are whole (no test, no entry lost, none duplicated, no marker left); every comment that cites D-352, D-353 or D-354 is main's and means main's decision, and every citation of this change's two decisions says D-355 or D-356; the report route agrees with D-353; the deploy skill text agrees with D-354 and with the new environment facts; the part map names every tracked file (`foundation_check.py`: 0 errors). No blocking finding. Two Minor findings and one out-of-scope remark below.

## Findings

### Critical
none

### Important
none

### Minor

1. **The one `LIMITED` failure line of the report route is stated nowhere in the foundation, and D-353 reads as if refusals were meant to be silent.**
   Place: `src/server/account-routes.ts:409-441` (`admission === "refused-first"` writes `writeFailure("browser", ..., new ReasonedFailure("LIMITED"))`), `foundations/decisions.md` D-356 (Decision field and Verification) and D-353 (title: "Which refusals of the account server are an expected course and leave no failure line?").
   What: D-353 lists three cases that leave no line (a body the browser broke off, a body too large or broken, a session write a block refused) and does not say that every refusal is silent, so the report route does not violate it. The 429 itself writes nothing, as the rule "Recording a failure" in `guidelines/coding.md` wants for an expected refusal (the test "over its limit the route answers 429 and writes nothing, one LIMITED line at the first refusal of an hour" in `tests/http.test.mjs` pins both). The `LIMITED` line is a deliberate exception: one line per hour that tells the owner reports were dropped, which is a failure of the record, not a refusal of the player. But D-356 does not name it (it says only that the route "limits the reports it accepts"), and only `.claude/skills/loop2-deploy/SKILL.md:302` and the tests state it. A reader who takes D-353 and "Recording a failure" together may read the line as a false alarm of the very kind D-353 removes.
   Why it matters: a later change that "cleans up" the line in the name of D-353 would silence the only signal that a flood dropped reports. It does not block the merge: the behaviour was reviewed before the merge, it is tested, and main's D-353 does not forbid it.
   Evidence: reading D-353, D-356, `app.ts:89-128`, the route, the skill; `npm test -- tests/http.test.mjs` passes the test named above.
   Suggested fix (for the orchestrator to choose): one sentence in D-356 saying that the first refusal of an hour leaves one failure line of its own, `LIMITED`, because it is the record that reports were dropped and not a refusal of a player.

2. **The text of the rule "Recording a failure" and the text of D-353 use "expected refusal" for two different sets.**
   Place: `guidelines/coding.md:109-125` and D-353. The rule's `Decision:` field names D-252 · D-253 only (main dropped D-354 in `bc8f9ca`), while its paragraph on the service command's sentence cites D-354. Not a contradiction; only that D-353 is not cited by the rule although it narrows what "failure" means for the server. Minor, main's text, no change by this branch. Out of the scope of this change; listed so the orchestrator can pass it on if it wants.

### Out of scope

- `tests/view/uncaught-failure.test.mjs:235-246`: the fake `PageAddress` has no `reload` (the type gained it on main in `098a708`). The fake existed in that form on main (`90bf21f`) before this change added its cases; its `onChange` never calls the listener, so the missing method is never reached and no test fails. Main's commit `9b0996f` gave `reload` to the fakes of other test files only. Not caused by the merge.

## Declined to judge

- The correctness of main's own changes (the reload on the fragment of an emailed link, the block-aware session write, the break-off body, the backup cleanup failure, the measuring script): reviewed by main's own cycle; I read them only where they meet this change's text or code.
- The content of D-355 and D-356 themselves and of the watcher, the workflow and the dump: reviewed in the earlier reviews of this change; here only their numbering and their meeting with main were judged.
- The whole gate (`npm test` as one command): the orchestrator runs it.

## What I verified

**Renumbering (`3d4bb31`).** The diff of `c79fab7..3d4bb31` was read line by line: 13 files, 21 lines, each line differs from its old form only in `D-352` to `D-355` or `D-353` to `D-356`. The 21 lines equal the 21 occurrences of the old numbers in `git grep -nE 'D-35[23]\b' c79fab7` outside `.runs` (counted by file). No other tracked file cited the old numbers (the two skill copies and their references cite none of D-352..D-356 except D-137 and D-160 in the text of `unblock`, which are main's and older).

**Citations after the merge** (`git grep -nE 'D-35[2-6]\b'` outside `decisions.md` and `.runs`):
- D-352 (main): `src/browser/view/game-view.ts:182,823`, `tests/view/account-screen.test.mjs:3952,4793`. Each means the reload on the fragment of an emailed link.
- D-353 (main): `src/server/app.ts:63,107`, `src/server/database.ts:20,343`, `tests/account-storage.test.mjs:1648`, `tests/http.test.mjs:1983,2017,2047,4372`. Each means the break-off body or the blocked session write. None of them is on a line this change added: `git diff 90bf21f 9e9d64b | grep -E 'D-35[234]'` is empty.
- D-354 (main): `src/server/account-backup.ts:30,120`, `tests/account-backup.test.mjs:448`, `guidelines/coding.md:129`. Each means the sentence of a service command.
- D-355 (this change): `deploy/loop2-app.logrotate:2`, `tests/deploy/test_loop2_deploy_dump.py:1`, `tests/deploy/test_loop2_log_storage.py` (four lines and the header), `foundations/invariants.md:1255`, D-347's rationale.
- D-356 (this change): `src/browser/view/app.ts:238`, `src/server/account-policy.ts:52`, `src/server/account-routes.ts:409`, `src/server/log-line.ts:59`, `tests/deploy/test_loop2_watch.py:1`, `tests/http.test.mjs:4653`, `tests/transport.test.mjs:192`, `tests/view/uncaught-failure.test.mjs:562`, `foundations/invariants.md:1265,1275`, D-347's rationale.
So the comments of main that cite D-353 mean main's D-353 and are not confused with this change's (now D-356).

**The four conflicted files.**
- `foundations/decisions.md`: headings of the merge equal the union of the headings of the two sides, apart from D-347's heading, which this change rewrote on purpose (the foundation of main did not touch D-347: `git diff 00aa818 90bf21f -- foundations` has no D-347). The order is D-351, D-352, D-353, D-354 (main), D-355, D-356 (this change), no gap, no repeat. D-352 to D-354 read whole and match `git diff 00aa818 90bf21f`. The only lines the merge removes against this side are three lines of D-254 that main rewrapped (no word changed). No marker left.
- `foundations/environment_facts.md`: headings of the merge equal the union (this change's seven facts `docker-container-log-removal` to `github-actions-public-runs-free`, then main's `docker-compose-down-volumes`, `docker-volume-prune-scope`, `docker-system-prune-volumes`); no line deleted against either side.
- `tests/account-api.test.mjs`: with a script comparing the titles of `test(...)` calls (multi-line aware) of base `00aa818`, this side `3d4bb31`, main `90bf21f` and the merge: expected = this side + main - base = 25; the merge has 25, none missing, none extra, none repeated. `node --check` passes. Read the join (`git show 9e9d64b --cc`): this change's report-client tests and helpers (`withRecordedFetch`, `reportedWords`) come first, main's `saveGame` keepalive test after, each block closed once.
- `tests/http.test.mjs`: the same comparison gives 88 expected, 88 in the merge, none missing, extra or repeated; `node --check` passes. The merged import is `import { ServerResponse, request } from "node:http"` plus `import fs from "node:fs"`, both used. The seven lines of this side that the merge deletes (`return value.apply`, five `waitFor(... inFlight === 1 ...)` lines and their comment) are lines main rewrote to `nextAccountRead` and `afterFind`, and the helper `accountFixture` signature this change widened (`{ keyCapacity, sendingDeadline, browserReportLimit }`) is kept. Read the join: this change's report-route block (`reportPath` to the 429 and rolling-hour cases) follows main's cases and closes once.
No marker `<<<<<<<`, `=======`, `>>>>>>>` in any tracked file; `git diff --check 90bf21f 9e9d64b` is empty; the four files are LF as the index has them.

**Foundation entries of main that bear on the touched parts, read whole.**
- D-352 (browser-view): the reload on the fragment of an emailed link. Interacts with `src/browser/view/app.ts` only in that both changed that file in different places (`reportLine` and `onLine` here; `reload` through `PageAddress` there); the merge applies both without overlap. The reload does not meet the last-resort handler.
- D-353 (account-server): the break-off body and the blocked session write. This change's report route: a refused body (invalid, too large, broken, broken off) answers 400 or 413 and leaves no line, as D-353 and the error handler of `app.ts` say; a report on a blocked account's session: the renewal that fails as the response ends is silent as D-353 says, the report line itself is still written; the 429 writes no line, and the first refusal of an hour writes the one `LIMITED` line (Minor 1). No violation of D-353 found.
- D-354 (account-server): the sentence of a service command is no log line. The skill text of this change for the `account-block` lines (`.claude/skills/loop2-deploy/SKILL.md:252,339-366,374-385`) appends to the dump file only lines that begin with the two exact JSON starts and end with `}`, and says that the sentences never reach the file; the sentence stays in the terminal. That is D-354, and also D-355 ("those only"). Agrees.
- Environment facts `docker-compose-down-volumes`, `docker-volume-prune-scope`, `docker-system-prune-volumes`, read whole: used by main's `invariants.md` change (the *Rests on* of `account-save-durable-storage`) and by main's text in `references/setup_and_secrets.md:299-323`, `SKILL.md:163-167`, `troubleshooting.md:114`. This change's text mentions no prune or `down -v`; `SKILL.md:42` ("prunes host-wide, runs `down`") is unchanged and agrees. `deploy/loop2-deploy` prunes only `docker image prune --filter label=...`, as before.
- Invariants and part map: main added no invariant except the changed *Rests on* line; `git diff 00aa818 90bf21f -- foundations/part_map.md` is empty. This change's part-map lines (browser-view, account-server, deployment, `.github/workflows/check-address.yml`) are intact in the merge. `foundation_check.py` reports 0 errors, so every tracked file is claimed by a part.

**Deployment skill, both copies.** The three files of `.claude/skills/loop2-deploy` and `.agents/skills/loop2-deploy` and `loop2-play/SKILL.md` are byte-identical between the two copies (`diff -q`). Main renamed the human steps of the mail (H1, H2, H4) to M1 to M4 and of the saved game to S1, S2, so as not to be mistaken for the tunnel's H1 to H5; this change's new section "The failure record and alerts" numbers its steps 1 to 7 and uses no H, M or S label, so no label collides. The two statements about the dump (`SKILL.md:241-275`, `setup_and_secrets.md:479-578`) and main's statements about the volume do not overlap. The count "six installed copies" (`troubleshooting.md:54`) agrees with `compare_installed_script` in `deploy/loop2-deploy`.

**`src/server/` interaction.** main touched `account-backup.ts`, `account-policy.ts` (one line, a comment), `account-routes.ts` (one line), `app.ts`, `database.ts`, `log-line.ts` (one line, a comment). This change's additions to `account-policy.ts`, `account-routes.ts` and `log-line.ts` merged without overlap with main's edits (those were the comment lines the renumbering and main's wording touched; the final comments read correctly). `app.ts` has main's change only (this change adds nothing to it: `git diff 90bf21f 9e9d64b -- src/server/app.ts` is empty). `BlockedSessionRefusal` and the report route do not meet: the route calls no `establishSession`.

## Checks run

Working directory `the root of the repository`, Windows.

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `npm test -- tests/http.test.mjs` | 0 | 88 tests, 88 pass |
| `npm test -- tests/transport.test.mjs` | 0 | 11 tests, 11 pass |
| `npm test -- tests/account-api.test.mjs` | 0 | 25 tests, 25 pass |
| `npm test -- tests/startup.test.mjs` | 0 | 18 tests, 18 pass |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK |
| `npm test -- tests/deploy/test_loop2_deploy_dump.py` | 0 | 9 tests OK |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 | 9 tests OK |
| `node --check tests/http.test.mjs`, `node --check tests/account-api.test.mjs` | 0, 0 | syntax whole |
| title comparison of `test(...)` calls over base, this side, main and merge (one-off Python, `python -I`, in my scratchpad) | 0 | 88 and 25, none missing, extra or repeated |
| `git grep` for conflict markers, `git diff --check 90bf21f 9e9d64b` | 0 | none |

Not run: the full `npm test` (the orchestrator's), the view tests of main's reload (outside the list; they passed on main and the merge did not touch them: `git diff 3d4bb31 9e9d64b -- tests/view` shows only main's own files), `tests/deploy/test_loop2_watch.py` and `test_loop2_log_storage.py` (outside the list; the renumbering touched only comment and docstring lines in them, the merge nothing).

## Reaches beyond the handoff

- `git show 9e9d64b --cc` for the two test files, to read the join of the conflicted hunks (handoff step: check each resolution).
- `foundations/invariants.md:1235-1290` (the three invariants this change added), `guidelines/coding.md:109-125` ("Recording a failure"; main's change to it), `src/server/app.ts:85-128` (error handler), `deploy/loop2-deploy` (`compare_installed_script`, prune), `tests/view/uncaught-failure.test.mjs:235-246`: read to judge the questions the handoff put (D-353, D-354, the part map, the fake address).
- `tests/http.test.mjs` titles around the 429 case, read from the test output, to check what the `LIMITED` case pins.

## Searches not found or unclear

- none that blocked the review. Unclear only: whether D-356 was meant to name the `LIMITED` line; the only places that say it are the deploy skill and the tests (Minor 1).
