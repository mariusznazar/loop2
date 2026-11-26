done

# Fix of the findings of the second review of the whole change, task `katalog-map`

Worktree `the task's worktree`, branch `task/katalog-map`, head at the start `523046f6` (confirmed). Method: `.the-way/task-cycle/change/SKILL.md` with `fix.md`. Findings: `reports/findings-whole-2.md`, read whole. Nothing pushed to the product repository; the full gate was not run.

## Commits (on 523046f6)

1. `69d98b19` refactor: the card of a map moved into `src/browser/view/map-card.tsx`, with no change of behaviour (Minor 3); `CHOOSE_TEXT` module-private (Minor 1); an icon of a table row keyed by its place (Minor 2). `maps-screen.tsx` −211/+3, `map-card.tsx` +222.
2. `bf3e933a` feat: the title at the predecessor's size (B1); the short sentence of each map (B2); the sentence of the condition closing „Żąda”. Files: `src/browser/tokens.css` (+1), `maps-screen.css`, `sim/data/maps.ts`, `map-lines.ts`, `map-card.tsx`, the tests `tests/sim/data.test.mjs`, `tests/view/map-lines.test.mjs`, `maps-screen.test.mjs` and `maps-record.test.mjs` (Minors 4 and 5 among them).
3. `8725b92d` docs: D-327, D-133 and the styleguide's card item.

## Each finding

**B1 — the title: fixed** (option (a), as directed).
- I read the old Loop in a real browser: Playwright CLI, `https://kantarion.bieda.it/`, 1600 × 1000, on 2026-11-26. I clicked „Mapy”, then „Skraj lasu”, which gave `/mapy/forestEdge`. The computed style of the card's title, `article h1`, word for word: `{"text":"Skraj lasu","tag":"H1","className":"text-[22px]","fontSize":"22px","fontWeight":"400","lineHeight":"33px","fontFamily":"Geist, \"Geist Fallback\"","color":"lab(96.1634 0.0993311 -0.364041)","tagText":"otwarta","tagFontSize":"11px","tagColor":"lab(35.1166 1.78212 -6.1173)","inner":1600}`.
- One token added, `src/browser/tokens.css`: `--font-size-map-card-title: 22px; /* Source: loop, https://kantarion.bieda.it/ read 2026-11-26 from the rendered page: the title of the card of a map, the element h1 „Skraj lasu” at /mapy/forestEdge, its computed font-size 22px */`.
- `.maps-card-name` takes that size. Its weight is the existing `--font-weight-body` (400, the old title's weight; it was `--font-weight-emphasis`, 500). No other token was added.
- Checked in the game: at `#/mapy/forestEdge` the name's computed `fontSize` is `22px` and `fontWeight` is `400`.
- D-327 now says the heading names the map „at the size and weight of the predecessor's card title”. Its examples name 22 px. The styleguide's card item names the token.
- I checked the departures again against the old `MapPage.tsx` and the running page. Its departure sentence now reads „…beyond its words and the roles of its parts, in six things only”:
  - the one total number of the attack line;
  - no „gasi”;
  - no line of the minutes without fire where the map does not cool, while the old page shows „nie stygnie” (found in this check);
  - „Żąda” as a table of a label and a value, closing with the sentence of the condition, while the old one has rows with icons and no labels;
  - the record in „Czyha”;
  - the button leading to „Kto idzie”.
  The sentence under the heading is no longer a departure. Words („siatka 4 × 4” without „kafelków”) and the roles of the parts (the tag in `text-secondary`, where the old one is a darker grey) are named as outside the count.

**B2 — the short sentence: fixed.**
- Each map's data has a new field `goalText`, written by hand in the manner of the old `map.goal`. The hours and the attacks come from each map's own `solving`:
  - Skraj lasu and Las (480 min): „Osiem godzin bez jednej zmiany programu.”
  - Las — głębiej (540 min, 2 attacks): „Dziewięć godzin bez zmiany programu i dwa pokonane wilki.”
  - Las — wataha (540, 6): „Dziewięć godzin bez zmiany programu i sześć pokonanych wilków.”
  - Las — matecznik (600, 1): „Dziesięć godzin bez zmiany programu i jeden pokonany niedźwiedź.”
- The card shows it under the heading (`goalSentence` in `map-lines.ts`).
- The whole sentence of the condition (`solvingText`) stays in the data and now closes „Żąda”, under its table, in `text-secondary` at the size of a detail, as the old card's Żąda row gives the full condition. So the card loses nothing of what it said.
- `completionText` is untouched. The view names no map: `test_content_identifiers.py` gives 0.
- D-133's sentence now says the card shows the condition „in its part „Żąda”, under the table”. D-327 names the short sentence. The styleguide's card item follows.
- Tests:
  - `tests/view/map-lines.test.mjs` holds the five sentences, written out.
  - `tests/view/maps-screen.test.mjs` holds the sentence under the heading and the condition in „Żąda” for Skraj lasu, Las and Las — głębiej.
  - `tests/sim/data.test.mjs` holds `goalText` in the two whole-map expectations.

**Minor 1 — fixed.** `CHOOSE_TEXT` is a module-private constant of `map-card.tsx`.

**Minor 2 — fixed.** `key={`${icon}|${index}`}`.

**Minor 3 — fixed by the move.**
- The card's components (`CardLine`, `CardIcon`, `CardPart`, `CardTable`, `CardEntry`, `MapCard` and the button text) now stand in `src/browser/view/map-card.tsx`. It has 222 lines and its own header comment, and imports what the card needs.
- `maps-screen.tsx` went from 851 to 640 lines and imports `MapCard`.
- The move is commit 1, with no change of behaviour: `npm test -- tests/view/maps-screen.test.mjs` 0, `maps-record.test.mjs` 0, `test_content_identifiers.py` 0, `test_browser_view_framework.py` 0, typecheck 0 at that commit. The B2 code that grows the card came after it.
- The file is covered by the part map's glob `src/browser/view/**`. As a file added after the last audit of the table of `guidelines/coding-browser-module.md`, it has no row there and is no exemplar.

**Minor 4 — fixed.** The doc of `demandRows` and the test's name and comment now say „in hours, or in minutes where it is not a whole number of hours”.

**Minor 5 — fixed.** The test no longer compares the heading's whole text. It compares the classes of the heading's children in order (`maps-card-name`, `maps-card-state solved`, `maps-card-sep`, `maps-card-opened-by`) and the texts of the name, the tag and the opener, each apart.

## Checks (command → exit code)

- `npm test -- tests/view/maps-screen.test.mjs` → 0
- `npm test -- tests/view/map-lines.test.mjs` → 0
- `npm test -- tests/view/maps-record.test.mjs` → 0
- `npm test -- tests/view/map-catalog.test.mjs` → 0
- `npm test -- tests/view/catalog-lines.test.mjs` → 0
- `npm test -- tests/view/account-screen.test.mjs` → 0
- `npm test -- tests/sim/data.test.mjs` → 0
- `npm test -- tests/sim/discovery.test.mjs` → 0
- `npm test -- tests/balance/overlay.test.mjs` → 0
- `npm test -- tests/invariants/test_content_identifiers.py` → 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` → 0
- `npm test -- tests/invariants/test_design_token_sources.py` → 0
- `npm test -- tests/invariants/test_design_token_contrast.py` → 0
- `npm test -- tests/invariants/test_browser_view_framework.py` → 0
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` → 0
- `npm test -- tests/quality/test_function_and_file_size.py` → 0
- `npm run --silent typecheck` → 0
- `npx eslint --max-warnings 0` on `map-card.tsx`, `maps-screen.tsx`, `map-lines.ts`, `sim/data/maps.ts` and the four changed tests → 0
- `npx prettier --check` on the same, `maps-screen.css` and `tokens.css` → 0
- `node tests/quality/eslint-size-rules.mjs` → 0, "0 functions and files over a threshold in 358 files"
- `python -B .the-way/elements/common/foundation_check.py` → 0, "0 errors". One run before the trim gave 1: D-327's first paragraph had 318 words (at most 300). I shortened three phrases, then it gave 0.
- `python -B .the-way/instruction-files/check_instructions.py` → 0, "0 error, 0 warn, 110 info"
- Not run: the full gate (the handoff). Failing first runs: the card's new cases were written with the code, so they were not seen failing on their own. Against the previous code they fail at the missing `goalSentence` and `.maps-card-condition`, which is no assertion failing for its reason. In my head, a sentence swapped between two maps, the long text left under the heading, or the 15 px title would each fail one assertion or the example.

## Own-work check

- Requirement most likely unmet: the title must be as big as the old one in the running game, not only in the CSS. Check: computed style in Chromium at 1600 × 1000 gives `["22px","400","Osiem godzin bez jednej zmiany programu."]`, matching the old page's `22px`/`400`.
- Second: the phone layout with the bigger title and the extra sentence in „Żąda”. The measurement of `loop2-play` at 360 × 740 with touch, on the picked map folded and unfolded, the card scrolled into view and the lair after a judging, answered `scrollsToTheSide: false` and three empty lists each time.
- Console: 0 errors.

## Screenshots

`mariusznazar/screenshots`, branch `loop2/katalog-map`. I fetched it first and added a new commit on `b1c70d8`, with no force. **Commit `3125cd88bb8016c2bc70b5033d6a0a266bd7a8f6`**. Link form: `https://github.com/mariusznazar/screenshots/blob/3125cd88bb8016c2bc70b5033d6a0a266bd7a8f6/loop2/katalog-map/<name>.png?raw=true`.

Retaken with the same names: `catalog-1600-new-game`, `catalog-1600-skraj-picked`, `catalog-1600-deep-picked`, `catalog-1600-deep-picked-folded`, `lair-record-1600`, `lair-record-1280`, `catalog-1280-dokad-picked`, `catalog-360-dokad-picked`, `catalog-360-dokad-picked-folded`, `catalog-360-card`, `lair-record-360`. Ten files changed; the new-game image came out the same. I looked at each before the push: only the made-up „Agent”, the menu „Konto” closed. The old Loop's two images are untouched.

## The pairs, in plain words

- **Pair 1 — a new game (`old-loop-02-mapy` / `catalog-1600-new-game`).** Unchanged by this fix. The old Loop still does better in the capital „LAS” with its count alone at the right, and in a page with no boxes; the rest is equal or better here, as the correction report says.
- **Pair 2 — Skraj lasu picked (`old-loop-03-mapa-skraj` / `catalog-1600-skraj-picked`).**
  - Now equal: the title at the same size (22 px) and weight; one short hand-written sentence under it („Osiem godzin bez jednej zmiany programu.”, the old one „Dwanaście godzin bez jednej poprawki programu.”); the tag „otwarta”; the button at the top right; the tables „Żąda” and „Teren”; „Leży tu” with icons in the right column; the filled picked row with its green bar.
  - The old Loop still does better: its „Teren” values stand at the right edge of a narrow column, ours just after the labels. Its tag „otwarta” is a darker grey, so it pulls the eye less.
  - This game does better: „Żąda” also states the whole condition („480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”). The old card says only „12 h bez cierpienia i bez poprawki programu”, so a player does not learn that health lost to cold and hunger breaks the streak. „Kto idzie” says at once that the team has no character and where to make one.

## Foundation entries written or changed

All were written through `.the-way/elements/decisions/skill/SKILL.md`, as in the correction, and are marked `the cycle's`; the human accepts them at the merge.

- **D-327** (changed). EN: the card's title stands at the size and weight of the predecessor's card title; under it stands a short sentence of what the map demands, written by hand in the map's data; „Żąda” closes with the sentence of the condition; and the card departs from the predecessor's in six things only, beyond its words and roles. PL: tytuł karty ma rozmiar i wagę tytułu karty starej gry, pod nim stoi krótkie zdanie tego, czego mapa żąda, pisane ręcznie w danych mapy, „Żąda” zamyka zdanie warunku, a karta odchodzi od karty starej gry, poza słowami i rolami, tylko w sześciu rzeczach. The pair of examples, word for word:
  - complies: the name of the map at 22 px and the body weight, as the title of the predecessor's card; „rozwiązana” in the heading in `positive` and „otwarta” in `text-secondary`, „odsłania ją Las” and „— drożej niż zwykle” in `text-secondary`, and „nie odnawia się” and „wnosisz najwyżej 5” in `warning`; at a page area 360 px wide „Czyha” and „Leży tu” standing under „Teren”
  - violates: the name of the map at the 15 px of the title of a map run's header; „nie odnawia się” or a cap drawn in `text` or `danger`; „rozwiązana” in the heading drawn in `text-secondary`, or „otwarta” in `positive`; „odsłania ją {mapa}” drawn in `text-strong`; the two columns side by side at a page area 360 px wide
- **D-133** (changed). EN: the card shows the sentence of the map's solving condition from its data in its part „Żąda”, under the table. PL: karta pokazuje zdanie warunku rozwiązania mapy z jej danych w części „Żąda”, pod tabelą.
- The styleguide (`guidelines/styleguide-browser-view.md`, the card item of „The screen Mapy”): the title at `--font-size-map-card-title` and the text weight; the short sentence under the heading; the condition under the table „Żąda”.
- The token `--font-size-map-card-title` is a value of the token file with its `Source:`, no foundation entry; the rule "Every value with its source" settles its source.

## Working copies

- `.runs/fixer2/` under the worktree root held the logs, the composed states and their script, the screenshots as taken, the contact sheets and the clone of the screenshots repository. `.playwright-cli/` held the scripts of the session, including a page file the CLI wrote while on the old Loop.
- Both were removed with `rm -rf` on their full paths.
- The Playwright sessions on the old Loop and on the local game were closed. `npm run local:stop` answered "Local starts stopped: 1"; its database under `.runs/local-start/` stays by the skill's rule.

## Unread material

- `reports/review-whole-3-report.md`: not read beyond what `findings-whole-2.md` quotes (the handoff names it as the full review; the findings file carries every finding I fix). The size probe `reports/review-whole-3-size-probe.mjs`: not run; I give the line counts of the files and the size rule's run instead.
- `.the-way/task-cycle/change/fix.md`: read whole. The decisions skill files were read in the correction, in this session, and not again.
- The old Loop's `MapPage.tsx`: read in the correction, in this session. Its data `src/sim/data/maps.ts`: read for the `goal` lines and the numbers of the five maps.

## Searches not found or unclear

- None missing. One choice the human may want to see: the sentences say „dwa pokonane wilki” where the data's condition says „dwie pokonane napaści wilka”. A beaten attack ends with the wolf defeated („{stworzenie} pokonany.” in `combat-line.ts`), and the old game wrote „dwa wilki”.
