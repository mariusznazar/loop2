# Handoff — review of the return step, task `edytor-programu-modale`

**Delegation.** The person who requested this cycle has delegated intermediate choices to the orchestrator. You review; nothing you return is that person's approval.

**Worktree and range.** Work from the root of `the task's worktree` (branch `task/edytor-programu-modale`; process pin `.the-way` at `b502011f53225451ddf121e2b772a903b87492db`). Review the range `bfc8c7f2816795132f3eb8d6a52224997259c8f1..dc058bbc` (one commit, `dc058bbc`), full diff; you are read-only. The whole change stands at `a566f5d52210085d9c5e94d4878815bd6c1ebc54..dc058bbc`; the earlier code and its fix passed their reviews.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole and follow it, in the variant that reviews a return step's range (the file it names for it when the step comes). Return `PASS <sha>` or `FAIL <sha>`, graded findings and the checks you ran. You review the range against the task and against the entries the return step writes or corrects: D-166 (the Rationale sentence about the panel), D-296 (a new example of what violates it: a tap above or below „▾” of a tall header in the phone layout folding the group), and the two copies of the skill `loop2-play` (`.claude/skills/loop2-play/SKILL.md` and `.agents/skills/loop2-play/SKILL.md`, which must stay identical). Select your own foundation by the parts the range touches (`browser-view` for the decisions; the skill files are agent-workflow); read each changed decision whole with its *Rejected*.

**Inputs.**
- The return step's report: `.runs/task-cycles/edytor-programu-modale/reports/author-return-report.md` (what it compared, what it corrected, what it found still matching, its checks).
- The frozen task: `.runs/task-cycles/edytor-programu-modale/task-frozen.md`.
- The author's own wording note: the D-296 example is the author's wording, not the task's; it records the case of the blocking finding of the earlier review (the reviewer of the whole change found it; the fix made „▾” fill the header's height). Judge whether the example is true to the code at the head and to D-296's sentence.

**Checks.** Run what a finding needs: `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`, a comparison of the two skill copies, and the tests the commit's message and report name. The full gate is not yours.

**Working copies.** Your directory is `.runs/review-return/` under the worktree's `.runs/`; remove what you keep there before you return, by paths written out in full, never through a shell variable, and state it in the report.

**Report.** Write the full report to `.runs/task-cycles/edytor-programu-modale/reports/review-return-report.md`; its first line `PASS <sha>` or `FAIL <sha>`. Carry the findings graded as the method gives (a blocking finding with the mark `Contradiction: yes` or `no`), the checks with command and exit code, how many decisions you read whole, **Unread material**, **Searches not found or unclear**, the working copies line. Return the first line, the path and a one-line check result. `cycle.md` and the rest of the record are not yours to read.
