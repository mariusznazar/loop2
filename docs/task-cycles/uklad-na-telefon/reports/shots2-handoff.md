# Handoff - new screenshots of the screens that correction 1 changed

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's go-ahead to you is provisional and never the human's approval. You never ask the human. Your questions go back to the orchestrator in your report.

## Where you work

- Worktree (your working directory; start every command from its root): `the task's worktree`. Branch `task/uklad-na-telefon`, head `6381c4f1` (`git rev-parse HEAD`); you change no file of this repository and make no commit in it. `node_modules` is installed in the worktree. The pinned the-way is `.the-way` of the worktree, at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`.
- Your stage: an executor of the evidence of the change (the screenshots of slice 20 once more), method `make-change`, variant "a slice, or the retry of a slice": read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/ui_check.md`. Your class of model: same (Sonnet).
- Run each command as one simple step: write any script (a `.js` or `.mjs` probe, a `.py` helper) with a file-writing tool into `.runs/shots2/` and run it as its own command; no heredoc in a shell command, no chain of commands joined with `&&` or `;` that redirects output; read an output you saved with a file-reading tool. (The day's advisor asked for this: the other form stops the work on a permission question.)
- Your directory for working copies: `.runs/shots2/` (the worktree's ignored `.runs/`).
- Your report path: `.runs/task-cycles/uklad-na-telefon/reports/shots2-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); it holds the sections **Unread material**, **Searches not found or unclear** and your own-work check, as the method gives them, and its first line is your status.
- `cycle.md` and the other files of the cycle's record directory are not yours to read unless this handoff names them. This handoff names: `.runs/task-cycles/uklad-na-telefon/reports/slice-20-report.md` (what the first screenshots showed, how the states were composed and how each was reached: read it whole, it is your recipe), `.runs/task-cycles/uklad-na-telefon/reports/correction-1-report.md` (what the correction changed) and your report path.

## Working copies (word for word)

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
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## What changed since the first screenshots, which the human reads on the request

Correction 1 (the human's remarks, `.runs/task-cycles/uklad-na-telefon/reports/correction-1-remarks.md`) changed, in the phone layout (a page area narrower than 1280 px): (a) the rows of the rules and the headers of the groups of a program in the editor: the text of the row takes the tap and opens it, the buttons stand on a line of their own below the text (arrows on the left, the other buttons on the right), and empty covers fill the empty space so that no tap on the row reaches a button; a tap on the handle „⋮⋮” opens the row too; (b) the pick of actions in a rule's panel is in two columns, so the greyed reason „gałąź niewykupiona” breaks only between words; (c) the lighter background no longer stays after a tap on the rows of the rules, „Teraz”, „Potem” and the lists of maps and programs. The computer layout (1280 px and wider) is unchanged.

## What you do

1. Take, at a page area 360 px wide with touch (Chromium, the phone-layout section of `.claude/skills/loop2-play/SKILL.md`), the screens the correction changed, again, **in the same states as the first screenshots**, from this head: Programy with the editor and a rule's panel open (file name `07b-programs-editor-360.png`), the screen of a map run with the plaque of a discovery and the badge over the mage's head, with the editor under it (`09-run-discovery-360.png`), and, at a page area **1100 px** wide, the screen of a map run with the pick of „Czynność” open (`12-run-pick-czynnosc-1100.png`: the pick is in two columns there too, since 1100 px is the phone layout). Also two new ones: (`13-pick-reason-360.png`) the open pick of „Czynność” at 360 px with the greyed reason „gałąź niewykupiona” of „Obchód” in view (a character who has not bought the branch: compose a second character without it, as slice 20's and the correction's reports say), and (`14-row-buttons-360.png`) the editor's rows and group headers at 360 px (a group with two rules, the arrows and the other buttons on their line, one rule opened) so that the human sees the new layout of a row. Each screenshot is looked at (read the PNG with your image reader) for a side scroll and for text over a frame before it is pushed.
2. Push to the public repository `mariusznazar/screenshots` (D-418 and D-419: read `foundations/decisions.md` D-418, D-419 and D-420 whole; find each by its heading): clone it into `.runs/shots2/screenshots/`, check out the branch `loop2/uklad-na-telefon` (it exists; the first screenshots are on it, in `loop2/uklad-na-telefon/`), copy your new files over the three of the same names and add the two new ones, **commit by path on that branch and push the branch (never `main`)**; the files of the first set that did not change stay in the tree, so every address of the set can be built from the new commit. Use the `gh` account logged in on this computer (`gh auth status` shows `mariusznazar`); write no account or token into any file or into your report. The embedding address of each file: `https://github.com/mariusznazar/screenshots/blob/<commit>/loop2/uklad-na-telefon/<file>.png?raw=true` with `<commit>` the full sha of your commit (not a branch name, not `raw.githubusercontent.com`). Make throwaway accounts with an address like `tester1@example.invalid`; no screenshot may show a person's own name, address or password.
3. Report: the new commit's full sha; for each of the 24 files of the set (the 22 of the first set, which you do not take again unless a screen changed, and your two new ones) its file name, one line of what it shows and its embedding address from the new commit; check two of the addresses with `curl` (the status and the content type); and say which screens you took again and why the rest of the first set is still true. Put no image file in this repository, in the record's directory or in your report; the files are working copies in `.runs/shots2/` and are removed with the clone before you return. Close the browser and stop the local game when you end.
4. A fault you find in what you photograph (a side scroll, text over a frame, a control that cannot be tapped, a tap that does the wrong thing, a row that looks broken) goes back to the orchestrator in the report, not fixed here, with the screen, the state and how to reproduce it.
