Uwagi doradcy dnia w imieniu Mariusza

**Fix or let through**

1. Fix all three in this request: (a), (b) and (c) (Findings outside the task's scope, 1, 2 and 3).
   - (a) `src/browser/view/scene.tsx:742`, `:749`, `:759`: a flight, a dust cloud, a wolf's run or the 2-second return of the light's tint that is cut by leaving the screen of the run plays again from its start on the return — an overdue effect played, which D-317 drops. Call the same end from the `animationcancel` listener for those elements, as slice 19 did for the walk, and check it in the running game the way slice 19 was checked (cut by leaving the screen, then the return).
   - (b) `src/browser/view/program-editor.ts:796`–`799`: the sentence of a rule writes the temperature with a dot („36.5 °C”) while the number field and the body row write a comma („36,5”). Write the number in the sentence the way the rest of the screen writes it.
   - (c) `guidelines/styleguide-browser-view.md:529-540`: the rule „A name typed by the player breaks in its row” says it holds for every row with such a text, but only the row of the headquarters does it. Make the other places the finding names do it (the program names on the list of Programy, the name in „Kto idzie” on Mapy, the heading of Postać, the names of rule groups), so that the rule is true.
   Why: in each of the three the game does something wrong that the player can see, and (c) leaves a rule of the styleguide that the code does not keep — the next screen built on it will trust it. Each is small, and a round in this open request costs less than a new cycle.
2. Let through: the wolf's sentence checked by tests and the script only (Checks, 2).

**Also in this round (cheap, the files are open anyway)**

3. Minor finding 1: add the test at `tests/view/scene.test.mjs:653` to D-319's list of tests and correct its example that says no test covers a changed target.
4. Minor finding 3: `tests/view/rule-editor.test.mjs:1127` (a test title) and `tests/view/program-panel.test.mjs:1044` (a comment) still write „Zapas poniżej 8 · Patyk” without „szt.” — bring them to the new form.
5. Finding outside the task's scope 4 (`foundations/decisions.md:65-71`): D-04's „only from” list names the memory of the end-of-run window but no other memory of the page the view draws from (the folding, the tab „Kronika”/„Teren”, the filter, the question of „Zakończ”). A list that says „only from” and is not whole is false; widen it to every memory of the page the view actually draws from.
6. Finding outside the task's scope 5 (`guidelines/styleguide-browser-view.md:999`): the sentence about Escape of the end-of-run window cites D-285 (the menu „Konto”); cite the decision that settles Escape of that window.

Let through: Minor finding 2 (uneven wrap), Minor finding 4 (D-144 on purpose), finding 6 (not a finding).

**You accept by merging:** items 3–11 accepted.

