Status: done with concerns

# Author report: wpisy serwera, kopii i testow

## Commit

- `a2c3729b` on `task/wpisy-serwera-kopii-i-testow`, author address `mariusznn@gmail.com` (the address of the repository's recent commits). One commit: the foundation entries and the skill and guidelines edits are one piece of work.
- Files changed (added/removed lines, from `git show --stat`; 225 added, 89 removed in all):
  - `foundations/decisions.md` (91 changed lines: 50 added, 41 removed)
  - `foundations/invariants.md` (8 changed: 4 added, 4 removed)
  - `foundations/environment_facts.md` (7 changed: 1 added, 6 removed)
  - `guidelines/testing.md` (4 changed: 2 added, 2 removed lines)
  - `.claude/skills/loop2-deploy/SKILL.md` and `.agents/skills/loop2-deploy/SKILL.md` (+4 each)
  - `.claude/skills/loop2-deploy/references/backup_and_restore.md` and its `.agents` copy (98 changed each); the two copies were made identical with `cp` and checked with `diff -r` (IDENTICAL).
- Move of code before a change (WAY-365): none; no code is changed.

## Checks

| Check | Command | Exit |
|---|---|---|
| Foundation check, full (it lists `account-email-nodemailer-starttls`, see Concerns) | `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |
| Foundation check with the switch, right after writing the entries | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0, "0 errors" |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 ("0 error, 147 warn, 7 info"; the warnings are `dead-path` for server paths and are not new; I did not count them against the base) |
| Test that reads the skill copies | `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill` | 0 (5 tests OK) |
| The address command, run on a made-up WAL database | `node -e '...' -- <number> <number>` in bash with `LOOP2_DATABASE_PATH` set, a second connection open on the database | 0; printed the address for the known number and `no account` for the unknown one |

Not run: `npm test` (the cycle's run after the review, as the handoff says); no test of the repository reads `guidelines/testing.md` (the one grep hit, `tests/invariants/test_terrain_drawing_numbers.py:24`, is a comment). The address command was never run inside a `loop2` container or against a real server database; it is untried there, and the skill says so in "Tried once".

Neither an invariant's test nor a new test was written; no invariant test was changed.

## Entries (one sentence in English and one in Polish each)

| Entry | Mark | English | Polski |
|---|---|---|---|
| D-15 (To do 1, F-2) | the task's To do item, no row of *Settlements to record* | A deployment of a commit that does not know the database's schema version (a rollback, or `main` after a trial of a branch that moved the schema) fails health and leaves the game down until a commit that knows the version is deployed, so it is no recovery. | Wdrożenie commita, który nie zna wersji schematu bazy (wycofanie albo `main` po próbie gałęzi, która przesunęła schemat), nie przechodzi sondy zdrowia i zostawia grę leżącą, więc nie jest ratunkiem. |
| D-360 (row 1) | row 1 | After a restore over the server's database the human finds the resets, blocks and unblocks since the backup in the game's log, reads the addresses with a read-only command and repeats them; on a new server there is no such step. | Po odtworzeniu bazy na tym samym serwerze człowiek znajduje w logu resety, blokady i zdjęcia blokad od czasu kopii, odczytuje adresy poleceniem tylko do odczytu i powtarza je; na nowym serwerze tego kroku nie ma. |
| D-112 (row 2) | row 2 | The address-reading command of the restore procedure opens one short-lived read-only connection beside the server's and changes neither schema nor data. | Polecenie odczytu adresów z instrukcji odtwarzania otwiera jedno krótkie połączenie tylko do odczytu obok serwera i nie zmienia schematu ani danych. |
| `cross-part-imports` (row 3) | row 3 | The invariant rests on no environment fact. | Niezmiennik nie stoi na żadnym fakcie środowiska. |
| `tracked-file-private-names` (row 4) | row 4 | A tracked file may refer to the owner's private note of secrets (D-13) without that note's name and path. | Plik śledzony może odwołać się do prywatnej notatki właściciela z sekretami (D-13) bez jej nazwy i ścieżki. |
| `account-email-nodemailer-starttls` (row 5) | row 5 | The sentence no longer binds the Nodemailer version, which D-154 binds. | Zdanie nie wiąże już wersji Nodemailera; wiąże ją D-154. |
| D-235 (To do 4, F-18) | the task's To do item | Both scripts that talk to `pusher` (the backup script of D-231 and the watcher of D-356) are tested with stand-ins, and a human checks agreement with `pusher` when either script's way of talking changes. | Oba skrypty rozmawiające z `pusher` (skrypt kopii z D-231 i strażnik z D-356) są testowane na podstawionych narzędziach, a zgodność z `pusher` sprawdza człowiek przy zmianie rozmowy któregokolwiek z nich. |
| D-109 (To do 5, F-21) | the task's To do item | Any visitor, with or without a session, may send `POST /api/browser-failure` under the transport, origin and input guards and the limit of D-356; the session gives the route only the `accountId` of its line. | Każdy odwiedzający, z sesją albo bez, może wysłać `POST /api/browser-failure` pod strażnikami transportu, Origin i treści oraz limitem z D-356; sesja daje trasie tylko `accountId` jej wiersza. |
| `git-path-patterns` (withdrawn fact) | the cycle's | The fact is withdrawn because nothing rests on it after row 3. | Fakt `git-path-patterns` wycofany, bo po wierszu 3 nic na nim nie stoi. |
| D-49 and 15 decisions D-73..D-89 (To do 7, F-29) | the task's To do item | `test-helpers` joins the *Scope* of D-49 and of the 15 testing decisions that name the other six parts. | `test-helpers` dochodzi do *Scope* D-49 i 15 decyzji testowych o tych samych sześciu częściach. |

The skill steps 7 and 8 (To do 9 and part of 2), `SKILL.md` bullet and `guidelines/testing.md` lines are no entries; they are written in their places.

## Passages where the task did not match the repository

1. **D-80 is a withdrawn number, not a decision.** To do 7 lists D-80, and says 16 decisions plus D-49. The log holds D-73..D-79, D-81..D-85, D-87..D-89 with that *Scope* (15), plus D-31, which the task excludes. D-80 sits in the log's list of withdrawn identifiers ("it repeated ... the rule of the testing guidelines that D-73 adopts"). I added `test-helpers` to the 15 and to D-49 and wrote nothing for D-80. The meaning of the item (every decision of the family) holds; only the count in the task document ("16", "17") is off by one.
2. **The fact `git-path-patterns` already exists** (written 2026-11-16, `foundations/environment_facts.md`, commit `6999c168`), though the task's "Not chosen" for F-7 speaks of a new fact and its row says the field gets no fact. After row 3 nothing names it, so by the environment-facts template ("A fact whose last dependant goes is withdrawn in the same change") I moved its identifier to the list of withdrawn identifiers with the usual reason and `none` as successor. The task says only that "the date and the commit disappear from the field"; the field had held only the fact's identifier (the date and the version are in the fact's entry). If the human wants the fact kept, row 3 cannot hold: a fact nothing names stands against WAY-73.
3. **The line numbers in the task are old**: `guidelines/testing.md:354` (the *Doubles* recipe) is line 368 now (the *Doubles* of `integration test`), and `.claude/skills/loop2-deploy/SKILL.md:277` is a line about the owner panel's events; the bounded commands the question points at ("How an agent reads it") stand at lines 287-292, and the commands I used are those: `grep -F -m` on the file and `zgrep -F -m` on the generations.

## Choices made

- **D-109: a third paragraph, not a clause.** The tests at `tests/http.test.mjs:2541`, `:4542` and others quote the first sentence of D-109 word for word; a clause inside it would break those quotations and the foundation check. A paragraph of its own follows the form the owner routes already take. Rejected: a clause inside the first sentence, or a fourth sentence in paragraph one (paragraphs hold one to three sentences, and paragraph one already holds three). Cost if wrong: the same content reads as a part of the identity question, as a paragraph.
- **D-112: a second sentence at the end, not a fifth item in the list.** Five tests (`tests/account-backup.test.mjs:239`, `tests/account-storage.test.mjs:3075` and `:3366`, `tests/startup.test.mjs:580`, and the like) quote the list word for word. A new item inside it would have made me edit comments in tests, which the task says it does not do. Rejected: editing those five quotations. Cost if wrong: the list stays four items long, with the fifth connection stated one sentence later.
- **D-360: the question in its heading now ends "passwords, sessions and blocks".** The decision now speaks of blocks and unblocks too. Nothing else cites the old heading (grep over the repository). *Rejected* of D-360: the old item "a step in which the human reads the lines ... from the server's log" is gone, because that step is now chosen; the "Not chosen" of F-3 and of questions 1 and 2 stand in it, each with its cost.
- **D-15 sentence 3 is extended, not a fourth sentence** (the paragraph has three; the tests quote sentence 2 whole and sentence 3 by its first words).
- **`tracked-file-private-names`: *Derives from* gains D-13** next to D-362, because the exception's condition (the private note of secrets) is held in D-13 (template, "The sentence": a condition an entry holds is named in the link).
- **D-235, D-109 *Relations*: `derives from D-356`.** The closed list has only `derives from` and `narrows`; the watcher and the report route are things D-356 decides, so the others follow from it.
- **The log search of step 8 reads the file and its generations, not the log of the running container.** The handoff lists `docker logs` of the running container as a third source. By step 8 the container is the one that step 6's deployment started (it recreates both services), so its log holds only what happened after the restore, and nothing in it may be repeated. The step says so in one sentence instead of giving a command. If the orchestrator wants the command as well, it is one line: `docker logs --timestamps loop2 2>&1 | grep -F -m 500 -e ... `, with the same three markers. Placement (inside step 8, after step 6) and the three markers are as the handoff gives.
- **Installing step 8 and the trial paragraph: "write the name down with the day and hour it was saved".** To do 9(a) needs the time a marker was written to pick the one before the backup's time. A small addition beyond the item; it can go if the human objects.
- **The time boundary of the search in step 8:** later than the time of the backup (the `made:` line of its weekday file in UTC, else the file's time against the server's clock) and earlier than step 6; and "of an account's block and unblock lines only the last one counts". These two are mine; the task says "newer than the time of the backup" only. Without the upper bound a block made by the human after the restore would be repeated; without "the last one", an account blocked and unblocked since the backup would be blocked again.
- **A block or an unblock made with the plain command (no wrapper appending a line) leaves no line in the file.** The step says so and sends the human to the second part ("What the human knows"), which keeps the old bullets (resets and blocks known to the human) and adds the unblock.
- **The first part of step 8 has no place after a restore on a new server**; "With no server" step 9 says so and keeps only the second part.

## Reaches beyond the dispatch

- `src/server/log-line.ts` (`writeEvent`) and `src/server/database.ts:120-135`, to confirm the format of the log lines (`{"event":...,"accountId":...}`) and that `accounts(id, email)` exists in every schema version (the read-only command depends on it).
- `deploy/loop2-deploy:329-360`, to confirm what the dump appends (a header line with a UTC time, then `docker compose logs --no-color --timestamps`) and that the deployment recreates both services.
- `foundations/environment_facts.md` and the environment-facts element (`.the-way/elements/environment-facts/skill/*`, `template.md`), for the fact `git-path-patterns`.
- A search of `tests/` for `decision: D-109`, `D-112`, `D-15` and `D-360` and for `invariant:` citations of the three invariants, because the tests quote binding sentences word for word.
- `tests/deploy/watch_script_support.py:1-40`, for the wording of the watcher's seam in `guidelines/testing.md`.
- `~/.../rules/scripts.md` and `git.md` of the author's notes (the rules the global instructions name).

## Own-work check (WAY-164)

- **The requirement most likely to be wrong:** the new part of step 8 of the restore: a human on the day of the failure must be able to run it as written, and the address command must work in the container.
- **Checks made:** (1) the address command run in bash on a made-up database in WAL mode, with a second connection open, on Node v24.17.0 (the image's `node:24-slim` is the same line); `readOnly: true` and the `--` before the numbers work, an unknown number prints `no account`, exit 0. (2) The format of the lines to be searched read in `src/server/log-line.ts`, so the fixed strings `"event":"password-set"`, `"event":"account-blocked"`, `"event":"account-unblocked"` match what the game writes. (3) Quotations of tests against the changed binding sentences: the full foundation check passes with the new D-109, D-112, D-15.
- **What stays unchecked:** the command inside the real `loop2` container; the dump and generations on the real server (names `loop2-app.log.1`, `.2.gz` to `.4.gz` are those of D-355 and the skill); whether `date` and the weekday file's time share a time zone with the log's UTC (the step says to compare against `date` and to take an earlier time when in doubt).

## Concerns (for the orchestrator and the reviewers)

1. `account-email-nodemailer-starttls`: the foundation check lists it ("reads `test` and its sentence is changed by this change, while no file citing it changed"): the request must name it, saying what the sentence now says: "the account server submits the messages to Mikrus Outsider only when the SMTP connection has upgraded to TLS", the Nodemailer version having moved to D-154. The one test that cites it (`tests/account-mail.test.mjs:305`, "a server that offers no STARTTLS receives no login and no message") checks that no login and no message go before TLS, which the new sentence still says; it does not mention the version. (The case at line 282, which `guidelines/testing.md` also lists for this invariant, carries no `invariant:` line; I left that as it was.)
2. The three passages above (D-80, the existing fact, old line numbers) and the omission of the running container's log as a source are for the orchestrator to see; the second and the last are mine to be wrong about.
3. The task's *Not chosen* for F-3 says "the decision ... rejection rewritten so that the only reason is the extra step". I put it in *Rejected* of D-360 as a way not chosen with its cost, as the template asks for a row's *Source*.
4. *Weakest point of my work:* step 8's time boundaries and the rule "the last of the block and unblock lines" are my own reading of what the restored state needs; the task states neither. The check on them was by reasoning about what a restore brings back, not by running them.

## Working copies

- `.runs/author/`: held a made-up SQLite database (`t.sqlite`) and the edit script `edit_skill.py`; both removed (`find .runs/author -mindepth 1 -delete`), the directory is empty. No worktree or clone was made.

## Unread material

- `.the-way/elements/decisions/skill/projected.md` and `elements/common/projected_mode.md`, `missing_element_file.md`, `elements/common/critique/`: not read (projected mode, a missing file and a critique do not apply to this change).
- `examples.md` of the decisions and invariants elements name entries of the-way's own foundations (WAY-03 and the invariants listed); I did not open them: the form is held by the templates, which I read whole, and by the neighbouring entries of this log.
- The decisions D-13, D-154, D-231, D-351, D-362, D-137, D-356 and D-355 I read in the index and, for D-355, D-356, D-137, D-13 in part (binding sentences and the start of their other fields); of D-31 and the 15 testing decisions only the binding sentences and *Scope* in the index. The invariants `cross-part-imports`, `tracked-file-private-names`, `account-email-nodemailer-starttls` and `browser-failure-report` were read whole. `foundations/glossary.md`: searched for restore/backup/rollback/pusher terms (none found), not read whole. `foundations/part_map.md`: read the entry of `test-helpers` and the list of headings, not the whole file.
- `deploy/loop2-backup`: not opened (the wording of D-235 came from the watcher seam's docstring and the skill); `deploy/loop2-watch`: read its header (lines 1-30).
- `.claude/skills/loop2-deploy/references/setup_and_secrets.md` and `troubleshooting.md`: not read; a search for the old wording of step 8 found nothing in them.

## Searches not found or unclear

- `.claude/skills/loop2-deploy/SKILL.md:277` named in the task and the handoff as the manner of the bounded commands: line 277 is not a command; "How an agent reads it" (lines 287-292) is. Used that.
- The environment fact for `git-path-patterns` was not expected (the task speaks of a new fact); it exists.
- D-80: a withdrawn number, not a decision.
- What the field of `cross-part-imports` held that "the date and the commit" could mean: it held `git-path-patterns` only; the date and version are in that fact's entry.
- No decision or invariant cites D-360; nothing needed a rewrite of a reference.
