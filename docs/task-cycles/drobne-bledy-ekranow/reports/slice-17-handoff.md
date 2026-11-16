# Handoff — slice 17, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `1130a9beb1b1373207561e4d7cefe6c77eea46c2`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 17** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-17-report.md`.
- Your directory for working copies: `.runs/slice-17/`.
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

### Slice 17 — a click outside the menu „Konto”

- **Goal:** A click outside the open menu „Konto” closes it and leaves the focus where the player
  clicked, so the first click into a text field puts the caret there; where the clicked place takes
  no focus (the empty background), the focus returns to „Konto” and never stays on a closed, hidden
  element of the menu; Escape and a second click on „Konto” return the focus to „Konto” as today
  (To do 18; D-285 as row 6 of the plan's Foundation entries, and its sentence in the styleguide as
  row 7). The document's events of the open menu stay in an Effect with its cleanup, as D-267 asks.
  Check in the game running locally too: the document imitation does not show where a click puts
  the focus (D-88).
- **Change:** `src/browser/view/menu-bar.tsx` · `tests/view/menu-bar.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:42-42` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:48-48` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:79-83` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:201-202` Settlements to record ·
  rows 6 and 7 of the plan's Foundation entries ·
  `foundations/decisions.md:4395-4422` D-285 · `foundations/decisions.md:4247-4316` D-280 ·
  `foundations/decisions.md:4156-4184` D-267 · `foundations/decisions.md:4758-4772` D-47 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** the cases of a click on a field and of a click on the background written first and
  seen failing, then `npm test -- tests/view/menu-bar.test.mjs` ·
  `npm test -- tests/view/account-screen.test.mjs` · the focus checked in a real browser by
  `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** rows 6 and 7 of Foundation entries

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:42-42`

```
18. Kliknięcie poza otwartym menu „Konto” zamyka je i zostawia fokus tam, gdzie gracz kliknął, więc pierwsze kliknięcie w pole tekstowe stawia w nim kursor; gdy kliknięte miejsce fokusu nie przyjmuje (puste tło), fokus wraca na „Konto” i nie zostaje na zamkniętym, ukrytym elemencie menu; Escape i drugie kliknięcie w „Konto” dalej oddają fokus „Konto”. D-285 odnosi powrót fokusu na „Konto” do Escape, drugiego kliknięcia i kliknięcia w miejsce bez fokusu (pytanie 7; loop2#055-4).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:48-48`

```
24. W `guidelines/styleguide-browser-view.md` zdanie o menu „Konto” („…a zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem „Konto”, fokus wraca wtedy na „Konto”…”) mówi to samo co zmieniona D-285 (punkt 18).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:79-83`

```
- Kliknięcie obok otwartego menu „Konto” oddaje fokus „Konto”, więc pierwsze kliknięcie w pole tekstowe przepada: fokus zostaje tam, gdzie gracz kliknął, czy D-285 dopisuje przyjęty koszt?
  - Answer: kliknięcie obok zamyka menu i zostawia fokus tam, gdzie gracz kliknął; Escape i drugie kliknięcie w „Konto” dalej oddają fokus „Konto”; kliknięcie w miejsce, które fokusu nie przyjmuje, oddaje fokus „Konto”, nie zostawia go na zamkniętym, ukrytym elemencie menu.
  - Not chosen:
    - zostawić, a D-285 dopisuje, że pierwsze kliknięcie w pole przy otwartym menu tylko zamyka menu — jedno zdanie bez zmiany kodu, a gracz traci pierwsze kliknięcie za każdym razem.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — kliknięcie obok zamyka menu i zostawia fokus tam, gdzie gracz kliknął; Escape i drugie kliknięcie w „Konto” dalej oddają fokus „Konto”. Powód: przy myszy gracz sam wskazał miejsce, a zabrane pierwsze kliknięcie to odczuwalna usterka; powrót fokusu zostaje tam, gdzie ma sens — przy klawiaturze. Uwaga dla To do: kliknięcie obok w miejsce, które fokusu nie przyjmuje (puste tło), nie może zostawić fokusu na zamkniętym, ukrytym elemencie menu — wtedy fokus wraca na „Konto”.”
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:201-202`

```
| 6 | Kliknięcie poza menu „Konto” zostawia fokus tam, gdzie gracz kliknął; na „Konto” fokus wraca po Escape, po drugim kliknięciu w „Konto” i po kliknięciu w miejsce bez fokusu. | sentence of D-285 | pytanie 7 | dokąd idzie fokus po kliknięciu poza menu |
| 7 | To samo zdanie o menu „Konto” stoi w styleguide widoku (punkt 24 *To do*). | guidelines: styleguide | pytanie 7 | zostawić w styleguide zdanie sprzeczne ze zmienioną D-285 |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:4420-4459` D-285
- `foundations/decisions.md:4272-4341` D-280
- `foundations/decisions.md:4181-4209` D-267
- `foundations/decisions.md:4795-4809` D-47
- `foundations/decisions.md:1551-1565` D-420

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
