FAIL 523046f6b27b4ff67aa4be2568e7104a0255359f

# Review of the whole change after correction 1, task `katalog-map`

- Worktree `the task's worktree`, branch `task/katalog-map`; `git rev-parse HEAD` = `523046f6b27b4ff67aa4be2568e7104a0255359f` (the head given). `.the-way` at `301e4eae…`, the commit the gitlink pins.
- Range: base `97936c245cecfc11778fcf3d10feb075436d17fc` to head `523046f6`; the correction is `720d1d2a..523046f6` (`c52e3f78`, `38e60b50`, `c833dd17`, `e7072b97`, `16aadaf1`, `1054b372`, `523046f6`). Diffs and logs computed by me.
- Method: `.the-way/task-cycle/review/SKILL.md`, `whole_change.md` and `fix.md` (for the correction), each read whole. This review ran on the model `claude-opus-5-5` (remark 2 of the human).
- Counts: 2 blocking (both Important, both from correction 1, neither from a slice of the plan), 5 Minor (all within the task), 0 out of scope.

## Blocking findings

### B1. The card's title stays at 15 px: the big title of remark 1 is not there, and D-327 says the card departs from the predecessor's in five things only — Important

- Place: `src/browser/maps-screen.css` (`.maps-card-name`, `font-size: var(--font-size-map-title)`, 15 px in `src/browser/tokens.css:58`); `foundations/decisions.md`, D-327, second paragraph, „It departs from the card of the predecessor game in five things only: …”; `guidelines/styleguide-browser-view.md:917-918` („nazwa mapy w `text-strong`, w rozmiarze tytułu mapy”). From correction 1, commits `16aadaf1` (code) and `1054b372`/`523046f6` (D-327); from no slice of the plan.
- What is wrong: remark 1 lists, among the places to fix, „karta mapy (duży tytuł ze znacznikiem stanu, …)”. The tag is there; the size is not. The predecessor's card title is `text-[22px]` (`src/components/probe/MapPage.tsx:143` of `the old game's repository`, branch `feat/archetypes`, read with `git show`), this card's is 15 px. D-327, which this correction rewrote, says the card follows the predecessor's card and departs from it „in five things only”, and the five it lists do not include the title. So the code does something the entry it writes does not allow, and the human's point stays unmet.
- Why it matters: what a player sees — the name of the map on the card is no larger than before, which is the first item the human named where the old Loop reads better; the corrector's own pair 2 says „The old Loop still does better: its title is bigger”. A later reader of D-327 is told the card matches the predecessor's except five listed things.
- Rule or choice, in plain words: the corrector was right not to add a size by itself. `src/browser/AGENTS.md:9` and the styleguide rule "Every value with its source" let a new token value in only with a source settled with the human, and the token file has nothing above 16 px. So this is **a choice for the human**, and the cycle cannot close the finding without the human's answer. The question I recommend the orchestrator puts to the human now, before the request goes back:
  - a) a token for the title of the map card (for example `--font-size-card-title`), its value read from the old Loop's rendered card — 22 px in its code — under the source the styleguide already settles for "a value taken from loop" (the running game at `https://kantarion.bieda.it/`, read from the rendered page, with the element and the date of reading); D-327 and the styleguide's card item then name that size;
  - b) the human accepts 15 px; D-327 then names the smaller title as a departure from the predecessor's card, and nothing in the code changes.
  Without either, D-327's „five things only” stays untrue of the code.
- Evidence: `tokens.css:57-59` (the three heading sizes 14, 15, 16 px), `maps-screen.css` `.maps-card-name`, the old `MapPage.tsx:143`, the correction report's "Cannot be done as written: the big title" and its pair 2, the return step's question 1.
- Contradiction: yes — D-327 („It departs from the card of the predecessor game in five things only”), an entry this change writes.

### B2. „Jedno krótkie zdanie żądania” of remark 1 is not made, and the reason given for leaving it does not hold — Important

- Place: `src/browser/view/map-lines.ts:26-28` (`solvingSentence` returns the map's `solvingText`); `src/browser/view/maps-screen.tsx:320` (`maps-card-goal`); D-327 („the sentence under the heading is the sentence of the solving condition from the data” among the departures) and D-133. From correction 1, commits `16aadaf1`, `1054b372`; from no slice.
- What is wrong: remark 1 asks for „jedno krótkie zdanie żądania” as one of the places the agent itself named as better in the old Loop. The card now shows the solving text of the data without the map's name, for Skraj lasu and Las „480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”; the predecessor shows a sentence written for the card, „Dwanaście godzin bez jednej poprawki programu.” (`map.goal`, `MapPage.tsx:152`). The corrector's own pair 2 still lists it under "The old Loop still does better: its short sentence is written by hand … while ours is … longer". One sentence it is; short, against the old one, it is not, and the remark asked to fix exactly the places where the agent found the old Loop better.
- The reason in the correction report (Choices: "a hand-written short goal per map in the data (a new field of every map, against D-24 and D-18)") does not hold: D-18 puts a map's content in its data files, so a text field of a map's data is what D-18 asks for, not against it; D-24 lists the grid, entrance, step, attackers and resources and does not list `solvingText` or `completionText`, which already stand in each map's data. What doing it takes is within what the remark authorizes („Decyzję, którą karta dziś realizuje, zmień razem z kodem”): a short sentence for each of the five maps in `src/browser/sim/data/maps.ts`, written by hand, the sentence of D-133 about the card and the departure list of D-327 changed, and the cases of `tests/view/map-lines.test.mjs` and `tests/view/maps-screen.test.mjs` that hold the sentence. It also removes the double streak that D-327's *Rationale* now accepts („the streak stands twice, in the sentence in minutes and in „Żąda” in hours”).
- Why it matters: the human's acceptance criterion is the pair of screenshots; this is one of the items of the pair the human named, and the request goes back with it in the same state the agent itself calls worse. Whether a hand-written sentence is wanted is the human's to confirm, but the remark already says so.
- Evidence: `map-lines.ts:26-28`, `tests/view/map-lines.test.mjs:34-41`, the old `MapPage.tsx:152`, the correction report's pair 2 and Choices, D-18 and D-24 read whole.
- Contradiction: no (a point of the remark left undone).

## Minor findings (all within the task)

1. `src/browser/view/maps-screen.tsx:126` — `CHOOSE_TEXT` is exported, but nothing imports it: the tests write „Wejdź — wybierz postać” as a literal. An export with no user; keep it module-private or have the tests read it.
2. `src/browser/view/maps-screen.tsx:237` — `CardTable` gives each icon of a row `key={icon}`. A map whose attackers hold two entries of one creature would give two siblings the same key (React warns and may reuse the wrong element). No map has that today; `key={index}` or the attacker's place would hold it.
3. `src/browser/view/maps-screen.tsx` — the file grows across the change from 626 to 693 code lines (threshold 800), `MapsView` from 153 to 167 and `MapCard` from 105 to 115 (threshold 200); the correction alone adds 66 lines to the file. Nothing is over a threshold (the size test passes); the card's components (`CardIcon`, `CardPart`, `CardTable`, `CardEntry`, `MapCard`) are a natural module of their own before the next growth. Numbers from the probe `reports/review-whole-3-size-probe.mjs` (command below).
4. `src/browser/view/map-lines.ts:100-101` (doc of `demandRows`: „in whole hours as in the row of the catalog”) and `tests/view/map-lines.test.mjs:104` (test name „gives the streak in whole hours”) — words that stopped being true when the return step corrected D-327 to „in hours, or in minutes where it is not a whole number of hours”; the case itself holds „90 min”.
5. `tests/view/maps-screen.test.mjs:464` and `:470` expect the heading's text to be „Lasrozwiązana · odsłania ją Skraj lasu” and „Las — głębiejotwarta · …”: the name and the tag stand with no space between them in the markup (the gap is CSS). The assertion pins that missing separator, a detail no requirement sets (testing guidelines, "Behaviour, not implementation"); comparing `.maps-card-name` and `.maps-card-state` apart, as the same test does above, says the same without it.

## Each remark of the human, as made or not

- **1. Card and three places of the catalog** — partly made.
  - Magnifying glass in the field: made (`map-catalog.tsx`, `maps-screen.css` `.maps-catalog-search-icon`, credited, test cases in `map-catalog.test.mjs` and `icons.test.mjs`).
  - Views that look like buttons at once: made (shared buttons selected in their group, framed; no `kind="tab"`, no `tabs` class; D-276 and the styleguide agree).
  - Picked row filled with a green bar: made (`highlight` fill, `text-strong`, bar in `positive`; kept under `hover: none`).
  - Card: tag of the state beside the name made; button at the top made; tables „Żąda” and „Teren” made; two columns, one under the other on a phone, made. **Big title not made (B1). Short sentence not made (B2).**
  - D-327 and the other decisions changed with the code: made, but D-327's departure list misses the title (B1).
  - New pairs of screenshots: the correction reports them pushed (`mariusznazar/screenshots`, commit `b1c70d86…`); I did not open them.
- **2. Review on a named strong model**: this review, on `claude-opus-5-5`.
- **3. Read in full**: see *Unread material*.
- **4.** let through by the human; nothing to judge.
- **5a „z”/„ze”**: made. `withPreposition` follows the first spoken word; the 33 rows of `counted-name.test.mjs` agree with the styleguide's rule (`guidelines/styleguide-browser-view.md:907-909`).
- **5b the fold**: made. The fold row is never disabled; a picked solved map under a folded row stands above it once and in its place once unfolded; the folding with and without a search are kept apart and both end with the screen (D-325 still true). Held by `catalog-lines.test.mjs` and `map-catalog.test.mjs`.
- **5c**: let through by the human.
- **5d D-438**: made; the third paragraph names the measurement of the mode `progression`, and `tests/balance/progression.test.mjs:240` quotes it.
- **6–9**: accepted by the human; no change asked.

## The three departures the corrector reports, in plain words

- **The title at 15 px** — the rule on tokens keeps the cycle from choosing a size; leaving it was right, but it leaves the human's point undone and D-327 untrue. A choice for the human, and blocking until it is made (B1).
- **The green bar by the role `positive`, with D-39 widened and an exception in D-279** — breaks no rule: the styleguide rule "Each role in its meaning" asks a changed meaning to come with a changed decision, and D-39, D-279, D-331 and the Roles row of the styleguide were changed together; `positive` keeps 4.5:1 on `highlight`, so no new contrast pair arises; D-40 and D-276 refuse green for a chosen button, tab or menu item, which the catalog's views still do not use. What is new is a meaning of `positive` („the card that is open now”) that the human asked for in substance („wybrany wiersz wypełniony zielonym paskiem”) but has not seen worded; a choice for the human to confirm at the merge. Not a finding.
- **„Wejdź — wybierz postać” moving the focus to „Kto idzie”** — breaks no rule: it is the plain shared button (D-274 keeps the main look for „Wejdź” and form buttons only), the heading takes `tabIndex={-1}` and stays out of the keyboard's order, the focus lands on what stands in place of a picker, and D-327 records it as a departure. Whether a picker is wanted instead is a choice for the human. Not a finding.

## Declined to judge

- The acceptance criterion (the human's judgement on the pair of screenshots) — the handoff gives it to the human.
- The values of „Teren” standing after their labels rather than at the right edge of the column, as in the old card — a look choice with a stated reason, for the human on the pair; no rule or decision sets it.
- Firefox and Edge by hand (D-396) — the corrector did not run them and says so; a manual session of its own, not this review's.
- The sentence of the skill `loop2-balance` on the 20 % reading — remark 5c lets it through to task 4.
- The Minor findings of the earlier whole-change review that the request description lists — not repeated; the correction does not touch them (D-136's *Rationale* among them).
- That neither the corrector nor the return step ran `decision_index.py` — a step of their methods, not a property of the change; this review wrote its own index.

## Against the task and the foundation (the whole change)

- The earlier whole-change review and its fix review passed every *To do* item and settlement row at `720d1d2a`; the correction changes only To do 5 (catalog, card), To do 4's presentation (the record's „z”/„ze”, the record in „Czyha”), To do 7's D-438 wording and D-27/the icons. Each of those I compared again: To do 4 — the record stands in the row and in „Czyha” in `text`, before the first judging nowhere (`maps-record.test.mjs`, 10 cases pass); To do 5 — catalog behaviour as above, the card's parts as D-325 lists them; To do 7 — D-438's paragraphs two and three as the task quotes paragraph two and Settlement row 6 reads.
- Foundation entries the correction writes, compared with the code: D-27 (glass credited after the data's icons, test clause true), D-39 and D-279 (true of `.maps-list-item[aria-current="page"]`), D-133 (sentence under the heading, no name), D-325 (unchanged, still true with `foldedInSearch`), D-327 (true but for the title, B1), D-331 (true, held by tests), D-438 (true), invariant `icon-credits` *Rests on* and fact `game-icons-magnifying-glass-title` (consistent; the fact's page was not fetched again by me, the return step fetched it).
- Changed invariant test: `tests/invariants/test_icon_credits.py` gains the title and author of `magnifying-glass.svg`; it widens the check, weakens nothing.
- Trust boundary `assets/icons/**`: `magnifying-glass.svg` is one `<path>` with `fill="#f4f4f5"`, no script, no `href`, no `url(`, no style, no event attribute (grep: 0 hits); its path is byte for byte the path of the old game's `assets/game-icons/lorc/magnifying-glass.svg` (md5 of the `d` attribute equal), prepared as `wolf-head.svg` and `bear-head.svg` are (background path removed, light fill); its credit reads Lorc, the page, CC BY 3.0 and the changes, as the others. `icon-file-content` passes. `judging-cache.ts` is not touched by the correction.
- Styleguide (read whole) against the correction: the section „The screen Mapy”, the Roles row of `positive`, "A line at a text takes the colour of that text", "Main button, secondary action and tab", "Two layouts and one threshold" (the card's one-column block under `@media (width < 1280px)` with its D-396 comment; the `hover: none` block sparing the picked row), "No value in place of a design token" (every `var(--…)` the new CSS reads exists in `tokens.css`; `1lh` is no length D-43 counts), "Every background with its text" (the picked row's `highlight` comes with `text-strong`). No departure found beyond B1.
- Reserved choices: none taken (no library, store or framework added).
- Code passing a test without meeting the requirement: none found in the correction's code.
- Screenshots among the commits: none (the only binary files of the range are the bear's four sprites).

## The structure of the code the change leaves

- `python -B .the-way/task-cycle/change_file_sizes.py 97936c24… 523046f6` → exit 0; 59 files, +4580 lines; the largest growth in product code: `catalog-lines.ts` +467 (new), `map-catalog.tsx` +298 (new), `maps-screen.css` +248, `judging-cache.ts` +179, `map-lines.ts` +87, `maps-screen.tsx` +86.
- The size invariant on the head: `npm test -- tests/quality/test_function_and_file_size.py` → exit 0, 2 tests OK, no function or file over a threshold, and the test is not marked as an expected failure. Since the head reports nothing over a threshold, nothing can have been pushed over one; the run on a worktree of the base was not made for that reason (it would have needed a second `npm ci`).
- Growth under the thresholds: Minor 3. Code with no user: Minor 1 (`CHOOSE_TEXT` export); `streakText` moved from `catalog-lines.ts` to `map-lines.ts` and is read by both; `forced` gone with its users. Names that stopped being true: Minor 4.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | `523046f6b27b…`, the head given |
| `git -C .the-way rev-parse HEAD` / `git ls-files --stage -- .the-way` | 0 | both `301e4eae…` |
| `python -B .the-way/elements/common/decision_index.py --output … --sections .` | 0 | 30 sections |
| `python -B .the-way/elements/common/decision_index.py --output … --section <7 sections> --part <6 parts> --decision <44 ids> .` | 0 | 100 listed in full, 308 by heading |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 120 info` — no warning |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `python -B .the-way/task-cycle/change_file_sizes.py 97936c24… 523046f6` | 0 | table above |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 | 2 OK |
| `node reports/review-whole-3-size-probe.mjs src/browser/view/maps-screen.tsx src/browser/view/map-catalog.tsx src/browser/view/catalog-lines.ts src/browser/view/map-lines.ts src/browser/view/judging-cache.ts src/browser/view/credits.ts` (and on copies of `maps-screen.tsx` at `720d1d2a` and at the base) | 0 | functions over 100 and files over 400 code lines: the numbers of Minor 3; nothing else in those files |
| `npm run --silent typecheck` | 0 | — |
| `npx eslint --max-warnings 0` on the 15 TS/TSX/MJS files the correction changed | 0 | — |
| `npx prettier --check` on the same files and `src/browser/maps-screen.css` | 0 | all formatted |
| `npm test -- tests/view/counted-name.test.mjs` | 0 | 3 pass |
| `npm test -- tests/view/catalog-lines.test.mjs` | 0 | 14 pass |
| `npm test -- tests/view/map-catalog.test.mjs` | 0 | 13 pass |
| `npm test -- tests/view/map-lines.test.mjs` | 0 | 12 pass |
| `npm test -- tests/view/maps-record.test.mjs` | 0 | 10 pass |
| `npm test -- tests/view/icons.test.mjs` | 0 | 45 pass |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 | 51 pass |
| `npm test -- tests/balance/progression.test.mjs` | 0 | 14 pass |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 | 3 OK |
| `npm test -- tests/invariants/test_icon_file_content.py` | 0 | 2 OK |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 OK |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 | 3 OK |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | 3 OK |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | 5 OK |
| `grep -ciE "script\|href\|on[a-z]+=\|url\(\|<image\|foreignObject\|<style" assets/icons/magnifying-glass.svg`; md5 of the path against the old game's file | 0 | 0 hits; equal |
| Manual: the old card's heading and sentence in `MapPage.tsx` (`git -C the old game's repository show feat/archetypes:…`) | — | title `text-[22px]`, goal sentence `map.goal` (B1, B2) |

Not run: the product's full gate (the handoff; the orchestrator runs it and CI runs on the request); the size test on a worktree of the base (reason above); a browser check of the screens (the screenshots and the corrector's measurements stand for it; I opened no screenshot); a fetch of the glass's page on game-icons.net (the return step fetched it).

## Reaches beyond the dispatch

- `the old game's repository`, branch `feat/archetypes`, `src/components/probe/MapPage.tsx` (lines by grep) and `assets/game-icons/lorc/magnifying-glass.svg`, read with `git show`: to check the old card's title and sentence (B1, B2) and the glass's source.
- `src/browser/tokens.css` (font sizes, `--highlight`, `--positive`, `--bar-width`), `src/browser/styles.css` (`.icon-mask`, `.input-field`), `src/browser/view/controls/react-text-field.tsx` (label): to judge the glass's placement and the sizes.
- `tests/quality/eslint-size-rules.mjs` (top 80 lines): to write the size probe.
- The earlier whole-change review report, by its headings and the lines that name its findings: to avoid repeating them.

## Working copies

- `.runs/review-whole-3/` held the decision index and its section list, the extract of the 47 decisions read whole, the diffs of the correction, the logs of the checks, the size probe and two copies of `maps-screen.tsx` (at `720d1d2a` and at the base). Removed with `rm -rf` on that full path before returning. No worktree, no clone.
- Kept beside this report: `reports/review-whole-3-size-probe.mjs`, the probe behind Minor 3.
- `dist/`, rebuilt by `npm test`, is the product's own output and stays.

## Unread material

- Decisions: **47 of the index read whole** (42 of the 100 listed in full, 5 opened from the headings): D-04, D-18, D-24, D-27, D-39, D-40, D-88, D-128, D-133, D-134, D-136, D-140, D-144, D-147, D-148, D-149, D-187, D-209, D-239, D-243, D-271, D-274, D-276, D-279, D-287, D-323, D-325, D-327, D-331, D-332, D-333, D-334, D-388, D-396, D-407, D-416, D-418, D-421, D-425, D-428, D-429, D-438, D-439, D-440, D-441, D-448, D-449 — each from its heading to the next, with *Rationale*, *Rejected*, *Relations* and *Verification*. Among them, as the human asked: D-439, D-440, D-441 and D-271, and every decision the change edits (D-04, D-18, D-24, D-27, D-39, D-133, D-134, D-147, D-149, D-271, D-279, D-325, D-327, D-331, D-334, D-429, D-438, D-440, D-441, D-448, D-449) — the correction itself edits D-27, D-39, D-133, D-279, D-327, D-331 and D-438. The other 58 decisions listed in full were read in the index (question, binding sentences, *Scope*); the 303 headings left were run through, and none but D-88, D-287, D-407, D-421 and D-425 pointed to a bearing.
- Guidelines read whole: `guidelines/styleguide-browser-view.md` (all 1591 lines), `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/coding-content-data.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-balance-instrument.md`, `src/browser/AGENTS.md`. Not read: the other `guidelines/coding-*.md` files, whose kinds the change does not touch.
- Task, plan, remarks, correction report, return-step report: read whole. Part map: read whole. Invariants: `icon-credits` read whole; the others the change reaches (`icon-file-content`, `content-identifiers`, `judging-cache-reading`, `design-token-contrast`, `browser-view-token-values`, `browser-view-focus-outline`, `function-and-file-size`, `map-run-tiles`, `sprite-credits` and the rest of the parts' invariants) not opened — checked through their tests where the correction reaches them. Environment fact `game-icons-magnifying-glass-title`: read whole (in the diff). Glossary: not read; the correction uses no term the glossary defines anew.
- Not read: the reports of the slice executors and slice reviews, the foundation report and the walkthrough — the earlier whole-change review read them, and the correction changes none of the slices' code outside the catalog and card; the screenshots of the request; `cycle.md` and the other files of the cycle's directory the handoff does not name. Of the earlier whole-change review and its fix review, only their headings and the lines that name their findings.
- Code read whole: the correction's diff of every file; `catalog-lines.ts` at its query lines (grep); `maps-screen.tsx`, `map-lines.ts`, `map-catalog.tsx` through the diff, not whole.

## Searches not found or unclear

- A token above 16 px for a title: none in `src/browser/tokens.css` (as the corrector found).
- Whether the old Loop's card title of 22 px, read from its code, counts as "read from the rendered page" for the styleguide's settled source of a loop value: unclear — hence the question in B1.
- Whether „ze” before „sześć-” and „z” before „siedem-” is the usual Polish beyond this repository: unsettled outside the styleguide, which settles it; the code agrees with the styleguide.
- A decision that requires the catalog's views to be tabs: none (only the styleguide said so before the correction).
- The live page of the glass on game-icons.net: not fetched by me.
