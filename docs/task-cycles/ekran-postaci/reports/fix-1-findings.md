# Findings for the fix — review of the whole change, `review-whole-report.md`, head 1e21575d248ef294a45953175c7301ec18d63d57

The review passed (`PASS 1e21575d248ef294a45953175c7301ec18d63d57`) with no blocking finding. Below, in the reviewer's words, are its Minor findings within the task, cut from the report; both are fixed before the request opens.

### Minor findings within the task

1. `src/browser/sim/data/scene.ts:307-336` — the new constant `CHARACTER_FIGURE` with its own doc
   comment was inserted between the doc comment of `CAMP` ("The picture band at the top of Siedziba, in
   the pixels of its picture: …", lines 307-322) and `CAMP` itself (line 334). The comment of `CAMP` now
   stands directly over the comment of `CHARACTER_FIGURE` and documents nothing: `CAMP` has lost its
   description (an editor shows none on hover, and a reader of the file meets the band's description
   above a constant of the screen Postać). Why it matters: the data file of the scene is read through these
   comments, and the band's numbers (`cell`, `gap`, `lift`) are explained only there. Evidence:
   `sed -n 300,345p src/browser/sim/data/scene.ts` at the head — two `/** … */` blocks in a row, then
   `export const CHARACTER_FIGURE`, then `export const CAMP` with no comment. Fix: move `CHARACTER_FIGURE`
   with its comment above the band's comment, or below `CAMP`.

2. `src/browser/character-screen.css:237-241` (`.character-tree-bar`) — the track of the practice bar is
   barely visible on the area's background, the more so at zero practice, the state of most rows of a
   new character and of the pair compared with loop. Measured on the author's screenshot 2
   (`loop2-postac-po-smierci.png`, column x = 1200): the track is 4 px of rgb(39, 39, 42) (`highlight`)
   on rgb(24, 24, 27) (`panel`), a contrast of about 1.19:1. The old Loop's screenshot
   (`loop-postac-31-pazdziernika.png`, x = 1000) has the same 4 px track rgb(39, 39, 42) on the page
   rgb(9, 9, 11), about 1.33:1, so its empty bars read as a column of tracks, while loop2's read as an
   almost empty column beside „0 / 15”. The doubling of the thickness (commit `1e21575d`) already closed
   most of the gap; what remains comes from the blocks the task chose (settlement row 20) and from the
   value of `highlight`, which D-40 accepts as "hardly visible". Consequence for the user: on a new
   character's screen the bars, the element the task names as what makes practice "wielokrotnie
   czytelniej", are hard to see until practice fills them; numbers still carry the value. Graded Minor
   because the fill, once practice exists, is clear (screenshots 3 and 4) and the value of the track is a
   choice of role and token that this task does not settle; it is a point for the human's comparison of
   the screenshots, not a defect of the code.
