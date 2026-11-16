# Handoff — slice 14, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `69a42675b914cc985ab3703dd6ef207290994195`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 14** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-14-report.md`.
- Your directory for working copies: `.runs/slice-14/`.
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

### Slice 14 — the focus after „Zatrzymaj”

- **Goal:** After „Zatrzymaj” at a character in an earning loop on Siedziba — in the character's row
  of „Drużyna” — and on the screen Postać, the keyboard's focus stays in that character's place: on
  the element that stands where the button stood or nearest to it, such as the line of the stopped
  loop or the character's name, and never falls to the page (To do 5; row 14 of the plan's
  Foundation entries). On the screen Mapy the section „Kto idzie” already owes the focus after
  „Zatrzymaj” (`OwedFocus` in `src/browser/view/maps-screen.tsx`) and stays as it is. Check the
  focus in the game running locally too, as D-88 asks.
- **Change:** `src/browser/view/headquarters.tsx` · `src/browser/view/character-screen.tsx` ·
  `tests/view/headquarters-screen.test.mjs` · `tests/view/character-screen.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:29-29` To do ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195` Settlements to record ·
  `.runs/task-cycles/drobne-bledy-ekranow/task.md:209-209` Settlements to record ·
  row 14 of the plan's Foundation entries ·
  `foundations/decisions.md:8444-8465` D-244 · `foundations/decisions.md:8466-8503` D-245 ·
  `foundations/decisions.md:4713-4727` D-44 · `foundations/decisions.md:4758-4772` D-47 ·
  `foundations/glossary.md:217-221` earning loop · `foundations/glossary.md:87-91` headquarters ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `src/browser/view/maps-screen.tsx:85-120` · `src/browser/view/maps-screen.tsx:290-320` ·
  `src/browser/view/maps-screen.tsx:375-410` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/decisions.md:1540-1554` D-420
- **Model:** cheaper
- **Risk:** none
- **Checks:** the cases of the focus after „Zatrzymaj” on each screen written first and seen
  failing, then `npm test -- tests/view/headquarters-screen.test.mjs` ·
  `npm test -- tests/view/character-screen.test.mjs` · `npm test -- tests/view/maps-screen.test.mjs`
  · the focus checked in a real browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** row 14 of Foundation entries

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:29-29`

```
5. Po „Zatrzymaj” przy postaci w pętli fokus klawiatury zostaje w wierszu tej postaci, nie wypada na stronę (loop2#047-6).
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:194-195`

```
| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
```

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:209-209`

```
| 14 | Gdy element z fokusem znika (zamknięta karta, przerwany wiersz), fokus idzie na element, który stoi w jego miejscu albo najbliżej, nigdy na stronę. | guidelines: styleguide | punkty 4, 5 i 6 *To do*; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | dokąd oddać fokus w następnej kontrolce, która znika po kliknięciu |
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:8486-8507` D-244
- `foundations/decisions.md:8508-8545` D-245
- `foundations/decisions.md:4750-4764` D-44
- `foundations/decisions.md:4795-4809` D-47
- `foundations/decisions.md:1551-1565` D-420

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
