# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 55. Listed by heading alone: 87.

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

### D-432 — Where does the knowledge of a test that fails at random with no cause found stand?

A test that fails at random, with no change of the code behind the failure and with no cause found, has an entry in the register `tests/flaky-tests.md`, written in Polish. An entry names the test, what was tried to bring the failure back with the numbers of runs and the conditions, and what to look at in a failed run, and it leaves the register in the change that explains the cause.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, test-helpers

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

### D-08 — Where does the game run?

The game and its account and save server run in a dedicated loop2 container on Mikrus, at a public address different from `kantarion.bieda.it`. The existing loop container remains untouched.

- **Scope:** deployment

### D-09 — How does a change reach the server?

A push to the deploy branch starts an automation that tells the server to build the game and its account server from that commit; the server pulls the code from GitHub itself, and the automation's key can only start a rebuild of a commit that belongs to that branch.

- **Scope:** deployment

### D-10 — How do players reach loop2 on the server?

Players reach loop2 at `https://loop2.mariusznazar.com/` through an encrypted remotely managed Cloudflare Tunnel, whose `cloudflared` connector is a second service of the loop2 Compose project with its own memory limit and forwards internally to `http://app:3000`. The application publishes no host port, and the tunnel's published hostname replaces loop2's proxied AAAA record, Origin Rule and Configuration Rule. Deployment pins the official connector image by version and digest, uses HTTP/2 over IPv4, and waits for both application health and an active connector connection before reporting success.

- **Scope:** deployment

### D-11 — Which branch deploys loop2 to the test server?

The deploy branch is `main`: a push to `main`, the merge of a pull request included, reaches the test server without anyone starting it by hand, deployed itself or within a later commit of `main` that contains it.

- **Scope:** deployment

### D-12 — What access to the server does an agent have?

An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human.

- **Scope:** agent-workflow, deployment

### D-13 — Where do the server's access values and secrets live?

Automation secrets and server access values — its name, SSH port, SSH user and IPv6 address — stay outside the repository in the repository's GitHub secrets and the operator's private note, and the login on Mikrus Strych stays outside it in that note and in root's SSH configuration on the server; runtime credentials live outside the checkout in `/etc/loop2/cloudflared-token` for the tunnel, `/etc/loop2/session-secrets` for session signing, `/etc/loop2/smtp-password` for the mail service and `/etc/loop2/backup-encryption-key`, owned by root with group root and mode 0400, for encrypting database backups, and the key that reaches Mikrus Strych lives in `/backup_key`, each backed up in that private note, while no container receives the encryption key or the key to Strych. Compose grants the tunnel file only to `cloudflared` as the read-only secret `/run/secrets/cloudflare_tunnel_token`, preserving the host directory's deployment-account ownership, group 65532 and mode 0750 and the tunnel file's same owner/group and mode 0640, grants the root-owned session file with group 1000 and mode 0440 only to the application as `/run/secrets/loop2_session_secrets`, and grants the root-owned SMTP password file with group 1000 and mode 0440 only to the application as `/run/secrets/loop2_smtp_password`, while the sender address and the mail service's host, port and login stand as plain values in `compose.yaml`. Repository files and requests name credentials by secret name or private note rather than value, may name non-secret paths and ports, and human rotation replaces the file and private copy before recreating its consumer, the encryption key having no consumer to recreate and its old value staying in the private note until every backup made with it has been replaced; session rotation prepends the new signing secret while retaining old verification secrets until at least 30 days after the last deployment able to sign with each old secret, with a restored old signing configuration restarting that interval.

- **Scope:** deployment, agent-workflow

### D-14 — What kind of container does loop2 run in?

loop2's containers, the application's and the connector's, are Docker containers.

- **Scope:** deployment

### D-15 — How is loop2 recovered when a deployment goes wrong?

A deployment that stops before it starts the new containers leaves the running loop2 containers in service. A rollback is a deployment of an earlier commit — a revert merged to `main`, or a human's run of the installed deploy script with that commit, which may name a commit of any branch of the GitHub repository while the automation's key deploys only commits of `main`. No earlier image is kept, so a rollback restores the earlier commit's code, never the data of that time, and a deployment of a commit that does not know the schema version of the database — an earlier commit, or `main` after a trial of a branch that moved the schema — does not pass the health check and leaves the game down until a commit that knows that version is deployed (D-112), so such a rollback is no recovery and such a trial is one that `main` does not survive.

- **Scope:** deployment, agent-workflow

### D-16 — What does the automation's key run on the server?

The automation's key runs only a root-owned installed copy of the deploy script, kept outside the server's checkout, so no pushed commit changes what the key runs. Each deployment compares that copy with the script's source at the deployed commit and only warns when they differ, and reinstalling the copy is a human's change.

- **Scope:** deployment

### D-17 — How does loop2 share the Mikrus host with other workloads?

A deployment of loop2 changes nothing on the host but loop2's own checkout, application and connector images and containers, its named database volume `loop2_accounts`, logs and lock, and the build cache and base images its builds add to the shared Docker store, which it never prunes; it removes or replaces nothing of another workload. It builds only while the host's available memory and free disk stay at or above thresholds the repository sets, and each loop2 container runs under its own memory limit. The tunnel token, session signing and SMTP password files are provisioned by the human outside the checkout and mounted read-only only to their respective consumers under D-13, while the application alone mounts `loop2_accounts` at `/app/data` for `/app/data/accounts.sqlite`, with its initial directory owned by uid/gid 1000 and the database preserved across application-container replacement and code rollback.

- **Scope:** deployment

### D-252 — How does loop2 write its failures to its logs, and what does it log?

Loop2 adopts all six rules on failures and logs of the coding template of its pinned the-way and departs from none of them. A log line of its Node.js code is one JSON object on one line, written through `console` with no library and under fixed field names, while its Bash scripts keep their own text, a line in the browser's console is plain text, and what a command prints to whoever ran it — the readiness line of the server, the sentence of `account-database-check` in the log of an image build, the report of `measure-passwords` for the script that ran it — is no log line, and where the command works on no value of a player's, as `account-database-check` does on a temporary database and `measure-passwords` on made-up passwords, its failure keeps the error's text there and gets no failure line in the log form of this decision, with `failure`, `kind`, `code` and `place`; the sentence by which `account-block`, `account-previous-save`, `account-role` or `account-backup` answers the operator is the matter of D-354. The product logs changes of a player's account and of access to it and operations that change what runs on the server or its backup, and no progress of a game and no housekeeping, and an agent adds alone an item that fits this principle, an identifier of a thing included, while anything that points to a person takes the human's consent. A change of the role of an account and each operation of the owner panel are such changes: each leaves one line with the number of the account changed, written after a change only, and no address and no number of the account of the owner who acted.

- **Scope:** browser-view · simulation · account-server · build-tools · balance-tools · deployment · agent-workflow

### D-253 — Which processes of loop2 have a last-resort handler of their own?

Each process that touches the data of accounts — the server, `account-block`, `account-previous-save`, `account-role` and `account-backup` — has one last-resort handler of its own, which writes the kind, the code and the place of what no code handled, because the runtime's default print could quote values. The page in the browser has one too: it cancels the event of an error that no code handled, so that the browser prints nothing itself, and writes in the console, as plain text, one line of the kind, the code and the place of the handler, never the error's message or stack, the same line once until the page is reloaded. A script run by hand or by the test gate that touches none of those data meets the rule on the last resort through the default print of Node.js or Python, which writes what nothing handled, and `account-database-check`, `src/server/measure-passwords.ts`, `deploy/loop2-watch`, `deploy/loop2-backup` and `scripts/restore-trial.mjs` already have a last-resort handling of their own, which the sentences of this decision above ask no more of, though the last two touch those data and write no kind or code.

- **Scope:** browser-view · account-server · build-tools · balance-tools · deployment

### D-347 — How does an agent learn what went wrong in the game running in the browser?

An agent learns what went wrong in the game running in the browser from what a player reads, the screen and the chronicle, and from the browser's console, through the browser it operates, with no outside service. An exception in the game shows on the screen as a sentence that something broke and goes to the console.

- **Scope:** browser-view, agent-workflow

### D-353 — Which refusals of the account server are an expected course and leave no failure line?

A browser that breaks off sending the body of a request is an expected refusal, like a body that is too large or broken, and the session write that the library makes as a response ends, refused because the account was blocked while the request was in progress, as while a registration waits on its message, is the intended effect of the block; neither leaves a failure line. A session write that fails for any other reason stays a failure.

- **Scope:** account-server

### D-354 — Is the sentence by which a service command answers the operator a log line?

The sentence by which a service command of the account server, `account-block`, `account-previous-save`, `account-role` or `account-backup`, answers the operator is no log line: the log line of such a command is its JSON line of D-252 alone, and the sentence stays beside it. A failure of the command written as that line and followed by that sentence is one failure recorded once.

- **Scope:** account-server

### D-355 — Where does the log of the running game on the server lie, how long does it live and how does an agent read it?

Just before a deployment replaces the containers of the game, it appends the whole log of the application and of the tunnel connector to `/var/log/loop2-app.log` on the test server, and when that append fails it says so in the deploy log and goes on; both services run under the `local` log driver of Docker with its default rotation, which bounds the log of a running container at about 100 MB. `logrotate` rotates the file weekly, or sooner when it grows large, and keeps four rotated generations, so a line of the game's log lives in its container until the next deployment and in the file for about four weeks, and a human's run of `account-block`, of `account-previous-save` or of `account-role` appends to the same file the JSON lines of the command, those only. An agent reads the log of a running container with `docker compose logs --tail`, and the file and its generations with a bounded `tail`, `grep` or `zgrep`, each through the `mikrus` MCP server, while a human creates the file with the owner of the deployment account, installs the rotation configuration and reinstalls the deploy script.

- **Scope:** deployment, agent-workflow, account-server

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
