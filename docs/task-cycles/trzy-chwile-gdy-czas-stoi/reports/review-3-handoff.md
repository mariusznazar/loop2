# Handoff — review of the return step's commits, task trzy-chwile-gdy-czas-stoi

You are a fresh reviewer; you did not make the change. Method: `.the-way/task-cycle/review/SKILL.md` in the
worktree `the task's worktree` (read it whole, and its section for the return
step's commits). Read-only toward the worktree; if you run a check, run it in a separate checkout under the
worktree's `.runs/` and delete it afterwards.

- Reviewed: **the return step's commits** — range `4e87b0d7887b815ef9e75aa82cc13c999252d203..66c9d371` (one
  commit, `foundations/decisions.md`, D-322 only: +3 / −3). The code at `4e87b0d7` was reviewed twice
  (`PASS`); do not review it again, but use it to judge whether the sentences the return step wrote are true.
- Against: the task (`.runs/task-cycles/trzy-chwile-gdy-czas-stoi/task.md`, frozen; read its *To do* 1–4, 8, 10
  and *Settlements to record* rows 1–7) and the entries the return step writes or corrects — D-322 as it stands
  at `66c9d371` and the entries it names: D-04 (it now `derives from` it), D-315, D-316, D-319, D-311.
  Read each whole. The return step's report: `reports/return-report.md` — a claim, not evidence.
- What the return step claims, to verify in the code at the head: (1) the plaques show each icon once
  (`src/browser/view/scene-picture.ts`, `scene.tsx`; shared icons „Idź”/„Idź — ognisko”, „Zbierz”/„Obchód”);
  (2) the dead mage falls toward the middle of the frame (`fallFacing` in the scene, and its CSS); (3) a moment
  has just begun where the events of the simulation call carry it (`discovered`, `characterDied`,
  `mapRunCompleted`), and a first draw, a redraw, a return to the screen, a reload and a load carry none.
  Check also that the sentences are consistent with the rest of D-322 and with its *Verification* and *Rejected*,
  and that `python -B .the-way/elements/common/foundation_check.py` still exits 0.
- Trust boundary: unchanged by this range (no file of `assets/sprites/**`).
- Report: `reports/review-3-report.md`, first line `PASS <sha>` or `FAIL <sha>` (the range's head), then your
  findings graded as the method gives, the checks you ran with command and exit code, **Unread material** and
  **Searches not found or unclear** (`none` is an answer). Return the first line, the path, the changed files
  with line counts and a one-line check result.
