# Report 06 — slice 1 (the `local` log driver and the logrotate file)

**Status:** done

**Commit:** `89dfbcb` on `task/skad-wiem-o-awarii` (base `bbefd44`; not pushed; the branch has no upstream). Message: `feat: :sparkles: write the game's container logs with Docker's local driver and add the logrotate stanza of the dump file`. Author `mariusznn@gmail.com`, the private address the repository's `.gitconfig` gives.

Written as one commit, not two: the red run was seen before the change (see checks), and the commit holds the green state so the branch has no failing commit.

## Files changed

| File | Added | Removed | Note |
|---|---|---|---|
| `compose.yaml` | 4 | 0 | `logging: driver: local` on `app` (after `init`) and `cloudflared` (after `healthcheck`) |
| `deploy/loop2-app.logrotate` | 14 | 0 | new; three comment lines, then the one stanza of A3 |
| `tests/deploy/test_loop2_log_storage.py` | 110 | 0 | new; four test methods, standard library, reads both files as text |
| `tests/invariants/test_account_server_typecheck.py` | 2 | 1 | `LOGROTATE_CONFIG` added to `NOT_ROUTES` |

## Checks (command, exit code)

Run from the worktree root. Focused checks only; the full gate was not run (orchestrator's).

1. Red run, test written first, with an empty `deploy/loop2-app.logrotate` so the test reaches its assertions:
   `npm test -- tests/deploy/test_loop2_log_storage.py` — **exit 1**. Five failures, all assertions: `service app` and `service cloudflared` have no `logging` block (`None != ['driver: local']`); `0 != 2` logging keys in `compose.yaml`; the logrotate file holds no stanza; its stanza holds `[]` against the eight directives.
2. Red run of the invariant-route test before the `NOT_ROUTES` edit:
   `npm test -- tests/invariants/test_account_server_typecheck.py` — **exit 1**. `test_no_other_deployment_route` failed with `['deploy/loop2-app.logrotate'] != []`; the other eight tests passed.
3. Green runs after the change:
   - `npm test -- tests/deploy/test_loop2_log_storage.py` — **exit 0** (4 tests).
   - `npm test -- tests/invariants/test_account_server_typecheck.py` — **exit 0** (9 tests, about 9 s).
   - `npm test -- tests/invariants/test_loop2_host_sharing.py` — **exit 0** (18 tests). It is the check that reads `compose.yaml`; `logging` is on its list of allowed service keys, so the new key passes it.
4. Own-work check (mutation, then restored): compose `app` driver changed to `json-file` and the logrotate `copytruncate` changed to `create`, in a copy held in the scratchpad, then the same test run — **exit 1**, two failures (`Lists differ: ['driver: json-file'] != ['driver: local']` and the directive list with `create`). Both files were restored from the copies; `cmp` confirmed the restore; the test then ran again — **exit 0**.
5. Lint of the two changed Python files: `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml tests/deploy/test_loop2_log_storage.py tests/invariants/test_account_server_typecheck.py` — **exit 0** ("All checks passed!"). This is my own sanity step, not one the slice names.

Not run: `tests/quality/*` (the new file is covered by `tests/deploy/`, which the gate picks up through the tracked-directory rule; the orchestrator's gate run covers it), the full `npm test`, `foundation_check.py`, and the `shellcheck`/`prettier` checks (no shell script or JS file changed).

## Own-work check: the requirement and what it showed

- **Requirement:** both Compose services use the `local` driver and no other logging option (spec A2); the logrotate file holds exactly the A3 directives and no `create` and no user name.
- **Check:** the mutation in check 4. It shows the test catches a wrong driver on one service and a wrong directive (`create` for `copytruncate`), which are the two most likely slips.
- **Not checked by any test:** that Docker really bounds the log at about 100 MB with `local`, and that logrotate really rotates on the host (the spec's E3 human steps; no `logrotate` binary on this machine: `which logrotate` finds nothing).

## Reaches beyond the handoff

- `.the-way/task-cycle/change/SKILL.md` (whole) and `.the-way/task-cycle/change/slice.md` (whole), both as the method names them.
- `guidelines/coding.md` and `guidelines/testing.md` (whole), as the handoff's *Read* names them. They say nothing specific to a Compose or logrotate file; the testing guideline's rule that a test names the break it catches was applied in the file's wording.
- `tests/invariants/test_loop2_host_sharing.py` — the focused check's own file, read to see which service keys it allows (`logging` is among them). It is named by the slice's *Checks*, so reading it was needed.
- `tests/invariants/loop2_invariant_support.py` — read only the `deployment_route_files` helper (grep and 10 lines), to confirm that every `deploy/*` file counts as a route, which is why the logrotate file had to enter `NOT_ROUTES`.
- `a note in the author's notes vault` — read before the commit, as the global instructions require (explicit paths, English message, no push).
- `git log`, `.gitattributes` (the `deploy/** text eol=lf` line) and `git -C .the-way rev-parse HEAD` (`294af7fde45323ac1851c014a03071a97fc38d96`, matches the pin).
- Not read, deliberately: `project-level/technology/reserved_choices.md` (the slice's choices are settled by the spec); the decision and invariant entries D-352, D-353, the new D-347 and the three new invariants (not in this slice's *Read*).

## Choices and adaptations

- **Test layout:** the compose test checks the exact block `driver: local` on each service, so no `options:` key can slip in beside it; a second test counts the `logging:` keys and rejects `log_driver`. The logrotate test compares the sorted body lines of the stanza with the eight directives, so an added or missing directive fails. Comments and blank lines are skipped in both.
- **Where the `logging` key sits:** at the end of each service block, not beside `restart`. Chosen for a smaller diff; no effect on Compose.
- **Comment in `NOT_ROUTES`:** the comment above it still says the backup script is read by a test of its own; the logrotate file is now listed beside it with no comment of its own. Cosmetic; left as is.
- **Logrotate directives as the slice states them:** `weekly`, `maxsize 100M`, `rotate 4`, `delaycompress`, `missingok`, `notifempty`, `copytruncate`, `su root root`. The rejected ways: `size 100M` alone (drops the weekly bound, so the four files would cover an unknown span), and `create` (names the owner, which D-13 forbids).

## Concern for the orchestrator (not verified here)

`weekly` together with `maxsize 100M` is the slice's text, and I implemented it. From my recollection of `logrotate(8)`, `maxsize` is described as rotating "not before the additionally specified time interval", which would mean the size cap does not force a rotation sooner than a week. If that reading holds, the spec's "sooner when the file passes 100 MiB" does not hold, and a crash-looping container dumped by many deployments could grow the file for up to a week. I could not check this: `logrotate` is not installed here, and the test only reads the text. The human's step E3-2 (`logrotate -d`, then one forced rotation) is the check that would show it. Cost if the reading is right: the file is bounded by time only, not by size, until the first check. Question to the orchestrator: keep the directives as they are and rely on E3-2 to settle it, or have the spec's author choose another directive set? I did not change the directives on my own.

## Searches not found or unclear

- `logrotate` binary on this machine: not found (`which logrotate` empty). Its behaviour for `maxsize` with `weekly` is unclear to me from memory and was not checked.
- Nothing else looked for was missing; the Compose file, the route helper, the host-sharing check and the test runner all were where the handoff and spec say.
