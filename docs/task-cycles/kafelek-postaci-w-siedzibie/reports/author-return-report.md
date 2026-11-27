Status: done

# Author report — the return step (kafelek-postaci-w-siedzibie)

## Return step

- **Foundation compared with code.** Compared at head `aeb2711a` with the code of the change:
  - the entries the change writes or changes: D-280, D-446, D-447, D-39, D-42, D-217, D-246, D-44 and D-389 (rationale and *Rejected*), each read again against `src/browser/view/team-cards.tsx`, `headquarters.tsx`, `away-report.ts`, `react-button.tsx`, `styles.css` and `headquarters.css`. All of them match the code, with one exception, corrected: D-42's pair of examples held, as a complies item, the green frame of a card on a card with no background of its own. A test now holds that part: the case „a card whose character's earning loop goes on has a frame in positive …” in `tests/view/headquarters-screen.test.mjs`, which cites D-42 and reads the frame and the absent background through the real stylesheet. So that item moved to the clause `tests:` of D-42's *Verification*, and the pair keeps only what no test holds (`return_step.md`).
  - the pairs of the other entries: the D-217 complies item (the role `text-secondary` of the line under „Drużyna”) is held by no test through the stylesheet and stays. The D-44 violates item (a screen-made `<button>` with a dashed frame) is held by no test either, since a hand-made `<button class="button dashed">` would pass, and it stays. D-39, D-280, D-446, D-447 and D-246 add no pair item.
  - the entries the task names (*Decisions in play*): D-218, D-244, D-245, D-282, D-287, D-54, D-51, D-52, D-279, D-275, D-43, D-40, D-265, D-396, D-418, D-419, D-38. Their binding sentences hold at HEAD. D-245's „on the character's card and screen” is the card's line of a stop. D-51's verification „the headquarters of an empty team saying so beside the creation of a character” is the sentence beside the open tile. D-275 covers „Anuluj” of the open tile by its definition (it opens and leaves the state of a form and stands under it).
  - the search of the whole foundation by the names and words the code adds or removes: „Gdy cię nie było”, „Pętle, które stanęły”, „Nowa postać”, `reportEntries`, `reportTitle`, `team-member-resurrection`, `character-creation`, `team-cards`, dashed button / przycisk przerywany, the counting sentence, „Bez ciebie”, „card of a character”, „its card”, „on Siedziba”, „headquarters”, „Imię nowej postaci”, „Odbierz”. The removed titles now stand only in D-246's *Rejected*, as ways rejected. Every other hit matches the code: D-244 verification „on the card of its character on Siedziba”, D-274's complies „an action of the headquarters made with the plain shared button”, D-287's complies „„Załóż” on Siedziba creating a character”, D-207's „„Zamknij” of the report”, D-184 and D-218 „the headquarters”.
  - the part map entry `browser-view`: `src/browser/view/team-cards.tsx` falls under `src/browser/view/**`; the change adds no trust boundary and no dependency. No change.
  - the guidelines: the styleguide's rule of the section „Drużyna” and the rules the change edited match the code. In `guidelines/coding-browser-module.md`, the table *Files of this kind* has no row for `team-cards.tsx`, which that file's own rule allows for a file added after the last audit. Its list of the kinds of the button was never complete, so it needs no edit.
- **Decisions written or changed in this step:** D-42 — *Verification* only: a new part of the clause `tests:` and one complies item removed. The binding sentences are unchanged. Place: `foundations/decisions.md`, D-42.
- **Invariants:** none written or changed. The invariants the change reaches still hold: design-token-contrast (the frame adds no pair, D-42), browser-view-token-values, browser-view-focus-outline, browser-view-framework, application-build-kitchen-sink and loop-practice-payment (the simulation is unchanged). No search hit in `foundations/invariants.md` names the screen's changed parts. No rule the task, a decision or the human sets asks for a new one.
- **Environment facts:** none. The change rests on the predecessor's code (old Loop, `origin/test` 715026e) only as the model the human compares against. The task cites it, and the decisions name it in their rationale, as the log's earlier entries do with no fact entry („as in loop”). No binding sentence rests on a citation that would turn false.
- **Glossary terms:** none written or changed. I read every use against each entry:
  - „headquarters” (the screen Siedziba with the team and the chest) still holds;
  - „at the camp” matches the card's „W obozie”, which `statusLine` gives exactly where the character is in no manual map run and no earning loop;
  - „secondary action” covers „Anuluj” under the open tile.
  - „card”, „tile”, „dashed button” and „kafelek” are used in the meaning a reader of the user-interface field gives them: a framed box of content, and a button with a dashed frame. No English sentence of the foundation reads them differently, so they take no entry (WAY-95). „kafelek” stands only in the Polish styleguide, which the glossary rules do not search.
- **Part-map changes:** none.
- **Projected entries:** none. The plan item assigns none (task document, *Decisions in play*).
- **Rows of *Settlements to record* written:**

| Row | Goes to | Written where |
|---|---|---|
| 1 | guidelines: styleguide | styleguide rule „The section „Drużyna” of Siedziba” (the grid, two in a row on a phone) |
| 2 | D-446 | D-446, third binding sentence |
| 3 | D-447 | D-447, second paragraph |
| 4 | D-39 | D-39, paragraph on the frame and dot of a card |
| 5 | D-42 | D-42, first paragraph (the frame against `panel` and `highlight`); its test clause after this step |
| 6 | D-217 | D-217, second sentence |
| 7 | D-246 | D-246, first paragraph (lines in the card, under a line, „Odbierz” opening no screen) |
| 8 | D-280 | D-280, second paragraph |
| 9 | guidelines: styleguide | the same rule (the card under the pointer on `highlight`) |
| 10 | guidelines: styleguide | the same rule (the dashed „+ postać”, open in place, open at once for an empty team) |
| 11 | D-246 | D-246, second paragraph (the counting sentence, one „Zamknij”) |
| 12 | D-246 | D-246, second paragraph („Skrzynka jest pełna.” once, after the sentence) |
| 13 | guidelines: styleguide | the same rule („Anuluj” and Escape; none for an empty team) and the rule „Main button, secondary action and tab” |
| 14 | guidelines: styleguide | the same rule (frame in `control-border`, no background of its own) |
| 15 | D-44 | D-44, fifth paragraph; styleguide rules „States of shared controls”, „Main button, secondary action and tab”, „The kitchen-sink page” |

## Commits

- `61584722` docs: the clause `tests:` of D-42's *Verification* names the green frame of a card, which the test of Siedziba holds, and keeps no pair of examples for it (D-42).

## Checks (command → exit code)

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 („0 errors”), after the edit |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 (0 error, 0 warn) |
| `npm test -- tests/view/headquarters-screen.test.mjs` (the test that holds the moved part and cites D-42) | 0 (37 pass) |

Not run: the full gate (the handoff asks it to wait); no other test, since no code or test file changed.

## Unread material

- `foundations/glossary.md`: the entries „headquarters”, „at the camp”, „secondary action” read whole; the other entries by their headings only.
- `foundations/invariants.md`: searched by the words above; the entries design-token-contrast and loop-practice-payment read whole in the first round; the other invariants of the part `browser-view` (61 hits of *Part*) by their headings only.
- The glossary skill's `write.md`: not read, since no glossary entry was written.

## Searches not found or unclear

none

## Working copies and remainders

- `.runs/author-return/` (the log of the focused test): removed.
- No browser and no background process was started in this step.
