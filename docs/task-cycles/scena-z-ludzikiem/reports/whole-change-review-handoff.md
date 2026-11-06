# Handoff — review of the whole change of the task `scena-z-ludzikiem`

You review as an agent that made none of it. Read-only: change no tracked file and make no commit; commands that write only under `.runs/` and focused test runs are fine (the orchestrator runs the gate itself afterwards, so run no full `npm test` and no `npm run build` in a way that leaves the tree changed). The person who requested the cycle has delegated intermediate choices to the orchestrator; you never ask the human; a question goes back in your return.

- Worktree: `C:/Storage/repos/loop2-wt/scena-z-ludzikiem`; branch `task/scena-z-ludzikiem`; pinned the-way `61c72fb` (the task does not move the pin).
- Method: `.the-way/task-cycle/review/SKILL.md` whole (project skill `the-way-review-change`), and `.the-way/task-cycle/review/whole_change.md` — this is the review of the whole change, so read it and follow it. You select your own foundation entries and guidelines, by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`, each whole.
- Reviewed: the whole change, **range `8f9e713..c6dd7c3`** (base to head). Confirm `git rev-parse HEAD` is `c6dd7c39ff7bdbb41771fab8ccb518f1361654eb` before you start. Compute the diff yourself.
- Frozen task, whole: `docs/task-cycles/scena-z-ludzikiem/task.frozen.md` (Polish). Plan: `docs/task-cycles/scena-z-ludzikiem/plan.md` (the orchestrator added to the *Read* of slices 4 and 5 and settled the grey in slice 4; the plan's size report is `plan-size.md`). No spec was written (no open design choice).
- Route: planned, six slices and the foundation step, one after another.
- **Trust boundary: yes** — `assets/sprites/**` (six new PNG files from the Pixel Crawler pack); check crafted input there: each file holds pixels alone, only the build copies it. **Irreversible operation: no.**
- Settled by the orchestrator as autonomous choices (record in `docs/task-cycles/scena-z-ludzikiem/cycle.md` is the orchestrator's; not yours to read): the grey of a dead mage and of an extinguished fire is `grayscale(1) brightness(0.55)` (the old Loop draws both so; the pause's is `grayscale(1) brightness(0.5)`); `SCENE_SCALE` stays 2 (672 × 304; the human's choice at task 6's request #58); the mage's places were moved 16 px left because its frame is 64 px wide (old Loop 32 px): moss 32, sticks 42, bush 224, fire 80, clearing 144, right edge 275; the bar at scale 2 is `calc(var(--bar-width) * 2)` and the badge icon is 32 px at scale 2 (chosen by viewing); the walk is a CSS animation started on a new element from an offset the browser reports (one `useLayoutEffect`; whether D-267 allows it is yours to judge).

## Slices, their ranges and whether each had a review of its own

| Slice | Range | Review of its own | Executor and report |
|---|---|---|---|
| Foundation entries | `8f9e713..0d11c97` | yes, with slice 1: `PASS d3a04f3` (`reports/slice-1-review.md`) | `reports/foundation-report.md` |
| 1 sprite files (trust boundary) | `0d11c97..d3a04f3` | yes: `reports/slice-1-review.md` (`PASS`) | `reports/slice-1-report.md` |
| 2 container test, part map | `d3a04f3..bd7216b` | none — judged by you | `reports/slice-2-report.md` |
| 3 scene data and picture module | `bd7216b..73564b5` | none — judged by you | `reports/slice-3-report.md` |
| 4 scene drawn still | `73564b5..5d12eea` | none — judged by you | `reports/slice-4-report.md` |
| 5 motion | `5d12eea..d2851be` | none — judged by you | `reports/slice-5-report.md` |
| 6 guidelines | `d2851be..c6dd7c3` | none — judged by you | `reports/slice-6-report.md` |

All report files are in `docs/task-cycles/scena-z-ludzikiem/reports/`. Screenshots (slice 4) are in `docs/task-cycles/scena-z-ludzikiem/screenshots/`, frame streams (slice 5) in `docs/task-cycles/scena-z-ludzikiem/frames/` — look at some of them yourself.

The orchestrator's mechanical check of each slice passed (clean worktree, non-empty range, changed files equal to the slice's *Change*, every check with command and exit code). Information it passed on: slice 3's first failing run stopped at a missing module (its second run, against a stub, failed on 26 assertions); slices 4's *Change* was extended by `src/browser/sim/data/scene.ts` and `tests/view/scene-picture.test.mjs` for place corrections (the mage's places); slice 5's focused checks did not name `test_browser_view_framework.py`, which its code made fail once (a CSS variable name `--walk-from`, renamed); slice 6's report leaves four uncertainties (the effect rule D-267, the contrast pair of the progress fill in *Contrast of every pair*, the numbers pointed to rather than written, the track's text role).

## Minor and out-of-scope findings of the slice reviews — grade each as a finding of your own review

From `reports/slice-1-review.md` (the review of slice 1 with the foundation entries):

### Minor

1. **D-317 title promises durations the body does not state** (`C:\Storage\repos\loop2-wt\scena-z-ludzikiem\foundations\decisions.md:6829`). The question reads "How long do the scene's effects last?", and the body holds only "The scene follows the system's setting for reduced motion and shows no flash of its whole area." Nothing in D-317 says how long an effect lasts. *Why it matters:* a reader who looks the question up finds no answer to it; D-319 even says the walk is "no effect of an ordinary event", pointing at a limit that no entry states yet. *Evidence:* the *Decisions in play* of the task says the first sentence of the projected entry ("An effect of an ordinary event lasts at most 300 ms ...") is written by task 20, so this is the planned partial entry, and the foundation report names it (concern 5). Nothing to fix now; task 20 must complete the body and, if it wishes, keep the title. Grade Minor, in scope (the entry is written here).

2. **D-122 now contradicts itself** (`foundations/decisions.md:2212-2255`). The new clause says the scene keeps its colours at a stop at a discovery (so a pause and a stop are told apart), while the Rationale still says "Accepted with it: a stop at a discovery cannot be told apart in the game state from the player's pause". *Why it matters:* the next reader of D-122 takes the older sentence as binding. *Evidence:* the task's *Context* says the code contradicts that sentence through `state.discovery` and that task 16, which writes D-122, corrects it. Out of scope by the task's own assignment; named so that task 16 does not miss it. Minor, out of scope.

3. **README sentence repeats itself** (`C:\Storage\repos\loop2-wt\scena-z-ludzikiem\README.md:25`). The added clause says again "autorstwa Anokolisy, których warunki nie wymagają wzmianki" and the sentence now holds three semicolon-joined parts, 1800+ characters in one list item. It is correct and names all six files as the task asks (checked below), but could say "oraz postać maga ... i rekwizyty ... z tej samej paczki" once. Polish only, no effect on behaviour. Minor.

4. **Name `berry-bush.png` for a bush with no berries** (the executor's observation 1). I viewed the pack's `Environment\Props\Static\Vegetation.png` whole: it has no bush with berries at all, only green, olive, amber and red bushes. The file is exactly the one the old Loop uses for berries (`C:\Storage\repos\loop\src\components\probe\Scene.tsx:47`, `bush: ... /sprites/bush.png`, `berry: 'bush'`), D-316 and the task call it "the berry bush" ("krzak jagód"), and a berry-less bush is the only honest Pixel Crawler choice (D-271 forbids another pack). No change needed; the name is the game's name for the thing, not a claim about the pixels. Minor, no action.

## What I ask beyond the method

1. Check every item of *To do* 1–15, every row of *Settlements to record* 1–9 and every projected entry the task carries against the commits, and the sources' fidelity: nothing altered or invented (the foundation entries D-316 to D-322 and the parts of D-04, D-39, D-40, D-43, D-122, D-271, the invariant `loop2-container-sprites`).
2. The scene's code against D-03/D-267 (effects), D-44/D-47 (no new control, nothing the keyboard reaches), D-272 (no text on the scene), D-18 and `content-identifiers`, `browser-view-token-values`; and the guidelines' rules for browser-view code, tests and the styleguide.
3. The acceptance criterion (the human views the scene at 1×, 4× and 16× before the merge) is the human's; do not grade it as missing, but say what stays unchecked.
4. Report: write it to `docs/task-cycles/scena-z-ludzikiem/reports/whole-change-review.md` as `review-change` and `whole_change.md` give it: the first line `PASS <sha>` or `FAIL <sha>`, graded findings (for each blocking finding the slice and commit it comes from, or that it spans slices, or comes from none), the checks you ran with command and exit code, each reach beyond this handoff, and **Searches not found or unclear:**. Return the first line, the changed files with their line counts, a one-line check result and the report path.
