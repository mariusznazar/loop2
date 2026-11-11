PASS fa4d8bdbf39cc5f90b2ce807476f3057c1dca627

# Review of correction 1 — the human's remarks on the open request (task "Zbieranie jako widowisko")

Range 761ff8b189f3aa9876b8d4f115921191893058a8..fa4d8bdb (one commit; `git rev-parse HEAD` = fa4d8bdbf39cc5f90b2ce807476f3057c1dca627). Method: `.the-way/task-cycle/review/fix.md` (correction variant) and section 2 of `review/SKILL.md`.

Changed files (numstat): `foundations/decisions.md` +5/-5, `guidelines/styleguide-browser-view.md` +5/-3, `src/browser/sim/data/scene.ts` +7/-2, `src/browser/view/scene.tsx` +2/-2, `tests/view/scene-picture.test.mjs` +3/-3.
Trust boundary `assets/sprites/**`: no file under `assets/` is in the range (`git diff --name-only | grep '^assets/'` found none).
Not touched: the dust's drawing and place (`scene-picture.ts`, `styles.css`, `Effect` in `scene.tsx` are not in the diff), the colours and frames (no asset, no `SCENE_DUST`), and the contested finding (no minute threshold in `sceneEffect`).

## Each remark

1. D-366 *Rejected* `none considered` -> `unknown`: **made** (`decisions.md`, D-366 last line).
2. "Any other reading shows none" -> "starts none": **made**. The tail still reads true and now says what the code does: not starting an overdue effect (stop, several ends, backpack-spending end), "an effect already running finishes, standing still while the scene does" (`scene.tsx` keeps `effects.shown` until `animationend`; `styles.css` `.scene:not([data-standing="going"]) * { animation-play-state: paused }`), and a new effect replaces a running one (`serial + 1`). Verification examples now say "starting nothing" for the two-ends, "Zjedz" and discovery cases, and a new example, "an effect running when the pause comes standing still and finishing when the game goes on", which is true of the CSS rule. The styleguide sentence was changed the same way.
3. "as it stood" -> "at the place the mage stands or walks to at the previous reading": **made**, in the binding sentence, the Rationale, the styleguide section and the comment in `scene.tsx` (all four match `current.x` = `Shown.x`, "where it stands or walks to"). The Verification examples ("the mage that gathered", "an icon that lands where the next action leads the mage") needed no change and are still true.
4. D-363 Rationale: "usually reaches the sticks and the moss walking left", bush clause dropped: **made**, and true against the data (sticks 42 and moss 32 lie left of the clearing at 144).
5. Meaning sentences: **made** in the correction report, English and Polish, for D-363 and D-366, marked "the cycle's". Both are one sentence each. Form per `foundation_step.md` is met.
6. The figure's middle: **made**. `SCENE.mageMiddle: 32` in `src/browser/sim/data/scene.ts` (its comment says the figure is columns 20 to 44 of 64; I checked this against the places in the `mageFaces` comment: frame 32 gives figure 52 to 76, so the middle is 32). `SCENE_EFFECTS.body.x` and `.feet.x` use it, and the facing test uses `SCENE.mageMiddle` (`SCENE` was already imported from `dist`). Values are unchanged (still 32), so no behaviour changed. The other literals 32 in the tests are the moss's mage place (`MAGE_AT_MOSS`), the test title of the flight, and the hand-computed expectations of `effectOf`; the report says they stay hand-computed on purpose so the test does not take its expected value from the data, which I accept. `content-identifiers` holds: the new value is in `sim/data/`, names no resource or map, and `SCENE_EFFECTS` (same file, declared after `SCENE`) reads it.

## Findings

Critical / Important: none.

Minor, inside the task:
1. D-366 "an effect already running finishes" is stated without the exceptions: `scene.tsx` clears a running effect when the map run is gone or a map run starts (`if (drawing === null || started) { ... shown: null }`), so it does not finish there; and after a death or completion it stays frozen until the map run is left. The sentence is a binding one, so a later agent could read the exceptions as breaches. Suggested tail: "an effect already running finishes, standing still while the scene does, unless the map run ends or a new one starts". The "a map run started does not accompany" clause of the same sentence covers only starting.
2. D-366 *Rationale* last clause, "the effect belongs to the mage that gathered, which is the place the mage stood or walked to at the previous reading", equates a mage with a place; grammatical but loose. Wording only.

Minor, outside the task: none new. (The glossary candidate "reading" of my earlier review is unchanged and was let through by the human.)

## Declined to judge

- Dust drawing, place, colours, frames and real-browser checks: the human let them go; confirmed not touched.
- The contested no-minute-threshold finding: let through by the human; confirmed not touched.

## Checks (command, exit code)

- `git rev-parse HEAD`, `git diff --numstat`, `git diff --name-only 761ff8b1..fa4d8bdb | grep '^assets/'` (none) — 0 / 0 / no match
- `python -B .the-way/elements/common/foundation_check.py` — `0 errors`, exit 0
- `npm test -- tests/view/scene-picture.test.mjs` — 40 pass, 0 fail, exit 0
- `npm test -- tests/view/scene.test.mjs` — 35 pass, 0 fail, exit 0
- `npm test -- tests/invariants/test_content_identifiers.py` — 4 tests OK, exit 0
- Not run: the full `npm test`; typecheck, prettier and eslint (the author reports exit 0 for them; I did not repeat them).

## Reaches beyond the handoff

- `src/browser/sim/data/scene.ts` lines 25-70 (the `mageFaces` comment and the sheets' comment) and the `SCENE_EFFECTS` block: to verify "columns 20 to 44" and that no second copy of 32 remains in the data comment.
- `src/browser/styles.css` stop rule and `scene.tsx` clearing branch: to check the claims of D-366.

## Unread material

D-363 to D-366 read whole in the diff context and in my earlier review; D-317 and the other entries of the previous review not re-read (not in the diff). The styleguide section was read through the changed paragraph only. `.the-way/task-cycle/skill/correction.md` not read (not needed by the handoff).

## Searches not found or unclear

none
