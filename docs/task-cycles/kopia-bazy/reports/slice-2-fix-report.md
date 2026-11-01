# Slice 2 fix report

**Status:** done. **Commit:** `acb7aee` (on top of `aec92e4`). Check code `src/server/account-database-check.ts` unchanged.

## Finding 1 — fixed
`tests/account-database-check-standin.mjs` (new, claimed by `account-server` in `foundations/part_map.md`) is loaded by `node --import <file URL>`. It registers a `module.registerHooks` resolve hook that gives the built `dist/server/database.js` a stand-in for `node:sqlite` (the same file, loaded under a `?standin` URL, re-exporting the real `DatabaseSync`). The stand-in makes the real backup, then spoils it by `LOOP2_CHECK_STANDIN`, and writes `standin-reached` to stderr on every call. No injection point in the product.
`tests/account-database-check.test.mjs` gains, each citing `// invariant: account-save-sqlite-upgrade`: the pass-through control (exit 0, success line, stand-in reached) and five variants (empty backup, other password hash, other saved game state, two steps, refused `rate`), each asserting stand-in reached, non-zero exit, no `checked` in stdout, temporary directory empty. The child has a 60 s deadline and is killed on it (D-84); the temporary directory is removed after a failure too.

## Checks (command, exit code)
- `npm test -- tests/account-database-check.test.mjs`: exit 0, 8 pass.
- Mutant `expect` never throws: same command exit 1; failing: two steps, empty backup, other password hash, other saved game state. The refused-rate variant still passes under this mutant, correctly: it fails through the thrown error, not through `expect`.
- Mutant body replaced by `mkdtemp`, `rm` and the print (no `AccountDatabase`): exit 1; all five variants and the control (stand-in never reached) fail.
- Source restored after each mutant (`git status` clean for it) before the commit.
- `npm test -- tests/invariants/test_account_save_sqlite_upgrade.py` exit 0 (I reworded its *Does NOT cover* sentence, which said the check's failing was not shown).
- ESLint (both new files) exit 0, Prettier `--check` exit 0, Ruff on the Python file exit 0. `python -B .the-way/elements/common/foundation_check.py` exit 0.
- Not run: full `npm test`; the Docker-based tests, since the image and Dockerfile are unchanged.

## Choices
- One helper file with two roles instead of a hook file plus a wrapper file: one part-map entry. Cost: the `?standin` URL test of its own role.
- `LOOP2_CHECK_STANDIN` is read only by the test's stand-in; the product reads no such variable.

## Searches not found or unclear
- none. (`git` warned the CRLF of the Python test would become LF; the repository's attributes do that.)
