# Handoff — the return step (stage: return step, step 11 of the cycle)

You take the return step of the task cycle of the task `karty-i-katalog-map` (screen Mapy, card of a map, section „Kto idzie”). You are a fresh agent (`make-change`, class `same`); the code and the foundation entries were made by other agents and reviewed (whole-change review `PASS c2a7853`).

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. Never ask the human; a question you cannot settle comes back as the status `questions`, and a question the foundation step leaves to the human as `blocked`.

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`; base of your range `c2a7853e72ce464fc8b34dbbb4517de729836d0d` (the reviewed and fixed head). The-way is `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole (how a change is made and reported), then `.the-way/task-cycle/skill/return_step.md` whole and `.the-way/task-cycle/skill/foundation_step.md` whole (the return step writes as the foundation step writes). Each entry is written through the project skill of its element (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact`), each read from `.claude/skills/<name>/SKILL.md`.
- Your report: `docs/task-cycles/karty-i-katalog-map/reports/17-return-report.md`. Return only: status, your commits (or none), a one-line check result and the report path. The report holds each check with command and exit code, **Searches not found or unclear** (items or `none`), reaches beyond this handoff, questions and concerns, and — under the same names as the record's *Return step* — these eight lines, each filled or `none`:
  1. Foundation compared with code: the entries the change writes or changes, those the task names and those the search of the foundation found, and the part map of the touched parts, each compared with the code: what no longer matched and its correction, or none.
  2. Decisions written or changed (identifiers).
  3. Invariants written or changed (each with the task, decision or human that sets its rule).
  4. Environment facts.
  5. Glossary terms.
  6. Part-map changes.
  7. Projected entries written whole or in part (identifiers).
  8. Rows of *Settlements to record* written (row number and identifier).
- Commit by path (`git add <path> ...`; never `git add -A` or `git add .`), messages in English in this repository's form, each ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean. Run `python -B .the-way/elements/common/foundation_check.py` after your edits (command and exit code in the report). You change no product code: where the code is wrong against an entry, say so in your report as a concern and change nothing; where an entry is wrong against the code, correct the entry.

## Inputs

- Frozen task, whole: `docs/task-cycles/karty-i-katalog-map/task.md`; plan: `docs/task-cycles/karty-i-katalog-map/plan.md` (*Foundation entries*, *Choices*, *Orchestrator's notes*); the foundation step's report `reports/02-foundation-report.md` and the fix report `reports/15-fix-report.md`; the whole change's range for reading the code: `git diff 2136709..c2a7853` (names and ranges via `git diff --stat`).
- Entries the change wrote or changed: D-325 to D-332 (new), and D-53, D-55, D-133, D-134, D-149, D-165, D-170, D-171, D-180, D-188, D-217, D-243, D-244, D-251, D-274, D-280, D-281, D-282, D-287, D-03. Find the line ranges by heading in `foundations/decisions.md`. Compare each with the code as it stands, not with the plan.
- Known candidates the orchestrator has seen (decide yourself; do not take them as a list to confirm): D-169's *Rationale* („the select lists of the program panel and of the headquarters") and D-265's *Verification* example („a new section of the headquarters built in DOM") speak of a Siedziba that this change moved to React with the pick list at the character in „Kto idzie"; D-189 says the list of maps marks a rehearsal the loop cannot repeat (the mark is on the card of a map, D-251) but its change belongs to task 25 (D-245/D-246 and D-189 are written by task 25 per the task document — leave those to it and say so); `foundations/part_map.md` claims files by globs: check whether the new files fall under them and whether `browser-view`'s and `simulation`'s lines still describe the parts.
- Choices of the plan (`plan.md`, section *Choices*) that bind after the merge (WAY-36): decide, for each, whether it is a choice the foundation should hold as a decision or invariant (a rule for later work) or a row of the questions table only; the task or the plan does not exclude an entry. Examples: the columns of the list and the card on the screen Mapy, the focus after „Puść w pętlę" and „Zatrzymaj", the shared button's kind `main`, the module for the card's numbers (`src/browser/sim/map-card.ts`), the screen built on entering its addresses. Write an entry only where a later agent would otherwise guess; the layout dimensions (widths) are already in the styleguide rule of the screen Mapy; check whether `guidelines/styleguide-browser-view.md` holds them. A glossary term only for a word in a meaning for which WAY-95 gives it an entry (the planner noted „card" now has two meanings, qualified at each use — decide).
- Do not write into the log the definition's file name or its path in the vault; the existing *Origin* lines name it by the convention of the log; for new entries follow whatever the decisions template says about *Origin*.

## Boundary

Stop when the entries are corrected or written and committed (or none were needed), the check ran, the report with its eight lines stands and the worktree is clean. Make no change to product code.
