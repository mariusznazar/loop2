# Coding guidelines — loop2

- **Discipline:** coding
- **Applies to:** browser-view · simulation · account-server · build-tools · balance-tools · deployment · agent-workflow · test-helpers

## When to read

Przed każdą zmianą kodu produktu, także skryptów i testów. Stosuj sprawdzenia
niezmienników wskazanych poniżej przez ich metody zapisane w fundamencie.
Wytyczne przyjmują szablony przypiętego the-way zgodnie z D-28.

## Kinds of code

| Kind | File | When to read |
|---|---|---|
| content-data | `guidelines/coding-content-data.md` | Przed dodaniem lub zmianą pliku danych treści gry w simulation. |
| simulation-module | `guidelines/coding-simulation-module.md` | Przed dodaniem lub zmianą modułu simulation poza danymi treści gry i plikiem zapisu gry. |
| saved-game | `guidelines/coding-saved-game.md` | Przed dodaniem lub zmianą pliku simulation, który zamienia stan gry na dokument zapisu albo dokument pobrany z serwera lub zachowany w pamięci strony po zapisie, który nie zastał sesji, na stan gry lub odmowę. |
| browser-module | `guidelines/coding-browser-module.md` | Przed dodaniem lub zmianą modułu browser-view w katalogu widoku. |
| http-application | `guidelines/coding-http-application.md` | Przed dodaniem lub zmianą pliku składającego aplikację HTTP w account-server. |
| password-hashing | `guidelines/coding-password-hashing.md` | Przed dodaniem lub zmianą pliku wykonującego haszowanie albo sprawdzanie haseł. |
| database-access | `guidelines/coding-database-access.md` | Przed dodaniem lub zmianą pliku dostępu do bazy danych. |
| session-store | `guidelines/coding-session-store.md` | Przed dodaniem lub zmianą magazynu sesji biblioteki. |
| account-policy | `guidelines/coding-account-policy.md` | Przed dodaniem lub zmianą pliku sprawdzania danych logowania i rejestracji albo dopuszczania prób. |
| browser-api-client | `guidelines/coding-browser-api-client.md` | Przed dodaniem lub zmianą pliku klienta API serwera w przeglądarce. |
| mail-sending | `guidelines/coding-mail-sending.md` | Przed dodaniem lub zmianą pliku wysyłki poczty w account-server. |
| balance-instrument | `guidelines/coding-balance-instrument.md` | Przed dodaniem lub zmianą pliku kodu przyrządu balansu w `balance/`. |

## Rules

### Linter

- **Decision:** D-29 · D-30 · D-31
- **Invariant:** eslint-source-rules · ruff-source-rules · shellcheck-source-rules
- **Good:** Nowe pliki spełniają blokujące reguły bez komentarzy wyciszających.
- **Bad:** Kod narusza blokującą regułę albo wycisza ją komentarzem lub w konfiguracji.

Wzorce plików `eslint.config.mjs` obejmują każdy plik TS/JS sześciu części, które
D-29 wymienia, `balance-tools` (`balance/` i `tests/balance/`) wśród nich, i każdy plik JavaScript z trzech katalogów agent-workflow, które
D-29 nazywa. Nowy plik w jednym z tych trzech katalogów obejmują bez zmiany
konfiguracji; nowy skrypt gdzie indziej w agent-workflow nie. Tego pilnuje test
`tests/quality/test_source_tool_scope.py`: plik, który nie dostaje zestawów
reguł, zatrzymuje bramkę, więc nowy katalog z kodem dopisz do konfiguracji
w tej samej zmianie.

Test `shellcheck-source-rules` wymienia skrypty po nazwie: nowy skrypt Bash
dopisz do listy w `tests/quality/test_quality_invariants.py`. Dyrektywa
`# shellcheck disable=…` działa, więc jej nie dodawaj; przegląd ją odrzuca.

Naprawiaj zgłoszenie w pliku, zamiast wyciszać blokującą regułę. Zmiana zestawu
reguł ESLint, Ruffa albo ShellChecka wymaga zaakceptowanej przez człowieka
zmiany odpowiedniej decyzji. Wersje ESLint, Ruffa i ShellChecka przypinają
deklaracje wskazane w Where in code; testy uruchamiają lokalne kopie, bez
pobierania narzędzia przy kontroli.

```good eslint-source-rules scripts/guideline-case.mjs
export function doubled(value) {
  return value * 2;
}
```

```bad eslint-source-rules scripts/guideline-case.mjs
export function doubled(value) {
  // eslint-disable-next-line no-debugger
  debugger;
  return value * 2;
}
```

```good ruff-source-rules tests/quality/guideline_case.py
VALUE = 1
```

```bad ruff-source-rules tests/quality/guideline_case.py
import os  # noqa: F401

VALUE = 1
```

```good shellcheck-source-rules deploy/guideline-case
#!/usr/bin/env bash
printf '%s\n' "$1"
```

```bad shellcheck-source-rules deploy/guideline-case
#!/usr/bin/env bash
printf '%s\n' $1
```

### Formatter

- **Decision:** D-32 · D-433 · D-434
- **Invariant:** prettier-source-format · ruff-source-format · shfmt-source-format
- **Good:** Nowy plik ma układ pozostawiany przez formater swojego języka z ustawieniami z decyzji — Prettier dla TS/JS, Ruff dla Pythona, shfmt dla skryptu Bash z listy testu — i nie ma komentarza, który formater wyłącza.
- **Bad:** Nowy plik ma inny układ, końce linii CRLF w pliku TS/JS albo komentarz wyłączający formater: `prettier-ignore`, `fmt: off`, `fmt: on`, `fmt: skip`, `yapf: disable` albo `yapf: enable`.

Nie dodawaj opcji do `prettier.config.mjs`. Wzorce kontroli Prettiera w
`tests/quality/test_quality_invariants.py` i reguły LF w `.gitattributes`
obejmują każdy plik TS/JS części z zakresu D-32; pilnuje ich ten sam test.

Pliki Pythona formatuj poleceniem `ruff format --config ruff.toml .` z narzędzi
środowiska `.runs/quality-venv`, a skrypty Bash, które test ShellChecka wymienia
z nazwy, poleceniem `shfmt` z flagami `SHFMT_FLAGS` z
`tests/quality/format_support.py` i z `-w`. Komunikat porażki testu podaje oba
polecenia w pełnym brzmieniu dla komputera, na którym test biegnie. Nie dodawaj
do `ruff.toml` ustawień formatera ani komentarza, który formater wyłącza: test
`ruff-source-format` szuka takich komentarzy w tych samych plikach Pythona, które
czyta Ruff, więc nowy plik obejmuje bez zmiany konfiguracji. Nowy skrypt Bash
dopisz do listy w `tests/quality/test_quality_invariants.py`, tej samej, którą
czyta test ShellChecka. Wersje Ruffa i shfmt przypina `requirements-quality.txt`.

```good prettier-source-format tests/quality/guideline-format.mjs
export const values = [1, 2];
```

```bad prettier-source-format tests/quality/guideline-format.mjs
export const values=[1,2]
```

```good ruff-source-format tests/quality/guideline_format.py
VALUES = [1, 2]
```

```bad ruff-source-format tests/quality/guideline_format.py
VALUES=[1,2]
```

```bad ruff-source-format tests/quality/guideline_format.py
# fmt: off
VALUES = [1,   2]
# fmt: on
```

```good shfmt-source-format deploy/guideline-format
#!/usr/bin/env bash
if (($# != 0)); then
  printf '%s' "$1"
fi
```

```bad shfmt-source-format deploy/guideline-format
#!/usr/bin/env bash
if (( $# != 0 )); then
    printf '%s' "$1"
fi
```

### Dependency audit

- **Decision:** D-33
- **Invariant:** introduced-npm-vulnerabilities
- **Good:** Zmieniony plik blokady nie wnosi ostrzeżenia od poziomu low, którego nie było w `{fork-point}`.
- **Bad:** Nowa wersja zależności wnosi ostrzeżenie od poziomu low, którego nie było w `{fork-point}`.

Audyt porównuje plik blokady ze stanem z `{fork-point}` i oblewa każde
ostrzeżenie od poziomu low, którego tam nie było; plik taki sam jak w
`{fork-point}` przechodzi bez sieci.

### Recording a failure

- **Decision:** D-252 · D-253
- **Invariant:** none
- **Good:** none
- **Bad:** none

Awaria to sytuacja, w której produkt nie zrobił tego, o co go poproszono albo
co miał zrobić sam, z powodu innego niż spodziewana odmowa, także gdy zawiodła
usługa zewnętrzna. Spodziewana odmowa, taka jak błędne hasło, jest zwykłą
odpowiedzią i ta reguła jej nie dotyczy. Awarię zapisuj zawsze z przyczyną,
czyli z pierwotnym błędem, a nie z samym napisem, raz, tam gdzie kod ją
obsługuje. W kodzie Node.js robi to `writeFailure` z `src/server/log-line.ts`,
a porażkę bez pierwotnego błędu nazywa kodem `ReasonedFailure`.

Zdanie, którym polecenie serwisowe (`account-block`, `account-previous-save`,
`account-role`, `account-backup`) odpowiada operatorowi, nie jest wierszem logu (D-354). Wiersz
JSON awarii i zdanie po nim to jeden zapis awarii: zostaw oba i nie licz zdania
jako drugiego zapisu.

Inaczej jest z `account-database-check` i `measure-passwords`: to, co wypisują
przy awarii — zdanie w logu budowania obrazu i raport dla skryptu, który je
uruchomił — nie jest wierszem logu, tylko komunikatem dla tego, kto je uruchomił.
Żadne z nich nie działa na wartości gracza: `account-database-check` pracuje na
tymczasowej bazie, a `measure-passwords` na sztucznych hasłach. Ich błąd nie
cytuje więc wartości gracza, a awaria zostaje z treścią błędu i bez wiersza
awarii w postaci wierszy logu (z polami `failure`, `kind`, `code` i `place`);
raport `measure-passwords` zostaje takim, jaki jest.

Każdy osobno działający proces ma jedną obsługę ostatniej szansy, która zapisuje
to, czego nie obsłużył żaden kod (D-253). Procesy dotykające danych kont —
serwer, `account-block`, `account-previous-save`, `account-role` i
`account-backup` — mają własną, `installLastResort`, bo domyślny wypis mógłby zacytować wartości.
W skryptach uruchamianych ręcznie albo przez bramkę testów, które tych danych
nie dotykają, regułę spełnia domyślny wypis Node i Pythona, bo zapisuje to,
czego nikt nie obsłużył. Reguła obowiązuje też `deploy/loop2-deploy`, który nie
zostawia wiersza końcowego, gdy zostanie zabity.

### Hiding a failure

- **Decision:** D-252
- **Invariant:** none
- **Good:** none
- **Bad:** none

Awarii nie zamieniaj ani w odpowiedź „wszystko w porządku”, ani w pustą listę.
Tryb zdegradowany, w którym produkt działa dalej bez jednej funkcji, jest
dopuszczalny tylko tam, gdzie ustala go zadanie, zapisując go jako decyzję
produktu, i zawsze zostawia wiersz w logach.

### Identifiers in log lines

- **Decision:** D-252
- **Invariant:** none
- **Good:** none
- **Bad:** none

Wiersz przebiegu sprawy, czyli tego, co produkt robi dla jednej sprawy od żądania
albo zadania w tle do jej końca, niesie te identyfikatory z listy
`### Logging scope`, które łączą zdarzenia tej sprawy, każdy pod nazwą z listy,
tą samą w każdym wierszu, tak aby wyszukiwanie znalazło całą sprawę. W kodzie
Node.js stałe pola wiersza to `event` albo `failure`, `kind`, `code`, `place`
i identyfikatory z listy; dalsze pole, takie jak `linkPurpose`, jest polem,
a nie pozycją listy. W konsoli przeglądarki wiersz jest zwykłym tekstem,
a skrypty Bash zostają przy swoim tekście. Wiersz spoza przebiegu sprawy, taki
jak wiersz przy starcie procesu albo skryptu budowania, nie niesie żadnego
identyfikatora. Wiersz obsługi ostatniej szansy nie musi nieść żadnego, bo ta
obsługa zwykle nie wie, jaka to była sprawa.

### Business events

- **Decision:** D-252
- **Invariant:** none
- **Good:** none
- **Bad:** none

Każde zdarzenie biznesowe z listy `### Logging scope` zostawia wiersz logu.
W kodzie Node.js pisze go `writeEvent` z `src/server/log-line.ts`.

### Secrets and personal data

- **Decision:** D-252
- **Invariant:** none
- **Good:** none
- **Bad:** none

Logi nie zawierają żadnego sekretu, bez wyjątku, więc identyfikator będący
sekretem zostaje poza nimi, nawet gdyby stał na liście. Nie zawierają danych
osobowych; jedynym wyjątkiem od tego zakazu są identyfikatory z listy
`### Logging scope`. Kod nie zapisuje całego obiektu ani treści żądania, co nie
dotyczy samego błędu. Pierwotny błąd cytujący takie wartości zapisuj bez nich,
z jego rodzajem, kodem i miejscem w kodzie, a ta reguła ma pierwszeństwo przed
`### Recording a failure`. Dlatego z błędu czytaj tylko jego nazwę i kod oraz
numer `errcode` SQLite, nigdy `message` ani `stack`.

### Logging scope

- **Decision:** D-252
- **Invariant:** none
- **Good:** none
- **Bad:** none

Identyfikatory:

- `accountId` — numer konta.

Zdarzenia biznesowe:

- konto założone (`account-created`);
- logowanie (`signed-in`), także to po rejestracji;
- wylogowanie (`signed-out`);
- odnośnik wystawiony (`link-issued`);
- wiadomość wysłana (`message-sent`);
- adres potwierdzony (`email-confirmed`);
- hasło ustawione odnośnikiem (`password-set`);
- poprzedni zapis odłożony przez reset gry (`saved-game-reset`);
- konto zablokowane (`account-blocked`);
- konto odblokowane (`account-unblocked`);
- uprawnienie do poprzedniego zapisu nadane (`account-previous-save-granted`);
- uprawnienie do poprzedniego zapisu odebrane (`account-previous-save-revoked`);
- rola właściciela nadana (`account-owner-granted`);
- rola właściciela odebrana (`account-owner-revoked`);
- kopia bazy wykonana;
- wdrożenie.

Ta lista jest obietnicą produktu, a nie spisem jego kodu. Pozycja pasująca do
zasady z D-252 wchodzi w zmianie, która ją wnosi; agent dodaje ją sam, także
identyfikator rzeczy. Pozycja wskazująca na osobę, także numer, który produkt
nadaje użytkownikowi, wchodzi tylko za zgodą człowieka, jako nowe znaczenie.

### Size of a function and a file

- **Decision:** D-425
- **Invariant:** function-and-file-size
- **Good:** Zmiana sprowadza funkcję pod próg, przenosząc jej część do osobnej funkcji albo pliku, a przebieg reguły niczego o niej nie zgłasza.
- **Bad:** Zmiana dopisuje wiersze do funkcji albo pliku, które stoją już nad progiem, albo dopisuje wyjątek bez zmiany decyzji.

Progi i wyjątki stoją w D-425 i tu się ich nie powtarza. Test `tests/quality/test_function_and_file_size.py` uruchamia
`tests/quality/eslint-size-rules.mjs`, przebieg ESLint z samymi dwiema regułami
rozmiaru, osobny od przebiegu na `eslint.config.mjs` z `### Linter`, i gdy
oblewa, wymienia każdą funkcję i każdy plik nad progiem z miejscem i rozmiarem.
Dopóki jakiś kod stoi nad progiem, niezmiennik jest oznaczony jako naruszony,
a ten test jest oczekiwaną porażką; zmiana, która ostatni taki kod sprowadza
pod próg, zdejmuje oznaczenie. Konfiguracja tego przebiegu wymienia wyjątki
z decyzji i żadnych innych: nowy wyjątek albo wyższy próg to zaakceptowana przez
człowieka zmiana D-425. Kod, którego zmiana nie sprowadzi pod próg bez szkody,
zmiana zgłasza człowiekowi jako propozycję wyjątku i sama go nie wpisuje.
Zmiana, która dopisuje do funkcji lub pliku stojącego już nad progiem, zaczyna
się od przeniesienia ich części bez zmiany zachowania, przy przechodzących
testach, które to zachowanie pokrywają; dopiero potem dopisuje własny kod.
Przegląd każdej zmiany plików części z niezmiennika pilnuje, by oczyszczony plik
ani nowy plik nie przekroczył progu ponownie.

### Reformatting commits

- **Decision:** none
- **Invariant:** none
- **Good:** Przeformatowanie kodu, na przykład po podniesieniu wersji Ruffa albo shfmt, idzie osobnym commitem z samym wynikiem formatera, a jego hash trafia do `.git-blame-ignore-revs` w kolejnym commicie.
- **Bad:** Przeformatowanie wymieszane ze zmianą kodu albo commit przeformatowania bez wpisu w `.git-blame-ignore-revs`.

Commit, który tylko przeformatowuje kod, nie zawiera żadnej innej zmiany, a jego
hash dopisujesz do `.git-blame-ignore-revs` w późniejszym commicie, bo hash nie
może stać w commicie, który nazywa; inaczej `git blame` przy niemal każdej linii
wskazuje commit formatowania zamiast autora zmiany. Plik czyta GitHub, a
lokalnie jedno polecenie na klon, `git config blame.ignoreRevsFile
.git-blame-ignore-revs`, każe `git blame` pomijać wpisane commity.

## Examples

### PLW1510

Sprawdzenie powodzenia odczytu procesów jest przydatne przed użyciem stdout
do sprzątania. Nie każdy pomocniczy `subprocess.run` potrzebuje tego samego wzorca.

### I001

Porządek importów można poprawić dla czytelności; ta reguła nie blokuje zmiany.

### ISC004

Sąsiadujące literały w kolekcji mogą składać czytelną długą treść;
ujęcie ich w dodatkowe nawiasy pozostaje sugestią.

### UP031

Wybór zapisu interpolacji pozostaje przykładem, bez obowiązkowego przepisywania
działających literałów używających `%`.

### RUF059

Rozpakowanie wyniku z nazwanym nieużywanym elementem może objaśniać jego strukturę.

### PIE808

Jawny początek zakresu może ułatwiać odczyt granic iteracji.

### RUF007

Iterowanie po kolejnych parach przez `zip` może pozostać zamiast zamiany
na `itertools.pairwise`.

### RUF012

Współdzielone dane klasy mogą być celowe; sam komunikat nie nakazuje ich przebudowy.

### PLR0402

Zapis importu i aliasu może zachowywać czytelny kontekst modułu.

### FURB167

Krótki alias flagi wyrażenia regularnego, taki jak `re.S`, może pozostać
zamiast zamiany na dłuższą nazwę `re.DOTALL`.

### RUF100

Istniejące `noqa: E402` może pozostać, choć E402 nie jest w blokującym zestawie.

### SIM117

Zagnieżdżone konteksty mogą rozdzielać kroki przygotowania i sprzątania.

### FURB192

Odczyt pierwszego elementu posortowanej kolekcji może pozostać zamiast zamiany
na `min`.

### SIM102

Zagnieżdżone warunki mogą pokazywać dwa osobne etapy sprawdzania.

### Odłożone rodzaje kodu

Zasady testowania, wzorce według poziomów i przykład jawnego czasu określa
`guidelines/testing.md`.
Osobne wzorce budowania, wdrożenia, punktów uruchomienia, HTML i CSS są odłożone.
Wzorzec zapisu gry wskazuje rodzaj `saved-game`, a wzorzec poczty rodzaj
`mail-sending` w tabeli rodzajów.

## Where in code

- `package.json`
- `package-lock.json`
- `eslint.config.mjs`
- `prettier.config.mjs`
- `requirements-quality.in`
- `requirements-quality.txt`
- `ruff.toml`
- `.gitattributes`
- `.git-blame-ignore-revs`
- `scripts/audit_dependencies.py`
- `tests/quality/test_quality_invariants.py`
- `tests/quality/format_support.py`
- `tests/quality/test_format_support.py`
- `tests/quality/test_source_tool_scope.py`
- `tests/quality/eslint-rule-sets.mjs`
- `tests/quality/eslint-size-rules.mjs`
- `tests/quality/test_function_and_file_size.py`
