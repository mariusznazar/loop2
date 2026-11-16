# Return step again, after correction 1

**Status:** done. **Commits:** none (the comparison found nothing to correct; the tree is at `7095f804` and clean).

## The foundation compared with the code

What no longer matched, and its correction: none.

The correction changed the text of `SKILL.md` (the Flashes section and check 2) and one test. Compared with the final text:
- **D-349**: "the scene is 672 × 304 px on the screen, twice its picture (336 × 152)", the basis of the block of 2 × 2 screenshot pixels, is its binding sentence. The real recording showed the `.scene` rectangle at 672 × 304 CSS px.
- **D-396**: the smallest window the game supports has a page area of 1280 × 720 px; the skill's example of a 1280 × 720 window (frames of 800 × 450, a screenshot of 1280 × 720) uses that smallest window and agrees with it. The skill states no window size as a rule.
- **D-317** and **D-42**: the field of 341 × 256 px, its quarter, 21,824, and "WCAG 2.3.1, kept by D-42" are as before; the real frames changed none of those numbers, only the way the reader gets the scale and the region. **D-271** (the colour of an effect against the ground; the frost 3:1) and **D-415** (the human judges the colour against a prop and the covering from numbers and a picture; no threshold) are as the text states them: the new paragraph gives how to take a sample and adds no threshold.
- The element `.scene` named in the skill is the scene's container in the code (`className="scene"`, read in the first return step); the pixel ratio and the rectangle are read from the page, not stated as a rule.
- **Part map**: no file added or moved; `agent-workflow` still owns `.claude/**`, `.agents/**` and `tests/agent_workflow/**`.
- The search of the first return step (colour of an effect, flash measure, the way an agent checks scene pictures) stands; the changed text names nothing that search had not covered.

**Decisions:** none written or changed in this step (D-415 stands from the foundation step, mark `row 1`). **Invariants:** none. **Glossary terms:** none. **Part-map changes:** none. **Projected entries:** none.

**Environment facts:** none. The correction found, by measurement on a real recording, the size of a frame (800 × 450 for a window of 1280 × 720) and that the screenshot is at the full size; both are a measurement the product's own agent made, with the Playwright CLI 0.1.22, and no decision's *Based on* and no invariant's *Rests on* names it, so by the template ("Which facts are written") no fact is written; the file's withdrawn `playwright-screencast-frames` is the same case. The figure stays in the skill as it did.

## Check

- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors` (run because nothing was committed and the tree is unchanged since `7095f804`).
- The reviewer's two Minor findings of the correction (N1, N2) were not touched, as the handoff says.

## Unread material

none.

## Searches not found or unclear

none.

## Working copies

none made in this step (no `.runs/author/` was needed).
