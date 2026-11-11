# Fix report — the four Minor findings of the review of the whole change

Fix range: from `99b9ce97d467e232ba2feb9b4e14cca73b6dd7d9`. Variant of `make-change`: the fix of a review's findings. Read whole: `fix_minor_handoff.md` and `review_whole_findings.md`; `review_whole_report.md` was not needed.

## Status

`done` (M1, M2, M4 fixed; M3 left as the handoff allows, with the evidence below).

## Commits (branch `task/koszty-i-stan-ogniska`, nothing pushed)

| Commit | Finding | What |
|---|---|---|
| `5f0793f` | M1 | `fix:` the credit of `wood-pile` says only its colour was changed; the comments of `credits.ts` made true |
| `a00f10a` | M4 | `refactor:` the three forms of the name of nature energy moved into the data of the actions |
| `0611dfa` | M2 | `docs:` D-362 links D-293 in *Relations* |

## Checks (command, exit code)

| Check | Command | Exit |
|---|---|---|
| type-check | `npm run typecheck` | 0 |
| build | `npm run build` | 0 |
| lint | `npx eslint src/browser tests/view tests/sim` | 0 |
| format | `npx prettier --write` on the four changed code files and the two changed tests, then no further diff | 0 |
| simulation and view tests (focused, not the gate) | `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` | 0 (1808 tests, 1808 pass; one more than before, the new energy-forms case) |
| foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| invariant `icon-credits` | `npm test -- tests/invariants/test_icon_credits.py` | 0 |
| invariant `browser-view-token-values` | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `content-identifiers` | `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| invariant `icon-file-content` | `npm test -- tests/invariants/test_icon_file_content.py` | 0 |
| invariant `loop2-container-icons` | `npm test -- tests/invariants/test_loop2_container_icons.py` | first run under a 110 s `timeout` ended 124 (the test builds a container and is slow, it passed in the first author session); rerun without the limit: exit 0 (1 test, 96 s) |
| boundary | `git diff 99b9ce9 --stat -- assets` | empty: `assets/icons/wood-pile.svg` and the other icons untouched |

Not run: `npm test` (the orchestrator's); the mutation tool.

## Own-work check

- Requirement most likely not met: M1 asks for a sentence that is true of this file and that does not break `icon-credits`. Check: `icons.test.mjs` now holds a per-icon table (`CHANGES_OF`) and asserts that each credit's `changes` equals it, that every footer line and every line of the credits section carries it, and that the footer line of the extinguished campfire reads „… CC BY 3.0, zmienione (zmieniony kolor)”; `test_icon_credits.py` still finds a statement of change (stem „zmienion”) in every credit and passes. A test that fails if `wood-pile` goes back to the shared sentence is the first of those assertions.
- M4 check: the price still reads „(10 energii natury)” (pick and panel tests pass); the new case in `program-editor.test.mjs` takes the forms from the data and gives 1 → „energia natury”, 2 → „energie natury”, 10 → „energii natury”.
- No screen changed visibly, so no screenshot was taken; the three changes are a credit string, a data constant moved, and a link in the foundation.

## Per finding

**M1 — fixed.** The smallest true fix is a per-icon statement, as the handoff allows. In `src/browser/view/credits.ts`: a second constant `COLOUR_CHANGED = "zmienione (zmieniony kolor)"` used for `"wood-pile"` alone; `CHANGES` stays for the sixteen icons copied from the source repository, where the black background really was removed. The file's header comment (now: the icons come from game-icons.net, from its source repository and `wood-pile.svg` from its page) and the comment of `CHANGES` (now: the change made to the icon files copied from the source repository) are made true too. Choice: no hexadecimal colour in the sentence, because `browser-view-token-values` counts a colour in any notation in TypeScript, so the sentence names no value. Rejected: leaving one shared sentence (the reviewer's reading: untrue for this file); an optional `changes` that falls back to the shared one (a silent default hides a missing statement). Cost if wrong: one string and its test line. Tests changed: `tests/view/icons.test.mjs` (the table `CHANGES_OF`/`changesOf`, the former "equal for all" assertion replaced by "equal to the icon's own statement", the literal line of the extinguished campfire); the footer, the section and `footer.ts` read `credit.changes` and needed no change. The `ICON_SOURCE_COMMIT` comment (corrected earlier) is kept.

**M2 — fixed.** `foundations/decisions.md`, D-362: *Relations* now `derives from D-288 · derives from D-63 · derives from D-293`. Through `the-way-record-decision`: SKILL.md, `read.md`, `decide_entry.md` and the template were read whole in the first session (this is an edit of a relation in my own entry); the relation is written in the dependant, as the template says, so D-293 is not edited; `foundation_check.py` 0 errors.

**M3 — no change made.** The cut of the price by line breaks follows from two things the task settled and the handoff forbids to change: the wording (answer 2: the price in brackets after the name, the same text as the name, with the plural forms, in D-362's binding sentence) and the grid of the pick, which is four equal columns by `columnsOf` in `src/browser/view/rule-panel.tsx` and `.rule-panel-cells { grid-template-columns: repeat(4, minmax(0, 1fr)) }` in `src/browser/styles.css:1244-1248` (D-288 and D-290 set the pick as cells in groups; no decision sets the column count, but a change of it or of the layout of the cell is a styleguide and design matter outside this task's To do). Any code that avoided the break would change the grid or the cell, or shorten the wording. The orchestrator keeps it for the request's list.

**M4 — fixed.** `NATURE_ENERGY_NAME` (`one`, `few`, `many`) is now exported from `src/browser/sim/data/actions.ts`, beside `natureEnergy`, the field the price unit comes from; `program-editor.ts` imports it and the local constant is gone. The other two places that write the name stay as they are on purpose, because they are other grammatical uses, not the counted form: „brak energii natury: 7 z 10” (`sim/program.ts`, a genitive after „brak”, D-310 gives the wording) and „Energia natury 100” (`view/body-row.ts`, a nominative label); folding them into the counted forms would tie two different cases to one list. Rejected: moving the forms into `resources.ts` (the energy is no resource; the task puts plural forms on things). Cost if wrong: a rename of the energy still takes edits in those two places. New test: the forms taken from the data give the right form for 1, 2 and 10 (`program-editor.test.mjs`).

## Unread material

none beyond what this report names: the two files of the handoff were read whole; `review_whole_report.md` (named, to be read where a finding points to it) was not read, because the findings' texts held the evidence needed; the decision skill's files and the template were read in the first session, not again.

## Searches not found or unclear

- Not found: a decision or a test that fixes the number of columns of the pick (searched `columnsOf`, `repeat(4`, `D-290` and the styleguide); none sets it, which is why M3 cannot be settled by a rule.
- Unclear: whether the statement for `wood-pile` should say „bez tła” as a fact of the file taken (it has none); I wrote only the colour, the one change made to the file, as M1's evidence gives.

## Reaches beyond the handoff

- `src/browser/styles.css:1244-1260` and `rule-panel.tsx` (`columnsOf`), only to give the evidence for M3.
- `grep` of the three places that write „energii natury” in `src` (for M4).
