# Report — the designer of the spec (write-spec)

- Status: done
- Spec: `.runs/task-cycles/podzial-sterownika-widoku/spec.md`
- Method: `.the-way/task-cycle/spec/SKILL.md` and `design.md` beside it, read whole, at the pinned `.the-way` of the worktree.

## Questions sent and their answers

None. Every choice the design needed is the open choice itself or is settled by the task, the
foundation or the code; two readings that could go two ways are written into the spec (see the
fourth check below) instead of asked.

## Ways weighed

- Split of responsibilities (the open choice):
  - chosen — a store owning the state, the clock, the saver and the one catch-up (`act`), with
    `actWithoutCatchUp` naming the two acts that do not catch up; a state of Przejście that holds
    memory and rules and calls nothing; a generic registry with instance hooks; the acts in one entry
    file per screen, the program panels' acts in one shared file;
  - rejected — a store naming every act (each new act edits the store, a shared place again); a thin
    store with the clock and saver wired in the composition (the catch-up stays a pair of calls outside
    the store, which *To do* 1 removes); one `act` with a flag (a default is easy to leave);
    the state of Przejście making the acts too (it needs store, navigation and focus, and its tests the
    whole view); the state calling `setQuestion`/`setWindow` itself (it would hold its screen).
- Registry: two hooks for results and readings (chosen) against one `draw(cause)` (every entry would
  branch on the cause); a runtime completeness check with a test (chosen) against a map keyed by
  `Screen["kind"]` (Programy and Mapy hold two kinds each and the order would live elsewhere); address
  listener and first screen kept in the composition (they are the page's: emailed-link fragments, D-96).
- Place of the entries: one file per screen (chosen) against entries inside `game-view.ts` (the shared
  function stays about 900 lines and a new entry is written inside it) and entries exported from the
  screens' `.tsx` (the React module would import the store and acts).
- Focus of Mapy after an act (D-329): the entry's own guard as today (chosen) against a store-wide
  draw once per act (changes the moments every other screen draws, for one screen's need).

## The four checks

1. Placeholders, `TBD`, empty sections: none.
2. Contradictions: found and fixed two — a rejected way said „eleven test files” where the spec counts
   twelve on the base; and the end of a map run in the run entry's acts read as if navigation followed
   only an accepted end, while today's `endRun` navigates also when a halted store refused the end
   (`game-view.ts:583-599`), now written so. No decision of the task or the foundation is contradicted.
3. Several independent changes: the store, the state of Przejście and the registry with the entries
   can each be made and tested alone, each step leaving the tests passing; they serve one goal and one
   task, so the spec keeps them in one change and recommends three slices (decision 11).
4. Requirements readable two ways, each settled in the spec:
   - „nowe moduły dostają własne testy” — read as the three modules of *To do* 1–3 getting a test file
     each; the five entry files and the panel acts are code moved from `game-view.ts` and reached by the
     five unchanged test files through `createGameView`, so they get none (decision 9).
   - which acts „depend on time” — every act today preceded by `clock.flush()`, the pull and
     „Odbierz” among them; the reset takes no result; „Wejdź” and „Puść w pętlę” keep the clock's own
     acts with today's comparison of the state before the reading for their moment of saving (decision 2).

## Where the task's numbers and shape differ from the base

Written into the spec's *Constraints* table: every line number from `2b4d760c` mapped to the base
`9e13af95`, the boundary grown by the pull, the reset and „Odbierz”, a fifth test file through
`createGameView` (`tests/view/previous-save.test.mjs`) and twelve, not eleven, test files that call a
factory, the clock, the saver or the chronicle directly. The task's requirements are kept as they are.

## Concerns for the orchestrator

- The full proof that the player sees nothing change rests on the five unchanged test files through
  `createGameView`; jsdom does not prove real focus and events (D-88), so a check of the focus paths in
  a browser (window at a reload, „✕”/Escape, „Wejdź” on Mapy, „Zamknij” and „Odbierz” on Siedziba)
  after the change is worth naming in the request.
- The spec keeps several call orders of today that no test may pin (the clock's interval before the
  saver's, the run screen's `setQuestion` / sync / `update`, Postać before Mapy); a reviewer should hold
  the change to them, since a reorder could pass the tests and still differ in a browser.
- The parallel task on view test helpers will meet this change at merge only if this change's new test
  files copy helpers; the spec forbids that.

## Reaches beyond the handoff

- `src/browser/AGENTS.md`, whole — `AGENTS.md` asks for it when working in `src/browser/`; nothing in it
  bears on this change (design tokens only).
- `git log 2b4d760c..HEAD -- src/browser/view/game-view.ts`, `git diff --stat` of the view and its tests,
  and `git show 2b4d760c:src/browser/view/game-view.ts` at the lines the task cites — to reconcile the
  task's line numbers and shape with the base, as the handoff asks.
- `git grep` of the test files through `createGameView` at `2b4d760c` — to confirm the four of the task.
- `foundations/invariants.md`: `simulation-isolation` and `simulation-inputs`, whole — linked from
  D-04, both of Part `simulation`, so outside the selection; read to rule them out.
- `src/browser/view/scene-picture.ts` imports and `chronicle-entries.ts` imports — to confirm the
  screen state's and the store's imports stay free of React.
- `tests/view/game-saver.test.mjs` `:1-40` and `tests/view/clock.test.mjs` `:1-70` — to see how a test
  without React builds its document and timers, for decision 9.

## Unread material

- `foundations/decisions.md`: of the named decisions, D-04 read `:52-107` (its rationale from `:107` on
  not read); D-07 read `:219-248` (the end of its *Rejected* not read); D-29 not named, seen in passing;
  D-311 read `:7419-7449` (the rest of its verification and its rationale not read); D-339 read
  `:8446-8472` (the rest of its rationale not read); D-351 read `:8891-8919` (the rest of its rationale
  not read); D-267 read `:6071-6097` (the rest of its *Rejected* not read). Every other named decision
  read whole. D-401 and D-402, cited in the spec, were not named and not read beyond their headings; the
  spec takes their behaviour from the code and its doc comments.
- Code: `app.ts` read only `:20-34`, `:410-447` and a search of every use of `GameView`, as the handoff
  names; `end-window.tsx` read `:1-60`; `maps-screen.tsx` `:1-100` and `:225-470`; `headquarters.tsx`
  `:1-95`, `:268-297` and `:380-424`; `program-panel.tsx` `:1-180` and `:660-796`; `program-list.tsx`
  `:1-100`; `chronicle.ts` `:1-135`. The parts not read draw inside one screen and are not called by the
  game view.
- Tests: `tests/view/end-question.test.mjs` read `:1-170`; `account-screen.test.mjs`,
  `chronicle-game.test.mjs`, `end-window-game.test.mjs` and `previous-save.test.mjs` not read whole —
  their imports from the view, their test names and the factory calls of the other test files were
  searched, which shows they reach the game only through `createGameView` (and `app.js`), as decision 9
  relies on.
- Guidelines: `coding.md`, `coding-browser-module.md` and `testing.md` read whole (the last in two
  parts).
- Glossary read whole.

## Searches not found or unclear

- The task says eleven test files call the factories directly; on the base the search finds twelve
  that call a screen factory, the clock, the saver, the chronicle or the folding (`rule-signs`,
  `scene`, `tabs-area`, `chronicle`, `clock`, `game-saver` among them); which eleven the task counted is
  unclear. The spec's requirement (every test file unchanged) holds either way.
- Whether any test pins the order of the clock's and the saver's intervals, or the order in which
  separate roots draw within one result, was not established by reading every test; the spec keeps
  today's order for both.

## Working copies

None made; no directory under `.runs/spec-designer/` was created.
