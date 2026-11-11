# Handoff — correction after the human's remarks on the open request (task "Zbieranie jako widowisko")

You are the one author, resumed for a **correction for the human's remarks** (variant of
`make-change`: "a correction for the human's remarks"; method `.the-way/task-cycle/change/SKILL.md`
and, for how a correction runs, `.the-way/task-cycle/skill/correction.md`). The request is
https://github.com/mariusznazar/loop2/pull/77, opened ready for review; the human read its
description and answered it. Work in `the worktree's root`, branch
`task/zbieranie-jako-widowisko`, head `761ff8b189f3aa9876b8d4f115921191893058a8` (the record's
copy and its removal are the two last commits, tree equal to `1b0990ac` plus nothing else; the code
you wrote is unchanged since `8531d93d`, the entries since `d457d238`; the merge `1b0990ac` renumbered
your decisions: what you knew as D-362 to D-365 is now **D-363 to D-366**, main's D-362 is another
decision). Commit by path, English messages. Do not run the full gate (`npm test` without an
argument): the orchestrator runs it on the corrected tree.

## The human's answer (binds; it is not a finding to weigh)

The human answered the request's items on 2026-11-11 with: "ten punkt 4 bym zaopiekował w formie
rekomendowanej, resztę odpuszczamy" — item 4 is done in the form recommended there, and the rest of
the items of *Fix or let through* (1, 2, 3 and 5) are let through. Item 4 read, word for word:

> Seven findings were left unfixed, and most are wording in the foundation that a later agent will
> meet when it builds the other effects of the scene (the wolf, the scuffle) on the same entries: one
> entry says "any other reading shows none" where the scene in fact starts no new effect but lets a
> running one finish and stay frozen at a stop; it says the effect lands "where the mage stood" where
> it lands where the mage stands or walks to; another entry states the mage's walking directions as
> fixed where they depend on where it comes from; a field of an entry says "none considered" where
> nobody weighed another way; the changed text has no Polish meaning sentence; and the reviewer of
> the fix noted that the figure's middle (32) stands twice in the code and its test. One more is
> contested: a gathering end that is old and stands among other ends in one reading is not
> recognised as overdue, because neither the task nor the foundation says how old an end must be.
> Ways: fix the wording and the polish in this request, … I recommend fixing the wording in this
> request (together with item 1) and letting the contested one through.

"The recommended form" is: **fix the wording and the polish; let the contested one through.** The
"together with item 1" part does not apply: item 1 (the dust of a fibre miss hidden behind the mage)
was let through, so make **no change to the drawing of the dust or to its place**. Likewise make no
change for items 2 (the dust colours and the frames), 3 (real-browser checks) and 5 (a further
review reading); and leave the contested finding (no minute threshold for an "old" end) as it is.

## The remarks you fix (the five wording findings and the polish; reviewer's words, cut from the reports)

From `reports/review-return-report.md`, section "Minor findings inside the task" (read it whole, it
holds the evidence; the numbers of the decisions in it are the old D-362/D-365 and are D-363/D-366 now):

1. D-366 (was D-365) *Rejected:* `none considered`. "The decisions template says `none considered`
   records that the human weighed no other way; `unknown` records that nobody knows. D-365 is the
   cycle's own entry, with no row and no human statement, so the field claims something nobody said.
   `unknown` is the accurate value."
2. D-366 binding sentence, "Any other reading shows none". "Read literally this contradicts the code:
   `scene.tsx` keeps a running effect through later readings … and leaves it frozen at a stop … What
   the code does is that any other reading *starts* no effect. … Suggested wording: 'Any other reading
   starts none'." (Check the same sentence's tail, "so that an effect overdue when its turn comes … is
   dropped", still reads true, and the Verification examples.)
3. D-366 binding sentence, "places the effect at the mage as it stood at the previous reading". "The
   code passes `current.x` …, which is `Shown.x`, documented as 'where it stands or walks to'. At 16x
   a gathering (625 ms) can end while the 640 ms walk is still running, and the effect then lands at
   the walk's destination, not where the mage is drawn. … the entry says 'as it stood'." Make the
   wording say what the code does (the place the mage stands or walks to at the previous reading), in
   the entry and wherever it is repeated (its Verification examples, the styleguide section, code
   comments).
4. D-363 (was D-362) *Rationale* (the added sentence): "The mage reaches the sticks and the moss walking
   left and the bush walking right". "The statement holds only for the usual walk from the clearing. The
   conclusion (the prop's side from the data, not the walk's direction) holds even more strongly, so the
   wording should say 'usually' or drop the directions."
5. Report form: "for the changed D-362 the return step's report gives the added sentence in English and
   a mark, but no one-sentence meaning in Polish." Give, in your report, the one-sentence meaning in
   Polish (and in English) of the changed D-363, in the form the foundation step gives
   (`.the-way/task-cycle/skill/foundation_step.md`, WAY-134), for every entry you change in this
   correction.
6. From `reports/review-fix-report.md` ("New Minor notes in the fix"): "`src/browser/sim/data/scene.ts`:
   the `mageFaces` comment and `tests/view/scene-picture.test.mjs` hold the magic 32 (the figure's
   middle) twice, in the data comment and in a test. A change of the sheet's figure would need both;
   polish." Remove the duplication in the smallest way that keeps `content-identifiers` and the part
   boundaries true (for example one named value in the data file that the test imports, or a test that
   derives the number); change no behaviour.

Do not widen: change only what these six remarks touch. Run the return step's comparison for the
entries you change (`.the-way/task-cycle/skill/return_step.md`): compare D-363 to D-366, D-317 and the
styleguide section "The scene of a map run" with the code once more for the words you touch, and
correct what no longer matches, nothing more. If a remark cannot be done without an open design choice,
return `returned` with no code (WAY-135).

## Checks and report

Run the focused checks your edits need with command and exit code
(`python -B .the-way/elements/common/foundation_check.py`; the scene and scene-picture tests if you touch
code or tests; `npm run typecheck`, prettier and eslint on touched code files; the invariant tests for
touched parts). Write your report to
`docs/task-cycles/zbieranie-jako-widowisko/reports/correction-1-report.md`
with: for each of the six remarks what you changed (or why not), the commits, the Polish and English
meaning sentences (remark 5), each check with command and exit code, your own-work check,
**Unread material** and **Searches not found or unclear**. Return only: status, commits, a one-line check
result, the report path.
