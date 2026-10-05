# Panel assessment B: consistency and form (correction 2)

Assessed: branch task/app-skeleton at 031b0a6, range 0b96e9e..031b0a6 (7 paths) and the UNAPPROVED part-map patch.
Read: panel.md, WAY-10/17/19/21/32/61/65/69/71/97/126, the templates of decisions, invariants and part map, `elements/common/rules.md`, the files of the range, README.md, `loop2_invariant_support.py`, the project definition (projected entries, gate record).
Run: the four element format guards and the part-map guard against base 91ee59e (decisions, invariants, glossary, environment facts: 0 errors, 0 warnings, 0 unchecked; part map: 0 errors, 1 unchecked, "no command of the product reports the dependency graph"). Gate and `npm test` not run, as instructed. Nothing applied.

## Call: accept with fixes (no blocking remark)

The form of every entry holds against its template and the cited decisions. The fixes within decisions in force are small and optional (R5, R6). Everything else is a question for a human, because the wording is human-approved.

## Remarks

R1 (not blocking, human decides) `foundations/decisions.md`, D-06/1 (Verification line). The binding text has two sentences: one npm package and lockfile and separate configurations and output directories (sentence 1), and "Building the application compiles both configurations" (sentence 2). Verification is level 1 with only `application-build-output`, whose sentence and checks cover sentence 2 (plus the two output directories, as literals in `test_application_build_output.py:38-39`). "One package and lockfile" has no check and no level-2 pair, yet a commit can falsify it (a second `package.json`). WAY-12 and the template ("each level covers what it can check") leave it uncovered. Question for the human: add a level-2 complies/violates pair for sentence 1, or a second invariant.

R2 (not blocking, human decides) `decisions.md`, D-04/1 Verification. Level 2 only. The template allows level 2 "only while no invariant can be derived": "written in TypeScript" and "a script the browser loads written directly in JavaScript" can be made false by a commit, and `browser-view-framework/1` already scans `src/browser` for non-TypeScript code. Question for the human: keep level 2 as approved, or derive an invariant (WAY-12, WAY-71).

R3 (not blocking, human decides) `decisions.md`, D-05/1 against D-04 and D-07. D-04 and D-07 carry an Origin that points to the full approved projected entry, as WAY-126 and the template's Origin rule do for shortened entries. D-05 enters in shortened form (the definition's "in the loop2 container" and "account and save routes" are dropped) but has `Origin: none`. Its Relations also changed from the definition's `narrows` (two projected decisions) to `derives from D-02@06e6d3d8`, and no area of narrowing is stated. Under WAY-32 `derives from` means "a higher decision this one serves", which D-02 is. Question for the human: is the change from `narrows` to `derives from` intended, and should D-05 carry the same Origin as D-04 and D-07?

R4 (not blocking, human decides) `decisions.md`, D-05/1 *Rationale*, "The application must set static-file and fallback rules carefully, including cache policy". The template says what a decision forces on later work stands in a binding sentence or a field, never in prose (WAY-05), and normative words belong to binding sentences. The text is inherited from the projected entry, so it is approved wording; no guard checks it. Question for the human: keep, or move to a binding sentence or cut.

R5 (not blocking, within decisions in force) `tests/invariants/test_loop2_one_serving_process.py:387-392`. `test_api_requests_are_answered` passes on any status 100-599. An Express app with no `/api` route answers 404 by default, so a deliberate break (removing the `/api` handler in `src/server/app.ts:14`) still passes. The clause "serves `/api/` requests" is not told apart from "answers some request". The dispatch test (lines 421-432) already shows that the router saw the `/api/` paths. WAY-08: a test counts only when a deliberate break makes it fail. Fix: cut this test, or have it assert something a break changes. The sentence itself leaves little else to check while there is no account route.

R6 (not blocking, human decides, cut candidate) `test_loop2_one_serving_process.py:236,411-432` and sentence "One Express 5 process …". The two Express 5 tests (`test_installed_express_is_major_5`, `test_express_5_router_dispatches_game_and_api_requests`) and the `DEBUG=router` setup repeat the first and third clause of `account-server-express-http/1` (`test_account_server_express_http.py:1-14`: major 5 in package.json, lockfile and the installed copy; `router dispatching` log). `loop2-one-serving-process/1` states "Express 5" only because D-05's first sentence does. Both entries now fail together when Express changes, and each reads the router's undocumented debug line (the line is in `node_modules/router/index.js:154`, not in Express's documentation). Fix needs a human: drop "Express 5" from the invariant sentence (leaving "One process …"), or keep the duplicate. The two tests and the debug environment would go (about 25 lines).

R7 (not blocking, human decides) `foundations/invariants.md`, both new entries, sentence versus condition (WAY-60 as the invariants template states it). "Building the application" (`application-build-output/1`) and "the built game" (`loop2-one-serving-process/1`) mean `npm run build` and `dist/public`. The tests take these from README.md ("as README.md gives it"), and neither the sentence nor a foundation entry holds them. A commit that renames the script or output directory changes what the sentence means without changing it. Question for the human: name the command and directory in the sentences, or accept README.md as the holder.

R8 (not blocking, human decides) `foundations/part_map.md`, `account-server` and `build-tools`, *Depends on*. They depend on each other (`account-server`: browser-view · build-tools; `build-tools`: browser-view · account-server), and `account-server` on `browser-view`, though `src/server/**` imports nothing from `src/browser/**`: the relation is "serves what the browser part builds". The template says the field is "allowed dependencies"; a cycle with no `separated` mark makes both parts inherit each other's criticality. The part-map guard cannot check the field ("unchecked: the dependencies between parts"). Cut candidate: `account-server` → `browser-view`, and one direction of the cycle.

R9 (not blocking, note) `src/server/main.ts:3`. Fixed host 127.0.0.1 and port 3000. D-05 says "in the container"; a container needs the process to listen on a non-loopback address. The tests and README state 127.0.0.1:3000, and the container is out of scope of this skeleton (README, last paragraph). No invariant is hurt now; it will have to change with the deployment.

## What holds (consistency checks that came out clean)

- WAY-17: `loop2-one-serving-process` and `loop2-api-error-route` derive from D-05@e11aec4d, `application-build-output` from D-06@094e6fa7; each decision's Verification names the invariants that derive from it. The guard confirms the fingerprints.
- WAY-19, WAY-71: numbers D-04 to D-07 are the next free; all fields present; `none` and `TODO` only where given (no `TODO` on the branch). The edits of D-01 to D-03 (Scope, Relations) are in place, which is allowed because the main branch holds no decisions yet (checked: `91ee59e` has no decisions).
- WAY-21: every Scope names parts of the new map; none is a file path. D-07 names only `account-server`; D-04 `browser-view`, `build-tools`.
- WAY-61, WAY-65: the Method is the same gate command for all entries; each check cites its invariant at the test method as `# invariant: <id>/1`. The docstring headings "Invariant <id>/1:" use no colon after "invariant" and are not a file-top citation (WAY-65 violates example).
- WAY-69: the configurations, source and output directories, the probe sources, the expected error names and the expected Express major are written out as literals; the compared side (emitted files, response bytes, process tree) comes from the run.
- WAY-97: the glossary holds only "program"; no entry paraphrases it.
- WAY-126: Approved by of D-04, D-05, D-07 reads 2026-10-05, the date a human accepted the part of each projected entry, not the gate record's 2026-10-04; consistent with "that part enters as a proposal a human accepts". D-06 is not in the definition (no projected entry), so it is a plain new decision.
- Part map: every tracked file is claimed (the guard reports no unclaimed file); tests belong to the part they test; `package-lock.json` and `src/server/**` are the trust boundaries, matching the External context rows. Failure modes `none` on all parts counts as the highest criticality (WAY-46), which is the safe direction.

## The UNAPPROVED patch (part map, `product-foundation`)

Change: "The part holds the product rules and the map of its responsibilities." to "The part holds the product's foundation."
- Form: still one sentence; the part's identifier and files are unchanged; no decision cites the sentence by fingerprint, so no flag is raised.
- Consistency: the new sentence matches `foundations/**` (decisions, invariants, glossary, environment facts, part map). The old one named two of them, and "product rules" does not say facts or the glossary. "Foundation" is a defined word of the-way, not of loop2's glossary. WAY-97 binds a sentence only to a term its glossary defines, so this is not an error; the human may add the term to the product's glossary or accept it undefined.
- Recommendation: accept; a human decides, since it is a part-map wording.

## What of the change can be cut

Something can. In order of size: the Express 5 duplicate in `loop2-one-serving-process` (R6, about 25 lines of test and the clause in the sentence), the vacuous API-answered test (R5, 6 lines), the account-server to browser-view dependency and one direction of the cycle (R8). Nothing else: the two extra parts (`agent-workflow`, `product-foundation`) are needed by WAY-44 to give every tracked file a part; the process-tree machinery in `test_loop2_one_serving_process.py:251-322` is what the "one process" clause needs; the Caddy and Docker citations of D-05 stand for its rejected option.

## Split

Human must decide (approved wording or deferred): R1, R2, R3, R4, R6 (sentence part), R7, R8, R9, the patch.
Fixes within decisions in force: R5 (cut or strengthen the test), R6 (test side only, if the sentence stays).
