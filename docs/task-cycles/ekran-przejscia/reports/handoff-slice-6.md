# Handoff — Slice 6 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 6; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `05cef64` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-6.md`. If the harness refuses
  that write, return the whole report as text in your final message instead.
- Read every guideline file your handoff names **whole**: where a file is too large for one read, read it in parts until its end (`guidelines/testing.md` is about 66 kB). A guideline read in part is a gap your report must name.
- Do not run the whole gate (`npm test` with no argument); your checks are the slice's *Checks*.
  The tools of `tests/quality` are installed in `.runs/quality-venv`.

## Answers of step 4 (binding)

- Trust boundary: yes for the cycle — `assets/sprites/**` of the part `browser-view` (Slice 1 adds
  the PNG of the forest frame there; its review checks, as D-273 gives, that the file holds pixels
  alone and that the build copies from `assets/sprites/` only PNG files, only into what
  `npm run build` writes). A slice whose *Risk* is none touches no trust boundary; if yours comes to
  touch one, or `src/browser/sim/saved-game.ts`, say so in your report.
- Irreversible operation: no. Open design choice: none. Reserved choice: none.
- Answers the orchestrator gave (cycle record, questions table): the saved game state keeps its
  shape and `SAVED_GAME_VERSION` stays 3; „Dodaj regułę z tym” is disabled where the copy holds no
  rule group; the committed scene size is 672 × 304 (scale constant 2) until the human picks, the
  other size reached only locally; new rows of `guidelines/coding-browser-module.md` take the status
  `copy`.

## Environment

Windows 11; shells: Git Bash and PowerShell. Python's console output uses the ANSI code page: write
Polish text a script produces to a UTF-8 file rather than printing it, use forward slashes in paths
inside Python literals, and keep line endings when a script rewrites an existing file
(`newline=''`). Commit messages in English in the repository's style (`feat: :sparkles: …`,
`test: :white_check_mark: …`, `refactor: :recycle: …`, `docs: :memo: …`), files added by path —
never `git add -A`, `git add .` or `git commit -a`.

## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or
`blocked`), your commits, a one-line check result naming what failed or did not run, and the
report's path (or that the report is in your message). The report holds every check you ran with
its command and exit code, your own-work check, your questions and concerns, each reach beyond this
handoff, and **Searches not found or unclear** — each thing looked for and not found or unclear, or
`none`.

## Orchestrator's notes for this slice

- Earlier slices: Slice 1 `assets/sprites/forest-scene.png` (336 × 152); Slice 5 `src/browser/view/run-header.tsx` uses its own classes `run-header-*`, so do not depend on `.status-text`.
- The committed scene scale is 2 (672 × 304) until the human picks (orchestrator's answer Q5). D-311, D-19 (whole, as rewritten), D-147, D-185, D-216, D-272, D-314 and D-315 at the current head are binding; read them whole.
- New rows of `guidelines/coding-browser-module.md` are Slice 12's; do not add them.
- Long table rows of `guidelines/testing.md` can be cut by your reading tool at ~1800 characters a line; read those lines another way (e.g. `sed -n`), so the file is read whole.

## The slice's section of the plan, word for word (`plan.md`)

### Slice 6 — The world area: the scene, the lines, the body row, the drawing with the line of a tile, and the table

- **Goal:** React components the screen of Slice 9 renders, each drawing from props, with the hovered tile's key and its setter given by the screen, so that one hovered tile links the drawing, the line under it and the table standing in another area (D-19):
  - `src/browser/view/terrain-drawing.tsx` — the drawing of the game map from `terrainPicture`, with the elements, classes and attributes `terrain-panel.ts` draws today (tiles with `data-tile`, icons dimmed or not, the campfire's icon, the outlines of the character and the step's target, the line around the hovered tile in `link-highlight`); a picture, not a control: no click handling, hovering its only interaction, a hovered tile reported by key (D-19, D-70); no number of stock on it.
  - `src/browser/view/tile-table.tsx` — the table of revealed tiles from `tileList`, with the classes the table has today, the hovered tile's row marked, a hovered row reporting its tile's key.
  - In `src/browser/view/tile-list.ts`, a pure function giving the line under the drawing for a hovered key or none: for the hovered tile where it is revealed, the tile's label and the stock of each resource of the map as its row of the table gives them; with no tile hovered, the same for the character's tile; for a hovered tile not revealed, its label alone with nothing of its stock. The campfire's state stays in the table alone (D-70).
  - `src/browser/view/world-area.tsx` — the world area, from the top (task item 4): the scene, an `img` of `/sprites/forest-scene.png` whose `width` and `height` attributes come from one exported constant of the scene's scale — 1 for 336 × 152, 2 for 672 × 304, committed as 2 until the human's choice — drawn pixel-sharp, with nothing drawn on it or over it (D-272); the last-encounter paragraph by `combatText` when the map run holds one; the lines of the end, the deposit and the settlement of a death, by `tripTexts` and `deathSettlementLine`; the body row by `bodyValues`, a value below its threshold in `danger`, with the backpack by `backpackText`; the line of a solved map by `solvedRunText`, the practice by `practiceText` and the preview of the bring plan, between the backpack and the drawing (D-215, D-201, D-186); the drawing and the line of a tile under it. Each part shows and hides as its DOM module does today.
  They import only the pure functions of the DOM modules (D-265) and keep the classes those modules give, so the rules of `src/browser/styles.css` apply; new rules read existing tokens only, and a value the token file lacks is named in the report, never chosen. Write the cases first in a new `tests/view/world-area.test.mjs` on the harness: the parts in the order of task item 4; the picture's source and its attributes for both scales, no text inside or over it; only the value below its threshold in `danger` (carrying the DOM case of `tests/view/body-row.test.mjs` at line 154 at the base); the encounter paragraph absent without a record and present when one appears (carrying the DOM case of `tests/view/combat-line.test.mjs` at line 49); a hovered tile marking its row of the table and the line showing its numbers, a hovered row marking its tile, the character's tile in the line with none hovered (D-19); the campfire's icon in its tile and its state in the row of the same key (carrying the DOM case of `tests/view/tile-list.test.mjs` at line 289). Write the pure function's cases first in `tests/view/tile-list.test.mjs`, the expected texts written out.
- **Change:** `src/browser/view/terrain-drawing.tsx` · `src/browser/view/tile-table.tsx` · `src/browser/view/world-area.tsx` · `src/browser/view/tile-list.ts` · `src/browser/styles.css` · `tests/view/world-area.test.mjs` · `tests/view/tile-list.test.mjs`
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:34-42` To do · `.runs/task-cycles/ekran-przejscia/task.md:61-71` Questions to settle · `.runs/task-cycles/ekran-przejscia/task.md:79-83` Questions to settle · `.runs/task-cycles/ekran-przejscia/task.md:115-141` Context ·
  `foundations/decisions.md:402-427` D-19 · `foundations/decisions.md:1362-1376` D-70 · `foundations/decisions.md:2297-2317` D-125 · `foundations/decisions.md:2749-2763` D-147 · `foundations/decisions.md:3330-3342` D-185 · `foundations/decisions.md:3990-4012` D-216 · `foundations/decisions.md:3343-3355` D-186 · `foundations/decisions.md:3562-3576` D-201 · `foundations/decisions.md:3974-3989` D-215 · `foundations/decisions.md:5637-5661` D-272 · `foundations/decisions.md:5610-5636` D-271 · `foundations/decisions.md:867-881` D-41 · `foundations/decisions.md:897-911` D-43 · `foundations/decisions.md:5411-5452` D-265 · `foundations/decisions.md:5379-5410` D-264 · `foundations/decisions.md:1604-1616` D-88 · `foundations/invariants.md:355-364` terrain-drawing-numbers · `foundations/invariants.md:459-468` browser-view-token-values ·
  Foundation entries E2, E3, E6, E7, E8, E12, E13, E14 ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `tests/view/page-document.mjs` · `src/browser/view/terrain-panel.ts` · `src/browser/view/terrain-picture.ts` · `src/browser/view/body-row.ts` · `src/browser/view/combat-line.ts` · `src/browser/view/trip-lines.ts` · `src/browser/view/character-skills.ts` · `src/browser/view/run-screen.ts` · `tests/view/body-row.test.mjs:105-184` · `tests/view/combat-line.test.mjs` · `tests/invariants/test_terrain_drawing_numbers.py:1-52`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/world-area.test.mjs` and `npm test -- tests/view/tile-list.test.mjs`, their new cases seen failing first; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/quality/test_node_test_selection.py`; `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Foundation entries E2, E3, E6, E7, E8, E12, E13, E14

## What you read

The ranges below are current at 05cef64; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-19 — `foundations/decisions.md:402-429`
- D-70 — `foundations/decisions.md:1364-1378`
- D-125 — `foundations/decisions.md:2303-2323`
- D-147 — `foundations/decisions.md:2758-2772`
- D-185 — `foundations/decisions.md:3339-3351`
- D-216 — `foundations/decisions.md:3999-4020`
- D-186 — `foundations/decisions.md:3352-3364`
- D-201 — `foundations/decisions.md:3571-3585`
- D-215 — `foundations/decisions.md:3983-3998`
- D-272 — `foundations/decisions.md:5645-5671`
- D-271 — `foundations/decisions.md:5618-5644`
- D-41 — `foundations/decisions.md:869-883`
- D-43 — `foundations/decisions.md:899-913`
- D-265 — `foundations/decisions.md:5419-5460`
- D-264 — `foundations/decisions.md:5387-5418`
- D-88 — `foundations/decisions.md:1606-1618`
- terrain-drawing-numbers — `foundations/invariants.md:355-364`
- browser-view-token-values — `foundations/invariants.md:459-468`

### Entries written by the cycle's foundation step

- E2 — D-19 (rewritten whole in the projected wording) — read it whole in `foundations/decisions.md` — `foundations/decisions.md:402-429`
- E3 — D-311 — new, „How is the screen of a map run laid out?”, read it whole — `foundations/decisions.md:6619-6654`
- E6 — D-147 (sentence of place) — read it whole — `foundations/decisions.md:2758-2772`
- E7 — D-185 (sentence of place) — read it whole — `foundations/decisions.md:3339-3351`
- E8 — D-216 (sentence of place) — read it whole — `foundations/decisions.md:3999-4020`
- E12 — D-314 — new, „What does the background of the scene show?”, read it whole — `foundations/decisions.md:6733-6751`
- E13 — D-315 — new, „Where does the darkness of the scene stand?”, read it whole — `foundations/decisions.md:6752-6770`
- E14 — D-272 (part rewritten: „as the scene”) — read it whole — `foundations/decisions.md:5645-5671`

### Files (whole unless a range is given)

- `src/browser/AGENTS.md`
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `tests/view/page-document.mjs`
- `src/browser/view/terrain-panel.ts`
- `src/browser/view/terrain-picture.ts`
- `src/browser/view/body-row.ts`
- `src/browser/view/combat-line.ts`
- `src/browser/view/trip-lines.ts`
- `src/browser/view/character-skills.ts`
- `src/browser/view/run-screen.ts`
- `tests/view/body-row.test.mjs:105-184`
- `tests/view/combat-line.test.mjs`
- `tests/invariants/test_terrain_drawing_numbers.py:1-52`

### Passages of the frozen task, word for word (`.runs/task-cycles/ekran-przejscia/task.md`)

#### task.md:34-42 — To do

4. Obszar świata ma od góry kadr lasu, zapis ostatniego starcia, linie końca przejścia, wiersz ciała z plecakiem, rysunek mapy i linię kafelka (pytanie 4).
   - Linie końca przejścia to „Do skrzynki: …” albo „Do skrzynki nic nie trafiło.” po rozwiązaniu mapy i zdanie o wskrzeszeniu po śmierci postaci; stoją pod zapisem starcia, gdy on jest.
   - Linie „Mapa jest już rozwiązana…”, „Wprawa w tym przejściu…” i „Wyniesie…” stoją jak dziś między plecakiem a rysunkiem mapy.
5. Pod rysunkiem mapy stoi linia kafelka z liczbami zapasu kafelka wskazanego kursorem, a bez wskazania kafelka postaci.
   - Liczby dalej nie stoją na samym rysunku.
   - Najechanie dalej wiąże kafelek z jego wierszem w tabeli, gdy tabela stoi.
6. Na górze obszaru świata stoi nieruchomy kadr lasu w śniegu, w pełnym świetle (pytanie 2).
   - Kadr jest obrazem PNG z paczki Pixel Crawler, leży bezpośrednio w `assets/sprites/` i nie stoi na nim żaden tekst.
   - Prośba o scalenie pokazuje kadr na prawdziwym ekranie, z edytorem z zadania 5 w obszarze programu, w obu rozmiarach, 336 × 152 i 672 × 304; po uwadze Mariusza poprawka zostawia jeden z nich (pytanie 1).

#### task.md:61-71 — Questions to settle

- Pytanie 1. Jaki rozmiar ma scena, 336 × 152 czy 672 × 304, i kiedy człowiek go wybiera, skoro „Rozstrzyga oglądanie sceny w układzie ekranu”?
  - Answer: Cykl stawia kadr na prawdziwym ekranie z nowym edytorem, prośba o scalenie pokazuje oba rozmiary, a poprawka po uwadze Mariusza zostawia jeden. Koszt przyjęty z tą drogą: jedna runda uwag przed scaleniem, która trzyma kolejne zadanie. Gdy wybór padnie na 336 × 152, słowa „Scena większa” w definicji i „W większej scenie” w celu zadania 7 idą do zmiany w swoich procesach, bo stary Loop ma scenę tej wielkości.
  - Not chosen:
    - wybór teraz, bez oglądania ekranu — odejście od zdania definicji i ryzyko, że wybór się nie utrzyma
  - Source: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, odpowiedź na pakiet rundy zadań 4–7, punkt B12, rekomendacja A; pytanie wspólne z zadaniem 7. Pytanie: definicja_mvp2_loop2.md (odcisk 9641f804), *Open questions*, wiersz 96: „Jaki rozmiar ma scena: 336 × 152 czy 672 × 304? Rozstrzyga oglądanie sceny w układzie ekranu. — resolved in: task: ekran przejścia”. Skutek dla 336 × 152: pakiet, część D, przyjęta tą samą odpowiedzią.
- Pytanie 2. Co pokazuje nieruchomy kadr lasu: las w śniegu czy zielony, i czy jest w pełnym świetle?
  - Answer: Las w śniegu, z gotowych obrazków starego Loop; słaby punkt przyjęty z tą drogą: szron z zadania 18 gorzej widać na bieli, a śnieg stoi też przy 25 °C. Kadr jest w pełnym świetle, bo noc to warstwa nad kadrem, którą dokłada zadanie 18; do zadania 18 scena nie ma nocy.
  - Not chosen:
    - las zielony — inny las niż na logowaniu i wycinanie z arkuszy
    - kadr ciemny w pliku, droga pokazana na wypadek skreślenia cytatów o świetle — zadanie 18 wymienia plik
  - Source: pora roku: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, wiersz T29. Światło: cytaty nieskreślone przez Mariusza 2026-11-03, pakiet, punkt A6: plan_mvp2_loop2.md (sha256 36c4721a), cel zadania 18: „Noc w scenie jaśnieje razem z passą, utrata passy ściemnia las, rozwiązanie mapy daje pełny świt”; tamże, *Open questions*: „Jaki kolor ma warstwa nocy i świtu? Wartość wybiera Mariusz.”; definicja_mvp2_loop2.md (odcisk 9641f804), D-132, wiersz 691: „the scene showing a full dawn”.

#### task.md:79-83 — Questions to settle

- Pytanie 4. Gdzie do zadania 16 stoją linie końca przejścia i zapis ostatniego starcia?
  - Answer: W obszarze świata, między kadrem a wierszem ciała; prawy obszar nie przejmuje końca przed zadaniem 16.
  - Not chosen:
    - linie końca w prawym obszarze już w tym zadaniu, droga pokazana na wypadek skreślenia cytatów — część zadania 16 i większe zadanie przed terminem
  - Source: cytaty nieskreślone przez Mariusza 2026-11-03, pakiet rundy, punkt A5: plan_mvp2_loop2.md (sha256 36c4721a), cel zadania 16: „Koniec przejścia w prawym obszarze mówi kolejno, co się stało, co to kosztowało albo dało, dlaczego i co dalej”, i wiersz wpisu „(new) — What does the end of a map run explain? | 16 | 16”; foundations/decisions.md przy 20d804b, D-185: „stands below the discovery line and last-encounter paragraph when present and above the body and backpack, directly below the status row when neither is present, until „Restart” or „Zakończ”.”; definicja_mvp2_loop2.md (odcisk 9641f804), wiersz 226: „The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with the minutes each need lasts, the backpack, the drawing of the map and the line of a tile under it.”

#### task.md:115-141 — Context

## Context

- Numery wierszy kodu są z commitu `20d804b`; cytowane pliki poza `src/browser/styles.css` nie zmieniły się od `799d1ff`, a cytowane wiersze `styles.css` stoją tak samo.
- Dzisiejsze kolumny stoją w `src/browser/view/game-view.ts:94-104` i `src/browser/styles.css:106-117`.
- Tekst wiersza stanu składa `src/browser/view/status-row.ts:51-76`, a jego przyciski `:171-197`.
- Linia odkrycia to `src/browser/view/status-row.ts:176-178`, a jej dane `src/browser/sim/types.ts:414-417`.
- Rysunek mapy i tabela stoją dziś razem w `src/browser/view/terrain-panel.ts:32-42`.
- `tests/invariants/test_terrain_drawing_numbers.py` buduje panel przez `createTerrainPanel()` i liczy jako tekst rysunku wszystko poza tabelą, więc przeniesienie tabeli i nowa linia kafelka zmieniają jego odczyt; przyczyna zmiany stoi w D-19 (`guidelines/testing.md`, „Changing an existing test”).
- Testy widoku ekranu przejścia stoją w `tests/view/` (`status-row`, `body-row`, `combat-line`, `tile-list`, `terrain-picture`, `trip`), a test ekranu w React idzie na wspólnej uprzęży D-264.
- Strona wszystkich stanów nie importuje modułów ekranu przejścia (`src/browser/kitchen-sink/`), więc przejście tych modułów na `.tsx` nie łamie D-269.
- W `src/browser/view/controls/react-button.tsx` przy `20d804b` postać React zna rodzaje `secondary` i `tab`, a przycisku niszczącego nie ma.
- Postać React przycisku niszczącego należy do zadania 4, „bo tam pierwszy raz jest potrzebny”: odczytanie agenta z drugiego pakietu rundy, część F, bez sprzeciwu Mariusza 2026-11-03 („wszystko przyjmuję zgodnie z rekomendacjami”).
- Plan stawia zadanie 6 po zadaniach 5 i 11, więc w obszarze programu stoi już nowy edytor z tłami, paskiem i powodem przy regule.
- Plan, wpis 2026-11-03 o zależności od zadania 11: zadanie 6 rozstrzyga rozmiar sceny, „oglądając na prawdziwym ekranie kolumnę programu o szerokości 208–304 px, jaka zostaje przy większej scenie”.
- Pakiet rundy liczył na program około 640 px przy 336 i 304 px przy 672 w szerokim oknie, a przy oknie 1280 px około 544 i 208 px.
- Treść ekranów ma najwyżej 1344 px szerokości, a w węższym oknie zajmuje całą szerokość: wiersz 9 kandydatów zadania 4, przyjęty przez Mariusza 2026-11-03 („wszystko przyjmuję zgodnie z rekomendacjami”, drugi pakiet rundy, część D); do fundamentu zapisuje go cykl zadania 4.
- Scena 672 × 304 to ten sam obraz 336 × 152 w skali 2:1 (`rozpoznanie_mvp2\rozpoznanie_frajda.md:201`, `:251`), więc oba rozmiary pokazuje jeden plik.
- Scena starego Loop ma 336 × 152 i skaluje się całymi krotnościami (`C:\Storage\repos\loop\src\components\probe\Scene.tsx:18-22`).
- Wycięte obrazki starego Loop leżą w `C:\Storage\repos\loop\public\sprites\`, między innymi `ground.png`, `pine_tall.png`, `tree_snow.png` i `sap_snow.png`, a ich ułożenie w `Scene.tsx:28`.
- Pliki paczki i sposób ich cięcia opisuje *Context* dokumentu `logowanie_na_tle_gry_loop2.md`.
- Budowanie kopiuje tylko pliki PNG leżące bezpośrednio w `assets/sprites/` (`scripts/static-files.mjs:32-46`), a do obrazu serwera wchodzą przez `.dockerignore:9` i `Dockerfile:10`.
- Paczka Pixel Crawler nie wymaga wzmianki, więc zadanie nie dopisuje jej do wzmianek, o ile kadr pochodzi tylko z tej paczki.
- Mapa Las ma 25 °C (`src/browser/sim/data/maps.ts:66`), a Las — głębiej 7 °C (`:84`).
- Szkic ekranu stoi w `rozpoznanie_mvp2\rozpoznanie_projektant.md`, części A.4, B.1 i B.2; to materiał, nie zatwierdzone wymaganie.
- Roboczy dokument zadania 4 (`ekrany_i_menu_loop2.md`) bierze na siebie adres `#/postac/{n}/przejscie` i przekazanie przejścia jako parametru.
- Plan, 2026-11-01: „cel zadania 6 mówi o nieruchomym kadrze lasu zamiast o miejscu sceny”, bo „sceny jeszcze nie ma, a pytanie o rozmiar rozstrzyga oglądanie”.
- Zadanie nie zmienia sposobu wdrażania ani miejsca działania gry.
