PASS ee6a941350cefec70437f9a57a988c798925d599

# Review of the whole change — testy-bez-portu-3000

- Range: `db3253c826d6b20a349e7b175fd30d0910051c15..ee6a941350cefec70437f9a57a988c798925d599`
  (`b54869d` pin move, `254eec5` tests on a free port, `ee6a941` default-address test and
  foundation entries). `git rev-parse HEAD` in the worktree = `ee6a941350cefec70437f9a57a988c798925d599`,
  the head given. Worktree clean before and after the review (`git status --short` empty).
- Pinned the-way: `git ls-files --stage -- .the-way` = `git -C .the-way rev-parse HEAD` =
  `86b78ad780aa8e97a9619fb7277cb64da50fb74a`; method read from `.the-way/task-cycle/review/SKILL.md`.
- Route: one author without a plan; this review is the only one the change gets.
- Trust boundary: none touched — `src/server/**` is unchanged in the range (`git diff --stat`);
  no file the part map names as a trust boundary is in the diff. Irreversible operation: none.

Counts: blocking 0 (Critical 0, Important 0); Minor 3; out of scope 0.

## Findings

### Critical

None.

### Important

None.

### Minor

**M1 — the occupied-path pattern of the default-address test accepts a port that only begins with
3000.** `tests/invariants/test_account_server_default_address.py:33`:
`OCCUPIED_DEFAULT = re.compile(r"127\.0\.0\.1:3000.*EADDRINUSE|EADDRINUSE.*127\.0\.0\.1:3000")`
has no digit boundary after `3000`, while the shared helper
(`tests/invariants/loop2_invariant_support.py:292`, `(?!\d)`) and the Node occupied test
(`tests/startup.test.mjs`, `` String.raw`127\.0\.0\.1:${port}(?!\d)` ``) both have one. If the
default port were changed to 30000–30009, 30001 and the like, and that port happened to be
occupied, the test would pass through its occupied path although the server no longer takes
127.0.0.1:3000. Evidence: `python -B -c` matching the server's own message form
`Loop could not start on 127.0.0.1:30001: EADDRINUSE listen EADDRINUSE: address already in use
127.0.0.1:30001` against the pattern → `True`. Narrow: it needs both the changed default and that
port occupied; the ready path (`DEFAULT_READY_LINE`, anchored with `$`) has no such gap. Fix: add
`(?!\d)` after each `3000`.

**M2 — D-49's meaning sentence kept for the request leaves out D-49's third binding sentence.**
`foundations/decisions.md:936` ends: "A test giving `LOOP2_LISTEN_PORT` a value the server is to
reject before it listens, and a server started inside a container a test runs, fall outside this
rule." Row 1 of *Settlements to record* does not name these two carve-outs. The Polish meaning
sentence the author keeps for the request (author report § 3, row "Row 1 (decision)") reads only
"Każdy start serwera loop2 przez test loop2 na komputerze, który uruchamia testy, podaje serwerowi
… nigdy stały port; jedynym wyjątkiem jest jeden test domyślnego adresu …" — the human approving the
request through the meaning sentences (WAY-114) would not see the carve-outs.
My judgment of the carve-outs themselves: they keep row 1's meaning rather than change it, so they
are no blocking fidelity finding. Row 1 is about the port the server is given to listen on (its
*Need* is a clash on one computer; its "would otherwise guess" column speaks of "wybór portu"). The
five invalid-value tests (`tests/startup.test.mjs:92`, values `"0"`, `"65536"`, `"abc"`, `"3000x"`,
`""`) give a value the server rejects before it binds anything. The container tests give no port at
all (`grep LOOP2_LISTEN` over `test_loop2_one_serving_process_container.py`,
`test_loop2_container_icons.py`: no hit; `tests/deploy/test_loop2_image_icons.py:50` reads the
port inside the container, set by `Dockerfile:20`) and publish none on the host. Without the
sentence, D-49's own *Verification* ("violates: a test that starts the server with … another port
written into the test") could be read against the invalid-value tests, which the task leaves as they
are. Still, it is an interpretation the author flagged as a concern (author report § 7); it belongs
in front of the human. Fix: the request's meaning sentence for D-49 names the two carve-outs, and
the author's question of § 7 goes with it.

**M3 — README says every server-starting test gets a free port.** `README.md:69`: "Każdy test,
który uruchamia serwer, podaje mu w `LOOP2_LISTEN_PORT` wolny port wskazany przez system". The
invalid-value start tests give fixed rejected values, and the container tests give no port, as
D-49 itself says (M2). To do 4 is met (no mention of "zajęty port 3000"; the start tests are described
by the new port choice), and the sentence is true of every test that makes the server listen on the
host. The wording is broader than the decision it describes. Fix, if wanted: "Każdy test, w którym
serwer nasłuchuje na tym komputerze, …".

## Against the task

| Item | Verdict | Evidence |
|---|---|---|
| To do 1 — `npm start` tests on a system-named free port in `LOOP2_LISTEN_PORT` | met | `Server._start` (`loop2_invariant_support.py:282-311`) takes `free_port()` per start and sets `LOOP2_LISTEN_HOST`/`LOOP2_LISTEN_PORT`; all four callers (`test_loop2_api_error_route.py`, `test_loop2_one_serving_process.py`, `test_account_server_express_http.py`, `test_account_server_occupied_address.py`) use `server.request`/`server.port`; `grep` of `tests/` for `support.PORT`, `support.request`, `port_in_use()`, `PORT_WAIT`, `wait_for_free_port`: no hit |
| To do 2 — both occupied-address tests on a system-named port | met | Node test binds the blocker on port 0 and passes it; Python test binds port 0 and passes it in the environment (diff) |
| To do 3 — one default-address test, two accepted outcomes, server closed at once | met | `test_account_server_default_address.py`; passes with 3000 free and held; kills four mutants (checks below) |
| To do 4 — README | met | `README.md:69` (see M3 for wording) |
| To do 5 — pin to `86b78ad` by the installer, first commit | met | `b54869d` is the first commit of the range and holds the gitlink alone; `.runs/install-preview.log` (MOVE, KEEP, REPLACE) and `.runs/install-apply.log` ("Installed."); the-way diff `1bc9a16..86b78ad` changes no skill frontmatter (`project-level/plan/skill/SKILL.md` diff starts at line 56), so the entry points read the same; `86b78ad` = `origin/foundations` head, merge of PR #40. "`npm test` przechodzi na nowym przypięciu": see the unchecked part below |
| Acceptance 1 — `npm test` passes with 127.0.0.1:3000 held throughout | met for every check that runs here | author's `reports/01-author-acceptance1-held-3000.log`; my runs: Node start tests and the five server-starting invariant modules with 3000 held, all pass |
| Acceptance 2 — two `npm test` runs at once in two worktrees | met for every check that runs here | author's `reports/01-author-acceptance2-run-{a,b}.log`; my runs: two Node start-test runs and two runs of the five server-starting invariant modules at once, all pass |
| Settlement row 1 → D-49 | met | `foundations/decisions.md:934-947`; meaning held (M2 on its presentation); *Rejected* matches options B, C of question 1 and A of question 2; *Origin* names the task document, which exists at `Notes/Projects/(P) Loop/_zadania/testy_bez_portu_3000_loop2.md` |
| Settlement row 2 → `account-server-default-address` | met | `foundations/invariants.md:490-498`; sentence says what row 2 says; *Derives from* `recovered from code —` fits a behaviour the human chose from existing code (`elements/invariants/template.md:132-135`); checked by the new test with its `invariant:` line |
| Changed citation of `account-server-occupied-address` | met | `foundations/invariants.md:101` quotes the new test title word for word |
| Part map | met | `account-server` *Files* gains the new test; `foundation_check.py` 0 errors |
| Out of scope respected | yes | `src/server/main.ts` and README's default-address sentence (`README.md:15`) unchanged |

Changed invariant tests (WAY-03): `tests/invariants/test_account_server_occupied_address.py`,
`tests/invariants/test_loop2_api_error_route.py`, `tests/invariants/test_loop2_one_serving_process.py`,
`tests/invariants/test_account_server_express_http.py` (one call), and the new
`tests/invariants/test_account_server_default_address.py`. Each still checks its sentence: the
substitutions move the address, not what is asserted; the occupied-address test's blocked launch now
rejects any readiness line (`^Loop: `), stricter than before.

Shared helper behaviour I checked by reading: readiness is now the server's own line for its address
(not "anything accepts on the port", which a foreign holder would have satisfied); the retry fires
only on an exit whose stderr since this attempt names `EADDRINUSE` and the attempt's own address,
at most two starts; any other exit or timeout raises; `stop()` waits for release of the server's own
port. The four new quality tests cover each of these branches.

Author's own-work check (§ 5): it names acceptance 1 and 2 — that nothing still depends on 3000 or
collides — which is where this change is weakest; its `grep` plus the full runs would catch a
remaining fixed port. I repeated the `grep` and ran the parallel and held-port checks myself.

## Declined to judge

- `tests/startup.test.mjs:57`, "listens on the address given by LOOP2_LISTEN_HOST and
  LOOP2_LISTEN_PORT": takes `freePort()` with no retry, so the short window of D-49's rationale
  stays open for this one test — the test predates the task, is not in its To do, and D-49 makes the
  retry a rationale, not a binding sentence.
- `tests/invariants/test_loop2_one_serving_process.py:109-140`, `tcp_listeners()` on Windows through
  `Get-NetTCPConnection`, which returns no objects on this machine — unchanged by the range and
  failing on the base as well (`reports/00-base-one-process-rerun.log`).
- The blocked launch of `test_account_server_occupied_address.py` asserts a non-zero exit and no
  readiness line but not that the failure names `EADDRINUSE` — as before the change, and as the
  invariant's sentence requires no more.

## Checks run

All from the worktree root unless named; outputs in the scratchpad
`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\80b89b91-ee87-4d2e-9dc8-c394d3af8d4a\scratchpad\`.

| Check | Command / method | Exit / result |
|---|---|---|
| Head and pin | `git rev-parse HEAD`; `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | `ee6a941…`; both `86b78ad…` |
| Whitespace | `git diff --check db3253c..HEAD` | 0 |
| Ruff | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-cache tests/` | 0, all checks passed |
| ESLint | `node_modules/.bin/eslint --max-warnings 0 tests/startup.test.mjs` | 0 |
| Prettier | `node_modules/.bin/prettier --check --no-config --no-editorconfig tests/startup.test.mjs` | 0 |
| Helper quality tests | `python -B -m unittest test_invariant_support` (cwd `tests/quality`) | 0, 13 tests OK |
| Node start tests, 3000 free | `node --test tests/startup.test.mjs` (existing `dist/`, built from the unchanged `src/server`) | 0, 7 pass |
| Node start tests, 3000 held | same, with a Python listener on 127.0.0.1:3000 (`hold3000.py`) | 0, 7 pass |
| Node start tests, two at once | two runs of the same command started together | 0 / 0, 7 pass each |
| Server-starting invariant tests, 3000 held | `python -B run_inv.py --netstat test_loop2_one_serving_process test_account_server_express_http test_loop2_api_error_route test_account_server_occupied_address test_account_server_default_address` (scratch runner; `--netstat` swaps `tcp_listeners` for a `netstat -ano` reader, the code under test unchanged) | 0, 16 tests OK; 3000 still held by the listener at the end (`netstat`) |
| Same, two runs at once, 3000 free | two runs of the same command started together | 0 / 0, 16 tests OK each |
| Default-address test, 3000 free (ready path) | `python -B run_inv.py test_account_server_default_address` | 0, OK |
| Default-address test against mutants (temp built copy only) | `python -B mutate.py`: edits `dist/server/main.js` of the test's own temporary copy | unmutated: PASS free / PASS held; default port 3001: FAIL / FAIL; default host 0.0.0.0: FAIL / FAIL; error handler exit code 0: PASS free (no error path) / FAIL held — every mutant that breaks the invariant is killed |
| M1 pattern | `python -B -c` matching a `127.0.0.1:30001` EADDRINUSE message against `OCCUPIED_DEFAULT` | `True` |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0, 0 errors |
| Agent-workflow tests (pin) | `python -B -m unittest discover -p "test_*.py"` (cwd `tests/agent_workflow`) | 0, 5 tests OK |
| Author's full runs | read `reports/01-author-npm-test.log`, `…acceptance1-held-3000.log`, `…acceptance2-run-{a,b}.log` against `reports/00-base-gate.log` | each: Node 173 pass / 0 fail; agent_workflow 5 OK; deploy 64 OK (1 skip); quality 31 OK (base 27: four new); invariants 152 run (base 151: one new), the one error `test_loop2_one_serving_process` setUpClass, as on the base |

**Left unchecked.** `npm test` itself was not run by me (the full suite is the cycle's run). On this
machine it exits 1 before and after the change: `tests/invariants/test_loop2_one_serving_process.py`
errors in setUpClass at `Get-NetTCPConnection`, and the chain therefore never reaches
`foundation_check.py`, which passes on its own. With a `netstat`-based listener reader swapped in by
the scratch runner, that test's assertions — including the changed ones on `self.server.port` —
ran and passed, also with 3000 held and with a second run at once; what stays unchecked is the
`Get-NetTCPConnection` reading itself, which the range does not change. So To do 5's "`npm test`
przechodzi" and both acceptance criteria are not shown as a passing `npm test` on this machine.

## Reaches beyond the dispatch

- Foundation, selected by `way_of_working.md` "Reading the foundation" for the parts account-server,
  build-tools, agent-workflow, product-foundation (deployment through D-49's *Scope*): decisions
  D-01, D-02, D-05, D-06, D-07, D-37 and D-49 read whole; D-28–D-33 by their guideline rules;
  invariants `account-server-express-http`, `loop2-api-error-route`, `loop2-one-serving-process`,
  `account-server-occupied-address`, `account-server-default-address` read whole; the list of
  invariants whose *Part* names account-server, build-tools or `every`; the part map whole; the
  product glossary's headings and the entries `deployment`, `test server`, `public address`.
- Guidelines by `product-guidelines/reading.md`: `guidelines/coding.md` whole (applies to every
  touched code part); the headers of the four kind files — no kind row matches (no
  `src/server/` file changed).
- the-way at the pin: `task-cycle/skill/SKILL.md:228-252` (the foundation step, WAY-134, WAY-30) to
  judge D-49 against row 1; `elements/invariants/template.md:119-140` and
  `elements/decisions/template.md` *Origin* lines for the entries' forms; `git -C .the-way diff
  --stat 1bc9a16 86b78ad` and the plan-project skill's diff head, for the entry points.
- Code beyond the diff: `src/server/main.ts` (messages the tests match), `package.json` scripts,
  `built_copy`, `kill_tree`, `popen`, `read_text` of the helper, `tcp_listeners`/`_processes` of
  `test_loop2_one_serving_process.py`, `tests/startup.test.mjs:55-112`, `grep` of the container
  tests and `Dockerfile` for `LOOP2_LISTEN`.
- The vault: only the existence of the task document D-49's *Origin* names (directory listing);
  not read.
