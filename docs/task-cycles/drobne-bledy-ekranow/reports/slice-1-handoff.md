# Handoff — slice 1, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `fecbea47f64b4fbdb69f1458862d2e75672e186a`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 1** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-1-report.md`.
- Your directory for working copies: `.runs/slice-1/`.
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

## Orchestrator's notes that bind this slice

This is slice 1: your range for the review runs from `bd82d394e8ea08c77c8c8afb695bd931706f1644` (the entries of the plan are in it), but you start from the head `fecbea47f64b4fbdb69f1458862d2e75672e186a` given as your base; your files to change are the slice's *Change* alone.

## Your section of the plan, word for word

### Slice 1 — the unit of each condition with a number, held by a test

- **Goal:** Each condition of `src/browser/sim/data/conditions.ts` that takes a number (it has
  `defaultValue`, `min`, `max` and `step`) carries its unit, and a test in `tests/sim/data.test.mjs`
  fails for such a condition without one, so that no new condition with a number comes without its
  unit — the data part of the task's settlement 16. The data hold the units today („°C”, „%”,
  „szt.”, „min”, „pkt”, as D-376 counts the numbers); the slice makes the type of the data or the
  test require them, gives no unit to a condition that takes no number, and changes no number. The
  view does not change here: Slices 3, 4 and 5 make the three places that show the number read the
  unit.
- **Change:** `src/browser/sim/data/conditions.ts` · `tests/sim/data.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:27-27` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:133-137` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:211-211` Settlements to record ·
  `foundations/decisions.md:7723-7741` D-376 · `foundations/decisions.md:7451-7494` D-23 ·
  `foundations/invariants.md:364-374` program-closed-lists ·
  `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/part_map.md:30-61` simulation · `src/browser/view/status-row.ts:70-80` ·
  `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the new case of `tests/sim/data.test.mjs` written first and seen failing on a copy of
  the data with one unit taken out, then `npm test -- tests/sim/data.test.mjs` ·
  `npm test -- tests/invariants/test_program_closed_lists.py` ·
  `npm test -- tests/invariants/test_simulation_type_check.py`
- **Depends on:** none

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
- `foundations/decisions.md:7488-7531` D-23

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
