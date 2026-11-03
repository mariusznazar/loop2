# Handoff — slice 3 of the task `ekrany-i-menu`

You make **slice 3** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `893d26c`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: cheaper than the orchestrator's (Haiku 5.5), the default class of the plan
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice3.md`.

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
| E12 | D-280 (new, part) | 4ba1483 |
| E13 | D-281 (new, part) | 4ba1483 |
| E26 | D-280 | 4ba1483 |
| E27 | D-280 | 4ba1483 |

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:34-39`

```
  34	2. Ekrany mają adresy po `#`: `#/` to Siedziba, `#/postac/{n}` to Postać, `#/programy` i `#/programy/{n}` to Programy, `#/postac/{n}/przejscie` to ekran przejścia; {n} to numer postaci (D-56) albo programu (D-165).
  35	   - Odświeżenie pod adresem ekranu zostaje na tym ekranie; pod adresem bez fragmentu i po zalogowaniu formularzem gra prowadzi do Siedziby albo, gdy zapis gry trzyma ręczne przejście, do tego przejścia (pytanie 1).
  36	   - Przyciski wstecz i naprzód przeglądarki prowadzą po tych adresach.
  37	   - Adres, który nie prowadzi do istniejącego ekranu, po cichu otwiera najbliższy: `#/postac/{n}/przejscie` bez przejścia ekran Postać tej postaci, `#/programy/{n}` bez takiego programu `#/programy`, a każdy inny Siedzibę (pytanie 8).
  38	   - Fragmenty `#confirm-email=` i `#reset-password=` działają jak dotąd (D-156, D-225); gdy po nich gra buduje się dla zalogowanego gracza, otwiera Siedzibę (D-96).
  39	   - „Anuluj” formularza „Ustaw nowe hasło” otwiera zalogowanemu graczowi Siedzibę, a niezalogowany widzi formularze konta, jak dziś (pytanie 16).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:55-57`

```
  55	7. Wyjście z ekranu przejścia, którąkolwiek drogą, zatrzymuje je jak „Pauza”, a pętle chodzą dalej; powrót go nie wznawia, przejście czeka w pauzie na „Wznów” (pytanie 10).
  56	   - Poza ekranem przejścia, gdy ręczne przejście trwa albo skończyło się i czeka na „Restart” albo „Zakończ”, w menu stoi „Wróć do przejścia · {mapa} · minuta {m}”, na przykład „Wróć do przejścia · Las · minuta 212”, i prowadzi pod adres przejścia (pytania 2 i 9).
  57	   - Na samym ekranie przejścia tej pozycji nie ma (pytanie 9).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:78-90`

```
  78	- Pytanie 1. Czy odświeżenie zostaje na ekranie z adresu, gdy zapis gry trzyma przejście?
  79	  - Answer: Tak. Adres wygrywa, gdy nazywa ekran; zasada o Siedzibie albo przejściu z zapisu działa tylko pod adresem bez fragmentu i po zalogowaniu formularzem, a po odnośniku z maila strona otwiera Siedzibę. Przejście czeka bezpiecznie w pauzie, a koszt to jedno kliknięcie „Wróć do przejścia”.
  80	  - Not chosen:
  81	    - Przy przejściu w zapisie każde odświeżenie prowadzi na ekran przejścia — cel z planu niespełniony, a gracz piszący program traci miejsce przy każdym odświeżeniu.
  82	    - Adres wygrywa też po zalogowaniu — inne konto w tej samej karcie trafia pod adres poprzedniego gracza.
  83	    - Bez decyzji — cykl wybierze sam, a jego wybór będzie wyglądał jak ustalenie.
  84	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B1 pakietu rundy zadań 4–7; ta sama treść stoi w zatwierdzonym D-96 (definicja_mvp2_loop2.md, odcisk 9641f804, wiersz 601: „signing in with email and password, and reloading with a valid session at an address with no fragment, that form apart, also lead to Siedziba, or, when the saved game state holds a manual map run, to that map run […] while a reload at another address stays on the screen that address leads to, and after an emailed link (D-156, D-224) the page opens Siedziba”).
  85	- Pytanie 2. Czy „Wróć do przejścia” stoi też po końcu przejścia, zanim gracz wybierze „Restart” albo „Zakończ”?
  86	  - Answer: Tak, pozycja stoi też po końcu, do „Restart” albo „Zakończ”.
  87	  - Not chosen:
  88	    - Po końcu menu nie działa — nowy stan paska, a kopię i tak da się poprawić na ekranie końca.
  89	    - Dosłownie jak w definicji sprzed bramki 2026-11-03 — po wyjściu po końcu zostaje tylko przycisk wstecz przeglądarki.
  90	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B3 (A) pakietu rundy; ta sama treść stoi w zatwierdzonym wpisie „(new) — Which screens does the game have, and how does the player move between them?” (definicja, odcisk 9641f804, wiersz 166: „outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia” with the map and the map run's clock”).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:111-131`

```
 111	- Pytanie 7. Co stoi w pasku menu, zanim powstaną Mapy i Wiedza, i jak gracz dochodzi do ekranu Postać?
 112	  - Answer: Pasek ma Siedzibę, Programy i „Konto”; imię na karcie postaci prowadzi na Postać, a na Postaci pasek znaczy Siedzibę, jak w starym Loop. Pozycje nie mają ikon, inaczej niż w starym Loop.
 113	  - Not chosen:
 114	    - Mapy i Wiedza stoją od razu, wyłączone — dwie pozycje bez treści.
 115	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta propozycja T1 pakietu rundy; znak bieżącej pozycji daje D-277 (foundations/decisions.md przy 20d804b).
 116	- Pytanie 8. Co się dzieje pod adresem, który nie prowadzi do istniejącego ekranu?
 117	  - Answer: Strona po cichu otwiera najbliższy istniejący ekran: adres przejścia bez przejścia ekran Postać tej postaci, `#/programy/{n}` bez programu `#/programy`, każdy inny Siedzibę.
 118	  - Not chosen:
 119	    - Ekran „Nie ma takiego miejsca” — trafia na niego przycisk wstecz po „Zakończ”.
 120	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta propozycja T2 pakietu rundy; ta sama treść stoi w zatwierdzonym wpisie „(new) — How does an address name a screen?” (definicja, odcisk 9641f804, wiersz 181).
 121	- Pytanie 9. Jak brzmi „Wróć do przejścia” i czy stoi też na samym ekranie przejścia?
 122	  - Answer: „Wróć do przejścia · Las · minuta 212”: czas przejścia w minutach gry, jak dziś w wierszu stanu, a liczba stoi nieruchomo, bo przejście czeka w pauzie. Pozycja stoi tylko poza ekranem przejścia. Ten sam zapis zegara bierze nagłówek ekranu przejścia w zadaniu 6.
 123	  - Not chosen:
 124	    - „03:32” — nowy zapis czasu, którego gra nie ma.
 125	    - Pozycja także na ekranie przejścia — odnośnik do miejsca, w którym gracz już jest.
 126	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B16 (A i C) pakietu rundy; fakt z kodu: `src/browser/view/status-row.ts:75` przy 20d804b zaczyna wiersz stanu od `Minuta ${run.minute}`.
 127	- Pytanie 10. Czy powrót do przejścia wznawia je sam?
 128	  - Answer: Nie. Przejście stoi w pauzie, a gracz naciska „Wznów”.
 129	  - Not chosen:
 130	    - Wznawia się samo, jeśli szło przed wyjściem — gra musi wtedy pamiętać, kto pauzował, a odświeżenie tę pamięć gubi (droga pokazana w pakiecie rundy, A2, na wypadek skreślenia cytatu).
 131	  - Source: cytaty, nieskreślone przez Mariusza 2026-11-03, a wiersz kandydatów 14 przyjęty przez niego 2026-11-03 („wszystko przyjmuję zgodnie z rekomendacjami”, drugi pakiet rundy, część D): „Leaving the screen of a manual map run pauses it as „Pauza” does.” (definicja, odcisk 9641f804, wiersz 196); „one pause gives the player one way to hold a map run and one way to go on.” (definicja, uzasadnienie D-122); „the map run stops in the same pause as after „Pauza”, and the player goes on with „Wznów”.” (definicja, D-122); „A pause holds a map run without ending it, and it stays an act of its own” (foundations/decisions.md, D-21, uzasadnienie). Krok: żadne zdanie nie mówi wprost o powrocie, odpowiedź wynika ze złożenia zdania o wyjściu i zdania o jednej pauzie.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:167-169`

```
 167	- Pytanie 16. Co otwiera „Anuluj” formularza „Ustaw nowe hasło”?
 168	  - Answer: Zalogowanemu graczowi Siedzibę, jak po każdym odnośniku z maila; niezalogowany widzi formularze konta, jak dziś.
 169	  - Source: cytaty, nieskreślone przez Mariusza 2026-11-03 (drugi pakiet rundy, A1; „wszystko przyjmuję zgodnie z rekomendacjami”): „and after an emailed link (D-156, D-224) the page opens Siedziba” (zatwierdzony D-96, definicja, odcisk 9641f804, wiersz 601, w zdaniu o graczu z ważną sesją), gdzie D-224 to „What form does a password-reset link take?” (foundations/decisions.md przy 20d804b); D-225 mówi dziś: „„Anuluj”, which removes the fragment of the address and opens the page as usual”. Krok, którego cytat nie mówi wprost: „Anuluj” kończy stronę otwartą odnośnikiem D-224, więc zdanie o odnośniku z maila obejmuje też je; ten krok to odczyt agenta od planu (plan_mvp2_loop2.md, dziennik, 2026-11-03, uwaga dla zadania 4 o D-225), pokazany Mariuszowi w A1. Uwaga planu w tej samej linii: wybór przejścia z zapisu byłby odejściem od zatwierdzonego D-96 i dostałby własną linię w dzienniku.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:223-230`

```
 223	### Zadanie urzeczywistnia część, a resztę pisze inne zadanie
 224	
 225	Część, którą kod tego zadania czyni prawdziwą, zadanie zapisuje w fundamencie (WAY-126), bo inaczej fundament mówiłby nieprawdę o scalonej grze.
 226	
 227	- (new) — Which screens does the game have, and how does the player move between them? (definicja; pisze zadanie 22): „The game has the screens Siedziba, Postać, Mapy, Programy, Wiedza and Przejście, all of one content width under one menu bar. The menu bar holds Siedziba, Mapy, Programy, Wiedza and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia” with the map and the map run's clock.”
 228	  - Część tego zadania: ekrany Siedziba, Postać, Programy i Przejście, jedna szerokość, pasek z Siedzibą, Programami i „Konto”, „Wróć do przejścia”.
 229	- (new) — How does an address name a screen? (definicja; pisze zadanie 22): „An address names a screen in the fragment after `#`: `#/`, `#/postac/{n}`, `#/mapy`, `#/mapy/{map}`, `#/programy`, `#/programy/{n}`, `#/wiedza` and `#/postac/{n}/przejscie`, the last naming a map run by the number of its character, and an address that leads to no existing screen silently opens the nearest one: `#/postac/{n}/przejscie` with no map run the screen Postać of that character, `#/programy/{n}` with no such program `#/programy`, and any other Siedziba. The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself. The fragments of emailed links (D-156, D-224) stand apart from these, and after them the page opens Siedziba.”
 230	  - Część tego zadania: wszystko poza adresami Map i Wiedzy.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:273-274`

```
 273	- D-277 — How does the menu bar show where the player is?: „The menu bar marks the place the player is at as the chosen tab is marked (D-276): its text in `text-strong` and the same line in `selected` at its bottom.”
 274	  - Odczyt nieskreślony przez Mariusza 2026-11-03 (drugi pakiet rundy, część F; „wszystko przyjmuję zgodnie z rekomendacjami”): na ekranie przejścia pasek menu nie znaczy żadnej pozycji, bo D-277 każe znaczyć miejsce, w którym gracz jest, a żadna pozycja go nie nazywa; „Wróć do przejścia” tam nie stoi (pytanie 9).
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

### Slice 3 — The addresses of the screens

- **Goal:** a new pure module `src/browser/view/screen-address.ts` (no DOM, nothing runs when it is imported) holds: the type of a screen an address names — Siedziba, Postać {n}, Programy, Programy {n} and Przejście {n}, {n} the number of a character (D-56) or of a program (D-165); a function that reads a fragment as `location.hash` gives it, `#` included, into the screen it names, or into no screen; a function that writes a screen as its fragment — `#/`, `#/postac/{n}`, `#/programy`, `#/programy/{n}`, `#/postac/{n}/przejscie` (To do item 2); a function that, given the game state, gives the existing screen nearest a named one (question 8): Przejście {n} where the game state holds no manual map run of character {n}, going on or ended and waiting for „Restart” or „Zakończ”, gives Postać {n}; Postać {n} or Przejście {n} of a number no character of the team carries gives Siedziba; Programy {n} where no program carries {n} gives Programy; no screen gives Siedziba; a number reads only as a decimal whole number of 1 or more with no sign, no leading zero and nothing else; the fragments of emailed links, `#confirm-email=…` and `#reset-password=…`, are no address of a screen, since the page handles them first (D-156, D-224, D-225); a function giving the item of the menu bar that marks a screen — Siedziba for Siedziba and for Postać (settlement row 3), Programy for Programy, none for Przejście (the reading of D-277 under *Decisions in play*); and a function giving, for a game state that holds a manual map run, going on or ended and waiting for „Restart” or „Zakończ”, the label „Wróć do przejścia · {mapa} · minuta {m}” with its address — the map's name from the data (content-identifiers) and {m} the map run's game minute as the status row writes it (questions 2 and 9, row 2) — and nothing otherwise. The new unit test `tests/view/screen-address.test.mjs` works on explicit game states and holds a table of crafted fragments, each read as no screen or as the screen the task gives and none of them throwing: `#/postac/x`, `#/postac/-1`, `#/postac/0`, `#/postac/01`, `#/postac/1.5`, `#/postac/1e3`, `#/programy/-1`, `#/programy/`, `#/postac/1/przejscie/x`, `#//`, a fragment of 10 000 characters, `#confirm-email=abc`, `#reset-password=abc`, `#/postac/1#confirm-email=x`, a percent-encoded `#/postac/%31`, `#/POSTAC/1`, `#` alone and the empty fragment.
- **Change:** `src/browser/view/screen-address.ts` · `tests/view/screen-address.test.mjs`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:34-39` To do · `docs/task-cycles/ekrany-i-menu/task.md:55-57` To do · `docs/task-cycles/ekrany-i-menu/task.md:78-90` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:111-131` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:167-169` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:223-230` Zadanie urzeczywistnia część, a resztę pisze inne zadanie · `docs/task-cycles/ekrany-i-menu/task.md:273-274` Obecne decyzje, których zadanie dotyka bez zmiany · `docs/task-cycles/ekrany-i-menu/task.md:278-296` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:383-400` D-18 · `foundations/decisions.md:1105-1123` D-55 · `foundations/decisions.md:1125-1150` D-56 · `foundations/decisions.md:2866-2879` D-156 · `foundations/decisions.md:2997-3010` D-165 · `foundations/decisions.md:4169-4189` D-224 · `foundations/decisions.md:4191-4225` D-225 · `foundations/decisions.md:5562-5589` D-270 · `foundations/decisions.md:5774-5792` D-277
  Foundation entries rows E12, E13, E26, E27
  `foundations/invariants.md:236-246` content-identifiers
  `foundations/glossary.md:18-23` map run · `foundations/glossary.md:130-134` manual map run · `foundations/glossary.md:12-16` game minute
  `src/browser/view/status-row.ts` · `src/browser/view/email-confirmation.ts` · `src/browser/view/password-reset.ts` · `src/browser/sim/types.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from the failing table of crafted fragments; `npm test -- tests/view/screen-address.test.mjs`; `npm run typecheck`; `npm test -- tests/invariants/test_content_identifiers.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** E13 · E26 · E27


## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice3.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
