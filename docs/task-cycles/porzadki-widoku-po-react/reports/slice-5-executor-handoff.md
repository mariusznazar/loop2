# Handoff — slice 5 (slice-5-executor)

**The delegation.** The person who started this cycle has delegated the intermediate choices to the orchestrator. Your questions go to the orchestrator, never to a human; nothing you receive back is the human's approval.

**Worktree.** `the worktree's root`, branch `task/porzadki-widoku-po-react`. Work from its root; never write in the main checkout. Slice base: `57d1f0ab31da92aa908431a0314b27b9e52f1bbc` — your commits start there. Commit explicitly by path (`git add <path>...`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the style of the product's history (`type: :emoji: what and why`). Do not run the product's gate (`npm test` without a file); run the focused checks of your slice only. Do not push.

**Method and stage.** You are the executor of a slice. Read `.the-way/task-cycle/change/SKILL.md` whole and follow it in the variant of its row "a slice, or the retry of a slice" (read `.the-way/task-cycle/change/slice.md`; other files that `SKILL.md` names only when the step that names them comes, e.g. `.the-way/task-cycle/change/ui_check.md` if the slice changes the look of a screen). Your boundary is this slice; return before the next one. Class of your model: `cheaper`.

**Your report:** `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-5-executor-report.md`. **Your directory for working copies:** `.runs/slice-5-executor/`.

**Your section of the plan (copied word for word from `.runs/task-cycles/porzadki-widoku-po-react/plan.md`).**

### Slice 5 — The test of the scene reads the game's stylesheets as the page links them

- **Goal:** `tests/view/scene.test.mjs` reads the stylesheet through the helper tests/view/game-stylesheets.mjs, which Slice 4 created (a few lines: it reads the `<link rel="stylesheet">` of `src/browser/index.html` in their order, leaves out `/tokens.css` and joins the texts), instead of naming `src/browser/styles.css` — its constant of the stylesheet's text and the cases that lay that text on their page or search it (at the base `STYLES` at lines 30-33, used at lines 347 and 2237) — and its comments say "the game's stylesheets" where they named the one file. No expectation changes: by the rule "Changing an existing test" the reason is To do 3 and 6 of the task, and the slice's report says so. At the base the helper gives the text of `styles.css` alone, so every case sees what it sees today.
- **Change:** `tests/view/scene.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:39-39` To do, item 6 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/index.html`
- **Model:** cheaper — one read of a large test pointed at an existing helper
- **Risk:** none
- **Checks:** `npm test -- tests/view/scene.test.mjs` ·
  `npx --no-install eslint --max-warnings 0 tests/view/scene.test.mjs` ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore tests/view/scene.test.mjs`
- **Depends on:** Slice 4

**Passages of the frozen task (`.runs/task-cycles/porzadki-widoku-po-react/task.md`; the task binds where your section says less), copied word for word.**

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3*

3. Arkusz `src/browser/styles.css` jest podzielony na pliki `.css` leżące wprost w `src/browser/`, każdy podawany graczowi osobnym znacznikiem `<link>` w `src/browser/index.html`, bez zmiany budowania; gracz widzi każdy ekran tak jak przed podziałem. W `styles.css` zostaje to, co wspólne — reguły podstawowe, reguła `:focus-visible`, pasek menu, wiersze zdań, wspólne kontrolki i reguły tego, co rysuje strona wzorcowa kontrolek (`terrain-drawing`, `tile-list`, `form`, `account-menu-block` w `src/browser/kitchen-sink/kitchen-sink.tsx`); reguły każdego ekranu idą do pliku tego ekranu, a reguły panelu programu, którego używają Programy i Przejście, do własnego pliku.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:39-39` To do, item 6*

6. Miejsca, które nazywają `styles.css` jako miejsce wyglądu ekranu — styleguide widoku, `src/browser/AGENTS.md`, komentarze w kodzie i testy, które czytają prawdziwy arkusz — wskazują plik, w którym ta reguła stoi po podziale.

**The rest of your *Read*, as the plan gives it (paths and ranges of files other than the decisions and the task; the foundation entries named `Foundation entries row N` are the entries written before your slice: row 1 = D-421, row 2 = D-408, rows 3 and 4 = D-407, row 5 = D-43). Guideline files are read whole; a file named without a range is read whole.**

- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:39-39` To do, item 6 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/index.html`

**Notes of the orchestrator for this slice.**

- Slice 4 is made at `57d1f0ab`: the helper `tests/view/game-stylesheets.mjs` exists (exports `gameStylesheetNames()` and `gameStylesheetText()`); read it whole before you use it. It is in the head you start from.
- Read the guideline files of your *Read* whole, as the method asks: the previous executor left `guidelines/coding.md`, `guidelines/styleguide-browser-view.md` and `src/browser/AGENTS.md` unread and the report must say what you left unread.
- `tests/view/scene.test.mjs` is large; read the places that name the stylesheet whole (the constant and the cases that use it) and the rest by search, and say so in **Unread material**.

**Return.** Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report's path. The report holds: each check you ran with its command and exit code; the own-work check; the mismatches between the plan and the code you found; each reach beyond this handoff (what, where, why); **Unread material:** each file, entry or passage this handoff names that you did not read whole, or `none`; **Searches not found or unclear:** each thing you looked for and did not find or that was unclear, or `none`; the working copies, where each stood and that you removed it.

**Working copies.** An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
