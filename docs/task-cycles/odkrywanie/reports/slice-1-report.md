# Slice 1 report

**Status:** done with concerns

**Commit:** `4ddad16` on branch task/odkrywanie ("feat: add character skills, predispositions and the chain of revelations to game data").

## Files
- src/browser/sim/data/skills.ts (new): SKILLS (5 skills, each lists ActionIds it grows), SkillId.
- src/browser/sim/data/revelations.ts (new): `Revelation` type: chilled | explored | tileHolds(item) | gathered(item) | campfireCrafted | lit.
- archetypes.ts: `predispositions: SkillId[]`; elemental mage has all five.
- actions.ts: `revealedBy` on every action, `ActionId` exported. conditions.ts: optional `revealedBy`, none on "always". items.ts: `revealedBy` = tileHolds(own id). campfire.ts: `id: "campfire"`, `revealedBy` = gathered stick; ITEMS/Backpack unchanged.
- tests/sim/data.test.mjs: existing deepEquals updated for new fields; 5 new tests (skills, predispositions, rows of the table, one-row coverage with "Zawsze" in none, campfire). Comments cite odkrywanie_loop2.md lines (21-26, 28, 29, 80, 17-26).
- Formatted with prettier.

## Checks
All run in the worktree on head 4ddad16 (the first full run was on the same tree before the commit).
- `npm test -- tests/sim/data.test.mjs`: exit 0, 26/26 pass. Mutation check (one action's revealedBy changed): 2 tests failed; restored.
- `npm test`, rerun on 4ddad16 for this repair: exit 1. It stopped at the node stage: 435 of 437 pass; the 2 failures are one test in `tests/account-storage.test.mjs:357` ("database expiry replaces older JSON expiry", `5001 !== 5000`), a timing difference outside this slice. Run alone, `node --test tests/account-storage.test.mjs`: exit 0, 21/21 pass. So the python stages did not run in this rerun (unchecked in it).
- `npm test`, first full run on the same tree before the commit (its exit code was not captured): node stage 437/437 pass; python stages ran: agent_workflow 5 OK, deploy 66 OK, invariants failed only `test_loop2_one_serving_process` setUpClass, quality failed only `test_ruff_source_rules` and `test_shellcheck_source_rules` (ruff and shellcheck not installed). That is the base's three failures, nothing else.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors" (run on 4ddad16).
- Failing-first run of the new tests not recorded: code was written before the tests; replaced by the mutation check above.

## Own-work check
Requirement most likely missed: every action/condition in exactly one row and nothing outside the table. Test "every action and condition stands in exactly one row" compares the table's union to Object.keys(ACTIONS)/CONDITIONS; passes.

## Reaches beyond the handoff
None (read guidelines/coding-content-data.md, testing.md, task.md line numbers for citations).

## Choices
- Skill ids (exploration, smallItemGathering, campfireCrafting, eating, flameSpell) and Revelation kind names are my naming; tasks 8/9 add kinds by extending the union. "Zbierz"/"Zjedz"/"Zapal" targets are covered because skills list the ACTIONS entries (one per target).
- CAMPFIRE.id typed `string` in CampfireDef (value "campfire"); the Understanding can type it later.
- coding-content-data.md file table does not list skills.ts / revelations.ts (guideline file, outside Change); concern for the orchestrator.

## Foundation
No entry found out of line with the code.
