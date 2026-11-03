# Handoff — slice 10 of the task `ekrany-i-menu`

You make **slice 10** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `0e7c625`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: same as the orchestrator's (Sonnet 5.5), reason in the plan: one panel serves two screens with different rules for the copy
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice10.md`.

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
| E11 | glossary `headquarters` (projected whole) | d6d3e07 |
| E14 | D-282 (new, part) | 4ba1483 |
| E17 | D-166 (part) | 5020b76 |
| E21 | D-196 (correction) | 5020b76 |
| E34 | D-196 (with E21) | 5020b76 |

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:40-41`

```
  40	3. Siedziba jest osobnym ekranem: sekcja „Gdy cię nie było”, sekcja „Drużyna” z nagłówkiem i sekcja „Skrzynka”, bez panelu programu i bez umiejętności.
  41	   - Wysyłanie zostaje tu jak dziś: lista „Program:”, „Mapa: …”, zdanie warunku, „Wyślij”, „Puść w pętlę” i ich ostrzeżenia, do zadania 13.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:45-52`

```
  45	5. Ekran Programy ma po lewej listę programów gracza z „Nowy program”, „Zmień nazwę” i „Usuń”, a obok dzisiejszy panel programu z edytorem i „Plan wyprawy”, bez jego listy wyboru „Program:” (pytanie 5); nowy edytor robi zadanie 5.
  46	   - Wybór programu na liście zmienia adres na `#/programy/{n}`, a adres wybiera program na liście.
  47	   - Panel pokazuje zawsze zapisany program wybrany na liście, nigdy kopię (pytanie 15).
  48	   - Gdy ręczne przejście trwa albo skończyło się i czeka na „Restart” albo „Zakończ”, nad edytorem stoi „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.”, a „Przełącz postać na ten program” stoi tylko na ekranie przejścia (pytanie 15).
  49	   - Oferta czynności w edytorze Programów idzie za postacią w przejściu, także czekającym (pytanie 15) i skończonym, do „Restart” albo „Zakończ” (pytanie 17), jak dziś.
  50	6. Ekran przejścia pod `#/postac/{n}/przejscie` pokazuje to, co dziś stoi przy przejściu: panel programu z kopią i kolumnę przejścia; nowy układ robi zadanie 6.
  51	   - Ekran dostaje przejście jako parametr i sam nie czyta przejścia ze stanu gry.
  52	   - Lista wyboru panelu ma na górze „Kopia w przejściu”, a pod nią zapisane programy gracza (D-166).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:102-107`

```
 102	- Pytanie 5. Czy ekran Programy dostaje listę programów po lewej już w tym zadaniu?
 103	  - Answer: Tak, listę po lewej z „Nowy program”, „Zmień nazwę” i „Usuń” buduje zadanie 4, a obok stoi dzisiejszy panel w trybie przejściowym; zadanie 5 wymienia już tylko edytor. Gracz ma układ docelowy od razu, a największe zadanie maleje. Ta sama odpowiedź obowiązuje zadanie 5 (edytor-programu, pytanie o listę programów).
 104	  - Not chosen:
 105	    - Listę robi zadanie 5, od razu w nowym edytorze — do tego czasu ekran wygląda jak wycięty panel, a `#/programy/{n}` niczego nie wybiera na liście; zysk: lista powstaje raz.
 106	    - Bez decyzji — oba dokumenty mogą założyć, że listę robi drugie zadanie.
 107	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B5 (A) pakietu rundy.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:116-120`

```
 116	- Pytanie 8. Co się dzieje pod adresem, który nie prowadzi do istniejącego ekranu?
 117	  - Answer: Strona po cichu otwiera najbliższy istniejący ekran: adres przejścia bez przejścia ekran Postać tej postaci, `#/programy/{n}` bez programu `#/programy`, każdy inny Siedzibę.
 118	  - Not chosen:
 119	    - Ekran „Nie ma takiego miejsca” — trafia na niego przycisk wstecz po „Zakończ”.
 120	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta propozycja T2 pakietu rundy; ta sama treść stoi w zatwierdzonym wpisie „(new) — How does an address name a screen?” (definicja, odcisk 9641f804, wiersz 181).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:160-174`

```
 160	- Pytanie 15. Co pokazuje ekran Programy, gdy przejście czeka albo się skończyło?
 161	  - Answer: Programy pokazują zawsze zapisany program, nigdy kopię, a nad edytorem stoi zdanie „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.”; „Przełącz postać na ten program” zostaje na ekranie przejścia. W edytorze czekające przejście liczy się jak trwające, czyli oferta czynności idzie za postacią w przejściu, jak dziś w kodzie. Koszt: poprawka zrobiona w Programach nie dochodzi do czekającego przejścia, chyba że gracz przełączy postać, co zeruje passę; zysk: adres zawsze nazywa zapisany program.
 162	  - Not chosen:
 163	    - Na liście po lewej staje też „Kopia w przejściu” — lista i adres muszą obsłużyć kopię, więcej pracy w zadaniach 4 i 5, zmiana projektowanego wpisu o programach; zysk: poprawka działa z każdego miejsca.
 164	    - Gdy przejście czeka, „Programy” prowadzą na ekran przejścia — gracz nie napisze zapisanego programu przy czekającym przejściu.
 165	    - Bez decyzji — cykl zgadnie, a to, czy poprawka dojdzie do przejścia, gracz odkryje po fakcie.
 166	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B2 (A) pakietu rundy; ta sama treść stoi w zatwierdzonym D-166 (definicja, odcisk 9641f804, wiersz 811). Fakt z kodu przy 20d804b: `editorRepertoire` bierze repertuar postaci z przejścia, dopóki przejście stoi w stanie gry, także skończone (`src/browser/sim/understanding.ts:138-150`).
 167	- Pytanie 16. Co otwiera „Anuluj” formularza „Ustaw nowe hasło”?
 168	  - Answer: Zalogowanemu graczowi Siedzibę, jak po każdym odnośniku z maila; niezalogowany widzi formularze konta, jak dziś.
 169	  - Source: cytaty, nieskreślone przez Mariusza 2026-11-03 (drugi pakiet rundy, A1; „wszystko przyjmuję zgodnie z rekomendacjami”): „and after an emailed link (D-156, D-224) the page opens Siedziba” (zatwierdzony D-96, definicja, odcisk 9641f804, wiersz 601, w zdaniu o graczu z ważną sesją), gdzie D-224 to „What form does a password-reset link take?” (foundations/decisions.md przy 20d804b); D-225 mówi dziś: „„Anuluj”, which removes the fragment of the address and opens the page as usual”. Krok, którego cytat nie mówi wprost: „Anuluj” kończy stronę otwartą odnośnikiem D-224, więc zdanie o odnośniku z maila obejmuje też je; ten krok to odczyt agenta od planu (plan_mvp2_loop2.md, dziennik, 2026-11-03, uwaga dla zadania 4 o D-225), pokazany Mariuszowi w A1. Uwaga planu w tej samej linii: wybór przejścia z zapisu byłby odejściem od zatwierdzonego D-96 i dostałby własną linię w dzienniku.
 170	- Pytanie 17. Co oferuje edytor w Programach po końcu przejścia, do „Restart” albo „Zakończ”?
 171	  - Answer: Czynności postaci z przejścia, do „Restart” albo „Zakończ”, jak dziś w kodzie i jak przyjęte „Kup” po końcu („one that has ended counting as a map run”). D-196 trzeba przy tym doprecyzować. Ta sama odpowiedź obowiązuje zadanie 5, które buduje ten edytor.
 172	  - Not chosen:
 173	    - Oferta archetypu po końcu, jak D-196 czytana dosłownie — kod do zmiany, a w Programach po śmierci oferta zmienia się, choć przejście jeszcze stoi.
 174	  - Source: Mariusz, 2026-11-03: „wszystko przyjmuję zgodnie z rekomendacjami” — przyjęta rekomendacja C1 (A) drugiego pakietu rundy. Cytaty: D-196 (foundations/decisions.md przy 20d804b): „Outside a map run the program editor currently offers the repertoire computed from the Understanding through the archetype’s predispositions […] During a map run, both the copy editor and the saved-program editor use the running character’s repertoire, including its bought branches.”; zatwierdzony D-200 (definicja, odcisk 9641f804, wiersz 901): „outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ””. Fakt z kodu przy 20d804b: `editorRepertoire` bierze repertuar postaci z przejścia, dopóki `state.run` stoi w stanie gry (`src/browser/sim/understanding.ts:138-150`).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:237-239`

```
 237	- D-166 — Where does the player see the player's programs and pick the one to edit? (definicja, wpis zmieniony; pisze zadanie 5): „The screen Programy holds on the left the list of the player's programs and in the middle the program editor with the program picked there. That program is always a saved one, never the copy: while a manual map run goes on, or has ended and waits for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” stands above the editor, and „Przełącz postać na ten program” stands on the screen of a map run alone. On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it.”
 238	  - Część tego zadania: cały wpis poza nowym edytorem, który robi zadanie 5 (pytania 5 i 15).
 239	  - Obecny D-166 uznaje za błąd „a section of the headquarters or a screen of its own listing the programs”, więc to zdanie musi odejść w tym zadaniu.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:249-249`

```
 249	- D-196 (*Verification* i *Rationale*): „a branch bought by any teammate opening that action in the headquarters editor”, „the headquarters editor cannot add a branch action”; edytor stoi teraz na ekranie Programy (plan, pytanie o nieaktualne przykłady: „D-196 i D-207 w zadaniu 4”). Zdanie wiążące „During a map run, both the copy editor and the saved-program editor use the running character’s repertoire” nazywa przy tym przejście, które czeka (pytanie 15), i przejście, które skończyło się i czeka na „Restart” albo „Zakończ” (pytanie 17; plan, uwaga dla zadań 4 i 13): w obu edytorach oferta idzie wtedy za postacią z przejścia. *Rejected* niesie drogę nie wybraną w pytaniu 17.
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

### Slice 10 — The screen Programy

- **Goal:** Programy shows Slice 6's list on the left and beside it the program panel in a mode of its own (To do item 5): no select list „Program:”, no „Nowy program”, „Zmień nazwę”, „Usuń” or name field, which the list holds, always the saved program the address names, never the copy (`#/programy/{n}`; `#/programy` shows the first program of the list, marked on it), and, while the game state holds a manual map run, going on or ended and waiting for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” above the editor and no „Przełącz postać na ten program”, which stands on Przejście alone (question 15); the editor's offer follows the map run's character while the game state holds one, an ended one included (questions 15 and 17, row 11), as the code does today, a case showing it. A pick on the list changes the address with a new entry of the history, and the address picks on the list; a deletion of the program shown leads to the nearest screen (question 8). The panel on Przejście keeps today's behaviour — „Kopia w przejściu” first on its list, the saved programs below it (D-166) — and Siedziba loses the panel (To do item 3). The game view holds one panel for Przejście and one for Programy, so the program each shows stays its own. `tests/view/program-panel.test.mjs` gets the cases of the mode; the cases of `tests/view/account-screen.test.mjs` that edited programs beside Siedziba edit them on Programy, each with its reason.
- **Change:** `src/browser/view/program-panel.ts` · `tests/view/program-panel.test.mjs` · `src/browser/view/game-view.ts` · `tests/view/account-screen.test.mjs` · `src/browser/styles.css` · `src/browser/view/program-list.tsx`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:40-41` To do · `docs/task-cycles/ekrany-i-menu/task.md:45-52` To do · `docs/task-cycles/ekrany-i-menu/task.md:102-107` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:116-120` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:160-174` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:237-239` Zadanie urzeczywistnia część, a resztę pisze inne zadanie · `docs/task-cycles/ekrany-i-menu/task.md:249-249` Przykłady i zdania do poprawy w tym zadaniu · `docs/task-cycles/ekrany-i-menu/task.md:278-296` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:2429-2461` D-131 · `foundations/decisions.md:2982-2995` D-164 · `foundations/decisions.md:2997-3010` D-165 · `foundations/decisions.md:3012-3030` D-166 · `foundations/decisions.md:3032-3045` D-167 · `foundations/decisions.md:3047-3060` D-168 · `foundations/decisions.md:3092-3105` D-171 · `foundations/decisions.md:3107-3120` D-172 · `foundations/decisions.md:3122-3135` D-173 · `foundations/decisions.md:3137-3150` D-174 · `foundations/decisions.md:3251-3262` D-180 · `foundations/decisions.md:3473-3486` D-196 · `foundations/decisions.md:4828-4845` D-244 · `foundations/decisions.md:5392-5432` D-265
  Foundation entries rows E11, E14, E17, E21, E34
  `foundations/invariants.md:829-837` streak-program-change · `foundations/invariants.md:839-847` saved-program-edit · `foundations/invariants.md:849-857` copy-save · `foundations/invariants.md:459-467` browser-view-token-values
  `foundations/glossary.md:25-30` program · `foundations/glossary.md:174-178` copy · `foundations/glossary.md:124-128` repertoire
  `src/browser/sim/understanding.ts:130-155` · `tests/view/page-document.mjs`
  made by earlier slices, named without backticks as they do not exist at the base: src/browser/view/screen-address.ts (Slice 3) · src/browser/view/run-screen.ts (Slice 8)
- **Model:** same — one panel serves two screens with different rules for the copy, and a slip loses a player's unsaved copy or edits another program than the one shown.
- **Risk:** none
- **Checks:** start from the failing case of the panel on Programy showing the saved program beside a waiting map run, with its sentence; `npm test -- tests/view/program-panel.test.mjs`; `npm test -- tests/view/program-list.test.mjs`; `npm test -- tests/view/program-editor.test.mjs`; `npm test -- tests/view/account-screen.test.mjs`; `npm test -- tests/invariants/test_saved_program_edit.py`; `npm test -- tests/invariants/test_copy_save.py`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 6 · Slice 9 · E17 · E21 · E34

## What earlier slices delivered (orchestrator's note; the files are the source)

- Slice 6 (`6dc4819`): `src/browser/view/program-list.tsx`, `createProgramList` (the list, its actions and
  name field). Its classes are `program-list-view`, `program-list-items` and `program-list-item`; the DOM
  program panel already uses the class `program-list` for its select row (`program-panel.ts`,
  `styles.css`). Keep the two apart when both render.
- Slice 8 (`649e25d`): `game-view.ts` holds the screens and `run-screen.ts` is the screen of a map run.
  **Where your plan section and the code differ:** Slice 8 built **one** program panel that moves
  between the screens that hold it (its report, *Choices made*: "The one program panel moves between the
  screens"). Your section says the game view holds **one panel for Przejście and one for Programy**, so
  that the program each shows stays its own (a view state of the panel — the program shown — would carry
  from one screen to the other). Follow your section: build two panels, and report what you changed in
  `game-view.ts` and why. This is the plan's choice, not a structural mismatch.
- Slice 9 (`0e7c625`): Siedziba no longer draws the skills; each name links to its screen Postać; one
  paragraph per row says why sending waits. The program panel still stands beside the headquarters on
  Siedziba; **your slice removes it from Siedziba** (To do item 3).
- Real browser: `.claude/skills/loop2-play/SKILL.md`. The screens are placed on the page now, so make
  the screenshot of `ui_check.md` for Programy with the list and the panel, and for Programy beside a
  waiting map run with its sentence; report what each shows. Delete `.playwright-cli/` when done.

## Orchestrator's rulings that bind this slice

- `#/programy` with no number shows the first program of the list, marked on it (the plan's choice).
  D-173 says "after „Zakończ” the program panel shows the program the copy belongs to"; with „Zakończ”
  leading to Postać and no panel there, that clause no longer holds in its old form. It is the return
  step's to correct (record Q9); do not change D-173 yourself and do not add behaviour for it. If your
  work shows a case that plainly needs more, say so in your report.
- Name every look or behaviour you had to choose beyond the plan in your report under *Choices made*.

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice10.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
