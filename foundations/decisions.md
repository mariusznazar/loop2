# Decision log

### D-01 — What runs the account and save server?

The account and save server is written in TypeScript and runs on Node.js 24 LTS. Its TypeScript
types are checked before deployment.

- **Scope:** account-server, build-tools
- **Based on:** node-24-support-schedule · Node.js 24.21.0 TypeScript documentation, "no type checking is performed" (https://nodejs.org/download/release/v24.21.0/docs/api/typescript.html, read 2026-10-04) · State of JS 2025 runtime survey, Node.js 10,062 of 11,141 respondents to the runtime question (https://2025.stateofjs.com/en-US/other-tools/#runtimes, read 2026-10-04) · Bun 1.4.2 documentation, built-in `bun:sqlite` (https://github.com/oven-sh/bun/blob/bun-v1.4.2/docs/runtime/sqlite.mdx, read 2026-10-04) · Deno release documentation, 2.9 LTS to 2027-01-31 (https://docs.deno.com/runtime/fundamentals/stability_and_releases/, read 2026-10-04) · Go SQL driver list (https://go.dev/wiki/SQLDrivers, read 2026-10-04)
- **Relations:** derives from D-07
- **Verification:** invariants: account-server-runtime · account-server-typecheck
- **Origin:** none

*Rationale:* the server can use the same language as the browser game while running on a widely used runtime with a published support period. The server's small responsibility gives no demonstrated reason to trade that support period for another runtime. Node's direct execution of TypeScript does not check its types.
*Rejected:* Bun — its built-in SQLite driver does not outweigh Node's published support period for this server; Deno — its current LTS line has a shorter published support period and the LTS container build was not established; Go — it adds a second application language and, for SQLite, a separately selected driver; plain JavaScript on Node — it lacks explicit types in the server code.

### D-02 — How does the account and save server handle HTTP requests?

The account and save server uses Express 5 on Node.js 24 to route and handle HTTP requests and
responses.

- **Scope:** account-server, build-tools
- **Based on:** Express 5 API, routing and JSON request parsing (https://expressjs.com/en/5x/api/express/, read 2026-10-04) · Express 5 static file serving (https://expressjs.com/en/5x/starter/static-files/, read 2026-10-04) · Express 5 error handling (https://expressjs.com/en/5x/guide/error-handling/, read 2026-10-04) · Node.js 24 low-level HTTP API (https://nodejs.org/docs/latest-v24.x/api/http.html, read 2026-10-04) · Fastify 5.12 validation and serialization (https://fastify.dev/docs/v5.12.x/Reference/Validation-and-Serialization/, read 2026-10-04)
- **Relations:** derives from D-01
- **Verification:** invariants: account-server-express-http
- **Origin:** none

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

### D-03 — How is the browser view built?

The browser view is built in TypeScript with the browser's DOM APIs, without an additional UI framework.

- **Scope:** browser-view, build-tools
- **Based on:** TypeScript Handbook, "ships type definitions for the DOM API" (https://www.typescriptlang.org/docs/handbook/dom-manipulation.html, read 2026-10-04) · React documentation, "npm install react react-dom" (https://react.dev/learn/add-react-to-an-existing-project, read 2026-10-04) · Vue documentation, "npm create vue@latest" (https://vuejs.org/guide/quick-start.html, read 2026-10-04) · Svelte documentation, "using Vite" (https://svelte.dev/docs/svelte/typescript, read 2026-10-04)
- **Relations:** derives from D-04
- **Verification:** invariants: browser-view-framework
- **Origin:** none

*Rationale:* the MVP's view mostly reads the game state and needs no added UI framework to start.
This keeps one dependency out of the browser view; the project accepts writing the updates of the
program editor and its counters itself. The browser view draws the game only from the game state
and the game's content data and changes the game state only through functions of the simulation
(D-04); the browser's DOM APIs serve that without a framework.
*Rejected:* React, Vue and Svelte — each adds UI tooling and a dependency before this MVP has shown
a benefit from one.

### D-04 — What is the game built with?

The game is written in TypeScript and runs in the browser. Its simulation is a set of pure
functions that take a game state and a span of game minutes and return the next game state together
with the events it produced, and real time enters the simulation only as an argument. The browser
view draws the game only from the game state and the game's content data, and changes the game state
only through functions of the simulation, to which it passes the player's choices and the passing of
real time.

- **Scope:** browser-view, build-tools, simulation
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: simulation-isolation · simulation-inputs. For the language the game
  is written in, for the shape of the simulation's functions and for how the browser view uses the
  game state, an agent compares the change with the decision:
  - complies: a game screen written as a TypeScript module that the build compiles for the browser;
    the simulation's function that passes real time to a map run taking the real time elapsed as an
    argument, which the browser view measures and passes in; the program editor of the
    browser view passing the edited program to a function of the simulation
  - violates: a screen of the game written as a Godot scene, or a script of the game's own code that
    the browser loads, written directly in JavaScript instead of compiled from TypeScript; a
    simulation function that reads the system time or the page; a screen of the browser view that
    replaces the game state with a value no function of the simulation returned; a screen of the
    browser view that writes a program rule straight into the game state
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D10, §7 and §9 "Wskrzeszenie a doliczanie nieobecności"

*Rationale:* text code and tests give the most leverage in work with AI agents. A simulation of
pure functions makes progress while away plain arithmetic and the save a JSON document, and runs on
a phone as well; real time passed in as an argument keeps the earning loop, the catch-up and the
renewal of a resurrection on one footing. The player changes the game state from the browser view —
the program editor, sending a character, a map run restart — and the passing of real time changes it
too; each goes through the simulation, so the game state changes in one place. The browser view also
reads the game's content data, which stands apart from the game state, to name and picture what the
game state holds.
*Rejected:* Godot — slower to work on with AI agents; a browser view that draws from the game state
and changes nothing in it — the player changes the game state from the browser view.

### D-05 — What serves the built game and account requests in the container?

One Node.js process running Express 5 serves both the built game's static files and the `/api/`
account and save routes in the loop2 container. An unmatched `/api/` request receives an API error,
not the game's HTML page.

- **Scope:** account-server, build-tools, deployment
- **Based on:** Express 5 static file serving (https://expressjs.com/en/5x/starter/static-files/, read 2026-10-04) · Express 5 request routing and response API (https://expressjs.com/en/5x/api/express/, read 2026-10-04) · Caddy 2 route, file_server and reverse_proxy (https://caddyserver.com/docs/caddyfile/directives/route, read 2026-10-04) · Docker multiple processes in one container (https://docs.docker.com/engine/containers/multi-service_container/, read 2026-10-04)
- **Relations:** derives from D-02 · derives from D-08
- **Verification:** invariants: loop2-one-serving-process · loop2-api-error-route
- **Origin:** the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What serves the built game and account requests in the container?"

*Rationale:* Express already handles the API and can serve the built files in the same process, so
this choice adds no second server process or proxy configuration to the container. The application
must set static-file and fallback rules carefully, including cache policy and a distinct error
response for unmatched `/api/` requests. A later proxy can retain the public paths. The one serving
process is the one in the loop2 container where the MVP runs, and the `/api/` paths it serves are
the account and save routes.
*Rejected:* Caddy in front of Express within the same container — provides a separate file server
and proxy routing but adds another process to start, monitor and update, plus its configuration.

### D-06 — How are the browser and server built together?

The browser and server share one npm package and lockfile, and have separate TypeScript
compilation configurations and output directories. Building the application compiles both
configurations.

- **Scope:** build-tools, browser-view, simulation, account-server
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: application-package-layout · application-build-layout ·
  application-build-output
- **Origin:** none

*Rationale:* a shared installation keeps the local starting point small, while separate compiler
environments keep browser and server types apart. The simulation is browser code, compiled by the
browser's configuration and held in the shared package, so the decision applies to it as to the
browser view.
*Rejected:* separate packages — add installation coordination; a bundler — adds a build layer
without a demonstrated need in the current application.

### D-07 — How is the work of the game split between the server and the browser?

The server computes nothing of the game.

- **Scope:** account-server
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares the change with the decision:
  - complies: a server route that stores data the browser sends and returns it unchanged
  - violates: a server module that computes the outcome of a character's actions or of the time the game was closed
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D23 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How is the work of the game split between the server and the browser?"

*Rationale:* computing the game in the browser keeps it computed as loop computes it, so the
server adds only accounts and a save that follows the player from browser to browser. Players can
replace their own saved game states and forge their own progress. The MVP accepts that cost while
the saved progress affects only its owner's game; account isolation prevents changing another
player's saved state.
*Rejected:* the server computing the game itself — a second home for the simulation and many
times the work.

### D-08 — Where does the MVP run?

The MVP game and its account and save server run in a dedicated loop2 container on Mikrus, at a
public address different from `kantarion.bieda.it`. The existing loop container remains untouched.

- **Scope:** deployment
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: loop2-container-isolation · loop2-distinct-address. For leaving the
  existing loop instance untouched, an agent compares the change with the decision:
  - complies: a loop2 container and public route added beside the existing loop instance
  - violates: a deployment that rebuilds or replaces the existing loop container
- **Origin:** none

*Rationale:* a separate instance exercises the new game's server and release path on the intended
Mikrus host without disturbing the running loop game. The address can be chosen in the deployment
task while keeping the separation fixed.
*Rejected:* replacing the running loop container or using its public address — would interfere
with the existing game and break the required separation.

### D-09 — How does a change reach the server?

A push to the deploy branch starts an automation that tells the server to build the game and its
account server from that commit; the server pulls the code from GitHub itself, and the automation's
key can only start a rebuild of a commit that belongs to that branch.

- **Scope:** deployment
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: loop2-deploy-trigger-input. For the rest, an agent compares the
  change with the decision:
  - complies: a workflow that, on a push, calls the server's one rebuild command with the commit
  - violates: a workflow that copies the built files onto the server; a key that opens a shell on
    the server
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), §7 "Wdrożenie"

*Rationale:* the code is sent nowhere — the server takes it from GitHub itself — so a stolen key can
start a rebuild but cannot bring code in. The price is a short break in access at every deployment.
*Rejected:* none considered

### D-10 — How do players reach loop2 on the server?

Players reach loop2 at `https://loop2.mariusznazar.com/`, which Cloudflare proxies to the server: a
proxied AAAA record points at the server's IPv6 address, and an Origin Rule sends the requests to
the port the loop2 container publishes. Players connect to Cloudflare over HTTPS, and Cloudflare
connects to the server over plain HTTP only while no player account is served through this route.

- **Scope:** deployment
- **Based on:** cloudflare-origin-rules · cloudflare-configuration-rules · cloudflare-test-origin-ipv6 · Cloudflare network ports, "By default, Cloudflare proxies traffic destined for the HTTP/HTTPS ports listed below." (https://developers.cloudflare.com/fundamentals/reference/network-ports/, read 2026-10-13)
- **Relations:** derives from D-08
- **Verification:** an agent compares the change with the decision:
  - complies: a change whose workflow requests `https://loop2.mariusznazar.com/` after a deployment and whose container publishes the port the Origin Rule names
  - violates: a public address on a Mikrus subdomain for loop2; a task that serves player accounts through this route while Cloudflare still connects to the server over plain HTTP
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Pod jakim adresem stanie loop2 na Mikrusie?"

*Rationale:* Cloudflare already holds the `mariusznazar.com` domain, gives players HTTPS without a
certificate in the container, and reaches the container's port through an Origin Rule, while both
public IPv4 service ports of the host are taken by other workloads, the old loop game and another.
Plain HTTP from Cloudflare to the server is accepted only while the test server holds no player
data, since HTTPS for players is not end-to-end encryption; a Configuration Rule sets that
encryption mode for this hostname alone, so the old game's route keeps its own. IPv6 lets
Cloudflare reach loop2 without taking a shared public IPv4 service port.
*Rejected:* a new free Mikrus subdomain — ties the game's address to the hosting provider; serving
loop2 at `kantarion.bieda.it` in place of the old game — would reopen the approved MVP definition.

### D-11 — Which branch deploys loop2 to the test server?

The deploy branch is `main`: a push to `main`, the merge of a pull request included, reaches the
test server without anyone starting it by hand, deployed itself or within a later commit of `main`
that contains it.

- **Scope:** deployment
- **Based on:** none
- **Relations:** derives from D-09
- **Verification:** invariants: loop2-deploy-trigger-input. For the rest, an agent compares the
  change with the decision:
  - complies: a workflow that runs on a push to `main` and asks the server to rebuild the pushed commit, a newer push replacing a deployment still waiting to run
  - violates: a workflow that deploys only from a separate `test` branch; a push to `main` that waits for someone to start its deployment by hand
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Która gałąź wdraża loop2 na serwer?"

*Rationale:* every merged pull request reaches the test server with no manual step, and no second
branch can drift from `main`. A newer push that replaces a deployment still waiting to run loses
nothing, since its commit contains the older one.
*Rejected:* a separate `test` branch, as the old loop game deploys — a manual step at every
deployment and a risk of drifting from `main`.

### D-12 — What access to the server does an agent have?

An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every
change on the server that is not a deployment started by the automation is made by a human.

- **Scope:** agent-workflow, deployment
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares the change with the decision:
  - complies: a deployment skill in which the agent reads the deploy log and the container state through the `mikrus` MCP server and asks the human to run a rollback
  - violates: an instruction of the skill in which the agent installs the deploy script, edits `authorized_keys` or restarts a container through the `mikrus` MCP server; an SSH key of the agent's own on the server
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Jaki dostęp do serwera dostaje agent?"

*Rationale:* the server holds nothing today whose loss the owner fears, the old loop game's
container included, so reading through a tool that can run any command is accepted for now; the
agent reads logs and state itself instead of the human relaying them. The `mikrus` MCP server runs
every command with full rights, so the limit to reading is an agreement, not an enforced boundary.
A deployment the automation starts on a push is no agent's change.
*Rejected:* a separate SSH key for the agent, closed in a read-only script — more setup than the
server's present contents warrant; no agent access to the server — the human relays every log and
state.

### D-13 — Where do the server's access values and secrets live?

Secrets and the values that give access to the server — its name, SSH port, SSH user and IPv6
address — stay outside the repository, in the repository's GitHub secrets and the owner's private
note, and the repository's files and requests refer to them by the secret's name or the note. The
server directory, the container port and the deploy script may stand in the repository.

- **Scope:** deployment, agent-workflow
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares the change with the decision:
  - complies: a workflow that reads the server's address from a named GitHub secret; a skill that says the SSH port is held in a named secret
  - violates: a workflow, script, skill or request text that holds the server's name, SSH port, SSH user or IPv6 address itself
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Co poza sekretami jest wrażliwą konfiguracją serwera, której nie ma być w PR-ze ani w repozytorium?"

*Rationale:* the access values would tell a reader of the repository where and how to enter the
server; the server directory, the container port and the deploy script tell no one how to get in.
*Rejected:* keeping only the secrets outside the repository — the access values left in it would
show where and how to enter the server.

### D-14 — What kind of container does loop2 run in?

The loop2 container is a Docker container.

- **Scope:** deployment
- **Based on:** mikrus-host-docker-workloads
- **Relations:** derives from D-08
- **Verification:** an agent compares the change with the decision:
  - complies: a Compose file and a Dockerfile from which Docker builds and runs the loop2 container
  - violates: loop2 run as a service directly on the host, or in a container of another runtime
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Czy kontener loop2 jest kontenerem Dockera?"

*Rationale:* the host already runs Docker with Compose, and the old loop game runs there in a Docker
container, so loop2 is run with the tool the host is already operated with.
*Rejected:* none considered

### D-15 — How is loop2 recovered when a deployment goes wrong?

A deployment that stops before it starts the new container leaves the running loop2 container in
service. A rollback is a deployment of an earlier commit — a revert merged to `main`, or a human's
run of the installed deploy script with that commit, which may name a commit of any branch of the
GitHub repository while the automation's key deploys only commits of `main`. No earlier image is
kept, so a rollback restores the earlier commit's code, never the data of that time.

- **Scope:** deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-09
- **Verification:** invariants: loop2-deploy-keeps-running. For the rollback, an agent compares the
  change with the decision:
  - complies: a revert merged to `main`; a human running the installed deploy script on the server with an earlier commit named in the deploy log
  - violates: a rollback that restarts a kept image of an earlier commit; the automation key's path accepting a commit of a branch other than `main`
- **Origin:** none

*Rationale:* keeping no earlier image leaves the server one checkout and one image of loop2, and a
revert on `main` keeps the branch and the server in agreement. A human's run accepts a commit of any
branch so that a change to how loop2 is deployed can be deployed and tried before its merge, and so
that a rollback reaches an earlier commit at once. The base image is named by a tag that is not
pinned, so a rebuild of an earlier commit restores its code, not the identical image.
*Rejected:* keeping the images of earlier commits and switching back by index — a restore at once,
but a commit's image tag can be overwritten, a rollback across a change of the published port breaks
the public route, and the kept images need ordering rules of their own.

### D-16 — What does the automation's key run on the server?

The automation's key runs only a root-owned installed copy of the deploy script, kept outside the
server's checkout, so no pushed commit changes what the key runs. Each deployment compares that copy
with the script's source at the deployed commit and only warns when they differ, and reinstalling
the copy is a human's change.

- **Scope:** deployment
- **Based on:** openssh-authorized-keys-options · loop2-host-forced-command-entry · loop2-host-installed-command
- **Relations:** derives from D-09 · derives from D-12
- **Verification:** an agent compares the change with the decision:
  - complies: an `authorized_keys` entry whose forced command names the installed copy's path; a deployment that logs the difference between the copies and goes on
  - violates: a forced command that points into the server's checkout; a deployment that reinstalls its own script
- **Origin:** none

*Rationale:* what the key can run stays what a human installed, whatever a pushed commit holds. A
warning rather than a refusal keeps a rollback to a commit older than the last change of the source
possible. A stolen key can still redeploy an earlier commit of `main`; that is accepted while the
test server holds no player data. Code merged into `main`, its container build and service
definitions included, runs on the host with root's authority through the deployment, so it is
trusted code and whoever can merge to `main` can act on the host; the trust boundary stays with the
files that take in data the product does not trust.
*Rejected:* a forced command that runs the checkout's own copy — a pushed commit could change what
the key runs; a deployment that refuses when the copies differ — every rollback past a change of the
source would stop.

### D-17 — How does loop2 share the Mikrus host with other workloads?

A deployment of loop2 changes nothing on the host but loop2's own checkout, image, container, log
and lock, and the build cache and base image its build adds to the Docker store the host's
workloads share, which it never prunes; it removes or replaces nothing of another workload. It
builds only while the host's available memory and free disk stay above thresholds the repository
sets, and the loop2 container runs under a memory limit.

- **Scope:** deployment
- **Based on:** mikrus-host-docker-workloads · mikrus-host-swap
- **Relations:** derives from D-08
- **Verification:** invariants: loop2-host-sharing. For the thresholds and the memory limit, an
  agent compares the change with the decision:
  - complies: a deployment that refuses to build while available memory is below its threshold and leaves the running container untouched; a Compose service with a memory limit
  - violates: a build started without reading the host's memory and disk; a Compose service with no memory limit
- **Origin:** none

*Rationale:* the host is shared with the old loop game and another workload and has no swap, so a
build that exhausts its memory can make the kernel end a process of another workload; reading
memory and disk before the build stops a deployment before it harms them. The thresholds and the
limit are chosen bounds, not measured needs, tuned in the repository from the values each
deployment logs. Code merged into `main`, its container build and service definitions included,
runs on the host with root's authority through the deployment, so these limits hold against
mistakes in trusted code, not against whoever can merge to `main`. Free memory and disk are
transient readings, so the deployment reads them again before each build.
*Rejected:* a host-wide prune to reclaim build cache — it would remove images and cache of other
workloads, and the base image may be one another workload uses; reclaiming the build cache and
base-image layers stays a human's decision.

### D-18 — Where does the game's content live?

The game's content — game maps, items, creatures, character skills and their numbers — stands in
data files. A game map, an item or a creature of a kind the simulation already handles is added by a
change of data alone.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: content-identifiers. For the numbers of the content and for what a
  change of data alone adds, an agent compares the change with the decision:
  - complies: a new creature added as a row of the creatures' data, which the simulation reads
  - violates: a wolf's damage written as a number in the combat code
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D10, §7 and principle #4

*Rationale:* content in data makes a new item, game map or creature cheap, lets the content grow
by rules rather than by code, and keeps names and look swappable, which a world of one's own needs.
*Rejected:* none considered

### D-19 — How does the player interact with the terrain panel's drawing of the game map?

The terrain panel's drawing of the game map is a picture, not a control: its only interaction is
hovering, which links a tile with its row in the list of revealed tiles, and the numbers of stock
stand in that list, never on the drawing.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: terrain-drawing-numbers. For hovering and for everything else the
  player does on the drawing, since what the player sees and what the drawing does in answer is
  shown only by a real browser, which the repository does not declare, an agent compares the change
  with the decision:
  - complies: hovering a tile marks its row in the list of revealed tiles, and hovering that row
    marks the tile
  - violates: a click on a tile that sends the character there or changes the program
- **Origin:** mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Questions to settle", "Co pokazuje panel terenu?" · koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), §5

*Rationale:* the player writes the condition that fewer than N of a resource lie on the
character's tile against numbers the list shows, and the list keeps the stock of every resource of
a tile readable where numbers written into the tiles would not be; hovering ties a tile to its
numbers without writing them on it.
*Rejected:* the grid drawn without the list and its numbers — the player would write that condition
without seeing the number it compares; numbers written into the tiles — unreadable where a tile
holds several resources.

### D-20 — What interrupts the character's action in progress?

Neither a change of the program nor the condition of another program rule interrupts the
character's action in progress. The program picks a program rule again only once the character's
action ends.

- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: action-in-progress
- **Origin:** mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Questions to settle", "Gdzie i kiedy gracz zmienia program i od kiedy zmiana działa?"

*Rationale:* the player changes the program during a map run without ending it, and the change takes
effect from the next free game minute, once the character's action in progress has ended; the
program picks a program rule only in such a game minute, so the end of the character's action is
the one moment at which both a change of the program and a program rule whose condition has come to
hold take effect.
*Rejected:* a change of the program allowed only outside a map run — every fix to the program
would need the map run ended; a change of the program taking effect only from a map run restart —
two versions of the program in force at once.

### D-21 — How does time pass in a map run the player starts?

A map run the player starts passes at one game minute per real second, and the player can pause and
resume it.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: player-map-run-pace. For the player's way to pause and resume a map
  run, an agent compares the change with the decision:
  - complies: a control of the browser view that pauses the map run in progress and resumes it
  - violates: a map run the player can hold still only by ending it
- **Origin:** mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Questions to settle", "Jak płynie czas przejścia — w jakim tempie i czy gracz może go zatrzymać?" · for the pace of loop: mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Context", "Tempo jednej minuty gry na sekundę realną pochodzi z danych loop" · in loop's repository, not loop2's: the data file `src/sim/data/balance.ts`, `gameMinutesPerRealSecond: 1`

*Rationale:* one game minute per real second is the pace at which the predecessor game, loop, runs
without fast-forwarding, and a pause holds a map run without ending it.
*Rejected:* the same pace with no pause; a faster pace while the game has no fast-forwarding.

### D-22 — Where does the simulation's randomness come from?

Every random draw of the simulation comes from generators seeded by the seed saved in the map run's
state, one generator for each kind of draw — the game map's layout and wandering among them — and
the map run draws its game map's layout at its start, before the first game minute, in a fixed
order. A map run restart keeps its seed, and any other map run takes a new seed.

- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: map-run-repeatability · simulation-randomness · restart-seed ·
  map-run-layout. For the new seed of a map run other than a map run restart and for which generator
  a kind of draw uses, an agent compares the change with the decision:
  - complies: a map run sent anew that takes a seed other than that of the map run before it
  - violates: a map run sent anew that keeps the seed of the map run before it; wandering that draws
    from the generator of the game map's layout
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D19 and §9 "Losowania akcji dzielą strumień z losowaniem napaści" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "Where does the simulation's randomness come from?"

*Rationale:* the same program on the same seed gives the same map run to the game minute, so a map
run can be repeated when something has to be understood, and tests of the simulation can expect
exact values. With a generator for each kind of draw, a draw of one kind leaves the draws of every
other kind where they were, so a difference between two programs on one seed is a difference of
programs rather than of luck.
*Rejected:* the browser's own random numbers in the simulation — repeatability goes; one generator
for every kind of draw — a draw of one kind shifts the draws of every other kind.

### D-23 — How does a character act by its program?

A character acts only by its program: in each free game minute it carries out the first program
rule whose condition holds and whose action of the character can be carried out then. Conditions are
chosen from a closed list, never written as expressions, and the player has no way to carry out a
character's action by hand.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: program-rule-pick · action-in-progress · program-closed-lists. For a
  condition written as an expression, since a sentence naming what a kind of condition may take
  would also bind which kinds the closed list holds, which this decision leaves open, an agent
  compares the change with the decision:
  - complies: a condition picker listing the conditions of the closed list, each with the resource
    and the whole number it takes
  - violates: a text field taking a condition as an expression; a kind of condition added to the
    closed list that takes a formula as text
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D14, D15 and D9 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does a character act by its program?"

*Rationale:* the game is the writing of behaviour, so carrying out a character's action by hand
would get round its own core. Priorities with threshold sliders are decoration: different settings
end a game map identically, since only the order of the character's actions counts.
*Rejected:* priorities with threshold sliders — decoration; conditions written as expressions — the
player starts writing queries instead of arranging behaviour.

### D-24 — What is a game map made of?

A game map is a grid of hexagonal tiles whose dimensions, entrance, cost of a move and resources
stand in the game map's data, each resource with its density, stock per tile and time to renew one
piece. What is not on the game map's list of resources cannot be revealed there. Which tile gets
what is drawn by the map run from its seed, within the bounds the game map sets.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-22
- **Verification:** invariants: map-run-tiles. For what stands in the game map's data and for the
  shape of its grid, an agent compares the change with the decision:
  - complies: a new game map added as a row of the game maps' data, with its dimensions and
    resources; Las with a fixed entrance
  - violates: a game map with a hand-placed layout; a game map of square tiles
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D32, D17 and §5 "Mapa jest siatką sześciokątnych kafelków" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What is a map made of?"

*Rationale:* six neighbours at an equal distance make a move always mean the same. New challenges
come from the game map's settings alone — dimensions, densities, stocks, renewal, cost of a move.
The first game map has a fixed entrance because its first map run is a tutorial. Accepted with it: a
random layout widens the spread between seeds.
*Rejected:* a random layout without a fixed frame — difficulty cannot be steered; a fixed layout per
game map — exploring loses its sense after the first map run; square tiles — four directions make a
diagonal two moves, eight give it for free; the presence of a resource without a stock — cheaper,
but tests nothing in the game.

### D-25 — How does a character move?

A move onto a neighbouring tile is an ordinary action of the character, after which the program
picks a program rule anew, as after any action of the character. Exploring reveals the tile the
character stands on, cannot be repeated on a revealed tile and brings no item.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-23
- **Verification:** invariants: exploring-reveal · move-reach. For a journey kept as a route and for
  exploring that brings an item, an agent compares the change with the decision:
  - complies: "Go — stick" taking one move toward the nearest known tile with sticks, then the
    program choosing again
  - violates: a journey stored as a route; exploring that brings a stick
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D33 and §5 "Postać stoi na jednym kafelku" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does a character move?"

*Rationale:* the character reacts to the world between moves, and the state grows by nothing but
the position and the target of the current move. Exploring that brought an item would be gathering
in disguise.
*Rejected:* travel as a state with a stored route — the program has no say on the way; exploring
that brings an item.

### D-26 — How does a program point at things of the world?

A program points at a thing of the world only as the nearest known one of its kind, counted in game
minutes of walking, never by a number of its own. An action of the character that goes to a thing of
the world can be carried out where a thing of its kind is known and the character does not stand on
one, and nowhere else: there it has nothing to go to.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** derives from D-23
- **Verification:** invariants: walk-target · walk-feasibility · program-world-reference. For things
  of the world other than resources on tiles, an agent compares the change with the decision:
  - complies: "Go — stick" taking one move toward the nearest known tile with sticks; "Go — stick"
    passed over while the character stands on a known tile with sticks
  - violates: a program rule naming "tile 7"; "Go — stick" sending the character off the known tile
    with sticks it stands on toward another one
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D34 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does a program point at things of the world?"

*Rationale:* the layout of a game map differs on every seed, so a number given to a tile means nothing
that lasts, while "the nearest" means the same on every map run. Where nothing of the kind is known,
or the character already stands on such a thing, the nearest one is nowhere to go to; the program
then passes over the program rule and picks a later one, as it does for any action of the character
that cannot be carried out.
*Rejected:* numbering tiles in program rules — a program is written before the map run, and the
layout is drawn at its start.

### D-27 — Where do the game's icons come from?

The game's icons are SVG files from game-icons.net, kept in `assets/icons/` outside the directory
the account and save server serves and copied into that directory when the application is built.
An icon file holds nothing that runs and refers to nothing outside itself. The game's footer
credits each icon with its title as game-icons.net gives it, its author, its page on game-icons.net
and its licence, and says how the icon file differs from its source.

- **Scope:** browser-view, build-tools, simulation
- **Based on:** game-icons-licence · cc-by-3-adaptation-credit · cc-by-3-licence-copy
- **Relations:** none
- **Verification:** invariants: icon-file-content · icon-credits · loop2-container-icons. For where
  the icons come from and where their source files stand, an agent compares the change with the
  decision:
  - complies: a campfire icon taken from game-icons.net into `assets/icons/`, credited in the footer
  - violates: an icon file placed straight in the directory the server serves; an icon drawn from
    an emoji, or loaded from another site while the game runs
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), §7 "Grafika" · mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Questions carried to cycle", "Skąd biorą się ikony zasobów i czynności"

*Rationale:* game-icons.net holds a large set of game icons drawn in one style, under a licence that
allows their use in the game on condition of credit, so one source keeps the game's icons alike as
the game grows. An icon file comes from outside the product and is untrusted: holding nothing that
runs and reaching nothing outside itself, a changed file cannot act in the player's page. Sources
kept apart from what the server serves leave the build to decide what reaches the player. The
icons are changed to sit on the game's tiles, and the licence asks whoever distributes a changed
work to include the licence or its address, to credit the work's original author, its title where
one is supplied and the address the licensor gives for it, and to identify the use of the work in
the changed work. game-icons.net supplies a title for each icon on its page. Saying how each icon
file differs from its source goes beyond what the licence asks: it is the product's own choice.
*Rejected:* emoji — their look differs from one system to another; shapes drawn by hand — every new
thing costs drawing work; an icon package from npm — a dependency more for files the product can
keep itself, entering through what the product already treats as untrusted.

### D-28 — Which coding-guideline discipline does loop2 adopt?

Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring automatic formatting of Python and Bash and separate exemplars for tests, building, deployment, entry points and HTML; session, saved-game and mail exemplars are selected with their first implementations, and any deferred existing kind is compared before its exemplar is selected. For the adopted linters, full-compliance source invariants apply without a transitional per-file no-regression invariant. The general coding guidelines cover all code and give `tests/sim/time.test.mjs` as a test example without creating a formal test kind.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares the change with the decision:
  - complies: general and four kind guidelines follow the pinned templates, retain the stated deferrals and the test example, and use full-compliance source invariants without a transitional per-file no-regression invariant
  - violates: an additional mandatory test exemplar, automatic Python formatting, a transition-debt check or another departure from the templates, introduced without a new decision
- **Origin:** none

*Rationale:* The selected discipline gives code common checks and a small set of useful exemplars; broader exemplar maintenance and additional formatters add work without an established benefit.
*Rejected:* A complete exemplar audit and automatic formatting for every language — more maintenance and unmeasured reformatting work; transitional lint debt — an extra mechanism where full-compliance source invariants already apply.

### D-29 — Which rules check TypeScript and JavaScript?

Every application, script and test TypeScript and JavaScript file of browser-view, simulation, account-server and build-tools passes local pinned ESLint 10.12.0 run with `--max-warnings 0` on `eslint.config.mjs`, which applies @eslint/js 10.0.1 `recommended` and, for TypeScript, typescript-eslint 8.71.2 flat `recommendedTypeChecked` unchanged, with globals 17.13.0 and TypeScript API 6.0.2 for the parser while application compilation stays on TypeScript 7, all within the one shared npm package and lockfile. That configuration sets `linterOptions.noInlineConfig`, so an inline configuration comment fails the check, and ignores only dependencies, generated files, the submodule and temporary work results; review, in place of a check of the effective configuration, keeps its rules to those sets and its file patterns to that scope. Changing the rule set takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools
- **Based on:** eslint-recommended-rules · typescript-eslint-typechecked-rules
- **Relations:** derives from D-06
- **Verification:** invariants: eslint-source-rules · eslint-configuration-rules
- **Origin:** none

*Rationale:* The selected recommendations find defects in typed and untyped code with one tool; a separate supported parser API preserves the chosen application compiler at the cost of an extra development dependency. With inline configuration turned off, a suppressing comment is itself a failure, and a change that turns a rule off or hides a file stands in the configuration, where review sees it.
*Rejected:* A compiler downgrade — gives up the existing compiler choice; an unsupported parser API — risks unreliable type-aware reports; extra style sets — add obligations beyond the accepted set; product-written checks comparing the effective configuration with a frozen rule list and parsing inline directives — far more code to keep than the tool's own setting and a reviewed configuration.

### D-30 — Which Python rules block a change?

Every `.py` and `.pyi` file Ruff finds in browser-view, simulation, account-server, build-tools, deployment and agent-workflow passes local pinned Ruff 0.17.1 run with `--config ruff.toml --ignore-noqa`, where `ruff.toml` requires that version, turns preview off, excludes the submodule and temporary work results and selects the complete default nonpreview set minus `PLW1510`, `I001`, `ISC004`, `UP031`, `RUF059`, `PIE808`, `RUF007`, `RUF012`, `PLR0402`, `FURB167`, `RUF100`, `SIM117`, `FURB192`, `SIM102`: the remaining 393 rules block and these fourteen rules remain examples. The explicit configuration file holds for every file whatever other Ruff configuration stands in the repository, and no suppression comment takes effect. Changing that set takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** ruff-default-rules
- **Relations:** none
- **Verification:** invariants: ruff-source-rules
- **Origin:** none

*Rationale:* The selected subset retains useful defect reports while leaving reports that offer no worthwhile code change as examples; one explicit configuration keeps other configuration from quietly changing that boundary, and a suppression comment the tool ignores does no harm.
*Rejected:* The entire default set as blocking — forces unhelpful rewrites; no Python linter — leaves useful defect reports unchecked; product-written checks passing the list file by file and failing on the mere presence of a suppression comment — far more code to keep than a configuration file and the tool's own flag.

### D-31 — Which Bash rules block a change?

Every standalone Bash script in the code parts, extensionless scripts included, passes local pinned ShellCheck 0.11.0 run on it by name with `--norc --shell=bash --extended-analysis=true` at its default `style` severity: its default nonoptional Bash checks and every diagnostic severity, with no example-only rules. Embedded commands in YAML or test literals are outside this standalone-script scope, and review keeps a new script from going unnamed and a `# shellcheck` directive that disables a check or changes the set out of the scripts. Changing that set takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** shellcheck-default-bash-checks
- **Relations:** none
- **Verification:** invariants: shellcheck-source-rules. An agent compares a change with the decision:
  - complies: a new Bash script named in the test of shellcheck-source-rules, with no `# shellcheck` directive;
  - violates: a `# shellcheck disable=SC2086` line, or a new Bash script that test does not name.
- **Origin:** none

*Rationale:* The default checks cover shell defects without adding optional stylistic obligations; the flags keep rc files and directives from changing the shell or the analysis, and the few standalone scripts change seldom enough for review to see a new one or a disabling directive.
*Rejected:* No Bash linter — leaves shell defects unchecked; enabling optional checks — adds obligations outside the accepted set; product-written checks discovering scripts by their first line and classifying each directive — far more code to keep than a named list and review.

### D-32 — How is web code formatted?

All application, script and test TypeScript and JavaScript in browser-view, simulation, account-server and build-tools and browser HTML and CSS pass `--check` of local pinned Prettier 3.9.10 run with `--no-config --no-editorconfig --ignore-path .gitignore`: its default nonexperimental options — two spaces, semicolons, preferred double quotes, target width 80 and LF on every platform — with no ignore file of its own able to hide a file; Markdown, icons, generated files, dependencies, the submodule and temporary work results are excluded. The editor's `prettier.config.mjs` sets no option, narrow repository attributes preserve LF for that scope on Windows, and review keeps the check's file patterns to that scope and `prettier-ignore` comments out of covered code.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: prettier-source-format. An agent compares a change with the decision:
  - complies: a new browser module formatted by Prettier with no option set;
  - violates: a `// prettier-ignore` comment, or an option added to `prettier.config.mjs`.
- **Origin:** none

*Rationale:* One formatter and its default settings remove repeated layout choices and platform-dependent line endings; the initial whole-scope reformatting is accepted to avoid lasting exceptions.
*Rejected:* Per-file historic exceptions — preserve recurring format differences; Python and Bash formatting now — adds tools and unmeasured rewrites beyond the accepted scope; product-written checks feeding each file to the formatter's programming interface and comparing its settings and repository attributes — far more code to keep than the tool's own flags.

### D-33 — Which introduced dependency vulnerabilities block a change?

The dependency audit passes without a network request where `package-lock.json` equals its version at {fork-point}, and otherwise fails on each advisory of low, moderate, high or critical severity that local pinned npm 12.2.1, run as `npm audit --json --package-lock-only --audit-level=low --include=dev --include=optional --include=peer --registry=https://registry.npmjs.org/`, reports for that lockfile and not for its version at {fork-point}, reading the npm/GitHub Advisory Database through the public npm registry when the check runs. A failed request or an unreadable report fails the audit; info does not block, and the low threshold has no automatic revision or scheduled threshold review. The audit covers the root npm package of build-tools with its direct, transitive, production, development, optional and peer dependencies, sending package names and versions without application code, while nested npm packages and runtime, container-image, operating-system and non-npm dependencies are outside it.

- **Scope:** build-tools
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: introduced-npm-vulnerabilities
- **Origin:** none

*Rationale:* A low threshold starts conservatively while comparison with the start of the change keeps old vulnerabilities from blocking unrelated work; newly published advisories can change the result for the same lockfile. The registry matches each advisory's range to the locked versions itself, so comparing the advisories reported before and after the change needs no parsing of ranges, at the price of letting a further copy of an already reported vulnerable package through.
*Rejected:* Moderate, high or critical thresholds — accept known lower-severity vulnerabilities in introduced versions; auditing unchanged versions as blockers — stops unrelated work; trusting the audit's exit status alone — reads a failed request as a finding and compares nothing; a product-written audit matching advisory ranges to each introduced package-name/version pair — far more code to keep than comparing what the tool reports.

### D-34 — Which file is the exemplar for content data?

The exemplar for kind `content-data` is `src/browser/sim/data/resources.ts`, and its kind guidelines are read before adding or changing a file of that kind. The typed catalogue and identifiers derived from keys remain examples alongside the existing simulation-isolation rule, without requiring that catalogue shape in every data file.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-18 · derives from D-04
- **Verification:** an agent compares the change with the decision:
  - complies: content-data guidelines designate the selected exemplar, retain simulation-isolation and show the catalogue as an example
  - violates: a different exemplar or a new mandatory catalogue shape for every data file
- **Origin:** none

*Rationale:* A current typed content catalogue gives later authors a concrete model without creating a new architectural constraint for every kind of game data.
*Rejected:* Making the catalogue shape mandatory — constrains data whose useful structure differs; no exemplar — leaves each new catalogue to invent its own model.

### D-35 — Which file is the exemplar for simulation modules?

The exemplar for kind `simulation-module` is `src/browser/sim/game.ts`, and its kind guidelines are read before adding or changing a file of that kind. Explicit inputs and a result consisting of state and events illustrate the existing simulation-isolation and simulation-inputs rules, without requiring every helper to return `GameResult`.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-04
- **Verification:** an agent compares the change with the decision:
  - complies: simulation-module guidelines designate the selected exemplar and keep different suitable helper return types
  - violates: a different exemplar or a new obligation that every helper returns GameResult
- **Origin:** none

*Rationale:* The game operation illustrates explicit state transitions while allowing smaller helpers to expose only the result they compute.
*Rejected:* One result type for every helper — adds wrappers without a demonstrated need; no exemplar — leaves the operation model implicit.

### D-36 — Which file is the exemplar for browser modules?

The exemplar for kind `browser-module` is `src/browser/view/status-row.ts`, and its kind guidelines are read before adding or changing a file of that kind. Creating controls once, updating while preserving focus and passing user actions to the application remain examples alongside browser-view-framework and content-identifiers, without requiring `update()` in every module or forbidding the rebuilding of static elements.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-03 · derives from D-18
- **Verification:** an agent compares the change with the decision:
  - complies: browser-module guidelines designate the selected exemplar and show focus-preserving control updates as examples
  - violates: a different exemplar or a mandatory update method in every browser module
- **Origin:** none

*Rationale:* An existing small control shows stable editing behavior without forcing every view helper to own a control lifecycle.
*Rejected:* Mandatory update methods and a ban on static rebuilding — impose structure where no editable control needs it; no exemplar — leaves focus-preserving updates implicit.

### D-37 — Which file is the exemplar for the HTTP application?

The exemplar for kind `http-application` is `src/server/app.ts`, and its kind guidelines are read before adding or changing a file of that kind. Separating application creation from opening the listening port remains an example alongside account-server-express-http and loop2-api-error-route, with no additional structural check of the application factory.

- **Scope:** account-server
- **Based on:** none
- **Relations:** derives from D-02 · derives from D-05
- **Verification:** an agent compares the change with the decision:
  - complies: http-application guidelines designate the selected exemplar and show separate application creation as an example
  - violates: a different exemplar or a new mandatory factory-structure invariant
- **Origin:** none

*Rationale:* Separating creation from listening gives a concrete model that is easy to test, without settling the architecture of future account and saved-game features.
*Rejected:* A new factory-structure check — enforces an example as architecture; no exemplar — leaves the existing testable assembly model implicit.
