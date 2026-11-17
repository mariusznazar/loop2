# Report of executor 1 — slice 1: the start and the container's replacement cite the invariants that stay

**Status:** done with concerns (one concern, below)

## Commits

- `60bd5bab` — test: :white_check_mark: cite account-database-schema in the case of the start that refuses an unknown schema and account-save-durable-storage in the case of the replaced container, and bring the docstring of the second in line. Base `8b32706d`.

## Files changed

- `tests/startup.test.mjs` — +1 −1: the marker of "configured startup refuses unknown schema and unavailable database before readiness" is `// invariant: account-database-schema` (was `account-schema-lifecycle`).
- `tests/deploy/test_account_storage.py` — +5 −5: the marker of `test_replaced_container_keeps_accounts_and_sessions` is `# invariant: account-save-durable-storage`; the "Does NOT cover" paragraph of the docstring no longer says the invariant is checked by review and left out. It now says: saved game states are not written or read by the test, so for account-save-durable-storage (method test) it shows the database file that holds them surviving the replacement through an account and its session, and no saved game state.
- No product code, `compose.yaml`, `Dockerfile`, `deploy/` or `foundations/` file is in the commit.

## Checks (command, exit code)

| Check | Result |
|---|---|
| `npm.cmd test -- tests/startup.test.mjs` with `src/server/database.ts` broken (red run) | exit 1; 2 failed, 16 passed |
| `npm.cmd test -- tests/startup.test.mjs` after restoring (green run) | exit 0; 18 passed, 0 failed |
| `npm.cmd test -- tests/deploy/test_account_storage.py` with `compose.yaml` broken (red run) | exit 1; 1 failure |
| `npm.cmd test -- tests/deploy/test_account_storage.py` after restoring (green run) | exit 0; Ran 1 test, OK (Docker 29.7.2 daemon answered) |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | exit 0; "0 errors" |
| `git status --short -- src compose.yaml Dockerfile deploy` | empty |
| `git status --short` at return | empty |

### The break of each case, seen red

1. **Start.** In `src/server/database.ts` `initializeSchema`, the condition `version < 0 || version > currentVersion` was cut to `version < 0`, so the start passes an unknown version. Command: `npm.cmd test -- tests/startup.test.mjs`, exit 1. The case "configured startup refuses unknown schema and unavailable database before readiness" failed at `tests/startup.test.mjs:550` with `AssertionError: Expected values to be strictly equal: 6 !== 99` (the unknown database was rewritten to version 6 and the start went on). The case "a start that fails names the setting and the original error's kind and code…" failed too (it reads the same refusal). Output kept in `.runs/executor-1/red-startup.txt`. Restored with `git checkout -- src/server/database.ts`; `git diff -- src` was empty before the green run.
2. **Container.** In `compose.yaml` the `app` service's `LOOP2_DATABASE_PATH: /app/data/accounts.sqlite` was changed to `/tmp/accounts.sqlite`, outside the volume mounted at `/app/data`. Command: `npm.cmd test -- tests/deploy/test_account_storage.py`, exit 1. `test_replaced_container_keeps_accounts_and_sessions` failed at `tests/deploy/test_account_storage.py:142` (now the same assertion, line numbers unchanged by the edit): `AssertionError: Tuples differ: (401, {'code': 'unauthenticated', …}) != (200, {'id': …, 'email': 'replacement-check@example.com', …}) : the session of the replaced container no longer names its account`. Output kept in `.runs/executor-1/red-storage.txt`. Restored with `git checkout -- compose.yaml`; `git diff -- compose.yaml src` was empty before the green run.

Both files were restored byte for byte (git showed an empty diff) before the commit; the commit holds only the two test files.

## Own-work check (section 3)

- Requirement most likely not met: the case of the container would pass whatever the database path, i.e. the marker moves but the test no longer sees the path of `compose.yaml`, so the invariant would hold on paper. Check: the break of `compose.yaml` above. It showed the case failing at the session check after the replacement, so the path of `compose.yaml` does reach the test.
- Second requirement: the docstring must agree with the citation. Checked by reading it against `foundations/invariants.md:688-696` and D-17's *Verification* (see the concern).

## Concern

D-17's *Verification* (`foundations/decisions.md:1798`) says: "Checks of accounts and sessions alone do not establish preservation of saved game states and cannot clear account-save-durable-storage." `test_replaced_container_keeps_accounts_and_sessions` writes and reads an account and a session only, and no saved game state, while the invariant it now cites says "preserves the SQLite database of player accounts and saved game states". The slice names this citation, so I made it, and I worded the docstring so that it does not claim more than the test does. Whether the sentence of D-17 should now go (Foundation entries / Slice 2) or the test should also save a game state through `PUT /api/saved-game` and read it back after the replacement (a change to the test this slice did not name) is the orchestrator's to settle. My recommendation: add a saved game state to the test in a later slice, since it is small and makes the *Method* `test` true; otherwise the sentence of D-17 stays and the method of the invariant is only half proven.

## Reaches beyond the handoff

- `foundations/invariants.md` (grep of the three invariants' headings, to see their text and *Method*); `foundations/decisions.md` D-17 *Verification* line (1796-1802) and D-205 (already in *Read*, current range); `tests/invariants/account_container_support.py:124-152` (`verify_account_resources`, to choose a break that passes it and fails at the replacement). Why: to word the docstring and to choose the container's break.
- `grep` for `account-schema-lifecycle` and `account-save-durable-storage` across `tests scripts foundations/*.md`: remaining markers of `account-schema-lifecycle` are in `tests/account-storage.test.mjs` (Slice 2's), none elsewhere in tests.

## Working copies

- `.runs/executor-1/` in the worktree holds the output files of the four test runs and the foundation check (`red-startup.txt`, `green-startup.txt`, `red-storage.txt`, `green-storage.txt`, `fc.txt`); it is ignored by git and left in place for the orchestrator to read. No worktree, clone or script copy was made.
- The Docker test removes its own image and containers (cleanup in the test); I did not check the daemon for leftovers.

## Choices

- Break of the start: dropping the upper bound of the version check rather than editing the stored version, since the handoff names "the start's reading of the schema version made to pass an unknown version". Cost if wrong: none, restored.
- Break of the container: `/tmp/accounts.sqlite` rather than a path under `/app/` that `node` cannot write, because the resource check of the test (`verify_account_resources`) passes for a writable path and the failure then shows at the replacement, which is the behaviour the test is for.
- Only the marker line and the docstring paragraph were changed in the test files; the `decision:` lines of both cases were left as they were (not in the slice).

**Unread material:** read whole: `guidelines/testing.md`, `guidelines/coding.md`, both changed test files, `compose.yaml`, the three invariants, D-205, D-112 (whole). Read in part: `src/server/database.ts` (lines 305-345), D-17 (*Verification* only), D-390 (first part, cut at 600 characters per line), `node-sqlite-database` (whole). Not read: D-111, `docker-volume-lifecycle`, `docker-compose-down-volumes`, `docker-volume-prune-scope`, `docker-system-prune-volumes`, the `account-server` and `deployment` ranges of `part_map.md`. Not needed to move two markers and run the two breaks.

**Searches not found or unclear:** none
