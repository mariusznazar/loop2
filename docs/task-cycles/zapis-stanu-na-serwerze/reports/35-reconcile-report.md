# Report — reconciliation with the target branch, task `zapis-stanu-na-serwerze`

**Status:** done with concerns (two foundation/guideline matters left to the orchestrator, see "Concerns").

## Commits

| Commit | What |
|---|---|
| `a20e1d4` | Renumbers this branch's D-179 – D-190 to D-202 – D-213 (add 23), before the merge. 17 files, +107 −107 |
| `765fb3b` | Merge commit of `origin/main` (`e5025f6`), parents `a20e1d4` and `e5025f6`. Conflict resolutions only |
| `932da64` | The strict save and load of the fields main brought, its tests, and saving a bought branch rank at once |

Nothing was pushed or rebased.

## Files changed

- Renumbering (`a20e1d4`), 138 replacements made with a regex on `D-179`…`D-190` that matches whole identifiers only, in: `foundations/decisions.md` (43), `foundations/invariants.md` (9), `guidelines/coding-browser-module.md` (5), `guidelines/coding-saved-game.md` (8), `guidelines/testing.md` (12), `src/browser/sim/saved-game.ts` (1), `src/browser/styles.css` (1), `src/browser/view/app.ts` (7), `src/browser/view/game-saver.ts` (10), `src/browser/view/game-view.ts` (4), `src/browser/view/program-panel.ts` (1), `src/server/database.ts` (4), `tests/account-storage.test.mjs` (2), `tests/http.test.mjs` (2), `tests/view/account-screen.test.mjs` (21), `tests/view/game-saver.test.mjs` (7), `tests/view/program-panel.test.mjs` (1). `.runs/` and `docs/` were left alone. The base `dce2970` had no D-179 or later, so every hit was this branch's. Afterwards no `D-179`–`D-190` was left outside `.runs/` and `docs/` before the merge.
- Merge (`765fb3b`):
  - `foundations/decisions.md`: main's D-179 – D-201, then this branch's D-202 – D-213. The numbers now run on to D-213. The gaps reported are older ones from the base (after D-111/112/113).
  - `foundations/invariants.md`: main's `action-duration-minimum`, `trip-transfer`, `trip-run-end` and `trip-plan-progress`, then this branch's five.
  - `stryker.config.json`: both `tests/sim/saved-game.test.mjs` and `tests/sim/skills.test.mjs`.
- `932da64`: `src/browser/sim/saved-game.ts` +177 −22, `src/browser/view/game-view.ts` +1 −1, `tests/sim/saved-game.test.mjs` +376 −7, `tests/view/account-screen.test.mjs` +55 −0.

## What the strict load now covers (`src/browser/sim/saved-game.ts`)

`SAVED_GAME_VERSION` stays 1, as the handoff gives.

- **Program `tripPlan`:** checked by the existing `checkProgram` plus `matches`, so keys are exact, items come from `ITEMS`, each item stands once per list and counts are integers ≥ 1. On top of that, each count must be a safe integer (`identity`). `checkProgram` alone takes `1e300`. The helper `action()` now builds its program with an empty trip plan; without it every activity and combat action would have been refused.
- **`GameMapRun.bringPlan`:** read by the new `tripList`: exact keys, an item of the data, each item once, count a safe integer ≥ 1.
- **`GameMapRun.deposited`:**
  - It is `null` exactly when there is no completion.
  - At a completion it is a trip list whose entries follow the frozen bring plan's order, each at most its planned count (D-179, D-189, `clipTrip`).
- **Chest:** keyed by item (`ITEMS`), no longer by resource. Counts are ≥ 0, since a key at 0 stays after `takeTrip`. The total must be ≤ `BALANCE.chestCapacity`.
- **`Understanding.trees`, and the discovery's trees:** a unique list of `SKILLS`.
- **`Character.skills` and `RunCharacter.skills`:** read by the new `characterSkills`:
  - each key is a skill of `SKILLS` and one of the archetype's predispositions; the run character's archetype comes from its team character;
  - each entry is exactly `practice` and `ranks`; practice is a safe integer ≥ 0;
  - each rank names a branch of `BRANCHES` of that skill's own tree, from 1 up to the number of the branch's prices, and is bought only in a tree the Understanding holds (`buyBranch`);
  - `skillProgress(...).points` must be ≥ 0, so no more points are spent than the reached thresholds give (D-191, D-200).
- **`MapRun.practice` and `CombatResult.practice`:** keys from `SKILLS`, each value a safe integer ≥ 1. That holds because `practiced` and `sumPractice` only add 1s.
- **Activity kind `patrol`:** admitted through `checkProgram` and the `ACTIONS` closed list. It is not a move.
- To make this possible, `Records` now holds the characters by their archetype and the known trees, and the Understanding is read before the team.

## Tests (`tests/sim/saved-game.test.mjs`)

- **The written-out document `DOCUMENT`:**
  - trip plans in `PROGRAM_1`, `PROGRAM_3` (which also gets a patrol rule), `COPY_BASE` and `COPY_PROGRAM` (moss added during the run);
  - the frozen `bringPlan`, `deposited: null`, and a chest with a key at 0;
  - known trees (eating left out, consistent with `eat` not being discovered);
  - Ala's skills with ranks within points, and Ola's new-character skills;
  - run practice, and combat practice of `oneHandedCombat: 4` (the four strikes that hit).
- **`HEADQUARTERS`:** given `trees` and skills.
- **The completed case:** now carries a `deposited` list.
- **54 new crafted cases:** trip plans, frozen bring plan, deposit, chest, trees, character and run skills, practice, combat practice, and a patrol of an absent resource. Each is refused as `shape`.
- **The "game state the simulation made" table gains four states:**
  - a run equipped from the chest after buying „Szybki posiłek”;
  - a completion that deposited and paid its practice;
  - the headquarters after that completion and „Zakończ”;
  - a patrol going on with „Obchód” bought.

  Each state comes with its preconditions asserted.
- The header comment was updated.

In `tests/view/account-screen.test.mjs`, the table-driven case `ACTS` gains two acts, each expected to send one save at once:
- "an edit of a program's trip plan" („Zabierz: dodaj przedmiot”);
- "buying a branch rank" („Kup: Szybki posiłek”, expected `buyBranch(start, 1, "quickMeal")`).

## Checks

| Command | Exit |
|---|---|
| `npm run typecheck` (merged tree, before changes to saved-game.ts) | 1 (5 errors: `trees`, `skills` ×2, `practice` ×2 missing — the shape main changed) |
| `npm run typecheck` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` (first run, a completion state with streak 476 > minute) | 1 (my test fixture; replaced by a run moved on to minute 476 consistently) |
| `npm test -- tests/sim/saved-game.test.mjs` (wrong rule index in one crafted case) | 1 (TypeError in the test; fixed) |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 (13 pass) — also rerun after prettier, 0 |
| `npm test -- tests/view/account-screen.test.mjs` with `game-view.ts` buy reverted to `store.apply` (failing run) | 1 (`buying a branch rank` fails) |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (35 pass) |
| `npm test -- tests/view/game-saver.test.mjs` | 0 (17) |
| `npm test -- tests/view/program-panel.test.mjs` | 0 (22) |
| `npm test -- tests/sim/trip.test.mjs` | 0 (15) |
| `npm test -- tests/sim/skills.test.mjs` | 0 (18) |
| `npm test -- tests/view/trip.test.mjs` | 0 (4) |
| `npm test -- tests/view/character-skills.test.mjs` | 0 (4) |
| `npm test -- tests/view/program-editor.test.mjs` | 0 (39) |
| `npm test -- tests/account-api.test.mjs` | 0 (22) |
| `npm test -- tests/transport.test.mjs` | 0 (10) |
| `npm test -- tests/account-storage.test.mjs` | 0 (51) |
| `npm test -- tests/http.test.mjs` | 0 (39) |
| `npx eslint src/browser/sim/saved-game.ts src/browser/view/game-view.ts tests/sim/saved-game.test.mjs tests/view/account-screen.test.mjs` | 0 |
| `npx prettier --check …` (same files + `stryker.config.json`) | 1 (saved-game.ts, saved-game.test.mjs); after `--write`: 0 |
| `node -e "JSON.parse(…stryker.config.json…)"` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors), on the resolved tree and again after `932da64` |

Not run:
- The whole gate (`npm test` with no argument) — it is the orchestrator's, after the review of the merge.
- Stryker — the reviewer runs the mutation tool for the simulation part.
- The other main-only test files (`tests/sim/*` that main changed, apart from trip and skills) — they are main's and untouched by this branch's code.

### Mutation sweep (own work)

22 hand mutations of the new checks in `saved-game.ts`, each followed by a run of `npm test -- tests/sim/saved-game.test.mjs`. Each mutation removed or weakened one check: trip list duplicates, trip count safety and minimum, chest capacity and items, practice minimum and keys, own tree, rank within prices, known tree, rank minimum, points, practice safety, deposit ⇔ completion both ways, deposit order and count, unique trees, and run-character, combat and run practice reading.
- 21 were caught (exit 1).
- **Not caught: the predisposition check.** The only archetype, `elementalMage`, predisposes all eight skills, so no document can name a skill outside them with the current data. The check stays as protection; no test can reach it today.

The file was restored after the sweep; `git diff` and the later runs confirm it.

## Own-work check

- **Requirement most likely missed:** a game state the simulation really makes with the new fields — a deposit, paid practice, bought ranks, patrol — being refused by a check that is too strict.
- **Check:** the four simulation-made states added to the round-trip test (`savedGame` → `loadSavedGame`).
- **What it showed:**
  - My first completion fixture (streak 476 at minute 4, as `trip.test.mjs` sets it) was refused by the branch's existing `streak > minute` check. That fixture is not a state the simulation reaches.
  - With the run moved on consistently to minute 476, all four load back equal (exit 0).

## Task 13 / 10 acts that save, and the auto-merged files

- **Saving:** the auto-merged `game-view.ts` had main's new headquarters callback `buy` calling `store.apply` directly, so buying a rank would have waited for the next 30-second check. It now goes through `act`, which saves at once.
- **Trip editor:** its acts commit through the program editor's `commit` to `editCopy`/`editProgram`, which already go through `act`. This is covered by the new table case.
- **`game-view.ts`:** compared with `origin/main`. Main's trip lines, practice line and buy are present once; this branch's saver wiring is unchanged.
- **`styles.css` and `program-panel.ts`:** compared with `origin/main`. Only this branch's additions sit on top of main, with nothing lost and nothing doubled.
- **Server:** `src/server/**` is unchanged on main (`git diff --quiet dce2970 origin/main -- src/server` exit 0), so it brings no schema step.

## Identifier collisions

- Decisions: renumbered as above.
- Invariants: no collision. Main added `action-duration-minimum`, `trip-transfer`, `trip-run-end` and `trip-plan-progress`; this branch added `player-save-isolation`, `expired-session-unsaved-progress`, `account-save-sqlite-store`, `saved-state-http-exchange` and `save-version`.
- Environment facts: only this branch added any.
- Glossary terms: only main added any (`practice`, `trait`, `trip plan`).

## Choices

- **Skills of a team character:** must be a *subset* of its archetype's predispositions, not exactly them. Rejected: requiring all of them, which is what the game makes. Cost if wrong: a document missing a skill loads; the simulation handles a missing skill (`Partial`, `skillProgress` with `undefined`).
- **The run character's skills:** checked by the same rules, not for equality with the team character's. Rejected: requiring equal ranks, or equal practice while the run goes on. Cost if wrong: a crafted run with different ranks than its team character loads.
- **No check that practice of a skill implies its tree is known, or that the run's practice belongs to the character's predispositions:** neither is admitted by any decision as a rule. The load may refuse more, but I kept to what the decisions and types state.
- **Practice maps of a run and of a combat:** values ≥ 1, because the simulation never writes a 0. A character skill's practice is ≥ 0.
- **The guideline rule "Dokument w teście przepisz tylko razem z podniesieniem wersji":** I rewrote the test document with the version kept at 1, as the handoff orders. The test's header comment now states that exception, and the version is not raised.

## Concerns (for the orchestrator)

1. **D-207 does not list buying a branch rank.**
   - Its list of the player's changes after which the game saves ends at "… sending one, „Restart”, „Zakończ”, a pause and a pace". The page now saves at once after „Kup” (D-200), as the handoff asks. Trip-plan edits fall under "an edit of a program or of the copy".
   - I did not amend D-207: `record-decision` step 4.2 asks before writing where an entry changes an approved decision's meaning beyond the approved task document, and this task's document predates task 10. Questions go to you, not the human.
   - Recommendation: amend D-207's list to name "buying a branch rank" through `the-way-record-decision`, with the human accepting it at the merge.
   - If nothing is done: the code and its test say one thing, the decision another, and a later agent reading D-207 could treat the purchase save as unasked for.
2. **`guidelines/coding-saved-game.md` is incomplete after the merge.**
   - Its list of data checks ("Wczytanie sprawdza też wobec danych: …") now also needs: the chest capacity, the items of the chest and the trip lists, skills and branches, rank prices, and archetype predispositions.
   - Its rule on rewriting the test document only with a raised version does not name the exception the handoff applied.
   - I did not edit it: guidelines change only through `the-way-maintain-coding-guidelines`, which works inside a task refinement with the human.
   - Recommendation: a small refresh of that file through that skill.
   - If nothing is done: the guideline under-describes the load, but nothing in it is false about the code.

## Reaches beyond the dispatch

- I read D-179 – D-201 whole in the merged `foundations/decisions.md`, and main's invariant and glossary additions through the diff. The handoff named them.
- Beyond what the handoff named, I read:
  - `src/browser/sim/types.ts`, `data/skills.ts`, `skills.ts`, `trip.ts`, `data/archetypes.ts`, `data/traits.ts`, and the main diffs of `programs.ts`, `run.ts`, `game.ts`, `combat.ts`, `understanding.ts`, `headquarters.ts`, `program-editor.ts` and `trip-editor.ts` — to find every new field and the values the simulation writes;
  - `tests/sim/trip.test.mjs` (first 200 lines) and `tests/sim/understanding-fixture.mjs` — to build simulation-made states;
  - `.the-way/elements/decisions/skill/SKILL.md`, `.the-way/elements/common/way_of_working.md` and the head of `.the-way/product-guidelines/coding/SKILL.md` — to judge whether D-207 and the guideline may be changed here.

## Searches not found or unclear

- The handoff names "the deploy skill in both copies" among the files that name D-179 – D-190. Neither `.claude/skills/loop2-deploy/**` nor `.agents/skills/loop2-deploy/**` names any of those decisions; their only matches are port 18080. Nothing to renumber there.
- The handoff speaks of "buying a branch rank" as an act of task 13. It belongs to task 10 (D-200). I treated it as meant.
- The handoff calls the saving moments "D-184's moments (D-207 after the renumbering)". D-207's text does not name a purchase (concern 1).

## Amendments

The orchestrator asked me to amend both concerns above in this reconciliation. Both are now done; concerns 1 and 2 are settled by the commits below.

### Commits

| Commit | What |
|---|---|
| `3f64a7b` | D-207 amended through `the-way-record-decision`. Its binding list now names "buying a branch rank" among the player's acts after which the game saves at once. Its *Verification* gains the complying example "„Kup” of a branch rank in the headquarters followed at once by a save request". The question, *Scope*, *Based on*, *Relations*, *Origin*, *Rationale* and *Rejected* are unchanged. |
| `f7d8234` | `guidelines/coding-saved-game.md` completed through `the-way-maintain-coding-guidelines`, following "Writing the files" of `.the-way/product-guidelines/coding/template.md` and the form in `.the-way/product-guidelines/template.md`. See below. |

### The D-207 amendment

- The search of the foundation for D-207 found references in D-208 and D-212 ("as D-207 gives") and in the code and tests. None of them needs a change.
- No invariant derives from D-207, and no decision names it in *Relations*.
- The *Origin* still names this task's source. The purchase comes from D-200 and the merge, not from that source.

### The changes to `guidelines/coding-saved-game.md`

- **Rule "Wersja podnoszona razem z kształtem"** (binding):
  - The list of things the load checks against the data now also names: items, character skills and the branches of their trees, the chest capacity, the archetype's predispositions, the number of each branch's prices (its highest rank), and the practice thresholds that give the points to spend.
  - A new sentence: the test document may be rewritten without raising the version only while no saved game state of the current version exists anywhere, because the change has not reached any server; the comment above the document in the test says so.
- **Examples** (not binding):
  - a new example "Plan wyprawy i skrzynia", covering `program`'s safe trip counts, `tripList`, `bringPlan`, `deposited` (null exactly without a completion; the bring plan's order; at most the planned count) and `chest`;
  - a new example "Umiejętności postaci i wprawa", covering `characterSkills`, `trees`, `practice` and the `patrol` action;
  - the example "Przebieg mapy po wczytaniu" now says an ended run comes back with its deposit and its practice.
- Every value is taken from the code of `932da64` and from the decisions D-179, D-181, D-189, D-191, D-193, D-195, D-197, D-200 and D-212. None comes from memory.

### Meanings that need the human's approval (WAY-172)

1. **D-207:** buying a branch rank („Kup”) is a moment of saving at once, like the other acts of the player.
2. **Guideline, the extended data list:** changing the chest capacity, an archetype's predispositions, a branch's prices, the practice thresholds, or removing a skill, branch or item makes saved documents of the current version that no longer meet the data be refused as damaged (`shape`), not as another version. The version is not raised.
3. **Guideline, the exception:** the test document may be rewritten without raising `SAVED_GAME_VERSION` while no saved game state of the current version exists anywhere (the change was never deployed). No decision carries this exception yet. It stands in the guideline on the orchestrator's instruction of this reconciliation.

### Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after `3f64a7b`) | 0 (0 errors) |
| `python -B .the-way/elements/common/foundation_check.py` (after the guideline edit) | 0 (0 errors) |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (5 tests, OK) |

### Searches not found or unclear

- `the-way-maintain-coding-guidelines` is written for a task's refinement with the human. Its steps — research, trial run, settling with the human — do not fit an amendment within a cycle. I followed its "Writing the files" rules: values from the code and the foundation, no values copied from configuration, each unsettled choice named above for the human.
- Exception 3 has no decision behind it. Recommendation: settle it as a decision (or as a sentence of D-206) at the merge, or drop the sentence if the human rejects it.
