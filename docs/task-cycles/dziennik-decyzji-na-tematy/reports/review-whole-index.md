# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 45. Listed by heading alone: 33.

## Listed in full

### D-28 — Which coding-guideline discipline does loop2 adopt?

Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring automatic formatting of Python and Bash and separate exemplars for building, deployment, entry points, HTML and CSS; session, saved-game and mail exemplars are selected with their first implementations, and any deferred existing kind is compared before its exemplar is selected. For the adopted linters, full-compliance source invariants apply without a transitional per-file no-regression invariant. The general coding quality checks cover all code, tests included, while testing rules and exemplars by level stand in `guidelines/testing.md`, together with the explicit-time example from `tests/sim/time.test.mjs`, which is no additional exemplar.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-29 — Which rules check TypeScript and JavaScript?

Every application, script and test TypeScript and JavaScript file of browser-view, simulation, account-server, build-tools and deployment passes local pinned ESLint 10.12.0 run with `--max-warnings 0` on `eslint.config.mjs`, which applies @eslint/js 10.0.1 `recommended` and, for TypeScript, typescript-eslint 8.71.2 flat `recommendedTypeChecked` unchanged, with globals 17.13.0 and TypeScript API 6.0.2 for the parser while application compilation stays on TypeScript 7, all within the one shared npm package and lockfile. That configuration sets `linterOptions.noInlineConfig`, so an inline configuration comment fails the check, and ignores only dependencies, generated files, the submodule and temporary work results, while the check runs with an empty bulk-suppressions file of its own, so an `eslint-suppressions.json` in the repository hides no report; a test keeps its file patterns to that scope, asking ESLint which rules each file of the scope receives and comparing them with the sets of @eslint/js and typescript-eslint themselves, and review keeps its rules to those sets. Changing the rule set takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment

### D-30 — Which Python rules block a change?

Every `.py` and `.pyi` file Ruff finds in browser-view, simulation, account-server, build-tools, deployment, agent-workflow and test-helpers passes local pinned Ruff 0.17.1 run with `--config ruff.toml --ignore-noqa`, where `ruff.toml` requires that version, turns preview off, excludes the submodule and temporary work results and selects the complete default nonpreview set minus `PLW1510`, `I001`, `ISC004`, `UP031`, `RUF059`, `PIE808`, `RUF007`, `RUF012`, `PLR0402`, `FURB167`, `RUF100`, `SIM117`, `FURB192`, `SIM102`: the remaining 393 rules block and these fourteen rules remain examples. The explicit configuration file holds for every file whatever other Ruff configuration stands in the repository, and no suppression comment takes effect. Changing that set takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-31 — Which Bash rules block a change?

Every standalone Bash script in the code parts, extensionless scripts included, passes local pinned ShellCheck 0.11.0 run on it by name with `--norc --shell=bash --extended-analysis=true` at its default `style` severity: its default nonoptional Bash checks and every diagnostic severity, with no example-only rules. Embedded commands in YAML or test literals are outside this standalone-script scope, and review keeps a new script from going unnamed and a `# shellcheck` directive that disables a check or changes the set out of the scripts. Changing that set takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-32 — How is web code formatted?

All application, script and test TypeScript and JavaScript in browser-view, simulation, account-server, build-tools and deployment and browser HTML and CSS pass `--check` of local pinned Prettier 3.9.10 run with `--no-config --no-editorconfig --ignore-path .gitignore`: its default nonexperimental options — two spaces, semicolons, preferred double quotes, target width 80 and LF on every platform — with no ignore file of its own able to hide a file; Markdown, icons, generated files, dependencies, the submodule and temporary work results are excluded. The editor's `prettier.config.mjs` sets no option, narrow repository attributes preserve LF for that scope on Windows, a test keeps the check's file patterns and those attributes to the TypeScript and JavaScript of that scope, asking Prettier which files its patterns check and git which line ending each file gets, and review keeps `prettier-ignore` comments out of covered code.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment

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

- **Scope:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow · test-helpers

### D-362 — How does loop2 point to places outside the repository that its readers cannot reach?

loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes, the list of its tasks and the rules of a task's line, by the entry that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the entries `projects`, `tasks` and `task-rules`, and no file git tracks holds an absolute path on that disk. No file git tracks names a note the author keeps outside the repository or the folder it lies in, or a file of a repository its readers cannot reach, such as the private repository of the old loop game; what a reader needs of such a source stands in the foundation or in the file itself.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, product-foundation, test-helpers

### D-393 — What keeps the simulation from using names outside the JavaScript language?

Two checks keep the simulation's files from using the page, a timer, the console or any other name that the browser or Node.js adds to those of the JavaScript language, and both stay: the compiler, which type-checks the simulation's files under a configuration of their own that covers every file of the simulation, holds the library of the language alone and no ambient types, and emits nothing; and the test of `simulation-isolation`, which keeps its whole scan of the sources and its run of the built simulation in a cut-off environment. Neither check is shortened because the other covers part of it.

- **Scope:** simulation, build-tools

### D-394 — Does the simulation keep `actionFeasible`, which the game does not call?

The simulation keeps `actionFeasible`, the function that tells whether an action can start now, though the game does not call it: tests use it as their point of observation of whether an action is allowed. A clean-up does not remove it because the game has no caller of it.

- **Scope:** simulation

### D-49 — Which port does a loop2 test give the server it starts?

Every start of the loop2 server process by a loop2 test on the machine that runs the tests gives the server, in `LOOP2_LISTEN_PORT`, a port the system names free at that start, never a fixed port. The one exception is a single test of the default address, which starts the server with neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT` set. A test giving `LOOP2_LISTEN_PORT` a value the server is to reject before it listens, and a server started inside a container a test runs, fall outside this rule.

- **Scope:** account-server, build-tools, deployment

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

### D-412 — What looks for secrets in loop2's repository?

The built-in secret scanning of GitHub, with push protection, is what looks for secrets in the repository. The CI of the repository and the one command of tests add no scanner of secrets.

- **Scope:** agent-workflow, build-tools

### D-413 — How does CI check a pull request into `main`?

On every pull request into `main`, GitHub Actions runs the one command of tests on a Linux machine, in a job named `tests`, a name that stays as it is, and no other checking command stands beside it. The workflow starts on the event `pull_request`, never on `pull_request_target`, and its token only reads and it holds no secret. No text of the request stands in a command, and no step or job lets a failing run pass.

The actions stand at the commits of their releases. The job has `.the-way` at the commit the gitlink of the repository records and never moves it to a branch of the-way, the whole history of the request's branch and of `main`, `refs/remotes/origin/HEAD` naming `main` before the one command runs, the Python that `.the-way/.python-version` declares, the Node.js release that `engines` of `package.json` asks for, and a time limit. The steps before the one command only set the machine up.

- **Scope:** agent-workflow, build-tools

### D-414 — What does a Claude Code session of loop2 show at its start where `.the-way` is not at the commit the repository pins?

At the start of a Claude Code session started in the repository root, the hook of `.claude/settings.json` compares the commit `.the-way` stands on with the commit the repository records for it, and prints nothing where they agree. Where they differ, or `.the-way` is not initialized, the hook warns the agent, in the context of the session, and the human, in a short message on the screen, each time with both commits and the repair command of the agent instructions, and it blocks nothing: the session starts and goes on as it does with no warning. The hook is a Node.js script, started by the same command on Windows, Linux and macOS, and it covers no session of Codex.

Where the check cannot run, because git fails inside the repository or the hook itself fails, the hook warns the agent and the human in the same two ways, with the reason and the repair command, and ends all the same with exit code 0. Apart from the case where the commits agree, it prints nothing only where there is nothing to compare with: git is missing, the folder the hook is installed in is no repository, or the repository pins nothing.

- **Scope:** agent-workflow

### D-347 — How does an agent learn what went wrong in the game running in the browser?

An agent learns what went wrong in the game running in the browser from what a player reads, the screen and the chronicle, and from the browser's console, through the browser it operates, with no outside service. An exception in the game shows on the screen as a sentence that something broke and goes to the console.

- **Scope:** browser-view, agent-workflow

### D-410 — What is the role of an account, who gives it and where does the server read it?

Every account has a role, `player` or `owner`, stored with the account in the account database; a new account has the role `player`, and an account of either role signs in on the same card, plays and keeps its own saved game state. The role `owner` is given and taken by the command `account-role`, run in the `loop2` container and naming the account by its email address normalized as at login, which reports that the account was made an owner or made a player, that it already was so, or that no account has that address, which changes nothing when it refuses and ends no session and stops no link, and which only a human runs on the server (D-12). The server reads the role of an account from the database at each request that depends on it and never from the session, so a role given or taken holds from the next request, and no registration, no request and no field of a request gives an account a role.

The answers that carry the account — `GET /api/account`, the login and the registration — hold `"role":"owner"` for an account with the owner role and no field `role` for an account with the role `player`.

- **Scope:** account-server, browser-view, deployment, agent-workflow

### D-411 — What does the screen of the list of accounts show, and how does it run the four operations?

The screen of the list of accounts, at `#/konta` for an account with the owner role (D-281), shows every account sorted by its email address, and for each account its address, its blocked state, its previous-save privilege and its role — the fields of `GET /api/owner/accounts`, `"email"`, `"role"`, `"blocked"` and `"previousSaveAllowed"`, and nothing more of an account. Each account has four buttons: „Zablokuj” and „Odblokuj”, which block and unblock it as D-137 gives, and „Nadaj uprawnienie do poprzedniego zapisu” and „Odbierz uprawnienie do poprzedniego zapisu”, which grant and revoke the privilege as D-400 gives; an account with the owner role has no „Zablokuj”. „Zablokuj” is a destructive button and opens a confirmation that says that the block ends the player's sessions in every browser and makes the links from emails useless, and that unblocking restores neither, and the other three operations act at once, with no confirmation.

- **Scope:** browser-view, account-server

### D-214 — When is a map run a manual run of a solved map?

A manual map run is a manual run of a solved map by the state of its map when that map run starts, and it stays one to its end, on the screen after its end and after a load. A map run restart after the completion that solved the map is such a run: it takes its equipment from nowhere and pays nothing.

- **Scope:** simulation

### D-215 — Where does the player read that a manual run of a solved map pays and takes nothing?

On the screen of a manual run of a solved map, from game minute zero until „Restart” or „Zakończ”, below the body row and the backpack and above the line „Wprawa w tym przejściu”, the line „Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.” stands in `text-secondary`.

- **Scope:** browser-view

### D-190 — What does a character's death take?

A character's death takes what it carried and pays nothing of its map run; when no resurrection is ready, it also takes all the character's practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged, except that the death of a character with no practice yet — none in any skill, no rank of branch bought and none gathered at its earning loop — takes nothing besides what it carried, leaves the generation number as it was, uses up no resurrection, ready or not, and does not stop its earning loop. The programs, the chest, the Understanding and the solved maps survive every death; the map run kept on the screen stays as it was, and a „Restart” after a death with no resurrection ready starts from the character as that death left it. The account has one resurrection, shared by all its characters: the death of a character with practice uses it up while it is ready, a death of a character with practice with none ready stops its earning loop, and it is renewed after a span of real time set in the balance data, eight hours to start, or at once by the first completion of a map the account has not solved yet, once for each map, a ready resurrection staying ready.

- **Scope:** simulation

### D-307 — What does the line of an empty trip plan say?

Where both lists of the trip plan are empty, its folded line on Programy reads „Plan wyprawy: pusty”.

- **Scope:** browser-view

### D-409 — Where does an act of the player that depends on time catch up the time?

An act of the player that depends on the passing of time goes through the store of the game state, which reads the clock and passes the time elapsed to the simulation before the act runs, so no act reads the clock itself before it calls the simulation. A new character and the purchase of a branch rank do not catch up time.

- **Scope:** browser-view

## Listed by heading alone

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
- D-12 — What access to the server does an agent have?
- D-13 — Where do the server's access values and secrets live?
- D-15 — How is loop2 recovered when a deployment goes wrong?
- D-252 — How does loop2 write its failures to its logs, and what does it log?
- D-355 — Where does the log of the running game on the server lie, how long does it live and how does an agent read it?
- D-356 — How does the operator learn that the running game failed?
- D-228 — Which failure does the database backup survive?
- D-230 — How often is a database backup made, and how many stay?
- D-231 — Where does the database backup run?
- D-232 — How is the database backup encrypted?
- D-233 — How does the operator learn that a database backup failed?
- D-234 — What does a checked restore of the database mean?
- D-238 — How does the backup script reach Mikrus Strych?
- D-360 — What does a restore of the database from a backup do about the passwords and sessions it brings back?
- D-137 — How is a player account blocked and unblocked?
- D-400 — What is the previous-save privilege and who gives it?
- D-38 — Which styleguide discipline does loop2 adopt for the browser view?
- D-396 — In which browsers and from which window size does the game have to work?
