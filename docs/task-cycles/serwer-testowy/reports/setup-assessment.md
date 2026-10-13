# Niezależna ocena zmian fundamentu

Oceniony commit: `252665d4b2db34ea5a37dafad682821ea5a5dcab`. Zakres: diff od `1dcc5cdef49fa80a6b9057ea2152677ab13db7c1`, sześć nowych obserwacji środowiska i zmienione odwołania oraz uzasadnienia decyzji. Nie czytałem kroniki zadania, specyfikacji, planu, zamrożonego zadania ani raportów autora. Nie zmieniałem produktu, indeksu, HEAD ani serwera.

**Werdykt: rewrite — zachować obserwacje, ale ograniczyć to, co trafia do fundamentu i poprawić zakres deklarowanego dowodu.** Dwie uwagi dotyczą treści wiedzy, jedna precyzji źródła. Brak blokera bezpieczeństwa lub stwierdzonej sprzeczności między kodem a obserwowanym stanem serwera. Ostateczne rozstrzygnięcie uwag należy do autora i człowieka.

## Warto poprawić

### 1. Wynik wdrożenia staje się przesłanką decyzji architektonicznej

**Severity:** P2. **Nowy wątek.**

**Kotwica:** `C:/Storage/repos/loop2-serwer-testowy/foundations/environment_facts.md:35` (również :61 i :75; odwołania w `foundations/decisions.md:270` i :452).

**Do wklejenia:** Czy wynik publicznego zapytania i odczyt 512 MiB możemy zostawić jako dowody sprawdzenia wdrożenia, zamiast uzależniać od nich D-10 i D-17? Awaria odpowiedzi albo inny limit kontenera oznaczają potrzebę sprawdzenia lub naprawienia wdrożenia, a nie same w sobie potrzebę zmiany sposobu publikacji czy zasady ograniczania pamięci; podobnie chwilowe `healthy` nie uzasadnia wyboru Dockera.

**Dlaczego to zgłaszam:** Pole Based on służy wskazaniu przesłanek, których utrata wysyła decyzję do ponownego rozpatrzenia. WAY-90 i sekcja „Which facts are written” szablonu rozróżniają taką przesłankę od wyniku sprawdzenia. D-10 wybiera adres, proxy, IPv6 i warunkowo HTTP do źródła; pojedynczy 404 z nagłówkami Cloudflare dowodzi dostępności konkretnej odpowiedzi, a nie żadnego z trzech prywatnych ustawień. Gdy ten sam adres przez chwilę odpowie 522, wybór D-10 nadal może być właściwy. D-17 wymaga limitu pamięci, ale nie ustala 536870912; tę wartość deklaruje `compose.yaml:12` jako `mem_limit: 512m`. Przykładowo uzasadnione podniesienie limitu do 768 MiB nie obala decyzji, że limit ma istnieć. Odczyt HostConfig to dobry dowód realizacji konfiguracji, słaby powód utrzymywania osobnej zależności decyzji od konkretnej liczby.

Podobnie informacja, że inne aplikacje działają w Dockerze, uzasadnia D-14 i współdzielenie hosta w D-17; ich bieżące `healthy` tego uzasadnienia nie zmienia. Pozostawienie całego zestawu zwiększa liczbę nieustalonych metod i zmian fingerprintów przy zwykłych zmianach stanu. Tańsza korekta: usunąć dwa nowe wpisy `loop2-public-cloudflare-route` i `loop2-host-memory-limit` wraz z odwołaniami, zachować pomiary w dowodach wdrożenia, a zdanie o pozostałych kontenerach pozbawić `healthy`. Wpisy jeszcze nie trafiły do main, więc nie wymagają wycofanych identyfikatorów. Po zmianie zdania o kontenerach trzeba przeliczyć jego fingerprint i oba odwołania. Wpisy o zewnętrznym ustawieniu authorized_keys i prawach zainstalowanego pliku pozostają zasadne na mocy jawnej reguły o ustawieniach zmienianych poza repozytorium; brak swap pozostaje przesłanką oceny ryzyka współdzielenia pamięci.

Nie mierzyłem częstości awarii ani zmian limitu i nie twierdzę, że występowały. To konkretne rozróżnienie skutku zmiany informacji, nie szacunek historii awarii.

### 2. Uzasadnienia zawierają stan wykonania jednego sprawdzenia

**Severity:** P2. **Nowy wątek.**

**Kotwica:** `C:/Storage/repos/loop2-serwer-testowy/foundations/decisions.md:435` (również :285–289 i :468–469).

**Do wklejenia:** Zdania o tym, czego jeszcze nie odczytano lub nie uruchomiono, opisują zakres obecnego sprawdzenia i zdezaktualizują się po następnym teście. Przenieśmy je do raportu weryfikacji, a w uzasadnieniach zostawmy trwałe ograniczenia dowodu: sam wpis klucza nie potwierdza działania całej ścieżki SSH, odpowiedź Cloudflare nie ujawnia konfiguracji źródła, a HostConfig nie jest odczytem egzekwowanego limitu cgroup.

**Dlaczego to zgłaszam:** Uzasadnienia mają pomagać w przyszłych wyborach. Zdanie „Actions runner, which has not run” przestanie być prawdziwe, gdy automatyzacja ruszy, chociaż mechanizm ani wybór D-16 nie zmienią się. Tak samo „their private configuration has not been read independently” i „no independent cgroup reading establishes its enforcement” relacjonują zakres tej sesji. Zgodnie z regułą wiedzy użytkownika i szablonem decyzji uzasadnienie nie powinno być kroniką sprawdzania. Pozostawienie tych zdań oznacza późniejszą aktualizację dziennika decyzji tylko po to, aby usunąć nieaktualny status testu; po merge wymagałoby to nowej wersji decyzji. Koszt korekty teraz jest mały: usunięcie relacji z wykonania oraz ewentualne zastąpienie jej trwałymi zdaniami o granicach dowodu. Cenne rozróżnienia nie powinny zniknąć z raportu wdrożenia. Nie proponuję uznać niewykonanych testów za wykonane.

## Drobna korekta źródła

### 3. Komenda źródłowa potwierdza typ deklarowany w nagłówku, nie zawartość JSON

**Severity:** P3. **Nowy wątek.**

**Kotwica:** `C:/Storage/repos/loop2-serwer-testowy/foundations/environment_facts.md:37` (źródło w :40; mocniejsze powtórzenie w `foundations/decisions.md:285`).

**Do wklejenia:** Cytowany curl wyrzuca ciało odpowiedzi do NUL, więc potwierdza 404 i `Content-Type: application/json`, lecz nie treść JSON ani tożsamość błędu API. Zawęźmy opis do tych nagłówków albo wskażmy odczyt i sprawdzenie ciała odpowiedzi.

**Dlaczego to zgłaszam:** Uruchomiłem podaną komendę niezależnie: zwraca 404, `Content-Type: application/json; charset=utf-8`, `Server: cloudflare` i `cf-cache-status: DYNAMIC`. Nie pokazuje ciała. Kod `src/server/app.ts` rzeczywiście tworzy `{ error: 'Not found' }`, ale sam kod ocenionego commita nie dowodzi, że to on odpowiada na publiczny adres. Przykładowo ciało HTML pod błędnym nagłówkiem application/json dałoby ten sam dostępny dowód. Nie stwierdzam takiej awarii; uwaga dotyczy ścisłości zapisanej relacji źródło–twierdzenie. Jeśli uwaga 1 zostanie przyjęta, korekta dotyczy tylko zachowanego raportu obserwacji i nie wymaga dodatkowego wpisu fundamentu.

## Bez zastrzeżeń w sprawdzonym zakresie

- Pinned the-way: gitlink i HEAD submodułu mają `d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b`.
- Wersje i fingerprinty: oba format guardy przeszły z bazą i merge-onto `170118680abec6760291df5d13f908c58409f867`, ustalonymi z origin/main i merge-base. Każdy nowy fakt ma wersję 1, każdy ma dependanta, odwołania do faktów są aktualne. Edytowane decyzje nie istnieją na tej bazie main, więc ich edycja w miejscu jest dozwolona; wiążące zdania nie zmieniają się w ocenianym diffie.
- Niezależny odczyt przez mikrus MCP potwierdził dokładnie jeden wpis o wymaganym prefiksie (bez wypisywania kluczy), `755 root:root` dla zainstalowanego polecenia, kontenery loop i foundryvtt jako healthy, SwapTotal równe 0 kB oraz HostConfig.Memory równe 536870912 dla loop2. Potwierdził też deklarowane wersje Docker, Python, coreutils i jądra. Odczyty nie zmieniły serwera.
- Powiązanie D-14 i D-17 z istnieniem innych kontenerów, D-17 z brakiem swap oraz D-16 z ustawieniem wymuszonego polecenia i prawami pliku jest zrozumiałe. Nie znalazłem brakującej zależności wymaganej w niezmienionych invariantach: ich metody sprawdzają kod repozytorium, a nie stan tych kontenerów. Test host-sharing jawnie wyklucza dowodzenie stanu serwera.
- Nie stwierdziłem sprzeczności między odczytanym limitem a Compose, ani między zewnętrznymi ustawieniami i deklarowanym sposobem instalowania polecenia. Zastrzeżenie, że odpowiedź publiczna nie dowodzi AAAA, portu źródła czy trybu szyfrowania, jest merytorycznie trafne.
- `Method: TODO` jest dozwolone i znaczy unchecked. Wynik format guardów nie jest zaliczeniem sześciu metod faktów.

## Wykonane sprawdzenia i ograniczenia

Przeczytałem całe zmienione pliki fundamentu, pozostały fundament, szablony i wspólne reguły przypiętego procesu, WAY-90, skrypt wdrożeniowy, Compose, workflow, kod odpowiedzi API i test host-sharing. Sprawdziłem historię wprowadzenia wpisów oraz diff. Format guard environment-facts: 0 błędów, 0 ostrzeżeń, 0 unchecked formatu. Format guard decisions: ten sam wynik. `git diff --check` bez uwag. Nie uruchamiałem testów produktu: zmiana jest wyłącznie dokumentacyjna i ocena nie zmienia kodu.

Nie czytałem prywatnej konfiguracji Cloudflare, GitHub secrets, materiału kluczy, treści zainstalowanego polecenia ani jego zgodności bajtowej z repozytorium. Nie testowałem logowania kluczem automatyzacji, egzekwowania pamięci przez cgroup, zewnętrznej łączności IPv6 ani ciała publicznej odpowiedzi. Odczyt stat potwierdza prawa i właściciela, nie treść programu. Odczyt jednego prefiksu authorized_keys nie dowodzi, że jest to klucz używany przez GitHub Actions. Ocena nie orzeka w tych sprawach sukcesu ani awarii. Raport nie zawiera wartości dostępowych serwera ani materiału kluczy.
