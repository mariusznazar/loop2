FAIL 99b2a271675fc32a8c136f563bad70c300444e1a

# Independent whole-change review

Range: `7a633a7ab44868427c9c824948b99d4400a631ca..99b2a271675fc32a8c136f563bad70c300444e1a`. Worktree: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`. Reviewer authored none of this change. Product files, index and branch were not changed. The only writes are ignored review evidence. No subagent, full gate, fix, commit or browser session was started by this reviewer.

**3 blocking Important findings; 0 Critical; 0 Minor; 0 out-of-scope findings.** No current gameplay defect was reproduced. The blockers concern required regression protection: mutations breaking two required behaviors survive the configured simulation tests, and the planned combat time-splitting/replay coverage was not delivered. The independent scratch checks pass on the reviewed implementation; they are evidence for the review, not a replacement for maintained tests.

## Important findings

### R1 — False group and rule conditions are not protected in combat

- Scope: in scope; blocking.
- Responsible slice: **3**, commit `ba80da339059dc55ee206f75f22a9c745897efe0`; slice **7**, commit `b960201d82830ce72767fbd6f1b5f2bb9b2ac4a9`, did not add the promised invariant coverage that would close this gap.
- Anchor: [tests/sim/combat.test.mjs:154](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/combat.test.mjs#L154), also its rule-condition case at line 142; implementation branches [src/browser/sim/program.ts:270](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/src/browser/sim/program.ts#L270) and line 272.
- Thread: new review finding.

**Do wklejenia:** Oba nowe testy warunków walki sprawdzają warunek prawdziwy po pierwszym ciosie: zdrowie wynosi 93, a próg 94. Usunięcie sprawdzania warunku grupy albo warunku reguły nadal przechodzi cały zestaw symulacji. Dodaj niezależne przypadki fałszywej pierwszej grupy i fałszywej pierwszej reguły, z przejściem do późniejszej reguły oraz kontrolą, że właściwy warunek rzeczywiście może wybrać wcześniejszą.

**Dlaczego to zgłaszam:** To podstawowe znaczenie programu walki z To do 4, spec §1 i zmienionego niezmiennika `program-rule-pick`, a nie poszerzenie o inny rodzaj strategii. W obecnych testach zarówno „sprawdź warunek”, jak i „zawsze wykonaj pierwszą regułę” dają ten sam wynik. Stryker mutants **199** i **203** zastąpiły odpowiednio `!conditionHolds(group...)` i `!conditionHolds(rule...)` przez `false`; oba przeżyły. Taka regresja każe postaci wykonywać np. odskok z grupy dla niskiego zdrowia mimo niespełnionego warunku i ignorować zapisaną przez gracza kontrę. Przejście dotychczasowego Pythonowego testu wyboru reguły tego nie dowodzi: jego scenariusze pozostają zwykłymi minutami Lasu. Własna próba recenzenta używa zdrowia 93/progu 50 i zdrowia przeciwnika 24/progu 10, sprawdza późniejszą regułę oraz dwa niezależne przypadki przełączenia warunku; poprawny kod przechodzi. Należy zachować tę ochronę w testach produktu, wraz z adnotacją niezmiennika.

### R2 — The first wolf can be omitted from permanent Understanding without a test failing

- Scope: in scope; blocking.
- Responsible slices: **5**, commit `e7c9912d95c987254b13a9ec7c9fc3973c5f1243`, adds the permanent creature merge; **6**, commit `471597bbe8defb909ed0fff2baeb6de2baa70902`, owns the first/repeated attack integration tests.
- Anchor: [tests/sim/encounters.test.mjs:344](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/encounters.test.mjs#L344); missing protection for [src/browser/sim/understanding.ts:297](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/src/browser/sim/understanding.ts#L297).
- Thread: new review finding.

**Do wklejenia:** Test pierwszego odkrycia wilka sprawdza chwilowy komunikat `discovery`, ale nie zapis wilka w `understanding.creatures`. Mutacja zerująca tę trwałą listę przechodzi wszystkie testy symulacji, przez co kolejne napaści mogłyby znów zatrzymywać grę jako nowe odkrycie. Sprawdź trwałą wiedzę po rzeczywistym odkryciu i użyj tego stanu do kolejnej napaści oraz zachowania wiedzy po restarcie lub zakończeniu.

**Dlaczego to zgłaszam:** Zadanie wymaga pierwszego odkrycia, wspólnej wiedzy i braku ponownej pauzy przy znanym wilku; spec §6 oraz D-118/D-119/D-143 dotyczą wiedzy zachowanej w grze, nie tylko treści jednego komunikatu. Mutant **403** zastępuje wynik `creatures: [...understanding.creatures, ...revealed.creatures]` przez `[]` i przeżywa. Testy odkrycia sprawdzają `state.discovery.creatures`, natomiast test znanej napaści zaczyna od niezależnie przygotowanej pełnej wiedzy. Nie łączą tych dwóch etapów. Wtedy gracz widzi poprawny pierwszy komunikat, ale wilk nie zostaje zapamiętany i następna napaść ponownie pauzuje. Własna próba recenzenta przechodzi na obecnym kodzie: sprawdza `understanding.creatures` po odkryciu, po `restart` i `end`, rozstrzyga pierwsze starcie, a po jawnie przygotowanej granicy karencji sprawdza drugą napaść bez `discovered` i bez pauzy. Nie trzeba zamrażać całego stanu gry ani rozszerzać testu na przyszłe stworzenia; trzeba zabezpieczyć nowy wymagany zapis i jego bezpośredni skutek.

### R3 — Slice 7 did not extend splitting and replay checks to combat

- Scope: in scope; blocking.
- Responsible slice: **7**, commit `b960201d82830ce72767fbd6f1b5f2bb9b2ac4a9`.
- Anchors: [tests/invariants/test_minute_span_split.py:86](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_minute_span_split.py#L86), [tests/invariants/test_map_run_repeatability.py:52](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_map_run_repeatability.py#L52), and [tests/sim/encounters.test.mjs:440](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/encounters.test.mjs#L440).
- Thread: new review finding.

**Do wklejenia:** Wymagane porównania podziału czasu i powtarzalności nie obejmują nowej walki: istniejące scenariusze niezmienników nadal wysyłają postać wyłącznie do `forest`, a test restartu napaści porównuje ziarno i początek strumienia, bez odtworzenia przebiegu. Dodaj utrzymywane porównania pełnego stanu i kolejności zdarzeń dla napaści, odkrycia, M+5 oraz końców w walce, a także odtworzenie napaści i tur po restarcie na tym samym ziarnie. Samo ponowne uruchomienie starych zestawów nie wykonuje tego zakresu.

**Dlaczego to zgłaszam:** Spec §8 jawnie wymaga, aby stałe testy chroniły powtarzalność i dzielenie czasu na nowych przypadkach. Plan Slice 7 precyzuje porównanie pełnego stanu i kolejności zdarzeń do odkrycia i obu końców. Ta zmiana dodaje drugą fazę minuty, przerwanie aktualnej czynności, oddzielny strumień losowy i rozstrzygnięcie wielu wymian w M+5, więc kontrola ograniczona do starej mapy nie dotyka nowego miejsca ryzyka. Jedyną zmianą slice 7 jest udana próba niezmieniania wejść w `test_simulation_inputs.py`. Raport autora twierdzi, że `encounters.test.mjs` zawiera już „split advancement”, lecz żaden z jego 20 testów nie porównuje przebiegu w jednej porcji z równoważnymi porcjami czasu ani nie odtwarza ukończonej walki po restarcie. Porównanie `stepMinute` z jednym wywołaniem `advanceMinutes(..., 1)` sprawdza zgodność dwóch wejść do pojedynczej minuty, a nie ten niezmiennik. Własny scratch porównuje stan i zdarzenia przy porcjach `[10]`, dziesięciu porcjach `[1]` i `[2,3,5]` dla pierwszej/znanej napaści, śmierci, wcześniejszego domknięcia oraz domknięcia M+5; obecny kod przechodzi. Nadal brakuje utrzymywanej ochrony oraz właściwego odtworzenia przebiegu ze strumieniem napaści. Nie wymagam zmiany każdej ścieżki z planu: te przypadki mogą trafić do najmniejszego właściwego istniejącego zestawu, ale muszą rzeczywiście wykonać i porównać nowy przebieg.

## Minor and out-of-scope findings

None.

## Declined to judge

None. The measured 0/20 completions was judged against the prescribed experiment and accepted as a result, not treated as a defect or as proof that the map cannot be solved. No tuning or success threshold is introduced by this review.

## Whole-task and slice assessment

The frozen task, spec, plan, the foundation report, all eight executor reports and the browser-evidence clarifications were read. The stale task-7 dependency sentence was judged against the supplied merged base and D-129–D-136; it does not alter the frozen scope. The source changes and foundation entries implement the present task rather than future spell, weapon-wear, saved-program or expedition work.

| Area | Assessment |
|---|---|
| Foundation e230046 and F01–F29 | Decisions, the two changed invariant sentences and glossary agree with the implemented minute order, five-minute wait, exchange meaning, attack exception, actor-relative health, creature knowledge, map unlocking and current absence of wear/creature drawings. No unsupported foundation change found. The evidence gaps above do not mean the current invariant sentences are false. |
| Slice 1 | Strict point-based own/opponent health conditions, missing opponent outside combat, validation and existing editor controls follow the task. Author's post-strike check is useful, but its true-only cases leave R1. |
| Slice 2 | Wolf data, 6/3/5 action effects, skills/predispositions and combat-only feasibility agree with the frozen numbers. Data/list adaptations preserve ordinary durations rather than introducing zero-minute ordinary actions. Extra conditions/Understanding/action-test paths are direct closed-list consumers. |
| Slice 3 | Independently inspected pure exchange resolution: wolf first, selection at current health, immediate death, no feasible action, single nonstacking reduction, wolf dodge and 40-exchange bound. Task arithmetic examples pass. R1 remains in the maintained protection. Caller repertoire filtering is an explicit contract, fulfilled by game integration. |
| Slice 4 | Map dimensions/resources/temperature/step, separate requirements, random entrance after layout, shared simulation availability, send refusal and HQ use agree. Extra HQ and purity checks are necessary consumers of the new API. No implementation defect found. |
| Slice 5 | Creature lists are initialized, copied, discovered and merged consistently; existing ordinary discoveries remain empty in that dimension. R2 identifies the missing assertion of the new permanent merge. Extra creature/revelation fixtures are appropriate. |
| Slice 6 | Both public complete-minute paths reach the final phase. Attack follows finished ordinary effect/completion; active combat freezes body and advances world/streak; M+5 resolves before terminal checks and next ordinary choice. Interruption drops current/target. Current filtered program and action starts feed counters; wounds preserve streak. Focused 20-case suite passes. No present ordering defect found. |
| Slice 7 | Successful frozen-input calls close a real purity blind spot and pass, but cannot replace the promised relational combat tests: R3. The measurement is faithful to the specified experiment. |
| Slice 8 | Composition and CSS use the existing tokens; formatter reads creature data and recorded facts without simulating. Supplied images visibly show readable wrapped record, required status priority and retained record on death and both completion windows; restart removes it. HQ/editor portions legitimately landed earlier. Browser evidence is component-harness evidence with the limitations below. |

The changed invariant test files are [test_program_rule_pick.py](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_program_rule_pick.py) (creature field in its knowledge fixture) and [test_simulation_inputs.py](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_simulation_inputs.py) (availability and successful frozen-input combat calls). [program_fixture.py](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/program_fixture.py) adds the creature catalog to full knowledge. `combat.test.mjs` carries `program-rule-pick` coverage, and encounter tests cover the action interruption exception. The unchanged split/repeatability tests are the subject of R3.

No network/key/externally supplied file trust boundary changes; no irreversible operation in this range. The review used the complete part map and glossaries, the decisions selected by simulation/browser-view/build-tools Scope and the invariants of these parts/every, including their linked meanings. Applicable guidelines were read whole: coding, testing, simulation module, content data, browser module and browser styleguide, with browser AGENTS. The one-command full gate remains the orchestrator's step.

## Independent checks

All commands below ran in the reviewed worktree. Focused tests used the repository's required `npm test -- <one file>` route. Python unittest progress emitted on stderr is wrapped as `NativeCommandError` text by PowerShell redirection in two logs; each process exited **0** and ended `OK`, not a test failure.

| Command/check | Exit / result |
|---|---|
| `git rev-parse HEAD` | 0; exact reviewed head, checked again after own evidence work. |
| `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` | Both 0; matching pinned `3aee7d958835cc19b95519f4d21b37538b78e3e1`. |
| `git diff 7a633a7ab44868427c9c824948b99d4400a631ca..99b2a271675fc32a8c136f563bad70c300444e1a` (in source/test/foundation groups), `git log` of this range, and `git diff --stat` | 0; 44 paths, 2287 additions, 153 removals. Reviewed complete range, not only slice 8. |
| `npm test -- tests/sim/combat.test.mjs` | 0; 9 tests. Log `31-combat.test.mjs.log`. |
| `npm test -- tests/sim/encounters.test.mjs` | 0; 20 tests. Log `31-encounters.test.mjs.log`. |
| `npm test -- tests/invariants/test_program_rule_pick.py` | 0; 8 tests. Log `31-test_program_rule_pick.py.log`. Passing scope is ordinary Forest scenarios. |
| `npm test -- tests/invariants/test_minute_span_split.py` | 0; 9 tests. Log `31-test_minute_span_split.py.log`. Passing scope is ordinary Forest scenarios. |
| `npm test -- tests/view/combat-line.test.mjs` | 0; 3 tests. Log `31-combat-line.test.mjs.log`. |
| `npm test -- tests/view/status-row.test.mjs` | 0; 28 tests. Log `31-status-row.test.mjs.log`. |
| `npm test -- .runs/task-cycles/walka-w-glebi-lasu/reports/31-probes.test.mjs` | 0; 3 independent scratch probes described under R1–R3; includes a fresh product build. Log `31-probes.log`. |
| Stryker main command below | 0; 391 mutants, 359 killed, 30 survived, 2 NoCoverage, no timeout/error. Its initial run passed the configured 24 simulation test files. |
| Stryker supplemental command below | 0; 40 mutants, all killed, no survivors/NoCoverage/error. |
| `git diff --check 7a633a7ab44868427c9c824948b99d4400a631ca..HEAD` | 0. |
| `git status --porcelain=v1` | 0, empty; product worktree remains clean. |

The weakest point of the review was accepting author statements about existing coverage as if passing old suites established the new semantics. The own-work check was therefore destructive-in-model testing through Stryker, followed by independent, ignored probes of the exact missing distinctions and reading the actual invariant scenario inputs. This distinguished correct current code from insufficient maintained regression protection without changing the reviewed source.

The mutation commands were:

```powershell
node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate 'src/browser/sim/combat.ts,src/browser/sim/run.ts:299-305,src/browser/sim/run.ts:338-345,src/browser/sim/run.ts:364-376,src/browser/sim/run.ts:493-598,src/browser/sim/game.ts:51-61,src/browser/sim/game.ts:308-318,src/browser/sim/game.ts:420-432,src/browser/sim/game.ts:484-486,src/browser/sim/game.ts:624-670,src/browser/sim/program.ts:144-151,src/browser/sim/program.ts:259-286,src/browser/sim/layout.ts:54-59,src/browser/sim/understanding.ts:136-148,src/browser/sim/understanding.ts:178-181,src/browser/sim/understanding.ts:245-299,src/browser/sim/data/actions.ts:84-105,src/browser/sim/data/conditions.ts:70-88,src/browser/sim/data/creatures.ts,src/browser/sim/data/maps.ts:76-96,src/browser/sim/data/balance.ts:8-12,src/browser/sim/data/skills.ts:29-35,src/browser/sim/data/archetypes.ts:18-21,src/browser/sim/random.ts:9-10'

node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate 'src/browser/sim/game.ts:155-156,src/browser/sim/game.ts:198-203,src/browser/sim/game.ts:412-414,src/browser/sim/game.ts:425-428,src/browser/sim/program.ts:233-236,src/browser/sim/understanding.ts:29-29,src/browser/sim/understanding.ts:56-56,src/browser/sim/run.ts:396-396,src/browser/sim/run.ts:465-465,src/browser/sim/run.ts:485-487'
```

Outputs are retained in [31-mutation.log](../reports/31-mutation.log), [31-mutation.json](../reports/31-mutation.json), [31-mutation-supplement.log](../reports/31-mutation-supplement.log) and [31-mutation-supplement.json](../reports/31-mutation-supplement.json). No mutation score threshold is used. Mutation build has no type checker, as D-94 requires; classifications below account for that rather than treating type-invalid survivors as gameplay defects.

## Every surviving/uncovered mutant assessed

IDs below belong to the retained **main** JSON. The supplemental JSON has none to classify. Grouped rows explicitly enumerate each affected ID.

| IDs / location | Classification and evidence |
|---|---|
| 199, 203 — program:270,272 | **Real gaps, R1.** False group/rule conditions can be bypassed without failing a maintained test. Independent positive and negative scratch cases distinguish both. |
| 403 — understanding:297 | **Real gap, R2.** Permanent creature merge replaced by empty list; first/known tests do not connect actual discovery to the next attack. |
| 7, 57 — combat:29,89, NoCoverage | **Not worthwhile to force.** Mutated text of defensive errors for a creature with no matching data rule or a chosen action without a combat effect. Current closed wolf data always has an unconditional fallback; the picker only returns combat effects. Testing these messages would require invalid content/inputs rather than a legal player sequence. |
| 5 — combat:28 | **Equivalent on legal current data.** Removing the no-selected-rule guard does nothing: wolf's final `always` rule ensures selection. Same reach as ID 7. |
| 17, 18 — combat:49 | **Equivalent on legal calls.** Replacing the loop's positive-health guard with true or nonnegative cannot add an exchange: combat starts alive, and the explicit lethal-hit branch breaks immediately. |
| 35 — combat:64 | **Noncompilable mutation by source inspection.** Empty string is not a `CreatureAction` discriminant (`strike`/`dodge`). No product type contract accepts it; no separate mutant typecheck was run. |
| 55 — combat:88 | **Equivalent on legal calls.** The character picker already rejects actions without a combat effect. Removing the subsequent defensive guard cannot change a selected legal action. |
| 95 — game:311 | **Equivalent on legal events.** Treating any `activityStarted` as a rule yields undefined rule ID for wait; the following ID guards skip it. |
| 99 — game:314 | **Equivalent on legal state.** If undefined ID is no longer explicitly skipped, the own-property guard still rejects it. |
| 103 — game:315 | **Equivalent on legal state.** A selected rule/combat event refers to a rule in the current reconciled count map; unavailable old rule IDs cannot be selected. Undefined IDs are separately rejected. |
| 118 — game:430 | **Noncompilable mutation by source inspection.** A string in `GameResult.events` is not a `GameEvent`. No separate mutant typecheck was run. |
| 132 — game:646 | **Equivalent on current legal final-phase events.** `every` versus `some` differs for an empty list, which only recomputes the already completed discovery; a phase with attack emits that attack, while combat/completion without attack does not add an attack revelation. No different player state results. |
| 134 — game:646 | **Equivalent on current legal events.** Rechecking discovery for other final-phase events does not reveal anything new: those events have no revelation cause in current data. Attack still causes the required recomputation. |
| 210, 211 — program:276 | **Equivalent at runtime for current effect shapes.** If the item guard is made true or OR, effects without `item` read an undefined backpack entry; `undefined < 1` is false, so they are still selectable. Stick strikes retain the actual stick count test. Type narrowing is also weakened, but equivalence is sufficient here. |
| 216 — run:299 | **Noncompilable mutation by source inspection.** Empty string is outside the closed `Stream` union; no separate mutant typecheck was run. |
| 245 — run:495 | **Equivalent on ended runs.** Without the outer early return, the body phase and final phase both return an ended run unchanged and no events. |
| 289 — run:546 | **Noncompilable mutation by source inspection.** Empty string is outside the death-cause union. No separate mutant typecheck was run. |
| 297, 298, 299, 300 — run:557 | **Not worthwhile to freeze.** They alter cooldown, or add unused combat fields, only on a run being permanently completed before turns. It cannot advance again, and Restart constructs fresh state. They do not change a result, a displayed record, the next run or any later attack. A whole-state expected literal for these unused ended-run details would add coupling without protecting gameplay. |
| 321 — run:571 | **Equivalent for actual map probability and generator.** Strict versus inclusive comparison cannot differ: generator values are multiples of 1/2^32, while current chance is 0.01, which is not such a multiple. No current draw can equal the boundary. |
| 354 — understanding:143 | **Equivalent on valid revelation/event shapes.** It changes the `item` absence check in the branch where the data cause has no item; after equal-kind checking, current event variants of that kind also have no item. Item-bearing causes still use their positive comparison. |
| 356, 358, 360 — understanding:145 | **Equivalent on current closed creature data.** The only attacked creature/cause is wolf; matching attack kinds cannot name a different legal creature, so weakening the creature match does not distinguish current reachable events. A second creature would require new discriminating fixtures with that data change. |
| 363 — understanding:146 | **Equivalent on valid current event shapes.** It changes the no-creature check only for non-creature causes, whose matching event kind has no creature field. |
| 394 — understanding:270 | **Not worthwhile for current reachable knowledge combinations.** Replacing addition of newly revealed creatures by subtraction still reports a creature-only discovery (negative is nonzero); actual first-wolf discovery reveals five combat vocabulary entries together with wolf, also nonzero. To suppress a discovery it needs a constructed partially learned wolf vocabulary with exactly one other new entry at that minute, which current atomic revelations cannot create. The explicit creature-only requirement is covered and this mutant does not break it. No need to enforce a mutation score with an unreachable fixture. |

## Visual evidence, experiment and limits

The reviewer opened the supplied actual images `first-attack.png`, `combat-log.png`, `completion-before-turns.png`, `combat-death.png`, `completion.png`, `map-open.png` and `restart.png`. They show readable wrapping, status/discovery/combat/body order, no creature figure on the terrain, map access for both characters, retained combat record on terminal screens and cleared record after restart. The saved harness imports actual view modules and public simulation; the completion pictures are explicitly prepared rare states. This is valid component-browser appearance evidence, not proof of an uninterrupted ordinary `startApp` journey. Code inspection confirms ordinary game-view child placement.

The original exact browser calls, focus assertion, controlled account response, DOM dump and process-stop evidence were not retained; the repaired author report says so. The specifically requested interrupted-target browser state is also unchecked there; the simulation/component case does prove `current`/target disappearance. Reviewer did not reproduce real-browser focus or rerun a browser session, and these are **not passed checks** in this report. No concrete visual defect was identified in the available evidence. For D-75/D-87/D-88/D-89: the present evidence does not establish an escaped critical UI defect, a requirement for whole-screen pixel identity, or recurring manual-check cost sufficient to reverse the existing automation exclusions. Missing retained evidence is not itself proof of such a return condition, and is not represented as successful focus verification.

The measurement source and per-seed output were compared with the baseline acceptance program obtained by `git show 7a633a7ab44868427c9c824948b99d4400a631ca:tests/sim/acceptance.test.mjs`. It uses actual `newMapRun` seeds 1–20, minute zero, standard body, empty backpack, legal post-Forest/post-wolf knowledge, an open map, top always stick/kick group and the exact 17-rule baseline (including satiety threshold 35), without tuning. Cap is 5000; all 20 die before it, one after two defeats. This is faithful to spec §8 and carries no minimum-success requirement. Reviewer inspected the reproducible source/results rather than overwriting the author's measurement artifacts with another run.

Full `npm test` and the foundation checker were **not independently rerun**: the dispatch assigns the gate to the orchestrator. Its supplied earlier full-gate failure is not a pass here: reported Windows `Get-NetTCPConnection` setup error in the serving-process invariant, five Docker skips, and a separately passing foundation check after the command chain stopped. This review does not resolve that environment issue or certify unchecked Docker behavior.

## Reaches beyond the dispatch

- No unrelated product part was added to the review. The whole-review selection read the foundation for the changed parts as required by the pinned method.
- Reached the full source of unchanged `test_minute_span_split.py`, `test_map_run_repeatability.py`, `test_restart_seed.py`, existing time/program-count tests and their fixtures to check the slice-7 claim and the actual scenario boundaries, rather than inferring coverage from test names.
- Reached the baseline acceptance program with `git show` to verify the prescribed experiment, not to invent a new benchmark.
- Wrote [31-probes.test.mjs](../reports/31-probes.test.mjs) only as ignored independent evidence; this is not a fix or an addition to the maintained test suite.

No unanswered design question remains for the reviewer. Corrective work should add the missing maintained protections, then rerun the focused checks and affected mutations; product behavior should change only if those checks expose a real mismatch.
