# Handoff — slice 4 of the task `ekrany-i-menu`

You make **slice 4** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `fa6b322`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: same as the orchestrator's (Sonnet 5.5), reason in the plan: a keyboard-operated menu with focus return, waiting states and a request of its own
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice4.md`.

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
| E3 | D-97 (changed, projected whole) | 5d5075f |
| E4 | D-157 (changed, projected whole) | 5d5075f |
| E12 | D-280 (new, part) | 4ba1483 |
| E15 | D-44 (part) | 5d5075f |
| E20 | D-03 — tied, no change | — |
| E24 | D-275 (correction) | 5d5075f |
| E26 | D-280 | 4ba1483 |
| E27 | D-280 | 4ba1483 |
| E28 | D-280 | 4ba1483 |
| E29 | D-280 | 4ba1483 |
| E30 | D-285 (new) | f694d86 |
| E31 | D-285 | f694d86 |

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:30-33`

```
  30	1. Na każdym ekranie zalogowanego gracza stoi u góry jeden pasek menu, a treść pod nim ma jedną szerokość: najwyżej 1344 px, a w węższym oknie całą szerokość okna (pytanie 11).
  31	   - Po lewej stronie paska stoi nazwa gry; na ekranach oczekiwania (D-262) nazwa stoi sama, bez pozycji (pytanie 11).
  32	   - Pozycje paska to Siedziba, Programy i menu „Konto”, bez ikon; Mapy i Wiedzę dopisują zadania 13 i 22 (pytanie 7).
  33	   - Pasek znaczy pozycję miejsca, w którym jest gracz, tekstem w `text-strong` i linią w `selected` u dołu (D-277); na ekranie Postać znaczy Siedzibę (pytanie 7), a na ekranie przejścia nie znaczy żadnej pozycji (D-277, odczyt pod *Decisions in play*).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:55-57`

```
  55	7. Wyjście z ekranu przejścia, którąkolwiek drogą, zatrzymuje je jak „Pauza”, a pętle chodzą dalej; powrót go nie wznawia, przejście czeka w pauzie na „Wznów” (pytanie 10).
  56	   - Poza ekranem przejścia, gdy ręczne przejście trwa albo skończyło się i czeka na „Restart” albo „Zakończ”, w menu stoi „Wróć do przejścia · {mapa} · minuta {m}”, na przykład „Wróć do przejścia · Las · minuta 212”, i prowadzi pod adres przejścia (pytania 2 i 9).
  57	   - Na samym ekranie przejścia tej pozycji nie ma (pytanie 9).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:61-64`

```
  61	9. Menu „Konto” trzyma adres, „Wyloguj” i sprawę niepotwierdzonego adresu z „Wyślij ponownie”, a wiersz niepotwierdzonego adresu znika z góry strony (D-97, D-157).
  62	   - Zdanie o wyniku wysyłania stoi w menu „Konto”, bez znaku na pasku (pytanie 11).
  63	   - Menu otwiera się kliknięciem albo klawiaturą, zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem, a fokus wraca wtedy na „Konto” (pytanie 11).
  64	   - Menu zostaje otwarte, gdy „Wyloguj” albo „Wyślij ponownie” czeka na serwer, i po odpowiedzi stoi otwarte, aż gracz je zamknie, więc zdanie o wyniku da się przeczytać (pytanie 11).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:85-90`

```
  85	- Pytanie 2. Czy „Wróć do przejścia” stoi też po końcu przejścia, zanim gracz wybierze „Restart” albo „Zakończ”?
  86	  - Answer: Tak, pozycja stoi też po końcu, do „Restart” albo „Zakończ”.
  87	  - Not chosen:
  88	    - Po końcu menu nie działa — nowy stan paska, a kopię i tak da się poprawić na ekranie końca.
  89	    - Dosłownie jak w definicji sprzed bramki 2026-11-03 — po wyjściu po końcu zostaje tylko przycisk wstecz przeglądarki.
  90	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B3 (A) pakietu rundy; ta sama treść stoi w zatwierdzonym wpisie „(new) — Which screens does the game have, and how does the player move between them?” (definicja, odcisk 9641f804, wiersz 166: „outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia” with the map and the map run's clock”).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:111-115`

```
 111	- Pytanie 7. Co stoi w pasku menu, zanim powstaną Mapy i Wiedza, i jak gracz dochodzi do ekranu Postać?
 112	  - Answer: Pasek ma Siedzibę, Programy i „Konto”; imię na karcie postaci prowadzi na Postać, a na Postaci pasek znaczy Siedzibę, jak w starym Loop. Pozycje nie mają ikon, inaczej niż w starym Loop.
 113	  - Not chosen:
 114	    - Mapy i Wiedza stoją od razu, wyłączone — dwie pozycje bez treści.
 115	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta propozycja T1 pakietu rundy; znak bieżącej pozycji daje D-277 (foundations/decisions.md przy 20d804b).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:121-126`

```
 121	- Pytanie 9. Jak brzmi „Wróć do przejścia” i czy stoi też na samym ekranie przejścia?
 122	  - Answer: „Wróć do przejścia · Las · minuta 212”: czas przejścia w minutach gry, jak dziś w wierszu stanu, a liczba stoi nieruchomo, bo przejście czeka w pauzie. Pozycja stoi tylko poza ekranem przejścia. Ten sam zapis zegara bierze nagłówek ekranu przejścia w zadaniu 6.
 123	  - Not chosen:
 124	    - „03:32” — nowy zapis czasu, którego gra nie ma.
 125	    - Pozycja także na ekranie przejścia — odnośnik do miejsca, w którym gracz już jest.
 126	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B16 (A i C) pakietu rundy; fakt z kodu: `src/browser/view/status-row.ts:75` przy 20d804b zaczyna wiersz stanu od `Minuta ${run.minute}`.
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

#### `docs/task-cycles/ekrany-i-menu/task.md:208-221`

```
 208	### Zadanie zapisuje w całości
 209	
 210	- (new) — What happens to a manual map run when the player leaves its screen? (definicja): „Leaving the screen of a manual map run pauses it as „Pauza” does.”
 211	- D-96 — What does a player see before and after signing in? (definicja, wpis zmieniony): „Anyone can create an account without operator approval or email confirmation and immediately enters Siedziba signed in; signing in with email and password, and reloading with a valid session at an address with no fragment, that form apart, also lead to Siedziba, or, when the saved game state holds a manual map run, to that map run — paused while it goes on, or on its screen after its end when it ended in a completion or in the character's death — while a reload at another address stays on the screen that address leads to, and after an emailed link (D-156, D-224) the page opens Siedziba.”
 212	  - Wpis zachowuje zdanie o błędzie kodu przy wczytywaniu i klauzulę uzasadnienia o nim (pytanie 13), a jego *Rejected* niesie drogi nie wybrane w pytaniu 1.
 213	- D-97 — What does the player's logout do? (definicja): „The shared „Wyloguj” button stands in the menu „Konto”, first saves the current game state on the server while it reads „Wylogowywanie…”, and then ends only this browser's server-side session”.
 214	- D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message? (definicja): „A signed-in player whose email address is unconfirmed sees in the menu „Konto” „Adres e-mail niepotwierdzony.” in `text-secondary` and the shared button „Wyślij ponownie”, both gone once the address is confirmed.”
 215	- D-199 — What does the screen Postać show of character skills? (definicja): „The screen Postać shows „Umiejętności” after a tree is known, with a row for each known tree giving „{umiejętność} — poziom {p} · wprawa {w}/{próg} · punkty {k}””, reszta treści bez zmian.
 216	- D-200 — Where does the player buy a branch rank, and when does it act? (definicja, wpis zmieniony): „The player currently buys a branch rank with „Kup” on the screen Postać outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ”, at a character in an earning loop too”.
 217	- D-208 — What does the player see of saving the game state? (definicja): „When one fails, the header line under the menu bar shows „Nie udało się zapisać postępu. Gra spróbuje ponownie.” in `warning`, or, once the save before a logout has failed, the sentence D-97 gives for that failure”.
 218	- D-212 — How does a manual map run come back from a loaded saved game state? (definicja, wpis nowy w definicji): „one that ended in a completion or in the character's death comes back with its screen after its end, with „Restart”, „Zakończ” and the copy open to editing as D-62, D-132 and D-173 give, and the screen the page opens on is the one D-96 gives.”
 219	- D-217 — What does the game show of a character's resurrection? (definicja): „The card and the screen of a character show, from its creation, „Wskrzeszenie gotowe” in `text-secondary`, and while the resurrection is not ready „Wskrzeszenie za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger`, the time reading „za {m} min czasu realnego” below one hour.”
 220	- D-244 — What does the player see of an earning loop? (definicja): „A running earning loop currently shows on the card and the screen of its character as one line in the role `text`, „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}”, with the button „Zatrzymaj”.”
 221	- `headquarters` (definicja, słownik): „The headquarters is the screen Siedziba, which shows the player's team with its characters and its chest.”
```

#### `docs/task-cycles/ekrany-i-menu/task.md:233-234`

```
 233	- D-44 — Which controls do the screens of the browser view build on? (definicja; pisze zadanie 5): „and the button „Wyślij ponownie” then reads „Wysyłanie…””.
 234	  - Część tego zadania: to słowo; dziś stoi „the header's button „Wyślij ponownie””.
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

### Slice 4 — The menu bar in React

- **Goal:** a new `src/browser/view/menu-bar.tsx` holds the menu bar and its boundary `createMenuBar`, built after the boundary of the exemplar `createAccountCard` (D-36): an element of its own, a first render that is synchronous (`flushSync`), `update(props)` that the page calls from an event handler or the continuation of an answer, never from render or an effect, and `dispose()`. The bar draws the game's name from the data at its left; on a waiting screen the name alone (row 6); over the game the links „Siedziba” to `#/` and „Programy” to `#/programy`, with no icons (row 4), the item of the place the page gives marked with `aria-current="page"` and the look the styleguide gives (D-277), the place read through Slice 3's function, and, where the page gives the label of Slice 3's function, the link „Wróć do przejścia · {mapa} · minuta {m}” to the map run's address (questions 2 and 9); and the menu „Konto”: the shared plain button „Konto” with `expanded` (Slice 2), opening below it a block with the account's address, „Wyloguj” — a plain shared button whose waiting text „Wylogowywanie…” and whose sentence after an uncertain logout the page gives, while the page runs the logout itself (D-97) — and, for an unconfirmed address, the sentence of D-157 with „Wyślij ponownie”, waiting as „Wysyłanie…” (D-44): the bar sends that request itself through the client's `sendConfirmationMessage`, each sending numbered and only the last answer acting, its sentences from `messageSentence` and `UNCONFIRMED_SENTENCE` of `email-status.ts`, which this slice leaves as it is, the block gone when the server answers that the address is confirmed, the outcome of the registration's message as its first sentence where the page gives one (question 11, point 4), focus back on „Wyślij ponownie” after the answer. The menu opens on a click and on Enter or Space on „Konto”, closes on Escape, on a click outside it and on a second click on „Konto”, focus then on „Konto” (row 7), and stays open while „Wyloguj” or „Wyślij ponownie” waits and after the answer, until the player closes it (row 8); Tab moves through its controls, with no arrow keys. The document's listeners of Escape and of a click outside stand in an Effect with its cleanup (D-267). The look stands in `src/browser/styles.css` as the styleguide gives it. The new test `tests/view/menu-bar.test.mjs` runs on the jsdom harness (D-264) and holds, as cases of the menu, the behaviour the cases of `tests/view/email-status.test.mjs` prove of the DOM row (which stays until Slice 7), each way of opening and closing of row 7 with focus, row 8, the marked item for each screen, „Wróć do przejścia” present and absent, and the bar of a waiting screen.
- **Change:** `src/browser/view/menu-bar.tsx` · `tests/view/menu-bar.test.mjs` · `src/browser/styles.css`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:30-33` To do · `docs/task-cycles/ekrany-i-menu/task.md:55-57` To do · `docs/task-cycles/ekrany-i-menu/task.md:61-64` To do · `docs/task-cycles/ekrany-i-menu/task.md:85-90` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:111-115` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:121-126` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:132-145` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:208-221` Zadanie zapisuje w całości · `docs/task-cycles/ekrany-i-menu/task.md:233-234` Zadanie urzeczywistnia część, a resztę pisze inne zadanie · `docs/task-cycles/ekrany-i-menu/task.md:266-276` Obecne decyzje, których zadanie dotyka bez zmiany · `docs/task-cycles/ekrany-i-menu/task.md:278-296` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:792-805` D-36 · `foundations/decisions.md:882-895` D-42 · `foundations/decisions.md:912-925` D-44 · `foundations/decisions.md:957-970` D-47 · `foundations/decisions.md:1786-1799` D-97 · `foundations/decisions.md:2881-2894` D-157 · `foundations/decisions.md:5318-5339` D-262 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5462-5489` D-267 · `foundations/decisions.md:5491-5534` D-268 · `foundations/decisions.md:5562-5589` D-270 · `foundations/decisions.md:5709-5734` D-275 · `foundations/decisions.md:5736-5772` D-276 · `foundations/decisions.md:5774-5792` D-277 · `foundations/decisions.md:5817-5839` D-279
  Foundation entries rows E3, E4, E12, E15, E20, E24, E26, E27, E28, E29, E30, E31
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:236-246` content-identifiers · `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:469-477` browser-view-focus-outline · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `src/browser/view/account-card.tsx` · `src/browser/view/controls/react-button.tsx` · `src/browser/view/email-status.ts` · `tests/view/email-status.test.mjs` · `tests/view/page-document.mjs` · `src/browser/account-api.ts` · `src/browser/sim/data/about.ts`
  made by an earlier slice, named without backticks as it does not exist at the base: src/browser/view/screen-address.ts (Slice 3)
- **Model:** same — a menu worked by keyboard, with focus coming back, waiting states and a request of its own, is the riskiest new interaction of the task, and its slips are what a document imitation hides.
- **Risk:** none
- **Checks:** start from the failing cases of Escape returning focus to „Konto” and of the menu staying open after an answer; `npm test -- tests/view/menu-bar.test.mjs`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/invariants/test_content_identifiers.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 2 · Slice 3 · E3 · E4 · E26 · E27 · E28 · E29 · E30 · E31

## What earlier slices delivered (orchestrator's note; the files are the source)

- Slice 1 (commit `c0211e6`): `guidelines/styleguide-browser-view.md` has a new rule *Menu bar, the
  menu „Konto” and the list of programs* — the look and states of the bar's items, the menu and the
  list; build the CSS from it. Read the file whole.
- Slice 2 (commit `893d26c`): `ReactButton` takes the kind `destructive` and `expanded`; the DOM form
  has `expanded` in `createButton` and `setButtonExpanded`.
- Slice 3 (commit `fa6b322`): `src/browser/view/screen-address.ts` exports the type `Screen`
  (`headquarters`, `character {characterId}`, `programs`, `program {programId}`, `run {characterId}`),
  `MenuItem` (`"headquarters" | "programs"`), `ReturnEntry` (`{ text, address }`), `readScreenAddress`,
  `resolveScreen`, `screenAddress`, `markedMenuItem` and `returnToRunEntry`. Use them; do not
  duplicate address logic in the bar.

## Orchestrator's rulings that bind this slice

- **Layout of the bar** (the styleguide states no position; this is layout, not a new meaning): the
  game's name at the left, then „Siedziba”, „Programy” and, where the page gives it, „Wróć do przejścia
  · {mapa} · minuta {m}”, and „Konto” at the right edge of the bar. No divider line under the bar.
- **Open state of „Konto”:** no look of its own; `aria-expanded` comes from the `expanded` option of
  Slice 2. Enter and Space open it (a native button does both); the open menu's controls are reached
  with Tab.
- Name any look or behaviour you had to choose beyond these in your report under *Choices made*.

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice4.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
