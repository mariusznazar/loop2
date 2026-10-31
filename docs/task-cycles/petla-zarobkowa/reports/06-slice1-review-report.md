FAIL bc8eaecd10594dececf8978e0dc8ef9168a68205

# Review of Slice 1 — The saved document of version 3, task `petla-zarobkowa`

Range `4ed8fcd..bc8eaec`: commit `96d7b45` (the plan's *Foundation entries*) and commit `bc8eaec`
(Slice 1). `git rev-parse HEAD` is the head given. One blocking finding, in the slice's code; three
Minor findings. Everything else reviewed held: the crafted documents, the raise of the version, the
stamping and all the foundation entries.

## Critical

None.

## Important

### I-1. A device clock before 1970 writes a save the game then refuses, and the player's progress is replaced by a new game

Blocks; within the task. It is what the spec mandates, and it is still a defect: spec section 13,
`.runs/task-cycles/petla-zarobkowa/spec.md:302-303`.

**What the player sees.** A player whose device clock reads before 1 January 1970 UTC plays and saves
normally. At the next load the game says „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od
nowa.”, starts a new game and saves it over the old save at once. Everything is lost, programs
included, though the save was not damaged.

**Where.**

- `src/browser/sim/game.ts:489-495`: `withSaveTime` takes any safe integer, so a negative moment is
  stamped. `src/browser/view/clock.ts:67` reads it from `Date.now()`, which is negative on such a
  clock.
- `src/browser/sim/saved-game.ts:1240`: `saveTimeMs: count(read.saveTimeMs)` refuses that same value.
  The doc comment at `:1156` gives the reason, "a clock cannot read below zero".
- `src/browser/view/app.ts:52-54` turns the refusal into `newGame()`, and `:216` calls
  `view.saveNow()`, which replaces the save on the server. So the loss cannot be undone.

**Why it matters.**

- The slice's *Goal* is "Every saved document the game writes is of version 3, carries a save time
  and loads", and the handoff's aim is that "no document the game itself writes is refused". Both
  fail for this input.
- The premise is false in this repository. `tests/sim/death.test.mjs:232-233` reads "a clock set back
  is the player's own; the moment is stored as the arithmetic gives it", „a moment below zero settles
  as any other”. `tests/sim/saved-game.test.mjs:850` is „a moment of readiness below zero loads, as it
  is a safe integer of any sign”, and `src/browser/sim/saved-game.ts:514` reads any safe integer for
  the same reason. `saveTimeMs` is the one moment of the game that refuses this sign.
- `guidelines/coding-saved-game.md:138-139` reasons the same way of trip counts: they are read from
  1 up, so the game holds no count the load would refuse. Here the game holds a value it refuses.
- The accepted cost does not cover it. Q8 (`task.md:165-169`) accepts that a wrong clock "dolicza za
  dużo albo zero minut", wrong minutes and not the whole save. D-231 *Rationale* says the same.
- The refusal protects nothing: a save time of -1 does exactly what a forged 0 does, which the load
  admits, a long catch-up in the owner's own game (D-07). The spec itself ends section 13 with "The
  load reads the save time as a number, as it reads `resurrectionReadyAtMs`", `spec.md:318`, and that
  field reads `integer`.
- The plan gives no later slice `saved-game.ts`, so nothing later repairs this. The executor named it
  as concern 1 and recommended leaving it; that rationale does not lower the grade.

**Evidence.** Probe through the built `withSaveTime`, `savedGame` and `loadSavedGame` of `bc8eaec`,
with a JSON round trip, exit 0: moment `0` loads, moments `-1` and `-60000` give `refused: shape`.
No test pins a negative moment at the writer: `tests/sim/saved-game.test.mjs` „a moment that is no
safe integer gives no save time” lists none, and `:1489` pins the refusal.

**Recommended fix.** Read it as `resurrectionReadyAtMs` is read: `integer(read.saveTimeMs)` at `:1240`,
null stays refused, and correct the comment at `:1156`. Move „a save time below 0” (`:1489`) to the
loading edges at `:1778`, with a round trip through `withSaveTime` at a negative moment. One source
line, one comment, one test case, no raise of the version. The spec's condition "from 0 up" then
needs the orchestrator's note, as this departs from its words. The way I rejected: clamping to 0 in
the saver and in `keep()`, two callers and a stored moment that is not the moment of the save, against
D-231.

## Minor

### M-1. D-207 *Rejected* says "about 1440 saves a day" of a 30-second rhythm

`foundations/decisions.md:3725`. A save every 30 real seconds is 86,400 / 30 = 2,880 a day; 1440 is one
a minute. The number is copied faithfully from `task.md:182` (Q11, way B), so the entry follows its
source and the source is wrong. Nothing in the code rests on it, and the way stays rejected at either
number. A later reader who checks it finds the arithmetic off by two. Fix: the human's call, as it is
a number of an answered question.

### M-2. `catch-up` says "while the game was closed", and D-230 runs it with a tab open

`foundations/glossary.md:224-226` against `foundations/decisions.md:4372` and following. After a save
lost to another browser's the tab never closed. The definition is projected whole and row 25 is
accepted, so the agent of the entries rightly left both (its concern 4). The word's meaning is a shade
wider than its definition; a later change of the definition can take it.

### M-3. `moment` means two things in one file

`src/browser/view/game-saver.ts:36`, the option, is the clock's reading; `:70`, the saver's method, is
a moment of saving, the sense the glossary's `save time` *Not* keeps apart. Mandated by the plan and
kept apart by the doc comments (executor's concern 2). A name like `clockMoment` for the option would
end it. `src/browser/view/clock.ts:26` has the same name in the first sense.

## Against the handoff's two aims

**Trust boundary.** Crafted input at `src/browser/sim/saved-game.ts` holds. Each condition of spec
section 13 has its own refusal. I read every reader and the crafted cases against the section:

- Keys: leading zero, fraction, white space, `0`, negative, `__proto__`, not in the team, the manual
  run's character.
- A loop's run: exact `MapRun` keys, the five tail keys each refused, ended either way, no activity
  and no combat, activity beside a combat, the map not solved.
- `runNumber`, `completed`, each `practice`, stop and minutes pairs, two open lines.
- Accessors and inherited keys go through `own`, a symbol key through `entries`, and a stack overflow
  from deep nesting is caught, so the load never throws.

Mutation run on the changed lines: 127 mutants, 122 killed, 5 survived, none a real gap (*Checks*).
The other half of the aim fails on I-1 only. I looked for other documents the game writes and the load
refuses, against what later slices will write under spec sections 1, 11 and 13, and found none: a
loop's first run, a stopped loop with nothing gathered, a stop with no minutes in the open game, a
second loop's line beside the first's, a run's skills older than the team's after „Kup”.

**Irreversible operation.** `SAVED_GAME_VERSION` is 3 at `src/browser/sim/saved-game.ts:75` and that
is all: the range touches nothing under `deploy/`, `scripts/`, `src/server/`, `.gitmodules`,
`.the-way` or `package.json`. Nothing is performed on the server. The version 1 and version 2
documents stay in the test, each refused as `version`, as the guidelines ask.

## The slice against its plan

- `withSaveTime`, the stamp in `sendNow` and in `keep()`, `baseline` left on the state read: as spec
  section 9 says. Only those two paths write a document; retries and the hidden page go through
  `sendNow`.
- `savedGame` is unchanged and `saved-game.ts` takes no real time.
- Changed invariant tests, all on stamping or a moved version number, each with its cause in a comment
  or its helper's comment, no assertion weakened: `save-version` („a document of another version…”,
  „a crafted document…”, new „the document of version 2…”), `resurrection-renewal`,
  `death-settled-once`, and `expired-session-unsaved-progress` through `saveOf` and `submission`.
- The executor's adaptations (`tests/sim/saved-game.test.mjs` old `:539`,
  `tests/view/account-screen.test.mjs` `:1841`, `:1515`, `Date.now` in `onPage`) fall under the same
  cause. None hides a failure.
- The author's own-work check names the load's guards, which is a fair weak point and which it would
  catch. It did not test the writer's side against the load, which is where I-1 lies; the executor
  saw it by reading and named it.

## The foundation entries, commit `96d7b45`

All new and changed entries checked against `spec.md:452-520`, the rows of *Settlements to record*
and the projected wording. Each stands, with what its source gives. M-1 and M-2 are the only remarks.

- **Projected wording:** my own word comparison of D-22, D-164, D-189, D-190, D-222 and D-223 with the
  definition found one difference of substance, row 8's insertion in D-190, which the plan calls for.
  D-189's joined sentences and the added row 9 in D-22 are as the agent reported. The remaining
  lines of that comparison come from my splitting of sentences across metadata; I read each. `catch-up-state`,
  `earning loop` and `catch-up` match by reading.
- **Rows 1-26:** each stands in the entry the agent's table names; the Polish texts are word for word.
- **The numbers 10 and 8 in D-208** come from Q12, `task.md:185`.
- **Agent's concern 1:** both changes are right. D-133, D-171, D-186, D-196 and D-201 speak of "during
  a map run" and an earning loop's run opens neither view, so D-227's `narrows` holds. D-209's sentence
  would turn false without its added words.
- **Agent's concerns 2, 3, 5, 6:** no finding; see *Declined to judge*.
- **Code against the entries:** D-224 and D-231 say what `types.ts`, `saved-game.ts`, `game-saver.ts`
  and `game-view.ts` do.

## Declined to judge

Each is set aside and counts as out of scope.

- A forged far-past save time and the long catch-up it brings: the owner's own game, D-07 and Q7.
- `withSaveTime` throwing inside `sendNow` with `inFlight` already true: `Date.now()` gives no value
  that throws, so this is unreachable in play.
- An open report line of a character with no loop: section 13 does not ask for that condition, and
  what writes lines is Slice 3's.
- `src/browser/view/game-saver.ts:16` and `tests/view/game-saver.test.mjs:228` behind D-208, and
  `guidelines/styleguide-browser-view.md:198` behind D-44: the plan gives them to Slices 4 and 5.
- `trip-run-end` reading *Method* `test` with no test of its new clause until Slice 2: the plan gives it.
- D-22 reading "the map's layout" (agent's concern 2): the projected wording binds.
- D-223 and D-230 with nearly the same question (agent's concern 3): the plan and spec name both.
- The saved document's size with several earning loops (D-208): Slice 4.

## Checks

Run in a separate detached worktree of `bc8eaec` in the scratchpad, removed afterwards, with
`node_modules` and `.runs/quality-venv` linked from the reviewed worktree.

| Check | Exit | Result |
|---|---:|---|
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | 24 pass, 0 fail |
| `npm test -- tests/view/game-saver.test.mjs` | 0 | 19 pass, 0 fail |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 37 pass, 0 fail |
| `npm test -- tests/sim/death.test.mjs` | 0 | 26 pass, 0 fail |
| `npm test -- tests/view/trip.test.mjs` | 0 | 6 pass, 0 fail |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests, OK |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | 2 tests, OK |
| `npm run typecheck` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py`, in the reviewed worktree | 0 | `0 errors` |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate` on `saved-game.ts` `:777-781`, `:793-799`, `:966-1126`, `:1208-1240` and `game.ts:489-496` | 0 | 127 mutants, 122 killed, 5 survived |
| Scratch probe of a negative moment, `withSaveTime` to `loadSavedGame` | 0 | `0` loads; `-1`, `-60000` `refused: shape` |
| Scratch word comparison of the projected decisions with the log | 0 | See the section on the entries |

The five survivors, classified:

| Place | Mutation | Class |
|---|---|---|
| `src/browser/sim/game.ts:492` | Empty message of the RangeError | Not worth pinning: the text of a refusal |
| `src/browser/sim/saved-game.ts:1104`, twice | The `character === undefined` guard removed | Equivalent: `character.generation` throws on the next line and the load still refuses as `shape` |
| `src/browser/sim/saved-game.ts:1107` | `stop === null` to `false` | Equivalent: `stop.away` throws on null and the load still refuses as `shape` |
| `src/browser/sim/saved-game.ts:1208` | Another value in the empty list | Equivalent: a text equals no character's number |

Not run:

- The product's gate, `npm test` with no file argument: the handoff keeps it for the orchestrator.
- StrykerJS on the body of `plainMapRun` (`:863-957`): moved code with its readings unchanged; its
  guards are read in a loop's run by the crafted cases above.
- A manual check in a browser: the slice changes no screen and no text the player reads.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| The load's refusal and what follows it | `src/browser/view/app.ts:31-55`, `:265-279` | What a refused document does to the player's save; the handoff's range stops at `:262` |
| The tests of a moment below zero | `tests/sim/death.test.mjs:225-238` | Whether the game treats such a clock as possible |
| D-221 | `foundations/decisions.md:4078-4105` | What cost of a refused save was accepted |
| D-118, D-119, D-133, D-171, D-186, D-196, D-201, first lines | `foundations/decisions.md` | The agent's concern 1 |
| *Decisions in play* | `.runs/task-cycles/petla-zarobkowa/task.md:285-344` | D-207's *Rejected*, D-194, `trip-run-end` |
| Q12 and Q11 by search | `.runs/task-cycles/petla-zarobkowa/task.md:182`, `:185` | The numbers 1440, 10 and 8 |
| Sections on the repertoire by search | `.runs/task-cycles/petla-zarobkowa/spec.md:128-131` | D-232's *Verification* on D-119 |
| `mapRunEnded` | `src/browser/sim/run.ts:395` | Its meaning for a loop's run |
| Branch `quickHand` | `src/browser/sim/data/skills.ts:113` | That the crafted case about ranks fails for the reason its name gives |
| Trust boundaries in the part map, by search | `foundations/part_map.md:58` | Confirming the boundary |

`guidelines/styleguide-browser-view.md` stands in the slice's selection and I did not read it: the
slice changes no screen.

## Searches not found or unclear

- A test of a negative moment at the writer: not found, see I-1.
- Any path writing a document besides `sendNow` and `keep()`: not found.
- Another user of the old heading of D-189 ("Which current runs take equipment and pay loot?"): not
  found outside `.runs/`.
- A test outside `tests/sim` and `tests/view` that depends on the raise: not found.
  `tests/account-storage.test.mjs` and `tests/http.test.mjs` hold `version: 2` as data of the server,
  which reads no game.
- Spec section 13 is unclear on its own terms: `spec.md:302` gives "from 0 up" and `spec.md:318` gives
  "as it reads `resurrectionReadyAtMs`", which is any safe integer.
