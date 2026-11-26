PASS e058ab3094a1f90adb4c09585566133469f88802

# Review of the fix of round 1 — task `paski-parametrow`

- Range: `51e2a43ab05db515862e579cae5635636a4ce9af..e058ab3094a1f90adb4c09585566133469f88802` (`git rev-parse HEAD` = `e058ab3094a1f90adb4c09585566133469f88802`), seven commits, 14 files.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. The findings file `reports/fix-1-findings.md` bounds the review. The fix report `reports/fix-1-report.md` was read as claims and checked against the diff, the screenshots and my own test runs.
- Counts: blocking findings remaining 0; new Critical or Important findings 0; Minor notes 2 (both outside the fix diff, within the task); out of scope 0.

## Each finding of the findings file

### I-1 — fixed (`43cd2c82`)

The marker of the temperature scale is now a light core in `text-strong` (`--bar-width` wide) between two dark sides in `scale-marker` (`--frame-width` each), as high as the scale. See `src/browser/run-screen.css`, `.body-scale-marker`.

- **The look, checked myself.** I fetched the screenshots of commit `5528530e…` and enlarged them 2×, 3× and 4× with `reports/review-whole-crop.py`:
  - `loop2_01` at 37,0 °C: the marker is a white tick between two dark hairlines in the middle of the grey zone. It is plainly unlike the two gaps, which are dark with no white.
  - `loop2_02` at 36,1 °C: the same.
  - `loop2_04`, the phone at 360 px: the white tick reads on the 4 px scale too.
  - The safe zone no longer reads as two grey pieces.
- **Geometry.**
  - No rule of the part sets `box-sizing: border-box` for the marker (`grep box-sizing src/browser/*.css`), so the borders sit outside the 2 px core and the marker is 4 px wide.
  - `left: calc(var(--share) * (100% - var(--bar-width) - 2 * var(--frame-width)))` takes that width into account, so the marker never crosses the right end.
  - The pulse rule names `.body-scale-marker` whole, so the core pulses with the sides and the zone. Under reduced motion nothing pulses, as before.
- **The entries.**
  - D-40, paragraph 3, now reads "… in the role `scale-marker`, dark, … on both sides of a light core in `text-strong`, though it is no text, so that the marker tells from the gaps between the zones, … and the dark sides of the marker against each zone (D-42)". Its *Verification* adds the complies and violates examples, and its *Rationale* gives the reason and what is accepted with it. The sentence says what the CSS does.
  - D-42 is unchanged and still holds: only the dark sides touch the zones, at 7.35 / 7.59 / 6.89:1.
  - D-337 ("a short upright marker the height of the bar") still holds: the marker is short, upright and the height of the bar.
- **The contrast argument is sound.**
  - Core against `panel`, the colour of the gaps: this is `text-strong` on `panel`, already one of the 4.5:1 pairs of `design-token-contrast`, which its test checks.
  - Core against the sides: no pair holds it. But the sides must stay dark to keep 3:1 against three zones of luminance about 0.31 or more, so any value that keeps D-42 leaves the core far above 3:1 against them.
  - No new role, no new value, no change of `tokens.css`.
- **The test.** `tests/view/body-row-cells.test.mjs` now asserts the core in `var(--text-strong)` and both sides `solid` in `var(--scale-marker)`. Its `decision: D-40` line quotes the new sentence, and `foundation_check` passes. It would fail for a marker dark through, which was the defect.
- **The departure.** The task's *To do* 2 asks for „krótka pionowa kreska w ciemnym kolorze”; the marker is now dark-edged with a light core.
  - It is a departure in look, which *To do* 9 allows ("wygląd, proporcje"), and it takes no unchosen variant of the task's questions.
  - The fix report names it for the human's veto, and the request must say so.
  - It contradicts no settlement: row 4 asks for "kreska w miejscu temperatury teraz", which it now is, and the dark colour remains on its sides.
- **The styleguide.** The sentence that wrote the defect down as accepted (formerly `:1476-1478`) is replaced by what the marker now does. The roles table, the "Contrast of every pair" bullet and the *Good* and *Bad* lines say the same thing, with no value written.

Contradiction: no (the finding was so marked; the fix leaves no blocking finding).

### M-1 — fixed (`ce845d41`)

- `bodyValues`, `bodyCells`, `BodyValue` and `BodyCell` are gone from `src/browser/view/body-row.ts`.
- The note cases now read `bodyRowCells`.
- What only the removed cases held is held again:
  - In the numbers case: 36.976 as „36,9 °C” (cut down, not rounded), 37 as „37,0 °C” and 34.99 as „34,9 °C” (`tests/view/body-row.test.mjs:234-255`).
  - Nature energy with no alarm at 0, 90 and 100, in the alarm case.
- The removed case "health never does" held behaviour the task changed, so its removal has its cause in the requirement, as the rule "Changing an existing test" asks.

### M-2 — fixed (`41546a44`)

- `events`, `pace` and `standing` are required props of `BodyRowCellsProps`, with no defaults.
- `WorldArea` passes all three, and `npm run typecheck` exits 0.
- The tests give the three props through a module constant `STILL`, whose `events` keeps one identity across renders. The first-draw and seen-events logic is therefore exercised as before, and the motion cases pass.

### M-3 — contested; I withdraw it

- The fix answers with the binding passages:
  - *To do* 4: „z sumą ciosów stworzenia”.
  - Settlement row 9.
  - The answer to question 11.
  - D-450: "the sum of the creature's blows".
- Only the non-binding *Context* line 179 speaks of health taken.
- The code argument holds. `src/browser/sim/combat.ts:64-65` records `characterHealth` after each strike. The health before a strike is that value plus `damage`, except where the strike kills, since the health is then clamped to 0. So a killing first strike's health taken needs the health before the combat, which no event carries and which D-450 forbids the marker to read by comparison.
- The marker follows the entries as written, so the finding does not stand. The difference stays for the human's veto at the request, as the fix report says.

### M-4 — fixed (`e058ab30`)

D-337's *Verification* now reads „„Sytość” at the left and „14 %” at the right”, as `bodyNumbers` writes it.

### M-5 — fixed (`e058ab30`)

D-450's *Rationale* now reads "The text fades in the same real time at every pace, so at 4× it reads as it does at 1×". This matches `.body-blow-text`, 1.3 s at every pace.

### M-6 — fixed (`43cd2c82`)

`src/browser/kitchen-sink/kitchen-sink.css` draws the sample scale as the screen does:
- the zones `flex-grow` 5 : 4 : 2, with `gap: var(--frame-width)`;
- the marker `top: 0; bottom: 0`, with the same core and sides;
- the marker at 63 %, in the middle of the safe zone.

No `px` or colour is written. The page was not built or opened by me.

### M-7 — fixed (`653bbdfe`)

- The `@media (width < 1280px) and (hover: none)` block of `src/browser/styles.css` keeps a closed cell's name in `text-label` under a sticky `:hover`, and leaves an open cell's name lit. Its specificity beats the plain hover rule.
- The styleguide rule "Two layouts and one threshold between them" names the case.
- The new case in `tests/view/shared-controls.test.mjs` reads both rules and passes.
- The browser observation is the fix agent's, not mine.

### M-8 — fixed (`29c9b5ef`)

- `.body-blow-text` now stands at `bottom: var(--space-2xs); right: var(--space-s)` inside the health cell, which is `position: relative` and holds no note under its bar.
- The pair's cells stretch:
  - to the height of a cell with a note in the desktop layout;
  - to the 48 px of the energy button in the phone layout.
- So the text stays in the cell's own box and crosses no other frame (D-396).
- The styleguide sentence that accepted the overlap is replaced.
- Unverified by me in a browser, as by the fix agent with a real blow: the fix's report injected the text by hand.

### M-9 — fixed (`ba07cc56`)

- `ValueCellParts` puts a space between the name and the number and before the note. A whitespace-only text node in a flex container draws nothing, and the screenshots show no change of layout.
- The shared button has a `controls` prop that gives `aria-controls`. The open cell names the explanation, whose `id` comes from `useId`, and closed cells name nothing.
- New cases in `shared-controls.test.mjs` and `body-row-explanation.test.mjs` hold both. The explanation cases check that the id is unique on the page and that `aria-controls` is absent on closed cells.

## What the fix broke or made worse

Nothing found of grade Critical or Important. I checked each of the following:
- the marker's width against `left`, the pulse and the reduced-motion rule (above);
- the required props at their one use in `world-area.tsx`, by the typecheck and by search: `BodyRowCells` has no other caller;
- the removal of the two functions: a search finds no remaining user;
- `aria-controls` on the shared button: it is optional and undefined for every other kind;
- the blow text in the health cell (above).

## Minor notes (outside the fix diff; they reopen nothing)

**N-1. The rule "The body row of a map run" restates D-337 and D-450 and lists the state of the code.** See `guidelines/styleguide-browser-view.md` from line 1421: file names, class names (`alarm`, `holds-marker`, `data-blow`, `data-standing`) and the content of the decisions in paraphrase. `.the-way/product-guidelines/template.md` ("A rule lists no state and repeats no decision or value", WAY-312) asks otherwise. The task told the rule to take the form of "The scene of a map run" and "The screen Postać", which do the same. It is a guideline of form, with no consequence for the player. Its one new choice is the resting roles of the name (`text-label`) and the number (`text`), which no decision carries; the rule names it, and the human accepts it at the merge. Within the task, from slice 9.

**N-2. While it fades, the blow text rises over the health cell's bar and the lower edge of its number line.** It rises `--space-m` from `--space-2xs` above the cell's bottom, inside the cell, for 1.3 s. The text no longer crosses another frame, so it keeps D-396. Not seen by me with a real blow. Within the task, from the fix (`29c9b5ef`).

## Checks

| Check | Command or method | Result |
|---|---|---|
| Focused tests | `npm test -- tests/view/body-row.test.mjs` | exit 0, 27/27 |
| | `npm test -- tests/view/body-row-cells.test.mjs` | exit 0, 9/9 |
| | `npm test -- tests/view/body-row-explanation.test.mjs` | exit 0, 4/4 |
| | `npm test -- tests/view/body-row-motion.test.mjs` | exit 0, 9/9 |
| | `npm test -- tests/view/shared-controls.test.mjs` | exit 0, 63/63 |
| | `npm test -- tests/view/world-area.test.mjs` | exit 0, 19/19 |
| Types | `npm run typecheck` | exit 0 |
| Screenshots | fetched with `curl` from `5528530e…`, looked at whole and enlarged with `reports/review-whole-crop.py` (boxes `140 445 825 505` ×2, `140 445 480 505` ×4, phone `0 230 360 360` ×3) | marker told from the gaps at 37,0 and 36,1 °C, desktop and phone |
| Box model | `grep -n box-sizing src/browser/*.css` | no global `border-box`; the marker's width is the core plus the two sides |
| Not run | the full gate | the orchestrator's |
| Not run | `foundation_check.py` and `check_instructions.py` on the new head | the fix report gives exit 0 for both, and I did not re-run them; unverified by me |
| Not done | building and opening the kitchen-sink page | M-6 judged on the CSS alone |
| Not done | a real blow in a browser | M-8 and N-2 judged on the CSS and the fix's injected measurements |

## Reaches beyond the dispatch

- `src/browser/sim/combat.ts:40-79`, read in the first review and used again for M-3.
- `foundations/invariants.md`, the four invariants the handoff names, read for their sentences.

## Working copies

- `.runs/review-whole/` held the five fetched screenshots, three crops and the outputs of the focused tests and the typecheck. It was removed whole with `rm -rf` by its full path. No remainder; `git status --short` is empty.

## Unread material

- Decisions: D-40 is now read whole (paragraphs 1–2 in the index of the first review; paragraph 3, *Verification*, *Rationale* and *Rejected* in the fix diff). D-337 and D-450 were read whole in the first review, and their fix diff was read. The other decisions are as in the first review's count (2 of 68 read whole there).
- `guidelines/styleguide-browser-view.md` lines 1137–1414 (the rest of "Program editor", "The scene of a map run") and 1561–1771 (picture band, chronicle, end-of-run window, list of accounts): still not read, a gap carried from the first review for the context this review had left. The fix's changed lines of the file were read in its diff.
- `.the-way/product-guidelines/template.md`: read its Rules, Examples, Where in code and Rules of writing sections (lines 52–133). `.the-way/product-guidelines/styleguide/template.md`: not read. N-1 rests on the general template alone.
- Invariants `browser-view-token-values`, `browser-view-focus-outline`, `design-token-sources` and `application-build-kitchen-sink`: their sentences read, not their methods and fields.
- Glossary entries: not read.
- `tests/view/shared-controls.test.mjs`: the two new cases not read line by line, only run.
- `.the-way/task-cycle/change/ui_check.md`: not read (the fix's gap, carried).

## Searches not found or unclear

- A rule that sets `box-sizing: border-box` for the marker or globally: not found, which is the expected result (the marker is 4 px wide).
- Unclear: whether `.the-way/product-guidelines/styleguide/template.md` allows the screen rules of a styleguide to list classes and files. Not read, so N-1 stays Minor.
