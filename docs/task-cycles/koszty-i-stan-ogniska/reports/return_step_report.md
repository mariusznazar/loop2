# Return step — koszty-i-stan-ogniska

Head read at the start: `0611dfa42e681d1b264e1352fdc6a0d9defcbcfb`. Read whole: `return_step_handoff.md`, `.the-way/task-cycle/skill/return_step.md` (and, in the first session, `foundation_step.md`), the decisions' template and skill files (first session), WAY-36 and its precedence entry in the-way's log (`.the-way/foundations/decisions.md`), the glossary template's "Which words take an entry", the glossary, `review_fix_report.md`; of `review_whole_report.md` the findings and coverage sections.

## Status and commits

`done`. One commit: `92e0baed` — `docs: :memo: state in D-362 that the price takes the role of the action's name and names the first item of a use, and link D-310` (`foundations/decisions.md`, one entry). Not pushed. A fresh reviewer must review this range (`0611dfa..92e0baed`), since the return step committed.

## The fields of *Return step*

- **Foundation compared with code:** every entry the change wrote or changed, those the task names, those the search found, and the part map were compared with the code of `0611dfa`. What no longer matched, corrected in `92e0baed`: D-362 did not say two things the code does and the task settled or the code now binds — the price stands in the same text as the action's name (task answer 2: "tym samym tekstem co nazwa, więc nie potrzebuje nowej roli … szarzeje razem z wyszarzoną komórką"), so it takes the name's role and dims with a greyed cell, and an action that takes a piece of a use names the first item the data marks for it (code: `actionPrice` through `firstItemFor`, the same piece the reason of D-310 names). Both are now in D-362's binding sentences, the second one's cost in its *Rationale* ("Accepted with it"), a complies example „Zasil — ognisko (1 patyk)” and a relation `derives from D-310` since the sentence cites it. Everything else matched, entry by entry:
  - **D-362**: place (panel cells, greyed included, the chosen action, not the row: `actionPick` label, `rule-list.tsx` untouched), wording and forms (`countedName`, `plural` in `resources.ts`, `NATURE_ENERGY_NAME` in `actions.ts`), no price for what takes nothing (`actionPrice`), follows the character of the map run and the data's price outside one (`actionPriceText` with `state.run?.character.skills ?? {}`): matches. The text of M4 (the energy's forms now in the data of the actions) does not contradict „the energy by its full name”.
  - **D-70**: burning draws `campfire.svg`, no minutes left (including crafted and never lit) draws `wood-pile.svg`, minutes only in the tile's row (`terrain-picture.ts`, `tile-list.ts` unchanged): matches.
  - **Environment fact `game-icons-wood-pile-title`** and **`icon-credits` *Rests on***: heading "Wood Pile icon" as the footer and `test_icon_credits.py` `TITLES` carry it; the credit sentence of `wood-pile` (M1) is its own, and `icon-credits` only asks that the credit "says how the icon file differs from its source", which it does: matches.
  - **Named by the task's *Decisions in play***: D-27 (the file is from game-icons.net, kept in `assets/icons/`, holds nothing that runs or refers outside, credited in the footer and the section of the login card): matches; D-19 (no number on the drawing, `terrain-drawing-numbers` passes): matches; D-43 (the icon holds its colour in its file, `#f4f4f5`): matches; D-63 (price = sticks and nature energy, „Czysty płomień” takes no sticks, same energy): matches, and the code now has one rule for the sticks of lighting (`campfireLightCount`) used by the effect, the refusal and the price; D-145 (a strike keeps its stick, no price): matches; D-288, D-289, D-290 (the pick's groups and greying, the actions' names are unchanged), D-291 (icons unchanged), D-293 (the time stays in the row and in the panel, beside which the price stands), D-310 (reasons unchanged, `lacking` and the refusal of lighting give the same words), D-316 (the scene's campfire is the scene's own picture, unchanged), D-357 and D-358 (screenshots in the public repository on the branch of the cycle, pushed by the owner's `gh` account; none in this repository): match. The glossary entry „extinguished campfire” (no minutes of burning left, burnt out or not yet lit) is what the new icon is drawn for in both cases.
  - **Found by the search**: D-72 (a campfire stands on a revealed tile; the drawing shows its icon) and D-68, D-69 (extinguished campfires and feeding): match. The foundation has no other sentence on the credits' statement of change (M1) or on the forms of the energy's name (M4): the search of `foundations/` and `guidelines/` for „zmienion”, „energii natury”, „jasny kolor” and „icon” found only the credit lines and tests already listed.
  - **Part map** (`browser-view`, `simulation`): the new file `assets/icons/wood-pile.svg` lies under `assets/icons/**` (a trust boundary already named), no new source or test file was added outside `src/browser/view/**`, `src/browser/sim/**`, `tests/view/**`, `tests/sim/**` and the listed invariant tests; the *Depends on* lines hold (`browser-view` imports the data of `simulation`, as before): no change.
- **Decisions written or changed:** D-362 (written in the foundation step, changed here); D-70 (changed in the foundation step, nothing here).
- **Invariants written or changed:** none. `icon-credits` *Rests on* gained `game-icons-wood-pile-title` in the foundation step, set by the invariant's own rule; no new invariant, since no rule of the task, a decision or the human asks for one beyond `icon-credits` and `icon-file-content`, which cover the new file. A rule "the price shown equals what the simulation takes" is behaviour the new test in `tests/sim/campfire.test.mjs` checks, which no task or decision sets as a rule, so it is no invariant.
- **Environment facts:** none new in this step. `game-icons-wood-pile-title` was written earlier. Looked for and not needed: the Polish rule for the form after a count (a language rule my code applies, not cited by any decision's *Based on* or any invariant's *Rests on*, so by the template no fact stands for it); the author and licence of `wood-pile` (the `game-icons-licence` fact names Delapouite and CC BY 3.0).
- **Glossary terms:** none. „Price” (cena) is used by D-63 and D-175 in the same sense D-362 gives it (what an action takes from the backpack and from nature energy), and the field's meaning of the word does not make a sentence of the foundation false, so WAY-95 gives it no entry; no term is used against its entry (the glossary's „extinguished campfire” is used in its own meaning).
- **Part-map changes:** none.
- **Projected entries written whole or in part:** D-362 (the definition's "(new) — Where does the player read what an action costs?", whole, with rows 1 to 3) and D-70 (the definition's changed D-70, whole), both in the foundation step. D-27 and `icon-credits` (the definition's projected texts name only the section of credits): the code makes the part about the new icon true, and the foundation's present texts already say it; the changed sentences (the section of credits in the Siedziba, the footer gone) are zadanie 24's, so nothing is written for them here.
- **Rows of *Settlements to record* written:** row 1, row 2 and row 3 — all in D-362 (one entry, since the three rows answer one question; row 1 in the first sentence, row 2 in the first and second, row 3 in the third), as in the foundation step.

## Choices of the author's reports that bind after the merge — each judged by WAY-36 and its precedence entry (the default is an entry unless the task or its spec excludes one; the task excludes none of these, and a candidate left out of its *Settlements* is no exclusion)

1. **The plural forms in the data of things** — written (D-362, 2nd sentence: "the data of the game's things hold the plural forms of their names"). The shape `{ few, many }` beside the unchanged `name` is code, not a rule.
2. **The price in the label of the pick cell** — the rule that binds is that the price is the same text as the name and takes its role (task answer 2): written now into D-362. The way it is carried (a part of `PickCell.label` and not a separate field) is how the code is made, which a later change can rework without contradicting any entry; it stays a row of the questions table (the reviewer's O1 is its cost and goes to the request's list, as the handoff says).
3. **The price function** (`actionPrice`, `campfireLightCount`, in the simulation) — D-362's *Scope* already names `simulation` and its first sentence says the price is read from the game's data and follows the character; the placing of the function and the single copy of the „Czysty płomień” rule are structure, protected by the consistency test, and set by no rule. Row of the questions table.
4. **The first piece of a use** — a rule that later work meets when the data gets a second fuel, food or lightable item: written now into D-362 (2nd sentence), with its cost in *Rationale* and a complies example.
5. **The data of the extinguished icon** (`CAMPFIRE.extinguished = { name, icon, iconTitle }`) — that the icon file and its title stand in the data and not in the view is already bound by D-18 (invariant `content-identifiers`) and D-316 for pictures, and D-27 for the credit; the shape of the field is code. Row of the questions table.
6. Not in the handoff's list, judged for completeness: the per-icon statement of change (M1) is an application of `icon-credits`' existing rule, and the forms of the energy's name in the data of the actions (M4) fall under item 1's rule; no entry for either.

## Checks (command, exit code)

| Check | Command | Exit |
|---|---|---|
| foundation check after the entry | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| head and tree | `git status --short` (empty after the commit); `git log --oneline -1` = `92e0baed` | 0 |

Tests whose citations changed: none (no test cites D-362's text; the comments that name D-362 in `program-editor.ts` and `rule-editor.test.mjs` still hold). Not run: `npm test`; code tests (no code changed in this step).

## Unread material

- `review_whole_report.md`: read its findings and coverage sections, not the checks or declined-to-judge parts; `review_whole_handoff.md` and `review_fix_handoff.md`: not read.
- The decisions' `examples.md` entry WAY-03 and the invariants' `decide_entry.md`, `draft.md`, `write.md`: not read (as in the foundation step; this step changed one existing decision only).
- The whole decision log of the product was not read; the search used grep for the terms named above and read each entry found whole.

## Searches not found or unclear

- Not found: any decision stating which piece an action takes when several items serve a use; the one sentence now written in D-362 is the first.
- Not found: a decision or glossary entry giving „price” a meaning other than D-63 and D-175 use.
- Unclear: whether WAY-36's default makes item 2's carrying way (the label) an entry; I judged it code structure (a later change reworks it without contradicting an entry), which the precedence entry's price clause calls the cost of leaving it a row. The orchestrator may overrule.

## Reaches beyond the handoff

- `.the-way/foundations/decisions.md` (WAY-36 and the entry that gives it precedence over WAY-22 and WAY-18, lines about 969 and 9290), to judge the choices that bind after the merge.
- `.the-way/task-cycle/record_template.md` (the fields of *Return step*) and `.the-way/elements/glossary/template.md`, to write the report's fields and judge „price”.
