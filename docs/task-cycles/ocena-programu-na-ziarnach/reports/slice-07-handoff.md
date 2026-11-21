# Handoff — the executor of slice 7, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `9efb8a8a`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 7 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-7/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-07-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours (known: the D-243 quotations named below, until their slices). Slices 3 and 4 shipped such errors; do not repeat it.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `foundations/decisions.md:11814-11839` D-439 (the plan's *Foundation entries* row 1, as the foundation step wrote it)
- `foundations/decisions.md:11840-11866` D-440 (the plan's *Foundation entries* row 2, as the foundation step wrote it)
- `foundations/decisions.md:8121-8137` D-165 (plan: 8111-8127)
- `foundations/decisions.md:8161-8179` D-167 (plan: 8151-8169)
- `foundations/decisions.md:8180-8196` D-168 (plan: 8170-8186)
- `foundations/decisions.md:8214-8231` D-170 (plan: 8204-8221)
- `foundations/decisions.md:8771-8838` D-243 (plan: 8741-8768)
- `foundations/decisions.md:6220-6252` D-190 (plan: 6210-6242)
- `foundations/decisions.md:6399-6436` D-221 (plan: 6389-6426)
- `foundations/decisions.md:9119-9133` D-409 (plan: 9032-9046)
- `foundations/decisions.md:825-843` D-425 (plan: 825-843)
- `foundations/invariants.md:226-235` simulation-inputs
- `foundations/invariants.md:1078-1087` death-settled-once
- `foundations/invariants.md:1178-1187` loop-run-knowledge
- `foundations/glossary.md:25-31` program (plan: 25-31)
- `foundations/glossary.md:180-185` copy (plan: 180-185)
- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/testing.md`
- `src/browser/sim/types.ts`
- `src/browser/sim/trip.ts`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 32-36 (To do)

2. Ocena nie jest przejściem postaci: nie bierze nic ze skrzynki, nic nie płaci — ani wprawy, ani łupu — i nie rozlicza śmierci, więc nie zużywa wskrzeszenia i nie zabiera postaci wprawy ani wykupionych stopni; przejście ręczne i pętle zarobkowe, które trwają, są po ocenie takie, jakie były. Postać wchodzi w ocenę z tym, co pętla dostałaby w tej chwili: z listą „Zabierz” programu przyciętą tym, co naprawdę leży w skrzynce, udźwigiem postaci i pułapem mapy; ze skrzynki nic nie ubywa, a wszystkie dwanaście przejść startuje z tym samym wyposażeniem (pytanie 4). Ocena nic nie odkrywa: biegnie z tym, co gracz już odkrył, niczego nie wpisuje do Zrozumienia i nie dopisuje reguł do programu (pytanie 9).
3. Gracz czyta wynik ziarno po ziarnie, w dwunastu wierszach. Każdy wiersz mówi jedno z trzech: rozwiązane; śmierć z przyczyną i minutą gry; albo bez rozstrzygnięcia, gdy przejście doszło do pułapu, a program ani nie rozwiązał mapy, ani nie zginął. Wiersz bez rozstrzygnięcia nie liczy się jako rozwiązany (pytanie 5). Wynik nie pokazuje minuty pierwszego ognia, tego, co leżało na kafelku wejściowym, ani zdania o tym, co łączy porażki (pytanie o uproszczenie oceny, niżej).
4. W części „Kto idzie” karty mapy, przy każdej postaci, stoi przycisk oceny — na każdej mapie, na którą gracz może wejść, także nierozwiązanej, gdzie stoi obok „Wejdź”. Ocenia program z listy „Program:” tej postaci na mapie tej karty. Wynik rozwija się pod tą postacią i stoi, dopóki gracz nie wybierze innego programu, nie oceni ponownie albo nie wyjdzie z karty. Ocenić można też program postaci, która jest w pętli albo której przejście ręczne trwa, bo ocena niczego w nich nie rusza (pytania 1 i 3). Wyjście z karty to wybór innej mapy z listy, przejście na inny ekran albo przeładowanie strony; przyczyna i minuta wierszy żyją tylko w widoku, nie w zapisie. Ocena nie jest wysłaniem postaci: nie zmienia programu „użytego ostatnio” i nie czyści wyboru na liście „Program:” (D-170, D-243). Ocena idzie przez magazyn stanu gry, który przed nią dolicza czas (D-409), a dwanaście przejść liczy jedno wywołanie symulacji. Przycisk oceny od kliknięcia do wyniku jest wyłączony i ma napis „Oceniam…” (pytanie 8), więc ekran rysuje ten stan, zanim to wywołanie ruszy; „Puść w pętlę” na czas swojej oceny napisu nie zmienia.
5. „Puść w pętlę” zawsze najpierw ocenia program od nowa, z tym, co pętla dostanie ze skrzynki w tej chwili. Gdy wszystkie dwanaście ziaren jest rozwiązanych, pętla rusza od razu. Gdy któreś nie jest, wynik staje pod postacią, nad przyciskiem staje zdanie o liczbie ziaren nierozwiązanych, przycisk zmienia napis na „Puść mimo to”, a pętlę puszcza dopiero drugie kliknięcie. Nowa ocena zastępuje zapamiętaną (pytanie 1). Gdy pod postacią stoi już wynik z porażką, pokazany wcześniej osobnym przyciskiem oceny, „Puść w pętlę” też ocenia od nowa: gdy nowy wynik jest taki sam jak ten, który stoi — każde z dwunastu ziaren z tym samym wierszem — pętla rusza od razu; gdy jest inny, bo od tamtej oceny zmieniła się skrzynka albo postać, nowy wynik zastępuje stary i czeka na drugie kliknięcie (pytanie 14).
6. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa: dwanaście wyników ziaren i to, co ocena wzięła ze skrzynki na wejście; przyczynę i minutę wiersza widać tylko zaraz po ocenie. Odznakę szczelności ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; gdy w skrzynce jest tego więcej, wynik stoi jak był. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę, a następna ocena ją zastępuje; limitu czasu nie ma (pytanie 2). Przy liście „Program:” stoi zapamiętany wynik programu, który lista pokazuje, i zmienia się razem z wyborem; inne programy listy nie mają znaku. Gdy ocena 12 z 12 straciła zapas, stoi tam „12 z 12” z dopiskiem, bez odznaki. Odznaka i liczba stoją tylko w „Kto idzie”, nie na innych ekranach. Kasuje zapisanie programu, po którym jego reguły, grupy (z ich kolejnością) albo plan wyprawy są inne; zmiana nazwy niczego nie kasuje. Usunięcie programu usuwa jego zapamiętane oceny, a wczytanie zapisu odrzuca cały zapis, gdy zapamiętana ocena nazywa postać, program albo mapę, których gra nie dała (D-165, D-206). Zmiana pułapu albo danych mapy zapamiętanych ocen nie kasuje. Śmierć postaci, która zabiera jej wprawę i wykupione stopnie, bo żadne wskrzeszenie nie jest gotowe (D-190), w przejściu ręcznym albo w pętli, kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie (pytanie 15); śmierć pokryta wskrzeszeniem i wykupienie stopnia ocen nie kasują. Cykl sprawdza, ile miejsca zajmują zapamiętane oceny w zapisie z wieloma postaciami, programami i mapami, wobec limitu zapisu 64 KiB.

### lines 63-71 (Questions to settle)

- Pytanie 2. Co gra pamięta z oceny i kiedy daje odznakę szczelności — przy jakim wyniku na dwunastu ziarnach, przy czym odznaka stoi i co ją kasuje?
  - Answer: wariant a, z dopytaniem o zmianę skrzynki rozstrzygniętym wariantem b. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa (wiersz w „Kto idzie” to taka trójka) jako dwanaście wyników ziaren, razem z tym, co ocena wzięła ze skrzynki; przyczynę, minuty i resztę wiersza widać tylko zaraz po ocenie. Odznakę ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę. Gdy w skrzynce jest więcej tego, co ocena wzięła, wynik stoi; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie. Limitu czasu nie ma: następna ocena nadpisuje wynik. Koszt pokazany przy wyborze: dzisiejsze zapisy przepadają przy wdrożeniu (definicja przyjmuje to dla całego projektu); zapamiętany wynik starzeje się po cichu, gdy postać wykupi stopień; jeden dodatkowy stan wyniku na ekranie (dopisek o zapasie); dla zadania 3 karta mapy ma zapamiętany wynik każdej ocenionej postaci i programu.
  - Not chosen:
    - b — gra pamięta ocenę pary program i mapa, bez postaci: „mniej stanu, ale odznaka przy jednej postaci może pochodzić z oceny inną postacią, z innymi wykupionymi stopniami”
    - c — odznaka już od 11 z 12: „odznakę ma program, który na jednym z dwunastu ziaren mapy nie rozwiązuje; pętla losuje kolejne ziarna, więc na podobne trafi; liczbę 11 propozycja sama oznacza jako zgadywaną”
    - d — gra niczego nie pamięta: „gra nie wie, który program był oceniany, więc […] nie ma ani ostrzeżenia „program bez oceny”, ani pamięci, że program już przeszedł, i po każdym powrocie na kartę ocenia się od nowa; karta mapy w zadaniu 3 nie ma zapamiętanego wyniku do pokazania”
    - dopytanie, a — wynik znika, gdy skrzynka nie da już tego, co ocena wzięła: „tracisz informację, jak program radził sobie z tamtym zapasem”
    - pomysł Mariusza z dopytania — trzymać zapisaną konfigurację „x czasu”: nieprzyjęty, bo następna ocena i tak nadpisuje wynik, a zmiana programu go kasuje (pytanie zamykające prowadzącego projekt, wariant b: „Bez limitu czasu”)
  - Source: human, 2026-11-20, „3. niech będzie a - tu rozumiem to będzie po prostu służyć jako cache, żeby nie przeliczać wszystkiego jeśli mamy już wartości policzone, czy czemuś innemu to miałoby służyć?” (pytanie pokazane jako 3, rozmowa doprecyzowania, tura 7); na dopytanie o zmianę skrzynki: „3. jeśli w skrzynce będzie więcej tego co już tam było wymagane to czemu miałaby znikać / ale jeśli nagle ze skrzynki zniknie wszystko, to chyba tak, niech znika / chyba, że zapisywać daną konfigurację do odczytania i trzymać x czasu a nóż się przyda, nie wiem” (tura 11); na pytanie zamykające: „2b” (tura 12).

### lines 119-124 (Questions to settle)

- Pytanie 15. Czy zapamiętane oceny postaci zostają, gdy jej śmierć przy braku gotowego wskrzeszenia zabiera całą wprawę i wykupione stopnie?
  - Answer: wariant b — taka śmierć kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie. Powód pełnomocnika: „odznaka nie może kłamać po utracie wprawy”. Koszt pokazany przy wyborze: gracz traci informację, jak programy radziły sobie z postacią sprzed śmierci; jedno miejsce więcej w kodzie, które kasuje oceny; cofnięcie później małe. Słabe miejsce pokazane przy wyborze: wykupiony stopień dalej postarza wynik po cichu, więc reguła nie jest symetryczna.
  - Not chosen:
    - a — oceny zostają, jak przy wykupieniu stopnia: „przy postaci, która właśnie straciła wszystko, dalej może stać „szczelny: 12 z 12” aż do następnej oceny — odznaka kłamie w najgorszej chwili”
    - c — oceny zostają z dopiskiem, na przykład „oceniono przed utratą wprawy”, a odznaki gasną: „drugi dopisek i jeszcze jeden stan wyniku na ekranie; jego napis trzeba by ustalić razem z pozostałymi napisami”
  - Source: human, 2026-11-20, przez pełnomocnika — wiadomość „doradcy dnia”, jak przy pytaniu 8: „2: 1a, dopiski ok, 14b, 15b, reszta ok” i uzasadnienie „2.15 b, bo odznaka nie może kłamać po utracie wprawy” (rozmowa doprecyzowania, tura 27; pytanie pokazane jako 15, w brzmieniu tury 26).

### lines 223-226 (Settlements to record)

| 1 | Ocenić program można na każdej mapie, na którą gracz może wejść, także nierozwiązanej, i także dla postaci, która jest w pętli albo której przejście ręczne trwa; ocena niczego w nich nie rusza. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 3; Pytanie 1 (wybory Mariusza) | czy przycisk oceny stoi na mapie nierozwiązanej i przy postaci w pętli |
| 2 | Postać wchodzi w ocenę z listą „Zabierz” programu przyciętą tym, co leży w skrzynce, udźwigiem i pułapem mapy; ze skrzynki nic nie ubywa, a dwanaście przejść startuje z tym samym. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 4 (wybór Mariusza) | czy ocena bierze wyposażenie znikąd, jak dziś ręczne przejście mapy rozwiązanej, czy według skrzynki |
| 3 | Ocena nic nie odkrywa: biegnie z tym, co gracz już odkrył, niczego nie wpisuje do Zrozumienia i nie dopisuje reguł do programu. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 9 (wybór Mariusza) | czy przejście oceny zatrzymuje grę i wpisuje odkrycie, jak przejście ręczne |
| 4 | Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa — dwanaście wyników i to, co ocena wzięła; przy liście „Program:” stoi „szczelny: 12 z 12” w `positive`, gdy ostatnia ocena rozwiązała wszystkie dwanaście ziaren, a inaczej „{n} z 12” w `text`; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; zmiana reguł, grup albo planu wyprawy programu kasuje ocenę, a śmierć, która zabiera postaci wprawę i wykupione stopnie, kasuje wszystkie oceny tej postaci, na każdej mapie. | decision | Pytanie 2; Pytanie 15; Pytanie 8 (wybory Mariusza) | co trafia do zapisu, od ilu ziaren jest odznaka, czy zmiana skrzynki gasi odznakę albo kasuje wynik, czy odznaka zostaje przy postaci, która straciła wprawę, i jak brzmią napisy przy programie |

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 7 — judging as an act of the player, the mark at the list, and what erases a remembered judging

- **Goal:** `src/browser/sim/judging.ts` gains the act of a judging: one call of the simulation
  that judges as Slice 3's function does and gives back the twelve results with cause and minute and
  the game state in which that judging replaces the remembered one of its triple, nothing else
  changing — not the pick of the list „Program:”, the program used last or the one a character last
  entered a map with (D-170, D-243: a judging is no send), not the last seed, the chest or anything
  of a character. A new module `src/browser/sim/judging-record.ts`, which imports neither `game.ts`
  nor `judging.ts` so that both may import it, holds the remembered judgings' pure functions: the
  mark of a program at a character on a map — the count solved, whether all twelve, and whether the
  chest still holds each item at the count the judging took (more in the chest leaves the mark as it
  is; less makes the note stand and the badge go) — and the erasing. A save of a program whose rules,
  groups with their order, or trip plan come out different erases its remembered judgings, wherever
  the simulation writes new content into a program of the list (`setProgram` in `game.ts`, and in
  `programs.ts` each function that saves content into a listed program, the copy's save included); a
  rename erases nothing; deleting a program removes its remembered judgings. A death that takes the
  character's practice and ranks because no use of the resurrection is left (`progressLost`) erases
  all remembered judgings of that character, on every map, in a manual map run (`settleDeath`) and in
  an earning loop (`takeEnd` of `loop.ts`, so the catch-up too); a covered death, a death of a
  character with no practice and a bought rank erase nothing. The failing tests come first, in a new
  file `tests/sim/judging-record.test.mjs`. `game.ts` stays under 800 lines of code (D-425): what
  it calls stands in `judging-record.ts`. Read `src/browser/sim/judging.ts`, which Slice 3 wrote.
- **Change:** `src/browser/sim/judging.ts` · `src/browser/sim/judging-record.ts` ·
  `src/browser/sim/game.ts` · `src/browser/sim/programs.ts` · `src/browser/sim/loop.ts` ·
  `tests/sim/judging-record.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:32-36` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:63-71` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:119-124` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:223-226` Settlements to record ·
  Foundation entries row 1 · Foundation entries row 2 · `foundations/decisions.md:8111-8127` D-165
  · `foundations/decisions.md:8151-8169` D-167 · `foundations/decisions.md:8170-8186` D-168 ·
  `foundations/decisions.md:8204-8221` D-170 · `foundations/decisions.md:8741-8768` D-243 ·
  `foundations/decisions.md:6210-6242` D-190 · `foundations/decisions.md:6389-6426` D-221 ·
  `foundations/decisions.md:9032-9046` D-409 · `foundations/decisions.md:825-843` D-425 ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/invariants.md:1078-1087`
  death-settled-once · `foundations/invariants.md:1178-1187` loop-run-knowledge ·
  `foundations/glossary.md:25-31` program · `foundations/glossary.md:180-185` copy ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/trip.ts`
- **Model:** same — raised from `cheaper` by the orchestrator: the erasing has to be hooked into every place the simulation writes content into a listed program and into both death settlements; a missed place is found only by a reviewer; reason recorded in the cycle's questions table
- **Risk:** none
- **Checks:** `npm test -- tests/sim/judging-record.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/judging.test.mjs` · `npm test -- tests/sim/death.test.mjs` ·
  `npm test -- tests/sim/loop.test.mjs` · `npm test -- tests/sim/catch-up.test.mjs` ·
  `npm test -- tests/sim/program-list.test.mjs` · `npm test -- tests/sim/copy.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_saved_program_edit.py`
- **Depends on:** Slice 3 · Slice 4 · Slice 5 · Foundation entries row 2

## Notes of the orchestrator for this slice

- Slices 3, 4, 5, 8, 9 are made. The judging is `judgeOnSeeds` in `src/browser/sim/judging.ts`; the remembered judgings are in `GameState` (slice 4: `RememberedJudging` in `types.ts`, nesting character → program → map, loaded strictly in `saved-game.ts` — the load refuses a program key that names no program of the list and a character key that names no team member, so what you erase and keep must stay consistent with it); the loop record is in `EarningLoop` (slice 5). Read how they stand before you write.
- The act of a judging is one call through the store; it must change nothing of the game state but the remembered judging of its triple (no clock, no seed, no pick of the list „Program:", no program used last). The erasing rules are given by D-440 (current range above) and the task's *To do* 6: a save of a program whose rules, groups with their order, or trip plan come out different erases its remembered judgings; a rename does not; deleting a program removes its remembered judgings; a death that takes the practice and ranks because no use of the resurrection is left (`progressLost`) erases all of that character's remembered judgings on every map, in a manual map run (`settleDeath`) and in an earning loop (`takeEnd` in `loop.ts`, so the catch-up too); a covered death, a death of a character with no practice and a bought rank erase nothing. Find every place the simulation writes content into a listed program (`setProgram` in `game.ts`, and in `programs.ts` each function that saves content into a listed program, the copy's save included) — a missed place is what a reviewer will look for.
- `src/browser/sim/game.ts` stands at 980 physical lines but ESLint's size rules (D-425) count code lines and pass; after your change run `npx eslint src/browser/sim/game.ts src/browser/sim/loop.ts src/browser/sim/programs.ts src/browser/sim/judging.ts src/browser/sim/judging-record.ts` (exit 0 expected) and report.
- A new test file under `tests/sim/` has to be listed in `stryker.config.json` (`tests/quality/test_mutation_test_selection.py`); name it in the report as an addition to your slice's *Change*.
- Report in the executor's report whether `guidelines/coding-simulation-module.md` says a new module owes a row (do not edit the guideline).

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
