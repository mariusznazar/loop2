# Spec — Kronika z filtrami na ekranie przejścia

- Task: `docs/task-cycles/kronika-z-filtrami/task.md` (frozen, sha256 prefix cd12745e0f8566f7)
- Open choice: the four questions of *Questions carried to cycle*, settled as one design — where the
  view gets the cause of a loss of the streak and the description of a change of the program (new
  events of the simulation or a comparison of readings of the game state, the save keeping its
  shape); how the game knows that a campfire went out; where in the view the chronicle lives so that
  it survives Siedziba and back without entering the game state; how the list stays fluid at 16× and
  in a long map run — together with the choices of the design no settlement of the task makes.
- Base: `6f36c7ab998ceaf996afb617ca95881b3f007b2d`. Line numbers below are of the base; the task
  cites `b97fdd0`, and where code moved since, the base place is given.
- Trust boundary: not touched. `src/browser/sim/saved-game.ts` and `assets/icons/**`,
  `assets/fonts/**`, `assets/sprites/**` are neither read for the design nor changed by it.
- Irreversible operation: none.

## Intent

A manual map run gets a chronicle: a record, in the memory of the page, of what happened in it,
each entry with its game minute — discoveries, the character's actions, the last encounter, the
player's changes of the copy, each loss of a streak above zero with its cause, and the world's
events (a campfire going out, the character's death, the completion). The player reads it in the
right area of the screen of a map run under the tab „Kronika” and filters it by kind. The
paragraph of the last encounter leaves the world area for the chronicle. The save keeps its shape
and its version 3.

The design takes each fact from where it can be known exactly: what happens inside a game minute
comes from new events of the simulation, since a reading of the game state every 200 ms sees only
the end of several minutes at 16×; what the player does to the copy comes from the reading before
and after that one act, which the view makes anyway; the last encounter is composed from the facts
the game state already keeps, which is also why it stands after a load.

## Goals and non-goals

Goals:

- To do 1–9 of the task, as its answers to questions 1–12 settle them, without reopening any.
- The simulation reports, as events with their game minute, the two facts no event reports today:
  a loss of a streak above zero with its cause, and a campfire whose minutes of burning run out.
- The chronicle lives in the memory of the page, owned by the game view, with the choice of the tab
  and of the filter beside it; nothing of it enters `GameState` or the save.
- The list stays fluid at 16× and does not slow down as the chronicle grows: each entry's text is
  composed once, when it is recorded, and the list draws a bounded window of entries.
- To do 10–12: the foundation entries listed under *Foundation entries*, and the guideline changes
  through `the-way-maintain-styleguide` and `the-way-maintain-coding-guidelines`.

Non-goals:

- No change of the shape of the game state or of the save; `save-version` and D-206's version 3
  stay; `src/browser/sim/saved-game.ts` is not touched.
- No end of the map run in the right area, no „ostatnie minuty”, no record of the encounter at the
  end of the map run, no removal of the lines of the end from the world area — task 16.
- No chronicle of an earning loop: its events do not reach the view (`passLoops` and `catchUp` hand
  on only `loopRunEnded`, `src/browser/sim/loop.ts:492-521`, `:532-582`), and the design adds no way
  for them to.
- No entry for an edit of any saved program, the copy's own saved program included (see D5), for
  creating, renaming or deleting a program, or for the rule the game writes at the first chill.
- No entry for the result of an action, for each minute of a wait, for each minute of health lost
  while the streak stands at zero, or for each exchange of an encounter (task, questions 2, 3, 5).
- No limit of the number of entries and no entry dropped (task, question 1, way B1 not chosen).
- No new library, design token, role or shared control, and no change of the kitchen-sink page.
- Keeping the player's place in a list scrolled away from its top while entries arrive above is not
  designed beyond what the browser's own scroll anchoring does.

## Constraints

- The task: To do 1–12, the answers to questions 1–12, the *Settlements to record* rows 1, 2, 3, 4,
  7, 8, 9, 10 and 14, *Out of scope*. The acceptance criterion: a check in a real browser at 1× and
  16× with screenshots attached to the request (question 10) — a step of the cycle, not of this
  design.
- D-04 (base text, `foundations/decisions.md:54-62`): the view draws "for the scene, its previous
  reading of the game state and the events the simulation returned" and changes the game state only
  through functions of the simulation; the task extends that clause to the chronicle. Invariants
  `simulation-isolation` and `simulation-inputs`: new code of the simulation imports only the
  simulation and changes no value passed to it.
- `save-version` and D-206: the version of the save stays 3; D-207: a save above 64 KiB is not sent
  — the chronicle never enters the save, so it adds nothing to its size.
- `streak-program-change` and D-131: which acts set the streak to zero is unchanged; the design only
  reports it.
- D-147, base text (`foundations/decisions.md:2788`), and the transitional wording the task gives:
  the paragraph of the last encounter is composed from the facts the map run keeps, not by replaying
  combat; one paragraph, the last attack's.
- D-311 (base text, `:6692-6699`, already in task 14's wording): the right area holds one content at
  a time, the editing of a rule or a group while one is open and the table otherwise; the world
  holds the paragraph under „Teraz” and „Potem”.
- D-276 (tab: the shared button `kind="tab"` in a container of class `tabs`), D-130 via D-276 (the
  pace buttons keep the look of the button selected in its group), D-46 (the chronicle in Geist
  Mono), D-39 and D-40 (roles), D-43 and `browser-view-token-values` (no value in place of a token),
  D-44 (screens build on the shared controls), D-265 and D-267 (React screens; no Effect for
  transforming data or handling a user's event), D-283 (leaving the screen pauses a manual map run),
  D-212 (a load comes back paused at the minute of the save), D-334 and D-132 (the words of „Teraz”).
- `content-identifiers`: no TypeScript file of the view outside `src/browser/sim/data/` names a map,
  a resource or an archetype by its identifier or name.
- The code at the base, as the design relies on it:
  - `GameEvent` (`src/browser/sim/run.ts:62-82`) has no event of a loss of the streak, of a change of
    the program or of a campfire going out, as the task says.
  - The streak falls to zero in the body's step of a minute, `streakAfter`
    (`src/browser/sim/run.ts:449-452`), used at the death (`:485-499`) and in a living minute
    (`:500-501`); the body reports `lostHealth` with chill and starvation read from the body after
    the step (`src/browser/sim/body.ts:88-90`), the cause of death being cold where chilled
    (`:98-103`). In the minutes of an encounter the streak grows (`src/browser/sim/run.ts:467-477`).
    An edit of the copy sets it to zero in `withCopyProgram` where the rules or groups differ and the
    map run has not ended (`src/browser/sim/programs.ts:570-590`), used by `setProgram`
    (`src/browser/sim/game.ts:369-376`, events `[]`) and `discardCopyChanges`
    (`src/browser/sim/programs.ts:697-704`, events `[]`); a switch sets it to zero in
    `switchProgram` (`:714-745`, `streak: 0` at `:739`, events `[]`).
  - A campfire loses a minute of burning in `worldMinute` and stays on its tile at 0
    (`src/browser/sim/world.ts:41-46`), called in a minute of an encounter
    (`src/browser/sim/run.ts:473`) and in a living minute (`:502`); in the minute of a death the world
    does not pass (`:485-499`).
  - `lastCombat` (`src/browser/sim/types.ts:150`, field at `:263`) holds the creature, the minute of
    the attack, the minute of resolving and the result, `null` until the turns are resolved; it is set
    at the attack (`src/browser/sim/run.ts:705-710`) and at the resolving (`:647-656`), and a new map
    run starts with `null` (`:368`). The world area composes the paragraph from it,
    `combatText(run.lastCombat)` (`src/browser/view/world-area.tsx:90-92`,
    `src/browser/view/combat-line.ts:72-77`).
  - A span of time stops at a discovery, so one result holds at most one `discovered` event, and the
    state returned with it holds that discovery in `discovery`
    (`src/browser/sim/game.ts:790-802`, `:824`). The band's text is `discoveryText` and the sentence
    of the rule the game wrote, composed from the state (`src/browser/view/discovery-band.tsx:35-40`,
    `:55-57`; `src/browser/view/status-row.ts:92-107`; `chillRuleGroupName`,
    `src/browser/sim/understanding.ts:469-482`). The first chill writes its rule into the copy inside
    `advanceMinutes` (`src/browser/sim/game.ts:745-768`), with no act of the player.
  - The words of „Teraz” live in `src/browser/view/now-lines.ts` since task 14 (the task cites
    `status-row.ts` of `b97fdd0`): the wait „Czeka — żadna reguła nie pasuje” (`:16`), the causes of
    death (`:19-23`), the action by `actionSentence` (`:78`; `src/browser/view/program-editor.ts:812`),
    the completion by the map's `completionText` (`src/browser/sim/game.ts:243-244`). The editor's
    numbers are `groupNumber` and `ruleNumber` (`src/browser/view/program-editor.ts:789-796`) and a
    rule's row `ruleSentence` (`:820-828`).
  - The game view holds the one game state and replaces it only in `store.apply`
    (`src/browser/view/game-view.ts:267-288`), which every result passes: each reading of the clock
    (`src/browser/view/clock.ts:84-99`, every 200 ms, `:60`), a send (`:104-108`) and every act of
    the player through `act` (`src/browser/view/game-view.ts:209-213`). The acts on the copy are the
    panel's controls `editCopy`, `saveCopy`, `saveCopyAsNew`, `discardCopy` and `switchProgram`
    (`:218-255`); every edit of the copy, „Dodaj regułę z tym” included, reaches `editCopy`
    (`src/browser/view/program-panel.tsx:759-762`, `:803-815`). The screen of a map run is built
    once and only hidden while another screen shows (`src/browser/view/game-view.ts:415`,
    `:713-716`), and the game view is built anew from a loaded state after a reload, a sign-in or a
    conflict.
  - The right area shows the table or, while a rule is open, the host of the rule panel
    (`src/browser/view/run-screen.tsx:171-176`).
  - The pace buttons are `ReactButton` with `selected` (`src/browser/view/run-header.tsx:97-106`);
    the tabs of the login card are `ReactButton kind="tab"` in a container of class `tabs`
    (`src/browser/view/account-card.tsx:621-638`).
  - `src/browser/tokens.css` already holds `--panel` (`:12`, "the background of the chronicle"),
    `--player-change` (`:35`), `--font-family-mono` (`:49-50`, "for the chronicle") and
    `--font-size-detail` (`:56`, "the chronicle"); `--discovery` (`:34`), `--danger` (`:33`),
    `--positive` (`:31`), `--text-label` (`:27`), `--text-secondary` (`:26`).
  - A move of a rule by „↑” or „↓” or by a drag next to its neighbour, and a drag of a group next to
    its neighbour, swap two items, so the copy before and after cannot tell which one the player
    moved (`moveRule`, `src/browser/view/program-editor.ts:273-300`; `dropRule`, `:78-111`;
    `dropGroup`, `:318`; their call sites `src/browser/view/rule-list.tsx:112-128`, `:360-377`).

## Decisions

### D1. Facts of a game minute come from two new events of the simulation; acts on the copy are read before and after the act

`GameEvent` gains two kinds, each with the game minute it happened in:

- a loss of the streak: emitted wherever a streak above zero becomes zero, carrying the streak as
  it stood before the loss and its cause, one of: cold, hunger, cold and hunger together, a change
  of the copy's rules or rule groups, a switch to another program. Emitted by the body's step of a
  minute (`minuteBeforePick`), also in the minute of a death of cold or hunger, before the death
  event of that minute; by `setProgram` with a map run and by `discardCopyChanges`, where the edit
  sets a streak above zero to zero; by `switchProgram`, where the streak was above zero. The cause
  of a loss in the body's step is read as the body reads chill and starvation after the step, from
  one definition (`src/browser/sim/body.ts:88-90`), never by a second copy of the thresholds;
- a campfire going out: emitted for each campfire whose minutes of burning fall from above zero to
  zero in the world's step of a minute, in a living minute and in a minute of an encounter alike,
  carrying the campfire's tile. A campfire crafted unlit, or one already at zero, gives none.

No function but `minuteBeforePick`, `setProgram`, `discardCopyChanges` and `switchProgram` (and
those that pass their events on, such as `stepMinute` and `advanceMinutes`) changes the events it
returns, and none changes the state it returns. Neither event is held by the game state.

The changes of the copy themselves are not events. The view reads them, at the act, from the copy
before the act and the copy after it, which D-04's clause for the chronicle allows ("its previous
reading of the game state").

Ways weighed:

- **A — readings alone.** The view compares each reading with the previous one. At 16× a reading
  every 200 ms spans about three game minutes, and a tab the browser throttled or that came back
  spans hundreds at once (`src/browser/view/clock.ts:84-99`): the minute of a loss is lost, the
  cause is lost where the body recovered within the span, and a campfire that went out and was lit
  again within one reading is never seen. It breaks To do 1 ("każdy wpis ma minutę gry") and To do
  4. Rejected.
- **B — every fact as an event**, the changes of the copy too: `setProgram` and the four other acts
  would return events describing the change. The simulation does not know which of two swapped
  rules the player moved (see D4), so B would need the view's hint passed into the simulation's
  `setProgram`, or would describe some swaps wrongly; and it changes five functions of the
  simulation for facts the view already holds exactly, since each act is one call. Rejected.
- **C — events for the minute, readings for the act (chosen).** Exact for both; the simulation
  learns only what it alone knows, and the streak's loss, from all three places, is one event with
  one shape, which tests can hold in `tests/sim`.

Cost if wrong: a third place that sets a streak above zero to zero without the event leaves a loss
the chronicle never shows; the tests of D7 hold each of the three places.

### D2. The game view owns the chronicle in the memory of the page and records every result in `store.apply`

A unit of the view, the chronicle memory, is created by the game view when it is built, from the
game state it is built from, beside the folding of rule groups (`createFolding`,
`src/browser/view/game-view.ts:261`), and lives as long as the game view. The game view records
into it every result the store takes, in `store.apply`, after the result passes and before the
screens draw; an act on the copy gives, with its result, the description of the act (D4). The
screen of a map run is given the chronicle memory when it is built and draws from it at each
update. The memory holds:

- the entries, in the order they were recorded, each with its kind, its game minute, its text and
  the role of its text (D3), kept so that each kind's entries can be read newest first without a
  pass over the others;
- the place of the paragraph of the last encounter: its position in the order of recording and the
  game minute of the attack (D6);
- whether the last start of an activity recorded was a wait (D3);
- the tab picked, „Kronika” or „Teren”, and the filter picked;
- a number that changes at every change of the above, which the screen compares to draw nothing
  again where nothing changed.

Recording follows the result's events:

- a map run started by a send (an event of a map run started with no event of a map run ended in
  the same result) clears the entries and the place, sets the wait mark off, and sets the tab to
  „Kronika” and the filter to „Wszystko”;
- a map run started by „Restart” (both events in one result) clears the entries, the place and the
  wait mark and keeps the tab and the filter (task, question 6; settlement row 14; the filter as
  D9 reads it);
- a map run ended by „Zakończ” (the event of a map run ended alone) clears the entries and the place;
- the other events give entries as D3 gives.

Built from a loaded state, the memory holds no entry, the place of the paragraph where the state's
map run holds a `lastCombat` (at the minute of its attack, as the only and so first entry), the wait
mark on where the map run's current activity is a wait, and „Kronika” and „Wszystko”. That is what
"after a load the chronicle starts from the paragraph of the last encounter in the minute of the
attack" means here (To do 1): the reading is the game state the game view is built from, the game
minute is `lastCombat.attackMinute`, and the paragraph's text comes from that state as at every draw.

Ways weighed:

- **Inside the screen of a map run**, in its React state. The screen survives Siedziba, being only
  hidden, but its `update` gets no previous state and no act, and the reset at a send against
  „Restart” would have to be derived during render or in an Effect, which D-267 forbids for
  transforming data. Rejected.
- **In the game state.** Settled against by the task (question 1). Rejected.
- **In the game view (chosen).** `store.apply` is the one place every result passes with the state
  before it; the act sites are there; the memory lives exactly as long as the game built from one
  load, so a reload, a sign-in or a conflict start it from the loaded state, as To do 1 asks.

Cost if wrong: a result that reaches the game state without passing `store.apply` would leave a
gap in the chronicle; no such path exists at the base (`src/browser/view/clock.ts:94-97`, `:107`,
`:112`, `:119`; `src/browser/view/game-view.ts:209-213`).

### D3. What each event gives, its kind, filter, text and role

Each entry has exactly one kind, and each filter but „Wszystko” shows exactly one kind; „Wszystko”
shows all. The text of an entry is composed once, when it is recorded, from the result being
recorded, and never again; its minute is the event's minute, or for an act the minute of the map
run in the state after the act (which after an end is the minute of the end).

| Source | Kind and filter | Text | Role |
|---|---|---|---|
| start of an activity of a program rule | action — „Czynności” | the action as „Teraz” writes it, `actionSentence` (task, question 2) | `text` |
| start of a wait, only where the last start recorded was not a wait | action — „Czynności” | „Czeka — żadna reguła nie pasuje” | `text` |
| attack | combat — „Walka” | the paragraph, D6 | `text` |
| discovery | discovery — „Odkrycia” | the band's text of the state returned with the event, without its buttons (D8) | `discovery` |
| loss of the streak | streak — „Passa” | „Passa {passa} przerwana: {przyczyna}”, {passa} the streak before the loss, {przyczyna} „zdrowie spadło od zimna”, „zdrowie spadło od głodu”, „zdrowie spadło od zimna i głodu”, „zmiana programu”, „przełączenie na inny program” (task, To do 4, settlement row 3) | `danger` |
| act on the copy | change — „Moje zmiany” | D4 | `player-change` |
| campfire going out | world — „Świat” | „Ognisko wygasło”, one entry for each campfire | `text` |
| death | world — „Świat” | the words „Teraz” uses for its cause | `text` |
| completion | world — „Świat” | the map's `completionText` | `positive` |

The start of a rule's activity and an attack set the wait mark off, the start of a wait sets it
on. The words shared with „Teraz” — the wait, the causes of death — come from one place,
`src/browser/view/now-lines.ts`, which both read, so the two never disagree. Where a text names a
thing of the data, such as the campfire, the name comes from the data where `content-identifiers`
asks it. Within one result the entries are recorded in the order of its events; for an act, the
entries of the change come first and then the entries of the result's events, so a change and the
loss it caused stand in the same minute, the loss newer (To do 4).

Cost if wrong: an entry's kind decides both its filter and its colour, so one table holds both.

### D4. The entries of a change of the copy

The game view gives the chronicle, with each act on the copy, what the act was: an edit (with, for
a move, which rule or group the player moved), a discard, a save into the copy's program, a save as
a new program, a switch. The texts, in the role `player-change`:

- a save into the program: „Zapisano kopię w programie „{nazwa}””;
- a save as a new program: „Zapisano kopię jako nowy program „{nazwa}””, the new program's name;
- a switch: „Przełączono postać na program „{nazwa}””;
- a discard: „Porzucono zmiany kopii” alone, whatever the discard changed;
- an edit: one entry for each change between the copy's program before and after the act, rules
  and groups matched by their identities, which the editor never reuses:
  - a rule only after: „Dodano regułę {numer}: {zdanie}”, number and sentence after;
  - a rule only before, whose group stays: „Usunięto regułę {numer}: {zdanie}”, number and sentence
    before;
  - a rule in both whose condition or action changed: „Zmieniono regułę {numer}: {zdanie przed} →
    {zdanie po}”;
  - a rule the player moved — the one named by the act's move, or the one whose group changed, or
    the one whose order against the other rules of its group changed — and not a rule whose number
    shifted only because another moved: „Przesunięto regułę {numer przed} na {numer po}: {zdanie}”;
  - a group only after: „Dodano grupę „{nazwa}””; only before: „Usunięto grupę „{nazwa}””, its
    rules given no entry of their own; a group in both whose name or condition changed: „Zmieniono
    grupę „{nazwa}””; a group the player moved: „Przesunięto grupę „{nazwa}””, a group's rules given
    no entry for the numbers they took;
  - a trip plan that changed: „Zmieniono plan wyprawy”;
  - an edit after which the copy is the same as before it gives nothing.

  {numer} is the editor's number, `ruleNumber`; {zdanie} the rule's row, condition and action as
  `ruleSentence` gives them, joined as the row reads, „{warunek} → {czynność}”; {nazwa} a group's
  name — the name before for a removed group and the name after otherwise.

No other act gives an entry of this kind: an edit, a rename, a creation or a deletion of a saved
program, the copy's own program included, changes no map run, and the rule the game writes at the
first chill is no act of the player — it stands in the discovery's entry.

The hint of the move travels from the editor's three move sites — „↑”/„↓”, the drop of a rule, the
drop of a group — through the panel's edit and `editCopy` to the chronicle; it never enters the
simulation. An edit with no hint is described from the copies alone.

Ways weighed:

- **The editor describes every edit**, at each of its sites, and no comparison is made. Exact, but
  every site of the rule panel, the list and the trip plan takes a description: many more places to
  keep right. Rejected.
- **Comparison alone**, swaps decided by a fixed rule. A swap reads as the other rule moving in
  half the cases — „Przesunięto regułę 2.2 na 2.1” after „↓” on 2.1. Rejected.
- **Comparison with a hint for moves (chosen).** Comparison covers every edit the editor has or will
  have; three sites add the one fact comparison cannot recover.

Cost if wrong: a future edit that changes several things in one act gives several entries, each
true; a new move site without the hint gives a swap described from the copies alone.

### D5. Readings of the task's wording this design writes down

- „Edycja innego zapisanego programu niż ten od kopii wpisu nie daje” is read with To do 5's first
  sentence, „Każda zmiana kopii programu daje wpis”: only a change of the copy gives an entry, so an
  edit of the copy's own saved program gives none either, as it changes no map run (the reason of
  question 4, `saved-program-edit`).
- „Zmieniono regułę 2.1: … → …” is read as the whole sentence before, „ → ”, the whole sentence
  after, each sentence holding its own „→”, as the task's „Dodano regułę 2.3: Zawsze → Wędruj”
  shows a sentence.
- „to samo dla grup („Dodano grupę „Ogień””)” with „wpis o grupie jej nazwę” is read as a group
  entry giving the verb and the group's name, no number and no condition, as D4 lists.
- „Ognisko wygasło” is given for every campfire that goes out, wherever it stands; the task names
  one campfire, and the map may hold several.
- „kronika zaczyna się pusta, gdy gracz wysyła postać i przy „Restart”” is read as no entry carried
  over; the start of the first activity at minute 0 is the new chronicle's first entry.
- „Nic tu jeszcze nie ma.” stands in `text-secondary`, as „Wybierz mapę z listy.” does for a list
  with nothing picked (D-331), being an explanation of an empty place.
- „Cała kronika stoi w Geist Mono (D-46) na tle `panel`” is read as: the filter row and the list
  stand on `panel`, and the list's rows and its empty sentence stand in Geist Mono; the filter
  buttons keep the font of the shared button, since To do 9 gives them „wygląd przycisków tempa”,
  and the tabs above, which switch between the chronicle and the table, are no part of the chronicle.
- „Każdy wpis ma minutę gry” for an act after the end of a map run is the minute of the end, which
  is the map run's minute in the state after the act (To do 5, „z minutą końca”).

### D6. The paragraph of the last encounter is composed at draw time, at a place the chronicle keeps

The chronicle keeps no text of the encounter. At an attack it moves the place of the paragraph to
the position of that event in the order of recording and to the attack's minute, the earlier place
gone; at each draw the screen composes the paragraph from `lastCombat` of the state it draws, with
`combatText`, again only when `lastCombat` changed. So the paragraph adds the turns when they are
resolved, one paragraph stands for the last attack only (D-147, question 5, way D1), and after a
load it stands from the facts the save already holds (question 1, answer C). The world area no
longer shows it (To do 6).

Ways weighed: an entry recorded from the events of the encounter would need the turns recomputed
into it at the resolving and would be gone after a load; the paragraph composed from the state is
the same text the world area shows today. The place is what lets it stand among the entries by
time.

Cost if wrong: none found; a state whose `lastCombat` is null leaves the place unused.

### D7. Fluid at 16× and in a long map run

- An entry's text is composed once, at recording (D3); a draw composes only the paragraph, and only
  when `lastCombat` changed.
- Each kind's entries are kept apart as well as in the whole order, so a filter reads its newest
  entries without a pass over the chronicle.
- The list draws, newest first, a window of the filter's newest entries of a fixed size, and grows
  the window by the same size when the player scrolls near its end, so every entry stays reachable
  and the rows drawn do not grow with the chronicle; picking a filter starts its window anew.
- A draw whose chronicle number, filter, window and `lastCombat` did not change draws no row again,
  and a row already drawn is not drawn again when entries are added above it.
- The memory grows by one small record per entry, which the risk of the decision "How does an
  agent learn what went wrong in the running game?" already names as a hypothesis.

Ways weighed: drawing every entry — the cost of each draw grows with the chronicle, against that
decision's risk; a limit of entries — rejected by the task (question 1, way B1); a library of
virtual lists — a library is a reserved choice and rows of varying height (a discovery or a
paragraph wrapping over lines) make exact virtualization the costliest way.

Cost if wrong: if the window is too small, a player scrolls in more steps; the size is the maker's
to tune.

### D8. The entry of a discovery is the band's text at the discovery

One pure function of the view gives the text of the band of a discovery for a game state, the
text the band shows without its buttons; the band and the chronicle both use it. The chronicle
calls it on the state returned with the `discovered` event, so the entry holds what the band said
at that moment and does not follow a later rename of the group (D-312 makes only the band follow it
while it stands).

Cost if wrong: an entry written from `discoveryText` alone would lose „Gra dopisała regułę w grupie
„{nazwa grupy}”: Zawsze → Eksploruj.” (To do 2).

### D9. The right area: tabs, filters, list

- While no rule or group is open, the right area holds the two tabs „Kronika” and „Teren” —
  `ReactButton kind="tab"` in a container of class `tabs` (D-276) — and under them the content of
  the tab picked: the chronicle, or the table of revealed tiles as it is today. While one is open,
  the rule panel takes the whole area as today, and „✕” brings back the tab picked, since the pick
  lives in the chronicle memory, not in the area.
- The chronicle: a row of the seven filter buttons „Wszystko”, „Odkrycia”, „Czynności”, „Walka”,
  „Moje zmiany”, „Passa”, „Świat”, each a `ReactButton` with `selected`, as the pace buttons
  are, one picked at a time; under it the list, newest first, each row the minute alone in a column
  on the left in `text-label` and the entry's text in its role; the filter row and the list on
  `panel`, the list in Geist Mono at the size the token file gives the chronicle; „Nic tu jeszcze
  nie ma.” where the filter shows nothing. The filter buttons keep the shared button's font, as the
  pace buttons whose look they take.
- The picked tab and filter are clicks handled by the screen, which tells the chronicle memory; they
  are kept through leaving the screen and through „Restart”, and set to „Kronika” and „Wszystko” at a
  send (D2). The filter is read like the tab: "na starcie „Wszystko”" is the start of a map run by a
  send, as "na starcie przejścia wybrana jest „Kronika”" is.
- The link between a hovered tile and its row of the table stands only while „Teren” is picked
  (task, question 6, its cost).
- The world area no longer shows the paragraph; the rest of it stays as it is.

### D10. Units and their interfaces

Simulation (`src/browser/sim/`):

- `run.ts` — `GameEvent` with the two new kinds (D1); `minuteBeforePick` emits them. Depends on
  `body.ts` for the cause and on `world.ts` for the campfires.
- `body.ts` — gives the cause of a minute's loss of health from the one definition of chill and
  starvation (D1); `bodyMinute` keeps its meaning.
- `world.ts` — where the maker puts the finding of a campfire going out, `worldMinute` keeps its
  meaning.
- `programs.ts` and `game.ts` — the two callers of `withCopyProgram`, `discardCopyChanges` and
  `setProgram`, and `switchProgram`, return the loss of the streak as D1 gives.

View (`src/browser/view/`):

- the chronicle memory (a new `.ts` module, no React): created from a game state; records a result
  with the state before it and, for an act on the copy, the act's description; is told the tab and
  the filter picked; gives the screen what it draws — the newest entries of a filter in a window,
  the place of the paragraph, the tab, the filter and the number of D2. Depends on the simulation's
  types and events, on the text functions below, on nothing of React and of the DOM.
- the composing of entries (pure, in that module or beside it): from an event or an act to the
  entry's kind, minute, text and role, as D3 and D4 give, and the comparison of two copies with the
  hint of a move (D4). Depends on `program-editor.ts` (`ruleNumber`, `groupNumber`, `ruleSentence`,
  `actionSentence`), `now-lines.ts` (the shared words) and the band's text function (D8).
- the band's text function (D8), in a `.ts` module, used by `discovery-band.tsx` and the chronicle.
- the right area's content (a new `.tsx` component): the tabs, and under „Kronika” the filter row and
  the list, under „Teren” the existing `TileTable`; reads the chronicle memory and the state drawn,
  composes the paragraph from `lastCombat` with `combatText`.
- `run-screen.tsx` — `createRunScreen` takes the chronicle memory; the right area holds the new
  content where it held the table.
- `world-area.tsx` — the paragraph removed.
- `game-view.ts` — creates the chronicle memory, records in `store.apply`, gives the act's
  description at the five acts on the copy, passes the memory to `createRunScreen`.
- `program-panel.tsx`, `rule-list.tsx` — the edit carries the optional hint of a move from the three
  move sites to `editCopy`.
- `now-lines.ts` — the wait's words and the causes of death readable by the chronicle.

The game state, `src/browser/sim/types.ts` beyond the event type, and `src/browser/sim/saved-game.ts`
do not change.

### D11. Tests the design makes necessary, by kind

Unit tests of the simulation (`tests/sim/`):

- the loss of the streak from the body: one event, with the streak before and the cause, for cold,
  for hunger, for both, also in the minute of a death of cold or hunger; none while the streak
  stands at zero, none in a minute of an encounter;
- the loss of the streak from an edit of the copy, a discard and a switch: one event where the
  streak was above zero; none for a trip-plan-only edit, a save, an edit of a saved program, an edit
  or a discard after the end, or a streak at zero;
- a campfire going out: one event at the minute its burning ends, in a living minute and in a
  minute of an encounter; none for an unlit crafted campfire, none in the minute of a death; one per
  campfire;
- the version of the save stays 3 and a saved document holds nothing new (the existing tests of
  `tests/sim/saved-game.test.mjs` hold it; the change adds no field to cover).

Existing tests that compare the whole list of a minute's events, or the events of `setProgram`,
`discardCopyChanges` or `switchProgram`, change where they now meet a loss or a campfire going out;
the source of each change is this task (`guidelines/testing.md`, "Changing an existing test").

Unit tests of the view (`tests/view/`, React screens on `page-document.mjs`):

- recording: each event kind to its entry, kind, role and text as the task words it; the wait given
  once at its start; a reset at a send, a reset keeping the tab and filter at „Restart”, the
  clearing at „Zakończ”; the act's entries before the loss it caused; no entry for an edit of a
  saved program or for the first chill's rule; built from a loaded state with and without
  `lastCombat`;
- the comparison of copies: each change of D4 with its numbers at the moment of the change, a
  swap described by its hint, a move across groups, a group removed with its rules, a trip plan, an
  edit that changes nothing;
- the discovery's entry equal to the band's text, the sentence of the rule included;
- the right area: the two tabs with „Kronika” picked first, the rule panel taking the area and „✕”
  bringing the picked tab back, the filters with „Wszystko” first and one picked at a time, newest
  first, the minute column, the roles, „Nic tu jeszcze nie ma.” for an empty chronicle and an empty
  filter, the window bounded and grown by a scroll, the paragraph at its place and growing when the
  turns are resolved;
- the game view: the chronicle and the picked tab still there after Przejście → Siedziba → Przejście
  and after „Restart”, „Kronika” and „Wszystko” after „Zakończ” and a new send;
- the world area: no paragraph (an existing expectation of `tests/view/world-area.test.mjs` changes,
  its source To do 6).

Checks no test replaces: the real browser at 1× and 16× with screenshots (task, question 10), and the
manual check D-75 and D-88 leave to the person after the merge.

## Foundation entries

Written by the foundation step or the return step, worded there:

- decision (new), "What does the chronicle of a map run hold?" — the approved sentence in full
  (*Decisions in play*), with what the accepted *Settlements to record* rows 2, 3, 4, 7, 8, 9 and 10
  add: the words and kinds of the entries, the sixth kind „Świat”, the filters, order, minute column
  and colours; the foundation step decides whether those rows stand in this entry or in entries of
  their own.
- decision, *Settlements to record* row 1 — the chronicle lives in the memory of the page, not in
  the save; after a load only the paragraph of the last encounter stands.
- decision, *Settlements to record* row 14 — the pick of „Kronika” or „Teren” is kept through the
  map run, leaving the screen and „Restart” included.
- decision D-04 (change) — "for the scene and the chronicle, its previous reading of the game state
  and the events the simulation returned".
- decision (new), "How does an agent learn what went wrong in the running game?" — in full as the
  task quotes it; this task makes true the chronicle an agent reads as a player does.
- glossary term `chronicle` (new) — the record a manual map run keeps for the player to read, each
  entry with its game minute; not the events a function of the simulation returns.
- decision D-122 (part) — what the band named enters the chronicle.
- decision D-147 (transitional wording given by the task) — the paragraph as an entry of the
  chronicle in the minute of the attack, standing through a load too.
- decision D-311 (transitional wording given by the task) — the right area's chronicle and table
  under the tabs „Kronika” and „Teren”, „Kronika” picked at a send; the world without the paragraph.
  Its *Verification* examples that name the paragraph under „Teraz” and „Potem” and the table always
  in the right area go with it.
- to check, not required by the task: D-185 says its line stands "under the scene and the
  last-encounter paragraph when present" (`foundations/decisions.md:3372`); the paragraph is never
  present in the world area after this change, so the foundation step decides whether that clause
  stays as it is or loses the paragraph. D-276 says "The switch of the login card stands as tabs";
  the tabs of the right area are a second place, which the styleguide step records. Each of the
  following says something the change makes untrue, and the foundation step decides its wording:
  - D-122, *Rationale* (`foundations/decisions.md:2250-2252`): "Accepted with it: … a player who
    goes on at once loses the list of discoveries, since the game keeps no record of them" — the
    chronicle keeps that record from this change on (To do 2). The sentence beside it, "the screen
    after a completion can keep both the band and the encounter's paragraph" (`:2252-2253`), stays
    true, the paragraph standing in the chronicle.
  - D-272, *Verification*, a "complies" example (`:5710-5712`): "the scene at the top of the world
    area of the screen of a map run with no text on it or over it, the paragraph of the last
    encounter on the solid background under it" — no paragraph stands under the scene after To do 6.
  - D-311, *Rationale* (`:6719-6724`): "„Teraz” and „Potem” stand right under the scene, so they do
    not move as the paragraph of the last encounter grows with each turn" and "Accepted with it: …
    the paragraph of the last encounter two rows further from the scene"; and D-311, *Rejected*
    (`:6732-6733`): "„Teraz” and „Potem” under the paragraph of the last encounter and the line of
    the end of the map run — they move down at each attack as the paragraph grows" — the paragraph
    no longer stands in the world area, so the reason given no longer holds as written. These go
    with the transitional wording of D-311 the task gives.
- candidate for the return step, not required by the task: whether the two new events of the
  simulation (D1) bind later work enough for an entry — task 16's "ostatnie minuty" may read them.

Guideline changes, not foundation entries: the styleguide (To do 11, through
`the-way-maintain-styleguide`) — the chronicle's roles, Geist Mono, the tabs of the right area, the
filter row in the look of the pace buttons, „Nic tu jeszcze nie ma.” in `text-secondary`; the
coding guidelines' tables (To do 12, through `the-way-maintain-coding-guidelines`) — the new files
of D10.

## Left to the maker

- The names of the new modules, types, functions and the two event kinds; whether the composing of
  entries and the comparison of copies share the chronicle memory's module or stand beside it.
- How `withCopyProgram` hands the loss to its callers, and where the finding of a campfire going out
  sits, `worldMinute` or `minuteBeforePick`, within D1.
- How the act's description reaches `store.apply` — a second argument of the store's `apply` or of
  `act`, or a call of the memory beside it — provided it is recorded from the state before the
  result and before the screens draw.
- How the screen reads the memory (an external store read with `useSyncExternalStore`, as
  `RuleOpen` is read, or a value handed with `update`) and how the rows are kept from drawing again.
- The algorithm finding a moved rule or group when no hint is given, within D4's outcome.
- The size of the list's window and the distance from its end at which it grows.
- The layout of the right area — spacing, where the tabs' line runs, the width of the minute column —
  from the existing tokens.
- The order of slices, if the plan cuts the change: the two events of the simulation can come first
  and stand alone.
