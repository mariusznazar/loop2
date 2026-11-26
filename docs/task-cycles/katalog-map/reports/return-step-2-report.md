done with concerns

# Report - the return step of correction 1, task `katalog-map`

- Worktree `the task's worktree`, branch `task/katalog-map`, head at the start `1054b372` (confirmed). Range compared: `720d1d2a465bbd6b3c731041d4dcae471fab5766..1054b372`. Nothing pushed. The product's full gate was not run (handoff).
- Commit (one, by path): `523046f6` - `foundations/decisions.md`, `tests/view/catalog-lines.test.mjs`, `tests/view/map-catalog.test.mjs` (one `decision:` quotation each). No product code changed.
- Method read whole: `task-cycle/change/SKILL.md`, `task-cycle/skill/return_step.md`, `foundation_step.md`; the `SKILL.md` of record-decision with `read.md`, `decide_entry.md`, `template.md`; `elements/common/way_of_working.md`. The correction's report, remarks and the first return step's report were read whole.

## Return step items

### Foundation compared with the code (this correction only)

| Entry | Compared with | Result |
|---|---|---|
| D-327 | `maps-screen.tsx` (`MapCard`, `CHOOSE_TEXT`, focus to the heading), `map-lines.ts` (`cardHeading`, `demandRows`, `terrainRows`, `resourceLines`, `attackerLines`, `capLines`, `streakText`), `maps-screen.css`, the tests | all binding sentences match except one: it said „Żąda” holds the streak "in whole hours", but `streakText` gives minutes where the streak is no whole number of hours (the test holds "90 min"). **Corrected** (binding sentence and `tests:` clause). The "five departures" sentence is true of the code except the title size, see Question 1. The pair (colours, phone columns) matches the stylesheet and is held by no test: stays. `tests:` clause matches the tests (tag, button, sentence, columns, tables, record). |
| D-331 | `catalog-lines.ts` (`dokadRegion`: `expanded`, `pinned`), `map-catalog.tsx` (`toggle`, `foldedInSearch`), stylesheet (`[aria-current]`: `highlight` fill, `positive` bar, `hover: none` rule), tests | structure, fill and bar match. The new sentence "The picked row stays seen" was false where a search typed does not match the picked solved map: the lines show only the maps the search finds, so that row is not shown. **Corrected** to "The picked row is not hidden by a fold: …" (binding sentence, *Rationale*, the two `decision:` quotations of the tests). The pair (fill and bar roles) is held by no test: stays. |
| D-39 | stylesheet `.maps-list-item[aria-current="page"] { border-left-color: var(--positive) }`, `tokens.css` | the new paragraph, the complying example and the *Rationale* sentence are true of the code. Not changed. See "The extension of `positive`" below. |
| D-279 | the same stylesheet rule | the exception sentence is true of the code. **Added**: a sentence to *Rationale* naming the reason for the exception (D-279 had none, and its pair had no example of it), and a complying and a violating example. |
| D-40 | – | read whole. "A chosen button or tab is shown by `selected`, not by the green of `positive`" and *Rejected* "the line of a chosen tab in `positive`" still hold: they speak of a button or a tab, and the catalog's three views are buttons selected in their group (framed, `selected` frame, `text-strong`). Its meaning of `selected` ("the one chosen in its group") is now narrowed by D-279's exception only. Not changed. |
| D-276, D-277, D-44 | `map-catalog.tsx` (views are `ReactButton selected`, no `kind="tab"`, no class `tabs`) | none says the catalog's views are tabs (the list of tabs in D-276 and the styleguide never named them); `positive` for a chosen tab or the menu item is still refused and still not done. None. |
| D-133 | `solvingSentence` (the solving text of the data alone), data, tests | matches; the test lines quote the unchanged first sentence. None. |
| D-134 | `cardHeading` (tag „rozwiązana” in `positive`, „otwarta” in `text-secondary`), the tests | matches ("none at an unsolved map" is about „rozwiązana”). None. |
| D-325 | `map-catalog.tsx`, `catalog-lines.ts` | matches. The sentence "the regions unfolded … end with the screen" is true also of the new state `foldedInSearch` (same component state); not widened, since the quotation of a test holds the whole sentence and nothing in it is false. None. |
| D-27 | `credits.ts` (`ICON_CREDITS["magnifying-glass"]`, `INTERFACE_ICONS`), `credit-lines.ts`, `icons.test.mjs` (new cases cite D-27) | the sentences hold (the glass is credited in the same section with title, author, page, licence, changes). The `tests:` clause named only icons the data names, while two new tests hold the glass: **corrected** (clause). |
| invariant `icon-credits`, fact `game-icons-magnifying-glass-title` | `test_icon_credits.py` (title and author added), the page of the icon | the fact's quotation "Magnifying glass icon" and the author Lorc were checked against the live page https://game-icons.net/1x1/lorc/magnifying-glass.html (fetched in this step: heading "Magnifying glass icon", Lorc, CC BY 3.0); *Rests on* names the fact; sentence unchanged. None. |
| D-329, D-274, D-396, D-328, D-333, D-149, D-282, D-440 | read at the lines that name the card, the button, the phone layout, the numbers of the card | D-274 (any other action outside a form keeps the plain button): „Wejdź — wybierz postać” is the plain `ReactButton`. D-329 names no heading and no focus. D-333's „bez ognia 33 min” is now a label and a value in two cells, the numbers are the same. D-396: the card's columns stand one under the other under 1280 px. D-440's fourth paragraph matches the record's place. None. |
| D-438 | `tests/balance/progression.test.mjs:240` | the reworded third paragraph and its re-quoted `decision:` line agree. None. |
| „z” / „ze” | `withPreposition`, the styleguide (lines 907-909, 941) | no decision or invariant states the rule; the styleguide's sentence (zero, „sze”, „st”; „z 7”, „z 70”) matches the code. None. |
| the styleguide: Roles row of `positive`, rule "A line at a text takes the colour of that text", section „The screen Mapy” | the stylesheet, `maps-screen.tsx`, `map-catalog.tsx`, `catalog-lines.ts`, `counted-name.ts` | every sentence of the section compared: glass inside the field (`position`, `pointer-events: none`, padding), views as framed buttons, fold row, picked row, the phone layout fill, heading sizes (name at `--font-size-map-title`, tag at `--font-size-label`), table and entry layout, record in `text`, the „ze” rule. All true of the code. No sentence of the styleguide or of a decision says that green or `positive` is never used for a picked mark (searched: `positive` with chosen/picked/selected/bar/green/never, in decisions, styleguide, invariants). None. |
| part map | `foundations/part_map.md` | `assets/icons/**` claims the new file, no file moved; the sentence of `browser-view` and the External context row stand. None. |
| glossary, invariants | `foundations/glossary.md` headings, `foundations/invariants.md` search for catalog/Mapy/picked/tab/selected | no term used against its entry; no invariant speaks of the card or the catalog. None. |

### The extension of `positive` (for the human at the merge, not decided here)

The correction extended D-39 (a new paragraph: `positive` is also the bar of the picked row of the catalog of maps, "whose card is the one open now") and wrote the exception into D-279. I compared both with the code: true (`border-left-color: var(--positive)` on `.maps-list-item[aria-current="page"]`, the fill `highlight`, the text `text-strong`). The bar contrasts with `highlight` at least as much as `positive` as text does (4.5:1, `design-token-contrast`). What the human accepts at the merge: `positive` now also marks a pick, for this one row, while D-40's *Rationale* and D-276's *Rejected* explain a green mark of a pick as wrong for buttons, tabs and the menu; the row's "active now" reading is D-39's new reason. The cost if the human prefers the earlier meaning: three lines of CSS, and the sentences of D-39, D-279, D-331 and the styleguide's Roles row go back (the correction's report says the same). Nothing else refuses green for a picked mark.

### Decisions written or changed (by this return step)

1. **D-327** - "„Żąda” holds the streak in hours, or in minutes where it is not a whole number of hours" (binding sentence and the `tests:` clause). `the cycle's` (already so marked by the correction).
2. **D-331** - "The picked row is not hidden by a fold: …" in place of "stays seen" (binding sentence, *Rationale*). `the cycle's`. The two tests that hold it (`tests/view/catalog-lines.test.mjs:91`, `tests/view/map-catalog.test.mjs:425`) have the quotation re-made.
3. **D-27** - `tests:` clause names the magnifying glass credited in the same section; no binding sentence changed.
4. **D-279** - *Rationale* gains the reason of the exception; the pair gains a complying example (the bar of the picked row in `positive`) and a violating one (that bar in `selected`, a chosen button's frame in `positive`). `the cycle's`; the pair is added by this step, word for word:
   - complies: "the bar of the picked row of the catalog of maps in `positive`, as D-39 gives it"
   - violates: "the bar of the picked row of the catalog of maps in `selected`, or the frame of a chosen button in `positive`"

Sentence of meaning, English: the picked row's bar is the one mark of a chosen item that stands outside `selected`. Po polsku: belka wybranego wiersza katalogu jest jedynym znakiem wybranego, który stoi poza `selected`.

No pair part was left that a test now holds, checked for each decision the correction touched: D-327 (the tag, the button, the tables, the columns in the DOM are in `tests:`; the colours and the phone columns have no test), D-331 (the structure is in `tests:`; the fill and the bar have no test, the stylesheet tests of the file read the judging parts only), D-39 and D-279 (no test).

### Invariants, environment facts, glossary terms, part map, projected entries, rows of settlements

- Invariants: none written; `icon-credits` unchanged by me (its *Rests on* gains the fact: the correction's edit, checked).
- Environment facts: none written; `game-icons-magnifying-glass-title` (the correction's) verified against the page.
- Glossary terms: none.
- Part-map changes: none.
- Projected entries and rows of *Settlements to record*: none missed; the correction's own entries are the human's remarks, which the cycle's rule makes `the cycle's`.

## Commands and exit codes

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `python -B .the-way/elements/common/foundation_check.py` (before my edits) | 0 | `0 errors` |
| 2 | `python -B .the-way/elements/common/foundation_check.py` (after the edits, before the commit) | 0 | `0 errors` |
| 3 | `python -B .the-way/elements/common/foundation_check.py` (after the commit) | 0 | `0 errors` |
| 4 | `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 120 info` |
| 5 | `npm test -- tests/view/catalog-lines.test.mjs` | 0 | pass 14, fail 0 |
| 6 | `npm test -- tests/view/map-catalog.test.mjs` | 0 | pass 13, fail 0 |
| 7 | `npx prettier --check` on the two test files | 0 | passes |

(An `npm test` with two files refused, "Expected exactly one test file", exit 2: nothing ran; the two were run one by one.) `git -C .the-way rev-parse HEAD` = `git ls-files --stage -- .the-way` = `301e4eae1111310ccd80e466f62ea01838b9ff88`. Not run: the full gate (handoff).

## Questions (for the orchestrator, each with my recommendation)

1. **The title size of the card.** D-327 says the card departs from the predecessor's "in five things only", and the correction's report says the predecessor's title is 22 px while this card's is 15 px (`--font-size-map-title`; no token above 16 px). The remark asked for a big title, so the sixth departure is a worse one that the human has not accepted, and the sentence "five things only" is false by it. I wrote nothing: naming it in D-327 would record a smaller title as accepted. Recommendation: put it before the human at the merge as an open point (a title-size token needs a source the human settles); if the human accepts 15 px, add the sixth departure to D-327's sentence then.
2. **Search hides a picked solved map that does not match it.** Old behaviour, kept; D-331 now says only that a fold does not hide it. Recommendation: leave; if the human wants the picked row always shown, it is a new change of the lines.

## Searches not found or unclear

- `guidelines/coding-browser-module.md`, table "Files of this kind": it lists 87 of the 101 files of `src/browser/view/`, and does not list `catalog-lines.ts` and `map-catalog.tsx` (nor twelve others, from earlier tasks). It is no foundation entry and the check passes; the gap predates the correction. Not changed here; a note for the owner of the guidelines.
- Whether „z 7” / „z 70” is the usual Polish: unsettled outside the styleguide (the repository settles it there, the code agrees).
- A decision saying the catalog's views are tabs: none (as the correction found).
- `elements/common/decision_index.py` was not run; the selection was by the entries named in the handoff and by searches of the log for the words the correction adds (`otwarta`, fold, picked row, `positive`, „Żąda”, „Teren”, „Wejdź — wybierz postać”, `withPreposition`/„ze”, magnifying glass, tab) with each hit read at its lines.

## Unread material

- Read whole: the handoff, the correction's report and remarks, the first return step's report, the three method files, record-decision's `SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `way_of_working.md`, D-27, D-39, D-40, D-133, D-134, D-149, D-274, D-276, D-277, D-279, D-325, D-327, D-328, D-329, D-331, D-333, D-396 (to the end of its binding sentences and *Verification*; the tail of its *Rationale* by range), the invariant `icon-credits`, `maps-screen.tsx`, `map-lines.ts`, the diff of `maps-screen.css`, `map-catalog.tsx`, `catalog-lines.ts`, `credits.ts`, `credit-lines.ts`, `counted-name.ts`.
- Read by range: D-282 (first 45 lines), D-136 (to *Rejected*), D-440 (to its *Verification*), D-214 (top), the styleguide only at lines 14-60 (Roles), 300-316, 455-465, 655-725, and the diff of the correction in it (sections „The screen Mapy”, the line rule, Roles row), not the whole file; `guidelines/testing.md`, `coding.md`, `src/browser/AGENTS.md`: not read (no code written).
- `catalog-lines.ts` was read lines 395-480 whole and the diff elsewhere; `credit-lines.ts`, `counted-name.ts` through the diff; the tests through grep and the diffs, not whole (`map-lines.test.mjs`, `maps-screen.test.mjs` at the cited lines).
- D-18, D-24, D-134's neighbours, D-138-D-142, D-187, D-446 and the rest of the log: by search only, as above; the glossary by its headings and the entries on solved maps.
- `cycle.md` and files of `.runs/task-cycles/katalog-map/` not named in the handoff: not read.

## Working copies

`.runs/return-step-2/` under the worktree root held the diff of the foundation and the outputs of the two test runs; it was removed with `rm -rf` on its full path (`.runs/return-step-2`). No worktree, no clone. `dist/` made by `npm test` stays outside the rule and is ignored by git. Nothing is kept in `reports/` beside this report.
