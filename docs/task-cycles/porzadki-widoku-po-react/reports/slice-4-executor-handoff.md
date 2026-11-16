# Handoff — slice 4 (slice-4-executor)

**The delegation.** The person who started this cycle has delegated the intermediate choices to the orchestrator. Your questions go to the orchestrator, never to a human; nothing you receive back is the human's approval.

**Worktree.** `the worktree's root`, branch `task/porzadki-widoku-po-react`. Work from its root; never write in the main checkout. Slice base: `b607bfe545c4a99163990771027f1358b6017a5a` — your commits start there. Commit explicitly by path (`git add <path>...`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the style of the product's history (`type: :emoji: what and why`). Do not run the product's gate (`npm test` without a file); run the focused checks of your slice only. Do not push.

**Method and stage.** You are the executor of a slice. Read `.the-way/task-cycle/change/SKILL.md` whole and follow it in the variant of its row "a slice, or the retry of a slice" (read `.the-way/task-cycle/change/slice.md`; other files that `SKILL.md` names only when the step that names them comes, e.g. `.the-way/task-cycle/change/ui_check.md` if the slice changes the look of a screen). Your boundary is this slice; return before the next one. Class of your model: `cheaper`.

**Your report:** `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-4-executor-report.md`. **Your directory for working copies:** `.runs/slice-4-executor/`.

**Your section of the plan (copied word for word from `.runs/task-cycles/porzadki-widoku-po-react/plan.md`).**

### Slice 4 — Tests read the game's stylesheets as the page links them

- **Goal:** A test helper module `tests/view/game-stylesheets.mjs` gives the text of the game's stylesheets as the game's page links them: it reads `src/browser/index.html`, takes the `href` of each `<link rel="stylesheet">` in the order they stand, leaves out `/tokens.css`, the file of design tokens, which no case reads today, reads each named file from `src/browser/` and joins their texts in that order; it may also give them one by one. At the base it gives the text of `src/browser/styles.css` alone, so no case sees anything other than today. It imports no jsdom and is no `*.test.mjs` file. `tests/view/world-area.test.mjs`, `tests/view/run-header.test.mjs` and `tests/view/rule-signs.test.mjs` read the stylesheet through it instead of naming `src/browser/styles.css`, and their comments say "the game's stylesheets" where they named the one file; the check of `rule-signs.test.mjs` of the order of the rules then reads the order across the files as the cascade reads it. No expectation changes: by the rule "Changing an existing test" of `guidelines/testing.md` the reason is To do 3 and 6 of the task — the stylesheet is split into files the page links, and a test has to read a rule where it stands after the split — and the slice's report says so for each file. After this slice, Slice 5 points `tests/view/scene.test.mjs` at the helper, and Slices 6 and 7 split the stylesheet with no change of a test.
- **Change:** `tests/view/game-stylesheets.mjs` · `tests/view/world-area.test.mjs` ·
  `tests/view/run-header.test.mjs` · `tests/view/rule-signs.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:39-39` To do, item 6 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:120-122` Context, the build, the links and the files that name the stylesheet ·
  Foundation entries row 1 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/index.html` · `src/browser/kitchen-sink/index.html` · `scripts/static-files.mjs`
- **Model:** cheaper — a helper of a few lines and three reads pointed at it, with no expectation changed
- **Risk:** none
- **Checks:** `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/run-header.test.mjs` ·
  `npm test -- tests/view/rule-signs.test.mjs` ·
  `npx --no-install eslint --max-warnings 0` on the four files ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the four files
- **Depends on:** none

**Passages of the frozen task (`.runs/task-cycles/porzadki-widoku-po-react/task.md`; the task binds where your section says less), copied word for word.**

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3*

3. Arkusz `src/browser/styles.css` jest podzielony na pliki `.css` leżące wprost w `src/browser/`, każdy podawany graczowi osobnym znacznikiem `<link>` w `src/browser/index.html`, bez zmiany budowania; gracz widzi każdy ekran tak jak przed podziałem. W `styles.css` zostaje to, co wspólne — reguły podstawowe, reguła `:focus-visible`, pasek menu, wiersze zdań, wspólne kontrolki i reguły tego, co rysuje strona wzorcowa kontrolek (`terrain-drawing`, `tile-list`, `form`, `account-menu-block` w `src/browser/kitchen-sink/kitchen-sink.tsx`); reguły każdego ekranu idą do pliku tego ekranu, a reguły panelu programu, którego używają Programy i Przejście, do własnego pliku.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:39-39` To do, item 6*

6. Miejsca, które nazywają `styles.css` jako miejsce wyglądu ekranu — styleguide widoku, `src/browser/AGENTS.md`, komentarze w kodzie i testy, które czytają prawdziwy arkusz — wskazują plik, w którym ta reguła stoi po podziale.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:120-122` Context, the build, the links and the files that name the stylesheet*

- `scripts/static-files.mjs` kopiuje do wyniku obu budowań każdy plik `.css` leżący wprost w `src/browser/`, więc nowe pliki arkusza w tym katalogu nie wymagają zmiany budowania; podkatalog by jej wymagał.
- `src/browser/index.html` ładuje `/tokens.css` i `/styles.css`; strona wzorcowa kontrolek (`src/browser/kitchen-sink/index.html`) ładuje `/tokens.css`, `/styles.css` i `/kitchen-sink.css`.
- Arkusz `styles.css` nazywają z nazwy: `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, oba `index.html`, `src/browser/kitchen-sink/kitchen-sink.css` i `kitchen-sink.tsx`, `accounts-screen.tsx`, `rule-panel.tsx`, pięć plików `react-*.tsx` kontrolek; testy `tests/view/scene.test.mjs`, `world-area.test.mjs`, `run-header.test.mjs`, `rule-signs.test.mjs` czytają go jako prawdziwy arkusz, `tests/view/shared-controls.test.mjs` wspomina go w komentarzu.

**Foundation entries of your *Read*, by identifier with their ranges in `foundations/decisions.md` as the file stands at your base (these ranges hold; those of the plan are older). Read each whole.**

- D-421: `foundations/decisions.md:4551-4565`

**The rest of your *Read*, as the plan gives it (paths and ranges of files other than the decisions and the task; the foundation entries named `Foundation entries row N` are the entries written before your slice: row 1 = D-421, row 2 = D-408, rows 3 and 4 = D-407, row 5 = D-43). Guideline files are read whole; a file named without a range is read whole.**

- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:39-39` To do, item 6 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:120-122` Context, the build, the links and the files that name the stylesheet ·
  Foundation entries row 1 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/index.html` · `src/browser/kitchen-sink/index.html` · `scripts/static-files.mjs`

**Notes of the orchestrator for this slice.**

- Slices 1–3 are made; none of them changes the stylesheet or the tests you change. At your base `tests/view/world-area.test.mjs`, `run-header.test.mjs` and `rule-signs.test.mjs` read `src/browser/styles.css`; find each place again (the plan's line numbers are older).
- `python -B .the-way/elements/common/foundation_check.py` at your base reports one error that is not yours: `tests/view/run-screen-state.test.mjs:309`. You do not run it as a check of your slice (your checks are the focused ones in your section).
- The helper is not a `*.test.mjs` file and imports no jsdom; where `package.json` or the test runner picks files by a pattern, check that the helper is not run as a test and is linted as the other files of `tests/view/` (the checks in your section lint and format it).

**Return.** Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report's path. The report holds: each check you ran with its command and exit code; the own-work check; the mismatches between the plan and the code you found; each reach beyond this handoff (what, where, why); **Unread material:** each file, entry or passage this handoff names that you did not read whole, or `none`; **Searches not found or unclear:** each thing you looked for and did not find or that was unclear, or `none`; the working copies, where each stood and that you removed it.

**Working copies.** An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
