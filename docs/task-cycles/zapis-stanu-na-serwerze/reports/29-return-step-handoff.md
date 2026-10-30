# Handoff — return step, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the agent of the **return step**, a fresh
agent: on the planned route the return step is taken by a fresh agent with `make-change`. Your
questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`, head `582e9be` (the reviewed change). Process pin `.the-way` at
  `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` — read it whole; your stage is the return step,
  which takes none of its variant rows. Read `.the-way/task-cycle/skill/return_step.md` and
  `.the-way/task-cycle/skill/foundation_step.md` whole: the return step writes as the foundation
  step writes. Read the skill of an element (`.claude/skills/the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-environment-fact`, `the-way-record-glossary-term`,
  `the-way-update-part-map`) when you write or correct an entry of that element.
- Frozen task: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`; spec `spec.md`; plan `plan.md`
  (same directory).
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/29-return-step-report.md`
- Commit by path on the task branch (English messages in the form of the existing commits). Do not
  run the whole gate; run `python -B .the-way/elements/common/foundation_check.py` and the focused
  checks of anything you change, each with command and exit code.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**` (save routes, schema step 4) and
  `src/browser/sim/saved-game.ts`.
- Irreversible operation: **yes** — schema step 3 → 4 on the test server's `loop2_accounts`, run by
  the human's H1 and H2 and by the merge; the cycle only prepares it.

## What the change wrote, for your comparison

- Foundation entries (`fb1ef9d`, D-97 fixed in `59cd18a`): new D-179 – D-190; changed D-04, D-07,
  D-96, D-97, D-104, D-109, D-112, D-156 (D-53's and D-134's rationales touched); new invariants
  `player-save-isolation`, `expired-session-unsaved-progress`, `account-save-sqlite-store`,
  `saved-state-http-exchange`, `save-version`; changed `account-mutation-request-guards`,
  `account-schema-lifecycle`, `account-database-schema`, `account-session-authorization`,
  `blocked-account-access`, `account-save-durable-storage` (relinked; its *Violated: yes* stays
  until H2 — plan row 31, work after H2, is not yours); new environment facts
  `fetch-keepalive-body-quota`, `visibilitychange-hidden-last-event`; part map: `account-server`'s
  sentence and `simulation`'s *Trust boundary* (`src/browser/sim/saved-game.ts`).
- Code and tests: Slices 1–6 and the whole-change fix, `fb1ef9d..582e9be`; guidelines: Slices 7–8;
  the deploy skill: Slice 9 and its fix.
- Points the reviews raised that bear on the foundation (judge them; correct what no longer
  matches, as your method gives): the foundation agent wrote the five new invariants `Method: test`
  before their tests existed (`reports/06-foundation-report.md`) — their tests now exist, check each
  invariant's *Check* names them; Slice 6 changed `src/browser/view/program-panel.ts` so a loaded map
  run shows the copy (D-189); the whole-change review's Minor findings
  (`reports/26-whole-review-report.md`, § Minor) and the slice reviews' Minor findings
  (`reports/25-slice-minor-findings.md`) are not yours to fix unless one shows an entry that no
  longer matches the code.

## Return

Write your report as `return_step.md` gives, and return your status, your commits (or none), a
one-line check result and the report path.
