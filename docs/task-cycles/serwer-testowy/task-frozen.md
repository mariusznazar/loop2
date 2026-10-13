# Wdrożyć szkielet loop2 na serwer testowy na Mikrusie

Status: ready for cycle
Project relation: plan item: plan_mvp_loop2.md — serwer-testowy

## Description

### Need

- Szkielet gry działa dziś tylko lokalnie; nie ma ani adresu, pod którym loop2 stoi na Mikrusie, ani drogi, którą zmiana z repozytorium trafia na serwer.
- Projekt MVP wymaga wdrożenia loop2 — gry i serwera kont — do własnego kontenera na Mikrusie, pod innym adresem niż `kantarion.bieda.it`, oraz przećwiczonej drogi zmiany od commita do działającej gry na serwerze testowym; kolejne zadania (konta, zapis, poczta) stają na tym kontenerze.

### To do

1. Szkielet gry budowany i uruchamiany w osobnym kontenerze Dockera loop2 na serwerze Mikrusa, na którym stoi stara gra loop, obok działającego wdrożenia loop, którego nic w tym zadaniu nie zmienia.
2. Gra dostępna pod publicznym adresem HTTPS `https://loop2.mariusznazar.com/`, podanym przez Cloudflare.
3. Push na gałąź `main` uruchamia automat GitHuba, który każe serwerowi przebudować grę z tego commitu; serwer sam pobiera kod z GitHuba, a klucz automatu może jedynie uruchomić przebudowę commitu należącego do tej gałęzi.
4. Wdrożenie uruchamia serwer na Node.js 24 i sprawdza typy serwera przed wdrożeniem.
5. Skill wdrożeniowy loop2 obejmujący: podgląd wdrożeń; gdzie leżą sekrety i jak się je obraca; cofanie wdrożenia z liczbą kroków i tym, co dzieje się z danymi; co robi agent, a co człowiek; jak czytać logi.

### Acceptance criteria

- Po wdrożeniu loop2 gra loop pod `https://kantarion.bieda.it/` dalej działa.
- Ani PR, ani repozytorium nie zawiera sekretów ani adresów dostępu do serwera (nazwa serwera, port SSH, użytkownik, adres IPv6); skill i polecenia odwołują się do nich po nazwie sekretu albo miejscu, w którym leżą.

### Questions to settle

- Pod jakim adresem stanie loop2 na Mikrusie?
  - Answer: `loop2.mariusznazar.com` przez Cloudflare, w którym domena `mariusznazar.com` jest już skonfigurowana — rekord AAAA z pośrednikiem Cloudflare na adres IPv6 serwera, reguła źródła (Origin Rule) kierująca na port kontenera, HTTPS dla graczy po stronie Cloudflare, a do serwera zwykłe HTTP; szyfrowanie połączenia Cloudflare z serwerem robimy przed zadaniem 15 (Mariusz, 2026-10-13). Odrzucone: nowa darmowa subdomena Mikrusa (adres związany z Mikrusem) i podmiana `kantarion.bieda.it` (wymagałaby otwarcia definicji MVP). Mariusz, 2026-10-12.
- Która gałąź wdraża loop2 na serwer?
  - Answer: `main` — każdy scalony PR sam trafia na serwer testowy. Docelowo może dojść osobny krok wdrożenia z osobnym środowiskiem testowym. Odrzucone: osobna gałąź `test` jak w loop (ręczny krok przy każdym wdrożeniu, ryzyko rozjazdu z `main`). Mariusz, 2026-10-12.
- Czy skill wdrożeniowy loop2 powstaje w tym zadaniu, czy w osobnym zadaniu planu?
  - Answer: w tym zadaniu. Mariusz, 2026-10-12.
- Jaki dostęp do serwera dostaje agent?
  - Answer: w ramach tego zadania agent czyta serwer przez serwer MCP `mikrus`; na serwerze nie ma dziś nic, czego utraty Mariusz się obawia, więc na teraz działamy swobodnie, a docelowo dostęp trzeba dodatkowo zabezpieczyć. Odrzucone na teraz: osobny klucz SSH agenta zamknięty w skrypcie odczytu i brak dostępu agenta do serwera. Wybór trzyma się także wobec kontenera starej gry loop pod `kantarion.bieda.it` — Mariusz nie obawia się jego utraty. Mariusz, 2026-10-12.
- Co poza sekretami jest wrażliwą konfiguracją serwera, której nie ma być w PR-ze ani w repozytorium?
  - Answer: adresy dostępu do serwera — nazwa serwera, port SSH, użytkownik i adres IPv6; leżą w sekretach repozytorium na GitHubie i w notatce Mariusza w vaulcie, a skill i PR odwołują się do nich po nazwie. Katalog na serwerze, port kontenera i skrypt przebudowy mogą stać w repozytorium. Odrzucone: poza repozytorium tylko sekrety (z repozytorium dałoby się wyczytać, gdzie i jak wejść na serwer). Mariusz, 2026-10-12.
- Czy kontener loop2 jest kontenerem Dockera?
  - Answer: tak — na propozycję zapisania tego wprost w punkcie 1 „To do”. Mariusz, 2026-10-12.

## Context

- Punkt 24 „In scope” definicji: „Wdrożenie loop2 — gry i serwera kont — do własnego kontenera na Mikrusie, pod innym adresem niż `kantarion.bieda.it`.”
- Zadanie 1 app-skeleton jest zrobione; w tym zadaniu nie ma jeszcze bazy, sesji ani poczty, więc kontener nie potrzebuje sekretów aplikacji ani trwałego wolumenu danych.
- Repozytorium `mariusznazar/loop2` jest prywatne, więc serwer potrzebuje klucza do odczytu repozytorium.
- Stan konta Mikrusa odczytany 2026-10-12: jeden serwer (4352 MB RAM, 45 GB dysku), ten sam, na którym stoi stara gra loop; oba publiczne porty IPv4 zajmuje stara gra loop i jej subdomeny, wskazujące na adres IPv6 serwera; pakiet Cytrus nieaktywny.
- Adres IPv6 serwera widać w panelu Mikrusa jako cel subdomeny `kantarion.bieda.it`.
- Bez Cytrusa panel Mikrusa nie podpina własnej domeny, więc `mariusznazar.com` łączy z serwerem Cloudflare, nie Mikrus.
- Cloudflare przekazuje ruch z pośrednikiem tylko na porty 80, 8080, 8880, 2052, 2082, 2086, 2095 (HTTP) i 443, 2053, 2083, 2087, 2096, 8443 (HTTPS): https://developers.cloudflare.com/fundamentals/reference/network-ports/, odczyt 2026-10-12.
- Reguła źródła Cloudflare (Origin Rule) zmienia port docelowy i jest w planie Free, do 10 reguł: https://developers.cloudflare.com/rules/origin-rules/, odczyt 2026-10-12.
- Nie potwierdzono ani w dokumentacji, ani obserwacją, że Cloudflare łączy się z serwerem mającym tylko adres IPv6; błędy 521/525 Cloudflare przy `kantarion.bieda.it` z `wdrozenie_na_mikrusie.md` tego nie dowodzą, bo między Cloudflare a serwerem stoi tam pośrednik Mikrusa.
- Darmowe subdomeny Mikrusa kierują ruch do serwera zwykłym HTTP (cel `http://[<IPv6>]:<port>`, `https: false`).
- Serwer MCP `mikrus` wykonuje dowolne polecenie z prawami roota na serwerze; granica między odczytem a zmianą jest przy nim umowna.
- Wzorzec drogi zmiany starej gry loop: `wdrozenie_na_mikrusie.md` w tym folderze (skrypt przebudowy zamknięty w `command=` klucza automatu, sprawdzenie, czy commit należy do gałęzi, budowanie na serwerze); notatka zawiera wprost nazwę serwera i port SSH — z niej bierze się wzorzec, nie wartości.
- Serwer szkieletu nasłuchuje dziś na `127.0.0.1:3000`, wpisanym w `src/server/main.ts`.
- Zadanie TypeScript 7 (`typescript_7_loop2.md`) zostawiło budowanie i uruchamianie na Linuksie „pierwszemu zadaniu wdrożenia”.

## Questions carried to cycle

- Na jakim adresie i porcie nasłuchuje serwer w kontenerze i jak to ustawić, nie łamiąc testów startu ani niezmiennika `account-server-occupied-address/1`.
- Jak zbudować obraz i kontener loop2 na serwerze i czy ograniczyć jego pamięć obok kontenera loop.
- Gdzie leży źródło skryptu przebudowy, który działa po stronie serwera.
- Czy Cloudflare łączy się z serwerem tylko po IPv6 — sprawdzić po założeniu rekordu AAAA; fakt o otoczeniu zapisuje się dopiero z tej obserwacji.
- Czy metody niezmienników `account-server-runtime/1`, `account-server-typecheck/1` i `loop2-one-serving-process/1` muszą objąć pliki wdrożenia.

## Human actions

- W Cloudflare: rekord AAAA `loop2` z pośrednikiem na adres IPv6 serwera, reguła źródła kierująca `loop2.mariusznazar.com` na port kontenera loop2 i tryb SSL, w którym Cloudflare łączy się z serwerem po HTTP, dla tego adresu — in the cycle
- Wygenerować na serwerze klucz odczytu repozytorium loop2 i dodać go jako Deploy key (bez prawa zapisu) w repozytorium na GitHubie — in the cycle
- Sklonować repozytorium na serwer i zainstalować skrypt przebudowy po stronie serwera — in the cycle
- Utworzyć klucz automatu zamknięty w jednym poleceniu w `authorized_keys` serwera i wpisać sekrety automatu w ustawieniach repozytorium na GitHubie — in the cycle
- Uruchomić pierwszą przebudowę ręcznie i sprawdzić, że gra odpowiada pod adresem loop2, a loop pod `kantarion.bieda.it` — in the cycle

## Decisions in play

Obecny fundament loop2:

- D-01/1 „What runs the account and save server?”: “The account and save server is written in TypeScript and runs on Node.js 24 LTS. Its TypeScript types are checked before deployment.”
- D-05/2 „What serves the built game and account requests in the container?”: “One Node.js process running Express 5 serves both the built game's static files and the `/api/` paths. An unmatched `/api/` request receives an API error, not the game's HTML page.”
- `account-server-runtime/1`: “The account and save server's TypeScript source and deployment use Node.js major version 24.”
- `account-server-typecheck/1`: “The account and save server's TypeScript types are checked before deployment.”
- `loop2-one-serving-process/1`: “One Express 5 process serves both the built game and `/api/` requests.”
- `account-server-occupied-address/1`: “When the account and save server's listening address is already in use, the server process exits with a non-zero code without printing its readiness line `Loop: <address>`.”

Wpisy projektowane definicji `definicja_mvp_loop2.md` (§ Projected foundation changes); przydział według planu, zadanie 2:

- „(new) — Where does the MVP run?” — zadanie zapisuje: “The MVP game and its account and save server run in a dedicated loop2 container on Mikrus, at a public address different from `kantarion.bieda.it`. The existing loop container remains untouched.”
- „(new) — How does a change reach the server?” — zadanie zapisuje: “A push to the deploy branch starts an automation that tells the server to build the game and its account server from that commit; the server pulls the code from GitHub itself, and the automation's key can only start a rebuild of a commit that belongs to that branch.”
- „(new) — What serves the built game and account requests in the container?” — zadanie zapisuje część jeszcze nieobecną w D-05/2, czyli „in the loop2 container”: “One Node.js process running Express 5 serves both the built game's static files and the `/api/` account and save routes in the loop2 container. An unmatched `/api/` request receives an API error, not the game's HTML page.”
- „(new) — What runs the account and save server?” — zadanie urzeczywistnia część o wdrożeniu; zapisało ją zadanie 1 (D-01/1).
- „(new) — What public address do the game and account server share?” — zadanie urzeczywistnia jeden publiczny adres HTTPS gry; zapisuje zadanie 15: “The built game and the account and save server use one public HTTPS origin at loop2's address. The browser sends account and save requests to relative `/api/` paths at that origin.”
- `loop2-container-isolation/1` — zadanie zapisuje: “The loop2 deployment runs in a container separate from the existing loop deployment.”
- `loop2-distinct-address/1` — zadanie zapisuje: “The public address of loop2 differs from `kantarion.bieda.it`.”
- `loop2-one-serving-process/1` — zadanie zapisuje część „in the loop2 container”: “One Express 5 process in the loop2 container serves both the built game and `/api/` account and save requests.”
- `loop2-shared-public-origin/1` — zadanie urzeczywistnia; zapisuje zadanie 15: “The browser loads the built game and sends account and save requests to relative `/api/` paths at the same public HTTPS origin.”
- `account-server-runtime/1`, `account-server-typecheck/1` — zadanie urzeczywistnia część o wdrożeniu; zapisało je zadanie 1.

## Settlements to record

Candidates: 12 shown, 6 accepted — 2026-10-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Gra loop2 stoi pod `loop2.mariusznazar.com`, którą z serwerem łączy Cloudflare: rekord AAAA z pośrednikiem na adres IPv6 serwera, reguła źródła na port kontenera, HTTPS dla graczy po stronie Cloudflare, a do serwera zwykłe HTTP; połączenie Cloudflare z serwerem jest szyfrowane przed zadaniem 15 (konta graczy). | decision | odpowiedź pod pytaniem „Pod jakim adresem stanie loop2 na Mikrusie?” | darmowa subdomena Mikrusa albo certyfikat HTTPS w kontenerze; zadanie 15 nie wiedziałoby, od jakiego pośrednika przychodzą nagłówki przy ciasteczku sesji |
| 2 | Wdraża gałąź `main` — każdy scalony PR sam trafia na serwer testowy; docelowo może dojść osobny krok wdrożenia z osobnym środowiskiem testowym. | decision | odpowiedź pod pytaniem „Która gałąź wdraża loop2 na serwer?” | nazwa gałęzi w automacie i w skrypcie przebudowy oraz warunek przeglądu decyzji „How does a change reach the server?” |
| 3 | Agent tylko czyta serwer przez serwer MCP `mikrus`, a każdą zmianę na serwerze robi człowiek; na teraz działamy swobodnie, a docelowo dostęp trzeba dodatkowo zabezpieczyć. | decision | odpowiedź pod pytaniem „Jaki dostęp do serwera dostaje agent?” | czy skill każe agentowi czytać przez MCP, przez osobny klucz SSH, czy prosić człowieka o polecenie |
| 4 | Sekrety i adresy dostępu do serwera — nazwa serwera, port SSH, użytkownik i adres IPv6 — leżą poza repozytorium, w sekretach repozytorium na GitHubie i w notatce Mariusza; skill i PR odwołują się do nich po nazwie. Katalog na serwerze, port kontenera i skrypt przebudowy mogą stać w repozytorium. | decision | odpowiedź pod pytaniem „Co poza sekretami jest wrażliwą konfiguracją serwera…?” | czy nazwa serwera, port SSH i adres IPv6 stoją w workflow, skrypcie i skillu wprost |
| 5 | Kontener loop2 jest kontenerem Dockera. | decision | odpowiedź pod pytaniem „Czy kontener loop2 jest kontenerem Dockera?” | sposób uruchamiania kontenera loop2 w kolejnych zadaniach |
| 6 | Reguła źródła Cloudflare (Origin Rule) zmienia port docelowy i jest w planie Free, do 10 reguł. | environment fact | Context: https://developers.cloudflare.com/rules/origin-rules/, odczyt 2026-10-12; podstawa wiersza 1 | czy wybór portu kontenera jest ograniczony do portów, na które Cloudflare przekazuje ruch |

## Out of scope

- Baza, konta, sesje i poczta oraz sekrety i wolumen, których wymagają — zadania 15–21.
- Kopia bazy — zadanie 17.
