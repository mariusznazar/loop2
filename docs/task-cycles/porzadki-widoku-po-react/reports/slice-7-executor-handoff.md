# Handoff — slice 7 (slice-7-executor)

**The delegation.** The person who started this cycle has delegated the intermediate choices to the orchestrator. Your questions go to the orchestrator, never to a human; nothing you receive back is the human's approval.

**Worktree.** `the worktree's root`, branch `task/porzadki-widoku-po-react`. Work from its root; never write in the main checkout. Slice base: `581d09bbae0f78516e8f867d7f7be23a909fe3e6` — your commits start there. Commit explicitly by path (`git add <path>...`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the style of the product's history (`type: :emoji: what and why`). Do not run the product's gate (`npm test` without a file); run the focused checks of your slice only. Do not push.

**Method and stage.** You are the executor of a slice. Read `.the-way/task-cycle/change/SKILL.md` whole and follow it in the variant of its row "a slice, or the retry of a slice" (read `.the-way/task-cycle/change/slice.md`; other files that `SKILL.md` names only when the step that names them comes, e.g. `.the-way/task-cycle/change/ui_check.md` if the slice changes the look of a screen). Your boundary is this slice; return before the next one. Class of your model: `same`.

**Your report:** `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-7-executor-report.md`. **Your directory for working copies:** `.runs/slice-7-executor/`.

**Your section of the plan (copied word for word from `.runs/task-cycles/porzadki-widoku-po-react/plan.md`).**

### Slice 7 — The stylesheet split, part 2: the other screens and the credits

- **Goal:** The rules of every other screen move out of `src/browser/styles.css` into files of their own directly in `src/browser/`, and those of the credits, which the login card and Siedziba both show, into a file of their own: `headquarters.css` (Siedziba: the camp, its sections, the team, the chest, the report of earning loops, the creation of a character), `character-screen.css` (Postać), `maps-screen.css` (Mapy: the list of maps, the card of a map, the section „Kto idzie”), `knowledge-screen.css` (Wiedza: every rule of the classes `knowledge-*`, added at the end of `styles.css` by the screen Wiedza after the task's numbers were taken, goes here as every other screen's rules go to its file), `account-card.css` (the screen of the login card and the card), `waiting-screen.css` (the waiting screen, `session-check`), `accounts-screen.css` (the list of accounts, `#/konta`) and `credits.css` (the folded credits, the rules naming `.account-card` and `.headquarters` beside `.credits` included). `src/browser/index.html` links each with a `<link rel="stylesheet">` of its own; all the screen files stand after `/styles.css`, in the order in which their first rule stood in the base `styles.css` of the task (`7ba7a116`), the three files Slice 6 linked keeping their places in that order. The build does not change and the kitchen-sink page keeps linking `styles.css` and `kitchen-sink.css` alone. What stays in `styles.css` is the shared part Slice 6 left there: the base rules, the one rule `:focus-visible`, the header with the menu bar and the menu „Konto”, the rows of sentences, the place of the screens and their common layout (`.app-main`, `.screen`, `.screen-area` and the rule that gives Programy, Mapy and Wiedza their columns, with its `@media`), the shared controls with the icon mask and the forms, and the rules of what the kitchen-sink page draws (`terrain-drawing`, `tile-list`, `form`, `account-menu-block`, and every other class `src/browser/kitchen-sink/kitchen-sink.tsx` gives an element). Which file a rule goes to is read from where its classes are drawn (a search of `src/browser/` for each class), not from where it stands; a rule that reaches classes of two screens and of no shared part goes to the file of the part they share or stays in `styles.css`, and the report names it; a rule whose classes no file draws moves with the screen its comment names and the report names it, and nothing is deleted. No selector and no declaration changes: rules move whole, with the comments over them; each new file opens with a comment saying what it holds, and the head comment of `styles.css` says what it holds now. The cascade stays as it is, checked as Slice 6 checked it: a one-off script in the slice's directory for working copies compares the concatenation, in `<link>` order, of the stylesheets the game's page links before this slice with the same after it — no rule in one and not the other (white space normalised, comments aside), and every pair of style rules whose order changed, whose selectors have the same specificity and that declare a common property (a shorthand and its longhands count as common) under the same or overlapping conditions is listed and judged in the report — and shows that no moved rule reaches an element of the kitchen-sink page. The player sees each screen as before: before changing any file, the slice starts the game at its head with `npm run local` and, with Playwright CLI as `.claude/skills/loop2-play/SKILL.md` gives (Playwright MCP only from a session that started in the worktree, D-420), records for each state below the computed style of every element and of its `::before` and `::after`, keyed by the element's place in the tree and its classes, into a file in its directory for working copies, then records the same states after the change and compares; every difference is fixed or named and explained as nothing the player sees. States: the login card in „Zaloguj się”, „Załóż konto” and „Nie pamiętam hasła”, with its credits opened; Siedziba with a character, its camp and its credits opened; Postać; Mapy before a pick and with the card of a map; Wiedza with a tree opened; the list of accounts where the local start can give an account the owner role; the waiting screen where it can be held; the kitchen-sink page. A state the local start cannot reach is named in the report as unchecked in the game, its rules covered by the script alone. The new files and `index.html` stand as Prettier leaves them, with no `outline` and no value in place of a design token. The files Slice 6 made, `src/browser/run-screen.css`, `src/browser/program-panel.css` and `src/browser/programs-screen.css`, show the form a file takes and do not change.
- **Change:** `src/browser/styles.css` · `src/browser/index.html` · `src/browser/headquarters.css` ·
  `src/browser/character-screen.css` · `src/browser/maps-screen.css` · `src/browser/knowledge-screen.css` ·
  `src/browser/account-card.css` · `src/browser/waiting-screen.css` · `src/browser/accounts-screen.css` ·
  `src/browser/credits.css`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:51-55` Questions to settle, question 2 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:56-60` Questions to settle, question 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:87-91` Questions to settle, question 9 ·
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
- **Model:** same — orchestrator's change in the plan's review: the slice runs the same order script and the same comparison in the real game as Slice 6 over eight new files, and a missed order shows only when those checks are carried out with care
- **Risk:** none
- **Checks:** the order script above, its list judged in the report · the comparison in the real game above ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_application_build_output.py` ·
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py` ·
  `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/scene.test.mjs` ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/*.css src/browser/index.html`
- **Depends on:** Slice 6 · Foundation entries row 1

**Passages of the frozen task (`.runs/task-cycles/porzadki-widoku-po-react/task.md`; the task binds where your section says less), copied word for word.**

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3*

3. Arkusz `src/browser/styles.css` jest podzielony na pliki `.css` leżące wprost w `src/browser/`, każdy podawany graczowi osobnym znacznikiem `<link>` w `src/browser/index.html`, bez zmiany budowania; gracz widzi każdy ekran tak jak przed podziałem. W `styles.css` zostaje to, co wspólne — reguły podstawowe, reguła `:focus-visible`, pasek menu, wiersze zdań, wspólne kontrolki i reguły tego, co rysuje strona wzorcowa kontrolek (`terrain-drawing`, `tile-list`, `form`, `account-menu-block` w `src/browser/kitchen-sink/kitchen-sink.tsx`); reguły każdego ekranu idą do pliku tego ekranu, a reguły panelu programu, którego używają Programy i Przejście, do własnego pliku.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:51-55` Questions to settle, question 2*

- 2. Co zostaje w `src/browser/styles.css` po podziale?
  - Answer: a) `styles.css` zostaje plikiem wspólnym — reguły podstawowe, reguła `:focus-visible`, pasek menu, wiersze zdań i wspólne kontrolki; reguły każdego ekranu idą do pliku tego ekranu; D-265, D-47 i niezmiennik `browser-view-focus-outline` zostają prawdziwe bez zmian, a strona wzorcowa kontrolek ładuje dalej tylko `styles.css`.
  - Not chosen:
    - b) `styles.css` znika, w jego miejsce np. `base.css`, `controls.css` i pliki ekranów — czytelniejsze nazwy, ale zmiana D-265, niezmiennika i strony wzorcowej.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a”.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:56-60` Questions to settle, question 3*

- 3. Czy nowy ekran dostaje własny plik arkusza jako stała reguła?
  - Answer: a) tak — każdy ekran ma swój plik arkusza i swój `<link>`, a nowy ekran dodaje oba; reguła staje w wytycznych i w fundamencie.
  - Not chosen:
    - b) nie, podział jednorazowy — style ekranu Wiedza i następnych trafią, gdzie agentowi wygodnie, i wspólny plik znów rośnie.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „3 a”.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:87-91` Questions to settle, question 9*

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
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:56-60` Questions to settle, question 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:87-91` Questions to settle, question 9 ·
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

- Write your report and every file of your directory for working copies UNDER THE WORKTREE: the report's absolute path is `.runs\task-cycles\porzadki-widoku-po-react\reports\slice-7-executor-report.md` and your working directory is `.runs\slice-7-executor\`. Check `pwd` before each write.
- Slice 6 is made at `581d09bb` (your base): `run-screen.css`, `program-panel.css`, `programs-screen.css` exist and `index.html` links them after `/styles.css`. Read the three new files' head comments and `index.html` before you start, and keep the form they show. Its scripts and its recording summaries stay beside its report: `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-6-executor-evidence/` (`order-check.mjs`, `record-all.sh`, `gen-driver.mjs`, `compose.mjs`, `compare-styles.mjs`, `split.mjs`, `analyze.mjs` and the summaries). Read the slice 6 report's "Checks", "Mismatches … and choices the plan did not settle" and "Problems seen" (`.runs/task-cycles/porzadki-widoku-po-react/reports/slice-6-executor-report.md`): they say how the comparison and the order script were run and what the real game could not reach. You may copy and adapt those scripts into your working directory; do not commit them and do not edit the evidence directory.
- Binding choices made by the orchestrator for your slice (the plan's *Choices* and the report of slice 6):
  1. The rule block `@media (prefers-reduced-motion: no-preference) { … }` in `run-screen.css` holds a rule whose selector list mixes the scene's `.scene-mage-sprite img` and `.scene-fire[data-burning="true"] img` with the camp's `.camp-member img` and `.camp-fire img` (Siedziba). Leave it where Slice 6 put it, whole; do not split the selector list; name the case in your report and in a comment of `headquarters.css` that says the camp's frames animation stands in the shared animation block of `run-screen.css` (every `.css` file is linked on every page, so nothing changes for the player).
  2. `.trip-warning` stays in `styles.css` as Slice 6 left it (Mapy and the panel's trip plan both use it) — unless a search shows only one part draws it, then it goes to that part's file; the report names it either way.
  3. Rules whose classes no file draws move with the part their comment names; nothing is deleted; each such rule is named in the report.
  4. The rules of the screen Wiedza (classes `knowledge-*`, at the end of `styles.css`) go to `knowledge-screen.css`.
- `foundation_check.py` at your base reports one error that is not yours (`tests/view/run-screen-state.test.mjs:309`); your checks do not include it.
- The comparison in the real game yields large output: write it to a file in your working directory and compare files by a script; do not read it into your context. Stop the local start with `npm run local:stop` when you finish. Screenshots are no deliverable; keep none in the record.
- State the number of the rules and of the moved selectors per file in the report, with the check that no rule is lost or duplicated, as Slice 6 did.

**Return.** Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report's path. The report holds: each check you ran with its command and exit code; the own-work check; the mismatches between the plan and the code you found; each reach beyond this handoff (what, where, why); **Unread material:** each file, entry or passage this handoff names that you did not read whole, or `none`; **Searches not found or unclear:** each thing you looked for and did not find or that was unclear, or `none`; the working copies, where each stood and that you removed it.

**Working copies.** An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
