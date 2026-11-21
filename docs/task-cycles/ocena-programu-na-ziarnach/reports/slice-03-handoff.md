# Handoff — the executor of slice 3, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `afac5cd0`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 3 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-3/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-03-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `foundations/decisions.md:11814-11839` D-439 (the plan's *Foundation entries* row 1, as the foundation step wrote it)
- `foundations/decisions.md:5469-5522` D-22 (the plan's *Foundation entries* row 8, as the foundation step wrote it)
- `foundations/glossary.md:308-313` term judging (row 10)
- `foundations/decisions.md:5469-5522` D-22 (plan: 5469-5512)
- `foundations/decisions.md:290-315` D-18 (plan: 290-315)
- `foundations/decisions.md:253-289` D-07 (plan: 253-289)
- `foundations/decisions.md:9064-9091` D-249 (plan: 8977-9004)
- `foundations/decisions.md:8378-8393` D-179 (plan: 8368-8383)
- `foundations/decisions.md:8560-8580` D-189 (plan: 8550-8570)
- `foundations/decisions.md:8661-8719` D-241 (plan: 8651-8689)
- `foundations/invariants.md:165-175` map-run-repeatability
- `foundations/invariants.md:176-186` simulation-randomness
- `foundations/invariants.md:214-225` simulation-isolation
- `foundations/invariants.md:226-235` simulation-inputs
- `foundations/invariants.md:978-987` trip-transfer
- `foundations/invariants.md:1178-1187` loop-run-knowledge
- `foundations/glossary.md:18-24` map run (plan: 18-24)
- `foundations/glossary.md:142-147` completion (plan: 142-147)
- `foundations/part_map.md:33-64` simulation
- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/coding-content-data.md`
- `guidelines/testing.md`
- `src/browser/sim/run.ts`
- `src/browser/sim/trip.ts`
- `src/browser/sim/loop.ts:57-89`
- `src/browser/sim/game.ts:140-200`
- `balance/engine.mjs:200-257`
- `tests/sim/reference-programs.mjs`
- `tests/sim/program-fixture.mjs`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 31-33 (To do)

1. Gra ocenia program postaci na mapie: puszcza go na dwunastu stałych ziarnach tej mapy, za każdym razem tych samych; każde z dwunastu przejść trwa od wejścia na mapę do rozwiązania mapy, śmierci postaci albo pułapu minut gry. Pułap jest jedną liczbą w danych gry i zaczyna od 4000 (pytanie 5). Ziarnami oceny są liczby od 1 do 12, te same na każdej mapie, dla każdego programu i każdej postaci, zapisane w danych gry obok pułapu. Przejście, które rozwiązuje mapę albo kończy się śmiercią dokładnie w minucie pułapu, liczy się jako rozwiązane albo jako śmierć; bez rozstrzygnięcia jest tylko przejście, które w minucie pułapu dalej trwa — jak w przyrządzie (`balance/engine.mjs`, `runOnce`).
2. Ocena nie jest przejściem postaci: nie bierze nic ze skrzynki, nic nie płaci — ani wprawy, ani łupu — i nie rozlicza śmierci, więc nie zużywa wskrzeszenia i nie zabiera postaci wprawy ani wykupionych stopni; przejście ręczne i pętle zarobkowe, które trwają, są po ocenie takie, jakie były. Postać wchodzi w ocenę z tym, co pętla dostałaby w tej chwili: z listą „Zabierz” programu przyciętą tym, co naprawdę leży w skrzynce, udźwigiem postaci i pułapem mapy; ze skrzynki nic nie ubywa, a wszystkie dwanaście przejść startuje z tym samym wyposażeniem (pytanie 4). Ocena nic nie odkrywa: biegnie z tym, co gracz już odkrył, niczego nie wpisuje do Zrozumienia i nie dopisuje reguł do programu (pytanie 9).
3. Gracz czyta wynik ziarno po ziarnie, w dwunastu wierszach. Każdy wiersz mówi jedno z trzech: rozwiązane; śmierć z przyczyną i minutą gry; albo bez rozstrzygnięcia, gdy przejście doszło do pułapu, a program ani nie rozwiązał mapy, ani nie zginął. Wiersz bez rozstrzygnięcia nie liczy się jako rozwiązany (pytanie 5). Wynik nie pokazuje minuty pierwszego ognia, tego, co leżało na kafelku wejściowym, ani zdania o tym, co łączy porażki (pytanie o uproszczenie oceny, niżej).

### lines 77-89 (Questions to settle)

- Pytanie 4. Z jakim wyposażeniem postać wchodzi w ocenę, skoro ocena nic nie bierze ze skrzynki: z pełną listą „Zabierz” wziętą znikąd, z tym, co pętla dostałaby ze skrzynki w tej chwili, czy — jak w starym Loopie — znikąd na mapie rozwiązanej, a według skrzynki na nierozwiązanej?
  - Answer: wariant b — to, co pętla dostałaby w tej chwili: lista „Zabierz” przycięta tym, co leży w skrzynce, udźwigiem i pułapem mapy; ze skrzynki nic nie ubywa. Powód Mariusza: wariant a „w docelowym kształcie gry, gdzie wiele map będzie wymagało właśnie odpowiedniego wyposażenia” byłby nietrwały. Na pytanie sprawdzające ten wybór — czy b zostaje, skoro przy wyborze zadania 1 Mariusz miał w materiale zdanie „Darmową próbę dałaby wtedy ocena programu na ziarnach z zadania 2, ale tylko jeśli ocena dostaje wyposażenie «znikąd» i działa też na mapach jeszcze nierozwiązanych.” — Mariusz potwierdził b. Koszt pokazany przy wyborze: po zmianie przyjętej w zadaniu 1 gra nie ma żadnego miejsca, w którym sprawdzisz program z zapasem, którego jeszcze nie masz — to droga, którą D-189 kiedyś odrzuciło; wynik zmienia się z każdą zmianą skrzynki; zysk: wynik mówi o tym, co pętla naprawdę dostanie na starcie. Przy pytaniu sprawdzającym: „Ocena mówi prawdę o tym, co masz. Zapas zdobywa się ręczną grą na rozwiązanych mapach […], więc «zdobądź, potem oceń» kosztuje minuty, nie godziny. Koszt: nie ma próby «co by było, gdybym to miał».”
  - Not chosen:
    - a — znikąd, na każdej mapie, z ostrzeżeniem przy wyniku, gdy skrzynka tego nie ma: „„12 z 12” nie obiecuje, że pętla przejdzie, bo pętla weźmie tylko to, co leży w skrzynce, a ostrzeżenie da się przeoczyć”; zysk: darmowe sprawdzenie programu z rzeczą, o którą pyta ściana, zanim gracz ją zdobędzie; przy pytaniu sprawdzającym (powrót do „znikąd”): „wynik obiecuje więcej, niż pętla dostanie, a przy egzemplarzach regułę trzeba będzie wymyślić od nowa”
    - c — jak w starym Loopie i w koncepcji: znikąd na mapie rozwiązanej, według skrzynki na nierozwiązanej: „dwie reguły zamiast jednej; na ścianie […] ocena nie sprawdzi programu z zapasem, którego nie masz; reguła, którą ten wariant naśladuje […], sama znika po zmianie z zadania 1”
    - d — przełącznik „z pełnym zapasem” albo „z tym, co w skrzynce”: „dodatkowa kontrolka i dwa różne wyniki tego samego programu; odznaka musiałaby mówić, którego wyniku dotyczy”
  - Source: human, 2026-11-20, „2. a jest proste, ale w docelowym kształcie gry, gdzie wiele map będzie wymagało właśnie odpowiedniego wyposażenia sprawia, że to rozwiązanie będzie nietrwałe, wydaje mi się, że jednak b” — odpowiedź na pytanie pokazane jako 2 (rozmowa doprecyzowania, tura 7); na pytanie sprawdzające: „2. tak” (tura 11).
- Pytanie 5. Co pokazuje wiersz ziarna, na którym program ani nie rozwiązuje mapy, ani nie ginie, i po ilu minutach gry ocena przestaje na takie przejście czekać?
  - Answer: wariant a — przejście oceny kończy się najpóźniej po 4000 minut gry, a liczba stoi w danych gry; wiersz mówi wtedy „bez rozstrzygnięcia”, nie liczy się jako rozwiązany, więc odbiera odznakę. Koszt pokazany przy wyborze: trzeci rodzaj wiersza, którego ówczesny wpis definicji nie wymieniał (wpis zmieniono, zob. pytanie o uproszczenie oceny); przy mapie z dużo dłuższą passą liczbę trzeba będzie zmienić. Przyrząd balansu: „jeśli w zadaniu 23 (wzorzec kodu przyrządu) przyjmiesz regułę, że przyrząd nie trzyma własnej kopii liczby gry, jego trzy pliki zaczną czytać ten pułap z danych gry i zrobi to to zadanie” — Mariusz przyjął tę regułę w zadaniu 23 (zob. *Context*).
  - Not chosen:
    - b — pułap liczony z warunku mapy, na przykład kilka razy wymagana passa: „nowa reguła i mnożnik, którego żadne źródło nie podaje, więc trzeba by go ustalić; trzeci rodzaj wiersza jak w a; przyrząd balansu ma stałe 4000, więc albo dostaje tę samą regułę, albo jego pomiar i ocena w grze przerywają to samo przejście w innej minucie”
    - c — takie przejście liczy się jako porażka z własną przyczyną: „wygląda jak śmierć, a nią nie jest — stary Loop odrzucił to wprost w zacytowanym zdaniu; wpis definicji i tak dostaje wynik, którego nie wymienia, bo to nie jest przyczyna śmierci”
  - Source: human, 2026-11-20 — przy pytaniu pokazanym jako 4: „do pozostałych nie mam uwag”, a na prośbę o potwierdzenie, że to przyjęcie rekomendacji (wśród nich „4 a”): „3. dobrze zrozumiałeś” (rozmowa doprecyzowania, tury 13 i 14; pytanie w brzmieniu tury 10). Zatwierdzona definicja niesie odpowiedź w zdaniu wpisu o ocenie: „or undecided where the program has neither solved the map nor died within a cap of game minutes set in the game's data, 4000 to start” (definicja, odcisk e69a87d6).

### lines 108-112 (Questions to settle)

- Pytanie 9. Czy przejście oceny coś odkrywa, czyli wpisuje do Zrozumienia albo dopisuje regułę do programu?
  - Answer: wariant a — Mariusz potwierdził odczytanie: ocena nic nie odkrywa; biegnie z tym, co gracz już odkrył, niczego nie wpisuje do Zrozumienia i nie dopisuje reguł do programu. Odczytanie stało na dwóch zdaniach: zatwierdzonym wpisie definicji „Such a judging is no map run of the character: it takes nothing from the chest, pays nothing and settles no death.” i D-249 „A map run of an earning loop discovers nothing: the Understanding and the program stay as they stand […] and the player discovers what the character met in a manual map run.” Koszt pokazany przy wyborze: na mapie, na której gracz czegoś jeszcze nie odkrył, program nie ma na to reguł i ocena pokaże porażki, których ręczne przejście z odkryciami mogłoby uniknąć — dotyczy map jeszcze nierozwiązanych, na których ocenę też można puścić.
  - Not chosen:
    - b — skreślam odczytanie, ocena odkrywa jak przejście ręczne: „odkrycia bez ryzyka i bez zatrzymania gry, po dwanaście przejść naraz. Zmienia D-249 […] wymaga zmiany tego wpisu, a zmiana wpisu zatwierdzonej definicji wraca do jej ponownego zatwierdzenia”
  - Source: human, 2026-11-20 — przy pytaniu pokazanym jako 11: „do pozostałych nie mam uwag”, a na prośbę o potwierdzenie, że to przyjęcie rekomendacji (wśród nich „11 a”): „3. dobrze zrozumiałeś” (rozmowa doprecyzowania, tury 13 i 14; pytanie w brzmieniu tury 10).

### lines 145-149 (Context)

- Symulacja ma już wszystko, czym liczy się jedno przejście: `newMapRun`, `stepMinute` i `mapRunEnded` w `src/browser/sim/run.ts`; przejście pętli zarobkowej biegnie nimi bez odkryć i bez zatrzymań (`src/browser/sim/loop.ts`, `advanceLoopRun`).
- Wyposażenie na wejściu liczą funkcje w `src/browser/sim/trip.ts`: `sendTake` przycina listę „Zabierz” zawartością skrzynki, udźwigiem i pułapem mapy, a `takeTrip` do tego zdejmuje sztuki ze skrzynki (stan przy `77a612cb`; zadanie 24 zmienia regułę ręcznego przejścia mapy rozwiązanej, więc funkcje „znikąd” mogą po nim wyglądać inaczej).
- Przyrząd balansu kończy przejście jako `solved`, `death` albo `cap`, z przyczyną i minutą, a przejście, które po 4000 minut gry trwa dalej, kończy jako `cap` (`balance/engine.mjs`, `runOnce` i `DEFAULT_CAP_MINUTES`); przyrząd puszcza zbudowaną symulację gry, a niezmiennik `instrument-game-agreement` trzyma zgodność jego przejścia z przejściem gry.
- Pułap a przyrząd: zadanie 23 (wzorzec kodu przyrządu) przyjęło regułę, że przyrząd nie trzyma własnej kopii liczby gry (tamto pytanie 2, wariant a), i usunęło powtórzenia liczb między plikami przyrządu, w tym 4000 z trzech plików (tamto pytanie 3, wariant c) — Mariusz, 2026-11-20, „ok dla wszystkich dotychczas” (`.runs/project-refinement/wzorzec-kodu-przyrzadu.md`, tura 10; dokument `a note in the author's private notes`). Zadanie 23 jest scalone (PR #164, `fec2ae7e`): reguła stoi w `guidelines/coding-balance-instrument.md` jako „Liczba gry”, a 4000 tylko w `balance/engine.mjs`. Gdy to zadanie wnosi pułap do danych gry, 4000 w przyrządzie staje się kopią liczby gry, stąd *To do* 11.
- Ziarna 1–12 w danych gry: przyrząd balansu odtwarza wtedy ocenę z gry poleceniem `sweep` z `--seeds 1-12`, a symulacja nie potrzebuje drugiego miejsca, które wyprowadza ziarna z generatora (niezmiennik `simulation-randomness`).

### lines 154-155 (Context)

- Dwanaście przejść jednego programu liczy przyrząd balansu na komputerze autora w około 0,2 sekundy razem z uruchomieniem (pomiar refinera, 2026-11-20, `sweep` na ziarnach 1–12: Las z `forestNaive` i `forestDecent`, „Las — głębiej” z `forestBest`; żadne z tych przejść nie doszło do 4000 minut); w przeglądarce nie mierzone. Drugi pomiar, przy sprawdzaniu listy decyzji zostawionych wykonawcy: na trzech mapach z 23 programami przyrządu 5–170 ms dla dwunastu przejść, także gdy 11 z 12 przejść doszło do pułapu (passa Skraju lasu podniesiona w pamięci do 100000); Node 24, bez przeglądarki i bez słabego urządzenia.
- Gra zna trzy przyczyny śmierci, `cold`, `hunger` i `combat` (`src/browser/sim/types.ts`, typ `DeathCause`), a ekran przejścia nazywa je „Mag zamarzł”, „Mag umarł z głodu” i „Mag zginął w walce” (`src/browser/view/now-lines.ts`).

### lines 223-225 (Settlements to record)

| 1 | Ocenić program można na każdej mapie, na którą gracz może wejść, także nierozwiązanej, i także dla postaci, która jest w pętli albo której przejście ręczne trwa; ocena niczego w nich nie rusza. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 3; Pytanie 1 (wybory Mariusza) | czy przycisk oceny stoi na mapie nierozwiązanej i przy postaci w pętli |
| 2 | Postać wchodzi w ocenę z listą „Zabierz” programu przyciętą tym, co leży w skrzynce, udźwigiem i pułapem mapy; ze skrzynki nic nie ubywa, a dwanaście przejść startuje z tym samym. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 4 (wybór Mariusza) | czy ocena bierze wyposażenie znikąd, jak dziś ręczne przejście mapy rozwiązanej, czy według skrzynki |
| 3 | Ocena nic nie odkrywa: biegnie z tym, co gracz już odkrył, niczego nie wpisuje do Zrozumienia i nie dopisuje reguł do programu. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 9 (wybór Mariusza) | czy przejście oceny zatrzymuje grę i wpisuje odkrycie, jak przejście ręczne |

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 3 — the simulation judges a program on the twelve seeds

- **Goal:** the game's data holds, in `src/browser/sim/data/balance.ts` beside each other, the cap
  of game minutes of a judging, 4000, and its twelve seeds, the numbers 1 to 12. `types.ts` holds the
  result of one seed — solved; a death with its cause (`DeathCause`) and game minute; undecided — and
  the result of a judging: the twelve results in the order of the seeds and what the judging took
  from the chest on entry. A new module `src/browser/sim/judging.ts` exports a pure function that
  judges the program of the player's list numbered by its argument, for a character of the team, on
  a map the player may enter (`canSendMap`): for each seed it starts a map run of that map from that
  seed with the character's skills and traits as they stand, the program reduced to the
  character's repertoire as an earning loop's map run reduces it (`programOf`, as `beginRun` in
  `loop.ts` calls it), and a backpack of the take list clipped by what lies in the chest, the
  character's carrying capacity and the map's entry cap, taking nothing (`sendTake`); all twelve
  start with the same equipment. Each map run passes game minute by game minute (`stepMinute`) until
  it ends or reaches the cap; a map run that solves the map or dies exactly in the game minute of the
  cap counts as solved or as a death, and only one still going in that minute is undecided — as
  `runOnce` in `balance/engine.mjs` stops a run. The function changes nothing it is given (D-04,
  `simulation-inputs`), draws no seed, discovers nothing and writes no rule into any program (D-249
  as for an earning loop; task Q9), touches no chest, character, program, manual map run or earning
  loop, and reads no clock. A character in an earning loop or in the manual map run can be judged.
  It refuses a character, program or map it cannot judge in the way the simulation refuses such
  arguments elsewhere. The failing test comes first, in a new file `tests/sim/judging.test.mjs`,
  with expected values from the foundation and from relations the code does not compute
  (`guidelines/testing.md`, "Where the expected value comes from"): the state equal before and after,
  the twelve seeds of the data, the cap's edge, a death's cause and minute, the clipped equipment
  with the chest untouched. `game.ts` does not grow: the judging lives in its own module (D-425,
  `game.ts` stands at about 725 lines of code of 800).
- **Change:** `src/browser/sim/data/balance.ts` · `src/browser/sim/types.ts` ·
  `src/browser/sim/judging.ts` · `tests/sim/judging.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:31-33` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:77-89` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:108-112` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:145-149` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:154-155` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:223-225` Settlements to record ·
  Foundation entries row 1 · Foundation entries row 8 · Foundation entries row 10 ·
  `foundations/decisions.md:5469-5512` D-22 · `foundations/decisions.md:290-315` D-18 ·
  `foundations/decisions.md:253-289` D-07 · `foundations/decisions.md:8977-9004` D-249 ·
  `foundations/decisions.md:8368-8383` D-179 · `foundations/decisions.md:8550-8570` D-189 ·
  `foundations/decisions.md:8651-8689` D-241 · `foundations/invariants.md:165-175`
  map-run-repeatability · `foundations/invariants.md:176-186` simulation-randomness ·
  `foundations/invariants.md:214-225` simulation-isolation · `foundations/invariants.md:226-235`
  simulation-inputs · `foundations/invariants.md:978-987` trip-transfer ·
  `foundations/invariants.md:1178-1187` loop-run-knowledge · `foundations/glossary.md:18-24` map
  run · `foundations/glossary.md:142-147` completion · `foundations/part_map.md:33-64` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/testing.md` · `src/browser/sim/run.ts` ·
  `src/browser/sim/trip.ts` · `src/browser/sim/loop.ts:57-89` · `src/browser/sim/game.ts:140-200` ·
  `balance/engine.mjs:200-257` · `tests/sim/reference-programs.mjs` ·
  `tests/sim/program-fixture.mjs`
- **Model:** same — raised from `cheaper` by the orchestrator: the judging is the core function every later slice stands on, and it has to equal the earning loop's map run in what it takes and leaves (a wrong reading is found only by the later slices); reason recorded in the cycle's questions table
- **Risk:** none
- **Checks:** `npm test -- tests/sim/judging.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/random.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_simulation_randomness.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py`
- **Depends on:** Foundation entries row 1 · row 8 · row 10

## Notes of the orchestrator for this slice

- Write the failing test first (`tests/sim/judging.test.mjs`) and run it red, then the code; report both runs.
- The task's *To do* 1 says the cap and the seeds are numbers of the game's data "zapisane w danych gry obok pułapu" and the instrument takes the cap from the built game (slice 8 does that; do not touch `balance/` here). Put the cap and the twelve seeds in `src/browser/sim/data/balance.ts` as the plan says, with the same kind of declaration the neighbouring numbers have, and keep the file's tests (`tests/sim/data.test.mjs`) passing.
- `guidelines/coding-simulation-module.md` *Files of this kind*: the new module `judging.ts` may owe a row; the planner was unsure. Do not edit the guideline; name in the report whether the guideline says a row is owed.
- The function must call the same step functions an earning loop's map run calls (`stepMinute`, `mapRunEnded`, `newMapRun`, `programOf`, `sendTake`) — read how `loop.ts` `beginRun`/`advanceLoopRun` use them, and make the judging's map run equal the earning loop's map run in what it takes and leaves; a map run of the judging must not move the clock of the game or touch anything of the game state (D-04: never change a value passed in).
- D-439 (new) and D-22 (changed) as the foundation step wrote them, at the current ranges above, are your binding source for what the judging is; read them whole.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
