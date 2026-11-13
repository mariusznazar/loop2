# Merge report — `origin/main` (`1b0c8ad4`, PR #87, the camp in Siedziba) into `task/raport-z-wyplata`

**Status:** done

**Commit:** `840b59f0` "Merge remote-tracking branch 'origin/main' into task/raport-z-wyplata" (default merge message, parents `92b8311a` and `1b0c8ad4`). No rebase, no reset. No further commit: nothing in my change was made untrue by the merge.

## The conflict

One conflict, `src/browser/view/headquarters.tsx`, the return of `HeadquartersView`. Resolved by taking their structure (the fragment `<> <Camp state={state} /> <div className="headquarters screen-area"> … </div> </>`, their re-indentation and the wrapped „Drużyna nie ma jeszcze postaci.”) and putting our two props back on `AwayReport`: `onTake={takePractice}` and `closeRef={closeButton}`. Nothing of either side lost: their `Camp` import, `runCharacter` in `Drawn`/`drawnOf` and the header comment about the camp merged without conflict and stand; our `HeadquartersControls.takePractice`, `characterNameOf`, the `AwayReport` button and the `takePractice` focus handler stand. `git diff origin/main -- src/browser/view/headquarters.tsx` shows only our change (the report's button, props, refs and comments). Other files (`styles.css`, `tests/view/headquarters-screen.test.mjs`, `foundations/*`, the styleguide) merged without conflict.

## Checks (command → exit code), on `840b59f0`

- `npm run typecheck` → 0
- `npx eslint src tests` → 0
- `npx prettier --check src tests` → 0
- `npm run build` → 0
- `node --test tests/view/headquarters-screen.test.mjs` → 0 (26 pass)
- `node --test tests/view/away-report.test.mjs` → 0 (17 pass)
- `node --test tests/view/camp-picture.test.mjs` → 0 (7 pass)
- `node --test tests/view/react-controls.test.mjs` → 0 (56 pass)
- `node --test tests/view/account-screen.test.mjs` → 0 (131 pass)
- `node --test tests/sim/loop.test.mjs` → 0 (44 pass)
- `python -B .the-way/elements/common/foundation_check.py` → `0 errors`, exit 0
- `npm test -- tests/invariants/test_loop2_container_sprites.py` → exit 0, `Ran 1 test in 142.931s`, `OK` (Docker 29.7.2 answers here, so the test ran and was not skipped; it takes longer than the harness's two minutes and was run in the background).
- Not run: the full `npm test` (the orchestrator's).

## What the merge brought where it meets my change

Read whole: D-389, D-272, D-271 (the camp's entries) and the styleguide rule "The camp of Siedziba" (lines 800–820 of `guidelines/styleguide-browser-view.md`); D-271 and D-272 are the entries D-389 derives from. Compared with my entries and code:

- **Place on the screen.** The camp is a band *over* the screen's panel, under the row of warnings and over the heading „Siedziba”; the report „Gdy cię nie było” stands inside the panel, under the heading, above „Drużyna”. D-246 says the report stands "above „Drużyna”" and in the section of Siedziba: still true. D-389's *Rejected* names "the band under the heading „Siedziba”, over the report" as refused; my change does not touch that order.
- **Hidden from screen readers; no control in the camp.** D-389 and the styleguide say the camp is a picture, takes no click or key, is hidden from readers and holds no link, button or text. „Odbierz” is a button in the report inside the panel, not in the camp, so the rule is kept and the camp's *violates* list (a click on a character, a name on the picture) is not met.
- **Focus order.** The camp is outside the keyboard's order; the order in the panel is unchanged: „Odbierz” of each line, „Zamknij”, then „Drużyna”. After „Odbierz” the focus goes to „Zamknij” of the same section (my `takePractice`), inside the panel; the camp takes no focus. D-389's "order in which the screen is read stays as it is" holds.
- **Who stands in the camp.** D-389: characters that are neither in a manual map run nor in an earning loop. „Odbierz” changes neither (the loop stays, the run stays), so the camp draws the same after it; `Drawn` redraws on `loops` as before (the merged `runCharacter` field is additional).
- **Roles and tokens.** The camp "brings no new role, value of a token or meaning of a role"; my `positive` look of the button adds one use of `positive` (D-39) and no token. No clash.
- **Scope/words.** D-389's wording about the heading „Siedziba” lying lower by the camp's height does not touch the report text. The glossary's `headquarters` entry is unchanged by the merge.
Result: nothing in my entries (D-189, D-245, D-246, D-241, D-207, D-39, D-44, `loop-practice-payment`) or in the styleguide rows I changed is untrue beside D-389, D-272 or the camp rule. I made no correction and wrote no foundation entry.

## Unread material

- Read whole: `merge-handoff.md`, D-389, D-272, D-271, the styleguide rule "The camp of Siedziba", the resolved `headquarters.tsx` conflict region and `git diff origin/main` of that file.
- Not read: the rest of what PR #87 added (`camp.tsx`, `camp-picture.ts`, the camp's rules in `styles.css` lines 1271 on beyond the comment I saw, `tests/view/camp-picture.test.mjs`, `tests/invariants/test_loop2_container_sprites.py` beyond its docstring, `README.md`, the sprites, the other entries D-389 derives from: D-54, D-280, D-314, D-315, D-316, D-317, D-321, D-349, D-286) — their tests ran green with my change and none of them names the report, „Odbierz” or the button kinds (grep of the styleguide and of the camp's entries found no such mention).

## Searches not found or unclear

- Searched the merged foundation and styleguide for „Odbierz”, „Gdy cię nie było”, the report line, `positive` beside the camp: found only my own entries; the camp's entries do not mention the report except D-389's *Rejected* (the band over the report), which is not made untrue.
- `tests/invariants/test_loop2_container_sprites.py` takes about 143 seconds; the harness's default of two minutes moved it to the background; unclear only as to how the orchestrator's full run treats this timing.
