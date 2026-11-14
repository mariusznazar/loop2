PASS 23981674d61013e1bfc4cc63a71e5112736a520b

# Review of the whole change — task `pierwsza-mapa-bez-loterii`

Range `e54f23c0..23981674` (`git rev-parse HEAD` = `23981674d61013e1bfc4cc63a71e5112736a520b`, matches the dispatch). Route: one author, no plan, no slices, so this is the only review of the change. Worktree `.`, read-only; `git status --short` stayed empty after my checks.

Result: 0 blocking findings, 4 Minor within the task, 3 Minor / lines outside the task. Every item of *To do* 1-8 and both settlement rows is met by the commits. The rendered look of the screen Mapy was not checked by anyone and is carried as unchecked, not as passed (finding M4).

## Answers to the points the dispatch told me to judge

- **Trust boundary `src/browser/sim/saved-game.ts` (yes).** The change adds no key and no branch to the loader; it only raises `SAVED_GAME_VERSION` 5 to 6 (`saved-game.ts:78`). I probed the built loader with documents made by `savedGame(withSaveTime(newGame(), …))` and a changed `solvedMaps` (scratch script in the session scratchpad, not in the repository):
  - version 5 with `[]` is refused as `version`; version 6 with `["forestEdge","forest"]` loads; `["forestEdge","forestEdge"]` and `["bogus"]` are refused as `shape`;
  - version 6 with `["forest"]` (Las solved, Skraj lasu not) **loads**, and so does `["forestDeep"]` alone. The loader has never checked the order of opening against `opensAfter` (the same was true of Las — głębiej before the change), so a hand-made document can hold a state the game cannot make. The rule of the guideline is "refuse more, never less"; refusing more is allowed, not required, and D-386 only requires that the load admit what the game makes. Nothing here is a regression and the new version already discards every real old save; see O1.
  - The tests pin: version 5 refused as `version`, also with the new maps in it; version 7 refused; `["forest","desert"]` refused as `shape`. Nothing pins what a version 6 document with Las solved and Skraj lasu not does (see O1).
- **Irreversible operation (no).** Confirmed: the change touches only repository files (data, a constant, tests, entries, README, skill copies); `git diff --name-only` shows no file outside the repository's tracked tree and no script that writes elsewhere. Building and the checks I ran wrote only `dist/`, `.stryker-tmp/`, `.runs/`.
- **The three autonomous choices.** `forestEdge` as the identifier: fine (the old Loop's name, the view builds addresses from the data, D-332; `content-identifiers` tripwire updated in `tests/invariants/test_content_identifiers.py`). First key of `MAPS`: fine, it is what the list order of Mapy (`map-lines.ts:13-19`) and the usual-step tie rule (D-333, all steps are 5) need; the testing guideline now forbids choosing a map by place, and the new tests choose by identifier. 500 seeds: fine; `first-map-balance.test.mjs` runs inside the node tests and the decent program solves 483 of 500 by the author's measurement (I re-ran the file: it passes).
- **Version 4 in the task, 5 on the base.** The base has 5 (`git show e54f23c0:src/browser/sim/saved-game.ts`); the task's "4" is a stale figure. The task asks for one raise; 5 to 6 is one raise. Right.
- **Departures of the written entries from the approved wording.**
  - D-396 *Relations* `TODO` to `derives from D-136 · derives from D-149`: the template (`.the-way/elements/decisions/template.md:58`) says *Relations* never reads `TODO`; the two decisions it names are the ones its own sentence rests on (the opener in the data, availability of a map opened by another). Does not widen the meaning.
  - D-396 *Verification* `invariants: first-map-stock` to `first-map-stock · first-map-balance`: `first-map-balance` derives from D-396, so the template wants it named. It adds a link, not a claim.
  - `first-map-stock` *Method* `review` to `test`: matches `.the-way/elements/invariants/skill/SKILL.md:57-58` (the task that writes a projected invariant turns it to `test` where a cheap test checks it), and `tests/sim/layout.test.mjs` cites it. `foundation_check.py` accepts it.
  - The binding sentence, *Rationale* and *Rejected* of D-396 and the binding sentence and *Derives from* of `first-map-stock` match the task's quoted projected wording word for word (compared line by line with the frozen task, *Decisions in play*).
- **Reach (2), `offeredResources`.** It belongs to the task, and it is not regression risk for the case it changes; the author's statement "no decision names this behaviour" is wrong. D-289 (`foundations/decisions.md`, "What does the rule panel show greyed, and with which reason?") says: "While the game holds no map run every discovered target may be picked" and its *Verification* complies line says "with no map run in the game, „Zbierz” offering every discovered item". Before the change the editor offered the resources of the first map of the data, which was Las with all four; after the change that first map holds two, so without the edit moss and fibre would never be offered outside a run and D-289 would be broken. The edit restores what D-289 says. For a game that had Las first the result is the same four resources in the same order. Grade: no finding for the behaviour; the missing mention is Minor (M2). A missing decision is not owed: D-289 already holds it.
- **Reach (1), 62 migrated test files.** Judged from the diffs of `completion`, `maps-screen`, `account-screen`, `screen-address`, `saved-game`, `data`, `layout`, `program-editor`, `map-lines` and the fixture: the migration puts `forestEdge` into `solvedMaps` where a state sends to Las, expectations of `solvedMaps` gain `"forestEdge"`, and tests about the new game itself use the real new game. No assertion is weakened (counts, equalities and deep equalities stay; new cases are added for Skraj lasu). The rule of `guidelines/testing.md` "Changing an existing test" asks for a cause on the side of the data: the cause is D-149 plus the new opener, stated in the fixture's docstring. One defect found in the migration: M1.
- **Reach (3), (4).** `tests/invariants/*.py` and `program_fixture.py`: needed, because those drivers start from a new game and send to Las. `stryker.config.json`: required by `tests/quality/test_mutation_test_selection.py`. README, `loop2-play` skill and `compose-state.mjs`, both `.claude` and `.agents` copies: needed, they told the reader to click a row that is no longer listed and `compose-state.mjs` sent a new game to `forest`, which now throws; the copies are byte-identical (`cmp`) and `node .claude/skills/loop2-play/compose-state.mjs` prints a version 6 document (exit 0). D-19 *Rejected* "four in the first game map" to "four in Las": a correct and small correction the task's rule (To do 8, Q3) allows ("every other sentence the search finds false"); it is not named in the task but it falls under To do 8.
- **UI check.** `.the-way/task-cycle/change/ui_check.md` asks for a screenshot of the running product by the route the foundation settles (the `loop2-play` skill) when a change alters what a screen shows. The screen Mapy now lists Skraj lasu alone in a new game, shows a new card (with „≈ 16 z 16 kafelków”) and a new line „odsłania ją Skraj lasu” on the card of Las; the program editor's resource selects change before a run. The author did not take a screenshot; the states are checked in jsdom. I also did not take one. Carried as unchecked (M4); no screenshot file lies in the range (`git diff --name-only` shows none).

## Findings

### Blocking (Critical / Important within the task)

none.

### Minor, within the task (the cycle may cut these into the findings file of the fix)

**M1. The current-version document of the saved-game test does not hold what its comments and the author's report say.** `tests/sim/saved-game.test.mjs:668` (`DOCUMENT`: `game: { ...DOCUMENT_V5.game, solvedMaps: ["forest"] }`) and `:710` (`HEADQUARTERS`: `solvedMaps: ["forest"]`). The docstring above `DOCUMENT` (`:665`) and the file's header comment (`:54-55`) say it is "version 5 with Skraj lasu solved before the Las it opens" / "with Skraj lasu among the solved maps", and the author's report (*Trust boundary*, *Choices* 5) says a version 6 document with `["forestEdge","forest"]` loads whole and that "leaving `["forest"]`" was rejected. The code leaves exactly `["forest"]`: Las solved, Skraj lasu not, a state the changed game can no longer make. The override on `:668` is also a no-op against version 5. Why it matters: the document that stands for "the shape of the current version" describes a game the game cannot produce, its comment tells the next author (task 10 touches this file) the opposite, and a later loader that refuses more (allowed) would turn this reference document red for a reason that has nothing to do with the shape. Evidence: `grep -n 'solvedMaps' tests/sim/saved-game.test.mjs` (lines 447, 668, 710); `git show HEAD:tests/sim/saved-game.test.mjs | sed -n 652,672p`; `grep -n forestEdge tests/sim/saved-game.test.mjs` finds it only at `:773`, `:2592`, `:2789`. Fix: `["forestEdge", "forest"]` in `DOCUMENT` and `HEADQUARTERS` (a version 6 document that fills every branch should hold the maps a game that reached Las holds), or correct the comments.

**M2. The behaviour of `offeredResources` is stated without its decision, and its test does not pin the word "every".** `src/browser/view/program-editor.ts:177-191` (doc comment) and `tests/view/program-editor.test.mjs:694-708`. The comment and the test name give no reason for "every map of the data" although D-289 gives it; the author's report says no decision exists. The test starts from `withEdgeSolved(newKnowingGame())`, where both Skraj lasu and Las are open, so a variant offering the resources of the open maps only would also pass; D-289 says "every discovered target". Fix: cite D-289 in the comment, and make the first assertion on `newKnowingGame()` (nothing solved) expecting all four.

**M3. The invariant `first-map-balance` carries test details that the foundation need not hold, and one claim no test checks.** `foundations/invariants.md` (new entry): the sentence names "500 map runs", "one millisecond apart, from 1760000000000" and says the naive program "never leaves the entrance tile". The approved row says only "kilkuset ziaren, które sam wymienia" (several hundred seeds the test itself names). Putting the clock constant into the foundation means any change of the test's seed choice is a change of an invariant (a choice of the test, not a requirement), and "never leaves the entrance tile" is not asserted by `tests/sim/first-map-balance.test.mjs` (its preconditions check only the rule counts 6 and 12). WAY-263: the entry restates the row more narrowly and adds an unchecked claim. Fix: say "on several hundred map runs the test names" and either drop the clause or assert it.

**M4. The rendered Mapy screen was not checked.** See *UI check* above: owed by `ui_check.md`, not performed by the author or by me; jsdom shows structure and text, not rendering. To be carried to the request as "screenshot of Mapy (new game, card of Skraj lasu, card of Las with „odsłania ją Skraj lasu”) unchecked".

### Minor, outside the task

**O1. The loader accepts a version 6 `solvedMaps` that does not fit the opening order** (`saved-game.ts:1214`, `uniqueOf(read.solvedMaps, MAPS)`): Las without Skraj lasu, Las — głębiej alone. The same held before the change for Las — głębiej without Las; D-386 does not require refusing it and the guideline allows refusing more. Effect: a hand-edited save of the player's own account lists Las — głębiej although Las cannot be sent to (D-07, D-206: it costs its own player). No test says whether it should load. Out of the task; a one-line decision plus a test would settle it.

**O2. D-136 *Rationale*** "Las teaches keeping the loop going, Las — głębiej adds combat" is now half of the picture (Skraj lasu is the first step, D-396). The task lists D-136 among the sentences it checked and left (*Context*, last bullet) and the sentence is not false, so it is left; the author flagged it. Outside the task.

**O3. `guidelines/testing.md:111`** ("Przypadek bierze pierwszą mapę z danych gry przez `Object.entries(MAPS)[0]` i nazywa ją `forest`") is a *Bad* example; after this change the first map is `forestEdge`, so the example now names a mistake that is also wrong in a second way. Still true as a bad example; no change owed.

## Foundation: corrections of To do 8 and the search by meaning

Complete and exact for what the task names: D-121 (title, first sentence, *Rationale* "in Las" removed), D-124 (*Rationale* "84 of them on Skraj lasu"), D-330 (*Verification* complies: row of Skraj lasu), D-378 (*Rationale* "Las is passed by writing a program"), D-388 (*Rationale* "third map"), D-19 (*Rejected* "four in Las"). I compared each with the sentence the task gives ("zmiana przez to zadanie") and the diff touches nothing else of those entries. The task's two sentences about D-124 / D-330 match what is written.

By meaning I searched `foundations/decisions.md`, `invariants.md`, `glossary.md`, `environment_facts.md`, `part_map.md`, `guidelines/`, `README.md`, `.claude`, `.agents` for: "first map", "the map", "only map", "new game" near map, "first run", "first discovery", "list of maps", "solved map", "order of the maps", "Las" with first/start/opens, and read each hit where it stood. Sentences that remain true and need no change: D-24 (fixed entrance, first map run a tutorial), D-118 (first map run is a tutorial), D-122 (what is left in Las), D-136 (see O2), D-149, D-325/D-331 (examples at `#/mapy/forest` presuppose Las open), D-327, D-328, D-333 (usual step; all steps are 5), D-123, D-212, D-249, D-251, the glossary (no entry names a first map). No sentence the change makes false was found beyond those corrected. I did not read D-123, D-325 and D-362 whole (see Unread material), so "no other false sentence" rests on the searches above for those three.

Invariants and tests changed: the Python invariant tests `test_content_identifiers.py` (tripwire list), `test_map_run_tiles.py` (control "missing from some tile" excepted for a map with density 1, which is correct: it cannot hold there), `test_minute_span_split.py`, `test_player_map_run_pace.py`, and the fixture `program_fixture.py`; node invariant tests `save-version` cases in `tests/sim/saved-game.test.mjs` (new case "the document of version 5 is refused as version…", constant pairing now `DOCUMENT_V5.version + 1`). The new cases cite `first-map-stock`, `first-map-balance` and `save-version`.

## Against the task, item by item

1 data of Skraj lasu: `src/browser/sim/data/maps.ts:61-76` has every number; checked against To do 1 and D-397; whole object pinned in `tests/sim/data.test.mjs`. 2 stock on every tile: `tests/sim/layout.test.mjs` over seeds 0..200 and 4294967295 (drawing by density 1 and `[0,1)`). 3 list, opener, card: `opensAfter: "forestEdge"` on Las (`maps.ts:94`); `map-lines.test.mjs`, `maps-screen.test.mjs`, `completion.test.mjs`, `screen-address.test.mjs`. Las — głębiej still opens after Las. 4 sentences: identical text to Las. 5 version raise once and discard: `account-screen.test.mjs` sends version 5 as the old save and expects the new game and the sentence of D-96. 6 balance test: two programs of the task's *Context* written in the test, no note named (D-82, D-362), account with everything discovered, 500 named sends, thresholds 95 % and 50 %; the author showed it red with density 0.7 (236 of 500) and I re-ran it green. 7 entries: D-396, D-397, `first-map-stock`, `first-map-balance` present and `foundation_check.py` reports 0 errors. 8 corrections: above. Out of scope respected: nothing about the first-run criterion (task 10), death without practice, or moving the measuring tool into the repository.

Source fidelity: D-397 *Rationale* and *Rejected* carry the measurement figures (16.8 / 96.4 / 97 %, 16.8 / 91.2 / 97 %, 83.6 / 100 / 100 %) and the costs of the three ways exactly as the task's *Context* and Q1, Q2 give them; nothing is invented. D-397 *Rationale* adds one connecting sentence ("so its numbers are those under which a loss on it is a fault in the program"), which restates D-396 and does not widen it.

Reserved choices: none taken (no language, framework, library, store, login or place to run).

## The author's own-work check

It named To do 8 (search by meaning) as the weakest part and the views in a real browser as the second. The check made for To do 8 (word search then reading each hit) would not by itself find a sentence false without those words; my search by meaning found nothing further, so the requirement is met, but the author's claim that decisions were "searched by words" stands. For the screenshot the author named the gap honestly (M4). The check did not name the saved-game test fixture, which is where it was weakest in practice (M1): the report claims a state the file does not contain.

## Declined to judge

- Whether Skraj lasu is balanced well enough for players beyond the two thresholds the task sets (D-397 *Rationale* already records that the numbers were measured on a copy of the engine).
- Whether a version 6 loader should refuse an opening order the game cannot make (O1).
- The wording of D-136 *Rationale* (O2): the task left it.
- The rest of the 62 migrated files: judged from the diffs I read plus the author's rule; I did not read each of the 60 mechanically changed files whole.
- The visual look of the screens (M4).

## Checks I ran (command, exit code)

| Check | Command | Exit | Reading |
|---|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors" |
| Focused node tests | `node --test tests/sim/saved-game.test.mjs tests/sim/first-map-balance.test.mjs tests/view/program-editor.test.mjs` | 0 | 102 tests, 102 pass, 0 fail |
| Changed Python invariants | `python -B scripts/test.py <file>` for `tests/invariants/test_content_identifiers.py`, `test_map_run_tiles.py`, `test_minute_span_split.py`, `test_player_map_run_pace.py` | each 0 | |
| Skill copy and selection | `python -B scripts/test.py tests/agent_workflow/test_loop2_play_skill.py` and `tests/quality/test_mutation_test_selection.py` | each 0 | |
| Skill script | `node .claude/skills/loop2-play/compose-state.mjs` | 0 | prints a version 6 document; `cmp` of the two copies: identical |
| Loader probe (hostile `solvedMaps`) | scratch script in the session scratchpad over `dist/browser/sim/` | 0 | see *Trust boundary* |
| Mutation tool, as `guidelines/testing.md` (*Mutation testing*) gives it | `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/maps.ts"` | 0 | 0 mutants (the file is object literals only, which the tool does not mutate) |
| Mutation tool, version constant | `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/saved-game.ts:78-78"` | 0 | 0 mutants (a numeric literal); also an earlier call with a comma-joined range gave 0 mutants and a warning that the second pattern matched no file, so I repeated each file alone. The changed sim files therefore leave no mutant to classify; the proof that the data and the version are tested is the red runs the author reports and the tests named above, not the tool. |

Not run: `npm test` with no argument (the cycle's own); the whole node set of `tests/sim` and `tests/view` (the author ran it, 2023 pass; the cycle's gate runs it); the other Python invariants the author listed (19 more files); the gate's remaining Python tests; any browser or screenshot check.

## Reaches beyond the dispatch (what, where, why)

- `foundations/decisions.md` D-289, D-331, D-332, D-330, D-121, D-96 (head and tail), D-19: to judge reach (2), the list of Mapy and the corrections. D-289 was the decisive one.
- `foundations/decisions.md` by word search (`first map`, `new game`, `Las`, `solved`, `Mapy`, `moss`, `fib`): by meaning, for To do 8.
- `.the-way/elements/decisions/template.md`, `.the-way/elements/invariants/skill/SKILL.md`, `.the-way/elements/common/rules.md`: to judge the three departures and WAY-263.
- `src/browser/view/discovery-rule.ts`, `src/browser/view/map-lines.ts`, `src/browser/view/end-window-lines.ts`, `src/browser/sim/game.ts:84-92`, `src/browser/sim/data/scene.ts` (one background for every map): to find other users of the first map and of the order of the maps; none depends on the first map any longer.
- `guidelines/coding-simulation-module.md` was not read (no changed file is a simulation module outside the data and saved-game kinds).

## Unread material

Counts for the decisions of my selection. Selection: the 180 decisions whose *Scope* names `simulation` (listed by title) plus the decisions the work and the searches named in `browser-view`.

- Read whole: 35 — D-18, D-19, D-22, D-24, D-51, D-67, D-80, D-82, D-91, D-118, D-121, D-122, D-132, D-133, D-134, D-136, D-142, D-144, D-149, D-187, D-196, D-206, D-212, D-214, D-241, D-249, D-251, D-327, D-330, D-331, D-332, D-333, D-386, D-396, D-397.
- Read in part: D-96 (opening and closing parts only), D-124 and D-378 and D-388 (the corrected sentence and its surroundings through the diff and word search, not the whole entry), D-289 (binding sentence, *Verification*, a part of *Rationale*).
- By title only: the other simulation-scope titles of the list (about 145), and for `browser-view`-only decisions only those my searches touched; I did not list the `browser-view` scope by title.
- Decisions that bear on the change and stayed unread: D-123 (what the game writes into the program at a discovery), D-325 (the screen Mapy; read only through quotations of its *Verification*), D-362 (the rule that a tracked file names no private note; its binding fragment is in the task), D-368 (end window; read through D-122/D-132). D-125, D-126 and D-143 were scanned by title only.
- Invariants: the two new ones (`first-map-stock`, `first-map-balance`) read whole in the diff; `save-version` and the other invariants of `simulation` and `every` were not read whole. Part map: read in full as printed (`simulation`, `browser-view`, `build-tools`, `agent-workflow`, `product-foundation`); the remainder of the file (deployment, test-helpers) not read. Glossary: read whole.
- Guidelines read whole: `guidelines/coding-content-data.md`, `guidelines/coding-saved-game.md`, `guidelines/testing.md`, `guidelines/coding-browser-module.md` (lines 1-359), `guidelines/coding.md` (read through the rules and examples), `src/browser/AGENTS.md`. Not read: `guidelines/styleguide-browser-view.md` (979 lines; no look, colour or length was changed, and I judged only the behaviour of a selection list), `guidelines/coding-simulation-module.md`.
- Files: `src/browser/sim/saved-game.ts` read at 70-130 and 1180-1290 and the exported functions; `src/browser/view/program-editor.ts` only the changed function and its neighbours; the 60 mechanically migrated test files not read whole.
- The author's handoff file `author-handoff.md`: not read (the dispatch carries what I needed).

## Searches not found or unclear

- A decision for the resource selects of the program editor "before a map run": found in D-289 (see above), not where the author looked.
- The comment "under the data of the maps" of D-388 that the task's *Context* cites: not present in `maps.ts` (as the author also found); the corrected sentence is the *Rationale* in `decisions.md`.
- `Object.entries(MAPS)[0]`-style choices in `tests/`: none left (confirmed by `git grep` for `[0]` use in `src/browser`; in `tests/` only `guidelines/testing.md:111` names it as a bad example).
- A place the foundation settles for screenshots outside the repository: not looked up, since I took none (M4).
- Unclear: whether the task meant the opener of Las to be the identifier `forestEdge` literally ("jako mapę otwierającą"): taken as yes, confirmed by `maps.ts:94` and the tests.
