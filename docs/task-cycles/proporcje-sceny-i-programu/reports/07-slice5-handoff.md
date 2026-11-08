# Handoff 07-slice5 — executor of slice 5 (class cheaper)

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator of `implement-task`; its go-ahead is provisional and never the human's approval. You never ask the human; questions go to the orchestrator in your report.

## Where you work
- Worktree (work from its root): `the worktree's root`, branch `task/proporcje-sceny-i-programu`. Base of this slice: `d737a1aed75e2b5ecf244a8c3ba0f303f87219fc (head after slice 4)`. You are the only agent writing in this worktree.
- Shell: Windows 11; Git Bash and PowerShell. Commit with `git add <path> …` by explicit paths, never `git add -A`, `git add .` or `git commit -a`; commit messages in English in the style of the repository's log (`feat: :sparkles: …`, `refactor: :recycle: …`, `test: :white_check_mark: …`, `docs: :memo: …`); end each message with the line `Co-Authored-By: Claude <noreply@anthropic.com>`; use `git commit -F <file>` when the message holds quotes. Do not push. Commit your work before you return.
- Before writing any script (even a one-off `python -c`), read `the author's global rule file on writing scripts` (line endings, console encoding, backslashes in Python literals).
- Do not run `npm test` without an argument (the full gate is the orchestrator's run). Run your slice's *Checks* one by one; `npm test -- <one test file>` runs one file.

## Method and stage
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole. Your variant: **a slice, or the retry of a slice** — read `.the-way/task-cycle/change/slice.md`; because the slice alters what a screen shows (where it does), read `.the-way/task-cycle/change/ui_check.md` before you finish.
- Stage and boundary: make slice 5 of the plan and nothing more; you never dispatch a subagent. A foundation entry is already written (commit `189d589` and the commits before this base); read the entries below as they stand. You write no foundation entry; if a sentence of an entry is wrong for the code, say so in the report.
- Full report path: `docs/task-cycles/proporcje-sceny-i-programu/reports/07-slice5-report.md` (report form of `make-change` section 6). Return only the status, the commits, a one-line check result naming what failed or did not run, and the report path.
- Your section of the plan is copied below word for word. You open neither the whole plan nor the whole task; the passages your *Read* names are copied after it.
- Slices 1–4 are made (commits a5aa424, 6ee2e7f, f9a5b86, d737a1a). The executors of slices 3 and 4 listed what they left behind; check each against the code and change what your *Change* list covers (information, not a list that replaces your own search by the commands of your *Checks*): `ProgramPanel.placeRulePanel`, its `ruleHost` prop, `onRuleOpen` and the portal in `program-panel.tsx` have no caller left but `tests/view/program-panel.test.mjs` (the case around line 977 that tests the host) and the stubs in `tests/view/scene.test.mjs` (around lines 428 and 745); stale wording: `chronicle.ts:21` and `tile-table.tsx:4` and `world-area.tsx:52` ("right area"), `scene.tsx:7-8` ("right at either scale"), `tests/view/scene.test.mjs` around lines 79 and 168 ("scale 2", "either scale"), `program-panel.tsx:334` ("beside the rows"), the header comment of `rule-panel.tsx` ("It stands beside the rule list"), `tests/view/world-area.test.mjs` around line 655 ("the right area"), the test names and comments of `tests/view/program-panel.test.mjs` around lines 297, 322, 977–994, 1059 ("beside the rows"). Keep the words of the screen Mapy (`maps-screen.tsx`, `tests/view/maps-screen.test.mjs`) and the three-area wording of `run-screen.tsx` and `run-screen.test.mjs`, which is true (three sections: world, program, tabs). Do not change `src/browser/styles.css` or the files of slices 1–4 other than those in your *Change* list.
- Your *Change* list now also holds `.claude/skills/loop2-play/SKILL.md` (the orchestrator added it after slice 4's report; see the last sentence of your *Goal*). That file is in the part `agent-workflow`; edit only the one step, in the style of the file.
- Read each file you change whole before you change it (`make-change` section 1); a file too long to read whole, read in parts that together cover it, and say so in the report. No real-browser check is required for this slice; if you run the game, stop it and close the browser when you finish.

## Your slice (copied from `plan.md`, word for word)

### Slice 5 — What the move leaves behind goes

- **Goal:** Nothing the move of the rule panel and of the tabs leaves behind remains. The host path
  of the program panel is gone: `placeRulePanel` from the panel's type and body, its host and its
  `onRuleOpen` callback, the portal into the host (`createPortal` and its import), the host's part in
  `commitEditor`;
  `git grep -n "placeRulePanel\|ruleHost\|createPortal" -- src tests` prints nothing. In the tests a
  case that tested only the host (the screen told of an open panel, a panel standing in a host) is
  deleted with its reason — the host no longer exists — and a case about what the player sees (the
  panel opens on the new rule, takes the focus, closes and gives the focus back) stays, rewritten for
  the panel under the row; the stubs of `placeRulePanel` in the fake panels of `tests/view/scene.test.mjs`
  go. No comment or test name of the changed files speaks of a rule panel beside the rows, of a
  right area of the screen of a map run, or of two scales of the scene (the screen Mapy has an area
  of its own on the right and keeps its words). The step of `.claude/skills/loop2-play/SKILL.md` section "Compose a game state" that says the rule panel "takes the place of the table of revealed tiles" (around line 134) says what the player sees now: the panel opens under the rule's row and the tabs stay as they were. (Added by the orchestrator after slice 4's report: the change made that sentence untrue.)
- **Change:** `src/browser/view/program-panel.tsx` · `src/browser/view/rule-panel.tsx` · `src/browser/view/scene.tsx` · `src/browser/view/chronicle.ts` · `src/browser/view/tile-table.tsx` · `src/browser/view/world-area.tsx` · `tests/view/program-panel.test.mjs` · `tests/view/scene.test.mjs` · `tests/view/world-area.test.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-122` Settlements to record
  · `foundations/decisions.md:6159-6194` D-288 · `foundations/decisions.md:6696-6750` D-311
  · Foundation entries Row 1 and Row 2
  · `foundations/part_map.md:3-28` browser-view
  · `foundations/invariants.md:459-468` browser-view-token-values
  · `tests/view/page-document.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/scene.test.mjs` · `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/rule-signs.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm run typecheck` · `npx eslint --max-warnings 0 src/browser/view/program-panel.tsx src/browser/view/rule-panel.tsx src/browser/view/scene.tsx src/browser/view/chronicle.ts src/browser/view/tile-table.tsx src/browser/view/world-area.tsx` · `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/program-panel.tsx src/browser/view/rule-panel.tsx src/browser/view/scene.tsx src/browser/view/chronicle.ts src/browser/view/tile-table.tsx src/browser/view/world-area.tsx tests/view/program-panel.test.mjs tests/view/scene.test.mjs tests/view/world-area.test.mjs` · `git grep -n "placeRulePanel\|ruleHost\|createPortal" -- src tests` prints nothing · `git grep -n -i "right area" -- src tests` prints only lines of the screen Mapy (`src/browser/view/maps-screen.tsx`, `tests/view/maps-screen.test.mjs`)
- **Depends on:** Slice 2 · Slice 4 · Foundation entries Row 1 and Row 2

## Foundation entries of your *Read* — current ranges in the worktree (these hold where the plan's ranges differ)

Read each whole, from its heading to the next `###`:

- `foundations/decisions.md:6161-6210` D-288
- `foundations/decisions.md:6712-6784` D-311
- `foundations/decisions.md:7767-7796` D-349 (new, written by the foundation step)

The other foundation ranges of the *Read* (`foundations/part_map.md`, `glossary.md`, `invariants.md`) are unchanged and as the plan gives them. Guideline files and code files of the *Read* are read whole.

## Passages of the frozen task named by your *Read* (word for word)

#### `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do

```
### To do

1. Na ekranie przejścia panel reguły albo grupy otwiera się w miejscu na liście, pod wierszem reguły albo grupy, którą zmienia, a kolumny programu i prawego obszaru łączą się w jedną kolumnę programu (pytanie 1).
2. W lewej kolumnie, pod rysunkiem mapy i linią kafelka, stoi obszar z zakładkami „Kronika” i „Teren”, z kroniką, jej filtrami i tabelą odsłoniętych kafelków, jak dziś w prawym obszarze; prawego obszaru już nie ma (pytania 2 i 5).
   - Wybór zakładki trzyma się jak dziś (D-346), a otwarty panel reguły nie zabiera już miejsca zakładkom.
   - W oknie za wąskim na dwie kolumny obszary stoją jeden pod drugim w dzisiejszej kolejności: świat, program, „Kronika” i „Teren” (D-282).
3. Na ekranie Programy otwarta reguła albo grupa nie dodaje trzeciej kolumny: panel otwiera się pod wierszem reguły albo grupy, tak jak na ekranie przejścia (pytanie 3).
4. Scena zostaje 672 × 304; kod, test i przewodnik stylu przestają trzymać drugi rozmiar, 336 × 152 (pytanie 1; dokument zadania 6, To do 6: „po uwadze Mariusza poprawka zostawia jeden z nich”, zapis cyklu ekran-przejscia, `docs/task-cycles/ekran-przejscia/task.md:42`, commit 2aae30a; `src/browser/view/world-area.tsx:33-37` i `src/browser/styles.css:262-268`, 01b26d5).
5. Przewodnik stylu mówi o nowym układzie tam, gdzie mówi o starym: o prawym obszarze przy kronice (`guidelines/styleguide-browser-view.md:626-628`) i o skali sceny (`guidelines/styleguide-browser-view.md:128-129`, `:596-597`), 01b26d5.
```

#### `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-122` Settlements to record

```
## Settlements to record

Candidates: 5 shown, 3 accepted — 2026-11-08

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Panel reguły albo grupy otwiera się w miejscu na liście, pod wierszem reguły albo grupy, którą zmienia — na ekranie przejścia i na Programach. | decision | pytania 1 i 3; pytanie kontrolne do drogi D, 2026-11-08, z kotwicą z notatki, od której zaczęło się zadanie: „Mariusz powiedział tylko, że proporcje sceny i programu mają wyglądać jak w starym Loop” — czy celem jest szeroki program, a nie sam stosunek sceny do programu, i D zostaje? Mariusz: „tak” | czy na Programach panel zostaje obok edytora i czy na liście otwiera się pod wierszem, czy nad listą |
| 2 | Ekran przejścia ma pod nagłówkiem dwie kolumny: po lewej świat, a pod rysunkiem mapy zakładki „Kronika” i „Teren”; po prawej program. | decision | pytania 1, 2 i 6; pytanie kontrolne jak w wierszu 1 | gdzie stanąć zakładkom po zniknięciu prawego obszaru: pod światem, pod programem czy nad nim |
| 3 | Scena ma jeden rozmiar, 672 × 304, dwukrotność swojego obrazu. | decision | pytanie 1 („nie musimy zmniejszać sceny”), To do 4; pytanie kontrolne jak w wierszu 1 | czy zostawić przełącznik dwóch skal; dla jakiego rozmiaru zadania 17–20 robią efekty sceny |
```
