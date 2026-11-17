# Findings of the review of the return step - to fix (one fix round)

Reviewer's report: `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/review-return-report.md` (first line `FAIL 949f14dbd7e6ba66e98311b6b286cd9ca082875d`). Below is the blocking finding in the reviewer's words. The Minor finding of this review (the length of a line in D-271) is not fixed.

### Important (blocking, within the task)

**1. D-271 *Rationale* still says the pack's terms ask for no credit, without the saxophone qualification.**
Place: `foundations/decisions.md:4931-4932` — "The pack's terms ask for no credit and allow its arts to be altered, so a picture made from them may be dimmed, composed and cut down by hand."
What is wrong: the return step exists to bring the places that restate `pixel-crawler-terms` into line with the fact, which now reads "ask for no credit except where the project has a saxophone solo" (`foundations/environment_facts.md:656`; the source quotes point 5, "If at any point in your project, there is a saxophone solo, the name of the author must be credited"). The step corrected the clause at `decisions.md:4950-4951` of the same decision's *Rationale*, but left this sentence, 19 lines above, which states the terms without the exception — "without a qualification", the case WAY-263 (review-change section 3) grades Important for an entry the change writes or changes. The report's claim at "What no longer matched" (item 1) that the three sentences resting on the fact were all the ones is therefore not true: its own search missed this sentence (the report lists no search for it).
Why it matters: D-271 now says two different things about the same terms within one *Rationale*; a reader of line 4931 reads the pack as asking for no credit in every case, which is what the fact was changed to deny. This is the same defect the return step was made to remove.
Evidence: `Grep` for `pack's terms` over the worktree outside `.runs`/`.the-way` returns `foundations/decisions.md:4931` besides the fact itself; the sentence carries no qualification. The sentence does not change what D-271 binds, so the correction is a clause in the *Rationale* only (for instance "ask for no credit of a game with no saxophone solo").
Not a conflict with the test: `SPRITE_PACKS["Pixel Crawler"].asksForCredit` stays `false`, true for this game.
