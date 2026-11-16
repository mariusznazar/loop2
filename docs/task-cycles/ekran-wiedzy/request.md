**State: draft** — the record of the cycle is not committed yet; three items under "Fix or let through" wait for your answer, and the rest is for you to accept by merging.

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

1. One list in the written decision about the menu bar and the screens is one screen short. It says the tests open „Siedziba, Postać, Mapy, Programy and Przejście” at their addresses, and the tests now open „Wiedza” too. The sentence is not false, only incomplete, and it changes nothing for the player; whoever reads the decision log later finds a list that does not match what the tests do. I left it as the task told me to: the task says that part of the entry stays as it is, so changing it needs your agreement. Fixing it in this request costs one more round of correction with a review, which is one phrase; making a task of it leaves the list as it is; letting it through accepts a list that is one screen short. I recommend fixing it in this request, since you have said that a written entry should not stay out of date and the fix is one phrase. Fix it in this request, make a task of it, or let it through? (Minor findings, 1)
2. The new decision about the screen Wiedza has four binding sentences in its first paragraph, and the form of a decision asks for one to three. Nothing in it is false or unclear, and the player sees nothing of it; the cost falls on the next person who edits the entry, who meets a paragraph longer than the form allows. One sentence can move to a paragraph of its own without changing a word. Doing it here costs one more round of correction with a review; making a task of it leaves the paragraph as it is; letting it through accepts the long paragraph. I recommend letting it through, since it is a matter of form only and every sentence is true. Fix it in this request, make a task of it, or let it through? (Minor findings, 2)
3. The review of the whole change read 38 of the 81 decisions it selected whole, and read the rest by their binding sentences; six of those it named as read only in part, all about the scene and about discoveries (what the scene shows while time stands still, the effects, the tint, how a discovery writes into the program). The one thing this change adds to the scene is one more plaque of the same kind as the others, the decision it changes was read whole, and a test breaks if the plaque is removed. If a rule of the scene was missed, the player would see a plaque that looks wrong at the first attack. Having a fresh reviewer read those six whole costs one more review; letting it through accepts the gap. I recommend letting it through, since the change to the scene is a few lines and its test was checked by breaking the code on purpose. Read them in this request, make a task of it, or let it through? (Checks, 6)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. The row that opens a tree is a bordered button with a small arrow and the tree's name and „{n} gałęzi” in its text, not a full-width row with the count set apart on the right as in the old Loop. The task left to the cycle what folds a tree open; I took the game's shared button, the way the rule list and the trip plan already fold, since it needs no new control and no new sample page. I did not take the browser's own folding element, because it would be a second kind of control beside the shared buttons, nor a new shared control, which would add a component and its samples for one row. Changing it later is one component in one place.
5. The task said the game has no way to decline a counted noun and asked to add one; the game already had one, in the program editor's module. I reused it for the four nouns of the screen and moved it to a module of its own, so the game now has one rule for declining a counted noun in one place named for it; nothing the player sees differs from what the task asked. Another way was to write a second rule beside the first, which the task's premise would have led to; I did not, because two rules for one thing drift apart.
6. The new decision about the screen Wiedza has one more binding sentence than the task gave: every thing of the Understanding stands on the screen with its icon from the game's data and its name, and a creature has its icon in the data, the wolf's `wolf-head`. The task's own words in „To do” and in the first settlement ask for it, but the entry I was told to write did not hold it, and the review found that a later change could drop the icons from the screen without breaking any written rule. I took the words from the task and added nothing. English: „Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data, the wolf the icon `wolf-head` from game-icons.net, as in loop.” (Foundation entries, 1)
7. In the reason of that decision I changed one sentence from the wording you approved in the definition. The approved wording said „the player sees it nowhere today”, which stops being true the day this change is merged. It now says „before this screen the player saw it nowhere, so after losing a character the player saw only what was lost and not what stayed”. The task asked for the approved wording word for word; I changed it because you said that an entry should not stand out of date. Another way was to keep the approved words and leave a false sentence after the merge. (Foundation entries, 1)
8. I corrected three sentences of other written decisions that this change made untrue, which the task did not list: the check of the address decision said „seven addresses” and now says „eight”; the example in the decision about acts of the player said „a new act of the screen Wiedza”, and the screen has no act, so it now says „a new act of a screen”; and the decision that rejected a fourth item „Konta” on the menu bar now says „one more item”, since the bar holds four. Each is a word or a phrase; another way was to leave them, which would have left each untrue. (Foundation entries, 2)
9. I wrote one fact about the world outside the repository: the page of the icon `wolf-head` on game-icons.net names it „Wolf head icon”. The task asked for it (the title of the icon is read from its page and kept as a fact the icon credit rests on), and its source, the page and an archived copy of it, were read by the author and by me. (Foundation entries, 5)
10. Changed tests that hold a sentence of a written decision: the test that every icon file has its credit now also requires the wolf's credit (title, author and page), and about ten test files that cite the changed sentences of the decisions about the menu bar, the card of a map and the icon of an action carry the new wording of the sentence they cite; no assertion was loosened for that. The other tests of the change are new and cite the new decision. (Foundation entries, 6)

## Cost

About 1 hour 9 minutes of working time across the cycle's turns up to the opening of the request, plus 15 minutes for the full run of tests (909 seconds), during which the cycle only waited; 147 million tokens counted with cache reads (117 million by Sonnet, 30 million by Opus, which the reviewers ran on). Two reviews failed and were fixed once each: the review of the whole change (three blocking findings, all in the written decisions) and the review of the step that compares the decisions with the code (one blocking finding, a sentence about the menu bar), and each fix then passed its review. The table of stages is in the cycle's record (link after the record is committed).

## How to merge

Merge with a merge commit that keeps the commits (the repository's way), since the link to the record of the cycle survives only then.

<details>
<summary>W twoim języku</summary>

**Stan: wersja robocza** — zapis cyklu nie jest jeszcze zacommitowany; trzy punkty w „Napraw albo przepuść” czekają na twoją odpowiedź, a resztę przyjmujesz przez scalenie.

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

1. Jedna lista w zapisanej decyzji o pasku menu i ekranach jest o jeden ekran za krótka. Mówi, że testy otwierają „Siedziba, Postać, Mapy, Programy i Przejście” pod ich adresami, a testy otwierają teraz także „Wiedza”. Zdanie nie jest fałszywe, tylko niepełne, i dla gracza nic nie zmienia; kto później czyta dziennik decyzji, trafia na listę, która nie zgadza się z tym, co robią testy. Zostawiłem ją, jak kazało zadanie: zadanie mówi, że ta część wpisu zostaje bez zmian, więc zmiana wymaga twojej zgody. Poprawka w tym zgłoszeniu to kolejna runda poprawek z przeglądem, czyli jedna fraza; zadanie na później zostawia listę, jak jest; przepuszczenie przyjmuje listę o jeden ekran za krótką. Polecam poprawić w tym zgłoszeniu, bo mówiłeś, że zapisany wpis nie ma zostawać nieaktualny, a poprawka to jedna fraza. Poprawić w tym zgłoszeniu, zrobić z tego zadanie, czy przepuścić? (Drobne uwagi, 1)
2. Nowa decyzja o ekranie Wiedza ma w pierwszym akapicie cztery zdania wiążące, a forma decyzji prosi o jedno do trzech. Nic w niej nie jest fałszywe ani niejasne, a gracz niczego z tego nie widzi; koszt ponosi następna osoba edytująca wpis, która trafia na akapit dłuższy, niż pozwala forma. Jedno zdanie można przenieść do osobnego akapitu bez zmiany słowa. Zrobienie tego tutaj to kolejna runda poprawek z przeglądem; zadanie na później zostawia akapit, jak jest; przepuszczenie przyjmuje długi akapit. Polecam przepuścić, bo to sprawa samej formy, a każde zdanie jest prawdziwe. Poprawić w tym zgłoszeniu, zrobić z tego zadanie, czy przepuścić? (Drobne uwagi, 2)
3. Przegląd całej zmiany przeczytał w całości 38 z 81 wybranych decyzji, a resztę przez ich zdania wiążące; sześć z nich nazwał przeczytanymi tylko częściowo, wszystkie o scenie i o odkryciach (co scena pokazuje, gdy czas stoi, efekty, odcień światła, jak odkrycie wpisuje się do programu). Jedyna rzecz, którą ta zmiana dodaje do sceny, to jeszcze jedna plakietka tego samego rodzaju co inne, decyzję, którą zmienia, przeczytano w całości, a test pada, gdy plakietkę usunąć. Gdyby przeoczono regułę sceny, gracz zobaczyłby przy pierwszej napaści plakietkę, która wygląda źle. Przeczytanie tych sześciu w całości przez nowego recenzenta to jeszcze jeden przegląd; przepuszczenie przyjmuje lukę. Polecam przepuścić, bo zmiana w scenie to kilka linii, a jej test sprawdzono przez celowe zepsucie kodu. Przeczytać w tym zgłoszeniu, zrobić z tego zadanie, czy przepuścić? (Sprawdzenia, 6)

#### Akceptujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś ci nie odpowiada, powiedz który.

4. Wiersz, który rozwija drzewo, to przycisk z ramką, z małą strzałką, nazwą drzewa i „{n} gałęzi” w tekście, a nie wiersz na całą szerokość z licznikiem po prawej jak w starym Loop. Zadanie zostawiło cyklowi wybór, czym rozwija się drzewo; wziąłem wspólny przycisk gry, tak jak już zwija się lista reguł i plan wyjścia, bo nie wymaga nowej kontrolki ani nowej strony próbek. Nie wziąłem własnego elementu przeglądarki do zwijania, bo byłby drugim rodzajem kontrolki obok wspólnych przycisków, ani nowej wspólnej kontrolki, która dodałaby komponent i jego próbki dla jednego wiersza. Zmiana później to jeden komponent w jednym miejscu.
5. Zadanie mówiło, że gra nie ma sposobu odmiany policzonego rzeczownika, i kazało go dodać; gra już go miała, w module edytora programu. Użyłem go dla czterech rzeczowników ekranu i przeniosłem do własnego modułu, więc gra ma jedną regułę odmiany w jednym miejscu, nazwanym od niej; nic, co widzi gracz, nie różni się od tego, o co prosiło zadanie. Inna droga to druga reguła obok pierwszej, do której prowadziłaby przesłanka zadania; nie wybrałem jej, bo dwie reguły jednej rzeczy się rozjeżdżają.
6. Nowa decyzja o ekranie Wiedza ma jedno zdanie wiążące więcej, niż dało zadanie: każda rzecz Zrozumienia stoi na ekranie z ikoną z danych gry i nazwą, a stworzenie ma w danych ikonę, wilk `wolf-head`. Zadanie prosi o to własnymi słowami w „To do” i w pierwszym ustaleniu, ale wpis, który miałem napisać, tego nie zawierał, a przegląd stwierdził, że późniejsza zmiana mogłaby zabrać ikony z ekranu, nie łamiąc żadnej zapisanej reguły. Wziąłem słowa z zadania i nic nie dodałem. Po angielsku: „Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data, the wolf the icon `wolf-head` from game-icons.net, as in loop.” (Wpisy fundamentu, 1)
7. W uzasadnieniu tej decyzji zmieniłem jedno zdanie względem brzmienia, które zatwierdziłeś w definicji. Zatwierdzone brzmienie mówiło „the player sees it nowhere today” (gracz nigdzie tego dziś nie widzi), co przestaje być prawdą w dniu scalenia tej zmiany. Teraz mówi „before this screen the player saw it nowhere, so after losing a character the player saw only what was lost and not what stayed” (przed tym ekranem gracz nigdzie tego nie widział, więc po stracie postaci widział tylko to, co stracił, a nie to, co zostało). Zadanie prosiło o zatwierdzone brzmienie słowo w słowo; zmieniłem je, bo mówiłeś, że wpis nie ma stać nieaktualny. Inna droga to zostawić zatwierdzone słowa i fałszywe zdanie po scaleniu. (Wpisy fundamentu, 1)
8. Poprawiłem trzy zdania innych zapisanych decyzji, które ta zmiana uczyniła nieprawdziwymi, a których zadanie nie wymieniało: sprawdzenie decyzji o adresach mówiło „seven addresses” (siedem adresów), a mówi „eight” (osiem); przykład w decyzji o akcjach gracza mówił „a new act of the screen Wiedza” (nowa akcja ekranu Wiedza), a ekran nie ma akcji, więc mówi „a new act of a screen” (nowa akcja ekranu); a decyzja, która odrzuciła czwartą pozycję „Konta” w pasku menu, mówi teraz „one more item” (jedna pozycja więcej), bo pasek ma cztery. Każda to słowo albo fraza; inna droga to zostawić je, co zostawiłoby każde nieprawdziwe. (Wpisy fundamentu, 2)
9. Zapisałem jeden fakt o świecie poza repozytorium: strona ikony `wolf-head` na game-icons.net nazywa ją „Wolf head icon”. Zadanie o to prosiło (tytuł ikony czyta się z jej strony i trzyma jako fakt, na którym opiera się podpis autora ikony), a jego źródło, stronę i jej zarchiwizowaną kopię, przeczytali autor i ja. (Wpisy fundamentu, 5)
10. Zmienione testy, które trzymają zdanie zapisanej decyzji: test, że każdy plik ikony ma swój podpis autora, wymaga teraz też podpisu wilka (tytuł, autor i strona), a około dziesięciu plików testów, które cytują zmienione zdania decyzji o pasku menu, karcie mapy i ikonie czynności, ma nowe brzmienie cytowanego zdania; żadne sprawdzenie nie zostało przy tym osłabione. Pozostałe testy tej zmiany są nowe i cytują nową decyzję. (Wpisy fundamentu, 6)

### Koszt

Około 1 godziny 9 minut czasu pracy w turach cyklu do otwarcia prośby, plus 15 minut pełnego przebiegu testów (909 sekund), podczas których cykl tylko czekał; 147 milionów tokenów z odczytami z pamięci podręcznej (117 milionów Sonnet, 30 milionów Opus, na którym działali recenzenci). Dwa przeglądy dały `FAIL` i każdy poprawiono raz: przegląd całej zmiany (trzy uwagi blokujące, wszystkie w zapisanych decyzjach) i przegląd kroku, który porównuje decyzje z kodem (jedna uwaga blokująca, zdanie o pasku menu); po każdej poprawce przegląd przeszedł. Tabela etapów jest w zapisie cyklu (odnośnik po zacommitowaniu zapisu).

### Jak scalić

Scal commitem scalającym, który zachowuje commity (tak jak w tym repozytorium), bo odnośnik do zapisu cyklu przeżywa tylko wtedy.

</details>

## Technical changes

Five commits on `task/ekran-wiedzy` over the base `6caa013e` (`origin/main`), 37 files in all (+1348 −152):

- `11164840` (feat) — the screen: `src/browser/view/knowledge-screen.tsx` (React, the two areas, open trees held in the component's state), `knowledge-lines.ts` (the pure texts, groups and counters), `knowledge-entry.ts` (one entry of the table, `lives: "while-shown"`), the entry's one line and import in `game-view.ts`, the kind `knowledge` and `#/wiedza` in `screen-address.ts`, the item in `menu-bar.tsx`, 104 lines in `styles.css` (tokens only); the wolf: `icon` and `iconTitle` in `src/browser/sim/data/creatures.ts`, `assets/icons/wolf-head.svg`, `ICON_CREDITS["wolf-head"]` in `credits.ts`, `credit-lines.ts` crediting creatures, `plaquesOf` in `scene-picture.ts` taking the creature's icon, `AttackerLines.icon` in `map-lines.ts` and the icon in `maps-screen.tsx`; the foundation entries (D-416, D-280, D-281, D-291, D-322, D-327, the environment fact, `icon-credits` *Rests on*); the tests of all that.
- `caa13ffd` (docs) — the styleguide: the rule on the menu bar names „Wiedza”, the new rule „The screen Wiedza” gives the roles of its parts, the scene rule counts the creature among the things of a discovery with an icon in the data.
- `b67568aa` (fix, round 1) — D-416 *Verification* (the keyboard moved to what an agent compares), *Rationale* (the sentence that stays true), the one more binding sentence; `countedName` moved to `src/browser/view/counted-name.ts` with its two tests to `tests/view/counted-name.test.mjs`; the registry test on a stand-in table removed and the real entry's folding tested through the game in `tests/view/account-screen.test.mjs`.
- `42e15a5d` (docs, return step) — D-409's example.
- `45a7caf4` (docs, fix round 2) — D-280's *Rejected*: „one more item”.

The tree the gate ran on is `45a7caf4`; no merge of the target branch was needed (`origin/main` = `6caa013e` is an ancestor of the head).

## Checks

1. **The gate:** `python -B .the-way/task-cycle/gate_times.py --output docs/task-cycles/ekran-wiedzy/gate_times.md -- npm.cmd test` on `45a7caf4`, exit 0, 909.407 s (run 1 of 1, started 2026-11-16 13:06:15 UTC on the signal `start` of the adviser of the day): Node tests 2557 passed, 0 failed, 0 skipped; Python tests 86 + 79 + 253 + 261 = 679 in four directories, every directory passed (Docker answered, the container tests ran); foundation check `0 errors`; check of the instruction files `0 error, 139 warn, 7 info`. No check failed or did not run. Nothing failed on the base: the list was taken from the final gate of the merged cycle of `6caa013e` (`docs/task-cycles/skill-scen-pikselowych/cycle.md`, commit `58bbac9c`), which had no failing check; the base is a merge commit whose tree equals the tree of its second parent, so no gate ran on it.
2. **Also on the final tree:** `python -B .the-way/elements/common/foundation_check.py` without `--skip-test-citations`, exit 0, `0 errors`, no `listed:` line; `python -B .the-way/task-cycle/review_reminder.py origin/main`, exit 0, `merges: 27`, `threshold: 60`, `reminder: no`; no descriptive `TODO` stands in the invariants file or the decision log.
3. **Own-work checks:** the author's, with command and exit code each, in `reports/author-report.md`, `reports/fix-1-report.md`, `reports/return-step-report.md` and `reports/fix-2-report.md`: typecheck, eslint, prettier, about forty focused test files, 11 mutations of the new behaviour (all caught), and a run of the screen in the real game (Tab, Enter and Space opening a tree, leaving and returning, a 640 px window, the wolf's plaque at the first attack, the card of a map) with no console error. The reviewers' checks in the four review reports, each with its own mutations (5 and 2, all caught) and, for the icon file, a rebuild of the SVG from its source byte for byte and a reading of the icon's page.
4. **User-interface states and screenshots:** five screenshots, a new game, a composed Understanding with open trees, a 640 px window, the stop at the first attack and the card of a map, in the public screenshots repository on the branch `loop2/ekran-wiedzy` at commit `0904a1fd6dc49e4f18897ac45949468f9b5a29db`; the reviewer of the whole change looked at all five. Not looked at in a browser by anyone: the screen for an account with the owner role (the bar is the same by code and by test), and the plaque's motion (the final frame was seen, the motion is the existing effect with one more plaque).
5. **Not run or unchecked:** the reviewer of the whole change did not run the game itself and did not run the container-image test (the gate did, exit 0); StrykerJS on the creature data file made no mutants, so it gave no result (the new fields are held by a deep-equality test). The archived copy of the icon's page that the new fact cites could not be read by that reviewer (HTTP 429, three times); the orchestrator read it once afterwards and its heading is „Wolf head icon”, author Lorc.
6. **The incomplete reading** (item 3 of the decisions above): the review of the whole change listed as read only in part D-316 (its reasoning and rejected ways unread) and as read by binding sentence only D-320, D-121, D-312, D-317 and D-315; the glossary entry for the Understanding was not read whole, and neither was `ui_check.md`.
7. **Form check, private paths, remarks, image check:** to be written after the record's copy is committed.
8. **Working copies left:** none of an agent. The author's start of the game left `.runs/local-start/` in the worktree, the database a start of the game makes by itself, which the next start removes.
9. **Directories of earlier tasks kept:** none.

## Foundation entries

Topical section of the decision log opened: „Browser view: screens, navigation and their code” (which screens the game has, how the player moves between them and how the screens are built in React) holds the new decision.

1. D-416 (new, `projected`; its binding sentence on icons and the changed sentence of its *Rationale* are `the cycle's`) — the screen Wiedza shows the actions, items and creatures in the Understanding and the skill trees to read, with no levels and no buying; its left area, right area and counters are as the task gives; each thing stands with its icon from the data and its name, and the wolf has the icon `wolf-head`.
2. D-280 (changed, `projected`) — the game has the screen Wiedza and the menu bar the item „Wiedza” after „Programy”; the example of a bar of four items in *Verification* corrected; *Rejected* (`the cycle's`) now says „one more item „Konta””. D-281 (changed, `projected`; „seven” to „eight addresses” is `the cycle's`) — `#/wiedza` names the screen Wiedza. D-409 (`the cycle's`, an example only) — a new act of a screen, not of the screen Wiedza.
3. D-291 (changed, `row 1`) — an action's icon stands also beside the action on the screen Wiedza.
4. D-322 (changed, `row 2`) — a discovery of a creature alone now has a plaque too; *Verification* adds the plaque with the wolf's head at the stop at the first attack. D-327 (changed, `row 3`) — „Czyha” holds the creature with its icon, and the card departs from the predecessor game's in four things, not five.
5. Environment fact `game-icons-wolf-head-title` (`the cycle's`) — the page of Lorc's icon `wolf-head` on game-icons.net names it „Wolf head icon”; `icon-credits` (`projected`) — its *Rests on* gains that fact; its sentence and method are unchanged.
6. Invariant tests and citations altered: `tests/invariants/test_icon_credits.py` (title and author of the wolf's icon added to its lists, so the test now fails without the wolf's credit; seen failing once and passing after); `decision:` lines changed to the new wording of D-280, D-291 and D-327 in `account-screen`, `menu-bar`, `screen-address`, `screen-registry`, `now-lines`, `rule-editor`, `scene`, `map-lines` and `maps-screen` tests, and new lines for D-416, D-281, D-277 and D-27 in the tests of the screen, the addresses and the icons; no surface or *Violated* mark changed. D-27, D-282 and D-277 stand as they were (the task says so).

## Minor findings

1. **m2, within the task** (review of the whole change; it remains after fix 1, the reviewer of the fix kept it as Minor and judged the author's evidence to hold). Reviewer's words: „`foundations/decisions.md:4156`–`:4157`: "the game opening the screens Siedziba, Postać, Mapy, Programy and Przejście at their addresses". The binding sentence now names six screens, and the test „a reload at each of the eight addresses opens its screen and leaves the address as it is” in `tests/view/account-screen.test.mjs` opens Wiedza too. The sentence is not false, only short of what the tests hold. The task tells the change to keep D-280's *Verification* as it stands apart from the four-item example (task line 131), so a fix needs the human's agreement. The cost of leaving it is one screen missing from a list a reviewer reads.”
2. **n1, within the task** (found by the review of fix 1). Reviewer's words: „`foundations/decisions.md:4410`. `.the-way/elements/decisions/template.md:117`–`:119` says "One to three sentences answer the question of the heading, in the first paragraph under it. A part of another question … has its own paragraph after that one, also of one to three sentences". The paragraph now holds four: the definition's sentence, the left area, the icons and the right area. What the entry says agrees with the code, and no sentence would be misread because of the departure, so by WAY-364 this is Minor. `foundation_check.py` does not count the sentences, which is why it passes. A fix that keeps every word: move the right-area sentence into a paragraph of its own; that paragraph would answer a part of the question, as the counters' paragraph already does; or move the icon sentence into the counters' paragraph, which holds two sentences.”

## Findings outside the task's scope

1. D-43's binding sentence (the review of the whole change, „declined to judge”): „D-43's binding sentence lists where an icon with no text beside it takes `text-strong` (the badge, the flying icon, the drawing of the map) but not the plaque of a discovery. That predates this change, and the wolf's plaque is one more plaque of the same kind: outside the task.” No place in the code is named.
2. D-407's example (the same review): „D-407's complies example, "a new screen … whose factory receives … the memory of its unfolded trees, shared with another screen", describes a shape this screen does not take. Its open trees live in the component, which D-407's own last clause and D-416's "each entering … starts with the trees folded" require. The example predates the task and is no requirement of it: outside the task.” Place: the *Verification* of D-407 in `foundations/decisions.md`.

No check of a file outside the task's parts failed in a cycle run and passed again.

## Course of the cycle

- **Task and sources:** MVP2 task 22 of the plan (`plan_mvp2_loop2.md`, item `ekran-wiedzy`): the player enters the screen Wiedza from the menu, which shows the discovered actions, items and creatures and the skill trees to read, with no levels and no buying. Project definition approved 2026-11-13 (fingerprint `e6c61098`); the task accepted by the human 2026-11-13, `Status: ready for cycle`; dependency 13 done; the frozen copy has sha256 `453f4e92f69e`. The note of 2026-11-13 in the task about the split of the view's driver is satisfied by the registry of screens and D-408, already merged.
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`; the task did not move it.
- **Spec:** none: no open design choice; what folds a tree open was left to the cycle by the task and made by the author.
- **Route:** one author without a plan, class `same` (sonnet), because the change crosses four parts and a trust boundary but the task settles the design; it was not returned for size.
- **Plan:** none.
- **Choices:** 10 rows in the questions table of the record (link after the record is committed); 2 of them are choices beyond the task (items 4 and 5 above), 3 more are rulings about wording the human sees (items 6, 7, 8).
- **Blocking findings left:** none.
- **Record:** link after the record's copy is committed.
