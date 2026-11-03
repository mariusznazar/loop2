# Report — slice 4 of task `przyciski-i-zakladki`

- **Status:** done
- **Base:** `1975f89` · **Commit:** `e326fa0` — docs: :memo: write the main button, the secondary action, the tab, the mark of the menu bar and the colour of a line at a text into the styleguide of the browser view, with the answer to a reset-link request in `text` with its bar
- **Variant:** a slice (`.the-way/task-cycle/change/SKILL.md` and `slice.md`, pinned `f45ca40`, which matches the gitlink)

## Files changed

- `guidelines/styleguide-browser-view.md` — +92 / −11

## What changed in the styleguide

Worked as the cycle's author in `the-way-maintain-styleguide`'s column for `implement-task` (`.the-way/product-guidelines/styleguide/SKILL.md`, "Where the skill works"), writing by `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md`. Every meaning comes from the task's answers (questions 1, 1a, 1b, 2, 2a, 2b, 2c, 3, 3b) and from D-44, D-222, D-40, D-274 to D-277 and D-279. No value is written into the styleguide; it points to roles and tokens.

- **States of shared controls**
  - *Decision* is now `D-38 · D-44 · D-222 · D-274 · D-275 · D-276 · D-279`.
  - *Good* now uses the main button and the answer in `text` with its bar.
  - The loading paragraph: the answer to the reset-link request stands in `text`, with a bar on its left in its own colour (`currentColor`) of `--bar-width`, with no colour of its own, never in `warning` or `positive`.
  - The paragraph on fields: the sentence is now in `text` with its bar, and the button that sends a form "is the submit button and has the main look (D-274)".
  - The list of controls departing from the states:
    - the `button.ts` entry now adds that the pace buttons keep the selected look (D-276), that loading covers the main look too, and the main look in all its states (D-274);
    - two new entries by the path `src/browser/view/controls/button.ts`, for the secondary action (D-275) and the tab (D-276), each with its departures and its look in each state. Their loading reasons match the kitchen-sink page's reasons from slice 3 word for word in substance (the secondary action is disabled; the tab is disabled and keeps the line of the choice).
- **The kitchen-sink page**
  - *Decision* is now `D-38 · D-44 · D-45 · D-269 · D-274 · D-276`.
  - The page shows each control in its DOM form (D-269), the button also in the main look and as a tab, chosen and not chosen, and the form „Nie pamiętam hasła” with the answer in `text` with its bar.
- **New further rule "Main button, secondary action and tab"** (D-274 · D-275 · D-276 · D-277), placed after the nine required rules:
  - the main look belongs only to the button that sends a form, one per form, with no kind or class of its own; actions outside forms keep the button D-44 gives them, and the task of their screen settles the main actions outside forms (question 1b);
  - the secondary action covers only actions that open or leave a form's state and stand under it; such an action stays a button, never a link, and every other action keeps D-44's button;
  - the tab is a look of the button selected in its group: same element, `aria-pressed` and keyboard as that button, no arrow keys and no `role="tab"`; its container gets the class `tabs`, and the pace buttons stay as they are;
  - the menu bar marks the player's current place with `text-strong` and the same line in `selected` (D-277), never with green, a background or a frame.
- **New further rule "A line at a text takes the colour of that text"** (D-279 · D-39 · D-40): the principle of question 3b. A line that marks the one chosen in its group stays in `selected`.
- **Every wording that gave the answer `text-secondary` is gone.** The only `text-secondary` left beside the answer is the *Bad* line of the new line rule, which shows that very mistake on purpose.
- The nine required rules stay in the template's order (D-38). The table Roles, *Examples* and *Where in code* are unchanged. No screen was audited.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before commit) | 0 | `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` (after commit `e326fa0`) | 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py .` (with the change; base by `git stash`) | 0 / 0 | Output is the same as at base except the size line of the styleguide (317 → 398 lines). No dead path, no import and no emphasis warning for the file. I ran this beyond the slice's *Checks* because the root `AGENTS.md` names the styleguide, so it is read as an instruction file (note in `.the-way/product-guidelines/template.md`). |

- Not run: `npm test`, the product's gate. The handoff and `make-change` §3 leave the full suite to the cycle.
- No test was written. The change is prose for agents and people, and the product has no test that reads `guidelines/styleguide-browser-view.md` (`grep -rln styleguide-browser-view tests/ scripts/` found nothing).
- `ui_check.md` does not apply, because this slice changes no screen. I took no screenshot.

## Own-work check (§3)

- **Requirement most likely missed:** that "every wording that gives it `text-secondary` goes", and that the nine required rules keep the template's order.
- **Check:** a Python script run from stdin over the file (output in `/tmp/claude-0/-home-user/3ebadaf3-39b4-5e1f-a5be-1c18fe7c07c8/scratchpad/own.txt`), exit 0. It:
  - compares the headings under `## Rules` with the template's nine in order;
  - checks that every rule has *Decision*, *Invariant*, *Good* and *Bad* in that order;
  - lists every paragraph that holds `text-secondary` together with „prośb” or „odnośnik”.
- **Result:**
  - The first nine headings are in order (`True`), followed by the two further rules, and all 11 rules have the four fields in order.
  - At `HEAD` before the change, the same paragraph filter finds 4 hits (positive control). After the change it finds 1, the deliberate *Bad* line.

## Reaches beyond the dispatch

- `foundations/decisions.md:2409`, the heading of D-130 only. I checked that the new rule's citation "Przyciski tempa (D-130)" names an existing decision about pace; D-276 names D-130 for the pace buttons.
- `src/browser/view/account-card.tsx`, a grep for `kind="secondary"`, `kind="tab"` and `disabled=`. I checked that the card disables its secondary actions and tabs while a form waits, which the new loading reasons say.
- `/home/user/the-brain/.ai/rules/scripts.md`, the user's rule on scripts. I read it after the first edit script had run, so I then checked the file's line endings: `i/lf w/lf`, no CR in the diff, no backslashes in the inserted text.
- `.the-way/instruction-files/check_instructions.py`, run as described under Checks.
- `.runs/task-cycles/przyciski-i-zakladki/reports/planner.md:36`, the planner's note about `--bar-width`.

## Choices made, with the way rejected

- **The new matter goes into two further rules after the nine required ones, not into the required rules.** The principle of question 3b could have gone into "Each role in its meaning", and the places of the three looks into "States of shared controls". If this is wrong, the cost is two more headings to read. In exchange, each rule is cited by its own decisions, and the required rules stay at their template's scope.
- **The secondary action and the tab are separate entries of the departing list, each under the path `button.ts`.** The other way was one longer `button.ts` entry. The plan asks for entries "by their paths", and separate entries keep each kind's departures readable. If this is wrong, the cost is the path repeated three times.
- **`react-button.tsx` is not added to the departing list.** The existing list names each control by its DOM file. The React form draws the same tree (D-265), and the test that compares the two forms keeps them alike.
- **"Every value with its source" is left unchanged** (the planner's open judgement). The value of `--bar-width` (2 px) did not change and is still covered by the listed source "grubości ramek i belek — ustalenie zadania" (the task „Styleguide loop2”, Q11). The new part of its `Source:` names the choice that widened its uses, and the list of the rule is scoped to that earlier task. Adding a general kind "a choice from a preview in a later task" would carry a meaning no answer settles. The cost if the reviewer judges otherwise: the rule does not name the later task's choice as a kind of source, though the token's comment does.
- **D-130 is cited by number in the new rule.** I read only its heading and did not reread it whole; D-276 is what binds the pace buttons.

## Problems observed

none

## Searches not found or unclear

- No test or script of the product reads the styleguide (`grep -rln "styleguide-browser-view" tests/ scripts/`, nothing found), so no automatic check of the file's form exists beyond `foundation_check.py` and `check_instructions.py`.
- Whether the list of sources in "Every value with its source" should name the later task's preview choice is unclear (see Choices). I judged it does not need to, and I am not asking a question because the plan does not ask for it.
