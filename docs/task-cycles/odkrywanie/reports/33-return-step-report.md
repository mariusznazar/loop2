# Report — return step, task cycle odkrywanie

- **Status:** done with concerns
- **Commit:** `db795b9` docs: :memo: record the return step of the discovery task (on `task/odkrywanie`, over `bdef6f8`)
- **Files:** `foundations/decisions.md` +60 −5 · `foundations/invariants.md` +7 −6 (`git diff --stat bdef6f8..db795b9`: 67 insertions, 11 deletions). No product code and no test changed.

Method: `the-way-make-change` (pinned `.the-way` 574a37b; gitlink and checkout agree), step 11 and the foundation-step paragraph of `.the-way/task-cycle/skill/SKILL.md`, and `elements/common/way_of_working.md`, `elements/common/rules.md`, the skill, template and examples of decisions, invariants and glossary, the skills of environment facts and the part map, read whole. Entries written through the decisions and invariants elements' steps.

## Foundation compared with the code

What no longer matched, and its correction:

| Entry | What did not match | Correction |
|---|---|---|
| `program-rule-pick` | The code (`programInRepertoire`, `src/browser/sim/understanding.ts:105-118`) passes over a rule group whose condition, or that condition's resource or item, lies outside the repertoire, even where the condition holds; the sentence passed over only a group whose condition does not hold. The sentence also named the target of the action alone, while `conditionInRepertoire` (`understanding.ts:59-72`) checks the target of the condition too. | Sentence rewritten (below); *Derives from* gains D-127. |
| D-126 | "whose condition, action or action's target" left out the target of a condition, which the code checks and the row O8 („cel”) names without restriction. | "whose condition, action or the target of either". |
| D-71 (binding sentence and *Rationale*), D-121 (*Rationale*) | The bare word "step", the last word of the-way's terms "return step" and "foundation step", which the product's foundation writes only with a qualifier (WAY-104). | "where that order brings it", "where what brings it lands", "what the tutorial needs next"; meaning unchanged. |

Compared and matching, with no change: D-118, D-119, D-120, D-121 (chain, `src/browser/sim/data/actions.ts`, `conditions.ts`, `items.ts`, `campfire.ts`), D-122, D-123, D-124, D-125, D-71's order with the pick split (`run.ts` `minuteBeforePick`/`pickActivity`), `player-map-run-pace` and `minute-span-split` (`game.ts` `passRealTime`/`advanceMinutes`), `program-closed-lists`, `content-identifiers`, `simulation-inputs`, `simulation-isolation`, `action-in-progress`, `program-world-reference`, `mutation-test-selection`, D-04, D-18, D-20, D-21, D-23 (narrowed by D-126 and now D-127), D-25, D-39 (`styles.css` `.discovery-text` reads `var(--discovery)`), D-44, D-60 (chill read from `BALANCE.body.chilledBelow`), D-62, D-63, D-82, D-90, D-91; glossary `character skill`, `program rule`, `map run`, `rule group`, `predisposition`, `archetype`, `Understanding`, `repertoire`. Notes on three of them:

- D-124 says "while the Understanding holds no action"; the code disables „Dodaj regułę” while the editor's repertoire holds none (`program-editor.ts`, `editorRepertoire`). With the one archetype, whose predispositions are all five skills, the two are the same set in every state, so the entry matches today; rewording it to "repertoire" would give row O6 („Do odkrycia pierwszej akcji”) another meaning for a future archetype, which the writer may not do. Left as is (it is the review's M-1, a review finding, not an entry).
- D-121 "the first finished „Zapal”": the code reveals at a lighting that used its sticks (`understanding.ts:193-200`). `finishUse` (`run.ts:205-230`) leaves a lighting without effect only where what it needs is gone, which nothing in one character's map run removes during the five minutes, and the minute of death is excluded by D-71. Matches in play.
- Part map: every new file (`src/browser/sim/data/skills.ts`, `revelations.ts`, `src/browser/sim/understanding.ts`, `tests/sim/understanding-fixture.mjs`, `repertoire.test.mjs`, `discovery.test.mjs`) lies under `src/browser/sim/**` or `tests/sim/**` of `simulation`; `browser-view` imports `editorRepertoire` from the simulation, which its *Depends on* allows; the responsibilities of `simulation`, `browser-view` and `product-foundation` still hold. No change.

## Entries written or changed

| Entry | Kind | Znaczenie (pl) |
|---|---|---|
| D-127 (new) — What does the simulation do with a rule group whose condition lies outside the character's repertoire? | decision; `derives from D-119 · narrows D-23`; Verification `program-rule-pick` | Symulacja pomija grupę reguł, której warunek albo jego cel leży poza repertuarem postaci, razem ze wszystkimi jej regułami, tak jak grupę, której warunek nie zachodzi, a grupa zostaje w programie. |
| D-128 (new) — Where does what reveals an action, an item or a condition stand? | decision; `derives from D-18 · derives from D-118` | To, co odsłania każdą akcję, przedmiot i warunek, stoi w plikach danych przy tej akcji, przedmiocie albo warunku jako jeden z rodzajów zdarzeń odsłaniających, które obsługuje symulacja; nowe odsłonięcie rodzaju już obsługiwanego dodaje się samą zmianą danych. |
| D-126 (changed) | decision, binding sentence | Symulacja przechodzi nad regułą, której warunek, akcja albo cel któregokolwiek z nich leży poza repertuarem postaci, do następnej reguły, a reguła zostaje w programie. |
| `program-rule-pick` (changed) | invariant, sentence and *Derives from* (D-23 · D-126 · D-127) | Postać zaczyna pierwszą regułę, której warunek i akcja wraz z celami leżą w jej repertuarze, warunek zachodzi i akcję da się wykonać, pomijając grupy, których warunek albo jego cel leży poza repertuarem albo nie zachodzi, a każda pominięta reguła i grupa zostaje w programie. |
| D-71 (wording) | decision, binding sentence and *Rationale* | Bez zmiany znaczenia: odkrycie zapada tam, gdzie kolejność minuty je przynosi. |
| D-121 (wording) | decision, *Rationale* | Bez zmiany znaczenia. |

`program-rule-pick` on `{fork-point}` (`d9a2374`): "In each free game minute of a map run, the character starts to carry out the first program rule whose condition holds and whose action the character can carry out then, taking rule groups in order and the program rules within each in order, passing over a group whose condition does not hold or which holds no such program rule, and carries out no program rule where no group offers one." Now: "… the first program rule whose condition and action, with the target of each, lie in the character's repertoire, whose condition holds and whose action the character can carry out then, taking rule groups in order and the program rules within each in order, passing over a group whose condition or its target lies outside the character's repertoire, whose condition does not hold or which holds no such program rule, carries out no program rule where no group offers one, and leaves every program rule and group it passes over in the program." The test citing it, `tests/invariants/test_program_rule_pick.py`, checked against the new wording: it checks the rule's action outside the repertoire (with its control), the order, groups not holding, empty and infeasible, and waiting; it does not check the condition or its target outside the repertoire, nor the group outside the repertoire. Those clauses are checked one level down in `tests/sim/repertoire.test.mjs:445`, `:461` and `:503` (the last with its control, FULL starting rule 1), which cite no invariant. See Concerns.

What follows from each (step 4.4): D-126's changed sentence — `program-rule-pick` names it, rewritten; no decision derives from or narrows D-126. D-71's wording — `minute-span-split` and D-72's order read the same meaning; nothing else to rewrite. D-127 and D-128 name no invariant the file lacks. Search of the whole foundation for D-127 and D-128: no decision already answered either question (D-18 lists content, not what reveals it, as row O9's column says; D-23 takes a group "only while its condition holds", which D-127 narrows); no collision with `program-closed-lists` (kinds the data does not list, a different area).

Not written, and why:

- Environment facts: none. The change rests on no source outside the product beyond those the facts file already holds (`stryker-simulation-execution` for the added test file); the loop repository is the task's material, not a source the code rests on.
- Glossary: none. "reveal" now carries two ordinary senses — a tile revealed by exploring (D-25, `exploring-reveal`) and a thing revealed into the Understanding (D-118, D-128, `revealedBy` in data) — each the sense a reader of games gives it, so it takes no entry (glossary template, "Which words take an entry"). "item" in the Understanding holds the campfire (`types.ts` `items: (ItemId | CampfireId)[]`), as the task's To do 2 puts „ognisko” among what enters with items; the definition of `Understanding` holds. "discovery" is the ordinary word and D-39's role name.
- Invariants: none new; no rule the task, a decision or the human sets lacks one.

## Projected entries and rows of *Settlements to record*

Projected entries (written by `dcd529d`, checked here against the code): D-118 whole; D-120 whole; D-119 the part this task makes true; glossary `predisposition`, `archetype`, `repertoire` whole, `Understanding` the part this task makes true. All match the code; none changed here.

| Row | Identifier |
|---|---|
| O1 | D-123 |
| O2 | D-122 |
| O3 | D-71 (changed in place) |
| O4 | `player-map-run-pace` |
| O5 | `minute-span-split` |
| O6 | D-124 |
| O7 | D-125 |
| O8 | D-126 (and `program-rule-pick`, which follows it) |
| O9 | D-121 (where the chain stands: D-128, from the row's column) |

No row was missed by the foundation step.

## Choices of the cycle that stay rows of the questions table (no entry)

- Q-C1 — the editor uses the repertoire of the archetype of the character in the map run, otherwise of `CREATED_ARCHETYPE` (`editorRepertoire`, `understanding.ts:124-132`). D-119 already binds that the editor offers the character's repertoire by the simulation's computation; which character a single program serves is the question of task 12, and with one archetype nothing differs today.
- Q-C2 — the campfire recorded in the Understanding under `CAMPFIRE.id`, not a backpack item: a how-to-make choice inside D-121 and the `Understanding` definition.
- „Dodaj regułę” disabled by the repertoire rather than the Understanding (plan's Choices; review M-1): see D-124 above.
- A revealing event of an action counts where its effect took hold (plan's Choices): matches D-121 and D-71 in play, as above.
- The editor leaves out „Idź”, „Zbierz”, „Tu leży mniej niż” and „Zapas poniżej” while no target is offered (fix `bdef6f8`): within D-119 (the editor offers from the repertoire).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors" (after the decisions, after the invariant, and before return on `db795b9`).
- `npm test -- tests/invariants/test_program_rule_pick.py` — exit 0, 6 tests OK.
- `npm test -- tests/sim/repertoire.test.mjs` — exit 0, 31 pass, 0 fail.
- Not run: `tests/invariants/test_minute_span_split.py` and the rest of the suite — D-71's change is wording only, and the full suite is the cycle's run (step 10 already ran on `bdef6f8`; this commit changes no code or test).
- Own-work check — the requirement most likely missed: that each corrected entry is now true of the code, not only reworded. Check: drove the rewritten `program-rule-pick` clauses against the tests that exercise them (the two commands above; `repertoire.test.mjs:503` shows a group under „Zapas poniżej” passed over with the condition missing and taken with it known). Result: both pass; the group and condition-target clauses hold in the code.

## Concerns

- **`program-rule-pick`'s own test is narrower than its sentence.** Its group-outside-the-repertoire and condition/target clauses (from D-126's row and now D-127) are checked by `tests/sim/repertoire.test.mjs`, which cites no invariant, not by `tests/invariants/test_program_rule_pick.py`, and no failing run of the invariant test exists for them. The handoff forbids changing tests here. Recommended: the cycle has a case added to `test_program_rule_pick.py` — a first group under `{"kind": "itemBelow", "item": "stick", "value": 5}` whose condition holds, passed over in a game whose Understanding lacks `itemBelow`, with the knowing game as control — seen failing against `programInRepertoire` with the group filter removed for a moment. Without it, a change dropping the group filter fails `repertoire.test.mjs` but no invariant test (the review's M-4 already notes the same narrowness for the condition and target clauses).
- `guidelines/coding-content-data.md` lists no `skills.ts` or `revelations.ts` (nor `items.ts`, `campfire.ts` before this task) among its files of the kind; a guideline, not a foundation entry, so not changed here (slice 1 raised it).

## Reaches beyond the dispatch

- `.the-way/foundations/glossary.md` term list (WAY-104 check for the-way's terms in the changed entries), `.the-way/foundations/decisions.md` WAY-36: the plan test and the two-glossary rule.
- `src/browser/sim/run.ts:170-240` (`finishUse`): whether a finished „Zapal” can take no effect, for D-121.
- `foundations/decisions.md` D-23, D-90, D-91: the group semantics D-127 narrows.

## Fix of the return-step review

- **Status:** done
- **Commit:** `54c995e` test: :white_check_mark: check a condition's target and a rule group outside the repertoire in program-rule-pick (over `db795b9`)
- **Files:** `tests/invariants/test_program_rule_pick.py` +73 −14. `tests/invariants/program_fixture.py` not touched: the driver lives in the test file itself. No product code changed.
- Read for the fix: `reports/36-findings-return.md` whole, `guidelines/testing.md` and `guidelines/coding.md` whole, `tests/invariants/program_fixture.py`.

**I-1 — fixed.** In `test_program_rule_pick.py`:

- The driver's `newGame` step now takes `{"actions": [...], "conditions": [...], "items": [...]}`, removing each from the knowing game's Understanding (until now it removed actions only). It also records the program after each step. `records(...)` returns run and program; `drive(...)` keeps its old result, and the existing action case passes `lacking={"actions": ["explore"]}`.
- New `STOCK = {"kind": "itemBelow", "item": "stick", "value": 5}`.
- `test_a_rule_whose_condition_names_a_target_outside_the_repertoire_is_passed_over`: "STOCK → wander, always → explore". The control (knowing game) starts rule 1, so STOCK holds at minute 0. With the item `stick` lacking, it starts rule 2 (explore), and the program after the send equals the program set.
- `test_a_group_whose_condition_lies_outside_the_repertoire_is_passed_over`: group 1 under STOCK holds "always → wander" (id 11), and group 2 under "always" holds "always → explore" (id 22). The control (knowing game) starts rule 11. With the condition `itemBelow` lacking, it starts rule 22, and the program is unchanged.
- Both cite `invariant: program-rule-pick`. The docstring describes both scenarios and their controls.

The new cases were run against the finding's two mutants of `src/browser/sim/understanding.ts`. After each run the file was restored from a copy, and `git diff --stat` on it was empty:

| Mutant | Command | Exit | Failing case |
|---|---|---|---|
| group filter dropped: `.filter((group) => conditionInRepertoire(repertoire, group.condition))` → `.filter(() => true)` | `npm test -- tests/invariants/test_program_rule_pick.py` | 1 | `test_a_group_whose_condition_lies_outside_the_repertoire_is_passed_over` (8 run, 1 failure) |
| rule condition check dropped: `conditionInRepertoire(repertoire, rule.condition) &&` → `true &&` | `npm test -- tests/invariants/test_program_rule_pick.py` | 1 | `test_a_rule_whose_condition_names_a_target_outside_the_repertoire_is_passed_over` (8 run, 1 failure) |

Each new case catches the mutant of its own clause. The group case does not fail under the rule mutant, because its rules' conditions are "always". The rule case does not fail under the group mutant, because its group is "always". Together the two cases catch both mutants.

**Checks on the restored code:**

- `npm test -- tests/invariants/test_program_rule_pick.py`: exit 0, "Ran 8 tests … OK".
- `npm test -- tests/sim/repertoire.test.mjs`: exit 0, 31 pass, 0 fail.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- Not run: Ruff on the changed Python file. Ruff is not installed on this machine (`python -m ruff` reports "No module named ruff"), which is the base's known failure of `test_ruff_source_rules`. No Docker or container test was run, and neither was the full suite.

**Own-work check.** The requirement most likely missed was that each case fails for the reason it names, not for a broken driver. The check was the two mutant runs above, plus the controls inside each case. Result: each case failed only under its own mutant, and the controls passed in every run.
