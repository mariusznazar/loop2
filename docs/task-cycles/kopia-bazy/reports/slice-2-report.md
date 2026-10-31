# Slice 2 report — the Node.js release check in the image build

**Status:** done

**Commit:** `aec92e4` (on `task/kopia-bazy`, base `4ced3b9`), message: "feat: check the database read, write and backup on the image's own Node.js release in the image build".

## Files changed
- `src/server/account-database-check.ts` (new, +95): temporary database through `AccountDatabase`; writes an account and a saved game state; reads them back; `backupTo`; asserts the returned step count is 1 (D-222, as the command relies on it); opens the backup through `AccountDatabase`, reads the same values; removes its directory in a `finally`; prints `Node.js <release>: account database read, write and backup checked.` and exits 0; any error or difference prints one line to standard error and exits 1.
- `Dockerfile` (+3): `RUN node dist/server/account-database-check.js` in the final stage, after the `dist` copy and after `USER node`. Base image still unpinned. The deploy script and compose are untouched.
- `tests/account-database-check.test.mjs` (new): passes on the real release and leaves the temporary directory empty; with `TMPDIR` pointing under a regular file (cannot be written) exits non-zero and does not claim success. Child has a 60 s limit and is killed on timeout (D-84).
- `tests/invariants/test_account_save_sqlite_upgrade.py` (new): cites `account-save-sqlite-upgrade`; reads the last stage of `Dockerfile` for the step (exact command, shell or exec form, no `;` `||` `|` `&`), after the `COPY --from` of `dist` and after the last `USER`. A second test (no invariant cited) feeds the reader made-up Dockerfiles: good in both forms; refused: no step, `|| true`, pipe, step in the build stage, before dist, before USER.
- `foundations/part_map.md` (+2): `tests/account-database-check.test.mjs` to `account-server`, `tests/invariants/test_account_save_sqlite_upgrade.py` to `deployment`. The responsibility sentences already named the check (written earlier). I applied `.the-way/elements/part-map/skill/SKILL.md` and its `write.md` myself, not through the `the-way-update-part-map` skill; no *Depends on* or trust boundary changed.

## Checks (command, exit code)
- Test first, failing: `npm test -- tests/account-database-check.test.mjs` exit 1 with the empty module: both tests failed at their assertions (release not in the output; exit code 0 where non-zero was expected). After the code: exit 0.
- Mutation: changed the asserted step count from 1 to 2: `npm test -- tests/account-database-check.test.mjs` exit 1 (pass test failed); restored, exit 0.
- Invariant seen failing: `npm test -- tests/invariants/test_account_save_sqlite_upgrade.py` exit 1 on the unchanged `Dockerfile` ("the last stage runs no ... step"); after the Dockerfile step: exit 0.
- `npm test -- tests/invariants/test_account_server_typecheck.py` exit 0.
- `npm test -- tests/deploy/test_account_storage.py` exit 0, ran (not skipped): a real image build through the step on Docker 29.7.2.
- Also, tests that read `Dockerfile`: `test_account_server_runtime.py`, `test_loop2_container_isolation.py`, `test_loop2_deploy_keeps_running.py`, `test_loop2_one_serving_process_container.py`, `test_loop2_container_icons.py` each via `npm test -- <file>`: all exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: exit 1 before the commit (the two new patterns matched no tracked file), exit 0 ("0 errors") after the commit.
- ESLint (`node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location <empty> <2 files>`) exit 0; Prettier `--check --no-config --no-editorconfig` on the same files exit 0; Ruff `--config ruff.toml --ignore-noqa --no-fix --no-cache` on the new Python file exit 0. ShellCheck: no shell script changed, not run.
- Not run: full `npm test` (the gate is the orchestrator's); the whole-repo ESLint/Ruff (only changed files).

## What the build prints (spec decision 9, H5.2)
`docker build --progress=plain .` on this computer printed, from the new step: `#21 [stage-1 7/7] RUN node dist/server/account-database-check.js` then `Node.js v24.22.1: account database read, write and backup checked.` Docker's default fancy (tty) progress folds the output of a successful step away; a non-tty or `--progress=plain` build shows it. I did not read `deploy/loop2-deploy` to see which of these the deploy log gets (out of slice); H5.2 should confirm the release line appears in the real deploy log.

## Own-work check (section 3)
Requirement most likely unmet: "any difference ... exits non-zero" (the tests only run the passing path and the unwritable directory). Check: broke the asserted step count (see Mutation) and watched the passing test fail. A difference in values read is not exercised by a test of its own; the check has no injection point and I did not add one.

## Choices
- Backup opened with `AccountDatabase`, not raw `DatabaseSync`: it is the same door the server uses on a restored file, and it opens WAL mode on the copy in the temp directory only. Rejected: raw read-only handle (reads less of what a restore would do).
- Step count asserted equal to 1: ties the build to D-222; cost if wrong: a release whose progress callback reports differently fails the build (exit 7), the intended behaviour.
- Unwritable-directory test uses a regular file as `TMPDIR` rather than chmod: portable (Windows here); cost: it tests `mkdtemp` failure, not a read-only existing directory.
- The reader in the invariant test accepts only the exact command, so a later `node dist/server/account-database-check.js --flag` would fail the invariant test until the test is changed.

## Reaches beyond the dispatch
- `tests/invariants/loop2_invariant_support.py` (`dockerfile_stages`, `exec_form`, `run_command`, `_stage_reference`, read via grep and a range) — already in *Read*; `_stage_reference` is private and I used it as `test_account_server_typecheck.py` does.
- `scripts/test.py`, `scripts/test-node-file.mjs`, `tests/quality/test_quality_invariants.py:15-70` — to learn how tests are run and the lint commands; named by the handoff.

## Searches not found or unclear
- The handoff says "after `dist` is copied and after `USER node`"; the plan names no foundation entry saying why the user matters. I read it as: check runs as the server's user. Unclear whether that is required or just the stated place.
- Whether the deploy log shows the release line (see above): unchecked, out of slice.
- No test exercises the "difference found" path of the check with a broken value; none found in the plan's *Checks*.
