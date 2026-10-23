# Author report — testy-bez-portu-3000

**Status:** done with concerns (see *Concerns*)

## Commits (branch `task/testy-bez-portu-3000`, base `db3253c`)

| Commit | Subject |
|---|---|
| `b54869d` | chore: move the-way pin to 86b78ad (plan check reports tasks that realize one projected entry with no order between them) |
| `254eec5` | test: start the server of loop2's tests on a port the system names free instead of 3000 |
| `ee6a941` | test: check that the server started without listen variables takes 127.0.0.1:3000, and record D-49 |

## Files changed (`git diff --numstat db3253c HEAD`, added / removed)

| File | + | − |
|---|---|---|
| `.the-way` (gitlink 1bc9a16 → 86b78ad) | 1 | 1 |
| `README.md` | 1 | 1 |
| `foundations/decisions.md` | 15 | 0 |
| `foundations/invariants.md` | 11 | 1 |
| `foundations/part_map.md` | 1 | 0 |
| `tests/invariants/loop2_invariant_support.py` | 78 | 41 |
| `tests/invariants/test_account_server_default_address.py` (new) | 81 | 0 |
| `tests/invariants/test_account_server_express_http.py` | 1 | 1 |
| `tests/invariants/test_account_server_occupied_address.py` | 20 | 13 |
| `tests/invariants/test_loop2_api_error_route.py` | 4 | 3 |
| `tests/invariants/test_loop2_one_serving_process.py` | 15 | 22 |
| `tests/quality/test_invariant_support.py` | 66 | 7 |
| `tests/startup.test.mjs` | 27 | 31 |

`src/server/**` is unchanged (it was broken for a moment in the worktree only, for the failing run
of the new invariant's test, and restored with `git checkout -- src/server/main.ts` before any
commit). The trust-boundary answer "no" stands.

## 1. Pin move (To do 5) — commit `b54869d`

- Cloned `https://github.com/mariusznazar/the-way.git` into `.runs/the-way-86b78ad` (ignored, not
  committed), checked out `86b78ad780aa8e97a9619fb7277cb64da50fb74a`.
- Preview: `python -B .runs/the-way-86b78ad/installation/install.py C:/Storage/repos/loop2-wt/testy-bez-portu-3000`
  — exit 0 (`.runs/install-preview.log`): MOVE `.the-way` 1bc9a16 → 86b78ad; KEEP every foundation
  file, `AGENTS.md`, `.gitignore`, `CLAUDE.md`; REPLACE the 38 skill entry points.
- Apply: same with `--apply`, answered `y` — exit 0 (`.runs/install-apply.log`), "Installed".
- The 38 entry points the installer rewrote are byte-identical to `HEAD` (`git diff --exit-code`
  exit 0; `cmp` against `git show HEAD:` on a sample); `git status` listed them as modified only
  because the installer wrote LF where checkout with `core.autocrlf=true` had written CRLF.
  `git checkout -- .claude/skills .agents/skills` restored the checkout state; nothing reads
  differently, so the commit holds the gitlink alone, as `installation/README.md` § "Moving the pin"
  gives for that case.
- After the commit: `git -C .the-way rev-parse HEAD` = `git ls-files --stage -- .the-way` =
  `86b78ad780aa8e97a9619fb7277cb64da50fb74a`.
- Commit body follows `acd2da3`'s form (it carries no `Claude-Session` trailer: none was given to me).

## 2. The test change (To do 1–4)

- **Shared helper** `tests/invariants/loop2_invariant_support.py`: `PORT = 3000` is gone. New
  `free_port()` binds port 0 on 127.0.0.1 and returns the port the system named. `Server` now takes
  a free port at each start, gives it to `npm start` in `LOOP2_LISTEN_HOST=127.0.0.1` and
  `LOOP2_LISTEN_PORT`, keeps it in `server.port`, and counts the server ready when its stdout holds
  the readiness line `Loop: http://127.0.0.1:<port>` (no longer when anything accepts a connection on
  the port — a foreign process that took the port would otherwise pass for the server). A start that
  exits with `EADDRINUSE … 127.0.0.1:<port>` runs once more on another free port
  (`START_ATTEMPTS = 2`); any other early exit or timeout fails as before. `port_in_use(port)` takes
  the port; `request()` became `Server.request()`, aimed at the server's own port; `stop()` waits for
  release of the server's own port. The "port already in use before the server starts" refusal is
  gone (a free port makes it meaningless).
- **Callers**: `test_loop2_api_error_route.py`, `test_loop2_one_serving_process.py`,
  `test_account_server_express_http.py` use `server.request(...)`; docstrings no longer say
  127.0.0.1:3000. `test_loop2_one_serving_process.py` drops `PORT_WAIT` (the 300 s wait for port 3000)
  and `wait_for_free_port()`, and compares listeners with `self.server.port`.
- **Occupied address** (To do 2): `tests/startup.test.mjs`' first test now binds a blocker on port 0,
  gives that port in `LOOP2_LISTEN_HOST`/`LOOP2_LISTEN_PORT`, and asserts a non-zero exit, stderr
  naming `127.0.0.1:<port>` and `EADDRINUSE`, and no `Loop: http:` line; its title is now "exits with
  an error instead of reporting ready when its listening port is occupied". `entryPoint` and
  `freePort()` moved above it (shared by the file). `test_account_server_occupied_address.py`: both
  control launches go through `Server` (free port); the blocked launch binds port 0, gives the port
  in the environment, and asserts no readiness line at all (`^Loop: `, stricter than before).
- **Default address** (To do 3): new `tests/invariants/test_account_server_default_address.py`,
  `# invariant: account-server-default-address`. It runs the built copy's `dist/server/main.js` by
  `node` with `LOOP2_LISTEN_HOST`/`LOOP2_LISTEN_PORT` removed from the environment and passes iff
  either stdout shows `Loop: http://127.0.0.1:3000` (then it kills the server at once) or the process
  exits non-zero, before any readiness line, with stderr naming `127.0.0.1:3000` and `EADDRINUSE`.
  A readiness line for another address, exit 0, another message, or neither within 15 s fail.
- **README** (To do 4): the `npm test` paragraph speaks of "testy startu serwera", says every test
  starting the server gives it a free port in `LOOP2_LISTEN_PORT` (so two runs do not collide and
  3000 may be held), and describes the one default-address test. The default-address sentence of the
  start section is untouched (Out of scope).
- **Quality tests** `tests/quality/test_invariant_support.py`: stand-in children now print the
  readiness line from their own `LOOP2_LISTEN_HOST`/`LOOP2_LISTEN_PORT`; the hand-built `Server`
  objects set `port = None`; four new tests: the free port is given on 127.0.0.1 (`free_port`
  patched to 50123); a start whose port was taken runs once more on another port (50001 → 50002);
  a port taken twice fails without a third start; an exit for another reason is not started again.

## 3. Foundation step

Each writer's search of the whole foundation (WAY-33) ran once: `grep` over `foundations/*.md` for
`port`, `ports`, `3000`, `LOOP2_LISTEN*`, `free port`, `listening address`, `readiness`,
`default address`, `parallel`, `same machine`, plus the full list of decision questions and
invariant identifiers. No entry states either settlement; the only neighbour is
`account-server-occupied-address` (the citation below). No glossary term is used in another meaning;
no new term needed. `foundation_check.py` after the writes: 0 errors.

| Row / item | Entry | Meaning (pl) |
|---|---|---|
| Row 1 (decision) | **D-49** — Which port does a loop2 test give the server it starts? (`foundations/decisions.md`, end) | Każdy start serwera loop2 przez test loop2 na komputerze, który uruchamia testy, podaje serwerowi w `LOOP2_LISTEN_PORT` port wskazany przez system jako wolny przy tym starcie, nigdy stały port; jedynym wyjątkiem jest jeden test domyślnego adresu, który uruchamia serwer bez `LOOP2_LISTEN_HOST` i `LOOP2_LISTEN_PORT`. |
| Row 2 (invariant, method `test`) | **account-server-default-address** (`foundations/invariants.md`, last entry) — checked by `tests/invariants/test_account_server_default_address.py` | Serwer uruchomiony bez `LOOP2_LISTEN_HOST` i `LOOP2_LISTEN_PORT` albo zgłasza gotowość linią `Loop: http://127.0.0.1:3000`, albo kończy się kodem niezerowym z komunikatem wskazującym zajęty adres `127.0.0.1:3000`. |
| Citation | **account-server-occupied-address**, *Derives from*: the quoted test title is now "exits with an error instead of reporting ready when its listening port is occupied" (sentence and other fields unchanged) | Cytat w pochodzeniu niezmiennika wskazuje test startu pod jego nowym tytułem; treść niezmiennika się nie zmienia. |
| Part map | `account-server` *Files* gains `tests/invariants/test_account_server_default_address.py` | Nowy test domyślnego adresu należy do części `account-server`. |

D-49 fields: *Scope* account-server, build-tools, deployment; *Based on* none (the reason is the
decider's motive, no outside source); *Relations* none; *Verification* an agent compares (complies:
a new test that starts the server through the shared helper; violates: a fixed port written in a
test, or a second test without the listen variables) — no invariant derives from it;
*Origin* `testy_bez_portu_3000_loop2.md` in the vault, § Questions to settle, the two questions;
*Rejected* the task's options B and C of question 1 and A of question 2.

account-server-default-address fields: *Rests on* none; *Derives from* `recovered from code —
src/server/main.ts`, the defaults and the `listening`/`error` handlers (Mariusz chose the row);
*Part* account-server · build-tools (as account-server-occupied-address); *Violated* no. D-49 does
not name it in *Verification*: the invariant is about the server, not about the tests.

Invariant tests altered by this change (WAY-03): `test_account_server_occupied_address.py`,
`test_loop2_api_error_route.py`, `test_loop2_one_serving_process.py`,
`test_account_server_express_http.py` (one call changed), and the new
`test_account_server_default_address.py`.

## 4. Checks

| Check | Command | Exit | Evidence |
|---|---|---|---|
| New invariant's test, failing first (default port broken to 3001 in `src/server/main.ts`, worktree only) | `python -B -m unittest -v test_account_server_default_address` (cwd `tests/invariants`) | 1 | `.runs/default-address-fail.log`: "Regex didn't match … not found in 'Loop: http://127.0.0.1:3001'" — the expected assertion |
| Same, code restored, 3000 free (ready path) | same | 0 | `.runs/default-address-pass-free.log` |
| Same, 127.0.0.1:3000 held by a Python listener (occupied path) | same | 0 | `.runs/default-address-pass-occupied.log`; by hand `node dist/server/main.js` with the listener → "Loop could not start on 127.0.0.1:3000: EADDRINUSE …", exit 1 |
| Helper's quality tests | `python -B -m unittest -v test_invariant_support` (cwd `tests/quality`) | 0 | 13 tests OK, `.runs/q-support.log` |
| Ruff on `tests/` | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa tests/` | 0 | All checks passed |
| ESLint / Prettier on `tests/startup.test.mjs` | `eslint --max-warnings 0 …`, `prettier --check --no-config --no-editorconfig …` | 0 / 0 | |
| Node start tests | `npm run build` then `node --test tests/startup.test.mjs` | 0 / 0 | 7 pass, `.runs/startup.log` |
| Server-starting invariant tests | `python -B -m unittest -v test_account_server_express_http test_loop2_api_error_route test_account_server_occupied_address test_account_server_default_address test_loop2_one_serving_process` | 1 | 10 ok; the only error is `test_loop2_one_serving_process` setUpClass at `tcp_listeners()` (`Get-NetTCPConnection` returns no objects), *after* `Server` started on a free port and every request was answered (`.runs/server-tests.log`) |
| **`npm test`, final head `ee6a941`** | `npm test` | **1** | `reports/01-author-npm-test.log`, 7 min 31 s: build OK; Node 173 pass / 0 fail; gate 252 tests in 4 directories — tests/agent_workflow 5 OK, tests/deploy 64 OK (1 skip), tests/quality 31 OK, tests/invariants 152 run, **1 error**: `test_loop2_one_serving_process` setUpClass at the listener query, as on the base. The chain stops there, so `foundation_check.py` is not reached by it. |
| `foundation_check.py` on its own, final head | `python -B .the-way/elements/common/foundation_check.py` | 0 | `reports/01-author-foundation-check.log`: 0 errors |
| Acceptance 1 — 127.0.0.1:3000 held by another process for the whole run | Python listener on 127.0.0.1:3000 started before, stopped after; `npm test` | 1 | `reports/01-author-acceptance1-held-3000.log`: the same result as the free run — Node 173 pass / 0 fail; agent_workflow 5 OK, deploy 64 OK, quality 31 OK, invariants 152 run with the one listener-query error only; the default-address test passed through its occupied path; the listener still held 3000 at the end (`3000 still held at end: True`). |
| Acceptance 2 — two `npm test` runs at once in two worktrees | scratch worktree `git worktree add --detach .runs/wt-parallel HEAD` (at `ee6a941`), `git submodule update --init -- .the-way` (86b78ad), `npm ci`, its own `.runs/quality-venv` (ruff 0.17.1, ShellCheck 0.11.0); both `npm test` started together at 22:24:42; scratch removed afterwards with `git worktree remove --force` (it held ignored `node_modules` and venv) | 1 / 1 | `reports/01-author-acceptance2-run-a.log`, `…-run-b.log`, both ended 22:31:30: in each, Node 173 pass / 0 fail; agent_workflow 5 OK, deploy 64 OK, quality 31 OK; invariants 152 run with the one listener-query error only. No port clash in either. |

All three `npm test` runs (final head, acceptance 1, acceptance 2 ×2) exit 1, and in each the only
failure is the base's own `test_loop2_one_serving_process` listener query — the result the handoff
expects for this machine. So acceptance 1 and 2 hold for everything `npm test` checks here except
that one test. `foundation_check.py`, which the chain does not reach, passes on its own.

**Unchecked on this machine:** `tests/invariants/test_loop2_one_serving_process.py` — its listener
query (`Get-NetTCPConnection -State Listen`) returns no objects here while `netstat` lists
listeners; the machine's, not the task's, and the query was left as it is (outside the task).
What its run shows: it builds, starts the server on a free port through `Server`, gets every
answer, and fails only at the listener query. Its assertions on `self.server.port` never ran.

## 5. Own-work check (section 3)

- Requirement most likely not met: acceptance 1 and 2 — that nothing in `npm test` still depends on
  port 3000 or collides between runs. Checks: (a) `grep` of `tests/` for `3000`, `support.PORT`,
  `support.request`, `port_in_use()` — remaining hits are only the default-address test, the
  invalid-value list (`"3000x"`), sample data in `test_process_observation.py` and unrelated numbers
  (timestamps, `passed(3000)`); (b) the acceptance runs above.

## 6. Choices made (with the way rejected and its cost if wrong)

1. **Where the default-address test lives:** a new Python invariant test in `tests/invariants/`,
   following the repository's form (every `test` invariant of account-server has its file there),
   with a part-map line. Rejected: a Node test in `tests/startup.test.mjs` (no new file, but the only
   invariant test outside `tests/invariants/`). Cost if wrong: moving one small test.
2. **One retry:** in the shared `Server` helper only, on an exit naming `EADDRINUSE` for its own
   address, with a new free port; at most two starts. Not added to the Node test "listens on the
   address given by LOOP2_LISTEN_HOST and LOOP2_LISTEN_PORT", which already took `freePort()` and is
   not in the task's To do. Cost if wrong: that Node test can still, very rarely, lose its port in
   the window.
3. **How the helper hands out the port:** bind port 0, read, close, give it in the environment; the
   port is a property of the `Server` object and `request` became its method. Readiness = the
   server's own readiness line for that address. Rejected: keeping a module-level `PORT` set per
   start (global state across test classes). Cost if wrong: a later helper caller reads `server.port`.
4. **Occupied-address tests:** the blocker binds port 0 directly, so there is no window at all
   between the system naming the port and the test holding it.
5. **D-49 Scope** names deployment besides account-server and build-tools, so that a future
   deployment test starting the server on the host finds the decision.

## 7. Concerns

- **D-49's third binding sentence names two kinds of start outside the rule that row 1 does not
  name.** Row 1 reads: "Test loop2, który uruchamia proces serwera, podaje mu w `LOOP2_LISTEN_PORT`
  wolny port …; wyjątkiem jest jeden test domyślnego adresu". The code holds two kinds of start
  that keep no free port and that the task does not change: the five tests of
  `tests/startup.test.mjs` "rejects LOOP2_LISTEN_PORT=… without a readiness line" (values `"0"`,
  `"65536"`, `"abc"`, `"3000x"`, `""`, which the server rejects before it listens), and the container
  tests (`test_loop2_one_serving_process_container.py`, `test_loop2_container_icons.py`,
  `tests/deploy/test_loop2_image_icons.py`), whose server listens on the Dockerfile's
  `LOOP2_LISTEN_PORT=3000` inside the container and publishes no host port (as the task's *Context*
  says). I wrote D-49 so that these fall outside it, and the first sentence says "on the machine
  that runs the tests". I read this as the row's own meaning — its *Need* is a port clash on one
  computer, and neither kind holds a host port — rather than another meaning, so I did not return
  `blocked`. If the orchestrator or the human reads row 1 as binding these starts too, the code
  shows exceptions the row does not allow, and the question for the human is: "Do the
  invalid-value start tests and the container tests fall outside D-49 (as written), or must they
  change?" Recommended answer: outside, as written.

## 8. Reaches beyond the handoff

- `tests/invariants/test_account_server_express_http.py` — read in part and changed (one call):
  it is the fourth caller of `Server`/`request`, which the handoff did not list. Invariant
  `account-server-express-http` (`foundations/invariants.md:25-34`) read whole for that reason.
- `foundations/decisions.md` D-37 (`:754-768`) and D-45 (`:874-888`) read whole — found by the
  foundation search (D-37 mentions the listening port; D-45 as the form of a recent decision with
  *Based on* none). `loop2-distinct-address` (`invariants.md:115-124`) read in the same search.
- `tests/deploy/test_loop2_image_icons.py` (head) and `grep` of
  `test_loop2_one_serving_process_container.py`, `Dockerfile` — to see how container tests choose
  their port.
- `package.json` scripts (what `npm test` runs); `.the-way/gate/` listing; part of
  `.the-way/elements/common/foundation_check.py` (how `invariant:` citations are found).
- the-way's skill and template files the writers' skills name: `elements/{decisions,invariants,part-map}/{skill/SKILL.md,template.md,examples.md}`,
  `elements/common/{way_of_working.md,rules.md}`, examples WAY-03, `instruction-file-imports`,
  `gate-exit-code`, `script-imports` in `.the-way/foundations/`.
- The vault path of the task document was found by `Glob` only (for D-49's *Origin*); the file was
  not read.

## 9. Problems observed

- The installer writes entry points with LF; with `core.autocrlf=true` git then lists them as
  modified with an empty diff. Observed, not a defect of the change.
- The Bash tool collapsed `\\` in a heredoc I used to write `tests/startup.test.mjs` (a template
  literal came out as `` `127\.0\.0\.1:${port}\b` ``); found by inspecting the file, fixed with
  `String.raw` before any commit.
