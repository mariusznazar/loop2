# Handoff — review `rg`, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Questions go to the orchestrator, never to the human.

## What is reviewed

- Worktree: `.` (branch `task/ocena-programu-na-ziarnach`); you are read-only there and make no commit. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Read it whole, and a file it names only when the step or variant that names the file comes.
- Review: a group of the cycle's slices, in the plan's order — slice(s) 3, 7, 8, 9. **Range to review: `afac5cd0..3218a620`** (base exclusive, head inclusive; head `3218a620`). Check the head with `git rev-parse` first; on a mismatch ask the orchestrator which range to review.
- The change is a member of a plan; the plan's sections for what you review are copied below word for word, and the passages of the frozen task that those sections' *Read* name (the frozen task is `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; open it if a passage points you to more). You judge the work against those passages and the foundation entries the sections name, not against the plan's wording.
- Two answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; check crafted input at that boundary wherever the range touches it (say so in the report if the range does not). Irreversible operation **no**: confirm that the change only prepares what it prepares.
- Executors' and writer's reports (each in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/`): `slice-03-executor-report.md`, `slice-07-executor-report.md`, `slice-08-executor-report.md`, `slice-09-executor-report.md`. Read each; they hold the own-work checks, reaches, concerns and unread material. A check an author reports is evidence of what the author ran, never of the result.
- Mechanical checks the orchestrator ran: clean worktree, non-empty range, changed files equal the slices' *Change*. Any mismatch is given below under notes.
- No agent of the cycle runs the product's full gate; **you do not run `npm test` without a file argument or the whole `tests/`**. Run the focused checks of the slices you review, and probes of your own, from a worktree of the head commit in your own directory.
- Your directory for working copies: `.runs/review-rg/` (directly under the ignored `.runs/` of the worktree) — make a detached worktree of `3218a620` there (`git worktree add --detach .runs/review-rg/wt 3218a620`), run `npm ci` in it if you run Node tests, and run checks there, not in the cycle's worktree (another agent may be writing there). Remove it before you return, as the paragraph below gives.
- Your report path (its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rg-report.md`; its first line is `PASS 3218a620` or `FAIL 3218a620` (or `questions`).
- `cycle.md` and the other files of the record directory not named above are not yours to read.
- Settle each blocking finding's contradiction mark, and for the range's slices the slice it comes from, as `review-change` gives.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Passages of the frozen task

### lines 31-33

1. Gra ocenia program postaci na mapie: puszcza go na dwunastu stałych ziarnach tej mapy, za każdym razem tych samych; każde z dwunastu przejść trwa od wejścia na mapę do rozwiązania mapy, śmierci postaci albo pułapu minut gry. Pułap jest jedną liczbą w danych gry i zaczyna od 4000 (pytanie 5). Ziarnami oceny są liczby od 1 do 12, te same na każdej mapie, dla każdego programu i każdej postaci, zapisane w danych gry obok pułapu. Przejście, które rozwiązuje mapę albo kończy się śmiercią dokładnie w minucie pułapu, liczy się jako rozwiązane albo jako śmierć; bez rozstrzygnięcia jest tylko przejście, które w minucie pułapu dalej trwa — jak w przyrządzie (`balance/engine.mjs`, `runOnce`).
2. Ocena nie jest przejściem postaci: nie bierze nic ze skrzynki, nic nie płaci — ani wprawy, ani łupu — i nie rozlicza śmierci, więc nie zużywa wskrzeszenia i nie zabiera postaci wprawy ani wykupionych stopni; przejście ręczne i pętle zarobkowe, które trwają, są po ocenie takie, jakie były. Postać wchodzi w ocenę z tym, co pętla dostałaby w tej chwili: z listą „Zabierz” programu przyciętą tym, co naprawdę leży w skrzynce, udźwigiem postaci i pułapem mapy; ze skrzynki nic nie ubywa, a wszystkie dwanaście przejść startuje z tym samym wyposażeniem (pytanie 4). Ocena nic nie odkrywa: biegnie z tym, co gracz już odkrył, niczego nie wpisuje do Zrozumienia i nie dopisuje reguł do programu (pytanie 9).
3. Gracz czyta wynik ziarno po ziarnie, w dwunastu wierszach. Każdy wiersz mówi jedno z trzech: rozwiązane; śmierć z przyczyną i minutą gry; albo bez rozstrzygnięcia, gdy przejście doszło do pułapu, a program ani nie rozwiązał mapy, ani nie zginął. Wiersz bez rozstrzygnięcia nie liczy się jako rozwiązany (pytanie 5). Wynik nie pokazuje minuty pierwszego ognia, tego, co leżało na kafelku wejściowym, ani zdania o tym, co łączy porażki (pytanie o uproszczenie oceny, niżej).

### lines 32-36

2. Ocena nie jest przejściem postaci: nie bierze nic ze skrzynki, nic nie płaci — ani wprawy, ani łupu — i nie rozlicza śmierci, więc nie zużywa wskrzeszenia i nie zabiera postaci wprawy ani wykupionych stopni; przejście ręczne i pętle zarobkowe, które trwają, są po ocenie takie, jakie były. Postać wchodzi w ocenę z tym, co pętla dostałaby w tej chwili: z listą „Zabierz” programu przyciętą tym, co naprawdę leży w skrzynce, udźwigiem postaci i pułapem mapy; ze skrzynki nic nie ubywa, a wszystkie dwanaście przejść startuje z tym samym wyposażeniem (pytanie 4). Ocena nic nie odkrywa: biegnie z tym, co gracz już odkrył, niczego nie wpisuje do Zrozumienia i nie dopisuje reguł do programu (pytanie 9).
3. Gracz czyta wynik ziarno po ziarnie, w dwunastu wierszach. Każdy wiersz mówi jedno z trzech: rozwiązane; śmierć z przyczyną i minutą gry; albo bez rozstrzygnięcia, gdy przejście doszło do pułapu, a program ani nie rozwiązał mapy, ani nie zginął. Wiersz bez rozstrzygnięcia nie liczy się jako rozwiązany (pytanie 5). Wynik nie pokazuje minuty pierwszego ognia, tego, co leżało na kafelku wejściowym, ani zdania o tym, co łączy porażki (pytanie o uproszczenie oceny, niżej).
4. W części „Kto idzie” karty mapy, przy każdej postaci, stoi przycisk oceny — na każdej mapie, na którą gracz może wejść, także nierozwiązanej, gdzie stoi obok „Wejdź”. Ocenia program z listy „Program:” tej postaci na mapie tej karty. Wynik rozwija się pod tą postacią i stoi, dopóki gracz nie wybierze innego programu, nie oceni ponownie albo nie wyjdzie z karty. Ocenić można też program postaci, która jest w pętli albo której przejście ręczne trwa, bo ocena niczego w nich nie rusza (pytania 1 i 3). Wyjście z karty to wybór innej mapy z listy, przejście na inny ekran albo przeładowanie strony; przyczyna i minuta wierszy żyją tylko w widoku, nie w zapisie. Ocena nie jest wysłaniem postaci: nie zmienia programu „użytego ostatnio” i nie czyści wyboru na liście „Program:” (D-170, D-243). Ocena idzie przez magazyn stanu gry, który przed nią dolicza czas (D-409), a dwanaście przejść liczy jedno wywołanie symulacji. Przycisk oceny od kliknięcia do wyniku jest wyłączony i ma napis „Oceniam…” (pytanie 8), więc ekran rysuje ten stan, zanim to wywołanie ruszy; „Puść w pętlę” na czas swojej oceny napisu nie zmienia.
5. „Puść w pętlę” zawsze najpierw ocenia program od nowa, z tym, co pętla dostanie ze skrzynki w tej chwili. Gdy wszystkie dwanaście ziaren jest rozwiązanych, pętla rusza od razu. Gdy któreś nie jest, wynik staje pod postacią, nad przyciskiem staje zdanie o liczbie ziaren nierozwiązanych, przycisk zmienia napis na „Puść mimo to”, a pętlę puszcza dopiero drugie kliknięcie. Nowa ocena zastępuje zapamiętaną (pytanie 1). Gdy pod postacią stoi już wynik z porażką, pokazany wcześniej osobnym przyciskiem oceny, „Puść w pętlę” też ocenia od nowa: gdy nowy wynik jest taki sam jak ten, który stoi — każde z dwunastu ziaren z tym samym wierszem — pętla rusza od razu; gdy jest inny, bo od tamtej oceny zmieniła się skrzynka albo postać, nowy wynik zastępuje stary i czeka na drugie kliknięcie (pytanie 14).
6. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa: dwanaście wyników ziaren i to, co ocena wzięła ze skrzynki na wejście; przyczynę i minutę wiersza widać tylko zaraz po ocenie. Odznakę szczelności ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; gdy w skrzynce jest tego więcej, wynik stoi jak był. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę, a następna ocena ją zastępuje; limitu czasu nie ma (pytanie 2). Przy liście „Program:” stoi zapamiętany wynik programu, który lista pokazuje, i zmienia się razem z wyborem; inne programy listy nie mają znaku. Gdy ocena 12 z 12 straciła zapas, stoi tam „12 z 12” z dopiskiem, bez odznaki. Odznaka i liczba stoją tylko w „Kto idzie”, nie na innych ekranach. Kasuje zapisanie programu, po którym jego reguły, grupy (z ich kolejnością) albo plan wyprawy są inne; zmiana nazwy niczego nie kasuje. Usunięcie programu usuwa jego zapamiętane oceny, a wczytanie zapisu odrzuca cały zapis, gdy zapamiętana ocena nazywa postać, program albo mapę, których gra nie dała (D-165, D-206). Zmiana pułapu albo danych mapy zapamiętanych ocen nie kasuje. Śmierć postaci, która zabiera jej wprawę i wykupione stopnie, bo żadne wskrzeszenie nie jest gotowe (D-190), w przejściu ręcznym albo w pętli, kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie (pytanie 15); śmierć pokryta wskrzeszeniem i wykupienie stopnia ocen nie kasują. Cykl sprawdza, ile miejsca zajmują zapamiętane oceny w zapisie z wieloma postaciami, programami i mapami, wobec limitu zapisu 64 KiB.

### lines 38-45

8. Napisy, które gracz czyta przy ocenie, odznace, drugim kliknięciu „Puść w pętlę” i rekordzie pętli, słowo w słowo (pytanie 8); {i} to numer ziarna, {n}, {k} i {m} to liczby, {pułap} to pułap minut z danych gry:
   - przycisk oceny przy postaci: „Oceń na 12 ziarnach”; w trakcie liczenia: „Oceniam…”;
   - nagłówek wyniku: „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”;
   - wiersze: „Ziarno {i}: rozwiązane”, „Ziarno {i}: mag zamarzł w {m}. minucie”, „Ziarno {i}: mag umarł z głodu w {m}. minucie”, „Ziarno {i}: mag zginął w walce w {m}. minucie”, „Ziarno {i}: bez rozstrzygnięcia po {pułap} minutach”;
   - pod wierszami, w `text-secondary`: „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.”;
   - przy liście „Program:”: „szczelny: 12 z 12” w `positive`, a przy niższym wyniku „{n} z 12” w `text`; dopisek, gdy skrzynka nie ma już tego, co ocena wzięła: „oceniono z zapasem, którego dziś nie ma w skrzynce” (pytanie 2);
   - po pierwszym kliknięciu „Puść w pętlę”, gdy któreś ziarno nie jest rozwiązane: nad przyciskiem, w `warning`, „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, a przycisk zmienia napis na „Puść mimo to”;
   - na końcu wiersza postaci w „Gdy cię nie było”: „ · najdłużej bez śmierci: {n} przejść z rzędu”, z odmianą „1 przejście”, „3 przejścia”, „5 przejść”.

### lines 49-49

10. Styleguide widoku (`guidelines/styleguide-browser-view.md`) idzie za zmianą: reguła „The screen Mapy”, albo nowa reguła obok niej, podaje role części wyniku oceny, odznaki, dopisku o zapasie i tego, co stoi przed drugim kliknięciem „Puść w pętlę”: nagłówek wyniku w `text-strong` (wartość, na którą patrzy się najpierw), wiersz rozwiązany w `positive`, wiersz śmierci w `danger` (w pętli taka śmierć grozi utratą postaci), wiersz bez rozstrzygnięcia w `warning` (mapa nie zostanie rozwiązana), zdanie pod wierszami w `text-secondary`, odznaka „szczelny: 12 z 12” w `positive`, „{n} z 12” w `text`, dopisek o zapasie w `warning`, jak ostrzeżenie D-251, zdanie przed drugim kliknięciem w `warning`; przycisk oceny i „Puść w pętlę” (także jako „Puść mimo to”) to zwykłe wspólne przyciski. Każda z tych ról stoi w znaczeniu z tabeli Roles styleguide'u, więc żadna nie wymaga nowej decyzji o roli. Reguła „States of shared controls” mówi dziś, że stan loading dotyczy przycisku, który czeka na odpowiedź serwera; dostaje przycisk oceny, który na czas liczenia oceny jest wyłączony i zmienia napis na „Oceniam…”, choć na serwer nie czeka.

### lines 50-50

11. Przyrząd balansu bierze domyślny pułap minut przejścia ze zbudowanej gry, z danych, do których pułap wnosi *To do* 1, zamiast własnej liczby 4000. Liczba stoi w przyrządzie w jednym miejscu, w `balance/engine.mjs`: „/** A map run still open after this many game minutes ends as a run at the cap. */ export const DEFAULT_CAP_MINUTES = 4000;”, a `balance/trace.mjs` i `balance/campaign.mjs` importują ją stamtąd; zmiana stoi w tym pliku, a te dwa pliki dalej biorą pułap z jednego miejsca. Plik należy do rodzaju kodu `balance-instrument` i jest jego wzorcem (D-437); obowiązują go wytyczne `guidelines/coding-balance-instrument.md`, w tym reguły „Liczba gry” („Przyrząd nie trzyma własnej kopii liczby gry, tylko bierze ją ze zbudowanej gry.”) i „Jedno miejsce wspólnej rzeczy” (pytanie 16). Wynika to z odpowiedzi na pytanie 5 i z reguły zadania 23, że przyrząd nie trzyma własnej kopii liczby gry (zob. *Context*).

### lines 63-71

- Pytanie 2. Co gra pamięta z oceny i kiedy daje odznakę szczelności — przy jakim wyniku na dwunastu ziarnach, przy czym odznaka stoi i co ją kasuje?
  - Answer: wariant a, z dopytaniem o zmianę skrzynki rozstrzygniętym wariantem b. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa (wiersz w „Kto idzie” to taka trójka) jako dwanaście wyników ziaren, razem z tym, co ocena wzięła ze skrzynki; przyczynę, minuty i resztę wiersza widać tylko zaraz po ocenie. Odznakę ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę. Gdy w skrzynce jest więcej tego, co ocena wzięła, wynik stoi; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie. Limitu czasu nie ma: następna ocena nadpisuje wynik. Koszt pokazany przy wyborze: dzisiejsze zapisy przepadają przy wdrożeniu (definicja przyjmuje to dla całego projektu); zapamiętany wynik starzeje się po cichu, gdy postać wykupi stopień; jeden dodatkowy stan wyniku na ekranie (dopisek o zapasie); dla zadania 3 karta mapy ma zapamiętany wynik każdej ocenionej postaci i programu.
  - Not chosen:
    - b — gra pamięta ocenę pary program i mapa, bez postaci: „mniej stanu, ale odznaka przy jednej postaci może pochodzić z oceny inną postacią, z innymi wykupionymi stopniami”
    - c — odznaka już od 11 z 12: „odznakę ma program, który na jednym z dwunastu ziaren mapy nie rozwiązuje; pętla losuje kolejne ziarna, więc na podobne trafi; liczbę 11 propozycja sama oznacza jako zgadywaną”
    - d — gra niczego nie pamięta: „gra nie wie, który program był oceniany, więc […] nie ma ani ostrzeżenia „program bez oceny”, ani pamięci, że program już przeszedł, i po każdym powrocie na kartę ocenia się od nowa; karta mapy w zadaniu 3 nie ma zapamiętanego wyniku do pokazania”
    - dopytanie, a — wynik znika, gdy skrzynka nie da już tego, co ocena wzięła: „tracisz informację, jak program radził sobie z tamtym zapasem”
    - pomysł Mariusza z dopytania — trzymać zapisaną konfigurację „x czasu”: nieprzyjęty, bo następna ocena i tak nadpisuje wynik, a zmiana programu go kasuje (pytanie zamykające prowadzącego projekt, wariant b: „Bez limitu czasu”)
  - Source: human, 2026-11-20, „3. niech będzie a - tu rozumiem to będzie po prostu służyć jako cache, żeby nie przeliczać wszystkiego jeśli mamy już wartości policzone, czy czemuś innemu to miałoby służyć?” (pytanie pokazane jako 3, rozmowa doprecyzowania, tura 7); na dopytanie o zmianę skrzynki: „3. jeśli w skrzynce będzie więcej tego co już tam było wymagane to czemu miałaby znikać / ale jeśli nagle ze skrzynki zniknie wszystko, to chyba tak, niech znika / chyba, że zapisywać daną konfigurację do odczytania i trzymać x czasu a nóż się przyda, nie wiem” (tura 11); na pytanie zamykające: „2b” (tura 12).

### lines 77-89

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

### lines 102-107

- Pytanie 8. Jak brzmią napisy oceny, odznaki, drugiego kliknięcia „Puść w pętlę” i rekordu pętli?
  - Answer: wariant a — przyjmuję propozycję w całości: przycisk „Oceń na 12 ziarnach”, w trakcie liczenia „Oceniam…”; nagłówek „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”; wiersze „Ziarno {i}: rozwiązane”, „Ziarno {i}: mag zamarzł w {m}. minucie”, „Ziarno {i}: mag umarł z głodu w {m}. minucie”, „Ziarno {i}: mag zginął w walce w {m}. minucie”, „Ziarno {i}: bez rozstrzygnięcia po {pułap} minutach”; pod wierszami, szarym tekstem, „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.”; przy liście „Program:” „szczelny: 12 z 12” w kolorze powodzenia, a przy niższym wyniku „{n} z 12” zwykłym tekstem; po pierwszym kliknięciu „Puść w pętlę”, gdy któreś ziarno nie jest rozwiązane, nad przyciskiem w kolorze ostrzeżenia „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, a przycisk zmienia napis na „Puść mimo to”; na końcu wiersza postaci w „Gdy cię nie było” „ · najdłużej bez śmierci: {n} przejść z rzędu”, z odmianą „1 przejście”, „3 przejścia”, „5 przejść”. Dopisek „oceniono z zapasem, którego dziś nie ma w skrzynce” był już wybrany w pytaniu 2. Koszt pokazany przy wyborze: słowo „ziarno” gracz zobaczy w grze pierwszy raz tu i nic mu go nie wyjaśnia, dopóki nie zrobi tego samouczek (zadanie 22); cofnięcie później to małe osobne zadanie — napisy staną w kodzie ekranu, w testach i w cytatach wpisów fundamentu. Słabe miejsce pokazane przy wyborze: „12 prób” zrozumiałby każdy gracz bez samouczka, ale „próba” w grze znaczy już ręczne przejście (ostrzeżenie pod „Wejdź”: „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.”).
  - Not chosen:
    - b — przyjmuję z poprawkami, które wskażę: „jeden obieg poprawki przed dalszym krokiem”
    - c — zostawiam napisy agentom, którzy zrobią zadanie: „zobaczysz je dopiero w prośbie o scalenie, a poprawka będzie wtedy poprawką kodu, testów i wpisów fundamentu”
  - Source: human, 2026-11-20, przez pełnomocnika, którego wskazał — wiadomość „doradcy dnia” (sesji doradcy dnia Mariusza), która mówi, że Mariusz o 16:32 przekazał mu dokończenie decyzji tej rundy i że odpowiada w jego imieniu; słowa dla tego zadania: „2: 1a, dopiski ok, 14b, 15b, reszta ok” — „1a” to pytanie pokazane jako 1, czyli to (rozmowa doprecyzowania `.runs/project-refinement/ocena-programu-na-ziarnach.md`, tura 27; pytanie w brzmieniu tury 24).

### lines 108-112

- Pytanie 9. Czy przejście oceny coś odkrywa, czyli wpisuje do Zrozumienia albo dopisuje regułę do programu?
  - Answer: wariant a — Mariusz potwierdził odczytanie: ocena nic nie odkrywa; biegnie z tym, co gracz już odkrył, niczego nie wpisuje do Zrozumienia i nie dopisuje reguł do programu. Odczytanie stało na dwóch zdaniach: zatwierdzonym wpisie definicji „Such a judging is no map run of the character: it takes nothing from the chest, pays nothing and settles no death.” i D-249 „A map run of an earning loop discovers nothing: the Understanding and the program stay as they stand […] and the player discovers what the character met in a manual map run.” Koszt pokazany przy wyborze: na mapie, na której gracz czegoś jeszcze nie odkrył, program nie ma na to reguł i ocena pokaże porażki, których ręczne przejście z odkryciami mogłoby uniknąć — dotyczy map jeszcze nierozwiązanych, na których ocenę też można puścić.
  - Not chosen:
    - b — skreślam odczytanie, ocena odkrywa jak przejście ręczne: „odkrycia bez ryzyka i bez zatrzymania gry, po dwanaście przejść naraz. Zmienia D-249 […] wymaga zmiany tego wpisu, a zmiana wpisu zatwierdzonej definicji wraca do jej ponownego zatwierdzenia”
  - Source: human, 2026-11-20 — przy pytaniu pokazanym jako 11: „do pozostałych nie mam uwag”, a na prośbę o potwierdzenie, że to przyjęcie rekomendacji (wśród nich „11 a”): „3. dobrze zrozumiałeś” (rozmowa doprecyzowania, tury 13 i 14; pytanie w brzmieniu tury 10).

### lines 119-124

- Pytanie 15. Czy zapamiętane oceny postaci zostają, gdy jej śmierć przy braku gotowego wskrzeszenia zabiera całą wprawę i wykupione stopnie?
  - Answer: wariant b — taka śmierć kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie. Powód pełnomocnika: „odznaka nie może kłamać po utracie wprawy”. Koszt pokazany przy wyborze: gracz traci informację, jak programy radziły sobie z postacią sprzed śmierci; jedno miejsce więcej w kodzie, które kasuje oceny; cofnięcie później małe. Słabe miejsce pokazane przy wyborze: wykupiony stopień dalej postarza wynik po cichu, więc reguła nie jest symetryczna.
  - Not chosen:
    - a — oceny zostają, jak przy wykupieniu stopnia: „przy postaci, która właśnie straciła wszystko, dalej może stać „szczelny: 12 z 12” aż do następnej oceny — odznaka kłamie w najgorszej chwili”
    - c — oceny zostają z dopiskiem, na przykład „oceniono przed utratą wprawy”, a odznaki gasną: „drugi dopisek i jeszcze jeden stan wyniku na ekranie; jego napis trzeba by ustalić razem z pozostałymi napisami”
  - Source: human, 2026-11-20, przez pełnomocnika — wiadomość „doradcy dnia”, jak przy pytaniu 8: „2: 1a, dopiski ok, 14b, 15b, reszta ok” i uzasadnienie „2.15 b, bo odznaka nie może kłamać po utracie wprawy” (rozmowa doprecyzowania, tura 27; pytanie pokazane jako 15, w brzmieniu tury 26).

### lines 125-127

- Pytanie 16. Jaki rodzaj kodu i jaki plik-wzorzec obowiązują plik przyrządu balansu w `balance/`, który to zadanie zmienia w *To do* 11, i w którym pliku stoi pułap 4000 po zadaniu 23? Testów w `tests/balance/` pytanie nie dotyczy: zasady testów stoją w `guidelines/testing.md`, które obejmuje część `balance-tools`.
  - Answer: rodzaj `balance-instrument`, wytyczne `guidelines/coding-balance-instrument.md`, wzorzec `balance/engine.mjs` (D-437); pułap stoi po zadaniu 23 tylko w `balance/engine.mjs`, jako eksportowana stała `DEFAULT_CAP_MINUTES`, z której biorą go `balance/trace.mjs` i `balance/campaign.mjs`, więc *To do* 11 zmienia `balance/engine.mjs`. Pytanie nie było wyborem człowieka, więc nie ma wariantów niewybranych.
  - Source: zadanie 23 planu, scalone 2026-11-20 (PR #164, commit scalenia `fec2ae7e` na `origin/main`), cytaty z tego commitu: `guidelines/coding.md`, „Kinds of code”: „| balance-instrument | `guidelines/coding-balance-instrument.md` | Przed dodaniem lub zmianą pliku kodu przyrządu balansu w `balance/`. |”; `guidelines/coding-balance-instrument.md`, „Files of this kind”: „| `balance/engine.mjs` | exemplar | D-437 |”; D-437: „The exemplar for kind `balance-instrument` is `balance/engine.mjs`, and its kind guidelines are read before adding or changing a file of that kind”. Fakt z kodu, osobno: `balance/engine.mjs:31` — `export const DEFAULT_CAP_MINUTES = 4000;`; `balance/trace.mjs:14` i `balance/campaign.mjs:56` importują `DEFAULT_CAP_MINUTES`; innego wystąpienia 4000 w `balance/` nie ma.

### lines 145-149

- Symulacja ma już wszystko, czym liczy się jedno przejście: `newMapRun`, `stepMinute` i `mapRunEnded` w `src/browser/sim/run.ts`; przejście pętli zarobkowej biegnie nimi bez odkryć i bez zatrzymań (`src/browser/sim/loop.ts`, `advanceLoopRun`).
- Wyposażenie na wejściu liczą funkcje w `src/browser/sim/trip.ts`: `sendTake` przycina listę „Zabierz” zawartością skrzynki, udźwigiem i pułapem mapy, a `takeTrip` do tego zdejmuje sztuki ze skrzynki (stan przy `77a612cb`; zadanie 24 zmienia regułę ręcznego przejścia mapy rozwiązanej, więc funkcje „znikąd” mogą po nim wyglądać inaczej).
- Przyrząd balansu kończy przejście jako `solved`, `death` albo `cap`, z przyczyną i minutą, a przejście, które po 4000 minut gry trwa dalej, kończy jako `cap` (`balance/engine.mjs`, `runOnce` i `DEFAULT_CAP_MINUTES`); przyrząd puszcza zbudowaną symulację gry, a niezmiennik `instrument-game-agreement` trzyma zgodność jego przejścia z przejściem gry.
- Pułap a przyrząd: zadanie 23 (wzorzec kodu przyrządu) przyjęło regułę, że przyrząd nie trzyma własnej kopii liczby gry (tamto pytanie 2, wariant a), i usunęło powtórzenia liczb między plikami przyrządu, w tym 4000 z trzech plików (tamto pytanie 3, wariant c) — Mariusz, 2026-11-20, „ok dla wszystkich dotychczas” (`.runs/project-refinement/wzorzec-kodu-przyrzadu.md`, tura 10; dokument `a note in the author's private notes`). Zadanie 23 jest scalone (PR #164, `fec2ae7e`): reguła stoi w `guidelines/coding-balance-instrument.md` jako „Liczba gry”, a 4000 tylko w `balance/engine.mjs`. Gdy to zadanie wnosi pułap do danych gry, 4000 w przyrządzie staje się kopią liczby gry, stąd *To do* 11.
- Ziarna 1–12 w danych gry: przyrząd balansu odtwarza wtedy ocenę z gry poleceniem `sweep` z `--seeds 1-12`, a symulacja nie potrzebuje drugiego miejsca, które wyprowadza ziarna z generatora (niezmiennik `simulation-randomness`).

### lines 147-149

- Przyrząd balansu kończy przejście jako `solved`, `death` albo `cap`, z przyczyną i minutą, a przejście, które po 4000 minut gry trwa dalej, kończy jako `cap` (`balance/engine.mjs`, `runOnce` i `DEFAULT_CAP_MINUTES`); przyrząd puszcza zbudowaną symulację gry, a niezmiennik `instrument-game-agreement` trzyma zgodność jego przejścia z przejściem gry.
- Pułap a przyrząd: zadanie 23 (wzorzec kodu przyrządu) przyjęło regułę, że przyrząd nie trzyma własnej kopii liczby gry (tamto pytanie 2, wariant a), i usunęło powtórzenia liczb między plikami przyrządu, w tym 4000 z trzech plików (tamto pytanie 3, wariant c) — Mariusz, 2026-11-20, „ok dla wszystkich dotychczas” (`.runs/project-refinement/wzorzec-kodu-przyrzadu.md`, tura 10; dokument `a note in the author's private notes`). Zadanie 23 jest scalone (PR #164, `fec2ae7e`): reguła stoi w `guidelines/coding-balance-instrument.md` jako „Liczba gry”, a 4000 tylko w `balance/engine.mjs`. Gdy to zadanie wnosi pułap do danych gry, 4000 w przyrządzie staje się kopią liczby gry, stąd *To do* 11.
- Ziarna 1–12 w danych gry: przyrząd balansu odtwarza wtedy ocenę z gry poleceniem `sweep` z `--seeds 1-12`, a symulacja nie potrzebuje drugiego miejsca, które wyprowadza ziarna z generatora (niezmiennik `simulation-randomness`).

### lines 154-155

- Dwanaście przejść jednego programu liczy przyrząd balansu na komputerze autora w około 0,2 sekundy razem z uruchomieniem (pomiar refinera, 2026-11-20, `sweep` na ziarnach 1–12: Las z `forestNaive` i `forestDecent`, „Las — głębiej” z `forestBest`; żadne z tych przejść nie doszło do 4000 minut); w przeglądarce nie mierzone. Drugi pomiar, przy sprawdzaniu listy decyzji zostawionych wykonawcy: na trzech mapach z 23 programami przyrządu 5–170 ms dla dwunastu przejść, także gdy 11 z 12 przejść doszło do pułapu (passa Skraju lasu podniesiona w pamięci do 100000); Node 24, bez przeglądarki i bez słabego urządzenia.
- Gra zna trzy przyczyny śmierci, `cold`, `hunger` i `combat` (`src/browser/sim/types.ts`, typ `DeathCause`), a ekran przejścia nazywa je „Mag zamarzł”, „Mag umarł z głodu” i „Mag zginął w walce” (`src/browser/view/now-lines.ts`).

### lines 223-225

| 1 | Ocenić program można na każdej mapie, na którą gracz może wejść, także nierozwiązanej, i także dla postaci, która jest w pętli albo której przejście ręczne trwa; ocena niczego w nich nie rusza. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 3; Pytanie 1 (wybory Mariusza) | czy przycisk oceny stoi na mapie nierozwiązanej i przy postaci w pętli |
| 2 | Postać wchodzi w ocenę z listą „Zabierz” programu przyciętą tym, co leży w skrzynce, udźwigiem i pułapem mapy; ze skrzynki nic nie ubywa, a dwanaście przejść startuje z tym samym. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 4 (wybór Mariusza) | czy ocena bierze wyposażenie znikąd, jak dziś ręczne przejście mapy rozwiązanej, czy według skrzynki |
| 3 | Ocena nic nie odkrywa: biegnie z tym, co gracz już odkrył, niczego nie wpisuje do Zrozumienia i nie dopisuje reguł do programu. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 9 (wybór Mariusza) | czy przejście oceny zatrzymuje grę i wpisuje odkrycie, jak przejście ręczne |

### lines 223-226

| 1 | Ocenić program można na każdej mapie, na którą gracz może wejść, także nierozwiązanej, i także dla postaci, która jest w pętli albo której przejście ręczne trwa; ocena niczego w nich nie rusza. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 3; Pytanie 1 (wybory Mariusza) | czy przycisk oceny stoi na mapie nierozwiązanej i przy postaci w pętli |
| 2 | Postać wchodzi w ocenę z listą „Zabierz” programu przyciętą tym, co leży w skrzynce, udźwigiem i pułapem mapy; ze skrzynki nic nie ubywa, a dwanaście przejść startuje z tym samym. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 4 (wybór Mariusza) | czy ocena bierze wyposażenie znikąd, jak dziś ręczne przejście mapy rozwiązanej, czy według skrzynki |
| 3 | Ocena nic nie odkrywa: biegnie z tym, co gracz już odkrył, niczego nie wpisuje do Zrozumienia i nie dopisuje reguł do programu. | sentence of (new) — How does the game judge a program before an earning loop? | Pytanie 9 (wybór Mariusza) | czy przejście oceny zatrzymuje grę i wpisuje odkrycie, jak przejście ręczne |
| 4 | Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa — dwanaście wyników i to, co ocena wzięła; przy liście „Program:” stoi „szczelny: 12 z 12” w `positive`, gdy ostatnia ocena rozwiązała wszystkie dwanaście ziaren, a inaczej „{n} z 12” w `text`; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; zmiana reguł, grup albo planu wyprawy programu kasuje ocenę, a śmierć, która zabiera postaci wprawę i wykupione stopnie, kasuje wszystkie oceny tej postaci, na każdej mapie. | decision | Pytanie 2; Pytanie 15; Pytanie 8 (wybory Mariusza) | co trafia do zapisu, od ilu ziaren jest odznaka, czy zmiana skrzynki gasi odznakę albo kasuje wynik, czy odznaka zostaje przy postaci, która straciła wprawę, i jak brzmią napisy przy programie |


## The plan's sections for what you review (word for word)

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

### Slice 8 — the balance instrument takes its default cap from the built game

- **Goal:** `DEFAULT_CAP_MINUTES` of `balance/engine.mjs` is the cap of a judging that Slice 3 put
  into the game's data, read from the built game (`dist/browser/sim/data/balance.js`), in place of the
  instrument's own 4000 (`guidelines/coding-balance-instrument.md`, "Liczba gry" and "Jedno
  miejsce wspólnej rzeczy"); `balance/trace.mjs` and `balance/campaign.mjs` go on importing it from
  the engine, unchanged. The file's opening comment stays true. The instrument's tests pass as they
  are; a test of `tests/balance/engine.test.mjs` that the change makes untrue follows only with its
  reason (`guidelines/testing.md`, "Changing an existing test").
- **Change:** `balance/engine.mjs` · `tests/balance/engine.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:50-50` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:125-127` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:147-149` Context ·
  `foundations/decisions.md:889-903` D-437 · `foundations/decisions.md:11664-11678` D-427 ·
  `foundations/decisions.md:11679-11695` D-428 · `foundations/decisions.md:290-315` D-18 ·
  `foundations/invariants.md:1438-1447` instrument-game-agreement ·
  `foundations/invariants.md:1458-1467` balance-instrument-repeatability ·
  `foundations/part_map.md:127-137` balance-tools · `guidelines/coding.md` ·
  `guidelines/coding-balance-instrument.md` · `guidelines/testing.md` · `balance/trace.mjs` ·
  `balance/campaign.mjs:1-140` · `src/browser/sim/data/balance.ts` ·
  `tests/balance/agreement.test.mjs` · `tests/balance/cli.test.mjs:100-140`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/balance/engine.test.mjs` · `npm test -- tests/balance/agreement.test.mjs`
  · `npm test -- tests/balance/trace.test.mjs` · `npm test -- tests/balance/campaign.test.mjs` ·
  `npm test -- tests/balance/cli.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py`
- **Depends on:** Slice 3

### Slice 9 — the styleguide gives the roles of the judging on the screen Mapy

- **Goal:** `guidelines/styleguide-browser-view.md` follows the change through the project skill
  `the-way-maintain-styleguide` (read as the file named in *Read*, in its orchestrated mode, asking
  no human): the rule "The screen Mapy", or a new rule beside it, gives the roles of the parts of a
  judging — the heading of the result in `text-strong`, a solved row in `positive`, a row of a death
  in `danger`, an undecided row in `warning`, the sentence under the rows in `text-secondary`, the
  badge „szczelny: 12 z 12” in `positive`, „{n} z 12” in `text`, the note of the stock in `warning`
  as the warning of D-251 stood (task 24 withdrew D-251, so the rule names it as no decision it rests
  on), the sentence before the second click of „Puść w pętlę” in
  `warning`; the button of a judging and „Puść w pętlę”, also as „Puść mimo to”, are plain shared
  buttons — and the rule's *Decision* names the new decisions and the changed ones it rests on. The
  rule "States of shared controls" gives loading also to the button of a judging, disabled with
  „Oceniam…” while it computes, though it waits for no server. Every role stands in its meaning of
  the table Roles, so no decision of a role changes and the table stays; the kitchen-sink page needs
  no new sample, since the plain button's loading state stands there.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:38-45` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:49-49` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:102-107` Questions to settle ·
  Foundation entries row 1 · Foundation entries row 2 · Foundation entries row 3 · Foundation
  entries row 4 · `.the-way/product-guidelines/styleguide/SKILL.md` ·
  `foundations/decisions.md:4895-4909` D-38 · `foundations/decisions.md:4910-4930` D-39 ·
  `foundations/decisions.md:4931-4947` D-40 · `foundations/decisions.md:4993-5009` D-44 ·
  `foundations/decisions.md:5237-5282` D-274 · `foundations/decisions.md:9819-9837` D-326 ·
  `foundations/part_map.md:3-31` browser-view · `foundations/part_map.md:139-157` agent-workflow
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` (the form of the guidelines
  and the decisions their rules name).
- **Depends on:** Foundation entries row 1 · row 2 · row 3 · row 4

## Notes of the orchestrator

- The range `afac5cd0..3218a620` holds slices 3–9 in the order they were made, **but you judge only four of its commits**: slice 3 `93dd78b3` (the judging function, the cap and seeds in the game's data, the types), slice 8 `b1a49f87` (the balance instrument's default cap from the built game), slice 9 `23e0fa01` (the styleguide's roles of the judging) and slice 7 `3218a620` (the act of a judging, the mark, the erasing). Slice 4 (`bae893e2`, with its fix `f93df2f6`) and slice 5 (`9efb8a8a`) were reviewed apart (PASS); `f93df2f6` also repaired six quotations in slice 3's test file. Use `git show <sha>` / `git diff <sha>^ <sha>` for each commit; the code of the others you read as the context the four stand on. The test file `tests/sim/saved-game.test.mjs` fails by the plan until slice 6 (not graded).
- Unread material carried to you from the executors (decide each; read what bears on the code you judge): the executor of slice 8 (a small model) read only part of what its handoff named — not read: the task passages (it used the copy), D-437, D-427, D-428, D-18, the invariants `instrument-game-agreement` and `balance-instrument-repeatability`, `foundations/part_map.md` balance-tools, `guidelines/coding.md`, `balance/trace.mjs`, `balance/campaign.mjs:1-140`, `tests/balance/agreement.test.mjs`, `tests/balance/cli.test.mjs:100-140`, and `guidelines/testing.md` only lines 120–160. Read them (the guidelines whole) and judge slice 8 against them, including the instrument's rule "Liczba gry" and "Jedno miejsce wspólnej rzeczy" of `guidelines/coding-balance-instrument.md`, and whether the three files of the instrument still take the cap from one place. The executor of slice 7 read only part of `guidelines/testing.md` and of `types.ts`, `programs.ts`, `game.ts`, `loop.ts`.
- Choices of the orchestrator you may meet: (a) slice 7 erases a program's remembered judgings also when the rule the game writes into a listed program at its first chill (D-123) changes its rules — the task says a change of rules erases, D-123 is silent; confirm or find a source that says otherwise. (b) `guidelines/coding-simulation-module.md` *Files of this kind* has no row for `judging.ts` and `judging-record.ts`; the guideline does not say a new file owes one; the cycle adds none; grade it as you find fit and say whether the guideline's text calls for the row. (c) Slice 3 and 4 each added one line to `stryker.config.json` (required by `tests/quality/test_mutation_test_selection.py`); slice 7 too.
- Check the two sentences that bind this part of the code (D-439 and D-440 as the foundation step wrote them, read whole): the judging takes nothing from the chest, pays nothing, settles no death, discovers nothing, draws no seed, reads no clock, changes no value passed to it; the act replaces only the remembered judging of its triple and leaves the pick of the list „Program:", the program used last and the last-entered program as they are; a covered death, a death of a character with no practice and a bought rank erase nothing; `progressLost` death erases all of the character's remembered judgings on every map, in the manual map run and in the earning loop (so the catch-up too); the saves that change rules, groups with their order or trip plan erase, a rename does not, deleting a program removes. Look for a place the simulation writes content into a listed program that the erasing misses (`programs.ts`, `game.ts`, the copy's save, a program created from a template or imported).
- `game.ts` stands at ~1000 physical lines; ESLint's size rules (D-425) count code lines: `npx eslint src/browser/sim/` should exit 0 — run it.
