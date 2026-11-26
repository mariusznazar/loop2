done

# Fix of the findings of the review of the return step (I-1, I-2, I-3)

Worktree `the task's worktree`, branch `task/wyposazenie-postaci`, started at `565edafef9c8daa06a890583d8c0300d2fe06755`.

## Commits

- `83cc3615` — `foundations/decisions.md` (D-146, D-183, D-187, D-461), and the `// decision:` comment lines only of `tests/sim/combat.test.mjs` (1 line), `tests/sim/encounters.test.mjs` (5 lines), `tests/sim/gear-acts.test.mjs` (2 lines). 24 insertions, 16 deletions in all. No assertion, no product code touched. Added by path.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors" (run after the edits and the re-quote, before the commit; the tree did not change after). Output: `reports/fix-return-step-foundation-check.txt`.
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0, "0 error, 0 warn, 121 info".
- `node --test tests/sim/combat.test.mjs tests/sim/encounters.test.mjs tests/sim/gear-acts.test.mjs` — exit 0, 67 pass, 0 fail (the three files whose `decision:` lines I changed).
- Not run: the product's gate (`npm test`), by the boundary.

## Findings

### I-1 (D-461, third sentence) — fixed
New sentence: "Where the slot holds a piece that the map run going on of an earning loop holds, that piece goes into no chest by this choice: the merge at the end of that map run (D-460) settles where it goes." It states what this choice does (no chest at the act, which the two tests hold) and points to D-460 for where the piece goes, so the claim "reaches the chest" is gone and the full-chest loss (D-460) and the death (D-190) stay with those entries. The two `decision:` lines at `tests/sim/gear-acts.test.mjs:259` and `:283` re-quoted to the new sentence; the tests pass unchanged. Check: foundation check exit 0 (it compares each quotation with the binding sentences).
Choice: the reviewer's first way (settle without the claim) over the second (keep the claim with both qualifications). Rejected: the second, because it restates D-460's rule and D-190 inside D-461 and would need the same qualifications kept in two places. Cost if wrong: the sentence changes to the longer form and the two lines are re-quoted again.

### I-2 (D-146) — fixed
The sentence now reads "A character that finds no feasible rule whose action it can carry out in combat gives up its action of that turn; ..." (the glossary's words), the same in the *Verification* clause (`a character with no feasible rule whose action it can carry out in combat giving up its action of the turn`). Six `decision:` lines re-quoted: 1 in `tests/sim/combat.test.mjs` (line 90) and 5 in `tests/sim/encounters.test.mjs` (lines 106, 209, 320, 623, 814); the search of `tests/`, `foundations/`, `guidelines/`, `src/` for the old phrase "no feasible combat rule" finds only a test title (`combat.test.mjs:87`), which is no quotation and was left. Check: the three test files pass; foundation check exit 0.
Choice: as the orchestrator gave it; no evidence it is wrong. Cost if wrong: another re-quote of the six lines.

### I-3 (D-187, D-183) — fixed
D-187 *Verification* gets its pair back for "the gear counted toward a cap above 0": complies "a character with a stick in its main hand entering a map whose entry cap is 4 with four pieces of its trip plan, the stick staying in the hand"; violates "an entry cap or an exit cap that counts the pieces of the gear toward its number". D-183's pair is widened to "a piece the map run put from the gear into the backpack, and for the gear counted toward an exit cap above 0", with a second complies ("a character with a stick in its main hand completing a map whose exit cap is 4 with four pieces of its bring list in the backpack, the stick staying in the hand") and a second violates ("an exit cap that counts the pieces of the gear toward its number"). The `tests:` clauses already say the caps held are 0. No test added, as the orchestrator chose. Check: foundation check exit 0.
Choice: the reviewer's pair, with the example numbers (4 and 4) taken from the reviewer's wording, not from a map's data; they are examples of a hypothetical map, not a claim about a current map. Cost if wrong: the pair is replaced by a test with a cap above 0 and gear, in a later change.

## Reach beyond the handoff

- `guidelines`-style rules of the user's vault (`scripts.md`, `git.md`) read as the user's global instructions require; no foundation or product file beyond the handoff's list read except D-146, D-183, D-187, D-460, D-461 (each entry read whole) and a search of the tests for the `decision:` lines of D-146 and D-461.

## Unread material

- `fix.md` and the skills were read whole. `.the-way/task-cycle/skill/foundation_step.md` and the skill of the decisions element (`elements/decisions/skill/SKILL.md`): not read; the change edits sentences of existing entries and Verification pairs, and `template.md` (read whole) gives their form; the foundation check passes.
- `reports/review-return-step-report.md`, `cycle.md`: not read, as the handoff says.

## Searches not found or unclear

- none

## Own-work check

- Requirement my work most likely does not meet: a re-quoted `decision:` line must quote its sentence word for word, and no old quotation of the changed sentences may stay (a stale one would be an error and a test would hold a sentence that no longer stands).
- Check: counted the occurrences replaced by the script (1 + 5 + 2, as the review's six for D-146 and two for D-461), searched the repository for the old D-146 phrase (only a test title), ran the foundation check (it compares every quotation) and the three test files.
- It showed: exit 0, "0 errors", 67 of 67 pass.

## Working copies

`.runs/fix-return-step/` held `requote.py` and the outputs of the checks; the foundation check output was kept as `reports/fix-return-step-foundation-check.txt`; the directory is removed by its full path (see below). No worktree or clone made.

Removal: the directory .runs/fix-return-step was deleted by its full path and no longer exists; no remainder.
