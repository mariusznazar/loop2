# Handoff — Slice 7 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 7; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `eca76c8` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-7.md`. If the harness refuses
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

- Slice 6 (commit `eca76c8`) wrote `src/browser/view/terrain-drawing.tsx`: `TerrainDrawing({ state, hovered, onHover })`, an SVG with tiles `g[data-tile]`, icons, outlines and `outline link-highlight` last; no text; `terrainPicture` computed in render, so a game state can be passed straight in. The line of a tile (`p.tile-line`) and the table stand outside it.
- The invariant's sentence as the foundation step left it (E18) is at the current head of `foundations/invariants.md`, `terrain-drawing-numbers`; the docstring quotes that sentence.
- Long lines of `guidelines/testing.md` can be cut by your reading tool at ~1800 characters; read them another way (e.g. `sed -n`) so the file is read whole.

## The slice's section of the plan, word for word (`plan.md`)

### Slice 7 — The check of terrain-drawing-numbers reads the drawing the screen will draw

- **Goal:** `tests/invariants/test_terrain_drawing_numbers.py` builds the drawing of the game map with the React component of `src/browser/view/terrain-drawing.tsx` (Slice 6), from the built `dist/browser/view/terrain-drawing.js`, in place of `createTerrainPanel()`; it keeps its states (the game before a send, minute 0, every 20th minute to 240, the stock set to 0), its reading of what the drawing shows (every text node, `title` and `desc`, the attributes of `SHOWN_ATTRIBUTES`, the text `aria-labelledby` and `aria-describedby` point at) and its controls, each control seen failing once on a drawing made to show a stock. The scan checks that a built module of the view other than `terrain-drawing.js` imports and renders the component. The drawing is the component's element alone: the line of a tile under it and the table of revealed tiles stand outside it and outside the reading, since D-19 puts the numbers in the list and in that line, never on the drawing; the docstring says so and names D-19 (task *Context*; `guidelines/testing.md`, „Changing an existing test”) as the cause of the change, and quotes the invariant's sentence as the foundation step left it (E18). Draw the component either with `renderToStaticMarkup` of `react-dom/server` in the Node script the check writes, read back as a tree, or on the document imitation; a script outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it (`guidelines/testing.md`, „Tests on a document imitation”).
- **Change:** `tests/invariants/test_terrain_drawing_numbers.py`
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:37-39` To do · `.runs/task-cycles/ekran-przejscia/task.md:115-141` Context ·
  `foundations/decisions.md:402-427` D-19 · `foundations/decisions.md:1604-1616` D-88 · `foundations/decisions.md:5379-5410` D-264 · `foundations/decisions.md:5510-5554` D-268 · `foundations/invariants.md:355-364` terrain-drawing-numbers · `foundations/invariants.md:1189-1198` document-test-memory-limit ·
  Foundation entries E2, E18 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `tests/invariants/loop2_invariant_support.py` · `tests/invariants/program_fixture.py` · `tests/view/memory-limit.mjs` · `src/browser/view/terrain-panel.ts`
- **Model:** same — it changes how an invariant's check builds what it reads, across Python and a Node script it writes, while its reading and its controls stay
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_terrain_drawing_numbers.py`, with each control seen failing once on a made-up drawing that shows a stock; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 6 · Foundation entries E2, E18

## What you read

The ranges below are current at eca76c8; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-19 — `foundations/decisions.md:402-429`
- D-88 — `foundations/decisions.md:1606-1618`
- D-264 — `foundations/decisions.md:5387-5418`
- D-268 — `foundations/decisions.md:5518-5562`
- terrain-drawing-numbers — `foundations/invariants.md:355-364`
- document-test-memory-limit — `foundations/invariants.md:1189-1198`

### Entries written by the cycle's foundation step

- E2 — D-19 (rewritten whole in the projected wording) — read it whole in `foundations/decisions.md` — `foundations/decisions.md:402-429`
- E18 — invariant terrain-drawing-numbers (sentence reworded) — read it whole in `foundations/invariants.md` — `foundations/invariants.md:355-364`

### Files (whole unless a range is given)

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `tests/invariants/loop2_invariant_support.py`
- `tests/invariants/program_fixture.py`
- `tests/view/memory-limit.mjs`
- `src/browser/view/terrain-panel.ts`

### Passages of the frozen task, word for word (`.runs/task-cycles/ekran-przejscia/task.md`)

#### task.md:37-39 — To do

5. Pod rysunkiem mapy stoi linia kafelka z liczbami zapasu kafelka wskazanego kursorem, a bez wskazania kafelka postaci.
   - Liczby dalej nie stoją na samym rysunku.
   - Najechanie dalej wiąże kafelek z jego wierszem w tabeli, gdy tabela stoi.

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
