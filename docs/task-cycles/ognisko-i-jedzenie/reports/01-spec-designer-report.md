# Report — spec designer, cycle `ognisko-i-jedzenie`

- Status: done
- Spec: `.runs/task-cycles/ognisko-i-jedzenie/spec.md`
- Method: project skill `the-way-write-spec` → `.the-way/task-cycle/spec/SKILL.md` (pin 86b78ad,
  gitlink and checkout agree)
- Worktree: nothing git tracks was changed (`git status --short` empty; `.runs/` ignored).

## Questions sent and answers

None sent. No assumption changes the design. Where the task reads two ways, the spec picks one
and writes it down (*Constraints*, "Readings of the task", 1–7). Points the orchestrator may want
to rule on, none blocking:

1. **Acceptance test reading** (spec, reading 1). "Program złożony wyłącznie z akcji i warunków
   tego zadania", read as only the new actions and conditions, cannot be met: gathering needs a
   revealed tile and only "Eksploruj" (task 3) reveals one. The spec reads it as the closed list as
   this task leaves it. If the human meant otherwise, the criterion needs a change, not the code.
2. **Satiety floor at 0, gathering infeasible at stock 0** (readings 2, 3). Both change outcomes
   slightly (eating from below 0; a rule "Zbierz" on an emptied tile passing to the next rule
   instead of spending 10 minutes for nothing). Recommended as written.
3. **Texts the task does not give**: the status row at death by hunger (only „Mag zamarzł” is
   given), the tile-list text of a burning stick, status texts of the new actions. The spec leaves
   them to the maker to write after the task's examples and name in its report; the orchestrator
   may settle them before dispatch instead.
4. **Coordination with task 11.** Its cycle record
   (`C:\Storage\repos\loop2-wt\siedziba-i-druzyna\.runs\task-cycles\siedziba-i-druzyna\cycle.md`,
   Q1) assumes task 4 merges second and adds no carrying capacity. If task 4 merges first, the join
   of Decision 2 falls to task 11's cycle; its orchestrator needs to know.
5. **Campfire on a tile not revealed** (left to the maker): the character can craft on an
   unrevealed tile (e.g. after "Wędruj"); the tile list has rows for revealed tiles only, so such a
   campfire's state would not show. Small; the orchestrator may rule.

## Ways weighed and why the rejected ones lost

Decision 1 — the order of a game minute:
- Chosen A: body (cooling and warming capped at 37.0 on the sum, satiety, health from this
  minute's values) → death (stops the step; the action in progress neither ends nor takes hold) →
  what burns loses a minute → renewal → the ending action takes hold → the program picks.
- B (action first) lost: an effect would count for a minute spent doing the action; a berry landing
  in the death minute could undo death; a campfire would warm 61 minutes.
- C (death after the pick) lost: a free game minute whose picked rule never runs, against
  `program-rule-pick`.
- Renewal at multiples of the renewal time from minute 0 (loop's behaviour, `movement.test.ts` of
  loop; stateless; countable for task 18) over a timer per tile and resource (more state).
- Decimal exactness by rounding to six places after each change, over plain floats (satiety can hit
  exactly 30 — e.g. 100 − 0.6 × 200 + 2 × 25 — and float drift would shift the crossing a minute)
  and over scaled integers (units the player never reads).
- Feeding whose campfire burnt out before it ends adds nothing and uses nothing — the only action
  whose ground can vanish mid-action; the rejected alternative (feeding relights) would give a
  cheaper lighting than "Zapal" and bypass the price task 9 puts on lighting.
- Split invariance holds by construction in every way (all effects in the one-minute step, spans
  stop at death); the choice decides outcomes, not invariance.
- Checked by a scratch computation (not code of the product): with the chosen order and rounding,
  the empty program on Las is chilled from minute 84, starving from 117, and dies at minute 243 of
  cold.

Decision 2 — carrying capacity:
- Chosen: a traits type, the map run's character holding a copy of its traits, a data file of the
  starting traits (carrying capacity 15, the same for every new character), one simulation function
  making a new character's traits; `send` uses it now; the cycle merged second makes the team's
  character carry traits from the same function and copies them into the map run at a send.
- Rejected: reading the cap from archetype data at each use (makes it a predisposition of the
  archetype, which the projected "What describes a character?" sets apart from traits; nothing for
  task 11 to carry); a character record in `GameState` now (builds task 11's shape; certain
  conflict).
- No foundation entry: placement in code is a way of making; the join ends with the work (WAY-36),
  so it belongs in the cycle record.

Decision 3 — numbers of the new conditions:
- Chosen: each kind's default, range and step in the conditions' data, from loop's
  `src/sim/data/conditions.ts` (temperature 36.5, 30.0–37.0, 0.1; satiety 50, 0–100, 1; item stock
  8, 0–50, 1; campfire minutes 20, 0–120, 1); the check accepts numbers on the step's grid within a
  tolerance and keeps the decimal form (36.6, never 36.60000000000001); the editor's field and
  commit rule read the chosen kind's data; the module constant `NUMBER` goes; the body row cuts
  values down (floor) to tenths or whole numbers so a shown value agrees with "below N".
- Rejected: temperature as whole tenths in the program (the program would hold a number the player
  does not read); any finite number in range (takes 36.55, store drifts); display rounded to
  nearest (a chilled 34.96 °C would show „35,0” in `danger`).
- Only loop's data file `conditions.ts` and loop's tests were read, as the definition allows.

## Foundation entries the spec names

- New decision on the order of a game minute, with proposed English wording beginning "In the MVP"
  and free of excluding words (the human's rule for MVP candidates, task *Context*); Based on: none;
  derives from D-04 and D-23. The rule says the candidate "zaczyna się od „W MVP”"; the log is in
  English, so the spec renders it "In the MVP" — the foundation step should confirm that rendering.
- New invariant `minute-span-split` (method test, part simulation) as the decision's verification
  and the task's "przy każdym podziale czasu" — a choice of this spec beyond the task's rows; the
  orchestrator may drop it, in which case the decision's verification rests on agent comparison and
  the simulation tests alone.
- The task's rows 1–6, 8–15 (decisions), row 7 (glossary `map run restart`), D-25 and D-26 changes,
  the campfire icon's title fact, `icon-credits` *Rests on*, the part map for the new test file.
- For the return step to judge: `player-map-run-pace` and D-21 after death, D-22's list of kinds,
  a second example in D-23.

## The four checks

1. Placeholders, `TBD`, empty sections: none. The environment fact's identifier is named by rule
   (after the icon file the maker takes), not left blank.
2. Contradictions: fixed one wrong citation (the campfire's warmth was cited to a row of the
   definition; now *To do* 7 and the sentence quoted under Q9). No contradiction found between
   sections, with the task's rows, or with D-04, D-20, D-22, D-23, D-26, `action-in-progress`,
   `program-rule-pick` (death does not end the action, so the death minute is not a free game
   minute).
3. Scope: one change, not independent ones — but large: data, the one-minute step, seven actions,
   five conditions, the program check, the view (row, death screen, tile list, drawing, editor,
   footer), an icon across the trust boundary, an acceptance test, about a dozen existing tests
   that meet death after this change (listed in *Constraints*), and some twenty foundation entries.
   The adaptation of the invariant tests that run past minute 243 is a cost of its own and likely
   a slice of its own.
4. Requirements readable two ways: the seven readings in *Constraints*; feeding at burn-out; the
   cap on the sum of warming and cooling; display by cutting down. Each is picked and written.

## Reaches beyond the dispatch

- `.the-way/foundations/decisions.md`: WAY-36, WAY-135, WAY-148, WAY-150, WAY-213, each whole —
  named by the skill and the handoff; read to apply them.
- `C:\Storage\repos\loop\src\sim\data\conditions.ts`, `balance.ts`, `activities.ts` (data files the
  definition lets tasks read) — for the ranges and steps of the conditions and the starting
  carrying capacity (`startCarry: 15`).
- `C:\Storage\repos\loop\src\sim\movement.test.ts:189`–`:230`, `sim.test.ts:516`–`:541`,
  `:1221`–`:1244`, `:2225`–`:2251` (tests the definition lets tasks read) — renewal timing, burn-down,
  health regain, death cause.
- `C:\Storage\repos\loop2-wt\siedziba-i-druzyna\.runs\task-cycles\siedziba-i-druzyna\cycle.md` and
  `reports\01-author-handoff.md`, searched for "carrying capacity"/"trait" only — to see what task
  11's cycle assumes about the join.
- `src/browser/view/app.ts`, `clock.ts`, `send-panel.ts`, `controls/number-field.ts`,
  `src/browser/sim/layout.ts`, and the test names and long spans of `tests/sim/*`, `tests/view/*`,
  `tests/invariants/test_*.py` (searched) — to see the editor's number field, the send path and
  which tests run past death.

## Checks

No product command was run: the spec stage writes no code. Nothing was built or tested; the base
checks are the orchestrator's (`reports/base-npm-test.log`).
