PASS 66b814d1469632c429cd2d3f23864780053304ae

# Review of the fix of round 1 — task wilk-wbiega

Fix range `e717ec0f20dba485f648b0c7602c2ccdf5513061..66b814d1469632c429cd2d3f23864780053304ae`, three
commits (`03f77d63`, `5221ca50`, `66b814d1`), 7 files, +196 −64. `git rev-parse HEAD` in the worktree is
the head given; the worktree was left untouched (`git status --short` empty). Checks ran in a separate
clone of the head under `.runs/review-2-check`, with `.the-way` at
`55afa8e57aa1b83c77108576a36642722e0dda15`, deleted at the end.

Findings that remain: none. New Critical or Important findings: none. New Minor: 1, within the task.
Out of scope: 0.

## The findings of `reports/findings-1.md`

**I-1 (Important) — fixed.** `src/browser/view/scene.tsx:617-650` (commit `03f77d63`) now asks
`sceneEffect` and `creatureEffect` separately and keeps the creature's effect in a state of its own
(`creatureEffects`, type `SceneCreatureEffect` split from `SceneEffect` in
`src/browser/view/scene-picture.ts:576-604`), with its own end handler `creatureEnded`
(`scene.tsx:736-742`), so the flight or the dust and the run in both play. Evidence:
- The new test "a reading that carries the attack together with the end of a gathering shows the flight
  or the dust and the wolf's run in" (`tests/view/scene.test.mjs`, after line 2520) fails on the code of
  `e717ec0f`: I put `scene.tsx` and `scene-picture.ts` of `e717ec0f` into the clone, rebuilt, and it
  failed with "a hit: the wolf runs in: expected a true value, got false"; on the head it passes. It also
  checks that each slot's end leaves the other effect standing.
- In the real game at 1×, a composed state whose attack minute (200) also ends a gathering showed one
  `.scene-flight` and the wolf with `data-entering` in the same reading; the wolf ran from the right edge
  to its place in about 300 ms while the icon flew, then the scuffle went on. At 16× the same reading
  (which carried minutes 199–201) showed the flight and the run in together.
- The author's claim that the outcome effects cannot lose the same way holds: in the minutes of a combat
  `run.current` is `null` (`src/browser/sim/run.ts:763-768`) and `minuteBeforePick` returns no finished
  activity while `activeCombat` stands (`run.ts:518-525`), so no gathering ends between the attack and
  the outcome; a reading that carried the outcome together with a gathering's end from before the attack
  would also carry `attacked` and be dropped as overdue. A gathering started in the outcome minute and
  ended in the same reading would now play beside the outcome anyway, since the slots are apart.

**M-1 — fixed.** `src/browser/view/credits.ts:54` and `tests/view/icons.test.mjs:211` read
„Kurz i obłok walki” (commit `5221ca50`); `node --test tests/view/icons.test.mjs` passes.

**M-2 — fixed.** `foundations/decisions.md:7628` reads "what attacks it and the moment of the map run"
again, the projected words; nothing else of D-316 changed (commit `66b814d1`).

**M-3 — fixed.** The eight comments open with D-numbers only; no Q number is left in `tests/` or `src/`.

**M-4 — fixed.** The side test (`tests/view/scene-picture.test.mjs:1340-1373`) reads the places from
`SCENE_PROPS[*].mageAt`, `SCENE_FIRE.mageAt`, `SCENE.clearingX` and `SCENE.rightEdgeX`, checks the gap
against `SCENE_FIGHT.gap` and the figure's columns, and no longer pins `gap === 2`. Other tests still
use the pixel numbers that follow from the gap of 2 (191, 182, 228); the finding named this test, and
those are tests of one placement each, so this stays fixed.

**M-5 — fixed.** D-317 *Rejected* reads "a classification made anew for each kind of effect"
(commit `66b814d1`).

## The change the fix added: the run in counts only while the scene goes or is paused

`scene.tsx:832-836` sets `entering` only where `drawing.standing` is `going` or `paused`. It holds: a
death or a completion inside the 300 ms of the run in (at 16× the combat is decided 312 ms after the
attack) stops the scene for good, and without the guard the wolf stayed on its run sheet partway across
the frame. In the real game at 16× (the state above, whose combat ends in the mage's death), the wolf was
at x 398 of 672 on its way when the reading of the death came, and the next sample showed it standing at
its place, idle, with `data-entering` gone. It agrees with D-317 (an effect whose turn has passed is
dropped; the wolf then stands where the state puts it, as after a load) and with D-322 (nothing moves at
a death or a completion; the wolf standing beside the dead mage is what D-316 asks). It cannot replay the
run after a discovery, since no discovery comes in the minutes of a combat (D-71: discoveries come from
the body, an ending action or the attack, and the body stands still and no action ends in those
minutes). Its test, "a death or a completion in the 300 ms of the run in leaves the wolf standing beside
the mage, not held on its way", fails on `e717ec0f` and fails on the head with the guard removed (both
seen); it composes the death and the completion with `activeCombat` still set, which the simulation
never produces, but the guard reads only the standing, so the test exercises what it names.

### New Minor (within the task)

**N-1 — The `paused` half of the guard has no test.** I changed the guard to `going` alone and every test
of `tests/view/scene.test.mjs` still passed (71). Without `paused`, a player's pause inside the 300 ms of
the run in would drop `data-entering`, and „Wznów” would put it back and start the run again from the
right edge, an effect after its turn (D-317). The code is right today; a test of a pause and a resume
inside the run in would keep it so.

## Trust boundary

Still `assets/sprites/**`, and no file of it changed in this range (`git diff --stat` lists no file
under `assets/`), so the verification of round 1 (pixels alone, the source's cells unmirrored, same bytes
in the build) stands.

## Real browser

`npm run local` in the clone, Playwright CLI, an account at `example.test`, states composed by my own
script from the game's functions and sent by the save request; a run-code script set the pace and the
motion setting, pressed „Wznów” and sampled the scene every 30 ms with a few clipped screenshots
(looked at, kept nowhere, deleted with the clone). Seen:
- I-1 at 1× and at 16×, and the guard at 16× (above).
- The right edge, 1× (a program of „Wędruj”): the mage at the right edge turned left; the wolf ran in from
  the right edge past the mage, unmirrored while running, and stood on its left, mirrored, facing the
  mage, with the cloud between them.
- Reduced motion, 1×: the wolf stood at its place at once in the reading of the attack, no animation on
  the wolf or its bite frames; at the defeat the wolf lay still in its last death frame for about 300 ms
  and was gone.
- Not seen: a departing wolf (my composer found no seed with a departure, also with dodging practice or a
  raised health) and a map solved in the minutes of a combat; both rest on the tests.

## Checks run (in the clone of the head)

- `npm ci`, `npm run build`, `npm run typecheck` — exit 0.
- `node --test tests/view/scene-picture.test.mjs tests/view/scene.test.mjs tests/view/icons.test.mjs` —
  exit 0, 172 pass.
- The two new tests on the scene code of `e717ec0f` — both fail (exit 1), as above; the guard test with
  the guard removed — fails; the guard reduced to `going` — all 71 of `scene.test.mjs` pass (N-1).
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `npm test --` `tests/quality/test_quality_invariants.py`, `tests/invariants/test_content_identifiers.py`,
  `tests/invariants/test_browser_view_token_values.py`, `tests/invariants/test_icon_credits.py` — each
  exit 0.
- The browser runs above.
- Not run: the full `npm test` (the cycle's own run); the container-sprites test (no sprite changed);
  Stryker (no simulation file changed in this range).

## Declined to judge

none

## Reaches beyond the dispatch

- `src/browser/sim/run.ts:515-783` — to check the author's claim about the outcome effects.
- `.claude/skills/loop2-play/SKILL.md` and `tests/sim/program-fixture.mjs`,
  `tests/sim/understanding-fixture.mjs` — to compose states and run the game.

## Unread material

none of the dispatch (the handoff, `fix.md`, the findings file, the fix report and the fix diff were read
whole). Of my own selection for the whole change: unchanged from `review-1-report.md` (346 decisions,
30 read whole, 316 by title); this range touches only D-316 and D-317, read whole again in their changed
lines and contexts.

## Searches not found or unclear

- No seed of my composer gave a departure, so the run off was not seen in the browser.
