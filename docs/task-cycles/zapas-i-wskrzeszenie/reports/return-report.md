# Return report - task `zapas-i-wskrzeszenie`

Status: done

Worktree `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`, head before: `5d20e26e`, head after: `f1205477`.

## Commits

- `3d171140` - `docs: :card_file_box:` the foundation and the tests that quote it: `foundations/decisions.md` (D-04, D-194, D-216, D-219, D-241, D-329, D-386, D-428), `foundations/glossary.md` (`generation number`), `tests/sim/completion.test.mjs`, `death.test.mjs`, `loop.test.mjs`, `saved-game.test.mjs` (the quotation of D-386's reworded sentence in 12 `decision:` lines), `tests/sim/team.test.mjs` (three new `decision:` lines of D-386), `tests/view/end-window-lines.test.mjs` (a comment).
- `f1205477` - `docs: :memo:` `balance/players/edge-daily-best.json` and `edge-daily-decent.json` (one phrase each in `description`).

## Return step

- Foundation compared with code: the entries the change writes or changes, the ones the task names (the "Decisions in play" lists) and those a search of `foundations/` for "resurrection", "ready", "renew", "gotow", "nowhere", "pay nothing", "takes nothing", "480", "eight hours", "D-251", "one resurrection" and "rehearsal" found, each read against the code at `5d20e26e` (`src/browser/sim/game.ts`, `types.ts`, `saved-game.ts`, `data/balance.ts`, `loop.ts`; `src/browser/view/team-lines.ts`, `end-window-lines.ts`, `trip-lines.ts`, `maps-screen.tsx`, `clock.ts`; `balance/`). The part map of the touched parts (`browser-view`, `simulation`, `balance-tools`, `agent-workflow`, `product-foundation`) was compared too. What matched, with no correction: D-189, D-179, D-214, D-215, D-217, D-190 (binding paragraphs, *Verification*), D-220, D-240, D-242, D-185-D-188, D-183, D-221, D-246, the invariants `solved-map-manual-run`, `trip-transfer`, `trip-run-end`, `resurrection-renewal`, `death-settled-once`, `catch-up-state`, the glossary term `resurrection`, the withdrawn row of D-251, and the part map (the new `balance/progression.mjs` and its test fall under the globs `balance/**` and `tests/balance/**`, and the description of `balance-tools` already says it measures the balance of the game, so no part-map change). What no longer matched, and its correction:
  1. D-386 first paragraph said the moment "the account's resurrection is ready" is stored; the code stores the moment the next spent use returns (`resurrectionNextReturnAtMs`, null with none spent). Reworded; its *Verification* clause "the team's moment of readiness" reworded the same way. The 12 `decision:` lines quoting that sentence (`tests/sim/completion|death|loop|saved-game.test.mjs`) now quote it as it stands.
  2. The rule of remark 3 had no entry (see "Rows" below): written as a second paragraph of D-386, with *Verification* `tests:` part, *Rationale* sentences and *Rejected* ways.
  3. Glossary `generation number`: "because no resurrection is ready" -> "because no use of the resurrection is left".
  4. D-04 *Verification* (`complies:` list): "a stored moment of readiness", "the moment a resurrection is ready" -> the moment of the next return, the moment the next spent use of a resurrection returns.
  5. D-194 *Rejected*: "a manual run of a solved map is to pay nothing" -> "pay no practice" (the run now brings loot out to the chest).
  6. D-216 heading: "what a completion renewed" -> "what a completion returned" (the completion returns a use). No test or file quotes the heading.
  7. D-219 *Verification*: "the moment of readiness ..., and a resurrection used up ready again at its moment" -> the moment of the next return, "a spent use of the resurrection returned at its moment after a save and a load".
  8. D-241 *Rationale*: "a death with no resurrection ready takes what waits" -> "no use of the resurrection left".
  9. D-329 binding sentence: "„Wejdź” and „Puść w pętlę” with their warnings" -> "with the warning of an empty list „Wynieś” beside „Puść w pętlę” (D-326)" ("Wejdź" has no warning since D-251's withdrawal; `maps-screen.tsx` draws only `emptyLoopMark` beside "Puść w pętlę"). The `decision:` lines of D-329 quote the start of the first sentence ("... the name as a link to the screen Postać"), which stands unchanged, so no test line changed.
  10. D-428 *Verification* `tests:` clause: now names the four cases that carry the `decision:` lines of its second paragraph (`tests/balance/loop|campaign|check-map|cli.test.mjs`): the loop of the command with `--no-resurrection` started with every use spent and the clock of the returns started at its start, the uses returning as in the game, and a campaign's player waiting for the resurrection who tries when one use is left.
  11. Code (data text): the `description` of `balance/players/edge-daily-best.json` and `edge-daily-decent.json` said the next map is tried "only while the team's resurrection is ready"; now "has a use left" (the field `needResurrection` and the campaign code already mean that). The plan's *Choices* had left them; the old word carried the old meaning.
  12. Code (comment): `tests/view/end-window-lines.test.mjs` pointed at "question 16" of the task document; the rule stands in D-216, so the comment now cites D-216 alone.
  Left with a note, not corrected: the test title "a character created while the team's resurrection is used up does not make it ready" (`tests/sim/death.test.mjs:124`) - it still reads true (a created character returns no use) and no entry quotes it.
- Decisions written or changed: D-386 (new paragraph, `the cycle's`), D-04 / D-194 / D-219 / D-241 (prose of *Verification*, *Rejected*, *Rationale* only), D-216 (heading), D-329 (binding sentence), D-428 (*Verification*, `row 10`).
- Invariants written or changed: none (the rule of remark 3 is a decision; `resurrection-renewal` already says what holds).
- Environment facts: none (no source outside the product that the change rests on and the foundation lacks).
- Glossary terms: `generation number` corrected (use of "ready"); no new term.
- Part-map changes: none.
- Projected entries written whole or in part: D-438 "May the progression require the player's absence?" was written by Slice 1 (`3647bb19`) whole as the definition projects it (*Verification* chosen by that slice: an agent compares a change with the decision, `complies` / `violates`, no test); nothing more written in this step.
- Rows of *Settlements to record* written (all earlier than this step, verified here against the code): row 1 D-189 (Slice 1, `3647bb19`); row 2 D-190 (Slice 1); row 3 D-190 (Slice 1); row 4 D-190 (Slice 1); row 5 D-220 (Slice 1); row 6 D-217 (Slice 11, `8d0e49cb`); row 7 D-216 (Slice 11); row 8 D-215 (Slice 11); row 9 glossary `resurrection` (Slice 1); row 10 D-428 second paragraph (Slice 1, fixed in `f30dffb7`; its *Verification* clause completed in this step).

## Entries written in this step, marked

- D-386, second paragraph and its *Verification*, *Rationale* and *Rejected* parts - `the cycle's` (remark 3 of the human on request 166, the rule of the uses spent that no row of the task carries; the task's question 15 gives the shape and its *Not chosen* two of the ways in *Rejected*, the remark gives the third and the reason).
  - English: A saved game state holds the uses of the resurrection as the count spent and the moment the next returns, the settlement of a death holds the uses spent after it, and lowering the number of uses in the data refuses a save only where more uses are spent than the new number, so an open end-of-run window stays loadable.
  - Polski: Zapis trzyma użycia wskrzeszenia jako liczbę zużytych i chwilę powrotu następnego, a rozliczenie śmierci trzyma liczbę użyć zużytych po niej; obniżenie liczby użyć w danych odrzuca zapis tylko wtedy, gdy zużytych jest więcej niż nowa liczba, więc zapis z otwartym oknem końca przejścia da się wczytać.
- D-386, first paragraph reworded (moment of the next return instead of the moment of readiness) - `the cycle's`, meaning unchanged except for the new shape the code gives.
  - English: The moment stored for the resurrection is the moment the next spent use returns, a safe integer of any sign that the load takes without a clock.
  - Polski: Zapisana chwila wskrzeszenia to chwila powrotu następnego zużytego użycia, dowolna bezpieczna liczba całkowita, którą wczytanie przyjmuje bez porównania z zegarem.
- D-329, binding sentence - `the cycle's` (correction of a word the withdrawal of D-251 made false).
  - English: At a character in "Kto idzie" the one warning beside the buttons is that of an empty list "Wynieś" beside "Puść w pętlę"; "Wejdź" has none.
  - Polski: Przy postaci w „Kto idzie” jedyne ostrzeżenie przy przyciskach to ostrzeżenie o pustej liście „Wynieś” przy „Puść w pętlę”; „Wejdź” nie ma żadnego.
- D-216, heading - `the cycle's`.
  - English: The question asks where the player reads what a completion returned, not renewed.
  - Polski: Pytanie dotyczy tego, gdzie gracz czyta, co przywróciło domknięcie, a nie co odnowiło.
- Glossary `generation number` - `the cycle's` (use corrected, meaning of the entry unchanged).
  - English: The number grows at a death that takes the practice because no use of the resurrection is left.
  - Polski: Numer rośnie przy śmierci, która zabiera wprawę, bo wskrzeszenie nie ma już żadnego użycia.
- D-428 *Verification* clause - `row 10`.
  - English: The tests hold the switch `--no-resurrection` starting the loop with every use spent and the campaign player trying with one use left.
  - Polski: Testy trzymają przełącznik `--no-resurrection` startujący pętlę ze wszystkimi użyciami zużytymi i gracza kampanii próbującego, gdy zostało jedno użycie.
- D-04, D-194, D-219, D-241 prose: corrections of the words "ready" / "pay nothing"; no meaning added, no mark.

Pair of examples added: none.

## Where rule 3 went, and why

Remark 3 of the human gives a rule that binds after the merge (it constrains every later tuning of the number of uses), so by the template's "Where it goes" it is not a plan item. Question 1 (instruction for an agent) no; question 2 (rule only for code or look): the choice has a real cost (spent counts and a refusal, not a clamp), so it stays a decision and the saved-game guideline already names the check (`guidelines/coding-saved-game.md`, list of what the load checks against the data); question 5: D-386 already answers "which game states does the load admit", so the rule is a paragraph of D-386, not a new number. D-216 already says the window's uses left are the data's count less the uses spent that the settlement holds, so that half is not repeated; the paragraph names the settlement's spent count so a reader of the frozen task (which says "uses left" in To do 3) finds it. The load's rule is held by the tests `a count lowered from 3 to 1 ...` and `a settlement whose uses spent equal the data's count ...` of `tests/sim/team.test.mjs` through their new `decision:` lines.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` (no skip switch) at head `f1205477`: exit 0, "0 errors".
- `python -B .the-way/elements/common/decision_index.py --output .runs/return-step/index.md --decision D-386 --decision D-216 --decision D-329`: exit 0.
- `npm test -- <file>`, each file on its own, run one at a time (the first two attempts overlapped two of my own loops and failed on a missing `dist/`; those results are discarded): `tests/sim/team.test.mjs` 0, `tests/sim/saved-game.test.mjs` 0, `tests/sim/death.test.mjs` 0, `tests/sim/completion.test.mjs` 0, `tests/sim/loop.test.mjs` 0, `tests/view/end-window-lines.test.mjs` 0, `tests/balance/campaign.test.mjs` 0, `tests/balance/loop.test.mjs` 0, `tests/balance/cli.test.mjs` 0.
- `npx prettier --check` on the changed `.mjs` and `.json` files: exit 0.
- Not run: the full gate (`npm test`); `check_instructions.py`; the rest of the test files of `tests/view/` and `tests/balance/` (no change to them or to what they read). Nothing but the cycle runs the full gate.

## Own-work check

The requirement most likely not met: a test that quotes a sentence I reworded still quotes the old one, or a reworded sentence breaks a limit of the template. Check: `foundation_check.py` (compares every `decision:` quotation with the binding sentences and counts sentence/word limits) reports 0 errors after the edit, and the 12 changed quotation lines of D-386 and the 3 new ones were the only lines touching reworded binding sentences (searched `tests/` for `decision: D-386`, `D-329`, `D-428`, `D-216`; D-329's lines quote a sentence start I left word for word). A second: the new paragraph of D-386 says the load refuses only above the new number - held by the case of `team.test.mjs` that lowers the count from 3 to 1 (passes, exit 0).

## Reach beyond the handoff

- Read `.claude/skills/the-way-record-glossary-term/SKILL.md` and `.the-way/elements/glossary/skill/*.md` and `template.md` / `examples.md` (to correct a glossary entry), the decisions element files and `elements/common/rules.md`, `way_of_working.md`, `.the-way/elements/decisions/examples.md` (WAY-03 not opened), `a file of the author's private notes` and `git.md` (required by the hook of this machine).
- Read `foundations/decisions.md` ranges: D-04 (lines 86-135), D-179, D-183-D-189, D-190-D-221, D-239-D-242, D-326-D-329, D-386, D-388, D-397, D-398, D-404, D-428, D-438, withdrawn list; `foundations/invariants.md` ranges for the invariants named above; `foundations/glossary.md` 200-230; `foundations/part_map.md` 1-175.
- Read `git diff 46cfec71..HEAD` of `src/browser/sim/types.ts`, `data/balance.ts`, `saved-game.ts`, `game.ts`, `loop.ts`, `view/*.ts*`, `maps-screen.css`, and `correction-1-fix-report.md`.

## Working copies

`.runs/return-step/` held `index.md` (output of `decision_index.py`), `*.log` and `*.rerun.log` (test outputs) and `summary.txt`. It was removed with its full path `.runs/return-step` before this report was finished; nothing the report needs was kept there. The worktree is clean (`git status`).

## Unread material

- The frozen task `task.md` was read whole (two reads); `plan.md` whole; `correction-1-remarks.md` whole; `correction-1-fix-report.md` read (first 150 lines, the whole of it).
- `.the-way/elements/decisions/examples.md` names WAY-03 of the-way's `foundations/`; not opened (I wrote no new decision whose form needed an example).
- `.the-way/elements/invariants/*` and the record-invariant / update-part-map / record-environment-fact skills: not read (no invariant, part-map or environment-fact change was written).
- Of the long decisions, I read D-190, D-216, D-217, D-386, D-189, D-240, D-242 whole and the rest by range; the reports of the slices and reviews (`slice-*`, `review-*`) were not read - the comparison was made against the code and the entries.
- `tests/` beyond the files named above were searched by `decision:` / `invariant:` lines only, not read.

## Searches not found or unclear

- The handoff names a comment in `tests/sim/team.test.mjs` near line 729, "Task question 15 ...", that points at the task document. At head `5d20e26e` the file holds no such comment (searched `team.test.mjs` and all of `tests/`, `src/`, `balance/` for "question", "Task question", "the task", "task document"); the only pointer at the task document was "question 16" in `tests/view/end-window-lines.test.mjs:209`, corrected. In place of the missing comment the case at that line now carries `decision:` lines of D-386.
- The handoff lists D-241 *Rationale*, D-219 *Verification*, D-194 *Rejected*, D-04 *Verification*, D-216 heading, D-329 sentence as stale; all six were found as described. "480" and "eight hours" found only unrelated entries (game minutes of maps) and D-189's *Rejected* about the earning loop's "Odbierz" after eight hours, which stays true.
- Unclear: whether the player descriptions in `balance/players/` were meant to stay (the plan's *Choices* says so, reading "ready" as "with a use left"); I changed the two descriptions that said "ready" (`f1205477`); revert that commit if the plan's choice is to hold.
- Unclear: D-386 has no `Relations` to D-190 (the uses); I left *Relations* as it was (`derives from D-213 · D-221 · D-248`) since the new paragraph serves D-206's refusal of a save, which the entry already rests on indirectly through D-213; add `derives from D-190` if the reviewer reads it otherwise.
