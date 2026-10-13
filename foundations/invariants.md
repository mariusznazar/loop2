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
- **Derives from:** D-05@e11aec4d
- **Part:** every
- **Correction:** none

## loop2-one-serving-process/1

One Express 5 process serves both the built game and `/api/` requests.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-05@e11aec4d
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

## map-run-repeatability/1

Two simulations of one program from one starting game state with one seed give the same map run,
game minute by game minute, when they receive the same real-time inputs.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-12@4e289de6
- **Part:** every
- **Correction:** none

## simulation-randomness/1

No file of the simulation draws a random number from any source other than the generator seeded
from the map run's state.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-12@4e289de6
- **Part:** every
- **Correction:** none

## action-in-progress/1

The character's action in progress lasts its full duration, even where the program changes or the
condition of another program rule comes to hold before it ends.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-10@a03f8b53
- **Part:** simulation
- **Correction:** none

## player-map-run-pace/1

Real time passed to the simulation for a map run the player starts moves the map run on by one game
minute for each whole real second passed while it is not paused, and by no game minute for real
time passed while it is paused.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-11@6032a520
- **Part:** simulation
- **Correction:** none

## simulation-isolation/1

No file of the simulation imports a file from outside the simulation, or uses the page, a timer,
the system time or a global object that the browser or Node.js adds to those of the JavaScript
language.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-04@ecd038e3
- **Part:** simulation
- **Correction:** none

## simulation-inputs/1

No function that a file of the simulation exports changes a value passed to it.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-04@ecd038e3
- **Part:** simulation
- **Correction:** none

## content-identifiers/1

No TypeScript file under `src/browser/` outside `src/browser/sim/data/` names a game map, a
resource or an archetype, outside its comments, by the identifier or the name that the files of
`src/browser/sim/data/` give it.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-08@1f532d10
- **Part:** simulation · browser-view
- **Correction:** none

## program-rule-pick/1

In each free game minute of a map run, the character starts to carry out the first program rule
whose condition holds and which the character can carry out then, and carries out no program rule
in a free game minute in which none has both.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-13@70d1cb2d
- **Part:** simulation
- **Correction:** none

## exploring-reveal/1

A program rule that explores reveals the tile the character stands on when the exploring ends, and
the character cannot carry it out on a revealed tile.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-15@6e8b0be3
- **Part:** simulation
- **Correction:** none

## move-reach/1

Every move of the character ends with the character on a tile neighbouring the tile the move
started from.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-15@6e8b0be3
- **Part:** simulation
- **Correction:** none

## walk-target/1

A program rule that goes to a resource takes the character one move toward one of the revealed
tiles holding some of that resource that lie nearest in game minutes of walking, and the character
cannot carry it out where no revealed tile holds some of that resource or where it stands on one
that does.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-16@35aef078
- **Part:** simulation
- **Correction:** none

## map-run-tiles/1

When a map run starts, each tile holds, of each resource on its game map's list of resources,
either none or the stock per tile that the game map's data gives, and holds no resource missing
from that list.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-14@a9cf9825
- **Part:** simulation
- **Correction:** none

## restart-seed/1

A restart has the seed of the map run it replaces.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-12@4e289de6
- **Part:** simulation
- **Correction:** none

## icon-file-content/1

No SVG file in `assets/icons/` holds a `script` or `foreignObject` element, an attribute whose name
begins with `on`, or a reference to anything outside the file other than the SVG and XLink
namespace declarations.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-17@69da55dd
- **Part:** browser-view
- **Correction:** none

## icon-credits/1

For each SVG file in `assets/icons/`, the game's footer shows a credit that names the icon's
author, its page on game-icons.net and the licence CC BY 3.0, and says how the file differs from
its source.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-17@69da55dd
- **Part:** browser-view
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
