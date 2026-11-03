# Handoff — slice 5 of the task `ekrany-i-menu`

You make **slice 5** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `240d639`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: cheaper than the orchestrator's (Haiku 5.5), the default class of the plan
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice5.md`.

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
| E9 | D-217 (changed, projected whole; heading now „What does the game show…”) | 50ea549 |
| E10 | D-244 (changed, projected whole) | 50ea549 |
| E11 | glossary `headquarters` (projected whole) | d6d3e07 |
| E18 | D-245 (part) | 50ea549 |
| E20 | D-03 — tied, no change | — |
| E22 | D-207 (correction) | 50ea549 |
| E25 | D-287 (new) | f694d86 |
| E39 | none written | — |

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:44-44`

```
  44	4. Ekran Postać pokazuje jedną postać: imię, pokolenie, archetyp, wiersz wskrzeszenia, wiersz pętli z „Zatrzymaj” albo wiersz zatrzymanej pętli i sekcję „Umiejętności” z „Kup”, w treści D-199, D-200, D-217, D-244 i D-245.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:58-60`

```
  58	8. Na Siedzibie i ekranie Postać, gdy ręczne przejście czeka albo się skończyło, działa to, na co pozwala symulacja, a „Wyślij”, „Puść w pętlę” postaci z tego przejścia i „Kup” są nieaktywne (pytanie 3).
  59	   - Przy nieaktywnych przyciskach Siedziby stoi „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”.
  60	   - Przy „Umiejętności” stoi „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.”.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:67-70`

```
  67	12. Wiersz wskrzeszenia czyta się „Wskrzeszenie za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie”, a poniżej godziny „za {m} min czasu realnego” (D-217), i odświeża się z upływem czasu także wtedy, gdy przejście czeka (odczyt nieskreślony przez Mariusza 2026-11-03, drugi pakiet rundy, część F).
  68	13. Każda kolumna ekranu jest osobnym obszarem, który węższy układ może przestawić, a drużyna jest sekcją z nagłówkiem.
  69	14. W React powstają pasek menu, ekran Postać i lista programów; Siedziba, panel programu i ekran przejścia zostają w DOM (pytanie 4).
  70	   - Przycisk niszczący dostaje postać React z przypadkiem w teście porównującym obie postacie (D-265), bo „Zatrzymaj” na ekranie Postać i „Usuń” na liście programów stoją w React (odczyt nieskreślony przez Mariusza 2026-11-03, drugi pakiet rundy, część F).
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

#### `docs/task-cycles/ekrany-i-menu/task.md:240-241`

```
 240	- D-245 — What does „Zatrzymaj” do? (definicja; pisze zadanie 25): „On the character's card and screen, until the next send or start of that character and after a load of the saved game state too, stands in the role `text-secondary` „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”, or „Pętla zatrzymana” where the earning loop gathered no practice.”
 241	  - Część tego zadania: karta i ekran zamiast „row”.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:250-250`

```
 250	- D-207 (*Verification*): „„Kup” of a branch rank in the headquarters followed at once by a save request”; „Kup” stoi teraz na ekranie Postać.
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

### Slice 5 — The screen Postać in React

- **Goal:** a new `src/browser/view/character-screen.tsx` holds the screen Postać and its boundary `createCharacterScreen`, built as Slice 4's boundary is, drawn from the game state, the real moment of the clock's last reading and the character's number the page gives (To do item 4). It shows that character's name, „pokolenie {n}” from 2 up (`generationLabel`), its archetype's name, its resurrection line (`resurrectionLine`) in `text-secondary` or `danger`, rewritten at each update the page makes at a reading of the clock, also while a manual map run waits (To do item 12), the line of its earning loop „Pętla: …” with „Zatrzymaj” — the destructive React button of Slice 2 (D-244, D-245) — or the line of a stopped loop, and the section „Umiejętności” once a tree is known, each known tree's row and each branch with „Kup” (D-199, the texts from `skillText` and `branchText` of `character-skills.ts`); „Kup” is inactive where the points do not suffice, where every rank is bought, and while the game state holds a manual map run, going on or ended and waiting for „Restart” or „Zakończ”, and under the section's heading then stands „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.” (row 1, question 3), the map's name from the data. Its acts — a purchase and a stop — go to the page through its controls. `resurrectionLine` in `headquarters.ts` takes the wording of the projected D-217 — „Wskrzeszenie za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie”, and „za {m} min czasu realnego” below an hour (To do item 12) — and its cases in `tests/view/headquarters.test.mjs` change with that source named. The new test `tests/view/character-screen.test.mjs` runs on the jsdom harness and holds a case for each line, the section absent before a known tree, the case „unknown trees are hidden, purchases update existing buttons and refuse unaffordable and maximum ranks” of `tests/view/character-skills.test.mjs` written for this screen (the DOM case leaves in Slice 9), „Kup” inactive with the sentence beside a waiting and an ended map run, a purchase keeping focus on its button, and the resurrection line moving with the moment. Its look stands in `src/browser/styles.css`.
- **Change:** `src/browser/view/character-screen.tsx` · `tests/view/character-screen.test.mjs` · `src/browser/view/headquarters.ts` · `tests/view/headquarters.test.mjs` · `src/browser/styles.css`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:44-44` To do · `docs/task-cycles/ekrany-i-menu/task.md:58-60` To do · `docs/task-cycles/ekrany-i-menu/task.md:67-70` To do · `docs/task-cycles/ekrany-i-menu/task.md:91-101` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:208-221` Zadanie zapisuje w całości · `docs/task-cycles/ekrany-i-menu/task.md:240-241` Zadanie urzeczywistnia część, a resztę pisze inne zadanie · `docs/task-cycles/ekrany-i-menu/task.md:250-250` Przykłady i zdania do poprawy w tym zadaniu · `docs/task-cycles/ekrany-i-menu/task.md:278-296` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:792-805` D-36 · `foundations/decisions.md:837-850` D-39 · `foundations/decisions.md:852-865` D-40 · `foundations/decisions.md:912-925` D-44 · `foundations/decisions.md:1125-1150` D-56 · `foundations/decisions.md:3398-3411` D-191 · `foundations/decisions.md:3458-3471` D-195 · `foundations/decisions.md:3518-3531` D-199 · `foundations/decisions.md:3533-3546` D-200 · `foundations/decisions.md:3680-3740` D-207 · `foundations/decisions.md:3999-4010` D-217 · `foundations/decisions.md:4012-4027` D-218 · `foundations/decisions.md:4029-4045` D-219 · `foundations/decisions.md:4828-4845` D-244 · `foundations/decisions.md:4847-4873` D-245 · `foundations/decisions.md:5017-5038` D-250 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5462-5489` D-267 · `foundations/decisions.md:5491-5534` D-268
  Foundation entries rows E5, E6, E9, E10, E11, E18, E20, E22, E25, E39
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:236-246` content-identifiers · `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:1049-1057` resurrection-renewal · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `foundations/glossary.md:5-10` character skill · `foundations/glossary.md:180-184` practice · `foundations/glossary.md:205-209` resurrection · `foundations/glossary.md:211-215` generation number · `foundations/glossary.md:217-221` earning loop
  `src/browser/view/account-card.tsx` · `src/browser/view/character-skills.ts` · `tests/view/character-skills.test.mjs` · `src/browser/view/controls/react-button.tsx` · `tests/view/page-document.mjs` · `src/browser/sim/skills.ts` · `src/browser/sim/types.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from the failing cases of the sentence beside „Kup” and of the wording of D-217; `npm test -- tests/view/character-screen.test.mjs`; `npm test -- tests/view/headquarters.test.mjs`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/invariants/test_content_identifiers.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 2 · Slice 4 · E5 · E6 · E9 · E10 · E18 · E25

## What earlier slices delivered (orchestrator's note; the files are the source)

- Slice 2 (commit `893d26c`): `ReactButton` takes the kind `destructive` (use it for „Zatrzymaj”, D-244, D-245) and `expanded`.
- Slice 3 (commit `fa6b322`): `src/browser/view/screen-address.ts` (the type `Screen`, `screenAddress`, …); you need it only if your section says so.
- Slice 4 (commit `240d639`): `src/browser/view/menu-bar.tsx` is the newest boundary built after `createAccountCard`
  (`createMenuBar({ client, onLogout, props })` with `update(props)` and `dispose()`); its test
  `tests/view/menu-bar.test.mjs` shows how a React part is tested on the jsdom harness. Build the
  boundary of your screen the same way. The look of your screen stands in `src/browser/styles.css`
  with tokens only (`src/browser/AGENTS.md`).
- Your screen is not placed on the page by this slice (Slice 8 does it); check its states in code and
  mark the screenshot unchecked with that reason, as `ui_check.md` gives.

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice5.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
