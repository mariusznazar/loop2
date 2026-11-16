# Handoff — slice 8, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `39ca66afdae0bfce1640c5d6d19bc0df2be151d2`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 8** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-8-report.md`.
- Your directory for working copies: `.runs/slice-8/`.
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

### Slice 8 — the rule panel follows its rule to another group, and „✕” under a folded group

- **Goal:** A rule panel open on a rule the player moves to another rule group — by „↑” or „↓”
  across the edge of its group or by its handle — stays open and follows the rule to its new group,
  as it follows it within a group today, its field as it was; deleting the rule closes its panel
  (To do 15; D-306 and D-350 as rows 2 and 3 of the plan's Foundation entries change them). Where
  the open panel stands under the header of a folded group — opened by „Dodaj regułę z tym” (D-313)
  or with its group folded after it opened (D-350) — „✕” and Escape give the focus to the header of
  that group, since the row of the rule is not drawn; elsewhere the focus goes back to the row as
  today (To do 6; row 14 of the Foundation entries). The open panel is held in
  `src/browser/view/program-panel.tsx` by its group and its rule (`openState`, `closePanel`, the
  layout effect of `focusClosed`); the fix stands there, and `src/browser/view/rule-list.tsx` stays
  as it is. Check the focus in the game running locally too, as D-88 asks.
- **Change:** `src/browser/view/program-panel.tsx` · `tests/view/program-panel.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:30-30` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:39-39` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:64-68` Questions to settle ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-198` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:209-209` Settlements to record ·
  rows 2, 3 and 14 of the plan's Foundation entries ·
  `foundations/decisions.md:9199-9233` D-306 · `foundations/decisions.md:9386-9410` D-350 ·
  `foundations/decisions.md:8750-8825` D-288 · `foundations/decisions.md:8888-8907` D-295 ·
  `foundations/decisions.md:8926-8945` D-297 · `foundations/decisions.md:7378-7426` D-313 ·
  `foundations/glossary.md:53-63` program rule, rule group ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `src/browser/view/rule-list.tsx:60-110` · `src/browser/view/rule-list.tsx:200-262` ·
  `src/browser/view/rule-list.tsx:570-612` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** the cases of the panel following its rule across a group's edge by an arrow and by a
  drop, of the panel closed by a deletion, and of the focus on the folded group's header after „✕”,
  written first and seen failing, then `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/discovery-band.test.mjs` ·
  the focus checked in a real browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** rows 2, 3 and 14 of Foundation entries

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:30-30`

```
6. Gdy panel reguły otwarty przez „Dodaj regułę z tym” stoi pod nagłówkiem zwiniętej grupy, „✕” oddaje fokus nagłówkowi tej grupy (D-350; loop2#058-6).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:39-39`

```
15. Panel reguły otwarty na regule, którą gracz przenosi do innej grupy — strzałką „↑”/„↓” albo uchwytem — zostaje otwarty i idzie za regułą do nowej grupy, tak jak dziś idzie za nią w obrębie grupy; usunięcie reguły zamyka jej panel. D-306 dopisuje, że usunięcie reguły zamyka panel, a *Rejected* D-350 mówi, że gracz straciłby otwarte pole i miejsce w nim, nie pisaną regułę (pytanie 4; loop2#67-7, loop2#67-12).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:64-68`

```
- Panel reguły zamyka się, gdy gracz przenosi otwartą regułę do innej grupy, a D-306 tego zamknięcia nie wymienia: panel idzie za regułą czy zamknięcie zostaje i trafia do D-306?
  - Answer: panel idzie za regułą do nowej grupy (strzałki i uchwyt); D-306 dopisuje, że usunięcie reguły zamyka panel; *Rejected* D-350 poprawione na „the player would lose the open field and the place in it”.
  - Not chosen:
    - zamknięcie zostaje, D-306 wymienia przeniesienie do innej grupy i usunięcie — dwa zdania w fundamencie bez zmiany kodu, a gracz dalej traci otwarte pole przy każdym przeniesieniu przez granicę grupy; „b utrwalałoby w decyzji zachowanie, którego nikt nie wybrał”.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — panel idzie za regułą do nowej grupy (strzałki i uchwyt); D-306 dopisuje, że usunięcie reguły zamyka panel; Rejected D-350 poprawione na „the player would lose the open field and the place in it”. Powód: w obrębie grupy panel już idzie za regułą, więc zamknięcie na granicy grupy to niespójność, którą gracz odczuwa jako utratę pola; poprawka mała, a b utrwalałoby w decyzji zachowanie, którego nikt nie wybrał.”
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-198`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | „↑” jest wyłączona tylko wtedy, gdy przed grupą reguły nie stoi żadna grupa, a „↓” tylko wtedy, gdy za nią nie stoi żadna; pusta grupa na brzegu przyjmuje regułę ze strzałki. | sentence of D-297 | pytanie 1 | czy „naprawić” kod pod dzisiejsze zdanie D-297 i wyłączyć „↑” na pierwszej regule programu |
| 2 | Panel reguły idzie za regułą przeniesioną do innej grupy, strzałką i uchwytem; usunięcie reguły zamyka jej panel. | sentence of D-306 | pytanie 4 | czy zamknięcie panelu przy przeniesieniu przez granicę grupy zostaje i trafia do D-306 |
| 3 | Odrzucony wariant D-350 mówi, że gracz straciłby otwarte pole i miejsce w nim, nie pisaną regułę. | sentence of D-350 | pytanie 4 | brzmienie *Rejected* D-350 przy zmianie D-306 |
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:209-209`

```
| 14 | Gdy element z fokusem znika (zamknięta karta, przerwany wiersz), fokus idzie na element, który stoi w jego miejscu albo najbliżej, nigdy na stronę. | guidelines: styleguide | punkty 4, 5 i 6 *To do*; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | dokąd oddać fokus w następnej kontrolce, która znika po kliknięciu |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:9258-9304` D-306
- `foundations/decisions.md:9457-9481` D-350
- `foundations/decisions.md:8792-8867` D-288
- `foundations/decisions.md:8935-8954` D-295
- `foundations/decisions.md:8973-9004` D-297
- `foundations/decisions.md:7415-7463` D-313
- `foundations/decisions.md:1551-1565` D-420

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
