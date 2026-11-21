# Slice 9 — executor report

**Status:** done

## Files and commits

- `guidelines/styleguide-browser-view.md`: +49 / −9 lines.
- Commit `23e0fa01` (on `task/ocena-programu-na-ziarnach`, base `b1a49f87`).

## What changed in the styleguide

- Rule "The screen Mapy": *Decision* now also names D-439 · D-440 · D-243 (D-325, D-329 stood there already); *Good* and *Bad* carry the new roles; four new bullets after the "Kto idzie" bullet:
  - the judging at a character: the button of a judging as a plain shared button beside „Wejdź”, disabled and „Oceniam…” while it counts; under the character the heading in `text-strong`, a solved row in `positive`, a row of a death in `danger`, an undecided row in `warning`, the sentence under the rows in `text-secondary`;
  - the judging remembered beside „Program:”: „szczelny: 12 z 12” in `positive`, „{n} z 12” in `text`, the note of the stock in `warning`;
  - the second click of „Puść w pętlę”: the sentence above the button in `warning`, the button reading „Puść mimo to”, a plain shared button;
  - one bullet saying none of these brings a new role, token value or role meaning, each part standing in its meaning of the table Roles.
- Rule "States of shared controls": *Decision* adds D-329 · D-439; the *loading* state, the list of the plain button's departures and the *Good* example give loading to the button of a judging, disabled with text in `text-disabled` and „Oceniam…” while it counts, though it waits for no server.
- Rule "Main button, secondary action and tab": the first bullet says „Puść w pętlę”, also as „Puść mimo to”, and „Oceń na 12 ziarnach” stay plain buttons; *Decision* adds D-243 · D-329.
- The table Roles, the kitchen-sink page and every other file stay as they were. No decision is cited as withdrawn: the text has no D-251 (`grep -c D-251` gives 0).

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` — exit 1, 21 errors, **all in `tests/` files** (7 known D-243 quotations of `tests/sim/loop.test.mjs`, `tests/view/maps-screen.test.mjs`, `tests/view/account-screen.test.mjs`; 14 more of the earlier slices' new tests `tests/sim/judging.test.mjs` and `tests/sim/saved-game-judgings.test.mjs`, quotations that do not begin a sentence of or stand in no binding sentence of D-439, D-440, D-22, D-179, D-213, D-165). No error names `guidelines/styleguide-browser-view.md`, a decision it cites or any other file I changed. I did not run the check on the base to compare counts; the errors are in files my slice does not touch. The handoff expected only the 7 D-243 ones: the 14 others are for the orchestrator (the flag `--skip-test-citations` did not drop them either; it gave the same 21 errors, exit 1).
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0.
- `grep -rl "styleguide-browser-view" tests` — finds no test; two files in `tests/` mention `guidelines` for other files. So no focused test reads the styleguide, and none was run.
- `npx prettier --check guidelines/styleguide-browser-view.md` — exit 1, but the file at `HEAD` already fails it the same way (the Roles table's last column; confirmed with `git show HEAD:… | prettier --stdin-filepath`), the repository has no Prettier config for Markdown and no gate runs it on it; I did not reformat the file, so the diff keeps to the change.
- Not run: the full gate (`npm test`) — not for this cycle's agents.

## Own-work check

- Requirement most likely unmet: every role of task *To do* 10 stands in the rule word for word and in the meaning of the table Roles (no new role), without citing D-251.
- Check: `grep -c` for each role's phrase in the file — heading in `text-strong`, „rozwiązane” `positive`, deaths `danger`, undecided `warning`, sentence under rows `text-secondary`, „szczelny: 12 z 12” `positive`, „{n} z 12” `text`, note of the stock `warning`, „Puść mimo to” and „Oceniam…” — each counts ≥ 1; `D-251` counts 0. A reread against the quoted texts of D-329, D-440 and D-243 for the wording of each caption found no difference.

## Walkthrough

The change alters no behaviour a user sees in the running product: it is text of a guideline; the code of the screen comes in other slices.

## Choices, with the way rejected

- Where the task says the stock note stands „jak ostrzeżenie D-251”: the styleguide holds no text of that warning under „Wejdź” (grep for „zapas”, „Próba”, „D-251” found none; task 24 left nothing there), so there was nothing to copy. I wrote the note in `warning` and compared it with a warning that stands in the rule, „Pętla nic nie zarobi do skrzynki” (D-326). Rejected: quoting D-251 or a wording of the old warning — D-251 is withdrawn.
- „12 z 12” standing with the note of the stock: D-440 says the badge goes out and „12 z 12” stands in its place, with no role; I gave it `text`, the role of „{n} z 12”. Rejected: `warning` for the number — the task gives `warning` to the note alone. Cost if wrong: one clause of the rule.
- A new set of bullets in the rule "The screen Mapy" instead of a new rule beside it: the roles belong to the section „Kto idzie” it already describes. Rejected: a new rule — it would need its own *Decision*, *Good* and *Bad* for one section.
- The role of a row of a death in `danger` is justified by the loss of the character in an earning loop, as the task says, and by D-39 only; I did not add D-190, which the handoff does not list for the rule.

## Reach beyond the handoff

- `foundations/decisions.md:11872` and a `grep` for D-251 in `foundations/decisions.md` and `guidelines/*.md` — to see that D-251 is withdrawn and that nothing in the guidelines quotes it.
- `npx prettier` on the file and on its `HEAD` version, to judge the form of the file.
- `.the-way/product-guidelines/styleguide/orchestrated_mode.md` and `template.md` (named by the styleguide `SKILL.md`, step 2 and the mode), and `.the-way/task-cycle/change/slice.md` (named by `make-change`).

## Unread material

- `.the-way/product-guidelines/styleguide/SKILL.md` step files (`recognize.md`, `starting_rules.md`, `research.md`, `audit.md`, `settle.md`, `hand_back.md` and others): not read — they belong to a refinement with a human, which this orchestrated slice does not run; only `orchestrated_mode.md` and `template.md` were read.
- `foundations/part_map.md:3-31` and `:139-157`: read the ranges' parts (the Files lists of `browser-view` and `agent-workflow`); the rest of each entry's text was cut to 300 characters per line in my view.
- D-38, D-39, D-40, D-44, D-274, D-326 and D-325 (the part of its text at `foundations/decisions.md:9885-9930`): read whole except D-274's *Rejected* tail, which I read only to its end of the visible output. D-243, D-329, D-439, D-440: read whole.
- The styleguide file: read whole.

## Searches not found or unclear

- The handoff says task 24 rewrote the warning under „Wejdź” for a rehearsal that takes a stock the chest lacks; the styleguide holds no such text (searched „zapas”, „Próba”, „rehearsal”, „D-251”, „skrzynk”, „Wejdź”). Used the wording of the task's *To do* 8 instead.
- The loop record line in „Gdy cię nie było” (task *To do* 8, last bullet) has no rule in the styleguide's text and task *To do* 10 gives it no role; left as it is (the „Odbierz” role of D-246 stands only in the table). If the orchestrator wants a role named for it, that is one more bullet.
- The handoff's statement that the foundation check shows only the 7 known D-243 errors does not hold: 21 errors in test files (see Checks).

## Working copies

- `.runs/executor-9/` (copies of the styleguide before and after, and the check output) stood in the worktree's ignored `.runs/`; removed. The full output of the final foundation check is kept in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-09-foundation-check.txt`. Two scratch outputs `.runs/executor-9-fc*.txt` were removed. No remainder.
