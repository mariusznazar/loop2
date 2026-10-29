# Handoff — reconciliation with the target branch, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh agent making the reconciliation of
the task branch with `main` (step 12 of `implement-task`). Questions go to the orchestrator, never
to the human.

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/potwierdzenie-adresu`, branch
  `task/potwierdzenie-adresu`, head `7247c09` (the whole change, reviewed, and its return step,
  reviewed).
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`) for reading,
  checks, commits and the report. Variant: none of its rows fits exactly; follow its reading,
  check, commit and report rules.
- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/31-reconcile-report.md`.
- Commit by explicit paths; English messages. Do not push. Do not run the whole gate (the
  orchestrator runs it after you). Never deploy or touch the server.

## What happened on `main`

`origin/main` moved from the base `7a633a7` to `4bfb962` (15 commits, PR #38, task
`walka-w-glebi-lasu`). It added decisions **D-140 to D-151** of its own (combat, and D-128, D-131,
D-136 changes). This branch also wrote new decisions numbered **D-140 to D-151** (email
confirmation; see `reports/06-foundation-report.md` § "Entries written"). Both sides touch
`foundations/decisions.md`, `foundations/invariants.md` and `src/browser/styles.css`.

## What to do

1. **Renumber this branch's decisions before merging**, in one commit on this branch: this
   branch's D-140 → D-152, D-141 → D-153, … D-151 → D-163 (add 12), in every file of the branch
   that names them — the decision log's headings and every *Relations*, *Derives from*,
   *Verification* and citation, `foundations/invariants.md`, `foundations/environment_facts.md`,
   `foundations/part_map.md`, `guidelines/*.md`, `src/**`, `tests/**`, `.claude/skills/**` and
   `.agents/skills/**`. At `7a633a7` no file named D-140 or above, so every such mention on this
   branch is this branch's own. Check with `git grep -nE "D-1(4[0-9]|5[0-9]|6[0-3])\b"` before and
   after; keep the two skill copies byte-identical. Keep the order of the log: entries stay in the
   place they are, with their new numbers.
2. **Merge `origin/main` into the task branch** (`git merge origin/main`, a merge commit; never
   rebase, never force). Resolve each conflict keeping both sides' meaning: main's decisions
   D-140–D-151 stay as main wrote them, this branch's D-152–D-163 follow; in
   `foundations/invariants.md` and `src/browser/styles.css`, keep both sides' entries and rules.
   Where an entry both sides changed (for example a *Verification* list or *Relations*), keep both
   additions. Where a decision of either side now names the other's (the decision log's search
   for the same question, WAY-33), report it; do not invent relations.
3. **Check:** `python -B .the-way/elements/common/foundation_check.py` (exit 0, 0 errors); `npm run
   typecheck`; the focused tests of files where a conflict was resolved or a citation changed —
   at least `npm test -- tests/http.test.mjs`, `npm test -- tests/account-storage.test.mjs`,
   `npm test -- tests/view/status-row.test.mjs` and every `tests/view/*.test.mjs` main changed
   that reads `styles.css` classes, and `npm test -- tests/quality/test_quality_invariants.py`.
   Report each with its command and exit code.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**`, keys and the deployment.
- Irreversible operation: **yes** — schema step 3 of `loop2_accounts` on the test server (H4, the
  merge); only prepared. Check that main's change carries no schema step of its own that collides
  with step 3 (task 19 wrote step 2; this branch step 3); report what you find.

## Return

Write the report — the renumbering map, every conflict and how you resolved it, the checks — and
return only your status, your commits, the one-line check result and the report's path.
