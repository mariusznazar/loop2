---
title: "loop2: sprowadzić 20 zapisanych decyzji gry pod limit długości z the way i przestawić 63 cytaty decyzji w testach na początki zdań"
status: draft
created: 2026-11-20T11:25
updated: 2026-11-20
tags: [zadanie]
related: "the note of the Loop project in the author's private notes"
---

# loop2: sprowadzić 20 zapisanych decyzji gry pod limit długości z the way i przestawić 63 cytaty decyzji w testach na początki zdań

Status: ready for cycle
Project relation: independent
Defect introduced by: none

## Description

### Need

- Dwadzieścia zapisanych decyzji gry ma akapit zdań wiążących dłuższy, niż pozwala limit przyjęty 2026-11-20 w the way: najwyżej 3 zdania i najwyżej 300 słów w akapicie; jedna z nich, D-112, ma też 1000 słów zdań wiążących przy limicie 600 słów na wpis.
- Dziś nic tego w loop2 nie sprawdza; zacznie, gdy loop2 przypnie wersję the way, w której `foundation_check.py` liczy długość, i od tej chwili każda zmiana, która ruszy choć słowo zdań wiążących takiej decyzji, stanie na błędzie, dopóki decyzja nie zmieści się w limicie.
- Odczuwa to agent, który zmienia jedną z tych decyzji przy zwykłym zadaniu gry i musi przy okazji przebudować cały wpis, oraz Mariusz, który w przeglądzie dostaje przebudowaną decyzję w zmianie o czymś innym.
- 11 z 20 wpisów dotyczy ekranów i sceny gry, czyli miejsc, które zadania gry zmieniają najczęściej.
- 63 komentarze `decision:` w testach zaczynają cytat po kropce wewnątrz cudzysłowu; nowsza wersja the way nie bierze takiego miejsca za początek zdania, więc przy przejściu loop2 na nią testy staną na 63 błędach.

### To do

1. W `foundations/decisions.md` akapit zdań wiążących ponad limit w każdym z 19 wpisów z tabeli niżej dostaje pusty wiersz przed każdym zdaniem, które tabela podaje: spacja przed tym zdaniem staje się końcem wiersza i pustym wierszem, pozostałych wierszy akapitu nie łamie się od nowa, a żadne słowo i kolejność zdań się nie zmieniają.

   | Wpis | Nowy akapit zaczyna się od zdania, które otwiera | Na jaką część pytania odpowiada nowy akapit | Część którego pytania (ocena agenta) |
   |---|---|---|---|
   | D-04 | „The browser view draws the game only from” | z czego widok w przeglądarce rysuje grę i jak zmienia stan gry | inne pytanie |
   | D-252 | „The product logs changes of a player's account” | co gra zapisuje w logach; pierwszy akapit mówi, w jakiej formie | pytanie z nagłówka |
   | D-356 | „A human installs the watcher and its schedule” | co ustawia człowiek i kiedy żadne powiadomienie nie wychodzi | pytanie z nagłówka |
   | D-96 | „The browser constructs the game only after the server” | kiedy przeglądarka buduje grę i co widać, gdy wczytanie się nie uda | pytanie z nagłówka |
   | D-280 | „The menu bar holds at its left the game's name” | jak gracz przechodzi między ekranami; pierwszy akapit mówi, jakie są ekrany | pytanie z nagłówka |
   | D-416 | „Its right area has the heading „Umiejętności”” | prawa część ekranu: drzewa umiejętności | pytanie z nagłówka |
   | D-39 | „`positive` and `warning` also stand as the state bar” | gdzie poza tekstem stoją razem `positive` i `warning` | inne pytanie |
   | D-39 | „`positive` also stands as the fill of the progress bar over the mage's head” | gdzie poza tekstem stoi samo `positive` | inne pytanie |
   | D-39 | „`discovery` also stands as the frame of the plaque” | gdzie poza tekstem stoi `discovery` | inne pytanie |
   | D-40 | „The badge over the mage's head stands on `panel`” | gdzie role tekstu stoją na czymś, co tekstem nie jest | inne pytanie |
   | D-44 | „A control awaiting a server response is disabled” | jak kontrolki i formularze pokazują czekanie na serwer i odmowę | inne pytanie |
   | D-271 | „CSS may draw in the scene layers” | co wolno narysować w CSS zamiast obrazka z paczki | inne pytanie |
   | D-147 | „„Teraz” reads „Walczy z wilkiem” throughout the combat minutes” | co mówi wiersz „Teraz” podczas walki | inne pytanie |
   | D-313 | „The same button stands in the end-of-run window” | ten sam przycisk w oknie końca przejścia | pytanie z nagłówka |
   | D-173 | „„Zakończ” and „Otwarte: {mapa} →”, a button of the end-of-run window (D-368)” | pytanie „Zapisać, odrzucić, wrócić?” przy kończeniu przejścia | pytanie z nagłówka |
   | D-246 | „An earning loop a death stops in the open game” | co trafia do tej samej sekcji poza powrotem gracza | inne pytanie |
   | D-311 | „After a character's death or a completion that window (D-368)” | okno końca przejścia na miejscu ekranu | inne pytanie |
   | D-368 | „Each section of why stands only where it has content” | co zawiera każda sekcja „dlaczego” | pytanie z nagłówka |
   | D-368 | „The window scrolls in itself while its buttons” | przyciski okna, zamykanie i ponowne otwieranie | pytanie z nagłówka |
   | D-316 | „What attacks the character stands beside the mage” | to, co atakuje postać, w czasie walki i po niej | pytanie z nagłówka |
   | D-316 | „Motion comes from CSS at a fixed beat” | skąd bierze się ruch sceny | inne pytanie |
   | D-316 | „The tint of its light (D-315)” | barwa światła sceny | pytanie z nagłówka |
   | D-317 | „The scene follows the system's setting for reduced motion” | scena przy systemowym ustawieniu ograniczonego ruchu | inne pytanie |
   | D-317 | „The scene shows no flash of its whole area” | brak błysku całej sceny | inne pytanie |
   | D-322 | „In the three moments in which time stands still” | efekty trzech momentów zatrzymania; pierwszy akapit mówi o pauzie gracza | pytanie z nagłówka |
   | D-322 | „Where the map run ends in the game minute of a discovery” | który efekt widać i kiedy scena od razu pokazuje ostatni obraz | pytanie z nagłówka |

2. Trzecie zdanie pierwszego akapitu zdań wiążących D-112, od „Expired sessions are rejected on reads” do „and blocking keeps the account's saved game state and its previous save.”, wychodzi z D-112 i staje się zdaniami wiążącymi nowej decyzji, tutaj N1, która dostaje następny wolny numer dziennika (2026-11-20 jest nim D-435) i staje na końcu sekcji „Account server: access, security and blocked accounts”. Zdanie staje się dziewięcioma zdaniami: każdy z ośmiu średników zmienia się w kropkę, słowo po nim zaczyna się wielką literą, a z ostatniego członu znika początkowe „and” („; and blocking keeps” → „. Blocking keeps”); poza tym żadne słowo ani kolejność się nie zmieniają. Akapity N1 zaczynają się od zdań z tabeli:

   | Akapit N1 zaczyna się od zdania, które otwiera | Temat akapitu |
   |---|---|
   | „Expired sessions are rejected on reads” | sesje i linki z maila |
   | „Blocking an account sets its state” | blokada konta |
   | „Setting a password by a password-reset link” | hasło |
   | „Writing a saved game state reads” | zapis stanu gry i reset (razem ze zdaniem „The reset of the game reads”) |
   | „Granting and revoking the privilege” | komendy właściciela: przywilej, rola i blokada z panelu właściciela (trzy zdania) |
   | „Blocking keeps the account's saved game state” | co blokada zostawia |

   Pozostałe części N1:
   - pytanie w nagłówku: „What does each write to the account database read and change in its transaction, and what becomes of expired sessions and emailed links?”;
   - *Scope:* `account-server`;
   - *Based on:* `express-session-regenerated-session-saved-again`, które D-112 traci;
   - *Relations:* `derives from D-112` oraz te z relacji D-112, których przedmiot nazywają zdania N1: D-101, D-107, D-138, D-155, D-161, D-399, D-400; relacje D-112 zostają bez zmian;
   - *Verification:* niezmienniki `account-session-storage`, `password-reset-link` i `password-reset-ends-sessions`, które D-112 traci, a ich pole *Derives from* w `foundations/invariants.md` dostaje numer N1 w miejsce D-112; z klauzuli `tests:` D-112 przechodzą pozycje, które mówią o zdaniach N1: od „expired sessions and links pruned at startup” do „blocking, unblocking, granting and revoking keeping the saved game state and the previous save” oraz, z pozycji o roli, „the role write reporting each outcome by the account's address and ending no session and stopping no link” i „the block of the owner panel changing nothing for an account with the owner role, also where a second connection gave the role just before”, w N1 jako dwie osobne pozycje, podczas gdy w D-112 z tej pozycji zostaje „a new account having the role `player` and the list of accounts sorted by address holding only the address, the role, the blocked state and the privilege of each”; pary przykładów N1 nie ma, więc jego *Verification* kończy się na klauzuli `tests:`;
   - *Origin:* `none`;
   - *Rationale:* z *Rationale* D-112 przechodzą zdania, które tłumaczą zdania N1: drugi człon zdania „A second connection from an operator's command waits out…” (od „a block committed while a login is in progress”), zdania od „A login or a registration stores its session twice” do „…the player signs in with the new one; accepted with it: … the unsaved state waiting in that tab for a sign-in.”, pierwszy człon zdania „Emailed links stay after their use until they have expired and are an hour old, because they also count account messages against D-105 (D-161)”, zdanie „Reading the block in the transaction that records a link means…”, ze zdania „A saved game state in a table of its own…” człony od „reading the block, the version and the revision in the transaction that writes it”, ze zdania „The previous save, in a table of its own as well…” człony od „its move is one copy and the usual write in one transaction”, i zdanie „The block of the owner panel reads the role in the transaction that marks the account…”. Gdzie mowa o członach „od” jakiegoś miejsca, przechodzi wszystko od tego miejsca do końca zdania. Na szwie cięcia łącznik („, and” albo średnik) staje się kropką, a następne słowo zaczyna się wielką literą; gdzie połowa traci rzeczownik, na który wskazywał jej zaimek, zaimek ustępuje temu rzeczownikowi („their purpose” → „the purpose of emailed links”, „the transaction that writes it” → „the transaction that writes a saved game state”, „its move” → „the move of the previous save”); żadne inne słowo nie dochodzi i znaczenie się nie zmienia;
   - *Rejected:* z *Rejected* D-112 przechodzą pozycje: „deleting an emailed link on use or block”, „session touch implemented as an upsert” i wszystkie od „deleting a blocked account's sessions without guarding the session write” do „leaving the sessions after a reset”.
3. D-112 po wydzieleniu: pierwszy akapit zdań wiążących dostaje pusty wiersz, tak samo jak w punkcie 1, przed zdaniem, które otwiera „Accounts have an opaque random primary identifier” (pola tabel bazy), i przed zdaniem, które otwiera „The version is read, and an unknown newer schema refused” (kolejność odczytu wersji schematu); drugi akapit wpisu zostaje bez zmian. Pola, *Rationale* i *Rejected* D-112 tracą to, co punkty 2 i 5 przenoszą, a reszta zostaje słowo w słowo; *Scope* D-112 zostaje `account-server, deployment`. Lista, z której odeszła ostatnia pozycja, kończy się kropką po pozycji, która została ostatnia.
4. Każdy z 63 komentarzy `decision:` w testach, których cytat zaczyna się po kropce wewnątrz cudzysłowu, dostaje cytat od początku zdania, w którym stoi dotychczasowy cytat, do miejsca, w którym dotychczasowy cytat się kończył; gdzie dotychczasowy cytat stoi w dwóch zdaniach decyzji (cytat „Teraz to pokolenie {n}.”” w D-246), nowy zaczyna się od tego zdania, które sprawdza test. Komentarz zostaje jednym wierszem w zapisie sąsiednich komentarzy `decision:`. Dotyczy to jedenastu różnych cytatów sześciu decyzji:

   | Decyzja | Komentarzy | Dotychczasowy cytat zaczyna się od | Nowy cytat zaczyna się od |
   |---|---|---|---|
   | D-96 | 5 | „Spróbuj ponownie.” in `warning`; a saved game state” | „The browser constructs the game only after” |
   | D-96 | 1 | „Zaczynasz od nowa.” for the first two” | „The browser constructs the game only after” |
   | D-96 | 1 | „Zaczynasz od nowa.” for the last.” | „The browser constructs the game only after” |
   | D-157 | 7 | „Spróbuj ponownie później.” when the sending failed” | „Right after registration and after each sending asked for” |
   | D-157 | 7 | „Spróbuj ponownie za godzinę.” above a limit of D-105” | „Right after registration and after each sending asked for” |
   | D-222 | 2 | „Gdy wiadomość nie przyjdzie, spróbuj ponownie później.”” | „Every request for a password-reset link” |
   | D-225 | 5 | „Zaloguj się nowym hasłem.” stands in `positive`” | „After the password is set” |
   | D-246 | 4 | „Teraz to pokolenie {n}.”” (cały cytat) | „After being away the player reads a report” albo „An earning loop a death stops in the open game”, zależnie od testu |
   | D-246 | 5 | „Teraz to pokolenie {n}.”, the title reading” | „An earning loop a death stops in the open game” |
   | D-246 | 25 | „Teraz to pokolenie {n}.”, then the others, in `text`” | „After being away the player reads a report” |
   | D-287 | 1 | „Wróć do niego i je zakończ, żeby wysłać postać.”” | „Under the inactive buttons of each character” |

5. Trzeci akapit zdań wiążących D-112, dwa zdania od „Beyond the rules above, no command that the operator runs on the server” do „…which sets up a temporary database of its own.”, wychodzi z D-112 i staje się zdaniami wiążącymi drugiej nowej decyzji, tutaj N2, z kolejnym wolnym numerem, na końcu tej samej sekcji dziennika. W pierwszym zdaniu „Beyond the rules above,” zmienia się w „Beyond the rules of D-112,”; poza tym żadne słowo się nie zmienia. Pozostałe części N2:
   - pytanie w nagłówku: „What does a command of the operator do with a file in which the server has set up no account database?”;
   - *Scope:* `account-server`, `deployment`;
   - *Based on:* `none`;
   - *Relations:* `derives from D-112`;
   - *Verification:* bez `invariants:`; klauzula `tests:`, zdanie „An agent compares a change with the part no invariant and no test holds:”, które stoi wtedy w obu wpisach, i para przykładów; z klauzuli `tests:` D-112 przechodzi ostatnia pozycja, od „the blocking command, the backup command, the command for the previous-save privilege and the command for the role each refusing an empty file”; z pary przykładów przechodzą pozycja `complies` „a command added later that the operator runs on the server and that changes or copies the account database, opened only where the server has set up its tables and refusing any other file with the exit code 3” i pozycja `violates` „a command added later that the operator runs on the server and that changes or copies the account database and sets up a new database in a file that holds none”;
   - *Origin:* `none`;
   - *Rationale:* z *Rationale* D-112 przechodzą dwa zdania: „No command that the operator runs on the server and that changes or copies the account database sets up a new database, because…” i „The rule binds a command added later too…”;
   - *Rejected:* z *Rejected* D-112 przechodzą trzy ostatnie pozycje: „a new exit code for a file that is no account database”, „a refusal for an empty file alone” i „naming only the four commands of today”.
6. Każde odwołanie do D-112 w repozytorium — w innych wpisach `foundations/decisions.md`, w `foundations/invariants.md`, w `guidelines/`, w komentarzach `src/server/` i w testach — nazywa po zmianie tę decyzję, w której stoi zdanie, o które w odwołaniu chodzi: D-112, N1 albo N2. Z 39 komentarzy `decision:` D-112: 18 z cytatem „Expired sessions are rejected on reads and pruned at startup and periodically with a disposed lifecycle timer” dostaje numer N1 i cytat tego z dziewięciu zdań, które trzyma jego test, a test, który trzyma kilka z nich, dostaje po jednym komentarzu na zdanie; 5 z cytatem „Beyond the rules above, no command…” dostaje numer N2 i początek „Beyond the rules of D-112, no command…”; pozostałe 16 zostaje przy D-112 bez zmian. Cytaty dziewięciu zdań N1: „Expired sessions are rejected on reads and pruned at startup and periodically with a disposed lifecycle timer”, „Blocking an account sets its state”, „Setting a password by a password-reset link is one transaction”, „Writing a saved game state reads its account's blocked state”, „The reset of the game reads the account's blocked state”, „Granting and revoking the privilege is one write by the account's address”, „Giving and taking the role is one write by the account's address”, „The block of the owner panel reads the account's role in the transaction that marks the account”, „Blocking keeps the account's saved game state and its previous save”. Odwołanie, które opiera się na zdaniu *Rationale*, pozycji *Rejected* albo pozycji `tests:`, idzie za tą pozycją; odwołanie ogólne, które nie wskazuje zdania, zostaje przy D-112; odwołanie, które opiera się na zdaniach z dwóch wpisów, nazywa oba.

### Acceptance criteria

- Po zmianie żaden akapit zdań wiążących żadnego wpisu `foundations/decisions.md` nie ma ponad 3 zdań ani ponad 300 słów, a zdania wiążące żadnego wpisu, wszystkie akapity razem, nie mają ponad 600 słów; wpis, który przekroczył limit po 77a612cb i nie stoi w tabelach „To do”, cykl zgłasza w requeście i sam go nie dzieli.
- Gdzie przy podjęciu wiersz tabeli „To do” nie zgadza się już z plikiem — słów otwierających zdanie nie ma we wpisie, zdanie się zmieniło albo liczba komentarzy z punktu 4 jest inna — cykl nie wybiera nowego miejsca sam, tylko zwraca zadanie z opisem rozbieżności.
- Zdania i słowa liczą autor i recenzent według definicji z „Context”, bez uruchamiania skryptu z innej kopii the way, a request mówi, że pomiaru skryptem nie było.
- Po zmianie żaden komentarz `decision:` w repozytorium nie zaczyna cytatu po kropce wewnątrz cudzysłowu.
- Podział akapitów 19 wpisów (punkt 1), podział D-112 z nowymi decyzjami i odwołaniami (punkty 2, 3, 5 i 6) oraz komentarze testów z punktu 4 stoją w osobnych commitach.
- Opis requestu pokazuje w całości dotychczasowe brzmienie D-112 oraz nowe brzmienie D-112 i nowych decyzji, z polami, *Rationale* i *Rejected*: te wpisy Mariusz czyta przed scaleniem.

### Questions to settle

- Co znaczy „skrócić”: mniej słów we wpisie, czy każdy akapit pod limitem przy tych samych słowach?
  - Answer: każdy akapit pod limitem przy tych samych słowach — tylko podział na akapity, a przerwa stoi tam, gdzie następny akapit odpowiada na osobną część pytania, nie mechanicznie co trzy zdania.
  - Not chosen:
    - naprawdę skrócić brzmienie — każde nowe brzmienie zmienia zatwierdzoną decyzję, więc Mariusz czyta 20 przepisanych wpisów (ok. 6400 słów); wpisy niosą dokładne napisy przycisków, komunikaty i liczby, które trzymają testy, więc łatwo zgubić szczegół; 642 komentarze w testach trzeba prowadzić razem ze zdaniami; raczej kilka requestów
    - rozbić wpisy na kilka decyzji z nowymi numerami — największa zmiana: nowe numery, przeniesienie uzasadnień i odrzuconych wariantów, przepisanie numerów w komentarzach testów i w odwołaniach z innych wpisów; przy każdym wpisie ocena Mariusza, czy podział jest trafny
  - Source: doradca dnia w imieniu Mariusza, 2026-11-20, „1 a — tylko podział na akapity, bez zmiany słów. Warunek: przerwa stoi tam, gdzie następny akapit odpowiada na osobną część pytania (tak jak wymaga szablon decyzji), nie mechanicznie co trzy zdania.”
- Co zrobić z D-112, którego jedno zdanie ma 402 słowa i sam podział na akapity go nie zmieści?
  - Answer: łańcuch reguł transakcji (trzecie zdanie pierwszego akapitu) przechodzi do nowej decyzji z własnym numerem i pytaniem, przecięty na średnikach na osobne zdania i podzielony na akapity według tematu (sesje i linki; blokada konta; hasło; zapis stanu gry i reset; komendy właściciela), najwyżej po trzy zdania; D-112 zostaje z otwieraniem bazy, polami tabel i kolejnością odczytu wersji.
  - Not chosen:
    - przeciąć to zdanie i rozłożyć na akapity wewnątrz D-112 — wybrane najpierw i cofnięte: wpis miałby dalej ok. 1000 słów, ponad limit 600 słów na wpis
    - przepisać D-112 krócej — koszty jak przy skracaniu brzmienia, na najbardziej szczegółowym wpisie dziennika
  - Source: doradca dnia w imieniu Mariusza, 2026-11-20, „2 a — D-112: przeciąć trzecie zdanie na średnikach na osobne zdania i rozłożyć na akapity. Warunek: akapity grupuj tematem (sesje i linki; blokada konta; hasło; zapis stanu gry i reset; komendy właściciela), najwyżej po trzy zdania, nie mechanicznie po trzy.”; zmiana tego samego dnia, po przyjęciu limitu 600 słów na wpis: „Zmieniam odpowiedź 2 z a na b: łańcuch reguł transakcji (dzisiejsze trzecie zdanie pierwszego akapitu, 402 słowa) przechodzi do nowej decyzji z własnym numerem i pytaniem, pocięty na średnikach i podzielony na akapity tematem, jak było ustalone; D-112 zostaje z otwieraniem bazy, polami tabel i kolejnością odczytu wersji.”
- Czy cykl tego zadania czeka na scalenie skryptu długości w the way i na przejście loop2 na wersję, która go zawiera?
  - Answer: czeka na scalenie zadania the way ze skryptem długości, bo wtedy definicja liczenia jest ostateczna, a na przejście loop2 na nowszą wersję the way nie czeka; zgodność z limitem liczą autor i recenzent według definicji z „Context”.
  - Not chosen:
    - nie czekać wcale i liczyć tylko według definicji z dokumentu zadania ze skryptem — skrypt nie sprawdzi zmiany, a gdyby licznik wyszedł z cyklu the way inny niż w dokumencie, pojedynczy wpis może jeszcze wypaść ponad limit
    - czekać także na przejście loop2 na nową wersję — od przejścia do scalenia tego zadania każda zmiana ruszająca jeden z 20 wpisów staje
    - policzyć licznikiem ze scalonego skryptu uruchomionym z kopii the way na dysku autora — instrukcja repozytorium loop2 mówi „never use another copy or version of the-way”, a dokument zadania nie robi w niej wyjątku
  - Source: doradca dnia w imieniu Mariusza, 2026-11-20, „Cykl tego zadania czeka na scalenie zadania the way ze skryptem długości: blokada na linii zadania zostaje […] Cykl NIE czeka natomiast na przejście loop2 na nowszą wersję the way. Po scaleniu skryptu zgodność z limitem liczy się licznikiem ze scalonego skryptu uruchomionym z kopii the way na pliku decyzji loop2, jeśli da się to zrobić bez przesuwania przypiętej wersji; jeśli się nie da — według definicji z dokumentu zadania ze skryptem, liczy autor i recenzent.”; korekta tego samego dnia: „Pomiar skryptem z innej kopii the way wypada. […] zostaje liczenie według definicji z „Context” przez autora i recenzenta […] cykl dalej czeka na scalenie zadania the way (blokada zostaje), bo wtedy definicja liczenia jest ostateczna”
- Czy to zadanie poprawia też 63 komentarze testów, których cytat zaczyna się po kropce wewnątrz cudzysłowu?
  - Answer: tak, jako osobny punkt „To do” i w osobnym commicie; samego przejścia loop2 na nowszą wersję the way zadanie nie robi.
  - Not chosen:
    - osobne zadanie na przejście loop2 na nowszą wersję the way — to poprawka średniej wielkości, a osobne zadanie kosztuje cały cykl z doprecyzowaniem i przeglądami
  - Source: doradca dnia w imieniu Mariusza, 2026-11-20, „4 b — przestawienie początków 63 cytatów na prawdziwe początki zdań wchodzi do tego zadania jako osobny punkt »To do« […] prawdziwy początek zdania jest poprawny także w wersji the way przypiętej dziś, więc zmianę sprawdza obecna bramka.”
- Czy osobny akapit może nieść część pytania z nagłówka wpisu, skoro szablon decyzji daje osobny akapit tylko „części innego pytania” (WAY-19)?
  - Answer: może — osobny akapit niesie także część własnego pytania wpisu, nie tylko część innego pytania; wszystkie przerwy z tabel „To do” zostają.
  - Not chosen:
    - dzielić bez zmiany reguły
    - takie wpisy naprawdę przebudować
  - Source: Mariusz, 2026-11-20, „a”, przekazane przez doradcę dnia
- Co jeszcze wychodzi z D-112, skoro po wydzieleniu łańcucha reguł ma 598 słów przy limicie 600?
  - Answer: trzeci akapit zdań wiążących D-112, reguła o tym, co komenda operatora robi z plikiem bez bazy kont, przechodzi do drugiej nowej decyzji; jedyna zmiana jego słów to „Beyond the rules above,” → „Beyond the rules of D-112,”.
  - Not chosen:
    - zostawić D-112 na 598 słowach — najbliższa zmiana D-112, która doda choć trzy słowa, staje na limicie i musi zrobić ten sam podział sama
  - Source: doradca dnia w imieniu Mariusza, 2026-11-20, „D-112: odpowiedź „a”, trzeci akapit przechodzi do drugiej nowej decyzji. […] Jedyna zmiana słów przenoszonego akapitu to „Beyond the rules above,” → „Beyond the rules of D-112,”; wszystko inne słowo w słowo.”

## Context

- Źródłem zadania jest decyzja Mariusza z 2026-11-20 przy doprecyzowaniu zadania the way „przywrócić skrypt pilnujący długości zapisanych decyzji”: „osobnym zadaniem the way, zaraz po tym; wpisy loop2 dostają własne zadanie w loop2”.
- Tamto zadanie odrzuciło dwa warianty: poprawić wpisy loop2 w zadaniu the way ze skryptem (zmienia ono tylko repozytorium the way) i nie poprawiać wcale (to dolegliwość, od której zadanie ze skryptem się zaczęło, tylko wymuszona przez skrypt).
- Limit i sposób liczenia pochodzą z dokumentu tamtego zadania, które 2026-11-20 jest w cyklu: akapit zdań wiążących (akapity między nagłówkiem wpisu a jego pierwszym polem) ma najwyżej 3 zdania i najwyżej 300 słów; zdanie zaczyna się na początku akapitu albo po kropce i spacji, a kropka wewnątrz cudzysłowu (`"…"`, `“…”`, `„…”`) zdania nie kończy; słowo to ciąg znaków między odstępami.
- Zdania wiążące jednego wpisu, wszystkie akapity razem, mają najwyżej 600 słów, liczone tak samo; ten limit Mariusz przyjął 2026-11-20 razem z dopuszczeniem akapitu na część własnego pytania wpisu, żeby podział na akapity nie był obejściem limitu akapitu (niewybrane: brak limitu na wpis; limit liczby akapitów).
- Szablon decyzji w wersji the way przypiętej w loop2 mówi jeszcze tylko o akapicie na „część innego pytania”; dopuszczenie akapitu na część własnego pytania wpisu i limit 600 słów są decyzjami Mariusza z 2026-11-20, które wchodzą do the way requestem #152 (zadanie ze skryptem długości, na które to zadanie czeka). Recenzent zmiany przyjmuje podziały z „To do” na tej podstawie.
- Skrypt zgłosi błąd dla decyzji, którą zmiana dodaje albo której zdania wiążące zmienia, także gdy zmienia tylko ich podział na akapity, a każdy inny wpis ponad limit wypisze linią `listed:`, która niczego nie zatrzymuje.
- Reguła akapitu stoi w `.the-way/elements/decisions/template.md`, sekcja „Binding sentences”: „A part of another question that the entry answers (WAY-19) has its own paragraph after that one, also of one to three sentences, one paragraph for each part (WAY-05).”; liczby akapitów skrypt nie ogranicza, a to, czy akapit jest osobną częścią pytania, ocenia recenzent zmiany.
- loop2 przypina the way na commicie bfb2e109 (2026-11-15); ta wersja długości nie liczy, a porównując zdania wiążące z bazą, skleja akapity w jeden tekst, więc sam podział na akapity nie jest dla niej zmianą decyzji.
- D-112 po punkcie 2 „To do” jest dla przypiętej wersji decyzją zmienioną, ale trzyma ją 39 komentarzy `decision:`, więc przypięta wersja nie zgłasza przy niej błędu.
- `foundations/decisions.md` nie ma spacji na końcu żadnego wiersza; część wpisów jest łamana ręcznie, a pierwszy akapit D-112 to jeden wiersz.
- Pomiar na `foundations/decisions.md` w loop2 @ 77a612cb (2026-11-20): 428 wpisów, 453 akapity zdań wiążących, 20 wpisów ponad limit; tabela niżej podaje każdy akapit osobno, a w trzeciej kolumnie słowa kolejnych zdań akapitu ponad limit.

| Wpis | Akapity (zdania, słowa) | Słowa kolejnych zdań | Pytanie wpisu |
|---|---|---|---|
| D-112 | 4 zd., 804 sł.; 1 zd., 35 sł.; 2 zd., 161 sł. | 132, 220, 402, 50 | How does the account database open and preserve its schema? |
| D-316 | 8 zd., 447 sł. | 53, 39, 72, 31, 54, 32, 81, 85 | What does the scene show, and from what does it draw? |
| D-368 | 3 zd., 440 sł. | 166, 175, 99 | What does the end-of-run window say, and how does it open and close? |
| D-96 | 3 zd., 384 sł. | 131, 107, 146 | What does a player see before and after signing in? |
| D-322 | 5 zd., 373 sł. | 27, 229, 28, 72, 17 | What does the scene show while time stands still? |
| D-356 | 3 zd., 336 sł. | 105, 156, 75 | How does the operator learn that the running game failed? |
| D-311 | 5 zd., 336 sł. | 92, 41, 51, 87, 65 | How is the screen of a map run laid out? |
| D-04 | 3 zd., 322 sł. | 11, 47, 264 | What is the game built with? |
| D-173 | 3 zd., 317 sł. | 46, 124, 147 | What can the player do with the copy after a map run ends? |
| D-44 | 3 zd., 310 sł. | 148, 84, 78 | Which controls do the screens of the browser view build on? |
| D-246 | 3 zd., 308 sł. | 152, 94, 62 | What does the player read after being away? |
| D-40 | 5 zd., 287 sł. | 97, 46, 26, 85, 33 | What do the neutral roles of the browser view mean? |
| D-252 | 4 zd., 282 sł. | 23, 149, 62, 48 | How does loop2 write its failures to its logs, and what does it log? |
| D-39 | 7 zd., 279 sł. | 65, 24, 47, 43, 38, 25, 37 | What do the signal colours of the browser view mean? |
| D-271 | 4 zd., 274 sł. | 73, 40, 42, 119 | Where do the scene's pictures come from? |
| D-317 | 5 zd., 257 sł. | 68, 57, 62, 61, 9 | How long do the scene's effects last? |
| D-313 | 4 zd., 216 sł. | 101, 68, 11, 36 | What does „Dodaj regułę z tym” do? |
| D-280 | 4 zd., 214 sł.; 2 zd., 84 sł. | 33, 102, 53, 26 | Which screens does the game have, and how does the player move between them? |
| D-416 | 4 zd., 210 sł.; 2 zd., 53 sł. | 24, 62, 38, 86 | What does the screen Wiedza show? |
| D-147 | 4 zd., 193 sł. | 72, 51, 35, 35 | What record of an encounter does the player read? |

- Listę trzeba policzyć od nowa przy podjęciu: wpisy zmieniają się między zadaniami.
- Przed startem cyklu definicję liczenia i oba limity porównuje się z tym, co scalił request #152 the way; przy różnicy poprawia się „Context” albo doprecyzowanie wraca.
- Z 26 przerw punktu 1 „To do” 13 otwiera akapit, który odpowiada na część pytania z nagłówka wpisu, a 13 akapit z częścią innego pytania; z 19 wpisów 9 ma tylko przerwy pierwszego rodzaju (D-96, D-173, D-252, D-280, D-313, D-322, D-356, D-368, D-416), 9 tylko drugiego (D-04, D-39, D-40, D-44, D-147, D-246, D-271, D-311, D-317), a D-316 obu. To ocena agenta z doprecyzowania; kolumna w tabeli zostaje jako materiał dla recenzenta.
- Poza D-112 żaden wpis dziennika nie ma ponad 600 słów zdań wiążących; następne są D-109 (514) i D-316 (447).
- D-112 ma 1000 słów zdań wiążących: pierwszy akapit 804 (zdania 132, 220, 402 i 50 słów), drugi 35, trzeci 161. Po punkcie 2 „To do” ma 598, po punktach 2 i 5 ma 437; N1 ma 401 słów w sześciu akapitach, N2 162.
- D-112 rośnie przy każdej nowej komendzie operatora i przy każdym kroku schematu bazy: pierwsze zdanie i trzeci akapit wymieniają komendy, a drugie zdanie pola tabel.
- Odwołania do D-112 poza samym wpisem (2026-11-20): 13 w innych wpisach `foundations/decisions.md`, 5 w `foundations/invariants.md`, 7 w `guidelines/` (`coding-database-access.md`, `coding-session-store.md`, `testing.md`), 12 w komentarzach `src/server/` i 56 w testach, w tym 39 komentarzy `decision:`.
- Części `account-server` należy `src/server/**`; sprawdzenie bazy przy budowie obrazu, które nazywa drugie zdanie N2, należy do części `deployment`.
- Po podziale z „To do” najdłuższy akapit ma 271 słów (D-173), a żaden nie ma ponad 3 zdań; dziewięć zdań N1 po przecięciu ma od 11 do 72 słów.
- Te 20 decyzji cytują 642 komentarze `decision:` w testach (w całym repozytorium jest ich 4040); komentarz `decision:` to linia w teście z numerem decyzji i początkiem jej zdania, które test trzyma.
- Żaden z tych 642 cytatów nie wychodzi poza zdanie, które zaczyna, więc sam podział na akapity nie psuje żadnego komentarza.
- Jedyny cytat trzeciego zdania D-112, „Expired sessions are rejected on reads and pruned at startup and periodically with a disposed lifecycle timer” (18 komentarzy), kończy się przed pierwszym średnikiem tego zdania, więc przecięcie na średnikach go nie psuje.
- 63 komentarze z punktu 4 „To do” leżą w jedenastu plikach: `tests/sim/catch-up.test.mjs`, `tests/sim/loop.test.mjs` i dziewięciu plikach `tests/view/` (`account-screen`, `away-report`, `character-screen`, `clock`, `email-status`, `headquarters-screen`, `menu-bar`, `password-reset`, `uncaught-failure`).
- Wersja the way przypięta w loop2 bierze miejsce po kropce i spacji za początek zdania także wewnątrz cudzysłowu; the way @ 1b6fe1c1 już nie (`begins_sentence` w `elements/common/foundation_check.py`) i zgłasza taki komentarz błędem „the quotation does not begin a sentence”. Początek zdania według nowszej reguły jest też początkiem według przypiętej.
- Obie reguły porównano na wszystkich 4040 komentarzach. Niescalony skrypt z gałęzi `task/decision-length-check` the way @ e8b76178, uruchomiony 2026-11-20 na loop2 @ 77a612cb bez zmiany czegokolwiek, zgłasza 20 linii `listed:` o długości akapitu (te same 20 wpisów) i 63 błędy „the quotation does not begin a sentence”, i nic więcej; co zgłosi wersja scalona, okaże się po scaleniu.
- `foundations/**` należy do części `product-foundation`; zmiana komentarza w teście jest zmianą testu, więc obowiązuje `guidelines/testing.md`.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- Dwadzieścia decyzji, które zadanie zmienia; brzmienie każdej to jej wpis w `foundations/decisions.md` @ 77a612cb, a pytania wpisów podaje tabela w „Context”. Dokument nie przepisuje ich zdań wiążących (ok. 6400 słów); zdania, przed którymi staje przerwa, przytaczają tabele „To do”.
  - D-04, D-39, D-40, D-44, D-96, D-147, D-173, D-246, D-252, D-271, D-280, D-311, D-313, D-316, D-317, D-322, D-356, D-368, D-416 — zmiana: tylko podział zdań wiążących na akapity (punkt 1 „To do”); słowa, pola, *Rationale* i *Rejected* zostają.
  - D-112 — zmiana: łańcuch reguł transakcji przechodzi do nowej decyzji N1, a reguła o komendach operatora do N2 (punkty 2, 3, 5 i 6 „To do”); zdania wiążące, pola, *Rationale* i *Rejected* dzielą się między wpisy bez zmiany znaczenia.
- Cztery decyzje, których zadanie nie zmienia, a których zdania cytują komentarze z punktu 4 „To do”:
  - **D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message?** — „Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending: „Wysłaliśmy odnośnik potwierdzający na <adres>.” in `text-secondary` when the message was sent, „Za dużo wiadomości. Spróbuj ponownie za godzinę.” above a limit of D-105, „Nie udało się wysłać wiadomości. Spróbuj ponownie później.” when the sending failed and the account client's sentence of its failure when the request for a message fails for another reason than an address already confirmed, the last three in `warning`, each beside „Wyślij ponownie”.”
  - **D-222 — What does a request for a password-reset link answer?** — „Every request for a password-reset link whose address is well formed under D-99 gets one and the same answer, which leaves before any work on an account and without waiting for the mail server, so neither its content nor its time tells what became of the request; the page then shows „Jeśli to konto ma potwierdzony adres, wysłaliśmy na niego odnośnik. Gdy wiadomość nie przyjdzie, spróbuj ponownie później.” under the form „Nie pamiętam hasła”, in the look D-44 gives that answer, and the form stays with its address field empty and with „Wróć do logowania”.”
  - **D-225 — What does the form „Ustaw nowe hasło” hold, and how does it end?** — „After the password is set, „Hasło zmienione. Zaloguj się nowym hasłem.” stands in `positive` above the account forms and the fragment is gone; after a refusal of the link, whatever its reason, the fragment is gone and the page runs its session check and puts „Odnośnik jest nieważny albo wygasł.” in `warning` above what that leads to, the account forms or the game.”
  - **D-287 — What do Siedziba, the screen Postać and the screen Mapy allow, and say, while a manual map run waits or has ended?** — „Under the inactive buttons of each character in the section „Kto idzie” of the card of a map stands „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”, and at the section „Umiejętności” „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.””

## Settlements to record

Candidates: 1 shown, 0 accepted — 2026-11-20

none

## Out of scope

- Zadanie nie zmniejsza liczby słów zdań wiążących: 19 wpisów ma po nim te same słowa, a słowa D-112 stoją po nim w D-112 i w nowych decyzjach, bez jednego „and” i z „of D-112” w miejscu „above”.
- Limit, skrypt i szablon decyzji w the way: to zadanie zmienia tylko repozytorium loop2.
- Przejście loop2 na nowszą wersję the way: po tym zadaniu nie stanie już ani na tych 63 komentarzach, ani na długości wpisów, a co jeszcze zgłosi nowsza wersja, okaże się przy przejściu.
