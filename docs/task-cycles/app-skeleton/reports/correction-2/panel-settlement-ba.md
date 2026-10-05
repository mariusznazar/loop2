# Panel settlement — task/app-skeleton, correction 2 — order B then A

Settles `panel-b.md` (perspective: consistency and form) and `panel-a.md` (perspective: the agent
that will work under the change), read in that order, against the repository at `031b0a6`
(worktree `C:\Storage\repos\loop2-skeleton`), `.the-way` at `96c52488` (matches the gitlink), the
manifest, the UNAPPROVED patch (SHA-256 `b4526f1d…a5a6f`, matches the manifest) and
`definicja_mvp_loop2.md`.

Run by the settler: the five format guards with `--base 91ee59e` (and `--merge-onto 91ee59e`
except the part map) — decisions, invariants, glossary, environment facts: 0 errors, 0 warnings,
0 unchecked; part map: 0 errors, 0 warnings, 1 unchecked ("no command of the product reports the
dependency graph"). Not run: the gate (port 3000 is shared, as instructed) and `npm test`. B ran
neither; A reports gate 31/31 and `npm test` 5/5, which this settlement does not confirm.

## Assessment B

**Evidence accuracy.** B's citations into `test_loop2_one_serving_process.py` miss the file at
`031b0a6` (243 lines): `:387-392` is `:194-199`, `:421-432` is `:228-239`, `:236,411-432` are `:50`,
`:218-226`, `:228-239`. What B describes is what stands at those places. Its other citations hold
(`test_application_build_output.py:38-39`, `node_modules/router/index.js:154`).

**R1 — holds.** D-06/1, sentence 1 — one npm package and lockfile (`foundations/decisions.md:102-103`)
— is covered by no check: `application-build-output/1` (`foundations/invariants.md:65`) and its
tests (`test_application_build_output.py:139-189`) check compilation and the two output
directories. A second `package.json` would falsify the sentence on a commit; the template asks for
an invariant wherever one can be derived (`.the-way/elements/decisions/template.md:185-192`).
Approved Verification; to the human.

**R2 — holds.** D-04/1 has level 2 alone (`decisions.md:69-71`), yet "written in TypeScript" is
falsifiable on a commit, and `browser-view-framework/1` already scans `src/browser` for other
languages (`test_browser_view_framework.py:5-6`). Template: level 2 only while no invariant can be
derived (`template.md:185-187`). To the human.

**R3 — holds.** Origin: D-05/1 is shortened from the approved projected entry
(`definicja_mvp_loop2.md:740-742` against `decisions.md:81-82`) and has `Origin: none`
(`decisions.md:90`), while the shortened D-04/1 and D-07/1 point to "the full approved entry"
(`decisions.md:73`, `:132`). The template allows `none` when the whole reasoning is in the entry
(`template.md:256-258`), and D-05's rationale is copied whole, but the pointer to the full wording
is missing where its siblings carry one. Relations: the definition's TODO says `narrows` D-02 and
"What public address…" (`definicja_mvp_loop2.md:747`); the entry has `derives from D-02@06e6d3d8`
(`decisions.md:87`). WAY-32's `derives from` — a higher decision this one serves
(`template.md:160-161`) — fits: D-02's rationale names the very condition D-05 settles ("if the
serving-process choice keeps one Node process", `decisions.md:35-36`), and D-05 goes against
nothing in D-02. Approved; to the human.

**R4 — holds.** "The application must set static-file and fallback rules carefully, including
cache policy…" (`decisions.md:94-96`) states an obligation in prose, against the template's "what
a decision forces on later work stands in a binding sentence or a field" (`template.md:53-54`) and
its pending rule on *must* (`template.md:94-95`). Verbatim from the approved entry
(`definicja_mvp_loop2.md:753-756`); its `/api/` error part is already binding sentence 2
(`decisions.md:82`). To the human.

**R5 — holds in part.** The method's assertion `100 <= status <= 599`
(`test_loop2_one_serving_process.py:194-199`) cannot fail for a response `http.client` parses
(`loop2_invariant_support.py:282-291`). The condition it names is nevertheless checked: the
requests run in `setUpClass` (`test_loop2_one_serving_process.py:167-168`), a request with no
response raises there, and the gate then gives `fail` for every test the fixture kept from running
(`.the-way/gate/run_tests.py:40-42`, `:639-664`). The break B proposes — removing the `/api`
handler (`src/server/app.ts:14-16`) — leaves Express answering, which this invariant's reading
allows (`test_loop2_one_serving_process.py:12-14`); it breaks `loop2-api-error-route`, whose check
catches it (`test_loop2_api_error_route.py:11-14`). So B's "fix within the decisions in force"
would change no verdict if it cuts, and would change what the test checks if it strengthens;
neither is a change of selectors, test data or waiting. To the human, recommended: leave.

**R6 — holds in part.** Duplication holds: `account-server-express-http` checks the major version
in `package.json`, lockfile and installed copy and the router's `dispatching` line for three probes
(`test_account_server_express_http.py:4-13,39-44`); `loop2-one-serving-process` repeats the installed
major (`test_loop2_one_serving_process.py:218-226`) and the debug line for every built file and two
`/api/` paths (`:228-239`, `DEBUG_ENV` at `:50`). The line is the `router` package's internal debug
call (`node_modules/router/index.js:154`); its documentation status was not checked. The
"test side only, if the sentence stays" fix B lists does not hold: the sentence names "Express 5"
(`invariants.md:55`, mirroring D-05/1's `decisions.md:81`), so removing the tests while it stays
leaves that clause unchecked. Approved wording first; to the human.

**R7 — holds.** The tests read "building the application" and "the built game" as `npm run build`
and `dist/public` from README.md (`test_application_build_output.py:4`,
`test_loop2_one_serving_process.py:4-5,9,44`; README.md:11). WAY-60 wants a deciding condition in
the sentence or behind a human-decided foundation change (`.the-way/foundations/decisions.md:1646-1647`);
README.md belongs to `build-tools` (`part_map.md:37`). The literals make a rename fail visibly
today. To the human.

**R8 — holds.** `account-server` ↔ `build-tools` depend on each other (`part_map.md:23`, `:42`);
under WAY-46 (`.the-way/foundations/decisions.md:1237-1246`) each inherits the other's criticality.
`account-server → browser-view` (`part_map.md:23`) has no import behind it (`src/server/app.ts:1-3`,
`src/server/main.ts:1`); it serves what the browser build emits. No effect today (all parts
highest); the guard leaves dependencies unchecked. Approved part-map wording; to the human.

**R9 — holds.** `src/server/main.ts:3-4` fix `127.0.0.1:3000`; README.md:13, :15 state it and
README.md:27 puts deployment outside the skeleton. A note for the deployment task.

**B's "what holds" and cut list** — checked where they bear on a remark: the two extra parts are
required by WAY-44 (`part_map.md:46-66`, no unclaimed file reported); the cuts follow R5, R6, R8.

**B on the UNAPPROVED patch — holds.** See below.

## Assessment A

**Evidence accuracy.** A's citations hold except `test_application_build_output.py:280-283`
(situation 20, Q3), which does not exist; the literal configurations are at `:37-40`. Situation 16
describes a future `0.0.0.0` / `PORT` at `src/server/main.ts:3-4`, which today fix
`127.0.0.1:3000`.

**F1 — holds in part.** No deployment tripwire in this check
(`test_loop2_one_serving_process.py:23`), unlike `account-server-typecheck`
(`test_account_server_typecheck.py:15,18-21,92-96`). But neither the invariant's sentence
(`invariants.md:55`) nor D-05/1's binding text (`decisions.md:81-82`) names the container — only
D-05's question heading (`:79`) and the full projected entry (`definicja_mvp_loop2.md:740-742`,
`:1927-1928`) do. A tripwire would fail the invariant while its sentence holds: a check beyond the
sentence, and unlike the typecheck tripwire, whose sentence says "before deployment"
(`invariants.md:15`). The container part reaches the foundation through WAY-126 with the
deployment task (`.the-way/foundations/decisions.md:3573-3584`). To the human.

**N1 — holds.** Any other port of the started tree fails (`test_loop2_one_serving_process.py:209-212`)
and `GET /` must return a built HTML file's exact bytes (`:183-186`); both stricter than "One …
process serves … the built game" (`invariants.md:55`), both met today (`src/server/app.ts:14-18`).
A change of what is checked; to the human.

**Q1 — holds.** Same finding as B's R3 (Origin), plus: the same identifier and version
`loop2-one-serving-process/1` carries a different sentence in the definition
(`definicja_mvp_loop2.md:1925-1928`) than in `invariants.md:55`. To the human.

**Q2 — holds.** D-04/1's *violates* "a script the browser loads written directly in JavaScript"
(`decisions.md:71`) covers any script read literally; with no bundler (`decisions.md:117`) and no
bare import in the built page (`test_browser_view_framework.py:15-17`), a third-party browser
library has no route, though D-03/1 forbids only a UI framework (`decisions.md:47`). To the human.

**Q3 — holds; not a defect of this change.** No part for the simulation or game content
(`part_map.md:3-5`); the definition defers it to the breakdown (`definicja_mvp_loop2.md:113`).

**N2 — holds.** `Failure modes: none` on every part (`part_map.md:10,24,43,56,65`), empty scale
(`:68`); WAY-46 counts that as highest. A confirmation for the human.

**N3 — holds.** Same as R8.

**N4 — holds in part.** WAY-44 gives one answer for CI configuration — the part of the files that
direct the work (`.the-way/foundations/decisions.md:1182-1188`), here `agent-workflow`
(`part_map.md:48`); only `build-tools`' "launches the application" (`part_map.md:29`) competes. A
note for the deployment task.

**N5 — holds.** D-07/1 (`decisions.md:122,129`) and D-02/1's "input checks" (`decisions.md:37-38`)
leave plausibility checks of a save open; the definition's Out of scope closes it
(`definicja_mvp_loop2.md:59`).

**N6 — holds; outside this round's files.** Missing `node_modules` raises at
`loop2_invariant_support.py:174-175` and the gate records `fail`; no *Method* names `npm ci`
(`invariants.md:7` and the rest). Not in `files.txt`. A note for a later task.

**N7 — holds.** `proposal-pl.md`, named in the patch header (`:3`), is not among the four files of
`assessment/correction-2/`.

**A on the UNAPPROVED patch — holds.** See below.

## The UNAPPROVED patch

Holds as both assessors say. `product-foundation` claims `foundations/**` (`part_map.md:63`), which
holds the glossary and the environment facts as well, while its sentence names "product rules and
the map" (`:61`). "Foundation" is defined in the-way's glossary
(`.the-way/foundations/glossary.md:77-79`), not in loop2's (`foundations/glossary.md:5`, "program"
only); WAY-97 does not bind a sentence to it, so the undefined word is not an error. The part's
only mention (`part_map.md:55`) carries no fingerprint, so accepting flags nothing.

## Recommendation

**Call: accept.** Nothing blocks; the guards pass with only the expected dependency-graph
unchecked. B's two "fixes within the decisions in force" do not stand as such: R5's cut changes no
verdict and its strengthening changes what the test checks; R6's test-side cut leaves a clause of
an approved sentence unchecked. A's F1 checks beyond the sentence. All go to the human.

**Test-mechanics fixes the panel decides (WAY-10):** none. No remark asks for a change of
selectors, test data or waiting.

**Fixes within the decisions in force:** none.

**Questions for the human, each with the recommendation:**

1. The UNAPPROVED part-map patch — **accept**. It makes the sentence match the part's files and
   flags nothing; rejecting leaves a recurring doubt for every task that adds a term, a fact or a
   derived file.
2. D-05/1 (R3, Q1) — **Origin pointing to the full approved entry, as D-04/1 and D-07/1 have;
   keep `derives from D-02`; confirm the container part ("in the loop2 container", "account and
   save") enters with the deployment task under WAY-126** as new versions of D-05 and
   `loop2-one-serving-process`. Left as is, a shortened decision has no pointer to what was cut,
   and one identifier carries two sentences.
3. F1 — **no tripwire now**; the deployment task brings the container check with the invariant's
   new version. A tripwire now fails the invariant while its sentence holds.
4. N1 — **keep the stricter readings** until a task needs a second port or a per-request page;
   that task changes the reading through the panel. Cost today: none.
5. R5 — **leave the test**; its condition is enforced in `setUpClass`, and cutting saves six lines
   while changing no verdict.
6. R6 — **keep "Express 5" in the sentence and both tests**; the sentence mirrors D-05/1, and an
   Express major change needs new versions of D-02 and D-05 anyway. Cost: about 25 duplicated
   lines and a second reader of the router's debug line.
7. D-04/1 (R2, Q2) — **narrow the *violates* example to the game's own code**, and **derive the
   level-1 invariant for "written in TypeScript" in the task that settles the simulation's part**.
   Left as is, an example blocks the first third-party library a task needs.
8. D-06/1 sentence 1 (R1) — **derive an invariant for one npm package and lockfile** at the next
   build-tools foundation change; low risk today, but the template asks for level 1.
9. D-05/1 rationale "must … cache policy" (R4) — **keep** as approved wording; cache policy goes
   into a binding sentence when a task sets it.
10. README.md as holder of `npm run build` / `dist/public` (R7) — **name them in the next versions
    of D-06/1 or the two invariants**; the tests' literals cover a rename until then.
11. Part-map dependencies (R8, N3) — **settle when failure modes are first written**; recommended
    then: drop `account-server → browser-view` and `build-tools → account-server`. No effect today.
12. Failure modes `none` everywhere (N2) — **confirm** for the skeleton; `account-server` gains
    failure modes with the accounts task.

Notes with no decision needed: R9 and N4 for the deployment task; Q3 for the breakdown; N5 settled
by the definition; N6 (`npm ci` precondition) for a later task; N7 (missing `proposal-pl.md`).
