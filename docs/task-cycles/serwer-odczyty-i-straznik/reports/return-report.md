# Return report - task cycle `serwer-odczyty-i-straznik`

**Status:** done with concerns (the concerns are listed under "What I found", none blocks the merge).

## Commits (branch `task/serwer-odczyty-i-straznik`, from `1d6058e2`)

- `c50b2a45` - `foundations/decisions.md` (22 decisions edited) and `foundations/invariants.md` (`account-save-backup` withdrawn).
- `46854d47` - `foundations/part_map.md` (the sentence of the part `deployment`).

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (run from the worktree root, last line `0 errors`) | 0 |
| `python -B -m unittest test_tracked_file_private_paths` (from `tests/agent_workflow`; 1 test) | 0 |

No test was touched, so no test was repointed. `npm test` and `scripts/test.py` were not run, as the handoff says. A script check of "no fact without a dependant" (below) was a grep of every fact heading in the range against `foundations/decisions.md` and `foundations/invariants.md`.

## Foundation compared with the code

- The watcher (`deploy/loop2-watch`): 26 hours is `BACKUP_FRESH_SECONDS=93600`, once in 24 hours is `BACKUP_INTERVAL_SECONDS=86400`, the log is `BACKUP_LOG_FILE=/var/log/loop2-backup.log`, a missing or unreadable log counts as no send (`BACKUP_LOG_STATE` `unreadable`/`stale` raise the kind). D-233 and D-356 (written by the foundation step) match; no correction needed.
- The three narrowed invariants and `account-email-via-outsider` say what `compose.yaml`, the Dockerfile and `.github/workflows/deploy.yml` hold; the part `deployment` lists their tests. No correction needed.
- Part map: the sentence of `deployment` said the watcher tells the owner "when the running game fails"; the watcher now also reports a night without a successful backup send. Corrected through the project skill `the-way-update-part-map` (no 26-hour number in the map: the code holds it). Parts `agent-workflow` and `product-foundation`: no change (no file moved; the skill, guidelines and facts stay inside their patterns).
- Search of the whole foundation (WAY-33) for the same statements as those I changed: "a dozen or so seconds" (only D-09), "nobody has checked" about logrotate and Compose (only D-355), "about every five minutes" and the five-minute mail risk (only D-356; the skill's sections were already corrected by slice 9; `deploy/loop2-watch.cron`, `check-address.yml` and the watcher's header say "every five minutes" of what the schedule asks for, which stays true), "bypass" / "outside Cloudflare" (only D-10), "only the owner has accounts" (D-12, D-16, D-206, D-223 only). Glossary: no word of the change needs an entry.

## Decisions written or changed (all edits in place; no binding sentence changed except D-356's, by the orchestrator's ruling 6)

| Decision | What |
|---|---|
| D-08 | *Based on*: `mikrus-host-docker-workloads` (the old game is a Docker container) and `loop2-containers-published-ports` (the loop2 containers run as the two named containers). *Rationale*: the owner's Cloudflare panel check of 2026-11-14 for where the DNS name points (one proxied CNAME to the tunnel, no AAAA/A, no Origin or Configuration Rule), with the note that it does not read the old game's address (M7). |
| D-09 | *Based on*: `loop2-deploy-dump-to-deployed-time`. *Rationale*: "a dozen or so seconds" replaced by the reading (9 to 11 seconds between the two log lines in ten deployments, 2026-11-14; a time between two lines, not a measurement of access). |
| D-10 | *Based on*: `loop2-containers-published-ports`, `loop2-containers-memory-use`. *Rationale*: the memory bounds "still need observation" replaced by the one sample of 2026-11-14 (77.07MiB of 512MiB, 23.2MiB of 256MiB, no peak); connectivity still needs observation; the owner's panel check that nothing bypasses the tunnel, as a remark (M7). |
| D-12 | *Rationale*: the owner's count of 2026-11-13 (5 accounts, all the owner's, none of another person; saved games of 5 accounts, all the owner's) as a remark. Words unchanged. |
| D-16 | *Based on*: `loop2-host-installed-copies-agree`. *Rationale*: the count remark (5 accounts, none of another person). Words unchanged. |
| D-17 | *Based on*: `loop2-deploy-resource-gate-lines`, `loop2-deploy-stage-exit-lines`. *Rationale*: the values of ten deployments against the two minimums and no stop at the gate (exit 5) in the 8000 lines read. |
| D-106 | *Rationale*: the owner's measurement of 2026-11-14 as he gave it, whole (commit, image, command, exit 0, `PASS`, profile, gate of 2, figures, no hit of the limit, no OOM kill), as a remark. |
| D-110 | *Rationale*: the owner's real-route try of 2026-11-14 (wrong password gave the ordinary message, not `Invalid request transport`; session survived a reload) as a remark. |
| D-113 | *Rationale*: the part of the owner's measurement that concerns the gate and the memory limit; the full result stands in D-106. |
| D-153 | *Based on*: `loop2-app-log-password-reset-mail-events`. *Rationale*: the reset message was tried (owner's result of 2026-11-14, the two log events, no `"failure":"mail"` line, with the remark that the log shows the hand-over to the mail service and arrival is the owner's observation); the confirmation message is unsettled (no test, no log line, no observation), and the clause of *Verification* that names both message types is checked by no entry (ruling 5). Binding sentence and *Verification* unchanged. |
| D-205 | *Based on*: `loop2-app-log-sqlite-busy-lines`. *Rationale*: no `SQLITE_BUSY` in the dump and its one rotated copy on 2026-11-14; the log of the running containers was not read. |
| D-206 | *Rationale*: the owner's count of saved games (5 accounts, all the owner's) as a remark. Words unchanged. |
| D-223 | *Rationale*: the owner's count of accounts (5, none of another person) as a remark. Words unchanged. |
| D-228 | *Based on*: `loop2-backup-log-nightly-sends`. *Verification*: `invariants: account-save-backup` removed (the complies/violates pair stays). *Rationale*: that a backup stands outside the host is read from the backup log (14 nights, 2026-11-14), with the limit that the line shows the script's send ended, not that the file restores (the monthly trial of D-234 shows that). |
| D-231 | *Based on*: `loop2-host-installed-copies-agree`. |
| D-232 | *Rationale*: the owner's result of 2026-11-14 on the copy of the encryption key, the key and login to Strych in the private note, and the matching public key, as a remark. |
| D-237 | *Based on*: `loop2-deploy-stage-exit-lines`. *Rationale*: no deployment in the 8000 lines read ended at the build stage with exit 7. |
| D-355 | *Based on*: `mikrus-host-docker-compose-version`, `mikrus-host-logrotate-schedule`, `loop2-app-log-file-names`, `loop2-host-installed-copies-agree`. *Rationale*: "two things nobody has checked" replaced by the two readings (a daily schedule, not an observed run; Compose v2.35.1) and the file names (the dump and one rotated copy). |
| D-356 | *Based on*: `loop2-watch-log-flock-status`, `check-address-schedule-run-times`. Binding sentence 2: the schedule asks for a run every five minutes, GitHub starts the runs at gaps of hours (about 3.5 to about 8.5 hours in the reading of 2026-11-14, cause not established), so the alarm may come only after hours with the server or tunnel down. *Rationale*: the pace of the scheduled check; `flock` works on the test server (the fact); the owner's GitHub mail result as a remark (with the note that it is about a run started by hand); the risk "a mail every 5 minutes and hundreds of runs a day" corrected to a mail at every scheduled run, a few a day at the gaps GitHub gives. The sixth kind and the `flock` case written by the foundation step were not rewritten. `check-address.yml` and its schedule unchanged. |

Not edited, on purpose: D-14 and D-238 (they keep the facts they name; slice 7 changed only the facts' *Source*, not their sentences), D-233 (no fact is a reason for it; the foundation step's text stands), D-234, D-235 and D-360 (not mine).

## Invariants

- Withdrawn: `account-save-backup`. Its entry is removed and its row stands in the list of withdrawn identifiers with its *Why*, which names the fact `loop2-backup-log-nightly-sends`. *Successors* reads `none`, because the template of rules says a successor is an identifier of the same file and the fact is in another file. The only entry that named it, D-228's *Verification*, no longer does; a search of the repository (decisions, invariants, guidelines, skills, tests, docstrings) found no other place that names it (the three names `account-save-backup-encrypted`, `-failure-notice` are other invariants).
- Not withdrawn, by ruling 3: `player-argon2-deployment-check` (no output word for word exists for a fact). The measurement is a remark at D-106 and D-113.
- Written: none. The four narrowed invariants were changed by slices 10 and 11; I only compared them with the code.

## Environment facts

I wrote none; every fact the cycle added has a dependant now (grep of each heading in the range against the decisions and invariants): `check-address-schedule-run-times` (D-356), `loop2-app-log-file-names` (D-355), `loop2-app-log-password-reset-mail-events` (D-153), `loop2-app-log-sqlite-busy-lines` (D-205), `loop2-backup-log-nightly-sends` (D-228), `loop2-containers-memory-use` (D-10), `loop2-containers-published-ports` (D-08, D-10), `loop2-deploy-dump-to-deployed-time` (D-09), `loop2-deploy-resource-gate-lines` (D-17), `loop2-deploy-stage-exit-lines` (D-17, D-237), `loop2-host-installed-copies-agree` (D-16, D-231, D-355), `loop2-watch-log-flock-status` (D-356), `mikrus-host-docker-compose-version` and `mikrus-host-logrotate-schedule` (D-355). None withdrawn. `mikrus-host-docker-workloads` (D-08, D-14, D-17) carries the old game's container (M7). The facts re-read by slices 7 and 8 keep their dependants.

## Glossary, part map

- Glossary: none. Part map: the sentence of `deployment` (above); no file, dependency or trust boundary changed.

## Projected entries

None carried.

## Rows of *Settlements to record*

Rows 1 to 4 were written by the foundation step (`9630fb90`); I compared them with the code (above) and changed nothing in them.

## What I found

1. **Remarks cite the human's words as results, not as readings.** D-106, D-110, D-113, D-153, D-232 and D-356 now hold long passages. The decision template says *Rationale* "names no file, script or count" where the author writes it rather than quotes a source; I marked each passage as the owner's result "as he gave it" and kept the script name and the figures only in D-106, D-113 and D-356 because the task asks for the command and figures. A reviewer may find D-106's remark too long; the cost of shortening is that the evidence of the measurement is lost to the foundation.
2. **M9 (not mine, no entry written):** `elements/environment-facts/template.md` has no form of *Source* for a service's public answer read through a CLI (`gh run list`, `gh api`); slices 8 and 9 used the closest form. A question for the-way.
3. **The checkout of the server is at `f0814d77`, behind this branch.** After the owner installs the new watcher and the skill's files, `loop2-host-installed-copies-agree` is stale in its sentence about the commit and the `cmp` results (the fact says what was read on 2026-11-14, so it stays true as dated). D-16, D-231 and D-355 now name it; the next reading of the owner or agent refreshes it. Not an error of this step.
4. **D-356 binding sentence now carries a dated reading** ("in the reading of 2026-11-14"), as ruling 6 asks. If GitHub changes the rhythm the sentence needs a new reading; the fact is where the date lives.
5. **The GitHub mail result is about a manual run**, not a scheduled one; D-356 says so. The mail for a scheduled failure has not been seen by anyone in the cycle.
6. **D-153's confirmation message stays unsettled**, as ruling 5 says; `account-email-via-outsider` no longer carries any delivery part.
7. The slices' unresolved note that the `exec` tool shows no exit status (slice 7) is unchanged and affects only how the facts read "no output"; not touched.

## Reaches beyond the handoff

- `foundations/part_map.md` whole, `foundations/invariants.md` (the five entries and the withdrawn list), the facts' file (lines 800-889 and 59-62, 726-728), `deploy/loop2-watch` (header and constants), `.the-way/elements/part-map/{template.md,skill/SKILL.md,decide_entry.md,write.md}`, `.the-way/elements/invariants/{template.md,skill/*}`, `.the-way/elements/decisions/{template.md,skill/*}`, `way_of_working.md`, `rules.md`: read to apply the skills. `.claude/skills/loop2-deploy/SKILL.md` (a grep for the exit-code table lines 160-166) to confirm what exit 5 and 7 are.
- A grep of the repository for `account-save-backup` and for the phrases I corrected.

## Unread material

- `.the-way/elements/environment-facts/skill/*` and `template.md`: read only the template's lines about dependants and withdrawn identifiers (grep); I wrote no fact.
- The facts' *Source* quotes of slices 5 to 7: not re-compared with the raw readings in the slice reports (the whole-change review did that); I read the facts' sentences whole.
- `foundations/decisions.md`: D-08, D-09, D-10, D-12, D-14, D-16, D-17, D-106, D-110, D-113, D-153, D-205, D-206, D-223, D-228, D-231, D-232, D-233, D-234 (to its Rationale), D-237, D-238 (to its Rejected), D-355, D-356 read whole or to the places named; D-234 *Rationale* end and D-238 *Rejected* not read.
- `reports/slice-1-report.md`, `slice-2-report.md`, `slice-4-report.md`, `slice-2-review.md`, `fix-review.md`, `cycle.md`: not read (the handoff names slices 3 and 5 to 11, the fix report and the whole-change review); of the whole-change review I read M7, M8, M9 and the passage on D-153 only.
- `guidelines/coding.md`, `guidelines/testing.md`: not read (no code or test touched).
- `reports/return-handoff.md` ruling 8's "decisions of the touched parts by Reading the foundation": I read the decisions I edited whole and did not read every decision whose *Scope* names `deployment`, `agent-workflow` or `account-server` (hundreds); the search of the whole foundation was by grep for the statements I changed.

## Searches not found or unclear

- Unclear: whether *Successors* of a withdrawn invariant may name an environment fact. `rules.md` says an identifier of the same file; I used `none` and named the fact in *Why*; the check passes with that, and I did not try the fact as a successor.
- Unclear: whether the ruling's "D-10 or D-17" for `loop2-containers-memory-use` allows both; I named it in D-10 only (D-10's *Rationale* is where "the chosen memory bounds still need observation" stood).
- Not found: any entry that states the old game's address, so D-08's remark says the owner's check does not read it.
- Not found: any other place that names `account-save-backup`.
