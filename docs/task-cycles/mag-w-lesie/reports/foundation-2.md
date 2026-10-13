# Foundation step 2 — part map — report

- Agent: foundation agent (general-purpose subagent, claude-opus-5-5)
- Skill: the-way-update-part-map (pin d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b verified: gitlink and checkout agree)
- Commit: 41ff28205a69ce74a1cbdbf0982795cf5ed90577 on task/mag-w-lesie (not pushed), file foundations/part_map.md only

## Entries written

| Entry | Meaning (pl, for the request only) |
|---|---|
| `simulation` (new part) — "The part computes the game: the game state, the map run, the character's program and the passing of game time, from the game's data." Files: src/browser/sim/**, tests/sim/**, four invariant tests (map-run-repeatability, simulation-randomness, action-in-progress, player-map-run-pace). Depends on, Failure modes, Trust boundary: none | Symulacja to osobna część, która liczy grę — stan gry, przejście, program postaci i upływ czasu gry — z danych gry, i od żadnej innej części nie zależy. |
| `browser-view` (changed) — Files narrowed to src/browser/*.ts, src/browser/index.html, src/browser/view/**, assets/icons/**, tests/view/**, tests/invariants/test_browser_view_framework.py; Depends on: simulation; Trust boundary: assets/icons/** | Widok w przeglądarce traci pliki symulacji, zyskuje ikony i ich test, może korzystać z symulacji, a każda zmiana plików ikon jest sprawdzana pod kątem spreparowanej treści. |
| External context: game-icons.net — them → us — untrusted — no | Ikony z game-icons.net przychodzą z zewnątrz, są niezaufane i nie zmieniają się razem z produktem. |
| build-tools: unchanged | Narzędzia budowania bez zmian w mapie. |

Ownership (git ls-files): every new pattern matches tracked files (src/browser/*.ts → main.ts; view/** → credits.ts; assets/icons/** → 4 SVG; tests/view/** → icons.test.mjs; sim/** → 15 files; tests/sim/** → 10 files). No file taken from a part other than browser-view; no overlap, none unclaimed (guard: 0 errors).

Criticality: the guard prints no computed degrees. The criticality scale is empty and no part records failure modes, so every part, simulation included, counts as the highest degree; the guard reported no lowering against the base.

## Guards (base = merge-onto = 1701186)

- part-map: 0 errors, 0 warnings, 1 unchecked — "the dependencies between parts, and new or stale violations — no command of the product reports the dependency graph".
- decisions: 9 errors, 9 warnings, 0 unchecked — all the `merge of <request link>` placeholder (D-03/2, D-09/1–D-16/1). Scopes naming `simulation` now pass.
- invariants: 0 errors, 0 warnings, 0 unchecked (notes: no violated_invariants.md, no human_verdicts.md). Part `simulation` passes.
- invariant tests (`run_tests.py tests/invariants`): 39 tests, 1 failure + 1 error, both EADDRINUSE on 127.0.0.1:3000 (test_account_server_occupied_address; setUpClass of test_loop2_one_serving_process). Record: 40 pass, 7 fail verdicts. Rerun alone, each in its own directory copy (tests/rerun_<name>/, removed after): occupied_address OK (1 test); one_serving_process first rerun again EADDRINUSE mid-run, second rerun OK (5 tests). test_application_package_layout passed with the new map. Full log: .runs/task-cycles/mag-w-lesie/reports/fs2-invariant-run.txt.

## Findings and questions

- Q-1 (WAY-48): it records a trust boundary as "a pattern of the code files which accept data the product does not trust". assets/icons/** are data files, not code. Written as ruled. The code that takes them in is scripts/build.mjs (build-tools; it copies the icons into dist/public/icons), and the browser draws them. Recommendation: keep the ruling, because a change to an icon is what must trigger the crafted-input check, and the request should name the deviation. The alternative is to add scripts/build.mjs as the boundary at build-tools.
- Q-2: build-tools *Depends on* browser-view · account-server and account-server *Depends on* browser-view · build-tools do not name simulation, although the build compiles it and the server serves it. The ruling left them unchanged. Without a dependency graph nothing checks this, and with every part at the highest degree it changes no criticality. Should simulation be added?
- Note: test_application_package_layout's docstring asks for "a reviewed classification" of a new part. `simulation` is in neither APPLICATION_PARTS nor NON_APPLICATION_PARTS. The test passes, because no nested package exists, but a code task should classify it.
