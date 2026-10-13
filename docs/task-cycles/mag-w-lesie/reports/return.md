# Return step — mag-w-lesie

- Agent: return agent (general-purpose subagent, claude-opus-5-5); skills the-way-record-decision, -record-invariant, -record-glossary-term, -record-environment-fact, -update-part-map (pin d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b, gitlink and checkout agree)
- Inputs: diff 170118680abec6760291df5d13f908c58409f867..e7159a7; cycle.md Q1–Q50; reports/sdd/progress.md `Ruling:` lines; foundations/*.md on the branch; frozen task.md; definicja_mvp_loop2.md § Projected foundation changes; plan_mvp_loop2.md § Projected entries
- Commit: f22d367 on task/mag-w-lesie (not pushed), files foundations/decisions.md, environment_facts.md, glossary.md, invariants.md, part_map.md

## Decisions written or changed

| Entry | What | Meaning (pl, for the request) |
|---|---|---|
| D-17/1 "Where do the game's icons come from?" (new; Scope browser-view, build-tools; Based on game-icons-licence@a24f9771 · cc-by-3-adaptation-credit@75828134; level 1 icon-file-content · icon-credits, level 2 for source and place; Review when: the game needs an icon game-icons.net does not hold · check by 2027-04-13; Approved by merge of `<request link>`) | carried question on icons (Q5, Q50) — binds every later icon (campfire, items, creatures) | Ikony gry to pliki SVG z game-icons.net trzymane w `assets/icons/` poza katalogiem podawanym przez serwer i kopiowane tam przy budowaniu; plik ikony nie zawiera niczego, co się wykonuje, ani odwołań poza siebie, a stopka wymienia przy każdej ikonie autora, jej stronę na game-icons.net, licencję i to, czym plik różni się od źródła. |
| D-06/3 "How are the browser and server built together?" (unchanged sentences; Scope + simulation; Approved by merge of `<request link>`) | foundation vs code: the simulation is browser code in the shared package and browser configuration; a change giving it its own package would not find D-06. Reverses the Scope part of Q21. | Zasada jednego pakietu i osobnych konfiguracji kompilacji obejmuje też symulację. |
| D-04/3 (edit in place, Verification only) | level 1 — simulation-isolation · simulation-inputs, level 2 for the shape of the functions and the view's use of the state; examples unchanged | Bez zmiany znaczenia: dwie reguły symulacji (izolacja, nienaruszanie wejść) sprawdza teraz test. |
| D-08/1 (edit in place, Verification only) | level 1 — content-identifiers (spec rule S2), level 2 for numbers and data-only additions | Bez zmiany znaczenia: test pilnuje, że identyfikatory i nazwy treści stoją tylko w plikach danych. |
| D-12/1, D-13/1, D-14/1, D-15/1, D-16/1 (edits in place, Verification only) | level 1 added: restart-seed; program-rule-pick; map-run-tiles; exploring-reveal · move-reach; walk-target. D-12 complies example rewritten for the remaining level 2 part (a new seed) | Bez zmiany znaczenia: reguły symulacji z tych decyzji sprawdzają teraz testy. |

Why: WAY-12 allows level 2 only where no invariant can be derived today, and names a rule a lint check could enforce left at level 2 as a violation; the cycle applied the same reading to D-10 and D-11 (Q32). D-04/3 and D-08/1 keep *Approved by* `Mariusz, 2026-10-13` from the gate record, since their binding sentences are unchanged; the request must name that their *Verification* now differs from the gate-approved wording.

Not written as decisions (stay rows of the choice table, WAY-36 or implementation detail): seed mixing from the previous seed and real time (Q6, within D-12 and D-04/3); every resource with density > 0 on at least one tile (Q7, a drawing detail from loop's tests, held by a unit test); pause kept in the game state (Q8, follows D-04/3); waiting when no program rule applies (Q9 — follows from D-13, since the next game minute is free again; covered by program-rule-pick/1); hidden-tab catch-up (Q10, follows D-11); N range in data (Q11, D-08); hex geometry and known = revealed (Q12, D-16 "known" read as revealed in walk-target/1); event order, exports, RangeError, stream constants (Q40–Q50 rulings).

## Invariants

Written (all Method `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`, Rests on none unless said, Correction none). Each needs a check by an agent that wrote neither the sentence nor the code, and a deliberate break by the code reviewer (WAY-69, WAY-08); the check files then need claiming in the part map (simulation, or browser-view for the two icon checks).

| Invariant | Derives from | Part | Meaning (pl) |
|---|---|---|---|
| simulation-isolation/1 | D-04@ecd038e3 | simulation | Żaden plik symulacji nie importuje pliku spoza symulacji ani nie używa strony, timera, czasu systemowego ani obiektu globalnego przeglądarki lub Node.js spoza samego JavaScriptu. |
| simulation-inputs/1 | D-04@ecd038e3 | simulation | Żadna funkcja eksportowana przez plik symulacji nie zmienia przekazanej jej wartości. |
| content-identifiers/1 | D-08@1f532d10 | simulation · browser-view | Żaden plik TypeScript w `src/browser/` poza `src/browser/sim/data/` nie wymienia mapy gry, zasobu ani archetypu identyfikatorem ani nazwą z plików danych (poza komentarzami). |
| program-rule-pick/1 | D-13@70d1cb2d | simulation | W każdej wolnej minucie gry postać zaczyna wykonywać pierwszą regułę programu, której warunek zachodzi i którą może wtedy wykonać, a gdy żadna nie spełnia obu, nie wykonuje żadnej. |
| exploring-reveal/1 | D-15@6e8b0be3 | simulation | Eksploracja odsłania kafelek postaci, gdy się kończy, i nie da się jej wykonać na odsłoniętym kafelku. |
| move-reach/1 | D-15@6e8b0be3 | simulation | Każdy ruch kończy się na kafelku sąsiadującym z tym, z którego ruch wyszedł. |
| walk-target/1 | D-16@35aef078 | simulation | „Idź — zasób” prowadzi o jeden ruch w stronę jednego z najbliższych (w minutach gry drogi) odsłoniętych kafelków z tym zasobem i nie da się go wykonać, gdy takiego kafelka nie ma albo postać na nim stoi. |
| map-run-tiles/1 | D-14@a9cf9825 | simulation | Na starcie przejścia każdy kafelek ma z każdego zasobu mapy gry albo nic, albo zapas na kafelek z danych mapy, i nie ma zasobu spoza jej listy. |
| restart-seed/1 | D-12@4e289de6 | simulation | Restart ma ziarno przejścia, które zastępuje. |
| icon-file-content/1 | D-17@69da55dd | browser-view | Żaden plik SVG w `assets/icons/` nie zawiera elementu `script` ani `foreignObject`, atrybutu zaczynającego się od `on` ani odwołania poza plik innego niż deklaracje przestrzeni nazw SVG i XLink. |
| icon-credits/1 (Rests on game-icons-licence@a24f9771 · cc-by-3-adaptation-credit@75828134) | D-17@69da55dd | browser-view | Dla każdego pliku SVG w `assets/icons/` stopka gry pokazuje wzmiankę z autorem ikony, jej stroną na game-icons.net, licencją CC BY 3.0 i opisem zmian względem źródła. |

Changed: application-package-layout/1, application-build-layout/1, application-build-output/1 — *Part* gains `simulation` (field only, version kept). A change inside the simulation can make them false (a nested package, or a simulation file that breaks the browser build), and without the part the gate does not run them for such a change (WAY-62, "a writer in doubt names more"). Reverses the Part part of Q21.

## Behavior with no invariant

- Covered now by the invariants above: S1 and S2 (spec § 3), choosing a program rule, waiting when none applies, exploring, moves, walking to a resource, the drawn tiles, the restart seed, icon safety and credits.
- Left at level 2, with why: the browser view's use of the game state, the closed list in the editor and no action by hand (D-04/3, D-13/1), the terrain panel's drawing as a picture (D-09/1), the pause control (D-11/1) — each turns on what the player sees and can do on the page, which no product check drives; exploring that brings no item (D-15/1) — the game holds no item yet to name; where the seed of a new send comes from (D-12/1) — "new" is about its source, and equal values can occur by chance; dimensions, entrance and cost of a move standing in the data (D-14/1) and numbers of content (D-08/1) — where a value stands is a judgment.
- Left to unit tests as implementation detail, binding nothing beyond the decisions: hex geometry, wander's preference for unrevealed neighbours, "Tu leży mniej niż" reading an unrevealed tile as empty, the layout's draw order and every resource on at least one tile, data validation (durations ≥ 1 minute), view helpers.

## Environment facts and glossary terms

- game-icons-licence/1 (new): game-icons/icons at 82d948812bfe3f269ef8f731dcdb07b08160edc4 provides Delapouite's icons under Creative Commons 3.0 BY; source license.txt at that commit, both passages checked word for word; the four delapouite/*.svg exist at that commit (HTTP 200). Method TODO. pl: Repozytorium game-icons/icons przy tym commicie udostępnia ikony autora Delapouite na licencji CC BY 3.0.
- cc-by-3-adaptation-credit/1 (new): CC BY 3.0 Unported § 4(b) requires, for a distributed adaptation, credit to the original author and a credit identifying the use of the work in it; three passages checked word for word on https://creativecommons.org/licenses/by/3.0/legalcode. Method TODO. pl: Licencja CC BY 3.0 wymaga przy rozpowszechnianiu utworu zależnego wskazania autora oryginału i tego, jak utwór został w nim użyty.
- Term `character skill` (new, projected wording whole): D-08/1, written whole from the gate, uses "character skills", and WAY-126 brings a projected entry in with the projected terms it uses. pl: Umiejętność postaci to obszar tego, co postać potrafi, rosnący niezależnie od jej pozostałych obszarów.
- Term `completion` — not written: the projected definition of `map run` (written whole) uses it, so WAY-126 asks for it; written, the glossary guard errors "the term has no use outside the glossary; on the main branch every term has one" (WAY-95), since its only use is inside the `map run` definition. A collision of WAY-126 with WAY-95 without recorded precedence (WAY-25) — question below.
- Words of the orchestrator's list (WAY-97): "free game minute" (4 uses, guard `--uses`), "seed", "tile", "known tile", "program change" — every use carries the meaning a reader of the game field gives (a minute in which the character is busy with nothing; a random seed; a map tile; a tile revealed by exploring; a change of the program), so none takes an entry under the template's "Which words take an entry". "known" stands in D-16/1; walk-target/1 says "revealed", the mechanism the code uses for it.
- `trip plan` (projected term used by `program`, on the main branch since task 1) — not written: the entry using it entered with task 1, this code does not make it true, and the plan assigns it to task 13.

## Part-map changes

- build-tools *Depends on*: browser-view · simulation · account-server — the build compiles `src/browser/**`, the simulation included, through `tsconfig.browser.json` (point a).
- account-server *Depends on*: browser-view · simulation · build-tools — it serves `dist/public`, which holds the compiled simulation, as it holds the compiled view (point a).
- No other change; failure modes stay none (WAY-46, a human's to record). The dependency graph stays unchecked (no product command reports it).

## Foundation compared with code

Touched parts browser-view, simulation, build-tools, product-foundation. Compared D-04/3, D-08/1, D-09/1–D-16/1, the four existing simulation invariants, the five terms and the part map with `src/browser/sim/**`, `src/browser/view/**`, `scripts/build.mjs`, `assets/icons/**`: the code agrees with every binding sentence (pure `{state, events}` functions; `passRealTime` the only entry of real time; layout and wander streams from the seed; restart keeps the seed; choice of the first applicable program rule each free game minute; explore 20 minutes, reveal, not on a revealed tile; walk to the nearest revealed tile with stock by walking minutes; tiles from map data). Mismatches found and settled above: D-06 Scope and three build invariants' Part without the simulation; Depends on of build-tools and account-server; level 2 where invariants can be derived.

Point (d): `tests/invariants/test_application_package_layout.py` classifies neither `simulation` into APPLICATION_PARTS nor NON_APPLICATION_PARTS. No foundation mismatch: for an unclassified part a nested package still fails the check ("classify this part in the package-layout check"), so the sentence stays guarded once *Part* names the simulation. Classifying it as an application part is a change of an invariant test, outside this stage — question below.

Point (c): S1's parts are stated by D-04/3 (pure functions, real time only as an argument; its violates example names the system time and the page) and its randomness clause by D-12/1 with simulation-randomness/1; "imports only simulation files" is the checkable form of that purity, not a rule of its own. S2 is stated by D-08/1. No new decision; each takes its invariant above.

## Projected entries written whole or in part

All projected entries the plan gives item 3 as writer or realizer are in the foundation from the foundation step (D-04/3, D-08/1, map-run-repeatability/1, simulation-randomness/1, program rule, map run, game minute; parts D-12/1–D-16/1). The return step adds the projected term `character skill`, whole, used by D-08/1. `completion` (used by `map run`) is not written — see the question. No projected invariant or fact is made true by this code beyond these.

## Rows of *Settlements to record* written

All four were written by the foundation step and are unchanged in meaning: row 1 D-09/1, row 2 term `restart`, row 3 D-10/1 with action-in-progress/1, row 4 D-11/1 with player-map-run-pace/1. None missed.

## Guards (base = merge-onto = 1701186, part map base only), at f22d367

- decisions: 11 errors, 11 warnings — all `*Approved by* is the placeholder merge of <request link>` (D-03/2, D-09/1–D-16/1, D-06/3, D-17/1); expected.
- environment facts: 0 errors, 0 warnings, 0 unchecked (note: no human_verdicts.md).
- glossary: 0 errors, 0 warnings, 0 unchecked.
- invariants: 0 errors, 0 warnings, 0 unchecked (notes: no violated_invariants.md, no human_verdicts.md).
- part map: 0 errors, 0 warnings, 1 unchecked — "the dependencies between parts, and new or stale violations — no command of the product reports the dependency graph".
- Invariant tests not run in this step; the eleven new invariants have no check yet, so the gate records no verdict for them and gives none a pass.

## Questions

1. `completion`: WAY-126 asks that `map run` enter with the projected terms it uses; WAY-95 refuses a term whose only use is inside the glossary. Options: (a) leave it to task 7, which writes it with its first use outside the glossary (recommended — no merge blocker, the gate wording of `map run` stays); (b) write it now and reword `map run` — no, that changes gate-approved wording.
2. `test_application_package_layout.py`: add `simulation` to APPLICATION_PARTS so a nested package in the simulation fails as an application package rather than as an unclassified part — an invariant-test change for the foundation step's check author, or accepted as it is (the check fails either way).
3. D-04/3 and D-08/1 keep the gate's *Approved by* with a *Verification* that now differs from the gate-approved wording (binding sentences unchanged); the request should name it, or the orchestrator switches them to `merge of <request link>`.

## Part map claim and approvals

Commit 618f29e (branch task/mag-w-lesie, not pushed); files: foundations/part_map.md, foundations/decisions.md.

1. Part map — simulation now claims tests/invariants/test_simulation_isolation.py, test_simulation_inputs.py, test_content_identifiers.py, test_program_rule_pick.py, test_exploring_reveal.py, test_move_reach.py, test_walk_target.py, test_map_run_tiles.py, test_restart_seed.py; browser-view claims test_icon_file_content.py, test_icon_credits.py. No file left unclaimed or doubly claimed (guard: 0 errors).
   Meaning: Każdy z jedenastu nowych testów niezmienników należy do części, której pilnuje — dziewięć do symulacji, dwa testy ikon do widoku przeglądarki.
   content-identifiers: Part reads `simulation · browser-view`; the test scans TypeScript in both parts (7 files under src/browser/sim/, 11 in browser-view), so the scan does not single one out. Chosen simulation: the names the check enforces are read from src/browser/sim/data/ (simulation's files), and the invariant derives from D-08, which keeps the content in the simulation's data.
2. D-04/3 and D-08/1 — Approved by: `Mariusz, 2026-10-13` -> `Mariusz, merge of <request link>`; nothing else changed. Both entries are absent from the main branch (merge base 1701186), so the template ("Before the main branch, an entry is edited in place, and an edit that changes its meaning is accepted again") and the skill (a date only where the readiness gate records it) make the in-place edit right.
   Meaning: D-04/3 i D-08/1 nie powołują się już na zatwierdzenie bramki gotowości, bo ich weryfikacja zmieniła się po niej — zatwierdzi je merge requestu.

Guards:
- part map: `unchecked: the dependencies between parts, and new or stale violations — no command of the product reports the dependency graph`; 0 error(s), 0 warning(s), 1 unchecked.
- decisions: 13 errors + 13 warnings, all the `merge of <request link>` placeholder (D-04/3, D-03/2, D-08/1, D-09/1..D-16/1, D-06/3, D-17/1); note: who approves a version is checked only in the-way's own log.
- invariants: 0 error(s), 0 warning(s), 0 unchecked; notes: no violated_invariants.md, no human_verdicts.md.

Not done: no fresh-agent critique of this set (outside the two allowed skills).
Question: accept simulation as the owner of test_content_identifiers.py, or browser-view (it scans more browser-view files)?
