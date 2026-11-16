# Handoff — slice 7, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `23aa54401b794a8f1a1f4b1e2bdab95ea67e3c5b`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 7** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-7-report.md`.
- Your directory for working copies: `.runs/slice-7/`.
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

### Slice 7 — the credits without impossible checks, and the loaded paused run truly loaded

- **Goal:** `src/browser/view/credit-lines.ts` no longer checks `icon === undefined` and
  `iconTitle === undefined` of an action, which the data of actions do not allow (To do 13); the
  credits it writes stay the same (invariant `icon-credits`). The test „a loaded map run comes back
  paused, …” of `tests/view/scene-picture.test.mjs`, today a copy of the test of the pause just
  before it, loads a saved game state through `loadSavedGame` of the simulation and checks that the
  scene stands as at a pause (D-212, D-322); its name says what it checks (answer to the question
  about that test).
- **Change:** `src/browser/view/credit-lines.ts` · `tests/view/scene-picture.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:37-37` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:143-148` Questions to settle ·
  `foundations/decisions.md:4570-4622` D-27 · `foundations/decisions.md:3922-3983` D-212 ·
  `foundations/decisions.md:11108-11174` D-322 ·
  `foundations/invariants.md:331-342` icon-credits ·
  `src/browser/sim/data/actions.ts` · `src/browser/sim/saved-game.ts:1-80` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the changed test seen failing first where it loads a document whose run is not paused,
  then `npm test -- tests/view/scene-picture.test.mjs` ·
  `npm test -- tests/invariants/test_icon_credits.py` · `npm test -- tests/view/icons.test.mjs`
- **Depends on:** none

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:37-37`

```
13. Porządek w kodzie widoku: komórki wyboru panelu reguły dostają `tabIndex` z właściwości, nie z efektu (`guidelines/coding-browser-module.md`, sekcja „Efekty”; loop2#056-7); z modułu edytora programu znikają typy celów fokusu i komentarze starego edytora DOM (loop2#056-12); ze spisu podziękowań znikają sprawdzenia `icon === undefined` i `iconTitle === undefined`, których dane nie dopuszczają (loop2#056-15); test „a loaded map run comes back paused, …” w `tests/view/scene-picture.test.mjs`, dziś kopia testu pauzy tuż przed nim, naprawdę wczytuje zapis (`loadSavedGame`) i sprawdza, że scena stoi jak w pauzie (pytanie 19; loop2#059-9).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:143-148`

```
- Test „a loaded map run comes back paused, …” jest dokładną kopią testu pauzy tuż przed nim, więc sama zmiana nazwy zostawia duplikat: test naprawdę wczytuje zapis czy znika?
  - Answer: test naprawdę wczytuje zapis i sprawdza scenę w pauzie.
  - Not chosen:
    - test znika jako duplikat; wczytanie w pauzie przypina test symulacji `tests/sim/saved-game.test.mjs`.
    - zmiana nazwy — zostają dwa identyczne testy.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „4 a — test naprawdę wczytuje zapis i sprawdza scenę w pauzie.”
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:4607-4659` D-27
- `foundations/decisions.md:3947-4008` D-212
- `foundations/decisions.md:11187-11253` D-322

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
