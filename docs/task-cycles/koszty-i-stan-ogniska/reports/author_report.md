# Author report — koszty-i-stan-ogniska (the whole change as the one author)

## Status

`done with concerns` (concerns: the icon choice awaits Mariusz's acceptance at the request, as the task's acceptance criterion says; one visual check not made, see "Own-work check"; the credit wording for the new icon, see "Searches not found or unclear").

The first session of this author died with the computer before any commit; this report is of the resumed session, which reviewed the uncommitted tree against the handoff, found it matching, verified the icon again, and finished the foundation entries, the screenshots, the commits and this report. `rule-panel.tsx` is untouched on purpose (choice 1 below).

## Commits (branch `task/koszty-i-stan-ogniska`, base `211a4ea`)

| Commit | What |
|---|---|
| `6bf97a4` | `feat: :sparkles:` the extinguished campfire drawn with its own icon, `wood-pile` from game-icons.net, credited in the footer and the credits section (icon file, `campfire.ts`, `terrain-picture.ts`, `credits.ts`, `footer.ts`, their tests, `test_icon_credits.py`) |
| `0f74e19` | `feat: :sparkles:` the price of an action in the rule panel (`resources.ts`, `program.ts`, `run.ts`, `program-editor.ts`, tests) |
| `0e50960` | `docs: :memo:` foundation: D-362 new, D-70 changed, environment fact `game-icons-wood-pile-title`, `icon-credits` *Rests on* |
| `99b9ce9` | `test: :white_check_mark:` the pick cell of lighting a campfire follows the price of a character with „Czysty płomień” |

Files changed (added/removed lines, whole branch against the base, from the three code commits and the docs commit):
`assets/icons/wood-pile.svg` (new, 1 line), `src/browser/sim/data/campfire.ts`, `src/browser/sim/data/resources.ts`, `src/browser/sim/program.ts`, `src/browser/sim/run.ts`, `src/browser/view/credits.ts`, `src/browser/view/footer.ts`, `src/browser/view/program-editor.ts`, `src/browser/view/terrain-picture.ts`, `tests/invariants/test_icon_credits.py`, `tests/sim/campfire.test.mjs`, `tests/sim/data.test.mjs`, `tests/view/icons.test.mjs`, `tests/view/program-editor.test.mjs`, `tests/view/rule-editor.test.mjs`, `tests/view/terrain-picture.test.mjs`, `tests/view/world-area.test.mjs`, `foundations/decisions.md`, `foundations/environment_facts.md`, `foundations/invariants.md`. Exact counts, `git diff --numstat 211a4ea` (581 added, 56 removed in all): `wood-pile.svg` 1/0, `decisions.md` 21/6, `environment_facts.md` 6/0, `invariants.md` 1/1, `campfire.ts` 14/0, `resources.ts` 30/5, `program.ts` 61/2, `run.ts` 2/4, `credits.ts` 6/1, `footer.ts` 3/2, `program-editor.ts` 55/1, `terrain-picture.ts` 18/8, `test_icon_credits.py` 3/1, `campfire.test.mjs` 68/1, `data.test.mjs` 5/0, `icons.test.mjs` 31/4, `program-editor.test.mjs` 135/5, `rule-editor.test.mjs` 68/5, `terrain-picture.test.mjs` 42/4, `world-area.test.mjs` 11/6.

## Checks run (command, exit code)

All in the worktree root.

| Check | Command | Exit |
|---|---|---|
| build | `npm run build` | 0 |
| type-check | `npm run typecheck` | 0 |
| lint of changed files | `npx eslint src tests/sim tests/view` | 0 |
| format | `npx prettier --check src tests/sim tests/view` | 0 (the `foundations/*.md` files fail Prettier on the base commit too, and no rule covers them) |
| python lint | `.runs/quality-venv/Scripts/ruff.exe check tests/invariants/test_icon_credits.py` | 0 |
| simulation and view tests (focused: the two directories of the code touched; this is not `npm test`) | `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` | 0 (1807 tests, 1807 pass) |
| single files | `npm test -- tests/view/program-editor.test.mjs` (also `terrain-picture`, `icons`) | 0 |
| foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`); also with `--skip-test-citations` after each entry, 0 |
| invariant `icon-file-content` | `npm test -- tests/invariants/test_icon_file_content.py` | 0 |
| invariant `loop2-container-icons` | `npm test -- tests/invariants/test_loop2_container_icons.py` | 0 |
| invariant `terrain-drawing-numbers` | `npm test -- tests/invariants/test_terrain_drawing_numbers.py` | 0 |
| invariant `browser-view-token-values` | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `content-identifiers` | `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| `design-token-contrast` | `npm test -- tests/invariants/test_design_token_contrast.py` | 0 |
| invariant `icon-credits` | `npm test -- tests/invariants/test_icon_credits.py` | 0 |

Seen failing, as the method asks for the invariants whose file or test I touched:

- `icon-credits`: with the line `CAMPFIRE.extinguished,` taken out of `WITH_ICONS` in `footer.ts` (the file `wood-pile.svg` standing in `assets/icons/`), `npm test -- tests/invariants/test_icon_credits.py` exit 1, "wood-pile.svg: the footer shows no credit with its page on game-icons.net" (both the footer and the section cases); the line restored, exit 0.
- `icon-file-content`: with `<script>alert(1)</script>` added to `wood-pile.svg`, `npm test -- tests/invariants/test_icon_file_content.py` exit 1, "assets/icons/wood-pile.svg holds a script element"; the file restored byte for byte (`cmp`), exit 0.

Tests whose expectation I changed (not weakened; the source is the task's To do 2 and 5 and the new D-70/D-362, and each failed before for that reason, 5 failures of the run after the code and before the test edits): the pick of the actions in `program-editor.test.mjs` and `rule-editor.test.mjs` (labels now carry the price), the campfire's icon in `terrain-picture.test.mjs` and `world-area.test.mjs` (the old assertion "extinguished drawn as when it burns" contradicted D-70 and is replaced by the two-icon cases), the data of the campfire in `data.test.mjs`, the credits lines in `icons.test.mjs` (a new line after the campfire's, and `wood-pile` in `TITLES`/`AUTHORS`). No invariant test changed beyond adding `wood-pile.svg` to `AUTHORS` and `TITLES` of `test_icon_credits.py`.

Tests written after the code, not before: the new price, plural and icon cases were written after the code they check (the data and wiring were the thing to find out first); each of the changed-expectation tests above failed first. Not run: `npm test` (the gate, as the handoff says); the mutation tool (the reviewer's for `simulation`); no check on the test server.

New tests and the break each catches (all expectations written out by hand from the task's examples or from the data):

- `actionPriceText` cases: a wrong item, count, order (pieces before energy) or form of a name in the price; a strike or walk getting a price; the price ignoring the character's branch.
- `countedName` table (0, 1, 2, 4, 5, 12, 14, 21, 22, 24, 25, 112, 122): a wrong rule for the few form, e.g. forgetting 12 to 14.
- resource forms: a missing or wrong plural form in the data.
- pick and panel cases: a price missing from a cell, from a greyed held cell, from the value shown for the action field; a price in a rule's row.
- `campfire.test.mjs`: `actionPrice` structure, and the consistency case "a finished action takes from the backpack and the nature energy exactly its price" for craft, light (with and without „Czysty płomień”), light a stick, feed and eat, so the price cannot drift from what the simulation takes.
- `terrain-picture` / `world-area`: burning draws `campfire.svg`, 0 minutes draws `wood-pile.svg` (1 minute vs 0 boundary), a crafted never-lit campfire draws `wood-pile.svg`, both in the same place and size, and the drawing carries no minutes.

## Own-work check

- Requirement most likely not met: To do 3, "the price goes after the character of the map run, not from the data, in the transition". Check: `actionPriceText` and `actionPick` with a state whose run character holds `cleanFlame` rank 1 give „Zapal — ognisko (10 energii natury)” (and the sticks stay for „Zapal — patyk” and „Wytwórz”), the same state without a run and with a run of a character that bought nothing give „(2 patyki, 10 energii natury)”; and the consistency case shows that a finished lighting by such a character really takes no stick. Result: passes.
- Second most likely: the acceptance criterion, a screenshot of the drawing with a burning and an extinguished campfire side by side. Done in the running game (below), looked at: the extinguished campfire (upper tile) is a pile of logs, the burning one (lower tile, where the character stands) the old flame icon; both light grey on the revealed tile, like the resource icons; no number on the drawing.
- Screen check by `ui_check.md`: states of the affected component (the pick cell of the rule panel): default, chosen and greyed read in the running game and in code; no new state or role appears because the price is the cell's own text. Not checked in a browser: a greyed cell that carries a price (it exists only for a held action the Understanding lacks, which no play reaches; checked in code and by two cases of `rule-editor.test.mjs` and `program-editor.test.mjs`). The kitchen-sink page was not changed: it draws no map and no action cell with real data, and the styleguide says the page shows roles and shared controls, never a drawing of the game (`The kitchen-sink page`), so the "two campfire states in its samples" the handoff allows would break D-45/D-04. The styleguide and the coding guidelines are untouched (the price is the cell's own text role, as the task's answer 2 says).
- What I saw of the rule panel (1440×900, composed state, character with a full Understanding, no map run progress): the pick cells of „Ogień” and „Żywność i walka” read „Wytwórz — ognisko (6 patyków)”, „Zapal — ognisko (2 patyki, 10 energii natury)”, „Zapal — patyk (1 patyk, 10 energii natury)”, „Zasil — ognisko (1 patyk)”, „Zjedz — jagoda (1 jagoda)”; „Uderz — patyk”, „Kopnij”, „Odskocz”, „Zbierz”, „Eksploruj”, „Idź” and the greyed „Obchód” („gałąź niewykupiona”) show no price; the chosen cell „Wytwórz — ognisko (6 patyków)” stands in the chosen look; the rule rows show „Wytwórz — ognisko” and „Zapal — ognisko” with the time and no price. Observation: in the four-column grid at this width the three longer names wrap to two or three lines and their cells grow taller than their neighbours, readable but uneven; the task did not ask for a grid change and I made none.

## Screenshots (public `mariusznazar/screenshots`, branch `loop2/koszty-i-stan-ogniska`, commit `1408fa30384ae5c5a4938add4a5fa33591dae6ba`, pushed with the owner's `gh` account `mariusznazar`; the link answers 200 `image/png`; no screenshot is in this repository or in the record)

The game was run by `npm run local`, the account `agent@example.test` made through the login card, the state composed by a throw-away script (two campfires on two revealed tiles of Las: 42 minutes left and 0, a program with „Wytwórz — ognisko”, „Zapal — ognisko”, „Eksploruj”) and sent by the page's own save request. The first picture is the drawing enlarged three times by setting the width and height of the SVG element in the page (a rendering aid, not a mode of the game) and cropped to the tiles; no number or text stands on it.

```text
![The drawing of the game map: an extinguished campfire, a pile of logs, on the upper tile and a burning campfire on the lower tile where the character stands](https://github.com/mariusznazar/screenshots/blob/1408fa30384ae5c5a4938add4a5fa33591dae6ba/loop2/koszty-i-stan-ogniska/campfires.png?raw=true)
![The rule panel on the pick of the action: the cells of the actions that use something carry their price in brackets, the chosen one among them](https://github.com/mariusznazar/screenshots/blob/1408fa30384ae5c5a4938add4a5fa33591dae6ba/loop2/koszty-i-stan-ogniska/rule-panel-prices.png?raw=true)
```

The browser session was closed (`playwright-cli close`), the local start stopped (`npm run local:stop`, 1 stopped), the working files (`.playwright-cli/`, the clone of the screenshots repository, the start's log) deleted.

## Trust boundary: the icon file

- Taken only from its page `https://game-icons.net/1x1/delapouite/wood-pile.html` (read 2026-11-11): the heading reads "Wood Pile icon" (capital P; the same page for `wood-stick` reads "Wood stick icon", so the case is the page's), the page says "by Delapouite under CC BY 3.0", and its "SVG (W/T)" download `/icons/ffffff/transparent/1x1/delapouite/wood-pile.svg` was taken as the file (white on transparent, so no background path to remove).
- The only change I made to it: `fill="#fff"` became `fill="#f4f4f5"`, the colour all other icons carry in their file (D-43, `text-strong`). The file is one `svg` and one `path` with the attributes `xmlns`, `viewBox`, `fill`, `d`; the only address in it is the SVG namespace declaration; no script, event attribute, `foreignObject`, style, `url(`, `href`, `data:`, doctype or entity (searched by pattern on the downloaded file and the committed one). `icon-file-content` passes on it and was seen failing on a crafted copy (above); the icon test of `tests/view/icons.test.mjs` (light shape, only `path` and `svg`, allowed attributes) passes.
- The archived copy for the environment fact is from 2026-04-17, the closest capture the CDX index of the Internet Archive gives to the page's present state; its heading reads "Wood Pile icon" too (checked).
- Other icons looked at and not chosen (viewed in a browser, not committed): `lorc/burning-embers`, `lorc/fire-ring`, `delapouite/fireplace`, `delapouite/pyre`, `delapouite/brasero`, `delapouite/log`, `lorc/dead-wood`, `delapouite/forest-camp`. Reason for `wood-pile`: a stack of logs reads as a laid fire that does not burn, shares no flame with the burning icon, and stays distinct at the icon's small size; the others show flames or an unrelated object.

## Foundation entries (each through the project skill of its element; every skill's SKILL.md and the files it names for the step read; see Unread material)

Marks follow `foundation_step.md`. For each: one sentence in English and one in Polish.

| Entry | Mark | English | Polski |
|---|---|---|---|
| D-362 — Where does the player read what an action costs? (new, `foundations/decisions.md`) | `row 1`, `row 2`, `row 3` and `projected` (the definition's "(new) — Where does the player read what an action costs?"); one entry, because the three rows and the projected entry answer one question, and the plan took the rows as an addendum to that entry | The rule panel shows an action's price in brackets after its name, from the data, at every cell and at the chosen action but not in the rule's row, with the names of things in the form their count takes, and it follows the character of the map run. | Panel reguły pokazuje cenę czynności w nawiasie po jej nazwie, z danych, przy każdej komórce i przy wybranej czynności, ale nie w wierszu reguły, z nazwami rzeczy w formie przypisanej do liczby, i cena idzie za postacią przejścia. |
| D-70 — How does the browser view show a campfire? (changed in place) | `projected` ("Zadanie zapisuje w całości", the definition's D-70) | A campfire shows on the drawing of the map as one icon when it burns and another when it is extinguished, and its minutes stay in the tile's row of the list. | Ognisko na rysunku mapy ma jedną ikonę, gdy płonie, i drugą, gdy wygasło, a jego minuty stoją w wierszu kafelka tabeli. |
| `game-icons-wood-pile-title` (new environment fact) | `the cycle's` strictly (no row or projected entry carries it; the task's To do 6 and the rule of `icon-credits` ask for it) | The page of Delapouite's icon `wood-pile` on game-icons.net names the icon "Wood Pile icon". | Strona ikony `wood-pile` autorstwa Delapouite na game-icons.net nazywa ją „Wood Pile icon”. |
| `icon-credits` *Rests on* + `game-icons-wood-pile-title` | `the cycle's` (follows from the fact; no binding sentence changed) | The invariant on the credits of every icon file rests on the new title fact. | Niezmiennik o wzmiankach każdej ikony opiera się na nowym fakcie z tytułem. |

Not written, and why: `D-27` and the sentence of `icon-credits` (the credits move to the folded sections in the Siedziba, which is zadanie 24; this task credits the new icon where the credits stand now: the footer and the section of the login card, both from the same data); the glossary (the term "extinguished campfire" already holds for what the new icon shows); the part map (the new file lies under `assets/icons/**` of `browser-view`, new tests under `tests/view/**` and `tests/sim/**`); no new invariant (nothing here asks for a rule that could be false on a commit beyond `icon-credits` and `icon-file-content`, which cover the file). D-362 *Rejected* holds only the ways kept under questions 1 to 3 of the task. D-70's `Rejected` keeps its earlier way and the way the task's *Decisions in play* names.

## Choices made (the way rejected, and its cost if wrong), for the questions table

1. **Where the price lives in the code.** The price is part of the label of the action's pick cell (`actionPick` in `program-editor.ts` gives „Wytwórz — ognisko (6 patyków)”), so the cell, the value shown for the action field and the cell's accessible name carry it with no change of the rule panel or of the shared pick cell. Rejected: a `price` field on `PickCell` drawn by `rule-panel.tsx` — it needs a change of `ReactPickCell` and of its DOM twin (two forms of a shared control, D-265, and the kitchen-sink page), for no visible difference, since the task says the price is the cell's own text. Cost if wrong: if a later task wants the price in another role (for instance dimmer), the label must be split then.
2. **Where the price is computed.** A pure `actionPrice(kind, skills)` in the simulation (`program.ts`) beside `natureEnergyCost`, and a shared `campfireLightCount(skills)` that `run.ts` and the refusal in `program.ts` now use too (two copies of the „Czysty płomień” rule became one). Rejected: the view reading `CAMPFIRE.light` and the branch itself — a third copy of the rule that the simulation applies. Cost if wrong: a small refactor in two simulation files that the task did not ask for; the full simulation tests pass and a new consistency test ties price and effect.
3. **Which piece „Zapal — patyk”, „Zasil — ognisko” and „Zjedz — jagoda” name.** The first item of the data's order marked for that use (`firstItemFor`, the same piece D-310 names in a reason), today stick, stick, berry. Rejected: what the backpack holds now (the panel would change with the backpack). Cost if wrong: with a second fuel in the data the price names only the first.
4. **Plural forms.** `plural: { few, many }` beside the unchanged `name` in `ResourceDef` (stick: patyki/patyków, berry: jagody/jagód, moss: mchy/mchów, fiber: włókna/włókien); `countedName(count, {one, few, many})` in `program-editor.ts` with the Polish rule (1 one; 2 to 4 and 22 to 24 few, not 12 to 14; else many); the nature energy's three forms stand in the same file as a constant, because it is no resource. Rejected: a `forms` object that replaces `name` (touches every reader of `name`), and a fixed „energii natury” (wrong for a price of 1 to 4). Cost if wrong: if a thing is later given as a non-resource item the forms must move to its data.
5. **The data of the extinguished icon.** `CAMPFIRE.extinguished = { name: "ognisko wygasłe", icon: "wood-pile", iconTitle: "Wood Pile icon" }`; the footer and the section list it right after the campfire's credit. Rejected: a flat `extinguishedIcon` pair (no place for the credit's name). Cost if wrong: renaming a field of one data object.
6. **The icon.** `wood-pile` of Delapouite (above). Cost if Mariusz rejects it: the file, `CAMPFIRE.extinguished`, `credits.ts`, `test_icon_credits.py` (`AUTHORS`, `TITLES`), `icons.test.mjs` (`TITLES`, the expected line), `terrain-picture.test.mjs`, `world-area.test.mjs`, `data.test.mjs` and the environment fact change together; `icon-credits` and `icon-file-content` find a missed place.
7. **One decision for rows 1 to 3** (D-362), not three. Rejected: three entries (they answer one question and the plan took them as an addendum to one entry). Cost if wrong: a split of the entry.
8. **The comment of `ICON_SOURCE_COMMIT`** in `credits.ts` now says the file `wood-pile.svg` was taken from its page, not from that commit (the constant's value and its test are unchanged).
9. **No change in `rule-panel.tsx`, `rule-list.tsx`, the styleguide, the kitchen-sink page, `tokens.css`, `styles.css`.** No colour, length or font value was written, so `browser-view-token-values` is satisfied; the new icon keeps its colour in its file like the others.

## Reaches beyond the handoff (what, where, why)

- `foundations/part_map.md` lines 1 to 80 (browser-view and simulation entries): to confirm that the new file and tests are claimed; not read whole.
- `tests/invariants/test_content_identifiers.py` (docstring and the icon lines) and `tests/invariants/test_design_token_contrast.py` run: they read the data files and the view code I changed.
- `tests/sim/understanding-fixture.mjs`, `tests/sim/program-fixture.mjs`, `.claude/skills/loop2-play/compose-state.mjs`: helpers for the tests and for composing the screenshot state.
- `.the-way/elements/common/way_of_working.md`, `rules.md`, the decisions' and the environment facts' skill files and templates, the invariants' `SKILL.md` and its template lines on *Rests on*: for the foundation step.
- The vault note `the task's note in the author's backlog` (only its file name, to write the *Origin* of D-70 and D-362; not read) and `the project definition's note in the author's notes` (named in *Origin* from D-27's own Origin line; not read).
- `https://web.archive.org/cdx/search/cdx` and the capture of 2026-04-17, for the archived copy of the page.
- `the author's rules for git in his agent instructions`, for the commit form.

## Unread material

- `foundations/part_map.md` read in part (lines 1 to 80, the two parts concerned), not whole; `foundations/environment_facts.md` read only in the entries on game-icons and the licence facts (as the handoff names), not whole; the invariants other than the five named, read by title or not at all (those whose *Part* names `browser-view` or `simulation` and that no test I altered cites).
- `guidelines/testing.md` was read whole; the long trust-boundary table was read for the `assets/icons/` row and skimmed otherwise.
- The invariants element: `skill/decide_entry.md`, `skill/draft.md`, `skill/write.md` and the template beyond the *Rests on* lines were not read, because the only change to an invariant is one more name in *Rests on*, which the environment fact's step 4.4 hands to that skill; the `decisions/examples.md` entry `WAY-03` in the-way's own log was not opened. If the orchestrator reads that as a gap, the entry's form was checked by `foundation_check.py` (0 errors) and by comparing with D-360 and D-361.
- The task document, handoff, the method, `foundation_step.md`, `coding*.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md`, `loop2-play/SKILL.md`, the decisions D-19, D-24, D-27, D-40, D-43, D-59, D-63, D-68, D-69, D-70, D-72, D-145, D-175, D-288, D-289, D-290, D-291, D-293, D-310, D-316, D-320, D-357, D-358, the invariants `icon-file-content`, `icon-credits`, `loop2-container-icons`, `terrain-drawing-numbers`, `browser-view-token-values` and the glossary were read whole.

## Searches not found or unclear

- Not found: a way to read the icon's author and licence other than the page's own text ("by Delapouite under CC BY 3.0"); it was found, so none missing. The licence file of `game-icons/icons` lists Delapouite and CC BY 3.0 (`game-icons-licence`).
- Unclear: the credit says „zmienione (bez tła, jasny kolor)” for every icon (`CHANGES` in `credits.ts`, required equal for all by `icons.test.mjs`). For `wood-pile` the file I took already has no background (the "W/T" download), and I changed only its colour; the sentence is therefore slightly broader than the truth for this file, and harmless for the licence (it says the file was changed). Left as is; changing it means a per-icon `changes`, which is a decision of the credits' form.
- Unclear: whether the foundation step wants one decision or three for rows 1 to 3 (the step says "each row … as an entry of its kind"); I wrote one entry for the three rows plus the projected entry, since all answer the question of the projected entry (choice 7). The orchestrator may split it.
- Not found: any place in the code where the price of „Zapal — patyk” with a given backpack is needed; `firstItemFor` was enough.
- Nothing else looked for and missed. Searches for "not found" were made with the Grep and Glob tools and a second pass with `grep`/`git grep` in the worktree (icon names, `CAMPFIRE.icon`, `iconTitle`, `actionPick` consumers).

## Questions and concerns

- For Mariusz at the request (the acceptance criterion): is `wood-pile` the extinguished campfire's icon, or which other? (Seen and not chosen: burning-embers, fire-ring, fireplace, pyre, brasero, log, dead-wood, forest-camp.)
- Concern: the three longer action cells wrap to three lines in the four-column pick at 1440 px, which makes the grid uneven; no rule of the styleguide is broken, but Mariusz may want shorter wording (for example „2 patyki, 10 energii”) or a wider column, a decision the task left out.
- Concern: the display of a price in a greyed cell was checked in code only.
- Problems observed, with evidence: none in the product. A tooling note: `python -B scripts/test.py <file>` fails with `KeyError: 'npm_execpath'` when started outside `npm` (it needs `npm test -- <file>`), seen once.
