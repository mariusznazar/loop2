FAIL aec92e4c19582b518c6db8c3b477575d82058a56

# Review of slice 2, task kopia-bazy

Range `4ced3b9..aec92e4`, one commit, the five files of the slice's *Change*. `git rev-parse HEAD` is the given head. The reviewed worktree stayed clean; every mutation was made in a scratch export of the head commit, removed afterwards.

Counts: blocking 1, Minor 5, out of scope 0.

## Critical

None.

## Important (blocking)

### 1. No test tells the check from one that touches no database

**Place:** `tests/account-database-check.test.mjs:53-76`, against the slice's Goal "any difference or error exits non-zero" and To do 6. Comes from this slice. The gap is inherited: the plan's *Checks* and spec section 15 name only these two cases. It is a defect all the same.

**What is wrong.** The two tests are "passes and prints the release" and "`mkdtemp` fails". Neither reaches a line that reads, writes or backs up. The only failure the suite shows happens before the database is opened, so the part of the file that gives the check its worth, every `expect` and both `expectContents`, is unprotected. The invariant test reads only the `Dockerfile` and says so in its *Does NOT cover*.

**Why it matters.** `account-save-sqlite-upgrade` has method `test` and rests on this check (D-215, plan row E13). Its whole purpose is that a broken Node.js release stops the build. A later change that weakens the check leaves every test green, and the invariant then holds on paper only: the first release that really breaks reaches the server unnoticed, which is the one failure this slice exists to stop.

**Evidence, in a scratch export of the head:**

| Mutant of `src/server/account-database-check.ts` | `npm test -- tests/account-database-check.test.mjs` | Under a stand-in backup with the wrong contents |
|---|---|---|
| `expect` never throws | exit 0, 2 pass | exit 0, prints "checked" |
| the whole body replaced by `mkdtemp`, `rm` and the print, no `AccountDatabase` at all | exit 0, 2 pass; `tests/invariants/test_account_save_sqlite_upgrade.py` exit 0 | not run |

The author's mutation (asserted steps 1 to 2) makes the check stricter, so it shows the passing test can fail, not that a difference is caught. The author's own-work check names this exact requirement, correctly, and its check would not catch it unmet (section 2 of the method).

**The code itself is right.** Run unchanged under a stand-in for `backup()`, the check exits 1 with a line of its own for each case: backup file empty ("holds no account"), other saved game text, other password hash, saved game row gone, two steps reported, `rate` refused. A pass-through stand-in, the control, exits 0. No temporary directory was left. So the fix is a test, not code.

**No injection point is needed,** which answers the report's reason for leaving this out. `node --import <hook>` with `module.registerHooks`, resolving the product's import of `node:sqlite` to a test-owned wrapper that re-exports `DatabaseSync` and replaces `backup`, reached the built check unchanged. Spec's *Constraints* allow it: a stand-in proves the reaction, and the reaction is what is tested. Mutating `sqlite.backup` with `syncBuiltinESMExports` does not work for `node:sqlite` (all cases exit 0, stand-in silently unused), so such a test needs the pass-through control or an equivalent proof that the stand-in was reached.

**Required:** at least the named variants empty backup, another value in the backup, two steps and a refused `rate`, each asserting a non-zero exit and no success line, seen failing against the `expect` mutant, with the pass-through control.

## Minor

### 2. `copy` used for the backup

`src/server/account-database-check.ts:69,71,73`, `const copy = new AccountDatabase(...)`. The cycle binds "backup" in new code; `copy` is a game term (`foundations/glossary.md:175`). A local name, so no behaviour follows. Rename it to `backup` or `opened`.

### 3. The check's test does not cite the invariant

`tests/account-database-check.test.mjs:53,64` have no `// invariant: account-save-sqlite-upgrade` comment; the name appears only in the prose at line 9. Spec section 15: "Every new test of an invariant cites it", and row E13 names this file as a check. `foundation_check.py` passes through the Python test's citation, so nothing fails, but a search for the invariant misses the test that matters most. Cite it on the tests of finding 1.

### 4. A pattern in the invariant test decides nothing

`tests/invariants/test_account_save_sqlite_upgrade.py:31,51`. `text.split() == CHECK_COMMAND` already refuses every joined form. With `UNSAFE_OPERATORS` emptied, `&&`, `;` and tight `;` are still refused. The comment and the docstring credit it with a protection the equality gives. Remove it.

### 5. The one-step assertion cannot tell the `rate` on a database this small

`src/server/account-database-check.ts:67-68`. With `rate` removed by a stand-in, the check still exits 0: the database has fewer pages than the default of 100. It does catch what spec decision 1 names as the cost if wrong, a refused `rate` (shown in a real build below), and a release that reports steps differently. The one step under a real load is held by Slice 1's test. The comment promises slightly more than the line checks; no code change is needed.

### 6. H5.2's reading (not this slice's files)

`spec.md:209`, and later the human's procedure in `references/backup_and_restore.md`. See the judgment below: the release is in `/var/log/loop2-deploy.log`, not on the terminal, and not after a repeat of the same commit. The procedure should say so.

## The deploy log (the question of the handoff)

**Judgment: yes, the log file holds the release, on every first build of a commit.** Shown, not read: in a scratch export, the line of `deploy/loop2-deploy:298` run as it stands, output captured by `$(... 2>&1)`, with the two services and Docker 29.7.2, Compose 5.4.0.

| Run | Docker exit | Output captured |
|---|---|---|
| `LOOP2_COMMIT=review-a` | 0 | `#27 0.634 Node.js v24.22.1: account database read, write and backup checked.` |
| `LOOP2_COMMIT=review-b`, same code | 0 | the same line: the step reran while the `COPY` steps were `CACHED` |
| `LOOP2_COMMIT=review-b` again | 0 | step `CACHED`, **no release line** |
| `review-c`, `backupRate = -1` | 1 | `Node.js v24.22.1: the account database check failed. The "options.rate" argument must be a positive integer.`, then `failed to solve`; the image of the earlier build is unchanged |

- Captured output is no terminal, so the build prints plainly; the executor's folded output does not apply. `append_to_log` writes it whole to the log file (`deploy/loop2-deploy:300`).
- `ARG LOOP2_COMMIT` stands before the step, and Docker passes a build argument to each later `RUN`, so a new commit reruns the check even with unchanged code. This is stricter than spec decision 9's reasoning and contradicts nothing.
- The output goes to the file alone: `log` prints, `append_to_log` does not. A human running `loop2-deploy <head>` sees no release on the terminal, and GitHub Actions never does.
- A repeat of the same commit prints no release, which spec decision 9 accepts ("a cached step"). The first run's line stays in the appended log.
- Non-zero `docker compose build` reaches `fail_after_build 7` by reading `deploy/loop2-deploy:298-303`; that script and its tests are untouched. The real failing build above stops at the step.
- Docker on the server was last recorded as 28.1.1 (`foundations/environment_facts.md:31`); this ran on 29.7.2. H5.2 confirms it there.

## Checked and found sound

- Step in the final stage, after `dist` and after `USER node`; exit 0 and print only after the backup's contents are read; files removed in `finally`, including after a failure; failure printed on standard error, in the build's output.
- Trust boundary: the check takes no input but the temporary directory's location, reads no setting, opens no database of the server, and prints no secret; the data are made up. The `mkdtemp` directory is private. `dist/public` does not hold it. Nothing reaches `src/server` routes.
- `Dockerfile` reader, crafted forms: `&&`, `;`, tight `;`, an environment prefix, `sh -c ... || true`, a heredoc, a mention in a comment, `USER root` after the step, a later stage, `dist` from the context, `dist` overwritten after the step: all refused. A line continuation is refused too, which fails closed. `--network=none` is accepted and fails the same way.
- D-222, D-215, D-112, D-114: no SQL or connection outside `AccountDatabase`; `backupTo` used; the verification's "complies" of D-215 is met by the real build above.
- Irreversible operations: none in this slice. Nothing names the backup script; `deploy/`, `compose.yaml` and the base image are unchanged.
- Part map: two file lines, no *Depends on* or trust boundary change; the responsibility sentences already name the check. `foundation_check.py` passes.
- No invariant test changed; one new, citing `account-save-sqlite-upgrade`.

## Declined to judge

- A rollback to a commit from before this change builds an image without the step, so "no image without the check" does not reach across it: outside this slice, and rollback's effects are spec section 13's and the later slices'.
- The unpinned Node.js image: settled by spec decision 9.
- Running on the release that H3's image gets, rather than the server's: settled in the same table.

## Checks run

- `git rev-parse HEAD`: `aec92e4c...`, the given head. `git status --short`: empty, before and after.
- `npm test -- tests/account-database-check.test.mjs` (export): exit 0, 2 pass; on Node.js v24.17.0.
- `npm test -- tests/invariants/test_account_save_sqlite_upgrade.py` (export): exit 0.
- `npm test -- tests/invariants/test_account_server_typecheck.py` (export): exit 1 in the first export, 3 failures of `git ls-files`, no repository there; after `git init` in the export, exit 0, 8 tests. The first failure belongs to my export, not to the change.
- `npm test -- tests/quality/test_node_test_selection.py` (export): exit 0.
- `node --import ../stub.mjs dist/server/account-database-check.js` under eight stand-ins (export): pass-through and default `rate` exit 0; empty, other game, other hash, no rows, two steps, refused `rate` exit 1.
- `expect` mutant and no-database mutant with `npm test -- tests/account-database-check.test.mjs` (export): both exit 0. No-database mutant with the invariant test: exit 0. All source restored and compared before going on.
- Deployment's build line, four runs: table above. Images `s2review-app` and `s2review-cloudflared` removed; no container made; the build cache keeps these layers.
- Crafted `Dockerfile` forms through `problems()`, `python -B` (export): exit 0, results above.
- `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree): exit 0, "0 errors". `.the-way` at the gitlink's commit `a8dfe8a`.
- ESLint `--max-warnings 0` with an empty suppressions file: exit 0. Prettier `--check --no-config --no-editorconfig`: exit 0. Ruff `--config ruff.toml --ignore-noqa --no-fix --no-cache`: exit 0. Each on the slice's changed files, export.

**Not run:**
- Full `npm test`: the cycle's own run before the request.
- `tests/deploy/test_account_storage.py`: the four real builds above go through the step; the author reports it exit 0.
- The author's failing runs: not repeated; the reader's "no step" case covers the invariant test's.
- The check on the server's own release and Docker: agents do not touch the server; H5.2 shows it.
- The check in a read-only existing directory: the regular-file case reaches the same `mkdtemp` failure.

## Reaches beyond the dispatch

- `deploy/loop2-deploy:25-34,55-78,291-306`: how the build's output reaches the log, as the handoff asks.
- `compose.yaml`, `.dockerignore`: the build the deployment runs, `LOOP2_COMMIT`'s route.
- `foundations/glossary.md:175`: the word `copy`, named by slice 2's handoff.
- `docs/task-cycles/kopia-bazy/spec.md:209` H5.2: what is read from the log.
- `src/server/account-backup.ts`, `src/server/account-block.ts`: the sibling commands, for form.
- `tests/deploy/test_account_storage.py:80-118`: how the smoke test builds.
- `foundations/environment_facts.md`, searched for the server's Docker and its storage driver.

## Searches not found or unclear

- The server's Docker storage driver and Compose version: no entry beyond Docker 28.1.1. The check runs write-ahead log mode in the `RUN` step's `/tmp`, not on a volume; whether that holds on the server's storage is unverified here. If it does not, the build fails at exit 7 with the game running, so the failure is safe; H5.2 shows it.
- The report's question why `USER node` matters: no foundation entry says it. The invariant test's docstring reads it as "the user the server runs as". The plan asks for it, so the place is right.
- `tests/account-backup.test.mjs` and other Node tests are not in the testing guideline's *integration test* file list either, so I took the list as not exhaustive and raised nothing about the new file.
