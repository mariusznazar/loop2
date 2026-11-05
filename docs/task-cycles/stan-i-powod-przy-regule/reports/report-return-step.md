<!-- Copied by the orchestrator word for word from the text the author returned: the harness refused the author's own write of this file. -->

**Status:** done, nothing changed in the return step.

**Commits:** none; the head stays `82d1ca9`, worktree clean.

**Check result:** I ran no check, because nothing changed (the gate passed on `82d1ca9`). I did not run the product's gate, and `.the-way` is untouched.

## Report of the return step

**Foundation compared with code (head `82d1ca9`).**
- **D-308** against `program.ts` (`judgeProgram`, `judgeRule`), `game.ts` (`ruleSigns`), `rule-list.tsx` and `styles.css`, with their tests and the UI states I saw earlier:
  - The winning and running backgrounds match.
  - The open row on `highlight` keeps its bar.
  - The hovered row keeps its state background; the CSS order is tested.
  - Bars match the entry: green, amber and dark, with the group bar green when one of its rules goes.
  - A rule outside the repertoire is amber with its reason, whether or not its own condition holds.
  - A group whose condition does not hold, or lies outside the repertoire, is dark with no reason on its rules (the fixed test now holds the condition true).
  - Signs appear only for the copy, and stay after the end.
- **D-309** against `ruleSigns` and `judgeRule`: first-turn pick in the minutes of an attack, „trwa walka”, „tylko w walce”. The creature's health is the data value, since nothing else is tracked before the turns.
- **D-310** against `actionRefusal`, `worldRefusal`, `combatRefusal` and `outsideReason`: order combat, then world and backpack, then nature energy. Wording and lower case match, as do „brakuje 4 × patyk”, „brak opału: patyk” and „brak energii natury: 7 z 10”.
- **D-39, D-40, D-42** against `tokens.css`, the kitchen-sink page and the styleguide table: five backgrounds, `condition-unmet` with no threshold, and the bar in `positive` and `warning`.
- **D-126** (now a pointer with no „with no sign of why”) and **D-127** (unchanged, and still true: a group outside the repertoire is dark with no reason).
- **Invariants `design-token-contrast` and `rule-state-from-pick`:** the sentence matches the test docstring and the code. The method of `rule-state-from-pick` stays `review`.
- **Entries the task names without changing them, and a search of the whole foundation:** D-23, D-43, D-62, D-93, D-132, D-140, D-141, D-151, D-171, D-173, D-174, D-279, D-289, D-300, D-302, D-305. A search for „under the pointer”, „open row”, „amber” and the three-background lists found nothing that now contradicts the code. D-300 and D-305 hold: no current value and no „⊘” are drawn.
- **Part map:** `browser-view` and `simulation` need no change. Their responsibility texts still fit, the new tests fall under `tests/sim/**` and `tests/view/**`, and `foundation_check.py` passed.

**Decisions written or changed:** none in this step. The foundation step's are D-39, D-40, D-42, D-126 (and its fix) and the new D-308, D-309, D-310.

**Invariants written or changed:** none in this step.

**Environment facts:** none. The old Loop classes at `cdc7c0d` stand as `Source:` comments in `tokens.css`, but no decision lists them in *Based on*. The WCAG facts already exist.

**Glossary terms:** none. No word is used against its entry, and „copy” and „repertoire” are used as the glossary gives them.

**Part-map changes:** none.

**Projected entries written whole or in part** (foundation step; the return step wrote none):
- Whole: the new state entry, now D-308; D-39; D-40; `design-token-contrast`.
- In part: D-42 (five backgrounds and the dark bar with no threshold; the criterion 2.3.1 stays with task 19); `rule-state-from-pick` (background, bar and reason; „Teraz” and „Potem” stay with task 14).

**Rows of *Settlements to record* written:** row 3 as D-309 and row 4 as D-310.

**Skills invoked with the Skill tool:** none, because no entry was written or changed.

**Searches not found or unclear:** none. One note: D-308's *Rationale* keeps the approved sentence „amber keeps one exception, a rule outside the repertoire whose condition does not hold”. It is awkwardly worded, but approved at the readiness gate, so I left it.
