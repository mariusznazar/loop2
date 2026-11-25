done with concerns

# Executor report - Slice 10 (the look of the catalog in both layouts, checked in the game and shown beside the old Loop), task `katalog-map`

Worktree `the task's worktree`, branch `task/katalog-map`, base `eed49524`. Nothing pushed to the product repository. The full gate (`npm test` with no file) was not run. Screenshots were pushed to `mariusznazar/screenshots` (section "Screenshots").

## Commits

- `00b772a0` feat: give the catalog of the screen Mapy its look in both layouts ... Files (lines added / removed):
  - `src/browser/maps-screen.css` +155 / -15 (the rules of the catalog; the unused `.maps-list-solved` is gone; the phone block of Mapy rewritten for the two-line row)
  - `src/browser/view/map-catalog.tsx` +20 / -10 (markup: the filled circle carries the class `solved`; each fact is an element `maps-catalog-fact`, in „Dokąd” and in „Co daje”)
  - `tests/view/map-catalog.test.mjs` +20 (assertions on the two markup changes)
- Screenshots repository `mariusznazar/screenshots`, branch `loop2/katalog-map`: commit `a5f1f3003637742f04f16f47bc16158d4ad4023e` (author address of the owner's private identity, as the rule of that account gives).

## What was made

All values read tokens by `var(--…)`; no token was added or changed; no value was lacking.

- The catalog is a column (`.maps-catalog`, gap `--space-s`). Search field: the shared field widened to the area (`display: flex`, `width: 100%`, padding `--space-s`/`--space-m`, size `--font-size-body`). Tabs: the shared tab look (D-276) in a wrapping flex row with `--space-xs` gap. Counter and the sentence „Nic nie pasuje do …”: `text-secondary`, `--font-size-detail`.
- Region (a „Dokąd”/„Postęp” region, a „Co daje” resource): a thin `divider` line above, header in `text-label` at `--font-size-label`, emphasis weight, its text beginning where the text of the rows does; in „Co daje” the icon, the name and, at the right, the count of maps (body weight).
- Row of a map (`.maps-list-item`, a grid of three columns `--space-m | 1fr | auto`): first line the state circle, the name, and at the right the icons of the attackers (`text-secondary`); second line the facts in `text-secondary` at `--font-size-detail`, the „⊘” ones in `warning` (the existing `maps-card-warning`); a fact never breaks inside (`white-space: nowrap` on `.maps-catalog-fact`), a narrow row breaks between facts. Circle: filled `●` in `positive` for a solved map, empty `○` in `text-secondary` for an open one. Picked row: `text-strong` and a bar `--bar-width` in `selected` at the left; under the pointer `highlight` (the rules of the list of programs).
- Fold row of the solved maps: the shared plain button inside a padded `li`. Empty places of „Postęp”: a dashed line (`--frame-width`, `dashed`, `text-disabled`) of three lengths in turn (60 %, 45 %, 52 %), beginning under the names.
- Phone layout: one block `@media (width < 1280px)` after the computer rules, with the comment naming D-396; the row holds `min-height: var(--touch-target-min)` and its two lines stand at the middle of it (`align-content: center`); the rule `hover: none` that removes `highlight` under a pointer that cannot hover stays. Tabs, field, fold and buttons hold 48 px by `styles.css`.

## Checks (command - exit code)

All in the worktree root; logs in `.runs/executor-10/` (ignored).

1. `npm test -- tests/view/map-catalog.test.mjs` - 0. First, before the markup change (the file of the component put back to its `HEAD` text, the two new assertions in place): exit 1, 2 of 12 failed (the row case and the „Co daje” case); log `.runs/executor-10/chk-catalog-before.log`. After: exit 0, log `chk-catalog.log` and `chk-map-catalog.test.mjs.log`.
2. `npm test -- tests/view/maps-screen.test.mjs` - 0.
3. `npm test -- tests/invariants/test_browser_view_token_values.py` - 0.
4. `npm test -- tests/invariants/test_browser_view_focus_outline.py` - 0.
5. `npm test -- tests/invariants/test_design_token_sources.py` - 0.
6. `npm run --silent typecheck` - 0.
7. `npx prettier --check src/browser/maps-screen.css src/browser/view/map-catalog.tsx tests/view/map-catalog.test.mjs` - 0.
8. Also: `npx eslint --max-warnings 0 src/browser/view/map-catalog.tsx tests/view/map-catalog.test.mjs` - 0; `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` - 0, "0 errors" (after `git add` of the three files); `npm test -- tests/quality/test_function_and_file_size.py` - 0.
9. The browser check (below) in both layouts with the measurement of `loop2-play`.

Not run: the full gate; the foundation check without the flag; `check_instructions.py`; `tests/invariants/test_design_token_contrast.py` (no token touched).

## Own-work check

- Requirement most likely unmet: "every control at the touch minimum, nothing scrolling to the side or out of its frame at 360 px" with a row of two lines that wrap. Check: the measurement of `loop2-play` at 360 x 740 with touch on every state of the list below (taps, not clicks). Result for each: `scrollsToTheSide` false, `contentWiderThanItsBox` [], `outsideTheWindow` [], `controlsSmallerThan48` []. (What fell wrong in the walk: at 1280 px a row of „Las — wataha” wrapped its last fact to a lone „min” on a third line; seen in a screenshot, fixed by `white-space: nowrap` on each fact, test added, run again.)
- Mutation in my head: dropping `solved` from the class, or merging the facts into one run, are caught by the two new assertions (check 1 seen failing); a wrong role colour or a missing rule is a look and is held by the screenshots, not by a test (testing guidelines, "Not tested on purpose").

## Walkthrough (the change alters what the player sees on the screen Mapy)

Game: `npm run local` in the worktree (`https://127.0.0.1:61822`), Playwright CLI; the computer layout at 1600 x 1000 and 1280 x 720 with no touch, the phone layout through `.playwright/cli.phone.config.json` (360 x 740, touch, `phone` true, `hover: none` true); a made-up account `agent10@example.test`; states composed by my script `.runs/executor-10/compose.mjs` (accepted by `loadSavedGame`) and sent by the save request: a new game with no character; and Las, Skraj lasu and Las — głębiej solved with a character „Agent”. The build was repeated (`node scripts/build.mjs`) after each change of the code.

| Case | Layout | Verdict |
|---|---|---|
| New game, „Dokąd”: search, three tabs, counter „1 poznanych · 0 rozwiązanych”, header „Las · 0 z 5”, one open row, right area „Wybierz mapę z listy.” | 1600 x 1000 | right |
| Skraj lasu picked (bar in `selected`, text `text-strong`, card on the right) | 1600 x 1000 | right |
| Three maps solved: „Dokąd” folded („▸ 3 rozwiązane”) and unfolded, „Co daje” (4 groups, rarest first), „Postęp” (one dashed empty place) | 1600 x 1000 and 360 x 740 | right |
| Search „głęb” finds one map, fold disabled and open; search „qqq”: „Nic nie pasuje do „qqq”.” | 1600 x 1000 and 360 x 740 | right |
| A map picked among folded/unfolded groups: its row marked, group open | 1600 x 1000, 1280 x 720, 360 x 740 | right |
| Row at 1280 x 720 (the narrow column): facts break between facts | 1280 x 720 | right after the fix |
| Measurement at 360 px, each state above | 360 x 740, touch | clean (see own-work check) |
| Console | both | 0 errors |
| Side observation | 1600 x 1000 | the glyph „≈” in the stock facts looks orange-ish in the screenshots in the card and in my rows alike; its computed colour is the text's, so I take it for antialiasing of the screenshot, not a fault (a guess, not checked further). A tap on a row shows `highlight` for a moment on the phone until the next tap in a screenshot taken straight after it; the computed background a moment later is transparent, as the `hover: none` rule gives. |

Not checked: a page area of 1100 px (no fault was seen near it; the catalog is one column below 1280 px); the keyboard order of the catalog in a real browser (the shared focus rule stands on every link, button and the field; I saw the ring on the field); Firefox and Edge (the check of D-396 is by hand, in a separate session); the state of the lair with its number (Slice 11).

## Screenshots

Directory `loop2/katalog-map/` of `mariusznazar/screenshots`, branch `loop2/katalog-map`, commit `a5f1f3003637742f04f16f47bc16158d4ad4023e`. Each looked at before the push: they show only the made-up character „Agent”; the menu „Konto” is closed, so no address appears; the two old-game images are the old public product's, copied as D-418 says. Link form: `https://github.com/mariusznazar/screenshots/blob/a5f1f3003637742f04f16f47bc16158d4ad4023e/loop2/katalog-map/<name>.png?raw=true`

Old Loop (31 October, 1600 x 1000):
- `old-loop-02-mapy.png` - the new game; `old-loop-03-mapa-skraj.png` - Skraj lasu picked.

loop2, 1600 x 1000 (the pairs):
- `catalog-1600-new-game.png` - beside `old-loop-02-mapy.png` (a new game, no character).
- `catalog-1600-skraj-picked.png` - beside `old-loop-03-mapa-skraj.png` (a new game, Skraj lasu picked).
- `catalog-1600-dokad-folded.png`, `catalog-1600-dokad-unfolded.png`, `catalog-1600-co-daje.png`, `catalog-1600-postep.png` - the three views, with three maps solved.
- `catalog-1600-search-found.png`, `catalog-1600-search-none.png` - a search that finds and one that finds nothing.
- `catalog-1600-deep-picked.png` - a solved map picked, with the card and a character.

loop2, 1280 x 720: `catalog-1280-dokad-picked.png`.

loop2, phone layout, 360 px: `catalog-360-dokad-folded.png`, `catalog-360-dokad-unfolded.png`, `catalog-360-co-daje.png`, `catalog-360-postep.png`, `catalog-360-search-found.png`, `catalog-360-search-none.png`, `catalog-360-dokad-picked.png`.

(Links: replace `<name>` by each name above in the form given.)

## The pair, in plain words (for the human who reads it)

**Pair 1: `old-loop-02-mapy.png` and `catalog-1600-new-game.png`** (a new game).
- The old Loop does better or equal: the search field has a magnifying glass; the tabs are three boxed buttons, so they look like buttons at once (loop2's are underlined words); the region header „LAS” is in capitals with the count „0 z 6” alone at the right and dimmer; the page uses no boxes, so the list sits in open space; the menu bar has an icon at each item and the date at the right.
- loop2 does better: the state circle is large enough to read (the old one is a tiny ring); the facts stand on a line of their own under the name, so the name is read first and the facts do not run on after it; a counter line says what the list holds („1 poznanych · 0 rozwiązanych”) where the old one shows it only on the phone; the right area says „Wybierz mapę z listy.” where the old one is empty; a longer fact line wraps between facts and not inside one.
- Equal: the order of the facts (the demand, what the map takes, the terrain), the wording of the search hint and of the three views, the regions with „z N”.

**Pair 2: `old-loop-03-mapa-skraj.png` and `catalog-1600-skraj-picked.png`** (Skraj lasu picked).
- The old Loop does better: the picked row is filled and has a green bar, so it stands out more than loop2's (a light grey bar and brighter text, no fill, as D-331 sets); and the card on the right is the old game's strong point: a large title with the state beside it („otwarta”), one short sentence of the goal, the button „Wejdź — wybierz postać” at the top right, „Żąda” and „Teren” as a label and value table with the values at the right edge, and „Leży tu” as a third column with icons - three columns that are read at a glance.
- loop2 does better: the list column shows the two lines of the row and the counter; the card shows „Kto idzie” with the character's lines under the card instead of one button; the demand line names the conditions in full („480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”). That is wordier, so it is no gain for reading at a glance.
- Equal: the picked row is the one marked, with a bar at its left.

**Places where the catalog does less well than the old one** (all named, so that the human sees them with the pair):
1. No magnifying glass in the search field (the icon directory has none, and the shared field draws none).
2. The tabs are the product's shared underlined tabs (D-276), less like buttons than the old boxed ones.
3. The picked row has no fill (D-331 settles the bar and the strong text), so it is less visible than the old picked row.
4. The region header is one line of text in the label colour, not capitals with the count aligned to the right: the lines give the header as one string, and capitals would turn „z” into „Z”.
5. The fold row of the solved maps is a framed shared button, heavier than the old flat grey line; while a search or a pick holds the group open it is disabled and shows in `text-disabled` (Slice 9's choice), which reads as a fault in a screenshot (`catalog-1600-search-found.png`, `catalog-1600-deep-picked.png`).
6. The areas are boxes on `panel` (D-282), which the old page does not have; the old looks lighter.
7. The card (not the catalog, not in this slice): see Pair 2 - it is the place where the old game reads better, and it decides how the whole pair is judged.

## What I left of the old Loop's look, and why

- **Kept:** the arrangement of a row (circle at the left, name, facts, the attacker's icon at the right); the order of the facts; the words „Dokąd”, „Co daje”, „Postęp”, the search hint, „Nic nie pasuje do …”; regions with „N z M”; the dashed empty places of three lengths in turn (the old ones had three widths), beginning under the names; the facts of „⊘” in the warning colour; a filled circle for a solved map.
- **Left (different):** the row is two lines in both layouts (the old one: one line on the computer, two on the phone) - the plan says two lines, and the left column of loop2 is a quarter of the width (D-282), too narrow for the facts after the name; the solved map's name is not green and its row is not dimmed (D-331 gives the name `text`; opacity is no token); the circle carries the green instead; the tabs are the shared tabs (D-276, D-44); the header of a region is not in capitals and its counter is not at the right (the single string of the lines, see place 4); the picked row has no fill (D-331); no magnifying glass (place 1); the counter line stands under the tabs also on the computer (the old one only on the phone), because loop2 has no page heading to carry it. Words of the old Loop: unchanged. Proportions: the column share is D-282's. Spacing: the steps of the token scale (4 and 8 px), the row about 43 px against the old 37 px, because it has two lines.

## Choices (way rejected, cost if wrong)

1. Facts as elements (`maps-catalog-fact`) with `white-space: nowrap`, the separators outside. Rejected: a break inside a fact (the screenshot at 1280 px shows a lone „min” on its own line), and a separator drawn by CSS (it would change the text the test and the screen reader read). Cost: low; a very long single fact would still overflow its box only if it was wider than the area, and `overflow-wrap: anywhere` on the main column then breaks it.
2. A class `solved` on the filled circle. Rejected: a selector on `aria-label`, or a coloured name. Cost: none.
3. The old rule `.maps-list-item` rewritten as the grid row instead of a second class on top of it; the class `maps-catalog-row` stays in the markup and has no rule (Slice 9's tests do not name it). Cost: a class with no rule; remove it with the next change of the markup.
4. The empty places use `text-disabled` for their dash (the pick cell's greyed look: what cannot be used yet). Rejected: `divider`, the old colour, which is nearly invisible on `panel`. Cost: low.
5. No change to the card, the fold row's look or the shared controls (outside the slice's *Change*; D-265 keeps the look of a shared control in `styles.css`).

## Concerns for the orchestrator

- The pair in the acceptance criterion is judged on the whole screen, and the card on the right (rules in the same file `src/browser/maps-screen.css`, markup in `maps-screen.tsx`) is where the old Loop reads better: a larger title with a state tag, one short demand sentence, a label/value table for „Teren”, three columns, the button at the top. It is not in this slice's goal or *Change*; if the human names the old Loop as the more legible, this is the likely place. A card look slice (CSS, possibly a grid of the card's sections) would be small; I recommend asking the human to look at the pair first.
- The disabled fold row (place 5 above) reads as a fault; an alternative is an enabled fold that the lines keep open (Slice 9 rejected a dead control) - a decision for the orchestrator.
- The styleguide section "The screen Mapy" still describes the old list (Slice 12 writes it); the state circle's `positive` role, the `solved` class and the `nowrap` of a fact should be named there.

## Reaches beyond the dispatch

- `src/browser/styles.css` (the rules of `.tabs`, `.button`, `.input-field`, `.icon-mask`, the phone blocks) and `src/browser/programs-screen.css`, `src/browser/knowledge-screen.css` (the list of programs and the tree row, to match the rules of the picked row and the plain button); `src/browser/view/catalog-lines.ts` and `src/browser/view/controls/react-text-field.tsx` (the shape of the lines and of the field); `.runs/task-cycles/katalog-map/reports/executor-9-report.md` (named by the handoff); `.the-way/task-cycle/change/slice.md` (named by `SKILL.md`). Why: to draw on the existing look and to know what the markup gives.

## Working copies

- `.runs/executor-10/` (ignored): logs of the checks, my compose script `compose.mjs`, `send.sh`, `shot.sh`, `pshot.sh`, `phone-measure.js`, the screenshots as taken (they stay for the record; the shown ones are in the screenshots repository). The clone of the screenshots repository (`.runs/executor-10/screenshots`) was made, pushed from and removed. `.playwright-cli/` was deleted, the Playwright session closed, the local start ended with `npm run local:stop` ("Local starts stopped: 1"); its database under `.runs/local-start/` stays by the skill's rule. No worktree was made.

## Unread material

- `guidelines/testing.md`: read lines 1-160 and 326-437 (levels, the rules of choosing a level and expected values, the document imitation, the gate, the recipes, "Not tested on purpose"); lines 160-325 (trust boundaries, AI in tests, mutation testing, flaky tests) not read.
- `guidelines/styleguide-browser-view.md`: read lines 1-1250 and 1486-end; lines 1250-1485 (the end of the scene rule, the picture band of Siedziba, the chronicle, the end-of-run window, the list of accounts) not read - they concern other screens.
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`, `.claude/skills/loop2-play/SKILL.md`: whole. `walkthrough.md`: whole (read after the walk, before the report; the table above holds its plan, its last row and the verdicts).
- `foundations/decisions.md` (D-418, D-419, D-282, D-396, D-325, D-331, D-421) and `foundations/part_map.md`: not opened; I worked from the styleguide's rules that quote them, from the handoff and from the task's text. D-418 and D-419 I took from the skill `loop2-play` ("Show a screenshot to the human") and the handoff.
- `task.md`: read lines 1-60 and 100-130 (To do 1-5, Q1, Context); To do 8 and the acceptance criterion are in the handoff.
- The old game's `MapCatalog.tsx`: read whole (first 400 lines, which is the file). `mapFacts.ts`: not read.

## Searches not found or unclear

- An icon of a magnifying glass for the search field: none in `assets/icons/` (searched with a name filter `magn`/`search`).
- "The short demand" in the plan's *Goal* and D-331: the lines give the facts of a row (the streak first); I drew them as the second line. Unclear whether a different text was meant (as Slice 9 reported).
- Skraj lasu in loop2 asks 8 h and shows „bez ognia 83 min”, the old game's screenshot 12 h and 333 min: different data of the two games, not a fault of the catalog.
