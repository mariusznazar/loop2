PASS 8877c742a75a3853be0ce7d5bc337858ab1f6273

# Review of correction 1 of wyglad-ekranu-wiedzy (a correction for the human's remarks)

- Range: `265d41cf..8877c742a75a3853be0ce7d5bc337858ab1f6273`, one commit (`8877c742`, parent `265d41cfbaf9589ffd854a542afbdf0993cb8b93`), one file, `foundations/decisions.md`, +2 −1.
- `git rev-parse HEAD` in the worktree `the worktree of the task` = `8877c742a75a3853be0ce7d5bc337858ab1f6273`, the head given. `git status --short` empty.
- Method: `.the-way/task-cycle/review/SKILL.md` and `.the-way/task-cycle/review/fix.md`, both read whole.

## Blocking findings

none

## Minor findings

1. **Minor** — `foundations/decisions.md:4600`. The head of the rejected way still reads "the skill trees shown on two screens, as in loop", while D-416 has the screen Wiedza show "the skill trees to read". Taken alone, that head phrase rejects something D-416 does. The new clause after it ("with their level, practice, points and buying, which is what this rejects, not the layout of the row of a tree that the two screens share (D-416)") settles what is rejected, so no reader who reads the whole clause gets it wrong. A shorter head such as "the same rows of skills on two screens, as in loop", the wording of D-416's *Rejected*, would avoid the clash. The remark asked only for an added sentence, so this is polish and blocks nothing.

## Remarks of the human

- **Item 2 (fix in this request) — made.** The remark asks for a sentence in the old decision's list of rejected ways saying that it rejects the rows with level, points and buying on two screens, not the shared layout of the row of a tree, the same way the decision about the screen Wiedza closes it. D-280's *Rejected* (`foundations/decisions.md:4600-4602`) now reads: "the skill trees shown on two screens, as in loop — the same rows on Postać and in Wiedza with their level, practice, points and buying, which is what this rejects, not the layout of the row of a tree that the two screens share (D-416)". This matches the remark. The added "practice" goes beyond the remark's words, but it is true to D-416's *Rejected* (`foundations/decisions.md:4874`: "the rows of Postać repeated in Wiedza with their level, practice, points and buying, which is what this rejects, not the layout of the row of a tree that the two screens share"), which the remark names as the model. The cross-reference "(D-416)" points to the right entry.
- **Item 1** — let through by the human; not the correction's.
- **Item 3** — let through by the human; not the correction's.
- **Item 4** — done by the orchestrator (removal of the merged task's directory); not part of this range, not judged.
- **Items 5–7** — accepted by the human; not the correction's.

## Review of the diff (section 2)

- **Contradiction with a binding sentence of D-280.** D-280's binding text (`foundations/decisions.md:4540-4554`) lists the screens, the bar, the card's link and the owner's link. It says nothing about rows of skills, so the clause contradicts none of it. The diff touches only the *Rejected* paragraph. Its *Verification*, *Rationale*, every other rejected way, *Scope*, *Based on* and *Relations* are byte-for-byte unchanged in the diff.
- **Truth to D-416.** D-416's binding text has the right area show the rows of the trees "as the row of a tree on the screen Postać", with "no levels and no buying". Its *Verification* says "no level, no practice, no points, no „Kup”". Its *Rationale* says "Buying stands on Postać, so the same rows do not stand on two screens". So the shared layout is what D-416 requires, and the rows with level, practice, points and buying are what it rejects. The new clause in D-280 says exactly that. D-416 "derives from D-280" (`:4846`), and D-280 now names D-416 in its *Rejected*; that is a reference, not a new relation, so *Relations* of D-280 needed no change.
- **The frozen task's "D-280 without change".** The human's remark overrides it for this one clause, as the handoff says. Nothing else in D-280 changed.
- **Tests and other copies of the sentence.** A search of the worktree outside `.runs/` for "same rows on Postać", "same rows of skills" and "layout of the row of a tree" finds only `foundations/decisions.md:4600` and `:4874` and an unrelated comment in `src/browser/character-screen.css:343`. A search for "(trees|rows) … two screens" finds only `foundations/decisions.md:4600`, `:4873` and `:4874`. So no test, styleguide or other file quotes the changed clause; the author's claim on tests holds. The first search's hit on `:4600` is the positive control.
- **Commit.** One commit with the message "docs: :memo: D-280's Rejected says … (D-280, D-416)", which describes the diff accurately.

## Declined to judge

none

## Checks

- `git rev-parse HEAD` — exit 0, `8877c742a75a3853be0ce7d5bc337858ab1f6273`.
- `git log --format='%H %P %s' 265d41cf..8877c742…` and `git diff --stat` / `git diff 265d41cf..8877c742…` — exit 0; one commit, one file, +2 −1.
- `git status --short` — exit 0, empty.
- `python -B .the-way/elements/common/foundation_check.py` (from the worktree root) — exit 0, "0 errors".
- Not run: the full gate (`npm test`), as the handoff gives.

## Reaches beyond the dispatch

none. I read D-280 (`foundations/decisions.md:4538-4614`) and D-416 (`:4836-4874`) whole, as the handoff names. I opened no other entry except to see where D-416 ends.

## Working copies

None made; `.runs/review-correction-1/` was not created. No shell, server or browser left running.

## Unread material

none. The handoff, `SKILL.md`, `fix.md`, the remarks, the author's report, D-280 and D-416 were read whole. `task_frozen.md` was not read: the handoff quotes the one passage it needs ("D-280 stays without change"), and the human's remark overrides that passage for this clause.

## Searches not found or unclear

none
