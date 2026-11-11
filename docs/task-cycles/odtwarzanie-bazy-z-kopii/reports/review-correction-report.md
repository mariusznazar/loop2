PASS 1c9ca887ade853dbdc943c31534491311c0950b2

# Review of the correction — odtwarzanie-bazy-z-kopii (the owner's trial of 2026-11-11)

Range `2dc0a02..1c9ca887ade853dbdc943c31534491311c0950b2` (one commit `1c9ca88`); `git rev-parse HEAD`
is the head given, the working tree clean; `git diff a264539 2dc0a02` is empty, so the base is the
tree I passed. Changed: `.claude/skills/loop2-deploy/references/backup_and_restore.md` and its
`.agents/` twin, 48 ± each. The remarks ("The human's remarks" and "What to change" A–D of
`correction-handoff.md`) take the place of a findings file, as `.the-way/task-cycle/review/fix.md`
gives.

## Each remark

- **A — made.** `:376-382` replaces `The procedure has never been tried.` Each claim against the
  observed outputs: date 2026-11-11, the owner, the real test server, steps 1 to 8 in order (items
  2–9 of the remarks), the newest nightly backup by time, weekday file 3 (item 2); "each step worked
  as written except three places" — the handoff's own wording (items 2, 3, 8, 10) and the three
  places B–D; step 7 — the owner said "tak, wszystko jest ok", and the text says he reported the
  public page, the login and the saved game as in order "and said no more", which claims no marker
  check beyond his words. The not-tried list is true against the outputs (none of its six was
  exercised). Leaving out the backup script's exit code after a signal and the owner's-computer
  trial is right: neither is a step of this procedure — the first belongs to the backup's log table,
  the second has its own section with its own "Not proven by this trial" list. Line 509 ("With no
  server ... never been tried") stays, correctly.
- **B — made.** The load at `:408-411` is the command the owner ran (only the check's label is
  English, `host loaded` for `host wczytany`, which the author reports). Against
  `deploy/loop2-backup:42`, which is exactly `readonly STRYCH_HOST=strych.mikr.us` with a newline,
  no quotes and nothing after the value (`od -c`), and the only line that matches
  `^readonly STRYCH_HOST=` (`grep -c` gives 1): the `eval` defines the variable readonly and prints
  nothing. The "second load says `STRYCH_HOST: readonly variable` and leaves the first value in
  place" claim holds (run below). `"$STRYCH_HOST":loop2-accounts-{1..7}.sqlite.age` expands to the
  seven `host:file` words (run below; the owner's `rsync` with it gave exit 0 and seven files). The
  fallback for "With no server" (`:413-415`): that path's step 8 deploys a commit, and a deployment
  checks the commit out in `/srv/loop2` (`SKILL.md:26`, the `cmp` reads of "sources in
  `/srv/loop2/deploy`"), while the installed copy comes only at its step 10; so the file is there
  when step 9 runs restore step 1. The second-attempt text says not to load again in the same
  shell (`:500-501`). The other placeholders (the hand run of the send, the owner's-computer `scp`,
  install step 5) stay, as the remark allows.
- **C — made.** `:439-446`: `( umask 077; age --decrypt ... -o accounts.sqlite <file> )` in a
  subshell, the clause why, and the check `ls -l accounts.sqlite` shows `-rw-------`. The reasoning
  holds: the owner saw `-rw-r--r--` (0644) under root's usual umask 022, which is `0666 & ~022`, so
  `age` creates its output by the umask; under 077 the same gives 0600. Not run by me either: no
  `age` here, and this Windows file system keeps no POSIX modes (a `( umask 077; : > f )` test gave
  `-rw-r--r--` for both umasks, so it proves nothing). The check in the text makes a different
  outcome visible at that step.
- **D — made.** `:474-479`: what the marker is, with a pointer to step 8 of "Installing and
  reinstalling", and what to do when it was not written down, in three sentences.

## Findings in the correction

### Critical

none

### Important

none

### Minor (new; block nothing, for the request's list)

- **C1.** `backup_and_restore.md:378`: "Each step worked as written" also covers branches of tried
  steps that the trial did not reach and the not-tried list does not name: step 4's move of
  `accounts.sqlite-wal` and `-shm` (none existed after the clean stop of `app`, remark item 5) and
  step 8's reset and block again (none were due, item 9). Add them to the "Not tried" list, for
  example "the `-wal` and `-shm` files of step 4 (none existed) and the reset and block of step 8
  (none were due)", so a later reader does not take those branches as tried.
- **C2.** `backup_and_restore.md:450`: the old-key path says only "decrypt with
  `-i /root/loop2-restore/old-key`". Read as the same command with another `-i`, it keeps the new
  `umask 077`; a reader who types a fresh `age` command drops it and makes the plain database 0644
  again. "decrypt with the same command and `-i /root/loop2-restore/old-key`" closes that.

## Search for "never tried" (point 4)

`git grep -i -E "never (been )?tried|not (been )?tried|untried|unchecked|not checked|never run|not proven|was never|has not been"`
over `.claude/skills/loop2-deploy`, `.agents/skills/loop2-deploy`, `foundations`, `README.md`,
`AGENTS.md`: the restore-related hits are `:369` "Not proven by this trial: ... restoring over a
live volume" — about the owner's-computer trial, still true of it — `:381` (the new list) and `:509`
(no-server path, kept). `troubleshooting.md:104-108`, `:132-136`, `setup_and_secrets.md:325-327`
and `SKILL.md:193-197` name the human's restore without saying it was never tried. Nothing
contradicts the new paragraph.

## Declined to judge

- Whether `age` refuses or truncates an existing `accounts.sqlite` in a second attempt (and then
  keeps that file's mode): the sentence "the new `accounts.sqlite` replaces the earlier decrypted
  one" predates this range; the new `ls -l` check would show a wrong mode.
- The placeholders outside the restore step — left by the remark.

## Checks run

- `python -B tests/agent_workflow/test_loop2_deploy_skill.py` — exit 0 (OK).
- `cmp` of `backup_and_restore.md` and `SKILL.md` with their `.agents/` copies — exit 0 (equal).
- Extraction of the eight `sh` blocks at the head (`scratchpad\rv\extract.py` into
  `scratchpad\rv3`), placeholders replaced, `bash -n` on each — exit 0 for all eight.
- `bash -c` with a copy of `deploy/loop2-backup` as the installed script (`scratchpad\rv3`, GNU bash
  5.3.15 Cygwin): first load — `host loaded`, 14 characters; second load —
  `bash: line 4: STRYCH_HOST: readonly variable`, status 1, value kept; `printf` of
  `"$STRYCH_HOST":loop2-accounts-{1..7}.sqlite.age` — seven `host:loop2-accounts-N.sqlite.age`
  words, N 1 to 7; the `umask` test — inconclusive, as above. Exit 0.
- `sed -n 42p deploy/loop2-backup | od -c` — the line's exact bytes; `grep -c '^readonly STRYCH_HOST='`
  — 1.
- The `git grep` of point 4 — hits as listed.
- Not run: `age`, `rsync` and the new commands on a Linux host (none here; D-12 keeps me off the
  server); the foundation check (no foundation file in the range); the whole gate.

## Reaches beyond the dispatch

- `deploy/loop2-backup:42` and `SKILL.md:26` — for B's command and fallback.
- `troubleshooting.md:102-140` — for point 4.

## Unread material

- Decision counts carried from `review-whole-report.md` (80 selected, 22 whole, 2 in part, 56 by
  title only); this range touches no foundation entry, and I read no decision for it.
- Of the changed file I read `:374-455` and the diff whole; the rest of the file as in my earlier
  reviews.
- `.the-way/.claude/skills/the-way-make-change/SKILL.md` not read: not needed to judge the
  correction.

## Searches not found or unclear

- How `age -o` sets the mode of a new file was not checked in `age`'s source or by a run; the
  judgment rests on the owner's observed `-rw-r--r--`.
- A statement anywhere that the server restore was never tried, besides the replaced sentence: not
  found.
