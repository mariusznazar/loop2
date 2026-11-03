# Report — slice 1 of the task `ekrany-i-menu`

**Status:** done with concerns (concerns = the open questions below; none stops the slice)

## What changed and why

File changed: `guidelines/styleguide-browser-view.md` (+75 / -10). Commit `c0211e6` on `task/ekrany-i-menu`
(base `f694d86`). No other file touched. The file is written in Polish, so the new text is Polish; headings of
rules, field names and the marker words stay English as the template gives.

1. Rule *States of shared controls*: the loading line of „Wyślij ponownie" says "w menu „Konto"" instead of
   "z nagłówka"; it also gives „Wyloguj" waiting as „Wylogowywanie…" (D-97, the label D-44 does not list) and
   says the menu stands open while they wait (D-285). *Decision* gained D-97 and D-285.
2. Rule *The kitchen-sink page*: the "header row of an unconfirmed address" became "the part of the menu „Konto"
   for an unconfirmed address" with „Wyślij ponownie" waiting („Wysyłanie…") and the sentence of a refusal,
   built on the page from the DOM forms of the shared controls (D-269). *Decision* gained D-157.
3. Rule *Main button, secondary action and tab*: the Good example now reads „Wyloguj" in the menu „Konto", a
   plain shared button; its last bullet (the menu bar marks the place as a chosen tab is marked) now points to the
   new rule for the look of the items.
4. Rule *A line at a text takes the colour of that text*: the list of lines that stay in `selected` gained the
   bar of the chosen item of the list of programs.
5. New further rule *Menu bar, the menu „Konto” and the list of programs*, placed after the last existing rule,
   before `## Examples`. It gives: the content width (at most 1344 px, full width in a narrower window; a layout
   dimension, D-43); the game's name at the left in `text-strong`, alone on waiting screens (D-262); the items
   (Siedziba, Programy, „Wróć do przejścia · {mapa} · minuta {m}"), links not buttons, no icons; their look as a
   tab without a frame (current: `text-strong` and a line in `selected` of `--bar-width` at the bottom, others
   `text-label`, `highlight` under the pointer, focus by the existing rule); which item is marked (Postać marks
   Siedziba, the screen of a map run none); no disabled/error/empty/loading for items; the failed-save warning in
   the line under the bar, not in the menu (D-97, D-208); the menu „Konto" (shared plain button; open menu as a
   block on `panel`, text in `text`, address, „Wyloguj", the unconfirmed-address part of D-157 with the outcome
   sentence and no mark on the bar; waiting like every shared button; opening and closing and staying open as
   D-285 gives); and the items of the list of programs (links; chosen: `text-strong` and a bar in `selected` of
   `--bar-width` at the left; others `text`; `highlight` under the pointer). Decisions cited: D-280, D-281, D-277,
   D-276, D-275, D-285, D-157, D-97, D-208, D-262, D-44, D-40, D-39, D-43, D-47. `Invariant: none`.

Last grep: no "nagłówk…" word is left in the file.

## Commits

- `c0211e6` docs: :memo: give the menu bar, the menu „Konto” and the list of programs their look and states in the browser-view styleguide, and move „Wyślij ponownie” and „Wyloguj” out of the header (author address `mariusznn@gmail.com`).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, output "0 errors" (nothing reported, so nothing the change caused).
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0 (4 tests OK).
- Not in the slice's *Checks*, run as a read-only extra: `python -B .the-way/instruction-files/check_instructions.py .` — exit 0; compared with the same run at the base commit, the only difference is the size line of the styleguide (398 -> 463 lines); no new warning.
- Not run: `npm test` without a file argument (the full gate is the orchestrator's). Screenshot of the running product: unchecked — the menu bar, menu and list do not exist in the page yet (this slice writes the text of the styleguide only); the states are stated in the rule text, and the orchestrator's walk through the real browser covers the finished screens.
- No test was written (prose for people gets no test, per the method).

## Own-work check

- Requirement most likely missed: a look that no decision, settlement or task passage carries slips into the file (the plan: "a look that would need a meaning no decision carries stays out of the file"), or a rule that names no existing decision. Check: I went through every sentence of the new rule against D-277, D-276, D-275, D-280, D-281, D-285, D-157, D-97, D-208, D-262, D-44, D-40, D-39 and the task passages, and left out what none carries (the questions below). `foundation_check.py` confirmed every cited decision number exists and none is withdrawn (0 errors). Showed: the questions below are the only looks left out; each remaining sentence has its source in the list above.
- Second check: no word "nagłówek" left (grep, empty), so the three header phrases of To do item 15 are all replaced.

## Reaches beyond the handoff

- `foundations/decisions.md:5885-5917` D-281 (whole): to cite the address of the items and of the list of programs. Not named in the slice's *Read*; cited in the new rule.
- `foundations/decisions.md` D-97 and D-208 (first 14 lines of each, with the *Origin* and verification): to cite where the failed-save warning stands (under the bar, not in the menu) and the label „Wylogowywanie…". The task passage (`task.md:136`) carries the placement; the decisions carry the label.
- `src/browser/styles.css:30-75, 220-260` and `src/browser/tokens.css` (token names): to see how the game's name and the tab are drawn today, so that the rule names existing tokens (`--bar-width`, `--font-*`).
- `tests/invariants/test_browser_view_token_values.py` (head) and `src/browser/AGENTS.md`: to confirm the styleguide file is not read by the token-values test (it belongs to the part agent-workflow, `guidelines/**`).
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` and `git.md` (owner's rules): read before editing and committing.

## Mismatches of plan and code

- The slice's *Checks* name `npm test -- tests/invariants/test_browser_view_token_values.py` with the remark "the styleguide's rules stand unchanged where that test reads them". The test does not read `guidelines/styleguide-browser-view.md` (that path belongs to agent-workflow; the test reads files of browser-view). The check passes, but it cannot see the change; one-line note, no adaptation needed.
- The plan says the game's name stands "at the left of the bar" and the rule gives it a role; no decision names the role. I wrote `text-strong` (D-40: "a name"), which is also what `src/browser/styles.css` uses for `header h1` today. If the orchestrator wants this out of the file, it is one bullet.

## Searches not found or unclear

- No decision, settlement or task passage says where in the bar the menu „Konto" stands (right or after the items) or the order of „Wróć do przejścia" among the items. The rule states only "name at the left" and the items; position was left out.
- No source for a divider line in `divider` under the bar (D-276 gives such a line under a group of tabs; D-277 says only how the current place is marked). Left out.
- No source for how „Konto" looks while its menu is open (marked or not), nor for `aria-expanded` or other attributes, nor for whether focus moves into the menu when it opens, nor for how the outcome sentence is announced to a screen reader. D-285 gives opening, closing and focus return only. Left out.
- No source for the look of the open menu beyond "a block on `panel`, text in `text`": frame, divider between its parts, width, placement relative to the right edge. Left out.
- No source for states disabled and empty of an item of the list of programs (can a program item be inactive; what a list with no program shows). The rule gives the chosen, other and pointer states only.
- No source for a kitchen-sink sample of the whole open menu (the plan names only the unconfirmed-address part). Not added; the menu is not one of the seven shared controls of D-44, so D-45's "every shared control" does not demand it. Worth a decision if the orchestrator wants the page to show the menu.
- `check_instructions.py` rule on emphasis in capitals: no warning raised, so nothing to report.

## Questions (for the orchestrator; none blocks, the recommended answer is in each)

1. Position of „Konto" and of „Wróć do przejścia" in the bar — recommend leaving it to the slice that builds the bar, copying the old Loop, unless Mariusz wants it written.
2. A `divider` line under the bar — recommend no line until a screenshot shows the need (the current item already has its line).
3. Open state of „Konto" and its keyboard attributes — recommend one small decision through `the-way-record-decision` before the slice that builds the menu, since D-285 itself records that the styleguide gains a new kind of control worked by the keyboard.

## Choices made

- A separate further rule rather than extending *States of shared controls*: the menu bar items and list items are links, not among the seven shared controls of D-44, so the state list of shared controls does not fit them. Cost if wrong: the reviewer may want the items listed under that rule's "controls that depart" section; moving the text is cheap.
- "Enter on „Konto"" as the keyboard opening (D-285's own example); Space is not claimed, though a native button gives it.
- The sentence of the outcome: colours per D-157 (`text-secondary` when sent, `warning` otherwise), no "positive".
