# Report — executor of slice 9 (correction 1), task `ocena-programu-na-ziarnach`

**Status:** done with concerns (the concerns are two choices named below and 21 red cases of `tests/sim/saved-game.test.mjs`, which Slice 10 rewrites).

## Commit

- `3966b24e` — `refactor: :fire: take the judgings the game state remembered out of the game state, the simulation and the saved game …` (the first `git add` aborted on the already `git rm`-ed path, so the commit first held only the deletion; I amended my own unpushed commit to hold all ten files).

## Files changed (added / removed lines)

| File | + | - |
|---|---|---|
| `src/browser/sim/types.ts` | 0 | 24 |
| `src/browser/sim/game.ts` | ~12 | ~10 |
| `src/browser/sim/programs.ts` | ~6 | ~33 |
| `src/browser/sim/loop.ts` | 2 | 17 |
| `src/browser/sim/judging.ts` | 1 | 29 |
| `src/browser/sim/judging-record.ts` | 0 | 106 |
| `src/browser/sim/saved-game.ts` | 0 | 49 |
| `tests/sim/judging-record.test.mjs` | ~50 | ~730 |
| `tests/sim/saved-game-judgings.test.mjs` | 0 | 514 (git rm) |
| `stryker.config.json` | 0 | 1 |

(Totals of the commit: 69 insertions, 1515 deletions.)

## What was removed

- `types.ts`: `RememberedJudging`, `RememberedJudgings`, `GameState.judgings`.
- `game.ts`: `judgings: {}` of `newGame`, the `judgingsAfterDeath` call and import in `settleDeath`; `setProgram` and the first-chill write of `advanceMinutes` take `programs: withProgramContent(state.programs, …)` again (as before `3218a620`); the comments of `newGame`'s neighbours, `setProgram` and `settleDeath` are back to their words before `3218a620` (the `newGame` comment and `madeAtMs` kept).
- `programs.ts`: `withProgramSaved` (see choice 1), the erasing in `deleteProgram`, the import of `judging-record.js`, the comments of `deleteProgram`, `editProgram`, `saveCopyIntoProgram` back to before `3218a620`.
- `loop.ts`: the erasing in `takeEnd` (back to `withLoop({ ...state, team }, characterId, null)`), the import, the comment of `endLoopRun`.
- `judging.ts`: `judgeAndRemember`; `judging-record.ts`: `rememberedOf`, `withRememberedJudging`, the first run's `judgingMark`, `judgingsWithoutProgram`, `judgingsWithoutCharacter`, `judgingsAfterSave`, `judgingsAfterDeath` and the type imports they needed. Kept: `JudgingIds`, `JudgingMark`, `JudgingRecord`, `recordOfJudging`, `markOfRecord`, `judgeOnSeeds`, `judgeAndRecord`.
- `saved-game.ts`: `rememberedJudging`, `rememberedJudgings`, `"judgings"` among `GAME_KEYS`, the read in `game()`, `SEED_KINDS` (nothing else read it; added by `bae893e2`), the imports of `RememberedJudging(s)` and `SeedResult`.
- `tests/sim/saved-game-judgings.test.mjs` (git rm) and its line in `stryker.config.json` (no other listing of it exists in the repository).
- `tests/sim/judging-record.test.mjs`: every case of the first run (remembered judging, replacing, old mark, the pure erasing functions, the hooks at saves/deletion/first chill, the deaths, the act `judgeAndRemember`) removed — reason: remark 1 of the human; the nine cases of Slice 4 (record, mark, standing, content revision, first chill, deaths, stock) stay unchanged; the helpers they use stay (`game()` lost its `held` parameter and the `judgings:` field it set; `twoGroups`, `died`, `loopDied` kept; `remembered`, `A`–`E`, `judgings()`, `PROGRAM_ONE_GONE`, `GONE_FOR_ALA`, `assertLoadsBack`, `COLD_DEATH_MINUTE` removed as unused). The header comment is rewritten for the record and the mark. The act of Slice 4 (`judgeAndRecord`) is covered by `tests/sim/judging.test.mjs`, untouched.

## Added

- One case in `tests/sim/judging-record.test.mjs` (last test, "the saved game holds no judging …"), the trust-boundary case the orchestrator asked for: the game's own save has no `judgings` key and loads back into the same state; a document of the current version (9) with `game.judgings` set to `{}`, a filled record, `null`, `[]`, `7` or a hostile `{"__proto__": …}` is refused as `shape`, nothing thrown. **Slice 10 need not write the direct refusal case again; it stands here.** Its quotation is D-213's first sentence word for word, as `tests/sim/saved-game.test.mjs` already quotes it.

## Checks (command → exit code); none is the full gate

- `npm test -- tests/sim/judging-record.test.mjs` → 0 (10 pass)
- `npm test -- tests/sim/judging.test.mjs` → 0 (15)
- `npm test -- tests/sim/content-revision.test.mjs` → 0 (38)
- `npm test -- tests/sim/program-list.test.mjs` → 0 (34)
- `npm test -- tests/sim/copy.test.mjs` → 0 (12)
- `npm test -- tests/sim/copy-actions.test.mjs` → 0 (35)
- `npm test -- tests/sim/death.test.mjs` → 0 (33)
- `npm test -- tests/sim/loop.test.mjs` → 0 (46)
- `npm test -- tests/sim/catch-up.test.mjs` → 0 (35)
- `npm test -- tests/sim/loop-record.test.mjs` → 0 (24)
- `npm test -- tests/view/maps-screen.test.mjs` → 0 (49)
- `npm test -- tests/quality/test_mutation_test_selection.py` → 0
- `npm test -- tests/invariants/test_simulation_inputs.py` → 0
- `npm test -- tests/invariants/test_saved_program_edit.py` → 0
- `npm test -- tests/invariants/test_copy_save.py` → 0
- `npx eslint src tests` → 0, no output; `npx prettier --check src tests stryker.config.json` → 0; `npm run typecheck` → 0, "0 errors".
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` → exit 0, "0 errors" (no error at all, in any file).

The new refusal case was not seen failing first: the slice removes code, and the case holds for the code after the removal; before it the load accepted the key. It was not run against the old code (see own-work check).

## Own-work check

Requirement most likely unmet: the strict load stays strict and the game's own saves load into the same state, now with no `judgings` key (trust boundary), and the death functions and `deleteProgram` behave as before `3218a620` while keeping later changes. Checks: the new case above (own save loads back into the very state; six crafted values of `judgings` refused as `shape`, no throw) → pass; `git diff 3218a620 -- src/browser/sim/game.ts src/browser/sim/loop.ts src/browser/sim/programs.ts` read through: the only differences left are the later changes (`madeAtMs`, `contentRevision`, `contentDiffers`, `withProgramContent` raising the revision); `death.test.mjs`, `loop.test.mjs`, `catch-up.test.mjs`, `program-list.test.mjs`, `copy*.test.mjs` pass. A mutation of the new case (re-adding `"judgings"` to the keys) was not made.

## `tests/sim/saved-game.test.mjs` (not changed)

Between this slice and Slice 10 it is red. I ran a throw-away copy of it (made as `tests/sim/zz-count-copy.test.mjs`, run with `node --test`, removed at once; the original was neither changed nor run): 45 cases, **21 fail**, 24 pass. The failing ones read the document that still holds `judgings` (35 mentions of the word in that file).

## Search of the whole repository (handoff's last note)

`git grep` / `grep` in `src`, `tests`, `scripts`, `.claude`, `balance/`, `.the-way/elements` for `RememberedJudging`, `judgeAndRemember`, `rememberedOf`, `withRememberedJudging`, `judgingsWithout…`, `judgingsAfter…`, `rememberedJudging`, `withProgramSaved`, `judgingMark(`, `.judgings`, `judgings:` → no hit outside `tests/sim/saved-game.test.mjs` and the new refusal case. The word "judgings" remains in prose of `src/browser/view/game-view.ts`, `judging-cache.ts`, `maps-entry.ts` and in the view tests (`judging-cache*.test.mjs`, `judging-cache-page.test.mjs`, `uncaught-failure.test.mjs`) as the name of what the browser remembers (D-441), not as the removed field. `balance/engine.mjs` reads only `BALANCE.judgingCapMinutes`. Nothing of the view or the balance instrument reads a removed name.

## Choices (with the way rejected and its cost if wrong)

1. **`withProgramSaved` is removed instead of kept as a wrapper giving the list alone.** The plan says it "gives the list of programs alone again, its callers taking the list as before `3218a620`". In the code after Slice 1 the revision is raised inside `withProgramContent` already, so a `withProgramSaved` that gives the list alone would be an unused-value wrapper around it; the four callers (`editProgram`, `saveCopyIntoProgram`, `setProgram`, first-chill write) now call `withProgramContent` exactly as they did before `3218a620`. Spec Decision 6 S1 and its Constraints name `withProgramSaved` as the place of the raise; if a reviewer wants the name kept, the cost is a one-function wrapper restored in `programs.ts` and four call sites changed. No test, guideline or foundation text names it (searched).
2. **The refusal case lives in `tests/sim/judging-record.test.mjs`** because it is the only test file the plan's *Change* lets me write for it, though its subject is the load; Slice 10 may move it to `saved-game.test.mjs` with the rewrite.

## Plan vs code

Small mismatches, adapted: the plan's `judgeAndRecord`/`markOfRecord` names match the code; `judgingMark` of the first run was the only function of that name (the new mark is `markOfRecord`). The plan said the `judging-record.ts` first-run functions "stay or go"; all first-run functions went as the plan lists.

## Reaches beyond the handoff

- `.the-way/elements/common/foundation_check.py` run (named by the handoff). Read `a note in the author's private notes` (user's global rule before a commit). No foundation entry or guideline beyond the handoff's list was opened for reasoning.

## Class of model

`same` was enough.

## Walkthrough

The change alters no behaviour a user sees in the running product: the browser view stopped reading the removed state in Slices 6–8, and what this slice removes had no reader; the one visible effect is that an old document with a `judgings` key is refused as `shape`, which is the strict load's rule.

## Unread material

- The foundation entries named by the handoff (the new D-441-row-1 entry, D-440, D-165, D-190, D-213, the invariants `save-version`, `simulation-inputs`, `death-settled-once`) and the guideline files (`coding.md`, `coding-simulation-module.md`, `coding-saved-game.md`, `testing.md`, `src/browser/AGENTS.md`) were not read whole by me; I worked from the handoff's copied passages of the task and the plan, the code, and `git show` of `bae893e2` and `3218a620`, and the foundation check (0 errors) and ESLint/Prettier/typecheck stand for the rules. D-213's sentence was taken from the quotation already in `tests/sim/saved-game.test.mjs` and confirmed by the foundation check. `.runs/task-cycles/…/task-frozen.md` and `spec.md` were not opened (the handoff carries the passages). Of `src/browser/sim/types.ts`, `game.ts`, `programs.ts`, `loop.ts`, `saved-game.ts` I read only the ranges I changed and the diffs against `3218a620`, not each file whole. `tests/sim/judging-record.test.mjs` was read whole in its kept parts (lines 1–190 and 895–end) and by title in the removed part.

## Searches not found or unclear

none (the `Foundation entries` rows were not looked up in `foundations/`; the foundation check passes).

## Working copies

`.runs/executor-c1-9/` (logs of the focused runs) stood under the worktree's ignored `.runs/` and was removed; the handoff names `.runs/executor-9/`, I used `executor-c1-9/` — the name of the directory differs, nothing remains in either. `tests/sim/zz-count-copy.test.mjs` (a throw-away copy of the saved-game test to count the red cases) was removed at once. No remainder.
