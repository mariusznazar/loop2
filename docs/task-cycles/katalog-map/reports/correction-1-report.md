done with concerns

# Correction 1 — the human's remarks on the request, task `katalog-map`

Worktree `the task's worktree`, branch `task/katalog-map`, head at the start `720d1d2a` (confirmed). Nothing pushed to the product repository. The full gate (`npm test` with no file) was not run, as the handoff says (the orchestrator runs it). Method: `.the-way/task-cycle/change/SKILL.md`, variant "a correction for the human's remarks".

## Commits (in order, on 720d1d2a)

1. `c52e3f78` fix: „z”/„ze” before a number by its first spoken word — `src/browser/view/counted-name.ts` (+12/−15), `tests/view/counted-name.test.mjs` (+19/−17)
2. `38e60b50` docs: D-438 names the measurement of the mode `progression`, not a map check — `foundations/decisions.md`, `tests/balance/progression.test.mjs` (+1/−1)
3. `c833dd17` fix: the fold row always works; a picked solved map stands above its folded row — `catalog-lines.ts`, `map-catalog.tsx`, `tests/view/catalog-lines.test.mjs`, `tests/view/map-catalog.test.mjs`
4. `e7072b97` feat: the magnifying glass icon with its credit and title fact — `assets/icons/magnifying-glass.svg` (new), `src/browser/view/credits.ts` (+21), `credit-lines.ts` (+9/−3), `tests/view/icons.test.mjs` (+40/−3), `tests/invariants/test_icon_credits.py` (+3/−1), `foundations/environment_facts.md` (+6), `foundations/invariants.md` (+1/−1)
5. `16aadaf1` feat: the new card, the glass in the field, the views as framed buttons, the filled picked row — `src/browser/maps-screen.css` (+129/−26), `maps-screen.tsx` (+182/−100), `map-lines.ts` (+82/−29), `map-catalog.tsx`, `catalog-lines.ts`, and the tests `map-lines`, `maps-screen`, `maps-record`, `map-catalog`
6. `1054b372` docs: D-327, D-331, D-39, D-279, D-133 and the styleguide's section „The screen Mapy”, with the tests' `decision:` lines re-quoted

Totals over `720d1d2a..1054b372`: 22 files, about 1 000 lines added and 480 removed.

## Each remark, as made, and how

**1. The right-hand card and three places of the catalog — fixed.**
- (a) The card (`maps-screen.tsx` `MapCard`, `map-lines.ts`, `maps-screen.css`): a heading row with the name, beside it a state tag „otwarta” (`text-secondary`) or „rozwiązana” (`positive`), then „ · odsłania ją {mapa}”; at the right of the heading the plain shared button „Wejdź — wybierz postać”. Its click moves the focus to the heading „Kto idzie” (made focusable with `tabIndex=-1`), and the browser scrolls it into view: in the old Loop the button opened a character picker, but in this game each character already stands in „Kto idzie” with its own program, what enters and „Wejdź”. Under the heading stands the one sentence of the solving condition from the data, now without the map's name before it (the title already names it). Then two columns. The left one holds „Żąda” as a label-and-value table („passa 8 h”, „do pokonania 2” with the creature's icon) and „Teren” as a table („siatka 4 × 4”, „wejście stałe”, „krok 5 min”, „bez ognia 83 min — otoczenie 25 °C”, the notes in `text-secondary`). The right one holds „Czyha”, „Leży tu” and „Odbiera”, in the old order. A row of „Leży tu” and „Czyha” has its icon in its own column, the name on the first line and the detail in `text-secondary` under it, as in the old card. In the phone layout the columns stand one under the other. Kept from this game: the state circle, the facts on a line of their own, the counters, „niedźwiedź: n ze 120” in the row and in „Czyha”.
- **Cannot be done as written: the big title.** The token file has no size above 16 px (`--font-size-game-title`); the title of the map stays at `--font-size-map-title`, 15 px, as before, while the old Loop's title is 22 px. Per `src/browser/AGENTS.md` I add no token and name the missing value: a title size for the card's heading, whose source the human would settle. The heading is set apart by the tag beside it, its own row and the button at its right, but it is not bigger.
- (b) The magnifying glass: game-icons.net `lorc/magnifying-glass.svg`. I took it at the pinned source commit `82d94881…` (the file there is byte for byte the old game's `assets/game-icons/lorc/magnifying-glass.svg`) and prepared it as `wolf-head.svg` was: background path removed, fill `#f4f4f5`. It is credited in `ICON_CREDITS` and, being no thing of the game's data, it reaches the credits through a new list `INTERFACE_ICONS` (`SEARCH_ICON`) in `credits.ts`, read by `credit-lines.ts` after the archetypes. Its credit line reads „szukanie mapy albo zasobu: „Magnifying glass icon”, Lorc, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)”. The title is in `tests/invariants/test_icon_credits.py` (title and author Lorc). The environment fact `game-icons-magnifying-glass-title` is added and `icon-credits`' *Rests on* names it. The glass is drawn as a mask in `text-label` inside the field's frame, and the field's text begins after it.
- (c) The views: shared buttons selected in their group (the pace-button look: framed, the picked one with its frame in `selected` and text in `text-strong`) in place of `kind="tab"`; the container no longer has the class `tabs`.
- (d) The picked row: filled with `highlight`, text in `text-strong`, bar in `positive`. On which colour: the old Loop's bar is `shadow-[inset_2px_0_0_var(--color-emerald-500)]` on a fill `bg-zinc-900` (old `MapCatalog.tsx:23`). The existing role `positive` has the value `#00bc7d`, which is Tailwind's emerald-500, the same green. So an existing role gives the green, and no new token was needed. The cost: D-40's rationale and D-279 kept every mark of the chosen one in `selected` and refused green for a chosen tab or button. So I extended the meaning of `positive` in D-39 (new paragraph: the bar of the picked row, whose card is the one open now), wrote the exception into D-279, and changed the styleguide's Roles row of `positive` and its rule "A line at a text…". The fill is `highlight` ("this row is marked", D-40), because the old fill colour `#18181b` equals `panel`, on which the catalog stands, and would not show. In the phone layout on a device that cannot hover, the picked row keeps its fill (the `hover: none` rule now spares `[aria-current="page"]`).

**2. „z”/„ze” before a number — fixed.** `withPreposition` follows the first spoken word: „ze” for zero and for a number whose first word begins with „sze” (6, 16, 60–69, 600–699) or „st” (100–199), and „z” otherwise, before „siedem-” too. For 1000 and more, the leading group of thousands or millions decides, and a leading group of one („tysiąc”, „milion”) takes „z”. Test rows: the 24 the handoff lists, plus 699, 799, 1500, 16000, 17000, 100000, 10^6, 6·10^6, 7·10^6. I seen-failed the test first at 7 (`'ze' !== 'z'`, exit 1). No decision describes the rule (searched for „ze”); the styleguide's two sentences on the record were changed.

**3. The fold of the solved maps — fixed.** The fold row is never disabled. With no search the solved maps stand folded until the player unfolds them; with a search typed, the matches stand unfolded and the fold row folds and unfolds them. Each state is kept apart (`unfolded` and `foldedInSearch` in the component), so clearing the search brings back the folding the player left. A picked solved map under a folded row stands above that row, once; unfolded, it stands in its place among the solved maps. D-331 gained the sentence „The picked row stays seen: … which the player folds and unfolds at any time, a search typed included.” D-325 needed no change: its sentence on the regions unfolded ending with the screen stays true. The styleguide's „Dokąd” item was rewritten.

**4. D-438's "map check" — fixed.** The third paragraph now reads „In one measurement of the balance instrument in its mode `progression`, a map can be solved … and Las — matecznik passes that measurement as its exception asks where no reference program solves one seed of it.” The `decision:` line at `tests/balance/progression.test.mjs:240` is re-quoted.

**5. Not mine:** untouched — the base run of the tests, the sentence of the skill `loop2-balance`, the reviews' model, the earlier reading of the review.

**6. Screenshots — pushed.** See below.

## Checks (command → exit code)

- `npm test -- tests/view/counted-name.test.mjs` → 1 before the code (fails at 7), then 0
- `npm test -- tests/view/catalog-lines.test.mjs` → 1 before the code (new fold case), then 0
- `npm test -- tests/view/map-catalog.test.mjs` → 1 once (the old case "every row … is a link" assumed the pick unfolds the group; changed for the requirement, see choices), then 0
- `npm test -- tests/view/maps-screen.test.mjs` → 1 after the card change (4 old card cases), rewritten, 0
- `npm test -- tests/view/maps-record.test.mjs` → 1 after the card change (the bear's head class and the colour of the record), changed, 0
- `npm test -- tests/view/map-lines.test.mjs` → 1 after the card change (the shapes of the lines), rewritten, 0
- Final runs, all exit 0: `npm test -- tests/view/maps-screen.test.mjs`, `map-catalog.test.mjs`, `catalog-lines.test.mjs`, `maps-record.test.mjs`, `counted-name.test.mjs`, `map-lines.test.mjs`, `icons.test.mjs`, `account-screen.test.mjs`, `headquarters-screen.test.mjs`, `shared-controls.test.mjs`, `tests/balance/progression.test.mjs`, `tests/invariants/test_icon_credits.py`, `test_icon_file_content.py`, `test_content_identifiers.py`, `test_browser_view_token_values.py`, `test_browser_view_focus_outline.py`, `test_design_token_sources.py`, `test_design_token_contrast.py`, `tests/quality/test_function_and_file_size.py`
- `npm run --silent typecheck` → 0
- `npx eslint --max-warnings 0` on the 15 changed TS/JS files → 0
- `npx prettier --check` on the same and `src/browser/maps-screen.css` → 0
- `python -B .the-way/elements/common/foundation_check.py` → 0, "0 errors" (after the last commit; between commits 4 and 6 it reported the re-quoted D-331/D-327 lines, which commit 6 settles)
- `python -B .the-way/instruction-files/check_instructions.py` → 0, "0 error, 0 warn, 110 info"
- The invariant test `icon-credits` seen failing: with `...INTERFACE_ICONS` taken out of `credit-lines.ts`, `npm test -- tests/invariants/test_icon_credits.py` → 1 ("magnifying-glass.svg: the section shows no credit with its page on game-icons.net"), restored byte for byte (`git diff --quiet` 0), → 0
- Not run: the full gate (the handoff); the browser checks in Firefox and Edge (by hand, D-396)

## Own-work check

- Requirement most likely unmet: "the card keeps working in the phone layout at 360 px" with a two-column card and tables. Check: the measurement of `loop2-play` at 360 × 740 with touch, on each state (list folded and unfolded, „Co daje”, „Postęp”, search found, search folded, search none, solved map picked unfolded and folded, the card scrolled into view, the lair after a judging). Each answered `scrollsToTheSide: false`, `contentWiderThanItsBox: []`, `outsideTheWindow: []`, `controlsSmallerThan48: []`.
- Second requirement: the top button really takes the player to „Kto idzie” in a browser. Check in Chromium: the click at 1600 × 1000 and the tap at 360 px left `document.activeElement` on the heading „Kto idzie”, in view (top 440 px of 1000; 451 of 740).
- Mutation in my head: a fold made disabled again, a picked row drawn twice or not above the fold, `foldedInSearch` reaching the list with no search, the top button doing nothing, „ze” before 7, the glass missing from the credits — each fails a test above. The colours of the card are held by the screenshots and the stylesheet checks, not by a test (styleguide: looks are seen in the browser).
- Console: 0 errors in both layouts.

## Screenshots (the pairs of the human's comparison)

Repository `mariusznazar/screenshots`, branch `loop2/katalog-map` (fetched first, a new commit on `55cbc28`, no force), directory `loop2/katalog-map/`, **commit `b1c70d8654448320b6b6d9071f2b454b9a56663d`**. Link form: `https://github.com/mariusznazar/screenshots/blob/b1c70d8654448320b6b6d9071f2b454b9a56663d/loop2/katalog-map/<name>.png?raw=true`. I looked at each image before the push. They show only the made-up character „Agent”; the menu „Konto” is closed, so no address appears. The two old Loop images are untouched.

- 1600 × 1000, the pairs: `catalog-1600-new-game` (beside `old-loop-02-mapy`), `catalog-1600-skraj-picked` (beside `old-loop-03-mapa-skraj`; a new game, Skraj lasu picked).
- 1600 × 1000, three maps solved: `catalog-1600-dokad-folded`, `-dokad-unfolded`, `-co-daje`, `-postep`, `-search-found`, `-search-folded` (new: the fold row folding the matches), `-search-none`, `-deep-picked` (a solved map picked, group unfolded), `-deep-picked-folded` (new: the same with the group folded, the picked row above the fold row); `lair-record-1600` (the lair after a judging, „niedźwiedź: 12 ze 120” in the row and in „Czyha”).
- 1280 × 720: `catalog-1280-dokad-picked`, `lair-record-1280`.
- 360 px, phone: `catalog-360-dokad-folded`, `-dokad-unfolded`, `-co-daje`, `-postep`, `-search-found`, `-search-none`, `-dokad-picked`, `-dokad-picked-folded` (new), `-card` (new: the card scrolled into view), `lair-record-360`.

How they were made: `npm run local`, Playwright CLI, an account at `example.test`. The states were composed with the built simulation and sent by the save request: a new game; Skraj lasu, Las and Las — głębiej solved with „Agent”; the four maps before the lair solved with „Agent” on the reference program `forestDeepBest`, judged on the lair in each session. The record is per browser; the program took 12 of the bear's 120.

## The pairs, in plain words, for the human

**Pair 1 — a new game (`old-loop-02-mapy` / `catalog-1600-new-game`).**
- The old Loop still does better: its region heading „LAS” in capitals with „0 z 6” alone at the right; its page has no boxes, so it looks lighter; its menu bar has an icon at each item and the date.
- Now equal: the magnifying glass in the field; the three views as framed buttons.
- This game does better: a state circle large enough to see; the facts on their own line under the name; a counter line („1 poznana · 0 rozwiązanych”); the right area says „Wybierz mapę z listy.” where the old one is empty.

**Pair 2 — Skraj lasu picked (`old-loop-03-mapa-skraj` / `catalog-1600-skraj-picked`).**
- The old Loop still does better: **its title is bigger** (22 px against 15 px — no token allows more, see remark 1); its short sentence is written by hand („Dwanaście godzin bez jednej poprawki programu.”), while ours is the condition from the data, longer („480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”); its value column of „Teren” is aligned to the right edge, ours stands just after the labels.
- Now equal: the tag of the state beside the title („otwarta”); the button „Wejdź — wybierz postać” at the top right; one sentence under the heading; „Żąda” and „Teren” as label-and-value tables in the left column; „Leży tu” with icons, name and detail line in the right column; the picked row filled with a green bar.
- This game does better: „Kto idzie” under the card says at once that the team has no character and where to make one; the picked row also keeps its circle and its facts; „bez ognia 83 min — otoczenie 25 °C” stands with the temperature as a note, as in the old card.

**Other places, for the human's judgement:** the fold row now works in every state, and a picked solved map shows above it when folded (`catalog-1600-deep-picked-folded`). The lair's number stands in the row and under the bear in „Czyha”. In the phone layout the card is one column, with the button under the title (`catalog-360-card`).

## Foundation entries written or changed

The decisions were written by `.the-way/elements/decisions/skill/SKILL.md` (with `decide_entry.md`, `read.md`, `template.md`, `common/rules.md`, `common/way_of_working.md`). The environment fact was written by `elements/environment-facts/skill/SKILL.md` (with `read.md`, `decide_entry.md`, `draft.md`, `write.md`, the template's "Source"). Marks are as `.the-way/task-cycle/skill/foundation_step.md` gives them; every entry here is the cycle's, accepted by the human at the merge.

- **D-327 — What does the card of a map hold?** (changed, `the cycle's`). EN: the card has a heading with the name, a state tag and the opener, the button „Wejdź — wybierz postać” at its right that leads to „Kto idzie”, one sentence of the condition, and two columns: the tables „Żąda” and „Teren” left, „Czyha”, „Leży tu” and „Odbiera” right, one under the other on a phone. PL: karta ma nagłówek z nazwą, znacznikiem stanu i mapą, która ją odsłania, po prawej przycisk „Wejdź — wybierz postać” prowadzący do „Kto idzie”, jedno zdanie warunku i dwie kolumny: tabele „Żąda” i „Teren” po lewej, „Czyha”, „Leży tu” i „Odbiera” po prawej, na telefonie jedna pod drugą. *Rejected* adds the old card of one column, with the human's remark as its reason. Its pair of examples, added for the colours and the phone columns, word for word:
  - complies: „rozwiązana” in the heading in `positive` and „otwarta” in `text-secondary`, „odsłania ją Las” and „— drożej niż zwykle” in `text-secondary`, and „nie odnawia się” and „wnosisz najwyżej 5” in `warning`; at a page area 360 px wide „Czyha” and „Leży tu” standing under „Teren”
  - violates: „nie odnawia się” or a cap drawn in `text` or `danger`; „rozwiązana” in the heading drawn in `text-secondary`, or „otwarta” in `positive`; „odsłania ją {mapa}” drawn in `text-strong`; the two columns side by side at a page area 360 px wide
- **D-331 — … how does a row of the list look?** (changed, `the cycle's`). EN: the picked row is filled with `highlight`, with its text in `text-strong` and a green bar in `positive`, as in the old game, and it stays seen above the folded row of its region, which the player can always fold and unfold, with a search too. PL: wybrany wiersz jest wypełniony `highlight`, z tekstem w `text-strong` i zieloną belką w `positive`, jak w starej grze, i stoi nad zwiniętym wierszem swojego regionu, który gracz zawsze może zwinąć i rozwinąć, także przy szukaniu. *Rejected* adds the old look (`selected` bar, no fill) and the disabled fold, with the human's remark as the reason. Its pair, word for word:
  - complies: „Wybierz mapę z listy.” in `text-secondary`; at `#/mapy/forest` the row of Las on `highlight`, its text in `text-strong` and a bar in `positive` at its left
  - violates: the picked row marked by a bar alone with no fill, or by a background in `highlight` alone; its bar in `selected` or in the colour of its text
- **D-39 — What do the signal colours mean?** (changed, `the cycle's`; a new paragraph, a complying example, a rationale sentence). EN: `positive` also stands as the bar of the picked row of the catalog of maps, whose card is open now; that bar takes no colour from the text beside it. PL: `positive` stoi też jako belka wybranego wiersza katalogu map, którego karta jest teraz otwarta; ta belka nie bierze koloru tekstu obok. The added complying example: „the bar of the picked row of the catalog of maps in `positive`”. This changes the meaning of a role. The human asked for the green bar in the remark, but did not phrase it as a change of D-39, so it is for the human to accept at the merge.
- **D-279 — What colour does a frame or a bar that sets a text apart take?** (changed, `the cycle's`). EN: a line that marks the chosen one stays in `selected`, save the bar of the picked row of the catalog of maps, in `positive`. PL: linia znacząca wybrane zostaje w `selected`, poza belką wybranego wiersza katalogu map, która stoi w `positive`. This records the precedence the remark gives ("wybrany wiersz wypełniony zielonym paskiem").
- **D-133 — Where does the player see a map run's streak and a map's solving condition?** (changed, `the cycle's`). EN: the card shows the condition's sentence under its heading, without the map's name. PL: karta pokazuje zdanie warunku pod nagłówkiem, bez nazwy mapy.
- **D-438** (third paragraph reworded, `row 6`, meaning unchanged). EN: in one measurement of the balance instrument in its mode `progression` a map can be solved where its best program solves one seed of 1–500, and Las — matecznik passes it where no program solves one. PL: w jednym pomiarze przyrządu balansu w trybie `progression` mapę da się rozwiązać, gdy jej najlepszy program rozwiązuje choć jedno ziarno z 1–500, a Las — matecznik przechodzi go, gdy żaden program nie rozwiązuje ani jednego.
- **Environment fact `game-icons-magnifying-glass-title`** (new, `the cycle's`). EN: the page of Lorc's icon `magnifying-glass` on game-icons.net names it "Magnifying glass icon". PL: strona ikony `magnifying-glass` autorstwa Lorca na game-icons.net nazywa ją "Magnifying glass icon". Source: the page, read 2026-11-25, and the archived copy of 2026-09-06, in which I found the heading.
- **Invariant `icon-credits`** (*Rests on* only, `the cycle's`): it adds that fact.
- The styleguide (`guidelines/styleguide-browser-view.md`): the Roles row of `positive`; the rule "A line at a text takes the colour of that text"; the section „The screen Mapy” (its decisions, *Good*, *Bad*, the search with the glass, the views as framed buttons, the fold, the picked row, the „ze” rule, the card, „Kto idzie”). No new role or token value.
- D-325 unchanged: none of its sentences changed meaning. D-134, D-276 and D-27 were checked and are unchanged.

## Choices (way rejected, cost if wrong)

- The top button moves the focus to „Kto idzie”. Rejected: a picker of a character, as in the old game (it would repeat what „Kto idzie” shows); a real „Wejdź” for one character (a second send, focus and disabled logic). Cost: if the human wants a picker, it is a new window and a decision.
- The sentence under the heading is the condition from the data without the name. Rejected: a hand-written short goal per map in the data (a new field of every map, against D-24 and D-18); the sentence with the name (long, repeats the title). Cost: it stays longer than the old one.
- „Żąda” rows „passa” and „do pokonania”, the streak in hours as in the row. Rejected: minutes (the sentence above already gives them). Cost: the streak stands twice in two units.
- The table values stand just after a column of labels, not at the right edge: at 1600 px a column is about 480 px wide, and values at its edge would stand far from their labels.
- The green bar is `positive` with the decision changes above. Rejected: `selected` (a light grey bar, what the human found less visible). Cost if the human prefers the role meanings as they were: three lines of CSS and the D-39/D-279/D-331 sentences go back.
- The glass is credited as an interface icon from `credits.ts`. Rejected: a new module (a new file for the part map). Cost: `credits.ts` holds one constant the catalog reads.
- Tests changed for the requirement, not to pass. `map-catalog.test.mjs` "every row … is a link" and the old fold cases expected a pick and a search to unfold and disable the fold, which remark 3 changes. The card cases of `maps-screen.test.mjs`, `map-lines.test.mjs` and `maps-record.test.mjs` follow the new card the remark asks for. `maps-record` now asserts the record in `text` and the attack detail in `text-secondary`, where before both were `text`.
- No changed invariant test weakens a check; `test_icon_credits.py` gained one title and one author.

## Reaches beyond the dispatch

- D-39, D-40, D-133, D-276, D-279 read whole or by binding paragraph: the green bar, the views as buttons and the sentence under the heading collide with them.
- `src/browser/view/controls/react-text-field.tsx`, `react-button.tsx`, `credit-lines.ts`, `credits-section.tsx`, `src/browser/styles.css` (the field, the icon mask, the selected button, `.tabs`), `src/browser/tokens.css` (the values of `positive`, `selected`, `highlight`, the font sizes): needed for the glass, the views and the fill.
- The old game's `MapPage.tsx` and `MapsShell.tsx` (the card) and `MapCatalog.tsx` (the picked row's classes, the glass); game-icons.net and the archive for the title fact; `raw.githubusercontent.com` for the icon at the source commit.
- `tests/sim/reference-programs.mjs` and `understanding-fixture.mjs`: to compose the lair state for the screenshots.

## Working copies

- `.runs/corrector/` under the worktree root held the logs, the composed states and their script, the icon download, the screenshots as taken, the contact sheets and the clone of the screenshots repository. It was removed with `rm -rf` on its full path.
- `.playwright-cli/` held the scripts of the session; removed the same way.
- The Playwright session was closed. `npm run local:stop` answered "Local starts stopped: 1"; its database under `.runs/local-start/` stays by the skill's rule.
- Nothing kept in `reports/` but this report.

## Unread material

- `guidelines/testing.md`: read lines 1–203 and 268–437; lines 204–267 (the rest of the trust-boundaries table and "AI in tests") not read.
- `guidelines/styleguide-browser-view.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`, `.the-way/task-cycle/change/SKILL.md`, `ui_check.md`, `foundation_step.md`: read whole.
- `plan.md`: read whole. `task.md`: read whole.
- Reports named: `executor-10-report.md`, `executor-10b-report.md`, `executor-9-report.md`, `fix-whole-report.md`, `review-whole-report.md`, `review-whole-fix-report.md`: read whole.
- `.the-way/product-guidelines/styleguide/SKILL.md`: read lines 1–80 (it leads a styleguide task's refinement; the cycle's writing of the file follows `product-guidelines/styleguide/template.md`, which I did not read). I edited the section in its existing form.
- The decision index of `elements/common/decision_index.py` (step 1 of `way_of_working.md`) was not run. I selected the entries by the handoff's names and by searches of `foundations/decisions.md` for the words the change adds („otwarta”, fold/unfold, picked row, „under „Żąda””, "map check", „ze”), and read each entry found whole.
- `.the-way/elements/decisions/examples.md` and the environment-facts template outside "Source": not read.
- `walkthrough.md`: not read, since a correction reports no walk; the browser check above stands for the screens.

## Searches not found or unclear

- A font-size token for a title bigger than 16 px: none in `src/browser/tokens.css` (the old Loop's title is 22 px).
- The old Loop's green as a role meaning "picked": none. `positive` has the same value but another meaning, hence the D-39/D-279 change.
- A decision saying the catalog's views are tabs: none (only the styleguide said so).
- A decision describing the „ze” rule: none.
- The CDX index was not queried for the glass's page. I used the archive's availability lookup, found a capture of 2026-09-06, opened it and found the heading word for word; `draft.md` asks for the CDX index.
