# Handoff 03-slice1 — executor of slice 1 (class same)

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator of `implement-task`; its go-ahead is provisional and never the human's approval. You never ask the human; questions go to the orchestrator in your report.

## Where you work
- Worktree (work from its root): `the worktree's root`, branch `task/proporcje-sceny-i-programu`. Base of this slice: `189d589fdcc59dd01366095e6fd5d152bc3bc471 (head after the foundation step; the review range of slice 1 starts earlier, at 01b26d54d1fea63de8570ca854814ff8e564048c, so it covers the foundation entries)`. You are the only agent writing in this worktree.
- Shell: Windows 11; Git Bash and PowerShell. Commit with `git add <path> …` by explicit paths, never `git add -A`, `git add .` or `git commit -a`; commit messages in English in the style of the repository's log (`feat: :sparkles: …`, `refactor: :recycle: …`, `test: :white_check_mark: …`, `docs: :memo: …`); end each message with the line `Co-Authored-By: Claude <noreply@anthropic.com>`; use `git commit -F <file>` when the message holds quotes. Do not push. Commit your work before you return.
- Before writing any script (even a one-off `python -c`), read `the author's global rule file on writing scripts` (line endings, console encoding, backslashes in Python literals).
- Do not run `npm test` without an argument (the full gate is the orchestrator's run). Run your slice's *Checks* one by one; `npm test -- <one test file>` runs one file.

## Method and stage
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole. Your variant: **a slice, or the retry of a slice** — read `.the-way/task-cycle/change/slice.md`; because the slice alters what a screen shows (where it does), read `.the-way/task-cycle/change/ui_check.md` before you finish.
- Stage and boundary: make slice 1 of the plan and nothing more; you never dispatch a subagent. A foundation entry is already written (commit `189d589` and the commits before this base); read the entries below as they stand. You write no foundation entry; if a sentence of an entry is wrong for the code, say so in the report.
- Full report path: `docs/task-cycles/proporcje-sceny-i-programu/reports/03-slice1-report.md` (report form of `make-change` section 6). Return only the status, the commits, a one-line check result naming what failed or did not run, and the report path.
- Your section of the plan is copied below word for word. You open neither the whole plan nor the whole task; the passages your *Read* names are copied after it.
- For the browser checks, the project skill `loop2-play` is `.claude/skills/loop2-play/SKILL.md`.

## Your slice (copied from `plan.md`, word for word)

### Slice 1 — The rule list draws the rule panel under the row or header it changes

- **Goal:** Where the program panel is given no host for its rule panel, an open rule's panel stands
  in the rule list itself: directly under the row of the rule it changes, or directly under the
  header of the rule group it changes; when the open rule sits in a folded group, whose row is not
  drawn, the panel stands under that group's header. The list takes the panel as an optional prop it
  draws, so a click, a key or a drag inside the panel reaches no handler of the row (the panel is not
  inside the row's own list item). The layout that put the panel beside the rows
  (`program-editor-layout.with-panel`, `program-rule-panel`) and its styles go; the new place is
  styled with tokens only. What stays as it is: the panel takes the focus when it opens, „✕” and
  Escape close it and give the focus back to the row or header, opening another rule moves the panel
  to that rule, and the hosted path (`placeRulePanel`) works as before, because slices 2 and 4 still
  use it. Tests first, failing before the change: in `tests/view/rule-editor.test.mjs` a list given
  a panel draws it right after the open row, right after the open header, and after the header of a
  folded group holding the open rule, and never inside the row's item; in
  `tests/view/program-panel.test.mjs` the case that expects the panel beside the rows (both modes)
  expects it under the row or header instead.
- **Change:** `src/browser/view/rule-list.tsx` · `src/browser/view/program-panel.tsx` · `src/browser/styles.css` · `tests/view/rule-editor.test.mjs` · `tests/view/program-panel.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:44-51` Pytanie 1
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:58-62` Pytanie 3
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-122` Settlements to record
  · `foundations/decisions.md:6159-6194` D-288 · `foundations/decisions.md:6538-6565` D-306 · `foundations/decisions.md:6360-6378` D-296 · `foundations/decisions.md:6343-6359` D-295 · `foundations/decisions.md:6021-6046` D-282 · `foundations/decisions.md:6696-6750` D-311 · `foundations/decisions.md:912-926` D-43 · `foundations/decisions.md:7310-7344` D-336
  · Foundation entry Row 1
  · `foundations/part_map.md:3-28` browser-view
  · `foundations/glossary.md:53-57` program rule · `foundations/glossary.md:59-63` rule group
  · `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:459-468` browser-view-token-values · `foundations/invariants.md:469-478` browser-view-focus-outline
  · `src/browser/view/rule-panel.tsx` · `tests/view/page-document.mjs`
- **Model:** same — focus, keyboard and drag behaviour inside a 700-line shared list and an 850-line panel, with tests in two large files; the design is settled here, but the edge cases (folded group, opening another rule) need judgment a cheaper class tends to miss.
- **Risk:** none
- **Checks:** `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/rule-signs.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm run typecheck` · `npx eslint --max-warnings 0 src/browser/view/rule-list.tsx src/browser/view/program-panel.tsx` · `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/rule-list.tsx src/browser/view/program-panel.tsx src/browser/styles.css tests/view/rule-editor.test.mjs tests/view/program-panel.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py`; no check in a browser here: both screens still give the panel a host, so the player sees the new place only after slices 2 and 4, which carry that check
- **Depends on:** Foundation entry Row 1

## Foundation entries of your *Read* — current ranges in the worktree (these hold where the plan's ranges differ)

Read each whole, from its heading to the next `###`:

- `foundations/decisions.md:6161-6210` D-288
- `foundations/decisions.md:6554-6581` D-306
- `foundations/decisions.md:6376-6394` D-296
- `foundations/decisions.md:6359-6375` D-295
- `foundations/decisions.md:6022-6048` D-282
- `foundations/decisions.md:6712-6784` D-311
- `foundations/decisions.md:913-927` D-43
- `foundations/decisions.md:7344-7378` D-336
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

#### `docs/task-cycles/proporcje-sceny-i-programu/task.md:44-51` Pytanie 1

```
- Pytanie 1. Jaki rozmiar ma scena na ekranie przejścia i czy zmienia się coś poza nim w podziale szerokości trzech obszarów?
  - Answer: D — scena zostaje 672 × 304, panel reguły otwiera się w miejscu na liście reguł, jak w starym Loop w węższym oknie, a kolumny programu i prawego obszaru łączą się w jedną; program ma wtedy 526 px w oknie 1280 px i 622 px przy treści 1344 px (rachunek: obszar świata 706 px, odstęp 16 px). Ta sama edycja w miejscu na liście służy też późniejszemu układowi na telefon.
  - Not chosen:
    - A. Scena 336 × 152, reszta podziału bez zmian (program 510 px w oknie 1280 px, 606 px przy treści 1344 px) — „A teraz to też jest zadanie, które nie rozwiązuje tego co chcę rozwiązać”.
    - B. Scena zostaje 672 × 304, nic się nie zmienia — program zostaje przy 174 px w oknie 1280 px i 270 px przy treści 1344 px, a każda nowa treść przy regule zawija się dalej.
    - C. Scena 3/4 albo 4/5 obecnej wielkości i treść szersza niż 1344 px, z prawą kolumną zawijaną pod świat w węższym oknie — pikselowy obraz przy skali 1,5 albo 1,6 ma nierówne piksele, a mag „drga” w ruchu; w oknie 1280 px przy trzech kolumnach program ma 342 px; zmienia limit szerokości treści z D-280; po zawinięciu panel reguły otwiera się pod całym obszarem świata.
    - Duża scena tylko w szerokim oknie, mała w węższym — pominięta w porównaniu: treść ma najwyżej 1344 px, więc przy dużej scenie program nigdy nie ma więcej niż 270 px i wariant i tak kończy się małą sceną.
  - Source: Mariusz, 2026-11-08, „D na teraz”, odpowiedź na porównanie dróg A, C i D w tej rozmowie; drogę D zaproponował Mariusz: „edycja reguł w widoku mobilnym jest mocno średnia i ostatecznie i tak trzeba ją zrealizować tak jak w oryginalnym loop w miejscu na liście - jeśli by to zastosować uniwersalnie dla widoku mobilnego i desktopowego to nie musimy zmniejszać sceny, tylko zmergować 2 i 3 kolumnę”. Stary Loop otwiera edycję pod wierszem reguły, dopóki ekran przejścia nie ma trzech kolumn, a na Programach — dwóch (`the original Loop repository, src/components/probe/RulesPanel.tsx:682-683`, cdc7c0d).
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
