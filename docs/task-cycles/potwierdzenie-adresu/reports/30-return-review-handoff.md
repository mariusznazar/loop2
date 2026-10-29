# Handoff — review of the return step, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh reviewer; you made none of this
change. Read-only: never change the worktree, its index or branch; a check needing changed files
goes in a separate worktree of the head, removed when done. Questions go to the orchestrator, never
to the human.

- Worktree: `C:/Storage/repos/loop2-wt/potwierdzenie-adresu`, branch `task/potwierdzenie-adresu`.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`), read whole.
- What is reviewed: **the return step's commits**, range `28f0686..7247c09` (one commit,
  `7247c09`: `foundations/decisions.md`, `foundations/environment_facts.md`,
  `foundations/part_map.md`). Review it as the method gives for the return step: against the task
  and the foundation entries the return step writes or corrects, and against the code they
  describe (the whole change `7a633a7..28f0686`, reviewed `PASS 28f0686`).
- The return step's rules: `.the-way/task-cycle/skill/return_step.md` and
  `.the-way/task-cycle/skill/foundation_step.md`.
- The author's report: `.runs/task-cycles/potwierdzenie-adresu/reports/29-return-step-report.md`
  — claims to verify, not evidence.
- Frozen task: `.runs/task-cycles/potwierdzenie-adresu/task.md` (whole); spec:
  `.runs/task-cycles/potwierdzenie-adresu/spec.md`; the entries written earlier and their plan
  rows: `reports/06-foundation-report.md` § "Entries written".
- Foundation entries the commit touches, each whole: D-111, D-144, D-145, the new environment fact
  `samesite-strict-cookie`, the part map's `account-server` entry; and what these link to as far
  as the review needs. Code they describe: `src/server/configuration.ts`,
  `src/browser/view/email-confirmation.ts`, `src/browser/view/email-status.ts`,
  `src/browser/view/app.ts`, `src/server/account-mail.ts`.
- Guideline files, each whole: `guidelines/coding.md`.
- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/30-return-review-report.md`, first
  line `PASS 7247c09` or `FAIL 7247c09`, or `questions`.
- Do not run `npm test` without a file. Never deploy, touch the server or connect to
  `outsider.mikr.us`.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**`, keys and the deployment.
- Irreversible operation: **yes** — schema step 3 of `loop2_accounts` on the test server (H4, the
  merge); the cycle only prepares it.

## Return

Return only your report's first line and its path.
