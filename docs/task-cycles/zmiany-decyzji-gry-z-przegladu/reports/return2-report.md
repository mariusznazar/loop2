# Return report 2 — the return step after the correction (`39f3daa7`)

**Status:** done.

**Commits:** `no commit`. The head stays `39f3daa7`; the worktree is clean (`git status --short` empty). Nothing no longer matched.

## Checks

| Command | Exit code |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (on the head `39f3daa7`, no change made) | 0 (`0 errors`) |

Not run: `npm test`. No test read or changed.

## Foundation compared with code (only what the correction touches)

| Entry | Compared with | Result |
|---|---|---|
| D-136 (binding sentence: a change of the program rules or rule groups, and a switch of the program, set the streak to zero "in a map run that has not ended") | `src/browser/sim/programs.ts:581` in `withCopyProgram`: `const zeroed = !mapRunEnded(run) && ruleContentChanged;` and the streak/attacks reset only `...(zeroed && { streak: 0, defeatedAttacks: 0 })` (lines 571-606; the doc comment says "of a map run not ended"). `discardCopyChanges` (lines 713-723) goes through `withCopyProgram`, so it follows the same rule and is allowed in an ended map run without zeroing. `switchProgram` (lines 731-): `if (mapRunEnded(run)) throw new Error(...)`, so a switch exists only in a map run that has not ended, and zeroes `streak` and `defeatedAttacks` there. `mapRunEnded` (`src/browser/sim/run.ts:413`): `run.death !== null \|\| run.completion !== null`. | matches: the code resets the streak only where the map run has not ended, as D-136 now says |
| Invariant `streak-program-change` | same code; the sentence is the model of D-136's; the test (ended-run case "keeps its streak") ran green in the first stage | matches |
| Invariant `trip-plan-progress` (D-136's *Verification*) | `withCopyProgram`: a trip-plan-only change leaves `ruleContentChanged` false (the comparison holds groups and identity counters, not the trip plan), so the streak, the beaten attacks and the counts stand; the invariant says "editing or discarding changes to the copy's trip plan alone leaves …" and does not mention an ended run | matches; no change |
| D-131 (read whole in the first stage; wording "of the map run in progress") | the same code | matches; D-136 and D-131 now say the same, as the remark wanted |
| D-396 third binding sentence, its list: D-280, D-282, D-311, D-349, D-370, D-389 | what each defines, read whole in the fix stage and checked against the code: D-280 — content at most 1344 px, "the full width of a narrower window" (`styles.css:56, 71`, 1344 px max-width); D-282 — areas a narrower layout can set one above the other (`styles.css:216`, `@media (max-width: 720px)`, and the one-column order at `:253-262`); D-311 — one column under 1074 px, two from it (`styles.css:253-262, 279`); D-349 — one scene size 672 × 304 px (`styles.css:238` comment names "its one size, 672 px wide (D-349)"; `src/browser/sim/data/scene.ts:39` "672 × 304"); D-370 — the end-of-run window as tall as its content up to a part of the browser window's height (`styles.css:1632`, `.end-window { max-height: 80vh; }`); D-389 — the camp cropped at the sides in a narrower window (comment and decision unchanged from the first stage's reading, no code change since) | the list stays true of what each defines |
| Decisions and invariants that name D-136 or D-396 | `git grep -n "D-136\|D-396" -- foundations guidelines`: D-396 is named only by the D-311 clause; D-136 is named in the text or the *Relations* of D-71, D-131, D-146, D-149, D-187, D-327 and D-388, and by the invariants `streak-program-change` and `trip-plan-progress`. A search of D-71, D-146, D-149, D-187, D-327 and D-388 for a sentence about a change of the program rules, a switch or an edit found none, so none of them says anything about an ended map run's streak that the narrowing touches; D-131 says the same as D-136 now | no change needed |
| D-349, D-370, D-280, D-282, D-311, D-389 | not changed in this correction; their text matches their code as in the first return step | no change |
| Part map entries `simulation` and `product-foundation` | no file added, moved or removed by the correction (only `foundations/decisions.md`, a `product-foundation` file, changed); the entries' *Files* and descriptions hold | no change |

## Entries of the return step

- **Decisions written or changed:** none in this step (D-396 and D-136 stand as the correction wrote them).
- **Invariants written or changed:** none.
- **Environment facts:** none (no new outside source; the judgement of the first return step on the WebKit claim stands).
- **Glossary terms:** none.
- **Part-map changes:** none.
- **Projected entries written whole or in part:** none.
- **Rows of *Settlements to record* written:** unchanged from the first return step (row 1 — D-396; row 2 — glossary `loop`; row 3 — `streak-program-change`).
- **A choice that binds after the merge:** none further.

The findings the human put aside stay untouched: the opening docstring of `tests/invariants/test_streak_program_change.py`, the code comments that call the earning loop "loop", and `cross-part-imports`.

## Unread material

- `src/browser/styles.css` read by lines around the places above (`:56-71`, `:216`, `:238`, `:253-290`, `:1626-1634`), not whole; the scene's CSS for any rule that would give the scene a second scale was not searched line by line (the comment at `:238` and `scene.ts:39` say one size).
- D-349, D-370, D-280, D-282, D-311, D-389, D-131: not re-read whole in this stage; read whole in earlier stages and unchanged since.
- `reports/return-handoff.md` re-read (the boundary); `reports/review-correction-report.md` not opened.

## Searches not found or unclear

none
