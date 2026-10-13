# Dispatch — foundation step: invariant checks (serwer-testowy)

You are a fresh agent writing invariant checks. Another agent wrote the invariants' sentences;
other agents will later write the code the checks cover — you write neither (WAY-69). The user
delegated intermediate choices to the orchestrator; questions go back in your report, never to the
human. Worktree `C:/Storage/repos/loop2-serwer-testowy`, branch `task/serwer-testowy`; commit there
with explicit paths, English messages. Nothing on any server, Cloudflare or GitHub; never a server
name, SSH port, SSH user or IPv6 address.

Read first: `.the-way/elements/invariants/skill/SKILL.md` (and the files it names about checks),
WAY-69 and WAY-08 in `.the-way/foundations/decisions.md`; `foundations/invariants.md` (the entries
`loop2-container-isolation/1`, `loop2-distinct-address/1`, `loop2-one-serving-process/2`,
`account-server-typecheck/1`, `account-server-runtime/1`); `foundations/decisions.md` D-01/1,
D-05/3, D-08/1, D-09/1; the spec `docs/task-cycles/serwer-testowy/spec.md` §§ 2–5 (what the
Dockerfile, `compose.yaml`, `deploy/loop2-deploy` and `.github/workflows/deploy.yml` are to hold —
this is the description of the files your checks read, not code); the plan
`docs/task-cycles/serwer-testowy/plan.md` § Foundation entries rows for each check (file names and
what each reads); the existing checks and `tests/invariants/loop2_invariant_support.py` for style.

Write:
1. `tests/invariants/test_loop2_container_isolation.py` — as the plan row describes; runs without Docker.
2. `tests/invariants/test_loop2_distinct_address.py` — reads the public address the repository
   declares once in `.github/workflows/deploy.yml`; its host differs from `kantarion.bieda.it`
   (written out as a literal).
3. `tests/invariants/test_loop2_one_serving_process_container.py` — static part (exec-form `CMD`
   running `node`, one Compose service) always; the Docker part (build, `docker run --init`, count
   listening processes and their children; health probe and init are not serving processes) only
   when a Docker daemon answers, otherwise skipped so it reports unchecked, never pass.
   Move the citations in `tests/invariants/test_loop2_one_serving_process.py` from `/1` to `/2`
   (sentence change only; its method stays), keeping its docstring honest about what it covers.
4. `tests/invariants/test_account_server_typecheck.py` (and the support module where a shared reader
   is needed): replace the tripwire `test_no_deployment_route_left_unread` by a check that reads
   `Dockerfile`, `compose.yaml`, `.github/workflows/deploy.yml` and `deploy/loop2-deploy` and shows
   the serving image exists only after `npm run typecheck` succeeded (type check in the build stage
   before the runtime stage copies `dist/`; Compose builds and names no prebuilt `image:` to pull;
   the script builds before `up --no-build`; the workflow ships no files), and that still fails on
   any other deployment route file.
5. `tests/invariants/test_account_server_runtime.py`: confirm it reads the forms the spec gives
   (multi-stage `FROM node:24-slim`, no Node.js image in Compose, no Node.js setup in the workflow);
   change it only where it does not, and say which in your report.

Rules: each check writes its expected values out as literals (WAY-69); each test cites its
invariant (`# invariant: <id>/<version>` as the existing checks do); a check whose files do not exist
yet must **fail** (not skip, not pass) — that is its failing test before the slices; only the
Docker-daemon part skips. Standard library only.

Then run `python -B .the-way/gate/run_tests.py tests/invariants` and
`python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md`; report each
check's state (expected failures because files are missing named one by one; everything that passed
at the base still passes). Do not touch `foundations/*.md` except where the invariants guard
requires and only to keep the sentences unchanged.

Report to `docs/task-cycles/serwer-testowy/reports/foundation-checks.md`: files, commits, the gate
and guard results, any question. Return a summary under 200 words.
