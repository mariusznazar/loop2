PASS 83cc361564dd168667786d97ca23a1d402ca09e5

# Review of the fix of the return step's findings — task `wyposazenie-postaci`

Fix range `565edafef9c8daa06a890583d8c0300d2fe06755..83cc3615` (one commit, `83cc3615`), worktree
`the task's worktree`. `git rev-parse HEAD` =
`83cc361564dd168667786d97ca23a1d402ca09e5`, the head given. Method: `.the-way/task-cycle/review/SKILL.md` with
`.the-way/task-cycle/review/fix.md`. The findings file `reports/findings-return-step.md` bounds this review; it
holds I-1, I-2 and I-3 of `reports/review-return-step-report.md`.

Counts: 0 remaining, 0 new blocking, 3 Minor (new), 0 outside the task.

## The findings

### I-1 (D-461) — fixed

`foundations/decisions.md:12829` now reads "Where the slot holds a piece that the map run going on of an
earning loop holds, that piece goes into no chest by this choice: the merge at the end of that map run (D-460)
settles where it goes." It no longer claims the piece reaches the chest. What it does claim matches the code at
the head:

- At the act, `putOnPiece` adds no held piece to the chest (`src/browser/sim/gear.ts:146-147`).
- At the act, `takeOffPiece` puts it into none and needs no room (`:181-188`).
- Where the piece goes afterwards is `teamAtRunEnd`'s matter (`:235-267`), whether chest, loss at a full chest,
  or loss at a death that takes the gear.

The two tests that quote it, `tests/sim/gear-acts.test.mjs:259` and `:283`, assert exactly that part (the chest
unchanged at the act, with an empty chest and a full one). The decisions that derive from D-461 (D-44 and the
entries at `foundations/decisions.md:4887`, `:12593`, `:12861`) rest on its first two sentences, not on this
one, so none needs a change.

### I-2 (D-146) — fixed

`foundations/decisions.md:7058` now reads "A character that finds no feasible rule whose action it can carry
out in combat gives up its action of that turn". Those are the glossary's words (`foundations/glossary.md:176`),
so a character whose only usable rule is „Załóż” no longer reads as giving up its turn, which agrees with
`tests/sim/gear-combat-wear.test.mjs:77` and with the combat pick (`chooseCombatRule`, `src/browser/sim/program.ts:639`,
the winner of `judgeProgram` in combat). The *Verification* clause at `:7066-7067` says the same. Six quotations
were re-quoted, and none of the old wording is left in a `decision:` line (check 2 below). D-71, the one decision
that derives from D-146 (`:5762`), does not repeat the phrase.

### I-3 (D-187, D-183) — fixed

D-187's *Verification* (`foundations/decisions.md:8877-8881`) has a pair again, for "the gear counted toward a cap
above 0":

- complies: an entry cap of 4 with four pieces of the trip plan and the stick staying in the hand;
- violates: "an entry cap or an exit cap that counts the pieces of the gear toward its number".

D-183's pair (`:8797-8805`) now also covers "the gear counted toward an exit cap above 0", with a matching
complies and violates. The `tests:` clauses still say the caps tested are 0. So the field no longer implies that
a test holds the counting clause, and each part of the two decisions now has either a test or an example. Both
examples are true of the code: `takeTrip` and `tripLoot` take no gear, and the gear comes back through
`teamAtRunEnd`.

## What the fix diff itself brings

- The diff of the tests holds only `// decision:` comment lines (check 1). Every re-quoted line quotes a sentence
  of its decision (check 3, the foundation check, which compares each quotation). No old quotation of D-146 or
  D-461 remains (check 2).
- No new Critical or Important finding.

### Minor (new, non-blocking)

- M-1. Point (4) of the dispatch. The fix author did not read `.the-way/task-cycle/skill/foundation_step.md` or
  `.the-way/elements/decisions/skill/SKILL.md`. I read both whole. Neither gives the entries a form beyond
  `template.md`, which the author read, so the form of what it wrote is not affected. What `foundation_step.md`
  does bear on is the report. The writer keeps, for each entry, one sentence of its meaning in English and one in
  the task's language, and a mark (`row <n>`, `projected` or `the cycle's`). A pair the writer adds that no row
  gives, and that no test of this change will later hold, makes the entry `the cycle's`, and the report keeps
  that pair word for word for the request to quote (`foundation_step.md:29-36`).
  `reports/fix-return-step-report.md` gives neither the sentences nor the marks. By that rule:
  - D-146's changed sentence is the cycle's;
  - D-461's third sentence is the cycle's (as it already was);
  - the new pairs of D-187 and D-183 make those two entries the cycle's, with each pair quoted word for word.

  The orchestrator should carry these into the request, so the human sees them at the merge. No entry needs
  editing for this. I also checked the step of `elements/decisions/skill/SKILL.md` that follows a change of
  binding sentences (step 4.4). It asks for every decision that derives from D-146 or D-461 to be checked: D-71
  and the four that derive from D-461 need no change (see I-1 and I-2).
- M-2. `foundations/decisions.md:7067`: the re-wrapped *Verification* line of D-146 runs far past the width of
  the lines around it ("can carry out in combat giving up its action of the turn; every resolved encounter
  starting the cooldown again; combat wounds"). Cosmetic only.
- M-3. The old phrase survives where no quotation is: the test title `tests/sim/combat.test.mjs:87` ("no feasible
  combat rule loses each action …") and the doc comment `src/browser/sim/program.ts:638` ("The first feasible
  combat rule …"). Both are outside what the foundation check compares, and both stay true for the cases they
  describe (the test's program has no rule at all). They are left as notes only. The comment in `program.ts` lies
  outside the fix diff.

## Point (5): the numbers "4 and 4"

They are a plain example, not a claim about a map. No map of the data has a cap of 4: `src/browser/sim/data/maps.ts`
sets one cap, `carryIn: 0` (Las — matecznik, `:165`), and the fields are optional (`:46-47`). Both pairs say
"a map whose entry cap is 4" and "a map whose exit cap is 4", a map described, not named. The fix report says the
same.

## Declined to judge

none

## Checks run

1. `git diff -U0 565edafe..83cc3615 -- tests | grep -E '^[+-]' | grep -vE '^(\+\+\+|---) ' | grep -vE '^[+-]\s*// decision: '`:
   exit 1 (no line found), so the diff of the tests is `decision:` comments only.
2. `grep -rn 'decision: D-146 "A character that finds no feasible combat\|decision: D-461 "Where the slot holds a piece that the map run going on of an earning loop holds, that piece goes to the chest' tests | wc -l`:
   0, so no old quotation remains. A wider `grep -rn "feasible combat rule\|no feasible combat"` over `foundations`,
   `guidelines`, `src` and `tests` finds only the two places of M-3.
3. `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- Not run: the three test files. The fix changes comment lines only and no finding needs a run; the author reports
  67 of 67 pass. The product's gate was not run, by the dispatch.

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/foundation_step.md` and `.the-way/elements/decisions/skill/SKILL.md`, read whole, for
  point (4) and M-1.
- `foundations/decisions.md`: the *Relations* lines that name D-146 or D-461 (`:4887`, `:5129`, `:5762`, `:12593`,
  `:12861`), and D-71 searched for the phrase. Done to check what derives from the changed sentences.
- `src/browser/sim/program.ts:636-650` and `src/browser/sim/data/maps.ts` (the caps), for I-2 and point (5).

## Working copies

`.runs/review-return-step-fix/` held the output of
the foundation check. No worktree or clone was made. The directory was removed by its full path before return.
Nothing besides this report is kept in `reports/`.

## Unread material

- `reports/fix-return-step-foundation-check.txt`: not read; I ran the check myself.

## Searches not found or unclear

none
