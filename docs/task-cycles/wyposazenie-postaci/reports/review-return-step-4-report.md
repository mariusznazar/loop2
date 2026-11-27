PASS 0b98d8e52ac6f2a62d0c579e2457d203fe769de3

# Review of the return step's commit over the correction (review-return-step-4), task `wyposazenie-postaci`

Range `18ad4c8e66ebd24c9f4c2ce7d20c3f993d24c3f6..0b98d8e52ac6f2a62d0c579e2457d203fe769de3`: one commit, one file, `foundations/decisions.md`, +6/−3. `git rev-parse HEAD` = `0b98d8e52ac6f2a62d0c579e2457d203fe769de3`, the head given. Method: `.the-way/task-cycle/review/SKILL.md`, the return step's commits reviewed against the foundation entry the step corrects. I read the author's report, `reports/return-step-4-report.md`, as claims to check.

## Findings

### Critical

None.

### Important

None.

### Minor

None in the diff.

### Outside the task's scope (block nothing)

1. **D-340's first binding paragraph reads more broadly than the chronicle for the turns of an encounter. This is older than the correction.** It says "The start of each action of the character gives an entry of the chronicle …" (`foundations/decisions.md:11597-11601`). Inside an encounter, no character action of a turn gives an entry: not a strike, a kick, a dodge or a „Załóż”. `eventEntry` returns `null` for every `combatExchange` except one that refilled (`src/browser/view/chronicle-entries.ts:411-420`), and the simulation emits no `activityStarted` for a combat turn (`src/browser/sim/run.ts:178` is reached only from the ordinary pick). The return step's new clause states that fact in the *Rationale*. It does not narrow the binding sentence. The binding sentence predates this task's correction, so this is no defect of the diff. A later change to D-340's binding text could add "outside an encounter", but that is a change of a binding sentence, beyond a return step.

## What was judged

1. **The diff is exactly the wording change the report names.** Three places of D-340 changed, all in prose:
   - *Rationale*: "as the start of „Załóż” is" → "as the start of „Załóż” outside an encounter is".
   - *Rationale*, *Accepted with it*: the clause "; a „Załóż” turn inside an encounter has no entry of its own, as no turn of an encounter has but the refill, and stands in the paragraph alone." is added.
   - *Rejected*: "though the start of „Załóż” has one" → "though the start of „Załóż” outside an encounter has one".

   The binding paragraphs (`:11597-11605`), *Scope*, *Based on*, *Relations* (`derives from D-338 · derives from D-334 · derives from D-457`), *Verification* and *Origin* are untouched. No other entry changed. The foundation check, which compares the quotations, exits 0 with "0 errors". The report says "+5/−3"; `git log --stat` shows 6 insertions and 3 deletions, because the rewrapped *Rejected* line adds one. The wording is otherwise as the report gives it.

2. **The new words are true of the code and of the other entries.**
   - *„Załóż” outside an encounter has an entry*: `activityStarted` of a rule gives `startWords(action)` (`chronicle-entries.ts:364-372`), which reads „Zakłada {rzecz}”. The walk saw „Zakłada opatrunek” at minutes 1, 2 and 3.
   - *A „Załóż” turn inside an encounter has no entry of its own and stands in the paragraph alone*: such a turn is a `combatExchange` with `action.kind === "equip"` and `refill: false`. In `combat.ts:128-136`, `refill` stays `false` on the equip branch. So `eventEntry` gives `null`, and the paragraph writes „Mag zakłada {rzecz}” (`src/browser/view/combat-line.ts:56-60`).
   - *"as no turn of an encounter has but the refill"*: I checked every event an encounter gives the chronicle.
     - The turns come only as `combatExchange` events, one per exchange, at the resolution minute (`run.ts:772-778`). Each holds the creature's bite or dodge and the character's strike, kick, dodge, „Załóż” or nothing. `eventEntry` gives an entry only where `characterAction?.refill` is truthy.
     - `combatEnded`, whether the creature is defeated or departs (the creature's flight), falls to `default: null` in `chronicle.ts:205-208` and gives no entry.
     - `attacked` places the paragraph and gives no entry (`chronicle.ts:186-190`). D-147 makes the paragraph the one record of the encounter, at the attack minute.
     - A death in the fight gives „Mag zginął w walce”, kind „Świat” (D-344; `chronicle-entries.ts:395-401`). That is the entry of the character's death, which `run.ts:785-791` emits after `combatEnded`, not an entry of a turn. The exchange in which the bite kills is still a `combatExchange` with `characterAction: null` (`combat.ts:104-107`), which gives `null`.
     - A campfire going out in a minute of an encounter (D-344) and a discovery at the first attack are events of the world, not turns.

     The clause is therefore true. Read with "the refill" as shorthand for the turn that refilled, it cannot be misread. D-147 is not contradicted: its binding text makes the paragraph the record of the encounter, and its *Rejected* turns down an entry for each exchange of blows, which the clause confirms.

3. **The template's limits.** `.the-way/elements/decisions/template.md` sets no length limit on *Rationale* or *Rejected*. The word limits (300 per paragraph, 600 together) bind only the binding sentences, which did not change. The prose rules (`template.md:85-90`) hold: the new words name no file, script or count, do not say how the decision was reached, and force nothing on later work. A second "Accepted with it" already stood in this *Rationale* before the step; the step extends it and does not add a third. The *Rejected* way it rewords comes from the human's remark 2, which turned down the paragraph-only record. So the rule for a decision marked `the cycle's` (`template.md:106-107`) is met by a statement of the human naming the way.

4. **Entries or guideline sentences the correction makes false, left by the return step.** I searched `foundations/*.md` and `guidelines/*.md` for "turn of an encounter", „Załóż” with "outside"/"inside"/"has", „Zakłada {rzecz}”, „Zakłada patyk”, „Zakłada opatrunek". The hits are D-340 itself and an unrelated line of the combat entry (`:7027`, about a reduction in the last turn). Together with the searches of my review of the correction (`reports/review-correction-1-report.md`), I find none, apart from the older breadth of D-340's binding sentence above (outside the scope). The two Minor findings of my review of the correction (`src/browser/view/controls/react-button.tsx:163-164`, `tests/view/shared-controls.test.mjs:965-972`) are comments, not foundation or guidelines, and remain as they were. They block nothing.

## Findings of the review of the correction

- Out-of-scope finding 3 of `review-correction-1-report.md` (the comparison with „Załóż” in D-340's *Rationale* broader than the code): **fixed**. The *Rationale* and the *Rejected* now say "outside an encounter", and *Accepted with it* says what happens inside one.
- Minor findings 1 and 2: **remain**, untouched by this step. They are not the foundation's, and they block nothing.

## Declined to judge

- Whether an in-fight „Załóż” should get a line of its own: a question for the human, outside the remarks, named in both reports.

## Checks

| Check | Command | Exit / result |
|---|---|---|
| Foundation check, at head `0b98d8e5` | `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |
| The diff and its extent | `git log --stat 18ad4c8e66ebd24c9f4c2ce7d20c3f993d24c3f6..0b98d8e5`; `git diff 18ad4c8e66ebd24c9f4c2ce7d20c3f993d24c3f6..0b98d8e5` | 0; one file, 6 insertions, 3 deletions, all in D-340's *Rationale* and *Rejected* |
| The clause "no turn of an encounter has but the refill" (manual) | read `chronicle-entries.ts:345-425`, `chronicle.ts:169-212`, `run.ts:740-835`, `combat.ts:48-160`, `combat-line.ts:40-70`, D-147 and D-344 | every event an encounter gives, as listed under judgement 2; only a refilling `combatExchange` gives an entry of a turn |
| Search for sentences made false (manual) | `grep -n` over `foundations/*.md guidelines/*.md` for the words under judgement 4 | only D-340 and an unrelated line |

Not run: the product's gate (by the handoff); focused tests, since no code or test changed; the instruction check, since the range touches no instruction file (the author ran it with exit 0).

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md`, lines 7-117: for the limits and prose rules of *Rationale* and *Rejected*.
- `src/browser/sim/run.ts:165-185` and `:815-835`: to check that no `activityStarted` comes from a combat turn and what an attack emits.

## Working copies

`.runs/review-return-step-4/` held the output of the foundation check only, with no worktree, clone or probe. It is removed by its full path before I return. Nothing is kept in `reports/`.

## Unread material

none. The handoff named the diff, the return step's report and the entries D-340, D-147 and D-344. I read all of them whole; D-147 and D-344 I had already read whole in the review of the correction. The decisions template was read in its part on the fields (lines 7-117), which is all this judgement needs, not whole.

## Searches not found or unclear

none
