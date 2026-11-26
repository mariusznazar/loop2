done

# Fix of the red gate (node stage), task `katalog-map`

Worktree `the task's worktree`, branch `task/katalog-map`, head at the start `205b7ad6` (confirmed). Method: `.the-way/task-cycle/change/SKILL.md` with `fix.md`; the finding is the failing case of `tests/view/maps-screen.test.mjs`, "a click whose judging is not yet made when another map of the list opens asks the page to judge nothing and starts no earning loop". The logs `.runs/orchestrator/gate-final2.log` and `gate-final3.log` were not opened: the coordinator's message quotes the failure word for word. Nothing that finding R1 concerns was touched. Nothing pushed; neither `npm test` without a file nor the Python stages were run.

## The cause, with evidence

**The case depends on the wall clock, and the product does what D-243 and D-329 require.**

- How the screen judges (`maps-screen.tsx`, `judging.start`): it draws the waiting button, then judges in `window.requestAnimationFrame(() => window.setTimeout(judge, 0))`. When the frame and its task come, the screen judges only if the card that was clicked still stands (`cardMap.current !== judgedMap` asks for nothing). This is the behaviour D-243 and D-329 ask for: "a click acts on the card it was made on". A click whose frame has already come before the player opens another map has judged on its own card, which is right.
- How the case sets up "not yet made": it clicks „Puść w pętlę” and „Oceń na 12 ziarnach” and then changes the map, with nothing holding the frame. jsdom (`pretendToBeVisual: true`) fires an animation frame every 16 ms of real time. So the case holds its precondition only while the clicks and the change take less than about one frame. That is a dependence on time, which the testing guidelines put under "Time and randomness" ("explicit state, the passing of time and the seed … never waiting for the computer's minutes").
- A probe I put in the case for the measurement (removed after it) timed the first click to the end of the map change, run alone, five times each:
  - at the base of correction 1, `720d1d2a`, in a worktree under `.runs/corrector-bisect/`: 13, 14, 17, 12 and 15 ms;
  - at the head: 17, 16, 17, 16 and 17 ms, with one animation frame firing inside that span in each of the five runs.
  
  The card of correction 1 draws more elements at each of the three draws (two clicks and the change of map), and that pushed this span from below one frame to about one frame. In a full node run, where the files run side by side, the span grows. The frame's task then runs before the change of the map, the screen judges on the card still standing, and the case reads `[["judge",1,"forest",1],["startLoop",1,"forest",1]]`, the failure of the gate.
- Shown deterministically: with a 20 ms wait put between the second click and the change of map, to stand for a slower run, the case as it was fails exactly so (`Error: expected [], got [["judge",1,"forest",1],["startLoop",1,"forest",1],["judge",1,"forest",1]]`, exit 1). The fixed case passes with the same wait (exit 0).
- Not reproduced here as a failure of the whole run: one full node run of the case as it was gave exit 0 (78 s), and so did eight runs of the file at once. The computer of the gate's runs failed it twice; the span measured above says why it can.

Which commit brought it: none brought a fault. The span grew with the card that `16aadaf1` and `bf3e933a` draw, while the case stood unchanged since slice 9 (it is the same at `720d1d2a`). The two cases before it, "a screen taken down while its button waits never asks the page to judge" and "a screen taken down while „Puść w pętlę” judges never asks …", have the same unheld frame: they click, take the screen down and wait 80 ms.

## What I changed, and why

- `tests/view/maps-screen.test.mjs` (+25/−9), commit `2f3c89a5`. A helper `holdFrames(window)` replaces the page window's `requestAnimationFrame` with a queue. Its `release()` runs the held frames and lets the timers run for 80 ms inside one act. The browser's frame clock is something outside the game, and the case now sets the state "not yet made" itself, whatever the speed of the run.
- I used it in the failing case and in the two cases with the same unheld frame. Each now holds the frames before the click, makes the change (another map, or the screen taken down), releases, and asserts `calls` is `[]` as before. The rest of each case, and its assertions, are unchanged.
- The product code is unchanged: it holds D-243 and D-329, and a change there would alter right behaviour to fit a test.
- The check is no weaker: the cases still fail when the behaviour breaks.
  - With the guard `cardMap.current !== judgedMap` broken in `maps-screen.tsx`, `npm test -- tests/view/maps-screen.test.mjs` → 1, the map-change case failing.
  - With the guard `if (!alive.current) return;` broken, → 1, both taken-down cases failing.
  - Both times the source was restored byte for byte (`git diff --quiet` 0).

## Checks (command → exit code, time)

- Node stage, as `scripts/test.py` runs it, after `npm run --silent build` (exit 0): `node --test "tests/*.test.mjs" "tests/sim/*.test.mjs" "tests/view/*.test.mjs" "tests/balance/*.test.mjs"`
  - run 1 → 0, 75 s, 3225 tests, 3225 pass, 0 fail
  - run 2 → 0, 76 s, 3225 tests, 3225 pass, 0 fail
- `npm test -- tests/view/maps-screen.test.mjs` → 0 (51 pass); with each guard broken → 1, as above
- `npm run --silent typecheck` → 0
- `npx eslint --max-warnings 0 tests/view/maps-screen.test.mjs` → 0
- `npx prettier --check tests/view/maps-screen.test.mjs` → 0
- `python -B .the-way/elements/common/foundation_check.py` → 0, "0 errors"
- `python -B .the-way/instruction-files/check_instructions.py` → 0, "0 error, 0 warn, 120 info"
- Not run: the Python test directories and `npm test` without a file (the orchestrator runs the gate).

## Commit

- `2f3c89a5` test: hold the page's animation frames in the cases of a judging asked after its card goes.

## Working copies

- `.runs/corrector-bisect/base`, a worktree of `720d1d2a`: `.the-way` populated, `node_modules` a junction to the worktree's own. It was removed with `git worktree remove --force` and `git worktree prune`, the junction deleted on its own with its target kept, and the directory removed.
- `.runs/corrector-gate/` held the probes, the logs and copies of the files. It was removed with `rm -rf` on its full path.
- The worktree's test and source files were restored after each probe and mutation; the only change committed is the test's.

## Unread material

- `.runs/orchestrator/gate-final2.log` and `gate-final3.log`: not opened; the failure is quoted in the message.
- `guidelines/testing.md`: lines 204–267 not read (as before); the rules used — "Time and randomness", "Changing an existing test", "Behaviour, not implementation" — I read in this session.

## Searches not found or unclear

- The failure was not reproduced as a red full node run on this computer: one full run of the old case and eight loaded runs passed. The cause rests on the measured span (16–17 ms against jsdom's 16 ms frame, with a frame firing inside it) and on the deterministic slow-run probe.
