# Raport etapu fundamentu kont gracza

Status: DONE — wpisy fundamentu gotowe do przeglądu razem z pierwszym fragmentem kodu; zachowanie produktu nie jest jeszcze zaimplementowane.

Commit: `713b60d0aeea9838034ef1458f59aeb2bffb5b7f` — `docs: record player account foundations`.

Repozytorium robocze: `C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie`, branch `task/konta-graczy-i-logowanie`, baza `7012abcfb55b4ba2b2836b574a2275eb1551df28`. Commit obejmuje wyłącznie `foundations/decisions.md`, `foundations/environment_facts.md` i `foundations/invariants.md`: 449 dodanych i 17 usuniętych linii. Nie zmieniałem kodu, testów, konfiguracji wdrożenia, wytycznych, mapy części ani vaultu. Nie uruchamiałem następnego etapu.

## Upoważnienie i metoda

Wykonałem handoff `reports/08-foundation-handoff.md` oraz doprecyzowanie `reports/09-foundation-source-answer.md`, na podstawie pełnego zamrożonego zadania, specyfikacji i tabel Foundation entries/Coverage planu. Czytałem wskazane odpowiedzi projektanta, poprawkę i ponowny przegląd specyfikacji oraz raport planisty. Nie czytałem `cycle.md`.

Pracowałem przez projektowe skille `the-way-make-change`, `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact` i, dla zmiany D-44, `the-way-maintain-styleguide`, wraz z przypiętymi metodami, szablonami i wskazanymi odniesieniami. Gitlink i checkout `.the-way` wskazują identyczne `574a37b9ab9572f876298f4cc10754581222d3f0`.

Przeszukałem fundament przed wpisywaniem, przeczytałem wskazany kontekst decyzji, niezmienników, powiązanych faktów, części i słownika oraz pełne wytyczne coding, testing, coding-http-application, coding-browser-module i styleguide-browser-view. Pełne przypisane wpisy projektowane odczytałem z zatwierdzonej definicji po przeczytaniu rulebooka Obsidiana. Wpisów przydzielonych późniejszym zadaniom nie przejąłem.

## Decyzje i zmiany istniejących wpisów

W poniższej tabeli każdy numer D wskazuje wpis w `foundations/decisions.md`; identyfikatory niezmienników wskazują `foundations/invariants.md`.

| Wiersz planu / ustalenie | Wpis | Znaczenie dla zadania |
|---|---|---|
| F01 / K1 | D-94 | Niezalogowany widzi dwa formularze, a rejestracja, logowanie i przywrócona sesja prowadzą do siedziby dopiero po potwierdzeniu sesji przez serwer. |
| F02 / K2 | D-95 | Wylogowanie z nagłówka kończy wyłącznie sesję tej przeglądarki, po sukcesie usuwa widok i działające mechanizmy gry, a błąd pokazuje ostrzeżenie. |
| F03 / K3 | D-96 | Hasło ma 12–128 punktów kodowych Unicode, pozostaje niezmienione i przy rejestracji musi dokładnie zgadzać się z powtórzeniem. |
| F04 / K4 | D-97 | Email jest normalizowany przez trim i lowercase ECMAScript, unikalny i sprawdzany jedynie jako niepuste strony jednego znaku @. |
| F05 / K5 | D-98 | Duplikat konta i nieudane logowanie pokazują ustalone polskie komunikaty, a logowanie nie rozróżnia nieznanego adresu od złego hasła. |
| F06 / K6 | D-99 | Każda przeglądarka ma niezależną sesję ważną przez 30 dni od ostatniego żądania, odnawianą także przez pliki statyczne i bez odtwarzania usuniętej sesji przez opóźnione touch. |
| F07 / K7 | D-100 | Próby logowania i rejestracje podlegają ustalonym progom email/IP w przesuwających się oknach, z rezerwacją przed pracą asynchroniczną i wspólnym komunikatem ograniczenia. |
| F08 / K8 | D-101 | Liczniki mają ograniczoną pamięć i nie usuwają żywej blokady dla nowego klucza, a wszystkie operacje haseł dzielą ograniczoną pomiarem bramkę bez kolejki. |
| F09 / K9 | D-102 | Zmiany stanu wymagają ciasteczka Strict, dokładnego skonfigurowanego HTTPS Origin i poprawnego JSON do 16 KiB, sprawdzanych przed haszowaniem i mutacją. |
| F10 / K10 | D-103 | Przyszła poczta kont ma limity 30 wiadomości na godzinę łącznie i 3 na adres, bez limitu miesięcznego i bez implementacji poczty w tym zadaniu. |
| F11 / K11 | D-13, zmiana | Sekret sesji ma osobny plik root:1000 0440 i odczyt tylko przez aplikację, a rotacja zachowuje starszy klucz przez co najmniej 30 dni od ostatniego wdrożenia mogącego nim podpisywać. |
| F12 / K12 | D-44, zmiana | Oczekiwanie blokuje przycisk i pola, zmienia napis na ustalony i pokazuje błąd pod formularzem jako warning, wraz ze stanami na stronie kontrolek. |
| F13 / K13 | D-12 i D-16, zmiana | Dotychczasowe zdania o dostępie pozostają identyczne, uzasadnienie opisuje etap przed publicznym użyciem, a osobne pole wiąże przegląd dostępu przed zamknięciem fazy kont. |
| F14 | D-17 i loop2-host-sharing, zmiana | Aplikacja dostaje wyłącznie własny trwały wolumen loop2_accounts i własny odczyt sekretu sesji, bez zmiany innych zasobów hosta ani rozszerzenia uprawnień tunelu. |
| F15 | account-server-default-address, zmiana | Domyślny adres 127.0.0.1:3000 obowiązuje po poprawnej walidacji konfiguracji i zasobów, także przy całkowicie nieskonfigurowanym trybie nieprodukcyjnym. |
| F16, projektowana decyzja o hasłach | D-104 | Hasła obsługuje pakiet argon2 z Argon2id i jawnymi kosztami dobranymi po równoległym pomiarze w docelowym obrazie na Mikrusie. |
| F17, projektowana decyzja o sesjach | D-105 | Sesjami zarządza express-session z własnym Store na node:sqlite, bez produkcyjnego MemoryStore. |
| F18, projektowana decyzja o adresie | D-106 | Gra i serwer kont oraz zapisów mają wspólny publiczny HTTPS origin, a przeglądarka używa względnych ścieżek /api/. |
| F21, autoryzacja | D-107 | Tylko ważna sesja serwerowa uprawnia do własnego konta i sesji, a sukces wymaga ukończonego zapisu lub usunięcia sesji i bezpiecznej odpowiedzi. |
| F21, granica pośrednika | D-108 | W zamkniętej drodze tunelu protokół i kanoniczny adres gracza pochodzą z dokładnie walidowanych nagłówków, bez zaufania do dowolnego łańcucha pośredników. |
| F22, start | D-109 | Produkcja i każda jawna konfiguracja wymagają poprawnych ustawień kont przed nasłuchem, a tryb całkowicie nieskonfigurowany poza produkcją zwraca dla kont JSON 503. |
| F22, baza | D-110 | Jedno połączenie SQLite tworzy schemat wersji 1 transakcyjnie, zachowuje istniejące dane, odrzuca nowszą wersję i bezpiecznie usuwa wygasłe sesje. |

Plan nie zawiera wiersza F19. Nie tworzono zastępczego wpisu. D-104–D-106 zachowują pełne wiążące zdania przypisanych decyzji projektowanych; zapis pól korzysta z bieżącego szablonu decyzji. Dziesięć przypisanych projektowanych niezmienników rozlicza następna tabela. D-07 pozostaje bez zmian; nie zastępuje przyszłej decyzji o dostępie do SQLite. Dla przypisanego account-save-sqlite-access źródłem Derives from jest dokładny zatwierdzony fragment definicji, zamiast przejmowania decyzji przydzielonej późniejszemu zadaniu.

## Niezmienniki, stan faktyczny i obowiązki sprawdzenia

Każdy z 15 nowych wpisów ma **Method: review** oraz **Violated: yes**. Nie ma jeszcze testów ani zachowania, które uzasadniałyby stan spełnienia. Żadnego wcześniejszego naruszenia nie wyczyściłem. Review oznacza tu jawny obecny sposób oceny, a nie obietnicę pozostawienia testowalnych zasad bez automatycznych sprawdzeń.

| Wiersz | Identyfikator | Znaczenie po polsku | Obowiązek dowodowy właściciela kodu |
|---|---|---|---|
| F20a | player-self-registration | Każdy może sam założyć konto i zacząć grać bez zgody operatora. | Etap 5: rzeczywista rejestracja bez zatwierdzenia; etap 8: przejście w przeglądarce. |
| F20b | player-password-login | Konto loguje się adresem email i hasłem. | Etap 5: prawdziwe sprawdzenie hasła i odpowiedzi; etap 8: logowanie i powrót do siedziby. |
| F20c | email-verification-nonblocking | Potwierdzenie adresu nie blokuje gry po rejestracji. | Etap 5: od razu ważna sesja; etap 8: przejście bez potwierdzenia. |
| F20d | player-argon2-password-hash | Serwer zapisuje zakodowany skrót Argon2id i weryfikuje go rzeczywistym pakietem argon2. | Etapy 1/5: rzeczywisty pakiet, zapisany hash i sprawdzenie hasła, jawne parametry. |
| F20e | player-argon2-deployment-check | Wdrożony obraz ma przejść równoległe haszowanie i weryfikację w swoim budżecie pamięci. | Etap 9 przygotowuje pomiar; właściciel wykonuje go na dokładnym wdrożonym obrazie, a lokalny wynik nie usuwa tego naruszenia. |
| F20f | player-opaque-session-cookie | Przeglądarka ma losowy identyfikator w hostowym ciasteczku Secure i HttpOnly. | Etapy 4/5: rzeczywiste nagłówki HTTP; etap 8 i człowiek: zachowanie przeglądarki przez publiczny HTTPS. |
| F20g | player-express-session-sqlite-store | Sesje wdrożonego serwera przechodzą przez własny SQLite Store express-session. | Etapy 2/4/5: prawdziwy Store i middleware; etap 9: obraz i zachowanie sesji. |
| F20h | account-save-durable-storage | Wymiana kontenera zachowuje bazę kont i sesji. | Etap 9: rzeczywista wymiana kontenera i odczyt poprzednich kont/sesji; bez deklaracji zapisu stanu gry. |
| F20i | account-save-sqlite-access | Serwer korzysta z wbudowanego node:sqlite, bez zewnętrznego sterownika. | Etap 2: realny odczyt/zapis tym modułem; etap 9: rzeczywisty obraz. |
| F20j | loop2-shared-public-origin | Gra i żądania kont oraz zapisów używają jednego HTTPS origin i względnych ścieżek API. | Etap 6: rzeczywiste adresy klienta; etap 8: przeglądarka; człowiek: publiczna droga po wdrożeniu. |
| F21 | account-session-authorization | Konto i wylogowanie bez ważnej sesji dostają JSON 401, a ID od klienta nie daje dostępu do cudzej sesji. | Etap 5: tabela uprawnień i bezpośredni test odmowy, widziany raz z porażką; przypadki cudzej tożsamości i sesji. |
| F21 | account-mutation-request-guards | Niepoprawny Origin lub JSON jest odrzucany przed haszowaniem i zmianą danych. | Etapy 4/5: brak/duplikat/lista/obcy Origin, typ i rozmiar body, kompresja i typy pól, z dowodem braku mutacji i pracy haseł. |
| F21 | account-request-transport | Niepoprawne metadane protokołu lub kanonicznego IP są odrzucane przed autoryzacją i haszowaniem. | Etap 4: testy granic oraz spoofingu; człowiek sprawdza rzeczywiste ustawienia i przepływ Cloudflare, których nagłówki syntetyczne nie dowodzą. |
| F22 | account-startup-configuration | Niepełna lub błędna konfiguracja odmawia startu przed nasłuchem i readiness. | Etap 4: osobne rzeczywiste odmowy produkcji/konfiguracji/sekretu i zamknięcie zasobów. |
| F22 | account-schema-lifecycle | Otwarcie zachowuje dane wersji 1 i odrzuca nieznany nowszy schemat. | Etap 2: prawdziwe pliki SQLite, pierwszy start, ponowne otwarcie i odmowa nowszej wersji. |

Dwa zmienione istniejące niezmienniki zachowują **Method: test, Violated: no**: bieżący kod nie ma nowych grantów, a dotychczasowy start mieści się w doprecyzowanym warunku. Nie przedstawiam tego jako ponownie wykonanych testów zachowania. Odpowiadające im istniejące testy wymagają aktualizacji w etapach wskazanych w planie:

- `tests/invariants/test_loop2_host_sharing.py`: etap 3 rozszerza dokładną listę dozwolonych grantów o osobny odczyt sekretu aplikacji i własny trwały wolumen, zachowując zakazy dotyczące innych zasobów oraz prawa tunelu. Etap 9 osobno sprawdza trwałość danych.
- `tests/invariants/test_account_server_default_address.py`: etap 4 zachowuje jeden wyjątek od dynamicznego portu, usuwa odziedziczone cztery ustawienia kont i ustawia nieprodukcyjne środowisko dla startu całkiem nieskonfigurowanego. Osobne przypadki odmowy produkcji nie tworzą drugiego testu portu 3000.
- `tests/invariants/test_account_server_occupied_address.py`: bez zmiany treści niezmiennika i bez nowego wyjątku portu.

Pełne nowe wiążące brzmienie loop2-host-sharing:

> A deployment of loop2 stops, removes, replaces or reconfigures no container, image, network or volume on the host other than loop2's own, and neither loop2 Compose service asks the host for a privilege a default container lacks apart from the connector's read-only tunnel-token grant and the application's read-only session-key grant under D-13 and its own named account-database volume under D-17.

Pełne nowe wiążące brzmienie account-server-default-address:

> After startup configuration and required resources validate under D-109, including wholly unconfigured non-production and fully configured valid startup, the account and save server started with neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT` set either prints its readiness line `Loop: http://127.0.0.1:3000` or exits with a non-zero code and a message naming `127.0.0.1:3000` as an address already in use.

## Fakty źródłowe i pozostawiona weryfikacja

Zgodnie z doprecyzowaniem 09 zapisano siedem minimalnych faktów o opublikowanych kontraktach, w `foundations/environment_facts.md`. Każdy ma wskazane miejsce i dokładny krótki cytat z niezmiennego URL commita oraz datę odczytu. To nie są fakty o zainstalowanych zależnościach produktu ani o Mikrusie.

| Wiersz planu | Fakt i znaczenie | Źródło sprawdzone |
|---|---|---|
| F24a | argon2-password-api: pakiet generuje sól, koduje parametry i weryfikuje zakodowany hash. | argon2 0.45.1, commit `786de7152f95881b0683aea1d2ca60ed0d6d9e2f`, argon2.cjs. |
| F24a | argon2-native-platform: opublikowane wsparcie Node ≥22 i binaria Ubuntu 22.04 x86-64 wskazują dostępność, nie działanie docelowego obrazu. | Ten sam commit, README.md. |
| F24a / D-104 | password-hash-work-factor: OWASP zaleca Argon2id i pomiar kosztu na serwerach aplikacji. | OWASP Password Storage Cheat Sheet, commit `3c07d4aa45a33ffc6a68408621064942358dee61`. |
| F24c | express-session-store-contract: dane sesji są serwerowe, get/set/destroy wymagane, touch zalecane, a MemoryStore nie jest produkcyjny. | express-session 1.19.0, commit `c10b2a383841766899f6dcf53c8aff8c7fd3d2e7`, README.md. |
| F24c / D-13 | session-secret-rotation: pierwszy klucz podpisuje, wszystkie skonfigurowane klucze mogą zweryfikować podpis. | Ten sam commit, index.js. |
| F24b | node-sqlite-database: Node 24.21.0 udostępnia wbudowany, synchroniczny DatabaseSync. | Node commit `955266bfdd854cd280dffd47548673914484e4c0`, doc/api/sqlite.md. |
| D-106 | fetch-same-origin-credentials: Fetch domyślnie dołącza kwalifikujące się poświadczenia w tym samym origin. | MDN commit `fe1d7fb9b67ce826c4a748ce00e7b35ac4a54c7f`, Fetch API / Including credentials. |

Wersje i niezmienne treści sprawdziłem przez opublikowane tagi/commity i pobranie surowych plików. Skrypt kontroli porównał wszystkie cytaty z pobranymi treściami po normalizacji markup i białych znaków. Pełne URL znajdują się bezpośrednio przy faktach. Przejściowy błąd narzędzia web przy otwarciu dokumentacji Node nie został uznany za dowód; odczyt zamrożonego pliku źródłowego powiódł się.

Pozostaje zgodnie z planem:

- F23a w etapie 1: wzorzec i wytyczne haszowania; F23b/F23c w etapie 2: baza i Store; F23d w etapie 5: polityka kont; F23e w etapie 6: klient API. Nie wskazałem nieistniejącego pierwszego pliku jako wzorca.
- F24a–c: właściciele kodu sprawdzają faktycznie wybrane i zainstalowane wersje oraz aktualizują fakty w razie różnicy. Lokalny Node to 24.17.0, a fakt celowo dotyczy odczytanego kontraktu 24.21.0; nie utożsamiać ich. Brak instalacji pakietów lub pomiarów w tym etapie.
- F24d: kontrakt konkretnego Express i Cloudflare sprawdza etap 4. D-108 określa przyjętą granicę projektu; istniejący cloudflare-tunnel-transport nie dowodzi każdego szczegółu nagłówków, transformacji ani aktualnych ustawień dostawcy.
- F25: mapowanie konkretnych nowych plików, zależność klienta od protokołu i własność testów należą do odpowiednich etapów 1–9; tabela odmów i obowiązek myślowego sprawdzenia mutacji do etapu 5; styleguide i strona stanów do etapu 7. Nowej części ani trwałego odstępstwa od sprawdzania mutacji nie dodano.

## Pokrycie wszystkich punktów zadania

| To do | Mapa fundamentu / właściciel pozostałej realizacji |
|---|---|
| 1 | D-94, player-self-registration, email-verification-nonblocking; kod etapów 5 i 8. |
| 2 | D-96–D-98; kod etapów 5 i 8. |
| 3 | D-94; kod etapu 8. |
| 4 | D-94, D-98, D-99, player-password-login; etapy 4–6 i 8. |
| 5 | D-95, D-107; etapy 5 i 8. |
| 6 | D-107 i account-session-authorization; istniejący loop2-api-error-route zachowany bez duplikatu; etapy 4/5. |
| 7 | D-99, D-105, dwa przypisane niezmienniki ciasteczka i Store; etapy 2, 4, 5 i 8. |
| 8 | D-104, dwa niezmienniki Argon2; etapy 1/5/9/10, docelowy pomiar pozostaje niezweryfikowany. |
| 9 | D-17, D-110, account-save-durable-storage i account-save-sqlite-access; etapy 2/3/9. |
| 10 | D-100/D-101; etapy 1/5/8/9. |
| 11 | D-102, account-mutation-request-guards; etapy 4/5. |
| 12 | D-103 — ukończony zapis zasady; wysyłkę wykonują przyszłe zadania 20/21. |
| 13 | D-13, session-secret-rotation, D-109; etapy 3/4/10 i czynności właściciela. |
| 14 | D-108, account-request-transport; F24d i etapy 4/5, potem rzeczywista publiczna droga. |
| 15 | D-44 zmieniony; wytyczne i przykłady etap 7, formularze etap 8. |
| 16 | D-13/D-17/D-109/D-110 stanowią podstawę; skill wdrożenia aktualizuje etap 10. |
| 17 | F23a–e pozostają przy pierwszych plikach etapów 1/2/5/6; istniejące rodzaje HTTP i browser nie dostają zastępczych wzorców. |
| 18 | D-107 oraz niezmienniki odmowy; etap 5 uzupełnia tabelę i pokazuje rzeczywistą porażkę testu odmowy. |

Już obowiązujące zasady zachowano: nieznana trasa API nadal ma błąd API, pojedynczy proces serwujący i dotychczasowe granice części pozostają, tunel D-10/D-13/D-15/D-17 nie jest cofnięty do starego kontekstu zadania, a uprawnienia D-12/D-16 nie są poszerzone. Nie powstały nowe wpisy o polityce utraty niezapisanej gry, blokadzie konta, kasowaniu kont, potwierdzaniu email, resetowaniu haseł, migracji zapisów gry ani o całości przyszłej polityki kopii bazy.

## Wykonane kontrole

| Polecenie / kontrola | Exit code | Wynik |
|---|---|---|
| `git -C .the-way rev-parse HEAD` oraz `git ls-files --stage -- .the-way` | 0 dla odczytów | Identyczny przypięty commit procesu. |
| `python -B .runs/foundation-check-draft.py` | 0 | Porównanie wiążących akapitów dostępu D-12/D-16 z bazą bez zmiany; wszystkie cytaty siedmiu faktów trafiają w źródła; 17 nowych decyzji i 15 nowych review/violated; brak zastępczych TODO. Skrypt roboczy zawiera też wykonaną korektę wpisu, nie jest testem zachowania produktu ani skryptem do ponownego uruchamiania. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`, wykonane po zapisaniu i ponownie po końcowych korektach. |
| `git diff --check` | 0 | Końcowy diff czysty; wcześniejsze ostrzeżenie o dodatkowej pustej linii na końcu zostało usunięte przed tym wynikiem. |
| `git add foundations/decisions.md foundations/environment_facts.md foundations/invariants.md` | 0 | Dodano wyłącznie trzy jawnie wskazane pliki. |
| `git commit -m "docs: record player account foundations"` | 0 | Commit wskazany na początku raportu. |
| `git status --short` po commicie | 0 | Puste wyjście, śledzone drzewo czyste. |
| `git log -1 --format='%H %ae'` | 0 | Właściwy commit i prywatna tożsamość autora. |

Nie uruchamiałem `npm test` ani testów produktu: handoff przewiduje dla samego zapisu przed kodem kontrolę fundamentu, bez udawania dowodu przyszłego zachowania. Wyniki bazowe Windows/Linux dostarczone przez orkiestratora nie są moimi wynikami. Nie przeprowadzałem dostępu do serwera, wdrożenia, pomiaru Mikrusa, rotacji sekretu ani publicznej próby w przeglądarce.

## Zasięg, pytania i rzeczy pozostające do sprawdzenia

Bezpośredni zapis obejmuje część product-foundation; wpisy sięgają account-server, browser-view, build-tools i deployment. Czytałem rzeczywiste app/main/Compose i wskazane testy istniejących zasad, żeby sprawdzić stan długu oraz zakres poprawek; nie nadawałem takim odczytom statusu testów. Dotknięcie granicy zaufania jest świadome: odmowy i konfiguracja mają własne niezmienniki, ale żaden nagłówek ani źródło nie zostały uznane za wynik wdrożenia.

Pytania blokujące: brak. Doprecyzowanie 09 rozwiązało zależność od źródeł przed instalacją; nie pozostał niemożliwy do ustalenia kontrakt potrzebny do samego zapisu.

Pozostają jawne kwestie do kolejnych etapów:

1. Wszystkie 15 nowych zasad zachowania pozostaje naruszonych do czasu rzeczywistej realizacji i dowodu; docelowej próby Argon2 nie wolno wyczyścić lokalnym wynikiem ani samą obecnością testu.
2. D-44 już opisuje przyjęty stan oczekiwania, natomiast obecny styleguide ma dawny zapis o braku takiego stanu; plan świadomie przypisuje usunięcie tej przejściowej rozbieżności etapowi 7 razem z kontrolkami i przykładami. Nie jest to gotowy interfejs.
3. D-12/D-16 mają jawny wiążący powrót do przeglądu dostępu przed zamknięciem fazy kont. Bieżące uprawnienia i ręczne czynności właściciela pozostają bez zmian.
4. F24d i rzeczywiste ustawienia Cloudflare wymagają sprawdzenia w etapie 4 oraz na publicznej drodze. Opisane odmowy są wymaganiem projektu, nie stwierdzeniem o aktualnej konfiguracji dostawcy.
5. Lokalnie odczytana dokumentacja nie dowodzi wybranych wersji w lockfile, ich dostępności w obrazie ani kosztu pamięci. Odpowiedni etap sprawdza i w razie potrzeby aktualizuje fakt.
6. Istniejąca luka w narzędziu mutacji i przyjęciu części pozostaje widoczna; etap 5 realizuje wskazaną korektę obowiązku myślowego, bez nowego narzędzia i bez stałego zwolnienia.

Etap kończy się na fundamencie i raporcie; nie wysłałem następnego zadania ani nie rozpocząłem kodu.
