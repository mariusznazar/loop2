# Foundation step — invariant checks (serwer-testowy)

Branch `task/serwer-testowy`, base `170118680abec6760291df5d13f908c58409f867`. Checks only: no
product code, no deployment file, nothing on any server, Cloudflare or GitHub, `foundations/*.md`
untouched. No server name, SSH port, SSH user or IPv6 address in any file (diff scanned).

## Commits

- `a2bbb95` test: read the deployment route in the typecheck invariant check —
  `tests/invariants/loop2_invariant_support.py`, `tests/invariants/test_account_server_typecheck.py`
- `8fd3a0b` test: add checks for loop2 container isolation and its distinct address —
  `tests/invariants/test_loop2_container_isolation.py`, `tests/invariants/test_loop2_distinct_address.py`
- `c8a4b3b` test: check one serving process in the loop2 container —
  `tests/invariants/test_loop2_one_serving_process.py`, `tests/invariants/test_loop2_one_serving_process_container.py`

## What each check reads (expected values written out as literals)

- `loop2_invariant_support.py` gains readers only: `read_required` (a missing file is an
  `AssertionError`, so a check fails, never skips), a Dockerfile stage reader (stages, their
  dependencies through `FROM`, `COPY --from`, `RUN --mount from=`), a block-style Compose reader
  (anchors, merge keys, flow `services`, several documents → fail as unreadable), and a shell
  reader (the script's own fixed assignments put in, `$(…)` and backquotes read as commands,
  comments, heredocs and redirections left out; a function wrapping `docker … "$@"` is read at
  each call).
- `test_loop2_container_isolation.py` (9 tests): Compose project `loop2`, service `app`,
  container `loop2`; no volume, `external:`, `network_mode`/`pid`/`ipc`/links, Docker socket or
  old-deployment name (`loop`, `loop-…`, `loop_…`, `/srv/loop`) in Compose or Dockerfile; the
  script runs `docker compose`, every one with `-p/--project-name loop2` and any `-f` under
  `/srv/loop2/`; no `down`; old deployment named only in a read-only `docker inspect`/`ps`; no
  host-wide prune; images removed only by `image prune` with
  `label=org.opencontainers.image.title=loop2`; no state change on another container, none on a
  network or volume, no `docker run`/`create`.
- `test_loop2_distinct_address.py` (2 tests): exactly one declaration in the workflow of a
  variable whose name holds `LOOP2` with an `http(s)://` value (YAML key or shell assignment); its
  host, case- and trailing-dot-insensitive, is not `kantarion.bieda.it`.
- `test_loop2_one_serving_process_container.py` (3 tests): static — last stage's last `CMD` is
  exec form with program `node` and a script, no `ENTRYPOINT` along its `FROM` chain; one Compose
  service, no `command`/`entrypoint`, no `scale`/`replicas` above 1. Docker — files must exist
  (else fail), then skipped when `docker version` gets no server answer; otherwise `docker build`,
  `docker run --init`, from inside the container: exactly one process holds a listening TCP
  socket, it is `node`, has no children, loads express 5, `GET /` 200 HTML, the made-up `/api/`
  path answered.
- `test_loop2_one_serving_process.py`: five citations `/1` → `/2`; method unchanged; docstring
  now says it checks the server outside any container and points to the container file.
- `test_account_server_typecheck.py`: tripwire `test_no_deployment_route_left_unread` replaced
  by 5 tests: Dockerfile — a RUN running `npm run typecheck` as its own command joined only by
  `&&` (no `;`, `||`, `|`, `&`, no heredoc) stands in a stage the runtime stage cannot be built
  without, and the runtime stage takes `dist` by `COPY --from` of a stage that cannot be built
  without it; Compose — every service has `build:` from `Dockerfile`, no `image:`, no inline
  Dockerfile; script — a `compose … build` before the first `compose … up`, every `up` with
  `--no-build`, no `pull`/`load`/`import`/`tag`, no `compose pull/create/run/start/restart`;
  workflow — no checkout, upload, `scp`/`rsync`/`sftp`, docker push/save/build, nothing piped,
  redirected or heredoc-fed into `ssh`; and no deployment route file besides the four.
- `test_account_server_runtime.py`: confirmed, **unchanged**. `FROM node:24-slim AS build` and
  `… AS runtime` are each read as image `node`, major 24 (a `node:22-slim` runtime stage fails);
  a Compose file with `build:` and no `image:` names no image; a workflow with no Node.js setup
  names no version.

## Controls run outside the repository (scratchpad only, not committed)

Sample `Dockerfile`, `compose.yaml`, `deploy/loop2-deploy` and workflow written from spec §§ 2–5
in a temporary git repository: every static test passes on them (19 of 19). 35 deliberate breaks,
one at a time, each fail the test meant for it (e.g. container `loop`, project `loop`, external
network, socket volume, `network_mode: container:loop`, `compose down`, `docker restart loop`,
`docker system prune`, unfiltered prune, address set to `https://KANTARION.bieda.it./x`, address
from `${{ vars.… }}`, address declared twice, shell-form `CMD`, `CMD ["npm","start"]`, an
`ENTRYPOINT`, second service, `command:` override, `typecheck || true`, `typecheck; build`, type
check removed, type check only in a stage the runtime does not need, `COPY dist` from the context,
`image:` in Compose, `up` without `--no-build`, `docker pull`, `up` before `build`, checkout + scp,
`ssh … < dist.tar`, a `Procfile`, `node:22-slim`). These are my controls, not the WAY-69
deliberate break, which stays with the code's reviewer. The in-container HTTP probe was run
against a local server; the `/proc` probe could not be run (no Linux Node.js here).

## Gate — `python -B .the-way/gate/run_tests.py tests/invariants` (51 tests, exit 1)

Everything that passed at the base still passes (base run: 33 tests, all pass; the tripwire is
gone). Expected failures, each `AssertionError: <file> does not exist in the working tree`:

| Invariant | Test | Missing file |
|---|---|---|
| account-server-typecheck/1 | test_dockerfile_type_checks_before_the_runtime_stage_takes_dist | Dockerfile |
| account-server-typecheck/1 | test_compose_builds_the_image_and_names_none_to_pull | compose.yaml |
| account-server-typecheck/1 | test_deploy_script_builds_before_starting_without_building | deploy/loop2-deploy |
| account-server-typecheck/1 | test_workflow_ships_no_files | .github/workflows/deploy.yml |
| loop2-container-isolation/1 | test_compose_names_its_own_project_service_and_container | compose.yaml |
| loop2-container-isolation/1 | test_compose_shares_nothing_with_another_deployment | compose.yaml |
| loop2-container-isolation/1 | test_dockerfile_names_nothing_of_another_deployment | Dockerfile |
| loop2-container-isolation/1 | 6 DeployScriptActsOnLoop2Alone tests | deploy/loop2-deploy |
| loop2-distinct-address/1 | test_public_address_is_declared_once, test_public_address_host_is_not_the_old_game | .github/workflows/deploy.yml |
| loop2-one-serving-process/2 | test_image_command_is_exec_form_node | Dockerfile |
| loop2-one-serving-process/2 | test_compose_runs_one_service_with_the_image_command | compose.yaml |
| loop2-one-serving-process/2 | test_running_container_has_one_listening_node_process | Dockerfile (fails before the daemon is asked) |

Passing: account-server-typecheck/1 (2 command tests + `test_no_other_deployment_route`),
loop2-one-serving-process/2 (5 local tests), and all other invariants as at the base.

Unchecked: the Docker part — no Docker daemon answers on this machine (the CLI is installed), so
after Slice 2 it will be skipped here and the invariant gets no `pass` from this run; its first
real run is wherever a daemon answers, or the first deployment. Note that the gate gives
loop2-one-serving-process/2 no `pass` at all while that test skips — as the plan intends.

One run before the final one had `loop2-api-error-route` fail in `setUpClass` because port 3000
was already held when it started (the check does not wait for the port, unlike
one-serving-process); a rerun passed. Not caused by these changes, but it can recur when other
agents use port 3000.

## Guard — `python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md`

`0 error(s), 0 warning(s), 0 unchecked`, exit 0; the same with `--base 1701186…` and
`--merge-onto 1701186…`. The five citation errors the entries step reported are gone.

## Questions for the orchestrator

1. **Name of the address variable.** The spec says only "declared once, as a variable". The
   check finds it as the variable whose name holds `LOOP2` (e.g. `LOOP2_URL`). Slice 5 must
   name it so, or the check fails. Accept, or name the variable in the plan?
2. **Runtime check is not a failing test.** Plan Slice 2 lists the runtime check among the
   failing tests, but it passes today: with no deployment file it reads the package files only.
   It reads every form the spec gives, so I left it unchanged. One form outside the spec it does
   not read: a workflow job `container: node:<v>` (short form, no `image:`). Extend it?
3. **Strict readings the slices must meet.** Each `docker compose` names `--project-name loop2`
   (or `-p`) itself; the old container is named only in `docker inspect`/`docker ps`; image
   removal only through `docker image prune` carrying the loop2 label; the type check as its own
   `npm run typecheck` segment joined by `&&`; no YAML anchors in `compose.yaml`; a bare `down`
   word anywhere in the script's code fails. All match spec §§ 2–5 as written.
4. **`data:` lines.** None added. The guard rejects a `data:` line naming a file that does not
   exist, and none of the read files exists yet; the existing checks carry none either.

## Correction 1

Reported by the Slice 2 reviewer (`reports/sdd/task-2-review.md`): with Docker 29.7.2,
`test_running_container_has_one_listening_node_process` failed on the correct image. Its probe
ran as root (`docker exec -u 0`). Root without `CAP_SYS_PTRACE` cannot read the `/proc/<pid>/fd`
entries of the uid-1000 server, so the probe never saw the listener.

Commit `54dc9f7` (test: read container processes as the image's own user), file
`tests/invariants/test_loop2_one_serving_process_container.py` only:

- The probe now runs as the container's own user (`docker exec` without `-u`).
- What it asserts is not weakened, and one assertion is new: every listening socket in the
  container's `/proc/net/tcp` and `tcp6` must be held by a process the probe can read. A socket
  whose owner it cannot see fails the check instead of going uncounted.
- Exactly one listener is now required both before and after the requests, not only after.
- Each in-container request times out after 10 s.
- Expected values are unchanged literals (`node`, express 5, one listener, `GET /` 200 HTML).
- The docstring now says this.

Runs, with a daemon answering (29.7.2):

- `python -B -m unittest -v test_loop2_one_serving_process_container`, against the committed
  `Dockerfile` and `compose.yaml` (`1fa0d31`): 3 of 3 pass, the Docker test included.
- My own control, in a temporary copy only: a `CMD` whose `node` spawns a second listening
  `node` fails with `2 != 1 : processes listening in the container before the requests`. The
  unchanged copy passes. Not run: a listener the container's user cannot read, which would test
  the new unowned-socket assertion.
- Gate `python -B .the-way/gate/run_tests.py tests/invariants`: 51 tests, exit 1.
  `loop2-one-serving-process/2` passes in all 8 tests, and everything that passed before still
  passes. The 10 expected failures are the files still missing:
  - `deploy/loop2-deploy`: 6 isolation tests and the typecheck script test;
  - `.github/workflows/deploy.yml`: 2 distinct-address tests and the typecheck workflow test.
- Guard `format_guard.py foundations/invariants.md` (with `--base`/`--merge-onto 1701186…`):
  `0 error(s), 0 warning(s), 0 unchecked`, exit 0.

## Correction 2

Reported by the Slice 4 implementer (`reports/sdd/task-4-report.md`). The shell reader
in `tests/invariants/loop2_invariant_support.py` opened a heredoc at any `<<word`, including one
in a comment, in quoted text or in `<<<`. It then skipped the rest of the script without saying
so. The isolation and typecheck checks could therefore pass without reading the commands after
such a line.

Commit `a0b9fe9` (test: read shell heredocs only outside comments and quotes) changes
`tests/invariants/loop2_invariant_support.py`, `tests/invariants/test_loop2_container_isolation.py`
and `tests/invariants/test_account_server_typecheck.py`.

- **The reader now reads the script as bash does.** `_shell_line` and `_logical_lines` track
  quotes and backslash escapes. A comment starts only where a word begins outside quotes. A
  heredoc opens only at `<<` outside quotes and comments, and `<<<` is a here-string.
- **Lines are joined as bash joins them.** A line continued by a backslash is joined to the
  next, and a quoted string that spans lines is kept whole. Heredoc bodies are left out.
- **Fails loudly.** A heredoc or quote that is never closed raises `AssertionError`, and so does
  a line `shlex` cannot read. The old reader fell back to a plain split, so the check now fails
  instead of passing on what it did not read.
- **Redirections.** They are removed after tokenizing, with `<`/`>` as tokens, together with
  their target and a descriptor number written before them. The old regex could cut into quoted
  text.
- **Variable assignments.** They are read from code only, not from comments or heredoc bodies.
  A backslash in double quotes now escapes the next character in `_strip_comment` (YAML,
  Dockerfile). The Dockerfile reader uses the same heredoc rule and fails on an unclosed heredoc.
- **New self-checks of the reader.** They run on made-up scripts written out as literals:
  - in the isolation check, class `ShellReaderReadsTheWholeScript`, citing
    `loop2-container-isolation/1`, 2 tests: a `# <<< constants <<<` comment, `<<EOF` in double
    and single quotes, a here-string, a two-line quoted string and a real heredoc whose body holds
    `docker compose … down` must leave the two commands after them read, and the body unread; an
    unclosed heredoc and an unclosed quote must raise;
  - in the typecheck check, `test_shell_reader_reads_past_heredoc_look_alikes`, citing
    `account-server-typecheck/1`.

  I kept them in the checks rather than a separate test file because a new file would need a
  part-map entry.

Runs on HEAD `5201598` plus this change:

- **Controls.** Against the reader at `5201598`, all four self-check assertions fail. With the
  fix they pass. My 35 earlier break controls on the sample files all still fail as intended,
  and the unchanged sample passes (22 of 22).
- **The real script.** The reader now reads `deploy/loop2-deploy` to its last line (383). It
  finds the `docker compose` commands `build`, `up --no-build …` and `logs`, the `docker inspect`
  of `loop2` and of `loop`, `docker info`, and the labelled `image prune`.
- **Gate** `python -B .the-way/gate/run_tests.py tests/invariants`: 54 tests, exit 1. There are
  exactly 3 failures, all for the missing `.github/workflows/deploy.yml`:
  - `test_workflow_ships_no_files` of account-server-typecheck/1;
  - the 2 loop2-distinct-address/1 tests.

  Everything else passes: loop2-container-isolation/1 in 11 of 11 tests, loop2-one-serving-process/2
  in 8 of 8 (the Docker test included), and account-server-typecheck/1 in 7 of 8.
- **Guard** `format_guard.py foundations/invariants.md`: `0 error(s), 0 warning(s), 0 unchecked`,
  with and without `--base`/`--merge-onto 1701186…`.

## Correction 3

Reported by the Slice 4 reviewer (`reports/sdd/task-4-review.md`):

- **Missed break.** Swapping `build_image` and `start_container` inside `main` went uncaught.
  `test_deploy_script_builds_before_starting_without_building` compared where the build and the
  up stand in the file, not the order the script runs them.
- **Two silent misreads of the shell reader:**
  - a `$(` left open at the end of a line dropped the line's last character (`down` read as
    `dow`);
  - a number standing apart before a redirect (`--time 10 >/dev/null`) was dropped as if it were
    a file descriptor.

Commit `7edefb0` (test: order the deploy script's build and up by the calls it runs) changes
`tests/invariants/loop2_invariant_support.py`, `tests/invariants/test_account_server_typecheck.py`
and `tests/invariants/test_loop2_container_isolation.py`.

- **New `executed_docker_commands`.** It gives the script's Docker commands in the order the
  script runs them. It starts from the top-level commands, and each call of a defined function
  is replaced by that function's body, recursively, with a guard against recursion. Branches are
  read as they stand, and a function that is never called gives nothing.
- **The typecheck test now reads that run order.** The first `compose build|up` must be a
  `build`, and an `up` must follow. The rules that every `up` carries `--no-build` and that no
  image is pulled, loaded or tagged still read every command in the file. The docstring says so.
- **The reader fails on what it cannot read.** A `$(` or a backquote that is not closed on its
  line now raises `AssertionError`.
- **Descriptors.** A file descriptor is dropped only when written against its operator, outside
  quotes (`2>&1`, `9>>f`). A number standing apart stays a word.
- **New self-checks on made-up scripts, with literal expected values.**
  - `test_shell_reader_follows_the_order_of_the_calls` (typecheck): functions are defined in the
    order build then up and called in the order up then build, and the reader must give up
    first.
  - `test_shell_reader_keeps_words_beside_redirections` (isolation).
  - A third case in `test_shell_reader_fails_on_what_it_cannot_read`: an unclosed `$(` with
    `down`.

  Against the reader at `a0b9fe9`, the two new isolation self-checks fail.

Runs:

- **Swapped-call break**, on a scratch copy of HEAD's `deploy/loop2-deploy` with lines 371–372
  swapped: the check fails with `deploy/loop2-deploy starts the service before it builds it, in
  the order it runs: [('up', 312), ('build', 298)]`. The unchanged copy passes. My 35 earlier
  break controls still fail as intended, and the sample passes (24 of 24).
- **Gate** on HEAD `a0b9fe9` with this change: 56 tests, exit 1, with exactly 3 failures, all for
  the missing `.github/workflows/deploy.yml`:
  - `test_workflow_ships_no_files` of account-server-typecheck/1;
  - the 2 loop2-distinct-address/1 tests.

  Everything else passes: loop2-container-isolation/1 in 12 of 12 tests, account-server-typecheck/1
  in 8 of 9, and loop2-one-serving-process/2 in 8 of 8.
- **Guard:** `0 error(s), 0 warning(s), 0 unchecked`, with and without `--base`/`--merge-onto`.

## Correction 4

Reported by the Slice 5 reviewer (`reports/sdd/task-5-review.md`):

- **Missed break.** A step `uses: appleboy/scp-action@v0.1.7` with `source: dist`, after
  `npm ci && npm run build`, passed `test_workflow_ships_no_files`.
- **Why.** The check listed known bad words and matched `scp`/`rsync`/`sftp` only as commands in
  `run:`. An action copying files through `uses:` went unseen.

Commit `daaff1b` (test: allow only file-free steps in the deploy workflow) changes
`tests/invariants/loop2_invariant_support.py`, `tests/invariants/test_account_server_typecheck.py`
and `tests/invariants/test_loop2_one_serving_process_container.py`. The last one only got a
docstring line wrapped.

- **The workflow part now allows, instead of listing what is bad.** It still checks the
  sentence: the workflow ships no files. `workflow_shipping` fails on any of these:
  - any `uses:` — an action or reusable workflow does what the repository does not show, so
    the check cannot read it as sending nothing;
  - a `shell:` other than bash or sh;
  - in a `run:` step, a command outside `WORKFLOW_COMMANDS` and the functions the step defines.
    The list is `set umask trap printf echo base64 chmod mkdir rm test [ [[ exit return sleep
    local true false : for case ssh curl` — commands that work on the runner or reach a host
    without sending it files;
  - curl with an option that sends data or reads options from a file (`-T -d -F -K -X`,
    `--upload-file`, `--data*`, `--form*`, `--json`, `--config`, `--request`, `--url-query`);
  - ssh with `ProxyCommand`, `LocalCommand` or `-F`, or ssh fed through a pipe, a redirection
    or a heredoc.

  A command outside the list fails because the check cannot tell it sends nothing. Allowing
  one more is a change to this check.
- **Reader changes.**
  - The shell reader now leaves `case` patterns out (`200)`, `api-error)`, `4??|5??)`), so they
    are not taken for commands. Its header comes out as `case WORD in`.
  - A new `workflow_keys` reads the `uses`, `shell` and `run` values at any depth. A block
    scalar gives its lines less their indentation. A folded or continued value fails as
    unreadable, and a mapping such as `defaults.run` is skipped.
- **New self-check** `test_workflow_reader_refuses_file_copying_steps`, with literal steps. A
  made-up workflow that ships nothing must pass. Each of 11 shipping steps added to it must
  fail: scp-action, rsync-deployments, checkout, `rsync`, `scp`, `tar … | ssh`, `curl -sST`,
  `curl --upload-file`, ssh `ProxyCommand`, `docker push`, `shell: python`.

Runs, on scratch copies of HEAD `deadec8`'s workflow, with a step inserted before the probe:

- **Unchanged workflow:** passes.
- **The reviewer's scp-action step, after `npm ci && npm run build`:** fails on
  `line 55: uses: appleboy/scp-action@v0.1.7`. The npm commands of the step before it are
  flagged too.
- **A `run:` step `rsync -az -e "ssh -p $SSH_PORT" dist/ "$SSH_USER@$SSH_HOST:/srv/loop2/dist/"`:**
  fails on `command rsync is not one this check reads as sending nothing`.
- **`uses: burnett01/rsync-deployments@7.0.1`:** fails on that `uses:`.
- **Earlier controls:** my 35 break controls still fail as intended, and the sample passes (25
  of 25).
- **Gate** on HEAD `deadec8` with this change: 57 tests, all pass, exit 0. No file is missing
  any more:
  - account-server-typecheck/1: 10 of 10;
  - loop2-container-isolation/1: 12 of 12;
  - loop2-distinct-address/1: 2 of 2;
  - loop2-one-serving-process/2: 8 of 8, the Docker test included.
- **Guard:** `0 error(s), 0 warning(s), 0 unchecked`, with and without `--base`/`--merge-onto`.

## Correction 5

Reported by the Slice 5 re-review (`reports/sdd/task-5-review.md`, "Re-review after
daaff1b", finding 11). Three breaks of the workflow part of account-server-typecheck/1 still
passed:

- e1: a quoted `"uses":` key;
- e2: a step written on one line as a flow mapping `{ … }`;
- e3: an `scp` hidden inside `trap '…'`.

Commit `34faea7` (test: read the deploy workflow only in a plain YAML subset and fail closed)
changes `tests/invariants/loop2_invariant_support.py` and
`tests/invariants/test_account_server_typecheck.py`.

- **New `strict_workflow` (support).** `workflow_keys` calls it first, so every reader of the
  workflow fails closed. It accepts only:
  - unquoted keys;
  - block mappings and sequences;
  - literal blocks (`|`, `|-`, `|+`);
  - on a key's line: plain scalars, closed quoted scalars, `{}`, and flow sequences of plain or
    quoted scalars (the committed workflow uses `[main]` and `{}`).

  Anything else raises with the line number and "not in the YAML subset read here": a quoted
  key, a flow mapping, a nested flow form, an anchor, an alias, a tag, a folded or continued
  value, a tab, or a second document. `workflow_keys` also no longer matches keys inside literal
  blocks.
- **New `run_shipping` (check).** In a `run:` step the following fail:
  - any command, builtin or construct outside `WORKFLOW_COMMANDS` and the step's own functions.
    `trap` left the list: a trap's action is now read as commands under the same rules, nested
    at most twice. `eval`, `source`, `.`, `bash -c`, `sh -c`, `env` and `xargs` are not on the
    list, so they fail;
  - heredocs and here-strings (`<<` outside single quotes), and process substitution `<(`/`>(`;
  - `GITHUB_ENV`/`GITHUB_PATH`, `/dev/tcp|udp/`, and any `${{` expression in the run text;
  - assigning a variable that changes what runs: `BASH_ENV ENV PATH LD_PRELOAD LD_LIBRARY_PATH
    PROMPT_COMMAND SHELLOPTS BASHOPTS IFS`. The same names also fail as YAML `env` keys;
  - ssh with a `$(…)` or backquote in its arguments (re-review minor 12);
  - curl where any letter of a short option cluster is `T d F K X`, `-d@file` included.
- **`workflow_problems`** reports a workflow the reader refuses as a problem instead of an error.
  The self-check list grew from 11 to 24 shipping steps (e1–e3, my evasions, `eval`, `bash -c`,
  `${{ }}`, `ssh "$(base64 …)"`, `env: PATH`, an anchor), and the made-up safe workflow now
  carries a `trap 'rm -f …' EXIT`.

**About the request to fail on `trap`.** I read it as "fail on any trap whose action does what
the allow-list refuses". The committed workflow's own `trap 'rm -f "$key_file"
"$known_hosts_file"' EXIT` must pass, and a blanket refusal would fail it. Its action is now read
as commands under the same rules, so e3's scp inside the trap fails. If `trap` should be refused
outright, the workflow's step has to change.

Runs, on scratch copies of HEAD `daaff1b`'s workflow, with a step inserted before the probe:

- **Unchanged workflow:** passes.
- **e1 quoted `"uses":`:** fails as "not a line of the YAML subset".
- **e2 flow-mapping step:** fails as "not a line of the YAML subset".
- **e3 `trap 'scp …' EXIT`:** fails on `command scp is not one this check reads as sending
  nothing`.
- **My evasions:**
  - `echo "BASH_ENV=…" >> "$GITHUB_ENV"` after downloading a script fails twice: it writes the
    environment of later steps, and it sets a variable that changes what runs;
  - `curl … <(scp dist.tgz …)` fails as process substitution. Before this change the `scp`
    inside it would have been taken as words of the allowed `curl`;
  - `printf … > "/dev/tcp/$SSH_HOST/9"` fails as a network redirection;
  - `uses: &copy appleboy/scp-action` fails as outside the YAML subset.
- **Self-checks and earlier controls:** all 24 shipping steps fail in the self-check. My 35
  earlier break controls still fail as intended, and the sample passes (25 of 25).
- **Gate** on `daaff1b` with this change: the first run had 3 failures from the machine, not
  the change:
  - port 3000 was held by another process (the express-http and occupied-address checks);
  - `docker build` could not open the Docker context file, which another process was using.

  The rerun gave 57 tests, all pass, exit 0. Both runs are recorded in
  `.runs/foundation-checks-correction-5.jsonl`, the last one kept.
- **Guard:** `0 error(s), 0 warning(s), 0 unchecked`, with and without `--base`/`--merge-onto`.

## Correction 6

Reported by the re-review after `34faea7` (`reports/sdd/task-5-review.md`,
findings 13 and 14):

- **13: ssh could still be fed a file**, and the check passed:
  - e6: `0<file`;
  - e7: a pipe ending one line, feeding `ssh` on the next;
  - e5/e9: a file encoded into a variable used in ssh's arguments.
- **14: a capitalised `Uses:` key passed** (e8).

I closed the class, not the four instances. Commit `98be735` (test: allow ssh in one shape and
only known workflow keys) changes `tests/invariants/loop2_invariant_support.py` and
`tests/invariants/test_account_server_typecheck.py`.

- **(b) Keys, compared with case.** `strict_workflow` now returns every key with the keys above
  it. `key_allowed` takes only these, as literals:
  - at the top: `name on concurrency permissions env jobs`;
  - under `on`: `push`, and under `push`: `branches`;
  - under `concurrency`: `group cancel-in-progress`;
  - in a job: `name runs-on timeout-minutes env steps`;
  - in a step: `name env run shell timeout-minutes`;
  - an `env` name `[A-Z_][A-Z0-9_]*`, and a job id.

  Any other key fails: `uses`, `Uses`, `with`, and `permissions` with sub-keys.
- **(a) ssh in one shape only** (`ssh_shape` and `ssh_lines`):
  - options only `-i <path>`, `-p <port>` and `-o <setting>`. The settings come from a literal
    list (`StrictHostKeyChecking=yes`, `BatchMode=yes`, `IdentitiesOnly=yes`, `LogLevel=…`,
    timeouts, `UserKnownHostsFile=<path>`);
  - `<path>` is `$RUNNER_TEMP/<name>`, or a variable the step assigns that value exactly once;
  - `<port>` is a variable whose every `env` value is `${{ secrets.DEPLOY_PORT }}`;
  - after the options exactly two words: `$USER@$HOST`, whose variables' `env` values are
    `${{ secrets.DEPLOY_USER }}` and `${{ secrets.DEPLOY_HOST }}`, then one remote argument whose
    variable's value is `${{ github.sha }}`. No other variable is allowed, and a step may not
    assign any variable the workflow's `env` sets;
  - ssh must be the first word of its line at nesting depth 0. Its line may not stand inside a
    `{ }`, `( )`, loop, `if` or function, or in a substitution. Lines are read with backslash,
    `|`, `||` and `&&` continuations joined;
  - on ssh's line, outside quotes, there may be no `|` (only `||`), no `>`, and no `<` other than
    `</dev/null`.
- **Anywhere in a step**, an input redirection other than `</dev/null` fails (`0<`, `<&` and
  `$(<file)` included). So do `base64` without `-d` or with a file operand, and a curl argument
  holding `file:`. The whitelisted commands then have no way to read a file into text.
- **The docstring** states the shape. The safe made-up workflow now has an `env` with the
  secrets, a path variable and `</dev/null`. The self-check grew to 32 shipping steps, adding
  `Uses:`, `with:`, `0<dist.tgz`, a pipe on the line before, `"$data"`, a group fed by a pipe,
  an extra `"$KEY"` argument, and `curl file://`.

Runs, on scratch copies of the committed workflow (HEAD `34faea7`; the workflow file is unchanged
since `deadec8`):

- **Unchanged workflow:** passes with `[]`.
- **e6 `"$DEPLOY_SHA" 0<"$key_file"`:** fails on "the step redirects a command's input".
- **e7 `printf %s "$SSH_KEY_BASE64" |` on the line before ssh:** fails on "ssh is not a command
  of its own at the top of the step".
- **e5/e9 `"$DEPLOY_SHA" "$payload"`:** fails on "3 words after the options, not a destination
  and one argument".
- **e8 `Uses: appleboy/scp-action@v0.1.7`:** fails on "key `Uses` under jobs/deploy/steps is not
  one this check allows".
- **My evasions:**
  - `printf … | {` + ssh + `}` fails on "ssh is not a command of its own at the top of the
    step";
  - `curl -sS -o /dev/null "file:///etc/hostname"` fails on "curl sends data or reads a file".
- **Self-check:** all 32 shipping steps fail, and the safe workflow gives `[]`.
- **My earlier sample workflow** (scratchpad only) now fails, as it should: its `-i` names a key
  file under the home directory, outside the shape. The 35 break controls still fail as
  intended.
- **Gate** on `34faea7` with this change: 57 tests, all pass, exit 0.
- **Guard:** `0 error(s), 0 warning(s), 0 unchecked`, with and without `--base`/`--merge-onto`.

**What the shape rests on.** It is fitted to the deployment the decision describes: one ssh
call that hands the commit to the forced command. A different but harmless way of writing that
call — another option, a key file under the home directory, `0</dev/null` — fails until this
check allows it. A slice that needs one returns to the foundation step.

## Correction 7

Reported by the re-review after `98be735` (`reports/sdd/task-5-review.md`, finding
15). The variable carrying the commit could be overwritten with downloaded content, and the
check passed, through any of three forms:

- `printf -v DEPLOY_SHA …`;
- `for DEPLOY_SHA in …`;
- a function given the name as an argument.

Commit `bceae3d` (test: refuse naming workflow env variables other than as expansions) changes
`tests/invariants/test_account_server_typecheck.py` only.

- **The reviewer's class fix: new `bare_names`.** In a `run:` step, any name the workflow's
  `env` sets may appear only as `$NAME` or `${NAME}`, exactly. Every other occurrence on a code
  line fails: an assignment, `printf -v`, `read`, `for`, `local`, `unset`, a function name, an
  argument to a function or nameref, an escaped `\$NAME`, or an assigning expansion such as
  `${NAME:=…}`. It replaces the earlier `NAME=` search.
- **`printf` and `local` may take no option.** This closes a nameref or `printf -v` aimed at a
  name assembled from quoted parts (`"DEPLOY""_SHA"`), which no text search for the name can
  see. Neither option is used by the committed workflow.
- **Path variables for ssh** (`-i`, `UserKnownHostsFile`) must be named bare exactly once — in
  their one `NAME="$RUNNER_TEMP/…"` assignment, at the start of the line. Otherwise they do not
  count as paths, and ssh's shape fails.
- **Functions stay allowed.** The committed workflow needs one: `probe()` in the probe step. A
  function named like an env variable fails under the rule above.
- **Docstring and self-check.** The docstring says this. The self-check grew to 37 shipping
  steps: `printf -v SHA`, `for SHA in`, `SHA() { :; }`, `local -n target=S""HA`, and
  `: "${SHA:=$(curl …)}"`.

Runs, on scratch copies of the committed workflow (HEAD `98be735`), each line inserted before
`status=0` in the deploy step:

- **Unchanged workflow:** passes with `[]`.
- **`printf -v DEPLOY_SHA '%s' "$(curl -sS "$OLD_GAME_URL")"`:** fails on "the step names
  `DEPLOY_SHA` … other than as `$DEPLOY_SHA` or `${DEPLOY_SHA}`", and on "`printf` with an
  option".
- **`for DEPLOY_SHA in "$(curl …)"; do :; done`:** fails on the bare name.
- **`load() { printf -v "$1" … ; }` and `load DEPLOY_SHA`:** fails on the bare name in the call
  and on `printf` with an option.
- **My evasions:**
  - `local -n target="DEPLOY""_SHA"` in a function, then `target="$(curl …)"`. The name is
    split, so no name search sees it; it fails on "`local` with an option";
  - `: "${DEPLOY_SHA:=$(curl …)}"` fails on the bare name.
- **Earlier breaks (e5–e9 and mine):** still fail, the unchanged workflow passes, and the safe
  self-check workflow gives `[]`. All 37 shipping steps fail.
- **Gate** on `98be735` with this change: 57 tests, all pass, exit 0.
- **Guard:** `0 error(s), 0 warning(s), 0 unchecked`, with and without `--base`/`--merge-onto`.

## Correction 8

Reported by the re-review after `bceae3d` (`reports/sdd/task-5-review.md`, finding
16). The reader turned a backslash-newline into a space; bash removes it outright, even inside a
word. Two forms still overwrote `DEPLOY_SHA` and passed:

- a `for` loop whose variable name is split across a backslash at line end;
- `printf $'\x2dv'`, with `-v` hidden in ANSI-C quoting.

Commit `ebfb73b` (test: read run steps with backslash-newlines removed and refuse $'' quoting)
changes `tests/invariants/loop2_invariant_support.py` and
`tests/invariants/test_account_server_typecheck.py`.

- **Continuations are joined first.** New `joined_continuations` runs before every other rule of
  `run_shipping`, the trap action's recursion included. It removes each backslash-newline as
  bash does, then pads the logical line with empty lines so line numbers stay. A backslash
  ending a line is refused when no whitespace stands before it, or when it follows another
  backslash. Only such a backslash can split or hide a word. The committed workflow's
  continuations all have a space before the backslash.
- **ANSI-C and locale quoting are refused.** `$'…'` and `$"…"` fail anywhere outside single
  quotes in a run step.
- **The shell reader (`_logical_lines`, support) joins without a space.** It joined a
  backslash-newline by inserting a space. It now joins as bash does, and the next line's own
  indentation separates the words. This also corrects the deploy-script reader the isolation
  and typecheck checks use.
- **Docstring and self-check.** The docstring says this. The self-check grew to 41 shipping
  steps: `for S\` + `HA in …`, `printf $'\x2dv' SHA …`, `printf $"-v" SHA …`, and
  `echo "GITHUB_\` + `ENV"`.

Runs, on scratch copies of the committed workflow (HEAD `bceae3d`), each inserted before
`status=0` in the deploy step:

- **Unchanged workflow:** passes with `[]`.
- **#16 `for DEPLOY_\` + `SHA in "$(curl …)"; do :; done`:** fails on "a backslash ends the line
  without whitespace before it". After the join, it also fails on the bare name `DEPLOY_SHA`.
- **#16 `printf $'\x2dv' DEPLOY_SHA '%s' "$(curl …)"`:** fails on "ANSI-C or locale quoting" and
  on the bare name.
- **My evasions:**
  - `echo "BASH_ENV=…" >> "$GITHUB_\` + `ENV"`, which splits `GITHUB_ENV` past the text search,
    now fails on the backslash. After the join, it also fails on "writes the environment or PATH
    of later steps";
  - `printf $"-v" DEPLOY_SHA …` fails on the locale quoting and the bare name.
- **Earlier breaks:** the #13, #14 and #15 forms and my earlier evasions still fail. The safe
  self-check workflow gives `[]`, and none of the 41 shipping steps passes.
- **Gate** on `bceae3d` with this change: 57 tests, all pass, exit 0. The deploy-script checks
  still read the script whole.
- **Guard:** `0 error(s), 0 warning(s), 0 unchecked`, with and without `--base`/`--merge-onto`.

## Correction 9

Final-review finding M2 (`reports/sdd/final-review.md`): the docstring of
`tests/invariants/test_account_server_typecheck.py` claimed more than the workflow part proves.
It said "so nothing in a step can overwrite what ssh sends", but parked finding #15 shows this is
false: a variable name assembled at run time, such as `printf "$o" "${n}SHA"`, passes the
reading.

Commit `6bba3d2` (docs: state the limits of the typecheck check's workflow reading) changes only
the docstring of `tests/invariants/test_account_server_typecheck.py`. Nothing the check does has
changed.

- **Covers, workflow bullet.** It is now described as a static reading that fails closed on what
  it does not accept. It finds that the workflow, as written, ships no files by any construct the
  reading recognises. The overclaim is gone; the reading still requires that `printf` and
  `local` take "no option written out".
- **Does NOT cover gains two limits:**
  - The workflow reading is static, of the plain YAML and shell subset. It does not prove what a
    step builds at run time: a variable name or option assembled from other values (example
    `printf "$o" "${n}SHA" …`) still passes and can change what ssh sends.
  - That the automation key can only start a rebuild of a validated commit of `main` rests on
    the server's forced command. That is `restrict,command=…` running the installed
    `/usr/local/bin/loop2-deploy`, which accepts only a 40-hex commit on the freshly fetched
    `main`. It is outside this repository and no test here checks it.

Runs:

- `python -B -m unittest -v test_account_server_typecheck`: 10 tests, OK.
- **Guard:** `0 error(s), 0 warning(s), 0 unchecked`, with and without `--base`/`--merge-onto`.

## Assessment settlement

Rows for the check author in `reports/assessment/settlement.md` (assessment: `reports/assessment/report.md`).

**Commits:**

- `010923f` test: cut the workflow reader from the typecheck check (C1, C6) —
  `tests/invariants/test_account_server_typecheck.py`, `tests/invariants/loop2_invariant_support.py`
- `6eb2d7c` test: check loop2-host-sharing apart from container isolation (C3, C6) —
  `tests/invariants/test_loop2_container_isolation.py`, `tests/invariants/test_loop2_host_sharing.py`
- `175f4f6` docs: correct the container and runtime check docstrings (O9, O12) —
  `tests/invariants/test_loop2_one_serving_process_container.py`,
  `tests/invariants/test_account_server_runtime.py`

**C1 — workflow reader cut.**

- **From `test_account_server_typecheck.py`:** the workflow constants, every workflow function,
  the safe workflow, the shipping steps, and the tests `test_workflow_ships_no_files` and
  `test_workflow_reader_refuses_file_copying_steps`.
- **From the support module:** `strict_workflow`, `workflow_keys`, `_workflow_scalar` and their
  patterns.
- **Kept:** the Dockerfile, Compose and script reads, and `test_no_other_deployment_route`. In
  that test the workflow still counts as a known route file.
- **New "Does NOT cover":** the workflow is not read. What it sends reaches the server only as
  the input of the forced command, which builds from a clean checkout of a commit of `main`
  (`git checkout --force` and `git clean -ffdx`), so no file it could ship enters the image. That
  rests on the forced command, outside this repository and checked by no test here. It also makes
  the parked limit of a static reading moot, since the check no longer reads the workflow.

**C3 — new check `tests/invariants/test_loop2_host_sharing.py`, citing `loop2-host-sharing/1`.**

- **Moved from the isolation check:** the six script tests:
  - the script runs `docker compose`;
  - every Compose call names the `loop2` project, with its file under `/srv/loop2/`;
  - nothing takes a project down;
  - the old loop instance is only read;
  - no host-wide prune, and images are pruned only by the loop2 label;
  - no state change on another container, network or volume, and no `run`/`create`.
- **Misses closed:**
  - `test_docker_takes_no_global_option`: refuses any `docker` option before the subcommand,
    such as `--context`, `-H`/`--host`, `--config`, `-c` or `-l`;
  - `test_compose_takes_only_project_and_file_options`;
  - `test_no_variable_points_docker_elsewhere`: refuses `DOCKER_HOST`, `DOCKER_CONTEXT`,
    `DOCKER_CONFIG`, `DOCKER_TLS_VERIFY`, `DOCKER_CERT_PATH`, `COMPOSE_PROJECT_NAME`,
    `COMPOSE_FILE` and `COMPOSE_PROFILES`;
  - `test_compose_top_holds_only_name_and_services`;
  - `test_service_sets_only_keys_that_grant_nothing`: an allow-list of service keys, so
    `privileged`, `cap_add`, `security_opt`, `devices`, `pid`/`ipc`/`uts`/`network_mode`/
    `userns_mode`/`cgroup`, `sysctls`, `volumes` and any key not listed fail. The `build` keys
    are allow-listed too, so `network: host`, `privileged` and `entitlements` fail;
  - `test_no_docker_socket`.
- **The isolation check now holds only its Compose and Dockerfile tests.** Its docstring follows
  the current sentence ("The loop2 instance runs in a container separate from the existing loop
  instance") and points to the host-sharing check for the rest.

**C6 — reader self-tests.** They are kept and cite no invariant: `ShellReaderReadsTheWholeScript`
(3 tests, now in the host-sharing file), and in the typecheck check
`test_shell_reader_reads_past_heredoc_look_alikes` and
`test_shell_reader_follows_the_order_of_the_calls`.

**O9.** The container check's docstring no longer claims that Compose's `init: true` is read.
The Docker part runs the image with its own `--init`, which it does not require.

**O12.** The runtime check's "the skeleton has none" is replaced by the repository's current
deployment files.

**Runs, on scratch copies of `compose.yaml`, `Dockerfile` and `deploy/loop2-deploy`:**

- **Unchanged files:** the host-sharing and isolation checks both pass.
- **The assessor's missed breaks now fail the host-sharing check:**
  - `docker --context x rm -f other` fails `test_docker_takes_no_global_option`;
  - `privileged: true` fails `test_service_sets_only_keys_that_grant_nothing`;
  - `cap_add: [SYS_ADMIN]` fails the same test.
- **My own breaks also fail:**
  - `docker -H tcp://other:2375 stop loop2` fails the global-option test;
  - `DOCKER_HOST=ssh://other docker rm -f loop2` fails the endpoint-variable test;
  - `pid: host`, `security_opt: [seccomp=unconfined]` and a `build` with `network: host` fail
    the service-keys test;
  - a socket volume fails `test_no_docker_socket` and the service-keys test. `pid: host` and the
    socket volume also fail isolation.

**Gate** `python -B .the-way/gate/run_tests.py tests/invariants`, with no process listening on
port 3000 beforehand: 84 tests, all pass, exit 0.

| Invariant | Tests passing |
|---|---|
| loop2-host-sharing/1 | 12 |
| loop2-container-isolation/1 | 3 |
| account-server-typecheck/1 | 6 |
| loop2-one-serving-process/2 | 8 |
| loop2-deploy-keeps-running/1 | 13 |
| loop2-deploy-trigger-input/1 | 10 |
| everything else | as before |

**Guards:**

- **Invariants:** `0 error(s), 0 warning(s), 0 unchecked`, with and without
  `--base`/`--merge-onto`.
- **Part map** (`--base 1701186…`): `0 error(s), 2 warning(s), 1 unchecked`. Both warnings are
  in entries I do not write: `build-tools` and `deployment` depend on `account-server` with no
  separation recorded. The unchecked item is the dependency graph.

### Settlement review correction — the host-sharing script half as an allow-list

The code reviewer's deliberate breaks (`reports/sdd/settlement-review.md`) found three
of five script breaks passing. The script half matched commands by their spelling:

- HS1: `docker image remove node:24-bookworm-slim`, an alias of `rmi`;
- HS2: `docker container remove --force other-workload`;
- HS3: `docker tag loop2-app:latest loop:latest`, which puts loop2's image over the old game's
  image name.

Commit `2732c2a` (test: allow only listed Docker commands and objects in the deploy script)
changes `tests/invariants/test_loop2_host_sharing.py` only.

- **New `test_every_docker_command_is_one_a_deployment_may_run`.** Every Docker command the
  script runs is checked by `docker_problems` / `compose_problems` against `ALLOWED_DOCKER` and
  `ALLOWED_COMPOSE`, literal lists of what a deployment may run. They name each command's
  options (and whether each takes a value) and the objects it may name. Any other command,
  alias, option or object fails, and so does a global option before the subcommand. The list:
  - `info` with `--format` only;
  - `inspect` of the container `loop2`, or read-only of `loop`, with `--type container` and
    `--format` (`container inspect` reads as the same command);
  - `logs` of `loop2`, with `--tail` and `--timestamps`;
  - `image prune` with `--force`/`--all`, its filters only
    `label=org.opencontainers.image.title=loop2` (required) and `dangling=true`;
  - `compose` with only `-p`/`--project-name loop2` and `-f`/`--file` under `/srv/loop2/` before
    its subcommand. The subcommands `build`, `up`, `logs` and `ps` each take their listed
    options, and no object but the service `app`.
- **Replaced spelling-based tests:**
  - `test_no_host_wide_prune_and_images_pruned_only_by_the_loop2_label`;
  - `test_no_state_change_on_another_container_network_or_volume`;
  - `test_docker_takes_no_global_option`;
  - `test_compose_takes_only_project_and_file_options`.
- **Kept:** `test_script_runs_docker_compose`, `test_every_compose_command_names_the_loop2_project`,
  `test_nothing_takes_a_project_down`, `test_old_deployment_is_only_read` and
  `test_no_variable_points_docker_elsewhere`. The old-instance test now accepts the name only in
  an `inspect` or `ps` that passes the allow-list. The Compose half is unchanged, and the
  docstring states the list.

Runs, on scratch copies of `compose.yaml`, `Dockerfile` and `deploy/loop2-deploy`, each command
added before `main "$@"`:

- **Unchanged files:** the host-sharing and isolation checks pass.
- **HS1, HS2 and HS3:** each fails `test_every_docker_command_is_one_a_deployment_may_run`.
- **My own breaks:** each also fails that test:
  - `docker container update --restart=no other-workload`;
  - `docker compose -p loop2 -f /srv/loop2/compose.yaml up -d --no-build other`;
  - an image prune with an extra `--filter until=1h`;
  - the earlier `docker --context x rm -f other`.
- **Gate**, with nothing listening on port 3000 beforehand: 81 tests, all pass, exit 0.
  `loop2-host-sharing/1` passes in 9 tests; the 3 reader self-checks are counted apart.
- **Invariants guard:** `0 error(s), 0 warning(s), 0 unchecked`, with and without
  `--base`/`--merge-onto`.
