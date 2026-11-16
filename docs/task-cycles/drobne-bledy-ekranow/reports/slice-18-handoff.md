# Handoff — slice 18, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `2d62c5d2d0505762983d3071a9f38fc9a28c5826`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 18** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-18-report.md`.
- Your directory for working copies: `.runs/slice-18/`.
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

### Slice 18 — the mage stops where it reached

- **Goal:** Where the mage walks and its new action leads nowhere — „Zjedz — jagoda”, „Zapal —
  patyk”, a fight, „Zbierz” and „Obchód” with fibre as the target (D-318) — the mage stops where its
  walk has brought it, the place `reachedX` reads (D-319), and does not run on to the place of the
  walk before (To do 20 and the answer to its question). `placeOf` of `src/browser/view/scene.tsx`
  takes that reached place for a goal to stay, in place of `kept`, the target of the walk under way.
- **Change:** `src/browser/view/scene.tsx` · `tests/view/scene.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:44-44` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:90-94` Questions to settle ·
  `foundations/decisions.md:10977-11004` D-318 · `foundations/decisions.md:11005-11039` D-319 ·
  `foundations/decisions.md:10892-10976` D-317 · `foundations/decisions.md:10767-10891` D-316 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — changes how the mage's place is read while a walk is in progress, against D-318 and D-319; reasoning about a state in motion (added in the plan's review)
- **Risk:** none
- **Checks:** the case of a walk cut by an action that leads nowhere written first and seen failing,
  then `npm test -- tests/view/scene.test.mjs` · `npm test -- tests/view/run-screen.test.mjs`
- **Depends on:** none

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:44-44`

```
20. Gdy w trakcie marszu maga jego nowa czynność każe mu stać w miejscu („Zjedz — jagoda”, „Zapal — patyk”, walka, „Zbierz” i „Obchód” z włóknem), mag staje tam, dokąd doszedł, a nie dobiega do celu poprzedniego marszu (D-318; pytanie 9; loop2#059-11).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:90-94`

```
- Mag w marszu, którego nowa czynność każe stać, dobiega do celu starego marszu, a D-318 mówi „the mage stays where it stands”: kod pod D-318 czy D-318 pod kod?
  - Answer: kod pod D-318 — gdy nowa czynność każe stać, mag staje tam, dokąd doszedł; decyzja bez zmian.
  - Not chosen:
    - D-318 dopisuje, że marsz w toku kończy się u swojego celu — jedno zdanie bez zmiany kodu, a gracz przy szybkim tempie widzi do 640 ms biegu przy napisie o jedzeniu albo walce.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — kod pod D-318: gdy nowa czynność każe stać, mag staje tam, dokąd doszedł (placeOf bierze miejsce osiągnięte). Powód: decyzja już mówi, co ma być, D-319 robi to samo przy zmianie celu, a odczyt miejsca istnieje; decyzja bez zmian.”
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:11056-11083` D-318
- `foundations/decisions.md:11084-11118` D-319
- `foundations/decisions.md:10971-11055` D-317
- `foundations/decisions.md:10846-10970` D-316

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
