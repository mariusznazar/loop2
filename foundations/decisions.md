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
functions, of which those that pass game time take a game state and a span of game minutes and
return the next game state together with the events it produced, and real time enters the
simulation only as an argument. The browser view draws the game only from the game state and the
game's content data, and changes the game state only through functions of the simulation, to which
it passes the player's choices, the passing of real time and a saved game state the browser
downloaded from the server or kept in the page's memory after a save found no session (D-211).

- **Scope:** browser-view, build-tools, simulation
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: simulation-isolation · simulation-inputs. For the language the game
  is written in, for the shape of the simulation's functions and for how the browser view uses the
  game state, an agent compares the change with the decision:
  - complies: a game screen written as a TypeScript module that the build compiles for the browser;
    the simulation's function that passes real time to a map run taking the real time elapsed as an
    argument, which the browser view measures and passes in; the program editor of the
    browser view passing the edited program to a function of the simulation; the page building the
    game from the game state that a function of the simulation returns for the saved game state the
    browser downloaded, or from the refusal it returns; after a sign-in to the same account, the
    page building the game from what that function returns for the state it kept
  - violates: a screen of the game written as a Godot scene, or a script of the game's own code that
    the browser loads, written directly in JavaScript instead of compiled from TypeScript; a
    simulation function that reads the system time or the page; a screen of the browser view that
    replaces the game state with a value no function of the simulation returned; a screen of the
    browser view that writes a program rule straight into the game state
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D10, §7 and §9 "Wskrzeszenie a doliczanie nieobecności" · zapis_stanu_na_serwerze_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 10, and § Settlements to record, row 10

*Rationale:* text code and tests give the most leverage in work with AI agents. A simulation of
pure functions makes progress while away plain arithmetic and the save a JSON document, and runs on
a phone as well; real time passed in as an argument keeps the earning loop, the catch-up and the
renewal of a resurrection on one footing. The player changes the game state from the browser view —
the program editor, sending a character, a map run restart — and the passing of real time changes it
too; each goes through the simulation, so the game state changes in one place. A saved game state
downloaded from the server is data from outside the game, and a function of the simulation turns it
into a game state or refuses it, so loading also changes the game state in that one place; the
state the page keeps after a save found no session goes back into the game the same way, so its
map run comes back as a loaded one does. Such a function, like the one that starts a new game,
passes no game time. The browser view also reads the
game's content data, which stands apart from the game state, to name and picture what the game
state holds.
*Rejected:* Godot — slower to work on with AI agents; a browser view that draws from the game state
and changes nothing in it — the player changes the game state from the browser view; loading
counted as a choice of the player, signing in, with this decision left as it stood — a strained
reading, by which the next reader may take loading for a breach of this decision; the browser view
replacing the game state with the loaded saved game state itself, with an exception written into
this decision — the game state would change in two places, against this decision's example of a
breach.

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

The server holds the players' accounts and each player's saved game state, and computes nothing of
the game. The browser computes the whole game — the map runs, the earning loops and the catch-up —
and sends the saved game state to the server.

- **Scope:** account-server, browser-view, simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares the change with the decision:
  - complies: a server endpoint that stores the saved game state the browser sends and returns it
    unchanged on login; a save route that compares the version number of the saved game state's
    shape the browser sends beside the game with the stored one, reading nothing inside the game
  - violates: a server endpoint that advances a map run, or computes the catch-up; a server module
    that computes the outcome of a character's actions or of the time the game was closed
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D23 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How is the work of the game split between the server and the browser?"

*Rationale:* computing the game in the browser keeps it computed as loop computes it, so the server
adds only accounts and a save that follows the player from browser to browser. The catch-up
recomputes the map runs that would have happened, so a server running the game would buy little
at many times the cost. Players can replace their own saved game states and forge their own
progress. The MVP accepts that cost while the saved progress affects only its owner's game;
account isolation prevents changing another player's saved state.
*Rejected:* the server computing the game and running the earning loops itself — a second home for
the simulation and many times the work, for little gain while the catch-up recomputes the same map
runs; no accounts, with the save kept in the browser — drops the logging in the game is to have.

### D-08 — Where does the game run?

The game and its account and save server run in a dedicated loop2 container on Mikrus, at a
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

Players reach loop2 at `https://loop2.mariusznazar.com/` through an encrypted remotely managed Cloudflare Tunnel, whose `cloudflared` connector is a second service of the loop2 Compose project with its own memory limit and forwards internally to `http://app:3000`. The application publishes no host port, and the tunnel's published hostname replaces loop2's proxied AAAA record, Origin Rule and Configuration Rule. Deployment pins the official connector image by version and digest, uses HTTP/2 over IPv4, and waits for both application health and an active connector connection before reporting success.

- **Scope:** deployment
- **Based on:** cloudflare-tunnel-transport · cloudflare-tunnel-token-file · cloudflared-connection-readiness · mikrus-tunnel-outbound-tcp
- **Relations:** derives from D-08
- **Verification:** invariants: loop2-application-port. An agent compares the change with the decision:
  - complies: a private application container reached by the separately limited tunnel connector, whose image is prepared and health checked with the application
  - violates: a public origin port; a deployment that reports success while the connector has no active connection; a tunnel installed as an unmanaged host service
- **Origin:** none

*Rationale:* The tunnel encrypts traffic across the public network without adding certificate handling to the application, and keeping its connector in the product's deployment makes its version and resource boundary reviewable. The application depends on a working connector and its credential; replacing it during deployment adds a short interruption. HTTP/2 uses the observed TCP route; container connectivity and the chosen memory bounds still need observation on the host. The hostname remains independent of the hosting provider.
*Rejected:* A manually installed host connector — its version and updates would sit outside the product's deployment, although it would avoid restarting the tunnel with the application; Origin CA and Full (strict) in the game server — adds TLS handling or another server process and still needs a separate, unverified restriction on direct port access; a new Mikrus subdomain — ties the address to the provider; replacing the old game's public address — breaks the approved separation; automatic QUIC selection — adds an unverified UDP route and fallback delay.


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

*Rationale:* Until public account launch, the test server is intended to hold only the owner's account, so reading through a tool that can run any command remains accepted; the agent reads logs and state itself instead of the human relaying them. An outsider who discovers the public address can nevertheless register, and the read-only limit protects that account only by agreement. The `mikrus` MCP server runs
every command with full rights, so the limit to reading is an agreement, not an enforced boundary.
A deployment the automation starts on a push is no agent's change.
*Rejected:* a separate SSH key for the agent, closed in a read-only script — more setup than the
server's present contents warrant; no agent access to the server — the human relays every log and
state.

### D-13 — Where do the server's access values and secrets live?

Automation secrets and server access values — its name, SSH port, SSH user and IPv6 address — stay outside the repository in the repository's GitHub secrets and the owner's private note; runtime credentials live outside the checkout in `/etc/loop2/cloudflared-token` for the tunnel, `/etc/loop2/session-secrets` for session signing and `/etc/loop2/smtp-password` for the mail service, each backed up in that private note. Compose grants the tunnel file only to `cloudflared` as the read-only secret `/run/secrets/cloudflare_tunnel_token`, preserving the host directory's deployment-account ownership, group 65532 and mode 0750 and the tunnel file's same owner/group and mode 0640, grants the root-owned session file with group 1000 and mode 0440 only to the application as `/run/secrets/loop2_session_secrets`, and grants the root-owned SMTP password file with group 1000 and mode 0440 only to the application as `/run/secrets/loop2_smtp_password`, while the sender address and the mail service's host, port and login stand as plain values in `compose.yaml`. Repository files and requests name credentials by secret name or private note rather than value, may name non-secret paths and ports, and human rotation replaces the file and private copy before recreating its consumer; session rotation prepends the new signing secret while retaining old verification secrets until at least 30 days after the last deployment able to sign with each old secret, with a restored old signing configuration restarting that interval.

- **Scope:** deployment, agent-workflow
- **Based on:** cloudflare-tunnel-token-file · compose-file-secret-permissions · cloudflared-image-identity · session-secret-rotation
- **Relations:** none
- **Verification:** an agent compares the change with the decision:
  - complies: a connector receiving only its tunnel token and an application receiving only its session keys and SMTP password, with human rotation preserving host permissions and the private copies; old session signatures remain accepted while new responses use the first key
  - violates: an access or credential value in a workflow, script, skill, request, command argument, log or container environment; a world-readable credential, a tunnel-token grant to the application, a session-key or SMTP-password grant to the connector, or old-key removal while its signatures can still be valid
- **Origin:** none

*Rationale:* Access values reveal where and how to enter the server, whereas deployment paths and container ports do not. A runtime credential must survive starts outside automation, and the private copy supports recovery independently of the provider dashboard. A file-backed secret avoids printing the token in configuration and environment inspection, at the price of maintaining host permissions and another copy during rotation.
*Rejected:* Session secrets supplied through container environment or a root-starting application that changes user — broaden exposure or startup privilege; keeping only secret values outside the repository — access values would still reveal how to enter the server; keeping the runtime token only in GitHub secrets — the runtime cannot retrieve it on an ordinary restart; a server token without a private copy — recovery depends on issuing another token; environment delivery — exposes the credential through environment inspection.


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

A deployment that stops before it starts the new containers leaves the running loop2 containers in
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

*Rationale:* Rebuilding an earlier commit keeps the repository and the deployed code in agreement without keeping product images as a recovery store. Application and connector images are prepared before either running container is replaced; shared base images and build cache remain outside product cleanup. A human can try a request before its merge or recover at once. Crossing a deployment-route change also requires the matching installed command and external route settings, so code rollback alone is not public-route recovery. Rebuilding restores code, not historical data or necessarily identical upstream layers.
*Rejected:* Keeping earlier product images and switching by index — speeds recovery but requires independent retention rules and does not restore the installed deployment command or external routing.


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
test server is intended to hold only the owner's account before public account launch, even though an outsider can discover the address and register. Code merged into `main`, its container build and service
definitions included, runs on the host with root's authority through the deployment, so it is
trusted code and whoever can merge to `main` can act on the host; the trust boundary stays with the
files that take in data the product does not trust.
*Rejected:* a forced command that runs the checkout's own copy — a pushed commit could change what
the key runs; a deployment that refuses when the copies differ — every rollback past a change of the
source would stop.

### D-17 — How does loop2 share the Mikrus host with other workloads?

A deployment of loop2 changes nothing on the host but loop2's own checkout, application and connector images and containers, its named database volume `loop2_accounts`, log and lock, and the build cache and base images its builds add to the shared Docker store, which it never prunes; it removes or replaces nothing of another workload. It builds only while the host's available memory and free disk stay above thresholds the repository sets, and each loop2 container runs under its own memory limit. The tunnel token, session signing and SMTP password files are provisioned by the human outside the checkout and mounted read-only only to their respective consumers under D-13, while the application alone mounts `loop2_accounts` at `/app/data` for `/app/data/accounts.sqlite`, with its initial directory owned by uid/gid 1000 and the database preserved across application-container replacement and code rollback.

- **Scope:** deployment
- **Based on:** mikrus-host-docker-workloads · mikrus-host-swap · docker-volume-lifecycle
- **Relations:** derives from D-08
- **Verification:** invariants: loop2-host-sharing · account-save-durable-storage. Checks of accounts and sessions alone do not establish preservation of saved game states and cannot clear account-save-durable-storage. For the thresholds and the memory limit, an
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
*Rejected:* A manually provisioned host directory for accounts — adds a setup operation instead of a deployment-created Docker volume; a host-wide prune to reclaim build cache — it would remove images and cache of other
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

An attack interrupts the character's action still in progress, and that action is lost; a change of the program or the condition of another program rule leaves that action running. The program chooses again at the next free game minute, and before the character's action in each combat turn.

- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: action-in-progress
- **Origin:** mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Questions to settle", "Gdzie i kiedy gracz zmienia program i od kiedy zmiana działa?"

*Rationale:* editing a program leaves the work already begun intact, while an attack makes the character respond to the creature instead; the program as it stands at each next choice controls that response. Losing the interrupted work makes an attack matter even when the character survives it.
*Rejected:* a change of the program allowed only outside a map run — every fix to the program
would need the map run ended; a change of the program taking effect only from a map run restart —
two versions of the program in force at once.

### D-21 — How does time pass in a map run the player starts?

A map run the player starts passes at one game minute per real second times the pace the player
picks of 1×, 2×, 4×, 8× and 16×, and the player can pause and resume it. Picking a pace while the
map run is paused, the pause at a discovery included, changes the pace and leaves the map run paused
until „Wznów”.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: player-map-run-pace. For the player's way to pause and resume a map
  run, to pick a pace and to fast-forward, an agent compares the change with the decision:
  - complies: a control of the browser view that pauses the map run in progress and resumes it; a
    map run at 16× passing sixteen game minutes, one after another, in one real second; „8×” picked
    during a pause leaving the game minute where it stands until „Wznów”
  - violates: a map run the player can hold still only by ending it; a pace picked during a pause
    resuming the map run; a control that takes a map run straight to its result or back to an
    earlier game minute
- **Origin:** mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Questions to settle", "Jak płynie czas przejścia — w jakim tempie i czy gracz może go zatrzymać?" · for the pace of loop at 1×: mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Context", "Tempo jednej minuty gry na sekundę realną pochodzi z danych loop" · in loop's repository, not loop2's: the data file `src/sim/data/balance.ts`, `gameMinutesPerRealSecond: 1` · rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "2. Czy cykl tego zadania zmienia decyzję D-21 i niezmiennik `player-map-run-pace`, które dziś trzymają przejście na jednej minucie gry na sekundę realną?", "3. Jakie tempa przewijania gracz wybiera i gdzie stoi przełącznik tempa?" and "13. Co robi wybranie tempa w czasie pauzy — także w zatrzymaniu przy odkryciu?" · koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D22 · the part on a manual map run: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How fast does the earning loop go?"

*Rationale:* solving a map is a puzzle the player may fast-forward: at one game minute per real
second, the pace at which the predecessor game, loop, runs at 1×, each attempt at the 480 game
minutes of Las takes eight real minutes, and at 16× half a real minute. Fast-forwarding is a faster
pace of the same game minutes, which pass one after another in sight, so the player still watches
the program act. A pause holds a map run without ending it, and it stays an act of its own, so a pace
picked in a pause leaves the map run standing. Accepted with it: at 16× the screen moves on several
game minutes at each refresh; real time passes in a hidden browser tab too, so a map run at 16× left
in a hidden tab passes the whole of Las unseen, its end included; a player who picks a pace in a
pause sees nothing move until „Wznów”.
*Rejected:* the same pace with no pause; a jump of a map run to its result, and a way back to an
earlier game minute — the player would no longer watch the program act; picking a pace in a pause
resuming the map run — the pace and the pause would stop being two acts; the pace buttons shown
inactive during a pause — the player could not set the pace before going on.

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

A character acts only by its program: in each free game minute and immediately before its action in each combat turn it carries out the first program
rule whose condition holds and whose action of the character can be carried out then, taking rule
groups in order, each only while its condition holds, and a rule group whose condition holds but
which holds nothing that can be carried out passes on. Conditions are chosen from a closed list,
never written as expressions, rule groups stand one level deep, and the player has no way to carry
out a character's action by hand. Which piece of an item an action uses — which fuel goes into a
campfire — the simulation chooses, not the program.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: program-rule-pick · action-in-progress · program-closed-lists. For a
  condition written as an expression, since a sentence naming what a kind of condition may take
  would also bind which kinds the closed list holds, which this decision leaves open, an agent
  compares the change with the decision:
  - complies: a condition picker listing the conditions of the closed list, each with the resource
    and the whole number it takes; a condition on the character's temperature taking 36.5, a number
    with tenths, from a number field of the picker; a rule group "when very cold" above a rule group
    "when chilly"
  - violates: a text field taking a condition as an expression; a kind of condition added to the
    closed list that takes a formula as text; a button that makes the character eat now; a rule
    group inside a rule group; a program rule naming which stick to burn
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D14, D15 and D9 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does a character act by its program?"

*Rationale:* the game is the writing of behaviour, so carrying out a character's action by hand
would get round its own core. Priorities with threshold sliders are decoration: different settings
end a game map identically, since only the order of the character's actions counts. A rule group
gives what a flat list cannot — two conditions joined — so two strategies for two depths of one
crisis can be written, and a rule group that passes on keeps an empty one from stopping the
character.
*Rejected:* priorities with threshold sliders — decoration; conditions written as expressions — the
player starts writing queries instead of arranging behaviour; a separate editor for combat — a
second mechanism for the same thing; nested rule groups — one level is enough.

### D-24 — What is a game map made of?

A map is a grid of hexagonal tiles whose dimensions, entrance — fixed, or drawn by the map run —,
cost of a move, attacking creatures with how often they attack, and resources stand in the map's
data, each resource with its density, stock per tile and time to renew one piece, no time meaning a
resource that does not renew. What is not on the map's list of resources cannot be gathered or
revealed there. Which tile gets what is drawn by the map run from its seed, within the bounds the
map sets.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-22
- **Verification:** invariants: map-run-tiles. For what stands in the game map's data and for the
  shape of its grid, an agent compares the change with the decision:
  - complies: a new game map added as a row of the game maps' data, with its dimensions and
    resources; Las with a fixed entrance, Las — głębiej with a drawn one
  - violates: a game map with a hand-placed layout; a game map of square tiles
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D32, D17 and §5 "Mapa jest siatką sześciokątnych kafelków" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What is a map made of?"

*Rationale:* six neighbours at an equal distance make a move always mean the same. A resource that
runs out makes wandering matter; without it a program finds one good tile and the rest of the map
run looks as before. New challenges come from the map's settings alone — dimensions, densities,
stocks, renewal, cost of a move. The first map has a fixed entrance because its first map run is a
tutorial. Accepted with it: a random layout widens the spread between seeds.
*Rejected:* a random layout without a fixed frame — difficulty cannot be steered; a fixed layout per
game map — exploring loses its sense after the first map run; square tiles — four directions make a
diagonal two moves, eight give it for free; the presence of a resource without a stock — cheaper,
but tests nothing.

### D-25 — How does a character move?

A move onto a neighbouring tile is an ordinary action of the character, after which the program
picks a program rule anew, as after any action of the character. Exploring reveals the tile the
character stands on, cannot be repeated on a revealed tile and brings no item, and gathering takes
only from a revealed tile, as much as lies on it.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-23
- **Verification:** invariants: exploring-reveal · move-reach. For a journey kept as a route, for
  exploring that brings an item and for where gathering takes from, an agent compares the change
  with the decision:
  - complies: "Go — stick" taking one move toward the nearest known tile with sticks, then the
    program choosing again; a gathering on a revealed tile holding one stick taking that stick
  - violates: a journey stored as a route; exploring that brings a stick; a gathering on a tile not
    yet revealed; a gathering that takes a stick from a revealed tile holding none
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
one, and nowhere else: there it has nothing to go to. A tile holds at most one campfire, which warms
only that tile.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** derives from D-23
- **Verification:** invariants: walk-target · walk-feasibility · program-world-reference. For things
  of the world other than resources on tiles, and for campfires on a tile, an agent compares the
  change with the decision:
  - complies: "Go — stick" taking one move toward the nearest known tile with sticks; "Go — stick"
    passed over while the character stands on a known tile with sticks; "Go — campfire" taking one
    move toward the nearest campfire
  - violates: a program rule naming "tile 7"; "Go — stick" sending the character off the known tile
    with sticks it stands on toward another one; a program rule naming "campfire 2"; a second
    campfire made on a tile that has one; a campfire warming a character on a neighbouring tile
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D34 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does a program point at things of the world?"

*Rationale:* the layout of a game map differs on every seed, and campfires arise in a different
order on every seed, so a number given to a tile or a campfire means nothing that lasts, while "the
nearest" means the same on every map run. Where nothing of the kind is known, or the character
already stands on such a thing, the nearest one is nowhere to go to; the program then passes over
the program rule and picks a later one, as it does for any action of the character that cannot be
carried out. A second campfire on one tile warms nothing above the ceiling of warmth and spoils the
reading of the conditions about the fire.
*Rejected:* numbering tiles in program rules — a program is written before the map run, and the
layout is drawn at its start; numbering the campfires in program rules — a program is written before
the map run, and the campfires arise during it.

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

Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring automatic formatting of Python and Bash and separate exemplars for building, deployment, entry points, HTML and CSS; session, saved-game and mail exemplars are selected with their first implementations, and any deferred existing kind is compared before its exemplar is selected. For the adopted linters, full-compliance source invariants apply without a transitional per-file no-regression invariant. The general coding quality checks cover all code, tests included, while testing rules and exemplars by level stand in `guidelines/testing.md`, together with the explicit-time example from `tests/sim/time.test.mjs`, which is no additional exemplar.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares the change with the decision:
  - complies: general and four kind guidelines follow the pinned templates, retain the stated deferrals and direct test authors to the testing guidelines, and use full-compliance source invariants without a transitional per-file no-regression invariant
  - violates: a stylesheet exemplar or guidelines of their own for stylesheets, automatic Python formatting, a transition-debt check or another departure from the templates, introduced without a new decision
- **Origin:** none

*Rationale:* The selected discipline gives code common checks and a small set of useful exemplars; broader coding-exemplar maintenance and additional formatters add work without an established benefit. The rules of the browser view's stylesheets that a cheap test keeps already stand in its styleguide, so a kind of their own would add no rule; a second stylesheet then has no designated model.
*Rejected:* A complete exemplar audit and automatic formatting for every language — more maintenance and unmeasured reformatting work; transitional lint debt — an extra mechanism where full-compliance source invariants already apply; CSS as a kind of its own with an exemplar and kind guidelines — its only rules a test keeps stand in the styleguide.

### D-29 — Which rules check TypeScript and JavaScript?

Every application, script and test TypeScript and JavaScript file of browser-view, simulation, account-server and build-tools passes local pinned ESLint 10.12.0 run with `--max-warnings 0` on `eslint.config.mjs`, which applies @eslint/js 10.0.1 `recommended` and, for TypeScript, typescript-eslint 8.71.2 flat `recommendedTypeChecked` unchanged, with globals 17.13.0 and TypeScript API 6.0.2 for the parser while application compilation stays on TypeScript 7, all within the one shared npm package and lockfile. That configuration sets `linterOptions.noInlineConfig`, so an inline configuration comment fails the check, and ignores only dependencies, generated files, the submodule and temporary work results, while the check runs with an empty bulk-suppressions file of its own, so an `eslint-suppressions.json` in the repository hides no report; review, in place of a check of the effective configuration, keeps its rules to those sets and its file patterns to that scope. Changing the rule set takes a human-accepted change of this decision.

- **Scope:** browser-view, simulation, account-server, build-tools
- **Based on:** eslint-recommended-rules · typescript-eslint-typechecked-rules
- **Relations:** derives from D-06
- **Verification:** invariants: eslint-source-rules. An agent compares a change with the decision:
  - complies: a change to `eslint.config.mjs` that adds the file pattern of a new directory of code in that scope;
  - violates: a rule set to `off` in `eslint.config.mjs` or an ignore of a source directory, without a human-accepted change of this decision.
- **Origin:** none

*Rationale:* The selected recommendations find defects in typed and untyped code with one tool; a separate supported parser API preserves the chosen application compiler at the cost of an extra development dependency. With inline configuration turned off, a suppressing comment is itself a failure, with the check's own empty suppressions file a bulk-suppressions file silences nothing, and a change that turns a rule off or hides a file stands in the configuration, where review sees it.
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
- **Verification:** invariants: introduced-npm-vulnerabilities · dependency-audit-refusal
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

### D-38 — Which styleguide discipline does loop2 adopt for the browser view?

Loop2 adopts the styleguide template of its pinned the-way, with no departure, for the user interface the part browser-view draws: its styleguide holds every rule and example the template requires, in the template's order, and drops none.

- **Scope:** browser-view, agent-workflow
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: design-token-sources. An agent compares a change with the decision:
  - complies: `guidelines/styleguide-browser-view.md` holding the nine required rules in the template's order, each with its decision, its invariant or `none`, and the examples *Mockups* and *Plan of a user-interface change*;
  - violates: a required rule dropped from the styleguide, or another departure from the template's form, without a decision of the log that gives its reason.
- **Origin:** styleguide_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q18. Jak nazywają się role w kodzie i czy jakieś odstępstwa zostają celowo?" and "Q19. Jak rozstrzygnąć luki i sprzeczności, które znalazła krytyka?", point H

*Rationale:* Without a styleguide each screen of the MVP adds values written straight into its styles, and the look of the game drifts with every task; the template gives the rules every screen is compared with, and loop2 keeps no exception to them on purpose.
*Rejected:* a styleguide departing from the template — loop2 holds no exception it wants to keep.

### D-39 — What do the signal colours of the browser view mean?

In the browser view the role `positive` means that something works, is in order or is active now; `warning` means caution, that something is not carried out or is not saved, a wrong value typed into a field included; `danger` means that a character, progress or data may be lost; `discovery` means that something new was discovered; and `player-change` means that the player did it. Each of the five is a role of the kind text and stands as text on the backgrounds `page`, `panel` and `highlight`.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: design-token-contrast. An agent compares a change with the decision:
  - complies: the message under a number field holding a wrong value, written in `warning`; the text of the button „Zakończ” in `danger`;
  - violates: the message of a wrong value in a field written in `danger`; `discovery` used for a message that the player changed the program.
- **Origin:** styleguide_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q3. Jakie znaczenia niosą kolory sygnałowe?" and "Q19. Jak rozstrzygnąć luki i sprzeczności, które znalazła krytyka?", point B

*Rationale:* The meanings are those the signal colours — green, orange, red, yellow and violet — carry in loop, the game whose look loop2 starts from, so they read as they do there; the character's outline takes a role of its own. The meanings stay fixed while the values may change: a new or changed meaning takes a change of this decision.
*Rejected:* a wrong value in a field marked in `danger` — nothing is lost by it, and `danger` is kept for a possible loss.

### D-40 — What do the neutral roles of the browser view mean?

In the browser view the background `page` means that here is the game, `panel` a block set apart, and `highlight` that this row or track is marked or that this control is under the pointer; `divider` means that one section ends and the next begins, `control-border` that something can be clicked or typed into, and `selected` that this is the one chosen in its group. Of the roles of the kind text, `text-strong` means a name, heading or value looked at first, `text` content to read, `text-secondary` a description, explanation or note, `text-label` the name of a field or section, or a date, and `text-disabled` that this cannot be used now. Each of the five stands as text on `page`, `panel` and `highlight`, and `text` is the text each of the three backgrounds is written with.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: design-token-contrast. An agent compares a change with the decision:
  - complies: the date of a row written in `text-label`; the button chosen in a group framed in `selected` with its text in `text-strong`; a button under the pointer on the background `highlight`, its frame and its text role unchanged;
  - violates: the text of a disabled button written in `text-secondary`; the button chosen in a group shown by the background `highlight` alone.
- **Origin:** styleguide_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q4. Jakie role mają tła, ramki i tekst?", "Q12. Jakie są wspólne kontrolki i ich stany?" and "Q19. Jak rozstrzygnąć luki i sprzeczności, które znalazła krytyka?", point C

*Rationale:* Each neutral role answers one question a player asks of a grey on the screen, so a new label, frame or background takes the grey of its meaning rather than the one that looks nearest. Fewer greys later take either equal values for several roles or a change of this decision with a mechanical rename.
*Rejected:* three greys for every neutral use — fewer roles, each grey carrying several meanings.

### D-41 — What do the roles of the terrain grid and of keyboard focus mean?

In the browser view `character` means that here is the character and here it is going, the target of its current move told from its place by shape, a thin dashed line in place of a thick solid one, never by colour; `tile-hidden` means a place not yet known, `tile-revealed` a place known, whose icons say what lies there, and `tile-edge` the border between tiles of either kind. `link-highlight` means that this tile and this row of the list of revealed tiles are the same place, `depleted` that what was here is gone, and `focus` that here is where the player is, using the game by keyboard.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: design-token-contrast. An agent compares a change with the decision:
  - complies: the target of the current move drawn as a thin dashed line in `character`; a hovered tile and its row marked by a line in `link-highlight`, the tile's own colour unchanged;
  - violates: the target of the current move drawn in a colour of its own; a hovered tile filled with another colour.
- **Origin:** styleguide_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q7. Jakie role ma siatka terenu i fokus klawiatury?", "Q10. Jak wyglądają siatka terenu, podświetlenie powiązania, wyczerpane i fokus?" and "Q19. Jak rozstrzygnąć luki i sprzeczności, które znalazła krytyka?", point C

*Rationale:* The character's place and the target of its current move are one figure, the character and where it goes, so one role carries both, with one meaning, and the drawing tells them apart by shape. The tiles keep the grid of loop: unknown tiles dark and empty, known ones lighter with the icons of their resources, an icon dimmed at a stock of zero.
*Rejected:* a colour of its own for the target of the current move — a second colour for one figure.

### D-42 — Which accessibility requirements does the browser view keep?

For now every screen of the browser view keeps three success criteria of WCAG 2.2, the W3C Recommendation of 12 December 2024 — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast and 2.4.7 Focus Visible — and no other requirement of WCAG, with no date or event set for returning to it. Every role of the kind text but `text-disabled`, the signal colours included, has a contrast ratio of at least 4.5:1 on `page`, `panel` and `highlight`, and `text-disabled` has no threshold. `control-border`, `focus` and `character` have a contrast ratio of at least 3:1 against the colours they touch, and so has `tile-revealed` against `tile-hidden`.

- **Scope:** browser-view
- **Based on:** wcag-text-contrast · wcag-non-text-contrast · wcag-focus-visible
- **Relations:** none
- **Verification:** invariants: design-token-contrast · browser-view-focus-outline. An agent compares a change with the decision:
  - complies: a review that judges a new screen's contrast and focus by the three criteria and nothing more of WCAG;
  - violates: a review that holds a change back for a success criterion of WCAG other than the three, without a change of this decision.
- **Origin:** styleguide_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q5. Czy prawo albo umowa wiąże dostępność interfejsu loop2?", "Q6. Jaki standard dostępności przyjmuje interfejs loop2?" and "Q8. Do jakiego kontrastu sprawdzenie trzyma każdą parę?"

*Rationale:* No law or contract binds the accessibility of loop2's user interface; basic accessibility is the product's own choice where it adds little work, and it stays cheap when kept from the start. The contrast check knows nothing of the size of the text on a pair, so it holds every pair to the threshold of normal text, and disabled text falls under the criterion's exception for an inactive component.
*Rejected:* the whole of WCAG 2.2 at level AA — more requirements than the product takes on for now.

### D-43 — What counts in the browser view as a value written in place of a design token?

In the files of the part browser-view other than its file of design tokens, a value written in place of a design token is a colour in any notation — hexadecimal, functional, a named colour or a system colour — in styles and in TypeScript and, in styles, a size or spacing in `px`, `rem` or `em`, a font name, or a unitless stroke width, dash pattern, opacity or font weight, those four unitless kinds being all. None is `0`, a percentage, a size in `fr`, `vw` or `vh`, a keyword such as `transparent`, `currentColor`, `inherit` or `none`, a screen-width threshold of an `@media` rule, the geometry of the terrain drawing computed in TypeScript, the `width` and `height` attributes of an image, a layout dimension — a width or height with its minimum and maximum, or the sizes of the columns of a layout grid — or the content of an icon file in `assets/icons/`, whose colour stands in the file and is changed by hand when the value of `text-strong` changes.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-38
- **Verification:** invariants: browser-view-token-values. For values the text of a file does not show, an agent compares a change with the decision:
  - complies: a gap of the stylesheet written as `var(--space-s)`; the radius of a tile computed in TypeScript; `line-height: 1.4`;
  - violates: a TypeScript module that builds a colour from numbers it computes and writes it into a style.
- **Origin:** styleguide_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q15. Co liczy się jako wartość wpisana zamiast tokenu projektowego?" and "Q19. Jak rozstrzygnąć luki i sprzeczności, które znalazła krytyka?", point D

*Rationale:* A value each screen writes for itself drifts from the same value elsewhere — the highlight changed in one place leaves a tile and its row of the list in two colours — so every colour, length, font and value of appearance is read from one place. What stays outside carries no meaning of the styleguide: layout, the geometry of the drawing, and the icon files, which hold their colour themselves, so a change of `text-strong` reaches them only by hand.
*Rejected:* the icons coloured from a design token rather than in their files; a gentler check counting no more such values than before the change — the screens are moved onto the tokens at once.

### D-44 — Which controls do the screens of the browser view build on?

The screens of the browser view build every button, select list, number field and text field from the six shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the select list, the number field and the text field — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany” and „Przełącz postać na ten program” are destructive buttons. A control awaiting a server response is disabled with text in `text-disabled`; the button that sends a form then reads „Logowanie…” or „Zakładanie konta…” for the corresponding form, and that form's fields are disabled, and the header's button „Wyślij ponownie” then reads „Wysyłanie…”. A form's server refusal and loss of connection appear as one sentence below the form in `warning`, and the kitchen-sink page shows the waiting and refusal states.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-38
- **Verification:** an agent compares a change with the decision:
  - complies: the button „Wyślij” of a new screen made with the shared button;
  - violates: a module that creates and styles a `<button>` of its own; „Usuń” made as a plain button; „Porzuć zmiany” or „Przełącz postać na ten program” made as a plain button.
- **Origin:** styleguide_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q12. Jakie są wspólne kontrolki i ich stany?" · programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q5. Co panel programu pokazuje w trakcie przejścia, jak gracz widzi niezapisane zmiany kopii, gdzie stoją „Zapisz w programie”, „Zapisz jako nowy program” i „Porzuć zmiany” i co dzieje się po zapisie jako nowy program?" and "Q16. Czy przycisk „Przełącz postać na ten program” jest przyciskiem zwykłym czy niszczącym (D-44)?" · potwierdzenie_adresu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 3, and § Settlements to record, row K4

*Rationale:* Buttons, select lists and fields that each module makes for itself differ in size between screens, and their focus, disabled and error states look as the browser draws them; a destructive button that looks like a safe one hides that it ends a map run, deletes a program rule or a program, sets the progress on a map to zero or drops the copy's unsaved changes. A changed label and disabled fields make a pending account operation visible and prevent repeated submission; the absence of animation leaves a long wait less conspicuous. Accepted with it: „Przełącz postać na ten program” is drawn as a destructive button wherever it stands, also while the streak stands at zero and the copy holds no unsaved changes.
*Rejected:* controls each screen makes for itself — sizes and states drift from screen to screen; „Przełącz postać na ten program” as a plain button — a button that sets the streak to zero and can drop the copy's unsaved changes would look like a safe one; a destructive look for it where something would be lost and a plain one elsewhere — the same button would change its look with the state of the map run.

### D-45 — Where does the browser view's kitchen-sink page stand?

The kitchen-sink page of the browser view is built from `src/browser/kitchen-sink/` and opened on the developer's machine by its own command, `npm run kitchen-sink`, and nothing `npm run build` writes, which is what reaches the test server, holds it. The page shows every shared control in each of its states or the reason a state does not apply, every role, and samples of tiles in each state drawn with the roles, never a drawing of the game from a game state.

- **Scope:** browser-view, build-tools
- **Based on:** none
- **Relations:** derives from D-38
- **Verification:** invariants: application-build-kitchen-sink · preview-server-access. An agent compares a change with the decision:
  - complies: the page compiled into `dist/kitchen-sink/` and served on the developer's machine alone;
  - violates: the page drawing the terrain panel from a game state put together by hand; the page served by the account server in a development mode.
- **Origin:** styleguide_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q13. Gdzie stoi strona wszystkich stanów i jak nie trafia na serwer testowy?" and "Q19. Jak rozstrzygnąć luki i sprzeczności, które znalazła krytyka?", point A

*Rationale:* The test server deploys what `npm run build` writes, and the account server serves the whole of its output, so a page kept out of that build never reaches players. Samples drawn with the roles show every state of a tile without a game state made by hand, which no function of the simulation returned (D-04).
*Rejected:* the page in the application's build, served by the account server in a development mode — it would stand among what the test server serves.

### D-46 — Which fonts does the browser view use, and where do they come from?

The fonts of the browser view are Geist and Geist Mono, whose web-font files and licence file are taken from a release of github.com/vercel/geist-font into `assets/fonts/`, outside the directory the account and save server serves, and copied into that directory when the application is built. The game loads fonts only from those files, never from another server, and sets the chronicle and the clock of the map run in Geist Mono and every other text in Geist.

- **Scope:** browser-view, build-tools, deployment
- **Based on:** geist-licence · npm package `geist` 1.8.2, its peer dependencies (https://registry.npmjs.org/geist/1.8.2 § peerDependencies — "{"next":">=13.2.0"}"; read 2026-10-23)
- **Relations:** none
- **Verification:** invariants: font-file-provenance. An agent compares a change with the decision:
  - complies: an `@font-face` rule whose `src` reads a file under `/fonts/` copied there from `assets/fonts/`; the clock of the map run in the status row set in Geist Mono;
  - violates: a stylesheet that loads a font from Google Fonts or another CDN; font files taken from the npm package `geist`; the headings of the panels set in Geist Mono.
- **Origin:** styleguide_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q11. Jakie czcionki, rozmiary i odstępy?"

*Rationale:* The look loop2 starts from uses Geist and Geist Mono. Fonts kept in the product's files load from the game's own server, change only by a change of the repository and stand beside the licence they are released under; kept apart from what the server serves, as the icons are, they reach the player only through the build.
*Rejected:* the system's own fonts — the look of loop is lost; fonts loaded from Google Fonts or a CDN — the game would fetch from another server; the npm package `geist` — its release declares Next.js as a peer dependency, and its files would stand among the installed dependencies rather than in the product's files.

### D-47 — Which elements of the browser view are controls, and how does their focus show?

A control of the browser view is every HTML element the browser lets the keyboard reach, links included, and the code marks none. One `:focus-visible` rule of the game's stylesheet draws the focus of every control from the role `focus`, and no other style or code of the part browser-view sets `outline` or an `outline-*` property, except that the kitchen-sink page's stylesheet repeats that rule with one more selector, for its sample of the focused state.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-42
- **Verification:** invariants: browser-view-focus-outline. An agent compares a change with the decision:
  - complies: a link of the footer showing the outline of `focus` when the keyboard reaches it;
  - violates: a class added to the controls to give them their focus; `outline: none` on a shared button; an outline set from TypeScript.
- **Origin:** styleguide_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q21. Które elementy są kontrolkami dla testu widocznego fokusu i jak kod je oznacza?" and "Q22. Jak brzmią niezmienniki i decyzja fokusu po krytyce?"

*Rationale:* One rule reaches every element the keyboard reaches without the code marking it, so a new control or link shows its focus with nothing added. A control that needs another outline takes a change of this decision, and an outline turned off in an unusual way is found only by review.
*Rejected:* a class on each control; the shared controls alone, without links — the links of the footer would show no focus.

### D-48 — How are the design tokens of the browser view named?

In the file of design tokens of the browser view, each role of its styleguide's table of roles is the custom property `--<role>`, under the role's own name, and every other value of appearance is a custom property named by what it is for, never by its colour or by its number alone.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-38
- **Verification:** an agent compares a change with the decision:
  - complies: `--text-label` for the role `text-label`; `--space-s` for a size of the spacing scale; `--font-size-label` for the size of labels;
  - violates: `--space-8` for the spacing of 8 px; `--zinc-900` for the background `page`; `--yellow` for the role `discovery`.
- **Origin:** styleguide_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q18. Jak nazywają się role w kodzie i czy jakieś odstępstwa zostają celowo?"

*Rationale:* A value may change while its meaning stays, so a name that tells what the value is for stays true when the value changes, and the change stays in the one place that holds the value; a name telling a colour or a number turns false with the first such change, or takes a rename in every style that reads it.
*Rejected:* names by the value — a colour's name or the number of pixels of a spacing — each change of a value renames the property in every style.

### D-49 — Which port does a loop2 test give the server it starts?

Every start of the loop2 server process by a loop2 test on the machine that runs the tests gives the server, in `LOOP2_LISTEN_PORT`, a port the system names free at that start, never a fixed port. The one exception is a single test of the default address, which starts the server with neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT` set. A test giving `LOOP2_LISTEN_PORT` a value the server is to reject before it listens, and a server started inside a container a test runs, fall outside this rule.

- **Scope:** account-server, build-tools, deployment
- **Based on:** node-listen-port-zero
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a new test that starts the built server through the shared server helper of the invariant tests, which asks the system for a free port at each start and gives it to the server in `LOOP2_LISTEN_PORT`;
  - violates: a test that starts the server with `LOOP2_LISTEN_PORT=3000` or another port written into the test; a second test that starts the server without `LOOP2_LISTEN_HOST` and `LOOP2_LISTEN_PORT`.
- **Origin:** testy_bez_portu_3000_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Jak testy wybierają port serwera?" and "Czy któryś test zostaje przy porcie 3000, bo sprawdza domyślny adres serwera?"

*Rationale:* Runs of the tests side by side on one machine, or a run beside another process holding a fixed port, collide on that port, and the run that loses passes only when it is repeated; a port the system names free at each start gives every start a port of its own. A short window remains between the system naming the port free and the server listening on it, in which another process may take the port; starting once more on another free port eases it. The single test of the default address keeps the address a person starts the server on under a test, and it passes whether or not that address is free.
*Rejected:* a port read from a variable for the tests, 3000 when the variable is unset — runs side by side still collide unless someone sets the variable in one of them; a free port that a variable may override — adds a setting no need has been found for; no test of the default address — a change of the address a person starts the server on would pass unnoticed.

### D-50 — Whose is the chest?

The chest belongs to a team and has a cap on the total count of pieces, by the same rule of capacity as the backpack. Each character belongs to exactly one team and uses its chest, and a character has no chest of its own.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: character-team · trip-transfer. For the chest, an agent compares a change with the
  decision:
  - complies: a lone character shown with the chest of its one-member team
  - violates: a character with a personal chest beside the team's; a character outside every team; a chest capped per kind of item
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D37 and §4 "Kierunek: przedmioty krążą między mapami" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "Whose is the chest?"

*Rationale:* a team of one behaves exactly as a lone character with a chest of its own; the shared
chest is the one mechanism of cooperation — one character brings stone out of one map, another
takes it to the next.
*Rejected:* the player's chest — assigning a character to a team would change nothing; the
character's chest — no cooperation at all; a character outside a team with a personal chest — a
second kind of chest and an exception everywhere it is read.

### D-51 — What team does a new game start with?

A new game starts with an empty team, and the player creates the first character in the
headquarters before sending any character to a game map.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a new game whose state holds a team with no character, the headquarters showing the
    team as empty beside the creation of a character
  - violates: a new game whose team holds a ready-made elemental mage
- **Origin:** siedziba_i_druzyna_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "1. Czy nowa gra zaczyna się z jedną gotową postacią maga żywiołów w drużynie, czy z pustą drużyną, w której gracz zakłada pierwszą postać w siedzibie?"

*Rationale:* every character of the team is then one the player created and named, the first one
included, so creating a character is the first thing the player does in a new game.
*Rejected:* a new game with one ready-made elemental mage in the team — a character the player
neither created nor named.

### D-52 — How is a character named?

A character has a name, which the player types when creating it; a name that is empty,
also once the white space at its start and end is trimmed, creates no character, and two
characters may bear the same name.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: „ Ala ” typed creating a character named „Ala”; two characters named „Ala” on the
    team's list; a name of spaces alone creating no character, with the message under the name
    field in `warning`
  - violates: a character created with an empty name; a second „Ala” refused; a map run or a saved
    game that names its character by its name
- **Origin:** siedziba_i_druzyna_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "2. Czy postać ma imię, a jeśli tak — kto je nadaje i jakie imię jest dopuszczalne?" and "10. Czy imię złożone z samych spacji jest puste, tak że nie zakłada postaci?"

*Rationale:* the name is what the player tells characters apart by on the team's list, and a name
that looks empty does not do that. Nothing asks for a limit on its length or for names that
differ, so two characters bearing one name stay two characters, which the game tells apart by
something other than the name.
*Rejected:* a name of white space alone taken as a name — it tells no character apart on the list;
a name keeping white space at its start or end — it looks on the list as the same name without it.

### D-53 — Where does the player send a character from, and where does „Zakończ” lead?

The player sends a character to a game map from the headquarters, and „Zakończ” returns
to the headquarters.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: the button „Wyślij” beside each character of the headquarters; „Zakończ” of a map
    run bringing back the headquarters in the place the map run stood
  - violates: a panel for sending characters standing apart from the headquarters; „Zakończ”
    leading to a screen other than the headquarters
- **Origin:** siedziba_i_druzyna_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "4. Co stoi w siedzibie w tym zadaniu i jak gracz przechodzi z siedziby do przejścia mapy i z powrotem?" · koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), §5 "Postacie i drużyny"

*Rationale:* the headquarters stands above the screen of a map run as the screen the game opens
on when the saved game state holds no manual map run, so a character goes out to a game map from it
and the player comes back to it. The
headquarters and the map run share one place beside the program panel, and the other sections of
the headquarters join it later.
*Rejected:* a screen for sending characters of its own beside the headquarters — the player would
send from one screen and see the team on another.

### D-54 — In what order do the characters of the team stand?

The characters of the team stand on its list in the order they were created.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: the character created third standing third on the team's list, in the game state and
    in the headquarters
  - violates: the list sorted by name; a character created last put at the head of the list
- **Origin:** siedziba_i_druzyna_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "4. Co stoi w siedzibie w tym zadaniu i jak gracz przechodzi z siedziby do przejścia mapy i z powrotem?"

*Rationale:* the order of creation is one the player sets by creating characters, which no other
event of the game changes, so a character keeps its place on the list and the player finds it
there again.
*Rejected:* the list sorted by name — two characters may bear one name, and a new character would
move the others.

### D-55 — How many manual map runs go on at a time?

The game holds one manual map run at a time: while one character is in a manual map run, the game
sends no other on a manual map run.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: `send` refusing a second character while a manual map run goes on; „Wyślij” beside the
    other characters inactive wherever the headquarters shows during a manual map run
  - violates: a second character sent on a manual map run while the first one's goes on
- **Origin:** siedziba_i_druzyna_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "5. Czy kilka postaci drużyny może naraz być w ręcznym przejściu mapy?" and "12. Czy po zadaniu 18 ręczne przejście dalej ma trwać jedno naraz?"

*Rationale:* the game state keeps one manual map run as the team grows, and the player follows one
map run at a time beside the program panel. Earning loops, which go on side by side, stand beside
the one manual map run rather than in its place.
*Rejected:* manual map runs of several characters at once — the game state would hold a manual map
run for each character, and the screen one for each.

### D-56 — How does the game state tell one character from another?

Each character carries a number the game gives it when the character is created, one
more than the number the game state gave last, so the numbers of two characters of one game
differ. A map run names the team's character it carries by that number.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** derives from D-52
- **Verification:** an agent compares a change with the decision:
  - complies: the third character created carrying the number 3, whatever its name; a map run of
    that character holding the number 3; a saved game that keeps the number the game state gives
    next
  - violates: a character found by its name or by its place on the team's list; a map run holding
    a copy of the character's name or archetype in place of its number; a number given anew to a
    character created after another left the team
- **Origin:** none

*Rationale:* two characters may bear one name, and a character's place on the list moves when a
character before it leaves, so neither tells a character apart for long; a number given once, at
creation, keeps pointing at the same character in a saved game and when time away is computed
character by character. Counting up keeps the number out of the simulation's randomness, which
serves map runs.
*Rejected:* the name — two characters may share it; the place on the team's list — it moves when a
character before it leaves; a number drawn at random — every random draw of the simulation comes
from the generators of a map run.

### D-57 — In what unit does a character's warmth stand?

A character's warmth is its body temperature in degrees Celsius, counted with tenths.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: the body row reading „Temperatura 36,8 °C”; a program rule whose condition „Temperatura poniżej N °C” takes 35.5;
  - violates: warmth shown as points or as a percentage; a condition on warmth that refuses 35.5 as no whole number.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q8. Jak działają ciepło, sytość i zdrowie — w jakiej jednostce gracz widzi ciepło i z jakimi liczbami?"

*Rationale:* A body temperature reads as what it means for the character — a mage below the threshold of chill is cold — and the cold of a game map stands in the same unit, so a colder game map is a lower number of the same kind. Tenths let the player set a threshold between two whole degrees, while the body changes by hundredths of a degree in a game minute. The unit and its numbers are those of loop, the game loop2 starts from.
*Rejected:* warmth on a scale of its own, as points or a percentage — the ambient temperature of a game map would have to be converted into it; whole degrees — a condition on warmth could not tell apart states the body passes through within one degree.

### D-58 — What cools a character's body?

A character's body cools in each game minute outside combat by more, the further the game map's ambient temperature lies below the body's starting temperature, and the ambient temperature stands in the game map's data.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-24
- **Verification:** an agent compares a change with the decision:
  - complies: Las given its ambient temperature in its row of the game maps' data; a game map with a lower ambient temperature cooling the body faster than Las;
  - violates: one ambient temperature in the data of the game's balance, shared by every game map; a body cooling by the same amount on two game maps of different ambient temperatures.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q8. Jak działają ciepło, sytość i zdrowie — w jakiej jednostce gracz widzi ciepło i z jakimi liczbami?"

*Rationale:* The cold of a game map is among what makes it hard, so a colder game map is made by a change of its own data, as D-18 sets for the game's content, and one rule of cooling makes a mild game map gentle and a cold one harsh. The list of what a game map's data holds in D-24 does not name the ambient temperature, and does not rule it out.
*Rejected:* one ambient temperature in the game's balance for every game map — a colder game map would take a change beyond its own data.

### D-59 — How far do warming and eating raise a character's warmth and satiety?

Warming raises a character's body temperature up to its starting body temperature, and eating raises its satiety up to its starting satiety.

- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a mage at 36.9 °C beside a burning campfire reaching 37.0 °C and staying there; a berry eaten at satiety 90 bringing it to 100;
  - violates: a mage warmed to 37.4 °C beside a campfire; satiety above 100 after a meal.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q8. Jak działają ciepło, sytość i zdrowie — w jakiej jednostce gracz widzi ciepło i z jakimi liczbami?" and "Q9. Jak działają plecak, zbieranie, ognisko i jedzenie — reguły i liczby?"

*Rationale:* Warmth and satiety are needs that fall with time, and their starting values are the state of a character in want of nothing. A surplus stored above them would let a program stay away from a campfire and from berries for longer than the game map's numbers say, which decides how hard Las is to pass.
*Rejected:* warming and eating above the starting value, kept as a reserve — a program could hold out far longer away from a campfire and berries, and Las would be easier than its numbers say.

### D-60 — When does a character lose and regain health?

Outside combat, a character loses health in each game minute in which it is chilled — its body temperature below the threshold of chill — and loses it again, apart, in each game minute in which it is starving — its satiety below the threshold of hunger; in a game minute in which it is neither, its health comes back by itself, up to full health. During the game minutes of combat the character's needs and health stand still until the combat actions change its health.

- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a mage both chilled and starving losing in a game minute the loss of chill and the loss of hunger together; health rising in a game minute in which the mage is warm and fed, and stopping at full health;
  - violates: a mage both chilled and starving losing no more than a mage that is chilled; health coming back in a game minute in which the mage is starving.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q8. Jak działają ciepło, sytość i zdrowie — w jakiej jednostce gracz widzi ciepło i z jakimi liczbami?"

*Rationale:* Cold and hunger are two wants, so a program that neglects both pays for both, and health that comes back by itself in a game minute free of both lets a program recover by tending to the character's needs. A streak of game minutes free of a loss to cold or hunger, and the wounds of combat, build on this rule.
*Rejected:* cold and hunger counted once together — neglecting both would cost no more than neglecting one; health that does not come back by itself — every loss would stay until the map run ends.

### D-61 — When does a character die, and of what?

A character dies in the game minute in which its health reaches zero, also during the character's action in progress, and the map run then ends in death with its cause. For a death of cold or hunger, the cause is cold where the character's body is chilled in that game minute, and hunger otherwise. A character whose health reaches zero through combat dies with the cause „walka” in the game minute of the combat turns.

- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: the map run ending in the game minute health reaches zero while a gathering started five game minutes before is still under way; a mage both chilled and starving in the game minute of death dying of cold;
  - violates: death waiting for the character's action in progress to end; a starving mage that is not chilled dying of cold.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q10. Co się dzieje, gdy mag zginie: w której minucie kończy się przejście, co gracz widzi i co może zrobić dalej?"

*Rationale:* Health at zero ends the map run in the game minute it happens, whatever the character is doing, so the state the player reads after death is the state of that minute. Death ends the map run and any action in progress, as the player ending a map run does; an attack can also cut an action short while the map run goes on. A death names one cause, so the player reads one reason for it, and combat has its own cause rather than borrowing cold or hunger from the body's state.
*Rejected:* death waiting for the end of the character's action in progress — the character would go on acting with no health left, and the state shown would not be that of the moment of death.

### D-62 — What does the screen show, and what can the player do, after a character's death?

After a character's death the screen stays on the state of the game minute of death and time stands still, and the player has „Restart”, which starts the map run again with the same seed from game minute zero, and „Zakończ”, which returns to the screen from which the player sends the character. After a character's death the pace buttons are gone together with „Pauza”.

- **Scope:** browser-view, simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: after a death of cold in game minute 312 the status row reads „Minuta 312 · Mag zamarzł”, „Pauza” and the pace buttons are gone, the game minute stays at 312, and „Restart” starts game minute zero on the same seed;
  - violates: the game going back to sending the character the moment the mage dies; „Restart” after a death drawing a new seed; the pace buttons standing after a death, active or inactive.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q10. Co się dzieje, gdy mag zginie: w której minucie kończy się przejście, co gracz widzi i co może zrobić dalej?" · rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "12. Czy po śmierci postaci przyciski tempa znikają tak jak po domknięciu?"

*Rationale:* The player sees what the character had and where it stood at the moment of death, and can repeat the same seed to understand the program's mistake. „Zakończ” leads to the screen from which the player sends the character, whatever that screen becomes. The pace buttons go with „Pauza”, as both rule a time that stands still after death, and the two ends of a map run, death and a completion, show the same controls. Accepted with it: on the screen after death the player does not see the pace at which „Restart” starts, and a player who wants the map run again at a slower pace changes it once the restarted map run goes on.
*Rejected:* going back to sending the character at once after death — the player loses the state that explains the death; the pace buttons kept active after death while gone after a completion, and the pace buttons shown inactive or active on both screens of an end — the screens of the two ends would differ, or show controls of a time that stands still.

### D-63 — How does a character light a campfire or a stick?

A mage lights a campfire and a stick with the spell Płomyk: the actions „Zapal — ognisko” and
„Zapal — patyk”, ordinary actions of the character carried out outside combat, whose price is the
sticks they use and nature energy. The sticks and the nature energy leave together when the lighting
finishes, and a lighting an attack interrupts takes neither.
With the bought branch „Czysty płomień”, „Zapal — ognisko” requires and consumes no sticks and costs the nature energy of ordinary lighting.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-175
- **Verification:** invariants: nature-energy-range. An agent compares a change with the decision:
  - complies: „Zapal — ognisko” taking two sticks from the backpack and the nature energy of its
    price in the game minute it finishes; a lighting interrupted by an attack in its third game
    minute leaving the sticks and the nature energy as they were;
  - violates: „Zapal” using no nature energy, or using no sticks without „Czysty płomień”; the nature energy taken when the
    lighting starts; „Zapal — patyk” carried out as a combat action.
- **Origin:** plomyk_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q1. Czym mag płaci za Płomyk — patykami jak dziś i do tego energią natury, czy samą energią — i w której chwili energia schodzi?" and "Q7. Czy akcje czaru zostają „Zapal — ognisko” i „Zapal — patyk”, ze statusem „Zapala ognisko” / „Zapala patyk”, czy zmieniają nazwę na Płomyk?" · ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q6. Czym i za co mag zapala ognisko w tym zadaniu, skoro zapalanie ognia jest w koncepcji czarem maga Płomyk, płaconym energią natury, którą wnosi dopiero zadanie 9?" · wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q9 and accepted settlement 5

*Rationale:* Płomyk keeps the sticks lighting has used and adds nature energy, so a spell that lights
a campfire with no sticks, by the mage's energy alone, keeps a sense of its own as a branch of
the spell. As an ordinary action of the character it keeps its place in the program, its names and
its statuses. The energy leaves with the sticks once the spell has taken place, so a lighting cut
short costs nothing. Accepted with it: nature energy running out makes Las harder.
*Rejected:* nature energy alone, with no sticks — the branch „Czysty płomień”, a campfire lit with
no sticks by the mage's energy alone, would lose its sense; the energy taken when the lighting
starts — in loop the energy is taken in the moment the spell has taken place, not at its start;
the actions renamed „Płomyk — ognisko” and „Płomyk — patyk”, with the status „Rzuca Płomyk” — the
game's concept and loop name the spell's verb „Zapal”.

### D-64 — What does the backpack's cap count, and what sets its height?

The backpack's cap counts the pieces of all items together, and its height is the character's carrying capacity. Carrying capacity is currently 15 pieces, and the character skill trees currently have no branch that raises it.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a backpack holding 5 sticks and 10 berries full at a carrying capacity of 15; „Plecak 7/15” taking its 15 from the character's carrying capacity;
  - violates: a cap for each kind of item; the backpack's cap taken from a game map's data or from a number of the map run in place of the character's carrying capacity.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q15. Czy udźwig plecaka — pułap 15 sztuk — jest cechą postaci, czy liczbą przejścia albo mapy?" · definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § In scope, point 12 · wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q10 and accepted settlement 6

*Rationale:* The MVP definition caps the backpack at a count of pieces taken together. Carrying capacity belongs to the character, apart from a stricter cap a game map may add, and it acts beyond one action of the character — on gathering and on packing for a trip — so it describes the character. The team's chest takes the same rule of counting.
*Rejected:* „Mocne plecy” raising carrying capacity — would change the MVP capacity accepted in the definition; a cap counted for each kind of item, or by weight — a rule of capacity other than the one the team's chest takes; the cap as a number of the game map or of the map run — the character's capacity would change with the place it goes to.

### D-65 — What does a full backpack do to gathering?

A character carries out a gathering while its backpack holds fewer pieces than its cap; with the backpack full, the program passes over a program rule that gathers and picks a later one, as for any action of the character not feasible then.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-23
- **Verification:** an agent compares a change with the decision:
  - complies: a program rule „Zbierz — patyk” passed over with 15 pieces of 15 in the backpack, and the next program rule carried out;
  - violates: a gathering carried out with a full backpack, its piece thrown away.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q9. Jak działają plecak, zbieranie, ognisko i jedzenie — reguły i liczby?"

*Rationale:* A gathering that could bring nothing is no action of the character to carry out, so the program moves on to a program rule that does something, as a group of program rules passes on to the next.
*Rejected:* a gathering carried out with a full backpack, its piece lost — the character would spend the gathering's time for nothing and the program would hold on to the program rule.

### D-66 — What does a missed gathering do?

A gathering may miss, and a missed gathering leaves the tile's stock as it was and puts no piece into the backpack.

- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a missed gathering on a tile with 3 sticks leaving 3 sticks there and the backpack as it was;
  - violates: a missed gathering taking a stick from the tile.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q9. Jak działają plecak, zbieranie, ognisko i jedzenie — reguły i liczby?" · definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § In scope, point 12

*Rationale:* A miss costs the character the time of the gathering, and the stock stays for the next try, so luck changes how long gathering takes rather than how much a tile gives.
*Rejected:* a miss that uses up a piece of the tile's stock — luck would drain tiles, and a gathering that brought nothing would still have changed the world.

### D-67 — How does a tile's stock renew?

A tile holding fewer pieces of a resource than its starting stock gains one piece of it in each game minute of the map run that is a whole multiple of the resource's time to renew one piece, given in the game map's data and counted from the map run's game minute zero, up to its starting stock.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-24
- **Verification:** an agent compares a change with the decision:
  - complies: a tile of Las whose sticks fall below its starting stock in game minute 45 gaining a stick in game minute 60 and another in game minute 90, sticks renewing one piece in 30 game minutes; a tile at its starting stock gaining nothing;
  - violates: a tile growing above its starting stock; a tile refilled to its starting stock at once; a tile whose sticks fall below its starting stock in game minute 45 waiting for its own 30 game minutes and gaining its first stick in game minute 75.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q9. Jak działają plecak, zbieranie, ognisko i jedzenie — reguły i liczby?"

*Rationale:* A gathered tile recovers at the pace its game map sets, so gathering is a choice of where and when, and the bound keeps a tile from growing past what the layout gave it, also over the hours of a player's absence that the game counts later. Counted from the start of the map run, renewal needs no record of its own for each tile, and the pieces a span of game minutes brings follow from the span by arithmetic, as counting the hours of a player's absence needs. Accepted with it: a tile that falls below its starting stock shortly before a multiple of the time to renew gains its piece back sooner than that time.
*Rejected:* renewal with no upper bound — a tile left alone would grow on and on, also over the hours of a player's absence; a clock for each tile and resource, started by its first missing piece — closer to the time passed since the loss, but a record for each tile and resource in the map run's state.

### D-68 — What becomes of a campfire that burns out?

A campfire that burns out stays on its tile, extinguished, and can be lit again.

- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: „Zapal — ognisko” carried out at an extinguished campfire; „Idź — ognisko” leading to an extinguished campfire as to a known one;
  - violates: a campfire that disappears once its minutes of burning run out.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q9. Jak działają plecak, zbieranie, ognisko i jedzenie — reguły i liczby?"

*Rationale:* A campfire built from sticks stays a place the character can return to and light again for less than building anew, and a program can lead the character back to it.
*Rejected:* a campfire that disappears when it burns out — every fire would have to be built again.

### D-69 — How much does feeding add to a burning campfire?

Each feeding of a campfire burning at the feeding's start adds, at the feeding's end, its minutes of burning to those the campfire has left then, however many those are, zero included, so a campfire that burnt out during the feeding burns again.

- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a campfire with 150 minutes left at a feeding's end burning 170 after a feeding that adds 20; a campfire with 3 minutes left at the start of a feeding of 5 game minutes burning 20 minutes after it;
  - violates: a feeding that stops at a ceiling of minutes of burning; a feeding that adds nothing to a campfire that burnt out during it.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q9. Jak działają plecak, zbieranie, ognisko i jedzenie — reguły i liczby?"

*Rationale:* Feeding is paid with fuel piece by piece, so a program that gathers enough can keep its fire burning for hours ahead. A feeding takes effect at its end, as every action of the character does, and lands on the campfire it was started at, so a program rule that feeds a campfire with fewer minutes left than a feeding lasts feeds it. Accepted with it: a campfire that burns out during a feeding burns again for one piece of fuel, fewer sticks than „Zapal — ognisko” uses.
*Rejected:* a ceiling on the minutes of burning — a program could not feed its fire far ahead; a feeding that adds nothing where its campfire burnt out before the feeding's end — a program rule feeding a campfire with few minutes left would not feed it; the fuel taken and added at the feeding's start — the one action of the character whose effect would take hold at its start.

### D-70 — How does the browser view show a campfire?

A campfire shows on the terrain panel's drawing of the game map as an icon on its tile, and its state — burning, with the minutes it has left, or extinguished — stands in the tile's row of the list of revealed tiles.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-19
- **Verification:** an agent compares a change with the decision:
  - complies: a tile's row reading „ognisko — płonie, zostało 42 min”, and the campfire's icon on that tile of the drawing;
  - violates: the minutes left written on the drawing beside the campfire's icon.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q11. Jak ekran pokazuje ciepło, sytość, zdrowie, plecak i ognisko?"

*Rationale:* The minutes of burning are a number, and the numbers of a tile stand in its row of the list, which hovering ties to the tile; the icon shows where a campfire stands. Accepted with it: the drawing alone does not tell a burning campfire from an extinguished one.
*Rejected:* the campfire's state and minutes shown on the drawing — a number would stand on the drawing, which creatures added to it later crowd further.

### D-71 — In what order does a game minute of a map run take effect?

Outside combat a game minute takes effect in this order: the character's body cools by the map's ambient temperature and warms by what burns on its tile, satiety falls, the nature energy of a well-fed mage comes back, up to its cap, health changes for cold and hunger or recovers, and the streak follows D-136; health at zero ends the map run in death at that point, otherwise burning loses a minute, tiles renew, the ending action takes effect, completion is checked, and a continuing run tries an eligible attack before the ordinary program pick, with an attack replacing that pick and interrupting any action still running. In each game minute of combat the body and the nature energy stand still, the streak grows, burning loses a minute and tiles renew, then in the last combat minute all combat turns resolve, their result and cooldown are recorded, a creature defeated in those turns adds a beaten attack and death ends the run before completion is checked; completion is checked in the earlier combat minutes too and ends the encounter with its attack description and no turns or outcome, while a continuing run after the final combat minute picks its next ordinary action in that same minute. Discoveries enter the Understanding where their cause occurs — body, ending action or attack — and the following effects and picks read that updated Understanding and program, a rule written by a discovery included, with discoveries collected once for the whole minute and the pause taken after that minute has finished.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-04 · derives from D-23 · derives from D-118 · derives from D-136 · narrows D-140 · narrows D-141 · derives from D-142 · derives from D-146 · derives from D-175
- **Verification:** invariants: minute-span-split · nature-energy-range. An agent compares a change with the decision:
  - complies: a campfire lit in game minute 100 warms from game minute 101; a berry eaten in the game minute health reaches zero does not save the character; a mage first chilled in game minute 84 discovering „Eksploruj” and starting „Zawsze → Eksploruj” at the pick of game minute 84, before the map run stops; a map run of Las whose streak reaches 480 in a game minute in which a gathering ends ending in a completion once the gathered piece has entered the backpack, with no program rule picked in that minute; a well-fed mage at full nature energy finishing a lighting in a game minute having after it the nature energy of the cap less the lighting's price, the energy that minute gives back lost at the cap;
  - violates: health counted from the temperature before the game minute's cooling; the effect of an action of the character ending in the game minute of death taking hold; a program rule written at a discovery acting from the next game minute; a map run stopping at a discovery before the rest of its game minute has taken effect; a map run ending in a completion right after the character's body, before what burns, the tiles and the action ending in that minute have taken effect; nature energy coming back after the effect of the action ending in its game minute, or in a game minute of combat; a completion checked before combat turns in their final minute; an attack tried again after those turns.
- **Origin:** ognisko_i_jedzenie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions carried to cycle, first question, "Kolejność skutków w jednej minucie gry" · odkrywanie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "11. W której chwili minuty gry zapada odkrycie i od której minuty działa reguła wpisana przy odkryciu?" · rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "8. W której chwili minuty gry przejście się domyka i co z akcją postaci kończącą się w tej minucie?" · plomyk_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q3. Czy energia natury wraca w minutach walki?" and "Q10. W którym miejscu kolejności minuty gry (D-71) energia natury wraca — razem z ciałem, zaraz po spadku sytości, czy dopiero po skutku akcji kończącej się w tej minucie?"

*Rationale:* Outside combat the world passes the game minute first and the action of the character ending in it lands at its end, after which the program picks; so an ordinary action's effect acts from the next game minute — a campfire's minutes of burning are as many warm minutes — and death goes before whatever was about to land. With every effect inside one game minute, in one order, a span split into any calls of the simulation gives the same state at every game minute, death included. A discovery lands where what brings it lands, so the pick at the end of its game minute sees it, and the program rule written at the first chill acts in that same minute; a stop between whole game minutes leaves every game minute whole. The streak follows the body, which decides whether the game minute lost health to cold or hunger, and a completion takes the place of the pick, so the state after a completion is that of the whole game minute, the effect of an action ending in it included. Nature energy comes back with the body, as health does, before the action ending in the game minute lands, so a spell paid in that minute pays from the energy the minute has already given back. Accepted with it: a mage at full nature energy loses the energy one game minute gives back for each lighting it finishes; a feeding started while its campfire burned lands on that campfire at its end even where the campfire burnt out meanwhile, and lights it again for one piece of fuel; combat adds an ordering of turns inside the final game minute, and an earlier completion can leave an encounter unresolved.
*Rejected:* the action of the character first, then the body and death — an effect would count for a game minute the character spent on the action, and dying in a game minute could be undone by what lands in it; death last, after the action of the character and the next pick — the character would start a program rule in the game minute it dies; a feeding that adds nothing where its campfire burnt out before its end — a program rule feeding a campfire with few minutes left would not feed it; a completion right after the character's body, as death comes — the effect of an action ending in that game minute would be lost; completion before the final combat turns — the encounter's result would be skipped; waiting another game minute for the ordinary pick after combat — an extra idle minute beyond the combat's fixed cost; nature energy coming back after the effect of the action ending in the game minute, satiety read after its fall — a mage at full nature energy finishing a lighting would keep the energy that minute gives back.

### D-72 — Where does a character craft a campfire and light a stick?

A character crafts a campfire and lights a stick on a revealed tile, as it gathers; on a tile not yet revealed, the program passes over a program rule that crafts a campfire or lights a stick.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-25
- **Verification:** an agent compares a change with the decision:
  - complies: „Wytwórz — ognisko” passed over after „Wędruj” onto a tile not yet revealed, and carried out once „Eksploruj” has revealed it;
  - violates: a campfire or a burning stick standing on a tile not yet revealed.
- **Origin:** none

*Rationale:* Every campfire and every burning stick then stands on a revealed tile, so the drawing shows the campfire's icon and the list of revealed tiles shows its state and the burning stick's, as for the stock a gathering takes from; the list of revealed tiles and the drawing keep the meanings they have. Accepted with it: a program that crafts a campfire or lights a stick after wandering onto a tile not yet revealed passes on to its next program rule.
*Rejected:* a campfire shown on a tile not yet revealed — the list of revealed tiles and the role `tile-hidden` would change their meaning; a campfire left on a tile not yet revealed with nothing showing it — its state and its icon would stand nowhere.

### D-73 — Which testing discipline does loop2 adopt?

Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79 and D-163. Its testing rules and the recipes of its levels stand in `guidelines/testing.md`, read before writing or changing a test.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** none
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q4

*Rationale:* A common discipline makes the choice of a useful test and an independent expected value reviewable without prescribing proportions of test levels.
*Rejected:* Guidelines treated only as suggestions — leave each author to choose which obligations hold.

### D-74 — When are tests on generated inputs considered?

Tests on generated inputs are considered only when the task author names a game rule and a concrete risk from combinations of inputs that a few readable examples do not adequately protect. That task chooses the tool and settles its maintenance cost.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** narrows D-73
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q4b and Q4g

*Rationale:* The complexity of the game and the risk being protected justify generated inputs; the ability to generate them alone does not.
*Rejected:* Adding property tests whenever a universal statement can be made — adds dependencies and maintenance without an established need; returning when needed without a stated condition — leaves the choice unconstrained.

### D-75 — When are complete player journeys tested in a real browser?

Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually. Automation is reconsidered when a critical-journey defect escapes smaller tests or repeated manual checking becomes a significant task cost; that task settles the tool and scope.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** narrows D-73
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q10c

*Rationale:* Manual checks keep the initial testing discipline proportionate to the game, at the cost of evidence of one run rather than permanent protection against recurrence.
*Rejected:* Automating every critical journey at once — adds a browser environment and test maintenance before their cost is justified.

### D-76 — When do fonts and the preview server gain refusal tests?

Permanent refusal tests for font files and the local interface preview server are deferred until the first task changing the respective boundary, which introduces its refusal test and changes its invariant to method test. Until then, review checks font provenance and that the preview server serves only its own directory and only on the developer's machine.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** narrows D-73
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q6c and Q6g

*Rationale:* Keeping the guideline work bounded leaves these boundaries dependent on review, which can miss a defect; absence of a test proves neither refusal nor a vulnerability.
*Rejected:* Adding both refusal tests with the guidelines — expands the work and requires a choice of font verification.

### D-77 — How are tests selected and limited as a whole?

`npm test` without arguments runs the full gate; `npm test -- <test file>` accepts exactly one test file and runs only it, building the game first for Node but not for Python, without other tests or the foundation check. A focused run with no executed test or a file that is not a test fails, and only the full gate suffices before a request. There is no configuration file limiting the whole run; a whole-run limit is reconsidered on a concrete problem with diagnosis time or a hanging run, while new or changed tests still bound their own waiting.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** narrows D-73
- **Verification:** invariants: focused-test-execution. An agent compares a change with the decision:
  - complies: one selected Node file after a build; one Python file without a build; the full gate before a request
  - violates: a focused run starting another test or the foundation check; accepting several files; treating a focused pass as the full gate
- **Origin:** none

*Rationale:* One entry point preserves the complete check while a file selection shortens diagnosis and avoids building unused JavaScript for Python tests. Keeping no whole-run limit accepts that an operation without a local limit may hang.
*Rejected:* Only full runs — diagnosis repeats unrelated tests; building for a Python selection — adds work its runner does not need; adding a central limit without a concrete timing problem — adds orchestration without a demonstrated need.

### D-78 — How is one test case shaped?

A new or changed test case has a name describing its behaviour and condition, and readable preparation, action and assertion phases protecting one behaviour; it may use a table of explicitly named variants of that behaviour. It neither reproduces the product algorithm nor chooses its expectation from the obtained result.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** narrows D-73
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q5k

*Rationale:* Named variants keep one behaviour readable without duplicating its preparation; combining unrelated behaviours obscures the cause of a failure.
*Rejected:* No logic at all in a test — excludes readable tables of crafted inputs; one large scenario for unrelated behaviours — obscures which behaviour failed.

### D-79 — How is the npm registry response contract checked?

The npm registry has no separate contract test: the real dependency audit in the gate checks its response format under D-33. Tests of the audit use controlled responses to force errors, and an unreadable real response fails the audit.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** narrows D-73 · derives from D-33
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q4n

*Rationale:* The real operation checks the format without a second check of the same agreement; a controlled response proves only the reaction to that response.
*Rejected:* A separate registry contract test — adds maintenance without further protection.

### D-80 — What establishes a game-balance expectation?

A test of a game parameter, such as survival time, progress rate or map difficulty, may check calculations on concrete numbers, but takes its expectation from an agreed requirement. Current parameters or the simulation's current result are not themselves evidence of correctness.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-73
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q3

*Rationale:* Protecting agreed relationships and limits avoids preserving an accidental balance as a requirement; without an agreed difficulty the tests cannot judge whether a map is too easy or hard.
*Rejected:* Freezing the current simulation outcome — treats present behaviour as the intended balance.

### D-81 — At which levels do loop2 tests stand?

Loop2 tests stand at three levels: unit test and integration test as defined in its glossary, and smoke test in its ordinary meaning. A smoke test starts the built application through its entry point or a container and checks readiness or a simple response, without proving a complete game journey; a level follows the resources exercised, not the test directory.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-73
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q5e-Q5g and Q5n

*Rationale:* The levels distinguish calculations from real connections and packaging, so a missing environment names which evidence is absent.
*Rejected:* A separate unit test for every function — ties tests to code decomposition; treating imports as an application startup — leaves packaging and entry points untested.

### D-82 — Which product documents supply test expectations?

Test expectations may come from the loop2 foundation, accepted task documents in `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/` and its `_zadania/` directory in state ready for cycle or completed, and the approved `definicja_mvp_loop2.md` there. The draft `koncepcja_projektowa.md` is a source only in a passage quoted by an accepted document; a test comment locating a documentary expectation names its file and line.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-73
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q5p

*Rationale:* Accepted requirements carry expectations without making every expected number a foundation decision; an agent without access to the external documents sees their location but cannot verify their text.
*Rejected:* Foundation alone — forces every expected number into a decision; a draft concept as an unrestricted source — treats unsettled ideas as requirements.

### D-83 — Where are tests written and how do they enter the gate?

Tests keep Node and Python, their existing directories, and the names `*.test.mjs` and `test_*.py`. Every `*.test.mjs` file under `tests/` is selected by `npm test`, and a new `test_*.py` file is counted as covered by the gate only after its execution there is verified.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-73
- **Verification:** invariants: node-test-selection
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q5a and Q5r

*Rationale:* Keeping the conventions avoids moving tests without changing their protection, while explicit inclusion checks prevent a new file being silently omitted.
*Rejected:* Migrating the tools and directories for uniformity — requires movement and coverage checks without a change to game behaviour; inclusion by review alone — depends on a reviewer noticing an omitted file.

### D-84 — Which real mechanisms do new or changed tests exercise?

A new or changed simulation test supplies explicit state, elapsed time and seed and uses the real game random generator without waiting for game minutes on the computer. A test of file or HTTP failure uses real temporary files or a real local server, waits for a readiness event or condition with a time limit and error handling, and cleans up its files, servers and processes even after failure; polling a condition is allowed, and controlled responses test reactions to forced failures without proving the replaced operation. The HTTP helper in `tests/http.test.mjs` takes these waiting and cleanup rules when that helper changes.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-73 · derives from D-04 · derives from D-22
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q5b-Q5d and Q7

*Rationale:* Real mechanisms reveal failures that their substitutes hide, while explicit time and readiness keep a run independent of computer speed; preparation and cleanup cost more than fixed sleeps.
*Rejected:* A substitute for the mechanism whose failure is being tested — cannot demonstrate that failure; sleeping a fixed span as proof of readiness — depends on machine speed.

### D-85 — Which cases are the exemplars of the test levels?

The unit exemplar is the case "the count of a hand-made backpack is the pieces of all items together" in `tests/sim/traits.test.mjs`, for explicit data and independent arithmetic, not time or a whole game. The integration exemplar is "raw and encoded traversal cannot expose files outside dist/public" in `tests/http.test.mjs`, for real requests and visible refusal, not the whole file or its timeout and cleanup helpers. The smoke exemplar is `test_occupied_address_exits_without_reporting_ready` in `tests/invariants/test_account_server_occupied_address.py`, for normal-start controls around forced refusal, not full HTTP, container or gameplay evidence.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-81
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q5h-Q5j

*Rationale:* Selected cases show useful patterns without treating every neighbouring case or helper as approved practice; their limits remain part of the selection.
*Rejected:* New examples covering every rule at once — add test work; rules without examples — leave later authors no concrete model.

### D-86 — Which files may a visitor obtain from the public server?

Every visitor may retrieve the built game's files from its public directory and no file outside it. A request outside that directory, with a raw or encoded path, receives 400, 403 or 404 with neither that file's content nor the game's page.

- **Scope:** account-server
- **Based on:** none
- **Relations:** derives from D-05
- **Verification:** invariants: public-file-access
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q6b and Q6f

*Rationale:* A public game requires no account to fetch its assets, while the public directory bounds what the server exposes.
*Rejected:* Keeping the permission only implicit in a test — leaves later authors without the rule that justifies refusal.

### D-87 — When are whole-screen pixel comparisons used?

Whole screens are not preserved by pixel-by-pixel image comparison, while agreed appearance rules keep their checks and a changed appearance is inspected in a browser. Image comparison is reconsidered on a concrete visual defect or an agreed requirement for an exact layout; this exclusion does not cover the safety of external icons or fonts.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-73
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q10b

*Rationale:* Avoiding whole-screen references saves maintenance and judgement of intended differences, while leaving some visual differences for a person to catch.
*Rejected:* Whole-screen comparisons without a demonstrated need — require reference images and repeated judgement of deliberate changes.

### D-88 — How are real browser events, focus and SVG checked?

Real browser events, focus and SVG rendering are checked manually after a change and are not automated; tests using a hand-made document model prove only its modelled logic. Automation is reconsidered on a defect that the model missed or together with the player-journey automation of D-75, and this exclusion never covers a trust boundary.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-73
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q10d

*Rationale:* A document model provides quick logic checks but cannot establish the browser's behaviour; until automation is justified a person catches event and focus defects.
*Rejected:* Treating a document model as real-browser evidence — claims protection the model cannot give.

### D-89 — Who revisits a deliberate testing exclusion?

For a change touching a category deliberately left without tests, its author and reviewer check the category's condition of return, including complete player journeys, whole-screen comparisons and real browser events, focus and SVG.

- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-73 · derives from D-75 · derives from D-87 · derives from D-88
- **Verification:** none
- **Origin:** przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, Q10a-Q10d

*Rationale:* An exclusion can outlive its reason unless the changes that reach it revisit that reason.
*Rejected:* Keeping exclusions without a check on relevant changes — lets a temporary trade-off become a permanent blind spot.

### D-90 — Where do the program rules of a program belong?

A program holds an ordered list of rule groups, and every program rule belongs to exactly one of
those groups; the game has no program rule standing outside a rule group.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** derives from D-23
- **Verification:** an agent compares a change with the decision:
  - complies: moving a program rule from one rule group to another leaves it in the destination
    group and removes it from the source group
  - violates: a program rule held outside the program's rule groups or in two groups at once
- **Origin:** none

*Rationale:* One place for each program rule gives its condition a clear enclosing condition and
its priority a place in the same order, also when the player moves it between groups.
*Rejected:* program rules beside rule groups — adds another place for a rule and another case for
the editor and for choosing the next action.

### D-91 — What program does a new game start with?

A new game starts with one empty rule group named „Program”, whose condition is „Zawsze”.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** derives from D-90
- **Verification:** an agent compares a change with the decision:
  - complies: a new game showing the empty „Program” group with its „Dodaj regułę” control and the
    condition „Zawsze”
  - violates: a new game with no rule group, or a program rule already placed in its initial group
- **Origin:** none

*Rationale:* The first group gives the player a place to put the first rule, and its condition
lets that rule act according to its own condition before the player needs to arrange groups.
*Rejected:* starting with no group — the player has to create a group before writing a first
rule; starting with a ready-made rule — the initial behaviour is not one the player wrote.

### D-92 — What counts as one firing of a program rule?

One firing of a program rule is the start of its action, so an action lasting many game minutes
counts once, and in combat each turn in which the program rule starts a combat action adds one
firing to that rule's count.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** derives from D-23
- **Verification:** an agent compares a change with the decision:
  - complies: an exploration lasting twenty game minutes adding one firing when it starts; each
    combat turn in which a rule starts a combat action adding one firing
  - violates: a count growing each game minute of the same action; a combat action adding no
    firing because its duration is zero game minutes
- **Origin:** none

*Rationale:* The count tells the player how often the program chose a rule, so the duration of
the chosen action does not change how often it was chosen. A combat turn has the same meaning
of a choice even when its action takes no game minutes.
*Rejected:* counting the minutes of an action — longer actions would look more often chosen;
counting completed actions — a rule whose action was cut short by death would look unused.

### D-93 — What does a program rule show the player?

During a map run every program rule of the copy the map run carries out shows how many times it
fired in that map run, written as a number followed by „×”, such as „3×”, while the rules of a saved
program the program panel shows then show no count. The count starts from zero at the start of each
map run, a map run restart included, at a switch of the character to another program, and when the
program rule's condition or action changes; it survives reordering the rule, moving it to another
rule group, changing its group's condition or name, and a save of the copy. Before the game's first
map run the rules show no counts; after a map run ends in death or in a completion its counts remain
beside the copy's rules, and after „Zakończ” beside the rules of the program the copy belongs to,
each rule there showing the count of the same rule of the copy where the two have the same condition
and action and „0×” otherwise, and beside the rules of no other program, until the next send or map
run restart, subject to the same reset on a change of a rule's content.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** derives from D-92 · derives from D-164
- **Verification:** invariants: saved-program-edit · trip-plan-progress. An agent compares a change with the decision:
  - complies: a program rule moved up or into another group keeping its count; a changed group
    condition leaving its rules' counts intact; a rule whose condition changed starting again
    from zero; counts retained after death, after a completion and after „Zakończ”, reset on the
    next send or restart; a switch to another program starting every count of the new copy's rules
    from zero; after „Zakończ” the rules of the copy's program showing the copy's counts, and „0×”
    beside a rule whose action there differs from the copy's
  - violates: counts kept per position in the list; a rename of a group resetting its rules'
    counts; a count shown before the first map run; „Zakończ” hiding the ended run's counts; a
    completion clearing the counts of its map run; counts shown beside a saved program opened
    during a map run; the counts of the former copy kept after a switch; after „Zakończ” a count
    of the copy shown beside a rule of the program whose condition there differs
- **Origin:** the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What does a program rule show the player?" · koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D14 · rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "17. Co pokazują liczniki reguł programu po domknięciu przejścia — zostają przy regułach jak po śmierci i po „Zakończ”, aż do następnego wysłania albo „Restart”?" · programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q9. Czy po śmierci postaci i po domknięciu gracz może jeszcze zapisać albo porzucić zmiany kopii, co z niezapisanymi zmianami robi „Zakończ” i przy których regułach zostają po nim liczniki przejścia (D-93)?" and "Q10. Czy gracz może w trakcie przejścia przełączyć postać na inny program?"

*Rationale:* The count is the sign that a program rule is dead — one standing too low is caught
by one above it and stays silent for a whole map run. A program rule whose content changed is
another program rule, so its count starts again, while its group and its place arrange when the
same rule can act. Keeping the last run's counts lets the player inspect the program after that
run ends, whichever way it ends, the run that solved a map included. Accepted with it: a count
earned under a group's former condition remains when the condition changes, and the next run gives
a fresh picture of the edited program. A switch brings another program, whose rules have fired
nothing in the map run. After „Zakończ” the counts stand beside the program the player goes back to,
and a rule whose content differs there is not the rule that fired.
*Rejected:* counts per position — moving a rule would attach another rule's history to it;
resetting on a move or group edit — arranging the same rules would erase their history; hiding
the counts after „Zakończ” — the player would lose the ended run's evidence while editing; clearing
the counts at a completion — the player could not see which rules worked in the run that solved the
map; counts kept for every program — the copy is what fires, so a store for the other programs would
hold nothing; counts beside every program's rules by the rule's identity alone — another program's
rules would show numbers they did not earn.

### D-94 — Where does loop2 use a mutation testing tool?

Loop2 adopts StrykerJS for simulation, without a type-checking plugin, and the reviewer runs it on the changed files of that part. The configuration lists every `tests/sim/*.test.mjs` file except `rules.test.mjs`. Browser-view joins by a change of this decision when a defect in calculating the drawing or lists passes through tests and review.

- **Scope:** simulation, browser-view, build-tools
- **Based on:** stryker-simulation-execution · typescript-nocheck-support
- **Relations:** derives from D-73
- **Verification:** invariants: mutation-test-selection. An agent compares a change with the decision:
  - complies: the reviewer runs StrykerJS on changed simulation files without a type-checking plugin; other parts retain the author's mental mutation check
  - violates: installing a type-checking plugin; counting an author's mental check as the tool run for changed simulation files; extending the tool to browser-view without changing the decision
- **Origin:** none

*Rationale:* Executing small changes to simulation code reveals assertions that miss altered behaviour without spending the author's reasoning on mechanically detectable cases. The TAP runner reuses the existing tests and the compiler accepts instrumented files; excluding the source-text rules test avoids testing the instrumenter's spelling. Accepted costs are development dependencies, compilation and mutation runtime, and manual assessment of survivors, including ones other test suites would kill.
*Rejected:* Mental mutation alone for simulation — spends reasoning on cases a tool can execute; a type-checking plugin — unnecessary for the accepted instrumented build; mutation testing browser-view immediately — extends cost before the stated return condition.

### D-95 — When is the mutation testing tool removed?

If the dependency audit reports an advisory in a package introduced by StrykerJS and a corrected version cannot remove it, loop2 removes the tool and returns the mutation testing rule to the author's mental check.

- **Scope:** simulation, build-tools
- **Based on:** none
- **Relations:** narrows D-94 · derives from D-33
- **Verification:** an agent compares a change with the decision:
  - complies: a corrected dependency version satisfies the unchanged audit, or the tool is removed and the author's mental check restored
  - violates: weakening the audit or keeping an uncorrectable advisory to retain mutation testing
- **Origin:** none

*Rationale:* The tool saves review effort but does not justify accepting a dependency advisory; the mental check preserves the review obligation when a corrected dependency is unavailable.
*Rejected:* Relaxing the audit — trades the existing dependency boundary for a development convenience; retaining the tool indefinitely while waiting for a fix — leaves that boundary violated.

### D-96 — What does a player see before and after signing in?

A signed-out visitor sees the „Zaloguj się” form with email and password and the „Załóż konto” form with email, password and repeated password, with neither headquarters nor program panel visible. Anyone can create an account without operator approval or email confirmation and immediately enters the headquarters signed in; signing in with email and password and reloading with a valid session also lead to the headquarters, or, when the saved game state holds a manual map run, to that map run — paused while it goes on, or on its screen after its end when it ended in a completion or in the character's death. The browser constructs the game only after the server confirms the session and then answers with the account's saved game state or that it has none, and an unavailable or uncertain answer to either request shows a warning and retry rather than an anonymous game or a new one; a saved game state that the game discards — of another version, naming an archetype missing from the data or of a shape the game does not admit — starts a new game, above which stands once, in `warning`, „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” for the first two and „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” for the last.

- **Scope:** browser-view, account-server
- **Based on:** none
- **Relations:** derives from D-51 · derives from D-53
- **Verification:** invariants: player-self-registration · player-password-login · email-verification-nonblocking. An agent compares a change with the decision:
  - complies: the page keeping „Sprawdzanie logowania…” after the session is confirmed until the server answers the saved game state, then building the game from it; a saved game state of an earlier version of the shape giving a new game with „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” above it, which a reload does not bring back
  - violates: a new game built when the request for the saved game state fails or times out; a refused saved game state starting a new game without a word; a saved game state missing a key of the game state read as „Zapis pochodził z innej wersji gry…”
- **Origin:** zapis_stanu_na_serwerze_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, questions 7, 8, 20, 21, 22 and 23, and § Settlements to record, row 7

*Rationale:* An account provides the entry to the game and the headquarters provides its starting place; repeating the password helps detect a registration typo, at the cost of another field and no anonymous preview. A player whose saved game state holds a manual map run comes back to that map run as it stood, so nothing the player was looking at is closed by signing in again. A game built before the server has answered about the saved game state would save itself over the real one at its first save, so a passing failure would cost the player's progress; a player whose saved game state is discarded learns that it was and whether it came from another version or was damaged, at the cost of two messages more.
*Rejected:* Anonymous play before registration — adds a second entry and later reconciliation of local progress; waiting for email confirmation — blocks the accepted immediate entry; the headquarters after signing in with a way back to a waiting manual map run — a new state of the screen, with its own question of what the player may do in the headquarters while the map run waits; a new game when the saved game state cannot be downloaded — the first save of that new game overwrites the saved game state on the server, so the player loses progress through a passing outage, against what this decision does at the session check; discarding a saved game state without a word — the player sees an empty team with no explanation and may take it for a fault; the sentence of another version for a damaged saved game state too — the player is given an untrue reason and, reporting the problem, speaks of a version where a fault is at stake; closing an ended map run at loading as „Zakończ” does, so the player lands in the headquarters — changes of D-62, D-132 and D-173, code closing the map run at loading, and after each reload following a death or a completion the loss of the copy's unsaved changes without the line „Niezapisane zmiany w kopii.” that warns before „Zakończ”, and of „Restart” on the same seed.

### D-97 — What does the player's logout do?

The shared „Wyloguj” button stands in the header beside the title, first saves the current game state on the server while it reads „Wylogowywanie…”, and then ends only this browser's server-side session; a tab that stopped saving after the refusal of D-210 ends it without saving. When that save fails for want of a connection or by an error of the server, logout does not happen and the game stays with „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.” in `warning`; when the server refuses the save as based on an earlier save than another browser's (D-209) or as too large (D-208), logout goes on; when it refuses it as of a lower version (D-210), and when the tab had already stopped saving after that refusal, logout goes on and the account forms show „Gra została zaktualizowana. Odśwież stronę.” in `warning` above them; and when it answers that there is no session, the game ends as D-211 gives. A confirmed logout returns to the account forms and hides the game, while a failed server operation keeps the game with a warning instead of claiming that logout succeeded; logout disposes the mounted game's timers and owned events, and stale account responses cannot remount it.

- **Scope:** browser-view, account-server
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: logout saves the game state, then destroys the current session and removes its game view, while another browser remains signed in; a logout whose save gets no answer keeping the game with „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.”; a tab that stopped saving after the refusal of D-210 logging out with no save request and showing „Gra została zaktualizowana. Odśwież stronę.” above the forms
  - violates: a tab that stopped saving after the refusal of D-210 logging out to the forms with no sentence above them; a header action that revokes every session of the account or leaves the hidden game's timer running; a logout that ends the session before its save has an outcome; a logout that ends the session after its save failed for want of a connection
- **Origin:** zapis_stanu_na_serwerze_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, questions 6, 17, 18 and 19, and § Settlements to record, row 6

*Rationale:* Independent browser sessions let a player leave one device without interrupting another; a visible failure avoids claiming the server revoked a session when its outcome is uncertain. Saving first keeps the progress made since the last save, at the cost of one more request at logout; where the server refuses the save for good — another browser's later save, a game state too large, a newer game on the server — the progress cannot be saved anyway, so logout goes on, and the progress of the tab since its last successful save is lost. The tab with older code tells the player at the forms to reload, so a sign-in in that tab does not meet its old code's refusal of a saved game state that is whole. A player who wanted to leave and whose session is gone is asked to sign in again, the unsaved state staying in the tab, unseen, until a reload or a sign-in to another account; for a blocked player „Sesja wygasła…” is untrue, the sign-in then reads „To konto jest zablokowane.” (D-139), and the state goes with the tab.
*Rejected:* Ending all browser sessions on ordinary logout — interrupts other devices; the unsaved progress kept in the page's memory and saved after signing in again to the same account, as when a session expires — a player who logged out leaves the state in the tab for the next person at that computer; the progress since the last save lost at logout — up to the last 30 real seconds of a map run, 30 game minutes at 1× and up to 480 at 16×; after the refusal for older code, logout going on without a word of the update — the player easily signs in in the same tab and meets the false alarm „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” while the saved game state on the server is whole; after that refusal, no logout until the page is reloaded — „Wyloguj” does not work in the old tab, and a player at a shared computer who does not reload stays signed in; the too-large refusal counted as a failed save — endless retries, a promise „Gra spróbuje ponownie.” that is not kept and a „Wyloguj” that does not work, leaving the player signed in at a shared computer; at a missing session, logout ending with the forms, no sentence and the unsaved state lost — against keeping unsaved progress when a session expires (D-203), and the progress since the last save lost; that ending for a blocked account only — the server would have to tell a session deleted by a block from an expired one, which it cannot since blocking deletes sessions (D-137), so it would keep or mark deleted sessions, which D-137 rejects, and a new state in the database and two behaviours instead of one.

### D-98 — Which player passwords are accepted?

A player password has from 12 through 128 Unicode code points of any kind, without a digit or uppercase-letter requirement, and its content is preserved without trimming or normalization. Registration's repeated password equals the password exactly, and browser validation uses the same code-point interpretation without making UTF-16 field limits authoritative.

- **Scope:** account-server, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: accepting an unchanged password containing spaces and supplementary characters at the code-point boundary
  - violates: trimming the password, rejecting pasted characters or applying a byte limit as the character limit
- **Origin:** none

*Rationale:* Length supplies a clear boundary without restricting the player's choice of characters; code points give the same explicit interpretation to server and browser, while a visible grapheme can contain several code points.
*Rejected:* Composition requirements — add arbitrary character rules; UTF-16 code units — count supplementary characters twice; grapheme counting — adds a different, more elaborate boundary.

### D-99 — How are player email addresses compared and checked?

The account server normalizes email with ECMAScript trim and lowercase, stores the normalized address uniquely, and accepts its form when exactly one `@` has nonempty text on both sides. It imposes no dot, DNS or ASCII restriction; confirmation establishes whether the address is real.

- **Scope:** account-server, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: registration and login normalize identically and a unique database constraint rejects concurrent duplicate registration
  - violates: browser validation rejecting a no-dot address that the server accepts, or a database-only ASCII comparison replacing normalization
- **Origin:** none

*Rationale:* A single normalized spelling keeps registration and later account operations consistent; case-distinct local parts intentionally cannot obtain separate accounts. A loose shape avoids treating a syntax filter as proof of delivery.
*Rejected:* Case-sensitive local parts — allow accounts the accepted comparison equates; stricter native browser email validation or DNS checks — reject addresses beyond the settled shape.

### D-100 — What do duplicate registration and failed login tell the player?

Registration with an email address that already has an account shows „Konto z tym adresem już istnieje.”. A credential login with an unknown address or a wrong password shows „Nieprawidłowy adres e-mail lub hasło.” without distinguishing the two; a blocked account's correct password is refused as D-139 gives.

- **Scope:** account-server, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: the same login response shape and message for unknown address and wrong password
  - violates: an unknown-address response exposing account existence through a distinct login message
- **Origin:** none

*Rationale:* A duplicate message explains why registration cannot proceed, while the common login message reveals no further distinction; registration consequently allows an observer to discover whether an address has an account.
*Rejected:* Hiding duplicate registration — obscures the accepted registration feedback; separate unknown-address and wrong-password login messages — reveal the cause the chosen message conceals.

### D-101 — How long do independent browser sessions last?

Each browser holds its own random, opaque session identifier in a loop2 host-scoped, Secure and HttpOnly cookie, and a player may remain signed in through several browsers at once. A session expires 30 days after its last request and every request with a valid session, static-file requests included, renews the server expiry and cookie. Expired, removed or invalid sessions authorize nothing, and a delayed renewal cannot resurrect a destroyed session or shorten a later expiry.

- **Scope:** account-server, browser-view
- **Based on:** express-session-store-contract
- **Relations:** derives from D-97
- **Verification:** invariants: player-opaque-session-cookie.
- **Origin:** none

*Rationale:* Sliding validity keeps an active player signed in but a device left signed in remains usable until its idle lifetime ends; independent records cost storage and permit revocation of one browser.
*Rejected:* A single session per account — interrupts other devices; a fixed expiry unaffected by activity — signs out an active player; client-only identity — prevents server record revocation.

### D-102 — How are account attempts limited?

Five failed logins for one normalized email address within a rolling 15-minute window lock that address for 15 minutes from the fifth failure; success clears pre-lock email history but not IP failures, and a locked address remains locked even for correct credentials. One client IP admits at most 20 failed logins per rolling 15 minutes and five successfully created accounts per rolling hour, with in-flight reservations counted before asynchronous password work so concurrency cannot overshoot those limits. A limited player sees „Za dużo prób. Spróbuj ponownie za kilka minut.”; invalid or duplicate registrations do not consume successful-account slots, and a capacity refusal is not a credential failure.

- **Scope:** account-server, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: account-attempt-limits. An agent compares a change with the decision:
  - complies: parallel requests reserve their admission before hashing and release unused capacity after actual completion
  - violates: simultaneous successful registrations exceeding the IP limit or correct credentials bypassing an active email lock
- **Origin:** none

*Rationale:* Per-address and per-network limits slow repeated attempts but allow an attacker to lock another address and make users behind a shared address share a limit. Rolling histories release stale partial failures; attempts spread below the threshold remain possible, and changing client addresses can evade an address limit.
*Rejected:* Lifetime accumulation of email failures — stale partial histories retain capacity indefinitely; counting only after asynchronous work without reservations — concurrent requests exceed admission limits.

### D-103 — Where are attempt counters kept and how is password work bounded?

Attempt histories live in bounded process memory, with at most 10,000 live email keys and 10,000 live IP keys, fixed-size digests for email keys and threshold-bounded histories; restart or deployment clears them. Expired entries release capacity, live restrictions are not evicted to admit another key, and full capacity refuses work. One bounded gate without a waiting queue covers password hashing and verification, including dummy verification for an unknown account, with a concurrency cap selected by measurement within the container memory budget and slots released only when the actual operation completes.

- **Scope:** account-server, deployment
- **Based on:** none
- **Relations:** derives from D-102
- **Verification:** invariants: account-attempt-limits · account-attempt-tracking. An agent compares a change with the decision:
  - complies: a full gate refuses immediately and a disconnected request retains its slot until native work finishes
  - violates: registration and login using independent unbounded hash pools or dropping a live limiter key to make room
- **Origin:** none

*Rationale:* Bounded histories and native work prevent untrusted input from consuming unbounded memory; a restart loses the restrictions and a full table can refuse legitimate newcomers. The measured gate shares the host processor with other workloads.
*Rejected:* Durable counters — write on every attempt and survive a restart at additional storage cost; unbounded maps or a waiting queue — move denial of service into memory; evicting a live restriction — permits bypass by filling the table.

### D-104 — Which request origin and body may change account state?

The session cookie uses SameSite=Strict, and every state-changing route requires exactly the configured serialized HTTPS Origin and an application/json body with at most 64 KiB for the save route `PUT /api/saved-game` and at most 16 KiB for every other route, optional charset allowed and compressed inflation rejected, while the server stores at most 64 KiB of each player's saved game state. Missing, null, duplicate, malformed or foreign Origin and wrong media type are refused before mutation or password work, and Host or forwarded host headers never choose the expected origin. Input is an object of expected fields with explicit type checks rather than coercion, and no cross-origin allowance or form-body alternative bypasses these guards.

- **Scope:** account-server, browser-view
- **Based on:** fetch-origin-header
- **Relations:** derives from D-101
- **Verification:** invariants: account-mutation-request-guards.
- **Origin:** zapis_stanu_na_serwerze_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 9, and § Settlements to record, row 9

*Rationale:* An explicit expected origin and JSON boundary constrain state changes made with a browser cookie; clients that omit the origin are refused, and valid-looking content still needs field checks. The save route takes a whole saved game state, which grows with what later work adds to the game state, so it takes a limit of its own, while the other routes keep the small one their bodies need; at the full stored limit a thousand accounts take about 65 MB in each copy of the database.
*Rejected:* A separate anti-forgery token — adds another value and lifecycle beyond the selected origin policy; inferring origin from the request host — lets input choose the expected value; accepting form bodies — broadens the request boundary; the save route under the 16 KiB limit, with as much stored per player — likely too small for a later addition to the game state, which would then have to change this decision, a save over it refused and seen by the player as a failed save, at about 16 MB per copy for a thousand accounts at the full limit; 1 MiB — room for long, but the place for copies of the database holds about 190 saved game states at the full limit, and one request takes more of the container's memory.

### D-105 — How is sending account email limited?

The account server sends at most 30 account messages per hour in total and at most three per email address per hour. Above either limit no message is sent and the player is told to try later; no monthly sending cap applies.

- **Scope:** account-server
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: account-message-limits. An agent compares a change with the decision:
  - complies: confirmation and password-recovery send paths share both limits and refuse an excess message
  - violates: either mail path sends after a limit is reached or adds an unapproved monthly cap
- **Origin:** none

*Rationale:* Hourly limits bound a burst while retaining a simple sending rule; they can exhaust the provider's monthly allowance and prevent recovery messages until delivery becomes available again. The chosen policy accepts that risk rather than reserving a monthly balance.
*Rejected:* A persistent monthly cap below the provider allowance — adds a shared balance and restricts sends earlier; unrestricted sending — lets a burst consume delivery capacity.

### D-106 — How are player passwords hashed and checked?

The account server hashes and verifies player passwords with the `argon2` package using Argon2id. Its cost parameters are set explicitly after measuring hash and verify operations under concurrent login attempts in the intended Mikrus container image.

- **Scope:** account-server, build-tools, deployment
- **Based on:** argon2-password-api · argon2-native-platform · password-hash-work-factor
- **Relations:** none
- **Verification:** invariants: player-argon2-password-hash · player-argon2-deployment-check.
- **Origin:** none

*Rationale:* The package handles salt generation, an encoded password hash and verification, so the project writes less security-sensitive code than with a lower-level hash API. A native dependency can fail to install or consume more memory than the target permits; compatible published binaries support feasibility rather than proving this particular image. Explicit settings and target measurements address that uncertainty.
*Rejected:* Node's built-in Argon2 — leaves salt, encoded format and verification to project code; another native Argon2 package — no demonstrated target-image advantage; bcrypt — a legacy alternative with a password-input restriction incompatible with unrestricted password content.

### D-107 — Which library maintains player sessions?

The account server uses `express-session` to issue and maintain player sessions, with a project-owned session Store backed by the chosen `node:sqlite` database. The deployed server does not use the package's default `MemoryStore`.

- **Scope:** account-server, build-tools, deployment
- **Based on:** express-session-store-contract · node-sqlite-database
- **Relations:** derives from D-101 · derives from D-138
- **Verification:** invariants: player-express-session-sqlite-store.
- **Origin:** none

*Rationale:* The library supplies cookie and session lifecycle while the project supplies a database adapter, signing keys and the correct proxy boundary. A custom adapter remains maintenance work and can introduce expiry or concurrency faults.
*Rejected:* Own middleware using a cookie helper — leaves issuance, rotation, expiry and invalidation to the project; connect-sqlite3 — adds an external SQLite driver; cookie-session — keeps session data in the browser; MemoryStore — unsuitable for deployed sessions.

### D-108 — What public address do the game and account server share?

The built game and the account and save server use one public HTTPS origin at loop2's address. The browser sends account and save requests to relative `/api/` paths at that origin.

- **Scope:** browser-view, account-server, deployment
- **Based on:** fetch-same-origin-credentials
- **Relations:** derives from D-05 · derives from D-10
- **Verification:** invariants: loop2-shared-public-origin.
- **Origin:** none

*Rationale:* A shared origin carries eligible session cookies without a separate cross-origin agreement. An API moved to another machine can keep its public route through forwarding, at the cost of maintaining that forwarding.
*Rejected:* Separate public origins — permit independent addresses but require additional browser and server configuration.

### D-109 — What identity authorizes an account request?

A visitor may create an account or attempt credential login subject to the transport, origin, input and admission guards; an emailed confirmation link alone, under the transport, origin and input guards, authorizes confirming the address of its own account; and a valid server-side session alone authorizes reading its own account, reading and replacing its own account's saved game state, asking for a confirmation message to its own account's address or destroying that browser's session. `GET /api/account`, `GET /api/saved-game`, `PUT /api/saved-game`, `POST /api/email-confirmation-message` and `POST /api/logout` without a valid session return JSON 401, while an account identifier or email address supplied in a request grants no authority and no field of a request for the saved game state names an account. Credential success regenerates and persists the session before success is returned, logout awaits destruction, and account responses are not cacheable and expose no password hash, session identifier, link token, secret, database error or stack.

- **Scope:** account-server, browser-view
- **Based on:** none
- **Relations:** derives from D-96 · derives from D-97 · derives from D-101 · derives from D-104 · derives from D-156 · derives from D-157 · derives from D-202 · derives from D-204
- **Verification:** invariants: account-session-authorization · player-save-isolation.
- **Origin:** none

*Rationale:* Server-held identity keeps browser input from selecting another account, so the stored session alone selects the saved game state a request reads or replaces, and waiting for persistence prevents a success response with no usable session. Errors can leave a newly created account usable for later login even when its first session could not be stored. A link shows control of its own address without a session and opens no other operation of the account, and a session that asks for a message gets it sent only to its account's own address.
*Rejected:* Request-supplied identity — lets a caller select another account; responding before session persistence or destruction — reports success without the promised state; deleting an account after its session fails — races with a later valid login; a confirmation that needs a session — a player who opens the link in another browser or signed out could not confirm.

### D-110 — Which proxy information identifies an account request?

In the private Cloudflare Tunnel topology of D-10, account requests require exactly one X-Forwarded-Proto value of https and one syntactically valid CF-Connecting-IP, normalized for equivalent IP representations and used directly for admission limits; Express trusts only the immediate hop for protocol. Duplicate, list or malformed values are refused, and X-Forwarded-For, X-Real-IP, Forwarded and forwarded host values never select account authority, limiter identity or expected origin. Explicit local loopback-proxy mode trusts only a loopback peer, requires forwarded https and uses the actual peer as identity, while direct mode trusts no forwarding and anonymous static and health requests require no proxy metadata.

- **Scope:** account-server, deployment
- **Based on:** cloudflare-tunnel-transport
- **Relations:** derives from D-10 · derives from D-102
- **Verification:** invariants: account-request-transport. An agent compares a change with the decision:
  - complies: target acceptance checks actual cookie issuance and client-address handling through the tunnel, including provider transformations
  - violates: treating synthetic header tests as proof of the deployed provider route
- **Origin:** none

*Rationale:* The closed origin topology makes the connector's information usable while a header name alone cannot establish trust. Provider transformations or a newly exposed origin can invalidate that assumption, and synthetic local headers prove parsing rather than the real route.
*Rejected:* Unconditional trust proxy or the leftmost forwarded address — admits spoofed chains; fixed container addresses — add coordination without an advantage over the closed topology.

### D-111 — When is account configuration sufficient to start the server?

Production requires valid `LOOP2_DATABASE_PATH`, `LOOP2_SESSION_SECRET_FILE`, `LOOP2_PUBLIC_ORIGIN`, `LOOP2_PROXY_MODE`, `LOOP2_MAIL_FROM`, `LOOP2_SMTP_HOST`, `LOOP2_SMTP_PORT`, `LOOP2_SMTP_USER` and `LOOP2_SMTP_PASSWORD_FILE`, and every partial or invalid explicit configuration refuses before listening; wholly unconfigured non-production may serve public files with JSON 503 from known account routes, without anonymous gameplay or generated-secret, in-memory-database or MemoryStore fallback. The configured origin is HTTPS without credentials, non-root path, query or fragment; the signing file is at most 16 KiB of UTF-8 JSON containing a nonempty array of distinct base64url strings, each encoding exactly 32 random bytes with the newest first; the sender is one address of printable ASCII with exactly one `@` and no whitespace or address delimiter, the SMTP host at most 253 characters of labels of ASCII letters, digits and hyphens joined by dots, the port a decimal integer from 1 to 65535, the login text of at most 254 characters without whitespace or control character, and the password file a regular file of at most 1 KiB of UTF-8 with no control character, so a trailing newline is refused, read once; unreadable or invalid settings report their setting or path rather than contents, and startup does not contact the mail service. After configuration and required resources validate, a start with neither listen variable set retains `127.0.0.1:3000` and the existing occupied-address error, and startup failure or shutdown disposes opened resources.

- **Scope:** account-server, deployment, build-tools
- **Based on:** session-secret-rotation
- **Relations:** derives from D-13 · derives from D-107 · derives from D-153
- **Verification:** invariants: account-server-default-address · account-startup-configuration.
- **Origin:** none

*Rationale:* Failing before readiness prevents an apparently healthy production process from operating without durable identity or a signing key. An explicitly unconfigured development mode still allows static work, while partial configuration remains an error rather than silently losing account behavior. The mail settings count as account settings, so a server that holds accounts can always send their confirmation messages, and every local run or test that configures accounts supplies them; the mail service is not reached at startup, so its failure never keeps the game down.
*Rejected:* Generated production keys or ephemeral storage — invalidate or lose identity on replacement; an unconfigured production fallback — conceals missing setup; unconditional default-start readiness — contradicts required validation; mail as a separate optional group with mail switched off outside production — a second configured but incomplete mode beside the one unconfigured mode; trimming the password file — hides a rotation mistake until the first failed login to the mail service.

### D-113 — Which file is the exemplar for password hashing?

The exemplar for kind `password-hashing` is `src/server/passwords.ts`, and its kind guidelines are read before adding or changing a password-hashing file. Hashing and verification share one bounded admission gate, preserve password content, and use one explicit Argon2id profile, measured with that gate in the deployed container image.

- **Scope:** account-server
- **Based on:** argon2-password-api · argon2-native-platform · password-hash-work-factor
- **Relations:** derives from D-98 · derives from D-103 · derives from D-106
- **Verification:** invariants: password-operation-gate · player-argon2-password-hash · player-argon2-deployment-check.
- **Origin:** none

*Rationale:* A first file makes password work's admission and package boundary visible for later account routes. The measurement of the deployed image shows that two slots of this profile fit within 80% of its memory limit; a different profile or gate carries no such evidence.
*Rejected:* Separate gates for hash and verify — allow their combined memory use to exceed the shared limit; an unbounded queue — retains arbitrary pending work; treating an unmeasured profile or gate as fitting — claims target suitability without target evidence.

### D-112 — How does the account database open and preserve its schema?

The account server opens one application-owned SQLite connection before readiness, and the operator's blocking command of D-137 opens one short-lived connection beside it under the same rules; opening reads the schema version and, in the same transaction, applies in order every migration step after it up to the current version 4 — one step per version, a step never edited once deployed, a later version adding one step at the end — so it initializes a new database, moves an existing older known version forward keeping every account, session, emailed link and saved game state and their values, and refuses an unknown newer schema without changing it. Accounts have an opaque random primary identifier, uniquely normalized email, encoded password hash, creation time, blocked state and the time their email address was confirmed, unset until it is; sessions have their identifier, account foreign key, serialized library data and absolute expiry with account and expiry indexes; emailed links have the SHA-256 digest of their token as key, an account foreign key that removes them with their account, a purpose of email confirmation or password reset, creation and expiry times and a mark that they no longer work, with account and creation-time indexes; saved game states have their account's identifier as key and as a foreign key that removes them with their account, the version of their shape, their revision and the game's text of at most 65 536 bytes; foreign keys, parameterized statements, WAL, full synchronization and a bounded busy timeout apply, and no transaction spans asynchronous hashing, mail sending or an HTTP response. Expired sessions are rejected on reads and pruned at startup and periodically with a disposed lifecycle timer, together with emailed links both expired and older than one hour, pruned in bounded batches, while touch updates existing unexpired rows only, preserves the later expiry and never recreates a removed session; blocking an account sets its state, deletes its sessions and marks all its emailed links as no longer working in one transaction, a session write for a blocked account stores nothing, and recording an emailed link reads its account's blocked state in the transaction that writes it, writes nothing for a blocked account, and in the same transaction marks every earlier link of the same account and purpose as no longer working; writing a saved game state reads its account's blocked state, its stored version and its stored revision in the transaction that writes it and writes nothing when the account is blocked or D-209 or D-210 refuses the save, and blocking keeps the account's saved game state.

- **Scope:** account-server, deployment
- **Based on:** node-sqlite-database · sqlite-wal-concurrency
- **Relations:** derives from D-15 · derives from D-17 · derives from D-99 · derives from D-101 · derives from D-107 · derives from D-156 · derives from D-161 · derives from D-205
- **Verification:** invariants: account-schema-lifecycle · account-database-schema · account-session-storage.
- **Origin:** none

*Rationale:* An explicit schema version prevents old code from interpreting a newer layout or resetting existing accounts, and short synchronous database operations keep transaction ownership simple. One ordered list of steps builds a new database and moves an existing one by the same statements, so the two cannot drift apart, at the cost of a new database running through the history of steps. A second connection from the operator's command waits out the server's short transactions within the busy timeout, and a block committed while a login is in progress either deletes the session that login stored or makes its write store nothing. Container replacement preserves the database, but rollback restores code rather than historical data and cannot repair an incompatible schema: once a database is moved forward, code that knows only an older version refuses it. Emailed links stay after their use until they have expired and are an hour old, because they also count account messages against D-105 (D-161), and their purpose admits password reset already, because a constraint of a table cannot be widened without rebuilding it. Reading the block in the transaction that records a link means a block either comes first, so nothing is recorded or sent, or comes after and marks the recorded link as no longer working, so a message already on its way carries a link that does not work. A saved game state in a table of its own stays out of the rows every login reads, and reading the block, the version and the revision in the transaction that writes it means no save lands between the check and the write; a blocked player's saved game state waits for the unblock.
*Rejected:* A destructive startup reset — loses accounts; the saved game state in a column of the accounts table — a text of up to 64 KiB in the row every login reads; a column for the moment of saving before anything reads it — a schema step no one needs; deleting an emailed link on use or block — loses the count of messages D-105 limits, so a blocked account's later messages escape the hourly count; a purpose admitting email confirmation alone — password reset would rebuild the table; a boolean confirmed column — the time costs no more and tells when; unversioned schema assumptions — let old code misread newer data; creating the latest schema directly on a new database beside separate upgrade steps — two definitions of one schema that have to agree, the first difference showing only on a moved database; rebuilding the tables at every version — moves every row and lengthens the write lock where adding a column suffices; a step back from a newer version, or a copy of the database before a move — not provided, so a rollback across a schema change fails until code that knows the newer version is deployed; transactions held across password work — prolong locks; session touch implemented as an upsert — revives logout; deleting a blocked account's sessions without guarding the session write — a login in progress at the block stores its session afterwards.

### D-114 — Which file is the exemplar for database access?

The exemplar for kind `database-access` is `src/server/database.ts`, and its kind guidelines are read before adding or changing a database-access file. Database access owns the SQLite connection, transactional schema initialization, bound SQL values and connection disposal, independently of HTTP and password hashing.

- **Scope:** account-server
- **Based on:** node-sqlite-database
- **Relations:** derives from D-28 · derives from D-112
- **Verification:** an agent compares a change with the decision:
  - complies: database-access guidelines identify the first implementation as exemplar and keep SQL and connection ownership together
  - violates: a different exemplar or database access that spans asynchronous password work
- **Origin:** none

*Rationale:* A concrete model keeps persistence and failure handling visible for later account operations, while synchronous ownership limits transaction lifetimes.
*Rejected:* Scattered SQL in HTTP handlers — obscures connection ownership and makes persistence failures harder to exercise independently.

### D-115 — Which file is the exemplar for the session Store?

The exemplar for kind `session-store` is `src/server/session-store.ts`, and its kind guidelines are read before adding or changing a session-store file. The Store adapts the library's callbacks to database operations, validates stored session identity and cookie metadata before library hydration, and leaves HTTP and cookie policy to application assembly.

- **Scope:** account-server
- **Based on:** express-session-store-contract · express-session-cookie-lifecycle · cookie-serialization-validation
- **Relations:** derives from D-28 · derives from D-107 · derives from D-112
- **Verification:** invariants: account-session-storage. An agent compares a change with the decision:
  - complies: session-store guidelines identify the first implementation as exemplar and preserve callback failures
  - violates: treating parsed JSON as a valid library session without checking its shape
- **Origin:** none

*Rationale:* The adapter makes malformed persisted data and storage failures explicit before the library restores a session; a deliberately narrow payload requires conscious changes when session data grows.
*Rejected:* Unchecked deserialization — passes arbitrary stored properties to library objects; a second session middleware — duplicates the chosen library's lifecycle.

### D-116 — Which file is the exemplar for account policy?

The exemplar for kind `account-policy` is `src/server/account-policy.ts`, and its kind guidelines are read before adding or changing an account-policy file. Account policy normalizes and checks credentials and reserves, settles and bounds attempt admission against a supplied clock, independently of HTTP, password hashing and the database, and each admitted attempt is settled once, only after the password work it started has completed.

- **Scope:** account-server
- **Based on:** none
- **Relations:** derives from D-28 · derives from D-98 · derives from D-99 · derives from D-102 · derives from D-103
- **Verification:** invariants: account-attempt-limits · account-attempt-tracking. An agent compares a change with the decision:
  - complies: account-policy guidelines identify the first implementation as exemplar, and a route settles its admission after the awaited password operation without reading the connection's state
  - violates: limiter state kept in an HTTP handler, or a settlement made when the client disconnects
- **Origin:** none

*Rationale:* One HTTP-independent unit makes the credential rules, the attempt accounting and their clock visible together for later account operations such as password recovery, while a settlement tied to completed work keeps a disconnected client from freeing or erasing an attempt. Its weak point is that the policy cannot observe password work itself: the route decides when that work has completed, so the rule rests on the route's sequencing.
*Rejected:* Limiter counters inside route handlers — mix HTTP sequencing with accounting and hide the reservation lifetime; settling on the connection's close — lets a client abandon attempts to exceed the limits.

### D-117 — Which file is the exemplar for a browser API client?

The exemplar for kind `browser-api-client` is `src/browser/account-api.ts`, and its kind guidelines are read before adding or changing a browser API client file. A browser API client sends its requests to relative `/api/` paths and follows no redirect, reports a success only for its request's own success status with a well-formed body, reports every other answer, a failed connection and an answer not complete within its time limit as a typed failure, and keeps no identity, cookie or document state.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-28 · derives from D-108
- **Verification:** invariants: account-client-requests · account-client-outcomes. An agent compares a change with the decision:
  - complies: browser API client guidelines identify the first implementation as exemplar, and a screen reads the client's typed result instead of a status code or a response body
  - violates: a client that treats any 2xx status as a success, or a screen that calls `fetch` for an account route itself
- **Origin:** none

*Rationale:* One module that owns the request details lets the screens read outcomes instead of status codes, and keeps a response that merely looks like a success from signing a player in or leaving them signed out by mistake. Its weak point is that the client copies the server's contract by hand, so a change of a route's status or body must change the server and the client together.
*Rejected:* A client shared by import from the server — joins the browser and server builds; a request written in each screen — repeats the status checks and the time limit in every screen and lets one of them report a success it did not receive.

### D-118 — When does the player learn what the world holds?

The condition „Zawsze” is in the Understanding from the start of a new game; every other action,
item, condition, creature and branch enters the Understanding only when discovered in play, each by the need, action,
item or encounter that reveals it. When something is discovered, game time stops by itself.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: player-map-run-pace · minute-span-split. An agent compares a change
  with the decision:
  - complies: the first gathered sticks revealing „Wytwórz” and the campfire; the first wolf
    revealing the verbs of combat
  - violates: a program editor listing every condition from the first game minute
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D13 and §5 "Odkrywanie idzie dwiema osiami" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "When does the player learn what the world holds?"

*Rationale:* discovery is written into how the game works rather than into text; the tuning screen
holds as many choices as have been found, so it never starts overwhelming, and the growing list is
visible progress. The first map run is by nature a linear tutorial; tuning begins in the second.
The condition „Zawsze” says nothing about the world, so its discovery would tell the player
nothing.
*Rejected:* the full list open from the start — discovery goes, and the tuning screen starts
overwhelming.

### D-119 — Whose is the knowledge of the world, and what may a character use of it?

The Understanding belongs to the player and is one for all characters, and what any character
discovers enters it for every character. A character's repertoire is computed from the
Understanding through its archetype's predispositions and the branches the character has bought, and is never saved; an action or item of a bought branch is open only to the character that bought it. That one computation is
at once what the program editor offers and what the simulation lets the character carry out.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: the program editor and the simulation both asking one function for a character's
    repertoire; a character's death, „Restart” and „Zakończ” leaving the Understanding as it was
  - violates: a list of discovered actions saved with each character; an editor that filters by
    archetype while the simulation does not; a branch bought by one character usable by another
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D38, D41 and D50 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "Whose is the knowledge of the world, and what may a character use of it?"

*Rationale:* a new character sees what others discovered, but only what its archetype lets it
learn; knowledge kept per character would make the opening chain a tutorial played again with
every character, and would die with the character. One computation serves both the editor and the
simulation: a program moved between characters cannot get round it, and the editor never offers
what the character will not carry out. The discovery of a branch is a fact of the world and stays with the player, while the character skill goes with the character that paid for it.
*Rejected:* the Understanding saved with each character; a filter in the editor alone — a program
moved between characters gets round it; a filter in the simulation alone — the editor offers what
never runs; a bought branch open to every character — one character's tree becomes everyone's.

### D-120 — What does an archetype open to a character?

An archetype opens character skills, not actions: an action is open to a character when the
character skill that its pair of verb and target grows is among the predispositions of the
character's archetype and, for an action opened by a branch, the character has bought that branch. An action that no character skill grows, such as a move onto a neighbouring
tile, is open to every character, and an archetype never filters items.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-119
- **Verification:** an agent compares a change with the decision:
  - complies: „Wytwórz — ognisko” open to every archetype, while making an archetype's own goods is
    open only to that archetype
  - violates: an archetype defined as a list of allowed verbs; an archetype that forbids eating an
    item
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D40 and D49 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What does an archetype open to a character?" · wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q3 and the accepted resolution under Settlements to record

*Rationale:* one verb, „Wytwórz”, makes both the common campfire and an archetype's goods, so only
the pair of verb and target names the character skill the action belongs to. Items are things of
the world: a character eats, burns and carries what it would not make itself, and without that the
team's chest would mean nothing.
*Rejected:* reading the predisposition condition as only necessary while leaving the sentence unchanged — its plain reading would admit „Obchód” without buying the branch; a filter on verbs — cannot express „Wytwórz”; a filter on items — an item is a thing of
the world, not a capacity of the character.

### D-121 — What brings each action, item and condition of Las into the Understanding?

On the game map Las, the first game minute in which a character is chilled brings into the
Understanding the actions „Eksploruj” and „Wędruj” and the condition „Temperatura poniżej”, and the
first finished exploration brings „Idź”, „Zbierz”, the conditions „Tu leży mniej niż” and „Zapas
poniżej” and the items lying on the tile it reveals, each tile revealed later adding the items
lying on it, moss and fibre included. The first gathered stick brings „Wytwórz — ognisko”, „Zapal —
ognisko”, „Zapal — patyk” and the campfire, and the first crafted campfire brings „Idź — ognisko”
and the conditions „Zostało mniej niż — ognisko” and „Z dala od — ognisko”. The first finished
„Zapal”, of a campfire or of a stick, brings „Zasil — ognisko” and the condition „Energia natury
poniżej”, and the first gathered berry brings „Zjedz — jagoda” and the condition „Sytość poniżej”.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-118
- **Verification:** an agent compares a change with the decision:
  - complies: a mage of a new game first chilled in game minute 84 bringing „Eksploruj”, „Wędruj”
    and „Temperatura poniżej” into the Understanding; the program editor offering „Idź” and a
    condition „Tu leży mniej niż” once the first exploration has finished; the first finished
    „Zapal — patyk” naming „Zasil — ognisko” and „Energia natury poniżej” in one line of discoveries
  - violates: the conditions on the campfire offered after the first gathered stick, before any
    campfire has been crafted; „Zasil — ognisko” discovered with the first gathered stick;
    „Energia natury poniżej” discovered before the first finished „Zapal”
- **Origin:** odkrywanie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "1. Co odsłania co — które zdarzenie gry wprowadza do Zrozumienia które akcje, przedmioty i warunki Lasu, i co gracz zna od startu nowej gry?" · plomyk_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q6. Co wprowadza warunek „Energia natury poniżej” do Zrozumienia?"

*Rationale:* the first map run is a linear tutorial, so each discovery in Las offers the program
what the tutorial needs next — cold, the tile, sticks, fire, food — in the order a character
meets them. The condition on nature energy comes with the first finished lighting, the game minute
in which the energy first falls. Accepted with it: moss and fibre enter the Understanding although
nothing uses them yet; the first lit stick reveals „Zasil — ognisko” as a lit campfire does; the
conditions on the campfire come with the first crafted campfire, later than in loop.
*Rejected:* the conditions on the campfire coming with the first gathered stick, as in loop;
„Energia natury poniżej” brought by the first finished „Zapal — ognisko” and not by a lit stick.

### D-122 — What does a map run do, and what does the player see, when something is discovered?

When something is discovered in a map run the player starts, the map run stops in the same pause
as after „Pauza”: the status row adds „ (pauza)”, and the player goes on with „Wznów”. Below the
status row a line in the role `discovery` names what was discovered, the discoveries of one game
minute in one line, and it stands until the player goes on; where the last encounter has a line, it stands below the discovery line and above the body and backpack. Where the map run ends in a completion
in the game minute of a discovery, the screen after the completion takes the place of the pause, and
the line stands below its status row until „Restart” or „Zakończ”.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** derives from D-21 · derives from D-118
- **Verification:** invariants: player-map-run-pace. An agent compares a change with the decision:
  - complies: after the first finished exploration the status row ending in „ (pauza)” and below
    it the line „Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach można teraz sprawdzić: Tu leży
    mniej niż … szt., Zapas poniżej … szt.”, gone once the player presses „Wznów”; a completion of
    Las in the game minute of a discovery showing „Minuta 480 · Las rozwiązany” with no „ (pauza)”
    and the line of that discovery below it until „Restart”
  - violates: a button of its own for going on after a discovery; the line of discoveries still
    standing after „Wznów”; two discoveries of one game minute in two lines; a completion in the
    game minute of a discovery leaving the map run paused with „Wznów”; the line of that discovery
    gone from the screen after the completion before „Restart” or „Zakończ”
- **Origin:** odkrywanie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "3. Jak czas gry staje przy odkryciu i co wtedy widzi gracz?" · rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "15. Co widzi gracz, gdy przejście domyka się w tej samej minucie gry, w której coś odkryto?"

*Rationale:* one pause gives the player one way to hold a map run and one way to go on, and
whatever treats a paused map run treats a map run stopped by a discovery the same. A map run that
ends in the game minute of a discovery has nothing to go on to, so the screen of its end stands
in place of the pause, and the player still reads what that game minute discovered, which enters the
Understanding as any discovery does. Accepted with it: a stop at a discovery cannot be told apart in
the game state from the player's pause, and a player who goes on at once loses the list of
discoveries, since the game keeps no record of them; the line of discoveries ends in two ways,
„Wznów” or „Restart” and „Zakończ”, and the screen after a completion can keep both discovery and encounter text.
*Rejected:* a stop at a discovery as a game state of its own, with a button of its own; the screen
after a completion with no line of the discovery made in its game minute — the player would not
learn what that game minute discovered.

### D-123 — What does the game write into the program at a discovery?

A program rule the game writes at a discovery goes into the first rule group of the copy the map run
carries out and into the first rule group of the program the copy belongs to, while that program is
on the player's list, and where either holds no rule group, the game adds the rule group „Program”
with the condition „Zawsze” and writes the rule into it; the other programs of the list stay as they
were. Today the game writes one such rule, „Zawsze → Eksploruj”, when the first chill brings
„Eksploruj” into the Understanding. The rule so written counts neither as an unsaved change of the
copy nor as a change of the program that a save of the copy announces.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-90 · derives from D-121 · derives from D-164
- **Verification:** an agent compares a change with the decision:
  - complies: a new game's mage first chilled in game minute 84 with the empty rule group „Program”
    of the copy and of the program „Program” each gaining „Zawsze → Eksploruj” there, „Program 2”
    staying as it was and the copy showing no unsaved changes; a first chill in a copy whose rule
    groups the player has all deleted adding the rule group „Program” with the condition „Zawsze”
    and the rule in it
  - violates: the rule written again at a later chill or in a later map run; the rule written into
    a rule group of its own beside the first rule group; the rule written into every program of the
    list; the rule lighting „Niezapisane zmiany w kopii.” or the line of a program that changed
- **Origin:** odkrywanie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "2. Czy przy pierwszym wychłodzeniu gra sama dopisuje do programu regułę „Zawsze → Eksploruj”, jak w loop?" · programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q7. Do którego programu gra wpisuje regułę przy odkryciu, gdy przejście wykonuje kopię programu — do kopii, do zapisanego programu czy do obu? (pytanie planu dla zadania 12)"

*Rationale:* until the first chill the character knows no action and stands, so the rule written
then sets it moving and shows the player the shape of a program rule in the program editor. Written
into the copy and its program alike, the rule acts in the map run and stays in the program the next
map run takes, and since both receive it, it gives the player nothing to save and nothing to lose.
Accepted with it: once in a game the game changes a saved program of the player with no move of the
player, who sees the rule in the program editor and can delete it.
*Rejected:* the program left as the player wrote it at the first chill; the rule written into the
copy alone, into the saved program alone or into every program of the list.

### D-124 — What does „Dodaj regułę” do before the player has discovered an action?

„Dodaj regułę” is disabled while the Understanding holds no action, and once it holds one, it adds
the program rule „Zawsze → Eksploruj” at the end of its rule group.

- **Scope:** browser-view, simulation
- **Based on:** none
- **Relations:** derives from D-118
- **Verification:** an agent compares a change with the decision:
  - complies: „Dodaj regułę” of a new game's rule group „Program” disabled until the first chill,
    and from then on adding „Zawsze → Eksploruj” at the end of the group
  - violates: „Dodaj regułę” adding a program rule whose action the Understanding does not hold
- **Origin:** odkrywanie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "4. Co robi „Dodaj regułę”, zanim gracz odkryje jakąkolwiek akcję?"

*Rationale:* a program rule needs an action, and before the first chill the Understanding holds
none to offer; from the first chill on it holds „Eksploruj”, so the rule the button adds is one
the program editor offers. Accepted with it: through the first game minutes of a new game the
player sees a button that cannot be used.
*Rejected:* „Dodaj regułę” adding „Zawsze → Eksploruj” before „Eksploruj” is discovered — the
program editor would offer an action the Understanding does not hold.

### D-125 — What do the body row, the backpack and the terrain panel show of what is not yet discovered?

The body row, the backpack, the list of revealed tiles and the drawing of the game map show what the
game state holds, whatever the Understanding holds: the body row shows satiety before the condition
„Sytość poniżej” is discovered, and the backpack and the terrain panel show every item they hold.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: the body row of a new game's first map run showing satiety from game minute zero
  - violates: the body row hiding satiety until „Sytość poniżej” is discovered; an item of the
    backpack or of a revealed tile drawn or listed as unknown until it is discovered
- **Origin:** odkrywanie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "6. Czy odkrywanie zasłania coś poza listami edytora programu — wiersz ciała, plecak, listę odsłoniętych kafelków, rysunek mapy?"

*Rationale:* the Understanding decides what a program can name, while the body row, the backpack
and the terrain panel show the state of the map run the program acts on. Accepted with it: the
player sees satiety in the body row before a condition on it can be written.
*Rejected:* the body row hiding satiety until „Sytość poniżej” is discovered, and the backpack and
the terrain panel hiding items not yet discovered.

### D-126 — What does the simulation do with a program rule outside the character's repertoire?

The simulation passes over a program rule whose condition, action or the target of either lies
outside the character's repertoire to the next program rule, as over a program rule whose action cannot be
carried out in that game minute, and the program rule stays in the program.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-119 · narrows D-23
- **Verification:** invariants: program-rule-pick. An agent compares a change with the decision:
  - complies: a program holding „Zawsze → Zjedz — jagoda” above „Zawsze → Eksploruj” before the
    first gathered berry, the character starting „Eksploruj” and the first rule staying in the
    program
  - violates: the simulation refusing a program that holds a program rule outside the character's
    repertoire; a program rule passed over for lying outside the repertoire removed from the program
- **Origin:** odkrywanie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "8. Co symulacja robi z regułą programu, której warunek, akcja albo cel nie należy do repertuaru postaci?"

*Rationale:* a program rule outside the repertoire is one the character cannot carry out yet, so
the program goes past it as past an action that cannot be carried out, and the rest of the program
acts; kept in the program, it acts once the repertoire holds what it names. Accepted with it: a
program rule that does not act stands in the program with no sign of why.
*Rejected:* the simulation refusing a whole program that holds a program rule outside the
character's repertoire — a program carried to another character or another archetype would stop
whole.

### D-127 — What does the simulation do with a rule group whose condition lies outside the character's repertoire?

The simulation passes over a rule group whose condition, or the target of that condition, lies
outside the character's repertoire, together with every program rule it holds, as over a rule group
whose condition does not hold, and the rule group stays in the program.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-119 · narrows D-23
- **Verification:** invariants: program-rule-pick. An agent compares a change with the decision:
  - complies: a first rule group under the condition „Zapas poniżej” of sticks, before the first
    finished exploration, passed over for the next rule group, and the first rule group staying in
    the program with its program rules
  - violates: a program rule of such a rule group carried out because the group's condition holds;
    the simulation refusing a program that holds such a rule group
- **Origin:** none

*Rationale:* a condition outside the repertoire is one the character cannot use yet, so it steers
nothing, as a program rule outside the repertoire acts on nothing; kept in the program, the rule
group acts once the repertoire holds its condition. Accepted with it: a rule group that does not act
stands in the program with no sign of why.
*Rejected:* the rule group's condition taken as holding — a condition the character cannot use would
steer what it carries out; the simulation refusing the whole program — a program carried to another
character or another archetype would stop whole.

### D-128 — Where does what reveals an action, an item, a condition or a creature stand?

What reveals each action, item, condition and creature of the game stands in the data files beside that
action, item, condition or creature, as one of the kinds of revealing event the simulation handles, such as
the first chill, the first gathered piece of an item or an attack naming its creature, and a condition the Understanding holds from
the start of a new game has none there. An action, an item, a condition or a creature revealed by a kind of
revealing event the simulation already handles is added, or what reveals it is changed, by a change
of data alone.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-18 · derives from D-118
- **Verification:** an agent compares a change with the decision:
  - complies: „Zasil — ognisko” revealed by the first finished „Zapal” through a field of its own
    entry in the data of the actions, which the simulation reads; a condition revealed by the first
    gathered stick added as an entry of the data of the conditions, with no change of the
    simulation's code
  - violates: a list in the simulation's code naming „Eksploruj” and „Wędruj” as what the first
    chill reveals; a condition revealed by the first crafted campfire that takes a change of the
    simulation's code to be revealed
- **Origin:** odkrywanie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Settlements to record, row O9, column "What the cycle would otherwise guess"

*Rationale:* what reveals a thing stands with the thing, so an action, an item, a condition or a creature is
defined and revealed in one place, and a later discovery of a kind already handled adds data, not
code, as the game's content does. A kind of revealing event the simulation does not handle yet takes
a change of its code where it reads the event.
*Rejected:* the whole chain of revelations in a table of its own, apart from the actions, items, conditions and creatures — a thing would be defined in one place and revealed in another; the chain written into
the simulation's code — each later discovery would take a change of code.

### D-129 — How long does the pace the player picks stay?

The pace the player picks stays until the player picks another, through a pause, the pause at a
discovery included, „Restart”, „Zakończ” and the next send of a character, and a new game starts at
1×.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** derives from D-21
- **Verification:** an agent compares a change with the decision:
  - complies: „Restart” after a death at 16× going on at 16×; a character sent after „Zakończ” of a
    map run at 4× moving at 4×; the first map run of a new game passing at 1×
  - violates: „Restart”, „Zakończ” or a new send bringing the pace back to 1×; a stop at a
    discovery changing the pace
- **Origin:** rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "4. Co dzieje się z wybranym tempem przy pauzie, „Restart”, „Zakończ” i kolejnym wysłaniu postaci?" · odkrywanie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "3. Jak czas gry staje przy odkryciu i co wtedy widzi gracz?"

*Rationale:* the pace is the player's setting of how fast a map run passes, kept from one attempt to
the next until the player changes it, and a stop at a discovery is the same pause as „Pauza”, so
whatever treats a pause treats both the same. Accepted with it: a player who ended a map run at 16×
starts the next one at 16× and can miss its start; with the browser tab hidden, a mage sent then
passes the whole of Las unseen in half a real minute.
*Rejected:* each map run, a map run restart included, starting again at 1× — the player would pick
the pace anew for each attempt.

### D-130 — Where does the player pick the pace, and with which control?

The player picks the pace with five buttons „1×”, „2×”, „4×”, „8×” and „16×” beside „Pauza” in the
status row of the map run, and the button of the pace in force is a button selected in its group.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-21 · derives from D-44
- **Verification:** an agent compares a change with the decision:
  - complies: „4×” shown selected among the five buttons beside „Pauza” while the map run passes at
    4×, each button made with the shared button selected in its group
  - violates: a select list of paces; a pace button that creates and styles a `<button>` of its
    own; the pace in force marked in a way no shared control holds
- **Origin:** rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "3. Jakie tempa przewijania gracz wybiera i gdzie stoi przełącznik tempa?"

*Rationale:* the pace stands where the player watches the map run, beside „Pauza”, the other
control of its time, and the button selected in its group marks the pace in force with a shared
control the browser view already holds.
*Rejected:* a pace control standing apart from „Pauza”, or one built from a control of its own —
the controls of a map run's time would stand in two places, or the browser view would gain a
control the shared controls do not hold.

### D-131 — Which changes of the program a map run carries out reset its solving progress?

Of the edits of the copy a map run carries out, an edit after which the copy's rules or rule groups differ from those before it, the discard of the copy's unsaved changes included, sets
the streak and the number of beaten attacks of the map run in progress to zero — adding, deleting or reordering a program rule,
changing its condition or action, and changing a rule group — also while the map run is paused; an
act of the program editor after which the copy is the same as before it, an edit or discard changing the trip plan alone, a save of the copy and an edit of a saved program leave the streak as it
stands, together with the number of beaten attacks. Every switch of the character to another program sets the streak and the number of beaten attacks of the map run to zero, also where that program holds the same rules. A map run starts with zero beaten attacks, and a game minute with health lost to cold or hunger leaves their count as it stands.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** derives from D-136 · derives from D-164
- **Verification:** invariants: streak-program-change · saved-program-edit · copy-save · trip-plan-progress. An agent compares a change with the decision:
  - complies: „↑” on the first program rule leaving a streak of 120 at 120; a program rule's action
    changed in a pause setting the streak to 0 while the character's action in progress goes on; a
    rule group renamed setting the streak to 0; „Porzuć zmiany” after a rule was added to the copy
    setting the streak to 0; „Zapisz w programie” leaving a streak of 120 at 120; „Program 2” edited
    during a map run on the copy of „Program” leaving the streak; a switch to a program of the same
    rules setting the streak and the beaten attacks to 0
  - violates: „↑” on the first program rule setting the streak to 0; a program rule deleted in a
    pause leaving the streak as it stood; „Zapisz jako nowy program” setting the streak to 0; a
    switch leaving the beaten attacks as they stood
- **Origin:** rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "9. Która zmiana programu zeruje passę — także czynność edytora, po której program jest taki sam jak przed nią?" · koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D16 · programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q10. Czy gracz może w trakcie przejścia przełączyć postać na inny program?" and "Q15. Czy „Zapisz w programie” i „Zapisz jako nowy program” zostawiają passę i kopię bez zmian?"

*Rationale:* a map checks whether a program survives on its own, not whether the player keeps
fixing it, so changed rules or rule groups start the streak again, in a pause as well; an act that leaves
the program as it was changes nothing the map checks. A switch brings another program, which the map
checks anew, also where it holds the same rules. A save moves the copy's content into a program and
changes nothing the map run carries out, and a saved program reaches a map run at a next entry or a
switch. Accepted with it: a player who presses „↑” on
the first program rule keeps the streak, though the player touched the program; the same program has to supply the beaten attacks and the streak, which can lengthen the attempt after an edit.
*Rejected:* every act of the program editor setting the streak to zero, an act that leaves the
program the same included, as the predecessor game, loop, did — the player would lose the streak for
an act that changes nothing; keeping beaten attacks through a changed program — different programs would supply the two kinds of progress; clearing beaten attacks after cold or hunger — the streak already accounts for those losses; „Zapisz jako nowy program” setting the streak to zero as a switch does — a fix saved under a new name would cost the progress on the map.

### D-132 — What does the screen show, and what can the player do, after a completion?

After a completion the screen stays on the state of the game minute of the completion and time
stands still, and the status row reads, in Las, „Minuta {game minute} · Las rozwiązany”, such as
„Minuta 480 · Las rozwiązany”, and in Las — głębiej „Minuta {game minute} · Las — głębiej rozwiązany”, in the role `positive`. „Pauza” and the pace buttons are gone, and the
player has „Restart” and „Zakończ” as after a character's death.

- **Scope:** browser-view, simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: after a completion in game minute 480 of Las the status row reads „Minuta 480 · Las
    rozwiązany” in `positive`, „Pauza” and the pace buttons are gone, the game minute stays at 480,
    „Restart” starts game minute zero on the same seed, and „Zakończ” returns to the headquarters
  - violates: the game going back to the headquarters with a message the moment the map run
    completes; „Pauza” or a pace button standing after a completion; the text of the completion
    written in a role other than `positive`
- **Origin:** rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "6. Co widzi i co może zrobić gracz po domknięciu przejścia?"

*Rationale:* both ends of a map run behave alike: the player sees the state of the game minute in
which the program met the map's condition, can repeat the same seed with „Restart” and returns with
„Zakończ”. The role `positive` says that something works, which a completion shows of the program.
*Rejected:* going back to the headquarters with a message at the completion — the player would lose
the state of the map run that solved the map.

### D-133 — Where does the player see a map run's streak and a map's solving condition?

During a map run the status row shows progress for the requirements present in the map's solving condition beside the game minute and the character's activity: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present, as „Minuta 312 · Eksploruje · Passa 120/540 · Pokonane napaści 1/2”. The headquarters shows by each available map the sentence of its solving condition from the map's data, as „Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu” or „Las — głębiej — 540 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz dwie pokonane napaści wilka”.

- **Scope:** browser-view, simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a paused map run reading „Minuta 312 · Eksploruje · Passa 120/480 (pauza)”; the
    sentence of Las standing by the map in the row of each character in the headquarters
  - violates: a progress bar in place of „Passa 120/480”; a streak target shown for a map that asks for beaten attacks alone; the sentence of the condition written in
    the code of the headquarters
- **Origin:** rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "5. Gdzie i w jakiej postaci gracz widzi passę i warunek rozwiązania Lasu?" and "16. Gdzie w wierszu stanu stoi dopisek „ (pauza)”, gdy wiersz pokazuje też passę?"

*Rationale:* the player sees during a map run how far the program has come towards the map's
condition, and in the headquarters what each map asks before sending a character. Accepted with it:
a longer status row, and a new text in each map's data.
*Rejected:* a progress bar, or the streak with no number of the condition beside it — the player
would not read how many game minutes the condition still asks for.

### D-134 — Where does the player see that a map is solved?

From the first completion of a map by any of the player's characters, the headquarters shows by
that map „Mapa: {map} · rozwiązana”, such as „Mapa: Las · rozwiązana”, in the role `positive`.

- **Scope:** browser-view, simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: after the first completion of Las, the row of each character naming Las reading
    „Mapa: Las · rozwiązana” in `positive`, also after a later map run on Las ends in death
  - violates: the mark shown on the screen after the completion and missing from the headquarters;
    the mark gone once a later map run on Las ends in death
- **Origin:** rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "7. Gdzie gracz widzi, że Las jest rozwiązany?"

*Rationale:* a solved map stays solved, so the player sees in the headquarters, from which
characters go out, which maps a program has solved.
*Rejected:* the solving seen at the moment of the completion alone — the player would not see later
which maps are solved.

### D-135 — Does the game show the longest streak of a map run?

The game does not show today the longest streak that a map run has reached, during the map run or
after its end.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: the screen after a death of cold reading „Minuta 312 · Mag zamarzł”, with no streak
  - violates: the screen after a death showing the longest streak the map run reached
- **Origin:** rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "5. Gdzie i w jakiej postaci gracz widzi passę i warunek rozwiązania Lasu?"

*Rationale:* the streak a map's solving condition counts is the one the status row shows. Accepted
with it: at a death of cold or hunger the streak stands at zero, so the screen after death does not
tell how near the map run came to its map's condition.
*Rejected:* the longest streak of a map run kept, as the predecessor game, loop, kept it, and shown
on the screen after death.

### D-136 — How is a map solved, and what opens the next one?

The condition that solves a map stands in the map's data — a streak, a number of attacks beaten,
alone or together — and a map opens when the map its data names as its opener is solved. A streak
counts the successive game minutes in which the character loses no health to cold or hunger: a game
minute with such a loss sets it to zero, wounds taken in combat do not, and every change of the
program rules or rule groups the map run carries out, and every switch of the character to another
program, sets it to zero, on every map, while a change of the trip plan alone leaves it.

- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: streak-program-change · trip-plan-progress. For the condition in the map's data and the
  rest of the streak, an agent compares a change with the decision:
  - complies: Las — głębiej asking for a streak and two beaten attacks, written in its data
  - violates: a solving condition coded in the engine for one map; a game minute in which the
    character is chilled growing the streak; a game minute in which the character is starving
    leaving the streak as it stood; a streak broken by a wolf's bite; a switch of the character to
    another program leaving the streak as it stood
- **Origin:** a part of the approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How is a map solved, and what opens the next one?" · koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D16 and D17

*Rationale:* a map checks whether a program survives on its own, not whether the player keeps fixing
it, so a change of the program's rules or rule groups starts the streak again. Wounds from combat do not break it: a
program is to handle an attack, not avoid it. The condition differs from map to map, so it lives in
the map's data, and so does the map that opens it.
*Rejected:* survival counted from the start of the map run — rewards patching on the go; items in
the backpack at completion as a kind of solving condition while no map asks for it — code and tests
of a kind the game does not use, a kind that can come with a map that needs it.

### D-137 — How does the operator block and unblock a player account?

The operator blocks and unblocks a player account, named by its email address normalized as at login, with a command run in the `loop2` container, which reports that the account was blocked or unblocked, that it was already in the state asked for, or that no account has that address, and which changes nothing when it refuses. Blocking marks the account blocked, deletes every session of the account and stops every emailed link of the account in one transaction; unblocking clears the account's blocked mark and restores no session and no link. The `loop2-deploy` skill describes the command, and only a human runs it on the server.

- **Scope:** account-server, deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-12 · derives from D-99
- **Verification:** invariants: blocked-account-access · player-server-session · unblock-restores-no-session · unblock-restores-no-link. An agent compares a change with the decision:
  - complies: the owner runs `docker exec loop2 node dist/server/account-block.js block <email>` and the account's sessions in every browser end with the block, while the running server keeps serving
  - violates: an HTTP route of the account server that blocks accounts; a skill instruction in which an agent runs the command through the `mikrus` MCP server; unblocking that makes the sessions or the emailed links ended by the block valid again
- **Origin:** blokada_konta_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, questions 1 and 2, and § Settlements to record, row 1; potwierdzenie_adresu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 10, and § Settlements to record, row K10

*Rationale:* the owner already reaches the server through SSH, so a command in the container adds no new way into the server, and it reports its outcome where the owner typed it. Blocking is possible only from the server's terminal, with no view in the browser, the player's address stays in the server's shell history, and the command opens the database beside the running server, waiting at most the bounded busy timeout for its write. Deleting the sessions and stopping the emailed links at the block, as logout deletes one session, leaves nothing that unblocking could bring back.
*Rejected:* an owner panel in the browser with an owner role — a new route inside the trust boundary to defend; changing the database file by hand with an SQLite tool — skips the normalization of the address, the deletion of the sessions and the schema check; a block that cannot be undone — the operator could not take back a mistaken block; marking the sessions invalid instead of deleting them — every read and renewal has to check the mark, and unblocking must never clear it; an operator-only HTTP route reached from inside the container — has to prove that the tunnel cannot reach it, and needs a secret or an address check; a signal or a file the running server watches — a new channel into the server with no outcome to report.

### D-138 — How is a player's login kept between requests?

The browser holds an opaque, random session identifier in a host-scoped, Secure and HttpOnly cookie. The account server keeps the session record in SQLite, checks it on authenticated requests and can invalidate it on logout or account blocking.

- **Scope:** account-server, browser-view
- **Based on:** OWASP Session Management Cheat Sheet, session identifiers, server-side expiry and invalidation (https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html, read 2026-10-04) · MDN Set-Cookie, Secure and HttpOnly attributes and host scope (https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie, read 2026-10-04) · OWASP JSON Web Token Cheat Sheet, token revocation trade-off (https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet.html, read 2026-10-04)
- **Relations:** none
- **Verification:** invariants: player-opaque-session-cookie · player-server-session
- **Origin:** the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How is a player's login kept between requests?"

*Rationale:* the existing account database can hold a small server-side session record. The server can end access immediately after logout or account blocking, without maintaining a token denylist. This adds database lookups and cleanup of expired records. A signed token would avoid session records, but immediate account blocking would still require checking server state or a denylist.
*Rejected:* self-contained signed session tokens — their revocation adds state or a delay before a blocked account loses access; session secrets in browser storage or URLs — expose them to client code or URL leakage.

### D-139 — What does the login of a blocked account tell the player?

A login of a blocked account with the correct password is refused with „To konto jest zablokowane.”, status 403 and the code `account-blocked`, and no session, while a wrong password of a blocked account gets the login message of D-100. That refusal is neither a failed nor a successful login for the attempt limits of D-102: it adds no failure and clears none, and an address locked by failures refuses it as it refuses every login.

- **Scope:** account-server, browser-view
- **Based on:** none
- **Relations:** derives from D-137
- **Verification:** invariants: blocked-account-access. An agent compares a change with the decision:
  - complies: the login route checks the password through the gate first and settles a blocked account's correct password by releasing its admission, answering 403 `account-blocked`
  - violates: the blocked message for an address whose password was not checked or was wrong; a blocked login counted as a failure, so that five of them lock the address
- **Origin:** blokada_konta_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 4, and § Settlements to record, row 3

*Rationale:* a player who knows the password learns why the game stays closed, while someone who knows only the address learns nothing more than from any wrong password, so the block is no clue for an address alone. The refusal is no guess of credentials, so it does not count towards a lock, and no sign-in, so it clears nothing; someone who knows a blocked account's password may repeat the attempt unslowed by the limits, each attempt still passing the bounded password gate. A new refusal code changes the server and the browser's client together.
*Rejected:* the login message of D-100 for a blocked account too — the blocked player does not learn why; the blocked message for the address alone, before the password is checked — tells anyone who knows an address that its account is blocked; counting the refusal as a failed login — after five tries with the correct password the address locks and the player sees the limit's message, and people behind the same client address lose failures of their budget; counting it as a success — clears the address's failures on a refused login, so wrong guesses mixed with the correct password never lock it; status 401 — the status this API gives to missing credentials or session.

### D-140 — How does combat go?

Combat goes in turns, the sides exchanging one action each, and the side that attacked strikes
first; the needs stand still during combat, and the whole combat costs a fixed number of game
minutes. Combat verbs can be carried out only in combat, and only they can be carried out in it. A
creature acts by pairs of condition and action kept in its data, of the same form as program rules,
and an attack interrupts the action under way, which is lost.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-23
- **Verification:** invariants: action-in-progress. An agent compares a change with the decision:
  - complies: a new creature added to data together with its pairs of condition and action
  - violates: a wolf's behaviour written as a branch of the engine; a turn of combat costing game minutes of its own; eating during combat
- **Origin:** the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does combat go?" · koncepcja_projektowa.md there, D18 and D53

*Rationale:* a fixed cost keeps a long fight from eating half a day and mixing into hunger and cold.
A creature's behaviour can be read, so the player writes a counter to it: combat is the reading of
another's behaviour, not the guessing of rolls. With combat verbs bound to combat, a rule group of
combat stays silent outside it. The attacker striking first gives a branch that grants the first
strike something to do.
*Rejected:* combat in game minutes — a fight would last half a day and spoil the needs; a finer tick
of the simulation — gives the program nothing new to choose and multiplies the work; the first strike
always to the character — branches granting it would give nothing.

### D-141 — When do combat turns take effect?

An encounter is scheduled for five game minutes after its attack minute M, with its turns resolved together in M+5 using the program as it stands then, unless the map run completes earlier as D-71 gives, and the player reads their record afterwards. During M+1 through M+5 the needs, automatic health recovery and nature energy stand still, burning and resource renewal continue and the streak grows; the turns change health in M+5. Editing the program during the encounter leaves its resolution minute, attack generator and cooldown intact, and resets solving progress as D-131 gives.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-140 · derives from D-131
- **Verification:** an agent compares a change with the decision:
  - complies: an attack in minute 200 resolving its turns in minute 205 with the program edited during the pause
  - violates: an attack resolving before its discovery pause or automatic recovery raising health during its waiting minutes; a well-fed mage's nature energy rising during those minutes
- **Origin:** plomyk_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q3. Czy energia natury wraca w minutach walki?"

*Rationale:* The player has time to write combat rules after the first attack reveals them, while the game minute remains the unit of time; the cost is reading the actions afterwards instead of watching them unfold. Nature energy stands with the needs, so the encounter's minutes leave the body and the energy as they were; the game has no spell of combat today.
*Rejected:* turns paced by real time — introduces finer simulation time; resolving in the attack minute — the first encounter resolves before the player can write combat rules; nature energy coming back in the encounter's minutes while the mage is well fed.

### D-142 — When can a creature attack a map run?

An attack uses the per-game-minute chance and cooldown in its map's data, with the cooldown counted from the start of the map run and from the end of each encounter; for Las — głębiej the chance is 0.01 and the cooldown protects the full 180 minutes after either point, so the first eligible minute is 181 or E+181 after an encounter ending in E. Each eligible ordinary game minute tries its attack after the ending action's effect and the completion check, including a minute inside a longer action; an action still running is lost on an attack, while a finished action keeps its effect. The attack generator is a separate stream seeded by the map run, advanced by the eligible trials, with cooldown, active combat, death and completion leaving it as it stands, so two continuing runs on one seed meet their first attack in the same minute.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-22 · derives from D-24 · derives from D-140
- **Verification:** an agent compares a change with the decision:
  - complies: a trial in minute 181 and E+181, after a gathering finishing in that minute gives its item
  - violates: a trial in minute 180, during combat or in a minute ending in completion
- **Origin:** none

*Rationale:* Independent trials make a difference of programs a difference of behaviour rather than luck; the full cooldown makes its boundary explicit, at the cost of delaying the next chance until the following minute.
*Rejected:* trials at action ends — action length changes the first encounter; a stream shared with walking or gathering — those choices shift attacks; a trial on the last protected minute — shortens the protected interval; attack before an ending action — loses its earned effect.

### D-143 — What does the first wolf attack reveal?

The first wolf attack brings the wolf, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Zdrowie poniżej” and „Przeciwnik ma poniżej” into the Understanding, with the game paused after the attack minute and before the first combat turn. The discovery leaves writing combat rules to the player; the game currently adds no rule at this attack, and later attacks of an already known creature leave time running unless the minute discovers something else.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-118 · derives from D-128 · derives from D-141
- **Verification:** an agent compares a change with the decision:
  - complies: the first wolf opening the combat actions and health conditions while the player can edit in the pause
  - violates: the attack writing „Zawsze → Uderz — patyk” into the program
- **Origin:** none

*Rationale:* The encounter teaches the player what its counter can use; keeping the program theirs accepts that resuming with no combat rule can kill the character.
*Rejected:* adding a combat rule automatically — changes the program on the player’s behalf and resets progress; revealing the health conditions at another occasion — separates the counter from the encounter that needs it.

### D-144 — What actions does a character use in combat?

The character currently uses „Uderz — patyk”, which requires a stick in the backpack and deals a base 6 damage increased by its bought branch ranks, „Kopnij”, which deals a base 3 damage increased by its bought branch ranks and needs neither an item nor a target, and „Odskocz”, which sets one pending reduction of a base 5 damage increased by its bought branch ranks for the next damaging enemy strike. Another dodge refreshes that reduction, the strike consumes it with damage floored at zero, a creature’s dodge leaves it pending, and the encounter’s end clears it. The wolf has 24 health and a strike of 7 damage, follows „Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz”, and its dodge gives up its action with no protection.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-140
- **Verification:** an agent compares a change with the decision:
  - complies: repeated dodges leaving one reduction, and a wolf below 8 health choosing its dodge
  - violates: a wolf dodge consuming the character’s protection or protecting the wolf from the next strike
- **Origin:** wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q8 and the accepted branch data

*Rationale:* A held weapon, a fallback kick and a dodge give a program different responses; a single pending reduction describes the next strike rather than a store of protection.
*Rejected:* stacking dodges — adds a protection resource beyond the next strike; another initial balance — departs from the accepted predecessor numbers, whose different weapon and healing behaviour can make the present balance harsh.

### D-145 — How do weapon wear and wound dressing work today?

A stick currently stays in the backpack after a strike, with its condition unchanged, and the game currently has no action for dressing wounds.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-144
- **Verification:** an agent compares a change with the decision:
  - complies: successive strikes keeping the same stick available
  - violates: a strike consuming or breaking its stick while this decision stands
- **Origin:** none

*Rationale:* The current combat uses the accepted damage values with a reusable stick and natural recovery outside combat; this costs a different balance from one with breakage and healing.
*Rejected:* importing weapon breakage or wound dressing together with combat — adds behaviour outside the accepted scope.

### D-146 — What ends an encounter?

The encounter ends immediately when either side reaches zero health: a creature at zero makes a beaten attack, and a character at zero dies of combat in the minute of the turns, before it can answer a lethal strike. The current data limits an encounter to 40 combat turns, each an exchange with at most one action of each side; if both survive that limit the creature leaves and the attack remains unbeaten. A character that finds no feasible combat rule gives up its action of that turn; every resolved encounter starts the cooldown again, and combat wounds leave the streak as it stands.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-140 · derives from D-61 · derives from D-136
- **Verification:** an agent compares a change with the decision:
  - complies: a lethal first strike stopping the exchange before the character acts, or two surviving sides parting after 40 exchanges
  - violates: a departed creature counted as a beaten attack or a dead character answering its killer
- **Origin:** none

*Rationale:* Immediate death makes the recorded result reflect the actions actually survived, and a limit ends a duel in which neither side can finish the other; the limit does not save a helpless character from lethal strikes.
*Rejected:* an unlimited exchange — two dodging sides can hold the encounter forever; counting the sides’ actions together as the limit — halves the accepted number of exchanges.

### D-147 — What record of an encounter does the player read?

From an attack the map run keeps its last encounter’s facts and shows a wrapping paragraph in `text`, below any discovery line and above the body and backpack: before the turns it gives the creature’s starting health and program formatted from its action pairs, and after them it gives each action and its outcome in order, followed by the encounter’s result. The line stands through „Wznów”, editing and the frozen death or completion screen until another attack replaces it or „Restart” or „Zakończ” removes its map run; a completion before the turns keeps the attack description and leaves the outcome absent. The status activity is „Walczy z wilkiem” throughout the combat minutes, including the resolution minute even if the next ordinary action starts there, while death or completion takes precedence and combat death reads „Minuta {minute} · Mag zginął w walce”.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-04 · derives from D-40 · derives from D-122 · derives from D-141
- **Verification:** an agent compares a change with the decision:
  - complies: „Napada wilk (24/24). Wilk: Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz.” before turns, and „Wilk gryzie: −7 · Mag uderza patykiem: wilk 18/24 · … · Wilk pokonany.” after them
  - violates: a completion before the turns displaying an invented victory, defeat or departure
- **Origin:** none

*Rationale:* The player can read the opponent and the reason for the result, even after death; keeping facts lets the view show what happened under the program then in force, at the cost of space for a long paragraph.
*Rejected:* replaying combat to draw its record — a changed program could change the account; hiding it on death — removes the evidence of defeat; putting it above discovery — moves the explanation of the pause.

### D-148 — Where is an attacking creature pictured today?

An attacking creature currently appears in the encounter’s text, and the terrain drawing currently has no picture of it.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-147
- **Verification:** an agent compares a change with the decision:
  - complies: the wolf named in the encounter line while the terrain keeps its current tiles and character
  - violates: a wolf icon added to the character’s tile while this decision stands
- **Origin:** none

*Rationale:* The text supplies the behaviour and result the player needs to write a counter; the terrain stays a picture of its existing contents.
*Rejected:* adding the wolf to the terrain drawing — adds a visual feature outside the accepted presentation.

### D-149 — When does the headquarters offer a map opened by another map?

A map whose opening map is still unsolved is currently absent from the headquarters, and from the opening map’s first completion each character has „Mapa: {map}”, „Wyślij” and its solving-condition sentence beside that map. The same availability determined from the game’s solved maps governs sending in the simulation, and a map that requires an unsolved opening map refuses a send.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-136 · derives from D-53
- **Verification:** an agent compares a change with the decision:
  - complies: solving Las opening Las — głębiej for every character
  - violates: the simulation sending to Las — głębiej before Las is solved
- **Origin:** none

*Rationale:* A shared availability check makes the visible offer and the simulation’s permission agree; the player learns of the next map on returning to headquarters.
*Rejected:* showing the locked map with an inactive send — reveals it before opening; a new-map message on completion — adds another announcement; filtering in the view alone — allows sending to an unavailable map through the simulation.

### D-150 — Which character skills open the current combat actions?

„Uderz — patyk” grows „Walka bronią jednoręczną”, „Kopnij” grows „Kopanie”, and „Odskocz” grows „Unik przed ciosem”, all present among the elemental mage’s predispositions.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-120 · derives from D-144
- **Verification:** an agent compares a change with the decision:
  - complies: the mage’s repertoire admitting the discovered combat actions through its three combat skills
  - violates: „Kopnij” treated as an action that grows no skill
- **Origin:** none

*Rationale:* Combat actions belong to skills like other learned actions, so predispositions govern their availability.
*Rejected:* making the combat actions skill-free — opens them to every archetype rather than through its predispositions.

### D-151 — Whose health do combat conditions compare?

The condition „Zdrowie poniżej” compares the acting side’s current health points, and „Przeciwnik ma poniżej” compares its opponent’s current health points, with strict less-than comparison; both offer 0–100 in steps of 1, with defaults 50 and 10 respectively. A side chooses its rule immediately before its action, with the creature using its ordered data pairs and the character using the ordered groups and repertoire of its program. Outside combat the own-health condition still reads the character’s health and the opponent-health condition is false, while ordinary world conditions keep their meaning in combat.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-23 · derives from D-119 · derives from D-140
- **Verification:** an agent compares a change with the decision:
  - complies: a wolf at 6/24 satisfying its own threshold 8, with the character choosing after the wolf’s action
  - violates: the wolf’s own-health condition reading the character’s health or 25 percent
- **Origin:** none

*Rationale:* One meaning for a shared condition lets each side read its own situation; health points keep the wolf’s threshold tied to its wounds, and the explicit actor context costs careful handling.
*Rejected:* a separate language of creature conditions — duplicates rule meanings; percentages — changes the accepted wolf threshold; a full player program for a creature — adds groups and player knowledge to its ordered pairs.

### D-152 — How does a player sign in and reset a forgotten password?

Players register and sign in with an email address and password. They can start playing before confirming the email address; a confirmation message establishes that address.

- **Scope:** account-server, browser-view
- **Based on:** OWASP Authentication Cheat Sheet, password authentication (https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html, read 2026-10-04) · OWASP Email Validation and Verification Cheat Sheet, establishing control of an address (https://cheatsheetseries.owasp.org/cheatsheets/Email_Validation_and_Verification_Cheat_Sheet.html, read 2026-10-04) · W3C Web Authentication Level 3 (https://www.w3.org/TR/webauthn-3/, read 2026-10-04) · OpenID Connect Core 1.0 (https://openid.net/specs/openid-connect-core-1_0.html, read 2026-10-04)
- **Relations:** none
- **Verification:** invariants: player-password-login · email-verification-nonblocking.
- **Origin:** the projected entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does a player sign in and reset a forgotten password?"; this entry holds what that entry says of email confirmation, and what it says of password reset — the confirmed address serving account recovery and the single-use reset link sent to it — enters with password reset

*Rationale:* a player can enter without waiting for a message, and a confirmed address is one whose control the player has shown. The account server must store password hashes, protect registration and login from abuse, and send email for confirmation.
*Rejected:* email code at every login — depends on message delivery every time; WebAuthn passkeys — add key enrolment and loss recovery while the game's final domain is unsettled; external OpenID Connect — adds a login provider and account linking to its identity.

### D-153 — Which service delivers account emails?

The account server sends email confirmation messages from an address under `mariusznazar.com` through the authenticated SMTP service of Mikrus Outsider available to the existing Mikrus account.

- **Scope:** account-server, deployment
- **Based on:** mikrus-outsider-mail · Mikrus Outsider mail setup, DKIM and DMARC (https://wiki.mikr.us/outsider/mail/, read 2026-10-04) · Cloudflare DNS record types, separate web and mail records (https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/, read 2026-10-04) · Resend domain verification and SMTP service (https://resend.com/docs/add-a-domain, read 2026-10-04; https://resend.com/docs/send-with-smtp, read 2026-10-04) · Brevo sender domain and Free-plan branding (https://help.brevo.com/hc/en-us/articles/208836149-Create-a-new-sender-From-name-and-From-email, read 2026-10-04; https://help.brevo.com/hc/en-us/articles/208580669-FAQs-What-are-the-limits-of-the-Free-plan, read 2026-10-04) · Cloudflare Email Sending pricing for arbitrary recipients (https://developers.cloudflare.com/email-service/platform/pricing/, read 2026-10-04)
- **Relations:** derives from D-152
- **Verification:** invariants: account-email-via-outsider.
- **Origin:** the projected entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "Which service delivers account emails?"; this entry holds its first sentence for email confirmation messages, and password-reset messages and the real delivery test before public self-service account recovery is enabled enter with password reset

*Rationale:* Mariusz can use Outsider with his existing Mikrus account and owns `mariusznazar.com`; this keeps the game with the domain and provider he already has. Outsider still requires a mailbox, mail DNS records, credentials and monitoring. The website's DNS records do not need to be moved for mail-only use. Acceptance by an SMTP relay does not establish that an account holder can receive the link needed to recover access.
*Rejected:* Resend or Brevo with the same domain — each adds a separate provider account to maintain, and Brevo Free brands the messages; Cloudflare Email Sending — adds a paid sending service for arbitrary recipients; no email delivery — would leave self-service password reset unusable.

### D-154 — How does the account server send email through Outsider?

The account server composes and sends email confirmation messages through Mikrus Outsider SMTP with Nodemailer 10. The SMTP connection must upgrade to TLS; sending fails when STARTTLS cannot be established.

- **Scope:** account-server, build-tools
- **Based on:** nodemailer-require-tls · Nodemailer documentation for the current 10 line, SMTP transport, `requireTLS` and `verify()` (https://nodemailer.com/, read 2026-10-04; https://nodemailer.com/smtp, read 2026-10-04) · published Nodemailer 10.0.14 manifest, built-in TypeScript types, Node support and no runtime dependencies (https://registry.npmjs.org/nodemailer/10.0.14, read 2026-10-04) · public npm download record for Nodemailer (https://api.npmjs.org/downloads/point/last-week/nodemailer, read 2026-10-04) · emailjs 5.0.3 documented client API and STARTTLS configuration (https://github.com/eleith/emailjs/blob/v5.0.3/README.md, read 2026-10-04) · emailjs 5.0.3 STARTTLS error-handling source (https://github.com/eleith/emailjs/blob/v5.0.3/src/connection.ts, read 2026-10-04) · Mikrus Outsider SMTP port 587 (https://wiki.mikr.us/outsider/, read 2026-10-04)
- **Relations:** derives from D-153 · derives from D-01
- **Verification:** invariants: account-email-nodemailer-starttls.
- **Origin:** the projected entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does the account server send email through Outsider?"; this entry holds what that entry says of email confirmation messages, and password-reset messages enter with password reset

*Rationale:* Nodemailer supplies a typed SMTP client and message composition in the same Node.js process, without another service. Its documented `requireTLS` setting refuses to send when a STARTTLS upgrade is unavailable. The package and its configuration must be maintained; SMTP credentials stay outside the definition. `verify()` can check connectivity and authentication, but only a real message test can establish that the sender is accepted and mail reaches an inbox.
*Rejected:* `emailjs` 5 — also a typed SMTP client, but its documentation does not state an equally clear failure rule for a refused STARTTLS upgrade; its implementation suggests a possible error-handling gap that would need separate testing, not a proven Outsider failure; own SMTP code on Node sockets — adds protocol, message-format and TLS handling to this project; `smtp-connection` 4.0.2 — lacks explicit types and current versioned documentation.

### D-155 — How long and how often does an emailed link work?

A link of an email confirmation message works for 24 hours and a link of a password-reset message for one hour from the moment it is recorded, and each works once. Recording a new link for an account, which comes before its message is handed to the mail service, stops in the same transaction every earlier link of the same kind for that account, so a message whose sending then fails leaves no earlier link working.

- **Scope:** account-server
- **Based on:** https://raw.githubusercontent.com/OWASP/CheatSheetSeries/995524d4a18e64672c80c8e13869d29ef850bd43/cheatsheets/Email_Validation_and_Verification_Cheat_Sheet.md § Email Ownership Verification, Recommendations — "Single-use" · "Time-limited"; read 2026-10-29 · https://raw.githubusercontent.com/OWASP/CheatSheetSeries/995524d4a18e64672c80c8e13869d29ef850bd43/cheatsheets/Forgot_Password_Cheat_Sheet.md § Introduction — "Single use and expire after an appropriate period."; read 2026-10-29
- **Relations:** derives from D-152
- **Verification:** invariants: email-confirmation-link. An agent compares a change with the decision:
  - complies: a resend leaves only its own link of the account working, whether its sending succeeds or fails
  - violates: a confirmation link that confirms twice, or still confirms 24 hours after it was recorded; a password-reset link that works longer than one hour; earlier links stopped only after the mail service has accepted the new message
- **Origin:** potwierdzenie_adresu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 1, and § Settlements to record, row K1

*Rationale:* a link that works once and for a bounded time limits what an intercepted or forgotten message can do, and only the newest message's link works, so the player knows which one to open. Stopping the earlier links in the transaction that records the new one leaves no moment, a database fault included, in which an earlier link outlives a newer one; a sending that fails leaves no working link, and the player asks for the message again. Whoever opens an older message after a newer one was sent sees that its link no longer works and opens the newest, and whoever does not read the mail within a day asks for the message again.
*Rejected:* stopping the earlier links only once the mail service has accepted the new message — a database fault after the acceptance leaves the earlier links working beside the new one, and a failed sending is the only case it spares; earlier links working beside the newest one — several live links per account and kind.

### D-156 — How does an emailed link confirm a player's email address?

The link of a confirmation message is the configured public origin followed by `/#confirm-email=<token>`, its token 32 random bytes written in base64url, of which the account database keeps only the SHA-256 digest. The game page the link opens sends the token to the account server in a request meeting D-104, also without a session, and shows „Potwierdzanie adresu…” in `text-secondary`, then „Adres e-mail potwierdzony.” in `positive`, „Odnośnik jest nieważny albo wygasł.” in `warning`, or, when the request gets neither answer, the account client's sentence of its failure in `warning` with the token kept in the page's address for a reload, above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on. The server gives one and the same refusal to every token that is malformed, unknown, used, expired, of another kind or of a blocked account, and a confirmation stops every other confirmation link of the account.

- **Scope:** account-server, browser-view
- **Based on:** uri-fragment-in-requests · samesite-strict-cookie · https://raw.githubusercontent.com/OWASP/CheatSheetSeries/995524d4a18e64672c80c8e13869d29ef850bd43/cheatsheets/Email_Validation_and_Verification_Cheat_Sheet.md § Logging and Monitoring, Recommendations — "Never log verification, reset, or authentication tokens or full verification/reset URLs"; read 2026-10-29
- **Relations:** derives from D-152 · derives from D-104
- **Verification:** invariants: email-confirmation-link. An agent compares a change with the decision:
  - complies: the page reads the token from the fragment of its address, sends it in the JSON body of a `POST` and removes the fragment once the server's answer is definitive
  - violates: a link carrying its token in its path or query; a token kept in clear in the database or written to a log; an address confirmed by the request that opens the link
- **Origin:** potwierdzenie_adresu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 2, and § Settlements to record, row K2

*Rationale:* the page confirms with a request of its own, so a mail client or a spam filter that opens a link by itself uses up nothing, and the link works in any browser because it needs no session. A navigation from a mail service on another site brings no session cookie, but the page's own requests do, so a signed-in player sees the result above the game. A fragment reaches no server, no request log and no `Referer`, a digest in the database yields no working link to whoever reads it, and one refusal for every bad token tells nothing about which it was. The start of the game page gains one more state.
*Rejected:* confirming by the request that opens the link — needs an exception to D-104, and mail clients and spam filters that open links by themselves would use up the single-use link; the token in a query parameter or a path — reaches the request logs of the edge and the server, and a path outside the public files is not served; the token kept in clear — a read of the database yields working links; a salted or slow hash — needless for 256 random bits.

### D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message?

A signed-in player whose email address is unconfirmed sees on every screen, in the header on a line under the title and „Wyloguj”, „Adres e-mail niepotwierdzony.” in `text-secondary` and the shared button „Wyślij ponownie”, and both are gone once the address is confirmed. Only a signed-in player asks for another confirmation message, and it goes only to the address of that player's own account. Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending: „Wysłaliśmy odnośnik potwierdzający na <adres>.” in `text-secondary` when the message was sent, „Za dużo wiadomości. Spróbuj ponownie za godzinę.” above a limit of D-105, „Nie udało się wysłać wiadomości. Spróbuj ponownie później.” when the sending failed and the account client's sentence of its failure when the request for a message fails for another reason than an address already confirmed, the last three in `warning`, each beside „Wyślij ponownie”.

- **Scope:** browser-view, account-server
- **Based on:** none
- **Relations:** derives from D-152 · derives from D-105
- **Verification:** an agent compares a change with the decision:
  - complies: the answer to a registration carries the outcome of its sending, and the header row starts with that outcome's sentence
  - violates: a field of the request for another message that names an address or an account; „Wysłaliśmy odnośnik potwierdzający na <adres>.” after a sending that failed
- **Origin:** potwierdzenie_adresu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, questions 3 and 8, and § Settlements to record, row K3

*Rationale:* the player learns where the message went and can ask for it again without help, and a limit or a failure is said instead of a message that never comes. The row stands in the header on every screen until the address is confirmed, and the answer to a registration waits for the outcome of its sending, so entering the headquarters takes a few seconds more while the mail service answers slowly. The sentence after a sending notes what happened while the address is still unconfirmed, so it reads as a note rather than as something in order.
*Rejected:* „Wysłaliśmy odnośnik potwierdzający na <adres>.” after every registration, also when the sending failed — the player reads that a message went when it did not; no sentence about the sending — changes the sentence settled for right after registration; the sending in the background with the browser asking for its outcome — adds a state, a route and a loop of requests for a wait of a few seconds; `positive` for „Wysłaliśmy odnośnik potwierdzający na <adres>.” — reads as done while the address is unconfirmed.

### D-158 — From whom does the email confirmation message come, and what does it say?

The email confirmation message comes from `loop2@mariusznazar.com` with the display name „loop2”, as plain text without HTML, with the subject „Potwierdź adres e-mail w loop2” and a body of three paragraphs separated by an empty line: „Ktoś — zapewne Ty — założył konto w loop2 na ten adres e-mail. Aby go potwierdzić, otwórz odnośnik:” with the link alone on the next line, „Odnośnik jest ważny przez 24 godziny i działa raz.” and „Jeśli to nie Ty, zignoruj tę wiadomość.”.

- **Scope:** account-server, deployment
- **Based on:** none
- **Relations:** derives from D-153 · derives from D-155
- **Verification:** an agent compares a change with the decision:
  - complies: a message composed for one recipient with the fixed sender, display name and subject and a text body with the link on a line of its own
  - violates: an HTML body beside the text; the recipient's address written into a header other than the recipient's
- **Origin:** potwierdzenie_adresu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 4, and § Settlements to record, row K5

*Rationale:* the message says who sent it, why it came and what to do if it was not asked for, and the replies of players reach the sender's mailbox, which is worth looking through now and then.
*Rejected:* the sentence „Potwierdzony adres pozwala samodzielnie zresetować zapomniane hasło.” — promises a password reset the game does not yet offer.

### D-159 — Can an account's email address change?

An account's email address is the address given at its registration, and no operation of loop2 changes it, so the confirmation of an account's address is the confirmation of that one address.

- **Scope:** account-server, browser-view
- **Based on:** none
- **Relations:** derives from D-99
- **Verification:** an agent compares a change with the decision:
  - complies: the limit of D-105 for one address counted per account; a confirmation kept on the account without the address it confirmed
  - violates: a route or a command that gives an existing account another address
- **Origin:** potwierdzenie_adresu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Settlements to record, row K9

*Rationale:* a confirmation and a count of messages kept for the account stay true of its address because the address does not change.
*Rejected:* tying a confirmation to the address it confirmed against a change of address — guards against an operation loop2 does not have.

### D-160 — What does an emailed link of a blocked account do?

An emailed link of a blocked account, of an email confirmation or of a password-reset message, changes nothing and leaves the account as it is, and a player who opens such a confirmation link sees „Odnośnik jest nieważny albo wygasł.” in `warning`. A link that a block stopped stays stopped after the account is unblocked, and the player, signed in again, asks for a new confirmation message with „Wyślij ponownie”.

- **Scope:** account-server, browser-view
- **Based on:** none
- **Relations:** derives from D-137
- **Verification:** invariants: email-confirmation-link · unblock-restores-no-link.
- **Origin:** potwierdzenie_adresu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 10, and § Settlements to record, row K10

*Rationale:* a block stops what the account can do through its links as it stops its sessions, and unblocking brings back neither. A blocked player learns from a link only that it does not work, and learns why at the next sign-in.
*Rejected:* a link that works whatever the block — a blocked account changes state despite the block, and a password-reset link would set a new password; a link that does not work during the block but works again after unblocking while unexpired — unlike the sessions, and a reset link intercepted before the block works right after the unblock.

### D-161 — How does the account server count account messages against the limits of D-105?

Every account message the account server sends or attempts counts against the limits of D-105 from the moment it is recorded in the account database, before it is handed to the mail service, whatever the outcome of its sending. The count survives a restart or deployment of the server, and the limit of three for one address is counted for the account, whose address does not change (D-159).

- **Scope:** account-server
- **Based on:** none
- **Relations:** derives from D-105 · derives from D-159
- **Verification:** invariants: account-message-limits.
- **Origin:** none

*Rationale:* a message handed to the mail service may have been delivered even when its answer is a failure or never comes, and D-105 says at most; counting in the database keeps the hourly limits true across a deployment within the hour. A player whose three sendings failed waits up to an hour, and the count reads at most a day of messages.
*Rejected:* counters in process memory like the attempt limits of D-103 — a restart or deployment within the hour clears them and lets up to 30 more messages through; a separate record of counters — a second record of what the recorded links already hold; counting only messages the mail service accepted — a lost answer goes uncounted, and a player could ask a failing mail service again without bound.

### D-162 — Which file is the exemplar for mail sending?

The exemplar for kind `mail-sending` is `src/server/account-mail.ts`, and its kind guidelines are read before adding or changing a mail-sending file. Mail sending composes account messages and submits each to the mail service, independently of HTTP and the database, within a bounded time, and reports a failure as its result rather than as an error thrown to its caller, writing no credential, token, link or message to a log.

- **Scope:** account-server
- **Based on:** none
- **Relations:** derives from D-28 · derives from D-154
- **Verification:** an agent compares a change with the decision:
  - complies: mail-sending guidelines identify the first implementation as exemplar, and a route reads the mailer's result instead of catching its errors
  - violates: a message composed in a route handler; a mailer that logs the mail service's reply or the message
- **Origin:** none

*Rationale:* one file that owns composing and submitting keeps the safety of message headers, TLS and the handling of secrets in one place, and the routes read a result instead of SMTP errors.
*Rejected:* composing the message in the route — mixes the order of an HTTP request's work with the text of the message and the safety of its headers; a module per concern, composer and transport — two files for about one screen of code, each showing half of the kind.

### D-163 — How is the code that talks to Mikrus Outsider's SMTP service tested?

Mikrus Outsider's SMTP service has no contract test, and no test reaches it: mail-sending code is tested as an integration test against a real SMTP server run on the loopback interface, and routes that send mail are tested with a stand-in mailer whose chosen outcomes prove the routes' reactions and not the sending. The agreement with Outsider is checked by a human who sends a message from the deployed container to an external inbox when the way messages are submitted to Outsider changes.

- **Scope:** account-server, build-tools
- **Based on:** none
- **Relations:** narrows D-73 · derives from D-84
- **Verification:** an agent compares a change with the decision:
  - complies: the STARTTLS case of the mailer against an SMTP server the test starts on port 0 of the loopback interface; a route test whose stand-in mailer never answers
  - violates: a test that connects to `outsider.mikr.us`; a route test that takes what the stand-in mailer recorded as proof that a message was delivered
- **Origin:** potwierdzenie_adresu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), To do, item 13

*Rationale:* a test against the real Outsider needs the SMTP password outside the server, the network and a share of the monthly allowance of messages, and its result changes with the service rather than with the code, while a real SMTP server on loopback exercises the same protocol, STARTTLS and authentication included. Only a delivery from the deployed container shows that Outsider accepts the sender and that mail reaches an inbox.
*Rejected:* a contract test against the real Outsider, as the adopted template asks for a foreign service — takes the credential outside the server against D-13 and gives a result that depends on the service; a recorded transcript of Outsider's replies — a controlled response proves nothing of the service it replaces and drifts from it.

### D-164 — Who owns a program?

Programs belong to the player, as one list shared by all characters; a character picks a program when it enters a map — by default the one it used last — and a manual map run carries out a copy taken at its start, except that a map run restart carries on the copy of the map run it replaces as it is, its unsaved changes included, and that during a manual map run the player can switch the character to another program, the map run going on with a fresh copy of that program. A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program; saving a copy over a program that changed since the copy was taken from it or last saved into it is announced, never blocked. A program can be edited at any time, and its saved change takes effect at the next manual map entry other than a map run restart or at the next switch to it during a manual map run.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: saved-program-edit · copy-save. An agent compares a change with the decision:
  - complies: „Restart” after a death carrying on the copy with the unsaved fix the player made in it; a character switched to another program in the middle of a manual map run, the map run going on with the same seed on a fresh copy of that program
  - violates: a program stored as a field of the character; saving a program that rewrites the copies of characters already out; a save over a changed program refused; „Restart” taking a fresh copy of the program and dropping the copy's unsaved fix
- **Origin:** a part of the approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "Who owns a program?" · koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D39

*Rationale:* a saved program serves every character. A program carried out live would reset the streaks of characters in an earning loop and move them in the middle of a map run at every fix; locking a program that has copies would close exactly the programs in use, since copies live for hours. Programs are the player's work, not the character's. A fix made after a death and tried by a restart on the same seed is the basic rhythm of tuning a program, so a restart keeps the copy with its unsaved fix; a switch to another program lets the player try another program on the same seed without ending the map run.
*Rejected:* programs held by the character — a saved program has to serve all characters; one program carried out live without a copy; locking the editing of a program that has copies; a restart taking a fresh copy of the program — a fix made in the copy after a death is lost, or has to be saved into the program before every try on the same seed; a restart refused while the copy holds unsaved changes — one more step before every restart with a fix; another program only by ending the map run — another program cannot be tried on the same seed.

### D-165 — How does the game state tell one program from another?

Each program of the player carries a number the game gives it when the program is created, one more than the number the game state gave last, so the numbers of two programs of one game differ, a deleted program's number included. Each record of the game state that names a program — the program the copy of a map run belongs to, the program a character used last, the program picked on a character's row of the headquarters, the program with which a character last entered a map and the program the firing counts stand beside after „Zakończ” — names it by that number.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-164
- **Verification:** an agent compares a change with the decision:
  - complies: „Program 2” renamed „Las nocą” and „Program” deleted, the copy's program, the program its character used last and a row's pick still naming program 2; a program created after program 3 was deleted taking the number 4
  - violates: a record naming a program by its name or by its place on the list; a number given again to a program created after a deletion
- **Origin:** none

*Rationale:* a rename changes no record that names a program, and a deleted program's number comes to mean no other program, so a record left naming it finds no program. The name a copy keeps once its program is deleted stands in the copy's heading and names no program. Counting up keeps the number out of the simulation's randomness, as it does for characters (D-56). A later change of how programs are told apart would touch every record naming one and, once the game state is saved, saved games.
*Rejected:* the name — a rename would cut every record naming the program, and names are compared regardless of letter case; the place on the list — a deletion before a program shifts it; a number drawn at random — every random draw of the simulation comes from the generators of a map run.

### D-166 — Where does the player see the player's programs and pick the one to edit?

The program panel holds at its top the select list „Program: {name}” with every program of the player, and the program editor below it shows the program picked there. During a map run the list holds „Kopia w przejściu” at its top and the player's saved programs below it.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-164
- **Verification:** an agent compares a change with the decision:
  - complies: a new game's panel showing „Program: Program” above the editor of the program „Program”; during a map run the list reading „Kopia w przejściu”, „Program”, „Program 2”, and „Program 2” picked there showing that program in the editor
  - violates: a section of the headquarters or a screen of its own listing the programs; a list during a map run on which the copy stands below the saved programs
- **Origin:** programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q1. Gdzie gracz widzi listę swoich programów i jak wybiera, który program edytuje?" and "Q6. Czy w trakcie przejścia gracz może edytować zapisane programy, także ten, z którego wzięto kopię, i w jakiej postaci gra ogłasza zapis kopii nad programem zmienionym od startu przejścia?"

*Rationale:* the programs stand where the player edits them, in the panel that stands beside the headquarters and beside the map run, and one list reaches both the copy and the saved programs, the copy first as what the map run carries out.
*Rejected:* a section of the headquarters or a screen of its own for the programs — the programs would stand apart from the editor that edits them.

### D-167 — What can the player do with the list of programs?

The list of programs offers „Nowy program”, „Zmień nazwę” and „Usuń”, and a new program holds one empty rule group named „Program”, whose condition is „Zawsze”. A program left alone on the list stays there, „Usuń” leaving it in place. The game has today no action that duplicates a program.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-164 · derives from D-91
- **Verification:** an agent compares a change with the decision:
  - complies: „Nowy program” adding „Program 2” with the empty rule group „Program” under „Zawsze”; „Usuń” inactive while the list holds one program
  - violates: a new program holding no rule group; the one program of the list deleted; a button that duplicates a program
- **Origin:** programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q2. Jakie czynności na liście programów daje to zadanie — nowy program, zmiana nazwy, usunięcie, duplikat?"

*Rationale:* a new program starts as a new game's program does, with a place for its first rule (D-91). A list that keeps one program at least leaves the editor a program to show and a character a program to enter a map with. A variant of a program comes through the copy, saved as a new program.
*Rejected:* a new program with no rule group, as in loop — the player would create a group before writing its first rule; deleting the last program — the list would hold no program to edit or to enter a map with; a duplicate of a program — a variant comes through the copy saved as a new program.

### D-168 — What becomes of a map run whose copy's program the player deletes?

Deleting the program the copy of the map run belongs to leaves the map run going on with the copy, whose heading keeps the name the program had. „Zapisz w programie” and „Porzuć zmiany” are then gone, and the copy counts as holding unsaved changes: the line „Niezapisane zmiany w kopii.” stands and „Zapisz jako nowy program” is active until the copy is saved as a new program.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-164
- **Verification:** an agent compares a change with the decision:
  - complies: „Program 2” deleted during a map run on its copy, the map run going on from the same game minute with „Zapisz jako nowy program” as the one save left; a copy with no edit of its own whose program „Program 2” is deleted standing under „Kopia: Program 2” with „Niezapisane zmiany w kopii.” and „Zapisz jako nowy program” active
  - violates: the deletion ending the map run; „Usuń” refused for the program of a running copy; „Zapisz w programie” standing with no program to save into; „Zapisz jako nowy program” inactive after the deletion of the copy's program; the heading left with no name after the deletion
- **Origin:** programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q2. Jakie czynności na liście programów daje to zadanie — nowy program, zmiana nazwy, usunięcie, duplikat?"

*Rationale:* the copy belongs to the map run, so the map run goes on with it, and a save as a new program keeps the player's work in it, while a save into the program and a discard have no program left to refer to. Once its program is gone, no program of the list holds the copy's content, so the copy counts as unsaved and the one save left can keep it; the heading keeps the name by which the player knew the program.
*Rejected:* the deletion ending the map run — an act on the list would end the attempt; „Usuń” refused for the program of a running copy — the player would end the map run before deleting; the two buttons left standing — they would have nothing to do; the copy measured against the deleted program's content — a copy with no edit of its own would leave „Zapisz jako nowy program” inactive, and the copy would be lost at „Zakończ”.

### D-169 — How is a program named?

The program of a new game is named „Program”, and a new program „Program 2”, „Program 3” and on, by the first free number. A program's name is the typed text trimmed of the white space at its start and end, and it is not empty; the game takes no name another program bears, comparing names regardless of letter case, and sets today no limit to a name's length.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-164
- **Verification:** an agent compares a change with the decision:
  - complies: „ Las nocą ” typed for a rename naming the program „Las nocą”; „program 2” refused while „Program 2” stands on the list, with the message under the name field in `warning`; „Program 3” given to a new program while „Program” and „Program 2” stand
  - violates: two programs named „Program 2” on the list; a name of spaces alone taken; a name cut at a length
- **Origin:** programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q3. Jak nazywa się program nowej gry i nowy program, czy dwa programy mogą nosić tę samą nazwę i czy nazwa ma limit długości?"

*Rationale:* the player tells programs apart by their names on the select lists of the program panel and of the headquarters, and two names that differ in letter case alone read there as one. Accepted with it: the first program „Program” holds the rule group „Program”, so the panel shows the same word twice.
*Rejected:* names that may repeat, as characters' names may (D-52) — two positions of one select list would read the same; a limit to a name's length, which loop has — nothing in the game asks for one.

### D-170 — Where does the player pick the program a character enters a map with, and which one stands there first?

The player picks the program a character enters a map with on the select list „Program: {name}” in that character's row of the headquarters, beside „Mapa: …” and „Wyślij”, one list for each row whatever the number of maps. The list shows the first program still on the player's list of these: the program picked on that row before the character is sent, which stays with the character until it is sent; the program that character used last, the program it was switched to during a map run included; the program with which any character last entered a map; the first program of the player's list.

- **Scope:** browser-view · simulation
- **Based on:** none
- **Relations:** derives from D-164 · derives from D-53
- **Verification:** an agent compares a change with the decision:
  - complies: a character that entered Las with „Program 2” showing „Program: Program 2” in its row afterwards; a character switched to „Program 3” during its map run showing „Program 3”; a new character showing the program the last character sent entered with; „Program 3” picked on a row and kept through the creation of another character until that character is sent; „Program 2” deleted while it is a character's program used last, its row showing the program with which a character last entered a map
  - violates: a select list of programs for each map of a row; a new character showing the first program of the list after another character entered a map with „Program 2”; a pick on a row lost when the team's rows are drawn again
- **Origin:** programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q4. Gdzie gracz wybiera program przy wysłaniu postaci i który program jest domyślny dla postaci, która jeszcze nie chodziła?" and "Q13. Który program jest domyślny przy następnym wysłaniu postaci, która w trakcie przejścia została przełączona na inny program?"

*Rationale:* the player picks the program where the character is sent from, and the program that stands first keeps a character with the program it went with last, so a send repeats the last attempt unless the player picks another; a character that has not gone yet takes the program the team went with last.
*Rejected:* a step after „Wyślij” for picking the program — one more move at every send; a list for each map of a row — the same pick repeated once for each map.

### D-171 — How does the program panel show the copy and its unsaved changes?

During a map run the program panel shows the copy under the heading „Kopia: {program name}”. While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive; a copy whose program is gone shows as D-168 gives. „Zapisz jako nowy program” offers the first free name of a program, and after that save the copy belongs to the new program, which becomes the program the character used last.

- **Scope:** browser-view · simulation
- **Based on:** none
- **Relations:** derives from D-164 · derives from D-39
- **Verification:** invariants: copy-save. An agent compares a change with the decision:
  - complies: a program rule added to the copy showing „Niezapisane zmiany w kopii.” in `warning` under „Kopia: Program”, with the three buttons active; „Zapisz jako nowy program” offering „Program 2”, after which the heading reads „Kopia: Program 2” and the character's row in the headquarters shows „Program 2”
  - violates: the three buttons active while the copy is the same as its program; the copy still belonging to „Program” after it was saved as „Program 2”
- **Origin:** programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q5. Co panel programu pokazuje w trakcie przejścia, jak gracz widzi niezapisane zmiany kopii, gdzie stoją „Zapisz w programie”, „Zapisz jako nowy program” i „Porzuć zmiany” i co dzieje się po zapisie jako nowy program?"

*Rationale:* the player sees during a map run what the map run carries out and whether it holds work not yet saved, and the buttons act where there is something to save or to discard. After a save as a new program the copy belongs to the program that holds its content, so the next save and the next discard refer to that program.
*Rejected:* the three buttons active whatever the copy holds — a save or a discard that does nothing; the copy kept with its former program after a save as a new program — the next save would overwrite the program the player kept apart.

### D-172 — How does the game announce a save of the copy over a program that changed?

While the program the copy belongs to holds changes made since the copy was taken from it or last saved into it, a line in the role `warning` beside the save buttons reads „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.”; „Zapisz w programie” then saves at once, in one click, and after the save the line is gone.

- **Scope:** browser-view · simulation
- **Based on:** none
- **Relations:** derives from D-164 · derives from D-39
- **Verification:** an agent compares a change with the decision:
  - complies: „Program” edited during a map run on its copy, the line standing beside the save buttons, and „Zapisz w programie” saving at the first click with the line gone
  - violates: a window asking to confirm the save; the save refused while the program holds such changes; the line still standing after the save
- **Origin:** programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q6. Czy w trakcie przejścia gracz może edytować zapisane programy, także ten, z którego wzięto kopię, i w jakiej postaci gra ogłasza zapis kopii nad programem zmienionym od startu przejścia?" and "Q14. Jak brzmi linia, którą gra ogłasza zapis kopii nad programem, który zmienił się od wzięcia z niego kopii albo od ostatniego zapisu kopii w nim?"

*Rationale:* the player can edit a program during a map run, so a save of the copy can replace changes the copy lacks; the line says so before the save, and the save stays one click, as D-164 announces such a save and blocks none. The line names what the save replaces, which holds after „Restart” and after a switch as well. Accepted with it: a longer text, which does not say when the program changed.
*Rejected:* a window asking to confirm the save — one more click at every such save; a message after the save — the changes are gone before the player reads it; the line „Program {nazwa} zmienił się od startu przejścia — zapis w programie zastąpi te zmiany.” — after „Restart” and after a switch it would name the wrong moment.

### D-173 — What can the player do with the copy after a map run ends?

On the screens after a character's death and after a completion, editing the copy, „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” act as during the map run until the player picks „Restart” or „Zakończ”. „Zakończ” ends the map run at once, and the copy's unsaved changes go with it; after „Zakończ” the program panel shows the program the copy belongs to.

- **Scope:** browser-view · simulation
- **Based on:** none
- **Relations:** derives from D-164
- **Verification:** an agent compares a change with the decision:
  - complies: a fix made in the copy after a death and saved into „Program” with „Zapisz w programie” before „Zakończ”; „Zakończ” with unsaved changes returning to the headquarters at once, „Program” standing in the panel as it was saved
  - violates: the save buttons gone after a completion; „Zakończ” asking whether to save the copy; the copy's unsaved changes reaching the program at „Zakończ”
- **Origin:** programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q9. Czy po śmierci postaci i po domknięciu gracz może jeszcze zapisać albo porzucić zmiany kopii, co z niezapisanymi zmianami robi „Zakończ” i przy których regułach zostają po nim liczniki przejścia (D-93)?"

*Rationale:* the screens after an end show the state that explains it, which is where the player finds the fix, so the copy stays open to editing and saving until the player leaves it. Accepted with it: unsaved changes are lost in one click of „Zakończ”, which the line „Niezapisane zmiany w kopii.” announces before it.
*Rejected:* the copy closed to saving once the map run ends — a fix found after a death would be made anew in the program; „Zakończ” asking about unsaved changes — one more click at every end of a map run holding them.

### D-174 — How does the player switch the character to another program during a map run?

During a map run, picking a saved program on the program panel's list opens it for editing, and while the panel shows a saved program other than the program the copy belongs to, the button „Przełącz postać na ten program” stands under the list; its click switches the character to that program at once, and the panel shows „Kopia w przejściu” again. Beside the program the copy belongs to, the button is gone.

- **Scope:** browser-view · simulation
- **Based on:** none
- **Relations:** derives from D-164
- **Verification:** an agent compares a change with the decision:
  - complies: „Program 2” picked during a map run on the copy of „Program”, the button standing under the list, and its click going on from the same game minute with a fresh copy of „Program 2”, the panel showing „Kopia w przejściu”; after „Zapisz jako nowy program” as „Program 2”, the button standing beside „Program” and gone beside „Program 2”
  - violates: a pick on the panel's list switching the character; the button standing beside the program the copy belongs to; a question about the copy's unsaved changes before the switch; the button standing on the screen after a death
- **Origin:** programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q10. Czy gracz może w trakcie przejścia przełączyć postać na inny program?", "Q12. Jak gracz przełącza postać na inny program w trakcie przejścia, skoro lista wyboru panelu wybiera w trakcie przejścia program do edycji (Q6)?" and "Q17. Po „Zapisz jako nowy program” przycisk „Przełącz postać na ten program” nie stoi przy nowym programie (do którego należy kopia), a stoi przy programie, z którego kopię wzięto na starcie — tak?"

*Rationale:* the panel's list opens programs for editing during a map run, so the switch is an act of its own, standing beside the program it switches to. A save as a new program is no switch, so the button stands beside the program the copy was taken from and is gone beside the program the copy now belongs to. Accepted with it: two moves, a pick on the list and the button, and one button more in the panel.
*Rejected:* the panel's list switching the character, as in loop — the list would stop opening a program for editing during a map run; the button standing beside every saved program other than the one the copy was taken from — after a save as a new program it would stand beside the program the copy belongs to, and its click would set the streak to zero though that save is no switch.

### D-175 — What does a mage pay for spells with?

Each spell costs the mage nature energy, which comes back by itself only while the mage is well fed;
empty nature energy closes the spells and takes no health. A character without nature energy has no
spells and pays nothing for them.

- **Scope:** simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a hungry mage whose nature energy stops coming back, spells closing before health falls
  - violates: a spell that lowers satiety; nature energy at zero taking health
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D52 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What does a mage pay for spells with?"

*Rationale:* a need hurts when it runs out; nature energy only closes the spells, so it is no third
need. Satiety stays an indirect price: a mage's program keeps eating higher than another's, and a
mage who eats too little loses the spells first and only then, like anyone, health.
*Rejected:* satiety as the price of spells — every spell would bring hunger nearer, and a mage
casting spells would be a mage dying.

### D-176 — With how much nature energy does a mage start a map run?

A mage starts every map run, a new one and one started by „Restart”, with its nature energy at the
cap.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-175
- **Verification:** an agent compares a change with the decision:
  - complies: a mage whose map run ended in death with 20 nature energy starting with 100 both the
    map run „Restart” starts and the next map run it is sent on
  - violates: nature energy carried from one map run into the next; „Restart” keeping the nature
    energy of the game minute of death
- **Origin:** plomyk_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q2. Jakie liczby ma energia natury: pułap, start przejścia, cena Płomyka, tempo powrotu, próg „dobrze najedzony” i chwila jego porównania, czy czar wymaga energii co najmniej równej cenie, zakres i wartość domyślna warunku „Energia natury poniżej”?"

*Rationale:* nature energy belongs to the map run, as the body does, so every map run starts from
the same state, and a „Restart” repeats its map run from game minute zero on the same seed, the
energy included (D-62).
*Rejected:* other numbers, or other answers to the points of the question, given point by point.

### D-177 — What does too little nature energy do to Płomyk?

A mage carries out Płomyk while its nature energy reaches the spell's price; with less, the program
passes over a program rule with „Zapal — ognisko” or „Zapal — patyk” and picks a later one, as for
any action of the character not feasible then, and the rule stays in the program.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-23 · derives from D-175
- **Verification:** invariants: nature-energy-range. An agent compares a change with the decision:
  - complies: a program rule „Zapal — patyk” passed over with 5 nature energy at a price of 10, and
    the next program rule carried out; „Zapal — ognisko” carried out with 10 nature energy at a
    price of 10
  - violates: Płomyk carried out with less nature energy than its price; a program rule of Płomyk
    taken out of the program for want of nature energy
- **Origin:** plomyk_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q2. Jakie liczby ma energia natury: pułap, start przejścia, cena Płomyka, tempo powrotu, próg „dobrze najedzony” i chwila jego porównania, czy czar wymaga energii co najmniej równej cenie, zakres i wartość domyślna warunku „Energia natury poniżej”?"

*Rationale:* a spell the mage cannot pay for is no action of the character to carry out then, so the
program moves on to a program rule that does something, as with a full backpack (D-65), and the
rule acts again once the energy has come back. Energy equal to the price is enough, so a mage can
spend its energy down to zero.
*Rejected:* other numbers, or other answers to the points of the question, given point by point.

### D-178 — What does the body row show of a mage's nature energy?

The body row ends with „Energia natury {n}”, the mage's nature energy cut down to a whole number,
from game minute zero, in the role `text` at every value of the energy, zero included.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-125
- **Verification:** an agent compares a change with the decision:
  - complies: „Temperatura 36,9 °C · Sytość 82 % · Zdrowie 100 · Energia natury 90”; „Energia
    natury 0” in the role `text`
  - violates: „Energia natury 0” in the role `danger`; 89.5 nature energy shown as „Energia natury
    90”; the energy left out of the body row until „Energia natury poniżej” is discovered
- **Origin:** plomyk_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q5. Czy i jak wiersz ciała pokazuje energię natury maga?"

*Rationale:* the player reads the energy that opens and closes the spells beside the values of the
body, as the game state holds it (D-125). Empty energy closes the spells and takes no health, so it
threatens no loss of the character and stands in `text` (D-39). Accepted with it: a longer body
row, and a player who sees the energy before discovering the condition on it.
*Rejected:* the body row as it stood, with no nature energy.

### D-179 — How do items go into a map run and out of it?

The trip plan is a field of the program, both its lists are bound at the start of a map run — the list of what comes out as a frozen snapshot — and at a completion only what that list names goes to the chest. Reality cuts the trip plan down and never up: outside a manual map run of a map already solved, what the chest lacks does not go into the backpack, what the backpack lacks does not come back, and where items compete for one budget — the backpack, the map's cap, the free room in the chest — as many go in from the top of the list as fit. The backpack is the cap on both sides, a map may add a stricter cap of its own down to zero, and a trip plan over the map's cap does not keep the character from entering the map: it goes in cut, and the player is told so beforehand.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-50 · derives from D-64 · derives from D-164
- **Verification:** invariants: trip-transfer. An agent compares a change with the decision:
  - complies: an item added to the trip plan during a map run that comes out only from the next map run; a trip plan over the map's cap entering cut, with a notice shown before the start; a character switched to another program in the middle of a map run bringing out at completion what the trip plan of the program it entered with names
  - violates: a backpack filled beyond what the chest held; an item lower on the list taking room before one above it; entering refused for a trip plan over the map's cap
- **Origin:** definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How do items go into a map run and out of it?"

*Rationale:* The frozen snapshot keeps an item added in the last minute from paying out at once, which would get round the streak, since editing the trip plan does not break it.
*Rejected:* a choice made by a click before each start — the earning loop could not carry it out without the player.

### D-180 — Where does the player arrange the trip plan?

The program panel shows a section „Plan wyprawy” below the rule groups, with the lists „Zabierz” and „Wynieś”. Each position holds an item select list, a number field, „↑”, „↓” and „Usuń”, and „Dodaj przedmiot” stands below each list.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-44 · derives from D-166 · derives from D-173 · derives from D-179
- **Verification:** none
- **Origin:** plan_wyprawy_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q2"

*Rationale:* The plan stays with the program the player edits, at the cost of scrolling past a long program.
*Rejected:* the section above the rule groups; the plan in the headquarters character row — the running copy could not be edited there.

### D-181 — Which entries does a trip list accept?

The game currently accepts an item once on each trip list, and the same item can stand on both lists. A position's count is an integer from 1 up, with its upper range currently left to reality's clipping of the plan; an invalid entry keeps the previous count in the position and stays visible in the field, whose frame and message „Wpisz liczbę całkowitą od 1.” below it take the role `warning` until the player enters a valid count.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-119 · derives from D-120 · derives from D-179
- **Verification:** none
- **Origin:** plan_wyprawy_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q3" and "Q11", part a

*Rationale:* The plan expresses desired quantities and the transfer finds what fits; an invalid draft stays visible beside a count the game still holds.
*Rejected:* all game items offered from the start — contradicts discovery; restoring the previous count in the field at once — hides the invalid draft the player entered.

### D-182 — What trip plan does a new program hold?

The program of a new game and a newly created program have both trip lists empty.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-91 · derives from D-167 · derives from D-179
- **Verification:** none
- **Origin:** plan_wyprawy_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q3"

*Rationale:* The first plan belongs to the player, and before an item is discovered the chest is empty as well.
*Rejected:* unknown

### D-183 — What happens to carried items when the player stops a run or completes with items outside its plan?

When „Zakończ” or „Restart” ends a map run before completion, its carried items — brought in and gathered — are lost. At completion, the items outside the frozen bring list are lost.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-179
- **Verification:** invariants: trip-run-end.
- **Origin:** plan_wyprawy_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q6"

*Rationale:* Equipment is spent on an attempt and loot leaves through the plan at completion; stopping the attempt costs its contents.
*Rejected:* unknown

### D-184 — How does the headquarters show the chest's capacity?

The headquarters shows the chest section heading as „Skrzynka {pieces}/{cap}”, such as „Skrzynka 12/60”, and for an empty chest as „Skrzynka 0/60” above „Skrzynka jest pusta.”.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-50
- **Verification:** none
- **Origin:** plan_wyprawy_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q4", part 2

*Rationale:* The shared space is visible where the player prepares the next attempt; the heading changes with its contents.
*Rejected:* the cap kept out of the headquarters — its remaining room would be hidden.

### D-185 — Where does the player read what completion deposited?

After completion the line „Do skrzynki: {item} {count}, …” or „Do skrzynki nic nie trafiło.” in `text-secondary` stands below the discovery line and last-encounter paragraph when present and above the body and backpack, directly below the status row when neither is present, until „Restart” or „Zakończ”.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-122 · derives from D-147 · derives from D-179
- **Verification:** none
- **Origin:** plan_wyprawy_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q8" and "Q12"

*Rationale:* The transfer remains readable with the final state, even when discovery and a long encounter place it further below the status.
*Rejected:* placing it above discovery — changes the established order; placing it under the backpack — changes the accepted placement below the status; showing nothing beyond the earlier screen — leaves the transfer unreported.

### D-186 — What does the running map show of the frozen bring plan?

During a map run, below the backpack, „Wyniesie: {item} {count}, …” in `text-secondary` gives what completion in that game minute would put in the chest from the frozen bring list, clipped by the backpack, free chest room and the map's exit cap. The line stands when the snapshot lists something or differs from the copy's bring list, reads „Wyniesie: nic” when that transfer is empty, and disappears after death and completion.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-179
- **Verification:** none
- **Origin:** plan_wyprawy_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q8", "Q10", part c, and "Q11", parts c–e

*Rationale:* The player sees which plan applies to this attempt, at the cost of another line recomputed each game minute and a different text role beside the practice record.
*Rejected:* a completion line alone — the running snapshot stays hidden; a line hidden for an empty snapshot — an item added during the run looks as though it could leave; a line from minute zero for every empty plan — persistent empty information; keeping the preview after the run ends; the role `text`.

### D-187 — How does a map cap equipment and loot?

A map's data can set two independent whole-piece caps from zero up, one for entry and one for exit, each optionally unset. The entry cap clips the trip plan when the character enters and the exit cap at completion; gathering during the run is currently bounded by the character's carrying capacity, which the map cap currently leaves unchanged.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-18 · derives from D-64 · derives from D-179
- **Verification:** invariants: trip-transfer.
- **Origin:** plan_wyprawy_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q1" and "Q10", part a

*Rationale:* A map can ask for different equipment at entry and loot at exit, while carrying capacity describes the character during the attempt; this keeps two boundaries to check even where current maps leave them unset.
*Rejected:* one cap for both directions — zero at entry would also prevent loot at exit; giving a current map a cap — adds a balance value beyond the accepted definition; removing caps from the definition — reopens readiness and the plan; leaving the definition intact and omitting the mechanism.

### D-188 — Where does the player learn that a map cuts the trip plan?

In the headquarters, at a character's map, „Plan wyprawy wejdzie przycięty: mapa wpuszcza najwyżej {n} sztuk.” in `warning` stands when its entry cap is below the smaller of the take list's requested total in that row's chosen program and the character's carrying capacity. The same line stands in the status row beside „Restart” for the current copy and map; when carrying capacity itself clips the plan and the map does not, this line is currently absent.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-170 · derives from D-179 · derives from D-187
- **Verification:** none
- **Origin:** plan_wyprawy_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q10", part b

*Rationale:* The player can see the cut before either kind of start, at the cost of keeping the same comparison at two places.
*Rejected:* a warning confined to the headquarters — omits the next restart.

### D-189 — Which current runs take equipment and pay loot?

Earned loot reaches the chest on completion. The game currently takes equipment from the chest at each map run's start and deposits according to its frozen bring list at each completion, including a manual map run of an already solved map.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-179
- **Verification:** invariants: trip-transfer · trip-run-end.
- **Origin:** definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What pays, and what takes from the chest?" · plan_wyprawy_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q5", "Q6" and § Settlements to record, row 11

*Rationale:* The current run lifecycle spends equipment and deposits completed loot alike for solved and unsolved maps; repeated manual completions therefore pay too.
*Rejected:* unknown

### D-190 — What does a character's death take?

A character's death takes what it carried, including pieces taken from the chest, and leaves the chest as it stood.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-179
- **Verification:** invariants: trip-run-end.
- **Origin:** definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What does a character's death take?"

*Rationale:* Items carried are at risk on the attempt; items left with the team survive it.
*Rejected:* unknown

### D-191 — How does a character skill grow?

A character skill grows by practice, which counts only its actions that ended in effect, and is never bought. A character skill has one practice counter and one curve, and what is saved of it is its practice and the ranks of branches bought, its level, free points and every effect being computed from these two. Each level gives points that buy ranks of branches of its own tree, at prices that differ from branch to branch, and each next level needs more practice than the one before.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: gathering that adds practice only when an item is gained; a level computed from saved practice
  - violates: a shop selling a level of a character skill; a missed gathering that adds practice; a second counter inside one character skill
- **Origin:** definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does a character skill grow?"

*Rationale:* buying is shallow — one easy map run nearly pays for a character skill, which makes learning a coupon. Practice ties growth to what the program actually does, so choosing a program is choosing what grows. Prices differ between branches, or an extra piece gathered would always beat a percentage of chance. Two counters inside one character skill would quietly speed up the whole economy, so a finer split makes a new character skill.
*Rejected:* buying character skills with experience — shallow; practice counted from attempts instead of effects — rewards program rules that grind an action changing nothing; a separate counter for traits — a second economy to balance where one is enough.

### D-192 — What describes a character?

A character is described by traits, character skills and the predispositions of its archetype. A number that acts in one action only belongs to the tree of that action's character skill, never to a trait.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: carrying capacity as a trait; accuracy with a one-handed weapon as a branch of that weapon's tree
  - violates: a "strength" trait that raises the damage of one weapon
- **Origin:** definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What describes a character?"

*Rationale:* numbers and what a character can say in a program are not alternatives: they are three roles. A trait acts always, so it may be a number without becoming a slider, provided it grows only where the challenge grows with it. A predisposition sets characters apart by access rather than size, so two characters with the same numbers and other predispositions need two different programs, neither better.
*Rejected:* strength as a trait — all it would do is raise carrying capacity, which stands apart; accuracy as a trait of the character — it concerns one class of weapon; speed of learning as a trait — a multiplier on all growth; a trait as a number never raised — safe, but does nothing.

### D-193 — When and how much practice does an action add?

An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles. Eating has its effect when the berry is eaten, even at full satiety; a dodge has its effect when it removes some damage from an enemy strike, counted in the turn of that strike.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-191
- **Verification:** an agent compares a change with the decision:
  - complies: a patrol bringing several pieces and adding one practice; eating a berry at full satiety adding one practice
  - violates: a dodge with no strike adding practice; practice for each tile a scout reveals
- **Origin:** wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q5 and Q9; accepted settlement 1

*Rationale:* The counter measures successful actions, not their quantity. Accepted with it: eating at full satiety can grow eating, at the cost of berries.
*Rejected:* eating adding practice only when satiety rises — the accepted effect is the berry eaten

### D-194 — When does a manual map run pay its practice to its character?

A manual map run holds the practice it gathers separately by character skill and currently pays all of it once to the character making the run in the game minute of every completion, including a completion of an already solved map. A death, or a run cut short by „Restart” or „Zakończ” before completion, currently leaves the character’s practice and bought ranks as they were.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-191
- **Verification:** an agent compares a change with the decision:
  - complies: a second manual completion paying its practice in the completion minute; restart before completion paying nothing
  - violates: practice reaching the character during an unfinished run; „Zakończ” paying a completed run a second time
- **Origin:** wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q1; accepted settlements 2 and 12

*Rationale:* Payment at completion makes the successful run the unit of growth. Accepted with it: manual repeats of solved maps can grow a character.
*Rejected:* only the first solution paying practice here — before earning loops this would leave at most two payments

### D-195 — When does a character skill tree become known?

A character skill tree with all its branches enters the Understanding in the game minute in which the player discovers the first action grown by that skill, together with any action a branch of that tree opens. The discovery line names the tree beside the action, as „Odkryto: Eksploruj, Wędruj, drzewo umiejętności Eksploracja.”, followed by the sentence naming newly discovered conditions when the same game minute reveals one.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-118 · derives from D-122
- **Verification:** an agent compares a change with the decision:
  - complies: the first discovery of gathering also revealing its tree and „Obchód”
  - violates: a tree becoming known only on its first purchase; an unnamed tree in the discovery line
- **Origin:** wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q3 and Q4; accepted settlements 3 and 4

*Rationale:* Discovery tells the player what the action can grow before the first point is earned. Accepted with it: longer discovery lines and known actions that no character can yet carry out.
*Rejected:* revealing a branch action on the first purchase — discovery would depend on a character’s purchase; showing the tree only at the first point; leaving the tree unnamed

### D-196 — Which branch actions does the program editor offer outside a map run?

Outside a map run the program editor currently offers the repertoire computed from the Understanding through the archetype’s predispositions; bought branches currently contribute no actions to that editor's offer. During a map run, both the copy editor and the saved-program editor use the running character’s repertoire, including its bought branches.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-119 · derives from D-164
- **Verification:** an agent compares a change with the decision:
  - complies: „Obchód” offered in both editors during the run of its buyer and absent outside a run
  - violates: a branch bought by any teammate opening that action in the headquarters editor
- **Origin:** wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q3; accepted settlement 4

*Rationale:* A program is shared, while a branch belongs to its buyer. Accepted with it: the headquarters editor cannot add a branch action; editing the copy's rules or rule groups resets progress, whereas editing a saved program prepares the next send.
*Rejected:* offering outside a run every branch any teammate bought — the shared editor would imply availability without choosing its character

### D-197 — What does the gathering branch Obchód do?

The gathering tree has the branch „Obchód”, which opens „Obchód — {zasób}”: a guaranteed batch of the chosen resource from the current tile, up to the amount in the data, the tile’s remaining stock and the backpack’s remaining capacity. „Pełna garść” likewise takes no more pieces than remain on the tile or fit in the backpack.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-119 · derives from D-64
- **Verification:** an agent compares a change with the decision:
  - complies: a patrol taking the six pieces left on its tile when the batch is twelve; a full-hand gather taking the last single piece
  - violates: requiring a full batch before patrol can start; taking missing pieces from neighbouring tiles
- **Origin:** wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q9 and Q13; accepted settlement 5

*Rationale:* A guaranteed batch changes how the program gathers. Accepted with it: the full action time can bring a smaller batch from a depleted tile.
*Rejected:* requiring at least twelve pieces; filling a batch from neighbours; „Pełna garść” creating two pieces from one

### D-198 — What does the exploration branch Zwiad do?

With the bought branch „Zwiad”, exploration reveals the current tile and its neighbours together, while still requiring the current tile to be unrevealed. Items on all tiles revealed in that game minute enter the Understanding together in its discovery pause.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-118 · derives from D-191
- **Verification:** an agent compares a change with the decision:
  - complies: a scout revealing a new neighbour’s item in the same discovery pause
  - violates: scouting from an already revealed current tile; one practice for every neighbour
- **Origin:** wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q9; accepted settlement 5

*Rationale:* Scouting changes the exploration program’s reach. Accepted with it: it can reveal much of the small map quickly.
*Rejected:* only numerical branches, or only a selected subset of the non-numerical branches — omit the accepted changes to how programs work

### D-199 — What does the headquarters show of character skills?

At each character the headquarters currently shows „Umiejętności” after a tree is known, with a row for each known tree giving „{umiejętność} — poziom {p} · wprawa {w}/{próg} · punkty {k}”, or „{umiejętność} — poziom {p} (najwyższy) · wprawa {w} · punkty {k}” after its last threshold; before the first known tree the section is currently absent. Below it each branch gives its name, rank and maximum rank, description from data and a „Kup” button disabled when points are insufficient or all ranks are bought; a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”, while „Obchód”, „Czysty płomień” and „Zwiad” give the price and currently omit numerical before-and-after values. A fully bought branch keeps its present value if numerical and currently omits the next value and price.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-191
- **Verification:** an agent compares a change with the decision:
  - complies: a fully bought numerical branch showing its current value with a disabled „Kup”; the whole section absent before any tree is known
  - violates: „false → true” beside a non-numerical branch; a price for a fully bought branch
- **Origin:** wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q6 and Q11; accepted settlement 8

*Rationale:* The player sees the current effect and the cost and effect of the next purchase where points are spent. Accepted with it: a longer headquarters and no preview of unknown trees.
*Rejected:* no numerical preview; „false → true” for non-numerical branches; „wykupiona” in place of the full-rank row; an empty-section note

### D-200 — Where does the player buy a branch rank, and when does it act?

The player currently buys a branch rank with „Kup” in the headquarters outside a map run, and the rank acts from that character’s next map run. The game currently has no purchase in the map-run view and no undo of a purchase.

- **Scope:** simulation · browser-view
- **Based on:** none
- **Relations:** derives from D-191
- **Verification:** an agent compares a change with the decision:
  - complies: a purchase reducing only its tree’s free points and affecting the buyer’s next send
  - violates: a purchase changing the skills of a retained run, including one ended in death or completion
- **Origin:** wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q6; accepted settlement 9

*Rationale:* Purchases belong beside the character’s skills in the headquarters, and a run keeps the skills with which it starts.
*Rejected:* none

### D-201 — What does the map-run view show of its practice?

Below the body row the map-run view currently shows a line in the role `text`, „Wprawa w tym przejściu: {umiejętność} +{n} · …”, listing the skills with positive practice gathered in that run. Zero-valued skills and the line at zero are currently absent, and the positive line remains after death and completion until „Restart” or „Zakończ”.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-194
- **Verification:** an agent compares a change with the decision:
  - complies: the same positive practice line retained after death, although the run pays nothing
  - violates: zero-valued skills in the line; hiding the line immediately on completion
- **Origin:** wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, Q6 and Q12; accepted settlement 10

*Rationale:* The player can see what the run grows and what it gathered before its end. Accepted with it: the line does not itself distinguish paid practice from practice lost on death.
*Rejected:* no run-practice line; hiding it on death; separate labels for payment and loss

### D-202 — Who can create and use a player account?

Anyone can create a player account and start playing without approval. A signed-in player can read
and change only their own saved game state. The operator can block an account from signing in and
using the game.

- **Scope:** account-server, browser-view
- **Based on:** none
- **Relations:** derives from D-07
- **Verification:** invariants: player-self-registration · player-save-isolation · blocked-account-access.
- **Origin:** the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "Who can create and use a player account?"

*Rationale:* open registration lets players enter without the operator creating or approving each
account. Access to a saved state belongs to its account, and blocking lets the operator stop that
account's access. A blocked person can register a new account; this control does not identify or
exclude a person across accounts. Registration and recovery add work to the account server.
*Rejected:* approving each new account before play — gives stronger control of initial access but
requires the operator to handle every request; operator-created accounts — avoids a public
registration flow but requires manual work and secure delivery for every new player.

### D-203 — What happens to unsaved progress when a session expires?

If a player's session expires while the game runs, the browser keeps the unsaved game state. After
the player signs in again to the same account, the game retries saving that state.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-07 · derives from D-138
- **Verification:** invariants: expired-session-unsaved-progress.
- **Origin:** the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What happens to unsaved progress when a session expires?"

*Rationale:* the browser computes the game between server calls; ending an HTTP session during
play need not erase progress that is still in the browser. Requiring the same account for the
retry preserves each player's saved-state ownership.
*Rejected:* dropping unsaved progress when the session expires — loses play time for an unrelated
login timeout; saving it under a different account — crosses the account ownership boundary.

### D-204 — How does the browser exchange saved game states with the server?

The browser loads and sends whole saved game states through HTTPS request-response endpoints,
using JSON and the browser's `fetch()` API. It loads its account's saved game state with
`GET /api/saved-game`, whose success answers either that saved game state with the version of its
shape and its revision or that the account has none, and replaces it with `PUT /api/saved-game`,
whose body holds the version of the shape, the revision the browser last saw and the game.

- **Scope:** browser-view, account-server
- **Based on:** HTTP Semantics, request and response model (https://www.rfc-editor.org/rfc/rfc9110.html, read 2026-10-04) · JSON data interchange format (https://www.rfc-editor.org/rfc/rfc8259.html, read 2026-10-04) · Fetch Standard, browser request API (https://fetch.spec.whatwg.org/, read 2026-10-04) · GraphQL September 2025 specification, schema and operations (https://spec.graphql.org/September2025/, read 2026-10-04) · WebSocket Protocol, persistent bidirectional connection (https://www.rfc-editor.org/rfc/rfc6455.html, read 2026-10-04)
- **Relations:** derives from D-07 · derives from D-108
- **Verification:** invariants: saved-state-http-exchange. For the public HTTPS endpoint and the
  answer of an account with no saved game state, an agent compares the change with the decision:
  - complies: the browser loads the game and exchanges saved states through an HTTPS address; an
    account with no saved game state answered with a success that says so
  - violates: a deployed game sends saved states to an HTTP address visible to the browser; an
    account with no saved game state answered with 404
- **Origin:** the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How does the browser exchange saved game states with the server?"

*Rationale:* the browser computes the game and only needs to load and submit a whole save.
Request-response exchange covers this without an operation schema or a lasting connection. A later
need for live server messages can be met by reviewing this choice; resolving two browsers'
conflicting saves still requires a separate game rule whichever transport is used, which D-209
gives. An account without a saved game state gets a success of its own, so the browser never takes
a missing route for a missing saved game state.
*Rejected:* GraphQL over HTTPS — adds an operation schema without a current need to select
different pieces of a server-side game model; WebSocket — adds connection recovery and message
acknowledgements without a current need for the server to push live game events; 404 for an account
with no saved game state — an unmatched `/api/` request answers with an API error too (D-05), so a
server without the route would read as no saved game state and the first save of a new game would
overwrite a real one; `POST` for the save — a replacement of the whole saved game state reads as
`PUT`.

### D-205 — Where are player accounts and saved game states stored?

The account and save server stores player accounts and each player's complete saved game state in a
SQLite database file on persistent local storage outside the replaceable application container
layer.

- **Scope:** account-server, deployment
- **Based on:** SQLite documentation, appropriate for an application-specific server and one writer at a time (https://www.sqlite.org/whentouse.html, read 2026-10-04) · SQLite documentation, risks of a database file on a network filesystem (https://www.sqlite.org/useovernet.html, read 2026-10-04) · Docker documentation, volumes persist beyond a container's lifecycle (https://docs.docker.com/engine/storage/volumes/, read 2026-10-04) · PostgreSQL 18 documentation, separate server process (https://www.postgresql.org/docs/18/tutorial-arch.html, read 2026-10-04) · MongoDB documentation, 16 MiB document limit (https://www.mongodb.com/docs/manual/core/document/, read 2026-10-04)
- **Relations:** derives from D-07
- **Verification:** invariants: account-save-sqlite-store · account-save-durable-storage.
- **Origin:** the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "Where are player accounts and saved game states stored?"

*Rationale:* SQLite lets the one account and save server hold accounts and whole saved game states
without operating another database process. The choice accepts SQLite's one-writer limit and the
possibility of migrating data and access code if actual use exposes a problem. The file needs a
durable local place because replacing a container must not erase player accounts or saves.
*Rejected:* PostgreSQL — adds a database server process and its operation before concurrent writes
show a need for it; MongoDB — also adds a server process, while its document model brings no
demonstrated benefit for storing whole saves and has a 16 MiB limit per document; ad hoc JSON
files — lack the database engine's transactions and documented schema constraints.

### D-206 — What happens to a saved game state of another version?

A saved game state carries the version number of its shape, and the game loads whole only a saved
game state whose version is the game's current one. The game discards a saved game state of any
other version in full, including the player's programs, and starts the player anew. A saved game
state whose character names an archetype missing from the data is also discarded whole.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: save-version. For the version written and the missing archetype, an
  agent compares the change with the decision:
  - complies: every saved game state written with the game's current version number; a saved game
    state of another version discarded whole, even when its programs remain compatible
  - violates: a saved game state of another version loading its programs; a saved game state with a
    missing archetype loaded with that archetype replaced by another
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D23 and D46 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What happens to a saved game state of another version?"

*Rationale:* loading a saved game state whose shape the game no longer describes gives faults that
are hard to diagnose. A complete reset gives the MVP one load path and avoids separate compatibility
handling for programs. It costs all the player's progress, including authored programs. An archetype
missing from the game data leaves its character with nothing to act on.
*Rejected:* a saved game state without a version number — an older shape can load silently and cause
faults; keeping programs from a saved game state of another version — protects the player's work but
requires separate compatibility handling, which is outside the MVP.

### D-207 — When does the game save the game state on the server?

The game saves the game state on the server by itself right after each change of it the player
makes — an edit of a program or of the copy, an act on the list of programs, creating a character,
sending one, buying a branch rank, „Restart”, „Zakończ”, a pause and a pace — right after a map run
ends in a completion
or in the character's death, every 30 real seconds while a map run passes, and once more when the
page becomes hidden, closing included, with no guarantee that this last save arrives. The 30-second
rhythm and the hidden page send the game state only where it changed since the save last sent; the
browser has at most one save request in flight, each sent with `keepalive`, and a moment of saving
during one is sent after its answer, unless that request is the save before a logout that goes on
(D-97). A save whose body is larger than 64 KiB is not sent and counts
as refused as too large (D-208).

- **Scope:** browser-view
- **Based on:** visibilitychange-hidden-last-event · fetch-keepalive-body-quota
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: an edit of a program rule followed at once by a save request; „Kup” of a branch rank
    in the headquarters followed at once by a save request; a map run passing at 16×
    saved once every 30 real seconds; a tab hidden in the middle of a map run sending its latest
    game state as a `keepalive` request; a tab that has just loaded a saved game state with its map
    run paused sending nothing until the player acts in it
  - violates: a button „Zapisz” for the game state; a rhythm of saving counted in game minutes; two
    save requests of one tab in flight at once; a save body over 64 KiB sent with `keepalive`
- **Origin:** zapis_stanu_na_serwerze_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 1, and § Settlements to record, row 1

*Rationale:* the player saves nothing by hand, and a closed tab takes at most the last 30 real
seconds of a map run — 30 game minutes at 1×, up to 480 at 16×, a whole map run of Las from the
sending of the character — at the cost of a request every 30 real seconds per player while a map
run passes. The page becoming hidden is the last moment a page reliably observes, and a `keepalive`
request outlives the closing page, but the browser refuses one whose body brings the page's
`keepalive` bodies in flight over 64 KiB, so one save request at a time keeps each within that
quota, and a body over it is never sent; one request at a time also lets each save name the
revision the one before was given (D-209).
*Rejected:* saving only at the player's acts, a completion and a death, with no save while a map run
passes — fewer requests, but closing the tab in the middle of a map run takes it back to the sending
of the character: up to 8 real minutes at 1× (the whole 480 game minutes of Las), up to half a real
minute at 16×; a button „Zapisz” — a player who forgets to click loses everything since the last
click, and a new button with its states; the same moments with a save every 30 game minutes while a
map run passes instead of every 30 real seconds — the same as every 30 real seconds at 1×, but at
16× a request every less than 2 real seconds, 16 saves of about 80 KB together in the half minute of
Las, while closing the tab takes at most 30 game minutes at every pace.

### D-208 — What does the player see of saving the game state?

A save of the game state that succeeds shows nothing. When one fails, the header shows on a line
under the title and „Wyloguj”, above the line of D-157, „Nie udało się zapisać postępu. Gra spróbuje
ponownie.” in `warning`, or, once the save before a logout has failed, the sentence D-97 gives for
that failure, and the game retries the save after 5, 10 and 20 real seconds and then every
30 real seconds, each time with the game state of that moment and at once at a moment of saving of
D-207, until a save succeeds and the sentence goes. When the server refuses a save as larger than
its limit of D-104, the game does not retry that save but tries again at its next moment of saving,
and the same line reads „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne
programy.” in `warning` until a save succeeds.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a save with no answer within its time limit showing „Nie udało się zapisać postępu.
    Gra spróbuje ponownie.” above „Adres e-mail niepotwierdzony.”, and the retry five real seconds
    later clearing it when it succeeds; a too-large refusal followed by no request until the
    player's next act
  - violates: a line „Zapisano o 12:31” after each save; a too-large refusal retried as a failed
    save; a failed save shown nowhere
- **Origin:** zapis_stanu_na_serwerze_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, questions 2 and 18, and § Settlements to record, row 2

*Rationale:* the player is told only when the progress is not being saved, at the cost of not
seeing when it was saved last. A retry that slows down to every 30 real seconds keeps a long outage
from costing a request every few seconds per tab. A save refused as too large fails again until the
game state shrinks, so the game waits for a change instead of retrying, and the progress since the
last successful save is lost at logout or when the tab closes; the programs are the one thing the
player can make smaller, with „Usuń” on the list of programs (D-167), the last program staying, so a
player whose game state grows beyond the programs stays without a save until the limit changes. One
state of the header more.
*Rejected:* a lasting line „Zapisano o 12:31” in `text-secondary` beside the warning — a line that
changes every 30 seconds during a map run, and more text in the header beside the line of D-157;
nothing shown, a failed save included — the player plays on believing the progress saved and loses
it when the tab closes; the too-large refusal counted as a failed save — endless retries, a promise
„Gra spróbuje ponownie.” that is not kept and a „Wyloguj” that does not work, leaving the player
signed in at a shared computer.

### D-209 — Which browser's save of the game state does the server accept?

The server gives each save of the game state it accepts a revision one higher than the one before,
starting at 1, and accepts a save only when it names as its basis the revision of the saved game
state the server holds, or 0 where the account has none, refusing every other. The browser whose
save it refuses so drops its unsaved game state, loads the server's saved game state — a manual map
run that went on coming back paused (D-212) — shows „Gra została zapisana w innej przeglądarce.
Wczytano ten zapis.” in `warning` on the header line of D-208 until its first successful save, and
plays on from the loaded state, saving as D-207 gives.

- **Scope:** browser-view, account-server
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: two tabs of one account, the first saving on revision 4 and getting 5, the second's
    save based on 4 refused, and the second tab then loading revision 5 with its map run paused and
    the sentence in the header
  - violates: a save based on an earlier revision replacing the stored one; the tab whose save was
    refused saving its own game state again; a refused tab that stops saving until a reload
- **Origin:** zapis_stanu_na_serwerze_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, questions 3 and 16, and § Settlements to record, row 3

*Rationale:* with saving that runs by itself, a tab left open on one device would otherwise overwrite
an hour of play from another at its next save, without a word; refusing a save based on what the
browser did not see costs a number more at saving and a state of the screen, and the progress of the
browser that lost is lost. A loaded map run comes back paused, so the tab that lost sends nothing
until the player acts in it: a player who plays by turns in two open tabs loses at each change of
tab the first act in the tab returned to and sees the sentence, and with a map run passing in the
other tab also each later act made more than 30 seconds after the load, until one is saved, with one
click of „Wznów” when the map run came back paused. A counter checked in the transaction that writes
the save is as safe as a random tag, reads plainly in tests, and keeps the body the save's only
input.
*Rejected:* the last save winning — a tab left open, on a computer say, overwrites at its next save,
without a word, an hour of play from another browser, on a telephone say; one browser at a time,
loading the game in a new browser turning off saving in the old one — in effect the same as the way
chosen seen from the new browser, at the same cost; the loaded map run going on if it went on — the
tabs save by turns and refuse each other, the tab the player is playing in included, as long as the
old tab is open, so the player sees the sentence and loses the last act without changing tabs; no
saving after the load until a reload, with „Odśwież stronę.” added to the sentence and „Wyloguj”
logging out without saving — a player who plays on in that tab plays without saving and loses all of
it when the tab closes, and the sentence answered for the conflict changes; a random tag or an
`If-Match` header for the basis — no safer than a counter in one transaction, and the basis would
leave the body; the refusal carrying the server's saved game state — saves a request, but gives the
save route a second shape of answer that logout does not want.

### D-210 — What does the server do with a save of the game state of a lower version than the one it holds?

The server refuses a save of the game state whose version of the shape is lower than the version of
the saved game state it holds, comparing that number before the basis of D-209 and reading nothing of
the game. The tab whose save it refuses so shows „Gra została zaktualizowana. Odśwież stronę.” in
`warning` on the header line of D-208 and saves nothing more, while the game stays on its screen.

- **Scope:** browser-view, account-server
- **Based on:** none
- **Relations:** derives from D-206
- **Verification:** an agent compares a change with the decision:
  - complies: a tab opened before a deployment that raised the version, its save refused with the
    sentence standing and its later acts sending nothing; an old tab whose basis is also stale told
    to reload rather than loading the newer saved game state
  - violates: an old tab's save of a lower version replacing the stored one; the server reading the
    version from inside the game
- **Origin:** zapis_stanu_na_serwerze_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 4, and § Settlements to record, row 4

*Rationale:* the server compares one number and computes nothing of the game (D-07), at the cost of
knowing the version of the save it takes and of one state of the screen more. The version is
compared first, so an old tab whose basis is also stale is told to reload instead of loading a saved
game state its code cannot read.
*Rejected:* no protection, as D-206 alone gives — an old tab after a deployment can erase a game
begun in a new tab, by saving its state of the old version or, after the refusal of D-209, by
loading the new saved game state, discarding it as another version, starting anew and saving an
empty game, which with frequent deployments while the game is tested is real for its owner.

### D-211 — What does the player see when a save of the game state finds no session?

When the server answers a save of the game state that there is no session, whatever ended it — an
expiry or a block of the account (D-137) — the game leaves the screen and its time stops, the account
forms return with „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” in `warning` above them,
and the unsaved game state stays in the page's memory only, never in the browser's lasting storage,
so a reload or a closing of the page before signing in loses it. After a sign-in to the same account
the game sends that state and goes on from it, a manual map run in it coming back as D-96 and D-212
give; after a sign-in to another account the state is dropped and the game loads that account's
saved game state.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-203
- **Verification:** invariants: expired-session-unsaved-progress. An agent compares a change with the
  decision:
  - complies: a save answered with 401 removing the game and showing the forms with „Sesja wygasła.
    Zaloguj się ponownie, aby zapisać postęp.”, and a sign-in to the same account sending the kept
    state and showing its map run paused
  - violates: the unsaved game state written to `localStorage`; the kept state saved after a sign-in
    to another account; the game left running beside the forms
- **Origin:** zapis_stanu_na_serwerze_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 5, and § Settlements to record, row 5

*Rationale:* the progress the browser holds waits in the open tab for the same account, and nothing
of it stays in the browser for the next person at a shared computer; unsaved progress lives only as
long as the open tab, and its retry may lose to another browser's save (D-209). A game that left the
screen spends no time the player cannot save.
*Rejected:* the unsaved state also kept in the browser's lasting storage (`localStorage`) for that
account, surviving a reload — on a shared computer the state stays for the next person, and a new
path of code and a new decision about the browser's storage; the game staying on the screen and
going on, with a sentence in `warning` and a button „Zaloguj się ponownie” that opens the form —
further progress is unsaved too, and a new layout of the screen with the form beside the game.

### D-212 — How does a manual map run come back from a loaded saved game state?

A manual map run of a loaded saved game state that goes on comes back at the game minute of the
save, paused, with the pace of the save, and the player resumes it with „Wznów”; one that ended in a
completion or in the character's death comes back on its screen after its end, with „Restart”,
„Zakończ” and the copy open to editing as D-62, D-132 and D-173 give. No time that passed between the
save and the load advances it, the computing of time away included.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a map run of Las saved at game minute 212 at 8× loading an hour later at game minute
    212, paused, at 8×; a map run saved on the screen after a death loading on that screen with
    „Restart” and „Zakończ”
  - violates: a loaded map run going on at once; a loaded map run moved on by the time away; loading
    that closes an ended map run as „Zakończ” does
- **Origin:** zapis_stanu_na_serwerze_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, questions 8, 15 and 23, and § Settlements to record, row 8

*Rationale:* a player who signs in on another device does not miss a discovery, an attack or the
character's death in the first seconds, at the cost of one click after each load with a map run
going on. A map run the player solves as a puzzle and watches does not end while the player is away,
and the computing of time away starts from the loaded game state, in which such a map run stands
paused. An ended map run keeps the state that explains its end, the copy's unsaved changes and
„Restart” on the same seed.
*Rejected:* the map run coming back exactly as saved and going on if it went on, with the time away
not moving it — a player signing in on another device may miss a discovery, an attack or the
character's death in the first seconds; the computing of time away also moving a manual map run that
went on — a map run the player solves as a puzzle and watches ends in a completion or a death in the
player's absence, at 1× a closed tab of 8 minutes ends a map run of Las, and the computing of time
away gains a requirement; that, moving the map run at the pace the computing of time away picks — at
the pace of a manual map run at 1× a map run of Las ends after 8 minutes away, at the pace of an
earning loop after 8 hours; loading that closes an ended map run as „Zakończ” does, the player
landing in the headquarters — changes of D-62, D-132 and D-173, code closing the map run at loading,
and after each reload following a death or a completion the loss of the copy's unsaved changes
without the line „Niezapisane zmiany w kopii.” that warns before „Zakończ”, and of „Restart” on the
same seed.

### D-213 — Which file is the exemplar for saved-game code?

The exemplar for kind `saved-game` is `src/browser/sim/saved-game.ts`, and its kind guidelines are
read before adding or changing a file of that kind. Saved-game code turns a game state into the
saved document of the current version of its shape, and an unknown value — a saved game state
downloaded from the server or kept in the page's memory (D-211) — into a game state or a refusal
naming why, inside the simulation, never throwing and changing nothing passed to it.

- **Scope:** simulation, agent-workflow
- **Based on:** none
- **Relations:** derives from D-28 · derives from D-04 · derives from D-206
- **Verification:** an agent compares a change with the decision:
  - complies: saved-game guidelines identify the first implementation as exemplar and draw the
    kind's boundary with simulation modules as the content-data guidelines draw theirs; a crafted
    document of the current version answered with a refusal
  - violates: a load that throws on a crafted document; a saved-game file that imports from the
    browser view; a second exemplar for the kind
- **Origin:** zapis_stanu_na_serwerze_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), To do, item 12

*Rationale:* the first file that reads data from outside the simulation into the game state gives
later saved-game work a concrete model of a strict load, its refusals and the version kept with the
shape, apart from the functions that pass game time.
*Rejected:* the load in the browser view, which then replaces the game state itself — the breach of
D-04; a lenient load that fills missing keys — a migration by another name, against discarding
another version whole.
