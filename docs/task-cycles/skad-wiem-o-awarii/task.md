---
title: Ustalić, skąd dowiaduję się o awarii gry loop2 i jak długo żyją jej logi
status: draft
created: 2026-11-05T19:49
updated: 2026-11-08
tags: [zadanie]
related: "a note of the author's notes vault"
---

# Ustalić, skąd dowiaduję się o awarii gry loop2 i jak długo żyją jej logi

Status: ready for cycle
Project relation: independent

## Description

### Need

- Serwer gry pisze wiersze awarii i zdarzeń przez `console` na wyjście swojego procesu (`src/server/log-line.ts:53`, `:59`, loop2 `01b26d5`), czyli do wyjścia kontenera `loop2`; agent czyta je przez `docker compose -p loop2 logs --tail 100 app cloudflared` (skill `loop2-deploy`, „Agent or human”).
- Każde wdrożenie stawia kontenery od nowa (`docker compose … up -d … --force-recreate`, `deploy/loop2-deploy:323`), a `compose.yaml` nie ustawia sposobu przechowywania logów (brak klucza `logging`, loop2 `01b26d5`), więc o tym, co dzieje się z logiem starego kontenera, decyduje ustawienie Dockera na serwerze, którego nikt nie sprawdził.
- Według notatki zadania (Mariusz, 2026-11-05): to, co było w logu przed wdrożeniem, przepada razem ze starym kontenerem, więc agent badający awarię nie znajdzie jej śladu, jeśli od tamtej pory było wdrożenie.
- Wiersze zdarzeń polecenia `account-block`, uruchamianego przez `docker exec`, nie trafiają do logu kontenera, tylko na ekran tego, kto je wpisał (uwaga loop2#051-2; `src/server/account-block.ts:93`–`:97`).
- Nikt nie dostaje powiadomienia o awarii działającej gry; powiadomienie istnieje tylko dla nieudanej nocnej kopii bazy (D-233).
- Błąd w przeglądarce gracza zostaje w tej przeglądarce: na ekranie zdanie o awarii, w konsoli jeden wiersz (D-347, D-253, D-323).
- Dziś gra tylko Mariusz, więc awarię i tak zauważy sam; koszt rośnie z pierwszym graczem z zewnątrz — o awarii Mariusz dowie się od niego albo wcale, a po najbliższym wdrożeniu nie da się sprawdzić, co poszło nie tak (notatka zadania, 2026-11-05).
- Skill wdrożeniowy gry nie mówi, jak długo żyje zapis logów ani skąd człowiek dowiaduje się o awarii, a WAY-139 wymaga obu od skilla wdrożeniowego produktu.

### To do

1. Skrypt wdrożenia, tuż przed odtworzeniem kontenerów, dopisuje cały log obu usług do pliku `/var/log/loop2-app.log` na serwerze (pytanie „Dokąd trafia zapis…”).
2. `compose.yaml` ustawia obu usługom sterownik logów `local` z jego domyślną rotacją (pytanie „Dokąd trafia zapis…”).
3. Wiersze JSON polecenia `account-block`, i tylko one, bez zdań z adresem e-mail, trafiają do tego samego pliku (pytanie „Dokąd trafia zapis…”; uwaga loop2#051-2).
4. Repo ma konfigurację `logrotate` dla `/var/log/loop2-app.log`, którą instaluje człowiek (pytanie „Dokąd trafia zapis…”).
5. Repo ma skrypt strażnika i jego plik harmonogramu w `deploy/`, które instaluje człowiek: strażnik co kilka minut sprawdza stan i zdrowie kontenerów, padnięcia procesu gry i nowe wiersze awarii i woła `pusher` ze stałym tekstem bez danych gracza (pytanie „Skąd właściciel…”).
6. Repo ma zaplanowany workflow GitHub Actions, który co ok. 5 minut otwiera publiczny adres gry i kończy się porażką bez odpowiedzi 200 (pytanie „Skąd właściciel…”).
7. Obsługa ostatniej szansy w przeglądarce, obok wiersza w konsoli, wysyła wiersz rodzaju, kodu i miejsca na nową trasę serwera, a serwer zapisuje go jako wiersz awarii (pytanie „Skąd właściciel…”).
8. Skill `loop2-deploy` mówi, dokąd trafia zapis działającej gry, jak długo żyje, także po wdrożeniu, jak agent go czyta (z nowymi odczytami na liście dozwolonych), skąd właściciel dowiaduje się o awarii i co człowiek instaluje oraz sprawdza na serwerze i w GitHubie — pokrywając dwie brakujące pozycje listy WAY-139.

### Questions to settle

- Skąd właściciel dowiaduje się, że działająca gra padła?
  - Answer: trzy drogi naraz, zmieniając D-347. (1) Strażnik na serwerze: skrypt Bash poza kontenerem gry, uruchamiany z `/etc/cron.d` co kilka minut, czyta stan i zdrowie kontenerów, nowe padnięcia procesu gry i nowe wiersze z polem `failure` w logu kontenera, pomija okno wdrożenia, ogranicza liczbę wiadomości i przy znalezisku woła raz `pusher` ze stałym tematem i tekstem bez danych gracza; jego własny log trzyma tylko liczby i rodzaje, bez `accountId`. Łapie grę nieosiągalną (poza wyłączonym serwerem), proces, który padł i wstał, i awarię obsłużoną przez serwer, za zero złotych, ze skryptem instalowanym przez człowieka. (2) Zaplanowany workflow GitHub Actions w repo co ok. 5 minut otwiera publiczny adres gry i kończy się porażką bez odpowiedzi 200, a GitHub powiadamia właściciela o nieudanym przebiegu; łapie też wyłączony serwer, padnięty tunel i Cloudflare, bez nowego konta, sekretu i zmiany na serwerze. (3) Obsługa ostatniej szansy w przeglądarce, obok wiersza w konsoli, wysyła ten sam wiersz rodzaju, kodu i miejsca na nową trasę serwera, która zapisuje go jako wiersz awarii, a strażnik go zgłasza; pokrywa awarię w przeglądarce gracza bez obcej usługi, za cenę kodu w dwóch częściach i nowej publicznej trasy. Zmienia D-347: znika zakaz własnej trasy serwera na raporty z przeglądarki i naruszenie „a check that looks in the server's output for what went wrong in the browser”, a „running game” tej decyzji zawęża się wprost do przeglądarki.
  - Not chosen:
    - A. Świadomy brak („na razie nic”), dzisiejsza odpowiedź D-347 — zero kosztu; od pierwszego gracza z zewnątrz właściciel dowiaduje się o awarii od gracza albo wcale.
    - A2. Brak z zapisanym przeglądem przed publicznym otwarciem kont, jak w D-233 — zero kosztu; przegląd niczego nie blokuje, do jego terminu cisza zostaje.
    - B sam, bez sprawdzania adresu i bez przeglądarki — wyłączony serwer, martwy cron i martwy `push.mikr.us` dają ciszę wyglądającą jak „wszystko działa”; przeglądarka tylko od gracza.
    - C. Strażnik i zewnętrzny „sygnał życia” (Healthchecks.io, Better Stack) — łapie też wyłączony serwer; nowe konto w obcej usłudze i sekret na serwerze, które D-233 w *Rejected* już odrzuciło.
    - D. Usługa sprawdzająca adres (Better Stack, UptimeRobot, Uptime Kuma u siebie) — tylko gra nieosiągalna; konto w obcej usłudze; Uptime Kuma na tym samym serwerze nie widzi wyłączonego serwera.
    - E1. Alarm Cloudflare o stanie tunelu — zero kosztu przy Zero Trust Free; nie widzi martwej gry przy żywym łączniku.
    - E2. Health Checks Cloudflare — łapie odpowiedzi źródła; plan Pro albo wyższy.
    - G. Sentry — serwer i przeglądarka, z monitorem dostępności także gra nieosiągalna; 0 do 5 tys. błędów, potem $29 miesięcznie; dane w obcej chmurze; trzeba ustawić zbieranie danych i `beforeSend`, żeby nie wyszła treść ani stos błędu (D-252, D-253).
    - H. GlitchTip, hostowany albo u siebie — serwer i przeglądarka; hostowany 0 do 1000 zdarzeń, potem $15 miesięcznie; u siebie usługa, PostgreSQL, kopia bazy i co najmniej 256 MB pamięci na serwerze bez swapu, poza projektem loop2.
    - I. Bugsink — jak H, ze zgodnym SDK Sentry; cennik nieprzeczytany (404).
    - J. Alarm w zewnętrznym magazynie logów — istnieje tylko przy wyborze Grafana Cloud, Better Stack albo własnego Loki dla zapisu gry, których nie wybrano.
  - Source: Mariusz, 2026-11-08: „biorę rekomendacje” (rekomendacja: B + D′ + F, raport `the technology report `skad-wlasciciel-dowiaduje-sie-ze-gra-padla` (kept outside the repository)`, sekcja „Rekomendacja i ryzyka”); preferencja z 2026-11-08 w *Technology*.
  - Based on:
    - `pusher` wysyła wiadomość do właściciela bez konta i opłaty — https://wiki.mikr.us/pusher/, opis narzędzia, "do wysyłania maili do samego siebie"; read 2026-11-08
    - strażnik czytający zdarzenia Dockera ma ograniczony bufor — https://docs.docker.com/reference/cli/docker/system/events/, opis polecenia, "Only the last 256 log events are returned"; read 2026-11-08
    - sygnał życia alarmuje przy braku pingu — https://healthchecks.io/docs/, wstęp, "raises an alert as soon as a ping does not arrive on time"; read 2026-11-08
    - C wnosi koszty odrzucone przy kopii bazy — `foundations/decisions.md`, D-233, *Rejected*, "a new account in a foreign service whose terms nobody checked and one more secret"; read 2026-11-08
    - UptimeRobot sprawdza co 5 minut w planie darmowym — https://uptimerobot.com/pricing/, plan Free, "5 min. monitoring interval"; read 2026-11-08
    - harmonogram GitHub Actions: najkrótszy odstęp — https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows, § schedule, "The shortest interval you can run scheduled workflows is once every 5 minutes."; read 2026-11-08
    - harmonogram GitHub Actions wyłącza się w repo publicznym — tamże, § schedule, "scheduled workflows are automatically disabled when no repository activity has occurred in 60 days"; read 2026-11-08
    - harmonogram GitHub Actions bywa opóźniony — tamże, § schedule, "The `schedule` event can be delayed during periods of high loads of GitHub Actions workflow runs."; read 2026-11-08
    - powiadomienie o harmonogramie idzie do jednej osoby — tamże, § schedule, "Notifications for scheduled workflows are sent to the user who last modified the cron syntax in the workflow file."; read 2026-11-08
    - przebiegi w repo publicznym są darmowe — https://docs.github.com/en/billing/concepts/product-billing/github-actions, "The use of standard GitHub-hosted runners is free:" … "In public repositories"; read 2026-11-08
    - alarm tunelu Cloudflare nie widzi martwej gry — https://developers.cloudflare.com/tunnel/monitoring/, stan tunelu, "does not indicate whether `cloudflared` can reach your internal services"; read 2026-11-08
    - Health Checks Cloudflare wymaga płatnego planu — https://developers.cloudflare.com/notifications/notification-available/, Health Checks status notification, "Professional plans or higher"; read 2026-11-08
    - wysyłka z przeglądarki do serwera do celów diagnostyki — https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon, opis, "intended for analytics and diagnostics code to send data to a server"; read 2026-11-08
    - F zmienia D-347 — `foundations/decisions.md`, D-347, *Verification*, "a route of the server's own that receives reports of the browser's errors"; read 2026-11-08
    - Sentry: limity planu darmowego — https://sentry.io/pricing/, plan Developer, "5k errors", "30-day lookback", "1 uptime monitor"; Team "$29/mo monthly, $26/mo annual"; read 2026-11-08
    - Sentry domyślnie zbiera wszystko — https://docs.sentry.io/platforms/javascript/migration/v10-to-v11/, "In v11, an unset `dataCollection` collects everything by default"; read 2026-11-08
    - GlitchTip u siebie potrzebuje pamięci — https://glitchtip.com/documentation/install, wymagania, "256 MB RAM when using all-in-one setup"; read 2026-11-08
  - Lacks:
    - gdy jednocześnie leży serwer i GitHub Actions, albo harmonogram wyłączył się po 60 dniach bez commitów, właściciel nie dostaje nic, a cisza wygląda jak „działa”
    - czy GitHub domyślnie wysyła e-mail o nieudanym przebiegu, strona nie mówi — właściciel sprawdza to w swoich ustawieniach
    - limitów `push.mikr.us` nikt nie zna, więc strażnik sam dławi wiadomości i może przemilczeć kolejną awarię tego samego rodzaju
    - nowa publiczna trasa przyjmuje raporty od każdego, więc fałszywe raporty dochodzą do logu i do strażnika
    - błąd w przeglądarce, przy którym serwer albo sieć leżą, nie dociera do serwera
    - kod w dwóch częściach (przeglądarka i serwer) i skrypt na serwerze do instalacji przez człowieka
  - Risks taken:
    - strażnik czytający zdarzenia Dockera da fałszywy alarm po każdym merge'u albo zgubi padnięcie w czasie kopii bazy (hypothesis)
    - strażnik uruchomiony jako root założy plik blokady wdrożeń i zablokuje wdrożenia z konta nie-root albo zawieszony zatrzyma wdrożenia i kopię (hypothesis)
    - bufor 256 zdarzeń zapełni się zdarzeniami sprawdzania zdrowia i padnięcie zniknie przed odczytem (hypothesis)
    - wiersze awarii z chwili przed wdrożeniem trafią tylko do zrzutu i nie zostaną zgłoszone (hypothesis)
    - strażnik jako root na serwerze dzielonym z innymi projektami nie jest objęty testem niezmiennika ani porównaniem zainstalowanych kopii (hypothesis)
    - utrata pliku z czasem ostatniego przebiegu da zalew wiadomości, a dławienie `push.mikr.us` zje też powiadomienie o kopii z D-233 (hypothesis)
    - bramka testów odrzuci nowy plik workflow, bo liczy każdy plik w `.github/workflows/` jako drogę wdrożenia (hypothesis)
    - powiadomienia GitHub ustawione na „Don't notify” albo kierowane do innego konta dadzą ciszę wziętą za „działa” (hypothesis)
    - przy dłuższej awarii mail co 5 minut i setki przebiegów na dobę nauczą właściciela je ignorować (hypothesis)
    - sprawdzenie trafiające we wdrożenie albo w blokadę botów Cloudflare da fałszywy alarm; przy prawdziwej awarii przyjdą dwie wiadomości dwoma kanałami (hypothesis)
    - raport wysłany z `keepalive` albo `sendBeacon` zje przydział przeglądarki i gracz straci zapis przy „Wyloguj” (hypothesis)
    - fałszywe raporty z wielu adresów zużyją limit wiadomości strażnika, przykryją prawdziwą awarię serwera i rozdmuchają plik zrzutu (hypothesis)
    - do logu żyjącego tygodniami trafi dowolny tekst z raportu, np. adres e-mail albo cudze `accountId` (hypothesis)
    - błąd powtarzany co takt wyśle kilka raportów na sekundę i złamie „ten sam wiersz raz” z D-253 (hypothesis)
    - trasa raportów albo odpadnie na strażnikach żądań zmieniających stan, albo będzie jedyną bez sprawdzenia pochodzenia (hypothesis)
- Dokąd trafia zapis tego, co robi działająca gra na serwerze, jak długo żyje, także po wdrożeniu, i jak agent go czyta?
  - Answer: skrypt wdrożenia, tuż przed odtworzeniem kontenerów, dopisuje cały log obu usług (`docker compose -p loop2 logs --no-color --timestamps app cloudflared`) do pliku `/var/log/loop2-app.log` na serwerze, rotowanego przez `logrotate`, którego konfigurację instaluje człowiek; `compose.yaml` ustawia obu usługom sterownik `local` z domyślną rotacją, około 100 MB na kontener, więc log bieżący i każdy zrzut mają górną granicę. Wiersze JSON polecenia `account-block`, i tylko one, bez zdań z adresem e-mail, trafiają do tego samego pliku. Zapis przeżywa wdrożenia, także powroty do starszych commitów, i restart serwera, a żyje tyle, ile pozwala rotacja. Agent czyta bieżący kontener jak dziś (`docker compose logs --tail 100`), a starsze pokolenia ograniczonym `tail` albo `grep` pliku przez MCP `mikrus`, dopisanym do listy odczytów w skillu `loop2-deploy`. Zero złotych, bez zależności od niczego niesprawdzonego na serwerze.
  - Not chosen:
    - 1. Zostaje jak dziś: domyślny sterownik Dockera — zero kosztu; zapis ginie przy każdym wdrożeniu i rośnie bez limitu, chyba że ustawienie Dockera na serwerze mówi inaczej.
    - 2. Sam sterownik `local` z rotacją — kilka linii `compose.yaml`; nadal żyje tylko do wdrożenia.
    - 4. Sterownik `journald` — kilka linii `compose.yaml`; przeżywa wdrożenie, ale nie wiadomo, czy dziennik na serwerze jest trwały i czy sterownik działa w nieuprzywilejowanym LXC; dziennik wspólny z całym serwerem, a rada wiki Mikrusa `journalctl --vacuum-size=10M` kasuje też zapis gry.
    - 5. Sterownik `syslog` — kilka linii `compose.yaml`; ok. 5 tygodni w `/var/log/syslog`, wspólnym z całym serwerem; nie wiadomo, czy działa `rsyslog` i czy sterownik działa w LXC.
    - 6. Domyślny sterownik w `/etc/docker/daemon.json` — zmiana całego serwera i restart Dockera, który zatrzymuje też `loop` i `foundryvtt`; obejmuje tylko nowe kontenery.
    - 7. Grafana Cloud Logs — 14 dni za darmo do 50 GB miesięcznie; dane graczy u obcej firmy; wtyczka mogąca zawiesić wspólny demon Dockera albo Alloy z prawami roota; nowy sekret (zmiana D-13), token agenta poza D-12, prawdopodobny konflikt z D-347.
    - 8. Better Stack — 3 dni za darmo; jak 7, z Vectorem z prawami roota i serwerem MCP bez trybu tylko do odczytu.
    - 9. Własny Grafana Loki na serwerze — zapis bez końca, dopóki nie ustawić retencji; usługa, jej dane i aktualizacje na serwerze dzielonym, pamięć nieznana; w projekcie loop2 łamie niezmiennik `loop2-host-sharing`, więc stoi poza nim, instalowana przez człowieka.
  - Source: Mariusz, 2026-11-08: „biorę rekomendacje, chociaż zastanawia mnie w sumie opcja z Lokim” (rekomendacja: opcja 3 z opcją 2, raport `the technology report `dokad-trafia-zapis-gry-i-jak-dlugo-zyje` (kept outside the repository)`, sekcja „Rekomendacja i ryzyka”).
  - Based on:
    - log kontenera ginie przy jego usunięciu — https://raw.githubusercontent.com/moby/moby/v28.1.1/daemon/delete.go, `cleanupContainer`, "containerfs.EnsureRemoveAll(container.Root)"; read 2026-11-08
    - Compose przy odtworzeniu usuwa stary kontener — https://raw.githubusercontent.com/docker/compose/v2.35.1/pkg/compose/convergence.go, `recreateContainer`, "ContainerRemove(ctx, replaced.ID,"; read 2026-11-08
    - domyślny sterownik nie rotuje — https://docs.docker.com/engine/logging/configure/, "Docker keeps the json-file logging driver (without log-rotation) as a default"; read 2026-11-08
    - domyślny limit wielkości `json-file` — https://docs.docker.com/engine/logging/drivers/json-file/, `max-size`, "Defaults to -1 (unlimited)"; read 2026-11-08
    - `local` ma górną granicę — https://docs.docker.com/engine/logging/drivers/local/, "preserves 100MB of log messages per container"; read 2026-11-08
    - rotacja pliku przez `logrotate` — https://manpages.ubuntu.com/manpages/jammy/man8/logrotate.8.html, opis, "allows automatic rotation, compression, removal"; read 2026-11-08
    - zmiana w `daemon.json` dotyczy tylko nowych kontenerów — https://docs.docker.com/engine/logging/configure/, "Existing containers don't use the new logging configuration automatically"; read 2026-11-08
    - `syslog` na Ubuntu przekazuje przez journald — https://manpages.ubuntu.com/manpages/jammy/man5/journald.conf.5.html, "By default, only forwarding to syslog and wall is enabled"; read 2026-11-08
    - Grafana Cloud za darmo — https://grafana.com/pricing/, Free, "14 day retention", "Limited to 50 GB ingested per month"; read 2026-11-08
    - wtyczka Loki może zawiesić demon Dockera — https://grafana.com/docs/loki/latest/send-data/docker-driver/, known issues, "the Docker daemon might wait forever if the container is stuck"; read 2026-11-08
    - Better Stack za darmo — https://betterstack.com/pricing, Free Tier, "3 GB logs retained for 3 days"; read 2026-11-08
    - Loki bez retencji trzyma zapis bez końca — https://grafana.com/docs/loki/latest/operations/storage/retention/, "By default the `compactor.retention-enabled` flag is not set, so the logs sent to Loki live forever"; read 2026-11-08
    - wymagań pamięci Loki w jednym procesie nie podano — https://grafana.com/docs/loki/latest/setup/size/, "This is only documented for microservices/distributed mode"; read 2026-11-08
  - Lacks:
    - zrzut obejmuje tylko kontenery odtworzone przez `loop2-deploy`; kontener usunięty inną drogą traci log jak dziś
    - wiersze z kilku sekund między zrzutem a zatrzymaniem starego kontenera przepadają
    - zapis leży w dwóch miejscach: bieżący kontener w logu Dockera, starsze pokolenia w pliku
    - człowiek instaluje konfigurację `logrotate`, zakłada plik z właścicielem konta wdrożenia i przeinstalowuje skrypt wdrożenia przy każdej jego zmianie
    - `accountId` w wierszach awarii i zdarzeń oraz wiersze `account-block` żyją tygodniami w pliku czytanym przez agenta, zamiast do najbliższego wdrożenia
    - brak wyszukiwania po zapytaniach i widoku w przeglądarce, jakie dałby Loki z Grafaną
  - Risks taken:
    - po rotacji plik dostanie właściciela root albo `logrotate` odmówi rotacji bez `su`, i zrzuty przepadną po cichu (hypothesis)
    - spakowane starsze pokolenia pliku będą dla agenta niewidoczne przy `tail` i `grep` (hypothesis)
    - człowiek dopisze raz całe wyjście `account-block`, z adresami e-mail (hypothesis)
    - kontener padający w kółko rozdmucha plik do gigabajtów przed rotacją, zatrzyma wdrożenia i zabierze dysk `loop` i `foundryvtt` (hypothesis)
    - bez przeinstalowania skryptu zrzutu nie będzie, a powrót do starszego commitu zdejmie limit `local` (hypothesis)
    - `accountId` i domyślny wydruk Node'a ze stosem przy błędzie przed obsługą ostatniej szansy będą żyły tygodniami w pliku czytanym przez agenta (hypothesis)

### Technology

- Note, 2026-11-05: Pierwsza: skąd dowiadujesz się, że działająca gra padła. Do wyboru jest narzędzie, które zbiera awarie, powiadomienie (alert) albo świadoma decyzja, że na razie nic. Ta ostatnia jest pełnoprawną opcją, jeśli jej skutki są nazwane. Druga: jak długo żyją logi gry, także po wdrożeniu nowej wersji. Co gra zapisuje w logach i jak, jest już ustalone (decyzje D-252 i D-253 w dzienniku `loop2`). To zadanie tego nie zmienia. Dotyczy tylko tego, dokąd zapis trafia, jak długo żyje i kto się o nim dowiaduje.
- Skąd właściciel dowiaduje się, że działająca gra padła — settled: Skąd właściciel dowiaduje się, że działająca gra padła?
  - Preference: „jeśli rozmawiamy o logach w ogólności, to na pewno i front i backend, chociaż jeśli to ma mocno ograniczyć wybór to serwerowe tematy bedą ważniejsze” (Mariusz, 2026-11-08); wybór obejmuje awarie serwera i awarie w przeglądarce gracza, a serwer waży więcej
  - Changes: D-347
  - Preference: brak preferencji ani ograniczeń — „nie znam się na tym za bardzo” (Mariusz, 2026-11-08)
- Dokąd trafia zapis działającej gry na serwerze, jak długo żyje, także po wdrożeniu, i jak agent go czyta — settled: Dokąd trafia zapis tego, co robi działająca gra na serwerze, jak długo żyje, także po wdrożeniu, i jak agent go czyta?
  - Preference: brak preferencji ani ograniczeń — „nie znam się na tym za bardzo” (Mariusz, 2026-11-08)

## Context

- Uwaga z PR-ów przypisana do tego zadania: `a note in the author's notes vault`, sekcja „Dopisek: skąd wiem o awarii loop2”, pozycja loop2#051-2: „The block and unblock events reach only your terminal. `account-block` runs through `docker exec`, whose output does not enter `docker logs`”.
- Inne zapisy na serwerze żyją poza kontenerem: log wdrożeń `/var/log/loop2-deploy.log` i log kopii `/var/log/loop2-backup.log`, do którego trafia też wyjście błędów polecenia `account-backup` (`deploy/loop2-backup:178`).
- D-233 zapowiada przegląd luki powiadomień o kopii bazy przed publicznym otwarciem kont, czyli zanim Mariusz poda adres gry innym graczom.
- Skill `loop2-deploy` (`.claude/skills/loop2-deploy/SKILL.md`) pokrywa pozostałe pozycje listy WAY-139: próbne wdrożenie gałęzi, sekrety i ich wymianę, cofnięcie wdrożenia, podział pracy agenta i człowieka, czytanie logów.
- Porównania opcji obu wyborów, ze źródłami, leżą w `the technology report `dokad-trafia-zapis-gry-i-jak-dlugo-zyje` (kept outside the repository)` i `the technology report `skad-wlasciciel-dowiaduje-sie-ze-gra-padla` (kept outside the repository)`; przy każdym przyjętym ryzyku stoi tam tanie zabezpieczenie.
- Zadanie dotyka części `deployment`, `agent-workflow`, `account-server` i `browser-view` oraz niezmienników `loop2-host-sharing`, `account-mutation-request-guards`, `account-client-requests` i `loop2-api-error-route`; test `tests/invariants/test_account_server_typecheck.py:299` liczy dziś każdy plik w `.github/workflows/` jako drogę wdrożenia.
- Wersja Dockera 28.1.1 w fakcie `mikrus-host-docker-workloads` to wersja klienta; wersji demona na serwerze nikt nie odczytał.
- Zakaz dla każdego agenta tego zadania i jego cyklu: nie zaglądać do `the earlier 10x checkout of the repository`, do gałęzi `10x/*` ani tagów `archive/10x-*` w repo loop2, do folderu `Notes/Projects/(P) Przejście 10xDEVS/` w vaulcie ani do zapisów sesji w `the session records of the earlier 10x checkout` i `the session records of the author's notes vault`; stan gry ustala się z repo na `main` (Mariusz, notatka zadania, 2026-11-05).

## Questions carried to cycle

none

## Human actions

- Instalacja konfiguracji `logrotate` z repo i założenie pliku `/var/log/loop2-app.log` z właścicielem konta wdrożenia — in the cycle
- Ponowna instalacja skryptu wdrożenia na serwerze, bo wdrożenie nie aktualizuje zainstalowanej kopii — in the cycle
- Instalacja skryptu strażnika i jego pliku harmonogramu na serwerze — in the cycle
- Ustawienie w GitHubie powiadomień e-mail o nieudanych przebiegach Actions i jedna próbna porażka sprawdzenia adresu, potwierdzająca, że wiadomość dochodzi — in the cycle

## Decisions in play

- D-252 — How does loop2 write its failures to its logs, and what does it log?: „A log line of its Node.js code is one JSON object on one line, written through `console` with no library and under fixed field names, while its Bash scripts keep their own text and a line in the browser's console is plain text. The product logs changes of a player's account and of access to it and operations that change what runs on the server or its backup, and no progress of a game and no housekeeping…”
- D-253 — Which processes of loop2 have a last-resort handler of their own?: „Each process that touches the data of accounts — the server, `account-block` and `account-backup` — has one last-resort handler of its own, which writes the kind, the code and the place of what no code handled…”
- D-347 — How does an agent learn what went wrong in the running game?: „An agent learns what went wrong in the running game from what a player reads, the screen and the chronicle, and from the browser's console, through the browser it operates, with no outside service. An exception in the game shows on the screen as a sentence that something broke and goes to the console.” Jego *Rejected* odrzuca Sentry, GlitchTip i własną trasę serwera na raporty, a *Verification* uznaje za naruszenie „Sentry or GlitchTip added to the game”. Zadanie zmienia D-347 na słowo Mariusza (pytanie „Skąd właściciel…”).
- D-233 — How does the owner learn that a database backup failed?: „At any failed end of a night's backup the backup script, outside the game container, calls `pusher` once, and the owner receives a message whose fixed subject and text say only that the backup failed… A schedule that did not start and a host that is down send no message, and delivery depends on push.mikr.us; this gap is reviewed before the public launch of accounts…”
- D-104 — Which request origin and body may change account state?: „The session cookie uses SameSite=Strict, and every state-changing route requires exactly the configured serialized HTTPS Origin and an application/json body with at most 64 KiB for the save route `PUT /api/saved-game` and at most 16 KiB for every other route…” Dotyczy nowej trasy raportów z przeglądarki.
- D-102 — How are account attempts limited?: „Five failed logins for one normalized email address within a rolling 15-minute window lock that address for 15 minutes from the fifth failure… One client IP admits at most 20 failed logins per rolling 15 minutes and five successfully created accounts per rolling hour…” Limity dotyczą prób na kontach; nowa trasa raportów potrzebuje własnego.
- D-12 — What access to the server does an agent have?: „An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human.”
- D-137 — How does the operator block and unblock a player account?: „The operator blocks and unblocks a player account … with a command run in the `loop2` container, which reports that the account was blocked or unblocked…”

## Settlements to record

Candidates: 9 shown, 8 accepted — 2026-11-08

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Przed każdym odtworzeniem kontenerów wdrożenie dopisuje ich log do `/var/log/loop2-app.log`, rotowanego przez `logrotate`; sterownik `local` ogranicza log bieżący; trafiają tam też same wiersze JSON `account-block`; agent czyta plik przez `mikrus`. | decision | pytanie „Dokąd trafia zapis…”, Answer i Not chosen | gdzie leży zapis, jak długo żyje, czy wiersze blokady konta tam trafiają |
| 2 | O awarii działającej gry właściciel dowiaduje się trzema drogami: strażnik na serwerze przez `pusher`, zaplanowane sprawdzanie adresu w GitHub Actions i raport z przeglądarki na trasę serwera, zgłaszany przez strażnika. | decision | pytanie „Skąd właściciel…”, Answer i Not chosen | które drogi powiadomienia budować i co każda łapie |
| 3 | D-347 zawęża „running game” wprost do przeglądarki i przestaje zakazywać własnej trasy serwera na raporty z przeglądarki oraz szukania ich w wyjściu serwera. | decision (zmienia D-347) | pytanie „Skąd właściciel…”, Answer | czy nowa trasa łamie D-347 i jak ją pogodzić |
| 4 | Wdrożenie przez `loop2-deploy` zostawia log zastąpionych kontenerów w `/var/log/loop2-app.log`. | invariant | pytanie „Dokąd trafia zapis…”, Answer | czy test skryptu wdrożenia pilnuje zrzutu; bez tego zmiana skryptu może go po cichu zdjąć |
| 5 | Wiadomość strażnika przez `pusher` ma stały temat i tekst, bez danych gracza i bez wyjścia narzędzi. | invariant | pytanie „Skąd właściciel…”, Answer; wzór D-233 | co strażnik wkłada do wiadomości wysyłanej bez szyfrowania |
| 6 | Serwer zapisuje raport z przeglądarki tylko jako rodzaj, kod i miejsce zgodne ze wzorcem, z `accountId` wziętym z sesji, nigdy z treści żądania. | invariant | pytanie „Skąd właściciel…”, Risks taken (raport z dowolnym tekstem w logu); propozycja agenta | co nowa publiczna trasa przyjmuje i zapisuje do logu żyjącego tygodniami |
| 7 | Docker usuwa log kontenera razem z kontenerem (moby v28.1.1, `daemon/delete.go`). | environment fact | pytanie „Dokąd trafia zapis…”, Based on | decyzja 1 nie miałaby źródła, dlaczego zrzut jest potrzebny |
| 8 | W repozytorium publicznym GitHub wyłącza zaplanowane workflow po 60 dniach bez aktywności, a repo loop2 jest publiczne. | environment fact | pytanie „Skąd właściciel…”, Based on | decyzja 2 nie miałaby źródła swojego braku |

## Out of scope

- Sygnał życia skryptu kopii bazy, który zamknąłby lukę D-233 (cisza przy niewystartowanym harmonogramie kopii) — sprawa D-233, nie tego zadania.
