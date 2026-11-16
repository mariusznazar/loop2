# Handoff — slice 3 (slice-3-executor)

**The delegation.** The person who started this cycle has delegated the intermediate choices to the orchestrator. Your questions go to the orchestrator, never to a human; nothing you receive back is the human's approval.

**Worktree.** `the worktree's root`, branch `task/porzadki-widoku-po-react`. Work from its root; never write in the main checkout. Slice base: `a874dbff6df6ebf5e338f82ac6bda3fe640168ae` — your commits start there. Commit explicitly by path (`git add <path>...`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the style of the product's history (`type: :emoji: what and why`). Do not run the product's gate (`npm test` without a file); run the focused checks of your slice only. Do not push.

**Method and stage.** You are the executor of a slice. Read `.the-way/task-cycle/change/SKILL.md` whole and follow it in the variant of its row "a slice, or the retry of a slice" (read `.the-way/task-cycle/change/slice.md`; other files that `SKILL.md` names only when the step that names them comes, e.g. `.the-way/task-cycle/change/ui_check.md` if the slice changes the look of a screen). Your boundary is this slice; return before the next one. Class of your model: `same`.

**Your report:** `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-3-executor-report.md`. **Your directory for working copies:** `.runs/slice-3-executor/`.

**Your section of the plan (copied word for word from `.runs/task-cycles/porzadki-widoku-po-react/plan.md`).**

### Slice 3 — The tables of files of the two kinds after the audit

- **Goal:** The tables „Files of this kind” of `guidelines/coding-browser-module.md` and `guidelines/coding-simulation-module.md` hold one row for each file of their kind at this slice's head — in the first, each file git tracks under `src/browser/view/`, `controls/` included; in the second, each file git tracks directly under `src/browser/sim/` other than `saved-game.ts` (kind `saved-game`), the files of `src/browser/sim/data/` being kind `content-data` — each with the status of the task's audit (To do 2, question 6). The exemplars stay: `src/browser/view/account-card.tsx` (D-36) and `src/browser/sim/game.ts` (D-35). In the first table `do not copy` stands at `game-view.ts`, `headquarters-entry.ts`, `programs-entry.ts` and `rule-list.tsx`, and `copy` at every other file the task's audit judged: `app.ts`, `body-row.ts`, `combat-line.ts`, `email-confirmation.ts`, `game-saver.ts`, `program-editor.ts`, `status-row.ts`, `tile-list.ts`, `trip-editor.ts` and `trip-lines.ts` go from `do not copy` to `copy`, `rule-list.tsx` from `copy` to `do not copy`, and `camp-picture.ts`, `camp.tsx`, `end-question.tsx`, `header-rows.tsx`, `page-sentences.tsx`, `previous-save-lines.ts` and `waiting-screen.tsx` get rows `copy`. In the second, `do not copy` stands at `loop.ts` and `skills.ts` and `copy` at every other file, as today. The task's audit was made on `e125db89`; the base is later, so the slice also does four things. (a) It finds again in the current files each place that gives `do not copy` — at the base `src/browser/view/game-view.ts:179`, `src/browser/view/headquarters-entry.ts:50`, `src/browser/view/programs-entry.ts:317`, `src/browser/view/rule-list.tsx:220-224`, `startLoop` in `src/browser/sim/loop.ts` and `buyBranch` in `src/browser/sim/skills.ts` — and confirms that each still breaks the rule the task names; where one no longer does, it stops and reports. (b) It compares the four files of the kind the audit did not see, which the screen Wiedza added — `src/browser/view/counted-name.ts`, `src/browser/view/knowledge-entry.ts`, `src/browser/view/knowledge-lines.ts` and `src/browser/view/knowledge-screen.tsx` — with the rules of the kind as the audit compared each file: every rule under "Rules" of `guidelines/coding-browser-module.md` and of `guidelines/coding.md`, read against the file, with no run of a linter; each gets `copy` where it breaks none, and `do not copy` otherwise. (c) It reads the changes made since the audit to the files of the first table — those between `e125db89` and the base (`credit-lines.ts`, `credits.ts`, `game-view.ts`, `map-lines.ts`, `maps-screen.tsx`, `menu-bar.tsx`, `program-editor.ts`, `scene-picture.ts`, `screen-address.ts`, with `git diff e125db89 7ba7a116 -- <file>`) and those Slices 1 and 2 made (`git diff 7ba7a116 HEAD -- src/browser/view/`) — and keeps the task's status unless a change breaks a rule, where the file gets `do not copy`. (d) It lists the files of each kind against the rows at its head: no file without a row and no row without a file (at the base only the eleven files named above lacked a row, and no row lacked its file). Each table keeps the template's three columns — File, Status and Decision, `—` on every row but the exemplar's — and its rows in the order of the path; no table takes the place of a `do not copy`: the place of each `do not copy` (file and line, with the rule it breaks) and the results of (a) to (d) stand in the slice's report. Nothing else of the two files changes.
- **Change:** `guidelines/coding-browser-module.md` · `guidelines/coding-simulation-module.md`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:28-35` To do, item 2 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:45-50` Questions to settle, question 1 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:71-75` Questions to settle, question 6 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:116-119` Context, the files without a row and the rule of a file added after the audit ·
  `.the-way/product-guidelines/coding/template.md:255-270` the form of "Files of this kind" ·
  `.the-way/product-guidelines/coding/kinds.md:1-29` Kinds, the statuses copy and do not copy ·
  `guidelines/coding.md` ·
  `foundations/decisions.md:519-533` D-35 · `foundations/decisions.md:534-548` D-36 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4474-4490` D-407 ·
  `foundations/decisions.md:1781-1850` D-252 ·
  `foundations/part_map.md:123-140` agent-workflow ·
  `src/browser/view/counted-name.ts` · `src/browser/view/knowledge-entry.ts` ·
  `src/browser/view/knowledge-lines.ts` · `src/browser/view/knowledge-screen.tsx` ·
  `src/browser/view/game-view.ts:170-190` · `src/browser/view/headquarters-entry.ts:44-60` ·
  `src/browser/view/programs-entry.ts:310-330` · `src/browser/view/rule-list.tsx:210-232` ·
  `src/browser/sim/loop.ts:95-135` · `src/browser/sim/skills.ts:165-190`
- **Model:** same — orchestrator's change in the plan's review: the four new files are judged against every rule of two guideline files, and a judgment missed here leaves a `copy` nobody evaluated, which is the very reason of the task; the rest is settled by the task
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · the listing of (d), run at the slice's head and pasted into the report
- **Depends on:** Slice 2

**Passages of the frozen task (`.runs/task-cycles/porzadki-widoku-po-react/task.md`; the task binds where your section says less), copied word for word.**

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:28-35` To do, item 2*

2. Tabele „Files of this kind” w `guidelines/coding-browser-module.md` i `guidelines/coding-simulation-module.md` mają wiersz dla każdego pliku swojego rodzaju, z siedmioma plikami widoku, które dziś wiersza nie mają, a każdy wiersz ma status z audytu tego doprecyzowania (pytanie 6); wzorce `src/browser/view/account-card.tsx` (D-36) i `src/browser/sim/game.ts` (D-35) zostają.
   - `guidelines/coding-browser-module.md`, pliki w `src/browser/view/`: `do not copy` mają `game-view.ts`, `headquarters-entry.ts`, `programs-entry.ts` i `rule-list.tsx`; każdy inny plik rodzaju ma `copy`. Zmiana względem tabeli na `e125db89`: `app.ts`, `body-row.ts`, `combat-line.ts`, `email-confirmation.ts`, `game-saver.ts`, `program-editor.ts`, `status-row.ts`, `tile-list.ts`, `trip-editor.ts`, `trip-lines.ts` przechodzą z `do not copy` na `copy`; `rule-list.tsx` z `copy` na `do not copy`; nowe wiersze `copy` dostają `camp-picture.ts`, `camp.tsx`, `end-question.tsx`, `header-rows.tsx`, `page-sentences.tsx`, `previous-save-lines.ts`, `waiting-screen.tsx`.
   - `guidelines/coding-simulation-module.md`, pliki w `src/browser/sim/`: `do not copy` mają `loop.ts` i `skills.ts`, każdy inny plik rodzaju `copy` — bez zmiany względem tabeli.
   - Miejsca, które dają `do not copy` (stan na `e125db89`):
     - `game-view.ts:178` — `document.createElement("div")` pojemnika `game-view`; reguła „Nowy ekran i moduły w DOM” pozwala budować przez API DOM tylko nagłówek i blok główny strony oraz host korzenia przez jego fabrykę.
     - `headquarters-entry.ts:50` i `programs-entry.ts:317` — wejście ekranu buduje przez API DOM ramkę `section.screen` z klasą i `tabIndex`; ta sama reguła i reguła „TypeScript i DOM”: „Żaden ekran nie powstaje przez API DOM”.
     - `rule-list.tsx:220-227` — komponent tworzy `div` przez `document.createElement` i przenosi go przez `appendChild` (miejsce panelu reguły, przyjęte w uzasadnieniu D-407); ta sama reguła.
     - `loop.ts:107-127` (`startLoop`) i `skills.ts:176-181` (`buyBranch`) — mapa, postać, program albo gałąź, których nie ma, dają niezmieniony stan bez zdarzeń, jak zwykła odmowa, gdy wzorzec `game.ts` w `send` rzuca błąd; reguła „Hiding a failure” w `guidelines/coding.md`: „Awarii nie zamieniaj ani w odpowiedź „wszystko w porządku”, ani w pustą listę.”

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:45-50` Questions to settle, question 1*

- 1. Jak szeroki jest audyt statusów w tabelach plików i kiedy się odbywa?
  - Answer: a) tylko dwie tabele, `guidelines/coding-browser-module.md` i `guidelines/coding-simulation-module.md`: każdy plik rodzaju porównany w tym doprecyzowaniu z regułami wytycznych swojego rodzaju, `do not copy` z miejscem, które łamie regułę, `copy` dla każdego innego; bez próbnego uruchomienia linterów i bez innych rodzajów.
  - Not chosen:
    - b) pełne odświeżenie wytycznych kodowania przez skill — próbne uruchomienie linterów i audyt wszystkich 12 rodzajów, także serwerowych; kilka razy więcej pracy i zachodzi na zadanie `the author's task note on the structure of the code from the foundation review` (reguła rozmiaru).
    - c) audyt w cyklu — szybsze doprecyzowanie, ale cykl musi stanąć i pokazać statusy przy zablokowanym PR; dodatkowa runda w gorszym miejscu.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a”.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:71-75` Questions to settle, question 6*

- 6. Czy przyjąć statusy z audytu obu tabel, zapisane w punkcie 2 „To do”?
  - Answer: a) tak, w całości; `game-view.ts` zostaje `do not copy`, bo reguła pozwala budować przez API DOM tylko nagłówek i blok główny strony oraz host korzenia, a pojemnik ekranów żadnym z nich nie jest.
  - Not chosen:
    - b) tak, ale `game-view.ts` dostaje `copy`, czytając pojemnik jako część strony — zmienia regułę bez decyzji.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a” (na pytanie o listę statusów); audyt: trzy agenci porównali pliki z regułami, każde miejsce `do not copy` sprawdzone w kodzie na `e125db89`.

*`.runs/task-cycles/porzadki-widoku-po-react/task.md:116-119` Context, the files without a row and the rule of a file added after the audit*

- Pliki widoku bez wiersza w tabeli: `camp-picture.ts`, `camp.tsx`, `end-question.tsx`, `header-rows.tsx`, `page-sentences.tsx`, `previous-save-lines.ts`, `waiting-screen.tsx` w `src/browser/view/`; każdy plik symulacji ma wiersz.
- Siedem plików `do not copy`, które według karty D24 w `the author's architecture note of loop2` nie budują już elementów strony przez API DOM — `body-row.ts`, `combat-line.ts`, `status-row.ts`, `tile-list.ts`, `trip-editor.ts`, `trip-lines.ts`, `program-editor.ts` — nie zawiera na `e125db89` ani `createElement`, ani `appendChild`.
- Przykładowe wiersze `copy` dopisane przez cykle bez audytu: `last-resort.ts`, `headquarters.tsx`, `map-lines.ts`, `maps-screen.tsx`, `team-lines.ts`, `away-report.ts` w `guidelines/coding-browser-module.md` i `src/browser/sim/map-card.ts` w `guidelines/coding-simulation-module.md`; `away-report.ts` zmieniło `do not copy` na `copy` (uwagi z próśb loop2#62-8 i loop2#64-3, grupa G-2 przeglądu fundamentu `the author's note of the foundation review of 2026-11-13`).
- Reguła „Nowy ekran i moduły w DOM” w `guidelines/coding-browser-module.md` mówi: „Plik dodany po ostatnim audycie tabeli nie ma w niej wiersza i też nie jest wzorem.”

**Foundation entries of your *Read*, by identifier with their ranges in `foundations/decisions.md` as the file stands at your base (these ranges hold; those of the plan are older). Read each whole.**

- D-35: `foundations/decisions.md:519-533`
- D-36: `foundations/decisions.md:534-548`
- D-265: `foundations/decisions.md:4108-4155`
- D-407: `foundations/decisions.md:4474-4490`
- D-252: `foundations/decisions.md:1781-1850`

**The rest of your *Read*, as the plan gives it (paths and ranges of files other than the decisions and the task; the foundation entries named `Foundation entries row N` are the entries written before your slice: row 1 = D-421, row 2 = D-408, rows 3 and 4 = D-407, row 5 = D-43). Guideline files are read whole; a file named without a range is read whole.**

- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:28-35` To do, item 2 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:45-50` Questions to settle, question 1 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:71-75` Questions to settle, question 6 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:116-119` Context, the files without a row and the rule of a file added after the audit ·
  `.the-way/product-guidelines/coding/template.md:255-270` the form of "Files of this kind" ·
  `.the-way/product-guidelines/coding/kinds.md:1-29` Kinds, the statuses copy and do not copy ·
  `guidelines/coding.md` ·
  `foundations/decisions.md:519-533` D-35 · `foundations/decisions.md:534-548` D-36 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4474-4490` D-407 ·
  `foundations/decisions.md:1781-1850` D-252 ·
  `foundations/part_map.md:123-140` agent-workflow ·
  `src/browser/view/counted-name.ts` · `src/browser/view/knowledge-entry.ts` ·
  `src/browser/view/knowledge-lines.ts` · `src/browser/view/knowledge-screen.tsx` ·
  `src/browser/view/game-view.ts:170-190` · `src/browser/view/headquarters-entry.ts:44-60` ·
  `src/browser/view/programs-entry.ts:310-330` · `src/browser/view/rule-list.tsx:210-232` ·
  `src/browser/sim/loop.ts:95-135` · `src/browser/sim/skills.ts:165-190`

**Notes of the orchestrator for this slice.**

- Slice 2 added a file of the kind: `src/browser/view/run-screen-reading.ts` (the hook both React roots of the screen Przejście read the state through), not named by the plan. Your part (d) lists the files against the rows at your head, so it gets a row too, judged by the same comparison as the other new files (part (b)). Slices 1 and 2 changed `run-screen-state.ts`, `run-screen.tsx`, `run-entry.ts` and `program-panel.tsx`: part (c) applies to them.
- `python -B .the-way/elements/common/foundation_check.py` at your base reports one error that is not yours and that you do not fix: `tests/view/run-screen-state.test.mjs:309: the quotation does not begin a sentence of D-371` (left by slice 1; the cycle's review and its fix handle it). Report it as present at your base and check that your own change adds no error beyond it.
- The table of `guidelines/coding-browser-module.md` and the simulation table keep the template's three columns; the place of each `do not copy` goes to your report only (plan *Choices*).

**Return.** Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report's path. The report holds: each check you ran with its command and exit code; the own-work check; the mismatches between the plan and the code you found; each reach beyond this handoff (what, where, why); **Unread material:** each file, entry or passage this handoff names that you did not read whole, or `none`; **Searches not found or unclear:** each thing you looked for and did not find or that was unclear, or `none`; the working copies, where each stood and that you removed it.

**Working copies.** An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
