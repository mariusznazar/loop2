# Handoff — slice 11, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `855939b0d19038b1e0b47037d3d88aa45c70365b`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 11** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-11-report.md`.
- Your directory for working copies: `.runs/slice-11/`.
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

### Slice 11 — the chronicle's entry of a changed rule

- **Goal:** The entry of the chronicle of a changed program rule sets the old and the new sentence of
  the rule in quotation marks joined by „na”: „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze
  → Wędruj”” (To do 21; D-342 as row 9 of the plan's Foundation entries). The other entries keep
  their form.
- **Change:** `src/browser/view/chronicle-entries.ts` · `tests/view/chronicle-entries.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:45-45` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:95-100` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:204-204` Settlements to record ·
  row 9 of the plan's Foundation entries ·
  `foundations/decisions.md:10487-10521` D-342 · `foundations/decisions.md:10617-10667` D-348 ·
  `foundations/decisions.md:10352-10379` D-338 · `foundations/decisions.md:10522-10559` D-343 ·
  `foundations/glossary.md:254-258` chronicle ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the changed expectations written first and seen failing, then
  `npm test -- tests/view/chronicle-entries.test.mjs` · `npm test -- tests/view/chronicle.test.mjs` ·
  `npm test -- tests/view/chronicle-game.test.mjs`
- **Depends on:** Slice 3 · row 9 of Foundation entries

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:45-45`

```
21. Wpis kroniki o zmienionej regule stawia stare i nowe zdanie reguły w cudzysłowach połączonych słowem „na”: „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””; D-342 dostaje ten wzór (pytanie 10; loop2#66-2).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:95-100`

```
- Wpis kroniki „Zmieniono regułę 2.1: Zawsze → Eksploruj → Zawsze → Wędruj” czyta się jak jeden łańcuch, bo strzałka zdania reguły i strzałka zmiany to ten sam znak: jakie brzmienie?
  - Answer: „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””, wzór do D-342.
  - Not chosen:
    - „Zmieniono regułę 2.1 — było: Zawsze → Eksploruj · jest: Zawsze → Wędruj” — ten sam koszt, wpis dłuższy.
    - zostawić — nic nie kosztuje, a każdy wpis o zmienionej regule czyta się jak jeden łańcuch.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””, wzór do D-342. Powód: krótsze od b, „na” i cudzysłowy już są w kronice i przy nazwach grup, a wpis przestaje czytać się jak jeden łańcuch.”
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:204-204`

```
| 9 | Wpis kroniki o zmienionej regule: „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””. | sentence of D-342 | pytanie 10 | jaki znak rozdziela stare i nowe zdanie reguły |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:10558-10600` D-342
- `foundations/decisions.md:10696-10746` D-348
- `foundations/decisions.md:10423-10450` D-338
- `foundations/decisions.md:10601-10638` D-343

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
