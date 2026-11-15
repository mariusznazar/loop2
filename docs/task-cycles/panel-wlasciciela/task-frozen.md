---
title: "loop2: panel właściciela — logowanie z rolą właściciela, blokada kont i uprawnienie do poprzedniego zapisu w grze zamiast przez SSH"
status: draft
created: 2026-11-14T17:30
updated: 2026-11-14
tags: [zadanie]
related: "the project's note"
---

## Po co to

- **Jak jest dziś:** w grze jest jeden rodzaj użytkownika — gracz. Dwie operacje na kontach graczy Mariusz robi komendą w kontenerze serwera testowego, po zalogowaniu przez SSH: blokadę i odblokowanie konta oraz nadanie i odebranie uprawnienia do poprzedniego zapisu (to uprawnienie daje graczowi „Zacznij od zera” i „Wciągnij programy z poprzedniego zapisu”).
- **Kto to odczuwa:** Mariusz jako właściciel gry, przy każdej takiej zmianie; sprawdzający projekt zaliczeniowy kursu AI Tech Leaders, którzy wymagają logowania z co najmniej dwiema rolami o różnych uprawnieniach i testu, że użytkownik nie wykona operacji przeznaczonej dla innej roli.
- **Co jeśli nic:** projekt nie spełni wymagania dwóch ról, co obniża szansę na wyróżnienie (zgłoszenie Mariusz wysyła 28.11.2026, więc zmiana musi być scalona wcześniej); obie operacje dalej wymagają SSH.

# loop2: panel właściciela — logowanie z rolą właściciela, blokada kont i uprawnienie do poprzedniego zapisu w grze zamiast przez SSH

Status: ready for cycle
Project relation: independent

## Description

### Need

- W grze jest jedna rola, gracz; blokadę i odblokowanie konta oraz nadanie i odebranie uprawnienia do poprzedniego zapisu właściciel robi komendami `account-block` i `account-previous-save` w kontenerze `loop2`, po zalogowaniu na serwer przez SSH (`src/server/account-block.ts`, `src/server/account-previous-save.ts`, D-137, D-400).
- Projekt zaliczeniowy kursu AI Tech Leaders wymaga „Logowanie i przynajmniej dwie role z różnymi uprawnieniami” oraz testu uprawnień, „który sprawdza, że użytkownik A nie dobierze się do danych użytkownika B ani nie wykona operacji przeznaczonej dla innej roli” (zaliczenie.md, sekcja „Co musi mieć projekt”, punkty 1 i 9); zgłoszenie Mariusz wysyła 28.11.2026, więc zmiana ma być scalona przed tym dniem.
- Mariusz chce panelu administratora i tak: „jakiś panel administratorski faktycznie by mi się przydał — a Twoja propozycja byłaby dobrym początkiem do tego” (Mariusz, 2026-11-14) — to pierwszy krok większego panelu, nie jednorazowy dodatek pod ocenę.

### To do

1. Konto ma rolę zapisaną w bazie kont: gracz albo właściciel; nowe konto jest graczem, a baza przechodzi na nową wersję schematu z zachowaniem każdego konta jako gracza.
2. Rolę właściciela nadaje i odbiera komenda uruchamiana przez człowieka w kontenerze `loop2`, na wzór `account-previous-save` (D-400): konto wskazane adresem, odpowiedź, że rola została zmieniona, już taka była albo że konta o tym adresie nie ma, i nic nie zmienia, gdy odmawia.
3. Właściciel loguje się tą samą kartą logowania co gracz; jego menu „Konto” ma, obok adresu i „Wyloguj”, odnośnik „Panel właściciela” prowadzący pod adres `#/konta`. Pasek menu wygląda u gracza i u właściciela tak samo; gracz nie ma odnośnika, a adres `#/konta` otwiera mu Siedzibę, jak każdy adres, który nie prowadzi do istniejącego ekranu (D-281).
4. Ekran pod `#/konta` pokazuje listę kont posortowaną po adresie e-mail; przy każdym koncie stoi jego adres, stan blokady i to, czy ma uprawnienie do poprzedniego zapisu — nic więcej o koncie.
5. Przy każdym koncie listy stoją cztery operacje: zablokuj, odblokuj, nadaj uprawnienie do poprzedniego zapisu, odbierz je — każda ze skutkami, jakie dziś daje komenda (D-137, D-400). „Zablokuj” jest przyciskiem niszczącym i otwiera potwierdzenie mówiące, że blokada kończy sesje gracza w każdej przeglądarce i unieważnia jego odnośniki z maili, a odblokowanie ich nie przywraca; trzy pozostałe operacje działają od razu. Konta z rolą właściciela, własnego też, panel nie blokuje: przycisku nie ma, a serwer odmawia; uprawnienie do poprzedniego zapisu da się nadać i odebrać każdemu kontu.
6. Trasy API listy kont i czterech operacji sprawdzają rolę po stronie serwera, przy każdym żądaniu; sesja gracza dostaje na każdej z nich odmowę, a test tej odmowy jest częścią zadania.
7. Styleguide (`guidelines/styleguide-browser-view.md`) opisuje ekran listy kont, odnośnik „Panel właściciela” w menu „Konto” i „Zablokuj” na liście przycisków niszczących.
8. Komendy `account-block` i `account-previous-save` zostają bez zmian jako droga awaryjna obok panelu; skill `loop2-deploy` (`.claude/skills/` i `.agents/skills/`) opisuje panel, komendę roli i to, kiedy sięgać po komendy.

### Questions to settle

- 1. Czy panel zmienia D-137 i D-400, które dziś odrzucają panel właściciela w przeglądarce i każdą trasę HTTP blokującą konto albo nadającą uprawnienie?
  - Answer: (a) — tak: panel z czterema operacjami, zmiana D-137 i D-400 świadoma; ryzyko — kto przejmie konto właściciela, zablokuje każdego gracza — przyjęte przy pięciu kontach na serwerze, wszystkich Mariusza; wraca do oceny, gdy gra otworzy się dla innych.
  - Not chosen:
    - (b) panel tylko z listą kont, operacje zostają przy SSH — dwie role i test odmowy są, D-137 i D-400 bez zmian, ale odpada cel „zamiast przez SSH”.
    - bez zmiany — projekt nie spełnia wymagania dwóch ról.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „1 a, 2 a, 3 a, 4 a” oraz „Przy 1 a zapisz w zadaniu, że zmiana D-137 i D-400 jest świadoma (panel z czterema operacjami, ryzyko przyjęte przy pięciu własnych kontach) i że wraca do oceny, gdy gra otworzy się dla innych.”
- 2. Jak konto dostaje rolę właściciela?
  - Answer: (a) — rola zapisana przy koncie w bazie, nadawana komendą przez SSH, jak dziś uprawnienie do poprzedniego zapisu.
  - Not chosen:
    - (b) adres właściciela w ustawieniach serwera — baza bez zmian, ale zmiana właściciela to edycja ustawień na serwerze i restart kontenera (powód, dla którego D-400 odrzuciła ten sposób dla uprawnienia); pasuje do jednej osoby, gorzej do większego panelu z kilkoma rolami.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „1 a, 2 a, 3 a, 4 a” (koszt drogi a podany w pytaniu: nowa wersja schematu bazy, po której powrót do starszego commita kończy się odmową startu do czasu poprawki do przodu, i jedna komenda więcej z testami).
- 3. Czy komendy przez SSH zostają obok panelu?
  - Answer: (a) — zostają jako droga awaryjna, gdy panel nie działa albo konto właściciela jest zablokowane.
  - Not chosen:
    - (b) usunięte — mniej kodu, ale gdy panel padnie, zostaje ręczna edycja pliku bazy, którą D-137 odrzuca, bo omija normalizację adresu, usunięcie sesji i sprawdzenie schematu.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „1 a, 2 a, 3 a, 4 a”.
- 4. Co panel robi z własnym kontem właściciela?
  - Answer: (a) — panel nie blokuje konta z rolą właściciela, także własnego: serwer odmawia, a przycisku nie ma; uprawnienie do poprzedniego zapisu da się nadać i odebrać każdemu, właścicielowi też.
  - Not chosen:
    - (b) wszystko wolno, jak w komendach — właściciel, który zablokuje sam siebie, traci sesję i panel, a ratunkiem zostaje SSH.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „1 a, 2 a, 3 a, 4 a”.
- 5. Gdzie stoi ekran z listą kont?
  - Answer: (a) — w menu „Konto” właściciela odnośnik „Panel właściciela” pod adres `#/konta`; pasek gracza i właściciela wygląda tak samo.
  - Not chosen:
    - (b) czwarta pozycja „Konta” na pasku menu, tylko u właściciela — panel lepiej widać, także sprawdzającym kurs, ale zmienia się D-280 (stała lista pozycji paska) i jej testy, a pasek wygląda różnie zależnie od roli.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „5 a, 6 a, 7 a, 8 tak, 9 jedno” (koszt drogi a podany w pytaniu: menu „Konto” dostaje pierwszy odnośnik obok przycisków, a lista adresów ekranów D-281 jeden adres).
- 6. Co lista pokazuje o każdym koncie?
  - Answer: (a) — adres e-mail, stan blokady i uprawnienie do poprzedniego zapisu, posortowane po adresie; tyle, ile potrzeba do czterech operacji, więc kto przejmie sesję właściciela, wyniesie mniej danych graczy.
  - Not chosen:
    - (b) do tego data założenia konta i potwierdzenie adresu — łatwiej wyłapać masowe zakładanie kont, ale dwa pola więcej w odpowiedzi API, w teście i na ekranie, a przejęta sesja właściciela pokazuje więcej.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „5 a, 6 a, 7 a, 8 tak, 9 jedno”.
- 7. Czy „Zablokuj” pyta o potwierdzenie?
  - Answer: (a) — tak: potwierdzenie mówi, że blokada kończy sesje gracza i unieważnia odnośniki z maili, a odblokowanie ich nie przywraca; trzy pozostałe operacje działają od razu, bo da się je cofnąć bez strat; „Zablokuj” jest przyciskiem niszczącym, jak „Zacznij od zera”.
  - Not chosen:
    - (b) bez potwierdzenia — jedno kliknięcie mniej, ale pomyłka wylogowuje gracza na każdym urządzeniu.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „5 a, 6 a, 7 a, 8 tak, 9 jedno”.
- 8. Czy zadanie zostaje jednym?
  - Answer: tak — jedno zadanie: nic z zewnątrz go nie blokuje, a każdy podział to osobny pełny cykl przed 28.11.2026.
  - Not chosen:
    - dwa zadania, rola i trasy API z testem odmowy osobno, ekran osobno — pierwsza część wcześniej spełnia wymaganie kursu, gdyby ekran nie zdążył, kosztem drugiego pełnego cyklu.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „5 a, 6 a, 7 a, 8 tak, 9 jedno”.

## Context

- Zakres uzgodniony z Mariuszem 14.11.2026: tylko operacje, które już istnieją jako komendy serwera; żadnych nowych operacji na kontach.
- Rozważone i odrzucone przez Mariusza 14.11.2026: opisać istniejące uprawnienie do poprzedniego zapisu jako drugą rolę, bez kodu — właściciel nie loguje się dziś do gry, a wymaganie mówi o logowaniu i rolach, więc sprawdzający mogliby uznać flagę na koncie za coś innego niż rolę.
- Na serwerze testowym jest 5 kont, wszystkie Mariusza (D-12, uzasadnienie: stan policzony 2026-11-13).
- Testy, na których można się wzorować: odmowa 403 bez uprawnienia do poprzedniego zapisu i izolacja zapisów między kontami w `tests/http.test.mjs`.
- Notatka nadrzędna z brakami wobec wymagań kursu: the parent note on the shortfalls against the course requirements.
- Zapis sesji, w której zadanie powstało (lokalny, poza repo, wygasa ~12.02.2027): `the local transcript of the session in which the task was written`.

## Questions carried to cycle

none

## Human actions

- Po wdrożeniu zmiany na serwer testowy Mariusz nadaje swojemu kontu rolę właściciela komendą roli w kontenerze `loop2` (przez SSH) i sprawdza, że w menu „Konto” stoi „Panel właściciela” — in the cycle

## Decisions in play

Stan w repo `loop2` na commicie `2a8645d4`.

- **D-137** — How does the operator block and unblock a player account? (`foundations/decisions.md:2881`)
  - Brzmienie: „The operator blocks and unblocks a player account, named by its email address normalized as at login, with a command run in the `loop2` container, which reports that the account was blocked or unblocked, that it was already in the state asked for, or that no account has that address, and which changes nothing when it refuses. Blocking marks the account blocked, deletes every session of the account and stops every emailed link of the account in one transaction; unblocking clears the account's blocked mark and restores no session and no link. The `loop2-deploy` skill describes the command, and only a human runs it on the server.” Weryfikacja: „violates: an HTTP route of the account server that blocks accounts”. Odrzucone: „an owner panel in the browser with an owner role — a new route inside the trust boundary to defend”.
  - Zmiana, którą robi zadanie (pytanie 1, 3 i 4): blokuje i odblokowuje także konto z rolą właściciela z panelu w grze, przez trasę API, która odmawia sesji bez tej roli, z tym samym skutkiem w jednej transakcji; konta z rolą właściciela panel nie blokuje; komenda zostaje jako droga awaryjna. Panel właściciela wychodzi z *Rejected*, a uzasadnienie mówi, że ryzyko przejęcia konta właściciela przyjęto przy pięciu kontach na serwerze, wszystkich Mariusza, i że wraca do oceny, gdy gra otworzy się dla innych.
- **D-400** — What is the previous-save privilege and who gives it? (`foundations/decisions.md:9694`)
  - Brzmienie: „The previous-save privilege is a flag on the player account, off when the account is created, which the operator grants and revokes, naming the account by its email address normalized as at login, with the command `account-previous-save` run in the `loop2` container as D-137 gives for the block […] and only a human runs it on the server. […] and no HTTP route grants or revokes it.” Weryfikacja: „violates: an HTTP route of the account server that grants or revokes the privilege”. Odrzucone: „an HTTP route that grants the privilege — D-137 keeps an operator route out of the server”.
  - Zmiana, którą robi zadanie (pytanie 1 i 3): uprawnienie nadaje i odbiera także konto z rolą właściciela z panelu, przez trasę API odmawiającą sesji bez tej roli, każdemu kontu, właścicielowi też; komenda zostaje.
- **D-109** — What identity authorizes an account request? (`foundations/decisions.md:2128`)
  - Brzmienie: „[…] a valid server-side session alone authorizes reading its own account, reading and replacing its own account's saved game state, reading its own account's previous save and starting its own account's game from zero, each of those two for an account that holds the previous-save privilege (D-400), asking for a confirmation message to its own account's address or destroying that browser's session. […] an account identifier or email address supplied in a request grants no authority […]”.
  - Zmiana, którą robi zadanie: ważna sesja konta z rolą właściciela, czytaną przy każdym żądaniu, autoryzuje też odczyt listy kont i cztery operacje na cudzym koncie wskazanym w żądaniu; sesja bez tej roli dostaje na tych trasach odmowę.
- **D-202** — Who can create and use a player account? (`foundations/decisions.md:3894`)
  - Brzmienie: „Anyone can create a player account and start playing without approval. A signed-in player can read and change only their own saved game state. The operator can block an account from signing in and using the game.”
  - Zmiana, którą robi zadanie: nowe konto jest graczem; blokować konto może też konto z rolą właściciela, z panelu.
- **D-112** — How does the account database open and preserve its schema? (`foundations/decisions.md:2182`)
  - Brzmienie (fragmenty): „[…] the operator's blocking command of D-137, its command for the previous-save privilege of D-400 and the backup command of D-231 each open one short-lived connection beside it under the same rules; opening reads the schema version and, in the same transaction, applies in order every migration step after it up to the current version 5 — one step per version, a step never edited once deployed, a later version adding one step at the end […]. Accounts have an opaque random primary identifier, uniquely normalized email, encoded password hash, creation time, blocked state and the time their email address was confirmed, unset until it is, and the previous-save privilege, off until the operator grants it […]”.
  - Zmiana, którą robi zadanie (pytanie 2): konto ma też rolę, gracz albo właściciel, gracz przy założeniu; schemat dostaje wersję 6 jednym krokiem na końcu, który zostawia każde istniejące konto graczem; komenda roli otwiera krótkie połączenie obok serwera na tych samych zasadach.
- **D-280** — Which screens does the game have, and how does the player move between them? (`foundations/decisions.md:6519`)
  - Brzmienie (fragment): „[…] over the game the items Siedziba, Mapy and Programy, with no icons, and the menu „Konto” with the address and „Wyloguj” […]”.
  - Zmiana, którą robi zadanie (pytanie 5): menu „Konto” konta z rolą właściciela trzyma też „Panel właściciela”; gra ma ekran listy kont, tylko dla właściciela; pozycje paska bez zmian.
- **D-281** — How does an address name a screen? (`foundations/decisions.md:6582`)
  - Brzmienie (fragment): „An address names a screen in the fragment after `#`: `#/`, `#/postac/{n}`, `#/mapy`, `#/mapy/{map}`, `#/programy`, `#/programy/{n}` and `#/postac/{n}/przejscie` […] and any other Siedziba […]”.
  - Zmiana, którą robi zadanie (pytanie 5): dochodzi `#/konta`, ekran listy kont dla konta z rolą właściciela; dla gracza adres prowadzi do Siedziby jak „any other”.
- **D-252** i **D-354** — logi i zdanie komendy serwisowej (`foundations/decisions.md:5541`, `:8963`)
  - Brzmienie (D-252, fragment): „The product logs changes of a player's account and of access to it […], and an agent adds alone an item that fits this principle, an identifier of a thing included, while anything that points to a person takes the human's consent.” D-354: „The sentence by which a service command of the account server, `account-block`, `account-previous-save` or `account-backup`, answers the operator is no log line […]”.
  - Zmiana, którą robi zadanie: lista komend serwisowych D-354 i D-252 dostaje komendę roli; operacje z panelu i zmiana roli to zmiany konta, które produkt loguje.
- **D-104** — Which request origin and body may change account state? (`foundations/decisions.md:2061`)
  - Brzmienie (fragment): „[…] every state-changing route requires exactly the configured serialized HTTPS Origin and an application/json body with […] at most 16 KiB for every other route […]”.
  - Bez zmiany: obowiązuje cztery nowe trasy operacji.
- **D-12** — What access to the server does an agent have? (`foundations/decisions.md:339`)
  - Brzmienie: „An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human.”
  - Bez zmiany: komendę roli uruchamia człowiek (*Human actions*).

## Settlements to record

Candidates: 9 shown, 9 accepted — 2026-11-14

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Konto z rolą właściciela blokuje i odblokowuje konta oraz nadaje i odbiera uprawnienie do poprzedniego zapisu z panelu w grze; ryzyko przejęcia konta właściciela przyjęte przy pięciu kontach na serwerze, wszystkich Mariusza, wraca do oceny, gdy gra otworzy się dla innych. | decision | pytanie 1 (zmienia D-137 i D-400) | czy w ogóle wolno dodać trasę blokującą konto, skoro D-137 ją odrzuca |
| 2 | Rola (gracz albo właściciel) jest zapisana przy koncie w bazie, a rolę właściciela nadaje i odbiera komenda uruchamiana przez człowieka w kontenerze `loop2`. | decision | pytanie 2 (zmienia D-112) | rola w bazie czy adres w ustawieniach serwera |
| 3 | Komendy `account-block` i `account-previous-save` zostają obok panelu jako droga awaryjna. | decision | pytanie 3 | usunięcie komend jako zdublowanych przez panel |
| 4 | Panel nie blokuje konta z rolą właściciela, także własnego, a uprawnienie do poprzedniego zapisu nadaje i odbiera każdemu kontu. | decision | pytanie 4 | czy właściciel może zablokować sam siebie albo innego właściciela |
| 5 | Panel właściciela otwiera odnośnik „Panel właściciela” w menu „Konto” właściciela, pod adresem `#/konta`; pasek menu gracza i właściciela jest taki sam. | decision | pytanie 5 (zmienia D-280 i D-281) | czwarta pozycja paska menu albo inne miejsce wejścia |
| 6 | Lista kont pokazuje tylko adres e-mail, stan blokady i uprawnienie do poprzedniego zapisu, posortowane po adresie. | decision | pytanie 6 | dołożenie daty założenia, potwierdzenia adresu albo innych danych gracza |
| 7 | „Zablokuj” otwiera potwierdzenie, a odblokowanie i obie operacje uprawnienia działają od razu. | decision | pytanie 7 | potwierdzenie przy każdej operacji albo przy żadnej |
| 8 | Każda trasa panelu właściciela odmawia sesji konta bez roli właściciela, a rolę czyta przy każdym żądaniu, nie z chwili logowania; serwer odmawia blokady konta z rolą właściciela. | invariant | To do 5 i 6, pytanie 4; przyjęty: Mariusz (przez doradcę dnia), 2026-11-14, „1 a — przyjąć oba wiersze” | test odmowy tylko jednej trasy albo rola zapamiętana w sesji przy logowaniu |
| 9 | „Właściciel” w grze to rola konta, a nie tylko osoba z dostępem do serwera, którą dziennik nazywa „operator” albo „owner”. | glossary term | pytanie 1 i 2; hasła słownika „blocked account” i „previous-save privilege” mówią „the operator”; przyjęty: Mariusz (przez doradcę dnia), 2026-11-14, „1 a — przyjąć oba wiersze” | „owner” w nowych wpisach czytane raz jako osoba z SSH, raz jako rola konta |

## Out of scope

- Nowe operacje na kontach, inne niż blokada, odblokowanie, nadanie i odebranie uprawnienia do poprzedniego zapisu.
