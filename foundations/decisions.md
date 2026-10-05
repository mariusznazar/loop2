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
