FAIL 51e2a43ab05db515862e579cae5635636a4ce9af

# Review of the whole change — task `paski-parametrow`

- Range: `51667231eafb32db53eaaf662f07e728323aa2ba..51e2a43ab05db515862e579cae5635636a4ce9af` (`git rev-parse HEAD` = `51e2a43ab05db515862e579cae5635636a4ce9af`, as the handoff gives). `.the-way` at `b502011f`, equal to the gitlink.
- Method: `.the-way/task-cycle/review/SKILL.md` with `whole_change.md`. Every slice (1–9) and the plan's *Foundation entries* judged here, none having had a review of its own.
- Counts: blocking 1 (Important), Minor 9 (all within the task), out of scope 0.

## Findings

### Important

**I-1. The marker of the temperature scale cannot be told from the gaps between zones, so the scale does not show where the temperature stands.**

- Where: `src/browser/tokens.css:51` (`--scale-marker: #09090b`), `src/browser/run-screen.css:725` (`.body-scale`, `gap: var(--frame-width)` through which `panel` #18181b shows) and `src/browser/run-screen.css:751` (`.body-scale-marker`, `width: var(--bar-width)`, `background-color: var(--scale-marker)`); written down as an accepted property in `guidelines/styleguide-browser-view.md:1476-1478` ("kreska w środku strefy wygląda jak jeszcze jedna przerwa; od przerwy odróżnia ją tylko szerokość i ledwie ciemniejszy odcień, a wartość niesie wtedy liczba").
- What is wrong: the marker is a 2 px line of #09090b and the gaps between zones are 1 px of #18181b, a contrast of about 1.12:1 between them. On the screen the safe zone at 37,0 °C (the start of every map run, on every map) and at 36,1 °C reads as two grey pieces: the marker looks like a fourth gap, not like a value. D-42 asks only the marker against each zone (6.9–7.6:1, met), and the task asks for a gap in the colour of the background, so each value passes its own check while the pair marker–gap, which nobody judged, defeats the scale.
- Why it matters: the scale is the one new drawing of a value whose whole purpose is "krótka pionowa kreska … pokazuje temperaturę teraz" (task *To do* 2, settlement row 4, D-337 paragraph 2, D-40 "`scale-marker` … which means where the value stands on its scale"). With the marker lost the player reads the temperature from the number alone, as before the change, while loop's warmth cell shows its value by the length of a white bar at a glance (`loop_11_run_w_ruchu.png` against `loop2_02_below_threshold_1600x1000.png`). This is the one cell where the side-by-side the human judges the request on (the acceptance criterion: the old Loop must not be the better at the parameters) shows loop2 as the weaker. The styleguide sentence then turns the defect into a rule the next screens follow, with no decision of the human behind it.
- Evidence: I fetched the screenshots of the request and looked at them myself (`loop2_01_start_1600x1000.png`, `loop2_02_below_threshold_1600x1000.png`, `loop2_03_fire_and_explanation_1600x1000.png`, crops enlarged 2× with `.runs/task-cycles/paski-parametrow/reports/review-whole-crop.py`, run as `python -I review-whole-crop.py <png> <out> 140 445 825 525 2`): in each the safe zone shows as a short grey piece and a long one, the marker indistinguishable from the gaps; slice 9's pixel probe in `executor-9-2-report.md` ("The gaps between zones are 1 px of `panel` (24,24,27); the marker is 2 px of (9,9,11)") agrees. Slice 6 named the merge near 35 and 39 °C and did not act on it; slice 9 measured it in the middle of a zone and wrote it into the styleguide.
- What would make it right (within *To do* 9, which lets the agent depart in look, proportions and spacing): a marker that reads against the gaps while keeping a dark line the height of the bar — for example a light edge on both sides of the dark line (two-tone), or a marker clearly wider than a gap — with the styleguide sentence at 1476–1478 replaced by what the marker then does, and the screenshots taken again. Whichever form, the pair marker–gap (or marker–`panel`) wants judging, in the review at least, since D-42 holds no such pair.
- Slice: spans slices 1 (`503afd92`, the value of `--scale-marker`) and 6 (`d5dcff73`, the gap and the marker's width), and slice 9 (`c2639ea7`, `df83c446`) records it in the styleguide.

Contradiction: no

### Minor (all within the task)

**M-1. `bodyValues` and `bodyCells` have no user after the change, and their tests hold behaviour the change replaced.** `src/browser/view/body-row.ts:35` and `:118` are called by no module of the product any more (`BodyRowCells` draws from `bodyRowCells`); `tests/view/body-row.test.mjs:120` ("satiety below 30 stands in danger and 30 does not; health never does") holds health never in `danger`, against the new D-337 (health below 35 in red), and the case at `:47` quotes D-337 "The body row holds each of its values in a cell of its own" for the joined text „Temperatura 36,9 °C” that no screen draws. A later reader takes these for the body row. Remove the two functions and the cases that hold only them (the D-57 and D-178 cases are held again by `bodyRowCells` cases at `:329` and `:439`). Slice 6 (`d5dcff73`) left them, slice 5 (`3107f6f7`) kept them on purpose.

**M-2. The props that carry the blow and the stop are optional with silent defaults, so a dropped prop in `WorldArea` passes every test.** `src/browser/view/body-row-cells.tsx:46-55` gives `events = []`, `pace = 1`, `standing = "going"`; `src/browser/view/world-area.tsx` passes all three, but no test renders `WorldArea` and looks for a blow, a held motion or the 8× refusal (the motion cases render `BodyRowCells` alone). Making the three props required would let `npm run typecheck` hold the wiring at no test cost. Slice 8 (`bb600781`).

**M-3. At a killing blow the marker can show more health than was lost.** `src/browser/view/body-blow.ts:44-46` sums the creature's strike `damage`; the slice-5 probe shows „−14 · wilk” where 8,65 was lost. D-450 says "the sum of the creature's blows", so this keeps the entry; but each `combatExchange` already carries `characterHealth` after the strike, so the health actually taken is readable from the events without a comparison of two readings of the game state. For the human's veto at the request, as slice 5 recommends; no change required by the entries.

**M-4. D-337's example writes the satiety number without its unit.** `foundations/decisions.md:11018` ("„Sytość” at the left and „14” at the right") against the code's „14 %” (`body-row.ts`, `bodyNumbers`) and the task's *To do* 5 (numbers as today, „Sytość 82 %”). An agent comparing a change with this example could read the unit as a departure. Write „14 %”. *Foundation entries* (`7308e0bd`).

**M-5. D-450's *Rationale* says the text goes faster at 4×, which the code does not do.** `foundations/decisions.md:11344` ("at 4× the text goes before it can be read as it is at 1×"); the text's animation is 1.3 s of real time at every pace (`run-screen.css:810` and its keyframes). Not binding, but a reader takes it as the behaviour. *Foundation entries*.

**M-6. The kitchen-sink sample of the scale draws a scale the task forbids.** `src/browser/kitchen-sink/kitchen-sink.css:80-101`: zones 30/40/30 % with no gaps between them and a marker that reaches `--space-2xs` past the bar on both sides, where the task gives 5:4:2, gaps in the background's colour and a marker that "nie wystaje poza" the bar. The page is where the shared control is judged, and this sample hides I-1 (its protruding marker reads well). Draw the sample as the screen draws the scale. Slice 3 (`2a0811aa`).

**M-7. On a touch screen a closed cell keeps the lit name of an open one.** `src/browser/styles.css:558` lightens the name under `:hover`, and no `@media (width < 1280px) and (hover: none)` block takes it off, while the styleguide's rule "Two layouts and one threshold" gives such blocks for the sticky `:hover` of a touch browser. After a tap that closes the temperature explanation, its name stays in `text-strong` until the next tap elsewhere. Reasoning and slice 9's note only; not seen in a browser. Slice 2 (`8bc77a31`).

**M-8. The blow text lies over another cell's frame in the phone layout.** `src/browser/run-screen.css:810` places `.body-blow-text` at `bottom: 100%` of the health cell, so in the two rows of two it crosses the lower frame of the temperature cell for 1.3 s (slice 8 saw it; the styleguide at `:1527-1528` accepts it). D-396 asks no text over the border of a frame in the phone layout; the effect is short and hides no value, so Minor, but a placement inside the health cell's own box (or over its own bar) would keep D-396 literally. Slice 8.

**M-9. The button of a cell has no spaces between its parts in its accessible name, and no link to its explanation.** `src/browser/view/controls/react-button.tsx` (`ValueCellParts`): the name, the number and the note are adjacent inline spans, so the computed name reads „Temperatura37,0 °Cbez ognia 83 min”; and the button has no `aria-controls` to the explanation `p` (slice 7's note). Outside the four WCAG criteria D-42 keeps, so polish. Slices 2 and 7.

## Declined to judge

- The phone measurement flags `div.world-area` 330 > 318, `div.scene-sheet` and the scene `img` — measured at the base commit by slice 9's executor; the scene's, not this task's.
- The `/favicon.ico` 404 of the kitchen-sink page (slice 3) — the page's HTML, which the change does not touch.
- The bars growing from the dead run's lengths after „Restart” (slice 6's concern) — "przy pierwszym rysowaniu" reads as the first draw of the screen, and a Restart keeps the screen; not a finding.
- `.value-cell-static`'s second rule in `src/browser/styles.css:497` standing in the shared sheet — the plan's *Choices* chose it with its reason, and its parts are drawn by the shared control's own `ValueCellParts`; left to the plan.

## The task, its settlements and the entries

- *To do* 1–7 and 9: met by the commits, save I-1 (the marker of *To do* 2 does not show the temperature). *To do* 8 (the side-by-side) is pushed (seven files, `mariusznazar/screenshots` at `97922f06…`, branch `loop2/paski-parametrow`); embedding it in the request is the orchestrator's.
- Settlement rows 1–11: each stands in the entry its *Goes to* names (D-337 paragraphs 2–4, D-450, D-311, D-178, D-39 paragraphs 6–7, D-40 paragraph 3, D-42 paragraph 2, D-04 paragraph 3, D-44 paragraph 3, `design-token-contrast`), and the code does what each says, read against `body-row.ts`, `body-blow.ts`, `body-row-cells.tsx`, `react-button.tsx`, `styles.css`, `run-screen.css` and the token file.
- Changed invariant test: `tests/invariants/test_design_token_contrast.py` (slice 1), its pairs matching the new sentence of `design-token-contrast`.
- Values chosen by agents (for the human's veto at the request, as slice 9 lists them): `--satiety-fill` #ff8904, `--chill-zone` #00a6f4, `--safe-zone` #9f9fa9, `--scale-marker` #09090b (see I-1), `--warming-frame` #ffd230, `--alarm-pulse-dim-opacity` 0.4; resting roles of the name (`text-label`) and number (`text`); motion curves and distances.
- Reserved choices: no language, framework, library, store, login or place to run is taken.
- Code made for a test: none found (no branch, value or comparison of the product made for a test's input).
- Trust boundary and irreversible operations: none touched (the screenshots were pushed on a branch, by D-418 and D-419).
- Executors' own-work checks: slices 1 and 6 checked contrast against the zones and the layout at 360 px, which their checks would catch; neither judged the marker against the gap, where the change is weakest (I-1). The walks of slices 6–8 and 9's screenshots follow the task's requirements and give a reason for each unchecked case.

## The structure the change leaves

- File sizes (`python -B .the-way/task-cycle/change_file_sizes.py 51667231… 51e2a43a`, exit 0): the largest growths are `run-screen.css` 1590 → 1823, `styles.css` 888 → 997, `body-row.ts` 111 → 335, new `body-row-cells.tsx` 290; `world-area.tsx` 138 → 122.
- Size rule (`function-and-file-size`, not marked violated): `npm test -- tests/quality/test_function_and_file_size.py` on the head, exit 0, 2 tests OK — nothing over a threshold at the head, so nothing the change pushed over one. The run on the base was not made (the head names nothing, so the comparison could add nothing).
- Code with no user: M-1. A name that stopped being true: `bodyValues`' and `bodyCells`' docs still speak of "the body row" (M-1).

## Checks

| Check | Command or method | Result |
|---|---|---|
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` (reviewed worktree, head) | exit 0; `0 error, 0 warn, 120 info` |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0; `0 errors` |
| Changed-file sizes | `python -B .the-way/task-cycle/change_file_sizes.py 51667231eafb32db53eaaf662f07e728323aa2ba 51e2a43a` | exit 0 |
| Size rule on the head | `npm test -- tests/quality/test_function_and_file_size.py` | exit 0, 2 tests OK |
| Decision index | `python -B .the-way/elements/common/decision_index.py --sections`, then `--section` "Look of the browser view…" and "Screen of a map run…", `--part` browser-view, product-foundation, agent-workflow, `--decision` for the task's *Decisions in play* and every decision quoted by a changed test | exit 0; 68 listed in full, 258 by heading |
| Screenshots of the request | fetched with `curl` from the links of the handoff, looked at whole and as 2× crops of the row | see I-1; the amber frame, the open explanation, the 2 × 2 phone layout and the alarm look as the task gives |
| Not run | the product's gate and the focused test files of the view (`body-row-cells`, `body-row-motion`, `body-row-explanation`, `shared-controls`, `body-row`, `body-blow`, `world-area`) | the full gate is the orchestrator's; the focused files pass by the executors' reports and no finding needs a run of them — unverified by me |
| Not done | the size rule on a worktree of the base, and the size run in a worktree of my directory rather than in the reviewed worktree | the head names nothing over a threshold, so the base adds nothing; the reviewed worktree has its `node_modules` and the run changed no tracked file (`git status --short` empty) |
| Not done | comparison of the styleguide's new rule with `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md` | not read (context of this review); the rule has the form of its neighbours (*Decision*, *Invariant*, *Good*, *Bad*, text) — unverified against the templates |

## Reaches beyond the dispatch

- `src/browser/sim/combat.ts:40-79` — whether a strike's `damage` is the health taken (M-3).
- `src/browser/sim/world.ts:18-32` (`warmthAt`) — that a burning item counts for the amber frame.
- `src/browser/sim/data/creatures.ts` and `src/browser/sim/data/actions.ts` by search — the strike's damage.
- `package.json` (React 19.3.1) — that the ref callback's cleanup in `body-row-cells.tsx` runs.
- `foundations/invariants.md` `function-and-file-size` — that the invariant is not marked violated.
- The diff of `foundations/decisions.md` for the *Verification* and *Rejected* of D-39, D-40, D-42 and D-44.

## Working copies

- `.runs/review-whole/` held the decision index, the section list, the seven screenshots fetched, three crops, `crop.py` and the outputs of the checks; removed whole with `rm -rf` by its full path. Kept beside this report: `.runs/task-cycles/paski-parametrow/reports/review-whole-crop.py`, the input of the crop that shows I-1 (command in I-1). No worktree was made. No remainder.

## Unread material

- Decisions of the index read whole: 2 of 68 (D-337, D-450). The changed D-04, D-39, D-40, D-42, D-44, D-178 and D-311 were read by their binding sentences in the index and by the diff of their *Verification*, *Relations* and *Rejected*, not whole; D-125, D-133, D-317, D-322, D-396, D-407, D-421, D-45, D-418, D-419, D-38 and the decisions quoted by changed tests by their binding sentences in the index only. The run through the 258 headings opened no further decision.
- `guidelines/styleguide-browser-view.md`: read lines 1–1137, 1415–1560 and 1772–1795; not read 1137–1414 (the rest of "Program editor" and "The scene of a map run") and 1561–1771 (picture band, chronicle, end-of-run window, list of accounts).
- `guidelines/coding.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, `foundations/part_map.md`: read whole. `guidelines/coding-browser-module.md`: not read.
- `foundations/invariants.md`: `design-token-contrast` (its diff) and `function-and-file-size` read; `browser-view-token-values`, `browser-view-focus-outline`, `design-token-sources`, `application-build-kitchen-sink` not read. Glossaries (product and the-way): not read.
- `.the-way/product-guidelines/template.md`, `.the-way/product-guidelines/styleguide/template.md`, `.the-way/project-level/technology/reserved_choices.md`: not read.
- Tests: the new test files read by their case names and `tests/view/body-row-motion.test.mjs:160-360` and `tests/view/body-row.test.mjs:1-130`; the rest of the test diff not read line by line.
- Reports: all ten read whole.

## Searches not found or unclear

- A test that renders `WorldArea` and holds the blow, the stop or the 8× refusal through it: not found (M-2).
- A `hover: none` block for `.button.value-cell`: not found (M-7).
- Unclear: whether D-450's "the sum of the creature's blows" means the strikes' damage or the health they took (M-3); the task's *Context* line 179 calls the event's number "liczbą zabranego zdrowia".
