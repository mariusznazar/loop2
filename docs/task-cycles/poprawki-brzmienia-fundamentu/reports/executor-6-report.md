# Report - executor of slice 6 (`make-change`)

**Status:** done with concerns (D-355 not standing and not forced; D-255 and the D-232 *Verification* adapted to what stands; see "Items" and "Choices")

**Commit:** `36d4292e` on `task/poprawki-brzmienia-fundamentu` (base `192e9096`). One commit, six files, 23 insertions, 21 deletions:
`foundations/decisions.md`, `tests/deploy/test_loop2_backup.py`, `tests/deploy/test_loop2_deploy_switch.py`, `tests/invariants/test_account_save_backup_encrypted.py`, `tests/invariants/test_loop2_deploy_keeps_running.py`, `tests/invariants/test_loop2_host_sharing.py`.
`tests/invariants/test_loop2_application_port.py` is unchanged (item already made).

**Check result in one line:** foundation check 0 errors, six test files pass, ruff passes on the six; nothing failed; ruff ran from the main checkout's venv because the worktree has none.

## Items (each as made / already made / not standing)

| Item | Result |
|---|---|
| D-17 "log and lock" -> "logs and lock" | made. `deploy/loop2-deploy:38-39` holds `LOG_FILE` and `DUMP_FILE`. Quotations in `tests/deploy/test_loop2_deploy_switch.py` (two lines) and `tests/invariants/test_loop2_host_sharing.py` (one line) follow, same span. |
| D-231 "…run only by a human or the installed backup script" | made with the human's wording: "…is run only by the installed backup script, which its schedule or a human starts." The *Verification* `complies:` line said the old thing ("run only by a human or by the installed backup script"); I changed it to the same new wording (see Choices). No test quotation of D-231 reaches that sentence (`git grep` for a D-231 quotation holding "human" found none). |
| D-232 binding sentence | made, word for word as the task gives it (only line wraps differ). The two quotations that broke follow: `tests/deploy/test_loop2_backup.py` (now quotes "Outside the container's writable layer of D-231, the plain database exists on the host only in that pipe") and `tests/invariants/test_account_save_backup_encrypted.py` (the old line quoted the whole sentence, so the new line quotes the whole new sentence, including the leftover clause the test does not exercise). |
| D-232 *Verification* `violates:` | made, adapted. The task quotes "a plain database file on the host's disk on its way to the encryption"; the base says "a plain database file written anywhere on the host's disk on its way to the encryption, such as a copy fetched by `docker cp`…". I replaced "written anywhere" with "written by the script" and kept the rest of the item. |
| D-236 "any page count the database can reach" | made: "…above any page count a database of this server can reach." The *Verification* `complies:` line already said "a database of this server can reach" (already made). No test quotes this span. |
| D-253 list of scripts | made: `measure-passwords` -> `src/server/measure-passwords.ts`, and `deploy/loop2-watch` put before `deploy/loop2-backup`, in the binding sentence and in the `complies:` line; "the last two" still means the backup and the restore trial. `deploy/loop2-watch` has its own traps (`deploy/loop2-watch:180-184`, `:672-679`). |
| D-255 *Rejected* | not standing as quoted, adapted. The task quotes "and the owner has a save without these states"; the base already says "the operator has a save without these states" (the owner -> operator rename of the log). The defect (a present-tense claim about a save) stands, so I wrote "and the operator's save then held none of these states". I did not bring the word "owner" back. |
| D-355 *Rationale* | not standing, not forced. The quoted "…except two things nobody has checked, that `logrotate` runs daily there and which release of Compose the server has…" is not there. Commit `c50b2a45` replaced it with: "…except two things read once on the server on 2026-11-14, that `logrotate` has a daily schedule there (its timer is enabled with `OnCalendar=daily` and a daily cron entry exists; that is a schedule, not an observed run) and that its Compose is version v2.35.1, and the `local` driver and the rotation give both the running container's log and every copy an upper bound." The facts `mikrus-host-docker-compose-version` and `mikrus-host-logrotate-schedule` hold those readings (`foundations/environment_facts.md:852`, `:858`), so the task's "which nobody has checked" would now contradict them. What remains of the task's defect: the sentence does not list the file and its owner, which a human creates, among what the server must have (the *Lacks* of the same *Rationale* does say it). Left for the orchestrator to decide. |
| D-356 first item (the gate of workflows) | made: " the test gate would refuse a new workflow file, since it counts every file in the folder of workflows as a route of deployment;" removed from *Risks taken* (file and test stand, `tests/invariants/test_account_server_typecheck.py:80-85`). |
| D-356 second item | made: "…and without it a flood past the limit would leave the same thirty lines as a flood of thirty." |
| To do 7.7 `test_loop2_deploy_keeps_running.py:2` | made: "container" -> "containers" (matches `foundations/invariants.md:137`). |
| To do 7.8 `test_loop2_application_port.py:1` | already made. The docstring already opens with the sentence of the invariant as it stands now (the Compose-file sentence, `foundations/invariants.md:147`, word for word), followed by "The check reads `compose.yaml` as it stands and runs nothing." and a "Does NOT cover" paragraph naming what the host really publishes. The old sentence the task quotes ("…inaccessible from the Internet outside Cloudflare") is gone from the invariant, so nothing was changed. |
| To do 7.11 `tests/deploy/test_loop2_backup.py:17` and `:119` | made: "operator" -> "the human" in the comment at the notice constant and in the comment of `test_pusher_gets_the_polish_notice_as_these_bytes`. The D-233 quotations that hold "operator" were not touched. |

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after the decisions: five errors, exactly the five quotations that rule 4 names (`tests/deploy/test_loop2_backup.py:249`, `tests/deploy/test_loop2_deploy_switch.py:92` and `:248`, `tests/invariants/test_account_save_backup_encrypted.py:130`, `tests/invariants/test_loop2_host_sharing.py:397`). After the quotations were moved: `0 errors`.
- `python -B .the-way/elements/common/foundation_check.py` (the full run, at the end): exit 0, `0 errors`. `listed:` lines (none is an error), five, all of earlier slices' invariants, none from this slice: `account-server-runtime` (`foundations/invariants.md:5`), `terrain-drawing-numbers` (`:354`), `player-opaque-session-cookie` (`:668`), `trip-plan-progress` (`:978`), `loop-run-knowledge` (`:1158`).
- `npm test -- tests/deploy/test_loop2_deploy_switch.py`: exit 0, 10 tests OK.
- `npm test -- tests/invariants/test_loop2_host_sharing.py`: exit 0, 18 tests OK.
- `npm test -- tests/deploy/test_loop2_backup.py`: exit 0, 26 tests OK.
- `npm test -- tests/invariants/test_account_save_backup_encrypted.py`: exit 0, 2 tests OK.
- `npm test -- tests/invariants/test_loop2_deploy_keeps_running.py`: exit 0, 13 tests OK.
- `npm test -- tests/invariants/test_loop2_application_port.py`: exit 0, 2 tests OK.
- `the main checkout of the repository, .runs/quality-venv/Scripts/ruff.exe check --config ruff.toml <the six files>`: exit 0, "All checks passed!". The worktree has no `.runs/quality-venv`; I used the executable of the main checkout's venv (read-only use of a tool, run on the worktree's files).
- The full gate (`npm test` without a file) was not run, as ordered.
- No invariant's test was written or changed in behaviour; only comment lines and a docstring word of invariant tests changed, so no "seen failing" run applies.

## Own-work check

Requirement most likely not met: the human's D-232 wording must be exact and the quotations must follow it, and a binding sentence reworded in D-231 must not leave a sentence of the same entry saying the old thing. Checks: (1) I compared the new D-232 sentence with the task's text word for word (`git diff` of `foundations/decisions.md`), identical apart from line wraps; (2) the full foundation check reports no quotation standing in no binding sentence, and no decision changed with nothing holding it; (3) I read the *Verification* and *Rationale* of D-231 for the old claim "a human or the installed script": the `complies:` line held it and was changed; the *Rationale* says "the rule on who runs it also keeps that output out of an agent's session", which stays true. Result: nothing more found.

## Choices (way rejected, cost if wrong)

- D-231 `complies:` line changed to the new wording. Rejected: leave it as the task lists only the binding sentence. Cost if wrong: one line of an entry that says more than the human chose; it only restates the binding sentence.
- D-232 `violates:` "written anywhere" -> "written by the script". Rejected: add the whole phrase to the old text or leave it. Cost if wrong: a reviewer finds the item narrower than before; the human's wording names the script.
- D-255 adapted with "operator's" rather than the task's "owner's". Rejected: leave unchanged (the defect stands), or write "owner's" (would reintroduce a word the log dropped). Cost if wrong: one word.
- D-355 left alone (above). Rejected: write the task's replacement (it contradicts two environment facts), or write a new wording of my own (not accepted by the human). Cost if wrong: the sentence keeps its small omission of the file and its owner.
- The quotation in `tests/invariants/test_account_save_backup_encrypted.py:130` is the whole new sentence, by rule 4's "same span", so it now claims the test holds the leftover clause (the container's `/tmp`) which the test, using stand-in tools, does not check. The *Verification* `tests:` clause of D-232 does not mention that clause either. Raised for the reviewer.

## Reaches beyond the handoff

- `git log --oneline -S'read once on the server on 2026-11-14' -- foundations/decisions.md` and `foundations/environment_facts.md:850-868` (to find out why the D-355 quotation does not stand and what stands).
- `grep` of `deploy/loop2-watch` for traps and of `src/server/database.ts` for `backupRate` (`database.ts:220-225`, the code comment already says "a database of this server") to check D-253 and D-236.
- `.agents/skills/loop2-deploy/references/backup_and_restore.md:30-45` (in *Read*), read for the D-231 wording.
- `the author's global rules file scripts.md` and `git.md` (the user's global rules, shown by a hook).
- The ruff executable of the main checkout's venv (see Checks).

## Working copies

None made; `.runs/executor-6/` was never created. Nothing to remove.

## Unread material

- `foundations/decisions.md` read only by the ranges named (D-17, D-231, D-232, D-236, D-253, D-255, D-355, D-356), as ordered; D-355 and D-356 each read whole (heading to next heading).
- `foundations/glossary.md`: not read (the wordings of the slice use no term it defines; "operator" and "human" are the log's own words).
- `src/server/database.ts:150-175` and `:915-935`: read `:145-180` and `:912-938` (the lines of the handoff did not hold the rate; found `backupRate` at `:220-225` by `grep`).
- `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` (rules): not opened; the handoff carries them word for word. `task.md` read whole.
- `tests/deploy/test_loop2_deploy_switch.py`, `tests/invariants/test_loop2_host_sharing.py`, `tests/invariants/test_account_save_backup_encrypted.py`: not read whole (rule 4 lets the quotation be edited in place); read only the lines around the quotations. `tests/deploy/test_loop2_backup.py`, `tests/invariants/test_loop2_deploy_keeps_running.py` and `tests/invariants/test_loop2_application_port.py` read whole.
- `.the-way/elements/decisions/examples.md` names D-WAY-03 only for the-way's own log; `foundations/decisions.md` of the-way not read.

## Searches not found or unclear

- The D-255 quotation "and the owner has a save without these states" and the D-355 quotation ("two things nobody has checked…") were not found at the base (see Items).
- The D-232 *Verification* quotation "a plain database file on the host's disk on its way to the encryption" was not found as quoted; the item stands with "written anywhere" (see Items).
- The plan says the D-232 and D-17 quotations stand in "the four test files"; found as predicted: three lines of D-17 in two files, two lines of D-232 in two files. No quotation of D-231, D-236 (checked by span), D-253, D-255, D-355 or D-356 broke.
- `.runs/quality-venv` is missing in the worktree (as the handoff foresaw); ruff ran from the main checkout's copy.
