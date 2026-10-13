# Slice 5 review — game functions, time flow, S1/S2 checks (92143f3..64c522d)

## Part A — task review

### Spec Compliance

- ✅ Spec compliant. Every file the brief's *Change* names has its hunk. The eight functions match the spec § 4.3 table:
  - `newGame`: `src/browser/sim/game.ts:95`.
  - `setProgram` validates against the closed list (§ 4.5) and leaves `run` untouched: `game.ts:103-105`, `game.ts:70-78`.
  - `send` refuses a second run and ids that are not own keys of the data: `game.ts:108-117`.
  - `restart` keeps `run.seed` and `lastSeed` and takes the current program: `game.ts:120-124`.
  - `end`: `game.ts:127-130`.
  - `passRealTime` follows the § 4.3 formula and ignore rules: `game.ts:143-151`.
  - `advanceMinutes` uses the current program and also works while paused: `game.ts:154-168`.
- Task items 3, 4 and 8 and the foundation decisions hold:
  - D-04/3: the functions are pure, real time arrives only as an argument, and there is a function of a span of game minutes.
  - D-10/1: a program change never touches `run.current`.
  - D-11/1: one game minute per real second, with pause.
  - D-12/1: Restart keeps the seed, and each send chains `lastSeed`, so every send takes a new seed.
  - D-08/1: no content id or number is written in `game.ts`. The resource lists are read from `MAPS` (`game.ts:25-28`).
- The § 9.1 tests are all present: time, flow, purity, S1, S2 and the data validation (`tests/sim/data.test.mjs:65-140`).
- ⚠️ Cannot verify from the diff:
  - That the S1 and S2 scans pass on the real tree. The report says 103 of 103 tests passed.
  - That the view (later slices) calls only these functions.

**Ledger ruling** (`advanceMinutes` throws `RangeError`): accepted on its merits.
- `Infinity` would loop forever, and a fractional minute has no meaning.
- `passRealTime` only ever passes whole numbers from 0 up, so no player path can reach the throw.
- The throw also fires when there is no run (`game.ts:155-158` comes before the no-run check). That is consistent with treating a bad span as a programming error.

### Strengths

- Validation builds a fresh copy of the program from the closed list (`game.ts:70-78`), so a caller that mutates its object later cannot reach the state. This is tested at `tests/sim/purity.test.mjs:64-70`.
- `Object.hasOwn` rejects `toString` and `__proto__` (`game.ts:111-114`, tested at `data.test.mjs:128-140`).
- The purity test deep-freezes every input and also compares against a JSON copy (`purity.test.mjs:52-62`). That is real behaviour, not a mock.
- The time tests pin the carry across calls, the pause with its carry, and the equality of 1000 ms in one call with 1000 calls of 1 ms, for both state and events (`tests/sim/time.test.mjs:21-81`).
- The S1 and S2 scans have positive and negative controls (`tests/sim/rules.test.mjs:188-261`). The report also shows a probe that made the real-tree scans fail.

### Issues

#### Critical (Must Fix)
None.

#### Important (Should Fix)
None.

#### Minor (Nice to Have)

1. `tests/sim/rules.test.mjs:180` — the S2 file set covers `sim/**` (outside `data/`) and `view/**`, but not `src/browser/main.ts`.
   - Spec § 3 binds S2 to all code outside `sim/data/`; § 9.1 names only `sim/**` and `view/**`.
   - A later slice will write `main.ts`, and a literal id there would go unseen.
   - Fix: add `src/browser/main.ts` to `s2Files`.
2. `tests/sim/rules.test.mjs:173-175` — the S2 identifier scan (no identifier token equal to a content id) is stricter than the spec's wording.
   - It catches `MAPS.forest`, which is good.
   - It will also fail on an innocent view variable named like an id, such as `moss`. The report says so openly.
   - Keep the scan, and expect that a view author may have to rename such a variable.
3. `src/browser/sim/game.ts:115` — `send` does not validate `realMs`. A `NaN` is coerced inside `mixSeed`.
   - The seed still changes, because it chains `lastSeed`, and the spec does not ask for validation.
   - § 8 ignores clock oddities in `passRealTime`; `send` could refuse a non-finite `realMs` in the same way.

### Assessment

**Task quality:** Approved

**Reasoning:** The functions follow spec § 4.3, § 4.5 and § 4.6 line by line, are pure and are well tested. The four invariant checks pass on HEAD and each one fails on a break of its own sentence (Part B). Only minor coverage gaps remain.

## Part B — deliberate breaks (WAY-69, WAY-08)

**Setup.** Each break ran in its own copy under `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\cdeb45b6-2a6f-46b3-9ad7-de2ce102c613\scratchpad\breaks\<invariant>\`, alongside one unbroken copy in `breaks\baseline\`. Each copy holds:
- the tracked files, exported with `git archive HEAD` (64c522d);
- `node_modules`, copied from the worktree;
- `.the-way`, copied from the worktree at the pinned commit d04c3feb (its `.git` link removed);
- an empty `git init`, because `listed_files` needs `git ls-files`.

**Deviation from the requested command.** `run_tests.py` accepts only a directory: given a file it prints "is not a directory" and exits 2. So each copy holds `tests/only_<name>/` with that one check and `loop2_invariant_support.py`, both copied unchanged. The command, run from the copy's root, was:

```
python -B .the-way/gate/run_tests.py tests/only_<name> --record .runs/<file>.jsonl
```

The worktree was not touched.

| Invariant | Break (file — change) | Unbroken copy | Broken copy |
|---|---|---|---|
| `map-run-repeatability/1` | `src/browser/sim/run.ts:45` — the Wędruj target index adds `Date.now() % 1000 / 1000` to the draw (a hidden clock input) | `Ran 3 tests … OK`; 3 × pass | `FAILED (failures=2)`. Fail: `test_two_processes…` ("the two processes differ at step 22 (passRealTime), game minute 20") and `test_restart…replays_the_run` ("the replay differs at input 19, game minute 20"). Pass: the controls test |
| `simulation-randomness/1` | `src/browser/sim/run.ts:45` — the Wędruj target is picked with `Math.random()` instead of `draw.value` | `Ran 4 tests … OK`; 4 × pass | `FAILED (failures=3)`. Fail: static scan ("run.ts names Math.random"), dynamic run ("a replaced source of random numbers was called: Math.random") and the seed control. Pass: the scan-control test |
| `action-in-progress/1` | `src/browser/sim/game.ts:104` — `setProgram` with a run sets `current.endMinute = run.minute + 1`, so a program change cuts the running action short | `Ran 2 tests … OK`; 2 × pass | `FAILED (failures=2)`. Fail: the main test (at the minute after the change, the activity is a wander by rule 0, not the exploration by rule 1) and the controls (`startMinute` 21 ≠ 25) |
| `player-map-run-pace/1` | `src/browser/sim/game.ts:144` — `state.paused ||` removed from the ignore condition of `passRealTime` | `Ran 2 tests … OK`; 2 × pass | `FAILED (failures=1)`. Fail: `test_whole_unpaused_seconds…` ("10 != 9 : game minute after input 14, ["passRealTime", 1000]"). Pass: the control, which has no pause, as intended |

**Verdict.** Each of the four checks fails on a break of its own sentence and passes on the unbroken copy. No check passed on its break, so there is no Important finding from Part B.

Records:
- breaks: `breaks\<invariant>\.runs\break.jsonl`
- unbroken copy: `breaks\baseline\.runs\base_<name>.jsonl`

The copies are left in place.
