# Fix report 08 — slice 1, the review's blocking finding

**Status:** done

**Commit:** `0908743` on `task/skad-wiem-o-awarii` (head before: `89dfbcb`; not pushed). Message: `fix: :bug: compress the rotated dump file so that delaycompress has its effect`.

## Findings of the file, as fixed

### Important 1 — the stanza compresses nothing (`delaycompress` without `compress`)

- **Fix:** `compress` added to `deploy/loop2-app.logrotate` (one line, before `delaycompress`), and to `LOGROTATE_DIRECTIVES` in `tests/deploy/test_loop2_log_storage.py` (one line). The stanza now holds nine directives. The orchestrator's answer 1 is followed; answer 2 (no change to D-352) is followed, no foundation file touched.
- **Check that shows it:** red run first, with the head's stanza (no `compress`) under the fixed test list: `npm test -- tests/deploy/test_loop2_log_storage.py` gave exit 1, `AssertionError: Lists differ: ['copytruncate', 'delaycompress', 'maxsize 10[64 chars]kly'] != ['compress', 'copytruncate', 'delaycompress', ...]`. The fixed stanza was then restored from a copy (`cmp` confirmed), and the green run below passes.

### Minor findings and the out-of-scope item

Not fixed, as the findings file says. Nothing else changed.

## Checks (command, exit code)

Run from the worktree root.

1. Red run on the old stanza (see above): `npm test -- tests/deploy/test_loop2_log_storage.py` — exit 1.
2. `npm test -- tests/deploy/test_loop2_log_storage.py` — exit 0 (4 tests).
3. `npm test -- tests/invariants/test_account_server_typecheck.py` — exit 0 (9 tests).
4. `npm test -- tests/invariants/test_loop2_host_sharing.py` — exit 0 (18 tests).

Not run: the full gate, `foundation_check.py`, and the quality checks (the orchestrator's run before the request).

## Own-work check

- **Requirement:** the stanza must produce the effect A3 names, compression of all but the newest rotated file, without relying on the host's global `/etc/logrotate.conf`.
- **Check:** the red run above. It shows the pinned list and the stanza now agree on `compress`, and the test fails when `compress` is missing.
- **Not shown:** that logrotate compresses on the host. The stanza sets `compress` itself, so the effect no longer depends on the global file, but `logrotate` is not installed here (`which logrotate` finds nothing), so `logrotate -d` on the host is still the check (spec E3-2).

## Reaches beyond the findings file

- `.the-way/task-cycle/change/fix.md` (whole), as the fix's method names it.
- The two files the fix touches, read whole before the edit.

## Searches not found or unclear

- `logrotate` binary: not on this machine, so the effect of `compress` with `delaycompress` (newest rotated file plain, older ones compressed) was not run; the reviewer's man-page reading is taken as given.
- Nothing else looked for was missing.
