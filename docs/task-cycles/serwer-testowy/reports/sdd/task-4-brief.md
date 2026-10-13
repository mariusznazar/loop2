### Slice 4 — deployment script: warning, resource gate, build, switch, probe, prune

- **Goal:** `deploy/loop2-deploy` runs spec steps 7–13 after the checkout: the installed-versus-
  source comparison (warn and continue on a difference, with the rollback wording; warn without
  crashing when the commit has no `deploy/loop2-deploy`); the resource gate (`MemAvailable` at
  least 1024 MiB, at least 4 GiB free on the filesystem of Docker's root directory read as that one
  field, both logged on every run, else exit 5 with no build); `docker compose --project-name loop2
  -f /srv/loop2/compose.yaml build app` with `LOOP2_COMMIT` (else exit 7, nothing switched), then
  `MemAvailable` logged again; `up -d --no-build --no-deps --remove-orphans --wait --wait-timeout
  120 app` and the local probe of `127.0.0.1:18080` (`/` 200, an unknown `/api/` path a JSON 404),
  else exit 8 with the last container log lines and the restore line naming the previous commit;
  the `loop` container's name, status and health logged after the build stage on success and
  failure, never its port; on success only, a prune of dangling images labelled
  `org.opencontainers.image.title=loop2`, the line "deployed `<sha>`, previously `<sha>`", exit 0.
  Never `down`, another project's or container's command (beyond reading `loop`'s state), a
  host-wide prune or an unfiltered image prune; never whole `docker info`, `hostname` or `uname -n`
  in its output.
- **Change:** `deploy/loop2-deploy` · `tests/deploy/deploy_script_support.py`
  `tests/deploy/test_loop2_deploy_build.py` · `tests/deploy/test_loop2_deploy_switch.py`
- **Read:** `docs/task-cycles/serwer-testowy/task-frozen.md` · `docs/task-cycles/serwer-testowy/spec.md`
  `foundations/part_map.md`; made by Slices 2 and 3, so not measured here: compose.yaml,
  Dockerfile, tests/deploy/test_loop2_deploy_input.py, tests/deploy/test_loop2_deploy_commit.py,
  and the foundation step's tests/invariants/test_loop2_container_isolation.py
- **Checks:** first, failing tests. `tests/deploy/test_loop2_deploy_build.py`: a difference
  between the installed copy and the source warns and continues; a commit without
  `deploy/loop2-deploy` warns and then fails the build with exit 7; a fake meminfo below 1024 MiB
  and a `df` stub below 4 GiB each give exit 5 without `docker compose build`; both values are
  logged on a pass; a failed build gives exit 7 and never calls `up`; the `loop` state is logged
  after a failed build. `tests/deploy/test_loop2_deploy_switch.py`: a failed health wait and a
  failed probe each give exit 8 with the restore line; the `loop` state is logged after a success
  and after exit 8; only loop2-labelled dangling images are pruned, only on success; a repeated
  deployment of the running commit succeeds; the output never holds whole `docker info`,
  `hostname` or `uname -n`; no command the script runs contains `down`, another project name or an
  unfiltered prune. Then `bash -n deploy/loop2-deploy`,
  `python -B .the-way/gate/run_tests.py tests/deploy` and
  `python -B .the-way/gate/run_tests.py tests/invariants` (the container-isolation check now
  passes in full). Unchecked here: `shellcheck`, real Docker and real `flock`.
- **Depends on:** Slice 3

