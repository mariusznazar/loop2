# Setup correction verification

Product/foundation commit: 0d92d2ee7c01a630d4cae659a49b6390c68f7f8a. Base and merge target: 170118680abec6760291df5d13f908c58409f867. Date: 2026-10-13. The correction changes foundation documentation only; deployment code remains the code already running at original request commit 1dcc5cdef49fa80a6b9057ea2152677ab13db7c1.

## Commands and outcomes

| Command | Result |
|---|---|
| `npm.cmd test` | exit 0; 11 passed, 0 skipped; includes build |
| `python -B .the-way/gate/run_tests.py tests/deploy` | exit 0; 63 passed, 122.338 s |
| `python -B .the-way/gate/run_tests.py tests/invariants` | exit 0; 81 passed, 115.134 s; no skipped Docker check |
| `python -B .the-way/gate/run_tests.py tests/agent_workflow` | exit 0; 5 passed |
| Environment-facts format guard, actual base and merge-onto | exit 0; 0 errors, 0 warnings, 0 unchecked format checks |
| Decisions format guard, actual base and merge-onto | exit 0; 0 errors, 0 warnings, 0 unchecked format checks |
| Invariants format guard, actual base and merge-onto | exit 0; 0 errors, 0 warnings, 0 unchecked format checks |
| Glossary format guard, actual base and merge-onto | exit 0; 0 errors, 1 known warning: term and part both named deployment |
| Part-map format guard, actual base | exit 0; 0 errors, 2 known warnings about computed account-server criticality; dependency-graph check unchecked because product has no reporting command |
| `git diff --check` | exit 0 |
| `python -B .the-way/project-level/plan_check.py <vault plan_mvp_loop2.md>` | exit 0; nothing found after task-15 context addition |

Both full commit ids above were passed, not `none`. The five format-guard commands use this repository's foundation paths; the part map takes no merge-onto. Source-evidence runs for new facts and their limits are in setup-facts.md. The nine fact Methods currently read TODO (five added in this correction); their method verdicts remain unchecked, independently of successful observations and format guards.

## Running deployment

- Running loop2 revision equals 1dcc5cdef49fa80a6b9057ea2152677ab13db7c1, healthy.
- Local root 200 text/html; local unknown API 404 application/json; on-host global IPv6 root 200 text/html.
- Public root 200 text/html; public unknown API 404 application/json; separate read of response body parses as `{"error":"Not found"}`. Dynamic API response comes through Cloudflare.
- Direct external-origin evidence: ss observes an ESTAB IPv6 connection on port 18080 from a peer contained in Cloudflare's published IPv6 ranges. Peer and origin access addresses are not recorded.
- Requested memory bound HostConfig.Memory=536870912; Docker stats reports /512MiB; direct read of the container's cgroup memory.max through its /proc PID root yields 536870912. No memory-exhaustion stress test performed.
- Old loop and the other workload remain healthy; old public game returns 200.
- Installed script is root:root 0755, passes bash -n and matches source hash. Exactly one matching restricted entry exists for the automation public key. Temporary private automation-key file is absent after owner removal.
- All five Actions secret names exist, and repository deploy key is read-only. Their secret values are not visible to the agent.

## Remaining unchecked

- First genuine GitHub Actions deployment and runner-to-server IPv4 SSH reachability: the merge's push triggers them.
- `actionlint` and `shellcheck`: not run, unchanged from original review.
- Private Cloudflare dashboard state is owner-confirmed; observable routing is independently checked, but its private settings are not independently read.
- The fact Methods and dependency-graph check named above.

Manual TLS/origin migration is outside PR 11 by the owner's decision. Task 15's existing session/proxy question carries that work and the Tunnel candidate. No test result substitutes for the human's merge.
