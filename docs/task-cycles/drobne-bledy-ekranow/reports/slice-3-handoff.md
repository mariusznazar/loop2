# Handoff — slice 3, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `f4489d369ab9a12dca74935c8f1d0a6ad159b55a`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 3** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-3-report.md`.
- Your directory for working copies: `.runs/slice-3/`.
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

### Slice 3 — the unit in the sentence of a rule

- **Goal:** `conditionSentence` of `src/browser/view/program-editor.ts` writes the number of a
  condition with the unit of the condition's data (Slice 1): the number, a space and the unit, before
  the target, as the band of a discovery writes „… szt.” (`status-row.ts`) — „Zostało mniej niż —
  ognisko 20 min”, „Temperatura poniżej 35 °C”, „Zapas poniżej 8 szt. · Patyk” (To do 3). Every place
  that writes the sentence of a rule of the player reads it there: the row and the header of a group
  in the program editor, the entries of the chronicle and „Nie zadziałały ani razu” of the end-of-run
  window. The expectations of `tests/view/program-editor.test.mjs` and
  `tests/view/chronicle-entries.test.mjs` change with it. The four expectations of the rows and
  headers in `tests/view/rule-editor.test.mjs` („Sytość poniżej 30”, „Zapas poniżej 8 · Patyk”)
  change in Slice 4, which follows at once; at this slice's head that file fails on them, and the
  report says so.
- **Change:** `src/browser/view/program-editor.ts` · `tests/view/program-editor.test.mjs` ·
  `tests/view/chronicle-entries.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:27-27` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:133-137` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:211-211` Settlements to record ·
  `foundations/decisions.md:7723-7741` D-376 · `foundations/decisions.md:8750-8825` D-288 ·
  `foundations/decisions.md:8826-8842` D-292 · `foundations/decisions.md:10487-10521` D-342 ·
  `foundations/decisions.md:10226-10260` D-368 ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `src/browser/sim/data/conditions.ts` · `src/browser/view/status-row.ts:70-80` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the changed expectations of `tests/view/program-editor.test.mjs` written first and seen
  failing, then `npm test -- tests/view/program-editor.test.mjs` ·
  `npm test -- tests/view/chronicle-entries.test.mjs` ·
  `npm test -- tests/view/end-window-lines.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py`
- **Depends on:** Slice 1

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:27-27`

```
3. Liczba warunku stoi z jednostką z danych warunku — „Zostało mniej niż — ognisko 20 min”, „°C”, „%”, „szt.”, „pkt” — w zdaniu wiersza reguły, przy polu liczby w panelu reguły i w zdaniu reguły wilka na ekranie przejścia („Wilk: Zdrowie poniżej 8 → Odskocz”, `src/browser/view/combat-line.ts`) (pytanie 17; loop2#025-2).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:133-137`

```
- Zdanie reguły wilka na ekranie przejścia składa osobny kod (`src/browser/view/combat-line.ts`): czy liczba stoi tam z jednostką jak w zdaniu reguły gracza?
  - Answer: tak, jednostka także w zdaniu wilka.
  - Not chosen:
    - tylko wiersz reguły gracza i pole liczby panelu — zdanie wilka bez jednostki obok zdań gracza z jednostką.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a — jednostka także w zdaniu wilka; „zawsze” z wiersza 16 ma być prawdziwe na każdym ekranie.”
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:211-211`

```
| 16 | Liczba warunku stoi zawsze z jednostką z danych warunku, na każdym ekranie: w zdaniu reguły gracza, w zdaniu reguły wilka i przy polu liczby panelu reguły. | data or code: jednostka w danych warunków (`src/browser/sim/data/conditions.ts`) i test, że ma ją każdy warunek z liczbą | punkt 3 *To do* i pytanie 17; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | czy jednostka siedzi w danych warunku, czy w widoku, i czy nowy warunek musi ją mieć |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:7760-7778` D-376
- `foundations/decisions.md:8792-8867` D-288
- `foundations/decisions.md:8868-8884` D-292
- `foundations/decisions.md:10558-10600` D-342
- `foundations/decisions.md:10297-10331` D-368

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
