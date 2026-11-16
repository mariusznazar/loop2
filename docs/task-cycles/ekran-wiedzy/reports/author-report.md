# Report of the one author — task `ekran-wiedzy`

**Status:** `done with concerns` (the concerns are the five points under "Problems and discrepancies"; none stops the change).

## Commits

Branch `task/ekran-wiedzy`, base `6caa013e04bafca4c28b540fabccf55201ce49a4`. `git log --format='%h %ae'` shows `mariusznn@gmail.com` on both.

| Commit | What |
|---|---|
| `11164840` | `feat: :sparkles:` the screen Wiedza, its address and its item in the menu bar, the wolf's icon with its credit, its plaque at the first attack and its icon on the card of a map; the foundation entries; the tests |
| `caa13ffd` | `docs: :memo:` the styleguide (*To do* 10) |

No push. The record `.runs/task-cycles/` is untouched except this report.

## Files changed (added and removed lines, `git diff --numstat 6caa013e..HEAD`)

Code: `src/browser/sim/data/creatures.ts` +6 −0; `src/browser/styles.css` +104 −5; `src/browser/view/credit-lines.ts` +3 −1; `credits.ts` +5 −0; `game-view.ts` +5 −3; `map-lines.ts` +8 −4; `maps-screen.tsx` +12 −1; `menu-bar.tsx` +8 −3; `scene-picture.ts` +9 −5; `screen-address.ts` +11 −2; new `knowledge-entry.ts` +36, `knowledge-lines.ts` +148, `knowledge-screen.tsx` +192 (all under `src/browser/view/`); new `assets/icons/wolf-head.svg` +1.
Foundation: `foundations/decisions.md` +44 −14; `environment_facts.md` +6 −0; `invariants.md` +1 −1; `guidelines/styleguide-browser-view.md` +39 −6.
Tests: new `tests/view/knowledge-lines.test.mjs` +163 and `knowledge-screen.test.mjs` +295; changed (under `tests/view/`) `account-screen` +41 −11, `icons` +31 −3, `map-lines` +4 −3, `maps-screen` +10 −7, `menu-bar` +13 −8, `now-lines` +2 −2, `rule-editor` +2 −2, `scene-picture` +20 −8, `scene` +12 −3, `screen-address` +29 −3, `screen-registry` +45 −5; `tests/sim/data.test.mjs` +3 −1; `tests/invariants/test_icon_credits.py` +4 −1. `now-lines` and `rule-editor` changed only the quotation of D-291 on a `decision:` line.

Total: 33 files, +1312 −102.

## Settled placement and what I built

- A module of its own: `knowledge-screen.tsx` (React, boundary `createKnowledgeScreen`, copied from the shape of `maps-screen.tsx` / `accounts-screen.tsx`), `knowledge-lines.ts` (pure texts and lists), `knowledge-entry.ts` (one entry of the table: `kinds: ["knowledge"]`, `lives: "while-shown"`, `key: () => "knowledge"`). `game-view.ts` got **one line of the table** and its import (D-408). Note: the table stands in `game-view.ts`, not in `screen-registry.ts` as the handoff says; `screen-registry.ts` is unchanged.
- The address and the bar, as D-408 names them: `screen-address.ts` (kind `knowledge` in `Screen` and in `KIND_NAMED`, `#/wiedza` in `readScreenAddress`, `resolveScreen`, `screenAddress`, `markedMenuItem`, `MenuItem`), `menu-bar.tsx` (`ITEMS`, after Programy, no icon). No function the view shares between its screens names Wiedza beyond those address cases D-408 itself lists.
- Names of game things come from the data (`ACTIONS`, `ITEMS`, `RESOURCES`, `CAMPFIRE`, `CREATURES`, `SKILLS`, `BRANCHES`); no identifier or name of a map, resource or archetype is written in the new files (`test_content_identifiers.py` passes).
- The wolf: `CreatureDef` got `icon` and `iconTitle` (as the resources have them), the wolf `wolf-head` / `Wolf head icon`; `ICON_CREDITS["wolf-head"]` (Lorc, `https://game-icons.net/1x1/lorc/wolf-head.html`, changes = the common `CHANGES`); `credit-lines.ts` credits the creatures after the actions. The plaque: `plaquesOf` in `scene-picture.ts` takes the icons of `discovery.creatures`. The card: `AttackerLines.icon`, an `icon-mask` in the head of „Czyha” as in „Leży tu”.

### The icon file at the trust boundary (`assets/icons/**`)

- Fetched from the source repository game-icons/icons at the commit `ICON_SOURCE_COMMIT` already holds, `lorc/wolf-head.svg` (the way D-27 and the other icons took them), and made by the same two steps as the others: the background path `M0 0h512v512H0z` removed, the shape's fill `#fff` → `#f4f4f5`. I checked the procedure by reproducing `assets/icons/campfire.svg` from its source with the same script: byte-identical. The wolf's path equals the path of the old Loop's file (only the fill differs).
- Title, author and page read from the source, not from memory: the page `https://game-icons.net/1x1/lorc/wolf-head.html` (fetched 2026-11-16) has `<h1 id="icon-name">Wolf head icon</h1>` and `by <a rel="author">Lorc</a> under CC BY 3.0`. The archived copy for the fact is the latest capture in the CDX index, `20261011095410`, whose heading and author I read as well.
- The file holds one `path` with `fill`, no script, no `foreignObject`, no `on*` attribute, no reference outside itself. `icon-file-content` (`test_icon_file_content.py`) passes, and the real-files test in `icons.test.mjs` too; `loop2-container-icons` (`test_loop2_container_icons.py`, a real image in Docker) passes: the container serves the file with its bytes.

## The choice left to me: what folds a tree open

**Chosen:** the shared `ReactButton` with `expanded` (the plain button, `aria-expanded`, a native `<button type="button">`), one per tree, its text `▸ {name} · {n} gałęzi` (`▾` when open) and its accessible name the same without the marker (`label`). The open trees are the state of the screen's component (`useState`), so each entering builds them folded, and a redraw from the game keeps the open ones open. This is the way `rule-list.tsx` and `trip-plan.tsx` already fold. No new shared control and so nothing new for the page of all states (the state `expanded` is no state of the styleguide's list for the button; a tree row is a plain button, whose states stand there already).

**Rejected:**
- A native `<details>/<summary>` as the credits section has: keyboard and fold for free, but a second kind of control beside the shared buttons (D-44 / D-265 give the screens one form of each control), no shared look, and the fold would live in the document, not in React.
- A new shared control (`ReactFold`): one more component plus samples of each of its states on the page of all states (D-269), for a row that only one screen uses.

**Cost if wrong:** the tree row is a bordered button whose text holds a marker, not a full-width row with the count set apart on its right (the old Loop's look). Changing to another control is one component at one place plus one styleguide line; no data or address depends on it.

## Foundation entries (marked, with one sentence in English and one in Polish)

Written in `foundations/` by following the elements' `SKILL.md`s as files (decisions, environment facts, invariants; the part map needed no change: `src/browser/view/**`, `assets/icons/**` and `tests/view/**` already claim the new files). `foundation_check.py` passes with test citations (0 errors).

1. `D-416` (new, in the section "Browser view: screens, navigation and their code", after D-411) — `projected`. EN: the screen Wiedza shows the Understanding's actions, items and creatures and the known skill trees, with no levels and no buying; its two areas and its counters are as the task gives. PL: ekran Wiedza pokazuje czynności, przedmioty i stworzenia ze Zrozumienia oraz poznane drzewa umiejętności, bez poziomów i kupowania; jego dwa obszary i liczniki są takie, jak podaje zadanie. One entry: the sentence of the definition plus three sentences of the task (two in the first paragraph, the counters in a second). *Rejected* holds the ways not chosen of questions 1, 3 and 8 and the definition's one, each with the cost kept beside it, with no name of a note.
2. `D-280` (changed) — `projected`. EN: the game has Wiedza among its screens and the item Wiedza after Programy in the menu bar; the example of the four-item bar in *Verification* corrected. PL: gra ma ekran Wiedza, a pasek menu pozycję Wiedza po Programach; przykład paska z czterema pozycjami w *Verification* poprawiony.
3. `D-281` (changed) — `projected`. EN: `#/wiedza` names the screen Wiedza. PL: adres `#/wiedza` nazywa ekran Wiedza. I also changed „the seven addresses” to „the eight addresses” in its *Verification*, because the changed sentence makes „seven” untrue (line 163 of the definition, as the task quotes it).
4. `D-291` (changed) — `row 1`. EN: an action's icon also stands beside the action on the screen Wiedza. PL: ikona czynności stoi też przy czynności na ekranie Wiedza. *Verification* names the test of it.
5. `D-322` (changed) — `row 2`. EN: *Rationale* no longer says a discovery of a creature alone has no plaque, and *Verification* adds the plaque of the wolf's head at the stop at the first attack. PL: z *Rationale* odpada „stworzenie nie ma plakietki”, a *Verification* dostaje plakietkę z głową wilka przy zatrzymaniu na pierwszej napaści. The binding sentence is untouched, as the task says.
6. `D-327` (changed) — `row 3`. EN: „Czyha” holds the creature with its icon, the card departs from the predecessor game's in four things, not five, and the reason „the creature has no icon because the creatures have none” is gone. PL: „Czyha” stawia stworzenie z ikoną, karta odchodzi od karty starego Loop w czterech rzeczach, a powód „stworzenie nie ma ikony” odpadł. *Verification* examples stay true.
7. Environment fact `game-icons-wolf-head-title` — `the cycle's` (no row and no projected entry carries it whole; *To do* 6 and question 2 require it). EN: the page of Lorc's icon `wolf-head` on game-icons.net names it „Wolf head icon”. PL: strona ikony `wolf-head` Lorca na game-icons.net nazywa ją „Wolf head icon”. Source: the page and its latest archived capture (found through the CDX index), heading quoted, read 2026-11-16.
8. `icon-credits` (*Rests on* only) — `projected` (task *To do* 6). EN: *Rests on* gets `game-icons-wolf-head-title`; its sentence and *Method* are unchanged. PL: do *Rests on* dopisany fakt `game-icons-wolf-head-title`; zdanie i metoda bez zmian.

Test quotations of the changed binding sentences (D-280, D-291, D-327) on `decision:` lines were updated to the new wording, in 10 test files; no assertion was weakened for that.

D-27, D-282, D-277, D-325, D-328, D-148, D-195, D-199, D-200 stayed as they are (the task says so).

## Where the screen's strings, counts and plural forms are tested

- `tests/view/knowledge-lines.test.mjs` (no document): the counters' forms for 0 to 5, 8, 12 to 14, 21 and 22 of all four nouns (`thingsCounter`, `treesCounter`, `branchesCounter`, `stepsCounter`; „1 poznana rzecz”, „3 poznane rzeczy”, „13 poznanych rzeczy”, „1 drzewo”, „3 drzewa”, „8 drzew”, „1 gałąź”, „3 gałęzie”, „1 stopień”, „3 stopnie” and the genitive after 12 to 14 and 5); the groups (headings with counts, discovery order, campfire among items, group with no thing left out, icons and names from the data, a condition not counted); the number of things; the known trees in the order of the data with branch counts, steps, descriptions and price strings (`1 · 1 · 1 pkt`, `3 pkt`).
- `tests/view/knowledge-screen.test.mjs` (jsdom): the heading and the one area of a game with no known thing, with no sentence; the groups with icons as masks of `/icons/<file>.svg`; the right area standing only once a tree is known; the folded rows (`aria-expanded`, a native `button`); a click opening and closing a tree and showing branch name, steps, description and prices; open trees kept across a redraw and folded again in a screen built anew; no „poziom”, „wprawa”, „punkty”, „Kup”, „→”, only the tree rows as buttons, and the state unchanged.
- `account-screen.test.mjs`: the bar in four items, a reload at `#/wiedza`, the item Wiedza opening the screen, marked, and the screen gone on leaving; `menu-bar.test.mjs`, `screen-address.test.mjs` (the address read, written, resolved for a player and an owner, the mark, crafted fragments `#/WIEDZA`, `#/wiedza/`, `#/wiedza/x`, `#/wiedza#x` read as no screen); `screen-registry.test.mjs` (a table with no entry for Wiedza is refused; built on entering, taken down on leaving, built anew).
- Scene: `scene-picture.test.mjs` (the wolf's plaque in the row, alone in the middle at 176; conditions and trees alone give none) and `scene.test.mjs` (at the stop at the first attack the wolf stands beside the mage with no run in **and** one plaque with `/icons/wolf-head.svg` stands). Card: `map-lines.test.mjs` and `maps-screen.test.mjs` (the icon of „Czyha” is the mask of `/icons/wolf-head.svg`, no `img`). Icons: `icons.test.mjs` (the wolf's line in the credits, last of the icons, before the packs; title, author, link; the file exists), `data.test.mjs` (the wolf's fields), `test_icon_credits.py` (the invariant's TITLES and AUTHORS list the file).

## Checks run (command, exit code)

All from the worktree root. `npm test -- <file>` builds first.

- `npm run typecheck` — 0; `npx eslint <changed ts, tsx, mjs>` — 0; `npx prettier --check <changed ts, tsx, mjs, css>` — 0 (after `prettier --write` on `screen-registry.test.mjs` and `knowledge-screen.test.mjs`, which it had flagged).
- `python -B .the-way/elements/common/foundation_check.py` — 0 (0 errors, test citations included). Before the quotations were updated it reported 25 errors, all „the quotation stands in no binding sentence of D-280/D-291/D-327”.
- `python -B .the-way/instruction-files/check_instructions.py` — 0 (0 errors, warnings only).
- `npm test --` each of: `tests/view/knowledge-lines.test.mjs`, `knowledge-screen.test.mjs`, `icons.test.mjs`, `scene.test.mjs`, `scene-picture.test.mjs`, `maps-screen.test.mjs`, `map-lines.test.mjs`, `menu-bar.test.mjs`, `screen-address.test.mjs`, `screen-registry.test.mjs`, `account-screen.test.mjs`, `now-lines.test.mjs`, `rule-editor.test.mjs`, `shared-controls.test.mjs`, `owner-panel.test.mjs`, `accounts-screen.test.mjs`, `headquarters-screen.test.mjs`, `previous-save.test.mjs`, `end-window-game.test.mjs`, `chronicle-game.test.mjs`, `end-question.test.mjs`, `uncaught-failure.test.mjs`, `state-store.test.mjs`, `character-screen.test.mjs`; `tests/sim/data.test.mjs`, `combat.test.mjs`, `repertoire.test.mjs`, `rules.test.mjs` — all 0.
- Python, each through `npm test -- <file>`: `tests/invariants/test_icon_credits.py`, `test_icon_file_content.py`, `test_loop2_container_icons.py` (Docker, 110 s), `test_browser_view_token_values.py`, `test_browser_view_focus_outline.py`, `test_browser_view_framework.py`, `test_content_identifiers.py`, `tests/quality/test_node_test_selection.py`, `test_source_tool_scope.py`, `test_quality_invariants.py` — all 0.
- The invariant test `icon-credits` seen failing once: with the entry `"wolf-head"` removed from `ICON_CREDITS` in the worktree, `npm test -- tests/invariants/test_icon_credits.py` — exit 1 (the credit section cannot be rendered: no credit for `wolf-head`); the entry restored, the same command — 0. Not run: the full gate `npm test` with no file (the orchestrator's, WAY-160); a CI file exists (`.github/workflows/tests.yml`) but I ran no part of it.
- Mutations of the new behaviour, one at a time, each by editing the source, running the named test files and restoring the source (every one **caught**, exit ≠ 0): the creature line of `plaquesOf` removed (`scene-picture`, `scene`); the card's icon url spoiled (`maps-screen`); `markedMenuItem` of Wiedza → null (`screen-address`); the `#/wiedza` read removed (`screen-address`, `account-screen`); a condition counted among the things (`knowledge-lines`, `knowledge-screen`); trees taken in discovery order (`knowledge-lines`, `knowledge-screen`); every tree open at the start (`knowledge-screen`); the `stopni` form changed (`knowledge-lines`); creatures dropped from the credit lines (`icons`); the table line removed from `game-view.ts` (`account-screen`); the menu item removed (`menu-bar`).
- The tests of the screen and of the plaque were written after the code (the handoff's method allows it for wiring and prose; the counters and groups are a rule I could have tested first — I did not).

## The own-work check (section 3)

**The requirement I judged least likely to be met:** „kliknięcie albo klawiatura go rozwija” (*To do* 5) and „każde wejście na ekran zaczyna ze zwiniętymi drzewami”, because jsdom shows no real keys and no real navigation (`testing.md`, „Not tested on purpose”).

**The check:** the running game in a real browser (`npm run local`, Playwright CLI, window 1280×720 and 640×900, a made-up account `agent@example.test`; composed states from the skill's `compose-state.mjs` and a state of my own at the first attack, sent by the ordinary save request).

**Observed:**
- New game: the bar `Siedziba · Mapy · Programy · Wiedza`; on `#/wiedza` `aria-current` is „Wiedza”; the screen shows „Zrozumienie · 1 poznana rzecz”, „Czynności · 1”, „Eksploruj” with its icon, and no right area.
- Composed state: „16 poznanych rzeczy” (12 + 3 + 1), „8 drzew”, the eight rows folded; Tab to a row and Enter opened it (`aria-expanded` `true`), Tab and Space opened the next one; a click opened another; the opened branches show name, „n stopni”, description and prices (`1 · 1 · 2 pkt`); the focus ring is drawn by the shared rule (a white outline on the focused row).
- Leaving to Siedziba and coming back: all rows `false`; a reload at `#/wiedza` stays on the screen.
- A window 640 px wide: the two areas stand one under the other.
- State at the first attack (minute 203 on Las — głębiej, paused at the discovery): the scene shows four framed plaques over the clearing, the strike, the kick, the dodge and the head of the wolf, with the wolf standing beside the mage; the band names the discovery as before. This state was reached by playing the simulation (`advanceMinutes`) to the real attack, not hand-made.
- Mapy → „Las — głębiej”: „Czyha” shows the wolf's icon before „wilk · 24 zdrowia · cios 7”.
- Console: 0 errors after the sign-in (`playwright-cli console error`).

**Evidence:** screenshots in the public repository `mariusznazar/screenshots`, branch `loop2/ekran-wiedzy`, directory `loop2/ekran-wiedzy/`, commit `0904a1fd6dc49e4f18897ac45949468f9b5a29db` (pushed with the owner's `gh`; `git log --format='%h %ae'` there shows `mariusznn@gmail.com`). I looked at each before the push: only the made-up account, no real address, password or token.
- ![Wiedza with a composed Understanding, three trees open](https://github.com/mariusznazar/screenshots/blob/0904a1fd6dc49e4f18897ac45949468f9b5a29db/loop2/ekran-wiedzy/wiedza-rich.png?raw=true)
- ![The stop at the first attack: four plaques, the wolf's head among them, the wolf beside the mage](https://github.com/mariusznazar/screenshots/blob/0904a1fd6dc49e4f18897ac45949468f9b5a29db/loop2/ekran-wiedzy/wiedza-plaque.png?raw=true)
- ![Card of Las — głębiej: „Czyha” with the wolf's icon](https://github.com/mariusznazar/screenshots/blob/0904a1fd6dc49e4f18897ac45949468f9b5a29db/loop2/ekran-wiedzy/mapy-czyha.png?raw=true)
- ![Wiedza in a window 640 px wide, the areas one under the other](https://github.com/mariusznazar/screenshots/blob/0904a1fd6dc49e4f18897ac45949468f9b5a29db/loop2/ekran-wiedzy/wiedza-narrow.png?raw=true)
- ![Wiedza of a new game](https://github.com/mariusznazar/screenshots/blob/0904a1fd6dc49e4f18897ac45949468f9b5a29db/loop2/ekran-wiedzy/wiedza-new-game.png?raw=true)

Not looked at in a browser: Wiedza for an account with the owner role (the bar is the same by code and by `menu-bar.test.mjs`); the plaque's motion (described in words only: it is the existing effect with one more plaque, which the scene tests hold; I saw the final frame).

## Reaches beyond the dispatch (section 1)

- `.the-way/elements/environment-facts/skill/{read,decide_entry,draft,write}.md`, `.the-way/elements/invariants/skill/SKILL.md`, `.the-way/elements/decisions/template.md` and `skill/{SKILL,read,decide_entry}.md`, `elements/common/{rules,way_of_working}.md` — the element files the foundation step names (found by the handoff's own paragraph).
- `src/browser/view/program-editor.ts` (`countedName`), `rule-list.tsx` (`ruleCountText`, the `expanded` use), `trip-plan.tsx`, `accounts-screen.tsx`/`accounts-entry.ts`, `headquarters.tsx`/`-entry.ts` (shape of an entry and of a heading), `credits.ts`, `credit-lines.ts`, `tests/view/icons.test.mjs`, `tests/invariants/test_icon_credits.py`, `tests/view/page-document.mjs` — to build on the shapes the repository already has and to update the tests that name the icons.
- `foundations/decisions.md`: D-285, D-286, D-323, D-395, D-407, D-408, D-411 (inside the range I read for D-280 to D-282) and the section headings, to place D-416.
- `.claude/skills/loop2-scene-art/SKILL.md` (the handoff names it; I read its first 80 lines — this change adds no picture file, only a plaque of an existing icon).

## Unread material

Dispatch items I did **not** read whole (read in part or not at all):
- Decisions: D-27 (first 12 lines and its *Verification* start only), D-322 (binding sentence, *Verification*, *Rationale* through „Accepted with it” and the first part of *Rejected*; not its last lines), D-328 (heading, binding sentence and *Relations* only), and **not read at all**: D-195, D-199, D-200, D-119, D-283, D-148, D-325 (its text only through D-327's references), D-120, D-196, D-264, D-267, D-269 (read only the guideline lines that state them), D-44, D-43, D-42, D-47, D-122, D-316, D-317, D-271, D-272, D-118, D-128. I read D-277, D-280, D-281, D-282, D-291, D-327, D-395, D-407, D-408 whole and D-285, D-286, D-323, D-411 incidentally.
- Invariants `icon-credits`, `icon-file-content`, `loop2-container-icons`, `content-identifiers`, `loop-run-knowledge` read whole; `browser-view-token-values` **not read** (its test passes); the other `browser-view` invariants naming a screen, a heading, focus or a test of the view: not enumerated or read, beyond the three tests I ran (`token-values`, `focus-outline`, `framework`).
- The glossary entry `Understanding`: I read the one sentence that `grep` showed (line 120), not the entry whole. `foundations/part_map.md`: **not read whole**; I read only the lines `grep` found for `src/browser/view/**`, `assets/icons/**`, `tests/view/**` and the trust boundary.
- Environment facts: read the `game-icons-*` entries through `grep` and `sed`, not the whole file.
- `guidelines/testing.md` read whole; `coding.md`, `coding-browser-module.md`, `coding-content-data.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md` read whole. `.the-way/task-cycle/change/ui_check.md` and `loop2-play/SKILL.md` read whole. The old Loop: only `KnowledgeScreen.tsx` at `cdc7c0d`.
- The orchestrator's index `.runs/orchestrator/index.txt`: **not opened** (I used the decisions' text itself).

## Searches not found or unclear

1. The task says „gra nie ma jeszcze odmiany liczebników”; the game has one: `countedName(count, {one, few, many})` in `src/browser/view/program-editor.ts` (tested in `program-editor.test.mjs`) and a private copy of the rule in `rule-list.tsx` (`ruleCountText`). I reused `countedName` (a pure import from a file whose status is `do not copy`, which D-265 allows) and put only the four noun triples in `knowledge-lines.ts`; no second rule of declension was written. The task's sentence is not false for what it asks (a counter of the screen declines), but its premise is.
2. *Context* of the task and its question 1 expect a new game with no known thing; `newGame()` already holds the action „Eksploruj” (the glossary's `Understanding` already says so), so a new game shows „1 poznana rzecz”, and the sentence-less empty area appears only in the tests (state built by hand). The cost the question lists as „accepted” (an empty area between two merges) did not arise.
3. The handoff and the task say the registry's table is in `screen-registry.ts`; it is in `game-view.ts` (the registry takes it as `entries`). Found by reading both; no effect.
4. `guidelines/coding-browser-module.md` lists the files of its kind with statuses (`copy`, `exemplar`, `do not copy`); its text says a file added after the last audit has no row and is no exemplar. I added no row for the three new files: a status is a verdict of an audit I was not asked to make. If the orchestrator wants rows, they are `knowledge-entry.ts`, `knowledge-lines.ts`, `knowledge-screen.tsx`.
5. The decision log has no entry that says where a new decision about a screen of the player goes among its sections; I put D-416 at the end of „Browser view: screens, navigation and their code” (D-411, the screen of the list of accounts, stands there). The sections „Screen Mapy and Siedziba” and „Discovery and the Understanding” would also fit; the request names the section.

## Problems and discrepancies (as observed)

1. **`D-416` *Rationale* says „the player sees it nowhere today”** — the wording of the approved definition, kept word for word as the task asks. It becomes untrue when this change merges (the player sees the Understanding on the screen Wiedza). I did not change the approved wording; the orchestrator may want the human to see the sentence („nowhere today” → „nowhere before this screen”).
2. **D-280 *Verification*** still says „the game opening the screens Siedziba, Postać, Mapy, Programy and Przejście at their addresses” (the task: leave *Verification* as it stands, except the four-item example). A test of this change opens Wiedza at its address too, so the sentence names one screen fewer than the tests hold; it is not false.
3. **D-281 *Verification*** I changed „seven” → „eight addresses” (the changed binding sentence makes „seven” untrue; the task's line 163 allows it). The task's list of settlements does not name this word.
4. **No test of the open tree reads the focus ring or the keys in jsdom** (nothing there shows them); the keys were seen in the real browser only, as above. A tree row is a native button, so Enter and Space are the browser's own.
5. The `check_instructions.py` count of warnings differs between two runs (141, then 129); both runs ended with 0 errors, and I changed no instruction file. I did not look into it.

## Working copies

My directory `.runs/author/` held the scripts of this change (the icon conversion, the edit scripts of the decisions and of the styleguide, the mutation runner, the copy of `credits.ts` kept during the mutation, the log of `npm run local`). `.playwright-cli/` held the screenshots and the composed states, and `.runs/screenshots/` the clone of the screenshots repository (commit `0904a1fd…`, pushed). All three were removed with `rm -rf` before I returned (`ls .runs` shows `local-start`, `orchestrator`, `quality-venv`, `task-cycles` only). Left in place: `.runs/local-start/` — the database a start of `npm run local` makes by itself, a file of the product's own tool, which the next start removes; `npm run local:stop` ended the start (`Local starts stopped: 1`), and `playwright-cli close` closed my browser. `.playwright/cli.config.json` is the repository's own setting, not mine.
