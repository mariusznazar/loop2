done with concerns

# Slice 5 report - tests of the world area and of the scene's picture cite the new D-19 and D-349

## Commits

- `628dfd7a` on branch `task/uklad-na-telefon` (base `69a845847ff31b71e55e72619489fc137cf5a9d3`). Not pushed.

## Files changed

- `tests/view/world-area.test.mjs`: 13 lines added, 11 removed (22 changed lines in total; comments and one test name only, no assertion touched).
- `tests/view/scene-picture.test.mjs`: 1 line changed (the decision citation only).

## What changed

1. `tests/view/scene-picture.test.mjs:232`: `decision: D-349 "The scene has one size, 672 × 304 px, twice the size of its picture"` became `decision: D-349 "The scene has two sizes, one and two times its picture of 336 × 152 px"`. The case below holds the background's picture at 336 × 152, which is the sentence's opening.
2. `tests/view/world-area.test.mjs` case at about line 498 (the one-size scene case):
   - The comment block above it now says what the case holds under the new D-349: the background's attributes give 672 × 304 px, the frame is sized by its picture alone, no text on it. It also says the phone layout's smaller drawing is a stylesheet rule in its `@media` block, which jsdom does not apply, so the attributes stay 672 × 304.
   - The citation is now `decision: D-349 "The scene has two sizes, one and two times its picture of 336 × 152 px: 672 × 304 px in the computer layout"`.
   - The in-case comment "The one size holds ..." now reads "The attributes give 672 × 304 px ...".
   - Choice: the test name changed from "the scene is the picture of the forest at the one size of D-349, with no text inside or over it" to "the scene is the picture of the forest at 672 × 304 px, with no text inside or over it". The old name says "the one size of D-349", which the new D-349 no longer says. The Notes of the handoff say to keep test names; the Goal says the case should say what it holds. Way rejected: keep the old name. Cost if wrong: one name to change back; no assertion depends on it. Question for the orchestrator (see below).
3. `tests/view/world-area.test.mjs`, four D-19 citations (lines about 961, 984, 1079, 1237 before the edit):
   - 961 (the click changes nothing, no control): `"The drawing of the game map is a picture, not a control: its only interactions are hovering a tile"`
   - 984 (hovered tile marks its row, line shows numbers): the new first sentence up to "...or else the character's tile", with "hovered or the tapped tile" as the new D-19 gives it.
   - 1079 (link-highlight): the new first sentence up to "...marks the tile's row in the list of revealed tiles".
   - 1237 (line of numbers): the new first sentence up to "...and the numbers of stock stand in that list".

Each quotation is a prefix of one binding sentence of the entry as it stands in `foundations/decisions.md` (D-19 at 10399-10452, D-349 at 10885-10948). No assertion, test name (other than the one in item 2), or other comment word was changed.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| Foundation check, before the change | `python -B .the-way/elements/common/foundation_check.py` | 1 | 6 errors in the two files: `scene-picture.test.mjs:232`, `world-area.test.mjs:499`, `:961`, `:984`, `:1079`, `:1237`; the handoff's 41 errors are the whole tree, of which these six are this slice's |
| Foundation check, after the change | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Focused test | `npm test -- tests/view/world-area.test.mjs` | 0 | 24 pass, 0 fail |
| Focused test | `npm test -- tests/view/scene-picture.test.mjs` | 0 | 75 pass, 0 fail |

The full gate (`npm test` with no argument) was not run, as the handoff says. The one-command check of the whole repository is not part of this slice.

Output captures (not working copies) are in `.runs/slice-5/`: `check.txt`, `check-after.txt`, `test-world.txt`, `test-scene.txt`. They are plain command output; no worktree or clone was made, so no removal applies.

## Own-work check (section 3 of the method)

- Requirement: each `decision:` line of these two files quotes the opening of a binding sentence of the new D-19 or D-349 that its test holds; no assertion and no other word changes; the test name of the one-size case says what it now holds.
- Check: the foundation check (exit 0, 0 errors) for the quotations, and the two focused test files (exit 0) for the assertions.
- Showed: both pass. The one judgement made is which sentence each test holds; these are listed in item 3 above. Reviewer may wish to read those four choices.
- Mutation in my head: the case asserts `width`, `height` and the absence of a `style` attribute on `.scene`; a wrong constant in the drawing would fail it, a missing `.scene` style would pass only if the attribute check is absent, which it is not. Nothing new added to the code, so no mutation run was needed.

Test-first and the invariant-failure rule: this slice changes comments and a citation only. The failing run is the foundation check before the change (exit 1, six errors in these files); the passing run is the same check after the change (exit 0). No invariant test was changed.

## Working copies

None made. The `.runs/slice-5/` directory holds only the command output files listed above.

## Walkthrough and ui_check

Not read. The change alters no screen and no behaviour a user sees: test comments, one citation and one test name only.

## Unread material

- `.runs/task-cycles/uklad-na-telefon/task.md:32-36` (To do, items 5 to 7): named in the handoff's Read list; not read. Not needed for a comment change, but the Read list names it.
- `guidelines/styleguide-browser-view.md`: named in the Read list. Read lines 1-590 of 1269 only. The rest (lines 591-1269) was not read. The part of it that bears on this slice (token values, design-token rules) is not a rule about test comments.
- `tests/view/world-area.test.mjs` and `tests/view/scene-picture.test.mjs`: not read whole (about 1200 and 1700 lines). I read the decision-citation lines, the one-size case's region (about lines 486-525), and the D-19 test regions around each changed line. The rest was not read.
- `guidelines/testing.md`: read whole after a second read (lines 1-510).
- `guidelines/coding.md`: read whole.
- `src/browser/AGENTS.md`: read whole.
- `foundations/decisions.md`: D-19 (10399-10452) and D-349 (10885-10948) read whole, as the Read list names.
- `.the-way/task-cycle/change/SKILL.md` and `.the-way/task-cycle/change/slice.md`: read whole.
- `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md`: not read; the change alters no screen and no user-seen behaviour, so neither step applies (SKILL section 3).

## Searches not found or unclear

- The one-size case's name and comment in the handoff's Goal: the Goal says the case and its comment should "say instead what they hold"; the Notes say keep test names. I resolved this by changing the name (item 2 above) and flagging it.
- The scene-picture test at line 230 (`the background is the forest picture, a still frame of 336 × 152 pixels`) asserts the background's `width` 336 and `height` 152, while the handoff's Goal says the attributes stay 672 × 304 for the one-size case. Both are consistent: the scene-picture case is about the picture, the world-area case is about the frame's background attribute. I did not change the scene-picture assertions.
- Searched for the phrase "one size" in both test files: found only the one case and its comment, and the citation at scene-picture:232.

## Questions and concerns

1. Test name: is the rename of the one-size case (to "at 672 × 304 px") wanted, or should the old name stay per the Notes' "keep every test name"? My recommendation: keep the rename; the old name says "the one size of D-349", which the new D-349 denies. Cost if wrong: one name to revert, no assertion involved.
2. The one-size case runs at a narrow window of 800 px. Under the new D-396, 800 px is in the phone layout (below 1280 px). The assertions stay at 672 × 304 because jsdom does not apply the phone layout's rule (Slice 15). The comment now says so. A reviewer may want to confirm that Slice 15's `@media` rule is the only source of the smaller size, not a script.
3. The D-19 choice of which sentence each test holds is mine (item 3 above). If the orchestrator reads a test as holding another sentence, the quotation is easy to change; the foundation check verifies only that the quotation is a prefix of a binding sentence.

## Stop reason

None. The slice is committed; I did not push and did not start another slice.
