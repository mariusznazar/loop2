# Handoff — slice 16, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `dc787331006db07e36622b65c434e43102c49ce4`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 16** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-16-report.md`.
- Your directory for working copies: `.runs/slice-16/`.
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

### Slice 16 — the rhythm and the hidden page after a failed save

- **Goal:** The 30-second rhythm and the hidden page, closing included, send the game state also
  where the save last sent failed, though it did not change since, so that a change whose save
  failed has one more chance when the tab closes (To do 17; D-207 as row 5 of the plan's Foundation
  entries). After a failure one request waits at a time: the retries after 5, 10 and 20 and then
  every 30 real seconds stay as D-208 gives them, and a moment of saving of D-207 — a tick of the
  rhythm and the hidden page among them — that comes while a retry is planned is sent at once and
  takes the place of that retry, as D-208 says („…and at once at a moment of saving of D-207”), so
  the rhythm never sends beside a planned retry; at most one request is in flight (D-207). The tests
  of `tests/view/game-saver.test.mjs` show it: the hidden page sending after a failed save with no
  change since; a tick of the rhythm after a failure sending once, the planned retry not following
  it as a second request; and a success ending the retries as today.
- **Change:** `src/browser/view/game-saver.ts` · `tests/view/game-saver.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:41-41` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:74-78` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:200-200` Settlements to record ·
  row 5 of the plan's Foundation entries ·
  `foundations/decisions.md:3701-3769` D-207 · `foundations/decisions.md:3770-3797` D-208 ·
  `foundations/decisions.md:2844-2868` D-97 · `foundations/decisions.md:3798-3844` D-209 ·
  `foundations/decisions.md:3880-3921` D-211 · `foundations/decisions.md:4444-4458` D-323 ·
  `foundations/glossary.md:235-239` save time ·
  `foundations/invariants.md:1008-1017` expired-session-unsaved-progress ·
  `foundations/invariants.md:1028-1037` saved-state-http-exchange ·
  `foundations/invariants.md:1228-1237` uncaught-failure-game-state ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — timers and one request in flight against D-207 and D-208: reasoning about time and state (raised by the orchestrator before the slice was dispatched)
- **Risk:** none
- **Checks:** the three cases written first and seen failing, then
  `npm test -- tests/view/game-saver.test.mjs` · `npm test -- tests/view/state-store.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/account-screen.test.mjs`
- **Depends on:** row 5 of Foundation entries

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:41-41`

```
17. Ukryta strona, zamknięcie karty włącznie, i rytm 30 s wysyłają stan gry także wtedy, gdy ostatni wysłany zapis się nie udał, więc zmiana, której zapis zawiódł, ma przy zamknięciu karty jeszcze jedną szansę; rytm 30 s nie dubluje zaplanowanego ponowienia po 5, 10, 20 i co 30 s — po porażce czeka jedno żądanie naraz: wysyłka w chwili zapisu z D-207 idzie od razu i zastępuje zaplanowane ponowienie, jak mówi D-208 („…and at once at a moment of saving of D-207”). D-207 dostaje w zdaniu o rytmie i ukrytej stronie dopisek „or where the save last sent failed” (pytanie 6; loop2#043-1).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:74-78`

```
- Po nieudanym zapisie ukryta strona nic nie wysyła, bo stan nieudanego zapisu liczy się jako „ostatnio wysłany”, więc zamknięcie karty przed udanym ponowieniem gubi zmianę: wysyłać także po nieudanym zapisie czy zapisać w D-207 przyjęty koszt?
  - Answer: ukryta strona i rytm 30 s wysyłają stan także wtedy, gdy ostatni zapis się nie udał; brzmienie D-207 nie rusza reszty zdania; rytm 30 s nie dubluje zaplanowanego ponowienia — po porażce w kolejce stoi jedno żądanie naraz.
  - Not chosen:
    - zostawić, a D-207 dopisuje przyjęty koszt utraty zmiany po zamknięciu karty przed udanym ponowieniem — jedno zdanie bez zmiany kodu, a gracz przy chwilowej awarii serwera traci ostatnią zmianę.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — ukryta strona i rytm 30 s wysyłają stan także wtedy, gdy ostatni zapis się nie udał; D-207 dostaje „changed since the save that last succeeded” (albo dopisek o nieudanym zapisie — wybierz brzmienie, które nie rusza reszty zdania). Powód: chodzi o utratę postępu gracza, a ostatnia wysyłka przy zamknięciu istnieje właśnie na ten przypadek; koszt kilka linii. Dopisz w To do warunek dla cyklu: rytm 30 s nie może dublować zaplanowanego ponowienia (5/10/20/30 s) — po porażce w kolejce stoi jedno żądanie naraz.”
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:200-200`

```
| 5 | Rytm 30 s i ukryta strona wysyłają stan także wtedy, gdy ostatni wysłany zapis się nie udał. | sentence of D-207 | pytanie 6 | czy wysyłać po nieudanym zapisie, czy zapisać w D-207 przyjęty koszt utraty zmiany |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:3714-3794` D-207
- `foundations/decisions.md:3795-3822` D-208
- `foundations/decisions.md:2855-2879` D-97
- `foundations/decisions.md:3823-3869` D-209
- `foundations/decisions.md:3905-3946` D-211
- `foundations/decisions.md:4481-4495` D-323

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
