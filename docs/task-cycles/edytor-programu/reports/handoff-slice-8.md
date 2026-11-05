# Handoff — slice 8 of the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. A question goes back to the orchestrator in your report
with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
  Your base (the head when you start): `ba30024`. Commit your work on this branch; push nothing.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **a slice, or the retry of a slice** — slice 8. Read in full `.the-way/task-cycle/change/SKILL.md` (project skill
  `the-way-make-change`) and `.the-way/task-cycle/change/slice.md`; read `.the-way/task-cycle/change/ui_check.md` when the slice changes a user interface (the step that names it comes).
- Report: `docs/task-cycles/edytor-programu/reports/report-slice-8.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only (never `-A`, `.`, `-a`); messages in English in the repository's form (see `git log --oneline -8`, e.g. `feat: :sparkles: …`, `docs: :memo: …`). Do not run the product's gate (`npm test` with no argument); run the focused checks your section names, each with command and exit code in the report.

## Answers of the start

- Trust boundary: the change touches `assets/icons/**` (files from game-icons.net) in slices 3 and 4 only; the review of those slices checks crafted input there.
- Irreversible operation: none. Open design choice: none; a choice of how to make what the task and the foundation settle is yours to make and name in the report; a real open design choice makes you return `returned` with no code.
- The foundation step has run: the entries D-288 to D-307 and the changed ones (D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, icon-credits, the icon title facts, game-icons-licence) are written. Entry ranges below are current ones; they hold where they differ from the plan's.
- The base gate already fails on `tests/quality/test_quality_invariants.py::test_ruff_source_rules` and `::test_shellcheck_source_rules` (`FileNotFoundError`: ruff and shellcheck are not installed on this computer). That is the base's state: report any other failure of that file as yours.
- Two of the 11 icons are not by Delapouite or Lorc (see the foundation step's report): `logging` is by Skoll (https://game-icons.net/1x1/skoll/logging.html) and `dodge` by Felbrigg (https://game-icons.net/1x1/felbrigg/dodge.html); the foundation names them in `game-icons-licence`. Relevant only to slices 3 and 4.

## Your section of the plan, word for word (`docs/task-cycles/edytor-programu/plan.md`)

### Slice 8 — Destructive buttons grey at rest across the game

- **Goal:** every destructive button of the game — „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” — has its text in `text` at rest and in `danger` under the pointer and at the visible focus, in both forms of the button, by one rule of `src/browser/styles.css` on the class both forms carry (To do item 14, rows E3, E11, E12); no other look of the button changes, and no rule but the one `:focus-visible` rule sets `outline` (D-47). The kitchen-sink page shows the destructive button at rest, under the pointer and with the focus, its samples of the pointer and the focus drawn as `kitchen-sink.css` draws them for the other looks.
- **Change:** `src/browser/styles.css` · `src/browser/kitchen-sink/kitchen-sink.css` · `src/browser/kitchen-sink/kitchen-sink.ts`
- **Read:** `docs/task-cycles/edytor-programu/task.frozen.md:42-42` To do · `docs/task-cycles/edytor-programu/task.frozen.md:123-128` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:207-207` Context · `docs/task-cycles/edytor-programu/task.frozen.md:229-229` Wpisy projektowane, które zadanie urzeczywistnia i pisze · `docs/task-cycles/edytor-programu/task.frozen.md:242-243` Wpisy projektowane, które zadanie urzeczywistnia w części · `docs/task-cycles/edytor-programu/task.frozen.md:251-253` Obecne wpisy, które zadanie zmienia
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:837-850` D-39 · `foundations/decisions.md:852-865` D-40 · `foundations/decisions.md:912-925` D-44 · `foundations/decisions.md:927-940` D-45 · `foundations/decisions.md:957-970` D-47 · `foundations/decisions.md:4847-4873` D-245 · `foundations/decisions.md:5536-5560` D-269
  Foundation entries rows E3, E11, E12
  `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:469-477` browser-view-focus-outline · `foundations/invariants.md:499-507` application-build-kitchen-sink
- **Model:** cheaper
- **Risk:** none
- **Checks:** `node scripts/kitchen-sink.mjs --build-only`; `npm test -- tests/invariants/test_application_build_kitchen_sink.py`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/view/react-controls.test.mjs`; screenshots of the kitchen-sink page's destructive button at rest, under the pointer and with the focus, and of the running game (`npm run local`, as `.claude/skills/loop2-play/SKILL.md` gives) with „Zakończ” and „Restart” after a death or a completion, „Zatrzymaj” on Postać and „Usuń” on Programy, each at rest and under the pointer, and one reached by Tab
- **Depends on:** Slice 7 · Slice 1 · E3 · E11 · E12

## Passages of the task named in your *Read*, word for word (`docs/task-cycles/edytor-programu/task.frozen.md`)

### task.frozen.md:42-42

14. W całej grze przyciski niszczące są szare w spoczynku, a czerwienieją pod kursorem i przy fokusie, w obu postaciach przycisku; dotyczy to także „Zakończ”, „Restart”, „Zatrzymaj”, „Porzuć zmiany” i „Przełącz postać na ten program”. Zdanie „Przycisk niszczący ma tekst w `danger`” przewodnika stylu zmienia się z tym, a strona wszystkich stanów pokazuje przycisk niszczący w spoczynku, pod kursorem i przy fokusie (pytanie 9).

### task.frozen.md:123-128

- Pytanie 9. Czy czerwone kasowanie w każdym wierszu zostaje do zadania 24?
  - Answer: B — wszystkie przyciski niszczące szarzeją już w tym zadaniu, a czerwienieją pod kursorem i przy fokusie. Koszt przyjęty: jedna reguła wyglądu, przewodnik stylu, strona wszystkich stanów i dwa pliki testów, a z zadania 24 przechodzą części trzech decyzji o kolorze; dotyka też „Zakończ”, „Restart” i „Zatrzymaj”. Plan przeniósł to z zadania 24 do tego zadania (dziennik planu, 2026-11-03).
  - Not chosen:
    - A, zostaje czerwone do zadania 24 — „edytor pokazany przy zgłoszeniu ma czerwony znak w każdym wierszu, gorzej niż stary Loop”
    - C, szary tylko przycisk w wierszu — „dwa wyglądy jednej kontrolki”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, B10, rekomendacja B; plan_mvp2_loop2.md@54d8d854, cel zadania 5.

### task.frozen.md:207-207

- Jedyną czerwienią w spoczynku na kontrolce jest dziś `.button.destructive` (`src/browser/styles.css:159-161`).

### task.frozen.md:229-229

- D-44 — Which controls do the screens of the browser view build on?: „The screens of the browser view build every button, select list, number field, text field and cell of a pick from the eight shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program” and „Zatrzymaj” are destructive buttons, neutral until the pointer or the focus reaches them and then in `danger`.” Reszta wpisu stoi w definicji; „Wyślij ponownie” bez słowa o nagłówku czyni prawdziwym zadanie 4, a zadanie 5 zapisuje wpis w całości (pytanie 15).

### task.frozen.md:242-243

- D-39 — What do the signal colours of the browser view mean? (pisze zadanie 11): *Verification*: „the text of the button „Zakończ” in `danger` under the pointer”. Zadanie czyni prawdziwym ten przykład; tła przy regule daje zadanie 11.
- D-245 — What does „Zatrzymaj” do? (pisze zadanie 25): „„Zatrzymaj” is a destructive button that acts at once on the click”. Zadanie czyni prawdziwym to, że „Zatrzymaj” traci tekst w `danger` w spoczynku.

### task.frozen.md:251-253

- D-44 (dziś): „from the seven shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field and the text field”.
- D-39 (*Verification*, dziś): „the text of the button „Zakończ” in `danger`”.
- D-245 (dziś): „„Zatrzymaj” is a destructive button with its text in the role `danger`”.

## Foundation entries of your *Read*: current ranges in the worktree

The identifier is the address; the range is its size now. Read each whole, with its rationale and rejected options.

- `foundations/part_map.md:3-28` browser-view
- `foundations/decisions.md:837-850` D-39
- `foundations/decisions.md:852-865` D-40
- `foundations/decisions.md:912-925` D-44
- `foundations/decisions.md:927-940` D-45
- `foundations/decisions.md:957-970` D-47
- `foundations/decisions.md:4861-4887` D-245
- `foundations/decisions.md:5555-5579` D-269
- `foundations/invariants.md:459-467` browser-view-token-values
- `foundations/invariants.md:469-477` browser-view-focus-outline
- `foundations/invariants.md:499-507` application-build-kitchen-sink

Where the plan's *Read* names a guideline file, a source file, a test or a file made by an earlier slice, open it by that path (whole, as *Read* says) — the paths in your section above are relative to the worktree root. Files made by earlier slices exist now in the worktree.

## Report

Write the full report: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check (the weakest point of your slice, how you checked it and what it showed), for a user-interface slice the states and screenshot evidence as `ui_check.md` gives (or a screenshot unchecked, with its reason), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and concerns. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
