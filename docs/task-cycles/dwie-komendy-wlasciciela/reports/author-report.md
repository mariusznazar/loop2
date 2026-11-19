# Author report — dwie-komendy-wlasciciela

**Status:** done

## Commits (branch `task/dwie-komendy-wlasciciela`, base `23b521a2`)

- `fc94ef7e` fix: code of the two commands, `database.ts` comment, tests, D-112 and D-430 (together,
  because the foundation check requires the test citations and the decision sentences to agree).
- `a8361ff0` docs: the two copies of the deploy skill, `guidelines/coding-database-access.md`,
  `guidelines/testing.md`.

## Files changed (added/removed lines, `git diff --stat 23b521a2..HEAD`)

| File | +/- |
|---|---|
| `src/server/account-role.ts` | 24/9 |
| `src/server/account-previous-save.ts` | 20/8 |
| `src/server/database.ts` (comment of `existingOnly`, item 4) | 3/2 |
| `tests/account-owner.test.mjs` | 162/10 |
| `tests/account-storage.test.mjs` | 132/33 |
| `tests/account-backup.test.mjs` (two citations) | 2/2 |
| `foundations/decisions.md` (D-112, D-430) | 12/12 |
| `.claude/skills/loop2-deploy/SKILL.md`, `.agents/skills/loop2-deploy/SKILL.md` (identical edits; `diff` of the two copies empty) | 20/11 each |
| `guidelines/coding-database-access.md` | 6/0 |
| `guidelines/testing.md` | 1/1 |

(Per-file counts from `git diff --numstat 23b521a2..HEAD`.)

## What was done, by item

1. `account-role.ts` and `account-previous-save.ts` open `new AccountDatabase(path, { existingOnly: true })`,
   refuse with `isNotAccountDatabase` by exit code 3 and `noTablesSentence` (word for word that of
   `account-block.ts`), and write nothing; the `noFileSentence` of a missing file, a directory, an empty
   or unset path and `:memory:` is unchanged. No SQL in the commands.
2. They advise "run the command again" only for `isDatabaseBusy`; every other failure is exit 1 with
   "The account database could not be opened or changed. Nothing changed." The JSON line of the failure
   still comes first (`writeFailure` before the sentence), as in the blocking command.
3. Both copies of the deploy skill: codes 1 and 3 of the role and previous-save "What it prints." as
   the blocking section words them; the sentence "the commands `account-previous-save` and
   `account-role` do not refuse such a file, and set up a new database in it" is gone.
4. Comment of `existingOnly` in `database.ts`.
5. `guidelines/coding-database-access.md`: added to the rule "Otwarcie schematu bez utraty danych" the
   version read once before the journal mode changes, and the binding of every owner command with
   `existingOnly`, with the two named exclusions.
6. `guidelines/testing.md`, row `src/server/`: the two new refusal cases are listed beside the blocking
   one (with D-400 and D-410 as the decisions).
- Settlement rows (foundation step, read `foundation_step.md` and the `record-decision` SKILL.md with
  its `read.md`, `decide_entry.md`, `template.md`, `way_of_working.md`, `rules.md`, `examples.md` as a
  file list only):
  - **row 1** -> sentence of D-112, third paragraph, written whole: "Beyond the rules above, no command
    that the owner runs on the server and that changes or copies the account database sets up a new
    database, ... a command added later as well: each opens only a file in which the server has set up its
    tables, refuses ... with the exit code 3 ... and writes nothing in it. Two openings are not bound by
    this: the command of the restore procedure of D-360 that only reads the addresses of accounts, and the
    check of the database at the build of the image, which sets up a temporary database of its own."
    English: no owner command that changes or copies the account database sets up a new database, also a
    later one; the restore reading command and the image-build check are named exceptions.
    Po polsku: żadne polecenie właściciela, które zmienia albo kopiuje bazę kont, nie zakłada nowej bazy,
    także polecenie dodane później; z nazwy wyłączone są polecenie odtwarzania, które tylko czyta adresy,
    i sprawdzenie bazy przy budowaniu obrazu. The old sentence "The commands of D-400 and D-410 are not
    bound by this" and its twin in *Rationale* are gone. *Verification* `tests:` clause now names the four
    commands; the pair of examples got one `complies` and one `violates` for the later command (the part
    no test holds). *Rejected* got "naming only the four commands of today" from the task's *Not chosen*.
  - **row 2** -> sentence of D-430: question changed to "What do the commands that the owner runs on the
    server say when they cannot open or change the account database?"; first sentence binds every such
    command, a third sentence names the same two exclusions; *Relations* gained `derives from D-400` and
    `derives from D-410`; *Verification*, *Rationale* and *Rejected* updated (the sentence "the commands of
    D-400 and D-410 keep the sentence they have" is gone). English: every owner command that changes or
    copies the account database ends other database failures with exit 1 and advises a rerun only for a
    busy database. Po polsku: każde takie polecenie kończy inną awarię bazy kodem 1 i radzi powtórkę tylko
    przy zajętej bazie.
  - Both marked `row 1` / `row 2`; no entry of another kind; no collision with another decision found
    (D-400 and D-410 sentences stay true, as the task said); the invariant `account-database-schema` and
    the part map untouched, since nothing in them said the old thing.
  - The five citation lines (`tests/account-backup.test.mjs` x2, `tests/account-storage.test.mjs` x3) now
    begin the new binding sentences; the new cases cite D-112 / D-430 / D-400 / D-410 in the same form.

## Tests

- New (`tests/account-storage.test.mjs`): "the previous-save command refuses a file in which the server
  set up no tables with the code of a missing file, and writes nothing in it" (empty file, no SQLite
  database, SQLite database with no schema version; grant and revoke; exit 3, the sentence, no advice,
  no byte or file name beside it changed); "the previous-save command advises to run it again only when
  the database was busy longer than the wait allows" (busy: exit 1 and the advice; newer schema and
  damaged file: exit 1, no advice, newer file unchanged).
- New (`tests/account-owner.test.mjs`): the same two cases for the role command (`owner` and `player`).
  Local helpers `handmadeFile` and `makeCorruptDatabase` were added there (copies of the helpers of
  `account-storage.test.mjs`, because the files do not share a module).
- Changed, with the cause stated (D-354 citation kept, the purpose kept — JSON line first, kind and code
  of the error and nothing of its text, nothing changed): "a database failure of the previous-save
  command ..." (`account-storage`) and "a damaged database file fails with the JSON line of the failure
  first, and changes nothing" (`account-owner`, renamed from "a database file that is no database ...").
  They used a file that is no SQLite database as the failing database; it now gets exit code 3, so they
  use a database damaged past its first page (errcode 11, as the blocking command's case does); the
  expected exit code 1 stays, the expected errcode changes 26 -> 11 for that reason. The assertion
  "run the command again" was replaced by `Nothing changed.` plus, in the new advice cases, the absence of
  the advice. Not weakened: each still asserts the failure line fully.
- In `account-storage.test.mjs` the array of the three kinds of file with no tables moved out of the
  blocking command's case into the module-level `filesWithNoTables`, used by that case and by the new
  previous-save case; no assertion of the blocking case changed.
- The breaks each new test catches: dropping `existingOnly` (the file would get tables, exit 4 not 3 —
  seen below); dropping the `isNotAccountDatabase` branch (exit 1 with an advice); an advice for every
  failure (the damaged/newer cases fail); no advice for busy (the busy case fails); a write in the
  refused file (the byte and name snapshot).

## Checks (command, exit code)

Failing run before the code of items 1 and 2 (the two sources reverted, rebuilt):
- `npm run build` exit 0, then `node scripts/test-node-file.mjs tests/account-owner.test.mjs` exit 1
  (3 failed: the damaged-file case on `Nothing changed\.` — the old sentence had `;` after it — the
  no-tables case on exit 4 instead of 3, the advice case on the same sentence); 
  `node scripts/test-node-file.mjs tests/account-storage.test.mjs` exit 1 (the same three cases of the
  previous-save command; 91 passed, 3 failed). So each new case failed for its expected reason.

After the code:
- `npm run build` exit 0.
- `node scripts/test-node-file.mjs tests/account-owner.test.mjs` exit 0 (15 passed).
- `node scripts/test-node-file.mjs tests/account-storage.test.mjs` exit 0 (94 passed).
- `node scripts/test-node-file.mjs tests/account-backup.test.mjs` exit 0 (12 passed).
- `npx eslint` on the six changed code and test files exit 0.
- `npx prettier --check` on the six code and test files: passed (the run also listed four Markdown files,
  which the repository's Prettier scope does not cover; they were reported as unformatted before my change
  too, and I did not format them).
- `npx tsc -p tsconfig.server.json --noEmit` exit 0.
- `python -B .the-way/elements/common/foundation_check.py` exit 0, "0 errors" (run after the decisions,
  after the citations and after the guidelines).
- `python -B .the-way/instruction-files/check_instructions.py` exit 0, "0 error, 145 warn, 7 info"; the
  warnings are `dead-path` ones for paths on the server and in the two skill copies and in
  `guidelines/testing.md` lines I did not write; I did not compare the count with the base.
- `node tests/quality/eslint-size-rules.mjs` exit 0, "0 functions and files over a threshold in 323
  files" (D-425; `database.ts`, the two commands and the tests stay inside; D-425 puts test files outside
  the file limit).
- `python -B -m unittest discover -s tests/agent_workflow -p "test_*skill*.py"` exit 0 (23 tests, includes
  the deploy skill); `diff` of the two skill copies empty.
- Not run: `npm test` (the cycle's run); the tests of the other files; `ruff`/`shellcheck` (no Python
  or shell code changed).

## Own-work check (WAY-164)

Requirement most likely not met: "niczego w nim nie zapisują" for a file the server set up no tables in,
and exit 3 for every unusable path, including those that are not files. The check: the new cases snapshot
the bytes and the directory listing (a -wal or -shm file would show) before and after, for the three kinds
of file and both actions of each command — passed after the code, failed on exit code before it. Besides,
a one-off run of both built commands on a directory path and on a zero-length file in my working
directory: directory -> exit 3 with the missing-file sentence, empty file -> exit 3 with the no-tables
sentence, the file stayed 0 bytes with nothing beside it. Busy database: exit 1 with the advice,
confirmed by the new cases.

Weakest point: the advice is decided by `isDatabaseBusy(error)`, which reads `errcode === 5`. It is true
for the lock `BEGIN IMMEDIATE` of another connection (the test), but a busy error that SQLite reports
with an extended result code (for example `SQLITE_BUSY_SNAPSHOT`, 517) would read as "not busy" and get
no advice. That function is shared with the blocking and backup commands and unchanged; I did not
investigate whether `node:sqlite` reports extended codes in `errcode` (a guess, not verified).

## Choices

- Both commands copy the structure of `account-block.ts` (own `noFileSentence` and `noTablesSentence`
  constants per file) instead of moving the shared sentences and the check of the path to a helper
  module: the three commands of the repository already hold the duplicate `existingFile` function, and
  a shared helper changes three files outside this task. Cost if wrong: one more copy to keep equal; the
  tests of each command check its sentence.
- D-112 and D-430 name the four commands in D-112 (the paragraph already lists them) and, in D-430, in
  *Relations* and *Rationale* only, so that the question and the binding sentences hold the rule and the
  quotation of the test citation begins a sentence. Rejected: listing the four in the first binding
  sentence of D-430 — it would put a dash clause inside the quoted prefix.
- No move of code before the change (WAY-365): none of the files I added to stands over a threshold
  (the two commands are about 100 lines, `database.ts` only got a comment, and D-425 puts the tests
  outside the file limit; no function over 200 lines).

## Reach beyond the handoff

- `foundations/decisions.md` D-231 and D-360 and `foundations/glossary.md`: read by search only for the
  words that repeat the old sentence (lines 2250-2312 of D-231 name the backup command alone; nothing
  false). `security-notes.md`: searched, says nothing of these commands. `git grep` over the repository
  for "set up a new database", "never creates", "run the command again" and the D-400/D-410 phrasing:
  the only hits that became false were the deploy skill, the comment in `database.ts`, D-112, D-430, the
  citations and the two guidelines already in the task. Nothing else needed a fix.
- `tests/account-database-check-standin.mjs` and `tests/owner-routes.test.mjs`, `tests/startup.test.mjs`:
  searched for uses of the two commands; they touch no empty or foreign file with them.
- The index `.runs/orchestrator/index.md` was not opened; D-112 and D-430 I read whole from the log, and
  D-400, D-410, D-137, D-231, D-354 and D-360 only through the search lines of D-112/D-430 and
  `git grep` (see Unread material).

## Working copies

My directory `.runs/author/` stood in the worktree (edit scripts, build and test logs, the patch used to
revert the sources for the failing run, a directory and an empty file for the one-off run). Removed with
`rm -rf .runs/author`; nothing remains. No worktree or clone was made. The built output in `dist/` is the
product's own build output, not my copy.

## Unread material

- Decisions D-400, D-410, D-137, D-231, D-354, D-360, D-114, D-252, D-253, D-425: D-425 read whole;
  D-400/D-410/D-137/D-231/D-354/D-360 read only through the lines `git grep` found (their binding
  sentences as quoted in the task and in the existing test citations); D-114, D-252, D-253 not opened
  (no code or sentence of them changes).
- The invariant `account-database-schema`: read its sentence and fields (lines 768-777), no other
  invariant of `account-server`, `agent-workflow`, `product-foundation` or `every` opened; the glossary
  entries of the terms and the part map entry of `account-server` not opened.
- `.runs/orchestrator/index.md`: not read.
- `guidelines/testing.md` read whole in two pages (the second with `allow_large`).
- `.the-way/elements/decisions/examples.md`: read the list only (it names WAY-03; the-way's own log was
  not opened); the form of the entries I followed was that of D-112 and D-430 themselves and the template.

## Searches not found or unclear

- None unclear in the task. One mismatch with the handoff's notes: it places the `existingOnly` comment
  at "lines 212-214" of `database.ts`; it stood there (211-214). Both existing tests that expected the
  SQLite error 26 were where the handoff said.

## Problems observed

- None in the product. Note for the reviewer: the testing guideline's row for `src/server/` lists the
  refusal cases by name; the task asked for the two new ones to stand there and they do, but the row does
  not list the advice cases (D-430) for any of the four commands, as before.
