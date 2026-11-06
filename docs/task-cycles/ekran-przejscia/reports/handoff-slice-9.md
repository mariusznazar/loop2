# Handoff — Slice 9 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 9; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `8bac89d` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-9.md`. If the harness refuses
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

What the earlier slices made, for you to assemble (all on the branch; read each file before relying on it):
- Slice 4: `ProgramPanel.addDiscoveredRule()` in `src/browser/view/program-panel.tsx`.
- Slice 5: `RunHeader({ state, controls })` in `src/browser/view/run-header.tsx` (`controls: StatusRowControls`), own classes `run-header-*`.
- Slice 6: `WorldArea({ state, hovered, onHover })` in `src/browser/view/world-area.tsx` with `SCENE_SCALE = 2` and `sceneSize(scale)` exported (the one place of the scene's size); `TileTable({ state, hovered, onHover })` in `src/browser/view/tile-table.tsx`; `TerrainDrawing` in `src/browser/view/terrain-drawing.tsx`; `tileLine` in `src/browser/view/tile-list.ts`. Classes `world-area`, `scene`, `world-drawing`, `tile-line`; `.scene` has `max-width: 100%`, `height: auto`, `image-rendering: pixelated`.
- Slice 7: `tests/invariants/test_terrain_drawing_numbers.py` scans for a built module that imports and renders `TerrainDrawing` (today `world-area.js`).
- Slice 8: `DiscoveryBand({ state, onAddRule, onResume })` in `src/browser/view/discovery-band.tsx`.
- No earlier slice has seen any of these in a real browser or taken a screenshot: your real-browser walk and screenshots are the first, and they must cover the header (spacing, name beside map name, the cut-plan warning in the row), the world area (`.scene` at both sizes, `.world-drawing`, `.tile-line`) and the band (its bar, wrapping of its two buttons).
- Screenshots go to `.runs/task-cycles/ekran-przejscia/screenshots/` (ignored); name each in your report. The other scene size is reached by changing `SCENE_SCALE` locally and building, never committed; restore it to 2 before your commit and check `git diff` shows it at 2.
- New rows of `guidelines/coding-browser-module.md` are Slice 12's; do not add them.
- Long lines of `guidelines/testing.md` can be cut by your reading tool; read them another way (e.g. `sed -n`) so the file is read whole.
- If this slice proves too large for you, return `returned` with where the size lies, as your method gives (the planner's suggested cut: stylesheet layout, real-browser checks and screenshots into a following slice).

## The slice's section of the plan, word for word (`plan.md`)

### Slice 9 — The screen of a map run in React, with its header and three areas

- **Goal:** `src/browser/view/run-screen.tsx` replaces `src/browser/view/run-screen.ts`, which this slice removes, keeping its boundary as `character-screen.tsx` keeps one: `createRunScreen(panel, controls)` returns `element`, `update(state, run, events)` and `focus()`, makes its own root, draws its first render synchronously, and is updated only from event handlers and the clock, never from render or an effect. It takes its map run as a parameter and reads no map run of the game state by itself (D-281): it draws from a game state with the given map run in place and hands the program panel that state, as today. It draws the header of Slice 5 over three areas side by side, each a `screen-area` element a narrower layout can rearrange (D-282): the world on the left (`WorldArea` of Slice 6); the program in the middle — the band of Slice 8 above the program panel's element, which keeps its own root and which the screen puts into its area by a layout effect that takes it out again at cleanup; and on the right one content at a time — the table of revealed tiles of Slice 6, or the rule panel while a rule or a group is open, the screen giving the panel an element of the right area through `placeRulePanel` and showing the table or that element by `onOpen` (task item 3); the end of the map run takes no part of the right area. The screen holds the hovered tile's key for the drawing, its line and the table. „Dodaj regułę z tym” calls `addDiscoveredRule()` of the panel (Slice 4), and „Wznów” of the band `controls.togglePause`. In `src/browser/styles.css`: the grid of the screen under its header; the widths of the world area and of the right area and the window width from which the three areas stand side by side are layout dimensions (D-43), chosen from the scene's width, the width the rule panel of task 5 takes and the content of at most 1344 px (D-280), with the arrangement below that width; name each in a comment of the stylesheet and in the report, for both scene sizes. The switch of the scene's size stays in one place, the exported constant of the scene's scale of Slice 6: the stylesheet may hold the rules of both sizes keyed by an attribute or class the screen sets from that constant, so that the correction after the human's choice changes that constant and deletes the rules of the size not chosen; the committed value stays 2. Remove the rules of the old column layout nothing uses any more. The DOM forms of the status row, body row, combat line, trip lines and terrain panel stay in their modules, unused; Slices 10 and 11 remove them. Write the cases first in a new `tests/view/run-screen.test.mjs` on the harness: the header above the three areas in the order world, program, right, each an area of its own; the band above the program panel; the screen drawing the map run it was given, not the game state's (the case of `tests/view/account-screen.test.mjs` at line 4012 at the base moves here or follows the new structure); an open rule panel standing in the right area in the place of the table, the table back at „✕”, the drawing staying in the world area (the case at line 4058 moves here); at the first chill „Dodaj regułę z tym” adding „Zawsze → Eksploruj” into the copy with the panel open in the right area on the action field and the streak at zero; a hovered tile of the drawing marking its row in the table of the right area. In `tests/view/account-screen.test.mjs` the other cases that read the old structure (the classes of the status row, the terrain panel and its host) follow the new one, each changed case naming its cause, task items 2, 3 and 8. Then operate the built game in a real browser as `.claude/skills/loop2-play/SKILL.md` gives (D-88, D-254) and report what was seen: hovering a tile marks its row and the line under the drawing shows its numbers, and hovering a row marks the tile; a rule opened stands in the right area; at the first chill the band shows both buttons, „Dodaj regułę z tym” opens the panel on the action and „Wznów” goes on; three areas side by side in a window 1920 px wide and the narrower arrangement below the threshold. Take screenshots into `.runs/task-cycles/ekran-przejscia/screenshots/`, which git ignores: for each scene size, 336 × 152 and 672 × 304 — the other size reached by changing the constant locally and building, never committed — the screen in a window 1920 px and 1280 px wide with the editor of task 5 showing the copy's rules in the program area, and one more of each size with a rule panel open in the right area; name each file in the report.
- **Change:** `src/browser/view/run-screen.tsx` · `src/browser/view/run-screen.ts` · `src/browser/styles.css` · `tests/view/run-screen.test.mjs` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:15-57` Description · `.runs/task-cycles/ekran-przejscia/task.md:61-65` Questions to settle · `.runs/task-cycles/ekran-przejscia/task.md:72-83` Questions to settle · `.runs/task-cycles/ekran-przejscia/task.md:115-148` Context · `.runs/task-cycles/ekran-przejscia/task.md:243-253` Out of scope ·
  `foundations/decisions.md:5860-5903` D-280 · `foundations/decisions.md:5904-5936` D-281 · `foundations/decisions.md:5937-5961` D-282 · `foundations/decisions.md:5962-5980` D-283 · `foundations/decisions.md:5981-6000` D-284 · `foundations/decisions.md:39-51` D-03 · `foundations/decisions.md:5411-5452` D-265 · `foundations/decisions.md:5481-5509` D-267 · `foundations/decisions.md:897-911` D-43 · `foundations/decisions.md:5379-5410` D-264 · `foundations/decisions.md:1591-1616` D-87 and D-88 · `foundations/decisions.md:5140-5168` D-254 · `foundations/decisions.md:6072-6107` D-288 · `foundations/decisions.md:3026-3045` D-166 · `foundations/decisions.md:2203-2238` D-122 · `foundations/decisions.md:402-427` D-19 · `foundations/decisions.md:5637-5661` D-272 · `foundations/decisions.md:5555-5580` D-269 · `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:459-478` browser-view-token-values and browser-view-focus-outline · `foundations/invariants.md:499-508` application-build-kitchen-sink ·
  Foundation entries E2, E3, E4, E9, E11, E15, E16 ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `tests/view/page-document.mjs` · `src/browser/view/character-screen.tsx` · `src/browser/view/game-view.ts:181-232` · `src/browser/view/game-view.ts:326-350` · `src/browser/view/game-view.ts:544-556` · `src/browser/view/program-panel.tsx:116-140` · `src/browser/view/program-panel.tsx:636-746` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** strongest — it chooses and names the layout dimensions of three areas for two scene sizes, and joins the program panel's own React root and the portal of its rule panel into the screen's root
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen.test.mjs`, its cases seen failing first; `npm test -- tests/view/account-screen.test.mjs`; `npm test -- tests/view/program-panel.test.mjs`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/invariants/test_terrain_drawing_numbers.py`; `npm test -- tests/invariants/test_application_build_kitchen_sink.py`; `npm test -- tests/quality/test_node_test_selection.py`; `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`; the real-browser checks and screenshots above
- **Depends on:** Slice 4 · Slice 5 · Slice 6 · Slice 7 · Slice 8 · Foundation entries E15, E16

## What you read

The ranges below are current at 8bac89d; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-280 — `foundations/decisions.md:5870-5913`
- D-281 — `foundations/decisions.md:5914-5946`
- D-282 — `foundations/decisions.md:5947-5971`
- D-283 — `foundations/decisions.md:5972-5990`
- D-284 — `foundations/decisions.md:5991-6010`
- D-03 — `foundations/decisions.md:39-51`
- D-265 — `foundations/decisions.md:5419-5460`
- D-267 — `foundations/decisions.md:5489-5517`
- D-43 — `foundations/decisions.md:899-913`
- D-264 — `foundations/decisions.md:5387-5418`
- D-87 — `foundations/decisions.md:1593-1605`
- D-88 — `foundations/decisions.md:1606-1618`
- D-254 — `foundations/decisions.md:5148-5176`
- D-288 — `foundations/decisions.md:6082-6117`
- D-166 — `foundations/decisions.md:3035-3054`
- D-122 — `foundations/decisions.md:2205-2244`
- D-19 — `foundations/decisions.md:402-429`
- D-272 — `foundations/decisions.md:5645-5671`
- D-269 — `foundations/decisions.md:5563-5588`
- browser-view-framework — `foundations/invariants.md:35-44`
- browser-view-token-values — `foundations/invariants.md:459-468`
- browser-view-focus-outline — `foundations/invariants.md:469-478`
- application-build-kitchen-sink — `foundations/invariants.md:499-508`

### Entries written by the cycle's foundation step

- E2 — D-19 (rewritten whole in the projected wording) — read it whole in `foundations/decisions.md` — `foundations/decisions.md:402-429`
- E3 — D-311 — new, „How is the screen of a map run laid out?”, read it whole — `foundations/decisions.md:6619-6654`
- E4 — D-311 — row 1 written into the same entry, read it whole — `foundations/decisions.md:6619-6654`
- E9 — D-122 (part rewritten: the band) — read it whole — `foundations/decisions.md:2205-2244`
- E11 — D-313 — new, „What does „Dodaj regułę z tym” do?”, read it whole — `foundations/decisions.md:6696-6732`
- E15 — D-282 (Verification example) — read it whole — `foundations/decisions.md:5947-5971`
- E16 — D-281 — confirmed, unchanged — `foundations/decisions.md:5914-5946`

### Files (whole unless a range is given)

- `src/browser/AGENTS.md`
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `tests/view/page-document.mjs`
- `src/browser/view/character-screen.tsx`
- `src/browser/view/game-view.ts:181-232`
- `src/browser/view/game-view.ts:326-350`
- `src/browser/view/game-view.ts:544-556`
- `src/browser/view/program-panel.tsx:116-140`
- `src/browser/view/program-panel.tsx:636-746`
- `.claude/skills/loop2-play/SKILL.md`

### Passages of the frozen task, word for word (`.runs/task-cycles/ekran-przejscia/task.md`)

#### task.md:15-57 — Description

## Description

### Need

- Ekran ręcznego przejścia to dziś panel programu i jedna kolumna, w której jeden pod drugim stoją wiersz stanu, odkrycie, zapis starcia, wiersz ciała, plecak, rysunek mapy i tabela kafelków (`src/browser/view/game-view.ts:255-266`).
- Nic na tym ekranie nie pokazuje świata gry poza rysunkiem mapy.
- Mariusz: „obecnie gra jest strasznie nieczytelna, gdzie loop pod tym względem było dużo dalej”, a najbardziej chodzi mu o „podział na ekrany, układ elementów, interfejs tworzenia programu, animację ludzika”.
- Definicja projektu wymienia „czytelnym ekranem przejścia” w swoim celu.
- Cel zadania w planie: „Ekran ręcznego przejścia ma pod jednym nagłówkiem, z celem mapy w liczbach, świat po lewej, program pośrodku i jedną treść naraz po prawej, a w obszarze świata stoi nieruchomy kadr lasu, na którym wybrano rozmiar sceny.”
- Zadanie 7 stawia w tym kadrze maga, więc potrzebuje wybranego rozmiaru sceny.

### To do

1. Nad obszarami ekranu przejścia stoi jeden nagłówek: imię postaci, nazwa mapy, a za nimi cały dzisiejszy wiersz stanu bez zmiany brzmienia (pytanie 3).
   - Wiersz stanu to tekst „Minuta {minuta} · {czynność} · Passa {streak}/{required}”, z „ (pauza)” na końcu w pauzie, oraz „Pauza” albo „Wznów”, pięć przycisków tempa, „Restart”, ostrzeżenie o przyciętym planie i „Zakończ”, w dzisiejszej kolejności.
   - Cel w liczbach to „Passa {streak}/{required}” i „Pokonane napaści {count}/{required}”, w tej kolejności, gdy warunek mapy ma oba wymagania.
2. Pod nagłówkiem stoją obok siebie trzy osobne obszary: świat po lewej, program pośrodku i jedna treść naraz po prawej, a każdy z nich jest elementem, który węższy układ może przestawić.
3. W prawym obszarze stoi panel reguły z zadania 5, gdy gracz edytuje regułę, a w pozostałych chwilach tabela odsłoniętych kafelków.
   - Koniec przejścia nie zajmuje prawego obszaru (pytanie 4).
4. Obszar świata ma od góry kadr lasu, zapis ostatniego starcia, linie końca przejścia, wiersz ciała z plecakiem, rysunek mapy i linię kafelka (pytanie 4).
   - Linie końca przejścia to „Do skrzynki: …” albo „Do skrzynki nic nie trafiło.” po rozwiązaniu mapy i zdanie o wskrzeszeniu po śmierci postaci; stoją pod zapisem starcia, gdy on jest.
   - Linie „Mapa jest już rozwiązana…”, „Wprawa w tym przejściu…” i „Wyniesie…” stoją jak dziś między plecakiem a rysunkiem mapy.
5. Pod rysunkiem mapy stoi linia kafelka z liczbami zapasu kafelka wskazanego kursorem, a bez wskazania kafelka postaci.
   - Liczby dalej nie stoją na samym rysunku.
   - Najechanie dalej wiąże kafelek z jego wierszem w tabeli, gdy tabela stoi.
6. Na górze obszaru świata stoi nieruchomy kadr lasu w śniegu, w pełnym świetle (pytanie 2).
   - Kadr jest obrazem PNG z paczki Pixel Crawler, leży bezpośrednio w `assets/sprites/` i nie stoi na nim żaden tekst.
   - Prośba o scalenie pokazuje kadr na prawdziwym ekranie, z edytorem z zadania 5 w obszarze programu, w obu rozmiarach, 336 × 152 i 672 × 304; po uwadze Mariusza poprawka zostawia jeden z nich (pytanie 1).
7. Linia odkrycia staje się pasem w roli `discovery` nad programem, z tym samym tekstem o odkryciu, z „Dodaj regułę z tym” i z „Wznów”.
   - Pas stoi do „Wznów”, a gdy przejście kończy się rozwiązaniem mapy w minucie odkrycia, do „Restart” albo „Zakończ”.
   - „Dodaj regułę z tym” dodaje regułę na końcu pierwszej grupy kopii i otwiera jej panel z pierwszą odkrytą czynnością, a gdy żadnej czynności nie odkryto, z pierwszym odkrytym warunkiem; gdy odkryto sam przedmiot albo stworzenie, działa jak „+ reguła” (pytanie 5).
   - Przy odkrytej czynności reguła ma warunek „Zawsze”, a gdy czynność potrzebuje celu, celem jest pierwszy pasujący przedmiot z tego samego odkrycia, a bez takiego pierwszy cel z siatki; „Odkryto: Zbierz, Patyk.” daje „Zawsze → Zbierz — patyk” (pytanie 10).
   - Przy samym warunku reguła to „{warunek} → Eksploruj”, a liczba i cel tego warunku są takie, jakie daje wybór tego warunku w panelu reguły z zadania 5 (odczytanie z pytania 10).
   - Panel otwiera się na polu, które przycisk wypełnił z odkrycia; gdy wypełnił z niego czynność i jej cel, otwiera się na polu czynności, pierwszym z nich w kolejności pól panelu, jak mówi pytanie 5 (odczytanie z pytań 5 i 10).
   - Dodanie reguły tym przyciskiem zeruje passę, jak każda zmiana reguł kopii (D-131).
   - Gdy w tej minucie gra dopisała regułę, pas mówi „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”, bez numeru reguły (pytanie 6).
   - „{nazwa grupy}” to nazwa grupy kopii, do której gra wpisała regułę, bo pas stoi nad programem przejścia, czyli nad kopią; gdy kopia nie miała grupy, to „Program” (D-123 w definicji; odczytanie z pytania 6).
   - „Wznów” w nagłówku działa dalej obok „Wznów” w pasie, bo oba robią to samo jedno wznowienie (D-122).
8. Ekran przejścia jest ekranem w React i dalej dostaje przejście jako parametr, zamiast sam czytać je ze stanu gry.
   - Przyciski nagłówka i pasa są wspólnymi kontrolkami w postaci React (D-265).
   - „Restart” i „Zakończ” biorą postać React przycisku niszczącego, którą dokłada zadanie 4; gdyby jej przy starcie cyklu nie było, dokłada ją to zadanie z przypadkiem w teście porównującym obie postaci.
9. `guidelines/coding-browser-module.md` dostaje wiersze nowych plików, a jego przykład „Kontrolki w DOM i ich aktualizacja”, który stoi na `src/browser/view/status-row.ts`, wskazuje moduł, który po tej zmianie dalej jest w DOM; zmiany idą przez `the-way-maintain-coding-guidelines`.
10. Fundament dostaje wszystko, co *Decisions in play* oznacza do zapisania w tym zadaniu, poprawiony przykład D-46 oraz zdania o miejscu w D-147, D-185 i D-216 (pytanie 7).

#### task.md:61-65 — Questions to settle

- Pytanie 1. Jaki rozmiar ma scena, 336 × 152 czy 672 × 304, i kiedy człowiek go wybiera, skoro „Rozstrzyga oglądanie sceny w układzie ekranu”?
  - Answer: Cykl stawia kadr na prawdziwym ekranie z nowym edytorem, prośba o scalenie pokazuje oba rozmiary, a poprawka po uwadze Mariusza zostawia jeden. Koszt przyjęty z tą drogą: jedna runda uwag przed scaleniem, która trzyma kolejne zadanie. Gdy wybór padnie na 336 × 152, słowa „Scena większa” w definicji i „W większej scenie” w celu zadania 7 idą do zmiany w swoich procesach, bo stary Loop ma scenę tej wielkości.
  - Not chosen:
    - wybór teraz, bez oglądania ekranu — odejście od zdania definicji i ryzyko, że wybór się nie utrzyma
  - Source: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, odpowiedź na pakiet rundy zadań 4–7, punkt B12, rekomendacja A; pytanie wspólne z zadaniem 7. Pytanie: definicja_mvp2_loop2.md (odcisk 9641f804), *Open questions*, wiersz 96: „Jaki rozmiar ma scena: 336 × 152 czy 672 × 304? Rozstrzyga oglądanie sceny w układzie ekranu. — resolved in: task: ekran przejścia”. Skutek dla 336 × 152: pakiet, część D, przyjęta tą samą odpowiedzią.

#### task.md:72-83 — Questions to settle

- Pytanie 3. Gdzie do zadania 14 stoi to, co postać robi, i gdzie stoją „Restart”, ostrzeżenie o przyciętym planie i „Zakończ”?
  - Answer: Cały wiersz stanu przechodzi do nagłówka bez zmiany brzmienia, a przed nim stają imię postaci i mapa; „Restart” i „Zakończ” stoją w nim jak dziś. Zegar czyta się dalej „Minuta 212”. Pozycja „Wróć do przejścia” stoi w menu tylko poza ekranem przejścia, więc w nagłówku jej nie ma. Słaby punkt przyjęty z tą drogą: długi nagłówek do zadania 14.
  - Not chosen:
    - nagłówek bez czynności, a pod kadrem osobny wiersz z tym, co postać robi — część pracy zadania 14 i zmiana planu
    - zegar w zapisie „03:32” — nowy zapis czasu
    - „Wróć do przejścia” także na ekranie przejścia — odnośnik do miejsca, w którym gracz już jest
  - Source: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, punkt B16, rekomendacja „A, C, E, czyli „Wróć do przejścia · Las · minuta 212””; pytanie wspólne z zadaniem 4.
- Pytanie 4. Gdzie do zadania 16 stoją linie końca przejścia i zapis ostatniego starcia?
  - Answer: W obszarze świata, między kadrem a wierszem ciała; prawy obszar nie przejmuje końca przed zadaniem 16.
  - Not chosen:
    - linie końca w prawym obszarze już w tym zadaniu, droga pokazana na wypadek skreślenia cytatów — część zadania 16 i większe zadanie przed terminem
  - Source: cytaty nieskreślone przez Mariusza 2026-11-03, pakiet rundy, punkt A5: plan_mvp2_loop2.md (sha256 36c4721a), cel zadania 16: „Koniec przejścia w prawym obszarze mówi kolejno, co się stało, co to kosztowało albo dało, dlaczego i co dalej”, i wiersz wpisu „(new) — What does the end of a map run explain? | 16 | 16”; foundations/decisions.md przy 20d804b, D-185: „stands below the discovery line and last-encounter paragraph when present and above the body and backpack, directly below the status row when neither is present, until „Restart” or „Zakończ”.”; definicja_mvp2_loop2.md (odcisk 9641f804), wiersz 226: „The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with the minutes each need lasts, the backpack, the drawing of the map and the line of a tile under it.”

#### task.md:115-148 — Context

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

## Questions carried to cycle

- Jak złożyć kadr z kawałków paczki i czy skrypt składający wchodzi do repozytorium?
- Jaką szerokość mają obszary świata i prawy, skoro program bierze resztę?
- Od jakiej szerokości okna trzy obszary stoją obok siebie, skoro dziś kolumny składają się dopiero poniżej 720 px?
- Jak symulacja mówi widokowi o regule, którą dopisała, i o grupie, do której ją wpisała, i czy zmienia to kształt zapisu gry? Plan: „każde zadanie, które zmienia kształt stanu gry, podbija wersję raz w swojej zmianie”.

#### task.md:243-253 — Out of scope

## Out of scope

- „Teraz”, „Potem”, prognozę potrzeb i pasek celu robi zadanie 14.
- Koniec przejścia w prawym obszarze robi zadanie 16.
- Maga, ruch, ikonę zajęcia i szarość sceny przy pauzie robi zadanie 7.
- Noc i świt nad kadrem robi zadanie 18.
- Kronikę i zakładki prawego obszaru robi zadanie 15.
- Stan i powód przy regule robi zadanie 11.
- Nowy edytor i panel reguły robi zadanie 5.
- Adresy, menu z „Wróć do przejścia” i pauzę przy wyjściu z ekranu robi zadanie 4.
- Układ na telefon: zadanie tylko zostawia na niego miejsce.
