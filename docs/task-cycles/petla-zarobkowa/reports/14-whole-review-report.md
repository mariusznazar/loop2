PASS 34417defedef951d100217640111ba2e669cdadb

# Review of the whole change — task `petla-zarobkowa`

Range `4ed8fcd..34417de`, 33 files. `git rev-parse HEAD` in the worktree is the head given. No
blocking finding: 0 Critical, 0 Important, 9 Minor. Slices 2 to 6 had no review of their own and are
judged here. What stayed unchecked stands under *Checks*: the product's gate (by the handoff), a real
server and a real reload, and the bulk of the decision log (see *Limits of this review*).

## Critical

None.

## Important

None.

## Minor

None of these blocks. M-1, M-2 and M-3 are the findings of the Slice 1 review, graded again here.

### M-1. D-207 *Rejected* says "about 1440 saves a day" of a 30-second rhythm

`foundations/decisions.md:3725`. A save every 30 real seconds is 2880 a day; 1440 is one a minute. The
entry copies Q11 faithfully (`task.md:182`), so the source is off and the entry follows it. The way
stays rejected at either number and no code rests on it. A number of an answered question, so the
human's to change. Comes from the *Foundation entries* (`96d7b45`).

### M-2. `catch-up` says "while the game was closed", and D-230 runs it with a tab open

`foundations/glossary.md`, entry `catch-up`, against `foundations/decisions.md:4374-4377`. After a save
lost to another browser's the tab never closed. The definition is projected whole and row 25 is
accepted, so both stand. A later change of the definition can take it.

### M-3. `moment` means two things in one file

`src/browser/view/game-saver.ts:36` is the clock's reading; `:76` is a moment of saving, the sense the
glossary's `save time` keeps apart. The doc comments hold them apart, and the plan named the option.
No wrong behaviour.

### M-4. The case To do 14 and spec section 16 name, a second death covered in one catch-up, has no test

`tests/sim/catch-up.test.mjs:313-331`; `spec.md:419-422`; `task.md:66`. Slice 3 (`ca55922`), and the
plan's Slice 3 *Checks*, which dropped the case.

- The spec asks for "a program living past the renewal has the second death covered
  (`src/sim/sim.test.ts:1848`)", and the file's header cites `:1848`. The tests hold a first death
  covered and a second death not covered, because 243 minutes is short of the renewal. No test has a
  renewed resurrection cover a later death of the same catch-up.
- The behaviour is right. Scratch run with the renewal set to 200 minutes in the data for that process
  alone: an empty program in a catch-up of 1000 minutes reached run 5, four deaths, all covered,
  generation 1, readiness at minute 1172, and team and loops deep-equal to the open game passed in one
  call.
- Why Minor and not Important: the requirement is met and the code path is guarded from the side. A
  mutant counting the moment from the run's start instead of the save time fails the relation test
  „through a completion”, and a stale character fails „covered then uncovered”. What is missing is
  the named case. Adding it needs a program that lives past 480 minutes and then dies.

### M-5. A stop's generation is only tested on the first character of the team

`src/browser/sim/loop.ts:409`, Slice 3 (`ca55922`). Stryker survivor, a real gap: `generationOf` with
its `find` always true passes every test. On a team whose first character is of generation 1 that
mutant writes a generation the load refuses, so the whole save would go. The code is right today. One
assertion on a stop of the second character, with the first at another generation, closes it.

### M-6. After „Zatrzymaj” focus falls to the page body

`src/browser/view/headquarters.ts:331`, `:459`, Slice 5 (`395b6f3`). The player sees no loss: in
Chromium the next Tab reached „Program: Ala”, the same row's list, with a solid outline, and D-42 holds
only three criteria of WCAG, none of which this breaks. It differs from „Zamknij”, which moves focus.
Left as it is, a browser that restarts Tab from the top would cost a keyboard player the place in a
long team. My recommendation is to leave it unless the human asks.

### M-7. Slice 5's screenshots do not stand in the cycle

`reports/12-slice5-report.md:18-21` says „screenshots inspected”; only `reports/shots6/` exists, from
Slice 6. WAY-219 asks the report to record the screenshot evidence where obtained. The rendering itself
holds: I inspected the row of a character in a loop at 480 px, with the loop line, „Zatrzymaj” in
`danger`, the disabled buttons, the mark in `warning` and the other character's row active.

### M-8. „Zatrzymaj” does not close a report line, while D-229 says only "stopped"

`foundations/decisions.md:4325-4326`, `spec.md:292-294`, `src/browser/sim/loop.ts:176-202`. After
„Zatrzymaj” the character's open line stays open, and a later loop of that character adds to it. A
line closes only at a stop by death: the shape has no other way, since `stop` holds a generation from
2 up. Inside D-229 "stopped" always means the death („pętla stanęła”), so the code does not depart from
the entry, and the sum is right by row 22. D-228 uses "stop" for the player's act, so a reader can take
the sentence more widely. "Stopped by a death" in D-229 and the spec's section would end it.

### M-9. D-208's "at most about 10 earning loops on Las" reads low now

`foundations/decisions.md:3769-3770`, from Q12 (`task.md:185`). Measured at game minute 300 with the
17-rule program: 12 loops give 62,179 bytes, 7,687 for one and about 5 KB for each more, so 12 fit under
64 KiB. The task's number was measured on a manual run with its copy; the design dropped the copy. An
accepted estimate that says "in practice fewer"; no behaviour rests on it. *Foundation entries*
(`96d7b45`).

## Against the handoff's two aims

**Trust boundary: holds.** The reader in `src/browser/sim/saved-game.ts` is unchanged since Slice 1's
review and meets every condition of spec section 13 as I read it again. The second half was yours to
me: no document the game writes at any state the finished code reaches is refused.

- A random walk over every act a player reaches (loop start, „Zatrzymaj”, „Zamknij”, the open game's
  passing, save, load and catch-up, „Kup”, manual run and „Zakończ”, creating and deleting programs):
  150 walks, 9,000 steps, 10,985 documents through a JSON round trip, 765 run ends in the open game,
  272 player stops, no refusal, no loop's run left ended, no chest over its cap. The walk did not
  assert that an attack going on was among those states; such a run goes by the same reader as a manual
  one.
- The walk reached 754 line states of an open line with no loop, the state Slice 1's reviewer set aside.
  The game writes that state (after „Zatrzymaj”), the load admits it and it reads sensibly. No finding
  beyond M-8.
- A forged value admitted by the load cannot make the catch-up throw: every moment stays a safe integer
  over the spans a load admits. A far-past save time is a long catch-up in the owner's own game
  (*Declined to judge*).
- Saved size with several loops, the other item set aside: 12 loops fit, see M-9. Above that the
  too-large sentence takes over, as D-208 gives.

**Irreversible operation: only prepared.** `SAVED_GAME_VERSION` is 3 at
`src/browser/sim/saved-game.ts:75`, and that is all. The range touches nothing under `deploy/`,
`scripts/`, `src/server/`, `.github/`, `.gitmodules`, `.the-way`, `package.json`, `package-lock.json`,
`compose.yaml` or `Dockerfile`. Nothing is performed on the server.

## Mismatches the mechanical checks passed on

| Slice | Mismatch | Judgement |
|---|---|---|
| 2 | Tests after the code | The tests do fail when the behaviour breaks: Stryker on `loop.ts` killed or timed out 312 of 343 mutants, and the 31 survivors are classified below |
| 3 | Four cases not seen failing | Those branches are killed by Stryker; the one survivor there, `<` to `<=` at `:381`, is equivalent |
| 3 | Lost spec lines | No literal 60 for a loop's minute: `MS_PER_LOOP_MINUTE` reads `BALANCE.loopMinuteRealSeconds`; the 60s left are real minutes of the resurrection and the clock's display. Loop's tests were taken as cases (see below) |
| 4 | `account-screen` tests after the code; `testing.md` read in part | Removing `clock.catchUp()` or the save fails them by the executor's run. Compared with the whole of `testing.md`: no departure found |
| 5 | Two ACTS cases not seen red alone | Seen now: dropping the save of „Puść w pętlę”, of „Zatrzymaj” and of „Zamknij” each fails in `tests/view/account-screen.test.mjs` |
| 5 | Focus after „Zatrzymaj” | M-6 |
| 5 | Harness; four states unchecked | In a real browser: the loop line moves with each minute (0, 1, 3 at date jumps of 60 s and 120 s), the bare „Pętla zatrzymana” after a click, the row at 480 px. Tab all the way to „Zatrzymaj”, a real reload and the real server stay unchecked |
| 6 | Focus to the „Drużyna” heading with `tabindex="-1"` | Sound: Tab does not stop on it, the one outline rule holds, the focus-outline test passes; after a mouse click it does not match `:focus-visible` |
| 6 | One changed test | The chest heading found through `.chest-list`, assertions unchanged; cause named |
| 6 | Two states unchecked, one console error | The section after „Zakończ” and a mouse click on „Zamknij” both work in a real browser, one save each. With a favicon given the console holds no error, so the error was the favicon, not the game |

Own-work checks of Slices 2 to 6: each names a fair weak point (the repertoire by the run's skills, the
moment of a death, one save per result, the chest not rebuilding the rows, focus after „Zamknij”), and
each check would catch it unmet.

## Coverage

**To do 1–19**, each met by the commits:

| To do | Where |
|---|---|
| 1 | `startLoop`, „Puść w pętlę” at solved maps only, `headquarters.ts:379-389` |
| 2 | `balance.ts`, `passLoops` reads neither pause nor pace, `clock.ts:84-99` |
| 3 | `loop.ts:124-166`; the copy's content in the loop |
| 4 | `endLoopRun`, `nextSeed`, `random.ts`; the first seed by `mixSeed` |
| 5 | `beginRun`, `takeTrip` from the chest at each run, unmarked |
| 6 | `endLoopRun`, `stopLoop` |
| 7 | `characterAfterDeath`, one rule with `settleDeath` |
| 8 | `stopLoop`, `stoppedLoopLine`, destructive button with no question |
| 9 | `loopLine`, per-character disabling; `send` throws; „Kup” active; counts untouched |
| 10 | `saveTimeMs`, `withSaveTime`, version 3; the server unchanged |
| 11, 13 | `catchUp`, `loopSpan`, `clock.catchUp()` as the last step of `createGameView`, which all four loads pass through (`app.ts`, `showGame`) |
| 12 | `catchUp` by the team's order; contention tested |
| 14 | The k-th minute's own moment; M-4 for its named case |
| 15 | `stepMinute` alone: no `discover`, no written rule |
| 16 | `away-report.ts`, lines in `loop.ts`; all wordings below |
| 17 | `runPasses`, `store.apply`, the three acts through `act` or its like; `TOO_LARGE` |
| 18 | `rehearsalMark`, `clippedTake` |
| 19 | The entries of `96d7b45`; D-194's accepted cost removed |

**Rows 1–26:** each stands in the entry the plan's *Coverage* names, and the code does what the entry
says: rows 1, 2, 5 D-226; 3, 4 D-227, D-93; 6 D-200; 7 D-228, D-183; 8 D-190; 9 D-22; 10, 11, 22, 23,
24, 26 D-229; 12, 25 D-230; 13 D-231, `save time`; 14 `catch-up-minutes`; 15 `catch-up-death-moment`;
16 D-232, D-71; 17 `loop-run-knowledge`; 18 D-207; 19 D-208; 20 D-233, D-62, D-132; 21 D-234.

**Projected entries:** D-222, D-223, D-22, D-164, D-189, D-190, `catch-up-state`, `earning loop`,
`catch-up`, in their wording; Slice 1's word comparison stands, and I read the entries against the code
that came after it.

**Polish texts:** 22 literal strings compared by script, character by character, with `task.md` and
the source, none missing; U+2212 for the minus and U+00B7 for the dot in both.

**Departures from loop's tests:** I read `sim.test.ts:1455-2043`, `loop.test.ts`, `chest.test.ts:345-379`
and `:485-558`, `report.test.ts`, `policy.test.ts:587` and `death.test.ts:40-60`. The departures in
the code are Q3, Q5, Q7, Q20 and Q21 and no other. Differences that are no departure:

- `loop.test.ts:91-92` has a report at 0 minutes because its run is already dead when the catch-up
  starts. No state here holds a dead run, and a death in the first minute gives 1 minute.
- `chest.test.ts:492` keeps a chest change on a line that stopped: it is stored here too, and the task's
  wording of that line does not show it.
- `chest.test.ts:527` stores "chest full"; here it is read at drawing, as the spec settles, and the
  sentence stands in that case.
- `sim.test.ts:1830` tests a probe of the pace; this game has none.
- `loop.minutes`, a running total of loop's: no text here needs it, and the same count stands in the
  report's lines.

**Changed invariant tests** (D-73, named as section 2 asks): `save-version`, `resurrection-renewal`,
`death-settled-once` and `expired-session-unsaved-progress`, all in Slice 1, on the stamping or a moved
version number, each with its cause, assertions not weakened, as Slice 1's review found. After Slice 1
no invariant test changed; `trip-run-end`, `minute-span-split`, `map-run-repeatability`,
`saved-program-edit` and others gained cases. Other changed tests: the too-large sentence (Slice 4,
Q12) and the chest heading (Slice 6).

## Declined to judge

Each is set aside and counts as out of scope.

- A forged far-past save time, down to the smallest safe integer, and the catch-up that then does not
  end in practice: the owner's own game, D-07 and Q7.
- Two open tabs refusing each other when each reload ends a run: D-209 and spec section 10 accept it.
- Time passed while the page is open, a sleeping computer included, reporting nothing but stops: a
  non-goal of the spec.
- Up to a minute of a loop lost at each load: D-231 accepts it.
- A pick on the „Program:” list of a character in a loop that a player takes for a switch: spec section
  12 accepts it.

## Checks

Run in a detached worktree of `34417de` in the scratchpad, removed afterwards, unless named. The gate
was not run: the handoff keeps it for the orchestrator.

| Check | Exit | Result |
|---|---:|---|
| `npm run build` | 0 | |
| `node --test` on `tests/sim/{loop,catch-up,saved-game,trip,death,random,data}.test.mjs` and `tests/view/{clock,game-saver,away-report,account-screen,headquarters,trip}.test.mjs` | 0 | 316 pass, 0 fail |
| `npm run typecheck` | 0 | |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | OK |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 | OK |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | OK |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | OK |
| `npm test -- tests/invariants/test_simulation_randomness.py` | 0 | OK |
| `npm test -- tests/invariants/test_minute_span_split.py` | 0 | OK |
| `python -B .the-way/elements/common/foundation_check.py`, in the reviewed worktree | 0 | `0 errors` |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/loop.ts,src/browser/sim/random.ts:40-55,src/browser/sim/trip.ts:58-92,src/browser/sim/game.ts:437-465"` | 0 | 362 mutants: 326 killed, 5 timed out, 31 survived; `random.ts`, `trip.ts`, `game.ts` all killed |
| Scratch random walk, `probe1.mjs`, 150 walks | 0 | 0 refusals; the script's exit does not depend on them, the printed count does |
| Scratch comparison of the Polish texts, `texts.py` | 0 | 22 of 22 |
| Scratch size and catch-up, `size.mjs` | 0 | 1 to 12 loops, each loading; 12 give 62,179 bytes |
| Scratch second death, `second2.mjs` | 0 | M-4 |
| Mutant: `passLoops` not setting the clock with no loop | 1 | `tests/view/clock.test.mjs` fails |
| Mutant: the catch-up's moment counted from the run's start | 1 | The relation test fails |
| Mutants: no save at „Puść w pętlę”, „Zatrzymaj”, „Zamknij” | 1 each | `tests/view/account-screen.test.mjs` fails |
| Manual: Chromium by Playwright, over the real view and a state through a real JSON round trip and `loadSavedGame`, date offset by a harness, on a local static server | — | Loop line live, „Pętla zatrzymana”, one save per act, a report of 12 minutes added up to 14 by a load (row 22), a paused manual run hiding the section and „Zakończ” showing it, mouse click on „Zamknij”, focus on the heading, Tab after „Zatrzymaj”, the row at 480 px inspected by screenshot, no console error |

The 31 survivors, classified:

| Place in `loop.ts` | Mutation | Class |
|---|---|---|
| `:409` | `find` always true | **Real gap: M-5** |
| `:498` | No-loop branch of `passLoops` | Not a gap: `tests/view/clock.test.mjs` kills it, and view tests stay outside Stryker |
| `:38`, `:43` twice | Guards of `loopOf` | Equivalent: each guards what the other does |
| `:110` three | `mapId` type guard | Equivalent for ids a player reaches; not worth pinning |
| `:218` | `typeof minutes` | Equivalent: `Number.isInteger` refuses the same |
| `:181`, `:228`, `:587` | Events of a very state | Equivalent: the store returns on the very state and drops them |
| `:223`, `:270`, `:363`, `:379`, `:380`, `:533` | Texts of a RangeError | Not worth pinning |
| `:381` | `<` to `<=` | Equivalent at equal moments |
| `:396` twice, `:397`, `:403` | `takeEnd`'s guard and inner kinds | Equivalent: `endLoopRun` returns the very state, and those two kinds are not read |
| `:461` | Zero kept in a change | Equivalent: `addedChange` drops it |
| `:500`, `:506` | Early returns | Equivalent: the loop passes nothing |
| `:534` | No-loop half of the guard | Equivalent in effect: the next reading sets the clock |
| `:549` three, `:551` | Bounds of the catch-up's loop | Equivalent: each bound is held by the other |

Not run:

- The product's gate, `npm test` with no file argument: the handoff keeps it for the orchestrator.
- The whole game against the real server, so a real reload from a saved document and a crafted version
  3 document over HTTP: it needs the server's setup, and the document model test and the browser run
  above cover the view's side.
- Tab all the way to „Zatrzymaj”: a native button under the one outline rule, not driven.
- Stryker on `saved-game.ts`: unchanged since Slice 1's run. On `game.ts` beyond `:437-465`: `send`,
  `startRun` and `withSaveTime`, read and covered by tests, `withSaveTime` by Slice 1's run.

## Reaches and side effects

| What | Where | Why |
|---|---|---|
| Loop's tests, allowed by the handoff | `C:/Storage/repos/loop` at `cdc7c0d`, copied to the scratchpad; no engine or interface read | P6 |
| WAY-219 and `ui_check.md` | `.the-way/foundations/decisions.md:6008`, `.the-way/task-cycle/change/ui_check.md` | What screenshot evidence is asked for |
| The reader of the document | `src/browser/sim/saved-game.ts:840-1309` | The trust boundary |
| The app's loads | `src/browser/view/app.ts:184-285` | The four loads and what a save at build time meets |

Side effects outside my report: the browser tool wrote its page snapshots and one screenshot into
`C:\Storage\repos\loop2\.playwright-mcp`, which git ignores. I deleted those six files by name. A
temporary worktree stood in the repository's list of worktrees and is removed. The reviewed worktree,
its index and its branch are untouched.

## Limits of this review

- The foundation is read in part. Read whole: D-222 to D-234, D-207, D-208, D-42, D-44, the entries of
  the part map for `browser-view` and `simulation`, the new invariants and glossary entries. D-22, D-62,
  D-71, D-93, D-132, D-164, D-183, D-189, D-190, D-194 and D-200 are read by their changed lines, not
  whole. The other decisions whose *Scope* names `simulation` or `browser-view` are not read, nor every
  invariant of those parts, nor the-way's glossary. The method asks for them; a conflict with one of
  them, if any, is not ruled out by this review. Slice 1's review searched the entries against the
  foundation, and the focused tests above stand on the rest.
- Guidelines read whole: `coding.md`, `coding-simulation-module.md`, `coding-browser-module.md`,
  `coding-saved-game.md`, `coding-content-data.md`, `testing.md`, `styleguide-browser-view.md`.

## Searches not found or unclear

- A test of a second death covered in one catch-up: not found, M-4.
- A course with a second covered death under the real renewal of 480 minutes: 4,000 starts on Las —
  głębiej gave none, so M-4's evidence shortens the renewal in the data for that process.
- Slice 5's screenshots: not found, M-7.
- `guidelines/coding-browser-module.md` and `coding-simulation-module.md` do not list `away-report.ts`
  and `loop.ts` in their tables; those tables leave out other files too (`game-view.ts`, `trip.ts`), so
  this is no gap of this change.
- The word "stopped" in D-229 and the spec's section 11: unclear on its own, M-8.
