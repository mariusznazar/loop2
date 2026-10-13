# Invariants

Before running an invariant Method in a fresh checkout, run `npm ci` from the repository root.

## account-server-runtime/1

The account and save server's TypeScript source and deployment use Node.js major version 24.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-01@e57a4766
- **Part:** every
- **Correction:** none

## account-server-typecheck/1

The account and save server's TypeScript types are checked before deployment.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-01@e57a4766
- **Part:** every
- **Correction:** none

## account-server-express-http/1

The account and save server handles its HTTP routes and responses through Express 5.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-02@06e6d3d8
- **Part:** every
- **Correction:** none

## browser-view-framework/1

The browser view uses TypeScript and browser APIs to render its screens, with no UI framework in its code or runtime dependencies.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-03@fb5aa3b0
- **Part:** every
- **Correction:** none

## loop2-api-error-route/1

An unmatched `/api/` request receives an API error response, never the built game's HTML page.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-05@db83484a
- **Part:** every
- **Correction:** none

## loop2-one-serving-process/2

One Express 5 process in the loop2 container serves both the built game and `/api/` account and save requests.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-05@db83484a
- **Part:** every
- **Correction:** none

## application-build-output/1

Building the application compiles both the browser and the server TypeScript configurations.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-06@094e6fa7
- **Part:** build-tools · browser-view · simulation · account-server
- **Correction:** none

## application-package-layout/1

The browser and server use a single shared npm package and lockfile, with no separate application package for either side.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-06@094e6fa7
- **Part:** build-tools · browser-view · simulation · account-server
- **Correction:** none

## application-build-layout/1

The browser and server have distinct TypeScript compilation configurations and output directories.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-06@094e6fa7
- **Part:** build-tools · browser-view · simulation · account-server
- **Correction:** none

## account-server-occupied-address/1

When the account and save server's listening address is already in use, the server process exits with a non-zero code without printing its readiness line `Loop: <address>`.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** none
- **Part:** account-server · build-tools
- **Correction:** none

## loop2-container-isolation/1

The loop2 instance runs in a container separate from the existing loop instance.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-08@e4e8a2f4
- **Part:** every
- **Correction:** none

## loop2-distinct-address/1

The public address of loop2 differs from `kantarion.bieda.it`.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-08@e4e8a2f4
- **Part:** every
- **Correction:** none

## loop2-deploy-trigger-input/1

The deployment command the automation's key runs refuses every input but one commit name of 40 lowercase hexadecimal characters before it fetches, builds or changes a container, and deploys only a commit that belongs to `main` as just fetched.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** openssh-authorized-keys-options@3fd0389d
- **Derives from:** D-09@20be369f · D-11@8ab607c7
- **Part:** deployment
- **Correction:** none

## loop2-deploy-keeps-running/1

A deployment that stops before it starts the new container — at its input, the commit, the lock, the reading of memory and disk, the fetch, the checkout, the type check or the build — leaves the running loop2 container in service.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-15@e3aa8f94
- **Part:** deployment
- **Correction:** none

## loop2-host-sharing/1

A deployment of loop2 stops, removes, replaces or reconfigures no container, image, network or volume on the host other than loop2's own, and the loop2 Compose service asks the host for no privilege that a default container lacks.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-17@c332eebd
- **Part:** deployment
- **Correction:** none

## map-run-repeatability/1

Two simulations of one program from one starting game state with one seed give the same map run,
game minute by game minute, when they receive the same real-time inputs.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-22@c9937b43
- **Part:** every
- **Correction:** none

## simulation-randomness/1

No file of the simulation draws a random number from any source other than the generator seeded
from the map run's state.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-22@c9937b43
- **Part:** every
- **Correction:** none

## action-in-progress/1

The character's action in progress lasts its full duration, even where the program changes or the
condition of another program rule comes to hold before it ends.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-20@a03f8b53 · D-23@2a80871f
- **Part:** simulation
- **Correction:** none

## player-map-run-pace/1

Real time passed to the simulation for a map run the player starts moves the map run on by one game
minute for each whole real second passed while it is not paused, and by no game minute for real
time passed while it is paused.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-21@6032a520
- **Part:** simulation
- **Correction:** none

## simulation-isolation/1

No file of the simulation imports a file from outside the simulation, or uses the page, a timer,
the system time or a global object that the browser or Node.js adds to those of the JavaScript
language.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-04@3b3dcdc2
- **Part:** simulation
- **Correction:** none

## simulation-inputs/1

No function that a file of the simulation exports changes a value passed to it.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-04@3b3dcdc2
- **Part:** simulation
- **Correction:** none

## content-identifiers/1

No TypeScript file under `src/browser/` outside `src/browser/sim/data/` names a game map, a
resource or an archetype, outside its comments, by the identifier or the name that the files of
`src/browser/sim/data/` give it.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-18@9cf9e4c8
- **Part:** simulation · browser-view
- **Correction:** none

## program-rule-pick/1

In each free game minute of a map run, the character starts to carry out the first program rule
whose condition holds and which the character can carry out then, and carries out no program rule
in a free game minute in which none has both.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-23@2a80871f
- **Part:** simulation
- **Correction:** none

## exploring-reveal/1

A program rule that explores reveals the tile the character stands on when the exploring ends, and
the character cannot carry it out on a revealed tile.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-25@52da4747
- **Part:** simulation
- **Correction:** none

## move-reach/1

Every move of the character ends with the character on a tile neighbouring the tile the move
started from.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-25@52da4747
- **Part:** simulation
- **Correction:** none

## walk-target/1

A program rule that goes to a resource takes the character one move toward one of the revealed
tiles holding some of that resource that lie nearest in game minutes of walking.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-26@349276ea
- **Part:** simulation
- **Correction:** none

## map-run-tiles/1

When a map run starts, each tile holds, of each resource on its game map's list of resources,
either none or the stock per tile that the game map's data gives, and holds no resource missing
from that list.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-24@4a978d6e
- **Part:** simulation
- **Correction:** none

## restart-seed/1

A map run restart has the seed of the map run it replaces.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-22@c9937b43
- **Part:** simulation
- **Correction:** none

## icon-file-content/1

No SVG file directly in `assets/icons/` holds a `script` or `foreignObject` SVG element, an attribute whose
name begins with `on`, or a reference to anything outside the file other than the SVG and XLink
namespace declarations.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-27@06e0600c
- **Part:** browser-view
- **Correction:** none

## icon-credits/1

For each SVG icon file directly in `assets/icons/`, the game's footer shows a credit that names
the icon's title as its page on game-icons.net gives it, the icon's author, that page and the
licence CC BY 3.0, and says how the icon file differs from its source.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** game-icons-licence@a24f9771 · game-icons-wood-stick-title@616bffdb · game-icons-berry-bush-title@d3838fe0 · game-icons-fern-title@6a1f5fdb · game-icons-flax-title@d8aaf8c9
- **Derives from:** D-27@06e0600c
- **Part:** browser-view · simulation
- **Correction:** none

## loop2-container-icons/1

The loop2 container built from the repository serves each SVG icon file directly in
`assets/icons/` at the path `/icons/<file name>`, with the same bytes as that icon file.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-27@06e0600c
- **Part:** browser-view · build-tools · account-server · deployment
- **Correction:** none

## terrain-drawing-numbers/1

The terrain panel's drawing of the game map shows no number of the stock a tile holds.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-19@f7077364
- **Part:** browser-view
- **Correction:** none

## program-closed-lists/1

The simulation refuses a program holding a condition or an action of the character whose kind the
data files of `src/browser/sim/data/` do not list.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-23@2a80871f
- **Part:** simulation
- **Correction:** none

## walk-feasibility/1

The character can carry out a program rule that goes to a resource where some revealed tile holds
some of that resource and the character does not stand on one that does, and nowhere else.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-26@349276ea
- **Part:** simulation
- **Correction:** none

## program-world-reference/1

A program the simulation holds names a thing of the world only by its kind, never by a number or a
position of its own.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-26@349276ea
- **Part:** simulation
- **Correction:** none

## map-run-layout/1

Two map runs of one game map on one seed have the same resources on each tile at every game
minute, whatever programs they run under.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-22@c9937b43
- **Part:** simulation
- **Correction:** none

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|

## Quarantined invariants

| Identifier | Version | Until |
|---|---|---|

## Recovered invariants

| Identifier | Version | Searched | Found |
|---|---|---|---|
| account-server-occupied-address | 1 | searched: foundations/decisions.md; README.md; src/server/main.ts; tests/startup.test.mjs; their git history (11c7cbb, de3ceb3, 3af85d1); 5928e7b:docs/task-cycles/app-skeleton/reports/correction-1/return/proposal-pl.md, part C; PR #3 U4 and U7 | found: tests/startup.test.mjs, occupied-port exit and readiness assertions; 5928e7b:docs/task-cycles/app-skeleton/reports/correction-1/return/proposal-pl.md, part C, account-server-occupied-address/1 |
