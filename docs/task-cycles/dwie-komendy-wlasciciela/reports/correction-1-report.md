# Correction 1 report — dwie-komendy-wlasciciela

**Status:** done

**Commits** (on `07fb7ef0`, no amend):
- `4b11f209` fix: `isDatabaseBusy` reads the primary result code; test added.
- `7e91cbfe` docs: glossary entry `operator`; the `owner` entry linked to it.

## Remark 1 — M-1 (`isDatabaseBusy`)

- `src/server/database.ts`: `isDatabaseBusy` now checks `typeof error.errcode === "number"` and
  `(error.errcode & 0xff) === SQLITE_BUSY`, with a comment saying why (the extended code's low byte is
  the primary code). It is used by the four commands (`account-block`, `account-backup`, `account-role`,
  `account-previous-save`) and by `enableWriteAheadLog` (the server's retry of a busy opening); I searched
  `src`, `tests` and `scripts` for every use (`grep isDatabaseBusy|SQLITE_BUSY`): those six and the test
  file. All of them take the fix, as the remark says.
- Test, `tests/account-storage.test.mjs`: "a busy database is told from another failure by the primary
  result code, whatever the extended one", citing D-430's sentence "The sentence advises to run the
  command again only where the database stayed busy ..." (a sentence it holds: the advice follows
  busy only). It uses **real errors** from two `node:sqlite` connections to a WAL file: a read transaction
  left behind by another connection's commit that then writes gives **517** (SQLITE_BUSY_SNAPSHOT, seen
  in the precondition), a held write lock gives **5**, a real UNIQUE violation gives **2067** and sees no
  busy. **Only 261** (SQLITE_BUSY_RECOVERY) is an object shaped like the error (`{ errcode: 261 }`),
  because it needs another process recovering the log of a WAL database and no test can hold that still;
  the comment at it says so. The case also gives codes of other failures (1, 6, 19, 21, 262, 2067) and
  values that are no errors with a code (null, undefined, "5", `{ errcode: "517" }`, `{}`) and sees none
  busy. The code 21 is there to catch a mask that is too narrow (`& 0xf`), since 21 & 0xf = 5.
  Level: integration-level on real files for the real codes, as `guidelines/testing.md` asks for the
  database; no stand-in for the code under test.
- The break each part catches: the old comparison `=== 5` fails on 517 and 261 (seen below); a mask of
  `0xf` fails on 21; no `typeof` guard would fail on `"5"`/`{ errcode: "517" }` only if the string 517
  masked to busy (it would: `"517" & 0xff` is 5 in JavaScript), so that guard is held by those two values.
- Failing run before the code: `npm run build` exit 0, then
  `node scripts/test-node-file.mjs tests/account-storage.test.mjs` exit 1 (94 passed, 1 failed: the new
  case, at `SQLITE_BUSY_SNAPSHOT`, `actual: false`). One more failure on my first run was my test's own
  cleanup order (the temporary directory removed before the connections closed: `EBUSY` on the `-shm`
  file); I closed the connections in a `finally` instead and the case passed with the fix.
- Mutation after the fix: `& 0xf` instead of `& 0xff`, rebuilt: the new case failed (exit 1); restored
  (`git diff` shows only the intended change).
- Comparison with the foundation (was any sentence made false?): D-430 ("advises to run the command again
  only where the database stayed busy longer than the bounded busy timeout"): still true, and now true
  for a busy database reported with an extended code. D-112 ("a bounded busy timeout"; the busy retry of
  the opening): the retry now also retries an extended busy code; its sentence says a busy timeout, not a
  code. `guidelines/testing.md`: no sentence about result codes. `foundations/environment_facts.md`
  `loop2-app-log-sqlite-busy-lines` (a dated reading of the log for `"errcode":5,`): a dated observation,
  still true; a failure line for an extended busy code would now read 261 or 517, which the fact does not
  claim. No decision changed; none needed.

## Remark 2 — glossary entry `operator`

Written by following `.the-way/elements/glossary/skill/SKILL.md` (its `read.md`, `decide_entry.md`,
`write.md`, `template.md`, `examples.md`, and `elements/common/rules.md` and `way_of_working.md`):
- Search of the uses: `git grep -i -w operator` over the tracked files outside `.the-way` and `docs`
  (the foundation files, the skills and their references, `deploy/`, `scripts/`, `src/`, guidelines,
  `security-notes.md`, tests). Every use of the product names one person: the one who reaches the server
  and runs its commands, and, in `security-notes.md` and `.github`, the same human as the owner of the
  repository and of its GitHub account. The only other use is in an external quotation about
  "the exponentiation operator" (WCAG formula, a source's words, not the product's). No second meaning, so
  no renaming and nothing to rewrite. The glossary of the-way holds no such term.
- Entry (`foundations/glossary.md`, before `owner`): "The operator is the person who reaches the server
  and runs its commands, such as the block of an account, the grant of the previous-save privilege and the
  giving of the owner role." *Not:* `none`. The definition is the meaning the `owner` entry already
  carried ("the person who reaches the server and runs its commands"), with the three commands the
  foundation names as examples; I did not add the repository owner's wider uses (`security-notes.md`) to
  the definition, because the remark asks for the meaning `owner` carries; they are the same person.
- The `owner` entry: *Not* line kept (the meaning it excludes), its carrier changed from the quoted
  word `"operator"` to the term `operator`, as other entries name a term of another entry (like
  `earning loop`), so that it links and does not copy the meaning.
- Marked **the cycle's**, for the request. English: the operator is the person who reaches the server and
  runs its commands, such as the block of an account, the grant of the previous-save privilege and the
  giving of the owner role. Po polsku: operator to osoba, która ma dostęp do serwera i uruchamia na nim
  jego polecenia, takie jak blokada konta, nadanie uprawnienia do poprzedniego zapisu i nadanie roli
  właściciela.
- Check: `python -B .the-way/elements/common/foundation_check.py` exit 0, "0 errors", after the entry.

## Return step (for what the remarks touch)

- Decisions: none written or changed; D-112, D-430 compared with the code (above), true.
- Invariants: none (`account-database-schema` is about opening a file and is not touched).
- Environment facts: none written; `loop2-app-log-sqlite-busy-lines` compared (above), true.
- Glossary terms: `operator` (written, the cycle's); `owner` (its *Not* carrier changed to the term).
- Part-map changes: none (`account-server` and its files unchanged; no file added or removed).
- Rows of *Settlements to record*: rows 1 and 2 stay as D-112 and D-430, written earlier; nothing new.
- Projected entries: none.

## Checks (command, exit code)

- `npm run build` exit 0
- `node scripts/test-node-file.mjs tests/account-storage.test.mjs` exit 0 (95 passed)
- `node scripts/test-node-file.mjs tests/account-owner.test.mjs` exit 0 (15 passed)
- `node scripts/test-node-file.mjs tests/account-backup.test.mjs` exit 0 (12 passed)
- `node scripts/test-node-file.mjs tests/account-database-check.test.mjs` exit 0
- `npx eslint` on `src/server/database.ts`, the two commands and the three test files, exit 0
- `npx prettier --check` on the same files, exit 0
- `npx tsc -p tsconfig.server.json --noEmit` exit 0
- `python -B .the-way/elements/common/foundation_check.py` exit 0 (0 errors)
- `python -B .the-way/instruction-files/check_instructions.py` exit 0 (0 error, 144 warn, 7 info)
- `node tests/quality/eslint-size-rules.mjs` exit 0 (0 over a threshold)
- Not run: `npm test` and the rest of the repository's tests (the orchestrator runs them).

## Own-work check (WAY-164) and weakest point

Requirement most likely missed: the retry of the server's busy opening (`enableWriteAheadLog`) now also
retries an extended busy code. No test of mine drives that retry with an extended code: the real
extended busy code (517) needs an open read transaction, which the opening of `AccountDatabase` does not
hold. It is held by `isDatabaseBusy`'s own case, which the retry calls; the retry loop itself is
unchanged. That is the weakest point: a future edit of the retry that stops using `isDatabaseBusy` would
not be caught by this case. Not run: a test of the retry with an extended code.

A second note: the shaped 261 is an assertion on an object I made, as the test comment says; the real 261
was not reproduced.

## Reach beyond the handoff

None beyond the files the handoff names and a `git grep` of "errcode" and "SQLITE_BUSY" across
`foundations`, `guidelines`, the skills and `README.md`, which found the environment fact compared above.

## Unread material

- D-84 and the testing decisions the guidelines name: not opened whole; I followed
  `guidelines/testing.md` (read whole in the first run, re-read the rows I touched), the guideline sentence
  "Replace only what is slow or outside" (D-84) as quoted there.
- The glossary: read the entries around the change (`blocked account`, `previous-save privilege`,
  `owner`) and the `Not` lines of all entries by search, not every entry whole.
- `reports/review-whole-report.md` and its scratch files: not opened; I reproduced the finding myself
  with a probe (517 for a snapshot error, 1555/2067 for key violations).

## Searches not found or unclear

None.

## Working copies

`.runs/author/` (a probe script, edit scripts, a backup of `database.ts` for the mutation, logs); removed
with `rm -rf .runs/author`; `git status` is clean. Temporary directories my probe made were under
`.runs/author/` and went with it; the test's own files stand in the system's temporary directory and are
removed by the test (`handmadeFile`).
