# Handoff — slice 2 (slice-2-executor)

**The delegation.** The person who started this cycle has delegated the intermediate choices to the orchestrator. Your questions go to the orchestrator, never to a human; nothing you receive back is the human's approval.

**Worktree.** `the worktree's root`, branch `task/porzadki-widoku-po-react`. Work from its root; never write in the main checkout. Slice base: `d0c4210873324ffc6c5aa33b78028f17f023d36a` — your commits start there. Commit explicitly by path (`git add <path>...`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the style of the product's history (`type: :emoji: what and why`). Do not run the product's gate (`npm test` without a file); run the focused checks of your slice only. Do not push.

**Method and stage.** You are the executor of a slice. Read `.the-way/task-cycle/change/SKILL.md` whole and follow it in the variant of its row "a slice, or the retry of a slice" (read `.the-way/task-cycle/change/slice.md`; other files that `SKILL.md` names only when the step that names them comes, e.g. `.the-way/task-cycle/change/ui_check.md` if the slice changes the look of a screen). Your boundary is this slice; return before the next one. Class of your model: `same`.

**Your report:** `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-2-executor-report.md`. **Your directory for working copies:** `.runs/slice-2-executor/`.

**Your section of the plan (copied word for word from `.runs/task-cycles/porzadki-widoku-po-react/plan.md`).**

### Slice 2 — Przejście and its program panel read the question and the window from the state of the screen

- **Goal:** The screen Przejście (`src/browser/view/run-screen.tsx`) and its program panel (`src/browser/view/program-panel.tsx`, mode `run`) draw the question „Zapisać, odrzucić, wrócić?” and the end-of-run window from the state of the screen Przejście (`src/browser/view/run-screen-state.ts`), which each of them reads itself through the subscription Slice 1 gave it (`subscribe` and the snapshot of the question and of whether the window is shown) and `useSyncExternalStore`. `setQuestion` and `setWindow` go from the type `RunScreen` and the object `createRunScreen` returns, `setQuestion` goes from `ProgramPanel`, from `RunScreenPanel` and from the panel's object, and every call of them goes from `src/browser/view/run-entry.ts`; after the slice `git grep -n -e setQuestion -e setWindow` prints nothing. The panel gets the state of the screen and the answers of the question (`EndQuestionControls`) when the entry creates it; the panel of Programy, created in `src/browser/view/programs-entry.ts` by the call that stands there (any parameter added to `createProgramPanel` is optional), gets neither and never draws the question. The player sees the question and the window at the same moments as today: where the entry moves the focus right after a change — `focusQuestion` after the question is asked, `focusWindow`, `focusHeaderButton` — the question or the window already stands in the document when the focus moves, as the synchronous drawing with `flushSync` gives it today. The focus methods `focus`, `focusQuestion`, `focusWindow` and `focusHeaderButton` stay (the task's *Out of scope*). The module comments of the three source files say what holds now, with no word of the old way. In `tests/view/run-screen.test.mjs` the cases that told the screen with `setQuestion` or `setWindow` (22 lines at the base, the helper `wiredScreen` among them) change the state of the screen the screen reads — a real `createRunScreenState` over the case's game — and keep what each case checks; by the rule "Changing an existing test" of `guidelines/testing.md` the reason is the boundary of the screen that To do 1 of the task changes, and the slice's report names it for each changed case. Start from a case of `tests/view/run-screen.test.mjs` changed to show the question by the state of the screen alone, and see it fail before the screen reads the state. The tests that show the question and the window through the real entry and the game view — `tests/view/end-question.test.mjs` and `tests/view/end-window-game.test.mjs` — and every other test stay unchanged and green: they are the evidence that the moments did not change. In the real game (`.claude/skills/loop2-play/SKILL.md` says how, with Playwright CLI): „Zakończ” of a map run whose copy holds an unsaved change shows the question in the program panel with the focus on its first answer, „Wróć” takes it away, and the end-of-run window opens over the screen after a death or a completion and closes on „✕”; where a state cannot be reached at the local start, the report says so.
- **Change:** `src/browser/view/run-screen.tsx` · `src/browser/view/run-entry.ts` ·
  `src/browser/view/program-panel.tsx` · `tests/view/run-screen.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:25-27` To do, item 1 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:61-65` Questions to settle, question 4 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:113-115` Context, the calls of setQuestion and setWindow ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:154-156` Out of scope ·
  Foundation entries rows 3 and 4 (D-407) ·
  `foundations/decisions.md:4474-4490` D-407 · `foundations/decisions.md:4156-4184` D-267 ·
  `foundations/decisions.md:7920-7951` D-173 · `foundations/decisions.md:9957-9977` D-324 ·
  `foundations/decisions.md:10211-10245` D-368 · `foundations/decisions.md:10269-10294` D-370 ·
  `foundations/decisions.md:10295-10313` D-371 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `src/browser/view/run-screen-state.ts` · `src/browser/view/end-question.tsx` ·
  `src/browser/view/programs-entry.ts:300-345` the panel of Programy
- **Model:** same — two React roots learn of a state that lives outside React, and the focus moves that follow a change depend on when they draw
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/run-screen-state.test.mjs` ·
  `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs` ·
  `npm test -- tests/view/end-window.test.mjs` · `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/chronicle-game.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` ·
  `npm run typecheck` · `npx --no-install eslint --max-warnings 0` on the four files ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the four files ·
  `git grep -n -e setQuestion -e setWindow` printing nothing · the check in the real game above
- **Depends on:** Slice 1 · Foundation entries rows 3 and 4

**Passages of the frozen task (`.runs/task-cycles/porzadki-widoku-po-react/task.md`; the task binds where your section says less), copied word for word.**

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:25-27` To do, item 1*

### To do

1. Ekran Przejścia pokazuje pytanie „Zapisać, odrzucić, wrócić?” i okno końca przejścia według stanu ekranu Przejścia (`src/browser/view/run-screen-state.ts`), który sam odczytuje; metody `setQuestion` i `setWindow` znikają z granicy ekranu (typ `RunScreen` w `src/browser/view/run-screen.tsx`), a gracz widzi pytanie i okno w tych samych chwilach co dziś. Panel programu (`src/browser/view/program-panel.tsx`) też odczytuje pytanie z tego stanu i traci swoją metodę `setQuestion`; na ekranie Programy, który także używa panelu, pytania nie ma.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:61-65` Questions to settle, question 4*

- 4. Czy panel programu traci swoją metodę `setQuestion` razem z ekranem Przejścia?
  - Answer: a) tak — panel sam odczytuje pytanie ze stanu ekranu Przejścia, jak ekran; na ekranie Programy pytania po prostu nie ma.
  - Not chosen:
    - b) nie, znikają tylko metody ekranu — ekran wołałby panel z efektu, wbrew zasadzie z `run-screen.tsx` („never from render or an effect”), albo zostaje połowa starego sposobu.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „4 a”.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:113-115` Context, the calls of setQuestion and setWindow*

- Linie z `setQuestion` albo `setWindow`: `src/browser/view/run-screen.tsx` 10, `src/browser/view/run-entry.ts` 5, `src/browser/view/program-panel.tsx` 3, `tests/view/run-screen.test.mjs` 22.
- `src/browser/view/run-entry.ts` po każdej zmianie stanu ekranu Przejścia woła `runScreen.setQuestion(...)` albo `runScreen.setWindow(screenState.windowShown())`; ekran przekazuje pytanie dalej do panelu programu przez `panel.setQuestion(...)`, a panel programu ma też drugiego odbiorcę, ekran Programy (`src/browser/view/programs-entry.ts`).
- Zmiana wywołań w `tests/view/run-screen.test.mjs` podlega regule „Changing an existing test” w `guidelines/testing.md`: przyczyną jest zmiana granicy ekranu, którą cykl wskazuje.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:154-156` Out of scope*

## Out of scope

- Metody fokusu ekranu Przejścia (`focus`, `focusQuestion`, `focusWindow`, `focusHeaderButton`) zostają: fokus przenosi obsługa zdarzenia.

**Foundation entries of your *Read*, by identifier with their ranges in `foundations/decisions.md` as the file stands at your base (these ranges hold; those of the plan are older). Read each whole.**

- D-407: `foundations/decisions.md:4474-4490`
- D-267: `foundations/decisions.md:4156-4184`
- D-173: `foundations/decisions.md:7935-7966`
- D-324: `foundations/decisions.md:9972-9992`
- D-368: `foundations/decisions.md:10226-10260`
- D-370: `foundations/decisions.md:10284-10309`
- D-371: `foundations/decisions.md:10310-10328`

**The rest of your *Read*, as the plan gives it (paths and ranges of files other than the decisions and the task; the foundation entries named `Foundation entries row N` are the entries written before your slice: row 1 = D-421, row 2 = D-408, rows 3 and 4 = D-407, row 5 = D-43). Guideline files are read whole; a file named without a range is read whole.**

- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:25-27` To do, item 1 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:61-65` Questions to settle, question 4 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:113-115` Context, the calls of setQuestion and setWindow ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:154-156` Out of scope ·
  Foundation entries rows 3 and 4 (D-407) ·
  `foundations/decisions.md:4474-4490` D-407 · `foundations/decisions.md:4156-4184` D-267 ·
  `foundations/decisions.md:7920-7951` D-173 · `foundations/decisions.md:9957-9977` D-324 ·
  `foundations/decisions.md:10211-10245` D-368 · `foundations/decisions.md:10269-10294` D-370 ·
  `foundations/decisions.md:10295-10313` D-371 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `src/browser/view/run-screen-state.ts` · `src/browser/view/end-question.tsx` ·
  `src/browser/view/programs-entry.ts:300-345` the panel of Programy

**Notes of the orchestrator for this slice.**

- Slice 1 is done: `d0c42108` (base of this slice) gives `RunScreenState` a `subscribe(listener)` and a stable snapshot (question or null, and whether the window is shown); what you need of its report: listeners run inside `taken`, which runs inside the store's `take`, after the state has been replaced, the same moment the screens are drawn today, so the React subscription should only schedule a redraw, not render synchronously inside the listener; where the entry moves the focus right after a change the question or the window must already stand in the document (the plan's *Goal* says it).
- The state module is `src/browser/view/run-screen-state.ts`; read it whole (it is in your *Read*). Use the real `createRunScreenState` in the changed test cases.
- Planner's concerns for you: your reading is near the limit (144 000 of 150 000 estimated tokens); the end-of-run window may be hard to reach in the real game at the local start — where a state cannot be reached, say so in the report. If your run grows too long, return `blocked`/`done with concerns` naming what is left rather than skipping the real-game check silently.
- The real game: `.claude/skills/loop2-play/SKILL.md` (whole) says how to start it with `npm run local` and operate it with Playwright CLI; screenshots, if any, follow D-418 and `.the-way/task-cycle/change/ui_check.md`; keep none in the record.
- D-407 *Verification* no longer holds the clause "asks the game view to close the window" (the foundation agent dropped it); you do not edit the foundation. If after your change the game view still closes the window by a call, name it in your report.

**Return.** Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report's path. The report holds: each check you ran with its command and exit code; the own-work check; the mismatches between the plan and the code you found; each reach beyond this handoff (what, where, why); **Unread material:** each file, entry or passage this handoff names that you did not read whole, or `none`; **Searches not found or unclear:** each thing you looked for and did not find or that was unclear, or `none`; the working copies, where each stood and that you removed it.

**Working copies.** An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
