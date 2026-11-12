# Slice 38 report — residual pointers in the Python tests and the scripts

**Status:** done (with one observation on a timing-sensitive test, see Problems)

Base: `3df3ce80165eb41f22791ddbf8dc712e49247ac5` (HEAD at start, worktree clean).
Commit: `8809f16e353a15779af8a947eef0cd52481dd050` (one commit, 14 files, 26 insertions, 25 deletions). No new decision was written, so `foundations/decisions.md` and `the-way-record-decision` were not touched or used.

## Changed lines (old pointer, outcome, entry)

| File:line | Old pointer | Outcome | Entry |
|---|---|---|---|
| `scripts/measure-passwords.mjs:23` | "(spec, section 6)" for the 80% budget | replaced by the invariant that states it | invariant `player-argon2-deployment-check` (read whole: "at most 80% of its 512 MiB deployment limit") |
| `tests/agent_workflow/test_loop2_deploy_skill.py:1` | "(spec § 7)" | dropped; the docstring already says what is checked | none |
| `tests/deploy/test_check_address_workflow.py:1` | "(spec § D)" | replaced by D-356 (its text: a scheduled workflow opens the public address and fails unless status 200) | D-356 |
| `tests/deploy/test_deploy_workflow.py:1` | "(spec § 4)" | dropped | none |
| `tests/deploy/test_loop2_deploy_build.py:1` | "(spec § 5, steps 7–9 and 12)" | dropped; the bullets carry the behaviour | none |
| `tests/deploy/test_loop2_deploy_build.py:83` | "Changed from one warning to three by spec decision 10, and from three to six when…" | rewritten as a statement of what the test expects (one warning per each of the six installed copies, named); no history | none |
| `tests/deploy/test_loop2_deploy_commit.py:1` | "(spec § 5, steps 2–6)" | dropped | none |
| `tests/deploy/test_loop2_deploy_input.py:1` | "(spec § 5, "Input — two paths"; WAY-48)" | replaced by the invariant that states the refusal of all input but one commit name; WAY-48 dropped (it is a rule of the-way's part-map template about trust boundaries, not a requirement of the code) | invariant `loop2-deploy-trigger-input` (read whole) |
| `tests/deploy/test_loop2_deploy_switch.py:1` | "(spec § 5, steps 10–13, "Never")" | dropped; the "never in the output" bullet says it | none |
| `tests/deploy/test_loop2_watch.py:1` | "(D-356, decisions C1 to C7 of the spec)" | "(D-356)" | D-356 |
| `tests/deploy/test_loop2_watch.py:51` | "the format the spec gives" | "the format the script writes" (the state format lives in `deploy/loop2-watch`, in no foundation entry) | none |
| `tests/deploy/watch_script_support.py:67` | "as the maker worded them (the spec leaves the Polish wording to the maker)" | "as the script words them (D-356 fixes only that they say which kind of trouble was found)"; D-356 says "a fixed subject and text that say only which kind of trouble it found" | D-356; invariant `failure-watcher-message` read whole |
| `tests/invariants/test_account_save_backup_failure_notice.py:191` | "The spec's log holds the exit code of a failure." | "The log holds the exit code of a failure (D-233)"; D-233 says the log holds "the stage and exit code of a failure" | D-233 |
| `tests/invariants/test_application_build_kitchen_sink.py:5, 22, 25` | "(spec Decision 4)", "(spec Decision 6)", "(spec Decision 4)" | all three dropped: the marker, the "writes nothing outside `dist/kitchen-sink/`" bullet and the "review keeps out" sentence already say it, and D-45 and the invariant do not mention the marker, so no decision could be cited honestly | none; invariant `application-build-kitchen-sink` read whole |
| `tests/invariants/test_local_start_access.py:479, 490, 582, 618` | "Task item 7 / 6 / 8 / 18:" comment prefixes | prefix dropped, the rest of each comment (it describes the case) stays | none; invariant `local-start-access` read whole |
| `tests/invariants/test_loop2_deploy_trigger_input.py:12` | "(spec § 5, "Input — two paths")" | dropped (D-16 does not state the `SSH_ORIGINAL_COMMAND` detail, so it was not cited) | none |
| `tests/invariants/test_loop2_deploy_trigger_input.py:81` | "(spec § 5, step 3)" | dropped | none |

## Hits listed, not changed (S3 words used for something else)

- `scripts/restore-trial.mjs:280,291,292,297,307,458,466` — variable `spec` (the JSON probe request). Not a pointer.
- `scripts/test-node-file.mjs:2,17` — `spec` is the reporter imported from `node:test/reporters`.
- `scripts/test.py:25-29` — `spec` from `importlib.util.spec_from_file_location`.
- `tests/deploy/test_account_storage.py:50-66,160,161` — `spec` variable in the JS probe and in Python (request spec dict).
- `tests/deploy/test_restore_trial.py:316,318` — `spec` request dict.
- `tests/invariants/test_account_server_express_http.py:64-66` — `spec` is the version range string from `package.json`.
- `tests/invariants/test_account_server_runtime.py:35-42` — `spec` parameter, a version range.

S1 (the private-name grep) printed no line, before and after (exit 1 of git grep).

## Citations of decisions checked (unchanged files, opened to verify)

D-234 (checked restore: matches `restore-trial.mjs` and its test), D-77 (`scripts/test.py` focused/full gate), D-17 and D-112 (volume and schema, `test_account_storage.py:1`), D-110 (tunnel headers), D-157 (registration answer carries the sending's outcome: its Verification says so), D-235 (no test reaches `pusher`), D-233, D-356, D-255 to D-258 (local start). Each says what its comment claims. Invariants cited by `# invariant:` lines read whole: `account-schema-lifecycle`, `account-save-backup-failure-notice`, `account-server-express-http`, `account-server-runtime`.

## Checks (command, exit code)

- S1 `git grep -nIE '…' -- <21 files>`: no line (git grep exit 1).
- S3 `git grep -nIE '…' -- <21 files>`: only the `spec` variable hits above remain.
- AST of each changed Python file against HEAD with docstrings removed (scratch script, `python -I -B`): 13 of 13 identical. The only changed JavaScript line is a comment.
- `the quality environment of the worktree (not committed)/Scripts/ruff.exe check <17 Python files>`: exit 0.
- `python -B -m py_compile <17 Python files>`: exit 0. `node --check` on `scripts/measure-passwords.mjs`, `scripts/test-node-file.mjs`, `scripts/restore-trial.mjs`: exit 0 each.
- `npx prettier --check scripts/measure-passwords.mjs`: exit 0. `npx eslint scripts/measure-passwords.mjs`: exit 0.
- `npm test -- tests/password-measurement.test.mjs` (the focused test of the changed script): exit 0, 12 passed.
- `python -B scripts/test.py <file>`, each exit 0: `tests/agent_workflow/test_loop2_deploy_skill.py` (5), `tests/deploy/test_deploy_workflow.py` (16), `tests/deploy/test_check_address_workflow.py` (17), `tests/deploy/test_loop2_deploy_input.py` (8), `tests/deploy/test_loop2_deploy_commit.py` (18), `tests/deploy/test_loop2_deploy_build.py` (14), `tests/deploy/test_loop2_deploy_switch.py` (10), `tests/deploy/test_loop2_watch.py` (78, 394 s on the second run), `tests/invariants/test_account_save_backup_failure_notice.py` (8), `tests/invariants/test_loop2_deploy_trigger_input.py` (10), `tests/invariants/test_application_build_kitchen_sink.py` (3), `tests/invariants/test_local_start_access.py` (21). These use stand-ins for docker, git bash and a temporary copy; none starts a real container.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".

## Not run

- `tests/deploy/test_account_storage.py`, `tests/deploy/test_restore_trial.py`: start Docker containers (no change in them; unchanged files, `py_compile` and ruff stand in).
- `tests/invariants/test_account_server_express_http.py`, `test_account_server_runtime.py`, `scripts/test-node-file.mjs`, `scripts/test.py`, `scripts/restore-trial.mjs`: no change in them (only `py_compile`/ruff/`node --check`); no focused test run.
- The product gate `npm test` with no argument: not run, as ordered.

## Own-work check

Requirement most likely unmet: "no comment, docstring or test title points to a document outside the foundation" in words the searches S1/S3 do not catch (e.g. "the maker", "Task item", "decisions C1 to C7", "WAY-48"). Check: widened greps over the 21 files for `task`, `Q\d`, `question N`, `To do`, `definition`, `concept`, `§`, `Decision N`, `settlement`, `MVP`, `note`, `vault`, `cycle`, `handoff`, `row N`, `line N`, `Mariusz`, `D-\d+`, `WAY-\d+`, `C\d`, `invariant`. They found the "Task item N" prefixes, "the maker", "decisions C1 to C7", "spec decision 10" and "WAY-48", all fixed; remaining hits are code words (`Loop:` output line, `notes` field of a probe, `report` variable) or decision/invariant citations verified above.

## Reach beyond the dispatch

Opened `foundations/decisions.md` for D-11, D-15, D-16, D-17, D-45, D-77, D-110, D-112, D-113, D-157, D-233, D-234, D-235, D-255 to D-258, D-356 (first lines of each, to verify cited claims or find a holder of a requirement); `foundations/invariants.md` for the invariants named above; `.the-way/elements/part-map/template.md` for WAY-48. Reason: S3 hits and the instruction to verify every cited decision. The snapshot `the private snapshot of the notes (not committed)/` and the cycle record `cycle.md` Q9 were not needed (the orchestrator's decision on cycle records is in the handoff).

## Unread material

- The task passages (copied in the handoff) and the handoff: read whole. Not opened: `task.md`, `plan.md`, `cycle.md` (the handoff carries what the slice needs), `.claude/skills/the-way-record-decision/SKILL.md`, `.the-way/elements/decisions/*`, `.the-way/elements/common/rules.md`, `guidelines/coding.md`, `guidelines/testing.md`: no decision was written and only comments, docstrings and test titles changed. D-82, D-362, D-368, D-80, D-73 and the invariant `tracked-file-private-names` were not read.
- The files of *Change* were read by passage (their headers and every hit), not whole, as only comments and docstrings changed.

## Searches not found or unclear

- A holder in the foundation for "the marker string" of `application-build-kitchen-sink` (spec Decision 4) and for the exit-code detail of the forced command path: not found, and not needed (the code says it); pointers dropped.
- The format of the watcher state file: found only in `deploy/loop2-watch`, no foundation entry; the comment now names the script.

## Problems as observed

- `tests/deploy/test_loop2_watch.py`: the first run (with `timeout 270`) printed an `F` and was killed by the timeout at exit 124; I did not capture which test failed. A rerun without a timeout passed 78 of 78 in 394 s. The file's code is unchanged by my edit (AST identical). Guess, not verified: a timing-sensitive test failing under load, or the timeout kill itself; the orchestrator may rerun the file once more when the machine is idle.

## Choices

- Cited a decision only where its text states the claim; otherwise dropped the pointer rather than cite loosely (cost if wrong: a comment less, no information the code needs lost, since the neighbouring text carries it).
- "Task item N:" prefixes dropped but the comment bodies kept; if a body only made sense with the task text, it still reads as a description of the case.
