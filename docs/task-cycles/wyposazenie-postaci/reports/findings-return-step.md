# Findings of the review of the return step (range 556f5a7d..565edafe), blocking only, in the reviewer's words

Source: `reports/review-return-step-report.md`, first line `FAIL 565edafef9c8daa06a890583d8c0300d2fe06755`. The three blocking findings, copied word for word; each carries the reviewer's mark of contradiction with the settlements. The Minor findings of that review are not part of this fix.

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
