# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 50. Listed by heading alone: 378.

## Listed in full

### D-28 — Which coding-guideline discipline does loop2 adopt?

Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring separate exemplars for building, deployment, entry points, HTML and CSS; the session, saved-game and mail exemplars were selected with their first implementations (D-115, D-213, D-162), and any deferred existing kind is compared before its exemplar is selected. For the adopted linters, full-compliance source invariants apply without a transitional per-file no-regression invariant. The general coding quality checks cover all code, tests included, while testing rules and exemplars by level stand in `guidelines/testing.md`, together with the explicit-time example from `tests/sim/time.test.mjs`, which is no additional exemplar.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, test-helpers

### D-29 — Which rules check TypeScript and JavaScript?

Every application, script and test TypeScript and JavaScript file of browser-view, simulation, account-server, build-tools, balance-tools and deployment, and every JavaScript file of agent-workflow under `.claude/hooks/`, `.claude/skills/loop2-play/` and `.agents/skills/loop2-play/`, passes local pinned ESLint 10.12.0 run with `--max-warnings 0` on `eslint.config.mjs`, which applies @eslint/js 10.0.1 `recommended` and, for TypeScript, typescript-eslint 8.71.2 flat `recommendedTypeChecked` unchanged, with globals 17.13.0 and TypeScript API 6.0.2 for the parser while application compilation stays on TypeScript 7, all within the one shared npm package and lockfile. That configuration sets `linterOptions.noInlineConfig`, so an inline configuration comment fails the check, and ignores only dependencies, generated files, the submodule and temporary work results, while the check runs with an empty bulk-suppressions file of its own, so an `eslint-suppressions.json` in the repository hides no report; a test keeps its file patterns to that scope, asking ESLint which rules each file of the scope receives and comparing them with the sets of @eslint/js and typescript-eslint themselves, and review keeps its rules to those sets. Changing the rule set takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow

### D-30 — Which Python rules block a change?

Every `.py` and `.pyi` file Ruff finds in browser-view, simulation, account-server, build-tools, deployment, agent-workflow and test-helpers passes local pinned Ruff 0.17.1 run with `--config ruff.toml --ignore-noqa`, where `ruff.toml` requires that version, turns preview off, excludes the submodule and temporary work results and selects the complete default nonpreview set minus `PLW1510`, `I001`, `ISC004`, `UP031`, `RUF059`, `PIE808`, `RUF007`, `RUF012`, `PLR0402`, `FURB167`, `RUF100`, `SIM117`, `FURB192`, `SIM102`: the remaining 393 rules block and these fourteen rules remain examples. The explicit configuration file holds for every file whatever other Ruff configuration stands in the repository, and no suppression comment takes effect. Changing that set takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-31 — Which Bash rules block a change?

Every standalone Bash script in the code parts, extensionless scripts included, passes local pinned ShellCheck 0.11.0 run on it by name with `--norc --shell=bash --extended-analysis=true` at its default `style` severity: its default nonoptional Bash checks and every diagnostic severity, with no example-only rules. Embedded commands in YAML or test literals are outside this standalone-script scope, and review keeps a new script from going unnamed and a `# shellcheck` directive that disables a check or changes the set out of the scripts. Changing that set takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-32 — How is web code formatted?

All application, script and test TypeScript and JavaScript in browser-view, simulation, account-server, build-tools, balance-tools and deployment and browser HTML and CSS pass `--check` of local pinned Prettier 3.9.10 run with `--no-config --no-editorconfig --ignore-path .gitignore`: its default nonexperimental options — two spaces, semicolons, preferred double quotes, target width 80 and LF on every platform — with no ignore file of its own able to hide a file; Markdown, icons, generated files, dependencies, the submodule and temporary work results are excluded. The editor's `prettier.config.mjs` sets no option, narrow repository attributes preserve LF for that scope on Windows, a test keeps the check's file patterns and those attributes to the TypeScript and JavaScript of that scope, asking Prettier which files its patterns check and git which line ending each file gets, and review keeps `prettier-ignore` comments out of covered code.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment

### D-33 — Which introduced dependency vulnerabilities block a change?

The dependency audit passes without a network request where `package-lock.json` equals its version at {fork-point}, and otherwise fails on each advisory of low, moderate, high or critical severity that local pinned npm 12.2.1, run as `npm audit --json --package-lock-only --audit-level=low --include=dev --include=optional --include=peer --registry=https://registry.npmjs.org/`, reports for that lockfile and not for its version at {fork-point}, reading the npm/GitHub Advisory Database through the public npm registry when the check runs. A failed request or an unreadable report fails the audit; info does not block, and the low threshold has no automatic revision or scheduled threshold review. The audit covers the root npm package of build-tools with its direct, transitive, production, development, optional and peer dependencies, sending package names and versions without application code, while nested npm packages and runtime, container-image, operating-system and non-npm dependencies are outside it.

- **Scope:** build-tools

### D-34 — Which file is the exemplar for content data?

The exemplar for kind `content-data` is `src/browser/sim/data/resources.ts`, and its kind guidelines are read before adding or changing a file of that kind. The typed catalogue and identifiers derived from keys remain examples alongside the existing simulation-isolation rule, without requiring that catalogue shape in every data file.

- **Scope:** simulation

### D-35 — Which file is the exemplar for simulation modules?

The exemplar for kind `simulation-module` is `src/browser/sim/game.ts`, and its kind guidelines are read before adding or changing a file of that kind. Explicit inputs and a result consisting of state and events illustrate the existing simulation-isolation and simulation-inputs rules, without requiring every helper to return `GameResult`.

- **Scope:** simulation

### D-36 — Which file is the exemplar for browser modules?

The exemplar for kind `browser-module` is `src/browser/view/account-card.tsx`, the first screen built with React, and its kind guidelines are read before adding or changing a file of that kind. Keeping focus and passing user actions to the application remain examples alongside browser-view-framework and content-identifiers, without requiring `update()` in every module or forbidding the rebuilding of static elements.

- **Scope:** browser-view

### D-37 — Which file is the exemplar for the HTTP application?

The exemplar for kind `http-application` is `src/server/app.ts`, and its kind guidelines are read before adding or changing a file of that kind. Separating application creation from opening the listening port remains an example alongside account-server-express-http and loop2-api-error-route, with no additional structural check of the application factory.

- **Scope:** account-server

### D-113 — Which file is the exemplar for password hashing?

The exemplar for kind `password-hashing` is `src/server/passwords.ts`, and its kind guidelines are read before adding or changing a password-hashing file. Hashing and verification share one bounded admission gate, preserve password content, and use one explicit Argon2id profile, measured with that gate in the deployed container image.

- **Scope:** account-server

### D-114 — Which file is the exemplar for database access?

The exemplar for kind `database-access` is `src/server/database.ts`, and its kind guidelines are read before adding or changing a database-access file. Database access owns the SQLite connection, transactional schema initialization, bound SQL values and connection disposal, independently of HTTP and password hashing.

- **Scope:** account-server

### D-115 — Which file is the exemplar for the session Store?

The exemplar for kind `session-store` is `src/server/session-store.ts`, and its kind guidelines are read before adding or changing a session-store file. The Store adapts the library's callbacks to database operations, validates stored session identity and cookie metadata before library hydration, and leaves HTTP and cookie policy to application assembly.

- **Scope:** account-server

### D-116 — Which file is the exemplar for account policy?

The exemplar for kind `account-policy` is `src/server/account-policy.ts`, and its kind guidelines are read before adding or changing an account-policy file. Account policy normalizes and checks credentials and reserves, settles and bounds attempt admission against a supplied clock, independently of HTTP, password hashing and the database, and each admitted attempt is settled once, only after the password work it started has completed.

- **Scope:** account-server

### D-117 — Which file is the exemplar for a browser API client?

The exemplar for kind `browser-api-client` is `src/browser/account-api.ts`, and its kind guidelines are read before adding or changing a browser API client file. A browser API client sends its requests to relative `/api/` paths and follows no redirect, reports a success only for its request's own success status with a well-formed body, reports every other answer, a failed connection and an answer not complete within its time limit as a typed failure, and keeps no identity, cookie or document state.

- **Scope:** browser-view

### D-213 — Which file is the exemplar for saved-game code?

The exemplar for kind `saved-game` is `src/browser/sim/saved-game.ts`, and its kind guidelines are read before adding or changing a file of that kind. Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it. An error of its own code is no refusal: it leaves the load as a thrown error, which the browser view writes to the console without its text, and the saved game state on the server and the unsaved game state in the page's memory stay as they stand, while the player gets the sentence of D-96.

- **Scope:** simulation, browser-view, agent-workflow

### D-351 — How does loop2 keep the imports of its parts within the dependencies its part map allows?

One invariant keeps every import of loop2's code within its part map, and its test counts as a test every file git tracks under `tests/`, helpers and stand-ins included, so that only a file outside `tests/` is kept from importing the part of test helpers. The test reads the imports of TypeScript, JavaScript and Python files, and no process that one file starts from another and no HTML or CSS: in TypeScript and JavaScript `import` and `export … from` statements and `import()` with a string literal, in Python `import` and `from … import` statements and a directory added to `sys.path`. A relative import that the test cannot match to a file git tracks fails it, with the file and the line, an import of a built file under `dist/` is matched to its source under `src/`, and a package or a module from outside the repository is the file of no part.

- **Scope:** browser-view · simulation · account-server · build-tools · balance-tools · deployment · agent-workflow · test-helpers

### D-362 — How does loop2 point to places outside the repository that its readers cannot reach?

loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes, the list of its tasks and the rules of a task's line, by the entry that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the entries `projects`, `tasks` and `task-rules`, and no file git tracks holds an absolute path on that disk. No file git tracks names a note the author keeps outside the repository or the folder it lies in, or a file of a repository its readers cannot reach, such as the private repository of the old loop game; what a reader needs of such a source stands in the foundation or in the file itself.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, product-foundation, test-helpers

### D-393 — What keeps the simulation from using names outside the JavaScript language?

Two checks keep the simulation's files from using the page, a timer, the console or any other name that the browser or Node.js adds to those of the JavaScript language, and both stay: the compiler, which type-checks the simulation's files under a configuration of their own that covers every file of the simulation, holds the library of the language alone and no ambient types, and emits nothing; and the test of `simulation-isolation`, which keeps its whole scan of the sources and its run of the built simulation in a cut-off environment. Neither check is shortened because the other covers part of it.

- **Scope:** simulation, build-tools

### D-394 — Does the simulation keep `actionFeasible`, which the game does not call?

The simulation keeps `actionFeasible`, the function that tells whether an action can start now, though the game does not call it: tests use it as their point of observation of whether an action is allowed. A clean-up does not remove it because the game has no caller of it.

- **Scope:** simulation

### D-412 — What looks for secrets in loop2's repository?

The built-in secret scanning of GitHub, with push protection, is what looks for secrets in the repository. The CI of the repository and the one command of tests add no scanner of secrets.

- **Scope:** agent-workflow, build-tools

### D-424 — Where does the environment of the pinned Python quality tools come from?

Before its first check, the test of the quality checks makes the environment `.runs/quality-venv` of Ruff, ShellCheck and shfmt whenever it is absent, half made or not at the versions `requirements-quality.txt` pins, by installing that file with `pip install --require-hashes`, and it makes nothing and fetches nothing where the environment is complete and at the pinned versions. Where the environment cannot be made, the test fails with the one message that says so, naming `.runs/quality-venv` and the command that installs it, and no check is skipped.

- **Scope:** build-tools

### D-425 — How large may a function and a file of the code be?

A function holds at most 200 lines of code and a file at most 800, lines counted without comments and blank lines and the lines of a nested function counted in the function that holds it. The limit on a function covers every file that ESLint checks under D-29 — the application, the scripts, the tests, the balance instrument, the JavaScript of the three agent-workflow directories D-29 names and the two root configuration files — and the limit on a file covers the same files outside `tests/`.

Two exceptions stand whole over a threshold and no other does: the function `accountRoutes` in `src/server/account-routes.ts`, which is the one function that registers the routes of the server, nearly all of its lines being functions nested in it, and the file `src/browser/sim/saved-game.ts`, which keeps the whole turning of a saved document into game state, or into a refusal, in one checked file at a trust boundary. Adding an exception takes a human-accepted change of this decision.

The rule runs as an ESLint run of its own, with the two size rules of ESLint alone, apart from the run on `eslint.config.mjs` that D-29 holds; that run leaves the rule set of D-29 and its configuration as they are, and is no change of D-29.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow

### D-426 — Does the gate keep a tool for unused code?

The gate keeps no tool for unused code: no check of the one command of tests reports an export, a file or a dependency that nothing uses. A run of such a tool is a one-time review, whose findings a human takes up as changes of their own, and adding such a tool to the gate takes a human-accepted change of this decision.

- **Scope:** build-tools

### D-433 — How is Python formatted?

Every `.py` and `.pyi` file Ruff finds in browser-view, simulation, account-server, build-tools, deployment, agent-workflow and test-helpers stands as local pinned Ruff 0.17.1 leaves it with `ruff format` run with `--config ruff.toml`. `ruff.toml` sets the line width 100, which the rule SIM401 of the linter reads too, leaves every other setting of the formatter at its default and leaves Markdown out of the formatting, so that the formatter reads only the Python files the linter of D-30 reads. Changing a setting of the formatter takes a human-accepted change of this decision.

No such file carries a comment `fmt: off`, `fmt: on`, `fmt: skip`, `yapf: disable` or `yapf: enable`.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-434 — How are the Bash scripts formatted?

Every standalone Bash script that D-31 has ShellCheck check by name stands as local pinned shfmt 3.14.1 leaves it, run on it by name with `-i 2 -bn -ci -ln bash`: two spaces of indent, `&&` and `||` at the start of a continued line, indented `case` branches and Bash as the language. Those flags make shfmt read no EditorConfig file, so the result depends on no file outside the repository, and shfmt 3.14.1 comes from the package `shfmt-py` 4.2.0, installed with the other quality tools by D-424. Changing a flag or the version of shfmt takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

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

### D-427 — Where do the reference programs stand?

The reference programs, the programs that the tests of the simulation and the balance instrument run to see how a map is solved, stand in one file of the tests of the simulation, `tests/sim/reference-programs.mjs`, and both read them from it. The balance instrument is the tool of the part `balance-tools` that runs the game's built simulation outside the browser; no test of the simulation and no file of the instrument holds a copy of a reference program of its own.

- **Scope:** simulation, balance-tools

### D-428 — What does the map check of the balance instrument print?

For each game map an overlay adds and each reference program, the map check of the balance instrument prints the share of map runs solved on the seeds 1 to 500, the median game minutes of the solved map runs, the failures by cause and the balance of the earning loop, which is what a map run takes from the chest, what it puts into it and how often the character dies. The table holds no condition, action or rule of any program. It names each program by a label, `P1`, `P2` and so on, the program's place in the whole list of reference programs that the command `programs` prints, and never by the program's identifier, which can state the rules of its program in other words.

- **Scope:** balance-tools

### D-429 — Do the results of the balance instrument's measurements enter the repository?

The results of the measurements of the balance instrument do not enter the repository. The instrument prints each result, or writes it to the file that a flag of its command names, and writes no file into the repository of its own accord.

- **Scope:** balance-tools

## Listed by heading alone

- D-01 — What runs the account and save server?
- D-02 — How does the account and save server handle HTTP requests?
- D-03 — How is the browser view built?
- D-04 — What is the game built with?
- D-05 — What serves the built game and account requests in the container?
- D-06 — How are the browser and server built together?
- D-07 — How is the work of the game split between the server and the browser?
- D-18 — Where does the game's content live?
- D-229 — How does the account and save server access SQLite?
- D-237 — How is a Node.js release checked before it is deployed?
- D-263 — Which tool bundles the browser's code?
- D-266 — Where does the output of the browser's compilation stand?
- D-73 — Which testing discipline does loop2 adopt?
- D-74 — When are tests on generated inputs considered?
- D-75 — When are complete player journeys tested in a real browser?
- D-76 — When do fonts and the preview server gain refusal tests?
- D-77 — How are tests selected and limited as a whole?
- D-78 — How is one test case shaped?
- D-79 — How is the npm registry response contract checked?
- D-81 — At which levels do loop2 tests stand?
- D-82 — Which product documents supply test expectations?
- D-83 — Where are tests written and how do they enter the gate?
- D-84 — Which real mechanisms do new or changed tests exercise?
- D-85 — Which cases are the exemplars of the test levels?
- D-87 — When are whole-screen pixel comparisons used?
- D-88 — How are real browser events, focus and SVG checked?
- D-89 — Who revisits a deliberate testing exclusion?
- D-422 — How is the guard that keeps a failed renewal from destroying an answer that has ended tested?
- D-432 — Where does the knowledge of a test that fails at random with no cause found stand?
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
- D-356 — How does the operator learn that the running game failed?
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
- D-430 — What do the commands that the operator runs on the server say when they cannot open or change the account database?
- D-96 — What does a player see before and after signing in?
- D-97 — What does the player's logout do?
- D-98 — Which player passwords are accepted?
- D-99 — How are player email addresses compared and checked?
- D-100 — What do duplicate registration and failed login tell the player?
- D-259 — Which state does the login card open on, and what stands above its fields in each state?
- D-260 — What does the switch of the login card do to what the visitor typed?
- D-261 — Where does the page's one sentence stand on the login card?
- D-262 — What stands on the screen of the login card, and where do the waiting screens stand?
- D-278 — Where does the login card stand in the height of the window?
- D-381 — How does the page open, focus and close the login card, and what does the card do while a form waits?
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
- D-352 — What does a page whose game is open do when the fragment of an emailed link appears in its address?
- D-203 — What happens to unsaved progress when a session expires?
- D-204 — How does the browser exchange saved game states with the server?
- D-205 — Where are player accounts and saved game states stored?
- D-206 — What happens to a saved game state of another version?
- D-207 — When does the game save the game state on the server?
- D-208 — What does the player see of saving the game state?
- D-209 — Which browser's save of the game state does the server accept?
- D-210 — What does the server do with a save of the game state whose version differs from the one it holds?
- D-211 — What does the player see when a save of the game state finds no session?
- D-212 — How does a manual map run come back from a loaded saved game state?
- D-386 — Which game states does the load of a saved game state admit?
- D-399 — Which saved game state does the server keep beside the current one?
- D-400 — What is the previous-save privilege and who gives it?
- D-401 — How does an account with the privilege pull the programs of its previous save?
- D-402 — How does an account with the privilege start the game from zero?
- D-403 — What does the load do with a saved game state whose Understanding lacks „Eksploruj”?
- D-265 — What form does a shared control of the browser view have?
- D-267 — What keeps the rules of hooks and of effects in the browser view's code?
- D-269 — Does the kitchen-sink page hold React?
- D-270 — Which libraries built on React may the browser view take?
- D-280 — Which screens does the game have, and how does the player move between them?
- D-281 — How does an address name a screen?
- D-282 — What do the screens leave room for from the start?
- D-285 — How does the menu „Konto” open and close?
- D-286 — How long does the page's sentence stand above the game?
- D-323 — What does the game do, and what does the player read, after an error that no code of the game handled?
- D-395 — What does a shared control of the browser view know of the screens that use it?
- D-407 — Does the browser view keep a React root for each screen, and where does its state live?
- D-408 — What does a new screen of the game add, and where?
- D-411 — What does the screen of the list of accounts show, and how does it run the four operations?
- D-416 — What does the screen Wiedza show?
- D-421 — Which stylesheets does the browser view have, and what does each hold?
- D-27 — Where do the game's icons come from?
- D-38 — Which styleguide discipline does loop2 adopt for the browser view?
- D-39 — What do the signal colours of the browser view mean?
- D-40 — What do the neutral roles of the browser view mean?
- D-41 — What do the roles of the terrain grid and of keyboard focus mean?
- D-42 — Which accessibility requirements does the browser view keep?
- D-43 — What counts in the browser view as a value written in place of a design token?
- D-44 — Which controls do the screens of the browser view build on?
- D-45 — Where does the browser view's kitchen-sink page stand?
- D-46 — Which fonts does the browser view use, and where do they come from?
- D-47 — Which elements of the browser view are controls, and how does their focus show?
- D-48 — How are the design tokens of the browser view named?
- D-271 — Where do the scene's pictures come from?
- D-272 — Where may a picture of the game stand?
- D-273 — When do the files of `assets/sprites/` gain a refusal test?
- D-274 — What does a main button look like, and which buttons have it?
- D-275 — Which actions of the browser view stand as text rather than as buttons?
- D-276 — What is a tab of the browser view?
- D-277 — How does the menu bar show where the player is?
- D-279 — What colour does a frame or a bar that sets a text apart take?
- D-396 — In which browsers and from which window size does the game have to work?
- D-21 — How does time pass in a map run the player starts?
- D-22 — Where does the simulation's randomness come from?
- D-24 — What is a game map made of?
- D-55 — How many manual map runs go on at a time?
- D-71 — In what order does a game minute of a map run take effect?
- D-129 — How long does the pace the player picks stay?
- D-130 — Where does the player pick the pace, and with which control?
- D-131 — Which changes of the program a map run carries out reset its solving progress?
- D-132 — What does the screen show, and what can the player do, after a completion?
- D-133 — Where does the player see a map run's streak and a map's solving condition?
- D-134 — Where does the player see that a map is solved?
- D-135 — Does the game show the longest streak of a map run?
- D-136 — How is a map solved, and what opens the next one?
- D-149 — When does the game offer a map opened by another map?
- D-214 — When is a map run a manual run of a solved map?
- D-215 — Where does the player read that a manual run of a solved map pays and takes nothing?
- D-388 — What numbers do the maps Las and Las — głębiej have?
- D-397 — Which map does a new game open on?
- D-398 — What numbers does the map Skraj lasu have?
- D-404 — What does the first pass of a new account on Skraj lasu have to reach?
- D-51 — What team does a new game start with?
- D-52 — How is a character named?
- D-54 — In what order do the characters of the team stand?
- D-56 — How does the game state tell one character from another?
- D-57 — In what unit does a character's warmth stand?
- D-58 — What cools a character's body?
- D-59 — How far do warming and eating raise a character's warmth and satiety?
- D-60 — When does a character lose and regain health?
- D-61 — When does a character die, and of what?
- D-62 — What does the screen show, and what can the player do, after a character's death?
- D-190 — What does a character's death take?
- D-216 — Where does the player read what a death took and what a completion renewed?
- D-217 — What does the game show of a character's resurrection?
- D-218 — How does the headquarters show a character's generation number?
- D-219 — Whose clock counts the renewal of a resurrection?
- D-220 — What generation number and resurrection does a new character have?
- D-221 — When is a character's death settled?
- D-387 — What numbers do the body, the gathering, the campfire and eating have?
- D-63 — How does a character light a campfire or a stick?
- D-64 — What does the backpack's cap count, and what sets its height?
- D-65 — What does a full backpack do to gathering?
- D-66 — What does a missed gathering do?
- D-67 — How does a tile's stock renew?
- D-68 — What becomes of a campfire that burns out?
- D-69 — How much does feeding add to a burning campfire?
- D-70 — How does the browser view show a campfire?
- D-72 — Where does a character craft a campfire and light a stick?
- D-373 — How does the flame of the campfire show how long the fire has left?
- D-140 — How does combat go?
- D-141 — When do combat turns take effect?
- D-142 — When can a creature attack a map run?
- D-143 — What does the first wolf attack reveal?
- D-144 — What actions does a character use in combat?
- D-145 — How do weapon wear and wound dressing work today?
- D-146 — What ends an encounter?
- D-147 — What record of an encounter does the player read?
- D-148 — Where is an attacking creature pictured today?
- D-150 — Which character skills open the current combat actions?
- D-151 — Whose health do combat conditions compare?
- D-175 — What does a mage pay for spells with?
- D-176 — With how much nature energy does a mage start a map run?
- D-177 — What does too little nature energy do to Płomyk?
- D-178 — What does the body row show of a mage's nature energy?
- D-191 — How does a character skill grow?
- D-192 — What describes a character?
- D-193 — When and how much practice does an action add?
- D-194 — When does a manual map run pay its practice to its character?
- D-195 — When does a character skill tree become known?
- D-196 — Which branch actions does the program editor offer outside a map run?
- D-197 — What does the gathering branch Obchód do?
- D-198 — What does the exploration branch Zwiad do?
- D-199 — What does the screen Postać show of character skills?
- D-200 — Where does the player buy a branch rank, and when does it act?
- D-201 — What does the map-run view show of its practice?
- D-374 — How short can an action shortened by bought branches be?
- D-377 — How fast does a mage's nature energy come back?
- D-378 — Can a program of the closed lists solve Las?
- D-379 — What are the curves of practice, and the effects and prices of the branches, of the eight character skills?
- D-118 — When does the player learn what the world holds?
- D-119 — Whose is the knowledge of the world, and what may a character use of it?
- D-120 — What does an archetype open to a character?
- D-121 — What brings each action, item and condition of the first maps into the Understanding?
- D-122 — What does a map run do, and what does the player see, when something is discovered?
- D-123 — What does the game write into the program at a discovery?
- D-124 — What does „+ reguła” do?
- D-125 — What do the body row, the backpack, the list of revealed tiles and the drawing of the game map show of what is not yet discovered?
- D-128 — Where does what reveals an action, an item, a condition or a creature stand?
- D-312 — How does the band of a discovery name the program rule the game wrote?
- D-313 — What does „Dodaj regułę z tym” do?
- D-20 — What interrupts the character's action in progress?
- D-23 — How does a character act by its program?
- D-25 — How does a character move?
- D-26 — How does a program point at things of the world?
- D-90 — Where do the program rules of a program belong?
- D-91 — What program does a new game start with?
- D-92 — What counts as one firing of a program rule?
- D-93 — What does a program rule show the player?
- D-126 — What does the simulation do with a program rule outside the character's repertoire?
- D-127 — What does the simulation do with a rule group whose condition lies outside the character's repertoire?
- D-375 — Where does „Wędruj” go, and how does it draw?
- D-376 — What numbers does a condition on the body, the backpack, the campfire and the tile accept?
- D-380 — Which words name each refusal of an action?
- D-164 — Who owns a program?
- D-165 — How does the game state tell one program from another?
- D-166 — Where does the player see the player's programs and pick the one to edit?
- D-167 — What can the player do with the list of programs?
- D-168 — What becomes of a map run whose copy's program the player deletes?
- D-169 — How is a program named?
- D-170 — Where does the player pick the program a character enters a map with, and which one stands there first?
- D-171 — How does the program panel show the copy and its unsaved changes?
- D-172 — How does the game announce a save of the copy over a program that changed?
- D-173 — What can the player do with the copy after a map run ends?
- D-174 — How does the player switch the character to another program during a map run?
- D-384 — Which program does the program panel show when the one it showed is gone?
- D-50 — Whose is the chest?
- D-179 — How do items go into a map run and out of it?
- D-180 — Where does the player arrange the trip plan?
- D-181 — Which entries does a trip list accept?
- D-182 — What trip plan does a new program hold?
- D-183 — What happens to carried items when the player stops a run or completes with items outside its plan?
- D-184 — How does the headquarters show the chest's capacity?
- D-185 — Where does the player read what completion deposited?
- D-186 — What does the running map show of the frozen bring plan?
- D-187 — How does a map cap equipment and loot?
- D-188 — Where does the player learn that a map cuts the trip plan?
- D-189 — What pays, and what takes from the chest?
- D-307 — What does the line of an empty trip plan say?
- D-239 — How fast does the earning loop go?
- D-240 — When and how is the time away computed?
- D-241 — How does the game state hold earning loops?
- D-242 — Which clock drives an earning loop?
- D-243 — How does the player start an earning loop?
- D-244 — What does the player see of an earning loop?
- D-245 — What does „Zatrzymaj” do?
- D-246 — What does the player read after being away?
- D-247 — When is time away computed, and how much?
- D-248 — What is the save time?
- D-249 — What does a map run of an earning loop discover?
- D-250 — What does a pause or an end screen hold?
- D-251 — How does the card of a map mark a rehearsal the earning loop cannot repeat?
- D-409 — Where does an act of the player that depends on time catch up the time?
- D-288 — How does the player write a program rule?
- D-292 — How does the program editor number rule groups and program rules?
- D-293 — What time of an action does the program editor show?
- D-294 — Where does the program editor keep which rule groups are folded?
- D-295 — What does a folded rule group show, and where does a rule dropped on it land?
- D-296 — Where does the player change and delete a rule group?
- D-297 — Where does an arrow move a program rule at the edge of its rule group?
- D-298 — How does the player fold and unfold every rule group at once?
- D-300 — Does a condition show its current value in the program editor?
- D-301 — What does an empty rule group say?
- D-303 — Does deleting a program rule or a rule group ask first?
- D-304 — Where does the player add a rule group?
- D-305 — Does the program editor mark a program rule that does not fire?
- D-423 — Which item does the condition „Zapas poniżej” start with in the program editor?
- D-289 — What does the rule panel show greyed, and with which reason?
- D-290 — How does the pick of the rule panel group its cells?
- D-291 — Which icon stands for an action?
- D-299 — Does the pick of the rule panel hold a search or a row of recent picks?
- D-302 — What does the rule panel of the copy say of the streak?
- D-306 — How does the rule panel take the player through a rule?
- D-308 — What state does a program rule show during a map run?
- D-309 — What do the signs of a program rule show in the minutes of an attack?
- D-310 — How does a program rule that cannot start name its reason?
- D-350 — Where does the rule panel stand while the rule group of its rule is folded?
- D-363 — Where does the player read what an action costs?
- D-53 — Where does the player send a character from, and where do the buttons that end a map run lead?
- D-325 — What does the screen Mapy show?
- D-326 — What does the game say before an earning loop that earns nothing?
- D-327 — What does the card of a map hold?
- D-328 — Does the card of a map show what the player has not discovered?
- D-329 — What stands at each character in the section „Kto idzie”, and in what order?
- D-330 — What is the first of the three clicks from Siedziba to the first map run?
- D-331 — What does the screen Mapy show before a map is picked, and how does a row of the list look?
- D-332 — What does {map} name in `#/mapy/{map}`?
- D-333 — How are the numbers of the card of a map counted, and where?
- D-389 — What does the picture band at the top of Siedziba show, and how does it stand and move?
- D-19 — How does the player interact with the drawing of the game map?
- D-283 — What happens to a manual map run when the player leaves its screen?
- D-284 — Does a return to the screen of a manual map run resume it?
- D-287 — What do Siedziba, the screen Postać and the screen Mapy allow, and say, while a manual map run waits or has ended?
- D-311 — How is the screen of a map run laid out?
- D-324 — What does the map run do, and what stands on the screen, while the question of „Zakończ” stands?
- D-334 — What does „Teraz” say on the screen of a map run?
- D-335 — What does „Potem” say on the screen of a map run?
- D-336 — What does a click on „Teraz” or „Potem” do?
- D-337 — What does the body row show of how long each need lasts?
- D-346 — How long does the pick of „Kronika” or „Teren” hold on the screen of a map run?
- D-349 — What size is the scene on the screen of a map run?
- D-368 — What does the end-of-run window say, and how does it open and close?
- D-369 — What does a manual map run keep of itself for the end-of-run window, and how does a load read it?
- D-370 — How does the end-of-run window cover the screen of a map run, and where does the keyboard go?
- D-371 — Who remembers whether the end-of-run window is open, and where does „Koniec przejścia” stand?
- D-385 — How does the list of revealed tiles show an item that burns on a tile?
- D-338 — What does the chronicle of a map run hold?
- D-339 — Where does the chronicle of a map run live, and what of it stands after a load?
- D-340 — Which actions of the character give an entry of the chronicle, and how does it read?
- D-341 — When does a loss of the streak give an entry of the chronicle, and how does it read?
- D-342 — Which changes of the program give an entry of the chronicle, and how does it read?
- D-343 — How does the chronicle stand in the area with the tabs, and how does the player filter it?
- D-344 — What does the kind „Świat” of the chronicle hold, and how do its entries read?
- D-345 — What does the entry of a discovery say in the chronicle?
- D-348 — From what does the chronicle learn what happened in a game minute and what the player changed in the copy?
- D-382 — How does the list of the chronicle draw a chronicle that grows through a long map run?
- D-383 — How long does the pick of a filter of the chronicle hold on the screen of a map run?
- D-314 — What does the background of the scene show?
- D-315 — Where does the tint of the scene's light stand?
- D-316 — What does the scene show, and from what does it draw?
- D-317 — How long do the scene's effects last?
- D-318 — Where does the mage go for each action?
- D-319 — How does the mage walk to its place?
- D-320 — What stands over the mage's head?
- D-321 — Does a click on the scene do anything?
- D-322 — What does the scene show while time stands still?
- D-364 — How does the mage show a gathering?
- D-365 — What flies when something is gathered?
- D-366 — Where does the dust of a miss stand?
- D-367 — Which readings of the game show an effect of the end of a gathering?
- D-372 — What does the frost on the edges of the scene's frame show?
- D-415 — Who judges the colour of an effect against the prop it stands at, and whether another element of the scene covers it?
