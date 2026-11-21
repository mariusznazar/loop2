# Report — executor of slice 6 (correction 1), task `ocena-programu-na-ziarnach`

**Status:** done

## Commits

- `d0cf581b` feat: :sparkles: have the screen Mapy read the mark beside the list "Program:" from the judging cache and have its judging give the record to the cache inside the act of the store … (D-440, D-441, D-409, D-323) — on base `d84a5958`.

## Files changed (added / removed lines)

- `src/browser/view/maps-entry.ts` — 34 lines touched. The entry takes `judgingCache?: JudgingCache` as an option and `halted` from the store; its props give the screen `readRecord(ids)` (the cache's `read`, or null with no cache). `judge` runs `store.act(() => { judgeAndRecord(store.get(), ids); if (!store.halted()) judgingCache?.remember(ids, done.record); … })`. The act body takes no result, so the store saves nothing for it. „Puść w pętlę” judges through the same control, so its judging replaces the cached one.
- `src/browser/view/maps-screen.tsx` — 17 lines touched. `MapsScreenProps` gains `readRecord(ids): JudgingRecord | null`; each row of „Kto idzie” draws `markOfRecord(state, triple, props.readRecord(triple))`, read at every draw. `judgingMark` and `state.judgings` are no longer read by the screen.
- `tests/view/maps-screen.test.mjs` — 422 insertions / 156 deletions in all three files together.
- Totals of the commit: 3 files, +422 −156.

## Tests: written first and seen failing

`npm test -- tests/view/maps-screen.test.mjs` before the code: exit 1, 11 cases failed, each for the expected reason (no mark from the cache: `expected [["szczelny: 12 z 12","positive"],null], got [null,null]`; entry: `no result is taken, so nothing is saved: expected 0, got 1`; `cache.read` returned null because nothing was given to the cache). After the code: exit 0, 49 tests, 0 fail.

Cases changed (reason: remark 1 of the human and D-441/D-440 — the mark now comes from the cache, not from `state.judgings`; `guidelines/testing.md`, „Changing an existing test”): the mark case („beside the list „Program:” …”), the stock-note case, the role-from-stylesheet case, and the two entry cases (the first-click case of „Puść w pętlę” and the judging act case). Their expectations are kept (badge, „{n} z 12”, note on the stock, the pick of the list); only the source of the record changed; the entry cases now check that the store took no result (nothing to save) and that the game state is the very state. The `decision:` lines of D-440 are quoted word for word as they stand; one new line quotes D-441 („A remembered judging stands beside the list „Program:” only while …”) and one D-323.

New cases: a judging remembered and shown again by a screen built anew on the same storage (reload), an empty storage showing no mark until a judging; no mark for the same triple under another account or another game's moment; no mark after an edit changing the content, after the content is changed back (through the real `editProgram`), or after the character's generation grows; a judging another tab wrote shows at the next draw; nothing remembered after the store halted (result still shown); an entry with no cache remembers nothing and shows no mark. The cache in the cases is the real `openJudgingCache` on a Map-backed stand-in storage the case gives.

Mutation checked by hand: replacing `if (!store.halted())` by `if (true)` fails exactly the halted case (exit 1, 1 fail); restored before commit.

## Checks (command, exit code)

- `npm test -- tests/view/maps-screen.test.mjs` — 0 (49 pass)
- `npm test -- tests/view/judging-lines.test.mjs` — 0
- `npm test -- tests/view/uncaught-failure.test.mjs` — 0
- `npm test -- tests/invariants/test_content_identifiers.py` — 0
- `npm test -- tests/invariants/test_cross_part_imports.py` — 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` — 0
- `npx eslint` on the three files — 0
- `npx prettier --check` on the three files — 0 (after `--write`)
- typecheck: the build of each `npm test -- <file>` runs `tsc` and passed (exit 0); a separate `npx tsc --noEmit -p .` found no `tsconfig.json` at the root and was not the project's way — not relied on.
- size rules: `node tests/quality/eslint-size-rules.mjs` printed no line for the changed files.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 1 with 5 errors, all in `tests/sim/saved-game-judgings.test.mjs` (lines 111, 124, 170, 257, 304: quotations of D-440 and D-165 standing in no binding sentence) — a file this slice did not change (Slice 9's); no error in my files.
- Not run: the full gate (forbidden), `tests/view/account-screen.test.mjs` (the handoff forbids; it counts the save of a judging and is Slice 7's).

## Own-work check

Requirement: the judging is remembered inside the same act, before the screen's one draw, never after the store halted, and takes no result into the store (spec Decisions 6, 9; D-323, D-409). Weakest point: the order inside the act and the halted guard. Check: the first entry case asserts one `act`, `taken.length === 0`, the very state, the record in the cache with the program's content revision and the character's generation, one stored value, and the mark standing in the screen's first draw after the act; the halted case asserts nothing stored (and fails when the guard is removed, see above). Result: all pass. A second weak point is the cache being read once instead of at each draw: the case of a second cache writing to the same storage, shown at `drawReading`, covers it.

## UI check and walkthrough

- Screenshot: unchecked. Until Slice 8 the page gives the entry no cache (`game-view.ts` still calls `createMapsEntry({ store })`), so the running game shows no mark at all (the planner's recorded gap between Slices 6 and 8); there is no way to pass a stand-in cache into the running page without changing a file outside this slice. The components that draw the mark (`JudgingMarkLine`) and the styles are unchanged; their states stand in the role case of the test file, which passes. No browser was opened, no screenshot kept.
- Walkthrough: the change alters what a user sees in the running product only as the planned gap (no mark and no remembered judging until Slice 8 gives the page the cache); all cases of a walk of the finished behaviour are unchecked for that reason, to be walked at Slice 8. The result of a judging under the character and the loop start are unchanged and covered by the tests above. Side observations: none.

## Reach beyond the handoff

- Read `src/browser/view/state-store.ts:104-211` (beyond the named 56-104) to confirm that an act whose body calls no `take` saves nothing, and `src/browser/sim/programs.ts` (`editProgram`, `withProgramSaved`) to use the real edit in the test. Read `.the-way/task-cycle/change/slice.md`, `ui_check.md` and `walkthrough.md` (named by the method).
- `src/browser/view/game-view.ts` was not changed (Slice 8). The first run's `judgeAndRemember` and `judgingMark` stay in the simulation (Slice 9); `tests/view/account-screen.test.mjs` imports `judgeAndRemember` and was left alone.

## Choices

- The way to read the record reaches the screen as a function in its props (`readRecord`), required in `MapsScreenProps`, supplied by the entry; rejected: a cache object in the props (the screen would know the cache type) — cost if wrong: a one-line change of the props.
- `store.act` is given a body with no `take` argument (the judging needs none); rejected: calling `take(done)` with the same state (a no-op in the store, but it would read as if the act took a result).
- Tests build the real cache on a Map storage defined in the test file (`mapStorage`) rather than reusing the one of `judging-cache.test.mjs`, which is a private helper of that file.

## Mismatches of plan and code

- Small: the plan's "stored in the same act body" matches; the handoff's range of `state-store.ts` (56-104) was enough for the `halted`/`act` types. No structural mismatch.

## Class of model

The class `same` sufficed.

## Unread material

- `guidelines/styleguide-browser-view.md` and `guidelines/testing.md` were read whole (in pages). `guidelines/coding.md` and `coding-browser-module.md` read whole. `.runs/task-cycles/.../spec.md` and `task-frozen.md` not opened (the passages were copied in the handoff). `foundations/decisions.md`: D-440, D-441, D-409, D-323 read whole; D-243, D-329, D-325 not re-read (only their existing quotation lines in the test were left as they stood and the foundation check shows no error for them). None otherwise.

## Searches not found or unclear

- The foundation entry named "row 1" of the plan (the new entry on where the game keeps the last judging) is D-441 in `foundations/decisions.md:11924`; found by heading. None unclear.

## Working copies

Stood in `.runs/executor-c1-6/` (note: the handoff names `.runs/executor-6/` in one line and `.runs/executor-c1-6/` is the one I used; both are directly under the ignored `.runs/`): the red and green test outputs, the commit message file, a script copy of the entry file. Removed before returning; none remain.
