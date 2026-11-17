Status: done

# Fix 1: the findings I1 to I4 and M1 to M5

Commit `042fbe3e` on `task/wpisy-serwera-kopii-i-testow`, from the reviewed head `a2c3729b`; author address `mariusznn@gmail.com`. Files: `foundations/decisions.md`, `foundations/invariants.md`, `guidelines/testing.md`, and `backup_and_restore.md` in both copies of `loop2-deploy` (the copies were made identical with `cp`). Nothing under `.runs/` is committed.

## Findings

- **I1, fixed.** `foundations/invariants.md`, `tracked-file-private-names`: "the owner's private note of secrets (D-13)" now reads "the operator's private note of secrets (D-13)". Check: `grep -n "owner's private note" -r foundations guidelines` finds nothing.
- **I2, fixed.** D-112's *Rejected* gained two ways, each with its cost: "D-112 left as it is, with the command reading the database outside its rules — the decision would go on naming only the other connections that open the database, while one more reads it", and "the blocking command taking the number of an account as well, or a command in the code printing the address for a number — a change of the code and the tests of the account server; a step that leaves the address to the human — a query written to the database from nothing on the day of a failure". I did not copy the finding's "three programs": D-112 names four commands now.
- **I3, fixed.** Step 8 (both copies) takes "of its `account-blocked` and `account-unblocked` lines only the latest by its time, not by its place in the output: the file is printed before its older copy `.1`, and a line of the human's `account-block` run is written when the command runs, before the lines of the container for the same period, which come with the next deployment"; the action sentence says "the latest" too.
- **I4, fixed.** The `tail -n 20` is replaced by `grep -F -m 50 'warning: the dump of the log of both loop2 services' /var/log/loop2-deploy.log` (the string is the one `deploy/loop2-deploy:357` writes). Each printed line has its UTC time; a line later than the time of the backup belongs to a deployment, step 6's included, whose container's period (from the deployment before it to that deployment) is unknown, and the human writes each period down and treats it as the second part does. D-360's *Rationale* now says that the events since the backup stand in the record "save those of a container whose log was not appended" and that a failed append of any deployment since the backup loses the lines of that container.
- **M1, fixed.** D-112's new sentence is a paragraph of its own after the first one; the first paragraph is word for word as before, so the five tests quoting it still match.
- **M2, fixed.** D-235: "A human checks the agreement with Strych when the backup script's way of talking to it changes, and the agreement with `pusher` when the way either script talks to it changes."
- **M3, fixed.** The time of the backup is the time of the `start` line of the run whose `made:` line names the weekday file, is followed by `end: sent` and whose time agrees with the file's time of step 1, with the reason in brackets (the `made:` line stands after the copy, and a night whose send failed has one for a file Strych does not hold).
- **M4, fixed.** D-360's third binding sentence now reads: "Where the log names no account, as for a period whose log is lost, for a block made with no line written, and after a restore on a new server, which has no such log and no such step, whoever is known to have reset a password since the backup resets it again, an account known to have been blocked or unblocked since is blocked or unblocked again, and the restore procedure ends by saying so." That is what the second part of step 8 does in every case.
- **M5, fixed.** `guidelines/testing.md:60` lists the stand-ins of each script: "(skryptu kopii: `docker`, `age`, `rsync`, `pusher`; skryptu czuwania: `docker`, `pusher`, `flock`, `date`)".

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` ("0 errors"; it still lists `account-email-nodemailer-starttls`, which the request names) | 0 |
| `python -B .the-way/instruction-files/check_instructions.py` ("0 error, 147 warn, 7 info", the same count as before the fix) | 0 |
| `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill` | 0 |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | 0 (identical) |

The foundation check also reads the `decision:` quotations of tests against the binding sentences, so it covers the tests that quote D-112 and D-360; no quoted sentence of the changed decisions was altered except the third sentence of D-360, which no test quotes (`grep` over `tests/` found no `decision: D-360`). `npm test` not run, as the handoff says.

## Own-work check

- **Requirement most likely wrong:** the new text of step 8 about the order of lines (I3) and the warning search (I4), since they rest on the behaviour of the dump and of the files.
- **Check:** the search string against `deploy/loop2-deploy:357` (the exact words), the deploy log's line form against `log()` at `deploy/loop2-deploy:79-84` (UTC time first), and the three paragraphs of the step against the findings' reasoning (`SKILL.md:490-505` for the wrapper's immediate append, `deploy/loop2-deploy:339-344` for the container lines at the next deployment). It showed the string and the line form agree with the script.
- **Not checked:** the commands on the real server.

## Choices

- The finding of I2 quotes "three programs"; I wrote the cost without a count because D-112 names four commands today.
- For M4 I put the clause into the third binding sentence of D-360 (the paragraph still holds three sentences) rather than adding a fourth.

## Reaches beyond the dispatch

- `deploy/loop2-deploy:79-84` and `:357`, to confirm the log line form and the warning's words.
- `grep` of `tests/` for `decision: D-360`.

## Working copies

None made in this round; `.runs/author/` is empty.

## Unread material

none beyond the files of the handoff: the findings file, the handoff and `fix.md` of the method were read whole. I did not re-read `reports/review-whole-report.md` (the findings file quotes it).

## Searches not found or unclear

- The finding I2 says D-112 says "three programs open the database"; the text of D-112 names four commands (blocking, previous-save privilege, role, backup). Not an error of the work; noted.
- No decision or invariant cites the wording of the old line `tail -n 20`; nothing else needed a change.
