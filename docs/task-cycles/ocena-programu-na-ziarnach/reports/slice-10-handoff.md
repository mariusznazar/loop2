# Handoff — the executor of slice 10, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `7fc40efc`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 10 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-10/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-10-executor-report.md`.
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
- `foundations/decisions.md:9975-10004` D-329 (the plan's *Foundation entries* row 4, as the foundation step wrote it)
- `foundations/decisions.md:9885-9908` D-325 (the plan's *Foundation entries* row 5, as the foundation step wrote it)
- `foundations/decisions.md:9975-10004` D-329 (plan: 9885-9905)
- `foundations/decisions.md:9885-9908` D-325 (plan: 9798-9818)
- `foundations/decisions.md:8214-8231` D-170 (plan: 8204-8221)
- `foundations/decisions.md:9119-9133` D-409 (plan: 9032-9046)
- `foundations/decisions.md:4744-4760` D-407 (plan: 4744-4760)
- `foundations/decisions.md:3934-4013` D-207 (plan: 3934-4013)
- `foundations/decisions.md:6314-6335` D-217 (plan: 6304-6325)
- `foundations/decisions.md:8839-8860` D-244 (plan: 8769-8790)
- `foundations/decisions.md:4993-5009` D-44 (plan: 4993-5009)
- `foundations/decisions.md:10248-10283` D-287 (plan: 10149-10184)
- `foundations/decisions.md:290-315` D-18 (plan: 290-315)
- `foundations/invariants.md:236-247` content-identifiers
- `foundations/invariants.md:478-487` browser-view-token-values
- `foundations/part_map.md:3-31` browser-view
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/view/state-store.ts`
- `src/browser/view/trip-lines.ts`
- `src/browser/view/now-lines.ts`
- `src/browser/view/counted-name.ts`
- `src/browser/sim/data/balance.ts`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 33-45 (To do)

3. Gracz czyta wynik ziarno po ziarnie, w dwunastu wierszach. Każdy wiersz mówi jedno z trzech: rozwiązane; śmierć z przyczyną i minutą gry; albo bez rozstrzygnięcia, gdy przejście doszło do pułapu, a program ani nie rozwiązał mapy, ani nie zginął. Wiersz bez rozstrzygnięcia nie liczy się jako rozwiązany (pytanie 5). Wynik nie pokazuje minuty pierwszego ognia, tego, co leżało na kafelku wejściowym, ani zdania o tym, co łączy porażki (pytanie o uproszczenie oceny, niżej).
4. W części „Kto idzie” karty mapy, przy każdej postaci, stoi przycisk oceny — na każdej mapie, na którą gracz może wejść, także nierozwiązanej, gdzie stoi obok „Wejdź”. Ocenia program z listy „Program:” tej postaci na mapie tej karty. Wynik rozwija się pod tą postacią i stoi, dopóki gracz nie wybierze innego programu, nie oceni ponownie albo nie wyjdzie z karty. Ocenić można też program postaci, która jest w pętli albo której przejście ręczne trwa, bo ocena niczego w nich nie rusza (pytania 1 i 3). Wyjście z karty to wybór innej mapy z listy, przejście na inny ekran albo przeładowanie strony; przyczyna i minuta wierszy żyją tylko w widoku, nie w zapisie. Ocena nie jest wysłaniem postaci: nie zmienia programu „użytego ostatnio” i nie czyści wyboru na liście „Program:” (D-170, D-243). Ocena idzie przez magazyn stanu gry, który przed nią dolicza czas (D-409), a dwanaście przejść liczy jedno wywołanie symulacji. Przycisk oceny od kliknięcia do wyniku jest wyłączony i ma napis „Oceniam…” (pytanie 8), więc ekran rysuje ten stan, zanim to wywołanie ruszy; „Puść w pętlę” na czas swojej oceny napisu nie zmienia.
5. „Puść w pętlę” zawsze najpierw ocenia program od nowa, z tym, co pętla dostanie ze skrzynki w tej chwili. Gdy wszystkie dwanaście ziaren jest rozwiązanych, pętla rusza od razu. Gdy któreś nie jest, wynik staje pod postacią, nad przyciskiem staje zdanie o liczbie ziaren nierozwiązanych, przycisk zmienia napis na „Puść mimo to”, a pętlę puszcza dopiero drugie kliknięcie. Nowa ocena zastępuje zapamiętaną (pytanie 1). Gdy pod postacią stoi już wynik z porażką, pokazany wcześniej osobnym przyciskiem oceny, „Puść w pętlę” też ocenia od nowa: gdy nowy wynik jest taki sam jak ten, który stoi — każde z dwunastu ziaren z tym samym wierszem — pętla rusza od razu; gdy jest inny, bo od tamtej oceny zmieniła się skrzynka albo postać, nowy wynik zastępuje stary i czeka na drugie kliknięcie (pytanie 14).
6. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa: dwanaście wyników ziaren i to, co ocena wzięła ze skrzynki na wejście; przyczynę i minutę wiersza widać tylko zaraz po ocenie. Odznakę szczelności ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; gdy w skrzynce jest tego więcej, wynik stoi jak był. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę, a następna ocena ją zastępuje; limitu czasu nie ma (pytanie 2). Przy liście „Program:” stoi zapamiętany wynik programu, który lista pokazuje, i zmienia się razem z wyborem; inne programy listy nie mają znaku. Gdy ocena 12 z 12 straciła zapas, stoi tam „12 z 12” z dopiskiem, bez odznaki. Odznaka i liczba stoją tylko w „Kto idzie”, nie na innych ekranach. Kasuje zapisanie programu, po którym jego reguły, grupy (z ich kolejnością) albo plan wyprawy są inne; zmiana nazwy niczego nie kasuje. Usunięcie programu usuwa jego zapamiętane oceny, a wczytanie zapisu odrzuca cały zapis, gdy zapamiętana ocena nazywa postać, program albo mapę, których gra nie dała (D-165, D-206). Zmiana pułapu albo danych mapy zapamiętanych ocen nie kasuje. Śmierć postaci, która zabiera jej wprawę i wykupione stopnie, bo żadne wskrzeszenie nie jest gotowe (D-190), w przejściu ręcznym albo w pętli, kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie (pytanie 15); śmierć pokryta wskrzeszeniem i wykupienie stopnia ocen nie kasują. Cykl sprawdza, ile miejsca zajmują zapamiętane oceny w zapisie z wieloma postaciami, programami i mapami, wobec limitu zapisu 64 KiB.
7. Rekord pętli: stan pętli zarobkowej liczy od jej startu ciąg kolejnych domkniętych przejść bez śmierci i najdłuższy taki ciąg. Śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa, tak samo jak śmierć postaci bez wprawy, po której pętla też trwa (D-190), a zatrzymanie pętli kończy liczenie; liczba znika razem z pętlą. Wiersz postaci w raporcie „Gdy cię nie było” dostaje na końcu najdłuższy ciąg zwykłym tekstem, bez wyróżnienia i bez porównania z czymkolwiek (pytanie 7). Liczbę wiersz czyta z pętli przy każdym rysowaniu sekcji, jak wprawę do odebrania (D-246); przy zerze jej nie ma, a wiersz pętli zatrzymanej śmiercią jej nie niesie.
8. Napisy, które gracz czyta przy ocenie, odznace, drugim kliknięciu „Puść w pętlę” i rekordzie pętli, słowo w słowo (pytanie 8); {i} to numer ziarna, {n}, {k} i {m} to liczby, {pułap} to pułap minut z danych gry:
   - przycisk oceny przy postaci: „Oceń na 12 ziarnach”; w trakcie liczenia: „Oceniam…”;
   - nagłówek wyniku: „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”;
   - wiersze: „Ziarno {i}: rozwiązane”, „Ziarno {i}: mag zamarzł w {m}. minucie”, „Ziarno {i}: mag umarł z głodu w {m}. minucie”, „Ziarno {i}: mag zginął w walce w {m}. minucie”, „Ziarno {i}: bez rozstrzygnięcia po {pułap} minutach”;
   - pod wierszami, w `text-secondary`: „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.”;
   - przy liście „Program:”: „szczelny: 12 z 12” w `positive`, a przy niższym wyniku „{n} z 12” w `text`; dopisek, gdy skrzynka nie ma już tego, co ocena wzięła: „oceniono z zapasem, którego dziś nie ma w skrzynce” (pytanie 2);
   - po pierwszym kliknięciu „Puść w pętlę”, gdy któreś ziarno nie jest rozwiązane: nad przyciskiem, w `warning`, „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, a przycisk zmienia napis na „Puść mimo to”;
   - na końcu wiersza postaci w „Gdy cię nie było”: „ · najdłużej bez śmierci: {n} przejść z rzędu”, z odmianą „1 przejście”, „3 przejścia”, „5 przejść”.

### lines 56-76 (Questions to settle)

- Pytanie 1. Gdzie gracz uruchamia ocenę, gdzie czyta jej wynik i jak ocena ma się do przycisku „Puść w pętlę”, który dziś działa od razu po kliknięciu (D-243)?
  - Answer: wariant b. Przycisk oceny stoi w „Kto idzie” przy każdej postaci, na każdej mapie, także nierozwiązanej, gdzie stoi obok „Wejdź”; ocenia program z listy „Program:” tej postaci na mapie tej karty, z tym, co pętla dostałaby teraz ze skrzynki; wynik rozwija się pod tą postacią i stoi, dopóki gracz nie wybierze innego programu, nie oceni ponownie albo nie wyjdzie z karty; zapamiętany wynik — odznaka albo „{n} z 12” — stoi przy liście „Program:”; ocenić można też program postaci, która jest w pętli albo której przejście ręczne trwa. „Puść w pętlę” zawsze najpierw ocenia program od nowa, z tym, co pętla dostanie ze skrzynki w tej chwili; przy dwunastu rozwiązanych ziarnach pętla rusza od razu, a gdy któreś nie jest rozwiązane, przycisk pokazuje wynik pod postacią i czeka na drugie kliknięcie, którym gracz puszcza pętlę mimo to; nowa ocena zastępuje zapamiętaną. Zmienia D-243 (przycisk przestaje działać od razu przy programie, który gdzieś przegrywa) oraz opis tego, co stoi przy postaci i na karcie mapy (D-329, D-325). Koszt pokazany przy wyborze: jedno kliknięcie więcej przy każdym programie, który gdzieś przegrywa, także gdy gracz wie, co robi; chwila liczenia przy każdym puszczeniu; dla programu z porażką „Puść w pętlę” przestaje być jednym kliknięciem, a D-243 ceniło właśnie jedno kliknięcie.
  - Not chosen:
    - a — „Puść w pętlę” działa jak dziś, od razu, a przy programie bez zapamiętanej oceny obok stoi ostrzeżenie: „ostrzeżenie da się pominąć, czyli w przypadku z notatki gra dalej pozwala stracić dorobek jednym kliknięciem; ostrzeżenie mówi tylko o braku oceny, a nie o ocenie, która się zestarzała, bo skrzynka od tamtej pory się zmieniła”
    - c — „Puść w pętlę” nieaktywny, dopóki program nie ma zapamiętanej oceny: „Zmienia D-243 i idzie w stronę tego, co D-239 odrzuciło. Koszt: każdy program trzeba najpierw ocenić osobnym kliknięciem; ocena, która się zestarzała, odblokowuje przycisk tak samo jak świeża.”
    - d — ocena na ekranie przejścia, jak w starym Loopie, jako porównanie kopii z programem z listy: „żeby ocenić, trzeba najpierw wejść w przejście ręczne, które po zmianie z zadania 24 bierze zapas ze skrzynki, a na mapie nierozwiązanej ryzykuje postać; pętlę puszcza się z karty mapy; daje porównanie dwóch programów, którego definicja nie wymaga”
  - Source: human, 2026-11-20 — przy pytaniu pokazanym jako 9: „do pozostałych nie mam uwag”, a na prośbę o potwierdzenie, że to przyjęcie rekomendacji (wśród nich „9 b”): „3. dobrze zrozumiałeś” (`.runs/project-refinement/ocena-programu-na-ziarnach.md`, tury 13 i 14; pytanie w brzmieniu tury 10).
- Pytanie 2. Co gra pamięta z oceny i kiedy daje odznakę szczelności — przy jakim wyniku na dwunastu ziarnach, przy czym odznaka stoi i co ją kasuje?
  - Answer: wariant a, z dopytaniem o zmianę skrzynki rozstrzygniętym wariantem b. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa (wiersz w „Kto idzie” to taka trójka) jako dwanaście wyników ziaren, razem z tym, co ocena wzięła ze skrzynki; przyczynę, minuty i resztę wiersza widać tylko zaraz po ocenie. Odznakę ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę. Gdy w skrzynce jest więcej tego, co ocena wzięła, wynik stoi; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie. Limitu czasu nie ma: następna ocena nadpisuje wynik. Koszt pokazany przy wyborze: dzisiejsze zapisy przepadają przy wdrożeniu (definicja przyjmuje to dla całego projektu); zapamiętany wynik starzeje się po cichu, gdy postać wykupi stopień; jeden dodatkowy stan wyniku na ekranie (dopisek o zapasie); dla zadania 3 karta mapy ma zapamiętany wynik każdej ocenionej postaci i programu.
  - Not chosen:
    - b — gra pamięta ocenę pary program i mapa, bez postaci: „mniej stanu, ale odznaka przy jednej postaci może pochodzić z oceny inną postacią, z innymi wykupionymi stopniami”
    - c — odznaka już od 11 z 12: „odznakę ma program, który na jednym z dwunastu ziaren mapy nie rozwiązuje; pętla losuje kolejne ziarna, więc na podobne trafi; liczbę 11 propozycja sama oznacza jako zgadywaną”
    - d — gra niczego nie pamięta: „gra nie wie, który program był oceniany, więc […] nie ma ani ostrzeżenia „program bez oceny”, ani pamięci, że program już przeszedł, i po każdym powrocie na kartę ocenia się od nowa; karta mapy w zadaniu 3 nie ma zapamiętanego wyniku do pokazania”
    - dopytanie, a — wynik znika, gdy skrzynka nie da już tego, co ocena wzięła: „tracisz informację, jak program radził sobie z tamtym zapasem”
    - pomysł Mariusza z dopytania — trzymać zapisaną konfigurację „x czasu”: nieprzyjęty, bo następna ocena i tak nadpisuje wynik, a zmiana programu go kasuje (pytanie zamykające prowadzącego projekt, wariant b: „Bez limitu czasu”)
  - Source: human, 2026-11-20, „3. niech będzie a - tu rozumiem to będzie po prostu służyć jako cache, żeby nie przeliczać wszystkiego jeśli mamy już wartości policzone, czy czemuś innemu to miałoby służyć?” (pytanie pokazane jako 3, rozmowa doprecyzowania, tura 7); na dopytanie o zmianę skrzynki: „3. jeśli w skrzynce będzie więcej tego co już tam było wymagane to czemu miałaby znikać / ale jeśli nagle ze skrzynki zniknie wszystko, to chyba tak, niech znika / chyba, że zapisywać daną konfigurację do odczytania i trzymać x czasu a nóż się przyda, nie wiem” (tura 11); na pytanie zamykające: „2b” (tura 12).
- Pytanie 3. Na których mapach gracz może ocenić program: tylko na rozwiązanych, gdzie stoi „Puść w pętlę”, czy na każdej mapie z listy ekranu Mapy?
  - Answer: wariant a — na każdej mapie, na którą gracz może wejść, także nierozwiązanej. Koszt pokazany przy wyborze: gracz widzi, od czego program ginie na nowej mapie, zanim zaryzykuje postać, co zdejmuje część napięcia z pierwszej próby; na mapie, na której gracz czegoś jeszcze nie odkrył, program nie ma na to reguł; czy da się ocenić mapę, która stoi w katalogu, a nie jest jeszcze otwarta, rozstrzyga zadanie 3.
  - Not chosen:
    - b — tylko na mapach rozwiązanych, tam gdzie stoi „Puść w pętlę”: „przed próbą ściany nie ma darmowego sprawdzenia programu, więc przestają być prawdziwe dwa zdania z pytań zadania 1 […]; zadanie 3 musiałoby samo otworzyć ocenę na Mateczniku”
  - Source: human, 2026-11-20, „1a - rozumiem, że to będziemy prezentować jako jakiś rodzaj podpowiedzi - hej, ta postać na tej mapie prawdopodobnie zginie tak?” — odpowiedź na pytanie pokazane jako 1 (rozmowa doprecyzowania, tura 7); jak wynik oceny stoi na ekranie, rozstrzyga pytanie 1.

### lines 155-161 (Context)

- Gra zna trzy przyczyny śmierci, `cold`, `hunger` i `combat` (`src/browser/sim/types.ts`, typ `DeathCause`), a ekran przejścia nazywa je „Mag zamarzł”, „Mag umarł z głodu” i „Mag zginął w walce” (`src/browser/view/now-lines.ts`).
- Wiersz postaci w „Kto idzie” rysuje `src/browser/view/maps-screen.tsx`, a jego zdania ostrzegawcze składa `src/browser/view/trip-lines.ts`; role części ekranu podaje reguła „The screen Mapy” styleguide'u.
- Raport z nieobecności składa `src/browser/view/away-report.ts` z wierszy typu `AwayReportLine`; pętla w stanie gry ma numer przejścia i liczbę domkniętych przejść (`src/browser/sim/types.ts`, typ `EarningLoop`, pola `runNumber` i `completed`), a ciągu przejść bez śmierci stan nie trzyma.
- Każda zmiana kształtu zapisu podnosi wersję zapisu (`src/browser/sim/saved-game.ts`, `SAVED_GAME_VERSION`, dziś 7; `guidelines/coding-saved-game.md`, reguła „Wersja podnoszona razem z kształtem”), a gra odrzuca wtedy dzisiejsze zapisy (D-206); definicja przyjmuje to dla całego projektu: „każda zmiana kształtu stanu w tym projekcie kasuje zapis”. Pamięć oceny (pytanie 2) i rekord pętli (pytanie 7) zmieniają kształt zapisu.
- Zapis gry mieści się w 64 KiB (`src/server/account-routes.ts`, `savedGameLimit`).
- Gra ma odmianę liczebników (`src/browser/view/counted-name.ts`).
- Nazwy map, zasobów i archetypów kod widoku bierze z danych, nie z własnych napisów (niezmiennik `content-identifiers`); liczby gry stoją w danych (D-18).

### lines 223-229 (Settlements to record)

| 1 | Ocenić program można na każdej mapie, na którą gracz może wejść, także nierozwiązanej, i także dla postaci, która jest w pętli albo której przejście ręczne trwa; ocena niczego w nich nie rusza. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 3; Pytanie 1 (wybory Mariusza) | czy przycisk oceny stoi na mapie nierozwiązanej i przy postaci w pętli |
| 2 | Postać wchodzi w ocenę z listą „Zabierz” programu przyciętą tym, co leży w skrzynce, udźwigiem i pułapem mapy; ze skrzynki nic nie ubywa, a dwanaście przejść startuje z tym samym. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 4 (wybór Mariusza) | czy ocena bierze wyposażenie znikąd, jak dziś ręczne przejście mapy rozwiązanej, czy według skrzynki |
| 3 | Ocena nic nie odkrywa: biegnie z tym, co gracz już odkrył, niczego nie wpisuje do Zrozumienia i nie dopisuje reguł do programu. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 9 (wybór Mariusza) | czy przejście oceny zatrzymuje grę i wpisuje odkrycie, jak przejście ręczne |
| 4 | Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa — dwanaście wyników i to, co ocena wzięła; przy liście „Program:” stoi „szczelny: 12 z 12” w `positive`, gdy ostatnia ocena rozwiązała wszystkie dwanaście ziaren, a inaczej „{n} z 12” w `text`; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; zmiana reguł, grup albo planu wyprawy programu kasuje ocenę, a śmierć, która zabiera postaci wprawę i wykupione stopnie, kasuje wszystkie oceny tej postaci, na każdej mapie. | decision | Pytanie 2; Pytanie 15; Pytanie 8 (wybory Mariusza) | co trafia do zapisu, od ilu ziaren jest odznaka, czy zmiana skrzynki gasi odznakę albo kasuje wynik, czy odznaka zostaje przy postaci, która straciła wprawę, i jak brzmią napisy przy programie |
| 5 | „Puść w pętlę” najpierw ocenia program od nowa z tym, co pętla dostanie ze skrzynki; przy dwunastu rozwiązanych ziarnach pętla rusza od razu, a gdy któreś nie jest rozwiązane, wynik staje pod postacią, nad przyciskiem staje w `warning` „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, przycisk zmienia napis na „Puść mimo to”, a pętlę puszcza drugie kliknięcie; gdy pod postacią stoi już ten sam wynik z osobnego przycisku oceny, pętla rusza od razu. | sentence of D-243 | Pytanie 1; Pytanie 14; Pytanie 8 (wybory Mariusza) | czy przycisk działa od razu z ostrzeżeniem, czy jest nieaktywny bez oceny, czy po ocenie osobnym przyciskiem gracz klika dwa razy, i jak brzmi przestroga |
| 6 | Przy każdej postaci w „Kto idzie” stoi przycisk „Oceń na 12 ziarnach” („Oceniam…” w trakcie liczenia), pod postacią rozwija się wynik — nagłówek „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”, dwanaście wierszy „Ziarno {i}: …” i zdanie „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.” — i stoi do zmiany programu, ponownej oceny albo wyjścia z karty, a przy liście „Program:” stoi odznaka albo „{n} z 12”. | sentence of D-329 | Pytanie 1; Pytanie 2; Pytanie 8 (wybory Mariusza) | gdzie na karcie stoi przycisk, wynik i odznaka, jak długo wynik zostaje na ekranie i jak brzmią jego napisy |
| 7 | Część „Kto idzie” karty mapy niesie ocenę programu. | sentence of D-325 | Pytanie 1 (wybór Mariusza) | czy opis ekranu Mapy zostaje bez oceny i rozjeżdża się z D-329 |

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 10 — the button of a judging and its result in „Kto idzie”

- **Goal:** at each character of „Kto idzie”, on each map of the list — solved or not, beside
  „Wejdź” — stands the plain shared button „Oceń na 12 ziarnach”, active also at a character in an
  earning loop or in the manual map run, going, waiting or ended (D-287 leaves it active). Its click
  draws the button disabled with „Oceniam…” first, and only then makes one call of Slice 7's act of
  a judging through the store of the game state, whose `act` catches up time before it (D-409), with
  the program the character's list „Program:” shows and the map of the card; the pick and the
  program used last stay (D-170). The result unfolds under that character: „Ocena na 12 ziarnach:
  {n} z 12 rozwiązanych”, the twelve rows „Ziarno {i}: rozwiązane”, „Ziarno {i}: mag zamarzł w {m}.
  minucie”, „Ziarno {i}: mag umarł z głodu w {m}. minucie”, „Ziarno {i}: mag zginął w walce w {m}.
  minucie”, „Ziarno {i}: bez rozstrzygnięcia po {pułap} minutach” ({pułap} from the game's data) and
  under them „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie
  zabiera wprawy ani wskrzeszenia.”, in the roles the styleguide gives (Slice 9); the result lives
  only in the screen's own state (D-407), and stands until another program is picked on that
  character's list, a new judging, or the player leaves the card — another map of the list, another
  screen, a reload. At the list „Program:” stands the mark of the remembered judging of the program
  the list shows (Slice 7's mark): „szczelny: 12 z 12”, or „{n} z 12”, with „oceniono z zapasem,
  którego dziś nie ma w skrzynce” where the chest lacks what the judging took, then with no badge,
  „12 z 12” standing with the note; no mark where that program has no remembered judging, and none
  on other screens. The texts stand in a pure module `src/browser/view/judging-lines.ts`, the result
  under the character in `src/browser/view/judging-result.tsx`, its look in
  `src/browser/maps-screen.css` through tokens; names of maps and items come from the data
  (`content-identifiers`). The focus does not fall to the page when the button turns disabled and
  back (styleguide, "Focus does not fall to the page"). „Puść w pętlę” is not changed here (Slice
  11). The failing tests come first: `tests/view/judging-lines.test.mjs` for the texts and cases of
  `tests/view/maps-screen.test.mjs` for the button, the waiting state drawn before the result, the
  result's life and the mark; a case of that file that the new button makes untrue follows only with
  its reason, and a line `decision:` quoting a passage of D-329 or D-325 the Foundation entries
  changed follows the new passage. Read `src/browser/sim/judging.ts` and
  `src/browser/sim/judging-record.ts`, which Slices 3 and 7 wrote.
- **Change:** `src/browser/view/maps-screen.tsx` · `src/browser/view/maps-entry.ts` ·
  `src/browser/view/judging-lines.ts` · `src/browser/view/judging-result.tsx` ·
  `src/browser/maps-screen.css` · `tests/view/maps-screen.test.mjs` ·
  `tests/view/judging-lines.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:33-45` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:56-76` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:155-161` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:223-229` Settlements to record ·
  Foundation entries row 1 · Foundation entries row 2 · Foundation entries row 4 · Foundation
  entries row 5 · `foundations/decisions.md:9885-9905` D-329 · `foundations/decisions.md:9798-9818`
  D-325 · `foundations/decisions.md:8204-8221` D-170 · `foundations/decisions.md:9032-9046` D-409 ·
  `foundations/decisions.md:4744-4760` D-407 · `foundations/decisions.md:3934-4013` D-207 ·
  `foundations/decisions.md:6304-6325` D-217 · `foundations/decisions.md:8769-8790` D-244 · `foundations/decisions.md:4993-5009` D-44 ·
  `foundations/decisions.md:10149-10184` D-287 · `foundations/decisions.md:290-315` D-18 ·
  `foundations/invariants.md:236-247` content-identifiers · `foundations/invariants.md:478-487`
  browser-view-token-values · `foundations/part_map.md:3-31` browser-view · `guidelines/coding.md`
  · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/view/state-store.ts` ·
  `src/browser/view/trip-lines.ts` · `src/browser/view/now-lines.ts` ·
  `src/browser/view/counted-name.ts` · `src/browser/sim/data/balance.ts`
- **Model:** same — a screen state that draws the waiting button before one synchronous call of the
  simulation, and a result that lives with the card, need care with React's drawing and the focus.
- **Risk:** none
- **Checks:** `npm test -- tests/view/judging-lines.test.mjs` (written first, failing) ·
  `npm test -- tests/view/maps-screen.test.mjs` · `npm test -- tests/view/shared-controls.test.mjs`
  · `npm test -- tests/view/screen-registry.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py`
- **Depends on:** Slice 7 · Slice 9 · Foundation entries row 4 · row 5

## Notes of the orchestrator for this slice

- Slices 3–9 are made and reviewed. Read, as they stand: `src/browser/sim/judging.ts` (`judgeOnSeeds` and the act of a judging that slice 7 added — find it by its exports), `src/browser/sim/judging-record.ts` (the mark of a program at a character on a map: count solved, all twelve, whether the chest still holds each item at the count the judging took), the types `Judging`, `SeedResult`, `RememberedJudging` in `types.ts`, `BALANCE.judgingCapMinutes` in `data/balance.ts`, and the styleguide's rule „The screen Mapy” as slice 9 wrote it (roles: `text-strong` heading, `positive` solved row, `danger` death row, `warning` undecided row, `text-secondary` sentence, `positive` badge „szczelny: 12 z 12”, `text` „{n} z 12”, `warning` note of the stock).
- The two quotations `decision: D-243` in `tests/view/maps-screen.test.mjs` (lines 494 and 700) no longer stand: shorten each to a passage of D-243 that stands now, without changing the case. Quote every new `// decision:` line word for word from the beginning of a sentence of a binding sentence (the foundation check stops at the first field line of an entry); run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: your files show no error (remaining: the three D-243 quotations of `tests/view/account-screen.test.mjs`, owned by slice 12).
- Screenshots: `change/ui_check.md` asks for an inspected screenshot; the foundation settles a public place for those and the cycle's final walk through the running game makes and publishes them. You: check the states in code (the loading state, the three row kinds, the badge with and without the note, the result's life) and inspect your own screenshot of the running game as `.claude/skills/loop2-play/SKILL.md` gives, **push none, keep none** — remove it with your directory before you return and say in the report that the screenshot was inspected and not kept; use a browser of your own and close it (WAY-319).
- A new test file under `tests/view/` needs no `stryker.config.json` entry unless `tests/quality/test_mutation_test_selection.py` says so; run that check once at the end and add what it asks (name any addition in the report).
- The rule of the pure texts module: the texts live in `src/browser/view/judging-lines.ts`; names of maps and items come from the data (`content-identifiers`); no literal id of a map or item in the view.
- The second click of „Puść w pętlę” is slice 11's; do not change that button here.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
