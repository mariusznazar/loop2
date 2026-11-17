# Findings for the fix of the review of the whole change (`FAIL a2c3729b`)

Cut word for word from `reports/review-whole-report.md`: the four blocking findings (I1 to I4), then the Minor findings of the review within the task (M1 to M5), as the cycle fixes them in the same round.

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
