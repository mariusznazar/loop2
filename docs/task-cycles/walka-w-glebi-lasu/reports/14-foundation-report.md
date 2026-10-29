# Foundation report — walka-w-glebi-lasu

Status: done with concerns

Worktree: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`. Branch: `task/walka-w-glebi-lasu`.
Foundation commit: `e230046bc27e2c666672ac7897b7b95d067577ed`. Slice 1 base: `7a633a7ab44868427c9c824948b99d4400a631ca`.
Pinned process: `3aee7d958835cc19b95519f4d21b37538b78e3e1`, gitlink and checkout equal.

Only the foundation step is complete. No product code, tests, guidelines, source task, part map, deployment or PR was changed. The future implementation and invariant evidence remain required. The status concerns are these planned, explicitly unverified obligations, not a foundation blocker.

## Files and checks

| File | Added | Removed |
|---|---:|---:|
| [decisions.md](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md) | 244 | 61 |
| [glossary.md](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/glossary.md) | 14 | 2 |
| [invariants.md](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/invariants.md) | 3 | 3 |

Commands ran from the worktree root:

| Command | Exit | Meaning |
|---|---:|---|
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0, 0 | Pinned process agrees. |
| `python -B .runs/task-cycles/walka-w-glebi-lasu/reports/write_foundation.py` | 0 | Wrote the three foundation files; subsequent small corrections are in the final commit. |
| `python -B .the-way/elements/common/foundation_check.py` — after initial write, after clarification, final run | 0, 0, 0 | Each reported `0 errors`; this is structural evidence. |
| `python -B .runs/task-cycles/walka-w-glebi-lasu/reports/check_foundation_scope.py` — first run | 1 | Own-work check caught missing explicit early-completion precedence in Relations; a console-piped replacement had not applied. |
| Same source-comparison command — after correction | 0 | Exact normalized binding text for D-24 and D-140; exact authorized subset for D-136; new candidate wording checked; explicit early-completion precedence and conditional defeat count present. |
| `git diff --check` | 0 | No whitespace errors, on all runs. |
| `git config --get-regexp '^branch\.task/walka-w-glebi-lasu\.'` | 1 | No local branch configuration; no mismatched upstream found. |
| `git add -- foundations/decisions.md foundations/glossary.md foundations/invariants.md` | 0 | Exact paths staged. |
| `git commit -m 'docs: :memo: record deeper forest combat foundation'` | 0 | Foundation committed. |

Not run: `npm test`, focused product tests, invariant red/green runs, mutation analysis, browser checks, balance measurement. The dispatch requires a foundation-only return before code; none of those checks has passed in this step. The structural checker passing is not combat verification.

## Own-work check

Most likely failure: changing approved projected wording or carrying the future program-switch/trip-plan portions into this task. The source-comparison script reads the actual approved definition and compares the two whole binding paragraphs and the precisely removed portions of the solving paragraph; it passed. A second high-risk case is the completion in M+1…M+4 versus M+5: D-71 now explicitly narrows D-140 and D-141 in that area, and counting a beaten attack is conditional on defeating the creature. This is wording verification, not an executed simulation.

## F01–F29 and settlements

Every Settlement row 1–15 is mapped whole below; shared decisions consolidate rows where they answer one question. Ranges are the current complete entry, from heading through the last line before the following heading.

| Plan row | Source | Actual entries and full current line ranges |
|---|---|---|
| F01 | Settlement 1; Q1; spec §2, §4 | [D-141, 2545–2559](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2545); [D-71, 1320–1334](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L1320) |
| F02 | Settlement 2; Q3; spec §2 | [D-131, 2338–2364](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2338) |
| F03 | Settlement 3; Q4; spec §3–4 | [D-142, 2560–2574](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2560); [D-71, 1320–1334](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L1320) |
| F04 | Settlement 4; Q5; spec §6 | [D-143, 2575–2589](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2575) |
| F05 | Settlement 5; Q6; spec §1, §5 | [D-144, 2590–2604](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2590); [D-151, 2695–2708](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2695) |
| F06 | Settlement 6; Q6 | [D-145, 2605–2619](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2605) |
| F07 | Settlement 7; Q7, Q9; spec §3 | [D-142, 2560–2574](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2560) |
| F08 | Settlement 8; Q9, Q20; spec §1, §4–5 | [D-146, 2620–2634](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2620); [D-61, 1170–1184](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L1170) |
| F09 | Settlement 9; Q10; spec §7 | [D-147, 2635–2649](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2635); [D-133, 2390–2409](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2390) |
| F10 | Settlement 10; Q10 | [D-148, 2650–2664](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2650) |
| F11 | Settlement 11; Q11; spec §7 | [D-149, 2665–2679](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2665) |
| F12 | Settlement 12; Q12 | [D-150, 2680–2694](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2680) |
| F13 | Settlement 13; Q14; spec §2–4 | [action-in-progress, 187–197](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/invariants.md#L187) |
| F14 | Settlement 14; Q9 | [beaten attack, 163–168](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/glossary.md#L163) |
| F15 | Settlement 15; Q20; spec §1 | [combat turn, 169–173](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/glossary.md#L169) |
| F16 | Projected “What is a map made of?”; whole assigned entry | [D-24, 512–540](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L512) |
| F17 | Projected “How is a map solved, and what opens the next one?”; task 7+8 portion | [D-136, 2450–2476](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2450) |
| F18 | Projected “How does combat go?”; whole assigned entry; spec §1–5 | [D-140, 2520–2544](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2520); [D-151, 2695–2708](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2695) |
| F19 | Spec Foundation entries; Settlement 13 | [D-20, 401–415](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L401) |
| F20 | Spec Foundation entries; carried projected program choice | [D-23, 476–511](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L476) |
| F21 | Spec Foundation entries; cooling outside combat | [D-58, 1125–1139](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L1125) |
| F22 | Spec Foundation entries; health and combat death | [D-60, 1155–1169](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L1155); [D-61, 1170–1184](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L1170) |
| F23 | Spec §4, §6; Q19 | [D-71, 1320–1334](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L1320) |
| F24 | Spec §6; carried projected discovery | [D-118, 2008–2031](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2008); [D-128, 2263–2291](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2263) |
| F25 | Spec §7; line order and frozen end screen | [D-122, 2112–2147](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2112); [D-147, 2635–2649](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2635) |
| F26 | Spec §7; progress and completion | [D-132, 2365–2389](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2365); [D-133, 2390–2409](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2390) |
| F27 | Spec Foundation entries; choice during each exchange | [program-rule-pick, 248–263](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/invariants.md#L248) |
| F28 | Spec §4; ordinary choice in the ending combat minute | [free game minute, 73–79](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/glossary.md#L73) |
| F29 | Spec §6; creature discovery | [Understanding, 118–124](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/glossary.md#L118) |

## Projected assignments and carried context

- “What is a map made of?” is D-24, whole assigned meaning and exact binding wording, with resolved Scope/Relations and the existing map-run-tiles verification retained.
- “How is a map solved, and what opens the next one?” is D-136, exactly the task 7+8 portion: streak, beaten attacks, separately or together, opener, wounds preserving the streak and edits resetting it. Program switching and trip-plan clauses remain with tasks 12 and 13.
- “How does combat go?” is D-140, exact binding wording and source rationale/rejected options, with resolved Scope/Relations and the derived action-in-progress link.
- Carried randomness stays D-22; this task's timing specialization is D-142, not a premature rewrite of the whole task-18 projected entry.
- Carried first-wolf revelation is D-118 plus D-143/D-128; the Las chain D-121 is unchanged.
- Carried program choice is D-23 plus program-rule-pick. D-92 and D-93 remain authoritative for per-action firing counts and their lifetime; neither gets a duplicate decision.
- Existing map patterns cover simulation, browser-view and build-tools files contemplated by the plan. No part-map or environment-fact entry is needed.

## One Polish sentence per entry for the PR

| Entry | Meaning |
|---|---|
| [D-20, 401–415](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L401) | Napaść przerywa trwającą czynność, natomiast zmiana programu pozwala jej dobiec końca. |
| [D-23, 476–511](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L476) | Postać wybiera pierwszą wykonalną regułę z uporządkowanych grup także bezpośrednio przed swoją akcją w turze walki. |
| [D-24, 512–540](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L512) | Dane mapy określają wejście stałe lub losowane, napastników, zasoby i ich odnawianie, a ziarno przejścia wyznacza układ kafelków. |
| [D-58, 1125–1139](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L1125) | Ciało chłodzi się według temperatury mapy w minutach poza starciem. |
| [D-60, 1155–1169](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L1155) | Poza starciem potrzeby odbierają zdrowie lub pozwalają mu wracać, a w minutach starcia potrzeby i samoczynna regeneracja stoją. |
| [D-61, 1170–1184](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L1170) | Zdrowie równe zero kończy przejście w tej minucie, z przyczyną „walka”, gdy odebrała je walka. |
| [D-71, 1320–1334](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L1320) | Zwykła minuta sprawdza napaść po skutku czynności i domknięciu, a minuta końca walki rozgrywa tury przed domknięciem i następną zwykłą czynnością. |
| [D-118, 2008–2031](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2008) | Odkryte stworzenia trafiają do wspólnego Zrozumienia tak jak akcje, przedmioty i warunki. |
| [D-122, 2112–2147](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2112) | Linia odkrycia stoi nad linią ostatniego starcia i zachowuje dotychczasowy czas pokazywania. |
| [D-128, 2263–2291](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2263) | Dane odkrywanej rzeczy, w tym stworzenia, wskazują zdarzenie odsłaniające, a jednym z tych zdarzeń jest napaść stworzenia. |
| [D-131, 2338–2364](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2338) | Rzeczywista zmiana programu zeruje passę i pokonane napaści, natomiast zimno i głód pozostawiają liczbę pokonanych napaści. |
| [D-132, 2365–2389](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2365) | Ekran domknięcia Lasu — głębiej pokazuje nazwę rozwiązanej mapy w roli positive i zachowuje dotychczasowe przyciski końca. |
| [D-133, 2390–2409](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2390) | Wiersz stanu pokazuje postęp wymagań obecnych w danych mapy, a siedziba podaje zapisane tam zdanie warunku. |
| [D-136, 2450–2476](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2450) | Mapę rozwiązują zapisane w danych wymagania passy lub pokonanych napaści, razem albo osobno, a rozwiązana mapa otwiera wskazaną następną mapę. |
| [D-140, 2520–2544](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2520) | Walka jest wymianą akcji zaczynaną przez napastnika, według par reguł stworzenia i programu postaci, ze stałym kosztem czasu i utratą przerwanej czynności. |
| [D-141, 2545–2559](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2545) | Tury rozgrywają się razem po pięciu minutach od napaści, aktualnym programem, chyba że przejście wcześniej się domknie. |
| [D-142, 2560–2574](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2560) | Napaści mają własny strumień losowań i zaczynają się po 180 pełnych minutach karencji, po skutku kończącej się czynności i sprawdzeniu domknięcia. |
| [D-143, 2575–2589](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2575) | Pierwszy wilk odsłania walkę i warunki zdrowia, zatrzymuje czas przed turami i pozostawia graczowi napisanie reguł. |
| [D-144, 2590–2604](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2590) | Postać uderza patykiem, kopie albo osłania następny cios odskokiem, a odskok wilka oddaje jego akcję. |
| [D-145, 2605–2619](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2605) | Patyk dziś pozostaje po ciosie, a gra nie ma dziś opatrywania ran. |
| [D-146, 2620–2634](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2620) | Śmierć strony natychmiast kończy starcie, limit 40 wymian odsyła żywe stworzenie, a brak wykonalnej reguły oznacza utratę akcji postaci. |
| [D-147, 2635–2649](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2635) | Gra zachowuje fakty ostatniego starcia i pokazuje program przeciwnika oraz przebieg i wynik także na ekranie końca przejścia. |
| [D-148, 2650–2664](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2650) | Napastnik dziś występuje w tekście starcia, a rysunek terenu go nie przedstawia. |
| [D-149, 2665–2679](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2665) | Rozwiązanie mapy otwierającej udostępnia kolejną mapę każdej postaci zarówno w siedzibie, jak i przy wysyłaniu przez symulację. |
| [D-150, 2680–2694](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2680) | Trzy akcje walki należą do trzech umiejętności obecnych w predyspozycjach maga żywiołów. |
| [D-151, 2695–2708](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/decisions.md#L2695) | Warunki zdrowia czytają punkty zdrowia działającej strony lub jej przeciwnika, a reguła jest wybierana tuż przed akcją tej strony. |
| [action-in-progress, 187–197](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/invariants.md#L187) | Rozpoczęta czynność trwa do końca mimo zmiany programu, chyba że wcześniej skończy się przejście albo przerwie ją napaść. |
| [program-rule-pick, 248–263](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/invariants.md#L248) | Priorytet grup i reguł oraz repertuar obowiązują zarówno w wolnej minucie gry, jak i przy akcji postaci w każdej turze. |
| [free game minute, 73–79](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/glossary.md#L73) | Wolna minuta gry obejmuje też koniec starcia, jeżeli przejście trwa dalej. |
| [Understanding, 118–124](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/glossary.md#L118) | Zrozumienie obejmuje również odkryte stworzenia. |
| [beaten attack, 163–168](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/glossary.md#L163) | Pokonana napaść wymaga sprowadzenia stworzenia do zera zdrowia; odejście po limicie nią nie jest. |
| [combat turn, 169–173](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/foundations/glossary.md#L169) | Tura walki jest wymianą po jednej akcji każdej strony, którą śmierć może zakończyć przed odpowiedzią. |

## Invariant obligations and old/new wording

The existing Method `test` remains on both changed invariants because their existing cited tests remain their method; it states no pass and no claim that the added combat cases already exist. Their `Part` remains simulation: changes to scheduling/attack interruption can break action-in-progress, and changes to rule selection/repertoire can break program-rule-pick. No new external fact supplies either rule, so Rests on stays none. No Violated flag changed.

The existing noncombat scenarios remain valid under the expanded sentences. Their explanatory text and the new coverage still need updating with implementation:

- `tests/invariants/test_action_in_progress.py`: existing exploration/step continuation after a program edit remains; add the accepted interrupted-exploration and interrupted-step cases with the no-interruption edit controls, in conjunction with `tests/sim/encounters.test.mjs`. Show the invariant test failing once and passing after implementation, through the same `npm test -- <file>` command.
- `tests/invariants/test_program_rule_pick.py`: existing free-minute group priority/repertoire scenarios remain; expand the reading of a free minute for encounter end and cover combat group priority, repertoire filtering and the no-feasible-rule action, with `tests/sim/combat.test.mjs`. Show the invariant test failing once and passing after implementation.
- `minute-span-split`, `map-run-repeatability`, `map-run-layout`, `streak-program-change`, `player-map-run-pace` and the other read invariants keep their sentences; combat evidence belongs to the planned slices.
- Existing references to Understanding in code/fixtures/tests keep their product meaning, but their data shape must gain creatures during the planned code slices; this foundation-only commit does not assert that implementation has happened.

### action-in-progress

Before:

> The character's action in progress lasts its full duration unless its map run ends first, even where
> the program changes or the condition of another program rule comes to hold before it ends.

Now:

> The character's action in progress lasts its full duration unless its map run ends first or an attack interrupts it, even where
> the program changes or the condition of another program rule comes to hold before it ends.

### program-rule-pick

Before:

> In each free game minute of a map run, the character starts to carry out the first program rule
> whose condition and action, with the target of each, lie in the character's repertoire, whose
> condition holds and whose action the character can carry out then, taking rule groups in order and
> the program rules within each in order, passing over a group whose condition or its target lies
> outside the character's repertoire, whose condition does not hold or which holds no such program
> rule, carries out no program rule where no group offers one, and leaves every program rule and group
> it passes over in the program.

Now:

> In each free game minute of a map run and immediately before the character's action in each combat turn, the character starts to carry out the first program rule
> whose condition and action, with the target of each, lie in the character's repertoire, whose
> condition holds and whose action the character can carry out then, taking rule groups in order and
> the program rules within each in order, passing over a group whose condition or its target lies
> outside the character's repertoire, whose condition does not hold or which holds no such program
> rule, carries out no program rule where no group offers one, and leaves every program rule and group
> it passes over in the program.

## Reaches, choices, questions and critique

Read the frozen task and reviewed spec whole, the plan's Foundation entries and Coverage, and the approved definition's assigned projected entries with plan row 8 and assignment/history passages. The stale task-7 status was treated as context superseded by the merged D-129–D-136.

The element methods selected current foundation entries by simulation/browser-view Scope, invariant Part and linked meaning; the complete part map and product/process glossaries were read. The whole-foundation search found affected neighbours and inherited reasoning, including D-61's action-duration rationale, which was corrected with the attack exception. The glossary search covered tracked uses of Understanding, free game minute and combat-turn/attack forms, including code and existing invariant-test descriptions. Those implementation-facing uses explain the pending obligations above. Required element templates, common rules, way of working and examples were read; testing guidelines were reached before checking the existing invariant-test descriptions. No predecessor engine or UI was read, and no external fact was invented.

Choices: use existing question IDs for all revisions; consolidate attack location and cooldown into D-142; keep the current absence of wear/dressing and creature drawings as “currently”, not permanent prohibitions; define “combat turn” to make the exchange meaning explicit; give actor-relative health its own D-151 rather than hiding it in the projected combat paragraph. Wrong consolidation would make later changes harder to locate, while duplicate entries would create competing answers. `Origin: none` on the new task settlements means their full rationale/rejected alternatives are written in the entry, avoiding a pointer to a task retired on completion. The report retains source mapping.

No unanswered question or unsupported requirement remains. The independent whole-change review still has to compare code and foundation from the recorded slice base.

No separate critique report is required: `.the-way/elements/common/critique/SKILL.md` says, “The diff of a change to an invariant test or to the foundation takes no critique of its own: the review of the change by an agent that did not make it reads it, and the human reads it at the merge (WAY-10).” No critic was spawned and no independent review is claimed here.
