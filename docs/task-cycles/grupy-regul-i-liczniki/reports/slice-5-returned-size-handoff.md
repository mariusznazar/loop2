# Handoff - Slice 5

The user delegated the implement-task cycle and intermediate choices to the orchestrator.
Worktree: C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki; branch task/grupy-regul-i-liczniki.
Slice base: e8ab9cd53398b7f40f9f05bcca0ef07ac08f5d40. Model class and actual model: same / inherited parent model.
Task base 9a5f3605f73da87fc5c87089c8166d2658c0add6; process pin 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c.
Use .agents/skills/the-way-make-change/SKILL.md and its pinned method/references in full.
Read C:/Users/Mariusz/.codex/AGENTS.md and this worktree's AGENTS.md; obey applicable nested instructions. Always run commands with this task worktree as the explicit working directory.
Do not read cycle.md, perform another slice or start the return step. No subagents needed.
No spec. Plan received provisional orchestrator go-ahead, not human approval.
Report: .runs/task-cycles/grupy-regul-i-liczniki/reports/slice-5-report.md.

## Slice copied verbatim from plan.md

### Slice 5 — Switch the program contract and ordered rule selection to groups

- **Goal:** Program becomes ordered one-level groups with stable group and rule identities and explicit next-identity counters; newGame contains one empty Program group under always. Group and rule conditions share the existing closed-list validator and evaluator. Selection considers groups in order, skipping false conditions, empty groups and groups with no feasible rule; it starts the first true feasible rule of the first qualifying group. Activity identifies the originating rule by stable identity and keeps its action copy, so content edits, deletion and movement cannot alter the action already running. Switch the two fixture builders once to the grouped format with deterministic identities, without validating away malformed fixtures or computing expected results. Add grouped program tests and update the grouped invariant plus its checker controls. Add group-condition positive/refusal cases to program-closed-lists. Migrate the existing editor and its pure helpers just enough to correctly edit and show all existing groups: preserve group boundaries and identities, keep per-group rule arrows bounded and add-rule targeting explicit; retain existing selection/number/resource/item/focus semantics. Full add/rename/reorder/delete-group controls and drag/drop belong to Slice 7. Do not retain a flat production compatibility field or duplicate source of truth. No new exported simulation function is needed: keep helpers private so the simulation-inputs inventory remains accurate.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/sim/program.ts` · `src/browser/view/program-editor.ts` · `tests/sim/program-fixture.mjs` · `tests/invariants/program_fixture.py` · `tests/sim/program.test.mjs` · `tests/view/program-editor.test.mjs` · `tests/invariants/test_program_rule_pick.py` · `tests/invariants/test_program_closed_lists.py`
- **Read:** `AGENTS.md` · `src/browser/AGENTS.md` · `.runs/task-cycles/grupy-regul-i-liczniki/task.md:14-22` To do · `.runs/task-cycles/grupy-regul-i-liczniki/task.md:24-43` Questions to settle · `.runs/task-cycles/grupy-regul-i-liczniki/task.md:70-103` Decisions in play and Settlements to record · `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `foundations/part_map.md:27-54` simulation · `foundations/part_map.md:3-26` browser-view · `foundations/decisions.md:39-56` D-03 · `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:115-134` D-06 · `foundations/decisions.md:380-398` D-18 · `foundations/decisions.md:399-424` D-19 · `foundations/decisions.md:425-445` D-20 · `foundations/decisions.md:446-463` D-21 · `foundations/decisions.md:464-489` D-22 · `foundations/decisions.md:490-516` D-23 · `foundations/decisions.md:517-542` D-24 · `foundations/decisions.md:543-567` D-25 · `foundations/decisions.md:568-600` D-26 · `foundations/decisions.md:601-633` D-27 · `foundations/decisions.md:634-648` D-28 · `foundations/decisions.md:649-663` D-29 · `foundations/decisions.md:664-676` D-30 · `foundations/decisions.md:677-691` D-31 · `foundations/decisions.md:692-706` D-32 · `foundations/decisions.md:720-734` D-34 · `foundations/decisions.md:735-749` D-35 · `foundations/decisions.md:750-764` D-36 · `foundations/decisions.md:780-794` D-38 · `foundations/decisions.md:795-809` D-39 · `foundations/decisions.md:810-824` D-40 · `foundations/decisions.md:825-839` D-41 · `foundations/decisions.md:840-854` D-42 · `foundations/decisions.md:855-869` D-43 · `foundations/decisions.md:870-884` D-44 · `foundations/decisions.md:885-899` D-45 · `foundations/decisions.md:900-914` D-46 · `foundations/decisions.md:915-929` D-47 · `foundations/decisions.md:930-944` D-48 · `foundations/decisions.md:960-980` D-50 · `foundations/decisions.md:981-999` D-51 · `foundations/decisions.md:1000-1023` D-52 · `foundations/decisions.md:1024-1045` D-53 · `foundations/decisions.md:1046-1064` D-54 · `foundations/decisions.md:1065-1084` D-55 · `foundations/decisions.md:1085-1111` D-56 · `foundations/decisions.md:1112-1126` D-57 · `foundations/decisions.md:1127-1141` D-58 · `foundations/decisions.md:1142-1156` D-59 · `foundations/decisions.md:1157-1171` D-60 · `foundations/decisions.md:1172-1186` D-61 · `foundations/decisions.md:1187-1201` D-62 · `foundations/decisions.md:1202-1216` D-63 · `foundations/decisions.md:1217-1231` D-64 · `foundations/decisions.md:1232-1246` D-65 · `foundations/decisions.md:1247-1261` D-66 · `foundations/decisions.md:1262-1276` D-67 · `foundations/decisions.md:1277-1291` D-68 · `foundations/decisions.md:1292-1306` D-69 · `foundations/decisions.md:1307-1321` D-70 · `foundations/decisions.md:1322-1336` D-71 · `foundations/decisions.md:1337-1351` D-72 · `foundations/decisions.md:1352-1364` D-73 · `foundations/decisions.md:1365-1377` D-74 · `foundations/decisions.md:1378-1390` D-75 · `foundations/decisions.md:1391-1403` D-76 · `foundations/decisions.md:1404-1416` D-77 · `foundations/decisions.md:1417-1429` D-78 · `foundations/decisions.md:1430-1442` D-79 · `foundations/decisions.md:1443-1455` D-80 · `foundations/decisions.md:1456-1468` D-81 · `foundations/decisions.md:1469-1481` D-82 · `foundations/decisions.md:1482-1494` D-83 · `foundations/decisions.md:1495-1507` D-84 · `foundations/decisions.md:1508-1520` D-85 · `foundations/decisions.md:1534-1546` D-87 · `foundations/decisions.md:1547-1559` D-88 · `foundations/decisions.md:1560-1571` D-89 · `foundations/invariants.md:177-187` action-in-progress · `foundations/invariants.md:188-199` player-map-run-pace · `foundations/invariants.md:200-211` simulation-isolation · `foundations/invariants.md:212-221` simulation-inputs · `foundations/invariants.md:222-233` content-identifiers · `foundations/invariants.md:234-245` program-rule-pick · `foundations/invariants.md:346-356` program-closed-lists · `foundations/invariants.md:368-378` program-world-reference · `foundations/invariants.md:155-165` map-run-repeatability · `foundations/invariants.md:166-176` simulation-randomness · `foundations/invariants.md:246-256` exploring-reveal · `foundations/invariants.md:257-267` move-reach · `foundations/invariants.md:268-278` walk-target · `foundations/invariants.md:357-367` walk-feasibility · `foundations/invariants.md:379-389` map-run-layout · `foundations/invariants.md:279-290` map-run-tiles · `foundations/invariants.md:291-300` restart-seed · `foundations/invariants.md:510-519` minute-span-split · `foundations/invariants.md:500-509` character-team · `foundations/invariants.md:390-399` eslint-source-rules · `foundations/invariants.md:400-409` ruff-source-rules · `foundations/invariants.md:420-429` prettier-source-format · `foundations/invariants.md:560-569` node-test-selection · `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:440-449` browser-view-token-values · `foundations/invariants.md:450-459` browser-view-focus-outline · `foundations/invariants.md:460-469` design-token-contrast · `foundations/invariants.md:470-479` design-token-sources · `foundations/glossary.md:25-31` program · `foundations/glossary.md:53-58` program rule · `foundations/glossary.md:18-24` map run · `foundations/glossary.md:59-66` map run restart · `foundations/glossary.md:67-73` free game minute · `foundations/glossary.md:81-87` headquarters · `foundations/glossary.md:88-93` unit test · `foundations/glossary.md:94-98` integration test · `.runs/task-cycles/grupy-regul-i-liczniki/plan.md:120-130` Choices · `src/browser/sim/run.ts` · `src/browser/view/app.ts` · `src/browser/view/controls/text-field.ts` · `src/browser/view/status-row.ts` · F1 · F2 · F6 · F7 · F8 · F9 · F10
- **Model:** same — the atomic type/validation/picker/editor switch must stay coherent across two languages of invariant fixtures and preserve running actions.
- **Risk:** none
- **Checks:** Start with failing newGame/group-selection/refusal tests and the grouped program-rule-pick invariant/control cases; run npm test before implementation and after. Cover false outer condition, first group/first rule priority, true empty group, true infeasible group fallthrough, all groups empty, a single always group preserving existing behaviour, duplicate-content rules with different identity, unknown group-condition kinds and legal group number/resource/item values. Keep the no-mutation and action-in-progress invariants. Inspect the migrated editor in the real browser for basic add/edit/arrow behaviour and focus, using the established route and reporting D-89 exclusions; full group journey follows Slice 7. Baseline npm test at the branch base exited 1 solely in test_loop2_one_serving_process.OneExpressProcessServesGameAndApi.setUpClass because PowerShell Get-NetTCPConnection -State Listen reported no MSFT_NetTCPConnection objects. Report any recurrence as a baseline environment failure, never a pass; do not change unrelated tests to hide it. Docker is now enabled; evaluate container coverage in this gate rather than carrying the baseline skips forward.
- **Depends on:** Slice 4 · F1 · F2 · F6 · F7 · F8 · F9 · F10

## Current foundation ranges

These current ranges take precedence over the original plan ranges above.

- simulation: `foundations/part_map.md:27-55`
- browser-view: `foundations/part_map.md:3-26`
- D-03: `foundations/decisions.md:39-56`
- D-04: `foundations/decisions.md:57-93`
- D-06: `foundations/decisions.md:115-134`
- D-18: `foundations/decisions.md:380-398`
- D-19: `foundations/decisions.md:399-424`
- D-20: `foundations/decisions.md:425-445`
- D-21: `foundations/decisions.md:446-463`
- D-22: `foundations/decisions.md:464-489`
- D-23: `foundations/decisions.md:490-525`
- D-24: `foundations/decisions.md:526-551`
- D-25: `foundations/decisions.md:552-576`
- D-26: `foundations/decisions.md:577-609`
- D-27: `foundations/decisions.md:610-642`
- D-28: `foundations/decisions.md:643-657`
- D-29: `foundations/decisions.md:658-672`
- D-30: `foundations/decisions.md:673-685`
- D-31: `foundations/decisions.md:686-700`
- D-32: `foundations/decisions.md:701-715`
- D-34: `foundations/decisions.md:729-743`
- D-35: `foundations/decisions.md:744-758`
- D-36: `foundations/decisions.md:759-773`
- D-38: `foundations/decisions.md:789-803`
- D-39: `foundations/decisions.md:804-818`
- D-40: `foundations/decisions.md:819-833`
- D-41: `foundations/decisions.md:834-848`
- D-42: `foundations/decisions.md:849-863`
- D-43: `foundations/decisions.md:864-878`
- D-44: `foundations/decisions.md:879-893`
- D-45: `foundations/decisions.md:894-908`
- D-46: `foundations/decisions.md:909-923`
- D-47: `foundations/decisions.md:924-938`
- D-48: `foundations/decisions.md:939-953`
- D-50: `foundations/decisions.md:969-989`
- D-51: `foundations/decisions.md:990-1008`
- D-52: `foundations/decisions.md:1009-1032`
- D-53: `foundations/decisions.md:1033-1054`
- D-54: `foundations/decisions.md:1055-1073`
- D-55: `foundations/decisions.md:1074-1093`
- D-56: `foundations/decisions.md:1094-1120`
- D-57: `foundations/decisions.md:1121-1135`
- D-58: `foundations/decisions.md:1136-1150`
- D-59: `foundations/decisions.md:1151-1165`
- D-60: `foundations/decisions.md:1166-1180`
- D-61: `foundations/decisions.md:1181-1195`
- D-62: `foundations/decisions.md:1196-1210`
- D-63: `foundations/decisions.md:1211-1225`
- D-64: `foundations/decisions.md:1226-1240`
- D-65: `foundations/decisions.md:1241-1255`
- D-66: `foundations/decisions.md:1256-1270`
- D-67: `foundations/decisions.md:1271-1285`
- D-68: `foundations/decisions.md:1286-1300`
- D-69: `foundations/decisions.md:1301-1315`
- D-70: `foundations/decisions.md:1316-1330`
- D-71: `foundations/decisions.md:1331-1345`
- D-72: `foundations/decisions.md:1346-1360`
- D-73: `foundations/decisions.md:1361-1373`
- D-74: `foundations/decisions.md:1374-1386`
- D-75: `foundations/decisions.md:1387-1399`
- D-76: `foundations/decisions.md:1400-1412`
- D-77: `foundations/decisions.md:1413-1425`
- D-78: `foundations/decisions.md:1426-1438`
- D-79: `foundations/decisions.md:1439-1451`
- D-80: `foundations/decisions.md:1452-1464`
- D-81: `foundations/decisions.md:1465-1477`
- D-82: `foundations/decisions.md:1478-1490`
- D-83: `foundations/decisions.md:1491-1503`
- D-84: `foundations/decisions.md:1504-1516`
- D-85: `foundations/decisions.md:1517-1529`
- D-87: `foundations/decisions.md:1543-1555`
- D-88: `foundations/decisions.md:1556-1568`
- D-89: `foundations/decisions.md:1569-1581`
- action-in-progress: `foundations/invariants.md:177-187`
- player-map-run-pace: `foundations/invariants.md:188-199`
- simulation-isolation: `foundations/invariants.md:200-211`
- simulation-inputs: `foundations/invariants.md:212-221`
- content-identifiers: `foundations/invariants.md:222-233`
- program-rule-pick: `foundations/invariants.md:234-247`
- program-closed-lists: `foundations/invariants.md:348-358`
- program-world-reference: `foundations/invariants.md:370-380`
- map-run-repeatability: `foundations/invariants.md:155-165`
- simulation-randomness: `foundations/invariants.md:166-176`
- exploring-reveal: `foundations/invariants.md:248-258`
- move-reach: `foundations/invariants.md:259-269`
- walk-target: `foundations/invariants.md:270-280`
- walk-feasibility: `foundations/invariants.md:359-369`
- map-run-layout: `foundations/invariants.md:381-391`
- map-run-tiles: `foundations/invariants.md:281-292`
- restart-seed: `foundations/invariants.md:293-302`
- minute-span-split: `foundations/invariants.md:512-521`
- character-team: `foundations/invariants.md:502-511`
- eslint-source-rules: `foundations/invariants.md:392-401`
- ruff-source-rules: `foundations/invariants.md:402-411`
- prettier-source-format: `foundations/invariants.md:422-431`
- node-test-selection: `foundations/invariants.md:562-571`
- browser-view-framework: `foundations/invariants.md:35-44`
- browser-view-token-values: `foundations/invariants.md:442-451`
- browser-view-focus-outline: `foundations/invariants.md:452-461`
- design-token-contrast: `foundations/invariants.md:462-471`
- design-token-sources: `foundations/invariants.md:472-481`
- program: `foundations/glossary.md:25-31`
- program rule: `foundations/glossary.md:53-58`
- map run: `foundations/glossary.md:18-24`
- map run restart: `foundations/glossary.md:65-72`
- free game minute: `foundations/glossary.md:73-79`
- headquarters: `foundations/glossary.md:87-93`
- unit test: `foundations/glossary.md:94-99`
- integration test: `foundations/glossary.md:100-104`
- D-90: `foundations/decisions.md:1582-1600`
- D-91: `foundations/decisions.md:1601-1618`
- D-92: `foundations/decisions.md:1619-1640`
- D-93: `foundations/decisions.md:1641-1670`
- rule group: `foundations/glossary.md:59-64`

The list includes the new foundation entries F1-F10. Foundation commit e5ea04757c56bf80e84059ee403c854b7087ea3a is included in Slice 1's range. The Python builder already exists; Slice 3 consumes it. Foundation report is reports/foundation-report.md. D-93 combines F4/F5/F7; D-92 includes the future combat meaning without adding combat code. Existing program-closed-lists covers group conditions; Slice 5 must provide acceptance/refusal evidence.

Earlier reach to propagate: Slice 1 read src/browser/sim/types.ts, run.ts and game.ts to distinguish behavior assertions from activity-state fixtures. Three manual activity fixtures still contain ruleIndex in tests/sim/campfire.test.mjs, gather.test.mjs and world.test.mjs. These are setup data, not selection assertions. When switching the activity contract in Slice 5, assess those existing fixtures explicitly and report any necessary scope reach; do not silently leave invalid setup data. The earlier report is reports/slice-1-report.md.

Slice 2 added programWithRules(rules) alongside programFromRules(...rules) and programRules(program) in the JS fixture. It passes malformed list types through unchanged. Slice 5 must switch all three consistently without repairing invalid test inputs. Slice 2's additional reads were Slice 1's report and the existing plan choices; its report is reports/slice-2-report.md.

Slice 3 migrated its nine Python drivers and removed incidental ruleIndex from the exploring-reveal activity assertion and corrupted-record control. Its additional reads were package.json, .the-way/gate/run_tests.py and tests/invariants/loop2_invariant_support.py; use these for test runner/support context where needed. Report: reports/slice-3-report.md.

Slice 4 added program_rules(program) to the Python fixture. Switch both Python builder/accessor consistently in Slice 5. The independent world-reference checker accepts structural metadata only at root nextGroupId/nextRuleId, direct group id/name and direct rule id; all other content remains traversed. It permits stock-comparison numbers only in actual direct rule/group conditions. Its handwritten flat and grouped controls are checker inputs, not dual production formats. Walk-feasibility checks exact action/resource and feasible explore/wander fallback. Report: reports/slice-4-report.md. Additional reads to carry forward for runner/quality evidence: ruff.toml, tests/quality/test_quality_invariants.py, tests/deploy/deploy_script_support.py, tests/deploy/test_loop2_image_icons.py, tests/invariants/test_loop2_container_icons.py, tests/invariants/test_loop2_one_serving_process_container.py. The three Docker checks passed on the final unchanged-tree run; one earlier run had a transient desktop-linux context metadata lock, with logs retained. No environment/test workaround was applied. Read the user-required C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md before own diff inspection, after the Obsidian rulebook required by global instructions.

## Task passages copied verbatim

Source task.md:14-22

### To do

1. Program jest uporządkowaną listą grup reguł, a każda reguła programu stoi w dokładnie jednej grupie. Każda grupa ma nazwę i własny warunek, wybierany tymi samymi listami (warunek, zasób, liczba) co warunek reguły, a grupy stoją na jednym piętrze — grupy w grupie nie ma. Nowa gra zaczyna z jedną pustą grupą „Program” z warunkiem „Zawsze”.
2. Postać w każdej wolnej minucie gry wykonuje pierwszą regułę, której warunek zachodzi, a akcja jest w tej chwili wykonalna, biorąc grupy po kolei, każdą tylko, gdy zachodzi jej warunek; grupa, której warunek zachodzi, ale nic w niej nie jest wykonalne, przepuszcza dalej.
3. Edytor programu obsługuje grupy: „Dodaj grupę” zakłada pustą grupę na końcu programu, nazwaną kolejnym numerem („Grupa 2”, „Grupa 3”…); gracz zmienia nazwę grupy polem tekstowym, a jej warunek — listami warunku; „↑” i „↓” przy grupie przestawiają ją o jedno miejsce; „Usuń” przy grupie, przycisk niszczący, usuwa ją razem z jej regułami jednym kliknięciem, bez pytania o potwierdzenie; „Dodaj regułę” w każdej grupie dokłada regułę „Zawsze → Eksploruj” na końcu tej grupy.
4. Gracz przestawia regułę, przeciągając ją myszą — do innej grupy i w obrębie jej własnej: reguła upuszczona na inną regułę staje w grupie tamtej reguły na jej miejscu, a upuszczona na grupę — na końcu tej grupy. „↑” i „↓” przy regule przestawiają ją o jedno miejsce w obrębie jej grupy, a przy pierwszej regule grupy („↑”) i ostatniej („↓”) nie zmieniają niczego, tak jak dziś na brzegu listy.
5. W trakcie przejścia przy każdej regule w edytorze programu stoi liczba jej zadziałań w bieżącym przejściu, zapisana ze znakiem „×”, np. „3×”. Jedno zadziałanie to rozpoczęcie akcji reguły — akcja trwająca wiele minut gry liczy się raz.
6. Licznik reguły zaczyna od zera na starcie każdego przejścia — także przejścia uruchomionego przyciskiem „Restart” i przejścia po ponownym wysłaniu maga — oraz przy każdej zmianie warunku albo akcji tej reguły. Licznik przeżywa przestawienie reguły, przeniesienie jej do innej grupy oraz zmianę warunku albo nazwy jej grupy.
7. Po końcu przejścia — na ekranie po śmierci postaci i po „Zakończ”, na ekranie, z którego gracz wysyła maga — przy regułach zostają liczby zakończonego przejścia, aż gracz zacznie następne przejście ponownym wysłaniem maga albo przyciskiem „Restart”; to przejście liczy od zera. Zanim w grze odbędzie się pierwsze przejście, przy regułach nie ma liczb.
Source task.md:24-43

### Questions to settle

- Czy każda reguła programu należy do jakiejś grupy, czy reguła może stać także poza grupami — i z jakim programem zaczyna nowa gra?
  - Answer: Sposób A: program to uporządkowana lista grup, a każda reguła stoi w dokładnie jednej grupie; nowa gra zaczyna z jedną pustą grupą „Program” z warunkiem „Zawsze”, do której gracz dodaje reguły.
  - Source: Mariusz, 2026-10-24, w odpowiedzi na pakiet pytań tego zadania: „Q2 - drag and drop / poza tą jedną zmianą przyjmuję pozostałe rekomendacje” — rekomendacją był sposób A. Pakiet przedstawiono z dopiskiem „To też wybory na MVP, objęte Twoim zastrzeżeniem”; zastrzeżenie człowieka z tego samego dnia, wypowiedziane o wyborach zadania siedziba-i-druzyna: „to są elementy na potrzeby mvp / docelowo się zmienią, więc chciałbym uniknąć sytuacji w której decyzje będą kategorycznie zabraniać alternatyw”. Brzmienie kandydatów zadań 4, 5 i 11 zbudowanych z wyborów na MVP: kandydat mówi, co gra robi dziś, nie nazywa etapu produktu, takiego jak „w MVP”, i nie zawiera słów „tylko”, „nigdy”, „zawsze”, „bez” ani innych, które wykluczają alternatywę; wykluczenia, które trwają dłużej niż zadanie, opisują to, czego gra dziś nie ma, a nie to, czego mieć nie może (Mariusz, 2026-10-24: „przyjmuję”; bez otwierającego „W MVP”, bo the way od wersji 4302f72 samo czyta decyzję jako stan produktu na dziś — WAY-22, WAY-26). Zastrzeżenie i zasada dotyczą także odpowiedzi niżej.
- Jak gracz obsługuje grupy w edytorze — zakładanie, nazwa, warunek, kolejność, usuwanie — i jak przenosi regułę do innej grupy?
  - Answer: Ze źródeł: grupa ma nazwę i własny warunek, grupa nie stoi w grupie, a „Usuń” przy grupie jest przyciskiem niszczącym. Z wyboru człowieka, część 1, przyjęta tak, jak ją zaproponowano: „„Dodaj grupę” zakłada pustą grupę na końcu programu, nazwaną kolejnym numerem („Grupa 2”, „Grupa 3”…); gracz zmienia nazwę polem tekstowym; warunek grupy wybiera tymi samymi listami co warunek reguły (warunek, zasób, liczba); „↑” i „↓” przy grupie przestawiają ją o jedno miejsce; „Usuń” przy grupie (przycisk niszczący, D-44) usuwa ją razem z jej regułami; „Dodaj regułę” w każdej grupie dokłada regułę „Zawsze → Eksploruj” na końcu tej grupy”, ze słabym punktem nazwanym w pytaniu: „„Usuń” przy grupie kasuje jednym kliknięciem wszystkie jej reguły, bez pytania o potwierdzenie”. Część 2: sposób C — regułę przenosi się do innej grupy przeciąganiem myszą, „jak w loop (`src/sim/policy.test.ts:139`, `:145`)”; o drugim sposobie przenoszenia, bez myszy, człowiek w tej odpowiedzi nic nie postanowił — zachowanie strzałek przy regule ustala odpowiedź na ostatnie pytanie niżej; koszt nazwany w pytaniu: „najwięcej kodu; przeciągania nie zrobi się klawiaturą — D-42 tego nie wymaga (trzyma widoczny fokus, nie obsługę klawiaturą), więc drugi sposób, A albo B, byłby Twoim wyborem, nie obowiązkiem”.
  - Source: cytaty — definicja `definicja_mvp_loop2.md` w vaulcie (Notes/Projects/(P) Loop; zatwierdzona 2026-10-13, odcisk 9e480247), § Glossary, `rule group`: “A rule group is a named set of program rules under a condition of its own.”; „(new) — How does a character act by its program?”: “rule groups stand one level deep”, a w jego Verification naruszenie “a rule group inside a rule group”; `foundations/decisions.md` (loop2 `a945cf1`), D-44: “…the buttons „Zakończ”, „Usuń” and „Restart” are destructive buttons.” Człowiek nie skreślił żadnego z tych cytatów (2026-10-24). Wybór — Mariusz, 2026-10-24: „Q2 - drag and drop / poza tą jedną zmianą przyjmuję pozostałe rekomendacje”, z zastrzeżeniem MVP spod pierwszego pytania.
- Co liczy licznik zadziałań i jak go widać?
  - Answer: (a) Jedno zadziałanie to rozpoczęcie akcji reguły — 20-minutowa eksploracja to jedno zadziałanie; w walce każda tura, w której reguła rozpoczyna czynność walki, dolicza jej jedno zadziałanie. (b) W trakcie przejścia przy regułach stoją liczby bieżącego przejścia. Po końcu przejścia — na ekranie po śmierci postaci, który zostaje na stanie z minuty śmierci, i po „Zakończ” — liczby zakończonego przejścia zostają przy regułach do następnego wysłania maga albo „Restart”; „bieżące przejście” wpisu o liczniku czyta się jako ostatnie przejście. Zanim w grze odbędzie się pierwsze przejście, przy regułach nie ma liczb. (c) Liczba ze znakiem „×”, np. „3×”.
  - Source: Mariusz, 2026-10-24: „poza tą jedną zmianą przyjmuję pozostałe rekomendacje” — rekomendacje: (a) rozpoczęcie, (b) brak liczby poza przejściem, z przypadkiem ekranu po śmierci postawionym wprost i rekomendacją, by liczby na nim zostały, (c) zapis „3×”; z zastrzeżeniem MVP spod pierwszego pytania. Walka w (a): pytanie przeciw wyborowi, przedstawione 2026-10-24 z zapisem planu o zadaniu 8 walka-w-glebi-lasu („każda reguła, która zadziała, nabija swój licznik”) i z danymi loop, w których czynności walki „Uderz”, „Kopnij”, „Odskocz” trwają 0 minut (`src/sim/data/activities.ts:51`–`53`, commit `cdc7c0d`) — Mariusz, 2026-10-24: „co do wiersza 3 - chyba możemy zostawić”. Zmiana w (b) po „Zakończ”: Mariusz, 2026-10-24, przy cięciu kandydatów: „do 4 - dobrze by było, żeby liczby zostały”. Zasięg — do następnego wysłania maga albo „Restart”, z „bieżącym przejściem” czytanym jako ostatnie przejście — to brzmienie pytania przeciw wyborowi z kotwicą we wpisie projektowanym „What does a program rule show the player?”: “Every program rule shows how many times it fired in the current map run”; człowiek odpowiedział jednym słowem na całą wiadomość z tym pytaniem: „przyjmuję” (2026-10-24), a orkiestrator powiedział mu, że wziął to słowo za „tak”, żeby mógł to poprawić. Brak liczb przed pierwszym przejściem to część (b), której zmiana nie dotyczy. Ekran po śmierci to sposób A pytania o śmierć maga w zadaniu 4 ognisko-i-jedzenie, przyjęty przez człowieka 2026-10-24: „Po śmierci czas staje, a ekran zostaje na stanie z minuty śmierci: wiersz stanu mówi np. „Minuta 312 · Mag zamarzł”, przycisk „Pauza” znika, zostają „Restart” (to samo ziarno, od minuty zero) i „Zakończ””.
- Kiedy licznik reguły zaczyna od zera?
  - Answer: Licznik zaczyna od zera na starcie każdego przejścia — także przejścia, które gracz uruchamia przyciskiem „Restart”, i przejścia po ponownym wysłaniu maga — oraz przy każdej zmianie treści reguły, czyli jej warunku albo akcji (rodzaju, zasobu, liczby); samo przestawienie reguły go nie zeruje.
  - Source: cytaty, których człowiek nie skreślił (2026-10-24) — definicja `definicja_mvp_loop2.md` (zatwierdzona 2026-10-13, odcisk 9e480247), „(new) — What does a program rule show the player?”: “Every program rule shows how many times it fired in the current map run, a count that survives reordering and resets when the program rule's content changes.” i jego Verification: “complies: a program rule moved up keeping its count; a program rule whose condition changed starting again from zero”; `foundations/glossary.md` (loop2 `a945cf1`), `map run restart`: “A map run restart is a map run of the same character on the same game map, which the player starts in place of the map run in progress.”, `program rule`: “A program rule is a pair held by a program: a condition and an action of a character.”; dokument zadania 3 `mag_w_lesie_loop2.md`, § To do, punkt 3: „…a „Zakończ” kończy przejście i wraca do wysyłania maga na Las, gdzie każde kolejne wysłanie bierze nowe ziarno.” Nawias „(rodzaju, zasobu, liczby)” opisuje dzisiejszy kształt warunku i akcji (fakt z kodu: `src/browser/sim/types.ts:10`–`17`, `a945cf1`); reguła odpowiedzi od niego nie zależy.
- Czy przeniesienie reguły do innej grupy albo zmiana warunku lub nazwy jej grupy zeruje licznik tej reguły?
  - Answer: Sposób A: nie zeruje.
  - Source: Mariusz, 2026-10-24: „poza tą jedną zmianą przyjmuję pozostałe rekomendacje” — rekomendacją był sposób A, ze słabym punktem nazwanym w pytaniu: „liczba nabita pod starym warunkiem grupy zostaje przy regule, choć pod nowym warunkiem reguła może już wcale nie dochodzić do głosu — prawdziwy obraz daje dopiero następne przejście albo „Restart””; z zastrzeżeniem MVP spod pierwszego pytania.
- Co robią „↑” i „↓” przy regule na brzegu grupy i czy przeciąganie przestawia regułę także w jej własnej grupie?
  - Answer: Sposób A: „↑” i „↓” przestawiają regułę o jedno miejsce tylko w jej grupie, a na brzegu grupy nic nie robią — tak jak dziś na brzegu listy. Przeciąganie przestawia regułę wszędzie: w innej grupie i w jej własnej, jak w loop.
  - Source: Mariusz, 2026-10-24: „1. zostawiam / 2. tak / 3. A / 4. A” — punkt 3 to to pytanie, a rekomendacją był sposób A, ze słabym punktem nazwanym w pytaniu: „przeniesienie do sąsiedniej grupy zawsze wymaga myszy”; z zastrzeżeniem MVP i zasadą brzmienia spod pierwszego pytania. Fakt z kodu, osobno: „↑” i „↓” na końcach listy nie zmieniają dziś niczego (`src/browser/view/program-editor.ts:89`, `:311`, `a945cf1`).
Source task.md:70-103

## Decisions in play

Obecny fundament loop2 (`a945cf1`):

- D-23 „How does a character act by its program?”: “A character acts only by its program: in each free game minute it carries out the first program rule whose condition holds and whose action of the character can be carried out then. Conditions are chosen from a closed list, never written as expressions, and the player has no way to carry out a character's action by hand.” — zadanie dopisuje część wpisu projektowanego o tym samym pytaniu, której D-23 jeszcze nie ma (niżej).
- D-20 „What interrupts the character's action in progress?”: “Neither a change of the program nor the condition of another program rule interrupts the character's action in progress. The program picks a program rule again only once the character's action ends.”
- D-04 „What is the game built with?”: “[…] The browser view draws the game only from the game state and the game's content data, and changes the game state only through functions of the simulation, to which it passes the player's choices and the passing of real time.”
- D-03 „How is the browser view built?”: “The browser view is built in TypeScript with the browser's DOM APIs, without an additional UI framework.” — jego uzasadnienie przyjmuje, że projekt sam pisze odświeżanie edytora programu i jego liczników; przeciąganie reguł też powstaje na samych API przeglądarki.
- D-42 „Which accessibility requirements does the browser view keep?”: “For now every screen of the browser view keeps three success criteria of WCAG 2.2, the W3C Recommendation of 12 December 2024 — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast and 2.4.7 Focus Visible — and no other requirement of WCAG, with no date or event set for returning to it. […]” — przenoszenie reguły do innej grupy przeciąganiem myszą, w tym zadaniu bez sposobu z klawiatury, mieści się w tej decyzji: trzyma ona widoczny fokus, nie obsługę klawiaturą.
- D-44 „Which controls do the screens of the browser view build on?”: “The screens of the browser view build every button, select list, number field and text field from the six shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the select list, the number field and the text field — and the buttons „Zakończ”, „Usuń” and „Restart” are destructive buttons. […]”
- `program-rule-pick`: “In each free game minute of a map run, the character starts to carry out the first program rule whose condition holds and which the character can carry out then, and carries out no program rule in a free game minute in which none has both.” — z grupami reguła, której warunek zachodzi, nie jest wykonywana, gdy nie zachodzi warunek jej grupy, więc cykl dostosowuje ten niezmiennik i jego test do nowego brzmienia D-23.
- `program-closed-lists`: “The simulation refuses a program holding a condition or an action of the character whose kind the data files of `src/browser/sim/data/` do not list.” — obejmuje też warunek grupy.
- `action-in-progress`: “The character's action in progress lasts its full duration, even where the program changes or the condition of another program rule comes to hold before it ends.”
- Pojęcia: `program` — “A program is the written behaviour by which a character acts, made of ordered program rules and holding a trip plan.”; `program rule` — “A program rule is a pair held by a program: a condition and an action of a character.”; `map run` — “A map run is one attempt of one character at one game map, from entering it until a completion, the character's death or the player stopping it.”; `map run restart` — “A map run restart is a map run of the same character on the same game map, which the player starts in place of the map run in progress.”; `free game minute` — “A free game minute is a game minute of a map run at which the map run starts, or at which the character's action or the character's waiting ends.”

Wpisy projektowane definicji `definicja_mvp_loop2.md` (§ Projected foundation changes); przydział według planu, zadanie 5.

Zadanie zapisuje:

- „(new) — How does a character act by its program?” (urzeczywistniają zadania 3, 4, 5 i 8, zapisuje zadanie 5): “A character acts only by its program: in each free game minute it carries out the first program rule whose condition holds and whose action can be carried out then, taking rule groups in order, each only while its condition holds, and a rule group whose condition holds but which holds nothing that can be carried out passes on. Conditions are chosen from a closed list, never written as expressions, rule groups stand one level deep, and the player has no way to carry out an action by hand. Which piece of an item an action uses — which fuel goes into a campfire — the simulation chooses, not the program.” — zadanie idzie po zadaniu 4 i zapisuje to, czego fundament przy jego cyklu jeszcze nie ma: część o grupach reguł, którą czyni prawdziwą, a także zdanie o wyborze sztuki przedmiotu, jeśli nie zapisał go cykl zadania 4, które je urzeczywistnia. Zadanie 8 dotrzymuje wpisu w walce.
- „(new) — What does a program rule show the player?” (urzeczywistniają zadania 5 i 8, zapisuje zadanie 5): “Every program rule shows how many times it fired in the current map run, a count that survives reordering and resets when the program rule's content changes.” — zadanie czyni go prawdziwym w całości; zadanie 8 dotrzymuje go w walce.
- Pojęcie `rule group`: “A rule group is a named set of program rules under a condition of its own.”

## Settlements to record

Candidates: 12 shown, 5 accepted — 2026-10-24

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Program jest uporządkowaną listą grup reguł i każda reguła programu stoi w jednej z tych grup; reguł poza grupą gra nie ma. | decision | odpowiedź pod pytaniem „Czy każda reguła programu należy do jakiejś grupy…” (sposób A; Mariusz, 2026-10-24), brzmienie według zasady brzmienia spod tego pytania | czy model programu dopuszcza regułę poza grupą — także w zadaniu 6, które wpisuje regułę przy odkryciu, i w zadaniu 12, które wnosi programy gracza |
| 2 | Nowa gra zaczyna z jedną pustą grupą „Program” z warunkiem „Zawsze”. | decision | odpowiedź pod pytaniem „Czy każda reguła programu należy do jakiejś grupy…” (sposób A; Mariusz, 2026-10-24); „Zawsze” to nazwa warunku z zamkniętej listy, nie słowo wykluczające | od jakiego programu zaczyna nowa gra, gdy zadanie 12 wnosi programy gracza, a zadanie 6 wpisuje regułę przy odkryciu |
| 3 | Jedno zadziałanie reguły to rozpoczęcie jej akcji, więc akcja trwająca wiele minut gry liczy się raz, a w walce każda tura, w której reguła rozpoczyna czynność walki, dolicza jej jedno zadziałanie. | decision | odpowiedź pod pytaniem „Co liczy licznik zadziałań i jak go widać?”, (a) (Mariusz, 2026-10-24), z odpowiedzią na pytanie przeciw wyborowi o walkę (Mariusz, 2026-10-24: „co do wiersza 3 - chyba możemy zostawić”); słowo “fired” wpisu projektowanego „What does a program rule show the player?” nie jest nigdzie określone | czy licznik rośnie co minutę trwania akcji — także w turze walki zadania 8, które dołącza do urzeczywistniających wpis o liczniku |
| 4 | Edytor pokazuje przy regułach liczby bieżącego przejścia, a po końcu przejścia — po śmierci postaci i po „Zakończ” — liczby zakończonego przejścia zostają przy regułach do następnego wysłania maga albo „Restart”; zanim w grze odbędzie się pierwsze przejście, liczb przy regułach nie ma. | decision | odpowiedź pod pytaniem „Co liczy licznik zadziałań i jak go widać?”, (b), ze zmianą człowieka przy cięciu (Mariusz, 2026-10-24: „do 4 - dobrze by było, żeby liczby zostały”) i z odpowiedzią na pytanie przeciw wyborowi, którego kotwicą było “in the current map run” wpisu projektowanego „What does a program rule show the player?” (Mariusz, 2026-10-24: „przyjmuję”) — „bieżące przejście” czytane jako ostatnie przejście | co pokazać przy regułach na ekranie, z którego gracz wysyła maga (po zadaniu 11 w siedzibie, obok której stoi panel programu), po „Zakończ” i po śmierci, i kiedy liczby zakończonego przejścia znikają |
| 5 | Przeniesienie reguły do innej grupy i zmiana warunku albo nazwy jej grupy nie zerują licznika tej reguły. | decision | odpowiedź pod pytaniem „Czy przeniesienie reguły do innej grupy…” (sposób A; Mariusz, 2026-10-24) | czy edycja grupy zeruje liczniki jej reguł — także w zadaniu 12, w którym zmiana programu w trakcie przejścia trafia do kopii |

## Plan choices copied verbatim

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Prepare explicit test inputs in four bounded batches, then atomically switch one JS and one Python test-only builder with the grouped production contract. Helpers construct input and expose its rules only; they never predict selection, counts or canonical validation. | A single change of more than 10 files, or a dual flat/grouped production model kept during migration. | Four extra full gates and small test helpers to maintain; missing raw fixtures can still break the switch, so each batch searches its changed files and the switch scans all consumers. |
| Keep rule and group identities as stable positive integers in the program, with nextRuleId and nextGroupId metadata. Existing groups and rules retain ids through edits and moves; duplicates have different ids. New group names use the monotonic group number beginning with Program as group 1. | Positions or content hashes; deriving the next name from current group count. | Adds small validation/state fields; wrong reuse attaches counts to another rule. Unique ids and next-id bounds need validation, duplicate-content and delete/add examples need checks. These are internal representation choices, not new player-visible rules beyond the task. |
| Store nullable counters separately in GameState; derive increments from existing activityStarted events. Reset at run start before counting the initial choice. | Counters only inside MapRun, or ticks/completions counted as firings. | Additional reconciliation in setProgram and at starts; missing one event path loses a count. Separate state preserves Stop values and keeps count ticks from becoming program edits. |
| Compare canonical validated condition/action content for reset, independent of field insertion order and group metadata. | Reset every time setProgram is called or key by serialized raw input. | A new condition/action kind must remain covered by canonical validation and comparison; otherwise a real edit may preserve a count. |
| Migrate the current editor to the grouped contract in Slice 5, then add count display and complete group controls/dragging in Slices 6–7. | An unusable intermediate editor, or putting all simulation, counters and full editor interactions into the atomic switch. | Some view code is touched in three dependent slices; each remains runnable and the full final journey is checked after all controls exist. |
| Native browser drag/drop with a rule target resolved after source removal; group target appends and rule events do not bubble into a second move. | A new drag library or a second transfer menu/keyboard workflow. | Browser event behaviour needs real mouse evidence; pure transformation tests cannot catch event routing or native dragging failures. |
| Use the existing common controls and existing token roles; counter updates change only count text. | New token values or role meanings, or full content redraw on every tick. | More care in separating content and count refresh; a missed content update can stale a field, while a broad update can destroy partial input. |

## Boundaries and evidence

Trust boundary: no. Irreversible operation: no. No external writes or deployment. Do not change assets, lockfile, server or deployment. Report any necessary reach before changing scope; if a plan premise contradicts actual code or requirements, report rather than forcing it. Read whole guideline files named above, even when reading code excerpts. Preserve existing line endings when using scripts.

All tests run through npm test. The base gate had Node 318 PASS and Python 261 tests with one environment error in test_loop2_one_serving_process setUpClass (Get-NetTCPConnection reports no Listen objects), plus three Docker skips. Separate foundation_check.py exit 0. User enabled Docker afterward: Slice 1 full gates exercised the three container checks without skips, still only the baseline listener error. Later gates must observe current Docker result. .runs/quality-venv has pinned Ruff and ShellCheck. If npm test stops before the foundation check, run that check separately and report that it was not reached in the gate. Never call a failed or unchecked check passed. Finish edits and formatting before the final npm test. Save its complete output under reports/slice-5-test.log and preserve the real exit code. For intentionally failing runs, use a separate log. Send a short message at gate start and on substantial results; do not repeatedly inspect processes for status.

For an invariant requiring a deliberate failing run, report the exact command and exit code plus the actual intended failure, not merely the existing environment failure. Every report check must have command and exit code. State the weakest-point check, changes to expectations with their requirement source, reads beyond the selection and all implementation choices with alternatives/costs. Commit only explicit paths, English messages. Do not push/open PR.

For browser work, available tools mcp__playwright__browser_* can perform a one-time check; first read C:/Storage/The Brain/The Brain/.ai/skills/playwright-mcp/SKILL.md and all applicable references. Do not install a permanent browser framework. Preserve screenshots/evidence under this record and record actual inspected states. Questions go to the orchestrator.
