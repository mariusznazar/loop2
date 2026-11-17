---
title: "loop2: mapa części — granice zaufania i zależności z przeglądu fundamentu"
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the project note in the author's notes"
---

# loop2: mapa części — granice zaufania i zależności z przeglądu fundamentu

Status: ready for cycle
Project relation: independent

## Description

### Need

- Mapa części mówi, który plik należy do której części kodu, od czego część może zależeć i gdzie wchodzą dane spoza kontroli produktu. Przegląd fundamentu z 13.11.2026 znalazł miejsca, w których mapa nie odpowiada kodowi: przegląd zmiany nie dostaje polecenia sprawdzenia spreparowanego linku, skill do grania zależy od symulacji bez wpisu, a kilka plików stoi przy złej części.
- Decyzje zapadły w przeglądzie; propozycje stoją w the note of the review of the foundation of 2026-11-13 in the author's notes, sekcja 1.

### To do

1. F-15, widok — `src/browser/view/screen-address.ts`, `src/browser/view/email-confirmation.ts` i `src/browser/view/password-reset.ts` w *Trust boundary* części `browser-view`, z nowym niezmiennikiem tej granicy (wiersz 1 *Settlements to record*); istniejące testy tych trzech plików w `tests/view/` dostają jego znacznik i raz pokazaną porażkę, a tabela granic w `guidelines/testing.md` dostaje wiersz tej granicy.
2. F-15, wdrożenie — `compose.yaml`, `.github/workflows/deploy.yml`, `Dockerfile` i `deploy/cloudflared.Dockerfile` w *Trust boundary* części `deployment`. `deploy.yml` dostaje nowy niezmiennik (wiersz 2 *Settlements to record*), a testy odmowy w `tests/deploy/test_deploy_workflow.py` jego znacznik; `compose.yaml` i oba Dockerfile'e sprawdza przegląd każdej ich zmiany, a wiersz tabeli granic w `guidelines/testing.md` wymienia, co ten przegląd sprawdza: sekrety tylko jako pliki w `/run/secrets`, skąd pochodzą obrazy.
3. F-15 — `scripts/restore-trial.mjs` zostaje bez granicy zaufania.
4. F-16 — `simulation` w *Depends on* części `agent-workflow`, jako reguła: skill do grania składa stan gry z funkcji symulacji. Opis prośby o scalenie podaje ten powód i nazywa lukę testu `cross-part-imports`: nie widzi on `import()` ze ścieżką liczoną w kodzie, którym ładuje symulację `compose-state.mjs`.
5. F-33 — zdjąć `simulation` z *Depends on* części `account-server` (`browser-view` zostaje).
6. F-34 — `.gitattributes` z *Files* części `deployment` do *Files* części `build-tools`.
7. F-35 — `tests/invariants/account_container_support.py` z *Files* części `build-tools` do *Files* części `deployment`; `tests/deploy/test_restore_trial.py` zostaje w `deployment`.

### Questions to settle

- Jaka reguła odmowy i jaki niezmiennik niesie granica zaufania adresu strony w widoku (`screen-address.ts`, `email-confirmation.ts`, `password-reset.ts`)?
  - Answer: nowy niezmiennik części `browser-view`, mniej więcej: adres strony otwiera tylko ekran z listy D-281 albo najbliższy, a token z linku idzie bez zmian wyłącznie w treść swojego jednego żądania, gdzie ocenia go serwer; istniejące testy trzech plików dostają znacznik tego niezmiennika i raz pokazaną porażkę.
  - Not chosen:
    - oprzeć się na D-281 i niezmiennikach serwera `email-confirmation-link`, `password-reset-link` z *Part* rozszerzonym o `browser-view` — D-281 to decyzja, nie niezmiennik, a niezmienniki serwera mówią o serwerze, nie o widoku
    - granica sprawdzana przeglądem, czasowe odstępstwo jak D-76 — wymaga nowej decyzji odstępstwa, choć testy już są
    - nie dopisywać plików do mapy — odwraca decyzję przeglądu; przegląd zmian tych plików dalej nie dostaje polecenia sprawdzenia spreparowanego linku
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „1 a”
- Jaka reguła niesie granica zaufania plików wdrożenia (`compose.yaml`, `.github/workflows/deploy.yml`, `Dockerfile`, `deploy/cloudflared.Dockerfile`)?
  - Answer: `deploy.yml` z testem — nowy niezmiennik: dane spoza repozytorium docierają do skryptu wdrożenia tylko przez zmienne środowiska, a połączenie SSH sprawdza klucz serwera; istniejące testy odmowy w `tests/deploy/test_deploy_workflow.py` (m.in. `test_sha_reaches_the_script_only_through_env`, `test_ssh_is_strict_and_batch`, `test_exactly_the_five_secrets`, `test_decoded_key_is_never_printed`) dostają jego znacznik. `compose.yaml` i oba Dockerfile'e sprawdza przegląd każdej zmiany, a wiersz tabeli granic wymienia, co sprawdza.
  - Not chosen:
    - wszystkie cztery pliki tylko przeglądem — najtańsze, ale istniejące testy `deploy.yml` zostają niepowiązane z granicą i nic nie chroni ich przed usunięciem jako zbędnych
    - pełna reguła z „każdy obraz przypięty digestem” — `node:24-slim` łamie ją dziś, więc niezmiennik naruszony albo zmiana `Dockerfile` z ręcznym podbijaniem digestu, poza tym, co przegląd postanowił; wyklucza ją D-237: „The Node.js image stays unpinned.”
    - nie dopisywać plików do mapy — odwraca decyzję przeglądu; zmiany tych plików dalej nie dostają polecenia sprawdzenia danych z zewnątrz
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „2 b”
- Jak przenieść pliki z F-35, skoro `tests/deploy/test_restore_trial.py` importuje kod części `deployment`, a leży w katalogu, który cały należy do `deployment`?
  - Answer: przenieść tylko `tests/invariants/account_container_support.py` do `deployment`; `tests/deploy/test_restore_trial.py` zostaje w `deployment`, choć testuje plik `build-tools`.
  - Not chosen:
    - przenieść plik testu do innego katalogu i dopisać `deployment` do *Depends on* części `build-tools` — `build-tools` i `deployment` mogą wtedy wzajemnie importować swój kod, każdy plik, nie tylko ten test
    - przenieść plik testu i odciąć go od kodu `deployment`, wspólne pomocniki do `test-helpers` — więcej plików i blisko wariantu odrzuconego w przeglądzie (fikstury w `test-helpers`)
    - zostawić punkt jak w przeglądzie — cykl trafia na czerwoną bramkę i wybiera sam
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „3 a”
- Czy dopisanie `simulation` do *Depends on* części `agent-workflow` (F-16) zostaje, skoro szablon mapy mówi „*Depends on* is never rewritten to fit what the code reaches for today” (`.the-way/elements/part-map/template.md`, sekcja „Allowed dependencies”)?
  - Answer: zostaje jako świadoma reguła z jawnym powodem — skill do grania składa stan gry z funkcji symulacji; dokument i opis prośby podają powód, opis prośby nazywa lukę testu `cross-part-imports`.
  - Not chosen:
    - niezmiennik „agent-workflow nie zależy od simulation” oznaczony jako naruszony — jego test nie widzi tego importu, więc oczekiwana porażka nigdy się nie pojawi i wpis niczego nie pilnuje
    - przenieść składanie stanu do `scripts/`, a skill tylko je wywołuje — ok. 70 linii i oba pliki `SKILL.md` (Claude Code i Codex)
    - dopisać bez powodu — następna sesja przeczyta to jako wyrównanie mapy do kodu, czego szablon zabrania
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „4 a”

## Context

- Dane przeglądu: the note of the review of the foundation of 2026-11-13 in the author's notes — F-15, F-16, F-33, F-34, F-35. Zmiany mapy idą skillem `the-way-update-part-map`.
- `guidelines/testing.md:157-164` (fc00c406): każda granica zaufania z mapy ma regułę odmowy i przynajmniej jeden stały test odmowy, oznaczony niezmiennikiem i raz widziany z porażką; granicę będącą wyłącznie konfiguracją cudzej usługi sprawdza przegląd każdej jej zmiany.
- Testy `tests/view/screen-address.test.mjs`, `tests/view/email-confirmation.test.mjs`, `tests/view/password-reset.test.mjs` i `tests/deploy/test_deploy_workflow.py` nie mają dziś żadnego znacznika `invariant:` (fc00c406).
- `src/browser/view/password-reset.ts:8` (fc00c406): „the server's refusal is the one place that judges a token” — `readResetToken` i `readConfirmationToken` (`email-confirmation.ts:40`) oddają token bez oceny.
- `Dockerfile` bierze obraz `node:24-slim` bez przypiętego digestu; `deploy/cloudflared.Dockerfile` przypina wersję i digest (fc00c406).
- `.claude/skills/loop2-play/compose-state.mjs:9-14` i kopia w `.agents/skills/loop2-play/` ładują zbudowane pliki `dist/browser/sim/` przez `import()` ze ścieżką liczoną w kodzie; `tests/invariants/test_cross_part_imports.py:33-35` wymienia to w „Does NOT cover”.
- Pliki części `account-server` nie importują niczego z symulacji (grep przy fc00c406).
- `tests/deploy/test_restore_trial.py:35-37` importuje `tests.deploy.test_account_storage` i `tests.invariants.account_container_support`; `cross-part-imports` czyta importy Pythona (`tests/invariants/test_cross_part_imports.py:20`), a *Depends on* części `build-tools` nie wymienia `deployment`.
- Wzorce *Files* dopasowuje git jak atrybuty, bez wykluczeń (`.the-way/elements/common/foundation_check.py:604-640`): plik pod `tests/deploy/**` przypisany drugiej części daje błąd „claimed by two parts”.
- Pliki importujące `account_container_support.py` należą wszystkie do `deployment` (`tests/deploy/**`, `tests/invariants/test_loop2_container_icons.py`, `test_loop2_container_sprites.py`, `test_loop2_one_serving_process_container.py`; fc00c406).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-281 — How does an address name a screen? „An address names a screen in the fragment after `#`: `#/`, `#/postac/{n}`, `#/mapy`, `#/mapy/{map}`, `#/programy`, `#/programy/{n}` and `#/postac/{n}/przejscie`, {n} being the number of a character (D-56) or of a program (D-165), {map} the identifier of a map (D-332) and the last address naming a map run by the number of its character, and an address that leads to no existing screen silently opens the nearest one: `#/postac/{n}/przejscie` with no map run the screen Postać of that character, `#/programy/{n}` with no such program `#/programy`, and any other Siedziba, the address of a map that is not on the list of open maps included. The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself. The fragments of emailed links (D-156, D-224) stand apart from these, and after them the page opens Siedziba.”
- D-210 — What does the server do with a save of the game state of a lower version than the one it holds? „The server refuses a save of the game state whose version of the shape is lower than the version of the saved game state it holds, comparing that number before the basis of D-209 and reading nothing of the game. The tab whose save it refuses so shows „Gra została zaktualizowana. Odśwież stronę.” in `warning` on the header line of D-208 and saves nothing more, while the game stays on its screen.”
- D-32 — How is web code formatted? „All application, script and test TypeScript and JavaScript in browser-view, simulation, account-server and build-tools and browser HTML and CSS pass `--check` of local pinned Prettier 3.9.10 run with `--no-config --no-editorconfig --ignore-path .gitignore`: its default nonexperimental options — two spaces, semicolons, preferred double quotes, target width 80 and LF on every platform — with no ignore file of its own able to hide a file; Markdown, icons, generated files, dependencies, the submodule and temporary work results are excluded. The editor's `prettier.config.mjs` sets no option, narrow repository attributes preserve LF for that scope on Windows, and review keeps the check's file patterns to that scope and `prettier-ignore` comments out of covered code.”
- D-46 — Which fonts does the browser view use, and where do they come from? „The fonts of the browser view are Geist and Geist Mono, whose web-font files and licence file are taken from a release of github.com/vercel/geist-font into `assets/fonts/`, outside the directory the account and save server serves, and copied into that directory when the application is built. The game loads fonts only from those files, never from another server, and sets the chronicle and the clock of the map run in Geist Mono and every other text in Geist.”
- D-09 — How does a change reach the server? „A push to the deploy branch starts an automation that tells the server to build the game and its account server from that commit; the server pulls the code from GitHub itself, and the automation's key can only start a rebuild of a commit that belongs to that branch.”
- D-10 — How do players reach loop2 on the server? „Players reach loop2 at `https://loop2.mariusznazar.com/` through an encrypted remotely managed Cloudflare Tunnel, whose `cloudflared` connector is a second service of the loop2 Compose project with its own memory limit and forwards internally to `http://app:3000`. The application publishes no host port, and the tunnel's published hostname replaces loop2's proxied AAAA record, Origin Rule and Configuration Rule. Deployment pins the official connector image by version and digest, uses HTTP/2 over IPv4, and waits for both application health and an active connector connection before reporting success.”
- D-11 — Which branch deploys loop2 to the test server? „The deploy branch is `main`: a push to `main`, the merge of a pull request included, reaches the test server without anyone starting it by hand, deployed itself or within a later commit of `main` that contains it.”
- D-351 — How does loop2 keep the imports of its parts within the dependencies its part map allows? „One invariant keeps every import of loop2's code within its part map, and its test counts as a test every file git tracks under `tests/`, helpers and stand-ins included, so that only a file outside `tests/` is kept from importing the part of test helpers. The test reads the imports of TypeScript, JavaScript and Python files, and no process that one file starts from another and no HTML or CSS: in TypeScript and JavaScript `import` and `export … from` statements and `import()` with a string literal, in Python `import` and `from … import` statements and a directory added to `sys.path`. A relative import that the test cannot match to a file git tracks fails it, with the file and the line, an import of a built file under `dist/` is matched to its source under `src/`, and a package or a module from outside the repository is the file of no part.”

## Settlements to record

Candidates: 2 shown, 2 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Adres strony otwiera tylko ekran z listy D-281 albo najbliższy, a token z linku idzie bez zmian wyłącznie w treść swojego jednego żądania, gdzie ocenia go serwer. | invariant | *Questions to settle*, pytanie o granicę adresu strony w widoku („1 a”) | czym oznaczyć testy trzech plików widoku i co wpisać w wiersz tabeli granic — albo zostawić granicę bez reguły |
| 2 | Dane spoza repozytorium docierają do skryptu wdrożenia w `deploy.yml` tylko przez zmienne środowiska, a połączenie SSH sprawdza klucz serwera. | invariant | *Questions to settle*, pytanie o granicę plików wdrożenia („2 b”) | które testy `test_deploy_workflow.py` są testami odmowy granicy i czy `deploy.yml` sprawdza test, czy przegląd |

## Out of scope

- Przeniesienie fikstur testów do `test-helpers` i wzorzec ścieżek zamiast listy testów niezmienników (F-35, wariant odrzucony).
- Przeniesienie `tests/deploy/test_restore_trial.py` do części `build-tools` (pytanie o F-35).
- Przypięcie obrazu `node:24-slim` digestem — wyklucza je D-237: „The Node.js image stays unpinned.”
