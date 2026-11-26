done

# Report of fix-foundation (part 2 of the fix of the whole-change review: foundation entries and guidelines)

## Commits

- `556f5a7d` on `task/wyposazenie-postaci` (parent: `2766ad25`, the head part 1 left): `foundations/decisions.md`, `foundations/glossary.md`, `guidelines/coding-content-data.md`, `guidelines/coding-saved-game.md`, `guidelines/testing.md` — 10 insertions, 7 deletions. No code and no test changed.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0 ("0 errors"), run before and after the commit.
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0 ("0 error, 0 warn, 121 info"), run before and after the commit.
- No other check run: no focused check of code applies, the fix changes no code; the product's gate (`npm test`) is not run, by the boundary of the handoff.

## Per finding

All entries below are marked `the cycle's` (they fix the review's findings; no row of *Settlements to record* carries them whole). One sentence of each meaning, English and Polish, follows each.

4. D-380, first paragraph (`foundations/decisions.md:8369`) — fixed by qualifying, not dropping. Six tests cite the first sentence's start by `decision:` lines up to "short of a thing in the backpack" (`tests/sim/rule-signs.test.mjs:99,246,262,393`, the quote ends before my addition); dropping „Uderz — patyk” from the list would break those citations, and the tests are part 1's. After "such as „brakuje 4 × patyk”" the paragraph now reads "the lack of a stick for „Uderz — patyk” being as the third paragraph gives it;". The third paragraph is unchanged. Meaning: the strike is short of a stick only where it lies neither in the main hand nor in the backpack, and the first list no longer says otherwise. PL: Cios patykiem brakuje patyka tylko wtedy, gdy ten nie leży ani w ręce głównej, ani w plecaku, a pierwsza lista już temu nie przeczy.
5. Glossary „combat turn” (`foundations/glossary.md:176`) — fixed: "the character none when it finds no feasible rule whose action it can carry out in combat (D-140, D-146)", which holds for a turn of „Załóż” (D-140 allows it in combat). Still one sentence. D-146's own wording, "no feasible combat rule", is not in the findings and is left; the glossary now cites D-140 beside it. Meaning: the character has no action in a turn only where no program rule it finds can be carried out in combat. PL: Postać nie ma czynności w turze tylko wtedy, gdy nie znajduje reguły, której czynność da się wykonać w walce.
6. D-463 *Rejected* (`foundations/decisions.md:12895`) — fixed: "the page removing the character's stored judgings from the browser at the act of the change — another device or browser keeps a badge that lies, which the reading against the game state at hand (D-441) was made to prevent." Taken from the plan's *Choices* row (plan.md line 640), the way rejected and its cost. Note against the decisions template ("Rejected of a decision marked the cycle's takes unknown unless a statement of the human names the ways weighed"): I followed the finding and the handoff, which name the plan's row as the source; if the orchestrator holds the plan row no statement of the human, `unknown` returns. Meaning: the player's gear change erases the judgings by the count in the game state, not by the page deleting stored values. PL: Zmiana wyposażenia kasuje oceny przez licznik w stanie gry, nie przez usuwanie zapisanych wartości przez stronę.
7. D-441 pointer to D-463 — fixed in *Rationale* (`foundations/decisions.md:12691`): "…erase in effect what D-440 erases; the count of the player's gear changes that the stored value also holds, and the reading and the opening that go with it, are D-463's." Not in a binding sentence (D-441's binding sentences stand at 599 of 600 words, unchanged) and not in *Relations*, whose closed types (`derives from`, `narrows`) point from the dependent entry to the one it depends on, so D-441 cannot name D-463, which derives from it. Meaning: D-441's lists of what a stored judging holds and what the opening removes are extended by D-463. PL: Listy D-441 o tym, co trzyma zapisana ocena i co usuwa otwarcie, rozszerza D-463.
8. D-456 (`foundations/decisions.md:12777`) — fixed by adding a paragraph of its own, "An item whose data name no place fits no slot." (one sentence, a part the entry sets apart), and the same part in the *Verification* clause `tests:` ("an item whose data name no place fitting no slot"). Six tests quote the second sentence "The data of each item name the place it fits: the stick fits the main hand and the bandage a pocket." (`tests/sim/data.test.mjs:475`, `tests/sim/gear-state.test.mjs:71`, `tests/sim/gear-wear.test.mjs:198`, `tests/sim/saved-game.test.mjs:3337,3346`), so that sentence could not be reworded without changing tests; the new sentence corrects the reading. The new sentence is held by `tests/sim/data.test.mjs:475` (berry, moss, fiber rows carry no `fits`) and `tests/sim/gear-state.test.mjs:71` ("nothing fits the other slots"), which carry no `decision:` line for it yet; the sentence stays held in *Verification* by words only. Residual: "each item" in the second sentence still reads strictly beside the new one; the clean wording ("The data of an item that fits a slot…") needs the six `decision:` lines changed, which is code/tests (part 1) — raised as a remark, not done. Meaning: only items whose data name a place fit a slot. PL: Do miejsca pasują tylko przedmioty, których dane wskazują miejsce.
9. `guidelines/coding-content-data.md` — fixed: row `src/browser/sim/data/gear.ts`, `copy`, `—`, between `creatures.ts` and `items.ts`.
10. `guidelines/coding-saved-game.md` — fixed: in "Wersja podnoszona razem z kształtem" the sentence on what raises the version now names "miejsc wyposażenia z danych, które wylicza `Gear` (także liczby kieszeni)" beside the `Backpack` items, as the comment of `SAVED_GAME_VERSION` in `src/browser/sim/saved-game.ts:86-92` says.
14. `guidelines/testing.md:178` — fixed: "pięciu pól" became "sześciu pól"; the cases for the fields of version 1 and version 2 are named by their test row ("dokładnie tymi czterema polami, które miała wersja 1, i z tymi pięcioma, które miała wersja 2"); the crafted counts of gear changes (below 0, fractional, text, `null`, list, logical, beyond safe integers, `1e400`) are named; and a sentence names `tests/view/judging-cache-gear.test.mjs` with the titles of its ten cases and its screen case, as read from the file.

## Reach beyond the handoff

- `foundations/decisions.md` D-146 (read whole, lines 7066–7083) and D-140 (read, lines 6904–6923), to judge the term „combat turn”: the handoff names neither.
- `tests/view/judging-cache.test.mjs`, `tests/view/judging-cache-gear.test.mjs`, `src/browser/view/judging-cache.ts` (lines 70–99), `src/browser/sim/saved-game.ts` (lines 86–93) and `src/browser/sim/data/items.ts` (lines 70–120), read in part for the facts the guideline rows state (field count, version, case titles, which items have `fits`).
- `tests/` `decision:` lines of D-380, D-456, D-441, D-463 (searched by `grep`) to see which quotation each edit must keep intact.
- `.the-way/elements/glossary/skill/write.md`, `elements/glossary/template.md`, `elements/decisions/skill/read.md`, `decide_entry.md`, `elements/common/way_of_working.md`, `rules.md`, `product-guidelines/coding/SKILL.md`, `testing/SKILL.md`, `template.md` (grep), `coding/template.md` (grep): method files.

## Unread material

- `task_frozen.md`: read lines 205–290 (*Decisions in play*, *Settlements to record*), not the rest.
- `plan.md`: read the *Choices* row at line 640 alone.
- `.the-way/task-cycle/skill/foundation_step.md`, `change/SKILL.md`, `change/fix.md`: read whole. `elements/decisions/template.md`, `elements/glossary/template.md`: read whole. `product-guidelines/template.md`, `coding/template.md`, `testing/template.md`: found by search of the table rules only, not read whole (the edits add a row and change prose of existing rows; no rule of a template is applied beyond *Files of this kind*).
- The elements' `examples.md` and the-way's own `foundations/` entries named there: not read (the edits are changes to existing entries, not new entries).
- `foundations/decisions.md`: read whole D-380, D-441 (whole), D-456, D-463, D-440's *Rationale/Rejected* (partly), D-457–D-462 for neighbours; not the rest of the log; no decision index was written (the handoff names the entries to change).
- The foundation-wide search of step 2 of the way of working (WAY-33) was limited to grep of the glossary and decisions for the terms touched.

## Searches not found or unclear

- none found missing. Unclear: the decisions template's rule on *Rejected* of an entry marked `the cycle's` (`unknown` unless a human statement names the ways) against the finding that asks D-463's *Rejected* to name the plan's rejected way — settled as in finding 6 above, with the question left to the orchestrator.

## Own-work check

- Requirement most likely not met: the edits to D-380, D-456 and D-441 must leave every `decision:` quotation of a test valid, since the tests are not changed. Check: `python -B .the-way/elements/common/foundation_check.py` (compares each quotation with the binding sentences) — exit 0, "0 errors", after the commit. The word limits of D-380 (first paragraph 235 words, before and after about 245), D-441 (binding sentences unchanged at 599) and D-456 (added paragraph) stay within the limits; the check reports no excess.

## Working copies

- `.runs/fix-foundation/` held the output files of the two checks; it was removed by its full path `.runs/fix-foundation`. No worktree or clone was made.

## Choices

- D-380: qualify rather than drop (rejected: dropping, which breaks six tests' citations; cost if wrong: a reader meets the list that names the strike once more, with the qualifier beside it).
- D-441: pointer in *Rationale* (rejected: a binding sentence — the paragraph budget is spent; *Relations* — the closed types point the other way).
- D-456: add a sentence (rejected: reword the second sentence — six test citations would break).
