# Handoff - reviewer of the whole change after correction 1, task `katalog-map`

You review the whole change of a planned task cycle of the-way, as it stands after correction 1, as an agent that made none of it and did not write the earlier whole-change review. The person who requested the cycle has delegated intermediate choices to the
orchestrator; nothing you are told is the human's approval. Questions go to the orchestrator, never to the human. You are read-only on the product: no tracked file changes, no commit.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`. Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`) and `.the-way/task-cycle/review/whole_change.md`, each whole. You select your own foundation and guidelines by
  "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`; write the index of your selection of decisions with the script the method names (`decision_index.py`) and state in your report how many decisions you read whole. Your directory for working copies: `.runs/review-whole-3/`.
- Range: base `97936c245cecfc11778fcf3d10feb075436d17fc` to head `523046f6` (compute `git diff` and `git log` yourself; confirm `git rev-parse HEAD`). The correction itself is `720d1d2a..523046f6` (commits `c52e3f78`, `38e60b50`, `c833dd17`, `e7072b97`, `16aadaf1`, `1054b372`, and the return step's `523046f6`); `720d1d2a` is the head the request was opened at, after a whole-change review (FAIL, then PASS after one fix),
  reviews of the return step and the foundation corrections, and a green CI run.
- Frozen task (read whole): `.runs/task-cycles/katalog-map/task.md`. Plan (read whole): `.runs/task-cycles/katalog-map/plan.md`. The human's remarks that this correction answers (read whole): `.runs/task-cycles/katalog-map/reports/correction-1-remarks.md`; the corrector's report (claims to verify): `reports/correction-1-report.md`; the return step's report:
  `reports/return-step-2-report.md`. The earlier whole-change review and its fix review: `reports/review-whole-report.md`, `reports/review-whole-fix-report.md` (their findings are fixed; their Minor findings left unfixed are listed in the request's description; do not repeat them unless the correction touches them).
- **What the human asked of THIS review (the remarks, points 2 and 3):** the review of the fix of point 1 is a review of the whole change; you read in full `guidelines/styleguide-browser-view.md` (whole, every line) and the four decisions that the change edits and that the earlier review did not open whole: D-439, D-440, D-441 and D-271, each whole with its
  *Rationale*, *Rejected*, *Relations* and *Verification* - and also each decision the correction edited (D-327, D-331, D-325, D-39, D-279, D-133, D-27, D-438 and what else the diff of `foundations/decisions.md` shows). Your **Unread material** must say that these were read whole, or name what stayed unread and why.
- Judge besides the task: the correction against the remarks (each of the four fixes: the card and the three places of the catalog, „z/ze", the fold, the sentence of D-438); the rest of the remarks (4, 5c, 6-9) ask for no change. Judge the departures that the corrector reports (the title at 15 px since no token above 16 px exists; the green bar by the existing role `positive` with its
  meaning extended in D-39 and an exception written into D-279; the button „Wejdź — wybierz postać" moving focus to „Kto idzie") against the styleguide, the decisions and the task: say in plain words which of them break a rule and which are choices for the human. The task's acceptance criterion is the human's from the pair of screenshots; you do not judge it.
- Trust boundary: yes (`src/browser/view/judging-cache.ts` and the files under `assets/**`: the correction adds `assets/icons/magnifying-glass.svg` from game-icons.net - check it like the other icons: prepared the same way, credit true, no script or external reference). No irreversible operation.
- Run besides your own selection of checks: `python -B .the-way/instruction-files/check_instructions.py` on the head (a warning is a finding), `python -B .the-way/elements/common/foundation_check.py` (no flag), the size checks as `whole_change.md` gives, typecheck, eslint and prettier on the changed files, and focused tests (one file at a time, `npm test -- <file>`; never the full gate)
  for the files the correction changed. The orchestrator runs the full local gate afterwards and CI runs on the request.
- Report path: `.runs/task-cycles/katalog-map/reports/review-whole-3-report.md` (the report file is the input of the cycle's scripts, the case Claude Code's refusal of files named `report...` leaves open). First line `PASS <sha>` or `FAIL <sha>` (or `questions`); name for each blocking finding the slice or the correction it comes from (or that it comes from none); list each Minor
  finding with its place in the code and say where one lies outside the task; state the number of decisions you read whole; checks with commands and exit codes; **Unread material**; **Searches not found or unclear**. Return the first line, the checks, the report path.
- `cycle.md` and other files of `.runs/task-cycles/katalog-map/` not named here are not yours to read.

## Working copies (the first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
