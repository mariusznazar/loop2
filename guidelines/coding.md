# Coding guidelines — loop2

- **Discipline:** coding
- **Applies to:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow

## When to read

Przed każdą zmianą kodu produktu, także skryptów i testów. Stosuj sprawdzenia
niezmienników wskazanych poniżej przez ich metody zapisane w fundamencie.
Wytyczne przyjmują szablony przypiętego the-way zgodnie z D-28.

## Kinds of code

| Kind | File | When to read |
|---|---|---|
| content-data | `guidelines/coding-content-data.md` | Przed dodaniem lub zmianą pliku danych treści gry w simulation. |
| simulation-module | `guidelines/coding-simulation-module.md` | Przed dodaniem lub zmianą modułu simulation poza danymi treści gry. |
| browser-module | `guidelines/coding-browser-module.md` | Przed dodaniem lub zmianą modułu browser-view w katalogu widoku. |
| http-application | `guidelines/coding-http-application.md` | Przed dodaniem lub zmianą pliku składającego aplikację HTTP w account-server. |

## Rules

### Linter

- **Decision:** D-29 · D-30 · D-31
- **Invariant:** eslint-source-rules · ruff-source-rules · shellcheck-source-rules
- **Good:** Nowe pliki spełniają blokujące reguły bez komentarzy wyciszających.
- **Bad:** Kod narusza blokującą regułę albo wycisza ją komentarzem lub w konfiguracji.

TS/JS aplikacji, skryptów i testów w browser-view, simulation, account-server
i build-tools sprawdza lokalny ESLint 10.12.0 z konfiguracją `eslint.config.mjs`:
`recommended` z @eslint/js 10.0.1, a dla TS również `recommendedTypeChecked`
z typescript-eslint 8.71.2, oba bez zmian. Parser używa API TypeScript 6.0.2
oraz globals 17.13.0; kompilator aplikacji pozostaje TypeScript 7. Konfiguracja
wyłącza komentarze konfiguracyjne w kodzie (`noInlineConfig`), a ESLint działa
z `--max-warnings 0`, więc każdy komentarz `eslint-disable` albo `/* eslint … */`
oblewa kontrolę. Konfiguracja nie ustawia własnych reguł, ignoruje tylko
zależności, pliki wygenerowane, submoduł i wyniki tymczasowe, a jej wzorce plików
obejmują każdy katalog z kodem tych części; obok niej nie stoi plik
`eslint-suppressions.json`. Tego pilnuje przegląd zmiany według
eslint-configuration-rules.

Python we wszystkich sześciu częściach z kodem sprawdza lokalny Ruff 0.17.1
z konfiguracją `ruff.toml`: 393 reguły z domyślnego zestawu 407 reguł bez preview
blokują, a czternaście wymienionych w Examples pozostaje przykładami. Ruff dostaje
ten plik wprost i `--ignore-noqa`, więc inna konfiguracja Ruffa w repozytorium
nie zmienia zestawu, a `# noqa` ani `# ruff: noqa` niczego nie wyciszają. Ruff
sprawdza pliki `.py` i `.pyi`; skrypt Pythona bez rozszerzenia pomija.

Samodzielne skrypty Bash we wszystkich częściach z kodem, również bez
rozszerzenia, sprawdza lokalny ShellCheck 0.11.0 z `--norc --shell=bash
--extended-analysis=true`: domyślne nieopcjonalne kontrole i każdy poziom
komunikatu, bez reguł przykładowych. Test wymienia skrypty po nazwie: nowy
skrypt Bash dopisz do listy w `tests/quality/test_quality_invariants.py`.
Dyrektywa `# shellcheck disable=…` działa, więc jej nie dodawaj; przegląd
ją odrzuca. Polecenia wewnątrz YAML i literałów testów nie są samodzielnymi
skryptami Bash.

Naprawiaj zgłoszenie w pliku, zamiast wyciszać blokującą regułę. Zmiana zestawu
wymaga zaakceptowanej przez człowieka zmiany odpowiedniej decyzji. Wersje
narzędzi przypinają deklaracje wskazane w Where in code; testy uruchamiają
lokalne kopie, bez pobierania narzędzia przy kontroli.

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

- **Decision:** D-32
- **Invariant:** prettier-source-format
- **Good:** Nowy plik ma układ pozostawiany przez Prettier z ustawieniami domyślnymi i końce linii LF.
- **Bad:** Nowy plik ma inny układ, końce linii CRLF albo komentarz `prettier-ignore`.

TS/JS aplikacji, skryptów i testów w browser-view, simulation, account-server
i build-tools oraz HTML/CSS przeglądarki sprawdza `--check` lokalnego Prettiera
3.9.10 z `--no-config --no-editorconfig --ignore-path .gitignore`: domyślne
ustawienia bez opcji eksperymentalnych, czyli dwie spacje, średniki, preferowane
podwójne cudzysłowy, docelowa szerokość 80 i LF. `.prettierignore` nie ukrywa
pliku. Edytor korzysta z `prettier.config.mjs`, który nie ustawia żadnej opcji,
więc formatuje tak samo; nie dodawaj do niego opcji. `.gitattributes` utrzymuje
LF również na Windows. Zakres obejmuje nowe pliki w katalogach wzorców testu,
bez historycznych wyjątków i bez komentarzy `prettier-ignore`, których pilnuje
przegląd; nie obejmuje Markdown, ikon, plików wygenerowanych, zależności,
submodułu i wyników tymczasowych.

```good prettier-source-format tests/quality/guideline-format.mjs
export const values = [1, 2];
```

```bad prettier-source-format tests/quality/guideline-format.mjs
export const values=[1,2]
```

### Dependency audit

- **Decision:** D-33
- **Invariant:** introduced-npm-vulnerabilities
- **Good:** Zmieniony plik blokady nie wnosi ostrzeżenia od poziomu low, którego nie było w `{fork-point}`.
- **Bad:** Nowa wersja zależności wnosi ostrzeżenie od poziomu low, którego nie było w `{fork-point}`.

Gdy `package-lock.json` jest taki sam jak w `{fork-point}`, audyt przechodzi
bez sieci. W przeciwnym razie `scripts/audit_dependencies.py` uruchamia lokalny
npm 12.2.1 (`npm audit --package-lock-only` przez publiczny rejestr npm) dla
bieżącego pliku blokady i dla jego wersji z `{fork-point}` i oblewa na każde
ostrzeżenie npm/GitHub Advisory Database od poziomu low, którego nie było na
początku zmiany; info nie blokuje. Audyt obejmuje zależności bezpośrednie,
pośrednie, produkcyjne, deweloperskie, opcjonalne i peer głównego pakietu npm;
drugi, zagnieżdżony pakiet npm nie jest audytowany.

Nieudane zapytanie albo nieczytelny raport nie dają pozytywnego wyniku. Nowe
ostrzeżenie może zmienić wynik dla tego samego pliku blokady. Próg nie zmienia
się automatycznie i nie ma terminu rewizji. Zapytanie wysyła nazwy i wersje
pakietów bez kodu aplikacji. Audyt nie obejmuje runtime, obrazów kontenerów,
pakietów systemowych ani zależności spoza npm.

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
Nie uprawnia to do wyciszenia reguły blokującej.

### SIM117

Zagnieżdżone konteksty mogą rozdzielać kroki przygotowania i sprzątania.

### FURB192

Odczyt pierwszego elementu posortowanej kolekcji może pozostać zamiast zamiany
na `min`.

### SIM102

Zagnieżdżone warunki mogą pokazywać dwa osobne etapy sprawdzania.

### Test z jawnym czasem

`tests/sim/time.test.mjs` pokazuje konkretne wejście i oczekiwany wynik bez
czekania na zegar. Test „1000 ms of real time moves the run on by one game minute”
wywołuje `passRealTime(sent(), 1000)` i sprawdza minutę 1 oraz resztę czasu 0.
Inne przypadki tego pliku obejmują przenoszenie ułamków sekundy i pauzę.
To przykład testu, bez osobnego formalnego rodzaju testów.

### Odłożone rodzaje i formatowanie

Automatyczne formatowanie Python i Bash pozostaje odłożone. Osobne wzorce testów
Node/Python, budowania, wdrożenia, punktów uruchomienia i HTML również są odłożone.
Wzorce sesji, zapisu gry i poczty powstaną przy pierwszych implementacjach.
Przed wyborem wzorca odłożonego istniejącego rodzaju porównuje się jego pliki.
Ogólne kontrole nadal obejmują cały przyjęty zakres kodu. Dla przyjętych linterów
obowiązują niezmienniki pełnej zgodności kodu, bez przejściowej kontroli
„nie pogarszaj starego kodu”.

## Where in code

- `package.json`
- `package-lock.json`
- `eslint.config.mjs`
- `prettier.config.mjs`
- `requirements-quality.in`
- `requirements-quality.txt`
- `ruff.toml`
- `.gitattributes`
- `scripts/audit_dependencies.py`
- `tests/quality/test_quality_invariants.py`
- `tests/sim/time.test.mjs`
