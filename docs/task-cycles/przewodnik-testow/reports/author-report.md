# Author report — testing guidelines

Status: done with concerns.

Worktree: C:/Storage/repos/loop2-wt/przewodnik-testow. Branch: task/przewodnik-testow. Base: 8ac8584c7187c2c2bf63f0a71aeee4fb992a83f5.

## Change and scope

The installer pins the-way at 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c and generates its wrappers and managed instruction block. The new Polish testing guide records the accepted discipline, three levels, six parts, independent expectations, three bounded exemplars, seven trust-boundary rows, permissions and four exclusions with return conditions. D-28 and the coding guide now direct test work to it; the explicit-time example moves without changing its test. The root instruction points authors and reviewers to the testing guide outside the installer block.

The action-in-progress test checks action kind, completion time, exploration effect, movement and subsequent choice, preserving its main scenario and three controls without requiring rule indices or the entire current-action object. Geometry uses three explicitly written mutually adjacent axial tiles and radius 10: six vertices, equal radii/sides, shared sides, two apothems between centres and centres on opposite sides of their common edge. The wander check consumes a literal independent Mulberry32 fixture; existing neighbour and hidden-tile preference cases now use explicitly enumerated axial neighbours; repeatability remains unchanged. The existing HTTP and audit cases gain invariant markers. A new Python test compares every Node test file on disk with the explicit selections of the actual npm test script.

No production behaviour, dependencies, runner, test selector, UI, HTTP helper, font or preview-server implementation changes. No part-map update: guidelines/** and tests/quality/** are already assigned. Backlog Q9 is handled by the orchestrator, who confirmed its old entry is superseded. No screenshot is applicable to this documentation/test change.

## Commits and files

- 12179e0 — chore: adopt the-way testing guidelines process. 42 files, 68 additions and 40 deletions; gitlink, managed AGENTS block, 38 wrapper replacements and two testing-skill wrappers.
- 42522e679b27cff411ee80a0e24e336dd40ad5de — test: establish testing guidelines and independent checks. 12 files, 807 additions and 98 deletions.

Final file counts against the base are attached below. Scratch scripts and demonstration worktrees remain ignored and are not product files.

## Foundation settlement mapping (Polish meaning for PR)

| Row | Entry | Meaning |
|---|---|---|
| 1 | D-73 | Loop2 przyjmuje cały szablon testów przypiętego procesu z sześcioma zapisanymi odstępstwami. |
| 2 | D-74 | Dane generowane rozważamy dopiero dla wskazanej reguły gry i ryzyka kombinacji, którego czytelne przykłady nie chronią. |
| 3 | D-75 | Całe ścieżki gracza sprawdzamy ręcznie; automatyzację przywraca krytyczny przeoczony błąd lub istotny koszt powtórzeń. |
| 4 | D-76 | Fonty i serwer podglądu mają przegląd do pierwszej zmiany swojej granicy, która wdroży test odmowy. |
| 5 | D-77 | Pozostaje pełne npm test, bez wyboru części i bez centralnego limitu całego przebiegu. |
| 6 | D-78 | Jeden przypadek chroni jedno zachowanie i może użyć tabeli nazwanych wariantów. |
| 7 | D-79 | Rzeczywisty audyt w bramce sprawdza format rejestru npm bez osobnego testu zgodności. |
| 8 | D-80 | Oczekiwanie dotyczące balansu pochodzi z uzgodnionego wymagania, nie z dzisiejszego wyniku gry. |
| 9 | D-81 | Poziomy unit, integration i smoke rozróżniają użyte zasoby i zakres dowodu. |
| 10 | D-82 | Źródłami oczekiwań są fundament, zaakceptowane zadania i zatwierdzona definicja MVP; szkic tylko we fragmencie przyjętym przez te dokumenty. |
| 11 | D-83 | Pozostają Node, Python i obecne nazwy plików; włączenie nowego testu do bramki wymaga sprawdzenia. |
| 12 | D-84 | Testy zachowują rzeczywisty generator gry, pliki i lokalny HTTP, jawny czas, ograniczone czekanie i sprzątanie także po porażce. |
| 13 | D-85 | Trzy wybrane przypadki są wzorcami wyłącznie w opisanych granicach, bez zatwierdzania całych plików i pomocników. |
| 14 | D-86 | Odwiedzający może pobrać pliki zbudowanej gry z katalogu publicznego i żadnych plików spoza niego. |
| 15 | D-87 | Nie porównujemy całych ekranów piksel po pikselu; wracamy przy usterce wyglądu lub wymaganiu dokładnego układu. |
| 16 | D-88 | Prawdziwe zdarzenia, fokus i SVG sprawdzamy ręcznie; błąd niewykryty przez model dokumentu albo automatyzacja ścieżek przywraca decyzję o testach. |
| 17 | D-89 | Autor i recenzent sprawdzają warunek powrotu przy zmianie dotyczącej wyłączonej kategorii. |
| 18 | D-28 (revised) | Kodowanie zachowuje ogólne kontrole jakości testów, a ich zasady, wzorce i przykład jawnego czasu stoją w przewodniku testów. |
| 19 | public-file-access | Ścieżka spoza katalogu publicznego otrzymuje 400, 403 albo 404 bez treści pliku i bez strony gry. |
| 20 | dependency-audit-refusal | Nieudane zapytanie, nieczytelny raport lub nowa blokująca podatność kończą audyt porażką. |
| 21 | font-file-provenance | Przegląd sprawdza, że pliki fontów pochodzą tylko z wydania repozytorium Geist. |
| 22 | preview-server-access | Przegląd sprawdza, że serwer podglądu udostępnia tylko własny katalog i tylko na komputerze dewelopera. |
| 23 | node-test-selection | Każdy plik testu Node pod tests/ należy do wyboru pełnego npm test. |
| 24 | unit test | Reguły symulacji lub logika widoku działają w pamięci, także przez kilka funkcji, bez zewnętrznych zasobów testu. |
| 25 | integration test | Test wykonuje konkretną operację na prawdziwych plikach, lokalnym HTTP lub procesach, także kontrolę plików repozytorium. |

D-33, D-45 and D-46 gain reciprocal verification references to their new invariants. No new invariant claims that an untested boundary is proven safe. Font and preview invariants retain method review under D-76.

## Choices and source reaches

- Followed the frozen accepted task and planner routing evidence; no plan or spec was added. Used make-change and record-decision, record-invariant and record-glossary-term methods and their full common/templates/examples references. Read the complete listed decisions and applicable invariants, coding/style guides, part map and glossary. Used the target-pin testing-guideline skill and template; did not restart refinement of already accepted choices.
- The installed pin was verified against its gitlink before old methods and again after installation. Existing relevant method/common files did not change between pins; new testing methods were read at the target pin. Installer preview, approval, exact URL and target were checked before apply.
- Instruction placement used the personal maintain-instruction-files entry and pinned process method, principles and tool-loading reference. Chose one direct pointer near the coding pointer instead of repeating the guide. This task explicitly authorizes the placement; orchestrator accepted the review wording. If missed, later agents could bypass the guide, so the instruction checker and load paths were checked.
- Public research was needed only to derive the wander fixture independently: https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32, read 2026-10-25 (raw source https://raw.githubusercontent.com/bryc/code/master/jshash/PRNGs.md, lines 391–399). The published state increment is 0x6d2b79f5 modulo 2^32; starting at zero gives the written literal after one draw. No product function or recorded production output supplies the expectation. The generator remains real on the exercised side. Rejected calling nextRandom on the expected side because it would share the product's error; a future generator change may update this one independently sourced fixture, without fixing target selection or candidate order.
- Geometry uses relations instead of today's point coordinates. Three mutually adjacent axial inputs cover three edge directions, and side/radius/apothem calculations are independent of hexCenter/hexCorners. No property-testing library or generated-input test was introduced.
- The Node selection test reads package.json rather than duplicating today's list. It models current explicit relative paths and single-star globs and refuses unsupported selection syntax, rather than claiming future syntax is covered. Supporting a changed runner or glob form requires updating the check; this maintenance cost is smaller than introducing another runner/selector, which the task excludes.
- Failing demonstrations use isolated ignored worktrees with identical tracked snapshots and the target pin. Shared node_modules and quality-venv are read-only junctions; no installs. Every demonstration invokes full npm test. All temporary changes are restored from saved bytes in finally.

## Checks

Installer commands (exit 0): exact-target installation/install.py preview, then the same with --apply after orchestrator approval. Origin remains https://github.com/mariusznazar/the-way.git. New gitlink and submodule HEAD both equal 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c. The separate installer checkout and raw generated diff logs are scratch, not archival record evidence.

Foundation writing: python -B .the-way/elements/common/foundation_check.py after each entry; transitional undefined references were explicit while the paired decision/invariant did not yet exist, and all checks after node-test-selection and both glossary entries exit 0. Final standalone run exits 0 (author-foundation.log). Log: foundation-writing.log.

Instruction checks: python -B .the-way/instruction-files/check_instructions.py . before and after, exit 0 both. Before: 14 pre-existing warnings, 6 size infos. After: the same 14 warnings, 7 size infos (new guide). Warnings concern existing server-only paths, shorthand foundation_check.py, @eslint/js and illustrative suppression/.py paths. No new warning remains. Logs: instructions-before.log and instructions-after.log.

Formatting: node node_modules/prettier/bin/prettier.cjs --write tests/view/terrain-picture.test.mjs tests/sim/actions.test.mjs tests/http.test.mjs, exit 0. No formatter or linter configuration changed. git diff --check is repeated before commit.

All repository tests use npm test. Baseline supplied by orchestrator: exit 1; Node 318/318 pass; Python 260 tests, one Windows listening-enumeration setup error and three Docker skips. The final chained foundation check was skipped, standalone foundation exit 0. The controlled listener experiment established an enumeration mismatch, not its exact Windows cause. No unrelated fix is made.

### Required failing evidence and restored run

All commands in the table are `npm test` (Windows executable npm.cmd), in isolated copies except the named author gates. Every listed negative run exits 1 and reaches the target assertion. The wrapper scripts themselves exit 0 after recording npm's nonzero exit and restoring original bytes; their exit is not test success.

| Log stem | Temporary break / positive control | Observed target result |
|---|---|---|
| fail-public-file-access | public root changed from dist/public to the repository root | HTTP refusal case fails: /package.json returns 200. Its normal-file control also fails with 404. Python and chained foundation do not run. |
| fail-hex-shape | hex corner y scaled by 1.1 | New geometry case fails: radius 11 instead of 10. Python and chained foundation do not run. |
| fail-hex-gap | hex centre x scaled by 1.1 | New geometry case fails: neighbours 0 and 1 share zero vertices instead of two. Python and chained foundation do not run. |
| fail-wander-two-draws | wander consumes two real random draws | One-draw case fails: 3663131626 instead of 1831565813. An existing gather-stream check also fails. Python and chained foundation do not run. |
| fail-action-audit-report-selection | setting a hereBelow-first program shortens the current action to one more minute; malformed audit response returns an empty set; an unselected tests/quality/omitted.test.mjs is added | Action scenario fails at minute 6: wander instead of explore; its unchanged-program control also fails at end minute 26 instead of 30. Audit line 67 fails because ValueError is not raised. Selection test names the omitted file. |
| fail-audit-advisory-positive-geometry | introduced advisories incorrectly return 0; actual polygon points rotated 0.37 radians and translated (37, -19) before the unchanged geometry assertions | Audit line 77 fails: 0 instead of 1. Geometry and all 318 Node tests pass under the rigid transform. |
| fail-wander-hidden-preference | candidates include revealed neighbours even when a hidden neighbour exists | Existing preference case fails for seed 2: (1,0) instead of hidden (2,0). Python and chained foundation do not run. |
| fail-wander-neighbour | target chosen as the fixture's first tile, the character's own tile | Existing all-revealed neighbour case fails for seed 1 because the target is not among the six explicit neighbours. Python and chained foundation do not run. |

The two long negative runs each execute Node 318/318, agent-workflow 5, deployment 64 (one skip), invariants 160 and quality 32. Both also have the baseline serving-process setup error and two invariant Docker skips. They additionally report Prettier failures on deliberately unformatted mutation/fixture files; those are not the claimed invariant evidence. The malformed-report run has two action failures and three quality failures (audit, selection, formatting); the advisory run has two quality failures (audit and formatting). Their chained foundation stages are skipped. `git diff --quiet` after restoration exits 0 in both copies and the omitted file has been removed.

Source snapshots: initial author gate and first six negative/positive demonstrations started from 12179e0 plus the staged substantive draft with git tree e96c2f222d9551a962a91f65d226aa9f59dd3c4a. The initial author gate's Node phase checks the earlier wander cases; it is superseded, not final-tree evidence. It ended exit 1 with Node 318/318 and Python 261 (5 + 64 + 160 + 32), only the known setup error and three skips; all quality cases passed. Subsequent prose-only guide adjustments and explicit wander fixtures form git tree c31fddf732c6d329fd28d11d6dd23bafd774adc0. The two final wander-negative demonstrations and author-final-gate use that tree. The changed refusal/action/geometry/one-draw/selection assertions are identical between these snapshots; final-tree neighbour/preference cases have their own negative demonstrations.

Final gate: npm test exits 1 (author-final-gate.log and author-final-gate.exit). Node 318/318 pass, including corrected neighbour/preference and one-draw cases. Python runs 261 tests: agent-workflow 5 pass; deployment 64 with one Docker skip; invariants 160 with the same pre-existing serving-process class-setup error and two Docker skips; quality 32 pass. No new failure. The chained foundation check is skipped by &&; the final standalone python -B .the-way/elements/common/foundation_check.py exits 0. The checked and committed tree is c31fddf732c6d329fd28d11d6dd23bafd774adc0; no product file changed during this final run. The new Python file's execution is shown by its named failure in the negative run and quality count increasing from 31 to 32, with all 32 passing in the restored final tree.


### Own-work check

Most likely unmet requirement: geometry might accidentally preserve today's orientation/position while claiming independent shape/adjacency. Check: the unchanged new assertions are exercised with every actual polygon rotated by 0.37 radians and translated by (37, -19), in the isolated introduced-advisory demonstration. The geometry case and all 318 Node cases pass under that transformation. Negative shape and neighbour-gap mutations separately show that rotation/translation tolerance does not discard the required geometry protection. Manual comparison of guide against the full pinned template also checks all required sections, nine rules, nine recipe fields, levels/parts tables, permissions, exclusions and six explicit departures; see guide-template-check.md. This check found product-derived expected neighbours in the retained wander cases. They were corrected to explicit coordinates before the final gate, with two additional observed failures confirming their protection.

## Concerns and unchecked work

The existing Windows serving-process setup failure and Docker-dependent skips remain separate from this change's evidence. Full-game browser automation, font refusal tests and preview refusal tests remain the accepted deferrals; none is reported passed. No full browser game or screenshot check applies because no product UI or behaviour is changed. The registry itself is not queried in this change's normal gate because package-lock.json is unchanged under D-33; no fresh remote-format claim is made. The review and return steps belong to the orchestrator after this author handoff.

## File counts against the base

| Path | Added | Removed |
|---|---:|---:|
| `.agents/skills/the-way-critique/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-define-project/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-find-foundation-entries/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-implement-task/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-lead-project/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-maintain-coding-guidelines/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-maintain-styleguide/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-maintain-testing-guidelines/SKILL.md` | 14 | 0 |
| `.agents/skills/the-way-make-change/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-plan-project/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-plan-task/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-record-decision/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-record-environment-fact/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-record-glossary-term/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-record-invariant/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-refine-task/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-review-change/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-settle-technology/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-update-part-map/SKILL.md` | 1 | 1 |
| `.agents/skills/the-way-write-spec/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-critique/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-define-project/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-find-foundation-entries/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-implement-task/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-lead-project/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-maintain-styleguide/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-maintain-testing-guidelines/SKILL.md` | 14 | 0 |
| `.claude/skills/the-way-make-change/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-plan-project/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-plan-task/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-record-decision/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-record-environment-fact/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-record-glossary-term/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-record-invariant/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-refine-task/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-review-change/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-settle-technology/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-update-part-map/SKILL.md` | 1 | 1 |
| `.claude/skills/the-way-write-spec/SKILL.md` | 1 | 1 |
| `.the-way` | 1 | 1 |
| `AGENTS.md` | 3 | 1 |
| `foundations/decisions.md` | 228 | 7 |
| `foundations/glossary.md` | 12 | 0 |
| `foundations/invariants.md` | 50 | 0 |
| `guidelines/coding.md` | 4 | 12 |
| `guidelines/testing.md` | 322 | 0 |
| `tests/http.test.mjs` | 1 | 0 |
| `tests/invariants/test_action_in_progress.py` | 26 | 44 |
| `tests/quality/test_audit_dependencies.py` | 1 | 0 |
| `tests/quality/test_node_test_selection.py` | 41 | 0 |
| `tests/sim/actions.test.mjs` | 68 | 23 |
| `tests/view/terrain-picture.test.mjs` | 52 | 12 |

Final mechanical checks: git diff --cached --check exits 0 before commit; git status --short is empty after commit; git -C .the-way rev-parse HEAD and git ls-files --stage -- .the-way still agree on the target. The full final npm test is not called green: the existing Windows error and three skips remain.
