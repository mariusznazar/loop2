# Handoff — slice 8 (slice-8-executor)

**The delegation.** The person who started this cycle has delegated the intermediate choices to the orchestrator. Your questions go to the orchestrator, never to a human; nothing you receive back is the human's approval.

**Worktree.** `the worktree's root`, branch `task/porzadki-widoku-po-react`. Work from its root; never write in the main checkout. Slice base: `deed67af898d00027500e37d35a9857e0e3aa679` — your commits start there. Commit explicitly by path (`git add <path>...`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the style of the product's history (`type: :emoji: what and why`). Do not run the product's gate (`npm test` without a file); run the focused checks of your slice only. Do not push.

**Method and stage.** You are the executor of a slice. Read `.the-way/task-cycle/change/SKILL.md` whole and follow it in the variant of its row "a slice, or the retry of a slice" (read `.the-way/task-cycle/change/slice.md`; other files that `SKILL.md` names only when the step that names them comes, e.g. `.the-way/task-cycle/change/ui_check.md` if the slice changes the look of a screen). Your boundary is this slice; return before the next one. Class of your model: `same`.

**Your report:** `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-8-executor-report.md`. **Your directory for working copies:** `.runs/slice-8-executor/`.

**Your section of the plan (copied word for word from `.runs/task-cycles/porzadki-widoku-po-react/plan.md`).**

### Slice 8 — The rule of the stylesheets in the styleguide, and the places that name `styles.css`

- **Goal:** `guidelines/styleguide-browser-view.md` gains a rule, in the form of its other rules (*Decision* naming the decision of Foundation entries row 1, D-408 and D-28; *Invariant* none; *Good*; *Bad*; then how to apply it, in Polish as the file is), that each screen and each part several screens use has a stylesheet of its own, a `.css` file directly in `src/browser/` with a `<link>` of its own in `src/browser/index.html`, and that a new screen adds both; that `src/browser/styles.css` keeps what is shared — the base rules, the one rule `:focus-visible`, the menu bar, the rows of sentences, the shared controls and what the kitchen-sink page draws — and that the kitchen-sink page links `styles.css` and `kitchen-sink.css` alone. The rule stands in the styleguide because D-28 puts the rules of the view's stylesheets there and allows no guidelines of their own for stylesheets (To do 5). Every place of the styleguide that names `src/browser/styles.css` as the place of rules that now stand elsewhere names the file where they stand — at the base lines 126, 134, 679, 708, 727, 743, 756, 773, 819, 838, 907 and 921, the scene's and the end-of-run window's rules now in `src/browser/run-screen.css` — while the place of the rule `:focus-visible` (line 149) and the look of the shared controls stay in `styles.css` (To do 6). The styleguide's restatement of where an icon with no text beside it takes `text-strong` (rule "No value in place of a design token", base line 113) follows D-43 as Foundation entries row 5 writes it. `src/browser/AGENTS.md` (its rule of design tokens, which sends a class's rule to `src/browser/styles.css`) names the stylesheet of the screen or part, or `styles.css` for what is shared. The comments that name `styles.css` for a screen's rules name the file where they stand: `src/browser/view/accounts-screen.tsx` (line 20 at the base), `src/browser/view/knowledge-screen.tsx` (line 17) and `src/browser/view/rule-panel.tsx` (line 99, the class `two-columns`, now in `src/browser/program-panel.css`). The comment of `src/browser/view/email-status.ts` that says the kitchen-sink page "reaches no React file" says what is true since the page holds React (rule "Strona wszystkich stanów z Reactem" of `guidelines/coding-browser-module.md`, D-269): the menu „Konto” and the kitchen-sink page write the same words from this module (To do 4). The comments of the shared controls (`src/browser/view/controls/react-*.tsx`), of `src/browser/kitchen-sink/kitchen-sink.tsx`, `src/browser/kitchen-sink/kitchen-sink.css` and `tests/view/shared-controls.test.mjs` name `styles.css` for the controls and the menu, which stay there, and do not change. After the slice, `git grep -n "styles\.css"` lists no place that names `styles.css` for a rule that stands in another file; the slice's report pastes that listing.
- **Change:** `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/email-status.ts` · `src/browser/view/accounts-screen.tsx` ·
  `src/browser/view/knowledge-screen.tsx` · `src/browser/view/rule-panel.tsx`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-41` To do, items 3 to 8 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:56-60` Questions to settle, question 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:76-80` Questions to settle, question 7 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:134-142` Decisions in play ·
  Foundation entries rows 1, 2 and 5 ·
  `foundations/decisions.md:414-428` D-28 · `foundations/decisions.md:4491-4505` D-408 ·
  `foundations/decisions.md:4683-4697` D-43 · `foundations/decisions.md:4185-4217` D-269 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4743-4757` D-47 ·
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:123-140` agent-workflow ·
  `.the-way/product-guidelines/template.md:39-133` the form of guidelines and of a rule ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `src/browser/index.html`
- **Model:** same — orchestrator's change in the plan's review: the slice writes a rule of the styleguide in Polish in the form of its other rules and restates a binding sentence of D-43 in two places, which a cheaper class gets wrong more easily than it moves a name
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` ·
  `python -B .the-way/instruction-files/check_instructions.py` ·
  `npm run typecheck` ·
  `npx --no-install eslint --max-warnings 0` on the four TypeScript files ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the four TypeScript files ·
  `git grep -n "styles\.css"`, its listing judged in the report
- **Depends on:** Slice 7 · Foundation entries rows 1, 2 and 5

**Passages of the frozen task (`.runs/task-cycles/porzadki-widoku-po-react/task.md`; the task binds where your section says less), copied word for word.**

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:36-41` To do, items 3 to 8*

3. Arkusz `src/browser/styles.css` jest podzielony na pliki `.css` leżące wprost w `src/browser/`, każdy podawany graczowi osobnym znacznikiem `<link>` w `src/browser/index.html`, bez zmiany budowania; gracz widzi każdy ekran tak jak przed podziałem. W `styles.css` zostaje to, co wspólne — reguły podstawowe, reguła `:focus-visible`, pasek menu, wiersze zdań, wspólne kontrolki i reguły tego, co rysuje strona wzorcowa kontrolek (`terrain-drawing`, `tile-list`, `form`, `account-menu-block` w `src/browser/kitchen-sink/kitchen-sink.tsx`); reguły każdego ekranu idą do pliku tego ekranu, a reguły panelu programu, którego używają Programy i Przejście, do własnego pliku.
4. Komentarz w `src/browser/view/email-status.ts`, który mówi, że strona wzorcowa kontrolek „reaches no React file”, mówi to, co jest prawdą od zadania przejścia na React (reguła „Strona wszystkich stanów z Reactem” w `guidelines/coding-browser-module.md`).
5. Styleguide widoku (`guidelines/styleguide-browser-view.md`) mówi, że własny plik arkusza i własny znacznik `<link>` ma każdy ekran i każda część, której używa kilka ekranów, a nowy ekran dodaje oba; reguła stoi w styleguide, bo tam D-28 stawia reguły arkuszy widoku, a osobnych wytycznych arkuszy D-28 nie dopuszcza.
6. Miejsca, które nazywają `styles.css` jako miejsce wyglądu ekranu — styleguide widoku, `src/browser/AGENTS.md`, komentarze w kodzie i testy, które czytają prawdziwy arkusz — wskazują plik, w którym ta reguła stoi po podziale.
7. Przykład zgodności w *Verification* D-407 (`foundations/decisions.md`) — „a new screen … whose factory receives … the memory of its unfolded trees, shared with another screen” — opisuje kształt, którego ekran Wiedza nie przyjął (jego otwarte drzewa żyją w komponencie, jak wymaga ostatnia klauzula D-407 i D-416); przykład pokazuje kształt, który D-407 dopuszcza, bez sprzeczności z ekranem Wiedza. Źródło: https://github.com/mariusznazar/loop2/pull/143, „Findings outside the task's scope” 2 (dopisane przez doradcę dnia 2026-11-16).
8. Zdanie wiążące D-43, które wylicza, gdzie ikona bez tekstu obok bierze `text-strong` (odznaka, latająca ikona, rysunek mapy), obejmuje też tabliczkę odkrycia na scenie, albo mówi wprost, czemu jej nie obejmuje — według tego, co dziś robi arkusz. Źródło: https://github.com/mariusznazar/loop2/pull/143, „Findings outside the task's scope” 1 (dopisane przez doradcę dnia 2026-11-16).

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:56-60` Questions to settle, question 3*

- 3. Czy nowy ekran dostaje własny plik arkusza jako stała reguła?
  - Answer: a) tak — każdy ekran ma swój plik arkusza i swój `<link>`, a nowy ekran dodaje oba; reguła staje w wytycznych i w fundamencie.
  - Not chosen:
    - b) nie, podział jednorazowy — style ekranu Wiedza i następnych trafią, gdzie agentowi wygodnie, i wspólny plik znów rośnie.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „3 a”.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:76-80` Questions to settle, question 7*

- 7. Czy zadanie poprawia nieprawdziwy komentarz w `src/browser/view/email-status.ts`?
  - Answer: a) tak, jako punkt „To do” — jedna linia, a zadanie i tak dotyka tabeli tego rodzaju plików.
  - Not chosen:
    - b) nie, do zbiorczych poprawek brzmienia `the author's task note on wording fixes of the foundation`.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a”.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:134-142` Decisions in play*

## Decisions in play

- D-407 (`foundations/decisions.md`, sekcja „Browser view: screens, navigation and their code”): „The game state lives in a store outside React and the state of the screen Przejście, which is the question „Zapisać, odrzucić, wrócić?” and the end-of-run window, in a module of its own outside React; memory several screens share is a memory of the page, given to the factories of the screens and read through `useSyncExternalStore`, and the state of one screen lives in the component of that screen.” Zadanie dopisuje do niej zdanie z wiersza 3 *Settlements to record*; jej *Verification* („which draws each only while the game view tells it to”) przestaje wtedy być prawdą i zmienia się razem z tym zdaniem.
- D-408 (ta sama sekcja): „A new screen of the game is added as a module of its own, one entry in the registry of screens, its address and its position on the menu bar.” Zadanie dopisuje do niej zdanie z wiersza 2 *Settlements to record*.
- D-265: „Each shared control in `src/browser/view/controls/` has one form, a React component, and `src/browser/styles.css` stays the one place of the look of the controls.”
- D-47: „One `:focus-visible` rule of the game's stylesheet draws the focus of every control from the role `focus`, and no other style or code of the part browser-view sets `outline` or an `outline-*` property, except that the kitchen-sink page's stylesheet repeats that rule with one more selector, for its sample of the focused state.”
- D-36: „The exemplar for kind `browser-module` is `src/browser/view/account-card.tsx`, the first screen built with React, and its kind guidelines are read before adding or changing a file of that kind.”
- D-35: „The exemplar for kind `simulation-module` is `src/browser/sim/game.ts`, and its kind guidelines are read before adding or changing a file of that kind.”
- D-28: „Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring automatic formatting of Python and Bash and separate exemplars for building, deployment, entry points, HTML and CSS; …”; z jego uzasadnienia: „The rules of the browser view's stylesheets that a cheap test keeps already stand in its styleguide, so a kind of their own would add no rule”, a jako naruszenie podaje „a stylesheet exemplar or guidelines of their own for stylesheets”.

**Foundation entries of your *Read*, by identifier with their ranges in `foundations/decisions.md` as the file stands at your base (these ranges hold; those of the plan are older). Read each whole.**

- D-28: `foundations/decisions.md:414-428`
- D-408: `foundations/decisions.md:4491-4505`
- D-43: `foundations/decisions.md:4698-4712`
- D-269: `foundations/decisions.md:4185-4217`
- D-265: `foundations/decisions.md:4108-4155`
- D-47: `foundations/decisions.md:4758-4772`
- D-421: `foundations/decisions.md:4551-4565`

**The rest of your *Read*, as the plan gives it (paths and ranges of files other than the decisions and the task; the foundation entries named `Foundation entries row N` are the entries written before your slice: row 1 = D-421, row 2 = D-408, rows 3 and 4 = D-407, row 5 = D-43). Guideline files are read whole; a file named without a range is read whole.**

- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-41` To do, items 3 to 8 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:56-60` Questions to settle, question 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:76-80` Questions to settle, question 7 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:134-142` Decisions in play ·
  Foundation entries rows 1, 2 and 5 ·
  `foundations/decisions.md:414-428` D-28 · `foundations/decisions.md:4491-4505` D-408 ·
  `foundations/decisions.md:4683-4697` D-43 · `foundations/decisions.md:4185-4217` D-269 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4743-4757` D-47 ·
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:123-140` agent-workflow ·
  `.the-way/product-guidelines/template.md:39-133` the form of guidelines and of a rule ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `src/browser/index.html`

**Notes of the orchestrator for this slice.**

- Write your report and every file of your directory for working copies UNDER THE WORKTREE: the report's absolute path is `.runs\task-cycles\porzadki-widoku-po-react\reports\slice-8-executor-report.md` and your working directory is `.runs\slice-8-executor\`. Check `pwd` before each write.
- State at your base `deed67af`: `styles.css` keeps the shared part; the files are `run-screen.css`, `program-panel.css`, `programs-screen.css`, `waiting-screen.css`, `account-card.css`, `credits.css`, `accounts-screen.css`, `headquarters.css`, `maps-screen.css`, `character-screen.css`, `knowledge-screen.css` (all directly in `src/browser/`, linked in that order after `/styles.css` in `src/browser/index.html`; read `index.html` and the head comment of each new file to know which holds what; the head comments and `index.html` are the source, not another agent's report). Where a place of the styleguide named `styles.css` for a rule, find the class in the stylesheets (`git grep -n "<class>" -- "src/browser/*.css"`) and name the file where the rule stands now.
- Foundation entries already written before the slices: D-421 (the new decision of the stylesheet files; your rule names it), D-408 (a new screen adds its stylesheet and its `<link>`), D-407 and D-43 (D-43 now also gives `text-strong` to the icon on each plaque of a discovery in the scene: its binding sentence ends "… and so does the icon on each plaque of a discovery in the scene, where no text stands beside it either"). Read their current text at the ranges above.
- The styleguide restates the list of D-43 in two places: row `text-strong` of the table of roles (about line 25) and the rule "No value in place of a design token" (about lines 112-113, find them by the words „na ikonach rysunku mapy” / „plakietce ikony lecącej do maga”). Change both to follow D-43 as it now stands (the plaque of a discovery in the scene also stands in `text-strong`); D-40's own sentence is the human's to decide and you do not edit it (the foundations file `foundations/decisions.md` is not in your *Change*).
- `src/browser/AGENTS.md` line 5 and the styleguide's places that name `styles.css` as where a screen's look lives are the places of To do 6; the earlier slices did not touch them.
- `python -B .the-way/elements/common/foundation_check.py` at your base reports one error that is not yours (`tests/view/run-screen-state.test.mjs:309`, a quotation of D-371 in a test of slice 1; the cycle's review fixes it). Your check is that it reports no error beyond that one.
- The comments of `src/browser/view/controls/react-*.tsx`, `src/browser/kitchen-sink/*` and `tests/view/shared-controls.test.mjs` do not change (the plan says so); `tests/view/*.test.mjs` that name `styles.css` read it through the helper since slices 4 and 5 — a comment there that still names the one file for rules that moved is yours to report, not to edit (they are not in your *Change*).

**Return.** Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report's path. The report holds: each check you ran with its command and exit code; the own-work check; the mismatches between the plan and the code you found; each reach beyond this handoff (what, where, why); **Unread material:** each file, entry or passage this handoff names that you did not read whole, or `none`; **Searches not found or unclear:** each thing you looked for and did not find or that was unclear, or `none`; the working copies, where each stood and that you removed it.

**Working copies.** An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
