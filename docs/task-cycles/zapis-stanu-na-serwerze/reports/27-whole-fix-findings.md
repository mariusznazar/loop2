# Findings to fix — whole-change review (`FAIL ae0d7e2`), task `zapis-stanu-na-serwerze`

Copied word for word from `reports/26-whole-review-report.md`, § Findings › Important. The review's Minor and out-of-scope findings are not fixed (they go to the request).

### Important

**I-1. Twelve of the player's acts can lose their moment of saving with every test green**
(Slice 6, `e27ba5f`). Place: `src/browser/view/game-view.ts:111`, `:115`, `:119`, `:123`,
`:127`, `:131`, `:143`, `:181`, `:185`, `:191`, `:206`, `:210` (each act's `act(...)`, and the
`saver.moment()` after `clock.send`); tests: `tests/view/account-screen.test.mjs`,
`tests/view/game-saver.test.mjs`.

What a player sees if this breaks: an edit of a program, a new character, a send to a map,
„Restart” or „Zakończ” is no longer saved right after it is made, only at the next 30-second check
or when the tab hides. To do 7 and D-184 require a save "right after each change of it the player
makes" and name these acts one by one; D-184's *Verification* gives "an edit of a program rule
followed at once by a save request" as the complying example. Today the code is right: I read each
handler, and each goes through `act()` (or the before/after comparison for `send`).

What is wrong is that no test protects it. I ran 14 mutations in a scratch worktree of the head,
each replacing one act's `act(...)` with `store.apply(...)`, or the moment after a send with nothing.
Then I ran `tests/view/account-screen.test.mjs` and `tests/view/game-saver.test.mjs`. Only the
pause (1 failure) and pace (6 failures) mutants were caught. Twelve survived with exit 0:
`editCopy`, `editProgram`, `createProgram`, `renameProgram`, `deleteProgram`, `saveCopy`,
`switchProgram`, creating a character, `pick`, the send, `restart`, `end` (`saveCopyAsNew` and
`discardCopy` not mutated; they have the same wiring). The plan's Slice 6 goal asks the page to call
"a moment after every act of the player whose result changed the state (decision 6's list)" and the
test file to gain "a case for each of these paths". The executor's report says it left this open:
"the cases exercise pace, pause/resume and the end of a map run, not each program-panel and
headquarters act — those pass through `act()` unchanged, left to review" (`reports/18-slice6-report.md`,
*Searches not found or unclear*).

Why it blocks: this wiring is what To do 7 asks for first, and it is the most likely thing to break
when `game-view.ts` changes next. Task 10, 12 and 13 all add acts to the panel and the
headquarters. Fix: one table-driven case in `tests/view/account-screen.test.mjs` (or a game-view
test) that does each listed act once on a built game and asserts that one `saveGame` call is
waiting with that act's state. For `send`, „Restart” and „Zakończ” it needs a map run, and for
`editCopy` a running one. It should also assert that an act whose result leaves the state unchanged
sends nothing.
