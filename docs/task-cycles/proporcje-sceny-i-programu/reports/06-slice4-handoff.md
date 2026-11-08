# Handoff 06-slice4 — executor of slice 4 (class same)

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator of `implement-task`; its go-ahead is provisional and never the human's approval. You never ask the human; questions go to the orchestrator in your report.

## Where you work
- Worktree (work from its root): `the worktree's root`, branch `task/proporcje-sceny-i-programu`. Base of this slice: `f9a5b866ee9ca66f8b88fa60c566f267d6b39837 (head after slice 3)`. You are the only agent writing in this worktree.
- Shell: Windows 11; Git Bash and PowerShell. Commit with `git add <path> …` by explicit paths, never `git add -A`, `git add .` or `git commit -a`; commit messages in English in the style of the repository's log (`feat: :sparkles: …`, `refactor: :recycle: …`, `test: :white_check_mark: …`, `docs: :memo: …`); end each message with the line `Co-Authored-By: Claude <noreply@anthropic.com>`; use `git commit -F <file>` when the message holds quotes. Do not push. Commit your work before you return.
- Before writing any script (even a one-off `python -c`), read `the author's global rule file on writing scripts` (line endings, console encoding, backslashes in Python literals).
- Do not run `npm test` without an argument (the full gate is the orchestrator's run). Run your slice's *Checks* one by one; `npm test -- <one test file>` runs one file.

## Method and stage
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole. Your variant: **a slice, or the retry of a slice** — read `.the-way/task-cycle/change/slice.md`; because the slice alters what a screen shows (where it does), read `.the-way/task-cycle/change/ui_check.md` before you finish.
- Stage and boundary: make slice 4 of the plan and nothing more; you never dispatch a subagent. A foundation entry is already written (commit `189d589` and the commits before this base); read the entries below as they stand. You write no foundation entry; if a sentence of an entry is wrong for the code, say so in the report.
- Full report path: `docs/task-cycles/proporcje-sceny-i-programu/reports/06-slice4-report.md` (report form of `make-change` section 6). Return only the status, the commits, a one-line check result naming what failed or did not run, and the report path.
- Your section of the plan is copied below word for word. You open neither the whole plan nor the whole task; the passages your *Read* names are copied after it.
- Slices 1–3 are made (commits a5aa424, 6ee2e7f, f9a5b86). Slice 3 left the grid of the screen of a map run as three columns with the values of the former scale 2 (`706px minmax(0,1fr) 336px` from 1276 px); you replace that grid. The real-browser check is yours: use the project skill `loop2-play` (`.claude/skills/loop2-play/SKILL.md`), read whole before you start; stop the game and any browser you started when you finish. Read each file you change whole before you change it (`make-change` section 1).
- **Added check, carried from slice 3:** slice 3 could not check in a browser that the badge over the mage (`.scene-badge`, its icon and its progress bar) is drawn at the size it had at the scale 2, because its map run had no running action. Do that check in your browser session, with a state that has a running action built as `loop2-play` gives in its section on composing a game state (`compose-state.mjs`), and report what you measured (the icon's side and the bar's thickness) beside your own checks. If you cannot reach a running action, say exactly why and mark the check unperformed.
- Measure the program column's width at a window 1280 px wide and report it as a measurement (the task's 526 px is arithmetic).

## Your slice (copied from `plan.md`, word for word)

### Slice 4 — The screen of a map run in two columns, the tabs under the map, the panel in the program

- **Goal:** Under its header the screen of a map run has two columns from a window width the slice
  computes from its columns (the world's 706 px, the 16 px gap, a program of at least 320 px and
  the page's padding; about 1074 px): on the left the world and, under it, below the drawing of the
  map and the line of a tile, the area with the tabs „Kronika” and „Teren”; on the right the program,
  as tall as the two areas together, taking the rest of the width (526 px in a window 1280 px wide).
  In a narrower window the three areas stand one under the other in the order world, program, tabs
  area. The areas stay three sections of their own in the DOM in that order (D-282); the stylesheet
  places the tabs area under the world by named grid areas, not by moving it in the DOM or by
  nesting it in the world's section. The screen no longer gives its program panel a host:
  `createRunScreen` does not call `placeRulePanel` and the screen's `RunScreenPanel` type no longer names it, the store of "rule panel open" with its
  `useSyncExternalStore`, the host element and the element that held it are gone, the tabs area is
  drawn whenever the screen has a state, whether a rule is open or not, and the rule panel of the
  copy opens under its row in the program panel by the path slice 1 made. The tab picked and the
  filter are the chronicle memory's as before (D-346) and an open rule changes neither. The old
  column of the right area (336 px, its class, the horizontal scroll for the table of revealed
  tiles) is replaced by the same scroll on the new area; the comments of the stylesheet that explain
  three columns are rewritten. The doc comments of `run-screen.tsx` and `right-area.tsx` and the
  names of the cases in the two test files speak of the area under the drawing, not of a right area;
  the module and component keep their names (see *Choices*). Tests first, failing before the change:
  in `tests/view/run-screen.test.mjs` the case of the three areas expects the tabs area third in the
  DOM with the tabs and the chronicle, the case of the open panel expects it inside the program
  panel under its row, the tabs standing beside it, and „✕” changing neither the tab nor the
  filter, and the cases of „Dodaj regułę z tym”, of a hovered tile and of the question at „Zakończ”
  follow; in `tests/view/end-question.test.mjs` the helper that renames a group finds the name field
  in the program panel.
- **Change:** `src/browser/view/run-screen.tsx` · `src/browser/view/right-area.tsx` · `src/browser/styles.css` · `tests/view/run-screen.test.mjs` · `tests/view/right-area.test.mjs` · `tests/view/end-question.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:23-30` Need
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:44-57` Pytanie 1 and Pytanie 2
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:71-75` Pytanie 6
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-126` Settlements to record, Out of scope
  · `foundations/decisions.md:6696-6750` D-311 · `foundations/decisions.md:6021-6046` D-282 · `foundations/decisions.md:7630-7654` D-346 · `foundations/decisions.md:414-442` D-19 · `foundations/decisions.md:7537-7570` D-343 · `foundations/decisions.md:5935-5984` D-280 · `foundations/decisions.md:912-926` D-43 · `foundations/decisions.md:6159-6194` D-288 · `foundations/decisions.md:7310-7344` D-336
  · Foundation entries Row 1 and Row 2
  · `foundations/part_map.md:3-28` browser-view
  · `foundations/glossary.md:18-23` map run · `foundations/glossary.md:248-252` chronicle
  · `foundations/invariants.md:459-468` browser-view-token-values · `foundations/invariants.md:469-478` browser-view-focus-outline
  · `src/browser/view/program-panel.tsx:131-181` ProgramPanel · `src/browser/view/world-area.tsx` · `src/browser/view/tile-table.tsx` · `tests/view/page-document.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** same — a layout across a shared stylesheet and a screen module with named grid areas, a one-column fallback and a check in a real browser; the arithmetic of the widths and the grid's row behaviour need judgment, and three test files change with it.
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/right-area.test.mjs` · `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/scene.test.mjs` · `npm run typecheck` · `npx eslint --max-warnings 0 src/browser/view/run-screen.tsx src/browser/view/right-area.tsx` · `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/run-screen.tsx src/browser/view/right-area.tsx src/browser/styles.css tests/view/run-screen.test.mjs tests/view/right-area.test.mjs tests/view/end-question.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py`; manual state check by `loop2-play` in a real browser: on a map run in a window 1280 × 720 px the world on the left with „Kronika” and „Teren” under the drawing and the line of a tile, the program on the right at about 526 px (measure it), a rule opened under its row with the tabs unchanged, „Dodaj regułę z tym” opening its panel under the new rule, the question „Zapisać, odrzucić, wrócić?” after „Zakończ” on fewer lines than the three of the base, a window narrower than the threshold showing world, program, tabs one under the other
- **Depends on:** Slice 3 · Foundation entries Row 1 and Row 2

## Foundation entries of your *Read* — current ranges in the worktree (these hold where the plan's ranges differ)

Read each whole, from its heading to the next `###`:

- `foundations/decisions.md:6712-6784` D-311
- `foundations/decisions.md:6022-6048` D-282
- `foundations/decisions.md:7665-7690` D-346
- `foundations/decisions.md:414-443` D-19
- `foundations/decisions.md:7572-7605` D-343
- `foundations/decisions.md:5936-5985` D-280
- `foundations/decisions.md:913-927` D-43
- `foundations/decisions.md:6161-6210` D-288
- `foundations/decisions.md:7344-7378` D-336
- `foundations/decisions.md:7767-7796` D-349 (new, written by the foundation step)

The other foundation ranges of the *Read* (`foundations/part_map.md`, `glossary.md`, `invariants.md`) are unchanged and as the plan gives them. Guideline files and code files of the *Read* are read whole.

## Passages of the frozen task named by your *Read* (word for word)

#### `docs/task-cycles/proporcje-sceny-i-programu/task.md:23-30` Need

```
### Need

- Na ekranie ręcznego przejścia scena ma 672 × 304 px, a program bierze to, co zostaje między obszarem świata a prawym obszarem: 174 px w oknie 1280 px i 270 px przy pełnej szerokości treści, 1344 px (rachunek w komentarzu `src/browser/styles.css:262-282`, 01b26d5).
- W tak wąskiej kolumnie reguły i przyciski programu zawijają się do kilku wierszy, a pytanie „Zapisać, odrzucić, wrócić?” łamie się przy oknie 1280 px na trzy wiersze (zrzut `docs/task-cycles/pytanie-przy-zakoncz/reports/fix1-question-running.png`, commit 2a19a53, prośba o scalenie #63).
- Odczuwa to Mariusz, gdy układa i czyta program w trakcie przejścia; na tym ekranie gracz spędza najwięcej czasu, a projekt jest oceniany po tym, czy program pisze się bez męczenia się (D-288, *Rationale*: „Writing a program without grimacing is what the project is judged by.”).
- Mariusz chce programu szerokiego jak w oryginalnym Loop (`the original Loop repository`), gdzie program bierze resztę szerokości między kolumną świata a prawą kolumną; celem jest szerokość programu, nie sam stosunek sceny do programu, bo w oryginalnym Loop scena ma 336 × 152 px, a tu zostaje dwa razy większa (pytanie kontrolne pod *Settlements to record*, wiersz 1).
- Każda nowa linia przy regule zawija się w wąskiej kolumnie coraz bardziej, a żadne z dalszych zadań planu MVP2 nie poszerza programu; bez zmiany ekran pisania programu byłby niewygodny już w pierwszej wersji gry.
- „Edycja reguł w widoku mobilnym jest mocno średnia” (Mariusz, 2026-11-08): w wąskim oknie panel stoi dziś pod całym programem na ekranie przejścia i pod całym edytorem na Programach; edycja w miejscu na liście, jak w starym Loop w węższym oknie, służy szerokiemu i wąskiemu oknu naraz (pytanie 1).
```

#### `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do

```
### To do

1. Na ekranie przejścia panel reguły albo grupy otwiera się w miejscu na liście, pod wierszem reguły albo grupy, którą zmienia, a kolumny programu i prawego obszaru łączą się w jedną kolumnę programu (pytanie 1).
2. W lewej kolumnie, pod rysunkiem mapy i linią kafelka, stoi obszar z zakładkami „Kronika” i „Teren”, z kroniką, jej filtrami i tabelą odsłoniętych kafelków, jak dziś w prawym obszarze; prawego obszaru już nie ma (pytania 2 i 5).
   - Wybór zakładki trzyma się jak dziś (D-346), a otwarty panel reguły nie zabiera już miejsca zakładkom.
   - W oknie za wąskim na dwie kolumny obszary stoją jeden pod drugim w dzisiejszej kolejności: świat, program, „Kronika” i „Teren” (D-282).
3. Na ekranie Programy otwarta reguła albo grupa nie dodaje trzeciej kolumny: panel otwiera się pod wierszem reguły albo grupy, tak jak na ekranie przejścia (pytanie 3).
4. Scena zostaje 672 × 304; kod, test i przewodnik stylu przestają trzymać drugi rozmiar, 336 × 152 (pytanie 1; dokument zadania 6, To do 6: „po uwadze Mariusza poprawka zostawia jeden z nich”, zapis cyklu ekran-przejscia, `docs/task-cycles/ekran-przejscia/task.md:42`, commit 2aae30a; `src/browser/view/world-area.tsx:33-37` i `src/browser/styles.css:262-268`, 01b26d5).
5. Przewodnik stylu mówi o nowym układzie tam, gdzie mówi o starym: o prawym obszarze przy kronice (`guidelines/styleguide-browser-view.md:626-628`) i o skali sceny (`guidelines/styleguide-browser-view.md:128-129`, `:596-597`), 01b26d5.
```

#### `docs/task-cycles/proporcje-sceny-i-programu/task.md:44-57` Pytanie 1 and Pytanie 2

```
- Pytanie 1. Jaki rozmiar ma scena na ekranie przejścia i czy zmienia się coś poza nim w podziale szerokości trzech obszarów?
  - Answer: D — scena zostaje 672 × 304, panel reguły otwiera się w miejscu na liście reguł, jak w starym Loop w węższym oknie, a kolumny programu i prawego obszaru łączą się w jedną; program ma wtedy 526 px w oknie 1280 px i 622 px przy treści 1344 px (rachunek: obszar świata 706 px, odstęp 16 px). Ta sama edycja w miejscu na liście służy też późniejszemu układowi na telefon.
  - Not chosen:
    - A. Scena 336 × 152, reszta podziału bez zmian (program 510 px w oknie 1280 px, 606 px przy treści 1344 px) — „A teraz to też jest zadanie, które nie rozwiązuje tego co chcę rozwiązać”.
    - B. Scena zostaje 672 × 304, nic się nie zmienia — program zostaje przy 174 px w oknie 1280 px i 270 px przy treści 1344 px, a każda nowa treść przy regule zawija się dalej.
    - C. Scena 3/4 albo 4/5 obecnej wielkości i treść szersza niż 1344 px, z prawą kolumną zawijaną pod świat w węższym oknie — pikselowy obraz przy skali 1,5 albo 1,6 ma nierówne piksele, a mag „drga” w ruchu; w oknie 1280 px przy trzech kolumnach program ma 342 px; zmienia limit szerokości treści z D-280; po zawinięciu panel reguły otwiera się pod całym obszarem świata.
    - Duża scena tylko w szerokim oknie, mała w węższym — pominięta w porównaniu: treść ma najwyżej 1344 px, więc przy dużej scenie program nigdy nie ma więcej niż 270 px i wariant i tak kończy się małą sceną.
  - Source: Mariusz, 2026-11-08, „D na teraz”, odpowiedź na porównanie dróg A, C i D w tej rozmowie; drogę D zaproponował Mariusz: „edycja reguł w widoku mobilnym jest mocno średnia i ostatecznie i tak trzeba ją zrealizować tak jak w oryginalnym loop w miejscu na liście - jeśli by to zastosować uniwersalnie dla widoku mobilnego i desktopowego to nie musimy zmniejszać sceny, tylko zmergować 2 i 3 kolumnę”. Stary Loop otwiera edycję pod wierszem reguły, dopóki ekran przejścia nie ma trzech kolumn, a na Programach — dwóch (`the original Loop repository, src/components/probe/RulesPanel.tsx:682-683`, cdc7c0d).
- Pytanie 2. Gdzie stoi to, co dziś pokazuje prawy obszar poza panelem reguły — zakładki „Kronika” i „Teren” z zadania 15, a potem koniec przejścia z zadania 16 — gdy kolumny programu i prawego obszaru łączą się w jedną?
  - Answer: W1 — w lewej kolumnie, pod obszarem świata, pod rysunkiem mapy i linią kafelka, stoi jeden obszar z zakładkami „Kronika” i „Teren” z zadania 15; miejsca końca przejścia to zadanie nie ustala (pytanie 6). Przyjęty koszt: w niskim oknie, np. 1280 × 720, kronika zaczyna się poniżej dolnej krawędzi okna i trzeba ją przewinąć.
  - Not chosen:
    - W2. Pod programem w połączonej kolumnie, jak stary Loop w węższym oknie — miejsce kroniki zależy od długości programu: przy kilku grupach zjeżdża daleko w dół i skacze, gdy gracz otwiera panel reguły albo zwija grupę.
    - W3. Trzy zakładki na górze połączonej kolumny, „Program | Kronika | Teren” — programu i kroniki nie widać naraz, a czyta się je razem, gdy gracz sprawdza, czemu postać zrobiła to, co zrobiła; do edycji trzeba wrócić na zakładkę „Program”.
  - Source: Mariusz, 2026-11-08, „W1”, odpowiedź na pytanie z drogami W1, W2 i W3 w tej rozmowie, z rekomendacją W1.
```

#### `docs/task-cycles/proporcje-sceny-i-programu/task.md:71-75` Pytanie 6

```
- Pytanie 6. Czy to zadanie ustala, gdzie stoi koniec przejścia z zadania 16, skoro D-311 odrzuca koniec przejścia nisko na ekranie: „the end of a map run below an open editor of a rule, as in loop — its buttons fall under the edge of the window”, a przy W1 koniec stałby pod całym obszarem świata, w oknie 1280 × 720 poniżej dolnej krawędzi?
  - Answer: E1 — nie; to zadanie przenosi pod świat tylko „Kronikę” i „Teren”, a miejsce końca przejścia wybiera zadanie 16, gdy będzie wiadomo, co koniec zawiera i ile zajmuje. Przyjęty koszt: zdanie definicji MVP2 „on the right one content at a time, the end of the map run first…” i tak trzeba zmienić, a miejsce końca staje się tam pytaniem otwartym dla zadania 16.
  - Not chosen:
    - E2. Koniec przejścia stoi pierwszy w obszarze pod światem, jak w pierwotnym brzmieniu W1 — w niskim oknie koniec jest pod dolną krawędzią, w miejscu, które D-311 odrzuciło przy starym Loop, a zadanie 16 dostaje to miejsce z góry.
  - Source: Mariusz, 2026-11-08, „E1”, odpowiedź na pytanie z drogami E1 i E2 w tej rozmowie, z rekomendacją E1; D-311 przy 01b26d5, *Rejected*.
```

#### `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-126` Settlements to record, Out of scope

```
## Settlements to record

Candidates: 5 shown, 3 accepted — 2026-11-08

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Panel reguły albo grupy otwiera się w miejscu na liście, pod wierszem reguły albo grupy, którą zmienia — na ekranie przejścia i na Programach. | decision | pytania 1 i 3; pytanie kontrolne do drogi D, 2026-11-08, z kotwicą z notatki, od której zaczęło się zadanie: „Mariusz powiedział tylko, że proporcje sceny i programu mają wyglądać jak w starym Loop” — czy celem jest szeroki program, a nie sam stosunek sceny do programu, i D zostaje? Mariusz: „tak” | czy na Programach panel zostaje obok edytora i czy na liście otwiera się pod wierszem, czy nad listą |
| 2 | Ekran przejścia ma pod nagłówkiem dwie kolumny: po lewej świat, a pod rysunkiem mapy zakładki „Kronika” i „Teren”; po prawej program. | decision | pytania 1, 2 i 6; pytanie kontrolne jak w wierszu 1 | gdzie stanąć zakładkom po zniknięciu prawego obszaru: pod światem, pod programem czy nad nim |
| 3 | Scena ma jeden rozmiar, 672 × 304, dwukrotność swojego obrazu. | decision | pytanie 1 („nie musimy zmniejszać sceny”), To do 4; pytanie kontrolne jak w wierszu 1 | czy zostawić przełącznik dwóch skal; dla jakiego rozmiaru zadania 17–20 robią efekty sceny |

## Out of scope

- Miejsce końca przejścia; wybiera je zadanie 16 (pytanie 6).
```
