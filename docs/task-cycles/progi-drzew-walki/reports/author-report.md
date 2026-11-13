# Author report — progi-drzew-walki (the one author, whole change)

## Status

`done` (no open questions to the orchestrator; concerns listed under *Problems and gaps*).

## Commits (branch `task/progi-drzew-walki`, base `1b0c8ad4`, not pushed)

| Commit | Subject | Files (added / removed lines) |
|---|---|---|
| `6e7e95e7` | feat: :balance_scale: lower the thresholds of the combat trees and set the combat branches' ranks as D-379 has them | `src/browser/sim/data/skills.ts` (+5 / −5); `tests/sim/skills.test.mjs` (+25 / −8) |
| `fb3313f9` | docs: :card_file_box: record the lower combat thresholds and the combat branches' ranks in D-379 | `foundations/decisions.md` (+4 / −4) |
| `8f8b911c` | test: :white_check_mark: check the ranks of the combat branches on the screen Postać from the data | `tests/view/character-skills.test.mjs` (+29 / −0) |

Working tree clean after the commits. `.the-way` not touched. `saved-game.ts` not touched.

## One-line check result

Focused checks pass (skills 19/19, data 34/34, encounters 29/29, saved-game 36/36, team 7/7, character-skills view 4/4; prettier, eslint and `foundation_check.py` run on its own: exit 0, 0 errors). Full `npm test` not run, by instruction.

## The change

Data (`src/browser/sim/data/skills.ts`), exactly as the frozen task and D-379's *Change made by this task* give it:
- `oneHandedCombat.thresholds`: `[30, 90, 200]` → `[15, 40, 100, 300]`
- `kicking.thresholds`: `[20]` → `[10, 30]`
- `dodging.thresholds`: `[10, 30]` → `[4, 15]`
- `strongerStrike.costs`: `[1, 1, 1]` → `[1, 1, 1, 1]` (four ranks, +2 damage each, base 6 so the fourth rank gives 14)
- `heavierKick.costs`: `[1, 1, 1]` → `[1, 1]`

The `preview` fields (`base`, `step`) were not changed; they remain coherent with the ranks (6 + 2 × 4 = 14; 3 + 1 × 2 = 5). `Zwinny odskok` (`agileDodge`) keeps its prices `[1, 1]`; the settled change list does not name it.

Foundation (`foundations/decisions.md`, D-379, edited in place through the decision's element steps; no invariant derives from it, and no other entry derives from it, so no neighbour edit was due — D-387 only cites D-379 for the character-skill numbers, which still holds):
- binding paragraph: the three combat thresholds and the two price lists now read as in D-379's *Change made*;
- *Verification*, complies example: „Mocniejszy cios” at its fourth rank does 14 damage in place of 6 (was third rank, 12);
- *Rationale*: now says the other skills keep the old game's numbers and the three combat trees and their two branches do not; carries the *Accepted with it* sentence about progress carried between versions (verbatim sense of the settlement);
- *Rejected*: replaced by the settled list (the old „other numbers given by the human” line was superseded and removed).

## Tests

Test-first: I changed the tests first (threshold table, „Cięższy kop” second and third purchase, „Mocniejszy cios” rank and damage, new four-rank purchase test), then the data.

Changed existing tests (expectations taken from D-379's accepted *Change made*, not from the code's output):
- `tests/sim/skills.test.mjs` threshold table (`oneHandedCombat` [15, 40, 100, 300], `kicking` [10, 30], `dodging` [4, 15]) — the table test checks threshold − 1 gives the lower level and the threshold itself gives the new point.
- Purchase test with `heavierKick`: a second purchase is now expected to succeed (two points), a third refused. Was: second refused.
- Combat test `combat practice counts ...`: `strongerStrike` 3 → 4 ranks, damage 12 → 14.
- Combat minute test: `strongerStrike` 3 → 4, practice 200 → 300 (four points need 300), comment 6 + 4·2 = 14.

New tests:
- `Mocniejszy cios has four ranks at one point each, and its fifth purchase is refused` (`tests/sim/skills.test.mjs`).
- `the combat branches show their ranks from the data ...` (`tests/view/character-skills.test.mjs`): `Mocniejszy cios 3/4 … teraz 12 obrażeń → po kupnie 14 obrażeń · cena 1`, `4/4 … teraz 14 obrażeń`, `Cięższy kop 1/2 … teraz 4 → po kupnie 5 · cena 1`, `2/2 … teraz 5 obrażeń`. Expectations are hand-computed from D-379 and the preview formula, not copied from output.

## Checks (command → exit code)

1. Red, before the data change: `npm test -- tests/sim/skills.test.mjs` → **exit 1**, three AssertionErrors for the expected reasons: `oneHandedCombat` at 15 gave `{level 1, next 30, points 0}` (old threshold); `heavierKick` second purchase left rank 1 (expected 2); `strongerStrike` purchase stopped at rank 3 (expected 4).
2. Green, after the data change: `npm test -- tests/sim/skills.test.mjs` → **exit 0**, 19 pass, 0 fail.
3. `npm test -- tests/sim/data.test.mjs` → exit 0, 34 pass.
4. `npm test -- tests/sim/encounters.test.mjs` → exit 0, 29 pass.
5. `npm test -- tests/sim/saved-game.test.mjs` → exit 0, 36 pass.
6. `npm test -- tests/sim/team.test.mjs` → exit 0, 7 pass.
7. `npm test -- tests/view/character-skills.test.mjs` → exit 0, 4 pass (after the new test was added).
8. Mutation checks (own-work, see below), each restored with `git checkout -- src/browser/sim/data/skills.ts` and the view test re-run green afterwards (exit 0, 4 pass):
   - Mutant A, `strongerStrike` costs three prices: `npm test -- tests/view/character-skills.test.mjs` → **exit 1** (`Mocniejszy cios 3/3 …`, expected `3/4`).
   - Mutant B, `heavierKick` costs three prices: `npm test -- tests/view/character-skills.test.mjs` → **exit 1** (`Cięższy kop 1/3 …`); `npm test -- tests/sim/skills.test.mjs` → **exit 0**, 19 pass (not caught there).
9. `npx prettier --check src/browser/sim/data/skills.ts tests/sim/skills.test.mjs tests/view/character-skills.test.mjs` → exit 0 (one line in `tests/sim/skills.test.mjs` was reformatted before this passed).
10. `npx eslint src/browser/sim/data/skills.ts tests/sim/skills.test.mjs tests/view/character-skills.test.mjs` → exit 0.
11. `python -B .the-way/elements/common/foundation_check.py` run on its own (not through the one command) → exit 0, "0 errors".

Not run:
- Full `npm test` (instruction; the orchestrator's gate).
- StrykerJS mutation run on `skills.ts` (the guideline leaves it to the reviewer). Mental mutation check done instead; the mutants in check 8 are the concrete ones.
- Screenshot of Postać: not taken. Reason: the change alters only the numbers the screen reads from data; no style, layout or markup changed; the row text is checked in code by the view test (check 7). Under `ui_check.md` this is the "checked in code, screenshot unchecked" case.

## Own-work check (section 3)

| Requirement the work most likely misses | Check | Showed |
|---|---|---|
| Each new threshold gives its point at exactly its amount, not one below | Threshold table test in `tests/sim/skills.test.mjs` | Red before the data change (the old thresholds fail on the expected reason); green after. |
| „Mocniejszy cios” at its fourth rank gives 14 damage; fifth purchase refused | Combat test (damage 14 with four ranks) and the new purchase test | Green. Caveat: the fifth refusal happens because the four points are spent, not because of the rank list alone — points only come from thresholds, so a data-only test cannot reach a fifth point. The rank cap itself is observed on the screen in the view test (`4/4`, no „po kupnie”). |
| „Cięższy kop” has two ranks; the third purchase is refused | Purchase test in `tests/sim/skills.test.mjs` | Passes also with three prices (points-limited) — a gap. Closed by the view test: mutant B fails it with `1/3`. Green after the new test. |
| The screen's preview stays coherent with the ranks | View test (`teraz`/`po kupnie` values at 3/4, 4/4, 1/2, 2/2) | Green. |
| The Postać row for the other changed trees (Kopanie, Unik) shows the new thresholds | Not tested beyond the table test and the purchase tests | Reasoned only, not run through the screen. |

## Reaches beyond the dispatch

- Read the-way element files for the decision entry: `.the-way/elements/decisions/skill/read.md`, `decide_entry.md`, `examples.md` (names WAY-03; read `.the-way/foundations/decisions.md` WAY-03 for the form), `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md` (whole, read after the first attempt failed; see below).
- Read `.the-way/task-cycle/change/ui_check.md` (required for a changed screen; read after the code change and before the commit of the view test).
- Read `guidelines/styleguide-browser-view.md` (required before changing a `browser-view` file; `tests/view/**` belongs to browser-view per `foundations/part_map.md`). Read after the change to the view test was committed — the order is a deviation, see *Problems and gaps*.
- Neighbour foundation entries read for the search: D-193, D-195, D-200 (no numbers of thresholds or prices), D-387 (cites D-379 for the skill numbers; still true), glossary entries `character skill`, `practice`, `well fed`, invariant `solved-map-manual-run` (no numbers). Grep only over `foundations/invariants.md` and `foundations/glossary.md`: no other entry states the old numbers.
- Also read `guidelines/testing.md` in two reads (lines 1–372 and 373–466) to be whole.

## Unread material

- `.the-way/elements/decisions/projected.md`: not read; projected mode does not apply to this entry.
- `.the-way/project-level/technology/reserved_choices.md`: not read; the change needs no language, framework, library, store or place to run.
- `.the-way/task-cycle/change/slice.md` and `fix.md`: not read; not the variant of this change.
- `guidelines/styleguide-browser-view.md`: read in full up to its line about „The camp of Siedziba” (about the first 54,000 characters); the remaining sections (camp, chronicle, end-of-run window, mockups, plan of a UI change) were read by heading list and by `grep` for „test” only. None of them governs a test file.
- `foundations/decisions.md`: the whole log not read; only the entries named above and the entries found by search. D-374 mentioned in D-379's *Rationale* was not read beyond its heading.
- `foundations/invariants.md`, `foundations/glossary.md`: read by search, not whole (the handoff asks for the entries the work reaches).
- D-199 *Rejected* read in full (one line); D-200 and D-195 read whole as neighbours.

## Searches not found or unclear

- `elements/common/way_of_working.md` — the first read attempt printed nothing (a chained `cat` after a failing `wc`); re-read in full later.
- `.the-way/elements/decisions/skill/SKILL.md` names the product-level skill for the decision steps; the product skill `the-way-record-decision` points back to it. Followed.
- No file names a test or a value for „Zwinny odskok” in the settled change; the settlement's phrase „the three combat trees and their two branches” could be read as covering it. I kept its prices (`[1, 1]`) and kept D-379's wording verbatim. Flagged for the orchestrator to confirm.
- The screen rows for the other combat tree numbers (Postać, Kopanie and Unik at their new thresholds) are not covered by a view test.

## Choices made

- Two commits for code and decision, plus one for the view check; the decision entry is a separate commit. Alternative: one commit. Cost of this choice if wrong: none for the merge; a reviewer reads the decision separately.
- Fifth „Mocniejszy cios” purchase test runs from the headquarters fixture (four points in total). Alternative: a fixture with more points — not reachable through data. Cost: the test cannot separate the rank list from the points; the view test shows the cap.
- The new view test pins the screen's text for the combat rows (`Mocniejszy cios 4/4 …`). Alternative: a skills-only test — which misses mutant B (verified). Cost: the view test is tied to the row's wording (D-199 names the format); it is the only test that sees the rank cap.
- D-379 *Rationale* wording: „the curves, the effects and the prices of the other skills are those of the old loop game's data” and „the numbers of the three combat trees and their two branches are no longer the old loop game's”. Alternative: keep the single old sentence. Cost of the chosen wording if wrong: a reader may take the „other skills” clause to exclude Eksploracja etc. — it does not; it means every skill except the three combat trees.
- No adaptation of section 4 (no plan, no slice).
- No invariant test was changed or added (no invariant derives from D-379).

## Problems and gaps

- Order deviation: I read `guidelines/styleguide-browser-view.md` and `ui_check.md` after I had already changed and committed the view test (`tests/view/**` is part `browser-view`). The styleguide holds no rule about test files; no change of mine conflicts with it. Recorded here so the orchestrator sees the order.
- Mutant B passes `tests/sim/skills.test.mjs`. Closed by the view test, but the foundation of the test rule (a check that does not depend on the screen) is not covered in the simulation file. Noted as a gap, not as a defect of the change.
- The fifth-purchase refusal is refused by points as well as by the rank list; a data-only test cannot isolate the rank list (see *Choices*).
- The mutation check of the Stryker kind was not run; left to the reviewer per the testing guideline.
