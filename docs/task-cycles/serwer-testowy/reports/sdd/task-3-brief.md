### Slice 3 — deployment script: input, lock, fetch, accepted commit, checkout

- **Goal:** `.gitattributes` holds `deploy/** text eol=lf`. `deploy/loop2-deploy` (bash) exists
  with the marked constants block at its top (fixed `PATH`, `umask`, checkout `/srv/loop2`,
  installed path `/usr/local/bin/loop2-deploy`, log `/var/log/loop2-deploy.log`, lock
  `/run/loop2-deploy.lock`, memory source `/proc/meminfo`, the two thresholds, the lock and health
  waits, host port 18080, branch `main`, project `loop2`, service `app`, container `loop2`) and
  runs spec steps 1–6: validate the one input on its two paths (forced command:
  `SSH_ORIGINAL_COMMAND` set and no argument; human: unset and exactly one argument) against
  `^[0-9a-f]{40}$` as the whole value, else exit 2 before any git or Docker call; take the lock
  with `flock` (else exit 4, a lock file it cannot open included, with its own message); log the
  start with the running container's revision label or `none`; fetch from the clone's `origin`
  remote — forced path `main` only, human path every branch head with pruning (else exit 6);
  accept a commit that is an ancestor of, or equal to, freshly fetched `origin/main` (forced) or of
  any `refs/remotes/origin/*` head (human), else exit 3; `git checkout --force --detach` and
  `git clean -ffdx` (else exit 6). The stages after the checkout come in Slice 4. No value is
  `eval`ed or interpolated into shell text; nothing printed reveals a server-access value.
  The test seam in `tests/deploy/deploy_script_support.py`: a temporary copy of the script with
  only the constants block replaced, asserted byte-identical outside it; recording stubs for
  `docker`, `curl`, `flock` and `df`, written at run time with LF endings into a stub directory
  first on the copy's `PATH`; a guard that aborts when any of the four resolves outside that
  directory; a temporary Git repository standing in for GitHub and a clone of it standing in for
  `/srv/loop2`; Git's own bash, never another `bash` on `PATH` such as the WSL one; a missing tool
  skips the test, so it reports unchecked, never pass.
- **Change:** `.gitattributes` · `deploy/loop2-deploy` · `tests/deploy/deploy_script_support.py`
  `tests/deploy/test_loop2_deploy_input.py` · `tests/deploy/test_loop2_deploy_commit.py`
- **Read:** `docs/task-cycles/serwer-testowy/task-frozen.md` · `docs/task-cycles/serwer-testowy/spec.md`
  `docs/task-cycles/serwer-testowy/reports/spec-re-review.md:188-261`
  `tests/invariants/loop2_invariant_support.py:1-140` · `foundations/part_map.md`
  `.the-way/gate/run_tests.py:1-60`
- **Checks:** first, failing tests. `tests/deploy/test_loop2_deploy_input.py`: non-hex, 39 and 41
  characters, uppercase hex, leading or trailing whitespace, an embedded newline, `--help`, `-c`,
  `;`, `$(...)`, backticks, `|`, `&&`, two words, empty input, two arguments, both
  `SSH_ORIGINAL_COMMAND` and an argument, and no input at all (the forced command with no client
  command) — each exit 2 with no stub call and no git call on the fixture.
  `tests/deploy/test_loop2_deploy_commit.py`: the forced path fetches only `main`, the human path
  every branch head; an earlier ancestor of `main` is accepted; a commit on no branch is refused
  with exit 3 on both paths; a commit only on another branch is refused with exit 3 on the forced
  path in two states — absent from the clone, and already fetched by an earlier human-path run but
  not on `main` — while the human path accepts it; a lock stub reporting a held lock gives exit 4;
  a failing fetch gives exit 6; the checkout is detached at the commit and clean. Then
  `bash -n deploy/loop2-deploy` under Git Bash, `python -B .the-way/gate/run_tests.py tests/deploy`,
  and `git ls-files --eol deploy/loop2-deploy` showing `i/lf w/lf` with `eol=lf`. Unchecked here:
  `shellcheck` (not installed) and real `flock` serialization (Git Bash has no `flock`; a stub
  proves nothing about locking).
- **Depends on:** Slice 2 · decisions "Where does the MVP run?", "How does a change reach the
  server?", settlement rows 2 and 4 · `loop2-container-isolation/1` · the part-map change

