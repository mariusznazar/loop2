# Handoff — slice 10, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `bc79b284af11741d69c76dbd4bbf4388afa471a5`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 10** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-10-report.md`.
- Your directory for working copies: `.runs/slice-10/`.
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

### Slice 10 — the line of a program that changed, with and without unsaved changes of the copy

- **Goal:** Beside the save buttons of the copy, while the program the copy belongs to holds changes
  the copy lacks: with no unsaved changes of the copy the line reads „Program {name} ma zmiany,
  których nie ma w tej kopii.” and „Zapisz w programie” stays inactive (D-171); with unsaved changes
  it reads „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” as
  today (To do 19; D-172 as row 8 of the plan's Foundation entries). Under the question „Zapisać,
  odrzucić, wrócić?”, which stands only with unsaved changes (D-173), the full sentence stays.
  `copyLacksSentence` of `src/browser/view/end-question.tsx` gives both forms, and the program panel
  picks by the copy's unsaved changes.
- **Change:** `src/browser/view/end-question.tsx` · `src/browser/view/program-panel.tsx` ·
  `tests/view/program-panel.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:43-43` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:84-89` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:203-203` Settlements to record ·
  row 8 of the plan's Foundation entries ·
  `foundations/decisions.md:7915-7934` D-172 · `foundations/decisions.md:7894-7914` D-171 ·
  `foundations/decisions.md:7935-7966` D-173 · `foundations/decisions.md:7842-7858` D-168 ·
  `foundations/glossary.md:174-178` copy ·
  `foundations/invariants.md:858-867` copy-save ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the case of the short line with no unsaved changes written first and seen failing,
  then `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/sim/copy-actions.test.mjs`
- **Depends on:** Slice 9 · row 8 of Foundation entries

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:43-43`

```
19. Przy kopii bez niezapisanych zmian, której program ma zmiany nieobecne w kopii, linia pod przyciskami zapisu czyta „Program {name} ma zmiany, których nie ma w tej kopii.”; pełne zdanie „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” stoi tylko wtedy, gdy kopia ma niezapisane zmiany i „Zapisz w programie” działa. D-172 dostaje to drugie brzmienie (pytanie 8; loop2#039-1).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:84-89`

```
- Zdanie D-172 „…— zapis w programie je zastąpi.” stoi także przy wyszarzonym „Zapisz w programie”, gdy gracz zmienił tylko program, a nie kopię: zdanie tylko przy niezapisanych zmianach kopii, sama pierwsza połowa bez nich, czy przyjęty koszt?
  - Answer: bez niezapisanych zmian kopii stoi „Program {name} ma zmiany, których nie ma w tej kopii.”, pełne zdanie tylko przy niezapisanych zmianach kopii; D-172 dostaje drugie brzmienie.
  - Not chosen:
    - zdanie tylko przy niezapisanych zmianach kopii — jeden warunek bez nowego tekstu, a gracz, który zmienił tylko program, nie dowiaduje się, że kopia go nie zna.
    - zostawić, a D-172 dopisuje przyjęty koszt — jedno zdanie, a gracz czyta zapowiedź zapisu przy wyłączonym przycisku.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 b — bez niezapisanych zmian kopii stoi „Program {name} ma zmiany, których nie ma w tej kopii.”, pełne zdanie z „zapis w programie je zastąpi” tylko przy niezapisanych zmianach kopii; D-172 dostaje drugie brzmienie. Powód: informacja prawdziwa zostaje, znika tylko obietnica zapisu przy wyszarzonym przycisku; nowy tekst to ucięte, już przyjęte zdanie, więc nie wymaga osobnej akceptacji brzmienia.”
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:203-203`

```
| 8 | Bez niezapisanych zmian kopii linia czyta „Program {name} ma zmiany, których nie ma w tej kopii.”; pełne zdanie z „zapis w programie je zastąpi” tylko przy niezapisanych zmianach kopii. | sentence of D-172 | pytanie 8 | które brzmienie stoi przy wyszarzonym „Zapisz w programie” |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:7952-7976` D-172
- `foundations/decisions.md:7931-7951` D-171
- `foundations/decisions.md:7977-8008` D-173
- `foundations/decisions.md:7879-7895` D-168

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
