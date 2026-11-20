# Handoff - executor of slice(s) 10 of the task `zapas-i-wskrzeszenie`

The person who requested the cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. Your reply goes to the orchestrator only.

## Where and what

- Worktree (work from its root, never from the main checkout): `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. The pinned the-way stands in `.the-way` there. Dependencies are installed (`npm ci` ran).
- Your method: `.the-way/task-cycle/change/SKILL.md` by its path in the worktree's `.the-way`; read it whole, and a file it names only when the step or variant that names it comes. Do not call a skill. Your variant: "a slice, or the retry of a slice".
- Your stage and its boundary: Make the slice below, commit it by path (`git add <file> ...`, never `git add -A`; commit messages in English, like the commits of the repository, with its `type: :emoji:` form), run the focused checks of its *Checks* and return. Make no other slice and no change outside the slice's *Change*, and run **no full gate** (`npm test` without a file): the gate is the orchestrator's or CI's.
- Base of your slice: `b0353afa`.
- Frozen task: `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` (the passages your section needs are copied below; read the rest of it only if a passage sends you to it). Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md` (its other slices are not yours). Spec: none.
- Answers of step 4 of the cycle: trust boundary - **yes** (`src/browser/sim/saved-game.ts`: the saved shape of the team's resurrection and the load's checks; check crafted input there: counts above the data's, negative or non-finite numbers, a moment standing with no use spent or missing with some spent, wrong types); irreversible operation - **no**. No open design choice; no reserved choice. The pin of the-way is not moved.
- Your directory for working copies: `.runs/slice-10-executor/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-10-executor-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case the harness's note about files named `report...` leaves open. Where you are refused the write all the same, return the report whole as your answer. Its first line is yours as your method gives it; it holds besides what your method gives **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them.
- Other tools of the cycle: the product's guidelines say tests run as `npm test -- <one test file>`; never run `npm test` bare.

Working copies - copied word for word from the cycle:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (copied word for word from the plan)

### Slice 10 — The balance instrument counts the uses with the game's functions

- **Goal:** As To do item 5 and question 12 give: the earning loop and the map check start with the
  full count of uses, as a new game; `--no-resurrection` starts with none — all uses spent, the
  clock started at the start of the loop — after which they return as in the game; the campaign's
  player that waits for the resurrection before trying the next map tries while one use is left. The
  instrument counts no return itself and keeps no copy of a number of the game (question 11, "Liczba
  gry"). The description of the switch in `balance/cli.mjs` and in both copies of the skill
  `loop2-balance`, byte for byte alike, speaks of uses, and the comments of the mode files that speak
  of the one resurrection speak of uses. The player descriptions in `balance/players/` stay as they
  are: "while the team's resurrection is ready" reads as "while a use is left".
- **Change:** `balance/loop.mjs` · `balance/campaign.mjs` · `balance/check-map.mjs` ·
  `balance/cli.mjs` · `.claude/skills/loop2-balance/SKILL.md` · `.agents/skills/loop2-balance/SKILL.md`
  · `tests/balance/loop.test.mjs` · `tests/balance/check-map.test.mjs` · `tests/balance/cli.test.mjs`
  · `tests/balance/campaign.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-balance-instrument.md` · `src/browser/sim/data/balance.ts` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:31-33` To do (items 3–5) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:111-128` Questions to settle (questions 11, 12) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:160-160` Context · Foundation entries row D-190 · row
  D-428 · `foundations/decisions.md:11658-11672` D-427 · `foundations/decisions.md:11688-11702` D-429
  · `foundations/decisions.md:888-902` D-437 · `foundations/invariants.md:1438-1467`
  instrument-game-agreement · balance-instrument-file-writes · balance-instrument-repeatability ·
  `foundations/part_map.md:127-157` balance-tools · agent-workflow
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a case of `tests/balance/loop.test.mjs` with `resurrectionReady` false starting
  with every use spent and the first returning the renewal after the loop's start, and a case of
  `tests/balance/campaign.test.mjs` of a player waiting for the resurrection who tries with one use
  left; then `npm test -- tests/balance/loop.test.mjs` · `npm test -- tests/balance/check-map.test.mjs`
  · `npm test -- tests/balance/cli.test.mjs` · `npm test -- tests/balance/campaign.test.mjs` ·
  `npm test -- tests/balance/agreement.test.mjs` · `npm test -- tests/balance/progression.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/agent_workflow/test_loop2_balance_skill.py`
- **Depends on:** Slice 4 · Slice 6

## The plan's table of foundation entries (copied; 'Foundation entries row X' in the slice means this table's row X)

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| (new) — May the progression require the player's absence? | decision, new | projected entry of the definition carried by the task ("Decisions in play", "Zadanie zapisuje"); To do 7; plan item `zapas-i-wskrzeszenie` | written by Slice 1; Slices 3, 4 realize it; D-189 and D-190 derive from it |
| D-189 — What pays, and what takes from the chest? | decision, changed | Settlements row 1; To do 1, 2, 7 | written by Slice 1; Slices 2, 3, 15, 16, 18 |
| D-179 — How do items go into a map run and out of it? | decision, changed | "Decisions in play" (D-179); To do 1 | written by Slice 1; Slice 3 |
| D-214 — When is a map run a manual run of a solved map? | decision, changed | Settlements row 1; To do 1 | written by Slice 1; Slices 2, 3, 8 |
| D-190 — What does a character's death take? | decision, changed | Settlements rows 2, 3, 4; To do 3 | written by Slice 1; Slices 5, 6, 7, 8, 9, 13 |
| D-220 — What generation number and resurrection does a new character have? | decision, changed | Settlements row 5; To do 3 | written by Slice 1; Slices 6, 8 |
| D-240 — When and how is the time away computed? | decision, changed | "Decisions in play" (D-240); To do 3 | written by Slice 1; Slices 9, 18 |
| D-242 — Which clock drives an earning loop? | decision, changed | "Decisions in play" (D-242); To do 3 | written by Slice 1; Slices 9, 13 |
| D-428 — What does the map check of the balance instrument print? (*Verification*) | decision, changed | Settlements row 10; To do 5 | written by Slice 1; Slice 10 |
| `solved-map-manual-run` | invariant, changed; its check: the cases of `tests/sim/trip.test.mjs` and `tests/sim/saved-game.test.mjs` that cite it | "Decisions in play"; To do 1, 2 | written by Slice 1; Slices 2, 3 |
| `trip-transfer` | invariant, changed; its check: the cases of `tests/sim/trip.test.mjs`, `tests/sim/catch-up.test.mjs` and `tests/sim/loop.test.mjs` that cite it | "Decisions in play"; To do 1 | written by Slice 1; Slices 3, 9 |
| `trip-run-end` | invariant, changed; its check: the cases of the same three files that cite it | "Decisions in play"; To do 2 | written by Slice 1; Slices 3, 9 |
| `resurrection-renewal` | invariant, changed; its check: the cases of `tests/sim/team.test.mjs`, `death.test.mjs`, `completion.test.mjs`, `catch-up.test.mjs`, `loop.test.mjs` and of `tests/view/team-lines.test.mjs`, `character-screen.test.mjs`, `clock.test.mjs` that cite it | Settlements rows 3, 4; To do 3 | written by Slice 1; Slices 6, 8, 9, 12, 13 |
| `resurrection` | glossary term, changed | Settlements row 9 | written by Slice 1; Slices 6, 12, 14 |
| D-215 — Where does the player read that a manual run of a solved map pays and takes nothing? | decision, changed | Settlements row 8; To do 4 | written by Slice 11; Slice 17 |
| D-216 — Where does the player read what a death took and what a completion renewed? | decision, changed | Settlements row 7; To do 4 | written by Slice 11; Slices 14, 15 |
| D-217 — What does the game show of a character's resurrection? | decision, changed | Settlements row 6; To do 4 | written by Slice 11; Slices 12, 15, 18 |
| D-329 — What stands at each character in the section „Kto idzie”? (*Verification*, rationale) | decision, changed | "Decisions in play" (D-329); To do 4, 7 | written by Slice 11; Slice 15 |
| D-251 — How does the card of a map mark a rehearsal the earning loop cannot repeat? | decision, withdrawn, no successor | To do 7 | withdrawn by Slice 11; its references rewritten by Slices 1 (D-189), 11 (D-329), 15, 16, 18 |

## Reading note added by the orchestrator at the plan's review

Every slice that changes a test file reads, besides its *Read*, each decision its altered cases quote by a `decision:` line and each invariant they cite by an `invariant:` line, where that entry is not already named in its *Read*: find them by searching the file, write the index with `python -B .the-way/elements/common/decision_index.py --output <working directory>/index.md --decision N` and open whole those whose sentence the case holds (step 2 of 'Reading the foundation'). Slices 8, 9, 12 and 14 in particular, whose files quote many unchanged decisions. A slice that edits a file larger than it can read edits it by searching and reading ranges, not whole.

## Passages of the frozen task named in the slice's *Read* (copied word for word, line numbers of `task.md`)

### task.md lines 31-33

3. Wskrzeszenie konta ma liczbę użyć i czas odnowienia jednego użycia, obie w danych gry: nowa gra zaczyna z pełną liczbą użyć, śmierć postaci z wprawą zużywa jedno użycie, póki jakieś zostało, śmierć postaci z wprawą, gdy żadne nie zostało, zabiera wprawę i wykupione stopnie jak dziś, a śmierć postaci bez wprawy nie zużywa żadnego. Na start w danych gry: 3 użycia i 4 godziny czasu realnego odnowienia jednego użycia (pytanie 4). Zużyte użycia wracają po kolei, jedno naraz, na jednym zegarze: śmierć, która zużywa użycie przy pełnym zapasie, puszcza zegar, a śmierć przy zegarze już biegnącym go nie przestawia; jedno użycie wraca po czasie odnowienia od chwili, w której zegar ruszył, każde następne po czasie odnowienia od powrotu poprzedniego, a gdy zapas jest pełny, zegar staje (pytanie 3). Pierwsze rozwiązanie mapy, której konto jeszcze nie rozwiązało, przywraca jedno użycie, póki zapas nie jest pełny, a zegar biegnie dalej bez przestawiania i staje, gdy zapas się zapełni; kolejne rozwiązanie tej samej mapy nic nie przywraca (pytanie 5). Kształt stanu i jego wczytanie — pytanie 15; rozliczenie śmierci, która zużyła użycie, trzyma liczbę użyć, które po niej zostały, bo okno końca mówi o chwili śmierci (pytanie 6), a wczytanie sprawdza ją wobec liczby użyć w danych gry. W nadrabianiu czasu nieobecności śmierci rozlicza się w kolejności listy postaci (D-240): śmierć każdej postaci zastaje liczbę użyć i zegar takie, jakie zostawiły postacie wyżej na liście, także gdy zginęła wcześniej w czasie realnym, a zegar puszczony przez śmierć rozliczoną wcześniej nie cofa się.
4. Napisy gry o ręcznym przejściu mapy rozwiązanej i o wskrzeszeniu mówią to, co po zmianie obowiązuje: wiersz na ekranie takiego przejścia, wiersz wskrzeszenia przy postaci na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” na karcie mapy oraz wiersze o wskrzeszeniu w oknie końca przejścia; wiersz „Wejdzie: …” nad „Wejdź” na mapie rozwiązanej liczy, jak na każdej innej, z tym, co leży w skrzynce; ostrzeżenie pod „Wejdź” na mapie rozwiązanej, że próba weźmie zapas, którego pętla nie dostanie, znika, bo próba i pętla biorą teraz ze skrzynki to samo. Brzmienia stoją w odpowiedzi na pytanie 6, a forma liczby godzin z danych gry — w odpowiedzi na pytanie 16. Wytyczne wyglądu `guidelines/styleguide-browser-view.md` mówią to samo co napisy po zmianie: w części o ekranie Mapy znika ostrzeżenie pod „Wejdź” i numer D-251 z jej listy decyzji, a zdania o roli wiersza wskrzeszenia („a gdy wskrzeszenie nie jest gotowe, w `danger` (D-217)”) i o wierszu okna końca („`danger`, gdy wskrzeszenie nie było gotowe (D-185, D-216)”) mówią o użyciach.
5. Przyrząd balansu liczy wskrzeszenie z liczbą użyć funkcjami gry, bez własnego liczenia powrotów: pętla i sprawdzenie mapy startują z pełną liczbą użyć, jak nowa gra; przełącznik `--no-resurrection` startuje bez żadnego — wszystkie użycia zużyte, zegar puszczony w chwili startu pętli — a potem użycia wracają jak w grze, tak jak dziś wraca zużyte wskrzeszenie; gracz kampanii, który przed próbą następnej mapy czeka na wskrzeszenie, próbuje, gdy zostało choć jedno użycie. Opis przełącznika w `balance/cli.mjs` i w obu kopiach skilla `loop2-balance` mówi o użyciach. Kod przyrządu zmieniany w pozycjach 5 i 6 trzyma się wytycznych rodzaju `balance-instrument` w znaczeniach z odpowiedzi na pytanie 11, a każdy nowy plik kodu w `balance/` dostaje wiersz w tabeli „Files of this kind” w `guidelines/coding-balance-instrument.md`.

### task.md lines 111-128

- Pytanie 11. Jaki rodzaj kodu i jaki plik-wzorzec obowiązują pliki przyrządu balansu, które to zadanie zmienia (`balance/`)?
  - Answer: Rodzaj `balance-instrument` obejmuje pliki kodu `.mjs` w `balance/`, bez plików JSON nakładek i opisów graczy; jego wytyczne stoją w `guidelines/coding-balance-instrument.md`, plikiem-wzorcem jest `balance/engine.mjs` (D-437), a wiersz rodzaju stoi w tabeli rodzajów `guidelines/coding.md`. Znaczenia, których to zadanie potrzebuje, są już regułami tych wytycznych albo decyzjami fundamentu; żadne nie jest nowym ani zmienionym znaczeniem wytycznych:
    - „Liczba gry”: liczba użyć wskrzeszenia, czas odnowienia jednego użycia i pojemność skrzynki są liczbami gry („Liczba gry to liczba, która stoi w plikach danych gry (D-18) albo którą daje funkcja gry”), więc przyrząd bierze je ze zbudowanej gry i nie trzyma ich kopii — jak dziś `balance/loop.mjs` bierze `BALANCE.resurrectionRenewalRealMinutes`; ziarna 1–500, próg 20% z pytania 7 i chwila startu zegara pomiaru są liczbami pomiaru, które przyrząd trzyma sam.
    - „Przejście mapy jak w grze”: każde przejście mapy pomiaru z pozycji 6 listy „To do”, także ręczne przejście mapy rozwiązanej po zapas, jeśli przyrząd je przeprowadza, idzie funkcjami zbudowanej gry, a powroty użyć liczą funkcje gry (pozycja 5).
    - „Programy wzorcowe”: pomiar z pozycji 6 bierze programy z `tests/sim/reference-programs.mjs`.
    - „Jedno miejsce wspólnej rzeczy”: to, czego pomiar potrzebuje, a co już stoi w pliku przyrządu — `chestOf` w `balance/check-map.mjs`, `MS_PER_MINUTE` i `LOOP_START_MS` w `balance/loop.mjs`, `meanNumber`, `outcomeOf` i `DEFAULT_CAP_MINUTES` w `balance/engine.mjs` — pomiar importuje stamtąd.
    - „Zapis plików” i D-429: tabelę wyniku pomiaru tryb oddaje jako dane, plik zapisuje tylko `balance/cli.mjs` pod ścieżką z flagi `--out`, a wynik nie wchodzi do repozytorium.
    - „Zegar i losowość”: zegar pomiaru liczy od stałej chwili, losowość pochodzi z ziaren pomiaru.
    - Tabela „Files of this kind”: nowy plik kodu w `balance/` dostaje w niej wiersz ze stanem `copy` (D-437, *Verification*: „list each file of code of the instrument in the table of the kind”), zaczyna się komentarzem, który mówi, czym jest, i wskazuje niezmiennik `instrument-game-agreement`, i sam odmawia mapy, której dane gry nie mają (przykłady „Komentarz na początku pliku” i „Odmowa nieznanego identyfikatora”).
    - Przykład „Tryb zbudowany na silniku” (`balance/check-map.mjs`: stałe pomiaru nazwane i eksportowane, pomiar osobno od układania tabeli, bez własnego pułapu minut) jest wzorem nowego trybu pomiaru, nie wymogiem (D-437: „without requiring every mode of the instrument to take the shape of the engine”).
  - Not chosen (w zadaniu 23):
    - plik-wzorzec `balance/check-map.mjs` — „plik jest mały (141 wierszy) i nie pokazuje ani styku z funkcjami gry, ani odmowy błędnego wejścia; zadanie, które zmienia sam silnik, zostaje bez wzorca”
    - ten sam rodzaj z sześcioma plikami JSON w tabeli plików — „tabela rośnie z każdą nową nakładką, plików JSON nie czytają narzędzia jakości kodu, na których stoją reguły rodzaju, a rodzaj w wytycznych kodowania oznacza kod, nie dane”
    - dwa rodzaje, moduły pomiaru i osobno wiersz poleceń z własnym wzorcem — „drugi plik wytycznych i druga decyzja dla jednego pliku. Plan mówi o jednym rodzaju, więc najpierw zmiana planu. Ten wariant zmienia też decyzję D-28, która dziś odkłada osobny wzorzec dla punktów uruchomienia”
  - Source: dokument zadania 23 `wzorzec_kodu_przyrzadu_loop2.md`, pytania 1 i 5: human, 2026-11-20, „ok dla wszystkich dotychczas”, przyjęcie wariantów domyślnych „plik-wzorzec `balance/engine.mjs` (Q1 a)” i „rodzaj `balance-instrument` dla ośmiu plików kodu, pliki JSON poza nim (Q5 a)”; zadanie 23 scalone 2026-11-20 (PR #164, commit fec2ae7e): `guidelines/coding-balance-instrument.md`, sekcje „Rules”, „Examples” i „Files of this kind”, D-437 i wiersz `balance-instrument` w `guidelines/coding.md`, wszystko w commicie fec2ae7e.
- Pytanie 12. Jak przyrząd balansu liczy wskrzeszenie z liczbą użyć?
  - Answer: Tak, jak mówi pozycja 5 listy „To do”: pomiar pętli i sprawdzenie mapy startują z pełnym zapasem użyć, przełącznik „bez wskrzeszenia” startuje z zerem, a symulowany gracz kampanii, który przed próbą następnej mapy czeka na wskrzeszenie, próbuje, gdy zostało choć jedno użycie; pomiary map mówią wtedy o grze takiej, jaka będzie po zmianie.
  - Source: human, 2026-11-20, przez doradcę dnia jak przy pytaniu 3: „reszta ok” — ustalenie domyślne 8 bez weta (pokazane jako 24.8; tura 6, *Human material*); weto wymagałoby innego znaczenia tych ustawień, którego pytanie nie pokazało.

### task.md lines 160-160

- Przyrząd balansu (commit fec2ae7e): `balance/loop.mjs` w funkcji `startState` sam wpisuje do stanu drużyny chwilę gotowości wskrzeszenia, gdy pętla ma startować ze zużytym wskrzeszeniem (stała `MS_PER_MINUTE`, której przy tym używa, stoi od zadania 23 tylko w `balance/loop.mjs`, a `balance/campaign.mjs` ją stamtąd importuje), `balance/campaign.mjs` czyta gotowość przez `resurrectionReady`, `balance/cli.mjs` ma przełącznik `--no-resurrection`, `balance/check-map.mjs` startuje pętlę z gotowym wskrzeszeniem, opisy graczy w `balance/players/` mają pole `needResurrection`, a skill `.claude/skills/loop2-balance/SKILL.md` i jego kopia w `.agents/skills/loop2-balance/SKILL.md` opisują przełącznik.

## Foundation, guidelines and code named in *Read*

Read each guideline file named whole. Each foundation entry named by its identifier or its heading is read whole by the range from its heading to the next heading of any level. The line ranges in the plan's *Read* are those of the base commit `46cfec71`; earlier slices and the foundation step may have moved them, so find each entry by its identifier or heading, and where the numbers differ the entry you find holds.

## Extra from the orchestrator

- Slices 1-9 are made (slice 9: `b0353afa`). The team's state holds the count of uses spent and not yet returned and the moment of the next return; read the uses through `resurrectionAt(team, nowMs)` and `resurrectionReady` of `src/browser/sim/game.ts` as they stand; the instrument must not read the stored fields to count a return and must keep no copy of the game's numbers (3 uses, 240 minutes): take them from the built game (`BALANCE` data). `balance/loop.mjs` `startState` and `balance/check-map.mjs` still write the old field `resurrectionReadyAtMs`: that is why `tests/balance/*` fail now; replace it by the game's functions (a team with every use spent and the clock started at the start of the loop for `--no-resurrection`, the full count otherwise).
- Slice 1's review found that the new binding paragraph of D-428 (`foundations/decisions.md`, the paragraph about the loop starting with the full number of uses, `--no-resurrection` with every use spent and the clock started at the loop's start, the campaign player trying when at least one use is left) has no test that holds it. Add `decision: D-428 "<its sentence from the start>"` lines to the cases of `tests/balance/loop.test.mjs`, `campaign.test.mjs` and `cli.test.mjs` that hold each part (a quotation begins at the start of a sentence of the decision and is word for word what the decision says now). You change no foundation file; where D-428's *Verification* `tests:` clause should name them, say so in your report for the return step.
- Run the foundation check (`python -B .the-way/elements/common/foundation_check.py --skip-test-citations`) at the end: no error may remain for the files of your *Change*; errors in `tests/view/*` stand by the plan.
- Slice 4's new file `balance/progression.mjs` and its test already exist; the new mode must keep working with the new shape (its tests are in your *Checks*). The two copies of the skill `loop2-balance` must stay byte-identical. `decision_index.py` takes `--decision D-428`, with the `D-` prefix. Edit large files by searching and reading ranges. A test comment must not point to a document outside the foundation.
