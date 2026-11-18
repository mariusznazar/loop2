# Author report — cztery-usterki-recenzji

**Status: done with concerns** (concerns in "Concerns and questions"; no question blocks the review).

Branch `task/cztery-usterki-recenzji`, base `be8eea82`. Not pushed. The full gate (`npm test`) was not run, as the handoff says.

## Commits

| Commit | What |
|---|---|
| `48c0d52c` | `src/server/database.ts`, `account-block.ts`, `account-backup.ts`; tests `tests/account-storage.test.mjs`, `tests/account-backup.test.mjs` (points 2, 3, 5) |
| `5c23a3d0` | `scripts/local-start.mjs`, `tests/invariants/test_local_start_access.py` (point 4) |
| `a6388cdb` | both copies of `loop2-deploy` (`SKILL.md`, `references/backup_and_restore.md`) (points 1, 6) |
| `b76678a7` | foundation: `foundations/decisions.md` (D-112, D-231, D-153 edited; D-430, D-431 new), `foundations/invariants.md` (`account-database-schema`), `guidelines/testing.md` (point 7 and rows 1-4) |

No move-out commit (WAY-365): the size run of D-425 lists the same four oversize places before and after (`kitchen-sink.tsx`, `startApp`, `createProgramsEntry`, `build`), none of them a file I changed; `database.ts`, `account-block.ts`, `account-backup.ts` and `local-start.mjs` stand under both thresholds.

## What was made

- **Point 5** (`database.ts`): the constructor reads the schema version, outside any transaction and before `PRAGMA journal_mode = WAL`, through one shared reader `readSchemaVersion` (a newer version or a non-number throws `UNSUPPORTED_SCHEMA`). The transaction of `initializeSchema` reads it again through the same function, so the race safety of D-112 is unchanged. A refused file is not written.
- **Points 2 and 3**: new option `existingOnly` of `AccountDatabase`. Used only by `account-block.ts` and `account-backup.ts`. With it, version 0 (an empty file or a foreign SQLite database) and SQLite error 26 (`SQLITE_NOTADB`, a file that is no SQLite database) throw a `ReasonedFailure` with code `NOT_ACCOUNT_DATABASE`, which the commands map to exit 3 with the sentence of the missing file and no JSON failure line. Because the check precedes the journal-mode change, an empty file stays 0 bytes. Both commands end every other failure with exit 1; the sentence says "run the command again" only when `isDatabaseBusy(error)` (SQLite error 5). Both predicates are exported from `database.ts`, so the commands keep no SQL and no SQLite number (guideline `coding-database-access.md`).
- **Point 4** (`local-start.mjs`): readiness is no longer "the port takes a connection". `watchConnectionsTo(serverPort)` subscribes to the channel `net.server.socket` of `node:diagnostics_channel` before the server is imported; `ownServerTakesConnection` connects and waits until a server of this process has taken that connection (matched by the client's port), and gives up as soon as `process.exitCode` is set. A program of another process holding the port never takes a connection through this process's server, so the start waits until the real server's listen error sets the exit code, then exits with it. `acceptsConnections` is removed (it would be an unused function).
- **Points 1, 6**: the sentence at `SKILL.md` (now line ~557) says a correct password of a blocked account does not count and a wrong one counts as for any account (D-139); the block command's exit paragraph says exit 3 covers a file the server never set up and exit 1 gives the advice to run again only for a busy database; `references/backup_and_restore.md` row "6 stream" says the same for the backup command. Both copies are identical (`diff -r` clean; `test_loop2_deploy_skill.py` passes).
- **Point 7**: D-153 binding sentence now ends "Public self-service account recovery is enabled."; the *Verification* pair says recovery is offered by the card and no setting turns it off; the delivery-test passage of *Rationale* is replaced by the content the task gives (Gmail mailbox, both messages arrived, links worked, the words of 2026-11-18, confirmation checked 2026-11-14, the date of the reset attempt unknown, decision „włączamy” of 2026-11-18); the sentence that no entry shows arrival is gone; the clause "checked by no test" now says a person checks delivery (D-163).

## Foundation entries (each: row, one sentence in English and one in the task's language)

- **D-112 edited — `row 1`.** EN: only the server sets up a new database, the blocking and backup commands refuse an empty file, a non-SQLite file and a SQLite file with no schema version with exit 3 and write nothing; and (point 5) the version is read before the journal mode changes and again in the transaction. PL: nową bazę zakłada tylko serwer; polecenia blokady i kopii odmawiają pliku bez tabel serwera kodem 3 i niczego w nim nie zapisują; wersję schematu czyta się przed zmianą trybu dziennika i jeszcze raz w transakcji.
- **D-231 edited — `row 1`.** EN: the backup command opens only a file in which the server set up its tables and refuses any other with the exit code of a missing file. PL: polecenie kopii otwiera tylko plik z tabelami założonymi przez serwer, inny odrzuca kodem brakującego pliku. (The edit extends the existing sentence at its end, so the two older `decision:` quotations of it, in `tests/account-backup.test.mjs` and `tests/deploy/test_loop2_backup.py`, stay valid unchanged.)
- **D-430 new — `row 2`** (section "Account server: access, security and blocked accounts"). EN: the two commands end every database failure other than the refused file with exit 1 and a sentence that advises to run again only for a database busy past the wait. PL: oba polecenia kończą każdą awarię bazy poza odrzuconym plikiem kodem 1, a radę „run the command again” dają tylko przy bazie zajętej dłużej niż czas oczekiwania.
- **D-431 new — `row 3`** (section "The gate, test tools and the local start"). EN: when another program holds the server's port the start ends with the server's failure line and exit code, announces no address, passes no request and tries no other port. PL: gdy port serwera zajął inny program, start kończy się wierszem awarii serwera i jego kodem, bez adresu, bez przekazywania żądań i bez próby innego portu.
- **`account-database-schema` edited — `row 4`.** EN: an unknown newer schema is refused before readiness leaving the file as it was, its version, records and journal mode included. PL: nieznany nowszy schemat jest odrzucany przed gotowością, plik zostaje taki, jaki był, razem z wersją, rekordami i trybem dziennika.
- **D-153 edited — `projected`/point 7** (task *To do* 7, not a row). Described above.
- Not a row: `guidelines/testing.md` (Trust boundaries): decision list gets D-112, D-430, D-431; the `src/server/` row names the new refusal cases and the newer-schema case; the `scripts/local-start.mjs` row names the port-taken case. Written in place in the Polish of that file. No glossary term, environment fact or part-map change was needed.

## Checks (command → exit code)

Focused, all after the final code state unless marked:

- `node --test tests/account-storage.test.mjs` → 0 (92 pass); `tests/account-backup.test.mjs` → 0 (12); `tests/account-owner.test.mjs` → 0 (13); `tests/owner-routes.test.mjs` → 0 (13); `tests/account-database-check.test.mjs` → 0 (8); `tests/startup.test.mjs` → 0 (18); `tests/http.test.mjs` → 0 (95).
- `python -B -m unittest test_local_start_access` in `tests/invariants` → 0 (22 tests, 179 s), run after the `local-start.mjs` change and before the last edit of the test file's `decision:` comment lines; the new case alone was not re-run after that comment edit, and `npm test -- tests/quality/test_quality_invariants.py` (below) covers the file's lint.
- `npm test -- tests/quality/test_quality_invariants.py` → 0; `test_function_and_file_size.py` → 0 (expected failure of the invariant stays, same four places); `test_source_tool_scope.py` → 0; `test_node_test_selection.py` → 0; `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` → 0.
- `python -B .the-way/elements/common/foundation_check.py` (no skip switch) → 0, "0 errors"; `python -B .the-way/instruction-files/check_instructions.py` → 0 errors, 144 warnings (dead-path warnings of the skill about host paths, present before; not caused by this change).
- `npx prettier --check src scripts tests/account-*.test.mjs` → 0; `npx eslint` on the changed files → 0.
- Not run: `npm test` (the cycle's), `tests/deploy/test_account_backup_stream.py` and `tests/invariants/test_account_save_sqlite_upgrade.py` (they need the Docker daemon; they run the commands inside the real container and I did not start one), `tests/deploy/test_loop2_backup.py` (not touched, its quotation of D-231 stays valid, but not run).

### Tests seen failing first

- DB-level, before `existingOnly` and the reordering existed (`node --test tests/account-storage.test.mjs`, exit 1): "opening a database of an unknown newer schema … journal mode included" failed on `the bytes of the file` (the journal mode had changed to WAL); "opening that may only find a database refuses …" failed on `Missing expected exception: an empty file`. The third new test ("tells a corrupt file, a newer schema and a busy file …") passed already (its failing run was only a cleanup error of my own on Windows, fixed before the code existed).
- Commands (`node --test tests/account-storage.test.mjs`, exit 1, `tests/account-backup.test.mjs`, exit 1): the block case failed with `4 !== 3` for the empty file (the old code created tables); the backup case failed with `0 !== 3` (an empty file gave a successful backup); the "advises only when busy" cases failed on the sentence (`/Nothing changed\./` and `/No backup was made\./` against the old sentence "for example while it was busy … run the command again").
- Local start: `python -B -m unittest test_local_start_access.LocalStart.test_a_port_another_program_took_ends_the_start_with_the_servers_failure_and_no_address` → exit 1 on the old code: `'Local game:' unexpectedly found in '{"failure":"server-listen","kind":"Error","code":"EADDRINUSE",…}\nLocal game: https://127.0.0.1:53753 …'` — the fault reproduced with the real built server; after the change the case passes (and the 22 tests of the file).
- Invariant test: `account-database-schema`'s new newer-schema case is the first of these (seen failing, then passing with the same command).
- Mutants in `dist/` (restored by `npm run build`): dropping `existingOnly` from the two commands fails exactly "refuses a file in which the server set up no tables" in `account-backup.test.mjs` (1 fail) and in `account-storage.test.mjs` (1 fail).

### Changed existing tests (cause and source)

- `tests/account-backup.test.mjs`: "a database that cannot be opened …" and "a failed backup adds the error's kind and code …" used a file that is no SQLite database as their failing database and expected exit 1 and `errcode: 26`. Point 2 of the task makes that file an exit-3 refusal, so the cause of the failure there became a damaged database (valid first page, garbage after it: `errcode: 11`); their other assertions (empty standard output, no path or message text, kind, code, place) stand. Source: D-231, D-112 as now written; task *To do* 2.
- `tests/account-storage.test.mjs`: "a database failure of the operator's command adds the error's kind and code …" likewise (now `errcode: 11`). The check "the operator's command changes nothing on … an unusable database" stands (it holds a missing file and a busy file).
- The `decision:` lines I wrote earlier citing a mid-sentence fragment of D-112 and D-137 were replaced by quotations that start a sentence (the checker requires it).
- The tests of `account-previous-save` and `account-role` (garbage file → exit 1, errcode 26) stand as they were: those commands do not use `existingOnly` (see concern 1).

## Own-work check (WAY-164)

Requirement most likely not met: "a file in which the server set up no tables is refused **and nothing is written in it**" (points 2 and 5) — the journal-mode write came first in the old order, and the commands could still create a file or a temporary directory. Checks: the new tests compare the bytes of the file and the listing of its directory (no `-wal`, `-shm` or new file), and for the backup command also that the command's temporary directory stays empty, for an empty file, a non-SQLite file, a foreign SQLite file and a newer schema; the DB-level test compares the bytes and the journal mode (`journal_mode` read back as `delete`). They show the file unchanged. Command: `node --test tests/account-storage.test.mjs` → 0, `node --test tests/account-backup.test.mjs` → 0.

## Choices made (with the way rejected and cost if wrong)

1. **Refusing a newer schema before the journal mode changes** (the choice the handoff named): a read of `user_version` outside a transaction before WAL, plus the unchanged read inside the transaction of `initializeSchema`. Rejected: dropping the in-transaction read (loses the race safety of D-112); a `BEGIN IMMEDIATE` around the whole opening including the WAL switch (SQLite refuses a journal-mode change inside a transaction). Cost if wrong: a newer-code process migrating between the two reads makes the second read refuse after WAL was switched; the file then has the journal mode WAL, which a newer server uses anyway.
2. **Option `existingOnly` on the constructor**, not a second class or a static function: the guideline says each check of the database belongs to `database.ts`, and one option keeps one opening path. Rejected: a pre-check function the commands call before opening (two reads, two places for the rule).
3. **One sentence for exit 3**, the same as the missing file (task row 1: "the same code as a missing file"); no JSON failure line for a refusal. Rejected: a second sentence naming the file as "not an account database" (more text in the skill; the task says the skill description should grow least).
4. **Local start readiness by `diagnostics_channel` `net.server.socket`** (see Concern 2). Rejected: re-checking `process.exitCode` after the connection (depends on the order of Node's internal queues: the listen error is emitted before the connection completes today, which I reasoned out but did not want to rest on); wrapping `console.log` to wait for the line `Loop: …` (couples to the text of a line); handing the server a socket (changes `main.ts`).
5. **D-430 binds the two commands only**, as the row says; it states that the commands of D-400 and D-410 keep their sentence. Rejected: binding "every operator command" (would make those two violate it today).
6. **D-231 extended at the end of its second sentence**, D-112 by one added sentence in paragraph 1 and one new paragraph 3 — the first paragraph of D-231 already holds three sentences (limit three), and keeping its wording up to "prints nothing to standard output" keeps two older test quotations valid.

## Concerns and questions

1. **`account-previous-save` and `account-role` still open an empty or foreign file as a new database** (they have the same `existingFile` function and the same "run the command again" sentence). The task and D-112 row 1 name the blocking and backup commands only, and D-112's first paragraph still says all four open "under the same rules". I did not extend `existingOnly` to them (not asked; their tests expect exit 1 for a non-SQLite file). Recommendation: a separate small task giving them the same option and the same advice rule; until then D-112's new paragraph and D-430 name the two commands, and the gap is the one I state there ("keep the sentence they have"). The reviewer should see this as intended, not as an omission of mine.
2. **`diagnostics_channel` `net.server.socket` is documented as experimental in Node 24.** Used only in `scripts/local-start.mjs` (a developer tool). If a Node release drops or renames the channel the start would never become ready and fail loudly after 30 s with `SERVER_NOT_READY`; every start test of `test_local_start_access.py` would show it at once.
3. **The task and the handoff call the invariant of row 4 `account-schema-lifecycle`; the invariants file holds it as a withdrawn identifier** (merged into `account-database-schema`, whose sentence said "without changing its version or records"). I edited `account-database-schema`, which is where its clause lives.
4. **D-153: the replaced passage held other dated facts** (the log events `link-issued` / `message-sent` of 2026-11-14 for both message types, and the first, wrongly typed address). The task says the delivery-test sentences are replaced by its content, so I replaced the whole passage and kept only what the task gives. The old passage said the operator "gave the password-reset result on 2026-11-14" while the task says the date of the reset attempt is unknown; I wrote it as unknown, as the task commands. Git keeps the old text.
5. **Guideline `guidelines/coding-database-access.md`** says "Sprawdź wersję w transakcji inicjalizacji; odmów otwarcia nieobsługiwanej wersji." It stays true, but does not say that the version is also read before the journal mode changes, nor mention `existingOnly`. Not in my handoff's files to change (I changed `guidelines/testing.md` only, because its trust-boundary table names the tests of these refusals). Recommendation: a one-sentence addition by the guideline-maintenance method in the return step or a following task.
6. A newer-schema file that is already in WAL mode still gets its `-wal`/`-shm` side files created by the first read (SQLite does this for any reader of a WAL database); its main file and journal mode stay as they were. The invariant's wording ("the file as it was") is checked on a file in the default journal mode, where the change was observable.
7. The handoff's wording "the sentence at lines 419-420" matches today's line ~557; found by text.

## Point 7: the search for a switch that turns recovery off (repeated)

Searched: `LOOP2_[A-Z_]+` across `src`, `compose.yaml`, `Dockerfile`, `deploy`, `.github` — only the 13 server settings (commit, database path, listen host/port, mail from/SMTP host/port/user/password file, proxy mode, public origin, session secret file, public URL); `grep -E "enableRecovery|recoveryEnabled|resetEnabled|feature|flag"` in `src/server`; `grep -in "self-service|recovery …|disable …(reset|recover)"` over the skills, foundation, `compose.yaml`, `deploy`; the routes `password-reset-message` and `password-reset` in `src/server/account-routes.ts` (registered unconditionally); `account-card.tsx` (button „Nie pamiętam hasła” at line 355, form „Ustaw nowe hasło”, no condition that hides them; `disabled` appears only for the lock of a form during a request). Found: nothing that turns recovery off. No change to the game or the server was made for it.

## Reaches beyond the handoff

- `.the-way/elements/common/way_of_working.md`, the decisions `template.md`, `read.md`, `decide_entry.md`, `common/rules.md`, the invariants `template.md`, `decide_entry.md`, `draft.md`, `write.md`: read whole as the foundation step and the element skills require (the handoff named the `SKILL.md` files and `foundation_step.md`).
- `src/server/account-role.ts`, `account-previous-save.ts` (grep/read): to learn whether they share the defect (concern 1).
- `deploy/loop2-backup` (grep of exit handling) and `.claude/skills/loop2-play/SKILL.md` lines 22-45: to confirm the nightly script reads no code and the play skill needs no change.
- `tests/account-owner.test.mjs` (read in part), `tests/startup.test.mjs`, `tests/http.test.mjs`: run, not read whole.
- Selection gap: the handoff did not name `guidelines/testing.md` rows for the touched trust boundaries as a file to change, nor `account-role.ts`/`account-previous-save.ts` as bearing on D-112's first paragraph.

## Working copies

`.runs/author/` held scratch scripts (a probe of SQLite behaviour, edit scripts for the foundation and skill files) and logs; all removed (`.runs/author/` is empty). Tests that make copies of the tree (`TreeCopy`) and temporary databases clean up by themselves. `dist/` in the worktree was built for the checks (ignored product output) and stays.

## Unread material

- Decisions named by the handoff: read whole D-112, D-153, D-231 (from its start to its *Rejected*, the middle of its *Rationale* in part), D-255, D-256, D-257, D-258 and D-425 (named by the coding guidelines). D-137 and D-139 read only as the task quotes them and as the tests quote them. Not read: D-102, D-100, D-160, D-228, D-236, D-405, D-354 and D-410 (D-410 only its tail, seen while placing D-430); I did not change what they bind. `.runs/orch/index.md` (59 KB) not opened.
- Invariants of the parts: read `account-database-schema` whole; `account-startup-configuration`, `local-start-access`, `account-save-backup-encrypted` not read whole (only the test of `local-start-access` that I touched, read whole).
- `guidelines/testing.md` read whole (two pages); `guidelines/coding.md` and `coding-database-access.md` read whole.
- The vault and the author's notes: unread, as the handoff says. (A hook of the session printed the rule files for scripts and git into my context; I followed them: ASCII output, LF, no `git add -A`.)
- `src/server/account-routes.ts` lines 810-828 (the source of point 1) read only through the task's description and D-139's quotation; the skill sentence follows D-139.

## Searches not found or unclear

- Invariant `account-schema-lifecycle` (row 4): not found as an entry; it is a withdrawn identifier merged into `account-database-schema` (concern 3).
- The `test_account_backup_stream.py` and `test_account_save_sqlite_upgrade.py` tests: found, not run (Docker).
- The line numbers 419-420 of the skill (concern 7): moved; found by text.
- No test, setting or file that switches recovery off: searched as above, none.
