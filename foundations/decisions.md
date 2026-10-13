# Decision log

### D-01/1 — What runs the account and save server?

The account and save server is written in TypeScript and runs on Node.js 24 LTS. Its TypeScript
types are checked before deployment.

- **Change:** new decision
- **Scope:** account-server, build-tools
- **Based on:** node-24-support-schedule@6096d00e · Node.js 24.21.0 TypeScript documentation, "no type checking is performed" (https://nodejs.org/download/release/v24.21.0/docs/api/typescript.html, read 2026-10-04) · State of JS 2025 runtime survey, Node.js 10,062 of 11,141 respondents to the runtime question (https://2025.stateofjs.com/en-US/other-tools/#runtimes, read 2026-10-04) · Bun 1.4.2 documentation, built-in `bun:sqlite` (https://github.com/oven-sh/bun/blob/bun-v1.4.2/docs/runtime/sqlite.mdx, read 2026-10-04) · Deno release documentation, 2.9 LTS to 2027-01-31 (https://docs.deno.com/runtime/fundamentals/stability_and_releases/, read 2026-10-04) · Go SQL driver list (https://go.dev/wiki/SQLDrivers, read 2026-10-04)
- **Relations:** derives from D-07@8ab1f8bc
- **Verification:** level 1 — invariants: account-server-runtime · account-server-typecheck
- **Review when:** Node.js 24 has six months of official support left · check by: 2027-10-30
- **Origin:** none
- **Approved by:** Mariusz, 2026-10-04

*Rationale:* the server can use the same language as the browser game while running on a widely used runtime with a published support period. The server's small responsibility gives no demonstrated reason to trade that support period for another runtime. Node's direct execution of TypeScript does not check its types.
*Rejected:* Bun — its built-in SQLite driver does not outweigh Node's published support period for this server; Deno — its current LTS line has a shorter published support period and the LTS container build was not established; Go — it adds a second application language and, for SQLite, a separately selected driver; plain JavaScript on Node — it lacks explicit types in the server code.

### D-02/1 — How does the account and save server handle HTTP requests?

The account and save server uses Express 5 on Node.js 24 to route and handle HTTP requests and
responses.

- **Change:** new decision
- **Scope:** account-server, build-tools
- **Based on:** Express 5 API, routing and JSON request parsing (https://expressjs.com/en/5x/api/express/, read 2026-10-04) · Express 5 static file serving (https://expressjs.com/en/5x/starter/static-files/, read 2026-10-04) · Express 5 error handling (https://expressjs.com/en/5x/guide/error-handling/, read 2026-10-04) · Node.js 24 low-level HTTP API (https://nodejs.org/docs/latest-v24.x/api/http.html, read 2026-10-04) · Fastify 5.12 validation and serialization (https://fastify.dev/docs/v5.12.x/Reference/Validation-and-Serialization/, read 2026-10-04)
- **Relations:** derives from D-01@e57a4766
- **Verification:** level 1 — invariants: account-server-express-http
- **Review when:** Express 5 no longer supports the server's required request handling or a planned upgrade breaks its routes · check by: 2027-04-04
- **Origin:** none
- **Approved by:** Mariusz, 2026-10-04

*Rationale:* Express supplies routing and JSON request parsing for the small account and save API
without writing those HTTP mechanics in the project. It can also serve the built game if the
serving-process choice keeps one Node process. Express and its separate TypeScript types add
packages to update; the saved-state size limit and input checks still need to be designed with the
API, and no default request-size limit is assumed to fit.
*Rejected:* built-in `node:http` — avoids a framework package but leaves routing, body reading,
size limits and error responses to the project; Fastify 5 — offers schema-based validation, but
the project would write and maintain schemas and would need an additional package to serve static
files in one process; Hono 4 — its current documentation does not mark a version, so it does not
pass this project's documentation filter.

### D-03/1 — How is the browser view built?

The browser view is built in TypeScript with the browser's DOM APIs, without an additional UI framework.

- **Change:** new decision
- **Scope:** browser-view, build-tools
- **Based on:** TypeScript Handbook, "ships type definitions for the DOM API" (https://www.typescriptlang.org/docs/handbook/dom-manipulation.html, read 2026-10-04) · React documentation, "npm install react react-dom" (https://react.dev/learn/add-react-to-an-existing-project, read 2026-10-04) · Vue documentation, "npm create vue@latest" (https://vuejs.org/guide/quick-start.html, read 2026-10-04) · Svelte documentation, "using Vite" (https://svelte.dev/docs/svelte/typescript, read 2026-10-04)
- **Relations:** derives from D-04@b703ab2a
- **Verification:** level 1 — invariants: browser-view-framework
- **Review when:** none
- **Origin:** none
- **Approved by:** Mariusz, 2026-10-04

*Rationale:* the MVP's view mostly reads the game state and needs no added UI framework to start. This keeps one dependency out of the browser view; the project accepts writing the updates of the program editor and its counters itself.
*Rejected:* React, Vue and Svelte — each adds UI tooling and a dependency before this MVP has shown a benefit from one.

### D-04/1 — What is the game built with?

The game is written in TypeScript and runs in the browser.

- **Change:** new decision
- **Scope:** browser-view, build-tools
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a game screen written as a TypeScript module that the build compiles for the browser
  - violates: a part of the game written as a Godot scene, or a script the browser loads written directly in JavaScript instead of compiled from TypeScript
- **Review when:** movement and collisions become the core of the game's fun · check by: 2027-04-03
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D10, §7 and §9 "Wskrzeszenie a doliczanie nieobecności" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What is the game built with?"
- **Approved by:** Mariusz, 2026-10-05

*Rationale:* text code and tests give the most leverage in work with AI agents.
*Rejected:* Godot — slower to work on with AI agents.

### D-05/1 — What serves the built game and account requests in the container?

One Node.js process running Express 5 serves both the built game's static files and the `/api/`
paths. An unmatched `/api/` request receives an API error, not the game's HTML page.

- **Change:** new decision
- **Scope:** account-server, build-tools
- **Based on:** Express 5 static file serving (https://expressjs.com/en/5x/starter/static-files/, read 2026-10-04) · Express 5 request routing and response API (https://expressjs.com/en/5x/api/express/, read 2026-10-04) · Caddy 2 route, file_server and reverse_proxy (https://caddyserver.com/docs/caddyfile/directives/route, read 2026-10-04) · Docker multiple processes in one container (https://docs.docker.com/engine/containers/multi-service_container/, read 2026-10-04)
- **Relations:** derives from D-02@06e6d3d8
- **Verification:** level 1 — invariants: loop2-one-serving-process · loop2-api-error-route
- **Review when:** serving built files through Express becomes difficult to operate or the account API needs a separate process · check by: 2027-04-04
- **Origin:** none
- **Approved by:** Mariusz, 2026-10-05

*Rationale:* Express already handles the API and can serve the built files in the same process, so
this choice adds no second server process or proxy configuration to the container. The application
must set static-file and fallback rules carefully, including cache policy and a distinct error
response for unmatched `/api/` requests. A later proxy can retain the public paths.
*Rejected:* Caddy in front of Express within the same container — provides a separate file server
and proxy routing but adds another process to start, monitor and update, plus its configuration.

### D-06/1 — How are the browser and server built together?

The browser and server share one npm package and lockfile, and have separate TypeScript
compilation configurations and output directories. Building the application compiles both
configurations.

- **Change:** new decision
- **Scope:** build-tools, browser-view, account-server
- **Based on:** none
- **Relations:** none
- **Verification:** level 1 — invariants: application-build-output
- **Review when:** none
- **Origin:** none
- **Approved by:** Mariusz, 2026-10-05

*Rationale:* a shared installation keeps the local starting point small, while separate compiler
environments keep browser and server types apart.
*Rejected:* separate packages — add installation coordination; a bundler — adds a build layer
without a demonstrated need in the current application.

### D-07/1 — How is the work of the game split between the server and the browser?

The server computes nothing of the game.

- **Change:** new decision
- **Scope:** account-server
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a server route that stores data the browser sends and returns it unchanged
  - violates: a server module that computes the outcome of a character's actions or of the time the game was closed
- **Review when:** saved progress starts affecting other players, rankings, shared exchange or rewards outside a player's own game · check by: 2027-04-04
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D23 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How is the work of the game split between the server and the browser?"
- **Approved by:** Mariusz, 2026-10-05

*Rationale:* computing the game in the browser keeps it computed as loop computes it, so the
server adds only accounts and a save that follows the player from browser to browser. Players can
replace their own saved game states and forge their own progress. The MVP accepts that cost while
the saved progress affects only its owner's game; account isolation prevents changing another
player's saved state.
*Rejected:* the server computing the game itself — a second home for the simulation and many
times the work.

### D-04/2 — What is the game built with?

The game is written in TypeScript and runs in the browser.

- **Change:** unchanged sentences
- **Scope:** browser-view, build-tools
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a game screen written as a TypeScript module that the build compiles for the browser
  - violates: a part of the game written as a Godot scene, or a script of the game's own code that the browser loads, written directly in JavaScript instead of compiled from TypeScript
- **Review when:** movement and collisions become the core of the game's fun · check by: 2027-04-03
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D10, §7 and §9 "Wskrzeszenie a doliczanie nieobecności" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What is the game built with?"
- **Approved by:** Mariusz, merge of https://github.com/mariusznazar/loop2/pull/6

*Rationale for change:* the violation example distinguishes the game's own code from external libraries without broadening the language choice.
*Rejected:* keeping an example that also excludes external libraries — it extends the decision beyond the game's own code.

### D-05/2 — What serves the built game and account requests in the container?

One Node.js process running Express 5 serves both the built game's static files and the `/api/`
paths. An unmatched `/api/` request receives an API error, not the game's HTML page.

- **Change:** unchanged sentences
- **Scope:** account-server, build-tools
- **Based on:** Express 5 static file serving (https://expressjs.com/en/5x/starter/static-files/, read 2026-10-04) · Express 5 request routing and response API (https://expressjs.com/en/5x/api/express/, read 2026-10-04) · Caddy 2 route, file_server and reverse_proxy (https://caddyserver.com/docs/caddyfile/directives/route, read 2026-10-04) · Docker multiple processes in one container (https://docs.docker.com/engine/containers/multi-service_container/, read 2026-10-04)
- **Relations:** derives from D-02@06e6d3d8
- **Verification:** level 1 — invariants: loop2-one-serving-process · loop2-api-error-route
- **Review when:** serving built files through Express becomes difficult to operate or the account API needs a separate process · check by: 2027-04-04
- **Origin:** the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What serves the built game and account requests in the container?"
- **Approved by:** Mariusz, merge of https://github.com/mariusznazar/loop2/pull/6

*Rationale for change:* the origin connects the serving-process choice with its full approved entry.
*Rejected:* omitting the link to the full approved entry — the shortened choice hides its source.

### D-06/2 — How are the browser and server built together?

The browser and server share one npm package and lockfile, and have separate TypeScript
compilation configurations and output directories. Building the application compiles both
configurations.

- **Change:** unchanged sentences
- **Scope:** build-tools, browser-view, account-server
- **Based on:** none
- **Relations:** none
- **Verification:** level 1 — invariants: application-package-layout · application-build-layout · application-build-output
- **Review when:** none
- **Origin:** none
- **Approved by:** Mariusz, merge of https://github.com/mariusznazar/loop2/pull/6

*Rationale for change:* the verification names the package boundary and compiler layout as well as compilation of both sides.
*Rejected:* keeping verification limited to compilation alone — it leaves the package boundary and compiler layout unprotected.

### D-04/3 — What is the game built with?

The game is written in TypeScript and runs in the browser. Its simulation is a set of pure
functions that take a game state and a span of game minutes and return the next game state together
with the events it produced, and real time enters the simulation only as an argument. The browser
view draws the game only from the game state, and changes the game state only through functions of
the simulation, to which it passes the player's choices and the passing of real time.

- **Change:** new wording
- **Scope:** browser-view, build-tools, simulation
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: the renewal of a resurrection computed from a real time the caller passes in; the
    program editor of the browser view passing the edited program to a function of the simulation
  - violates: a simulation function that reads the system time or the page; a browser view that
    keeps a game state of its own; a screen of the browser view that writes a program rule straight
    into the game state
- **Review when:** movement and collisions become the core of the game's fun · check by: 2027-04-03
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D10, §7 and §9 "Wskrzeszenie a doliczanie nieobecności"
- **Approved by:** Mariusz, 2026-10-13

*Rationale for change:* a simulation of pure functions makes progress while away plain arithmetic
and the save a JSON document, and runs on a phone as well; real time passed in as an argument keeps
the earning loop, the catch-up and the renewal of a resurrection on one footing. The player changes
the game state from the browser view — the program editor, sending a character, a restart — and the
passing of real time changes it too; each goes through the simulation, so the game state changes in
one place.
*Rejected:* giving "view" the meaning of the drawing alone and renaming the browser view in "How is
the browser view built?", its invariant and its part — three entries changed to keep a sentence
about a scene the MVP does not have; keeping the sentence
"The view draws only from the game state and changes nothing in it." — false of the browser view,
from which the player changes the game state.

### D-03/2 — How is the browser view built?

The browser view is built in TypeScript with the browser's DOM APIs, without an additional UI framework.

- **Change:** unchanged sentences
- **Scope:** browser-view, build-tools
- **Based on:** TypeScript Handbook, "ships type definitions for the DOM API" (https://www.typescriptlang.org/docs/handbook/dom-manipulation.html, read 2026-10-04) · React documentation, "npm install react react-dom" (https://react.dev/learn/add-react-to-an-existing-project, read 2026-10-04) · Vue documentation, "npm create vue@latest" (https://vuejs.org/guide/quick-start.html, read 2026-10-04) · Svelte documentation, "using Vite" (https://svelte.dev/docs/svelte/typescript, read 2026-10-04)
- **Relations:** derives from D-04@ecd038e3
- **Verification:** level 1 — invariants: browser-view-framework
- **Review when:** none
- **Origin:** none
- **Approved by:** Mariusz, merge of <request link>

*Rationale for change:* the relation carries the binding part D-04 now has, in which the browser
view draws the game only from the game state and changes it only through functions of the
simulation; building the browser view with the browser's DOM APIs, without an additional UI
framework, still serves that binding part.
*Rejected:* keeping the fingerprint of D-04's earlier binding part — the relation would name a
binding part no longer in force.

### D-08/1 — Where does the game's content live?

The game's content — maps, items, creatures, character skills and their numbers — stands in data
files. A map, an item or a creature of a kind the simulation already handles is added by a change
of data alone.

- **Change:** new decision
- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a new creature added as a row of the creatures' data, which the simulation reads
  - violates: a wolf's damage written as a number in the combat code
- **Review when:** none
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D10, §7 and principle #4
- **Approved by:** Mariusz, 2026-10-13

*Rationale:* content in data makes a new item, map or creature cheap, lets the content grow by
rules rather than by code, and keeps names and look swappable, which a world of one's own needs.
*Rejected:* none considered

### D-09/1 — How does the player interact with the terrain panel's drawing of the game map?

The terrain panel's drawing of the game map is a picture, not a control: its only interaction is
hovering, which links a tile with its row in the list of revealed tiles, and the numbers of stock
stand in that list, never on the drawing.

- **Change:** new decision
- **Scope:** browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: hovering a tile marks its row in the list of revealed tiles, and hovering that row
    marks the tile; a revealed tile drawn with the icons of its resources and no numbers
  - violates: a click on a tile that sends the character there or changes the program; a tile drawn
    with the number of sticks it holds
- **Review when:** none
- **Origin:** mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Questions to settle", "Co pokazuje panel terenu?" · koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), §5
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* the player writes the condition that fewer than N of a resource lie on the
character's tile against numbers the list shows, and the list keeps the stock of every resource of
a tile readable where numbers written into the tiles would not be; hovering ties a tile to its
numbers without writing them on it.
*Rejected:* the grid drawn without the list and its numbers — the player would write that condition
without seeing the number it compares; numbers written into the tiles — unreadable where a tile
holds several resources.

### D-10/1 — What interrupts an action the character is carrying out?

Neither a change of the program nor the condition of another program rule interrupts an action the
character is carrying out. The program picks a program rule again only once that action ends.

- **Change:** new decision
- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** level 1 — invariants: action-in-progress
- **Review when:** none
- **Origin:** mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Questions to settle", "Gdzie i kiedy gracz zmienia program i od kiedy zmiana działa?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* the player changes the program during a map run without ending it, and the change takes
effect from the next free game minute, once the character's action in progress has ended; the
program picks a program rule only in such a game minute, so the end of the character's action is
the one moment at which both a change of the program and a program rule whose condition has come to
hold take effect.
*Rejected:* a change of the program allowed only outside a map run — every fix to the program
would need the map run ended; a change of the program taking effect only from a restart — two
versions of the program in force at once.

### D-11/1 — How does time pass in a map run the player starts?

A map run the player starts passes at one game minute per real second, and the player can pause and
resume it.

- **Change:** new decision
- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** level 1 — invariants: player-map-run-pace. Level 2 for the player's way to
  pause and resume a map run — an agent compares the change with the decision:
  - complies: a control of the browser view that pauses the map run in progress and resumes it
  - violates: a map run the player can hold still only by ending it
- **Review when:** none
- **Origin:** mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Questions to settle", "Jak płynie czas przejścia — w jakim tempie i czy gracz może go zatrzymać?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* one game minute per real second is the pace at which the predecessor game, loop, runs
without fast-forwarding, and a pause holds a map run without ending it.
*Rejected:* the same pace with no pause; a faster pace while the game has no fast-forwarding.

### D-12/1 — Where does the simulation's randomness come from?

Every random draw of the simulation comes from generators seeded by the seed saved in the map run's
state, one generator for each kind of draw — the map's layout and wandering among them — and the map
run draws its map's layout at its start, before the first game minute, in a fixed order. A restart
of a map run keeps its seed, and any other map run takes a new seed.

- **Change:** new decision
- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** level 1 — invariants: map-run-repeatability · simulation-randomness. Level 2 for
  where the seed comes from — an agent compares the change with the decision:
  - complies: a restart that brings back the same layout of the map
  - violates: a map run sent anew that keeps the seed of the map run before it; wandering that draws
    from the generator of the map's layout
- **Review when:** none
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D19 and §9 "Losowania akcji dzielą strumień z losowaniem napaści" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "Where does the simulation's randomness come from?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* the same program on the same seed gives the same map run to the game minute, so a map
run can be repeated when something has to be understood, and tests of the simulation can expect
exact values. With a generator for each kind of draw, a draw of one kind leaves the draws of every
other kind where they were, so a difference between two programs on one seed is a difference of
programs rather than of luck.
*Rejected:* the browser's own random numbers in the simulation — repeatability goes; one generator
for every kind of draw — a draw of one kind shifts the draws of every other kind.

### D-13/1 — How does a character act by its program?

A character acts only by its program: in each free game minute it carries out the first program
rule whose condition holds and whose action can be carried out then. Conditions are chosen from a
closed list, never written as expressions, and the player has no way to carry out an action by
hand.

- **Change:** new decision
- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a condition picker listing the conditions of the closed list
  - violates: a text field taking a condition as an expression; a button that makes the character
    explore now
- **Review when:** none
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D14, D15 and D9 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does a character act by its program?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* the game is the writing of behaviour, so carrying out an action by hand would get round
its own core. Priorities with threshold sliders are decoration: different settings end a map
identically, since only the order of actions counts.
*Rejected:* priorities with threshold sliders — decoration; conditions written as expressions — the
player starts writing queries instead of arranging behaviour.

### D-14/1 — What is a map made of?

A map is a grid of hexagonal tiles whose dimensions, entrance, cost of a move and resources stand in
the map's data, each resource with its density, stock per tile and time to renew one piece. What is
not on the map's list of resources cannot be revealed there. Which tile gets what is drawn by the
map run from its seed, within the bounds the map sets.

- **Change:** new decision
- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-12@4e289de6
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a new map added as a row of the maps' data, with its dimensions and resources; Las
    with a fixed entrance
  - violates: a map with a hand-placed layout; a map of square tiles
- **Review when:** none
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D32, D17 and §5 "Mapa jest siatką sześciokątnych kafelków" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What is a map made of?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* six neighbours at an equal distance make a move always mean the same. New challenges
come from the map's settings alone — dimensions, densities, stocks, renewal, cost of a move. The
first map has a fixed entrance because its first map run is a tutorial. Accepted with it: a random
layout widens the spread between seeds.
*Rejected:* a random layout without a fixed frame — difficulty cannot be steered; a fixed layout per
map — exploring loses its sense after the first map run; square tiles — four directions make a
diagonal two moves, eight give it for free; the presence of a resource without a stock — cheaper,
but tests nothing.

### D-15/1 — How does a character move?

A move onto a neighbouring tile is an ordinary action, after which the program picks a program rule
anew, as after any action. Exploring reveals the tile the character stands on, cannot be repeated on
a revealed tile and brings no item.

- **Change:** new decision
- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-13@70d1cb2d
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: "Go — stick" taking one move toward the nearest known tile with sticks, then the
    program choosing again
  - violates: a journey stored as a route; exploring that brings a stick
- **Review when:** none
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D33 and §5 "Postać stoi na jednym kafelku" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does a character move?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* the character reacts to the world between moves, and the state grows by nothing but
the position and the target of the current move. Exploring that brought an item would be gathering
in disguise.
*Rejected:* travel as a state with a stored route — the program has no say on the way; exploring
that brings an item.

### D-16/1 — How does a program point at things of the world?

A program points at a thing of the world only as the nearest known one of its kind, counted in game
minutes of walking, never by a number of its own.

- **Change:** new decision
- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: "Go — stick" taking one move toward the nearest known tile with sticks
  - violates: a program rule naming "tile 7"
- **Review when:** none
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D34 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does a program point at things of the world?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* the layout of a game map differs on every seed, so a number given to a tile means nothing
that lasts, while "the nearest" means the same on every map run.
*Rejected:* numbering tiles in program rules — a program is written before the map run, and the
layout is drawn at its start.
