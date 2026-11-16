# Handoff — slice 13, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `798c278a351d5d36db277625610e724bead03e5f`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 13** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-13-report.md`.
- Your directory for working copies: `.runs/slice-13/`.
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

### Slice 13 — a long name in the team row of Siedziba

- **Goal:** A long name of a character with no space breaks inside its row of „Drużyna” on Siedziba
  and does not run out of the row, at 1280 × 720 and in a narrower window (To do 2); the rule stands
  in `src/browser/headquarters.css`, the stylesheet of Siedziba (D-421), and keeps to the general
  rule that row 13 of the plan's Foundation entries puts in the styleguide. Look in the game running
  locally with a character named by some 40 letters with no space.
- **Change:** `src/browser/headquarters.css`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:26-26` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:208-208` Settlements to record ·
  row 13 of the plan's Foundation entries ·
  `foundations/decisions.md:5733-5758` D-52 · `foundations/decisions.md:4551-4565` D-421 ·
  `foundations/decisions.md:4698-4712` D-43 · `foundations/decisions.md:5122-5136` D-396 ·
  `foundations/invariants.md:458-467` browser-view-token-values ·
  `src/browser/view/headquarters.tsx:168-216` ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1510-1524` D-418 ·
  `foundations/decisions.md:1525-1539` D-419 · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/view/headquarters-screen.test.mjs` · the row looked at in a real browser by
  `.claude/skills/loop2-play/SKILL.md`, at 1280 × 720 and narrower
- **Depends on:** row 13 of Foundation entries

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:26-26`

```
2. Długie imię postaci bez spacji łamie się w wierszu drużyny Siedziby i nie wychodzi poza wiersz (loop2#024-3).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:208-208`

```
| 13 | Długie imię albo nazwa wpisana przez gracza bez spacji łamie się w swoim wierszu i nie wychodzi poza niego. | guidelines: styleguide | punkt 2 *To do*; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | czy następny ekran z nazwą gracza też ją zawija, czy ucina albo przewija |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:5770-5795` D-52
- `foundations/decisions.md:4588-4602` D-421
- `foundations/decisions.md:4735-4749` D-43
- `foundations/decisions.md:5159-5173` D-396
- `foundations/decisions.md:1455-1520` D-417
- `foundations/decisions.md:1521-1535` D-418
- `foundations/decisions.md:1536-1550` D-419
- `foundations/decisions.md:1551-1565` D-420

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
