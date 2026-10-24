# Author report — task cycle `siedziba-i-druzyna`

- **Status:** done with concerns (the concerns are about wording of foundation prose, not about the code; see "Concerns")
- **Role:** one author of a change without a plan (`the-way-make-change`, pinned `.the-way` at `86b78ad`)
- **Worktree / branch:** `C:\Storage\repos\loop2-wt\siedziba-i-druzyna`, `task/siedziba-i-druzyna`, base `a945cf1`
- **Commits:**
  - `53b30d0` feat: open the game in the headquarters with the player's one team, its empty chest and the creation of elemental mages, and send a character of the team from there
  - `24bbc2d` docs: record D-50 to D-55, the invariant character-team and the glossary term headquarters
- Author address on both commits: `mariusznn@gmail.com` (`git log --format='%h %ae'`).

## Files changed (`git diff --numstat a945cf1 HEAD`, added / removed)

| File | + | − |
|---|---|---|
| foundations/decisions.md | 127 | 0 |
| foundations/glossary.md | 7 | 0 |
| foundations/invariants.md | 10 | 0 |
| foundations/part_map.md | 1 | 0 |
| guidelines/coding-browser-module.md | 1 | 1 |
| src/browser/sim/data/archetypes.ts | 3 | 0 |
| src/browser/sim/game.ts | 53 | 21 |
| src/browser/sim/run.ts | 3 | 3 |
| src/browser/sim/types.ts | 22 | 2 |
| src/browser/styles.css | 47 | 2 |
| src/browser/view/app.ts | 13 | 6 |
| src/browser/view/clock.ts | 2 | 2 |
| src/browser/view/headquarters.ts (new) | 176 | 0 |
| src/browser/view/program-editor.ts | 3 | 3 |
| src/browser/view/send-panel.ts (deleted) | 0 | 41 |
| tests/invariants/test_character_team.py (new) | 177 | 0 |
| tests/invariants/test_action_in_progress.py | 8 | 5 |
| tests/invariants/test_exploring_reveal.py | 8 | 5 |
| tests/invariants/test_map_run_layout.py | 10 | 7 |
| tests/invariants/test_map_run_repeatability.py | 10 | 7 |
| tests/invariants/test_map_run_tiles.py | 11 | 7 |
| tests/invariants/test_move_reach.py | 8 | 5 |
| tests/invariants/test_player_map_run_pace.py | 8 | 5 |
| tests/invariants/test_program_closed_lists.py | 11 | 6 |
| tests/invariants/test_program_rule_pick.py | 8 | 5 |
| tests/invariants/test_program_world_reference.py | 10 | 6 |
| tests/invariants/test_restart_seed.py | 10 | 7 |
| tests/invariants/test_simulation_inputs.py | 17 | 8 |
| tests/invariants/test_simulation_isolation.py | 10 | 4 |
| tests/invariants/test_simulation_randomness.py | 10 | 6 |
| tests/invariants/test_terrain_drawing_numbers.py | 10 | 6 |
| tests/invariants/test_walk_feasibility.py | 9 | 5 |
| tests/invariants/test_walk_target.py | 9 | 5 |
| tests/sim/team.test.mjs (new) | 107 | 0 |
| tests/sim/actions.test.mjs | 4 | 4 |
| tests/sim/data.test.mjs | 28 | 19 |
| tests/sim/flow.test.mjs | 11 | 6 |
| tests/sim/program.test.mjs | 4 | 4 |
| tests/sim/purity.test.mjs | 6 | 4 |
| tests/sim/time.test.mjs | 5 | 4 |
| tests/view/headquarters.test.mjs (new) | 22 | 0 |
| tests/view/program-editor.test.mjs | 18 | 5 |
| tests/view/status-row.test.mjs | 4 | 3 |
| tests/view/terrain-picture.test.mjs | 4 | 3 |
| tests/view/tile-list.test.mjs | 4 | 3 |

## What the change does

- **State** (`src/browser/sim/types.ts`): `GameState` gains `team: { characters: Character[]; chest: { pieces } }` and `nextCharacterId`; `Character = { id, name, archetypeId }`; the map run's character is `{ id, at }` — it names the team's character by id and holds no archetype of its own.
- **Simulation** (`src/browser/sim/game.ts`): `newGame` starts with an empty team and an empty chest (row 1); `characterName(text)` trims and returns `null` for an empty name; `createCharacter(state, name)` appends a character in the archetype the data names, throws on a name empty once trimmed, allows repeated names (rows 2, 4); `send(state, { mapId, characterId }, realMs)` takes a character of the team, throws for an id no team holds and while a map run goes on (row 5); `restart` keeps the run's character id. `src/browser/sim/run.ts`: `newMapRun` takes `{ mapId, characterId }`.
- **Data** (`src/browser/sim/data/archetypes.ts`): `CREATED_ARCHETYPE: ArchetypeId = "elementalMage"` — the archetype of every created character, so no code outside the data names an archetype (`content-identifiers`).
- **View**: `src/browser/view/headquarters.ts` replaces `send-panel.ts`: heading „Siedziba”, section „Drużyna” (note „Drużyna nie ma jeszcze postaci.” when empty; per character: name in `text-strong`, archetype name from data in `text-secondary`, „Mapa: Las” from data and the shared button „Wyślij” with accessible name „Wyślij: <imię>, mapa <mapa>”, disabled while a map run goes on), the creation row („Nowa postać: Mag żywiołów” from data, the shared text field with hint „Imię”, the shared button „Załóż”, Enter also creates; an empty name shows „Wpisz imię postaci.” through the field's error state, which is `warning`), section „Skrzynka” („Skrzynka jest pusta.” when empty, else one line per resource held). `app.ts` swaps the send panel for the headquarters in the same place beside the program panel; `clock.ts` sends `{ mapId, characterId }`; `program-editor.ts` reads the first map from `sendMaps()` instead of `sendTargets()`. `styles.css` replaces the send-panel rules with headquarters rules, all values through tokens.
- **No carrying capacity** added (task *To do* 6, cycle Q1: task 4 not merged).

## Foundation entries written (step "foundation step"), each with one sentence of meaning in Polish

| Entry | Source | Meaning (pl) |
|---|---|---|
| D-50 — Whose is the chest? (part) | projected „(new) — Whose is the chest?”, the part *Decisions in play* assigns to task 11 | Skrzynka należy do drużyny; każda postać należy do dokładnie jednej drużyny, a postać nie ma własnej skrzynki. |
| D-51 — What team does a new game start with? | *Settlements to record* row 1 | W MVP nowa gra zaczyna się z pustą drużyną, a gracz zakłada pierwszą postać w siedzibie, zanim wyśle kogokolwiek na mapę. |
| D-52 — How is a character named? | row 2 | W MVP postać ma imię wpisane przez gracza przy zakładaniu; imię puste, także puste po obcięciu spacji z brzegów, nie zakłada postaci, a dwie postacie mogą nosić to samo imię. |
| D-53 — Where does the player send a character from, and where does „Zakończ” lead? | row 3 | W MVP gracz wysyła postać na mapę z siedziby, a „Zakończ” wraca do siedziby. |
| D-54 — In what order do the characters of the team stand? | row 4 | W MVP postacie drużyny stoją na liście w kolejności założenia. |
| D-55 — How many manual map runs go on at a time? | row 5 | W MVP gra prowadzi naraz jedno ręczne przejście mapy: dopóki jedna postać jest w przejściu, gra nie wysyła innej. |
| invariant `character-team` | projected `character-team/1`, whole | Każda postać należy do dokładnie jednej drużyny. |
| glossary `headquarters` | row 6 | Siedziba to ekran gry poza przejściem mapy, który pokazuje drużynę gracza z jej postaciami i jej skrzynką. |
| part map: `simulation` *Files* gains `tests/invariants/test_character_team.py` | the new invariant test | Test niezmiennika character-team należy do części simulation. |

Notes on the entries:

- D-50 keeps the approved wording of the part task 11 writes: „The chest belongs to a team. Each character belongs to exactly one team, and a character has no chest of its own.” The cap („has a cap on the total count of pieces, by the same rule of capacity as the backpack”), „and uses its chest”, the violating example „a chest capped per kind of item” and the rationale sentence „One rule of capacity serves both the backpack and the chest” are left for task 13; no TODO marks them. *Scope* (projected `TODO`) is `simulation, browser-view`. *Verification* names `character-team`.
- `character-team`: *Method* `test` (projected `TODO`), *Derives from* D-50 (projected `TODO`), *Part* `every`, *Violated* `no`. The projected form had a field *Correction*; the current template and loop2's file use *Violated*, so the entry follows the template.
- D-51 to D-55 begin „In the MVP” and hold none of „only”, „never”, „always”, „without” (checked by reading; D-55's „sends no other” is the row's own exclusion inside the MVP).
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, „0 errors” (`reports/01-author-foundation-check.log`).
- Search of the whole foundation: `git grep -i` for „send panel”, „sending screen”, „team”, „chest”, „headquarters”, „siedzib” over `foundations/`, `guidelines/`, `README.md`, `AGENTS.md`, `src/browser/AGENTS.md` found only `guidelines/coding-browser-module.md:21` (the `send-panel.ts` row, fixed). The glossary terms `map run` („one attempt of one character”) and `map run restart` („a map run of the same character on the same game map”) stay true: a restart keeps the run's character id. No decision collides with D-50..D-55; none narrows another.

## Checks run (command → exit code)

| Command | Exit | Result / log |
|---|---|---|
| `npm run typecheck` | 0 | no output |
| `npm run build` | 0 | `reports/01-author-build.log` |
| `node --test tests/http.test.mjs tests/startup.test.mjs "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 | 183 tests, 183 pass (`reports/01-author-node-tests.log`) |
| `python -B -m unittest test_character_team test_action_in_progress test_exploring_reveal test_map_run_layout test_map_run_repeatability test_map_run_tiles test_move_reach test_player_map_run_pace test_program_closed_lists test_program_rule_pick test_program_world_reference test_restart_seed test_simulation_inputs test_simulation_isolation test_simulation_randomness test_terrain_drawing_numbers test_walk_feasibility test_walk_target test_content_identifiers test_browser_view_framework test_browser_view_token_values test_browser_view_focus_outline` (from `tests/invariants`) | 0 | 69 tests OK (`reports/01-author-invariants-touched.log`) |
| `python -B .the-way/gate/run_tests.py tests/quality` (ESLint, Prettier, Ruff, ShellCheck invariants) | 0 | 31 tests OK (`reports/01-author-quality.log`) |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa tests/invariants` | 0 | `reports/01-author-ruff.log` |
| `npx eslint --max-warnings 0 src/browser tests/sim tests/view` | 0 | no output |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser tests/sim tests/view` | 1 | only `src/browser/AGENTS.md` (Markdown, outside the invariant's patterns, untouched by this change); every code file passes |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |

### The invariant test `character-team`: failing and passing runs

- Failing run 1 — `send`'s team check disabled for a moment (`if (false && !state.team.characters.some(…))`), then `python -B -m unittest discover -s tests/invariants -p "test_character_team.py"` → **exit 1**: `test_a_send_of_a_character_no_team_holds_is_refused` fails with „step 5 (send): the map run's character 0 stands 0 times in the lists of the teams” (`reports/01-author-character-team-failing.log`).
- Failing run 2 — `createCharacter` not advancing `nextCharacterId`, same command → **exit 1**: both tests fail, „the character 1 stands 2 times in the lists of the teams” (`reports/01-author-character-team-failing-ids.log`).
- Passing run — code restored (copy compared, `git diff` shows only the intended change), `npm run build`, same command → **exit 0**, 2 tests OK (`reports/01-author-character-team-passing.log`).

### `tests/sim/team.test.mjs`: written after the code, so seen failing by mutation

The code came before this file, so each test was seen failing against a mutation and passing against the code (`reports/01-author-team-test-mutations.log`; `node --test tests/sim/team.test.mjs` after `npm run build`):

- no trimming (`const name = text;`) → exit 1: the trim test and the empty-name test fail;
- prepend instead of append → exit 1: the order test, the shared-name test and the trim test fail;
- `send` without the in-progress refusal → exit 1: the one-map-run-at-a-time test fails.

### Not run

- The full suite `npm test` — the cycle's run before the request, by `make-change`. Known on this machine from the base gate: `test_loop2_one_serving_process` setUpClass fails (`Get-NetTCPConnection`), container tests skip without Docker.
- The invariant tests not touched by this change and not reached by it (deploy, account server, icons, tokens' contrast and sources, kitchen-sink build) — unchanged code; left to the cycle's full run.

## Invariant tests altered (WAY-03) — each to be named in the request

All are setup changes only — the reading of each sentence and every assertion stand: `SENT` becomes `{"mapId": "forest", "characterId": 1}` and each scenario creates a character (`["createCharacter", "Ala"]`) right after `newGame`, since a new game has no character to send; docstrings that list the driven functions gain `createCharacter`; „sending screen” becomes „headquarters” in messages.

- `tests/invariants/test_action_in_progress.py` (action-in-progress), `test_exploring_reveal.py` (exploring-reveal), `test_map_run_layout.py` (map-run-layout), `test_map_run_repeatability.py` (map-run-repeatability), `test_move_reach.py` (move-reach), `test_player_map_run_pace.py` (player-map-run-pace), `test_program_rule_pick.py` (program-rule-pick), `test_simulation_randomness.py` (simulation-randomness), `test_terrain_drawing_numbers.py` (terrain-drawing-numbers), `test_walk_feasibility.py` (walk-feasibility), `test_walk_target.py` (walk-target) — step lists only; indexes they use are computed from the lists or filter records by step name.
- `test_restart_seed.py` (restart-seed) — additionally its two hard-coded record indexes move by one, `main[2]`/`main[15]` → `main[3]`/`main[16]`, for the inserted step.
- `test_map_run_tiles.py` (map-run-tiles), `test_program_closed_lists.py` (program-closed-lists), `test_program_world_reference.py` (program-world-reference) — their own drivers create the character before sending. The seeds do not move: `createCharacter` leaves `lastSeed` as it is, so `SINGLE_TILE_TIMES` of map-run-tiles still hold (the test passes).
- `test_simulation_inputs.py` (simulation-inputs) — strengthened: `characterName` and `createCharacter` join the table of functions called with chosen inputs (`NAMES = ["Ala", "  Ola ", "", "   "]`), and the scenario's states include the state after a character is created.
- `test_simulation_isolation.py` (simulation-isolation) — `createCharacter` joins `NO_RUN_FUNCTIONS`, and the made-up game module of the control gains `createCharacter`, which reads through the no-run path like the others (without it the clean made-up game would raise a TypeError and the control would fail).
- New: `tests/invariants/test_character_team.py` (character-team).

## Own-work check (section 3)

- **Requirement most likely missed:** *To do* 5 — „Wyślij” at the other characters inactive while a map run goes on, and „Zakończ” back to the headquarters with the team intact — because the headquarters is hidden during a run, so the disabled state is easy to leave untested. **Check:** in the running product (below) I sent „Ola”, read the three „Wyślij” buttons' `disabled` during the map run (`[true, true, true]`), pressed „Zakończ”, and read them again (`[false, false, false]`) with the list unchanged („Ala”, „Ola”, „Ala”). In the simulation, `team.test.mjs` „while one character's map run goes on, no other character of the team is sent” checks the refusal. **Result:** met.
- **Weakest point of the change:** the character's identity. Characters are told apart by `id` from the counter `nextCharacterId` in the state, never by name (D-52 lets names repeat). The counter must survive the save of task 16 and any deletion later; an id computed from the list's length would break on deletion. **Check:** `test_character_team.py` failing run 2 (counter not advanced → duplicate ids caught) and `team.test.mjs` „two characters may share a name and stay two characters”. **Showed:** a duplicate id is caught by the invariant test.

## User-interface states checked

No settled route exists in the foundation for a screenshot of the running product (D-19's verification says a real browser „which the repository does not declare”), so the screenshot by a settled route is **unchecked for that reason**. As extra evidence I ran the built product locally (`LOOP2_LISTEN_HOST=127.0.0.1 LOOP2_LISTEN_PORT=38411 node dist/server/main.js`, stopped afterwards) and drove it with the Playwright MCP browser at 1280×800, reading state by projection and saving screenshots under `reports/`:

| State | How inspected | Evidence |
|---|---|---|
| empty team, empty chest, creation row | text of `.headquarters`, run panel hidden | `reports/01-author-ui-01-empty-team.png` |
| empty-name warning („   ” + „Załóż”) | message visible „Wpisz imię postaci.”, its colour and the input's border `rgb(254,154,0)` = `--warning` `#fe9a00`, `aria-invalid="true"`, no character created | `reports/01-author-ui-02-empty-name-warning.png` |
| team with characters („  Ala ” by Enter, „Ola”, „Ala”) | rows „Ala / Ola / Ala”, each „Mag żywiołów”, „Mapa: Las”, „Wyślij”; field cleared and message hidden after a valid name; name `rgb(244,244,245)`, archetype `rgb(159,159,169)`; „Skrzynka jest pusta.” visible | `reports/01-author-ui-03-team-with-characters.png` |
| headquarters replaced by the map-run screen | after „Wyślij: Ola, mapa Las”: headquarters hidden, run panel shown in its place, all „Wyślij” disabled | `reports/01-author-ui-04-map-run-in-place.png` |
| back after „Zakończ” | headquarters shown, run panel hidden, same three rows, „Wyślij” enabled | `reports/01-author-ui-05-back-after-zakoncz.png` |
| narrow screen 390 px | `scrollWidth` 390, no horizontal scroll | `reports/01-author-ui-06-narrow.png` |
| skrzynka marked empty | in every state above | screenshots 01–06 |

The one console error was `favicon.ico` 404, present before this change. Focus: no new control kind; every button and field is a shared control, so the one `:focus-visible` rule draws their focus (not inspected separately). The styleguide's example of the order of work was read; this change adds no token, font or shared control, only one screen and its states.

## Choices made (ways of making), with the way rejected and its cost if wrong

- **Character id:** a number from a counter `nextCharacterId` in the state (1, 2, 3 …). Rejected: the index in the list (breaks on deletion) and the name (D-52 lets names repeat). Cost if wrong: one field to migrate in task 16's save.
- **The run links to the character by id** (`run.character = { id, at }`); the archetype stays with the team's character. Rejected: copying `archetypeId` into the run as before — a second copy of a character's data. Cost if wrong: task 4, which merges second and adds warmth, fullness, health and backpack to the character in the run, extends `run.character`; reading the archetype goes through the team.
- **One team as `state.team`**, not a list of teams — the task says the state holds the player's one team. Rejected: `teams: Team[]` with one entry. Cost if wrong: a later task with several teams renames the field; `test_character_team.py` reads teams through one function `teams(state)` to keep that change in one place.
- **The chest as `{ pieces: Partial<Record<ResourceId, number>> }`**, empty. Rejected: no chest field until task 13 — D-50 and *To do* 4 need it in the state. Cost if wrong: task 13 reshapes it; nothing fills it today.
- **The archetype of created characters stands in the data** (`CREATED_ARCHETYPE`), because `content-identifiers` forbids `game.ts` to name it. Rejected: `Object.keys(ARCHETYPES)[0]` — an implicit rule. This changes a data file, so `guidelines/coding-content-data.md` was read.
- **Empty name:** the view asks the simulation's `characterName` first and shows the warning; `createCharacter` also throws on an empty name, so the rule holds whoever calls it. Rejected: `createCharacter` returning the state unchanged — the view could not tell refusal from success.
- **Screen layout:** heading „Siedziba”, section names in `text-label`, empty notes in `text-secondary`, character name in `text-strong`, archetype in `text-secondary`; per map „Mapa: Las” beside „Wyślij” (as the send panel had it), so the button text stays „Wyślij”. The rows are flex rows, not a grid, so their columns do not line up when names differ in length (visible in screenshot 03) — cosmetic, left as is.
- **The chest's non-empty display** (one line „<zasób>: <liczba>” per resource held, `chestLines`) is there so the screen draws from the state rather than from a fixed text; nothing fills the chest in this task.
- **Tests:** `character-team` is proved by driving the built simulation through creation, sends, restart and end and checking every recorded state, plus refused sends of ids no team holds.

## Reaches beyond the handoff

- `guidelines/coding-browser-module.md` — changed: its table of files listed the deleted `send-panel.ts`; the row became `headquarters.ts` (copy). Needed because the file no longer exists.
- `src/browser/sim/run.ts`, `src/browser/view/clock.ts`, `src/browser/view/program-editor.ts` — changed: they carry the send's ids (`newMapRun`, `clock.send`) and the send panel's `sendTargets()`.
- `src/browser/sim/data/archetypes.ts` and `guidelines/coding-content-data.md` — the data file changed (see choices); its guideline read whole, as the handoff allows.
- The 17 invariant tests listed above and their invariants (`program-rule-pick`, `exploring-reveal`, `move-reach`, `walk-target`, `terrain-drawing-numbers`, `action-in-progress`, `map-run-tiles`, `walk-feasibility` beyond the handoff's list) — read each entry whole, because their tests changed.
- `tests/invariants/loop2_invariant_support.py` (read: the built copy and runner), `README.md` (read: the quality venv's paths), `.the-way/elements/*/template.md`, `examples.md`, `common/rules.md`, `common/way_of_working.md` and the examples they name in `.the-way/foundations/` (read: the element skills select them).
- The user's skill `playwright-mcp` and its `references/false_positives.md`, `timing.md` (read) — for the screen inspection. Its screenshots could only be written under `C:\Storage\repos\loop2\.playwright-mcp\` (the tool's allowed root, a directory the user's global git ignore already ignores); I wrote them into a subfolder there, moved them into `reports/` and removed the subfolder. Nothing in `C:\Storage\repos\loop2`'s tracked tree changed (`git status` clean).

## Concerns (for the orchestrator and the reviewer)

1. **Rationale and *Rejected* of D-51..D-55 are my wording.** The task gives each row's meaning and the chosen way, sometimes its cost, but for most rows no reason and no rejected way in words. I wrote *Rationale* from the answers and costs the task quotes (Q1–Q5, Q10, Q12, the concept's §5) and *Rejected* from the way the question offered against the chosen one or the behaviour this change replaces. Most at risk of reading as invented: D-53's *Rejected* („a screen for sending characters of its own beside the headquarters — the player would send from one screen and see the team on another”) and D-54's (*Rejected:* „the list sorted by name — two characters may bear one name, and a new character would move the others”). A reviewer may prefer them shortened.
2. **Example pairs in *Verification* of D-51..D-55 are proposed by me**, not given by the human; `record-decision` says a pair goes in „where the human gives one or accepts one you propose”, and here acceptance is the merge (WAY-114).
3. **Words that might take a glossary entry** but that I did not write, since the task's settlements hold only row 6 and rows 7–11 were rejected by the human: „team” (in loop2 its characters go out to maps one by one and share a chest, not a party that travels together) and „manual map run” (D-55; the definition uses it for a map run the player starts, as against an earning loop). Recommendation: none now; the return step may weigh „team”.
4. The map-run screen does not name which character is in the map run — not asked by the task; noted for later tasks.

## Problems observed

- `npx prettier --check … src/browser` reports `src/browser/AGENTS.md` (Markdown); the invariant `prettier-source-format` excludes Markdown and `tests/quality` passes, so this is outside the check (observed, not caused by this change).
- Line endings: `tests/invariants/test_program_closed_lists.py` and `test_program_world_reference.py` were rewritten by `sed -i`, which turned their working-tree CRLF into LF; git stores them `i/lf`, so the commit holds no line-ending churn (`git diff --numstat` shows only the edited lines).
