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

The character's action in progress lasts its full duration unless its map run ends first, even where
the program changes or the condition of another program rule comes to hold before it ends.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-20 · D-23
- **Part:** simulation
- **Violated:** no

## player-map-run-pace

Real time passed to the simulation for a map run the player starts moves the map run on, until it
ends, by one game minute for each whole real second passed while it is not paused, and by no game
minute for real time passed while it is paused.

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

The account and save server started with neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT` set either prints its readiness line `Loop: http://127.0.0.1:3000` or exits with a non-zero code and a message naming `127.0.0.1:3000` as an address already in use.

- **Method:** test
- **Rests on:** none
- **Derives from:** recovered from code — src/server/main.ts, the defaults `127.0.0.1` of `LOOP2_LISTEN_HOST` and `3000` of `LOOP2_LISTEN_PORT`, the readiness line printed on `listening`, and the `error` handler, which prints the failure with the address and sets exit code 1
- **Part:** account-server · build-tools
- **Violated:** no

## minute-span-split

A map run advanced by a span of game minutes reaches the same game state, with the same events in the same order, at every game minute, however the span is split into calls of the simulation, up to and including the character's death.

- **Method:** test
- **Rests on:** none
- **Derives from:** D-04 · D-64
- **Part:** simulation
- **Violated:** no

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|
| guidelines-form | withdrawn: the-way no longer holds a script that checks the form of a product's guidelines; the review of a change compares them with the templates, and `.the-way/elements/common/foundation_check.py` reports a decision, an invariant or a part they name that the foundation does not hold | none |
| guidelines-reference-current | withdrawn: the-way no longer holds a script that checks the form of a product's guidelines; the review of a change compares them with the templates, and `.the-way/elements/common/foundation_check.py` reports a decision, an invariant or a part they name that the foundation does not hold | none |
| eslint-configuration-rules | withdrawn: no cheap test checks that `eslint.config.mjs` keeps to D-29, so the linter's rule names no invariant for it; the review of each change to that configuration compares it with D-29 | none |
