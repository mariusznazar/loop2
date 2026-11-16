# Findings of the review of the return step, `review-return-report.md`, `FAIL 42e15a5daf2a3ecf00da8ff9d5737063802d0531`

Cut from the report in the reviewer's words: the one blocking finding (I1, Important), and the Minor findings (none). Nothing is marked outside the task's scope.

## Findings

### Critical

None.

### Important

**I1 — D-280 *Rejected* calls the item „Konta” "a fourth item" of a menu bar that now holds four items** (`foundations/decisions.md:4188`).

- What: "*Rejected:* a fourth item „Konta” on the menu bar, only for an account with the owner role — the panel is easier to see, … but D-280's fixed list of items and its tests change and the bar looks different by role". The change (`11164840`) made D-280's binding sentence list four items, „Siedziba, Mapy, Programy and Wiedza” (`:4141`), and `menu-bar.tsx` holds four `ITEMS`. „Konta” added to the bar would now be its fifth item, so the sentence states something untrue at the head; the ordinal came from `f1733cf9` (the owner panel), when the bar held three items.
- Why it matters: the task binds this. Its answer to question 6 (droga A, `task.md:79`) and question 7 (`task.md:84`) says each task corrects what its own change makes untrue, and the human's words quoted there ("chyba niepowinno być tak, ze dopuszczamy że coś jest nieaktualne") reject leaving such a sentence. The task's *Decisions in play* (`task.md:127`, row 163 of the definition) has the task that writes a changed entry correct a field that its changed binding sentence makes untrue — D-280 is such an entry, and `return_step.md` asks the step to correct in the change whatever no longer matches. The return step's report (`return-step-report.md:14`) names "the item lists of the bar" among its searches and reports nothing else in D-280 but the m2 family, so the claim that everything else matched is not true at the head. A reader of D-280 meets "fourth item" two paragraphs under a bar of four and either counts the bar wrong or cannot tell which item list the rejection was weighed against. Graded Important as a missed requirement of the task (section 3: "a missed requirement"); it lies within the task, so it blocks.
- How it differs from m2: m2 (`:4156`, "the game opening the screens Siedziba, Postać, Mapy, Programy and Przejście") is incomplete but true — the tests do open those five — and the task keeps the *Verification* field; this sentence is false.
- Evidence: `grep -n "fourth item" foundations/decisions.md` → `:4188` only; `git log -S "a fourth item „Konta”"` → `f1733cf9`; `git diff main...HEAD -- foundations/decisions.md` shows `:4141` changed to four items and `:4188` untouched.
- Fix suggested: "a fourth item „Konta”" → "a fifth item „Konta”" (or "one more item „Konta”", which does not need correcting at the next screen). One word, in the same kind of `docs` commit as `42e15a5d`.

### Minor

None.
