# Handoff — slice 2, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `13ac5dd95e6924a82b212bcb268dc1bb49541127`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 2** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-2-report.md`.
- Your directory for working copies: `.runs/slice-2/`.
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

### Slice 2 — the pick cell: icon at the first line, no highlight when greyed, tab index from a property

- **Goal:** In a cell of the rule panel's pick the action's icon stands beside the first line of
  the name also where a long name („Wytwórz — ognisko”) breaks into two lines (To do 8). A greyed
  cell takes no `highlight` under the pointer, and its dashed frame stays in `text-disabled`, as row
  12 of the plan's Foundation entries puts it in the styleguide (To do 9). The shared pick cell
  (`ReactPickCell`) takes its `tabIndex` from a property, which the rule panel sets — 0 on the cell
  the keyboard stands on, −1 on the others — in place of the layout effect of `rule-panel.tsx` that
  sets it on the elements after every commit (To do 13, its first part; rule „Efekty” of
  `guidelines/coding-browser-module.md`). The look of the pick cell stays in
  `src/browser/styles.css` (D-265); `tests/view/shared-controls.test.mjs` gets the case of the new
  property in the same change, as the rule „Wspólna kontrolka w jednej postaci” asks; the keyboard's
  moves in the grid stay as D-306 gives them. Look at the panel in the game running locally at
  1280 × 720: a name in two lines with its icon, and a greyed cell under the pointer.
- **Change:** `src/browser/view/controls/react-pick-cell.tsx` · `src/browser/view/rule-panel.tsx` ·
  `src/browser/styles.css` · `tests/view/shared-controls.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:32-33` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:37-37` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:207-207` Settlements to record ·
  row 12 of the plan's Foundation entries ·
  `foundations/decisions.md:9062-9102` D-289 · `foundations/decisions.md:9103-9125` D-290 ·
  `foundations/decisions.md:9126-9159` D-291 · `foundations/decisions.md:9199-9233` D-306 ·
  `foundations/decisions.md:4713-4727` D-44 · `foundations/decisions.md:4698-4712` D-43 ·
  `foundations/decisions.md:4653-4667` D-40 · `foundations/decisions.md:4758-4772` D-47 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4156-4184` D-267 ·
  `foundations/decisions.md:4551-4565` D-421 ·
  `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:468-477` browser-view-focus-outline ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1510-1524` D-418 ·
  `foundations/decisions.md:1525-1539` D-419 · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** the case of the property in `tests/view/shared-controls.test.mjs` written first and
  seen failing, then `npm test -- tests/view/shared-controls.test.mjs` ·
  `npm test -- tests/view/rule-editor.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` · the look in a real browser by
  `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** row 12 of Foundation entries

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:32-33`

```
8. W komórce wyboru panelu reguły ikona stoi przy pierwszej linii nazwy także wtedy, gdy długa nazwa („Wytwórz — ognisko”) łamie się w dwie linie (loop2#056-5).
9. Wyszarzona komórka wyboru nie podświetla się pod kursorem, a styleguide widoku nazywa kolor jej przerywanej ramki: `text-disabled` (loop2#056-6).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:37-37`

```
13. Porządek w kodzie widoku: komórki wyboru panelu reguły dostają `tabIndex` z właściwości, nie z efektu (`guidelines/coding-browser-module.md`, sekcja „Efekty”; loop2#056-7); z modułu edytora programu znikają typy celów fokusu i komentarze starego edytora DOM (loop2#056-12); ze spisu podziękowań znikają sprawdzenia `icon === undefined` i `iconTitle === undefined`, których dane nie dopuszczają (loop2#056-15); test „a loaded map run comes back paused, …” w `tests/view/scene-picture.test.mjs`, dziś kopia testu pauzy tuż przed nim, naprawdę wczytuje zapis (`loadSavedGame`) i sprawdza, że scena stoi jak w pauzie (pytanie 19; loop2#059-9).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:207-207`

```
| 12 | Wyszarzona komórka wyboru panelu reguły nie podświetla się pod kursorem, a jej przerywana ramka stoi w `text-disabled`. | guidelines: styleguide | punkt 9 *To do*, przyjęty w pytaniu 2 („tabela A w całości”); przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | kolor ramki wyszarzonej komórki i czy ma stan pod kursorem |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:9121-9161` D-289
- `foundations/decisions.md:9162-9184` D-290
- `foundations/decisions.md:9185-9218` D-291
- `foundations/decisions.md:9258-9304` D-306
- `foundations/decisions.md:4750-4764` D-44
- `foundations/decisions.md:4735-4749` D-43
- `foundations/decisions.md:4690-4704` D-40
- `foundations/decisions.md:4795-4809` D-47
- `foundations/decisions.md:4133-4180` D-265
- `foundations/decisions.md:4181-4209` D-267
- `foundations/decisions.md:4588-4602` D-421
- `foundations/decisions.md:1455-1520` D-417
- `foundations/decisions.md:1521-1535` D-418
- `foundations/decisions.md:1536-1550` D-419
- `foundations/decisions.md:1551-1565` D-420

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
