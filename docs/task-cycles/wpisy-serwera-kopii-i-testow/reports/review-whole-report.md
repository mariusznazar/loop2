FAIL a2c3729be6d927e39357f9e8d10877349199ccb8

# Review of the whole change: wpisy-serwera-kopii-i-testow

Range: base `f0e466cad5776d86bd979dfe824fb03f543cf6e8`, head `a2c3729be6d927e39357f9e8d10877349199ccb8`
(`git rev-parse HEAD` gives the same; one commit). No spec, no plan, no slices: every finding comes
from the one commit `a2c3729b`.

Counts: 4 blocking (Important), 5 Minor (all within the task), 0 out of scope among the findings;
3 lines under Declined to judge.

## Findings

### Important

**I1. `tracked-file-private-names` names the note of D-13 as "the owner's private note", which the
glossary and D-13 call the operator's** — `foundations/invariants.md:1290` (row 4 of *Settlements
to record*, To do 6).

The new exception reads: "or by referring to the owner's private note of secrets (D-13) without
that note's name and path". D-13 says "the operator's private note" (`foundations/decisions.md:1690`),
and so do the skill and the tests (`git grep -c "operator's private note"`: 2 in decisions.md, 5 in
each copy of `backup_and_restore.md`, 4 in each `setup_and_secrets.md`, 1 in each `SKILL.md`, 4 in
tests; "owner's private note" stands only in this invariant). The glossary's entry `owner`
(`foundations/glossary.md:278-282`) says an owner is an account with the role `owner` and gives
"**Not:** the person who reaches the server and runs its commands — "operator"". The invariant is
checked by review: a reviewer applying it to a file that refers to "the operator's private note" —
the 56 places F-28 was about — meets an exception written for a different note holder, an account
with the owner role, and can call each of them a violation, which is the very conflict row 4 was
written to remove. The task's Polish "właściciela" is no reason to use the glossary word against
its entry (WAY-263: the change restates D-13 differently). Fix: "the operator's private note of
secrets (D-13)".

**I2. D-112's *Rejected* lacks the ways not chosen of question 3** — `foundations/decisions.md:2728`
(row 2 of *Settlements to record*).

Row 2 changes D-112 and names *Questions to settle: Pytanie 3* as its source. That question keeps
two ways not chosen, each with its cost: "D-112 bez zmian, polecenie czyta bazę poza jej regułami —
… D-112 dalej mówi, że bazę otwierają tylko trzy programy" and "powrót do pytania 1 i zmiana kodu
albo sam numer konta — koszty jak przy pytaniu 1". The decisions template gives: "The *Rejected* of
a decision written from a row of a task's *Settlements to record* holds the ways not chosen that
the row's source keeps … each with the cost or the reason kept beside it" (WAY-134,
`.the-way/elements/decisions/template.md:82-87`). The diff leaves D-112's *Rejected* line as it was;
a search of that line for the address command or a reading outside the decision's rules finds
nothing (checked with `awk` on line 2728). The author wrote the ways of row 1 into D-360 and did not
do the same for row 2. Without them, a later agent who proposes "leave D-112 alone and let the
command read beside it" sees no trace that this was weighed. Fix: add the two ways to D-112's
*Rejected*, the first with its cost stated as what the decision would then say ("the decision would
go on naming only the other connections that open the database"), the second "a change of the code
and the tests of the account server, or a query written from nothing on the day of a failure" as
at D-360.

**I3. Step 8 takes "the last" block or unblock line of an account without saying "by its time",
while the printed order and the file's order are not the order of time** —
`.claude/skills/loop2-deploy/references/backup_and_restore.md:541-542` and `:556-557` (same lines
in the `.agents` copy; To do 2).

The step says: "For each account take its `password-set` lines as one reset, and of its
`account-blocked` and `account-unblocked` lines only the last one", and later "where the last of its
two kinds of line is `account-blocked`, block it again, and where it is `account-unblocked`, unblock
it again". Two facts make the last line printed differ from the latest line in time:

- the given command `grep … /var/log/loop2-app.log /var/log/loop2-app.log.1` prints the matches of
  the current file first and those of `.1`, the older generation, after them; a backup up to seven
  days old (fourteen after a failed night) often spans a weekly rotation;
- inside one file, a line of the human's wrapper for `account-block` is appended at the moment the
  command runs (`SKILL.md:490-505`, `>> /var/log/loop2-app.log`), while a line of the owner panel
  stays in the container and is appended only at the next deployment (`deploy/loop2-deploy:339-344`,
  `SKILL.md:398-401`). A panel block at T1 followed by a command unblock at T2 stands in the file as
  the unblock first and the block after it.

In both cases a human under pressure who reads "the last" as the last line on the screen blocks
again a player the owner had unblocked, or unblocks again an account that had been blocked to cut
someone off — the outcome D-360 exists to prevent. The author's own-work check named exactly these
lines as the weakest point and checked them by reasoning only. Fix: "the latest by its time (not by
its place in the output: the newer file is printed first, and a line of the command is written
before the container lines of the same period)".

**I4. The check for a lost part of the log looks only at the deployment of step 6, while any
deployment since the backup may have lost its container's lines** —
`backup_and_restore.md:519-524` (both copies), `foundations/decisions.md:2492` (*Rationale* of
D-360) (To do 2, row 1).

The step reads: "First `tail -n 20 /var/log/loop2-deploy.log`: a line `warning:` about the dump of
that deployment means the lines of the stopped container are lost". Every push to `main` deploys
(D-11), so between a backup of up to seven or fourteen days ago and step 3 there may be several
deployments, and each one whose dump failed went on with only a `warning:` line (D-355,
`deploy/loop2-deploy:346-360`). The lines of that container — resets, blocks and unblocks made
then — are not in the file, and the step neither looks for those warnings nor tells the human that
such a period exists, so the human believes the log named every account and treats nothing of that
period "as the second part does". D-360's *Rationale* states the same gap as a certainty: "so every
such event since the backup stands in that record", and names only the failed append of "the
deployment that starts the restored database". A missed reset leaves an account open to the old
password, which is what F-3 was raised for.

The `tail -n 20` itself is a fragile bound for step 6's own warning: after the warning the script
still writes the output of `docker compose up --force-recreate --wait` for two services, the lines
`switch:`, `probe:`, `old game container:`, the output of `docker image prune` and `deployed`
(`deploy/loop2-deploy:365-416`, `:420-437`); by my count that is about 17 lines when nothing is
pruned and more when a newer commit's images replace older ones, so the warning sits at or past
the edge of 20 lines. Fix for both: a bounded fixed-string search such as
`grep -F -m 50 'warning: the dump of the log' /var/log/loop2-deploy.log`, taking each line whose
time is after the time of the backup, and the sentence of D-360's *Rationale* narrowed to say that
a failed dump of any deployment since the backup leaves that container's period unknown.

### Minor (all within the task)

**M1. D-112's first paragraph now holds four binding sentences** — `foundations/decisions.md:2717`.
The template gives "One to three sentences answer the question of the heading, in the first
paragraph under it" (`template.md:117-119`). The author kept the list of connections word for word
because five tests quote it, which is sound, but the new sentence could stand as a paragraph of its
own. No reader is misled; Minor by WAY-364.

**M2. D-235's last binding sentence is ungrammatical and repeats itself** —
`foundations/decisions.md:2383-2385`: "The agreement with them is checked by a human when the way of
talking to them changes, and the agreement with `pusher` when the way of either script talks to it
changes." "the way of either script talks to it" does not parse, and the second clause says what the
first already covers. A form that gives what To do 4 asks: "A human checks the agreement with Strych
when the backup script's way of talking to it changes, and the agreement with `pusher` when the way
either script talks to it changes."

**M3. "The time of the backup" does not say which `made:` line, and `made:` is later than the
copy** — `backup_and_restore.md:536-539`. The backup log holds many `made:` lines for one weekday
file, and the `made:` line is written before the send (`deploy/loop2-backup:257` before `:128`), so
the last `made:` line of a night whose send failed names a file Strych does not hold — Strych keeps
the one from seven days earlier (`backup_and_restore.md:86-88`). Taking that time moves the lower
bound a week later and misses that week's resets: the one direction the step itself calls the worse
("a line missed leaves an account as the backup had it"). It happens only when the human restores a
weekday file other than the newest, so Minor. The copy itself is made between `start` and `made:`,
seconds earlier. Fix: "the `start` line of the run whose `made:` line names the weekday file and is
followed by `end: sent`, and whose time agrees with the file's time of step 1".

**M4. D-360 binds what the human knows only after a restore on a new server, while step 8 makes it
in every case** — `foundations/decisions.md:2482` against `backup_and_restore.md:561-567`. The old
binding sentence "Whoever reset a password since the backup resets it again" held for every
restore; the new one keeps it only in the sentence about a new server. After a restore over the
server's database the step still has the human repeat known resets, blocks and unblocks that the log
does not name (a lost dump, a plain command), and D-360 is silent on that. A clause "and in both
cases whoever is known to have reset a password, or an account known to have been blocked or
unblocked, that the log does not name is treated so too" would make the decision say what the step
does.

**M5. The level table names the stand-ins of the backup script only, for both scripts** —
`guidelines/testing.md:60`: "reakcje skryptów pokazują podstawione narzędzia (`docker`, `age`,
`rsync`, `pusher`)". The watcher uses no `age` or `rsync` and does use `flock` and `date`
(`tests/deploy/watch_script_support.py:12`). The recipe at `:368` gives the right lists, so the
reader is not left without them.

## Against the task, item by item

| Item | Met | Evidence |
|---|---|---|
| To do 1 (F-2), D-15 | yes | `decisions.md:1725-1729`; *Rationale* no longer passes over the schema case (`:1743`); D-112 *Rejected* left as the task says |
| To do 2 (F-3), D-360 and the step | yes, with I3, I4, M3, M4 | binding `:2482`, *Rationale*/*Rejected* rewritten, *Relations* + D-355; step 8 two parts; "With no server" step 9; the sentence "This instruction has no way to find the other accounts" is gone (searched the repository); D-112 gains the command (`:2717`) |
| To do 3 (F-7), `cross-part-imports` | yes | `invariants.md:1243` `Rests on: none`; the fact `git-path-patterns` withdrawn (see concerns) |
| To do 4 (F-18), D-235 and testing.md | yes, with M2, M5 | `decisions.md:2380-2385`, *Relations* + D-356; `testing.md:60`, `:368` name the watcher and its seam |
| To do 5 (F-21), D-109 | yes | third paragraph `decisions.md:2633`, *Relations* + D-356; agrees with `src/server/account-routes.ts:416-449` |
| To do 6 (F-28) | yes, with I1 | `invariants.md:1292`, *Derives from* + D-13 |
| To do 7 (F-29) | yes | `test-helpers` added to D-49 and the 15 decisions D-73…D-79, D-81…D-85, D-87…D-89; D-80 is a withdrawn number (`decisions.md:11390`); D-31 untouched (`:480`) |
| To do 8 (F-31) | yes | `invariants.md:940`; D-154 keeps "Nodemailer 10" |
| To do 9 (C1, O1), step 7 | yes | (a) "written down last before the time of the backup being restored"; (b) the case of an earlier saved-game version with the warning, whose text matches `src/browser/view/app.ts:51` |
| Row 1 → D-360 | yes, with I3, I4 | as To do 2 |
| Row 2 → D-112 | binding yes; *Rejected* no | I2 |
| Row 3 → `cross-part-imports` | yes | |
| Row 4 → `tracked-file-private-names` | wording no | I1 |
| Row 5 → `account-email-nodemailer-starttls` | yes | the foundation check lists it, to be named in the request |

*Rejected* of D-360, against its sources: the way of F-3, the two of question 1 and the one of
question 2 stand, each with its cost; the cost of the first way of question 1 drops the clause "a
przegląd zakładał „kod bez zmian”", which is the reviewer's assumption, not a cost — acceptable. The
older ways stay; the old item about reading the log is gone because that way is now chosen.

The four places where the author chose wording of its own: the third paragraph of D-109 and the
second sentence of D-112 are the smallest way to keep the tests' word-for-word quotations, and
neither goes beyond the task (M1 aside); the upper time bound and "only the last" line are needed
for the step to give the right state and do not exceed the task, but "the last" needs "by its
time" (I3); the day and hour of the marker are needed for To do 9(a) and add nothing beyond it.

The orchestrator's Q5 holds: step 6 deploys with `docker compose up … --force-recreate`
(`deploy/loop2-deploy:367`), after the dump (`:431-432`), so by step 8 the running containers hold
nothing from before the restore, and the log of the container stopped in step 3 reaches the file
through step 6's dump. Leaving the running container's log out of the search departs from the
task's words "i w logu kontenera" and not from what they are for.

The address command, judged as text a human runs: it can be run as written. The container name
`loop2` is the one the skill uses; `LOOP2_DATABASE_PATH` is the container's own variable; numbers
pass after `--`, so a number that begins with `-` is no option; `readOnly: true` opens a WAL
database beside an open writer. An unknown number prints `no account`. The one thing the human
could get wrong is the bracket placeholders, which the next sentence explains.

## Declined to judge

- A restore also takes back the owner role and the previous-save privilege given or taken since the
  backup (`account-owner-granted`/`-revoked`, `account-previous-save-granted`/`-revoked` stand in the
  same log); a role taken from a compromised account comes back. Neither the task nor D-360 covers
  them; for the human to decide whether a later task should.
- `grep -m 500` counts matches from the start of each file, so in a file holding more than 500
  matches the newest are cut; with the expected number of accounts that volume in four weeks is not
  plausible.
- The wording of the D-73 family and D-49 beyond their *Scope*: the change alters only the scope.

## Checks

| Check | Command or method | Result |
|---|---|---|
| Head is the reviewed commit | `git rev-parse HEAD`, `git rev-parse a2c3729b` | both `a2c3729be6d927e39357f9e8d10877349199ccb8` |
| Pinned the-way | `git -C .the-way rev-parse HEAD` vs `git ls-files --stage -- .the-way` | both `bfb2e109…` |
| The two skill copies | `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | exit 0, identical |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors"; one line listed: `account-email-nodemailer-starttls`, expected |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | exit 0, "0 error, 147 warn, 7 info"; all warnings `dead-path` for server paths; none in either `backup_and_restore.md`, and the new `SKILL.md` bullet holds no path. Not compared with the base count |
| Test that reads the skill copies | `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill` | exit 0, 5 tests OK |
| Sizes of the changed files | `python -B .the-way/task-cycle/change_file_sizes.py <base> <head>` | exit 0; +136 lines in all, `backup_and_restore.md` 568 → 630 in each copy. `guidelines/coding.md` has no `### Size of a function and a file`, so no size test exists; the change holds no code, and no structure finding follows |
| The address command | `node -e '<the command's script>' -- -abc_1 zzz` with `LOOP2_DATABASE_PATH` on a made-up WAL database while a second connection held it open, Node v24.17.0 | exit 0; printed `-abc_1 x@example.test` and `zzz no account`; no warning on standard error |
| Argument handling of `node -e … --` | `node -e 'console.log(JSON.stringify(process.argv.slice(1)))' -- 12 ab` | `["12","ab"]` |
| The fixed strings match what the game writes | read `src/server/log-line.ts:82-84` (`JSON.stringify({ event, ...fields })`), `owner-routes.ts:74-76`, `:146`, `:153`, `account-block.ts:95-97`, `account-routes.ts:746` | `"event":"password-set"`, `"event":"account-blocked"`, `"event":"account-unblocked"` match the lines of the server, the panel and the command |
| Q5: the deployment recreates both services | read `deploy/loop2-deploy:339-378`, `:420-437` | `--force-recreate` after the dump; confirmed |
| Lines written after the dump warning | read `deploy/loop2-deploy:67-90`, `:286-303`, `:365-416` | counted as in I4 |
| `made:` before the send | `grep -n 'made:\|"start\|end: sent' deploy/loop2-backup` | `start` :246, `made:` :257, `end: sent` :128 (called after) |

Not run: `npm test` (the cycle's own run after the review); the address command and the searches
inside a real `loop2` container and on the real server's files, which only a human may do; the
number of lines `docker compose up --wait` really writes on the server.

No invariant test was changed by the range.

## Reaches beyond the handoff

- `deploy/loop2-deploy` (dump, switch, probe, prune, `main`): to check Q5 and the `tail -n 20` bound.
- `deploy/loop2-backup` (the lines `start`, `made:`, `end: sent`): for the time of the backup.
- `src/server/log-line.ts`, `owner-routes.ts`, `account-routes.ts:380-449`, `account-block.ts` by
  search: the format of the lines searched and D-109's new paragraph.
- `src/browser/view/app.ts:51` by search: the warning text of step 7.
- `tests/deploy/watch_script_support.py:1-60`: the stand-ins named in `testing.md`.
- `tests/invariants/test_cross_part_imports.py:1-30` and `git show 6999c168`, `git log` of PR #137:
  how `git-path-patterns` came into `cross-part-imports` (see concerns).
- `foundations/glossary.md`, entry `owner` and the list of headings: for I1.
- `.the-way/elements/decisions/template.md` whole, `.the-way/elements/environment-facts/template.md:174-175`,
  `.the-way/project-level/technology/reserved_choices.md` whole: the form of the entries, the
  withdrawn fact, reserved choices (none taken).
- `.claude/skills/loop2-deploy/SKILL.md:264-689` and `references/backup_and_restore.md` whole.

## Concern for the orchestrator (not a finding)

The fact `git-path-patterns` that this change withdraws was not there when the task was written: it
came in with `6999c168` on 2026-11-16, merged through PR #137 (`task/decyzje-niezgodne-z-gra`), which
filled the field `Rests on` of `cross-part-imports` with it — the very way F-7 had not chosen. Row 3
and the template (WAY-73) make the withdrawal consistent, and the orchestrator accepted it (Q4); but
the change undoes something the human merged three days after the decision on F-7. The request
should say so in one sentence, so that the human sees that a merged fact goes.

## Working copies

- `.runs/review-whole/` in the reviewed worktree held the index of my selection (`index.md`), the
  list of sections (`sections.md`), the outputs of the two checks (`fc.txt`, `ci.txt`), an extract of
  five decisions (`dread.txt`) and a made-up SQLite database (`db/`). All removed before return; no
  worktree or clone was made.

## Unread material

13 of the 64 decisions listed in full in the index of my selection were read whole: D-13, D-15,
D-109, D-112, D-137, D-154, D-231, D-235, D-351, D-355, D-356, D-360, D-362. The selection: the
sections "Testing discipline", "The server: hosting, deployment, logs and failure reports",
"Database backup and restore", "Account server: access, security and blocked accounts", every part
the changed entries name, and D-13, D-154, D-351, D-362, D-49, D-230, D-252; the 351 headings
outside those sections were run through, and of them only D-96 and D-206 (the warning of step 7)
bore on the change and were checked by the text in the code, not opened.

Decisions that bear on the change and stayed unread whole: D-49 and D-73…D-79, D-81…D-85, D-87…D-89
(binding sentences and *Scope* from the index; the change alters only their *Scope*); D-12, D-230,
D-252 (binding sentences from the index).

Guideline files: `guidelines/coding.md` and `guidelines/testing.md` read whole. Not read:
`.the-way/product-guidelines/template.md` and the testing template; the change edits the content of
one table cell and one recipe field of `testing.md` and no part of its form.

Invariants: the three changed, `browser-failure-report`, `loop2-deploy-log-dump`,
`failure-watcher-message` and `tracked-file-private-paths` read whole; the other invariants whose
*Part* is `every` or `agent-workflow` only by heading. Part map: the entries of `agent-workflow`,
`product-foundation` and `test-helpers`. Glossary: the entry `owner` and the list of headings, not
the whole file.

## Searches not found or unclear

- The task's pointer `.claude/skills/loop2-deploy/SKILL.md:277` as the model of the bounded command:
  at the base that line is about the events of the owner panel; at the head line 277 is
  `grep -n -F -m 20 -- 'loop2-deploy |' /var/log/loop2-app.log`, and the model the author used stands
  at `:291-293`.
- D-80, listed by To do 7, is a withdrawn number, not a decision.
- How many lines the real `docker compose up --wait` writes after the dump warning on the server:
  not verifiable here, counted from the script and Compose's usual output.
