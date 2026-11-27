PASS 69b8d977a36692628e442f6652d3484e71de4917

# Review of the second return step's commit — task rana-i-opatrunek

Range `26c0209e8a9bb9b882fce390ab61b12300562059..69b8d977a36692628e442f6652d3484e71de4917`, one commit, `foundations/decisions.md` only (+8/−3): the clause `tests:` of the *Verification* of D-120. `git rev-parse HEAD` in the worktree showed `69b8d977a36692628e442f6652d3484e71de4917`, the head given.

## Findings

### Critical

none

### Important

none

### Minor

- **m-1** — `foundations/decisions.md:7692-7696` (D-120, *Verification*, clause `tests:`). The new part reads „a second item with a recipe, laid in a test, keeping the kind „Wytwórz” open for a character without that skill while the rule „Wytwórz — Opatrunek” lies outside the repertoire, is passed over by the simulation and reads „jeszcze nieodkryte: Wytwórz”, …”. By its grammar the subject of „is passed over … and reads” is „a second item”, while what the tests pass over and what reads the reason is the rule „Wytwórz — Opatrunek” (`tests/sim/action-targets.test.mjs`, the loop over `SECOND_RECIPE`: `programInRepertoire` keeps rule 2 only, `outsideReason` of the bandage rule is „jeszcze nieodkryte: Wytwórz”, of the other rule `null`). A reader recovers the meaning from what an item can and cannot do, so it is a matter of form, not of content: the content agrees with the tests. Minor by WAY-364. A wording that keeps the subject would be, for example: „with a second item with a recipe, laid in a test, keeping the kind „Wytwórz” open for a character without that skill, the rule „Wytwórz — Opatrunek” lying outside the repertoire, passed over by the simulation and reading „jeszcze nieodkryte: Wytwórz”, and „Wytwórz” with the second item inside it, …”.

### What was checked and holds

- **The clause names tests that hold the sentence of D-120 as the correction left it.** The three tests added by the correction in `tests/sim/action-targets.test.mjs` (two cases of `SECOND_RECIPE`: `board`, a recipe no skill grows, with `WITHOUT_TENDING`; `splint`, grown by the skill `probe` laid in the test, with `[...WITHOUT_TENDING, "probe"]`; and the converse test with `tending` and without `probe`) carry `decision: D-120` and match the clause part by part: the kind „Wytwórz” kept open (precondition `repertoire.actions.includes("craft")`), the bandage rule outside, passed over and with the reason „jeszcze nieodkryte: Wytwórz”, the other item inside, „whether no skill grows its pair or another skill among the predispositions does”, and „with that skill and without the one of the second item the bandage inside and the second item outside”. „Passed over by the simulation” is held: the tests check `programInRepertoire`, which the simulation's `programOf` (`src/browser/sim/game.ts:194`) applies. „That skill” refers to „Opatrywanie małych ran”, the name of the skill `tending` (`src/browser/sim/data/skills.ts:75-76`), the one left out by `WITHOUT_TENDING`.
- **The tests fail when the pair is judged by the kind.** With `actionInRepertoire` reverted in a worktree of the head to `item === undefined || repertoire.items.includes(item)` (the kind check above it kept, the pair check dropped) the two files gave 45 passed, 3 failed: exactly the three new tests. On the head unchanged both files pass, 48 of 48.
- **No binding sentence changed.** The diff touches lines 7692-7699 only, inside the *Verification* field; the binding paragraph (7680-7683), the other fields, *Rationale* and *Rejected* are untouched. The foundation check, which compares binding sentences with those at the base, reports 0 errors.
- **The form of the entry** (`.the-way/elements/decisions/template.md`, „Verification”): the clause is in words, with no path, no test name and no number; D-120 carries no pair of examples and none was needed, since the tests hold the sentence. Only m-1 above.
- **No entry for the guideline sentence; D-206 unchanged — sound.** `return_step.md` writes a choice that binds after the merge where the questions of the decisions template place it; where the place is another, no entry is written. The sentence added to `guidelines/coding-saved-game.md:103` (and the parenthesis at `:124`) is a rule for how to write code: question 2 places it in the guidelines. The exception of question 2, a rule that carries a choice with a real cost, does not call for an entry here: the cost of a raise, a player of the older version starting anew with the previous save kept, is the accepted cost of D-206, whose *Rationale* (`foundations/decisions.md:3948-3950`) already carries the reason „better to discard it than to load a state the rules no longer describe”, which covers the new cause word for word in meaning. The human's remark 2(a) (`reports/correction-1-remarks.md:12`) asked for the sentence in the guideline by `the-way-maintain-coding-guidelines` and for nothing else. D-206's binding sentence („carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one”) says nothing of which causes raise the version, so the new cause makes no word of it untrue; the review's Minor finding 2 of the correction, on the words „of its shape”, is no foundation entry and stays for the request's list.
- **The report's list of entries found unchanged.** Spot-checked D-126 (`:8313`), D-206 (`:3918`), D-289 (`:9948`) against the code of the correction: they stay true. D-126's rule (a rule whose action or its target lies outside the repertoire is passed over and stays) is what `ruleInRepertoire` → `actionInRepertoire` now does by pair. I found no claim in the list contradicted; the other entries the report names (D-119, D-193, D-195, D-196, D-443, D-310, D-334, D-335, D-336, D-396, D-43, the glossary entries) I did not reopen (see Unread material).
- **The report's claims on commits and checks**: one commit, `foundations/decisions.md` only, +8/−3 — confirmed by `git diff --stat`.

## Declined to judge

- The pick of the target of „Wytwórz” in the program editor (`src/browser/view/item-target-pick.ts:51`, `knownTargets`) filtering by items alone, and the return step's sentence that no entry names the pick as judged by the pair: the code lies outside this range and is the correction review's out-of-scope finding o-1, carried to the request's list; with today's data (one archetype holding `tending`) it shows nowhere, and D-289 lists no closed pair among its greyed reasons, so no entry is untrue of reachable behaviour.
- The rows „Teraz” (D-334, D-335, D-336, D-396, D-43) and the CSS of the correction: the step changed none of them and this range holds no CSS; the comparison was the correction review's.

## Checks

- `git rev-parse HEAD` in `the worktree's root`: `69b8d977a36692628e442f6652d3484e71de4917`, the head given.
- `git log` and `git diff 26c0209e8a9bb9b882fce390ab61b12300562059..HEAD` (and `--stat`): one commit, one file.
- In the worktree of the head `.runs/review-return-2/` (`.the-way` populated by `git submodule update --init -- .the-way`, at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, equal to the gitlink; `node_modules` a junction to `the `node_modules` of the main checkout`):
  - `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`.
  - `node scripts/build.mjs`: exit 0.
  - `node --test tests/sim/action-targets.test.mjs tests/sim/repertoire.test.mjs`: exit 0, 48 passed, 0 failed.
  - Probe (manual mutation): in that worktree's `src/browser/sim/understanding.ts`, `actionInRepertoire`'s default branch changed from `(repertoire.items.includes(item) && pairOpen(action.kind, item, repertoire.predispositions))` to `repertoire.items.includes(item)`; `node scripts/build.mjs` exit 0; the same `node --test …`: exit 1, 45 passed, 3 failed — the three new tests of `SECOND_RECIPE` and the converse. The probe shows no finding, so no copy of it is kept in `reports/`.
- Not run: the whole suite (as the handoff gives); `check_instructions.py` (not asked; the commit touches no instruction file).

## Reaches beyond the dispatch

- `foundations/decisions.md`, D-206 whole (`:3918-3969`): to check the step's reading of its *Rationale* and binding sentence for the guideline sentence.
- `foundations/decisions.md`, D-126 whole (`:8313-8331`) and D-289's binding sentences (`:9948-9962`): to spot-check the report's list of unchanged entries and the editor pick.
- `src/browser/sim/game.ts:185-198`: that `programInRepertoire` is the simulation's reduction of the program, for „passed over by the simulation”.
- `src/browser/sim/data/skills.ts:75-76`: that `tending` is „Opatrywanie małych ran”.
- `reports/review-correction-1-report.md`, lines 20-40 and 85-120 (o-1, o-2, Declined to judge, Checks): for the correction's own checks and its out-of-scope findings.
- `git diff 83204edc..26c0209e` of `tests/sim/action-targets.test.mjs`, `src/browser/sim/understanding.ts` and `guidelines/coding-saved-game.md`.

## Working copies

- `.runs/review-return-2/` — a detached worktree of `69b8d977`, with `.the-way` populated and the `node_modules` junction; the junction removed with `rmdir` (exit 0, the main checkout's `node_modules` still present), then the worktree with `git worktree remove --force` (exit 0) and `git worktree prune`; the directory no longer exists.
- `.runs/review-return-2-build.log` — a build log written by mistake one level above the working directory; removed with `rm -f` by its full path.
- The reviewed worktree stays clean (`git status --short` empty) at `69b8d977`.

## Unread material

- `foundations/decisions.md`: read D-120, D-126, D-206 whole and D-289's binding sentences; not the other entries the step's report lists as unchanged (D-119, D-193, D-195, D-196, D-443, D-310, D-334, D-335, D-336, D-396, D-43, D-369) nor the glossary entries `repertoire` and `predisposition`.
- `tests/sim/repertoire.test.mjs`: read by its test names in the run output only, not its code (the clause adds nothing about it).
- `reports/review-correction-1-report.md`: read in part (lines named above). `reports/return-step-2-handoff.md`, `reports/return-step-2-report.md`, `reports/correction-1-remarks.md`, `.the-way/task-cycle/skill/return_step.md`, `.the-way/elements/decisions/template.md`, `.the-way/task-cycle/review/SKILL.md`: read whole. `task_frozen.md`: not read; the dispatch's checks needed only the passages above.
- `src/browser/sim/understanding.ts`: read by the correction's diff and lines 135-152.

## Searches not found or unclear

none
