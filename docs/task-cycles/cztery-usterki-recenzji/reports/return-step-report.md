# Return step report — cztery-usterki-recenzji

**Status: done.** Head `11a0f28d` (the reviewed head `f775999a` plus one commit). Not pushed; the full gate was not run.

**Commits:** `11a0f28d` — `docs: :card_file_box: quote in D-431 the page of the Node.js documentation that marks the channel net.server.socket as experimental, which the risk in its rationale rests on` (changes `foundations/decisions.md` only).

## Foundation compared with code (`f775999a`)

Each entry read whole (the log's entries from heading to the next heading) and compared with the code and the tests at `f775999a`.

- **D-112** (paragraph 1, the added sentence on the version read before the journal mode and again in the transaction; paragraph 3; *Verification* `tests:` clause; *Rationale*; *Rejected*): matches `database.ts` (`checkSchemaVersionBeforeChanges` before `enableWriteAheadLog`, `readSchemaVersion` in `initializeSchema`; `existingOnly`; exit 3 with a sentence of its own in `account-block.ts`/`account-backup.ts`). The sentence "The commands of D-400 and D-410 … still set up a new database in a file that holds none" (and the same sentence in both copies of the skill and in the comment at `database.ts:213-214`) is true for an empty file or a SQLite file with no schema version and not for a file that is no SQLite database at all: **this is N-1 of the review of the fix**, not corrected here, left for the request's list.
- **D-231**: second sentence of paragraph 1 ("the file it opens is one in which the server has set up its tables, any other file being refused with the exit code of a missing file and nothing written in it"), *Verification* and *Rationale*: match `account-backup.ts` and its tests. The nightly script `deploy/loop2-backup` reads no code number (earlier read); nothing in D-231's script sentences changes.
- **D-430**: both sentences match both commands (exit 1; "Nothing changed." / "No backup was made."; "run the command again" only when `isDatabaseBusy`). Its *Rationale* says it binds the two commands only: true.
- **D-431**: matches `scripts/local-start.mjs` (`watchConnectionsTo`, `ownServerTakesConnection`, exit with the server's exit code, no address, no other port) and `test_a_port_another_program_took_ends_the_start_with_the_servers_failure_and_no_address`. **Mismatch found and corrected:** its *Rationale* cites the Node.js documentation (Stability 1, experimental) as the ground of the risk, but its *Based on* read `none`; the decisions template has *Based on* quote every source outside the product with address, place, passage and date read. Corrected in `11a0f28d`: *Based on* now holds `https://nodejs.org/docs/latest-v24.x/api/diagnostics_channel.html § Built-in Channels, NET — "Stability: 1 - Experimental"; read 2026-11-18` (the page I read in the fix round; the address is that of the v24 line of the documentation, which the publisher keeps moving, and the entry says so only by this note — no archived edition was available to me). No environment fact: the decision's binding sentences do not depend on the channel, so its change would not call D-431 into question (template, "Which facts are written").
- **D-153** (binding sentence, *Verification* pair, *Rationale*): matches the task's point 7 and the repeated search (no setting turns recovery off). Its pair concerns a part no test holds (no setting turns recovery off), so it stays; the clause `tests:` still names the SMTP test only.
- **Invariant `account-database-schema`**: the sentence "…leaving the file as it was, its version, records and journal mode included" is checked by the test "opening a database of an unknown newer schema refuses it and leaves the file as it was, its journal mode included" (cites it by `// invariant:`), seen failing before the reordering and passing after (first author report).
- **Decisions in play not written by the change**, read for the behaviour altered: D-137 (the command "changes nothing when it refuses"; *Verification* "an unusable or busy database with a report and no change"): still true, a refused file is such a refusal. D-139 (blocked account with a wrong password gets the message of D-100 and counts): matches the skill sentence now written. D-255: first sentence unchanged and true; D-431 derives from it.
- **Part map** (`account-server`, `build-tools`, `agent-workflow`, `product-foundation`): responsibilities (the four operator commands, the local start over HTTPS), files (no file added or removed; `tests/account-storage.test.mjs`, `tests/account-backup.test.mjs` and `tests/invariants/test_local_start_access.py` are listed) and trust boundaries (`src/server/**`, `scripts/local-start.mjs`) still describe the code. No change.

## The search of the whole foundation (once)

Searched `foundations/*.md`, `guidelines/*.md`, `README.md`, `AGENTS.md`, both skill copies and `deploy/loop2-backup` for: "run the command again"/"run it again", "under the same rules", "existing database (file)", "exit code 3"/"exit 3"/"exit code 1", "never creates"/"creating no database", "opens the database", "journal mode"/"WAL", "local start"/"npm run local"/"local-start", "only the server sets"/"sets a new one up". Entries found and read whole: D-112, D-114, D-137, D-139 (as quoted), D-228, D-231, D-236, D-255, D-256, D-257, D-258, D-360, D-400, D-410 (as to the command), D-430, D-431, the invariants `account-database-schema` and `local-start-access`, `README.md` section "First run" (the local start: "the system picks the port at every start", the silent-port rule of D-256 — unchanged behaviour, nothing about a taken port). Nothing else states the behaviour the change altered: D-228 and D-236 speak of the backup being whole and of `backup()`, D-360 of a restore, D-400 of the privilege command (it still "changes nothing on … an unusable database", true), D-256 of the stop and the proof of a running start (the code of those parts is untouched). Result: one correction, in D-431 (above). The skill text the entries quote (the sentence about the limit of failed logins, the exit-3 clause, the backup row) agrees with D-139, D-112 and D-430.

## Entries by element

- **Decisions written or changed:** none by this step beyond D-431's *Based on* (the change wrote or changed D-112, D-153, D-231, D-430, D-431).
- **Invariants written or changed:** none by this step (`account-database-schema` was changed by the change: its rule is set by D-112 and row 4 of the task).
- **Environment facts:** none written. The one source outside the product that was not held, the Node.js documentation of the channel, is quoted in D-431's *Based on*, not made a fact (reason above). Behaviour of SQLite the change observed (a change of journal mode writes to the file; `PRAGMA user_version` of an empty file reads 0 and of a non-database file fails with error 26) is shown by the tests in the repository, so it is no source outside the product that the foundation lacks.
- **Glossary terms:** none. No word of the change is used against its entry; "set up" a database is plain English, not a term.
- **Part-map changes:** none.
- **Projected entries:** none (the task is independent of any project).
- **Rows of *Settlements to record* written** (the frozen task's rows; row 4 names `account-schema-lifecycle`, a withdrawn identifier merged into `account-database-schema`):
  - row 1 → D-112 (third paragraph and *Rationale*; the first-paragraph sentence on the version) and D-231 (second sentence of paragraph 1);
  - row 2 → D-430;
  - row 3 → D-431;
  - row 4 → invariant `account-database-schema`.
  The skill sentences of points 1 and 6 of *To do* went to both copies of `loop2-deploy` (a skill, no entry); point 7 to D-153.
- **Pair of examples and `tests:`:** D-430 and D-431 carry no pair and name their tests by `tests:`; D-112 and D-231 keep their older pairs for the parts no test holds, and their `tests:` clauses name the tests of the new sentences; D-153's pair covers a part no test holds. Nothing to remove from a pair.
- **Entry-by-test links:** `foundation_check.py` (no skip switch) reports 0 errors, which includes the quotations of every `decision:` line and the citation of the invariant. By reading: `decision:` lines for D-112 (new sentence on the version before the journal mode; new paragraph 3), D-231 (existing prefix), D-430 (both sentences), D-431 (both sentences) stand in `tests/account-storage.test.mjs`, `tests/account-backup.test.mjs` and `tests/invariants/test_local_start_access.py`; `// invariant: account-database-schema` stands at the newer-schema test.

## Checks (command → exit code)

- `python -B .the-way/elements/common/foundation_check.py` (after the edit) → 0, "0 errors".
- No code or test changed, so no focused test was run; the change's tests passed at `f775999a` in the fix round and the review of the fix.

## Choices

- D-431's Node documentation citation went to *Based on* as a quoted source and not to a new environment fact; way rejected: a fact `node-diagnostics-channel-net-server-socket` (the template asks for a fact only where its change would call the decision into question; here only the mechanism of the Rationale would change). Cost if wrong: a later reader of the log would ask for the fact; adding it is one entry.

## Working copies

`.runs/author/` held one edit script; removed (the directory is empty).

## Unread material

None of the entries named by the handoff stayed unread except D-139, D-410 and D-228/D-236/D-360 beyond what I read (D-139 only as the task and the tests quote it; D-410 only its tail; D-228, D-236, D-360 read whole this step; D-137 and D-400 read whole).

## Searches not found or unclear

- No archived copy of the Node.js documentation page exists to my knowledge; I cited the v24 address as the page I read, and did not look for an archive.
