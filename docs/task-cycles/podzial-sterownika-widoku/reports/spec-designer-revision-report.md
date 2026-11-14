# Revision report — the designer of the spec (write-spec, one revision)

- Status: done
- Spec revised: `.runs/task-cycles/podzial-sterownika-widoku/spec.md` (the reviewed text stays as `spec-reviewed.md`)
- Against: `reports/spec-reviewer-report.md`, read whole.

## What changed, per finding

1. Halt and the state of Przejście. Decision 3 now names exactly the methods guarded by halt —
   `ask`, `closeQuestion`, `openWindow`, `closeWindow`, `effectEnded` (`game-view.ts:547`, `:613`,
   `:663`, `:671`, `:679`) — and says that `forgetQuestion`, `entered`, `left` (which leaves a standing
   question after halt but ends the wait and the place) and `built` work after halt as today, since
   navigation goes on after `halt()`. Decision 9's line for `run-screen-state.test.mjs` now tests those
   guarded methods alone, and that `entered`, `left` and `forgetQuestion` still act after halt.
2. „Koniec przejścia” and the question. Decision 3's `openWindow()` now closes a standing question as
   `closeQuestion()` does and returns whether it closed one; decision 5 has a row of its own for
   `openWindow`: the state's `openWindow()`, then `setQuestion(false)` where it closed a question, then
   the window's sync — the screen's calls in today's order (`:662-668`). The sentence on the entry's
   calls names `openWindow` beside `closeQuestion`. Decision 9 gains the test line that
   `openWindow()` closes a standing question and says so.
3. Imports of the entries. Decision 1's rule is now a closed list per entry: Siedziba
   `headquarters.tsx`; Programy `program-list.tsx`, `program-panel.tsx`, `previous-save-lines.ts`, the
   types of `account-api.ts` and `screen-address.ts`; Przejście `run-screen.tsx`, `program-panel.tsx`,
   the type `Chronicle` and the types of `run-screen-state.ts`; Postać `character-screen.tsx`; Mapy
   `maps-screen.tsx`; each also the simulation and the types of the store and the registry; no entry
   imports another entry, `game-view.ts` or more than types of the three modules. A later change widens
   the list only by naming the import.

The reviewer's open question, answered by search and written into decision 9:

- After `halt()`, `end-question.test.mjs:884-913` pins the question's buttons on the screen of the map
  run, `end-window-game.test.mjs:1145-1154` pins „✕” of the window, and `uncaught-failure.test.mjs`
  (through `startApp`, the game-level proof of D-323) pins the clock's reading, „Pauza”, a pace and the
  buttons of Mapy (`:357-478`). No test moves between screens after `halt()`; the spec keeps today's
  `show` `:1124-1136` through `entered()`/`left()` and pins it in the new module test.
- `end-window-game.test.mjs:742-757` pins „Koniec przejścia” with the question standing (question not
  shown, window open) but would pass without `setQuestion(false)`, and no test presses „✕” after it;
  the spec keeps today's `openWindow` with `closeQuestion` (`:546-550`, `:662-668`), pins the state's
  half in the new module test, and leaves the screen's half to review.
- The reviewer's observation on `saveAndEnd`: decision 5's row now copies `:686-705` together with its
  guard at `:689`; no test pins that guard, which decision 9 states. Decision 8's row for D-323 names
  `tests/view/uncaught-failure.test.mjs`.

Nothing else changed; the reviewer's observation on the order of `placed` was not a finding and is
left as it is.

## Unread material

- `tests/view/end-question.test.mjs` read `:884-924`; `tests/view/end-window-game.test.mjs` read
  `:738-821` and `:1145-1154`; `tests/view/uncaught-failure.test.mjs` read `:428-483` and its test names;
  the rest of these files, and `account-screen.test.mjs`, `chronicle-game.test.mjs` and
  `previous-save.test.mjs`, not read beyond searches.

## Searches not found or unclear

- `halt()` and `reportError(` across `tests/view/`: found only in `end-question`, `end-window-game` and
  `uncaught-failure`; none of their cases follows the address or a menu link after the error or
  `halt()`.
- „✕” after „Koniec przejścia” with the question standing: no case found among the six presses of
  „✕” in `end-window-game.test.mjs` (`:519`, `:567`, `:705`, `:794`, `:998`, `:1150`).

## Working copies

None made; no directory under `.runs/spec-designer/` was created.
