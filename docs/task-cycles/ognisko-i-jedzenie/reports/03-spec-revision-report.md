# Report — spec revision, cycle `ognisko-i-jedzenie`

- Status: done
- Spec revised in place: `.runs/task-cycles/ognisko-i-jedzenie/spec.md`
- Handoff: `reports/03-spec-revision-handoff.md`; review: `reports/02-spec-reviewer-report.md`
- Nothing git tracks was changed.

## Findings and what the revision did

1. **Campfire or burning stick on an unrevealed tile (Important).** Applied the orchestrator's way
   (a) as the new *Decision 4*: "Wytwórz — ognisko" and "Zapal — patyk" cannot be carried out on a
   tile that is not revealed, as "Zbierz" cannot; "Zapal — ognisko" and "Zasil — ognisko" follow.
   The decision records the reason, rejects ways (b) and (c), gives the cost if wrong, and says the
   request names the choice to the human. Removed the bullet on unrevealed tiles from *Left to the
   maker*.
2. **A feasible feeding that adds nothing (Important).** Applied way (i): Decision 1 step 5 now has
   a feeding land on the campfire it started on, whatever that campfire's state at the feeding's
   end. It uses its fuel and adds 20 to the minutes left, 0 included, so a campfire that burnt out
   during the feeding burns again. Rewrote way A's weak point to match, with the orchestrator's
   cost (a relight for one stick, which task 9 may close). Added a bullet listing the rejected
   feeding ways: the spec's earlier rule, and fuel taken at the start.

## Rulings on the earlier points

- Point 1 (reading of the acceptance test) and point 2 (satiety floor at 0, gathering infeasible
  at stock 0): left as written under *Constraints*.
- Point 3: new *Decision 5* settles „Minuta <n> · Mag umarł z głodu” and „patyk — płonie, zostało
  <n> min”, with the names coming from the data. The *Left to the maker* bullet now holds only the
  status texts of the new actions, to be named in the maker's report.
- Points 4 and 5: no change (Decision 2 covers both merge orders; point 5 is answered by Decision
  4).

## The four checks, on the revised spec

1. No placeholder or empty section. `<n>` in Decision 5 is a number defined in the same sentence,
   not a placeholder.
2. No contradiction left: no other part of the spec relied on the old feeding rule (a search for
   "adds nothing", "burnt out" and "margin" finds only the new text). Reading 4 (pieces lacking)
   and Decision 4 (revealed tile) are separate conditions of feasibility and both apply.
3. Scope unchanged: one large change, as in `01-spec-designer-report.md`.
4. No new requirement that reads two ways.

## Reaches beyond the handoff

None.

## Checks

No product command was run. The spec stage writes no code.
