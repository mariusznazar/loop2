# Report — correction 1, part B (task rana-i-opatrunek)

Status: done. Commit `dbc931e8932c1b9821ba1146d295cf883508320f` on `task/rana-i-opatrunek` (range `b04a9f2f..dbc931e8`), one file, `guidelines/coding-saved-game.md`, 2 insertions and 1 deletion. No push.

## What I wrote, word for word, and where

File `guidelines/coding-saved-game.md`, rule „Wersja podnoszona razem z kształtem”.

1. New sentence, in the first paragraph of the rule directly after the sentence that lists the ordinary action as a cause (line 103), so the causes of a raise stand together:

> Podnosi ją także zmiana, po której stary dokument, choć jego klucze się zgadzają, opisuje grę, jakiej reguły już nie robią, bo stary zapis nigdy nie dostałby czegoś nowego (na przykład nowe drzewo umiejętności wchodzi do Zrozumienia dopiero w minucie gry, w której odkryto jego pierwszą czynność, więc zapis z tą czynnością już odkrytą nigdy by go nie dostał).

2. A consequent change to the parenthesis in the closing paragraph of the rule (the one on data checked at the load), which the new cause would otherwise make false (a change of skills or branches in the data can be exactly such a change):

Before: `… nie podnosi wersji sama (poza dodaniem albo usunięciem zwykłej czynności, które ją podnosi), ale …`
After: `… nie podnosi wersji sama (poza dodaniem albo usunięciem zwykłej czynności i poza zmianą, po której stary dokument opisuje grę, jakiej reguły już nie robią; te ją podnoszą), ale …`

The fields *Decision* (D-206 · D-213 · D-369), *Invariant*, *Good* and *Bad* are unchanged: the sentence makes none of them false, and the rule's choice is still carried by D-206 (version of the shape, discard of another version). The sentence names no task and gives the tree entering the Understanding as one example only, as the handoff allowed. It repeats no decision text (template: "a rule repeats no decision") and holds no D-number, in the style of the rule's other paragraphs; the mechanism of the example is D-195, read for this, and the code states the cause in the comment over `SAVED_GAME_VERSION` in `src/browser/sim/saved-game.ts`.

## Method steps followed

- Read `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md`, then `.the-way/product-guidelines/coding/SKILL.md` whole.
- Step 1 (`recognize.md`, read): the mode is a refresh/extension of existing coding guidelines within one kind file (the file of the kind `saved-game`); the required headings of the general file are not touched, so nothing is proposed.
- Step 4 files: `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md`, both whole (a rule carries no rationale, lists no state, repeats no decision; the form of a rule and of a file of a kind). The steps that ask the human (steps 2–4 questions) are answered by the human's remark, so nothing was asked.
- Sources of the sentence: the comment over `SAVED_GAME_VERSION` (`src/browser/sim/saved-game.ts:86-96`), D-206 and D-195 (each read whole by its heading in `foundations/decisions.md`).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` (no switch): `0 errors`, exit 0.
- `python -B .the-way/instruction-files/check_instructions.py`: `0 error, 0 warn, 114 info`, exit 0 (the guideline files are among the files it reads; the INFO lines are the standing ones, none from the changed lines).
- Tests of `tests/agent_workflow/` that read the guidelines: `grep -rln "guidelines" tests/agent_workflow` finds none. I ran the one test in that directory that scans tracked files, `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py`: 1 test OK, exit 0. The whole suite was not run.

## Unread material

- `.the-way/product-guidelines/coding/{starting_set,research,trial_run,kinds,settle,task_document,hand_back}.md`, `product-guidelines/audit_end.md`: not read; the work is one sentence in an existing file and the steps they serve (starting set, research, trial run, audit, settling choices with the human, hand back to a task document) do not run in a correction answered by the remark.
- `foundations/decisions.md` beyond D-206 and D-195: not read.
- The rest of `guidelines/coding.md` and the rest of `src/browser/sim/saved-game.ts`: not read.

## Searches not found or unclear

none (the grep for tests of `tests/agent_workflow` that read guidelines found no match; that is a finding about the pattern "guidelines" in that directory, which I checked again with `guidelines/` there and in `tests/invariants`: one unrelated hit, `tests/invariants/test_terrain_drawing_numbers.py`).

## Working copies

None made.
