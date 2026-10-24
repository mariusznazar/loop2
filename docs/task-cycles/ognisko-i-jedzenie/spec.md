# Spec — Utrzymać maga przy życiu w Lesie: spadające ciepło, sytość i zdrowie, zbieranie do plecaka, ognisko i jedzenie

- Task: `.runs/task-cycles/ognisko-i-jedzenie/task.md` (frozen copy of
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\ognisko_i_jedzenie_loop2.md`,
  accepted 2026-10-24)
- Open choice: the three *Questions carried to cycle* of the task — (1) the order of the effects
  within one game minute, (2) where carrying capacity, the first trait, stands in the code and in
  the game's data while task 11 `siedziba-i-druzyna` runs in parallel, and how the cycle merged
  second joins the two, (3) the range and step of the number each new condition takes, and how
  the program editor and the program check take them.

## Intent

The mage of loop2 walks Las by its program and nothing threatens it. This change gives the
character of a map run a body — temperature, satiety, health — that its game minutes wear down
to death, a backpack it gathers into, a campfire it builds, lights and feeds, and berries it eats,
with the actions and conditions the program needs to keep it alive (task, *To do* 1–15). The spec
settles the three choices the task leaves open, so that game minutes give one outcome that later
tasks (5, 7, 8, 9, 18) can rest on, the backpack's cap stands where task 11's characters can carry
it, and the new conditions take numbers the editor and the check agree on.

## Goals and non-goals

Goals:

- Every effect of a game minute takes hold in one fixed order inside the one-minute step of the
  simulation, so that death and each crossing of a threshold (chilled below 35.0 °C, starving
  below 30) fall in one game minute however a span of game minutes is split into calls, and a
  span that reaches death stops there.
- The numbers of the body follow the decimal arithmetic of the data's numbers, so a threshold is
  crossed in the minute that arithmetic gives, not a minute earlier or later by binary rounding.
- Carrying capacity stands as a trait on the character, its starting value in the game's data,
  made in one place of the simulation that task 11's character creation can call.
- Each new condition that takes a number has its default, range and step in the conditions' data;
  the program check and the editor's number field both read them from there, and the temperature
  condition takes tenths.
- The acceptance test of the task: on Las, a program passes 480 game minutes alive on at least one
  seed the cycle names, and the empty program dies.

Non-goals (each comes with a later task or is not asked for):

- No event or state for a threshold crossing beyond what the minute's order needs; no counting of
  minutes without loss (task 7); no "Zdrowie poniżej" (task 8); no energy, no Płomyk (task 9); no
  discovery — every new action, condition and item is visible from the start (task 6); no death
  that takes the character (task 14); no catch-up of time away (task 18).
- No cap on the minutes a campfire burns (task, *To do* 9); no crafting beyond the campfire; moss
  and fibre are gathered and do nothing.
- No team, no named characters, no chest in this change (task 11, 13), except the join described
  in Decision 2 if task 11 has merged first.
- No new design token, role or shared control.

## Constraints

From the task (each binds the design as written there; not restated in other words): *To do* 1–15,
the acceptance criterion, the answers Q6–Q12, Q15, Q16, the 15 rows of *Settlements to record* and
the two projected entries the task writes (D-25 with gathering, D-26 with the campfire sentence).
In particular: death falls in the minute health reaches zero, also during an action in progress
(*To do* 3, row 5); a campfire warms the character on its own tile alone (*To do* 7, and the
definition's sentence quoted under Q9); fuel is chosen by the simulation, not the program (Q9); the gathering
draw comes from a generator of its own seeded from the map run's seed (*To do* 5); the lighting
of the campfire and of a stick costs nothing but sticks (Q6, row 8).

From the foundation:

- D-04: the simulation takes a game state and a span of game minutes; the view changes the state
  only through the simulation. D-20 and `action-in-progress`: nothing but death (and „Zakończ”,
  „Restart”) cuts an action short; the program picks a program rule again only once the action
  ends (task, *Context*: death ending the map run does not change `action-in-progress`).
- D-22, `simulation-randomness`, `map-run-repeatability`, `restart-seed`: one generator per kind of
  draw, all from the map run's seed, the draw of one kind leaving the others where they were.
- D-23, `program-rule-pick`, `program-closed-lists`: the program picks in each free game minute the
  first rule whose condition holds and whose action can be carried out; conditions and actions
  come from closed lists the data files give.
- D-26, `walk-target`, `walk-feasibility`, `program-world-reference`: "Idź — ognisko" goes one move
  toward the nearest known campfire in game minutes of walking, and cannot be carried out where
  none is known or where the character stands on one.
- D-18 and `content-identifiers`: numbers and names of content stand in `src/browser/sim/data/`; no
  file outside it names a map, resource or archetype by its identifier or name (the test S2 in
  `tests/sim/actions.test.mjs` also flags closed unions of content identifiers). So the choice of
  fuel, of food and of what can be lit stands in data, and the simulation picks from data, never
  by writing `stick` or `berry` in code.
- `map-run-layout`: a tile gathered to zero keeps the key of its resource (task, *Context*).
- D-19, `terrain-drawing-numbers`: the minutes of a campfire stand in the tile list, never on the
  drawing (row 15). D-41: `depleted` means "what was here is gone"; an extinguished campfire is
  still there, so it is not drawn in `depleted`.
- D-27, `icon-file-content`, `icon-credits`, `loop2-container-icons`: the campfire icon comes from
  game-icons.net into `assets/icons/`, holds nothing that runs and refers to nothing outside
  itself, is credited in the footer, and is served by the container — the trust boundary of this
  cycle.
- D-39 (`danger` for a value below the threshold of chill or hunger), D-44 (the shared controls;
  „Restart” and „Zakończ” stay destructive buttons), D-43 and `src/browser/AGENTS.md` (no value in
  place of a design token).

From the code at a945cf1:

- `stepMinute` (`src/browser/sim/run.ts:121`) is the one place a game minute is computed, and
  `advanceMinutes` (`src/browser/sim/game.ts:241`) repeats it; `passRealTime` turns real time into
  whole minutes. Any rule placed outside the one-minute step would make the outcome depend on how
  time is split.
- The program reads the map run through `RunView` (`src/browser/sim/program.ts:15`), never the
  generators; `actionFeasible` never draws.
- The editor takes its one number range from `CONDITIONS.hereBelow` through the module constant
  `NUMBER` (`src/browser/view/program-editor.ts:34`), and `readNumberField` rounds to a whole
  number; `checkCondition` accepts only whole numbers (`src/browser/sim/game.ts:67`).
- The character exists only in the map run (`MapRun.character`, `src/browser/sim/types.ts:56`);
  task 11's cycle, at its start, adds a team of characters outside the map run and adds no
  carrying capacity (its cycle record, Q1).
- Tests that drive a map run past the minute an unfed, unwarmed mage dies — about minute 243 on
  Las — meet death after this change: among them `tests/sim/actions.test.mjs` ("the run never ends
  by itself", 600 minutes), `tests/sim/time.test.mjs` (3600 minutes in one call), and the invariant
  tests `test_map_run_repeatability.py` (control: minute 600), `test_simulation_randomness.py`
  (more than 2000 minutes), `test_program_rule_pick.py`, `test_exploring_reveal.py`,
  `test_move_reach.py` (600), `test_walk_target.py`, `test_walk_feasibility.py` (800),
  `test_map_run_layout.py`, `test_simulation_inputs.py` (300; its list of streams names `layout`
  and `wander`), `test_player_map_run_pace.py` (3610). Each is adapted so that it still covers what
  its docstring says — by a span that ends before death, or by a program that keeps the mage
  alive — and an invariant test is changed only so that it keeps proving its invariant's sentence.

Readings of the task taken here, each picked from two possible readings:

1. The acceptance test's program "złożony wyłącznie z akcji i warunków tego zadania" draws on the
   closed list as this task leaves it — "Zawsze", "Eksploruj", "Wędruj", "Idź — <zasób>" and "Tu
   leży mniej niż" included. Read as only the new actions and conditions, no program could gather
   at all: gathering needs a revealed tile and only "Eksploruj" reveals one, so the criterion could
   not be met.
2. "Zbierz — <zasób>" cannot be carried out on a tile holding 0 pieces of that resource: "bez tego
   zasobu" covers a tile that has none of it now, and gathering takes "najwyżej tyle, ile na nim
   leży".
3. Satiety does not fall below 0 (it is a percentage); health that reaches 0 or less stands at 0
   and the character dies.
4. "Zapal — ognisko" (2 sticks), "Zapal — patyk" (1 stick), "Zasil — ognisko" (1 piece of fuel),
   "Wytwórz — ognisko" (6 sticks) and "Zjedz — jagoda" (1 berry) cannot be carried out where the
   backpack lacks the pieces they use.
5. A lit stick lies burning on the tile where it was lit and warms the character in each minute it
   stands there, as the campfire does; the tile list shows it in that tile's row (*To do* 15).
6. Cooling is 0.002 °C per degree by which the ambient temperature is below 37.0 °C, and nothing
   where the ambient temperature is 37.0 °C or more; the ambient temperature never warms.
7. Every campfire of the map run is known to the program, since the character built each one.

## Decisions

### Decision 1 — the order of a game minute

The one-minute step computes minute m from the state at the end of minute m − 1, in this order:

1. **Body.** The character's temperature changes by the warmth of what burns on its tile — each
   campfire burning there (0.5 °C) and each stick burning there (0.15 °C), counted where it had
   minutes left at the end of m − 1 — less the cooling of the map's ambient temperature, and the
   result is capped at 37.0 °C: the cap applies to the sum, so a character standing at a burning
   campfire stays at 37.0 °C. Satiety falls by 0.6, not below 0. Then the character is chilled in
   minute m if its temperature is below 35.0 °C and starving if its satiety is below 30, both read
   from the values just computed; health falls by 0.35 for chilled and by 0.35 for starving, or,
   where it is neither, rises by 0.05, not above 100.
2. **Death.** Where health has reached 0 or less, it stands at 0, the character dies in minute m
   and the map run ends there, with the cause cold where the character is chilled in minute m and
   hunger otherwise. The step stops: nothing of steps 3–5 happens, the action in progress does not
   end (no effect of it, no `activityFinished`), and no program rule is picked. The death — its
   minute and its cause — stands in the map run's state and is given as an event. The current
   activity stays in the state as it stood.
3. **What burns.** Each burning campfire and each burning stick loses one minute of burning; a
   campfire at 0 minutes is extinguished and stays on its tile (row 13); a stick at 0 minutes is
   gone.
4. **Renewal.** At each minute m that is a whole multiple of a resource's renewal time on the map
   (counted from the map run's minute 0), every tile holding that resource with fewer pieces than
   the map's stock per tile gains one piece (row 12; Las: stick 30, berry 40, moss 60, fibre 60).
5. **The action ending in m.** Where the character's action ends in minute m, its effect takes
   hold now, and the pieces it uses leave the backpack now, together with the effect: a gathering
   draws once from the gathering generator and on a hit moves one piece from the tile into the
   backpack, on a miss changes nothing (rows 10, 11); crafting puts an unlit campfire on the tile
   and uses 6 sticks; lighting a campfire gives it 60 minutes of burning and uses 2 sticks;
   lighting a stick puts a stick burning 3 minutes on the tile and uses it; feeding adds 20 minutes
   to the campfire and uses one piece of the fuel the data marks; eating adds 25 satiety, not above
   100, and uses a berry; a move or exploring ends as today. Only a feeding can find its campfire
   other than it was at its start: the campfire can burn out during the feeding's 5 minutes. A
   feeding lands on the campfire it started on, whatever that campfire's state at the feeding's
   end: it uses its piece of fuel and adds 20 to the minutes left, 0 included, so a campfire that
   burnt out during the feeding burns again (*To do* 9 and row 14, "ile by ich było", as written).
   Then the program picks its next program rule, as today, reading the state this minute has made.

So the warmth of a campfire lit in minute m counts from minute m + 1, and a campfire lit with 60
minutes warms in exactly 60 minutes; a stick lit in minute m warms in minutes m + 1 to m + 3; a
berry eaten in the minute health reaches zero does not save the character; a move onto a
campfire's tile in minute m warms from minute m + 1. At minute 0 (the start) nothing of the body
changes: the map run starts at 37.0 °C, satiety 100, health 100 and an empty backpack, and the
first program rule is picked as today.

The simulation's span functions stop at death: `advanceMinutes` given a span that reaches death
returns the state of the death minute and the events up to it, and the rest of the span passes
nothing; `advanceMinutes` and `passRealTime` given a map run that has ended in death change
nothing. „Restart” and „Zakończ” take a map run ended in death as they take one in progress (row 6,
row 7). Since every effect lives in the one-minute step and the step stops at death, a span split
into any calls gives the same state and events at every minute, death included.

**Decimal exactness.** After each change in a minute, temperature, satiety and health are rounded
to six decimal places, so each equals, as a JavaScript number, the decimal value the data's
numbers give (every rate of the data has at most four decimal places — 0.002 °C per degree times
an ambient temperature in tenths). A threshold crossing and a condition's comparison then fall in
the minute the decimal arithmetic gives: satiety can reach exactly 30 (for instance 100 − 0.6 × 200
+ 2 × 25), and without the rounding it would read 29.999999999999 and count as starving a minute
early.

Ways weighed:

- **A — body, death, what burns, renewal, action (chosen).** The world passes the minute first and
  the action ending in it lands at its end, after which the program picks; every effect of an
  action acts from the next minute, so the 60 minutes of a campfire are 60 warm minutes, and death
  takes precedence over whatever was about to land. Weak point: a campfire that burns out during
  the last 4 minutes or fewer of a feeding started while it burned is lit again by that feeding,
  for one stick instead of the two of "Zapal — ognisko"; only such a feeding reaches the case, and
  task 9, which puts a price on lighting, may close it. In exchange a rule "Zostało mniej niż N
  min — ognisko → Zasil — ognisko" feeds for every N of 2 or more (at 0 minutes left the campfire is
  extinguished and "Zasil — ognisko" cannot be carried out).
- Feeding, rejected ways: **a feasible feeding that adds nothing where its campfire burnt out
  before its end** — a rule "Zostało mniej niż 5 min — ognisko → Zasil — ognisko" would never
  feed, behaviour the task does not ask for; **the fuel taken at the feeding's start** — the one
  action whose effect would land at its start.
- **B — the action first, then body and death.** An action ending in minute m would act within
  that minute: a berry eaten in the last minute could lift satiety above 30 before the minute's
  health is counted, and a campfire lit in m would warm in m, giving 61 warm minutes unless its 60
  were shortened. Rejected: an effect would count for a minute the character spent doing the
  action, and dying in a minute could be undone by what lands in it.
- **C — death last, after the action and the next pick.** A character would start a new program
  rule in the minute it dies, so `program-rule-pick` would have a free game minute whose rule never
  runs. Rejected.
- Renewal: **at the multiples of the renewal time counted from the map run's start (chosen)**, as
  loop's data and tests behave (a tile below its stock gains a piece every renewal time,
  `movement.test.ts` of loop), with no state of its own and countable for a span by arithmetic,
  which task 18's catch-up needs; against **a timer per tile and resource from its first missing
  piece**, closer to "co czas odnowienia" read as time since the loss, but a new piece of state per
  tile and resource. Weak point of the chosen way: a tile emptied one minute before a multiple gets
  a piece back after one minute.
- Exactness: **rounding to six places (chosen)**, against plain binary arithmetic (a crossing can
  shift by a minute on values the human can compute by hand, and tests would compare with
  tolerances) and against integers in scaled units (exact, but every number of the state and of
  the data stands in units the player never reads).

Cost if wrong: this order decides outcomes tasks 7, 8 and 9 rest on — which minutes count as
minutes without loss to cold or hunger, whether a wound in combat (task 8) falls before or after
the minute's needs, whether Płomyk (task 9) warms in the minute it is cast. Changing it after those
tasks shifts their tests by a minute here and there; changing it before them costs this change's
tests.

Foundation: the order binds after the merge (WAY-36) and is a decision; see *Foundation entries*.

### Decision 2 — where carrying capacity stands, and how the two cycles join

- **Data.** The starting value of each trait of a new character — here one trait, carrying
  capacity, 15 — stands in a data file of `src/browser/sim/data/` that gives the traits a new
  character starts with. The value is the same for every new character; it does not stand on the
  archetype, since a trait describes the character, apart from the predispositions of its
  archetype (the projected entry "What describes a character?" quoted under Q15).
- **Code.** A type of the character's traits stands in `src/browser/sim/types.ts`, and the map run's
  character holds its traits as a field of that type (`MapRun.character` gains its traits beside
  `archetypeId` and `at`). One function of the simulation gives the traits of a new character from
  the data; it is the one place both a send now and task 11's character creation make traits.
  The backpack's cap is the map run's character's carrying capacity, read wherever the simulation
  judges a full backpack and wherever the view shows "Plecak n/15".
- **Now.** With no character outside the map run, `send` makes the traits with that function and
  passes them into the new map run; „Restart” gives the new map run the traits of the character of
  the map run it replaces.
- **The join, by the cycle merged second.** Task 11 creates characters in a team outside the map
  run (its *To do* 3–5) and its *To do* 6 asks that a character created there carries carrying
  capacity as its trait.
  - If task 11 has merged into `main` when this cycle brings its branch up to date before its
    request, this cycle joins: the team's character holds its traits, made by the same function
    when the character is created, the send copies the sent character's traits into the map run's
    character, and „Restart” keeps them; a test shows a created character carrying 15 and the map
    run of a sent character carrying the sent character's traits.
  - If this cycle merges first, the same join falls to task 11's cycle at its merge. Task 11's
    cycle record (Q1) assumes task 4 merges second; the orchestrator tells task 11's orchestrator.
  - The joining cycle keeps the map run's character holding a copy of the traits for the map run
    rather than reading them from the team: the map run stays self-contained in the game state, so
    a restart and `map-run-repeatability` do not depend on the team.

Ways weighed:

- **Traits on the map run's character, from a data file of starting traits, made by one function
  (chosen).** The smallest change that makes the cap a trait of the character today and leaves the
  join to a copy at the send.
- **The cap read from the archetype's data at each use, with nothing in the state.** Smaller, but
  makes the cap a predisposition of the archetype, which "What describes a character?" sets apart
  from traits, and leaves task 11 nothing to carry. Rejected.
- **A character record in `GameState` now, outside the map run.** Builds task 11's shape in this
  change: a certain conflict with task 11 on the same types and a shape this task has no use for.
  Rejected.

Cost if wrong: the join touches `types.ts`, `game.ts` (`send`, `restart`) and the creation of a
character; a wrong place means the second cycle moves the field — a small, mechanical change.
No foundation entry: where the trait stands in code is a way of making; the join ends with the
work and stays in the cycle record (WAY-36).

### Decision 3 — the numbers of the new conditions

Each condition that takes a number has, in the conditions' data, its default, its minimum, its
maximum and its step, taken from loop's data file `src/sim/data/conditions.ts`:

| Condition | Unit | Default | Min | Max | Step |
|---|---|---|---|---|---|
| "Temperatura poniżej N °C" | °C | 36.5 | 30.0 | 37.0 | 0.1 |
| "Sytość poniżej N %" | % | 50 | 0 | 100 | 1 |
| "Zapas poniżej N szt. <przedmiot w plecaku>" | szt. | 8 | 0 | 50 | 1 |
| "Zostało mniej niż N min — ognisko" | min | 20 | 0 | 120 | 1 |
| "Tu leży mniej niż N szt." (unchanged) | szt. | 1 | 0 | 50 | 1 |

"Z dala od — ognisko" takes no number.

- **The program check.** `checkCondition` takes, for every condition kind that takes a number, a
  finite number from the kind's minimum to its maximum that lies on the kind's step counted from
  its minimum, allowing for binary rounding a difference far below the step (for instance one
  billionth of the step), and the program it returns holds the number as the decimal with as many
  decimal places as the step has — 36.6, never 36.60000000000001. For a step of 1 this accepts the
  whole numbers it accepts today. A number off the step (36.55) or outside the range is refused, as
  today.
- **The editor.** The number field of a rule takes its minimum, maximum and step from the data of
  the rule's chosen condition kind, and changes them when the kind changes; the commit rule
  (`readNumberField`) takes the kind's data, rounds the text's number to the kind's step and clamps
  it to its range, and commits the same decimal form the check keeps; choosing a kind puts in the
  kind's default. The module constant `NUMBER` goes.
- **What the player reads beside it.** The body row shows temperature cut down to tenths (36.976
  shows as „36,9”, 37.0 at a campfire as „37,0”), satiety and health cut down to whole numbers, with
  a decimal comma. Cut down rather than rounded, a shown value and a condition on the step's grid
  agree: the temperature is below N exactly when the shown temperature is below N, so 34.99 °C,
  chilled, shows as „34,9” rather than „35,0”.

Ways weighed:

- **Each kind's range and step in data; the check by the step's grid; the decimal kept as the
  player reads it (chosen).**
- **Temperature held in the program as whole tenths (365 for 36.5).** The check would stay a whole
  number check, but the program would hold a number other than the one the player reads and every
  reader would convert. Rejected.
- **Any finite number within the range.** Simplest check, but takes 36.55, which the task's "liczba
  z dziesiątymi" does not ask for, and lets the stored number drift from what the field shows.
  Rejected.
- Display: **cut down (chosen)** against **rounded to nearest**, under which a chilled 34.96 °C
  would show „35,0” in `danger` and a condition "below 35.0" would hold over a shown 35,0.

Cost if wrong: ranges are data and change by a row; the check's rule is a few lines. No foundation
entry: D-23 binds the closed list, not the numbers its conditions take; its *Verification* example
"each with the resource and the whole number it takes" stays on the side that complies, and the
foundation step may add a second example with tenths (task, Q8).

### Decision 4 — placing a campfire or a burning stick needs a revealed tile

"Wytwórz — ognisko" and "Zapal — patyk" cannot be carried out on a tile not revealed, as "Zbierz"
cannot (*To do* 5). "Zapal — ognisko" and "Zasil — ognisko" need a campfire on the character's
tile, so they follow. So every campfire and every burning stick stands on a revealed tile, and
*To do* 15 holds in every case: the campfire's icon stands on a revealed tile of the drawing and
its state, like the burning stick's, in that tile's row of the list of revealed tiles.

Ways weighed:

- **(a) Infeasible on a tile not revealed (chosen)** — the smallest reversible reading that
  fulfils *To do* 15 in every case; it keeps the tile list and the drawing as D-19 and D-41 define
  them and mirrors the gathering rule of *To do* 5.
- **(b) Show a campfire on a tile not revealed** — changes what the list of revealed tiles and
  `tile-hidden` mean. Rejected.
- **(c) Leave the case as it falls** — a campfire on a tile not revealed would show neither its
  state nor its icon, leaving *To do* 15 unmet. Rejected.

Cost if wrong: a program that crafts or lights a stick after "Wędruj" onto a tile not revealed
passes to its next rule. This is a choice of the cycle, which the request names to the human.

Foundation (orchestrator's settlement after the spec review, Q-10 of the cycle record): the rule
binds after the merge, as row 10's infeasibility of gathering with a full backpack does, so the
foundation step writes it as a decision in the MVP form of the human's rule for candidates (task,
*Context*); see *Foundation entries*.

### Decision 5 — two texts the task does not give

- At death by hunger the status row reads „Minuta <n> · Mag umarł z głodu”, beside the task's
  „Minuta 312 · Mag zamarzł” for death by cold, `<n>` being the minute of death.
- A burning stick in its tile's row of the list of revealed tiles reads „patyk — płonie, zostało
  <n> min”, after the campfire's „ognisko — płonie, zostało 42 min”, `<n>` being its minutes of
  burning left. The names „patyk” and „ognisko” come from the data (D-18).

These are choices of the cycle, which the request names to the human.

### Units

Each unit does one thing; names are the maker's.

1. **Content data** (`src/browser/sim/data/`). Owns every number and name of the change: the
   map's ambient temperature (Las 25 °C); the body's start, cap, rates and thresholds; the gathering
   chance 0.7; the starting traits (carrying capacity 15); the items the backpack holds and, per
   item, whether it is fuel and how many minutes it adds, whether it is food and how much satiety
   it gives, whether it can be lit and how long and how warmly it burns; the campfire (what crafting
   it uses, its burning minutes, its warmth, what lighting it uses); the new actions with their
   labels, status texts and minutes (gathering 10, crafting 20, lighting 5, feeding 5, eating 5;
   "Idź — ognisko" takes the target tile's minutes); the new conditions with their table above; the
   campfire's icon and the icon's title as game-icons.net gives it. Depends on nothing.
2. **Body minute** (simulation). Given the character's body, the warmth on its tile and the map,
   returns the body after steps 1–2 of Decision 1 and the cause of death or none. Pure; depends on
   the data.
3. **World minute** (simulation). Given the map run's campfires, burning sticks and tiles and the
   minute, returns them after steps 3–4. Pure; depends on the data.
4. **Actions** (simulation). For each new action: whether it can be carried out now (from what the
   program reads, never drawing), how long it lasts, and its effect at its end under step 5,
   including the one draw of a gathering from the gathering generator. The generator is a new
   stream of `random.ts` with its own constant, its state kept in the map run as the wander stream's
   is.
5. **Conditions** (simulation). For each new condition, whether it holds now, from the body, the
   backpack and the campfires the program reads; the minutes of the nearest known campfire are 0
   where none is known or it is extinguished.
6. **The one-minute step** (`stepMinute`). Runs units 2–4 in the order of Decision 1, stops at
   death, and otherwise picks the next program rule as today. The span functions of `game.ts` stop
   at death and ignore a map run ended in death.
7. **The program check** (`game.ts`). Takes the new kinds from the closed list and their numbers by
   Decision 3.
8. **Traits** (simulation). The traits type, the function giving a new character's traits from the
   data, and their copy into the map run at a send and a restart (Decision 2).
9. **The view.** The body and backpack row under the status row (*To do* 14); the status row at
   death — the minute and the cause, no „Pauza”, „Restart” and „Zakończ” kept (*To do* 3); the
   campfire's and the burning stick's state in the tile list row (*To do* 15); the campfire's icon
   on its tile in the drawing; its credit in the footer; the editor's targets for the new actions
   and conditions and its number field by Decision 3. Every name comes from the data.
10. **The icon.** The campfire's SVG file from game-icons.net in `assets/icons/`, changed as the
    other icons are, with its credit and the environment fact of its title.

## Foundation entries

Written by the cycle's foundation step or return step; each named with its kind and meaning.

- **Decision (new) — "In what order does a game minute of a map run take effect?"** Meaning: the
  order of Decision 1. Proposed wording, in the form the human's rule for candidates built from
  MVP choices asks (task, *Context*: it begins with "W MVP" — in the English log "In the MVP" — and
  holds no word that excludes an alternative):
  "In the MVP, a game minute of a map run takes effect in this order: first the character's body —
  its temperature cools by the game map's ambient temperature and warms by what burns on its tile,
  its satiety falls, and its health is lost for being chilled or starving in that minute or
  regained for being neither; then, where its health has reached zero, the character dies in that
  minute and the map run ends there; otherwise what burns loses a minute of burning, tiles renew
  their stock, the action of the character ending in that minute takes effect, and the program
  picks a program rule from what that minute has made."
  Scope: simulation. Based on: none — it rests on no fact of the environment; it is a product
  choice built on the task's rows 1–5, 11–14. Relations: derives from D-04 (a span of game
  minutes) and from D-23 (the pick in a free game minute). Verification: the invariant below, and
  an agent comparing the change — complies: a campfire lit in minute 100 warms from minute 101; a
  berry eaten in the minute health reaches zero does not save the character; violates: health
  counted from the temperature before the minute's cooling; the effect of an action ending in the
  minute of death taking hold. Origin: the task's *Questions carried to cycle*, first question.
- **Invariant (new), proposed identifier `minute-span-split`.** Meaning: "A map run advanced by a
  span of game minutes reaches the same game state, with the same events in the same order, at
  every game minute, however the span is split into calls of the simulation, up to and including
  the character's death." Method: test. Derives from D-04 and the new decision. Part: simulation.
  It is what the task's question asks to hold ("przy każdym podziale czasu na wywołania
  symulacji"), and what keeps task 7's fast-forwarding and task 18's catch-up from changing an
  outcome. Its test is a new file under `tests/invariants/`, which takes a part-map change.
- **Rows 1–6 and 8–15 of *Settlements to record*** — decisions, worded by the foundation step from
  the rows as accepted: body temperature in °C with tenths (1); cooling by the map's ambient
  temperature, which stands in the map's data (2); warming and eating capped at the starting value
  (3); health lost per minute of chill and of hunger, regained otherwise (4); death in the minute
  health reaches zero, also during an action, with its cause (5); the screen after death (6);
  "Zapal" as an ordinary action paid with sticks until task 9 (8); the backpack's cap counting all
  pieces, its height the character's carrying capacity (9); gathering not feasible with a full
  backpack (10); a missed gathering leaving the tile's stock (11); renewal by one piece per renewal
  time up to the starting stock (12); an extinguished campfire staying for lighting again (13);
  feeding adding minutes without a cap (14); the campfire's icon on the drawing and its state in
  the tile list (15).
- **Decision (new) from Decision 4** — meaning: in the MVP, crafting a campfire and lighting a
  stick are carried out only on a revealed tile, as gathering is. Worded by the foundation step in
  the MVP form (opens "In the MVP", no excluding word — e.g. "In the MVP, crafting a campfire and
  lighting a stick can be carried out on a revealed tile, as gathering can."). Scope: simulation.
  Relations: derives from D-25 (as changed with gathering).
- **Row 7 — glossary term `map run restart` (changed).** Meaning: a map run restart may start in
  place of the map run in progress or of a map run ended in death that still stands on the screen.
- **D-25 (changed)** — the projected entry "How does a character move?": gathering takes only from
  a revealed tile, as much as lies on it.
- **D-26 (changed)** — the projected entry "How does a program point at things of the world?": a
  tile holds at most one campfire, which warms only that tile.
- **Environment fact (new)** — the title of the campfire icon as its page on game-icons.net gives
  it, identified like the four `game-icons-*-title` facts after the icon file the maker takes;
  `icon-credits` gains it in *Rests on*.
- **Part map (changed)** — part `simulation` claims the new invariant's test file.
- **To be judged by the return step, not required by this spec:** whether `player-map-run-pace`
  and D-21 need "until the map run ends" now that a map run ended in death stands on the screen and
  passes no time (read with the glossary's `map run`, which ends with death, they hold as written);
  whether D-22's list of kinds of draw ("the game map's layout and wandering among them") names
  gathering now — the projected entry that adds it is task 18's to write; whether D-23's
  *Verification* gets a second example with tenths.

## Left to the maker

- Names of types, functions, fields, events and files; how the data of unit 1 is shaped (an item
  catalogue beside the resources or the resources' identifiers used as items; where the campfire's
  data and icon stand), within D-18 and `content-identifiers`.
- The shape of the program's new conditions and actions (which take a target and from which list —
  a resource of the map, an item, the campfire), within the closed lists and D-26; which items the
  check and the editor allow for "Zapas poniżej" (recommended: the items of the data, not bound to
  the map, since the chest of task 13 will bring others).
- How the order of fuel is chosen from data when there is more than one fuel (today one).
- The events of the new effects beyond the death event, and whether a map run ended in death gives
  `mapRunEnded` at death or at „Zakończ”/„Restart”.
- The layout of the body and backpack row and of the campfire's state in the tile list, within the
  styleguide; which part of the row stands in `danger`.
- The status texts of the new actions: the maker writes them after the task's examples and the
  existing actions' texts and names each in its report, so the human sees it in the request. The
  two other texts the task does not give are settled in Decision 5.
- The program and the seed of the acceptance test: the maker finds a seed on which a program
  passes 480 minutes alive, names both in the test and its report, and returns without code if no
  seed it tries passes.
- How each test that meets death after this change (*Constraints*) is adapted, within what its
  docstring says.
- Whether the change needs a plan of slices: the orchestrator judges after the review.
