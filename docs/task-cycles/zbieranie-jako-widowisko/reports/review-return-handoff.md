# Handoff — review of the return step's commits (task "Zbieranie jako widowisko")

You review the commits of the return step of a the-way task cycle, as an agent that did not make them
and that did not review this cycle before. You are read-only: change no tracked file, make no commit;
scratch only in your own new directory under the worktree's ignored `.runs/`.

## What you review

- Method: read `.the-way/task-cycle/review/SKILL.md` whole (project skill `the-way-review-change`); the
  return step's commits are reviewed "as section 2 gives, against the task and the foundation entries the
  return step writes or corrects". Read `.the-way/task-cycle/skill/return_step.md` for what the return
  step is to do.
- Worktree: `the worktree's root`, branch `task/zbieranie-jako-widowisko`.
  Range: `8531d93d3c5cdc5b9572bce17c534d4bdadd228d..d457d238` (one commit, `d457d238…`; confirm with
  `git rev-parse HEAD` and expand the SHA yourself). Compute the diff yourself: `git diff <base>..<head>`.
  The earlier code was reviewed `PASS` at `8531d93d` (whole change and fix); it is not under review again,
  but its code is what these entries must match.
- The frozen task (the requirement; read whole):
  `docs/task-cycles/zbieranie-jako-widowisko/task.frozen.md`
- The return step's report (claims to verify):
  `docs/task-cycles/zbieranie-jako-widowisko/reports/return-step-report.md`
- Entries the return step wrote or changed: D-362 (changed: the facing), D-365 (new), D-317 (Rationale
  wording), and the styleguide section "The scene of a map run" / Roles row; the whole of
  `foundations/decisions.md` entries D-362 to D-365, D-317, D-271 and D-27 whole; `foundations/glossary.md`
  whole; `foundations/part_map.md` whole.

## What to check

- D-365 and the D-362 sentence say what the code at `8531d93d` does (read `src/browser/view/scene-picture.ts`
  `sceneEffect` and `src/browser/view/scene.tsx`, `src/browser/sim/data/scene.ts` `mageFaces`), and nothing
  the code does not; the English and Polish meaning sentences and the mark are in the form the foundation
  step gives (`.the-way/task-cycle/skill/foundation_step.md`, WAY-134), and `python -B
  .the-way/elements/common/foundation_check.py` passes.
- That the entries do not write what the task says this task does NOT write (the rule of question 6 on the
  lasting occupation of a character and the state of the whole scene; the whole reduced-motion rule; rule D with
  its condition; the scuffle's cloud; the projected rewrite of D-316 and D-27).
- The return step's decision to leave D-27 unchanged (its reading: D-27 says the footer and the section credit
  each icon with its title…, which is still true; the pack's row is governed by D-271 and `sprite-credits`).
  Judge whether D-27 is false against the code; the task document says task 24 rewrites D-27. Grade as you see
  fit; an earlier reviewer graded it a Minor finding outside the task.
- The choices the return step leaves as rows of the questions table (report, last section) and the claims that
  no environment fact, glossary term, invariant or part-map change is needed: judge whether any of them
  must be an entry (WAY-36, WAY-95); an entry is only "no deferred entry" — the return step lists none for later.
- Trust boundary `assets/sprites/**` (answer: yes) — the return step's range must hold no file there; confirm.

Do not run the product's full gate (`npm test` with no argument). Focused checks as `npm test -- <file>`, one
build at a time, with command and exit code.

## Report

Write your report to
`docs/task-cycles/zbieranie-jako-widowisko/reports/review-return-report.md`
with the first line `PASS <sha>` or `FAIL <sha>` (or `questions`), graded findings (Minor findings inside and
outside the task listed apart), the foundation entries you read whole, **Unread material**, **Searches not found
or unclear**, each reach beyond this handoff, and each check with command and exit code. Return the first line, the
changed files with added/removed line counts, the report path and a one-line check result.
