PASS 38e5dbf00e33a4445132d42cdeca08398b4c3f91

# Review of the return step (step 11) — task `paski-parametrow`

- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), section 2 for the return step's commits.
- Range: `e058ab30..38e5dbf0`, one commit, `38e5dbf00e33a4445132d42cdeca08398b4c3f91`; `git rev-parse HEAD` shows that SHA. `.the-way` at `b502011f`, equal to the gitlink.
- Diff computed with `git diff e058ab30..HEAD` and `git log e058ab30..HEAD`: `foundations/decisions.md` +67 −64 (as `git diff --stat` counts it), `tests/view/body-blow.test.mjs` +1, `tests/view/body-row-cells.test.mjs` +1 −1, `tests/view/body-row-explanation.test.mjs` +2, `tests/view/body-row-motion.test.mjs` +1. Every change to a test file is a comment line `decision:`; no assertion changed.

## Findings

### Critical

none

### Important

none

### Minor (within the task)

**M-1. D-311: the new `decision:` line at the explanation case quotes parts the case does not hold. The test that holds "a bar under each of its values" has no D-311 line. The report's claim about D-311's first sentence is false.**
- Place: `tests/view/body-row-explanation.test.mjs:90`. The *Verification* of D-311 is at `foundations/decisions.md:10699-10707`. The test that holds the bars is `tests/view/body-row-cells.test.mjs:253`.
- What is wrong: the line quotes the whole sentence, from "The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with a bar under each of its values and the minutes each need lasts, …" to "… the backpack and the lines below them". The case draws `BodyRowCells` alone (`body-row-explanation.test.mjs:51-64`). It reads only that the explanation is the next sibling after `.body-cells` and the sibling before `.backpack-text` (`:105-112`). It draws no scene, no „Teraz” or „Potem”, and no lines below the backpack, and it reads no bar and no note. D-311's clause `tests:` now names "a bar under each value of the body row". The case that holds that part is `body-row-cells.test.mjs:253` (its parts `value-cell-head`, `value-cell-bar`/`value-cell-scale`, `value-cell-note`, `:265-275`). That case carries D-337 lines but no D-311 line. So the only D-311 line whose quotation reaches "with a bar under each of its values" stands at a case that does not read a bar. The template asks for this line at every test that holds a part of a sentence (`.the-way/elements/decisions/template.md:281-283`: "each test that holds a part of the sentences carries a line of its own"). The report holds itself to the same rule, in "Choices": "Added `decision:` lines to tests rather than naming in `tests:` a test with no line".
- The report's claim (its *Searches not found or unclear*, first item) is false: "A test holding D-311's first sentence … did not exist as a `decision:` line anywhere … I did not find the case that holds the order of the scene, „Teraz”, „Potem”, the body row and the lines below." `tests/view/world-area.test.mjs:219` carries `// decision: D-311 "The world holds, from the top, the scene, „Teraz” and „Potem”, the body row"`, at the case "the world area stands from the top: the scene, Teraz, Potem, the body row, the lines between the backpack and the drawing, the drawing, the line of a tile, …" (`:211`). That case reads the order of the parts (`:228-238`). The line already stood at `e058ab30`: `git show e058ab30:tests/view/world-area.test.mjs | grep -n D-311` prints line 219.
- Why it matters: an agent that changes the bar under a value and follows the lines of D-311 reaches the explanation case and the world-area case. Neither reads a bar, and the case that does is not linked to D-311. Also, if the orchestrator copies the false search item from the report into the cycle's process remarks, the record will hold a gap that does not exist.
- Why Minor: the entry agrees with the code. Every part D-311's clause `tests:` names is held by some case (order: `world-area.test.mjs:211`; bars: `body-row-cells.test.mjs:253`; the explanation's place: `body-row-explanation.test.mjs:87`). The departure is from the form the template gives for test links (WAY-364). The length of the quotation at `:90` is partly forced: a quotation starts at the start of a sentence (template `:277-280`), so a quotation that reaches the explanation's clause has to run through the scene, „Teraz”, „Potem” and the bars.
- Recommended fix: add `// decision: D-311 "The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with a bar under each of its values"` at `tests/view/body-row-cells.test.mjs:253`. Optionally, end the quotation at `body-row-explanation.test.mjs:90` at "… the backpack", since no lines below the backpack are drawn there.

**M-2. D-178: the pair of examples was removed whole, but the tests read the role of the energy's number at only two values.**
- Place: `foundations/decisions.md:7238-7243`. The removed pair is in the diff hunk `@@ -7235,12 +7238,8 @@`.
- What is wrong: the binding sentence says "in the role `text` at every value of the energy, zero included". The tests read the number's colour at 0 and 90 (`tests/view/body-row-cells.test.mjs:202-207`, `:236-241`). At 0, 90 and 100 they read only the flag of the alarm (`tests/view/body-row.test.mjs:364-366`). The removed *violates* named "„Energia natury” in `warning` or `positive` at some value of the energy". Now a number of a full energy (100) drawn in `positive` passes every test, and the entry no longer names that case for an agent.
- Why Minor: the new clause `tests:` claims only "the number of the energy in `text` at 0 and 90 and never in `danger` at 0, 90 and 100". That is what the tests hold, so the entry says no more than the code. A pair of examples is optional (template `:288-291`), so removing it breaks no rule. This is lost guidance, not a wrong statement. Recommended: keep a pair for the role at values no case reads, for example *violates*: the number of a full energy in `positive`.

**M-3. D-450: the pair of examples was removed whole, but "moves down what stands under it" is held by no test.**
- Place: `foundations/decisions.md:11327-11337`. The sentence is at `:11305-11309`.
- What is wrong: the report says (table, row D-450) "all of it" is held, and "nothing: the pair is removed". The case that places the explanation reads only DOM siblings (`tests/view/body-row-explanation.test.mjs:105-112`). An explanation drawn in the same place with `position: absolute`, laid over the backpack, passes that case. jsdom does no layout, and the product's testing guideline says it proves no layout (`guidelines/testing.md:413`). The code does what the sentence says: `.body-explanation` is a block in the flow (`src/browser/run-screen.css:672-684`, "it is one line of the flow, so the backpack and what stands under it move down by its height").
- Why Minor: the clause `tests:` does not claim the movement, and the code agrees with the sentence. Only the guidance for an agent is gone. Recommended: a pair for that part alone. *complies*: the explanation of satiety pushing the backpack down by its height. *violates*: the explanation laid over the backpack.

**M-4. Two identical D-450 lines at one case.**
- Place: `tests/view/body-row-explanation.test.mjs:88-89`, both `// decision: D-450 "A click on the cell of temperature, satiety or nature energy (D-337) opens, right under the four"`.
- What is wrong: the second line repeats the first and adds nothing. The lines predate the range. The return step says it checked every `decision:` line and added a line right under these two (`:90`), but did not remove the repeat.
- Why Minor: polish. The foundation check accepts both lines, and nothing reads wrongly because of the repeat.

### Out of the task's scope

none

## The six points of the handoff

1. **No binding sentence, *Rationale* or *Rejected* changed.** I compared the diff of `foundations/decisions.md` hunk by hunk (`git diff -U2 e058ab30..HEAD -- foundations/decisions.md`, 11 hunks). Every removed and added line is in a *Verification* field: D-04 (`:94-133`), D-39 (`:5034-5036`), D-40 (`:5053-5055`), D-42 (`:5085-5087`), D-44 (`:5119-5121`), D-178 (`:7238-7243`), D-311 (`:10699-10724`), D-337 (`:11005-…`, the field under `:11003`) and D-450 (`:11327-11337`). The headers of the D-39 and D-40 hunks show a binding paragraph only as context. Confirmed.
2. **The parts named in the new `tests:` clauses, against the named tests (I read the test bodies, not only their titles).**
   - D-337: held. Cells and parts: `body-row-cells.test.mjs:253`. Bars, caps and colours, also below the threshold: `:295`. Scale 5 : 4 : 2, 7/11 for 37 °C, left end at 28.4 °C, zone named: `:357`. Numbers in `danger` at the three thresholds, energy never: `:168` and `body-row.test.mjs:355-366`. Pulse, with marker and zone, and under reduced motion: `body-row-motion.test.mjs:207`, `:258`. Pulse while game time stands: `:309`. No pulse at the frame: `:258`. Amber and bluish frame: `body-row-cells.test.mjs:444`. Plain frame: `body-row.test.mjs:468`. Health cell holding the frame's place: `shared-controls.test.mjs:891`. Name in `text-strong` with the background unchanged: `shared-controls.test.mjs:705`. What is left in the pair (the look of the notes, the marker's height) is held by no case. I searched: no test reads `.body-scale-marker` `top`/`bottom` or the notes' size.
   - D-450: everything the clause names is held (`body-row-explanation.test.mjs:87`, `:126`, `:152`; `body-blow.test.mjs:46-147`; `body-row-motion.test.mjs:309-576`). Not held by any test: "moves down what stands under it" (M-3). The real motion in a browser stays a manual check under D-88, as the report says.
   - D-311: the parts the clause names are held, by the cases listed in M-1. The link of the bars part is the gap in M-1.
   - D-178: held as the clause words it. The pair's removal is M-2.
   - D-39: health in `positive` and satiety in `satiety-fill` on `highlight` (`body-row-cells.test.mjs:325-336`). Numbers below the threshold and the overheating zone in `danger` (`:202-241`, `:373-376`). Frame `warming-frame` or `chill-zone` (`:460-463`). A frame that took the colour of its text, or `discovery`, fails `:460`, since that case expects the token `var(--warming-frame)` while the text stands in `text`. The widened line at `:297` quotes the 3:1 clause too. The case does not read contrast; the invariant `design-token-contrast` holds it (`tests/invariants/test_design_token_contrast.py:77-97`), and D-39 names that invariant. The quotation has to pass through that clause to reach `satiety-fill`.
   - D-40: tracks, energy fill, zones, and the marker's sides and core (`body-row-cells.test.mjs:331-336`, `:372-406`). The cell under the pointer and the open cell (`shared-controls.test.mjs:705`, `:796`). Held.
   - D-42: pulse 1.1 s, `infinite`, not in steps, 50 % at `var(--alarm-pulse-dim-opacity)`, none under reduced motion (`body-row-motion.test.mjs:207-253`). Shake 340 ms and text 1.3 s, not infinite (`:528-576`). Held. The fill's 3:1 at full colour, removed from *violates*, is held by the invariant.
   - D-44: `shared-controls.test.mjs:487`, `:579`, `:705`; `aria-expanded` also in `body-row-explanation.test.mjs:100-121`. Held. "Built from the shared button" is left in the pair, correctly: `body-row-cells.test.mjs:261-264` reads only the `tagName`.
   - D-04: the marker read from events (`body-blow.test.mjs:46`; `blowMarker` takes no health, `src/browser/view/body-blow.ts:24-28`). None at a first draw (`body-row-motion.test.mjs:355`). Explanation kept through a new drawing (`body-row-explanation.test.mjs:166`). Held. The whole-sentence quotation at `:167`, at a case that holds only the sentence's second clause, is forced by the rule that a quotation starts at a sentence's start. The first clause is held by the two cases that carry the half-sentence line. No finding.
3. **D-311's first sentence:** see M-1. The quotation claims more than the case holds, and the report's search claim is false: `tests/view/world-area.test.mjs:219`.
4. **Pairs written anew.** D-337: the marker "as high as the bar", or "standing out over or under the bar". This matches the code (`src/browser/run-screen.css:754-758`, `top: 0; bottom: 0` inside `.body-scale`, `height: 100%`), and no case holds it. Right. D-42: "another opacity than 40 %". The 0.4 stands only in `src/browser/tokens.css:53`, and no case reads the value (`grep alarm-pulse-dim-opacity tests` finds only `body-row-motion.test.mjs:232`, which reads the token's name). Right. D-04: "reading nothing of its previous health", the mirror of the kept *violates*. No case feeds a drop of health with no event and asserts no marker: `body-row-explanation.test.mjs:175-177` drops health with `events: []` but asserts nothing of a marker. Right. Nothing a test holds is left in a pair. I checked each item that remains in the pairs of the nine decisions against the cases above.
5. **Decisions not to write.**
   - No environment fact for the token sources. Sound. `.the-way/elements/environment-facts/template.md:45-48` asks for a fact only for a citation that would call a decision into question if it stopped being true. No *Based on* of D-39, D-40 or D-42 rests on `loop` or Tailwind values. The sources stand at the values, and `design-token-sources` checks them there.
   - No glossary entry. Sound. "Marker" is used for the scale's line and for the blow's text, both meanings a reader of the field gives it (glossary template `:46-49`), and each use is qualified.
   - No change to the part map. Sound: `foundation_check.py` lists no file outside the parts.
   - No new entry for the light core (D-40 carries it), for `aria-controls` and the spaces between the parts of a cell (held by `shared-controls.test.mjs:541`, an accessibility detail of code), or for the explanation's wording (data and code with its cases). Sound: questions 2 and 3 of the decisions template's "Where it goes" (`template.md:182-186`).
6. **No entry says more than the code.** I compared each changed *Verification* field with the code and tests at the head (point 2). None claims a test that does not exist. The only part where the link is weaker than the clause is the D-311 bars part (M-1).

## Contradiction marks

There are no blocking findings, so no marks.

## Declined to judge

- "On one line", "at the left" and "at the right" of a cell's name and number, which jsdom shows only as DOM order. The D-337 and D-44 lines quoting them predate the range, and the whole change's review covered them.
- Whether "once" for the shake and the text is held by `animation-iteration-count` not being `infinite` (`body-row-motion.test.mjs:549-552`, `:568-571`). The clause wording is new, but the test's strength predates the range and was judged at the review of the whole change.

## Checks run

| Check | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | `38e5dbf00e33a4445132d42cdeca08398b4c3f91` |
| `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` | 0 | both `b502011f53225451ddf121e2b772a903b87492db` |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 120 info` |
| `node node_modules/prettier/bin/prettier.cjs --check` on the four changed test files | 0 | "All matched files use Prettier code style!" |
| `git show e058ab30:tests/view/world-area.test.mjs \| grep -n D-311` | 0 | line 219 holds the D-311 quotation of "The world holds, from the top, …" at the base (evidence for M-1) |
| Manual: read the test bodies named in point 2 against the clauses `tests:` | — | as in point 2 |

Not run: the focused test files (`npm test -- <file>`). The range changes no assertion, only comment lines, and `foundation_check.py` is the check that reads those lines. The return step's report gives their runs at the head. The full gate, `npm test`, is the cycle's own run.

## Reaches beyond the dispatch

- `tests/view/world-area.test.mjs:205-275`, to check the report's claim that no case holds D-311's first sentence (M-1).
- `tests/view/body-row.test.mjs:355-400`, for D-178 at 100 and the alarm (M-2), and the grep for the plain frame (`:468`).
- `tests/view/shared-controls.test.mjs:487-540`, and the titles and `decision:` lines from line 480 on, for D-44, D-40 and D-337.
- `src/browser/run-screen.css:670-700`, `:728-783`, `:839-848`, and `src/browser/view/body-blow.ts:24-28`, to compare the pairs and clauses with the code (points 4 and 6, M-3).
- `src/browser/tokens.css:53`, and a grep of `tests/` for `alarm-pulse-dim-opacity`, for D-42's 40 %.
- `tests/invariants/test_design_token_contrast.py`, a grep for the body-row roles, for the contrast parts removed from the pairs.
- `foundations/invariants.md`, the entries `design-token-contrast` and `design-token-sources`, which the handoff names.
- `.the-way/task-cycle/remarks_check.py`, its docstring, for the form of the last section of this report.
- `.the-way/elements/environment-facts/template.md` and `.the-way/elements/glossary/template.md`, whole, and `.the-way/elements/decisions/template.md`, whole, as point 5 gives.

## Working copies

- `.runs/review-return-fc.txt` held the output of one foundation check. It was written by mistake directly under `.runs/`, not under my directory, and removed at once by its full path.
- `.runs/review-return/` was made empty and is removed before return. I made no worktree, clone or screenshot.

## Unread material

- `guidelines/coding.md`: not read whole. I searched it for its rules on comments (`komentarz`, `comment`, `decision:`). It has none for a comment line of a test, beyond the rule of the formatter, which I checked with Prettier.
- `guidelines/testing.md`: read whole. It holds no rule about `decision:` lines or clauses `tests:`; that rule stands in `.the-way/elements/decisions/template.md` ("Verification"), which I read whole.
- `foundations/decisions.md`: D-39, D-40, D-42 and D-44 read whole. D-337 read in its binding sentences, its *Verification* (from the diff and the head) and the start of its *Rationale*; the rest of its *Rationale* and its *Rejected* not read. D-450, D-311 and D-178 read in their binding sentences, *Verification* and the start of their *Rationale*; the rest not read. D-04 read in its binding sentences, *Verification* and the first lines of its *Rationale*; the rest of its *Rationale* and its *Rejected* not read. The diff shows these parts unchanged (point 1).
- `tests/view/body-row-cells.test.mjs`: read at lines 1-470; lines 471-609 read only by their titles and `decision:` lines. `tests/view/shared-controls.test.mjs`: read at lines 487-540; elsewhere only by titles and `decision:` lines. `tests/view/body-row.test.mjs`: read at lines 355-400 and in grep lines.

## Searches not found or unclear

- I looked for a case that reads the movement of the backpack when an explanation opens, and found none (M-3).
- I looked for a case that reads the role of the energy's number at a value other than 0 and 90, and found none (M-2).
