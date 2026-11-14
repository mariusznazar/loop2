# Handoff — review of the whole change, `review-change`

You review the whole change of one task of the-way task cycle of the repository loop2, as an agent
that did not make it. You are read-only: you change no file of the worktree. The person who
requested this cycle has delegated intermediate choices to the cycle's orchestrator; you send
questions to the orchestrator and never ask the human.

- **Variant:** the review of the whole change.
- **Worktree:** `the repository root (the task's worktree)`, branch `task/zasieg-lintera-i-formatera`. Work from its root; the pinned the-way is its `.the-way` at `55afa8e57aa1b83c77108576a36642722e0dda15`.
- **Method:** `.the-way/task-cycle/review/SKILL.md` — read it whole; then `whole_change.md` beside it, as it tells you; a file it names only when the step or variant that names it comes. You select your own foundation and guidelines by "Reading the foundation" (`.the-way/elements/common/way_of_working.md`) and `.the-way/product-guidelines/reading.md`, and count the decisions you read whole and by title, as the skill says.
- **Range:** base `aa0ecd09a1037e3aff0ac2bcfc786f2707352929` (the remote target branch `origin/main` when the branch was made) to head `8d211cbe` (confirm with `git rev-parse HEAD`; the full hash is whatever `HEAD` gives). Three commits: `006e5e40` (the new test, red on purpose), `e401b2bd` (configuration), `8d211cbe` (foundation entries and `guidelines/coding.md`). Compute the diff yourself: `git diff aa0ecd09..HEAD`, `git log aa0ecd09..HEAD`.
- **Frozen task (read whole, it is in Polish):** `docs/task-cycles/zasieg-lintera-i-formatera/task.md`. It was accepted by the human on 2026-11-13; its *Settlements to record* rows 1–3 are accepted with it. Judge the change against every item of *To do*, *Acceptance criteria*, *Decisions in play* and each of the three settlement rows; report the coverage of each by number.
- **Spec and plan:** none (no open design choice; one author without a plan; no slices, so no slice had a review of its own — the review of the whole change is the one review of all of it).
- **Author's report (claims to verify, not evidence):** `docs/task-cycles/zasieg-lintera-i-formatera/reports/author-report.md`. It also holds the foundation entries' meaning sentences (English and Polish) and their marks — judge them as an entry's meaning against its row.
- **Answers of step 4:** trust boundary — no; irreversible operation — no. Class of the author: `same`.
- **The task moved no pin.** The task's measurements were taken on `fc00c406`; the base is 8 commits newer, none touching the task's scope.
- **The orchestrator runs the product's full gate (`npm test`) on the final tree**; you do not run it. Run the focused checks you need to judge (for example the new test, and the acceptance criterion: that the new test, run on the configuration of the base, fails and names the ten files — the author's way of producing that state is in its report; judge whether you can reproduce it, for instance by checking the base's `eslint.config.mjs`, `.gitattributes` and `PRETTIER_PATTERNS` out into a temporary place under `.runs/` and not into the worktree's tracked files). Each check you report carries its command and exit code. Beyond the focused checks, test the weakest point yourself: that the new test stops the gate for a *new* file and for a *weakened* rule, not only for today's ten files.
- **Report path:** `docs/task-cycles/zasieg-lintera-i-formatera/reports/review-whole-report.md`. Its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`); grade each finding as the skill gives, and say for each whether it is within the task or outside its scope. The report holds **Unread material** and **Searches not found or unclear** (each `none` where it applies).

Return the report's first line, the changed files with their line counts, a one-line check result naming what failed or did not run, and the report path.
