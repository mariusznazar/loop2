# Panel assessment A — task/app-skeleton, correction 2

Perspective: **the agent that will work under the change.** The foundation as it would stand after
the merge of `031b0a6` was applied to 33 situations: the later MVP tasks the project definition
names and plausible changes to the current code and build. The UNAPPROVED patch was applied in both
states, accepted and rejected. Inputs: the manifest, `files.txt`, `files-branch.txt`, the patch
(SHA-256 matches the manifest), the repository at `031b0a6`, `.the-way` at `96c5248`, and
`definicja_mvp_loop2.md`.

## What was run

Everything below ran in a throwaway worktree at `031b0a6`, with `.the-way` initialised at
`96c52488` (it matches the gitlink). The worktree is removed.

| Check | Patch rejected (031b0a6) | Patch accepted |
|---|---|---|
| format guard decisions / invariants / glossary / environment facts (`--base` and `--merge-onto` 91ee59e) | 0 errors, 0 warnings, 0 unchecked each | decisions and invariants rerun: same result |
| format guard part map (`--base` 91ee59e) | 0 errors, 0 warnings, 1 unchecked: no command reports the dependency graph | same |
| gate `run_tests.py tests/invariants --record` | — | 31 passed out of 31 (record: 31 lines, all `pass`) after `npm ci` |
| `npm test` | — | 5 passed out of 5 |

The first gate run in a fresh worktree had no `node_modules`. It reported 7 failures and 4 errors
(`AssertionError: node_modules is missing; run npm ci first`,
`tests/invariants/loop2_invariant_support.py:175`). These were failures of a precondition, not of
an invariant. The *Method* of every invariant (`foundations/invariants.md:7` and the rest) does not
name that precondition (see N6).

## Count over 33 situations

"One" means the foundation gives a single answer. "Two" means it gives answers that conflict.
"None" means it gives no answer. The entries involved are named in each row. "Sources" means the
task's sources under WAY-126 (the definition's projected entries); I note them where they settle
what the foundation leaves open.

| # | Situation | Count | Entries involved |
|---|---|---|---|
| 1 | Sign-up and sign-in routes `POST /api/...` in `src/server` | one | account-server (trust boundary `src/server/**` → crafted-input checks, WAY-48); D-02, D-05, D-07; account-server-express-http, loop2-api-error-route. Routes must come before the `/api` catch-all, `src/server/app.ts:14` |
| 2 | `argon2` (a native module) added for password hashes | one | build-tools (`package.json`, trust boundary `package-lock.json`); D-01. The foundation does not name the algorithm; the projected decision does (sources) |
| 3 | `express-session` with its own `node:sqlite` store | one | account-server; D-02; the express-http check lists only HTTP frameworks (`test_account_server_express_http.py:31-36`) |
| 4 | Protection against forged requests (CSRF) by a token written into the served `index.html` | **two** | D-05 / loop2-one-serving-process hold, because the built game is still served. The check requires `GET /` to return the exact bytes of a built HTML file, `test_loop2_one_serving_process.py:9-11,183-186` |
| 5 | Account emails through Nodemailer to Outsider over SMTP | one | account-server; the External context (`part_map.md:72-75`) must gain a row (WAY-48/49), which the agent knows from the template |
| 6 | Operator blocks an account with a script (`scripts/block-account.*`) | none | No part covers it: account-server's sentence is about HTTP only (`part_map.md:15`), and build-tools lists `scripts/build.mjs` alone. The guard error forces a map change, and the choice of part has no basis |
| 7 | `PUT`/`GET /api/save` that stores the save and returns it | one | D-07, its *complies* example (`decisions.md:129`); account-server |
| 8 | "Input checks" of the save beyond size and JSON form (D-02 rationale `decisions.md:37-38`), e.g. a backpack cap | **two** | D-07 "computes nothing of the game" (`decisions.md:122`) against the input checks of the D-02 rationale. D-07's examples do not settle validation. The definition's Out of scope ("server does not check progress") settles it from the sources |
| 9 | Two browsers: the server rejects a stale write by revision | one | D-07; the revision is not game computation |
| 10 | SQLite file on a volume, data directory in `.gitignore` | one | account-server, build-tools (`.gitignore`) |
| 11 | Schema migrations of the database | one | account-server |
| 12 | Backup of the database to Strych (cron, rsync) | none | No part's sentence covers operations; the foundation holds no decision (the projected one lies in the sources) |
| 13 | `Dockerfile` (`FROM node:24`) | one | build-tools ("builds and launches", `part_map.md:29`); account-server-runtime reads Dockerfiles; account-server-typecheck fails on purpose until it is extended (`test_account_server_typecheck.py:15-21,92-95`) |
| 14 | One process in the container | one, with a gap | D-05 is about the container (its title, `decisions.md:79`). The check says "Does NOT cover: a deployment or container" (`test_loop2_one_serving_process.py:23`) and keeps passing when a Dockerfile appears. It has no tripwire like the typecheck check's (F1) |
| 15 | CI deployment workflow (`.github/workflows/deploy.yml`) | **two** | WAY-44 puts CI configuration in the part of files that direct the work (agent-workflow, `part_map.md:48`). build-tools "launches the application" (`part_map.md:29`). agent-workflow's sentence "directs and records the work" does not fit a deployment |
| 16 | `0.0.0.0` / `PORT` from the environment in the container (`src/server/main.ts:3-4`) | one | account-server; the tests keep 127.0.0.1:3000 as the default |
| 17 | A second port of the same process (health, admin, `--inspect`) | **two** | The sentence of D-05 / loop2-one-serving-process ("one process") allows it. The check forbids any other port of the started process tree, the listener included (`test_loop2_one_serving_process.py:15-17,209-212`) |
| 18 | Mikrus HTTPS proxy outside the container, `trust proxy` | one | D-05 (scope: the container; rationale "A later proxy can retain the public paths", `decisions.md:96`) |
| 19 | Fallback to `index.html` for paths outside `/api` | one | D-05 rationale; loop2-api-error-route |
| 20 | Where the simulation lives (`src/sim` or `src/browser/sim`) | **two** | By path → browser-view (`src/browser/**`), but its sentence is "draws the game's screens" (`part_map.md:5`). A new part needs a third configuration or a changed `rootDir`. D-06 names two (`decisions.md:102-104`), the build check holds two literal configurations (`test_application_build_output.py:280-283`), and D-04's Scope lacks the part (`decisions.md:66`). The definition defers this to the breakdown |
| 21 | Simulation as pure functions; the view draws only from the game state | none | D-04/1 is shortened (`decisions.md:63`). Its Origin points to "the full approved entry" (`decisions.md:73`), and WAY-126 brings in the rest |
| 22 | A seeded random-number generator from npm in the browser | **two** | D-03 forbids only a UI framework (`decisions.md:47`). D-04 *violates* covers "a script the browser loads written directly in JavaScript" (`decisions.md:71`). D-06 rejects a bundler (`decisions.md:117`). browser-view-framework forbids a bare import in the built page. Read literally, any third-party library is ruled out (Q2) |
| 23 | Game content in JSON data files | none | The foundation is silent (the decision is projected). `scripts/build.mjs` copies only `index.html`; application-build-output does not cover copied files |
| 24 | Types shared by the browser and the server (`src/shared`) | **two** | D-06's sentence does not forbid it. Its rationale "keep browser and server types apart" (`decisions.md:115-116`) does. The build check's literal `rootDir`/output paths fail on a changed layout. No part claims `src/shared` |
| 25 | Simulation unit tests (`tests/sim/*.test.mjs`) | one | WAY-44 (a test belongs to the part it tests); the `npm test` script is in build-tools |
| 26 | Express 5.x / TypeScript 6.x upgrade | one | build-tools; D-01, D-02; the checks of major versions |
| 27 | Adding a bundler (esbuild) | one | D-06 *Rejected* → a new decision version for a human |
| 28 | CSS copied by the build | one | build-tools; browser-view-framework allows `.css` |
| 29 | New environment fact or glossary term in `foundations/` | accepted: one / rejected: **two** | product-foundation. "Product rules and the map" (`part_map.md:61`) does not describe `glossary.md` or `environment_facts.md`, which the part already holds today. WAY-43 then leaves open whether the sentence has to be rewritten |
| 30 | Derived files `foundations/violated_invariants.md`, `human_verdicts.md` (the guard notes their absence) | accepted: one / rejected: **two** | As in 29. The-way's term "foundation" covers "where the product breaks them" (`.the-way/foundations/glossary.md:79`) |
| 31 | A new decision with Scope account-server in `decisions.md` | one | WAY-44, last sentence: the parts come from the entry, not from the file |
| 32 | How sharply any MVP task is checked (WAY-13) | none | The criticality scale is empty (`part_map.md:68`) and every *Failure modes* is `none`. The guard's computed degree is index −1 of an empty list. In practice the task-cycle rule "unknown failure modes count as highest" gives the answer |
| 33 | The deployment task writes the container part of D-05 / loop2-one-serving-process | **two** | D-05/1 is shortened ("in the loop2 container" and "account and save" are dropped), but its Origin is `none` (`decisions.md:90`), unlike D-04/D-07. The definition holds a different text under the same `loop2-one-serving-process/1` ("One Express 5 process in the loop2 container…") than `invariants.md:53-55` |

**Tally, patch accepted:** one 20, two 8, none 5. **Patch rejected:** one 18, two 10, none 5.
The patch changes the answer only in situations 29 and 30. No reference carries the fingerprint of
product-foundation (only `part_map.md:55`, without a fingerprint), so accepting it flags nothing.

## Remarks

**F1 — not blocking, a fix within D-05.** `tests/invariants/test_loop2_one_serving_process.py:23`
excludes "a deployment or container (none exists yet)". D-05 is the decision about the container
(`foundations/decisions.md:79-82`). account-server-typecheck has a test that fails on purpose once
a deployment file appears (`test_account_server_typecheck.py:18-21,92-95`). This check has none,
so the deployment task gets a green check that reads nothing of the container (situation 14). The
fix: add an analogous tripwire. It changes what an invariant test checks, so a human decides.

**N1 — not blocking, a question about the reading of the check.**
`test_loop2_one_serving_process.py:15-17,209-212` reads "one process" more strictly than the
sentence. Another TCP port of **the same** listening process (health, admin, inspector) fails the
check, though no second process exists (situation 17). Likewise `:9-11,183-186` requires `GET /`
to return the exact bytes of a built HTML file, which rules out any per-request change of the page
(situation 4). Either the reading should narrow to "another process of the tree", or a human
confirms the stricter reading as intended. Today the code meets both.

**Q1 — for a human (approved wording).** D-05/1 (`foundations/decisions.md:79-91`) and
loop2-one-serving-process/1 (`foundations/invariants.md:53-55`) are shortened projected entries:
"in the loop2 container" and "account and save" are dropped. D-04/1 (`decisions.md:73`) and D-07/1
(`decisions.md:132`), also shortened, name "the full approved entry" in Origin; D-05/1 has
`Origin: none` (`decisions.md:90`). The definition also keeps the identifier-and-version
`loop2-one-serving-process/1` with a different sentence. Should D-05's Origin point to the full
entry, as D-04's and D-07's do? And will the deployment task bring the container part in as /2
under WAY-126 (situation 33)?

**Q2 — for a human (approved wording).** D-04/1's *violates* example, "a script the browser loads
written directly in JavaScript instead of compiled from TypeScript" (`decisions.md:71`), read
literally rules out any third-party library loaded by the browser. D-06 rejects a bundler
(`decisions.md:117`), so the only route left is to rewrite such a library in TypeScript. This is
stricter than D-03 (`decisions.md:47`), which forbids only a UI framework. Is that intended
(situation 22)?

**Q3 — for a human, about the breakdown.** The map has no part for the simulation or the game
content (situations 20, 21, 23). The first task that brings them in has to change at once the map,
D-04's Scope (a new version), and possibly D-06 together with application-build-output's literal
configurations (`test_application_build_output.py:280-283`). The definition defers "which part
holds the simulation" to the breakdown. This is not a defect of this change; it is the place where
the next agent gets two answers.

**N2 — not blocking.** The criticality scale is empty and every part has `Failure modes: none`
(`part_map.md:10,24,43,56,65,68`), so the map computes no degree (situation 32). The task cycle
treats unknown failure modes as highest, so the result is a single answer: the sharpest checking
everywhere. A human may confirm that this is intended for the MVP. account-server holds the trust
boundary and will hold passwords.

**N3 — not blocking.** account-server depends on build-tools and build-tools on account-server
(`part_map.md:23,42`), a cycle. While every part counts as highest it changes nothing, and the
guard leaves dependencies unchecked. It will matter once failure modes are written.

**N4 — not blocking, for the deployment task.** CI configuration (situation 15): WAY-44 assigns it
to the part of files that direct the work (agent-workflow), while build-tools' sentence "launches
the application" competes for it. The first deployment task has to settle this in the map.

**N5 — not blocking.** D-07's *complies* example "returns it unchanged" (`decisions.md:129`) and
the D-02 rationale's "input checks" (`decisions.md:37-38`) do not settle whether the server may
check the save's plausibility (situation 8). The definition's Out of scope settles it ("no"). A
human may consider a *violates* example in a later version of D-07.

**N6 — not blocking, outside this round's files.** The invariants' *Method* does not name `npm ci`.
In a fresh worktree the gate reports 11 failures instead of "not checked"
(`loop2_invariant_support.py:175`).

**N7 — not blocking.** The patch's header refers to `proposal-pl.md` "in this directory", which is
not among the panel's inputs (`assessment/correction-2/` holds 4 files).

## The UNAPPROVED patch

Accepting it makes product-foundation's sentence match the files it already holds (`glossary.md`,
`environment_facts.md`). It uses the-way's term "foundation" instead of a paraphrase of its
definition (WAY-97; `.the-way/foundations/glossary.md:77-79`), and it removes the "two" in
situations 29 and 30. Rejecting it leaves a sentence narrower than the part's files, at no cost
today but with recurring doubt in every task that adds an environment fact, a term or a derived
file. It flags nothing (no fingerprint references), and the part-map guard is identical in both
states. **Recommendation: accept.** The human decides on the wording.

## Call

**Accept with fixes.** The code and the checks of this round hold: gate 31/31, `npm test` 5/5,
guards with no errors. Fix within the decisions in force: F1 (non-blocking; it can also go to the
deployment task, but then by name). For a human: Q1, Q2, Q3 and the UNAPPROVED patch (recommended:
accept). Optional confirmations: N1, N2. Nothing blocks.
