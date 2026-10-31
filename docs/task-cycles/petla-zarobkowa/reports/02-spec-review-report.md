PASS

Spec review — task `petla-zarobkowa`. Reviewer: a fresh agent that did not write the spec. Worktree
head `4ed8fcd`, `.the-way` at `a8dfe8a`, as the gitlink records. No file changed except this report.

Check result: 0 findings; `python -B .the-way/elements/common/foundation_check.py` at the unchanged
base printed `0 errors`, exit 0. `npm test` not run, as the handoff says.

## Findings

None of the four kinds: no requirement dropped or changed, no behaviour invented, no contradiction
that changes the code, no guess whose wrong answer would matter.

## What was checked

- Every *To do*, 1 to 19, against sections 1 to 15, sub-point by sub-point.
- All 26 rows of *Settlements to record*, and every entry of *Decisions in play*, against the
  spec's *Foundation entries*: each row has a home, and every decision the task says its answers
  change is listed. D-44 is an addition the task does not list, and it is needed (To do 8).
- The five carried questions: each settled, with ways rejected.
- The named foundation entries, each whole, for contradictions. D-221 against `passLoops` and
  `catchUp`, which take moments and call a function that passes game time: consistent, because
  D-221's *Rationale* names the computing of time away as a caller that settles.
- The self-refusal risk, the worst failure of this design: each document the game can write,
  against the load conditions of section 13. `loops` against `run`, `stoppedLoops` against `loops`
  and `run`, the minutes rules of a report line, the generation of a stop, at most one open line,
  and the mark rule at `src/browser/sim/saved-game.ts:918`. No path found that writes what the load
  refuses, apart from the stamp, which section 9 covers.
- The re-entrant save: `saver.moment()` inside `store.apply`, `read()`, `flush()`, against
  `src/browser/view/clock.ts:62` and `game-view.ts:154`. Section 6's order is the right one, and
  every name `createGameView` needs exists before the catch-up runs at its end.
- All four loads reach `createGameView`: `src/browser/view/app.ts:194`, from `loadGame` and `enter`.
- Code claims that hold at `4ed8fcd`: `types.ts:361`, `:364`; `game.ts:116`, `:170`, `:306`, `:487`;
  `saved-game.ts:71`; `game-view.ts:244`; `game-saver.ts:207`; `stepMinute` exists (`run.ts:578`);
  `buyBranch` and the „Kup” disabling test `state.run` alone (`skills.ts:151`,
  `character-skills.ts:116`); `nextShown` reads `mapRunStarted` (`program-panel.ts:107`); 15 files
  under `src/browser` read `state.run`; the server holds no version constant of its own.
- Loop's tests cited, read at `cdc7c0d` (P6). `sim.test.ts:2020` matches `loopSpan` and `clockMs`
  on all three cases. `sim.test.ts:1773` matches "the k-th minute's moment is `fromMs` plus k
  minutes". `chest.test.ts:535`, `sim.test.ts:1592`: only completed runs count. No departure beyond
  the named Q3, Q5, Q7, Q20, Q21.
- `loop.test.ts:91`–`92` (a stop at zero minutes): its starting state, a run already dead at the
  catch-up's start, cannot exist here, since D-221 and section 13 refuse it. Section 11 keeps row
  23: the section opens on any stop, a live stop at 0 minutes included. Not a departure.
- The number 243 of section 16: it comes from the body alone (worked by hand in
  `tests/sim/acceptance.test.mjs:19`–`23`), so it holds for a loop's run, which has no first-chill
  rule.

## Readings the designer asked to have reviewed

- **Two lines of one character (section 11).** A corner "po jednej linii na postać" did not
  consider. One line would give a wrong {m} or lose the stop, and row 22 cannot add a return to a
  closed stop line. Accepted; not a finding.
- **A live stop on a line with return minutes (section 11).** The return's minutes, chest and
  practice leave the screen before „Zamknij”, and the title can change to „Pętle, które stanęły”.
  No source settles this corner; the spec names it, so the builder does not guess. Not a finding,
  but it is the one reading a player could notice.
- **Time passing in an open tab, a sleeping computer included, writes no report.** It follows the
  glossary's "while the game was closed" and row 25's list of loads. Accepted.

## Notes for the orchestrator (not findings)

Nothing here needs the spec revised; each belongs to a later step.

1. **For the plan.** `saveTimeMs` null being refused turns `loadSavedGame(savedGame(state))` red at
   `tests/sim/saved-game.test.mjs:1671`, `:1687`, `tests/sim/death.test.mjs:215`, `:322`,
   `tests/view/game-saver.test.mjs:405` and `tests/view/trip.test.mjs:241`. Two of these lie under
   `tests/view`, while section 17's first cut lists the simulation's tests; and until the second
   cut the saver sends documents the load refuses. The first slice has to carry those test changes,
   each with its cause, as `guidelines/testing.md` *Changing an existing test* asks.
2. **For the foundation step.** D-207's *Verification*, "a tab that has just loaded a saved game
   state with its map run paused sending nothing until the player acts in it", stays true only with
   no loop passing: To do 17 makes such a tab send at the hidden page and at a run's end. Section 9
   says "nothing passing", but the spec's D-207 row does not name the clause. The change of D-207
   should narrow it.
3. **For the maker.** A stopped line's `practice` is "the gain in the loop's `practice`" while the
   loop is gone. `chest.test.ts:550` gives `{}`, and section 16 takes it as a case. Whatever is kept
   must stay a positive count: the load's `practice` refuses anything else, and with it the whole
   save.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| `character-skills.ts:60`–`123`, `program-panel.ts:88`–`116` | `src/browser/view/` | The spec's claims on „Kup” and on `nextShown` |
| `buyBranch`, by grep | `src/browser/sim/skills.ts` | The same claim |
| `acceptance.test.mjs:10`–`34`, `body.test.mjs:80`–`107` | `tests/sim/` | Whether 243 holds for a run with no discovery |
| Test names of `rules.test.mjs`, grep of `random.test.mjs`, of `death.test.mjs` for `invariant:` | `tests/sim/` | What a new module and a new stream meet; the marking section 16 cites |
| `version`, by grep | `src/server/` | Whether raising the number touches the server |
| `state.run`, `savedGame(`, `SAVED_GAME_VERSION`, `realMsCarry:`, by grep | `src/`, `tests/` | The count of 15 files; who writes documents |
| `.gitignore` check of this report's path | worktree | It must stay ignored |
| `python -B .the-way/elements/common/foundation_check.py` | worktree root | Not asked for by the handoff; read-only, run for the check line above |
| `.ai/rules/scripts.md` | the user's rules | Read before the scratch script that cut the named foundation entries out |

The foundation was read by entry: a scratch script outside the worktree copied the 55 decisions, 17
invariants, 6 glossary terms and 2 part-map entries the handoff names, and no whole foundation file
was read. Loop's tests were read as far as the handoff allows, in context around the cited lines;
its engine and interface were not.

**Searches not found or unclear:**

- The handoff says the spec has 423 lines; the file has 520 (`wc -l`). I reviewed the 520 lines
  whole, and they match the design report. Please confirm this is the spec meant.
- The handoff says the task has 385 lines; `wc -l` gives 384 and the Read tool 384 plus an empty
  last line. No text is missing.
- Whether loop counts a death's own minute in `minutes`: unclear, since its engine may not be read.
  `sim.test.ts:1812` only bounds the number. Section 11 counts it; to do 16 says "tyle, ile pętla
  przerobiła". Nothing visible rests on the difference of one.
- "The one-line check result" in the dispatch is not defined. I gave the review's result with the
  foundation check's line.
- The definition's full text: not read, as the handoff names only what the task quotes.
