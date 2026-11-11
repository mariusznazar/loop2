# Author report — odtwarzanie-bazy-z-kopii (make-change, the whole change as the one author)

**Status:** `done` (after the orchestrator's reading for item 16 arrived: `0`, `grep (GNU grep) 3.7`,
2026-11-11 about 09:48; the earlier `questions` status is closed).

## Commits (branch `task/odtwarzanie-bazy-z-kopii`, base `f672c7b`)

- `08f7a06` docs: the instruction (`.claude/skills/loop2-deploy/references/backup_and_restore.md`,
  `.claude/skills/loop2-deploy/SKILL.md`, and the same two files under `.agents/skills/loop2-deploy/`,
  byte for byte equal).
- `aa15552` docs: decisions D-360 (settlement row 1) and D-361 (settlement row 2) in
  `foundations/decisions.md`.
- `76120d8` docs: the environment fact `loop2-host-ssh-host-key-options-unset` in
  `foundations/environment_facts.md` and D-238's *Based on* pointing at it in
  `foundations/decisions.md`.

## What was done per item of *To do*

| Item | Done |
|---|---|
| 1 | The bullet "A size near 200 bytes" now says the script does not stop it: its checks stop a failed `docker`/`age` (exit 6) and an encrypted file missing or zero bytes (exit 7); a 200-byte file is neither, is sent and replaces the weekday file. Grounded in `deploy/loop2-backup` (`require_whole_file`) and `tests/invariants/test_account_save_backup_encrypted.py` (`age_ends_well_on_an_empty_file` is the zero-byte case). |
| 2 | New row `1` in the exit table (no stage sets it; logged for a signal no trap names; the header of `deploy/loop2-backup` says bash then ends with that signal's status). Row 6: "the line before it" replaced by "just above the `stage stream` line, in lines with no time in front" (docker's and age's stderr go raw to the log file before `fail` writes the line). |
| 3 | Install step 2: the no-merge window holds only while the deployed commit carries a change of the backup command that `main` lacks; otherwise only a commit from before the backup command must not be deployed. No "this request's merge". |
| 4 | Install step 5: write nothing else into root's or the system-wide SSH configuration; never `KnownHostsCommand` or `VerifyHostKeyDNS` (adds host-key sources beside the one file of step 6, D-238). |
| 5 | `age` from the zip: `$env:PATH += ';<folder holding age.exe>'` once per window; step 1 gives `New-Item -ItemType Directory` and `Set-Location`; step 8 has one `icacls` row per key file; also added the "version of the saved game" limit and rewrapped the two lost-wrap places (docker build step 4, `Remove-Variable` line). |
| 6 | See "Choice for item 6" below. |
| 7 | Step 2: a backup from before a key change is refused by `age` with the current key; use the old key from the private note, written with `( umask 077; cat > /root/loop2-restore/old-key )` (no argument, no history), removed with the directory in step 7. |
| 8 | Step 5: `install -o 1000 -g 1000 -m 0600 /root/loop2-restore/accounts.sqlite <volume directory>/accounts.sqlite` (0600 and uid/gid 1000 as `scripts/restore-trial.mjs` `setupScript` writes the database). |
| 9 | Paragraph "A second attempt after a failed one" (do not repeat `mkdir` or the move into `previous`; remove the restored files from the volume instead). The two lines that lost their wrap are wrapped. |
| 10 | Bold paragraph before the steps: from step 3 until step 7 passes (or the way back ends) merge nothing and push nothing to `main`, run no deployment but step 6's; what a push would do; what to do if one started (take the run as a failed attempt). |
| 11 | "Restoring" paragraph and the trial's "Not proven" list name the version of the saved game (`SAVED_GAME_VERSION` in `src/browser/sim/saved-game.ts`, D-96): passes the schema check and the trial (which only looks for the marker), the game replaces such a state with a new game. The number 3 is deliberately not written into the text. |
| 12 | "What the undoing does to access" in "Restoring" (reset, block, no mass sign-out); step 8 has two bullets: reset again for each known account (today the owner's; the instruction names no way to find others), block again the accounts blocked since the backup. |
| 13 | "With no server" step 3: session keys written whole from the private note's copy (`cat > ...`, `chown root:1000`, `chmod 0440`, `stat` expects `root 1000 440`), no new key from "Creating the file" or "Rotating"; step 4: covers both a missing `pusher` and a `pusher` that runs but whose message does not arrive. The text avoids the word `push.mikr.us` because the twin test forbids any `mikr.us` in the skill. |
| 14 | One counting command in "What an agent may read" (see below), `SKILL.md` allowed list and the "no reading" list updated to match; "Never" line says the count is the only reading. |
| 15 | **Not done, by the handoff.** `The procedure has never been tried.` stays. Item 15 and the acceptance criterion's "places where Mariusz got stuck" wait for the human's trial and come in a correction after the request. |
| 16 | Done in `76120d8`: fact `loop2-host-ssh-host-key-options-unset` (placed after `loop2-host-installed-command`), D-238's *Based on* gets the identifier after `openssh-extra-host-key-sources`. |

Settlement rows 1 and 2: written whole as D-360 and D-361 (kinds `row 1`, `row 2`); each with one sentence below.

- D-360 `row 1` — meaning (EN): a restore signs nobody out; whoever reset a password since the backup resets it again, because anyone who knows the old password signs in again anyway. (PL): odtworzenie bazy z kopii nikogo nie wylogowuje; kto od czasu kopii resetował hasło, resetuje je jeszcze raz.
- D-361 `row 2` — meaning (EN): an agent reads root's and the system-wide SSH configuration only as the count of lines setting `KnownHostsCommand` or `VerifyHostKeyDNS`, never their content. (PL): agent czyta konfigurację SSH roota tylko jako liczbę takich wierszy, nigdy treści.
- Search of the whole foundation (grep for `restor`, `SSH configuration`, `KnownHostsCommand`, `VerifyHostKeyDNS`, `known-hosts`): no entry already states either settlement and none collides. D-12 allows reading and bans no form of it, so D-361 only narrows the form, relation written as `derives from D-12 · derives from D-238`; D-13 is not collided with by D-360 (it is the rejected way). No glossary term was needed. The *Rejected* of both holds only the ways the task's *Questions to settle* and the row's *Source* keep.

## Foundation entries (meaning in English and in the task document's language, marker as `foundation_step.md` gives)

- D-360 — `row 1`. EN: a restore of the database signs nobody out; whoever reset a password since the backup resets it again, because anyone who knows the old password signs in again anyway. PL: odtworzenie bazy z kopii nikogo nie wylogowuje; kto od czasu kopii resetował hasło, resetuje je jeszcze raz, bo kto zna stare hasło, i tak się zaloguje.
- D-361 — `row 2`. EN: an agent reads root's and the system-wide SSH configuration only as the count of lines setting `KnownHostsCommand` or `VerifyHostKeyDNS`, and never their content. PL: agent czyta konfigurację SSH roota i systemową tylko jako liczbę wierszy ustawiających `KnownHostsCommand` albo `VerifyHostKeyDNS`, nigdy ich treści.
- `loop2-host-ssh-host-key-options-unset` — `the cycle's`. No row and no projected entry carries it whole: task item 16 (loop2#046-45) names the fact, but its *Source* is the reading, which the cycle's orchestrator took. EN: root's and the system-wide SSH configuration on the test server's host, with the files their `Include` lines name, contain no line setting `KnownHostsCommand` or `VerifyHostKeyDNS`. PL: konfiguracja SSH roota i systemowa na hoście serwera testowego, razem z plikami dołączanymi przez `Include`, nie ustawia `KnownHostsCommand` ani `VerifyHostKeyDNS`. Source: the reading of the command of the instruction at `08f7a06` ("What an agent may read"), text word for word, run by the orchestrator through the `mikrus` MCP `exec` (D-12: not by me; I ran no `mikrus` tool) on 2026-11-11, output `0`, `grep (GNU grep) 3.7`. The entry states what the command counts, including the fail-closed cases (an `Include` word it cannot follow, nesting deeper than 16, each count 1). I verified by script that the command text in the entry equals the block of the instruction at `08f7a06`.
- D-238 change (*Based on* gains `loop2-host-ssh-host-key-options-unset`) — `the cycle's`; task item 16 asks for it, the binding sentences, *Rationale* and *Rejected* are unchanged, so nothing follows from it (no decision or invariant needs a new edit; D-361 already derives from D-238).
- Search of the foundation for the fact (identifier, `SSH configuration`, `KnownHostsCommand`, `VerifyHostKeyDNS`, withdrawn identifiers): no entry on the same thing and no withdrawn identifier of that name; the facts `openssh-extra-host-key-sources` and `openssh-option-order` stay as they were (they are about the tool's behaviour, the new one about the host's state).

## Choice for item 6 (to enter in the questions table)

Question: how step 1 reads which backup is the newest when D-230 says nothing reads the destination's list of files.

- **Chosen:** the human fetches all seven weekday files under their fixed names with one `rsync` that has the options of the script's own send (batch mode, strict host-key checking, `UserKnownHostsFile=/etc/loop2/strych-known-hosts`, `GlobalKnownHostsFile=/dev/null`, `--whole-file --times --timeout=120`, `ConnectTimeout=30`) into `/root/loop2-restore`, then reads the newest as the first row of `ls -l -t --time-style=long-iso /root/loop2-restore/loop2-accounts-*.sqlite.age`. The file time is the time of the night's file on the game server, kept by `--times` (D-230: "Which backup is the newest shows in the file's time"). No listing of Strych is read (the script test treats `--list-only` as a violation of D-230).
- **Not chosen:** reading the newest from `/var/log/loop2-backup.log` (last `end: sent`). It does not exist on a new host, which is exactly the case where the restore is needed (path "With no server"), and it records what was sent, not what Strych holds. The instruction keeps it as a cross-check ("while the log exists ... should agree").
- **Cost if wrong:** the fetch moves up to seven files (at most about 25 MB each, encrypted) instead of one; they lie in the 0700 private directory and are removed with it in step 7. The rsync behaviour on a missing weekday file (exit 23, others fetched) is written from the exit table of the script's send and not tried here (no `rsync` on this computer).

## Item 14: the counting command and its test

Final text: the `sh` block under "What an agent may read" in `.claude/skills/loop2-deploy/references/backup_and_restore.md` (the block that starts with `bash -c '`); the same text is in `the cycle's scratch folder, sshcount/cmd.txt` (verified equal to the block, byte for byte, by a script). It prints one number. It counts, in `/root/.ssh/config`, `/etc/ssh/ssh_config` and every file they pull in with `Include` (wildcards expanded; relative paths from `/root/.ssh` or `/etc/ssh`, as `ssh_config(5)` gives it, read at the pinned OpenSSH commit; `~/` as `/root/`; depth up to 16 of my own choosing), lines whose first word is either option, any letter case, followed by space, tab, `=` or end of line, skipping lines whose first non-space character is `#`. A word of an `Include` line it cannot follow (variable, `%` token, quote, trailing comment) and a nesting deeper than 16 count 1 each, so it never shows 0 for a configuration it could not read through.

Tested with fake trees (`...\sshcount\test_cases.sh`, 17 cases: none set, missing files, plain root line, any case and `=`, comment lines, system-wide line, relative include with wildcard, nested includes, `~/` include, absolute include elsewhere, commented-out include, self-include loop, unresolvable words, keyword inside another option, keyword as prefix of another word, both files): all 17 passed. Control: with the `Include` recursion switched off 5 cases failed; restored, 0 failed. The command text differs from the tested text only in the three fixed paths (substituted by `run_test.sh`). Tools: Git Bash on this computer (GNU bash 5.3.15 Cygwin, GNU grep 3.0, GNU sed 4.9); the server has bash 5.1 and grep 3.7 (D-fact `loop2-host-forced-command-entry` quotes grep 3.7); the server's own `sed`, `tr` and `bash` may differ. `-i`/`-E` of grep, `sed -n -E ... I` (GNU) and `tr -s` are used.

## Questions

None open. Closed after the orchestrator's answers: the reading for item 16 was taken (`0`, grep 3.7) and the newlines of the multi-line `bash -c '...'` were not mangled by `exec`, so no one-line form is needed.

## Own-work check (section 3)

- Requirement most likely not met: "Every command, path, mode, exit code, name and number you put into the instruction is taken from the repository's code or from the foundation" and the item 14 count never says 0 for an option that is set.
- Checks: (a) the 17-case test above with the negative control (5 failures with recursion off); (b) `bash -n` on all seven `sh` blocks extracted from the instruction, exit 0 each; (c) block of item 14 equal to the tested text; (d) brace expansion `host:loop2-accounts-{1..7}.sqlite.age` printed in `bash`; (e) the exit handler shape of the script run with SIGQUIT: logged `end: failed (exit 1)`, and on this Cygwin bash the process status was also 1, not 131 (so the claim "the status can differ" rests on the script header only, which the instruction attributes to the header; not verifiable here, no Linux).
- Not run: `rsync`, `ssh`, `age` (none on this computer), `shellcheck`, the whole gate (the orchestrator runs it).

## Checks run (command and exit code)

- `python -B tests/agent_workflow/test_loop2_deploy_skill.py` — exit 0 (5 tests OK) after the instruction edit.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 0 ("0 errors"), run after the edit of the instruction and after the two decisions.
- After the fact and the D-238 change: `python -B .the-way/elements/common/foundation_check.py` (without `--skip-test-citations`, because no invariant now reads `test` without a citing test) — exit 0, "0 errors"; and the same with `--skip-test-citations` — exit 0, "0 errors".
- Script check that the command text in the fact equals the block in `08f7a06:.claude/skills/loop2-deploy/references/backup_and_restore.md` — printed `True`.
- `bash test_cases.sh` in the scratchpad — exit 0; the control run — 5 `FAIL` lines, then 0 after restoring.

## Reaches beyond the dispatch

- Read the-way's own `ssh_config.5` (via WebFetch, pinned commit already cited by `openssh-extra-host-key-sources`) for the `Include` relative-path rule: "assumed to be in ~/.ssh if included in a user configuration file or /etc/ssh if included from the system configuration file". Why: the command resolves relative paths. No maximum depth is stated in it; 16 is my own bound.
- Read the task source `uwagi_z_pr_2026-11-06.md` in the vault (rows of the remarks 046-18 to 046-93, 046-45) for what N1/N2/N3 and C1/C2 mean. Why: the task names them only by label.
- `setup_and_secrets.md` lines 1-340 and 575-621 (the sections the instruction links to). `tests/deploy/test_loop2_backup.py` and `tests/invariants/test_account_save_backup_encrypted.py` by grep for the empty-file case and `--list-only`.

## Unread material

- For the entries of the foundation step: of `.the-way/elements/environment-facts/template.md` I read the beginning, "Where entries go", "Form of an entry", "Which facts are written", "The sentence" and "Source" up to the rule on a passage spread over several places, and the end ("Changing a fact", "Withdrawn identifiers", "Catalogues and obligations", "Fields and their readers"); the console cut about 9 000 characters of the middle of the concatenated output of the skill files and the template (the rest of "Source"), which I did not re-read. I did not read the-way's own `foundations/environment_facts.md` examples. `.the-way/elements/glossary` and `invariants` skills were not needed.
- For the decisions: read `.the-way/elements/decisions/template.md`, the skill, `decide_entry.md`, `read.md`, `examples.md` and `elements/common/rules.md` whole; the example WAY-03 in `.the-way/foundations/decisions.md` whole; other examples not read.
- D-234's *Rejected* tail and D-209's *Rationale* tail: the first range printed was cut at the end (read to "...a" and "...as long as the"); the binding sentences, fields and the rest were read.
- D-252, D-355, D-356 (scope names `agent-workflow`, bear on logs, not on the backup instruction): not read.
- Invariants: read `account-save-backup`, `-encrypted`, `-failure-notice` whole; the other invariants whose *Part* names `agent-workflow` only by their identifiers. No invariant of `product-foundation` found.
- `setup_and_secrets.md` lines 340-575; `troubleshooting.md` (only grepped for the restore and "never tried" mentions); `.claude/skills/loop2-deploy/SKILL.md` was read whole; `src/browser/sim/saved-game.ts` only lines around 75 and 1313 by grep, `src/browser/view/app.ts` lines 35-100, `src/server/account-policy.ts` lines 15-35.
- `part_map.md`: the agent-workflow and product-foundation entries, by grep, not the whole file.

## Searches not found or unclear

- `.the-way/elements/environment_facts/skill/SKILL.md` (the path I guessed first) is absent; the element's directory is `.the-way/elements/environment-facts/` (with a hyphen). Not a gap in the process, only the name.
- The template's *Source* form for a reading shows one-line commands; the command of item 14 has 25 lines. I put it into the entry word for word across lines inside one code span; the foundation check accepts it. If the human prefers a one-line form, the entry's command would no longer be the one run.
- `task-cycle/change/SKILL.md` at the process root is absent; the product's copy is `.the-way/task-cycle/change/SKILL.md` and I read that (the skill's own text says "in a product, the pinned `.the-way`").
- Item 15 and the acceptance criterion's "places where Mariusz got stuck": cannot be done in the cycle (as the handoff says).
- Real behaviour of `rsync` with a missing source file, and of bash on Linux for the signal case (code 1 versus the signal status): cannot be tried on this computer; the instruction states the first from the script's own exit table ("23 partial transfer") and the second attributed to the header of `deploy/loop2-backup`.
- The word of item 13: "nowe z sekcji rotacji" — in `setup_and_secrets.md` a rotation keeps the old keys, and only "Creating the file" makes a first new key; the instruction names both sections as not to be used.

## Choices and their cost if wrong

- Item 3: stated when the no-merge window really holds (an unmerged change of the command), not "never". If wrong (a case I did not see), a merge during a reinstall deploys code without the command change; cost low, the nightly run fails with a notice.
- Item 12: block-again step added to step 8 beyond settlement row 1 (it is in *To do* 12); the decisions hold only row 1 and row 2.
- Item 14: the count fails closed (unfollowed `Include` words count 1). If wrong, a harmless trailing comment on an `Include` line shows 1 and the human looks; the other way (false 0) is the case the task forbids.
- Item 5: the `$env:PATH` way instead of the full path of `age.exe` for the zip; local to the window.
- Did not touch `deploy/**`, code or tests.
