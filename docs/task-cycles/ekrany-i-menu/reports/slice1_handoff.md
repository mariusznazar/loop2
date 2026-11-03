# Handoff — slice 1 of the task `ekrany-i-menu`

You make **slice 1** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `f694d86`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: same as the orchestrator's (Sonnet 5.5), reason in the plan: the file binds every later slice of the bar and the list
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice1.md`.

## Your stage

- You make: **a slice, or the retry of a slice** (the row of the `make-change` table). Read
  `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for how to
  read the plan and the task; read `ui_check.md` of the same directory where your slice changes what
  a screen shows (the screenshot of the running product has a settled route in `.claude/skills/loop2-play/SKILL.md`;
  where the component is not reachable on the page yet, state the check in code and mark the
  screenshot unchecked with that reason — the orchestrator's walk through the real browser covers
  the finished screens). Use no personal or global skill; project skills carry the `the-way-` prefix.
- Boundary: make only this slice; change only the files its *Change* names (a path pattern covers
  every file it matches). Commit on the task branch in English, in the style of the repository's
  recent commits (`git log --oneline`), `git add <paths>` explicitly (never `git add -A`, `git add .`
  or `git commit -a`), messages with several lines through `git commit -F <file>` placed outside the
  repository. Do not push. Leave no uncommitted tracked change.
- Run the focused checks your slice's *Checks* names, each as command and exit code. Do **not** run
  `npm test` without a file argument (the full gate) and do not run `foundation_check.py` unless the
  slice's *Checks* names it; the gate is the orchestrator's.
- If the plan and the code disagree structurally, or you meet an open design choice the task and the
  foundation leave open, return without code (`returned`) as the method gives.

## The answers of step 4

- Trust boundary: no (the part map names none of these files). The address fragment is player input:
  where your slice reads or writes it, test crafted fragments as your section says.
- Irreversible operation: no. Open design choice: none, no spec. Route: planned slices.

## Foundation entries the foundation step has written

The plan names its foundation rows by row number (`E…`); the foundation step wrote them under these
identifiers. Read each entry named in your *Read*, whole (an entry runs from its heading to the
next heading), and cite identifiers as they stand in `foundations/`. The line ranges in your section
below were recomputed at the head `f694d86` of the foundation step.

| Plan row | Identifier written by the foundation step | Commit |
|---|---|---|
| E4 | D-157 (changed, projected whole) | 5d5075f |
| E12 | D-280 (new, part) | 4ba1483 |
| E15 | D-44 (part) | 5d5075f |
| E24 | D-275 (correction) | 5d5075f |
| E28 | D-280 | 4ba1483 |
| E29 | D-280 | 4ba1483 |
| E30 | D-285 (new) | f694d86 |
| E31 | D-285 | f694d86 |
| E32 | D-280 | 4ba1483 |

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:30-33`

```
  30	1. Na każdym ekranie zalogowanego gracza stoi u góry jeden pasek menu, a treść pod nim ma jedną szerokość: najwyżej 1344 px, a w węższym oknie całą szerokość okna (pytanie 11).
  31	   - Po lewej stronie paska stoi nazwa gry; na ekranach oczekiwania (D-262) nazwa stoi sama, bez pozycji (pytanie 11).
  32	   - Pozycje paska to Siedziba, Programy i menu „Konto”, bez ikon; Mapy i Wiedzę dopisują zadania 13 i 22 (pytanie 7).
  33	   - Pasek znaczy pozycję miejsca, w którym jest gracz, tekstem w `text-strong` i linią w `selected` u dołu (D-277); na ekranie Postać znaczy Siedzibę (pytanie 7), a na ekranie przejścia nie znaczy żadnej pozycji (D-277, odczyt pod *Decisions in play*).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:61-64`

```
  61	9. Menu „Konto” trzyma adres, „Wyloguj” i sprawę niepotwierdzonego adresu z „Wyślij ponownie”, a wiersz niepotwierdzonego adresu znika z góry strony (D-97, D-157).
  62	   - Zdanie o wyniku wysyłania stoi w menu „Konto”, bez znaku na pasku (pytanie 11).
  63	   - Menu otwiera się kliknięciem albo klawiaturą, zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem, a fokus wraca wtedy na „Konto” (pytanie 11).
  64	   - Menu zostaje otwarte, gdy „Wyloguj” albo „Wyślij ponownie” czeka na serwer, i po odpowiedzi stoi otwarte, aż gracz je zamknie, więc zdanie o wyniku da się przeczytać (pytanie 11).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:71-71`

```
  71	15. `guidelines/styleguide-browser-view.md` dostaje wygląd i stany pozycji menu, menu „Konto” i pozycji listy programów, przycisk „Wyślij ponownie” przestaje tam stać „z nagłówka”, a przykład „„Wyloguj” w nagłówku” i wiersz nagłówka na stronie wszystkich stanów idą za menu „Konto”; zmiany idą przez `the-way-maintain-styleguide`.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:111-115`

```
 111	- Pytanie 7. Co stoi w pasku menu, zanim powstaną Mapy i Wiedza, i jak gracz dochodzi do ekranu Postać?
 112	  - Answer: Pasek ma Siedzibę, Programy i „Konto”; imię na karcie postaci prowadzi na Postać, a na Postaci pasek znaczy Siedzibę, jak w starym Loop. Pozycje nie mają ikon, inaczej niż w starym Loop.
 113	  - Not chosen:
 114	    - Mapy i Wiedza stoją od razu, wyłączone — dwie pozycje bez treści.
 115	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta propozycja T1 pakietu rundy; znak bieżącej pozycji daje D-277 (foundations/decisions.md przy 20d804b).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:132-145`

```
 132	- Pytanie 11. Jak działa menu „Konto”, co stoi na pasku poza pozycjami i jaką szerokość ma treść?
 133	  - Answer:
 134	    1. Nazwa gry stoi po lewej na pasku, a na ekranach oczekiwania (D-262) stoi sama, bez pozycji.
 135	    2. „Konto” otwiera się kliknięciem albo klawiaturą, zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem, a fokus wraca na „Konto”.
 136	    3. Menu zostaje otwarte, gdy „Wyloguj” albo „Wyślij ponownie” czeka na serwer, i po odpowiedzi też stoi otwarte, aż gracz je zamknie, więc wynik da się przeczytać. Ostrzeżenie o nieudanym zapisie przed wylogowaniem stoi pod paskiem, nie w menu.
 137	    4. Zdanie o wysłanej wiadomości po rejestracji stoi w zamkniętym menu „Konto”, bez znaku na pasku; znany koszt: gracz nie zobaczy też „Nie udało się wysłać wiadomości.”, dopóki nie otworzy „Konto”.
 138	    5. Treść ma najwyżej 1344 px szerokości, a przy węższym oknie zajmuje całą szerokość.
 139	  - Not chosen:
 140	    - Punkty 1 i 2 bez ustalenia — cykl wybierze sam.
 141	    - Punkt 2: menu otwiera i zamyka tylko kliknięcie w „Konto” — pytanie kontrolne nie podało kosztu tej drogi; słabość wybranej: wymagania dostępności gry (D-42) tego nie żądają, a przewodnik stylu dostaje nowy rodzaj elementu z obsługą klawiatury.
 142	    - Punkt 3: menu zamyka się od razu — zdanie o wyniku znika.
 143	    - Punkt 3, po odpowiedzi serwera: menu zamyka się samo, a wynik czyta się po ponownym otwarciu — pytanie kontrolne nie podało kosztu tej drogi poza tym opisem.
 144	    - Punkt 5: inna liczba — zmienia tylko jeden wymiar.
 145	  - Source: punkty 1, 2, 3 i 5: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęte propozycje T3, T4, T5 i T6 pakietu rundy; punkty 2 i 3 potwierdzone w pytaniach kontrolnych E1 (droga A, „Utrzymujesz”) i E2 (droga A, „Po odpowiedzi menu też stoi otwarte, aż gracz je zamknie, więc wynik da się przeczytać.”) drugiego pakietu rundy: Mariusz, 2026-11-03: „wszystko przyjmuję zgodnie z rekomendacjami”; liczba 1344 pochodzi z `rozpoznanie_mvp2\rozpoznanie_projektant.md`, część A.3. Punkty 3 i 4 w części cytatem, nieskreślonym przez Mariusza 2026-11-03: „A signed-in player whose email address is unconfirmed sees in the menu „Konto” „Adres e-mail niepotwierdzony.” in `text-secondary` and the shared button „Wyślij ponownie”, both gone once the address is confirmed.” i „Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending” (definicja, odcisk 9641f804, wiersz 796, D-157), odrzucone: „a line in the header of every screen — the first thing the player reads of the game is a request about an address” (wiersz 805); „When one fails, the header line under the menu bar shows „Nie udało się zapisać postępu. Gra spróbuje ponownie.” in `warning`, or, once the save before a logout has failed, the sentence D-97 gives for that failure” (wiersz 916, D-208).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:266-276`

```
 266	- D-262 — What stands on the screen of the login card, and where do the waiting screens stand?: „The waiting screens […] stand outside the card, with the header and the footer, for a signed-in player too.”
 267	- D-27 — Where do the game's icons come from?: „The game's footer and a section of credits on the login card”; stopka zostaje do zadania 24.
 268	- D-265 — How does a shared control stand in a screen built with React while other screens stay in DOM?: „a shared control that a React screen uses has two forms in `src/browser/view/controls/`, a React component and a DOM function”, „a screen no task has moved to React yet stays in those APIs on the DOM form”.
 269	- D-264 — What does a test of a screen built with React run on?: „One harness, `tests/view/page-document.mjs`, carries those files”.
 270	- D-269 — Does the kitchen-sink page hold React?: „it shows each shared control in its DOM form”.
 271	- D-270 — Which libraries built on React may the browser view take?: „counts as another UI framework under D-03, whether it draws anything or not”.
 272	- D-276 — What is a tab of the browser view?: „A tab keeps the HTML element, `aria-pressed` and keyboard of the button selected in its group”.
 273	- D-277 — How does the menu bar show where the player is?: „The menu bar marks the place the player is at as the chosen tab is marked (D-276): its text in `text-strong` and the same line in `selected` at its bottom.”
 274	  - Odczyt nieskreślony przez Mariusza 2026-11-03 (drugi pakiet rundy, część F; „wszystko przyjmuję zgodnie z rekomendacjami”): na ekranie przejścia pasek menu nie znaczy żadnej pozycji, bo D-277 każe znaczyć miejsce, w którym gracz jest, a żadna pozycja go nie nazywa; „Wróć do przejścia” tam nie stoi (pytanie 9).
 275	- D-75, D-88 i D-254: zachowanie w prawdziwej przeglądarce sprawdza agent i człowiek, a imitacja dokumentu tego nie dowodzi.
 276	- D-42 i D-47: kryteria dostępności i wspólna obwódka fokusu obejmują nowe odnośniki menu bez dodatku.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:278-296`

```
 278	## Settlements to record
 279	
 280	Candidates: 15 shown, 11 accepted — 2026-11-03
 281	
 282	Numery wierszy są numerami drugiego pakietu rundy, część D. Wiersze 12, 13, 15 i 16 odrzucone, bo kończą się z zadaniem albo już je mówią zatwierdzone wpisy; wiersz 5 przeszedł do odczytu D-277 pod *Decisions in play*.
 283	
 284	| # | Settlement | Kind | Source | What the cycle would otherwise guess |
 285	|---|---|---|---|---|
 286	| 1 | Na Siedzibie i ekranie Postać, gdy ręczne przejście czeka albo się skończyło, działa to, na co pozwala symulacja, a przy nieaktywnych przyciskach stoi „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”, a przy „Umiejętności” „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.”. | decision | Pytanie 3 | czy nieaktywne „Wyślij”, „Puść w pętlę” i „Kup” mówią, dlaczego nie działają, i jakimi słowami |
 287	| 2 | Pozycja menu czyta się „Wróć do przejścia · {mapa} · minuta {m}”, z minutą gry jak w wierszu stanu, która stoi nieruchomo, bo przejście czeka w pauzie. | decision | Pytanie 9 | zapis zegara przy pozycji: minuta gry czy „03:32” |
 288	| 3 | Imię na karcie postaci w Siedzibie prowadzi na ekran Postać, a na ekranie Postać pasek menu znaczy Siedzibę, jak w starym Loop. | decision | Pytanie 7 | którędy gracz dochodzi do ekranu Postać i którą pozycję pasek wtedy znaczy |
 289	| 4 | Pozycje paska menu nie mają ikon, inaczej niż w starym Loop. | decision | Pytanie 7 | czy przenieść ikony pozycji menu ze starego Loop |
 290	| 6 | Nazwa gry stoi po lewej na pasku menu, a na ekranach oczekiwania stoi sama, bez pozycji. | decision | Pytanie 11, punkt 1 | czy nazwa gry zostaje na pasku i co stoi na ekranach oczekiwania |
 291	| 7 | Menu „Konto” otwiera się kliknięciem albo klawiaturą, zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem, a fokus wraca na „Konto”. | decision | Pytanie 11, punkt 2 | obsługa klawiatury i zamykania menu, której D-42 nie wymaga |
 292	| 8 | Menu „Konto” zostaje otwarte, gdy „Wyloguj” albo „Wyślij ponownie” czeka na serwer, i po odpowiedzi też stoi otwarte, aż gracz je zamknie, więc wynik da się przeczytać. | decision | Pytanie 11, punkt 3 | czy menu zamyka się po kliknięciu albo po odpowiedzi, gubiąc zdanie o wyniku |
 293	| 9 | Treść ekranów ma najwyżej 1344 px szerokości, a w węższym oknie zajmuje całą szerokość. | decision | Pytanie 11, punkt 5 | szerokość treści wspólna dla zadań 5, 6, 13 i 22 |
 294	| 10 | Zdanie strony nad ekranem gry, jak „Adres e-mail potwierdzony.”, znika przy pierwszej zmianie ekranu. | decision | Pytanie 12 | czy zdanie z chwili wejścia stoi nad każdym ekranem do przeładowania |
 295	| 11 | W edytorze Programów przejście czekające, a także skończone, do „Restart” albo „Zakończ”, liczy się jak trwające: oferta czynności idzie za postacią w przejściu, jak dziś w kodzie (zmienia D-196). | decision | Pytanie 15 dla przejścia czekającego, pytanie 17 dla skończonego | czy przy czekającym albo skończonym przejściu edytor Programów oferuje repertuar postaci z przejścia czy archetypu |
 296	| 14 | Powrót do przejścia go nie wznawia; gracz naciska „Wznów”. | decision | Pytanie 10 | czy powrót na ekran przejścia wznawia je samo, gdy szło przed wyjściem — zadanie 6 przebudowuje ten ekran, a wpis o wyjściu z ekranu przejścia mówi tylko o wyjściu |
```

## Your section of the plan (word for word; file `docs/task-cycles/ekrany-i-menu/plan.md`)

### Slice 1 — The styleguide of the menu bar, the menu „Konto” and the list of programs

- **Goal:** `guidelines/styleguide-browser-view.md` gives the look and the states of the items of the menu bar, of the menu „Konto” and of the items of the list of programs (To do item 15), written as `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md` give a styleguide's file in the task cycle, each rule citing its decision, with only meanings the task, its settlements and the decisions of the log carry. The looks this plan settles, all from existing meanings: the items „Siedziba”, „Programy” and „Wróć do przejścia · {mapa} · minuta {m}” are links, since they have addresses (unlike a secondary action, D-275), drawn as tabs — the item of the place the player is at with its text in `text-strong` and the line in `selected` at its bottom (D-277), every other item in `text-label` like a tab not chosen (D-276), `highlight` under the pointer, no icons (settlement row 4), and no item marked on the screen of a map run (the reading of D-277 under *Decisions in play*); the game's name at the left of the bar, alone on the waiting screens (row 6); „Konto” is the shared plain button (D-44 gives an action outside a form the button), whose open menu stands below it as a block on `panel` with its text in `text` (D-40): the account's address, „Wyloguj”, and for an unconfirmed address „Adres e-mail niepotwierdzony.” in `text-secondary` with „Wyślij ponownie” (D-157 projected); the menu opens by a click and by the keyboard, closes on Escape, on a click outside it and on a second click, focus back on „Konto” (row 7), stays open while „Wyloguj” or „Wyślij ponownie” waits and after the answer until the player closes it (row 8), the two buttons waiting as every shared button waits; an item of the list of programs is a link, the chosen one with its text in `text-strong` and a bar in `selected` of `--bar-width` at its left, the others in `text`, `highlight` under the pointer; the content under the bar at most 1344 px wide and the full width of a narrower window (row 9; a layout dimension, D-43). The text further changes: the loading state of „Wyślij ponownie” no longer reads „z nagłówka” but names the menu „Konto”; the Good example „„Wyloguj” w nagłówku” of the rule *Main button, secondary action and tab* becomes „Wyloguj” in the menu „Konto”, a plain shared button; and in the rule *The kitchen-sink page* the header row of an unconfirmed address becomes the part of the menu „Konto” for an unconfirmed address, with „Wyślij ponownie” waiting („Wysyłanie…”) and the sentence of a refusal, built on the page from the DOM forms of the shared controls (D-269). Where a rule cites an entry the foundation step wrote (rows E4, E12, E15, E24, E28–E32 of the plan), it cites the identifier that step gave. A look that would need a meaning no decision carries stays out of the file and goes to the report as a question.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:30-33` To do · `docs/task-cycles/ekrany-i-menu/task.md:61-64` To do · `docs/task-cycles/ekrany-i-menu/task.md:71-71` To do · `docs/task-cycles/ekrany-i-menu/task.md:111-115` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:132-145` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:266-276` Obecne decyzje, których zadanie dotyka bez zmiany · `docs/task-cycles/ekrany-i-menu/task.md:278-296` Settlements to record
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/styleguide/template.md`
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:118-133` agent-workflow
  `foundations/decisions.md:822-835` D-38 · `foundations/decisions.md:837-850` D-39 · `foundations/decisions.md:852-865` D-40 · `foundations/decisions.md:882-895` D-42 · `foundations/decisions.md:897-910` D-43 · `foundations/decisions.md:912-925` D-44 · `foundations/decisions.md:927-940` D-45 · `foundations/decisions.md:957-970` D-47 · `foundations/decisions.md:2881-2894` D-157 · `foundations/decisions.md:5318-5339` D-262 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5536-5560` D-269 · `foundations/decisions.md:5674-5707` D-274 · `foundations/decisions.md:5709-5734` D-275 · `foundations/decisions.md:5736-5772` D-276 · `foundations/decisions.md:5774-5792` D-277 · `foundations/decisions.md:5817-5839` D-279
  Foundation entries rows E4, E12, E15, E24, E28, E29, E30, E31, E32
  `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:469-477` browser-view-focus-outline · `foundations/invariants.md:499-507` application-build-kitchen-sink
  `foundations/glossary.md:241-246` secondary action · `foundations/glossary.md:87-91` headquarters
- **Model:** same — the file binds every later slice of the bar and the list, and its text weaves seventeen decisions into looks no single decision gives whole.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` reports nothing the change caused; `npm test -- tests/invariants/test_browser_view_token_values.py` (the styleguide's rules stand unchanged where that test reads them)
- **Depends on:** E4 · E12 · E15 · E24 · E28 · E29 · E30 · E31 · E32


## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice1.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
