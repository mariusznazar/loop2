# Slice 4 — raport wykonania

**Status:** done

**Baza:** `ba80da339059dc55ee206f75f22a9c745897efe0`  
**Commity:**

- `88925d44b2bb13d4ca1b7980f31809c4a565950f` — `feat: :evergreen_tree: add deeper forest map progress and access`
- `a8b52f6` — `test: :white_check_mark: cover map access input immutability`

## Zmienione pliki

| Plik | Dodane | Usunięte |
|---|---:|---:|
| `src/browser/sim/data/maps.ts` | 36 | 2 |
| `src/browser/sim/game.ts` | 20 | 4 |
| `src/browser/sim/layout.ts` | 7 | 2 |
| `src/browser/sim/run.ts` | 8 | 3 |
| `src/browser/sim/types.ts` | 2 | 0 |
| `src/browser/view/headquarters.ts` | 7 | 4 |
| `src/browser/view/status-row.ts` | 11 | 3 |
| `tests/sim/completion.test.mjs` | 80 | 0 |
| `tests/sim/data.test.mjs` | 18 | 0 |
| `tests/sim/layout.test.mjs` | 35 | 0 |
| `tests/view/headquarters.test.mjs` | 7 | 0 |
| `tests/view/status-row.test.mjs` | 17 | 0 |
| `tests/invariants/test_simulation_inputs.py` | 6 | 1 |

Łącznie: 254 dodane i 19 usuniętych linii. Zmiany są w dwóch commitach wyłącznie na branchu `task/walka-w-glebi-lasu`; working tree był czysty po commicie.

## Wynik

Dodana mapa `forestDeep` ma siatkę 5 × 5, wejście losowane po losowaniach zasobów, temperaturę 7 °C, dane zasobów Lasu, wilka z szansą ataku 0,01 oraz warunki rozwiązania 540 minut passy i dwie pokonane napaści. Licznik napaści startuje od zera, przeżywa utratę zdrowia od zimna lub głodu i zeruje się razem z passą po rzeczywistej zmianie programu. `meetsSolving` sprawdza wszystkie wymagania obecne w danych, a pominięte ignoruje.

`canSendMap(solvedMaps: readonly MapId[], mapId: MapId): boolean` jest wspólnym sprawdzeniem używanym przez `send` i siedzibę. Zamknięta mapa nie pojawia się w siedzibie przed rozwiązaniem Lasu; edytor programu nadal może pobrać pełną listę map przez `sendMaps()` bez argumentu. Wiersz postępu wyświetla tylko wymagania obecne w danych, w kolejności decyzji D-133: `Passa …` i `Pokonane napaści …`.

## Kontrole

Wszystkie końcowe komendy zakończyły się kodem 0:

- `npm test -- tests/sim/completion.test.mjs` — 14 testów.
- `npm test -- tests/sim/layout.test.mjs` — 10 testów. Zachowany istniejący złoty układ Lasu dla ziarna 1; nowy test potwierdza wybór wejścia po 100 rzutach zasobów dla ziarna 1 oraz różne pozycje wejścia dla 40 ziaren.
- `npm test -- tests/sim/data.test.mjs` — 31 testów.
- `npm test -- tests/view/status-row.test.mjs` — 26 testów.
- `npm test -- tests/view/headquarters.test.mjs` — 6 testów.
- `npm test -- tests/invariants/test_map_run_layout.py` — 3 testy.
- `npm test -- tests/invariants/test_simulation_inputs.py` — 2 testy; obejmuje udane wywołania `canSendMap` z listą rozwiązań bez mapy nadrzędnej, bez wymaganej mapy i z rozwiązaną mapą nadrzędną.
- `node_modules/.bin/eslint --max-warnings 0 src/browser/sim/data/maps.ts src/browser/sim/layout.ts src/browser/sim/types.ts src/browser/sim/run.ts src/browser/sim/game.ts src/browser/view/status-row.ts src/browser/view/headquarters.ts tests/sim/layout.test.mjs tests/sim/completion.test.mjs tests/sim/data.test.mjs tests/view/status-row.test.mjs tests/view/headquarters.test.mjs` — kod 0.
- `node_modules/.bin/prettier --check src/browser/sim/data/maps.ts src/browser/sim/layout.ts src/browser/sim/types.ts src/browser/sim/run.ts src/browser/sim/game.ts src/browser/view/status-row.ts src/browser/view/headquarters.ts tests/sim/layout.test.mjs tests/sim/completion.test.mjs tests/sim/data.test.mjs tests/view/status-row.test.mjs tests/view/headquarters.test.mjs` — kod 0.
- `& '.runs/quality-venv/Scripts/ruff.exe' check --ignore-noqa --config ruff.toml tests/invariants/test_simulation_inputs.py` — kod 0.
- `git diff --check` — kod 0.

Test rozwiązania mapy widziano najpierw na czerwono: po tymczasowym pominięciu sprawdzenia liczby napaści `completion.test.mjs` wykrył fałszywe rozwiązanie przy 540 minutach i jednej pokonanej napaści (exit 1); po przywróceniu sprawdzenia test przeszedł (exit 0). Test resetu progresu również widziano na czerwono po tymczasowym pominięciu resetu licznika napaści (exit 1; oczekiwane 0, otrzymane 1), a po przywróceniu resetu przeszedł (exit 0). Niezmiennik `simulation-inputs` widziano na czerwono po tymczasowej mutacji listy w `canSendMap` (exit 1; wskazał zmieniony argument), a następnie na zielono po przywróceniu funkcji bez mutacji (exit 0).

Pierwsze uruchomienie `completion.test.mjs` zakończyło się przed testami, bo nowy test importował jeszcze niezaimplementowane `canSendMap`; po dodaniu funkcji uruchomienie doszło do asercji. Pierwsza wersja testu resetu próbowała wysłać postać na nową mapę, gdy poprzedni bieg nadal trwał; poprawiono przygotowanie stanu przez `end()`.

Pełnego `npm test`, `foundation_check.py` i Stryker nie uruchamiałem: handoff zakazuje pełnej bramki w tym slice; nie zmieniono fundamentu; narzędzie mutacji należy do niezależnego recenzenta. Zaimplementowanie integracji minutowej walki i odkryć pozostaje poza tym slice’em zgodnie z dyspozycją; późniejszy slice musi zwiększać `defeatedAttacks` po wygranej walce i korzystać z danych napastników.

## Kontrola własnej pracy i ekran

Najbardziej ryzykowne wymaganie: siedziba i symulacja muszą zgadzać się co do dostępności drugiej mapy. Test sprawdza odmowę `send` przed rozwiązaniem Lasu i dopuszczenie po nim; test widoku sprawdza filtrowanie tej samej listy przy zachowaniu pełnej listy dla edytora. Niezmiennik wejść sprawdza, że nowa publiczna funkcja nie zmienia przekazanej listy.

Zgodnie z `.the-way/task-cycle/change/ui_check.md` otworzyłem lokalną aplikację pod `http://127.0.0.1:3000/`, a `/api/account` otrzymało wyłącznie kontrolowaną odpowiedź testową w przeglądarce. Wiersz statusu utworzono z modułu produktu dla biegu symulacji `forestDeep` z passą 120 i jedną napaścią; zrzut `.runs/task-cycles/walka-w-glebi-lasu/reports/22-slice-04-status.png` pokazuje `Passa 120/540 · Pokonane napaści 1/2`. Konsola przeglądarki: 0 błędów i 0 ostrzeżeń. To potwierdza wyrenderowany wiersz, nie pełny przebieg gracza przez ukończenie Lasu ani walkę.

### Szczegóły dowodu przeglądarkowego

- Serwer uruchomiłem poleceniem `npm run dev` w katalogu `C:\Storage\repos\loop2-wt\walka-w-glebi-lasu`. Polecenie wykonało kompilację projektu, a następnie zgłosiło gotowość pod `http://127.0.0.1:3000`; użyta kompilacja pochodziła z tego worktree.
- Playwright przechwycił wyłącznie `**/api/account` i zwrócił status 200 z JSON-em `{id:"qa-local",email:"qa@example.invalid"}`, aby aplikacja mogła się otworzyć. Nie przechwytywałem ani nie podmieniałem odpowiedzi modułów produktu. Wiersz powstał przez import modułów `/sim/game.js` i `/view/status-row.js` z lokalnego serwera, a więc z kompilacji tego worktree.
- Przygotowanie stanu wykonane w `page.evaluate`:

  ```js
  const sim = await import('/sim/game.js');
  const view = await import('/view/status-row.js');
  let state = sim.newGame();
  state = sim.createCharacter(state, 'QA').state;
  state = { ...state, solvedMaps: ['forest'] };
  state = sim.send(state, { mapId: 'forestDeep', characterId: 1 }, 1760000000000).state;
  state = { ...state, run: { ...state.run, minute: 120, streak: 120, defeatedAttacks: 1 } };
  const row = view.createStatusRow({ togglePause() {}, setPace() {}, restart() {}, end() {} });
  row.update(state);
  document.body.replaceChildren(row.element);
  ```

  Przed tym kodem strona została przeładowana i zaczekano na nagłówek `Siedziba`. Nie zapisano osobnego skryptu dowodowego; powyższy fragment odtwarza kod przygotowania użyty w przeglądarce.
- Zrzut wywołałem przez Playwright MCP `browser_take_screenshot` z argumentami `{filename:".runs/task-cycles/walka-w-glebi-lasu/reports/22-slice-04-status.png",fullPage:true,scale:"css",type:"png"}`. Narzędzie zapisało plik w głównym repozytorium; kopię dołączoną do tego raportu przeniosłem do ignorowanego katalogu raportów worktree i obejrzałem.
- Serwer uruchomiłem ja w sesji polecenia `npm run dev` (sesja exec 54414), a po zrobieniu zrzutu zatrzymałem Ctrl+C. Proces zakończył się kodem 1 po przerwaniu. Nie zatrzymywałem żadnego procesu, którego sam nie uruchomiłem.
- Próba usunięcia zduplikowanego pliku w głównym repozytorium została odrzucona. Dokładne polecenie: `Remove-Item -LiteralPath 'C:\Storage\repos\loop2\.runs\task-cycles\walka-w-glebi-lasu\reports\22-slice-04-status.png' -Force`. Narzędzie zwróciło `Rejected("... Remove-Item ... rejected: blocked by policy")`; nie podało bardziej szczegółowego powodu. Kopia pozostaje ignorowana i nie ponawiałem próby usunięcia.

## Wybory i zakres poza listą plików

- Wejście losowe oznacza `entrance: null`; rozważany osobny przełącznik trybu wejścia mógłby być sprzeczny ze współrzędnymi. `null` pozostawia jednoznaczne „brak współrzędnych”, a jego ewentualny koszt to słabsze rozróżnienie trybów w typie.
- Dane zasobów nowej mapy są powtórzone w jej wierszu. Współdzielenie tablicy `MAPS.forest.resources` mocniej wiązałoby bilans map; przy kopiowaniu trzeba pilnować zgodności obu zestawów, jeśli później zmieni się tylko jeden.
- `sendMaps()` bez argumentu zachowuje pełny katalog używany przez edytor; filtrowanie następuje dopiero, gdy siedziba przekazuje `solvedMaps`. Gdyby każdy caller bezwarunkowo filtrował mapy, edytor nie mógłby opisać zasobów spoza aktualnego biegu.
- `headquarters.ts` oraz jego test dopisałem poza listą `Change` z handoffu, bo D-149 wymaga ukrycia zamkniętej mapy w siedzibie, a sama odmowa `send` tego nie zapewnia. `tests/invariants/test_simulation_inputs.py` również wykracza poza listę: handoff wymaga objęcia nowej publicznej funkcji istniejącym sprawdzeniem niezmienności argumentów.
- Odczytałem też `.the-way/task-cycle/change/ui_check.md` i referencje Playwright dotyczące przygotowania sesji, odczytu, czasu, podmiany odpowiedzi i stanu. D-133 przesądził dokładne brzmienie etykiety „Pokonane napaści”.

Narzędzie zrzutu ekranu zapisało początkowo zduplikowany, ignorowany artefakt w głównym repo `C:/Storage/repos/loop2/.runs/task-cycles/walka-w-glebi-lasu/reports/22-slice-04-status.png`. Polecenie usunięcia tej kopii zostało zablokowane przez politykę narzędzia; kopia pozostaje poza worktree. Egzemplarz pod ścieżką `.runs` worktree jest użyty powyżej. Żaden zrzut nie został dodany do commita.
