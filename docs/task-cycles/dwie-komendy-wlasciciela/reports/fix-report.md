# Fix report — dwie-komendy-wlasciciela

**Status:** done

**Commit:** `5d31c645` (on `a8361ff0`, the reviewed head). Files: `foundations/decisions.md` (7 lines
changed in D-112 and D-430), `guidelines/coding-database-access.md`, `guidelines/testing.md`,
`src/server/database.ts`, and the three test files (citations; two assertions); `git diff --stat`:
7 files, 23 insertions, 21 deletions.

## Findings

- **I-1 fixed.** "the owner runs on the server" became "the operator runs on the server" everywhere the
  finding lists, with the rule of both decisions unchanged in meaning (every command the operator runs
  on the server that changes or copies the account database, the same two exclusions):
  - D-112: third paragraph, both items of *Verification* (complies, violates), *Rationale*, and the
    *Rejected* clause "a fifth command of the operator".
  - D-430: the question ("What do the commands that the operator runs on the server say …"), the first
    binding sentence, *Rationale* ("… for the operator", "a later one too"), the *Rejected* clause.
  - The test citations that quote the two sentences, so each still begins the binding sentence it
    quotes: `tests/account-backup.test.mjs` 2, `tests/account-owner.test.mjs` 2,
    `tests/account-storage.test.mjs` 5 (the 3 that changed in the first commit and the 2 new ones, with
    the D-430 ones counted in the same 5).
  - M-2: comment of `existingOnly` in `src/server/database.ts` ("Every command the operator runs on the
    server …"); `guidelines/coding-database-access.md` ("Każde polecenie, które operator uruchamia na
    serwerze …"; "operator" as `guidelines/coding.md` writes it, no reason found to keep the Polish word).
  - Search for any other place where "owner" names the person at the server: `git diff 23b521a2..HEAD`
    searched for "owner" and "właściciel" in the added lines and `git grep` for "the owner runs",
    "owner runs on", "właściciel uruchamia", "owner's command", "command(s) of the owner". Left as they
    are, because they mean the role or an existing name: "owner" in the new role-command tests (the word
    `owner` of the command's argument), the helper name `runOwnerCommand` (existing), `account-role`'s
    D-410 citation ("The role `owner` is given and taken …"), "polecenia roli właściciela" in the row of
    `guidelines/testing.md` (the role command), and "owner role/panel" in the decisions. The two deploy
    skill copies, the two commands' headers and the new test names and comments held no such use, so no
    change there.
  - Check: `python -B .the-way/elements/common/foundation_check.py` exit 0, "0 errors", run after the
    edits (the citations are held to the start of the binding sentence).
- **I-2 fixed.** `guidelines/testing.md`, row `src/server/`: "tamże" before „oznaczony
  `account-database-schema`" is now "w `tests/account-storage.test.mjs`". The "tamże" after the
  previous-save case still follows `tests/account-storage.test.mjs` and stays true.
- **M-3 fixed.** `tests/account-owner.test.mjs` ("a damaged database file fails with the JSON line of
  the failure first, and changes nothing") and `tests/account-storage.test.mjs` ("a database failure of
  the previous-save command adds the error's kind and code and nothing of its text") also assert
  `assert.doesNotMatch(run.stderr, /run the command again/)` for the damaged file; nothing weakened.
  Mutation to show it bites: in the role command I changed the non-busy sentence to end with "Please run
  the command again." and rebuilt; `node scripts/test-node-file.mjs tests/account-owner.test.mjs` failed
  (2 failed: the renamed damaged-file case at `doesNotMatch`, and the advice case); I restored the file
  (`git status` shows no change in `src/server/account-role.ts`), rebuilt and the file passed again
  (exit 0). I did not run the same mutation for the previous-save command; its renamed case carries the
  same assertion.
- M-1 of the review: not touched, as ruled.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` exit 0 (0 errors)
- `npm run build` exit 0
- `node scripts/test-node-file.mjs tests/account-owner.test.mjs` exit 0 (15 passed)
- `node scripts/test-node-file.mjs tests/account-storage.test.mjs` exit 0 (94 passed)
- `node scripts/test-node-file.mjs tests/account-backup.test.mjs` exit 0 (12 passed)
- `npx eslint` on the six code and test files exit 0
- `npx prettier --check` on the six code and test files exit 0
- `npx tsc -p tsconfig.server.json --noEmit` exit 0
- `python -B .the-way/instruction-files/check_instructions.py` exit 0 (0 error, 145 warn, 7 info; the
  same warnings as before the fix)
- `python -B -m unittest discover -s tests/agent_workflow -p "test_*skill*.py"` exit 0 (23 tests)
- `node tests/quality/eslint-size-rules.mjs` exit 0 (0 over a threshold)
- Not run: `npm test` and every other test of the repository (the orchestrator runs them).

## Own-work check

Requirement the fix most likely misses: a quotation that no longer begins a binding sentence after the
word change. The check is the foundation check after all edits of the decisions and of the 9 citation
lines: exit 0, 0 errors. Second: a leftover "owner" for the person: the two searches above.

## Reach beyond the handoff

None: I read only the findings file, the fix method (`fix.md`), the handoff and the files the findings
name.

## Working copies

`.runs/author/` (edit scripts, a backup of `account-role.ts` for the mutation, logs). Removed with
`rm -rf .runs/author`; nothing remains.

## Unread material

`reports/review-whole-report.md` (the findings file held what the fix needed); the glossary entry
`owner` and the part map entry `account-server` (the findings and the orchestrator's ruling quote them).

## Searches not found or unclear

None.
