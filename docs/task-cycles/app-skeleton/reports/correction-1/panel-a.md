# Panel assessment A — task/app-skeleton, correction 1

## Perspective

**The agent that will work under the change.** I took the foundation as it would stand after the
merge — the entries on the branch at 2544a6a and the unapproved patch
(`UNAPPROVED-proposed-foundation-against-ab34d90.patch`, SHA-256 2b40a626…8dccf, verified), each
both accepted and rejected — and applied it to the later MVP tasks the approved definition
(`definicja_mvp_loop2.md`) names: accounts and sign-in, sessions, saved game state exchange,
SQLite storage, the container deployment, the simulation and the view, plus changes to the current
code. I counted, per situation, whether the foundation gives one answer, two (conflicting) or none.

Material read: manifest, files.txt, the diff `91ee59e..2544a6a` of the 23 files, the patch,
the projected entries of the definition (decisions, invariants, glossary, facts),
`elements/common/{rules,panel}.md`, all five templates, WAY-01/03/10/13/17/19/36/46/61/62/69/126.

## What I ran

- `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/panel-a.jsonl` at 2544a6a
  (port 3000 was free): 23 tests, OK, exit 0. Record: pass lines for exactly five invariants —
  account-server-express-http/1 (7), account-server-runtime/1 (5), account-server-typecheck/1 (3),
  browser-view-framework/1 (6), loop2-api-error-route/1 (2). No line for any other identifier.
- Format guards, `--base`/`--merge-onto` 91ee59e:
  - **branch, patch rejected:** decisions 5 errors (Scope and Relations `TODO`), invariants 1 error
    (loop2-api-error-route *Derives from* `TODO`), part map 50 errors (no part claims any file),
    facts 0, glossary 0. The branch cannot merge without the patch or its equivalent.
  - **patch applied (throwaway worktree, removed):** decisions 4 errors (*Approved by* "on
    acceptance" in D-04…D-07 — placeholders for the human), invariants 0, facts 0, part map 10
    errors (*Failure modes* `TODO` in all five parts). Glossary unchecked there (submodule not in the
    throwaway worktree); the patch does not touch it.

## Situations

(p) = an entry of the patch. "False pass/fail" = the check disagrees with the sentence.

| # | Situation | Entries | Answers |
|---|---|---|---|
| 1 | Accounts: mount `express-session` with a SQLite Store on the whole app | D-02, D-05(p), account-server-express-http, loop2-api-error-route | one |
| 2 | Accounts: CSRF/auth middleware on `/api` answers an unmatched POST with `403 text/plain` | loop2-api-error-route sentence ("API error response") vs its test (JSON 4xx/5xx) | **two** |
| 3 | Accounts: add `argon2` (native) and `nodemailer` | D-01, account-server-runtime, browser-view-framework (lockfile scan) | one |
| 4 | Container: read host/port from env, default changes from 127.0.0.1:3000 | account-server-occupied-address(p); test support hard-codes 127.0.0.1:3000; WAY-03 | one (test mechanics go to the panel) |
| 5 | Save exchange: add `GET/PUT /api/save` JSON routes | D-02, D-05(p), D-07(p), loop2-api-error-route | one |
| 6 | Save: server rejects a save of a stale shape version, or checks its shape | D-07(p) "computes nothing of the game"; its rationale lost the accepted cost of forged progress | **two** |
| 7 | Save: mount a status route at `GET /api/` | loop2-api-error-route (sentence: now matched) vs test (probes `/api/` as unmatched) | one; **false fail** |
| 8 | Storage: `node:sqlite` code and SQL schema under `src/server/` | D-01, part account-server(p) | one |
| 9 | Storage: backup job as a second process in the container | D-05(p), loop2-one-serving-process(p) — it serves nothing | one |
| 10 | Deployment: Dockerfile `FROM node:24-alpine`, runs `npm run build` | account-server-runtime; account-server-typecheck's tripwire; WAY-03 | one (back to the foundation step, by design) |
| 11 | Deployment: build stage `node:24`, final stage installs Node 22 by apt | account-server-runtime test | one; **false pass** |
| 12 | Developer adds `.nvmrc` "24" or a CI workflow running `npm test` | account-server-typecheck test (`DEPLOYMENT_NAME_PATTERNS`, `DEPLOYMENT_PATH_PATTERNS`) | one; **false fail** |
| 13 | Deployment: which part holds the Dockerfile and compose file | part map(p) | none (map update; expected) |
| 14 | Simulation: may a simulation function read `Date.now()`? | D-04(p) holds only "TypeScript, runs in the browser" | **none** |
| 15 | Simulation: `src/sim/**` or `src/browser/sim/**`? | part map(p) browser-view "draws the game's screens"; D-06(p); `tsconfig.browser.json` rootDir | none (open question → breakdown) |
| 16 | Simulation tests compiled by a third tsconfig | D-06(p) "compiles both configurations", application-build-output(p) | **two** |
| 17 | Content: JSON data under `src/browser/data`, copied to `dist/public` | browser-view-framework, D-06(p), public-file-boundary(p) | one |
| 18 | View: add `lit-html` | D-03, browser-view-framework | one |
| 19 | View: add `morphdom` or `@preact/signals-core` (not on the test's list) | D-03 (level 1 only, no complies/violates pair) | **none**; possible false pass |
| 20 | View: vendored PRNG as a `.js` file in `src/browser` | D-04(p) violates-example, browser-view-framework | one |
| 21 | View: analytics script from another origin in `index.html` | browser-view-framework sentence (UI framework) vs built-page test (any foreign script) | one; **false fail** |
| 22 | Server serves `/data/*` from a directory outside `dist/public` | D-05(p) silent; public-file-boundary(p) forbids | **two** |
| 23 | Proposal: compute the catch-up on the server against cheating | D-07(p) violates-example | one |
| 24 | Occupied port: current code prints `Failed to start Loop at http://127.0.0.1:3000` | account-server-occupied-address(p) "without printing the address it listens on" | **two** |
| 25 | Server code imports a module from `src/browser` (later: the simulation) | part map(p) account-server *Depends on* browser-view allows; D-07(p) forbids computing | **two** |
| 26 | Save task completes D-07 with its remaining projected sentences | WAY-126, D-07/1 "on acceptance", D-01 relation fingerprint | **two** (which *Approved by* D-07/2 carries) |
| 27 | Reading "Origin: … D23" in D-07 once the log holds a D-23 | prefix `D-NN` vs the concept log's `D23` | **two** |
| 28 | Any gate run after merge reads loop2-one-serving-process | WAY-61; its Method is the run command, no check cites it | one: never a pass (**false fail**) |
| 29 | Any task: how sharply is it checked? | WAY-13, WAY-46, part map(p) with no failure modes, empty scale | one (highest everywhere), but the map does not pass its guard |
| 30 | Gate run while `npm run dev` holds port 3000 | test support `Server` raises AssertionError | one; **false fail** (recorded `fail`, not `error`) |

Count: one 18 (of which 7 with a false pass or fail of a check), two 8, none 4.
**Patch rejected:** decisions have no Scope, three relations stay `TODO` and the map claims no
file, so situations 1–13 and 25–29 have no part to measure against (WAY-13, WAY-62), and the
branch fails its guards (above). Rejecting the patch outright is not an option. The question is
which parts of the patch to fix.

## Remarks

1. **BLOCKING — loop2-one-serving-process(p) can never pass.** Patched `foundations/invariants.md:57`
   gives it the method `python -B .the-way/gate/run_tests.py tests/invariants --record …`, but no
   check in `tests/invariants/` cites it (record of my run: no line for it). Under WAY-61 "a run that
   records no verdict for the entry never gives it a pass", so every gate reads it as `error`. The
   invariants guard reports 0 errors, so its guard also lets this through. An agent reading the Method
   also takes the entry as checked when it is not.
   Fix: Method `` `TODO` ``, or a citing check accepted with this change (WAY-03), with its break
   written by another agent (WAY-69).

2. **BLOCKING — account-server-occupied-address(p) is false of the current code on its plain
   reading.** Patched `foundations/invariants.md:95`: "exits with a non-zero code without printing
   the address it listens on". `src/server/main.ts:5` prints `Failed to start Loop at
   http://127.0.0.1:3000: …`, and `tests/startup.test.mjs:30` requires that address in stderr. The
   intended meaning (no ready line, `tests/startup.test.mjs:31`) is a second reading. An agent
   writing the check from the sentence, as WAY-69 requires, can assert the address is absent. That
   check fails on correct code.
   Fix: e.g. "…exits with a non-zero code and does not report that it is listening."

3. **BLOCKING — the part map does not pass its guard.** Patched `foundations/part_map.md:10,23,41,54,63`
   hold `TODO` in *Failure modes*, which the form does not allow (10 guard errors). The criticality
   scale is also empty (`## Criticality scale` has no degree), so any severity the human writes fails
   `failure-mode-severity` until the scale exists. The human's answer must give failure modes, or
   `none`, for all five parts **and** the scale. These are questions for the human, not a redraft.
   Until then every part counts as the highest degree (WAY-46). That is safe, but it makes every
   later task take the sharpest checks (WAY-13).

4. **Precondition, not a defect:** *Approved by* "on acceptance" in D-04…D-07 (4 guard errors) must
   become `Mariusz, <date>` when the human accepts. D-04, D-05 and D-07 are shortened projected
   decisions and D-06 is new, so under WAY-126 they need the human's acceptance, not the gate
   date. The patch does this correctly.

5. Not blocking — **the shortened D-04 and D-07 give no pointer to their remaining approved
   wording.** D-04/1 (patched `decisions.md:63`) keeps only "written in TypeScript and runs in the
   browser". The approved "pure functions…, real time enters only as an argument…, the view
   changes nothing" stays only in the definition. A later simulation fix whose sources do not
   include the definition gets no answer (situation 14). Completing D-04 or D-07 later re-flags
   D-03 and D-01 (their `derives from` fingerprints), and leaves open which *Approved by* the
   completing version carries: the gate's 2026-10-04 or a later date (situation 26).
   Fix: name the definition in *Origin* of D-04 and D-07 as the place of the full approved wording.

6. Not blocking — **D-07's rationale lost the accepted cost.** The projected rationale's "Players can
   replace their own saved game states and forge their own progress. The MVP accepts that cost…" is
   the reason an agent needs in the borderline case of situation 6, together with the definition's
   out-of-scope line on server-side progress checks. Fix: restore it. It is rationale, so no
   fingerprint moves.

7. Not blocking — **public-file-boundary(p) is not implied by D-05(p).** D-05 (patched
   `decisions.md:81-82`) says the process serves the built game's files. It does not say "only from
   the built directory". Yet D-05 lists public-file-boundary in *Verification*, so the decision
   allows what its derived invariant forbids (situation 22).
   Fix: add the restriction to D-05's binding sentence (it is a proposal anyway), or set
   public-file-boundary's *Derives from* to `none`.

8. Not blocking — **the typecheck tripwire is wider than deployment.**
   `tests/invariants/loop2_invariant_support.py:298-309` counts `.nvmrc`, `.node-version`,
   `.tool-versions` and `.github/workflows/*.yml` as deployment files, so
   `test_no_deployment_route_left_unread` (`test_account_server_typecheck.py:306-310`) fails on a
   version pin or a test-only CI workflow. Neither makes the sentence false (situation 12). Any
   deployment task also has to go back to its foundation step (WAY-03). That is by design, but it
   is worth stating in the task plan for the deployment.
   Fix (mechanics, for the panel): keep the tripwire to files that build or run an image or a
   platform.

9. Not blocking — **loop2-api-error-route's check is tighter than its sentence.** "API error
   response" is defined only in the test's docstring (JSON 4xx/5xx). A non-JSON 403 from auth
   middleware fails it (situation 2). `UNMATCHED_API_PATHS` treats `/api/` as unmatched, so a
   route mounted there fails it (situation 7, `test_loop2_api_error_route.py:184-191`).
   Fix: write "a JSON error response" into the sentence (and D-05), and probe made-up paths only.

10. Not blocking — **browser-view-framework's check is both tighter and looser than its
    sentence.** The built-page test rejects any script from another origin, framework or not
    (situation 21, `test_browser_view_framework.py:194-196`). A framework absent from `UI_FRAMEWORKS`
    passes (situation 19). D-03 has level 1 only, so the test's list is the de facto definition of
    "UI framework". Fix: a level-2 complies/violates pair in D-03 for libraries that patch the DOM
    or manage state.

11. Not blocking — **map details an agent will trip on:**
    - *Depends on* runs account-server → browser-view (patched `part_map.md:22`), which allows
      server code to import browser code. D-07 forbids exactly that use once the simulation sits
      there, and nothing checks it (situation 25).
    - account-server ↔ build-tools form a cycle, so criticality flows both ways.
    - Tests are claimed by exact file name (`tests/http.test.mjs`, `tests/startup.test.mjs`), so
      every new test file fails file assignment until the map gains it. A per-part test directory
      pattern would avoid one map edit per task.

12. Not blocking — **the prefix `D-NN` reads like the concept log's `D23`.** D-04's and D-07's
    *Origin* (patched `decisions.md:73,133`) cite "D10", "D23" of `koncepcja_projektowa.md`. The
    definition projects some 34 decisions, so the log will soon hold D-10 and D-23 (situation 27).
    Fix: write "concept decision D23" in *Origin*.

13. Not blocking — **D-06(p) "compiles both configurations"** reads as exactly two. A simulation
    compiled or tested under a third config makes the wording doubtful (situation 16). "each of
    its configurations" would avoid this.

14. Not blocking — **an environment failure is recorded as `fail`.** When port 3000 is held, the
    support's `Server` raises AssertionError, so the run records `fail` for express-http and
    api-error-route instead of `error` (situation 30, `loop2_invariant_support.py:225-228`).

## Call

**Accept with fixes:**
- 1 — Method `TODO`, or an accepted citing check;
- 2 — reword the occupied-address sentence;
- 3 — the human supplies failure modes and the criticality scale;
- 4 — the human's *Approved by* on acceptance.

Recommended in the same change, all within the decisions in force: 5 (Origin names the
definition), 6 (restore the rationale sentence), 7 (D-05 sentence or public-file-boundary
*Derives from*). 8–10 are invariant-test mechanics for the panel or the human. 11–14 can wait for
the tasks they affect.
