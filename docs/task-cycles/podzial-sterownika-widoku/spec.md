# Spec — Podział sterownika widoku na magazyn stanu, rejestr ekranów i stan ekranu przejścia, w kształcie rozstrzygniętym w rozmowie

- Task: `.runs/task-cycles/podzial-sterownika-widoku/task-frozen.md`
- Open choice: „Granice trzech modułów i podział akcji dziś zebranych w `panelControls`, `mapsControls` i fabrykach ekranów między magazyn, rejestr i stan ekranu przejścia — wybór cyklu; karta D4 zakłada, że cykl napisze do tego specyfikację.” (the task's *Questions carried to cycle*)

## Intent

`createGameView` in `src/browser/view/game-view.ts` holds at once the game state, five screens with two
rules of life, the question „Zapisać, odrzucić, wrócić?”, the end-of-run window, the keyboard focus and
the moments of saving, so a new screen — next the screen Wiedza — means lines in seven shared places
of that one function, and every time-dependent act repeats `clock.flush()` by hand. This change
splits that function into a store of the game state, a state of the screen Przejście and a registry of
screens, each outside React, with every act moved to the entry of the screen that offers it, and
leaves `createGameView` as the composition of them behind the same boundary. The player sees nothing
change, and every existing test passes with its file unchanged.

## Goals and non-goals

Goals:

- One store of the game state outside React that takes every result of the simulation and is the one
  place where a time-dependent act catches up time before it runs (task *To do* 1).
- One module outside React for the state of the screen Przejście — the question, the end-of-run
  window, the window's wait for the scene's effect and the focus owed to a window opened before the
  game stands in the page — with the opening and closing rules of D-173, D-311, D-322, D-324, D-368
  and D-371 as they are (*To do* 3).
- One registry of screens, a table in plain TypeScript with one entry per screen, through which the
  showing of a screen, the drawing after a result and after a reading of the clock, the choice of the
  element that gets the focus and the clean-up pass, with no branch written for one screen (*To do* 2).
- `createGameView` as their composition, with the same `GameViewOptions` and `GameView`, so
  `src/browser/view/app.ts` does not change (*To do* 4).
- `guidelines/coding-browser-module.md` following the change (*To do* 5).
- After the change, adding a screen touches: its screen module, its entry file, one line of the
  registry's table in `game-view.ts` (with the entry's import), its address in
  `src/browser/view/screen-address.ts` and its position on the menu bar — none a shared function of the
  game view besides the table line (acceptance criterion 1).

Non-goals:

- No change the player sees: no wording, layout, timing, save, focus or order of the history.
- No change of any existing test file, of any screen factory's input (`update(props)`, and
  `setQuestion`, `setWindow` of the screen Przejście), of `startClock`, `createGameSaver`,
  `createChronicle` or `createFolding`.
- No single React root, no portal, no context; the commanding methods of the screen Przejście stay
  (task *Questions to settle* 1 a, 2 a).
- Not touched: `startApp` in `app.ts`, the menu bar, the account card, the `switch` statements of
  `screen-address.ts`, the trial of one tree on Programy (card D12), the screen Wiedza (task *Out of
  scope*); the hand-moved panels in `run-screen.tsx` and `rule-list.tsx` stay (task *Context*).
- No new dependency, no new decision beyond the task's three settlements.

## Constraints

From the task: *Questions to settle* 1 a and 2 a, the three rows of *Settlements to record*, *To do*
1–5, the acceptance criteria and *Out of scope*, which this spec does not reopen.

From the foundation: D-03 (React, `.tsx` screens; separate roots allowed), D-04 (the view changes the
game state only through functions of the simulation, draws from the state, the clock's moment, its
previous reading and the events), D-36 and D-265 (exemplar and DOM-building modules marked
`do not copy`), D-207 (moments of saving), D-208, D-211, D-212, D-247 (catch-up as the last step of
building), D-173, D-311, D-322, D-324, D-368, D-370, D-371 (question and window), D-280, D-281, D-283,
D-284 (screens, addresses, leaving and returning to a map run), D-287, D-295 and D-339 (page memories
shared by screens), D-323 (after `halt()` no result is taken), D-329 (the focus of the screen Mapy after
its acts), D-346 and D-383 (tab and filter held by the chronicle), D-351 (imports within the part map),
D-401 and D-402 (pull and reset on Programy), D-264 and D-268 (tests on jsdom through
`tests/view/page-document.mjs`, `assert` taken from it), D-267 (hooks and effects; nothing here adds
any).

From the code on the base `9e13af95`, reconciled with the task's numbers from `2b4d760c`:

| Task names (at `2b4d760c`) | On the base | Difference of shape |
|---|---|---|
| `createGameView` `:220-1028` | `:283-1300` | Grown by „Odbierz” (`takePractice`), the pull of the previous save and the reset of the game on Programy |
| taking a result `:361` (`programsPanel.update` inside `take`) | `take` `:397-429`, that line `:424` | unchanged |
| reading the clock `:377-381` | `startClock` callback `:439-445` | unchanged |
| showing a screen `:882-890` | inside `show` `:1122-1159`, the part `:1141-1149` | `show` also asks or leaves the previous save (`:1152-1156`) |
| `screenHolder` `:910-924` | `:1174-1188` | unchanged |
| `renderScreens` `:932-941` | `:1196-1205` | unchanged |
| `shownElement` `:944-956` | `:1208-1220` | unchanged |
| `dispose` `:1018-1023` | `:1284-1298` | unchanged items |
| new character `:451-453` | `create` `:514-516` | unchanged |
| purchase of a branch `:675-677` | `onBuy` `:742-744` | unchanged |
| — | `GameViewOptions.previousSaveAllowed`, `onReset`, `client.loadPreviousSavedGame`; `GameView.setReset` | new since `2b4d760c`; the boundary to keep is the base's |
| four test files through `createGameView` | five: `account-screen`, `chronicle-game`, `end-question`, `end-window-game` and `previous-save` (`tests/view/`) | `previous-save.test.mjs` came with the pull and the reset |
| eleven test files call factories directly | twelve call a screen factory, the clock, the saver, the chronicle or the folding directly: `character-screen`, `chronicle`, `clock`, `game-saver`, `headquarters-screen`, `maps-screen`, `program-list`, `program-panel`, `rule-signs`, `run-screen`, `scene`, `tabs-area` | every one stays unchanged whatever the count |

The five test files through `createGameView` import from the view only `createGameView` (and
`app.js`, `account-card.js`, `account-rules.js`, `email-confirmation.js`, `end-question.js`,
`previous-save-lines.js`, none changed here); they observe the page, the address stand-in, the save
requests, `keep()`, Node's mocked `setInterval` and `setTimeout`, a hand-moved `performance.now` and a
fixed `Date.now`. So the change keeps: the order in which the clock's and the saver's intervals are
registered (clock first), every moment at which the clock is read, the number and moments of save
requests, the order of the history's entries, the moment the page is told its place, the DOM order of
the screens and their classes, and every moment a run-screen method is called relative to the draws.

The parallel task „drobne porządki kodu przed zadaniem 9 MVP2” renames `right-area` in `run-screen.tsx`
and moves the view tests' helpers into one file; this change edits neither, and its new test files
copy no helper of an existing test file, so the two meet only at merge.

## Decisions

### 1. Units, files and who may import whom

The change adds nine files under `src/browser/view/` and three test files under `tests/view/`; none is
`.tsx` and none renders React.

| File | Unit | Status in the guideline's table |
|---|---|---|
| `state-store.ts` | the store of the game state (decision 2) | copy |
| `run-screen-state.ts` | the state of the screen Przejście (decision 3) | copy |
| `screen-registry.ts` | the registry of screens (decision 4) | copy |
| `program-panel-acts.ts` | the acts of the two program panels, shared by Programy and Przejście (decision 5) | copy |
| `headquarters-entry.ts` | the entry of Siedziba | do not copy |
| `programs-entry.ts` | the entry of Programy | do not copy |
| `run-entry.ts` | the entry of Przejście | copy |
| `character-entry.ts` | the entry of Postać | copy |
| `maps-entry.ts` | the entry of Mapy | copy |

The entries of Siedziba and Programy build their `section` holder through `document.createElement`, as
today's `headquartersScreen` and `programsScreen` do, so by D-265 they are `do not copy`; a new screen
copies `character-entry.ts` (or `maps-entry.ts`), which build nothing through the DOM API.
`game-view.ts` keeps its row `do not copy` (it builds the game's `div`).

Imports, each a rule the review checks:

- `state-store.ts` imports the simulation, `clock.ts`, `game-saver.ts`, the types of `account-api.ts`
  and of `chronicle-entries.ts`; it imports no registry, no screen state, no entry and no `.tsx`.
- `run-screen-state.ts` imports the simulation, `endEffectBegins` of `scene-picture.ts` and types of
  `state-store.ts`; nothing of React, the DOM, the registry or an entry.
- `screen-registry.ts` imports `screen-address.ts`, the type `PageAddress` and types of the
  simulation; no entry, no screen, no store beyond a type.
- `program-panel-acts.ts` imports the simulation's program functions and types of `state-store.ts`
  and `program-panel.tsx`.
- An entry imports the simulation's functions and types, types of the store and of the registry, and
  besides them only what this list names for it — a closed list, which a later change widens only by
  naming the import in its own spec or review:
  - Siedziba: `headquarters.tsx` (its factory and types);
  - Programy: `program-list.tsx` (its factory, `PullView`, `ResetView`), `program-panel.tsx` (its
    factory, `Folding`, `ProgramPanelControls`), `previous-save-lines.ts` (the lines of the pull and
    `pullResultLine`), the types of `../account-api.ts` (`AccountClient`, `AccountResult`,
    `PreviousSavedGame`) and `screen-address.ts` (the nearest screen after a deletion and the
    comparison of screens);
  - Przejście: `run-screen.tsx` (its factory and `RunScreenControls`), `program-panel.tsx` (its
    factory, `Folding`, `ProgramPanelControls`), the type `Chronicle` of `chronicle.ts` and the types
    of `run-screen-state.ts`;
  - Postać: `character-screen.tsx` (its factory and types);
  - Mapy: `maps-screen.tsx` (its factory and types).
  No entry imports another entry, `game-view.ts`, or more than types of the store, the registry or the
  screen state.
- `game-view.ts` is the only file that imports the entries, the store, the screen state and the
  registry together.

Rejected: (b) the entries written inside `game-view.ts` — the table line stays the only shared change,
but `createGameView` keeps about 900 lines of acts, and a new screen's entry is written inside the
shared function the task wants to stop growing; (c) each entry exported from its screen's `.tsx` module
— the React module then imports the store and the simulation's acts, and the screen's factory, which
the screens' own test files load, carries the game view's wiring. Cost if wrong: entry files are moved or merged
without touching their content; low.

### 2. The store of the game state — `state-store.ts`

`createStateStore(options): StateStore`.

`StateStoreOptions`: `state`, `revision`, `afterConflict` (optional), `client`
(`Pick<AccountClient, "saveGame">`), `onConflict`, `onOutdated`, `onSignedOut` — the same values
`createGameView` passes to the saver today — and two callbacks the store calls: `onTaken(taken)` after
each result that replaced the state, and `onReading()` after each reading of the clock.

`Taken`: the `result`, the state `before` it, the `copyAct` an act on the copy gave (D-342), and
`endedRun`, whether this result ended a manual map run that had not ended before.

`StateStore`:

- `get()` — the one current game state.
- `moment()` — the real moment of the clock's latest reading (`clock.moment()`).
- `halted()` — whether `halt()` was called.
- `act(body)` — an act of the player that depends on time: the clock makes one reading (which may
  itself take a result and call `onReading`), then `body` runs with a `take` function; each `take` of a
  result is an act of the player — taken as below, and a moment of saving when it replaced the state.
- `actWithoutCatchUp(body)` — the same with no reading first, for the two acts the task names: a new
  character (Siedziba's `create`) and the purchase of a branch rank (Postać's `onBuy`).
- `send(ids)` and `startLoop(ids)` — the clock's own acts (`clock.send`, `clock.startLoop`), which
  read the clock and pass the reading's moment to the simulation; a moment of saving when the state
  after the call differs from the state before it, the state before being taken before the clock's
  reading, as today (`:478-480`, `:493-495`).
- `catchUp()` — the catch-up after a load (`clock.catchUp`), the last step of building (D-247).
- `keep()` — reads the clock and returns the `KeptGame` of today (`:1265-1271`).
- `saveNow()`, `saveBeforeLogout()`, `saveLine` — the saver's `moment`, `saveBeforeLogout` and
  `element`.
- `halt()` — from now on every result is refused and the clock is disposed (D-323).
- `dispose()` — disposes the clock and the saver.

Taking a result (today's `take`, `:397-429`) is the one place every result passes — a reading, a
catch-up, a send and every act: a result after `halt()` or one whose state is the one held is ignored;
otherwise the store computes `endedRun` and whether a loop's map run ended, replaces the state, calls
`onTaken`, and then makes one moment of saving where `endedRun` or a loop's map run ended (D-207). The
store gives the clock its `GameStore` (`get`, `apply` as take) and the saver its `read` (a reading,
then the state), `moment` and `runPasses` (a manual map run present, not ended, not paused), creating
the clock before the saver as today.

An act may run inside another, as today, where a draw takes the focus from an editor field whose blur
commits its text through an act; each act still makes its own reading. A change of screen that follows
an act is made after the act's body returns (decision 5), so the leaving of Przejście, whose pause is
an act, never runs inside another body.

Which acts read the clock first: every act today preceded by `clock.flush()` goes through `act`; the
pull of the previous save (`answerPull`, `:1066-1069`) and „Odbierz” (`takePractice`, `:525-528`), both
added since `2b4d760c`, are among them; the reset of the game (D-402) takes no result and goes through
no act of the store, as today; a new character and a purchase go through `actWithoutCatchUp`; „Wejdź”
and „Puść w pętlę” through `send` and `startLoop`.

Rejected: (b) a store that names every act (`store.editCopy`, `store.createCharacter`, …) — each new
act of a new screen edits the store, a shared place again; (c) a thin store without the clock and the
saver, the composition wiring them — the clock needs the store and the act needs the clock, so the
catch-up would stay a pair of calls outside the store, which *To do* 1 removes; (d) one `act` with a
flag for the two acts without catch-up — a flag is easy to leave at its default, a second name is not.
Cost if wrong: the store's interface is used by the entries only; moving `send`/`startLoop` into
`act` later changes five call sites.

### 3. The state of the screen Przejście — `run-screen-state.ts`

`createRunScreenState(options): RunScreenState`, options: `game` (`Pick<StateStore, "get" |
"halted">`) and `reducedMotion()` (the composition gives today's `prefersReducedMotion`, `:195-200`).
It holds the memories now at `:295-318` — the question (`resume`, `opens`), whether the window is
open (initially whether the state's map run has ended, as `:306`), the window's wait for the effect,
the focus owed — and whether the player is on the screen of the map run, which the entry of Przejście
tells it. It calls no screen, no store act and no registry.

`RunScreenState`:

- `question()` — the question standing, or null.
- `windowShown()` — window open, no wait for the effect, the player on the screen, no question, and the
  state's map run ended (today's `windowShown`, `:553-562`).
- `taken(taken)` — a result: where it ended the manual map run the window opens and waits for the
  effect where the player is on the screen, `endEffectBegins` holds for its events and `reducedMotion()`
  is false; otherwise, with no ended map run, the wait ends; the question goes where the copy no longer
  holds unsaved changes (`:409-423`).
- `entered()` — the player comes onto the screen: the window opens where the map run has ended
  (`:1129-1136`, D-368, D-371).
- `left()` — the player leaves it: the question closes unless the game is halted, the wait ends, the
  player is off the screen (`:1124-1128` without the pause, which the entry makes).
- `ask(opens)` — „Zakończ” or „Otwarte: {mapa} →” with unsaved changes: where the game is not halted
  and no question stands, the question stands with `resume` (the map run goes on and is not paused) and
  `opens`, the window closes and the wait ends; returns the question asked or null (`:613-621`).
- `closeQuestion()` — closes a standing question unless halted; returns whether it closed one.
- `forgetQuestion()` — the map run ends: the question goes with no check of halt (`endRun`, `:590`).
- `openWindow()` — „Koniec przejścia” (`:662-668`): nothing after halt or without an ended map run;
  otherwise it closes a standing question as `closeQuestion()` does, opens the window and ends the
  wait, and returns whether it closed a question, so that the entry tells the screen (D-324: it
  closes the question as „Wróć” does).
- `closeWindow()`, `effectEnded()` — today's two controls (`:670-682`) without their call of the
  screen, each nothing after halt.

Guarded by halt are exactly `ask`, `closeQuestion`, `openWindow`, `closeWindow` and `effectEnded`, as
today (`:547`, `:613`, `:663`, `:671`, `:679`). `taken` is never reached after halt (the store refuses
the result), and `forgetQuestion`, `entered`, `left` and `built` work after halt as today — `left`
leaving a standing question in place after halt, as `closeQuestion` does, while it ends the wait and
the place: navigation
goes on after `halt()` (`:1124-1136` check no halt), so a player who leaves the screen of an ended map
run and comes back gets the window again (D-368, D-371), and the state knows the player left.
- `built()` and the owed focus — after the first show of a built game the focus is owed where the
  window shows; the first reading after the game stands in the page settles it once (`:569-576`,
  `:1256`).

Rejected: (b) the module also making the acts of the screen („Zakończ”, „Zapisz”, „Wróć”, „Restart”)
— it would need the store's acts, the registry's navigation and the screen's focus calls, so its tests
need the whole view and the rules of D-173 and D-324 sit between side effects; (c) the module calling
`setQuestion` and `setWindow` itself — the state would hold the screen it serves and could not be
tested without it. Cost if wrong: the acts can move into this module later without changing the rules.

### 4. The registry of screens — `screen-registry.ts`

`createScreenRegistry(options): ScreenRegistry`, options: `element` (the game's element), `entries`
(the table, an ordered list), `first` (the first screen, which the composition picks), `address`
(`Pick<PageAddress, "go" | "replace">`), `state()` (the store's `get`) and `onPlace(place)` (the
page's `onScreen`). It throws where a kind of `Screen` is held by no entry or by two — a fault of code,
caught by its test.

`ScreenEntry`: `kinds` (the kinds of `Screen` it holds — Programy `programs` and `program`, Mapy `maps`
and `map`), `lives` (`always` or `while-shown`) and `build`. An `always` entry is built once at the
registry's creation; a `while-shown` entry has `key(screen)` and is built at each entering with the
screen entered, built anew where the key of the next screen differs (Postać: the character's number;
Mapy: one key for both addresses), and disposed when the player leaves it. `build` receives a
`ScreenPort` — the registry's `current`, `show`, `focusShown` and `focusIfLost` — so entries navigate
without importing the registry.

`ScreenInstance`, what a build returns: `element` (placed by the registry: an `always` instance's
element appended at creation in table order, a `while-shown` one appended at its build), the hooks
`commit()` (optional), `leave()` (optional), `placed(screen)` (optional), `drawResult(events)`,
`drawReading(shown)` and `dispose()`.

`ScreenRegistry`:

- `start()` — every living instance draws from the state with no events and the page is told its
  place, then `show(first, "replace")` (today `:1253-1255`).
- `show(next, how)` — in this order, which is today's (`:1122-1159`): where the screen's address
  changes, `commit()` of every living instance; where `next` belongs to another entry than the current
  screen, `leave()` of the current instance; the address gets `next` (`go`, `replace` or none); the
  current screen becomes `next`; the `while-shown` instances are built, built anew or disposed in table
  order; every `always` instance's element is hidden unless its entry holds `next`; `placed(next)` of
  every living instance in table order; the page is told its place.
- `drawResult(events)` — `drawResult` of every living instance in table order, then the page is told
  its place (today's `renderScreens`).
- `drawReading()` — `drawReading(shown)` of every living instance in table order, `shown` true for the
  instance holding the current screen (today's clock callback).
- `focusShown()` — focus to the element of the instance holding the current screen; `focusIfLost()` —
  the same only where the focus stands on the body, nowhere, or on a game element outside that element
  (today's `focusShownScreen`). The instance's element is the element that gets the focus for every
  screen, as today's `shownElement` and the screens' `focus()` give.
- `current()` and `dispose()` — `dispose` disposes every living instance and stops telling the page.

The page is told its place (`ScreenPlace`: the screen and, off Przejście, `returnToRunEntry` of the
state) only when it changed, as `tellPlace` (`:1103-1112`). `ScreenPlace` moves to this file and
`game-view.ts` re-exports it.

The table, in `game-view.ts`, holds in this order Siedziba, Programy, Przejście, Postać, Mapy: the DOM
order of today's holders, and the order in which today's `show` opens and closes Postać before Mapy.
Draws of different screens are of separate roots, so the order between screens within one draw is not
observable; the order inside one screen is the entry's and stays as today.

Rejected: (b) one hook `draw(cause)` for results and readings — each entry would branch on the cause,
and the two moments differ for three screens (Siedziba draws on a reading only while shown, Programy
and Przejście draw nothing on a reading); (c) the table as a map keyed by `Screen["kind"]`, so that the
compiler checks completeness — two kinds per entry for Programy and Mapy need the entry twice and the
order elsewhere; the runtime check with a test catches the same fault at the first build; (d) the
address listener and the first screen in the registry — both are of the page (emailed-link fragments,
D-96 entries), so they stay in the composition. Cost if wrong: a hook added later to `ScreenInstance`
is optional and touches only the entries that need it.

### 5. The five entries and where each act goes

What each entry holds (`always` entries are built at creation and hidden while another shows):

| Entry | Lives | Built from | `drawResult(events)` | `drawReading(shown)` | `placed(screen)` | `leave` / `commit` | `dispose` |
|---|---|---|---|---|---|---|---|
| Siedziba | always | `createHeadquarters` in `section.screen.headquarters-screen`, `tabIndex -1` | `update({state, nowMs})` | the same, only while shown | — | — | `dispose()` of the screen |
| Programy | always | `createProgramList` and `createProgramPanel(acts, "programs", folding)`, each with `screen-area`, in `section.screen.programs-screen`, `tabIndex -1` | panel `update(state, events)`, then the list and the panel's program for the current screen (today's `drawPrograms`) | — | entering asks for the previous save, leaving drops it and closes the reset's confirmation; then `drawPrograms` (`:1152-1157`) | `commit`: blur of a focused field inside its section (`:1165-1169`) | list and panel `dispose()`, answers ignored after it |
| Przejście | always | `createProgramPanel(acts, "run", folding)` and `createRunScreen(panel, controls, chronicle)` | `setQuestion`, the window's sync, then `update(state, state.run, events)` where the state holds a map run (`:1198-1200`) | the owed focus of the window (`:569-576`) | entering tells the screen state `entered()`; on every show the window's sync (`:1129-1136`, `:1151`) | `leave`: close the question (with `setQuestion(false)`), pause a map run that goes on through `act`, `left()` (`:1124-1128`, `:1096-1100`) | the run panel's `dispose()` (the run screen's root is left as today) |
| Postać | while-shown, key the character's number | `createCharacterScreen({onBuy, onStop, props})` | `update(props)` | `update(props)` | — | — | `dispose()` |
| Mapy | while-shown, one key | `createMapsScreen({controls, props})` | `update(props)` unless one of its acts runs | the same | a changed map updates the screen (`:797-803`) | — | `dispose()` |

The entry of Mapy keeps today's guard (`mapsActing`, `mapsAct`, `drawMapsScreen`, `:771-794`) as its
own: while one of its acts runs it draws nothing, and it draws once after the act, so the focus its
click is owed moves on the draw that holds the change (D-329). The entry of Programy owns the pull's and
the reset's memories (`pull`, `pullAsk`, `onProgramsScreen`, `resetState`, `drawnPrograms`,
`:838-1071`) and exposes `setReset`, which `GameView.setReset` calls; it receives `client`,
`previousSaveAllowed`, `onReset` and `onSignedOut` from the composition.

Where each act goes (each „through `act`” reads the clock once first, inside the store):

| Today | Act | Goes to | Through |
|---|---|---|---|
| `panelControls` | `editCopy` (with a map run), `editProgram`, `createProgram`, `renameProgram`, `deleteProgram`, `saveCopy`, `saveCopyAsNew`, `discardCopy`, `switchProgram` | `program-panel-acts.ts`, `createProgramPanelActs(store)`, one object the composition makes and gives to Programy and Przejście | `act`, with the copy act for the chronicle as today |
| `mapsControls` | `pick`, `stop` | Mapy | `act` inside the entry's guard |
| `mapsControls` | `enter` | Mapy | nothing where a map run stands; `send`, then, where a map run started, `show(run, "go")` and `focusShown()`, inside the guard |
| `mapsControls` | `startLoop` | Mapy | `startLoop` inside the guard |
| Siedziba | `create` | Siedziba | `actWithoutCatchUp` |
| Siedziba | `stop`, `closeReport`, `takePractice` („Odbierz”) | Siedziba | `act` |
| Postać | `onBuy` | Postać | `actWithoutCatchUp` |
| Postać | `onStop` | Postać | `act` |
| run screen | `togglePause` | Przejście | `act`: close the question, then the pause |
| run screen | `setPace` | Przejście | `act` |
| run screen | `restart` | Przejście | `act`: whether the window shows, close the question, the restart; after it, from the window, the focus on „Restart” where not halted |
| run screen | `end`, `openMap` | Przejście | `act`: no map run — nothing; no unsaved changes — `forgetQuestion()` and the end; otherwise `ask(opens)`, the pause where it resumes, `setQuestion(true)`, the window's sync, `focusQuestion()`; after the body, wherever today's `endRun` took the end (`:583-599`, also where a halted store refused it), `show` of Postać or of the opened map with `go` and `focusShown()` |
| run screen | `saveAndEnd`, `discardAndEnd` | Przejście | nothing after halt or with no question; `act`: for `saveAndEnd` today's `:686-705` copied together with its guard at `:689` (no map run, or no unsaved changes after the reading — nothing, and no navigation), then the save and the end; for `discardAndEnd` the end (`:707-712`); then the same `show` and focus as `endRun` |
| run screen | `back` | Przejście | nothing after halt or with no question; close the question; where it resumes, `act`: unpause a paused map run that has not ended; then `focusIfLost()` |
| run screen | `openWindow` („Koniec przejścia”) | Przejście | the screen state's `openWindow()`; where it closed a question, `setQuestion(false)`; then the window's sync — the screen's calls in today's order (`:662-668`: `setQuestion(false)` through `closeQuestion`, then `setWindow`); no act |
| run screen | `closeWindow`, `effectEnded` | Przejście | the screen state, then the window's sync; no act |
| program list | `onCreate` | Programy | `act`; where the new program exists, `show(program, "go")` |
| program list | `onRename` | Programy | `act` |
| program list | `onDelete` | Programy | `act`; then the nearest screen with `replace` where the current one is gone, and `focusIfLost()` |
| program list | `onPull` | Programy | the fetch; the accepted programs through `act` |
| program list | `onResetAsk`, `onResetConfirm`, `onResetWithdraw` | Programy | the entry's reset memory and `onReset`; no act |
| `show` | leaving Przejście | Przejście's `leave` | `act`: the pause where the map run goes on |
| `GameView` | `saveNow`, `saveBeforeLogout`, `keep`, `halt`, `saveLine` | the store | — |
| `GameView` | `setReset` | Programy's `setReset` | — |

The entry of Przejście tells the run screen of each change of the screen state at the moment today's
code does: `setQuestion(false)` where `closeQuestion` or `openWindow` closed one, `setQuestion(true)` and `focusQuestion`
after an ask, the window's sync (`setWindow(windowShown())`) after each window change, and on every
result `setQuestion`, the sync and `update` in that order.

Rejected: (b) the program panel's acts written twice, in Programy and in Przejście — two copies of nine
acts; (c) a store-wide draw once at the end of every act in place of Mapy's guard — it would change the
moment every other screen draws to serve one screen's focus rule. Cost if wrong: an act moved between
entries changes no interface.

### 6. The composition — `createGameView`

`createGameView` keeps `GameViewOptions`, `GameView`, `GameEntry` and its exported names; `KeptGame`
moves to `state-store.ts` and `ScreenPlace` to `screen-registry.ts`, both re-exported from
`game-view.ts`, so `app.ts` imports what it imports today. It keeps `landing`, `prefersReducedMotion`,
the first screen (`firstScreen`, D-96, D-212, D-225, D-281) and the address listener with its reload for
an emailed link's fragment (D-352), which shows the screen with `none` or `replace` and calls
`focusIfLost()` (`:1241-1251`).

Its order of building: the game's element; the store, whose callbacks are `onTaken` — `taken()` of the
screen state, then `chronicle.record(result, before, copyAct)`, then the registry's `drawResult(events)`
— and `onReading` — the registry's `drawReading()`; the screen state; the chronicle and the folding,
made once (D-339, D-295); the program panel's acts; the five entries; the registry; the address
listener; `start()`; `built()` of the screen state; `catchUp()` of the store last (D-247). Nothing calls
the store's callbacks before the registry stands: no act and no reading happens before the clock's
first tick or the catch-up.

`dispose()`: nothing a second time; the address listener stops; the store disposes the clock and the
saver; the registry disposes the screens; the game's element and the save line leave the page — the
order of `:1284-1298`.

### 7. What replaces the seven shared places and the protocol of catching up

| Shared place (base) | Replaced by |
|---|---|
| taking a result, `take` `:397-429` | the store's take, the one place; per screen the instance's `drawResult` reached by the registry's loop |
| reading the clock, `:439-445` | the store's `onReading` to the registry's `drawReading`; per screen `drawReading(shown)` |
| showing a screen, `show` `:1122-1159` | the registry's `show`; per screen `commit`, `leave`, `placed` and the entry's life rule |
| `screenHolder` `:1174-1188` | the instance's `element`, hidden by the registry by the entry's `kinds` |
| `renderScreens` `:1196-1205` | the registry's `drawResult` |
| `shownElement` `:1208-1220` | the element of the instance holding the current screen |
| `dispose` `:1284-1298` | the registry's `dispose` over living instances, the instance's `dispose` |
| `clock.flush()` before each act | the store's `act`, the one place; `actWithoutCatchUp` names the two acts that do not catch up |

### 8. Where what the player sees stays

| Decision | Where it stays |
|---|---|
| D-207 moments of saving | the store: each `take` of an act that replaced the state; one moment for a result that ended a manual map run or loops' map runs; `send` and `startLoop` comparing with the state before the reading; the saver unchanged |
| D-208, D-211, D-97 | the saver unchanged, through the store |
| D-323 no result after `halt()` | the store refuses results and disposes the clock; the screen state's and Programy's guards read `halted()`; proven at game level by `tests/view/uncaught-failure.test.mjs`, unchanged |
| D-173, D-324 question | the screen state's `ask`, `closeQuestion`, `forgetQuestion`, `taken`, `left`; the acts in the entry of Przejście |
| D-311, D-322, D-368, D-370, D-371 window | the screen state's window, wait and owed focus; the entry's sync at today's moments |
| D-281, D-283, D-284 leaving and returning | Przejście's `leave` (close, pause through `act`); `entered()` opens the window and resumes nothing; the run screen gets the map run as a parameter |
| D-280, D-96, D-212 first screen and place | the composition's first screen; the registry's `show(first, "replace")` and place telling |
| D-295, D-339, D-346, D-383 page memories | folding and chronicle made once by the composition, given to the entries' factories; the chronicle records in `onTaken` |
| D-329 focus on Mapy after an act | the entry of Mapy's guard |
| D-217 lines at each reading | `drawReading`: Siedziba while shown, Postać, Mapy |
| D-247 catch-up last | the composition's last step |
| D-401, D-402 pull and reset | the entry of Programy |

### 9. Tests

Every existing test file passes unchanged; the five through `createGameView` are the proof that the
player sees nothing change, and the twelve that call a factory, the clock, the saver or the chronicle
directly prove their inputs did not change. The three new modules get a test file each, unit tests by
`guidelines/testing.md`:

- `tests/view/state-store.test.mjs` — on jsdom through `tests/view/page-document.mjs` (the saver builds
  its warning element and listens to `visibilitychange`), `assert` from it, Node's mocked timers and a
  hand-moved `performance.now` as the game-view tests do. Behaviours: `act` gives its body the state
  after a reading that passed the real time elapsed; `actWithoutCatchUp` reads no clock; an act that
  changes the state sends one save and one that changes nothing sends none; a result ending a manual
  map run, and one ending several loops' map runs, is one save; `send` after a reading that changed the
  state is a moment even where the send is refused; `onTaken` is called once per replacing result with
  the state before and the copy act, never for the state held; after `halt()` nothing is taken and
  `keep` reads no clock (`invariant: uncaught-failure-game-state`).
- `tests/view/run-screen-state.test.mjs` — no document, `node:assert`, states from the simulation.
  Behaviours: the window opens at the end and waits for the effect only on the screen with an effect
  and without reduced motion; `entered()` opens the window of an ended map run; the question closes the
  window, which stays closed after `closeQuestion`; `openWindow()` with a question standing closes it,
  opens the window and says it closed one; the question goes when the copy holds no unsaved changes;
  after halt `ask`, `closeQuestion`, `openWindow`, `closeWindow` and `effectEnded` change nothing,
  while `entered()` still opens the window of an ended map run, `left()` still ends the wait and the
  place (leaving a standing question) and `forgetQuestion()` still drops the question; the owed focus
  is owed once after `built()` with the window shown.
- `tests/view/screen-registry.test.mjs` — on jsdom through `tests/view/page-document.mjs`, entries
  written in the test as plain objects that record their calls, an address stand-in of its own.
  Behaviours: a kind held by no entry or by two throws; `always` elements appended in table order and
  hidden except the one shown; a `while-shown` entry built at entering and disposed at leaving, built
  anew where the key changes and kept (with `placed`) where it does not; `commit` before a change of
  address and not otherwise, `leave` before the address and the current screen change; `drawReading`
  passes `shown` to the shown instance alone; the place is told once per change and never after
  `dispose`; `focusIfLost` moves the focus only from the body or a hidden game element.

What the existing tests pin of halt and of the window with the question (searched on the base):

- After `halt()`: `tests/view/end-question.test.mjs`, „after halt() the question changes nothing…”
  (`:884-913`) pins „Zakończ”, „Wróć”, „Zapisz”, „Odrzuć” changing no state and no address on the
  screen of the map run; `tests/view/end-window-game.test.mjs`, „after halt() the window's buttons
  change nothing” (`:1145-1154`), pins „✕” leaving the window; `tests/view/uncaught-failure.test.mjs`
  — reaching the game through `startApp`, the game-level proof of D-323 (`invariant:
  uncaught-failure-game-state`) — pins the clock's reading, „Pauza”, a pace and the buttons of Mapy
  changing no state, starting no save and opening no map run (`:357-478`). No test moves between
  screens after `halt()`: the window's opening at a return to an ended map run, the end of the wait
  and the leaving after halt are pinned by none, so the change keeps today's code — `show`'s
  `:1124-1136` with no check of halt — through `entered()` and `left()` as decision 3 gives, and the
  new `run-screen-state.test.mjs` pins it at the module.
- The question and „Koniec przejścia”: `end-window-game.test.mjs`, „„Koniec przejścia” pressed while
  the question stands closes the question and opens the window…” (`:742-757`), pins that the question
  is not shown and the window is open; it would pass without `setQuestion(false)`, since the window
  hides the program area, and no test presses „✕” afterwards. So „Koniec przejścia” followed by „✕”
  with the question standing is pinned by none; the change keeps today's `openWindow` (`:662-668`,
  with `closeQuestion` `:546-550`) as decision 5's row gives, and the new `run-screen-state.test.mjs`
  pins the state's half; the screen's `setQuestion(false)` rests on review.
- `saveAndEnd`'s guard after the reading (`:689`) is pinned by no test; the builder copies `:686-705`
  together, as decision 5 gives.

The entries and `program-panel-acts.ts` get no file of their own: their code is moved from
`game-view.ts`, and the five unchanged test files through `createGameView` reach every act and hook of
them; the acts file only forwards to `act` (testing.md, „Not tested on purpose”). The checks of real
focus and events stay with a person in the browser (D-88).

### 10. The guideline `guidelines/coding-browser-module.md`

- „Ekran w Reactcie: Postać” says: the number of the character comes from the address through the
  registry; the screen lives while the player is on it because its entry in `character-entry.ts` is
  `while-shown`, keyed by the character's number; the registry draws it after every result and every
  reading of the clock, with the moment in `nowMs`; its two acts go to the store, the purchase through
  `actWithoutCatchUp` and the stop through `act`; a new screen copies this entry and adds one line to
  the registry's table.
- „Gra na stronie i odpowiedzi serwera” says: `createGameView` composes the store, the state of the
  screen Przejście and the registry; `saveLine`, `saveNow`, `saveBeforeLogout`, `keep` and `halt()` come
  from the store, which after `halt()` refuses every result and stops the clock; `dispose()` stops the
  store's clock and saver and the registry's screens.
- The table *Files of this kind* gets a row for each of the nine files with the status of decision 1
  and the decision `—`.

### 11. Order of work and division

The order that keeps every test passing at each step:

1. The store: `state-store.ts` and its test; `createGameView` takes its state, clock, saver, catch-up
   and acts from it, each `clock.flush()` pair becoming an act.
2. The state of Przejście: `run-screen-state.ts` and its test; the question, window, wait and owed
   focus leave `createGameView`.
3. The registry and the entries: `screen-registry.ts` and its test, the five entry files,
   `program-panel-acts.ts`; `createGameView` becomes the composition; the guideline.

Recommendation: three planned slices in that order, each ending with the full tests passing; the third
is the largest (about 900 lines move) but is one move, since a registry serving part of the screens
would need throwaway branches. One author can hold the whole change, at the cost of the review meeting
an ordering fault only at the end.

## Foundation entries

- Decision (settlement 1): the browser view stays with separate React roots, one per screen or bar
  („osobny korzeń Reacta”); the game state lives in a store outside React, the state of the screen
  Przejście in a module of its own outside React, memory shared by several screens in page memory given
  to the factories and read through `useSyncExternalStore`, and the state of one screen in its
  component; the question of one root comes back with the task that finishes moving the view to React.
- Decision (settlement 2): a new game screen is its module, one entry in the registry of screens, its
  address and its position on the menu bar, with no line in the shared functions of the game view.
- Decision (settlement 3): a player's act that depends on the passing of time goes through the store of
  the game state, which catches up time before the act; a new character and the purchase of a branch
  rank do not catch up.
- No invariant, glossary term or environment fact: the three settlements are checked by review, and
  „store”, „registry” and „entry” keep their ordinary meaning.
- No change of the part map: every new file stands under `src/browser/view/**` or `tests/view/**`,
  claimed by `browser-view`, and imports only what the part already depends on.

## Left to the maker

- The names of helper functions inside each file, the doc comments, and whether an entry file exports a
  factory of the entry or of an object that also carries `setReset`.
- The exact type of `act`'s body and of `take`, of `Taken` beyond the four fields named, and of the
  hooks' optional members, within the interfaces above.
- How the entry of Przejście groups its calls of `setQuestion`, `setWindow` and the focus, provided each
  call stands at the moment decision 5 names.
- The names, data and stand-ins of the new test cases, within decision 9 and `guidelines/testing.md`.
- The wording of the guideline's two examples, within decision 10.
- Whether the plan follows decision 11's slices; the orchestrator judges the route after the review.
