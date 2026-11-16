**State: blocked** — a review finding remained after its one fix

## What you will see

Nothing changes on the screens. The game looks and plays as before: every screen was recorded in a real browser before and after the change, and the only differences were the new stylesheet links in the page. What changes is how the game and the project are put together, so that the next task about one screen is cheaper:

- The screen of a map run no longer waits to be told by the game's driver when to show the question „Zapisać, odrzucić, wrócić?” and the end-of-run window. It reads them itself from its own state, as the other screens read theirs, and so does the program panel it shares with the screen Programy. The old "show this now" calls are gone.
- The long list of "files you may copy as examples" now has a row for every file of the browser view and of the simulation, each judged by reading it against the rules of its kind. Ten rows changed from "do not copy" to "copy", one from "copy" to "do not copy", and the files added since the last audit got their rows.
- The one big stylesheet of the game (more than 3,400 lines) is split. Each screen, and the program panel that two screens use, now has a file of its own, linked from the page; the shared file keeps only what every screen needs. Someone who changes one screen now reads that screen's file and the shared one, not the whole.
- The rules about this are written down: a new screen adds its own stylesheet and its own link, the visual guidelines say which rules the shared stylesheet keeps, and the places that named the old file now name the right one.
- Two small wording corrections in the decision log, asked for by the task: an example of compliance that did not match the screen Wiedza, and the rule about the colour of an icon with no text beside it, which now also names the plaque of a discovery on the scene.

### Underneath

The screen state gained a way to be subscribed to, and the screen and its panel read it through React's own mechanism for reading a store outside React. The stylesheet was moved rule by rule, with no selector or declaration rewritten, and a script checked that no rule was lost and that no pair of rules that could fight over one element changed their order.

## For you to decide

### Needed from you

1. The last review found one thing in the wording this change itself wrote, and the cycle stopped there, as its rules ask after one fix. The rule about stylesheets, in the decision log and in the visual guidelines, says that the shared stylesheet also keeps "a rule whose selector names classes of more than one screen". That is wider than the code: four small rules of the credits section, which show on both the login card and the camp screen, match those words but rightly live in the credits' own file. A second sentence reads as if the screens that need the exception had no stylesheet of their own, though each has one. Nobody sees this on a screen. The person or agent who next works on stylesheets would read the rule, open the credits file, see four rules the rule places elsewhere, and either move them the wrong way or decide the rule is not kept. The finding is only about wording: no code changes. If you fix it as the finding says, it costs one more small round — a few words in two places, one review of that fix, and then the steps that have not run on this code (below) run once; nothing else of the change moves. If you keep it as it is, nothing is spent now and the contradiction stays in the written rule until someone trips over it. I recommend fixing it as the finding says, since it is a few words and the fix does not touch the stylesheets. What has not run on this code, and runs after your decision: the return step, which compares the written decisions with the code once more. The reconciliation with the main branch has nothing to bring in (the main branch has not moved since this branch started), and no slice was left unmade. The result of the automatic run on the pull request stands on its page and was not waited for. Fix it as the finding says, or keep the code despite it? (Blocking findings left, 1)

### Fix or let through

2. Some states of the game could not be reached in the test browser, so the check that nothing changed on screen did not cover them: the end-of-run window after the mage completes a map (the death case was checked), a blocked account, an earning loop and its report, a solved map, the failure panel of the login card, the hover and focus states, motion, and the list of accounts (it needs an owner account). The rules of those states were moved by a script that checks the order of the rules; no one looked at them. If one is wrong, a player sees an odd screen in that state. Checking them now costs a session with a running game and perhaps a round of review; making a task of it leaves them unchecked until someone looks; letting it through accepts the small risk. I recommend letting it through, since the script showed that no moved rule changes which rule wins on any element, and the screens that were recorded show no difference. Check it in this request, make a task of it, or let it through? The steps of the check by hand, whose result you write down as a remark:
   1. Start the game on your computer with the local start command and sign in with a test account.
   2. Let the mage complete a map, then look at the window that opens at the end of the run and close it; open the map run screen again.
   3. Open the camp screen with a character, then the screens Mapy and Wiedza, and look at the fire, the characters and the lists.
   4. Open the login card from a signed-out window and open its credits.
   5. Everything should look as it does on the main branch.

   (Checks, 3)
3. One older decision, about colours, was not changed, because the task changes only the newer one. It still lists three places where an icon with no text beside it is drawn in the strongest text colour, and does not name the plaque of a discovery that the newer decision now names. The game itself is not affected. Someone reading only the older decision would not learn that the plaque is in that colour. Fixing it in this request costs a small round with a review; a separate task costs nothing now; letting it through leaves the two entries saying different amounts. I recommend a separate task, since the older decision is not wrong, only shorter. Make a task of it, fix it in this request, or let it through? (Findings outside the task's scope, 1)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. The table of example files now marks as "copy" a new small file that both parts of the screen of a map run read their state through, and the screen file of the map run stays marked "copy", though it has one effect with no clean-up, because that effect connects to nothing outside React. The reviewer agreed. The other way, marking the screen file as "do not copy", would have made the example list stricter than the task's audit.
5. The shared stylesheet keeps, besides the controls and the menu, the common layout of the screens and the rules that two screens need whole: the warning sentence of the trip plan and the animation of the frames of the mage's sprites and of the camp. The cycle took the reviewer's smaller way, instead of adding three more files and splitting selectors.
6. Besides the six screens, the login card, the waiting screen and the list of accounts each got their own stylesheet as screens, and the credits section got one as a part two screens use. The order of the links follows where each file's first rule stood in the old stylesheet, which puts the maps file before the character file.
7. Foundation entries you did not see at the task, all written by the cycle: the example of compliance in the decision about the screen state now shows the shared folding memory and the open trees of the screen Wiedza (asked for in the task); the rule about the colour of an icon with no text beside it now also says the icon on each plaque of a discovery in the scene is drawn in that colour, and the plaque is named after the list so that eight quotations of that sentence in tests stay valid; and the exception that the shared stylesheet keeps some rules whole, written by the fix, which is the wording of item 1. Tests that quote a decision were added in the new cases of the state test of the screen of a map run (the decisions about that screen's state, the end-of-run window and when it opens) and changed in the screen tests; no invariant test changed.

## Cost

About 2 hours 27 minutes of stage time in the table of stages, plus 15 minutes for the full run of the tests; nearly 168 million tokens, almost all cached input (145 million in the agents, 22 million in the orchestrator). Models: the plan and the two reviews on the strongest class (opus), the foundation entries, three of the eight slices, the fix and the orchestrator on the middle class (sonnet), and three small slices on the cheaper class (haiku). One review of the whole change, one fix and one review of the fix; the third round was not run. The table of stages is in the committed record linked below (stages table).

## How to merge

Do not merge yet: decide item 1 first. When you merge, use a merge that keeps the commits, since the link to the record survives only then.

<details>
<summary>Po polsku</summary>

**Stan: zablokowany** — uwaga z przeglądu została po jednej poprawce

## Co zobaczysz

Na ekranach nic się nie zmienia. Gra wygląda i działa jak przedtem: każdy ekran nagrano w prawdziwej przeglądarce przed zmianą i po niej, a jedyną różnicą były nowe odnośniki do arkuszy stylów na stronie. Zmienia się budowa gry i projektu, żeby następne zadanie o jednym ekranie było tańsze:

- Ekran przejścia nie czeka już, aż sterownik gry każe mu pokazać pytanie „Zapisać, odrzucić, wrócić?” i okno końca przejścia. Odczytuje je sam z własnego stanu, jak inne ekrany, i tak samo robi panel programu, który dzieli z ekranem Programy. Dawne wywołania „pokaż teraz” zniknęły.
- Lista „plików, które wolno brać za wzór” ma teraz wiersz dla każdego pliku widoku i symulacji, każdy oceniony przez przeczytanie pliku z regułami jego rodzaju. Dziesięć wierszy zmieniło się z „nie kopiuj” na „kopiuj”, jeden z „kopiuj” na „nie kopiuj”, a pliki dodane od ostatniego audytu dostały wiersze.
- Jeden wielki arkusz stylów gry (ponad 3400 linii) jest podzielony. Każdy ekran i panel programu, którego używają dwa ekrany, ma własny plik podawany ze strony; wspólny plik zostawia tylko to, czego potrzebuje każdy ekran. Kto zmienia jeden ekran, czyta plik tego ekranu i wspólny, a nie całość.
- Reguły o tym są zapisane: nowy ekran dodaje własny arkusz i własny odnośnik, wytyczne wyglądu mówią, co zostaje we wspólnym arkuszu, a miejsca, które nazywały stary plik, wskazują właściwy.
- Dwie drobne poprawki brzmienia w dzienniku decyzji, o które prosiło zadanie: przykład zgodności, który nie pasował do ekranu Wiedza, oraz reguła o kolorze ikony bez tekstu obok, która teraz nazywa też tabliczkę odkrycia na scenie.

### Pod spodem

Stan ekranu dostał możliwość subskrypcji, a ekran i jego panel czytają go przez mechanizm Reacta do czytania magazynu spoza Reacta. Arkusz przeniesiono regułami, bez przepisywania selektorów i deklaracji, a skrypt sprawdził, że żadna reguła nie zginęła i że żadna para reguł, które mogłyby się bić o jeden element, nie zmieniła kolejności.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

1. Ostatni przegląd znalazł jedną rzecz w brzmieniu, które napisała ta sama zmiana, i cykl stanął, jak każą jego reguły po jednej poprawce. Reguła o arkuszach stylów, w dzienniku decyzji i w wytycznych wyglądu, mówi, że wspólny arkusz trzyma też „regułę, której selektor nazywa klasy więcej niż jednego ekranu”. To szersze niż kod: cztery małe reguły sekcji autorów, widocznej i na karcie logowania, i na ekranie obozu, pasują do tych słów, a słusznie stoją w pliku tej sekcji. Drugie zdanie brzmi, jakby ekrany objęte wyjątkiem nie miały własnych arkuszy, a każdy ma. Nikt tego nie zobaczy na ekranie. Kto następny będzie pracował przy arkuszach, człowiek albo agent, przeczyta regułę, otworzy plik sekcji autorów, zobaczy cztery reguły, które reguła stawia gdzie indziej, i albo przeniesie je w złą stronę, albo uzna, że reguła nie jest przestrzegana. Uwaga dotyczy samego brzmienia: kod się nie zmienia. Jeśli poprawisz, jak mówi uwaga, kosztuje to jeszcze jedną małą rundę — kilka słów w dwóch miejscach, jeden przegląd tej poprawki, a potem jednokrotne wykonanie kroków, które nie szły na tym kodzie (niżej); nic innego ze zmiany się nie rusza. Jeśli zostawisz, nic teraz nie kosztuje, a sprzeczność zostaje w zapisanej regule, aż ktoś się o nią potknie. Rekomenduję poprawić, jak mówi uwaga, bo to kilka słów i poprawka nie dotyka arkuszy. Co nie szło na tym kodzie i pójdzie po Twojej decyzji: krok powrotny, który jeszcze raz porównuje zapisane decyzje z kodem. Uzgodnienie z główną gałęzią nie ma co wnosić (główna gałąź nie ruszyła się, odkąd ta gałąź powstała), a żaden slice nie został niewykonany. Wynik automatycznego przebiegu na pull requeście stoi na jego stronie i nie był czekany. Poprawić, jak mówi uwaga, czy zostawić kod mimo niej? (Blocking findings left, 1)

### Napraw albo przepuść

2. Niektórych stanów gry nie dało się osiągnąć w przeglądarce testowej, więc sprawdzenie, że nic się nie zmieniło na ekranie, ich nie objęło: okna końca przejścia po ukończeniu mapy przez maga (śmierć sprawdzono), zablokowanego konta, pętli zarobkowej i jej raportu, rozwiązanej mapy, panelu błędu karty logowania, stanów najechania i fokusu, ruchu oraz listy kont (potrzebuje konta właściciela). Reguły tych stanów przeniósł skrypt, który sprawdza kolejność reguł; nikt na nie nie patrzył. Jeśli któraś jest zła, gracz zobaczy dziwny ekran w tym stanie. Sprawdzenie teraz kosztuje sesję z działającą grą i być może rundę przeglądu; zadanie na później zostawia je niesprawdzone, aż ktoś spojrzy; przepuszczenie przyjmuje małe ryzyko. Rekomenduję przepuścić, bo skrypt pokazał, że żadna przeniesiona reguła nie zmienia, która wygrywa na którymkolwiek elemencie, a nagrane ekrany nie pokazały różnic. Sprawdzić w tym requeście, zrobić z tego zadanie czy przepuścić? Kroki sprawdzenia ręcznego, którego wynik zapisujesz jako uwagę:
   1. Uruchom grę na swoim komputerze poleceniem startu lokalnego i zaloguj się kontem testowym.
   2. Pozwól magowi ukończyć mapę, spójrz na okno, które otwiera się na końcu przejścia, zamknij je i otwórz ekran przejścia ponownie.
   3. Otwórz ekran obozu z postacią, potem ekrany Mapy i Wiedza, i spójrz na ogień, postacie i listy.
   4. Otwórz kartę logowania z wylogowanego okna i otwórz jej sekcję autorów.
   5. Wszystko powinno wyglądać tak jak na głównej gałęzi.

   (Checks, 3)
3. Jedna starsza decyzja, o kolorach, nie została zmieniona, bo zadanie zmienia tylko nowszą. Wciąż wylicza trzy miejsca, w których ikona bez tekstu obok jest rysowana najmocniejszym kolorem tekstu, i nie nazywa tabliczki odkrycia, którą nowsza decyzja już nazywa. Gra na tym nie cierpi. Kto czyta tylko starszą decyzję, nie dowie się, że tabliczka ma ten kolor. Poprawka w tym requeście kosztuje małą rundę z przeglądem; osobne zadanie nic teraz nie kosztuje; przepuszczenie zostawia dwa wpisy mówiące różną liczbę. Rekomenduję osobne zadanie, bo starsza decyzja nie jest błędna, tylko krótsza. Zrobić z tego zadanie, poprawić w tym requeście czy przepuścić? (Findings outside the task's scope, 1)

### Akceptujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

4. Tabela plików wzorcowych oznacza teraz jako „kopiuj” nowy mały plik, przez który obie części ekranu przejścia czytają swój stan, a plik ekranu przejścia zostaje „kopiuj”, choć ma jeden efekt bez sprzątania, bo ten efekt nie łączy się z niczym poza Reactem. Recenzent się zgodził. Inna droga, „nie kopiuj” dla pliku ekranu, uczyniłaby listę wzorców surowszą niż audyt z zadania.
5. Wspólny arkusz trzyma, oprócz kontrolek i menu, wspólny układ ekranów i reguły, których dwa ekrany potrzebują w całości: zdanie ostrzeżenia planu wyprawy oraz animację klatek sprite'ów maga i obozu. Cykl wybrał mniejszą drogę recenzenta zamiast dodawać trzy pliki i dzielić selektory.
6. Poza sześcioma ekranami także karta logowania, ekran oczekiwania i lista kont dostały własne arkusze jako ekrany, a sekcja autorów jako część używana przez dwa ekrany. Kolejność odnośników idzie za miejscem pierwszej reguły każdego pliku w starym arkuszu, co stawia plik map przed plikiem postaci.
7. Wpisy fundamentu, których nie widziałeś przy zadaniu, wszystkie napisane przez cykl: przykład zgodności w decyzji o stanie ekranu pokazuje teraz wspólną pamięć zwijania i otwarte drzewa ekranu Wiedza (o co prosiło zadanie); reguła o kolorze ikony bez tekstu obok mówi też, że ikona na każdej tabliczce odkrycia na scenie ma ten kolor, a tabliczka jest nazwana po liście, żeby osiem cytatów tego zdania w testach pozostało prawdziwych; oraz wyjątek, że wspólny arkusz trzyma niektóre reguły w całości, napisany przez poprawkę, czyli brzmienie z punktu 1. Testy cytujące decyzje dodano w nowych przypadkach testu stanu ekranu przejścia (decyzje o stanie tego ekranu, oknie końca przejścia i jego otwieraniu) i zmieniono w testach ekranu; żaden test niezmiennika się nie zmienił.

## Koszt

Około 2 godzin 27 minut czasu etapów w tabeli etapów, plus 15 minut pełnego przebiegu testów; prawie 168 milionów tokenów, prawie wszystko to wejście z pamięci podręcznej (145 milionów w agentach, 22 miliony w orkiestratorze). Modele: plan i dwa przeglądy na najmocniejszej klasie (opus), wpisy fundamentu, trzy z ośmiu slice'ów, poprawka i orkiestrator na średniej (sonnet), trzy małe slice'y na tańszej (haiku). Jeden przegląd całości, jedna poprawka i jeden przegląd poprawki; trzeciej rundy nie robiono. Tabela etapów jest w zatwierdzonym zapisie z linkiem niżej (tabela etapów).

## Jak scalić

Jeszcze nie scalaj: najpierw rozstrzygnij punkt 1. Kiedy scalisz, użyj scalenia, które zachowuje commity, bo link do zapisu przetrwa tylko wtedy.

</details>

## Technical changes

The change is nine groups of commits on `task/porzadki-widoku-po-react`, base `7ba7a116`, head `a9a95479` (the record's own two commits come after):
- `f5b1c0e4` the foundation entries: D-421 (new, row 1) and changes to D-408 (row 2), D-407 (row 3 and To do 7) and D-43 (To do 8).
- `d0c42108` slice 1: `RunScreenState` gets `subscribe` and a stable snapshot (`src/browser/view/run-screen-state.ts`) with the cases of the subscription in `tests/view/run-screen-state.test.mjs`.
- `a874dbff` slice 2: the screen and the program panel read the question and the window from that state through the new hook `src/browser/view/run-screen-reading.ts`; `setQuestion` and `setWindow` are gone (`run-screen.tsx`, `run-entry.ts`, `program-panel.tsx`), 22 lines of `tests/view/run-screen.test.mjs` changed, each with its reason named in the slice's report.
- `b607bfe5` slice 3: the table of `guidelines/coding-browser-module.md` has a row for each of its 80 files; the simulation table already matched.
- `57d1f0ab`, `f515ac66` slices 4 and 5: `tests/view/game-stylesheets.mjs` reads the stylesheets in the order the page links them; four tests read the stylesheet through it.
- `581d09bb`, `deed67af` slices 6 and 7: `src/browser/styles.css` goes from 3406 to 617 lines; eleven new `.css` files directly in `src/browser/`, each linked from `src/browser/index.html`; no selector or declaration changed.
- `45f9b25c` slice 8: the styleguide's rule of a stylesheet for each screen and part, the places that named `styles.css`, the comment of `src/browser/view/email-status.ts`.
- `30076f2b`, `f8621033`, `2af9b3ed`, `a9a95479` fix 1: the D-371 quotation, D-421's exception and D-407's *Verification* clause, the styleguide's wording and the `text-strong` row, and the frames rule with `@keyframes scene-frames` moved into `src/browser/styles.css`.

## Checks

- Full run of the tests: `python -B .the-way/task-cycle/gate_times.py --output docs/task-cycles/porzadki-widoku-po-react/gate_times.md -- npm.cmd test` on `a9a95479` (1 run, started on the signal of the adviser of the day, 927.559 s, 0 other gate runs at the same time): exit 0; Node tests 2563 passed, 0 failed, 0 skipped; Python tests 679 in 4 directories, every directory passed; foundation check `0 errors`; check of the instruction files `0 error, 142 warn, 7 info`. The run covers the head whose review failed; the return step did not run on it. Before the change no check failed (list taken from the final gate of the earlier cycle `docs/task-cycles/przywrocic-decyzje-drogi-agenta/cycle.md`, commit `987daf29`, because the base is a merge commit whose tree equals its second parent's).
- `python -B .the-way/elements/common/foundation_check.py` without `--skip-test-citations` on the head: exit 0, `0 errors`, no `listed:` line. At the heads of slices 1 to 8 and of the whole-change review it exited 1 with one error (the quotation at `tests/view/run-screen-state.test.mjs:309`), fixed by fix 1.
- Each own-work check of the agents and the reviewers' checks are in the reports (commands and exit codes): `reports/slice-N-executor-report.md`, `reports/fix-1-report.md`, `reports/review-whole-report.md`, `reports/review-fix-1-report.md`. States in the real game recorded before and after: 11 for slice 6, 13 more for slice 7, 8 for fix 1 (computed styles of every element with `::before` and `::after`; the only differences were the new `<link>` elements, none on the kitchen-sink page); no screenshot was shown or kept. Not reached in the game, covered by the order script alone: the end-of-run window after a live completion, a blocked account, an earning loop and its report, a solved map, the failure panel of the card, hover and focus states, motion, the list of accounts and the waiting screen.
- Not run on this code (blocked): the return step, and the reconciliation with the target branch (nothing to bring: `origin/main` is an ancestor of the head). CI: the pull request runs the one command in `.github/workflows/tests.yml`; its result stands on the request's page and was not waited for.
- The form check's last run: pending; the check of private paths on the description and on the copy of the record, the check of image files and the remarks check on the original and on the copy: pending, filled in by the edit that adds the record's link.
- Working copies left: none. Directories of earlier tasks kept: none.

## Foundation entries

- D-421 (new, `row 1`): the shared stylesheet keeps the base rules, the one `:focus-visible` rule, the menu bar, the rows of sentences, the shared controls and what the kitchen-sink page draws besides the controls, and each screen and part used by several screens has a stylesheet file of its own with a `<link>` of its own, with no change of the build; fix 1 adds the exception for the common layout and for rules that cannot be divided without changing their text, which review N1 finds too wide.
- D-408 (changed, `row 2`): a new screen also adds its stylesheet and its `<link>`.
- D-407 (changed, `row 3`): the screen Przejście and its program panel read the question and the end-of-run window from the state of the screen Przejście and no game-view method tells them to show either; its example of compliance was rewritten (`the cycle's`, To do 7) and, after fix 1, its *Verification* says again that the window is closed through the game view.
- D-43 (changed, `the cycle's`, To do 8): the icon on each plaque of a discovery in the scene is drawn in `text-strong`, where no text stands beside it; named after the list of three places so that eight `decision:` quotations in five test files stay valid.
- No new topical section of the decision log. No invariant, glossary term or part-map entry. No invariant test changed; tests holding a sentence by a line `decision:` were added in `tests/view/run-screen-state.test.mjs` (D-407, D-371, D-311, D-368, D-324) and changed in `tests/view/run-screen.test.mjs`.

## Minor findings

none

## Findings outside the task's scope

- O1, found by the review of the whole change: "D-40 still lists three places where an icon with no text beside it stands in `text-strong`." D-40's first paragraph names the badge, the flying icon and the drawing of the map, and not the plaque of a discovery, which D-43 now names; D-40 is not wrong (it lists, it does not say "only"), and To do 8 changes D-43 alone. The place: `foundations/decisions.md`, D-40. (Findings outside the task's scope, 1; For you to decide, 3.)

## Course of the cycle

- **Task and sources:** the independent task "loop2: porządki widoku po przejściu na React" (Status `ready for cycle`, accepted 2026-11-16): the screen Przejście reads its state, the audit of the two tables of files, the split of the stylesheet, the comment of `email-status.ts`, the styleguide rule, the places naming `styles.css`, and To do 7 and 8 from the review of the screen Wiedza; sources: the settlements of rows 1–3, the answers of questions 1–9, the base `7ba7a116` (merge of #144).
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`, not moved by the task; the gate ran on the head with that pin.
- **Spec:** none — the task leaves no open design choice.
- **Route:** planned slices (three areas in two parts, each large); no discarded attempt, no slice returned too large; one slice file (`run-screen-reading.ts`) the plan did not name was kept by the review.
- **Plan:** `plan.md` with 8 slices and 5 foundation entries (`plan-size.md`: every slice fits); the orchestrator changed the class of slices 3, 7 and 8 to `same`.
- **Choices:** 7 questions and autonomous choices in the questions table of the record (Q1–Q7), besides the 11 choices of the plan.
- **Blocking findings left:** N1 of the review of fix 1 — `foundations/decisions.md`, D-421's second and third binding sentences (`f8621033`), and `guidelines/styleguide-browser-view.md` lines 361–366 (`2af9b3ed`): the exception ("a rule whose selector list names classes of more than one screen") covers four rules of `src/browser/credits.css` (lines 12–35) that stand in the credits' own file, and the next sentence ("Every other screen …") reads as if the screens behind the exception had no stylesheet; the reason: the fix wrote the exception without the qualification "that is no part of its own" that the reviewer's route carried; what the fix tried: route (a), the exception named in D-421 and the styleguide and the frames rule moved whole into `styles.css`; the reviewer's fix for it: qualify the criterion with "that belongs to no part with a stylesheet of its own" in both places and write "Each screen and every other part that several screens use has a stylesheet of its own".
- **Record:** pending, linked by the SHA of the commit that adds it.
