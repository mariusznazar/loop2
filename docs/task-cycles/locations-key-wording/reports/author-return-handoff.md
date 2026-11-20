# Handoff — the return step (the one author resumed)

Delegation, worktree, branch, base, your directory for working copies (`.runs/author/`) and the rules of the earlier handoff `reports/author-handoff.md` stand. Nothing here is a human's approval.

## Stage and boundary

The return step, step 11 of `implement-task`. Read `.the-way/task-cycle/skill/return_step.md` whole and follow it, with `make-change` (`.the-way/task-cycle/change/SKILL.md`) as the method that gives your own-work check, commits and report.

Compare with the code the entries the change wrote (D-362; invariant `tracked-file-private-names`), the entries the task names (D-362; the invariant) and the part map of the touched parts (`agent-workflow`, `product-foundation`), and correct in the same change whatever no longer matches. The review of the whole change (`PASS 02526a59518c26eb60e5ed91f26a91040b523618`, no findings) is no input you need; it is not given to you.

The task's items for the return step to judge:
- Does the change use a word in a meaning for which the-way's glossary gives an entry, or against its entry? ("entry" means an entry of the foundation per `.the-way/foundations/glossary.md`; "key" has no glossary entry in the-way's or loop2's glossary. Judge by `.the-way/elements/glossary/skill/SKILL.md` and WAY-95 whether "key", used for a name in the locations file, calls for a glossary entry in loop2's `foundations/glossary.md`. Write none unless that rule requires one; where you decide none is needed, say why in the report.)
- Does the change rest on a source outside the product that the foundation does not hold (an environment fact)? The locations file `~/.the-way/locations.json` is the author's own file; judge by `.the-way/elements/environment-facts/skill/SKILL.md` and say what you found.
- Is a choice binding after the merge left unwritten? The task's *Settlements to record* row 1 went to D-362 already; the invariant's change comes from the task's question 2.
- Rows of *Settlements to record* written, by row number and identifier.

Where the return step commits nothing, report it so: "no commit". Where it commits, commit by path, message in English in the form of the repository's recent commits, do not push, and report the range. Run `python -B .the-way/elements/common/foundation_check.py` again from the worktree root if you change any file, with command and exit code. No `npm test`, no `npm ci`.

## Report

Write `.runs/task-cycles/locations-key-wording/reports/author-return-report.md`, in the form `.the-way/task-cycle/record_template.md` gives for *Return step* (its nine bullets: foundation compared with code, decisions written or changed, invariants written or changed, environment facts, glossary terms, part-map changes, projected entries written, rows of *Settlements to record* written, and the place each went), with **Unread material**, **Searches not found or unclear**, the line on working copies, and the own-work check where you commit. If a write of a file whose name begins with `report` is refused, this name begins with the role, so it should not be; if it is, return the report whole as your answer.
