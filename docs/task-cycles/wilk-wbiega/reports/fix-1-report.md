# Fix 1 report — task wilk-wbiega (findings I-1, M-1 to M-5)

**Status: done** (every finding fixed; none contested). Fix range from `e717ec0f`.

Commits (private address; not pushed):
- `03f77d63` fix — I-1, a defect of my own found while checking it (below), M-3, M-4 (code and tests)
- `5221ca50` fix — M-1 (credit typo, code and test together)
- `66b814d1` docs — M-2 and M-5 (D-316, D-317)

## Findings

**I-1 (Important) — fixed.** Cause confirmed: `sceneEffect(...) ?? creatureEffect(...)` and one effect slot, so a
reading with `activityFinished` of a gathering and `attacked` lost the run in.
- Fix (my choice, the smallest reversible reading): the scene keeps the creature's effects in a slot of their
  own (`creatureEffects` beside `effects`; type `SceneCreatureEffect` split from `SceneEffect` in
  `scene-picture.ts`; own end handler `creatureEnded`). Each reading asks both functions and each slot keeps its
  own effect, so the flight or dust and the run in both play. Option rejected: let `creatureEffect` win (or
  merge both into one effect object) — it would lose the flight/dust instead, or put two unrelated parts of the
  scene into one element. Cost if wrong: the two slots are one state hook more; folding them back is one edit.
- Test (new, `tests/view/scene.test.mjs`, "a reading that carries the attack together with the end of a gathering
  shows the flight or the dust and the wolf's run in"): a hit (flight) and a miss (dust) read together with
  `attacked`; asserts the effect, the wolf `data-entering`, the cloud; then that the run's end does not take the
  gathering's effect and the effect's end does not stop the run. Failed on `e717ec0f` code
  (`npm test -- tests/view/scene.test.mjs`, exit 1: "a hit: the wolf runs in: expected a true value, got false"),
  passes after (exit 0, 71 tests). The test's first draft had a setup mistake of mine (the patch replaced the
  run), fixed before the failing run above, which fails for the stated reason.
- The same loss for the outcome effects: **does not exist**, and cannot. A gathering ends only in the minutes
  outside a combat (an attack sets `current: null` and nothing runs until the combat resolves), so a reading
  that carries `combatEnded` together with the end of a gathering also carries the `attacked` of that combat (two
  marks, overdue, shown none), and a reading that starts inside the combat has no end of a gathering. Evidence:
  `.runs/wolf-scripts/both.mjs` on the head `e717ec0f` build, 300 seeds of a manual map run of Las — głębiej with a
  program that gathers: at 1 minute per reading, 97 readings with an `attacked` mark, 12 of them with a gathering
  effect and a run in both non-null (the lost run in); 97 readings with `combatEnded`, 0 with both. At 3 minutes
  per reading: 97 / 17 and 97 / 0. (The numbers differ from the reviewer's, 6 and 11, since my script counts
  every non-null gathering effect; the order of magnitude is his.) The two-slot design makes the outcome
  effects independent too, so the case is covered if it ever arises.
- Real game (`npm run local`, Playwright CLI): `.runs/wolf-scripts/bothstate.mjs` finds, by playing seeds, a
  saved state one game minute before an attack that also ends a gathering (a hit at minute 209). Loaded on the
  page and resumed at 1×: at minute 210 the page held one `.scene-flight` and one `.scene-creature` with
  `data-entering` at the same time; both were gone from the DOM state after about 300 ms (entering false, flight
  0). At 16× the same: flight 1 and entering true together. (The reviewer's own way, a manual run with an
  attack in the minute a gathering ends, is what that state is.)

**Found by me while checking I-1, fixed (small, my own code).** At 16× the combat is decided 312 ms after the
attack, so a death (or a completion) can come within the 300 ms of the run in. The scene then stands still for
good (`.scene:not([data-standing="going"]) *` pauses every animation), and the wolf stayed on its run sheet
partway across the frame (`data-entering` true in the page 1 s later). Fix: `entering` holds only while the
scene is going or paused by the player (`scene.tsx`, one condition). Test: "a death or a completion in the 300 ms
of the run in leaves the wolf standing beside the mage, not held on its way" (fails with the condition removed,
passes with it). Real game at 16×: `entering` becomes false at the death. Not seen and left as it was: the effects
of the base (a flight icon, dust) also stand frozen at a death or completion, as D-322 says every animation stands
still; I did not touch that.

**M-1 — fixed.** `credits.ts` `name` and the line of `icons.test.mjs` read „obłok” now (the typo was my own
`łó` escape). `git grep obłók` finds nothing; `npm test -- tests/view/icons.test.mjs` exit 0.

**M-2 — fixed.** D-316 reads "what attacks it and the moment of the map run" again; every other sentence is as it
was. The entry still says what the code does: the scene draws the moment (`SceneMoment`) from its previous reading
and the events. Written by editing the entry in place as `the-way-record-decision` gives (binding sentence only;
no new link, `foundation_check.py` exit 0, "0 errors").

**M-3 — fixed.** The question numbers are gone from the eight comments (four in each test file); `git grep -E
'\bQ[0-9]\b' -- tests src guidelines foundations` finds none.

**M-4 — fixed.** The test now reads the mage's places from the data (`SCENE_PROPS[*].mageAt`, `SCENE_FIRE.mageAt`,
`SCENE.clearingX`, `SCENE.rightEdgeX`), asserts the side (right at each, left at the right edge), that the wolf's
frame lies inside the picture and that the gap is the data's `SCENE_FIGHT.gap` from the figure (columns from the
data; for the left side the mirror about the frame's middle), and no longer pins `gap === 2`. A new or moved
place that pushes the wolf out of the picture now fails it. Not changed, since outside the finding: other tests
(`scene-picture.test.mjs` cloud and effect tests, `scene.test.mjs` placement tests) still use literal pixels (191,
182, 228) that follow from the gap of 2; they are tests of one decision's numbers.

**M-5 — fixed.** D-317 *Rejected*: "a classification made anew for each kind of effect — the classifications could
exclude one another".

## Checks (command and exit code)

- `npm test -- tests/view/scene.test.mjs` exit 1 before the fix (new test), exit 0 after (71 pass)
- `npm test -- tests/view/scene-picture.test.mjs` exit 0 (69 pass)
- `npm test -- tests/view/icons.test.mjs` exit 0
- `node --test tests/view/*.test.mjs` exit 0 (1212 pass, 0 fail)
- `python -B .the-way/elements/common/foundation_check.py` exit 0 ("0 errors")
- `npm test -- tests/quality/test_quality_invariants.py` exit 0; `tests/invariants/test_browser_view_token_values.py`
  exit 0
- `npx tsc -p tsconfig.browser.json --noEmit` clean. Not run: the full `npm test`; the Docker container-sprites
  invariant (no sprite file changed in this fix).

## Own-work check

The requirement the fix most likely misses: "at an attack the wolf runs in, except overdue / load / reduced
motion / the first attack's stop". Checks: the new tests (unit and DOM) and the real game at 1× and 16× with a
reading that carries a gathering's end and the attack (above). Seen in the browser this round: only that
scenario (1× and 16×, wolf entering together with the flight; the stuck run in at 16× before the guard and its
end after). NOT run in this round, so not claimed seen by this round: a departing wolf, a map solved in the
combat, the right edge, reduced motion (those were in my first round's browser check, kept in the earlier report).

## `ui_check.md`, read whole

It asks: (1) check the states of the affected components that the styleguide requires and inspect a screenshot of
the running product by the route the foundation settles; (2) a screenshot shown to the human lies in the place the
foundation settles (the public screenshots repository, per `loop2-play`), named in the report; (3) describe
motion in words, keep logs in the report; (4) check in a way that shares no browser with another cycle and close
the browser. Where I stand: the states of the scene's wolf (run in, scuffle, four outcomes, stops, reduced
motion, the right edge, 16×) were checked in code (tests) and in the running game, motion described in words,
numbers in the report; each browser session was Playwright CLI (its sessions are per workspace, so none is shared)
and was closed (`playwright-cli close`, `npm run local:stop`) after each check, also this round. Screenshots: I
inspected element screenshots of the scene in the first round and none in this round; **none was kept or
pushed**, so the report names no place and the request has no image of the wolf to embed. Still undone: if the
human is to see the wolf, a screenshot has to be taken and pushed to the screenshots repository by the playbook
(a state: composed with `.runs/wolf-scripts`), and the states I did not see in the browser this round (above) are
checked only by the earlier round and by tests.

## Unread material

- `reports/review-1-report.md`: not read (the findings file carried the evidence I needed).
- `.the-way/task-cycle/change/SKILL.md` and `fix.md`: read in the first round and now `fix.md` whole; `SKILL.md` not
  re-read.
- The projected-mode and `write.md` files of the decision element: not opened (the edits were in-place changes of
  a binding sentence and a *Rejected* clause).

## Searches not found or unclear

- None unclear. The reviewer's 6 / 11 counts of the lost run in against my 12 / 17: both scripts replay seeds, mine
  counts every non-null gathering effect (including flights where the reviewer may have counted a subset);
  the finding stands either way.
