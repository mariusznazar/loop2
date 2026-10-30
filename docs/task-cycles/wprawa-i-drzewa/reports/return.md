# Return step — wprawa-i-drzewa

## Status and boundary

**Status: done.** The return comparison found one test/catalog mismatch, corrected below. No further foundation wording change is needed on this branch.

- Starting commit: `a9f2930195d0637a330d224cc046362e0a1cd1c7`.
- Final commit: `2ce1616a0502949bce585f909e3be4b226d61430` — `fix: :white_check_mark: include patrol in closed action checks`.
- Worktree: `C:/Storage/repos/loop2-wt/wprawa-i-drzewa`; branch `task/wprawa-i-drzewa`.
- Process checkout and gitlink verified at `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`.
- Only tracked change in this stage: `tests/invariants/test_program_closed_lists.py`, 2 added lines and 1 removed line. Working tree clean after commit.
- No target merge, renumbering, push, request, deployment or external-state operation. The separately advanced target `56fa086` was not merged. Fresh independent review and the orchestrator's later combined-tree full gate remain required.

## Newly exposed full-gate mismatch

The second full `npm test` at the starting commit exited **1**, not pass. Its preserved evidence is [gate-2.log](../gate-2.log#L883): Node 807 passed; workflow 5 passed; deployment 66 run with 3 skips; invariants 204 run with 1 failure and 2 skips; quality 40 passed. Its final foundation stage did not run.

The remaining failure was the deliberate catalog tripwire in `program-closed-lists`: the accepted task adds Obchód, implemented as `patrol`, but the test's independent handwritten `ACTION_KINDS` omitted it. The invariant and its source D-23 remain correct: programs using kinds absent from the data must be refused. The accepted task's To do 6, Q3/Q9 and settlement 5, together with D-185, establish patrol as a listed action; updating the expected catalog is authorized by that requirement, not inferred merely from a passing product output.

I reproduced the failure with the focused command before editing: 3 tests, 1 failed assertion reporting the catalog mismatch. I added `patrol` to the handwritten tuple and `{"kind": "patrol", "resource": "berry"}` to the explicit valid program. The latter preserves the test's promise to demonstrate acceptance of every listed action, both in headquarters and during a run. A known action may stay in a program even when its character cannot execute it; D-126 and the branch-ownership tests govern that separate condition. All existing unlisted-kind examples, rejection assertions, comparison controls and tripwire assertions remain intact. The same command then passed all 3 tests.

## Accepted settlements mapped to entries

Each of the 11 accepted rows is present. Rows 11 and 13 were rejected by the human, so they create no entry. No accepted row is deferred or assigned a different meaning.

| Settlement row | Entry | Comparison with the implementation |
|---|---|---|
| 1 — one practice per successful action, including full satiety and effective dodge | D-181, under D-179 | `practiced` increments once per effect; run landing counts one gather/patrol/scout effect; combat counts damage and consumed effective dodge reduction. |
| 2 — practice paid to the runner in the completion minute, early exits retain prior character practice | D-182 | The run has separate `practice`; `advanceMinutes` applies `paidPractice` after completion to the matching character; end/restart do not pay an unfinished run. |
| 3 — whole tree discovered with its first action and named in the discovery line | D-183 | `newlyRevealed` finds trees from newly revealed actions; the shared Understanding retains them; `discoveryText` names each tree before the condition sentence. |
| 4 — branch action discovered with the tree; headquarters editor currently lacks bought-branch actions | D-183, D-184; accepted D-120 exception; D-119 | Patrol's action data uses `treeDiscovered`; repertoire requires the buyer's rank; both in-run editor modes use the runner's snapshot; headquarters supplies no purchased ranks. |
| 5 — Obchód, Czysty płomień and Zwiad with their accepted limits | D-185, D-186; accepted D-63 exception | Patrol is guaranteed, takes the current tile's stock up to data/cap limits and requires a nonempty tile/nonfull backpack. Clean flame takes zero sticks and the ordinary nature-energy cost. Scout reveals current tile and neighbours. |
| 6 — carrying capacity currently 15 with no raising branch | D-64 | Capacity remains in traits at 15; the branch catalog has no carrying-capacity effect. The decision retains “currently”. |
| 7 — one-game-minute floor | `action-duration-minimum` | `actionMinutes` clamps the scheduled duration; the citing skill test was demonstrated failing with the clamp removed during initial authorship. |
| 8 — headquarters rows, previews, maxima and absence before discovery | D-187 | `skillText`, `branchText` and the character panel implement the accepted strings, price omission at maximum, absent nonnumeric preview and disabled purchase states. |
| 9 — headquarters purchase, effective next run, currently no in-run purchase or undo | D-188 | `buyBranch` refuses any retained run; only the buyer's stored rank changes; sends snapshot skills; the purchase is wired in headquarters. |
| 10 — positive run-practice line below the body | D-189 | `practiceText` includes positive gains, and `game-view` inserts it below the body; retained end states retain its content until restart/end. |
| 12 — every manual completion currently pays, including solved maps | D-182 | Payment does not depend on whether `solvedMaps` already contains the map; the ended-run guard prevents paying the same retained completion twice. |

Q7's temporary-MVP qualification, repaired by R1, remains in D-64, D-182, D-184 and D-187–189. Projected D-119, D-179 and D-180 retain their approved binding wording under Q7's exception. Q8's numbers remain requirements in data and tests, not additional decisions rejected with candidate 11. The single kicking threshold and differing cumulative branch costs are retained as accepted; no balancing change was inferred.

## Projected entries mapped to the foundation

| Projected entry named by the frozen task | Result |
|---|---|
| How does a character skill grow? | D-179, approved binding sentence retained; practice and ranks are stored, while level, points and effects are derived. |
| What describes a character? | D-180, approved binding sentence retained; general traits remain separate from skill-specific branch effects and archetype predispositions. |
| Whose is the knowledge of the world, and what may a character use of it? | D-119 contains the implemented bought-branch ownership and shared computation; D-120 has the explicitly accepted branch exception. The task expressly assigns server “saved once” to task 16, so this branch says shared Understanding and does not claim server persistence. |
| practice | Glossary `practice`, approved meaning retained. |
| trait | Glossary `trait`, approved meaning retained. |
| Understanding | Existing glossary entry gains branches while retaining creatures and the initially known “Zawsze”. |
| character skill | Existing glossary entry already matches; no duplicate written. |
| What pays, and what takes from the chest? — the part this task makes true | D-182 records manual practice payment at completion and no payout on death/early exit. Q1 and row 12 explicitly authorize current repeated-completion payment; the complete projected rule's first-solution restriction is not falsely represented as implemented. |
| When does the player learn what the world holds? | D-118 includes branches; D-183 specifies tree/action discovery. |

The frozen task contains the named projected binding text and assigned portions; the original author and independent whole-change review also compared their complete source entries. No source revision was substituted during this return. The already recorded accepted exception about repeat payment is retained; it is not an unresolved collision or a newly proposed entry.

## Meanings of every foundation entry changed by this task

These are the complete set of changed entries across the task branch, including the earlier qualification repair. **This return step changes none of their wording.** The one Polish sentence in each row is ready to carry into the request.

| Entry | Znaczenie |
|---|---|
| [D-63](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L1200) | Wykupiony Czysty płomień pozwala zapalić ognisko samą energią natury zwykłego zapalenia, zachowując patyki w plecaku. |
| [D-64](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L1230) | Plecak liczy wszystkie sztuki razem, a udźwig wynosi dziś 15 i żadna obecna gałąź go nie podnosi. |
| [D-118](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L2035) | Gałęzie, tak jak pozostałe odkrywane rzeczy świata, wchodzą do Zrozumienia podczas gry i zatrzymują czas przy odkryciu. |
| [D-119](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L2059) | Wspólne Zrozumienie daje postaci repertuar zgodny z jej archetypem i zakupami, a akcja kupionej gałęzi jest dostępna jej właścicielowi. |
| [D-120](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L2085) | Predyspozycja archetypu otwiera umiejętność, lecz akcja gałęzi wymaga także kupienia tej gałęzi przez postać. |
| [D-144](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L2640) | Obrażenia ciosu i kopnięcia oraz redukcja odskoku obejmują premię wykupionych stopni właściwych gałęzi. |
| [D-150](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L2730) | Cios patykiem, kopnięcie i odskok rozwijają trzy odpowiadające im umiejętności maga. |
| [D-179](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L3179) | Umiejętność rośnie przez skuteczne działania, a z zapisanej wprawy i stopni gra wylicza poziom, wolne punkty oraz działanie gałęzi. |
| [D-180](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L3194) | Postać opisują cechy, umiejętności i predyspozycje archetypu, a liczba dotycząca jednej akcji należy do drzewa jej umiejętności. |
| [D-181](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L3209) | Skuteczna akcja daje jedną wprawę w minucie skutku, także przy kilku sztukach lub kafelkach, a odskok dopiero wtedy, gdy zmniejszy cios. |
| [D-182](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L3224) | Każde ręczne domknięcie płaci dziś zebraną wprawą raz w swojej minucie, a śmierć i wcześniejsze przerwanie zostawiają dotychczasowe umiejętności postaci. |
| [D-183](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L3239) | Pierwsza odkryta akcja umiejętności ujawnia jej całe drzewo oraz otwierane przez nie akcje, a linia odkrycia nazywa drzewo. |
| [D-184](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L3254) | Edytor poza przejściem nie proponuje dziś akcji kupionych gałęzi, natomiast oba edytory w przejściu korzystają z repertuaru bieżącej postaci. |
| [D-185](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L3269) | Obchód daje pewny zbiór z bieżącego kafelka, a on i Pełna garść respektują pozostały zapas oraz wolne miejsce w plecaku. |
| [D-186](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L3284) | Zwiad odsłania bieżący kafelek razem z sąsiadami i ujawnia znalezione tam przedmioty w tej samej pauzie odkrycia. |
| [D-187](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L3299) | Siedziba pokazuje dziś poznane umiejętności z wprawą i punktami oraz gałęzie z działaniem, ceną i stanem przycisku Kup. |
| [D-188](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L3314) | Kupno stopnia odbywa się dziś w siedzibie i działa od następnego przejścia kupującej postaci, a gra nie ma obecnie cofania zakupu. |
| [D-189](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/decisions.md#L3329) | Widok przejścia pokazuje dziś dodatnią wprawę pod ciałem i zachowuje tę linię po śmierci oraz domknięciu do restartu lub zakończenia. |
| [action-duration-minimum](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/invariants.md#L948) | Akcja skrócona gałęziami trwa co najmniej jedną minutę gry. |
| [Understanding](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/glossary.md#L118) | Zrozumienie zapisuje odkryte akcje, przedmioty, warunki, stworzenia i gałęzie oraz znany od początku warunek Zawsze. |
| [practice](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/glossary.md#L181) | Wprawa jest sumą skutecznych wykonań akcji danej umiejętności. |
| [trait](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/glossary.md#L187) | Cecha jest liczbą opisującą postać i działającą szerzej niż w jednej akcji. |

The unchanged [character skill](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/foundations/glossary.md#L5) already defines an independently growing area of the character's abilities.

## Comparison with existing entries and parts

The comparison included the changed entries above, the frozen task's Decisions in play, and the neighbouring entries found during the original foundation search. That search is not repeated as a new before-merge search. Existing whole-entry reading from authorship remains applicable; this return reread the changed bindings and the relevant linked entries, and followed their consumers in source.

- D-04/D-18/D-23: the view calls pure simulation transitions for purchases; numbers, names, curves, branch effects and revelation metadata stay in data. Character actions still come from the ordered program; patrol is a data-listed action, which is why its invariant catalog required correction.
- D-53/D-55: headquarters and the single-manual-run arrangement are unchanged. D-63/D-64 contain the task's explicitly approved exceptions/current scope. D-65/D-66/D-67/D-69 retain full-backpack refusal, no stock loss on a missed normal gather, scheduled renewal and feeding at the action's end. The new branches do not replace those rules.
- D-71 and D-175–178: practice is added with effects, before completion pays; combat practice lands when combat resolves; ordinary lighting still checks and pays nature energy. The nature-energy range and ordering remain intact.
- D-80/D-82: expectations are grounded in the accepted task's numeric examples. Catalog keys in the full-knowledge helper construct input; the closed-list expectation remains independently handwritten.
- D-118/D-119/D-120/D-122/D-126/D-127/D-128: tree revelation and patrol's revelation are data-driven, discovered knowledge is shared, branch availability belongs to its buyer, and unavailable rules/groups remain stored and are skipped. The fixed full-knowledge helper holds trees; the local program-rule fixture preserves them while removing the specific lists its scenarios name.
- D-131/D-132/D-136/D-164/D-173 and the saved-program rules: branch actions use the existing copy/saved-program edit paths, whose reset and save behavior is unchanged; payment does not alter solving conditions; the ended-run display retains the final state. Practice snapshots do not rewrite saved programs or their identities.
- D-144/D-150: branch bonuses augment the existing combat numbers, and practice follows the successful combat effect, including effective dodge consumption. The R2/R3 integration tests and subsequent independent mutation result support their repaired coverage; R4/R5 remain Minor, not silently treated as fixed.
- Task-named invariants `map-run-repeatability`, `minute-span-split`, `simulation-inputs`, `content-identifiers`, `exploring-reveal`, `character-team` and `saved-program-edit` retain their sentences and methods. Skill snapshots preserve input isolation and determinism; scout still requires an unrevealed current tile; identifiers come from data. The other run/program invariants selected at authorship also retain their existing contracts. The second full-gate record identifies the closed-list tripwire as its sole failing method; this is attributed evidence, not a new author full-suite run.
- `action-duration-minimum` retains its accepted source sentence, method `test`, citing test and `Violated: no`. The new closed-list correction changes neither that invariant nor any other invariant sentence or violation marker.
- `browser-view` still owns the new view module through its existing patterns and depends on simulation. It uses existing typography, controls and roles; the original author and reviewer supplied browser evidence. No icon/font boundary changed.
- `simulation` already claims the new module and tests and explicitly claims `program_fixture.py`, `test_program_rule_pick.py` and `test_program_closed_lists.py`. No part boundary or dependency change is needed for the expanded test reach.
- `build-tools` already claims `stryker.config.json` and mutation analysis; the new skill-test registration conforms to D-94 and `mutation-test-selection`. No dependency, external source or trust boundary changed.

No new external source on which the product rests, no new nonstandard term and no additional lasting choice needing an entry emerged. `practice`/`trait`/Understanding already carry the new meanings; rejected candidate 13 is not revived. Snapshot representation, stable view rows and fixture construction remain implementation choices already reported. There is no foundation entry proposed or deferred by this return.

## Invariant tests, surfaces and violation markers

- New citing test in the whole task: `tests/sim/skills.test.mjs` for `action-duration-minimum`; the original clamp-removal failure and restoration remain in the author report.
- Changed existing invariant test in the earlier gate correction: `tests/invariants/test_program_rule_pick.py` for `program-rule-pick`, preserving the full fixture before deliberate filtering; shared helper `tests/invariants/program_fixture.py` also changed there.
- Changed existing invariant test in this return: `tests/invariants/test_program_closed_lists.py` for `program-closed-lists`, with the accepted patrol kind and an explicit valid patrol example. The invariant itself stays unchanged and `Violated: no`.
- No invariant surface, method, part assignment or violation-marker change in this return. No new trust boundary and no irreversible operational action.

## Exact checks in this return

Commands ran from the worktree root.

| Command | Exit | Result |
|---|---:|---|
| `git ls-files --stage -- .the-way` | 0 | Expected pinned gitlink. |
| `git -C .the-way rev-parse HEAD` | 0 | Same pinned checkout. |
| `npm test -- tests/invariants/test_program_closed_lists.py` | 1 | Before correction: 3 tests, 1 assertion failure at the catalog tripwire. |
| `npm test -- tests/invariants/test_program_closed_lists.py` | 0 | After correction: all 3 passed. |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 passed. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors; standalone result, not the skipped final stage of gate 2. |
| `git diff --check; git diff -- tests/invariants/test_program_closed_lists.py; git diff --numstat; git status --short` | 0 | Only the intended test, 2 additions/1 deletion; no whitespace errors. |
| `git add tests/invariants/test_program_closed_lists.py; git commit -m "fix: :white_check_mark: include patrol in closed action checks"; git rev-parse HEAD; git status --short` | 0 | Final commit above, clean tree. |

No full gate, mutation run or browser rerun was made in this return. The change is confined to an invariant's catalog/control data; existing production and UI behavior is unchanged. The first full gate's 349 invariant failure instances and the second full gate's one failure remain failures in their original logs; focused passes do not retroactively change them.

The weakest-point check was whether merely adding the kind to the tripwire would leave the “all listed kinds are accepted” control incomplete. Reading the whole test exposed that risk; the explicit valid patrol rule corrects it, and the same real `setProgram` driver tests acceptance with and without a run. No production-derived expected program was introduced.

## Earlier author failures and run-count limits (WAY-261)

The original author report preserves results but does not enumerate every invocation. The table below counts **only the distinct invocations explicitly described there**, not a guaranteed exhaustive transcript. Exact total invocation counts for that initial implementation stage are **nieustalone**. No tests were rerun to manufacture those counts, and reviewer runs are not counted as author runs.

| Initial author check | Explicitly recorded ordinary failures | Explicitly distinguishable successful runs | What failed / later result |
|---|---:|---:|---|
| `npm test -- tests/sim/skills.test.mjs` | 1 | at least 2; total nieustalona | Initial scout fixture selected a non-neighbour; corrected. The report separately names the restored-clamp pass and final post-revelation pass, each with 16 passing tests. Intentional defects are below. |
| `npm test -- tests/sim/discovery.test.mjs` | 1 | 2 described; total nieustalona | Two expected discovery shapes lacked trees; corrected run and later post-revelation run each passed, last 31 tests. |
| `npm test -- tests/view/program-editor.test.mjs` | 1 | 1 described; total nieustalona | Catalog expectation lacked patrol; corrected run passed 39 tests. |
| `npm test -- tests/sim/data.test.mjs` | 1 | 2 described; total nieustalona | Four stale expectations omitted patrol or expected zero duration; corrected and later explicit-revelation runs passed, last 31 tests. |
| `npm test -- tests/sim/team.test.mjs` | 1 | 1 described; total nieustalona | Full character expectations omitted initial zero skills; corrected run passed 7 tests. |

Intentional mutations are separate from those ordinary failures:

- Initial author: one explicitly recorded clamp-removal run failed because a walking duration became −1 instead of 1; restoration passed. The report also records a later ordinary final pass; the restoration is already included among the successful skill runs above, not an extra count.
- R1–R3 fix stage has an exact preserved four-run sequence in `reports/fix.md`: initial added-test run **PASS**, combat-subtraction demonstration **FAIL** (17 pass/1 fail), cross-action-bonus demonstration **FAIL** (17 pass/1 fail), restored source **PASS** (18 pass). Thus that stage has exactly 2 PASS and 2 intentional FAIL for the skill file.
- Gate-fixture correction: action-in-progress **FAIL then PASS** (2 tests); program-rule-pick **FAIL then PASS** (8 methods, 11 failure instances before correction); pace ordinary **PASS**, isolation **PASS**, quality **PASS twice** around the two file changes. Its intentional empty-tree fixture experiment was **PASS** (9 tests), explicitly a coverage limitation rather than a caught defect, and the full catalog was restored.
- This return: closed lists **FAIL then PASS** (3 tests), plus quality **PASS** and standalone foundation **PASS**, as the exact command table above records.

The ordinary initial failures above are at least the failures the preserved author report names; I do not claim their counts form a complete execution ledger. Typecheck, formatting, browser-tool failures and their corrections remain separately recorded in `reports/author.md`; none is erased by the latest results.

## Reaches, questions and remaining concerns

Read the pinned return/foundation-step instructions, frozen task, original author/whole-change review reports, fix/fix-review reports and gate-correction/gate-review reports. Used the project invariant entry method to check maintenance of a citing test; no new or changed invariant sentence needed to be drafted. Coding/testing guideline reading from the immediately preceding correction remains current; the same Python test/support-code guidance applies. Read the entire changed test before editing and its `program-closed-lists` invariant and D-23, with D-126/D-185 distinguishing storage of a known kind from branch execution.

Additional selective source reads covered skill calculation/purchase, practice landing and payment, branch feasibility and resource transfer, combat effects, repertoire/discovery, the character-skill UI and its placement, and the expanded part-map entries. The only new implementation reach beyond the original author stage is the closed-list test named by this handoff. It is already mapped to simulation.

No unresolved question about the accepted task remains. R4 and R5 remain Minor exactly as in the first review. Target reconciliation and a new full gate on the combined tree are outstanding cycle work, not a claim that this return's current branch is fully gated.

## Searches not found or unclear

- Some combined reads of the task and reports exceeded output limits. Task questions, settlement/projected rows, author report and whole-review tail were reread in smaller portions; the failure was read directly in gate-2.log. No absence claim depends on truncated output.
- A read-only `git diff ... | Select-Object -First 115` projection returned batch exit 1 when its output was cut off by the consumer. It was not a test failure or a claim that no diff exists; the changed foundation entries were then read directly and compared in full.
- Exact total invocation counts for the initial author's earlier checks are not established by the preserved report; they are explicitly marked **nieustalone**, with only distinguishable reported runs counted above.

This ignored report is not part of the product commit. Return here for the orchestrator's fresh independent review.
