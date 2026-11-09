---
title: Porządki z uwag PR-ów loop2 z realnym ryzykiem
status: draft
created: 2026-11-08
updated: 2026-11-08
tags: [zadanie]
related: "a link to the project's folder note"
---

# Porządki z uwag PR-ów loop2 z realnym ryzykiem

Status: ready for cycle
Project relation: independent

## Description

### Need

- Pełne `npm test` co jakiś czas pada samo z siebie, bez winy zmiany: przypadek ciasteczka sesji w `tests/account-storage.test.mjs` dostaje 5001 zamiast 5000 i wywrócił bramkę PR #51 (uwaga loop2#043-28 = 051-1); test zajętego portu ma 5-sekundowy limit, który pod obciążeniem raz już się przekroczył (loop2#050-21). Mariusz i agenci tracą wtedy przebieg i sprawdzają, czy to nie ich zmiana.
- Kilka miejsc zapisuje awarię, której nie było, zapisuje jedną awarię dwa razy albo mówi w logu nieprawdę, wbrew regule „Awarię zapisuj zawsze z przyczyną … raz, tam gdzie kod ją obsługuje” (`guidelines/coding.md:123`) — polecenie kopii bazy pisze „No backup was made”, choć kopia wyszła, lokalny start pisze dwa wiersze jednej awarii, a przeglądarka, która zerwie wysyłanie, liczy się jako awaria serwera.
- Przy kilku sprawdzeniach wczytywania zapisu gry, zapisu przy zamykaniu karty i zabezpieczeniach serwera można by wprowadzić usterkę, przez którą gracz traci cały zapis, a testy dalej by przeszły (uwagi loop2#043-2, 043-6, 043-23, 044-4, 047-5, 051-15, 051-9).
- Gracz, który wklei link z maila potwierdzającego albo resetu hasła do karty z już otwartą grą, ląduje w Siedzibie, a link przepada bez potwierdzenia (loop2#055-3).
- Skill wdrożenia ma zdania, przez które Mariusz albo agent źle odczyta instrukcję: trzy kroki o jednej nazwie, „nie ma przycisku zapisu” obok przycisków „Zapisz…”, pomiar haseł bez przyczyny porażki i bez sprzątania, polecenia usuwające wolumen, wynik polecenia blokady, linki po odblokowaniu (loop2#043-14, 043-16, 032-11, 032-12, 032-17, 032-4, 036-2, 037-1).
- Blok zapisu hasła poczty ze skilla, wklejony w terminal bez wklejania nawiasowego, zapisuje jako hasło następną wklejoną linię, `stat -c '%U %g %a' "$f"`, bez żadnego błędu (loop2#037-13; wniosek z tekstu bloku, nie próbowany w terminalu).
- Dwie linie fundamentu i skilla do grania są niezawinięte (loop2#050-10, 050-11).
- Źródłem jest pierwszy przegląd fundamentu z 2026-11-06/07; każdą pozycję sprawdzono ponownie na `main` `72287c2` 2026-11-08 i wszystkie stoją, poza zmienioną 037-9 (zob. Context).

### To do

Testy, które padają same z siebie:

1. Przypadek ciasteczka sesji w `tests/account-storage.test.mjs` (dziś `:1825`–`:1831`, `assert.equal(before.cookie.expires.getTime(), 5000, …)`) daje ten sam wynik niezależnie od tego, czy między dwoma odczytami zegara minie milisekunda (loop2#043-28 = 051-1).
2. Przypadek zajętego portu w `tests/startup.test.mjs` (dziś `timeout: 5000`, `:120`) nie pada pod obciążeniem komputera bez winy zmiany (loop2#050-21).
3. Trzy przypadki `tests/http.test.mjs`, które czekają na `f.policy.inFlight === 1` (dziś `:1382`, `:1839`, `:1893`), nie zależą od tego, że sprawdzenie hasła trwa dłużej niż jedno sprawdzenie warunku co 5 ms (loop2#036-1).
4. Klasa `OneExpressProcessServesGameAndApi` w `tests/invariants/test_loop2_one_serving_process.py` wykonuje się w pełnym `npm test` na komputerze Mariusza; gdy jej przygotowanie pada, cykl usuwa przyczynę (loop2#038-2).

Zapis awarii:

5. Polecenie `account-backup`, gdy kopia wyszła w całości, a zawiodło tylko sprzątanie katalogu tymczasowego, nie pisze „No backup was made; run the command again.” (loop2#046-6; `src/server/account-backup.ts:90`–`:98`).
6. `npm run local:stop` bez zbudowanej gry, przy jednym zepsutym katalogu startu, nadal wysyła polecenie zatrzymania pozostałym startom (loop2#050-4; `scripts/local-start.mjs:69`–`:77`, `:386`–`:397`).
7. Jeden zepsuty katalog lokalnego startu zostawia jeden wiersz awarii, nie dwa (loop2#050-6; `scripts/local-start.mjs:392`–`:395` i `:406`–`:410`).
8. Gdy serwer zerwie odpowiedź po nagłówkach, pośrednik lokalnego startu kończy połączenie z przeglądarką, zamiast zostawić ją czekającą, i zapisuje wiersz awarii (loop2#050-5; `scripts/local-start.mjs:172`–`:175`).
9. Przeglądarka, która zerwie wysyłanie treści żądania (`request.aborted`), dostaje odmowę jak przy odrzuconej treści i nie zostawia wiersza awarii (pytanie „Co jest awarią…”; loop2#051-6; `src/server/app.ts:90`–`:106`).
10. Blokada konta, która zapadnie w trakcie wysyłki maila przy rejestracji, nie zostawia wiersza awarii zapisu sesji; inna przyczyna nieudanego zapisu sesji nadal go zostawia (pytanie „Co jest awarią…”; loop2#037-9; `src/server/account-routes.ts:706`–`:724`, `src/server/database.ts:355`, `src/server/app.ts:60`–`:71`).

Testy, które dziś nie złapałyby usterki:

11. Test pokazuje, że zapis stanu gry idzie z `keepalive` (loop2#043-2; `src/browser/account-api.ts:376`–`:382`).
12. Testy wczytywania przyjmują skrzynię dokładnie pełną (`chestCapacity`) i domknięcie, które odłożyło dokładnie planowaną liczbę (loop2#043-23 = 044-8; `src/browser/sim/saved-game.ts:373`, `:775`).
13. Spreparowane dokumenty z dwiema postaciami o jednym numerze i z programem o numerze nie niższym od licznika programów są odrzucane z powodu tej jednej usterki, bez drugiej, która dziś odrzuca je wcześniej (loop2#043-6 = 044-9; `src/browser/sim/saved-game.ts:484`, `:512`; `tests/sim/saved-game.test.mjs:1145`–`:1152`).
14. Spreparowany dokument z przejściem zakończonym śmiercią i złym znacznikiem `solvedMapRun` jest odrzucany (loop2#044-4; `src/browser/sim/saved-game.ts:980`).
15. Test pokazuje, że zatrzymanie pętli postaci innej niż pierwsza zapisuje pokolenie tej postaci (loop2#047-5; `src/browser/sim/loop.ts:408`–`:410`).
16. Spreparowany program z grupą reguł, której nazwa nie jest tekstem, jest odrzucany przy wczytaniu (loop2#051-15; `src/browser/sim/programs.ts:249`).
17. Testy pokazują dwa zabezpieczenia serwera na błąd po rozpoczęciu odpowiedzi: `if (!response.writableEnded)` (`src/server/app.ts:68`) i gałąź `headersSent` (`:109`–`:110`) (loop2#051-9).
18. Test pokazuje, że przeglądarka, która odeszła w trakcie żądania, nie zostawia wiersza awarii pośrednika lokalnego startu (loop2#050-7; `scripts/local-start.mjs:163`–`:184`).
19. Test podrzuconego katalogu startu nie zależy od kolejności, w jakiej system zwraca nazwy katalogów (loop2#050-8; `tests/invariants/test_local_start_access.py:393`–`:399`; `scripts/local-start.mjs:282`).
20. Opisy pliku `tests/invariants/test_local_start_access.py` (`:11`, `:256`) mówią, które przypadki biegną na prawdziwym serwerze, a który na podstawionym (`:467`–`:470`) (loop2#050-9).

Gracz:

21. Gdy w adresie karty z już otwartą grą pojawi się link z maila (`#confirm-email=…` albo `#reset-password=…`), strona przeładowuje się i dalej robi to, co strona otwarta tym linkiem (pytanie „Co robi otwarta gra…”; loop2#055-3; `src/browser/view/game-view.ts:817`–`:822`, `src/browser/app.ts:584`–`:589`).

Teksty:

22. Trzy różne kroki o nazwie „H1” w `.claude/skills/loop2-deploy/references/setup_and_secrets.md` (`:41`, `:230`, `:309`) mają różne nazwy, w obu kopiach skilla (loop2#043-14).
23. Zdanie „the game has no save button; it saves itself after each change” (`setup_and_secrets.md:337`) nie przeczy przyciskom „Zapisz w programie”, „Zapisz jako nowy program” i „Zapisz” panelu programu (loop2#043-16).
24. Linia D-254 w `foundations/decisions.md` (dziś `:5226`, 138 znaków) i linia 35 `.claude/skills/loop2-play/SKILL.md` (127 znaków) są zawinięte jak sąsiednie, bez zmiany treści, w obu kopiach skilla (loop2#050-10, 050-11).

Skill wdrożenia (pytanie „Czy siedem uwag o skillu wdrożenia…”), w obu kopiach skilla:

25. Po nieudanym pomiarze haseł na serwerze Mariusz wie, czy zawiodło logowanie SSH, uprawnienia Dockera czy sam obraz, a nie widzi tylko „the image cannot be inspected” (loop2#032-11; `scripts/measure-passwords.mjs:89`, `:94`, `:197`, `:285`; lista porażek w `setup_and_secrets.md:405`–`:416`).
26. Skill mówi, jak znaleźć i usunąć kontener pomiaru `loop2-password-measure-<random>`, który został po przerwanym pomiarze albo zerwanym połączeniu (loop2#032-12; `setup_and_secrets.md:420`–`:421`; sprzątanie tylko w `finally`, `scripts/measure-passwords.mjs:251`–`:252`).
27. Skill podaje czas dodatkowego obciążenia serwera przy pomiarze haseł zgodny z pomiarem na serwerze — kilkanaście sekund — a nie „a few seconds” (loop2#032-17; `setup_and_secrets.md:422`–`:423`).
28. Skill wymienia jako usuwające wolumen z kontami tylko te polecenia Dockera, które go naprawdę usuwają (loop2#032-4; `setup_and_secrets.md:295`–`:296`).
29. Skill mówi, co wypisuje polecenie blokady konta przy błędnych argumentach (loop2#036-2; `.claude/skills/loop2-deploy/SKILL.md:231` „One line…” wobec `src/server/account-block.ts:39`–`:40`).
30. Opis odblokowania konta w skillu mówi, że linki z maili zatrzymane blokadą dalej nie działają i gracz prosi o nowe (loop2#037-1; `SKILL.md:229`–`:230`; D-137, D-160).
31. Blok zapisu hasła poczty (`setup_and_secrets.md:244`–`:256`) wklejony w terminal bez wklejania nawiasowego nie zapisuje jako hasła kolejnej wklejonej linii (loop2#037-13).

Wytyczne:

32. Reguła „Recording a failure” w `guidelines/coding.md` mówi, że zdanie, którym polecenie serwisowe (`account-block`, `account-backup`) odpowiada operatorowi, nie jest wierszem logu, więc wiersz JSON awarii i zdanie po nim to jeden zapis awarii; zmianę wytycznych robi skill `the-way-maintain-coding-guidelines` (pytanie „Co jest awarią…”; loop2#051-7, a w sekcji „Zadanie 4” źródła loop2#051-13).

### Acceptance criteria

- Każdy test dodany z pozycji 11–19 został raz widziany z porażką na kodzie z usterką, którą ma łapać.

### Questions to settle

- Czy siedem uwag o skillu wdrożenia z sekcji „Zostawić” (loop2#032-11, 032-12, 032-17, 032-4, 036-2, 037-1, 037-13) wchodzi do zadania, choć wstęp sekcji „Zadanie 2” je zapowiada, a tabela ich nie ma?
  - Answer: tak, wchodzą — pozycje 25–31.
  - Not chosen:
    - zostają w „Zostawić”, a poprawia się tylko wstęp sekcji — zadanie zamyka się na 26 pozycjach, a zostaje przypadkowe hasło poczty przy wklejaniu bloku (037-13) i sześć zdań skilla, które mylą się w niegroźny sposób
  - Source: Mariusz, 2026-11-08: „tak, niech wejdą”
- Co robi otwarta gra, gdy do jej karty wklei się link z maila?
  - Answer: A — strona przeładowuje się, gdy w adresie otwartej gry pojawi się link z maila, i dalej dzieje się to, co przy otwarciu linku w nowej karcie; przeładowanie w trakcie ręcznego przejścia opiera się na ostatnim zapisie przy ukryciu strony, który według D-207 nie ma gwarancji dotarcia, więc w złym razie przepada do 30 sekund gry.
  - Not chosen:
    - B. Otwarta gra sama obsługuje link bez przeładowania — nic nie przepada, ale powstaje druga droga obok startu strony, więcej kodu i testów, a gra musi znikać przy formularzu resetu (D-96)
    - C. Zostaje jak jest, a D-281 dopisuje, że otwarta gra traktuje link z maila jak adres bez ekranu — zero kodu; gracz nadal traci link bez słowa
  - Source: Mariusz, 2026-11-08: „A”
- Co jest awarią, a co zwykłym przebiegiem: przeglądarka zrywająca wysyłanie, blokada konta w trakcie rejestracji i zdanie dla operatora po wierszu JSON?
  - Answer: (1) przeglądarka zrywająca wysyłanie treści żądania to spodziewana odmowa, jak za duża albo zepsuta treść, bez wiersza awarii; (2) odmowa zapisu sesji z powodu blokady konta w trakcie rejestracji to zamierzony skutek blokady, bez wiersza awarii, a inna przyczyna nieudanego zapisu sesji zostaje awarią; (3a) zdanie, którym polecenie serwisowe odpowiada operatorowi, nie jest wierszem logu — zostaje obok wiersza JSON, a wytyczne to mówią. Każdy fałszywy wiersz awarii stałby się fałszywym alarmem strażnika z zadania „skąd wiem o awarii”.
  - Not chosen:
    - (1) zostawić zerwanie jako awarię — każde zerwane połączenie gracza daje alarm
    - (2) zostawić odmowę zapisu sesji przy blokadzie jako awarię — rzadki fałszywy alarm
    - (3b) usunąć zdanie dla operatora — po blokadzie albo jej odmowie operator widzi w terminalu sam JSON, wbrew D-137
    - (3c) usunąć wiersz JSON — awaria polecenia nie trafia do logu, wbrew D-252
  - Source: Mariusz, 2026-11-08: „tak, przyjmuję rekomendacje” (rekomendacje: 1 zmienić, 2 zmienić, 3a)

## Context

- Źródło pozycji: `the author's private note of the remarks of the first foundation review`, sekcja „Zadanie 2 (loop2): porządki z realnym ryzykiem”; kolumna „Słowa recenzenta” niesie brzmienie uwagi z opisu PR-a.
- Pozycje 25–31 pochodzą z sekcji „Zostawić” tego samego pliku, choć wstęp sekcji „Zadanie 2” je zapowiada; przy 032-4 sprawdzający zanotował „Nie sprawdzałem zachowania Dockera; opieram się na znanej semantyce `down -v`”, a skill wymienia trzy polecenia; czas kilkunastu sekund przy 032-17 pochodzi z uwagi recenzenta, kod go nie zawiera.
- Mariusz wybrał jedno zadanie zamiast podziału na pięć (testy niestabilne, zapis awarii, testy wczytywania, link z maila, teksty) — „wolę jedno zadanie” (2026-11-08).
- Ponowne sprawdzenie 2026-11-08 na `72287c2`: pliki kodu i testów pozycji 1–20 nie zmieniły się od `5694146`; mutantów nie uruchamiano ponownie.
- loop2#037-9 zmieniło się od przeglądu: zapis sesji na końcu odpowiedzi nadal pada (`src/server/database.ts:355` „Session cannot be replaced” przy zablokowanym koncie), ale dziś zostawia jeden wiersz `{"failure":"session",…,"place":"app.sessions"}` bez śladu stosu (`src/server/app.ts:60`–`:71`), a odpowiedź 201 dochodzi cała; ciasteczko wskazuje sesję, której baza nie ma. Prześledzone w kodzie, nie uruchomione.
- loop2#038-2: oba polecenia PowerShella, których używa przygotowanie klasy (`Get-NetTCPConnection -State Listen`, `Get-CimInstance Win32_Process`), zwracają 2026-11-08 wiersze z kodem 0; samego pliku nie uruchomiono, bo buduje grę.
- Numery linii w kolumnie „Stan dziś” źródła przesunęły się: 050-21 to `:120`, 050-9 to `:467`–`:470`, reguła „raz” to `guidelines/coding.md:123`–`:124`; numery w tym dokumencie są z `72287c2`.
- Zadanie `the note of another task in the author's backlog` (gotowe do cyklu) zmienia, dokąd trafiają wiersze JSON polecenia `account-block`, i dopisuje sekcję do `.claude/skills/loop2-deploy/SKILL.md`; pozycje 29 i 30 zmieniają ten sam plik, w sekcji o blokowaniu kont.
- Pytanie, czy zdania poleceń serwisowych są wierszami logu, stoi też w sekcji „Zadanie 4” źródła (loop2#051-13).
- Pozycja 24 zmienia `foundations/decisions.md`; wpisy fundamentu zmienia się tylko przez skill `the-way-record-decision` (`AGENTS.md`).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-84 — Which real mechanisms do new or changed tests exercise?: „A test of file or HTTP failure uses real temporary files or a real local server, waits for a readiness event or condition with a time limit and error handling, and cleans up its files, servers and processes even after failure; polling a condition is allowed…”
- D-77 — How are tests selected and limited as a whole?: „There is no configuration file limiting the whole run; a whole-run limit is reconsidered on a concrete problem with diagnosis time or a hanging run, while new or changed tests still bound their own waiting.”
- D-252 — How does loop2 write its failures to its logs, and what does it log?: „A log line of its Node.js code is one JSON object on one line, written through `console` with no library and under fixed field names, while its Bash scripts keep their own text and a line in the browser's console is plain text.” Jego *Verification* uznaje za zgodne „a failure the server handled written as one line with `failure`, `kind`, `code` and `place` and the `accountId` of its case”.
- D-137 — How does the operator block and unblock a player account?: „…with a command run in the `loop2` container, which reports that the account was blocked or unblocked, that it was already in the state asked for, or that no account has that address, and which changes nothing when it refuses. Blocking marks the account blocked, deletes every session of the account and stops every emailed link of the account in one transaction…”
- D-207 — When does the game save the game state on the server?: „…the browser has at most one save request in flight, each sent with `keepalive`…”
- D-213 — Which file is the exemplar for saved-game code?: „Saved-game code turns … an unknown value … into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it.”
- D-96 — What does a player see before and after signing in?: „…a page opened by a password-reset link shows the form „Ustaw nowe hasło” (D-225) in the card, for a signed-in player too, and builds no game while that form stands. … and after an emailed link (D-156, D-224) the page opens Siedziba.” oraz „a saved game state that the game discards — of another version, naming an archetype missing from the data or of a shape the game does not admit — starts a new game”.
- D-281 — How does an address name a screen?: „The fragments of emailed links (D-156, D-224) stand apart from these, and after them the page opens Siedziba.”
- D-156 — How does an emailed link confirm a player's email address?: „The game page the link opens sends the token to the account server in a request meeting D-104, also without a session…”
- D-224 — What form does a password-reset link take?: „The game page reads the token from the fragment of its address and sends it only with the form „Ustaw nowe hasło”, in a request meeting D-104.”
- D-160 — What does an emailed link of a blocked account do?: „A link that a block stopped stays stopped after the account is unblocked, and the player, signed in again, asks for a new confirmation message with „Wyślij ponownie”.”
- D-13 — Where do the server's access values and secrets live?: „…runtime credentials live outside the checkout in … `/etc/loop2/smtp-password` for the mail service … and grants the root-owned SMTP password file with group 1000 and mode 0440 only to the application as `/run/secrets/loop2_smtp_password`…”
- D-17 — How does loop2 share the Mikrus host with other workloads?: „A deployment of loop2 changes nothing on the host but loop2's own checkout, application and connector images and containers, its named database volume `loop2_accounts`, log and lock, and the build cache and base images its builds add to the shared Docker store, which it never prunes…”
- D-113 — Which file is the exemplar for password hashing?: „Hashing and verification share one bounded admission gate, preserve password content, and use one explicit Argon2id profile, measured with that gate in the deployed container image.”
- D-207, D-96, D-156 i D-224 mówią o stronie, którą link otwiera; żaden wpis nie mówi, co robi strona już otwarta, gdy fragment z maila pojawi się w jej adresie.

## Settlements to record

Candidates: 8 shown, 3 accepted — 2026-11-08

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Gdy w adresie karty z już otwartą grą pojawi się link z maila (`#confirm-email=…`, `#reset-password=…`), strona przeładowuje się i robi to, co strona otwarta tym linkiem. | decision | pytanie „Co robi otwarta gra…”, Answer i Not chosen | czy dopisać to obok D-281 i D-96, czy zostawić w samym kodzie; bez wpisu późniejsza zmiana adresów ekranów może po cichu wrócić do „link przepada” |
| 2 | Przeglądarka zrywająca wysyłanie treści żądania i odmowa zapisu sesji z powodu blokady konta w trakcie rejestracji to spodziewany przebieg, nie awaria, i nie zostawiają wiersza awarii; inna przyczyna nieudanego zapisu sesji zostaje awarią. | decision | pytanie „Co jest awarią…”, Answer (1), (2) i Not chosen | czy przy następnej zmianie obsługi błędów serwera te dwa przypadki znów zapisać jako awarię, co da fałszywe alarmy strażnika |
| 3 | Zdanie, którym polecenie serwisowe (`account-block`, `account-backup`) odpowiada operatorowi, nie jest wierszem logu; wierszem logu jest tylko wiersz JSON. | decision | pytanie „Co jest awarią…”, Answer (3a) i Not chosen | czy zdanie dla operatora liczyć jako drugi zapis awarii i je usuwać albo przenosić; wytyczna z pozycji 32 potrzebuje decyzji, z której wynika |

## Out of scope

none
