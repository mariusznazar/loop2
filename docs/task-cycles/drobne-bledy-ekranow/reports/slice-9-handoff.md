# Handoff — slice 9, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `85e379de74af53e0b0c0b07603e16be7ae9c129f`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 9** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-9-report.md`.
- Your directory for working copies: `.runs/slice-9/`.
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

### Slice 9 — each new copy with every group unfolded

- **Goal:** After a character is sent and after a switch of the character to another program, the
  copy the map run carries out stands with every rule group unfolded: the folds of the copy before,
  which the page's memory of folding (`createFolding` in `src/browser/view/program-panel.tsx`) holds
  under the one key of the copy, do not pass to the new copy (To do 7; D-294 as row 15 of the plan's
  Foundation entries). The folds of a copy stay while its map run goes on, through leaving the
  screen and coming back and through „Restart”, which carries on the same copy (D-164); the folds of
  saved programs stay as D-294 gives them. Where the memory learns of a new copy — in the panel from
  the game state, or in `src/browser/view/game-view.ts`, which gives the memory to both panels — is
  the slice's choice; its report names it.
- **Change:** `src/browser/view/program-panel.tsx` · `src/browser/view/game-view.ts` ·
  `tests/view/program-panel.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:31-31` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:210-210` Settlements to record ·
  row 15 of the plan's Foundation entries ·
  `foundations/decisions.md:8863-8887` D-294 · `foundations/decisions.md:8888-8907` D-295 ·
  `foundations/decisions.md:7761-7782` D-164 · `foundations/decisions.md:7967-7988` D-174 ·
  `foundations/decisions.md:4474-4490` D-407 · `foundations/glossary.md:174-178` copy ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the cases of a send and of a switch after a fold of the copy before, written first and
  seen failing, then `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/end-question.test.mjs`
- **Depends on:** Slice 8 · row 15 of Foundation entries

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:31-31`

```
7. Każda nowa kopia — po wysłaniu postaci i po przełączeniu postaci na inny program — ma wszystkie grupy rozwinięte; zwinięcia poprzedniej kopii na nią nie przechodzą (loop2#056-4).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:210-210`

```
| 15 | Każda nowa kopia — po wysłaniu postaci i po przełączeniu postaci na inny program — ma wszystkie grupy rozwinięte. | sentence of D-294 | punkt 7 *To do*; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | czy zwinięcia jednej kopii przechodzą na następną |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:8905-8934` D-294
- `foundations/decisions.md:8935-8954` D-295
- `foundations/decisions.md:7798-7819` D-164
- `foundations/decisions.md:8009-8030` D-174
- `foundations/decisions.md:4511-4527` D-407

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
