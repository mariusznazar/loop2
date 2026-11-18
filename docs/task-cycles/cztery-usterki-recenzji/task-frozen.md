<!-- Frozen copy. Original path in the author notes vault: the task's note in the author's backlog. Candidates accepted 2026-11-14; point 7 of To do added by the adviser of the day 2026-11-18. Frozen 2026-11-18 at cycle start. -->

---
title: Cztery usterki z eksperymentu z recenzentami — blokada kont, lokalny start, schemat bazy
status: draft
created: 2026-11-14
updated: 2026-11-14
tags: [zadanie]
related: "the author's note of the project"
---

# Cztery usterki z eksperymentu z recenzentami — blokada kont, lokalny start, schemat bazy

Status: ready for cycle
Project relation: independent

## Description

### Need

- Eksperyment z recenzentami zmian znalazł cztery usterki, które stoją w `main` do dziś; każdą potwierdza kod.
- Najważniejsza dotyczy Mariusza jako właściciela serwera testowego: instrukcja blokowania kont w skillu wdrożenia mówi, że logowanie zablokowanego konta nie liczy się do limitu nieudanych prób, a złe hasło zablokowanego konta się liczy.
- Gracz zablokowany, który pięć razy poda złe hasło, dostaje więc komunikat o zbyt wielu próbach, a instrukcja mówi, że to niemożliwe.
- Pozostałe trzy są rzadkie i na serwerze testowym praktycznie nie zachodzą: polecenie blokady konta zapisuje schemat w pliku, który nie jest bazą kont, i radzi powtórzyć polecenie przy awarii, której powtórzenie nie naprawi; lokalny start ogłasza adres gry, choć port jego serwera zajął inny program; baza o nowszym, nieznanym schemacie dostaje zmieniony tryb dziennika, zanim zostanie odrzucona.
- Dwie ostatnie sprawiają, że instrukcja blokowania kont mówi nieprawdę także w zdaniu „Every other exit changed nothing”.
- Polecenie kopii bazy ma te same dwie usterki co polecenie blokady; tam pusty plik bazy dałby nocną kopię uznaną za udaną, a bez żadnego konta.
- Co jeśli nic: nieprawda w instrukcji zostaje; reszta niczego dziś nie psuje.

### To do

1. Zdanie skilla wdrożenia o limicie nieudanych logowań mówi, że do limitu nie liczy się tylko logowanie zablokowanego konta z poprawnym hasłem, a złe hasło liczy się jak przy każdym koncie — w obu kopiach skilla (`.claude/skills/loop2-deploy/SKILL.md` i `.agents/skills/loop2-deploy/SKILL.md`).
2. Polecenie blokady konta i polecenie kopii bazy odmawiają pliku, w którym serwer nie założył tabel — pustego, niebędącego bazą SQLite albo bazy SQLite bez numeru wersji schematu — kodem wyjścia 3, tym samym co przy braku pliku, i niczego w nim nie zapisują; nową bazę zakłada tylko serwer.
3. Polecenie blokady konta i polecenie kopii bazy radzą „run the command again” tylko wtedy, gdy baza była zajęta dłużej niż czas oczekiwania; każda inna awaria bazy kończy się tym samym kodem 1 i zdaniem bez tej rady.
4. Lokalny start (`npm run local`), gdy port jego serwera zajął inny program, kończy się porażką tak jak dziś, gdy serwer nie może wystartować — serwer wypisuje swój wiersz awarii, start kończy się jego kodem — nie ogłasza adresu gry, nie przekazuje żądań przeglądarki temu programowi i nie próbuje innego portu.
5. Otwarcie bazy o nieznanym nowszym schemacie odmawia, zanim zmieni tryb dziennika, więc plik zostaje taki, jaki był — tak, jak każe D-112.
6. Opis polecenia blokady i polecenia kopii w skillu wdrożenia, w obu kopiach, zgadza się z ich zachowaniem po punktach 2, 3 i 5.
7. D-153 zapisuje, że próba dostarczenia z prawdziwego kontenera przeszła dla obu rodzajów wiadomości: Mariusz sprawdził na zwykłej skrzynce Gmail wiadomość potwierdzającą adres i wiadomość resetu hasła, obie doszły i ich linki zadziałały. Źródło: słowa Mariusza z 2026-11-18 (przekazane przez doradcę dnia): „sprawdzałem działanie wszystkich maili i tych do resetu hasła również. Wszystkie były sprawdzane na zwykłej skrzynce na gmailu i działały poprawnie”; wiadomość potwierdzającą sprawdził 14.11 (loop2#153, pozycja 1), datę próby resetu hasła — nie podał. Zdanie, że dotarcia do zewnętrznej skrzynki nie pokazuje żaden wpis, znika. Publiczne odzyskiwanie konta jest włączone — decyzja Mariusza z 2026-11-18: „włączamy”. Karta logowania ma dziś „Nie pamiętam hasła” i formularz nowego hasła (`src/browser/view/account-card.tsx`), a Mariusz z nich korzystał; cykl sprawdza, czy cokolwiek w grze albo na serwerze to odzyskiwanie wyłącza, i jeśli tak — włącza je; D-153 mówi, że jest włączone (dopisane przez doradcę dnia 2026-11-18).

### Questions to settle

- 1. Co polecenie blokady konta uznaje za „nie bazę kont” i jak odmawia?
  - Answer: każdy plik, w którym serwer nigdy nie założył tabel — pusty, niebędący bazą SQLite albo baza SQLite bez numeru wersji — dostaje odmowę kodem 3, tym samym co brak pliku, i nic nie jest w nim zapisane; to zmienia D-112, bo nową bazę zakłada odtąd tylko serwer, nie polecenia operatora. Jeden kod mówi „to nie ten plik”, a opis w skillu rośnie najmniej.
  - Not chosen:
    - ten sam zakres odmowy z nowym kodem 5 „plik nie jest bazą kont” — jeden kod więcej w skillu; odróżnia złą ścieżkę od złego pliku, ale tę różnicę i tak mówi komunikat, a numeru nic nie czyta automatycznie
    - odmowa tylko dla pustego pliku — obca baza SQLite bez schematu dalej dostaje tabele, połowa usterki zostaje, a D-112 i tak się zmienia
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „1 a”.
- 2. Przy jakich awariach polecenie blokady dalej radzi „run the command again”?
  - Answer: tylko gdy baza była zajęta dłużej niż czas oczekiwania, bo tylko wtedy powtórka pomaga; pozostałe awarie — nowszy schemat, plik uszkodzony, brak prawa zapisu — mają ten sam kod 1 i zdanie bez rady.
  - Not chosen:
    - osobny kod dla „zajęta” i osobny dla pozostałych awarii — jeden kod więcej w skillu bez zysku, bo kodów nic nie czyta automatycznie, a nocny skrypt kopii traktuje każdy niezerowy kod jak porażkę
    - rada znika całkiem — najczęstszy przypadek, serwer akurat zapisujący, traci podpowiedź i właściciel zgaduje
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „2 a”.
- 3. Czy poprawki z pytań 1 i 2 obejmują też polecenie kopii bazy?
  - Answer: tak, w tym zadaniu — jeden plik, jego testy i akapit o kopii w skillu więcej, a zmiana D-112 obejmuje oba polecenia naraz, bez okresu, w którym jedno zakłada bazę, a drugie nie.
  - Not chosen:
    - osobne zadanie — kolejne doprecyzowanie i cykl, a do scalenia D-112 mówi co innego o każdym z dwóch poleceń
    - zostawić — nocna kopia z pustego pliku dalej przechodzi jako udana, bez powiadomienia i bez żadnego konta
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „3 a”.
- 4. Co robi lokalny start, gdy port jego serwera zajmie w międzyczasie inny program?
  - Answer: kończy się porażką tak jak dziś, gdy serwer nie może wystartować — serwer wypisuje swój wiersz awarii, start kończy się jego kodem i nie ogłasza adresu; człowiek albo agent uruchamia `npm run local` jeszcze raz i dostaje nowy port. Najmniej kodu, a przypadek zdarza się bardzo rzadko.
  - Not chosen:
    - start sam losuje nowy port i próbuje jeszcze raz — więcej kodu i test powtórki, a oszczędza jedno ręczne ponowienie w przypadku, który prawie się nie zdarza
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „4 a”.

## Context

- Źródło: raport eksperymentu z recenzentami w notatkach Mariusza, `the report of the experiment with reviewers in the author's notes`, ustalenie 7 i działanie D1; opisy i sondy recenzentów w `the folder of the reviewers' answers beside that report` (`z3-B2.md`, `z3-G1.md`, `z1-G1.md`, `z4-G2.md`).
- Usterka 1: `.claude/skills/loop2-deploy/SKILL.md:419-420` („A login of the blocked account does not count towards the limit of failed logins.”) wobec `src/server/account-routes.ts:810-813`, gdzie złe hasło zablokowanego konta przechodzi przez `ticket.fail()`, i `:825-828`, gdzie poprawne hasło zablokowanego konta przechodzi przez `ticket.release()`; stan na `6ab6a32b`.
- Usterka 2: `src/server/account-block.ts:50-58` przepuszcza każdy istniejący plik, także pusty; `src/server/database.ts:259-274` traktuje plik bez wersji schematu jak nową bazę i zakłada w nim tabele; komunikat `account-block.ts:82` radzi „run the command again” przy każdym błędzie bazy; stan na `6ab6a32b`.
- Polecenie kopii bazy ma to samo: `src/server/account-backup.ts:39-42` przepuszcza każdy istniejący plik, a `:115` radzi „run the command again”; nocny skrypt kopii (`deploy/loop2-backup`) traktuje każdy niezerowy kod polecenia jako porażkę, więc nie zależy od numerów kodów; stan na `6ab6a32b`.
- Usterka 3: `scripts/local-start.mjs:224-229` wybiera wolny port i zwalnia go, a `:248-255` uznaje serwer za gotowy, gdy port przyjmuje połączenie — także połączenie z cudzym programem, który zajął port w międzyczasie; `:401` ogłasza wtedy adres; stan na `6ab6a32b`.
- Usterka 4: `src/server/database.ts:197` przełącza tryb dziennika na WAL, zanim `:259-269` sprawdzi wersję schematu i odmówi nowszej; stan na `6ab6a32b`.
- Pewność: usterki 1, 2 i 4 sprawdzone w kodzie przez autora raportu i przy tym doprecyzowaniu; usterkę 3 kod pokazuje, ale sondy recenzenta nikt nie powtórzył.
- Polecenia blokady i kopii według wytycznych `guidelines/coding-database-access.md` nie trzymają własnego SQL: każde sprawdzenie bazy należy do `src/server/database.ts`.
- Wersję schematu serwer czyta dziś w transakcji, która zakłada albo przenosi bazę, żeby dwa procesy nie zrobiły tego naraz (`database.ts:252-253`); sprawdzenie przed zmianą trybu dziennika tego nie zastępuje.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- **D-112 — How does the account database open and preserve its schema?** (fragment) „The account server opens one application-owned SQLite connection before readiness, and the operator's blocking command of D-137 and the backup command of D-231 each open one short-lived connection beside it under the same rules; opening reads the schema version and, in the same transaction, applies in order every migration step after it up to the current version 4 — one step per version, a step never edited once deployed, a later version adding one step at the end — so it initializes a new database, moves an existing older known version forward keeping every account, session, emailed link and saved game state and their values, and refuses an unknown newer schema without changing it.”
  - Zmiana, którą robi zadanie (pytania 1 i 3): nową bazę zakłada tylko serwer; polecenie blokady i polecenie kopii odmawiają pliku, w którym serwer nie założył tabel — pustego, niebędącego bazą SQLite albo bazy bez numeru wersji — i niczego w nim nie zapisują.
  - Punkt 5 *To do* doprowadza kod do zdania „refuses an unknown newer schema without changing it”, którego dziś nie spełnia.
- **D-137 — How does the operator block and unblock a player account?** „The operator blocks and unblocks a player account, named by its email address normalized as at login, with a command run in the `loop2` container, which reports that the account was blocked or unblocked, that it was already in the state asked for, or that no account has that address, and which changes nothing when it refuses. Blocking marks the account blocked, deletes every session of the account and stops every emailed link of the account in one transaction; unblocking clears the account's blocked mark and restores no session and no link. The `loop2-deploy` skill describes the command, and only a human runs it on the server.”
- **D-139 — What does the login of a blocked account tell the player?** „A login of a blocked account with the correct password is refused with „To konto jest zablokowane.”, status 403 and the code `account-blocked`, and no session, while a wrong password of a blocked account gets the login message of D-100. That refusal is neither a failed nor a successful login for the attempt limits of D-102: it adds no failure and clears none, and an address locked by failures refuses it as it refuses every login.”
  - Punkt 1 *To do* doprowadza zdanie skilla do tej decyzji.
- **D-231 — Where does the database backup run?** (fragment) „That command opens only an existing database file, needs its one fixed word `--to-standard-output`, without which it refuses before it opens the database and prints nothing to standard output, and is run only by a human or the installed backup script.”
  - Zadanie rozszerza „opens only an existing database file” o odmowę pliku, który nie jest bazą kont, jak w zmianie D-112 wyżej.
- **D-255 — Where does the data an agent checks the game on come from?** (fragment) „One command of the repository starts the game locally over HTTPS, and a check touches neither the test server nor a player's save.”

## Settlements to record

Candidates: 6 shown, 4 accepted — 2026-11-14

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Nową bazę kont zakłada tylko serwer; polecenie blokady i polecenie kopii odmawiają pliku, w którym serwer nie założył tabel — pustego, niebędącego bazą SQLite albo bazy bez numeru wersji — kodem 3, tym samym co brak pliku, i niczego w nim nie zapisują (zmienia D-112, rozszerza D-231). | decision | pytania 1 i 3 pod *Questions to settle* (wybór doradcy dnia w imieniu Mariusza) | czy zmiana trafia do D-112 jako nowe brzmienie zdania o otwieraniu bazy przez polecenia, czy zostaje tylko w kodzie, i jaki kod wyjścia dostaje zły plik |
| 2 | Polecenia blokady i kopii radzą powtórzenie tylko wtedy, gdy baza była zajęta dłużej niż czas oczekiwania; każda inna awaria bazy kończy się tym samym kodem 1 bez tej rady. | decision | pytania 2 i 3 pod *Questions to settle* (wybór doradcy dnia w imieniu Mariusza) | osobny kod dla bazy zajętej albo rada usunięta całkiem, i czy reguła wiąże kolejne polecenia operatora |
| 3 | Lokalny start, którego port serwera zajął inny program, kończy się porażką swojego serwera, bez ogłaszania adresu i bez ponownej próby na innym porcie. | decision | pytanie 4 pod *Questions to settle* (wybór doradcy dnia w imieniu Mariusza) | czy dopisać ponowną próbę na nowym porcie, a później czy wolno ją dodać bez zmiany decyzji |
| 4 | Otwarcie bazy o nieznanym nowszym schemacie nie zmienia pliku bazy, także jego trybu dziennika. | invariant | punkt 5 *To do*; D-112 („without changing it”), którego niezmiennik `account-schema-lifecycle` dziś nie obejmuje (mówi tylko „refuses a newer unknown schema before readiness”) | czy test odmowy nowszego schematu sprawdza też, że plik się nie zmienił, i czy cytuje go niezmiennik |

## Out of scope

none
