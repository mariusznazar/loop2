PASS 54c995eeaad025c03da2a640075abfda8dc19bd0

# Review of the fix — return step, task cycle odkrywanie

- **Fix range:** `db795b9867de1b2f5517a58b5267f4007cfea7fd..54c995e` (one commit, `54c995e` test: :white_check_mark: check a condition's target and a rule group outside the repertoire in program-rule-pick). `git rev-parse HEAD` = `54c995eeaad025c03da2a640075abfda8dc19bd0`, the head given.
- **File:** `tests/invariants/test_program_rule_pick.py` (+73 −14). No product code and no foundation entry changed.
- **Method:** `the-way-review-change`, section 4 (review of a fix), pinned `.the-way` `574a37b`.
- **Read:** findings file `.runs/task-cycles/odkrywanie/reports/36-findings-return.md`; the fix report, § "Fix of the return-step review" of `.runs/task-cycles/odkrywanie/reports/33-return-step-report.md`; the fix diff.

Counts: blocking 0, Minor 2, out of scope 0.

## Findings of the findings file

**I-1 — fixed.** The invariant test now checks both clauses the return step added to `program-rule-pick`, and each new case was seen failing against the clause it protects. Evidence:
- `test_a_rule_whose_condition_names_a_target_outside_the_repertoire_is_passed_over` checks the condition's target. The program is "STOCK → wander, always → explore", where STOCK is `itemBelow stick 5`. The control, a game that knows everything, starts rule 1. With the item `stick` taken out of the Understanding, the game starts rule 2, and the program after the send is the program that was set.
- `test_a_group_whose_condition_lies_outside_the_repertoire_is_passed_over` checks the group clause. Group 1 stands under STOCK and group 2 under "always". The control starts rule 11, the rule of group 1. With the condition kind `itemBelow` taken out, the game starts rule 22, and the program is unchanged, so "leaves every … group it passes over in the program" is checked too.
- Both cases cite `invariant: program-rule-pick`. The docstring describes both scenarios and their controls.
- The driver's `newGame` step now takes lists of actions, conditions and items to leave out. The existing action case passes `{"actions": ["explore"]}` and keeps its meaning. The rebuilt Understanding holds exactly `actions`, `conditions` and `items`, which is the whole of the `Understanding` type (`src/browser/sim/understanding.ts:28`), so dropping the earlier spread of the Understanding loses no field.
- The mutant runs are mine, in a scratch worktree of `54c995e` that I removed afterwards (see Checks): the invariant test fails under each of the finding's two mutants, and under a third that ignores the item named by „Zapas poniżej”. On the unchanged code it passes.

Nothing in the fix diff breaks anything else: the five earlier cases still pass, and `drive` returns what it returned before.

## Minor (do not reopen the review)

- **M-1 — the group case checks only the condition's kind, not its target.** No case passes over a group whose condition kind is known but whose item (`stick`) is unknown. This clause of the invariant ("a group whose condition or its target lies outside …") is covered today only because groups and rules share `conditionInRepertoire`, and the rule case covers the target. A later change that checks a group's condition by kind alone would still pass the invariant test. This is beyond the fix the findings file recommended; broader coverage would be nice to have.
- **M-2 — a line over 100 characters.** `tests/invariants/test_program_rule_pick.py:308` is 101 characters ("control: with the stick known, …"). `ruff.toml` selects no line-length rule, and the file already had one such line before the fix (line 217 on `db795b9`). Polish only.

## Declined to judge

None.

## Checks

- `git rev-parse HEAD` in the reviewed worktree: `54c995eeaad025c03da2a640075abfda8dc19bd0`, which matches the head given.
- `python -B .the-way/elements/common/foundation_check.py` on `54c995e`: exit 0, "0 errors".
- I made a scratch worktree of `54c995e` with `git worktree add --detach` and linked `node_modules` by a junction; both were removed afterwards, and the reviewed worktree, its index and its branch were not touched. In it I ran `npm test -- tests/invariants/test_program_rule_pick.py` four times, restoring `src/browser/sim/understanding.ts` with `git checkout` after each mutant:
  - unchanged code: exit 0, "Ran 8 tests … OK".
  - group filter dropped (`.filter((group) => conditionInRepertoire(repertoire, group.condition))` → `.filter(() => true)`): exit 1, FAIL `test_a_group_whose_condition_lies_outside_the_repertoire_is_passed_over`.
  - rule condition check dropped (`conditionInRepertoire(repertoire, rule.condition) &&` → `true &&`): exit 1, FAIL `test_a_rule_whose_condition_names_a_target_outside_the_repertoire_is_passed_over`.
  - target of „Zapas poniżej” ignored (`return repertoire.items.includes(condition.item);` → `return true;`): exit 1, FAIL `test_a_rule_whose_condition_names_a_target_outside_the_repertoire_is_passed_over`.
- Not run: Ruff on the changed file. `python -m ruff` reports "No module named ruff" on this machine (the base's known failure of `test_ruff_source_rules`). Instead I compared the diff by hand with `ruff.toml`'s selected rules and found nothing they would flag.
- Not run: the full suite, which is the cycle's own run, and any Docker or container test, as the dispatch requires.

## Reaches beyond the dispatch

- `ruff.toml` (whole): whether a line-length rule applies, for M-2.
- `src/browser/sim/understanding.ts:28`: the fields of the Understanding the driver rebuilds.
