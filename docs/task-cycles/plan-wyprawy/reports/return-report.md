# Return report — Plan wyprawy

Status: done. No tracked change needed in this step.

Reviewed and returned head: `0533a13aa5ac9a147f81da768227d101dbace033`.
Complete range: `dce297060aeec3154e50593ee400c28b98649435..0533a13aa5ac9a147f81da768227d101dbace033` (implementation c39e10c and test fix 0533a13). Worktree: `C:/Storage/repos/loop2-wt/plan-wyprawy`, branch `task/plan-wyprawy`. Pin and gitlink both remain `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`. Read full return_step.md and foundation_step.md. No plan/spec and no new element entry required; element skills used in the original foundation step remain the source of its written entries. No cycle.md read.

## Final comparison

Compared the final foundation diff, task's carried entries/settlement rows, glossary and touched-part map against the final implementation. Re-read trip allocator, trip editor and trip text modules, start/deposit integration and relevant panel/HQ/status/rendering locations; checked final review and fix review, invariant labels and gate evidence. The only post-implementation code diff is the reviewed minimum-count test. Current bindings match code. Minor M1 concerns the recorded rejected alternative, not a binding/code mismatch; it is carried unchanged below as instructed.

| Task-named or search-selected entry | Final comparison evidence |
|---|---|
| D-3, D-4, D-18 | Pure simulation functions own state transitions; UI passes edits through existing simulation API. Capacity 60 in balance data, optional caps in map data, neither MVP map sets caps. No new state effect outside simulation. |
| D-44, D-118, D-119, D-120 | Trip editor uses shared controls, destructive Remove, repertoire-derived offered items filtered to item catalog (campfire omitted), data order and exhausted Add disabled. No unrevealed catalog offering. |
| D-50, D-53, D-55 | One team chest used at send/restart/deposit; HQ navigation and one manual run unchanged. Heading counts all item pieces. |
| D-62, D-132 | Terminal state/backpack remains visible and time stops. Retained display is not recoverable inventory: restart takes fresh chest equipment and end returns nothing. |
| D-64, D-65 | Shared carrying-capacity budget at entry/exit; gathering still uses character capacity, including pieces already taken at entry. Map caps apply only to transfers. Real gather/completion test covers the dangerous distinction. |
| D-71, D-145 | Completion deposit uses the completed minute's backpack; stick use/wear rules unchanged. |
| program glossary, D-90, D-91, D-167 | Program type contains groups plus trip plan. D-90 now says “holds” groups; glossary already included trip plan. New programs keep their existing empty group and gain two empty lists. |
| D-93 | Counts reconcile by rule identity and canonical condition/action. Trip-only changes leave counts; new invariant backlink describes this, not a new count-reset rule. |
| D-131, D-136 | Progress equality compares rule/group content and identity counters, excludes trip plan. Both trip edit and trip-only discard preserve streak and defeated attacks. Rule/group changes and switches retain their reset behavior. D-136 has exact approved addition. |
| D-164, D-166, D-170, D-171, D-172, D-173, D-174 | Program copy carries trip plan, save/dirty/conflict compares full data, saved edits do not touch ongoing copy. Restart carries current copy with unsaved edits. Switch changes copy but retains separate entry-bound bring snapshot. Shared editor stays usable on terminal screens. HQ warning reads the row-selected saved program; restart warning reads current copy. |
| D-122, D-147 | Game-view order remains status, discovery, encounter, then new actual deposit above body/backpack. Preview is below backpack. Screenshot evidence from author and reviewer remains in prior reports. |
| D-94 | New test selected for Stryker; I1 has a real edit-operation assertion at count 1 and independent fix mutation proof. Other survivor classifications remain reviewer's evidence. |
| D-21, D-23, D-40, D-141, D-144 and related selected UI/state dependencies | No new rule hierarchy, control architecture or encounter behavior. New transfer/rendering logic uses existing structures. No further binding uncovered on return. |
| Existing invariants: streak-program-change, saved-program-edit, copy-save, character-team, map-run-repeatability, restart-seed, simulation-inputs, content-identifiers, isolation/UI token-focus rules | No meaning change. Existing focused tests and final full gate cover their retained behavior; new deterministic transfer tests additionally check frozen inputs, copied snapshot and seed preservation. No weakened assertion or new exception. |
| Glossary: copy, map run restart, completion, headquarters | Existing meanings apply directly: copy is executed program; restart is a new run; deposit occurs only at completion; chest stays in HQ/team state. No new meaning or alternate usage found. |

## All eleven settlements

Each accepted row is written whole in meaning. None is deferred. Polish sentence below is ready for the request's explanation of what it settles.

| Row | Entry and extent | Meaning in Polish |
|---|---|---|
| 1 | D-180, whole | Plan wyprawy stoi pod grupami reguł; dwie listy mają wybór przedmiotu, liczbę, przesuwanie, usuwanie i dodawanie. |
| 2 | D-181, whole | Przedmiot może wystąpić raz na każdej liście, liczba jest całkowita od 1 bez pułapu rozgrywki, a błędny wpis pozostaje widoczny z ostrzeżeniem, zachowując poprzednią poprawną liczbę. |
| 3 | D-182, whole | Nowa gra i nowo utworzony program zaczynają z pustymi listami planu wyprawy. |
| 4 | D-183, whole binding; Minor M1 retained | Zakończenie lub restart przed domknięciem traci niesione przedmioty, a przy domknięciu przepada reszta spoza zamrożonej listy wynoszenia. |
| 5 | D-131 and D-136, existing entries updated | Zmiana lub porzucenie samego planu wyprawy kopii zachowuje passę i liczbę pokonanych napaści. |
| 6 | D-184, whole | Nagłówek skrzynki pokazuje liczbę sztuk i pułap, także przy pustej skrzynce. |
| 7 | D-185, whole | Po domknięciu faktycznie odłożony łup widać pod odkryciem i spotkaniem, nad ciałem i plecakiem, do restartu lub zakończenia. |
| 8 | D-186, whole | Pod plecakiem widać, co wyniosłaby teraz zamrożona lista po przycięciu; podgląd pokazuje też pusty wynik, gdy wymagają tego stan migawki lub zmiana kopii, i znika po śmierci i domknięciu. |
| 9 | D-187, whole | Mapa może osobno ograniczać wnoszenie i wynoszenie od zera; podczas zbierania pojemność plecaka nadal określa udźwig postaci. |
| 10 | D-188, whole | Przed wysłaniem i przy restarcie gra ostrzega o przycięciu przez mapę, gdy jej pułap jest niższy od planu ograniczonego udźwigiem. |
| 11 | D-189, whole current rule | Obecnie każdy start pobiera wyposażenie ze skrzynki i każde domknięcie odkłada łup, także na mapie już rozwiązanej. |

## Every carried projected entry

| Source entry | Written full/part, identifier and boundary | Meaning in Polish |
|---|---|---|
| How do items go into a map run and out of it? | D-179, approved binding paragraph in full; verification carries order, shortages, snapshot and warning. The task explicitly says its “outside a manual map run of a map already solved” clause does not itself implement equipment from nowhere. Accepted D-189 describes all current runs; task 14 owns the later solved-map equipment/payment exception. No assigned sentence omitted. | Plan jest częścią programu; wejście wiąże obie listy, wynoszenie zostaje zamrożone, a przenoszenie bierze po kolei tyle sztuk, ile mieści się w zapasie i wspólnych pułapach. |
| trip plan | Glossary `trip plan`, full approved text. | Plan wyprawy to dwie uporządkowane listy z liczbami: co postać zabiera do przejścia i co z niego wynosi. |
| Whose is the chest? | D-50, full approved binding completed from earlier team-only part, cap-per-kind violation added. | Skrzynka należy do drużyny i ma jeden wspólny pułap liczby sztuk; postać korzysta ze skrzynki swojej drużyny. |
| How is a map solved, and what opens the next one? | D-136, assigned part added exactly: “while a change of the trip plan alone leaves it”; related D-131 reconciled. Other existing solving rules retained. | Sama zmiana planu wyprawy nie zrywa passy. |
| What pays, and what takes from the chest? | D-189 records implemented part “Earned loot reaches the chest on completion.” plus accepted settlement 11. Other projected rewards/practice/earning-loop rules belong to tasks 10/14/18; none claimed as implemented by this request. This is the required partial record, not deferral of an assigned entry. | Zdobyty łup trafia do skrzynki przy domknięciu; na obecnym etapie dotyczy to również ręcznego przejścia rozwiązanej mapy. |
| What does a character's death take? | D-190 records implemented carried-item/chest part only, as explicitly assigned to task 13. Other death losses, resurrection and earning-loop effects are outside this part and remain task 14/18 scope. | Śmierć zabiera to, co postać niosła, także sztuki pobrane ze skrzynki; samej skrzynki nie zmienia. |
| program | Existing glossary entry already carries trip plan; fulfilled without duplicate. D-90 “holds” resolves group-only equation. | Program obejmuje uporządkowane grupy reguł i plan wyprawy. |

D-93's only textual change is verification linkage; counters' existing meaning is retained. D-164 already governs full program ownership and copies and needs no text change. No further lasting product choice was found beyond original author's reported implementation choices.

## Invariants, environment and surfaces

New invariants are authorized by accepted task/decisions, not inferred merely from behavior:

- `trip-transfer`: derives from D-50/D-179/D-187/D-189; equipment/deposit order, stock and caps, snapshot and once-only deposit, current solved-map rule. Po polsku: wejście i domknięcie przenoszą przedmioty zgodnie z planem oraz dostępnym zapasem i miejscem.
- `trip-run-end`: derives from D-179/D-183/D-189/D-190; no return on death/end/restart, completion remainder unavailable. Po polsku: przerwane przejście nie zwraca plecaka, a resztą po domknięciu nie można wyposażyć następnego przejścia.
- `trip-plan-progress`: derives from D-93/D-131/D-136; plan-only edit/discard keeps progress and counters. Po polsku: sama zmiana lub porzucenie planu wyprawy zachowuje postęp przejścia i liczniki reguł.

All three record `Violated: no`; no existing Violated mark changed. Existing invariants' meanings unchanged. The projected `solved-map-manual-run` is not an existing implemented invariant being marked satisfied: the task expressly accepts its future rule being unmet until task 14. D-189 records current scope.

Changed existing invariant tests and actual evidence:

| Invariant / file | Change | Red / green commands and evidence |
|---|---|---|
| program-closed-lists / test_program_closed_lists.py | Required empty trip fixture added | `npm test -- tests/invariants/test_program_closed_lists.py`: deliberate temporary unknown-condition acceptance, exit 1 (2 assertion failures); restored exit 0 (3 tests). closed-invariant-red.log / closed-invariant-green.log. |
| program-rule-pick / test_program_rule_pick.py | Required empty trip fixture added in generated programs | `npm test -- tests/invariants/test_program_rule_pick.py`: deliberate always-condition false, exit 1 (11 subtest failures); restored exit 0 (8 tests). pick-invariant-red.log / pick-invariant-green.log. |
| program-world-reference / test_program_world_reference.py | Exact trip-list entry count exemption, valid-trip control and hostile surrounding numeric structures | `npm test -- tests/invariants/test_program_world_reference.py`: exit 1 before schema exemption, exit 0 after (3 tests). world-red.log / world-green.log. |
| program_fixture.py | Shared fixture now contains required empty trip lists; no independent invariant label | Covered through the consuming invariant tests above and parent's final full suite; no separate shared-fixture test invented. |

New invariant tests have initial missing-transfer/progress red in trip-red.log (exit 1), and deliberate premature payout/progress-reset probe in trip-invariants-red.log (exit 1, three assertions), then trip-invariants-green.log exit 0. Death/end and progress cases fail on those deliberate breaks; all temporary mutations restored. I1 adds minimum count acceptance without a new invariant claim.

Environment facts: none added/changed; no new external premise. Glossary: only new `trip plan`; no additional term needed. Part map: no changes needed. Simulation includes trip.ts, state types/data and tests; browser-view includes new editor/lines and tests; product-foundation includes the written entries; build-tools includes Stryker test selection. Existing patterns claim all new files. No responsibility, allowed dependency, external-context partner, trust boundary or surface changed.

## Verification history counts and evidence limits

Counts below distinguish verification runs from individual assertion counts. They cover author work and fix, excluding reviewer/parent runs. A failure followed by a pass required a code/fixture correction or restoration of an intentional break; no flakiness was observed. Exact original shell command strings and command-level exits for 23 initial-stage executions are retained in [author-command-history.json](author-command-history.json), recovered from author CommandExecution records. The companion [author-report-repair.md](author-report-repair.md) gives exact formatter/linter invocations and limits; [fix-report.md](fix-report.md) gives exact fix invocations. No check was rerun merely to improve counts.

| Verification command | Failed runs | Passed runs | Classification/evidence |
|---|---:|---:|---|
| `npm test -- tests/sim/trip.test.mjs` | 8 observed: 7 with exit 1, 1 standalone exit unretained | 6 with exit 0 | Failures: initial compile (log overwritten), initial expected 3 assertions, two death-fixture errors, cap-fixture error, deliberate invariant break, two deliberate count<=1 probes (first exception then explicit assertion). Passes: trip-green, trip-caps-green, trip-invariants-green, tests-sim-trip.test, trip-last, fix-count-one-green. Final 14/14. |
| `npm test -- tests/invariants/test_program_world_reference.py` | 1 exit 1 | 1 exit 0 | Legitimate trip-count schema red, then narrow scanner correction. |
| `npm test -- tests/invariants/test_program_closed_lists.py` | 1 exit 1 | 1 exit 0 | Deliberate invariant proof; restored. |
| `npm test -- tests/invariants/test_program_rule_pick.py` | 1 exit 1 | 1 exit 0 | Deliberate invariant proof; restored. |
| `npm test -- tests/view/status-row.test.mjs` | 1 exit 1 | 1 exit 0 | Positional test selector correction after warning insertion. |
| `npm test -- tests/quality/test_eslint.py` | 1 exit 2 | 0 | Wrong guessed path, no test ran. Replaced by actual quality-file check, not a pass of this nonexistent command. |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 2 exit 0 | quality.log and fix-quality.log, 5 checks each. |
| `npm test -- tests/sim/program.test.mjs` | 0 | 1 exit 0 | Retained focused regression log. |
| `npm test -- tests/sim/copy.test.mjs` | 0 | 1 exit 0 | Same. |
| `npm test -- tests/sim/program-list.test.mjs` | 0 | 1 exit 0 | Same. |
| `npm test -- tests/sim/program-counts.test.mjs` | 0 | 1 exit 0 | Same. |
| `npm test -- tests/sim/repertoire.test.mjs` | 0 | 1 exit 0 | Same. |
| `npm test -- tests/sim/discovery.test.mjs` | 0 | 1 exit 0 | Same. |
| `npm test -- tests/sim/completion.test.mjs` | 0 | 1 exit 0 | Same. |
| `npm test -- tests/view/program-editor.test.mjs` | 0 | 2 exit 0 | editor-tests and focused regression logs. |
| `npm test -- tests/view/program-panel.test.mjs` | 0 | 1 exit 0 | Retained regression log. |
| `npm test -- tests/view/headquarters.test.mjs` | 0 | 1 exit 0 | Retained regression log. |
| `npm test -- tests/view/trip.test.mjs` | 0 | 2 exit 0 | trip-view and regression logs. |
| `npm run build` | 0 | 1 exit 0 | Standalone browser build; focused npm tests also build as their documented implementation. |
| Exact initial Prettier / ESLint invocations in repair report | 0 | 1 exit 0 each | Dynamic selection is preserved as executed, not reconstructed from later state. |
| Exact final Prettier invocation in repair report | 0 observed | Standalone exit unretained | Three processed paths in log; combined command exit 0 belongs to following trip tests. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 2 exit 0 | Before and after staging new files; no fresh run in return. |

Two historical precision corrections:

1. Initial compile diagnostic was overwritten in trip-red.log. Its original command record preserves exit 1; this return does not claim its separate log was retained.
2. `trip-expanded.log` records a failed test, but original invocation was `npm test -- tests/sim/trip.test.mjs > .runs/task-cycles/plan-wyprawy/trip-expanded.log 2>&1; Get-Content -Tail 45 .runs/task-cycles/plan-wyprawy/trip-expanded.log`. Its shell exit **0** belongs to Get-Content; npm's standalone exit was not saved. This corrects the author report's earlier shorthand “exit 1” for that run. It is counted as observed failed verification with unknown standalone exit, never a pass.

Proof wrapper commands `python -B .runs/task-cycles/plan-wyprawy/prove_existing.py` and `python -B .runs/task-cycles/plan-wyprawy/prove_invariants.py` complete successfully (original compound invocation of the latter also ran rg); their scripts capture/assert nested npm exits, so nested red/green codes above are actual captured values. Fix red probes' exact commands/exit 1 and final green/quality exit 0 are in fix-report.md. Standalone `git diff --check` passes in original author and fix; no product verification repeated here.

Separate independent evidence: reviewer initially found I1 and later PASS at 0533a13; `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/programs.ts:207-207"` exit 0, all 3 mutants killed. Parent final `npm test` at unchanged 0533a13 exit 0: 804 Node tests pass, Python 315 total with 5 Docker skips (deploy 3/invariants 2), quality 40 pass and integrated foundation 0 errors. final-gate.log confirms suite summaries. The earlier mixed-tree failing gate remains historical and is not represented as a clean-base or final failure.

Unrun by author in return: full gate and Stryker (parent/reviewer ownership, already evidenced separately), new browser pass (no view change since inspected head), persistence/account-to-game end-to-end and deployment (outside this change). Five final Docker skips remain skips, not passes. Earlier screenshot path restriction and in-memory screenshot evidence remain in author report; reviewer retained its own UI evidence. No new approval required.

## Unchanged review concerns for parent

### M1. D-183 nazywa odrzuconą alternatywę nieznaną, choć źródło ją podaje

Nowy wątek. Miejsce: [foundations/decisions.md:3244](https://github.com/mariusznazar/loop2/blob/0533a13aa5ac9a147f81da768227d101dbace033/foundations/decisions.md#L3244). Źródło: [zamrożone zadanie, Q6:58](../task.md#L58).

**Do wklejenia:** Zastąp `Rejected: unknown` w D-183 odrzuconym wariantem z Q6: oddawaniem do skrzynki wniesionych przedmiotów przy „Zakończ” przed domknięciem. Źródło nazywa ten wariant darmowym cofnięciem pobrania oraz wyjątkiem dla zadań 14 i 18.

**Dlaczego:** Wiążąca reguła D-183 wiernie przenosi ustalenie i odpowiada kodowi. Nieznane nie jest jednak to, co odrzucono: Q6 podaje wariant B i jego koszt. Pozostawienie `unknown` gubi powód odrzucenia powrotu wyposażenia; przyszły autor może ponownie proponować rozwiązanie już rozważone. Nie zmienia to bieżącej reguły ani działania gry, dlatego Minor.

Declined to judge — unchanged:

- Wyjątek rozliczenia ręcznego przejścia rozwiązanej mapy — zadanie jawnie zostawia go zadaniu14 i przyjmuje obecnie pobranie oraz wypłatę; oceniałem zgodność z tym stanem przejściowym, nie implementację przyszłego wyjątku.
- Trwały zapis/wczytanie gry i wersjonowanie formatu — zadanie16, nieobecne w bazie i niewymagane w tym zadaniu; nie wymagałem nowego pipeline ani schematu.
- Pętla zarobkowa i pozostałe konsekwencje śmierci przewidziane dla zadania18 — poza zakresem części D-190 realizowanej teraz; oceniałem niesione przedmioty i nietkniętą skrzynkę.

## Return checks, cleanup and searches

Actual read-only identity command `git -C .the-way rev-parse HEAD; git ls-files --stage -- .the-way; git rev-parse HEAD; git status --short` returned exit 0, matching pin/gitlink, reviewed head and empty status. Foundation diff and part-map comparison made no edits. No commit in this step.

Stopped own known HTTP fixture exec session **96265** with `write_stdin({session_id:96265, chars:"\u0003", yield_time_ms:1000, max_output_tokens:1500})`. Tool reports process finished with exit 1 after interruption; no remaining session id. This is intentional cleanup, not a failed check. No process search or broad killing, no other browser/server touched. Ignored fixture remains reproducible from report.

Reaches: original author transcript read selectively to recover precise verification history; no new product/foundation scope. All new working evidence remains under this cycle.

### Searches not found or unclear

No new unresolved source/code search. Historical searches and resolved wrong paths remain in author-report.md and author-report-repair.md. Return transcript recovery exposed the unretained standalone npm exit for trip-expanded.log described above; there is no missing outcome (the log has the failing test), only missing captured npm exit. Final Prettier standalone exit and overwritten initial compile log remain explicitly limited. No other meaning question found.
