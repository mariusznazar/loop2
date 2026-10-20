# Coding guidelines — loop2

- **Discipline:** coding
- **Applies to:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow

## When to read

Przed każdą zmianą kodu produktu, także skryptów i testów. Stosuj sprawdzenia
niezmienników wskazanych poniżej przez ich metody zapisane w fundamencie.
Wytyczne przyjmują szablony przypiętego the-way zgodnie z D-28@f70f8d16.

## Kinds of code

| Kind | File | When to read |
|---|---|---|
| content-data | `guidelines/coding-content-data.md` | Przed dodaniem lub zmianą pliku danych treści gry w simulation. |
| simulation-module | `guidelines/coding-simulation-module.md` | Przed dodaniem lub zmianą modułu simulation poza danymi treści gry. |
| browser-module | `guidelines/coding-browser-module.md` | Przed dodaniem lub zmianą modułu browser-view w katalogu widoku. |
| http-application | `guidelines/coding-http-application.md` | Przed dodaniem lub zmianą pliku składającego aplikację HTTP w account-server. |

## Rules

### Linter

- **Decision:** D-29@cd8014d6 · D-30@19dcd3f6 · D-31@e3145b98
- **Invariant:** eslint-source-rules@01072719 · eslint-configuration-rules@6a43710f · ruff-source-rules@d7e3e90e · shellcheck-source-rules@007bded4
- **Good:** Nowe pliki spełniają blokujące reguły, a konfiguracja zachowuje przyjęty zestaw i zakres.
- **Bad:** Kod narusza blokującą regułę albo wycisza ją w źródle lub konfiguracji.

TS/JS aplikacji, skryptów i testów w browser-view, simulation, account-server
i build-tools sprawdza lokalny ESLint 10.12.0: `recommended` z @eslint/js 10.0.1,
a dla TS również `recommendedTypeChecked` z typescript-eslint 8.71.2 wraz
z odziedziczonymi nadpisaniami zgodności. Blokuje pełne 64 reguły JS i 92 aktywne
reguły TS, bez dodatkowych zestawów stylistycznych i bez reguł przykładowych.
Parser używa API TypeScript 6.0.2 oraz globals 17.13.0; kompilator aplikacji
pozostaje TypeScript 7. Konfigurację wskazuje `eslint.config.mjs`.

Python we wszystkich sześciu częściach z kodem sprawdza lokalny Ruff 0.17.1:
393 reguły z domyślnego zestawu 407 reguł bez preview blokują, a czternaście
wymienionych w Examples pozostaje przykładami. Metoda przekazuje listę wprost
i izoluje narzędzie od zewnętrznej konfiguracji. Dotychczasowe `noqa: E402`
nie wyłącza blokującej reguły tego zestawu.

Samodzielne skrypty Bash we wszystkich częściach z kodem, również bez
rozszerzenia, sprawdza lokalny ShellCheck 0.11.0: domyślne nieopcjonalne kontrole
i każdy poziom komunikatu, bez reguł przykładowych. Polecenia wewnątrz YAML
i literałów testów nie są samodzielnymi skryptami Bash.

Zakresy obejmują nowe ścieżki. Zależności, pliki wygenerowane, submoduł
i tymczasowe wyniki pracy są poza zakresem kodu produktu. Naprawiaj zgłoszenie
w pliku, zamiast wyciszać blokującą regułę komentarzem. Zmiana zestawu wymaga
zaakceptowanej przez człowieka zmiany odpowiedniej decyzji. Kontrola ESLint
sprawdza także faktyczne nazwy, poziomy, opcje reguł i pokrycie plików.
Ruff przekazuje przyjętą listę bezpośrednio, a ShellCheck pomija zewnętrzne rc
i opcje środowiska zmieniające zestaw; dyrektywy źródłowe nie mogą go osłabić.
Instalacja i lockfile są w deklaracjach wskazanych w Where in code;
metody korzystają z lokalnych wersji, bez pobierania narzędzia przy kontroli.

```good eslint-source-rules scripts/guideline-case.mjs
export function doubled(value) {
  return value * 2;
}
```

```bad eslint-source-rules scripts/guideline-case.mjs
export function doubled(value) {
  debugger;
  return value * 2;
}
```

Przypadki konfiguracji zastępują cały jej plik. Poprawny zachowuje zestaw
i zakres, błędny wyłącza jedną blokującą regułę na końcu konfiguracji.

```good eslint-configuration-rules eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import ts from "typescript";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
const ext = "{js,mjs,cjs,jsx,ts,mts,cts,tsx}";
const typed = "{ts,mts,cts,tsx}";
const dirs = ["src/browser", "src/server", "scripts", "tests/sim", "tests/view", "tests/quality"];
const source = [...dirs.map((dir) => `${dir}/**/*.${ext}`), "tests/http.test.mjs", "tests/startup.test.mjs", "eslint.config.mjs", "prettier.config.mjs"];
const typescript = dirs.map((dir) => `${dir}/**/*.${typed}`);
const excluded = ["**/node_modules/**", "**/dist/**", ".the-way/**", ".runs/**", ".superpowers/**"];
function program(configPath, includes, extraOptions = {}) {
  const config = ts.readConfigFile(fileURLToPath(new URL(configPath, import.meta.url)), ts.sys.readFile);
  if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, "\n"));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  if (parsed.errors.length) throw new Error("Invalid TypeScript configuration");
  return ts.createProgram({
    rootNames: ts.sys.readDirectory(root, [".ts", ".mts", ".cts", ".tsx"], excluded, includes),
    options: { ...parsed.options, noEmit: true, jsx: ts.JsxEmit.Preserve, ...extraOptions },
  });
}
const programs = [program("tsconfig.browser.json", ["src/browser/**/*"]), program("tsconfig.server.json", ["src/server/**/*"]), program("tsconfig.browser.json", ["scripts/**/*", "tests/**/*"], { types: ["node"] })];
export default [
  { ignores: excluded },
  { ...js.configs.recommended, files: source, languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({ ...config, files: typescript })),
  { files: typescript, languageOptions: { parserOptions: { programs, tsconfigRootDir: root } } },
  { files: [`src/browser/**/*.${ext}`], languageOptions: { globals: globals.browser } },
  { files: [`src/server/**/*.${ext}`, `scripts/**/*.${ext}`, `tests/**/*.${ext}`, "*.config.mjs"], languageOptions: { globals: globals.node } },
];
```

```bad eslint-configuration-rules eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import ts from "typescript";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
const ext = "{js,mjs,cjs,jsx,ts,mts,cts,tsx}";
const typed = "{ts,mts,cts,tsx}";
const dirs = ["src/browser", "src/server", "scripts", "tests/sim", "tests/view", "tests/quality"];
const source = [...dirs.map((dir) => `${dir}/**/*.${ext}`), "tests/http.test.mjs", "tests/startup.test.mjs", "eslint.config.mjs", "prettier.config.mjs"];
const typescript = dirs.map((dir) => `${dir}/**/*.${typed}`);
const excluded = ["**/node_modules/**", "**/dist/**", ".the-way/**", ".runs/**", ".superpowers/**"];
function program(configPath, includes, extraOptions = {}) {
  const config = ts.readConfigFile(fileURLToPath(new URL(configPath, import.meta.url)), ts.sys.readFile);
  if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, "\n"));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  if (parsed.errors.length) throw new Error("Invalid TypeScript configuration");
  return ts.createProgram({
    rootNames: ts.sys.readDirectory(root, [".ts", ".mts", ".cts", ".tsx"], excluded, includes),
    options: { ...parsed.options, noEmit: true, jsx: ts.JsxEmit.Preserve, ...extraOptions },
  });
}
const programs = [program("tsconfig.browser.json", ["src/browser/**/*"]), program("tsconfig.server.json", ["src/server/**/*"]), program("tsconfig.browser.json", ["scripts/**/*", "tests/**/*"], { types: ["node"] })];
export default [
  { ignores: excluded },
  { ...js.configs.recommended, files: source, languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({ ...config, files: typescript })),
  { files: typescript, languageOptions: { parserOptions: { programs, tsconfigRootDir: root } } },
  { files: [`src/browser/**/*.${ext}`], languageOptions: { globals: globals.browser } },
  { files: [`src/server/**/*.${ext}`, `scripts/**/*.${ext}`, `tests/**/*.${ext}`, "*.config.mjs"], languageOptions: { globals: globals.node } },
  { files: source, rules: { "no-debugger": "off" } },
];
```

```good ruff-source-rules tests/quality/guideline_case.py
VALUE = 1
```

```bad ruff-source-rules tests/quality/guideline_case.py
import os

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

- **Decision:** D-32@7eedf283
- **Invariant:** prettier-source-format@5a23ca31
- **Good:** Nowy plik ma układ pozostawiany przez przyjęty Prettier i końce linii LF.
- **Bad:** Nowy plik ma inny układ lub końce linii CRLF.

TS/JS aplikacji, skryptów i testów w browser-view, simulation, account-server
i build-tools oraz HTML/CSS przeglądarki formatuje lokalny Prettier 3.9.10.
Edytor i kontrola korzystają z `prettier.config.mjs`: przyjęte domyślne ustawienia
bez opcji eksperymentalnych to dwie spacje, średniki, preferowane podwójne
cudzysłowy, docelowa szerokość 80 i LF. `.gitattributes` utrzymuje LF również
na Windows. Zakres obejmuje nowe pliki, bez historycznych wyjątków; nie obejmuje
Markdown, ikon, plików wygenerowanych, zależności, submodułu i wyników tymczasowych.

```good prettier-source-format tests/quality/guideline-format.mjs
export const values = [1, 2];
```

```bad prettier-source-format tests/quality/guideline-format.mjs
export const values=[1,2]
```

### Dependency audit

- **Decision:** D-33@f820c28f
- **Invariant:** introduced-npm-vulnerabilities@da4f7801
- **Good:** Nowa dokładna wersja zależności nie ma pasującego ostrzeżenia od poziomu low.
- **Bad:** Nowa dokładna wersja zależności ma pasujące ostrzeżenie od poziomu low.

Lokalny npm 12.2.1 odczytuje bazę npm/GitHub Advisory Database przez publiczny
rejestr npm. Porównuj rzeczywiste pary nazwa pakietu–wersja z początkiem zmiany
`{fork-point}`. Audyt obejmuje wszystkie manifesty i lockfile npm w build-tools,
również nowe ścieżki, zależności bezpośrednie, pośrednie, produkcyjne,
deweloperskie, opcjonalne i peer. Dopasowuj konkretne ostrzeżenie i jego zakres
do wersji; poziomy low, moderate, high i critical blokują, info nie blokuje.

Niezmieniona para nie blokuje niezwiązanej pracy i nie sygnalizuje w niej swojej
podatności. Nowe ostrzeżenie może zmienić wynik dla tego samego commita
wprowadzającego wersję. Brak odpowiedzi oraz niepełne lub nieobsługiwane dane
nie dają pozytywnego wyniku. Bez sieci można przejść dopiero po pełnym poprawnym
porównaniu wykazującym brak wprowadzonych par. Próg nie zmienia się automatycznie
i nie ma terminu rewizji. Zapytanie wysyła nazwy i wersje pakietów bez kodu
aplikacji. Audyt nie obejmuje runtime, obrazów kontenerów, pakietów systemowych
ani zależności spoza npm.

Poniższy nowy plik dodaj obok istniejącego manifestu i lockfile danych testowych
w `tests/quality/fixtures/dependency-audit/`. Oba lockfile są odczytywane;
manifest dopuszcza wersję każdego przypadku. Nie instaluj tych danych testowych
jako pakietu aplikacji. Baza jest zmienna: wynik przypadków trzeba potwierdzić
w chwili sprawdzenia.

```good introduced-npm-vulnerabilities tests/quality/fixtures/dependency-audit/npm-shrinkwrap.json
{
  "name": "guideline-audit-fixture",
  "lockfileVersion": 3,
  "packages": {
    "": { "name": "guideline-audit-fixture", "dependencies": { "minimist": "^1.2.0" } },
    "node_modules/minimist": { "version": "1.2.8" }
  }
}
```

```bad introduced-npm-vulnerabilities tests/quality/fixtures/dependency-audit/npm-shrinkwrap.json
{
  "name": "guideline-audit-fixture",
  "lockfileVersion": 3,
  "packages": {
    "": { "name": "guideline-audit-fixture", "dependencies": { "minimist": "^1.2.0" } },
    "node_modules/minimist": { "version": "1.2.5" }
  }
}
```

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
Node/Python, budowania, wdrożenia, punktów uruchomienia, HTML i CSS również są odłożone.
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
- `.gitattributes`
- `scripts/check_eslint.py`
- `scripts/inspect_eslint.mjs`
- `scripts/check_ruff.py`
- `scripts/check_shellcheck.py`
- `scripts/check_format.py`
- `scripts/check_dependencies.py`
- `scripts/quality_support.py`
- `tests/quality/fixtures/dependency-audit/`
- `tests/sim/time.test.mjs`
