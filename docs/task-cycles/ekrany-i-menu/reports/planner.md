# Planner report — ekrany-i-menu

- Status: done with concerns
- Plan: `docs/task-cycles/ekrany-i-menu/plan.md`
- Size report: `docs/task-cycles/ekrany-i-menu/plan-size.md` (last run: every one of 12 slices `fits`)
- Commits: none
- Method: `.the-way/task-cycle/plan/SKILL.md` at the pin `f45ca40`, read whole; worked from the worktree root.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `python -B <scratchpad>/ranges.py <scratchpad>/ranges.txt` (a throwaway script outside the repository listing the line range of each entry of `foundations/decisions.md`, `invariants.md`, `glossary.md`, `environment_facts.md` at the base) | 0 | ranges used in every *Read* |
| `python -B .the-way/task-cycle/slice_size.py docs/task-cycles/ekrany-i-menu/plan.md` (first) | 1 | slices 4, 7, 8, 9, 10, 11 `unchecked`: their *Read* named files an earlier slice creates, which do not exist at the base |
| same, after naming those files without backticks | 0 | all 12 `fit`; largest: Slice 8 ≈ 205 000 estimated tokens, Slice 7 ≈ 189 000 |

Not run, as the handoff gives: `npm test`, `python -B .the-way/elements/common/foundation_check.py`, any focused check named in the slices.

## Step 2 — open design choice and reserved choice

- Reserved choice: none. D-270 forbids a router library; the addresses are product code (Choice 1).
- Open design choice: none found. Every place where the task stops short of how — the screen after a conflict rebuild, where the uncertain-logout sentence stands, what `#/programy` shows, how the bar's items and the list's items look, where the sentence beside the inactive buttons stands — is settled within the meanings the task and the log already carry. Each is listed under *Choices* in the plan and listed again below. The looks in particular use only existing roles in their D-39/D-40 meanings (WAY-172: the cycle writes no new meaning).

## Order of the slices and the styleguide's example

The styleguide's example order is: environment and library, then values in their source, then one screen, then its states. The plan follows it in spirit. No library or token value changes. The styleguide text (Slice 1) and the shared control (Slice 2) come first. The pure addresses come next (Slice 3), then the three React parts on their own (Slices 4–6). Only after that come the page (7), the screens by address (8), Siedziba (9) and Programy (10). The coding guidelines come last (11), because they describe code that already exists, and the browser walk closes the cycle (12). One departure: the styleguide slice comes before any code. The looks of the bar and the list are settled in text first, so that Slices 4 and 6 build to it.

## Concerns

1. **D-62 becomes untrue (row E36).** D-62 says „Zakończ” "returns to the screen from which the player sends the character". After Slice 8, „Zakończ” leads to Postać while sending stays on Siedziba. The task does not list D-62. The definition's projected D-62 reads „returns to the screen D-53 gives”, and the project plan assigns D-62 to task 16. Proposed answer: under WAY-126, the foundation step writes only that clause of the projected D-62 and leaves the rest of it to task 16. Evidence: `foundations/decisions.md:1229-1242`; `definicja_mvp2_loop2.md`, Projected foundation changes, D-62 (line 554); `plan_mvp2_loop2.md`, the projected-entries table, row D-62 → task 16. D-132 and D-173 have the same problem in a *Verification* example („returns to the headquarters”), rows E37 and E38.
2. **The word "card" (row E39).** It means the login card (D-96, D-262, D-278) and, in the projected D-217, D-244 and D-245, a character's card on Siedziba. The foundation step's search should judge whether that needs a glossary entry. D-218 names only the headquarters for „pokolenie {n}”, but To do item 4 shows it on Postać too.
3. **Task items 15 and 16 name the wrong tool for the cycle.** They say the guideline changes go "through `the-way-maintain-styleguide`" and "through `the-way-maintain-coding-guidelines`". Both skills say they run inside a refinement and never write the guideline file. In the task cycle the author writes the file from `product-guidelines/template.md` and the discipline's `template.md`. Slices 1 and 11 do that and run neither skill. The orchestrator may want to say so in the request.
4. **Looks chosen by the plan, not by the human.** These looks come from the plan's choices, not from the task:
   - the items of the bar other than the current place drawn in `text-label`, like a tab that is not chosen;
   - „Konto” as the plain framed shared button;
   - the menu as a block on `panel`;
   - the chosen program marked by a bar in `selected` at its left.

   All of them use existing meanings, but Mariusz has not seen any of them. They appear first in Slice 12's screenshots.
5. **Temporary states between slices.**
   - Between Slice 7 and Slice 8, „Programy” on the bar leads nowhere new.
   - Between Slice 8 and Slice 10, Siedziba still holds the program panel and Programy shows the panel alone.
   - Between Slice 8 and Slice 9, Siedziba still shows the skills.

   Each slice's focused tests pass at its end. Only the finished change is whole.
6. **Size of Slices 7 and 8.** Both change `tests/view/account-screen.test.mjs` (4 377 lines), as do Slices 9 and 10. Slice 8 carries the most risk and gets the strongest model.
7. **Files an earlier slice creates are listed in *Read* without backticks.** Examples are `screen-address.ts`, `menu-bar.tsx`, `character-screen.tsx` and `run-screen.ts`. The size script therefore does not count them. They are expected to be a few hundred lines each. The orchestrator's handoff should still pass them on.
8. **Slice 12 changes no file.** It covers To do item 18. The orchestrator may run it itself instead of giving it to an executor.

## Guidelines found missing or uncertain

- `guidelines/styleguide-browser-view.md` has no look for links in the game. Only the focus rule mentions links of the footer. The bar's items, the list's items and the name on Siedziba are links. Slice 1 adds their look.
- The kitchen-sink rule (D-45, D-269) asks for every shared control in every state. The bar's items and the menu „Konto” are not shared controls under D-44's seven. To do item 15 nevertheless asks for their "wygląd i stany". Settled in the plan: only the menu „Konto”'s part for an unconfirmed address moves onto the page, built from the DOM controls. Whether the items should have samples too is open for the human.
- `guidelines/coding-browser-module.md`, *Files of this kind*, says a DOM file added after the last audit "nie ma w niej wiersza". To do item 16 asks for rows of new files. Slice 11 follows the task and adds `run-screen.ts` as `do not copy`.
- `guidelines/coding-browser-module.md` has no example of a React part held inside the DOM page beside DOM screens, such as the menu bar in the header. Slice 11 adds one.
- `guidelines/testing.md` says nothing about testing the history or `hashchange` on jsdom. The plan uses a fake `PageAddress`, as `account-screen.test.mjs` already does, so the real `browserAddress` is checked only in the real browser (Slice 12, D-88).
- Selecting guidelines for the slices that change only guideline files (Slices 1 and 11): `coding.md` and `testing.md` both list agent-workflow under *Applies to*. Editing Markdown is neither code nor a test, so `product-guidelines/reading.md`'s classification selects neither file for Slice 1. Slice 11 reads `coding.md`. This reading of the rule is uncertain.

## Reaches beyond the handoff

- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp2_loop2.md`: a search for D-62, D-132 and D-173, and the passages at lines 545–575, 685–700 and 835–850. Why: to check how the definition projects the clause of „Zakończ” (concern 1).
- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\plan_mvp2_loop2.md`, lines 40–110 (the projected-entries table). Why: to see which task writes D-62, D-132 and D-173.
- In the pinned `.the-way`: `product-guidelines/reading.md`, `product-guidelines/styleguide/SKILL.md`, the first 60 lines of `product-guidelines/coding/SKILL.md`, and `task-cycle/slice_size.py`. Why: to learn how guidelines are selected and written in a cycle, and how size is measured.
- In the product: `package.json` scripts, `scripts/build.mjs` (`--check`) and `scripts/kitchen-sink.mjs` (`--build-only`), to name runnable checks. Also `src/browser/sim/game.ts` (the `send`, `restart`, `end`, `setPaused` functions), the list of `tests/invariants/` and `tests/quality/`, and the case names in the `tests/view/*.test.mjs` files the slices touch.

## Searches not found or unclear

- `.claude/skills/loop2-play/SKILL.md` names no screenshot command for Playwright CLI. Slice 12 checks the CLI's help, or uses Playwright MCP's screenshot.
- No decision or task item says where the sentence of an uncertain logout stands once „Wyloguj” moves into the menu. Plan choice: in the menu.
- No decision or task item says which screen opens after a game is rebuilt after a conflict (D-209). Plan choice: the screen the address names.
- No decision or task item says which screen opens after a sign-in that brings back the kept state (D-211). Plan choice: treated as a form sign-in.
- The task gives the address `#/programy` but not what it shows. Plan choice: the first program of the list.
- "Przy nieaktywnych przyciskach" (To do item 8) does not say whether the sentence stands once per row or once for the team. Plan choice: once per row.
- the-way's own glossary at the pinned commit was not read ("Reading the foundation", step 4). No term of this task seemed to need it.
- The task's line numbers are from `20d804b`, which is the base. No drift.

## Questions still open

1. Does the foundation step write the D-62 clause (E36), and correct the D-132 and D-173 examples (E37, E38), in this task? Proposed answer: yes. WAY-126 asks the task to record the part its code makes true. Without it, the merged foundation would say „Zakończ” leads to where characters are sent from.
2. Does "card" need a glossary entry (E39)? Proposed answer: let the foundation step's search decide. If it does, write it with the projected D-217.

Neither question blocks the slices: Slices 1–7 do not depend on E36–E39.
