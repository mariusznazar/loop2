# Handoff — slice 19, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. A question goes to the orchestrator in your report with status `questions`; a missing fact or permission with status `blocked`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Base of this slice: `4c256a99790ff1b6cd05f78cda988554e4ea55a0`. Your commits come after it; your range is the base to your head.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **slice 19** of the plan. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant, in the words of its row: "a slice, or the retry of a slice" — read `.the-way/task-cycle/change/slice.md` for it. Read a file the method names only when the step that names it comes. You have no skill tool.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/slice-19-report.md`.
- Your directory for working copies: `.runs/slice-19/`.
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

Besides your section: slice 18 (commit `4c256a99`) changed `placeOf` so that a mage whose walk is cut by an action that stays (eating, lighting, a fight) stops where the walk has brought it, but its executor checked it only in jsdom. In the running game, as part of your own browser work, check slice 18's stop too: start a walk at a fast pace, let the action „Zjedz — jagoda” (or another that stays) cut it, and say where the mage stands (it must stand where it had come, not run on to the old target); and say what a mage does that dies in mid-walk (the same code freezes it where it stands), so that the whole-change review can judge it against D-316 to D-319. Do not change slice 18 code unless your own task needs it; report what you saw.
Before you commit run `npx eslint` on every changed `.ts`/`.tsx` file and `npx prettier --check` on every changed file and make both exit 0. Keep check logs in your directory, move those worth keeping into `reports/` with a name starting `slice-19-`, then remove the directory. A screenshot is placed as D-418 and D-419 settle.

## Your section of the plan, word for word

### Slice 19 — a walk cut by leaving the screen plays no second time

- **Goal:** A walk of the mage that the player cut by leaving the screen of a map run within its
  640 ms does not play again when the player comes back: the mage stands where D-319 puts it, at the
  place of the walk, as at an entry on the screen, with no walk from where it set out (To do 10).
  Find in the game running locally why the walk plays again — the screen hidden and shown again
  restarting the walk's CSS animation, or the scene drawing it anew — and fix it in the scene or in
  the screen of the map run; a case in `tests/view/run-screen.test.mjs` leaves the screen and enters
  it again during a walk and finds no walk.
- **Change:** `src/browser/view/scene.tsx` · `src/browser/view/run-screen.tsx` ·
  `tests/view/run-screen.test.mjs`
- **Read:** `.runs/task-cycles/drobne-bledy-ekranow/task.md:34-34` To do ·
  `foundations/decisions.md:11005-11039` D-319 · `foundations/decisions.md:10892-10976` D-317 ·
  `foundations/decisions.md:9765-9782` D-283 · `foundations/decisions.md:9783-9806` D-284 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `foundations/decisions.md:1444-1509` D-417 ·
  `foundations/decisions.md:1540-1554` D-420
- **Model:** same — a walk cut by leaving the screen, with the clock of the scene and the return to the screen; reasoning about time and state across two screens (added in the plan's review)
- **Risk:** none
- **Checks:** the case of leaving and entering again during a walk written first and seen failing,
  then `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/scene.test.mjs` · the
  return checked in a real browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 18

## Passages of the task your *Read* names, word for word (file `.runs/task-cycles/drobne-bledy-ekranow/task.md`)

### `.runs/task-cycles/drobne-bledy-ekranow/task.md:34-34`

```
10. Marsz maga, który gracz przerwał wyjściem z ekranu przejścia w pierwszych 640 ms, nie powtarza się po powrocie; mag stoi tam, gdzie każe D-319 (loop2#059-10).
```

## Current ranges of the decisions your *Read* names (in `foundations/decisions.md` as it stands at your base; they replace the plan's ranges)

- `foundations/decisions.md:11084-11118` D-319
- `foundations/decisions.md:10971-11055` D-317
- `foundations/decisions.md:9836-9853` D-283
- `foundations/decisions.md:9854-9877` D-284
- `foundations/decisions.md:1455-1520` D-417
- `foundations/decisions.md:1551-1565` D-420

The other files and line ranges of your *Read* (invariants, part map, glossary, source files, guidelines) stand as the plan gives them; the guideline files are read whole.

## Your report

Write it as `make-change` gives it for a slice: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, each check with its command and exit code, the own-work check (the requirement of your slice most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), reaches beyond your handoff, and the line on working copies.
