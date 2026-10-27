# Findings to fix — whole-change review FAIL 1f3e2917a0b0aa5e90b976777f9e6f01c74079ed

Source: `.runs/task-cycles/odkrywanie/reports/20-whole-review.md`, § Important (blocking), copied word for word. Fix only this finding; the review's Minor findings are not fixed. The fix range runs from the reviewed head `1f3e2917a0b0aa5e90b976777f9e6f01c74079ed`. Where you hold the finding wrong, answer it with evidence in your report instead of changing code.

**I-1. In about one game in 27 the program editor offers „Idź”, „Zbierz”, „Tu leży mniej niż” and „Zapas poniżej” with no target. Choosing one of them leaves the select showing a rule the program does not hold.**
Slice 11, commit 706c97e (`src/browser/view/program-editor.ts`). Slice 2's repertoire shape (339f94f) is where it starts, but the slice-2 functions themselves are correct.

- What the player sees: in a new game, Las sometimes has no resource on the entrance tile. When it does not, the first finished exploration (minute 104) reveals „Idź”, „Zbierz”, „Tu leży mniej niż” and „Zapas poniżej” with no item. The line under the status row reads „Odkryto: Idź, Zbierz. …”. The action and condition selects now list the four kinds, but the resource and item lists are empty.
  - When the player picks „Idź” or „Zbierz” in a rule's action select, `withActionKind` gets `offer.resources = []` and returns null (`program-editor.ts:421-422`). The change handler (`program-editor.ts:899-908`) then calls `edit(null)`, which returns without committing or redrawing (`program-editor.ts:638`).
  - So the select keeps showing „Idź" while the program still holds „Eksploruj", and no target select appears. A condition select switched to „Tu leży mniej niż” or „Zapas poniżej” behaves the same way (`newCondition` returns null for no resource or item, `program-editor.ts:341-345`).
  - The player reads a program that is not the one the character runs. The character keeps waiting at minute 104, because exploring a revealed tile is infeasible (D-25), and nothing on the screen says why.
- Why it is within the task and blocking:
  - To do 4 has the editor offer "w listach warunków, akcji i ich celów repertuar postaci". By D-120, an action is a pair of verb and target. By the change's own `actionInRepertoire`/`conditionInRepertoire` (`understanding.ts:59-87`), „Idź”/„Zbierz” and the two conditions are outside the repertoire with every possible target while the Understanding holds no item. The editor therefore offers kinds of which no rule in the repertoire can be made.
  - The view also departs from D-04: the view draws the game from the game state, but here the select shows a state the game does not hold.
  - Before this task the resource list was empty only when no map existed, which never happens in play. The task makes it reachable at the second step of the tutorial.
- Evidence:
  - Scratch run on the built head (`scratchpad/entr.mjs`): 11 of 300 sends to Las at different real times have an entrance tile with an empty stock. One of them is the real time 1760000000000 that many tests use.
  - Scratch run `scratchpad/entr2.mjs` at that real time: at minute 104 the event is `{"kind":"discovered","minute":104,"actions":["walkTo","gather"],"conditions":["hereBelow","itemBelow"],"items":[]}`, with `offeredActionKinds` = `["explore","wander","walkTo","gather"]`, `offeredResources` = `[]`, `offeredItems` = `[]`, `withActionKind(…, "walkTo", [])` = `null` and `withConditionKind(…, "hereBelow", [], [])` = `null`.
  - The slice's test „a condition switching to „Zapas poniżej” takes the first of the offered items; with none offered nothing is committed” (`tests/view/program-editor.test.mjs:867`) checks that nothing is committed, but not what the select shows afterwards.
- Possible fixes, both local to `program-editor.ts`, either one sufficient:
  - leave out of the action and condition lists a kind that names a target while no target is offered;
  - or redraw the row to its rule when an edit yields nothing.

  Either fix needs a test that the select shows the rule's kind after such a choice.
