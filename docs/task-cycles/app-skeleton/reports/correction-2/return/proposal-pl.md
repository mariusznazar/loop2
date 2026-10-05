# NIEZATWIERDZONE — propozycja kroku powrotu (poprawka 2, task/app-skeleton)

Nic tu nie jest zatwierdzone. Łatka: `UNAPPROVED-proposed-foundation-against-031b0a6.patch`
w tym katalogu (względem commita `031b0a6`). Tłumaczenie stoi obok wpisu i nie trafia do
fundamentu (WAY-114).

Krok powrotu to sprawdzenie na końcu zadania, czy kod i decyzje podjęte po drodze nie wnoszą
czegoś, co powinno trafić do fundamentu produktu (`foundations/`), czyli do zapisanych reguł,
decyzji i mapy części.

## Wynik w skrócie

- Ponownie napisany serwer nie spełnia żadnego nowego wpisu z definicji MVP. Nic nie wraca do
  kroku fundamentu.
- Serwer zachowuje się inaczej w dwóch miejscach, ale na żadne z nich nie ma reguły. Brak pliku
  poza `/api/` zwraca teraz standardową stronę 404 Expressa (HTML „Cannot GET …”) zamiast
  zwykłego tekstu „Not found”. Na to pozwoliłeś w T6.2. Przy zajętym porcie komunikat brzmi
  inaczej, ale proces dalej kończy się kodem 1 i nie wypisuje linii gotowości.
- Jedna propozycja zmiany fundamentu (R2-1) i cztery pytania (R2-2…R2-5).

## R2-1 — zdanie części product-foundation w mapie części

Mapa części to plik `foundations/part_map.md`. Dzieli repozytorium na części, a każda część ma
jedno zdanie o tym, za co odpowiada.

**Wpis po zmianie (cały, tak jak będzie wyglądał):**

```
## product-foundation

The part holds the product's foundation.

- **Files:** foundations/**
- **Depends on:** none
- **Failure modes:** none
- **Trust boundary:** none
```

> **Tłumaczenie:** *product-foundation* — Część przechowuje fundament produktu. Pliki:
> `foundations/**`. Zależy od: nic. Tryby awarii: brak. Granica zaufania: brak.

**Dziś (przyjęte przez Ciebie w T1a):** „The part holds the product rules and the map of its
responsibilities.” („Część przechowuje reguły produktu i mapę jego odpowiedzialności.”)

**Co z tego wynika:** the-way ma w słowniku dwa terminy na te rzeczy: *foundation* (fundament,
czyli zapisane reguły produktu) i *part map* (mapa części, która jest elementem fundamentu).
Reguła the-way (WAY-97) każe użyć terminu, a nie opisywać go własnymi słowami, żeby wyszukanie
użyć terminu znajdowało każde zdanie. Obecne zdanie mówi to samo opisowo. Żaden skrypt
sprawdzający format tego nie wyłapuje.

- **Gdy zostawimy:** pierwsze zdanie części, jakie trafi do main, łamie regułę the-way.
  Wyszukanie użyć słowa „foundation” go nie znajdzie. Poza tym nic się nie psuje.
- **Gdy przyjmiesz:** zmienia się jedno zdanie i nic, co na nim stoi (żaden wpis go nie cytuje).
  Skrypt sprawdzający mapę części przechodzi na łatce: 0 błędów, 1 „niesprawdzone” (zależności
  części, jak dziś).
- **Rekomendacja:** przyjąć przed mergem.

## R2-2 — D-06 bez sprawdzenia pierwszego zdania

**Materiał:** D-06 „How are the browser and server built together?” ma dwa zdania wiążące.
Pierwsze: „The browser and server share one npm package and lockfile, and have separate
TypeScript compilation configurations and output directories.” Drugie: „Building the application
compiles both configurations.” Przyjąłeś D-06 z *Weryfikacją*, która wymieniała dwa niezmienniki:
application-build-layout i application-build-output. Layout odłożyłeś na później. Zapisana
*Weryfikacja* wymienia więc tylko application-build-output, bo skrypt sprawdzający odrzuca nazwę
niezmiennika, którego nie ma.

**Co z tego wynika:** nic nie sprawdza, że jest jeden `package.json` i jeden plik blokady wersji
(`package-lock.json`). Rozdzielenie konfiguracji i katalogów wynikowych sprawdza przy okazji test
application-build-output, bo ma ich nazwy wpisane na sztywno.

**Pytanie:** przyjmujesz *Weryfikację* D-06 w tej postaci, do czasu dopisania application-build-layout?

- **Gdy tak:** drugi pakiet albo drugi plik blokady przejdzie wszystkie testy. Wyłapie go tylko
  recenzent, który przeczyta D-06.
- **Gdy nie:** dopisujemy do D-06 parę przykładów do oceny przez agenta (poziom 2). To jedna runda
  pisania i przeglądu.
- **Rekomendacja:** tak. Layout i tak jest Twoją późniejszą pracą.

## R2-3 — test wersji Node: wyciąć nieużywany kod czy zostawić

**Materiał:** w T7 napisałeś „przyjmuję założenia wpisane w testy”. Pytanie 2 z T7 brzmiało:
test `test_account_server_runtime.py` ma około 120 linii czytania plików wdrożenia, które dziś nic
nie sprawdzają i mają znaną dziurę. Wyciąć? Rekomendacja brzmiała: wyciąć. Odczytaliśmy Twoją
odpowiedź jako „zostawić bez zmian” i niczego nie wycięliśmy.

**Pytanie:** zostawić czy wyciąć?

- **Gdy zostawimy:** do main trafi kod testu, który dziś nic nie robi. Kiedyś może przepuścić
  wdrożenie z inną wersją Node, ale dopiero gdy zadanie wdrożenia poluzuje pułapkę, która dziś
  zatrzymuje każdy plik wdrożenia.
- **Gdy wytniemy:** zmienia się test niezmiennika, więc potrzebny jest osobny agent, celowe
  złamanie i przegląd. To jeszcze jedna runda.
- **Rekomendacja:** jak w poprawce 1: wyciąć, zostawiając pułapkę. Nie blokuje merge'a. Gdy wolisz
  „zostawić”, wystarczy to potwierdzić.

## R2-4 — założenia wpisane w dwa nowe testy

Testy niezmienników są przy kolejnych zadaniach tylko do odczytu. Wszystko, co w nich wpisano,
wiąże więc dalsze zadania. Twoja zgoda z T7 dotyczyła testów z poprawki 1, a tych dwóch testów
wtedy jeszcze nie było.

| Założenie | Co się stanie później |
|---|---|
| (a) „serwer podaje zbudowaną grę” znaczy: każdy plik, który budowanie kładzie do `dist/public`, jest podawany bajt w bajt pod swoją ścieżką, a `/` zwraca jeden z jego plików HTML | jeśli budowanie zacznie kłaść do `dist/public` pliki, których nie chcemy podawać (np. mapy źródeł), test padnie i zadanie wróci do kroku fundamentu |
| (b) „jeden proces”: z procesów uruchomionych przez `npm start` dokładnie jeden nasłuchuje na porcie 3000, żaden nie nasłuchuje na innym porcie, a serwer nie uruchamia żadnego własnego procesu | serwer, który kiedyś uruchomi proces pomocniczy (np. kopię zapasową bazy albo migrację), nie przejdzie testu |
| (c) test budowania ma na sztywno nazwy `tsconfig.browser.json`, `src/browser`, `dist/public` oraz `tsconfig.server.json`, `src/server`, `dist/server` | zmiana którejkolwiek nazwy wywali test |
| (d) od commita `031b0a6` nieudane budowanie musi wypisać komunikat TypeScriptu `Cannot find name '…'` | jeśli TypeScript 7.x (osobne zadanie z T8) zmieni treść komunikatu, test padnie głośno |
| (e) na Linuksie i macOS test jednego procesu czyta listę procesów przez `ps` i `lsof`, a ta ścieżka nigdy nie była uruchomiona | pierwsze uruchomienie poza Windows (np. w CI) może paść, a poprawka to zmiana testu niezmiennika |

**Pytanie:** przyjmujesz te założenia?

- **Gdy tak:** każde z nich, jeśli kiedyś przestanie pasować, da głośny błąd testu. Żadne nie
  przepuści błędu po cichu.
- **Gdy nie przy którymś:** ten test wraca do autora testu, potem celowe złamanie i przegląd. To
  jedna runda na każdy zmieniony test.
- **Rekomendacja:** przyjąć wszystkie.

## R2-5 — przypisanie dwóch nowych plików testów do części

**Materiał:** w T5 była tylko informacja, że plik testu trzeba przypisać do jakiejś części mapy.
Zapisaliśmy:

- `tests/invariants/test_loop2_one_serving_process.py` → część account-server (serwer kont
  i zapisów),
- `tests/invariants/test_application_build_output.py` → część build-tools (instalacja,
  sprawdzanie typów, budowanie).

Zgodnie z regułą the-way (WAY-44) test należy do części, którą sprawdza. Nie pokazaliśmy Ci tego
przed zapisem.

**Pytanie:** potwierdzasz to przypisanie?

- **Gdy potwierdzisz:** nic się nie zmienia.
- **Gdy nie:** przenosimy plik do innej części. Zmienia to tylko to, której części zmiana
  „dotyka” tego pliku, i jest tanie.
- **Rekomendacja:** potwierdzić.

## Odłożone przez Ciebie (nie są propozycjami tego PR-a)

application-build-layout, public-file-boundary, account-server-occupied-address. Nie ma ich
w fundamencie ani w łatce. Żadna notatka w backlogu ich nie trzyma (szukałem w folderze projektu
Loop), więc dziś żyją tylko w commicie zapisu przebiegu `5928e7b`. Warto założyć na nie jedno
zadanie. Do tego czasu pilnują ich:

- **układ budowania:** zdanie D-06 (bez testu, patrz R2-2) i przy okazji test application-build-output;
- **katalog plików publicznych:** zwykły test `tests/http.test.mjs` (inny katalog roboczy, próby
  wyjścia poza katalog) i przegląd zmian w `src/server/**` jako granicy zaufania;
- **zajęty port:** tylko zwykły test `tests/startup.test.mjs`. Ponowne napisanie serwera zmieniło
  treść komunikatu i nic poza tym testem tego nie pilnowało. Dokładnie taki koszt odłożenia
  przyjąłeś.
