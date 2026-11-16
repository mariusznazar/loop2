# Handoff — slice 1 (slice-1-executor)

**The delegation.** The person who started this cycle has delegated the intermediate choices to the orchestrator. Your questions go to the orchestrator, never to a human; nothing you receive back is the human's approval.

**Worktree.** `the worktree's root`, branch `task/porzadki-widoku-po-react`. Work from its root; never write in the main checkout. Slice base: `f5b1c0e4567b37567bdb87d1879a0eaaeb42cefc` — your commits start there. Commit explicitly by path (`git add <path>...`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the style of the product's history (`type: :emoji: what and why`). Do not run the product's gate (`npm test` without a file); run the focused checks of your slice only. Do not push.

**Method and stage.** You are the executor of a slice. Read `.the-way/task-cycle/change/SKILL.md` whole and follow it in the variant of its row "a slice, or the retry of a slice" (read `.the-way/task-cycle/change/slice.md`; other files that `SKILL.md` names only when the step that names them comes, e.g. `.the-way/task-cycle/change/ui_check.md` if the slice changes the look of a screen). Your boundary is this slice; return before the next one. Class of your model: `cheaper`.

**Your report:** `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-1-executor-report.md`. **Your directory for working copies:** `.runs/slice-1-executor/`.

**Your section of the plan (copied word for word from `.runs/task-cycles/porzadki-widoku-po-react/plan.md`).**

### Slice 1 — The state of the screen Przejście readable from React

- **Goal:** The state of the screen Przejście (`src/browser/view/run-screen-state.ts`) becomes readable from React as the page's memory of folding is (`Folding` and `createFolding` in `src/browser/view/program-panel.tsx`, lines 94-130 at the base): `RunScreenState` gains a `subscribe(listener)` that returns the way to stop, and a snapshot of what stands — the question, or null, and whether the window is shown, as `windowShown()` gives it — that stays the same value while neither changes, so that `useSyncExternalStore` can read it. It calls every listener after each change of either, whichever of its methods made it (`taken`, `entered`, `left`, `ask`, `closeQuestion`, `forgetQuestion`, `openWindow`, `closeWindow`, `effectEnded`), a change of whether the window is shown that a result of the store brings through `taken` included; a call that changes neither calls no listener. The module still calls no screen, no act of the store and no registry, and its other methods keep what they return and do. Its comment says what holds now. `tests/view/run-screen-state.test.mjs` gains the cases of the subscription, written first and seen failing: a listener called after a change of the question and after a change of whether the window is shown, by a method of the state and by a result taken, the snapshot unchanged while nothing changes, no call for a method that changes nothing, and no call after the stop. Nothing reads the subscription yet: Slice 2 makes the screen and its panel read it, so no other file and no other test changes, and every test stays green.
- **Change:** `src/browser/view/run-screen-state.ts` · `tests/view/run-screen-state.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:25-27` To do, item 1 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:61-65` Questions to settle, question 4 ·
  Foundation entries rows 3 and 4 (D-407) ·
  `foundations/decisions.md:4474-4490` D-407 · `foundations/decisions.md:10295-10313` D-371 ·
  `foundations/decisions.md:9957-9977` D-324 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/program-panel.tsx:94-130` the memory of folding ·
  `src/browser/view/game-view.ts:175-300` the wiring of the store, the state of the screen and the entries ·
  `src/browser/view/state-store.ts`
- **Model:** cheaper — the pattern of the memory of folding is applied to one module, with its tests
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen-state.test.mjs` (the new cases first, failing) ·
  `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs` ·
  `npm run typecheck` · `npx --no-install eslint --max-warnings 0` on the two files ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the two files
- **Depends on:** Foundation entries rows 3 and 4

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

**Foundation entries of your *Read*, by identifier with their ranges in `foundations/decisions.md` as the file stands at your base (these ranges hold; those of the plan are older). Read each whole.**

- D-407: `foundations/decisions.md:4474-4490`
- D-371: `foundations/decisions.md:10310-10328`
- D-324: `foundations/decisions.md:9972-9992`

**The rest of your *Read*, as the plan gives it (paths and ranges of files other than the decisions and the task; the foundation entries named `Foundation entries row N` are the entries written before your slice: row 1 = D-421, row 2 = D-408, rows 3 and 4 = D-407, row 5 = D-43). Guideline files are read whole; a file named without a range is read whole.**

- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:25-27` To do, item 1 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:61-65` Questions to settle, question 4 ·
  Foundation entries rows 3 and 4 (D-407) ·
  `foundations/decisions.md:4474-4490` D-407 · `foundations/decisions.md:10295-10313` D-371 ·
  `foundations/decisions.md:9957-9977` D-324 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/program-panel.tsx:94-130` the memory of folding ·
  `src/browser/view/game-view.ts:175-300` the wiring of the store, the state of the screen and the entries ·
  `src/browser/view/state-store.ts`

**Notes of the orchestrator for this slice.**

- The foundation entries of the plan are committed at `f5b1c0e4`; your base is that commit. D-407 now carries the sentence that the screen Przejście and its program panel read the question and the window from the state of the screen Przejście; its *Verification* dropped the clause "asks the game view to close the window", since the way the window is closed after the change is the slice's matter — if after Slice 2 the game view still closes the window by a call, the clause may be put back there, not by you.
- The planner's concern for you: nothing reads the new subscription yet, so no other file and no other test changes in this slice.
- Reading a reference of the plan that names the memory of folding: `src/browser/view/program-panel.tsx:94-130` at the plan's base; find it again by the names `Folding` and `createFolding`.

**Return.** Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report's path. The report holds: each check you ran with its command and exit code; the own-work check; the mismatches between the plan and the code you found; each reach beyond this handoff (what, where, why); **Unread material:** each file, entry or passage this handoff names that you did not read whole, or `none`; **Searches not found or unclear:** each thing you looked for and did not find or that was unclear, or `none`; the working copies, where each stood and that you removed it.

**Working copies.** An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
