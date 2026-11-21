Status: done

# Report - slice 8 of "loop2: uklad na telefon dla wszystkich ekranow gry"

## Commits

- Second, `1903499505fda6478aff9581e9840c8e9a7c3d29`, a new commit by path (`guidelines/styleguide-browser-view.md` only, 4 lines changed in one bullet of rule 3), made after the orchestrator's answer to concern 1; see "Autonomous choice of the orchestrator" below. Not an amend. Re-run after it: `foundation_check.py` exit 0 "0 errors"; `check_instructions.py` exit 0 "0 error, 146 warn, 7 info" (same count as before); `npm test -- tests/agent_workflow/test_loop2_scene_art_skill.py` exit 0, 7 tests OK.
- First, `7f2aacb03826868fb9571f3009c092917a451037` on `task/uklad-na-telefon` (base `9cb58f9f`), "docs: :memo: give the styleguide the rules of the phone layout ...". Committed by path (the three files below). Not pushed. Author address `the author's private address` (the repository's remote is the owner's account).

## Files changed (added / removed lines)

- `guidelines/styleguide-browser-view.md` - +about 220 / -about 40 (git: 254 lines touched in total)
- `.claude/skills/loop2-scene-art/SKILL.md` - 19 lines touched
- `.agents/skills/loop2-scene-art/SKILL.md` - the same 19 lines; byte-identical to the first (`cmp` said same)
- Total per `git diff --stat`: 3 files, 245 insertions, 47 deletions.

## What the change holds

New rules of the styleguide (in Polish, each in the template's form: *Decision*, *Invariant* `none`, *Good*, *Bad*, then the text), placed after the required rules, before "Main button, secondary action and tab":

1. `Two layouts and one threshold between them` - the two layouts and the one threshold of 1280 px (D-396), the page area as `innerWidth` and not the screen resolution, the phone layout made for a page area 360 px wide upright; phone rules in blocks `@media (width < 1280px)` in the stylesheet the element belongs to (D-421), each with a comment naming D-396 and standing after the computer rules it changes, the computer rules untouched; the block written with no media type (jsdom applies a block only with the word `screen`, the find-out of slice 7); the threshold written in each `@media`, no token for it, 360 px written in no stylesheet; no other width threshold but the one at which the scene takes its larger size (D-349); no third layout, 720 and 1074 px no longer a look of their own; one column of areas (D-282), the run screen's order (D-311); where a fault of the phone layout is fixed and where not (D-396); an honest limit: a phone rule is not checked by a test, jsdom does not apply it.
2. `Nothing scrolls to the side in the phone layout, and no text crosses its frame` - page and frame alike, a table or list laid out to fit its frame, the picture cropped by its frame is no scrolling where it hides nothing the player acts with, the measure of loop2-play.
3. `Everything is done by touch, and every control holds the touch target` - no hover-only and no drag-only act (the map drawing's hover and tap of D-19, the arrows and the mouse handle of D-288, the destructive button's `danger` at rest of D-44); every control, held to `--touch-target-min` through `var()` in `min-width` and `min-height`, the source named as the fact `android-touch-target-size`, the minimum for the phone layout only; controls whose rules stand in a screen's stylesheet hold it too.
4. `A change is checked in both layouts` - a screen designed in both layouts in one change; the way of checking in loop2-play (computer layout at 1280 × 720 px of page area, phone layout at 360 px with touch and `tap`, another page area, the return to 1280 × 720 by a new session, Firefox and Edge by hand); a green test is no check of the phone layout.

Existing rules brought into line: "Every background with its text" (destructive button's text in `danger` on `highlight`), "No value in place of a design token" (the icon of the plaque's size independent of the scene's size; a pointer to rule 1 for the `@media` threshold), "States of shared controls" (destructive button in `danger` at rest, `highlight` besides under the pointer, no look of its own in the phone layout, with the reason), "Menu bar, the menu „Konto” and the list of programs" (content width in both layouts), "The screen Wiedza" and "The screen Postać" (one area over the other below 1280 px instead of 720 px; Postać's Bad line), "Program editor" (the arrows „↑” „↓” in the header of every group in both layouts, disabled on the first and last, the handle for the mouse, a new Bad item), "The scene of a map run" (a paragraph on the two sizes, the crop, the one extra threshold, the small elements at a size of their own; the bar's thickness in both sizes; the frost's 16 pixels of the picture, 32 px on the screen at 672 × 304 and 16 px at 336 × 152; Good and Bad lines), "The picture band of Siedziba" (phone layout in place of „wąskie okno”), "The end-of-run window" (width of the content column in both layouts, D-370), "The list of accounts" (Zablokuj in `danger` at rest). D-396 was added to the *Decision* line of the rules whose text now cites it. The order-of-work example stays an example, unchanged.

`loop2-scene-art/SKILL.md` (both copies): the sentence that gave D-349 as one size of 672 × 304 px now gives its two sizes; the sentence on the numbers in pixels of the picture says once or twice as large; the screenshot measurement keeps the computer layout's 2 × 2 blocks at 672 × 304 px (a window 1280 px wide or wider) and adds one sentence that in the phone layout the scene may stand at 336 × 152 px, where a picture pixel is one screenshot pixel, so the printed width is read before counting.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` - exit 0, "0 errors".
- `python -B .the-way/instruction-files/check_instructions.py` - exit 0, "0 error, 146 warn, 7 info". The warnings for `guidelines/styleguide-browser-view.md` (lines 364, 368, 369, 800, 830, 838, 905, 1388: `.css`, `/styles.css`, `#/konta`, `#/mapy`, `#/wiedza` read as dead paths) are of the kind that stood before the change; none points at a path of the new rules (I did not run the script on the base commit to count them, so "stood before" is read from their kind and their lines in old text).
- `npm test -- tests/agent_workflow/test_loop2_scene_art_skill.py` - exit 0, 7 tests OK.
- Not run: the product's full gate (`npm test` with no argument), by the handoff.

## Own-work check (section 3)

- Requirement most likely missed: "the guide holds no leftover that contradicts the new decisions" - a rule that still says the destructive button is neutral at rest, a threshold of 720 / 1074 px, one size of the scene, or a narrow window as a thing of its own.
- Check: `grep -n -E "neutraln|720 px|1074|jednym rozmiarze|wąskim oknie|wąskie okno|dwukrotności swojego obrazu|jeden rozmiar" guidelines/styleguide-browser-view.md`. Result: the only hits are in the new rules (the threshold rule's Bad and text, the fault-fixing sentence, and the 1280 × 720 px of the checking rule); no leftover of the old wording. A second grep for `D-396` found 25 mentions.
- A second probe: `prettier --check` on the file warns. I ran `prettier --write` on it and saw it only realigns the Roles table (a column width), which the committed text of the base also had misaligned; I restored my version before committing, so the table is as it was. The repository does not hold this file to Prettier (foundation_check and the skill test pass); I name it so the reviewer is not surprised.

## Walkthrough (`walkthrough.md`)

The change alters no behaviour a user sees in the running product: it changes a guideline file and a skill's text, no code, no token, no stylesheet. `ui_check.md` too: no screen changes.

## Choices (with the way rejected and its cost if wrong)

- **Four new rules, after the required rules, not one long rule.** Rejected: one rule "phone layout" - four subjects (threshold, scroll, touch, checking) with four checks would be one wall of text and the reviews could not cite one. Cost if wrong: the four names have to be cited where one would do.
- **No new invariant, *Invariant:* `none` on all four.** The plan writes none; a cheap test cannot see a phone rule since jsdom does not apply it, which the rule says as an honest limit.
- **The hover of the map drawing is in the touch rule, not in the roles table.** The guide has no passage on the map drawing's hover: the table row `link-highlight` ("Ten kafelek i ten wiersz ... to to samo miejsce") does not speak of hover, and its meaning is carried by D-41, which the plan does not change. Rejected: adding "najechanie albo dotknięcie" to the table - a changed meaning with no changed decision. Cost if wrong: the reader looks for the tap in the table; the touch rule names D-19.
- **In the scene rule the bar's thickness stays `calc(var(--bar-width) * 2)` in both sizes**, read from D-349 ("small elements ... independent of the scale of the scene"); code decides in slice 15. Cost if wrong: slice 15 finds the bar should differ at 1× and a one-line rule change follows.
- **Postać and Wiedza in the phone layout: the left/first area over the right/second**, read from the existing "lewy stoi nad prawym" and D-282's order; for Wiedza the order Zrozumienie over the skill trees is my reading of "left" and "right" (D-416 does not give it in so many words).

## Autonomous choice of the orchestrator

A link inside a running sentence is NOT held to the touch-target minimum (the orchestrator's answer to concern 1 below). Reason given: item 9 of the task names the controls it holds (button, cell of a pick, arrow, item of a menu), no link in a sentence, and a 48 px floor on such a link would break the line of text; the plan's *Choices* rejected "every link held to it, inside a sentence too". A link that is a control by itself (a whole row of navigation, a menu item, a link standing alone as a button-like target) is held. The bullet of rule 3 in the styleguide now says exactly that, with the one-sentence reason; slice 7's comment at `src/browser/styles.css:525` and the fact `android-touch-target-size` are untouched. Cost if wrong: one bullet of the styleguide and, for a different reading, the screens' stylesheets. This choice is the orchestrator's, not mine; the first commit held the opposite reading, replaced by the second.

## Concerns (for the orchestrator)

1. **(Resolved by the answer above; kept for the record.) An inline link and the touch target - a mismatch between the plan's choice, the fact and slice 7's code.** The plan's choice says a link inside a sentence holds the minimum "only where the cited source does not exempt an inline target". The fact `android-touch-target-size` (`foundations/environment_facts.md:1027-1031`) quotes two passages and neither exempts an inline target (the second only exempts precise input: mouse, trackpad). So by the plan's own condition a link in a sentence holds the 48 px, and I wrote the rule that way (rule 3, the last bullet). But slice 7's comment in `src/browser/styles.css:525` says "A link inside a sentence is no such control and keeps its size", and the loop2-play list says "the source ... says whether it counts". Recommendation: the orchestrator decides before slices 16-19 reach the credits and the sentences with links; either keep my rule (the links in sentences get a target, which may break the line of text: the cost the plan names) or record the exemption in the fact with a quoted source and then change that bullet. If nothing is done, the code and the guide say different things.
2. **The border of the rules' reach:** the plan's *Goal* asks for "the rules that speak of the changed decisions follow them", incl. "what the drawing of the map does on a tap (D-19) where the guide speaks of the hover". The guide speaks of the hover of the map drawing nowhere but the new touch rule; see the choice above. No other D-19 text in the guide exists.
3. The guide's old rule on columns of screens ("A stylesheet of its own ...", D-421) still says the columns of Programy, Mapy and Wiedza stand in `styles.css` "z ich `@media`", without a word on 1280 px; the code moves to 1280 px in slice 9, so I left the sentence, which is true of both thresholds.

## Reach beyond the dispatch (section 1)

- `foundations/environment_facts.md:1020-1033` (the fact `android-touch-target-size`, which the plan's *Read* names as "entry 2") - read by range after a grep for its heading; the handoff named the fact, not its range.
- `src/browser/styles.css:1-40` and `:515-555` (the head comment and the block of slice 7), and `src/browser/tokens.css` line 81 (the token and its `Source:`) - to state in the rules what the code stands on; `tokens.css` is named by *Read*, `styles.css` was not.
- `.runs/task-cycles/uklad-na-telefon/task.md:16-45` and `:143-147` were read as *Read* names them.
- `the author's rule file "git" of the instruction set` - read for the commit (a hook asked for it).

## Working copies

- `.runs/slice-8/` of the worktree held three scratch files (the base text of the styleguide, a copy for a Prettier probe, and my text before the Prettier probe). Removed: `.runs/slice-8`. Nothing remains.

## Unread material

- `foundations/decisions.md` D-389 (10321-10382): read to line 10356 only (the opening, *Verification* up to the "complies" line). The remainder (the rest of *Verification*, the rationale) not read; the crop sentence I rely on stands in the opening paragraph.
- D-311 (10517-10647): read the first 36 lines (the opening, the phone-layout paragraph, the end of the *Verification* start). The rest of its verification and rationale not read.
- D-372 (11947-11983): read the opening, *Verification* and the first lines of the rationale (to about line 12023); the rest not read.
- D-288 (9336-9411): read the opening, the arrows part of *Verification* and the start of the rationale (to line 9376); the rest not read.
- D-19 (10387-10430): read the opening, *Verification* and the start of the rationale (to line 10434); the rest not read.
- D-349 (10859-10901): read whole.
- D-280 (4525-4596): read whole; D-282 (4643-4674): read whole; D-370 (10964-10989): read whole; D-44 (5081-5097): read whole; D-43 (5066-5080): read whole; D-396: read whole; the fact: read whole.
- D-421 (4851-4865) and D-38 (4983-4997) and D-43: I read D-43 whole; D-421 and D-38 not read as entries (I used the styleguide's own text about them).
- `foundations/part_map.md:3-33` (browser-view) and `:140-159` (agent-workflow): not read. The change touches a guideline of browser-view and a skill whose files the map already claims; `foundation_check.py` passed.
- `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md`: not read, since the slice alters no screen and no behaviour a user sees (the method says to read them for such a change).
- `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`, `src/browser/tokens.css` (only line 81 and its neighbours), `tests/agent_workflow/test_loop2_scene_art_skill.py`, `.the-way/product-guidelines/styleguide/SKILL.md` and `template.md`, `.the-way/task-cycle/change/slice.md`: read whole (`tokens.css`: lines 78-83 only).
- The whole guideline `guidelines/styleguide-browser-view.md`: read whole before changing it.

## Searches not found or unclear

- The guide has no passage that speaks of the hover of the map drawing (the handoff's goal says "where the guide speaks of the hover"); the only hover text is the table row for `highlight` ("ta kontrolka jest pod kursorem") and the states of controls. Handled as in the choices above.
- The plan's choice about inline links was unclear against the fact's text (concern 1); the orchestrator settled it (see "Autonomous choice of the orchestrator").
- The plan's *Read* ranges for the decisions (e.g. `foundations/decisions.md:5507-5521` for D-396) were not exact; I found each entry again by its heading with a grep (as note 1 of the handoff said). Current starts: D-280 4525, D-282 4644, D-43 5067, D-44 5082, D-396 5508, D-288 9341, D-389 10321, D-19 10399, D-311 10539, D-349 10885, D-370 11011, D-372 11996.
- A hook of the session (`rules-on-demand`) refused the first Bash call that wrote a script and the first one that committed, each time until I had read its rule file; nothing in the work depends on it.
