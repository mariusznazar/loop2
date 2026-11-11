FAIL 76120d8a312a726e97a5aa07ef7e06e52751a567

# Review of the whole change — odtwarzanie-bazy-z-kopii

Range `f672c7b1d7e71c7f8077b2bb5f16fd9b37196998..76120d8a312a726e97a5aa07ef7e06e52751a567` (three
commits: `08f7a06`, `aa15552`, `76120d8`); `git rev-parse HEAD` in the worktree is the head given.
One-author route, no spec, no plan, so no slice attribution applies.

Changed files (`git diff --stat`): `.agents/skills/loop2-deploy/SKILL.md` 8 ±,
`.agents/skills/loop2-deploy/references/backup_and_restore.md` 249 ±,
`.claude/skills/loop2-deploy/SKILL.md` 8 ±, `.claude/skills/loop2-deploy/references/backup_and_restore.md`
249 ±, `foundations/decisions.md` 32 ±, `foundations/environment_facts.md` 31 + (496 insertions,
81 deletions).

## Findings

### Critical

none

### Important (blocking, within the task)

**I1. The counting command of item 14 shows 0 for two forms of configuration that ssh honours, while
the instruction and the environment fact say a 0 cannot hide a set option.**

- Places: `.claude/skills/loop2-deploy/references/backup_and_restore.md:210` (the keyword `grep`
  requires the option's name as the first characters after spaces), `:213-217` (a word `~user/...`
  passes the allowed-characters test and falls into `*) path=$base/$word`, a path that does not
  exist, so it is skipped with no count), `:222` (the `Include` `sed` has the same shape as the
  keyword grep); the claims at `:235-237` "so the number is never 0 for a configuration the command
  could not read to the end"; `foundations/environment_facts.md`, entry
  `loop2-host-ssh-host-key-options-unset`, *Source*: "so that a count of 0 means every file was
  followed and none sets either option". Same text in `.agents/`.
- What is wrong: (1) a double-quoted keyword, `"KnownHostsCommand" /bin/true`, is read by ssh as
  the option (its keyword parser strips the quotes), and the command counts 0; (2) an
  `Include ~root/other` in root's configuration is followed by ssh (an Include path in a user
  configuration is expanded with `~` and `~user`), and the command treats it as a relative path
  under `/root/.ssh`, finds nothing and counts 0 for an `other` that sets the option.
- Why it matters: task item 14 requires that the count "obejmuje pliki dołączane dyrektywą
  `Include` ... bo inaczej może pokazać 0 przy ustawionej opcji", and D-361 makes this count the one
  way an agent confirms the condition D-238 rests on. A false 0 says the host-key check rests on
  the one compared line when it does not. Both forms are unlikely on the real server (a human wrote
  root's file with one Strych entry), so the reading `0` in the fact is very probably true; what is
  false is the guarantee the text gives for the command.
- Evidence: fake trees run through the instruction's block word for word with only its three fixed
  paths moved (`the cycle's scratch folder, rv/cases.sh`,
  `run.sh`): case `quoted` gives `0`, case `tuser` gives `0`. Local OpenSSH_10.3p1,
  `ssh -G -F q.conf example.invalid` prints `knownhostscommand /bin/true` for the quoted keyword;
  `ssh -G -F u.conf example.invalid` prints `verifyhostkeydns true` through
  `Include ~Mariusz/<path>/inc.conf`; control `plainq.conf` prints the same option for the plain
  form. The server's OpenSSH version was not read (D-12 bars me from it); quote-stripping of the
  keyword and `~user` in Include are older than the 8.x line, so the same holds there by reading,
  not by a run.
- A way to fix (the orchestrator's choice): in the `case`, add `\~*) n=$((n + 1)); continue ;;`
  after the `\~/*)` branch, so any other `~` form counts as one; and count as one every non-comment
  line whose first non-space character is `"` (or allow an optional `"` around the keyword in both
  the keyword grep and the `Include` sed). Then the fact's *Source* must quote the new command, and
  the reading has to be taken again through the `mikrus` MCP server by the orchestrator, since a
  fact's reading quotes the command that was run. Narrowing the claims instead would leave item 14
  unmet for a `~user/` Include.

### Minor (within the task; the orchestrator fixes them before the request, WAY-161)

- **M1.** `.claude/skills/loop2-deploy/SKILL.md:93-94` and the same lines in `.agents/`: the line
  `count, no running of the backup script or of the backup` stands at column 0 inside the list item;
  the change broke the wrap and indentation of that bullet, the kind of lost wrap item 9 repairs
  elsewhere. It still renders as a continuation in Markdown; rewrap the bullet with its two-space
  indent.
- **M2.** `.claude/skills/loop2-deploy/references/backup_and_restore.md:416-417` (step 2):
  `-o accounts.sqlite`, `<file>` and `head -c 15 accounts.sqlite` are relative to a working directory
  no step sets, while step 5 (`:439`) installs `/root/loop2-restore/accounts.sqlite` and step 7
  removes only `/root/loop2-restore`. A human standing in `/root` who gives the backup's full path
  writes the plain database (addresses and password hashes) to `/root/accounts.sqlite`, mode 0644
  under root's usual umask, which step 7 never removes; step 5 then fails. This is the task's need
  ("zostawić plik z adresami i skrótami haseł ... albo utknąć na poleceniu"), and the change edited
  steps 1, 2 and 5. Add `cd /root/loop2-restore` at the end of step 1, or write the paths of step 2
  in full.
- **M3.** `.claude/skills/loop2-deploy/references/backup_and_restore.md:495-497` ("With no server",
  step 3): "Do not make a new key here, neither with "Creating the file" nor with "Rotating" ...:
  ... a new key signs every player out." For "Rotating" the reason is false: it prepends a new key and
  keeps the old ones, and `setup_and_secrets.md:178` says "players stay signed in" (D-13: "session
  rotation prepends the new signing secret while retaining old verification secrets"). The wording
  comes from task item 13 ("nowe z sekcji rotacji, które wylogowałyby wszystkich graczy"), which the
  author flagged. Keep the ban, give each its own reason: "Creating the file" makes a file with one
  new key, which signs every player out; "Rotating" needs the file in place first.
- **M4.** `foundations/environment_facts.md`, `loop2-host-ssh-host-key-options-unset`, *Source*: the
  template's reading form is `` reading: `<command>` on <host>, <tool and its version> — "<output>"; run <date> ``
  (`.the-way/elements/environment-facts/template.md:36`, `:109-114`). The entry puts, between the
  host and the tool, a clause explaining what the command counts and what a 0 means — the author's
  paraphrase, not the reading, and carrying the false guarantee of I1 — and names only grep's
  version although bash, sed and tr run too. Drop the clause (the instruction holds that
  explanation) and name the tools the command runs, or bash and grep at least.
- **M5.** Same entry, its identifier `...-options-unset` names the fact's value; the template says
  "The identifier names what the fact is about, never its value"
  (`.the-way/elements/environment-facts/template.md:23`), and were an option set the identifier would
  read false. A name such as `loop2-host-ssh-host-key-options` fits; the rename reaches D-238's
  *Based on* in the same change.

### Out of scope

- `.claude/skills/loop2-deploy/references/backup_and_restore.md:36` and `SKILL.md:189` give the
  notice's subject as `kopia bazy loop2 nieudana`, while `deploy/loop2-backup:56` sends
  `kopia_bazy_loop2_nieudana`. Unchanged by this range and named by no item of the task; Minor,
  outside the task.

## Coverage of the task

- *To do* 1–14 and 16: met (item 14 with I1). 1: `:73-77` matches `require_whole_file`
  (`deploy/loop2-backup:201-213`). 2: row `1` matches the header (`:26-28`) and `on_exit`
  (`:118-134`), the last row's signals match the traps (`:263-269`); row 6 matches the raw stderr
  redirections (`:178-180`). 3: `:110-117`. 4: `:123-126`, consistent with D-238 *Verification*.
  5: `:279-282`, `:286-289`, `:353-354`. 6: `:388-415`, host key against
  `/etc/loop2/strych-known-hosts` with the script's own `ssh` options (`deploy/loop2-backup:234-236`).
  7: `:417-426`. 8: `:434-440`, mode 0600 and uid/gid 1000 as `scripts/restore-trial.mjs:264-269`.
  9: `:464-472`; the lost wraps of the base at the `docker build` line and `Remove-Variable` are
  rewrapped. 10: `:379-386`, consistent with D-11. 11: `:265-272`, `:365-368`, matching
  `src/browser/sim/saved-game.ts:75`, `:1311-1313`, `src/browser/view/app.ts:47-54`, `:83-97`,
  `scripts/restore-trial.mjs:307`, `:490`, D-96. 12: `:254-263`, `:449-456`, matching D-137 and
  D-138; „Nie pamiętam hasła” is the card's button by D-96. 13: `:483-506`, owner, group and mode as
  `setup_and_secrets.md:112-113`, `:148`; a trailing blank line from the paste is accepted by
  `JSON.parse` (`src/server/configuration.ts:84-88`). 16: fact present, D-238 *Based on* names it.
- Item 15 and the acceptance criterion's "places where Mariusz got stuck": not done, by the
  handoff; `The procedure has never been tried.` stays at `:372`, "This path has never been tried"
  at `:476`, and no sentence of the change says a trial on the server happened.
- *Questions to settle*: 1 — step 1 lets the human choose the newest nightly backup by time;
  2 — paragraph `:254-263` and step 8; 3 — count only, the ban on content kept (`:240-241`,
  `SKILL.md:93-94`).
- *Settlements to record*: row 1 written whole as D-360, row 2 as D-361; *Rejected* of each holds
  only the ways the questions' *Not chosen* and the rows' *Source* keep, each with its reason
  (template `:61-66`); D-360's wording of the log way ("only the resets the log still holds") does
  not repeat the row's outdated reason and agrees with D-355. Origin file
  `the task's note in the author's backlog`
  exists.
- *Out of scope*: loop2#046-93 gets no text (no sentence about reset links in the restore text).
- Irreversible operation: the restore over the live database stays the human's ("Eight steps, all
  the human's", `:372`; "Every step is the human's", `:476`; "Never: ... fetching or opening a
  backup", `:242`). Nothing invites an agent to run it; the only agent command added is the read-only
  count.
- Trust boundary: `deploy/**` unchanged. Commands, paths, modes, owners, exit codes and names in the
  changed text checked against the files above; findings I1, M2, M3 are what I found.

### The author's untried claims

- (a) exit-1 row: matches the script's header and the handler's `(( code != 0 )) || code=1`; the
  process status on Linux is reasoned from bash's handling of a fatal signal after the EXIT trap,
  not run. Unverified by a run.
- (b) `rsync` exit 23 for a missing source file: consistent with rsync's partial-transfer status;
  not run (no rsync here). Unverified.
- (c) item 6: conforms to D-230 — fixed names, no listing, and D-230's rationale "Which backup is the
  newest shows in the file's time"; the send keeps the night's time on Strych with `--times`
  (`deploy/loop2-backup:234`), and the fetch keeps it locally. On a host after loss, "With no
  server" steps 4–7 put `rsync`, `/backup_key`, root's SSH entry and the known-hosts file in place
  before step 9 runs it, and the text drops the log cross-check when no log exists. Reasoned, not
  run. `ls` with file operands prints no `total` line, so "the first row" is the newest file.

### Foundation entries the change writes

- D-360, D-361: form per `.the-way/elements/decisions/template.md` (binding sentences, *Scope* by
  part identifiers, *Based on* `none`, *Relations*, *Verification* pair, *Origin*, *Rationale*
  naming no file or count); they say what the instruction does (step 8; "What an agent may read").
- `loop2-host-ssh-host-key-options-unset`: sentence in present tense, one fact; its command equals
  the instruction's block byte for byte (checked); M4, M5, and I1 for its *Source* clause.
- D-238 *Based on*: identifier added, nothing else changed.
- No invariant test changed.

## Declined to judge

- Exit codes the backup log can show for a bash error in the script (an unbound variable ends the
  run through the same handler, 127 on bash 5.3 here) and that the table does not list: item 2 asks
  only for the logged 1.
- The nightly run at 03:17 starting while a restore is in progress: no item of the task covers it,
  and the weekday file it would replace is not the newest one.
- "The exits of the send ... read the same here" (`:402-403`) also covers 124 and 137, which come
  from `timeout`, absent from the hand fetch: harmless, no item asks for it.
- Whether the four-week server log of D-355 would make the rejected "read `password-set` lines"
  way of D-360 stronger than its *Rejected* says: the human settled row 1.

## Checks run

- `python -B tests/agent_workflow/test_loop2_deploy_skill.py` — exit 0 (5 tests OK).
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `cmp` of `.claude/skills/loop2-deploy/references/backup_and_restore.md` and
  `.claude/skills/loop2-deploy/SKILL.md` with their `.agents/` copies — equal (exit 0).
- Extraction of the seven `sh` blocks of the instruction (`scratchpad\rv\extract.py`), placeholders
  `<host from the constants block>` and `<volume directory>` replaced, `bash -n` on each — exit 0
  for all seven; `bash -n` on the inner script of the counting command — exit 0.
- `bash cases.sh` (scratchpad `rv`), 20 fake-tree cases through the block word for word (GNU bash
  5.3.15 Cygwin) — 17 as ssh would honour them; `quoted` and `tuser` gave `0` (I1); `crlf` gave `0`,
  which matches ssh (it strips a trailing CR and skips a missing Include file), so no finding.
- `ssh -G -F <file> example.invalid` with OpenSSH_10.3p1 for `q.conf`, `u.conf`, `plainq.conf` —
  settings honoured as stated under I1.
- Python comparison of the fact's command with the instruction's block — `True`.
- `bash -c` with `set -u` and an EXIT handler — status 127 (Declined to judge, first line).
- Not run: `rsync`, `age`, Linux `bash` signal behaviour — none on this computer; the Docker engine
  was off and the only WSL distribution is Docker's own, stopped; I started neither. ShellCheck on
  the embedded command — not a script the ShellCheck invariant names. The whole gate — the
  orchestrator's step.

## Reaches beyond the dispatch

- `the author's notes of the reviews of pull requests #46 and #47 (dated 2026-11-06)`,
  rows loop2#046-18 to 046-57 and 046-45 — fidelity of items 1–14 to the reviewers' remarks.
- `.the-way/elements/decisions/template.md` whole; `.the-way/elements/environment-facts/template.md`
  lines 20-149 — form of D-360, D-361 and the fact.
- D-236 read incidentally (outside the selection) while reading D-234 and D-237.
- `src/server/configuration.ts:70-108` — whether a session file with a trailing blank line from the
  `cat` paste of item 13 is accepted.
- `deploy/loop2-backup` whole; `scripts/restore-trial.mjs` by grep; `setup_and_secrets.md:100-339`.
- Local OpenSSH (`ssh -G -F`) on files in the scratchpad — how ssh reads the two forms of I1.
- The vault for D-360's *Origin* file.

## Unread material

- Decisions of my selection: 80 (77 by *Scope* naming `agent-workflow`, `deployment` or
  `product-foundation`; D-96, D-138, D-209 from *Decisions in play*). Read: 24 — whole: D-09, D-11,
  D-12, D-13, D-15, D-16, D-96, D-137, D-138, D-205, D-209, D-228, D-230, D-231, D-232, D-233,
  D-234, D-235, D-237, D-238, D-360, D-361; with the end of *Rationale* and *Rejected* cut at about
  2 500 characters: D-112, D-355. By title only: 56 (the rest of the list, among them D-252, D-356,
  D-357, D-358, D-359 and the testing and coding decisions D-28 to D-89); none of their titles points
  to the backup, the restore or reading the server.
- Invariants: read whole `account-save-durable-storage`, `account-schema-lifecycle`,
  `account-save-backup`, `account-save-sqlite-upgrade`, `account-save-backup-encrypted`,
  `account-save-backup-failure-notice`, `shellcheck-source-rules`; the other invariants naming
  `deployment` or `agent-workflow` (about 20, on the container, ports, formatters, sessions, mail,
  sprites, logs) by identifier only.
- Part map: `agent-workflow`, `product-foundation`, `deployment` read whole; the others by heading.
- Guidelines: `guidelines/coding.md` read whole. `guidelines/testing.md` not selected: the change
  writes no test.
- `setup_and_secrets.md` lines 1-99 and 340-621 not read (the changed text links sections inside
  100-339 and, unchanged, "Initial host provisioning" and "H1-H5"); `troubleshooting.md` only
  grepped for restore mentions (unchanged and consistent); `src/browser/sim/saved-game.ts` only by
  grep around `SAVED_GAME_VERSION`.

## Searches not found or unclear

- The OpenSSH version of the test server: not looked up on the server (D-12) and not found in what I
  read of the foundation; I1's behaviour is shown on OpenSSH_10.3p1 locally and inferred for the
  server.
- Linux behaviour for claims (a) and (b): could not be run here.
