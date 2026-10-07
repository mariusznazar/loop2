# Task 4 implementation report

- **Model:** GPT-6 Codex task subagent
- **Status:** DONE
- **Base:** `afbc7c37f7a8ef72cd908fb85d886f97183c55ce`
- **HEAD / commit:** `877821a` — `test: guard occupied account server address`
- **Changed tracked file:** `tests/invariants/test_account_server_occupied_address.py`

## Implementation and choices

Added one `unittest` check citing `account-server-occupied-address/1`. It builds a temporary product copy, verifies a normal launch reaches the exact readiness line, stops the server and checks the port is free, then holds `127.0.0.1:3000` with a Python TCP socket. The blocked direct Node launch must exit nonzero without the exact readiness line, and the socket must still hold the address. After socket release, a second normal launch must reach readiness. The diagnostic may mention the address. The blocked launch has a 10-second timeout. `subprocess.run`, the socket context manager, and `Server.stop()` provide cleanup on errors.

The blocking socket uses a listen backlog of 5. A backlog of 1 produced a false negative from the second `port_in_use()` probe on Windows after the first probe had filled the queue; increasing it allowed both ownership probes while keeping the same address blocked.

## Verification

| Command | Exit | Result |
|---|---:|---|
| `python -B -m unittest discover -s tests/invariants -p test_account_server_occupied_address.py -v` (initial) | 1 | The final ownership probe failed with backlog 1; this was a test probe issue, corrected before full verification. |
| `python -B -m unittest discover -s tests/invariants -p test_account_server_occupied_address.py -v` | 0 | 1 test passed. |
| `npm test` | 0 | 5 tests passed. |
| `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` | 0 | 35 tests passed. Recorded verdict for `account-server-occupied-address/1`: `pass`. |
| `git diff --cached --check` | 0 | No whitespace errors before commit. |

## Self-review

The check derives its expected exit and readiness behavior from the invariant sentence, uses a literal readiness line, and does not constrain diagnostic text. Both normal controls require a ready server, so a persistent build or startup failure cannot satisfy the occupied-address assertion. A missing Node executable, preoccupied port, and blocked-launch timeout fail the check. The changed path is the sole tracked file in the commit.

## Concerns

None. The deliberate broken-server trial and independent review belong to the separate reviewer and were not run here.
