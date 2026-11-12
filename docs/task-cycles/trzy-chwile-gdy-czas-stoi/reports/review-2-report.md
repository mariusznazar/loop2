PASS 4e87b0d7887b815ef9e75aa82cc13c999252d203

# Review 2 — the fix of review 1, task trzy-chwile-gdy-czas-stoi

Fix range `81578d6653c3f583810685cd6f18c9372bad5068..4e87b0d7887b815ef9e75aa82cc13c999252d203`, one commit
(`4e87b0d7`); `git rev-parse HEAD` in the worktree is that head. Files: `foundations/decisions.md` (+8 / −7),
`guidelines/styleguide-browser-view.md` (+6 / −5), `tests/view/end-window-game.test.mjs` (+1 / −1),
`tests/view/scene-frost-contrast.test.mjs` (+0 / −13). No code, CSS, token or sprite changed, so the trust
boundary of `assets/sprites/**` is untouched since review 1. `reports/findings-1.md` matches
`reports/review-1-report.md` word for word for what it holds.

All four blocking findings are fixed. The fix adds no new Critical or Important finding.

## Blocking findings of review 1

- **Important 1 — fixed.** `guidelines/styleguide-browser-view.md:706-707` now reads: „W pauzie gracza cały
  ruch sceny … stoi (D-322); przy odkryciu, śmierci i ukończeniu stoi cały ruch poza efektem tej chwili
  (niżej).” I found no other sentence saying all motion stands at the three moments
  (`git grep "cały ruch"` over `guidelines` and `foundations` at the head: these two lines only).
- **Important 2 — fixed.** D-315 (`foundations/decisions.md:7034-7040`) now names „the specks of light after a
  completion, which stay in their own colours (D-322)” among what the tint layer does not cover, and its
  Verification lists „a speck of light” among what must not lie under it. This matches the code
  (`scene.tsx` draws the specks after the tint), the stylesheet comment and the styleguide.
- **Important 3 — fixed** in the first way review 1 gave, the one the orchestrator ruled for.
  - D-271's binding text (`:5766-5767`) is task 18's again: „the outline or the fill of the frost by at
    least 3:1 against the snow it lies on”.
  - Its complies example (`:5785`) now reads „standing out from the open snow they rise over”, and its
    violation (`:5791`) „a speck in a colour that does not stand out from the snow it rises over”.
  - The styleguide (`:743-744`) points to D-271 with no ratio.
  - `tests/view/scene-frost-contrast.test.mjs` is again identical to its base (`git diff --quiet 20bcc58d HEAD`
    on it, exit 0).
  - `git grep` finds no 3:1 rule on the specks left in `foundations`, `guidelines`, `tests` or `styles.css`.
    The `Source:` comments of the two speck tokens still state measured ratios (4.2:1, 3.3:1) as facts, not
    as a rule. That is acceptable.
- **Important 4 — fixed.** D-322's binding text (`:7280`) now reads „the fire standing as at every stop, and
  the mage too at a discovery and a completion”, so it keeps the qualification of question 12. The rest of
  the binding text is unchanged.

## Minor findings of review 1

- **Minor 1 (styleguide rule "The end-of-run window") — fixed.** `guidelines/styleguide-browser-view.md:798-800`
  now says the window opens after the effect of the end, and at once where the scene shows the last image at
  once (D-311, D-322), and its *Decision* line names D-322.
- **Minor 2 (D-371 and „Koniec przejścia” during the wait) — fixed.** D-371 (`:8437`) now says the button
  stands while the window does not stand, which includes the wait for the effect, when it opens the window at
  once. That matches `game-view.ts` and `run-screen.tsx`.
- **Minor 3 (stale test name) — fixed.** `tests/view/end-window-game.test.mjs:394` is now „the window opens once
  the scene's effect of the death has ended, while the player is on the screen, and covers the header and the
  three areas”.
- **Minor 4 (examples from proposals pending the human's choice) — answered, not changed. I accept the
  answer.** The finding asked for the request to carry the point. The fix report states that the request
  carries it: the token comments and the two D-271 examples change with Mariusz's choice. The orchestrator
  should make sure the request description says so.
- **Minor 5 (reduced motion keeps `data-moment-playing`) — contested as no defect. I accept that.** The finding
  recorded a harmless effect for the human's sight and asked for no change. It stays the author's Choice 6 and
  should be listed in the request.

## New findings in the fix diff

None. Two things I checked:

- D-315 now places the specks over the tint but does not say whether they lie over or under the frost. The code
  draws them over the frost, and the frost never reaches the specks' area. Nothing in the entry contradicts
  the code.
- The removed speck test leaves the clause "stands out from the snow" without a test of its own colours. The
  test in `scene-picture.test.mjs` still checks that every speck rises over snow alone. A colour judged by eye,
  with no ratio, is a matter for the human's viewing at the request (question 9), not a test.

## Declined to judge

- The colours and durations, as in review 1: the human chooses them at the request (questions 6 and 9).

## Checks run

In a fresh clone of `4e87b0d7` under the worktree's `.runs/review-2-head`. Its `.the-way` came from the
worktree's submodule at `55afa8e5`, which equals the gitlink. The clone was deleted afterwards and the
worktree stays clean.

- `npm ci` — exit 0.
- `npm test -- tests/view/scene-frost-contrast.test.mjs` — exit 0, 2 pass.
- `npm test -- tests/view/end-window-game.test.mjs` — exit 0, 26 pass.
- `npm test -- tests/view/scene-picture.test.mjs` — exit 0, 62 pass.
- `npx prettier --check` on the styleguide and the two changed test files — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- `git diff --quiet 20bcc58d HEAD -- tests/view/scene-frost-contrast.test.mjs` — exit 0.
- `git grep` for a 3:1 rule on the specks, and for „cały ruch”, at the head — results as given above.
- Not run: the full `npm test`, which is the cycle's own run. I did not rerun `scene.test.mjs` or the real
  browser: the fix changes no code, CSS or data, and review 1 ran both on the code that is unchanged here.

## Reaches beyond the dispatch

- `src/browser/tokens.css:93-94` at the head: to see whether the speck tokens' comments still state a rule
  (they state measurements only).

## Unread material

The fix diff, `reports/findings-1.md`, `reports/fix-1-report.md`, `reports/review-2-handoff.md` and
`.the-way/task-cycle/review/fix.md` were read whole. `reports/fix-1-handoff.md` was not read: the review-2
handoff states the rulings it carries, and I judged the fix against the findings. My foundation selection is
that of review 1 (343 decisions, 39 read whole, 304 by title only), with the entries the fix changes (D-271,
D-315, D-322, D-371) read again at the head.

## Searches not found or unclear

none
