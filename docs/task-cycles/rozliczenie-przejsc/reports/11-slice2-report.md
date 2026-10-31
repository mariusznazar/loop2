# Report — Slice 2, A character has a generation and a resurrection

**Status:** done

**Commit:** `8949515` on `task/rozliczenie-przejsc` (address mariusznn@gmail.com). Worktree clean.

## Files changed (added / removed lines)

- `src/browser/sim/data/balance.ts` 5/0 — `resurrectionRenewalRealMinutes: 480`
- `src/browser/sim/types.ts` 7/1 — `Character.generation`, `Character.resurrectionReadyAtMs`; `RunCharacter` untouched
- `src/browser/sim/game.ts` 13/0 — exported `resurrectionReady(character, nowMs)` (`<=`); `createCharacter` sets 1 and 0
- `src/browser/sim/saved-game.ts` 5/0 — `team` reads `generation` as `identity` (from 1), `resurrectionReadyAtMs` as `integer` (any sign); both keys required, no fill-in
- `tests/sim/death.test.mjs` 49/0 (new) — before / at / after, a negative moment, a new character ready from the start, generation 1; `// invariant: resurrection-renewal`
- `tests/sim/data.test.mjs` 6/0 — pins 480, cites loop `balance.ts:125`
- `tests/sim/team.test.mjs` 7/0 — expected values at `:53` gain the two keys (To do 8)
- `tests/sim/saved-game.test.mjs` 67/2 — DOCUMENT and HEADQUARTERS characters gain the keys (version stays 2, exception comment extended); 15 rows in `CRAFTED`; a load case for a moment below zero
- `stryker.config.json` 1/0 — lists `tests/sim/death.test.mjs`

## Checks (command, exit code)

- Failing run first: `npm test -- tests/sim/death.test.mjs` with `resurrectionReady` as a stub returning wrong values — exit 1 (assertion failures: `true !== false`, `false !== true`); after the implementation — exit 0 (4 pass).
- `npm run typecheck` — 0
- `npm test -- tests/sim/death.test.mjs` — 0 · `data.test.mjs` — 0 (32) · `team.test.mjs` — 0 (7) · `saved-game.test.mjs` — 0 (17)
- `npm run build` — 0
- `npm test -- tests/quality/test_mutation_test_selection.py` — 0 · `test_node_test_selection.py` — 0
- `npm test -- tests/invariants/test_character_team.py` — 0 · `test_simulation_inputs.py` — 0
- `python -B .the-way/elements/common/foundation_check.py` — 0 ("0 errors")
- Beyond *Checks*: `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` after the build — 0 (756 pass, 0 fail)
- Prettier `--check` (no config) on all changed files — 0; ESLint `--max-warnings 0` on all changed files — 0
- Not run: the full gate `npm test` (the orchestrator's); StrykerJS (the reviewer's per testing guidelines).

## Own-work check

Requirement most likely unmet: the trust boundary — a forged or malformed `generation` or `resurrectionReadyAtMs` must refuse the document whole, and a legitimate negative moment must load.
Check: two temporary mutations in `saved-game.ts`, both reverted before commit (diff of that file is only the 5 added lines).
- `identity(generation)` changed to `integer(generation)` — `npm test -- tests/sim/saved-game.test.mjs` failed on "a generation of 0" (exit non-zero); restored, exit 0.
- `integer(resurrectionReadyAtMs)` changed to `count(...)` — failed on "a moment of resurrection below zero loads…" (exit 1); restored, exit 0.
The round-trip test "a game state the simulation made loads back…" passes with characters made by `createCharacter`, so everything this slice's game saves loads back.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` (named by SKILL.md section 1 for a slice). No other reach; no foundation entry beyond those named was needed.
- Test files outside *Change*: none needed a new key (all 756 sim and view tests pass unchanged).

## Choices

- The new `Character` keys are required fields in the type and in the strict load (as decision 9 gives); the moment is `integer` with no check against a clock (D-212).
- The stub used for the first failing run was `character.resurrectionReadyAtMs < nowMs - nowMs`, replaced before commit by `<=`.
- `generation` stays at most "any identity" at the load; the link to a run's `deathSettlement.generation` belongs to a later slice (decision 9 row for `deathSettlement`).
- Added two small doc comments (type, balance) in English; the balance comment names the real-clock reason from loop.

## Problems / concerns

None observed.

## Searches not found or unclear

none
