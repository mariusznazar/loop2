**Status:** `done`

# Slice 8 — the tests of death, completion and data hold the uses (executor report)

Worktree: `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`, base `f2c9c335`.

## Commits

- `3c621606` — `test: :white_check_mark: hold the death, completion, flow and data tests to the resurrection of three uses ...` (4 files, committed by path).

## Files changed

| File | Added | Removed |
|---|---|---|
| `tests/sim/death.test.mjs` | 147 | 118 |
| `tests/sim/completion.test.mjs` | 67 | 40 |
| `tests/sim/flow.test.mjs` | 2 | 1 |
| `tests/sim/data.test.mjs` | 6 | 5 |

No file outside the slice's *Change* was touched; no code under `src/` changed. `death.test.mjs` was rewritten with `Write` and then formatted with Prettier; untouched cases were carried over verbatim, but the diff is large, so a reviewer should read the whole file rather than the hunks.

## What changed, in short

- The team's shape in the tests is now `resurrectionUsesSpent` and `resurrectionNextReturnAtMs`, not `resurrectionReadyAtMs`. Helpers: `withResurrection(state, spent, nextMs)` and `usedUp(state, returnMs)` (3 spent, one use due at `returnMs`) in `death.test.mjs` and `completion.test.mjs`. The old "ready from X" becomes "used up, one use due at X".
- The renewal constant is 240 real minutes (14 400 000 ms), not 480 (28 800 000 ms), in `death.test.mjs` and `completion.test.mjs`.
- A death with a full stock spends one use, leaves two, and sets the next return 4 hours after the death. A death with no use left takes all practice and ranks and raises the generation (as before). A death of a character with no practice leaves the team as it stands.
- Save/load and "the used-up team, one use left, then two deaths" cases were rewritten to the count-and-moment model; `resurrectionAt` is imported in `death.test.mjs` for the save/load case.
- A first completion returns one use while the stock is not full, and the clock runs on as it was (`completion.test.mjs`).
- `flow.test.mjs`: a new game's team holds `resurrectionUsesSpent: 0` and `resurrectionNextReturnAtMs: null`.
- `data.test.mjs`: the test now asserts `BALANCE.resurrectionUses === 3` and `BALANCE.resurrectionRenewalRealMinutes === 240`, with the D-190 sentence "The account has one resurrection, ... 3 uses and 4 hours to start." as its `decision:` line.
- Every `decision:` line that quoted D-189, D-190, D-214 or D-220 now quotes the binding sentence as it stands. Quotations are the first clause of a binding sentence, which the checker accepted (see the checks).

## Checks

Baseline before my edits (the failing run that shows the cases were out of step with the code):

- `npm test -- tests/sim/death.test.mjs` — exit 1 (before the edit: about two dozen failing cases, e.g. `resurrectionReadyAtMs` undefined, `RangeError: NaN is not a safe integer moment` from `usesAt` under the old fields).
- `npm test -- tests/sim/completion.test.mjs` — exit 1 (3 failing cases before the edit).
- `npm test -- tests/sim/flow.test.mjs` — exit 1 (1 failing case).
- `npm test -- tests/sim/data.test.mjs` — exit 1 (1 failing case).

After the edits, each focused check:

- `npm test -- tests/sim/death.test.mjs` — exit 0, 33 of 33 pass.
- `npm test -- tests/sim/completion.test.mjs` — exit 0, 27 of 27 pass.
- `npm test -- tests/sim/flow.test.mjs` — exit 0, 12 of 12 pass.
- `npm test -- tests/sim/data.test.mjs` — exit 0, 37 of 37 pass.
- `npx prettier --check` on the four files — exit 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 1; **no error for the four files of the slice.** The errors that remain are in `tests/sim/catch-up.test.mjs` and `tests/sim/loop.test.mjs`, which belong to slice 9, as the plan says.
- Not run: the full gate `npm test` (out of scope for the executor, per the handoff); `check_instructions.py`; the mutation tool (`testing.md` routes it to the reviewer).

The failing run of each invariant case: the `resurrection-renewal` cases (`death.test.mjs`, `completion.test.mjs`) were in the baseline failing run above, under the old shape. I did not do a separate break-the-code run, since this slice changes no code and the cases now pass against the code as Slice 6 left it.

## Own-work check (requirement of the slice)

- Requirement: "each `decision:` line quoting a sentence of D-189, D-190, D-214 or D-220 quotes it as it stands now" and "each case that cites `resurrection-renewal` holds the sentence as reworded".
- Check: the foundation check run above, and a reading of each rewritten case against the D-190 sentences and the `resurrection-renewal` invariant text. The checker reports no quotation error in the four files.
- Result: clean for the four files.

## Walkthrough

Not needed: the change alters no behaviour a user sees; it changes tests only.

## Fault of Slice 6

None found. Every rewritten case agrees with the code of Slices 1–7 as it stands.

## Choices made, with the way rejected

1. **The old "ready from X" maps to "used up, the one use due at X"** (3 spent, next = X). Rejected: keeping a separate "ready" field, which the shape no longer has. Cost if wrong: low; the mapping is local to the test helpers.
2. **The save/load case starts from a used-up team with no death** (`withSaveTime(usedUp(team(), ...))`). Rejected: settling a first death, since that cannot reach the used-up state. Cost if wrong: if the loader refused a state with no run, the test would fail at load, which it does not.
3. **"Any character with practice uses one use, the next death of any other takes everything"** starts from 2 uses spent with the return at T0+R, so the second death finds 3 spent. Rejected: a chain of four deaths. Cost if wrong: the test covers one step less of the chain.
4. **Quotations are the first clause of each binding sentence**, not the whole sentence. The checker accepts them. Rejected: the whole sentence, which is long and adds nothing to what the case holds.
5. **Completion at a moment below zero, expectation changed by me during the edit.** My first expectation (one use used up at -5 000, with the completion at -5 000, leaving 2 spent) was my own arithmetic error: the clock's return due at that moment and the completion's return both count, which gives 1 spent. I rewrote the case so the use is due at +240 min (`RENEWAL_MS`), which gives 2 spent and keeps the moment at `RENEWAL_MS`. The code is not at fault. Flagged as a changed expectation so the reviewer can check it against D-190 ("returns one use at once ... the clock running on as it was").
6. **`data.test.mjs` title and assertions** now name 3 uses and 240 minutes, from the balance data.

## Problems as observed

- None in the code. Note for the reviewer: a completion at the very moment the clock returns a use gives both returns (spent 3 → 1 with one use still due at the old moment). That follows D-190 as written; it is not tested in this slice, since no case of the plan asks for it.

## Reaches beyond the dispatch

- `decision_index.py --output <worktree>/.runs/slice-08-executor/index.md --decision D-189 --decision D-190 --decision D-214 --decision D-220` — run as the reading note asks. The index was used to confirm the sentences; the index file was removed after use (see working copies).
- `foundation_check.py` lines 74–85 read to confirm how a binding sentence and a quotation are matched. This is a tool, not a named file.

## Working copies

- `.runs/slice-08-executor/` (inside the worktree's `.runs/`): held `index.md` (the decision index above). Removed with `rm -rf` by its full path, and the directory removed too. The removal succeeded.
- Test logs written as `.runs/slice-08-executor-{death,completion,flow,data,foundation}.log`: removed by `rm -f` with full paths. Removal succeeded.
- Nothing kept in `reports/` beside this report.

## Unread material

- `foundations/part_map.md:33-64` (simulation part) — named in the handoff's *Read*; not read.
- `task.md` and `plan.md` — not read; I used only the passages the handoff copied (`task.md` lines 31, 55–72).
- `foundations/decisions.md` D-221 (6371) — read only to about line 6400; the rest of the entry, to the next heading, not read.
- D-189 (8532) and D-214 (5868) — read through the decision index's binding paragraph, not the whole entry (Rationale and the other fields not read).
- `src/browser/sim/game.ts` — read at lines 70–131 and 615–815 (the death, completion, renewal functions and `advanceMinutes`/`passRealTime`); lines 134–614 and 815 onward not read.
- `guidelines/coding.md` and `guidelines/testing.md` — read whole.
- `src/browser/sim/types.ts`, `src/browser/sim/data/balance.ts` — read whole.
- D-194 (7066) — read whole. D-190, D-219, D-220 — read whole. `resurrection-renewal` and `death-settled-once` (invariants.md) — read whole. Glossary `resurrection` — read whole.

## Searches not found or unclear

- The handoff gives `foundations/decisions.md:7044-7062` for D-194. At that line is D-193; D-194 is at 7066. Found by identifier, as the handoff allows.
- No leftover `resurrectionReadyAtMs`, `readyFrom`, `readyAt`, `fallen(` helpers or `480`-minute constants remain in the four files (grep before the commit).

## Questions

None blocking. Two points for the orchestrator's review:

1. Whether the completion-at-return-moment case (item 5 above) should be a test in a later slice. I did not add it.
2. The size of the `death.test.mjs` diff (147 added, 118 removed, the file written whole).
