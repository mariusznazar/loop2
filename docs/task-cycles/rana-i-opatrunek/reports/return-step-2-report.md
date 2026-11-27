# Return step 2 report — correction 1, task rana-i-opatrunek

**Status:** done

**Commits** (range of the correction `83204edc..26c0209e`, head before the step `26c0209e`, branch `task/rana-i-opatrunek`, not pushed; author address `the author's private address`):

- `69b8d977` — docs: `foundations/decisions.md` only, the *Verification* of D-120 (+8/−3 lines).

No code, no test and no guideline was changed. No binding sentence of any decision was touched.

## What no longer matched, and its correction

1. **D-120, clause `tests:`** (the only mismatch). It named the bandage as the target of „Wytwórz” and „Opatrz” leaving the repertoire with the tree of tending, and said nothing of the second recipe item the correction's tests lay in (`tests/sim/action-targets.test.mjs`, three new tests; `tests/sim/repertoire.test.mjs`, the type with its field). It now also names: a second item with a recipe, laid in a test, keeping the kind „Wytwórz” open for a character without that skill while the rule „Wytwórz — Opatrunek” lies outside the repertoire, is passed over by the simulation and reads „jeszcze nieodkryte: Wytwórz”, and „Wytwórz” with the second item stays inside, whether no skill grows its pair or another skill among the predispositions does; and, with that skill and without the one of the second item, the bandage inside and the second item outside. D-120 holds no pair of examples (the earlier step left none), so none was removed or added; the three new tests carry lines `decision:` that quote D-120 (and D-126, D-310) from the start of their sentences, and the foundation check passes with them.
2. The binding sentence of D-120 (an action is open when the skill its *pair of verb and target* grows is among the predispositions) agrees with the code now: `actionInRepertoire` asks for the kind, the item and `pairOpen(kind, item, repertoire.predispositions)` (`src/browser/sim/understanding.ts`), where the earlier code judged an item by the repertoire's items alone (the question 1 of the first return step, closed by the correction). Unchanged.

## The other entries, compared

- **D-126 and the invariant `program-rule-pick`** (a rule whose action or the target of it lies outside the repertoire is passed over and stays): agree; `ruleInRepertoire` → `actionInRepertoire` is the one reader of the simulation, the signs and the reason. None changed.
- **D-119** („a character's repertoire is computed from the Understanding through its archetype's predispositions and the branches bought, and is never saved”): agrees; the new field is derived and never saved (the guideline of the saved game lists no repertoire). None changed.
- **D-193, D-195, D-443, D-196**: no word of them depends on the type or on the check by pair; D-195 and D-193 on the practice and the entry of a tree, D-443 on the targets of the verbs from the data, D-196 on which repertoire the editor shows. Agree; none changed. (The target pick of „Wytwórz” in the editor, `knownTargets` in `src/browser/view/item-target-pick.ts`, still filters by the repertoire's items alone; this is review finding o-1 of the correction, a code gap for the request's list. It cannot show with today's data, one archetype that holds the tree; no entry names the pick as judged by the pair, so no entry is untrue by it, and the review's findings are no foundation entries.)
- **D-310** (the reason of a rule outside the repertoire is „gałąź niewykupiona” or „jeszcze nieodkryte: {name}”): agrees; a pair closed while its kind and item are held reads „jeszcze nieodkryte: Wytwórz”, the label of the kind, as a kind the predispositions close whole. None changed.
- **Glossary `repertoire` and `predisposition`**: `repertoire` says „the subset of the Understanding that the character can use in a program”, which the type with a derived field still is; `predisposition` unchanged. No change; no new term (`predispositions` is the plural of the entry's word, `pairOpen` is a function name).
- **D-206 and the sentence of the guideline** (`guidelines/coding-saved-game.md`, commit `dbc931e8`): **no entry written, D-206 unchanged.** By `return_step.md` an entry is written for a choice that binds after the merge (WAY-36), and a choice goes to the place the questions of the decisions template give it. Applying them (`.the-way/elements/decisions/template.md`, „Where it goes”): the sentence is a rule only for how to write code (question 2: the guidelines of that discipline, with its reason in one sentence), and it has its reason in the sentence. Question 2 keeps an entry only for „a rule that carries a choice with a real cost”; the cost of a raise, every player of the older version starting anew with the document kept as the previous save, is D-206's accepted cost, and its *Rationale* already gives the reason of the new cause („better to discard it than to load a state the rules no longer describe”), as D-369 carries the earlier cause by its keys. The rule of the guideline already names D-206 · D-213 · D-369. The human's remark asked for the sentence in the guideline by the way the guidelines provide and for no entry, which also settles the guideline sentence. The first return step reached the same place for the raise of version 12 (its choice 6). Review's Minor finding 2 (D-206 says „of its shape”) is read: the binding sentence of D-206 is about a version that differs from the current one, which stays true whatever the cause of the raise; no word of it is contradicted.
- **The row „Teraz”** (D-334, D-335, D-336, D-396, D-43): none says the text is cut, with an ellipsis or otherwise, in either layout. D-334 says the row „keeps one height whatever it holds”, and its *Verification* (complies/violates) gives „Teraz keeping the height of one line” against „growing by a line as its text changes”; the CSS after the correction keeps the fixed height in the phone layout (`var(--touch-target-min)`, two lines of text inside it) and wraps the text inside it, so the row moves nothing below it, as measured by the correction's part C. D-43 lists a layout dimension (a width or height) among what is no value written in place of a token; the CSS holds none other. D-396 („no text over the border of its frame” in the phone layout) is held better by the wrapping. D-335 and D-336 say nothing of the text of the row. No change. The only text that said „cuts” was the comment of `src/browser/run-screen.css` and of `src/browser/view/now-rows.tsx`, both updated by the correction. `guidelines/styleguide-browser-view.md` names the rows only for the hover and the body row (line 599, line 1592) and does not speak of the cut.

## Own search

By `predispositions`, `pairOpen`, `Repertoire`, `.now-text`, `.now-row`, `ellipsis`, „wielokropk” and „cuts a longer” over `foundations/`, `guidelines/`, the `.md` files of the repository, `src/`, `tests/`, `balance/`: the entries above (D-190, D-150, D-151, D-192, D-196, D-119, D-120, D-126, D-127, D-308, D-310 hold „repertoire” or „predisposition”; the lines read: their meaning is that of the entries compared, none speaks of the type or of the check of an item action), the glossary, the invariants file (`program-rule-pick`), the files of the code listed in the correction. The only hit of „wielokropek” in the guidelines (`guidelines/styleguide-browser-view.md:826`) is the list of a pick, not the row „Teraz”.

## Decisions, invariants, environment facts, glossary terms, part map written or changed

- Decisions: D-120 (*Verification*, clause `tests:`); none written new; no number assigned.
- Invariants: none. Environment facts: none (the correction rests on no source outside the product). Glossary terms: none written or changed.
- Part map: no change. The correction touches `src/browser/sim/**` and `tests/sim/**` (`simulation`), `src/browser/run-screen.css` and `src/browser/view/now-rows.tsx` (`browser-view`), `guidelines/coding-saved-game.md` and the reports (`agent-workflow` or the cycle's files under `.runs/`, ignored); it adds no file, and the foundation check claims every tracked file.
- Projected entries: none.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` (no switch), after the change: exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py`: exit 0, `0 error, 0 warn, 122 info`.
- The whole suite was not run (as the handoff says). The tests of the correction were not run again; the reports of the parts and the review give them, and this step changed no code and no test.

## Unread material

- `foundations/decisions.md`: read the entries D-120, D-126, D-193, D-195, D-196, D-443, D-206, D-213, D-310, D-334, D-335, D-336, D-369, D-396, D-43 whole, and the lines naming „repertoire” or „predisposition” in D-190, D-150, D-151, D-192, D-119, D-127, D-308 (not those entries whole); not the file whole (1.5 MB).
- `guidelines/coding-saved-game.md`: read the diff of the correction (the two changed passages) only, not the file.
- `src/browser/sim/understanding.ts`: read whole the parts that hold the type, `pairOpen`, `repertoireOf`, `editorRepertoire`, `knownRepertoire`, `undiscoveredPart`, `outsideReason` (lines 60–110, 183–330), and the diff; the rest by the diff.
- `src/browser/run-screen.css`: read the diff and the rows of „Teraz” and „Potem” (lines 533–570), not the file.
- The reports of the correction (`correction-1a-report.md`) read whole; `correction-1b-report.md`, `correction-1c-report.md` and `review-correction-1-report.md` read in part (the findings m-2, m-4, o-1 and the passages on the pair and on the CSS, 31.7 KB the review); the code of the tests of the correction by their diff. `foundations/invariants.md` read for `program-rule-pick` only; `foundations/glossary.md` for `predisposition`, `archetype`, `Understanding` and `repertoire`.

## Searches not found or unclear

none. (The decisions file is divided by headings `###`; my first search with the heading `##` found nothing and I corrected the pattern, which then found the entries.)

## Working copies

`.runs/return-step-2/` in the worktree held scripts and outputs of my reading and checks (`show.py`, `find.py`, `edit.py`, the extracts `d.txt`, `d2.txt`, `d3.txt`, `f1.txt`, the outputs of the two checks). Nothing in them is needed beyond this report; the directory is removed with `rm -rf` by its full path before I return (see the last line of the return).
