# Handoff — slice 20, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `cf068a01135704578cf0ebf3d488dcac8799efd3`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 20** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-20-report.md`.
- Your directory for working copies: `.runs/slice-20/`.
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

This slice (To do 12) is judged in the running game; the plan's section says how. It may end with no commit: where both numbers follow the rules, change no file and write in your report, for the request, what each number shows and by which decision (the orchestrator accepts an empty range for this slice then, and only then). Where practice is lost against the rules, fix with a test that fails first. Play ONE game as a player does, with `.claude/skills/loop2-play/SKILL.md`; say in the report the exact steps and the two numbers you read ("Eksploracja +1" during the run, "0/15" after „Zakończ”) and which decision each follows. Before you commit (if you do) run `npx eslint` on every changed `.ts`/`.tsx` file and `npx prettier --check` on every changed file and make both exit 0. Keep check logs in your directory, move those worth keeping into `reports/` with a name starting `slice-20-`, then remove the directory. Screenshots are placed as D-418 and D-419 settle.

## Your section of the plan, word for word

### Slice 20 — the practice of a run against the tree after „Zakończ”

- **Goal:** In one game played locally in a real browser, reproduce loop2#055-11: during a manual
  map run the line under the body row reads „Wprawa w tym przejściu: Eksploracja +1” (D-201), and
  after „Zakończ” the tree of Eksploracja on the screen Postać reads „0/15” (To do 12). Compare both
  with the rules: a manual map run pays its practice to its character only at the completion that
  first solves its map, and „Zakończ” before a completion leaves the character's practice as it was
  (D-194); the line of the run shows practice gathered, not paid (D-201). Fix only where practice is
  lost against those rules — in the simulation's payment or in what a screen writes — with a test
  that fails first. Where both numbers follow the rules, change no file and write in the report, for
  the request, what each number shows and by which decision. The report says whether the slice fixed
  anything.
- **Change:** `src/browser/sim/skills.ts` · `src/browser/view/character-skills.ts` ·
  `tests/sim/skills.test.mjs` · `tests/view/character-skills.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:36-36` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:61-63` Questions to settle ·
  `foundations/decisions.md:6697-6717` D-191 · `foundations/decisions.md:6737-6757` D-193 ·
  `foundations/decisions.md:6758-6776` D-194 · `foundations/decisions.md:6851-6872` D-199 ·
  `foundations/decisions.md:6895-6914` D-201 · `foundations/glossary.md:180-184` practice ·
  `foundations/glossary.md:130-140` manual map run, completion ·
  `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/invariants.md:226-235` simulation-inputs ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1540-1554` D-420
- **Model:** same — replays one game in a real browser and judges two numbers against the rules of practice, with a fix only where they disagree; a judgment, not an edit (added in the plan's review)
- **Risk:** none
- **Checks:** where it fixes, the failing test first, then `npm test -- tests/sim/skills.test.mjs` ·
  `npm test -- tests/view/character-skills.test.mjs`; in every case the replay in a real browser by
  `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** none

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:36-36`

```
12. Cykl odtwarza w jednej rozegranej grze „Eksploracja +1” w trakcie przejścia wobec „0/15” w drzewie po „Zakończ” i poprawia tylko wtedy, gdy wprawa ginie wbrew regułom gry; gdy obie liczby są zgodne z regułami, opisuje je w prośbie o scalenie (loop2#055-11).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:61-63`

```
- Które uwagi zostają bez zmiany?
  - Answer: loop2#65-3 (D-336 przyjmuje, że „Teraz” i „Potem” nic nie robią przy pokazanym zapisanym programie), loop2#79-2 (D-370 przyjmuje, że Escape po kliknięciu obok okna końca nic nie zamyka), loop2#025-6 (okno końca przejmuje fokus zaraz po efekcie śmierci), loop2#043-22 (wymaga stanu gry ponad 64 KiB i nieudanego wylogowania naraz), loop2#78-3 (cena w czterech kolumnach jest czytelna, poprawka to przeprojektowanie siatki); loop2#055-11 idzie do *To do* jako punkt 12 z warunkiem.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a — tabela B w całości: 65-3 i 79-2 to koszty, które decyzje D-336 i D-370 przyjmują wprost; 055-11 — tak jak proponujesz: cykl odtwarza to w jednej rozegranej grze i poprawia tylko wtedy, gdy wprawa ginie wbrew regułom (wpisz to jako punkt To do z warunkiem, nie jako pozycję do zostawienia).”
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:6734-6754` D-191
- `foundations/decisions.md:6774-6794` D-193
- `foundations/decisions.md:6795-6813` D-194
- `foundations/decisions.md:6888-6909` D-199
- `foundations/decisions.md:6932-6951` D-201
- `foundations/decisions.md:1455-1520` D-417
- `foundations/decisions.md:1551-1565` D-420

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
