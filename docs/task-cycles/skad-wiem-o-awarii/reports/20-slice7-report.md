# Report 20-slice7 — the `loop2-deploy` skill: record, alerts and the human's steps

**Status:** done (with one finding for the orchestrator, see "Problems as observed")

## Commits

- `c493ba8` docs: :memo: say in the loop2-deploy skill where the game's log lies, how long it lives, the three ways the owner learns of a failure and the human's steps to install the record and alerts (on `task/skad-wiem-o-awarii`, base `fc493baafaf8674c75202e270945c63c650fe633`; not pushed)

## Files changed (added / removed lines, per copy; the two copies are byte-identical)

- `.claude/skills/loop2-deploy/SKILL.md` and `.agents/skills/loop2-deploy/SKILL.md`: +154 / -2 (in all, 518 insertions and 10 deletions over the six files)
- `.claude/skills/loop2-deploy/references/setup_and_secrets.md` and the `.agents` copy: +101 / 0
- `.claude/skills/loop2-deploy/references/troubleshooting.md` and the `.agents` copy: +4 / -3 (some lines reflowed)

What each gives:

- `SKILL.md`: four new rows of the resource table (dump file and its rotation file, watcher script and schedule, watcher log, state directory and lock, the scheduled check); a new allowed-reads bullet for the record and a new not-allowed bullet (writes to those files, the state file's content, running the watcher, `docker logs` of a replaced container, rotation by hand); the pointer to the new setup section; the `dump:` and `warning:` lines in *Seeing deployments*; a new section *The failure record and alerts* (where the log lies, how long each part lives, how an agent reads it, the three ways with a table mail subject -> kind -> what to read, the accepted gaps, the four limits of the check, the two messages on one outage, `accountId` retention, what no test proves); the A4 command beside the plain one in *Blocking a player account* with its explanation and residual risk; the rollback consequences; `description` now 394 characters (was 370).
- `references/setup_and_secrets.md`: one section *The failure record and alerts* with the human's ordered steps 1-7 of E3, each with its command and its check, the abandonment note, the pre-merge reinstall of `loop2-deploy` (step 3) and a closing paragraph on what no test proves.
- `references/troubleshooting.md`: *Installed-script warning* names the six installed copies now compared.
- No deploy-account name, server name, port, IPv6 literal or `mikr.us` name; the deploy account is `<run account>` (from the private note). No new reference file.

## Checks

- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` -> exit 0 (5 tests OK: four files each, byte-identical, description under 400, no IPv6 literal or `mikr.us` name).
- The A4 filter tried by hand in Git Bash on made-up lines, first as a standalone copy (script `a scratch directory of the orchestrator's session`), then again with the command lifted from the committed `SKILL.md` lines 347-354 (`...\scratchpad\a4_skill_trial.sh`), `docker` replaced by a stand-in that prints a chosen output and exit status, the dump path by a temporary file. Both runs exit 0 and gave the same result:

  | Made-up output | In the file? |
  |---|---|
  | the sentence of a block, then `{"event":"account-blocked","accountId":"7"}` | the event line only, prefixed by UTC time and `account-block |` |
  | `{"event":"account-unblocked",...}` then a sentence | the event line only |
  | `{"failure":"account-block","kind":..,"code":..,"place":..}` then a sentence (stand-in exit 1) | the failure line only |
  | `{"event":"account-x"}@b.c was already blocked; it has no session.` (address begins like an event) | nothing (does not end with `}`) |
  | `{"failure":"account-block"@b.c was not blocked; nothing changed.` | nothing |
  | `{"event":"account-blocked","accountId":"7"` (no closing brace) | nothing |
  | `{"a":1}` (bare brace) | nothing |
  | `{"failure":"uncaught",...,"place":"account-block"}` | nothing (not one of the two starts) |
  | an address typed with a line break so that the middle line is a whole `{"event":"account-...}` line | **that line passes** (see below) |
  | no output; CRLF-ended event line | no output: nothing; CRLF: nothing (the `\r` means the line does not end with `}`) |

  `bash -n` on the trial script: ok. The terminal output equals what the plain command prints (the command's output is printed first, unchanged), followed by `exit <status>`.
- Not run: the whole gate, `foundation_check.py`, `npm test` in full (the orchestrator runs them); any shellcheck of the skill's command (it is skill text, not a repository script, and no test runs it).

## Own-work check (section 3)

- Requirement most likely not met: the A4 command passes only the command's own JSON lines (S1: begins with one of the two exact starts and ends with `}`), so an address cannot get through.
- Check: the made-up lines above, including the imitation cases.
- Result: it held for an address that begins like a JSON line (all four sentences of the command end with a full stop, so the closing-brace condition alone shuts that out; the exact start is a second guard). It did **not** hold for an address typed with a line break inside it (second paragraph under "Problems as observed"). The skill now names that residual risk.
- Second requirement checked: the skill names only things that exist in the code at this head. I read the constants of `deploy/loop2-watch` (subjects, state file `state` under `/var/lib/loop2-watch`, log line types `skipped:`, `run:`, `dropped:`, `stage`, `end: failed`), `deploy/loop2-deploy` (the `dump:` and `warning:` texts, the header `<time> loop2-deploy | previous commit X, new commit Y`, the six compared copies) and `deploy/loop2-app.logrotate` (so `.1` plain, `.2.gz` to `.4.gz`).

## Reaches beyond the handoff

- `deploy/loop2-deploy`, `deploy/loop2-watch`, `deploy/loop2-watch.cron`, `deploy/loop2-app.logrotate`, `.github/workflows/check-address.yml`, `src/server/account-block.ts`, `src/server/log-line.ts`: read to word the skill from the real text (subjects, line shapes, file names, which streams `account-block` writes). Not in the *Read* list; needed so the skill names nothing that is not there.
- `foundations/decisions.md` D-12, D-13, D-16, D-137, D-352, D-353 and the three invariants and two environment facts at the given ranges: read as named. D-233 and D-252 (named in *Read*) I did not reopen beyond the quotations the spec makes of them; `.claude/skills/loop2-deploy/references/backup_and_restore.md` read for the style of the installation steps and the abandonment note.
- `grep` of `deploy/loop2-backup` for the lock path: to confirm that the nightly backup holds `/run/loop2-deploy.lock` (the spec says so; confirmed at line 38).

## Problems as observed

1. **The spec's residual-risk sentence is narrower than the real one (A4).** The spec says an address "would have to begin with one of the two exact starts" to pass. Tried by hand: an address that begins that way does not pass, because every sentence of the command ends with a full stop and the filter requires `}`. But an address typed on purpose with a **line break** inside (one `@`, text on both sides, a middle line that is a complete `{"event":"account-...}` object) does pass, because the sentences print the address and the filter reads line by line. Cause verified by the trial above, not guessed. I worded the skill to the real risk ("an address that the human types on purpose with a line break inside ... Type the address as it is registered"). A stronger filter would need a check that the command's output is exactly one sentence line plus the JSON lines, which is more shell for a command the human types; I did not add it. If the orchestrator wants it closed, say so; the cost is one more condition in the command.
2. **A crash line of the command is not appended.** `account-block.ts` installs the last-resort handler `installLastResort("account-block")`, whose line begins `{"failure":"uncaught"`, not `{"failure":"account-block"`. The spec names exactly two starts, so I followed it and the skill says in one sentence that this line is not appended. No change proposed; noted so the decision is visible.
3. **My first edit wrote real line breaks into the `printf` format strings of the A4 command** (an escaping slip in my editing script, not in the spec). Found when the extracted command looked wrong in the trial, fixed to a literal backslash-n before the commit; the committed text is the one tried by hand.

## Choices made

- The new section stands before *Blocking a player account*, so the blocking section can refer to the dump. Rejected: after *Rollback* (the blocking command would point forward to a section the reader has not met). Cost if wrong: a different order of headings only.
- The A4 command keeps the command's terminal output and adds `exit <status>` rather than returning the status, because a command pasted into a shell cannot both print and `exit`. Rejected: `tee >(...)` (asynchronous: the file may be written after the prompt returns, and the process substitution fails in `sh`). Cost if wrong: one extra line on the terminal.
- Step 2 of the human's steps puts one trial line (`logrotate trial`) into the dump file so that `notifempty` does not skip the forced rotation. This is my reading of `notifempty`'s effect on `-f`; I did not verify whether `-f` overrides it. The line ends up in the first rotated copy and ages out with it. Cost if wrong: one harmless line in the file.
- Step 6 says "If the 'Run workflow' button is not offered before the merge, do this step after it" instead of claiming where GitHub offers the button, because I have no source in the foundation for that and did not search for one.
- Steps 5 and 6 let the human deploy by hand or use the merge's deployment for step 5; the spec said only "Deploy".
- The description is now 394 characters: "setup and failed deployments" became "setup, failed deployments, the log record and alerts".

## Searches not found or unclear

- No source in the repository or the foundation says whether `logrotate -f` skips an empty file under `notifempty`; the step works either way because it first puts a line in the file.
- No source says where GitHub offers the "Run workflow" button for a workflow that exists only on a branch; the step is worded to need none.
- The exact name of the Compose log-line prefix (service or container name) is not stated in the foundation; the skill says only "after the service's name and Docker's time".
- The spec's step 3 says "check with `cmp`"; it gives no form. I used `git show <sha>:deploy/loop2-deploy | cmp - /usr/local/bin/loop2-deploy` (not run: it needs the server).
