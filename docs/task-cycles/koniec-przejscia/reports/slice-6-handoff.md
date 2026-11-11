# Handoff — slice 6 of the task koniec-przejscia

You make one slice of a planned change. Work from the worktree  (branch `task/koniec-przejscia`; run every command from its root, never touch the main checkout `a repository on the author's disk`). Another agent reviews it afterwards; the cycle's orchestrator runs the product's gate, you do not.

## Delegation

The human who requested this cycle delegated intermediate choices to the orchestrator; your questions go to it in your report (status `questions` or `blocked`). Nothing you decide is the human's approval.

## Method and variant

Read whole `.the-way/task-cycle/change/SKILL.md`. Your variant is "a slice, or the retry of a slice": read `.the-way/task-cycle/change/slice.md` for how to read the plan and the task. Read `.the-way/task-cycle/change/ui_check.md` when you alter what a screen shows (section 3), and the other files that `SKILL.md` names only when the step that names them comes.

## Stage and boundary

Stage: slice 6 of the plan; boundary: the slice's own goal and its files (*Change*). The base of the slice is `87558d2` (`git rev-parse HEAD`). Commit your work on this branch by path (never `git add -A`), commit messages in English in the form of the repository's history. Report path: `docs/task-cycles/koniec-przejscia/reports/slice-6-report.md`.

## Answers of the cycle's start

- Trust boundary: yes — `src/browser/sim/saved-game.ts` is a trust boundary of the part `simulation`.
- Irreversible operation: no.
- No spec; no move of the pin.
- Checks failing on the base (before any change): `tests/account-mail.test.mjs:350` "a server that stops answering yields failed within the shortened deadline and loses the connection" failed in one whole run and passes alone (a timing-dependent test, not yours); two tests of `tests/quality` failed only because the worktree had no `.runs/quality-venv` (now present). Everything else passed. Do not run the gate.
- The foundation entries of the task are written (commits `e0fd091`, `c730482`): the plan's "(new)" entry is D-362 and the changed decisions are in the tree as you read them now.

## Your slice, copied word for word from the plan

### Slice 6 — The styleguide rule about the window

- **Goal:** `guidelines/styleguide-browser-view.md` gains the rule about the end-of-run window, the first window over a game screen, written through the project skill `the-way-maintain-styleguide` (To do 12): how it covers the screen (the screen and its header are not shown while it stands, the menu bar and the row under it stay above and work), how it closes („✕”, Escape, the buttons that leave the screen, the question „Zapisać, odrzucić, wrócić?” closing it) and how the header's „Koniec przejścia” opens it again, and how its title, sections, bar of time and buttons use the roles of the Roles table, the font of the shared button and the shared controls; plus the one thing the bar of time still lacks, as the executor of Slice 3 reported it. The rule follows the shape of the rules of the file and cites the decisions that the foundation rows wrote; the file is changed by that skill and by no other way, and the skill's check of the guidelines passes (`python -B .the-way/elements/common/foundation_check.py`). The executor reads the window's component `src/browser/view/end-window.tsx` and its rules in `src/browser/styles.css` as Slices 3 and 4 left them.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/koniec-przejscia/task.md:45-45` To do · `docs/task-cycles/koniec-przejscia/task.md:50-58` Question 1 · `docs/task-cycles/koniec-przejscia/task.md:100-104` Question 9 · `docs/task-cycles/koniec-przejscia/task.md:139-143` Questions carried to cycle · `foundations/decisions.md:853-866` D-39 · `foundations/decisions.md:913-926` D-43 · `foundations/decisions.md:928-941` D-44 · `foundations/decisions.md:973-986` D-47 · `foundations/decisions.md:3182-3195` D-173 · `foundations/decisions.md:5826-5851` D-275 · `foundations/decisions.md:5853-5889` D-276 · `foundations/decisions.md:6110-6133` D-285 · `foundations/decisions.md:6734-6805` D-311 · row (new) — What does the end of a map run explain? · row D-311 · row D-122 · row Row 1 · row Row 2 · `foundations/part_map.md:3-28` browser-view · `foundations/invariants.md:459-497` browser-view-token-values, browser-view-focus-outline, design-token-contrast, design-token-sources · `guidelines/coding.md` · `src/browser/AGENTS.md` · `src/browser/tokens.css`
- **Model:** same — a new kind of rule in the styleguide, written from what was built
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_design_token_contrast.py` · `node node_modules/prettier/bin/prettier.cjs --check guidelines/styleguide-browser-view.md`
- **Depends on:** Slice 3 · Slice 4 · Foundation entries rows (new), D-311, Row 1, Row 2

## Current ranges of the foundation entries named in *Read*

The foundation step wrote entries after the plan, so the ranges in the *Read* above moved; the current ones hold. Read each whole, its identifier is its address.

- D-39: foundations/decisions.md:853-866
- D-43: foundations/decisions.md:913-926
- D-44: foundations/decisions.md:928-941
- D-47: foundations/decisions.md:973-986
- D-173: foundations/decisions.md:3212-3225
- D-275: foundations/decisions.md:5872-5897
- D-276: foundations/decisions.md:5899-5935
- D-285: foundations/decisions.md:6156-6179
- D-311: foundations/decisions.md:6780-6866
- the plan's row (new) is D-362: foundations/decisions.md:8149-8162
- the plan's row D-311: the entry as written, foundations/decisions.md:6780-6866
- the plan's row D-122: the entry as written, foundations/decisions.md:2231-2286

## Passages of the task named in *Read*, copied word for word

#### task.md:45-45 To do

12. Przewodnik stylu (`guidelines/styleguide-browser-view.md`) dostaje regułę o oknie końca przejścia — pierwszym oknie nad ekranem gry: jak przykrywa ekran, jak się zamyka, jak jego tytuł, sekcje, pasek czasu i przyciski używają ról, czcionki i wspólnych kontrolek; zmiany idą przez `the-way-maintain-styleguide`.

#### task.md:50-58 Question 1

- Pytanie 1. Gdzie na ekranie przejścia stoi koniec przejścia, skoro prawego obszaru już nie ma (pytanie otwarte definicji i planu, przypisane zadaniu 16)?
  - Answer: W oknie nad ekranem przejścia. (a) Okno otwiera się samo przy końcu przejścia, po efekcie końca z zadania 19, żeby efekt było widać; do zadania 19 otwiera się od razu. (b) Przykrywa ekran przejścia razem z nagłówkiem, przewija się samo w sobie, a jego przyciski stoją na stałe u jego dołu. (c) Przyciski w oknie: „Restart” z ostrzeżeniem o przyciętym planie wyprawy (D-188), „Zakończ” i po rozwiązaniu „Otwarte: Las — głębiej →” (pytanie 3). (d) „✕” albo Escape zamyka okno i odsłania ekran: scenę, program z licznikami i nagłówek z „Restart” i „Zakończ” jak dziś; nagłówek dostaje przycisk „Koniec przejścia”, który otwiera okno znowu. (e) Okno otwiera się znowu przy każdym wejściu na ekran zakończonego przejścia, także po przeładowaniu strony. (f) „Dodaj regułę z tym” w oknie (pytanie 5) zamyka okno i otwiera panel reguły pod wierszem reguły. Pod oknem scena zostaje ze światłem w pełnym złocie po rozwiązaniu, które D-132 w definicji każe pokazać, a „✕” ją odsłania, więc droga nie zmienia definicji. Koszty, które człowiek przyjął: okno zasłania scenę, D-311 dostaje zdanie o oknie, a klawiatura, Escape i powrót do okna są do zbudowania. Czy okno przykrywa pasek menu: pytanie 9; co robi okno, gdy staje pytanie „Zapisać, odrzucić, wrócić?”: pytanie 10.
  - Not chosen:
    - A. Na górze kolumny programu, nad pasem odkrycia, pytaniem „Zakończ” i kopią programu, z ograniczoną wysokością i własnym przewijaniem — program zjeżdża w dół o wysokość końca, reguły, które nie zadziałały, czyta się nad programem, a nie obok; w jednej kolumnie (okno węższe niż 1074 px) koniec stoi pod całym światem, w miejscu, które D-311 odrzuca. Człowiek: „jakoś nie kupuję tego, żeby to miało wskoczyć gdzieś w jakieś miejsce w którym do tej pory było coś innego”.
    - A2. Od 1074 px jak A, a w jednej kolumnie nad światem, tuż pod nagłówkiem — w wąskim oknie scena i efekt rozwiązania stoją pod końcem; jedno miejsce więcej w siatce układu i zdanie o nim w D-311. Ten sam powód człowieka.
    - B. W lewej kolumnie pod „Teraz” i „Potem” — w oknie 1280 × 720 widać tylko górę końca, a przyciski wypadają pod dolną krawędź; wiersz ciała, plecak, rysunek mapy i zakładki zjeżdżają w dół; blisko miejsca, które D-311 odrzuciło. Ten sam powód człowieka.
    - C. Trzecia zakładka „Koniec” w obszarze pod światem — w niskim oknie poniżej dolnej krawędzi, zmienia *Rejected* D-311, a kronika chowa się za zakładką, gdy gracz chce czytać, co się stało. Ten sam powód człowieka.
    - D. W miejscu sceny — zasłania scenę, w której D-132 każe pokazać rozwiązanie, i efekty końca z zadań 18 i 19, więc wymaga zmiany definicji. Ten sam powód człowieka.
  - Source: Mariusz, 2026-11-11, do drogi A2 i pozostałych: „a nie lepiej to zrobić jakimś modalem nad ekranem gry po prostu? no będzie zasłaniać, ale tam jest sporo informacji / nie wiem, jakoś nie kupuję tego, żeby to miało wskoczyć gdzieś w jakieś miejsce w którym do tej pory było coś innego”; po przedstawieniu okna z zyskami, kosztami i szczegółami a–f: „tak, przyjmuję w tej postaci” (Mariusz, 2026-11-11). Pytanie jest wspólne dla zadań 16, 18 i 19; zadania 18 i 19 kopiują tę odpowiedź.

#### task.md:100-104 Question 9

- Pytanie 9. Czy okno końca przykrywa też pasek menu gry (Siedziba, Mapy, Programy), który stoi u góry każdego ekranu (D-280)?
  - Answer: Nie. Okno przykrywa ekran przejścia od jego nagłówka w dół, a pasek menu z wierszem ostrzeżeń pod nim zostaje nad oknem i działa, więc gracz z otwartym oknem widzi nieudany zapis (D-208) i awarię gry (D-323). Kliknięcie w pasek menu przy otwartym oknie opuszcza ekran przejścia, a po powrocie okno otwiera się znowu (pytanie 1, szczegół e). Koszt przyjęty: okno nie zasłania całego ekranu jak w starym Loop.
  - Not chosen:
    - B. Okno przykrywa też pasek menu — żeby przejść na inny ekran, gracz najpierw zamyka okno, a okno zakrywa wiersz pod paskiem menu, więc przy otwartym oknie gracz nie zobaczy ani nieudanego zapisu (D-208), ani tego, że gra się zepsuła (D-323).
  - Source: Mariusz, 2026-11-11: „tak jak rekomendujesz” — przedstawione z rekomendacją A. Materiał: przyjęty szczegół b pytania 1 („it covers the screen of the map run, header included”, zapisany przez orkiestratora; słowa człowieka: „modalem nad ekranem gry”); fundament przy 211a4ea: D-280 („all of one content width under one menu bar”), D-283 („Leaving the screen of a manual map run pauses it as „Pauza” does.”), D-208 i D-323 (zdanie „Coś w grze się zepsuło — odśwież stronę.” „in the row under the menu bar beside the sentence of a failed save”); kod: pasek menu stoi „at the top of every screen of a signed-in player” (`src/browser/view/menu-bar.tsx:2`, 211a4ea), a wiersz nieudanego zapisu stoi w nagłówku strony z paskiem menu (`src/browser/view/app.ts:414-415`, 211a4ea).

#### task.md:139-143 Questions carried to cycle

- Jaką szerokość i najwyższą wysokość ma okno końca przejścia w oknach przeglądarki od 1280 × 720 i w jednej kolumnie poniżej 1074 px, zanim jego sekcje zaczną się przewijać?
- Jak okno przyjmuje fokus klawiatury, jak się po nim chodzi i dokąd fokus wraca po „✕” albo Escape?
- Gdzie w części „dlaczego” stoi akapit ostatniego starcia względem „Ostatnich minut” i „Nie zadziałały ani razu”?
- Jakie pola stanu przejścia i jakie liczenie dają najdłuższą passę, czas według czynności i to, z czym postać weszła na mapę, tak żeby zostały po wczytaniu zapisu?
- Którymi rolami i wartościami z pliku tokenów stoją kawałki paska czasu i tło za oknem; wartość, której plik tokenów nie ma, wchodzi tylko ze źródłem ustalonym z człowiekiem (`src/browser/AGENTS.md`), a bez człowieka cykl ją nazywa w raporcie.

## Binding answers of the orchestrator

The plan was written before slices 1 to 5 were made. They are made (the last is commit `87558d2`); where the plan's ranges or wording differ from the code as it stands, the code as it stands holds. The window is built: read `src/browser/view/end-window.tsx` whole, its rules in `src/browser/styles.css` (search `end-window`), `src/browser/view/run-screen.tsx` and `src/browser/view/game-view.ts` where they stand the window over the screen, and the reports of slices 3 and 4 (`docs/task-cycles/koniec-przejscia/reports/slice-3-report.md` and `slice-4-report.md`: sections "What the component is", "Values the token file lacks…", "Choices"), because the rule you write follows what was built.

How you work (binding): `the-way-maintain-styleguide` is written for a refinement led with the human, and you have no human. Follow its steps for reading, shaping and checking a rule, and where it would ask the human, take the smallest reversible reading that fulfils the task's item 12, name it in your report as a choice with the way rejected and its cost if wrong, and where you cannot proceed without a human fact return the status `questions` with the question and the answer you recommend. You may not add a value to `src/browser/tokens.css`; the rule names, in its own words, the one thing the bar of time lacks (a way to tell its pieces apart by more than their order: no token holds a series of fills) as slice 3's report states it, and says it is open for the human.

What the rule has to cover (task item 12, and the plan's goal): the end-of-run window, the first window over a game screen: how it covers the screen (the screen and its header are not shown while it stands; the menu bar and the row under it stay above it and work), how it closes („✕”, Escape read on the window's own root, the buttons that leave the screen, the question „Zapisać, odrzucić, wrócić?” closing it) and how the header's „Koniec przejścia” opens it again; how its title, sections, bar of time and buttons use the roles of the Roles table, the font of the shared button and the shared controls; the focus rule (the root is focusable so a click inside keeps focus, the scrolling part is a Tab stop so the keyboard can scroll it, no focus trap and no `aria-modal`); the height rule (`max-height` in `vh`, a layout dimension D-43 leaves out). Also say whether the kitchen-sink page needs a sample of the window (the rule "The kitchen-sink page" of the file asks a sample for every shared control, state and role; the window is no shared control — judge it, name your judgment, and do not add a sample: that is not in your *Change*).

The decisions the rule cites are written: D-362 (the window), D-311, D-132, D-122, D-173; the rule follows the shape of the file's other rules.

## Report

Write the full report to the report path as `.the-way/task-cycle/change/SKILL.md` section 6 gives: status, files changed with line counts and commits, each check with its command and exit code (the failing run of each test written first included), the own-work check (requirement, check, what it showed), each reach beyond the dispatch, **Unread material:** and **Searches not found or unclear:** (each `none` if so), every choice with the way rejected and its cost if wrong, and problems as observed. Return to the orchestrator only the status, the commits, a one-line check result naming what failed or did not run, and the report path.
