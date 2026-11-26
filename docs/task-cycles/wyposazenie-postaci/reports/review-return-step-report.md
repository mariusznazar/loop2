FAIL 565edafef9c8daa06a890583d8c0300d2fe06755

# Review of the return step — task `wyposazenie-postaci`

Range `556f5a7d8171843b6e60abbdd35f1bedc349f7ee..565edafe` (one commit, `565edafe`), worktree
`the task's worktree`, branch `task/wyposazenie-postaci`.
`git rev-parse HEAD` = `565edafef9c8daa06a890583d8c0300d2fe06755`, the head given. `.the-way` at
`6ed3cb364adedacea214d2a0df690cea32f2e72f`, the pinned commit. Method: `.the-way/task-cycle/review/SKILL.md`,
the return step judged against `.the-way/task-cycle/skill/return_step.md`, the task, the entries the step
wrote or corrected and the code at the head.

Counts: 3 blocking (Important), 6 Minor, 0 outside the task.

## Important

### I-1. D-461's new third sentence says the held piece goes to the chest; the code loses it at a full chest and at a death with no use left

Place: `foundations/decisions.md:12821`, the sentence "Where the slot holds a piece that the map run going on
of an earning loop holds, that piece goes to the chest by the merge at the end of that map run (D-460), not by
this choice."

What is wrong: the sentence says, unconditionally, that the piece reaches the chest at the merge. The code does
not always do that. `teamAtRunEnd` (`src/browser/sim/gear.ts:235-267`) puts the piece the map run left in a
changed slot into the chest only `while room > 0`, and where the death takes the gear (`taken`) it puts nothing
into the chest (`const left = taken ? null : runGear[slot]`). Two tests of the change show the piece lost:

- `tests/sim/gear-transfer.test.mjs:424` "a death with no use left takes the map run's stick that the player
  took off or exchanged for the next map run, and leaves the player's own": after the player took off the
  run's stick in the loop, a death with no use left gives `after.team.chest.pieces` `{}`.
- `tests/sim/gear-transfer.test.mjs:507` "the map run's piece in a changed slot is lost where the chest has no
  room".

D-460's first sentence carries the qualification ("goes to the chest, or is lost where the chest has no room"),
and D-190 the death. D-461's sentence drops both, so it states D-460's rule more broadly than the code does.
The fix commit `2766ad25` even said it ("a death with no use left takes it"). The pointer "(D-460)" does not
undo the claim, because the sentence says what happens ("goes to the chest") rather than pointing to where it
is settled.

Why it matters: a reader of D-461, the decision about the pick of a slot, learns that a piece taken off a
character in an earning loop is safe in the chest later. That is false in two cases the game produces. WAY-263:
an entry the change writes, restated without a qualification. The tests quoting this sentence
(`tests/sim/gear-acts.test.mjs:259` and `:283`) hold only "not by this choice", meaning no chest at the act.

Fix: settle it without the claim, for example "…, that piece is not moved by this choice: the merge at the end
of that map run (D-460) settles it." Or keep the claim with both qualifications ("goes to the chest by the merge
at the end of that map run, or is lost there as D-460 and D-190 give, not by this choice"). Then re-quote the
two `decision:` lines.

Contradiction: yes — D-461, against the code's merge as D-460 (first sentence) and D-190 give it.

### I-2. D-146 left unchanged: "no feasible combat rule" by the foundation's own usage excludes „Załóż”, so D-146 says a character holding only a feasible „Załóż” rule gives up its action

Place: `foundations/decisions.md:7058`, "A character that finds no feasible combat rule gives up its action of
that turn", and its *Verification* at `:7066`. The return step's reason for leaving it is
`reports/return-step-report.md`, item 5.

What is wrong: the return step read "combat rule" as any rule whose action can be carried out in combat, and
cited D-309 as using the term that way. At the head the foundation uses it the other way:

- D-140, `foundations/decisions.md:6902`: "Combat verbs can be carried out only in combat, and only they can be
  carried out in it, but for „Załóż” (D-458)". So „Załóż” is no combat verb.
- D-309, `foundations/decisions.md:10204-10205`: "Outside those minutes a combat rule whose condition holds is
  amber with the reason „tylko w walce”. A rule with „Załóż” … is amber with neither reason … and where the
  turn would choose it, its row stands on `rule-winning` as that of a combat rule does." D-309 sets a rule with
  „Załóż” apart from a combat rule. If it were one, it would be amber with „tylko w walce” outside combat.

Read with that usage, D-146 says that a character whose only feasible rule is „Załóż” gives up its action. The
code carries the „Załóż” out. `tests/sim/gear-combat-wear.test.mjs:77`: a program with the one rule
`ALWAYS → Załóż — patyk`, and the first exchange's `characterAction` is that rule (`ruleId: 1, action:
EQUIP_STICK`). The glossary term `combat turn` (`foundations/glossary.md:176`) avoids the word ("no feasible
rule whose action it can carry out in combat"), but D-146 does not. So two readings of the same entry stand
side by side, and the one the foundation's other entries support is false of the code. The mismatch comes from
this task (*To do* 5, „Załóż” in combat; settlement row 20). return_step.md requires the step to correct
"whatever no longer matches" (WAY-11). That the fix means re-quoting six `decision:` lines is a cost of the
process, not a reason to leave an entry that disagrees with the code.

Fix: "A character that finds no feasible rule whose action it can carry out in combat gives up its action of
that turn" (the glossary's words). Make the same change in the *Verification* clause and re-quote the lines
that quote that sentence.

Contradiction: yes — D-146, which the code of „Załóż” in combat goes against as the entry reads at the head.

### I-3. D-187 lost the only check of "counts toward neither cap"; D-183's narrowed pair implies "counts toward no exit cap" is held, and no test holds either

Place: D-187 *Verification*, `foundations/decisions.md:8870-8873`, for the sentence at `:8865` "The caps clip
no gear: the gear of the character goes into a map run and out of it whole and counts toward neither cap."
D-183 *Verification*, `:8794-8802`, for "…counts toward no exit cap…" in its binding sentences (`:8789` and
after).

What is wrong: the step removed D-187's pair whole, including the violates example "an entry cap or an exit cap
… that counts the pieces of the gear toward its number". Its report lists D-187 under "Removed whole (tests hold
it)". The tests that quote the sentence use caps of 0 only:

- `tests/sim/gear-state.test.mjs:123` uses Las — matecznik with `carryIn` 0.
- `tests/sim/gear-transfer.test.mjs:218` uses `carryOut` 0.

At a cap of 0 the trip plan's cut and the deposit are 0 whether or not the gear counts. So a change that
counted the gear against the cap's room passes both tests. No test with a cap above 0 has gear: the searches
for `carryIn: [1-9]` and `carryOut: [1-9]` in `tests/` find only cases of `takeTrip`, `tripLoot` and the view,
none with gear. D-183's pair was narrowed in the same way ("For a piece the map run put from the gear into the
backpack, …"), so the rest of the sentence reads as held, its "counts toward no exit cap" included, and at an
exit cap of 0 it is not.

Why it matters: return_step.md says "leaves a pair only for a part no test holds", and the template says a
decision "whose test holds part of it carries a pair only for the part no test holds". A reader who finds no
pair takes the whole sentence as held by tests. Here a binding clause has neither a test nor an example, and
the entry tells the reader the opposite (WAY-364, a sentence read wrongly through the departure, so graded as
any other finding). The content agrees with the code today (`takeTrip` and `tripLoot` take no gear), so this is
a gap in what checks the decision, not a bug.

Fix: give D-187 back a pair for the part no test holds, for example "For the gear counted toward a cap above 0,
an agent compares a change with the part no invariant and no test holds: complies: a character with a stick in
its main hand entering a map whose entry cap is 4 with four pieces of its trip plan; violates: an entry cap or
an exit cap that counts the pieces of the gear toward its number". Say the same of the exit cap in D-183's pair.
Or add a test with a cap above 0 and gear, and quote the sentence there.

Contradiction: no.

## Minor

- M-1. `foundations/decisions.md:12808`: D-460's new third sentence is about the chest while the map run goes on.
  That is another question than the heading's ("How is the gear … merged at the end of a map run?"), so the
  template gives it a paragraph of its own (template, "Binding sentences"). Its "until this merge" ties it to
  the merge, so no reader is misled; the content agrees with `heldByLoopRun`, `putOnPiece` and `takeOffPiece`
  and with *To do* 7 ("Skrzynka przy zmianie w pętli"). Form only (WAY-364).
- M-2. `tests/sim/gear-state.test.mjs:71`: the new line `D-456 "An item whose data name no place fits no slot."`
  stands on a test that computes the fit itself (`row.fits === place`, lines 73-77) and never calls the
  product's `fitsSlot` (`src/browser/sim/character.ts:42`). It would pass with a `fitsSlot` that let an item
  with no place into every slot. A test that holds the sentence is `tests/sim/gear-wear.test.mjs:418` (the
  program check refuses the row `board`, which names no place). The line belongs there, or on a `putOnPiece`
  case with such an item.
- M-3. `foundations/decisions.md:8075-8077`: D-23 got a new `decision:` line at
  `tests/sim/gear-combat.test.mjs:60`, and the gear part of its pair was removed, but its `tests:` clause does
  not name what that test holds (the strike taking the piece the gear holds). return_step.md says the step
  "names that test by the clause `tests:`".
- M-4. `foundations/decisions.md:12701-12703`: D-452's pair is introduced "For the switch of the program", yet
  its violates line keeps "a list of gear in the trip plan of a program", which the `tests:` clause of the same
  field calls held ("the trip plan taking no gear").
- M-5. `foundations/decisions.md:10214-10216`: D-309's new `tests:` clause reads "a rule with „Załóż” amber with
  neither „trwa walka” nor „tylko w walce”", while `tests/sim/gear-combat-wear.test.mjs:399` shows the rule
  green where it can be carried out. The wording follows D-309's own binding sentence ("is amber with neither
  reason", outside this range), but in the clause it reads as if the rule is always amber. "shows neither …
  nor …", as the removed example had it, says what the test holds.
- M-6. `tests/sim/gear-transfer.test.mjs:263`: D-183's new `tests:` clause counts „Restart” among the ends the
  tests hold, and the „Restart” test does hold it, but it carries only a D-452 line and no D-183 line.

## The points of the handoff, judged

1. Chest rule. D-460's third sentence says what *To do* 7 says and what `gear.ts` does
   (`heldByLoopRun` at `:75-84`, `putOnPiece` at `:146-147`, `takeOffPiece` at `:181-188`, the merge
   `teamAtRunEnd` at `:247-256`), and no more. Each of the four tests that quote it asserts its part:
   `gear-acts.test.mjs:192` (leaves the chest at once), `:209` (returns at once), `:257` (no chest and no room
   needed, with an empty chest and a full one), `:281` (put on over the held piece takes one and puts the held
   one into none). Length: the foundation check counts the paragraphs and reports 0 errors. D-461's sentence:
   I-1. Form of D-460: M-1.
2. D-380. The sentence at `foundations/decisions.md:8361`, without "only", now gives a condition that is enough
   to refuse and stays silent on a main hand that holds another item. The code's refusal there
   („brakuje 1 × patyk”) does not contradict it. *To do* 3 and row 24 give the same condition, so the entry
   says what the task says. Leaving the unreachable state unsaid is sound: no item of the data but the stick
   fits the main hand, and D-457 already says the strike refills only an empty slot.
3. *Rejected*. D-455 (`:12746`): row 10's source keeps one not-chosen way, „nie zapisywać, zostawić to kodowi i
   testom”. That is a way of the process (how an answer is recorded), which the template keeps out, so
   `no cost to the product known` is the template's own word. `none considered` was wrong, since the human did
   weigh a way. D-463 (`:12860`): the plan marks it the cycle's (F32), and the plan's *Choices* row is no
   statement of the human, so `unknown` follows the template's rule for a decision marked the cycle's.
4. D-146: I-2.
5. Pairs. For each pair removed whole I read the tests that quote the decision, by their bodies where the
   example needed it. A test asserts the example for D-453 (`gear-acts.test.mjs:230`;
   `gear-transfer.test.mjs:341`, `:358`), D-454 (`tests/view/character-gear.test.mjs:159`), D-455
   (`gear-state.test.mjs:152`, `:162`, `:218`, `:234`), D-456 (`gear-acts.test.mjs:103`, `gear-wear.test.mjs:197`,
   `gear-state.test.mjs:45`), D-457 (`gear-combat.test.mjs:76`, `:158`), D-460 (`gear-transfer.test.mjs:358`,
   `:381`), D-461 (`tests/view/character-gear-pick.test.mjs` cases with D-461 lines), D-462
   (`character-gear.test.mjs:248`), and for the gear parts of D-23 (`gear-combat.test.mjs:59`), D-140
   (`gear-combat-wear.test.mjs:77`, `:111`; `gear-wear.test.mjs:136`), D-143 (`tests/sim/data.test.mjs:772`),
   D-144 (`gear-combat.test.mjs:59`, `:76`, `:106` with a stick in a pocket; `gear-combat-wear.test.mjs:77`),
   D-145 (`gear-combat.test.mjs:59`, `:238`), D-190 (`gear-transfer.test.mjs:276`, `:316`), D-287
   (`character-gear.test.mjs:308`, `:376`), D-309 (`gear-combat-wear.test.mjs:353`, `:378`, `:399`), D-311
   (`tests/view/world-area.test.mjs:323`), D-380 (`gear-combat.test.mjs:106`, `gear-wear.test.mjs:249`) and
   D-439 (`gear-transfer.test.mjs:626`). The exception is D-187's counting clause, which no test holds (I-3).
   The reasons for the pairs left (D-451's second sentence, D-452's switch of the program, D-458, D-459, D-463,
   D-183, D-439, D-440, D-44) hold: no test I found switches a program, fills the pockets with the whole rule,
   asserts a count at a refill, a return or a death, starts the twelve runs with the gear, or asserts that the
   screen builds the tile from the shared control.
6. `decision:` lines. Every line the range adds or changes in the tests is a comment line `// decision: …`
   (check 1 below). The foundation check reports 0 errors, so every quotation stands in its decision. Each line
   stands on a test that holds its sentence, except M-2. Removing the D-451 line at the strike test is right:
   the stick is counted in pieces, so that test holds nothing of "a kind kept piece by piece".
7. `guidelines/testing.md:178`: the new case stands in `tests/view/judging-cache.test.mjs:678`, marked
   `invariant: judging-cache-reading`. It reads the values −1, 0.5, "0" and null against a state whose character
   holds the same value and asserts `null` and the value left in storage, which is what the row says. The row
   stays in the form of the trust-boundaries rule of `.the-way/product-guidelines/testing/template.md:184-193`.
8. Gaps of the step's reading. Where a sentence the range writes depends on the code, I read `gear.ts` whole and
   the tests that run `game.ts`, `loop.ts`, `run.ts` and `combat.ts` through it (`gear-transfer.test.mjs`
   whole from line 150 to 449, `gear-combat.test.mjs:20-259`, `gear-combat-wear.test.mjs:77-110`), together
   with `fitsSlot` and `gearSlots` in `character.ts`. Those were enough for I-1, I-2 and I-3. I did not read the
   source of `combat.ts`, `game.ts` or `loop.ts`; the passing tests above stood for it.
9. Open items. D-451's `TODO` stands in *Relations* (`:12685`) as the template allows. For row 25,
   `src/browser/sim/data/gear.ts:19` gives „bierze patyk z plecaka do ręki”, written only with the actor
   („Mag …”, `src/browser/view/combat-line.ts:54`), so the bare „Bierze patyk z plecaka do ręki” of *To do* 3
   has no code that writes it, as the report says. D-463 is marked the cycle's in the plan (F32). All three are
   stated truthfully.

## Declined to judge

none

## Checks run

1. `git diff -U0 556f5a7d8171843b6e60abbdd35f1bedc349f7ee..565edafe -- tests | grep -E '^[+-]' | grep -vE '^(\+\+\+|---) ' | grep -vE '^[+-]\s*// decision: '`:
   exit 1 (grep found nothing), so no changed line of a test is anything but a `decision:` comment.
2. `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
3. `node --test tests/sim/gear-acts.test.mjs tests/sim/gear-combat.test.mjs tests/sim/gear-state.test.mjs tests/view/judging-cache-gear.test.mjs tests/view/judging-cache.test.mjs tests/sim/gear-transfer.test.mjs`:
   exit 0, 193 of 193 pass. They ran against `dist/` as it stood (built 2026-11-26 22:49; the last commit to
   `src/` is `2766ad25`, 22:50; this range changes no source). I did not rebuild.
4. Manual: diff of the range read whole (`git diff` of `foundations/decisions.md`, `guidelines/testing.md` and
   the four test files; `git log` of the range, one commit).
- Not run: the product's gate (`npm test`), by the handoff. `python -B .the-way/instruction-files/check_instructions.py`
  was not run, since the range changes no instruction file; the author reports exit 0.

## Reaches beyond the handoff

- `foundations/decisions.md`: D-140 (`:6898-6919`), D-146 (`:7056-7071`), D-309 (`:10198-10222`), D-23
  (`:8062-8090`), D-187 (`:8863-8877`), D-183 (`:8787-8802`), read for I-2, I-3, M-3 and M-5. D-451 to D-463
  read whole (`:12679-12860`).
- `foundations/glossary.md:174-176`, the term `combat turn`, for I-2.
- `.the-way/elements/decisions/template.md`, read whole, for points 1, 3, 5 and I-3.
- `.the-way/product-guidelines/testing/template.md:178-193`, for point 7.
- Tests read in part: `tests/sim/gear-acts.test.mjs` whole, `gear-transfer.test.mjs:150-449`,
  `gear-combat.test.mjs:20-259`, `gear-combat-wear.test.mjs:77-110`, `gear-state.test.mjs:38-43, 70-274`,
  `gear-wear.test.mjs:195-216, 409-436`, `data.test.mjs:770-799`, `tests/view/judging-cache.test.mjs:678-721`.
  The titles and `decision:` lines of the other gear tests were read by search.
- `src/browser/sim/gear.ts` whole; `src/browser/sim/character.ts:29-46`; search for the refill words in `src/`.

## Working copies

`.runs/review-return-step/` held the diff of
`foundations/decisions.md`, the output of the foundation check and the output of the test run. The diff was
written first as `.runs/review-return-step-diff.txt` beside that directory and then moved into it. No worktree
or clone was made. The directory was removed by its full path before return. Nothing is kept in `reports/`
besides this report: each finding cites a test or a line of the head, and no probe was needed.

## Unread material

- `docs/task-cycles/wyposazenie-postaci/plan.md`: read *Foundation entries* (lines 7-54) and *Choices* (lines
  632-649); the slices and *Coverage* were not read.
- `.the-way/task-cycle/skill/foundation_step.md`: not read. `return_step.md` does not name it by path; its "as
  the foundation step writes" concerns environment facts, glossary terms and rows the range does not write.
- The source of `src/browser/sim/combat.ts`, `game.ts`, `loop.ts`, `run.ts`, `program.ts`, `saved-game.ts` and
  `judging-cache.ts`: not read; their behaviour was judged through the tests named above.
- `reports/return-step-2-foundation-check.txt`: not read; I ran the check myself.

## Searches not found or unclear

- A test with a map's entry or exit cap above 0 and a character holding gear: not found (`carryIn: [1-9]` and
  `carryOut: [1-9]` in `tests/`). This is the basis of I-3.
- A test of `putOnPiece` with an item whose data name no place: not found; `gear-wear.test.mjs:418` holds the
  sentence for the program check (M-2).
- `return_step.md` names no `foundation_step.md` by path, though the handoff says it does; it says "as the
  foundation step writes".
