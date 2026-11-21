PASS 9efb8a8a

# Review rs5 — slice 5 of `ocena-programu-na-ziarnach`, range `f93df2f6..9efb8a8a`

One commit, `9efb8a8a` (head confirmed with `git rev-parse HEAD` in the cycle's worktree). Changed files: `src/browser/sim/types.ts`, `src/browser/sim/loop.ts`, `src/browser/sim/saved-game.ts`, `tests/sim/loop.test.mjs`, `tests/sim/loop-record.test.mjs` (new), `stryker.config.json` (one line, named by the orchestrator as an addition beyond *Change*).

Judged against: frozen task lines 37, 95-101, 157-158, 230, 235 (as carried by the handoff); D-241 (whole, as the foundation step changed it), D-190, D-221, D-240, D-245, D-206, D-386 (each whole); invariants save-version, death-settled-once, catch-up-state, loop-practice-payment; guidelines `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/testing.md`, each whole.

## Findings

### Critical

none

### Important

none

### Minor

1. **The shape of the save changes at this commit while `SAVED_GAME_VERSION` stays 8** — `src/browser/sim/saved-game.ts:85`, `:1137-1158`.
   What: `earningLoop` now requires the keys `inARow` and `loopRecord`, so at this commit every version-8 save the server holds with an earning loop in it is refused as `shape` (a damaged save, „Zapis był uszkodzony…”), not as `version`. The guideline rule "Wersja podnoszona razem z kształtem" (`guidelines/coding-saved-game.md:93-113`, D-206, save-version) asks for the raise with the change of shape. The plan mandates the split (choice 6: Slice 6 raises the version and rewrites the document of `tests/sim/saved-game.test.mjs`), so this is a defect the plan mandates, named so here.
   Why it matters: were this commit to reach the server alone, a player's save would be discarded as damaged, and since the server fills the previous-save slot only on a save of a higher version (D-399), the next same-version save would overwrite it with no previous save left — the loss D-206 avoids with a version raise. Nothing deploys a task branch commit by commit, so the risk lives only until Slice 6 lands in the same merge; the review of the whole change must confirm the raise and the paired test document. The case "neither (the shape before the numbers)" in `tests/sim/loop-record.test.mjs:406-409` pins the `shape` refusal of the old shape at today's version; once the version is raised the same document is refused earlier as `version`, so that case keeps passing only because it builds its document from a save of the current version — consistent, no change needed.
   Evidence: `src/browser/sim/saved-game.ts:85` reads `export const SAVED_GAME_VERSION = 8;` at the head; the case above passes (`npm test -- tests/sim/loop-record.test.mjs`, exit 0).

2. **The load admits counts no game makes: a run in a row or a loop record above the completions** — `src/browser/sim/saved-game.ts:1153-1158`.
   What: by D-241 both numbers count completed map runs of the earning loop, so the game never makes `loopRecord > completed` (nor `inARow > completed`); the load refuses `completed >= runNumber` and `inARow > loopRecord` but not this. My probe loaded a document with `inARow = loopRecord = 999` and `completed = 0` (`ok: true`).
   Why it matters: little. The guideline allows refusing more and forbids refusing less than the types, closed lists and data admit (`guidelines/coding-saved-game.md:82-86`); the type admits it, the plan's wording asks only for "the run not above the longest", and a forged save of the player's own costs that player alone (D-07) — it would show a larger number in the line of the report. The executor weighed it in its report (section *Choices*). Broader coverage that would be nice, not a requirement.
   Evidence: `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rs5-probe-out.txt`, line "info record above completed …: {"ok":true,…".

## Declined to judge

- The line of the report „Gdy cię nie było” reading the loop record (frozen task line 37, D-246): Slice 5's *Goal* holds only the counting and the save; the view is another slice's.
- The raise of `SAVED_GAME_VERSION` and the document of `tests/sim/saved-game.test.mjs`: Slice 6 by the plan; the orchestrator says not to grade that file's red state.
- `-0` admitted by `count` (a JSON document can carry `-0`, and the load keeps it as `-0`): the helper is older than the range and serves every count of the save; harmless, as `-0 + 1 === 1`.
- Survived mutants on lines the range did not write — `src/browser/sim/loop.ts:310` and `:334` (the string of `kind`; equivalent for `"noPractice"` → `""`, since only `"covered"` and `"stopped"` are compared, and for `"completion"` → `""` likewise) and `src/browser/sim/saved-game.ts:1148`, `:1155` (`run.character.id !== characterId`, `completed >= runNumber`): pre-existing checks that `tests/sim/saved-game.test.mjs` guards, a file I excluded from the mutation run because it is red until Slice 6.
- The uncommitted changes in the cycle's worktree (`src/browser/sim/judging.ts` modified, `src/browser/sim/judging-record.ts` untracked) seen at the end of the review: outside the range, another agent's work in progress; HEAD stayed `9efb8a8a`.

## What I checked and found sound

- Counting (D-241 as changed, D-190, D-221, D-240): `takeEnd` (`src/browser/sim/loop.ts:294-380`) is the one place the end of an earning loop's map run is dealt with; `endLoopRun`, `passLoops` and `catchUp` all go through it, so the open game and the catch-up count alike. A completion adds one to `inARow` and raises `loopRecord` to it where larger; a death settled `covered` or `noPractice` (the earning loop goes on) sets `inARow` to 0 and leaves the record; `progressLost` returns before the counts and drops the loop with them; `stopLoop` drops the loop; `startLoop` writes 0 and 0; `advanceLoopRun` and `takeLoopPractice` carry the loop through with `...loop`. D-241's "complies" example (3 C, covered D, 2 C → 2 in a row, record 3) and both "violates" examples (number in a row kept after a covered death; record staying after a stop) are tested for all three drivers.
- Trust boundary `src/browser/sim/saved-game.ts`: the two keys go through `fields` (exactly the listed own keys, `__proto__` included) and `count` (safe integer from 0), and `inARow > loopRecord` is refused. Each crafted document of my probe, a real save of the current version changed at one place, was refused whole as `shape` with no throw: −1, −0.5, 0.5, 1.5, 2^53, MAX_SAFE_INTEGER+1, 1e308, −1e−9, "2", true, null, [], {}, [2] in each key; the run one above the record; either key missing; a foreign key; an accessor `inARow`; an inherited `inARow`; an own `__proto__` key beside the keys; `inARow` only under an own `__proto__` key. The game's own saves loaded back into the same state (deep equality) after every step of 120 random sequences of completions and covered deaths across the three drivers (1440 steps), and after 400 hours of the open game and of the catch-up.
- The tests: 23 cases in `tests/sim/loop-record.test.mjs`, expected numbers written by hand from D-241; the save cases built from a save of a game state, as the plan asks. The changes to `tests/sim/loop.test.mjs` are only the key list and two zeros of the first case and the two D-243 quotations shortened to a prefix of D-243's present first sentence; no other case changed.
- Every `// decision:` line in the range's test files quotes a binding sentence from its beginning: the foundation check reports none of them.
- No reserved choice; no code made for a test's input; sizes within D-425.

## Checks run

All in a detached worktree of `9efb8a8a` at `.runs/review-rs5/wt`, after `npm ci`.

| Check | Result |
|---|---|
| `npm test -- tests/sim/loop-record.test.mjs` | exit 0, 23 pass |
| `npm test -- tests/sim/loop.test.mjs` | exit 0, 46 pass |
| `npm test -- tests/sim/catch-up.test.mjs` | exit 0, 35 pass |
| `npm test -- tests/sim/saved-game-judgings.test.mjs` | exit 0, 11 pass |
| `npm test -- tests/invariants/test_simulation_inputs.py` | exit 0, 2 tests OK |
| `npm test -- tests/quality/test_mutation_test_selection.py` | exit 0, 1 test OK |
| `npm test -- tests/quality/test_function_and_file_size.py` | exit 0, 2 tests OK |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | exit 1, 5 errors, all the expected D-243 quotations: `tests/view/account-screen.test.mjs:2683`, `:2807`, `:2975`, `tests/view/maps-screen.test.mjs:494`, `:700`; none in a file of the range |
| Probe `review-rs5-probe.mjs` (crafted documents, own saves over 400 h, catch-up) | exit 0, 0 bad; output `review-rs5-probe-out.txt` |
| Probe `review-rs5-probe2.mjs` (oracle from D-241 over random C/D sequences, three drivers, save round trip each step) | exit 0, `steps 1440 bad 0` |
| StrykerJS, `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.review.json --mutate "src/browser/sim/loop.ts:307-379,src/browser/sim/saved-game.ts:1137-1167"`, a copy of `stryker.config.json` whose test files are the four focused files above (the full list holds the red `tests/sim/saved-game.test.mjs`, which would fail the dry run) | exit 0; 65 mutants, 59 killed, 5 survived, 1 no coverage; every mutant on a line the range wrote was killed; the survivors are classified under Declined to judge; output `review-rs5-stryker-out.txt` |

Not run: `tests/sim/saved-game.test.mjs` (red until Slice 6, by the plan); the full gate (`npm test` without a file), which is the cycle's own run.

Evidence kept beside this report in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/`: `review-rs5-probe.mjs`, `review-rs5-probe2.mjs`, `review-rs5-probe-out.txt`, `review-rs5-stryker-out.txt`. The probes import from `./wt/…`, the removed worktree; to rerun them, place them in a directory holding a worktree of the head at `wt/` after `npm test` has built `dist/`.

## Reaches beyond the dispatch

- `src/browser/sim/loop.ts:290-626` (whole `takeEnd`, `endLoopRun`, `passLoops`, `catchUp`) and `src/browser/sim/saved-game.ts:80-219`, `:1100-1210` (the reading helpers and `earningLoop`): the reach of the change.
- `foundations/decisions.md`, D-243 (`:8771`) whole: to confirm the shortened quotations of `tests/sim/loop.test.mjs`.
- `stryker.config.json` and `guidelines/testing.md` "Mutation testing": to run the reviewer's mutation run.
- `a note in the author's private notes` and `git.md`: the user's rules for writing a script and for a `git worktree` command, which a hook served before the first such command.

## Working copies

- `.runs/review-rs5/wt` — detached worktree of `9efb8a8a` with its `.the-way` submodule and `node_modules`; removed with `git worktree remove --force`, then `git worktree prune`.
- `.runs/review-rs5/` — the probes, their outputs and the outputs of the checks; the evidence copied to `reports/` as listed above, then the directory removed by its full path. No remainder.

## Unread material

- Frozen task: only the passages the handoff carries (lines 37, 95-101, 157-158, 230, 235), as the handoff gives them.
- The plan's "Foundation entries" rows 3, 6 and 11: not in the handoff; I judged against D-241, D-190 and the glossary term as the task's rows 8 and 13 and D-241's present text give them.
- `foundations/glossary.md:223-228` earning loop, `:142-147` completion, `:211-216` resurrection: not opened; the decisions read whole carried what the review needed.
- `tests/sim/saved-game.test.mjs:1-120`: not opened; the slice does not change or run it.

## Searches not found or unclear

- The frozen task (line 158) says `SAVED_GAME_VERSION` stands at 7; the code holds 8 at the base and at the head. Unclear which the task meant; Slice 6 raises it either way.
