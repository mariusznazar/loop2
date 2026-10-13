### Slice 5 — GitHub Actions workflow

- **Goal:** `.github/workflows/deploy.yml` runs on a push to `main`, in concurrency group
  `deploy-loop2` with `cancel-in-progress: false`, with `permissions: {}` and no checkout; decodes
  `DEPLOY_SSH_KEY` into a file only the runner can read, pins `DEPLOY_KNOWN_HOSTS`, and makes one
  SSH call with `StrictHostKeyChecking=yes` and `BatchMode=yes` to `DEPLOY_USER` at `DEPLOY_HOST`
  on `DEPLOY_PORT`, whose remote command is `github.sha` passed through an environment variable,
  never interpolated into the script text; fails when the server script exits non-zero; then
  probes, with a few short retries, loop2's public address — declared once as a workflow variable,
  `https://loop2.mariusznazar.com/` — for 200 and an unknown `/api/` path for an API error, and
  `https://kantarion.bieda.it/` for an answer, failing with a message naming the address that
  failed. No access value is written in the file.
- **Change:** `.github/workflows/deploy.yml` · `tests/deploy/test_deploy_workflow.py`
- **Read:** `docs/task-cycles/serwer-testowy/task-frozen.md` · `docs/task-cycles/serwer-testowy/spec.md`
  `tests/invariants/test_account_server_runtime.py:90-193`; made by Slice 4 or by the foundation
  step, so not measured here: deploy/loop2-deploy (its exit codes and output),
  tests/invariants/test_loop2_distinct_address.py
- **Checks:** first, the failing `tests/deploy/test_deploy_workflow.py`, standard library only
  (PyYAML is not assumed): trigger `push` on `main` only; the concurrency group and
  `cancel-in-progress: false`; `permissions: {}`; no `actions/checkout`; the five secrets named and
  no other secret; `StrictHostKeyChecking=yes` and `BatchMode=yes`; `github.sha` reaches the run
  script only through `env`; both public probes; no IPv6 literal and no host name besides the two
  public addresses and `github.com`. Then `python -B .the-way/gate/run_tests.py tests/deploy` and
  `python -B .the-way/gate/run_tests.py tests/invariants` (distinct-address, runtime and typecheck
  pass). Unchecked here: `actionlint` (not installed) and any real run, which is the merge's push.
- **Depends on:** Slice 4 · decisions "How does a change reach the server?", settlement rows 1, 2
  and 4 · `loop2-distinct-address/1`

