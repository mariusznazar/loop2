PASS 2f3c89a58eb0eb5070f09474bbe90beaeaa150d7

# Review of the fix of the red gate (node stage), task `katalog-map`

- Worktree `the task's worktree`, branch `task/katalog-map`. `git rev-parse HEAD` = `2f3c89a58eb0eb5070f09474bbe90beaeaa150d7`, the head given.
- Range `205b7ad6..2f3c89a5`: one commit, `2f3c89a5`, one file, `tests/view/maps-screen.test.mjs` (+25/-9).
- Method: `.the-way/task-cycle/review/SKILL.md` with `.the-way/task-cycle/review/fix.md`, read whole.
- The finding fixed is the red case of the gate, quoted in the dispatch. I read its failure lines in the two gate logs.

Counts: blocking 0, Minor 1 (new, does not block), out of scope 0.

## The finding: the red case of the gate — fixed

The case is "a click whose judging is not yet made when another map of the list opens asks the page to judge nothing and starts no earning loop".

- **Before:** in `.runs/orchestrator/gate-final2.log:3515-3516` and `gate-final3.log:3515-3516` it fails with `expected [], got [["judge",1,"forest",1],["startLoop",1,"forest",1]]`. The case took 287 ms and 243 ms there.
- **After, on the new head:** two runs, both exit 0.
  - The file alone: 51 pass.
  - The whole node stage: 3225 tests, 3225 pass, 0 fail, 82 s.
- **The defect no longer exists:** the case now sets its precondition, a judging not yet made, by holding the frames. It no longer depends on how fast the run is (check 1 below).

## Checks of the dispatch

### 1. The cause is true

What the product does (`src/browser/view/maps-screen.tsx`):
- **Lines 484-540:** `judging.start` draws the waiting button and schedules `window.requestAnimationFrame(() => window.setTimeout(judge, 0))`.
- **Lines 495-502:** `judge` returns at once on `!alive.current`, which is cleared on unmount (lines 448-453). It asks for nothing when `cardMap.current !== judgedMap`. `cardMap` is updated in a layout effect on every change of `mapId` (lines 443-445).
- **What D-243 and D-329 require:** a click acts on the card it was made on. A click whose judging had already run before the map changed judged its own card. That is right, and no test should call it a fault.
- `maps-entry.ts` holds no frame or timer, by a search for `requestAnimationFrame|setTimeout` over both files.

What the test page does:
- `tests/view/page-document.mjs:49-54` opens jsdom with `pretendToBeVisual: true`.
- Lines 22-30 and 62-64 install the page's `window` as the global `window`. So the product's `window.requestAnimationFrame` is the case's `page.window.requestAnimationFrame`, and the helper's replacement reaches the product.
- jsdom 30.1.3 (`node_modules/jsdom/lib/jsdom/browser/Window.js:593-606`) runs animation frames from a Node `setInterval(…, 1000 / 60)`. The interval starts at the first outstanding `requestAnimationFrame` and is driven by real time.
- **Conclusion:** the claim "frames fire every 16 ms of real time in the test page" holds (16.7 ms).

How the old case could fail:
- In the old case the first click starts that interval, and nothing holds it.
- If the interval fires during an `await` before `screen.update(…forestEdge)`, the loop's judging runs on the card still standing, `forest`. It then calls `judge` and `startLoop`, which are exactly the two calls of the failure.
- A correct screen makes that failure whenever the click-to-update span passes one frame. The gate's 243-287 ms for the case shows a loaded run.
- The cause is a test that depends on the wall clock, against "Time and randomness" of `guidelines/testing.md` (unit test recipe: "bez czekania na minuty komputera", D-84).
- Not reproduced by me as a red full run; the node stage I ran passed. The mechanism follows from the code read above.

### 2. The helper is sound and follows the testing guidelines

What `holdFrames(window)` does (`tests/view/maps-screen.test.mjs:1137-1147`):
- It replaces `window.requestAnimationFrame` with a queue.
- `release()`, inside one `act`, puts the window's own function back, runs every held callback once with `performance.now()`, and waits 80 ms of Node timers.

Why it is sound:
- **Holding:** each product call made while frames are held lands in the queue. The product ignores the returned handle and never calls `cancelAnimationFrame`, so returning the queue length is harmless.
- **Release:** each callback schedules `window.setTimeout(judge, 0)`. jsdom maps that to a Node timer of about 1 ms, created before the case's 80 ms timer. Node fires timers by expiry, so the judging always runs inside the wait, however loaded the run.
- **Restore on every path:** on the normal path, `release` restores the window's function. On a failed path the window is not restored, but `withPage` (`page-document.mjs:93-109`) opens a new window for every case and closes it after, so nothing leaks into another case.
- **The guidelines** (`guidelines/testing.md`, read whole):
  - The fix replaces a wait on real time with a state the case sets.
  - It changes no expected value and weakens no assertion: the three `assert.deepEqual(calls, [])` and the later assertions of the third case stand as before ("Changing an existing test").
  - The 80 ms wait stood there before and is now deterministic, as above.
  - It is no re-run to get a green gate ("Flaky tests"): the cause is found, so no entry in `tests/flaky-tests.md` is due ("Register of flaky tests").
  - The helper's comment says why it exists and names no document outside the foundation ("Where the expected value comes from").

### 3. The three cases still hold the requirement, and cannot pass empty

The cases:
- the map change, above;
- "a screen taken down while its button waits never asks the page to judge" (D-407);
- "a screen taken down while „Puść w pętlę” judges never asks the page to judge or to start the earning loop" (D-243, D-407).

I broke the code and the helper in a copy of `2f3c89a5`: a worktree under `.runs/review-gate-2/wt`, with `node_modules` linked. Each change was undone with `git checkout` and checked with `git diff --quiet`. The command each time was `npm test -- tests/view/maps-screen.test.mjs` in the copy.

| Change | Exit | Failing cases |
|---|---|---|
| guard `cardMap.current !== judgedMap` turned off (`false && …`) in `maps-screen.tsx` | 1 | the map-change case (50 pass, 1 fail) |
| guard `!alive.current` turned off in `maps-screen.tsx` | 1 | both taken-down cases (49 pass, 2 fail) |
| helper never runs the held frames (`held.splice(0);`) | 1 | the map-change case: its button stays waiting (50 pass, 1 fail) |
| helper never runs the held frames, and guard `!alive.current` off | 1 | only the map-change case; both taken-down cases pass (see M1) |

- **For every input:** each case fails when its guard is broken, so each still holds the requirement. The judging is run deterministically, so the cases are not weaker than before.
- **Before the fix:** a run whose frame came first made a correct screen read as broken. A run whose frame came late made a broken guard read as correct.
- **The map-change case cannot pass empty:** its checks after the release (`loopStand`, the buttons enabled, „Oceń na 12 ziarnach”) need the held frame to have run.
- **The two taken-down cases** assert only `calls == []`. That they are not empty rests on the helper running its frames, which it does (row 2). See M1.

### 4. Commands

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `git rev-parse HEAD` | 0 | `2f3c89a5…` |
| 2 | `git log 205b7ad6..2f3c89a5`, `git diff --stat`, `git diff` | 0 | one commit, the test file only |
| 3 | `npm test -- tests/view/maps-screen.test.mjs` | 0 | tests 51, pass 51, fail 0 |
| 4 | `node --test "tests/*.test.mjs" "tests/sim/*.test.mjs" "tests/view/*.test.mjs" "tests/balance/*.test.mjs"` (the `NODE_TESTS` of `scripts/test.py:18-23`), after the build of row 3 | 0 | tests 3225, pass 3225, fail 0, 82 s |
| 5 | `npx prettier --check tests/view/maps-screen.test.mjs` | 0 | clean |
| 6 | `npx eslint --max-warnings 0 tests/view/maps-screen.test.mjs` | 0 | no output |
| 7 | `npm run --silent typecheck` | 0 | no output |
| 8 | `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors" |
| 9 | `python -B .the-way/instruction-files/check_instructions.py` | 0 | "0 error, 0 warn, 120 info" |
| 10 | the four changes of check 3 in the copy | 1 each | as in the table above |
| 11 | `git status --short` at the end | 0 | clean |

Not run: the Python stages and `npm test` without a file (dispatch).

## Findings

### Minor

**M1. The two taken-down cases assert nothing that shows the held frame was run.**
Place: `tests/view/maps-screen.test.mjs:1581-1585` and `:2284-2288`, with the helper at `:1137-1147`.

- **What is wrong:** with the helper's release made to drop its frames and the guard `!alive.current` off, both cases still pass (row 4 of the table in check 3). Their only assertion, `calls == []`, is also what nothing happening gives.
- **Why it does not block:** today the helper does run the frames, as the guard change of row 2 shows, and the product calls the frame function once per click.
- **When it would matter:** if the helper broke, or the product's frame requests went elsewhere, these two cases could pass without testing anything. The map-change case is safe, since its checks after the release need the frame.
- **Possible fix:** `release` could check, as a marked precondition, that it ran at least one held frame ("Behaviour, not implementation": „Kontrola przygotowania stoi przed działaniem, jest oznaczona jako warunek wstępny”).
- **Evidence:** `.runs/task-cycles/katalog-map/reports/review-gate-2-probe/mutation-never-release-and-guard-alive.log` and the script `mutate.sh` beside it.

## Declined to judge

None.

## Reaches beyond the dispatch

- `node_modules/jsdom/lib/jsdom/browser/Window.js:580-650` and `node_modules/jsdom/package.json` (version): to judge the claim of check 1 at its source.
- `tests/view/maps-screen.test.mjs:1100-1150` (`until` and the helper) and the three cases whole.
- A search of `tests/view/*.test.mjs` for other fixed waits (`setTimeout(resolve`): the other hits are the `until` polling (allowed by "Time and randomness" of integration tests) and other files outside this fix.

## Working copies

- `.runs/review-gate-2/wt`: a worktree of `2f3c89a5`, with `node_modules` a junction to the worktree's own.
  - The junction was removed on its own with `cmd /c rmdir`; its target is intact (`node_modules/react/package.json` present).
  - Then the worktree was removed with `git worktree remove --force` and `git worktree prune`. `git worktree list` no longer shows it.
- `.runs/review-gate-2/` held the logs and the script. It was removed with `rm -rf` on that full path.
- Kept beside this report, as the probe of M1 and of check 3: `.runs/task-cycles/katalog-map/reports/review-gate-2-probe/`, with `mutate.sh` and the four `mutation-*.log`.
- The reviewed worktree's tracked files were never changed (`git status --short` clean).

## Unread material

- `.runs/orchestrator/gate-final2.log` and `gate-final3.log`: only the failure lines (the `✖`, `ℹ pass/fail` and `Error:` lines), as the dispatch asks.
- `src/browser/view/maps-screen.tsx`: lines 430-550 (the judging) read, and the rest searched for frames and timers.
- `src/browser/view/maps-entry.ts`: searched only, no frame or timer in it.
- `tests/view/page-document.mjs`: lines 1-165 read, the `assert` part not read; it does not bear on frames.
- `tests/view/maps-screen.test.mjs`: the helper, `until` and the three cases read; the other cases not.

## Searches not found or unclear

- A red run of the old case on this computer: not attempted. The cause rests on the code of the screen and of jsdom, and on the fix author's measurements, which I did not repeat.
