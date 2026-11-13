PASS 8f8b911c21c4eb3b76efc2bfeae6e7cdb093557b

# Review of the whole change — progi-drzew-walki

Variant: the whole change, one author, no plan, no slices. Range `1b0c8ad4466fdd6d067da7bbc27b10458d81012b..8f8b911c21c4eb3b76efc2bfeae6e7cdb093557b` (`6e7e95e7`, `fb3313f9`, `8f8b911c`). `git rev-parse HEAD` in `the worktree's root` is `8f8b911c21c4eb3b76efc2bfeae6e7cdb093557b`, as dispatched. Worktree status is clean after my checks (`git status --short` is empty).

Counts: blocking 0, Minor 3 (all within the task), out of scope 0 findings (plus the Declined to judge lines below).

## Changed files (`git diff --stat`, 4 files, +63 / −17)

| File | Added / removed |
|---|---|
| `foundations/decisions.md` | +4 / −4 |
| `src/browser/sim/data/skills.ts` | +5 / −5 |
| `tests/sim/skills.test.mjs` | +25 / −8 |
| `tests/view/character-skills.test.mjs` | +29 / −0 |

No file of `.the-way`, no `saved-game.ts`, no screenshot or image among the commits (WAY-316 holds).

## Against the task

| Task item | Where met |
|---|---|
| To do 1: „Walka bronią jednoręczną” at 15, 40, 100, 300 | `src/browser/sim/data/skills.ts:40` (`thresholds: [15, 40, 100, 300]`); table test `tests/sim/skills.test.mjs:113` |
| To do 2: „Mocniejszy cios” four ranks, 1 point each, +2, 14 at full | `skills.ts:163` (`costs: [1, 1, 1, 1]`, effect amount 2, preview base 6 step 2 unchanged); tests `skills.test.mjs:168-180` (four purchases, fifth refused), `:479-491` (damage 14), `:526` (minute test, practice 300); view test `character-skills.test.mjs:54-81` |
| To do 3: „Kopanie” at 10 and 30 | `skills.ts:42`; table test `:114` |
| To do 4: „Cięższy kop” two ranks, 1 point each, +1 | `skills.ts:171` (`costs: [1, 1]`); tests `skills.test.mjs:158-161`, view test `:73-80` |
| To do 5: „Unik przed ciosem” at 4 and 15 | `skills.ts:46`; table test `:115` |
| D-379 *Change made by this task* | `foundations/decisions.md:9347` and following; see the fidelity section below |

„Zwinny odskok” keeps prices 1 · 1 (`skills.ts:179`). I agree with that reading: To do 1–5 and D-379's *Change made* name neither it nor its prices. With „Unik przed ciosem” at 4 and 15 the tree gives two points and the branch's two ranks cost two points, so it can be bought fully.

Nothing was added that nobody asked for, except the new view test (`tests/view/character-skills.test.mjs:54`), which is needed: the rank list of a branch cannot be told from the points in the simulation tests (see the mutation section), and the task's Context names that D-199 shows the maximum rank from data.

The task's Context claim about `saved-game.ts:411` holds: line 411 refuses a rank above `BRANCHES[branch].costs.length` and the later loop refuses negative points. Lowering thresholds only adds points, so no saved game that loaded before is refused now; „Cięższy kop” at 2 and „Mocniejszy cios” at 3 or 4 load.

## Source fidelity of the decision entry (D-379)

I compared the diff word by word (`git diff --word-diff`) with the task's *Change made by this task*:

- Binding paragraph: only the five numbers changed (15, 40, 100, 300; 10 and 30; 4 and 15; prices 1 · 1 · 1 · 1 and 1 · 1). Nothing else in the paragraph moved. „Zwinny odskok” untouched.
- *Verification*, complies: „Mocniejszy cios” at its fourth rank, 14 damage in place of 6. 6 + 4 × 2 = 14 agrees with D-144's base 6. The violates line is unchanged.
- *Rationale*: carries the task's sentence („The numbers of the three combat trees and their two branches are no longer the old loop game's: they are set lower so that the points of combat can be earned on the first maps with combat, and are to be corrected either way when more maps are balanced.”) and the *Accepted with it* clause about progress carried between versions, both verbatim in sense. The author's own insertions are „of the other skills” and „the old” in place of „those”; both are accurate (the other five skills keep the old numbers).
- *Rejected*: the task's list is reproduced whole (four-times-lower thresholds with their numbers, fourth threshold kept, fourth threshold dropped, „Cięższy kop” keeping three ranks). The old line is gone, see Minor 2.
- The entry is edited in place and describes the decision as it stands (WAY-07, WAY-19) apart from Minor 3. No invariant derives from D-379 and none was changed. No invariant test was changed. `foundation_check.py` passes.

## Old numbers still standing

I searched all tracked files outside `.the-way` and `.runs` (470 files) for the skill and branch identifiers and names (`oneHandedCombat|kicking|dodging|strongerStrike|heavierKick|agileDodge`, the Polish names) and for the old values (`30, 90, 200`, `10, 30`, `12 damage`, `12 obrażeń`, `three ranks`). Files that name the skills: `foundations/decisions.md`, `archetypes.ts`, `skills.ts`, `tests/sim/{data,encounters,run-record,saved-game,skills,team}.test.mjs`, `tests/view/{character-skills,team-lines}.test.mjs`. The only hits for old values are the new ones (`[10, 30]`) and the view test's „teraz 12 obrażeń” (rank 3 of four, correct). Fixtures in `saved-game.test.mjs` (`practice: 31` for „Walka bronią jednoręczną”, no ranks) stay valid: the points are only earned, none spent. Text shown to the player is built from data (`src/browser/view/character-skills.ts:22-31`), so no literal old number lives in the view. The one place in the foundation that still states the old numbers' provenance for these branches is D-144, see Minor 1.

## Tests and guidelines

- Where the expected value comes from (D-80, D-82): the changed expectations come from D-379 and D-144's bases (6 and 3), written out by hand; comments in the changed tests name only decisions (`skills.test.mjs:1`, `:518`), no document outside the foundation.
- Changing an existing test (D-73): every changed expectation has its cause and source in D-379 (the five thresholds, ranks and damage 14). No assertion was weakened; one was strengthened (second kick purchase now succeeds, third refused).
- The view test calls the pure function `branchText` on built `dist` code and loads no jsdom; "Tests on a document imitation" does not apply. It pins the exact row text, as the neighbouring tests of the same file do (D-199 gives the format).
- Styleguide (`guidelines/styleguide-browser-view.md`), read whole by me: no rule governs a test file; no markup, style, role or token changed; no state to show. The author's order deviation (read after committing the view test) had no effect. Screenshot of Postać: none taken, none required (WAY-219 case "checked in code": the row text is asserted).
- Author's own-work check: the weakest point named is "Cięższy kop has two ranks, third purchase refused" and the author said it passes also with three prices. I confirmed that and that the view test closes it (below).

## Checks I ran (command, exit code)

| Command (cwd `the worktree's root`) | Exit |
|---|---|
| `npm test -- tests/sim/skills.test.mjs` | 0 (19 pass) |
| `npm test -- tests/view/character-skills.test.mjs` | 0 (4 pass) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |
| `npx prettier --check src/browser/sim/data/skills.ts tests/sim/skills.test.mjs tests/view/character-skills.test.mjs` | 0 |
| `git status --short` after all checks | empty |

Not run: the full `npm test` (the cycle's gate, by instruction); eslint (the author ran it, exit 0; I did not repeat it).

### Mutation check (`guidelines/testing.md`, "Mutation testing")

- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/skills.ts"` in a scratch copy of the head commit (`git archive 8f8b911c`, extracted to `a scratch directory outside the repository`, with `node_modules` joined by a junction that I removed afterwards): exit 0, but "Instrumented 1 source file(s) with 0 mutant(s)". The file is a constant table, so StrykerJS makes no mutant of it and judges nothing. This is a result about the tool on this file, not a pass of the tests.
- Replacement: 15 hand-made mutants in the same scratch copy (`npm test -- <file>` for the two test files for each; exit codes shown as skills.test / view.test, 1 = the mutant is caught):
  - thresholds of „Walka bronią jednoręczną”: 16/40/100/300, 15/41/100/300, 15/40/101/300, 15/40/100/301: 1 / 0 each, caught by the table test;
  - „Kopanie” 11/30 and 10/31, „Unik” 5/15 and 4/16: 1 / 0 each, caught;
  - `strongerStrike` costs `[1,1,1]` and `[1,1,1,2]`: 1 / 1, caught by both;
  - `strongerStrike` costs `[1,1,1,1,1]`: 0 / 1, caught only by the view test;
  - `heavierKick` costs `[1]` and `[1,2]`: 1 / 1, caught by both;
  - `heavierKick` costs `[1,1,1]`: 0 / 1, caught only by the view test;
  - `agileDodge` costs `[1,2]` (a branch the task leaves unchanged): 0 / 0, caught by neither of these two files. I did not run the other files of `tests/sim/` on it; it lies outside the task (see Declined to judge).
  Classification: no surviving mutant of the changed lines in these two files; the two "view test only" mutants are the rank-list tail that points cannot reach (real behaviour, kept by the view test). The scratch copy was restored from the original after the loop (`cmp` equal).

## Findings

**Critical:** none.

**Important:** none.

**Minor** (each lies within the task; none blocks):

1. `foundations/decisions.md:2995`, D-144 (*Rationale* and *Rejected*, neighbour entry the change does not write). D-144 says „The numbers of the actions and of the ranks of their branches are those of the predecessor game, loop, taken as the requirement” and rejects „another initial balance — departs from the accepted predecessor numbers”. After this change the rank counts of „Mocniejszy cios” (4) and „Cięższy kop” (2) are not the predecessor game's, by D-379. D-144's binding sentence (bases 6, 3, 5, the wolf) is not contradicted; only its rationale now over-claims. Why it matters: an agent that compares a later change with D-144 reads a requirement D-379 has replaced (WAY-33 asks the search to turn such a neighbour into an edit). Evidence: D-144 read whole (`### D-144`), against D-379's diff. Suggested fix: one clause in D-144's *Rationale* naming that the ranks of the two combat branches are D-379's.
2. `foundations/decisions.md`, D-379 *Rejected*. The old line „other numbers given by the human instead of the old loop game's data” was replaced, not kept. It still holds for the five skills whose numbers are unchanged (the *Rationale* now says they keep the old game's numbers), and D-374 and D-387 keep the same line for theirs. The task's *Change made* list carries no instruction about it either way, so the author's replacement matches the task's words; the cost is that a later agent proposing human-chosen numbers for „Eksploracja” finds no refusal in D-379. A kept line narrowed to „for the other skills” would have lost nothing. Not blocking: the task's list is reproduced whole and nothing in it is contradicted.
3. `foundations/decisions.md`, D-379 *Rationale*: „are no longer the old loop game's”. The template says the fields describe the decision as it stands, never the change (WAY-07). The words are the task's own, so this is Minor and I record the wording only; „are not the old loop game's” would state the same without history.

**Out of scope:** none.

## Declined to judge

- „Zwinny odskok” prices 1 · 1 and the gap that no test in the two files I ran notices a change of them (mutant `agileDodge [1,2]`): the task leaves the branch unchanged; pre-existing.
- The simulation tests cannot tell the rank list of a branch from the points (a purchase over the last rank is refused by points first): the author reports it; it is a property of the data (points come only from thresholds), closed by the view test, not a defect of this change.
- Balance of the new numbers (too generous or not): the task says it is to be corrected either way later (D-80).
- The task's *Settlements to record* is `none` (0 accepted), so no row or projected entry to check.

## Reaches beyond the dispatch

- `grep` over the 470 tracked files outside `.the-way` and `.runs` for the skill, branch and old-number patterns, to answer "where old numbers might still stand".
- D-144, D-140, D-120, D-197 and the neighbours of D-379 (D-374, D-387, D-206, D-386) read whole, to judge the foundation around the entry; D-85, D-81 read for test levels.
- `.the-way/elements/decisions/template.md` lines 55-75 and 112-150 (what *Rationale*, *Rejected* and an edit in place may hold), to judge the entry.
- `src/browser/view/character-skills.ts:22-31` and `src/browser/sim/saved-game.ts:395-420`, to check what the screen and the load read from the data.
- `StrykerJS` and the 15 hand-made mutants in a scratch copy outside the repository (path above).

## Unread material

Counts: decisions of my selection (326 entries whose *Scope* names `simulation`, `browser-view` or `product-foundation`): **27 read whole** (D-379 in its whole diff and the task's copy, D-18, D-34, D-73, D-80, D-81, D-82, D-85, D-120, D-140, D-144, D-150, D-191, D-192, D-193, D-194, D-195, D-196, D-197, D-198, D-199, D-200, D-201, D-206, D-374, D-386, D-387) and **299 by title only** (I went through the full title list of the 326).

- Decisions whose title may bear on the change and stayed unread: D-143 „What does the first wolf attack reveal?”, D-145 „How do weapon wear and wound dressing work today?”, D-146 „What ends an encounter?” (combat neighbours that use damage numbers; D-144 holds the numbers, and a search for the old numbers found none in them as a statement of skill numbers), D-189 „What pays, and what takes from the chest?”, D-329 „What stands at each character in the section „Kto idzie”…” (opened by title only; it names no skill numbers by its title). None of them restates a threshold, price or rank count as far as my text search of the whole log for the old values shows (`grep` of `decisions.md` for the old patterns found only D-379, D-374 and its own new text).
- Invariants: read whole only content-identifiers, character-team, simulation-isolation, action-duration-minimum, solved-map-manual-run, save-version; the rest of `foundations/invariants.md` not read (none cites the skills' numbers; `grep` of the file for practice, threshold found only `solved-map-manual-run`).
- Glossary: read whole the entries character skill, practice, well fed, combat turn, copy, trip plan, resurrection, generation number (lines 150-215); the rest of `foundations/glossary.md` not read.
- Part map: read the entries of `browser-view`, `simulation`, `account-server`, `build-tools`, `agent-workflow`, `product-foundation` and the start of `deployment` (the first 150 lines); the rest not read (no touched file belongs to it).
- Guidelines: each of these read whole: `guidelines/coding.md`, `guidelines/coding-content-data.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `.the-way/product-guidelines/reading.md`. Not read: `guidelines/coding-simulation-module.md` (its *When to read* excludes data files and `saved-game.ts`; no module of the simulation changed), `guidelines/coding-saved-game.md` (the file is not changed), the other `coding-*` kinds (other parts).
- `.the-way/elements/common/way_of_working.md`: read only "Reading the foundation" (lines 54-120).
- `.the-way/task-cycle/review/SKILL.md` and `whole_change.md`: read whole.
- The author's report and the frozen task: read whole.

## Searches not found or unclear

- Stryker produced 0 mutants for `skills.ts`, so the guideline's "which survived" question has no answer from the tool for this file; I used hand-made mutants (above).
- No invariant or glossary entry about the combat thresholds, price lists or rank counts exists (searched `foundations/invariants.md` and `foundations/glossary.md` for practice, threshold, rank); none found, none needed.
- The handoff says „the three combat trees and their two branches” (from D-379's text); „Zwinny odskok” is a third combat branch, so „two branches” means the two that change. I read it that way, as the orchestrator confirmed.
