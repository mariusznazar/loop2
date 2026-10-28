# Spec — Przewijać czas ręcznego przejścia i rozwiązywać Las passą 480 minut bez uszczerbku od zimna i głodu i bez zmiany programu

- Task: `.runs/task-cycles/rozwiazanie-lasu/task.md`
- Open choice: the five *Questions carried to cycle* of the task — where the chosen pace stands;
  the shape of the solving condition in a map's data row; where the text shown after a completion
  comes from; how a map run holds its streak and its completion and the game state its solved
  maps; and whether a discovery also drops real time carried over from earlier passes.

## Intent

The player can fast-forward a manual map run with five paces, and Las gets a condition that a map
run can meet: a streak of 480 game minutes without a loss of health to cold or hunger and without
a change of the program. A map run that meets it ends in a completion, a screen like the one after
death, and from the first completion the headquarters marks the map solved. This spec settles how
the pace, the streak, the completion and the solved maps are held and where their texts come from,
so that D-04, `player-map-run-pace`, `minute-span-split` and `map-run-repeatability` keep holding.

## Goals and non-goals

Goals:

- the pace the player picks moves a manual map run on at one game minute per real second times
  that pace, survives pause, „Restart”, „Zakończ” and the next send, and a new game starts at 1×;
- a map run counts its streak, which a game minute with a loss of health to cold or hunger and an
  edit of the program after which it differs both set to zero;
- a map run whose streak reaches its map's condition ends in a completion at the place of the pick
  of that game minute, and its map becomes solved for the rest of the game;
- the status row shows the streak during a map run, the completion text after a completion, and the
  five pace buttons beside „Pauza” while the map run has not ended; the headquarters shows each
  map's condition sentence and, once solved, „Mapa: {name} · rozwiązana” in `positive`;
- a map added later, whatever the grammatical gender of its name, gets its completion text and its
  condition sentence by a change of data alone, and task 8 adds beaten attacks to the solving
  condition by adding one requirement to it.

Non-goals:

- the longest streak of a map run (row 11 of *Settlements to record*);
- beaten attacks, the opener of a map, wounds of combat (task 8); the switch of a character to
  another program and the copy of the program a map run carries out (task 12); the trip plan
  (task 13); the payout of a first completion (task 14); the earning loop (task 18); keeping solved
  maps across a reload of the page (task 16);
- any change of what `setPaused` does on a map run that has ended; any pace control outside the
  status row; any change of the clock's 200 ms tick.

## Constraints

- The frozen task: its *To do* 1–8, its 17 settled questions and its 14 rows of *Settlements to
  record*, taken as given.
- D-04: the simulation is pure functions over the game state and a span of game minutes; real time
  enters only as an argument; the view draws only from the game state and the content data, and
  changes the game state only through simulation functions, passing the player's choices and the
  passing of real time. `simulation-isolation`, `simulation-inputs`.
- D-18 and `content-identifiers`: game maps' names and numbers stand in data; no TypeScript file of
  `src/browser/` outside `src/browser/sim/data/` writes the name „Las” or the identifier `forest`.
- D-71: the order of a game minute — body; death; burning, renewal, the effect of an ending action;
  the pick — with a discovery landing where that order brings it and taking hold before the pick.
- D-20 and `action-in-progress`: an edit of the program interrupts no action in progress; a map run
  that ends first ends it. The completion ends the map run, so the action in progress ends with it.
- `program-rule-pick` speaks of free game minutes; a free game minute is one at which the map run
  goes on (glossary), so the game minute of a completion, like that of death, picks nothing without
  breaking it.
- D-22 and `restart-seed`: „Restart” after a completion is a map run restart and keeps the seed.
- D-93: counts stay after the map run ends and reset on the next send or restart; nothing in
  `game.ts` clears them at an end (code at `6540e4c`), so a completion keeps them by itself.
- D-122: a discovery stops the map run in the pause of „Pauza”; row 12 makes a completion in the
  game minute of a discovery replace that pause.
- D-44 and the styleguide: the pace buttons are the shared „button selected in its group” of
  `src/browser/view/controls/button.ts` (`setButtonSelected`); `positive` (D-39) is a role of the
  kind text and already stands in `src/browser/tokens.css`.
- The code as it stands (`6540e4c`): `passRealTime` scales real milliseconds by
  `BALANCE.gameMinutesPerRealSecond`, turns every whole scaled second into a game minute and keeps
  the rest in `realMsCarry`, and sets that carry to zero where the span ends in death or a
  discovery; `advanceMinutes` runs the minute of D-71 through `minuteBeforePick`, `discover` and
  `pickActivity` (`src/browser/sim/game.ts:498`–`591`); `bodyMinute` computes chilled and starving
  but reports only death (`src/browser/sim/body.ts:44`–`78`); `tests/sim/data.test.mjs:177`
  expects `BALANCE.gameMinutesPerRealSecond` to be 1.
- `guidelines/testing.md`: expected numbers — 480, the paces 1, 2, 4, 8, 16 — come from the task
  (D-80, D-82); simulation tests give explicit state, elapsed time and seed (D-84); the changed
  journeys in the browser — pace buttons, completion screen, headquarters texts — are checked by
  hand (D-75, D-88).

## Decisions

### 1. The pace stands in the game state, and the simulation applies it

The game state gains the field `pace`, the multiplier the player picked; `newGame` sets it to 1. A
new simulation function `setPace(state, pace)` sets it and changes nothing else — not the pause, not
the discovery held, not the carried real time — with or without a map run, and throws on a pace
outside the list of paces in the data. `send`, `restart`, `end` and `setPaused` leave it as it is,
so it survives them as row 2 requires. `passRealTime` multiplies the real milliseconds it receives
by `BALANCE.gameMinutesPerRealSecond` and by `state.pace`.

The list of paces stands in `src/browser/sim/data/balance.ts` beside `gameMinutesPerRealSecond`,
which stays 1 and keeps the meaning loop gives it — game minutes per real second at 1×. The view
builds its five buttons from that list and labels each as the number followed by „×”.

The view's handler for a pace button first flushes the clock, as `togglePause` and the program
editor already do, then applies `setPace`; real time elapsed before the click is passed at the old
pace.

Ways rejected:

- the pace held by the view, which multiplies the elapsed milliseconds before `passRealTime` — the
  simulation would receive scaled time as if it were real, which D-04's verification lists as what
  complies only when the view passes the real time elapsed; `player-map-run-pace` could no longer be
  tested on the simulation; the earning loop of task 18, which the speed control must not reach,
  would receive the same scaled time;
- the pace held by the view and passed to `passRealTime` as an extra argument — the simulation stays
  pure, but the view would draw which button is selected from a value outside the game state,
  against D-04's "draws the game only from the game state", and a saved game (task 16) would not
  carry it.

Cost if wrong: small. The pace is one field and one function; moving it to the view later changes
the signature of `passRealTime` and the view's wiring, not the map run.

### 2. The carried real time is a fraction of a game minute, and a stop drops all of it

`realMsCarry` keeps its present meaning: real milliseconds already scaled — now by the pace in force
when they were passed — that have not yet made a game minute, from 0 up to, not including, 1000.
Real time thus counts at the pace in force when it was passed: 500 ms passed at 1× and then 31.25 ms
passed at 16× make one game minute. A change of pace leaves the carry as it is.

Where a call's span ends in death, in a completion or in the game minute of a discovery, the whole
carry is set to zero, as the code does today at death and at a discovery. This answers the fifth
carried question: the carry from earlier passes is dropped too, and this is the same quantity as
the "rest of the real time passed in the same call" of row 4. The carry from earlier passes is
always less than one game minute, so it is used up in the first game minute the call makes; a call
that reaches a discovery has made at least that minute, so whatever is left beyond the discovery's
minute was passed in that call. The test of `player-map-run-pace` that expects a carry of zero
after a discovery holds under both readings.

Way rejected: carrying unscaled real milliseconds, converted at the pace of the next call — 500 ms
passed at 1× followed by a switch to 16× would yield eight game minutes for half a second the player
spent at 1×, and the reading of row 4, "each whole 1/pace of a real second passed", would depend on
the pace of a later call.

Cost if wrong: small; one line of `passRealTime` and the cases of its test.

### 3. The solving condition is an object of named requirements in the map's row

Each row of `MAPS` (`src/browser/sim/data/maps.ts`) gains three fields:

- `solving` — the solving condition, an object whose fields are its requirements, each named by its
  kind; today it holds one, `streak`, the number of successive game minutes the streak must reach.
  Las holds `streak: 480`. A map run meets the condition when it meets every requirement the object
  holds;
- `solvingText` — the sentence of the condition without the map's name, for Las the words after
  „Las — ” in To do 8;
- `completionText` — the whole text the status row shows after a completion, for Las
  „Las rozwiązany”.

Task 8 adds a requirement of beaten attacks as a second field of `solving`, and the map that opens a
map as a field of the row beside `solving`, not inside it: opening a map is not solving it. Where a
later map has no streak requirement, task 8 makes `streak` optional; that is a change of a type,
not of the shape.

A data test checks that each map's `solving` holds at least one requirement and that every
requirement is a whole number above zero.

Ways rejected:

- a list of requirement objects, each with a `kind` — "all must hold" would read the same, but a list
  admits two requirements of one kind and an order that means nothing, and checks one more level of
  structure for no case the definition names;
- flat fields on the row, as loop's `survivalMinutes` — the requirements of solving would stand
  among the map's layout numbers, and "the condition" would have no single place for the simulation
  to read or for the headquarters to name.

Cost if wrong: a rename or a reshaping of one data row and the one function that reads it.

### 4. The texts after a completion and of the condition come from the map's data

The status row after a completion reads „Minuta {minute of completion} · {completionText}”. The
whole `completionText` stands in the data because its ending agrees with the map's name in gender
and form — „Las rozwiązany”, a feminine name would take „rozwiązana”, and a name of several words,
such as „Las — głębiej”, may need its own wording — which no pattern built from the name gives
reliably.

The headquarters shows the condition sentence as „{name} — {solvingText}”, the name taken from the
map's data, which reproduces the example of To do 8 and keeps the name in one place of the row; the
dash makes the composition correct for a name of any gender. The solved mark „Mapa: {name} ·
rozwiązana” agrees with „Mapa”, not with the name, so the view composes it from the name alone.

Ways rejected:

- a pattern „{name} rozwiązany” in the view — wrong for a feminine or neuter name;
- a grammatical gender field in the data from which the view picks the ending — more machinery than
  one text per map, and still wrong for names that read badly with a bare participle;
- the whole condition sentence, name included, in the data — the name would stand twice in one row
  and could drift from `name`.

Cost if wrong: a field renamed or a text moved between the data and the view; nothing in the
simulation depends on it.

### 5. A map run holds its streak and its completion; the game state holds its solved maps

Units and their interfaces:

- **The body step reports a loss.** `bodyMinute` (`src/browser/sim/body.ts`) also says whether the
  character lost health to cold or hunger in that minute — chilled or starving after its step, as
  D-60 counts the loss. The streak reads this report, not a comparison of health before and after,
  so that wounds of combat (task 8), which lower health, can leave the streak as the definition
  requires.
- **`MapRun.streak`** — a whole number, 0 when a map run starts, by send and by restart. In each
  game minute, after the body step, it grows by one where the body step reports no loss and becomes
  0 where it reports one (To do 4). The game minute of death is always a minute of such a loss —
  health falls only for being chilled or starving (D-60), so it reaches zero (D-61) only in such a
  minute — so a map run ended in death holds a streak of 0, as loop's test cited by the task
  expects (`src/sim/sim.test.ts:555`, `cdc7c0d`). The death branch of `minuteBeforePick` sets it
  from the same report as the branch of a living character.
- **`MapRun.completion`** — `null` while the map run has not completed; once it completes, an
  object holding the game minute of the completion, beside `death` and of the same kind. A map run
  has ended when it has a death or a completion; one exported predicate of the simulation says so,
  and every place that today reads `run.death` to mean "the map run has ended" — `passRealTime`,
  `advanceMinutes`, `minuteBeforePick`, `pauseLabel` and the status row — uses it, while the places
  that need the death itself, its minute or its cause, keep reading `death`.
- **The completion check** stands in the minute loop of `advanceMinutes`, at the place of the pick:
  after `minuteBeforePick` and after the discovery of that minute has taken hold, where the run
  meets the solving condition of its map, the run gains its completion, the event
  `{ kind: "mapRunCompleted", minute }` follows the minute's other events, no program rule is
  picked whether or not the minute is a free one, and the loop stops, as it stops at death.
  Otherwise the pick goes on as today. The check is a function of `run.ts` beside
  `minuteBeforePick` and `pickActivity` that takes the run and the map's data.
- **`GameState.solvedMaps`** — the identifiers of the maps solved in this game, each at most once,
  in the order of their first completion; `[]` in a new game. The game minute of a completion adds
  the run's map where it is not there yet. Nothing removes it: death, `restart`, `end`, `send` and
  later deaths on that map leave it.
- **The pause at a completion.** Where the game minute of the completion is also that of a
  discovery, the state holds the discovery, so its line shows, and is not paused (row 4, "chyba że
  się w niej skończyło"; row 12). `restart` and `end` clear the discovery as they do today.
- **`passRealTime`** does nothing on a map run that has ended, and sets the carry to zero where its
  span ends in a completion (decision 2).
- **Zeroing on an edit.** `setProgram` compares the checked program with the program the state
  holds; where they differ and the state holds a map run that has not ended, the run's streak
  becomes 0, paused or not. "Differ" is deep inequality of the two programs as the game state holds
  them — the groups in order with their identities, names and conditions, the rules of each in order
  with their identities, conditions and actions, and the identity counters. So „↑” on the first rule
  and any editor act that hands back the same program leave the streak; swapping two rules of the
  same content zeroes it, since the rules are two rules, told apart by identity and by their counts
  in the editor. A map run that has ended keeps the streak it ended with, since its screen stands on
  the state of its last minute (D-62). The rule the game writes at the first chill (D-123) does not
  go through `setProgram` and does not zero the streak; in that minute the character is chilled, so
  the streak is 0 anyway.

Since the streak, the completion and the solved maps change only inside the minute loop of the
simulation, one game minute at a time, and depend only on the run, the map's data and the program,
a span split into any calls reaches the same state with the same events at every game minute up to
the end of the map run, which keeps `minute-span-split` in its new wording (row 13), and two
simulations of one program from one state with one seed and the same real-time inputs give the
same map run, which keeps `map-run-repeatability`.

Ways rejected:

- one field `end` replacing `death`, holding either a death or a completion — the cleaner shape, but
  every reader of `run.death` in the code and the tests would change for no behaviour this task
  needs;
- the completion decided inside `minuteBeforePick` — its event would precede the `discovered` event
  of the same minute, and a discovery in that minute would land after the end of the map run,
  against D-71's place of the pick;
- the streak held in the game state beside `paused` — it belongs to one map run, starts with it and
  ends with it;
- solved maps as a record keyed by map — the same meaning; a list keeps the order of solving and
  matches what loop kept (`src/sim/tick.test.ts:41` of loop, cited by the task).

Cost if wrong: moderate. The fields enter the game state that task 16 will save; renaming them
after task 16 means a migration of saved games.

### 6. The screens

- **Status row** (`src/browser/view/status-row.ts`): during a map run that has not ended, the text
  is „Minuta {minute} · {activity} · Passa {streak}/{streak requirement of the map}”, with
  „ (pauza)” at its end while paused (To do 8, question 16). After death it is as today. After a
  completion it is the text of decision 4, and the text element carries the role `positive` then
  and only then. The five pace buttons are made once, beside „Pauza”, each a shared button whose
  selected state follows `state.pace` through `setButtonSelected`; they stay visible and active
  during a pause, the pause at a discovery included, and are hidden, with „Pauza”, once the map run
  has ended, in death or in a completion. „Restart” and „Zakończ” stay as they are.
  `StatusRowControls` gains `setPace(pace)`, which the game view turns into `clock.flush()` and
  `setPace`.
- **Headquarters** (`src/browser/view/headquarters.ts`): in each character's row, where the map is
  named, „Mapa: {name}” becomes „Mapa: {name} · rozwiązana” in the role `positive` once the game
  state lists the map as solved, and the condition sentence of decision 4 stands with it, solved or
  not. The headquarters re-renders that part when `solvedMaps` changes, as it now does when the team
  changes.
- **Styles**: a rule that gives the status text and the solved mark the colour `var(--positive)`
  where the module marks them; no new token, role or shared control, so the styleguide and the
  kitchen-sink page are unchanged.

Way rejected for the headquarters: a section of maps of its own, holding each map's sentence and
solved mark once — a new section the task does not ask for, while the map is named today only in
each character's row.

Cost if wrong: view only; reversible without touching the game state.

## Foundation entries

Written or changed by this change, as the task's *Settlements to record* and its *Decisions in play*
carry them; the foundation step words them:

- decision D-21, new answer (row 1) — a map run the player starts passes at one game minute per real
  second times the pace the player picks of 1×, 2×, 4×, 8× and 16×, the pause stays, and picking a
  pace in a pause changes the pace and leaves the map run paused; its *Rejected* no longer rejects a
  faster pace;
- decision (row 2) — the chosen pace stays until the player changes it, through pause, „Restart”,
  „Zakończ” and the next send, and a new game starts at 1×;
- decision (row 3) — five buttons „1×” to „16×” beside „Pauza” in the status row, the chosen one a
  button selected in its group;
- invariant `player-map-run-pace`, new wording (row 4) — one game minute for each whole 1/pace real
  second passed outside a pause, the incomplete rest carried to the next pass, none while paused,
  and after a game minute of a discovery the map run paused unless it ended in it, the rest of that
  call's real time dropped;
- decision D-71, a sentence added (row 5) — the streak grows after the body step of a minute with no
  loss to cold or hunger, and a map run meeting its map's solving condition lets the rest of the
  minute take effect and completes at the place of the pick;
- decision (row 6) — of the edits of the program, an edit after which the program differs sets the
  streak to zero, also in a pause; an edit that leaves it the same does not;
- decision D-62, a sentence added, and a decision of the completion screen (row 7) — after a
  completion the screen stays on its minute, time stands, the status row reads the map's completion
  text in `positive`, „Pauza” and the pace buttons are gone and „Restart” and „Zakończ” stay; after
  death the pace buttons are gone with „Pauza”;
- glossary `map run restart`, new wording (row 8) — it also replaces a map run ended in a completion
  that still stands on the screen;
- decision (row 9) — the status row shows the streak beside the minute and the activity, and the
  headquarters shows by the map the sentence of its solving condition from the map's data;
- decision (row 10) — from the first completion of a map by any character the headquarters shows
  „Mapa: {map} · rozwiązana” in `positive`;
- decision (row 11) — the game does not show a map run's longest streak today;
- decision D-122, new wording (row 12) — a completion in the game minute of a discovery replaces the
  pause, and the line of the discovery stands under the completion's status row until „Restart” or
  „Zakończ”;
- invariant `minute-span-split`, new wording (row 13) — the same state and events at every game
  minute however the span is split, up to and including the end of the map run or the game minute
  of a discovery;
- decision D-93, the sentence of the ends of a map run (row 14) — counts also stay after a
  completion until the next send or restart;
- glossary `completion`, `solved map`, `streak`, `manual map run` — the terms the task writes;
- invariant `streak-program-change/1`, the part this task makes true — a change of the program rules
  or rule groups the map run carries out sets its streak to zero, on every map.

This spec's own decisions add no entry: the pace in the game state is D-04's player's choice passed
to the simulation; the solving condition and the texts in the map's row are D-18's content in data
and the projected entry "How is a map solved, and what opens the next one?", which task 8 writes.

## Left to the maker

- The exact identifiers of the new fields, the function, the predicate of an ended map run and the
  event, where they keep the shapes above; the TypeScript type of the pace, derived from the list of
  paces in the data.
- The order of the controls in the status row, provided the pace buttons stand beside „Pauza”; the
  accessible names of the pace buttons; the CSS class names and how the status text switches its
  role.
- Where in a character's row of the headquarters the condition sentence stands, and on which line.
- Whether `stepMinute` of `run.ts`, which nothing outside `run.ts` calls, also learns the
  completion or is left as it is.
- The tests, per `guidelines/testing.md`: the new cases and the changed ones of
  `tests/invariants/test_player_map_run_pace.py` (a pace other than 1×; a change of pace between
  passes, with the carry as decision 2 sets it; a discovery inside one real second at 16×; a
  completion that stops the map run unpaused with the carry dropped) and of
  `tests/invariants/test_minute_span_split.py` (a completion inside a span, reached by splits of
  several minutes, as 16× gives on a 200 ms tick), each with its docstring reading the new wording;
  simulation cases on explicit state — for example a map run whose streak stands at 479 — for the
  streak's growth and reset, a streak of 0 in the game minute of death, the zeroing by a differing edit and not by an identical one, the rest
  of the minute of completion taking effect, the solved map surviving a later death, „Restart”
  after a completion keeping the seed, and the counts kept after a completion; view cases for the
  status text with the streak and after a completion, the pause label and the pace buttons after an
  end, and the headquarters' texts. Existing tests whose scenario reaches 480 minutes without a loss
  — the ALIVE scenario of `test_minute_span_split.py` and `tests/sim/acceptance.test.mjs` may — now
  end in a completion; a changed expectation there names the task as its cause, per *Changing an
  existing test*.
- The hand check in a browser of the pace buttons, the completion screen and the headquarters' texts
  (D-75, D-88).
