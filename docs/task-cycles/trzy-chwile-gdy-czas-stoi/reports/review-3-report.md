PASS 66c9d37161fc0b500e1adf99e00474f017ebe5ae

# Review 3 — the return step's commits, task trzy-chwile-gdy-czas-stoi

Range `4e87b0d7887b815ef9e75aa82cc13c999252d203..66c9d371` (one commit, `66c9d371`). `git rev-parse HEAD` in the worktree
`the task's worktree` is `66c9d37161fc0b500e1adf99e00474f017ebe5ae`, the head given. The diff
(computed with `git diff <base>..<head>`) is `foundations/decisions.md` alone, +3 / -3, all inside D-322:

1. the binding text gains "each icon once", "toward the middle of the frame so that it lies inside the picture" and "a moment
   has just begun where the events of the simulation call that returned the state carry it (D-04), so a scene drawn again ...";
2. *Relations* gains `derives from D-04`;
3. *Verification*, "complies", gains "a mage that died in the right half of the frame falling to the left".

Blocking findings: 0. Minor: 2 (in scope). Out of scope: 0.

## Claims of the return step, verified in the code at the head

1. **Each icon once** — TRUE. `plaquesOf` (`src/browser/view/scene-picture.ts`, the function after `iconHref`) collects the icons of
   `discovery.actions` and `discovery.items` into a `Set` of hrefs, so a shared icon yields one plaque; `Plaques` in
   `src/browser/view/scene.tsx` keys each plaque by href. The data confirms the shared icons: `src/browser/sim/data/actions.ts` gives
   `direction-sign` to „Idź” and „Idź — ognisko” and `grab` to „Zbierz” and „Obchód”. What the data gives no icon (conditions,
   creatures, skill trees) has no plaque, as D-322 says in its Rationale.
2. **The dead mage falls toward the middle of the frame** — TRUE. `fallFacing` (`scene.tsx`, before `placeOf`) returns `"left"` when
   `mageX + SCENE.mageMiddle > frame.width / 2`, else `"right"`; `drawing.moment?.kind === "death"` feeds it into `data-facing`
   (`scene.tsx`, the `scene-mage` element), and `src/browser/styles.css` mirrors `.scene-mage-sprite` for `data-facing="left"`. The sheet
   falls to the right by itself, so a mage in the right half is mirrored and falls left, which is the case the new *Verification* row names.
3. **A moment has just begun where the events of the call carry it** — TRUE.
   - `momentBegins(standing, events)` (`scene-picture.ts`) is true only if the events hold `discovered` (standing discovery),
     `characterDied` (dead) or `mapRunCompleted` (completed); the three event kinds exist in `src/browser/sim/run.ts:87,97,102` and are
     pushed in `run.ts:545,730,745` and `game.ts:795`. `Scene` sets `playing: fresh && momentBegins(...)` only when the moment's key is new,
     and `fresh` is `events !== seenEvents` (`scene.tsx`, the "moment" block).
   - A first draw, a redraw and a return to the screen pass no new events: `seenEvents` starts as the events given, and the redraw of
     `run-screen`/`world-area` hands the `drawn.events` it kept; a reload and a load build the game with `renderScreens([])`
     (`src/browser/view/game-view.ts:990`), so none carry a moment. The window uses the same events (`endEffectBegins(result.events)`,
     `game-view.ts:353`), as D-311 says.
   - D-04 does allow it: its text names "the events the simulation returned" among what the scene may read, and its *Verification*
     "complies" holds the scene comparing the state with its previous reading.
4. **Trust boundary** — unchanged: the range holds no file of `assets/sprites/**` (one file, `foundations/decisions.md`).

## Findings

### Critical

none

### Important

none

### Minor

1. `foundations/decisions.md:7280` (D-322 binding text, last sentence). The clause "and a moment has just begun where the events ... carry
   it (D-04), so a scene drawn again on the same moment, after a return to the screen, a reload or a load, **and a scene under the system's
   setting for reduced motion** show the last image of the effect at once" makes the reduced-motion scene read as a consequence of the
   events ("so"). In the code it is not: under that setting the scene may well receive the events that carry the moment, and the CSS
   alone takes the animation away (`src/browser/styles.css`, the reduced-motion rules at about line 2371), and `game-view.ts:353` reads the
   setting separately. The rest of the entry (Rationale, D-311, D-319) states the two separately. Effect: a reader could implement
   reduced motion by the events, which is wrong; low, because the sentence's "show the last image at once" is true of both. Suggested: put
   reduced motion in a clause of its own ("..., and a scene under the system's setting for reduced motion shows ...").
2. `foundations/decisions.md:7290` (D-322 *Verification*, new "complies" item). The row is inserted on the line of the death of cold and
   lengthens it to about 200 characters; every other line of the list wraps near 100. It also covers only the right half; the left half
   (a mage that died in the left half falling to the right) is the default and needs no row, so nothing is missing, but the *violates* list
   has no matching row for a mage that falls out of the frame or under the frost, which the entry's own reason (the fallen mage would be cut
   off) would support. Polish only; the checker passes.

## Foundation consistency (the sentences the return step wrote against the rest of D-322 and the entries it names)

- D-322 binding text vs. *Verification*: the plaque rows ("icons of what was discovered coming out of the forest on plaques framed in
  `discovery`") and the fall row agree with the new sentences; "a scene drawn again showing no specks" and "a reload with the mage
  already lying and the layer already there" agree with "a scene drawn again ... show the last image at once". No contradiction.
- D-322 vs. *Rejected*: "the effect repeated at every redraw of the scene" is the rejection the events rule answers; nothing in
  *Rejected* contradicts the toward-the-middle fall or the one-icon-per-plaque rule.
- D-04 (`foundations/decisions.md:52`): the new `derives from D-04` is true; D-04's text covers the scene reading the events.
- D-311 (`:6833`): "at once where the scene shows the last image of that effect at once (D-322): at an entry on the screen, after a
  reload or a load, and under the system's setting for reduced motion" agrees with D-322 and with `game-view.ts:353`.
- D-315 (`:7031`): plaques and specks stay on their own colours, the cold layer lies over the tint and under the frost — agrees with
  D-322's "above the tint of the light and under the frost (D-315)".
- D-316 (`:7068`): the tint returns where the scene goes on in the pause and at a discovery (D-322) — agrees; the entry says nothing of
  the fall's direction or of icons.
- D-319 (`:7195`): the mage "stands at its place at once" after a load and under reduced motion — agrees with D-322's reference to it.
- Task rows: *To do* 1 (icons once on plaques, rows without icon named by the band), 2 (six frames, grey, cold layer), 3 (specks), 4
  (once, last image, „Wznów” cuts), 8 (effect of the end alone), 10 (D-322 changed as *Decisions in play* says) and *Settlements* rows
  1–7 are all stated in D-322 and D-311; the two additions (one icon per plaque, direction of the fall) are not in the task but are
  true of the code and bind later work (task 20's wolf), and the return step wrote them as the method asks.

## Declined to judge

- The code at `4e87b0d7` (reviewed twice, PASS), including the choice of the fall direction, the 960 ms / 600 ms / 1800 ms durations
  and the colours of the cold layer and the specks — outside this range; the colours are the human's at the request (task *Acceptance
  criteria*).
- The other entries the return step lists as "matched" (D-39, D-42, D-271, D-371, the fact `wcag-three-flashes`) — not changed by this
  range and not named in the dispatch for reading.

## Checks run

- `git rev-parse HEAD` in the worktree — `66c9d37161fc0b500e1adf99e00474f017ebe5ae` (matches); `git status --short` — empty
  before and after.
- `git diff 4e87b0d7887b815ef9e75aa82cc13c999252d203..66c9d371 --stat` and the full diff — one file, +3 / -3.
- `git ls-files --stage -- .the-way` = `55afa8e57aa1b83c77108576a36642722e0dda15`; `git -C .the-way rev-parse HEAD` = the same.
- `python -B .the-way/elements/common/foundation_check.py` in a separate detached checkout of `66c9d371`
  (`.runs/review-3-check/co`, with the pinned `.the-way` copied in) — exit 0, "0 errors". The checkout was removed afterwards
  (`git worktree remove --force`); `git worktree list` no longer shows it.
- Manual reading of the code named above (`scene-picture.ts`, `scene.tsx`, `styles.css`, `game-view.ts`, `actions.ts`, `run.ts`,
  `game.ts`) — the three claims hold.
- Not run: the focused tests (`tests/view/scene.test.mjs`, `tests/view/scene-picture.test.mjs`) and the full suite. The range changes
  no code, the code was reviewed twice and the cycle runs the suite before the request; the tests that protect the claims exist
  (`scene-picture.test.mjs` lines 1017-1023 for `momentBegins`; `scene.test.mjs` at "a dead mage falls toward the middle of the
  frame, whichever way it faced"), but their run was left unverified here.

## Reaches beyond the dispatch

- `src/browser/view/game-view.ts:325-365, 925-990` and `world-area.tsx` / `run-screen.ts` (grep of `events`) — to verify that a reload,
  a load and a redraw carry no events (claim 3).
- `src/browser/sim/game.ts:770-830`, `src/browser/sim/run.ts` (event kinds) — to verify that each moment is accompanied by its event.
- `src/browser/sim/data/actions.ts` — to verify the shared icons named by the return step.
- `src/browser/styles.css:1860-1950` — to verify the mirroring of the fall and the display of the death sheet.
- `tests/view/scene-picture.test.mjs`, `tests/view/scene.test.mjs` (grep only) — to see which tests protect the claims.

## Unread material

none of the dispatch. Read whole: the handoff, `.the-way/task-cycle/review/SKILL.md`, the task (`task.md`), the return report, D-322,
D-04, D-311, D-315, D-316, D-319 (each whole, as printed from `foundations/decisions.md`). Read only in part, as a reach: the files listed
above, by the passages named.

## Searches not found or unclear

none
