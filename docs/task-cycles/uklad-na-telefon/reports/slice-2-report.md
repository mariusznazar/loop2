Status: done with concerns

# Report - slice 2, the behaviour decisions of the scene, the rule groups and the map drawing

## Files and commits

- `foundations/decisions.md`: +80 / -42 lines (D-288, D-19, D-349, D-372).
- Commit `66ce37c0` on `task/uklad-na-telefon` (base `587f74f6`), added by path, not pushed.
- Commit `68ce5c37` (second, after the orchestrator's answer to question 1; `foundations/decisions.md` only, a few lines of D-19): the line under the drawing shows "the hovered or the tapped tile or else the character's tile"; *Verification* of D-19 has a `complies` and a `violates` clause for it (below). The tests clause, which describes what today's tests hold of hovering, is unchanged.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` -> exit 1, "41 errors"; every one is `the quotation stands in no binding sentence` of a line `decision:` of D-288, D-19 or D-349. The same run with `--skip-test-citations` (the entry-writing step's run) -> exit 1, the same 41 errors. No other error.
- The 41 citations, all expected by the slice's *Checks* (for Slices 3-5):
  - D-288 "Rules move by a handle ... with no arrows in the header of a rule group": `tests/view/program-editor.test.mjs` lines 233, 445, 922, 1970, 2007, 2049, 2081; `tests/view/rule-editor.test.mjs` lines 384, 402, 416, 426, 440, 454, 561, 646, 663, 678, 691, 711, 728, 740, 767, 791, 816, 841, 860, 2039.
  - D-19 "The drawing ... its only interaction is hovering ...": `tests/view/run-screen.test.mjs:518`; `tests/view/tile-list.test.mjs` lines 96, 113, 219, 237, 250, 256, 271; `tests/view/world-area.test.mjs` lines 961, 984, 1079, 1237.
  - D-349 "The scene has one size, 672 × 304 px, twice the size of its picture": `tests/view/scene-picture.test.mjs:232`; `tests/view/world-area.test.mjs:499`.
  - Every file is one the slice's *Checks* names; no quoted line outside the plan's list for Slices 3-5 broke. The other citations of these decisions ("A rule's row reads as a sentence...", "One program editor stands...", D-372 "The scene shows frost on the edges of its frame" and "The frost lies over the layer of the tint") still hold: the check reports none of them.
- Not run: `npm test` (the full gate; not mine).

## Entries (each: meaning in English, in Polish, mark)

- **D-349** (`row 1`; the part of the pair of examples is carried until the tests of Slice 5 stand)
  - EN: The scene has two sizes, 1× and 2× of its 336 × 152 px picture: 672 × 304 px in the computer layout, in the phone layout the larger that fits the width (336 × 152 px at 360 px), the sides cropped slightly where a few pixels are missing without hiding anything the player acts with, and its small elements drawn at a size of their own, independent of the scale of the scene.
  - PL: Scena ma dwie wielkości, 1× i 2× swojego obrazka 336 × 152 px: w układzie komputera 672 × 304 px, w układzie telefonu większą z nich, która się mieści (przy 360 px 336 × 152), z lekko przyciętymi bokami, które nie chowają niczego, z czym gracz działa, a jej drobne elementy rysuje się w wielkości własnej, niezależnej od skali sceny.
- **D-372** (`the cycle's`: a consequence of row 1, entry 10 of the plan)
  - EN: The frost's full thickness is 16 pixels of the scene, whatever the size of the scene on the screen; "(32 px on the screen)" is gone from the binding sentence and stands in the rationale as true of the larger size only.
  - PL: Pełna grubość szronu to 16 pikseli sceny, niezależnie od wielkości sceny na ekranie; „(32 px na ekranie)” zniknęło ze zdania wiążącego, a w uzasadnieniu stoi jako prawda tylko dla większej wielkości sceny.
- **D-288** (`row 2`; pair of examples carried until the tests of Slice 3/4 stand)
  - EN: Rule groups move by „↑” and „↓” in their header, one place at a time as the arrows of a rule do, in every layout; the drag by a handle is for the mouse of a computer; the rationale and *Rejected* no longer accept that groups cannot be moved from the keyboard.
  - PL: Grupy reguł przesuwa się strzałkami „↑” i „↓” w nagłówku, o jedno miejsce, tak jak strzałki reguły, w każdym układzie; przeciąganie uchwytem jest dla myszy komputera; uzasadnienie i *Rejected* nie przyjmują już, że grup nie da się przesunąć z klawiatury.
- **D-19** (`row 3`, plus `the cycle's` for one clause: the line under the drawing following the tapped tile, an autonomous choice of the orchestrator, not a row; pair of examples for the tap carried until the tests of Slices 3/4/5 stand)
  - EN: The drawing's interactions are hovering and a tap with a finger, each marking the tile's row in the list of revealed tiles; a tap keeps the row marked until a tap elsewhere takes the mark off, hovering on a computer stays, a mouse click changes nothing. The line under the drawing shows the hovered or the tapped tile or else the character's tile (the cycle's clause).
  - PL: Rysunek mapy reaguje na najechanie i na dotknięcie palcem, każde zaznacza wiersz kafelka w tabeli odkrytych kafelków; dotknięcie trzyma zaznaczenie, aż dotknięcie gdzie indziej je zdejmie, najechanie na komputerze zostaje, kliknięcie myszą nic nie zmienia. Linia pod rysunkiem pokazuje kafelek, na który najechano albo którego dotknięto, a w razie braku kafelek postaci (zdanie cyklu).

## The pairs of examples added (word for word, for the description to quote under the entry)

D-288, added to the existing pair:
- complies: "in the header of every rule group „↑” and „↓”, in the computer layout and in the phone layout, „↓” moving the group one place down and „↑” one place up, „↑” disabled on the first group and „↓” on the last"
- violates: "a rule group that only a drag with a handle moves; the arrows of a rule group present in the computer layout alone"

D-19, added to the existing pair:
- complies: "a tap with a finger on a revealed tile marking its row in that list while the tab is picked, a tap on another tile moving the mark to the row of that tile, and a tap elsewhere on the page taking the mark off, a click of a mouse on the tile marking nothing; the line under the drawing giving the tapped tile while its row is marked, and the character's tile again after a tap elsewhere"
- violates: "a tap on a tile that leaves its row unmarked, or a mark that stays after a tap elsewhere; a tap on a tile not revealed that marks a row; the line under the drawing still giving the character's tile while a tapped tile's row is marked"

D-349, rewritten pair:
- complies: "the scene of a map run drawn 672 × 304 px in a window 1280 px wide and in one 1920 px wide; drawn 336 × 152 px in the phone layout at a page area 360 px wide, its sides cropped slightly, the mage standing at the right edge of the forest and a creature at an edge in full sight; the icon on the plaque of a discovery and the badge over the mage's head legible at 336 × 152 px, at a size of their own; an effect of the scene made for these two sizes"
- violates: "a style rule that draws the scene at a fraction of its picture, such as one and a half times, or at three times it; the scene at 336 × 152 px in the computer layout; a crop that hides the mage at the edge of the forest or a creature; a small element of the scene shrunk with it to a size that is hard to read; an effect of the scene made for a third size of it"

Parts of these pairs the rows do not give (so the human sees them at the merge): D-288 "„↑” disabled on the first group and „↓” on the last" (the plan's choice, from "tak jak reguły"); D-19 "a tap on a tile not revealed that marks a row" and "a tap on another tile moving the mark"; D-349 "at three times it", "the mage at the right edge ... and a creature ... in full sight" (from the task's *Context* and the plan's two-size choice).

## Own-work check (section 3)

- Requirement most likely unmet: the new D-19 must hold what the committed D-311 says of it ("in the phone layout a tap on it (D-19), links with its row only while the table is picked"), and the openings of the binding sentences that tests quote, which these rows do not make false, must stay.
- Check: read D-19's new text against D-311's rationale; the tap's example in D-19 says "while the tab is picked" and cites D-311. Ran the foundation check: no error names "A rule's row reads as a sentence...", "One program editor stands...", D-372 "The scene shows frost on the edges of its frame" or "The frost lies over the layer of the tint"; the only errors are the 41 above.
- Showed: both hold.
- Walkthrough / UI check: this slice alters no behaviour a user sees in the running product (it writes foundation text only, no code, no stylesheet).

## Choices

- Kept the opening of D-288's sentence "Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle with such a line" and appended the new clause, rather than a new sentence; rejected: a separate sentence for the group arrows. Cost if wrong: none (the citations of the whole sentence break either way).
- D-288 *Rejected*: dropped "rule groups moved by arrows alone — reordering by arrows does not work", whose reason the decision now contradicts; reworded "a way from the keyboard for rule groups with no arrows in the header, such as keys on the handle" to "other than arrows in the header" (same reason kept). Rejected: keeping both as they were (the first would contradict the binding sentence). Cost if wrong: a way weighed earlier is lost from the record. The row's source (question 2) keeps no *Not chosen*, so nothing new entered *Rejected* of D-288.
- D-288 *Rejected* last item: "in a narrower window" -> "in a window of the computer layout" and "shrinks the scene there", since in the phone layout the scene is now smaller by D-349's new wording; rejected: leaving it (it would say D-349 rejects shrinking the scene in any narrower window). Cost if wrong: a small wording to revert.
- D-349 *Rejected*: added the three ways of question 1's *Not chosen* with their costs from the task; reworded "a large scene in a wide window and a small one in a narrower window" to "... of the computer layout" so it does not contradict the phone layout.
- D-349 *Verification* `tests:` clause: removed "in a narrow window and in a wide one", which the scene's tests do not hold once the phone layout draws the frame by stylesheet at either size (the plan keeps the picture attributes 672 × 304); Slice 5 holds the new sizes. Cost if wrong: the clause under-describes a test that still checks both windows.
- D-349 binding sentences: the crop is "slightly, where a few pixels are missing"; the plan's bound (at most 32 px at 360 px) is a plan choice and is not written into the decision (the task gives no number). The decision gives two sizes only ("larger of the two that fits"), as the plan's choice and the task's "dwie wielkości" say.
- D-19's line under the drawing shows the hovered or the tapped tile (orchestrator's answer, second commit); the tests clause of *Verification* stays as it describes today's tests of hovering, and the tap is held by the pair of examples until Slices 3/4/5 add tests.
- No move of code (no code); no *Based on* change; no new Relations link (D-372 cites D-349 in its rationale without a relation).

## Reach beyond the dispatch

- None in the foundation beyond the ranges named. I searched `foundations/decisions.md` for "arrow", "no arrows", "D-349", "D-19" and "D-288" and read the lines found (including D-296, D-297, D-70 and the places citing D-349 at `foundations/decisions.md:6742-6765`, `:10334`, `:10366`, `:10585`, `:10655`): none of them needed a change; the rejections of a fractional scale in them (D-70 and others) stay true, since the scene still has no fractional scale. Grepped `tests/`, `src/`, `scripts/` for `decision: D-(288|19|349|372)` to list the citations. `foundations/invariants.md` `terrain-drawing-numbers` (line 354) read: it says the drawing shows no number of stock, which the tap does not change.

## Questions and concerns

1. (Answered by the orchestrator, applied in commit `68ce5c37`.) D-19's tap: the line under the drawing follows the tapped tile as it follows the hovered one. This is an autonomous choice of the orchestrator, not a row; D-19's change is marked `row 3` plus `the cycle's` for this clause, and the request puts that clause before the human. Foundation check after the commit: exit 1, 41 errors, all `the quotation stands in no binding sentence`, the same 41 as before; no opening of a binding sentence that tests quote changed (the D-19 citations were already among the broken ones).
2. The rule "a tap marks only with a pointer of the kind touch" is carried in D-19 as "a tap with a finger" and "a click of a mouse on a tile changes nothing"; a pen is not named. Recommendation: leave it.
3. D-372 stays marked `the cycle's` with its old *Rejected* kept (the template gives `unknown` to a new cycle's entry; nothing was added to it).
4. No test line quoting D-288, D-19, D-349 or D-372 broke outside the plan's list for Slices 3-5; none to hand to another slice.

## Unread material

- `.the-way/task-cycle/skill/foundation_step.md`, `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `way_of_working.md`, `reaching_another_skill.md`: read whole. `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md`: not read, since the slice alters no screen (foundation text only).
- `foundations/part_map.md:3-66` and `guidelines/coding.md`, `guidelines/testing.md`: not read, no code or test touched and the entries' *Scope* is unchanged.
- `.runs/task-cycles/uklad-na-telefon/task.md`: read lines 14-148 (Description to Settlements to record); lines 1-13 and 149 onward not read.
- `src/browser/sim/data/scene.ts`: read lines 30-70 of the range 36-63.
- D-295, D-297, D-41, D-70, D-320, D-365: read whole. D-296, D-311, D-396: read whole (D-311 by the orchestrator's note).
- Not read of the elements' `examples.md`/`projected*.md` and `elements/common/critique`: not named by the handoff and not needed.

## Searches not found or unclear

- none found missing. Unclear: the handoff's range for D-19 (`:10392-10435`) and the others matched the file; the decision template's rule on *Rejected* for a row with no kept ways ("`no cost to the product known`" vs "`unknown`") reads two ways; I read it as applying to ways the source keeps, and added no derived way to D-288, D-19 or D-372.

## Working copies

- `.runs/slice-2/` of the worktree held one file (the commit message file) at `.runs/slice-2`, made once for each commit; removed each time. No worktree, clone or screenshot made.
