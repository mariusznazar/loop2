# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 38. Listed by heading alone: 103.

## Listed in full

### D-73 — Which testing discipline does loop2 adopt?

Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235, D-273 and D-422. Its testing rules and the recipes of its levels stand in `guidelines/testing.md`, read before writing or changing a test.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, test-helpers

### D-74 — When are tests on generated inputs considered?

Tests on generated inputs are considered only when the task author names a game rule and a concrete risk from combinations of inputs that a few readable examples do not adequately protect. That task chooses the tool and settles its maintenance cost.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-75 — When are complete player journeys tested in a real browser?

Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually. Automation is reconsidered when a critical-journey defect escapes smaller tests or repeated manual checking becomes a significant task cost; that task settles the tool and scope.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-76 — When do fonts and the preview server gain refusal tests?

Permanent refusal tests for font files and the local interface preview server are deferred until the first task changing the respective boundary, which introduces its refusal test and changes its invariant to method test. Only a change of a boundary's principle — another kind of file, another way in, another recipient — changes that boundary, and a change of how the kitchen-sink page is built does not change the boundary of the preview server. Until then, review checks font provenance and that the preview server serves only its own directory and only on the developer's machine.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-77 — How are tests selected and limited as a whole?

`npm test` without arguments runs the full gate; `npm test -- <test file>` accepts exactly one test file and runs only it, building the game first for Node but not for Python, without other tests, the foundation check or the check of the instruction files. A focused run with no executed test or a file that is not a test fails, and only the full gate suffices before a request. There is no configuration file limiting the whole run; a whole-run limit is reconsidered on a concrete problem with diagnosis time or a hanging run, while new or changed tests still bound their own waiting.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, test-helpers

### D-78 — How is one test case shaped?

A new or changed test case has a name describing its behaviour and condition, and readable preparation, action and assertion phases protecting one behaviour; it may use a table of explicitly named variants of that behaviour. It neither reproduces the product algorithm nor chooses its expectation from the obtained result.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, test-helpers

### D-79 — How is the npm registry response contract checked?

The npm registry has no separate contract test: the real dependency audit in the gate checks its response format under D-33. Tests of the audit use controlled responses to force errors, and an unreadable real response fails the audit.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-81 — At which levels do loop2 tests stand?

Loop2 tests stand at three levels: unit test and integration test as defined in its glossary, and smoke test in its ordinary meaning. A smoke test starts the built application through its entry point or a container and checks readiness or a simple response, without proving a complete game journey; a level follows the resources exercised, not the test directory.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, test-helpers

### D-82 — Which product documents supply test expectations?

The expectation of a test comes from the loop2 foundation — its decisions, invariants and glossary — from a relation the code under test does not compute, or from a crash counted as a failure; a human's judgement is a source once a decision of the foundation holds it. What a test needs of the requirement it checks stands in the foundation, so no comment is required to name the source of a value, a test comment names as the source of an expectation no document outside the foundation — a task document and a copy of one kept in the record of a task cycle included — and a comment that carries nothing the code needs is not written.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, test-helpers

### D-83 — Where are tests written and how do they enter the gate?

Tests keep Node and Python, their existing directories, and the names `*.test.mjs` and `test_*.py`. Every `*.test.mjs` file under `tests/` is selected by `npm test`, and the gate's runner, `.the-way/gate/run_tests.py`, runs each directory that holds a `test_*.py` file git tracks, so a new `test_*.py` file runs once git tracks it.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, test-helpers

### D-84 — Which real mechanisms do new or changed tests exercise?

A new or changed simulation test supplies explicit state, elapsed time and seed and uses the real game random generator without waiting for game minutes on the computer. A test of file or HTTP failure uses real temporary files or a real local server, waits for a readiness event or condition with a time limit and error handling, and cleans up its files, servers and processes even after failure; polling a condition is allowed, and controlled responses test reactions to forced failures without proving the replaced operation. The HTTP helper in `tests/http.test.mjs` keeps these waiting and cleanup rules.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, test-helpers

### D-85 — Which cases are the exemplars of the test levels?

The unit exemplar is the case "the count of a hand-made backpack is the pieces of all items together" in `tests/sim/traits.test.mjs`, for explicit data and independent arithmetic, not time or a whole game. The integration exemplar is "raw and encoded traversal cannot expose files outside dist/public" in `tests/http.test.mjs`, for real requests and visible refusal, not the whole file or its timeout and cleanup helpers. The smoke exemplar is `test_occupied_address_exits_without_reporting_ready` in `tests/invariants/test_account_server_occupied_address.py`, for normal-start controls around forced refusal, not full HTTP, container or gameplay evidence.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, test-helpers

### D-87 — When are whole-screen pixel comparisons used?

Whole screens are not preserved by pixel-by-pixel image comparison, while agreed appearance rules keep their checks and a changed appearance is inspected in a browser. Image comparison is reconsidered on a concrete visual defect or an agreed requirement for an exact layout; this exclusion does not cover the safety of external icons or fonts.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-88 — How are real browser events, focus and SVG checked?

Real browser events, focus and SVG rendering are checked manually after a change and are not automated; tests on a hand-made document model or on a ready-made document imitation prove only the logic they run, never real events, focus or rendering. Automation is reconsidered on a defect that such a test missed or together with the player-journey automation of D-75, and this exclusion never covers a trust boundary.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-89 — Who revisits a deliberate testing exclusion?

For a change touching a category deliberately left without tests, its author and reviewer check the category's condition of return, including complete player journeys, whole-screen comparisons and real browser events, focus and SVG.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-422 — How is the guard that keeps a failed renewal from destroying an answer that has ended tested?

The case "a failed renewal after an answer that has ended writes one line of the session and calls no destroy on the response" of `tests/http.test.mjs` checks the call of `destroy` on the response and not its effect, because the cut of an answer cannot be seen on Windows, where the gate runs. For that case alone, this departs from the rule of the testing template D-73 adopts that an assertion on a call stands only for an effect visible outside the product.

- **Scope:** account-server

### D-49 — Which port does a loop2 test give the server it starts?

Every start of the loop2 server process by a loop2 test on the machine that runs the tests gives the server, in `LOOP2_LISTEN_PORT`, a port the system names free at that start, never a fixed port. The one exception is a single test file of the default address, which starts the server with neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT` set in one case for each startup `account-server-default-address` names, wholly unconfigured outside production and fully configured with valid settings. A test giving `LOOP2_LISTEN_PORT` a value the server is to reject before it listens, and a server started inside a container a test runs, fall outside this rule.

- **Scope:** account-server, build-tools, deployment, test-helpers

### D-94 — Where does loop2 use a mutation testing tool?

Loop2 adopts StrykerJS for simulation, without a type-checking plugin, and the reviewer runs it on the changed files of that part. The configuration lists every `tests/sim/*.test.mjs` file except `rules.test.mjs`. Browser-view joins by a change of this decision when a defect in calculating the drawing or lists passes through tests and review.

- **Scope:** simulation, browser-view, build-tools

### D-95 — When is the mutation testing tool removed?

If the dependency audit reports an advisory in a package introduced by StrykerJS and a corrected version cannot remove it, loop2 removes the tool and returns the mutation testing rule to the author's mental check.

- **Scope:** simulation, build-tools

### D-255 — Where does the data an agent checks the game on come from?

An agent builds the game state a check needs with functions of the simulation and sends it by the ordinary save request to a local server with a database made for that check, and it reaches early states by playing. One command of the repository starts the game locally over HTTPS, and a check touches neither the test server nor a player's save.

- **Scope:** agent-workflow · build-tools

### D-256 — Does the local start keep an account between its starts?

The local start keeps no account and no saved game state for a person between its starts: each start of the command makes a database of its own and removes the databases of the starts it does not find running; a start whose process number is in use and whose port takes a connection and stays silent counts as running. A person plays on the test server.

- **Scope:** build-tools · agent-workflow

### D-257 — Where does account mail go at the local start?

At the local start the mail settings point at an address where nothing answers and the server stays as it is. A person goes through the whole way with mail on the test server.

- **Scope:** build-tools · agent-workflow

### D-258 — What does the game present to a browser at the local start?

The local start makes its own certificate, and a person clicks through the browser's warning.

- **Scope:** build-tools · agent-workflow

### D-264 — What does a test of a screen built with React run on?

A test of a screen built with React runs on jsdom, a development dependency pinned exactly, and only the test files of such screens leave their stand-ins for the document. One harness, `tests/view/page-document.mjs`, carries those files: it is imported before React loads, gives each case a fresh window, moves focus away from a control that becomes disabled, awaits React's work through `act`, types through the input's native value setter and a bubbling `input` event, and fails a case on a report of React's development build through `console.error`. A test file of such a screen clicks a control through the harness's `press`, which clicks inside `act`, and sends an event through its `fire`, which sends the event as a browser does and which the test file puts in `act` where React must answer, and keeps no copy of either.

- **Scope:** browser-view · build-tools

### D-268 — What keeps a test on a document imitation from taking the machine's memory?

A test file under `tests/` loads a document imitation only through the harness `tests/view/page-document.mjs`, takes from it an `assert` that builds no message of Node's and puts no value on its error, never `node:assert`, and runs under the limit the harness starts first: 2 GiB of its process's memory, read every 100 ms by a worker thread that above it writes one sentence to standard error and kills the process. A file outside `tests/` that loads a document imitation imports `tests/view/memory-limit.mjs` first and starts that limit before it loads the imitation. More than forty test files on a document imitation, or memory running away in a test on none, reopens how the limit is held.

- **Scope:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow

### D-390 — Who starts Docker Desktop when a test of the gate needs a Docker daemon that does not answer?

A test of the gate that needs a Docker daemon, finding none answering on a computer that has Docker Desktop, starts Docker Desktop and waits until a daemon answers, for at most 3 minutes, in a run of the whole gate and in a run of one test file alike. The test is skipped only when no daemon has answered by then, and its message says that the start was tried and did not finish and what stays unchecked; once a start has not finished in its limit, every later test of that run that needs a daemon is skipped at once, with no new start. On a computer with no Docker Desktop, such as one running Linux or a container in a cloud, the test is skipped at once where no daemon answers, with a message that says what stays unchecked, and runs where a daemon answers.

In one run of the gate, whichever of its processes need a daemon, Docker Desktop is started at most once: a test that asks for a daemon while a start begun by another process of the run has not finished waits for that start, within its limit, and starts none of its own; where the process that began the start ended before it finished, the next test to ask starts Docker Desktop again.

- **Scope:** build-tools, deployment

### D-391 — What becomes of the Docker Desktop that the gate started, once the run is over?

The Docker Desktop that the gate started stays running after the run; the gate does not stop it.

- **Scope:** build-tools, deployment

### D-392 — Does the gate start Docker Desktop only where the free memory of the computer allows?

The gate starts Docker Desktop whatever the free memory of the computer is; it keeps no threshold of memory below which it does not start it.

- **Scope:** build-tools, deployment

### D-405 — In which order does the full gate run its stages, and where does it stop?

The full gate runs its stages one after another: the build, the Node tests, the directories of Python tests, the foundation check and the check of the instruction files, in this order, and ends at the first stage that fails. The check of the instruction files stops the gate where it reports an error, and does not where it reports only warnings. The Node tests do not run at the same time as the directories of Python tests.

- **Scope:** build-tools

### D-406 — Does the full gate run the directories of Python tests one after another or at the same time?

The full gate runs the directories of Python tests at the same time, giving the runner of the Python tests no argument that limits how many of them run at once. A run of the gate with the directories at the same time starts Docker Desktop at most once and waits for it at most once, whichever directories need a daemon, so that `gate-docker-start-waits-once` holds in it.

- **Scope:** build-tools

### D-413 — How does CI check a pull request into `main`?

On every pull request into `main`, GitHub Actions runs the one command of tests on a Linux machine, in a job named `tests`, a name that stays as it is, and no other checking command stands beside it. The workflow starts on the event `pull_request`, never on `pull_request_target`, and its token only reads and it holds no secret. No text of the request stands in a command, and no step or job lets a failing run pass.

The actions stand at the commits of their releases. The job has `.the-way` at the commit the gitlink of the repository records and never moves it to a branch of the-way, the whole history of the request's branch and of `main`, `refs/remotes/origin/HEAD` naming `main` before the one command runs, the Python that `.the-way/.python-version` declares, the Node.js release that `engines` of `package.json` asks for, and a time limit. The steps before the one command only set the machine up.

- **Scope:** agent-workflow, build-tools

### D-414 — What does a Claude Code session of loop2 show at its start where `.the-way` is not at the commit the repository pins?

At the start of a Claude Code session started in the repository root, the hook of `.claude/settings.json` compares the commit `.the-way` stands on with the commit the repository records for it, and prints nothing where they agree. Where they differ, or `.the-way` is not initialized, the hook warns the agent, in the context of the session, and the human, in a short message on the screen, each time with both commits and the repair command of the agent instructions, and it blocks nothing: the session starts and goes on as it does with no warning. The hook is a Node.js script, started by the same command on Windows, Linux and macOS, and it covers no session of Codex.

Where the check cannot run, because git fails inside the repository or the hook itself fails, the hook warns the agent and the human in the same two ways, with the reason and the repair command, and ends all the same with exit code 0. Apart from the case where the commits agree, it prints nothing only where there is nothing to compare with: git is missing, the folder the hook is installed in is no repository, or the repository pins nothing.

- **Scope:** agent-workflow

### D-417 — How does an agent operate the game as a player does?

An agent operates the running game in a real browser with Playwright CLI, and with Playwright MCP where the CLI fails, and reads motion from a stream of frames. This inspection adds to the checks D-75 and D-88 leave with a person and replaces none of them.

- **Scope:** agent-workflow · browser-view

### D-418 — Where do the screenshots that a task cycle of loop2 shows the human lie, and how does the description of its request embed them?

The screenshots that a task cycle shows the human lie in the public GitHub repository `mariusznazar/screenshots`, in its directory `loop2/` and in that a directory for each cycle, named as the directory of the cycle's own record, on a branch of that repository named `loop2/` and the name of that directory, never on `main`, and the description of the request embeds each as an image by a link to its file in a particular commit of that repository, with `?raw=true` appended. That repository holds only the screenshots of public products and may be cleared after a long time, and the images of old requests then stop showing.

- **Scope:** agent-workflow

### D-419 — Who puts a screenshot into the repository for screenshots?

The agent that shows a screenshot pushes it itself to the repository `mariusznazar/screenshots` with the `gh` account of the human who owns that repository, with no step of the human.

- **Scope:** agent-workflow

### D-420 — From which session may an agent use Playwright MCP?

An agent uses Playwright MCP, the fallback way of D-417, only from a session of the agent started in the worktree of its cycle.

- **Scope:** agent-workflow

### D-431 — What does the local start do when another program takes the port of its server?

When another program holds the port the local start picked for its server by the time the server listens, the start ends as it ends when its server cannot start: the server writes its own failure line and the start ends with the server's exit code. The start announces no address, passes no request of a browser to that program and tries no other port; a person or an agent runs `npm run local` again and gets a new port.

- **Scope:** build-tools · agent-workflow

### D-356 — How does the operator learn that the running game failed?

A watcher script on the server, outside the game container, run by cron every few minutes, reads the state and the health of the game's containers, a restart of either of them, the new lines of failures in the game container's log and, in the log of the nightly backup, the lack of a successful send that D-233 gives, passes over the window of a deployment and limits how many messages it sends, and calls `pusher` with a fixed subject and text that say only which kind of trouble it found, with no player's data and no tool's output, because the message may travel unencrypted. A GitHub Actions workflow whose schedule asks for a run every five minutes, and which GitHub starts at gaps of hours — from about 3.5 to about 8.5 hours between neighbouring runs in the reading of 2026-11-14, the cause not established — opens the game's public address and fails unless the address answers with status 200, so that GitHub notifies the operator of the failed run, a notice that with the server or the tunnel down may come only after hours, while the page in the browser, besides its line in the console, sends the kind, the code and the place of an error that no code handled to a route of the game's server, which limits the reports it accepts, writes each as a failure line that the watcher counts and reports, and at the first refusal of an hour writes one failure line of its own, `LIMITED`, as the notice that reports were dropped. A human installs the watcher and its schedule and sets the notifications of GitHub, and nothing is sent when the server and GitHub are both down, when the watcher's schedule does not start, when `flock` does not work on the server, where the watcher ends with success and a line in its own log and sends nothing, or when GitHub disables the scheduled workflow after 60 days without activity in the repository, which is public.

- **Scope:** deployment, agent-workflow, account-server, browser-view

## Listed by heading alone

- D-01 — What runs the account and save server?
- D-02 — How does the account and save server handle HTTP requests?
- D-05 — What serves the built game and account requests in the container?
- D-06 — How are the browser and server built together?
- D-07 — How is the work of the game split between the server and the browser?
- D-229 — How does the account and save server access SQLite?
- D-237 — How is a Node.js release checked before it is deployed?
- D-266 — Where does the output of the browser's compilation stand?
- D-28 — Which coding-guideline discipline does loop2 adopt?
- D-29 — Which rules check TypeScript and JavaScript?
- D-30 — Which Python rules block a change?
- D-31 — Which Bash rules block a change?
- D-32 — How is web code formatted?
- D-37 — Which file is the exemplar for the HTTP application?
- D-113 — Which file is the exemplar for password hashing?
- D-114 — Which file is the exemplar for database access?
- D-115 — Which file is the exemplar for the session Store?
- D-116 — Which file is the exemplar for account policy?
- D-213 — Which file is the exemplar for saved-game code?
- D-351 — How does loop2 keep the imports of its parts within the dependencies its part map allows?
- D-362 — How does loop2 point to places outside the repository that its readers cannot reach?
- D-412 — What looks for secrets in loop2's repository?
- D-425 — How large may a function and a file of the code be?
- D-08 — Where does the game run?
- D-09 — How does a change reach the server?
- D-10 — How do players reach loop2 on the server?
- D-11 — Which branch deploys loop2 to the test server?
- D-12 — What access to the server does an agent have?
- D-13 — Where do the server's access values and secrets live?
- D-14 — What kind of container does loop2 run in?
- D-15 — How is loop2 recovered when a deployment goes wrong?
- D-16 — What does the automation's key run on the server?
- D-17 — How does loop2 share the Mikrus host with other workloads?
- D-252 — How does loop2 write its failures to its logs, and what does it log?
- D-253 — Which processes of loop2 have a last-resort handler of their own?
- D-347 — How does an agent learn what went wrong in the game running in the browser?
- D-353 — Which refusals of the account server are an expected course and leave no failure line?
- D-354 — Is the sentence by which a service command answers the operator a log line?
- D-355 — Where does the log of the running game on the server lie, how long does it live and how does an agent read it?
- D-228 — Which failure does the database backup survive?
- D-230 — How often is a database backup made, and how many stay?
- D-231 — Where does the database backup run?
- D-232 — How is the database backup encrypted?
- D-233 — How does the operator learn that a database backup failed?
- D-234 — What does a checked restore of the database mean?
- D-235 — How is the code that talks to Mikrus Strych and `pusher` tested?
- D-236 — How is the consistent database backup made?
- D-238 — How does the backup script reach Mikrus Strych?
- D-360 — What does a restore of the database from a backup do about the passwords, sessions, blocks, roles and privileges it brings back?
- D-86 — Which files may a visitor obtain from the public server?
- D-101 — How long do independent browser sessions last?
- D-102 — How are account attempts limited?
- D-103 — Where are attempt counters kept and how is password work bounded?
- D-104 — Which request origin and body may change account state?
- D-106 — How are player passwords hashed and checked?
- D-107 — Which library maintains player sessions?
- D-108 — What public address do the game and account server share?
- D-109 — What identity authorizes an account request?
- D-110 — Which proxy information identifies an account request?
- D-111 — When is account configuration sufficient to start the server?
- D-112 — How does the account database open and preserve its schema?
- D-137 — How is a player account blocked and unblocked?
- D-138 — How is a player's login kept between requests?
- D-139 — What does the login of a blocked account tell the player?
- D-160 — What does an emailed link of a blocked account do?
- D-202 — Who can create and use a player account?
- D-410 — What is the role of an account, who gives it and where does the server read it?
- D-430 — What do the blocking command and the backup command say when they cannot open or change the account database?
- D-96 — What does a player see before and after signing in?
- D-97 — What does the player's logout do?
- D-98 — Which player passwords are accepted?
- D-99 — How are player email addresses compared and checked?
- D-100 — What do duplicate registration and failed login tell the player?
- D-105 — How is sending account email limited?
- D-152 — How does a player sign in and reset a forgotten password?
- D-153 — Which service delivers account emails?
- D-154 — How does the account server send email through Outsider?
- D-155 — How long and how often does an emailed link work?
- D-156 — How does an emailed link confirm a player's email address?
- D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message?
- D-158 — From whom does the email confirmation message come, and what does it say?
- D-159 — Can an account's email address change?
- D-161 — How does the account server count account messages against the limits of D-105?
- D-162 — Which file is the exemplar for mail sending?
- D-163 — How is the code that talks to Mikrus Outsider's SMTP service tested?
- D-222 — What does a request for a password-reset link answer?
- D-223 — Does a request for a password-reset link have a limit of its own per client address?
- D-224 — What form does a password-reset link take?
- D-225 — What does the form „Ustaw nowe hasło” hold, and how does it end?
- D-226 — How does the route that sets a password by a link check its request and bound its password work?
- D-227 — Which messages does a password reset send, and what do they say?
- D-204 — How does the browser exchange saved game states with the server?
- D-205 — Where are player accounts and saved game states stored?
- D-209 — Which browser's save of the game state does the server accept?
- D-210 — What does the server do with a save of the game state whose version differs from the one it holds?
- D-399 — Which saved game state does the server keep beside the current one?
- D-400 — What is the previous-save privilege and who gives it?
- D-402 — How does an account with the privilege start the game from zero?
- D-411 — What does the screen of the list of accounts show, and how does it run the four operations?
- D-38 — Which styleguide discipline does loop2 adopt for the browser view?
- D-46 — Which fonts does the browser view use, and where do they come from?
- D-271 — Where do the scene's pictures come from?
- D-396 — In which browsers and from which window size does the game have to work?
