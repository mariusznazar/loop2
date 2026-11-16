# Handoff — slice 6 (slice-6-executor)

**The delegation.** The person who started this cycle has delegated the intermediate choices to the orchestrator. Your questions go to the orchestrator, never to a human; nothing you receive back is the human's approval.

**Worktree.** `the worktree's root`, branch `task/porzadki-widoku-po-react`. Work from its root; never write in the main checkout. Slice base: `f515ac669b2309d3b560a6768ad56bfb5da14542` — your commits start there. Commit explicitly by path (`git add <path>...`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the style of the product's history (`type: :emoji: what and why`). Do not run the product's gate (`npm test` without a file); run the focused checks of your slice only. Do not push.

**Method and stage.** You are the executor of a slice. Read `.the-way/task-cycle/change/SKILL.md` whole and follow it in the variant of its row "a slice, or the retry of a slice" (read `.the-way/task-cycle/change/slice.md`; other files that `SKILL.md` names only when the step that names them comes, e.g. `.the-way/task-cycle/change/ui_check.md` if the slice changes the look of a screen). Your boundary is this slice; return before the next one. Class of your model: `same`.

**Your report:** `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-6-executor-report.md`. **Your directory for working copies:** `.runs/slice-6-executor/`.

**Your section of the plan (copied word for word from `.runs/task-cycles/porzadki-widoku-po-react/plan.md`).**

### Slice 6 — The stylesheet split, part 1: Przejście, the program panel and Programy

- **Goal:** The rules of the screen Przejście, of the program panel, which Programy and Przejście both use, and of the screen Programy move out of `src/browser/styles.css` into three files directly in `src/browser/`: `run-screen.css` (Przejście: the grid of its areas, the area under the drawing with the tabs and the chronicle, its header with the bar of the solving condition, the band of a discovery, the question „Zapisać, odrzucić, wrócić?”, the end-of-run window, the rows „Teraz” and „Potem”, the body row, the world area with the scene — its layers, effects, frost, `@property --tint` and its `@keyframes` — and `.run-practice`), `program-panel.css` (the list „Program:” and its actions, the name field, the copy's section, the rule list, the rule panel, the drop line and the trip plan the panel holds) and `programs-screen.css` (what only Programy draws: the list of programs and the confirmation of „Zacznij od zera”). `src/browser/index.html` links each with a `<link rel="stylesheet">` of its own after `/styles.css`; the build does not change (`scripts/static-files.mjs` already copies every `.css` file directly in `src/browser/` into both builds) and the kitchen-sink page keeps linking `styles.css` and `kitchen-sink.css` alone. In `styles.css` stays what is shared, as the task's To do 3 and Foundation entries row 1 give it: the base rules, the one rule `:focus-visible`, the header with the menu bar and the menu „Konto”, the rows of sentences, the place of the screens and their common layout (`.app-main`, `.screen`, `.screen-area` and the rule that gives Programy, Mapy and Wiedza their columns, with its `@media`), the shared controls with the icon mask and the forms, and the rules of what the kitchen-sink page draws (`terrain-drawing`, `tile-list`, `form`, `account-menu-block`, and every other class `src/browser/kitchen-sink/kitchen-sink.tsx` gives an element). Which file a rule goes to is read from where its classes are drawn (a search of `src/browser/` for each class), not from where it stands today: a rule whose classes only Przejście draws goes to `run-screen.css` wherever it stands, a rule whose classes the panel draws goes to `program-panel.css`; a rule that reaches classes of two of these and of no shared part goes to the file of the part they share, and the report names it; a rule whose classes no file draws moves with the part its comment names and the report names it, and nothing is deleted. The rules of the other screens stay in `styles.css` for Slice 7. No selector and no declaration changes: rules move whole, with the comments that stand over them; each new file opens with a comment saying what screen or part it holds, and the head comment of `styles.css` says what it holds now. The cascade that decides which rule wins stays as it is: the three files are linked in the order in which their first rule stands in the base `styles.css`, and a one-off script in the slice's directory for working copies compares the concatenation, in `<link>` order, of the stylesheets the game's page links before the slice with the same after it — no rule may be in one and not the other (text compared with its white space normalised, comments aside), and the script lists every pair of style rules whose order changed, whose selectors have the same specificity and that declare a common property (a shorthand and its longhands count as common) under the same or overlapping conditions; each pair is judged in the report — no element the game draws carries both selectors, named with the files that draw their classes, or the winner of the base is kept — and the same script shows that no moved rule reaches an element of the kitchen-sink page. The player sees each screen as before the split: before changing any file, the slice starts the game at its head with `npm run local` and, with Playwright CLI as `.claude/skills/loop2-play/SKILL.md` gives (Playwright MCP only from a session that started in the worktree, D-420), records for each state below the computed style of every element of the page and of its `::before` and `::after`, keyed by the element's place in the tree and its classes, into a file in its directory for working copies; after the change it records the same states again and compares. Every difference is either fixed before the slice ends or named and explained as nothing the player sees (an animation in its course, the text of the clock). States: Przejście of a paused map run with „Kronika” and with „Teren” picked, with a rule panel open, with the band of a discovery, with the question standing, and with the end-of-run window after a death or a completion; Programy with a program shown; the kitchen-sink page (`npm run kitchen-sink`). A state the local start cannot reach is named in the report as unchecked in the game, its rules covered by the script alone. The new files and `index.html` stand as Prettier leaves them, and they hold no `outline` and no value in place of a design token.
- **Change:** `src/browser/styles.css` · `src/browser/index.html` · `src/browser/run-screen.css` ·
  `src/browser/program-panel.css` · `src/browser/programs-screen.css`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:51-55` Questions to settle, question 2 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:81-91` Questions to settle, questions 8 and 9 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:120-123` Context, the build, the links, the files that name the stylesheet and the invariant of focus ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:154-157` Out of scope ·
  Foundation entries row 1 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4743-4757` D-47 ·
  `foundations/decisions.md:4683-4697` D-43 · `foundations/decisions.md:414-428` D-28 ·
  `foundations/decisions.md:4713-4727` D-45 · `foundations/decisions.md:474-488` D-32 ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1540-1554` D-420 ·
  `foundations/invariants.md:438-446` prettier-source-format ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/invariants.md:498-506` application-build-kitchen-sink ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` ·
  `scripts/static-files.mjs` · `src/browser/kitchen-sink/index.html`
- **Model:** same — a move across a stylesheet of 3400 lines whose correctness rests on keeping the cascade, judged by a script of the slice's own and a check in the real game
- **Risk:** none
- **Checks:** the order script above, its list judged in the report · the comparison in the real game above ·
  `npm test -- tests/view/scene.test.mjs` · `npm test -- tests/view/world-area.test.mjs` ·
  `npm test -- tests/view/run-header.test.mjs` · `npm test -- tests/view/rule-signs.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_application_build_output.py` ·
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py` ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/*.css src/browser/index.html`
- **Depends on:** Slice 5 · Foundation entries row 1

**Passages of the frozen task (`.runs/task-cycles/porzadki-widoku-po-react/task.md`; the task binds where your section says less), copied word for word.**

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3*

3. Arkusz `src/browser/styles.css` jest podzielony na pliki `.css` leżące wprost w `src/browser/`, każdy podawany graczowi osobnym znacznikiem `<link>` w `src/browser/index.html`, bez zmiany budowania; gracz widzi każdy ekran tak jak przed podziałem. W `styles.css` zostaje to, co wspólne — reguły podstawowe, reguła `:focus-visible`, pasek menu, wiersze zdań, wspólne kontrolki i reguły tego, co rysuje strona wzorcowa kontrolek (`terrain-drawing`, `tile-list`, `form`, `account-menu-block` w `src/browser/kitchen-sink/kitchen-sink.tsx`); reguły każdego ekranu idą do pliku tego ekranu, a reguły panelu programu, którego używają Programy i Przejście, do własnego pliku.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:51-55` Questions to settle, question 2*

- 2. Co zostaje w `src/browser/styles.css` po podziale?
  - Answer: a) `styles.css` zostaje plikiem wspólnym — reguły podstawowe, reguła `:focus-visible`, pasek menu, wiersze zdań i wspólne kontrolki; reguły każdego ekranu idą do pliku tego ekranu; D-265, D-47 i niezmiennik `browser-view-focus-outline` zostają prawdziwe bez zmian, a strona wzorcowa kontrolek ładuje dalej tylko `styles.css`.
  - Not chosen:
    - b) `styles.css` znika, w jego miejsce np. `base.css`, `controls.css` i pliki ekranów — czytelniejsze nazwy, ale zmiana D-265, niezmiennika i strony wzorcowej.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a”.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:81-91` Questions to settle, questions 8 and 9*

- 8. Gdzie idą reguły panelu programu, którego używają dwa ekrany, Programy i Przejście (od „The program panel's list „Program:”” w `src/browser/styles.css`, ok. linii 776, przez kilkaset linii)?
  - Answer: a) własny plik arkusza panelu programu, z własnym znacznikiem `<link>`; reguła z pytania 3 brzmi: „własny plik arkusza ma każdy ekran i każda część, której używa kilka ekranów”.
  - Not chosen:
    - b) zostaje w `styles.css` — wspólny plik zostaje duży, a kto zmienia ekran Przejścia albo Programy, czyta te kilkaset linii.
    - c) w pliku ekranu Programy — ekran Przejścia zależy od cudzego pliku i zmienia wygląd przy zmianie Programów.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a … Do 1: reguła z odpowiedzi 3 w brzmieniu „własny plik arkusza ma każdy ekran i każda część, której używa kilka ekranów”.”
- 9. Co z regułami, które rysuje strona wzorcowa kontrolek, a które nie są wspólnymi kontrolkami — rysunek mapy (`terrain-drawing`), tabela pól (`tile-list`), formularz (`form`), blok menu konta (`account-menu-block`), użyte w `src/browser/kitchen-sink/kitchen-sink.tsx`?
  - Answer: a) zostają w `styles.css`; strona wzorcowa kontrolek ładuje dalej tylko `styles.css` i `kitchen-sink.css`.
  - Not chosen:
    - b) idą do plików ekranów, a strona wzorcowa dostaje dodatkowe `<link>` — mniejszy plik wspólny, ale zmiana odpowiedzi 2 i zależność strony od plików ekranów.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a”.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:120-123` Context, the build, the links, the files that name the stylesheet and the invariant of focus*

- `scripts/static-files.mjs` kopiuje do wyniku obu budowań każdy plik `.css` leżący wprost w `src/browser/`, więc nowe pliki arkusza w tym katalogu nie wymagają zmiany budowania; podkatalog by jej wymagał.
- `src/browser/index.html` ładuje `/tokens.css` i `/styles.css`; strona wzorcowa kontrolek (`src/browser/kitchen-sink/index.html`) ładuje `/tokens.css`, `/styles.css` i `/kitchen-sink.css`.
- Arkusz `styles.css` nazywają z nazwy: `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, oba `index.html`, `src/browser/kitchen-sink/kitchen-sink.css` i `kitchen-sink.tsx`, `accounts-screen.tsx`, `rule-panel.tsx`, pięć plików `react-*.tsx` kontrolek; testy `tests/view/scene.test.mjs`, `world-area.test.mjs`, `run-header.test.mjs`, `rule-signs.test.mjs` czytają go jako prawdziwy arkusz, `tests/view/shared-controls.test.mjs` wspomina go w komentarzu.
- Niezmiennik `browser-view-focus-outline` (`foundations/invariants.md`) mówi o arkuszach części w liczbie mnogiej, ale wymaga, żeby to `src/browser/styles.css` miał regułę `:focus-visible`; jego test (`tests/invariants/test_browser_view_focus_outline.py`) już sprawdza każdy plik `.css` wprost w `src/browser/`.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:154-157` Out of scope*

## Out of scope

- Metody fokusu ekranu Przejścia (`focus`, `focusQuestion`, `focusWindow`, `focusHeaderButton`) zostają: fokus przenosi obsługa zdarzenia.
- `src/browser/tokens.css` i `src/browser/kitchen-sink/kitchen-sink.css` nie dzielą się.

**Foundation entries of your *Read*, by identifier with their ranges in `foundations/decisions.md` as the file stands at your base (these ranges hold; those of the plan are older). Read each whole.**

- D-265: `foundations/decisions.md:4108-4155`
- D-47: `foundations/decisions.md:4758-4772`
- D-43: `foundations/decisions.md:4698-4712`
- D-28: `foundations/decisions.md:414-428`
- D-45: `foundations/decisions.md:4728-4742`
- D-32: `foundations/decisions.md:474-488`
- D-417: `foundations/decisions.md:1444-1509`
- D-420: `foundations/decisions.md:1540-1554`
- D-421: `foundations/decisions.md:4551-4565`

**The rest of your *Read*, as the plan gives it (paths and ranges of files other than the decisions and the task; the foundation entries named `Foundation entries row N` are the entries written before your slice: row 1 = D-421, row 2 = D-408, rows 3 and 4 = D-407, row 5 = D-43). Guideline files are read whole; a file named without a range is read whole.**

- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:51-55` Questions to settle, question 2 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:81-91` Questions to settle, questions 8 and 9 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:120-123` Context, the build, the links, the files that name the stylesheet and the invariant of focus ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:154-157` Out of scope ·
  Foundation entries row 1 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4743-4757` D-47 ·
  `foundations/decisions.md:4683-4697` D-43 · `foundations/decisions.md:414-428` D-28 ·
  `foundations/decisions.md:4713-4727` D-45 · `foundations/decisions.md:474-488` D-32 ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1540-1554` D-420 ·
  `foundations/invariants.md:438-446` prettier-source-format ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/invariants.md:498-506` application-build-kitchen-sink ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` ·
  `scripts/static-files.mjs` · `src/browser/kitchen-sink/index.html`

**Notes of the orchestrator for this slice.**

- Write your report and every file of your directory for working copies UNDER THE WORKTREE: the report's absolute path is `.runs\task-cycles\porzadki-widoku-po-react\reports\slice-6-executor-report.md` and your working directory is `.runs\slice-6-executor\`. An earlier executor wrote a report into the main checkout's `.runs/` by a path relative to the wrong directory; check `pwd` before each write.
- State at your base `f515ac66`: Slices 4 and 5 made the tests that read the stylesheet (`world-area`, `run-header`, `rule-signs`, `scene`) read it through `tests/view/game-stylesheets.mjs`, which follows the `<link rel="stylesheet">` tags of `src/browser/index.html` in order and leaves out `/tokens.css`; so your split changes no test: those tests must still pass, and they are the first check that the rules stand where the page links them. The first time that helper joins more than one file is your slice: read its code before you split.
- The screen Wiedza was added after the task's numbers were taken; its rules (classes `knowledge-*`) stand at the end of `styles.css` and belong to Slice 7; do not move them in your slice.
- For the real-game comparison: an earlier executor of this cycle composed saved documents to reach the end-of-run window and the question, and kept its scripts beside its report: `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-2-executor-evidence/compose-ended.mjs` and `compose-live.mjs` (read them if you need them; they are the product's own helper-style scripts of a previous slice, not part of the change; do not commit them). Their README-like comments say how they were used.
- `foundation_check.py` at your base reports one error that is not yours (`tests/view/run-screen-state.test.mjs:309`); your checks do not include it.
- The comparison of computed styles of every element yields large output: write it to a file in your working directory (for example with `playwright-cli run-code` or the run-code the skill gives) and compare files by a script; do not read the output into your context. Stop the local start with `npm run local:stop` when you finish.
- Screenshots of the comparison are no deliverable; keep none in the record (D-418, `.the-way/task-cycle/change/ui_check.md`).

**Return.** Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report's path. The report holds: each check you ran with its command and exit code; the own-work check; the mismatches between the plan and the code you found; each reach beyond this handoff (what, where, why); **Unread material:** each file, entry or passage this handoff names that you did not read whole, or `none`; **Searches not found or unclear:** each thing you looked for and did not find or that was unclear, or `none`; the working copies, where each stood and that you removed it.

**Working copies.** An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
