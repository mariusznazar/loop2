FAIL 14fae580c59113eabb91a78ec92d8f5ef3b78731

# Review of the whole change — task `lokalny-start`

Range `54b2b7831cfb08c8e2d3eda8bfaf87b9a4205470..14fae58` (b2b7f5b, 91d0c14, 14fae58). `git rev-parse HEAD` is 14fae580c59113eabb91a78ec92d8f5ef3b78731, the head given. One author, no plan and no spec, so no slice applies. This is the only review the change gets.

Blocking 1, Minor 4, out of scope 4 (the lines of *Declined to judge*).

## Findings

### Important (blocking)

**1. D-252 says an agent reads motion from a stream of frames, and on the way through Playwright MCP the change gives it no stream, so the entry is recorded as true in a place where it is not.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\foundations\decisions.md:5089` (binding sentence), `:5108` (*Rationale*), against `C:\Storage\repos\loop2-wt\lokalny-start\.claude\skills\loop2-play\SKILL.md:93`–`:94` and its copy under `.agents`.
- **What is wrong:** the entry reads: "An agent operates the running game in a real browser with Playwright CLI, and with Playwright MCP where the CLI fails, and reads motion from a stream of frames." Reading motion has no limit to the CLI. The skill says: "For images use `browser_take_screenshot`: the stream of frames above is the CLI's." So an agent the CLI failed, which is the case the entry's fallback exists for, has no stream. *Decisions in play* carries the premise "Kod tego zadania czyni wpis prawdziwym w całości", and by the author's own evidence it does not make it true on this way. The *Rationale* at `:5108` still says "so going back costs almost nothing".
- **Why it matters:** this is the task-mandated text, recorded word for word as To do 5 orders, and it is still a defect (section 3 of the review method). The entry goes into the foundation as binding, and a later task reading D-252 alone takes the two ways as equal for what this project needs most from them, seeing motion. The skill tells the truth, the entry does not, and nothing joins them. By WAY-263 a file of the change that fails what an entry it writes requires, or restates it differently, is Important. The author's recommendation that a fallback may lose an ability does not lower the grade.
- **Evidence:** `reports\author.md`, Concern 1: 0 frames in each of three tries through `browser_run_code_unsafe`, against frames through the CLI, "Cause not verified". The tries were on a headed Chrome on an unattended computer, so the fact itself is also unsettled: nobody knows whether MCP cannot stream or that one window did not paint. I did not repeat them: the MCP server's working directory is the main checkout, which the handoff forbids touching.
- **Ways to close it, for the orchestrator:** (a) qualify D-252 and its *Rationale* with what was measured; that changes approved wording beyond what the task carries, so by WAY-30 it is a question to the human, not the author's choice. (b) Find a stream on that way, then neither the entry nor the rationale changes. One untried candidate is CDP `Page.startScreencast` through the same `newCDPSession` the skill already uses for the certificate. Leaving the entry as it is, is a third way only if the human says so with this gap in front of them.

### Minor

**2. Concern 2 — a directory whose process number was taken over stays, and `npm run local:stop` then reports a failure that is not one.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\scripts\local-start.mjs:182`–`:189`, `:207`–`:216`, `:273`–`:286`.
- **What is wrong:** a directory counts as running while its number is alive. I planted a directory named with the process number of `explorer` in a scratch copy. `--stop` waited 10 s, printed `The local start of process 11732 did not stop.`, `Local starts stopped: 0`, and exited 1. With two real starts beside it, both stopped, and it still printed that line and exited 1. The directory and its database stayed through two starts. The skill's closing step has no word for this, and it lasts as long as the foreign process does, after a reboot perhaps for days.
- **Why Minor:** To do 2 is not met to the letter in this one case, but a new start always gets its own fresh database, so no check runs on stale data, and nothing foreign is touched. The trigger needs a hard kill or reboot plus a reused number.
- **A cheaper fix than the author's rejected one:** a start writes its HTTPS port into its directory, and liveness means that port accepts a connection (`acceptsConnections` is already there). No per-platform read.

**3. README and the skill say two starts side by side do not interfere, and in one browser they do.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\README.md:19`, `C:\Storage\repos\loop2-wt\lokalny-start\.claude\skills\loop2-play\SKILL.md:33`.
- **What is wrong:** ports and databases are apart, but the session cookie `__Host-loop2.sid` is not bound to a port. Through Playwright CLI, in one session, on two real starts: register on A then `GET /api/account` 200; register on B then 200; back on A `GET /api/account` 401. Signing in on the second start signed the first out.
- **Why Minor:** throwaway accounts and an easy recovery. To do 3 asks for a README that tells the truth about running, so the sentence wants its limit: two starts are apart in two browsers or sessions.

**4. D-253's *Rationale* opens with a sentence no source holds.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\foundations\decisions.md:5133`.
- **What is wrong:** source, `definicja_mvp2_loop2.md:1133`: "a state built by the simulation goes through the same load as any save, so a change of the save's version costs nothing here". Recorded: "an early state reached by playing goes through the same signing in and saving as a player's, so a change of the save's version costs nothing here". The subject and the reason are the author's; the end of the sentence is kept as if it followed. "the late states of the game take too long to reach by playing" also moved from the *Rationale* to *Lacks*.
- **Why Minor:** the text is true, it is not the binding part, the task left the *Rationale* of a partial entry unsaid, and task 5 rewrites it. But the author's report only says the *Rationale* "holds only what this task's part makes true" and its Polish line for the request does not show the change, so the human accepting the meaning at the merge would not see it. It should stand in the request in full.

**5. A start that fails on its server line leaves its process running.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\tests\invariants\test_local_start_access.py:143`.
- **What is wrong:** `SERVER_LINE.search(output).group(1)` runs inside `Start.__init__` with no guard. When the line does not match, `AttributeError` leaves the constructor, so neither `close()` nor the class cleanup reaches the process. Mutating `LOOP2_LISTEN_HOST` to `0.0.0.0` left process 2532 listening on every address of this computer after the run, until I stopped it, and a temporary directory beside it. D-84 and the integration recipe ask for cleanup after a failure too.
- **Also:** that mutation is caught at set-up by this error, not by `test_both_ports_listen_on_this_computer_alone`, because the regular expression holds `127.0.0.1`. So the author's table, which credits "the listening case" for `LOOP2_LISTEN_HOST`, is inaccurate for the server's port. The defect is still caught, by an error and not by an assertion.

## Declined to judge

- A local program can skip the proxy: `X-Forwarded-Proto: https` sent straight to the server's port turned `GET /api/account` from 403 into 401. D-110 trusts a loopback peer and row 4 of *Settlements* speaks of a browser, whose cross-site script would need a preflight the server does not answer (by reading, not run). The data is throwaway. Outside the task.
- `.playwright-mcp/` is ignored only by the owner's personal file, so another person's fallback run would show in `git status`. The task names only `.playwright-cli/`. Outside the task.
- Playwright CLI's version is not pinned and the skill does not name the one it was written against. The carried question was answered and reported; a later release changing the skill's commands is its stated cost.
- The 401 on `/api/account` and the 404 on `/favicon.ico` in the page's console: task 8's.

## Coverage of the task

| Item | Met | How checked |
|---|---|---|
| To do 1, one command builds and runs over HTTPS | yes | `package.json`, the script read whole, tests run |
| To do 1, own certificate; mail to an address where nothing answers; server code unchanged | yes | no file of `src/server/**` in the diff; test of the certificate; test of a registration under the deadline |
| To do 2, each start removes the previous database and makes a new one | yes, with finding 2 as the one exception | tests; removal read whole; a live start stays by the carried question |
| To do 2, no touch of the test server or a player's save | yes | everything local; a check reaches nothing else |
| To do 3, the places of the README, three warnings, section removed, seven docstrings | yes, with finding 3 | diff; all eight places of the docstrings grepped, each statement stays true, `npm start` and `npm run build` still given and `src/browser`, `src/server` still placed |
| To do 4, CLI, MCP where it fails, frames | CLI yes; MCP operates; frames on MCP **no**, finding 1 | `reports\acceptance.md`, author's report |
| To do 4, `.playwright/cli.config.json`, `.playwright-cli/` ignored, repository tells the way | yes | diff; `AGENTS.md`, skill |
| To do 5, D-252 whole | recorded word for word, finding 1 on its truth | compared with `definicja_mvp2_loop2.md:1110`–`:1119` |
| To do 5, the part of D-253 | binding part yes, finding 4 on the *Rationale* | compared with `:1125`–`:1134` |
| To do 6, D-234 | word for word | diff |
| To do 7, part map | yes, `.playwright/**` in `agent-workflow`, the script in *Trust boundary* of `build-tools`, new `Depends on` | `foundation_check.py` 0 errors |
| To do 8, refusal rule, test, seen failing, `guidelines/testing.md` | yes | test marked, three mutations of mine below, row and both lists against the template |
| First acceptance criterion | yes | `reports\acceptance.md`: a fresh agent, files read `AGENTS.md` and the skill only, seven steps, a frame opened and described. Not repeated by me. |
| Second acceptance criterion | no Playwright test in the tree; evidence in the request is the orchestrator's | `git diff --stat` |

| Settlement | Entry | Met |
|---|---|---|
| 1, no account kept for a person | D-254 | yes |
| 2, mail where nothing answers | D-255 | yes |
| 3, own certificate, click through | D-256 | yes |
| 4, this computer alone, no proxy header of a browser | `local-start-access` | yes for the proxy; the named headers are the cycle's to name |

Projected entries carried: D-252 and the D-253 part, above. *Based on*, *Relations* and *Verification* filled by the cycle as the task leaves them. The three environment facts quote their sources: fetched at the fixed commits, each quoted passage found (`playwright-cli-token-use`, `playwright-cli-config-path`, `playwright-screencast-frames`).

**Foundation against the change.** D-49, D-73, D-76 (does not cover this file), D-110, D-111, D-254 to D-256 agree with the code. D-05 and `loop2-one-serving-process` speak of the container. D-13 is met: no value in the repository, secrets random per start. D-89: no condition of return of D-75, D-87 or D-88 is met by this change. No existing invariant test changed; the new one is `tests/invariants/test_local_start_access.py`.

**Reserved choice:** none. Playwright comes from the task; `openssl` adds nothing to run, pay for or back up, and one task can change it alone. D-256's *Rationale* "needs no new program" holds where `openssl` or Git is present; a computer with neither stops with an error naming that.

**Author's own-work check.** It names the fresh agent on Windows PowerShell, a fair weakest point; its PowerShell run streamed only one frame, and the separate agent covered the path in a shell. It did not name the fallback, which is where finding 1 lies, though the author reported that gap itself.

## Crafted input at the boundary

- 773 crafted requests over real TLS at a real start: every byte in a header name, a header value and a path, obsolete line folding, a space before the colon, odd `Transfer-Encoding` forms, HTTP/1.0 without `Host`, absolute and `*` targets, `CONNECT`, `Upgrade`, `Expect`, `__proto__`, repeated cookies, unknown methods, a 20 000-byte header. The process stayed up and answered after each one.
- 90 clients leaving mid-body, mid-response and in a bad chunk: alive and answering.
- Headers: `Forwarded`, `X-Real-IP`, `CF-Connecting-IP`, every `x-forwarded*` dropped in any spelling or number. Trailers are not passed on by the pipe. A second `Origin` joins and fails the exact comparison; a second `Content-Type` is dropped by Node before the server's check: harmless, no decision covers it (both by reading Node's rule, not run).
- Removal: the path comes from `import.meta.url` alone, the directory pattern is strict, a link is no directory for `withFileTypes`, and the arguments and environment are covered by a test and by reading. The settings are written over the environment, and no other setting of the server names a file.
- Listening: both ports on 127.0.0.1, by reading and by test.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree | 0 | 0 errors |
| `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | 0 | both f45ca40 |
| `python -B -m unittest test_local_start_access` in a scratch worktree of the head | 0 | 11 tests, 79 s |
| `python -B -m unittest test_loop2_play_skill` in that worktree | 0 | 5 tests |
| Mutation, `x-real-ip` no longer filtered, class `LocalStartBoundary` | 1 | failed at the assertion |
| Mutation, the browser's `X-Forwarded-Proto` kept | 1 | failed at the assertion |
| Mutation, `LOOP2_LISTEN_HOST` set to `0.0.0.0` | 1 | error at set-up, finding 5 |
| Scratch script of crafted requests, exported copy of the head | 0 | 773 cases, 0 crashes |
| Scratch script of leaving clients | 0 | alive |
| `node scripts/local-start.mjs --stop` with a planted live number | 1 | finding 2 |
| Two starts, one Playwright CLI session | 0 | finding 3 |
| `curl` straight to the server's port, with and without the forged header | 0 | 403, then 401 |
| `curl` of the three facts' addresses | 0 | quotes found |

**Not run:** the full `npm test` (the orchestrator's, WAY-160), so ESLint, Prettier, Ruff, ShellCheck, the audit and the other tests of the gate stayed unchecked by me; StrykerJS, no file of `simulation` changed; Playwright MCP, because its working directory is the main checkout; a repeat of the acceptance path; a run of the script on Linux or macOS.

**Left behind:** none of mine. Process 2532 and its directory, from my mutation, were stopped and removed. The scratch worktree and copy are gone, `git status` in the reviewed worktree is clean and the main checkout untouched. `%TEMP%\loop2-invariant-xd_limyw` predates my test run and I could not tie it to me, so I left it.

## Reaches beyond the dispatch

- `src/server/transport.ts`, `src/server/configuration.ts`, `src/server/main.ts`: what the proxy feeds and which settings exist.
- `src/server/account-routes.ts`, the cookie's name: finding 3.
- `scripts/build.mjs`: what a second start's build does to a running start.
- `tests/invariants/loop2_invariant_support.py`: helpers of the new test.
- `definicja_mvp2_loop2.md:1106`–`:1137` in the vault: the source of the projected entries, for fidelity.
- `.the-way/product-guidelines/testing/SKILL.md`, the part on who writes: To do 8 names that skill, and it says it runs in a refinement while the cycle's author writes the file.
- `foundations/glossary.md`, headings only: no term of the change collides.

Foundation selected: every decision whose *Scope* names `build-tools` or `agent-workflow` and every invariant whose *Part* names them or `every`. Of the entries of `account-server` and `browser-view`, only those the task carries, since no code of those parts changed. `guidelines/coding.md` and `guidelines/testing.md` read whole; no kind file of `guidelines/coding.md` matches a script.

## Searches not found or unclear

- Whether To do 5 to 7 went through the named skills cannot be read from the commits. The author's report shows the steps of `the-way-record-decision` (the WAY-33 search, facts read at fixed commits) but does not say the skills ran. The results fit their templates and the check passes.
- *Questions carried to cycle*, the name `the-way-maintain-testing-guidelines` in To do 8: its own text gives the file to the cycle's author; the author's report says only `grep` on the template's lines. The row and lists fit the template.
- The cause of 0 frames through MCP: unknown, finding 1.
- `.runs/task-cycles/lokalny-start/reports/handoff-acceptance.md` was named beside the acceptance report; not needed, not read.
