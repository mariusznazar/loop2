---
title: "loop2: serwer — odczyty człowieka, strażnik awarii, kopia bazy i fakty o serwerze"
status: draft
created: 2026-11-13
updated: 2026-11-14
tags: [zadanie]
related: "the author's project note"
---

# loop2: serwer — odczyty człowieka, strażnik awarii czyta log kopii, kopia klucza, fakty o serwerze zamiast niezmienników

Status: ready for cycle
Project relation: independent

## Description

### Need

- Fundament mówi „spełnione” (*Violated: no*) o stanie serwera, którego żaden test nie sprawdza: trzy niezmienniki z metodą „test” sięgają tylko plików repozytorium, a trzy z metodą „przegląd” — kopia bazy poza serwerem, pomiar haseł we wdrożonym obrazie, dostarczenie poczty — nie mają zapisu odczytu. Czytelnik bierze „Violated: no” za dowód, a zmiana na serwerze złamie zdanie bez żadnego sygnału.
- Kopia bazy, która przestała powstawać, zostaje dziś niezauważona: harmonogram, który nie ruszył, nic nie wysyła (D-233), a zapowiedziany „przegląd przed otwarciem kont” nie ma śladu w repozytorium ani w backlogu.
- Strażnik awarii na serwerze bez działającego `flock` co pięć minut kończy się sukcesem, nic nie czyta i nic nie wysyła, a żaden wpis tego nie wymienia (loop2#71-31).
- Kopia, której nie da się odtworzyć, wychodzi dziś na jaw dopiero w dniu awarii: próbę odtworzenia zrobiono raz (D-234).
- Cztery decyzje (D-12, D-16, D-206, D-223) stoją na przesłance „na serwerze gra tylko właściciel”, której nikt nie sprawdził; rejestracja jest otwarta.
- Część zdań fundamentu i instrukcji o serwerze czeka na odczyt albo słowo człowieka: kopia klucza szyfrującego kopie poza serwerem (bez niej utrata serwera czyni każdą kopię bezużyteczną), zamknięta stara droga do serwera z pominięciem tunelu, mail GitHuba o nieudanym przebiegu, wiadomość resetu hasła w zewnętrznej skrzynce, widoczność dwóch repozytoriów, cytaty dwóch licencji grafik.
- Źródło: grupa G-5 przeglądu fundamentu z 13.11.2026 (6 uwag i 1 pozycja raportu stanu), decyzje F-4 i F-5, wiersze „S” sekcji 2 i zamówione wiersze 1–6 tabeli „Sprawdzenia do zamówienia”: the author's private note on the foundation review of 2026-11-13.

### To do

1. Niezmienniki `loop2-application-port`, `loop2-container-isolation` i `loop2-distinct-address` mówią tylko to, co sprawdza ich test (pliki repozytorium); to, co mówiły o serwerze, staje jako fakty środowiska z poleceniem odczytu i datą (F-4).
2. Niezmienniki `account-save-backup`, `player-argon2-deployment-check` i część o dostarczeniu poczty z `account-email-via-outsider` stają jako fakty środowiska z odczytem i datą (konfiguracja nadawcy w `compose.yaml` zostaje w niezmienniku); wpisy, które na nich stały, wskazują nowe fakty (F-4).
3. Strażnik czyta `/var/log/loop2-backup.log` i gdy przez 26 godzin nie było w nim udanego wysłania kopii (`end: sent …`), wysyła przez `pusher` wiadomość nowego rodzaju, stałym tematem i jednym stałym zdaniem jak inne rodzaje (bez danych graczy, liczb i wyjścia narzędzi), najwyżej raz na dobę dla tego rodzaju; D-233 traci zdanie o przeglądzie przed otwarciem kont i mówi o tym sygnale; D-356, skill `loop2-deploy` (tabela rodzajów wiadomości, „Accepted gaps of the watcher”) i testy strażnika znają nowy rodzaj.
4. D-356 wymienia wśród przypadków, w których nic nie przychodzi, serwer bez działającego `flock` (strażnik kończy się wtedy sukcesem z linią `skipped: flock could not take …` we własnym logu); fakt środowiska zapisuje odczytem, że `flock` na serwerze testowym działa. Zachowanie strażnika się nie zmienia.
5. Test drugiego sprawdzenia blokady wdrożenia (linia `dropped: …`, `deploy/loop2-watch:557`) dla zepsutego `flock` (status 2 i 127), obok istniejącego przypadku trzymanej blokady (loop2#71-23).
6. D-234: sprawdzone odtworzenie to próba na komputerze właściciela powtarzana co miesiąc i po każdej zmianie wersji schematu bazy albo wersji zapisu gry, nie jedna próba przed scaleniem; instrukcja próby w `backup_and_restore.md` mówi o tym rytmie.
7. Lista „Not tried” w `backup_and_restore.md` (i kopii w `.agents/`) wymienia też `( umask 077; … )` z kroków 2, przy starym kluczu i przy pliku sekretów; ścieżki z listy zostają nieprzećwiczone.
8. Lista odczytów dozwolonych agentowi w skillu `loop2-deploy` (sekcja „Agent or human”, w obu kopiach) obejmuje `docker compose version`, odczyt, czy `logrotate` uruchamia się codziennie (jego timer albo wpis crona), i listę plików `/var/log/loop2-app.log*` bez ich treści.
9. Agent odczytuje w cyklu przez `mikrus` i zapisuje jako fakty środowiska albo odnotowuje przy wpisie, którego dotyczą: przerwę przy wdrożeniu (D-09, znaczniki czasu w logu wdrożenia), `docker stats --no-stream` (D-10), linie `resources:` i wyjścia 5 (D-17), linie `failure` z `SQLITE_BUSY` (D-205), wyjścia 7 (D-237), wersję Compose i dzienny `logrotate` (D-355), opublikowane porty kontenerów (`loop2-application-port`), log kopii (`account-save-backup`), sześć faktów o serwerze (`loop2-host-forced-command-entry`, `loop2-host-installed-command`, `loop2-host-ssh-host-key-options`, `mikrus-host-docker-workloads`, `mikrus-host-swap`, `mikrus-tunnel-outbound-tcp`) i zgodność zainstalowanych kopii skryptów z repozytorium.
10. Agent sprawdza na nowo przez `gh` fakty `loop2-repository-visibility` i `screenshots-repository-visibility`.
11. Wyniki czynności człowieka (*Human actions*) trafiają do faktów środowiska albo do wpisów, których dotyczą: D-232 (kopia klucza), D-10 (stara droga obok tunelu), D-110 (ciasteczko i adres klienta przez tunel), D-153 (wiadomość resetu), D-356 (mail GitHuba), `smoke-fire-particle-licence`, `lpc-wolf-licence`, pomiar haseł (punkt 2), liczba kont i zapisów nie-właściciela.
12. Agent odczytuje przez `gh run list --workflow check-address.yml --event schedule` odstępy między przebiegami z harmonogramu i zapisuje je jako fakt środowiska z datą; D-356 (dziś „scheduled about every five minutes”, z ryzykiem „a mail every 5 minutes and hundreds of runs a day”) i skill `loop2-deploy` (sekcja „The failure record and alerts”, punkt 2 i „The four limits of the scheduled check”, w obu kopiach) mówią o rytmie, który GitHub naprawdę daje, i o tym, że przy wyłączonym serwerze albo tunelu alarm GitHuba może przyjść dopiero po kilku godzinach. Harmonogram w `check-address.yml` się nie zmienia.

### Questions to settle

- Co robi strażnik, gdy na serwerze nie działa `flock`? (loop2#71-31)
  - Answer: zostaje jak jest (sukces i linia `skipped:` we własnym logu); D-356 wymienia ten przypadek wśród tych, w których nic nie przychodzi, a fakt środowiska zapisuje, że `flock` na serwerze działa.
  - Not chosen:
    - wiadomość nowego rodzaju „strażnik nie działa” — bez własnej blokady nie da się bezpiecznie ograniczać wiadomości, grozi mail co 5 minut; średni kod i testy
    - wyjście z błędem — harmonogram ma wyłączoną pocztę (`MAILTO=""`), więc nikt tego nie zobaczy; w skutku to samo co wybrana droga
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „1 a”
- Jak często strażnik przypomina o nocy bez kopii?
  - Answer: najwyżej raz na dobę dla tego rodzaju; kopia „brakuje”, gdy w logu kopii nie ma udanego wysłania z ostatnich 26 godzin.
  - Not chosen:
    - co 6 godzin, jak inne rodzaje — do 4 maili dziennie, dopóki problem trwa, i zjada limit 6 wiadomości na dobę, z którego korzystają awarie gry
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „2 a”; sama zmiana (strażnik czyta log kopii zamiast przeglądu przed otwarciem kont) — the author's private note on the foundation review of 2026-11-13, F-4, „Decyzja (2026-11-13): zmieniamy (a)”
- Jak próba odtworzenia kopii ma iść „na harmonogramie”? (pozycja raportu stanu, M25)
  - Answer: rytm ręczny — właściciel powtarza próbę na swoim komputerze co miesiąc i po każdej zmianie wersji schematu bazy albo wersji zapisu gry; przypomina powtarzalna linia w backlogu; D-234 zmienia „jedna próba” na ten rytm.
  - Not chosen:
    - automat na komputerze właściciela (Harmonogram zadań Windows) — klucz do Strychu, klucz kopii i hasło konta testowego stale na dysku (zmiana D-13), Docker musi być włączony o tej porze; średnio-duża praca agenta
    - jedna próba jak dziś — kopia, której nie da się odtworzyć, wyjdzie na jaw w dniu awarii
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „3 a”
- Co z nieprzećwiczonymi ścieżkami instrukcji odtwarzania? (loop2#75-9)
  - Answer: zostają nieprzećwiczone jako przyjęty koszt; lista „Not tried” wymienia także `umask 077`.
  - Not chosen:
    - sesja człowieka na serwerze, która ćwiczy drogę wstecz i drugą próbę — godzina i więcej oraz przerwa w działającej grze
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „4 a”
- Kto robi odczyty spoza listy dozwolonych w skillu `loop2-deploy` (`docker compose version`, dzienny `logrotate`, lista obróconych plików logu)?
  - Answer: agent; odczyty dopisuje się do listy dozwolonych, D-12 się nie zmienia, bo to same odczyty.
  - Not chosen:
    - człowiek czyta i podaje wynik — czas człowieka na rzecz, którą agent może zrobić sam
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „5 a”
- Kto sprawdza fakty o widoczności repozytoriów `loop2` i `screenshots`?
  - Answer: agent przez `gh` w cyklu; zapytanie niesie nazwę konta, na co jest zgoda („gh i tak działa na jego koncie, a nazwa stoi w publicznych adresach”).
  - Not chosen:
    - człowiek w przeglądarce — minuty człowieka
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „6 a”
- Gdzie stoją czynności człowieka?
  - Answer: wszystkie przed cyklem, jako jedna lista do zrobienia przez Mariusza z czasem każdej; zadanie na nie czeka.
  - Not chosen:
    - część w cyklu, przy zablokowanej prośbie o scalenie — żadna nie korzysta z kodu cyklu, a ich wyniki rozstrzygają o wpisach, które cykl pisze
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „7 a” i „Czynności człowieka z punktu 7 wypisz w dokumencie jako jedną listę do zrobienia przez Mariusza przed cyklem (z czasem każdej) — zadanie czeka na nie.”
- Co, jeśli liczenie kont pokaże konta albo zapisy gry innych osób niż właściciel?
  - Answer: to zadanie zapisuje wynik jako fakt, a zmiana D-12, D-16 i D-223 (konta) oraz D-206 (zapisy) idzie do nowego zadania `[>]`; zakres tego zadania się nie zmienia.
  - Not chosen:
    - zmiany tych decyzji w tym zadaniu — zakresu nie da się oszacować przed wynikiem
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „8 a”
- Co z tym, że sprawdzenie adresu przez GitHuba chodzi co kilka godzin, a nie co pięć minut, jak mówią D-356 i skill?
  - Answer: to zadanie zapisuje odczytany rytm jako fakt środowiska, a D-356 i skill mówią o nim (To do 12); harmonogram się nie zmienia, a szybszy alarm (np. zewnętrzny monitor) nie wchodzi w zakres — pójdzie do nowego zadania, jeśli właściciel uzna kilka godzin za za długo.
  - Not chosen:
    - zostawić jak jest — D-356 i skill dalej obiecują alarm po minutach, a przy wyłączonym serwerze przychodzi po godzinach
    - osobne zadanie przez `/park` — drugi cykl zmieniałby te same D-356 i skill, oba musiałyby się uzgadniać
  - Source: Mariusz, 2026-11-14, „1. b” (znalezisko agenta przy czynności człowieka nr 6)

## Context

- Dane przeglądu: the author's private note on the foundation review of 2026-11-13 — F-4, F-5, G-5, sekcja 2 (wiersze „S”) i tabela „Sprawdzenia do zamówienia” z decyzją: zamówione 1–6 dla człowieka (tu), lokalne do zadania the author's private task note on the gaps in tests from the review.
- Co agent może czytać na serwerze, a czego nie (bazy nie czyta, `pusher` i wysyłki nie wywołuje, strażnika nie uruchamia): `.claude/skills/loop2-deploy/SKILL.md`, sekcja „Agent or human”.
- Odczyt agenta przez `mikrus` 2026-11-13 ok. 22:20 UTC (w doprecyzowaniu, odczyty dozwolone w skillu):
  - zainstalowane `loop2-watch`, `/etc/cron.d/loop2-watch`, `/etc/logrotate.d/loop2-app`, `loop2-deploy`, `loop2-backup` i `/etc/cron.d/loop2-backup` są zgodne bajt w bajt z `/srv/loop2/deploy` (`cmp` exit 0) — trzy z czterech kroków z PR #71 wykonane; czwarty, powiadomienia GitHuba, nie jest widoczny z serwera;
  - zrzut logu działa: każde wdrożenie od 2026-11-11 pisze `dump: the size of /var/log/loop2-app.log went from … to …`; plik należy do `root root 640`;
  - strażnik chodzi: plik stanu zmieniony 22:20 UTC, w logu linie `skipped: the deployment lock is held (flock exit 1)` (czyli `flock` na tym serwerze działa) i jedna wysłana wiadomość `down` 2026-11-11 09:55 UTC;
  - kopia powstaje każdej nocy: od 2026-11-04 do 2026-11-13 co noc `made: loop2-accounts-N.sqlite.age, 90328 bytes` i `end: sent …`; limit na kopię to 25 MB (D-230), więc kompresja z D-232 nie jest potrzebna;
  - wdrożenia od 2026-11-11: `MemAvailable` 3647–3840 MiB przy progu 1024 MiB, wolne miejsce Dockera ok. 16 GB przy progu 4 GiB, żadnego wyjścia 5; między linią `dump:` a `deployed` ok. 10–11 s.
- Odczyt agenta przez `gh run list` 2026-11-14: `check-address.yml` ma `cron: "3-58/5 * * * *"`, a 16 ostatnich przebiegów z harmonogramu (2026-11-09 19:54 – 2026-11-13 22:02 UTC) dzielą odstępy ok. 4,5–8 h; przyczyna po stronie GitHuba niesprawdzona.
- Kopia na Strychu: fakt może stać na linii `end: sent` logu kopii, którą agent czyta; logowanie na Strych nie jest potrzebne.
- Próg 26 godzin: kopia startuje o 03:17 czasu serwera i może czekać na blokadę wdrożenia do 900 s (D-231); nieudana noc daje dwie wiadomości — od razu ze skryptu kopii (D-233) i następnego dnia od strażnika.
- Powtarzalna linia próby odtworzenia stoi w backlogu (`#human`, `🔁 every month`) i czeka na to zadanie (`⛔ loop2-serwer-odczyty-i-straznik`); ostatnia próba na serwerze: 2026-11-11 (`backup_and_restore.md`, „Restoring over the server's database”).
- Zadanie the author's private task note on the changes of the server's and the process's entries from the review (linia `[>]`) zmienia tę samą instrukcję odtwarzania (`backup_and_restore.md`, D-360) i D-235 o strażniku; cykl, który ruszy drugi, uzgadnia się z tamtym na tych plikach.
- Zadanie przypięcia obrazu `node:24-slim` digestem odrzucono 2026-11-13, więc fakt o pomiarze haseł opisuje obraz z pływającego tagu w dniu pomiaru.
- Wytyczne części `deployment`, `agent-workflow` i `product-foundation`: `guidelines/coding.md` (wzorce wdrożenia świadomie odłożone, sekcja „Odłożone rodzaje i formatowanie”) i `guidelines/testing.md`; braków nie znaleziono. Skill wdrożenia pokrywa odczyt logów, życie zapisu logów i sygnał awarii (D-355, D-356); zadanie zmienia tylko ten ostatni.

## Questions carried to cycle

none

## Human actions

Lista do zrobienia przez Mariusza przed cyklem; wynik każdej podaje agentowi, który zapisuje go w cyklu (To do 11). Polecenia przygotowuje agent na prośbę. Razem ok. 1,5–2 h.

- Policzyć na serwerze konta, które nie są Twoje (np. po domenie adresu; konto testowe instrukcji odtwarzania i konto z próby M4 są Twoje), i zapisy gry tych kont — agentowi nie wolno czytać bazy (ok. 15 min) — before the cycle, done — wynik (odczyt Mariusza 2026-11-13, poleceniem tylko do odczytu w kontenerze `loop2`): 5 kont, wszystkie właściciela (3 własne, 2 testowe z przeglądów zmian); kont nie-właściciela 0; zapis gry ma 5 kont, wszystkie właściciela — przesłanka „na serwerze gra tylko właściciel” (D-12, D-16, D-206, D-223) trzyma, nowe zadanie niepotrzebne
- Potwierdzić, że wiadomość resetu hasła z serwera testowego doszła do zewnętrznej skrzynki, albo wysłać ją teraz i potwierdzić (ok. 10 min) — before the cycle, done — wynik (2026-11-14): Mariusz wysłał „Wyślij odnośnik” z publicznego adresu na potwierdzony adres swojego konta w zewnętrznej skrzynce; wiadomość „Ustaw nowe hasło w loop2” doszła; log usługi `app` ma dla tej prośby zdarzenia `link-issued` i `message-sent` z `linkPurpose: password-reset` i żadnej linii `"failure":"mail"` (odczyt agenta przez `mikrus`); pierwsza próba na błędnie wpisany adres nie wysłała nic, zgodnie z kodem (`account-routes.ts`, `sendResetMessage`)
- Potwierdzić, że w prywatnej notatce jest kopia klucza szyfrującego kopie (`/etc/loop2/backup-encryption-key`) i klucza do Strychu (ok. 5 min) — before the cycle, done — wynik (Mariusz, 2026-11-14): prywatna notatka ma klucz szyfrujący kopie, klucz do Strychu i login do Strychu; klucz publiczny z `age-keygen -y /etc/loop2/backup-encryption-key` na serwerze zgadza się z linią `# public key:` kopii w notatce, więc kopia to klucz, którego serwer używa dziś
- W panelu Cloudflare potwierdzić, że nie ma dawnego rekordu AAAA, Origin Rule ani Configuration Rule dla adresu loop2, które omijałyby tunel (ok. 10 min) — before the cycle, done — wynik (Mariusz w panelu Cloudflare, 2026-11-14): w DNS strefy `mariusznazar.com` dla `loop2` stoi jeden rekord, proxied CNAME na `<UUID tunelu>.cfargotunnel.com`, bez rekordu AAAA ani A; strefa nie ma żadnej Origin Rule ani Configuration Rule; trasa opublikowana w tunelu kieruje `loop2.mariusznazar.com` na `http://app:3000`
- Zalogować się przez publiczny adres i potwierdzić, że logowanie trzyma sesję (ciasteczko) i że błędne hasło daje zwykły komunikat, nie odmowę z powodu nagłówków (D-110) (ok. 10 min) — before the cycle, done — wynik (Mariusz, 2026-11-14, przez `https://loop2.mariusznazar.com/`): błędne hasło dało „Nieprawidłowy adres e-mail lub hasło.”, a nie „Serwer nie mógł obsłużyć żądania.” (odmowa `Invalid request transport`); poprawne hasło zalogowało, a sesja przetrwała odświeżenie strony — tunel przekazuje `X-Forwarded-Proto` i `CF-Connecting-IP` tak, jak wymaga D-110, a ciasteczko sesji przechodzi
- Uruchomić ręcznie `check-address.yml` z `force_failure` i potwierdzić, że przyszedł mail GitHuba o nieudanym przebiegu (ok. 10 min) — before the cycle, done — wynik (Mariusz, 2026-11-14): ręczny przebieg z `force_failure` z 2026-11-09 09:45 UTC (run 42595890225, w logu „Forced failure requested”) dał mail „[mariusznazar/loop2] Run failed: Check the public address - main (2fe922c)”, który doszedł do skrzynki odbiorczej 2026-11-09 o 10:46 czasu polskiego; linię `cron` pliku ostatnio zmienił commit Mariusza `fc493baa` (2026-11-09), więc powiadomienia idą na właściwe konto; nowego przebiegu nie było potrzeba
- Sprawdzić w zwykłej przeglądarce cytaty licencji z faktów `smoke-fire-particle-licence` i `lpc-wolf-licence` na opengameart.org (ok. 15 min) — before the cycle, done — wynik (Mariusz w zwykłej przeglądarce, 2026-11-14): obie żywe strony mówią to, co cytują fakty — Smoke & Fire Animated Particle [16x16]: autor KnoblePersona, licencja CC-BY 3.0 z linkiem do http://creativecommons.org/licenses/by/3.0/; [LPC] Wolf Animation: autor William.Thompsonj, współtwórca Redshrike, licencje CC-BY 4.0, CC-BY 3.0 (link jw.), GPL 3.0, GPL 2.0, OGA-BY 3.0 i prośba o podpis dosłownie jak w fakcie `lpc-wolf-licence`
- Zmierzyć pracę haseł we wdrożonym obrazie wg `.claude/skills/loop2-deploy/references/setup_and_secrets.md`, „Measuring the password work of the deployed image” (ok. 30 min) — before the cycle, done — wynik (pomiar Mariusza na serwerze testowym, 2026-11-14): działający kontener `loop2` i checkout to commit `6ab6a32be884ac174b068b8a6a5dd1515073d2a9`, obraz `sha256:e91ad6f940e2fa1ebf649b47d2dc9712cd71f503f1a5b55f6641a6269864faf9`; `scripts/measure-passwords.mjs --memory 512m` (Node hosta v20.19.0) zakończył się kodem 0 i werdyktem `PASS`; w obrazie Node 24.22.3, argon2 0.45.1, linux-x64, jądro 5.15.158-2-pve, cgroup v2; profil argon2id 64 MiB, t=3, p=1; bramka wpuszcza 2 naraz, trzecią odrzuca; 20 skrótów i 20 weryfikacji po 2 naraz, mediana 680,4 i 658,5 ms, najdłużej 1402,2 ms, razem 15 696 ms; limit 428867584 B (80% z 512 MiB) bez swapu, 0 przekroczeń limitu i 0 zabić OOM, największe RSS procesu 187133952 B, szczyt cgroup nie zapisany (jądro 5.15); pierwsze uruchomienie przerwane Ctrl-C (kod 130) bez wyniku; pozostawione zatrzymane kontenery `loop2-password-measure-…` (z tej próby i sprzed 13 dni) Mariusz usunął

## Decisions in play

- D-09 — „A push to the deploy branch starts an automation that tells the server to build the game and its account server from that commit; the server pulls the code from GitHub itself, and the automation's key can only start a rebuild of a commit that belongs to that branch.” — odczyt przerwy przy wdrożeniu (To do 9).
- D-10 — „Players reach loop2 at `https://loop2.mariusznazar.com/` through an encrypted remotely managed Cloudflare Tunnel, … The application publishes no host port, and the tunnel's published hostname replaces loop2's proxied AAAA record, Origin Rule and Configuration Rule. …” — odczyt portów i limitów (To do 9) i potwierdzenie w panelu Cloudflare (Human actions).
- D-12 — „An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human.” — bez zmiany; lista odczytów w skillu się rozszerza (To do 8).
- D-16 — „The automation's key runs only a root-owned installed copy of the deploy script, kept outside the server's checkout, so no pushed commit changes what the key runs. …” — przesłanka o kontach w *Rationale* potwierdzona liczeniem kont (Human actions): 0 kont nie-właściciela; bez zmiany.
- D-17 — „… It builds only while the host's available memory and free disk stay above thresholds the repository sets, and each loop2 container runs under its own memory limit. …” — odczyt linii `resources:` (To do 9).
- D-110 — „In the private Cloudflare Tunnel topology of D-10, account requests require exactly one X-Forwarded-Proto value of https and one syntactically valid CF-Connecting-IP, …” — przyjęcie przez tunel (Human actions, To do 11).
- D-153 — „… Public self-service account recovery is enabled only after confirmation and password-reset messages sent from the intended container reach external inboxes in a real delivery test.” — potwierdzenie wiadomości resetu (Human actions, To do 11).
- D-205 — „The account and save server stores player accounts and each player's complete saved game state in a SQLite database file on persistent local storage outside the replaceable application container layer.” — odczyt `SQLITE_BUSY` (To do 9).
- D-206 — „A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one. …” — przesłanka o cudzych zapisach potwierdzona liczeniem kont: 0 zapisów nie-właściciela; bez zmiany.
- D-223 — „A request for a password-reset link has no limit of its own per client address, and only the limits of D-105 bound it. This holds while only the owner has accounts, and the decision is reviewed before the game's address is given to other players, if abuse has become real.” — „only the owner has accounts” potwierdzone liczeniem kont: 0 kont nie-właściciela; bez zmiany.
- D-232 — „A backup of the account and save database is encrypted on the game server's host before it leaves it, by `age` in the backup script's pipe, with the identity file `/etc/loop2/backup-encryption-key` of D-13 used as a symmetric key. …” — potwierdzenie kopii klucza (Human actions).
- D-233 — „… A schedule that did not start and a host that is down send no message, and delivery depends on push.mikr.us; this gap is reviewed before the public launch of accounts, that is before the owner gives the game's address to other players. …” — **zmiana:** strażnik czyta log kopii i powiadamia o braku udanego wysłania przez 26 godzin, najwyżej raz na dobę; zdanie o przeglądzie znika (F-4, pytanie o częstotliwość).
- D-234 — „A checked restore is one trial on the owner's computer before the change that brings the backups merges: a backup fetched from its destination and decrypted, the same commit run on it, a login with a test account, the saved game state seen back, and the backup removed from the computer. …” — **zmiana:** próba powtarzana co miesiąc i po każdej zmianie wersji schematu bazy albo zapisu gry; nieprzećwiczone ścieżki instrukcji odtwarzania jako przyjęty koszt (pytania o harmonogram i o ścieżki).
- D-237 — „… any difference or error fails the image's build. The Node.js image stays unpinned.” — odczyt wyjść 7 (To do 9).
- D-355 — „… `logrotate` rotates the file weekly, or sooner when it grows large, and keeps four rotated generations, …” — odczyt wersji Compose i dziennego `logrotate` (To do 8, 9).
- D-356 — „… A human installs the watcher and its schedule and sets the notifications of GitHub, and nothing is sent when the server and GitHub are both down, when the watcher's schedule does not start, or when GitHub disables the scheduled workflow after 60 days without activity in the repository, which is public.” — **zmiana:** nowy rodzaj wiadomości o braku kopii; wśród przypadków bez wiadomości także serwer bez działającego `flock`; „about every five minutes” ustępuje rytmowi odczytanemu z przebiegów GitHuba (To do 12).

## Settlements to record

Candidates: 9 shown, 4 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Strażnik czyta log kopii i, gdy przez 26 godzin nie było udanego wysłania kopii, wysyła przez `pusher` wiadomość tego rodzaju najwyżej raz na dobę; przegląd przed otwarciem kont znika z D-233 (zmienia D-233 i D-356). | decision | *Questions to settle*: „Jak często strażnik przypomina o nocy bez kopii?”; F-4 przeglądu | próg braku kopii i jak często przypominać |
| 2 | Gdy na serwerze nie działa `flock`, strażnik dalej kończy się sukcesem z linią we własnym logu i nic nie wysyła — to przyjęta luka, wymieniona w D-356 obok harmonogramu, który nie ruszył (zmienia D-356). | decision | *Questions to settle*: „Co robi strażnik, gdy na serwerze nie działa `flock`?” | czy dodać strażnikowi wiadomość albo kod wyjścia przy awarii `flock` |
| 3 | Właściciel powtarza próbę odtworzenia kopii na swoim komputerze co miesiąc i po każdej zmianie wersji schematu bazy albo wersji zapisu gry (zmienia D-234). | decision | *Questions to settle*: „Jak próba odtworzenia kopii ma iść „na harmonogramie”?” | automat próby i gdzie trzymać jej klucze |
| 4 | Ścieżki instrukcji odtwarzania z listy „Not tried”, razem z `umask 077`, zostają nieprzećwiczone jako przyjęty koszt (zmienia D-234). | decision | *Questions to settle*: „Co z nieprzećwiczonymi ścieżkami instrukcji odtwarzania?” | czy zaplanować ćwiczenie tych ścieżek na serwerze |

Odrzucone przy budowaniu tabeli (5 wierszy): ogólna reguła „zdanie o stanie serwera to fakt środowiska, nie niezmiennik” — człowiek odłożył ją w przeglądzie (sekcja 6, sprawa 9, karta D5), a zadanie zmienia tylko nazwane wpisy; rozszerzenie listy odczytów agenta — D-12 już mówi, że agent czyta, a lista należy do skillu (To do 8); sprawdzenie widoczności repozytoriów przez `gh`, miejsce czynności człowieka i nowe zadanie przy cudzych kontach — kończą się z tym zadaniem.

## Out of scope

- Wiersze tabeli „Sprawdzenia do zamówienia”, których przegląd nie zamówił (7, 8, 12–14, 19, 21, 22, w tym D-191), oraz sprawdzenia lokalne — zadania the author's private task note on the gaps in tests from the review i the author's private task note on the measurements from the foundation review.
- Zmiany D-235 i D-360 o strażniku i instrukcji odtwarzania — zadanie the author's private task note on the changes of the server's and the process's entries from the review.
