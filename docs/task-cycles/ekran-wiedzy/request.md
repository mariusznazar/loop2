**State: ready** — corrected for your answer to an item of the request; nothing waits for your answer now, and the rest is for you to accept by merging.

## What you will see

The menu bar now has a fourth item, „Wiedza”, after „Programy”, with no icon, and it is marked when you are on that screen. The address `#/wiedza` opens the screen, also after you reload the page. The screen has a heading „Wiedza” and two areas, one under the other in a narrow window.

On the left, „Zrozumienie · {n} poznanych rzeczy” counts the actions, items and creatures the player has discovered, together (not conditions, not skill trees), and declines the noun by the number: „1 poznana rzecz”, „3 poznane rzeczy”, „13 poznanych rzeczy”. Below it stand up to three groups, „Czynności · {n}”, „Przedmioty · {n}” and „Stworzenia · {n}”, each in the order of discovery, newest last, each thing with its icon and its name; a group with nothing in it does not stand, and the campfire stands among the items, as the game records it. On the right, „Umiejętności · {n} drzew” lists the skill trees the player has discovered, in the same order as on the character screen, each as a folded row with its name and „{n} gałęzi”. A click, or Enter or Space on the row, opens it and shows each branch with its name, „{n} stopni”, its description and the price of every step. Each time you come back to the screen the trees are folded again. The right area does not stand until the first tree is discovered. There are no levels, no practice, no points, no „Kup”, and the screen changes nothing in the game.

The wolf now has an icon, the head of a wolf from game-icons.net, the one the old Loop used. It stands beside the wolf on the new screen, on a plaque that comes out of the forest over the clearing at the first attack (next to the wolf that already stands beside the mage), and in the part „Czyha” of a map's card. The folded section of credits „Autorzy grafiki” credits it.

A new game already knows „Eksploruj” from the first second, so the left area of a new game shows „1 poznana rzecz” and no right area; the empty left area exists only in a game built by hand in a test.

Screenshots the author took in the running game (a made-up account), kept in the settled place for them:

![Wiedza with a composed Understanding and three trees open](https://github.com/mariusznazar/screenshots/blob/0904a1fd6dc49e4f18897ac45949468f9b5a29db/loop2/ekran-wiedzy/wiedza-rich.png?raw=true)
![The stop at the first attack: four plaques, the wolf's head among them](https://github.com/mariusznazar/screenshots/blob/0904a1fd6dc49e4f18897ac45949468f9b5a29db/loop2/ekran-wiedzy/wiedza-plaque.png?raw=true)
![The card of a map with the wolf's icon in „Czyha”](https://github.com/mariusznazar/screenshots/blob/0904a1fd6dc49e4f18897ac45949468f9b5a29db/loop2/ekran-wiedzy/mapy-czyha.png?raw=true)
![Wiedza in a window 640 px wide, the areas one under the other](https://github.com/mariusznazar/screenshots/blob/0904a1fd6dc49e4f18897ac45949468f9b5a29db/loop2/ekran-wiedzy/wiedza-narrow.png?raw=true)
![Wiedza of a new game](https://github.com/mariusznazar/screenshots/blob/0904a1fd6dc49e4f18897ac45949468f9b5a29db/loop2/ekran-wiedzy/wiedza-new-game.png?raw=true)

### Underneath

The screen is one more entry in the game's table of screens, built in React, and it only reads the game's state. The creature data gains an icon and its title, and the game's one rule for declining a counted noun now lives in a module of its own.

## For you to decide

### Needed from you

none

### Fix or let through

none

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

1. The row that opens a tree is a bordered button with a small arrow and the tree's name and „{n} gałęzi” in its text, not a full-width row with the count set apart on the right as in the old Loop. The task left to the cycle what folds a tree open; I took the game's shared button, the way the rule list and the trip plan already fold, since it needs no new control and no new sample page. I did not take the browser's own folding element, because it would be a second kind of control beside the shared buttons, nor a new shared control, which would add a component and its samples for one row. Changing it later is one component in one place.
2. The task said the game has no way to decline a counted noun and asked to add one; the game already had one, in the program editor's module. I reused it for the four nouns of the screen and moved it to a module of its own, so the game now has one rule for declining a counted noun in one place named for it; nothing the player sees differs from what the task asked. Another way was to write a second rule beside the first, which the task's premise would have led to; I did not, because two rules for one thing drift apart.
3. The new decision about the screen Wiedza has one more binding sentence than the task gave: every thing of the Understanding stands on the screen with its icon from the game's data and its name, and a creature has its icon in the data, the wolf's `wolf-head`. The task's own words in „To do” and in the first settlement ask for it, but the entry I was told to write did not hold it, and the review found that a later change could drop the icons from the screen without breaking any written rule. I took the words from the task and added nothing. English: „Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data, the wolf the icon `wolf-head` from game-icons.net, as in loop.” (Foundation entries, 1)
4. In the reason of that decision I changed one sentence from the wording you approved in the definition. The approved wording said „the player sees it nowhere today”, which stops being true the day this change is merged. It now says „before this screen the player saw it nowhere, so after losing a character the player saw only what was lost and not what stayed”. The task asked for the approved wording word for word; I changed it because you said that an entry should not stand out of date. Another way was to keep the approved words and leave a false sentence after the merge. (Foundation entries, 1)
5. I corrected three sentences of other written decisions that this change made untrue, which the task did not list: the check of the address decision said „seven addresses” and now says „eight”; the example in the decision about acts of the player said „a new act of the screen Wiedza”, and the screen has no act, so it now says „a new act of a screen”; and the decision that rejected a fourth item „Konta” on the menu bar now says „one more item”, since the bar holds four. Each is a word or a phrase; another way was to leave them, which would have left each untrue. (Foundation entries, 2)
6. I wrote one fact about the world outside the repository: the page of the icon `wolf-head` on game-icons.net names it „Wolf head icon”. The task asked for it (the title of the icon is read from its page and kept as a fact the icon credit rests on), and its source, the page and an archived copy of it, were read by the author and by me. (Foundation entries, 5)
7. Changed tests that hold a sentence of a written decision: the test that every icon file has its credit now also requires the wolf's credit (title, author and page), and about ten test files that cite the changed sentences of the decisions about the menu bar, the card of a map and the icon of an action carry the new wording of the sentence they cite; no assertion was loosened for that. The other tests of the change are new and cite the new decision. (Foundation entries, 6)
8. This correction answered your answer to an item of this request: you asked to fix the list of screens in the decision about the menu bar in this request and to let two other items through, and the cycle judged that the task did not require that change, since the task said to leave that part of the entry as it was, so what changed there is your choice and not a defect of the change.

## Cost

About 1 hour 15 minutes of working time across the cycle's turns in all sessions, the correction included, plus two full runs of the tests (909 and 836 seconds), during which the cycle only waited; 167 million tokens counted with cache reads (134 million by Sonnet, 32 million by Opus, which the reviewers ran on). Two reviews failed and were fixed once each: the review of the whole change (three blocking findings, all in the written decisions) and the review of the step that compares the decisions with the code (one blocking finding, a sentence about the menu bar), and each fix then passed its review; your remarks then led to one more small correction, which passed its review at once. The table of stages is in the cycle's record: https://github.com/mariusznazar/loop2/blob/<RECSHA>/docs/task-cycles/ekran-wiedzy/stages.md

## How to merge

Merge with a merge commit that keeps the commits (the repository's way), since the link to the record of the cycle survives only then.

<details>
<summary>W twoim języku</summary>

**Stan: gotowe** — poprawione po twojej odpowiedzi do punktu prośby; nic nie czeka teraz na twoją odpowiedź, a resztę przyjmujesz przez scalenie.

### Co zobaczysz

W pasku menu jest czwarta pozycja „Wiedza”, za „Programy”, bez ikony, i jest zaznaczona, gdy jesteś na tym ekranie. Adres `#/wiedza` otwiera ekran, także po odświeżeniu strony. Ekran ma nagłówek „Wiedza” i dwa obszary, w wąskim oknie jeden pod drugim.

Po lewej „Zrozumienie · {n} poznanych rzeczy” liczy razem poznane czynności, przedmioty i stworzenia (bez warunków i drzew umiejętności) i odmienia rzeczownik przez liczbę: „1 poznana rzecz”, „3 poznane rzeczy”, „13 poznanych rzeczy”. Pod spodem stoją najwyżej trzy grupy: „Czynności · {n}”, „Przedmioty · {n}” i „Stworzenia · {n}”, każda w kolejności odkrycia, najnowsza na końcu, każda rzecz z ikoną i nazwą; grupa bez rzeczy nie stoi, a ognisko stoi wśród przedmiotów, tak jak zapisuje je gra. Po prawej „Umiejętności · {n} drzew” wylicza poznane drzewa umiejętności, w tej samej kolejności co na ekranie Postać, każde jako zwinięty wiersz z nazwą i „{n} gałęzi”. Kliknięcie albo Enter lub spacja na wierszu rozwija go i pokazuje każdą gałąź z nazwą, „{n} stopni”, opisem i ceną każdego stopnia. Przy każdym wejściu na ekran drzewa są znów zwinięte. Prawego obszaru nie ma, dopóki nie poznasz pierwszego drzewa. Nie ma poziomów, wprawy, punktów ani „Kup”, a ekran niczego w grze nie zmienia.

Wilk ma teraz ikonę, głowę wilka z game-icons.net, tę samą co w starym Loop. Stoi przy wilku na nowym ekranie, na plakietce, która wychodzi z lasu nad polaną przy pierwszej napaści (obok wilka, który już stoi przy magu), i w części „Czyha” karty mapy. Zwinięta sekcja „Autorzy grafiki” podaje jej autora.

Nowa gra zna „Eksploruj” od pierwszej sekundy, więc lewy obszar nowej gry pokazuje „1 poznana rzecz” i nie ma prawego obszaru; pusty lewy obszar istnieje tylko w grze zbudowanej ręcznie w teście.

#### Pod spodem

Ekran to jeszcze jeden wpis w tabeli ekranów gry, zbudowany w React, który tylko czyta stan gry. Dane stworzeń dostają ikonę i jej tytuł, a jedyna reguła gry do odmiany policzonego rzeczownika ma teraz własny moduł.

### Do rozstrzygnięcia

#### Potrzebne od ciebie

brak

#### Napraw albo przepuść

brak

#### Akceptujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś ci nie odpowiada, powiedz który.

1. Wiersz, który rozwija drzewo, to przycisk z ramką, z małą strzałką, nazwą drzewa i „{n} gałęzi” w tekście, a nie wiersz na całą szerokość z licznikiem po prawej jak w starym Loop. Zadanie zostawiło cyklowi wybór, czym rozwija się drzewo; wziąłem wspólny przycisk gry, tak jak już zwija się lista reguł i plan wyjścia, bo nie wymaga nowej kontrolki ani nowej strony próbek. Nie wziąłem własnego elementu przeglądarki do zwijania, bo byłby drugim rodzajem kontrolki obok wspólnych przycisków, ani nowej wspólnej kontrolki, która dodałaby komponent i jego próbki dla jednego wiersza. Zmiana później to jeden komponent w jednym miejscu.
2. Zadanie mówiło, że gra nie ma sposobu odmiany policzonego rzeczownika, i kazało go dodać; gra już go miała, w module edytora programu. Użyłem go dla czterech rzeczowników ekranu i przeniosłem do własnego modułu, więc gra ma jedną regułę odmiany w jednym miejscu, nazwanym od niej; nic, co widzi gracz, nie różni się od tego, o co prosiło zadanie. Inna droga to druga reguła obok pierwszej, do której prowadziłaby przesłanka zadania; nie wybrałem jej, bo dwie reguły jednej rzeczy się rozjeżdżają.
3. Nowa decyzja o ekranie Wiedza ma jedno zdanie wiążące więcej, niż dało zadanie: każda rzecz Zrozumienia stoi na ekranie z ikoną z danych gry i nazwą, a stworzenie ma w danych ikonę, wilk `wolf-head`. Zadanie prosi o to własnymi słowami w „To do” i w pierwszym ustaleniu, ale wpis, który miałem napisać, tego nie zawierał, a przegląd stwierdził, że późniejsza zmiana mogłaby zabrać ikony z ekranu, nie łamiąc żadnej zapisanej reguły. Wziąłem słowa z zadania i nic nie dodałem. Po angielsku: „Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data, the wolf the icon `wolf-head` from game-icons.net, as in loop.” (Wpisy fundamentu, 1)
4. W uzasadnieniu tej decyzji zmieniłem jedno zdanie względem brzmienia, które zatwierdziłeś w definicji. Zatwierdzone brzmienie mówiło „the player sees it nowhere today” (gracz nigdzie tego dziś nie widzi), co przestaje być prawdą w dniu scalenia tej zmiany. Teraz mówi „before this screen the player saw it nowhere, so after losing a character the player saw only what was lost and not what stayed” (przed tym ekranem gracz nigdzie tego nie widział, więc po stracie postaci widział tylko to, co stracił, a nie to, co zostało). Zadanie prosiło o zatwierdzone brzmienie słowo w słowo; zmieniłem je, bo mówiłeś, że wpis nie ma stać nieaktualny. Inna droga to zostawić zatwierdzone słowa i fałszywe zdanie po scaleniu. (Wpisy fundamentu, 1)
5. Poprawiłem trzy zdania innych zapisanych decyzji, które ta zmiana uczyniła nieprawdziwymi, a których zadanie nie wymieniało: sprawdzenie decyzji o adresach mówiło „seven addresses” (siedem adresów), a mówi „eight” (osiem); przykład w decyzji o akcjach gracza mówił „a new act of the screen Wiedza” (nowa akcja ekranu Wiedza), a ekran nie ma akcji, więc mówi „a new act of a screen” (nowa akcja ekranu); a decyzja, która odrzuciła czwartą pozycję „Konta” w pasku menu, mówi teraz „one more item” (jedna pozycja więcej), bo pasek ma cztery. Każda to słowo albo fraza; inna droga to zostawić je, co zostawiłoby każde nieprawdziwe. (Wpisy fundamentu, 2)
6. Zapisałem jeden fakt o świecie poza repozytorium: strona ikony `wolf-head` na game-icons.net nazywa ją „Wolf head icon”. Zadanie o to prosiło (tytuł ikony czyta się z jej strony i trzyma jako fakt, na którym opiera się podpis autora ikony), a jego źródło, stronę i jej zarchiwizowaną kopię, przeczytali autor i ja. (Wpisy fundamentu, 5)
7. Zmienione testy, które trzymają zdanie zapisanej decyzji: test, że każdy plik ikony ma swój podpis autora, wymaga teraz też podpisu wilka (tytuł, autor i strona), a około dziesięciu plików testów, które cytują zmienione zdania decyzji o pasku menu, karcie mapy i ikonie czynności, ma nowe brzmienie cytowanego zdania; żadne sprawdzenie nie zostało przy tym osłabione. Pozostałe testy tej zmiany są nowe i cytują nową decyzję. (Wpisy fundamentu, 6)
8. Ta poprawka odpowiedziała na twoją odpowiedź do jednego z punktów tej prośby: kazałeś poprawić w tej prośbie listę ekranów w decyzji o pasku menu i przepuścić dwa inne punkty, a cykl uznał, że zadanie tej zmiany nie wymagało, bo zadanie kazało zostawić tę część wpisu bez zmian, więc to, co się tam zmieniło, jest twoim wyborem, a nie usterką zmiany.

### Koszt

Około 1 godziny 15 minut czasu pracy w turach cyklu we wszystkich sesjach, z poprawką, plus dwa pełne przebiegi testów (909 i 836 sekund), podczas których cykl tylko czekał; 167 milionów tokenów z odczytami z pamięci podręcznej (134 miliony Sonnet, 32 miliony Opus, na którym działali recenzenci). Dwa przeglądy dały `FAIL` i każdy poprawiono raz: przegląd całej zmiany (trzy uwagi blokujące, wszystkie w zapisanych decyzjach) i przegląd kroku, który porównuje decyzje z kodem (jedna uwaga blokująca, zdanie o pasku menu); po każdej poprawce przegląd przeszedł; twoje uwagi dały jeszcze jedną małą poprawkę, która od razu przeszła przegląd. Tabela etapów jest w zapisie cyklu: https://github.com/mariusznazar/loop2/blob/<RECSHA>/docs/task-cycles/ekran-wiedzy/stages.md

### Jak scalić

Scal commitem scalającym, który zachowuje commity (tak jak w tym repozytorium), bo odnośnik do zapisu cyklu przeżywa tylko wtedy.

</details>

## Technical changes

Six commits of the change on `task/ekran-wiedzy` over the base `6caa013e` (`origin/main`), 37 files in all (+1349 −153), and two pairs of commits that add the record of the cycle and remove it again:

- `11164840` (feat) — the screen: `src/browser/view/knowledge-screen.tsx` (React, the two areas, open trees held in the component's state), `knowledge-lines.ts` (the pure texts, groups and counters), `knowledge-entry.ts` (one entry of the table, `lives: "while-shown"`), the entry's one line and import in `game-view.ts`, the kind `knowledge` and `#/wiedza` in `screen-address.ts`, the item in `menu-bar.tsx`, 104 lines in `styles.css` (tokens only); the wolf: `icon` and `iconTitle` in `src/browser/sim/data/creatures.ts`, `assets/icons/wolf-head.svg`, `ICON_CREDITS["wolf-head"]` in `credits.ts`, `credit-lines.ts` crediting creatures, `plaquesOf` in `scene-picture.ts` taking the creature's icon, `AttackerLines.icon` in `map-lines.ts` and the icon in `maps-screen.tsx`; the foundation entries (D-416, D-280, D-281, D-291, D-322, D-327, the environment fact, `icon-credits` *Rests on*); the tests of all that.
- `caa13ffd` (docs) — the styleguide: the rule on the menu bar names „Wiedza”, the new rule „The screen Wiedza” gives the roles of its parts, the scene rule counts the creature among the things of a discovery with an icon in the data.
- `b67568aa` (fix, round 1) — D-416 *Verification* (the keyboard moved to what an agent compares), *Rationale* (the sentence that stays true), the one more binding sentence; `countedName` moved to `src/browser/view/counted-name.ts` with its two tests to `tests/view/counted-name.test.mjs`; the registry test on a stand-in table removed and the real entry's folding tested through the game in `tests/view/account-screen.test.mjs`.
- `42e15a5d` (docs, return step) — D-409's example.
- `45a7caf4` (docs, fix round 2) — D-280's *Rejected*: „one more item”.
- `ceeec9aa` (docs, correction 1) — D-280's *Verification* lists „Wiedza” among the screens the game opens at their addresses, as your remark asked.

The tree the last gate ran on is `ceeec9aa`; no merge of the target branch was needed (`origin/main` = `6caa013e` is an ancestor of the head).

## Checks

1. **The gate:** `python -B .the-way/task-cycle/gate_times.py --output docs/task-cycles/ekran-wiedzy/gate_times.md -- npm.cmd test`, first on `45a7caf4`, exit 0, 909.407 s (run 1 of 1, started 2026-11-16 13:06:15 UTC on the signal `start` of the adviser of the day), and again after the correction on `ceeec9aa`, exit 0, 836.103 s (run 1 of 1 of the correction, started 13:38:12 UTC on the signal `start`, after the cycle said it was ready), with the same counts both times: Node tests 2557 passed, 0 failed, 0 skipped; Python tests 86 + 79 + 253 + 261 = 679 in four directories, every directory passed (Docker answered, the container tests ran); foundation check `0 errors`; check of the instruction files `0 error, 139 warn, 7 info`. No check failed or did not run. Nothing failed on the base: the list was taken from the final gate of the merged cycle of `6caa013e` (`docs/task-cycles/skill-scen-pikselowych/cycle.md`, commit `58bbac9c`), which had no failing check; the base is a merge commit whose tree equals the tree of its second parent, so no gate ran on it.
2. **Also on the final tree (rerun after the correction, the same results):** `python -B .the-way/elements/common/foundation_check.py` without `--skip-test-citations`, exit 0, `0 errors`, no `listed:` line; `python -B .the-way/task-cycle/review_reminder.py origin/main`, exit 0, `merges: 27`, `threshold: 60`, `reminder: no`; no descriptive `TODO` stands in the invariants file or the decision log.
3. **Own-work checks:** the author's (the correction's: `foundation_check.py` and `check_instructions.py` exit 0, no test file run since no code or test changed), with command and exit code each, in `reports/author-report.md`, `reports/fix-1-report.md`, `reports/return-step-report.md` and `reports/fix-2-report.md`: typecheck, eslint, prettier, about forty focused test files, 11 mutations of the new behaviour (all caught), and a run of the screen in the real game (Tab, Enter and Space opening a tree, leaving and returning, a 640 px window, the wolf's plaque at the first attack, the card of a map) with no console error. The reviewers' checks in the four review reports, each with its own mutations (5 and 2, all caught) and, for the icon file, a rebuild of the SVG from its source byte for byte and a reading of the icon's page.
4. **User-interface states and screenshots:** five screenshots, a new game, a composed Understanding with open trees, a 640 px window, the stop at the first attack and the card of a map, in the public screenshots repository on the branch `loop2/ekran-wiedzy` at commit `0904a1fd6dc49e4f18897ac45949468f9b5a29db`; the reviewer of the whole change looked at all five. Not looked at in a browser by anyone: the screen for an account with the owner role (the bar is the same by code and by test), and the plaque's motion (the final frame was seen, the motion is the existing effect with one more plaque).
5. **Not run or unchecked:** the reviewer of the whole change did not run the game itself and did not run the container-image test (the gate did, exit 0); StrykerJS on the creature data file made no mutants, so it gave no result (the new fields are held by a deep-equality test). The archived copy of the icon's page that the new fact cites could not be read by that reviewer (HTTP 429, three times); the orchestrator read it once afterwards and its heading is „Wolf head icon”, author Lorc.
6. **The incomplete reading** (let through by your answer): the review of the whole change listed as read only in part D-316 (its reasoning and rejected ways unread) and as read by binding sentence only D-320, D-121, D-312, D-317 and D-315; the glossary entry for the Understanding was not read whole, and neither was `ui_check.md`.
7. **Form check, private paths, remarks, image check:** <CHECKS7>
8. **Working copies left:** none of an agent. The author's start of the game left `.runs/local-start/` in the worktree, the database a start of the game makes by itself, which the next start removes.
9. **Directories of earlier tasks kept:** none.

## Foundation entries

Topical section of the decision log opened: „Browser view: screens, navigation and their code” (which screens the game has, how the player moves between them and how the screens are built in React) holds the new decision.

1. D-416 (new, `projected`; its binding sentence on icons and the changed sentence of its *Rationale* are `the cycle's`) — the screen Wiedza shows the actions, items and creatures in the Understanding and the skill trees to read, with no levels and no buying; its left area, right area and counters are as the task gives; each thing stands with its icon from the data and its name, and the wolf has the icon `wolf-head`.
2. D-280 (changed, `projected`) — the game has the screen Wiedza and the menu bar the item „Wiedza” after „Programy”; the example of a bar of four items in *Verification* corrected; *Rejected* (`the cycle's`) now says „one more item „Konta””; *Verification* lists the screen Wiedza among the screens the game opens at their addresses (`the cycle's`, by your remark). D-281 (changed, `projected`; „seven” to „eight addresses” is `the cycle's`) — `#/wiedza` names the screen Wiedza. D-409 (`the cycle's`, an example only) — a new act of a screen, not of the screen Wiedza.
3. D-291 (changed, `row 1`) — an action's icon stands also beside the action on the screen Wiedza.
4. D-322 (changed, `row 2`) — a discovery of a creature alone now has a plaque too; *Verification* adds the plaque with the wolf's head at the stop at the first attack. D-327 (changed, `row 3`) — „Czyha” holds the creature with its icon, and the card departs from the predecessor game's in four things, not five.
5. Environment fact `game-icons-wolf-head-title` (`the cycle's`) — the page of Lorc's icon `wolf-head` on game-icons.net names it „Wolf head icon”; `icon-credits` (`projected`) — its *Rests on* gains that fact; its sentence and method are unchanged.
6. Invariant tests and citations altered: `tests/invariants/test_icon_credits.py` (title and author of the wolf's icon added to its lists, so the test now fails without the wolf's credit; seen failing once and passing after); `decision:` lines changed to the new wording of D-280, D-291 and D-327 in `account-screen`, `menu-bar`, `screen-address`, `screen-registry`, `now-lines`, `rule-editor`, `scene`, `map-lines` and `maps-screen` tests, and new lines for D-416, D-281, D-277 and D-27 in the tests of the screen, the addresses and the icons; no surface or *Violated* mark changed. D-27, D-282 and D-277 stand as they were (the task says so).

## Minor findings

The Minor finding m2 of the review of the whole change (the list of screens in D-280's *Verification*) was fixed by the correction at your answer and no longer stands.

1. **n1, within the task** (found by the review of fix 1; let through by your answer). Reviewer's words: „`foundations/decisions.md:4410`. `.the-way/elements/decisions/template.md:117`–`:119` says "One to three sentences answer the question of the heading, in the first paragraph under it. A part of another question … has its own paragraph after that one, also of one to three sentences". The paragraph now holds four: the definition's sentence, the left area, the icons and the right area. What the entry says agrees with the code, and no sentence would be misread because of the departure, so by WAY-364 this is Minor. `foundation_check.py` does not count the sentences, which is why it passes. A fix that keeps every word: move the right-area sentence into a paragraph of its own; that paragraph would answer a part of the question, as the counters' paragraph already does; or move the icon sentence into the counters' paragraph, which holds two sentences.”

## Findings outside the task's scope

1. D-43's binding sentence (the review of the whole change, „declined to judge”): „D-43's binding sentence lists where an icon with no text beside it takes `text-strong` (the badge, the flying icon, the drawing of the map) but not the plaque of a discovery. That predates this change, and the wolf's plaque is one more plaque of the same kind: outside the task.” No place in the code is named.
2. D-407's example (the same review): „D-407's complies example, "a new screen … whose factory receives … the memory of its unfolded trees, shared with another screen", describes a shape this screen does not take. Its open trees live in the component, which D-407's own last clause and D-416's "each entering … starts with the trees folded" require. The example predates the task and is no requirement of it: outside the task.” Place: the *Verification* of D-407 in `foundations/decisions.md`.

No check of a file outside the task's parts failed in a cycle run and passed again.

## Course of the cycle

- **Task and sources:** MVP2 task 22 of the plan (`plan_mvp2_loop2.md`, item `ekran-wiedzy`): the player enters the screen Wiedza from the menu, which shows the discovered actions, items and creatures and the skill trees to read, with no levels and no buying. Project definition approved 2026-11-13 (fingerprint `e6c61098`); the task accepted by the human 2026-11-13, `Status: ready for cycle`; dependency 13 done; the frozen copy has sha256 `453f4e92f69e`. The note of 2026-11-13 in the task about the split of the view's driver is satisfied by the registry of screens and D-408, already merged.
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`; the task did not move it.
- **Spec:** none: no open design choice; what folds a tree open was left to the cycle by the task and made by the author.
- **Route:** one author without a plan, class `same` (sonnet), because the change crosses four parts and a trust boundary but the task settles the design; it was not returned for size. After the request opened, correction 1 (remarks: https://github.com/mariusznazar/loop2/blob/<RECSHA>/docs/task-cycles/ekran-wiedzy/reports/correction-1-remarks.md) made the one change your answer to the first item asked for, on the reset base `47f446e0`, the request's last head; the author was resumed on the same class, and the review of the correction passed with no finding.
- **Plan:** none.
- **Choices:** 10 rows in the questions table of the record (https://github.com/mariusznazar/loop2/blob/<RECSHA>/docs/task-cycles/ekran-wiedzy/cycle.md); 2 of them are choices beyond the task (items 1 and 2 above), 3 more are rulings about wording the human sees (items 3, 4, 5).
- **Blocking findings left:** none.
- **Record:** https://github.com/mariusznazar/loop2/blob/<RECSHA>/docs/task-cycles/ekran-wiedzy/cycle.md (the copy of the record after correction 1, added by the commit `<REC8>` and removed again by the commit after it, so the target branch never holds it; the copy before the correction was `50202cc8`).
