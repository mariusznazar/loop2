FAIL db795b9867de1b2f5517a58b5267f4007cfea7fd

# Review — return step, task cycle odkrywanie

- **Range:** `bdef6f8058037c9ca153e8b37b4f1c85f162b472..db795b9` (one commit, `db795b9` docs: :memo: record the return step of the discovery task). `git rev-parse HEAD` = `db795b9867de1b2f5517a58b5267f4007cfea7fd`, the head given.
- **Files:** `foundations/decisions.md` (+60 −5), `foundations/invariants.md` (+7 −6). No code and no test changed.
- **Method:** `the-way-review-change` from the pinned `.the-way` (gitlink and checkout both `574a37b9ab9572f876298f4cc10754581222d3f0`), `task-cycle/review/SKILL.md` read whole; step 11 of `.the-way/task-cycle/skill/SKILL.md` read whole.
- **Reviewed against:** the frozen task `.runs/task-cycles/odkrywanie/task.md` (read whole), the entries the range writes or corrects (D-127, D-128 new; D-126, D-71, D-121, invariant `program-rule-pick` changed), and the code of the change (`git diff d9a2374..bdef6f8`, read where the entries point).

Counts: blocking 1 (Important), Minor 1, out of scope 2 (Declined to judge).

## What holds

- **D-127** matches the code: `programInRepertoire` (`src/browser/sim/understanding.ts:105-118`) drops every group whose condition fails `conditionInRepertoire` (`understanding.ts:59-72`, which checks the condition's kind and, for `hereBelow`/`itemBelow`, its resource or item) and keeps the group in `state.program`; `tests/sim/repertoire.test.mjs:503` shows it with its control. It is the cycle's own choice in `plan.md` § Choices ("A group whose condition lies outside the repertoire is passed over as a group whose condition does not hold"), binds after the merge (WAY-36), and *Rationale*/*Rejected* carry the plan's rejected ways. `narrows D-23` is right: D-23 takes a group "only while its condition holds", and D-127 adds a narrower reason to pass one over. Its complying example (a group under „Zapas poniżej” before the first finished exploration) holds: `itemBelow` enters the Understanding only with `{ kind: "explored" }` (`src/browser/sim/data/conditions.ts:54`).
- **D-128** matches the code: every action (`src/browser/sim/data/actions.ts:25-79`), item (`items.ts:34-49`), the campfire (`campfire.ts:31`) and every condition but „Zawsze” (`conditions.ts:24`, no `revealedBy`) carries its `revealedBy` beside its entry; the kinds stand in `revelations.ts`; `understanding.ts` `newlyRevealed` reads the catalogues and names no action, item or condition (`happened` maps finished action kinds to event kinds, which is the "kind the simulation handles"). It is the plan's choice (Q-C3, "The type of a revealing event stands in the new data file `revelations.ts` …"). Its violating examples are code no file of the change holds.
- **D-126** widened from "action's target" to "the target of either": now matches `ruleInRepertoire` (`understanding.ts:90-98`) and row O8 ("warunek, akcja albo cel", target unrestricted). Action targets exist only for `walkTo`/`gather` and condition targets only for `hereBelow`/`itemBelow` (`src/browser/sim/types.ts:15-33`); both are checked.
- **D-71, D-121:** wording only ("where that order brings it", "where what brings it lands", "what the tutorial needs next"); meaning, *Verification* and *Origin* unchanged.
- **`program-rule-pick` sentence** is now true of the code (both clauses this range adds hold, shown by `repertoire.test.mjs`); *Derives from* gains D-127, and D-127's *Verification* names it back.
- Rows O1–O9 each have their entry (O3 in D-71, O8 in D-126, O9 in D-121, with D-128 for where the chain stands); no row left unwritten. Q7 (B) wording rule: the new and changed sentences use none of "only", "never", "always", "without"; D-128's "by a change of data alone" states what a data change suffices for, as D-18 does, and forbids no alternative — no finding.
- No environment fact or glossary entry is missing for what the range writes: "revealing event" is used in its ordinary sense.

## Findings

### Important (blocking)

**I-1 — `program-rule-pick` reads `Method: test`, but no test citing it checks the two clauses this range adds; the invariant passes with either clause broken.**
- **Place:** `foundations/invariants.md:248-254` (the sentence: "whose condition and action, with the target of each, lie in the character's repertoire" and "passing over a group whose condition or its target lies outside the character's repertoire … and leaves every program rule and group it passes over in the program"); `tests/invariants/test_program_rule_pick.py` (the only file citing `invariant: program-rule-pick`).
- **What is wrong:** the range adds to the sentence the group-outside-the-repertoire clause (from D-127) and the condition's target. The citing test checks one repertoire case only: a rule whose *action* lies outside the repertoire (`test_a_rule_outside_the_repertoire_is_passed_over`, lines 270-277); every other scenario starts from a game that knows everything (`KNOWING_GAME_JS`). Neither new clause has a citing test, and neither was seen failing (invariants template, § Method and test: "*Method* reads `test` where a test of the product's test suite checks the sentence … An invariant whose test is not written yet reads `review`"; "An invariant's test is seen failing once").
- **Why it matters:** the invariant's result is `pass` on a commit that breaks the clause it states, so the foundation reports as tested a rule nothing in its invariant tests protects. The behaviour is guarded today only by `tests/sim/repertoire.test.mjs`, an ordinary test that cites no invariant: a later change may alter or drop it without naming it in its request (WAY-03 applies to invariant tests only), and the invariant would still pass. The writer of the range reports the same gap under Concerns; the clauses are the range's own writing, so the gap is within this step.
- **Evidence:** scratch worktree of `db795b9` (removed afterwards), two mutants of `src/browser/sim/understanding.ts`, each run with `npm test -- tests/invariants/test_program_rule_pick.py` and `npm test -- tests/sim/repertoire.test.mjs`:
  - group filter dropped (`.filter((group) => conditionInRepertoire(repertoire, group.condition))` → `.filter(() => true)`): invariant test exit 0, "Ran 6 tests … OK"; repertoire test exit 1, failing "a group whose condition lies outside the repertoire is passed over with its rules, and stays in the program".
  - rule condition check dropped (`conditionInRepertoire(repertoire, rule.condition) &&` → `true &&`): invariant test exit 0, "Ran 6 tests … OK"; repertoire test exit 1, 4 failing, among them "a rule whose condition lies outside the repertoire …" and "a rule whose target lies outside the repertoire …".
- **Fix (recommended):** add to `tests/invariants/test_program_rule_pick.py`, citing `invariant: program-rule-pick`, (a) a first group under `{"kind": "itemBelow", "item": "stick", "value": 5}` whose condition holds, passed over to a later group in a game whose Understanding lacks `itemBelow`, the program unchanged, with the knowing game as control; and (b) a rule under the same condition in a game whose Understanding lacks the item `stick`, passed over to the next rule, with control — each seen failing against the two mutants above. The driver's `newGame` step today removes actions only (`lacking` filters `understanding.actions`), so it needs to take conditions and items too. The alternative — splitting the untested clauses into an invariant reading `review` — keeps the sentence true but leaves a cheap, testable rule untested; not recommended.

### Minor

**M-1 — D-126's binding sentence breaks the file's line width.** `foundations/decisions.md:2186` ("outside the character's repertoire to the next program rule, as over a program rule whose action cannot be") runs to about 108 characters, against the ~100 the rest of the log keeps; the rewrap stopped one line short. Polish only.

## Declined to judge

- D-124 ("disabled while the Understanding holds no action") against the code's repertoire-based disabling — not changed in this range; the return step's reasoning (same set with one archetype, rewording would shift row O6) is in its report, and the whole-change review's M-1 already holds it.
- `guidelines/coding-content-data.md` not listing `skills.ts`, `revelations.ts`, `items.ts`, `campfire.ts` — a guideline, not a foundation entry, and outside this range.

## Checks

- `git rev-parse HEAD` in the reviewed worktree — `db795b9867de1b2f5517a58b5267f4007cfea7fd`, matches.
- `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` — both `574a37b`.
- `python -B .the-way/elements/common/foundation_check.py` on `db795b9` — exit 0, "0 errors".
- Scratch worktree of `db795b9` (`git worktree add --detach`, `node_modules` linked by a junction, both removed afterwards; the reviewed worktree, its index and branch untouched):
  - mutant 1 (group filter dropped): `npm test -- tests/invariants/test_program_rule_pick.py` — exit 0 (6 OK); `npm test -- tests/sim/repertoire.test.mjs` — exit 1 (29 pass, 2 fail).
  - mutant 2 (rule condition check dropped): `npm test -- tests/invariants/test_program_rule_pick.py` — exit 0 (6 OK); `npm test -- tests/sim/repertoire.test.mjs` — exit 1 (27 pass, 4 fail).
- Manual: each new or changed entry read against `src/browser/sim/understanding.ts`, `src/browser/sim/types.ts`, `src/browser/sim/data/{actions,conditions,items,campfire,revelations}.ts`; D-127 and D-128 against `plan.md` § Choices; D-126 against task row O8 and question 8; Q7 (B) wording rule against the new and changed sentences.
- Not run: the full suite (`npm test`) — the cycle's own run (step 10, on `bdef6f8`); this range changes no code or test. No Docker or container test run, as the dispatch requires.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-18, D-23, D-90, D-91, D-118–D-125 (read whole) — the decisions D-127 and D-128 derive from or narrow, and the neighbours of D-126, to judge relations and collisions.
- `.runs/task-cycles/odkrywanie/plan.md` § Choices and the coverage table (lines ~236-262) — whether D-127 and D-128 record choices the cycle made, and with which rejected ways.
- `.the-way/elements/invariants/template.md` (whole) and `.the-way/elements/decisions/template.md` (lines 100-230) — the rules on *Method*/tests, *Relations* and *Origin* the entries are judged by.
- `.the-way/foundations/decisions.md` WAY-11 and WAY-36 — what a return step may write.
- `tests/invariants/test_program_rule_pick.py` (whole) and `tests/sim/repertoire.test.mjs:430-532` — what checks the changed invariant's clauses (I-1).
