done with concerns

# Author report — task `ekran-postaci`, the whole change as the one author

Worktree `.runs/worktrees/ekran-postaci`, branch `task/ekran-postaci`, base
`cfdbd267`, `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0` (checked against the gitlink
before work). Method: `.the-way/task-cycle/change/SKILL.md`, variant "the whole change as the one
author"; foundation step by `.the-way/task-cycle/skill/foundation_step.md`.

The concern: the acceptance criterion is the human's judgment of the side-by-side screenshots; no
check of mine decides it. One departure from the set (the thickness of the practice bar) and the
choices below stand for the human to accept or send back.

## Commits

| Commit | Message (start) |
|---|---|
| `b301cbe9` | feat: give the archetype a sign: the icon cultist from game-icons.net … (D-446, D-27) |
| `763b5363` | feat: rebuild the screen Postać in two areas … and have the practice line of a manual run of a solved map say what that practice is … (D-445, D-446, D-447, D-199, D-40, D-271, D-272, D-201, D-215, D-418) |
| `1e21575d` | style: draw the bar of practice of a tree twice as thick as the bar of the header … (D-40) |

Note: `b301cbe9` names D-446 in a comment of `archetypes.ts` and in its message, and D-446 enters
the log only in `763b5363`; at the tip of the branch every reference resolves (foundation check 0
errors).

## Files changed (added / removed lines, base `cfdbd267` to `1e21575d`)

| File | + | − |
|---|---|---|
| `assets/icons/cultist.svg` (new) | 1 | 0 |
| `foundations/decisions.md` | 120 | 39 |
| `foundations/environment_facts.md` | 6 | 0 |
| `foundations/invariants.md` | 1 | 1 |
| `guidelines/styleguide-browser-view.md` | 51 | 3 |
| `src/browser/character-screen.css` | 159 | 21 |
| `src/browser/run-screen.css` | 5 | 0 |
| `src/browser/sim/data/archetypes.ts` | 9 | 0 |
| `src/browser/sim/data/scene.ts` | 13 | 0 |
| `src/browser/view/character-figure.tsx` (new) | 62 | 0 |
| `src/browser/view/character-screen.tsx` | 95 | 101 |
| `src/browser/view/character-skills.ts` | 50 | 12 |
| `src/browser/view/character-status.ts` (new) | 25 | 0 |
| `src/browser/view/character-trees.tsx` (new) | 137 | 0 |
| `src/browser/view/credit-lines.ts` | 4 | 1 |
| `src/browser/view/credits.ts` | 5 | 0 |
| `src/browser/view/world-area.tsx` | 8 | 2 |
| `tests/invariants/test_icon_credits.py` | 4 | 1 |
| `tests/view/account-screen.test.mjs` | 9 | 2 |
| `tests/view/character-screen.test.mjs` | 356 | 8 |
| `tests/view/character-skills.test.mjs` | 81 | 16 |
| `tests/view/icons.test.mjs` | 30 | 2 |
| `tests/view/trip.test.mjs` | 1 | 1 |
| `tests/view/world-area.test.mjs` | 27 | 3 |

## What the change does, by the task's *To do*

1. Figure: `CharacterFigure` (`src/browser/view/character-figure.tsx`) draws the archetype's idle
   sheet of `SCENE_MAGES` — the file the picture band of Siedziba draws its characters with — at
   `PICTURE_PIXEL` (2), in a box `CHARACTER_FIGURE` of 32 × 34 picture pixels (`src/browser/sim/data/scene.ts`),
   `aria-hidden`, no control, no text, frames by CSS at 160 ms a frame, still under reduced motion.
2. Two areas `screen-area` in `.screen.character-areas`, columns `minmax(200px, 1fr) minmax(320px, 3fr)`,
   one column under 720 px (rule of `src/browser/character-screen.css`).
3. Name as `h2`, line „pokolenie {n}” (from 2) + archetype icon mask + archetype name, resurrection
   line under it. Archetype data has new fields `icon` and `iconTitle`; icon `cultist`, credited in
   „Autorzy grafiki”.
4. Frame `.character-screen-status`, always, no heading, outlined in `divider`: „W obozie”,
   „Przejście: {mapa} · minuta {m}” (+ „ · postać zginęła” / „ · mapa rozwiązana”), loop line with
   „Zatrzymaj”, after a stop „W obozie” + „Pętla zatrzymana …” (`statusLine` in `character-status.ts`).
5. Tree rows in columns: fold, name, „poziom {p}”, bar, „{wprawa} / {próg}” or „najwyższy” with a
   full bar, „{k} pkt” only with points (`treeRow` in `character-skills.ts`, `CharacterTrees` in
   `character-trees.tsx`).
6. Trees folded at each building of the screen; a click anywhere on a row or Enter/Space on its fold
   opens it; branches keep today's words and „Kup”; D-200 and D-287 unchanged.
7. Bar: track `highlight`, fill `text`, no green; „{k} pkt” in `text-strong`.
8. „+{n} pkt czeka w pętli” right after the name in `text`, from `waitingPractice(loop)`.
9. Styleguide: new rule "The screen Postać"; Roles rows `highlight` and `text` name the practice
   bar; "Every background with its text" names its track; "No value in place of a design token"
   names the figure's geometry.
10. Screenshots pushed (section below).
12. Practice line of a manual run of a solved map: „Wprawa zebrana w tym przejściu, która nie wejdzie
    do umiejętności: {umiejętność} +{n} · …” in `text-secondary` (`practiceText(practice, paid)`,
    class `run-practice unpaid` in `run-screen.css`).

## Checks (command — exit code)

All run in the worktree root. No full gate was run (handoff and method: the full gate is the
orchestrator's).

- `npm ci` — 0 (the worktree had no `node_modules`; the first `npm test -- tests/view/icons.test.mjs` exited 1 with `Cannot find module …typescript-compiler\bin\tsc`, an environment failure, not a test result).
- Failing runs of tests written first or changed, each on the code before the change:
  - `npm test -- tests/view/icons.test.mjs` with the icon, archetype data and credit changes stashed — 1 (9 of 41 failed by assertion, the new archetype cases among them).
  - `npm test -- tests/view/character-skills.test.mjs` with `treeRow` ignoring the waiting practice and `practiceText` always reading the paid line — 1 (the two new cases failed); code restored.
  - `npm test -- tests/view/world-area.test.mjs` with `world-area.tsx` of the base (practice line always paid) — 1 (the order case and the new role case failed).
  - `npm test -- tests/view/character-screen.test.mjs` with `character-screen.tsx`, `character-skills.ts`, `character-screen.css`, `world-area.tsx`, `run-screen.css` of the base and `character-trees.tsx` set aside — 1 (10 of 15 failed: the facts case, the three purchase cases, which find no fold, the figure, the frame, the folding, the row, the roles and the two areas).
- Passing runs at the change:
  - `npm test -- tests/view/icons.test.mjs` — 0 (41 pass)
  - `npm test -- tests/invariants/test_icon_credits.py` — 0 (3 tests)
  - `npm test -- tests/invariants/test_icon_file_content.py` — 0 (2 tests)
  - `npm test -- tests/view/character-skills.test.mjs` — 0 (6 pass)
  - `npm test -- tests/view/world-area.test.mjs` — 0 (24 pass)
  - `npm test -- tests/view/character-screen.test.mjs` — 0 (15 pass), run again after `1e21575d` — 0
  - `npm test -- tests/view/account-screen.test.mjs` — 0 (132 pass)
  - `npm test -- tests/view/trip.test.mjs` — 0
  - `npm test -- tests/view/end-question.test.mjs` — 0
  - `npm test -- tests/view/end-window-game.test.mjs` — 0
  - `npm test -- tests/view/maps-screen.test.mjs` — 0
  - `npm test -- tests/view/camp-picture.test.mjs` — 0
  - `npm test -- tests/view/scene.test.mjs` — 0
  - `npm test -- tests/invariants/test_browser_view_token_values.py` — 0 (run twice, after `763b5363` and after the bar change)
  - `npm test -- tests/invariants/test_browser_view_focus_outline.py` — 0
  - `npm test -- tests/invariants/test_content_identifiers.py` — 0
- `npx prettier --check <the touched TS/JS/test files> src/browser/character-screen.css src/browser/run-screen.css` — 1 at first (`world-area.tsx`), fixed with `--write`, then 0.
- `npx eslint <the touched TS/TSX/test files>` — 0; `npx eslint tests/view/character-screen.test.mjs tests/view/account-screen.test.mjs` after the last edits — 0.
- `node tests/quality/eslint-size-rules.mjs` (size rules of D-425 over the repository) — 0, "0 functions and files over a threshold in 346 files". (`npx eslint -c tests/quality/eslint-size-rules.mjs …` — 2: that file is a runner script, not a config; the runner itself is the check.)
- `npx tsc -p tsconfig.browser.json --noEmit` — 0; `npm run typecheck` — 0.
- `python -B .the-way/elements/common/foundation_check.py` (no switch) — 0, "0 errors", after the entries, after the styleguide and after the D-40 rewording.
- Not run: the full gate (`npm test` with no argument) — the orchestrator's; `python -B .the-way/instruction-files/check_instructions.py` — no instruction file changed; `tests/invariants/test_loop2_container_icons.py` and `tests/deploy/test_loop2_image_icons.py` (the container serving the new icon file) — they need Docker and are left to the gate; `tests/invariants/test_design_token_contrast.py` — no token value changed.

## Own-work check (WAY-164)

Requirement most likely unmet: item 2 and question 9 — the two parts take the proportion of the
columns of Mapy and Wiedza and stack under 720 px; the rule is the screen's own copy of the shared
rule, which no jsdom test can see laid out.
Check: in Chromium (Playwright CLI, local start `https://127.0.0.1:65045`), the rectangles of the two
`.screen-area` of the screen at three widths.
Result: 1600 px window — left 330 px, right 990 px, side by side (1344 − 24 gap = 1320; ¼ = 330,
¾ = 990); 1280 px — 306 and 918, side by side; 700 px — both 668 px wide, the left at top 40 and the
right at top 229, one over the other. The requirement holds.

## Walk through the running product (`walkthrough.md`)

Way to the product: D-255, D-417, D-418, D-419, the skill `.claude/skills/loop2-play/SKILL.md`;
`npm run local`, Chromium through Playwright CLI in its own session `-s=ekran-postaci`, window
1600 × 1000, pixel ratio 1, made-up account `agent@example.test`; states composed with the built
simulation and sent by the save request (a team of three characters; then a manual run of a solved
map).

What the user sees differently: the screen Postać (figure, facts with icon, frame, rows of trees,
folding, waiting mark); the line of practice on the screen of a manual run of a solved map; one
more line in „Autorzy grafiki”. Shared code touched: `practiceText` (world area of every map run),
`credit-lines.ts` (credits on the login card and Siedziba), archetype data (read by the simulation and
the save reader — no field of the save changes).

| Case | By what | Verdict |
|---|---|---|
| Character after a run ended in death: figure, facts, frame „Przejście: Skraj lasu · minuta 243 · postać zginęła”, trees folded, „Kup” note of D-287 | screen in the browser, screenshot 1, DOM read | pass |
| Run ended by „Zakończ” → frame of Ala „W obozie”, no „Wróć do przejścia” | browser | pass |
| Click on a tree's fold opens it: `aria-expanded` true, 3 branches with „Kup” active (points 3) | browser, DOM read, screenshot 2 | pass |
| Character in an earning loop: loop line with „Zatrzymaj” in the frame; „+1 pkt czeka w pętli” at the tree whose waiting practice passes a threshold (70 + 12 ≥ 80), none at the one that does not (30 + 10 < 45) | browser, DOM read, screenshot 3 | pass |
| „Zatrzymaj”: frame becomes „W obozie” + „Pętla zatrzymana · wprawa: Eksploracja +10, Zbieranie małych przedmiotów +12”, the mark gone, the tree's points 1 → 2, focus on the name | browser, DOM read | pass |
| Keyboard: Tab from the name reaches the first fold, Enter opens (3 branches), Space folds (0) | browser | pass |
| Figure = picture band: same file `/sprites/mage-idle.png`, sprite 128 × 128 px on both, animation 0.64 s (4 frames × 160 ms) on both; under emulated `prefers-reduced-motion: reduce` animation `none` | browser (`run-code`), Siedziba and Postać | pass |
| Two areas at 1600 / 1280 / 700 px | browser | pass (own-work check) |
| Manual run of a solved map: under „Mapa jest już rozwiązana…” the line „Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: Eksploracja +3 · Zbieranie małych przedmiotów +2”, computed colour rgb(159, 159, 169), the same as the D-215 line (`text-secondary`) | browser, DOM read, screenshot 4 | pass |
| A manual run going on, seen from Postać: frame „Przejście: Skraj lasu · minuta 0” | browser (after the load of the solved-map state) | pass |
| Console errors through the session | `playwright-cli console error` | 0 errors |
| side observation | — | the reload after sending the second state opened Postać at `#/postac/1` though the address was `#/postac/1/przejscie`, because the address was opened before the state with the map run was loaded and the page then took Postać; following „Wróć do przejścia” opened the run. Not a fault of this change (D-281 opens Postać for a run address with no map run at the moment of opening). |

What I did not check: Firefox and Edge (D-396 leaves them to a person); motion read from a stream
of frames (checked by the computed animation instead); the pause state of a manual run on the frame
in the browser (covered by the jsdom case with `paused: true`); the credits line in the browser (held
by `icons.test.mjs` and `test_icon_credits.py`); the container serving `cultist.svg` (Docker, gate).
No case fell wrong; nothing was corrected after the walk except the bar thickness, a choice of look
(below).

## Screenshots (D-418, D-419)

Repository `mariusznazar/screenshots`, branch `loop2/ekran-postaci`, commit
`2bd7b8dc2a5729c8680604685b98e8695f1d7cbe`, pushed with the owner's `gh` account. Window 1600 × 1000.

1. Old Loop, 31 October, `loop_13_postac.png` (new character after a run ended in death, practice zero, trees folded) — left half of the pair:
   `https://github.com/mariusznazar/screenshots/blob/2bd7b8dc2a5729c8680604685b98e8695f1d7cbe/loop2/ekran-postaci/loop-postac-31-pazdziernika.png?raw=true`
2. loop2, the nearest state: „Nowa postać”, generation 1, practice zero in every tree, all eight trees known and folded, manual run on Skraj lasu ended in death at minute 243 waiting for „Zakończ” — right half:
   `https://github.com/mariusznazar/screenshots/blob/2bd7b8dc2a5729c8680604685b98e8695f1d7cbe/loop2/ekran-postaci/loop2-postac-po-smierci.png?raw=true`
3. loop2, „Ala” in the camp with practice and points, the tree Eksploracja open with its three branches and „Kup”:
   `https://github.com/mariusznazar/screenshots/blob/2bd7b8dc2a5729c8680604685b98e8695f1d7cbe/loop2/ekran-postaci/loop2-postac-oboz-drzewo.png?raw=true`
4. loop2, „Ola” in an earning loop, the loop line with „Zatrzymaj” in the frame and „+1 pkt czeka w pętli” at „Zbieranie małych przedmiotów”:
   `https://github.com/mariusznazar/screenshots/blob/2bd7b8dc2a5729c8680604685b98e8695f1d7cbe/loop2/ekran-postaci/loop2-postac-petla.png?raw=true`
5. loop2, the screen of a manual run of a solved map (Skraj lasu, paused at minute 0) with the new practice line under the D-215 sentence:
   `https://github.com/mariusznazar/screenshots/blob/2bd7b8dc2a5729c8680604685b98e8695f1d7cbe/loop2/ekran-postaci/loop2-przejscie-rozwiazanej-mapy.png?raw=true`

Each was looked at before the push: no address, password or token stands in them (the menu „Konto”
is closed). Every loop2 screenshot was taken after the bar went to 4 px and shows the final look.

## Choices made (with the way rejected and its cost if wrong)

1. **Words and role of the practice line of a solved map's run (item 12):** „Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: {umiejętność} +{n} · …” in `text-secondary`. It says what the practice is (gathered in this run) and that it is not paid, in the words of the screen Postać („wprawa”, „Umiejętności”). Rejected: keeping `text` — the line would still read as a gain beside the D-215 sentence that denies it; „… (niewypłacona)” — „wypłata” is no word of the screen Postać; hiding the line on such a run — D-201 keeps the line for the player to see what the run grows. Cost if wrong: one wording and one class.
2. **Where the waiting practice is read from:** `waitingPractice(loop)` of `src/browser/sim/loop.ts`, the function „Odbierz” and „Zatrzymaj” pay and the report of D-246 reads, so the mark equals what „Odbierz” would pay. Rejected: `loop.practice` alone — it leaves out the map run going on. New points = points after paying that practice − points now (one point a level, D-191).
3. **Name and type of the archetype's new field:** `icon: string` with `iconTitle: string`, the shape items and creatures already have (`WithIcon` of `credit-lines.ts`), so the credits read the archetype as they read the others. Rejected: `icon` alone — the credit needs the title; a union type of icon names — no other data uses one.
4. **Markup and keyboard of the folded row:** the row is a `div` whose click toggles the tree; its first cell is the shared plain button (`ReactButton`) „▸”/„▾” with the tree's name as `aria-label` and `aria-expanded`, with no click handler of its own (its click bubbles to the row), so Enter and Space on it act as the browser's own click. Rejected: the whole row as one shared button — `ReactButton` takes text only, and a new kind of the shared button would change D-44 („Bez zmiany”); the name inside the button, as on Wiedza („▸ Eksploracja”) — a framed box around every tree name, heavier than loop's rows. Cost if wrong: the row's markup and two CSS rules.
5. **The figure's picture:** the idle sheet of `SCENE_MAGES` (the band's own file) at `PICTURE_PIXEL`, in a box of 32 × 34 picture pixels (64 × 68 CSS px) that holds the figure (columns 20–44, rows 32–63 of each frame, measured on `assets/sprites/mage-idle.png`) and crops the empty rows; data `CHARACTER_FIGURE` in `scene.ts`. Rejected: the whole 64 × 64 frame (128 × 128 px, half of it transparent, in a column of about 300 px); the band's cell height (48 rows, 16 empty rows over the head). No clearing: on the screenshots the figure does not read as a sticker to me — the human may judge otherwise (question 7's condition).
6. **Where the figure's frames are run:** a rule of the screen's own stylesheet that names the shared keyframes `scene-frames` with the band's duration `calc(var(--frames) * 160ms)`, as the rules of `run-screen.css` do. Rejected: adding `.character-figure img` to the shared selector list in `styles.css` — D-421 enumerates that rule as "of the scene and of the picture band", and D-421 is „Bez zmiany”. Cost: the beat 160 ms written in two places.
7. **The columns:** the screen's own rule with the same column sizes and threshold as the shared rule of Programy, Mapy and Wiedza. Rejected: joining that selector list — D-421 names the three screens („Bez zmiany”). Cost: a change of the proportion has to be made in two rules.
8. **The bar's share:** practice ÷ next threshold, the numbers the row shows (as loop does); full after the last threshold. Rejected: progress within the level — the bar would disagree with „{wprawa} / {próg}”.
9. **Roles not given by the task:** „poziom {p}” and „{wprawa} / {próg}” in `text-secondary` (notes beside the bar, as loop's grey); the frame's outline and the rows' separators in `divider`; the state line in `text` (as the loop line of D-244).
10. **Three decisions** (D-445 figure, D-446 facts, D-447 frame) rather than one: each can change on its own (WAY-19).
11. **The icon file** taken from `game-icons/icons` at the source commit `82d94881…` the other icons come from (`lorc/cultist.svg`, background path removed, fill `#fff` → `#f4f4f5`); its path data equals the old Loop's `public/icons/cultist.svg` (compared with `diff`). Author „Lorc” and title „Cultist icon” read from `https://game-icons.net/1x1/lorc/cultist.html` on 2026-11-21.
12. **Order in „Autorzy grafiki”:** the archetype's line after the creatures' and before the packs.

## Departures from the old Loop's set (items 1–10)

- **Thickness of the practice bar (item 7, look):** the set says the bar looks like the bar of an unmet requirement in the header (2 px, `--bar-width`). On the first screenshot its `highlight` track could hardly be seen on `panel`; the bar now stands at `--bar-width` doubled (4 px), as the bar over the mage's head does and as loop's bar (4 px) does, colours unchanged. D-40 now says the bar takes the colours of that bar; the styleguide gives the thickness. Commit `1e21575d`.
- Nothing else departs: no clearing under the figure; the resurrection line stays beside the figure (at „użycia 3 z 3” it takes one line in the 330 px column); the left column is 330 px as question 9 gives.

## Foundation entries written (foundation step)

| Entry | Mark | Meaning (EN) | Znaczenie (PL) |
|---|---|---|---|
| D-445 (new, section „Browser view: screens…”) | row 3 | The screen Postać shows the character's figure — the band's picture, size and beat — always, with no clearing, as a picture. | Ekran Postać pokazuje ludzika — ten sam obrazek, wielkość i takt co na pasie obozu — zawsze, bez polany, jako obrazek. |
| D-446 (new) | row 5 | Beside the figure: name, a line of generation, archetype icon and name, the resurrection line; the icon's file named in the archetype's data. | Obok ludzika: imię, wiersz pokolenia, znaczka i nazwy archetypu, wiersz wskrzeszenia; plik znaczka w danych archetypu. |
| D-447 (new) | row 6 | A frame always says what the character does: „W obozie”, „Przejście: …” with its end, the loop line with „Zatrzymaj”, after a stop „W obozie” and the stop's line; no other button. | Ramka zawsze mówi, co postać robi: „W obozie”, „Przejście: …” z końcem, wiersz pętli z „Zatrzymaj”, po zatrzymaniu „W obozie” i wiersz zatrzymania; innych przycisków nie ma. |
| D-199 (changed) | rows 7, 8, 19 | Each known tree is a row in columns with a bar and „{k} pkt”; „+{n} pkt czeka w pętli” after the name in `text`; trees folded, opened by a click or the keyboard. | Każde drzewo to wiersz w kolumnach z paskiem i „{k} pkt”; po nazwie „+{n} pkt czeka w pętli” w `text`; drzewa zwinięte, otwierane kliknięciem albo klawiaturą. |
| D-40 (changed) | row 9 (its *Rationale* sentence on the doubled thickness is the cycle's) | The practice bar has the colours of an unmet requirement's bar, no green; the points in `text-strong`. | Pasek wprawy ma kolory paska niespełnionego wymagania, bez zieleni; punkty w `text-strong`. |
| D-272 (changed) | row 1 | A picture of the game also stands as the character's figure on Postać, with no clearing. | Obrazek gry stoi też jako ludzik na ekranie Postać, bez polany. |
| D-271 (changed) | row 2 | The figure is the Pixel Crawler mage in its idle sheet, the band's picture. | Ludzik to mag z Pixel Crawler w arkuszu stojącym, ten sam co na pasie obozu. |
| D-418 (changed) | row 10 | Screenshots of the old Loop may lie in the screenshots repository; it counts as a public product. | Zrzuty starego Loopa mogą leżeć w repozytorium zrzutów; to produkt publiczny. |
| D-201 (changed) | the cycle's | On a manual run of a solved map the practice line reads „Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: …” in `text-secondary`. | Na przejściu rozwiązanej mapy wiersz wprawy brzmi „Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: …” w `text-secondary`. |
| D-215 (changed) | the cycle's | The solved-map sentence stands above the run's practice line (D-201), named no longer by its old words. | Zdanie o rozwiązanej mapie stoi nad wierszem wprawy przejścia (D-201), już bez jego dawnych słów. |
| Styleguide rule „The screen Postać” + Roles rows `highlight`, `text` + two paragraphs | rows 4, 18, 20 (guidelines) | Two areas in blocks, ¼ and ¾, stacking under 720 px; roles of every part of the screen. | Dwa obszary w blokach, ¼ i ¾, jeden pod drugim poniżej 720 px; role każdej części ekranu. |
| Environment fact `game-icons-cultist-title` (new) | the cycle's | game-icons.net names Lorc's icon `cultist` „Cultist icon”. | game-icons.net nazywa ikonę `cultist` Lorca „Cultist icon”. |
| Invariant `icon-credits`, *Rests on* + `game-icons-cultist-title` | the cycle's | The credits check rests on the new title fact too. | Sprawdzenie autorów opiera się też na nowym fakcie tytułu. |

Rows ↔ entries: every one of the 13 accepted rows is written: 1 → D-272, 2 → D-271, 3 → D-445,
4 → styleguide, 5 → D-446, 6 → D-447, 7, 8, 19 → D-199, 9 → D-40, 10 → D-418 (no earlier cycle had
written it; searched „kantarion” in D-418), 18, 20 → styleguide.

Pairs of examples added, word for word (for the request's description):

- D-445: complies: „the frames of the figure changing at the beat of the frames of the picture band by CSS, and standing on the first frame under the system's setting for reduced motion”; violates: „a loop of drawing that moves the figure; a figure that moves under the setting for reduced motion; a figure that walks while its character is in an earning loop”.
- D-446: complies: „the icon `cultist` of game-icons.net in `assets/icons/`, named by the data of the elemental mage and credited in „Autorzy grafiki””; violates: „the name of the icon file of an archetype written in the code of the view; the icon of an archetype drawn as a picture of its file, in a colour of its own”.
- D-199 (pair rewritten): complies: „the section headed „Umiejętności”; Enter and Space on the fold of the row of a tree opening the tree in the browser, as the browser's own click of a native button; „Obchód” at rank 0 reading its description and „cena 3” with no before-and-after values”; violates: „the section standing with no heading „Umiejętności”; a key handler on the fold that stops Enter or Space; „false → true” beside „Czysty płomień””.
- D-201 (violates changed): „hiding the line immediately on completion; the line of a run that pays drawn in `text-secondary`”.
- D-418 (complies extended): „… ; a screenshot of a screen of loop put in the directory of a cycle beside the screenshot of the same screen of loop2”.

*Rejected* of the new and changed entries takes the ways the rows' sources keep (questions 1–5, 8,
11 *Not chosen*), each with its cost; D-201 keeps its *Rejected* as it was.

## Decisions whose present sentence differs from the task's quotation

- D-217: the task quotes „Wskrzeszenie drużyny gotowe” / „Wskrzeszenie drużyny za {g} godz. {m} min czasu realnego — …”; the base has the uses wording („Wskrzeszenie drużyny: użycia {u} z {c}…”), from the work of task 24. The screen shows the base's wording, as item 3 asks („w brzmieniu, jakie gra ma w chwili cyklu”).
- D-243: the base adds that the click first judges the program anew (D-439) and the second click „Puść mimo to”; nothing of it is touched.
- D-44 now lists „Zacznij od zera” and the button in `positive`; D-280 and D-421 match the task's quotations; D-246, D-189, D-199, D-40, D-272, D-271, D-418 matched before the change.

## Reach beyond the handoff

- D-201 and D-215 (`foundations/decisions.md`), found by a search of „Wprawa w tym przejściu”, as the handoff asked: D-201 holds the line, D-215 named it by its words, so both changed.
- D-425 (size rule), D-43 (layout dimensions exempt), D-319, D-349, D-53, D-281 and the index of the selection (`decision_index.py` with the sections „Screen of a map run…”, „Scene”, „The gate…”, part `browser-view` and the decisions in play) — to settle the column sizes, the figure's geometry and the minute of a run.
- `.the-way/elements/decisions/template.md`, `skill/SKILL.md`, `read.md`, `decide_entry.md`; `.the-way/elements/common/way_of_working.md`, `rules.md`; `.the-way/elements/environment-facts/skill/*.md`; `.the-way/product-guidelines/styleguide/SKILL.md` and parts of `template.md` — the foundation step's reading.
- Code read to make the change: `src/browser/styles.css` (screen layout, buttons, frames rule), `headquarters.css`, `run-screen.css`, `knowledge-screen.tsx`/`.css`, `run-header.tsx`, `screen-address.ts` (`returnToRunEntry`, the minute of a run), `sim/loop.ts`, `sim/skills.ts`, `sim/types.ts`, `sim/run.ts` (`mapRunEnded`), `tokens.css`, `tests/view/game-stylesheets.mjs`, `tests/view/page-document.mjs`, `tests/view/camp-picture.test.mjs`, `tests/invariants/test_icon_*.py`.

## Working copies

- `.runs/worktrees/ekran-postaci/.runs/author` — index of decisions, logs, composed states (`compose-states.mjs`, two JSON documents, sender scripts), screenshots, the clone of `mariusznazar/screenshots`, the downloaded source icon, kept copies used for the failing runs. Removed with `rm -rf` by its full path; the directory no longer exists.
- `.runs/worktrees/ekran-postaci/.playwright-cli` — the snapshots and console logs Playwright CLI wrote by itself; removed by its full path.
- The browser session `ekran-postaci` closed (`playwright-cli -s=ekran-postaci close`); the local start stopped (`npm run local:stop` — "Local starts stopped: 1").
- Left in place as the product's own tools' output, not working copies: `node_modules/` (from `npm ci`), `dist/` (builds), `.runs/local-start/` (the local start's database, which the next start removes).
- Nothing kept in `reports/` beside this report.

## Unread material

- Decision log sections „Scene” and „Screen of a map run and the end-of-run window”: read through the binding sentences the index gives, not each entry whole (D-201 and D-215 read whole).
- „The gate, test tools and the local start”: D-418 and D-419 read whole; the rest through the index's binding sentences.
- Invariants of the parts `browser-view` and `simulation`: the list of headings read; whole only `content-identifiers`, `icon-file-content`, `icon-credits`, `loop2-container-icons`, `browser-view-token-values`, `sprite-file-content`, `function-and-file-size`.
- The glossary (`foundations/glossary.md`, and the-way's glossary): not read.
- `.the-way/elements/decisions/examples.md` and the entries it names: not read.
- Old Loop `src/components/probe/LoopBlock.tsx` and `src/sim/data/archetypes.ts` (branch `origin/test`): not read; `CharacterScreen.tsx`, `IdentityPanel.tsx`, `SkillsPanel.tsx` read. The `cultist` icon of the elemental mage was taken from the task's context and checked against `public/icons/cultist.svg` of that branch.
- `guidelines/coding-saved-game.md`: not read (the change adds nothing to the saved game state; the archetype's new fields are not saved).
- `.the-way/product-guidelines/template.md`, `product-guidelines/styleguide/template.md` lines 72–139: not read.

## Searches not found or unclear

- No design token or shared variable for the beat of the frames (160 ms): it stands as a literal in each rule that runs `scene-frames`; the figure's rule repeats it.
- `npx eslint -c tests/quality/eslint-size-rules.mjs <files>` is no way to run the size rule (that file is a runner, not a config); the runner run with no argument is.
- Unclear: whether the frame's outline in `divider` is a use of the role the human would approve; the styleguide's end-of-run window lists the frame of a window in `divider` as an open question for the human, and the screen areas use it already.
- Unclear: whether changing D-215 (not in *Decisions in play*) and the third sentence of D-201 need the human beyond the merge; both follow item 12, which says the sentence of the entry holding the line goes with the change.
