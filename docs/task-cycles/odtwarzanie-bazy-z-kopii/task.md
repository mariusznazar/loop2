---
title: "loop2: poprawić instrukcję odtwarzania bazy z kopii i raz odtworzyć bazę na serwerze"
status: draft
created: 2026-11-08
updated: 2026-11-08
tags: [zadanie]
related: "a link to the project's folder note in the author's backlog"
---

# loop2: poprawić instrukcję odtwarzania bazy z kopii i raz odtworzyć bazę na serwerze

Status: ready for cycle
Project relation: independent

## Description

### Need

- Instrukcja kopii i odtwarzania bazy kont (`.claude/skills/loop2-deploy/references/backup_and_restore.md`) to jedyne, z czego Mariusz skorzysta w dniu awarii serwera gry.
- Recenzje PR #46 i #47 zostawiły w niej luki, przez które w dniu awarii można stracić zapisy graczy, przywrócić otwarty dostęp do konta po resecie hasła, zostawić plik z adresami i skrótami haseł z za szerokimi prawami albo utknąć na poleceniu, którego instrukcja nie podaje.
- Odtworzenie bazy na serwerze nigdy nie było próbowane (`backup_and_restore.md:282` „The procedure has never been tried.”), więc w dniu awarii Mariusz pierwszy raz sprawdziłby instrukcję.

### To do

1. Czytanie logu kopii: zdanie o pustej kopii (`backup_and_restore.md:72-74`) przestaje mówić jednocześnie, że skrypt zatrzymuje pusty plik i że pusty plik może zastąpić plik dnia (uwaga loop2#046-18).
2. Tabela kodów wyjścia skryptu kopii (`backup_and_restore.md:51-62`) mówi, co znaczy zapisany w logu kod 1 (uwaga loop2#046-23), a wiersz kodu 6 nie odsyła do „the line before it”, którego czytelnik nie odnajdzie (uwaga loop2#046-30, N3).
3. Ponowna instalacja kopii: zakaz scalania do `main` w kroku 2 (`backup_and_restore.md:107-110`) przestaje odwoływać się do „this request's merge” i do obrazu bez polecenia kopii, a mówi, kiedy przy ponownej instalacji naprawdę nie wolno wdrażać niczego innego (uwaga loop2#046-34).
4. Krok 5 instalacji (`backup_and_restore.md:115-116`) ostrzega, że wpisanie `KnownHostsCommand` albo `VerifyHostKeyDNS` do konfiguracji SSH roota albo systemowej wyłączyłoby sprawdzanie klucza Strychu (uwaga loop2#046-47, D-238).
5. Próba na komputerze właściciela: `age` zainstalowany z zipa da się wywołać w kroku 3, bo instrukcja mówi, jak (uwaga loop2#046-52); krok 1 podaje polecenie wejścia do prywatnego folderu (uwaga loop2#046-53); sprzątanie w kroku 8 ma osobny wiersz `icacls` dla każdego z dwóch plików kluczy (uwaga loop2#046-54).
6. Odtwarzanie na serwerze, krok 1: instrukcja podaje polecenie, którym człowiek pobiera kopię ze Strychu na serwer z kluczem hosta sprawdzanym wobec `/etc/loop2/strych-known-hosts`, i sposób odczytania, która kopia jest najnowsza (uwaga loop2#046-25).
7. Odtwarzanie na serwerze, krok 2: dla kopii zrobionej przed zmianą klucza szyfrowania instrukcja każe użyć starego klucza z prywatnej notatki (uwaga loop2#046-27).
8. Odtwarzanie na serwerze, krok 5: instrukcja podaje polecenie i tryb pliku bazy `0600` obok właściciela i grupy 1000 (uwaga loop2#046-24).
9. Odtwarzanie na serwerze: instrukcja mówi, jak podejść drugi raz po nieudanej próbie, nie nadpisując bazy zachowanej w `/root/loop2-restore/previous`, a dwa wiersze, które straciły zawinięcie (`backup_and_restore.md:233-234`, `:275`), są zawinięte jak reszta (uwaga loop2#046-31, C1 i C2).
10. Odtwarzanie na serwerze: instrukcja ostrzega, że scalenie do `main` w trakcie odtwarzania uruchomi wdrożenie w środku procedury, i mówi, czego w tym czasie nie robić (uwaga loop2#046-28).
11. Akapit „Restoring” (`backup_and_restore.md:194-199`) i granice próby (`:277-278`) mówią o wersji zapisu gry obok wersji schematu bazy: kopia z zapisami innej wersji niż ta, którą zna wdrożony kod, przechodzi próbę, a gra zastępuje te zapisy nową grą (uwagi loop2#046-48 i loop2#047-12).
12. Akapit „Restoring” (`backup_and_restore.md:194-195`) mówi, że odtworzenie sprzed resetu hasła przywraca stare hasło i sesje, które reset zakończył, a odtworzenie sprzed blokady przywraca konto odblokowane razem z sesjami, które blokada usunęła. Krok 8 odtwarzania każe zresetować hasło jeszcze raz każdemu, o kim człowiek wie, że od czasu kopii je resetował (dziś tylko konto Mariusza), mówi, że instrukcja nie daje sposobu ustalenia pozostałych, i każe zablokować ponownie konta zablokowane od czasu kopii (uwaga loop2#046-50, pytanie 2; blokady — krytyka dokumentu, Mariusz 2026-11-08: „tak jak rekomendujesz”).
13. Ścieżka „With no server”, krok 3 (`backup_and_restore.md:326-327`): klucze sesji idą z prywatnej notatki jako dotychczasowe, nie jako nowe z sekcji rotacji, które wylogowałyby wszystkich graczy (uwaga loop2#046-30, N2), a krok 4 mówi, co zrobić na hoście, z którego wiadomość `pusher` nie dochodzi (uwaga loop2#046-30, N1).
14. Lista „What an agent may read” (`backup_and_restore.md:188`) i praktyka czytania konfiguracji SSH roota przestają się rozjeżdżać: lista dozwolonych odczytów dostaje polecenie zwracające samą liczbę wierszy z `KnownHostsCommand` albo `VerifyHostKeyDNS` w konfiguracji SSH roota i w systemowej, a zakaz czytania treści zostaje (uwaga loop2#046-86, pytanie 3). Liczba obejmuje pliki dołączane dyrektywą `Include`, nie zależy od wielkości liter i pomija wiersze komentarza, bo inaczej może pokazać 0 przy ustawionej opcji.
15. Zdanie „The procedure has never been tried.” (`backup_and_restore.md:282`) ustępuje datą i wynikiem próby odtworzenia na serwerze z *Human actions* (uwaga loop2#046-57).
16. Fundament dostaje fakt środowiska: konfiguracja SSH roota i systemowa serwera, z plikami dołączanymi przez `Include`, nie ustawiają `KnownHostsCommand` ani `VerifyHostKeyDNS`, odczytany poleceniem liczącym z punktu 14; D-238 w *Based on* wskazuje na ten fakt (uwaga loop2#046-45).

### Acceptance criteria

- Każde miejsce, w którym Mariusz w próbie odtworzenia na serwerze utknął albo musiał coś dopowiedzieć, jest poprawione w instrukcji przed scaleniem.

### Questions to settle

- Pytanie 1: Jak przeprowadzić próbę odtworzenia na serwerze, żeby nie stracić zapisów graczy?
  - Answer: Mariusz odtwarza najnowszą kopię nocną ze Strychu, jak w prawdziwej awarii, razem z wyborem kopii po czasie; przepada to, co zapisano od 03:17, a na serwerze nie ma kont innych osób niż jego.
  - Not chosen:
    - świeża kopia zrobiona ręcznie tuż przed próbą i odtworzenie właśnie jej — przepadają tylko minuty zapisów, ale wybór najnowszej kopii po czasie na Strychu sprawdza się tylko częściowo
    - bez próby na serwerze, sama poprawa tekstu — nic dziś nie kosztuje, ale w dniu awarii procedura idzie pierwszy raz
  - Source: Mariusz, 2026-11-08: „b - nie ma kont innych osób niż moje”
- Pytanie 2: Co instrukcja każe zrobić po odtworzeniu, które cofnęło reset hasła?
  - Answer: Akapit o tym, co cofa odtworzenie, mówi, że wracają hasło i zalogowania sprzed resetu, a krok „Write down what was lost” każe każdemu, kto od czasu kopii resetował hasło, zresetować je jeszcze raz.
  - Not chosen:
    - wylogowanie wszystkich po odtworzeniu przez plik kluczy sesji z jednym nowym kluczem — wymaga wyjątku w D-13; Mariusz: „stare hasło sprzed resetu dalej działa trochę chyba pozbawia sensu tej akcji […] jak ktoś uzyskał dostęp do tego hasła to nie będzie miało znaczenia czy jest zalogowany czy nie”
    - wylogowanie wszystkich przez usunięcie zalogowań z odtworzonej bazy — nowe polecenie serwera z testami; z tego samego powodu
    - samo zdanie o skutku, bez kroku — w dniu awarii trzeba samemu wpaść na ponowny reset
  - Source: Mariusz, 2026-11-08: „więc chyba jednak a?”, po pokazaniu dróg (a), (b1), (b2), (c)
- Pytanie 3: Czy agent może czytać konfigurację SSH roota w jakiejkolwiek formie?
  - Answer: Agent może tylko policzyć: lista „What an agent may read” dostaje jedno polecenie, które zwraca samą liczbę wierszy ustawiających `KnownHostsCommand` albo `VerifyHostKeyDNS` w konfiguracji SSH roota i w systemowej (oczekiwane 0); zakaz czytania treści zostaje.
  - Not chosen:
    - zakaz w całości, sprawdzenie tych dwóch opcji tylko przez człowieka w kroku 5 instalacji — nic nie kosztuje, ale warunek D-238 sprawdza się tylko przy ręcznej instalacji, a agent szukający przyczyny nieudanej kopii go nie potwierdzi
  - Source: Mariusz, 2026-11-08: „a”

## Context

- Źródło zadania: sekcja „Zadanie 1 (loop2): odtwarzanie bazy z kopii i próba odtworzenia” w `the author's notes of the reviews of pull requests #46 and #47 (dated 2026-11-06)`, 18 uwag z PR #46 i #47 ze słowami recenzentów i stanem kodu z 2026-11-06.
- Uwaga loop2#046-45 (punkt 16) przyszła z sekcji „Zadanie 4” tego samego pliku: Mariusz przeniósł ją tutaj 2026-11-08 w sesji doprecyzowującej Zadanie 4 („tak, przenosimy do zadania 1”), bo fakt potrzebuje odczytu z punktu 14; słowa recenzenta: „N1. D-224 now declares a setting of the host and rests on no reading of it” (D-224 to dziś D-238); na tym warunku stoi też `deploy/loop2-backup:226-229`.
- Numery linii w To do są z `main` `72287c2` (2026-11-08); cykl szuka miejsca po treści.
- Kopia skilla w `.agents/skills/loop2-deploy/` musi zostać bajt w bajt taka sama; pilnuje tego `tests/agent_workflow/test_loop2_deploy_skill.py`.
- Gra zastępuje zapis innej wersji nową grą (`src/browser/view/app.ts:47-52`, `:79-92`, D-96); `SAVED_GAME_VERSION` wynosi dziś 3 (`src/browser/sim/saved-game.ts:75`), a `scripts/restore-trial.mjs` sprawdza tylko obecność znacznika w zapisie (`:307`, `:490`).
- Kod 1 w logu kopii znaczy sygnał, którego żadna pułapka skryptu nie nazywa; bash kończy wtedy proces kodem tego sygnału, więc zapisane w logu 1 różni się od rzeczywistego kodu wyjścia procesu (`deploy/loop2-backup:26-28`, `:118-134`; skrypt działa z `set -uo pipefail`, bez `set -e`, `:30`).
- Krytyka uwag uznała dwie za przesadzone: drugi przebieg od kroku 1 pada widocznie na `mkdir -m 0700` bez `-p` przed krokiem 4 (loop2#046-31), a pozostawiony folder łapie `Test-Path` (loop2#046-54); obie zostają jako poprawki tekstu.
- Ścieżka „With no server” zostaje niesprawdzona; D-234 mówi, że sprawdzone odtworzenie nie obejmuje stawiania nowego serwera.

## Questions carried to cycle

- Jak w kroku 1 odtwarzania na serwerze odczytać, która kopia jest najnowsza, skoro nic nie czyta listy plików Strychu (D-230) — na przykład pobierając pliki dni pod stałymi nazwami z zachowaniem czasu albo z logu kopii (uwaga loop2#046-25).

## Human actions

- Mariusz raz odtwarza bazę na serwerze według poprawionej instrukcji, z najnowszej kopii nocnej wybranej po czasie, jak w prawdziwej awarii (uwaga loop2#046-57, pytanie 1) — in the cycle

## Decisions in play

- D-12: „An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human.”
- D-13: „the login on Mikrus Strych stays outside it in that note and in root's SSH configuration on the server; […] `/etc/loop2/backup-encryption-key`, owned by root with group root and mode 0400, for encrypting database backups, and the key that reaches Mikrus Strych lives in `/backup_key`, each backed up in that private note […] the encryption key having no consumer to recreate and its old value staying in the private note until every backup made with it has been replaced; session rotation prepends the new signing secret while retaining old verification secrets […]”
- D-15: „No earlier image is kept, so a rollback restores the earlier commit's code, never the data of that time.”
- D-96: „a saved game state that the game discards — of another version, naming an archetype missing from the data or of a shape the game does not admit — starts a new game, above which stands once, in `warning`, „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” for the first two […]”
- D-137: „Blocking marks the account blocked, deletes every session of the account and stops every emailed link of the account in one transaction; unblocking clears the account's blocked mark and restores no session and no link. The `loop2-deploy` skill describes the command, and only a human runs it on the server.”
- D-209: „The browser whose save it refuses so drops its unsaved game state, loads the server's saved game state […] shows „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” […]”
- D-228: „A completed, consistent backup of the account and save database is stored outside the game server host, so the accounts and saved game states can be restored to the latest retained backup after that host is lost.”
- D-230: „The seven are the weekday files `loop2-accounts-<1..7>.sqlite.age`, one for each day of the week by the UTC date of the run, so a night's backup replaces the one made seven days earlier. Only the schedule a human installed or a human's hand run replaces a backup, no command deletes one, and nothing reads the destination's list of files.”
- D-231: „That command opens only an existing database file, needs its one fixed word `--to-standard-output` […] and is run only by a human or the installed backup script.”
- D-232: „A backup of the account and save database is encrypted on the game server's host before it leaves it, by `age` in the backup script's pipe, with the identity file `/etc/loop2/backup-encryption-key` of D-13 used as a symmetric key.”
- D-233: „At any failed end of a night's backup the backup script, outside the game container, calls `pusher` once […] A schedule that did not start and a host that is down send no message, and delivery depends on push.mikr.us; this gap is reviewed before the public launch of accounts, that is before the owner gives the game's address to other players.”
- D-234: „A checked restore is one trial on the owner's computer before the change that brings the backups merges: a backup fetched from its destination and decrypted, the same commit run on it, a login with a test account, the saved game state seen back, and the backup removed from the computer. It does not cover building a new server, and restoring over the server's database stays a human's documented procedure.”
- D-238: „Root's SSH configuration and the system-wide one set neither `KnownHostsCommand` nor `VerifyHostKeyDNS`, which the script does not give, so a host whose key that file does not hold fails the send. A human fills that file with the host-key line whose fingerprint a human has compared […]”

## Settlements to record

Candidates: 6 shown, 2 accepted — 2026-11-08

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Odtworzenie bazy z kopii nikogo nie wylogowuje; kto od czasu kopii resetował hasło, resetuje je jeszcze raz, bo ten, kto zna stare hasło, i tak zaloguje się znowu. | decision | Questions to settle, pytanie 2; pytanie kontrolne 2026-11-08 wobec D-233 („this gap is reviewed before the public launch of accounts”), czy wiersz obowiązuje też po udostępnieniu gry innym: Mariusz „dobrze, niech zostanie bez zmian”. Nie wybrane: wiersz tylko do udostępnienia gry, potem przegląd — Mariusz: „co mi da ten przegląd wtedy więcej niż teraz?”; dodatkowy krok, w którym człowiek przed zatrzymaniem gry odczytuje z logu serwera wiersze `password-set` od godziny kopii i pisze do tych kont — łapie tylko część resetów, bo bez ustawień logów w `compose.yaml` log znika z każdym wdrożeniem, i dokłada krok do procedury w dniu awarii | czy procedura odtwarzania ma kończyć wszystkie zalogowania, na przykład plikiem kluczy sesji z jednym nowym kluczem, wbrew D-13 |
| 2 | Agent może sprawdzić warunek D-238 tylko liczbą wierszy z `KnownHostsCommand` albo `VerifyHostKeyDNS` w konfiguracji SSH roota i w systemowej; treści tej konfiguracji nie czyta. | decision | Questions to settle, pytanie 3; pytanie kontrolne 2026-11-08 wobec uzasadnienia D-12 („the limit to reading is an agreement, not an enforced boundary”), czy liczenie stoi, skoro jedna zgubiona litera przełącznika wypisze wiersze z loginem: Mariusz „a stoi” | czy agent może czytać konfigurację SSH roota, w jakiej formie, i czy odczyt z PR #46 był dozwolony |

## Out of scope

- Uwaga loop2#046-93: zużyty odnośnik resetu, który po odtworzeniu znów działa do końca swojej godziny, nie dostaje zdania w instrukcji; recenzent: „not worth text”, a zachodzi tylko przy odtworzeniu w ciągu godziny od odnośnika wysłanego przed kopią o 03:17 (`src/server/account-policy.ts:24-25`); Mariusz 2026-11-08: „tak jak rekomendujesz”.
