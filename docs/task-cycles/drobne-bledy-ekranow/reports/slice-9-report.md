# Slice 9 report — each new copy with every group unfolded

## Status

`done with concerns`

The fix is in and its focused checks pass. Lint and format are now clean for the two changed
files (the coordinator's fix, commit `bc79b284`). One concern stays open: no screenshot was taken
for the own-work check.

## Commits

- `eb8986aa` — `fix: :bug: unfold every rule group of a new copy at a send and at a switch, so the folds of the copy before do not pass to it`
  - base of the slice: `85e379de`
  - files: `src/browser/view/program-panel.tsx` (+24, −1), `tests/view/program-panel.test.mjs` (+77, −0)
- `bc79b284` — `style: :art: drop the useless assignment of the open rule in the program panel, and format the program panel test`
  - on top of `eb8986aa`, as the coordinator asked
  - files: `src/browser/view/program-panel.tsx` (+0, −5: the `open = null;` line and its braces, now one line), `tests/view/program-panel.test.mjs` (formatting only, outside my block: the lines slice 8 added at the "closed by ✕ / Escape" test and the "same field after the drag" assertion; my own block is formatted too)

## The choice (where the memory learns of a new copy)

The change is in the panel, `src/browser/view/program-panel.tsx`, not in `src/browser/view/game-view.ts`
(the handoff's *Change* lists both; `game-view.ts` is unchanged).

- A new copy by a **send** is recognised from the events of the result: the result has `mapRunStarted`
  and no `mapRunEnded`. A restart always carries a `mapRunEnded` (`restart` in `src/browser/sim/game.ts`
  returns `mapRunEnded` first), so a restart keeps the copy's folds. A send is refused while a map run
  stands (`send` throws), so a send's result never carries `mapRunEnded`.
- A new copy by a **switch** has no event of its own. The panel's switch action sets a flag around the
  call to the simulation, and the update that call makes clears the copy's folds.
- The clear is `folding.set("copy", [])`, before the panel draws, and only in the panel of the map run
  (`mode === "run"`). The saved programs' folds are not touched.
- Rejected: clearing in `game-view.ts` inside `onTaken`. It would need the same event test there, and
  the two new cases could then not be tested in `tests/view/program-panel.test.mjs`, the one test file
  the handoff names. Cost if wrong: a future path that starts a copy without `mapRunStarted` would keep
  the old folds. Cost of the chosen way: the rule lives in the panel, and a later start of a copy with
  other events needs the rule extended there.

## Checks

Each run was `npm test -- <file>` or the named command, from the worktree root.

Checks requested by the coordinator for the fix commit (run after `bc79b284`'s content was in place):

| # | Command | Exit | Result |
|---|---|---|---|
| A | `npx eslint src/browser/view/program-panel.tsx src/browser/view/rule-panel.tsx` | 0 | no problems |
| B | `npx prettier --check src/browser/view/program-panel.tsx src/browser/view/rule-panel.tsx tests/view/program-panel.test.mjs` | 0 | all matched files use Prettier code style |
| C | `npm test -- tests/view/program-panel.test.mjs` | 0 | 59 pass, 0 fail |

Earlier checks of the feature commit `eb8986aa` (kept for the record):

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `npm test -- tests/view/program-panel.test.mjs` (before the product change, after the tests were written) | 1 | 57 pass, 2 fail: "a send after the copy's group was folded…" and "a switch of the character after the copy's group was folded…", both `the new copy's group is unfolded: expected 1, got 0`. The restart case passed, as a guard should before the change. |
| 2 | `npm test -- tests/view/program-panel.test.mjs` (after the product change) | 0 | 59 pass, 0 fail |
| 3 | `npm test -- tests/view/run-screen.test.mjs` | 0 | 20 pass, 0 fail |
| 4 | `npm test -- tests/view/end-question.test.mjs` | 0 | 17 pass, 0 fail |

Test names added to `tests/view/program-panel.test.mjs`, after the folding tests:

- "a send after the copy's group was folded shows the new copy with every group unfolded" — the send case
- "a switch of the character after the copy's group was folded shows the new copy with every group unfolded" — the switch case
- "a restart keeps the folds of the copy it carries on" — a guard (it passes before the change too)

## Own-work check

Requirement most likely not met: a copy that is not new (a restart, or a plain edit) must keep its folds,
and a new copy from a send or a switch must show every group unfolded. The check: break each new rule
on purpose and see whether the matching test fails.

- Mutation A: the switch clear removed (the `switching ||` term replaced by `false ||`). Command:
  `npm test -- tests/view/program-panel.test.mjs`, exit 1, 1 fail: "a switch of the character after the
  copy's group was folded…". Caught. Restored.
- Mutation B: the clear made on any `mapRunStarted`, the `mapRunEnded` exclusion dropped. Command: the same
  file, exit 1, 1 fail: "a restart keeps the folds of the copy it carries on". Caught. Restored.
- After both restores the file was green again (check C above, exit 0, 59 pass).

Browser check: no screenshot was made. The change alters which groups fold, not how anything looks; the
decision's verification is the jsdom test set. Unchecked for a browser: the look of an unfolded group
after a send in the running game. The foundation's settled route for screenshots was not looked up.

## Questions and concerns

1. **Resolved by the coordinator's fix (`bc79b284`).** The eslint error (`no-useless-assignment` on the
   `open = null;` line of the rule-panel block) is gone, and the test file is Prettier-clean. Per the
   coordinator, both faults came from slice 8 (`85e379de`), not from the base. Check A and check B above
   show the result.
2. **Open: no screenshot for the own-work check.** The foundation's settled screenshot route was not
   looked up. Whether a browser check is needed for this slice is the orchestrator's call.
3. **Left as is, per the coordinator: earning loops.** The handoff and the task name a send and a switch
   only. A loop starts a copy too (D-164), through `startLoop`, which does not emit `mapRunStarted`. I did
   not check whether the panel of a map run can show a loop's copy, so I did not handle it.
4. **Scratch edit, reverted.** To check whether the eslint error predated the slice, I wrote the base
   version of `program-panel.tsx` over the worktree file for one lint run, after saving a copy. The file
   was restored from that copy and compared byte for byte (`cmp`), so the commits are unaffected.

## Unread material

- `.runs/task-cycles/drobne-bledy-ekranow/task.md` — not opened. The handoff quotes the passages it names
  (lines 31, 194–195, 210), and I worked from those quotes.
- Row 15 of the plan's Foundation entries — not opened. Its content matches D-294 in `foundations/decisions.md`,
  which I read.
- Every other file the handoff names was read; the guideline files were read whole (`guidelines/coding.md`,
  `guidelines/testing.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`),
  as were `src/browser/AGENTS.md`, `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`,
  `src/browser/view/program-panel.tsx`, `src/browser/view/game-view.ts` and `tests/view/program-panel.test.mjs`.
- `tests/view/run-screen.test.mjs` and `tests/view/end-question.test.mjs` were run, not read.
- `src/browser/view/rule-panel.tsx`, linted and format-checked in the fix, was not read.

## Searches not found or unclear

- Whether an earning-loop start can show its copy on the panel of a map run (see concern 3). Unclear, not searched further.
- The foundation's settled route for screenshots, which `ui_check.md` points to. Not looked up; no screenshot made.
- `foundations/part_map.md` was not needed and not read.

## Reaches beyond the handoff

- Read the product code that decides what a result means for the copy, by ranges and not whole files:
  `src/browser/sim/game.ts` (`startRun`, `send`, `restart`, lines 255–345, 440–530), `src/browser/sim/programs.ts`
  (`switchProgram`, lines 740–810), `src/browser/view/state-store.ts` (most of it), `src/browser/view/program-panel-acts.ts`
  (whole), `src/browser/view/chronicle-entries.ts` (`CopyAct`, lines 45–70). Searched `maps-entry.ts`, `clock.ts`
  and `run-entry.ts` for the send, switch and restart paths.
- Read `foundations/glossary.md` `copy` and `foundations/invariants.md` `document-test-memory-limit` as the handoff lists them.
- Read the git rules file `a note in the author's private notes` (delivered by the rules hook on the first commit attempt).
- Concern 4 was a temporary write over my own worktree file, described above.

## Working copies

The only working copies were files I wrote into `.runs/slice-9/` and `.runs/` for the lint and format
checks: test logs and two copies of the base files. I removed them after the checks. No worktree and no
clone was made. None remain.
