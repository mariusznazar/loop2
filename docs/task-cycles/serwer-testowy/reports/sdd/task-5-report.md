# Slice 5 report - GitHub Actions workflow

Status: DONE_WITH_CONCERNS.

Files: .github/workflows/deploy.yml, tests/deploy/test_deploy_workflow.py.

RED: tests/deploy run before the workflow existed: 13 errors (FileNotFoundError), all workflow tests.
GREEN: tests/deploy 60 tests OK; tests/invariants 56 tests OK (distinct-address, runtime, typecheck pass).

Choices made: the public address is workflow-level env LOOP2_PUBLIC_URL; the old game's address is
OLD_GAME_URL (name without LOOP2, so the distinct-address check sees one declaration). Secrets
reach the script through the step env; key and known_hosts files live in RUNNER_TEMP (umask 077,
chmod 600) and are removed by a trap. Probe: 5 attempts, 6 s apart; loop2 root must be 200, an
unknown /api/ path 4xx/5xx, old game 2xx-4xx; a failed probe prints ::error:: naming the URL.

Unchecked: actionlint (absent), any real run (the merge's push). The test reads the YAML as text.

## Fix round 1

Changes: deploy.yml - the `/api/` probe reads `%{http_code} %{content_type}` and passes only on
4xx/5xx with `application/json` or `+json`; ssh gets `-o LogLevel=ERROR`. Test - the
server-failure test now requires that a captured ssh status is tested and followed by `exit` with
it (or no swallow at all); new tests: no agent forwarding / only the SHA as remote argument /
LogLevel=ERROR, decoded key never printed, JSON-error probe.
Mutations (scratch, restored): removing the `exit "$status"`, adding `-A`, adding a second remote
argument each make the workflow test fail.
Commands: `python -B .the-way/gate/run_tests.py tests/deploy` -> 63 OK;
`... tests/invariants` -> 56 OK.
