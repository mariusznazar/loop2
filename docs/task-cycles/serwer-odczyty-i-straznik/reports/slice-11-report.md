# Report - slice 11 of the task cycle `serwer-odczyty-i-straznik`

**Status:** done with concerns (concerns: the one unsettled part of D-153 and the fact that no entry names the new fact yet; both in "For the return step").

## Files and commits

- `foundations/invariants.md` - +1 / -1: the sentence of `account-email-via-outsider` narrowed. Method, Rests on, Derives from, Part, Violated unchanged.
- `foundations/environment_facts.md` - +6 / 0: new entry `loop2-app-log-password-reset-mail-events` before `## Withdrawn identifiers`.
- Commit `b5a316f3` on `task/serwer-odczyty-i-straznik` (added by path, two files). Base `628e637b`.

New sentence of the invariant: "The Compose file of loop2 gives the `app` service, for the messages it sends to players, a sender address under `mariusznazar.com` (`LOOP2_MAIL_FROM`) and the SMTP server `outsider.mikr.us` (`LOOP2_SMTP_HOST`)." Checked against `compose.yaml`: `LOOP2_MAIL_FROM: loop2@mariusznazar.com`, `LOOP2_SMTP_HOST: outsider.mikr.us`. *Method* stays `review` (no test written, as the slice says); *Rests on* stays `mikrus-outsider-mail` (the host name is a value copied from it).

## Readings on the server (all through `mikrus` `exec`, one at a time, run 2026-11-14)

Server: `<server>` (the id was taken from the tool's own schema; no `servers` call was needed and none was made). Account identifier replaced by `<account>`. The tool HTML-escapes `"` as `&quot;`; the fact quotes the plain character (the escaping is the tool's, as in slice 5), and collapses the padding spaces after `loop2` to one.

| # | Command (host `<server>`) | Raw output |
|---|---|---|
| 1 | `grep -F -m 50 -- 'password-reset' /var/log/loop2-app.log` | `loop2 | 2026-11-13T23:03:05.952126792Z {"event":"link-issued","accountId":"<account>","linkPurpose":"password-reset"}` and `loop2 | 2026-11-13T23:03:06.406314841Z {"event":"message-sent","accountId":"<account>","linkPurpose":"password-reset"}` (two lines) |
| 2 | `grep -F -m 50 -- '"failure":"mail"' /var/log/loop2-app.log` | empty |
| 3 | `grep -F -m 50 -- 'message-sent' /var/log/loop2-app.log` | the `message-sent` line of reading 1, alone |
| 4 | `grep -F -m 50 -- '"linkPurpose":"password-reset"' /var/log/loop2-app.log` | the same two lines as reading 1 (positive control: a pattern with the quotes in it matches in this file, so the empty reading 2 is not an artefact of quoting) |
| 5 | `grep -F -m 50 -- 'link-issued' /var/log/loop2-app.log` | the `link-issued` line of reading 1, alone |
| 6 | `grep --version \| head -1` | `grep (GNU grep) 3.7` |

Exit codes of the server commands are not shown by the tool and nothing was added to a command to print them. The rotated files were not read (the slice asks for the current file; the lines of the owner's test are in it).

## Checks

| Check | Command | Exit |
|---|---|---|
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`), run after both edits |
| private paths | `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` | 0 (`Ran 1 test ... OK`) |
| server identity in the diff | `git diff \| grep -c -i -e 'joanna' -e '273' -e 'srv31' -e '7f52ba10'` (id, name, dedicated machine, port base, and the account id) | prints 0 (grep exit 1 = no match) |

No test was written, so no failing run exists. The whole gate was not run, as the handoff says.

## Own-work check

- Requirement most likely not met: the fact says no more than the reading says (the log shows that the application handed a reset message over; it does not show arrival in an inbox), and the sentence of the invariant is true of `compose.yaml`.
- Check: both quoted log lines were searched in the file word for word with `grep -c -F` (1 and 1); the sentence's two values compared with `compose.yaml` (match); the time between the two lines is 0.454 s (23:03:05.952 to 23:03:06.406), so "within one second" holds; the fact's claim of "no other line" rests on readings 3 and 5, each of which returned one line only (with `-m 50`, so fewer than 50 matches in the file). The fact's date claim: log time is UTC 2026-11-13 23:03, which is 2026-11-14 00:03 in Poland, the date of the human's result.
- The fact deliberately does not say the message reached an inbox and does not name the account.

## Choices

- The invariant names the variable names (`LOOP2_MAIL_FROM`, `LOOP2_SMTP_HOST`) so that a reader finds the lines of `compose.yaml` it speaks of; "an address under `mariusznazar.com`" follows D-153's wording and does not copy the full address. Rejected: naming the full address `loop2@mariusznazar.com` (a copied value that would need `Rests on` and a second change when it moves). Cost if wrong: the sentence is slightly less exact about the address; no test depends on it.
- The fact's sentence is built on the grep results of the whole file (`-m 50` leaves the whole file in reach because the matches are one or two). Rejected: `tail -n 200` (would not reach 2026-11-13 reliably).
- The fact's identifier names the subject, not the value: `loop2-app-log-password-reset-mail-events`.

## Reach beyond the handoff

- `.the-way/task-cycle/change/slice.md` (the skill's variant file for a slice).
- The skills `the-way-record-invariant` and `the-way-record-environment-fact` and the files they name: `.the-way/elements/invariants/skill/{SKILL,decide_entry,draft,write}.md`, `.the-way/elements/invariants/template.md`, `.the-way/elements/environment-facts/skill/{SKILL,read,decide_entry,draft,write}.md`, `.the-way/elements/environment-facts/template.md`, `.the-way/elements/common/{way_of_working,rules}.md`.
- `foundations/environment_facts.md`: the last 70 lines and the headings, to place the entry and follow the form of earlier readings.
- `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-5-report.md` (the form of "For the return step" and the quoting conventions).
- `git show 628e637b -- foundations/invariants.md` (the style of the earlier narrowings).
- A grep of `foundations/`, `.claude`, `tests`, `scripts`, `src`, `deploy` for `account-email-via-outsider` and `mikrus-outsider-mail`: the invariant is named only by D-153's *Verification*; no test cites it.
- `the author's private rule file on git` (the hook required it before the commit).

## Problems and concerns as observed

- The new fact is named by nothing yet. The template says a fact stands only while an invariant's *Rests on* or a decision's *Based on* names it, and the file's own withdrawn list withdraws facts with no dependant. `foundation_check.py` raised no error. The handoff forbids editing a decision, so the naming is left to the return step (below). If the return step does not name it, it must be withdrawn.
- D-153's *Verification* names `account-email-via-outsider` and says "complies: both message types from the intended container reach external inboxes before public self-service account recovery is enabled". The narrowed invariant no longer carries any of that; the decision keeps its sentence and its verification, so what it asks for is now checked by nothing in the foundation except the new fact (and only for the reset message).

## Unread material

- `compose.yaml`, `task.md:30` and `task.md:120`, `foundations/invariants.md:918-926`, `foundations/decisions.md:3138-3152` (D-153, whole at the current range), `foundations/environment_facts.md:432-436`, `.claude/skills/loop2-deploy/SKILL.md:45-107` and `:201-250`: read whole.
- `foundations/invariants.md` and `foundations/environment_facts.md`: not read whole (1344 and 882 lines); read the passages above, the last 70 lines of the facts file and the headings. The skills select entries by part and link; the only entries linking to `account-email-via-outsider` found by search are D-153 and the fact `mikrus-outsider-mail`.

## Searches not found or unclear

- No `grep`-able record of a confirmation-message send (`linkPurpose` of an address confirmation) exists in the current file: `link-issued` has one line in the whole file. I did not look in the rotated files (the slice names the current file; the human's result concerns the reset message only).
- The skill's list has no `grep --version` reading outside "for a reading in an environment fact only"; I ran it only for the fact, as the list says.
- Not clear: whether the `mikrus-outsider-mail` fact (a documentation page) should stay in *Rests on* of the narrowed invariant; I kept it because the host name in the sentence is a value copied from it.

## For the return step

Dates are the date of the readings, 2026-11-14.

- `loop2-app-log-password-reset-mail-events` - should be named in *Based on* of **D-153**. The reading: in `/var/log/loop2-app.log` of the test server's host the only `link-issued` and the only `message-sent` lines are a pair with `linkPurpose` `password-reset` at 2026-11-13T23:03 UTC (0.454 s apart, the same account), and there is no line with `"failure":"mail"`. It agrees with the human's result of 2026-11-14 (a reset message from the public address reached an external inbox). What the log shows is that the application handed the message to the mail service without a failure line; that it reached the inbox is the human's observation, not a reading.
- **What D-153 stays unsettled on:** its sentence says public self-service recovery is enabled only after confirmation **and** password-reset messages from the intended container reach external inboxes. The human's result covers the reset message only; the confirmation message (the one sent when an account is created) is not in it and no log line of it exists in the file (the file holds one `link-issued` only). I do not claim it. D-153's *Verification* "complies" clause also speaks of both message types, and its invariant no longer carries any delivery part, so that clause is checked by no entry; the decision's text is for the return step, not for this slice.
