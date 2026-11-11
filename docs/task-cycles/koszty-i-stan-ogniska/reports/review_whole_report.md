PASS 99b9ce97d467e232ba2feb9b4e14cca73b6dd7d9

# Review of the whole change — koszty-i-stan-ogniska

Range `211a4ea556d48f5da98fc08380b3c061b9365709..99b9ce97d467e232ba2feb9b4e14cca73b6dd7d9` (`6bf97a4`, `0f74e19`, `0e50960`, `99b9ce9`), one author, no plan, no spec, no slices. `git rev-parse HEAD` in the worktree is the head given. Blocking findings: 0. Minor findings within the task: 4. Out-of-scope findings: 1.

## Findings

### Critical

none

### Important (blocking)

none

### Minor, within the task

**M1. The credit sentence of `wood-pile` is the shared one, and it is only loosely true of this file** — `src/browser/view/credits.ts:12` (`CHANGES = "zmienione (bez tła, jasny kolor)"`, applied to `"wood-pile"` at the end of `ICON_CREDITS`); header comment of `credits.ts:1`, `IconCredit.changes`. I downloaded both variants from the icon's page. The committed `assets/icons/wood-pile.svg` is byte-identical, once `fill="#fff"` becomes `fill="#f4f4f5"`, to the page's white-on-transparent download (`/icons/ffffff/transparent/1x1/delapouite/wood-pile.svg`). The other download, white-on-black (`/icons/ffffff/000000/1x1/delapouite/wood-pile.svg`), carries an extra first path `M0 0h512v512H0z` (the black background). So the true difference from the page's pair of files is: the variant without background was taken, and its colour changed. "bez tła" is true against the page's black-background variant and untrue as a change made to the file taken; "jasny kolor" is a change of white to `#f4f4f5`, which is light to light. The author's gap (4) is right that the sentence is wider than the fact. Effect: the credit tells the reader the file had its background removed, which this file never needed; the licence only asks that the credit say the file was changed, and it does. I judge it a matter of the credits' form (one shared string, enforced equal for all by `tests/view/icons.test.mjs`, `credits.ts` comment "The change made to every icon file"), not a defect that blocks this change. Within the task only in the sense that `icon-credits` asks "says how the icon file differs from its source"; a per-icon `changes` is a decision of the credits' form (task 24 reshapes the credits anyway). The header comment of `credits.ts` ("taken from the game-icons source repository") and the `CHANGES` comment are the same small untruth: the author corrected only the comment of `ICON_SOURCE_COMMIT`.

**M2. D-362 does not link D-293 in *Relations*, though its binding sentence cites it** — `foundations/decisions.md`, D-362: "the price follows the character of the map run, as the time does (D-293)"; *Relations: derives from D-288 · derives from D-63*. A reader following links from D-293 does not reach D-362, which is the entry that now says what stands beside the time in the panel. `foundation_check.py` passes (0 errors); this is a missing link, not an error. Cost today: none; later change of D-293's places of the time may miss D-362.

**M3. The price is cut in the middle by line breaks in the four-column pick** — screenshot `rule-panel-prices.png` (public screenshots repository, commit `1408fa3`): `Zapal — ognisko (2 / patyki, 10 energii / natury)`, `Zapal — patyk (1 / patyk, 10 energii / natury)`, `Zasil — ognisko (1 / patyk)`, `Zjedz — jagoda (1 / jagoda)`; the cells of the "Ogień" row grow to three lines while "Wytwórz — ognisko (6 patyków)" takes two, so their cells are uneven, and the time label lies at different heights below. Effect on the user: still readable, no role or state broken; the player must read across line breaks to find the price. It follows from the task's own form (answer 2: price in brackets after the name, the same text as the name) and the author named it as a concern; the task did not ask for a grid change. Within the task as a cost of its answer 2; no change is demanded. The human may want a wider column or a shorter wording at the request.

**M4. The three forms of "energia natury" are a constant in the view, not data** — `src/browser/view/program-editor.ts` (`NATURE_ENERGY`). `coding-browser-module.md`, "Nazwy treści z danych" (D-18), forbids writing names of maps, resources and archetypes outside the data files; nature energy is none of those, `content-identifiers` passes, and the task says the plural forms belong to "rzeczy" (things), which energy is not. The same name already stands as literals in `sim/program.ts` (`brak energii natury`) and `view/body-row.ts`. So it is not a breach; it is a third place where the name of this one thing is written. Cost if left: a rename of the energy takes three edits.

### Out of scope

**O1. The label of the pick cell no longer equals the action's name for any consumer that compares them** — `actionPick` in `program-editor.ts` (`label: actionCellLabel(...)`); no consumer in `src/` does so today (`rule-panel.tsx:195`, `:447`, `:526` only show it; `ACTIONS[kind].label` stays for the row, `actionSentence`). A later task that finds a cell by its action name (a keyboard shortcut, a search in the pick, D-299 says there is none) would need the bare name. Beyond the task; no grade needed.

## Coverage of the task

Verified by reading the diff and by my own runs (below), not from the author's report.

| Item | Met by | Evidence |
|---|---|---|
| To do 1 — price at every pick cell, a greyed one too, and at the chosen action, from data; not in the row | `actionPick` gives the cell a label with the price; `rule-panel.tsx` (unchanged) shows the cell's label in `ReactPickCell` and the chosen label in the closed value (`chosenLabel`), with the time beside both in `.rule-panel-time` | `tests/view/rule-editor.test.mjs` "the price stands in the name of each action cell, a greyed one too, and the row of the rule shows no price" and "the value shown for the action field is its name with its price, and the time of one execution stands beside it"; `program-editor.test.mjs` "a cell of the action pick carries its price..."; screenshot `rule-panel-prices.png` shows the cells and the row without price |
| To do 2 — in brackets after the name, plural forms from data, energy by full name | `RESOURCES[...].plural {few, many}`, `countedName`, `NATURE_ENERGY`, `actionPriceText` | tests of `countedName` (0, 1, 2, 4, 5, 12, 14, 21, 22, 24, 25, 112, 122), data test of the four resources' forms; the four examples of the task are asserted as written: „6 patyków”, „1 patyk”, „2 patyki, 10 energii natury”, „1 jagoda” |
| To do 3 — price follows the character of the run; Programy and outside a run the price of the data | `actionPriceText` reads `state.run?.character.skills ?? {}`; `campfireLightCount` shared by `run.ts`, `program.ts` refusal and the price | test "the price follows the character of the map run..." (`"10 energii natury"` with `cleanFlame`, `"2 patyki, 10 energii natury"` without a run and with a run of a character that bought nothing); `campfire.test.mjs` "a finished action takes from the backpack and from the nature energy exactly its price, with and without „Czysty płomień”" ties price to effect. The refactor of the refusal (`skillBonus>0 || holds(...)` to `holds(count 0)`) is equivalent: `holds` with count 0 is true |
| To do 4 — nothing used up, no price, „Uderz — patyk” included | `actionPrice` returns no pieces by default; `strikeWithStick` falls to `default` | test "an action that uses up nothing has no price..." lists nine kinds; the cell „Uderz — patyk” stays bare in two pick tests |
| To do 5 — burning `campfire.svg`, extinguished (never lit too) a new icon, same place and size, colour in the file as the rest; minutes only in the tile row | `terrain-picture.ts` chooses the file by `minutesLeft > 0`; `tile-list.ts`, `terrain-drawing.tsx` unchanged | `terrain-picture.test.mjs` three new cases (same place and size; crafted and never lit; one minute versus none); `world-area.test.mjs` state per tile; `terrain-drawing-numbers` run; the file's `fill` is `#f4f4f5`, equal to `--text-strong` in `src/browser/tokens.css:24`; screenshot `campfires.png` shows the pile of logs on the upper tile and the flame on the character's tile, no number on the drawing |
| To do 6 — icon from game-icons.net into `assets/icons/`, credit by `icon-credits`, environment fact with the title, `Rests on` of `icon-credits` | `assets/icons/wood-pile.svg`, `CAMPFIRE.extinguished`, `credits.ts`, `footer.ts` (`WITH_ICONS`), fact `game-icons-wood-pile-title`, `icon-credits` *Rests on* | see "Trust boundary"; `icon-credits` and `icon-file-content` run; the fact's archived copy (2026-04-17) I opened shows `<h1 id="icon-name" itemprop="name">Wood Pile icon`; the live page's heading, "by Delapouite under CC BY 3.0", read by me too |
| Acceptance criterion — the description of the request shows the two states side by side; the human accepts or names another icon | `campfires.png`, embed line in the author's report, in the form D-357 gives (commit link with `?raw=true`) | I opened both screenshots by their address (HTTP 200, `image/png`). The acceptance of the icon is the human's at the request. No screenshot file is among the commits of the range (`git diff --name-only` lists none) |
| Settlements row 1, 2, 3 and the projected entry "(new) — Where does the player read what an action costs?" | D-362 | row 1: "at every cell of its pick, a greyed one included, and at the action chosen in the panel … the row of a program rule shows no price"; row 2: brackets, „(2 patyki, 10 energii natury)” and „(1 jagoda)”, "the data of the game's things hold the plural forms"; row 3: „Zapal — ognisko (10 energii natury)” for „Czysty płomień”, the data's price on Programy and outside a run. *Rejected* holds exactly the three not-chosen ways of questions 1 to 3 |
| Projected entry D-70 (changed) | D-70 edited in place | binding sentence, verification and *Rejected* carry the definition's wording; the *Origin* names the task; the glossary entry "extinguished campfire" already covers a campfire not yet lit |
| Carried entries D-27, `icon-credits` | not rewritten by this task, correctly: the folded sections belong to task 24 | the credit stands where credits stand now (footer and section of the login card, both read from `ICON_CREDITS` and `WITH_ICONS`) |
| Source fidelity | the answers of questions 1 to 5 and the numbers of the *Context* | prices match the data: craft 6 sticks, light 2 sticks and 10 energy, light a stick 1 stick and 10, feed 1 stick, eat 1 berry; `run.ts` takes exactly these (checked in `landUse`); nothing in D-362 or the code is added that the task does not carry |

### The gaps the orchestrator carried

1. The invariants element's `decide_entry.md`, `draft.md`, `write.md` and template: the only change to an invariant is one id appended to *Rests on* of `icon-credits`, after `game-icons-dodge-title`, with the same form as its neighbours; the fact exists under that heading; `foundation_check.py` gives 0 errors. Not a gap in this change.
2. One decision, D-362, for rows 1 to 3 and the projected entry: judged to fit. `decide_entry.md` asks for one question per entry ("when they answer two independent questions, propose two entries, or keep the question the rest serves"); the three rows are answers to what the player reads of an action's cost, and the plan's change log took them as an addendum to the projected entry's one question. Each row's meaning stands whole and with its own *Rejected*. The cost is a later change of the wording alone editing the entry that also holds the place; that is M2's neighbour, not a finding.
3. Part map and facts read in part: I read the part map whole and the environment facts `game-icons-licence`, `cc-by-3-adaptation-credit`, `game-icons-campfire-title` and the new fact whole; the rest of the facts file I did not.
4. The credit sentence: M1.
5. Kitchen-sink page not changed: agree. `styleguide-browser-view.md`, "The kitchen-sink page", says it draws no game map from a game state and shows controls and roles; the price is the pick cell's own text, no new control, state or role.
6. The price in the label of the cell: fits To do 1 and answer 2 ("tym samym tekstem co nazwa, więc nie potrzebuje nowej roli"). The time keeps its own element beside the cell and beside the closed value, so D-293's places of the time (row and panel) are unchanged, and the price stands beside the time in the panel, never in the row (`rule-list.tsx`, `actionSentence` untouched). It also means the greyed cell's price greys with its text and the accessible name of the cell and of the closed field carry it (`Czynność: Zapal — ognisko (…)`). Cost, if the price should one day take another role: split the label then (the author's choice 1). See O1.

## Trust boundary: `assets/icons/wood-pile.svg` (crafted-input check)

- **Content (`icon-file-content`, D-27):** one `svg` and one `path`, attributes `xmlns`, `viewBox`, `fill`, `d`. The only address in the file is the SVG namespace. No `script`, `foreignObject`, `style`, `on*` attribute, `href`, `url(`, `data:`, doctype or entity (pattern search on the committed file); `d` holds path commands and numbers only. `tests/invariants/test_icon_file_content.py` passes on it (exit 0); the icon test of `tests/view/icons.test.mjs` passes. The author's break (a `script` element added, exit 1, then restored) is the control the guideline asks for; I did not repeat it.
- **Provenance:** my own download of the page's white-on-transparent file equals the committed file except `fill`. Its page says "Wood Pile icon" and "by Delapouite under CC BY 3.0".
- **Credit (`icon-credits`):** footer and section hold, for `wood-pile.svg`, the title „Wood Pile icon” (capital P, as the page and the fact give it), the author Delapouite, the page `https://game-icons.net/1x1/delapouite/wood-pile.html`, `CC BY 3.0` and the statement of change; `test_icon_credits.py` passes (5 tests). The statement of difference is true in that the file was changed, loose as to what changed: M1.
- **Container (`loop2-container-icons`):** `tests/invariants/test_loop2_container_icons.py` passes (it builds the image, 138 s); `Dockerfile:8` copies `assets/icons/` whole, so the file reaches `/icons/wood-pile.svg` with its bytes.
- **Irreversible operation:** none in the change.

## Changed invariant test

`tests/invariants/test_icon_credits.py`: `"wood-pile.svg"` added to `AUTHORS` ("Delapouite") and `TITLES` ("Wood Pile icon"), and the comment naming the facts. The values come from the page, not from the code; no expectation weakened.

## Tests

- Changed expectations (labels with prices in `program-editor.test.mjs` and `rule-editor.test.mjs`; the old assertion "extinguished drawn as when it burns" in `terrain-picture.test.mjs` and `world-area.test.mjs`; the campfire data in `data.test.mjs`; the footer's order in `icons.test.mjs`): each follows the task (To do 2 and 5) and the new D-70 and D-362, with the source named in a comment of the test. Not hiding a failure.
- New tests: expectations are written out by hand from the task's examples and the data. The consistency case in `campfire.test.mjs` compares the finished action's effect with `actionPrice`; the same file also asserts `actionPrice` by value, so the pair is not circular.
- Mutation (guideline "Mutation testing", changed `simulation` files): StrykerJS on `program.ts:44-100`, `program.ts:345-358` and `run.ts:271-275`, 66 mutants, 62 killed, 4 survived, score 93.94. Survivors classified: `program.ts:73` (`pieces` seeded with a string) equivalent, the `filter(piece.count > 0)` drops it; `program.ts:84` (`lightItem` clause emptied) equivalent with the current data, because it falls into the `feedCampfire` clause and both name the stick; `program.ts:93` (`default` removed) equivalent; `run.ts:274` (`backpack[item] < count` replaced by false) is the guard that stood before this change, defensive since a lighting is refused before it starts, outside this task. No real gap.

## Declined to judge

- The scene's extinguished campfire (D-316, malejący płomień of task 18): outside the task's *Out of scope*.
- The rule row's reason text and states (D-308 to D-310): unchanged by the diff; I only compared the price's wording with D-310's „brakuje 4 × patyk” and found the two forms kept apart on purpose by question 2.
- Whether `wood-pile` is the right extinguished-campfire icon: the human's at the request (acceptance criterion).
- A second fuel or food in the data (the price names the first piece of its use): the author's choice 3, no second item exists today.
- Task status lines and backlog (`_tasks_active.md`): not part of the code.

## Checks run

All in a scratch worktree of the head commit outside the reviewed worktree (the reviewed worktree, its index and branch untouched; `git status --short` empty, HEAD `99b9ce9` before and after). The scratch worktree had `.the-way` copied and `node_modules` linked; both removed with the worktree.

| Check | Command | Exit |
|---|---|---|
| head | `git rev-parse HEAD` | 0, `99b9ce97d467e232ba2feb9b4e14cca73b6dd7d9` |
| view tests, program editor | `npm test -- tests/view/program-editor.test.mjs` | 0 (58 pass) |
| focused tests | `node --test tests/view/rule-editor.test.mjs tests/view/terrain-picture.test.mjs tests/view/icons.test.mjs tests/view/world-area.test.mjs tests/sim/campfire.test.mjs tests/sim/data.test.mjs` | 0 (214 pass) |
| invariants | `npm test -- tests/invariants/test_icon_file_content.py` | 0 |
| | `npm test -- tests/invariants/test_icon_credits.py` | 0 |
| | `npm test -- tests/invariants/test_loop2_container_icons.py` | 0 |
| | `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| | `npm test -- tests/invariants/test_terrain_drawing_numbers.py` | 0 |
| | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| | `npm test -- tests/invariants/test_design_token_contrast.py` | 0 |
| foundation | `py -3 -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| mutation | `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/program.ts:44-100,src/browser/sim/program.ts:345-358,src/browser/sim/run.ts:271-275"` | 0 (62 of 66 killed; the 4 survivors classified above) |
| format and lint of the changed `.ts`, `.tsx`, `.mjs` files | `npx prettier --check <files>`; `npx eslint <files>` | 0; 0 |
| icon provenance | `curl` of the page's two SVG downloads, comparison with the committed file | the committed file equals the transparent download with `fill` changed (`cmp` identical) |
| page and archived copy | `WebFetch` of the live page; `curl` of the archived capture of 2026-04-17 | heading "Wood Pile icon", "by Delapouite under CC BY 3.0" |
| screenshots | `curl -L` of both embed addresses | 200, `image/png`; opened and looked at |

Not run, by the handoff: `npm test` (the full gate). Not run by me: the invariant `icon-file-content` control on a crafted copy (the author's report gives it; it is the author's claim, which I did not repeat), the other invariants of `browser-view` and `simulation` (left to the gate), `npm run build`'s separate typecheck (the focused `npm test -- <file>` builds the game and passed).

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/foundation_step.md` (whole) and `.the-way/elements/decisions/template.md` (lines 1 to 60) and `skill/decide_entry.md` (first 80 lines): to judge gap 2.
- D-357 (whole): to check the form of the screenshot embed (the entry's scope is `agent-workflow`, outside my selection).
- `tests/invariants/test_icon_credits.py` (docstring and lines 60 to 125): to read what the check holds of the statement of change and to name the changed invariant test.
- `https://game-icons.net/1x1/delapouite/wood-pile.html`, its two SVG downloads, the archived capture of 2026-04-17 on web.archive.org: to check title, author, licence and the difference from the source.
- `Dockerfile` (the `COPY` of icons), `src/browser/tokens.css:24`: for the container and the colour.
- `src/browser/view/rule-panel.tsx` (lines 160 to 220 and 400 to 560) and `controls/react-pick-cell.tsx`: to see where the label and the time are drawn.

## Unread material

- Decisions: the selection of the touched parts (`browser-view`, `simulation`; no entry names `product-foundation`) is 299 entries, D-362 among them. Read whole: 21 (D-18, D-19, D-27, D-34, D-43, D-63, D-68, D-69, D-70, D-72, D-145, D-175, D-196, D-288, D-289, D-290, D-291, D-293, D-310, D-316, D-362). Run through by title only: 278.
- Decisions whose title points to a bearing on the change and stayed unread: D-35 (exemplar of simulation modules), D-40 and D-44 (neutral roles; the controls the pick cell belongs to), D-73 and D-84 (testing discipline and real mechanisms; I read their text in `testing.md` instead), D-308 and D-309 (the state and the signs of a rule, whose reason D-310 derives from), D-23 (how a character acts by its program), D-04 (isolation of the simulation; its invariant `simulation-isolation` is left to the gate, I did not run it). I judged none of them to change a finding.
- Guideline files read whole: `guidelines/coding.md`, `coding-content-data.md`, `coding-simulation-module.md`, `coding-browser-module.md`, `styleguide-browser-view.md`, `testing.md`. Not selected: `coding-saved-game.md` and the account-server, build and mail kinds (the change touches none). `src/browser/AGENTS.md` not read (it belongs to `agent-workflow`; the token rule it holds is also in the styleguide, which I read, and `browser-view-token-values` passes).
- Invariants read whole: `icon-file-content`, `icon-credits`, `loop2-container-icons`, `terrain-drawing-numbers`. The other invariants whose *Part* names `browser-view` or `simulation` I did not read; of them I ran `content-identifiers`, `browser-view-token-values` and `design-token-contrast` (docstrings only for the first two).
- Part map: read whole. Glossary: read the entry "extinguished campfire" and its neighbours only, not the whole file. Environment facts: read the four named above, not the whole file.
- The vault notes the task and D-362 cite (`the task's note in the author's backlog`, `the project definition's note in the author's notes`, `the new-player reconnaissance report in the author's notes`): not read; the frozen task document carries the passages.
- The author's `.runs/task-cycles/.../cycle.md` and `base_gate.txt`: not read.

## Searches not found or unclear

- Not found: any consumer of the pick cell's label that expects the bare action name (grep of `cell.label`, `chosenLabel`, `.label ===` in `src/`); none, hence O1 only as a note.
- Not found: a place in the foundation that still says the drawing shows burning and extinguished campfires alike (grep for "extinguished" in `foundations/` and `guidelines/`): D-316 and its verification speak of the scene, not the map's drawing, and stay true.
- Unclear: the page of the icon labels its first download option "SVG (W/B)" and does not say what the abbreviation means; I read it as white on black from the file the link gives. This is the reading M1 rests on.
- Unclear: whether the foundation step wants one entry per settlement row; the step says "each row … as an entry of its kind", `decide_entry.md` says one question per entry. I read the two together as fitting D-362, as gap 2 says.
- Nothing else looked for and missed.
