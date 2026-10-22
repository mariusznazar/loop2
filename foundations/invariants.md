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
- **Derives from:** recovered from code — src/server/main.ts, the server's `error` handler, which prints the failure and sets exit code 1, while the readiness line is printed only on `listening`; tests/startup.test.mjs, the test "exits with an error instead of reporting ready when port 3000 is occupied"
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

A deployment that stops before it starts the new container — at its input, the commit, the lock, the reading of memory and disk, the fetch, the checkout, the type check or the build — leaves the running loop2 container in service.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-15
- **Part:** deployment
- **Violated:** no

## loop2-host-sharing

A deployment of loop2 stops, removes, replaces or reconfigures no container, image, network or volume on the host other than loop2's own, and the loop2 Compose service asks the host for no privilege that a default container lacks.

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

The character's action in progress lasts its full duration, even where the program changes or the
condition of another program rule comes to hold before it ends.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-20 · D-23
- **Part:** simulation
- **Violated:** no

## player-map-run-pace

Real time passed to the simulation for a map run the player starts moves the map run on by one game
minute for each whole real second passed while it is not paused, and by no game minute for real
time passed while it is paused.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-21
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

In each free game minute of a map run, the character starts to carry out the first program rule
whose condition holds and which the character can carry out then, and carries out no program rule
in a free game minute in which none has both.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-23
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
- **Rests on:** game-icons-licence · game-icons-wood-stick-title · game-icons-berry-bush-title · game-icons-fern-title · game-icons-flax-title
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

No TypeScript or JavaScript file in the scope adopted by D-29 violates a blocking ESLint 10.12.0 rule or uses an inline directive to suppress one or change the adopted rule set.

- **Method:** test
- **Rests on:** eslint-recommended-rules · typescript-eslint-typechecked-rules
- **Derives from:** D-29
- **Part:** browser-view · simulation · account-server · build-tools
- **Violated:** no

## ruff-source-rules

No Python file in the scope adopted by D-30 violates a blocking Ruff 0.17.1 rule or uses an inline directive to suppress one or change the adopted rule set.

- **Method:** test
- **Rests on:** ruff-default-rules
- **Derives from:** D-30
- **Part:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow
- **Violated:** no

## shellcheck-source-rules

No standalone Bash script in the scope adopted by D-31 violates a blocking ShellCheck 0.11.0 check or uses a source directive to suppress one or change the adopted set.

- **Method:** test
- **Rests on:** shellcheck-default-bash-checks
- **Derives from:** D-31
- **Part:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow
- **Violated:** no

## eslint-configuration-rules

The effective ESLint 10.12.0 configuration preserves exactly the rule names, levels, options and complete TypeScript and JavaScript file scope adopted by D-29.

- **Method:** test
- **Rests on:** eslint-recommended-rules · typescript-eslint-typechecked-rules
- **Derives from:** D-29
- **Part:** browser-view · simulation · account-server · build-tools
- **Violated:** no

## prettier-source-format

Every file in the scope adopted by D-32 has the formatting produced by the adopted Prettier 3.9.10 configuration and LF line endings on every platform.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-32
- **Part:** browser-view · simulation · account-server · build-tools · deployment
- **Violated:** no

## introduced-npm-vulnerabilities

The change against {fork-point} introduces no actual npm package-name/version pair in the scope adopted by D-33 with a matching known vulnerability of low, moderate, high or critical severity in the npm/GitHub Advisory Database read when the check runs, and an unavailable, incomplete or unsupported result gives no successful verdict.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-33
- **Part:** build-tools
- **Violated:** no

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|
| guidelines-form | withdrawn: the-way no longer holds a script that checks the form of a product's guidelines; the review of a change compares them with the templates, and `.the-way/elements/common/foundation_check.py` reports a decision, an invariant or a part they name that the foundation does not hold | none |
| guidelines-reference-current | withdrawn: the-way no longer holds a script that checks the form of a product's guidelines; the review of a change compares them with the templates, and `.the-way/elements/common/foundation_check.py` reports a decision, an invariant or a part they name that the foundation does not hold | none |
