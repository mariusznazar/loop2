PASS 5a6995061bbc86b8a44383a205e3d3f498a44f10

# Review of the return step

Range `88060bcf72185beeaf1edb2e2c9ca0d011a8f75f..5a6995061bbc86b8a44383a205e3d3f498a44f10`, one commit (`5a699506`), two files: `foundations/decisions.md` (one phrase of D-360's *Rationale*) and `foundations/environment_facts.md` (the fact `node-sqlite-database`). `git rev-parse HEAD` equals the head given. `.the-way` stands at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the gitlink records.

## Findings

### Critical

none

### Important

none

### Minor

none

## Judgement by point of the handoff

### (1) The fact `node-sqlite-database`

- Each sentence holds against the cited edition. I fetched `https://raw.githubusercontent.com/nodejs/node/955266bfdd854cd280dffd47548673914484e4c0/doc/api/sqlite.md` (HTTP 200) and checked all twelve passages of *Source*, old and new, against the page with markup dropped and whitespace collapsed: all twelve stand in it word for word. The two new passages come from one list item, `readOnly`, under `### new DatabaseSync(path[, options])` (page lines 163-164: "`readOnly` {boolean} If `true`, the database is opened in read-only mode. If the database does not exist, opening it will fail. **Default:** `false`."). The sentence's new clause, "an option that opens the database in read-only mode and fails when the database does not exist", says no more than those two passages; the failure on a missing database is said of the option, as the page says it inside that option's item.
- Form: the place `§ new DatabaseSync, readOnly` follows the existing `§ new DatabaseSync, timeout`; the passages are joined by ` · ` and share the page's address and date read, as `.the-way/elements/environment-facts/template.md` ("Source") gives; the date read moved to 2026-11-17, the date the whole page was re-read; one sentence, no version field, no date-relative word. Matches the template.
- In place, not a new fact: the template's "Where entries go" gives "An entry is edited in place and holds only its current wording", and "The sentence" lets one entry hold what one edition of one source says about one thing. The entry already lists the options and operations of `DatabaseSync` from this one page (synchronous operations, busy timeout, prepared statements, close, backup); `readOnly` is one more option of the same constructor on the same page and changes with it, so "two facts ... about different things" does not apply. D-112 already names the fact in *Based on* (`foundations/decisions.md:2722`), so a separate fact would have added a second *Based on* name for the same page and edition and nothing else. I judge the in-place change right.
- D-112 rests on it: its new paragraph (`foundations/decisions.md:2719`, "opens one short-lived connection beside the server's as well, only to read"), its *Verification* ("a command that prints the addresses of accounts from a restored database and opens it read-only", `:2725`) and its *Rationale* ("opens its connection only to read", `:2729`) now have a source in the fact. The skill's command (`.claude/skills/loop2-deploy/references/backup_and_restore.md:581`, identical in `.agents/skills/loop2-deploy/references/backup_and_restore.md:581`) opens `new DatabaseSync(process.env.LOOP2_DATABASE_PATH, { readOnly: true })`, the option the fact now names.
- Other dependents: the fact is named by the invariants at `foundations/invariants.md:683, 703, 773, 783, 793, 883, 1113` and the decisions at `foundations/decisions.md:320, 345, 601, 2412, 2606, 2722`. The change adds one capability to the sentence and removes or narrows none, so no dependent's sentence that rested on the old wording becomes false. No file outside `foundations/` and `.runs/` quotes the fact's identifier (search below).

### (2) D-360's *Rationale*

- The old phrase "an account whose rights the owner took" used `owner` as the person who changes the rights. The glossary (`foundations/glossary.md:278-282`) defines an owner as an account with the role `owner`, and names the person who runs the server's commands "operator" in its *Not*; the role is given only by a human with `account-role`, so an owner could not have taken a role. The new phrase, "an account whose role or privilege was taken since has it again after the restore, with nothing telling the person restoring, and one that was given it since is without it", names no actor and so holds for the command (`account-role`, `account-previous-save`) and for the owner panel (which the glossary's `previous-save privilege` entry, `:272-276`, lets an owner use).
- With the entry as a whole: the binding sentence says "the passwords, sessions, blocks, owner roles and previous-save privileges the backup holds come back as they were" and has the step repeat "the latest change ... of its role lines and of its privilege lines"; *Rejected* ends with "an account whose role or privilege was changed since the backup is as the backup had it, with nothing telling the person restoring". The new phrase says the same in both directions (taken since: back; given since: gone). "The role ... taken" for the owner role follows D-112's own wording ("giving and taking the role", `foundations/decisions.md:2717`), so it reads as the owner role, not as an account left without a role.
- No test or file outside the foundation quotes the old or new phrase (search below).

### (3) The table of comparisons and the choices (a) to (e)

- Checked against the code, all as claimed: `src/server/account-routes.ts:746` writes `password-set` with `accountId`; `src/server/account-block.ts:95,97` `account-blocked`/`account-unblocked`; `src/server/account-role.ts:89,91` `account-owner-granted`/`account-owner-revoked`; `src/server/account-previous-save.ts:92,94` `account-previous-save-granted`/`-revoked`; `src/server/owner-routes.ts:75-78` the panel's block, unblock and privilege events; `src/server/database.ts:312-332` refuses a version above the current one inside the migrating transaction, before anything is written (D-15); `src/server/account-mail.ts:161` `requireTLS: true`; `package.json:23` `"nodemailer": "10.2.1"` (D-154). I did not re-check the rows on D-109's route lines, D-235's watcher script and stand-ins, D-355's skill text or D-49's part (they are outside this commit and the two earlier reviews passed them).
- No new entry for (a), (b) and (e): each is how the human carries out the restore, which the skill `loop2-deploy` holds; question 1 of "Where it goes" in `.the-way/elements/decisions/template.md:147` sends an instruction for how an agent works to a skill, and the part a later change must keep — "since the time of the backup", "the latest change of its block and unblock lines, of its role lines and of its privilege lines", the step only after a restore over the server's database — already stands in D-360's binding sentence. (c) is written where the environment-facts template gives a withdrawal, and D-80 is already a withdrawn number. (d) went into D-355 by question 5. I agree that no choice of the cycle binds after the merge in a way only a new entry holds, and the task (`task.md`, "Settlements to record") excludes none.

## Declined to judge

- `foundations/decisions.md`, D-355: "creates the file with the owner of the deployment account" uses "owner" for the owner of a file on the server, a third meaning beside the glossary's `owner` and "operator". The phrase stands at `f0e466ca` already (two occurrences, carried by a rewritten line), so it is older than this request, and it is not the return step's commit; outside the task.
- The `deployment` part's description in `foundations/part_map.md` saying "tell the owner": older than the change, and the return step's report names it; outside the task.
- Whether `readOnly` keeps a WAL database's `-shm` file untouched or whether the address command needs a busy timeout: behaviour of the command written by the earlier commits, passed by two reviews, and not what this commit changes.

## Checks

| Command or method | Result |
|---|---|
| `git rev-parse HEAD`, `git rev-parse 5a699506` | both `5a6995061bbc86b8a44383a205e3d3f498a44f10` |
| `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | both `bfb2e109735b5fff98802b8be0ff3c43c799262a` |
| `git diff 88060bcf..5a699506`, `git log 88060bcf..5a699506` | one commit, two files, three lines changed |
| `curl -sS -o .runs/review-return-step/dl/sqlite.md https://raw.githubusercontent.com/nodejs/node/955266bfdd854cd280dffd47548673914484e4c0/doc/api/sqlite.md` | exit 0, HTTP 200, 67 049 bytes |
| Python script (stdin, `-I -B`) comparing each quoted passage of the fact's *Source* with the page, markup dropped and whitespace collapsed | 12 of 12 found |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors"; its one listed item is `account-email-nodemailer-starttls`, which the request names; nothing about D-360, D-112 or the fact |
| `python -B .the-way/instruction-files/check_instructions.py` | exit 0, "0 error, 144 warn, 7 info" |
| `sed` of the code lines the comparison table cites | as in (3) above |

`npm test` not run: the full suite is the cycle's own run, and this commit changes no code and no test.

## Reaches beyond the dispatch

- `foundations/glossary.md` entries `owner`, `previous-save privilege` and `blocked account` (searched by heading, read whole): to judge point (2).
- `foundations/decisions.md` D-112 whole (`:2715-2730`): it rests on the fact (point 1).
- `.the-way/elements/decisions/template.md`, the "Where it goes" item (`:145-165`): to judge the return step's places for (a) to (e).
- `foundations/environment_facts.md:312-316` (`compose-file-secret-permissions`): found by a search for "read-only"; it says nothing about SQLite.
- `git diff -U0 f0e466ca..5a699506` filtered for "owner", and `git show f0e466ca:foundations/decisions.md`: to see whether the request uses `owner` against its glossary entry anywhere else.

## Working copies

`.runs/review-return-step/` held `dl/sqlite.md` (the fetched page) and `fc.txt`, `ci.txt` (the checks' output); the whole directory is removed.

## Unread material

- D-410 and D-400: not read whole; only their headings, through D-360's citation (the glossary entries gave what point (2) needed).
- The invariants and decisions that name `node-sqlite-database` other than D-112: not read whole; judged by the kind of the change (one capability added, none removed).
- The skill files `backup_and_restore.md`: only line 581 (the address command) in both copies.
- The earlier reports of the request (`review-whole-report.md`, `review-correction-1-report.md` and the others in `reports/`): not read; no question of this review needed them.

## Searches not found or unclear

- `rights the owner took|whose role or privilege was taken|node-sqlite-database` outside `foundations/` and `.runs/`: no match (positive control: `readOnly: true` with the same filter found 5 occurrences in 3 files).
- `node-sqlite|D-360|D-112|environment_facts` in the output of `foundation_check.py`: no match.
