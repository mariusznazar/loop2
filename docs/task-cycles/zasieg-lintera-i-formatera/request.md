**State: ready** — the change is made, reviewed twice and the full test run passes; two items below ask whether you want something done in this request, and nothing else waits for you.

## What you will see

Before this change, ten test files of the game (nine in the main test directory and one helper of the deployment tests) were never checked by the code checker (ESLint) or the code formatter (Prettier). A mistake that the checker usually catches, such as an unused variable, passed the gate in those files without a signal. A new test file put in the main test directory would have been left out the same way, because the checks listed directories and files by name.

After this change the checker and the formatter cover every script file under the whole test directory, as you decided, and the files already pass them without any edit. A new test, run with the other tests, stops the gate when a script file of the game's five code areas (the browser view, the simulation, the account server, the build tools and the deployment) is not reached by the checker with its standard rules, is not covered by the formatter's check, or has no fixed line ending in the repository's attributes. The new test fails on the old setup and names exactly the ten files. The two rules that describe this, and the two decisions behind them, now say that a test keeps the lists of files, and review keeps the rules themselves.

### Underneath

The checker's file list, the formatter's pattern list and the line-ending rules now take the whole test directory; the new test asks ESLint, Prettier and git what each file receives and compares it with what the tools' own published rule sets give, so the product keeps no frozen rule list.

## For you to decide

### Needed from you

none

### Fix or let through

1. The review of the whole change did not read everything it had selected. The change touches only the checking and formatting setup, and the reviewer read 10 of the 386 decisions it selected in full and ran through 79 more by title; the other 297 decisions are about the game, the browser and the server and it judged them by topic without scanning their titles. If one of them bears on this change, the cost shows up later, when someone relies on a rule the review did not see. A fresh reviewer reading what stayed unread costs another review round (about 8 minutes on a model like the first reviewer's), and letting it through costs nothing today. I recommend letting it through, since the 297 decisions concern the game's own behaviour, not the checks, and the reviewer read whole every decision about linting, formatting, the test gate and the part map. Have the rest read in this request, make a task of it, or let it through?

2. One rule about imports between code areas has a gap that this change does not touch and does not close: the fact it rests on has been left as a bare note since 8 November, and a person has to name it. This request carries the item for as long as the gap stands; nobody is hurt by it today, but the rule stays without a stated foundation. Writing the fact here would take your naming it and one more round of review; making a task of it leaves the gap standing; letting it through accepts it on the main branch. I recommend making a task of it, since the change here has nothing to do with imports. Write the fact in this request, make a task of it, or let it through?

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. The first of the four commits is red on its own: it adds the new test before the configuration change, so that the history keeps the proof that the test fails on the old setup and names the ten files. The price is that anyone who searches the history for a bad commit by stepping through it will stop on that one; a merge that keeps the commits (below) keeps it, and I chose it over a single commit, which would lose the proof.

4. The checker and the formatter now take any script file anywhere under the test directory, including directories that belong to other areas of the game, and not only the ten files. A future script file placed there, for example among the work-process tests, will be held to the same checker and formatter. I chose this because you decided "the whole test directory, without exception", and not nine names plus one directory, which would need an edit for every new file; the price is only that those files are held to a standard that is already met by every file there today.

5. Changed tests that keep the rules in place: a new test file in the quality tests (with a small helper script) now checks the three things above for every script file of the five code areas, and the existing quality test now shares the formatter's flags and patterns with it, so there is one list. The new test also requires git's text attribute to be on beside the LF ending, which is slightly stricter than git itself and matches the repository's convention. No invariant is marked violated and no surface changes.

## Cost

The orchestrator and five agent turns ran for about 33 minutes of working time, plus two full test runs of about 20 to 25 minutes each, all on one model class (Claude Sonnet 5.5), using about 24.6 million tokens in all (23.7 million of them cached input; 140 thousand output). Review rounds: the whole change once (PASS with two Minor findings), then one fix of those two findings with one review of the fix (PASS). The [table of stages](https://github.com/mariusznazar/loop2/blob/<RECORD_SHA>/docs/task-cycles/zasieg-lintera-i-formatera/stages.md) is in the committed record.

## How to merge

Merge with a merge commit that keeps the four commits, since the link to the record and the history of the failing first run survive only then; a squash or rebase would lose both.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — zmiana jest zrobiona, dwa razy sprawdzona, a pełny przebieg testów przechodzi; dwie pozycje poniżej pytają, czy chcesz coś zrobić w tym requeście, i nic więcej na Ciebie nie czeka.

## Co zobaczysz

Przed tą zmianą dziesięć plików testów gry (dziewięć w głównym katalogu testów i jeden pomocniczy od testów wdrożenia) nie podlegało sprawdzaniu przez linter (ESLint) ani formater (Prettier). Błąd, który linter zwykle łapie, na przykład nieużyta zmienna, przechodził w tych plikach przez bramkę bez sygnału. Nowy plik testu położony w głównym katalogu testów wypadłby tak samo, bo sprawdzenia wymieniały katalogi i pliki z nazwy.

Po tej zmianie linter i formater obejmują każdy plik skryptowy w całym katalogu testów, tak jak zdecydowałeś, a obecne pliki przechodzą je bez żadnej poprawki. Nowy test, uruchamiany razem z pozostałymi, zatrzymuje bramkę, gdy plik skryptowy pięciu obszarów kodu gry (widoku w przeglądarce, symulacji, serwera kont, narzędzi budowania i wdrożenia) nie dostaje od lintera jego standardowych reguł, nie obejmuje go sprawdzenie formatera albo nie ma ustalonego końca linii w atrybutach repozytorium. Nowy test na dawnej konfiguracji nie przechodzi i wymienia dokładnie te dziesięć plików. Dwie reguły opisujące to i dwie decyzje za nimi mówią teraz, że listy plików trzyma test, a same reguły trzyma przegląd.

### Pod spodem

Lista plików lintera, wzorce formatera i reguły końca linii obejmują teraz cały katalog testów; nowy test pyta ESLint, Prettiera i gita, co dostaje każdy plik, i porównuje to z tym, co dają opublikowane zestawy reguł samych narzędzi, więc produkt nie trzyma zamrożonej listy reguł.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Poprawić albo przepuścić

1. Przegląd całej zmiany nie przeczytał wszystkiego, co sobie wybrał. Zmiana dotyka tylko ustawień sprawdzania i formatowania, a recenzent przeczytał w całości 10 z 386 wybranych decyzji i przejrzał po tytułach jeszcze 79; pozostałe 297 decyzji dotyczy gry, przeglądarki i serwera, więc ocenił je po temacie, bez przeglądania tytułów. Gdyby któraś z nich dotyczyła tej zmiany, koszt wyjdzie później, gdy ktoś oprze się na regule, której przegląd nie zobaczył. Świeży recenzent czytający resztę kosztuje jeszcze jedną rundę przeglądu (około 8 minut na modelu takim jak pierwszy recenzent), a przepuszczenie nie kosztuje dziś nic. Polecam przepuścić, bo te 297 decyzji dotyczy zachowania samej gry, nie sprawdzeń, a recenzent przeczytał w całości każdą decyzję o lintowaniu, formatowaniu, bramce testów i mapie części. Przeczytać resztę w tym requeście, zrobić z tego zadanie czy przepuścić?

2. Jedna reguła o importach między obszarami kodu ma lukę, której ta zmiana nie dotyka i nie zamyka: fakt, na którym reguła stoi, zostaje gołą notatką od 8 listopada i musi go nazwać człowiek. Ten request niesie pozycję tak długo, jak luka stoi; dziś nikomu to nie szkodzi, ale reguła zostaje bez podanej podstawy. Zapisanie faktu tutaj wymaga, żebyś go nazwał, i jeszcze jednej rundy przeglądu; zadanie zostawia lukę; przepuszczenie przyjmuje ją na głównej gałęzi. Polecam zrobić z tego zadanie, bo zmiana tutaj nie ma nic wspólnego z importami. Zapisać fakt w tym requeście, zrobić z tego zadanie czy przepuścić?

### Przyjmujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

3. Pierwszy z czterech commitów jest sam w sobie czerwony: dodaje nowy test przed zmianą konfiguracji, żeby historia zachowała dowód, że test na dawnej konfiguracji nie przechodzi i wymienia dziesięć plików. Cena: kto szuka w historii wadliwego commita krokami, zatrzyma się na tym; scalenie zachowujące commity (niżej) go zachowuje, a wybrałem to zamiast jednego commita, który dowód by zgubił.

4. Linter i formater obejmują teraz każdy plik skryptowy w dowolnym miejscu katalogu testów, także w katalogach należących do innych obszarów gry, a nie tylko tych dziesięć plików. Przyszły plik skryptowy położony tam, na przykład wśród testów pracy agentów, będzie podlegał temu samemu linterowi i formaterowi. Wybrałem to, bo zdecydowałeś „cały katalog testów, bez wyjątku”, a nie dziewięć nazw plus jeden katalog, co wymagałoby poprawki przy każdym nowym pliku; cena to tylko to, że te pliki podlegają standardowi, który dziś spełniają wszystkie istniejące.

5. Zmienione testy, które pilnują reguł: nowy plik w testach jakości (z małym skryptem pomocniczym) sprawdza trzy powyższe rzeczy dla każdego pliku skryptowego pięciu obszarów kodu, a dotychczasowy test jakości dzieli teraz z nim flagi i wzorce formatera, więc lista jest jedna. Nowy test wymaga też, żeby atrybut tekstu w gicie był włączony obok końca linii LF, co jest nieco ostrzejsze niż sam git i zgadza się z konwencją repozytorium. Żaden niezmiennik nie jest oznaczony jako naruszony i żadna powierzchnia się nie zmienia.

</details>

## Technical changes

The change is four commits on top of the target branch `aa0ecd09`. It adds a quality test and its helper first, then reaches the ten files, then rewrites the entries, then fixes two Minor findings of the review.

- `006e5e40` (test, red on purpose): `tests/quality/test_source_tool_scope.py` (+153) and its helper `tests/quality/eslint-rule-sets.mjs` (+36), and in `tests/quality/test_quality_invariants.py` the Prettier flags become the shared constant `PRETTIER_FLAGS` used by both tests. The new test takes the files of the five parts from the part map (`file_owners` of the test helpers), asks a second ESLint instance that holds only the published sets what each file receives, compares it with what `eslint.config.mjs` gives, runs Prettier on made-up unformatted copies of each file to see which files its patterns reach, and reads `git check-attr` for the line ending.
- `e401b2bd` (configuration): in `eslint.config.mjs` the `tests` directory replaces the listed test directories and the two named test files (+2/-14); in the Prettier patterns of the quality test `tests/**/*` replaces the listed ones; in `.gitattributes` eight lines `tests/**/*.<ext> text eol=lf` replace 24 lines (+8/-26).
- `8d211cbe` (entries and guideline): D-29, D-32 and the invariants `eslint-source-rules` and `prettier-source-format` (+7/-7 and +3/-3), and the coding guideline's "Linter" paragraph (+10/-4).
- `f9263c07` (fix of the two Minor findings): the LF test also requires git's `text` attribute to be `set` or `auto` (`tests/quality/test_source_tool_scope.py`, +10/-7), and the coding guideline names no list of parts but "the scope of D-29" and "of D-32" (`guidelines/coding.md`, +5/-6).

## Checks

- **Gate:** `npm test` on the final tree `f9263c07`: exit 0; 546 tests in 4 directories passed, 0 errors from the foundation check (542 on the base `aa0ecd09`, also exit 0, plus the 4 of the new test). No check failed or did not run in any cycle run.
- **Acceptance criterion:** `python -B scripts/test.py tests/quality/test_source_tool_scope.py` on the old configuration plus the new test: exit 1, three of four tests fail, each naming exactly `tests/account-api.test.mjs`, `tests/account-backup.test.mjs`, `tests/account-database-check-standin.mjs`, `tests/account-database-check.test.mjs`, `tests/account-mail.test.mjs`, `tests/account-storage.test.mjs`, `tests/deploy/restore-trial-docker-standin.mjs`, `tests/password-measurement.test.mjs`, `tests/passwords.test.mjs` and `tests/transport.test.mjs`, and no other file; the same command at `f9263c07`: exit 0. The reviewer reproduced the failing run independently in a scratch tree.
- **Own-work check of the author:** the weakest point was that the new test might stop the gate only for today's ten files. Two temporary mutations (a new `deploy/mutant.mjs`; a rule turned off for the server's TypeScript) made the test exit 1 and name them; both were restored.
- **Mutations of the reviewers:** the reviewer ran eight mutations on `HEAD`: a new file, a rule turned off, changed options, a lowered severity, an ignored file, a dropped Prettier pattern, a dropped LF line (all exit 1) and an explicit `-text` line (passed, then fixed in `f9263c07` and exit 1 on the second review).
- **Foundation check:** `python -B .the-way/elements/common/foundation_check.py`: exit 0, 0 errors, without `--skip-test-citations`.
- **Not run:** none. The return step committed nothing, so it had no review of its own.
- **Form check of this description:** <FORM_CHECK>
- **Check of private paths on this description:** <PRIVATE_DESCRIPTION_CHECK>
- **Check of private paths, image files and remarks on the record's copy:** <RECORD_CHECKS>

## Foundation entries

- **D-29** (changed; rows 1 and 2): ESLint's standard rule sets apply to every script file of the browser view, the simulation, the account server, the build tools and the deployment; a test, not review, keeps the file patterns to that scope by asking ESLint what each file receives and comparing it with the published sets; review keeps the rules.
- **D-32** (changed; rows 1 and 2): Prettier's check covers every TypeScript and JavaScript file of the same five parts and the browser's HTML and CSS; a test keeps the check's patterns and the LF attributes to that scope by asking Prettier and git; `prettier-ignore` comments stay with review.
- **`eslint-source-rules`** (changed; row 3): every script file of the five parts, according to the part map, receives the published rule sets and breaks none of them and carries no inline directive; its *Part* now includes the deployment.
- **`prettier-source-format`** (changed; row 3): every script file of the five parts, according to the part map, is matched by the test's patterns and kept at LF, and every matched file stands as Prettier leaves it.
- Invariant tests changed: `tests/quality/test_source_tool_scope.py` (new, three cases of the two invariants plus a control case) and `tests/quality/test_quality_invariants.py` (the Prettier test takes its flags from the shared constant). Surfaces changed: none. *Violated* marks set or cleared: none. No entry is the cycle's own; no row is tied to an entry already stated.

## Minor findings

none — both Minor findings of the review of the whole change (the LF test read only `eol`; the coding guideline named the five parts) were fixed in `f9263c07` and its review found nothing new.

## Findings outside the task's scope

- The old, withdrawn row `eslint-configuration-rules` in `foundations/invariants.md` still says no cheap test checks that the ESLint configuration keeps to D-29; it is history, names none of the changed entries, and its claim still holds for what it covered (extra rules and options). The reviewer declined to judge it; left to you.
- `README.md` line 60 ("ESLint obejmuje również nowe pliki TS/JS w katalogach wskazanych w jego konfiguracji") stays true and does not mention the new test; not in the task.
- The Prettier pattern for the HTML and CSS of the simulation and view tests now overlaps the new script pattern for scripts; harmless, still needed for HTML and CSS.
- The first commit is red alone (item 3 of *You accept by merging*); whether to squash is the merge's decision, not a finding about the code.

## Course of the cycle

- **Task and sources:** independent task, "the checker and the formatter cover all test files, with a test that stops a new file outside the scope"; the task note accepted 2026-11-13, its three settlement rows accepted with it; the review of the foundation of 2026-11-13 (variant b of its finding 9) is its source.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved; the gate on the base `aa0ecd09` exit 0, 542 tests.
- **Spec:** none — the task leaves no open design choice.
- **Route:** one author without a plan, class `same` as the orchestrator's, because the change crosses four parts and needs the design of one test; no discarded attempt.
- **Plan:** none.
- **Choices:** 7 rows in the questions table, none beyond the task's content except those under *You accept by merging* (see the table in the record).
- **Blocking findings left:** none.
- **Record:** `docs/task-cycles/zasieg-lintera-i-formatera/` at the commit <RECORD_SHA>.
