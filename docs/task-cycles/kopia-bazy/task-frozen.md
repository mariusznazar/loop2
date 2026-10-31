# Spójna kopia bazy kont i zapisów poza serwerem gry ze sprawdzonym odtworzeniem

Status: ready for cycle
Project relation: plan item: plan_mvp_loop2.md — kopia-bazy

## Description

### Need

- Baza kont i zapisów stanu gry istnieje dziś w jednym miejscu: plik `accounts.sqlite` w wolumenie Dockera `loop2_accounts` na serwerze testowym, więc utrata tego serwera zabiera wszystkie konta i zapisy (skill `loop2-deploy`: “nothing here copies it off the server: losing the volume loses the accounts.”, `.claude/skills/loop2-deploy/references/setup_and_secrets.md:300`, loop2 95de83b).
- Definicja MVP wymaga: „Spójna kopia bazy poza serwerem gry i sprawdzone odtworzenie z niej przed publicznym uruchomieniem.” (`definicja_mvp_loop2.md`, linia 83, zatwierdzona 2026-10-29, odcisk 934f56c6).
- Cel zadania w planie: „Spójna kopia bazy kont i zapisów leży poza serwerem gry, a odtworzenie z niej jest sprawdzone.” (plan `plan_mvp_loop2.md`, wiersz 17).
- Bez tego zadania nie zamyka się faza „Konta na serwerze testowym”, którą zamyka m.in. „spójna kopia bazy poza serwerem gry ze sprawdzonym odtworzeniem”, a „publiczne uruchomienie kont to chwila, w której właściciel podaje adres gry innym graczom” (plan, § Phases, linia 170).

### To do

1. Raz na dobę, nocą, harmonogram (cron) na serwerze gry uruchamia krótkie polecenie w działającym kontenerze `loop2`, a to polecenie robi kopię bazy kont i zapisów (pytania 1 i 3).
   - Liczy się tylko kopia ukończona i spójna, czyli wykonana tak, że obejmuje też ostatnie zapisy trzymane obok pliku bazy (“copying the one file while the application runs does not copy the database”, `references/setup_and_secrets.md:291`–`292`).
2. Skrypt zainstalowany na serwerze poza checkoutem wysyła każdą ukończoną kopię na Strych Mikrusa (pytania 2 i 3).
   - Źródło skryptu leży w repozytorium, a instaluje go człowiek (H2).
   - Na Strychu zostaje 7 kopii, a starsze znikają, więc ostatnia kopia ma najwyżej dobę (pytanie 1).
   - Sprawdzenie pojemności to rachunek: 7 razy rozmiar kopii z próby H3 mieści się w 200 MB Strychu.
3. Kopia jest szyfrowana na serwerze gry, zanim go opuści (pytanie 4).
   - Klucz szyfrujący leży na serwerze poza checkoutem i ma kopię w prywatnej notatce.
4. Gdy kopia się nie uda, skrypt poza kontenerem woła `pusher`, a właściciel dostaje wiadomość (pytanie 5).
   - Wiadomość mówi tylko, że kopia się nie udała, i nie niesie danych graczy, bo może iść bez szyfrowania (pytanie 5, wiersz 9).
5. Odtworzenie z kopii jest sprawdzone bez starego serwera gry (definicja, linia 110: „pozwoli odtworzyć go bez starego serwera gry”) na komputerze właściciela, raz, przed scaleniem (pytanie 6, H3).
   - Próba to pobranie kopii z miejsca docelowego, odszyfrowanie, uruchomienie tego samego commitu na tej kopii, zalogowanie kontem testowym, sprawdzenie, że zapis stanu gry wrócił, i usunięcie kopii z komputera.
   - Gdy próba zawiedzie albo kopie się nie zmieszczą, cykl staje na zablokowanym requeście i wraca do pytania 2.
6. Każde wydanie Node.js wdrażane na serwer ma za sobą sprawdzenie odczytu, zapisu i tworzenia kopii bazy na tym wydaniu (wpis „How does the account and save server access SQLite?”, `account-save-sqlite-upgrade/1`); dziś nic tego nie zapewnia (Context: kod). Sposób wybiera cykl (Questions carried to cycle).
7. Skill wdrożenia `loop2-deploy` (`.claude/skills/loop2-deploy/` i jego kopia w `.agents/skills/loop2-deploy/`) mówi, gdzie leżą kopie, gdzie leżą nowe klucze, jak zmienić klucz szyfrujący, jak zainstalować skrypt i harmonogram, co agent wolno czytać o kopiach, jak odtworzyć bazę (liczba kroków, kto je robi, co odtworzenie cofa), także gdy serwera już nie ma, i jak czytać wynik kopii (WAY-139).
   - O kluczu do Strychu skill mówi, że żadne źródło nie podaje, czy da się go wymienić (pytanie 9).
   - Zdania, które przestają być prawdą, zmieniają się w tej samej zmianie: `references/setup_and_secrets.md:299`–`300` oraz `references/troubleshooting.md:101`–`102` i `:128`–`129`.
8. Cykl zapisuje w fundamencie wpisy, które plan przydziela temu zadaniu: decyzje „Which failure does the database backup survive?” i „How does the account and save server access SQLite?” oraz niezmienniki `account-save-backup/1` i `account-save-sqlite-upgrade/1` (Decisions in play).
   - Cykl zapisuje też przyjęte wiersze *Settlements to record*, z których część zmienia obecne decyzje: D-13, wpis o tym, gdzie leżą sekrety serwera (wiersze 6 i 7), i D-112, wpis o połączeniach z bazą (wiersz 3).
   - Mapa części dostaje dwóch nowych partnerów zewnętrznych — Strych i usługę `pusher` — oraz pliki, które doda ta zmiana, przez skill `the-way-update-part-map`.
9. Tabela „Czy kod rozmawia z cudzą usługą?” w `guidelines/testing.md:56` zna dziś rejestr npm i SMTP Outsidera; dostaje zasadę dla kodu rozmawiającego ze Strychem i z usługą `pusher`, przez skill `the-way-maintain-testing-guidelines`, a jej znaczenie zatwierdza człowiek (WAY-172).

### Questions to settle

- 1. Jak często powstaje kopia, ile kopii zostaje i jak stara może być ostatnia? (Q1; pierwsza część pytania otwartego planu przypisanego temu zadaniu)
  - Answer: droga A — raz na dobę, nocą; zostaje 7 kopii; ostatnia ma najwyżej dobę. Przyjęty koszt: gracz traci najwyżej dobę gry; błąd zauważony po tygodniu nie ma już czystej kopii; Strych mieści przy pełnym limicie około 440 kont.
  - Not chosen:
    - B — raz na dobę, nocą; zostaje 14 kopii — strata jak w A, historia dwa tygodnie, ale przy pełnym limicie około 220 kont.
    - C — co 6 godzin; zostaje 28 kopii (tydzień) — gracz traci najwyżej 6 godzin; około 110 kont przy pełnym limicie; dokumentacja Strychu zaleca rzadsze kopie, najlepiej nocą.
    - D — raz na dobę, nocą; zostają 3 kopie — około 1000 kont przy pełnym limicie, ale historia tylko trzy doby: błąd zauważony po weekendzie może nie mieć czystej kopii.
  - Source: Mariusz, 2026-10-30, „wszystko jak w rekomendacjach” (pakiet zadania 17, pozycja D8 = Q1; rekomendacja A).
- 2. Czy Strych przechodzi sprawdzenie i co, jeśli nie? (Q2; druga część tego samego pytania otwartego planu)
  - Answer: decyzja — najpierw sprawdzamy Strych, a inne urządzenie poza serwerem gry wchodzi tylko wtedy, gdy Strych nie przejdzie; cytat zostawiony przez człowieka: “Mikrus Strych is the destination when it passes a capacity and restore check with the planned retained backups; otherwise another device outside the game server host is used.”
  - Answer, droga: A — sprawdzamy przed cyklem: człowiek włącza Strych i próbuje wysłać mały plik z serwera gry i pobrać go na inne urządzenie (H1). Przejdzie — miejscem jest Strych, a drugiej drogi nie budujemy. Nie przejdzie — to pytanie wraca przed startem cyklu (to zdanie dopowiedział refiner; pakiet mówił o powrocie pytania przy nieudanym odtworzeniu). Przyjęty koszt: prawdziwe odtworzenie sprawdza dopiero cykl, więc gdyby ono zawiodło, cykl stanie na zablokowanym requeście i wróci do tego pytania.
  - Answer, fakt: Strych jest włączony (człowiek, 2026-10-30: „strych już właczyłem”; serwer pokazuje plik `/backup_key` z tego dnia).
  - Wynik próby H1, 2026-10-30: mały plik przeszedł z serwera gry na Strych i dał się pobrać na komputer właściciela kopią klucza z prywatnej notatki, więc według drogi A kopie idą na Strych, a drugiej drogi nie budujemy (przebieg w Context).
  - Słowa człowieka o próbie: „przeszło” o pliku wysłanym na Strych i „zrobione, wszystko przeszło z kroków 3-5” o pobraniu na jego komputer.
  - Próba małego pliku nie pokazuje, czy siedem prawdziwych kopii się zmieści ani czy da się z nich odtworzyć bazę: to sprawdza w cyklu H3 (To do 2 i 5), jak przyjął człowiek przy drodze A, a porażka wraca do tego pytania.
  - Not chosen:
    - B — od razu ustalamy zapasową drogę, np. kopie pobiera komputer właściciela — praca nad drogą, która prawdopodobnie się nie przyda; komputer musi być włączony o porze kopii; jeszcze jeden klucz do serwera gry. Zysk: gdy Strych zawiedzie, nie ma nowej rundy pytań.
  - Source: wynik próby H1 — Mariusz, 2026-10-30, słowa wyżej; cytat zostawiony przez człowieka i droga A — Mariusz, 2026-10-30, „wszystko jak w rekomendacjach” (pakiet zadania 17, pozycje C6 i D9); cytat: definicja `definicja_mvp_loop2.md` (sha256 fda97782458d, Status approved 2026-10-29), „(new) — Which failure does the database backup survive?”, linie 645–646; Technology, linia 162: „Najpierw sprawdzić dostępny użytkownikom Mikrusa Strych (200 MB, SSH/rsync/scp); jeśli nie pomieści pełnych kopii lub odtworzenie zawiedzie, znaleźć inne miejsce poza serwerem gry, choćby na własnym komputerze.”
- 3. Gdzie działa robienie i wysyłanie kopii? (Q3)
  - Answer: droga A — harmonogram na serwerze (cron) uruchamia krótkie polecenie w działającym kontenerze `loop2`, tak jak polecenie blokady konta (D-137), a skrypt poza kontenerem wysyła plik. Gra działa w trakcie kopii. Przyjęty koszt: człowiek instaluje skrypt i harmonogram ręcznie i powtarza to przy każdej jego zmianie, jak przy `loop2-deploy` (D-16), więc serwer może się rozjechać z repozytorium; gdy kontener nie działa, kopii nie ma; nowy klucz do Strychu zmienia decyzję o tym, gdzie leżą sekrety (D-13), jak w każdej drodze. Zysk: klucz do Strychu leży poza kontenerem gry.
  - Skutki, których pakiet przy tej pozycji nie pokazał (dopisek refinera, nie odpowiedź człowieka; D-10 i D-112 pokazał później pakiet kandydatów przy wierszach 2 i 3):
    - D-10, decyzja o łączniku tunelu, odrzuciła ręcznie instalowany `cloudflared` właśnie za rozjazd z wdrożeniem, a ta droga przyjmuje taki rozjazd dla skryptu kopii (wiersz 2).
    - Proces kopii liczy się do limitu 512 MiB kontenera.
    - Polecenie kopii to drugie krótkie połączenie z bazą, a D-112 zna dziś tylko polecenie blokady (wiersz 3).
    - D-17, decyzja o dzieleniu serwera z innymi usługami, zostaje bez zmian.
  - Not chosen:
    - B — trzecia usługa Compose, czyli osobny kontener obok gry — zmiana D-17 i niezmiennika `loop2-host-sharing`, drugi kontener na tym samym pliku bazy, trzeci limit pamięci na serwerze bez pamięci wymiany, obraz z narzędziami do utrzymania, klucz do Strychu jako kolejny sekret Compose; jeśli obraz miałby inne wydanie Node.js albo inne narzędzie, dochodzi pytanie, które wydanie ma objąć sprawdzenie z To do 6. Zysk: wdrożenie dostarcza wszystko samo, nic nie rozjeżdża się z repozytorium.
    - C — sam serwer gry robi kopię i wysyła ją zegarem w swoim procesie — proces obsługujący graczy dostaje klucz do Strychu i narzędzie do wysyłki, awaria wysyłki dzieje się w nim, a granica zaufania `src/server/**` się poszerza. Zysk: żadnej instalacji na serwerze.
  - Source: Mariusz, 2026-10-30, „wszystko jak w rekomendacjach” (pakiet zadania 17, pozycja D10 = Q3; rekomendacja A).
- 4. Czy kopia jest szyfrowana, zanim opuści serwer gry? (Q4)
  - Answer: droga A — szyfrujemy na serwerze gry, przed wysłaniem; klucz ma kopię w prywatnej notatce. Przyjęty koszt: kolejny sekret i dodatkowy krok przy odtworzeniu, a utrata klucza czyni wszystkie kopie bezużytecznymi. Zysk: wyciek ze Strychu nie ujawnia adresów graczy. Zmianę D-13 przy tym kluczu pakiet przy tej pozycji pominął; niesie ją wiersz 6, propozycja refinera przyjęta przez człowieka.
  - Not chosen:
    - B — bez szyfrowania, tylko dostęp kluczem SSH do własnego miejsca na Strychu — po publicznym uruchomieniu adresy i skróty haseł wszystkich graczy leżą jawnym tekstem na serwerze współdzielonym, o którego ochronie nic nie wiemy. Zysk: prostsza kopia i prostsze odtworzenie, nie ma klucza do zgubienia.
  - Source: Mariusz, 2026-10-30, „wszystko jak w rekomendacjach” (pakiet zadania 17, pozycja D11 = Q4; rekomendacja A).
- 5. Skąd właściciel wie, że kopia się nie udała? (Q5)
  - Answer: droga D — skrypt kopii działa poza kontenerem gry i przy każdej nieudanej kopii wywołuje `pusher`. Same zgłaszają się: nieudana kopia, pełny Strych, zły klucz i martwy kontener gry, bo skrypt działa poza kontenerem. Przyjęty słaby punkt: harmonogram, który się nie uruchomił, i cały serwer, który leży, zostają bez powiadomienia, a doręczenie zależy od działania push.mikr.us.
  - Wynik próby H4, 2026-10-30: wiadomość z `echo test | pusher test_kopii` doszła na adres, na którym założone jest konto Mikrusa (Mariusz: „krok 1 - dostałem wiadomość na mojego maila na którego mam założonego mikrusa”), więc droga D zostaje.
  - Pokazane człowiekowi przy tej drodze, słowo w słowo: „Tę lukę warto przejrzeć przed publicznym uruchomieniem.”; przegląd wchodzi do decyzji jako zapisany warunek powrotu (pytanie przeciw temu wyborowi, droga C, z drogami niewybranymi w wierszu 8).
  - Pokazane człowiekowi przy tej drodze, słowo w słowo: „Skrypt nie podaje `https`, więc wiadomość może iść bez szyfrowania. Treść to samo „kopia się nie udała”, bez danych graczy.” (wiersz 9).
  - Not chosen:
    - A — sam dziennik na serwerze — przerwa bywa niezauważona tygodniami.
    - B — e-mail do właściciela przez Outsidera — hasło poczty ma tylko aplikacja, więc wysyłać musi polecenie w kontenerze gry i przy martwym kontenerze nic nie wyjdzie; wiadomość nie ma miejsca w regułach poczty ani w liczeniu pułapów, a wpisy o poczcie zapisuje zadanie 21, więc plan musi dołączyć zadanie 17 i ustawić kolejność obu zadań.
    - C — zewnętrzna usługa alarmuje, gdy przez dobę nie przyjdzie sygnał „kopia gotowa” — nowe konto w obcej usłudze, której warunków nikt nie sprawdzał, i jeszcze jeden sekret; przy poczcie człowiek napisał „bez dokładania nowej usługi na MVP”; łapie za to także brak uruchomienia i martwy serwer.
  - Source: Mariusz, 2026-10-30, „bierzemy D”; drogę D podsunął sam: „na mikrusie jest coś takiego jak pusher […] czy to by było coś czego potrzebujemy, czy nie za bardzo?” (pakiet zadania 17, pozycja D12 = Q5). Rekomendacja D po odczycie serwera i https://wiki.mikr.us/pusher/, 2026-10-30.
- 6. Co znaczy „sprawdzone odtworzenie” — gdzie i jak? (Q6)
  - Answer: droga A — na komputerze właściciela, raz, przed scaleniem: pobranie kopii z miejsca docelowego, odszyfrowanie, uruchomienie tego samego commitu na tej kopii, zalogowanie kontem testowym i sprawdzenie, że zapis stanu gry wrócił; potem usunięcie kopii z komputera. Przyjęty koszt: nie sprawdza budowy nowego serwera (sekrety, tunel), a lokalny Docker trzeba włączyć, bo dziś nie działa.
  - Skutek, którego pakiet nie pokazał (dopisek refinera, nie odpowiedź człowieka): kopie z późniejszych wersji schematu nie są próbowane.
  - Not chosen:
    - B — na świeżym serwerze: pełna odbudowa według skilla — drugi serwer i wiele godzin pracy (szacunek, niezmierzony). Zysk: sprawdza całą drogę po katastrofie.
    - C — na serwerze gry, w osobnym kontenerze z osobnym wolumenem — nie spełnia „bez starego serwera gry” i wymaga zmiany D-17; dowodzi tylko, że plik się otwiera.
  - Source: Mariusz, 2026-10-30, „wszystko jak w rekomendacjach” (pakiet zadania 17, pozycja D13 = Q6; rekomendacja A).
- 7. Czy kandydaci do fundamentu z tego zadania biorą zasadę brzmienia — zastrzeżenie o wyborach na MVP i zakaz słów wykluczających?
  - Answer: nie — „zasada brzmienia kandydatów — zastrzeżenie z 2026-10-24 i zakaz słów wykluczających — obowiązuje zadania gry 14 i 18, a nie obowiązuje zadań kont i przechowywania 17 i 21”; wiersze *Settlements to record* tego zadania mogą używać słów wykluczających.
  - Source: `plan_mvp_loop2.md` (sha256 f8103b4d0961), dziennik zmian, wpis 2026-10-29 zaczynający się „dla pozostałych zadań planu (14, 17, 18, 21) obowiązują dwie odpowiedzi człowieka” (linia 277) — Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji”. Dziennik nie zapisuje dróg tej osobnej odpowiedzi, więc *Not chosen* nie ma.
- 8. Czy liczby z danych loop są wymaganiem tego zadania?
  - Answer: nie dotyczy — liczby z danych loop są przyjętym wymaganiem tam, gdzie loop je ma, a ono ich nie ma: `C:\Storage\repos\loop\src\sim\data\` to dane treści gry, nie kopii bazy, więc tabeli do wglądu nie ma.
  - Source: ten sam wpis planu (linia 277) — Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji”; odczyt katalogu danych loop, 2026-10-30. Dziennik nie zapisuje dróg tej osobnej odpowiedzi, więc *Not chosen* nie ma.
- 9. Czy klucz do Strychu ma kopię w prywatnej notatce? (Q9)
  - Answer: droga A — kopia w prywatnej notatce, jak inne sekrety serwera; człowiek robi ją przy próbie H1, bo inne urządzenie korzysta właśnie z tej kopii. Przyjęty koszt: kolejny sekret, a w tej samej notatce stoi klucz szyfrujący, więc wyciek notatki odsłania i dostęp do kopii, i ich treść. Zysk: odzyskanie danych nie zależy od panelu Mikrusa. Dokumentacja nie mówi, czy Strych wpuszcza z innego urządzenia; sprawdzi to ta sama próba, a jeśli nie wpuści, wraca pytanie o miejsce kopii.
  - Wynik próby H1, 2026-10-30: kopia klucza jest w prywatnej notatce, a Strych wpuścił z nią komputer właściciela, więc pytanie o miejsce kopii nie wraca (pytanie 2).
  - Not chosen:
    - B — bez kopii, po utracie serwera nowy klucz z panelu — nikt nie sprawdził, że panel to umie, a jeśli nie, wszystkie kopie są nieosiągalne.
  - Source: Mariusz, 2026-10-30, „pytania zgodnie z rekomendacją, wiersze przyjmuję” (pakiet zadania 17, pozycja 17-Q9; rekomendacja A). Żaden dokument tego nie rozstrzygał: D-13 nazywa trzy pliki i nie wymienia tego klucza, definicja, linie 643–645, wymaga odzyskania po utracie serwera i nie wybiera drogi, a strona https://wiki.mikr.us/strych_backupy/ (odczyt 2026-10-30) nie mówi, skąd klucz się bierze, czy panel wyda nowy ani czy Strych wpuszcza z innego urządzenia.
- 10. Kiedy kod kopii trafia na serwer przed scaleniem? (H5)
  - Answer: droga A — w cyklu, przed H2 i H3, z oknem: od tego wdrożenia do scalenia zadania 17 nic innego nie scala się do `main` ani nie wdraża na serwer, tak jak przy zadaniu 16. Przyjęty koszt: zadania 14, 18 i 21 czekają przez czas H2 i H3, co najmniej jedną noc, jeśli człowiek chce zobaczyć uruchomienie z harmonogramu.
  - Not chosen:
    - B — w cyklu, bez okna — nic nie czeka, ale po każdej podmianie przychodzą fałszywe alarmy, a wdrożenie trzeba powtórzyć.
    - C — bez H5, odtworzenie po scaleniu — zmienia miejsce H3, które człowiek ustalił, a nieudana próba zostawia na `main` obietnicę, która nie działa.
  - Source: Mariusz, 2026-10-30, „pytania zgodnie z rekomendacją, wiersze przyjmuję” (pakiet zadania 17, pozycja 17-H5; rekomendacja A); okno zapisuje plan `plan_mvp_loop2.md` (sha256 f8103b4d0961), dziennik zmian, linia 304.

## Context

- Kod loop2 95de83b: serwer otwiera bazę z `LOOP2_DATABASE_PATH` = `/app/data/accounts.sqlite` (`compose.yaml:12`), wolumen montuje tylko usługa `app` (`compose.yaml:25`), a baza pracuje w trybie WAL (`src/server/database.ts:200`), czyli ostatnie zapisy leżą w plikach obok niej.
- Wzorzec polecenia w kontenerze: `src/server/account-block.ts` otwiera bazę obok działającego serwera, z jego regułami otwierania, i nie tworzy jej, gdy pliku nie ma.
- Rozmiar dziś: `docker system df` na serwerze testowym, 2026-10-30, pokazuje 114,8 kB wszystkich wolumenów lokalnych, a `loop2_accounts` jest jedynym z nich; do zamknięcia fazy konta zakłada tylko właściciel (plan, § Phases: „przed zamknięciem fazy konta zakłada tylko on”).
- Górna granica: najwyżej 64 KiB zapisu na gracza (D-104), a „at the full stored limit a thousand accounts take about 65 MB in each copy of the database” (D-104, *Rationale*); przy 200 MB oznacza to iloczyn liczby kont i liczby kopii około 3000, bez kompresji.
- Ta granica zostaje: zadanie 18 zostawia limit 64 KiB (`petla_zarobkowa_loop2.md`, pytanie Q12, droga A; Mariusz, 2026-10-30, „przyjmuję rekomendacje”).
- Pomiar z loop2 95de83b (`petla_zarobkowa_loop2.md`, pytanie Q12): siedziba z jedną postacią ma 2947 bajtów, a przejście z programem 17 reguł w minucie 300 — 6150 bajtów na Lesie i 7075 na Lesie — głębiej.
- Strych, dokumentacja Mikrusa (https://wiki.mikr.us/strych_backupy/, odczyt 2026-10-30): „Strych to współdzielony serwer backupowy, na którym każdy z użytkowników posiada 200MB przestrzeni do przechowywania własnych plików.”; dostęp daje opcja w panelu, menu „Backup”.
- Ta sama strona podaje host `strych.mikr.us`, wpis `IdentityFile /backup_key` w `~/.ssh/config` i narzędzie `rsnappush` (wymaga pakietów `acl` i `rsync`); nie mówi, skąd bierze się klucz, które plany Mikrusa mają dostęp, jak kasować pliki ani nic o szyfrowaniu, dostępności czy trwałości danych.
- Oszczędność kopii przyrostowych z tej strony dotyczy niezmienionych plików: `rsnappush` (https://mikr.us/tools/rsnappush, odczyt 2026-10-30) łączy niezmienione pliki `--link-dest`, a baza zmienia się między kopiami, więc każda kopia zajmuje pełny rozmiar; narzędzie nie kasuje starych kopii.
- Próba H1, 2026-10-30, zrobił ją człowiek: `rsync` z serwera gry wysłał mały plik do katalogu domowego na `strych.mikr.us`, a `rsync --list-only` pokazał go tam.
- W tej próbie `rsync` nie założył podkatalogu, którego nie było, więc ścieżką wysyłki został katalog domowy, ten sam co na stronie Strychu (`rsnappush /etc strych.mikr.us:~/`).
- W tej próbie pierwsze połączenie z serwera gry zatrzymało się na pytaniu o klucz hosta.
- W tej próbie na komputerze właściciela `scp` pobrał `test_strych.txt` ze `strych.mikr.us` tymczasowym kluczem zrobionym z kopii w prywatnej notatce, a `cat` pokazał treść pliku.
- Odcisk klucza hosta Strychu, z którym człowiek porównał to połączenie: `SHA256:3WieS14O9NRnaiL5imCQfMugcVExGOoPqZEMhUD/LZk`.
- Serwer testowy, odczyt 2026-10-30: pliki `/backup_key` i `/backup_key.pub` z tego dnia (treści nie czytano), `rsync` i `curl` są, `rsnappush` nie ma, a harmonogram użytkownika root jest pusty.
- `pusher`, ten sam odczyt: `/bin/pusher` to skrypt, który wysyła standardowe wejście przez `curl` na push.mikr.us i nie trzyma sekretu.
- Skrypt nie podaje `https` (`curl … push.mikr.us/$1`, źródło https://mikr.us/tools/pusher, odczyt 2026-10-30), więc wiadomość może iść bez szyfrowania.
- Dokumentacja `pusher` (https://wiki.mikr.us/pusher/, odczyt 2026-10-30): „Pusher jest prostym narzędziem pozwalającym Ci wysyłać maile do samego siebie”; pierwszy parametr to temat, a podkreślenia znaczą spacje; strona podaje wzorzec awarii `polecenie || pusher cron02_awaria` i wzorzec `polecenie | pusher`, który wysyła wynik polecenia, a nie podaje adresu odbiorcy ani limitów.
- Polecenie kopii żyje w obrazie na serwerze, więc każde inne wdrożenie je usuwa, dopóki zadanie 17 nie jest scalone: scalenie czegokolwiek do `main` wdraża się samo (D-11), a czynność H1 zadania 21 wdraża commit swojej gałęzi.
- Zadania 17 i 21 idą obok siebie (plan, dziennik zmian, linia 250).
- Precedens okna scaleń: zadanie 16 (plan, dziennik zmian, linia 294): „od H1 do scalenia tego zadania nie scala się do main nic innego”.
- Agent nie czyta i nie kopiuje bazy ani jej wolumenu, a każda zmiana na serwerze oprócz wdrożenia z automatyzacji należy do człowieka (D-12; `.claude/skills/loop2-deploy/SKILL.md:59`–`65`).
- Lokalnie klient Dockera jest, a silnik dziś nie działa (`docker version`, 2026-10-30); lokalny Node to 24.17.0 i ma funkcję `backup` modułu `node:sqlite`.
- Wydanie Node.js nie jest dziś przypięte, a wdrożenie go nie sprawdza: ręczne sprawdzenia z zadań 15 i 16 objęły wydanie, które wtedy stało na serwerze, oba etapy obrazu stoją na `FROM node:24-slim` (`Dockerfile:1`, `:14`), a `deploy/loop2-deploy:298` buduje przez `compose build` bez pobierania świeżej bazy.
- Wydanie zależy więc od tego, co akurat leży w pamięci Dockera na hoście; na nowym hoście po awarii będzie to inne wydanie.
- Odtworzenie cofa stan do chwili kopii: przeglądarka z otwartą grą ma numer zapisu wyższy niż serwer, więc jej zapis dostaje odmowę i wczytuje zapis z kopii ze zdaniem „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” (D-209).
- Blokady kont, hasła i wylogowania z czasu po kopii znikają razem z nią.
- Rozmowa refinementu: `C:\Storage\repos\loop2\.runs\project-refinement\kopia-bazy.md`.

## Questions carried to cycle

- Jak dotrzymać zdania „A Node.js release is deployed only after the server's database read, write and backup operations have been checked on that release.” (punkt 6): przypięcie obrazu Node wersją i skrótem, jak `deploy/cloudflared.Dockerfile`, sprawdzenie w skrypcie wdrożenia przed wymianą kontenerów, czy oba — wybór cyklu; zmiana skryptu wdrożenia oznacza ponowną instalację jego kopii przez człowieka (D-16; H5).
- Czym powstaje spójna kopia: funkcją `backup` modułu `node:sqlite` czy inaczej — wybór cyklu w granicach wpisu „Which failure does the database backup survive?”; fakt `node-sqlite-database` o tej funkcji dziś nie mówi.
- Jak plik przechodzi z kontenera do skryptu poza nim, nie zmieniając D-17 (“the application alone mounts `loop2_accounts`”), i gdzie leży do wysyłki — wybór cyklu.
- Czym i gdzie plik jest szyfrowany (narzędzie, klucz symetryczny czy para kluczy, w poleceniu czy w skrypcie) tak, żeby odszyfrować go dało się na komputerze właściciela — wybór cyklu.
- Czym plik trafia na Strych (`rsnappush`, `rsync`) i czy jest kompresowany — wybór cyklu; kompresja zmienia pojemność z Context, a próba H1 sprawdziła sam `rsync` do katalogu domowego.
- Jak skrypt uruchamiany z harmonogramu, którego nikt nie zapyta o klucz hosta, przechodzi przez pytanie z próby H1 — wybór cyklu; zapisanie klucza hosta na serwerze należy do H2.
- Jak znikają starsze kopie: `rsnappush` ich nie kasuje, dokumentacja Strychu nie opisuje kasowania, a próba H1 go nie obejmuje — wybór cyklu.
- O której godzinie nocy działa harmonogram i co się dzieje, gdy trafi na wdrożenie — wybór cyklu.
- Czy i gdzie skrypt zapisuje wynik każdej próby: droga D pytania 5 dziennika nie rozstrzyga, a To do 7 każe opisać czytanie wyniku; harmonogram, który nie ruszył, i tak niczego nie zapisze — wybór cyklu.
- Czy wdrożenie porównuje zainstalowany skrypt kopii ze źródłem, jak skrypt wdrożenia (D-16), żeby rozjazd z repozytorium było widać — wybór cyklu.
- *Scope* decyzji oraz *Method* i *Rests on* niezmienników, które zapisuje to zadanie, stoją w definicji jako `TODO`; cykl ustala je z mapy części.

## Human actions

- H1. Aktywacja Strychu w panelu Mikrusa, kopia klucza `/backup_key` w prywatnej notatce (pytanie 9) i próba: mały plik z serwera gry na `strych.mikr.us` i pobranie go na inne urządzenie tą kopią klucza; wynik w pytaniach 2 i 9 — before the cycle, done
- H4. Próbna wiadomość: człowiek uruchamia na serwerze `echo test | pusher test_kopii` i sprawdza, że wiadomość doszła i na jaki adres; wynik w pytaniu 5 — before the cycle, done
- H5. Wdrożenie kodu gałęzi przed scaleniem: człowiek uruchamia na serwerze zainstalowany skrypt wdrożenia `loop2-deploy` z numerem ostatniego commitu gałęzi (D-15), a gdy gałąź zmienia `deploy/loop2-deploy`, najpierw instaluje na nowo jego kopię (D-16), bo polecenie kopii trafia na serwer dopiero z kodem tego zadania, a H2 i H3 go potrzebują; od tego wdrożenia do scalenia zadania 17 trwa okno z pytania 10 — in the cycle, przed H2 i H3
- H2. Instalacja na serwerze tego, czego wdrożenie samo nie robi: skrypt kopii, harmonogram, dostęp skryptu do Strychu i klucz szyfrujący z kopią w prywatnej notatce — in the cycle
- H3. Próba odtworzenia z pytania 6 na kopii zrobionej przez kod cyklu, przed scaleniem — in the cycle

## Decisions in play

Wpisy rzutowane z definicji `definicja_mvp_loop2.md` (zatwierdzona 2026-10-29, odcisk 934f56c6, sha256 fda97782458d), § Projected foundation changes; przydział z planu `plan_mvp_loop2.md` (sha256 f8103b4d0961), § Projected entries:

- „(new) — Which failure does the database backup survive?” (urzeczywistnia i zapisuje to zadanie): “A completed, consistent backup of the account and save database is stored outside the game server host, so the accounts and saved game states can be restored to the latest retained backup after that host is lost. Mikrus Strych is the destination when it passes a capacity and restore check with the planned retained backups; otherwise another device outside the game server host is used.”
- „(new) — How does the account and save server access SQLite?” (urzeczywistniają zadania 15, 16, 17; zapisuje to zadanie): “The account and save server accesses its SQLite database through Node.js 24's built-in `node:sqlite` module, without an external SQLite driver. A Node.js release is deployed only after the server's database read, write and backup operations have been checked on that release.” — pierwsze zdanie jest prawdziwe dzięki zadaniom 15 i 16; to zadanie czyni prawdziwym drugie i zapisuje cały wpis.
- `account-save-backup/1` (urzeczywistnia i zapisuje to zadanie): “The account and save server's database has a completed, consistent backup stored outside the game server host.”
- `account-save-sqlite-upgrade/1` (urzeczywistniają zadania 15 i 17; zapisuje to zadanie): “A deployed Node.js release has passed a check of the account and save server's database read, write and backup operations on that release.”

Obecne decyzje fundamentu (`foundations/decisions.md`, loop2 95de83b):

- D-01: “The account and save server is written in TypeScript and runs on Node.js 24 LTS. Its TypeScript types are checked before deployment.”
- D-10, *Rejected*: “A manually installed host connector — its version and updates would sit outside the product's deployment, although it would avoid restarting the tunnel with the application” — dotyczy tunelu, nie kopii; pytanie 3 odwraca to odrzucenie dla skryptu kopii (wiersz 2).
- D-11: “a push to `main`, the merge of a pull request included, reaches the test server without anyone starting it by hand, deployed itself or within a later commit of `main` that contains it.”
- D-12: “An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human.”
- D-13 (zmieniają ten wpis wiersze 6 i 7): “runtime credentials live outside the checkout in `/etc/loop2/cloudflared-token` for the tunnel, `/etc/loop2/session-secrets` for session signing and `/etc/loop2/smtp-password` for the mail service, each backed up in that private note.”; “human rotation replaces the file and private copy before recreating its consumer”.
- D-13, *Rejected*: “a server token without a private copy — recovery depends on issuing another token”.
- D-15: “A rollback is a deployment of an earlier commit — a revert merged to `main`, or a human's run of the installed deploy script with that commit, which may name a commit of any branch of the GitHub repository while the automation's key deploys only commits of `main`. No earlier image is kept, so a rollback restores the earlier commit's code, never the data of that time.” — zostaje prawdą: odtworzenie z kopii jest osobną drogą, nie wycofaniem.
- D-16: “The automation's key runs only a root-owned installed copy of the deploy script, kept outside the server's checkout, so no pushed commit changes what the key runs. Each deployment compares that copy with the script's source at the deployed commit and only warns when they differ, and reinstalling the copy is a human's change.”
- D-17: “A deployment of loop2 changes nothing on the host but loop2's own checkout, application and connector images and containers, its named database volume `loop2_accounts`, log and lock, and the build cache and base images its builds add to the shared Docker store, which it never prunes; it removes or replaces nothing of another workload.” oraz “the application alone mounts `loop2_accounts` at `/app/data` for `/app/data/accounts.sqlite`” — bez zmian przy drodze A pytania 3.
- D-104: “the server stores at most 64 KiB of each player's saved game state.”
- D-112 (zmienia ten wpis wiersz 3): “The account server opens one application-owned SQLite connection before readiness, and the operator's blocking command of D-137 opens one short-lived connection beside it under the same rules”.
- D-112, *Rejected*: “a step back from a newer version, or a copy of the database before a move — not provided, so a rollback across a schema change fails until code that knows the newer version is deployed”.
- D-137: “The operator blocks and unblocks a player account, named by its email address normalized as at login, with a command run in the `loop2` container”; “only a human runs it on the server.”
- D-205: “The account and save server stores player accounts and each player's complete saved game state in a SQLite database file on persistent local storage outside the replaceable application container layer.”
- D-209: “accepts a save only when it names as its basis the revision of the saved game state the server holds, or 0 where the account has none, refusing every other.”

## Settlements to record

Candidates: 15 shown, 12 accepted — 2026-10-30

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Kopia bazy powstaje raz na dobę, nocą, na miejscu docelowym zostaje 7 kopii, a ostatnia ma najwyżej dobę. | decision | pytanie 1 (A; Mariusz, 2026-10-30, pozycja D8 pakietu rundy), *Not chosen* tam | Jak często robić kopię i ile ich trzymać. |
| 2 | Kopię robi krótkie polecenie uruchamiane harmonogramem w działającym kontenerze `loop2`, a plik wysyła skrypt zainstalowany ręcznie poza kontenerem gry i poza checkoutem; nie ma trzeciej usługi Compose ani zegara w serwerze gry, a klucz do Strychu nie wchodzi do kontenera gry. | decision | pytanie 3 (A; Mariusz, 2026-10-30, pozycja D10 pakietu rundy), *Not chosen* tam; propozycja refinera: „poza checkoutem”, jak skrypt wdrożenia (D-16: “kept outside the server's checkout, so no pushed commit changes what the key runs”), przyjęta z wierszem (pozycja 17-K2 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”). Wiersz odwraca odrzucenie, którego pozycja D10 nie nazwała, a nazwała je pozycja 17-K2: D-10, decyzja o łączniku tunelu, *Rejected*: “A manually installed host connector — its version and updates would sit outside the product's deployment”. | Trzecia usługa Compose albo zegar w procesie serwera. |
| 3 | Polecenie kopii otwiera krótkie połączenie z bazą obok połączenia serwera, na tych samych zasadach co polecenie blokady konta; zmienia D-112, wpis o połączeniach z bazą. | decision | propozycja refinera, wynika z wiersza 2, przyjęta (pozycja 17-K14 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”); D-112 (“the operator's blocking command of D-137 opens one short-lived connection beside it under the same rules”) | Czy polecenie kopii otwiera bazę po swojemu i czy D-112 zostaje z samym poleceniem blokady. |
| 4 | Kopia jest szyfrowana na serwerze gry, zanim go opuści. | decision | pytanie 4 (A; Mariusz, 2026-10-30, pozycja D11 pakietu rundy), *Not chosen* tam; wiersz 5 to to samo zdanie jako reguła z testem | Wysyłka jawnego pliku na serwer współdzielony. |
| 5 | Kopia bazy nie opuszcza serwera gry niezaszyfrowana. | invariant | propozycja refinera, przyjęta jako reguła z testem (pozycja 17-S pakietu rundy, droga „oba”, rekomendacja; Mariusz, 2026-10-30, „pytania zgodnie z rekomendacją, wiersze przyjmuję”): to samo zdanie co wiersz 4 w formie przeczenia; test pilnuje, że skrypt nie wyśle jawnego pliku, gdy narzędzie albo klucz zawiedzie, a koszt to jeden wpis i jeden test więcej. Droga niewybrana: sam wiersz 4 — wpis mniej, ale wysyłki jawnego pliku przy awarii nic nie zatrzyma. | Wysyłka bez szyfrowania, gdy narzędzie albo klucz zawiedzie; brak testu tego zdania. |
| 6 | Klucz szyfrujący jest sekretem serwera: leży poza checkoutem, ma kopię w prywatnej notatce, a zmienia go człowiek; zmienia D-13, wpis o tym, gdzie leżą sekrety serwera. | decision | pytanie 4 (A; Mariusz, 2026-10-30, pozycja D11 pakietu rundy: „Klucz ma kopię w Twojej prywatnej notatce”), *Not chosen* tam; propozycja refinera: „leży poza checkoutem”, „zmienia go człowiek” i zmiana D-13, wszystko za D-13: “human rotation replaces the file and private copy”, przyjęta z wierszem (pozycja 17-K4 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”) | Czy klucz szyfrujący wchodzi do D-13 i kto go wymienia. |
| 7 | Klucz do Strychu `/backup_key` ma kopię w prywatnej notatce; zmienia D-13, wpis o tym, gdzie leżą sekrety serwera. | decision | pytanie 9 (A; Mariusz, 2026-10-30, pozycja 17-Q9 pakietu rundy), *Not chosen* tam. O wymianie tego klucza wiersz nie mówi, bo żadne źródło nie podaje, czy da się go wymienić. | Czym sięgnąć po kopie po utracie serwera gry. |
| 8 | Gdy kopia się nie uda, skrypt poza kontenerem woła `pusher`, a właściciel dostaje wiadomość; harmonogram, który się nie uruchomił, i cały serwer, który leży, zostają bez powiadomienia, a doręczenie zależy od push.mikr.us; tę lukę przeglądamy przed publicznym uruchomieniem kont, czyli zanim właściciel poda adres gry innym graczom. | decision | pytanie 5 (D; Mariusz, 2026-10-30, „bierzemy D”, pozycja D12 pakietu rundy), *Not chosen* tam. Zdanie o przeglądzie: pytanie przeciw temu wyborowi, pozycja 17-P pakietu rundy, droga C, rekomendacja (Mariusz, 2026-10-30, „pytania zgodnie z rekomendacją, wiersze przyjmuję”): decyzja dostaje zapisany warunek powrotu „przed publicznym uruchomieniem kont”, kosztem jednego zdania; to tylko przypomnienie: nic nie blokuje uruchomienia, a do tej chwili cisza zostaje. Kotwice pytania: `account-save-backup/1` i wiersz 1, „ostatnia ma najwyżej dobę”, bo zatrzymany harmonogram przestaje spełniać oba zdania, a cisza wygląda tak samo jak „wszystko działa”. Drogi niewybrane: A — droga D bez zapisanego przeglądu — zatrzymany harmonogram niczego nie zapisze, więc wyjdzie to dopiero, gdy ktoś zajrzy na Strych i zobaczy starą kopię, albo przy awarii; koszt zerowy, a zdanie o przeglądzie zostaje tylko w dokumencie zadania. B — dodatkowo raz w tygodniu wiadomość o udanej kopii — lukę poznać po braku wiadomości, a tego łatwo nie zauważyć; koszt: warunek w skrypcie, a limitów `pusher` nie znamy. | Sam dziennik, poczta przez Outsidera albo zewnętrzna usługa. |
| 9 | Wiadomość `pusher` mówi tylko, że kopia się nie udała, i nie niesie danych graczy, bo może iść bez szyfrowania. | decision | pakiet przy drodze D (pozycja D12): „Treść to samo „kopia się nie udała”, bez danych graczy.”; propozycja refinera: trwała reguła zamiast opisu, przyjęta (pozycja 17-K15 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”) | Wysłanie wyniku polecenia wzorcem z dokumentacji `polecenie \| pusher`. |
| 10 | Każdy nieudany krok skryptu kopii — polecenie w kontenerze, także gdy kontener nie działa, szyfrowanie, wysyłka, usuwanie starych kopii — kończy się wywołaniem `pusher`. | invariant | propozycja refinera: nowy niezmiennik i zakres kroków, przyjęta (pozycja 17-K8 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”); podstawa to pytanie 5 (D), a „także gdy kontener nie działa” stoi w tabeli pakietu przy drodze D | Które awarie dostają powiadomienie, np. sama nieudana wysyłka. |
| 11 | Dokumentacja Mikrusa mówi, że `pusher` wysyła maile do samego właściciela, czyta standardowe wejście, a pierwszy parametr to temat; nie podaje adresu odbiorcy ani limitów, a skrypt nie podaje `https`, więc wiadomość może iść bez szyfrowania. | environment fact | propozycja refinera: nowy fakt, przyjęty (pozycja 17-K9 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”); https://wiki.mikr.us/pusher/ i https://mikr.us/tools/pusher, odczyt 2026-10-30; wiersze 8, 9 i 10 się na tym opierają; adres, na który wiadomość doszła w próbie H4, stoi w pytaniu 5 | Czy skrypt ma podawać adres odbiorcy i czy może liczyć na jakiś limit wiadomości. |
| 12 | Sprawdzone odtworzenie znaczy: na komputerze właściciela, raz, przed scaleniem, pobranie kopii z miejsca docelowego, odszyfrowanie, uruchomienie tego samego commitu na tej kopii, zalogowanie kontem testowym, sprawdzenie, że zapis stanu gry wrócił, i usunięcie kopii z komputera; nie obejmuje budowy nowego serwera. | decision | pytanie 6 (A; Mariusz, 2026-10-30, pozycja D13 pakietu rundy), *Not chosen* tam | Co wystarcza za dowód: otwarcie pliku czy pełna odbudowa. |

## Out of scope

none
