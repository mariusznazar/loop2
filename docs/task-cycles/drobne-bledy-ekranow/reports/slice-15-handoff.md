# Handoff — slice 15, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `9096759396be96477e22bf68506cf3069222bc29`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 15** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-15-report.md`.
- Your directory for working copies: `.runs/slice-15/`.
- Dependencies are installed (`npm ci`, `.runs/quality-venv`). Run only the focused checks of your slice's *Checks*; never run the full suite (`npm test` without a file) — the full gate is the orchestrator's alone, and it waits for a signal of the human's adviser.
- Commit with explicit `git add <path> …` (never `git add -A`, `.` or `commit -a`), messages in English, the style of the repository's commits (`type: :emoji: text`).

## Working copies (first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## Answers of step 4 and the state of the branch

- Trust boundary: no. Irreversible operation: no. Open design choice: none.
- The foundation entries of the plan (decisions and styleguide rows) are already written and committed before your base; read the entries you need from the files, at the ranges below.

## Your section of the plan, word for word

### Slice 15 — the focus on the login card after a refused emailed link and after „Anuluj”

- **Goal:** Where the page, after an emailed link the server refused or after „Anuluj” of the form
  „Ustaw nowe hasło”, shows the login card, it moves focus to the card, to the first field of the
  form the card stands on, as after a confirmed logout (To do 4; D-381 as row 17 of the plan's
  Foundation entries; row 14). Where the session check leads to the game instead, nothing changes.
  The endings stand in `src/browser/view/app.ts` (`showReset`, `start`, `focusCard`). The cases go
  into a new test file, `tests/view/login-card-focus.test.mjs`, which runs the page on the document
  imitation as `tests/view/account-screen.test.mjs` does, taking its harness as a pattern: that file
  is too large for one slice to change. Check the focus in the game running locally too, as D-88
  asks.
- **Change:** `src/browser/view/app.ts` · `tests/view/login-card-focus.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:28-28` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:128-132` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:209-209` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:212-212` Settlements to record ·
  rows 14 and 17 of the plan's Foundation entries ·
  `foundations/decisions.md:3075-3087` D-381 · `foundations/decisions.md:2829-2843` D-96 ·
  `foundations/decisions.md:3416-3455` D-225 · `foundations/decisions.md:3182-3208` D-156 ·
  `foundations/decisions.md:2930-2953` D-259 · `foundations/decisions.md:2999-3049` D-262 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `foundations/invariants.md:578-587` node-test-selection ·
  `tests/view/account-screen.test.mjs:1-434` · `tests/view/account-screen.test.mjs:1740-1830` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** the new cases written first and seen failing, then
  `npm test -- tests/view/login-card-focus.test.mjs` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/password-reset.test.mjs`
  · `npm test -- tests/quality/test_node_test_selection.py` · the focus checked in a real browser by
  `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** rows 14 and 17 of Foundation entries

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:28-28`

```
4. Po odrzuconym odnośniku z maila i po „Anuluj” fokus klawiatury trafia na kartę logowania, nie na stronę; D-381 dopisuje oba przypadki do tych, po których strona przenosi fokus na kartę (pytanie 16; loop2#045-1).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:128-132`

```
- Punkt 4 *To do* (fokus na karcie logowania po odrzuconym odnośniku z maila i po „Anuluj”) przeczy D-381: „…the page moves focus to it only after a confirmed logout, after a logout the server answers with no session and after a password was set…”: zmienić D-381 czy wyrzucić punkt 4?
  - Answer: D-381 dopisuje oba przypadki — odrzucony odnośnik z maila i „Anuluj”.
  - Not chosen:
    - punkt 4 wypada z zadania — zero pracy, a gracz z klawiaturą dalej gubi fokus.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — D-381 dopisuje oba przypadki (odrzucony odnośnik z maila, „Anuluj”) + wiersz ustaleń; to ta sama rodzina co przyjęty wiersz 14 o fokusie.”
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:209-209`

```
| 14 | Gdy element z fokusem znika (zamknięta karta, przerwany wiersz), fokus idzie na element, który stoi w jego miejscu albo najbliżej, nigdy na stronę. | guidelines: styleguide | punkty 4, 5 i 6 *To do*; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | dokąd oddać fokus w następnej kontrolce, która znika po kliknięciu |
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:212-212`

```
| 17 | Strona przenosi fokus na kartę logowania także po odrzuconym odnośniku z maila i po „Anuluj”. | sentence of D-381 | pytanie 16 | czy zostawić fokus na stronie, bo D-381 mówi „only”, albo zrobić poprawkę wbrew decyzji |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:3086-3100` D-381
- `foundations/decisions.md:2840-2854` D-96
- `foundations/decisions.md:3429-3468` D-225
- `foundations/decisions.md:3195-3221` D-156
- `foundations/decisions.md:2941-2964` D-259
- `foundations/decisions.md:3010-3060` D-262
- `foundations/decisions.md:1551-1565` D-420

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
