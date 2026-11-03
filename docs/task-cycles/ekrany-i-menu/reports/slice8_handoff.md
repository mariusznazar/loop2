# Handoff — slice 8 of the task `ekrany-i-menu`

You make **slice 8** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `ff62598`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: the strongest available (the plan's class for slice 8; Fable 5.1 if the harness allows it, otherwise Opus 5.5)
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice8.md`.

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
| E1 | D-283 (new) | 8e458d4 |
| E2 | D-96 (changed, projected whole) | a3ec192 |
| E8 | D-212 (changed, projected whole) | 95a3fea |
| E9 | D-217 (changed, projected whole; heading now „What does the game show…”) | 50ea549 |
| E11 | glossary `headquarters` (projected whole) | d6d3e07 |
| E12 | D-280 (new, part) | 4ba1483 |
| E13 | D-281 (new, part) | 4ba1483 |
| E14 | D-282 (new, part) | 4ba1483 |
| E16 | D-53 (part) | 95a3fea |
| E19 | D-246 (part) | 50ea549 |
| E23 | D-225 (correction) | a3ec192 |
| E33 | D-286 (new) | f694d86 |
| E35 | D-284 (new) | 8e458d4 |
| E36 | D-62 (part, minimal) | 95a3fea |
| E37 | D-132 (Verification only) | 95a3fea |
| E38 | D-173 (Verification only) | 95a3fea |

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:15-26`

```
  15	## Description
  16	
  17	### Need
  18	
  19	- Zalogowany gracz ma dziś jedną stronę: po lewej zawsze panel programu, po prawej Siedziba albo przejście (`src/browser/view/game-view.ts:94`).
  20	- Na tej stronie stoją razem program, postać, drzewa umiejętności, wysyłanie na mapy i skrzynka (zrzut `C:\Storage\The Brain\The Brain\.playwright-mcp\rozpoznanie\loop2_10_siedziba_po_przejsciu.png`).
  21	- Mariusz: „obecnie gra jest strasznie nieczytelna, gdzie loop pod tym względem było dużo dalej”, a najbardziej chodzi mu o „podział na ekrany, układ elementów, interfejs tworzenia programu, animację ludzika”.
  22	- Definicja projektu wskazuje podział na ekrany wśród rzeczy najważniejszych: „najbardziej zależy mi na edytorze, ludziku i stronie logowania, bo to obecnie jest w najgorszym stanie + podział na ekrany”.
  23	- Odświeżenie strony nie ma dziś dokąd wrócić, bo żaden ekran nie ma adresu.
  24	- Przejście ręczne nie ma dziś stanu „gracz wyszedł, przejście czeka”, bo gracz nie może opuścić jego ekranu.
  25	- Cel zadania w planie: „Zalogowany gracz przechodzi między osobnymi ekranami Siedziba, Postać i Programy pod adresami po `#`, pod jednym paskiem menu z „Konto”; odświeżenie zostaje na tym samym ekranie, a wyjście z ekranu ręcznego przejścia pauzuje je i w menu staje „Wróć do przejścia”, które stoi tam też po końcu przejścia, do „Restart” albo „Zakończ”.”
  26	- Na tym zadaniu stoją zadania 5, 6, 13 i 22, które wstawiają swoje ekrany pod ten pasek.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:34-43`

```
  34	2. Ekrany mają adresy po `#`: `#/` to Siedziba, `#/postac/{n}` to Postać, `#/programy` i `#/programy/{n}` to Programy, `#/postac/{n}/przejscie` to ekran przejścia; {n} to numer postaci (D-56) albo programu (D-165).
  35	   - Odświeżenie pod adresem ekranu zostaje na tym ekranie; pod adresem bez fragmentu i po zalogowaniu formularzem gra prowadzi do Siedziby albo, gdy zapis gry trzyma ręczne przejście, do tego przejścia (pytanie 1).
  36	   - Przyciski wstecz i naprzód przeglądarki prowadzą po tych adresach.
  37	   - Adres, który nie prowadzi do istniejącego ekranu, po cichu otwiera najbliższy: `#/postac/{n}/przejscie` bez przejścia ekran Postać tej postaci, `#/programy/{n}` bez takiego programu `#/programy`, a każdy inny Siedzibę (pytanie 8).
  38	   - Fragmenty `#confirm-email=` i `#reset-password=` działają jak dotąd (D-156, D-225); gdy po nich gra buduje się dla zalogowanego gracza, otwiera Siedzibę (D-96).
  39	   - „Anuluj” formularza „Ustaw nowe hasło” otwiera zalogowanemu graczowi Siedzibę, a niezalogowany widzi formularze konta, jak dziś (pytanie 16).
  40	3. Siedziba jest osobnym ekranem: sekcja „Gdy cię nie było”, sekcja „Drużyna” z nagłówkiem i sekcja „Skrzynka”, bez panelu programu i bez umiejętności.
  41	   - Wysyłanie zostaje tu jak dziś: lista „Program:”, „Mapa: …”, zdanie warunku, „Wyślij”, „Puść w pętlę” i ich ostrzeżenia, do zadania 13.
  42	   - Imię na karcie postaci jest odnośnikiem do `#/postac/{n}` (pytanie 7).
  43	   - Gracz, który wraca do ręcznego przejścia, czyta raport z nieobecności po wejściu na Siedzibę (D-246).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:50-57`

```
  50	6. Ekran przejścia pod `#/postac/{n}/przejscie` pokazuje to, co dziś stoi przy przejściu: panel programu z kopią i kolumnę przejścia; nowy układ robi zadanie 6.
  51	   - Ekran dostaje przejście jako parametr i sam nie czyta przejścia ze stanu gry.
  52	   - Lista wyboru panelu ma na górze „Kopia w przejściu”, a pod nią zapisane programy gracza (D-166).
  53	   - Wysłanie postaci prowadzi na ten ekran.
  54	   - „Zakończ” prowadzi na ekran Postać tej postaci (pytanie 6).
  55	7. Wyjście z ekranu przejścia, którąkolwiek drogą, zatrzymuje je jak „Pauza”, a pętle chodzą dalej; powrót go nie wznawia, przejście czeka w pauzie na „Wznów” (pytanie 10).
  56	   - Poza ekranem przejścia, gdy ręczne przejście trwa albo skończyło się i czeka na „Restart” albo „Zakończ”, w menu stoi „Wróć do przejścia · {mapa} · minuta {m}”, na przykład „Wróć do przejścia · Las · minuta 212”, i prowadzi pod adres przejścia (pytania 2 i 9).
  57	   - Na samym ekranie przejścia tej pozycji nie ma (pytanie 9).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:66-68`

```
  66	11. Zdanie strony nad ekranem gry, jak „Adres e-mail potwierdzony.” albo zdanie o odrzuconym zapisie, znika przy pierwszej zmianie ekranu (pytanie 12).
  67	12. Wiersz wskrzeszenia czyta się „Wskrzeszenie za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie”, a poniżej godziny „za {m} min czasu realnego” (D-217), i odświeża się z upływem czasu także wtedy, gdy przejście czeka (odczyt nieskreślony przez Mariusza 2026-11-03, drugi pakiet rundy, część F).
  68	13. Każda kolumna ekranu jest osobnym obszarem, który węższy układ może przestawić, a drużyna jest sekcją z nagłówkiem.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:78-84`

```
  78	- Pytanie 1. Czy odświeżenie zostaje na ekranie z adresu, gdy zapis gry trzyma przejście?
  79	  - Answer: Tak. Adres wygrywa, gdy nazywa ekran; zasada o Siedzibie albo przejściu z zapisu działa tylko pod adresem bez fragmentu i po zalogowaniu formularzem, a po odnośniku z maila strona otwiera Siedzibę. Przejście czeka bezpiecznie w pauzie, a koszt to jedno kliknięcie „Wróć do przejścia”.
  80	  - Not chosen:
  81	    - Przy przejściu w zapisie każde odświeżenie prowadzi na ekran przejścia — cel z planu niespełniony, a gracz piszący program traci miejsce przy każdym odświeżeniu.
  82	    - Adres wygrywa też po zalogowaniu — inne konto w tej samej karcie trafia pod adres poprzedniego gracza.
  83	    - Bez decyzji — cykl wybierze sam, a jego wybór będzie wyglądał jak ustalenie.
  84	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B1 pakietu rundy zadań 4–7; ta sama treść stoi w zatwierdzonym D-96 (definicja_mvp2_loop2.md, odcisk 9641f804, wiersz 601: „signing in with email and password, and reloading with a valid session at an address with no fragment, that form apart, also lead to Siedziba, or, when the saved game state holds a manual map run, to that map run […] while a reload at another address stays on the screen that address leads to, and after an emailed link (D-156, D-224) the page opens Siedziba”).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:108-110`

```
 108	- Pytanie 6. Dokąd prowadzi „Zakończ”, zanim powstanie ekran Map?
 109	  - Answer: Na ekran Postać tej postaci, już w tym zadaniu; wysyłanie z karty mapy czeka na zadanie 13.
 110	  - Source: cytaty, nieskreślone przez Mariusza 2026-11-03: „The player sends a character to a game map from the card of the map on the screen Mapy, and „Zakończ” returns to the screen Postać of that character.” (definicja, odcisk 9641f804, wiersz 541, D-53); „ekran Map (zadanie 13) idzie po edytorze (zadanie 5), a do tej chwili postać rusza z Siedziby jak dziś” (plan_mvp2_loop2.md, dziennik, 2026-11-01). Krok, którego cytat nie mówi wprost: plan daje D-53 zadaniom 4 i 13, wysyłanie czeka na 13, więc zadaniu 4 przypada samo „Zakończ”.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:116-131`

```
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

#### `docs/task-cycles/ekrany-i-menu/task.md:146-150`

```
 146	- Pytanie 12. Jak długo zdania strony stoją nad ekranem gry?
 147	  - Answer: Zdanie stoi nad pierwszym ekranem i znika przy pierwszej zmianie ekranu.
 148	  - Not chosen:
 149	    - Stoi nad każdym ekranem do przeładowania — zdanie z chwili wejścia wisi nad Programami i Postacią.
 150	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta propozycja T7 pakietu rundy; utrzymana w pytaniu kontrolnym E3 drugiego pakietu rundy, które nazwało słabość wyboru („Gracz, który od razu kliknie w menu, może go nie przeczytać.”): Mariusz, 2026-11-03: „wszystko przyjmuję zgodnie z rekomendacjami”. Cytaty: „above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on” (foundations/decisions.md, D-156); „above which stands once” (D-96).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:167-169`

```
 167	- Pytanie 16. Co otwiera „Anuluj” formularza „Ustaw nowe hasło”?
 168	  - Answer: Zalogowanemu graczowi Siedzibę, jak po każdym odnośniku z maila; niezalogowany widzi formularze konta, jak dziś.
 169	  - Source: cytaty, nieskreślone przez Mariusza 2026-11-03 (drugi pakiet rundy, A1; „wszystko przyjmuję zgodnie z rekomendacjami”): „and after an emailed link (D-156, D-224) the page opens Siedziba” (zatwierdzony D-96, definicja, odcisk 9641f804, wiersz 601, w zdaniu o graczu z ważną sesją), gdzie D-224 to „What form does a password-reset link take?” (foundations/decisions.md przy 20d804b); D-225 mówi dziś: „„Anuluj”, which removes the fragment of the address and opens the page as usual”. Krok, którego cytat nie mówi wprost: „Anuluj” kończy stronę otwartą odnośnikiem D-224, więc zdanie o odnośniku z maila obejmuje też je; ten krok to odczyt agenta od planu (plan_mvp2_loop2.md, dziennik, 2026-11-03, uwaga dla zadania 4 o D-225), pokazany Mariuszowi w A1. Uwaga planu w tej samej linii: wybór przejścia z zapisu byłby odejściem od zatwierdzonego D-96 i dostałby własną linię w dzienniku.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:176-192`

```
 176	## Context
 177	
 178	- Numery wierszy kodu poniżej są z commitu `20d804b`; pliki, których dotyczą, nie zmieniły się od `799d1ff`.
 179	- Zadanie 27 jest scalone (PR #54): dało znak bieżącej pozycji menu (D-277), akcję poboczną (D-275), zakładkę (D-276) i status `do not copy` przy modułach w DOM w `guidelines/coding-browser-module.md`.
 180	- Plan, 2026-11-01: „ekran Map (zadanie 13) idzie po edytorze (zadanie 5), a do tej chwili postać rusza z Siedziby jak dziś”.
 181	- Zadanie 13 nie należy do fazy „Przed zgłoszeniem 10x”, więc wysyłanie z Siedziby może zostać na dłużej.
 182	- Dzisiejszy układ i widoczność Siedziby: `src/browser/view/game-view.ts:94-104`, `:267-280`.
 183	- Wiersze wskrzeszenia odświeżają się dziś tylko bez przejścia (`src/browser/view/game-view.ts:179-181`).
 184	- Widok programu to stan panelu, nie stanu gry (`src/browser/view/program-panel.ts:94`).
 185	- Nagłówek, stopka, ekrany oczekiwania i „Wyloguj”: `src/browser/view/app.ts:134-156`, `:397-436`.
 186	- Czysto liczące funkcje wiersza wskrzeszenia i pętli stoją dziś w `src/browser/view/headquarters.ts:101`, `:122`, `:130`, a ekran Postać ich potrzebuje.
 187	- Umiejętności: `src/browser/view/character-skills.ts`; „Kup” jest wyłączone przy każdym przejściu (`:115`).
 188	- Wspólne kontrolki w React to dziś przycisk — zwykły, akcja poboczna, wybrany w grupie i zakładka (`src/browser/view/controls/react-button.tsx:10`) — i pola tekstowe (`react-text-field.tsx`); przycisk niszczący, lista wyboru i pole liczby mają tylko postać DOM.
 189	- D-270 nie dopuszcza biblioteki adresów opartej na React bez zmiany tej decyzji, więc adresy obsługuje kod produktu.
 190	- Plan, 2026-11-03, uwaga dla zadań 4 i 13: D-196 i D-55 mówią o przejściu w toku, a skończone przejście zostaje w stanie gry do „Restart” albo „Zakończ”; zadanie 4, które poprawia D-196, nazywa przy tym stan po końcu przejścia.
 191	- Szkic ekranów i przejść stoi w `rozpoznanie_mvp2\rozpoznanie_projektant.md`, części A.3 i A.4; to materiał, nie zatwierdzone wymaganie.
 192	- Zadanie nie zmienia sposobu wdrażania ani miejsca działania gry.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:202-276`

```
 202	## Decisions in play
 203	
 204	Wpisy obecne cytuje `foundations/decisions.md` przy loop2 `20d804b`. Wpisy projektowane cytuje `definicja_mvp2_loop2.md` zatwierdzona 2026-11-03, odcisk 9641f804. Przydziały pochodzą z sekcji *Projected entries* planu.
 205	
 206	Pole *Relations* i *Verification* wpisu projektowanego z `TODO` cykl ustala przy zapisie, a pole, które czeka na zadanie, zostaje takie, jak w fundamencie (definicja, „Projected foundation changes”).
 207	
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
 246	
 247	### Przykłady i zdania do poprawy w tym zadaniu
 248	
 249	- D-196 (*Verification* i *Rationale*): „a branch bought by any teammate opening that action in the headquarters editor”, „the headquarters editor cannot add a branch action”; edytor stoi teraz na ekranie Programy (plan, pytanie o nieaktualne przykłady: „D-196 i D-207 w zadaniu 4”). Zdanie wiążące „During a map run, both the copy editor and the saved-program editor use the running character’s repertoire” nazywa przy tym przejście, które czeka (pytanie 15), i przejście, które skończyło się i czeka na „Restart” albo „Zakończ” (pytanie 17; plan, uwaga dla zadań 4 i 13): w obu edytorach oferta idzie wtedy za postacią z przejścia. *Rejected* niesie drogę nie wybraną w pytaniu 17.
 250	- D-207 (*Verification*): „„Kup” of a branch rank in the headquarters followed at once by a save request”; „Kup” stoi teraz na ekranie Postać.
 251	- D-225: „„Anuluj”, which removes the fragment of the address and opens the page as usual”; po tym zadaniu „Anuluj” otwiera zalogowanemu graczowi Siedzibę, a niezalogowany widzi formularze konta, jak dziś (pytanie 16). Reszta D-225, zdanie po ustawieniu hasła i po odmowie odnośnika, zostaje bez zmian.
 252	- D-275 (*Verification*): „„Wyloguj” in the header kept a plain button”; „Wyloguj” stoi teraz w menu „Konto” (D-97).
 253	
 254	### Obecne decyzje, których zadanie dotyka bez zmiany
 255	
 256	- D-55 — How many manual map runs go on at a time? (*Verification*): „„Wyślij” beside the other characters inactive wherever the headquarters shows during a manual map run”; stan po końcu przejścia nazywa przy tym wpisie zadanie 13 (plan, uwaga dla zadań 4 i 13).
 257	- D-122 — What does a map run do, and what does the player see, when something is discovered?: „the map run stops in the same pause as after „Pauza””.
 258	- D-129 — How long does the pace the player picks stay?: „through a pause, the pause at a discovery included”.
 259	- D-156 — How does an emailed link confirm a player's email address?: „above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on”.
 260	- D-164 — Who owns a program?: „A program can be edited at any time”.
 261	- D-170, D-188, D-243, D-251 i D-149 zostają przy Siedzibie, bo wysyłanie zostaje tam do zadania 13.
 262	- D-180 — Where does the player arrange the trip plan?: „The program panel shows a section „Plan wyprawy” below the rule groups”; plan przydziela zmianę zadaniom 5 i 13.
 263	- D-207 — When does the game save the game state on the server?: „right after each change of it the player makes — […] a pause and a pace”, więc pauza przy wyjściu z ekranu zapisuje, a sama zmiana ekranu nie.
 264	- D-213 — Which file is the exemplar for saved-game code?: o błędzie kodu przy wczytywaniu „while the player gets the sentence of D-96”.
 265	- D-250 — What does a pause or an end screen hold?: „hold that map run, and the earning loops of other characters go on through them”.
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

### Slice 8 — The game's screens by address

- **Goal:** `game-view.ts` shows one screen at a time, the one the address names, which it reads and writes through `PageAddress`. `email-confirmation.ts` extends that type with going to a fragment with a new entry of the history, replacing the fragment without one, and a listener of the browser's back and forward that returns its removal, `browserAddress` doing them through `location`, `history` and the `hashchange` event; the tests give an address of their own, as `tests/view/account-screen.test.mjs` already does. The screens: Siedziba — the program panel beside the headquarters, as today, until Slice 10; Postać — Slice 5's screen, created on entering it and disposed on leaving; Programy — the program panel alone, until Slice 10; and Przejście — a new DOM module `src/browser/view/run-screen.ts` holding the program panel with the copy and the column of the map run as `game-view.ts` holds them today (status row, line of discovery, combat line, lines of the trip, body row, practice, terrain panel), whose update takes the map run the address names as a parameter and reads no map run of the game state by itself (To do item 6), handing its parts a game state with that map run in place and leaving their signatures as they are. DOM screens are built once and hidden while another shows. The first screen: after the sign-in form or a registration, and at a reload with no fragment, Siedziba, or the manual map run's screen where the game state holds one (question 1, E2); at a reload at an address, the screen it names; after an emailed link and after „Anuluj” of „Ustaw nowe hasło” for a signed-in player, Siedziba (D-96, question 16, E23); a game built again after a conflict (D-209) stays on the screen the address names; `app.ts` tells the game view which of these entries built it. An address that leads to no existing screen opens the nearest one (Slice 3) and has its fragment replaced with that screen's, with no new entry of the history. A send leads to Przejście of that character (To do item 6) and „Zakończ” to Postać of that character (question 6, E16), each with a new entry of the history. Leaving Przejście by any change of screen pauses a manual map run that goes on, through the simulation's `setPaused` and so as a moment of saving (D-207); coming back resumes nothing, the player pressing „Wznów” (To do item 7, question 10, row 14); a logout or an expiry leaves the game with no change of screen and pauses nothing. The game view hands the bar its place and its „Wróć do przejścia” through an option that `app.ts` passes on to the bar's `update`. Each reading of the clock rewrites the resurrection lines of Siedziba and Postać whenever they show, also while a manual map run stands (To do item 12). The page's sentence above the first screen — a confirmation, a refused load — leaves at the first change of screen (To do item 11, row 10). Each column of a screen is an area of its own in `src/browser/styles.css` that the narrow layout rearranges (To do item 13). The cases of `tests/view/account-screen.test.mjs` that assumed one page — the headquarters hidden during a map run, „Zakończ” showing the report, the report hidden with the headquarters — change with their reason, and new cases hold each entry's first screen, a reload at each address, back and forward, the nearest screen for crafted fragments through the page (`#/postac/x`, `#/programy/-1`, a long fragment, `#confirm-email=…` and `#reset-password=…` beside a screen's address), a leave of Przejście pausing and saving, a return resuming nothing, the addresses after a send and after „Zakończ”, „Anuluj” leading to Siedziba, the sentence leaving, and the bar's place and „Wróć do przejścia”.
- **Change:** `src/browser/view/game-view.ts` · `src/browser/view/run-screen.ts` · `src/browser/view/app.ts` · `src/browser/view/email-confirmation.ts` · `tests/view/email-confirmation.test.mjs` · `tests/view/account-screen.test.mjs` · `src/browser/styles.css` · `src/browser/view/character-screen.tsx`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:15-26` Need · `docs/task-cycles/ekrany-i-menu/task.md:34-43` To do · `docs/task-cycles/ekrany-i-menu/task.md:50-57` To do · `docs/task-cycles/ekrany-i-menu/task.md:66-68` To do · `docs/task-cycles/ekrany-i-menu/task.md:78-84` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:108-110` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:116-131` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:146-150` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:167-169` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:176-192` Context · `docs/task-cycles/ekrany-i-menu/task.md:202-276` Decisions in play · `docs/task-cycles/ekrany-i-menu/task.md:278-296` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:52-112` D-04 · `foundations/decisions.md:443-475` D-21 · `foundations/decisions.md:1065-1084` D-53 · `foundations/decisions.md:1105-1123` D-55 · `foundations/decisions.md:1227-1240` D-62 · `foundations/decisions.md:1771-1784` D-96 · `foundations/decisions.md:2193-2227` D-122 · `foundations/decisions.md:2383-2405` D-129 · `foundations/decisions.md:2463-2487` D-132 · `foundations/decisions.md:2866-2879` D-156 · `foundations/decisions.md:2982-2995` D-164 · `foundations/decisions.md:3012-3030` D-166 · `foundations/decisions.md:3122-3135` D-173 · `foundations/decisions.md:3680-3740` D-207 · `foundations/decisions.md:3762-3804` D-209 · `foundations/decisions.md:3833-3864` D-211 · `foundations/decisions.md:3866-3904` D-212 · `foundations/decisions.md:3999-4010` D-217 · `foundations/decisions.md:4169-4189` D-224 · `foundations/decisions.md:4191-4225` D-225 · `foundations/decisions.md:4875-4927` D-246 · `foundations/decisions.md:5017-5038` D-250 · `foundations/decisions.md:5294-5316` D-261 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5491-5534` D-268 · `foundations/decisions.md:5562-5589` D-270
  Foundation entries rows E1, E2, E8, E9, E11, E12, E13, E14, E16, E19, E23, E33, E35, E36, E37, E38
  `foundations/invariants.md:198-212` player-map-run-pace · `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:999-1007` expired-session-unsaved-progress · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `foundations/glossary.md:18-23` map run · `foundations/glossary.md:65-71` map run restart · `foundations/glossary.md:87-91` headquarters · `foundations/glossary.md:130-134` manual map run · `foundations/glossary.md:174-178` copy
  `src/browser/view/headquarters.ts` · `src/browser/view/program-panel.ts` · `src/browser/view/status-row.ts` · `src/browser/view/clock.ts` · `src/browser/view/game-saver.ts` · `src/browser/view/password-reset.ts` · `src/browser/sim/game.ts:311-430` · `tests/view/page-document.mjs`
  made by earlier slices, named without backticks as they do not exist at the base: src/browser/view/screen-address.ts (Slice 3) · src/browser/view/menu-bar.tsx (Slice 4)
- **Model:** strongest — the switching of screens, the pause on leaving, the four entries and the address meet in one module every later slice builds on, and its slips are history and focus faults a document imitation hides.
- **Risk:** none
- **Checks:** start from the failing cases of a leave of Przejście that pauses and saves and of a reload at `#/postac/{n}`; `npm test -- tests/view/account-screen.test.mjs`; `npm test -- tests/view/email-confirmation.test.mjs`; `npm test -- tests/view/screen-address.test.mjs`; `npm test -- tests/view/character-screen.test.mjs`; `npm test -- tests/view/clock.test.mjs`; `npm test -- tests/view/status-row.test.mjs`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3 · Slice 5 · Slice 7 · E1 · E2 · E8 · E13 · E16 · E23 · E33 · E35 · E36

## What earlier slices delivered (orchestrator's note; the files are the source)

- Slice 3 (`fa6b322`): `src/browser/view/screen-address.ts` — `Screen` (`headquarters`, `character`,
  `programs`, `program`, `run`), `readScreenAddress(hash)`, `resolveScreen(named, state)`,
  `screenAddress(screen)`, `markedMenuItem(screen)`, `returnToRunEntry(state)`; its test table of
  crafted fragments is `tests/view/screen-address.test.mjs`.
- Slice 4 (`240d639`) and Slice 7 (`ff62598`): `src/browser/view/menu-bar.tsx` stands in the page's
  header (`app.ts` `drawBar()`), with `screen: { kind: "headquarters" }` and no return entry for now —
  yours to drive from the game view's screen, as the plan's goal says. The bar's `props` are
  `{ account, screen, returnEntry, registrationMessage, logout: { waiting, sentence } }`.
- Slice 5 (`edb2862`): `src/browser/view/character-screen.tsx`, `createCharacterScreen({ onBuy,
  onStop, props })` with `update(props)` and `dispose()`; props `{ state, nowMs, characterId }`;
  `resurrectionLine` in `headquarters.ts` now reads the D-217 wording.
- Slice 6 (`6dc4819`): `src/browser/view/program-list.tsx` (placed by Slice 10, not you).
- Ranges: the foundation step wrote D-280 to D-287 and changed the entries named in your *Read*; the
  line ranges in your section were recomputed at the foundation head and the foundation files have not
  changed since.

## Orchestrator's rulings that bind this slice

- **A case you must hold (record Q14):** a clock reading rewrites the resurrection lines of Siedziba
  and of Postać whenever they show, also while a manual map run waits (paused or ended); Slice 5's
  screen takes the moment on every `update` but no case there shows it moving with a waiting run.
- **Check the address behaviour in the real browser yourself**, as Slice 7's author did (the settled
  route is `.claude/skills/loop2-play/SKILL.md`: `npm run local`, Playwright CLI, an account through the
  login card, `npm run local:stop`, `playwright-cli close`; delete `.playwright-cli/` when done): a
  reload at `#/postac/1`, the back and forward buttons across two screens, and a send leading to the
  screen of the map run. jsdom with an address of your own cannot show the history of the real
  `browserAddress`; report each step with its observed result. The orchestrator's later walk covers
  the rest.
- The screen of a map run may keep today's behaviour of the status row (pause, pace, „Restart”,
  „Zakończ”) exactly; only where it stands changes.
- Name every look or behaviour you had to choose beyond the plan in your report under *Choices made*.

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice8.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
