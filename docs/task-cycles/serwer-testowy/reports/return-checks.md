# Return step — invariant checks (serwer-testowy)

Commit `d82996c` on `task/serwer-testowy` (explicit paths, no other file touched):

- `tests/invariants/test_loop2_deploy_trigger_input.py` — `loop2-deploy-trigger-input/1`, 10 citing tests.
  Forced-command path (`SSH_ORIGINAL_COMMAND` set, no argument) fed 31 crafted literals (non-hex,
  39/41 chars, uppercase, one uppercase letter, leading/trailing space, tab, LF, CRLF, embedded
  newline, newline + second command, `--help`, `-c`, a 40-char value starting with `-`,
  `--upload-pack=…`, `;`, `$(…)`, backticks, `|`, `&&`, `>`, quotes, glob, two words, `main`,
  `…^{commit}`, a non-ASCII letter, empty), both inputs at once (twice), and no input: each must
  exit 2 with no docker call, no `fetch` in git's trace and the checkout unmoved. Commit stage: a
  commit only on another branch, the same after a fetch left `origin/feature` in the clone, and a
  commit `main` dropped after the clone last fetched it are refused with exit 3 and no docker call
  but the read-only `inspect` of the running label. An ancestor of `main` and a tip pushed after
  the clone pass (not 2/3, fetch traced, checked out). One positive control: a well-formed value
  reaches the fetch.
- `tests/invariants/test_loop2_deploy_keeps_running.py` — `loop2-deploy-keeps-running/1`, 13
  citing tests. A loop2 container is "running" in every run; each stop is forced in turn: input
  (2), commit (3), lock (4), memory low / unreadable (5), disk low / unreadable (5), fetch (6),
  checkout via `.git/index.lock` (6, fetch traced), type check in build (7), build (7), commit
  without `compose.yaml` (7). Each asserts the stage's exit code and no docker call holding any of
  `up down rm stop kill restart create pause remove run`. Positive control: a fully passing run is
  seen to issue `up`.

Both reuse `tests/deploy/deploy_script_support.py` (added to `sys.path`); no fixture changed. A
machine without Git or Git's bash skips them (no verdict → unchecked).

## Runs

- `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`:
  final run exit 0, 80 tests OK; both new invariants `pass` (10 and 13 lines). Two earlier runs
  each had one failure in a port-3000 test (`loop2-api-error-route/1`: GET / returned a different,
  styled page; then `account-server-occupied-address/1`: port occupied before the control) — another
  process was intermittently using port 3000 during those runs; the same test passed alone and the
  third full run was clean. Not caused by the new files.
- Invariants format guard (`--base`/`--merge-onto` = `1701186`): 0 errors, 0 warnings, 0 unchecked.
- Part-map guard (`--base 1701186`): **2 errors — no part claims
  `tests/invariants/test_loop2_deploy_keeps_running.py` and
  `tests/invariants/test_loop2_deploy_trigger_input.py`.** The `deployment` part lists its
  invariant tests by path (`foundations/part_map.md` lines 85–88); the entries author should add
  these two there. `foundations/` not edited. Its 2 warnings and 1 unchecked existed before.

## Own control (deliberate breaks, scratch copies only; `support.SCRIPT` pointed at each copy)

| Break of a copy of `deploy/loop2-deploy` | Test file | Result |
|---|---|---|
| `COMMIT_NAME_PATTERN` → `^[0-9a-fA-F]{40}$` | trigger-input | 2 subtests fail (uppercase, one uppercase letter) |
| `COMMIT_NAME_PATTERN` unanchored `[0-9a-f]{40}` | trigger-input | 18 subtests fail (whitespace, newline, metacharacters, two words, 41 chars, …) |
| forced-path `merge-base --is-ancestor … origin/main` → `cat-file -e` | trigger-input | 2 tests fail (branch commit the clone holds; commit dropped from `main`) |
| `compose … up -d` inserted before the build | keeps-running | 2 tests fail (type check, build) |

The deliberate break the checks are accepted on (WAY-69) is still the reviewer's to write.

## Notes and questions

- The checkout-failure stop is produced by a stale `.git/index.lock` in the clone; the spec names
  no other way to fail the checkout alone.
- Refusal is read as exit 2 (spec error table); a change of that code would fail trigger-input
  though the sentence names no code.
- The stopping-word reader sees docker commands only; a stop through another route (a signal to
  the process) is outside it, as each file's "Does NOT cover" says.

## Correction 1

Commit `051a269` (explicit paths: the two check files).

- **The class is closed.** `test_loop2_deploy_keeps_running.py` no longer looks for stop words. Every docker call of a stop before the new container must be on a literal allow-list of calls that only read:
  - `READ_ONLY_DOCKER`: `inspect`, `info`, `ps`, `images`, `logs`, `version`, `image ls|inspect`, `container ls|inspect|logs`;
  - `READ_ONLY_COMPOSE`, for `docker compose <options> <subcommand>`: `ps`, `logs`, `config`, `images`, `ls`, `version`;
  - plus `compose … build`, only for the stops at the build stage. A build makes an image and touches no container.
  - Any other call fails the test, including one the list does not know.
- **Positive controls:**
  - A passing run's `up` is found off the list.
  - A new test, `test_reader_on_written_out_calls`, runs the reader on calls written out as literals: read-only calls pass; `build` passes only at the build stage; `up`, `scale app=0`, `stop`, `down`, `--dry-run rm`, `rm -f`, `stop`, `update`, `container kill`, the loop2 image prune and a bare `compose` are all found.
- **The two build-failure tests are merged** into `test_stop_at_the_build_or_its_type_check`. The docstring says the type check runs inside the image build, so the script sees its failure as the build's.
- **Docstrings:** both files now name all six stubs (docker, curl, flock, df, hostname, uname).
- **Breaks** (scratch copies, `support.SCRIPT` pointed at each):

| Break | Result |
|---|---|
| `docker compose … scale app=0` before the memory gate's exit 5 (reviewer's K4) | FAILED `test_stop_at_the_memory_reading` |
| `docker update --memory 6m loop2` before the fetch's exit 6 (not on the old word list either) | FAILED `test_stop_at_the_fetch` |
| `compose … up -d` before the build (break from the first round, rerun) | FAILED `test_stop_at_the_build_or_its_type_check` |
| unbroken | 23 tests OK (trigger-input 10, keeps-running 13) |

- **Gate** (port 3000 free, nothing else running): exit 0, 80 tests OK. `loop2-deploy-keeps-running/1` pass ×13, `loop2-deploy-trigger-input/1` pass ×10.
- **Invariants guard:** 0 errors, 0 warnings, 0 unchecked.
- **Part map:** the two files are still unclaimed (part-map guard, 2 errors). The entries author has to add them to the part map.
