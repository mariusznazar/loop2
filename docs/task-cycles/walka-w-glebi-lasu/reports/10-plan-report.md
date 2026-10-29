# Wynik planowania — Las — głębiej

Status: **done with concerns**. Plan jest gotowy; nie ma pytania wymagającego kolejnego specu. Nie rozpocząłem implementacji ani zapisu fundamentu. Concern obejmuje jawne rozszerzenie lektury i zgłoszoną przez orkiestratora usterkę bazowej bramki, nie brak rozstrzygnięcia zachowania walki.

Artefakty:

- Plan: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/.runs/task-cycles/walka-w-glebi-lasu/plan.md`.
- Ostatni pomiar wielkości: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/.runs/task-cycles/walka-w-glebi-lasu/plan-size.md`.
- Ten raport: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/.runs/task-cycles/walka-w-glebi-lasu/reports/10-plan-report.md`.

## Podział i pokrycie

Plan ma dziesięć kolejnych zakresów: warunki zdrowia; dane walki; czyste rozstrzyganie wymian; mapa i postęp; wiedza o stworzeniach; pełna integracja minut; ochrona niezmienników; interfejs; pomiar dwudziestu ziaren; dowód w przeglądarce. Każdy zakres używa klasy cheaper i ma Risk: none. Największy pomiar to 122 348 szacowanych tokenów; każdy zakres zmienia najwyżej dziesięć plików. Wszystkie dziesięć wyników to fits.

Tabela Foundation entries obejmuje oddzielnie wszystkie piętnaście Settlements to record, przydzielone wpisy projektowane i wszystkie rewizje ze specu, w tym D-58. Są 29 adresy F, nie 29 wymaganych osobnych nowych decyzji; wpisy o tym samym znaczeniu można zapisać łącznie przez odpowiednie skille fundamentu. Tabela Coverage przypisuje wszystkie dziesięć To do, pomiar, dowód przeglądarkowy i ochronę istniejących zachowań.

Plan pozostawia pełny wpis o losowaniach zadaniu 18, a przełączanie programów i plan wyprawy zadaniom 12 i 13. Korzysta z obowiązujących D-129–D-136 po dostarczonym zadaniu 7. Stryker otrzymuje oba nowe zestawy symulacji; wykonanie analizy mutacyjnej pozostaje niezależnemu recenzentowi. Pełną bramkę wykonuje orkiestrator po zmianie. Żaden zakres nie dostał pełnego npm test.

## Materiał i dodatkowy zasięg lektury

Przeczytałem zamrożone zadanie, zaakceptowany spec, wskazane wpisy zatwierdzonej definicji i ich przypisanie do wiersza 8 planu projektu, zadany fundament oraz wszystkie wymienione wytyczne. Plan powstał z obecnego kodu Loop2. Nie korzysta z silnika ani interfejsu poprzednika. Nie czytałem cycle.md.

Dodatkowe sięgnięcia potrzebne do zamknięcia zakresów:

- `foundations/invariants.md:598-607`, cały mutation-test-selection: dodanie zestawów combat i encounters wymaga ich włączenia do istniejącego wyboru Stryker. Nie zmienia to znaczenia niezmiennika.
- `stryker.config.json` i `tests/quality/test_mutation_test_selection.py`: ustalenie miejsca zmiany wyboru i istniejącego polecenia jego kontroli; uwzględnione w zakresach 3 i 6.
- `tests/invariants/test_simulation_inputs.py`: publiczne eksporty są wywoływane również z listy znanych poprawnych argumentów. Nowe operacje wymagają udanego wywołania z zamrożonym wejściem, żeby sprawdzenie nie kończyło się na odrzuceniu argumentów. Zakres 7 aktualizuje tę tabelę, nie znaczenie istniejącego simulation-inputs.
- `src/browser/sim/world.ts`, pliki testów w `tests/sim/` i `tests/invariants/` oraz ich istniejące fixture: ustalenie granicy kroku świata, jawnych obiektów Understanding, ochrony podziału minut, restartu i liczników. Przypisane pliki i potrzebne wzorce są wyszczególnione w Change/Read; nie dodano nowych zachowań produktu.
- `src/browser/view/terrain-picture.ts`, `src/browser/view/controls/button.ts`, `src/browser/styles.css`, `src/browser/tokens.css` i istniejące testy widoku: znalezienie odczytu current.stepTo, zachowania kontrolek i ról istniejących tokenów. Konsument celu kroku musi być dostosowany razem ze stanem starcia, przed osobnym zakresem prezentacji.
- Pełny słownik procesu oraz fragment Reading the foundation z `.the-way/elements/common/way_of_working.md`: instrukcje metody wymagane przez skill planowania, bez poszerzania produktu.

Nie znalazłem brakujących ani niejasnych wytycznych dla planowanych rodzajów plików. Istniejące wzorce simulation module, content data i browser module obejmują nowe moduły. Mapa części już obejmuje planowane ścieżki; nie potrzeba nowej części ani granicy zaufania.

## Kolejność interfejsu i przekazanie zakresów

Przykład kolejności ze styleguide zaczyna od środowiska/biblioteki, następnie tokenów, ekranu i stanów. Środowisko, biblioteka i tokeny istnieją i nie wymagają nowego wyboru. Plan buduje najpierw zachowanie symulacji, potem ekran z jego stanami w zakresie 8 i sprawdza go w prawdziwej przeglądarce w zakresie 10. Jest to dostosowanie przykładu do istniejącego interfejsu; nie pomija kontroli fokusu, SVG ani stanów końcowych.

Zakresy mają wybrane pełne wpisy fundamentu oraz krótsze właściwe fragmenty zadania i specu. Po zapisie fundamentu orkiestrator podmienia adresy na aktualne pełne wpisy; adresy F służą temu przekazaniu. Pomiar jest pomiarem bazy: nowo tworzone pliki nie mają jeszcze treści, a późniejsze zakresy zastaną rozszerzone pliki wcześniejszych zakresów. Gdy rzeczywista wielkość wzrośnie do granicy, zakres wraca do ponownego podziału; nie jest to upoważnienie do pominięcia potrzebnego kodu podczas wykonania.

Przed zakresem 10 obowiązuje wskazana w handoffie instrukcja narzędzia: `C:/Storage/The Brain/The Brain/.ai/skills/playwright-mcp/SKILL.md`, czytana w całości przed użyciem przeglądarki. To zewnętrzna instrukcja użytkownika, nie ścieżka repo obsługiwana przez slice_size.py. Orkiestrator powinien zachować ją w przekazaniu tego zakresu. Przed skryptami nadal obowiązują globalne reguły użytkownika. Lokalne narzędzia jakości są w `.runs/quality-venv/Scripts`; w razie potrzeby autor dodaje ten katalog tylko do PATH własnego procesu.

## Wykonane kontrole

Wszystkie poniższe komendy wykonano z `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`:

| Komenda | Exit | Wynik |
|---|---|---|
| `git -C .the-way rev-parse HEAD` | 0 | `3aee7d958835cc19b95519f4d21b37538b78e3e1` |
| `git ls-files --stage -- .the-way` | 0 | Ten sam commit gitlinku; przypięcie zgodne. |
| `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/walka-w-glebi-lasu/plan.md` | 0 | 10/10 fits; końcowe stdout zapisane jako UTF-8 do plan-size.md. |
| `git status --short` | 0 | Brak zmian śledzonych plików; artefakty cyklu są ignorowane. |

Kontrola pokrycia i doboru źródeł była lekturą, nie testem produktu. Planner nie uruchamiał testów, pomiaru ziaren, przeglądarki, analizy mutacyjnej ani pełnej bramki. Wymienione w planie kontrole zachowania są przyszłą pracą, nie zaliczonymi wynikami.

## Ograniczenie bazy przekazane przez orkiestratora

Według komunikatu orkiestratora pełne `npm test` na bazie zakończyło się exit 1: 565 testów Node przeszło; Python wykonał 300 testów, pięć pominął; 40 kontroli quality przeszło. Jedyny błąd pochodzi z istniejącego setUpClass w `tests/invariants/test_loop2_one_serving_process.py`: Get-NetTCPConnection nie znalazł obiektów Listen. Osobne `python -B .the-way/elements/common/foundation_check.py` zakończyło się exit 0; ta kontrola nie została osiągnięta przez pełne npm test. Dowód orkiestratora: `.runs/task-cycles/walka-w-glebi-lasu/reports/00-baseline-gate.log`.

Nie powtarzałem tej bramki i nie przedstawiam jej jako własnego sprawdzenia. Plan nie dodaje naprawy serwera ani tego testu. Wynik bazowy trzeba odróżnić od nowej regresji przy bramce końcowej. Nie pozostaje otwarte pytanie projektowe; granicą przekazania jest gotowy plan, przed wykonaniem zakresu 1.
