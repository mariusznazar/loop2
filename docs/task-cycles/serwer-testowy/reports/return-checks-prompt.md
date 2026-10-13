# Dispatch — return step: invariant checks (serwer-testowy)

You are a fresh agent writing invariant checks for two invariants another agent wrote; other agents
wrote the code they cover — you write neither (WAY-69). Questions go back in your report, never to
the human. Worktree `C:/Storage/repos/loop2-serwer-testowy`, branch `task/serwer-testowy`; commit
there with explicit paths, English messages. Nothing on any server, Cloudflare or GitHub; never a
server name, SSH port, SSH user or IPv6 address.

Read first: `.the-way/elements/invariants/skill/SKILL.md` and the files it names about checks;
WAY-69, WAY-08, WAY-48 in `.the-way/foundations/decisions.md`; in `foundations/invariants.md` the
entries `loop2-deploy-trigger-input/1` and `loop2-deploy-keeps-running/1` (sentences, Method, Rests
on); the decisions they derive from in `foundations/decisions.md`; the spec
`docs/task-cycles/serwer-testowy/spec.md` § 5 and its error table (the description of the script,
not its reasoning). You may run the script `deploy/loop2-deploy` as a black box; do not read its
implementation reasoning beyond what the check needs to drive it (inputs, exit codes, observable
calls). Existing harness you may reuse: `tests/deploy/deploy_script_support.py` (a temporary copy
with only the marked constants block replaced, asserted byte-identical outside it; recording stubs
for docker, curl, flock, df with a resolution guard; a temporary Git repository standing in for
GitHub). Git's bash: `C:/Program Files/Git/bin/bash.exe`; when bash is missing the check reports
unchecked (skip), never pass.

Write, under `tests/invariants/` (the invariant gate runs that directory):
1. `test_loop2_deploy_trigger_input.py` — drives the forced-command path with crafted inputs
   written out as literals (non-hex, 39/41 chars, uppercase, whitespace, newline, option-like,
   shell metacharacters, two words, empty, both inputs at once) and asserts refusal before any
   fetch, build or container change (no recorded docker call, no git fetch); a commit not on `main`
   (only on another branch) is refused; an ancestor of `main` passes the input stage.
2. `test_loop2_deploy_keeps_running.py` — for each stop before the new container starts (input,
   commit, lock, resource gate, fetch, checkout, type check or build), asserts the script never
   issued a command that stops, removes or replaces the running loop2 container (no `up`, `down`,
   `rm`, `stop`, `kill`, `restart` of it).
Each test cites its invariant (`# invariant: <id>/<version>`); expected values written as literals.
Add the files to the part map only if the part-map guard reports them unclaimed — if so, report it
instead of editing `foundations/` (the entries author edits the map).

Run `python -B .the-way/gate/run_tests.py tests/invariants` (never at the same time as anything
else using port 3000) and the invariants format guard. Show your own control: a scratch copy of the
script with its input check weakened fails test 1, and one that switches before building fails
test 2. Report to `docs/task-cycles/serwer-testowy/reports/return-checks.md`. Return under 120 words.
