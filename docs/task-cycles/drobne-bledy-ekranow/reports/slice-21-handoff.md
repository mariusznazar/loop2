# Handoff — slice 21, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `cf068a01135704578cf0ebf3d488dcac8799efd3`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 21** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-21-report.md`.
- Your directory for working copies: `.runs/slice-21/`.
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

### Slice 21 — the comments of the stylesheets

- **Goal:** The comment over the rule with `filter: grayscale(1) brightness(0.55)` — since loop2#145
  in `src/browser/run-screen.css` („A dead mage and an extinguished fire share one grey…”) — names
  the source of the value: accepted by Mariusz on 2026-11-16; the value, D-316 and D-322 stay (To do
  22; the task's settlement 10). The head comment of `src/browser/styles.css` no longer speaks of
  „the rules of each other screen” as if the screens under the exception of D-421 had no stylesheet
  of their own, and the seven comments of the stylesheets of the screens that say a rule stands
  „above” name the file the rule stands in now — the one `:focus-visible` rule and the columns of
  Programy and Mapy stand in `src/browser/styles.css` (D-421, D-47): two in
  `src/browser/maps-screen.css`, two in `src/browser/knowledge-screen.css`, one each in
  `src/browser/program-panel.css`, `src/browser/programs-screen.css` and `src/browser/run-screen.css`;
  find them by their content (To do 25). Comments only; no rule changes.
- **Change:** `src/browser/styles.css` · `src/browser/run-screen.css` · `src/browser/maps-screen.css` ·
  `src/browser/knowledge-screen.css` · `src/browser/program-panel.css` ·
  `src/browser/programs-screen.css`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:46-46` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:49-49` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:101-105` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:205-205` Settlements to record ·
  `foundations/decisions.md:4551-4565` D-421 · `foundations/decisions.md:4758-4772` D-47 ·
  `foundations/decisions.md:10767-10891` D-316 · `foundations/decisions.md:11108-11174` D-322 ·
  `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:468-477` browser-view-focus-outline ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/view/scene.test.mjs` · `npm test -- tests/view/rule-signs.test.mjs`
- **Depends on:** Slice 12

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Need: the player meets none of the reported faults of the screens | Slices 2–5, 8–20 |
| Need: decisions that drifted from the code say what the player is to get | rows 1, 2, 3, 4, 5, 6, 8, 9, 15, 17 of Foundation entries |
| To do 1 — no `link-highlight` at an unrevealed tile | Slice 12 |
| To do 2 — a long name breaks in the team row of Siedziba | Slice 13 · row 13 |
| To do 3 — the number with its unit in the row, beside the panel's field and in the wolf's sentence | Slices 1, 3, 4, 5 · row 16 |
| To do 4 — focus on the card after a refused emailed link and after „Anuluj”; D-381 | Slice 15 · row 17 |
| To do 5 — focus after „Zatrzymaj” stays at the character | Slice 14 · row 14 |
| To do 6 — „✕” gives focus to the folded group's header | Slice 8 · row 14 |
| To do 7 — each new copy unfolded | Slice 9 · row 15 |
| To do 8 — icon at the first line of a two-line name | Slice 2 |
| To do 9 — a greyed cell without highlight; its frame named `text-disabled` in the styleguide | Slice 2 · row 12 |
| To do 10 — a cut walk plays no second time | Slice 19 |
| To do 11 — the table of tiles at 1280 × 720 | Slice 12 |
| To do 12 — the practice of a run against the tree, fixed only against the rules | Slice 20 |
| To do 13 — `tabIndex` from a property | Slice 2 |
| To do 13 — no focus types and no comments of the DOM editor in the program editor's module | Slice 6 |
| To do 13 — no impossible checks in the credits | Slice 7 |
| To do 13 — the loaded paused run truly loaded | Slice 7 |
| To do 14 — D-297 says what the code does | row 1 |
| To do 15 — the panel follows its rule to another group; deletion closes it; D-306 and D-350 | Slice 8 · rows 2, 3 |
| To do 16 — D-04 names three more sources | row 4 |
| To do 17 — the rhythm and the hidden page after a failed save, one request at a time; D-207 | Slice 16 · row 5 |
| To do 18 — a click outside „Konto” leaves the focus where the player clicked; D-285 | Slice 17 · row 6 |
| To do 19 — the short and the full line of D-172 | Slice 10 · row 8 |
| To do 20 — the mage stops where it reached | Slice 18 |
| To do 21 — the chronicle's entry of a changed rule; D-342 | Slice 11 · row 9 |
| To do 22 — the source of the grey in its comment | Slice 21 · row 10 |
| To do 23 — the time bar settled in the styleguide | row 11 |
| To do 24 — the styleguide's sentence of „Konto” as D-285 | row 7 |
| To do 25 — the comments of the stylesheets after the split | Slice 21 |
| Settlement row 1 | row 1 of Foundation entries |
| Settlement row 2 | row 2 of Foundation entries; code in Slice 8 |
| Settlement row 3 | row 3 of Foundation entries |
| Settlement row 4 | row 4 of Foundation entries |
| Settlement row 5 | row 5 of Foundation entries; code in Slice 16 |
| Settlement row 6 | row 6 of Foundation entries; code in Slice 17 |
| Settlement row 7 | row 7 of Foundation entries |
| Settlement row 8 | row 8 of Foundation entries; code in Slice 10 |
| Settlement row 9 | row 9 of Foundation entries; code in Slice 11 |
| Settlement row 10 | Slice 21 (a comment of `src/browser/run-screen.css`) |
| Settlement row 11 | row 11 of Foundation entries |
| Settlement row 12 | row 12 of Foundation entries; code in Slice 2 |
| Settlement row 13 | row 13 of Foundation entries; code in Slice 13 |
| Settlement row 14 | row 14 of Foundation entries; code in Slices 8, 14, 15 |
| Settlement row 15 | row 15 of Foundation entries; code in Slice 9 |
| Settlement row 16 | Slice 1 (data and test); Slices 3, 4, 5 (the three places) |
| Settlement row 17 | row 17 of Foundation entries; code in Slice 15 |
| Out of scope: loop2#65-3, #79-2, #025-6, #043-22, #78-3, #059-8, #83-1, #83-3 | no slice touches them |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Every decision and styleguide row is written by the agent of the foundation entries before Slice 1, which re-quotes the lines `decision:` its changes leave standing in no sentence | each decision written by the slice whose code makes it true — `foundations/decisions.md` (about 1.24 M characters) in a slice's *Change* makes that slice too large by `slice_size.py`, whatever else it holds | between the entries' commit and the slice of the code, a decision and the styleguide say what the code does not do yet, and a test holding the old behaviour carries a quotation of the new sentence; a cycle stopped half way leaves the branch inconsistent until its slices are made |
| The cases of To do 4 go into a new file, `tests/view/login-card-focus.test.mjs` | the cases added to `tests/view/account-screen.test.mjs` — that file alone (about 350 000 characters) is about 140 000 estimated tokens, so a slice changing it with `app.ts` and the guidelines is too large | the focus tests of D-381 stand in two files, and the new file repeats a part of the harness of the old one |
| The unit in the sentence of a rule is cut into Slice 3 (the function, its unit tests, the chronicle's test) and Slice 4 (the panel's field and the expectations of `tests/view/rule-editor.test.mjs`) | one slice — `program-editor.ts`, `program-editor.test.mjs` and `rule-editor.test.mjs` with the guidelines exceed the reading limit | `tests/view/rule-editor.test.mjs` fails on four expectations at Slice 3's head, so a bisection that lands there finds a red test that is no fault |
| To do 11 rides with To do 1 in Slice 12, both in the area „Teren” | To do 11 in a slice of its own — where the table fits already, that slice changes nothing and has no commit | a reviewer judges two things in one slice: the hover line and the table's width |
| To do 12 has a slice of its own, which may end with no commit | To do 12 attached to a slice that changes code anyway — the dispatch asks for a slice of its own for it | the orchestrator's mechanical check asks for a non-empty range; where the numbers follow the rules, Slice 20 has none, and its result is its report |
| The case of To do 10 goes into `tests/view/run-screen.test.mjs`, which leaves the screen and enters it again | the case in `tests/view/scene.test.mjs` — that file (about 114 000 characters) with `scene.tsx`, `run-screen.tsx` and the guidelines exceeds the reading limit | the tests of the walk stand in two files |
| To do 5 covers Siedziba and Postać; Mapy, which already owes the focus after „Zatrzymaj”, stays | Siedziba alone, the place the remark named — row 14 asks the same of every control that goes away | Postać changes beyond the remark |
| The fix of To do 6 and 15 stands in `program-panel.tsx`, which holds the open panel by its group and rule; `rule-list.tsx` stays | the list of rules changed too — with it and the panel's test the slice exceeds the reading limit | where the list must change after all, Slice 8 returns as too large |
| The order of slices follows the styleguide's example of a change of an interface (values in their source, then the shared control, then the screens): the data of the units first (Slice 1), the shared pick cell next (Slice 2), then the screens | the screens first, the shared control last | a screen slice would draw a pick cell the next slice changes again |

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:46-46`

```
22. Komentarz nad regułą z `filter: grayscale(1) brightness(0.55)` w `src/browser/styles.css` („A dead mage and an extinguished fire share one grey…”) podaje źródło wartości: przyjęcie przez Mariusza 2026-11-16; wartość, D-316 i D-322 się nie zmieniają (pytanie 11; loop2#059-14).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:49-49`

```
25. Komentarze arkuszy stylów po podziale na pliki ekranów (loop2#145): komentarz na górze wspólnego `src/browser/styles.css` nie mówi już o „the rules of each other screen” tak, jakby ekrany objęte wyjątkiem z D-421 nie miały własnych arkuszy; siedem komentarzy w arkuszach ekranów, które mówią, że reguła stoi „above”, wskazuje plik, w którym ta reguła stoi teraz. Tylko komentarze, bez zmiany reguł. Uwaga: po loop2#145 reguły z punktów 2, 8, 9 i 22 mogą stać w arkuszu ekranu, a nie w `styles.css` — szukaj po treści reguły. Źródło: opis PR-a https://github.com/mariusznazar/loop2/pull/145 (pozycja 1 „Fix or let through” po poprawce), doradca dnia 16.11.
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:101-105`

```
- Szarość martwego maga i zgasłego ogniska `grayscale(1) brightness(0.55)` stoi w D-316 i D-322, choć nikt jej nie wybrał (pytanie 2 z PR #59; loop2#059-14): przyjąć czy wybrać inną wartość z podglądu?
  - Answer: przyjęta, tak jak na zrzucie z gry; D-316 i D-322 bez zmian, a komentarz przy wartości w arkuszu stylów podaje jej źródło: przyjęcie przez Mariusza 2026-11-16.
  - Not chosen:
    - inna szarość z podglądu kilku wartości — runda podglądu przed cyklem i zmiana dwóch decyzji.
  - Source: Mariusz przez doradcę dnia, 2026-11-16, o zrzutach pięciu spraw wyglądu: „apropo tych 5 spraw wyglądu - na screenach wszystko jest ok”; odczyt doradcy: „1 a — szarość przyjęta (komentarz przy wartości w styles.css ze źródłem „przyjęte przez Mariusza 2026-11-16”)”.
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:205-205`

```
| 10 | Szarość martwego maga i zgasłego ogniska `grayscale(1) brightness(0.55)` ma źródło: przyjęcie przez Mariusza 2026-11-16. | data or code: komentarz w `src/browser/styles.css` | pytanie 11 | wartość bez źródła, którą kolejny przegląd zgłosi albo cykl zmieni |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:4588-4602` D-421
- `foundations/decisions.md:4795-4809` D-47
- `foundations/decisions.md:10846-10970` D-316
- `foundations/decisions.md:11187-11253` D-322

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
