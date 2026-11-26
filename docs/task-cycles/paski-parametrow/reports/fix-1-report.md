# Report — the fix of the review's findings, round 1 — task `paski-parametrow`

**Status:** done with concerns

The concerns: M-3 is answered with evidence and not changed in code (below); the marker of I-1 departs in look from the task's „krótka pionowa kreska w ciemnym kolorze” (a light core between dark sides), named for the human's veto below.

## Commits (on `task/paski-parametrow`, from `51e2a43a`)

| Commit | Finding | What |
|---|---|---|
| `ce845d41` | M-1 | remove `bodyValues`, `bodyCells`, the types `BodyValue`, `BodyCell` and the cases that held only them |
| `41546a44` | M-2 | `events`, `pace`, `standing` required props of `BodyRowCells` |
| `ba07cc56` | M-9 | spaces between the parts of a cell; `controls` prop of the shared button → `aria-controls` |
| `653bbdfe` | M-7 | touch block of `styles.css` keeps a closed cell's name in `text-label` |
| `29c9b5ef` | M-8 | blow text inside the health cell's own box |
| `43cd2c82` | I-1, M-6 | marker with a light core; D-40; styleguide; kitchen-sink sample |
| `e058ab30` | M-4, M-5 | D-337 example „14 %”; D-450 rationale |

Files changed (`git diff --numstat 51e2a43a..e058ab30`), added/removed: `foundations/decisions.md` 7/7; `guidelines/styleguide-browser-view.md` 25/16; `src/browser/kitchen-sink/control-samples.tsx` 3/2; `src/browser/kitchen-sink/kitchen-sink.css` 20/10; `src/browser/run-screen.css` 18/6; `src/browser/styles.css` 9/2; `src/browser/view/body-row-cells.tsx` 21/16; `src/browser/view/body-row.ts` 1/51; `src/browser/view/controls/react-button.tsx` 12/3; `tests/view/body-row-cells.test.mjs` 25/4; `tests/view/body-row-explanation.test.mjs` 18/1; `tests/view/body-row-motion.test.mjs` 6/1; `tests/view/body-row.test.mjs` 25/107; `tests/view/shared-controls.test.mjs` 109/0. Total 14 files, +299/−226.

## Each finding

### I-1 — fixed (`43cd2c82`)

- The marker is now a light core in `text-strong` (`--bar-width` wide) between two dark sides in `scale-marker` (each `--frame-width` wide), the height of the scale, never above or below it (`src/browser/run-screen.css`, `.body-scale-marker`). Its total width is `--bar-width + 2 × --frame-width` (4 px), and `left` takes that width into account so the marker never crosses the right end.
- Why this form, and the form rejected: a light edge on both sides of a dark line, the reviewer's first example, puts the light colour against the zones. No light colour reaches 3:1 against all three zones (`text-strong` #f4f4f5 against `safe-zone` measures 2.39:1). That would break D-42's pair "the marker against each zone". The inverted two-tone keeps that pair: only the dark sides (`scale-marker`) touch the zones, at 7.35 / 7.59 / 6.89:1 as before. A dark marker that is only wider was rejected too: against the gaps it would still be 1.12:1, told apart by shape alone.
- **The marker–gap measurement** (the contrast test's own function, `contrast_ratio` of `tests/invariants/test_design_token_contrast.py`): core `text-strong` #f4f4f5 against `panel` #18181b, the colour of the gaps, is **16.12:1**. Core against the dark sides `scale-marker` #09090b is **18.10:1**. The dark sides against `panel` stay 1.12:1, the pair that defeated the old marker. Now only the core has to tell the marker from a gap.
  - Where it is held: core against `panel` is held by `design-token-contrast` already, since `text-strong` on `panel` is one of its 4.5:1 text pairs, which `test_token_file_keeps_every_pair` checks. No new pair was added, so the invariant's sentence and its test are unchanged.
  - Core against the sides is held by implication rather than by a pair: the sides must keep 3:1 against zones whose relative luminance is about 0.31 or more, which forces their luminance down to about 0.077 or less, and against that `text-strong` stays above about 7.5:1. The styleguide's contrast rule now says this.
- **Value for the human's veto:** no new role and no new value. The core takes the existing role `text-strong` (#f4f4f5), and `scale-marker` keeps #09090b. Nothing in `src/browser/tokens.css` changes, so no `Source:` was added. The departure in look is the light core: the task's *To do* 2 asks for „krótka pionowa kreska w ciemnym kolorze”, *To do* 9 lets the agent depart in look, and the screenshots below show it.
- D-40 (foundation step, decision skill, edit in place, entry marked **the cycle's**: no row of *Settlements to record* carries the core). Its third paragraph now reads „… and the marker of the temperature now in the role `scale-marker`, dark, which means where the value stands on its scale, on both sides of a light core in `text-strong`, though it is no text, so that the marker tells from the gaps between the zones, each zone with a contrast ratio of at least 3:1 against `panel` and the dark sides of the marker against each zone (D-42).”
  - Verification: the complies example now reads "its marker with dark sides in `scale-marker` and a light core in `text-strong`", and the violates list adds "the marker of the scale dark through, with no light core".
  - *Rationale*: new sentences say why the core is there and what is accepted with it. *Rejected* is unchanged.
  - Meaning, English: the marker of the scale has dark sides and a light core so that it tells from the dark gaps between zones.
  - Meaning, Polish: kreska skali ma ciemne boki i jasny środek, żeby odróżniała się od ciemnych przerw między strefami.
- D-42 is unchanged: its sentence "the marker, `scale-marker`, at least 3:1 against each zone" still holds for the sides.
- Styleguide (`guidelines/styleguide-browser-view.md`), with no value written:
  - Roles table: the `text-strong` row adds "jasny środek kreski temperatury teraz", and the `scale-marker` row now says "ciemne boki" with the core between them.
  - "Contrast of every pair": the marker bullet says the core adds no pair, and why.
  - "The body row of a map run": the old sentence "kreska w środku strefy wygląda jak jeszcze jedna przerwa; od przerwy odróżnia ją tylko szerokość…" is replaced by what the marker now does. The Good example names the core; the Bad example adds "kreska cała ciemna, której w środku strefy nie odróżnić od przerwy".
- Test: `tests/view/body-row-cells.test.mjs` asserts the core in `var(--text-strong)` and the left and right sides `solid` in `var(--scale-marker)`, with a `decision: D-40` line quoting the new sentence. It was seen failing against the committed stylesheet before the change: `npm test -- tests/view/body-row-cells.test.mjs` exit 1, "expected [var(--text-strong), solid, var(--scale-marker), …], got [var(--scale-marker), none, rgba(0, 0, 0, 0), …]". The same command passed after the change, exit 0.
- Seen in the running game, crops enlarged 8×:
  - At 37,0 °C and 36,1 °C, in the middle of the grey zone, the marker is a white tick between two black hairlines, plainly unlike the gaps, which are dark hairlines with no white.
  - At 35,1 °C, beside the chill/safe gap, and at 39,0 °C, beside the safe/overheating gap, the dark side merges with the gap and the white core still marks the place.
  - At 33 °C in the chill zone it pulses with the zone.

### M-1 — fixed (`ce845d41`)

- Search before deleting: `grep -rn "bodyValues\|bodyCells\b\|BodyValue\b"` over the tree, outside `.runs`, `node_modules`, `dist` and `.the-way`, found only `src/browser/view/body-row.ts` and `tests/view/body-row.test.mjs`. No kitchen-sink page and no script uses them.
- Removed `bodyValues`, `bodyCells` and the types `BodyValue`, `BodyCell`, together with the cases that held only them. The cases of the notes (at the thresholds, by a fire, chilled by a fire, a map that does not cool, health and energy with no note) now read `bodyRowCells`, so their behaviour stays held.
- What the deleted cases held and the cases that hold it now:
  - "37,0 °C" and "34,9 °C": added to the case of the numbers.
  - Nature energy never in alarm at 0, 90 and 100: added to the alarm case, with the D-178 decision line.
  - The removed case "health never in danger" held behaviour the task changed (D-337: health below 35 in red); the cause lies in the requirement.
- `npm test -- tests/view/body-row.test.mjs` exit 0 (27 cases).

### M-2 — fixed (`41546a44`)

- The three props are required, with no defaults. Every render in `tests/view/body-row-cells.test.mjs`, `body-row-explanation.test.mjs` and `body-row-motion.test.mjs` now gives them, through a constant `STILL = { events: [], pace: 1, standing: "going" }`, which the motion cases override.
- Exploratory probe, reverted: removing `pace={state.pace}` from `src/browser/view/world-area.tsx` made `npm run typecheck` exit 1 with "TS2741: Property 'pace' is missing in type … but required in type 'BodyRowCellsProps'". After `git checkout` of that file, exit 0.

### M-3 — contested; no code changed (D-450, the code and the tests agree)

- The binding passages say the sum of the blows, not the health taken:
  - The task's *To do* 4: „jedno starcie daje jeden znacznik z sumą ciosów stworzenia, gdy ta suma to co najmniej 2, np. „−21 · wilk”".
  - Settlement row 9: „jeden znacznik ciosu z sumą ciosów stworzenia”.
  - Question 11, the answer Mariusz accepted: „jeden znacznik na starcie, z sumą ciosów stworzenia”.
  - D-450: "{n} being the sum of the creature's blows in it".
  - Only the non-binding *Context* line 179 calls the number of an event „liczbą zabranego zdrowia”.
- Health taken is not readable from the events in every case. `src/browser/sim/combat.ts:64-65` records a strike as `{ damage, characterHealth }`, the health after the strike. A strike's health taken is the health before it minus `characterHealth`, and for the first strike of a combat the health before it is in no event. It is the previous reading of the game state, which D-450 and D-04 forbid the marker to read ("a marker found by comparing health with its previous reading" is D-450's violating example).
  - So when the first strike of a combat kills (a wolf's 7 against health of 7 or less), "health taken" would need a comparison of readings.
  - The reviewer's case, „−14 · wilk” at 8,65 lost, had a killing second strike, which the events could give; a killing first strike could not.
- Changing to "health taken" would therefore change D-450 to a sentence the events cannot hold in every case. Recommendation: keep the sum, as the task settles it, and leave the difference to the human's veto at the request, as the finding itself proposes.

### M-4 — fixed (`e058ab30`)

D-337, *Verification*, complies: „„Sytość” at the left and „14 %” at the right of its cell”. Foundation step: an edit of an example, not of a binding sentence; marked the cycle's.

### M-5 — fixed (`e058ab30`)

D-450 *Rationale*: "The text fades in the same real time at every pace, so at 4× it reads as it does at 1×. Accepted with it: the sum does not say how many blows there were." This matches `.body-blow-text`, `animation-duration: 1.3s` at every pace in `src/browser/run-screen.css`. *Rationale* only, no binding sentence; marked the cycle's.

### M-6 — fixed (`43cd2c82`)

`src/browser/kitchen-sink/kitchen-sink.css` draws the sample as the screen draws the scale:
- zones as `flex-grow` 5 : 4 : 2 with `gap: var(--frame-width)`, through which the `panel` under the button shows;
- the marker the same as the screen's (core in `text-strong`, sides in `scale-marker`), `top: 0; bottom: 0`, so it no longer reaches past the bar;
- the marker at `left: 63%`, about 37 °C, in the middle of the safe zone.

`control-samples.tsx` comment updated. Built with `node scripts/kitchen-sink.mjs --build-only` (exit 0), served on 127.0.0.1 and looked at 6×: blue | grey | white tick | grey | red, with dark gaps.

### M-7 — fixed (`653bbdfe`)

- The block `@media (width < 1280px) and (hover: none)` of `src/browser/styles.css` adds `.button.value-cell:hover:not(:disabled):not([aria-expanded="true"]) .value-cell-name { color: var(--text-label) }`. The styleguide rule "Two layouts and one threshold between them" now names this case and its reason.
- Test first in `tests/view/shared-controls.test.mjs`: "on a device whose pointer cannot hover a closed cell under the pointer keeps its grey name, and an open one its lit name". It reads the plain rules and those of that block. It failed before the CSS (exit 1, "closed: expected var(--text-label), got var(--text-strong)") and passed after it (exit 0).
- Seen in Chromium in the phone session: after a tap opened and a second tap closed „Sytość”, `:hover` was still true on it, `aria-expanded` was "false" and its name was rgb(141, 141, 151), which is `text-label`.

### M-8 — fixed (`29c9b5ef`)

- `.body-blow-text` stands at `bottom: var(--space-2xs); right: var(--space-s)` of the health cell, which is `position: relative`, under its bar. It rises `--space-m` over the bar as it fades.
- The cell has room there:
  - Desktop: in a row of four, the pair stretches to the cells with a note, 49 px.
  - Phone: the cell stretches to the energy button's 48 px touch target.
- Checked statically on the paused run, the text standing at its first frame (`data-standing="paused"`, `animation-play-state: paused`), with the probe `reports/fix-1-blow.js` putting a `.body-blow-text` into the health cell:
  - Desktop 1600 × 1000: cell 452..501, bar bottom 480, text 480..498.
  - Phone 360 × 740: cell 336..384, bar bottom 363, text 363..381.
  - Both inside the cell's own box, under the bar; the phone measurement after the injection gave the same three flags as the baseline (below).
- The styleguide sentence (formerly at :1527-1528) and its Good example were changed. The CSS comment and the docblock of `body-row-cells.tsx` say "in it".
- Not checked: the motion of a real blow from a combat. The text was injected by hand, not produced by the simulation.

### M-9 — fixed (`ba07cc56`)

- `ValueCellParts` puts a space between name and number and before the note. In the flex boxes a whitespace-only text node draws nothing; the screenshots show no change of layout.
- The shared button has the prop `controls` → `aria-controls`. The row gives the open cell `controls={explanationId}` (`useId`), and the explanation `<p>` has that id. Closed cells name nothing, because the block does not stand then.
- Tests first:
  - `shared-controls.test.mjs` "the parts of a cell stand apart in its text, and a button given the id of the block it opens names it by aria-controls": failed, "expected "Sytość 14 głoduje", got "Sytość14głoduje"".
  - `body-row-explanation.test.mjs` (the two click cases): failed, "the explanation has an id".
  - Both pass after the code.
- In Chromium, after the click on „Temperatura”: `aria-expanded="true"`, `aria-controls="_r_1_"` = the explanation's id.

## Checks (each command, exit code)

At the head `e058ab30`, after all commits:
- `npm test -- tests/view/body-row.test.mjs` 0
- `npm test -- tests/view/body-row-cells.test.mjs` 0
- `npm test -- tests/view/body-row-explanation.test.mjs` 0
- `npm test -- tests/view/body-row-motion.test.mjs` 0
- `npm test -- tests/view/shared-controls.test.mjs` 0
- `npm test -- tests/view/world-area.test.mjs` 0
- `npm test -- tests/invariants/test_design_token_contrast.py` 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` 0
- `npm test -- tests/invariants/test_design_token_sources.py` 0
- `npm test -- tests/invariants/test_application_build_kitchen_sink.py` 0
- `npm test -- tests/quality/test_function_and_file_size.py` 0
- `npm test -- tests/quality/test_quality_invariants.py` 0
- `npm run typecheck` 0
- `python -B .the-way/elements/common/foundation_check.py` 0 ("0 errors"; run without `--skip-test-citations`, so the new `decision:` lines were checked against the binding sentences)
- `python -B .the-way/instruction-files/check_instructions.py` 0 ("0 error, 0 warn, 110 info")

Failing runs of the tests written first:
- `shared-controls` (M-9 case) 1
- `body-row-explanation` (M-9) 1
- `shared-controls` (M-7 case) 1
- `body-row-cells` against the old stylesheet (I-1) 1
- the typecheck probe of M-2 1

All are described above.

Not run: the full gate `npm test`, which is the orchestrator's, as the handoff gives. Nothing but the cycle runs the tests before the merge apart from CI where the request has it.

## Own-work check

- Requirement most likely missed: the marker telling from the gaps also at a zone's edge and while it pulses, not only in the middle of the safe zone.
- Check: screenshots of the running game at 35,1 °C (beside the chill/safe gap), 39,0 °C (beside the safe/overheating gap) and 33 °C (pulsing in the chill zone), cropped 8×.
- Result: at both edges the dark side joins the 1 px gap and the white core still stands apart. At 33 °C the frame caught the dim phase: the core and zone dimmed together, and the core still reads.
- Mutation in the head:
  - the core in `scale-marker` (dark through), or a side not `solid`: `body-row-cells.test.mjs` fails;
  - `:not([aria-expanded="true"])` dropped from the touch rule: the M-7 case fails on "open";
  - `controls` not passed through: the M-9 cases fail;
  - the spaces dropped: the M-9 case fails;
  - `bottom: 100%` back for the blow text: no test catches it; it is a layout fact, which the testing guidelines leave to the browser (D-87), checked there as above.

## Screenshots (looked at myself, then pushed)

- Pushed to `mariusznazar/screenshots`, directory `loop2/paski-parametrow/`, branch `loop2/paski-parametrow`, new commit **`5528530e34d0e66217b095dc54f5006b6a36d6b5`** (on top of `97922f06`, no force; `ls-remote` shows the branch at it).
- Pushed with `gh` account `mariusznazar`. Every link fetched after the push: HTTP 200, `image/png`.
- The screenshots show only the made-up account of the local start; its address appears on none. The old Loop's two screenshots stay in `97922f0683a59447f3bc50f72ca89088d356e7aa`.
- States: composed by `reports/executor-9-2-compose.mjs`, sent by the page's save request through `reports/fix-1-send.sh`. The pulsing fills were taken at the full phase (opacity > 0.97).
- Desktop window 1600 × 1000. Phone: `.playwright/cli.phone.config.json` (360 × 740, touch), with taps.

1. `loop2_01_start_1600x1000.png` — https://github.com/mariusznazar/screenshots/blob/5528530e34d0e66217b095dc54f5006b6a36d6b5/loop2/paski-parametrow/loop2_01_start_1600x1000.png?raw=true — Minuta 0 (pauza), 37,0 °C / 100 % / 100 / 100, bluish frame, „bez ognia 83 min”. **The marker is a white tick in the middle of the grey zone, unlike the two dark gaps.**
2. `loop2_02_below_threshold_1600x1000.png` — https://github.com/mariusznazar/screenshots/blob/5528530e34d0e66217b095dc54f5006b6a36d6b5/loop2/paski-parametrow/loop2_02_below_threshold_1600x1000.png?raw=true — Minuta 144, 36,1 °C, „Sytość 14 %” in red over an orange fill at 14 %, „głoduje” in red, „Zdrowie 90”. The marker is a white tick at 36,1 °C in the grey zone.
3. `loop2_03_fire_and_explanation_1600x1000.png` — https://github.com/mariusznazar/screenshots/blob/5528530e34d0e66217b095dc54f5006b6a36d6b5/loop2/paski-parametrow/loop2_03_fire_and_explanation_1600x1000.png?raw=true — the state of 02 with a campfire, after a click on „Temperatura”: amber frame, „przy ogniu”, „Temperatura” lit, the explanation in two lines above „Plecak 0/15”, the marker white in the grey zone.
4. `loop2_04_phone_360_below_threshold.png` — https://github.com/mariusznazar/screenshots/blob/5528530e34d0e66217b095dc54f5006b6a36d6b5/loop2/paski-parametrow/loop2_04_phone_360_below_threshold.png?raw=true — phone, state 02: two rows of two, names whole, nothing over a frame, the marker a white tick on the 4 px scale.
5. `loop2_05_phone_360_explanation_open.png` — https://github.com/mariusznazar/screenshots/blob/5528530e34d0e66217b095dc54f5006b6a36d6b5/loop2/paski-parametrow/loop2_05_phone_360_explanation_open.png?raw=true — after a tap on „Sytość”: its name lit, the explanation in three lines between the cells and „Plecak 0/15”.

Phone measurement, with `reports/executor-7-phone-measure.js` run through `playwright-cli run-code` (exit 0 each time). It was taken on 04, on 05, and after the injected blow text:
- `scrollsToTheSide: false`;
- `controlsSmallerThan48: []`;
- `contentWiderThanItsBox`: `div.world-area` 330 > 318 and `div.scene-sheet` 256 > 64;
- `outsideTheWindow`: `img` 156..412.

The flags are the same ones that slice 9 found at the base commit `51667231`, coming from the scene's picture, not from the row.

The blow-text checks of M-8 were screenshots for my own look and were not pushed.

## Choices, with the way rejected

- I-1, the inverted two-tone (dark sides, light core) over the reviewer's light edges or a wider dark marker. The reasons are above.
  - Cost if wrong: the human may want the marker dark through. Going back is a matter of the CSS lines, the D-40 sentence, the styleguide sentences and one test assertion.
- I-1, the core in the existing role `text-strong` rather than a new role.
  - This avoids a new value, which `src/browser/AGENTS.md` keeps for the human, a new role sample and a new pair.
  - Cost: one more use of a text role on a part that is no text, accepted in D-40's rationale.
- M-1, converting the note cases to `bodyRowCells` rather than deleting them, so that no behaviour lost its test.
- M-8, inside the cell for both layouts rather than a phone-only block.
  - One place is simpler, and above the cell in the desktop layout the text lay over the „Potem” line.
  - Cost: if the pairs ever wrapped in the desktop layout, the health cell would be about 27 px high and the text would cover its bar and name for 1.3 s. At 1280 px and up the world column is 672 px and the four cells stand in one row (measured at 1600: row 672 px wide, 49 px high).
- M-9, `aria-controls` only while the explanation stands, rather than a dangling id on closed cells.
- The commits of M-8 and of I-1/M-6 touch the same two files. I split them by writing M-8's part alone onto the committed files, committing it, and then restoring the full files, so each commit holds one finding.

## Departures from the task's answers or the plan

- The marker's look (*To do* 2, „w ciemnym kolorze”): a light core between dark sides, under *To do* 9. The reason is I-1; it is for the human's veto.

## Reach beyond the dispatch

- `src/browser/sim/combat.ts` lines 40-120 and the `GameEvent` type in `src/browser/sim/run.ts`: read for M-3, to see what an exchange records.
- `scripts/kitchen-sink.mjs`: read to build the page without opening a browser on the desktop (`--build-only`).
- `.the-way/elements/common/way_of_working.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/decisions/template.md`, `read.md` and `decide_entry.md`: read for the foundation step.

## Working copies

All stood in `.runs/fix-1/` of the worktree and were removed with it:
- the logs;
- the crops;
- the copy of the compose script;
- the clone of `mariusznazar/screenshots` (`.runs/fix-1/screenshots`).

Also removed:
- `.playwright-cli/`, the screenshots and probe scripts there;
- the local start, stopped with `npm run local:stop`;
- the static server of the kitchen-sink page, stopped.

Kept in `reports/` for this report: `fix-1-send.sh`, which composes, sends and opens a state; `fix-1-blow.js`, the probe of M-8; `fix-1-phone-close.js`, the probe of M-7.

Left as the product's own tool output: `dist/kitchen-sink/` (written by `scripts/kitchen-sink.mjs`) and the local start's database under `.runs/local-start/`, which the next start removes.

## Unread material

- `.runs/task-cycles/paski-parametrow/plan.md`: not read. The findings and the handoff carried what the fix needed.
- `.the-way/elements/decisions/examples.md` and the-way's entries it names: not read for the foundation step. The edits were in-place changes of an example and of two sentences of existing decisions.
- `.the-way/task-cycle/change/ui_check.md`: not read. I followed the handoff's own instructions for the screenshots and `.claude/skills/loop2-play/SKILL.md`.
- `guidelines/styleguide-browser-view.md` lines 1561–1598 (Siedziba band, chronicle): read; the rest of the file read whole.
- `tests/view/world-area.test.mjs`: not read; only run.

## Searches not found or unclear

- `.playwright-cli/phone-measure.js`, which the skill writes by a heredoc, was not present. I used `reports/executor-7-phone-measure.js` instead.
- The way back to the screen of a map run after a reload: there is no „Wróć do przejścia” link when the page opens on that screen, so `fix-1-send.sh` clicks the link only when it stands.
