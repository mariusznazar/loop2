# NIEZATWIERDZONE — propozycje kroku powrotu (poprawka 1, task/app-skeleton)

Ten plik pokazuje każdy proponowany wpis fundamentu w całości, po angielsku (tak trafiłby do
`foundations/`), a zaraz pod nim jego tłumaczenie na polski. Tłumaczenie nie wchodzi do
fundamentu. Nic tu nie jest zatwierdzone; wszystkie wpisy czekają na Twoją decyzję przy PR-ze.

Te same wpisy w postaci gotowej do nałożenia łatki (nie nałożonej) są w pliku
`C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-1\return\UNAPPROVED-proposed-foundation-against-ab34d90.patch`
— to różnica plików `foundations/` względem commita `ab34d90`; nakłada się też na obecny HEAD
`2544a6a`, bo ten commit zmienił tylko testy niezmienników. Pełne uzasadnienie i dowody:
`C:\Storage\repos\loop2-skeleton\.runs\task-cycles\app-skeleton\reports\correction-1\return\return-step.md`.

**Stan: po krytyce i po panelu.** Panel oceniający (dwa niezależne rozstrzygnięcia, w obu
kolejnościach ocen) doszedł do tego samego: „przyjąć z poprawkami". Poprawki 1, 2, 5–8 dotyczą tylko
niezatwierdzonych propozycji i są już naniesione w tym pliku i w łatce; poprawki 3 i 4 należą do
Ciebie (T1c i pole *Approved by*); poprawki 9–10 to mechanika testów, którą panel z mocy swojej
decyzji nanosi na testy niezmienników.

Kilka słów użytych niżej:

- **część mapy** — jednostka mapy części (`foundations/part_map.md`): odpowiedzialność, pliki,
  dozwolone zależności, tryby awarii. Mapa jest dziś pusta; propozycja zakłada pierwsze pięć części.
- **Scope (zakres)** decyzji — części mapy, którymi decyzja rządzi; **Part** niezmiennika —
  części, w których zmiana może go złamać (`every` = każda).
- **odcisk** — 8 znaków skrótu zdań wiążących wpisu (np. `D-05@e11aec4d`); odwołanie z odciskiem
  zostaje oflagowane, gdy zdania wpisu się zmienią.
- **TODO** w polu — „wiadomo, że czegoś brakuje"; główna gałąź nie przyjmuje go w polach decyzji,
  dlatego te pola blokują merge.
- **bramka gotowości** — akceptacja definicji MVP 2026-10-04: wtedy zatwierdziłeś brzmienie wpisów
  zaprojektowanych. Gdy niżej piszę „z bramki", chodzi o to brzmienie.
- **bramka testów** — skrypt the-way `.the-way/gate/run_tests.py`, który uruchamia testy niezmienników
  i zapisuje dla każdego niezmiennika wynik: zaliczony, niezaliczony albo „niesprawdzony" (gdy metoda
  to `TODO` albo żaden test go nie cytuje).
- **strażnik formatu** — skrypt the-way (`format_guard.py`), który sprawdza, czy plik fundamentu ma
  poprawną formę; z opcją `--merge-onto` sprawdza też to, czego główna gałąź nie przyjmie.
- **„on acceptance" w polu *Approved by*** — każdy nowy wpis D-04…D-07 ma tam „on acceptance"
  (przy akceptacji). Strażnik zgłasza to jako błąd — to 4 jedyne błędy decyzji na tej łatce.
  Przyjęcie wpisu wpisuje tam „Mariusz, <data>" i błąd znika.

---

## Część A — zmiany pól we wpisach już zapisanych (D-01, D-02, D-03 i pięć niezmienników)

Zdania wiążące i odciski tych wpisów się nie zmieniają. Zmieniają się tylko pola wskazane
w nawiasie; reszta to tekst zatwierdzony na bramce gotowości 2026-10-04.

### D-01/1 (zmiany: *Scope*, *Relations*)

```markdown
### D-01/1 — What runs the account and save server?

The account and save server is written in TypeScript and runs on Node.js 24 LTS. Its TypeScript
types are checked before deployment.

- **Change:** new decision
- **Scope:** account-server, build-tools
- **Based on:** node-24-support-schedule@6096d00e · Node.js 24.21.0 TypeScript documentation, "no type checking is performed" (https://nodejs.org/download/release/v24.21.0/docs/api/typescript.html, read 2026-10-04) · State of JS 2025 runtime survey, Node.js 10,062 of 11,141 respondents to the runtime question (https://2025.stateofjs.com/en-US/other-tools/#runtimes, read 2026-10-04) · Bun 1.4.2 documentation, built-in `bun:sqlite` (https://github.com/oven-sh/bun/blob/bun-v1.4.2/docs/runtime/sqlite.mdx, read 2026-10-04) · Deno release documentation, 2.9 LTS to 2027-01-31 (https://docs.deno.com/runtime/fundamentals/stability_and_releases/, read 2026-10-04) · Go SQL driver list (https://go.dev/wiki/SQLDrivers, read 2026-10-04)
- **Relations:** derives from D-07@8ab1f8bc
- **Verification:** level 1 — invariants: account-server-runtime · account-server-typecheck
- **Review when:** Node.js 24 has six months of official support left · check by: 2027-10-30
- **Origin:** none
- **Approved by:** Mariusz, 2026-10-04

*Rationale:* the server can use the same language as the browser game while running on a widely used runtime with a published support period. The server's small responsibility gives no demonstrated reason to trade that support period for another runtime. Node's direct execution of TypeScript does not check its types.
*Rejected:* Bun — its built-in SQLite driver does not outweigh Node's published support period for this server; Deno — its current LTS line has a shorter published support period and the LTS container build was not established; Go — it adds a second application language and, for SQLite, a separately selected driver; plain JavaScript on Node — it lacks explicit types in the server code.
```

> **D-01/1 — Na czym działa serwer kont i zapisów?**
>
> Serwer kont i zapisów jest napisany w TypeScripcie i działa na Node.js 24 LTS. Jego typy
> TypeScript są sprawdzane przed wdrożeniem.
>
> - **Zmiana:** nowa decyzja
> - **Zakres:** account-server, build-tools *(było: TODO — mapa nie ma części)*
> - **Oparta na:** fakt node-24-support-schedule@6096d00e · dokumentacja TypeScript w Node.js 24.21.0, „nie wykonuje się sprawdzania typów" · ankieta State of JS 2025 o środowiskach uruchomieniowych: Node.js u 10 062 z 11 141 odpowiadających · dokumentacja Bun 1.4.2, wbudowany `bun:sqlite` · dokumentacja wydań Deno, 2.9 LTS do 2027-01-31 · lista sterowników SQL dla Go (adresy i daty odczytu jak w wersji angielskiej)
> - **Relacje:** wywodzi się z D-07@8ab1f8bc *(było: TODO — zaprojektowana decyzja „Jak praca gry dzieli się między serwer a przeglądarkę?"; działa tylko, jeśli w pytaniu T4 wybierzesz wariant E)*
> - **Weryfikacja:** poziom 1 — niezmienniki: account-server-runtime · account-server-typecheck
> - **Przegląd, gdy:** Node.js 24 zostanie pół roku oficjalnego wsparcia · sprawdzić do: 2027-10-30
> - **Pochodzenie:** brak
> - **Zatwierdził:** Mariusz, 2026-10-04
>
> *Uzasadnienie:* serwer może używać tego samego języka co gra w przeglądarce, działając na
> szeroko używanym środowisku z opublikowanym okresem wsparcia. Mała odpowiedzialność serwera nie
> daje powodu, by ten okres wsparcia zamienić na inne środowisko. Node uruchamiający TypeScript
> wprost nie sprawdza jego typów.
> *Odrzucone:* Bun — wbudowany sterownik SQLite nie przeważa opublikowanego okresu wsparcia Node;
> Deno — obecna linia LTS ma krótszy opublikowany okres wsparcia, a budowa kontenera LTS nie była
> ustalona; Go — drugi język aplikacji i osobno dobierany sterownik SQLite; zwykły JavaScript na
> Node — brak jawnych typów w kodzie serwera.

### D-02/1 (zmiana: *Scope*)

```markdown
### D-02/1 — How does the account and save server handle HTTP requests?

The account and save server uses Express 5 on Node.js 24 to route and handle HTTP requests and
responses.

- **Change:** new decision
- **Scope:** account-server, build-tools
- **Based on:** Express 5 API, routing and JSON request parsing (https://expressjs.com/en/5x/api/express/, read 2026-10-04) · Express 5 static file serving (https://expressjs.com/en/5x/starter/static-files/, read 2026-10-04) · Express 5 error handling (https://expressjs.com/en/5x/guide/error-handling/, read 2026-10-04) · Node.js 24 low-level HTTP API (https://nodejs.org/docs/latest-v24.x/api/http.html, read 2026-10-04) · Fastify 5.12 validation and serialization (https://fastify.dev/docs/v5.12.x/Reference/Validation-and-Serialization/, read 2026-10-04)
- **Relations:** derives from D-01@e57a4766
- **Verification:** level 1 — invariants: account-server-express-http
- **Review when:** Express 5 no longer supports the server's required request handling or a planned upgrade breaks its routes · check by: 2027-04-04
- **Origin:** none
- **Approved by:** Mariusz, 2026-10-04

*Rationale:* Express supplies routing and JSON request parsing for the small account and save API
without writing those HTTP mechanics in the project. It can also serve the built game if the
serving-process choice keeps one Node process. Express and its separate TypeScript types add
packages to update; the saved-state size limit and input checks still need to be designed with the
API, and no default request-size limit is assumed to fit.
*Rejected:* built-in `node:http` — avoids a framework package but leaves routing, body reading,
size limits and error responses to the project; Fastify 5 — offers schema-based validation, but
the project would write and maintain schemas and would need an additional package to serve static
files in one process; Hono 4 — its current documentation does not mark a version, so it does not
pass this project's documentation filter.
```

> **D-02/1 — Czym serwer kont i zapisów obsługuje żądania HTTP?**
>
> Serwer kont i zapisów używa Express 5 na Node.js 24 do kierowania i obsługi żądań oraz
> odpowiedzi HTTP.
>
> - **Zmiana:** nowa decyzja
> - **Zakres:** account-server, build-tools *(było: TODO)*
> - **Oparta na:** API Express 5 — trasy i odczyt JSON z żądań · Express 5 — podawanie plików statycznych · Express 5 — obsługa błędów · niskopoziomowe API HTTP Node.js 24 · Fastify 5.12 — walidacja i serializacja (adresy i daty jak w wersji angielskiej)
> - **Relacje:** wywodzi się z D-01@e57a4766
> - **Weryfikacja:** poziom 1 — niezmienniki: account-server-express-http *(w tekście z bramki było „invariant:", poprawione na „invariants:" — pytanie T10)*
> - **Przegląd, gdy:** Express 5 przestanie obsługiwać potrzebną serwerowi obsługę żądań albo planowana aktualizacja zepsuje jego trasy · sprawdzić do: 2027-04-04
> - **Pochodzenie:** brak
> - **Zatwierdził:** Mariusz, 2026-10-04
>
> *Uzasadnienie:* Express daje trasy i odczyt JSON-u dla małego API kont i zapisów bez pisania tej
> mechaniki w projekcie. Może też podawać zbudowaną grę, jeśli wybór procesu zostawi jeden proces
> Node. Express i jego osobne typy TypeScript to dodatkowe pakiety do aktualizowania; limit
> rozmiaru zapisu i kontrole danych trzeba zaprojektować razem z API, a domyślny limit rozmiaru
> żądania nie jest z góry uznany za właściwy.
> *Odrzucone:* wbudowane `node:http` — bez pakietu frameworka, ale trasy, odczyt treści, limity
> i odpowiedzi błędów zostają dla projektu; Fastify 5 — walidacja schematami, ale projekt pisałby
> i utrzymywał schematy i potrzebowałby dodatkowego pakietu do plików statycznych w jednym
> procesie; Hono 4 — obecna dokumentacja nie oznacza wersji, więc nie przechodzi filtra
> dokumentacji projektu.

### D-03/1 (zmiany: *Scope*, *Relations*)

```markdown
### D-03/1 — How is the browser view built?

The browser view is built in TypeScript with the browser's DOM APIs, without an additional UI framework.

- **Change:** new decision
- **Scope:** browser-view, build-tools
- **Based on:** TypeScript Handbook, "ships type definitions for the DOM API" (https://www.typescriptlang.org/docs/handbook/dom-manipulation.html, read 2026-10-04) · React documentation, "npm install react react-dom" (https://react.dev/learn/add-react-to-an-existing-project, read 2026-10-04) · Vue documentation, "npm create vue@latest" (https://vuejs.org/guide/quick-start.html, read 2026-10-04) · Svelte documentation, "using Vite" (https://svelte.dev/docs/svelte/typescript, read 2026-10-04)
- **Relations:** derives from D-04@b703ab2a
- **Verification:** level 1 — invariants: browser-view-framework
- **Review when:** none
- **Origin:** none
- **Approved by:** Mariusz, 2026-10-04

*Rationale:* the MVP's view mostly reads the game state and needs no added UI framework to start. This keeps one dependency out of the browser view; the project accepts writing the updates of the program editor and its counters itself.
*Rejected:* React, Vue and Svelte — each adds UI tooling and a dependency before this MVP has shown a benefit from one.
```

> **D-03/1 — Jak zbudowany jest widok w przeglądarce?**
>
> Widok w przeglądarce jest zbudowany w TypeScripcie z użyciem interfejsów DOM przeglądarki, bez
> dodatkowej biblioteki do budowania widoku.
>
> - **Zmiana:** nowa decyzja
> - **Zakres:** browser-view, build-tools *(było: TODO)*
> - **Oparta na:** podręcznik TypeScript, „dostarcza definicje typów dla API DOM" · dokumentacja React, „npm install react react-dom" · dokumentacja Vue, „npm create vue@latest" · dokumentacja Svelte, „using Vite" (adresy i daty jak w wersji angielskiej)
> - **Relacje:** wywodzi się z D-04@b703ab2a *(było: TODO — zaprojektowana decyzja „Z czego gra jest zbudowana?"; zmiana działa tylko, jeśli przyjmiesz D-04 — pytanie T2)*
> - **Weryfikacja:** poziom 1 — niezmienniki: browser-view-framework
> - **Przegląd, gdy:** brak
> - **Pochodzenie:** brak
> - **Zatwierdził:** Mariusz, 2026-10-04
>
> *Uzasadnienie:* widok MVP głównie odczytuje stan gry i na start nie potrzebuje dodatkowej
> biblioteki. To trzyma jedną zależność z dala od widoku; projekt przyjmuje, że sam napisze
> odświeżanie edytora programu i jego liczników.
> *Odrzucone:* React, Vue i Svelte — każde dokłada narzędzia i zależność, zanim MVP pokazało
> z nich korzyść.

### Pięć zapisanych niezmienników (jedyna zmiana: *Derives from* w loop2-api-error-route)

```markdown
## account-server-runtime/1

The account and save server's TypeScript source and deployment use Node.js major version 24.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-01@e57a4766
- **Part:** every
- **Correction:** none

## account-server-typecheck/1

The account and save server's TypeScript types are checked before deployment.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-01@e57a4766
- **Part:** every
- **Correction:** none

## account-server-express-http/1

The account and save server handles its HTTP routes and responses through Express 5.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-02@06e6d3d8
- **Part:** every
- **Correction:** none

## browser-view-framework/1

The browser view uses TypeScript and browser APIs to render its screens, with no UI framework in its code or runtime dependencies.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-03@fb5aa3b0
- **Part:** every
- **Correction:** none

## loop2-api-error-route/1

An unmatched `/api/` request receives an API error response, never the built game's HTML page.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-05@e11aec4d
- **Part:** every
- **Correction:** none
```

> **account-server-runtime/1** — Kod TypeScript serwera kont i zapisów oraz jego wdrożenie używają
> Node.js w wersji głównej 24.
> Metoda: polecenie bramki uruchamiające testy z `tests/invariants` · Opiera się na: brak ·
> Wywodzi się z: D-01@e57a4766 · **Część: every** *(bez zmian: wdrożenia jeszcze nie ma i żadna
> część nie trzyma jego plików, więc każda zmiana może go złamać)* · Korekta: brak
>
> **account-server-typecheck/1** — Typy TypeScript serwera kont i zapisów są sprawdzane przed
> wdrożeniem.
> Metoda: jw. · Opiera się na: brak · Wywodzi się z: D-01@e57a4766 · **Część: every** *(bez
> zmian, z tego samego powodu)* · Korekta: brak
>
> **account-server-express-http/1** — Serwer kont i zapisów obsługuje swoje trasy i odpowiedzi
> HTTP przez Express 5.
> Metoda: jw. · Opiera się na: brak · Wywodzi się z: D-02@06e6d3d8 · **Część: every** *(bez
> zmian — panel: zawężenie niczego nie dawało, a „w razie wątpliwości więcej części")* · Korekta: brak
>
> **browser-view-framework/1** — Widok w przeglądarce używa TypeScriptu i interfejsów przeglądarki
> do rysowania ekranów, bez biblioteki do budowania widoku w kodzie ani w zależnościach
> uruchomieniowych.
> Metoda: jw. · Opiera się na: brak · Wywodzi się z: D-03@fb5aa3b0 · **Część: every** *(bez
> zmian, z tego samego powodu)* · Korekta: brak
>
> **loop2-api-error-route/1** — Nieznane żądanie `/api/` dostaje odpowiedź błędu API, nigdy
> stronę HTML zbudowanej gry.
> Metoda: jw. · Opiera się na: brak · **Wywodzi się z: D-05@e11aec4d** *(było: TODO —
> zaprojektowana decyzja „Co podaje pliki gry…"; działa tylko po przyjęciu D-05 — pytanie T3)* ·
> **Część: every** *(bez zmian: przyszły plik wdrożenia, np. pośrednik przed Expressem, może go
> złamać, a żadna część jeszcze takich plików nie trzyma)* · Korekta: brak

---

## Część B — nowe decyzje

### D-04/1 (proponowana; pierwsze zdanie zaprojektowanej decyzji „What is the game built with?")

Przeniesiona z propozycji kroku fundamentu; zmienione *Scope* (było `TODO`) i przykład
naruszenia (poprzedni łapał też `scripts/build.mjs` i testy `.mjs`, które nie są grą). Wzór wpisu
pozwala tu na poziom 1 (da się napisać test: „skrypt przeglądarki powstaje z TypeScriptu"); poziom 2
jak na bramce to świadomy wybór — o jedną rundę testu mniej.

```markdown
### D-04/1 — What is the game built with?

The game is written in TypeScript and runs in the browser.

- **Change:** new decision
- **Scope:** browser-view, build-tools
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a game screen written as a TypeScript module that the build compiles for the browser
  - violates: a part of the game written as a Godot scene, or a script the browser loads written directly in JavaScript instead of compiled from TypeScript
- **Review when:** movement and collisions become the core of the game's fun · check by: 2027-04-03
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D10, §7 and §9 "Wskrzeszenie a doliczanie nieobecności" · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What is the game built with?"
- **Approved by:** on acceptance

*Rationale:* text code and tests give the most leverage in work with AI agents.
*Rejected:* Godot — slower to work on with AI agents.
```

> **D-04/1 (proponowana) — Z czego gra jest zbudowana?**
>
> Gra jest napisana w TypeScripcie i działa w przeglądarce.
>
> - **Zmiana:** nowa decyzja
> - **Zakres:** browser-view, build-tools
> - **Oparta na:** brak
> - **Relacje:** brak
> - **Weryfikacja:** poziom 2 — agent porównuje zmianę z decyzją:
>   - zgodne: ekran gry napisany jako moduł TypeScriptu, który budowanie kompiluje dla przeglądarki
>   - naruszające: część gry napisana jako scena Godota albo skrypt ładowany przez przeglądarkę, napisany wprost w JavaScripcie zamiast skompilowany z TypeScriptu
> - **Przegląd, gdy:** ruch i kolizje staną się sednem frajdy z gry · sprawdzić do: 2027-04-03
> - **Pochodzenie:** koncepcja_projektowa.md w vaulcie (Notes/Projects/(P) Loop), D10, §7 i §9 „Wskrzeszenie a doliczanie nieobecności" · pełny zatwierdzony wpis: definicja_mvp_loop2.md w vaulcie (Notes/Projects/(P) Loop), § Projected foundation changes, „What is the game built with?"
> - **Zatwierdził:** przy akceptacji
>
> *Uzasadnienie:* kod tekstowy i testy dają największą dźwignię w pracy z agentami AI.
> *Odrzucone:* Godot — wolniej się nad nim pracuje z agentami AI.

Pominięte względem bramki (bo kod ich jeszcze nie spełnia): zdanie o symulacji jako czystych
funkcjach i zdanie o widoku rysującym tylko ze stanu gry. Dołączy je zadanie, które przyniesie
symulację.

### D-05/1 (proponowana; część zaprojektowanej decyzji „What serves the built game and account requests in the container?")

Przeniesiona z propozycji kroku fundamentu. Zmienione *Scope* (było `TODO`), *Relations* (pytanie
T3; było `TODO — narrows …`) oraz *Verification*:
wraca do brzmienia z bramki („level 1 — invariants: loop2-one-serving-process ·
loop2-api-error-route"), bo zasadę jednego procesu niesie teraz proponowany niezmiennik
`loop2-one-serving-process/1` (Część C, pytanie T5). Niezatwierdzona para przykładów z poziomu 2
wypadła. Zdania wiążące i odcisk `e11aec4d` bez zmian.

```markdown
### D-05/1 — What serves the built game and account requests in the container?

One Node.js process running Express 5 serves both the built game's static files and the `/api/`
paths. An unmatched `/api/` request receives an API error, not the game's HTML page.

- **Change:** new decision
- **Scope:** account-server, build-tools
- **Based on:** Express 5 static file serving (https://expressjs.com/en/5x/starter/static-files/, read 2026-10-04) · Express 5 request routing and response API (https://expressjs.com/en/5x/api/express/, read 2026-10-04) · Caddy 2 route, file_server and reverse_proxy (https://caddyserver.com/docs/caddyfile/directives/route, read 2026-10-04) · Docker multiple processes in one container (https://docs.docker.com/engine/containers/multi-service_container/, read 2026-10-04)
- **Relations:** derives from D-02@06e6d3d8
- **Verification:** level 1 — invariants: loop2-one-serving-process · loop2-api-error-route
- **Review when:** serving built files through Express becomes difficult to operate or the account API needs a separate process · check by: 2027-04-04
- **Origin:** none
- **Approved by:** on acceptance

*Rationale:* Express already handles the API and can serve the built files in the same process, so
this choice adds no second server process or proxy configuration to the container. The application
must set static-file and fallback rules carefully, including cache policy and a distinct error
response for unmatched `/api/` requests. A later proxy can retain the public paths.
*Rejected:* Caddy in front of Express within the same container — provides a separate file server
and proxy routing but adds another process to start, monitor and update, plus its configuration.
```

> **D-05/1 (proponowana) — Co podaje pliki gry i obsługuje żądania kont w kontenerze?**
>
> Jeden proces Node.js z Express 5 podaje zarówno pliki statyczne zbudowanej gry, jak i ścieżki
> `/api/`. Nieznane żądanie `/api/` dostaje błąd API, nie stronę HTML gry.
>
> - **Zmiana:** nowa decyzja
> - **Zakres:** account-server, build-tools
> - **Oparta na:** Express 5 — podawanie plików statycznych · Express 5 — trasy żądań i API odpowiedzi · Caddy 2 — route, file_server i reverse_proxy · Docker — wiele procesów w jednym kontenerze (adresy i daty jak w wersji angielskiej)
> - **Relacje:** wywodzi się z D-02@06e6d3d8
> - **Weryfikacja:** poziom 1 — niezmienniki: loop2-one-serving-process · loop2-api-error-route
> - **Przegląd, gdy:** podawanie zbudowanych plików przez Express stanie się trudne w utrzymaniu albo API kont będzie wymagać osobnego procesu · sprawdzić do: 2027-04-04
> - **Pochodzenie:** brak
> - **Zatwierdził:** przy akceptacji
>
> *Uzasadnienie:* Express już obsługuje API i może podawać zbudowane pliki w tym samym procesie,
> więc ten wybór nie dokłada do kontenera drugiego procesu serwera ani konfiguracji pośrednika.
> Aplikacja musi starannie ustawić reguły plików statycznych i odpowiedzi zastępczej, w tym
> pamięć podręczną i osobną odpowiedź błędu dla nieznanych żądań `/api/`. Późniejszy pośrednik
> może zachować publiczne ścieżki.
> *Odrzucone:* Caddy przed Express w tym samym kontenerze — daje osobny serwer plików
> i kierowanie żądań, ale dokłada kolejny proces do uruchamiania, pilnowania i aktualizowania
> oraz jego konfigurację.

### D-06/1 (proponowana; z pierwszego przebiegu, bez zdania o sprawdzaniu typów i bez kopiowania HTML)

```markdown
### D-06/1 — How are the browser and server built together?

The browser and server share one npm package and lockfile, and have separate TypeScript
compilation configurations and output directories. Building the application compiles both
configurations.

- **Change:** new decision
- **Scope:** build-tools, browser-view, account-server
- **Based on:** none
- **Relations:** none
- **Verification:** level 1 — invariants: application-build-layout · application-build-output
- **Review when:** none
- **Origin:** none
- **Approved by:** on acceptance

*Rationale:* a shared installation keeps the local starting point small, while separate compiler
environments keep browser and server types apart.
*Rejected:* separate packages — add installation coordination; a bundler — adds a build layer
without a demonstrated need in the current application.
```

> **D-06/1 (proponowana) — Jak wspólnie budujemy przeglądarkę i serwer?**
>
> Przeglądarka i serwer mają jeden wspólny pakiet npm i jeden plik blokady zależności, a osobne
> konfiguracje kompilacji TypeScriptu i osobne katalogi wynikowe. Budowanie aplikacji kompiluje
> obie konfiguracje.
>
> - **Zmiana:** nowa decyzja
> - **Zakres:** build-tools, browser-view, account-server
> - **Oparta na:** brak
> - **Relacje:** brak
> - **Weryfikacja:** poziom 1 — niezmienniki: application-build-layout · application-build-output
> - **Przegląd, gdy:** brak
> - **Pochodzenie:** brak (całe uzasadnienie jest we wpisie)
> - **Zatwierdził:** przy akceptacji
>
> *Uzasadnienie:* wspólna instalacja trzyma lokalny start mały, a osobne środowiska kompilatora
> trzymają typy przeglądarki i serwera osobno.
> *Odrzucone:* osobne pakiety — dokładają koordynację instalacji; bundler — dokłada warstwę
> budowania bez wykazanej potrzeby w obecnej aplikacji.

Zmiana względem pierwszej wersji: zdanie o kopiowaniu HTML wypadło, bo opisywało dzisiejszy
mechanizm budowania (pierwszy arkusz stylów albo obrazek wymagałby nowej wersji decyzji, choć nic
chronionego by się nie zmieniło); *Pochodzenie* nie wskazuje już szkicu spec, który gałąź usunęła.
Odcisk zdań: `094e6fa7`.

### D-07/1 (proponowana; część zaprojektowanej decyzji „How is the work of the game split between the server and the browser?" — wariant E pytania T4)

Z dwóch zdań bramki kod szkieletu odpowiada tylko fragmentowi pierwszego: serwer nie liczy nic
z gry (podaje pliki i odpowiada 404 na `/api`). To prawda „przez brak" — tak samo jak „gra działa
w przeglądarce" w D-04 dla pustego `<main>`. Czy to się liczy jako „kod czyni zdanie prawdziwym",
to Twoja decyzja. Przykłady i uzasadnienie unikają słów „map run", „earning loop", „catch-up", żeby
nie wciągać ich pojęć do słownika; zdania uzasadnienia o spreparowanym postępie i przyjętym koszcie
są przywrócone dosłownie z bramki (poprawka panelu 6). Odcisk zdania: `8ab1f8bc`.

```markdown
### D-07/1 — How is the work of the game split between the server and the browser?

The server computes nothing of the game.

- **Change:** new decision
- **Scope:** account-server
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a server route that stores data the browser sends and returns it unchanged
  - violates: a server module that computes the outcome of a character's actions or of the time the game was closed
- **Review when:** saved progress starts affecting other players, rankings, shared exchange or rewards outside a player's own game · check by: 2027-04-04
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D23 · the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "How is the work of the game split between the server and the browser?"
- **Approved by:** on acceptance

*Rationale:* computing the game in the browser keeps it computed as loop computes it, so the
server adds only accounts and a save that follows the player from browser to browser. Players can
replace their own saved game states and forge their own progress. The MVP accepts that cost while
the saved progress affects only its owner's game; account isolation prevents changing another
player's saved state.
*Rejected:* the server computing the game itself — a second home for the simulation and many
times the work.
```

> **D-07/1 (proponowana) — Jak praca gry dzieli się między serwer a przeglądarkę?**
>
> Serwer nie liczy nic z gry.
>
> - **Zmiana:** nowa decyzja
> - **Zakres:** account-server
> - **Oparta na:** brak
> - **Relacje:** brak
> - **Weryfikacja:** poziom 2 — agent porównuje zmianę z decyzją:
>   - zgodne: trasa serwera, która zapisuje dane wysłane przez przeglądarkę i zwraca je bez zmian
>   - naruszające: moduł serwera, który liczy skutek działań postaci albo czasu, gdy gra była zamknięta
> - **Przegląd, gdy:** zapisany postęp zacznie wpływać na innych graczy, rankingi, wspólną wymianę albo nagrody poza własną grą gracza · sprawdzić do: 2027-04-04
> - **Pochodzenie:** koncepcja_projektowa.md w vaulcie (Notes/Projects/(P) Loop), D23 · pełny zatwierdzony wpis: definicja_mvp_loop2.md w vaulcie (Notes/Projects/(P) Loop), § Projected foundation changes, „How is the work of the game split between the server and the browser?"
> - **Zatwierdził:** przy akceptacji
>
> *Uzasadnienie:* liczenie gry w przeglądarce zostawia je takim, jak w loop, więc serwer dokłada
> tylko konta i zapis, który idzie za graczem z przeglądarki do przeglądarki. Gracze mogą podmienić
> własny zapis i spreparować własny postęp. MVP przyjmuje ten koszt, dopóki postęp wpływa tylko na
> grę właściciela; rozdzielenie kont chroni zapis innych graczy.
> *Odrzucone:* serwer sam liczący grę — drugie miejsce dla symulacji i wielokrotna praca.

Gdy zadanie kont i zapisu przyniesie resztę, zapisze D-07/2 w pełnym brzmieniu z bramki, a odwołanie
w D-01 zostanie wtedy oflagowane do sprawdzenia — tak ma być.

---

## Część C — nowe niezmienniki

Pierwszy z nich, `loop2-one-serving-process/1`, to część niezmiennika zaprojektowanego w definicji
MVP (pytanie T5). Pozostałe cztery mają metodę `TODO`: bramka testów zgłasza je jako
niesprawdzone. Jeśli je przyjmiesz, ich testy, celowe złamania i ponowne napisanie kodu pod te testy
zrobią osobni agenci w następnej rundzie poprawki — tak jak w tej rundzie dla pięciu zapisanych
niezmienników (pytanie T6).

### loop2-one-serving-process/1 (proponowany; część zaprojektowanego niezmiennika)

Zaprojektowane brzmienie z bramki: „One Express 5 process in the loop2 container serves both the
built game and `/api/` account and save requests." Kod szkieletu spełnia je bez „in the loop2
container" (kontenera nie ma) i bez „account and save" (nie ma tras kont ani zapisów), więc
proponowane zdanie jest skrócone. Identyfikator zostaje ten z definicji, w wersji 1: nazywa to,
co zdanie ogranicza (proces podający grę i `/api/`), a nie brzmienie, więc gdy kontener i trasy
kont dojdą, ten sam wpis podniesie wersję do `/2`, zamiast żeby powstały dwa wpisy o tym samym.

```markdown
## loop2-one-serving-process/1

One Express 5 process serves both the built game and `/api/` requests.

- **Method:** `TODO`
- **Rests on:** none
- **Derives from:** D-05@e11aec4d
- **Part:** every
- **Correction:** none
```

> **loop2-one-serving-process/1 (proponowany)** — Jeden proces Express 5 podaje zarówno zbudowaną
> grę, jak i żądania `/api/`.
> Metoda: TODO · Opiera się na: brak · Wywodzi się z: D-05@e11aec4d (działa tylko po przyjęciu
> D-05) · Część: every · Korekta: brak
>
> *Część `every`*: tak jak `loop2-api-error-route` — przyszły plik wdrożenia (np. pośrednik przed
> Expressem albo drugi proces w kontenerze) może złamać oba, a żadna część jeszcze takich plików
> nie trzyma.

Odcisk zdania: `1e0b09c2`. **Test, celowe złamanie i ponowne napisanie kodu pod test czekają na
Twoją akceptację tego zdania** — dopiero wtedy osobni agenci piszą test i złamanie. Do tego czasu
żaden test go nie cytuje, dlatego metoda to `TODO` (poprawka panelu 1): z poleceniem bramki testów
i bez cytującego testu bramka dawałaby mu przy każdym uruchomieniu błąd, a nie „niesprawdzony".
Gdy test powstanie, metoda wróci do polecenia bramki testów.

```markdown
## application-build-layout/1

The application has one npm package and lockfile, with distinct TypeScript configurations and output directories for browser and server code.

- **Method:** `TODO`
- **Rests on:** none
- **Derives from:** D-06@094e6fa7
- **Part:** build-tools · browser-view · account-server
- **Correction:** none
```

> **application-build-layout/1** — Aplikacja ma jeden pakiet npm i jeden plik blokady, a osobne
> konfiguracje TypeScriptu i katalogi wynikowe dla kodu przeglądarki i serwera.
> Metoda: TODO · Opiera się na: brak · Wywodzi się z: D-06@094e6fa7 · Część: build-tools ·
> browser-view · account-server · Korekta: brak

```markdown
## application-build-output/1

Building the application compiles both the browser and the server TypeScript configurations.

- **Method:** `TODO`
- **Rests on:** none
- **Derives from:** D-06@094e6fa7
- **Part:** build-tools · browser-view · account-server
- **Correction:** none
```

> **application-build-output/1** — Budowanie aplikacji kompiluje obie konfiguracje TypeScriptu:
> przeglądarki i serwera.
> Metoda: TODO · Opiera się na: brak · Wywodzi się z: D-06@094e6fa7 · Część: build-tools ·
> browser-view · account-server · Korekta: brak

```markdown
## public-file-boundary/1

The server serves static files only from the built public directory, whatever working directory its process starts in.

- **Method:** `TODO`
- **Rests on:** none
- **Derives from:** none
- **Part:** account-server · build-tools
- **Correction:** none
```

> **public-file-boundary/1** — Serwer podaje pliki statyczne wyłącznie ze zbudowanego katalogu
> publicznego, niezależnie od katalogu, w którym startuje jego proces.
> Metoda: TODO · Opiera się na: brak · Wywodzi się z: brak · Część: account-server · build-tools ·
> Korekta: brak
>
> *(Zmiana: poprzednie zdanie wiązało sposób wyznaczania katalogu — „względem własnego modułu" —
> co zabroniłoby np. katalogu wskazanego zmienną środowiskową w kontenerze; chronimy to, skąd
> wolno podawać pliki. Po panelu: *Wywodzi się z* `none` i niezmiennik zdjęty z *Weryfikacji* D-05,
> bo D-05 nic nie mówi o tym, z jakiego katalogu podawać pliki — inaczej wpis dokładałby regułę do
> D-05 tylnymi drzwiami.)*

```markdown
## account-server-occupied-address/1

When the account and save server's listening address is already in use, the server process exits with a non-zero code without printing its readiness line `Loop: <address>`.

- **Method:** `TODO`
- **Rests on:** none
- **Derives from:** none
- **Part:** account-server · build-tools
- **Correction:** none
```

> **account-server-occupied-address/1** — Gdy adres nasłuchiwania serwera kont i zapisów jest już
> zajęty, proces serwera kończy się kodem różnym od zera i nie wypisuje swojej linii gotowości
> `Loop: <adres>`.
> Metoda: TODO · Opiera się na: brak · Wywodzi się z: brak · Część: account-server · build-tools ·
> Korekta: brak
>
> *(Względem pierwszego przebiegu: „skonfigurowany adres" zamienione na „adres nasłuchiwania
> serwera", bo adres jest dziś wpisany na stałe w kodzie. Po panelu: poprzednie „nie wypisuje adresu"
> było fałszywe — komunikat błędu (`src/server/main.ts:5`) wypisuje adres, a zwykły test
> (`tests/startup.test.mjs:30`) go wymaga. Wybrany sygnał: linia gotowości `Loop: <adres>` na
> standardowym wyjściu (`main.ts:10`), której zwykły test przy zajętym porcie zabrania
> (`tests/startup.test.mjs:31`).)*

---

## Część D — pierwsza mapa części

Pole **Depends on** (dozwolone zależności) wypełniłem szkicem z tego, po co kod dziś sięga
(pytanie T1b). Pole **Failure modes** (tryby awarii) jest Twoje — w łatce stoi tam
`TODO — question for the human`, który strażnik formatu mapy odrzuca, więc mapa nie przejdzie, dopóki
go nie rozstrzygniesz (pytanie T1c). Skala krytyczności i przepływy krytyczne — też Twoje, puste.

```markdown
## browser-view

The part draws the game's screens in the browser.

- **Files:** src/browser/**
  tests/invariants/test_browser_view_framework.py
- **Depends on:** none
- **Failure modes:** TODO — question for the human: what fails, the damage, its severity and what detects it before release
- **Trust boundary:** none
```

> **browser-view** — Część rysuje ekrany gry w przeglądarce.
> Pliki: `src/browser/**`, `tests/invariants/test_browser_view_framework.py` · Zależy od: brak ·
> Tryby awarii: TODO — pytanie do Ciebie · Granica zaufania: brak

```markdown
## account-server

The part is the account and save server: it serves the built game and handles the HTTP requests sent to it.

- **Files:** src/server/**
  tests/http.test.mjs
  tests/startup.test.mjs
  tests/invariants/test_account_server_express_http.py
  tests/invariants/test_loop2_api_error_route.py
- **Depends on:** browser-view · build-tools
- **Failure modes:** TODO — question for the human: what fails, the damage, its severity and what detects it before release
- **Trust boundary:** src/server/**
```

> **account-server** — Część jest serwerem kont i zapisów: podaje zbudowaną grę i obsługuje
> wysyłane do niego żądania HTTP.
> Pliki: `src/server/**`, `tests/http.test.mjs`, `tests/startup.test.mjs`,
> `tests/invariants/test_account_server_express_http.py`,
> `tests/invariants/test_loop2_api_error_route.py` · Zależy od: browser-view · build-tools ·
> Tryby awarii: TODO ·
> Granica zaufania (pliki przyjmujące niezaufane dane): `src/server/**`

```markdown
## build-tools

The part installs dependencies, checks types and builds and launches the application.

- **Files:** package.json
  package-lock.json
  tsconfig.browser.json
  tsconfig.server.json
  scripts/build.mjs
  .gitignore
  README.md
  tests/invariants/loop2_invariant_support.py
  tests/invariants/test_account_server_runtime.py
  tests/invariants/test_account_server_typecheck.py
- **Depends on:** browser-view · account-server
- **Failure modes:** TODO — question for the human: what fails, the damage, its severity and what detects it before release
- **Trust boundary:** package-lock.json
```

> **build-tools** — Część instaluje zależności, sprawdza typy, buduje i uruchamia aplikację.
> Pliki: `package.json`, `package-lock.json`, `tsconfig.browser.json`, `tsconfig.server.json`,
> `scripts/build.mjs`, `.gitignore`, `README.md`, `tests/invariants/loop2_invariant_support.py`,
> `tests/invariants/test_account_server_runtime.py`,
> `tests/invariants/test_account_server_typecheck.py` · Zależy od: browser-view · account-server ·
> Tryby awarii: TODO ·
> Granica zaufania: `package-lock.json` (przez nią wchodzą pakiety z rejestru npm)

```markdown
## agent-workflow

The part directs and records the work performed on this repository.

- **Files:** AGENTS.md
  .agents/**
  .claude/**
  .gitmodules
  .the-way
- **Depends on:** product-foundation
- **Failure modes:** TODO — question for the human: what fails, the damage, its severity and what detects it before release
- **Trust boundary:** none
```

> **agent-workflow** — Część kieruje pracą wykonywaną w tym repozytorium i ją zapisuje.
> Pliki: `AGENTS.md`, `.agents/**`, `.claude/**`, `.gitmodules`, `.the-way` · Zależy od:
> product-foundation ·
> Tryby awarii: TODO · Granica zaufania: brak

```markdown
## product-foundation

The part holds the product rules and the map of its responsibilities.

- **Files:** foundations/**
- **Depends on:** none
- **Failure modes:** TODO — question for the human: what fails, the damage, its severity and what detects it before release
- **Trust boundary:** none
```

> **product-foundation** — Część trzyma reguły produktu i mapę jego odpowiedzialności.
> Pliki: `foundations/**` · Zależy od: brak · Tryby awarii: TODO · Granica zaufania: brak

```markdown
## External context

| Partner | Direction | What comes in | Updates with the product |
|---|---|---|---|
| HTTP clients | both | untrusted | no |
| npm registry | them → us | untrusted | no |
```

> **Kontekst zewnętrzny** — klienci HTTP: wymiana w obie strony, wchodzą dane niezaufane, nie
> aktualizują się razem z produktem · rejestr npm: od nich do nas, wchodzą niezaufane pakiety,
> nie aktualizuje się razem z produktem *(nowy wiersz względem pierwszego przebiegu)*.

Wszystkie 50 plików śledzonych przez git ma dokładnie jedną część (strażnik mapy na tej
propozycji: 0 plików bez części; 10 błędów to wyłącznie `TODO` w polu trybów awarii — po dwa na
część).

---

## Część E — materiał do wariantu A pytania T4 (nie w łatce)

Wariant A pytania T4 zapisałby teraz w całości zaprojektowaną decyzję o podziale pracy, w brzmieniu
z bramki, razem z trzema pojęciami słownika, których używa. Pokazuję je w całości, żebyś widział,
co wtedy wejdzie. Numer `D-0x` dostałaby kolejny wolny; odcisk zdań wiążących: `a3f29a15`.

```markdown
### D-0x/1 — How is the work of the game split between the server and the browser?

The server holds the players' accounts and each player's saved game state, and computes nothing of
the game. The browser computes the whole game — the map runs, the earning loops and the catch-up —
and sends the saved game state to the server.

- **Change:** new decision
- **Scope:** account-server, browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a server endpoint that stores the saved game state the browser sends and returns it on login
  - violates: a server endpoint that advances a map run, or computes the catch-up
- **Review when:** saved progress starts affecting other players, rankings, shared exchange or rewards outside a player's own game · check by: 2027-04-04
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D23
- **Approved by:** Mariusz, 2026-10-04

*Rationale:* computing the game in the browser keeps it computed as loop computes it, so the server
adds only accounts and a save that follows the player from browser to browser. The catch-up
recomputes the map runs that would have happened, so a server running the game would buy little
at many times the cost. Players can replace their own saved game states and forge their own
progress. The MVP accepts that cost while the saved progress affects only its owner's game;
account isolation prevents changing another player's saved state.
*Rejected:* the server computing the game and running the earning loops itself — a second home for
the simulation and many times the work, for little gain while the catch-up recomputes the same map
runs; no accounts, with the save kept in the browser — drops the logging in the game is to have.
```

> **D-0x/1 — Jak praca gry dzieli się między serwer a przeglądarkę?**
>
> Serwer trzyma konta graczy i zapisany stan gry każdego gracza i nie liczy nic z gry. Przeglądarka
> liczy całą grę — przejścia map, pętle zarobkowe i doliczanie nieobecności — i wysyła zapisany
> stan gry na serwer.
>
> - **Zmiana:** nowa decyzja
> - **Zakres:** account-server, browser-view *(moja propozycja; w bramce `TODO`)*
> - **Oparta na:** brak
> - **Relacje:** brak
> - **Weryfikacja:** poziom 2 — agent porównuje zmianę z decyzją:
>   - zgodne: punkt końcowy serwera, który zapisuje stan gry wysłany przez przeglądarkę i zwraca go przy logowaniu
>   - naruszające: punkt końcowy serwera, który posuwa przejście mapy albo liczy doliczanie nieobecności
> - **Przegląd, gdy:** zapisany postęp zacznie wpływać na innych graczy, rankingi, wspólną wymianę albo nagrody poza własną grą gracza · sprawdzić do: 2027-04-04
> - **Pochodzenie:** koncepcja_projektowa.md w vaulcie (Notes/Projects/(P) Loop), D23
> - **Zatwierdził:** Mariusz, 2026-10-04 (z zapisu bramki)
>
> *Uzasadnienie:* liczenie gry w przeglądarce zostawia je takim, jak w loop, więc serwer dokłada
> tylko konta i zapis, który idzie za graczem z przeglądarki do przeglądarki. Doliczanie
> nieobecności przelicza przejścia, które by się odbyły, więc serwer liczący grę dałby niewiele za
> wielokrotny koszt. Gracze mogą podmienić własny zapis i spreparować własny postęp. MVP przyjmuje
> ten koszt, dopóki postęp wpływa tylko na grę właściciela; rozdzielenie kont chroni zapis innych
> graczy.
> *Odrzucone:* serwer liczący grę i sam prowadzący pętle zarobkowe — drugie miejsce dla symulacji
> i wielokrotna praca za niewielki zysk; brak kont i zapis w przeglądarce — odpada logowanie, które
> gra ma mieć.

Pojęcia, które weszłyby razem z nią (brzmienie z bramki):

```markdown
## map run

A map run is one attempt of one character at one map, from entering it until a completion, the
character's death or the player stopping it.

- **Avoid:** none
- **Not:** none

## earning loop

An earning loop is a succession of map runs that one character makes on one map without the player
starting each.

- **Avoid:** none
- **Not:** none

## catch-up

The catch-up is the computing of the game minutes that passed while the game was closed.

- **Avoid:** none
- **Not:** none
```

> **map run (przejście mapy)** — jedna próba jednej postaci na jednej mapie, od wejścia do
> domknięcia, śmierci postaci albo zatrzymania przez gracza. Unikać: brak · Nie: brak.
> **earning loop (pętla zarobkowa)** — ciąg przejść mapy, które jedna postać robi na jednej mapie
> bez uruchamiania każdego przez gracza. Unikać: brak · Nie: brak.
> **catch-up (doliczanie nieobecności)** — liczenie minut gry, które minęły, gdy gra była
> zamknięta. Unikać: brak · Nie: brak.
>
> Ich definicje używają słów „completion" (domknięcie) i „game minute" (minuta gry), które —
> jak „program rule" i „trip plan" przy pojęciu `program` — zostałyby niezapisane, bo nie mają
> jeszcze użycia poza słownikiem.

---

## Do decyzji

Pytania T1–T5 blokują merge. Pozostałe nie blokują, ale to, co w nich przyjmiesz, będzie wiązać
kolejne zadania. Łatka zawiera moje rekomendacje (D-07 z wariantu E w T4, `derives from` w D-05,
szkic zależności części, przepisane zdania); warianty, których nie rekomenduję, opisuję tylko tu.

Strażnicy formatu na łatce (porównanie z `91ee59e…`, z `--merge-onto` i bez): decyzje — 4 błędy,
wyłącznie „on acceptance" w D-04…D-07 (znikają przy akceptacji); niezmienniki, słownik, fakty — 0;
mapa części — 10 błędów, wyłącznie `TODO` w trybach awarii (T1c), 0 plików bez części.

Panel oceniający przeczytał całą zmianę dwa razy, w dwóch kolejnościach, i oba rozstrzygnięcia są
zgodne: przyjąć z poprawkami. Jego pytania do Ciebie są wplecione niżej (T3, T6, T7, T12) bez
powtórzeń. Poprawki mechaniki testów 9 i 10 nanosi na testy niezmienników sam panel (to jego
kompetencja): test sprawdzania typów nie reaguje już na pliki przypinające wersję Node
(`.nvmrc`, `.node-version`, `.tool-versions`), a test widoku nie uznaje samego odczytu
`document.body`, `document.head` czy `document.documentElement` za rysowanie.

### T1a. Pięć części mapy i przypisanie plików — blokuje merge

**Materiał:** Część D (pięć części, odpowiedzialność każdej, granice zaufania, kontekst zewnętrzny)
i tabela przypisania wszystkich 50 plików w `return-step.md` §3.5.

**Co z niego wynika:** dopóki mapa nie ma części, *Zakres* D-01, D-02 i D-03 zostaje `TODO`, a tego
główna gałąź nie przyjmie.

**Pytanie:** czy przyjmujesz pięć części (`browser-view`, `account-server`, `build-tools`,
`agent-workflow`, `product-foundation`) z takim przypisaniem plików?

- **Gdy zostawimy:** szkielet się nie zmerguje.
- **Gdy przyjmiesz:** *Zakres* decyzji i *Część* niezmienników mają się do czego odwołać; każda
  zmiana w kolejnych zadaniach trafia do jednej części.
- **Koszt:** podział można później zmieniać (podział albo scalenie części), ale identyfikatory raz
  użyte zostają na liście wycofanych.
- **Rekomendacja:** przyjąć.

### T1b. Dozwolone zależności części — blokuje merge

**Materiał (szkic w łatce):**

| Część | Zależy od | Skąd |
|---|---|---|
| browser-view | nic | — |
| account-server | browser-view · build-tools | podaje zbudowane pliki przeglądarki; jego testy i start potrzebują wyniku budowania |
| build-tools | browser-view · account-server | kompiluje obie i kopiuje `src/browser/index.html` |
| agent-workflow | product-foundation | zapisuje fundament |
| product-foundation | nic | — |

**Co z niego wynika:** account-server i build-tools zależą od siebie nawzajem. Strażnik to
przepuszcza i nie znalazłem w the-way reguły ani za, ani przeciw — to punkt otwarty. Skutek
praktyczny: awaria jednej z tych części liczy się też jako zagrożenie dla drugiej, więc obie dostaną
tę samą, wyższą z dwóch ostrość kontroli.

**Pytanie:** przyjmujesz ten szkic, czy go poprawiasz (np. account-server bez zależności od
build-tools, jeśli wynik budowania uznasz za wejście, nie za zależność)?

- **Gdy zostawimy `TODO`:** mapa się nie zmerguje.
- **Gdy przyjmiesz:** gdy kiedyś pojawi się polecenie pokazujące faktyczny graf zależności kodu,
  każda zależność spoza tej listy wyjdzie jako naruszenie.
- **Rekomendacja:** przyjąć szkic.

### T1c. Tryby awarii części — blokuje merge

**Co widać:** pole „tryby awarii" mówi, co w części może się zepsuć, jaką szkodę to robi, jak jest
dotkliwe i co to wykrywa przed wydaniem. Dotkliwość musi być stopniem ze skali krytyczności — a skala
jest pusta, więc najpierw trzeba ją napisać (ile stopni i co każdy kosztuje; the-way nie ustala
jeszcze, ile stopni ma mieć skala).

**Pytanie:** czy opisujesz teraz skalę i tryby awarii każdej części, czy wpisujemy na razie `none`?

- **Teraz skala i tryby awarii:** kontrola kolejnych zmian dopasowuje się do tego, co realnie grozi;
  koszt: Twoja ocena pięciu części i napisanie skali, zanim szkielet się zmerguje.
- **`none` na razie:** strażnik przechodzi (sprawdzone), każda część liczy się jako najwyższej
  krytyczności — to kierunek bezpieczny. Koszt w tym repozytorium: każda zmiana, nawet literówka
  w README, przechodzi pełną pętlę przeglądu (osobni recenzenci, panel oceniający zmiany fundamentu,
  pełne testy), dopóki któreś zadanie nie zapisze trybów awarii, a Ty nie przyjmiesz obniżenia.
- **Panel (poprawka 3):** to Twoja odpowiedź — tryby awarii albo `none` dla każdej z pięciu części
  i stopnie skali; część agent-workflow zostaje (wymaga jej zasada przypisania plików).
- **Rekomendacja:** `none` na razie — szkielet nic jeszcze nie robi dla graczy, więc rzetelna ocena
  szkód będzie możliwa dopiero przy kontach i zapisie; koszt pełnej pętli i tak dziś ponosimy.

### T2. D-04 — część decyzji „Z czego gra jest zbudowana?" — blokuje merge

**Materiał:** D-04/1 w Części B (z poprawionym przykładem naruszenia).

**Co z niego wynika:** D-03 wywodzi się z tej decyzji; bez niej *Relacje* D-03 zostają `TODO`. Kod
spełnia tylko jej pierwsze zdanie.

**Pytanie:** czy przyjmujesz D-04/1 w tym brzmieniu, tak by D-03 brzmiało „derives from
D-04@b703ab2a"?

- **Gdy zostawimy:** *Relacje* D-03 blokują merge.
- **Gdy przyjmiesz:** blokada znika; gdy przyjdzie symulacja, zadanie dopisze dwa pozostałe zdania
  z bramki, a odwołanie w D-03 zostanie sprawdzone ponownie.
- **Koszt:** nowe brzmienie przykładów. Weryfikacja zostaje na poziomie 2 (porównanie przez agenta),
  choć dałoby się tu napisać test (poziom 1) — to świadomie jedna runda testu mniej.
- **Rekomendacja:** przyjąć.

### T3. D-05 — część decyzji „Co podaje pliki gry…" i jej *Relacje* — blokuje merge

**Materiał:** D-05/1 w Części B. Brzmienie z bramki: „TODO — narrows the projected decisions „How does
the account and save server handle HTTP requests?" and „What public address do the game and account
server share?" of this definition". W łatce: `derives from D-02@06e6d3d8`.

**Co z niego wynika:**
- `derives from` pasuje, bo D-05 służy D-02: samo uzasadnienie D-02 przewiduje, że Express „może też
  podawać zbudowaną grę, jeśli zostanie jeden proces" — D-05 to rozwija, nie łamie.
- `narrows` powiedziałby kolejnym agentom, że D-05 świadomie idzie wbrew D-02 na jakimś węższym
  obszarze i tam ma pierwszeństwo — a takiego obszaru D-05 nie wskazuje i nie ma.
- Odwołanie do niezapisanej decyzji o publicznym adresie wróci, gdy zadanie z kontenerem i trasami
  kont zapisze D-05 w pełnym brzmieniu.

**Pytanie:** czy przyjmujesz D-05/1 z *Relacjami* `derives from D-02@06e6d3d8` zamiast zatwierdzonego
na bramce „narrows …"?

- **Gdy zostawimy brzmienie z bramki (`TODO — narrows …`):** merge zablokowany — blokada tylko
  przechodzi z niezmiennika loop2-api-error-route na D-05.
- **Gdy przyjmiesz:** obie blokady znikają; *Wywodzi się z* loop2-api-error-route i
  loop2-one-serving-process wskazuje D-05.
- **Koszt:** zmieniasz rodzaj relacji zatwierdzony na bramce; do pełnej wersji D-05 fundament nie
  mówi nic o jej związku z decyzją o publicznym adresie.
- **Panel (pytanie 2):** oba rozstrzygnięcia uznają, że `derives from` czyta się właściwie, i proszą
  Cię tylko o potwierdzenie odejścia od tekstu definicji.
- **Rekomendacja:** przyjąć z `derives from`.

### T4. *Relacje* D-01 — blokuje merge

**Materiał:** D-07/1 w Części B (wariant E, w łatce) i pełna decyzja z trzema pojęciami w Części E
(wariant A, poza łatką).

**Co z niego wynika:** D-01 wywodzi się z decyzji o podziale pracy między serwer a przeglądarkę.
Z jej dwóch zdań kod szkieletu odpowiada tylko fragmentowi: serwer nie liczy nic z gry. To prawda
„przez brak", tak samo jak D-04 dla pustej strony. **Czy „serwer nie liczy nic z gry" liczy się jako
zdanie, które kod czyni prawdziwym, to Twoja decyzja.**

**Pytanie:** którą drogą zamykamy to pole?

- **E. Część decyzji jako D-07/1: „The server computes nothing of the game."** (rekomendowana, w
  łatce). D-01: „derives from D-07@8ab1f8bc". Ta sama droga co D-04 i D-05. Koszt: jeszcze jeden wpis
  częściowy; zadanie kont i zapisu zapisze później D-07/2 w pełnym brzmieniu, a odwołanie w D-01
  zostanie wtedy oflagowane — tak ma być. Jeśli uznasz, że „przez brak" się nie liczy, E odpada.
- **A. Cała decyzja teraz, w brzmieniu z bramki, z pojęciami map run, earning loop, catch-up.**
  To sprzeczne z dwiema przypiętymi decyzjami the-way: WAY-01 (jako naruszenie podaje „a planned
  feature is written into the foundation before it is built" — planowaną funkcję zapisaną
  w fundamencie, zanim powstała) i WAY-126 (wpis zaprojektowany wchodzi z zadaniem, którego kod go
  spełnia; część — jako propozycja). Odstępstwo zostaje na głównej gałęzi po merge'u. Koszt
  dodatkowy: trzy pojęcia, których definicje opierają się na dwóch niezapisanych słowach.
- **B. `none`.** Nieprawda — relacja istnieje; zadanie, które później zapisze decyzję o podziale
  pracy, nie znajdzie D-01 przeszukaniem fundamentu, więc relacja może przepaść.
- **C. Zostawić `TODO`.** Szkielet czeka, aż zadanie kont i zapisu zapisze decyzję; kolejne zadania
  stoją.
- **D. Zmienić the-way** (T11), by główna gałąź przyjmowała `TODO` wskazujące wpis zaprojektowany.
  Koszt: nowa wersja the-way i ponowne przypięcie przed tym merge'em.
- **Rekomendacja:** E; D zgłosić do the-way niezależnie.

### T5. Część zaprojektowanego niezmiennika loop2-one-serving-process — blokuje merge

**Materiał:** `loop2-one-serving-process/1` w Części C oraz *Weryfikacja* D-05/1 w Części B (oba
w łatce).

**Co z niego wynika:** zaprojektowany niezmiennik brzmi „One Express 5 process in the loop2
container serves both the built game and `/api/` account and save requests." Kod szkieletu spełnia
jego część: jeden proces Express 5 podaje zbudowaną grę i obsługuje ścieżki `/api/` — nie ma tylko
kontenera ani tras kont. Proponowane zdanie: „One Express 5 process serves both the built game and
`/api/` requests.", wywiedzione z D-05. D-05 wraca wtedy do weryfikacji z bramki, a para przykładów,
której nikt nie zatwierdził, znika.

**Pytanie:** czy przyjmujesz zdanie `loop2-one-serving-process/1` razem z nową *Weryfikacją* D-05?

- **Gdy przyjmiesz:** osobny agent pisze test, inny — celowe złamanie (z samego zdania), potem kod
  jest pisany ponownie pod test. Plik testu trzeba przypisać do części mapy.
- **Gdy odrzucisz:** zadanie odchodzi od zasady wnoszenia wpisów zaprojektowanych, a D-05 wraca do
  niezatwierdzonej pary przykładów.
- **Koszt przyjęcia:** jeszcze jedna runda (test, złamanie, ponowny kod); przy kontenerze i trasach
  kont ten sam identyfikator dostanie wersję `/2`, a test aktualizację.
- **Rekomendacja:** przyjąć.

### T6. Propozycje z pierwszego przebiegu, które zostają — nie blokuje

**Materiał:** D-06/1 (Część B), application-build-layout/1, application-build-output/1,
public-file-boundary/1, account-server-occupied-address/1 (Część C) — zdania przepisane po krytyce:
bez mechanizmu kopiowania HTML, bez „względem własnego modułu", z obserwowalnym sygnałem zamiast
„gotowości".

**Co z niego wynika:** żaden wpis zaprojektowany ani zapisany nie mówi o układzie budowania,
o katalogu, z którego wolno podawać pliki, ani o wyjściu przy zajętym adresie. Dziś pilnują tego
tylko zwykłe testy (`tests/http.test.mjs`, `tests/startup.test.mjs`), które wykonawca może zmienić.

Żaden z tych wpisów nie pochodzi z definicji MVP — są nowe. Po panelu: public-file-boundary nie
wywodzi się już z D-05 (*Wywodzi się z* `none`, zdjęty z *Weryfikacji* D-05 — D-05 nic nie mówi
o katalogu plików), a account-server-occupied-address mówi o linii gotowości `Loop: <adres>`
zamiast o adresie, który komunikat błędu wypisuje.

**Pytania:**
1. **Które z nich wchodzą w tę zmianę, a które idą później jako osobna propozycja?** (pytanie 1
   panelu)
   - **Wszystkie teraz:** ich testy, celowe złamania i ponowne napisanie kodu pod te testy zrobią
     osobni agenci w następnej rundzie poprawki — tak jak w tej rundzie dla pięciu zapisanych
     niezmienników; do tego czasu metoda `TODO` = bramka testów zgłasza je jako „niesprawdzone".
     application-build-layout trzeba wtedy rozbić na dwa wpisy (jeden pakiet i plik blokady /
     osobne konfiguracje i katalogi wynikowe), bo łączy dwie reguły, które psują się osobno.
   - **Tylko D-06 i application-build-output (rekomendacja panelu):** opisują produkt taki, jaki jest,
     i są tanie. Koszt: pierwsze zdanie D-06 (jeden pakiet, osobne konfiguracje) zostaje bez
     wywiedzionego niezmiennika — D-06 trzeba by wtedy dać parę przykładów na poziomie 2 albo
     dopisać te niezmienniki później. public-file-boundary i account-server-occupied-address
     zostają pod zwykłymi testami (`tests/http.test.mjs`, `tests/startup.test.mjs`).
   - **Żadne teraz:** zero dodatkowej pracy; wszystko zostaje pod zwykłymi testami, które wykonawca
     może zmienić bez sygnału z fundamentu.
   - **Rekomendacja:** jak panel — D-06 z application-build-output teraz, pozostałe trzy później.
2. **Produkt:** co ma dostać nieznana ścieżka spoza `/api/` — zwykłe 404 na stałe, czy zostawiamy
   miejsce na podawanie w takim wypadku strony gry? Dziś kod (`src/server/app.ts:11-13`), README
   („Pozostałe brakujące ścieżki otrzymują zwykłe 404") i zwykły test (`tests/http.test.mjs`)
   odpowiadają zwykłym 404. Wycofałem niezmiennik missing-page-response, który by to utrwalił,
   opierając się na jednym odczytaniu słowa „fallback" z uzasadnienia D-05 z bramki („must set
   static-file and fallback rules carefully") — bramka gotowości nie ustaliła, czym ta odpowiedź zastępcza ma być.
   - **Wycofać (stan łatki):** 404 zostaje w kodzie i zwykłym teście; późniejsze zadanie może
     zacząć podawać stronę gry dla nieznanych ścieżek bez zmiany fundamentu.
   - **Utrwalić:** przywracam missing-page-response; podawanie strony gry dla nieznanych ścieżek
     będzie wymagało zmiany fundamentu; koszt: kolejny niezmiennik z rundą testu.
   - **Rekomendacja:** wycofać (taniej, a gra może kiedyś potrzebować adresów prowadzących do strony).

Wycofane z Twojego polecenia: unmatched-api-response i application-type-check.

### T7. Założenia wbudowane w testy niezmienników — nie blokuje, ale wiąże

Testy niezmienników są w trakcie implementacji tylko do odczytu, więc wszystko, co w nie wpisano,
wiąże kolejne zadania — zmiana któregokolwiek wymaga powrotu do kroku fundamentu.

| Założenie | Gdzie | Co się stanie, gdy zostawimy | Rekomendacja |
|---|---|---|---|
| Serwer startuje na 127.0.0.1:3000 | `tests/invariants/loop2_invariant_support.py:24-25`, od `2544a6a` także błąd, gdy port zostaje zajęty (`:278`) | zadanie wdrożenia musi zmienić adres (w kontenerze 127.0.0.1 nie jest osiągalny z zewnątrz) i przy okazji wrócić do kroku fundamentu z tym modułem; uruchomione równolegle `npm run dev` daje fałszywy błąd bramki testów | zostawić; zadanie wdrożenia zmieni to razem z resztą |
| Test sprawdzania typów pada, gdy pojawi się plik wdrożenia (Dockerfile, workflow CI…); po poprawce panelu 9 już nie przy samych plikach przypinających wersję Node | `tests/invariants/test_account_server_typecheck.py:90-93` | pierwsze zadanie dodające taki plik — także zwykły workflow CI z testami — musi rozszerzyć ten test w kroku fundamentu | zostawić; ciche przejście poręczałoby drogę wdrożenia, której nikt nie przeczytał |
| Test Expressa szuka linii diagnostycznej pakietu `router` („router dispatching …") | `tests/invariants/test_account_server_express_http.py:44,144` | aktualizacja Express/router zmieniająca tę linię da głośny, fałszywy błąd | zostawić; błąd jest widoczny i od razu wskazuje przyczynę |
| „Odpowiedź błędu API" = status 400–599 z treścią JSON | `tests/invariants/test_loop2_api_error_route.py` | błąd API w innym formacie niż JSON nie przejdzie, choć zdanie niezmiennika go nie wyklucza | zostawić (zgodne z README); słownika nie dopisuję, bo „JSON" to reguła, nie znaczenie słowa |
| `.tsx` liczy się jako format biblioteki widoku; jQuery nie | `tests/invariants/test_browser_view_framework.py` | widok w TSX bez biblioteki nie przejdzie testu | zostawić |
| Do uruchomienia testów potrzebne są Python (wymóg bramki testów the-way), git i npm w PATH, a na Windows także PowerShell | moduł pomocniczy | na maszynie bez nich testy kończą się błędem, nie fałszywym zaliczeniem | zostawić; ewentualnie dopisać w README |
| Testy czytają drzewo robocze z nieśledzonymi plikami i lokalne `node_modules` | moduł pomocniczy | lokalny, niezacommitowany plik (np. Dockerfile) albo inna wersja w `node_modules` zmienia wynik lokalnie; w czystym klonie bez znaczenia | zostawić |

**Pytania:**
1. Czy przyjmujesz te założenia jako część testów niezmienników? Rekomendacja: tak.
2. **Pytanie 4 panelu:** test wersji Node (`test_account_server_runtime.py`) ma ok. 120 linii
   czytania plików wdrożenia, które dziś nic nie sprawdzają (takich plików nie ma) i mają znaną
   dziurę (Node zainstalowany w końcowym obrazie nie z obrazu `node`). Wyciąć?
   - **Gdy zostawimy:** kod testu bez pożytku dziś, a jutro może przepuścić wdrożenie z inną
     wersją Node przez tę dziurę.
   - **Gdy wytniemy:** prostszy test; połowa zdania o wdrożeniu nie jest wtedy sprawdzana — ale
     pułapka w teście typów każe zadaniu wdrożenia i tak wrócić do kroku fundamentu i dopisać to
     sprawdzenie od nowa.
   - **Koszt wycięcia:** zmiana testu niezmiennika (osobny agent i celowe złamanie).
   - **Rekomendacja panelu i moja:** wyciąć, ale tylko razem z zachowaniem pułapki (poprawka 9).
3. **Pytanie 5 panelu:** czy zapisać jako fakt o środowisku, że pakiet `router` wypisuje linię
   „router dispatching …" przy `DEBUG=router` — na tym opiera się test Expressa?
   - **Gdy zostawimy:** zmiana tej linii w nowym Expressie da głośny, fałszywy błąd testu; przyczynę
     widać od razu.
   - **Gdy zapiszemy:** fakt dostaje własną metodę sprawdzenia i pokaże zmianę osobno. Koszt: wzór
     faktów mówi, że fakt o tym, co uruchamia metodę sprawdzenia, nie jest faktem, na którym opiera
     się niezmiennik, a fakt stoi tylko wtedy, gdy wskazuje go niezmiennik albo decyzja — więc nie
     miałby dziś gdzie stać.
   - **Rekomendacja:** zostawić bez faktu.

### T8. Czy osobne małe zadanie ma spróbować TypeScriptu 7.x, zanim przybędzie kodu gry? — nie blokuje

**Co widać:** szkielet przypina TypeScript 6.0.3, choć najnowszy był 7.0.2; powód z pierwszego
przebiegu: „klasyczny kompilator działa przez Node bez natywnych zależności zależnych od platformy".
Nic w fundamencie ani w testach nie wiąże wersji głównej kompilatora. Czego 7.x wymaga od tego
budowania, ten przebieg nie ustalił.

- **Gdy nie (zostajemy przy 6.0.3 bez planu):** kolejne zadania piszą kod kompilowany przez 6.0.3;
  im później przejście, tym więcej kodu do sprawdzenia.
- **Gdy tak:** jedno małe zadanie teraz, przy najmniejszej ilości kodu; ten PR zostaje przy 6.0.3.
- **Rekomendacja:** tak — osobne małe zadanie.

### T9. Słownik: `program` — nie blokuje

**Co widać:** słowo `program` (pojęcie gry) w szablonach the-way znaczy też „program uruchamiany
poleceniem"; definicja `program` używa niezapisanych jeszcze „program rule" i „trip plan".

**Pytanie:** zostawiamy `program` bez zmiany nazwy i dwa pozostałe pojęcia do zadania, które ich
pierwszy raz użyje?

- **Gdy zostawimy:** nic dziś nie kosztuje; ewentualna zmiana nazwy później dotknie uzasadnienia D-03
  nową wersją.
- **Rekomendacja:** zostawić.

### T10. Dwie drobne rozbieżności z tekstem z bramki — nie blokuje

1. W D-02 *Weryfikacja* „invariant:" poprawiono na „invariants:" (inaczej strażnik niezmienników
   odrzucał plik). Pole jest poza zdaniami wiążącymi, odcisk się nie zmienia.
2. Krok fundamentu zauważył, że część cytatów w *Oparta na* D-01 i D-02 mogłaby wymagać osobnych
   wpisów faktów (zasada: cytat, którego zmiana wysłałaby decyzję do przeglądu, staje się faktem),
   a cytaty nie mają formy „§ miejsce — fragment". Strażnik tego nie zgłasza.

**Pytanie:** przyjmujesz poprawkę litery i zostawiasz cytaty, jak zatwierdzono, do czasu aż któreś
zadanie zmieni te decyzje?

- **Gdy zostawimy:** nic nie kosztuje dziś; ryzyko, że zmiana dokumentacji Expressa nie oflaguje
  D-02.
- **Rekomendacja:** tak.

### T11. Propozycja do the-way — nie blokuje tego PR-a (chyba że wybierzesz D w T4)

**Pytanie:** czy the-way ma dostać zasadę, która pozwala głównej gałęzi trzymać w *Relacjach* decyzji
i w *Wywodzi się z* niezmiennika odwołanie `TODO` do wpisu zaprojektowanego w zatwierdzonej
definicji, wyszukiwane i poprawiane wtedy, gdy ten wpis wejdzie do fundamentu?

- **Gdy zostawimy:** każde zadanie korzystające z definicji jako źródła, którego wpis wskazuje
  jeszcze niezapisany wpis zaprojektowany, utknie przed merge'em jak D-01 i D-05 tutaj (albo będzie
  potrzebowało wpisu częściowego jak D-07).
- **Gdy przyjmiesz:** jedna zmiana the-way i ponowne przypięcie; potem takie relacje czekają jawnie.
- **Rekomendacja:** zgłosić do the-way.

### T12. Zatwierdzenie wpisów częściowych i ich późniejszych pełnych wersji — nie blokuje (pytanie 3 panelu)

**Co widać:** D-04/1, D-05/1 i D-07/1 to skrócone wersje decyzji zatwierdzonych na bramce gotowości
2026-10-04. Teraz przyjmujesz je jako nowe propozycje — w polu *Approved by* stanie „Mariusz, <data
przyjęcia>" (poprawka panelu 4: nigdy data bramki). Później zadania kont, zapisu i symulacji dopiszą
pozostałe zdania jako wersje `/2`, w brzmieniu z bramki.

**Pytanie:** jakie *Approved by* mają nieść te wersje `/2` — zapis bramki (Mariusz, 2026-10-04), czy
Twoje nowe przyjęcie w tamtym zadaniu?

- **Zapis bramki:** tak czyta to zasada wnoszenia wpisów zaprojektowanych (pełne brzmienie z bramki
  dostaje datę bramki); koszt: wersja `/2` ma wcześniejszą datę niż `/1`, co wygląda dziwnie
  w historii.
- **Nowe przyjęcie:** daty idą po kolei; koszt: jeszcze jedna akceptacja brzmienia, które już raz
  zatwierdziłeś.
- **Rekomendacja:** zapis bramki — to brzmienie przeszło bramkę, a kolejność dat nie zmienia jego
  treści; ewentualnie zgłosić do the-way, żeby to doprecyzował.
