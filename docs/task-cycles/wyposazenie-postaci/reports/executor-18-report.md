done with concerns

# Executor-18 report — Slice 18: the figure goes into the section „Wyposażenie”, twice its size

The one concern: the look of the screen in a real browser, in both layouts, was not checked in this slice (the slice's Goal gives that check to Slice 20); see "Walk".

## Commits

- `7d18842d` feat: the figure of a character goes into the section „Wyposażenie” of the screen Postać, twice the size it has in the picture band of Siedziba, under the frame of what the character does, and the name, the line of generation and archetype and the resurrection line stand at the top of the left area (D-445, D-446). Range: `b1ec2924..7d18842d`.

## Files changed (added / removed lines, `git diff --stat b1ec2924 HEAD`)

- `src/browser/sim/data/scene.ts` — new constant `CHARACTER_FIGURE_SCALE = 2` beside `CHARACTER_FIGURE`; the comment of `CHARACTER_FIGURE` no longer says "top of the screen" (part of 19 lines changed)
- `src/browser/view/character-figure.tsx` — every size is the picture's pixels × `PICTURE_PIXEL` × `CHARACTER_FIGURE_SCALE` (a module constant `FIGURE_PIXEL`); comment updated (25 lines changed)
- `src/browser/view/character-screen.tsx` — the `character-head` wrapper is gone; the left area (`screen-area character-identity`) holds, in order: `.character-facts` (name `h2`, line of generation and archetype, resurrection line), the frame `.character-screen-status`, and the new `section.character-screen-gear` with `h3` „Wyposażenie” and `div.character-gear-body` holding `CharacterFigure` (82 lines changed, mostly the re-indent of the facts)
- `src/browser/character-screen.css` — the `.character-head` rule is replaced by `.character-screen-gear` (top margin) and `.character-gear-body` (flex, centred); `.character-facts` gets a bottom margin; the rule of the heading `h3` of „Umiejętności” also lands on `.character-screen-gear h3` (`text-label`); comments updated (40 lines changed)
- `tests/view/character-screen.test.mjs` — see "Changed tests" (80 lines changed)

Total 162 insertions, 84 deletions.

## Changed tests (rule "Changing an existing test"; the cause of each lies in the requirement: F14 = D-446, F15 = D-445, row 9, rows 29 and 30 of the task)

1. "the screen names the character at the top of the left area, above the frame of what the character does, …" (was "the screen names the character, …"). Changed: the quoted sentence of D-446 is now the sentence as it stands ("At the top of the left area … above the frame of what the character does (D-447) …"); added the assertion that the children of `.character-identity` are, in order, `character-facts`, `character-screen-status`, `character-screen-gear`, and that no figure stands in `.character-facts`. Kept: every old assertion on the name, the generation, the icon and the facts' order.
2. "the figure stands in the section „Wyposażenie” under the frame of what the character does, drawn from the character's sheet in the picture band at twice its size, …" (was "the figure stands first in the left area, before the name, … at twice its pixels, …"). Changed: the quoted first D-445 sentence is the current one; the assertion that the head holds `[character-figure, character-facts]` is replaced by "the figure is inside `section.character-screen-gear` whose `h3` reads „Wyposażenie”, and it is the only figure"; the sprite size expectation `sheet × 2` becomes `sheet × 4` (the band draws a pixel at 2 px, the figure at twice that), written as a literal; added the size of the box (`CHARACTER_FIGURE` × 4), the centring `left` and `bottom: 0`. Kept: the same sheet as the band (`campDrawing`), the figure in the camp, in a manual map run going, ended, and in an earning loop, `aria-hidden`, no text, no control. The other two quotes (D-445 "It stands whatever…", "It is a picture…") and D-272 / D-271 are unchanged and still match the foundation.
3. New test "the section „Wyposażenie” stands from the creation of the character, before any tree is known, with its heading in text-label like „Umiejętności”" — no `decision:` line, because no decision sentence says it (row 9 is a guideline: the styleguide rule "The screen Postać"); I looked for one in D-461 (see "Reaches").

## Checks (command → exit code)

- Written first, failing, on the unchanged code (the base `b1ec2924` code): `npm test -- tests/view/character-screen.test.mjs` → exit 1, 3 failing: the first one by `assert.deepEqual` ("the facts first, above the frame … expected [character-facts, character-screen-status, character-screen-gear], got [character-head, character-screen-status]"); the other two stopped on the missing section element (`null.tagName` / `null.textContent`), the section did not exist yet.
- After the code: `npm test -- tests/view/character-screen.test.mjs` → exit 0 (16 tests, 16 pass, 0 fail).
- `npm test -- tests/invariants/test_browser_view_token_values.py` → exit 0 (4 tests OK).
- `npm run typecheck` → exit 0.
- Also run: `npx prettier --check` on the five changed files → exit 0; `npx eslint` on the changed `.mjs`, `.tsx` and `.ts` files → exit 0; `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors" (the 14 `decision:` errors the handoff named are 0 after Slices 4, 4b and this one — no error is left); `python -B -m unittest tests.quality.test_function_and_file_size` run, and its output names none of the five changed files (I did not take its exit code as a check of the slice: other code stands over the threshold there).
- Not run: the full suite / `npm test` without a file (the boundary forbids it); the real-browser check (Slice 20's, by the Goal).

## Tests that fail on the slice's base

The three cases above fail on the base code by design (they were written first; the output is above). No test that passes on the base fails after the change: the 16 tests of the file pass, and the two other checks pass. No working copy of the base was needed for that (the failing run on the unchanged code above is the base's result).

## Own-work check

- Requirement most likely not met by this slice: "twice the size it has in the picture band" together with "the same picture, beat and pose, no clearing, no control, hidden from readers" (D-445), and "the name … stand at the top of the left area, above the frame, no longer beside the figure" (D-446). Check written: the changed test 2 (figure inside the section, sheet × 4 as a literal against the band's own sheet, box × 4, one figure only, `aria-hidden`, no `button, a, input, select, [tabindex]` in it, no text, in four states of the character) and the changed test 1 (the order of the three children of the area). It passes. Mutations considered: factor 2 → 3 or 1 (test 2 fails on the literal 4), the figure left in `.character-facts` or before the name (tests 1 and 2 fail), the section only after a tree is known (test 3 fails), the heading in another role (test 3 fails), a clearing or a control added to the figure (test 2 fails on the element count and text); a CSS change that removed the figure's animation rule is not caught by any test (as before this slice; the rule is unchanged).
- Mutation not caught by a test: the CSS of the section (`margin-top`, centring) and the phone layout order (left area over the right one — the grid rule is unchanged from before this slice, and jsdom does not apply it, styleguide rule "Two layouts and one threshold between them").

## Walk (`walkthrough.md`) and `ui_check.md`

The change alters what the screen Postać shows (the figure moves, twice its size; a new section heading). The walk and the screenshot were **not performed** here: the slice's Goal says "the check in a real browser is Slice 20's", and the handoff's boundary lists only the focused checks. Cases left unchecked, with the reason "given to Slice 20 by the Goal":

| Case | By what | Verdict |
|---|---|---|
| the figure at 128 × 136 CSS px (4 px per picture pixel) stands centred in the section „Wyposażenie” under the frame, on the flat background, at 1280 × 720 | browser, `#/postac/1` | unchecked (Slice 20) |
| the same at an area of 360 px, left area over „Umiejętności”, nothing scrolls to the side (`contentWiderThanItsBox`, `outsideTheWindow` empty), a long name still breaks in its row at the top | browser, phone layout | unchecked (Slice 20) |
| the figure animates at the band's beat and stands still under reduced motion | browser | unchecked (Slice 20) |
| side observation | — | the figure is the only content of the section's body in this slice; the tiles of the slots (Slice 19) will stand around it, so the body's flex rule is a first place, not a final layout |

Shown to the human: no screenshot taken, none kept.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-461 (heading at line 12848, 12848-12862), read whole: to find a decision sentence a test of the section could quote. It has none about the section standing from the creation or the heading's role (that sits in the styleguide rule "The screen Postać"), so the new test carries no `decision:` line.
- `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md`, read whole (the method names them for a change of a screen).
- `the user's rule file on git` (user's global rule before a commit).
- Greps of the worktree for `CHARACTER_FIGURE`, `character-head`, `character-identity`, `character-figure`, `character-facts`, `PICTURE_PIXEL`: to find every user of the changed names. The only user of the removed class `character-head` was the screen and its test.
- `src/browser/view/scene.tsx` `Sheet` (to see that the sheet scales with its box) and `src/browser/view/character-trees.tsx` (the heading markup of „Umiejętności”) and `scene.ts` around `PICTURE_PIXEL` and `CAMP`, to write the constant and its comment in the data file's style.

## Choices made

- The factor is `CHARACTER_FIGURE_SCALE = 2` in `scene.ts` (the plan's *To do* 10 wants a constant of the scene's data beside `CHARACTER_FIGURE`); the view multiplies `PICTURE_PIXEL` by it into one `FIGURE_PIXEL`. Rejected: changing `CHARACTER_FIGURE`'s box to 64 × 68 pixels of the picture and leaving the view at `PICTURE_PIXEL` — it would hide the "twice" in two numbers and break "the same picture at twice its size" as a stated factor; cost if wrong: one constant and one test literal.
- The section is `section.character-screen-gear` inside the left area (not a `screen-area` of its own), with `div.character-gear-body` that centres the figure; Slice 19 puts the tiles into that body. Rejected: a `screen-area` block for the section (the left area is one block, D-282, and the test of the two areas expects two areas at most). Cost if wrong: a rename of the class and one test string.
- The heading is an `h3`, as „Umiejętności”, and shares its CSS rule by a second selector, so one rule keeps the two headings in the same role.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1–1239 whole; lines 1240–1975 (the rest of the rule "Program editor" and the rules after it) not read, because they do not concern the screen Postać or the figure (the rules that do — "The screen Postać", the token rules, "Two layouts…", "Nothing scrolls…", "Everything is done by touch…" — are in the part read).
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md`: read lines 46–51 (the plan's range 48–50 was read together with lines 46–47 and 51), 266–269 and 282–285 (the ranges 268 and 283–284 with their neighbours), not the rest.
- `foundations/part_map.md`: lines 1–33 read whole. `foundations/decisions.md` 4881–4946 (D-445, D-446, D-447) read whole; D-461 read as named above.
- `tests/view/character-screen.test.mjs`: read whole (1–694 before my edits).
- Everything else the handoff names (the six guideline files except the styleguide's tail, `src/browser/AGENTS.md`, `make-change/SKILL.md`, `slice.md`) read whole.

## Searches not found or unclear

- none (a decision sentence for „the section stands from the creation of the character” was looked for in D-461 and is not there; that is a fact stated under the changed tests, not a gap in the work).

## Plan against code

No mismatch, except two names: the plan names F14 as D-446 and F15 as D-445 at ranges the handoff corrected; the line of the test that quotes D-446 stood at line 134, as the handoff says.

## Working copies

None made: I made no worktree, clone, script file or screenshot. The five scratch log files I wrote in `.runs/` (`executor-18-red.log`, `-green.log`, `-tok.log`, `-tc.log`, `-fc.log`) are removed. `.runs/executor-18/` was never created. The branch's working tree is clean after the commit (`git status --short` empty).
