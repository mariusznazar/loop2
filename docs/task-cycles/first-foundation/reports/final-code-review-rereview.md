# Scoped re-review of package configuration resolution

Range: `26661cd6a934a797062d096d856feec4548caffb..a4e7d032f187a444f732e65e89b2879c99acd2e5`.

**Verdict: original Important finding ADDRESSED; one new Important regression in the fix. Whole-branch approval remains With fixes.**

The immutable correction changes only `tests/invariants/test_application_package_layout.py`. HEAD matches the requested hash; the tracked working tree is clean, and `git diff --check` passes. No product edits, commits or HTTP runs were performed by this reviewer.

## Original finding: ADDRESSED

TypeScript's installed `--showConfig` resolves the declared inherited options, and the helper then resolves its returned relative paths against the leaf configuration's directory. Independently moved both configurations into a `configs/` subdirectory, adjusted the base-relative `rootDir`, `outDir` and `include` paths to preserve meaning, and left the root entry configurations with only `extends`. The application build exited 0 and the package invariant passed. Direct assertions confirmed the helper returned the original absolute `src/browser`, `dist/public`, `src/server` and `dist/server` locations. Thus rebasing works when the declaration and leaf live in different directories, not merely for sibling base files.

An actual second browser package at `apps/frontend` used `config/base.json` with `../src` and `../dist`, an extends-only leaf, a `browser` entry and a build script. Its own TypeScript compilation and the application build both exited 0. The package invariant failed at the intended final assertion: `apps/frontend/package.json defines a separate application package`. This is independent deliberate-break evidence; no build or setup error supplied the red result.

## Critical findings

None.

## Important findings

### 1. Effective-config helper now rejects valid unrelated tooling with inferred directories

**Severity:** Important / P2. **Thread:** new regression in this fix.

**Anchor:** `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_application_package_layout.py:137`; the new unconditional assertion is at line 69.

**Do wklejenia:** `has_browser_entry` wywołuje teraz obowiązkowy odczyt obu katalogów także dla niezależnego pakietu narzędziowego. Poprawny pakiet z `browser`, skryptem `tsc -p tsconfig.json` i domyślnym `rootDir` albo bez `outDir` kompiluje się, ale bramka odrzuca go na linii 69, zanim sprawdzi związek z aplikacją. Oddziel wymagania znanych konfiguracji aplikacji od rozpoznawania kandydatów i obsłuż domyślne katalogi albo zachowaj brak klasyfikacji tam, gdzie nie ma dowodu dodatkowego pakietu aplikacji.

**Dlaczego to zgłaszam:** Ten fragment ma rozpoznawać osobny pakiet przeglądarkowej części gry, nie zabraniać legalnych konfiguracji innych narzędzi. Przed poprawką kandydat bez jawnego `rootDir` lub `outDir` był pomijany. Po poprawce wspólny helper rzuca `AssertionError` i bezwarunkowo blokuje test. `tsc --showConfig` rozwija dziedziczenie, ale nie materializuje wszystkich domyślnych katalogów kompilatora jako tych dwóch pól; brak pola nie dowodzi niepoprawnej konfiguracji ani dodatkowego pakietu aplikacji.

Niezależny, poprawnie kompilujący się przykład w `tools/report`:

```json
// package.json
{"name":"report-tool","private":true,"browser":"./dist/main.js","scripts":{"build":"tsc -p tsconfig.json"}}
// tsconfig.json
{"compilerOptions":{"target":"ES2022","types":[],"outDir":"./dist"},"include":["main.ts"]}
```

`main.ts` leży bezpośrednio obok konfiguracji i zawiera tylko `export const report = 42;`. Nie kopiuje kodu gry, nie ma strony HTML ładującej wpis i nie ma przypisania do części aplikacji. Zainstalowany TypeScript kompiluje go z kodem 0. Test pakietu kończy się jedną asercją: `rootDir absent from effective TypeScript config`. Drugi legalny wariant ma `rootDir: "."`, nie ma `outDir`, kompiluje obok źródła i wskazuje `browser: "./main.js"`; także kompiluje się z kodem 0, lecz test kończy się `outDir absent from effective TypeScript config`. Oba błędy występują przez nową ścieżkę `has_browser_entry` → `config_directories`, więc są regresją poprawki, nie rozszerzeniem zakresu re-review.

Pierwsza próba kontrolna z pominiętym `rootDir`, ale źródłem w podkatalogu `src/`, nie była poprawnym przykładem dla zainstalowanego TypeScript 6: kompilator odrzucił ją jako TS5011. Nie używam tej próby jako dowodu findingu. Powyższe dwa warianty z plikiem w katalogu konfiguracji kompilują się naprawdę i dopiero potem ujawniają fałszywy alarm testu.

Poprawka powinna zachować skuteczny odczyt dziedziczenia dla obu konfiguracji aplikacji oraz dla rzeczywistego drugiego pakietu, a nie traktować braku zadeklarowanego katalogu w dowolnym narzędziu jako naruszenia granicy aplikacji. Koszt pozostawienia: legalne dodanie albo refaktoryzacja niezależnego narzędzia blokuje bramkę produktu. Koszt zmiany: rozróżnienie rygorystycznego odczytu znanych konfiguracji i rozpoznawania kandydatów albo poprawne wyznaczanie katalogów domyślnych, następnie powtórzenie tych wąskich kontroli.

## Minor findings

None.

## Independent verification

Each scenario used a fresh `support.TreeCopy`, initialized its own Git repository for real `check-attr`, and redirected only test support ROOT/file enumeration to that disposable copy. Added source/config files were included in the enumerated set. Copies were cleaned in `finally`; node_modules links used the existing helper's cleanup. No product state changed.

| Scenario | Independent compilation | Package invariant |
|---|---|---|
| Unchanged assessed product | Application build exit 0 | PASS, 1 test |
| Both bases relocated into `configs/`, extends-only leaves | Application build exit 0; four canonical directory assertions pass | PASS, 1 test |
| Actual second browser package with inherited directories | Nested compilation and application build exit 0 | Expected RED, one assertion naming second package |
| Unrelated tooling with explicit source/output directories | Nested compilation and application build exit 0 | PASS, 1 test |
| Unrelated tooling, root-level source, inferred rootDir | Nested compilation exit 0 | Unexpected RED, one assertion: missing rootDir |
| Unrelated tooling, output beside source, no outDir | Nested compilation exit 0 | Unexpected RED, one assertion: missing outDir |

Compiler invocation uses argument lists without a shell and the installed compiler script. No issue found with inherited declared path rebasing. The new issue is the assumption that resolved JSON necessarily contains every effective default, and the extension of that requirement to unrelated packages.

## Assessment and limits

The original whole-branch finding is closed by empirical evidence. Approval remains **With fixes** because the fix introduces the independent-tooling false positive above. The preceding whole-branch review otherwise stands; this scoped re-review does not invent a new whole-branch verdict over unread code. Full invariant gate, HTTP suite, ordinary npm suite and foundation guards were not rerun here. The already planned request-link replacement and final gates remain required. No additional out-of-scope behavior was set aside in this re-review.
