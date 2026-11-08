# Handoff 04-slice2 — executor of slice 2 (class cheaper)

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator of `implement-task`; its go-ahead is provisional and never the human's approval. You never ask the human; questions go to the orchestrator in your report.

## Where you work
- Worktree (work from its root): `the worktree's root`, branch `task/proporcje-sceny-i-programu`. Base of this slice: `a5aa4248e0ec01c2fe55c90fb9d1ae295559a53f (head after slice 1)`. You are the only agent writing in this worktree.
- Shell: Windows 11; Git Bash and PowerShell. Commit with `git add <path> …` by explicit paths, never `git add -A`, `git add .` or `git commit -a`; commit messages in English in the style of the repository's log (`feat: :sparkles: …`, `refactor: :recycle: …`, `test: :white_check_mark: …`, `docs: :memo: …`); end each message with the line `Co-Authored-By: Claude <noreply@anthropic.com>`; use `git commit -F <file>` when the message holds quotes. Do not push. Commit your work before you return.
- Before writing any script (even a one-off `python -c`), read `the author's global rule file on writing scripts` (line endings, console encoding, backslashes in Python literals).
- Do not run `npm test` without an argument (the full gate is the orchestrator's run). Run your slice's *Checks* one by one; `npm test -- <one test file>` runs one file.

## Method and stage
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole. Your variant: **a slice, or the retry of a slice** — read `.the-way/task-cycle/change/slice.md`; because the slice alters what a screen shows (where it does), read `.the-way/task-cycle/change/ui_check.md` before you finish.
- Stage and boundary: make slice 2 of the plan and nothing more; you never dispatch a subagent. A foundation entry is already written (commit `189d589` and the commits before this base); read the entries below as they stand. You write no foundation entry; if a sentence of an entry is wrong for the code, say so in the report.
- Full report path: `docs/task-cycles/proporcje-sceny-i-programu/reports/04-slice2-report.md` (report form of `make-change` section 6). Return only the status, the commits, a one-line check result naming what failed or did not run, and the report path.
- Your section of the plan is copied below word for word. You open neither the whole plan nor the whole task; the passages your *Read* names are copied after it.
- Slice 1 (commit a5aa424) made the rule list draw the rule panel under its row or header when the program panel is given no host. Your slice makes Programy give it none. For the browser check use the project skill `loop2-play` (`.claude/skills/loop2-play/SKILL.md`); read it whole before you start, and stop the game and any browser you started when you finish. If the real-browser check cannot be done in this environment, say exactly why in the report and mark that check unperformed; do not claim it.

## Your slice (copied from `plan.md`, word for word)

### Slice 2 — Programy keeps two columns and opens the panel in the editor

- **Goal:** On Programy an open rule or group no longer adds a third area: the screen holds the list
  of programs and the program panel, and the panel's rule panel stands under its row or header, by
  the path slice 1 made. `game-view.ts` no longer builds the area for the rule panel or gives the
  program panel of Programy a host, the toggling of the screen's class for an open panel goes, and
  the stylesheet's rules for three areas, for the window under 1100 px that set the panel under the
  editor, and for the empty area of the panel go with the code that needed them; the comments of the
  stylesheet and of `game-view.ts` that describe three areas are rewritten. Test first, failing
  before the change: the case of `tests/view/account-screen.test.mjs` that expects the list, the
  editor and the panel as three areas (the case that opens a rule on Programy and looks for the area
  of the panel, near line 4285) expects two areas while a rule is open, no area for the panel, and
  the panel inside the program panel directly under the header or row opened; leave the other cases
  of the file, among them the one that cites the invariant `saved-program-edit`, as they are.
- **Change:** `src/browser/view/game-view.ts` · `src/browser/styles.css` · `tests/view/account-screen.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:58-62` Pytanie 3
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-122` Settlements to record
  · `foundations/decisions.md:6159-6194` D-288 · `foundations/decisions.md:6021-6046` D-282 · `foundations/decisions.md:912-926` D-43 · `foundations/decisions.md:6538-6565` D-306 · `foundations/decisions.md:6343-6359` D-295
  · Foundation entry Row 1
  · `foundations/part_map.md:3-28` browser-view
  · `foundations/invariants.md:459-468` browser-view-token-values · `foundations/invariants.md:469-478` browser-view-focus-outline · `foundations/invariants.md:839-848` saved-program-edit
  · `src/browser/view/program-panel.tsx` · `tests/view/page-document.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` · `npm run typecheck` · `npx eslint --max-warnings 0 src/browser/view/game-view.ts` · `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/game-view.ts src/browser/styles.css tests/view/account-screen.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py`; manual state check by `loop2-play`: on `#/programy` in a window 1280 px wide open a rule and a group header and see the panel under the row or header with the list of programs and the editor still the only two columns, then fold the group holding the open rule
- **Depends on:** Slice 1 · Foundation entry Row 1

## Foundation entries of your *Read* — current ranges in the worktree (these hold where the plan's ranges differ)

Read each whole, from its heading to the next `###`:

- `foundations/decisions.md:6161-6210` D-288
- `foundations/decisions.md:6022-6048` D-282
- `foundations/decisions.md:913-927` D-43
- `foundations/decisions.md:6554-6581` D-306
- `foundations/decisions.md:6359-6375` D-295
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

#### `docs/task-cycles/proporcje-sceny-i-programu/task.md:58-62` Pytanie 3

```
- Pytanie 3. Czy panel reguły w miejscu na liście obowiązuje też na ekranie Programy, gdzie dziś otwarta reguła daje trzy kolumny obok siebie — listę programów, edytor i panel — a w oknie węższym niż 1100 px panel stoi pod całym edytorem (`src/browser/styles.css:215-231`, 6f36c7a)?
  - Answer: P1 — tak, wszędzie: na Programach zostają dwie kolumny, lista programów i edytor, a panel otwiera się pod wierszem reguły albo grupy, tak samo jak na ekranie przejścia. Przyjęty koszt: na Programach szerokości dziś nie brakuje, więc ta część jest robotą bez zysku szerokości tam, a zmienia też układ Programów z D-282.
  - Not chosen:
    - P2. Na Programach panel zostaje obok edytora — edytor ma dwa sposoby otwierania panelu zależnie od ekranu, gracz widzi tę samą regułę edytowaną raz obok, raz na liście, a w wąskim oknie Programów panel dalej ląduje pod całym edytorem.
  - Source: Mariusz, 2026-11-08, „P1”, odpowiedź na pytanie z drogami P1 i P2 w tej rozmowie, z rekomendacją P1; D-288: „One program editor stands on Programy and on the screen of a map run.”
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
