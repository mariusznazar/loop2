# Handoff — the agent of the plan's *Foundation entries*, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions` (or `blocked` for a question the foundation step leaves to the human). Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Slice 1's base and the head you start from: `bd82d394e8ea08c77c8c8afb695bd931706f1644`. Your commits come after it on this branch, and your range is the base of slice 1 to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: the **foundation entries of the plan** (the foundation step). Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole — you take none of its rows of variants; your stage is the plan's *Foundation entries*. Read `.the-way/task-cycle/skill/foundation_step.md` whole, and the `SKILL.md` of an element (decisions: `.the-way/elements/decisions/skill/SKILL.md`) when you write an entry of that element; a file those name, when the step that names it comes. You have no skill tool; read a skill named by its name alone as a file (`foundation_step.md` says how).
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/foundation-entries-report.md`.
- Your directory for working copies: `.runs/foundation-entries/`.

## Working copies (first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## The task and the plan

- Frozen task (the source and only authority; read it whole): `.runs/task-cycles/drobne-bledy-ekranow/task.md`. Where this handoff and the task differ, the task holds.
- The plan: `.runs/task-cycles/drobne-bledy-ekranow/plan.md`; its section *Foundation entries* is copied below word for word. The slices are made after you by others; you write no code of a slice.
- The index of decisions of the selection (use it to find, open whole what you change): `.runs/task-cycles/drobne-bledy-ekranow/decision-index.md`.
- Answers of step 4: trust boundary no; irreversible operation no; open design choice none; reserved choice none.

## What to read

Foundation entries, each whole (an entry runs from its heading to the next heading of any level): the decisions D-04, D-172, D-207, D-208, D-285, D-294, D-297, D-306, D-342, D-350, D-381 with their *Rejected*; D-348, D-371 (named by row 4), D-336, D-370, D-194, D-201 for their wording around yours; and by the element's skill, the template and examples it names.

Guidelines, each whole: `guidelines/styleguide-browser-view.md` (rows 7, 11, 12, 13, 14 are written there), `guidelines/coding.md`, `guidelines/testing.md` (for the lines `decision:` of tests you re-quote), `src/browser/AGENTS.md`.

Also: `foundations/glossary.md` whole, `foundations/part_map.md` whole.

## Orchestrator's answers and choices that bind you

1. **Rows 1–9, 11–15 and 17 are yours; rows 10 and 16 are not** (they are code and data; the slices write them).
2. **Re-quoting tests.** Where a sentence you change leaves a line `decision:` of a test quoting text that no longer stands, re-quote that line to a sentence of the new entry that the test still holds, changing nothing else of the test, so that `python -B .the-way/elements/common/foundation_check.py` stays green at your head. The note under the plan's table lists the test files you may touch for this; those files and `foundations/decisions.md` and `guidelines/styleguide-browser-view.md` are all you change.
3. **D-306's non-binding text.** Where you rewrite D-306 (row 2), update its *Verification* and *Rationale* examples that show a number of a condition without its unit (the task's point 3 puts the unit on every screen: „Zapas poniżej 8 szt.”, „Sytość poniżej 30 %”, as the data of conditions give it) and mark that part `the cycle's`. D-295's `complies` line is not yours: leave it; the cycle lists it as a Minor finding out of scope.
4. **Wording.** Rows' meanings are fixed by the task (*Decisions in play* gives the change of each); the wording is yours (WAY-134). For row 5 pick the wording that touches no other part of D-207's sentence („…or where the save last sent failed, …”); the other rows' changes are given in *Decisions in play*.
5. **Ordering.** The code of the slices does not exist yet, so for every row whose behaviour a slice makes true, the decision describes what the slice will do; do not soften it. Say so in your report, row by row, with the slice the plan names.
6. In your report keep for each entry one sentence of its meaning in English and one in the task document's language, and mark the entry `row <n>`, `projected` or `the cycle's`.

## Section *Foundation entries* of the plan, word for word

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Row 1 — D-297: „↑” disabled only where no group stands before the rule's group, „↓” only where none stands after it; an empty group at the edge takes the rule | decision, changed sentence and *Verification* | Settlements row 1; To do 14 | none — the code and its tests already do it; the `decision: D-297` lines of the tests are re-quoted |
| Row 2 — D-306: deleting a rule closes its panel; moving it to another group does not | decision, changed sentence | Settlements row 2; To do 15 | Slice 8 |
| Row 3 — D-350: *Rejected* reads that the player would lose the open field and the place in it | decision, changed *Rejected* | Settlements row 3; To do 15 | Slice 8 |
| Row 4 — D-04: the view draws also from the player's acts on the copy with the copy before and after them (chronicle), from the page's memory of the end-of-run window, and from the place the browser gives for the walking mage (scene) | decision, changed sentence | Settlements row 4; To do 16 | none — no code changes |
| Row 5 — D-207: the 30-second rhythm and the hidden page send also where the save last sent failed | decision, changed sentence | Settlements row 5; To do 17 | Slice 16 |
| Row 6 — D-285: a click outside leaves focus where the player clicked; focus returns to „Konto” after Escape, a second click on „Konto” and a click on a place that takes no focus | decision, changed sentence | Settlements row 6; To do 18 | Slice 17 |
| Row 7 — the styleguide's sentence of the menu „Konto” says what row 6 says | styleguide, rule "Menu bar, the menu „Konto” and the list of programs" | Settlements row 7; To do 24 | Slice 17 |
| Row 8 — D-172: with no unsaved changes of the copy the line reads „Program {name} ma zmiany, których nie ma w tej kopii.”; the full sentence only with unsaved changes | decision, changed sentence | Settlements row 8; To do 19 | Slice 10 |
| Row 9 — D-342: „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj”” | decision, changed sentence | Settlements row 9; To do 21 | Slice 11 |
| Row 10 — the source of `grayscale(1) brightness(0.55)`: accepted by Mariusz on 2026-11-16 | data or code — a comment of a stylesheet; written by Slice 21, not by the agent of these entries | Settlements row 10; To do 22 | Slice 21 |
| Row 11 — the pieces of the time bar have one colour, told apart by order, gap, length and the legend in the same order; the item leaves „Otwarte dla człowieka”, the two others stay | styleguide, rule "The end-of-run window" | Settlements row 11; To do 23 | none |
| Row 12 — a greyed pick cell takes no highlight under the pointer, its dashed frame in `text-disabled` | styleguide, rule "States of shared controls" | Settlements row 12; To do 9 | Slice 2 |
| Row 13 — a long name typed by the player with no space breaks in its row and does not run out of it | styleguide | Settlements row 13; To do 2 | Slice 13 |
| Row 14 — where the element holding focus goes away, focus goes to the element standing in its place or nearest to it, never to the page | styleguide | Settlements row 14; To do 4, 5, 6 | Slices 8, 14, 15 |
| Row 15 — D-294: each new copy, after a send and after a switch to another program, has every rule group unfolded | decision, changed sentence | Settlements row 15; To do 7 | Slice 9 |
| Row 16 — the number of a condition stands with the unit of the condition's data on every screen | data or code — the units of `src/browser/sim/data/conditions.ts` and the test that each condition with a number has one; written by the slices, not by the agent of these entries | Settlements row 16; To do 3 | Slices 1, 3, 4, 5 |
| Row 17 — D-381: the page moves focus to the card also after a refused emailed link and after „Anuluj” | decision, changed sentence | Settlements row 17; To do 4 | Slice 15 |

The agent of the foundation entries writes rows 1–9, 11–15 and 17, before Slice 1. Rows 10 and 16 go
to the product's code and data, so their slices write them with the code (`task-cycle/skill/foundation_step.md`).
Where a sentence the agent changes leaves a line `decision:` of a test quoting text that no longer
stands in the decision's binding sentences, the agent re-quotes that line to a sentence of the new
entry that the test still holds, changing nothing else of the test, so that the foundation check
stays green at its head. At the base such lines stand for D-297 in `tests/view/program-editor.test.mjs`
and `tests/view/rule-editor.test.mjs`; for D-207 in `tests/account-api.test.mjs`,
`tests/view/account-screen.test.mjs` and `tests/view/game-saver.test.mjs`; for D-381 in
`tests/view/account-screen.test.mjs`; for D-172 in `tests/sim/copy-actions.test.mjs`,
`tests/sim/trip.test.mjs` and `tests/view/program-panel.test.mjs`; for D-285 in
`tests/view/menu-bar.test.mjs`; and, depending on the wording of rows 2 and 15, for D-306 in
`tests/view/program-editor.test.mjs`, `tests/view/program-panel.test.mjs` and
`tests/view/rule-editor.test.mjs` and for D-294 in `tests/view/program-panel.test.mjs`. The agent
changes `foundations/decisions.md`, `guidelines/styleguide-browser-view.md` and those lines alone.
After row 10's point: the rule with `filter: grayscale(1) brightness(0.55)` stands, since loop2#145,
in `src/browser/run-screen.css`, not in `src/browser/styles.css` as the row's *Goes to* names it;
Slice 21 writes the comment where the rule stands.

