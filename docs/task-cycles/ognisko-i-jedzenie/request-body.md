## Goal

The task **Utrzymać maga przy życiu w Lesie: spadające ciepło, sytość i zdrowie, zbieranie do plecaka, ognisko i jedzenie** (`_zadania/ognisko_i_jedzenie_loop2.md`, accepted 2026-10-24, `Status: ready for cycle`; relation: *plan item* — task 4 `ognisko-i-jedzenie` of `plan_mvp_loop2.md`) gives the elemental mage in Las something to survive. Warmth (body temperature in °C with tenths), satiety and health fall with game time; at zero health the mage dies in that minute, also during an action, of cold or hunger, and the screen stays on the minute of death with „Restart” and „Zakończ”. The mage gathers with misses into a backpack of 15 pieces, crafts, lights and feeds a campfire, lights a stick and eats berries; the program's closed list gains seven actions and five conditions; the screen shows a row of the body and the backpack, the campfire's icon on its tile and its state in the tile list.

Sources used: the task at its accepted text; the plan (handed over 2026-10-24); the definition `definicja_mvp_loop2.md` (approved 2026-10-13, fingerprint `9e480247`) for the projected entries; loop2 `main` at `a945cf1` (the base), brought up to date with `main` at `d11dd0f` (task 11 `siedziba-i-druzyna`, merged meanwhile). Dependency task 3 is merged (`668baa0`).

## How the cycle ran

- **Spec — yes.** The task carried three questions to the cycle that left a choice binding after the merge: the order of effects within one game minute (so death and thresholds fall in the same minute however time is split into calls), where carrying capacity stands while task 11 ran in parallel, and the number ranges of the new conditions. Spec reviewed `FAIL` (campfire on an unrevealed tile; a feeding that added nothing) → one revision → `PASS`.
- **Route — planned slices**, judged again after the spec: ten units across simulation, view, data and icon, about twenty foundation entries and a dozen existing tests meeting the mage's death — more than one agent holds. Plan: foundation entries, then 13 slices one after another; the orchestrator amended Slice 13 (an invariant test broken by renewal in Slice 6) and added Slice 14 (the join with task 11) at the reconciliation.
- **Reviews.** Slice 10 (the icon, across the trust boundary `assets/icons/**`) had its own review: `PASS`. Review of the whole change: `FAIL` — a game map's data could not hold a resource that does not renew (a gap of the plan) → one fix → `PASS`. Return step: `FAIL` (a glossary term built from an MVP choice did not open "In the MVP") → one fix → `PASS`. Reconciliation with `main` (renumbering and merge) and Slice 14: `PASS`.
- **Reconciliation with `main`.** Task 11 merged first and holds D-50–D-56, so this branch's decisions were renumbered **D-57–D-72**; the team's character now carries its traits (carrying capacity 15) and a send copies them into the map run (task 11's *To do* 6).

Cycle record (link by commit): RECORD_LINK

## What changed

- **Simulation** (`src/browser/sim/`): body and death in the one-minute step (`body.ts`); what burns, its warmth and renewal (`world.ts`); traits and backpack (`character.ts`); gathering with its own generator stream; crafting, lighting and feeding a campfire, lighting a stick, eating, „Idź — ognisko”; five conditions with ranges and steps (temperature with tenths); spans stop at death.
- **Content data**: Las's ambient temperature 25 °C, body numbers, gathering chance, items, the campfire, starting traits; a map's resource may leave out its renewal time.
- **View**: the body and backpack row with `danger` below a threshold; the status row at death („Minuta <n> · Mag zamarzł” / „Mag umarł z głodu”, no „Pauza”); the campfire's icon on its tile and its state, and a burning stick's, in the tile list; the editor's number field follows the condition's range and step.
- **Icon**: `assets/icons/campfire.svg` (Lorc, "Campfire icon", game-icons.net, CC BY 3.0, background removed, light fill), credited in the footer.
- **Tests**: new `body`, `world`, `traits`, `gather`, `campfire`, `conditions`, `acceptance` (sim), `body-row` (view), invariant test `test_minute_span_split.py`; existing tests kept within minute 240, before the mage can die. Acceptance: on Las, real time `1760000800000` / seed `1946377216`, a program of the closed list lives 480 game minutes; the empty program dies in minute 243 of cold.

## Checks

- Gate on the final tree `d5b2960`: `npm test` — **exit 1**. Node tests 318 pass, 0 fail; `tests/agent_workflow` OK; `tests/deploy` OK (1 skipped); `tests/invariants` 160 tests; `tests/quality` 31 tests. **Failed — the same three as on the base `a945cf1`, from this machine:** `test_loop2_one_serving_process` (setUpClass: `Get-NetTCPConnection` finds no listening connection), `test_ruff_source_rules` and `test_shellcheck_source_rules` (Ruff and ShellCheck not installed).
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, 0 errors; **not reached inside `npm test`** (the chain stops at the failed gate), run on its own.
- **Unchecked:** `loop2-container-icons` and `tests/deploy/test_loop2_image_icons.py` skipped (no Docker daemon here; the reviewer checked the build copy and the `Dockerfile` instead); Ruff on the changed Python files; **no screenshot** of any screen — the foundation settles no way to take one, so the new row, the death screen, the campfire icon (five icons on one tile are drawn a third smaller) and the new tile-list column were checked in code only (fake-document tests), never seen in a browser.
- Own-work checks: each slice's report names its weakest point and the check of it (record, *Weakest-point checks*); tests written first and seen failing; `minute-span-split`'s test seen failing against two deliberate breaks.

## Review findings not fixed

**Minor** (choose which become tasks):
- `src/browser/view/footer.ts:25` — the list of things with an icon is written by hand; a later data file naming an icon gets no footer line, and no check catches it.
- `src/browser/view/program-editor.ts:424` — the editor shows no unit beside a condition's number („Zostało mniej niż — ognisko [20]” without „min”), as before for „Tu leży mniej niż”.
- `src/browser/view/tile-list.ts:49` — a campfire never lit reads „ognisko — wygasłe”, as a burnt-out one (the task names two texts; glossary `extinguished campfire` records it).
- `src/browser/view/status-row.ts:9-11` — the death texts hard-code „Mag”; a second archetype would read „Mag zamarzł”.
- `src/browser/view/tile-list.ts:136` — the new column of the tile list has no heading; a screen reader announces the campfire's state without a column name.
- `src/browser/view/status-row.ts:88` — keyboard focus on „Pauza” is lost when it hides at death.
- `src/browser/sim/data/actions.ts:3` and `tests/invariants/test_terrain_drawing_numbers.py:33` — two stale comments (target name now follows every action with a resource; gathering now reaches stock 0).
- `src/browser/view/terrain-picture.ts:59` — five icons on one tile are drawn a third smaller; never seen in a browser.
- D-67 (renewal), first complies example — reads as two sticks regained, true only for a tile two short.
- `tests/invariants/test_action_in_progress.py` docstring — says its runs last "at most 45" game minutes; they last at most 25.
- `tests/invariants/test_player_map_run_pace.py` docstring — says "none ends", though the scenario ends both map runs.
- `src/browser/sim/run.ts:269` — `newMapRun` falls back to `newTraits()` when no traits are passed; every real caller passes them.

**Outside the task's scope:**
- The decision numbers of this branch clashed with `main`'s D-50–D-56 and the join with task 11 was due (whole-change review O-1) — resolved in this request by the reconciliation and Slice 14.

## What this request settles

Decisions (new; „W MVP” is the human's form for choices made for the MVP):
- **D-57** — W MVP ciepło postaci jest temperaturą jej ciała w stopniach Celsjusza, liczoną z dziesiątymi. *(row 1)*
- **D-58** — W MVP ciało postaci stygnie w każdej minucie gry tym mocniej, im niżej poniżej startowej temperatury ciała leży temperatura otoczenia mapy, a temperatura otoczenia stoi w danych mapy. *(row 2)*
- **D-59** — W MVP grzanie podnosi temperaturę ciała postaci najwyżej do temperatury startowej, a jedzenie podnosi sytość najwyżej do sytości startowej. *(row 3)*
- **D-60** — W MVP postać traci zdrowie w każdej minucie gry, w której jest wychłodzona, i osobno w każdej, w której głoduje, a w minucie, w której nie jest ani jednym, ani drugim, zdrowie wraca samo, najwyżej do pełni. *(row 4)*
- **D-61** — W MVP postać ginie w tej minucie gry, w której jej zdrowie dochodzi do zera, także w trakcie trwającej akcji, a przejście kończy się wtedy śmiercią z przyczyną: zimno, gdy ciało jest w tej minucie wychłodzone, inaczej głód. *(row 5)*
- **D-62** — W MVP po śmierci postaci ekran zostaje na stanie z minuty śmierci, czas stoi, a gracz ma „Restart” z tym samym ziarnem od minuty zero i „Zakończ”, które wraca do ekranu, z którego wysyła postać. *(row 6; agrees with `main`'s D-53 — „Zakończ” leads to the headquarters)*
- **D-63** — W MVP postać zapala ognisko i patyk zwykłą akcją „Zapal”, której ceną są zużywane patyki, dopóki zadanie 9 planu MVP (plomyk) nie zrobi z zapalania czaru Płomyk płaconego energią natury. *(row 8)*
- **D-64** — W MVP pułap plecaka liczy razem sztuki wszystkich przedmiotów, a jego wysokością jest udźwig postaci. *(row 9)*
- **D-65** — W MVP postać zbiera, dopóki plecak mieści mniej sztuk niż jego pułap; przy pełnym plecaku program pomija regułę zbierania i wybiera dalszą, jak przy każdej niewykonalnej akcji. *(row 10)*
- **D-66** — W MVP zbiór może chybić, a chybiony zbiór zostawia zapas kafelka nietknięty i nie wkłada sztuki do plecaka. *(row 11)*
- **D-67** — W MVP kafelek poniżej zapasu startowego odzyskuje sztukę w każdej minucie gry będącej całkowitą wielokrotnością czasu odnowienia zasobu, liczoną od minuty zero przejścia, nie ponad zapas startowy. *(row 12; the counting from minute 0 settled by the spec and the return step)*
- **D-68** — W MVP ognisko, które się wypaliło, zostaje na swoim kafelku jako wygasłe i da się je zapalić ponownie. *(row 13)*
- **D-69** — W MVP każde zasilenie ogniska płonącego na początku zasilania dokłada na jego końcu swoje minuty palenia do tych, które ognisku wtedy zostały, ile by ich było, także zero, więc ognisko wypalone w trakcie zasilania płonie znowu. *(row 14; landing at the end — a choice of the cycle)*
- **D-70** — W MVP ognisko ma na rysunku mapy ikonę na swoim kafelku, a jego stan — płonie i ile minut zostało albo wygasło — stoi w wierszu kafelka w liście odsłoniętych kafelków. *(row 15)*
- **D-71** — W MVP minuta gry przejścia działa w kolejności: najpierw ciało postaci (stygnięcie i grzanie, spadek sytości, utrata albo powrót zdrowia), potem — gdy zdrowie doszło do zera — śmierć w tej minucie i koniec przejścia; inaczej to, co płonie, traci minutę palenia, kafelki odnawiają zapas, akcja kończąca się w tej minucie daje skutek, a program wybiera regułę ze stanu, który ta minuta zrobiła. *(spec, the task's first carried question)*
- **D-72** — W MVP postać wytwarza ognisko i zapala patyk na kafelku odsłoniętym, tak jak zbiera; na kafelku jeszcze nieodsłoniętym program pomija regułę, która wytwarza ognisko albo zapala patyk. *(a choice of the cycle: otherwise a campfire on an unrevealed tile could not be shown as *To do* 15 asks)*

Decisions changed:
- **D-25** (projected "How does a character move?", written in the part this task carries) — do decyzji o ruchu dochodzi: zbiera się tylko z kafelka odsłoniętego, najwyżej tyle, ile na nim leży.
- **D-26** (projected "How does a program point at things of the world?") — dochodzi: kafelek mieści najwyżej jedno ognisko, które grzeje tylko na nim.
- **D-23** (*Verification* only) — do przykładów zgodności doszedł warunek temperatury biorący liczbę z dziesiątymi (36,5); zdania wiążące bez zmian.

Invariants:
- **`minute-span-split`** (new) — Przejście posuwane o odcinek minut gry dochodzi do tego samego stanu gry, z tymi samymi zdarzeniami w tej samej kolejności, w każdej minucie gry, jakkolwiek odcinek podzielić na wywołania symulacji, aż do śmierci postaci włącznie. *(the task's carried question "przy każdym podziale czasu"; test `tests/invariants/test_minute_span_split.py`)*
- **`action-in-progress`** (changed) — Trwająca akcja postaci trwa całą swoją długość, chyba że jej przejście skończy się wcześniej, nawet gdy program się zmieni albo zacznie zachodzić warunek innej reguły. *(set by D-61: death cuts an action short)*
- **`player-map-run-pace`** (changed) — Czas rzeczywisty przekazany przejściu uruchomionemu przez gracza przesuwa je, aż się skończy, o minutę gry za każdą pełną sekundę bez pauzy i o nic w pauzie. *(set by *To do* 3: time stops after death)*
- **`icon-credits`** (changed) — rests also on `game-icons-campfire-title`.

Glossary:
- **`map run restart`** (changed) — W MVP restart przejścia to przejście tej samej postaci na tej samej mapie, które gracz uruchamia w miejsce przejścia w toku albo przejścia zakończonego śmiercią postaci, które stoi jeszcze na ekranie. *(row 7)*
- **`free game minute`** (changed) — Wolna minuta gry to minuta, w której przejście się zaczyna albo w której kończy się akcja lub czekanie postaci, a przejście trwa dalej.
- **`extinguished campfire`** (new) — W MVP wygasłe ognisko to ognisko stojące na kafelku bez minut palenia, czy się wypaliło, czy jeszcze nie było zapalone.

Environment facts:
- **`game-icons-campfire-title`** (new) — strona ikony na game-icons.net podaje jej tytuł „Campfire icon”.
- **`game-icons-licence`** (changed) — licencja repozytorium obejmuje CC BY 3.0 także ikony Lorca.

Part map: part `simulation` claims `tests/invariants/test_minute_span_split.py`.

Projected entries made true in part and **not written** here, since the plan gives them to other tasks: "How does a character act by its program?" (task 5: fuel chosen by the simulation; the closed list's new kinds), "Where does the simulation's randomness come from?" (task 18: the gathering generator), "What is a map made of?" (task 8: renewal, "no time meaning a resource that does not renew", "cannot be gathered there"), "What describes a character?" and `trait` (task 10: carrying capacity as a trait).

**Before you at the merge:**
- Invariant tests altered (WAY-03): new `test_minute_span_split.py`; spans kept within minute 240 in `test_exploring_reveal.py` (its control threshold lowered from >10 to >5 explorings), `test_map_run_layout.py`, `test_map_run_repeatability.py`, `test_move_reach.py`, `test_player_map_run_pace.py`, `test_program_rule_pick.py`, `test_simulation_inputs.py`, `test_simulation_isolation.py`, `test_simulation_randomness.py`, `test_terrain_drawing_numbers.py`, `test_walk_feasibility.py` and `test_walk_target.py` (the last two with more seeds, 3 → 9); `test_map_run_repeatability.py`, `test_simulation_inputs.py`, `test_simulation_randomness.py` bring their "every kind" programs to the new closed list; `test_walk_feasibility.py` keeps its zero-stock case clear of renewal; `test_program_closed_lists.py` lists the new kinds; `test_icon_credits.py` names the campfire icon; `test_action_in_progress.py` and `test_player_map_run_pace.py` changed in docstrings only.
- Surfaces altered (WAY-49): none. *Violated* marks: none set or cleared.

## Questions

None. No question of the foundation step reached the human.

## Choices within the request

27 recorded choices and answers (questions table of the cycle record), among them the cycle's own choices named above: D-72 (revealed tile for crafting and lighting a stick), D-69's landing at the feeding's end, the acceptance criterion read as a program of the whole closed list ("Eksploruj" included — a program of the new actions alone cannot reveal a tile to gather from), the texts „Minuta <n> · Mag umarł z głodu” and „patyk — płonie, zostało <n> min”, the labels „Zostało mniej niż N min — ognisko” and „Z dala od — ognisko”.

## Human actions

None.

Please merge with a merge commit that keeps the commits: the cycle record is linked by its commit.
