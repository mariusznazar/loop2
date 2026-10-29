# Return step report — task `plomyk` (one author, resumed)

**Status:** done — nothing in the foundation needed correcting; no commit.

**Commits:** none. Head stays `c12faa3`.

## Return step (lines of the record template)

- **Foundation compared with code:** I compared each entry below with the code at `c12faa3`, and every one matches.
  - D-63:
    - Price: `natureEnergy: 10` on `lightCampfire` and `lightItem` (`src/browser/sim/data/actions.ts`) plus the sticks of `CAMPFIRE.light` and the lightable item.
    - Paid together at the finish: `finishUse` → `landUse` and `paidNatureEnergy` in `src/browser/sim/run.ts`.
    - An interrupted lighting never lands, so it pays nothing.
    - Outside combat: `chooseCombatRule` skips actions with no `combat` effect, and `actionFeasible` returns false for combat verbs.
  - D-71: `regainedNatureEnergy` runs right after `bodyMinute`, before the world step and the ending action. It also runs in the minute of death, as the order implies. The combat branch of `minuteBeforePick` leaves the energy alone.
  - D-121: `natureEnergyBelow.revealedBy = { kind: "lit" }`, read by `newlyRevealed`, so it comes in the same `discovered` event as „Zasil — ognisko”.
  - D-141: the combat minutes M+1…M+5 skip the body and energy step.
  - D-175:
    - Cost: each spell's cost is in data.
    - Regain: energy comes back only when satiety after the fall is ≥ `wellFedFrom`.
    - Empty energy: zero energy only makes the priced actions infeasible, and `bodyMinute` never reads energy.
    - Character without energy: the game has none today, since every created character is the elemental mage.
  - D-176: `newMapRun` sets `startingNatureEnergy()`, and both `send` and `restart` go through `startRun` → `newMapRun`.
  - D-177: the check `run.natureEnergy < natureEnergyCost(action)` in `actionFeasible`, so the program passes over the rule. Energy equal to the price is enough.
  - D-178: `bodyValues` ends with `Energia natury ${Math.floor(…)}` and `danger: false`, from `state.run` at minute 0.
  - Glossary „well fed”: `satiety >= BALANCE.natureEnergy.wellFedFrom`, with satiety read after the fall.
  - Invariant `nature-energy-range`: the cap comes from `Math.min(rules.max, …)`, and the floor from two guards, the feasibility check and the payment guard. Its citing test is in `tests/sim/body.test.mjs:350`, committed in `bf99953`.
  - *Decisions in play*:
    - D-18: every number is in data.
    - D-23: the pick goes past an infeasible rule.
    - D-60: health ignores energy.
    - D-62: „Restart” starts at minute 0 on the same seed with full energy.
    - D-80 / D-82: test expectations come from the task, with file and line.
    - D-118 / D-122 / D-128: the reveal is data alone, in one discovery line.
    - D-119 / D-120: the repertoire is unchanged. Energy is a matter of feasibility, not of the repertoire, so the editor still offers „Zapal” with low energy, as it offers „Zbierz” with a full backpack.
    - D-125: the energy shows whatever the Understanding holds.
    - D-140 / D-144: combat verbs are unchanged.
  - Found by the step-2 search: D-65, D-72, D-123, D-128, D-143, D-147 and `minute-span-split`; all still hold.
  - Part map: the `simulation`, `browser-view` and `product-foundation` entries still match. No file lies outside their globs, and responsibilities, dependencies and trust boundaries are unchanged. `python -B .the-way/elements/common/foundation_check.py` reports no file left unclaimed.
- **Decisions written or changed:** none in the return step. The foundation step wrote D-63, D-71, D-121 and D-141 (changed) and D-175–D-178 (new), and they still match the code.
- **Invariants written or changed:** none in the return step. The foundation step wrote `nature-energy-range`. I added no invariant for behaviour that no rule sets.
- **Environment facts:** none. The change rests on no source outside the product. The loop numbers come from the accepted task document (Q2), and the decisions' *Based on* reads `none`.
- **Glossary terms:** none in the return step. The foundation step wrote „well fed”.
  - No other word is used in an unusual meaning: „nature energy”, „spell” and „Płomyk” keep their plain game meaning or are names, and „cap” means an upper limit, as in D-64.
  - No word of the-way's glossary is used bare in the new sentences.
- **Part-map changes:** none.
- **Projected entries written whole or in part:**
  - „What does a mage pay for spells with?” was written whole as D-175 in the foundation step.
  - „When does the player learn what the world holds?” (D-118, written by task 6) is made true in part: the condition „Energia natury poniżej” is now revealed by play, which D-121 states.
  - The plan's *Projected entries* table assigns task 9 no other entry: only these two rows name 9 (`plan_mvp_loop2.md`, rows at lines 66 and 79 of the file).
- **Rows of *Settlements to record* written:** all 9, in the foundation step:
  - 1 → D-63
  - 2 → D-176
  - 3 → D-177
  - 4 → „well fed”
  - 5 → D-71
  - 6 → D-141 and D-71
  - 7 → D-121
  - 8 → D-178
  - 9 → `nature-energy-range`
- **Choices that bind after the merge:** none found that the foundation lacks.
  - Energy stored as a run field, its numbers in `balance.ts`, the price on each action, and the condition's place in the data are ways of making what D-18 settles.
  - The unit „pkt” is one data value. The review's Minor lists it, and review findings are no foundation entries.

## Correction to my earlier report

The review pointed out that my report said `c12faa3` touched “the foundation and a citation comment”. In fact `c12faa3` touches only `foundations/` (decisions, glossary, invariants), and the comment `// invariant: nature-energy-range` is in `bf99953`. I corrected that sentence in `02-author-report.md`, a file under `.runs/` and not committed. The code and the foundation are unaffected.

## Checks run

- `git show bf99953:tests/sim/body.test.mjs | grep -n "invariant: nature-energy-range"` → line 350 (it confirms where the citing comment sits).
- `git show c12faa3 --stat` → `foundations/decisions.md`, `foundations/glossary.md`, `foundations/invariants.md` only.
- `python -B .the-way/elements/common/foundation_check.py` → 0 (`0 errors`) at `c12faa3`.
- No code or test changed in this step, so no test was rerun. Your `npm test` on `c12faa3` exited 0, and the review reran the focused tests and StrykerJS.

## Searches not found or unclear

- Other projected entries for task 9 in the plan: none besides the two above (searched the *Projected entries* table for rows naming 9).
- A source outside the product that the change rests on and the foundation lacks: none found.
- A word used against its glossary entry, or in an unusual meaning: none found.
- Unclear: whether D-175's last sentence („A character without nature energy has no spells and pays nothing for them”) needs code today. No case exists, since every character is the elemental mage, so I made no change. The sentence binds when an archetype without energy is added.
