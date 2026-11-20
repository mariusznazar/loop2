# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 32. Listed by heading alone: 49.

## Listed in full

### D-18 — Where does the game's content live?

The game's content — game maps, items, creatures, character skills and their numbers — stands in data files. A game map, an item or a creature of a kind the simulation already handles is added by a change of data alone.

- **Scope:** simulation, browser-view

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

loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes, the list of its tasks and the rules of a task's line, by the key that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the keys `projects`, `tasks` and `task-rules`, and no file git tracks holds an absolute path on that disk. No file git tracks names a note the author keeps outside the repository or the folder it lies in, or a file of a repository its readers cannot reach, such as the private repository of the old loop game; what a reader needs of such a source stands in the foundation or in the file itself.

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

Every standalone Bash script that D-31 has ShellCheck check by name stands as local pinned shfmt 3.14.1 leaves it, run on it by name with `-i 2 -bn -ci -ln bash`: two spaces of indent, `&&` and `||` of a command list at the start of a continued line and, inside `[[ … ]]`, at the end of the line before it, indented `case` branches and Bash as the language. Those flags make shfmt read no EditorConfig file, so the result depends on no file outside the repository, and shfmt 3.14.1 comes from the package `shfmt-py` 4.2.0, installed with the other quality tools by D-424. Changing a flag or the version of shfmt takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow

### D-437 — Which file is the exemplar for the code of the balance instrument?

The exemplar for kind `balance-instrument` is `balance/engine.mjs`, and its kind guidelines are read before adding or changing a file of that kind; the kind is the files of code of the balance instrument in `balance/`, and the overlay files and the player descriptions that the instrument reads are data and stand outside it. The engine runs a map run of one seed through the game's built simulation and its own functions, takes an explicit input and gives its result as data, and refuses an identifier the game's data lacks with an error that names what is missing; these illustrate the rules of the kind, without requiring every mode of the instrument to take the shape of the engine.

- **Scope:** balance-tools

### D-22 — Where does the simulation's randomness come from?

Every random draw of the simulation comes from generators seeded by the seed saved in the map run's state, one generator for each kind of draw — attacks, gathering, the map's layout and wandering among them — and the map run draws its map's layout at its start, before the first game minute, in a fixed order. A restart of a map run keeps its seed, any other map run outside an earning loop takes a new seed, and each map run of an earning loop takes its seed from a draw of the map run before it. The first map run of an earning loop, with none before it, takes a new seed, as a send of a character does.

- **Scope:** simulation

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
- D-432 — Where does the knowledge of a test that fails at random with no cause found stand?
- D-255 — Where does the data an agent checks the game on come from?
- D-256 — Does the local start keep an account between its starts?
- D-257 — Where does account mail go at the local start?
- D-258 — What does the game present to a browser at the local start?
- D-268 — What keeps a test on a document imitation from taking the machine's memory?
- D-413 — How does CI check a pull request into `main`?
- D-414 — What does a Claude Code session of loop2 show at its start where `.the-way` is not at the commit the repository pins?
- D-417 — How does an agent operate the game as a player does?
- D-418 — Where do the screenshots that a task cycle of loop2 shows the human lie, and how does the description of its request embed them?
- D-419 — Who puts a screenshot into the repository for screenshots?
- D-420 — From which session may an agent use Playwright MCP?
- D-431 — What does the local start do when another program takes the port of its server?
- D-12 — What access to the server does an agent have?
- D-13 — Where do the server's access values and secrets live?
- D-15 — How is loop2 recovered when a deployment goes wrong?
- D-252 — How does loop2 write its failures to its logs, and what does it log?
- D-253 — Which processes of loop2 have a last-resort handler of their own?
- D-347 — How does an agent learn what went wrong in the game running in the browser?
- D-355 — Where does the log of the running game on the server lie, how long does it live and how does an agent read it?
- D-356 — How does the operator learn that the running game failed?
- D-228 — Which failure does the database backup survive?
- D-230 — How often is a database backup made, and how many stay?
- D-231 — Where does the database backup run?
- D-232 — How is the database backup encrypted?
- D-233 — How does the operator learn that a database backup failed?
- D-234 — What does a checked restore of the database mean?
- D-238 — How does the backup script reach Mikrus Strych?
- D-360 — What does a restore of the database from a backup do about the passwords, sessions, blocks, roles and privileges it brings back?
- D-137 — How is a player account blocked and unblocked?
- D-410 — What is the role of an account, who gives it and where does the server read it?
- D-400 — What is the previous-save privilege and who gives it?
- D-38 — Which styleguide discipline does loop2 adopt for the browser view?
- D-396 — In which browsers and from which window size does the game have to work?
