# Panel settlement — task/app-skeleton, correction 2 — order A then B

Settles `panel-a.md` (perspective: the agent that will work under the change) and `panel-b.md`
(perspective: consistency and form), read in that order, against the repository at `031b0a6`
(worktree `C:\Storage\repos\loop2-skeleton`), `.the-way` at `96c52488` (matches the gitlink), the
manifest, the UNAPPROVED patch (SHA-256 `b4526f1d…a5a6f`, matches the manifest) and
`definicja_mvp_loop2.md`.

Run by the settler: the five format guards with `--base 91ee59e` (and `--merge-onto 91ee59e`
except the part map) — decisions, invariants, glossary, environment facts: 0 errors, 0 warnings,
0 unchecked; part map: 0 errors, 0 warnings, 1 unchecked ("no command of the product reports the
dependency graph"). Not run: the gate (port 3000 is shared, as instructed) and `npm test`; the
gate's 31/31 and `npm test` 5/5 come from assessment A only and are not confirmed here.

## Assessment A

**Evidence accuracy.** A's line citations into `foundations/*` and the test files hold, with one
exception: `test_application_build_output.py:280-283` (situation 20, Q3) does not exist — the file
has 193 lines; the literal configurations stand at `test_application_build_output.py:37-40`.
Situation 16 cites `src/server/main.ts:3-4` for `0.0.0.0` / `PORT` from the environment as a future
change; today `main.ts:3-4` fix `127.0.0.1` and `3000`.

**F1 — holds in part.** The gap is real: `test_loop2_one_serving_process.py:23` excludes "a
deployment or container", and `account-server-typecheck` has a deployment tripwire
(`test_account_server_typecheck.py:15,18-21,92-96`; `loop2_invariant_support.py:298-332`) while this
check has none. But the invariant's sentence names no container (`foundations/invariants.md:55`),
nor does D-05/1's binding text (`foundations/decisions.md:81-82`; only its question heading at
`:79` says "in the container"). A tripwire that fails when a Dockerfile appears would fail the
invariant while its sentence still holds — a check beyond the sentence, unlike the typecheck
tripwire, whose sentence says "before deployment" (`invariants.md:15`). The container part lives in
the full projected entry (`definicja_mvp_loop2.md:740-742`, `:1927-1928`), which under WAY-126
(`.the-way/foundations/decisions.md:3573-3584`) enters with the deployment task, whose return step
sends it back to its foundation step. Not a fix within the decisions in force; to the human.

**N1 — holds.** `test_loop2_one_serving_process.py:209-212` fails on any other listening port of
the started tree, the listener included; the sentence says "One … process" (`invariants.md:55`).
`:183-186` requires `GET /` to return the exact bytes of a built HTML file, so a per-request page
(situation 4) fails. Both readings are stricter than the sentence; today's code meets both
(`src/server/app.ts:14-18`). Changing them changes what the test checks, not its mechanics; to the
human.

**Q1 — holds.** D-05/1 is shortened from the projected entry ("account and save routes in the
loop2 container", `definicja_mvp_loop2.md:740-742`, against `decisions.md:81-82`) and carries
`Origin: none` (`decisions.md:90`), while the shortened D-04/1 and D-07/1 point to "the full
approved entry" (`decisions.md:73`, `:132`). `loop2-one-serving-process/1` holds "One Express 5
process serves both the built game and `/api/` requests" (`invariants.md:55`) while the definition
holds a longer sentence under the same identifier and version (`definicja_mvp_loop2.md:1925-1928`).
The template's *Origin* rule (`.the-way/elements/decisions/template.md:254-261`) makes `none`
defensible where the whole reasoning is in the entry — D-05's rationale is copied whole — but the
pointer to the full approved wording is missing, unlike its two siblings. Approved wording; to the
human.

**Q2 — holds.** D-04/1's *violates* "a script the browser loads written directly in JavaScript"
(`decisions.md:71`) reads literally over any script, a library's included. D-06/1 rejects a bundler
(`decisions.md:117`), and `browser-view-framework/1` forbids a bare import in the built page
(`test_browser_view_framework.py:15-17`). D-03/1 forbids only a UI framework (`decisions.md:47`).
So a third-party browser library has no route except rewriting it in TypeScript. Approved wording;
to the human.

**Q3 — holds; not a defect of this change.** No part names the simulation or the game content
(`part_map.md:3-5`, sentence "draws the game's screens"); the definition defers "which part holds
the simulation" to the breakdown (`definicja_mvp_loop2.md:113`). D-04/1's Scope
(`decisions.md:66`) and the two literal configurations (`test_application_build_output.py:37-40`)
would move with it.

**N2 — holds.** Every part has `Failure modes: none` (`part_map.md:10,24,43,56,65`) and the
criticality scale is empty (`:68`); WAY-46 counts that as the highest criticality
(`.the-way/foundations/decisions.md:1237-1246`). The safe direction; a confirmation for the human.

**N3 — holds.** `account-server` depends on `build-tools` (`part_map.md:23`) and `build-tools` on
`account-server` (`:42`); with WAY-46's inheritance from dependants, each takes the other's
criticality. No effect while every part is highest; the guard leaves dependencies unchecked
(guard run above). Same as B's R8.

**N4 — holds in part.** WAY-44 assigns CI configuration to the part of the files that direct the
work (`.the-way/foundations/decisions.md:1182-1188`), which is `agent-workflow` here
(`part_map.md:48`); it gives one answer, and only `build-tools`' "launches the application"
(`part_map.md:29`) competes with it. A note for the deployment task.

**N5 — holds.** D-07/1's *complies* (`decisions.md:129`) and D-02/1's rationale "input checks"
(`decisions.md:37-38`) do not settle plausibility checks of a save; the definition's Out of scope
does ("Sprawdzanie przez serwer, czy gracz rzeczywiście zdobył postęp…",
`definicja_mvp_loop2.md:59`). No change needed now.

**N6 — holds; outside this round's files.** `loop2_invariant_support.py:174-175` raises an
`AssertionError` when `node_modules` is missing, which the gate records as `fail`; the *Method* of
every invariant (`invariants.md:7` and the rest) names no `npm ci`. `loop2_invariant_support.py` is
not in `files.txt`. A note for a later task.

**N7 — holds.** The patch header names `proposal-pl.md` "in this directory"
(`UNAPPROVED-proposed-foundation-against-031b0a6.patch:3`); the directory holds four files and no
`proposal-pl.md`.

**A on the UNAPPROVED patch — holds.** See the shared section below.

## Assessment B

**Evidence accuracy.** B's line citations into `test_loop2_one_serving_process.py` do not match the
file at `031b0a6` (243 lines): R5's `:387-392` is `:194-199`, the dispatch test's `:421-432` is
`:228-239`, R6's `:236,411-432` are `:50` (`DEBUG_ENV`), `:218-226` and `:228-239`. The content
cited is the content of those places. Its other citations hold
(`test_application_build_output.py:38-39`, `node_modules/router/index.js:154`).

**R1 — holds.** D-06/1's first sentence (`decisions.md:102-103`, one npm package and lockfile)
has no check: `application-build-output/1` (`invariants.md:65`) and its tests
(`test_application_build_output.py:139-189`) cover compilation and the two output directories
only. A commit can falsify the sentence (a second `package.json`), so by the template
(`.the-way/elements/decisions/template.md:185-192`) an invariant can be derived. Approved Verification;
to the human.

**R2 — holds.** D-04/1 is at level 2 alone (`decisions.md:69-71`); "written in TypeScript" can be
made false by a commit, and `browser-view-framework/1` already scans `src/browser` for files of
another language (`test_browser_view_framework.py:5-6`). The template allows level 2 only while
no invariant can be derived (`template.md:185-187`). Approved Verification; to the human.

**R3 — holds.** Origin as in A's Q1. Relations: the definition marks `narrows` (TODO) toward D-02
and "What public address…" (`definicja_mvp_loop2.md:747`); the entry reads `derives from
D-02@06e6d3d8` (`decisions.md:87`). `derives from` fits WAY-32 (`template.md:160-161`): D-05
answers the condition D-02's rationale names ("if the serving-process choice keeps one Node
process", `decisions.md:35-36`) and goes against nothing in it. Approved; to the human, with the
recommendation to keep it.

**R4 — holds.** "The application must set static-file and fallback rules carefully, including
cache policy…" (`decisions.md:94-96`) puts an obligation in prose; the template says what a
decision forces on later work stands in a binding sentence or a field (`template.md:53-54`), and
keeps *must* to binding sentences, a rule still `TODO — decision pending` (`template.md:94-95`).
The text is verbatim from the approved entry (`definicja_mvp_loop2.md:753-756`), and its part on
`/api/` errors is already binding sentence 2 (`decisions.md:82`). To the human.

**R5 — holds in part.** The assertion `100 <= status <= 599`
(`test_loop2_one_serving_process.py:194-199`) is true for any response `http.client` parses
(`loop2_invariant_support.py:282-291`), so the method itself never fails. But the condition it
names — an `/api/` request gets an HTTP response — is enforced in `setUpClass` (`:167-168`): a
request that gets no response raises there, and the gate then records `fail` for every test the
fixture kept from running (`.the-way/gate/run_tests.py:40-42`, `:639-664`). The break B names
(removing the `/api` handler, `src/server/app.ts:14-16`) is not a break of this invariant: Express
still answers, and the docstring leaves what the answer must be to `loop2-api-error-route`
(`test_loop2_one_serving_process.py:12-14`), whose check catches it
(`test_loop2_api_error_route.py:11-14`). Cutting the method changes no verdict; strengthening it
changes what it checks. Neither is a change of mechanics (selectors, test data, waiting); to the
human, with the recommendation to leave it.

**R6 — holds in part.** The duplication holds: `account-server-express-http` checks Express major
5 in `package.json`, the lockfile and the installed copy and the router's `dispatching` line for
`/`, a missing page and one `/api/` path (`test_account_server_express_http.py:4-13,39-44`);
`loop2-one-serving-process` checks the installed major (`test_loop2_one_serving_process.py:218-226`)
and the same debug line for every built file and two `/api/` paths (`:228-239`, `DEBUG_ENV` `:50`).
The debug line is the `router` package's internal `debug('dispatching %s %s', …)`
(`node_modules/router/index.js:154`); whether Express documents it was not checked. But the
sentence names "Express 5" (`invariants.md:55`), copied from D-05/1's binding sentence
(`decisions.md:81`); dropping the tests while the sentence stays leaves a clause unchecked, so the
cut needs the sentence change first. Approved wording; to the human.

**R7 — holds.** "Building the application" and "the built game" are read as `npm run build` and
`dist/public` from README.md (`test_application_build_output.py:4`,
`test_loop2_one_serving_process.py:4-5,9`, literal `BUILT_GAME` at `:44`; README.md:11). WAY-60
places a condition deciding an invariant in its sentence or where changing it takes a
human-decided foundation change (`.the-way/foundations/decisions.md:1646-1647`); README.md is a
`build-tools` file (`part_map.md:37`). The literals in the tests mean a rename fails the checks
rather than passing silently, which limits the harm today. To the human.

**R8 — holds.** As A's N3. In addition, `account-server` depends on `browser-view`
(`part_map.md:23`) though `src/server/**` imports nothing from `src/browser/**`
(`src/server/app.ts:1-3`, `main.ts:1`); the relation is that it serves what the browser build
emits. Part-map wording, approved; no effect on criticality today. To the human.

**R9 — holds.** `src/server/main.ts:3-4` fix `127.0.0.1:3000`; README.md:13 and :15 state the
same, and README.md:27 leaves deployment out of the skeleton. No invariant is hurt; a note for the deployment
task.

**B's cut list** — follows R5, R6, R8 above; B's statement that `agent-workflow` and
`product-foundation` are needed by WAY-44 holds (`part_map.md:46-66`; the guard reports no
unclaimed file).

**B on the UNAPPROVED patch — holds.** See below.

## The UNAPPROVED patch

Holds as both assessors say. The old sentence "The part holds the product rules and the map of its
responsibilities" (`part_map.md:61`) is narrower than the part's files, `foundations/**`
(`:63`), which already hold `glossary.md` and `environment_facts.md`. "Foundation" is the-way's
defined term (`.the-way/foundations/glossary.md:77-79`), not loop2's (its glossary holds only
"program", `foundations/glossary.md:5`); WAY-97 binds a sentence only to terms its own glossary
defines, so the undefined word is not an error. No reference carries a fingerprint of the part
(the only mention, `part_map.md:55`, carries none), so accepting flags nothing.

## Recommendation

**Call: accept.** Nothing blocks. The code of the round holds against both assessments; the
guards pass with only the expected "dependency graph" unchecked. Every proposed test change
(F1 tripwire, N1 narrower reading, R5 cut or new assertion, R6 removal) changes what a test checks
or depends on approved wording, so none is a fix the author makes within the decisions in force.

**Test-mechanics fixes the panel decides (WAY-10):** none. No remark asks for a change of
selectors, test data or waiting.

**Fixes within the decisions in force:** none.

**Questions for the human, each with the recommendation:**

1. The UNAPPROVED part-map patch — **accept**. Rejecting it leaves a sentence narrower than the
   part's files, a doubt in every task that adds a term, a fact or a derived file; accepting costs
   one sentence and flags nothing.
2. D-05/1 (Q1, R3) — **give it the same Origin as D-04/1 and D-07/1** (pointer to the full approved
   entry in `definicja_mvp_loop2.md`), **keep `derives from D-02`**, and **confirm that the
   container part ("in the loop2 container", "account and save") enters with the deployment task
   under WAY-126** as new versions of D-05 and `loop2-one-serving-process`. Left as is, the next
   agent finds a shortened decision with no pointer to what was cut and the same identifier with
   two sentences.
3. F1 — **no tripwire now**; let the deployment task's foundation step bring the container check
   with the invariant's new version (item 2). A tripwire now would fail the invariant while its
   sentence holds; without one, the guard against a green check over a container is WAY-126's
   return step, not a test.
4. N1 — **leave the stricter readings** (no second port of the tree, exact bytes of `GET /`) until
   a task needs a health port or a per-request page; that task changes the reading through the
   panel. Today they cost nothing; later they give a false failure that names itself.
5. R5 — **leave the test**; it names the clause in the record, and its condition is enforced by
   `setUpClass`. Cutting it saves six lines and changes no verdict.
6. R6 — **keep "Express 5" in the sentence and the two tests**; the sentence mirrors D-05/1's
   binding text, and an Express major change needs new versions of D-02 and D-05 anyway, so failing
   together is the intended signal. The cost is about 25 duplicated lines and a second reader of
   the router's debug line.
7. D-04/1 (Q2, R2) — **narrow the *violates* example to the game's own code** ("a script of the
   game written directly in JavaScript…") so third-party libraries are not ruled out by an example,
   and **derive the level-1 invariant for "written in TypeScript" in the task that settles the
   simulation's part** (Q3), when its files are known. Left as is, the first library a task needs
   is blocked by an example, not by a decision.
8. D-06/1 sentence 1 (R1) — **derive an invariant for one npm package and lockfile** at the next
   foundation change of build-tools; risk today is low (one `package.json`), but the template asks
   for level 1 wherever a commit can falsify the sentence.
9. D-05/1 rationale "must … cache policy" (R4) — **keep** (verbatim approved wording, the rule on
   normative words is pending); put cache policy in a binding sentence when a task sets it.
10. Conditions in README.md (R7) — **name `npm run build` and `dist/public` in the next versions of
    D-06/1 or the two invariants**; until then the tests' literals make a rename fail visibly.
11. Part-map dependencies (N3, R8) — **settle them when failure modes are first written**;
    recommended then: drop `account-server → browser-view` and `build-tools → account-server`.
    Today every part is highest, so the cycle changes nothing.
12. Failure modes `none` everywhere (N2) — **confirm** for the skeleton; `account-server` should
    gain failure modes with the accounts task, since it will hold passwords.

Notes with no decision needed: Q3 and N4 for the breakdown and the deployment task; N5 settled by
the definition's Out of scope; N6 (`npm ci` precondition) for a later task; N7 (missing
`proposal-pl.md`); R9 for the deployment task.
