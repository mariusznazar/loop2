PASS 39f3daa782676c4e181036c705e029132bfda382

# Review of the correction for the human's remarks

Range `c9365b7e..39f3daa7` (one commit, `39f3daa7`). `git rev-parse HEAD` = `39f3daa782676c4e181036c705e029132bfda382`. The range changes `foundations/decisions.md` only (`git diff --name-only`): +5 / -4 lines, two hunks. No Critical, Important or Minor finding. I changed nothing in the worktree.

## Each remark

**Remark 1 (name D-349 and D-370 in the browsers decision) — made, no more.** The decision is now D-396 (the branch's merge renumbered it; D-393 to D-395 are other decisions). Its third binding sentence reads "… — D-280, D-282, D-311, D-349, D-370 and D-389 — keeps its meaning there; …". Only the list changed (hunk at `foundations/decisions.md:9700`). I read D-349 and D-370 whole:
- D-349 defines the look in a narrower window: one scene size, "the game keeps no second scale of it", and its *Verification* `violates` names "a second size of the scene … chosen … by the width of the window". It belongs.
- D-370 defines the look in a narrower and a lower window: the end-of-run window is "as wide as the content column of the screens (D-280) and as tall as its content up to a part of the height of the browser window". It belongs.
- The list is now right for what the correction changes. D-396's *Relations* (`none`), *Verification* and *Rationale* stay true: neither *Verification* nor *Rationale* lists decisions. The reference from D-311 ("below the smallest window of D-396", `foundations/decisions.md:7465`) points at the renumbered decision correctly; the only remaining "D-393" strings are the other decision of that number.

**Remark 2 (D-136 narrowed to a map run that has not ended) — made, no more.** D-136's binding sentence (`foundations/decisions.md:2853-2856`) now reads "… and every change, in a map run that has not ended, of the program rules or rule groups the map run carries out, and every switch of the character to another program during that map run, sets it to zero, on every map, while a change of the trip plan alone leaves it." Compared with the invariant `streak-program-change` (`foundations/invariants.md:830`: "A change, in a map run that has not ended, of the program rules or rule groups of the copy it carries out, and every switch … during that map run … sets the streak of that map run to zero, on every map") it says the same, and D-131 says "the map run in progress". Nothing else of D-136 contradicts it: *Verification* (invariants `streak-program-change · trip-plan-progress`; `violates` "a switch … leaving the streak as it stood" concerns a switch, which `switchProgram` allows only in a map run that has not ended), *Rationale* ("a change of the program's rules or rule groups starts the streak again" is the general reason, not a binding sentence) and *Rejected* are unchanged and consistent. The earlier word "earning loop" in the *Rationale* is intact.

**Remarks 3 and 4 — nothing required, nothing done:** the test file's comment, the code comments, D-396's *Rejected* (Firefox reason) and `cross-part-imports` are untouched in the range. **Remarks 5–12 — accepted, no change.**

## Collisions and references

None introduced. D-136's narrowing does not touch D-131, the invariant or `trip-plan-progress`; D-396's longer list leaves D-349 and D-370 unchanged and adds no relation. The trust-boundary file `src/browser/sim/saved-game.ts` is not in the range (`git diff --name-only c9365b7e..39f3daa7` lists only `foundations/decisions.md`); no code, test or guideline touched.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `39f3daa782676c4e181036c705e029132bfda382` |
| `git diff --check c9365b7e..39f3daa7` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` (worktree root) | exit 0, `0 errors` |
| `git diff -U0 c9365b7e..39f3daa7` read whole; `grep` of `D-396`/`D-393` references | as above |
| `git status --short` | empty |

Not run: `npm test` (the orchestrator's gate).

## Unread material

- Read whole for this review: the handoff, the remarks, the author's correction report, the diff, D-136, D-349, D-370 (current text), D-396 (the changed sentence; its remaining fields were read whole in the earlier review as D-393 and are unchanged by this range), the invariant `streak-program-change`.
- Not re-read: D-131 and the rest of the foundation selection of the first review (its **Unread material** stands); the merge commit's changes from the target branch (outside this range, reviewed by `review-merge-report.md`).

## Searches not found or unclear

none
