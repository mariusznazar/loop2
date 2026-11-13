---
title: "loop2: linter i formater obejmują wszystkie pliki testów, test kompletności zakresu"
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the author's project note of the Loop project"
---

# loop2: linter i formater obejmują wszystkie pliki testów, test kompletności zakresu

Status: ready for cycle
Project relation: independent

## Description

### Need

- D-29 i D-32 mówią, że każdy plik TypeScript i JavaScript czterech części kodu — widoku, symulacji, serwera kont i narzędzi budowania — przechodzi ESLint z zestawem reguł `recommended` i `--check` Prettiera. Dziewięć plików testów w katalogu głównym `tests/` jest poza wzorcami obu narzędzi, więc błąd, który linter łapie zwykle (nieużyta zmienna, stała w warunku), przechodzi w nich bramkę bez sygnału.
- Każdy nowy plik TS/JS położony w `tests/` poza podkatalogami `sim`, `view` i `quality` wypada tak samo, bo wzorce wymieniają katalogi i pliki z nazwy.
- Niezmienniki `eslint-source-rules` i `prettier-source-format` wiążą zakres z konfiguracją narzędzi, nie z decyzją, więc tej luki nie widzą; D-29 i D-32 zostawiają pilnowanie wzorców przeglądowi, który luki nie zauważył.
- Decyzja zapadła w przeglądzie fundamentu z 13.11.2026 (wariant b propozycji F-9): wzorce obejmują dziewięć plików, oba niezmienniki mówią o zakresie decyzji, a test porównuje wzorce narzędzi z mapą części.

### To do

1. Zestaw reguł D-29 — `recommended` z @eslint/js, a dla TypeScriptu także `recommendedTypeChecked` — obejmuje w `eslint.config.mjs` każdy plik TS/JS części browser-view, simulation, account-server, build-tools i deployment według mapy części. Dziś są poza nim: `tests/transport.test.mjs`, `tests/passwords.test.mjs`, `tests/account-storage.test.mjs`, `tests/account-backup.test.mjs`, `tests/account-database-check.test.mjs`, `tests/account-database-check-standin.mjs`, `tests/account-mail.test.mjs`, `tests/account-api.test.mjs`, `tests/password-measurement.test.mjs` oraz `tests/deploy/restore-trial-docker-standin.mjs` (część deployment).
2. Wzorce `PRETTIER_PATTERNS` w `tests/quality/test_quality_invariants.py` i reguły LF w `.gitattributes` obejmują te same pliki.
3. Niezmienniki `eslint-source-rules` i `prettier-source-format` mówią o zakresie decyzji — każdym pliku TS/JS pięciu części z punktu 1, według mapy części — a test zatrzymuje bramkę, gdy plik zakresu nie dostaje zestawu reguł D-29, nie pasuje do wzorców testu Prettiera albo nie ma w `.gitattributes` końca linii LF.
4. D-29 i D-32 obejmują pięć części z punktu 1 i mówią, że wzorce plików trzyma przy zakresie test, nie przegląd; ich *Verification* zgadza się z nowym brzmieniem niezmienników.
5. Akapit sekcji „Linter” w `guidelines/coding.md`, który mówi, że wzorce `eslint.config.mjs` pilnuje przegląd każdej zmiany konfiguracji, mówi, że pilnuje ich test.

### Acceptance criteria

- Test z punktu 3, uruchomiony na konfiguracji sprzed zmiany, nie przechodzi i wymienia dziesięć plików z punktu 1.

### Questions to settle

- 1. Które pliki TS/JS obejmuje linter i formater: cztery części kodu, jak dziś mówią D-29 i D-32, czy także pliki części wdrożenia albo całe repozytorium?
  - Answer: cztery części kodu i część wdrożenia (deployment): cały katalog `tests/` bez wyjątku, bez poprawek w plikach; poza zakresem zostają tylko skrypty skilla do grania. Zmienia D-29 i D-32.
  - Not chosen:
    - same cztery części, jak dziś w D-29 i D-32 — `tests/deploy/restore-trial-docker-standin.mjs` zostaje poza zakresem, tytuł „wszystkie pliki testów” byłby nieprawdziwy, a nowy plik TS/JS części wdrożenia przechodzi bramkę bez sprawdzenia
    - całe repozytorium — poprawki skryptów skilla do grania w dwóch kopiach, wyjątek albo zmiana kształtu `frames.js` i sprawdzenie skilla w prawdziwej przeglądarce; ryzyko i robota bez zysku dla gry
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „b”

## Context

- Dane przeglądu: the author's note of the review of the foundation of 2026-11-13 — F-9 (lista dziewięciu plików, miejsca w konfiguracji, wybór wariantu b).
- Pomiar z 13.11.2026 na commicie `fc00c406`: dziewięć plików przechodzi zestaw `recommended` ESLint bez żadnego zgłoszenia i stoi tak, jak zostawia je Prettier; w indeksie gita mają końce linii LF. Zmiana kodu sprowadza się więc do konfiguracji i testu, bez poprawek w plikach testów.
- ESLint już dziś odwiedza te pliki: obiekt `tests/**` w `eslint.config.mjs:102-109` daje im same zmienne globalne Node, bez reguł. Test, który pyta tylko, czy ESLint plik odwiedza, przeszedłby na dzisiejszej konfiguracji; pytać trzeba, czy plik dostaje reguły.
- Funkcja `file_owners` w `tests/invariants/loop2_invariant_support.py:73` przypisuje każdemu plikowi śledzonemu przez git jego część z mapy części; korzysta z niej test `cross-part-imports` (D-351).
- Podobny test kompletności już jest: `tests/quality/test_node_test_selection.py` sprawdza, że każdy plik `*.test.mjs` wchodzi do `npm test`, pytając samo narzędzie zamiast odtwarzać składnię wzorców.
- `tests/deploy/restore-trial-docker-standin.mjs` też przechodzi już dziś zestaw `recommended` ESLint i Prettier; część deployment nie ma innych plików TS/JS.
- Poza zakresem zostają skrypty `compose-state.mjs`, `frames.js` i `save-frames.mjs` skilla do grania, każdy w dwóch kopiach, `.claude/skills/loop2-play/` i `.agents/skills/loop2-play/` (część agent-workflow; `compose-state.mjs` ma nieużytą stałą, a `frames.js` to nie moduł, tylko ciało funkcji dla `playwright-cli run-code`, które Prettier przeformatowałby).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- **D-29** — Which rules check TypeScript and JavaScript? Zdanie wiążące: „Every application, script and test TypeScript and JavaScript file of browser-view, simulation, account-server and build-tools passes local pinned ESLint 10.12.0 run with `--max-warnings 0` on `eslint.config.mjs`, which applies @eslint/js 10.0.1 `recommended` and, for TypeScript, typescript-eslint 8.71.2 flat `recommendedTypeChecked` unchanged […]; review, in place of a check of the effective configuration, keeps its rules to those sets and its file patterns to that scope.” *Verification*: „invariants: eslint-source-rules. […] complies: a change to `eslint.config.mjs` that adds the file pattern of a new directory of code in that scope”. *Rejected* (fragment): „product-written checks comparing the effective configuration with a frozen rule list and parsing inline directives — far more code to keep than the tool's own setting and a reviewed configuration.”
  - Zmiana, którą robi zadanie: zakres obejmuje także część deployment, w zdaniu wiążącym i w *Scope* (pytanie 1); wzorce plików trzyma przy zakresie test, nie przegląd (wariant b F-9); reguły zostają przy przeglądzie. Test pyta ESLint o reguły, które dostaje każdy plik zakresu, i porównuje je z zestawem samego @eslint/js i typescript-eslint, nie z listą zamrożoną w produkcie, więc odrzucona w *Rejected* kontrola zamrożonej listy reguł zostaje odrzucona. *Verification* zgodne z nowym brzmieniem `eslint-source-rules`.
- **D-32** — How is web code formatted? Zdanie wiążące: „All application, script and test TypeScript and JavaScript in browser-view, simulation, account-server and build-tools and browser HTML and CSS pass `--check` of local pinned Prettier 3.9.10 […] narrow repository attributes preserve LF for that scope on Windows, and review keeps the check's file patterns to that scope and `prettier-ignore` comments out of covered code.” *Scope*: browser-view, simulation, account-server, build-tools, deployment.
  - Zmiana, którą robi zadanie: zdanie wiążące wymienia TypeScript i JavaScript także części deployment, którą *Scope* już ma (pytanie 1); wzorce testu i atrybuty LF trzyma przy zakresie test, nie przegląd (wariant b F-9); komentarze `prettier-ignore` zostają przy przeglądzie. *Verification* zgodne z nowym brzmieniem `prettier-source-format`.
- **D-28** — Which coding-guideline discipline does loop2 adopt? „The general coding quality checks cover all code, tests included […]”. Zadanie tego nie zmienia; to zdanie jest powodem, dla którego testy w ogóle są w zakresie.
- **D-83** — Where are tests written and how do they enter the gate? *Rejected*: „inclusion by review alone — depends on a reviewer noticing an omitted file.” Zadanie tego nie zmienia; to ten sam powód, dla którego wzorce przechodzą z przeglądu na test.

## Settlements to record

Candidates: 3 shown, 3 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Linter i formater obejmują pliki TS/JS czterech części kodu i części wdrożenia; zmienia D-29 i D-32. | decision | *Questions to settle*, pytanie 1 (wybór człowieka; inne drogi w *Not chosen*) | czy plik pomocniczy testów wdrożenia i skrypty skilla wchodzą do zakresu |
| 2 | Wzorce plików ESLint, Prettiera i atrybuty LF trzyma przy zakresie decyzji test, nie przegląd; test pyta ESLint o reguły każdego pliku i porównuje je z zestawem samego @eslint/js i typescript-eslint, nie z listą zamrożoną w produkcie; zmienia D-29 i D-32. | decision | wybór wariantu b F-9 w the author's note of the review of the foundation of 2026-11-13 (wybór człowieka; wariant a: „wpisy zostawić, poprawić kod” — zostawia nowy plik spoza wzorców bez sygnału); doprecyzowanie o zestawie reguł — *Decisions in play*, D-29 | czy zostawić pilnowanie wzorców przeglądowi i czy test może czytać konfigurację ESLint, którą D-29 odrzuca w *Rejected* |
| 3 | Niezmienniki `eslint-source-rules` i `prettier-source-format` mówią o zakresie decyzji według mapy części, nie o wzorcach konfiguracji. | invariant | wybór wariantu b F-9 w the author's note of the review of the foundation of 2026-11-13 (wybór człowieka) | brzmienie niezmienników i to, co sprawdza ich test |

## Out of scope

- Lista skryptów Bash wymienianych po nazwie w teście `shellcheck-source-rules` (D-31) zostaje bez zmian — przegląd fundamentu zostawił ją świadomie (G-10).
- Zestaw reguł ESLint i opcje Prettiera zostają bez zmian.
