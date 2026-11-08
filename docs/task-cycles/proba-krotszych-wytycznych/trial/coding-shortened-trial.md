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

## Rules

### Linter

- **Decision:** D-29 · D-30 · D-31
- **Invariant:** eslint-source-rules · ruff-source-rules · shellcheck-source-rules
- **Good:** Nowe pliki spełniają blokujące reguły bez komentarzy wyciszających.
- **Bad:** Kod narusza blokującą regułę albo wycisza ją komentarzem lub w konfiguracji.

Przegląd każdej zmiany konfiguracji ESLint pilnuje według D-29 jej reguł
i zakresu plików.

Test wymienia skrypty po nazwie: nowy skrypt Bash dopisz do listy
w `tests/quality/test_quality_invariants.py`. Dyrektywa `# shellcheck disable=…`
działa, więc jej nie dodawaj; przegląd ją odrzuca.

Naprawiaj zgłoszenie w pliku, zamiast wyciszać blokującą regułę. Zmiana zestawu
wymaga zaakceptowanej przez człowieka zmiany odpowiedniej decyzji.

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

Nie dodawaj opcji do `prettier.config.mjs`.

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
początku zmiany; info nie blokuje.

### Recording a failure

- **Decision:** D-252 · D-253
- **Invariant:** none
- **Good:** none
- **Bad:** none

Awaria to sytuacja, w której produkt nie zrobił tego, o co go poproszono albo
co miał zrobić sam, z powodu innego niż spodziewana odmowa, także gdy zawiodła
usługa zewnętrzna. „Error cause chaining”, „log once, at the point that handles
it (no log-and-rethrow)”. W kodzie Node.js robi to `writeFailure`
z `src/server/log-line.ts`, a porażkę bez pierwotnego błędu nazywa kodem
`ReasonedFailure`.

Obsługa ostatniej szansy („last-resort handler”, D-253). Procesy dotykające
danych kont — serwer, `account-block` i `account-backup` — mają własną,
`installLastResort`, bo domyślny wypis mógłby zacytować wartości. Reguła
obowiązuje też `deploy/loop2-deploy`, który nie zostawia wiersza końcowego, gdy
zostanie zabity.

### Hiding a failure

- **Decision:** D-252
- **Invariant:** none
- **Good:** none
- **Bad:** none

„Fail loudly”. Tryb zdegradowany, w którym produkt działa dalej bez jednej funkcji, jest
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
a nie pozycją listy.

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

„Never log secrets”. „No personal data in logs”; jedynym wyjątkiem od tego
zakazu są identyfikatory z listy `### Logging scope`. Kod nie zapisuje całego obiektu ani treści żądania, co nie
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
- konto zablokowane (`account-blocked`);
- konto odblokowane (`account-unblocked`);
- kopia bazy wykonana;
- wdrożenie.

Ta lista jest obietnicą produktu, a nie spisem jego kodu.

## Examples

### PLW1510

### I001

### ISC004

### UP031

### RUF059

### PIE808

### RUF007

### RUF012

### PLR0402

### FURB167

### RUF100

### SIM117

### FURB192

### SIM102

### Odłożone rodzaje i formatowanie

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
- `scripts/audit_dependencies.py`
- `tests/quality/test_quality_invariants.py`
