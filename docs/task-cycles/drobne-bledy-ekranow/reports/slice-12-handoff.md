# Handoff — slice 12, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `2b4fdc3af5af8e7980ae87bd845553dea333c8f2`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 12** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-12-report.md`.
- Your directory for working copies: `.runs/slice-12/`.
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

This slice holds a judgment in the running game (your section says which): start the game locally by `.claude/skills/loop2-play/SKILL.md`, look at the table at a page area of 1280 x 720 px, and decide as the section and the task's passages say. A screenshot you show is placed as D-418 and D-419 settle (the repository of screenshots, as an earlier slice did) and its address goes in the report; where you narrow the table, say what you tried and what the table looks like after. Before you commit run `npx eslint` on every changed `.ts`/`.tsx` file and `npx prettier --check` on every changed file and make both exit 0; keep your check logs in your directory and move the ones worth keeping into `reports/` with a name starting `slice-12-` before you remove the directory.

## Your section of the plan, word for word

### Slice 12 — the line of a hovered tile only at a revealed tile, and the table of tiles at 1280 × 720

- **Goal:** Hovering a tile of the drawing of the game map that is not revealed draws no line in
  `link-highlight` and marks no row: the line stands only at a revealed tile, which has a row in the
  table of revealed tiles (To do 1; D-41, D-19); the line under the drawing already counts a hovered
  unrevealed tile as none (`tile-list.ts`). In the game running locally at a page area of
  1280 × 720 px (D-396), look at the table of revealed tiles under „Teren” with many revealed tiles
  and long texts, a burning stick (D-385) among them: it fits its area whole, with no horizontal
  scroll; where it does not, narrow its gaps and columns in its rules (`tile-list`), which stay in
  `src/browser/styles.css` (D-421). Where narrowing is not enough without harm to reading — names
  cut off — the table stays scrolled with a visible bar, and the report says so with what was tried,
  for the request (To do 11 and the answer to its question). The report says which held, with a
  screenshot of the table placed as D-418 gives.
- **Change:** `src/browser/view/terrain-drawing.tsx` · `src/browser/view/tile-table.tsx` ·
  `src/browser/styles.css` · `tests/view/world-area.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:25-25` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:35-35` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:138-142` Questions to settle ·
  `foundations/decisions.md:9722-9764` D-19 · `foundations/decisions.md:4668-4682` D-41 ·
  `foundations/decisions.md:9843-9971` D-311 · `foundations/decisions.md:10329-10347` D-385 ·
  `foundations/decisions.md:5122-5136` D-396 · `foundations/decisions.md:4551-4565` D-421 ·
  `foundations/decisions.md:4698-4712` D-43 ·
  `foundations/invariants.md:354-363` terrain-drawing-numbers ·
  `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `src/browser/view/tile-list.ts:85-116` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1510-1524` D-418 ·
  `foundations/decisions.md:1525-1539` D-419 · `foundations/decisions.md:1540-1554` D-420
- **Model:** same — looks at the table in a real browser and judges whether narrowing harms reading; a visual judgment a `cheaper` executor does not make reliably (added in the plan's review)
- **Risk:** none
- **Checks:** the case of a hovered unrevealed tile with no line written first and seen failing, then
  `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/tile-list.test.mjs` ·
  `npm test -- tests/view/terrain-picture.test.mjs` ·
  `npm test -- tests/invariants/test_terrain_drawing_numbers.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` · the table looked at in a real
  browser at 1280 × 720 by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 2 · Slice 5

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:25-25`

```
1. Najechanie kursorem na nieodkryty kafelek rysunku mapy nie rysuje linii powiązania (`link-highlight`); linia stoi tylko przy kafelku odkrytym, który ma wiersz w tabeli odkrytych kafelków (D-41; uwaga loop2#021-1).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:35-35`

```
11. Tabela odkrytych kafelków pod „Teren” mieści się w swoim obszarze przy oknie 1280 × 720 cała, bez przewijania w poziomie; cykl ogląda ją w przeglądarce i, jeśli nie mieści się, zwęża odstępy i kolumny. Gdy zwężenie nie wystarcza bez szkody dla czytelności (np. ucinania nazw), tabela zostaje przewijana z widocznym paskiem, a cykl opisuje to w prośbie o scalenie (pytanie 18; D-396; loop2#66-5).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:138-142`

```
- Tabela odkrytych kafelków już przewija się w poziomie, gdy jest szersza od obszaru, a uwaga loop2#66-5 zgłosiła ją jako uciętą: czy „mieści się” znaczy „cała bez przewijania”, czy przewijanie wystarcza?
  - Answer: cała tabela widoczna bez przewijania w poziomie przy 1280 × 720; gdy zwężenie odstępów i kolumn nie wystarcza bez szkody dla czytelności (np. ucinania nazw), zostaje przewijanie z widocznym paskiem, opisane w prośbie o scalenie.
  - Not chosen:
    - przewijanie w poziomie wystarcza — punkt 11 nic nie zmienia, o ile pasek jest widoczny.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „3 a — cała tabela widoczna bez przewijania w poziomie przy 1280 × 720; warunek dla cyklu: jeśli zwężenie odstępów i kolumn nie wystarcza bez łamania czytelności (np. ucinania nazw), cykl zostawia przewijanie z widocznym paskiem i opisuje to w prośbie o scalenie, zamiast ściskać na siłę.”
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:9793-9835` D-19
- `foundations/decisions.md:4705-4719` D-41
- `foundations/decisions.md:9914-10042` D-311
- `foundations/decisions.md:10400-10418` D-385
- `foundations/decisions.md:5159-5173` D-396
- `foundations/decisions.md:4588-4602` D-421
- `foundations/decisions.md:4735-4749` D-43
- `foundations/decisions.md:1455-1520` D-417
- `foundations/decisions.md:1521-1535` D-418
- `foundations/decisions.md:1536-1550` D-419
- `foundations/decisions.md:1551-1565` D-420

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
