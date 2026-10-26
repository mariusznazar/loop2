PASS f9b76ff703f09079fbddf86d3e40582484a06a01

## Zakres i wynik

Niezależny pierwszy przegląd całej zmiany: `9a5f3605f73da87fc5c87089c8166d2658c0add6..f9b76ff703f09079fbddf86d3e40582484a06a01`, w worktree `C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki`. Oceniono fundament oraz wszystkie osiem części bez wcześniejszego osobnego review. Nie zmieniono kodu produktu, testów ani fundamentu; nie czytano cycle.md. Brak uwag blokujących. Dwie uwagi Minor są poza zakresem zadania; liczniki kategorii nakładają się: blocking 0, Minor 2, out-of-scope 2.

PASS oznacza brak blokującego znaleziska w przeglądanym zakresie, nie zaliczenie całego `npm test`. Ostatnia udokumentowana bramka ma exit 1 i niezweryfikowaną klasę testu liczby procesów serwera, jak opisano niżej.

## Critical / Important

Brak.

## Minor — poza zakresem

### M1. Instrukcja wyglądu strony nadal opisuje wcześniejszy ekran wysyłania

**Kotwica:** [README.md:50](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/README.md#L50). Nowy wątek. Minor, poza zakresem; nie pochodzi z żadnej części tej zmiany — w diffie zmieniono opis Programu i stanu początkowego, nie te akapity.

**Do wklejenia:** Opis wysyłania nadal sugeruje gotowego maga z przyciskiem Wyślij, podczas gdy nowa gra pokazuje pustą drużynę i wymaga utworzenia postaci. Sąsiedni opis widoku przejścia pomija istniejący wiersz ciała i plecaka, śmierć oraz ogniska. W osobnym uaktualnieniu README warto opisać obecny przebieg od utworzenia postaci do przejścia mapy.

**Dlaczego to zgłaszam:** Sekcja służy człowiekowi jako instrukcja pierwszego uruchomienia. [headquarters.ts:70](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/src/browser/view/headquarters.ts#L70) buduje drużynę, formularz tworzenia i skrzynkę; [app.ts:98](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/src/browser/view/app.ts#L98) włącza wiersz ciała w panel przejścia. W obejrzanych zrzutach rzeczywistej aplikacji po Zakończ widać siedzibę z drużyną i skrzynką, a podczas przejścia ciało i plecak. Czytelnik wykonujący instrukcję na świeżej stronie nie zastaje opisanej gotowej postaci. Korekta dokumentacji usuwa tę rozbieżność; pozostawienie nie psuje gry, lecz utrudnia pierwsze uruchomienie. Nie rozszerzam zadania grup i liczników o odtwarzanie całej instrukcji innych funkcji.

### M2. README podaje zawężone polecenie testów sprzeczne z przyjętą zasadą

**Kotwica:** [README.md:73](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/README.md#L73). Nowy wątek. Minor, poza zakresem; linia istnieje na bazie i nie jest zmieniona przez żaden z ośmiu etapów.

**Do wklejenia:** Przykład `python -B .the-way/gate/run_tests.py tests/deploy` zaleca wybór jednego katalogu, chociaż D-77 i przewodnik testów wymagają pełnego `npm test` bez zawężania. W osobnej korekcie dokumentacji usuń ten przykład albo zastąp go właściwym poleceniem.

**Dlaczego to zgłaszam:** Przykład ma pomagać w lokalnej weryfikacji, ale czytelnik kierujący się nim pomija pozostałe testy i fundament. [decisions.md:1413](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/foundations/decisions.md#L1413) oraz [testing.md:237](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/guidelines/testing.md#L237) jednoznacznie ustanawiają pełne polecenie. To rozbieżność instrukcji, nie dowód, że autor tej zmiany ominął testy: końcowy log potwierdza wykonanie całej komendy do błędu Pythona. Usunięcie przykładu zapobiega przyszłemu użyciu niepełnej weryfikacji; pozostawienie nie zmienia działania bieżącego kodu.

## Declined to judge

Brak dodatkowych pozycji. Dwie kwestie poza zadaniem są jawnie ocenione powyżej i policzone raz każda. Nierozpoznana przyczyna błędu narzędzia Windows jest ograniczeniem weryfikacji, nie ustalonym defektem produktu ani twierdzeniem o jego nieszkodliwości.

## Ocena wymagań i części zmiany

Punktem odniesienia był cały [zamrożony task.md](../task.md), aktualny [plan.md](../plan.md), pełne raporty wykonawców i samodzielnie policzony diff całego zakresu. Nie powstał osobny spec. Ocena nie przejmuje klasyfikacji autorów.

- Fundament w części 1: zmieniony wybór grup w D-23, D-90–D-93, słownik, niezmiennik wyboru reguły i mapa części są zgodne z zamrożonym zadaniem oraz kodem. Ustalenie przyszłego zliczania na początku walki zapisano jako znaczenie; zmiana nie dopisuje niezamówionego mechanizmu walki. Identyfikatory grup i reguł są metadanymi programu, nie identyfikatorami świata.
- Części 1–3 (`2dfc91f`, `98c629f`, `65ad040`): przeczytano wszystkie migracje danych wejściowych Node/view i sterowników Python. Pomocnicze funkcje opakowują dane, nie wybierają oczekiwanej reguły ani nie obliczają liczników. Istotne oczekiwania akcji, świata, czasu, ciała i rysowania pozostają zapisane niezależnie. Zmiana jednego porównania całej listy zdarzeń w flow na pola nie usuwa ochrony seed zdarzenia: jawne porównania tego pola zostają przy restarcie i kolejnym wysłaniu w tym samym pliku.
- Część 4 (`e8ab9cd`): sprawdzono helper Python, migracje i zmienione czytniki niezmienników. Własne numery grup/reguł i dowolne nazwy grup są wyłączone z odczytu odwołań do świata tylko we właściwych miejscach struktury. Warunki i akcje oraz nieoczekiwane kontenery nadal są przeszukiwane. Ręcznie zapisane kontrole negatywne obejmują m.in. `id` akcji, liczby w zasobie, zagnieżdżoną grupę i udawany warunek. Czytniki wyboru i wykonalności nadal sprawdzają treść akcji, nie samą tożsamość.
- Część 5 (`3399e5c`): helper Activity kopiuje dostarczoną akcję i tożsamość; nie przenosi do testu algorytmu wyboru. Wszystkie cztery migracje ręcznie budowanych wejść zachowują swoje oczekiwania.
- Część 6 (`eac97b8`): walidacja odrzuca błędne tożsamości, powtórzenia reguł między grupami, zagnieżdżenia i liczniki następnego ID niedominujące nad istniejącymi ID. Tworzy kanoniczną kopię programu i stosuje ten sam zamknięty zbiór warunków do grupy i reguły. Wybór przechodzi grupy i reguły we właściwej kolejności, pomijając niespełnione, puste i niewykonalne. Kopia akcji w już rozpoczętej aktywności odcina wykonanie od późniejszej edycji, usunięcia i przeniesienia reguły. Testy mają niezależnie zadane, także niekolejne identyfikatory oraz kontrolę błędnego porządku.
- Część 7 (`c32384`): liczniki są nieobecne przed pierwszym przejściem. Zerowanie poprzedza wybór w minucie zero, a naliczanie bierze tylko `activityStarted` reguły. Zakończenie, oczekiwanie, upływ minut i śmierć same nie dodają uruchomień. Edycja własnego kanonicznego warunku/akcji zeruje regułę; przestawienie, transfer i edycja grupy zachowują tożsamość oraz licznik. Nowa reguła dostaje zero, usunięta wypada. Zakończ i śmierć zachowują wynik. `app.ts` rozróżnia zmianę programu/mapy i aktualizację samych liczników; metoda tej drugiej dotyka wyłącznie spanów, zachowując częściowy tekst i fokus. Osobne testy chronią bieg dzielony/łączny, usuniętą i zmienioną aktywną regułę.
- Część 8 (`f9b76ff`): dodawanie, nazwa i warunek grupy, strzałki, usunięcie z zawartością, dodanie domyślnej reguły oraz pusty cały program odpowiadają zadaniu. Numer grupy bierze się z monotonicznego ID, nie nazwy ani aktualnej długości. Przeniesienie rozwiązuje położenie celu po usunięciu źródła; upuszczenie na regułę zatrzymuje propagację do grupy, a pusty cel dopisuje na koniec. Kontrole tożsamości przeciągania i niezmienności wejścia mają testy. Po zmianach struktury jawne cele przywracają fokus. Warunki grup i reguł korzystają z jednego składu istniejących kontrolek. CSS używa istniejących ról i tokenów. Instrukcja Programu opisuje nowe zachowanie.

Sprawdzono także niezmienione wywołania `newMapRun`, `stepMinute` i renderowanie aplikacji, aby ocenić naliczanie oraz akcję w toku w rzeczywistym przepływie. Żaden fragment zmiany nie dodaje sieciowej granicy zaufania, kluczy, odczytu obcych plików ani zewnętrznej operacji nieodwracalnej. Usunięcie grupy jest wymaganym zachowaniem stanu gry w pamięci strony.

## Zmienione testy niezmienników

Przeczytano diff każdego poniższego testu. Ich migracja wejść jest częścią review, a nie automatycznym uznaniem poprzedniej ochrony za zachowaną:

- [test_action_in_progress.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_action_in_progress.py)
- [test_character_team.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_character_team.py)
- [test_exploring_reveal.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_exploring_reveal.py)
- [test_map_run_layout.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_map_run_layout.py)
- [test_map_run_repeatability.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_map_run_repeatability.py)
- [test_map_run_tiles.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_map_run_tiles.py)
- [test_minute_span_split.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_minute_span_split.py)
- [test_move_reach.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_move_reach.py)
- [test_player_map_run_pace.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_player_map_run_pace.py)
- [test_program_closed_lists.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_program_closed_lists.py)
- [test_program_rule_pick.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_program_rule_pick.py)
- [test_program_world_reference.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_program_world_reference.py)
- [test_restart_seed.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_restart_seed.py)
- [test_simulation_inputs.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_simulation_inputs.py)
- [test_simulation_isolation.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_simulation_isolation.py)
- [test_simulation_randomness.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_simulation_randomness.py)
- [test_terrain_drawing_numbers.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_terrain_drawing_numbers.py)
- [test_walk_feasibility.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_walk_feasibility.py)
- [test_walk_target.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_walk_target.py)

## Kontrole wykonane przez reviewera

Wszystkie polecenia wykonano z katalogu worktree powyżej.

| Polecenie | Exit | Wynik |
|---|---:|---|
| `git rev-parse HEAD` | 0 | Dokładny head przekazany do review, także przy końcowej kontroli. |
| `git ls-files --stage -- .the-way` | 0 | Gitlink wskazuje `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`. |
| `git -C .the-way rev-parse HEAD` | 0 | Ten sam commit; użyto przypiętej metody. |
| `git log 9a5f3605f73da87fc5c87089c8166d2658c0add6..f9b76ff703f09079fbddf86d3e40582484a06a01` i `git diff` tego zakresu, całość czytana partiami według plików | 0 | Fundament i osiem części; 51 plików. |
| `git diff --check 9a5f3605f73da87fc5c87089c8166d2658c0add6..f9b76ff703f09079fbddf86d3e40582484a06a01` | 0 | Brak problemów whitespace. |
| `npm run typecheck` | 0 | Typy przeglądarki i serwera poprawne. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`. |
| `git status --short` | 0 | Czyste śledzone drzewo, również przed zapisem raportu. |

Nie uruchamiano testów węższym poleceniem. Zgodnie z metodą review nie powtarzano pełnej bramki cyklu; oceniono retained logs i wykonano powyższe kontrole. Błędny pierwszy odczyt `src/sim/run.ts` zwrócił komunikat braku ścieżki; poprawny plik `src/browser/sim/run.ts` został następnie odczytany w całości. Nie wyciągnięto z błędnego odczytu wniosku o braku kodu.

## Ocenione dowody autora i granice weryfikacji

Przeczytano końcówki rzeczywistych logów [base-test.log](base-test.log) oraz [slice-8-test.log](slice-8-test.log), a także końcowe pliki statusu: [test exit](slice-8-test.exit-code) = 1, [foundation exit](slice-8-foundation-final.exit-code) = 0.

Końcowe `npm test`: Node 343 zaliczone, zero pominiętych; Python workflow 5, deploy 64 i quality 32 zaliczone; invariants 163 z jednym błędem `OneExpressProcessServesGameAndApi.setUpClass`. Python łącznie 264, bez skipów. `Get-NetTCPConnection -State Listen` nie zwraca obiektów MSFT_NetTCPConnection i setup klasy kończy się błędem. Ten sam błąd występuje w logu czystej bazy; nie ustalono jego przyczyny i nie uznano nieuruchomionej klasy za zaliczoną. Fundament nie został osiągnięty przez pełną komendę; osobne sprawdzenie autora i świeże sprawdzenie reviewera mają exit 0. Nie ma surowych logów części 1; jej raport nie zastępuje tego brakującego dowodu. Wczesne sprawdzenie fundamentu części 8 bez zachowanego exit pozostaje niezweryfikowane, mimo późniejszej poprawnej kontroli.

Metoda kontroli UI: rzeczywiście otwarto i obejrzano wszystkie dziesięć przekazanych PNG narzędziem `view_image`: trzy części 6 (initial, grouped, number), trzy części 7 (before, partial, death) i cztery części 8 wymienione poniżej. Oceniono czytelność granic grup, pola, akcje destrukcyjne, liczniki, widoczny fokus, stan pusty i zakończony. Zrzuty części 6 przedstawiają zamontowany rzeczywisty edytor, nie całą końcową podróż gracza; nie pomylono tych zakresów.

- [Początkowa grupa](slice-8-browser-empty.png)
- [Grupy, liczniki i fokus](slice-8-browser-populated.png)
- [Po Zakończ](slice-8-browser-post-run.png)
- [Po usunięciu wszystkich grup](slice-8-browser-no-groups.png)

Nie zaobserwowano nachodzenia kontrolek ani nieczytelnych liczników. Końcowa podróż autora opisuje rzeczywiste przeciąganie myszą, niespełniony warunek grupy, zachowanie licznika po transferze, częściową nazwę i liczbę podczas zwykłych ticków, fokus po zmianie struktury, Zakończ, wysłanie, Restart i usunięcie wszystkich grup. Kod obsługi zdarzeń i testy transformacji są zgodne z tym opisem. Reviewer nie odtworzył interakcji w nowej sesji przeglądarki; sam screenshot nie dowodzi historii zdarzeń ani czasu. To ograniczenie dowodów pozostaje jawne. D-89: review nie znalazł krytycznej ucieczki defektu ani dowodu trwałego kosztu ręcznych powtórzeń uzasadniającego nowy stały framework przeglądarkowy. Nie dodano tokenów ani rodzajów kontrolek; nowe stany korzystają z istniejących wspólnych kontrolek.

## Samodzielny wybór materiału i dodatkowy zasięg

Fundament i wytyczne dobrano niezależnie według zmienionych części simulation, browser-view, build-tools i product-foundation. Przeczytano całe odpowiednie wpisy decyzji i niezmienników, mapę części oraz słownik; nie oparto wyboru na liście przekazanej autorom. Całe przeczytane wytyczne: [coding.md](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/guidelines/coding.md), [testing.md](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/guidelines/testing.md), [styleguide-browser-view.md](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/guidelines/styleguide-browser-view.md), [coding-simulation-module.md](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/guidelines/coding-simulation-module.md), [coding-browser-module.md](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/guidelines/coding-browser-module.md). Inwentarz nagłówków pozostałych wytycznych służył sprawdzeniu, czy nie przeoczono właściwego rodzaju kodu; brak zmian danych treści i serwera nie wymagał przenoszenia ich recept do tej zmiany.

Ponad samą listę zmienionych plików sięgnięto do [run.ts](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/src/browser/sim/run.ts), aby sprawdzić emisję startu, śmierć i dokończenie zapamiętanej akcji; do [headquarters.ts](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/src/browser/view/headquarters.ts), aby niezależnie sprawdzić zgłoszoną przez autora rozbieżność README; oraz do całego README i D-77, aby samodzielnie ocenić instrukcję testów. Sąsiednie wpisy fundamentu ujawnione przy odczycie wybranych zakresów nie stały się podstawą rozszerzenia zadania. Przeczytano też przypięte zasady pracy, czytania wytycznych i słownik procesu, lokalne instrukcje przeglądarki oraz wymagany globalny playbook code review. Nie użyto alternatywnej kopii procesu.
