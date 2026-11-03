# Handoff — slice 9 of the task `ekrany-i-menu`

You make **slice 9** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `649e25d`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: cheaper than the orchestrator's (Haiku 5.5), the default class of the plan
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice9.md`.

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
| E5 | D-199 (changed, projected whole; heading now „…the screen Postać…”) | 50ea549 |
| E6 | D-200 (changed, projected whole) | 50ea549 |
| E10 | D-244 (changed, projected whole) | 50ea549 |
| E11 | glossary `headquarters` (projected whole) | d6d3e07 |
| E14 | D-282 (new, part) | 4ba1483 |
| E18 | D-245 (part) | 50ea549 |
| E19 | D-246 (part) | 50ea549 |
| E25 | D-287 (new) | f694d86 |
| E27 | D-280 | 4ba1483 |
| E39 | none written | — |

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:40-44`

```
  40	3. Siedziba jest osobnym ekranem: sekcja „Gdy cię nie było”, sekcja „Drużyna” z nagłówkiem i sekcja „Skrzynka”, bez panelu programu i bez umiejętności.
  41	   - Wysyłanie zostaje tu jak dziś: lista „Program:”, „Mapa: …”, zdanie warunku, „Wyślij”, „Puść w pętlę” i ich ostrzeżenia, do zadania 13.
  42	   - Imię na karcie postaci jest odnośnikiem do `#/postac/{n}` (pytanie 7).
  43	   - Gracz, który wraca do ręcznego przejścia, czyta raport z nieobecności po wejściu na Siedzibę (D-246).
  44	4. Ekran Postać pokazuje jedną postać: imię, pokolenie, archetyp, wiersz wskrzeszenia, wiersz pętli z „Zatrzymaj” albo wiersz zatrzymanej pętli i sekcję „Umiejętności” z „Kup”, w treści D-199, D-200, D-217, D-244 i D-245.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:58-60`

```
  58	8. Na Siedzibie i ekranie Postać, gdy ręczne przejście czeka albo się skończyło, działa to, na co pozwala symulacja, a „Wyślij”, „Puść w pętlę” postaci z tego przejścia i „Kup” są nieaktywne (pytanie 3).
  59	   - Przy nieaktywnych przyciskach Siedziby stoi „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”.
  60	   - Przy „Umiejętności” stoi „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.”.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:68-68`

```
  68	13. Każda kolumna ekranu jest osobnym obszarem, który węższy układ może przestawić, a drużyna jest sekcją z nagłówkiem.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:91-101`

```
  91	- Pytanie 3. Co gracz może robić na Siedzibie i ekranie Postać, gdy przejście czeka albo się skończyło, i czy gra mówi, dlaczego „Wyślij” i „Kup” nie działają?
  92	  - Answer: Działa to, na co pozwala symulacja, a przy nieaktywnych przyciskach stoi jedno zdanie, prawdziwe w obu stanach: „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”, a przy „Umiejętności”: „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.”. „Kup” jest odmówione także po końcu przejścia, do „Restart” albo „Zakończ”. Fakty z kodu przy 20d804b: symulacja odmawia „Wyślij” (`src/browser/sim/game.ts:316`) i „Kup” (`src/browser/sim/skills.ts:151`) przy każdym przejściu w stanie gry, także skończonym, a „Puść w pętlę” tylko postaci z tego przejścia (`src/browser/sim/loop.ts:118-123`).
  93	  - Not chosen:
  94	    - Jak wyżej, bez zdań — wyłączone przyciski bez powodu.
  95	    - Siedziba i Postać tylko do oglądania — gracz nie puści pętli innej postaci, a kod musi blokować to, na co symulacja pozwala.
  96	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B3 (C) pakietu rundy; w pakiecie zdanie przy „Umiejętności” stało jako „… Stopnie kupisz po jego zakończeniu.”, gdzie „…” to pierwsze zdanie przy Siedzibie — odczyt nieskreślony przez Mariusza 2026-11-03 (drugi pakiet rundy, część F); zdania potwierdzone także przyjęciem wiersza kandydatów 1 (drugi pakiet rundy, część D). Cytaty: „„Wyślij” beside the other characters inactive wherever the headquarters shows during a manual map run” (foundations/decisions.md przy 20d804b, D-55, *Verification*); „A pause of a manual map run, its stop at a discovery and the screen after its end hold that map run, and the earning loops of other characters go on through them.” (D-250); zatwierdzony D-200 (definicja, odcisk 9641f804, wiersz 901): „outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ””.
  97	- Pytanie 4. Które ekrany tego zadania powstają w React?
  98	  - Answer: Pasek menu, ekran Postać i lista programów powstają w React; Siedziba zostaje w DOM, traci tylko umiejętności, a przenosi ją zadanie 13; dzisiejszy panel programu i ekran przejścia zostają w DOM do zadań 5 i 6. Zadanie 4 przenosi umiejętności (`src/browser/view/character-skills.ts`, 123 wiersze, z 138 wierszami testu), a lista wyboru i pole liczby w React należą do zadania 5.
  99	  - Not chosen:
 100	    - Siedziba przechodzi na React w tym zadaniu — 552 wiersze i 18 przypadków testu, a wiersze wysyłania, które zadanie 13 usunie, trzeba napisać dwa razy; zysk: kolejne zadania zastają ją gotową.
 101	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B4 (A) pakietu rundy; reguła z zadania 27: „Reguła dotyczy tylko nowych ekranów: dokładka do starego ekranu może powstać w DOM, a przenosi ją dopiero zadanie tego ekranu.” (zadanie_hierarchia_przyciskow_i_karta_logowania.md, pytanie 5b).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:111-115`

```
 111	- Pytanie 7. Co stoi w pasku menu, zanim powstaną Mapy i Wiedza, i jak gracz dochodzi do ekranu Postać?
 112	  - Answer: Pasek ma Siedzibę, Programy i „Konto”; imię na karcie postaci prowadzi na Postać, a na Postaci pasek znaczy Siedzibę, jak w starym Loop. Pozycje nie mają ikon, inaczej niż w starym Loop.
 113	  - Not chosen:
 114	    - Mapy i Wiedza stoją od razu, wyłączone — dwie pozycje bez treści.
 115	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta propozycja T1 pakietu rundy; znak bieżącej pozycji daje D-277 (foundations/decisions.md przy 20d804b).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:208-245`

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
 222	
 223	### Zadanie urzeczywistnia część, a resztę pisze inne zadanie
 224	
 225	Część, którą kod tego zadania czyni prawdziwą, zadanie zapisuje w fundamencie (WAY-126), bo inaczej fundament mówiłby nieprawdę o scalonej grze.
 226	
 227	- (new) — Which screens does the game have, and how does the player move between them? (definicja; pisze zadanie 22): „The game has the screens Siedziba, Postać, Mapy, Programy, Wiedza and Przejście, all of one content width under one menu bar. The menu bar holds Siedziba, Mapy, Programy, Wiedza and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia” with the map and the map run's clock.”
 228	  - Część tego zadania: ekrany Siedziba, Postać, Programy i Przejście, jedna szerokość, pasek z Siedzibą, Programami i „Konto”, „Wróć do przejścia”.
 229	- (new) — How does an address name a screen? (definicja; pisze zadanie 22): „An address names a screen in the fragment after `#`: `#/`, `#/postac/{n}`, `#/mapy`, `#/mapy/{map}`, `#/programy`, `#/programy/{n}`, `#/wiedza` and `#/postac/{n}/przejscie`, the last naming a map run by the number of its character, and an address that leads to no existing screen silently opens the nearest one: `#/postac/{n}/przejscie` with no map run the screen Postać of that character, `#/programy/{n}` with no such program `#/programy`, and any other Siedziba. The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself. The fragments of emailed links (D-156, D-224) stand apart from these, and after them the page opens Siedziba.”
 230	  - Część tego zadania: wszystko poza adresami Map i Wiedzy.
 231	- (new) — What do the screens leave room for from the start? (definicja; pisze zadanie 5): „Each column of a screen is an area of its own that a narrower layout can rearrange, Siedziba draws the team as a section with a heading, and the rule panel offers its pick in steps, the action first and its target after it.”
 232	  - Część tego zadania: obszary i drużyna jako sekcja.
 233	- D-44 — Which controls do the screens of the browser view build on? (definicja; pisze zadanie 5): „and the button „Wyślij ponownie” then reads „Wysyłanie…””.
 234	  - Część tego zadania: to słowo; dziś stoi „the header's button „Wyślij ponownie””.
 235	- D-53 — Where does the player send a character from, and where does „Zakończ” lead? (definicja; pisze zadanie 13): „The player sends a character to a game map from the card of the map on the screen Mapy, and „Zakończ” returns to the screen Postać of that character.”
 236	  - Część tego zadania: „Zakończ” (pytanie 6); wysyłanie z karty mapy robi zadanie 13.
 237	- D-166 — Where does the player see the player's programs and pick the one to edit? (definicja, wpis zmieniony; pisze zadanie 5): „The screen Programy holds on the left the list of the player's programs and in the middle the program editor with the program picked there. That program is always a saved one, never the copy: while a manual map run goes on, or has ended and waits for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” stands above the editor, and „Przełącz postać na ten program” stands on the screen of a map run alone. On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it.”
 238	  - Część tego zadania: cały wpis poza nowym edytorem, który robi zadanie 5 (pytania 5 i 15).
 239	  - Obecny D-166 uznaje za błąd „a section of the headquarters or a screen of its own listing the programs”, więc to zdanie musi odejść w tym zadaniu.
 240	- D-245 — What does „Zatrzymaj” do? (definicja; pisze zadanie 25): „On the character's card and screen, until the next send or start of that character and after a load of the saved game state too, stands in the role `text-secondary` „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”, or „Pętla zatrzymana” where the earning loop gathered no practice.”
 241	  - Część tego zadania: karta i ekran zamiast „row”.
 242	- D-246 — What does the player read after being away? (definicja, wpis zmieniony; pisze zadanie 25): „and a player returning to a manual map run reads the report on reaching Siedziba.”
 243	  - Część tego zadania: to zdanie; dziś stoi „a player returning to a manual map run reads the report in the headquarters after „Zakończ””, co przestaje być prawdą, gdy Siedziba jest dostępna przed „Zakończ”, a po nim gracz trafia na Postać.
 244	- D-03 — How is the browser view built? (zapisana w zadaniu 2): „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state”.
 245	  - Plan wymienia to zadanie wśród urzeczywistniających; zakres rozstrzyga pytanie 4.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:256-261`

```
 256	- D-55 — How many manual map runs go on at a time? (*Verification*): „„Wyślij” beside the other characters inactive wherever the headquarters shows during a manual map run”; stan po końcu przejścia nazywa przy tym wpisie zadanie 13 (plan, uwaga dla zadań 4 i 13).
 257	- D-122 — What does a map run do, and what does the player see, when something is discovered?: „the map run stops in the same pause as after „Pauza””.
 258	- D-129 — How long does the pace the player picks stay?: „through a pause, the pause at a discovery included”.
 259	- D-156 — How does an emailed link confirm a player's email address?: „above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on”.
 260	- D-164 — Who owns a program?: „A program can be edited at any time”.
 261	- D-170, D-188, D-243, D-251 i D-149 zostają przy Siedzibie, bo wysyłanie zostaje tam do zadania 13.
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

### Slice 9 — Siedziba as a screen of its own

- **Goal:** `headquarters.ts` stops drawing the skills, which Postać draws (To do items 3 and 4); the name in each character's row becomes a link to `#/postac/{n}` (row 3); the section „Drużyna” keeps its heading (To do item 13); and while the game state holds a manual map run, going on or ended and waiting for „Restart” or „Zakończ”, each character's row whose „Wyślij” — and, at the map run's character, „Puść w pętlę” — is inactive shows under its lines of sending „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.” (To do item 8, row 1), the sentence given by a pure exported function, the map's name from the data, while everything the simulation allows stays active (question 3). `HeadquartersControls` loses `buy`, and `game-view.ts` its wiring. `character-skills.ts` loses `createCharacterSkills` and keeps its pure functions; the DOM case of `tests/view/character-skills.test.mjs` leaves, the case of `tests/view/character-screen.test.mjs` carrying its behaviour (reason: To do items 3 and 4); `tests/view/headquarters.test.mjs` gets the cases of the sentence; the cases of `tests/view/account-screen.test.mjs` that bought a rank on Siedziba buy it on Postać, each with its reason.
- **Change:** `src/browser/view/headquarters.ts` · `src/browser/view/character-skills.ts` · `tests/view/headquarters.test.mjs` · `tests/view/character-skills.test.mjs` · `tests/view/account-screen.test.mjs` · `src/browser/view/game-view.ts` · `src/browser/styles.css`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:40-44` To do · `docs/task-cycles/ekrany-i-menu/task.md:58-60` To do · `docs/task-cycles/ekrany-i-menu/task.md:68-68` To do · `docs/task-cycles/ekrany-i-menu/task.md:91-101` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:111-115` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:208-245` Decisions in play · `docs/task-cycles/ekrany-i-menu/task.md:256-261` Obecne decyzje, których zadanie dotyka bez zmiany · `docs/task-cycles/ekrany-i-menu/task.md:278-296` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:1065-1084` D-53 · `foundations/decisions.md:1105-1123` D-55 · `foundations/decisions.md:2765-2778` D-149 · `foundations/decisions.md:3077-3090` D-170 · `foundations/decisions.md:3355-3366` D-188 · `foundations/decisions.md:3518-3531` D-199 · `foundations/decisions.md:3533-3546` D-200 · `foundations/decisions.md:4799-4826` D-243 · `foundations/decisions.md:4828-4845` D-244 · `foundations/decisions.md:4847-4873` D-245 · `foundations/decisions.md:4875-4927` D-246 · `foundations/decisions.md:5017-5038` D-250 · `foundations/decisions.md:5040-5061` D-251 · `foundations/decisions.md:5392-5432` D-265
  Foundation entries rows E5, E6, E10, E11, E14, E18, E19, E25, E27, E39
  `foundations/invariants.md:236-246` content-identifiers · `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:519-527` character-team
  `foundations/glossary.md:87-91` headquarters · `foundations/glossary.md:130-134` manual map run
  `src/browser/view/away-report.ts` · `src/browser/sim/loop.ts:105-135` · `tests/view/page-document.mjs`
  made by an earlier slice, named without backticks as it does not exist at the base: src/browser/view/character-screen.tsx (Slice 5)
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from the failing case of the sentence beside an inactive „Wyślij” after the end of a map run; `npm test -- tests/view/headquarters.test.mjs`; `npm test -- tests/view/character-skills.test.mjs`; `npm test -- tests/view/account-screen.test.mjs`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_content_identifiers.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 8 · E25 · E27

## What earlier slices delivered (orchestrator's note; the files are the source)

- Slice 5 (`edb2862`): `src/browser/view/character-screen.tsx` draws the skills; it states the
  sentence beside „Kup” while a map run waits or has ended in the role **`text-secondary`** (recorded
  choice Q13: the explaining role, D-40). The sentence you add beside the inactive „Wyślij” and
  „Puść w pętlę” takes the **same role** (`text-secondary`) so that the two screens read alike.
- Slice 8 (`649e25d`): `game-view.ts` holds the screens; Siedziba is built once and hidden while another
  shows, the program panel stands beside the headquarters on Siedziba until Slice 10, Postać is built on
  entering. The clock tick rewrites Siedziba's lines (`headquarters.tick`) whenever Siedziba shows. The
  test file `tests/view/account-screen.test.mjs` is long (about 5 000 lines); read the cases your change
  touches (search for „Kup”, „Umiejętności”, `buy`), not the whole file.
- The wiring that buys a rank on Postać already exists in `game-view.ts` (Slice 8); your change removes
  the headquarters' own `buy` and its skills, nothing more there.

## Orchestrator's rulings that bind this slice

- The sentence beside the inactive buttons stands **once in each character's row** whose „Wyślij” (and,
  at the map run's character, „Puść w pętlę”) is inactive, under its lines of sending (the plan's
  choice). It names the map from the data (`MAPS`), never a typed name.
- Name every look or behaviour you had to choose beyond the plan in your report under *Choices made*.

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice9.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
