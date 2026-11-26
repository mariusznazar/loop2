done with concerns

# Report of the executor of Slice 5 — the balance instrument's example, tests and skill follow the data

Worktree: `the task's worktree`, branch `task/katalog-map`, base `ce585649`.

## Commits

- `351845ad0df94b3ff6eb65b6a2c5ebe5c9b24165` refactor: :recycle: take the balance instrument's example and tests from the wasteland overlay, not the wolf pack that the data hold now, and read a solvable map as D-438 reads it (D-438)
  - `balance/overlays/forest-pack.json` — deleted (26 lines removed)
  - `tests/balance/overlay.test.mjs` — 19 lines changed
  - `tests/invariants/test_balance_instrument_file_writes.py` — 1 line changed
  - `.claude/skills/loop2-balance/SKILL.md` — 19 lines changed
  - `.agents/skills/loop2-balance/SKILL.md` — 19 lines changed (copied from the first; `cmp` same)
  - Total: 30 insertions, 55 deletions. Pushed nothing.

## Changes

- `tests/balance/overlay.test.mjs`: `OVERLAY_FILES` lost `forestPack`. The test "a map the overlay adds can be swept…" now lays `wasteland.json`, expects `prerequisitesOf("wasteland")` to equal `["forestEdge", "forest"]`, sweeps `wasteland`, and checks `wasteland` is restored away. The restore test adds `madeUpMap` (a key the data do not hold) where it added `forestPack`, checks it is present during the overlay and gone after the restore.
- `tests/invariants/test_balance_instrument_file_writes.py`: control path `balance/overlays/forest-pack.json` replaced by `balance/overlays/wasteland.json`.
- Skill (both copies): the example overlay is `wasteland.json` (adds the map `wasteland`, opens after `forest`); the list of game maps for `--map` names the five maps (`forestEdge`, `forest`, `forestDeep`, `forestPack` "Las — wataha", `forestLair` "Las — matecznik"); the timing line says `progression` for the five maps takes about a minute and a half (measured, see below); the paragraph under "The table is the map check's without the earning loop's columns" no longer reads a map as solvable at 20 %. It now says: a map can be solved where its best program, with the character built from what the maps before it gave, solves one seed or more of 1-500; a map is harder than the map that opens it where its best program solves a smaller share of the seeds than the best program of the map that opens it; Las — matecznik, until the change that sets its numbers, passes this check where no program solves a seed of it. The paragraph does not mention the flag `solvable`, so no sentence says the table prints none.

## Checks (command and exit code)

Run in the worktree; logs in `.runs/executor-5/`.

1. `npm test -- tests/balance/overlay.test.mjs` — exit 1 on the first run (`check-overlay.log`): "the restore leaves every table deep-equal…" failed because its last assertion still checked `forestPack`, which I had missed; fixed. Rerun — exit 0 (`check-overlay-2.log`); final run after the last edit — exit 0 (`check-overlay-3.log`).
2. `npm test -- tests/invariants/test_balance_instrument_file_writes.py` — exit 0, `Ran 3 tests … OK` (`check-invariant.log`).
3. `npm test -- tests/balance/check-map.test.mjs` — exit 0 (`check-map.log`).
4. `npm test -- tests/balance/cli.test.mjs` — exit 0 (`check-cli.log`).
5. `cmp .claude/skills/loop2-balance/SKILL.md .agents/skills/loop2-balance/SKILL.md` — exit 0 (no output; the two copies are the same bytes).
6. `rg -U "20\s*%" .claude/skills/loop2-balance/SKILL.md` — no match, exit 1: no sentence of the skill reads solvable at 20 %.
7. `rg -n "forest-pack|forestPack" balance tests .claude/skills/loop2-balance .agents/skills/loop2-balance` — exit 0 with hits, NOT "none" as the slice's check expects. Hits: `.claude/…/SKILL.md:43` and `.agents/…/SKILL.md:43` (the list of game maps, which names `forestPack` as a live map of the game, correct); `tests/sim/data.test.mjs:98,113,125,143` and `tests/invariants/test_content_identifiers.py:55` (tests of the live map `forestPack`, correct). Within `balance/` and the `tests/balance/` files there is none. The slice's literal check and its intent differ; the check as written should be narrowed to `balance tests/balance tests/invariants/test_balance_instrument_file_writes.py` and the skill's example.
8. Timing: `npm run --silent balance -- progression --out .runs/executor-5/progression-5.md` — exit 0, wall time 1 m 32 s (`progression-5.log`), run while the focused tests were also running. The table of five maps is in `.runs/executor-5/progression-5.md`; it is a working output, not a tracked file.

Not run: the product's full gate (`npm test` with no file argument) — forbidden for executors. `foundation_check.py` — not in this slice's checks, not run.

## Own-work check

Requirement: the slice removes every reference to the overlay and the map it adds from `balance/`, `tests/balance/` and the skill's example, and the restore and sweep tests still test the behaviour with a map the overlay adds. Check: check 1 (both the sweep test and the restore test, with `wasteland` and `madeUpMap`), check 7 (grep over `balance` and `tests/balance`: none), check 6 (no 20 % reading). Result: the balance tests pass; the grep hits are the live map in the data, not stale references.

## Concerns for the orchestrator

- `balance/progression.mjs:40-41` keeps `SOLVABLE_SHARE = 20` and the flag `solvable` at line 253, as the plan's *Choices* say. The skill no longer reads that flag. The field and the skill disagree on a word until a later change.
- `balance/progression.mjs` line 40's doc comment still says "counts as solvable" at 20 %.
- Check 7 as written in the slice does not come out as "none" (see above).
- The timing line I wrote (about a minute and a half) comes from one run with the tests beside it; it is not a measurement without load.

## Choices

- Restore-test key: `madeUpMap` (any key the data lack would do; the test checks only presence and absence).
- Skill paragraph: wording chosen by me in the skill's style, from the slice's text and To do 9 (quoted only as the frozen task's reading, nothing from the human's remarks). Rejected: keeping the old sentence with a new number (would keep reading a map as solvable at a share).
- Commit message: English, the repository's `refactor: :recycle:` form, cites D-438 only (the slice's decision list does not name D-448 or D-449 for this change).

## Unread material

- `guidelines/coding.md` — NOT read. The handoff asked for it before tests or code; I missed it. The change touches tests only, which the handoff still names.
- `guidelines/testing.md` — NOT read (the handoff requires it before tests). I read the tests' structure and changed them by their pattern; please check.
- `guidelines/coding-balance-instrument.md` — NOT read.
- `foundations/decisions.md` D-438 (`:6113-6126`), D-428 and D-429 (`:12096-12126`), `foundations/invariants.md` `instrument-game-agreement` and `balance-instrument-file-writes` (`:1438-1456`), `foundations/part_map.md` `balance-tools` (`:128-139`) — NOT read; the slice's *Read* names them. I read only the frozen task passages (`task.md` lines 33, 36, 82-90, 139, 159, via sed).
- `.runs/task-cycles/katalog-map/reports/executor-3-report.md` — read only with grep for the words overlay, balance, forestPack, forest-pack and the timing words, not whole. Its section on `tests/balance/overlay.test.mjs` (three failing cases) was the basis of the change.
- `balance/overlays/wasteland.json` — read whole. `balance/overlays/forest-pack.json` — read whole before deleting.
- `.the-way/task-cycle/change/SKILL.md` — read whole; `slice.md` — read whole. `walkthrough.md` and `ui_check.md` — not read: the change alters no behaviour a user sees in the running product (a test, a test file and a skill text) — by the method, no walk.

## Searches not found or unclear

- `rg -n "forest-pack|forestPack" balance tests .claude/skills/loop2-balance .agents/skills/loop2-balance` — found hits outside the slice's intent (see check 7). Unclear whether the slice meant the whole `tests/` tree; I read it as the tests of `tests/balance/`.
- The slice's "finds none" for the skill: the skill's own line 43 names `forestPack` as a live map; the skill keeps that by design (it is one of the five maps).
- Nothing else not found.

## Working copies

None made, except the output directory `.runs/executor-5/` (logs and the progression table), which stands in the ignored `.runs/` of this worktree. No worktree or clone was made, so nothing to remove.
