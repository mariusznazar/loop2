**State: ready** — everything is made, reviewed and tested; four small things below are yours to decide, and none of them blocks the merge.

## What you will see

The game plays exactly as before: nothing on the screen changes. What changes is the project's own safety net. A new automatic check now reads the map of the game's parts and fails whenever one part uses the code of another part that the map does not allow. It runs with every full test run, so a wrong dependency between parts is caught the moment it appears and no longer has to be spotted by the agent that closes a task. The check was tried both ways: it failed on the three places that really broke the map, and it passes now that they are fixed. The reviewer also broke the rule on purpose four more ways, and the check caught each one.

The three places were small. One test of the simulation reached into the drawing code of the screen, so it now checks directly that the simulation state holds no step target. Thirty tests shared a helper file that belonged to the build tools, so the helper now lives in a new part of its own that every part's tests may use. One test of the screen borrowed a function from a test of the build tools, so that function moved into the same shared part.

### Underneath

The check lives in the project's tests, it reads the map and the imports of TypeScript, JavaScript and Python files, and it fails on any relative import it cannot match to a file. The foundation gained a decision and a rule for it, the part map gained the part of test helpers, and the wording of the simulation's isolation rule was narrowed to the simulation's own code.

## For you to decide

1. A few choices the task did not fix. The new part of shared test helpers depends on nothing and holds only that one helper file; the new check belongs to the build-tools part, next to the other checks of the project's layout; and the new rule carries the same name as the rule in the process repository that does the same job. Another answer would only mean a rename or moving one file. Accept?
2. Two notes the cycle added to the foundation that you did not see in the task. The first is the new part of test helpers and what it holds. The second says that the decision requiring Python code to pass the linter, and the rule that repeats it, now name the new part too, because the helper moved there and would otherwise stop being named by them. No requirement changed. Accept?
3. Tests that changed. The new check is an added rule test. The test of the simulation's isolation changed only in the sentence it quotes. Two tests moved a function into the shared helper and use it from there; the test of the screen no longer depends on a test of the build tools. Accept?
4. Small gaps the reviewers left open. The new rule says "to be filled" where it should name the fact that git matches file patterns as it does, because the project holds no such entry yet and one may be written only from a source read for it. Other entries that list the parts one by one, a decision about one test helper among them and about forty decisions on testing, do not name the new part, so an agent that picks entries by part could miss them. Nothing is false or broken today. Fix it in this request, or make a task of it? (Minor findings, 1 and 3; Findings outside the task's scope, 1 and 2)

## Cost

About 29 minutes of agent work in turns, counted by the table of stages, about 32.7 million tokens (almost all of it cached reading), all on one model, Sonnet 5.5. Three code reviews ran, each ending in PASS: the whole change, the fix of three small notes (one fix round, nothing reverted), and the return step. The table of stages is in the committed record: [stages](https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/test-granic-czesci/stages.md).

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record works only then; the project already merges this way.

The foundation has waited for a review through 67 merges since the start of the history (the review has no tag yet). That review is the skill the-way-review-foundation, started in a session in this repository. Nothing in this request waits for it.

<details>
<summary>Po polsku</summary>

**Stan: gotowe** — wszystko zrobione, sprawdzone i przetestowane; cztery drobiazgi poniżej wymagają Twojej decyzji, żaden nie blokuje scalenia.

## Co zobaczysz

Gra działa dokładnie jak przedtem: na ekranie nic się nie zmienia. Zmienia się siatka bezpieczeństwa projektu. Nowy automatyczny test czyta mapę części gry i oblewa, gdy jedna część używa kodu innej części, której mapa nie dopuszcza. Biegnie przy każdym pełnym uruchomieniu testów, więc zły związek między częściami wychodzi od razu, a nie trzeba go wypatrywać przy zamykaniu zadania. Test sprawdzono w obie strony: oblewał na trzech miejscach, które naprawdę łamały mapę, a teraz przechodzi. Recenzent dodatkowo złamał regułę celowo na cztery inne sposoby i test złapał każdy.

Te trzy miejsca były małe. Jeden test symulacji sięgał do kodu rysującego ekran, więc teraz sprawdza wprost, że stan symulacji nie ma celu kroku. Trzydzieści testów dzieliło plik pomocniczy należący do narzędzi budowania, więc pomocnik mieszka teraz w nowej, osobnej części, z której mogą korzystać testy każdej części. Jeden test ekranu pożyczał funkcję z testu narzędzi budowania, więc funkcja przeniosła się do tej samej wspólnej części.

### Pod spodem

Test leży w testach projektu, czyta mapę i importy plików TypeScript, JavaScript i Python, a każdy import względny, którego nie umie dopasować do pliku, oblewa. W fundamencie przybyła decyzja i reguła do niej, w mapie części przybyła część pomocników testów, a zdanie reguły izolacji symulacji zawężono do kodu samej symulacji.

## Do rozstrzygnięcia

1. Kilka wyborów, których zadanie nie przesądzało. Nowa część wspólnych pomocników testów od niczego nie zależy i trzyma tylko ten jeden plik pomocniczy; nowy test należy do części narzędzi budowania, obok innych testów układu projektu; a nowa reguła nosi tę samą nazwę co reguła w repozytorium procesu, która robi to samo. Inna odpowiedź oznaczałaby tylko zmianę nazwy albo przeniesienie jednego pliku. Akceptujesz?
2. Dwie notatki, które cykl dopisał do fundamentu, a których nie widziałeś w zadaniu. Pierwsza to nowa część pomocników testów i to, co trzyma. Druga mówi, że decyzja wymagająca od kodu Python przejścia lintera i reguła, która ją powtarza, nazywają teraz także nową część, bo pomocnik tam przeszedł i inaczej przestałyby go obejmować. Żadne wymaganie się nie zmieniło. Akceptujesz?
3. Testy, które się zmieniły. Nowy test to dodana reguła testowa. Test izolacji symulacji zmienił się tylko w zdaniu, które cytuje. Dwa testy przeniosły funkcję do wspólnego pomocnika i korzystają z niej stamtąd; test ekranu nie zależy już od testu narzędzi budowania. Akceptujesz?
4. Drobne luki, które recenzenci zostawili otwarte. Nowa reguła mówi „do uzupełnienia” tam, gdzie powinna nazwać fakt, że git dopasowuje wzorce plików tak, jak to robi, bo projekt nie ma jeszcze takiego wpisu, a zapisać go wolno tylko ze źródła przeczytanego na tę okazję. Inne wpisy, które wymieniają części jedna po drugiej, w tym jedna decyzja o jednym pomocniku testów i około czterdziestu decyzji o testowaniu, nie nazywają nowej części, więc agent dobierający wpisy po części mógłby je ominąć. Dziś nic nie jest fałszywe ani zepsute. Poprawić w tym zgłoszeniu, czy zrobić z tego zadanie? (Minor findings, 1 i 3; Findings outside the task's scope, 1 i 2)

## Koszt

Około 29 minut pracy agentów w turach, liczone tabelą etapów, około 32,7 mln tokenów (prawie wszystko to odczyt z pamięci podręcznej), wszystko na jednym modelu, Sonnet 5.5. Przeszły trzy przeglądy kodu, każdy zakończony PASS: całej zmiany, poprawki trzech drobnych uwag (jedna runda poprawki, nic nie cofnięte) i kroku zwrotnego. Tabela etapów jest w zacommitowanym zapisie: [stages](https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/test-granic-czesci/stages.md).

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do zapisu działa tylko wtedy; projekt już tak scala.

Fundament czeka na przegląd przez 67 scaleń od początku historii (przegląd nie ma jeszcze tagu). Przegląd to skill the-way-review-foundation, uruchomiony w sesji w tym repozytorium. Nic w tym zgłoszeniu na niego nie czeka.

</details>

## Technical changes

The request makes the repository's own check of allowed dependencies between parts, and fixes the three imports the check found. Commits, in order:

- `c3e27c7` — the function that gives each file its part (`file_owners`) moves from the layout test of the build tools into the shared test support file (`tests/invariants/loop2_invariant_support.py`); `tests/invariants/test_application_package_layout.py` and `tests/invariants/test_browser_view_token_values.py` use it from there, so the view test no longer imports a build-tools test.
- `30afe4d` — `tests/sim/encounters.test.mjs` no longer imports the view; the case "an action ending in attack minute…" asserts `attacked.run.current?.stepTo ?? null` equals `null`.
- `d858d14` — foundation: the part `test-helpers` in `foundations/part_map.md`, decision D-351, the invariant `cross-part-imports`, the new sentence of `simulation-isolation`; the part is added to *Applies to* of `guidelines/coding.md` and `guidelines/testing.md` and to the testing table of parts.
- `628bd1b` — `tests/invariants/test_cross_part_imports.py` (721 lines) with ten tests: one reads the repository, nine run on made-up repositories; the quoted sentence at the top of `tests/invariants/test_simulation_isolation.py` is updated (docstring only).
- `842beb7` — the fix of three Minor findings of the whole-change review: `Rests on: TODO` for the new invariant, one stray blank line, the docstring of the test quoting the invariant word for word.
- `fff50e9` — the return step: `test-helpers` is added to the *Scope* of D-28 and D-30, to D-30's binding sentence and to the *Part* of `ruff-source-rules`.

## Checks

- **Gate:** `npm test` — exit 0 on the final code tree (`fff50e9`): every directory passed — 2005 Node tests, 13 agent-workflow, 115 deploy, 254 invariant and 40 quality Python tests — and the foundation check reports 0 errors. Run twice in the cycle (on `842beb7` and on `fff50e9`), both green, none failed.
- **Failed or not run:** nothing failed. Three container tests are skipped because no Docker daemon answers here; they are skipped on the base too (`tests/invariants/test_loop2_one_serving_process_container.py` among them). The whole `npm test` was not run by the author, the reviewers or the fix; the orchestrator ran it, twice (on `842beb7` and on the final code tree).
- **Failing and passing runs of the invariant's test:** failing run 1 — 32 failures (thirty imports of the helper from simulation and view tests, the view import in the encounters test, and the new file claimed by no part), exit 1; failing run 2 — only the encounters import, exit 1; passing run, exit 0, ten tests. The reviewer's four deliberate violations each exit 1 for the stated reason.
- **Own-work checks:** the author compared its tokenizer's imports with an independent regex scan of 224 script files: 221 equal, three differing only in template-string fixture text. The fix's author checked the docstring against the entry text. The return step searched for every entry placing the helper in the build tools.
- **User interface:** no user interface was changed; no screenshot was needed.
- **Form check of this description:** `python -B task-cycle/request_check.py docs/task-cycles/test-granic-czesci/request.md --task docs/task-cycles/test-granic-czesci/task.frozen.md`, exit 0 (last of 1 run so far).
- **Check of private paths on this description:** `python -B task-cycle/private_paths_check.py docs/task-cycles/test-granic-czesci/request.md`, exit 0, 0 listed (last of 1 run so far).
- **Process remarks check:** `python -B task-cycle/remarks_check.py docs/task-cycles/test-granic-czesci`, exit 0 on the original: 6 reports, 18 items other than `none`, 0 not in the process remarks (second run; the first listed all 18 and they were appended).
- **Checks on the copy of the record:** pending — filled in when the copy of the record is committed.

## Foundation entries

- D-351 (row 1) — every file under `tests/` counts as a test; the allowed-dependencies check reads the imports of TypeScript, JavaScript and Python (not process launches, HTML or CSS); an unmatched relative import fails; a built `dist/` import is matched to its `src/` source.
- `cross-part-imports` (row 2, invariant, *Part* `every`, *Method* `test`, *Violated* `no`) — no file of a part imports a file of another part unless *Depends on* allows it, the importer is a test and the imported file is in `test-helpers`, or an accepted-violation invariant says so. Its *Rests on* reads `TODO`.
- `simulation-isolation` (row 3, changed sentence) — now covers the simulation's code outside `tests/` and names the import of a file, a package and a module.
- `test-helpers` (the cycle's, part map) — the part that holds the helper file the tests of several parts import; depends on nothing; *Trust boundary* none.
- D-28 and D-30 (the cycle's, changed by the return step) — *Scope*, and for D-30 the binding sentence, now name `test-helpers`; no requirement changed.
- `ruff-source-rules` (the cycle's, changed by the return step) — *Part* now names `test-helpers`.
- Invariant tests altered: `tests/invariants/test_cross_part_imports.py` (new), `tests/invariants/test_simulation_isolation.py` (quoted sentence only), `tests/invariants/test_application_package_layout.py` and `tests/invariants/test_browser_view_token_values.py` (the moved function only). No surface and no *Violated* mark is set or cleared.

## Minor findings

1. (Whole-change review, finding 1, fixed in the sense that `none` became `TODO`) The invariant `cross-part-imports` rests on git's matching of path patterns but names no fact: `foundations/invariants.md:1239-1247`. The reviewer: "so git's attribute-pattern rules decide which part a file is in, and with it whether a commit makes the sentence true … Fix: record the fact and name it, or write `TODO — git's matching of attribute-file path patterns` until it is." The fix wrote a bare `TODO`, because the checker `foundation_check.py` rejects a descriptive `TODO`, while the pinned invariants template shows the descriptive form; the two disagree at the pin. The fact itself is still unwritten.
2. (Review of the fix, new Minor) A bare `Rests on: TODO` does not say which fact is missing; the only trace is in the review and fix reports, which are not kept in the repository.
3. (Review of the return step, finding 1) D-49: `foundations/decisions.md:1003`. The reviewer: "*Verification* describes the helper ('the shared server helper of the invariant tests', which gives each server start a free port) without naming the file. Its *Scope* (`account-server, build-tools, deployment`) no longer reaches the helper by part … Optional fix: add `test-helpers` to D-49's *Scope*."
4. (Review of the return step, finding 2) "D-28 was widened but the decisions its sibling guideline cites were not. Both choices are defensible."

## Findings outside the task's scope

1. (Whole-change review, finding 2) The new Python file of `test-helpers` falls out of entries that name parts one by one: `foundations/decisions.md:696`, `:724`, `foundations/invariants.md:426`, `:436`, `:586`, `:1196`. The reviewer: "Effect: the Ruff check still runs over it (`tests scripts`) … an agent that selects entries by the part of the file it changes (`test-helpers`) will not be handed the Ruff, ESLint, Prettier and test-selection entries." The return step corrected D-28, D-30 and `ruff-source-rules`, and left the Bash-only, `.mjs`-only and jsdom entries (`foundations/invariants.md:436`, `:586`, `:1196`) as not made false by the move; the testing-decision family (about forty decisions, D-73 to D-85 and similar) is left as a possible sweep.
2. (Whole-change review, finding 3) "Tokenizer duplicates the segmenter of `test_simulation_isolation.py`" — `tests/invariants/test_cross_part_imports.py:69-177` against `tests/invariants/test_simulation_isolation.py:115-246`: "a fix to one will not reach the other. The author's reason (importing the other test would be a forbidden test-to-test import) holds for the import, but the segmenter could have moved to the shared helpers like `file_owners` did."

## Course of the cycle

- **Task and sources:** an independent task: a test that checks that the parts of the game import only from the parts the map allows. Sources: the task document of 2026-11-08, the pinned process at `294af7f`, the code at `72287c2`.
- **Process pin:** `294af7fde45323ac1851c014a03071a97fc38d96`, unchanged by the task. The gate on the base: `npm test` exit 0.
- **Spec:** none; the task settled every open design choice (questions 1–6, settlements 1–3).
- **Route:** one author without a plan, class `same`, because the change fits one agent and spans several parts. The author's tool refused every write of a report, so the orchestrator saved its returned text as the report files.
- **Plan:** none.
- **Choices:** 6 choices of the cycle, listed in the questions table of the record: [cycle.md](https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/test-granic-czesci/cycle.md).
- **Blocking findings left:** none.
- **Record:** [docs/task-cycles/test-granic-czesci](https://github.com/mariusznazar/loop2/tree/RECORD_SHA/docs/task-cycles/test-granic-czesci).
