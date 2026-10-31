# Findings to fix — Slice 1, task `petla-zarobkowa`

Reviewed head `bc8eaec`. The blocking finding, in the reviewer's words, from
`.runs/task-cycles/petla-zarobkowa/reports/06-slice1-review-report.md`. Line numbers of `spec.md` in
it are the reviewer's; the condition stands in section 13.

### I-1. A device clock before 1970 writes a save the game then refuses, and the player's progress is replaced by a new game

Blocks; within the task. It is what the spec mandates, and it is still a defect: spec section 13.

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
- The accepted cost does not cover it. Q8 accepts that a wrong clock "dolicza za dużo albo zero
  minut", wrong minutes and not the whole save. D-231 *Rationale* says the same.
- The refusal protects nothing: a save time of -1 does exactly what a forged 0 does, which the load
  admits, a long catch-up in the owner's own game (D-07). The spec itself ends section 13 with "The
  load reads the save time as a number, as it reads `resurrectionReadyAtMs`", and that field reads
  `integer`.
- The plan gives no later slice `saved-game.ts`, so nothing later repairs this. The executor named it
  as concern 1 and recommended leaving it; that rationale does not lower the grade.

**Evidence.** Probe through the built `withSaveTime`, `savedGame` and `loadSavedGame` of `bc8eaec`,
with a JSON round trip, exit 0: moment `0` loads, moments `-1` and `-60000` give `refused: shape`.
No test pins a negative moment at the writer: `tests/sim/saved-game.test.mjs` „a moment that is no
safe integer gives no save time” lists none, and `:1489` pins the refusal.

**Recommended fix.** Read it as `resurrectionReadyAtMs` is read: `integer(read.saveTimeMs)` at `:1240`,
null stays refused, and correct the comment at `:1156`. Move „a save time below 0” (`:1489`) to the
loading edges at `:1778`, with a round trip through `withSaveTime` at a negative moment. One source
line, one comment, one test case, no raise of the version. The way the reviewer rejected: clamping to
0 in the saver and in `keep()`, two callers and a stored moment that is not the moment of the save,
against D-231.

## The orchestrator's settlement

Spec section 13 is changed to this reading: `saveTimeMs` is a safe integer of any sign, null refused.
