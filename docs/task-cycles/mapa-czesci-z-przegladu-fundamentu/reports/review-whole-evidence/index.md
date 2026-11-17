# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 92. Listed by heading alone: 323.

## Listed in full

### D-237 — How is a Node.js release checked before it is deployed?

A build step of the server image's final stage, run as the server's own user on the image's own Node.js release, makes a temporary database through the server's database code, writes and reads back an account and a saved game state, makes a backup by the method of D-236 and in its one backup step, opens that backup, reads the same values and prints the release it checked, and any difference or error fails the image's build. The Node.js image stays unpinned.

- **Scope:** account-server, deployment

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

### D-412 — What looks for secrets in loop2's repository?

The built-in secret scanning of GitHub, with push protection, is what looks for secrets in the repository. The CI of the repository and the one command of tests add no scanner of secrets.

- **Scope:** agent-workflow, build-tools

### D-73 — Which testing discipline does loop2 adopt?

Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235 and D-273. Its testing rules and the recipes of its levels stand in `guidelines/testing.md`, read before writing or changing a test.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

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

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-78 — How is one test case shaped?

A new or changed test case has a name describing its behaviour and condition, and readable preparation, action and assertion phases protecting one behaviour; it may use a table of explicitly named variants of that behaviour. It neither reproduces the product algorithm nor chooses its expectation from the obtained result.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-79 — How is the npm registry response contract checked?

The npm registry has no separate contract test: the real dependency audit in the gate checks its response format under D-33. Tests of the audit use controlled responses to force errors, and an unreadable real response fails the audit.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-81 — At which levels do loop2 tests stand?

Loop2 tests stand at three levels: unit test and integration test as defined in its glossary, and smoke test in its ordinary meaning. A smoke test starts the built application through its entry point or a container and checks readiness or a simple response, without proving a complete game journey; a level follows the resources exercised, not the test directory.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-82 — Which product documents supply test expectations?

The expectation of a test comes from the loop2 foundation — its decisions, invariants and glossary — from a relation the code under test does not compute, or from a crash counted as a failure; a human's judgement is a source once a decision of the foundation holds it. What a test needs of the requirement it checks stands in the foundation, so no comment is required to name the source of a value, a test comment names as the source of an expectation no document outside the foundation — a task document and a copy of one kept in the record of a task cycle included — and a comment that carries nothing the code needs is not written.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-83 — Where are tests written and how do they enter the gate?

Tests keep Node and Python, their existing directories, and the names `*.test.mjs` and `test_*.py`. Every `*.test.mjs` file under `tests/` is selected by `npm test`, and a new `test_*.py` file is counted as covered by the gate only after its execution there is verified.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-84 — Which real mechanisms do new or changed tests exercise?

A new or changed simulation test supplies explicit state, elapsed time and seed and uses the real game random generator without waiting for game minutes on the computer. A test of file or HTTP failure uses real temporary files or a real local server, waits for a readiness event or condition with a time limit and error handling, and cleans up its files, servers and processes even after failure; polling a condition is allowed, and controlled responses test reactions to forced failures without proving the replaced operation. The HTTP helper in `tests/http.test.mjs` takes these waiting and cleanup rules when that helper changes.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-85 — Which cases are the exemplars of the test levels?

The unit exemplar is the case "the count of a hand-made backpack is the pieces of all items together" in `tests/sim/traits.test.mjs`, for explicit data and independent arithmetic, not time or a whole game. The integration exemplar is "raw and encoded traversal cannot expose files outside dist/public" in `tests/http.test.mjs`, for real requests and visible refusal, not the whole file or its timeout and cleanup helpers. The smoke exemplar is `test_occupied_address_exits_without_reporting_ready` in `tests/invariants/test_account_server_occupied_address.py`, for normal-start controls around forced refusal, not full HTTP, container or gameplay evidence.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-87 — When are whole-screen pixel comparisons used?

Whole screens are not preserved by pixel-by-pixel image comparison, while agreed appearance rules keep their checks and a changed appearance is inspected in a browser. Image comparison is reconsidered on a concrete visual defect or an agreed requirement for an exact layout; this exclusion does not cover the safety of external icons or fonts.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-88 — How are real browser events, focus and SVG checked?

Real browser events, focus and SVG rendering are checked manually after a change and are not automated; tests on a hand-made document model or on a ready-made document imitation prove only the logic they run, never real events, focus or rendering. Automation is reconsidered on a defect that such a test missed or together with the player-journey automation of D-75, and this exclusion never covers a trust boundary.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

### D-89 — Who revisits a deliberate testing exclusion?

For a change touching a category deliberately left without tests, its author and reviewer check the category's condition of return, including complete player journeys, whole-screen comparisons and real browser events, focus and SVG.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow, test-helpers

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

A deployment of loop2 changes nothing on the host but loop2's own checkout, application and connector images and containers, its named database volume `loop2_accounts`, log and lock, and the build cache and base images its builds add to the shared Docker store, which it never prunes; it removes or replaces nothing of another workload. It builds only while the host's available memory and free disk stay at or above thresholds the repository sets, and each loop2 container runs under its own memory limit. The tunnel token, session signing and SMTP password files are provisioned by the human outside the checkout and mounted read-only only to their respective consumers under D-13, while the application alone mounts `loop2_accounts` at `/app/data` for `/app/data/accounts.sqlite`, with its initial directory owned by uid/gid 1000 and the database preserved across application-container replacement and code rollback.

- **Scope:** deployment

### D-252 — How does loop2 write its failures to its logs, and what does it log?

Loop2 adopts all six rules on failures and logs of the coding template of its pinned the-way and departs from none of them. A log line of its Node.js code is one JSON object on one line, written through `console` with no library and under fixed field names, while its Bash scripts keep their own text, a line in the browser's console is plain text, and what a command prints to whoever ran it — the readiness line of the server, the sentence of `account-database-check` in the log of an image build, the report of `measure-passwords` for the script that ran it — is no log line, and where the command works on no value of a player's, as `account-database-check` does on a temporary database and `measure-passwords` on made-up passwords, its failure keeps the error's text there and gets no failure line in the log form of this decision, with `failure`, `kind`, `code` and `place`; the sentence by which `account-block`, `account-previous-save`, `account-role` or `account-backup` answers the operator is the matter of D-354. The product logs changes of a player's account and of access to it and operations that change what runs on the server or its backup, and no progress of a game and no housekeeping, and an agent adds alone an item that fits this principle, an identifier of a thing included, while anything that points to a person takes the human's consent. A change of the role of an account and each operation of the owner panel are such changes: each leaves one line with the number of the account changed, written after a change only, and no address and no number of the account of the owner who acted.

- **Scope:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow

### D-253 — Which processes of loop2 have a last-resort handler of their own?

Each process that touches the data of accounts — the server, `account-block`, `account-previous-save`, `account-role` and `account-backup` — has one last-resort handler of its own, which writes the kind, the code and the place of what no code handled, because the runtime's default print could quote values. The page in the browser has one too: it cancels the event of an error that no code handled, so that the browser prints nothing itself, and writes in the console, as plain text, one line of the kind, the code and the place of the handler, never the error's message or stack, the same line once until the page is reloaded. A script run by hand or by the test gate that touches none of those data meets the rule on the last resort through the default print of Node.js or Python, which writes what nothing handled, and `account-database-check`, `measure-passwords`, `deploy/loop2-backup` and `scripts/restore-trial.mjs` already have a last-resort handling of their own, which the sentences of this decision above ask no more of, though the last two touch those data and write no kind or code.

- **Scope:** browser-view · account-server · build-tools · deployment

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

### D-105 — How is sending account email limited?

The account server sends at most 30 account messages per hour in total and at most three per email address per hour. Above either limit no message is sent and the player is told to try later, by the sentence of D-157 for a confirmation message and, for a password-reset message, by the ending of the one answer of D-222, „Gdy wiadomość nie przyjdzie, spróbuj ponownie później.”; no monthly sending cap applies.

- **Scope:** account-server

### D-152 — How does a player sign in and reset a forgotten password?

Players register and sign in with an email address and password. They can start playing before confirming the email address; a confirmation message establishes that address for account recovery. A player resets a forgotten password by a single-use link sent to the previously confirmed email address, without operator assistance.

- **Scope:** account-server, browser-view

### D-153 — Which service delivers account emails?

The account server sends email confirmation and password-reset messages from an address under `mariusznazar.com` through the authenticated SMTP service of Mikrus Outsider available to the existing Mikrus account. Public self-service account recovery is enabled only after confirmation and password-reset messages sent from the intended container reach external inboxes in a real delivery test.

- **Scope:** account-server, deployment

### D-154 — How does the account server send email through Outsider?

The account server composes and sends email confirmation and password-reset messages through Mikrus Outsider SMTP with Nodemailer 10. The SMTP connection must upgrade to TLS; sending fails when STARTTLS cannot be established.

- **Scope:** account-server, build-tools

### D-155 — How long and how often does an emailed link work?

A link of an email confirmation message works for 24 hours and a link of a password-reset message for one hour from the moment it is recorded, each works once, and a password-reset link is spent only together with the new password. Recording a new link for an account, which comes before its message is handed to the mail service, stops in the same transaction every earlier link of the same kind for that account, so a message whose sending then fails leaves no earlier link working.

- **Scope:** account-server

### D-156 — How does an emailed link confirm a player's email address?

The link of a confirmation message is the configured public origin followed by `/#confirm-email=<token>`, its token 32 random bytes written in base64url, of which the account database keeps only the SHA-256 digest. The game page the link opens sends the token to the account server in a request meeting D-104, also without a session, and shows „Potwierdzanie adresu…” in `text-secondary`, then „Adres e-mail potwierdzony.” in `positive`, „Odnośnik jest nieważny albo wygasł.” in `warning`, or, when the request gets neither answer, the account client's sentence of its failure in `warning` with the token kept in the page's address for a reload, above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on. The server gives one and the same refusal to every token that is malformed, unknown, used, expired, of another kind or of a blocked account, and a confirmation stops every other confirmation link of the account.

- **Scope:** account-server, browser-view

### D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message?

A signed-in player whose email address is unconfirmed sees in the menu „Konto” „Adres e-mail niepotwierdzony.” in `text-secondary` and the shared button „Wyślij ponownie”, both gone once the address is confirmed. Only a signed-in player asks for another confirmation message, and it goes only to the address of that player's own account. Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending: „Wysłaliśmy odnośnik potwierdzający na <adres>.” in `text-secondary` when the message was sent, „Za dużo wiadomości. Spróbuj ponownie za godzinę.” above a limit of D-105, „Nie udało się wysłać wiadomości. Spróbuj ponownie później.” when the sending failed and the account client's sentence of its failure when the request for a message fails for another reason than an address already confirmed, the last three in `warning`, each beside „Wyślij ponownie”.

- **Scope:** browser-view, account-server

### D-158 — From whom does the email confirmation message come, and what does it say?

The email confirmation message comes from `loop2@mariusznazar.com` with the display name „loop2”, as plain text without HTML, with the subject „Potwierdź adres e-mail w loop2” and a body of four paragraphs separated by an empty line: „Ktoś — zapewne Ty — założył konto w loop2 na ten adres e-mail. Aby go potwierdzić, otwórz odnośnik:” with the link alone on the next line, „Odnośnik jest ważny przez 24 godziny i działa raz.”, „Potwierdzony adres pozwala samodzielnie zresetować zapomniane hasło.” and „Jeśli to nie Ty, zignoruj tę wiadomość.”.

- **Scope:** account-server, deployment

### D-159 — Can an account's email address change?

An account's email address is the address given at its registration, and no operation of loop2 changes it, so the confirmation of an account's address is the confirmation of that one address.

- **Scope:** account-server, browser-view

### D-161 — How does the account server count account messages against the limits of D-105?

Every account message the account server sends or attempts counts against the limits of D-105 from the moment it is recorded in the account database, before it is handed to the mail service, whatever the outcome of its sending. The count survives a restart or deployment of the server, and the limit of three for one address is counted for the account, whose address does not change (D-159).

- **Scope:** account-server

### D-162 — Which file is the exemplar for mail sending?

The exemplar for kind `mail-sending` is `src/server/account-mail.ts`, and its kind guidelines are read before adding or changing a mail-sending file. Mail sending composes account messages and submits each to the mail service, independently of HTTP and the database, within a bounded time, and reports a failure as its result rather than as an error thrown to its caller, writing no credential, token, link or message to a log.

- **Scope:** account-server

### D-163 — How is the code that talks to Mikrus Outsider's SMTP service tested?

Mikrus Outsider's SMTP service has no contract test, and no test reaches it: mail-sending code is tested as an integration test against a real SMTP server run on the loopback interface, and routes that send mail are tested with a stand-in mailer whose chosen outcomes prove the routes' reactions and not the sending. The agreement with Outsider is checked by a human who sends a message from the deployed container to an external inbox when the way messages are submitted to Outsider changes.

- **Scope:** account-server, build-tools

### D-222 — What does a request for a password-reset link answer?

Every request for a password-reset link whose address is well formed under D-99 gets one and the same answer, which leaves before any work on an account and without waiting for the mail server, so neither its content nor its time tells what became of the request; the page then shows „Jeśli to konto ma potwierdzony adres, wysłaliśmy na niego odnośnik. Gdy wiadomość nie przyjdzie, spróbuj ponownie później.” under the form „Nie pamiętam hasła”, in the look D-44 gives that answer, and the form stays with its address field empty and with „Wróć do logowania”. An address not so written gets „Podaj adres e-mail w postaci nazwa@domena.” under the field and nothing is sent: the form holds that condition, and so does the server, which refuses such an address with that sentence. Only after the answer does the server record and send a link, and only for an account with a confirmed address that is not blocked and within the limits of D-105, and a failure of that work shows only in the server's log.

- **Scope:** account-server, browser-view

### D-223 — Does a request for a password-reset link have a limit of its own per client address?

A request for a password-reset link has no limit of its own per client address, and only the limits of D-105 bound it. This holds while only the operator has accounts, and the decision is reviewed before the game's address is given to other players, if abuse has become real.

- **Scope:** account-server

### D-224 — What form does a password-reset link take?

The link of a password-reset message is the configured public origin followed by `/#reset-password=<token>`, its token 32 random bytes written in base64url, of which the account database keeps only the SHA-256 digest. The game page reads the token from the fragment of its address and sends it only with the form „Ustaw nowe hasło”, in a request meeting D-104.

- **Scope:** account-server, browser-view

### D-225 — What does the form „Ustaw nowe hasło” hold, and how does it end?

The form „Ustaw nowe hasło” holds the fields „Nowe hasło” and „Powtórz hasło” and the buttons „Ustaw hasło” and „Anuluj”, which removes the fragment of the address and opens Siedziba for a signed-in player and the account forms for a signed-out one, and the page shows it without asking the server about the link, so a player learns that a link does not work only after sending the form. After the password is set, „Hasło zmienione. Zaloguj się nowym hasłem.” stands in `positive` above the account forms and the fragment is gone; after a refusal of the link, whatever its reason, the fragment is gone and the page runs its session check and puts „Odnośnik jest nieważny albo wygasł.” in `warning` above what that leads to, the account forms or the game. No connection or a full password gate leaves the form, one sentence under it and the link working.

- **Scope:** browser-view, account-server

### D-226 — How does the route that sets a password by a link check its request and bound its password work?

`POST /api/password-reset` checks the fields of its request, then the rules of D-98, then the form of the token and whether its link works, all before any password work, so a link that does not work never reaches the password gate of D-103 and a bad password never tells whether a token works; it then hashes through that gate, with no attempt admission of D-102, and checks the link again in the transaction of D-112 that sets the password. Every token that is malformed, unknown, spent, expired, stopped, of another kind or of a blocked account gets one and the same refusal `invalid-link`, before the hashing or after it, a full password gate answers 429 `too-many-attempts`, and any other failure writes nothing, so the last two leave the link working. The route neither uses nor changes the session a request brings with it, which ends with the account's others or stays working, renewed as D-101 renews it at every request.

- **Scope:** account-server

### D-227 — Which messages does a password reset send, and what do they say?

The password-reset message comes from `loop2@mariusznazar.com` with the display name „loop2”, as plain text without HTML, with the subject „Ustaw nowe hasło w loop2” and a body of three paragraphs separated by an empty line: „Ktoś — zapewne Ty — poprosił o ustawienie nowego hasła do konta w loop2 na tym adresie e-mail. Aby je ustawić, otwórz odnośnik:” with the link alone on the next line, „Odnośnik jest ważny przez godzinę i działa raz.” and „Jeśli to nie Ty, zignoruj tę wiadomość. Hasło się nie zmieni.”. After a change of password the player gets no message about the change.

- **Scope:** account-server, deployment

### D-352 — What does a page whose game is open do when the fragment of an emailed link appears in its address?

When the fragment of an emailed link (D-156, D-224), `#confirm-email=<token>` or `#reset-password=<token>`, appears in the address of a tab whose game is open, the page reloads and then does what a page opened by that link does.

- **Scope:** browser-view

### D-210 — What does the server do with a save of the game state whose version differs from the one it holds?

The server refuses a save of the game state whose version of the shape is lower than the version of the saved game state it holds, comparing that number before the basis of D-209 and reading nothing of the game. The tab whose save it refuses so shows „Gra została zaktualizowana. Odśwież stronę.” in `warning` on the header line of D-208 and saves nothing more, while the game stays on its screen. A save it accepts whose version is higher than that of the saved game state it holds moves that saved game state to the previous save (D-399) in the transaction that writes the save, the server comparing the two numbers and reading nothing of the game.

- **Scope:** browser-view, account-server

### D-265 — What form does a shared control of the browser view have?

Each shared control in `src/browser/view/controls/` has one form, a React component, and `src/browser/styles.css` stays the one place of the look of the controls. A new screen is never written after the pattern of a module that builds its DOM elements through the DOM APIs, though it may import that module's pure functions.

The panel that stands in place of a card React took down is built outside React (D-323), and it takes the tag, the classes and the role of its warning sentence from one constant that the React component of that sentence reads too.

- **Scope:** browser-view

### D-267 — What keeps the rules of hooks and of effects in the browser view's code?

No tool guards the rules of hooks and of effects: `guidelines/coding-browser-module.md` holds them, review keeps them, and they are that a Hook is called only at the top level of a function component or of a custom Hook, before any early return and never inside a loop, a condition, a nested function or a `try`/`catch`/`finally` block; that every reactive value an Effect's code uses is declared as a dependency; that an Effect connecting to a system outside React returns a cleanup function that disconnects from it; and that an Effect serves to synchronize with such a system, never to transform data for rendering or to handle a user event. A defect of these rules that passes tests and review reopens D-29 for the human.

- **Scope:** browser-view · build-tools

### D-269 — Does the kitchen-sink page hold React?

The kitchen-sink page holds React: it shows each shared control in its React form, and `scripts/kitchen-sink.mjs` bundles it in its build step as the game's browser code is bundled, the compiler emitting the page's modules and esbuild joining them into the one file the page loads (D-263, D-266). A change of how the page is built is made in that build step and never in the script's lines that serve files.

- **Scope:** browser-view · build-tools

### D-270 — Which libraries built on React may the browser view take?

A library built on React — a package other than `react` and `react-dom` whose entry in `package-lock.json` declares a peer dependency on `react` — counts as another UI framework under D-03, whether it draws anything or not, so none stands in the browser view's code or its runtime dependencies. A task that needs one names it in this decision and lets it through the check of browser-view-framework in the same change.

- **Scope:** browser-view · build-tools

### D-280 — Which screens does the game have, and how does the player move between them?

The game has the screens Siedziba, Postać, Mapy, Programy, Wiedza and Przejście, all of one content width under one menu bar: at most 1344 px, and the full width of a narrower window. The menu bar holds at its left the game's name, which stands alone on the waiting screens (D-262), and over the game the items Siedziba, Mapy, Programy and Wiedza, with no icons, and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta {m}”, which leads to the screen of that map run, its minute being the map run's game minute as the clock in the header of that screen writes it. The name of a character on its card on Siedziba leads to the screen Postać of that character, on which the menu bar marks Siedziba, on the screen Mapy under each of its addresses the menu bar marks Mapy, and on the screen of a map run the menu bar marks no item. A player reaches a first map run from Siedziba in at most three clicks: the choice of a map, the map's row and „Wejdź”.

An account with the owner role (D-410) has one more screen, the list of accounts (D-411), of the same content width, which is no item of the bar: the menu „Konto” of such an account holds, after the address and before its buttons, the link „Panel właściciela” to `#/konta` (D-281). The items of the bar and the bar itself are the same for a player and for an account with the owner role, and the menu „Konto” of a player holds no such link.

- **Scope:** browser-view

### D-281 — How does an address name a screen?

An address names a screen in the fragment after `#`: `#/`, `#/postac/{n}`, `#/mapy`, `#/mapy/{map}`, `#/programy`, `#/programy/{n}`, `#/wiedza` and `#/postac/{n}/przejscie`, {n} being the number of a character (D-56) or of a program (D-165), {map} the identifier of a map (D-332) and the last address naming a map run by the number of its character, and an address that leads to no existing screen silently opens the nearest one: `#/postac/{n}/przejscie` with no map run the screen Postać of that character, `#/programy/{n}` with no such program `#/programy`, and any other Siedziba, the address of a map that is not on the list of open maps included. The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself. The fragments of emailed links (D-156, D-224) stand apart from these, and after them the page opens Siedziba.

`#/konta` names the screen of the list of accounts (D-411) for an account with the owner role; for any other account it leads to no existing screen, falls under „any other” and opens Siedziba.

- **Scope:** browser-view

### D-282 — What do the screens leave room for from the start?

Each column of a screen is an area of its own that a narrower layout can rearrange, Siedziba draws the team as a section with a heading, and the rule panel offers its pick in steps, the action first and its target after it.

- **Scope:** browser-view

### D-285 — How does the menu „Konto” open and close?

The menu „Konto” opens on a click and from the keyboard, and closes on Escape, on a click outside it and on a second click on „Konto”; after Escape and after a second click on „Konto” focus returns to „Konto”, after a click outside it focus stays where the player clicked, and where that place takes no focus it returns to „Konto”. It stays open while „Wyloguj” or „Wyślij ponownie” waits for the server, and after the answer until the player closes it, so the sentence of the outcome can be read.

- **Scope:** browser-view

### D-286 — How long does the page's sentence stand above the game?

A sentence the page puts above the game, such as „Adres e-mail potwierdzony.” or the sentence of a discarded saved game state, stands above the first screen the game opens on and leaves at the first change of screen.

- **Scope:** browser-view

### D-323 — What does the game do, and what does the player read, after an error that no code of the game handled?

After an error that no code of the game handled, an exception or a rejected promise, the game state held in the page changes no more until the page is reloaded, and saving goes on as D-207, D-208 and D-97 give it, sending the last whole game state from before the error, which it reads without a new reading of the clock; the page builds no game until it is reloaded, so a sign-in, whatever load or kept game state it leads to, stays at the waiting screen with the sentence, and the catch-up of D-247 and the send of the state kept by D-211 do not run. Until the page is reloaded the sentence „Coś w grze się zepsuło — odśwież stronę.” stands once, in `warning`: on a screen with the header, a game screen or a waiting screen, in the row under the menu bar beside the sentence of a failed save, on the screen of the login card in the card under the form, and, where React takes the card down, alone in the card's place (D-262), and at the waiting screen where a sign-in after the error stays it stands alone, with no „Sprawdzanie logowania…” beside it. The page writes the line of the error as D-253 gives it.

After an error that no code of the game handled, every decision about the game that goes on gives way to this one.

- **Scope:** browser-view

### D-395 — What does a shared control of the browser view know of the screens that use it?

A shared control in `src/browser/view/controls/` imports no module of a screen that uses it, and a rule that belongs to one screen, such as the rule of the numbers a field takes, the control receives from that screen.

- **Scope:** browser-view

### D-407 — Does the browser view keep a React root for each screen, and where does its state live?

The browser view keeps React roots of its own for each screen, for the menu bar and for each place of the page that shows something besides the game — the waiting screen and the rows of sentences — none shared, and no single root over the whole view. The game state lives in a store outside React and the state of the screen Przejście, which is the question „Zapisać, odrzucić, wrócić?” and the end-of-run window, in a module of its own outside React; memory several screens share is a memory of the page, given to the factories of the screens and read through `useSyncExternalStore`, and the state of one screen lives in the component of that screen. The screen Przejście and its program panel read the question and the window from the state of the screen Przejście, and the game view calls no method of either to show them.

The rows of sentences are three roots, the row of the failure, the row of saving and the sentences above the game, and the row of the failure holds nothing else, is drawn when the page starts and is shown by the page at the error without a render, so that an error in the drawing of another root cannot take down the sentence of D-323.

- **Scope:** browser-view

### D-408 — What does a new screen of the game add, and where?

A new screen of the game is added as a module of its own, one entry in the registry of screens, its address and its position on the menu bar. No function the game view shares between its screens names the new screen, and its entry is one line of the table the registry is made from. A new screen also adds its stylesheet, a file of its own directly in `src/browser/`, and the `<link>` of its own in `src/browser/index.html` that gives the file to the player (D-421).

- **Scope:** browser-view

### D-411 — What does the screen of the list of accounts show, and how does it run the four operations?

The screen of the list of accounts, at `#/konta` for an account with the owner role (D-281), shows every account sorted by its email address, and for each account its address, its blocked state, its previous-save privilege and its role — the fields of `GET /api/owner/accounts`, `"email"`, `"role"`, `"blocked"` and `"previousSaveAllowed"`, and nothing more of an account. Each account has four buttons: „Zablokuj” and „Odblokuj”, which block and unblock it as D-137 gives, and „Nadaj uprawnienie do poprzedniego zapisu” and „Odbierz uprawnienie do poprzedniego zapisu”, which grant and revoke the privilege as D-400 gives; an account with the owner role has no „Zablokuj”. „Zablokuj” is a destructive button and opens a confirmation that says that the block ends the player's sessions in every browser and makes the links from emails useless, and that unblocking restores neither, and the other three operations act at once, with no confirmation.

- **Scope:** browser-view, account-server

### D-416 — What does the screen Wiedza show?

The screen Wiedza shows the actions, items and creatures in the Understanding and the skill trees to read, with no levels and no buying. Its left area is as in the predecessor game, loop: the heading „Zrozumienie” with the counter „{n} poznanych rzeczy”, three groups „Czynności · {n}”, „Przedmioty · {n}” and „Stworzenia · {n}”, each in the order of discovery with the newest thing last, a group with no thing standing nowhere, the campfire standing among the items, and no sentence for an empty area. Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data, the wolf the icon `wolf-head` from game-icons.net, as in loop. Its right area has the heading „Umiejętności” with the counter „{n} drzew”, the trees the player knows in the order of the data, each a folded row with its name and „{n} gałęzi”, opened by a click or the keyboard, and an open tree shows each branch with its name, „{n} stopni”, its description from the data and the prices of all its steps in turn; each entering of the screen starts with the trees folded, and before the first known tree the area stands nowhere.

The counter „{n} poznanych rzeczy” counts the actions, items and creatures together, with no condition and no tree. The counters of the screen decline by the number, as in loop: „1 poznana rzecz”, „3 poznane rzeczy”, „13 poznanych rzeczy”, „1 drzewo”, „3 drzewa”, „8 drzew”, „1 gałąź”, „3 gałęzie”, „1 stopień”, „3 stopnie”.

- **Scope:** browser-view

### D-421 — Which stylesheets does the browser view have, and what does each hold?

`src/browser/styles.css` stays the shared stylesheet of the game, the game's stylesheet of D-47 and D-265 that keeps the one `:focus-visible` rule: it holds the base rules, that rule, the menu bar, the rows of sentences, the shared controls and the rules of what the kitchen-sink page draws besides the controls — the drawing of the map (`terrain-drawing`), the table of tiles (`tile-list`), the form (`form`) and the block of the account menu (`account-menu-block`). It holds also the common layout of the screens — the place of the screens (`.app-main`, `.screen`, `.screen-area`) and the columns of Programy, Mapy and Wiedza with their `@media` — and each rule that the elements of several screens need, that cannot be divided without changing its text and that belongs to no part with a stylesheet of its own, as the rules of the credits that name the login card and Siedziba belong to `credits.css`: a rule whose selector list names classes of more than one screen, or the rule of a sentence that several screens draw, which today are, besides those columns, the sentence `trip-warning` and the animation of the frames of the sprites of the scene and of the camp. Each screen and every other part that several screens use has a stylesheet of its own, a `.css` file directly in `src/browser/`, which a `<link>` of its own in `src/browser/index.html` gives to the player and which the build copies as it copies the other files of that kind, with no change of the build; the kitchen-sink page links the file of design tokens, `src/browser/styles.css` and its own stylesheet alone.

- **Scope:** browser-view

### D-46 — Which fonts does the browser view use, and where do they come from?

The fonts of the browser view are Geist and Geist Mono, whose web-font files and licence file are taken from a release of github.com/vercel/geist-font into `assets/fonts/`, outside the directory the account and save server serves, and copied into that directory when the application is built. The game loads fonts only from those files, never from another server, and sets the chronicle and the clock of the map run in Geist Mono and every other text in Geist.

- **Scope:** browser-view, build-tools, deployment

### D-332 — What does {map} name in `#/mapy/{map}`?

In `#/mapy/{map}`, {map} is the identifier of the map in the game's data as it stands, such as `#/mapy/forestDeep`, and the address is built from the map's data.

- **Scope:** browser-view

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
- D-263 — Which tool bundles the browser's code?
- D-266 — Where does the output of the browser's compilation stand?
- D-49 — Which port does a loop2 test give the server it starts?
- D-94 — Where does loop2 use a mutation testing tool?
- D-95 — When is the mutation testing tool removed?
- D-255 — Where does the data an agent checks the game on come from?
- D-256 — Does the local start keep an account between its starts?
- D-257 — Where does account mail go at the local start?
- D-258 — What does the game present to a browser at the local start?
- D-264 — What does a test of a screen built with React run on?
- D-268 — What keeps a test on a document imitation from taking the machine's memory?
- D-390 — Who starts Docker Desktop when a test of the gate needs a Docker daemon that does not answer?
- D-391 — What becomes of the Docker Desktop that the gate started, once the run is over?
- D-392 — Does the gate start Docker Desktop only where the free memory of the computer allows?
- D-405 — In which order does the full gate run its stages, and where does it stop?
- D-406 — Does the full gate run the directories of Python tests one after another or at the same time?
- D-413 — How does CI check a pull request into `main`?
- D-414 — What does a Claude Code session of loop2 show at its start where `.the-way` is not at the commit the repository pins?
- D-417 — How does an agent operate the game as a player does?
- D-418 — Where do the screenshots that a task cycle of loop2 shows the human lie, and how does the description of its request embed them?
- D-419 — Who puts a screenshot into the repository for screenshots?
- D-420 — From which session may an agent use Playwright MCP?
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
- D-203 — What happens to unsaved progress when a session expires?
- D-204 — How does the browser exchange saved game states with the server?
- D-205 — Where are player accounts and saved game states stored?
- D-206 — What happens to a saved game state of another version?
- D-207 — When does the game save the game state on the server?
- D-208 — What does the player see of saving the game state?
- D-209 — Which browser's save of the game state does the server accept?
- D-211 — What does the player see when a save of the game state finds no session?
- D-212 — How does a manual map run come back from a loaded saved game state?
- D-386 — Which game states does the load of a saved game state admit?
- D-399 — Which saved game state does the server keep beside the current one?
- D-400 — What is the previous-save privilege and who gives it?
- D-401 — How does an account with the privilege pull the programs of its previous save?
- D-402 — How does an account with the privilege start the game from zero?
- D-403 — What does the load do with a saved game state whose Understanding lacks „Eksploruj”?
- D-27 — Where do the game's icons come from?
- D-38 — Which styleguide discipline does loop2 adopt for the browser view?
- D-39 — What do the signal colours of the browser view mean?
- D-40 — What do the neutral roles of the browser view mean?
- D-41 — What do the roles of the terrain grid and of keyboard focus mean?
- D-42 — Which accessibility requirements does the browser view keep?
- D-43 — What counts in the browser view as a value written in place of a design token?
- D-44 — Which controls do the screens of the browser view build on?
- D-45 — Where does the browser view's kitchen-sink page stand?
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
- D-378 — Can a program of the closed lists keep the mage alive on Las?
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
- D-333 — How are the numbers of the card of a map counted, and where?
- D-389 — What does the camp at the top of Siedziba show, and how does it stand and move?
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
