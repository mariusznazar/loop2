PASS 713c4defbf31c8f7fcdb94094cc05a0ad3461d37

# Review of correction 1 (the human's remarks on request #179) — task `paski-parametrow`

Range `18c16b69..713c4def`, three commits (`c9441aa2`, `4f886004`, `713c4def`), six files, diff computed by me. `git rev-parse HEAD` = `713c4defbf31c8f7fcdb94094cc05a0ad3461d37`; `.the-way` at `b502011f`, equal to the gitlink. Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md` (the remarks take the place of a findings file).

Counts: blocking 0; Minor within the task 3; outside the task's scope 0. One note for the orchestrator on the request's description (end of the findings).

## Each remark: made or not

| Remark | What the human said | Verdict | Evidence |
|---|---|---|---|
| 1. Real blows in a running game | fix in this request; whatever is wrong, fix | **made** | One fault found: the rising text was crossed by the health bar (before-fix outputs `correction-1-desk-1x-blow.txt`: last rect `468.2..486.3` against bar `475.5..479.5`; my 5× crop of screenshot 01 shows the green bar running through „−21 · wilk”). Fixed in `713c4def`; after the fix the text stands at `480.2..498.3` in every frame, 0 of 141 and 0 of 216 frames over the bar (`correction-1-after-q1-blows.txt`); my crops of 06, 07 and 08 show it clear under a free bar end. The cases are judged under "Evidence of the running game" below. |
| 2. Sum of blows on a killing blow | let through | **not touched** | `src/browser/view/body-blow.ts` and D-450's binding sentences are not in the diff. |
| 3. Scene picture at 360 px | check by eye; fix only if cut off and a few lines of CSS | **made (checked, no fix needed)** | Screenshot 05 at 360 × 740: I read the pixel row at y = 200 — the frosty white edge of the picture stands at x 12–15 on the left and 343–347 on the right, the picture is 336 px wide, drawn 12..348, inside the window and the frame; 5× crops of both edges show it whole. Not cut off, so leaving `.scene-place` unchanged is what the remark asked. |
| 4. Partial reading of the review of the whole change | let through | **not touched** | Nothing in the diff answers it. |
| M-1 (`decision:` D-311 at the test of the bar under each value) | fix | **made** | `tests/view/body-row-cells.test.mjs:278` quotes D-311 from the start of its sentence "The world holds, from the top, …" to "with a bar under each of its values"; the case holds a bar or scale under the head of each of the four cells. |
| M-2 (energy number in `text` at 100) | fix | **made** | `tests/view/body-row-cells.test.mjs:247-265` draws energy 100 and asserts all four numbers in `var(--text)`. |
| M-3 (open explanation moves the backpack down) | fix | **made** | New case `tests/view/body-row-explanation.test.mjs:125-154`: order `body-cells`, `body-explanation`, `backpack-text`; row `flex`/`column`; explanation `block`/`static`/`none`. See Minor 2 for what it does not hold. |
| M-4 (repeated D-450 line) | fix | **made** | One D-450 line remains at `tests/view/body-row-explanation.test.mjs:88`. |
| N-1 (styleguide rule repeats decisions) | let through | **not touched** | The changed sentence of the rule adds the look of the text and its reason; it restates no further decision. |
| Items 5–10 | accepted by merging | — | Nothing in the diff changes them; item 7's wording in the request is now stale (note below). |

Nothing outside what the remarks call for: the blow-text fix answers remark 1 ("Co wyjdzie źle — popraw"); the `tests:` clauses of D-178 and D-450 follow M-2 and M-3.

## The departure: the text stands still and only fades (Q7)

Inside the task and the entries. Reasons:
- The rise is in the task's *Context* only („napis wznosi się i znika przez 1,3 s”, a description of the old Loop), not in an answer, a settlement or a decision in play. *To do* 4 asks for „znikający napis … jak w starym Loopie”; the text still vanishes, and *To do* 9 lets the agent depart in look and motion („wygląd, … ułożenie”) within what Mariusz chose, if it is shown on screenshots and named at the request. No unchosen variant is taken.
- D-450: "shows the fading „−{n} · {stworzenie}”" — true; "under the system's setting for reduced motion the cell does not shake and the text stands still and goes" — true (step-end, full colour, gone at 1.3 s). The sentence now differs from ordinary motion only by the shake and by fade versus step; it is still literally true, and no sentence says the text moves. *Rationale* "The text fades in the same real time at every pace" — true.
- D-42: "the fading text of a blow … judged by 2.3.1" and its clause "the fading text of a blow once in 1.3 s" — true. The `ease-in` curve keeps the text above half opacity until about 0.85 s (`correction-1-after-q1-blows.txt`: 0.83 at 449 ms, 0.55 at 800 ms), where the old `ease-out` rise was below half from about 0.45 s.
- D-337: says only that the health cell shows a blow "as D-450 gives". D-396: the text stays inside the cell's box (0 violations in every after-fix run).
- The rule "The body row of a map run", „Znacznik ciosu” (`guidelines/styleguide-browser-view.md:1531-1552`): the new sentences say what the CSS does — still at its place, a smooth fade slow at first, the bar and its end free, under reduced motion full colour then gone at once.
- The new look reads: crops of 06 (≈0.94 opacity) and 07 (≈0.5) show „−21 · wilk” plainly under the bar, the bar's end at 79 % free; 08 (phone) the same, the glyphs clear of the bar (the line box overlaps the bar's bottom by 0.3 px, as the agent said; the glyphs do not touch it).

The departure still has to be named at the request for the human's veto (note below).

## The CSS of `713c4def`

I read every changed line of `src/browser/run-screen.css` (+19/−22) and the surrounding rules (lines 760–913):
- One set of keyframes, `body-blow-text-fade`, changes only `opacity` to 0 (`:909-913`). Its comment and the block comment (`:800-819`) speak of no rise. `body-blow-text-rise` and `body-blow-text-still` stand nowhere in `src/`, `tests/` or the guidelines (searched).
- Base rule `.body-blow-text` (`:825-838`): 1.3 s, `step-end`, fill `both`, in the health cell's own box (`position: absolute; right; bottom` unchanged). Under `prefers-reduced-motion: no-preference` only `animation-timing-function: ease-in` (`:863-865`): same selector, later in the sheet, so it overrides.
- The stop with game time (`:868-871`), the shake (`:850-861`, `:881-903`) and the pulse (`:841-848`, `:874-878`) are unchanged. The end of the marker still comes from `onAnimationEnd` and `animationcancel` on the text (`src/browser/view/body-row-cells.tsx:90-96, 187-195`), which read no animation name.
- Under reduced motion the look is the same as before the correction: the old `body-blow-text-still` had the same body and the same `step-end`.
- Nothing else in the file changed behaviour.

## The tests of `c9441aa2` and `713c4def`

- **The motion case** (`tests/view/body-row-motion.test.mjs:526-595`): it fails on the old stylesheet, since the old rise keyframes declared `translate: 0 calc(-1 * var(--space-m))` at 100 %. The removed assertions ("and rises", `rising !== still`) belonged to the dropped look; the change has a cause on the side of the requirement, as "Changing an existing test" in `guidelines/testing.md` asks, and the comment names the styleguide's rule, as other view tests do (`tests/view/maps-screen.test.mjs:1473`, `tests/view/character-screen.test.mjs:235`). Gap: Minor 1.
- **The quotations:** the D-311 line (M-1) and the D-450 line (M-3) each start at the start of a binding sentence. Both tests hold the placement part of the quoted sentence. The D-450 quotation also carries the explanation's words, which this case does not hold; the sentence's start rule makes it unavoidable, and the other cases of the file hold the words.
- **The `tests:` clauses:**
  - D-178 (`foundations/decisions.md:7240-7241`): "in `text` at 0, 90 and 100, never in `danger`" says what the cases at 0, 90 and 100 hold.
  - D-450 (`foundations/decisions.md:11326-11328`): "in the flow of the row so that it moves the backpack down" says what the M-3 case holds (the flow), with the move as its consequence, which the case's comment leaves to the browser (D-87, D-88).
  - No binding sentence, *Rationale* or *Rejected* changed: the diff of `foundations/decisions.md` touches only the two *Verification* lines.

## Evidence of the running game

What the probes' outputs in `reports/` show, against what the report says:

| Case | After the fix | Shown by an output |
|---|---|---|
| 1× desktop | seen, twice | yes, `correction-1-after-q1-blows.txt` (blocks 1–2) |
| 1× phone 360 px | seen | yes, same file, block 3 |
| reduced motion | seen | yes, same file, block 4 (no shake, opacity 1.00 through 1297 ms, 0/216 over the bar) |
| pause during a blow, then „Wznów” | seen | yes, `correction-1-after-q1-pause.txt` (opacity 0.730 held for 1.5 s, `paused`; resumed from 0.720) |
| phone, paused right after a blow | seen | probe `correction-1-phone-pause-blow.js` kept, its output not kept (claim only) |
| a second blow replacing the first, killing blow before the window | seen at 2×, with the built bundle patched and restored | yes, `correction-1-after-q1-replace-2x.txt`; `git status` clean and the diff holds no `dist/` file, so the patch left nothing in the source |
| 2× and 4× | before the fix only | no output kept; the fix does not depend on pace (real-time animation) |
| 8× and 16× (no marker) | before the fix only | no output kept; the fix does not touch the pace logic, and the motion test "a blow at 8× or 16× shows nothing" holds it |
| killing blow at a stop (`… 37 100 5 fight`) | before the fix only | no output kept |
| bars growing after „Restart” | before the fix only | no output kept; the correction does not touch them |
| explanation open on the phone with a blow | before the fix (screenshot 03) | no after-fix screenshot or output |

The four steps of the request's check by hand (normal pace, the cell shakes and the number fades inside its cell, no number at 8×/16×, pause and resume) are covered: steps 1, 2 and 4 after the fix with outputs, step 3 before the fix by claim and in tests. Nothing missing touches what the fix changed.

## Anything broken or made worse

- Phone layout of the health cell: unchanged. The text's placement is not in the diff; on the phone the 0.3 px line-box overlap with the bar's bottom stood before, and the glyphs are clear.
- Reduced-motion look: unchanged.
- The pulse, the shake and the pause: unchanged rules; the pause output shows the text held.
- Nothing found.

## Findings

### Critical

none

### Important

none

### Minor — within the task

1. **The motion case claims more than it checks** (`tests/view/body-row-motion.test.mjs:526-593`).
   - Its comment says it catches "a text that moves from its place under the bar as it fades", but it reads only `translate`, `transform`, `bottom` and `top` in the keyframes (`:580-593`). A rise written with `margin-bottom`, `inset`/`inset-block-end`, `scale` or `rotate` would pass.
   - The smoothness check (`:575-579`) asserts only "not `step-end`", so `steps(1)` or `step-start` would pass too.
   - The CSS comment (`src/browser/run-screen.css:808-809`) itself says "The keyframes of the text change only its opacity".
   - Suggested fix: assert that each keyframe of the text declares exactly one property, `opacity` (`frame.style.length === 1`). That closes the gap without listing properties.
   - Evidence: the code of the case as read; no regression exists today, so this is broader coverage, Minor.
2. **The M-3 case does not hold the backpack in the flow** (`tests/view/body-row-explanation.test.mjs:130-154`).
   - The case asserts the explanation's `position` and `float` and the row's `flex`/`column`, but not the backpack's own `position`.
   - A `.backpack-text` given `position: absolute` (with a fixed top) would no longer be moved down by the explanation, and the case, named "… so it moves the backpack down", would pass.
   - Today `.backpack-text` (`src/browser/run-screen.css:686-689`) has no position, and the agent measured the move in the browser (505.3 → 542.9 px, a claim with no kept output).
   - Suggested fix: add `getComputedStyle(backpack).position === "static"` to the same case.
   - Evidence: the code of the case and of the stylesheet as read.
3. **One sentence of the styleguide can be read the wrong way round** (`guidelines/styleguide-browser-view.md:1538`).
   - The text: „Nie unosi się, jak napis starego Loopa”.
   - Polish allows the reading "it does not rise, as the old Loop's text does not". The rest of the sentence makes the intended reading likely, but a reader of the rule alone may stop at the comma.
   - Suggested wording: „W przeciwieństwie do napisu starego Loopa nie unosi się: …”.
   - Effect: wording only; the player sees nothing of it.

### Outside the task's scope

none

### Note for the orchestrator (not a finding of the diff)

The description of request #179 (read with `gh pr view 179`) still says, under "You accept by merging", item 7: "the fading number rises 12 px over 1.3 seconds and stands inside the health cell, at its lower right under the bar". The Polish half says the same: „znikająca liczba unosi się o 12 px przez 1,3 sekundy”.

Its *Checks* item 2 says the blow cases were "Not seen by anyone in a running game".

Both are now untrue. The departure (Q7) has to be named there for the human's veto, with screenshots 06–08 and the before-fix 01–02, as *To do* 9 asks.

## Declined to judge

- The wording of request #179's description beyond the stale passages named above: it is the cycle's step after this review, not part of the range.
- Test titles and comments that say "over the health cell" (`tests/view/body-row-motion.test.mjs:3,190,375`, `tests/view/body-blow.test.mjs:1`, `src/browser/view/body-blow.ts:5`): outside the diff; the return step left them, and they mislead about no behaviour.

## Checks I ran (on the head `713c4def`, in the reviewed worktree, nothing changed in it)

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/body-row-motion.test.mjs` | 0 | 9 pass |
| `npm test -- tests/view/body-row-cells.test.mjs` | 0 | 9 pass |
| `npm test -- tests/view/body-row-explanation.test.mjs` | 0 | 5 pass |
| `npm test -- tests/view/body-blow.test.mjs` | 0 | 8 pass |
| `npm test -- tests/view/world-area.test.mjs` | 0 | 19 pass |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| `npm run typecheck` | 0 | — |
| `npx prettier --check` on the run-screen stylesheet and the three changed test files | 0 | all formatted |
| `npx eslint` on the three changed test files | 0 | — |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 120 info` |

Manual checks:
- The eight screenshots, fetched from the two commits of `mariusznazar/screenshots` (each HTTP 200), viewed whole.
- Crops enlarged 5× (desktop health cell of 01, 04, 06, 07; both edges of the scene in 05) and 6× (phone health cell of 02, 08).
- The pixel row of 05 at y = 200 read for the scene's edges.

Not run:
- The full gate (`npm test` with no argument): the handoff leaves it to CI on the request, so nothing but CI runs it before the merge.
- No mutation of my own: the Minor findings rest on reading the cases.

## Reach beyond the dispatch

- The description of request #179 (`gh pr view 179 --json body`): to know the steps 1–4 remark 1 names and whether the description still matches the fix.
- `guidelines/testing.md` whole: the repository's instruction before reviewing tests.
- `foundations/decisions.md`: D-450 whole; the sentences of D-42 on the blow (by search, lines 5078–5090); D-337, the closing paragraphs (10990–11002); D-396, binding sentences and *Verification*; D-311, the first paragraph; D-178, the binding sentences and *Verification*. Read to judge the departure and the `tests:` clauses.
- `src/browser/run-screen.css` lines 648–689 and 760–913: the row, the explanation, the backpack and the blow's rules.
- `src/browser/view/body-row-cells.tsx`, the end handlers (search hits at 90–96 and 187–195): that no code reads the old keyframe names.
- `tests/view/body-row-motion.test.mjs` lines 80–149: the helpers the motion case uses.
- A search of `tests/` for "styleguide": precedent for a test comment naming a styleguide rule.

## Working copies

- `.runs/review-correction-1/` held:
  - the logs of the checks;
  - the eight fetched screenshots and my crops;
  - the request's body, `pr-body.md`.
- Removed whole before returning. No worktree was made.
- `dist/` was rebuilt by the product's own `npm test -- <file>` runs; it is the product's output, not a copy of mine.

## Unread material

- `guidelines/styleguide-browser-view.md`: only the rule "The body row of a map run" (lines 1421–1573) read; the rest of the file (1809 lines) not read. The correction changes one passage of that rule, and the gaps the handoff carried need the rest only for a judgment of the rule's form, which the correction does not change.
- `.the-way/product-guidelines/template.md` and the styleguide template of the-way: not read, for the same reason.
- `guidelines/coding.md`: not read. The product code changed is CSS, which the styleguide governs.
- `foundations/decisions.md`: D-42, D-337, D-311 and D-396 read only in the parts named under Reach; their *Rationale* and *Rejected* not read, except D-42's *Rationale* sentence on the blow and D-396's *Rationale* opening.
- Probes in `reports/` read: `correction-1-watch.sh`, `correction-1-watch-blow.template.js`, `correction-1-phone-pause-blow.js`, all five `correction-1-*.txt` outputs. Not read: `correction-1-send.sh`, `correction-1-summ.py`, `correction-1-profile.py`, `correction-1-replace.template.js`, `correction-1-trans.py`, `correction-1-pause.js`.

## Searches not found or unclear

- In `reports/` I found no kept output for these cases the correction report says it saw: 2× and 4×, 8× and 16×, the killing blow at a stop, the bars after „Restart”, the phone paused right after a blow (its probe is kept), the explanation open on the phone with a blow after the fix, and the browser measurement of M-3 (505.3 → 542.9 px). They rest on the report's words; none of them depends on what the fix changed.
- Unclear: `guidelines/styleguide-browser-view.md:1538`, „Nie unosi się, jak napis starego Loopa”, reads two ways in Polish (Minor 3).
