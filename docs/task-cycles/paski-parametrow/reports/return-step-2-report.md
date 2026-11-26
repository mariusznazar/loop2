# Report — the return step again, after correction 1 — task `paski-parametrow`

**Status:** done

**Commits:** none. I found nothing in the foundation, the guidelines, the part map, the glossary or the environment facts that no longer matches the code and the tests of `713c4def`, so I wrote and corrected nothing. The evidence of the search stands below.

## Checks (command, exit code) at `713c4def`, working tree clean

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors (it reads every `decision:` line, so the two lines the correction added, D-311 in `body-row-cells.test.mjs` and D-450 in `body-row-explanation.test.mjs`, quote a binding sentence from its start) |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | 0 error, 0 warn, 120 info |
| `npm test -- tests/view/body-row-motion.test.mjs` | 0 | pass |
| `npm test -- tests/view/body-row-explanation.test.mjs` | 0 | pass |
| `npm test -- tests/view/body-row-cells.test.mjs` | 0 | pass |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 | OK |
| `npm test -- tests/invariants/test_design_token_sources.py` | 0 | OK |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | OK |

Not run: the full gate (`npm test` with no argument), as the handoff gives; it is CI's on the request.

## What I compared, and what I found

Range read: `git diff 18c16b69..713c4def` (six files). Read whole, each at the code of `713c4def`: D-450, D-42, D-337, D-178, D-311, D-04, D-396, D-39, D-40, D-44, and the invariants `design-token-contrast` and `design-token-sources`.

### The blow text no longer rises (`713c4def`)

- Code and tests: `.body-blow-text` plays one keyframe set, `body-blow-text-fade`, that changes only `opacity` (to 0), in 1.3 s, with `step-end` in the base rule (so under reduced motion it stands in full colour and goes at the end in one step) and `ease-in` under `prefers-reduced-motion: no-preference`; the text keeps its place in the health cell (`right`, `bottom`), the shake, the stop with game time and the removal at the end of the animation are unchanged. The motion test holds one animation of 1.3 s that does not repeat, a timing other than `step-end`, an end at opacity 0, and no `translate`, `transform`, `bottom` or `top` in any keyframe.
- D-450 (binding sentences): "shows the fading „−{n} · {stworzenie}”" and "under the system's setting for reduced motion the cell does not shake and the text stands still and goes" are both true of the code: fading in place at ordinary motion, standing in full colour and going at once under reduced motion. No sentence says the text rises. *Rationale* "The text fades in the same real time at every pace" is true. *Rejected* names no motion of the text. Its `tests:` clause holds "the marker gone when its animation ends" and "under … reduced motion no shake and the text standing still and going"; the tests hold more (the text not moving from its place while it fades), but no binding sentence says that, so the clause does not say more than the tests hold, and I added nothing.
- D-42: the sentence "the pulse and the shake and the fading text of a blow in the health cell (D-450) are judged by 2.3.1" and the clause "the shake of the health cell once in 0.34 s and the fading text of a blow once in 1.3 s" are true (0.34 s and 1.3 s, each once). The *Rationale* "the pulse and the shake of a blow move small parts of the screen, slower than the criterion on flashing counts" is true; the text's fade has no motion of place now. Its pair (the 40 % of the dim phase, the gap between the zones) is untouched by the correction.
- D-337: its blow sentence ("the health cell … shows a creature's blow, as D-450 gives") says nothing of the text's motion. D-04: the marker is read from the events; unchanged by the correction. D-396: "no text over the border of its frame" is held by the new CSS (the text stays inside the cell). D-39, D-40, D-44 and both invariants: no change in the roles, tokens or button the correction touches; the invariants' tests pass.
- Search by the words the correction adds: in `foundations/`, `guidelines/`, `src/browser/`, `tests/`, `scripts/` and `.claude/skills/` for `body-blow-text`, `body-blow-text-(rise|still)`, `ease-in`, `stands still`/`stand still`, `rise`/`rises`/`rising`/`unosi`/`wznosi`, `flow of the row`, `moves the backpack`, `moves down`, `decision: D-311`, `keyframe`. Result: the text's rise stands nowhere as the blow's motion any longer. Hits that remain are other things: the scene's specks, the flying icon (`scene-flight-rise`), the bear's paws (styleguide :1343), the sim's "health rises" and, in the styleguide, the sentence at :1538 that says the text does *not* rise as the old Loop's does. `body-blow-text-still` and `body-blow-text-rise` stand nowhere. Searching decisions for lines holding both a blow word and a rise word (`blow|cios` with `rise|unosi|wznosi|translate|float`) found no line in `foundations/` or `guidelines/` except the styleguide sentence at :1538.
- The styleguide's rule "The body row of a map run", section "Znacznik ciosu" (:1533–1552), says the text stands still in the health cell's own box and fades smoothly, slowly at first, leaving the bar and its end free; reduced motion: full colour, goes at once at the end of its time; and the CSS and the test hold exactly that. "Ruch wiersza" names the time of the text's fading, unchanged. No value is written there. (The sentence at :1549–1550 has a short wrapped line; it is wording only, and I left it.)

### The `decision:` lines and `tests:` clauses the correction added

- D-311 at `tests/view/body-row-cells.test.mjs:278`: quotes "The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with a bar under each of its values", which begins at the start of a sentence of D-311 (after "(D-288). "). The case holds the bar under each value (the correction saw it fail with no bar under nature energy). The order of the scene, „Teraz” and „Potem” is held by `tests/view/world-area.test.mjs:219`, which carries its own D-311 line; the quotation must start at the sentence's start, so it cannot be cut shorter at its beginning. D-311's *Verification* clause already names "a bar under each value of the body row and the explanation of a value open right under its cells and above the backpack"; true of these tests, so unchanged.
- D-450 at `tests/view/body-row-explanation.test.mjs:131`: quotes the whole first sentence up to "and moves down what stands under it" (a start of a sentence); the case holds the explanation's place between the cells and the backpack and its being in the row's flow (the correction saw it fail with `position: absolute` and with `float: left`). D-450's clause now names "in the flow of the row so that it moves the backpack down", true of that case. The measurement of the backpack's top moving down is a browser check (D-87, D-88), which the case says in its comment.
- D-178: the clause "the number of the energy in `text` at 0, 90 and 100, never in `danger`" is held by `body-row-cells.test.mjs:168` (cases at 0 and 90, and the new one at 100), whose D-178 line quotes "… in the role `text` at every value of the energy, zero included". True.
- The second identical D-450 line removed from the satiety click case: one remains at `body-row-explanation.test.mjs:88`.
- Both entries keep the marks the correction gave: "the cycle's" (in-place edits of `tests:` only, no binding sentence, no pair).
- Cosmetic, left: the D-450 clause wraps with one short line ("down, the explanation of its value, with its threshold, what"); no check reads wrapping.

### Part map, glossary, environment facts

- Part map: the correction adds no file; `src/browser/run-screen.css`, the three test files and the styleguide stand where they stood (`foundation_check.py` reports no unclaimed file, exit 0).
- Glossary: the correction uses "fade", "stand still", "marker" and "flow of the row" in their plain meaning; no sentence of the foundation reads wrongly in it (WAY-95). No term is used against its entry.
- Environment facts: the correction rests on no source outside the product that the foundation does not hold. The comment of `run-screen.css` still cites `--animate-rise` of `loop` to say what the text does *not* copy; that is a source of a dropped choice, and no decision rests on it.

### Settlements and where each went

- The text standing still and fading where it stands (Q7, for the human's veto): it went to the styleguide's rule "The body row of a map run" (`guidelines/styleguide-browser-view.md:1536–1541`, written by correction 1), as a rule of the look, by the questions of the decisions template ("Where it goes", question 2: a value and a rule of the look). No decision is written: it carries no cost someone would propose the other way beyond the one-word curve (`ease-in`), and no decision's sentence says the text rises. I add nothing in this step; no entry is deferred.
- The `tests:` clauses of D-178 and D-450: written by the foundation step of correction 1 into the log, as above.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Commit nothing | Add the text's standing in place to the D-450 clause; reword test titles that say "over the health cell" | A reader of the clause meets a part the tests hold but no sentence says; the wording "over the health cell" in two titles, two comments and one doc comment stays (`tests/view/body-row-motion.test.mjs:3,190,375`, `tests/view/body-blow.test.mjs:1`, `src/browser/view/body-blow.ts:5`); it reads as "of the health cell", and no entry says "over" |

## Known open points not mine

The blow text no longer rises as old Loop's does (Q7); the sum of the creature's blows on a killing blow; the marker of the temperature scale's look and the other choices the human accepted by merging; the style-guide rule repeating decisions (N-1).

## Working copies

None made; `.runs/return-step-2/` was not needed. Nothing to remove.

## Unread material

- `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/skill/return_step.md`, `.the-way/task-cycle/skill/foundation_step.md`, the handoff, `correction-1-report.md` and `return-step-report.md`: read whole.
- `foundations/decisions.md`: D-450, D-42, D-337, D-178, D-311, D-39, D-40, D-44 and D-396 read whole. D-04 read from its heading to the middle of its *Rationale* (lines 59–178); its *Rationale* after line 178 and its *Rejected* not read (the correction touches nothing that D-04 holds).
- `foundations/invariants.md`: the two named invariants read whole, with the Method lines; the full sentence of `design-token-contrast` is a long line that the viewer omitted, and I read it only through the check's result (exit 0).
- `guidelines/styleguide-browser-view.md`: lines 1500–1570 read; the rest of the rule "The body row of a map run" (1421–1499) not re-read in this round (the first return step read it); the rest of the file not read.
- `src/browser/run-screen.css`: lines 798–913 (the blow's rules and keyframes) read; the rest not read.
- `tests/view/body-row-motion.test.mjs`, `body-row-cells.test.mjs`, `body-row-explanation.test.mjs`: the diff of the correction read and the `decision:` lines listed; the cases not changed by it not re-read.
- `.runs/task-cycles/paski-parametrow/task.md`: not read in this round (the handoff names it; the comparison needed only the correction's entries and code, and no sentence of the task bears on a place I found a mismatch).

## Searches not found or unclear

- none found missing. Unclear: whether the test titles and comments that say "over the health cell" (five places named in Choices) should read "in the health cell" now that the text stands inside the cell's own box; the first return step noticed the same and left them, and I did the same, since none is an entry and none misleads about behaviour.
