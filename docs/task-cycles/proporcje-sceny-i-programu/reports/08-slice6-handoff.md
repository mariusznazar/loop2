# Handoff 08-slice6 — executor of slice 6 (class cheaper)

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator of `implement-task`; its go-ahead is provisional and never the human's approval. You never ask the human; questions go to the orchestrator in your report.

## Where you work
- Worktree (work from its root): `the worktree's root`, branch `task/proporcje-sceny-i-programu`. Base of this slice: `df84a1d1c97c27d56e07a453525936e31946058f (head after slice 5)`. You are the only agent writing in this worktree.
- Shell: Windows 11; Git Bash and PowerShell. Commit with `git add <path> …` by explicit paths, never `git add -A`, `git add .` or `git commit -a`; commit messages in English in the style of the repository's log (`feat: :sparkles: …`, `refactor: :recycle: …`, `test: :white_check_mark: …`, `docs: :memo: …`); end each message with the line `Co-Authored-By: Claude <noreply@anthropic.com>`; use `git commit -F <file>` when the message holds quotes. Do not push. Commit your work before you return.
- Before writing any script (even a one-off `python -c`), read `the author's global rule file on writing scripts` (line endings, console encoding, backslashes in Python literals).
- Do not run `npm test` without an argument (the full gate is the orchestrator's run). Run your slice's *Checks* one by one; `npm test -- <one test file>` runs one file.

## Method and stage
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole. Your variant: **a slice, or the retry of a slice** — read `.the-way/task-cycle/change/slice.md`; because the slice alters what a screen shows (where it does), read `.the-way/task-cycle/change/ui_check.md` before you finish.
- Stage and boundary: make slice 6 of the plan and nothing more; you never dispatch a subagent. A foundation entry is already written (commit `189d589` and the commits before this base); read the entries below as they stand. You write no foundation entry; if a sentence of an entry is wrong for the code, say so in the report.
- Full report path: `docs/task-cycles/proporcje-sceny-i-programu/reports/08-slice6-report.md` (report form of `make-change` section 6). Return only the status, the commits, a one-line check result naming what failed or did not run, and the report path.
- Your section of the plan is copied below word for word. You open neither the whole plan nor the whole task; the passages your *Read* names are copied after it.
- Slices 1–5 are made (commits a5aa424, 6ee2e7f, f9a5b86, d737a1a, df84a1d). Read `guidelines/styleguide-browser-view.md` whole first: it is the file you change, and it is written in Polish; write your sentences in Polish, in the file's style, with the exact lines of your *Goal* as the places to start. The slice's code is made: `src/browser/view/right-area.tsx` still holds the tabs component (`RightArea`), its area now stands under the world on the left, the rule panel opens under its row or header in the program, and the scene has one size (672 × 304). Roles, values and tokens do not change. Your checks are the two in your *Check* list; run the foundation check as written (exit code recorded). No browser check is required.

## Your slice (copied from `plan.md`, word for word)

### Slice 6 — The styleguide speaks of the new layout and the one scene size

- **Goal:** `guidelines/styleguide-browser-view.md` says in the new layout's words what it says in the
  old one's, in the places the task names and in any other that says the same: the paragraph that
  keeps the scene's exceptions and says the badge icon's size stands "przy każdej skali"
  (`guidelines/styleguide-browser-view.md:124-133`), the line that says the progress bar has a
  thickness that is doubled "przy skali 2" (`:596-597`), the rule on tabs that names "dwa przyciski
  „Kronika” i „Teren” nad prawym obszarem ekranu przejścia, gdy nie stoi w nim otwarty edytor
  reguły" (`:399-402`), and the opening of the rule on the chronicle that names the right area of
  the screen of a map run (`:626-628`). The scene has one size, so the text no longer speaks of
  scales; the tabs stand in the area under the world and an open rule panel does not take their
  place; the chronicle rule says where the chronicle stands in the new words. Roles, values and
  decisions cited stay as the foundation steps left them; no new role, colour or value enters. The
  sentence at `:646` that names `src/browser/view/right-area.tsx` stays true (the module keeps its
  name). Search the file for every other place that speaks of a right area of the screen of a map
  run, of a rule panel beside the rows or of a scale, and change those too; leave the Mapy
  rule's "po prawej" and the spacing scale ("skala odstępów") alone.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-122` Settlements to record
  · `foundations/decisions.md:6696-6750` D-311 · `foundations/decisions.md:7537-7570` D-343 · `foundations/decisions.md:6159-6194` D-288 · `foundations/decisions.md:6021-6046` D-282 · `foundations/decisions.md:912-926` D-43
  · Foundation entries Row 1, Row 2 and Row 3
  · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` (reports 0 errors at the base) · `grep -n -i "prawy obszar\|prawego obszaru\|prawym obszarem\|skali\|skal[aęi] [12]" guidelines/styleguide-browser-view.md` shows no line about the screen of a map run or the scene (the spacing scale „skali odstępów" is not one)
- **Depends on:** Slice 5 · Foundation entries Row 1, Row 2 and Row 3

## Foundation entries of your *Read* — current ranges in the worktree (these hold where the plan's ranges differ)

Read each whole, from its heading to the next `###`:

- `foundations/decisions.md:6712-6784` D-311
- `foundations/decisions.md:7572-7605` D-343
- `foundations/decisions.md:6161-6210` D-288
- `foundations/decisions.md:6022-6048` D-282
- `foundations/decisions.md:913-927` D-43
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
