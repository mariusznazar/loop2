# Blokada zadania: przypięty npm i próg podatności

Stan kodu: 3781ff9d421d6bc1f73b017bbe02dc70b2943996. Początek zmiany i ostatnio pobrany main: c379207bfd8bd148d3589ea75604ba5165915d01. Zadanie jest nieukończone; szkic PR nie jest przeznaczony do scalenia.

## Materiał wymagający decyzji

Źródło task.md, Q5:

> npm audit w przypiętym npm 11.13.0, baza npm/GitHub Advisory Database przez publiczny rejestr npm, poziomy `low`, `moderate`, `high`, `critical` blokują; `info` nie blokuje.

Źródło task.md, settlement 6:

> npm 11.13.0 i baza npm/GitHub Advisory blokują wprowadzane względem początku zmiany dokładne pary nazwa–wersja zależności npm od poziomu low, także zależności pośrednie i deweloperskie, bez kontroli niezmienionych wersji i bez automatycznej rewizji progu.

Źródło task.md, settlement 20:

> Zmiana nie wprowadza objętej zależności npm w wersji ze znaną podatnością low lub wyższą według bazy odczytanej podczas kontroli, a brak wiarygodnego wyniku nie oznacza przejścia.

Rzeczywista instalacja dokładnie przyjętych wersji przechodzi npm ci, lecz kontrola scripts/check_dependencies.py względem początku zmiany kończy się kodem 1 i nazwanym naruszeniem introduced-npm-vulnerabilities/1. Wśród 236 nowych par pakiet–wersja 10 pasuje do 35 ostrzeżeń. Wszystkie dziesięć znajduje się w dystrybucji npm 11.13.0 pod node_modules/npm/node_modules; lock oznacza je inBundle:true. Zmiana zwykłych zależności aplikacji nie usuwa tych kopii.

| Pakiet | Wersja w npm 11.13.0 |
|---|---|
| @sigstore/core | 3.2.0 |
| @sigstore/verify | 3.1.0 |
| brace-expansion | 5.0.5 |
| http-cache-semantics | 4.2.0 |
| ip-address | 10.1.0 |
| pacote | 21.5.0 |
| postcss-selector-parser | 7.1.1 |
| sigstore | 4.1.0 |
| tar | 7.5.13 |
| undici | 6.25.0 |

Przykład: tar 7.5.13 pasuje do krytycznego ostrzeżenia1123940/GHSA-23hp-3jrh-7fpw, zakres <=7.5.18. To wynik odczytanej bazy, nie ocena wykorzystania podatności przez aplikację. Dokładne35 dopasowań, poziomy, identyfikatory i zakresy znajdują się w f5-integration1-matches-final.json; odpowiedź rejestru i wyniki semver w f5-integration1-node-final.jsonl; ścieżki kopii w f5-integration1-sources.txt. Autor kontroli i niezależny recenzent potwierdzili wynik. Zbiorcze ostrzeżenie instalatora o11 podatnościach nie było użyte jako zamiennik tej kontroli.

## Propozycja i koszt obu dróg

Proponowany tekst decyzji: „Zmieniamy przypiętą wersję narzędzia audytu npm z 11.13.0 na 12.2.1; zakres audytu i blokowanie nowych par z podatnością od low pozostają bez zmian. Aktualizujemy odpowiadające zapisy zadania, D-33, instalację i kontrolę oraz powtarzamy dotkniętą weryfikację.”

Pozostawienie 11.13.0 zachowuje pierwotny wybór narzędzia, ale uniemożliwia ukończenie zadania przy przyjętym progu. Wyłączenie narzędzi lub dołączonych zależności z audytu zmieniałoby drugie uzgodnienie i pozostawiłoby znane podatne wersje, także krytyczną. Nie zastosowano takiego wyjątku ani nie przepakowano dystrybucji npm.

Zmiana na 12.2.1 wymaga jawnej rewizji przypiętej wersji i ponownej kontroli zgodności adaptera z npm oraz testów produktu. Przeprowadziłem tylko próbę w osobnym katalogu .runs/npm-candidate-12.2.1: pozostałe bezpośrednie piny pozostały identyczne, instalacja z wyłączonymi skryptami przeszła, rzeczywisty npm zgłosił12.2.1, a jego pełny raport auditReportVersion: 2 ma pustą listę podatności i zero na każdym poziomie. To dowód dla propozycji, nie końcowy wynik metody produktu, która nadal wymaga11.13.0. Node 24.17.0 spełnia opublikowane wymagania nowej wersji. Globalnego npm, serwera i plików produktu na 12.2.1 nie zmieniono.

Źródło wersji: https://github.com/npm/cli/releases/tag/v12.2.1; dokładne metadane https://registry.npmjs.org/npm/12.2.1. W czasie próby tag latest rejestru zwrócił12.2.0, dlatego próba używała jawnie 12.2.1, potwierdzonej oddzielnym endpointem. Pełne wyniki: candidate-install.txt, candidate-version.txt, candidate-audit.txt i ich metadane wykonania. Odtwarzalne manifesty/lockfile: blocked-install-package*.json i candidate-package*.json.

Pytanie: czy akceptujesz powyższą zmianę przypiętego npm na 12.2.1 przy zachowaniu progu low?

## Dlaczego szkic jest zablokowany

Przypięty proces .the-way/task-cycle/skill/SKILL.md, sekcja Foundation, wymaga: „a row's meaning cannot hold […] through a blocked draft request holding the question; never write a row with another meaning.” Konflikt dotyczy dwóch przyjętych wierszy zadania, więc nie jest wyborem implementacyjnym przekazanym agentowi. Nie zmieniono ich po cichu.

Ukończono zapis 22 ustaleń i mapy części oraz implementacje F1-F6 z przeglądami; późniejsze rzeczywiste uruchomienie ujawniło nadal niepoprawne założenie nazw aliasów w kontroli ESLint. W S1 zapisano wyłącznie manifest i lockfile jako odtwarzalny przykład blokady. Nie wykonano pozostałych pięciu plików S1, instalacji Python/Bash, napraw sprzątania serwera, usunięcia asercji, formatowania 45 plików, pięciu wytycznych ani wskazania w AGENTS.md. Kontrola typów przez jawny TS7 i poprawka loadera ESLint pozostają do zrobienia.

Przegląd całego brancha, przegląd nieukończonego S1, końcowe celowe naruszenia invariantów, przypadki good/bad wytycznych, return step, niezależna ocena fundamentu i uzgodnienie z aktualnym main nie zostały wykonane. Root uruchamia pełny zestaw kontroli na częściowej zmianie i zachowuje wszystkie niepowodzenia/braki. Wyniki będą dołączone w final-gate-results.json i raporcie końcowych kontroli. Cztery nowe fakty środowiskowe mają Method:TODO i nie mają wykonanego automatycznego sprawdzenia. Nie zapisano nic w zadaniu źródłowym ani backlogu.
