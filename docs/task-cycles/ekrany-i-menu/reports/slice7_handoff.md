# Handoff — slice 7 of the task `ekrany-i-menu`

You make **slice 7** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `6dc4819`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: same as the orchestrator's (Sonnet 5.5), reason in the plan: the page's logout, saving and answers about the account move into another element
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice7.md`.

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
| E2 | D-96 (changed, projected whole) | a3ec192 |
| E3 | D-97 (changed, projected whole) | 5d5075f |
| E4 | D-157 (changed, projected whole) | 5d5075f |
| E7 | D-208 (changed, projected whole) | 5d5075f |
| E12 | D-280 (new, part) | 4ba1483 |
| E15 | D-44 (part) | 5d5075f |
| E24 | D-275 (correction) | 5d5075f |
| E29 | D-280 | 4ba1483 |
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

#### `docs/task-cycles/ekrany-i-menu/task.md:61-66`

```
  61	9. Menu „Konto” trzyma adres, „Wyloguj” i sprawę niepotwierdzonego adresu z „Wyślij ponownie”, a wiersz niepotwierdzonego adresu znika z góry strony (D-97, D-157).
  62	   - Zdanie o wyniku wysyłania stoi w menu „Konto”, bez znaku na pasku (pytanie 11).
  63	   - Menu otwiera się kliknięciem albo klawiaturą, zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem, a fokus wraca wtedy na „Konto” (pytanie 11).
  64	   - Menu zostaje otwarte, gdy „Wyloguj” albo „Wyślij ponownie” czeka na serwer, i po odpowiedzi stoi otwarte, aż gracz je zamknie, więc zdanie o wyniku da się przeczytać (pytanie 11).
  65	10. Wiersz o nieudanym zapisie stoi pod paskiem menu i pokazuje się tylko przy kłopocie, także ze zdaniem D-97 po nieudanym zapisie przed wylogowaniem (D-208).
  66	11. Zdanie strony nad ekranem gry, jak „Adres e-mail potwierdzony.” albo zdanie o odrzuconym zapisie, znika przy pierwszej zmianie ekranu (pytanie 12).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:71-71`

```
  71	15. `guidelines/styleguide-browser-view.md` dostaje wygląd i stany pozycji menu, menu „Konto” i pozycji listy programów, przycisk „Wyślij ponownie” przestaje tam stać „z nagłówka”, a przykład „„Wyloguj” w nagłówku” i wiersz nagłówka na stronie wszystkich stanów idą za menu „Konto”; zmiany idą przez `the-way-maintain-styleguide`.
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

#### `docs/task-cycles/ekrany-i-menu/task.md:151-153`

```
 151	- Pytanie 13. Czy zapisywany D-96 zachowuje zdanie o błędzie kodu przy wczytywaniu?
 152	  - Answer: Tak, razem z klauzulą uzasadnienia; zatwierdzony D-96 już je ma.
 153	  - Source: cytaty, nieskreślone przez Mariusza 2026-11-03, a dziś zdanie zatwierdzonego D-96 (definicja, odcisk 9641f804, wiersz 601): „as does a load that meets an error of the code (D-213), which discards nothing, with „Nie udało się wczytać gry. Spróbuj ponownie.” in `warning`”, i jego uzasadnienia (wiersz 609): „an error of the code in the load says nothing about the saved game state, so it costs the player a retry and never the state”; D-213 (foundations/decisions.md) odsyła do tego zdania: „while the player gets the sentence of D-96”.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:208-217`

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
```

#### `docs/task-cycles/ekrany-i-menu/task.md:252-252`

```
 252	- D-275 (*Verification*): „„Wyloguj” in the header kept a plain button”; „Wyloguj” stoi teraz w menu „Konto” (D-97).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:259-266`

```
 259	- D-156 — How does an emailed link confirm a player's email address?: „above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on”.
 260	- D-164 — Who owns a program?: „A program can be edited at any time”.
 261	- D-170, D-188, D-243, D-251 i D-149 zostają przy Siedzibie, bo wysyłanie zostaje tam do zadania 13.
 262	- D-180 — Where does the player arrange the trip plan?: „The program panel shows a section „Plan wyprawy” below the rule groups”; plan przydziela zmianę zadaniom 5 i 13.
 263	- D-207 — When does the game save the game state on the server?: „right after each change of it the player makes — […] a pause and a pace”, więc pauza przy wyjściu z ekranu zapisuje, a sama zmiana ekranu nie.
 264	- D-213 — Which file is the exemplar for saved-game code?: o błędzie kodu przy wczytywaniu „while the player gets the sentence of D-96”.
 265	- D-250 — What does a pause or an end screen hold?: „hold that map run, and the earning loops of other characters go on through them”.
 266	- D-262 — What stands on the screen of the login card, and where do the waiting screens stand?: „The waiting screens […] stand outside the card, with the header and the footer, for a signed-in player too.”
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

### Slice 7 — The page under the menu bar

- **Goal:** `app.ts` places the one menu bar of Slice 4 in the header in place of the title, „Wyloguj” and the row of `email-status.ts`: the name alone on the waiting screens (D-262, row 6), the items and the menu „Konto” over the game. The logout of D-97 runs from the bar's „Wyloguj”: the page gives the bar its waiting text and, after a logout whose outcome is uncertain, its sentence, which stands in the menu „Konto”, kept open (row 8); the line of saving (`saveLine`) stands under the bar and shows only at a problem, the sentence D-97 gives after a failed save before a logout included (To do item 10, D-208). The outcome of the registration's message goes to the bar (question 11, point 4). The content under the bar is at most 1344 px wide and the full width of a narrower window (row 9), a layout dimension that D-43 exempts from the design tokens. Until Slice 8 the bar marks Siedziba and shows no „Wróć do przejścia”. `email-status.ts` keeps its pure sentences and loses `createEmailStatus`; `tests/view/email-status.test.mjs` keeps the case of the sentences and drops the cases of the DOM row, whose behaviour the cases of `tests/view/menu-bar.test.mjs` carry, the change naming that reason. The kitchen-sink page's section of the header row becomes the part of the menu „Konto” for an unconfirmed address — „Wyślij ponownie” waiting, at the limit and after a failed sending — built in `kitchen-sink.ts` from the DOM forms of the shared controls and those sentences, the page reaching no `.tsx` file (D-269), its heading and the module's comment saying so. The cases of `tests/view/account-screen.test.mjs` about the header, „Wyloguj” and the row of an unconfirmed address go through the bar, each changed with its reason.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/email-status.ts` · `tests/view/email-status.test.mjs` · `tests/view/account-screen.test.mjs` · `src/browser/kitchen-sink/kitchen-sink.ts` · `src/browser/kitchen-sink/kitchen-sink.css` · `src/browser/styles.css` · `src/browser/view/menu-bar.tsx`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:30-33` To do · `docs/task-cycles/ekrany-i-menu/task.md:61-66` To do · `docs/task-cycles/ekrany-i-menu/task.md:71-71` To do · `docs/task-cycles/ekrany-i-menu/task.md:132-145` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:151-153` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:208-217` Zadanie zapisuje w całości · `docs/task-cycles/ekrany-i-menu/task.md:252-252` Przykłady i zdania do poprawy w tym zadaniu · `docs/task-cycles/ekrany-i-menu/task.md:259-266` Obecne decyzje, których zadanie dotyka bez zmiany · `docs/task-cycles/ekrany-i-menu/task.md:278-296` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:897-910` D-43 · `foundations/decisions.md:912-925` D-44 · `foundations/decisions.md:927-940` D-45 · `foundations/decisions.md:1771-1784` D-96 · `foundations/decisions.md:1786-1799` D-97 · `foundations/decisions.md:2866-2879` D-156 · `foundations/decisions.md:2881-2894` D-157 · `foundations/decisions.md:3742-3760` D-208 · `foundations/decisions.md:3762-3804` D-209 · `foundations/decisions.md:3806-3831` D-210 · `foundations/decisions.md:3833-3864` D-211 · `foundations/decisions.md:3906-3940` D-213 · `foundations/decisions.md:5294-5316` D-261 · `foundations/decisions.md:5318-5339` D-262 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5491-5534` D-268 · `foundations/decisions.md:5536-5560` D-269
  Foundation entries rows E2, E3, E4, E7, E12, E15, E24, E29, E31, E32
  `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:469-477` browser-view-focus-outline · `foundations/invariants.md:499-507` application-build-kitchen-sink · `foundations/invariants.md:609-637` player-self-registration, player-password-login, email-verification-nonblocking · `foundations/invariants.md:999-1007` expired-session-unsaved-progress · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `src/browser/view/game-view.ts` · `src/browser/view/game-saver.ts` · `src/browser/view/footer.ts` · `src/browser/account-api.ts` · `tests/view/page-document.mjs`
  made by an earlier slice, named without backticks as it does not exist at the base: tests/view/menu-bar.test.mjs (Slice 4)
- **Model:** same — the page's logout, saving and answers about the account move into another element while every sentence and every order D-96, D-97 and D-208 give has to stay.
- **Risk:** none
- **Checks:** start from the failing cases of `tests/view/account-screen.test.mjs` that find „Wyloguj” and the unconfirmed address in the menu „Konto”; `npm test -- tests/view/account-screen.test.mjs`; `npm test -- tests/view/email-status.test.mjs`; `npm test -- tests/view/menu-bar.test.mjs`; `node scripts/kitchen-sink.mjs --build-only`; `npm test -- tests/invariants/test_application_build_kitchen_sink.py`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 4 · Slice 6 · E2 · E3 · E4 · E7 · E29 · E31 · E32

## What earlier slices delivered (orchestrator's note; the files are the source)

- Slice 1 (`c0211e6`): the styleguide rule *Menu bar, the menu „Konto” and the list of programs*, and the
  changed rules *States of shared controls*, *Main button, secondary action and tab* and *The
  kitchen-sink page*.
- Slice 3 (`fa6b322`): `src/browser/view/screen-address.ts` (`Screen`, `markedMenuItem`, `returnToRunEntry`, …).
- Slice 4 (`240d639`): `src/browser/view/menu-bar.tsx`, `createMenuBar({ client, onLogout, props })`
  with `update(props)` and `dispose()`. `props` is `{ account, screen, returnEntry, registrationMessage,
  logout: { waiting, sentence } }` (read the file for the exact type). `account: null` is a waiting
  screen (the name alone). The bar itself already has `max-width: 1344px`; the width of the content
  *under* the bar is not written anywhere yet and is yours (row 9, D-280). Its CSS uses the classes
  `.menu-bar*` and `.account-menu*`; the kitchen-sink sample must reuse the `account-menu*` classes
  and be built from the DOM forms of the shared controls (`createButton`, `setButtonWaiting`, …) and the
  pure sentences of `email-status.ts`, never importing a `.tsx` file (D-269).
- The page holds the bar in its header in place of the title, „Wyloguj” and the row of an unconfirmed
  address. Until Slice 8 the bar marks Siedziba and shows no „Wróć do przejścia” (pass `screen` and
  `returnEntry` accordingly).
- Slices 5 and 6 (`edb2862`, `6dc4819`) built `character-screen.tsx` and `program-list.tsx`; the page does
  not place them in this slice.

## Orchestrator's rulings that bind this slice

- The registration's first message outcome (`pendingMessage` of `app.ts`) goes to the bar through
  `registrationMessage`, as the bar's report describes.
- After an uncertain logout its sentence goes to the bar's `logout.sentence`; the failed save before a
  logout stays in the line of saving under the bar (the plan's choice, D-97, D-208).
- Name every look or behaviour you had to choose beyond the plan in your report under *Choices made*.

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice7.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
