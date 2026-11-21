# Handoff — the fix of the review's Minor findings, task `ekran-postaci` (you resume as the one author)

## Who you are working for

As in your first handoff: the person who requested this cycle has delegated intermediate choices to the
orchestrator; nothing you decide is the human's approval; you never ask the human anything.

## Where and what

- The same worktree `.runs/worktrees/ekran-postaci`, branch `task/ekran-postaci`; the reviewed head is
  `1e21575d248ef294a45953175c7301ec18d63d57`, so the fix's range runs from it. Your directory for working copies
  is `.runs/author-fix-1/`.
- Method: `.the-way/task-cycle/change/SKILL.md`, variant **the fix of a review's findings**, which you read
  again for this variant.
- The findings: **`reports/fix-1-findings.md`** (full path `.runs/worktrees/ekran-postaci/.runs/task-cycles/ekran-postaci/reports/fix-1-findings.md`).
  It holds, in the reviewer's words, the two Minor findings of the review of the whole change
  (`PASS 1e21575d…`, no blocking finding). The review's range was `cfdbd267..1e21575d`; both findings are within
  the task and both are fixed before the request opens. There is one fix and one review of it.
- Finding 1 (the doc comment of `CAMP` lost to `CHARACTER_FIGURE` in `src/browser/sim/data/scene.ts`): the fix
  the reviewer names is enough.
- Finding 2 (the track of the practice bar is barely visible on the block background, about 1.19:1 against the
  old Loop's about 1.33:1, most of all at zero practice): fix it **within what the task settled** — the bar looks
  like the bar of an unmet requirement (a darker track, a light fill, no green), design tokens only, no value in
  place of a token, no decision the task marks „Bez zmiany" changed. Choose the smallest change that makes an
  empty track read on the block (for example a token already in the styleguide for a track or a frame, or an
  outline of the track in a role the styleguide already gives); name the way you chose and the one you rejected
  with its cost. If the fix changes the look, the sentence of D-40 and the styleguide rule must say what the
  screen really shows after it; the contrast tests of the product (`tests/invariants/test_design_token_contrast.py`
  and the token tests) must keep passing, and a new colour value is a decision of the human, so a value that is
  no existing token stops you: return `questions`.
- Where the fix changes how the screen looks, take the screenshots again that the change touches (those of
  the screen Postać: your numbers 2, 3 and 4 of the first report; number 1 is the old Loop's and number 5 is
  another screen) and push them as one new commit on the same branch `loop2/ekran-postaci` of
  `mariusznazar/screenshots`, in the same directory, replacing the files by the same names, with no force-push.
  Report the new commit and the links with `?raw=true`; the old links stay as the old commit's. D-418 and D-419
  hold as before; no screenshot goes into the game's repository or the record.

## Rules, as before

- Commit by explicit path; messages in English in the form of the repository's earlier commits with the
  decisions the commit bears at the end; focused checks only — **no full gate**, none of bare `npm test`,
  `npm run test:all` or anything that runs every test (the user's instruction for this cycle: the full gate does
  not start without a signal from the day advisor). Every check you report has its command and exit code;
  re-run the affected checks (the tests of the changed files, ESLint, Prettier, the typecheck, the size rule,
  `python -B .the-way/elements/common/foundation_check.py` if you change the foundation or the styleguide).
- The record directory's other files (`cycle.md`, other reports) are not yours to read except the findings file
  and this handoff.
- Answer with evidence a finding you hold wrong; a finding you do not fix is named in the report with the reason.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your report

Write it to `.runs/task-cycles/ekran-postaci/reports/author-fix-1-report.md` (the name begins with the role; that
file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it). First line: your status. Then:
the fix's commits and range, each finding with what you did, each check with command and exit code, the own-work
check, the choices with the way rejected, the new screenshot commit and links where you took them, **Unread
material** and **Searches not found or unclear** (each `none` where nothing), and the line on your working copies.
Return the status, the commits, a one-line check result and the report's path.
