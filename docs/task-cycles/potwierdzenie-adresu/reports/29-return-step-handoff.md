# Handoff — the return step, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh agent taking the **return step**
(step 11) of a planned cycle. You take no row of `make-change`'s table of variants; your stage is
the return step. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/potwierdzenie-adresu`, branch
  `task/potwierdzenie-adresu`, head `28f0686` (the whole change, reviewed: `PASS 28f0686`).
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`) for reading,
  checks, commits and the report; `.the-way/task-cycle/skill/return_step.md`, what the return step
  compares and writes; and `.the-way/task-cycle/skill/foundation_step.md`, since the return step
  writes as the foundation step writes. Read all three whole. Write each entry through the pinned
  skill of its element (project skills `the-way-record-decision`, `the-way-record-invariant`,
  `the-way-record-environment-fact`, `the-way-record-glossary-term`, `the-way-update-part-map`),
  reading an element's skill when you write an entry of that element.
- Frozen task: `.runs/task-cycles/potwierdzenie-adresu/task.md` (whole); reviewed spec:
  `.runs/task-cycles/potwierdzenie-adresu/spec.md`; plan: `.runs/task-cycles/potwierdzenie-adresu/plan.md`.
- The entries the change writes or changes, with their plan rows:
  `reports/06-foundation-report.md` § "Entries written" (and its § "Revision for question 2").
  D-151 was approved by the human 2026-10-29 (request #37).
- The touched parts: `account-server`, `browser-view`, `deployment`, `build-tools`,
  `agent-workflow`, `product-foundation`. The range of the whole change: `7a633a7..28f0686`.
- F24's second sentence (delivery of the confirmation message from the intended container in a
  real test) stays unwritten: H4, the human's delivery test, has not run. Do not write it.
- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/29-return-step-report.md` — fill it
  so the orchestrator can copy the cycle record's *Return step* section from it: foundation
  compared with code; decisions, invariants, environment facts, glossary terms and part-map
  changes written or changed (identifiers, or none); projected entries written whole or in part;
  rows of *Settlements to record* written. For each entry you write or change, one sentence of its
  meaning in Polish for the request.
- Commit by explicit paths, English messages (`docs: :memo: …`). Do not push. Do not run the whole
  gate; run `python -B .the-way/elements/common/foundation_check.py` and any focused test an entry
  you change cites.
- Never deploy, touch the server or connect to `outsider.mikr.us`.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**`, keys and the deployment.
- Irreversible operation: **yes** — schema step 3 of the persistent `loop2_accounts` database
  (H4, the merge); the cycle only prepares it.

## Note

The review of the whole change (`reports/28-whole-review-report.md`) lists Minor findings; they go
to the request's list for the human, and are no foundation entries. Where your own comparison of
an entry or the part map with the code finds a mismatch, correct it as `return_step.md` gives,
whatever a review said.

## Return

Commit what you write, write the report, and return only your status, your commits (or none), the
one-line check result and the report's path.
