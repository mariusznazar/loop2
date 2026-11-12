PASS a3125aaad786274c9c729ea32da940dc3387621a

# Review 2 — the fix of review 1's findings, task "swit-rosnacy-z-passa"

Variant: the fix of earlier findings (`.the-way/task-cycle/review/fix.md`). Fix range
`83c8369a58703dcf4f471226635bc424d5135da0..a3125aaad786274c9c729ea32da940dc3387621a`, two commits:
`78957216` (code and tests) and `a3125aaa` (foundation and styleguide). `git rev-parse HEAD` in the
worktree is `a3125aaa…`, as dispatched. The findings file `reports/findings-1.md` bounds this review.
The orchestrator's rulings are I1 way (b), M1 per the pinned template, M4 with the look unchanged and
shown, and M6 the 35.5 °C anchor.

Result: every finding is fixed. The fix diff adds no Critical or Important finding. It adds two Minor
notes, which block nothing.

## Each finding

- **I1: fixed.** `src/browser/view/scene.tsx` now renders the flight effect after the mage and
  before `.scene-tint`. D-315 (`foundations/decisions.md`, statement, *Verification*, *Rationale*)
  now names "the flying icon on its plaque" among what lies under the layer, with the plaque taking
  the hue recorded as an accepted cost. D-315 keeps its two exceptions, as row 1 says. The styleguide
  scene paragraph and the comments in `styles.css` and `scene.tsx` say the same, so code, test, entry
  and styleguide now agree. The test guards it: I restored the reviewed head's `scene.tsx` in a
  scratch worktree, and `npm test -- tests/view/scene.test.mjs` failed (exit 1) in "the layers: the
  tint over everything the scene draws, the flying icon and the dust included, …" alone.
  On the ruling itself: way (b) follows the human's settlement literally and needs no new decision
  from the human. D-365's "solid `panel`" still holds as a style: the plaque is a solid plaque whose
  `panel` takes the tint's hue. The author measured 15.8:1 or more between the icon and the plaque
  under every tint, against the roles' 4.5:1. I see nothing wrong with the ruling.
- **I2: fixed.** D-271's statement now says that "the frost and the specks are squares … in colours
  of the palettes of the packs, while the colours of the tint layer have their source in the human's
  choice". The *Rationale* draws the same line ("the frost and the specks … in colours of the packs'
  palettes and the tint layer in the colours the human chose from a preview"). *Verification* still
  says the frost uses "colours the pictures of the pack's trees hold". The change's own tint tokens no
  longer contradict the entry.
- **M1: fixed.** D-372 and D-373 read `- **Origin:** none`. In D-132, D-271, D-315 and D-316 the
  *Origin* block is identical to the base `7846213c`: I took an md5 of each extracted block at both
  commits and they are equal. `git grep -c swit_rosnacy HEAD -- foundations` finds nothing (exit 1).
  The reasoning stays in each *Rationale* and *Rejected*.
- **M2: fixed.** The D-271 statement, *Verification* ("its outline or its fill 3:1 or more";
  violates: "outline and fill both … under 3:1") and *Rationale* now say "outline or fill", as row 5
  does.
- **M3: fixed.** D-372 now says "16 pixels … at its deepest" and "its thickness is the depth of its
  deepest teeth". *Verification* gives the depths of the deepest teeth: 8 at 36 °C, 16 at 35 °C.
- **M4: fixed as ruled (shown, look unchanged).** D-372 and the styleguide say the frost is the
  outline alone at its first one or two pixels. The fix added screenshots `08-scene-frost-1-pixel.png`
  and `09-scene-frost-2-pixels.png` at commit `1ef193d6` of `mariusznazar/screenshots`. I viewed both:
  at 1 pixel a dotted dark teal line runs along the edges, and at 2 pixels a little white appears.
  They agree with the code.
- **M5: fixed.** The test comment (`tests/view/scene-frost-contrast.test.mjs:32-40`) names a source
  for each snow sample. It also says what the test guards (the outline token against samples measured
  once) and what it does not (a change of the tint tokens). I checked the samples it attributes to the
  preview: `#c2cebe` and `#d4caa5` stand in the preview's table (a) (`podglad-swit/index.md:93-94`,
  `pomiary.txt:6-7`). My review 1 called them "not in the task", which was true, but they do come from
  the preview the task cites, so the new attribution is right. The styleguide's overclaim is gone.
- **M6: fixed.** The case "warming at the fire takes the frost back" now starts at 35.5 °C and expects
  12, which the linear rule fixes exactly (0.75 × 16). The fix report corrects the earlier claim and
  says the rounding between anchors is now left unpinned on purpose. No other case pins it: the
  remaining values 36.5 → 4, 36 → 8 and 35.5 → 12 are all exact.
- **M7: fixed.** The scene part of the styleguide no longer writes 0,80, 2 s, the tooth periods, 20
  minutes or 0/8/16; it points to D-316, D-372, D-373 and the rules in `src/browser/styles.css`. A
  grep for those values in the styleguide finds none. The 3:1 stays, since it is D-271's rule.

## New in the fix diff (Minor; they block nothing)

- **N1.** D-372's statement (`foundations/decisions.md`, D-372) says that "at the first one or two
  pixels of thickness it is the outline alone". At a thickness of 2 the fill already stands one pixel
  deep on the deepest teeth: the body's depth is 1, its deepest-teeth row is 1 pixel on 2 of every 7
  columns, and screenshot 09 shows a little white. The styleguide words it correctly („a wypełnienie
  dochodzi z kolejnymi pikselami”). Suggested wording for D-372: "at its first pixel the outline alone,
  and at its second almost so".
- **N2.** The test comment speaks in the first person ("my measurement of the scene … on 2026-11-12").
  "the author's measurement in the cycle swit-rosnacy-z-passa" would read correctly for the next
  reader. This is cosmetic.

## Checks run

| Check | Command or method | Result |
|---|---|---|
| Head | `git rev-parse HEAD` | `a3125aaa…`, as dispatched |
| Fix diff | `git log` / `git diff 83c8369a..a3125aaa` | 2 commits, 6 files; no file under `assets/sprites/` |
| Focused tests (detached scratch worktree of `a3125aaa`, `node_modules` linked) | `npm test -- tests/view/scene-picture.test.mjs` | exit 0, 50 pass |
| | `npm test -- tests/view/scene.test.mjs` | exit 0, 47 pass |
| | `npm test -- tests/view/scene-frost-contrast.test.mjs` | exit 0, 2 pass |
| Guard for I1 | reviewed head's `scene.tsx` restored in the scratch worktree, then `npm test -- tests/view/scene.test.mjs` | exit 1, only the layers test fails; restored |
| Format | `node node_modules/prettier/bin/prettier.cjs --check` on the 4 changed code and test files | exit 0 |
| Lint | `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the 3 changed TS/MJS files | exit 0 |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | exit 0, 0 errors |
| *Origin* restored | md5 of the *Origin* block of D-132, D-271, D-315 and D-316 at `7846213c` and at `HEAD` | equal pairwise |
| Task document gone | `git grep -c swit_rosnacy HEAD -- foundations` | no match, exit 1 |
| Source of the snow samples | Grep of `the preview folder of the task's refinement, outside the repository` for `c2cebe`, `d4caa5` | `index.md:93-94`, `pomiary.txt:6-7` |
| Screenshots 08 and 09 | `gh api … contents/loop2/swit-rosnacy-z-passa/<file>.png?ref=1ef193d6…`, viewed | agree with the code |
| Reviewed worktree untouched | `git status --short` after all checks | clean; scratch worktree removed, its junction unlinked first |

Not run:

- The full `npm test`, which the handoff excludes.
- The invariant, quality and type tests the author lists. The fix changes no token, sprite or build
  file, and Prettier and ESLint were run directly.
- The plaque contrast measurement in a real browser. I relied on the author's numbers, which the
  ruling asked for and which I did not repeat.

## Reaches beyond the dispatch

- The preview folder `the preview folder of the task's refinement, outside the repository` (grep only): to
  check the new source attribution of M5.
- The screenshots at `1ef193d6` of `mariusznazar/screenshots`: to judge M4.

## Unread material

The findings file, the fix report and the handoff were read whole, and the fix diff was read whole.
No new decisions were selected: the fix review is bounded by the findings file. The D-315, D-271 and
D-372 hunks were read in the diff with their context, and the entries were read whole in review 1.
The preview's `index.md` and `pomiary.txt` were not read beyond the grep hits.

## Searches not found or unclear

None.
