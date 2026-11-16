# Report — executor of slice 13 (the guidelines follow the change)

**Status:** done

**Commit:** `46e57217` (on top of `7226e369`), message `docs: :memo: the guidelines of the browser view describe one React form of each shared control, … (D-265, D-269, D-407, D-323, D-03, D-44, D-275, D-276)`. The worktree is clean after it. No push.

## Files changed

| File | Added / removed lines |
|---|---|
| `guidelines/coding-browser-module.md` | 185 lines touched in the diffstat (the two files together: 124 added, 100 removed) |
| `guidelines/styleguide-browser-view.md` | 39 lines touched |

No code and no test changed. Fenced good and bad examples of both files are untouched.

### What changed in `coding-browser-module.md`

- Table "Files of this kind": the five rows of the deleted DOM forms removed; no row added, no status changed (question 4 a).
- "TypeScript i DOM": the sentence that a screen not moved yet stays in the DOM APIs replaced by "no screen is built through the DOM APIs", pointing to the rule "Nowy ekran i moduły w DOM".
- "Wspólna kontrolka w dwóch postaci" became "Wspólna kontrolka w jednej postaci" (D-265): one React form in `src/browser/view/controls/`; the panel of a card taken down reads tag, class and role of its warning sentence from `FORM_WARNING`; the test of the React forms is `tests/view/shared-controls.test.mjs`. The meaning of the status `copy` in `controls/` now says a new control is made after the file's pattern as one component.
- "Nowy ekran i moduły w DOM" (D-265, D-407 added): no screen through the DOM APIs; the page builds by hand only the places roots mount in and the panel of a card taken down; the rule on `do not copy` files, pure functions and files added after the last audit kept.
- "Strona wszystkich stanów bez Reacta" became "Strona wszystkich stanów z Reactem" (D-269): bundled by the build step of `scripts/kitchen-sink.mjs`, drawing the React forms, a change of how it is built made in the build step and never in the lines that serve files, output only in `dist/kitchen-sink/`.
- Example of the card: "between the page in the DOM and the screen" became "between the page and the screen"; `createFailureCard` named with `FORM_WARNING`.
- Example "Kontrolki w DOM i ich aktualizacja" became "Kontrolki i ich aktualizacja": the waiting screen's root (`waiting-screen.tsx`), its `update`, `focusRetry`, and the waiting props of `ReactButton` (`waitingText`, `disabled`, `submit`, `kind`, `selected`) and the React forms of the fields and sentences.
- Example "Gra na stronie i odpowiedzi serwera": new paragraph on the page's one value `PageState` (`checking`, `card`, `game`), the one function `change`, the values kept apart in `startApp`, the roots of the places of the page (menu bar, waiting screen, sentences above the game, row of saving, row of the failure, card); the sentence on the row of the failure says it is drawn once at the start in a hidden host and only shown at the error (D-323, D-407).
- *Where in code*: `tests/view/shared-controls.test.mjs` in place of the deleted test.

### What changed in `styleguide-browser-view.md`

- "The kitchen-sink page": the page shows each shared control in its React form, and the menu's part is built from the React forms (D-269); the last paragraph (code only the page needs stays in the entry module) is as it stood.
- "States of shared controls": the paragraph on the DOM and React forms now says one form, a React component (D-265 added to the rule's *Decision*); the list of deviating controls lost "each in both forms" and the paths of the DOM forms (`button.ts`, `select-list.ts`, `number-field.ts`, `pick-cell.ts`); ", w obu postaciach przycisku" removed from the destructive button.
- "Main button, secondary action and tab": `createButton(...)` and `setButtonSelected` removed beside the React props.

## Checks

| Check | Command | Exit code |
|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0; last line `0 errors` (run before the commit and after the last edit) |
| Prettier | `npx prettier --check guidelines/coding-browser-module.md guidelines/styleguide-browser-view.md` | 0; `All matched files use Prettier code style!` |
| Search of both files for a path of a deleted file or a name of a DOM function of a shared control | `grep -nE "controls/(button\|text-field\|number-field\|pick-cell\|select-list)\.ts\|react-controls\|createButton\|setButton\|createForm\|createPassword" guidelines/*.md` (also `postaci DOM`, `postać DOM`, `setButtonWaiting`, `setButtonSelected`, `createTextField`, `createNumberField`, `createPickCell`, `createSelectList` on the two files) | 1 (no match) |
| Instruction-files check, beyond the slice's checks | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 138 warn`); no warning on `coding-browser-module.md`; the warnings on `styleguide-browser-view.md` (`#/mapy`, `#/konta`) and `guidelines/testing.md` are old lines I did not touch |

Not run: `npm test`, `npm run typecheck`, `npx eslint` (no code or test changed; the full run is the orchestrator's).

## Own-work check

- **Requirement most likely not met:** guidelines "describe the state after the change, without its history", and the passages of Decision 8 are all brought in line, with no DOM-form leftovers in either file.
- **Check:** (1) the search above over both files for the deleted paths and DOM function names; (2) a search of the added lines of the diff for words of history (`dziś|wcześniej|kiedyś|dawniej|przeniesion|już nie|usunięt|dopóki|jeszcze`); (3) the full list of lines mentioning `DOM` in each file; (4) a read of every added claim against the code: `FORM_WARNING` in `react-text-field.tsx:101` and `createFailureCard` in `account-card.tsx:674`; the states and methods of `waiting-screen.tsx`; `createFailureRow` and `createSaveRow` in `header-rows.tsx`; `PageState`, `change`, `draw` and `onUncaught` in `app.ts`; the props of `ReactButton`.
- **Showed:** (1) no match. (2) one match, "już nie trzyma" in my text, which I reworded to "nie trzyma" (a description of behaviour, not history, but removed); no other. (3) the remaining `DOM` mentions are all about the page's hand-built places or the rule's ban on the DOM APIs. (4) every claim matched the code.

## Choices made (with the way rejected and its cost if wrong)

- **Rule renamed** "Wspólna kontrolka w jednej postaci" and "Strona wszystkich stanów z Reactem"; example renamed "Kontrolki i ich aktualizacja". Rejected: keeping the old headings. Cost if wrong: two old headings were wrong in meaning ("dwóch postaciach", "bez Reacta"); no other file refers to them (searched the repository outside `.the-way`, `.runs`).
- **D-407 added to the *Decision* of "Nowy ekran i moduły w DOM"** and **D-265 to the *Decision* of "States of shared controls"**, because each rule now states what the entry's binding text says. Rejected: leaving them out. Cost if wrong: a reviewer may find the added citation unneeded; `foundation_check` accepts it.
- **The meaning of the status `copy` in `controls/`** ("a new control is made after the file's pattern, as one component") written by following D-265 alone; the old sentence ("in both forms") no longer holds. Rejected: dropping the sentence, which would leave the status unexplained. Cost if wrong: one sentence to reword.
- **Status `do not copy`:** the old reasoning "these files build elements through the DOM APIs" no longer appears; the rule keeps the instruction (not a pattern for a new screen, pure functions may be imported). I did not state which files build DOM today, since the statuses are the later audit's (question 4 a).
- **Nothing outside the two files was changed:** `guidelines/coding.md` and `guidelines/testing.md` were not touched, since the slice names neither. I did not search them for the DOM forms beyond the search of `guidelines/*.md` above, which found nothing.

## Reaches beyond the handoff

- Read `src/browser/view/controls/react-button.tsx` lines 1-110 and the first 120 lines of `src/browser/kitchen-sink/kitchen-sink.tsx`, `tests/view/shared-controls.test.mjs` (header and test names), `src/browser/view/account-card.tsx:655-715`, `src/browser/view/game-view.ts` (a grep for `createSaveRow`), `scripts/kitchen-sink.mjs:1-60` and `foundations/invariants.md:498-506` (the invariant of the kitchen-sink build): to check the claims I wrote against the code. The slice's *Read* names `src/browser/view/app.ts` and the four new view files; these further reads were to confirm names (`FORM_WARNING`, the props of the button, the save row's owner).
- Read whole, as the method requires for files I change: `guidelines/styleguide-browser-view.md` (all 1042 lines, in two reads).
- Read `.the-way/task-cycle/change/slice.md`.
- Searched the repository (excluding `.the-way`, `.runs`) for the names of the three renamed headings: only `guidelines/coding-browser-module.md` names them.

## Unread material

- `guidelines/coding.md`: read whole.
- `src/browser/AGENTS.md`: read whole (9 lines, about design tokens; no passage bears on this slice).
- `.the-way/product-guidelines/coding/SKILL.md`, `.../styleguide/SKILL.md`, `.../template.md`, `.../coding/template.md`, `.../styleguide/template.md`: each read whole; the skills' further files (`settle.md`, `task_document.md` and the like) were not read, because they lead the refinement and the slice does not run it.
- `foundations/decisions.md`: D-03, D-44, D-265, D-269, D-275, D-276, D-323, D-395, D-407 read whole; D-36 read whole (its output was shown first, in the preview of a command whose later output was cut, and its text was complete); the other decisions of the *Current ranges* (D-45, D-47, D-76, D-96, D-97, D-156, D-157, D-207 to D-211, D-225, D-253, D-261 to D-264, D-266, D-267, D-273, D-274, D-280, D-286, D-288, D-289, D-381, D-402) and the invariants listed were not read: the slice's *Read* names D-36 and Foundation entries rows 1 to 8, which I read.
- `docs/task-cycles/przejscie-widoku-na-react/spec.md`: lines 15-26 and 190-198 (the passages the *Read* names, goal 8 and Decision 8; I read a few lines more of the goals); `task.md`: lines 28-63 (To do item 8 and question 4; I read the whole of items 2 to 8 and questions 1 to 5 in that range).
- Nothing else named was left unread.

## Searches not found or unclear

- none. Note, not a failure: the handoff said the foundation check was red until slice 12; it is green (`0 errors`) now, as the handoff expected from slice 13 on.

## Working copies

None made. The directory `.runs/executor-13/` was not created. No screenshot taken, no page opened in a browser (the slice changes the text of two guideline files only; no screen changes, so `ui_check.md` was not read).

## Problems observed

None. The worktree was clean after the commit (`git status --short` empty).
