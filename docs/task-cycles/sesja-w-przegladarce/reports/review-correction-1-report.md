PASS 1ce0195ac3b316373b002a686abddb2dd6fe7751

# Review of correction 1 — task `sesja-w-przegladarce`

Variant: a later change to an open request (a correction made for the human's remarks). Range
`81502efc..1ce0195a`. `git rev-parse HEAD` is `1ce0195ac3b316373b002a686abddb2dd6fe7751`, the head
given.

The range has three commits:
- `2c0b9190` adds the record of the cycle under `docs/task-cycles/`, and `38741f59` removes it
  again; together they leave no file in the tree.
- `1ce0195a` changes `src/browser/view/screen-registry.ts` (+8 −3) and
  `src/browser/view/run-entry.ts` (+9 −2).

Blocking findings: none. Minor: none. Out of scope: none.

## The remarks

| Item | What the remark asks | Made? |
|---|---|---|
| 2 | "The menu bar stays in sight when a run screen opens: moving the keyboard focus to the screen must not scroll the page." | **made** — see below |
| 1 (Firefox) | let through; the human does it later | not the correction's |
| 3, 4, 6 | one task outside this request | not the correction's |
| 5, 7 | let through | not the correction's |

Item 2, measured in the real browser:
- Chromium headless through Playwright CLI, 1280 × 720, `npm run local` built at the head, with a
  new local account `agent@example.test` and 11 characters, so that Mapy is scrollable.
- `y` is `scrollY`; "bar" is the top of `header` in the window.

| Way in | Before it | After it |
|---|---|---|
| „Wejdź: Ala” on Mapy, page at 0, by keyboard (Enter) | y 0 | y 0, bar 0, focus `section.screen.run-screen`; Tab then reaches the first button of the screen, in sight |
| „Wejdź: Kaj” on Mapy scrolled to the bottom | y 1095 | y 0, bar 0, focus `section.screen.run-screen` |
| „Wróć do przejścia” in the bar, from Programy | y 0 (Programy is 720 px tall, so it cannot scroll) | y 0, bar 0, focus on the run screen |
| history back to Programy, then forward to the run screen | — | y 0, bar 0, focus on the run screen |

Focus still lands on the shown screen, the page does not scroll for it, and the menu bar stays in
sight on both ways the remark names. I did not repeat the "before" column of the author: the 40 px
scroll at `81502efc` is the defect the whole review and the author's earlier report measured.

## The handoff's questions

1. **The remark.** Met; see the table above.
2. **The second part, `run-entry.ts`.**
   - **Is it needed?** Yes. With `preventScroll` alone, „Wejdź” leaves the page where Mapy stood.
     A character low on Mapy has to be scrolled to before „Wejdź” can be clicked, so the run screen
     would open scrolled, with the bar out of sight; the author measured 418 px. I measured the
     whole change from 1095: the page stands at 0.
   - **Does it fit the foundation?**
     - D-370 ("the page is at its top when the window opens") is unchanged: `run-screen.tsx:162` and
       `:312` still do it. The new reset only adds the same top at entering.
     - D-311, D-371 and D-284 say nothing on scroll at entering; the window still opens at entering
       an ended map run (`screenState.entered()` is still called, now after the reset).
     - The styleguide's "Focus does not fall to the page" holds: focus goes to the screen's section.
     - "Visible focus" and `browser-view-focus-outline` hold: no outline is set.
     - The D-370 rationale's "the scroll is not kept after the window closes" is untouched.
     - No entry I read says where the page stands at a change of screen (a search of
       `foundations/decisions.md`, the styleguide and `coding-browser-module.md` for "scroll" and
       „przewij”).
   - **Can it fire where it should not?** The reset runs only when `here` is false.
     - Tested: while the player stays on the run screen, 3 s of play, „Pauza” and „Wznów” leave a
       scroll of 141 px at 141. A bar link, back or forward does call `placed` again, but only after
       the screen was left, so it counts as an entering.
     - Same-screen `show(run)` calls `placed` with `here` true and does not reset. Nothing else in
       `src/browser/` calls `show(run)` while on it: `drawResult` only calls `tellPlace`, and a hash
       equal to the current one fires no change.
     - A first build on the run screen (reload, load) resets once. The new instance starts with
       `here` false, and `start()` calls `placed`.
   - **Is `here` cleared on every way out?** Yes. The only way off the screen is `show` to another
     entry, which calls `leave()` (`screen-registry.ts:237-238`), and that clears `here`. A logout or
     a rebuild disposes the instance, and the next one starts with `here` false.
3. **Callers of `focusShown` and `focusIfLost`.** The callers are:
   - `game-view.ts:284`: bar link, back and forward;
   - `maps-entry.ts:89`: „Wejdź”;
   - `programs-entry.ts:358`: deleting a program;
   - `run-entry.ts:92`: `leadTo` after the end of a map run;
   - `run-entry.ts:222`: „Wróć” of the question.

   Every target is a screen's `section`, never a control, so `preventScroll` hides no control the
   player is about to act on. The next Tab scrolls the control it reaches into view (seen after
   „Wejdź”).

   What changes on the other screens: they no longer jump so that their own top meets the window's
   top. Deleting a program, back and forward, and „Zakończ” leading to Postać or Mapy now leave the
   page at the scroll the browser leaves.
   - Tested: „Zakończ” from a run screen scrolled to 141 opened Postać at y 0, bar 0, because
     Postać was shorter than the window.
   - Not tested: a Postać or Mapy taller than the window reached by the end of a map run from a
     scrolled screen. The author names this cost in *Choices*.

   I set this aside under Declined to judge: no state reached shows harm, and the old behaviour hid
   the menu bar in those cases too.

   `focus({ preventScroll })` is supported in current Chrome, Edge and Firefox (D-396). That comes
   from my knowledge of the browsers' support, not from a check run here; Firefox was not run (the
   point 4 tool problem).
4. **Tests.**
   - No existing test pins the old call. `tests/view/screen-registry.test.mjs:396-422` asserts where
     the focus lands, not the options, and it passes.
   - `tests/view/end-window-game.test.mjs:640-680` counts writes of `scrollTop` after the build. The
     new write at entering falls before its `before` mark, and it passes.
   - The author's reason for no new test holds under `guidelines/testing.md` ("Choosing the level",
     "A lower test for a bug caught high"), D-88 and D-75. jsdom lays nothing out and scrolls on no
     `focus()`, so no imitation test can fail for this. A test spying on the options of `focus()` or
     on the `scrollTop` setter would assert a call in place of the effect.
   - D-89, the return check:
     - D-88's condition, "a defect that such a test missed", is met literally. The registry's jsdom
       focus test passed while the real browser scrolled. Whether to automate is the human's; the
       author flags it in *Tests*.
     - D-87's condition (a concrete visual defect) does not call for whole-screen image comparison.
       The defect is a scroll offset that a real-browser reading of `scrollY` shows, and checking
       that is the automation D-75 and D-88 defer, not image comparison.
5. **Foundation.** The change goes against no entry I read: D-311, D-370, D-371, D-284, D-265,
   D-407, D-408, the styleguide's rules "Focus does not fall to the page", "Visible focus" and "The
   end-of-run window", `browser-view-focus-outline`, and `coding-browser-module.md` ("Efekty" is not
   reached: the reset is in an entry method, not in a React Effect). I do not judge the return step.

## Declined to judge

- A screen other than Przejście (Postać, Mapy, Programy) reached from a scrolled page by the end of
  a map run or a program's deletion now keeps the scroll instead of aligning its own top. The remark
  covers only the run screen, the old alignment hid the bar too, and no state reached shows harm.
  The author records it in *Choices*.
- Firefox: the remark's item 1 lets it through for the human.

## Checks run

- `git log --stat` and `git diff 81502efc..1ce0195a` read. `git diff --check 81502efc..1ce0195a` →
  exit 0. `git status --short` → empty before and after.
- Real browser: `npm run local` (background, ready at `https://127.0.0.1:60599`) and
  `playwright-cli -s=rc` at 1280 × 720.
  - Account made through the card; 11 characters
    (`review-correction-1-script-chars.js.txt`).
  - Measurements by `run-code` scripts `review-correction-1-script-{a,b,c,d}.js.txt` (results in the
    tables above).
  - Console: only the 401 of `/api/account` before sign-in and the favicon 404; no `uncaught` line.
- `npm test -- tests/view/screen-registry.test.mjs` → exit 0.
- `npm test -- tests/view/end-window-game.test.mjs` → exit 0.
- `npm test -- tests/view/run-screen.test.mjs` → exit 0.
- `npm test -- tests/view/end-question.test.mjs` → exit 0.
- `npm test -- tests/view/chronicle-game.test.mjs` → exit 0 (4 tests).
- `npx eslint src/browser/view/screen-registry.ts src/browser/view/run-entry.ts` → exit 0.
- `npx prettier --check` on the same two files → exit 0.
- `npx tsc -p tsconfig.browser.json --noEmit` → exit 0.
- Not run:
  - the full `npm test` (the orchestrator's);
  - `foundation_check.py` (no foundation or guidelines file in the range's tree change);
  - `check_instructions.py` (no instruction file changed);
  - Firefox (item 1 let through; the tool problem of point 4);
  - the "before" build (the defect is measured in earlier reports).

## Reaches beyond the dispatch

- `src/browser/view/game-view.ts:265-295`, `programs-entry.ts:340-365`, `maps-entry.ts:75-100` and
  `run-screen.tsx:150-165, 300-315`: the callers and the other scroll writes (question 3).
- `tests/view/screen-registry.test.mjs:380-430` and `tests/view/end-window-game.test.mjs:630-680`:
  whether a test pins the old call (question 4).
- `guidelines/coding-browser-module.md`, read whole: code of the view directory changed in this
  range.
- `.claude/skills/loop2-play/SKILL.md` lines 1-200: to run the game.
- A search of `foundations/decisions.md`, the styleguide, `coding-browser-module.md` and
  `foundations/invariants.md` for "scroll", „przewij” and `preventScroll`.

## Working copies

- `.runs/review-correction-1/` held the measurement scripts and the test outputs. Removed. The five
  scripts are kept in `reports/` as `review-correction-1-script-*.js.txt`.
- `.playwright-cli/` held the CLI's snapshots and console log of session `rc`. Removed after the
  console was read.
- Browser session `rc` closed (`playwright-cli list`: no browsers).
- `npm run local:stop` → "Local starts stopped: 1", and the background start ended with exit 0.
- The local database under `.runs/local-start/` is the product tool's own and stays until the next
  start.
- Remainder: none.

## Unread material

- The selection of the whole review stands.
- Read again for this correction: `run-entry.ts` and `screen-registry.ts` whole at the head, and
  `guidelines/coding-browser-module.md` whole.
- D-370 and D-371 were read in their index and rationale passages, not reopened whole for this
  correction; D-311 was read in its index sentence.

## Searches not found or unclear

- A rule or decision on where the page stands at a change of screen: none found.
- A caller of `show(run)` while the player is already on Przejście: none found.
