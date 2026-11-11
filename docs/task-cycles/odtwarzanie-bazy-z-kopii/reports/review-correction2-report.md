PASS 39da4d4546aae43a3b7e05d5c490d376e8b0dd71

# Review of the second correction — odtwarzanie-bazy-z-kopii

Range `84db15e..39da4d4546aae43a3b7e05d5c490d376e8b0dd71` (one commit `39da4d4`); `git rev-parse
HEAD` is the head given, the working tree clean; `git diff 1c9ca88 84db15e` is empty, so the base is
the tree I passed. Changed: `SKILL.md` (8 ±) and `references/backup_and_restore.md` (22 ±) in
`.claude/skills/loop2-deploy/` and `.agents/skills/loop2-deploy/`; nothing else. The four groups of
`correction2-handoff.md` take the place of a findings file (`.the-way/task-cycle/review/fix.md`).

## Each group

- **1, the notice subject — made.** Both places that quoted it now give `kopia_bazy_loop2_nieudana`,
  as `deploy/loop2-backup:56` (`readonly NOTICE_SUBJECT=kopia_bazy_loop2_nieudana`) sends it and
  `tests/deploy/test_loop2_backup.py:117` asserts it; `git grep` finds no other quotation of the
  subject in the skill (the watcher's tests and table already use underscores). The added claim:
  `SKILL.md:191` "which `pusher` turns into spaces in the mail's subject" and
  `backup_and_restore.md:36-37` "`pusher` takes underscores as spaces, so the mail's subject reads
  "kopia bazy loop2 nieudana"". The fact `mikrus-pusher-mail` supports both as worded, through the
  passage its *Source* quotes word for word from Mikrus's page: "Jeśli chcesz zmienić temat maila
  wysyłanego przez pushera, podaj go jako pierwszy parametr (podkreślenia będą traktowane jak
  spacje)." Its one-sentence fact does not itself state the underscore rule (see Declined to
  judge). What arrives in the inbox was not observed by anyone in this cycle; the text says what
  the documentation says, no more. A search of the inbox by the spaced words, as the remark asks,
  is given.
- **2, C2 — made.** `backup_and_restore.md:455-457`: "decrypt with the same command as above,
  giving `-i /root/loop2-restore/old-key` in place of `-i /etc/loop2/backup-encryption-key` (the
  `umask 077` and `-o accounts.sqlite` stay)". "Above" can only be the one `age --decrypt` command
  of step 2 (`:444`); the parenthesis removes the ambiguity C2 named.
- **3, C1 — made.** `:377-387`: "Each step that was run worked as written except three places",
  then the two branches never reached — step 4's `-wal` and `-shm` (none after the clean stop,
  remark item 5 of `correction-handoff.md`: "no `-wal` and no `-shm` after a clean stop of `app`")
  and step 8's redo (item 9: "the owner had reset no password and blocked no account since the
  backup; nothing was redone") — and both are in the not-tried list, which otherwise is unchanged
  and still agrees with the observed outputs. Nothing claimed beyond the outputs.
- **4, N1 — made.** `SKILL.md:71-75`: the version reads are allowed "each run alone, or piped
  through `head -1` to keep its first line, and each also allowed in the same call as the counting
  command ...; no other pipe or option" — exactly what the fact's reading did
  (`bash --version | head -1`, `grep --version | head -1`, in one call with the count), and no more:
  it adds no tool, no other pipe or option, and the same-call allowance is tied to the one counting
  command D-361 allows. A version line holds no secret, so D-12's agreement is not widened beyond
  reading. The fact is unchanged, and its command still equals the block (script check `True`).
  **N2 — made.** The `SKILL.md` sentence is rewrapped; the `backup_and_restore.md` line in "A second
  attempt after a failed one" was already rewrapped by `1c9ca88` (its lines are 89–96 characters
  now).

## Findings in the correction

### Critical

none

### Important

none

### Minor (new; block nothing, for the request's list)

- **D1.** `.claude/skills/loop2-deploy/SKILL.md:191` and the `.agents/` copy: the edited line
  "`` `kopia_bazy_loop2_nieudana`, which `pusher` turns into spaces in the mail's subject. A cron that
  did not start writes nothing. Where backups, keys and ``" is 150 characters, past the file's wrap
  of about 100 — the kind of lost wrap N2 repaired, made new by group 1. Rewrap the paragraph.

## Declined to judge

- The fact `mikrus-pusher-mail` carries the underscore rule only in its *Source* passage, not in its
  sentence. The skill's sentence is supported by the documentation the fact cites; whether the
  fact's sentence should gain the rule is a foundation edit, which this correction was told not to
  make.
- Whether the mail really shows spaces: no run of `pusher` is allowed to an agent (D-12), and the
  install step 10 notice was checked for its text, not its subject.

## Checks run

- `python -B tests/agent_workflow/test_loop2_deploy_skill.py` — exit 0 (OK).
- `cmp` of `backup_and_restore.md` and `SKILL.md` with their `.agents/` copies — exit 0 (equal).
- Extraction of the eight `sh` blocks at the head (`scratchpad\rv\extract.py` into
  `scratchpad\rv4`), placeholders replaced, `bash -n` on each — exit 0 for all eight.
- Python check that the fact `loop2-host-ssh-host-key-options` still quotes the head's counting
  block — `True`.
- `git diff -U0 84db15e..39da4d4 -- .claude/` filtered for added lines over 100 characters — one
  line, 150 characters (D1); widths of the second-attempt paragraph — 89 to 96.
- `git grep -n "kopia.bazy.loop2.nieudana\|kopia_bazy" -- . ':!.runs'` — the two new quotations,
  the script line, the tests; no old spelling left.
- `git diff --name-only 84db15e..39da4d4` — the four skill files only.
- Not run: the foundation check (no foundation file in the range); `tests/deploy/test_loop2_backup.py`
  (script unchanged); the whole gate.

## Reaches beyond the dispatch

- `foundations/environment_facts.md`, entry `mikrus-pusher-mail` whole — group 1's claim.
- `deploy/loop2-backup:56`, `tests/deploy/test_loop2_backup.py:113-117` by grep — the subject as sent
  and asserted.
- `correction-handoff.md`, items 5 and 9 — group 3 against the trial outputs.

## Unread material

- Decision counts carried from `review-whole-report.md` (80 selected, 22 whole, 2 in part, 56 by
  title only); this range touches no foundation entry and I read no decision for it.
- `tests/invariants/test_account_save_backup_failure_notice.py` only by grep (it quotes no
  subject); `tests/deploy/test_loop2_backup.py` only around line 117.
- Of the changed files, the diff whole and the lines it touches; the rest as in my earlier reviews.

## Searches not found or unclear

- An observation of the subject as it arrives in the mailbox: not found in the task, the reports or
  the foundation; the claim rests on Mikrus's documentation.
