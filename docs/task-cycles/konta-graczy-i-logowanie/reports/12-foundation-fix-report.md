# Poprawka fundamentu po przeglądzie fragmentu 1

Status: done.

Commit: `d39dd8870d36803bd17fbe64819634bf7e3ec61c` — `docs: restore complete saved-game durability obligation`.

Baza poprawki: `c24fbffd031c5f0dee7922c813800b3f1c1d8288`. Worktree: `C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie`, branch `task/konta-graczy-i-logowanie`. Wykonałem wyłącznie uwagę 4 z `reports/11-slice1-review.md` i przekazanego dosłownie `reports/12-blocking-findings.md`, według `reports/12-foundation-fix-handoff.md`. Uwagi 1–3 pozostają dla następnego autora; nie twierdzę, że zostały naprawione.

## Co poprawiono

Uwaga 4 jest naprawiona, nie kwestionowana. Poprzedni wpis nieuprawnienie zastąpił zapisane stany gry sesjami. Przywróciłem pełne zdanie przypisane przez zamrożone zadanie, zgodne z zatwierdzoną definicją. Zachowanie pełnego obowiązku nie rozszerza implementacji tego zadania o zapis gry.

Poprzednie zdanie na bazie poprawki:

> Replacing the application container preserves the SQLite database of player accounts and sessions.

Przywrócony pełny wpis w `foundations/invariants.md`:

```markdown
## account-save-durable-storage

Replacing the application container preserves the SQLite database of player accounts and saved game states.

- **Method:** review
- **Rests on:** none
- **Derives from:** D-17 · C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md § Projected foundation changes, account-save-durable-storage/1 — "Replacing the application container preserves the SQLite database of player accounts and saved game states."; read 2026-10-27
- **Part:** account-server · deployment
- **Violated:** yes
```

Znaczenie: wymiana kontenera ma zachować bazę SQLite z kontami i zapisanymi stanami gry; sam dowód zachowania kont oraz sesji nie dowodzi całej tej zasady.

Pole Derives from zachowuje D-17 jako regułę trwałego własnego wolumenu i dodaje bezpośredni cytat przyjętego pełnego wymagania z definicji. Dzięki temu szerszy przedmiot nie jest wyprowadzany wyłącznie z operacyjnej decyzji o wolumenie. Nie zapisałem przedwcześnie projektowanej decyzji o przechowywaniu pełnych stanów gry, którą zamrożone zadanie przydziela zadaniu 16.

Przez `the-way-record-decision` doprecyzowałem pole Verification decyzji D-17, która już wskazywała ten niezmiennik. Dodane zdanie brzmi:

> Checks of accounts and sessions alone do not establish preservation of saved game states and cannot clear account-save-durable-storage.

Pozostałe zdania wiążące D-17, jej zakres, istniejące granice hosta i pozostałe niezmienniki pozostały bez zmian. Wpis ma nadal Method: review oraz Violated: yes. Żadnego oznaczenia naruszenia nie ustawiałem ani nie usuwałem. Nie istnieje jeszcze test cytujący account-save-durable-storage; nie zmieniałem testu niezmiennika.

Dowody przewidziane dla kont i sesji są częściowe: przyszły etap 9 może wykazać ich przetrwanie wymiany kontenera, ale taki wynik nie może usunąć długu dotyczącego zapisanych stanów gry. Pełna zasada czeka na rzeczywiste pokrycie także tej części. W tym etapie nie wykonywałem nawet częściowej próby wymiany kontenera.

## Zakres zmian

| Plik | Dodano | Usunięto | Zakres |
|---|---:|---:|---|
| foundations/invariants.md | 2 | 2 | Dokładne zdanie account-save-durable-storage i bezpośrednie źródło jego pełnego zakresu. |
| foundations/decisions.md | 1 | 1 | Kryterium oceny częściowego dowodu w Verification D-17. |

Nie zmieniałem task.md, vaultu, kodu, testów, procesu ani historycznych raportów. Specyfikacja i plan były już skorygowane przez orkiestratora; odczytałem pełny poprawiony akapit Foundation entries specyfikacji, F20h, akapit zakresu pod tabelą i instrukcję etapu 9. Są zgodne z przywróconym zdaniem oraz jawnym długiem.

Zastosowałem projektowe `the-way-make-change`, `the-way-record-invariant` i, jako bezpośrednią konsekwencję zmiany niezmiennika, `the-way-record-decision`, z przypiętymi metodami i szablonami. Pin `.the-way` pozostaje `574a37b9ab9572f876298f4cc10754581222d3f0`, zgodny z gitlinkiem. Nie czytałem cycle.md i nie uruchamiałem kolejnego autora ani przeglądu.

## Własne sprawdzenie i dowody

Najbardziej zagrożone wymaganie tej poprawki: pozorne przywrócenie słów przy pozostawieniu możliwości uznania całej zasady za spełnioną na podstawie samego testu kont/sesji. Sprawdziłem dokładne zdanie względem zamrożonego zadania i oryginalnej definicji, kompletność cytatu w Derives from, pozostawione review/Violated yes oraz jawny zakaz wyczyszczenia tego obowiązku takim częściowym dowodem w D-17 i poprawionym planie. Kontrola potwierdziła wszystkie te warunki.

| Polecenie | Kod wyjścia | Wynik |
|---|---:|---|
| `git rev-parse HEAD` przed zmianą | 0 | Dokładna wskazana baza `c24fbffd031c5f0dee7922c813800b3f1c1d8288`. |
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | Identyczny pin procesu. |
| `rg -n 'account-save-durable-storage' tests` | 1 | Brak cytujących testów; to wynik wyszukiwania, nie nieudany test. Wyszukiwanie całego fundamentu odnalazło istniejący wpis i pole Verification D-17. |
| `python -B .runs/foundation-durability-fix.py --write` | 0 | Zapis ograniczony do wskazanego wpisu i pola D-17, z zachowaniem końców linii; kontrola źródeł i stanu długu przeszła. |
| `python -B .runs/foundation-durability-fix.py` | 0 | Oddzielne ponowne sprawdzenie dokładnego źródła, pochodzenia, review/violated i zgodności poprawionych dokumentów. Jest to kontrola źródłowa artefaktu, nie test produktu. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`. |
| `git diff --check` | 0 | Brak błędów whitespace. |
| `git diff --stat`; `git diff -- foundations/invariants.md foundations/decisions.md` | 0 | Tylko trzy dodane i trzy usunięte linie w dwóch plikach, odczytany pełny diff. |
| `rg -n -F 'C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md' foundations/invariants.md` | 0 | Dosłowna ścieżka źródła po zapisie znaleziona; backslashe nie stały się znakami sterującymi. |
| `git add foundations/invariants.md foundations/decisions.md` | 0 | Wyłącznie jawne ścieżki. |
| `git commit -m "docs: restore complete saved-game durability obligation"` | 0 | Commit `d39dd8870d36803bd17fbe64819634bf7e3ec61c`. |
| `git rev-parse HEAD`; `git status --short`; `git show --format= --numstat HEAD` | 0 | Właściwy commit, czyste śledzone drzewo i podane wyżej liczby zmian. |

`npm test` nie uruchamiałem: przekazanie dla tej korekty fundamentu wymaga kontroli źródła, diffu i fundamentu, a następny autor ma wykonać pełne sprawdzenie po połączeniu poprawek. Nie zaliczam tego przyszłego przebiegu, wyników wcześniejszych autorów, testów zapisów gry, pomiaru docelowego ani wdrożenia. Nie napisałem testu produktu dla korekty tekstu i nie wykonywałem żadnego testu poza npm test.

## Dodatkowe odczyty i decyzje wykonawcze

- D-17 przeczytałem w całości jako wpis wskazujący zmieniony niezmiennik; rozszerzenie jego Verification jest konieczną konsekwencją uwagi 4, objętą przekazaniem. Nie zmienia decyzji o hostingu.
- Oryginalny wpis `account-save-durable-storage/1` w zatwierdzonej definicji odczytałem ponownie wraz ze wszystkimi jego polami, aby powołać trwałe źródło spoza ignorowanego katalogu cyklu i nie przypisywać pełnej reguły wyłącznie D-17. Vault został tylko odczytany.
- Przeszukałem cały fundament i testy pod kątem identyfikatora oraz trwałości zapisanych stanów gry. Pozostałe wzmianki o kontach i sesjach dotyczą własnych zasad schematu i nie wymagają podmiany na stany gry.

Wybrany zapis zachowuje pełne wymaganie i jawny dług. Odrzucone zawężenie do kont/sesji pozwalałoby usunąć zapisane stany gry przy wymianie kontenera bez naruszenia tak zawężonego zdania. Nie potrzebowano nowej decyzji produktowej ani pytania do człowieka: pełny tekst jest już przyjętym źródłem, a koszt poprawki to pozostawienie długu do pełnego dowodu. Nie wydzielałem nowego niezmiennika ani nie dopisywałem implementacji zapisów.

Pytania i blokery tej części: brak. Zwracam poprawkę fundamentu przed autorem kodu; pozostałe trzy uwagi i wspólny ponowny przegląd są poza moim zakresem.
