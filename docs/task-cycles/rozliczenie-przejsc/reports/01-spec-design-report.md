# Report — spec designer, task `rozliczenie-przejsc`

Status: done

Spec: `.runs/task-cycles/rozliczenie-przejsc/spec.md`. Nothing committed; no gate run; no code
changed; `foundations/` untouched.

## Questions sent

None. No answer of *Questions to settle* turned out not to fit the code, and the choices the sources
leave open did not change the design. They stand as assumptions below, for the orchestrator to
overturn: each is reversible before the merge.

## Assumptions the orchestrator may want to see

1. **Role of the generation label.** Row 6 gives no role. The spec takes `text-secondary`, the role
   of the archetype beside it (D-40). A wrong role costs one CSS rule and one word in D-218.
2. **Place of the resurrection line.** To do 19 says „przy każdej postaci”. The spec puts it on a row
   of its own under the name and archetype, above „Program:”. A wrong place costs one line of DOM.
3. **„Poniżej godziny »za {m} min«”.** Read as the time phrase alone changing, the warning after the
   dash staying. Row 5 can be read as the whole line shrinking; Q8's text carries the warning for
   every not-ready state, so the first reading is taken.
4. **To do 6's „do »Restart«”.** A restart on a solved map starts a run with the same line. So the
   line goes for one instant, in the same step that brings it back.

## Departure from the handoff's framing

The handoff speaks of death settling in `advanceMinutes`. The spec settles a completion there, and a
death in `settleDeath(state, nowMs)`, a separate function `clock.ts` calls in the same step, before
the result reaches the store. Why, and what it costs, is the first row below. The orchestrator's
phrase was not an answer of the human, so this is a design choice, not a reopened answer. To do 16's
„w minucie śmierci” holds as „in the step of the clock that reached that minute”; a reviewer who
reads it stricter should say so.

## Ways weighed

| Choice | Taken | Rejected, and why it lost |
|---|---|---|
| Moment of death into the simulation | `settleDeath` beside `passRealTime`, composed in `clock.ts`; loop's own shape (`src/sim/death.ts`: called by whoever knows real time, never by `tick`), and W1 binds its idempotence test | third argument of `advanceMinutes`: about 200 test lines across 30 files plus the Python checks, or a default fake moment that hides a forgetful caller. Third argument of `passRealTime`, settling inside: `tests/invariants/test_minute_span_split.py` compares its splits with an `advanceMinutes` reference at the minute of death, so the check would have to change, against the task's „nie może zmienić wyniku” |
| What the headquarters reads | one clock reading, passed to `resurrectionReady`; D-04 changes by one clause | moment stored in the game state on each tick, which keeps D-04's sentence: a new state each tick makes the saver send every 30 s at an idle headquarters and after a load (`game-saver.ts:198`–`201`), against D-207, and puts a stale moment into the document. A sim function returning the text: D-04 stays false in substance. A second timer: a second reader of the clock |
| Where a run holds that it does not pay | `solvedMapRun` on `GameMapRun`, bound in `startRun` | `solvedMaps` at completion: false after the completion that solved the map. `payout` as in loop: nothing reads it |
| Where the settlement stands | `deathSettlement` on `GameMapRun`, beside `deposited` | number read from the team's character: can move under a retained screen. Sentence in the state: words belong to the view |
| „Restart” after a wipe | team's skills when the run holds `progressLost`, the run's otherwise | every restart from the team: changes the expected values of `tests/sim/skills.test.mjs:284` and `tests/sim/trip.test.mjs:111` with no requirement behind them. Wiping the retained run: against To do 17 |
| Headquarters refresh | every 200 ms clock tick, writing an element on a changed text or role | per-row timer: a second clock reader. One minute's rhythm: the change to ready could show up to a minute late |

## The four checks

1. No placeholder, `TBD` or empty section.
2. Two contradictions found and fixed on re-reading: *Constraints* said `advanceMinutes` gives the
   same results as before, against decision 2; decision 4 said „keep their results”, the same. Both
   now say only what holds: the signatures stay and neither settles a death. No decision contradicts
   the task. Decision 7 changes D-04, in the open, as the handoff allows.
3. Scope: one task, one shape change and one raised version. Its pieces can be sliced apart for the
   plan — payment and from-nowhere equipment; settlement and clock; headquarters lines; foundation —
   though the shape and the version go together, so they are not independent changes.
4. Two-way readings picked and written: the time phrase below an hour (decision 8); the line after
   „Restart” (decision 8); the settlement of To do 16 (decision 4); the role of the label (decision 8).

## Concerns

- D-04 changes though the task's *To do* 22 does not list it. The handoff allows it. It changes a
  decision the human approved, so the request should name it.
- `solvedMapRun` equality in the load rests on D-55. Task 18 has to relax it for runs of an earning
  loop on a map that was unsolved at their start, should any exist.
- A death unsettled exists as a return value of `advanceMinutes` and `passRealTime`. The product has
  one caller; task 18 adds more. A forgetful caller saves what the next load refuses, which discards
  the game state. That risk is the price of the first row above.
- The bullet of `minute-span-split` holds by keeping settlement out of the compared functions; the
  invariant's wording does not change.
- During this work one shell command created and deleted an empty file in the system temp directory,
  a slip of mine with no effect; the handoff says nothing is written outside the worktree.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| `src/browser/styles.css`, lines 365–510 | worktree | how roles reach `.trip-result` and `.team-member` |
| `src/browser/view/body-row.ts`, by search | worktree | whether the backpack stands inside the body row, for To do 6 |
| `src/browser/sim/run.ts`, `programs.ts`, by search | worktree | who builds a `GameMapRun`; `mapRunEnded` |
| `tests/invariants/test_minute_span_split.py`, docstring | worktree | what the check compares, which decided the first row |
| `tests/invariants/test_simulation_inputs.py`, lines 36–51, 404–425 | worktree | how new exports are driven |
| `tests/sim/trip.test.mjs`, `skills.test.mjs`, `team.test.mjs`, `completion.test.mjs`, `saved-game.test.mjs`, `tests/view/clock.test.mjs`, `account-screen.test.mjs`, parts | worktree | which expectations change |
| `stryker.config.json` | worktree | its list of test files is written out, so a new file joins it |
| `.the-way/elements/common/foundation_check.py`, lines 1–105, 416–485 | worktree | what the entries need |
| D-54 | `foundations/decisions.md:1065` | came with the range around D-53 and D-55; not used |
| D-183–D-188, D-191–D-193, D-195–D-198 | `foundations/decisions.md:3255`–`3522` | the reading covered the whole stretch around the named entries |
| `src/sim/death.ts`, `src/sim/chest.test.ts`, `src/sim/skills.test.ts` | loop at `cdc7c0d` | the task cites the tests; `death.ts` is what they test |
| `definicja_mvp_loop2.md`, lines 2183–2188 | vault | the fields of `solved-map-manual-run` beyond the handoff's lines |

**Searches not found or unclear:**

- `guidelines/coding-content-data.md` holds no rule for validating a number of `BALANCE`, though the
  handoff speaks of „its validation”. The spec pins the number with a data test and adds no check.
- `guidelines/testing.md` names no file for death; `tests/sim/death.test.mjs` is this spec's choice.
- The definition gives `solved-map-manual-run` *Part* `every`, while `trip-transfer`, its neighbour,
  has `simulation`. The spec keeps the approved `every`.
- The definition's *Derives from* for that invariant names the projected decision, which task 18
  writes. The spec names D-189, which carries its sentences here, and D-214.
- No source says what the Origin of the new decisions cites; the vault file name of the task is not
  in the handoff. Left to the foundation step.
- The frozen task has no *Scope* field; the handoff's „the task's *Scope* words” is read as the
  decisions' *Scope*, from the part map.
