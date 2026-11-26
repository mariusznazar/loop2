# Report — the return step (step 11) — task `paski-parametrow`

**Status:** done

## Commits (on `task/paski-parametrow`, from `e058ab30`)

| Commit | What |
|---|---|
| `38e5dbf0` | `docs: :memo:` the *Verification* of D-337, D-450, D-311, D-178, D-39, D-40, D-42, D-44 and D-04 now names in its clause `tests:` the parts of the sentences that the tests of the body row hold, and keeps in its pair of examples only what no test and no invariant holds; four test files gain or widen a `decision:` line |

Files changed (`git show --numstat 38e5dbf0`): `foundations/decisions.md` (67 added, 64 removed over `7308e0bd`, all in *Verification* fields, no binding sentence, no *Rationale*, no *Rejected*); `tests/view/body-blow.test.mjs` +1; `tests/view/body-row-cells.test.mjs` +1 −1; `tests/view/body-row-explanation.test.mjs` +2; `tests/view/body-row-motion.test.mjs` +1. The test edits are comment lines only (`decision:` quotations); no assertion changed.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before my edits, at `e058ab30`) | 0 | 0 errors |
| `python -B .the-way/elements/common/foundation_check.py` (after the commit) | 0 | 0 errors; no listed line (the line on `design-token-contrast` that the foundation report named is gone, since its test file changed) |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | 0 error, 0 warn, 120 info |
| negative probe: one quotation of my D-04 line in `tests/view/body-blow.test.mjs` altered by one word, the check run, the file restored | 1 | "the quotation stands in no binding sentence of `D-04`", then restored (`git diff` of the file shows only my added line); this shows the check reads the lines I added |
| `npm test -- tests/view/body-row-cells.test.mjs` | 0 | 9 pass |
| `npm test -- tests/view/body-row-explanation.test.mjs` | 0 | 4 pass |
| `npm test -- tests/view/body-blow.test.mjs` | 0 | 8 pass |
| `npm test -- tests/view/body-row-motion.test.mjs` | 0 | 9 pass |
| `npm test -- tests/view/shared-controls.test.mjs` | 0 | 63 pass |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 | 3 pass |
| `npm test -- tests/invariants/test_design_token_sources.py` | 0 | 2 pass |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 pass |

Not run: the full gate (`npm test` with no argument), as the handoff gives; it is the orchestrator's. `npm test` takes one test file per call, so the focused runs are one per file.

## The comparison of the foundation with the code as it stands at `e058ab30`

Read whole by identifier: D-337, D-450, D-311, D-178, D-39, D-40, D-42, D-44, D-48, D-215, D-201, D-125, D-57, D-58, D-334 (binding sentences and *Verification*), and the invariants `design-token-contrast` and `design-token-sources`. Code read: `src/browser/view/body-row.ts` whole; the diffs of `world-area.tsx`, `scene-picture.ts`, `tokens.css` and `tests/invariants/test_design_token_contrast.py`; the rules `.body-scale-marker`, `.body-blow-text` and the motion block of `src/browser/run-screen.css`; the tests `body-row-cells`, `body-row-explanation`, `body-row-motion` (parts), `body-blow` (titles and `decision:` lines), `body-row.test.mjs` (titles and `decision:` lines) and the titles and `decision:` lines of the additions to `shared-controls.test.mjs`.

**Where the code and an entry agree** (no change): the scale from 30 to 41 °C with zones 30–35, 35–39, 39–41 at 5 : 4 : 2, the marker at the left end below 30 °C (`SCALE_FROM`, `SCALE_TO`, `OVERHEATING_FROM`, `temperatureZones`, `zoneOf` in `body-row.ts`); the thresholds 35 °C, 30, 35 for health (`HEALTH_ALARM_BELOW`), nature energy never in alarm; the bars' caps from the game's data (`rules.startSatiety`, `rules.startHealth`, `BALANCE.natureEnergy.max`); the frame by what acts on the character (`temperatureFrame`); the explanation placed between `.body-cells` and `.backpack-text` and one at a time; the marker from the events, never from a comparison of health; the pulse and the marker's pulse with its zone in CSS alone, standing under reduced motion, and not gated by the standing of game time; D-04's reduced-motion clause is untouched since the row reads that setting in CSS only (`grep` for `matchMedia` and `prefers-reduced` in `body-row-cells.tsx`, `body-row.ts`, `body-blow.ts`, `world-area.tsx` and `react-button.tsx` finds nothing), which answers the foundation report's question 1.

**Where an entry named something the code or its tests did not match, and what I did:** nothing in a binding sentence. The only gaps were in the *Verification* fields, which still said "until the tests of the change that brought them hold them":

| Entry | Held by tests now (moved into `tests:`) | Left in the pair, because no test holds it |
|---|---|---|
| D-337 | the cell's parts and order, the bars' caps and colours, the scale (zones 5 : 4 : 2, marker, the zone named), the thresholds and the red number, the pulse (with the scale's marker and zone, under reduced motion, while game time stands, none at the frame), the three frames, the three buttons and the health cell that holds the place of their frame, the name of an open or hovered cell in `text-strong` | the look of the notes (`text-secondary`, smaller than the value; was already in the pair) and the marker as high as the bar (`top: 0; bottom: 0` in `run-screen.css`; no case reads it — added to the pair, since D-337's sentence says "the height of the bar") |
| D-450 | all of it: the explanation's place, words from the data, closing, switching, one at a time, none for health; the marker's sum, its threshold of 2, a killing blow, the paces, none at a first draw, replaced by a new blow, gone at the end of its animation; standing and going on with game time; reduced motion | nothing: the pair is removed |
| D-311 | the bar under each value and the explanation right under the cells and above the backpack | nothing of the body row (the rest of the pair, on the columns and the window, is as it was) |
| D-178 | the number in `text` at 0 and 90, never in `danger` at 0, 90 and 100, the cell as the others with a bar in `text-strong` filled to its share, the explanation on a click | nothing: the pair is removed |
| D-39 | health's fill in `positive`, satiety's in `satiety-fill`, on a track in `highlight`; the number below a threshold and the zone of overheating in `danger`; the frame in `warming-frame` or `chill-zone` | nothing of the body row |
| D-40 | the tracks in `highlight`, nature energy's fill in `text-strong`, the zones, the marker with dark sides and a light core, the button's background and name under the pointer and when open | nothing of the body row |
| D-42 | the pulse from full to the dim opacity and back in 1.1 s, smoothly, with no end, none under reduced motion; the shake in 0.34 s and the text in 1.3 s, each once (the fill pairs are the invariant's) | the 40 % of the dim phase (the case reads `var(--alarm-pulse-dim-opacity)`, not 0.4) and the gap in `panel` between the chill and the safe zone (no case reads it) |
| D-44 | the button of a cell with its parts in their order, `aria-expanded`, its background and name under the pointer | that a screen builds its cell from the shared button (the cases draw the row and read the parts the shared button draws, which a copy could draw too) |
| D-04 | the marker read from the events, none at a first draw, the open explanation kept in its component through a new drawing | that the health cell reads no earlier health (no case feeds a changed health with no event) and that the open explanation stays out of the game state and the save |

The pair examples that I wrote anew are the leftovers named above (the marker's height in D-337; "another opacity than 40 %" in D-42; the rewording of D-04's complies to mirror its violates). They are `the cycle's` in the sense of `foundation_step.md`: a pair kept only for the part no test holds. Nothing else in the entries was added.

`decision:` lines: I checked every `decision:` line the executors and the fix wrote against the entries (the foundation check reports none wrong). I added: `D-311 "The world holds, from the top, …the backpack and the lines below them"` to the first case of `body-row-explanation.test.mjs`; `D-04` (whole sentence of the third paragraph) to the "stays open" case of that file; `D-04` (the first half of that sentence) to the first case of `body-blow.test.mjs` and to the first-draw case of `body-row-motion.test.mjs`; and widened the `D-39` line of the bars case in `body-row-cells.test.mjs` to the sentence's end, which also holds that `warning` stands in no bar and satiety takes `satiety-fill`.

## The search by the change's names and words (WAY-11)

I searched `foundations/decisions.md`, `invariants.md`, `glossary.md`, `environment_facts.md` and `part_map.md` for `value-cell`, `satiety-fill`, `chill-zone`, `safe-zone`, `scale-marker`, `warming-frame`, `holds-marker`, `bodyRowCells`, `blowMarker`, `body-explanation`, `aria-controls`, `hover`, and, in `decisions.md`, for `body row`, `bar of`, `explanation`, `blow`, `alarm`, `pulse`, `Energia natury`, `health cell`, `scale of temperature`, over every decision other than the nine changed (a script, 36 decisions found, the ones naming the body row read: D-215, D-57, D-58, D-201, D-125, D-334, D-368, D-122, D-308 in the lines found).

- Decisions that mention the body row and stay true: D-215 ("below the body row and the backpack and above the line of the practice"), D-201 ("Below the body row"), D-334 ("no progress bar" is about „Teraz”), D-125 (the row shows what the game state holds; the bars follow), D-57 (tenths with a decimal comma; held by the number cases), D-58 (the cooling the notes and the explanation read), D-368 (the end-of-run window; the row stands in the world area). None needed a change.
- D-48 (tokens named by what they are for): the five roles are in the styleguide's table and read from `--<role>`; `--alarm-pulse-dim-opacity` is a value of appearance named by what it is for. True.
- D-45, D-396, D-407, D-317, D-322, D-43: their sentences stand as the task's *Decisions in play* quotes them; I did not find a sentence of any of them that the code now contradicts. D-322 is about the scene alone, and the row's pulse in a pause is D-337's sentence.
- The invariants: `design-token-contrast` holds its sentence, and its test (3 cases) passes with the new pairs; `design-token-sources` passes with the five new declarations and the sixth (`--alarm-pulse-dim-opacity`), each followed by a `Source:` comment. No invariant is violated.
- The part map: `src/browser/view/body-row-cells.tsx` and `body-blow.ts` stand under `src/browser/view/**`, the new tests under `tests/view/**`, the kitchen-sink changes under `src/browser/kitchen-sink/**`; `foundation_check.py` reports no file in no part. The part's description (the screens, the kitchen-sink page "that shows the shared controls, roles and tiles in every state") is still true. No change.

## Settlements and where each went (WAY-11, WAY-134)

Every row of *Settlements to record* and every projected entry was written by the foundation step; I compared each with the code and wrote no second entry:

| Row | Where it stands | Code makes it true |
|---|---|---|
| 1 | D-337 (2nd paragraph), D-311, D-178 | yes |
| 2 | D-337 (4th paragraph) and D-450 (1st and 2nd paragraphs) | yes |
| 3 | D-39, D-40 | yes (colours in `tokens.css`, fills in `run-screen.css`) |
| 4 | D-337 (2nd paragraph) | yes |
| 5 | D-337 (3rd paragraph), D-39, D-42 | yes |
| 6 | D-337 (3rd paragraph), D-42 (the numbers of the pulse) | yes |
| 7 | D-337 (3rd paragraph), D-39 | yes |
| 8 | D-40 | yes |
| 9 | D-450 (2nd paragraph), D-04 (3rd paragraph) | yes |
| 10 | D-337 (4th paragraph), D-40 | yes |
| 11 | D-337 (3rd paragraph), D-450 (2nd paragraph) | yes |

Choices of the change that bind after the merge (WAY-36), where each stands, and why no new entry:

- The light core of the marker: D-40 (written by the fix). The gap between the zones: D-42 and, in the pair, still unheld.
- The rows of two at the narrow width, the 500 ms smooth change of a fill, the shake of 340 ms and the text's 1.3 s, the text's place in the health cell, the closed cell's grey name on a device that cannot hover: values and rules of the look — the styleguide's rule "The body row of a map run" and "Two layouts and one threshold between them" and the code carry them (the question "is it only a rule for the look of the product" of the decisions template, `Where it goes`, question 2); none carries a choice with a real cost that someone would propose the other way.
- `aria-controls` on the button of an open cell, and the spaces between the parts of a cell: accessibility details of the shared button, held by cases in `shared-controls.test.mjs` and `body-row-explanation.test.mjs`; D-44's sentence says only that the button says whether the explanation stands open, and its quotation in about ten test files would break if I reworded it; question 3 (a single text or rule held by a test and the code).
- The wording of the three explanations: the product's data and code with the cases of `body-row.test.mjs` and `body-row-explanation.test.mjs` (question 3 again).
- The blow text's role `danger`: inside D-39's meaning ("a character … may be lost"), so no listed use is needed; the styleguide's rule says it.

No entry is deferred, none proposed for later.

## Sources outside the product (environment facts)

I read the `Source:` comments of the six declarations the change added to `src/browser/tokens.css`: `--satiety-fill` (orange-400 of the Tailwind CSS v4 palette, read in `node_modules/tailwindcss/theme.css` of the repository `loop`, version 4.3.3), `--chill-zone` and `--warming-frame` (colours of `RulesPanel.tsx` and `RunWorld.tsx` of branch `origin/test` 715026e of `loop`), `--safe-zone` and `--scale-marker` (values of the roles `text-secondary` and `page`, read from the rendered `loop`), `--alarm-pulse-dim-opacity` (`@keyframes alarm` in `src/app/globals.css` of the same branch). **I wrote no environment fact**, with this reasoning: the template's "Which facts are written" asks for a fact for a citation that, once it stopped being true, would call a decision into question, and for the rest the decision quotes its source in *Based on*. No decision or invariant of this change rests on these sources: each value is a choice bounded by a threshold the product holds (3:1 of D-42, which rests on `wcag-non-text-contrast` already), the sources say where the value was read from, and the product's rule for them is the styleguide's "Every value with its source" and the invariant `design-token-sources`, which both pass; the same holds for every earlier token whose source is `loop`, none of which has a fact. If the orchestrator reads "the source an agent's choice rests on" more widely, the candidates are the Tailwind palette value and the `loop` branch readings; none is a wish of mine, and I did not write them.

## Glossary

I read `foundations/glossary.md` whole (336 lines) and the template's "Which words take an entry". The change uses "marker", "zone", "cell", "frame", "alarm", "pulse", "explanation", "pace" and "body row" in meanings a reader of the field gives them, and no sentence of the foundation reads wrongly in that meaning, so none takes an entry (WAY-95). "loop" is used for the predecessor game throughout, as its entry gives, and "earning loop" only for the earning loop. "reading" (D-04, the new third paragraph and the explanation of the blow marker, "previous reading", "a first draw") is used in its entry's meaning. "part" (D-44 *Rationale*, "the parts of a cell") is used for a part of a cell, which no sentence reads as a part of the part map; I left it bare, as the template's "Two glossaries" allows. No term is used against its entry; no correction.

## Choices, with the way rejected and its cost if wrong

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Removed D-450's pair whole and D-178's whole | keep a pair for the unlikely mutations a jsdom case cannot read (the real motion in a browser) | a reviewer finds a mutation the cases miss; the real browser checks (D-87, D-88) hold the motion, and I name this as the one soft spot |
| Kept the D-44 pair for "built from the shared button" | counting the cell cases as holding it | a leftover example the cases do hold |
| Kept D-42's "40 %" and "the gap" in the pair; did not add an assertion to the test | adding `assert.equal(…, "0.4")` to `body-row-motion.test.mjs` | none; adding a test is the author's, not the return step's |
| Added `decision:` lines to tests rather than naming in `tests:` a test with no line | naming them with no line | the clause would name a test the check cannot find |
| No environment fact for the token sources | one fact per source | an entry the template's rule does not ask for (a fact for a value that is a choice) |

## Left as they are (not mine)

The marker of the temperature scale departing in look from the task's „w ciemnym kolorze” (light core between dark sides; D-40 carries it, for the human's veto at the request); the sum of the blows against the health lost (the entries, the task and the code agree on the sum); the resting roles of the name and the number of a cell (`text-label`, `text`), which no decision carries and the styleguide rule states (the rule itself says so: "D-40 nie nazywa ról spoczynku nazwy i liczby"); the review's Minor notes N-1 and N-2.

Two small things I noticed and did not change: the titles of three cases in `body-row-motion.test.mjs` and the comment of `body-blow.test.mjs` say the marker stands "over the health cell", while the fix put it inside the health cell's own box; D-450's binding sentences do not say "over", so no entry is wrong. D-42's number 40 % stands in the token `--alarm-pulse-dim-opacity` and in no case.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md` (whole), `.the-way/elements/environment-facts/template.md` (whole) and `skill/decide_entry.md` and `skill/read.md`, `.the-way/elements/glossary/template.md` (first 80 lines), `.the-way/foundations/glossary.md` (the headings): for what goes into `tests:`, which facts are written and which words take an entry.
- the author's private rules for writing scripts and for git, which the harness gave when I first wrote a script and committed.
- `foundations/decisions.md` D-48, D-215, D-201, D-125, D-334, D-57, D-58 (in part), `foundations/glossary.md`, `foundations/environment_facts.md` (the headings and the entries `wcag-*`, `css-*`), `foundations/part_map.md` (lines 1–40), `guidelines/styleguide-browser-view.md` (the Roles table, the rule "The body row of a map run" and lines around "Every value with its source"): to compare the entries and the new rule.
- `.runs/task-cycles/paski-parametrow/reports/foundation-report.md` and `fix-1-report.md`, as the handoff names.

## Working copies

`.runs/return-step/` in the worktree (`.runs/return-step/`) held my edit scripts, the scan output, the commit message and the focused runs' outputs; I removed it by its full path before returning (see the last line).

## Unread material

- `foundations/decisions.md`: D-45, D-396, D-407, D-317, D-322 and D-43 read as the passages quoted by the task and, for D-43, one whole entry; not read whole by me: D-45, D-396, D-407, D-317, D-322. D-04 read from its heading to the end of its first *Rationale* part (lines 59–170 at `7308e0bd`), the rest of its *Rationale* and *Rejected* not. D-58 and D-368, D-122, D-308 read only in the lines the scan found.
- `guidelines/styleguide-browser-view.md`: read only the Roles table and the rule "The body row of a map run" and lines near "Every value with its source"; the other rules (including "Contrast of every pair", "States of shared controls", "Two layouts and one threshold between them") and the-way's template for a styleguide not read.
- `tests/view/shared-controls.test.mjs`, `tests/view/body-row.test.mjs`, `tests/view/body-blow.test.mjs`: the titles and `decision:` lines, and the diff of `shared-controls.test.mjs` as a list of its added cases; I did not read the assertions of every case. `tests/view/body-row-motion.test.mjs` read at lines 1–260 and 352–575; the case of the pulse on the scale, the case of standing, and the case of a killing blow read by title and comment only.
- Source: `src/browser/view/body-row-cells.tsx`, `body-blow.ts`, `controls/react-button.tsx`, `run-screen.css` and `styles.css` read only in the parts named above (by grep and by the rules of the marker and the blow text); the kitchen-sink files not read.
- `.runs/task-cycles/paski-parametrow/task.md`: read whole.
- `guidelines/testing.md`: not read (I wrote no test).

## Searches not found or unclear

- A test holding D-311's first sentence ("The world holds, from the top, …") did not exist as a `decision:` line anywhere (grep for `decision: D-311` finds only the sentences about the header and the end-of-run window); the *Verification* of D-311 already claimed such a test ("the world from the top: …"). I added the line to the explanation case, which holds the explanation's place; I did not find the case that holds the order of the scene, „Teraz”, „Potem”, the body row and the lines below.
- No case reads the 40 % of the pulse's dim phase, the gap between the zones, the marker's height, or the look of the notes; named above as the leftovers.
- Unclear: whether a source of a token value that is an agent's choice bounded by a threshold ever asks for a fact; I read the template as no, and say so above.
