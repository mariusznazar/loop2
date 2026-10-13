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

### D-08/1 — Where does the MVP run?

The MVP game and its account and save server run in a dedicated loop2 container on Mikrus, at a
public address different from `kantarion.bieda.it`. The existing loop container remains untouched.

- **Change:** new decision
- **Scope:** deployment
- **Based on:** none
- **Relations:** none
- **Verification:** level 1 — invariants: loop2-container-isolation · loop2-distinct-address. Level 2 for leaving the existing loop instance untouched — an agent compares the change with the decision:
  - complies: a loop2 container and public route added beside the existing loop instance
  - violates: a deployment that rebuilds or replaces the existing loop container
- **Review when:** none
- **Origin:** none
- **Approved by:** Mariusz, 2026-10-13

*Rationale:* a separate instance exercises the new game's server and release path on the intended
Mikrus host without disturbing the running loop game. The address can be chosen in the deployment
task while keeping the separation fixed.
*Rejected:* replacing the running loop container or using its public address — would interfere
with the existing game and break the required separation.

### D-09/1 — How does a change reach the server?

A push to the deploy branch starts an automation that tells the server to build the game and its
account server from that commit; the server pulls the code from GitHub itself, and the automation's
key can only start a rebuild of a commit that belongs to that branch.

- **Change:** new decision
- **Scope:** deployment
- **Based on:** none
- **Relations:** none
- **Verification:** level 1 — invariants: loop2-deploy-trigger-input. Level 2 for the rest — an agent compares the change with the decision:
  - complies: a workflow that, on a push, calls the server's one rebuild command with the commit
  - violates: a workflow that copies the built files onto the server; a key that opens a shell on
    the server
- **Review when:** none
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), §7 "Wdrożenie"
- **Approved by:** Mariusz, 2026-10-13

*Rationale:* the code is sent nowhere — the server takes it from GitHub itself — so a stolen key can
start a rebuild but cannot bring code in. The price is a short break in access at every deployment.
*Rejected:* none considered

### D-05/3 — What serves the built game and account requests in the container?

One Node.js process running Express 5 serves both the built game's static files and the `/api/`
account and save routes in the loop2 container. An unmatched `/api/` request receives an API error,
not the game's HTML page.

- **Change:** new wording
- **Scope:** account-server, build-tools, deployment
- **Based on:** Express 5 static file serving (https://expressjs.com/en/5x/starter/static-files/, read 2026-10-04) · Express 5 request routing and response API (https://expressjs.com/en/5x/api/express/, read 2026-10-04) · Caddy 2 route, file_server and reverse_proxy (https://caddyserver.com/docs/caddyfile/directives/route, read 2026-10-04) · Docker multiple processes in one container (https://docs.docker.com/engine/containers/multi-service_container/, read 2026-10-04)
- **Relations:** derives from D-02@06e6d3d8 · derives from D-08@e4e8a2f4
- **Verification:** level 1 — invariants: loop2-one-serving-process · loop2-api-error-route
- **Review when:** serving built files through Express becomes difficult to operate or the account API needs a separate process · check by: 2027-04-04
- **Origin:** the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What serves the built game and account requests in the container?"
- **Approved by:** Mariusz, 2026-10-13

*Rationale for change:* the one serving process is the one in the loop2 container where the MVP
runs, and the `/api/` paths it serves are the account and save routes, so a serving process outside
that container does not meet the decision.
*Rejected:* keeping the wording without the container — it leaves open where the one serving
process runs.

### D-10/1 — How do players reach loop2 on the server?

Players reach loop2 at `https://loop2.mariusznazar.com/`, which Cloudflare proxies to the server: a
proxied AAAA record points at the server's IPv6 address, and an Origin Rule sends the requests to
the port the loop2 container publishes. Players connect to Cloudflare over HTTPS, and Cloudflare
connects to the server over plain HTTP only while no player account is served through this route.

- **Change:** new decision
- **Scope:** deployment
- **Based on:** cloudflare-origin-rules@6f0ea4e4 · cloudflare-configuration-rules@939e4e91 · Cloudflare network ports, "By default, Cloudflare proxies traffic destined for the HTTP/HTTPS ports listed below." (https://developers.cloudflare.com/fundamentals/reference/network-ports/, read 2026-10-13)
- **Relations:** derives from D-08@e4e8a2f4
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a change whose workflow requests `https://loop2.mariusznazar.com/` after a deployment and whose container publishes the port the Origin Rule names
  - violates: a public address on a Mikrus subdomain for loop2; a task that serves player accounts through this route while Cloudflare still connects to the server over plain HTTP
- **Review when:** a task is about to serve player accounts through this route, which needs the connection from Cloudflare to the server encrypted first · check by: 2027-01-13
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Pod jakim adresem stanie loop2 na Mikrusie?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* Cloudflare already holds the `mariusznazar.com` domain, gives players HTTPS without a
certificate in the container, and reaches the container's port through an Origin Rule, while both
public IPv4 service ports of the host are taken by other workloads, the old loop game and another.
Plain HTTP from Cloudflare to the server is accepted only while the test server holds no player
data, since HTTPS for players is not end-to-end encryption; a Configuration Rule sets that
encryption mode for this hostname alone, so the old game's route keeps its own. That Cloudflare
reaches a server with only an IPv6 address is a hypothesis until the first deployment shows it. The
Cloudflare records and rules are state outside the repository that no entry records; what the
human observes after setting them up and running the first deployment is recorded then.
*Rejected:* a new free Mikrus subdomain — ties the game's address to the hosting provider; serving
loop2 at `kantarion.bieda.it` in place of the old game — would reopen the approved MVP definition.

### D-11/1 — Which branch deploys loop2 to the test server?

The deploy branch is `main`: a push to `main`, the merge of a pull request included, reaches the
test server without anyone starting it by hand, deployed itself or within a later commit of `main`
that contains it.

- **Change:** new decision
- **Scope:** deployment
- **Based on:** none
- **Relations:** derives from D-09@20be369f
- **Verification:** level 1 — invariants: loop2-deploy-trigger-input. Level 2 for the rest — an agent compares the change with the decision:
  - complies: a workflow that runs on a push to `main` and asks the server to rebuild the pushed commit, a newer push replacing a deployment still waiting to run
  - violates: a workflow that deploys only from a separate `test` branch; a push to `main` that waits for someone to start its deployment by hand
- **Review when:** a separate deployment step or a separate test environment is set up between `main` and the test server · check by: 2027-04-13
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Która gałąź wdraża loop2 na serwer?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* every merged pull request reaches the test server with no manual step, and no second
branch can drift from `main`. A newer push that replaces a deployment still waiting to run loses
nothing, since its commit contains the older one.
*Rejected:* a separate `test` branch, as the old loop game deploys — a manual step at every
deployment and a risk of drifting from `main`.

### D-12/1 — What access to the server does an agent have?

An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every
change on the server that is not a deployment started by the automation is made by a human.

- **Change:** new decision
- **Scope:** agent-workflow, deployment
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a deployment skill in which the agent reads the deploy log and the container state through the `mikrus` MCP server and asks the human to run a rollback
  - violates: an instruction of the skill in which the agent installs the deploy script, edits `authorized_keys` or restarts a container through the `mikrus` MCP server; an SSH key of the agent's own on the server
- **Review when:** the server holds data whose loss matters, such as player accounts or saved game states, so the agent's access has to be secured further · check by: 2027-01-13
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Jaki dostęp do serwera dostaje agent?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* the server holds nothing today whose loss the owner fears, the old loop game's
container included, so reading through a tool that can run any command is accepted for now; the
agent reads logs and state itself instead of the human relaying them. The `mikrus` MCP server runs
every command with full rights, so the limit to reading is an agreement, not an enforced boundary.
A deployment the automation starts on a push is no agent's change.
*Rejected:* a separate SSH key for the agent, closed in a read-only script — more setup than the
server's present contents warrant; no agent access to the server — the human relays every log and
state.

### D-13/1 — Where do the server's access values and secrets live?

Secrets and the values that give access to the server — its name, SSH port, SSH user and IPv6
address — stay outside the repository, in the repository's GitHub secrets and the owner's private
note, and the repository's files and requests refer to them by the secret's name or the note. The
server directory, the container port and the deploy script may stand in the repository.

- **Change:** new decision
- **Scope:** deployment, agent-workflow
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a workflow that reads the server's address from a named GitHub secret; a skill that says the SSH port is held in a named secret
  - violates: a workflow, script, skill or request text that holds the server's name, SSH port, SSH user or IPv6 address itself
- **Review when:** none
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Co poza sekretami jest wrażliwą konfiguracją serwera, której nie ma być w PR-ze ani w repozytorium?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* the access values would tell a reader of the repository where and how to enter the
server; the server directory, the container port and the deploy script tell no one how to get in.
*Rejected:* keeping only the secrets outside the repository — the access values left in it would
show where and how to enter the server.

### D-14/1 — What kind of container does loop2 run in?

The loop2 container is a Docker container.

- **Change:** new decision
- **Scope:** deployment
- **Based on:** none
- **Relations:** derives from D-08@e4e8a2f4
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a Compose file and a Dockerfile from which Docker builds and runs the loop2 container
  - violates: loop2 run as a service directly on the host, or in a container of another runtime
- **Review when:** none
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Czy kontener loop2 jest kontenerem Dockera?"
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* the host already runs Docker with Compose, and the old loop game runs there in a Docker
container, so loop2 is run with the tool the host is already operated with.
*Rejected:* none considered

### D-15/1 — How is loop2 recovered when a deployment goes wrong?

A deployment that stops before it starts the new container leaves the running loop2 container in
service. A rollback is a deployment of an earlier commit — a revert merged to `main`, or a human's
run of the installed deploy script with that commit, which may name a commit of any branch of the
GitHub repository while the automation's key deploys only commits of `main`. No earlier image is
kept, so a rollback restores the earlier commit's code, never the data of that time.

- **Change:** new decision
- **Scope:** deployment, agent-workflow
- **Based on:** none
- **Relations:** derives from D-09@20be369f
- **Verification:** level 1 — invariants: loop2-deploy-keeps-running. Level 2 for the rollback — an agent compares the change with the decision:
  - complies: a revert merged to `main`; a human running the installed deploy script on the server with an earlier commit named in the deploy log
  - violates: a rollback that restarts a kept image of an earlier commit; the automation key's path accepting a commit of a branch other than `main`
- **Review when:** a task stores player data on the server, so that a rollback of code meets data written by newer code · check by: 2027-01-13
- **Origin:** none
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* keeping no earlier image leaves the server one checkout and one image of loop2, and a
revert on `main` keeps the branch and the server in agreement. A human's run accepts a commit of any
branch so that a change to how loop2 is deployed can be deployed and tried before its merge, and so
that a rollback reaches an earlier commit at once. The base image is named by a tag that is not
pinned, so a rebuild of an earlier commit restores its code, not the identical image.
*Rejected:* keeping the images of earlier commits and switching back by index — a restore at once,
but a commit's image tag can be overwritten, a rollback across a change of the published port breaks
the public route, and the kept images need ordering rules of their own.

### D-16/1 — What does the automation's key run on the server?

The automation's key runs only a root-owned installed copy of the deploy script, kept outside the
server's checkout, so no pushed commit changes what the key runs. Each deployment compares that copy
with the script's source at the deployed commit and only warns when they differ, and reinstalling
the copy is a human's change.

- **Change:** new decision
- **Scope:** deployment
- **Based on:** openssh-authorized-keys-options@3fd0389d
- **Relations:** derives from D-09@20be369f · derives from D-12@d5196ed7
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: an `authorized_keys` entry whose forced command names the installed copy's path; a deployment that logs the difference between the copies and goes on
  - violates: a forced command that points into the server's checkout; a deployment that reinstalls its own script
- **Review when:** a task is about to serve player accounts through loop2, since a stolen automation key can switch loop2 to any earlier commit of `main` until the next push · check by: 2027-01-13
- **Origin:** none
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* what the key can run stays what a human installed, whatever a pushed commit holds. A
warning rather than a refusal keeps a rollback to a commit older than the last change of the source
possible. A stolen key can still redeploy an earlier commit of `main`; that is accepted while the
test server holds no player data. Code merged into `main`, its container build and service
definitions included, runs on the host with root's authority through the deployment, so it is
trusted code and whoever can merge to `main` can act on the host; the trust boundary stays with the
files that take in data the product does not trust. The forced-command entry and the installed copy
are state on the server that no entry records; what the human observes after installing them and
running the first deployment is recorded then.
*Rejected:* a forced command that runs the checkout's own copy — a pushed commit could change what
the key runs; a deployment that refuses when the copies differ — every rollback past a change of the
source would stop.

### D-17/1 — How does loop2 share the Mikrus host with other workloads?

A deployment of loop2 changes nothing on the host but loop2's own checkout, image, container, log
and lock, and the build cache and base image its build adds to the Docker store the host's
workloads share, which it never prunes; it removes or replaces nothing of another workload. It
builds only while the host's available memory and free disk stay above thresholds the repository
sets, and the loop2 container runs under a memory limit.

- **Change:** new decision
- **Scope:** deployment
- **Based on:** none
- **Relations:** derives from D-08@e4e8a2f4
- **Verification:** level 1 — invariants: loop2-host-sharing. Level 2 for the thresholds and the memory limit — an agent compares the change with the decision:
  - complies: a deployment that refuses to build while available memory is below its threshold and leaves the running container untouched; a Compose service with a memory limit
  - violates: a build started without reading the host's memory and disk; a Compose service with no memory limit
- **Review when:** a task needs more memory than the container's limit, or the values each deployment logs show the thresholds refusing sound builds or letting through builds that exhaust the host · check by: 2027-04-13
- **Origin:** none
- **Approved by:** Mariusz, merge of <request link>

*Rationale:* the host is shared with the old loop game and another workload and has no swap, so a
build that exhausts its memory can make the kernel end a process of another workload; reading
memory and disk before the build stops a deployment before it harms them. The thresholds and the
limit are chosen bounds, not measured needs, tuned in the repository from the values each
deployment logs. Code merged into `main`, its container build and service definitions included,
runs on the host with root's authority through the deployment, so these limits hold against
mistakes in trusted code, not against whoever can merge to `main`. The host's memory, disk and
other workloads are state outside the repository that no entry records; what the human observes at
the first deployment is recorded then.
*Rejected:* a host-wide prune to reclaim build cache — it would remove images and cache of other
workloads, and the base image may be one another workload uses; reclaiming the build cache and
base-image layers stays a human's decision.
