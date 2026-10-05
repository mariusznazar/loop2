# Return step — correction 1 (task/app-skeleton) — UNAPPROVED proposals

Agent R (fresh, Claude Opus 5.5), task-cycle step 11 (WAY-11, WAY-126). Nothing here is approved,
and nothing was written into `foundations/`, code or tests. Every proposal in this directory
waits for the human at the request.

- Worktree `C:\Storage\repos\loop2-skeleton`, branch `task/app-skeleton`. the-way pinned at
  `96c52488752701ffa321ca69c0c2aa2dd3e46d2d` (checkout equals gitlink).
- Fork point (merge-base with main): `91ee59e295b8e0b024c4af1d4d1318738ab8f29e`.
- Dispatched at HEAD `ab34d90`. **During this step HEAD moved to `2544a6a`** ("test: tighten
  invariant checks after review", orchestrator's check fixes). `2544a6a` changes only
  `tests/invariants/` (4 files), not `foundations/`, so the patch below, made against `ab34d90`,
  applies to `2544a6a` unchanged (`git apply --check` exit 0 on both). The check-related findings
  below are read at `2544a6a`.
- Commits holding the code evidence: `11c7cbb` (skeleton code), `de3ceb3` (startup error
  handling, `tests/startup.test.mjs`), `22dbff4` (foundation entries written whole), `ab34d90` and
  `2544a6a` (invariant checks). Merge of main: `83f6158`.

Output files (one current version):

| File | What it holds |
|---|---|
| `C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-1\return\return-step.md` | this report (current version: after the critique and the panel, see "After critique" and "After panel" at the end) |
| `C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-1\return\UNAPPROVED-proposed-foundation-against-ab34d90.patch` | **UNAPPROVED** unified diff of `foundations/` against `ab34d90` holding every proposed entry and field value |
| `C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-1\return\proposal-pl.md` | every proposed entry whole with its Polish translation; *To decide* in Polish |
| `C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-1\return\choices.md` | classification of every autonomous choice of both choice logs |

Read: task-cycle skill steps 4–14 and "Correction after review"; WAY-03, 11, 13, 19, 21, 22, 28,
36, 37, 44, 62, 114, 126 at the pin; `elements/common/way_of_working.md`, `rules.md`; templates of
decisions, invariants, part map, glossary, environment facts; skills of decisions, invariants,
part map (incl. "The first map of a product"); the-way's own part map for form; all of
`foundations/` at `ab34d90`; the definition's sections Out of scope, Open questions, Technology,
Projected foundation changes (all 44 decisions, 36 invariants, 19 terms, 2 facts) and Gate record;
the frozen task; `cycle.md`; first-run `autonomous-choices.md`, return proposals,
`human-review-candidates.md`, `human-review-pl.md`; correction-1 `foundation-step.md`,
`partial-proposals.md`, `check-author.md` (incl. "After code review"), `code-review-checks.md`,
`break-author.md`, `break-runs.md`, `redo.md`; the review comment; `git diff 91ee59e..HEAD`; the
first-run design spec at `3383663`.

---

## 1. Projected entries (WAY-126)

Rule applied: an entry is made true when the branch's code holds what its binding sentences say;
a clause true only because nothing exists yet (for example "the server computes nothing of the
game" while there is no game) is not made true by code.

### 1.1 Entries the code makes true — all in `foundations/` or proposed

| Projected entry | Verdict | Code evidence | Where it is now |
|---|---|---|---|
| decision "What runs the account and save server?" | whole | `package.json:6` `engines.node 24.x`; `src/server/*.ts`; `scripts/build.mjs:9-16` exits on a tsc failure; `tsconfig.server.json:9` `noEmitOnError` (`11c7cbb`) | written, D-01/1 (`22dbff4`) |
| decision "How does the account and save server handle HTTP requests?" | whole | `package.json:14` express 5.2.1; `src/server/app.ts:1-15` (`11c7cbb`) | written, D-02/1 |
| decision "How is the browser view built?" | whole | `src/browser/main.ts:1-2` DOM only; `tsconfig.browser.json:6` DOM lib; no UI framework in `package.json` | written, D-03/1 |
| decision "What is the game built with?" | part — first sentence only | `src/browser/main.ts` TypeScript compiled for the browser; no simulation, no game state | proposal D-04/1 (`partial-proposals.md` (a)), carried unchanged in the patch except *Scope* |
| decision "What serves the built game and account requests in the container?" | part — no container, no account routes | `src/server/main.ts:3` one process; `src/server/app.ts:6-10` `/api` JSON 404 before `express.static` | proposal D-05/1 (`partial-proposals.md` (b)), carried unchanged in the patch except *Scope*; errors in §1.3 |
| invariant `account-server-runtime/1` | whole | as D-01 | written (`22dbff4`); check at `ab34d90`/`2544a6a` |
| invariant `account-server-typecheck/1` | whole | `scripts/build.mjs:15`, `tsconfig.server.json:9` | written; check |
| invariant `account-server-express-http/1` | whole | `src/server/app.ts` | written; check |
| invariant `browser-view-framework/1` | whole | `src/browser/main.ts` | written; check |
| invariant `loop2-api-error-route/1` | whole | `src/server/app.ts:6-8` | written; check |
| **invariant `loop2-one-serving-process/1`** | **part — "One Express 5 process … serves both the built game and `/api/` … requests"; not "in the loop2 container", not "account and save"** | `src/server/main.ts:3` (one `node dist/server/main.js` process, `package.json:10`), `src/server/app.ts:6-10` (`11c7cbb`) | missing at first report (1.2); since then proposed by the foundation step, `loop2-one-serving-process/1` (fingerprint `1e0b09c2`, derives from D-05@e11aec4d), in the patch (T5) |
| fact `node-24-support-schedule/1` | whole (D-01 *Based on* names it) | — | written |
| term `program` | used by D-03's *Rationale* ("program editor") | — | written |

### 1.2 Finding that sends the task back to the foundation step

**The code makes part of the projected invariant `loop2-one-serving-process/1` true, and the
foundation step neither wrote nor proposed that part.** The orchestrator's ruling C2 named only
the two decisions; the foundation step put the one-process rule into D-05 as an unapproved level 2
pair and noted the shortened invariant as an alternative it did not draft
(`foundation-step.md:167-173`, `partial-proposals.md:399-402`). Under WAY-126 a part of a
projected entry the code makes true enters as a proposal; under step 11 such an invariant sends
the task back to its foundation step, and a part of an invariant waits for the human's acceptance
before its dependent code (WAY-03), then gets its check and break from separate agents and the
code is redone against it (WAY-69). Not drafted here, as instructed. Consequence for D-05: if that
part is accepted, D-05's *Verification* can return to the gate's `level 1 — invariants:
loop2-one-serving-process · loop2-api-error-route` and the unapproved level 2 pair goes. The
route must be recorded again (WAY-13). → To decide T5.

Earlier candidate H1 ("GET / returns the built HTML … GET /main.js its script") is the
"serves the built game" half of this projected invariant and of D-05's first sentence; it is not
proposed as a new entry (WAY-126).

### 1.3 Errors found in the carried proposals D-04 and D-05 (fixes are questions)

1. **D-05 *Relations* blocked the merge.** As drafted it read `TODO — narrows D-02@06e6d3d8 and
   the projected decision "What public address …"`; accepting D-05 only moved the merge error from
   `loop2-api-error-route` to D-05. After the critique (O2) the patch carries
   `derives from D-02@06e6d3d8`: D-05 serves D-02 (D-02's rationale foresees Express serving the
   built game in one process) and does not go against it in a narrower area, which is what
   `narrows` means (WAY-32). The gate's "narrows" goes back to the human. → T3.
2. **D-05's level 2 pair was unapproved wording standing in for a projected invariant's part**
   (1.2); the foundation step has since replaced it with `loop2-one-serving-process` at level 1.
   → T5.
3. D-04's violating example "a plain JavaScript source file" also caught `scripts/build.mjs` and
   `tests/*.mjs`. After the critique (O9) the patch carries the fixed pair; level 1 would be
   possible, level 2 is kept as at the gate. → T2.

The patch carries D-04 and D-05 with *Scope* filled (WAY-37) and the fixes above.

### 1.4 Every projected entry, one line each

Decisions (44):

| # | Projected decision | Code makes it true? | Why not / note |
|---|---|---|---|
| 1 | How is the work of the game split between the server and the browser? | part at most — the human's call | no accounts, no saved state, no game; "computes nothing of the game" is true only by absence, as "runs in the browser" is for D-04's empty page; after the critique proposed as partial D-07/1 (T4 option E) |
| 2 | Who can create and use a player account? | no | no accounts |
| 3 | How does a player sign in and reset a forgotten password? | no | no sign-in |
| 4 | Which service delivers account emails? | no | no email |
| 5 | How does the account server send email through Outsider? | no | no email |
| 6 | How are player passwords hashed and checked? | no | no passwords |
| 7 | How is a player's login kept between requests? | no | no sessions |
| 8 | Which library maintains player sessions? | no | no sessions |
| 9 | What happens to unsaved progress when a session expires? | no | no sessions, no progress |
| 10 | What is the game built with? | **part** | D-04 proposal |
| 11 | How is the browser view built? | **whole** | D-03 |
| 12 | What runs the account and save server? | **whole** | D-01 (no deployment exists; the check reads "before deployment" as before the build a deployment would run — `check-author.md` §2) |
| 13 | How does the account and save server handle HTTP requests? | **whole** | D-02 |
| 14 | How does the browser exchange saved game states with the server? | no | the browser sends no request |
| 15 | Where are player accounts and saved game states stored? | no | no store |
| 16 | Which failure does the database backup survive? | no | no database |
| 17 | How does the account and save server access SQLite? | no | no database |
| 18 | Where does the MVP run? | no | no container, no public address |
| 19 | What public address do the game and account server share? | no | no public HTTPS origin; the browser sends no `/api/` request |
| 20 | What serves the built game and account requests in the container? | **part** | D-05 proposal |
| 21 | Where does the game's content live? | no | no content |
| 22 | Where does the simulation's randomness come from? | no | no simulation |
| 23 | What happens to a saved game state of another version? | no | no saved state |
| 24 | When and how is the time away computed? | no | no catch-up |
| 25 | How does a character act by its program? | no | no characters |
| 26 | What does a program rule show the player? | no | no programs |
| 27 | Who owns a program? | no | no programs |
| 28 | Whose is the knowledge of the world, and what may a character use of it? | no | no game |
| 29 | What does an archetype open to a character? | no | no game |
| 30 | When does the player learn what the world holds? | no | no game |
| 31 | What describes a character? | no | no game |
| 32 | What is a map made of? | no | no maps |
| 33 | How does a character move? | no | no game |
| 34 | How does a program point at things of the world? | no | no game |
| 35 | How is a map solved, and what opens the next one? | no | no maps |
| 36 | How does combat go? | no | no game |
| 37 | How fast does the earning loop go? | no | no game |
| 38 | How does a character skill grow? | no | no game |
| 39 | What pays, and what takes from the chest? | no | no game |
| 40 | What does a character's death take? | no | no game |
| 41 | Whose is the chest? | no | no game |
| 42 | How do items go into a map run and out of it? | no | no game |
| 43 | What does a mage pay for spells with? | no | no game |
| 44 | How does a change reach the server? | no | no deploy automation |

Invariants (36): made true whole — `account-server-runtime`, `account-server-typecheck`,
`account-server-express-http`, `browser-view-framework`, `loop2-api-error-route` (all written);
made true in part — `loop2-one-serving-process` (missing, 1.2); not made true —
`player-self-registration`, `player-save-isolation`, `blocked-account-access`,
`player-password-login`, `email-verification-nonblocking`, `password-reset-verified-email`,
`account-email-via-outsider`, `account-email-nodemailer-starttls`, `player-argon2-password-hash`,
`player-argon2-deployment-check`, `player-opaque-session-cookie`, `player-server-session`,
`player-express-session-sqlite-store`, `expired-session-unsaved-progress`,
`account-save-sqlite-store`, `account-save-durable-storage`, `account-save-backup`,
`account-save-sqlite-access`, `account-save-sqlite-upgrade` (no accounts, sessions, email or
database); `loop2-container-isolation`, `loop2-distinct-address` (no deployment, no public
address); `loop2-shared-public-origin`, `saved-state-http-exchange` (the browser sends no request,
no HTTPS origin); `map-run-repeatability`, `simulation-randomness`, `save-version`,
`catch-up-state`, `streak-program-change`, `solved-map-manual-run`, `character-team` (no game).

Glossary (19): `program` written (used in D-03's *Rationale*). Not written, because no written
or proposed entry of this branch uses them: `program rule`, `rule group`, `map run`,
`manual map run`, `completion`, `solved map`, `streak`, `earning loop`, `catch-up`,
`game minute`, `character skill`, `practice`, `trait`, `predisposition`, `archetype`,
`Understanding`, `repertoire`, `trip plan`. (`program`'s definition uses `program rule` and
`trip plan`; orchestrator answer Q3 left them unwritten. Option A of T4 would bring
`map run`, `earning loop`, `catch-up`.)

Environment facts (2): `node-24-support-schedule` written; `mikrus-outsider-mail` not (no email).

**Conclusion of §1:** no projected entry made true *whole* is missing from `foundations/`. One
projected *part* was missing (`loop2-one-serving-process`), which sent the task back to the
foundation step; it is now proposed (T5). After the critique, the work-split sentence "the server
computes nothing of the game" is proposed as partial D-07/1 too (T4, option E).

---

## 2. First-run proposals re-evaluated

Source: `.runs/task-cycles/app-skeleton/prev-run/return/foundations/{decisions,invariants,part_map}.md`,
`human-review-candidates.md`.

| First-run proposal | Result | Reason (WAY-126 / WAY-36) | What binds after the merge if accepted |
|---|---|---|---|
| `unmatched-api-response/1` | **withdrawn** (human's order) | duplicates projected `loop2-api-error-route` | — |
| `application-type-check/1` | **withdrawn** (human's order) | duplicates projected `account-server-typecheck` (server half). Its browser half (browser types checked, no emit) is stated by no entry; per the order it goes unbound — noted, not re-proposed | — |
| `missing-page-response/1` ("a request outside the API paths that matches no public file receives status 404 rather than the home page") | **withdrawn on re-evaluation; product question to the human (T6.3)** | Stated by no projected entry. The code (`src/server/app.ts:11-13`), README ("Pozostałe brakujące ścieżki otrzymują zwykłe 404"), the first-run spec and `tests/http.test.mjs` all answer a plain 404 today. The withdrawal rests on one reading of the gate rationale's "must set static-file and fallback rules carefully", which does not say what the fallback is; withdrawing is cheaper and keeps room to serve the game page on unknown paths later | — (the plain 404 stays as code and ordinary test, changeable by any later task) |
| build decision "[prefix]-01 — How are the browser and server built together?" | **kept as D-06/1**, type-check clause and HTML-copy clause dropped, *Origin* `none` (O4) | no projected entry states one package and lockfile, or separate compilations and output directories; the HTML copy described today's build mechanism, not a rule | every later change keeps one npm package and lockfile, separate browser/server TypeScript configurations and output directories, and a build that compiles both; a bundler or workspaces need a new version of D-06 |
| `application-build-layout/1` | **kept**, derives from D-06@094e6fa7 | not stated elsewhere | a check (once written) fails a second package/lockfile or merged configurations |
| `application-build-output/1` | **kept**, reworded to "Building the application compiles both the browser and the server TypeScript configurations." (O4), derives from D-06@094e6fa7 | not stated elsewhere; D-05 says the built files are served, not how they are built | a build that skips either compilation breaks it |
| `public-file-boundary/1` | **kept**, reworded to "The server serves static files only from the built public directory, whatever working directory its process starts in." (O5); after the panel *Derives from* `none` and not on D-05's *Verification* (fix 5); whether it rides in this change is T6.1 | not stated elsewhere (D-05 says what is served, not from where); trust-boundary rule of the static handler (`src/server/app.ts:9-10`, `tests/http.test.mjs:86-99`) | static files come only from the built public directory, whatever the working directory a container starts the process in; how the directory is found stays free |
| H1 page delivery | **not proposed** | stated by D-05's first sentence and by projected `loop2-one-serving-process` | via T5 |
| H2 occupied address | **kept as `account-server-occupied-address/1`**: "When the account and save server's listening address is already in use, the server process exits with a non-zero code without printing its readiness line `Loop: <address>`." (O6, then panel fix 2: the error message prints the address, `src/server/main.ts:5`; the readiness line on stdout, `main.ts:10`, is the signal, which `tests/startup.test.mjs:31` forbids on an occupied port) | stated by no projected entry; one recorded case (`de3ceb3`), covered today only by the ordinary test `tests/startup.test.mjs` | a failed listen ends the process with a non-zero code and no readiness line, which a container's restart rule will rely on |
| five parts | **kept, two renamed**: `browser-page` → `browser-view`, `server-http` → `account-server` | no projected entry holds parts (part-map projected mode leaves new parts to the breakdown); renamed so the map uses the words D-01..D-03 and the five invariants already use ("browser view", "account and save server") | file assignment, *Scope* and *Part* reach (§3.5) |
| first-run "no glossary term, no fact" | re-evaluated in §3.3–3.4 | — | — |

Withdrawn identifiers never reached any branch, so they leave no row in a withdrawn list
(`rules.md`, "Withdrawn identifiers").

Recommendation on the kept proposals (T6): accept D-06 with both invariants and
`public-file-boundary`; accept `account-server-occupied-address`. All four new invariants carry
`Method: TODO` and are reported `unchecked`; if accepted, separate agents write their checks and
breaks and the code is redone against them in the next correction round, as this round did for the
five written invariants (WAY-69, O7). Rejecting them leaves the behaviour to the ordinary tests.

---

## 3. Return step proper (WAY-11)

### 3.1 New rules and decisions

- D-06/1 and its two invariants (§2) — the build layout, the only durable structural choice of
  the diff that no entry states.
- No other new decision: every other durable rule of the diff is stated by a projected entry
  (D-01..D-05) or is a choice that ends with this request (`choices.md`).

### 3.2 Code behaviour with no invariant over it

| Behaviour | Evidence | Route |
|---|---|---|
| one process serves the built page and `/api/` | `src/server/main.ts:3`, `app.ts:6-10` | projected invariant part → foundation step (T5) |
| GET `/` and `/main.js` return the built files | `app.ts:9-10`; `tests/http.test.mjs:53-63` | same (H1) |
| static files only from `dist/public`, independent of the working directory; traversal refused | `app.ts:9`; `tests/http.test.mjs:17-28,86-99` | proposal `public-file-boundary/1` |
| build compiles both configurations and copies the HTML | `scripts/build.mjs:9-21` | proposal `application-build-output/1` |
| one package and lockfile; separate configurations and outputs | `package.json`, `tsconfig.*.json` | proposal `application-build-layout/1` |
| occupied address → non-zero exit, no ready line | `src/server/main.ts:3-11` (`de3ceb3`); `tests/startup.test.mjs` | proposal `account-server-occupied-address/1` |
| browser types checked, browser build refuses type errors | `scripts/build.mjs:10-15`, `tsconfig.browser.json:9` | unbound by the human's withdrawal of `application-type-check`; not re-proposed |
| `/api` without the trailing slash → JSON 404 | `app.ts:6`; `README.md:25` | unbound (the human withdrew `unmatched-api-response`; `loop2-api-error-route` names `/api/`) |
| non-API missing path → plain-text 404 | `app.ts:11-13` | left unbound on purpose (§2, `missing-page-response`) |
| HEAD on `/api` → no body; ready line text; `npm run dev` without watching | `README.md`, `main.ts:10` | choices within the request; nothing binds |

### 3.3 Environment facts

None proposed. Checked: (1) the checks rely on the `router` package's debug line and on
`_winapi`/PowerShell on Windows — facts about what runs a method, which an invariant does not rest
on (environment-facts template, "Which facts are written"), and a fact stands only while an entry
names it; (2) `main.ts` relies on Express 5 passing a listen error to the callback — how the code
achieves `account-server-occupied-address`, not a condition of its sentence; (3) TypeScript 7's
packaging — would be needed only if the human makes the compiler major a decision (T8), and its
source is not read here. The WAY-90 finding about D-01/D-02 *Based on* (`foundation-step.md:91-97`)
is about gate-approved wording, carried as T10.

### 3.4 Words the glossary does not settle

| Word | Where | Finding | Route |
|---|---|---|---|
| "API error response" | `loop2-api-error-route/1`; D-05 says "API error" | the check reads it as status 400–599 with a JSON media type and a JSON body (`check-author.md` §5); a reader of the sentence would also call a plain-text 404 from `/api/` an API error response | no term: a definition holding "JSON" would carry a rule (glossary template, "The definition" — WAY-96). It is a reading of the accepted check → T7 row "JSON reading" |
| "deployment" ("before deployment", "deployment use Node.js 24") | D-01, `account-server-runtime`, `account-server-typecheck` | no deployment exists; the checks read it as the build a deployment would run, and fail once a deployment file appears (tripwire) | left to the deployment task, which the tripwire forces to settle it → T7 |
| "program" | glossary, D-03 | second meaning "the program a command runs" in the-way's templates (`foundation-step.md:156-165`) | keep; non-blocking → T9 |
| "program rule", "trip plan" | used inside the definition of `program` | not written (no use outside the glossary yet) | T9 |

### 3.5 Part-map changes — the first map

Five parts, proposed in the patch (`foundations/part_map.md`):

| Part | Responsibility (binding sentence) | Trust boundary |
|---|---|---|
| `browser-view` | The part draws the game's screens in the browser. | none |
| `account-server` | The part is the account and save server: it serves the built game and handles the HTTP requests sent to it. | `src/server/**` (first run: `src/server/app.ts`; widened because every later route file under `src/server` takes request data) |
| `build-tools` | The part installs dependencies, checks types and builds and launches the application. | `package-lock.json` (new: the lockfile takes in third-party packages from the npm registry) |
| `agent-workflow` | The part directs and records the work performed on this repository. | none |
| `product-foundation` | The part holds the product rules and the map of its responsibilities. | none |

External context (proposed rows): `HTTP clients | both | untrusted | no` (first run) and
`npm registry | them → us | untrusted | no` (new). Criticality scale, change paths, files left
out on purpose: empty.

**Left to the human, never filled here:** *Failure modes* of every part (what fails, damage,
severity, detection), the degrees of the criticality scale and any critical flow. The patch writes
`TODO — question for the human: …` in *Failure modes*; the part-map guard rejects that form, which
keeps the map from merging until the human answers (T1c). *Depends on* is drafted in the patch
from what the code reaches for (critique O3; the template reserves only failure modes and
separations to the human): browser-view `none`; account-server `browser-view · build-tools`;
build-tools `browser-view · account-server`; agent-workflow `product-foundation`;
product-foundation `none`. Open point: account-server and build-tools then depend on each other;
the guard accepts it and no the-way rule was found either way (T1b). Evidence — what the code
reaches for today: `build-tools` → `browser-view`,
`account-server` (`scripts/build.mjs` compiles both and copies `src/browser/index.html`);
`account-server` → `browser-view`'s built output at run time (`app.ts:9`, no import);
`account-server` tests → `build-tools` (`npm run build` in `package.json:12`);
`agent-workflow` → `product-foundation` (skills write it); `product-foundation` → nothing.

Assignment of every file git tracks at `2544a6a` (50 files; the guard on the proposed map
reports none unclaimed and none claimed twice):

| Part | Files |
|---|---|
| `agent-workflow` (26) | `AGENTS.md`; `.agents/**` (11 skill files); `.claude/**` (`.claude/rules/the-way.md` + 11 skill files); `.gitmodules`; `.the-way` (gitlink) |
| `product-foundation` (5) | `foundations/decisions.md`, `environment_facts.md`, `glossary.md`, `invariants.md`, `part_map.md` |
| `build-tools` (10) | `package.json`, `package-lock.json`, `tsconfig.browser.json`, `tsconfig.server.json`, `scripts/build.mjs`, `.gitignore`, `README.md`, `tests/invariants/loop2_invariant_support.py`, `tests/invariants/test_account_server_runtime.py`, `tests/invariants/test_account_server_typecheck.py` |
| `browser-view` (3) | `src/browser/index.html`, `src/browser/main.ts`, `tests/invariants/test_browser_view_framework.py` |
| `account-server` (6) | `src/server/app.ts`, `src/server/main.ts`, `tests/http.test.mjs`, `tests/startup.test.mjs`, `tests/invariants/test_account_server_express_http.py`, `tests/invariants/test_loop2_api_error_route.py` |
| left out on purpose | none |

Why the invariant checks sit where they do (WAY-44, tests belong to the part they test): the
runtime and typecheck checks test what `package.json`, the lockfile, `scripts/build.mjs` and
`tsconfig.server.json` hold (`redo.md` names exactly those as the covered code) → `build-tools`;
the shared support module serves every check and the whole repository → `build-tools`; the
express and API-route checks test `src/server` → `account-server`; the view check tests
`src/browser` → `browser-view`. The checks' method names `tests/invariants`, so a change to any of
these files reaches all five invariants whatever part it is in (WAY-62).

*Scope* values proposed (WAY-21; parts that the decision governs; comma-separated as the
decisions guard reads them):

| Decision | Scope |
|---|---|
| D-01 | account-server, build-tools |
| D-02 | account-server, build-tools |
| D-03 | browser-view, build-tools |
| D-04 (proposed) | browser-view, build-tools |
| D-05 (proposed) | account-server, build-tools |
| D-06 (proposed) | build-tools, browser-view, account-server |
| D-07 (proposed, option E of T4) | account-server |

*Part* values proposed (WAY-62; where a change can make the sentence false; doubt names more):

| Invariant | Part | Which change can make it false |
|---|---|---|
| `account-server-runtime/1` | every (unchanged) | engines and types in `build-tools`; server code in `account-server`; deployment files, which no part holds yet |
| `account-server-typecheck/1` | every (unchanged) | build script and configuration in `build-tools`; a deployment route, which no part holds yet |
| `account-server-express-http/1` | every (unchanged; panel fix 8) | server code; the express dependency; anything else in doubt |
| `browser-view-framework/1` | every (unchanged; panel fix 8) | browser code; runtime dependencies; DOM lib; anything else in doubt |
| `loop2-api-error-route/1` | every (unchanged, O10) | middleware order; build output; a future deployment file such as a proxy in front of Express, which no part holds yet |
| `loop2-one-serving-process/1` (proposed by the foundation step) | every | the same reason: a second serving process can come from a deployment file no part holds yet |
| `application-build-layout/1` (proposed) | build-tools · browser-view · account-server | a second package or merged configuration in any code part |
| `application-build-output/1` (proposed) | build-tools · browser-view · account-server | build script; source and output locations |
| `public-file-boundary/1` (proposed) | account-server · build-tools | static handler; output directory |
| `account-server-occupied-address/1` (proposed) | account-server · build-tools | listen handling; the `start` script |

### 3.6 Foundation compared with the code it touches

- D-01, D-02, D-03 and the five written invariants match the code; the five checks pass at
  `2544a6a` (`check-author.md` "After code review": 23 tests, exit 0) and each fails on its own
  deliberate break and no other (`break-runs.md`, second table).
- D-04 and D-05 (proposed) match the code in what they keep.
- D-05's *Rationale* (projected wording) expects an explicit cache policy for static files;
  `app.ts:10` uses `express.static` defaults. Not a contradiction (prose binds nothing); noted for
  the deployment task.
- D-02 *Verification* differs from the gate text by one letter (`invariant:` →
  `invariants:`, orchestrator answer Q1); outside the binding part, fingerprint unchanged. → T10.

---

## 4. Autonomous choices

Full table: `C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-1\return\choices.md`
(41 rows from both logs). Result: 5 routed to the foundation (proposals in the patch, or entries
already written that the human reviews), 9 to *To decide*, 3 superseded or re-evaluated in this
step, 2 forwarded questions, 22 stay choices within the request. The explicitly named ones:

| Choice | Reaches beyond the PR? | Binds after the merge? | Route |
|---|---|---|---|
| fixed 127.0.0.1:3000 | yes — the invariant checks hard-wire it (`loop2_invariant_support.py:24-25`; since `2544a6a` they also fail when the port stays held, `:278`); a container needs another bind address | not as a chosen rule; only through the read-only checks | To decide T7 |
| TypeScript 6.0.3 instead of 7.0.2 | yes — later code is compiled by it; a major upgrade later touches more code | no — no entry or check names the compiler major | To decide T8 |
| `@types/node` 24.19.0 | no — a patch level; the runtime check binds only the major (`test_account_server_runtime.py:30,72-78`) | — | within the request |
| Python dependency of the checks | yes — every later check runs under Python `unittest` | yes, but stated by the-way's gate at the pin (`.the-way/gate/run_tests.py:1-8`); the product adds `git`, `npm` and on Windows PowerShell on PATH | no product entry; T7 row |
| tripwire on deployment files | yes — the first Dockerfile, CI workflow or `.nvmrc` fails `account-server-typecheck` until its check is extended in a foundation step | yes, through the accepted test (`test_account_server_typecheck.py:90-93`) | part of the invariant test awaiting acceptance; T7 |
| Express check on `router` debug output | yes — an Express/router upgrade that changes the debug line fails the check | yes, through the accepted test (`test_account_server_express_http.py:44,144`) | part of the invariant test awaiting acceptance; T7 |

Record gap for the orchestrator: the root's answers to the check author's questions Q1–Q7
(`check-author.md` "Questions") are not in `cycle.md`; only "Q6 accepted" and "Q1 goes to the
request" can be read from `check-author.md` "After code review". The classification uses the
check author's proposed answers as the provisional choices.

---

## 5. Deferred `TODO` fields that block the merge

Guard runs on `ab34d90` (as committed) — decisions `--merge-onto`: 5 errors (D-01 *Scope*,
*Relations*; D-02 *Scope*; D-03 *Scope*, *Relations*); invariants `--merge-onto`: 1 error
(`loop2-api-error-route` *Derives from*). rules.md: the main branch holds `TODO` only in an
invariant's or fact's *Method* and an invariant's *Rests on*.

| Field | Exact question for the human | Options and cost | Recommendation |
|---|---|---|---|
| *Scope* of D-01, D-02, D-03 (and of the proposals D-04..D-07) | T1a: Do you accept the five parts and the file assignment? | **accept** — *Scope* becomes fillable with the values of §3.5. **reject** — *Scope* stays `TODO`; no merge. The map itself also needs T1b (dependencies, drafted) and T1c (failure modes) before it passes its guard | accept |
| *Relations* of D-03 | T2: Do you accept D-04/1 (first sentence of "What is the game built with?") so that D-03 reads `derives from D-04@b703ab2a`? | **accept** — clears it; D-04 grows to the full gate wording when the simulation arrives (WAY-31 then rechecks D-03). **write the projected decision whole now** — binding sentences about a simulation that does not exist (against WAY-01 and WAY-126). **reject** — D-03 stays `TODO`; no merge | accept |
| *Derives from* of `loop2-api-error-route` | T3: Do you accept D-05/1 with *Relations* `derives from D-02@06e6d3d8` in place of the gate's "narrows …"? | **accept with `derives from`** (in the patch) — clears both; `derives from` says D-05 serves D-02, as D-02's rationale foresees; the relation to "What public address …" returns when D-05 is written whole. **keep the gate's `TODO — narrows …`** — the merge error moves to D-05. **`narrows D-02` alone** — would tell later agents that D-05 overrides D-02 in some area, which it does not (WAY-32). **change the-way** (T11) | accept with `derives from` |
| *Relations* of D-01 | T4: How should D-01 point to "How is the work of the game split between the server and the browser?" | **E. partial D-07/1 "The server computes nothing of the game."** (in the patch) — D-01 `derives from D-07@8ab1f8bc`; same route as D-04/D-05; whether "computes nothing" counts as made true by code is the human's call; cost: one more partial entry, D-07/2 later flags D-01 as it should. **A. whole decision now** — contradicts WAY-01 ("a planned feature is written into the foundation before it is built") and WAY-126, and the deviation stays on main; brings three terms. **B. `none`** — false; the relation can be lost. **C. keep `TODO`** — no merge until the accounts task. **D. change the-way** (T11) | E; D to the-way independently |

Guard runs on the patched tree — scratch clone of the worktree at `ab34d90` with `.the-way`
initialised at `96c5248`, patch applied, `--base 91ee59e295b8e0b024c4af1d4d1318738ab8f29e`:

| Guard | `--base` only | `--base` + `--merge-onto 91ee59e…` |
|---|---|---|
| decisions | 4 errors (*Approved by* `on acceptance` in D-04, D-05, D-06, D-07), 0 warnings | 4 errors, the same; no `TODO` and no fingerprint errors |
| invariants | 0 errors, 0 warnings | 0 errors, 0 warnings |
| glossary | 0 | 0 |
| environment facts | 0 | 0 |
| part map | 10 errors, all from the `TODO` in *Failure modes* (2 per part); 0 unclaimed files; 1 unchecked (no dependency-graph command) | — (the guard takes no `--merge-onto`) |

The 4 decision errors disappear when acceptance writes `Mariusz, <date>` in *Approved by*; the 10
map errors when the human answers T1c (or accepts `none`, which was tried earlier: 0 errors).
`git apply --check` of the patch from the repository root: exit 0 at `ab34d90` and at `2544a6a`.
Not applied.

---

## To decide (English; the Polish version with plain-language costs is in `proposal-pl.md`)

Blocking the merge:

- **T1a** Accept the five parts and the assignment of all 50 files? Recommendation: accept.
- **T1b** Accept the drafted *Depends on* (in the patch): browser-view none; account-server
  browser-view · build-tools; build-tools browser-view · account-server; agent-workflow
  product-foundation; product-foundation none. Open point: account-server and build-tools depend on
  each other (guard accepts it; no the-way rule found). Recommendation: accept.
- **T1c** Failure modes now (needs a criticality scale written first) or `none` now (every part
  counts at the highest criticality: every change, even a README typo, gets the full review loop
  with separate reviewers, the panel and full tests, until failure modes are recorded and a
  lowering accepted)? Recommendation: `none` for now; assess when accounts and saves exist.
- **T2** Accept D-04/1 with the fixed complies/violates pair (level 1 would be possible; level 2
  kept as at the gate)? Recommendation: accept.
- **T3** Accept D-05/1 with *Relations* `derives from D-02@06e6d3d8` instead of the gate's
  "narrows the projected decisions "How does the account and save server handle HTTP requests?" and
  "What public address do the game and account server share?""? `derives from` fits because D-05
  serves D-02 (D-02's rationale foresees one process serving the built game); `narrows` would tell
  later agents that D-05 overrides D-02 somewhere, which it does not. Recommendation: accept.
- **T4** D-01 *Relations*: E (partial D-07/1) / A / B / C / D. Whether "the server computes nothing
  of the game" counts as made true by code is your call. A contradicts WAY-01 and WAY-126.
  Recommendation: E, with D proposed to the-way.
- **T5** Accept the foundation step's proposed `loop2-one-serving-process/1` ("One Express 5 process
  serves both the built game and `/api/` requests.", derives from D-05@e11aec4d, *Part* `every`,
  *Method* `TODO` until a citing check exists — panel fix 1) with D-05's *Verification* at the
  gate's level 1? Then check, break and code redo by separate agents, and the method returns to the
  gate command. Recommendation: accept.

Not blocking:

- **T6** (1) = panel Q1: which of the new entries — D-06/1, `application-build-layout/1`,
  `application-build-output/1`, `public-file-boundary/1` (now *Derives from* `none`),
  `account-server-occupied-address/1` (now about the readiness line) — ride in this change, and
  which go as a later proposal? All now: checks, breaks and code redo in the next correction round
  by separate agents, `Method: TODO` = unchecked until then, and `application-build-layout` splits
  in two (WAY-56). Only D-06 + `application-build-output` (panel's recommendation): cost — D-06's
  first sentence is left with no derived invariant (a level-2 pair or the split invariants later).
  None: everything stays with the ordinary tests. Recommendation: as the panel. (2) Product question: should unknown non-API paths keep a plain 404 for good (bind it), or stay
  free so that a later task may serve the game page there? Today code, README and the ordinary test
  answer 404; the withdrawal of `missing-page-response` rests on one reading of the gate's
  unspecified "fallback". Recommendation: withdraw (leave free).
- **T7** Readings built into the accepted invariant checks (each binds after the merge because
  invariant tests are read-only): fixed 127.0.0.1:3000; deployment-file tripwire; `router` debug
  line; "API error response" read as 400–599 + JSON; `.tsx` counted as a framework format and
  jQuery allowed; Python + git + npm (+ PowerShell on Windows) to run them; they read the working
  tree with untracked files and the real `node_modules`. After panel fixes 9–10 (applied to the
  checks by the panel's decision) version pins no longer trip the tripwire and reading
  `document.body`/`head`/`documentElement` no longer counts as rendering. Recommendation: accept all
  for now; the deployment task revisits the port, the tripwire and "deployment" in one foundation
  step. Panel Q4: cut the runtime check's unexercised deployment parsing (known false-pass hole)?
  Recommendation: cut, only together with the tripwire kept. Panel Q5: record the `router` debug
  line as an environment fact? Recommendation: no — a fact about what runs a method is not one an
  invariant rests on, and no entry could name it.
- **T8** Should a separate small task try TypeScript 7.x before game code grows? (This request
  stays on 6.0.3.) Recommendation: yes.
- **T9** Keep the glossary word `program` despite its second meaning in the-way's templates;
  leave `program rule` and `trip plan` for the task that first uses them. Recommendation: keep.
- **T10** D-02 *Verification* `invariant:` → `invariants:` (one letter, outside the binding part);
  D-01/D-02 *Based on* citations kept as approved despite the WAY-90/WAY-80 finding.
  Recommendation: accept the letter; leave the citations until a task changes those decisions.
- **T11** Proposal for the-way: a legal form on the main branch for a relation (decision
  *Relations*, invariant *Derives from*) whose target is a projected entry of an approved
  definition not yet written, found and fixed by WAY-37 when it arrives.
- **T12** = panel Q3: D-04/1, D-05/1, D-07/1 are accepted as WAY-126 partial proposals with
  *Approved by* the accepting human and date (panel fix 4, never the gate's date). When their
  remaining approved sentences arrive later as /2, which *Approved by* do they carry — the gate
  record (2026-10-04, as WAY-126 reads, though earlier than /1) or a fresh acceptance?
  Recommendation: the gate record; possibly ask the-way to settle it.

---

## After critique

Critique: `C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-1\critique.md`
(fresh critic). The orchestrator, as author, applied all ten observations (provisional, not human
approval). Before applying, the current versions were read: the foundation step had added
`loop2-one-serving-process/1` (fingerprint `1e0b09c2`, recomputed here and matching; derives from
D-05@e11aec4d, *Part* `every`) and D-05's *Verification* at the gate's level 1 to the patch and to
`proposal-pl.md`. Everything below was applied to that version.

| Observation | What changed |
|---|---|
| O1 — T4 lacked the partial route | New proposed D-07/1 "The server computes nothing of the game." in the critique's wording (fingerprint `8ab1f8bc`, computed with `.the-way/relation-model/fingerprint.py`; the guard reports no fingerprint error); D-01 *Relations* `derives from D-07@8ab1f8bc` in the patch; option E added and recommended in T4; A–D kept with costs; A stated plainly as contradicting WAY-01 and WAY-126; "is 'computes nothing' made true by code?" named as the human's call. Polish: D-07 whole with translation in Part B |
| O2 — `narrows` misused | D-05 *Relations* `derives from D-02@06e6d3d8` in the patch; T3 quotes the gate's "narrows …" and explains in one sentence each why `derives from` fits and what `narrows` would tell later agents; §1.3 and §5 updated |
| O3 — T1 unanswerable | T1 split into T1a (parts + file table), T1b (drafted *Depends on*, in the patch; mutual account-server ↔ build-tools dependency flagged as open), T1c (failure modes now, which needs a criticality scale first, vs `none` now = highest criticality, with what the sharpest level costs here); §3.5 updated |
| O4 — D-06 bound a mechanism | D-06 sentences without the HTML copy (fingerprint `094e6fa7`), *Origin* `none`; `application-build-output/1` reworded; both build invariants derive from D-06@094e6fa7 |
| O5 — `public-file-boundary` bound how the directory is found | Reworded to "The server serves static files only from the built public directory, whatever working directory its process starts in."; *Derives from* D-05@e11aec4d proposed (T6.2, recommendation yes); D-05 *Verification* lists it in the patch |
| O6 — undefined "ready" | `account-server-occupied-address/1` reworded to "… exits with a non-zero code without printing the address it listens on." |
| O7 — no owner for `TODO` methods | T6 states that accepted new invariants get their checks, breaks and code redo in the next correction round by separate agents, unchecked until then; or the human rejects them and leaves the behaviour to the ordinary tests |
| O8 — withdrawal reason was an interpretation | §2 row and T6.3 restate it honestly (code, README, spec and ordinary test answer plain 404 today; the gate's "fallback" is unspecified) and ask the product question directly; recommendation stays "withdraw" |
| O9 — D-04 pair | Fixed complies/violates pair in the patch and in Polish; T2 says level 1 would be possible and level 2 is a conscious choice |
| O10 — minor | `loop2-api-error-route` *Part* back to `every` (as written in `foundations/`; the patch no longer narrows it) and `loop2-one-serving-process` stays `every`, both with the reason (a future deployment file no part holds); the four `on acceptance` guard errors explained (§5, Polish glossary); Polish glossary added for "bramka gotowości", "bramka testów", "strażnik formatu" and "on acceptance"; T8 rephrased to "should a separate small task try TypeScript 7.x before game code grows?" |

Also updated: `choices.md` rows F3, F13, C2, C4, FQ5. Guard counts above (§5) are from the patched
tree after these changes. Not changed: `foundations/` in the real worktree, code, tests; no commit.

---

## After panel

Panel settlements:
`C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-1\panel-settlement-ab.md` and
`C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-1\panel-settlement-ba.md`.
Both orders agree: accept with fixes, the same ten fixes. Applied here only the fixes that change
unapproved proposals; fixes 3 (failure modes and scale) and 4 (*Approved by* on acceptance) stay
with the human; fixes 9–10 are test mechanics, applied to the checks by the panel's decision (seen
uncommitted in `tests/invariants/` of the worktree; not mine).

| Fix | What changed in the patch, `proposal-pl.md` and this report |
|---|---|
| 1 | `loop2-one-serving-process/1` *Method* `` `TODO` `` (a gate command with no citing check would give `error` on every run); returns to the gate command when its check is accepted |
| 2 | `account-server-occupied-address/1`: "… exits with a non-zero code without printing its readiness line `Loop: <address>`." The signal chosen is the readiness line on stdout (`src/server/main.ts:10`), which `tests/startup.test.mjs:31` forbids on an occupied port; the error message on stderr does print the address (`main.ts:5`, required by `startup.test.mjs:30`) |
| 5 | `public-file-boundary/1` *Derives from* `none` (searched: no decision states which directory static files come from); removed from D-05's *Verification*; kept as a proposal; whether it rides in this change → T6.1 |
| 6 | D-07/1 *Rationale*: the gate's sentences on forged progress and the accepted cost restored verbatim ("Players can replace their own saved game states and forge their own progress. The MVP accepts that cost while the saved progress affects only its owner's game; account isolation prevents changing another player's saved state.") |
| 7 | D-04/1 and D-07/1 *Origin* also name `definicja_mvp_loop2.md` § Projected foundation changes as where the full approved entry lives |
| 8 | `account-server-express-http/1` and `browser-view-framework/1` *Part* stay `every`; the patch no longer changes them |

Panel questions merged into *To decide* without duplicates: Q1 → T6.1, Q2 → T3, Q3 → T12 (new),
Q4 and Q5 → T7. `choices.md` rows F13, C4 updated.

Guard runs on the patched tree (scratch clone of the worktree at `ab34d90`, `.the-way` at
`96c5248`, `--base 91ee59e295b8e0b024c4af1d4d1318738ab8f29e`):

| Guard | `--base` only | `--base` + `--merge-onto 91ee59e…` |
|---|---|---|
| decisions | 4 errors (*Approved by* `on acceptance`, D-04…D-07), 0 warnings | 4 errors, the same; no `TODO`, no fingerprint errors |
| invariants | 0 | 0 |
| glossary | 0 | 0 |
| environment facts | 0 | 0 |
| part map | 10 errors (`TODO` in *Failure modes*, 2 per part), 0 unclaimed files, 1 unchecked | — |

`git apply --check`: exit 0 at `ab34d90` and at `2544a6a`. Not applied; no commit.
