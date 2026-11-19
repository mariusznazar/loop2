---
title: loop2: dwie pozostałe komendy właściciela odmawiają pliku bez bazy i nie radzą ponawiania przy każdej awarii
status: draft
created: 2026-11-18T06:50
updated: 2026-11-18
tags: [zadanie]
related: "the note of the Loop project in the author's notes"
---

# loop2: dwie pozostałe komendy właściciela odmawiają pliku bez bazy i nie radzą ponawiania przy każdej awarii

Status: ready for cycle
Project relation: independent
Defect introduced by: none

## Description

### Need

- Dwa z czterech poleceń, które właściciel uruchamia na serwerze testowym — nadające albo odbierające rolę właściciela konta (`account-role`) i nadające albo odbierające uprawnienie do poprzedniego zapisu (`account-previous-save`) — dostają pusty plik albo bazę SQLite bez numeru wersji, zakładają w nim nową, pustą bazę kont i odpowiadają „Nothing changed”.
- Przy każdej awarii bazy radzą też „run the command again”, choć powtórka pomaga tylko wtedy, gdy baza była zajęta.
- Polecenia blokady konta i kopii bazy robią to już dobrze (PR #156, scalony 2026-11-18): odmawiają takiego pliku kodem 3 i radzą powtórkę tylko przy zajętej bazie.
- Odczuwa to Mariusz jako właściciel serwera, gdyby przez pomyłkę skierował któreś z tych dwóch poleceń na zły, pusty plik.
- Odczuwa to też każdy, kto czyta decyzje D-112 i D-430 oraz stronę instrukcji wdrożenia: po PR #156 mówią one o tych dwóch poleceniach zdanie nieścisłe — że „zakładają nową bazę w pliku, który żadnej nie zawiera”, a dla pliku niebędącego bazą SQLite polecenie kończy się awarią (kod 1, błąd SQLite 26) i zostawia plik bez zmian.
- Co jeśli nic: nic złego się dziś nie dzieje, takie pomyłki na serwerze testowym praktycznie nie zachodzą; zostaje niespójność czterech poleceń właściciela i nieścisłe zdanie w decyzjach i instrukcji.

### To do

1. Polecenie roli właściciela (`src/server/account-role.ts`) i polecenie uprawnienia do poprzedniego zapisu (`src/server/account-previous-save.ts`) odmawiają pliku, w którym serwer nie założył tabel — pustego, niebędącego bazą SQLite albo bazy SQLite bez numeru wersji schematu — kodem wyjścia 3 i tym samym zdaniem co polecenie blokady („LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.”), i niczego w nim nie zapisują.
2. Te dwa polecenia radzą „run the command again” tylko wtedy, gdy baza była zajęta dłużej niż czas oczekiwania; każda inna awaria bazy, na przykład nowszy schemat albo uszkodzony plik, kończy się kodem 1 i zdaniem bez tej rady, jak w poleceniu blokady.
3. Strona instrukcji wdrożenia, w obu kopiach (`.claude/skills/loop2-deploy/SKILL.md` i `.agents/skills/loop2-deploy/SKILL.md`), opisuje kody wyjścia obu poleceń zgodnie z punktami 1 i 2, na wzór akapitu „What it prints.” w sekcji „Blocking a player account”: w sekcji roli właściciela akapit „What it prints.” — zdanie kodu 1 „1 the database could not be opened or changed, for example because it stayed busy longer than the wait (run the command again)” i zdanie kodu 3 „3 `LOOP2_DATABASE_PATH` names no existing database file (the command never creates one)” (około linii 468–472) — i te same dwa zdania w akapicie „What it prints.” sekcji uprawnienia do poprzedniego zapisu (około linii 622–626); z akapitu „What it prints.” w sekcji „Blocking a player account” znika zdanie „the commands `account-previous-save` and `account-role` do not refuse such a file, and set up a new database in it” (około linii 555–557).
4. Komentarz przy opcji `existingOnly` w `src/server/database.ts` („Only the blocking and the backup commands open with it; the commands of D-400 and D-410 still set up a database in such a file.”, około linii 212–214) mówi, że tą opcją otwiera bazę każde polecenie, które właściciel uruchamia na serwerze i które zmienia albo kopiuje bazę kont, a nie otwiera nią sprawdzenie bazy przy budowaniu obrazu, które zakłada własną tymczasową bazę (pytanie 1).
5. Wytyczna `guidelines/coding-database-access.md`, reguła „Otwarcie schematu bez utraty danych” (zdanie „Sprawdź wersję w transakcji inicjalizacji; odmów otwarcia nieobsługiwanej wersji.”, około linii 26), mówi też, że wersję czyta się raz wcześniej, przed zmianą trybu dziennika, żeby nieznany nowszy schemat był odrzucony, zanim plik się zmieni, i że każde polecenie, które właściciel uruchamia na serwerze i które zmienia albo kopiuje bazę kont, otwiera ją opcją `existingOnly`, więc nową bazę zakłada tylko serwer; z nazwy wyłączone są, jak w decyzji, polecenie procedury odtwarzania, które tylko czyta adresy kont, i sprawdzenie bazy przy budowaniu obrazu (`src/server/account-database-check.ts`) (pytanie 1).
6. Wytyczna `guidelines/testing.md`, tabela pod „### Trust boundaries”, wiersz `src/server/` (zdanie, które zaczyna się „a dla polecenia blokady konta (D-112, D-137; bez niezmiennika) przypadek „the operator's command refuses a file in which the server set up no tables…”), wymienia też przypadki testów, w których polecenie roli właściciela i polecenie uprawnienia do poprzedniego zapisu odmawiają pliku bez tabel (pytanie 2).

### Questions to settle

- 1. Kogo wiąże reguła „nie zakładaj bazy w pliku bez tabel, radź powtórkę tylko przy zajętej bazie” w decyzjach D-112 i D-430 po tej zmianie?
  - Answer: każde polecenie, które właściciel uruchamia na serwerze i które zmienia albo kopiuje bazę kont — dziś polecenia blokady, kopii, roli właściciela i uprawnienia do poprzedniego zapisu, wymienione jako przykłady — także polecenie dodane później, bez zmiany decyzji. Decyzja wyłącza z nazwy dwa miejsca, które otwierają bazę inaczej: polecenie z procedury odtwarzania kopii, które tylko czyta adresy kont, i sprawdzenie bazy przy budowaniu obrazu (`account-database-check`), które zakłada własną tymczasową bazę — tak, żeby autor przyszłego polecenia nie musiał ich wyczytywać ze słów „zmienia albo kopiuje”.
  - Not chosen:
    - wymienić z nazwy tylko cztery dzisiejsze polecenia — decyzja opisuje dokładnie kod, ale piąte polecenie właściciela nie jest objęte regułą, jego autor wybiera zachowanie od nowa i może powtórzyć usterkę, która wróciła już dwa razy, a każde nowe polecenie wymaga zmiany decyzji
  - Source: doradca dnia w imieniu Mariusza, 2026-11-18: „1 b, 2 tak — za Twoimi rekomendacjami. Do 1 b: dwa wyłączenia (polecenie z procedury odtwarzania kopii, które tylko czyta adresy, i sprawdzenie bazy przy budowaniu obrazu) zapisz w decyzji z nazwy, nie tylko przez słowa „zmienia albo kopiuje”, żeby autor przyszłego polecenia nie musiał ich wyczytywać.”
- 2. Czy wytyczna testów wymienia testy odmowy pliku bez tabel obu poleceń tak, jak wymienia te dla poleceń blokady i kopii?
  - Answer: tak — punkt 6 *To do*; kosztuje jedno zdanie w wierszu `src/server/` tabeli granic zaufania.
  - Not chosen:
    - nie dopisywać — testy powstają i tak, ale wytyczna wymienia odmowę tylko dwóch z czterech poleceń, a sprawdzający zmianę według tej tabeli może uznać, że odmowy pozostałych dwóch nikt nie sprawdza
  - Source: doradca dnia w imieniu Mariusza, 2026-11-18: „1 b, 2 tak — za Twoimi rekomendacjami.”

## Context

- Źródło zadania: opis PR #156 (https://github.com/mariusznazar/loop2/pull/156), punkt 1 „Fix or let through”, uwagi (a), (b) i (c) zostawione bez poprawki, z rekomendacją „make one task of (a), which also fixes (b) and (c)”; zadanie zaparkowane w tej notatce 2026-11-18 jako uzgodnione.
- Uwagę (a) opisał recenzent całej zmiany PR #156 jako O-1, uwagę (b) recenzent poprawki jako N-1: `docs/task-cycles/cztery-usterki-recenzji/reports/review-whole-report.md` i `review-fix-report.md` w commicie `fc3b27d7` (jest tylko w historii gita, nie w końcowym drzewie).
- Stan kodu na `659b1e02`: `src/server/account-role.ts:66` i `src/server/account-previous-save.ts:69` otwierają bazę jako `new AccountDatabase(path)`, bez `existingOnly`; `account-role.ts:76` i `account-previous-save.ts:79` radzą „run the command again” przy każdej awarii.
- Wzór do powtórzenia stoi w `src/server/account-block.ts`: otwarcie z `{ existingOnly: true }`, odmowa `isNotAccountDatabase` kodem 3 ze zdaniem `noTablesSentence`, rada powtórki tylko przy `isDatabaseBusy`; każde sprawdzenie pliku bazy zostaje w `src/server/database.ts`, polecenia nie trzymają własnego SQL (`guidelines/coding-database-access.md`, przykład „Własność połączenia”).
- Dwa testy używają dziś pliku niebędącego bazą SQLite jako „bazy, która się psuje” i oczekują kodu 1 i błędu SQLite 26: w `tests/account-owner.test.mjs` przypadek „a database file that is no database fails with the JSON line of the failure first, and changes nothing” (około linii 600) i w `tests/account-storage.test.mjs` przypadek „a database failure of the previous-save command adds the error's kind and code and nothing of its text” (około linii 3727); oba cytują D-354. Po zmianie taki plik dostaje kod 3; PR #156 rozwiązał to samo dla poleceń blokady i kopii bazą uszkodzoną za pierwszą stroną.
- Przypadki „the role command changes nothing on a usage error, an unknown address or an unusable database, and creates none” (`tests/account-owner.test.mjs`) i „the previous-save command changes nothing on a usage error, an unknown address or an unusable database, and creates none” (`tests/account-storage.test.mjs`) sprawdzają radę powtórki przy zajętej bazie; ta rada zostaje.
- Pięć wierszy testów cytuje zdania D-112 i D-430, które zadanie przeredagowuje: `// decision: D-112 "Beyond the rules above, the blocking command of D-137 and the backup command of D-231 never set up a new database"` w `tests/account-backup.test.mjs` (około linii 430) i `tests/account-storage.test.mjs` (około linii 265 i 3369) oraz `// decision: D-430 "When the blocking command of D-137 or the backup command of D-231 cannot open or change the database…"` w tych samych plikach (około linii 469 i 3422); kontrola fundamentu wymaga, by cytat zaczynał wiążące zdanie decyzji, więc te wiersze zmieniają się razem z decyzjami. *Verification* obu decyzji wymienia dziś testy tylko dwóch poleceń („the blocking command and the backup command each refusing…”, „each of the two commands…”).
- Zmiana nie dotyczy dwóch innych miejsc, które otwierają bazę: polecenia z procedury odtwarzania kopii, które czyta adresy kont przez `node:sqlite` w trybie tylko do odczytu (`.claude/skills/loop2-deploy/references/backup_and_restore.md`, około linii 581), ani sprawdzenia bazy przy budowaniu obrazu, `src/server/account-database-check.ts`, które pracuje na własnej tymczasowej bazie i musi ją założyć.
- `Defect introduced by: none`: przed PR #156 D-112 kazał wszystkim poleceniom zakładać nową bazę w pustym pliku, a PR #156 zostawił te dwa polecenia celowo (punkt 4 „You accept by merging” w jego opisie); zadanie domyka zakres poprzedniego, nie naprawia regresji.
- Akceptacja całego dokumentu: doradca dnia w imieniu Mariusza, 2026-11-18.
- Scalenie do `main` samo wdraża zmianę na serwer testowy (`.github/workflows/deploy.yml`, `on: push: branches: [main]`), więc zadanie nie ma kroku dla człowieka poza repozytorium.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- **D-112 — How does the account database open and preserve its schema?** (trzeci akapit) „Beyond the rules above, the blocking command of D-137 and the backup command of D-231 never set up a new database: they open only a file in which the server has set up its tables, refuse a file that is empty, is no SQLite database or is a SQLite database with no schema version with the exit code 3 of a missing file and a sentence that names that case, and write nothing in it. The commands of D-400 and D-410 are not bound by this: they still set up a new database in a file that holds none.”; (z *Rationale*) „The blocking command and the backup command never set up a new database, because a command given a path that holds no database would otherwise write the tables of an empty one there, and a nightly backup of it would count as made with no account in it; the commands of D-400 and D-410 still do.”
  - Zmiana, którą robi zadanie (pytanie 1): nowej bazy nie zakłada żadne polecenie, które właściciel uruchamia na serwerze i które zmienia albo kopiuje bazę kont — dziś polecenia D-137, D-231, D-400 i D-410; każde odmawia pliku bez tabel kodem 3 ze zdaniem, które nazywa ten przypadek, i niczego w nim nie zapisuje. Decyzja wyłącza z nazwy polecenie procedury odtwarzania D-360, które tylko czyta adresy, i sprawdzenie bazy przy budowaniu obrazu. Zdanie o poleceniach D-400 i D-410, które „still set up a new database”, i jego odpowiednik w *Rationale* znikają.
- **D-430 — What do the blocking command and the backup command say when they cannot open or change the account database?** „When the blocking command of D-137 or the backup command of D-231 cannot open or change the database for a reason other than a file in which the server has set up no tables, which they refuse with the exit code 3 (D-112), they end with the exit code 1 and one sentence that says that nothing changed or that no backup was made. The sentence advises to run the command again only where the database stayed busy longer than the bounded busy timeout of D-112 allowed, since only then does a second run help; for any other failure of the database, such as a newer schema or a damaged file, it gives no such advice.”; (z *Rationale*) „The rule binds these two commands; the commands of D-400 and D-410 keep the sentence they have.”
  - Zmiana, którą robi zadanie (pytanie 1): reguła wiąże każde polecenie, które właściciel uruchamia na serwerze i które zmienia albo kopiuje bazę kont — dziś cztery — z tymi samymi dwoma wyłączeniami z nazwy co D-112; pytanie decyzji przestaje wymieniać tylko polecenie blokady i kopii, a zdanie, że polecenia D-400 i D-410 zachowują swoje zdanie, znika.
- **D-400 — What is the previous-save privilege and who gives it?** (fragment) „…with the command `account-previous-save` run in the `loop2` container as D-137 gives for the block — the command reports that the privilege was granted or revoked, that the account already was in the state asked for, or that no account has that address, and changes nothing when it refuses — and only a human runs it on the server.”
  - Zdanie zostaje prawdziwe: odmowa pliku bez tabel też niczego nie zmienia.
- **D-410 — What is the role of an account, who gives it and where does the server read it?** (fragment) „The role `owner` is given and taken by the command `account-role`, run in the `loop2` container and naming the account by its email address normalized as at login, which reports that the account was made an owner or made a player, that it already was so, or that no account has that address, which changes nothing when it refuses and ends no session and stops no link, and which only a human runs on the server (D-12).”
  - Zdanie zostaje prawdziwe, jak przy D-400.

## Settlements to record

Candidates: 3 shown, 2 accepted — 2026-11-18

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Nowej bazy kont nie zakłada żadne polecenie, które właściciel uruchamia na serwerze i które zmienia albo kopiuje bazę kont — dziś polecenia blokady, kopii, roli właściciela i uprawnienia do poprzedniego zapisu, także polecenie dodane później: każde odmawia pliku, w którym serwer nie założył tabel, kodem 3 ze zdaniem, które nazywa ten przypadek, i niczego w nim nie zapisuje; z nazwy wyłączone są polecenie procedury odtwarzania, które tylko czyta adresy kont, i sprawdzenie bazy przy budowaniu obrazu. | sentence of D-112 | pytanie 1 pod *Questions to settle* (wybór doradcy dnia w imieniu Mariusza; *Not chosen* tam) | czy D-112 wymienia z nazwy cztery polecenia, czy wiąże każde przyszłe, i czy dwa wyłączenia nazywa, czy zostawia je słowom „zmienia albo kopiuje” |
| 2 | Każde takie polecenie radzi „run the command again” tylko wtedy, gdy baza była zajęta dłużej niż czas oczekiwania; każda inna awaria bazy kończy się kodem 1 i zdaniem bez tej rady; wyłączenia jak w wierszu 1. | sentence of D-430 | pytanie 1 pod *Questions to settle* (wybór doradcy dnia w imieniu Mariusza; *Not chosen* tam) | czy D-430 dopisuje dwa polecenia z nazwy, czy wiąże każde przyszłe polecenie, i czy zmienia pytanie decyzji, które dziś wymienia tylko blokadę i kopię |

## Out of scope

- Polecenia blokady konta i kopii bazy — po PR #156 robią już to, czego to zadanie wymaga od dwóch pozostałych.
