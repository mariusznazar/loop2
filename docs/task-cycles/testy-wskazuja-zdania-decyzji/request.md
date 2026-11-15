**State: ready** — two items below wait for your answer (items 1 and 2) and a third is about how deeply the review read (item 3); everything else you accept by merging.

## What you will see

The game's decision log now says, for every one of its 403 decisions, which of its sentences a test guards, which an invariant guards, and which nothing guards. Before, a test could mention a decision's number in a comment and nobody could tell whether the test guarded the decision's sentence or only named it. Now each test that really guards a sentence carries a line that quotes the start of that sentence (3,831 such lines in 146 test files), and each decision says in words what its tests hold. Where a decision is held in whole by tests and invariants, its pair of examples (an example that keeps the decision and an example that breaks it) is gone; where only part is held, the pair stays and speaks only of the unheld part; where nothing held a decision and it had no pair, it got one. At the start 23 decisions were held by nothing; now none is, and the foundation check reports no error.

Nothing the player sees changes: no game code and no test's code or assertion changed, only comment lines in tests and the *Verification* part of the entries in the decision log. The wording of every decision (its binding sentences, its reasons and its rejected ways) is exactly as before.

One step of the task was not done, because it was already true: the task asked to move the pinned version of the process to a commit named in it, but the repository's pinned version had been moved on a day earlier, 18 commits past that one, so moving it would have been a step back.

### Underneath

The work was a judgment, not a code change: 40 agents on the strongest available model, one after another, each judged 5 to 14 decisions sentence by sentence against the tests; a reviewer that made none of it then sampled where such a judgment is most likely wrong.

## For you to decide

### Needed from you

none

### Fix or let through

1. Some decisions say things that no longer match the game, and six decisions do not name an invariant that was written to guard them (or name one that does not). The agents who judged the decisions noticed these and changed nothing, because the task forbade changing a decision's wording; they stand as remarks in the agents' reports (one example: one decision gives the name of a skill tree that the game spells differently; another describes a case the game does not have yet, since it has one character type). Whoever works from those decisions later may follow a sentence the game no longer shows. Fixing them in this request would take another round of correction and review and would change the decisions' wording, which the task excluded; making a task of it keeps each fix a decision of its own; letting it through leaves the remarks only in the reports of this request. I recommend making a task of it, because the changes need a human's yes on each wording. Make a task of it, or let it through? (Foundation entries, 3)

2. Most of the new marking lines are long: they quote a whole sentence of the decision even where the test guards only one clause of it, so 1,704 of the 3,811 added lines are over 200 characters and the longest has 1,116. The reviewer found that this misleads nobody (the description of each decision says which part its tests hold) and that no rule of the repository limits the length of a comment, but whoever reads these tests will see long comment lines above many of them. Shortening them would mean editing thousands of lines and a round of review for no change in what the foundation check accepts; making a task of it leaves them long until someone decides on a shorter form; letting it through accepts them. I recommend letting it through. Do it in this request, make a task of it, or let it through? (Minor findings, 1)

3. The review of the whole change did not read every decision whole: it read the binding sentences and the new description of 81 of the 403 decisions at both ends and judged the other 322 only from the log's script comparison and titles, and it read none of the 41 executors' reports whole. In that sample, covering 33 of the 107 dropped pairs, 19 heavily marked decisions, 28 changed pairs and 8 decisions held by nothing, it found one wrong marking and no wrong judgment about what a test guards. The risk that stays is a test marked as guarding a sentence it only uses, which a later reader would trust. Having a fresh reviewer read the rest costs another long review session; making a task of it keeps the sample as the review; letting it through accepts it. I recommend letting it through, because the sample was drawn from every slice and a wrong marking costs only a comment line. Do it in this request, make a task of it, or let it through? (Checks, 5)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. The step of the task that moves the pinned version of the process was not made, because the repository's pin already stands 18 commits past the commit the task names; the cycle judged that moving it would downgrade the process and left it alone.

5. In the decision that limits password attempts and hashing, the list of invariants now also names the invariant that guards the password gate. The task said the lists of invariants stay as they are, but the invariant was written to guard this decision and, once the old example for that gate was dropped, nothing in the decision pointed to it. I took this way and not the other (keeping an example for a part an invariant already holds) because the second would contradict the rule that an example speaks only of what nothing holds. If you do not want it, one line goes back.

6. How "a test holds a sentence" was read, as rules the cycle gave its 40 agents: (a) a test of an invariant is not also marked for what that invariant already states; (b) any decision with a part that nothing holds always gets an example for that part, also if it had none before (31 decisions got a new pair, and the pairs of up to 215 more were rewritten to speak only of what is unheld); (c) a test that only checks that an element has a colour class does not hold a sentence about what the colour means; and (d) the marking lines stand as the first lines inside a test, as the existing lines for invariants do, not above it as the plan said. You accept the new and rewritten pairs by merging; every one is listed word for word in the report of the agent that wrote it.

7. The rule on comments in tests says a comment may name the foundation entry a test's expectation comes from, and a marking line is exactly that. The agents followed it and kept every existing mention of a decision number; none was removed.

8. The reviewer asked for one wrong marking to be removed (a line that said a test guards a sentence it does not), and it was; the line had stood since before this task, so removing it is a change to a test file the task did not strictly ask for, but it is the thing the task exists to remove.

9. Where an agent found, by the content of a sentence, a test that guards it in a file the plan had not named for its slice, it marked that test too and ran that file's own test; many files were reached this way, and each agent's report names them.

## Cost

About 10 hours 33 minutes of working time across the orchestrator and 45 agents (plus the full gate, 24 minutes), and about 965 million tokens counted, nearly all of it cached input being read again: 896 million on the stronger model that did the planning, the 40 slices, the review, the fix and the return step, and 68 million on the orchestrator's model. One review of the whole change, one fix of its five small findings and one review of the fix; no blocking finding. The table of stages is in the committed record, linked below. Five directories of earlier tasks still stand because the script that tidies them could not tell they were no longer needed; nothing in this request waits for them and you may remove them by hand (their names stand in *Checks*).

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then (the repository's earlier requests were merged that way). No review of the foundation is due yet: 17 merges since the last one, the reminder comes at 30.

<details>
<summary>Po polsku</summary>

**Stan: gotowe** — dwie pozycje poniżej czekają na twoją odpowiedź (1 i 2), a trzecia dotyczy głębokości przeglądu (3); resztę akceptujesz przez scalenie.

## Co zobaczysz

Dziennik decyzji gry mówi teraz dla każdej z 403 decyzji, które jej zdania pilnuje test, które niezmiennik, a które nic. Wcześniej test mógł wspomnieć numer decyzji w komentarzu i nie dało się poznać, czy pilnuje zdania decyzji, czy tylko je nazywa. Teraz każdy test, który naprawdę pilnuje zdania, ma obok linię z cytatem początku tego zdania (3831 takich linii w 146 plikach testów), a każda decyzja mówi słowami, co trzymają jej testy. Tam, gdzie decyzję w całości trzymają testy i niezmienniki, zniknęła para przykładów (przykład zgodny z decyzją i przykład ją łamiący); tam, gdzie trzymana jest tylko część, para zostaje i mówi tylko o części nietrzymanej; tam, gdzie decyzji nie trzymało nic i nie miała pary, dostała ją. Na początku 23 decyzje nie były trzymane przez nic; teraz nie ma żadnej takiej, a kontrola fundamentu nie zgłasza błędu.

Gracz nie zobaczy żadnej zmiany: nie zmienił się kod gry ani kod czy asercja żadnego testu, tylko linie komentarza w testach i część *Verification* wpisów dziennika. Brzmienie każdej decyzji (zdania wiążące, uzasadnienie i odrzucone drogi) jest dokładnie takie jak przedtem.

Jednego kroku zadania nie wykonano, bo był już spełniony: zadanie kazało przesunąć przypiętą wersję procesu na wskazany commit, ale przypięta wersja w repozytorium została przesunięta dzień wcześniej, 18 commitów dalej, więc przesunięcie byłoby krokiem wstecz.

### Pod spodem

Praca była oceną, nie zmianą kodu: 40 agentów na najmocniejszym dostępnym modelu, jeden po drugim, oceniało po 5 do 14 decyzji zdanie po zdaniu względem testów; potem recenzent, który niczego nie robił, sprawdził próbę tam, gdzie taka ocena najłatwiej się myli.

## Do rozstrzygnięcia

### Potrzebne od ciebie

none

### Naprawić albo przepuścić

1. Niektóre decyzje mówią rzeczy, które nie zgadzają się już z grą, a sześć decyzji nie wymienia niezmiennika napisanego, żeby je pilnować (albo wymienia taki, który ich nie pilnuje). Agenci oceniający decyzje to zauważyli i niczego nie zmienili, bo zadanie zakazywało zmiany brzmienia decyzji; zostały jako uwagi w raportach agentów (przykład: jedna decyzja podaje nazwę drzewa umiejętności inaczej, niż pisze ją gra; inna opisuje przypadek, którego gra jeszcze nie ma, bo ma jeden typ postaci). Kto później pracuje z tych decyzji, może pójść za zdaniem, którego gra już nie pokazuje. Naprawa w tej prośbie to kolejna runda poprawek i przeglądu i zmiana brzmienia decyzji, której zadanie nie obejmowało; zadanie osobne zostawia każdą poprawkę jako osobną decyzję; przepuszczenie zostawia uwagi tylko w raportach tej prośby. Rekomenduję zadanie osobne, bo każde nowe brzmienie wymaga twojego „tak". Zrobić z tego zadanie, czy przepuścić? (Wpisy fundamentu, 3)

2. Większość nowych linii oznaczających jest długa: cytują całe zdanie decyzji, także tam, gdzie test pilnuje tylko jednej jego części, więc 1704 z 3811 dodanych linii ma ponad 200 znaków, a najdłuższa 1116. Recenzent uznał, że to nikogo nie wprowadza w błąd (opis każdej decyzji mówi, którą część trzymają jej testy) i że żadna reguła repozytorium nie ogranicza długości komentarza, ale kto czyta te testy, zobaczy długie linie komentarza nad wieloma z nich. Skrócenie oznaczałoby edycję tysięcy linii i rundę przeglądu bez zmiany tego, co przyjmuje kontrola fundamentu; zadanie osobne zostawia je długimi, dopóki ktoś nie zdecyduje o krótszej formie; przepuszczenie je akceptuje. Rekomenduję przepuścić. Zrobić w tej prośbie, zrobić zadanie osobne, czy przepuścić? (Drobne ustalenia, 1)

3. Przegląd całości nie przeczytał każdej decyzji w całości: przeczytał zdania wiążące i nowy opis 81 z 403 decyzji na obu końcach, a pozostałe 322 ocenił tylko po porównaniu skryptem i po tytułach, i nie przeczytał w całości żadnego z 41 raportów wykonawców. W tej próbie, obejmującej 33 z 107 zdjętych par, 19 mocno oznaczonych decyzji, 28 zmienionych par i 8 decyzji nietrzymanych przez nic, znalazł jedno błędne oznaczenie i żadnej błędnej oceny tego, co pilnuje test. Ryzyko, które zostaje, to test oznaczony jako pilnujący zdania, które tylko wykorzystuje, czemu późniejszy czytelnik by zaufał. Przeczytanie reszty przez świeżego recenzenta to kolejna długa sesja przeglądu; zadanie osobne zostawia próbę jako przegląd; przepuszczenie ją akceptuje. Rekomenduję przepuścić, bo próbę wzięto z każdego kawałka pracy, a błędne oznaczenie kosztuje tylko linię komentarza. Zrobić w tej prośbie, zrobić zadanie osobne, czy przepuścić? (Kontrole, 5)

### Akceptujesz przez scalenie

Scalenie akceptuje te pozycje; jeśli któraś ci nie odpowiada, napisz która.

4. Kroku zadania przesuwającego przypiętą wersję procesu nie wykonano, bo pin w repozytorium stoi już 18 commitów dalej niż commit, który podaje zadanie; cykl uznał, że przesunięcie obniżyłoby wersję procesu, i zostawił ją.

5. W decyzji ograniczającej próby hasła i jego haszowanie lista niezmienników wymienia teraz także niezmiennik pilnujący bramki hasła. Zadanie mówiło, że listy niezmienników zostają bez zmian, ale niezmiennik napisano do pilnowania tej decyzji, a po zdjęciu dawnego przykładu dla tej bramki nic w decyzji na niego nie wskazywało. Wybrałem tę drogę, a nie drugą (zostawienie przykładu dla części, którą już trzyma niezmiennik), bo druga przeczyłaby regule, że przykład mówi tylko o tym, czego nic nie trzyma. Jeśli tego nie chcesz, wraca jedna linia.

6. Jak odczytano „test trzyma zdanie", jako reguły, które cykl dał 40 agentom: (a) test niezmiennika nie jest dodatkowo oznaczany za to, co ten niezmiennik już stwierdza; (b) decyzja z częścią, której nic nie trzyma, zawsze dostaje przykład dla tej części, także jeśli wcześniej go nie miała (31 decyzji dostało nową parę, a pary jeszcze do 215 innych przepisano tak, by mówiły tylko o nietrzymanym); (c) test, który tylko sprawdza, że element ma klasę koloru, nie trzyma zdania o tym, co ten kolor znaczy; (d) linie oznaczające stoją jako pierwsze linie wewnątrz testu, jak istniejące linie niezmienników, a nie nad nim, jak mówił plan. Nowe i przepisane pary akceptujesz przez scalenie; każda jest wypisana słowo w słowo w raporcie agenta, który ją napisał.

7. Reguła o komentarzach w testach pozwala, by komentarz wskazywał wpis fundamentu, z którego pochodzi oczekiwanie testu, a linia oznaczająca właśnie nim jest. Agenci poszli za tym i zostawili każdą istniejącą wzmiankę o numerze decyzji; żadnej nie usunięto.

8. Recenzent kazał usunąć jedno błędne oznaczenie (linię, która mówiła, że test pilnuje zdania, którego nie pilnuje) i usunięto je; linia stała od przed tym zadaniem, więc jej usunięcie to zmiana w pliku testu, której zadanie ściśle nie żądało, ale to jest właśnie to, co zadanie ma usuwać.

9. Gdy agent znalazł po treści zdania test, który je pilnuje, w pliku, którego plan nie wymienił dla jego kawałka pracy, oznaczył i ten test oraz uruchomił test tego pliku; w ten sposób dotknięto wielu plików, a raport każdego agenta je wymienia.

## Koszt

Około 10 godzin 33 minut czasu pracy orkiestratora i 45 agentów (plus pełna bramka, 24 minuty) i około 965 milionów policzonych tokenów, prawie wszystkie to ponownie czytane dane z pamięci podręcznej: 896 milionów na mocniejszym modelu, który planował, robił 40 kawałków, recenzował, poprawiał i wykonał krok zwrotny, i 68 milionów na modelu orkiestratora. Jeden przegląd całości, jedna poprawka jego pięciu drobnych ustaleń i jeden przegląd poprawki; żadnego ustalenia blokującego. Tabela etapów jest w zatwierdzonym rekordzie, podlinkowanym niżej. Pięć katalogów wcześniejszych zadań nadal stoi, bo skrypt sprzątający nie mógł poznać, że już nie są potrzebne; nic w tej prośbie na nie nie czeka i możesz je usunąć ręcznie (ich nazwy są w sekcji *Kontrole*).

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do rekordu przeżywa tylko wtedy (wcześniejsze prośby tego repozytorium scalano tak). Przegląd fundamentu jeszcze nie jest należny: 17 scaleń od ostatniego, przypomnienie przychodzi przy 30.

</details>

## Technical changes

The change is in two kinds of files. Sentence by sentence, with what was not checked and how much it matters:

- **Test files (146 files, +3,811 lines, one line removed):** every added line is a comment of the form `// decision: D-NN "<start of a binding sentence>"` in JavaScript and `# decision: …` in Python, placed as the first lines inside the test case it concerns. The code, names and assertions of tests did not change. 100 files are `.mjs` and 46 are `.py`; the largest groups are the view tests of the screens and of the scene, and the simulation tests. The one removed line is the wrong marking of a test in the registry of screens (`tests/view/screen-registry.test.mjs`, commit `bf65200c`).
- **`foundations/decisions.md` (+944 lines):** only the field *Verification* changed, in 370 of 403 entries: the clause `tests:` was added where lines stand, 107 pairs `complies:` / `violates:` were removed, 31 added, and up to 215 rewritten. A script compared each entry with its base outside *Verification* and found no difference, and no entry was added or removed.
- **Commits:** 90 in all (`git log --oneline 394ca859..HEAD`): usually two for each slice, a `test:` commit with the marking lines and a `docs:` commit with the log, and a third where the agent's own check found tests it had missed; slice 10 has two more from the second executor that finished its judgments; the fix of the review's small findings is `bf65200c` and `69b7facc`.
- Not changed: any game code, invariant, binding sentence, rationale or rejected way, and the pin `.the-way` (`ec7929d`).

## Checks

- **Gate:** `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/testy-wskazuja-zdania-decyzji/gate_times.md -- npm.cmd test` on head `69b7facc`, one run, 1456.7 s with two other gate runs at the same time, started on the day's advisor's signal `start`: exit 1; 591 tests in 4 directories; the only failing directory is `tests/quality`, with two errors, `test_ruff_source_rules` and `test_shellcheck_source_rules` (both stop on `FileNotFoundError`, since the worktree has no local Ruff or ShellCheck). The same two fail on the base: the list was taken from the final gate of the earlier cycle (`docs/task-cycles/naprawa-startu-dockera-w-bramce/cycle.md`, added by commit `f7dc8740`, whose base is this task's base), with no run on the base because the base is a merge commit whose tree equals the merged branch's. The Node tests (2,464) all pass; `tests/agent_workflow` (14), `tests/invariants` (261) and `tests/deploy` (253) pass.
- **Foundation check:** the gate stops at its failed stage, so its own foundation stage did not run there; run on its own on the head, `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors` and no line `listed:` (at the base: 23 lines). Ruff 0.17.1 of the main checkout's quality environment, `ruff check --config ruff.toml tests scripts`, exits 0 on the head: this is no run of the gate's own Ruff test.
- **Own-work checks of the agents:** each executor broke one of its quotations on purpose and the foundation check refused it, then restored it (slices 3, 12, 21, 31 and others); each ran the focused test of every test file it changed (exit 0) and Prettier on changed `.mjs` files (exit 0). The reviewer's scripts: comment-only diff, recount of entries outside *Verification*, form of every *Verification*, derived against named invariants: all exit 0.
- **Orchestrator's scripts:** per slice and for the whole range, entries equal to base outside *Verification*, other files only added comment lines: 0 problems every time (the fix range shows the one intended removed line); consistency of the log with the lines: 0 of 403 flagged.
- **Review checks of the reviewers and the unread material (item 3):** the whole-change reviewer read 0 of 403 selected decisions whole in the method's sense (it read binding sentences and *Verification* of 81 and compared the rest by script), read `guidelines/coding.md` and `guidelines/testing.md` whole, did not read the browser-view styleguide, the glossary, the executors' reports (41) or the record, and did not run Ruff or the focused tests (they build into the reviewed tree).
- **Not run by anyone:** the gate's own Ruff and ShellCheck tests (no local tools), and nothing else.
- **Form and private-path checks of this description, the three checks on the copy of the record, and the remarks check:** written below after the record is committed. The remarks check's last run on the original: `python -B .the-way/task-cycle/remarks_check.py .runs/task-cycles/testy-wskazuja-zdania-decyzji` exit 0 after 2 runs (214 items in 49 reports, all held by the process remarks).
- **Working copies left:** none. A first executor of slice 37 left its check logs in its directory; the orchestrator kept the file of exit codes and removed the directory.
- **Directories of earlier tasks kept:** `przewodnik-testow` (branch `task/przewodnik-testow`; holds `fail-node` and `fail-python`, which stay: uncommitted changes), `coding-guidelines` (branch `task/coding-guidelines`; uncommitted changes), `wt-L1` (branch `task/the-way-slimmed`; uncommitted changes), `wt-L1a` (branch `task/slim-quality-checks`; uncommitted changes), `wt-pin` (branch `task/update-the-way-f0b2130`; uncommitted changes).
- **User-interface states and screenshots:** not applicable; no screen changed.

## Foundation entries

1. **The 403 decisions, field *Verification*** (marked `the cycle's`): each now names, by the clause `tests:`, what its tests hold, in words and without path or number, and keeps `invariants:`; its pair stands only for the part nothing holds. Every example pair added or rewritten is written word for word in the report of the executor of its slice (`reports/executor-<n>-report.md`, section of the pairs; slice 10 also in `reports/executor-10b-report.md`).
2. **D-103** (the cycle's): its `invariants:` clause now also names `password-operation-gate`, which derives from it (`foundations/invariants.md`); a departure from *To do* 2, accepted by the cycle's ruling and put to you under item 5 of *You accept by merging*.
3. **Remarks on wording and invariant lists, left unchanged and put to you under item 1 of *Fix or let through*:** D-04, D-108, D-179 and D-190 each miss one derived invariant in their `invariants:` clause, and D-113 and D-377 name invariants that do not derive from them (all as at the base); wording remarks of the executors, among them D-195 (the example gives the tree's name as „Zbieranie", the game says „Zbieranie małych przedmiotów"), D-61 (names the cause „walka", the simulation's cause is `combat`), D-175 (a second sentence about a character without nature energy, a case the game does not have), D-218 and D-54 (name less than the screen shows), D-306, D-310, D-122, D-124 and D-216 (wording debatable), D-70 (does not say the fire's state stands only in the row), D-115 and D-117 (no test holds a clause), and the quotation rule cutting D-216's binding sentence at full stops inside quoted texts.
4. **Tests changed by a line `decision:`:** 146 test files, 3,811 lines added and one removed; the lines are the whole of the change to tests, and no invariant's test changed (the invariants' own tests carry their lines `invariant:` as before and got no line for what their invariant states).
5. **Invariants, surfaces and *Violated* marks:** none written, changed or marked. **Glossary, environment facts, part map:** none changed (the return step compared them with the code and found nothing to correct).
6. **Rows of *Settlements to record*:** none (the task's section reads `none`). **Projected entries:** none.

## Minor findings

1. The review of the whole change (`PASS`, `reports/review-whole-report.md`) found five Minor findings within the task; four were fixed (`bf65200c`, `69b7facc`), and the fifth asked for no fix, in the reviewer's words: "**M5 — many quotations run to the end of long sentences at cases that hold one clause.** Examples: `tests/view/account-screen.test.mjs:6018` quotes D-381's whole second sentence (to „never while it is being drawn.”) at a case that holds only its last clause. `tests/sim/loop.test.mjs:877` quotes all of D-386's second sentence. Of the 3811 added lines, 1704 are over 200 characters, 435 over 400, and the longest is 1116. […] This is a note on readability, with no fix required." The review of the fix (`PASS 69b7facc`, `reports/review-fix-report.md`) found no new finding of any grade.

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** an independent task (the note of the task in the author's backlog, frozen as `task-frozen.md`): the decision log of the game now says which tests hold which sentences of a decision, by a line `decision:` at the test and the clause `tests:` in the entry; answers to its four questions came from the human on 2026-11-14 (all decisions in one cycle and one request, every judgment on the strongest model, the pin move as the branch's first commit). Base `394ca859` of `main`; the local `main` stood 13 commits behind and the branch was made from `origin/main`.
- **Process pin:** `ec7929d` throughout; not moved. The task's *To do* 1 named `f4af75d`, an ancestor of the pin 18 commits earlier (`git merge-base --is-ancestor` exit 0), so the move would have been a downgrade; the cycle's installer preview said "older than the pin". No gate on a moved pin.
- **Spec:** none; the one open choice (whether a mention of a decision number stays beside the new line) is a choice of how to make what the task settles, and the task's *Out of scope* answers it.
- **Route:** planned slices, since about 400 decisions in 268 code files and a judgment of every sentence on the strongest model do not fit one agent.
- **Plan:** `plan.md` and `plan-size.md` in the record: 40 slices of 5 to 14 decisions, each on the strongest class, risk none, one after another; the size script called all 40 too large only because it counts the 430,000-token decision log whole (39 fit without it; the slice for the login card did not, and its executor read by case), which the cycle accepted as Q5.
- **Choices:** the other choices and rulings of the cycle stand in the record's questions table (`cycle.md`): 14 questions and 9 plan choices, among them R1 to R4 and the D-103 departure; slice 10 came back incomplete (its executor's context ran short) and a second executor finished its judgments; the first executor was resumed once to add pairs, and the reviewer once to review the fix.
- **Blocking findings left:** none.
- **Record:** `<SHA>`
