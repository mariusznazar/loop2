# Independent spec review — styleguide-loop2

## Verdict and boundary

**BLOCKED — not ready for implementation.** One source-backed conflict remains: settlement 16 is true for every possible current token file on the actual first-introduction fork point, but the pinned process requires a bad whole-file case that makes it false. The original spec substituted a synthetic base. The designer has now correctly withdrawn that substitution and marked the spec blocked; this corrects the specification's claim, not the underlying acceptance conflict.

No other blocking defect was found in this bounded review of the task coverage, source fidelity, current code and proposed contracts. This is a spec review, not approval of an implementation or an executed invariant check. No product, foundation, task or spec file was written by this reviewer. No subagents were dispatched.

## Inputs and reading

Worktree: `C:/Storage/repos/loop2-styleguide`.
Product HEAD and actual merge base: `dc1f9cf9e9f3713386b6059d8214e588c69e5ba8`; main reference: `origin/main`.
Pinned the-way checkout and product gitlink both: `d829e3aa6242a9b8901274531dd82fd5c7d87628`.

Whole-file inputs read: frozen `.runs/task-cycles/styleguide-loop2/task.md`; original `.runs/task-cycles/styleguide-loop2/spec.md`; review handoff; `foundations/part_map.md`; `guidelines/coding.md`; `guidelines/coding-browser-module.md`; `.the-way/product-guidelines/reading.md`; `.the-way/elements/common/way_of_working.md`; both `.the-way/product-guidelines/styleguide/template.md` and `.the-way/product-guidelines/template.md`; product and pinned-process glossaries. Task-cycle steps 7 and 10, the common fork-point definition, the review playbook and its document-review iteration bounds were applied. The late spec change was checked at its status and role-preservation paragraph; it did not trigger a second full review.

Source-only project context checked directly: approved MVP definition header, scope and Inputs and constraints; the concept's terrain description; the MVP plan's task table. These establish the prohibition on reading loop UI/engine code and distinguish the current style task from future screens. Exact appearance values and their authority are the frozen task's Q9–Q11/Q19, not the mutable public game or a transient screenshot report. No prohibited branch or repository was inspected.

Foundation selection was independently expanded from the handoff by the complete current Scope fields. Touched parts: browser-view (tokens, native controls, appearance and page), build-tools (generation, check methods and standalone command), agent-workflow (guidelines and reading pointers), product-foundation (22 settlements), deployment (font copying only). Current Scope matches read as whole entries: D-01, D-02, D-03/2, D-04/3, D-05/3, D-06/3, D-08–D-19, D-21, D-23, D-26–D-33 and D-36; D-07 was read as an explicitly named related constraint. This includes the deployment and workflow entries the initial task selection did not need to detail. No missing relevant current Scope match remained. The invariant Part fields were inspected throughout; all `every` entries and browser/build/deployment/workflow entries were read, with the linked environment facts used for asset attribution and the fixed quality tools. No existing role/token/focus/contrast decision or invariant was found that would supply earlier roles or authorize the synthetic base.

Guideline selection verified: general coding and browser-module are selected and read whole. The complete kind index and the other headers/conditions were considered: simulation and content-data kinds are not being changed; the account-server HTTP application is not changed. A local preview server is build tooling, not a new account-server application. The styleguide is absent because this task creates it. CSS exemplar deferral is the accepted Q17/D-28 revision, not an inferred exception. New source under tools/styleguide still needs the general checks; the spec explicitly extends discovery and typed ESLint coverage.

Code read to establish feasibility: `src/browser/index.html`; view `program-editor.ts`, `status-row.ts`, `send-panel.ts`, `terrain-panel.ts`, `terrain-picture.ts`, `tile-list.ts`, `footer.ts`, `credits.ts`; `package.json`, `scripts/build.mjs`, `tsconfig.browser.json`, `eslint.config.mjs`, `Dockerfile`, `.dockerignore`; representative view test `tests/view/status-row.test.mjs`. Existing native element construction, in-place update behavior, style literals and asset copying agree with the problem stated by the task.

## Blockers

### 1. Historical role preservation cannot furnish the required first-task bad case

**New thread. Severity:** blocking acceptance conflict.

**Anchor:** `C:/Storage/repos/loop2-styleguide/.runs/task-cycles/styleguide-loop2/spec.md:101` (current blocked paragraph; the original synthetic-base proposal was at line 99).

**Do wklejenia:** Przy rzeczywistym początku tej gałęzi nie istnieje jeszcze żadna rola, więc zmiana nazwy nowo dodanej roli nie narusza obietnicy zachowania ról z początku gałęzi. Sztuczna baza z rolami może testować skrypt, ale nie spełnia wymaganego przez proces złego przypadku na sprawdzanym commicie. Oznaczenie tej sprzeczności jako blokady jest poprawne; dalsze wykonanie wymaga rozstrzygnięcia reguły lub zakresu zadania przez właściwy workflow.

**Dlaczego to zgłaszam:** Reguła ma chronić znaczenia używane już przed zadaniem: jeśli wcześniejsza wersja zawierała `page` rodzaju `background`, późniejsza zmiana nazwy albo rodzaju musi zostać wykryta. Tymczasem faktyczny punkt startu `dc1f9cf...` nie zawiera pliku tokenów ani żadnej z projektowanych ról. Dla pustego zbioru wcześniejszych ról zarówno poprawny plik, jak i plik zmieniający nowo dodane `page` na inną nazwę spełnia zdanie z settlement 16. Ten przypadek może łamać schemat 23 wymaganych ról, ale nie łamie zachowania ról historycznych. Nie wolno pomylić tych dwóch własności ani potraktować błędu parsowania jako udowodnionego naruszenia zdania.

Dowody:

- `task.md:174` (settlement 16): „Żadna rola z `{fork-point}` nie zmienia nazwy ani rodzaju — skrypt.”
- `task.md:159` (settlement 1): przyjęcie template'u bez odstępstw.
- `.the-way/elements/common/rules.md:108`: fork-point to commit, od którego gałąź zadania odeszła od głównej; wartość podstawia gate. Nie jest dowolnym parametrem testowym.
- `.the-way/product-guidelines/template.md:105`: case to cały plik dodany lub podmieniony na sprawdzanym commicie; metoda przechodzi z good i nie przechodzi z bad.
- `.the-way/task-cycle/skill/SKILL.md:375`: reviewer stosuje te pliki w scratch worktree sprawdzanego commita; przy braku właściwego wyniku check nie jest przyjęty.
- `spec.md:88` sam prawidłowo uznaje potwierdzony brak tokenów w bazie za pusty zbiór historyczny.
- Zapis odczytów gita w `reports/spec-review-readonly-checks.json` potwierdza merge base i pełną listę plików widoku w tej bazie. Nie jest to domysł z błędu polecenia git: wszystkie odczyty zakończyły się kodem 0.

**Correction and limit:** Usunięcie instrukcji zastępowania rzeczywistej bazy i jawne wpisanie blokady jest korektą samej specyfikacji, bez zmiany znaczenia zadania. Designer wykonał tę korektę przed wydaniem raportu. Nie produkuje ona jednak wymaganego bad case. Zmiana settlement 16 na ochronę innego zbioru, zmiana przyjęcia template'u bez odstępstw, rozdzielenie wprowadzenia ról i ich historycznej ochrony na osobne scalone zadania albo zmiana przypiętego procesu wymaga właściwego rozstrzygnięcia; reviewer nie wybiera ani nie zatwierdza żadnej z tych dróg.

**Costs:** Pozostawienie poprawionego statusu BLOCKED zachowuje prawdziwość dowodów, lecz wstrzymuje implementację. Powrót do sztucznej bazy odblokowałby pracę pozornie, kosztem fałszywej akceptacji sprawdzenia. Rozdzielenie pracy kosztuje dodatkową granicę scalenia; zmiana obietnicy lub procesu kosztuje jawny przegląd i uzgodnienie reguł. Nie ma wskazanej, zgodnej ze źródłami drobnej poprawki tekstu, która równocześnie zachowałaby dokładnie oba wymagania i dała zły przypadek w tej pierwszej zmianie.

## Coverage of all 22 settlements

Coverage means the design carries the requirement; it is not evidence that implementation has passed it.

| Settlement | Design coverage | Review result |
|---|---|---|
| 1 | Section 6, full styleguide template and required examples/cases | Covered, except acceptance conflict above |
| 2 | Sections 1/2/6, signal role meanings and warning error state | Covered |
| 3 | Sections 1/6, neutral roles and all three text backgrounds | Covered |
| 4 | Sections 2/3, terrain, link, depletion and universal focus | Covered |
| 5 | Contrast contract and three WCAG facts | Covered; no invented full-AA requirement |
| 6 | Token contract, all color forms and specified unitless appearance fields | Covered with exactly task exceptions |
| 7 | Six factories and three destructive actions | Covered; native behavior and no invented loading |
| 8 | Standalone compilation, local command, samples without game-state rendering | Covered |
| 9 | Pinned vendored Geist/Geist Mono and copied OFL | Covered |
| 10 | D-28 CSS deferral | Covered |
| 11 | Independent role-meaning method, 2 of 3 reads | Covered |
| 12 | Whole-part token scan, strict immediate compliance | Covered |
| 13 | Universal focus-visible including footer links; disabling overrides checked | Covered as structural promise; rendered pixels separate |
| 14 | All text/background pairs and threshold-3 pairs | Covered, with actual extra adjacencies considered |
| 15 | Six-by-seven real control construction or reason, actual attributes/messages | Covered |
| 16 | Comparison with actual fork point | Requirement carried, first-task acceptance BLOCKED |
| 17 | Adjacent source in every value record, schema prevents hidden records | Covered |
| 18 | Actual ordinary build/output/reference inspection, stale-output exercise | Covered |
| 19 | WCAG text contrast fact | Section 6 requires recording |
| 20 | WCAG non-text contrast fact | Section 6 requires recording |
| 21 | WCAG visible focus fact | Section 6 requires recording |
| 22 | Geist license fact | Section 6 requires recording; official source corroborated |

## Remaining design assessment

- All ten To do items have an identified route in sections 1–7. Existing scene geometry, layout breakpoints and gameplay callbacks are preserved; text-entry validation, counters, future account screens and scene engines are not invented.
- Strict token behavior includes colors in style-bearing TypeScript/DOM operations, all color notations, widths/dashes/opacity/weight, both stylesheets and page source, new map-owned files and tests. The existing unitless line-height is outside Q19's enumerated unitless fields; retaining it does not add a broad new exception.
- The focus method's bounded analysis must return inability for unsupported relevant source. Its universal selector and override checks have a concrete contract. This is demanding implementation work but not by itself an impossible static-analysis promise because inability blocks acceptance. A DOM recording harness cannot establish visible rendering, and the spec explicitly does not claim it can.
- State-page coverage is grounded in actual factory calls, native node types, disabled/error/empty state and visible reasons. Preview hover/focus classes are expressly demonstrations and must agree with real pseudo-state declarations. This avoids falsely claiming simultaneous native keyboard focus.
- Standalone TypeScript output under `.runs` and source outside the normal browser include are compatible with the present compiler/build structure. The ordinary build currently retains stale files; the proposed production check explicitly exercises this, so the implementation must decide copying/cleanup accordingly. This is an implementation obligation, not an omitted design decision requiring a second speculative finding.
- The terrain change needs independent hover and character/step outline nodes; current `terrain-panel.ts` already places character/step outlines above tiles. The spec addresses simultaneous marks and keeps numbers in `tile-list.ts`.
- Official [Geist release v1.8.1](https://github.com/vercel/geist-font/releases/tag/v1.8.1) associates the release with `e1f671c`; the pinned [OFL file](https://raw.githubusercontent.com/vercel/geist-font/e1f671c727f6de7e97c1e1d26dbb44f349c19459/OFL.txt) identifies OFL 1.1 and requires redistribution with copyright/license. The proposed unchanged local files and copied OFL fit that source. Font-byte/hash validation remains implementation work.

## Checks and evidence

Executed read-only commands, all exit **0**, with complete stdout and stderr plus input hashes in `C:/Storage/repos/loop2-styleguide/.runs/task-cycles/styleguide-loop2/reports/spec-review-readonly-checks.json`:

1. `git rev-parse HEAD`
2. `git symbolic-ref --short refs/remotes/origin/HEAD`
3. `git merge-base HEAD origin/main`
4. `git -C .the-way rev-parse HEAD`
5. `git ls-files --stage -- .the-way`
6. `git ls-tree -r --name-only dc1f9cf9e9f3713386b6059d8214e588c69e5ba8 -- src/browser/view tools/styleguide assets/fonts`
7. `git status --short`

Manual checks: actor independent spec reviewer; method whole-input comparison, source/code reading and direct public-source reading; observed results recorded above with source paths/lines. Command exit and command-output path: not applicable for manual reasoning and web-reader observations. Public queries carried no private local path or owner data.

Not run: product build/tests, generated check methods, guideline cases, font downloads, browser render/navigation, Docker build or deployment. This stage changes no product code and the proposed methods do not yet exist. None is reported passed. A guessed read of `tests/view/dom.mjs` failed because that file does not exist; file discovery confirmed the existing view test files, and no DOM-harness availability was assumed from that failed read.

## Unresolved concern for next dispatch

Only finding 1 remains unresolved. The corrected spec truthfully records it. Do not dispatch dependent implementation as if the mandatory first-task role-preservation case had been accepted; route the task/process conflict through the owning workflow. No further review loop was started.
