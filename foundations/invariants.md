# Invariants

An invariant whose method is `test` is checked by a test of this repository; in a fresh checkout run `npm ci` from the repository root before the tests.

## account-server-runtime

The account and save server's TypeScript source and deployment use Node.js major version 24.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-01
- **Part:** every
- **Violated:** no

## account-server-typecheck

The account and save server's TypeScript types are checked before deployment.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-01
- **Part:** every
- **Violated:** no

## account-server-express-http

The account and save server handles its HTTP routes and responses through Express 5.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-02
- **Part:** every
- **Violated:** no

## browser-view-framework

The browser view uses TypeScript and browser APIs to render its screens, with no UI framework in its code or runtime dependencies.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-03
- **Part:** every
- **Violated:** no

## loop2-api-error-route

An unmatched `/api/` request receives an API error response, never the built game's HTML page.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-05
- **Part:** every
- **Violated:** no

## loop2-one-serving-process

One Express 5 process in the loop2 container serves both the built game and `/api/` account and save requests.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-05
- **Part:** every
- **Violated:** no

## application-build-output

Building the application compiles both the browser and the server TypeScript configurations.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-06
- **Part:** build-tools · browser-view · simulation · account-server
- **Violated:** no

## application-package-layout

The browser and server use a single shared npm package and lockfile, with no separate application package for either side.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-06
- **Part:** build-tools · browser-view · simulation · account-server
- **Violated:** no

## application-build-layout

The browser and server have distinct TypeScript compilation configurations and output directories.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-06
- **Part:** build-tools · browser-view · simulation · account-server
- **Violated:** no

## account-server-occupied-address

When the account and save server's listening address is already in use, the server process exits with a non-zero code without printing its readiness line `Loop: <address>`.

- **Method:** test
- **Rests on:** none
- **Derives from:** recovered from code — src/server/main.ts, the server's `error` handler, which prints the failure and sets exit code 1, while the readiness line is printed only on `listening`; tests/startup.test.mjs, the test "exits with an error instead of reporting ready when its listening port is occupied"
- **Part:** account-server · build-tools
- **Violated:** no

## loop2-container-isolation

The loop2 instance runs in a container separate from the existing loop instance.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-08
- **Part:** every
- **Violated:** no

## loop2-distinct-address

The public address of loop2 differs from `kantarion.bieda.it`.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-08
- **Part:** every
- **Violated:** no

## loop2-deploy-trigger-input

The deployment command the automation's key runs refuses every input but one commit name of 40 lowercase hexadecimal characters before it fetches, builds or changes a container, and deploys only a commit that belongs to `main` as just fetched.

- **Method:** test
- **Rests on:** openssh-authorized-keys-options
- **Derives from:** D-09 · D-11
- **Part:** deployment
- **Violated:** no

## loop2-deploy-keeps-running

A deployment that stops before it starts the new containers — at its input, the commit, the lock, the reading of memory and disk, the fetch, the checkout, the type check or the build — leaves the running loop2 containers in service.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-15
- **Part:** deployment
- **Violated:** no

## loop2-application-port

The application port is inaccessible from the Internet outside Cloudflare.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-10
- **Part:** deployment
- **Violated:** no

## loop2-host-sharing

A deployment of loop2 stops, removes, replaces or reconfigures no container, image, network or volume on the host other than loop2's own, and neither loop2 Compose service asks the host for a privilege a default container lacks apart from the connector's read-only tunnel-token grant and the application's read-only session-key and SMTP-password grants under D-13 and its own named account-database volume under D-17.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-17
- **Part:** deployment
- **Violated:** no

## map-run-repeatability

Two simulations of one program from one starting game state with one seed give the same map run,
game minute by game minute, when they receive the same real-time inputs.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-22
- **Part:** every
- **Violated:** no

## simulation-randomness

No file of the simulation draws a random number from any source other than the generator seeded
from the map run's state.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-22
- **Part:** every
- **Violated:** no

## action-in-progress

The character's action in progress lasts its full duration unless its map run ends first or an attack interrupts it, even where
the program changes or the condition of another program rule comes to hold before it ends.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-20 · D-23 · D-140
- **Part:** simulation
- **Violated:** no

## player-map-run-pace

Real time passed to the simulation for a map run the player starts moves the map run on, until it
ends, by one game minute for each whole 1/pace of a real second passed while it is not paused, at
the pace in force when that real time is passed — at 16×, for each whole sixteenth of a second — an
incomplete rest carrying over to the next real time passed, and by no game minute for real time
passed while it is paused, and a game minute in which something is discovered leaves the map run
paused unless the map run ends in it, the real time passed in the same call beyond that game minute
moving it on by no game minute.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-21 · D-118 · D-122
- **Part:** simulation
- **Violated:** no

## simulation-isolation

No file of the simulation imports a file from outside the simulation, or uses the page, a timer,
the system time or a global object that the browser or Node.js adds to those of the JavaScript
language.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-04
- **Part:** simulation
- **Violated:** no

## simulation-inputs

No function that a file of the simulation exports changes a value passed to it.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-04
- **Part:** simulation
- **Violated:** no

## content-identifiers

No TypeScript file under `src/browser/` outside `src/browser/sim/data/` names a game map, a
resource or an archetype, outside its comments, by the identifier or the name that the files of
`src/browser/sim/data/` give it.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-18
- **Part:** simulation · browser-view
- **Violated:** no

## program-rule-pick

In each free game minute of a map run and immediately before the character's action in each combat turn, the character starts to carry out the first program rule
whose condition and action, with the target of each, lie in the character's repertoire, whose
condition holds and whose action the character can carry out then, taking rule groups in order and
the program rules within each in order, passing over a group whose condition or its target lies
outside the character's repertoire, whose condition does not hold or which holds no such program
rule, carries out no program rule where no group offers one, and leaves every program rule and group
it passes over in the program.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-23 · D-126 · D-127
- **Part:** simulation
- **Violated:** no

## exploring-reveal

A program rule that explores reveals the tile the character stands on when the exploring ends, and
the character cannot carry it out on a revealed tile.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-25
- **Part:** simulation
- **Violated:** no

## move-reach

Every move of the character ends with the character on a tile neighbouring the tile the move
started from.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-25
- **Part:** simulation
- **Violated:** no

## walk-target

A program rule that goes to a resource takes the character one move toward one of the revealed
tiles holding some of that resource that lie nearest in game minutes of walking.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-26
- **Part:** simulation
- **Violated:** no

## map-run-tiles

When a map run starts, each tile holds, of each resource on its game map's list of resources,
either none or the stock per tile that the game map's data gives, and holds no resource missing
from that list.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-24
- **Part:** simulation
- **Violated:** no

## restart-seed

A map run restart has the seed of the map run it replaces.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-22
- **Part:** simulation
- **Violated:** no

## icon-file-content

No SVG file directly in `assets/icons/` holds a `script` or `foreignObject` SVG element, an attribute whose
name begins with `on`, or a reference to anything outside the file other than the SVG and XLink
namespace declarations.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-27
- **Part:** browser-view
- **Violated:** no

## icon-credits

For each SVG icon file directly in `assets/icons/`, the game's footer shows a credit that names
the icon's title as its page on game-icons.net gives it, the icon's author, that page and the
licence CC BY 3.0, and says how the icon file differs from its source.

- **Method:** test
- **Rests on:** game-icons-licence · game-icons-wood-stick-title · game-icons-berry-bush-title · game-icons-fern-title · game-icons-flax-title · game-icons-campfire-title
- **Derives from:** D-27
- **Part:** browser-view · simulation
- **Violated:** no

## loop2-container-icons

The loop2 container built from the repository serves each SVG icon file directly in
`assets/icons/` at the path `/icons/<file name>`, with the same bytes as that icon file.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-27
- **Part:** browser-view · build-tools · account-server · deployment
- **Violated:** no

## terrain-drawing-numbers

The terrain panel's drawing of the game map shows no number of the stock a tile holds.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-19
- **Part:** browser-view
- **Violated:** no

## program-closed-lists

The simulation refuses a program holding a condition or an action of the character whose kind the
data files of `src/browser/sim/data/` do not list.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-23
- **Part:** simulation
- **Violated:** no

## walk-feasibility

The character can carry out a program rule that goes to a resource where some revealed tile holds
some of that resource and the character does not stand on one that does, and nowhere else.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-26
- **Part:** simulation
- **Violated:** no

## program-world-reference

A program the simulation holds names a thing of the world only by its kind, never by a number or a
position of its own.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-26
- **Part:** simulation
- **Violated:** no

## map-run-layout

Two map runs of one game map on one seed have the same kinds of resource present on each tile,
whatever their amounts, at every game minute, whatever programs they run under.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-22
- **Part:** simulation
- **Violated:** no

## eslint-source-rules

No file `eslint.config.mjs` matches breaks a rule that configuration applies or carries an inline configuration comment, as ESLint 10.12.0 reports them at error or warning, whatever bulk-suppressions file stands in the repository.

- **Method:** test
- **Rests on:** eslint-recommended-rules · typescript-eslint-typechecked-rules
- **Derives from:** D-29
- **Part:** browser-view · simulation · account-server · build-tools
- **Violated:** no

## ruff-source-rules

No `.py` or `.pyi` file Ruff 0.17.1 finds under `ruff.toml` breaks a rule that file selects, whatever suppression comment it carries.

- **Method:** test
- **Rests on:** ruff-default-rules
- **Derives from:** D-30
- **Part:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow
- **Violated:** no

## shellcheck-source-rules

No Bash script the test of this invariant names gets a ShellCheck 0.11.0 report at any severity, with rc files ignored, Bash as its shell and extended analysis on.

- **Method:** test
- **Rests on:** shellcheck-default-bash-checks
- **Derives from:** D-31
- **Part:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow
- **Violated:** no

## prettier-source-format

Every file the patterns of this invariant's test match stands as Prettier 3.9.10 leaves it with its default options, LF line endings included.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-32
- **Part:** browser-view · simulation · account-server · build-tools · deployment
- **Violated:** no

## introduced-npm-vulnerabilities

The npm audit of `package-lock.json` reports no advisory of low, moderate, high or critical severity that the audit of its version at {fork-point} does not report, as the npm/GitHub Advisory Database stands when the check runs.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-33
- **Part:** build-tools
- **Violated:** no

## browser-view-token-values

No file of the part browser-view other than `src/browser/tokens.css` holds in its text a value written in place of a design token, as D-43 defines it.

- **Method:** test
- **Rests on:** css-colour-values · css-font-family-names · css-wide-keywords
- **Derives from:** D-43
- **Part:** browser-view
- **Violated:** no

## browser-view-focus-outline

In the stylesheets of the part browser-view, `outline` and the `outline-*` properties are declared only in rules whose selector is `:focus-visible` or, in `src/browser/kitchen-sink/kitchen-sink.css` alone, `:focus-visible` and one more selector, that of the page's sample of the focused state, each such rule drawing the outline from the role `focus`, and `src/browser/styles.css` holds such a rule whose selector is `:focus-visible` alone.

- **Method:** test
- **Rests on:** wcag-focus-visible
- **Derives from:** D-42 · D-47
- **Part:** browser-view
- **Violated:** no

## design-token-contrast

In `src/browser/tokens.css`, each of `text-strong`, `text`, `text-secondary`, `text-label`, `positive`, `warning`, `danger`, `discovery` and `player-change` has a contrast ratio of at least 4.5:1 against each of `page`, `panel` and `highlight`, `control-border` and `focus` have at least 3:1 against each of those three, `character` has at least 3:1 against `tile-revealed` and against `tile-hidden`, and `tile-revealed` has at least 3:1 against `tile-hidden`, each ratio computed from the values of those roles as WCAG 2.2 defines the contrast ratio.

- **Method:** test
- **Rests on:** wcag-text-contrast · wcag-non-text-contrast · wcag-contrast-ratio
- **Derives from:** D-39 · D-40 · D-41 · D-42
- **Part:** browser-view
- **Violated:** no

## design-token-sources

The text of `src/browser/tokens.css` holds no rule but one `:root` rule of custom properties and `@font-face` rules, and each of their declarations is followed on the line of the `;` that ends it, with nothing but spaces or tabs between, by a comment opening with `Source:` and some further text.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-38
- **Part:** browser-view
- **Violated:** no

## application-build-kitchen-sink

Nothing `npm run build` writes holds the kitchen-sink page of the browser view or code compiled from `src/browser/kitchen-sink/`.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-45
- **Part:** build-tools · browser-view
- **Violated:** no

## account-server-default-address

After startup configuration and required resources validate under D-111, including wholly unconfigured non-production and fully configured valid startup, the account and save server started with neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT` set either prints its readiness line `Loop: http://127.0.0.1:3000` or exits with a non-zero code and a message naming `127.0.0.1:3000` as an address already in use.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-111
- **Part:** account-server · build-tools
- **Violated:** no

## character-team

Every character belongs to exactly one team.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-50
- **Part:** every
- **Violated:** no

## minute-span-split

A map run advanced by a span of game minutes reaches the same game state, with the same events in the same order, at every game minute, however the span is split into calls of the simulation, up to and including the game minute in which the map run ends or something is discovered.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-04 · D-71 · D-118
- **Part:** simulation
- **Violated:** no

## public-file-access

A request for a file outside the public directory, using a raw or encoded path, receives 400, 403 or 404 with neither that file's content nor the game's page.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-86
- **Part:** account-server
- **Violated:** no

## dependency-audit-refusal

The dependency audit fails when its request fails, its report is unreadable, or it reports a blocking advisory absent from the lockfile at "{fork-point}".

- **Method:** test
- **Rests on:** none
- **Derives from:** D-33
- **Part:** build-tools
- **Violated:** no

## font-file-provenance

Font files in `assets/fonts/` come only from a release of github.com/vercel/geist-font.

- **Method:** review
- **Rests on:** none
- **Derives from:** D-46
- **Part:** browser-view
- **Violated:** no

## preview-server-access

The interface preview server serves only files from `dist/kitchen-sink/` and only on the developer's machine.

- **Method:** review
- **Rests on:** none
- **Derives from:** D-45
- **Part:** build-tools
- **Violated:** no

## node-test-selection

Every `*.test.mjs` file under `tests/` is selected for execution by `npm test`.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-83
- **Part:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow
- **Violated:** no

## focused-test-execution

A focused gate run fails if it executes no test or receives a file that is not a test file.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-77
- **Part:** build-tools
- **Violated:** no

## mutation-test-selection

The StrykerJS configuration lists every `tests/sim/*.test.mjs` file except `rules.test.mjs`.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-94
- **Part:** build-tools
- **Violated:** no

## player-self-registration

Anyone can create a player account and begin playing without operator approval.

- **Method:** review
- **Rests on:** none
- **Derives from:** D-96 · D-202
- **Part:** account-server · browser-view
- **Violated:** no

## player-password-login

Player accounts sign in with an email address and password.

- **Method:** review
- **Rests on:** none
- **Derives from:** D-96 · D-152
- **Part:** account-server · browser-view
- **Violated:** no

## email-verification-nonblocking

A player can start playing after registration before confirming their email address.

- **Method:** review
- **Rests on:** none
- **Derives from:** D-96 · D-152
- **Part:** account-server · browser-view
- **Violated:** no

## player-argon2-password-hash

The account server stores an encoded Argon2id hash made by the `argon2` package for each player password and verifies login passwords through that package.

- **Method:** test
- **Rests on:** argon2-password-api
- **Derives from:** D-106
- **Part:** account-server · build-tools
- **Violated:** no

## player-argon2-deployment-check

The deployed loop2 container image has passed, after warmup, at least 20 hashes and 20 verifications with the configured Argon2id cost settings two at a time, a correct and a wrong password check and the refusal of a third concurrent operation in a container limited, without swap, to at most 80% of its 512 MiB deployment limit, which did not restart and whose cgroup counted no hit of that limit and no out-of-memory kill.

- **Method:** review
- **Rests on:** cgroup-memory-accounting
- **Derives from:** D-106
- **Part:** account-server · build-tools · deployment
- **Violated:** no

## password-operation-gate

Password hashing and verification share a gate that admits at most two active native operations, refuses excess work without waiting, and releases each slot after success or failure.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-103 · D-113
- **Part:** account-server · build-tools
- **Violated:** no

## player-opaque-session-cookie

The browser carries a random session identifier in a loop2 host-scoped, Secure and HttpOnly cookie.

- **Method:** test
- **Rests on:** express-session-cookie-lifecycle · session-secret-rotation · session-proxy-security
- **Derives from:** D-101 · D-138
- **Part:** account-server · browser-view · deployment
- **Violated:** no

## player-express-session-sqlite-store

The deployed account server uses `express-session` with a project-owned Store backed by `node:sqlite` for player sessions, not its default `MemoryStore`.

- **Method:** review
- **Rests on:** express-session-store-contract · node-sqlite-database
- **Derives from:** D-107
- **Part:** account-server · build-tools · deployment
- **Violated:** no

## account-save-durable-storage

Replacing the application container preserves the SQLite database of player accounts and saved game states.

- **Method:** review
- **Rests on:** docker-volume-lifecycle
- **Derives from:** D-17 · D-205
- **Part:** account-server · deployment
- **Violated:** no

## account-save-sqlite-access

The account and save server accesses its SQLite database through Node.js's built-in `node:sqlite` module rather than an external SQLite driver.

- **Method:** review
- **Rests on:** node-sqlite-database
- **Derives from:** C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md § Projected foundation changes, account-save-sqlite-access/1 — "The account and save server accesses its SQLite database through Node.js's built-in `node:sqlite` module rather than an external SQLite driver."; read 2026-10-26
- **Part:** account-server · build-tools · deployment
- **Violated:** no

## loop2-shared-public-origin

The browser loads the built game and sends account and save requests to relative `/api/` paths at the same public HTTPS origin.

- **Method:** review
- **Rests on:** fetch-same-origin-credentials
- **Derives from:** D-108
- **Part:** browser-view · account-server · deployment
- **Violated:** no

## account-session-authorization

The account API returns JSON 401 for `GET /api/account` and `GET /api/saved-game`, and for `PUT /api/saved-game`, `POST /api/email-confirmation-message` and `POST /api/logout` that meet the Origin, media-type and body requirements, without a valid server-side session, and an account identifier or email address supplied by the caller cannot authorize reading or changing another account or session or direct a message to another address.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-109
- **Part:** account-server
- **Violated:** no

## account-mutation-request-guards

Every state-changing account route, the save route `PUT /api/saved-game` included, refuses a missing, duplicate, malformed or nonmatching Origin and a non-JSON, compressed or structurally invalid body or one over that route's body limit of D-104 before password work or mutation.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-104
- **Part:** account-server
- **Violated:** no

## account-request-transport

An account request in cloudflare-tunnel mode with missing, duplicate, list or malformed forwarded protocol or canonical client-IP metadata is refused before session authorization or password work, and an attacker-selected forwarded chain cannot replace the canonical limiter identity.

- **Method:** test
- **Rests on:** express-forwarded-protocol · session-proxy-security · cloudflare-client-address · cloudflare-forwarded-protocol
- **Derives from:** D-110
- **Part:** account-server · deployment
- **Violated:** no

## account-startup-configuration

Production startup without all valid account settings and every startup with partial or invalid explicit account settings exits nonzero before listening or printing readiness.

- **Method:** test
- **Rests on:** session-secret-rotation
- **Derives from:** D-111
- **Part:** account-server · deployment · build-tools
- **Violated:** no

## account-schema-lifecycle

Opening the account database initializes a new schema transactionally, moves an existing older known schema to the current version in one transaction keeping its accounts, sessions and saved game states, and refuses a newer unknown schema before readiness.

- **Method:** test
- **Rests on:** node-sqlite-database
- **Derives from:** D-112
- **Part:** account-server · deployment
- **Violated:** no

## account-database-schema

Opening an account database initializes the current schema version atomically, moves an existing older known version to it atomically with every account, session and saved game state and their values kept, preserves them on reopen, and rejects an unknown newer schema without changing its version or records.

- **Method:** test
- **Rests on:** node-sqlite-database
- **Derives from:** D-112
- **Part:** account-server
- **Violated:** no

## account-session-storage

The SQLite session Store returns only valid stored account identity and cookie data for unexpired records, stores no session for a blocked account, and renewal preserves identity and the later expiry without recreating removed or expired sessions.

- **Method:** test
- **Rests on:** express-session-store-contract · node-sqlite-database · express-session-cookie-lifecycle · cookie-serialization-validation · sqlite-wal-concurrency
- **Derives from:** D-112 · D-115
- **Part:** account-server
- **Violated:** no

## account-attempt-limits

The account server refuses before password work a login for an email address with five failed or unsettled logins in the last 15 minutes since its last successful login or within 15 minutes of its fifth failure, a login from a client address with twenty failed or unsettled logins in the last 15 minutes and a registration from a client address with five created or unsettled accounts in the last hour, and settles each admitted attempt only after the password work it started has completed, whether or not its client is still connected.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-102 · D-103 · D-116
- **Part:** account-server
- **Violated:** no

## account-attempt-tracking

When the account server's table of tracked email or client-address keys is full of live entries, an attempt that needs a new key is refused without evicting a live entry, and entries whose histories, locks and reservations have all ended release their place.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-103 · D-116
- **Part:** account-server
- **Violated:** no

## account-client-requests

The browser account client sends each account request to one of the relative `/api/` account paths with the method and JSON body that route takes, and follows no redirect.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-108 · D-117
- **Part:** browser-view
- **Violated:** no

## account-client-outcomes

The browser account client returns an account only for the success status of its request with a body holding a non-empty string `id` and `email` and a boolean `emailConfirmed`, and returns every other answer, a failed connection and an answer not complete within its time limit as a failure.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-117
- **Part:** browser-view
- **Violated:** no

## streak-program-change

A change of the program rules or rule groups of the copy a map run carries out, and every switch of the character to another program during the map run, to one holding the same rules included, sets the streak of that map run to zero, on every map.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-131 · D-136
- **Part:** every
- **Violated:** no

## saved-program-edit

An edit of a saved program during a map run leaves the copy the map run carries out, the map run's streak and the firing counts of the copy's program rules as they were.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-164 · D-131 · D-93
- **Part:** simulation · browser-view
- **Violated:** no

## copy-save

„Zapisz w programie” and „Zapisz jako nowy program” leave the content of the copy a map run carries out and the map run's streak as they were, and „Zapisz jako nowy program” is no switch of the character to another program.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-164 · D-171 · D-131
- **Part:** simulation · browser-view
- **Violated:** no

## blocked-account-access

A blocked account cannot sign in or use authenticated game endpoints.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-137 · D-139 · D-202
- **Part:** account-server
- **Violated:** no

## player-server-session

The account server validates authenticated requests against a server-side SQLite session record and invalidates that record on logout or account blocking.

- **Method:** test
- **Rests on:** node-sqlite-database · sqlite-wal-concurrency
- **Derives from:** D-138 · D-137
- **Part:** account-server
- **Violated:** no

## unblock-restores-no-session

A session removed when its account was blocked authorizes no request after the account is unblocked.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-137
- **Part:** account-server
- **Violated:** no

## email-confirmation-link

An emailed confirmation link confirms its account's address only once, only before its expiry, only until a later confirmation link of its account has been recorded, and only while its account is not blocked, and a link it refuses changes nothing.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-155 · D-156 · D-160
- **Part:** account-server
- **Violated:** no

## unblock-restores-no-link

An emailed link stopped when its account was blocked confirms nothing after the account is unblocked.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-137 · D-160
- **Part:** account-server
- **Violated:** no

## account-message-limits

The account server hands no account message to the mail service once 30 account messages in total, or three for the same email address, have been sent or attempted within the last hour, also across a restart of the server.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-105 · D-161
- **Part:** account-server
- **Violated:** no

## account-email-via-outsider

Player email confirmation messages are sent from `mariusznazar.com` through Mikrus Outsider.

- **Method:** review
- **Rests on:** mikrus-outsider-mail
- **Derives from:** D-153
- **Part:** account-server · deployment
- **Violated:** no

## account-email-nodemailer-starttls

The account server submits player email confirmation messages to Mikrus Outsider with Nodemailer 10 only when the SMTP connection has upgraded to TLS.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-154
- **Part:** account-server · build-tools
- **Violated:** no

## nature-energy-range

At every game minute of a map run, the mage's nature energy lies between 0 and the cap the data files of `src/browser/sim/data/` give it, both included.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-63 · D-71 · D-177
- **Part:** simulation
- **Violated:** no

## action-duration-minimum

An action shortened by bought branches lasts at least one game minute.

- **Method:** test
- **Rests on:** none
- **Derives from:** C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/_zadania/wprawa_i_drzewa_loop2.md § Settlements to record, row 7 — "Akcja skrócona gałęziami trwa co najmniej jedną minutę gry."; read 2026-10-29
- **Part:** simulation
- **Violated:** no

## trip-transfer

Outside a manual run of a solved map, at each map-run start equipment is removed from the chest in take-list order up to stock, carrying capacity and entry cap, and at completion items are deposited once from the entry-bound bring snapshot in its order up to backpack stock, carrying capacity, exit cap and free chest room, while a manual run of a solved map leaves the chest as it was at its start and at its completion.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-50 · D-179 · D-187 · D-189 · D-214
- **Part:** simulation
- **Violated:** no

## trip-run-end

Death, ending or restarting an unfinished map run, or stopping the earning loop it belongs to, returns none of its carried items to the chest, while completion deposits the frozen bring list's clipped contents, on a manual run of a solved map nothing, and leaves the remaining items unavailable to subsequent runs.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-179 · D-183 · D-189 · D-190 · D-214 · D-228
- **Part:** simulation
- **Violated:** no

## trip-plan-progress

Editing or discarding changes to the copy's trip plan alone leaves the run's streak, defeated-attack count and program-rule firing counts as they stood.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-93 · D-131 · D-136
- **Part:** simulation
- **Violated:** no

## player-save-isolation

A signed-in player can read and change only the saved game state belonging to their own account.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-109 · D-202
- **Part:** account-server
- **Violated:** no

## expired-session-unsaved-progress

An expired session leaves unsaved progress in the browser, and the game retries saving it only after the player signs in again to the same account.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-203 · D-211
- **Part:** browser-view
- **Violated:** no

## account-save-sqlite-store

The account and save server persists player accounts and complete saved game states in a SQLite database.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-205
- **Part:** account-server
- **Violated:** no

## saved-state-http-exchange

The browser loads and sends saved game states as JSON through `fetch()` requests.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-204
- **Part:** browser-view
- **Violated:** no

## save-version

The game loads no data from a saved game state whose version differs from the game's current version of the saved game state's shape.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-206
- **Part:** simulation
- **Violated:** no

## solved-map-manual-run

A manual map run of a map already solved when the map run starts leaves the chest as it was and adds no practice to any character skill.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-189 · D-214
- **Part:** every
- **Violated:** no

## resurrection-renewal

A resurrection used up by a death is ready again at the real moment of that death plus the renewal time in the balance data, a death with no resurrection ready leaves that moment as it stood, and a moment equal to the moment of readiness counts as ready.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-190 · D-219
- **Part:** simulation · browser-view
- **Violated:** no

## death-settled-once

One death of a character is settled once: a further settling of that death and a load of a saved game state on the screen after it leave the character and the map run as they stood.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-190 · D-212 · D-221
- **Part:** simulation
- **Violated:** no

## catch-up-state

For the same starting game state and real-time inputs, a character whose team's chest no other character's map run reaches during a span of game minutes has the same character and chest state after catch-up as after the game runs without a break over that span.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-223
- **Part:** every
- **Violated:** no

## catch-up-minutes

The catch-up passes an earning loop, until it stops, by one game minute for each whole real minute from the save time to the reading of the browser's clock, the rest shorter than a real minute waiting for the earning loop's next game minute, and a reading before the save time passes zero game minutes, takes nothing and starts the clock of the earning loops from that reading.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-225 · D-230
- **Part:** simulation · browser-view
- **Violated:** no

## catch-up-death-moment

A character's death in the k-th game minute of the catch-up is settled at the real moment k real minutes after the save time.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-190 · D-225
- **Part:** simulation · browser-view
- **Violated:** no

## loop-run-knowledge

A map run of an earning loop currently leaves the Understanding and the player's programs as it found them.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-232
- **Part:** simulation
- **Violated:** no

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|
| guidelines-form | withdrawn: the-way no longer holds a script that checks the form of a product's guidelines; the review of a change compares them with the templates, and `.the-way/elements/common/foundation_check.py` reports a decision, an invariant or a part they name that the foundation does not hold | none |
| guidelines-reference-current | withdrawn: the-way no longer holds a script that checks the form of a product's guidelines; the review of a change compares them with the templates, and `.the-way/elements/common/foundation_check.py` reports a decision, an invariant or a part they name that the foundation does not hold | none |
| eslint-configuration-rules | withdrawn: no cheap test checks that `eslint.config.mjs` keeps to D-29, so the linter's rule names no invariant for it; the review of each change to that configuration compares it with D-29 | none |
