PASS 840b59f0353c63469b1d69febcbe398fe89c399c

# Review of the reconciliation with the target branch (merge `840b59f0`: `origin/main` `1b0c8ad4`, PR #87, into `task/raport-z-wyplata`)

Reviewer: fresh agent, read-only. `git rev-parse HEAD` in the worktree is `840b59f0353c63469b1d69febcbe398fe89c399c`, the head given; parents `92b8311a` (ours) and `1b0c8ad4` (theirs). Pinned `.the-way`: gitlink and checkout both `55afa8e5`. The worktree stayed clean (`git status --short` empty after the checks).

Question reviewed: do the two sides still hold together? Neither side's own change was re-reviewed.

## Findings

Blocking: none. Minor: none. Out of scope: none.

## What I verified (claim by claim, against the merged tree)

1. **The conflict resolution** (`src/browser/view/headquarters.tsx`, return of `HeadquartersView`, `git show --cc 840b59f0`). The result is their fragment (`<Camp state={state} />` before `<div className="headquarters screen-area">`) with our `onTake={takePractice}` and `closeRef={closeButton}` on `AwayReport`. `git diff 1b0c8ad4 840b59f0 -- src/browser/view/headquarters.tsx` shows only our change (the `takePractice` control, `characterNameOf`, the report's button and props, the `closeButton` ref, the handler, comments), and `git diff 92b8311a 840b59f0` of the file shows only their change (the `Camp` import, `runCharacter` in `Drawn`/`drawnOf`/`sameDrawn`, the fragment, the re-indentation, the header comment). Nothing of either side is lost. The header comment "its acts go to the page" (ours, "three acts" removed) and their line "It reads the manual map run, whose character is not in the camp" stand together without contradiction.
2. **Redraw coherence.** `drawnOf` now holds `team`, `runCharacter`, `loops`, `stoppedLoops`, `awayReport`, `resurrection`. `takeLoopPractice` (`src/browser/sim/loop.ts:219`) returns a new `loops` entry and a new `team` (through `withLoop`, `withCharacter`), so the screen redraws after „Odbierz”; the camp redraws with it and draws the same characters (the loop and the manual run stay, so `inSiedziba` in `src/browser/view/camp-picture.ts` gives the same set). Our change touches no field the camp reads.
3. **Where the report stands against the camp.** The camp is outside the panel (`.camp`, `margin-bottom: var(--space-l)`, not `.screen-area`), over the heading „Siedziba”; the report „Gdy cię nie było” is inside the panel under the heading, above „Drużyna”. D-246 ("in the section … of Siedziba, above „Drużyna”") stays true; D-389's *Rejected* names only "the band under the heading „Siedziba”, over the report", which our change does not do. D-272 ("text stands on a solid background, never on a picture") holds: the camp has no text, the report text and „Odbierz” stand on `panel`.
4. **Order of focus; hidden from screen readers.** The camp is `aria-hidden="true"` and holds no `a, button, input, select, textarea, [tabindex], [role]` (their test asserts it). „Odbierz” and „Zamknij” are in the panel, not in the camp, so D-389's rule (the camp takes no click or key, is hidden) is not met by them. The order inside the panel is as before: „Odbierz” of each line, „Zamknij”, then „Drużyna”; our `takePractice` moves the focus to „Zamknij” of the same section, inside the panel. D-389's "order in which the screen is read stays as it is" holds.
5. **Foundation entries, both sides.** Read whole: D-389, D-272, D-271 (theirs), D-246, D-189, D-39, D-44 (ours); the camp rule "The camp of Siedziba" in `guidelines/styleguide-browser-view.md` (line 800) and the changed "No value in place of a design token" paragraph; the diff of ours to the styleguide (Roles row `positive`, "States of shared controls", "Main button, secondary action and tab"). The two sets of decisions are disjoint (theirs changed D-271, D-272, D-389, the invariant `loop2-container-sprites`; ours D-189, D-207, D-241, D-245, D-246, D-39, D-44, the styleguide rows above), and no sentence of one is made untrue by the other: the camp "brings no new role, value of a token or meaning of a role" and our `positive` use of the button is a use D-39 itself lists; D-44's "no new kind of control" is kept (the camp is no control, „Odbierz” is a look of the shared button); the camp's `PICTURE_PIXEL` lengths stay in TypeScript and our CSS adds only tokens (`var(--positive)`, `var(--space-xs)`, `var(--space-s)`), so the token-values rule holds for both. The invariant `loop2-container-sprites` changed by the merge (text, `Derives from`, docstring of its test) does not reach our change, which adds no sprite.
6. **Shared stylesheet** (`src/browser/styles.css`, auto-merged): their rules (`.camp*`, motion rules from line ~2449) and ours (`.button.positive`, `.away-report-line` flex) have no shared selector; no `:first-child` or `.headquarters-host >` rule is affected by the extra camp child; `.camp` and `.screen-area` are siblings.
7. **Shared test file** (`tests/view/headquarters-screen.test.mjs`, auto-merged). Their camp tests (the camp over the panel and adds no text, a picture hidden from readers with no control, 96 px band, follows the manual run and the loops) and ours (the lines with „Odbierz” in `positive`, hand to the page and focus on „Zamknij”, comes back when the loop gathers more, no button for a loop a death stopped) are coherent: `reportLine` lost `practice` (ours) and their tests use the same helper and `teamOf`/`LOOP` without reading it; `mount`'s `controls` has `takePractice` (ours) and their cases do not use a second `createHeadquarters` call that would lack it; no test of one side asserts something the other changed (their text equality `screen.element.textContent === .headquarters textContent` is unaffected by the report, which is in the panel). The file runs green as a whole (below).
8. **Trust boundary.** `src/browser/sim/saved-game.ts` is changed by our side earlier in the cycle (`SAVED_GAME_VERSION` 5, `practice` out of the line); the merge changes no line of it (`git diff 92b8311a 840b59f0 --stat` lists no `saved-game.ts`), and their side does not touch it. No hostile-input check of the merge was needed beyond that.

## Checks I ran (worktree `the task's worktree root`, head `840b59f0`; none changed the worktree)

| Command | Exit | Result |
| --- | --- | --- |
| `node --test tests/view/*.test.mjs tests/sim/*.test.mjs` | 0 | 2008 tests, 2008 pass, 0 fail (includes both sides' `headquarters-screen`, `away-report`, `camp-picture`, `scene-picture`, `loop`, `saved-game`, `catch-up` tests) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `npm run typecheck` | 0 | |
| `npx prettier --check src tests` | 0 | all files formatted |
| `npx eslint src tests` | 0 | |
| `python -B scripts/test.py tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| `python -B scripts/test.py tests/invariants/test_design_token_contrast.py` | 0 | 3 tests OK |
| `python -B scripts/test.py tests/invariants/test_browser_view_focus_outline.py` | 0 | 3 tests OK |
| `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` | 0 | 10 tests OK |
| `python -B scripts/test.py tests/invariants/test_browser_view_framework.py` | 0 | 9 tests OK |
| `python -B scripts/test.py tests/invariants/test_design_token_sources.py` | 0 | 2 tests OK |
| `python -B scripts/test.py tests/invariants/test_character_team.py` | 0 | 2 tests OK |
| `python -B scripts/test.py tests/invariants/test_loop2_container_sprites.py` | 0 | 1 test, ran (not skipped), OK; 9 s with cached Docker layers (the invariant changed by the merge) |

Not run: the full `npm test` (the orchestrator's); a real-browser look at the screen after the merge (the camp's 96 px band plus its margin moves the report down; that is D-389's accepted cost "the heading „Siedziba” stands lower", and jsdom shows no layout, so the look of the report under the camp is unverified by me). The Python invariant tests other than the seven above were not run; none names a file the merge reconciled.

## Declined to judge

- The own quality of PR #87 (camp drawing, clearing, motion, sprites) and of our change: reviewed by their own cycles.
- Whether the report should stand at the very top of Siedziba rather than under the camp: D-389 settles the camp's place and our change does not move the report within the panel.

## Reaches beyond the dispatch

- `src/browser/view/camp.tsx`, `src/browser/view/camp-picture.ts` and the camp block of `src/browser/styles.css` (lines ~1255-1350): read whole, to confirm that the camp reads only `team`, `run` and `loops` and shares no selector with our CSS.
- `src/browser/sim/loop.ts` (`takeLoopPractice`, `waitingPractice`, lines 170-240): to confirm that the redraw comparison of `drawnOf` sees the state change after „Odbierz”.
- `git diff 1b0c8ad4...840b59f0` of `types.ts`, `saved-game.ts`, `styles.css`, `game-view.ts`: to check what our side changed against theirs.

## Unread material

- Read whole: the handoff, the author's merge report, D-389, D-272, D-271, D-246, D-189, D-39, D-44, the styleguide rule "The camp of Siedziba", the `git show --cc` of the merge, the resolved `headquarters.tsx`, `camp.tsx`, `camp-picture.ts`, the camp's CSS block, the merged test diff of `headquarters-screen.test.mjs`.
- Read in part: `foundations/invariants.md` (only the diff of `loop2-container-sprites` and the invariant's test docstring diff); the styleguide's changed rows of ours (read from the diff against the merge base, not the whole rows in the merged file); D-241, D-245, D-207 (read through the diff of our side and not whole: they hold nothing about the camp, the screen's place or controls that I found by grep of `camp`, `Siedziba`, `picture`).
- Not read: `tests/view/camp-picture.test.mjs`, `tests/view/scene-picture.test.mjs` diff, `src/browser/sim/data/scene.ts` diff, the sprite files, `README.md` beyond its diff, D-54, D-280, D-314-D-317, D-321, D-349, D-286 (the entries D-389 derives from); their tests ran green.

## Searches not found or unclear

- Searched the merged `foundations/` and `guidelines/` for a sentence of either side about the report, „Odbierz”, „Zamknij” or `positive` beside the camp, and for a sentence of the camp about the report: found only D-389's *Rejected* line about the band "over the report", which our change does not make untrue. No contradiction found.
- The author's statement that the full-test container check takes 143 s: on this run it took 9 s (cached layers); not a discrepancy of the merge.
