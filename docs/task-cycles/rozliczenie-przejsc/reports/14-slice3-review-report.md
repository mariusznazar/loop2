PASS 8737dbaed71196437839a473daf1819b8b7a87de

# Report — reviewer of Slice 3, task `rozliczenie-przejsc`

Range `8949515..8737dba`, one commit, `git rev-parse HEAD` equal to the head given. The eight files changed are exactly the slice's *Change*. Blocking findings: 0. Minor: 2. Out of scope: 0 findings, 4 lines of **Declined to judge**.

## Findings

### Critical

None.

### Important

None.

### Minor

**1. A forged settlement can give a player back what a death took, as far as D-07 lets any document do it. The sentence of the review handoff does not hold as written.**

- Place: `src/browser/sim/saved-game.ts:793-807` (`deathSettlement`), `src/browser/sim/game.ts:361` (`restart`).
- What: a document of a death that took everything, with `{ kind: "progressLost", generation: 2 }` rewritten to `{ kind: "resurrectionUsed" }`, loads. „Restart” then reads the skills of the map run on the screen, which still hold what the death took.
- Evidence: scratch `s3_hostile.mjs`, exit 0. Honest `restart`: practice of „eating” 0. Forged document: `loads true`, `restart` gives 20.
- Why Minor: the load cannot tell the two apart, because a resurrection used and a death that took everything differ in nothing the document must keep consistent, and spec decision 9's row admits this value. The forgery also adds no reach: editing the team's practice in the same document, with no settlement touched, gives the same 20 (same scratch: `plain edit of the team's practice loads true`, `restart after plain edit eating 20`). D-07's rationale accepts it: "Players can replace their own saved game states and forge their own progress", with the same reasoning as spec decision 9's far-future moment and D-219's clock. Only the owner's game is affected, and `player-save-isolation` keeps it there.
- The second half of that sentence holds: reading the settlement changes no other key of the load. `deathSettlement` returns one value, and the switch of `Records.characters` to the read `Character` keeps `owner.archetypeId` for `characterSkills`.
- For the orchestrator: no change to the code is called for. A later handoff should carry the sentence as "refuses it whole where malformed", so the whole-change review does not chase a check that cannot exist.

**2. A forged top generation loads, and a real death then writes a number the next load refuses.**

- Place: `src/browser/sim/game.ts:447` (`const generation = died.generation + 1`), with `saved-game.ts:509`.
- What: `generation: Number.MAX_SAFE_INTEGER` loads, and a death with none ready writes 2^53.
- Evidence: scratch `s3_hostile.mjs`: `settled generation safe false`, `reload after false shape`. The executor named this.
- Why Minor: it takes a forged document, costs only its own player, and decision 9 admits the value (`an identity, from 1 up`). The load may refuse more than it does (`coding-saved-game.md`), but no requirement asks for it. Real play never reaches it.

## Declined to judge

- The clock's moment accessor and its call after each flush (spec decision 7, decision 10's row): the plan's *Choices*, `plan.md:287`, place them in Slice 5, which matches the executor's concern. Out of this slice.
- What the screens say of a settlement, the resurrection line and the generation label: Slices 4 and 5.
- `guidelines/coding-saved-game.md` not naming `deathSettlement`: `plan.md:288` leaves it, and what it says stays true of this change.
- A caller of `restart` or `end` on a death unsettled, which settles nothing: no caller in `src/` holds one, as the store never does. Spec decision 4's *Cost if wrong* gives that review to task 18.

## What was checked against the task and the foundation

- To do 10–17, spec decisions 4, 5, 6, the clock half of 7 and the `deathSettlement` row of 9: each read against the code and its test. `settleDeath` matches decision 4 step by step, the order of the `nowMs` check included.
- `restart` passes `{ ...state, run: null }` after `progressLost`; `startRun` and `programOf` read `state.run` only for the skills, and `startRun` replaces `run` in what it returns, so nothing else of the state differs. Confirmed by reading `src/browser/sim/game.ts:116-195`.
- A settled run cannot be reset: `advanceMinutes` returns before line 622 on an ended run, and `passRealTime` likewise, so the `deathSettlement: null` there meets only a run with no death.
- The store never holds a death unsettled: `passRealTime` and `advanceMinutes` are called in `src/` only from `clock.ts` and `game.ts`; `game-view.ts` holds no other way to game time. `Date.now()` is read in `clock.ts` alone, and `performance.now()` too. D-207 holds: `store.apply` returns at once on the very state. The re-entry of `flush` through `store.apply` → `saver.moment()` → `read()` finds the state already settled and returns the same state.
- `resurrection-renewal`, `death-settled-once`, D-190, D-04, D-200, D-212, D-213, D-119 and D-219: the code does what each says. The range changes no foundation entry.
- Irreversible operation: `SAVED_GAME_VERSION` stays 2 with no line of it in the range, `main` holds 1 (`git show main:src/browser/sim/saved-game.ts`, line 69), the range touches no file under `deploy/` or `src/server/`, and nothing was performed on a server. The rewritten document at version 2 stands under the exception of `coding-saved-game.md`, and its comment says so.
- The trust boundary: every malformed value I tried is refused as `shape`, the rows of `CRAFTED` and mine alike (see *Checks*). `oneOf` reads an own key, so `toString`, `constructor`, `hasOwnProperty` and `__proto__` are refused; `fields` refuses added keys, symbols included; `integer` refuses text, `NaN`, fractions, unsafe numbers and `1e400`.
- No user interface changes in the slice: `clock.ts` draws nothing, so the styleguide's states and screenshot evidence do not apply.
- The author's own-work check names the right weak point, the chain from the clock to the saved document, and its script would catch that requirement unmet. My sweep below repeats it independently.

Changed invariant tests:

- `tests/invariants/`: none changed, `test_minute_span_split.py` included.
- Case „a crafted document of the current version is refused whole as shape” (`// invariant: save-version`): gains the 31 rows of the settlement, and the rows „a cause of death off its list” and „a death in another game minute than the map run's” now build on `dead(document)`. Each stays refused for the reason its name gives, because that base loads in „a map run that ended comes back as it ended” and each row changes one value. No expectation is weakened.

## Checks

All in a detached scratch worktree of the head, `node_modules` linked from the reviewed worktree, except `foundation_check.py`, which needs `.the-way`. The scratch worktree is removed; the reviewed worktree stayed clean at the head.

| Command or method | Exit | Result |
|---|---|---|
| `npm run build` | 0 | |
| `npm run typecheck` | 0 | |
| `node --test tests/sim/death.test.mjs tests/sim/saved-game.test.mjs tests/sim/skills.test.mjs tests/sim/trip.test.mjs tests/view/clock.test.mjs tests/view/account-screen.test.mjs tests/view/game-saver.test.mjs` | 0 | 146 pass, 0 fail |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` | 0 | 784 pass, 0 fail |
| `npm test -- tests/invariants/test_minute_span_split.py` | 0 | 9 tests OK, file not in the range |
| `npm test -- tests/invariants/test_restart_seed.py` | 0 | 2 tests OK |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | 2 tests OK |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | 5 tests OK |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | 0 | 0 errors |
| Prettier `--no-config --no-editorconfig --ignore-path .gitignore --check`, the 8 files | 0 | |
| ESLint `--max-warnings 0`, the 8 files | 0 | |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/game.ts:359-375,src/browser/sim/game.ts:435-478,src/browser/sim/saved-game.ts:769-808,src/browser/sim/saved-game.ts:863-875,src/browser/sim/saved-game.ts:951-955"` | 0 | 86 mutants: 81 killed, 5 survived |
| Hand mutants of the built `clock.js` (`s3_clock_mutants.py`), against `tests/view/clock.test.mjs` and `tests/view/account-screen.test.mjs` | 0 | 10 of 10 fail a test |
| Scratch `s3_hostile.mjs`: crafted settlements through JSON text and `restart` after them | 0 | see Minor 1, 2; eight malformed rows refused as `shape`; a settlement read against another character's generation refused, and a second character's own loads |
| Scratch `s3_branch.mjs`: a character with a bought branch through four deaths, `Restart` and `Zakończ`, a save and a load after each step | 0 | settlements `progressLost` 2, `progressLost` 3, `resurrectionUsed`, then generation 4; moment of readiness unchanged through the deaths with none ready and T + 8 h after the used one; rank 1 on the run on the screen and 0 on the team; `Restart` rank 0 with „Obchód” kept in the copy; every step loads |
| Scratch `s3_sweep.mjs`: the real `startClock` over real games, every map, three programs, solved and not, two paces, `Restart` and `Zakończ` in turn, each state the store takes saved and loaded | 0 | 8489 states, 432 deaths (162 used, 270 lost), 0 unsettled, 0 refused |

The five surviving mutants, classified as `guidelines/testing.md` asks:

| Place | Mutant | Class and reason |
|---|---|---|
| `game.ts:360` | the name in `requireRun` | not worth pinning: text of an error (Behaviour, not implementation) |
| `game.ts:440` | the text of the `RangeError` | not worth pinning: the same; the case asserts the type |
| `game.ts:475` | `events` of a real settlement | not worth pinning: the spec gives no events, and the clock hands the store those of `passRealTime` |
| `saved-game.ts:867` (two mutants) | the refusal of a map run's character the team lacks | equivalent: without it, `owner.archetypeId` throws, and the `catch` of `loadSavedGame` gives the same `shape` |

Not run or not reached:

- The product's gate: the orchestrator's, by the handoff.
- A death in the very game minute of a discovery was not reached by my sweep (`discoveryDeaths` 0). The new check reads `ended.death` alone, so the path holds by reading, not by a run.
- A map run ending in a completion was not reached by my sweep either (`completions` 0); `tests/sim/saved-game.test.mjs` covers it.
- Nothing in a real browser: the slice draws nothing, and `tests/view/account-screen.test.mjs:1551` carries the real `createGameView` through a tick to the save.

## Reaches beyond the dispatch

- `foundations/decisions.md:160-185`, D-07, to weigh Minor 1 and 2.
- `git -C C:/Storage/repos/loop show cdc7c0d:src/sim/death.ts` and `:src/sim/death.test.ts`, named in the plan's *Read*, to compare `settleDeath` with loop.
- `src/browser/view/game-view.ts:95-217`: beyond the handoff's `:101-180`, for the handlers of „Restart” and „Zakończ”.
- `src/browser/sim/saved-game.ts` beyond the diff, for `fields`, `own`, `oneOf`, `integer` and `loadSavedGame`.
- `.runs/task-cycles/rozliczenie-przejsc/plan.md:279-293`, *Choices*, as the handoff points.
- `stryker.config.json`, to confirm `tests/sim/death.test.mjs` is listed.

## Searches not found or unclear

- Unclear: the handoff's "a forged settlement cannot give a player back what a death took" against spec decision 9 and D-07. Weighed in Minor 1: the code meets the spec, and the sentence asks more than a load can check.
- The line numbers of `tests/sim/saved-game.test.mjs` in the plan's *Checks* have moved, as the executor says. I found each case by its name; all stand as the plan asks.
- `tests/view/account-screen.test.mjs:1546` in the handoff stands now at about `:1551`; the case is „a game minute that ends the map run in a death is saved at once, settled”.
- Scratch files are in `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\c314912b-7ac2-4f4a-8da9-b410276885ee\scratchpad\`: `s3_hostile.mjs`, `s3_branch.mjs`, `s3_sweep.mjs`, `s3_clock_mutants.py`, `s3_clock_mutants.out`, `stryker-s3.log`.
