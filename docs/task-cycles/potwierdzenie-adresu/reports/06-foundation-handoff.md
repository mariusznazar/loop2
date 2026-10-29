# Handoff — the plan's *Foundation entries*, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh agent writing the plan's
*Foundation entries* — the foundation step of the planned route, before Slice 1. You take no row
of `make-change`'s table of variants; your stage is the foundation step. Questions go to the
orchestrator, never to the human; you return before any slice's code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\potwierdzenie-adresu`, branch
  `task/potwierdzenie-adresu`, head = base `7a633a7`. Process pin `.the-way` at `3aee7d9`.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`) for reading,
  checks, commits and the report; and `.the-way/task-cycle/skill/foundation_step.md`, which says
  what the foundation step writes and when a question reaches the human. Read both whole. Write each
  entry through the pinned skill of its element — `.the-way` project skills
  `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact`,
  `the-way-record-glossary-term`, `the-way-update-part-map` — reading each element's skill when you
  write an entry of that element, and selecting the foundation as that skill's step 1 gives.
- Frozen task: `.runs/task-cycles/potwierdzenie-adresu/task.md` — read it whole (its *Decisions in
  play*, *Settlements to record* and *Questions to settle* carry the meanings).
- Reviewed spec: `.runs/task-cycles/potwierdzenie-adresu/spec.md` — its *Decisions* give the design
  the entries rest on, its *Foundation entries* lists them.
- Plan: `.runs/task-cycles/potwierdzenie-adresu/plan.md`, section *Foundation entries* (rows
  F1–F33) — your work list, by that section's address; F1–F33 are the plan's labels, not
  identifiers. Its *Choices* row on F31 holds: **F31 is not yours** — Slice 2 writes the part
  map's claim of `tests/account-mail.test.mjs` with the file.
- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/06-foundation-report.md`
- The product's instructions: `AGENTS.md` in the worktree. Commit on the task branch by explicit
  paths (`git add <path>…`), English messages in the repository's style
  (`docs: :memo: …`). Do not push. Do not run `npm test`; run
  `python -B .the-way/elements/common/foundation_check.py` as your focused check.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**`: a session-less confirmation route, a session route
  that triggers a send, an outbound SMTP connection with a credential read from a file, new startup
  configuration, a schema step. Every code review checks crafted input there.
- Irreversible operation: **yes** — schema step 3 of the persistent `loop2_accounts` database on
  the test server, run by the human's deployment (H4) and by the merge (D-11). The cycle prepares
  it and never performs it; no agent deploys, sends real mail or touches the server (D-12).

## Answers the orchestrator gives for this step

- **Partial projected entries (F23–F27).** The plan item in `plan_mvp_loop2.md` assigns writing
  these five projected entries to task 21, but the accepted task document, *Decisions in play*,
  says: "Zapisuje część wpisu, którą jego kod czyni prawdziwą (WAY-126), a resztę dopisuje zadanie
  zapisujące." and the reviewed spec holds that reading after its review. Write the part this
  change's code makes true, as F23–F27 give, each marked so the later task completes it. Do not
  treat them as "falling to another item". F24's second sentence (delivery from the intended
  container in a real test) is **not** written now: H4 has not run.
- **F4 (D-44, „Wysyłanie…”).** The meaning was approved by the human in the task's answer 3
  (WAY-172); write the D-44 change. The styleguide file's text is Slice 8's.
- **F32 (the testing meaning of To do 13).** To do 13 asks that "nowe znaczenie zatwierdza
  człowiek tak, jak daje WAY-172", and the task document does not itself state that meaning. Judge
  it against the current entries: D-84 (“A test of file or HTTP failure uses … a real local
  server … controlled responses test reactions to forced failures without proving the replaced
  operation.”), D-79 and D-73, and `guidelines/testing.md`'s row „Czy kod rozmawia z cudzą
  usługą?” (today only the npm registry, whose real contract the gate's audit checks). Where the
  meaning spec Decision 9 needs — a real SMTP server on loopback for the mailer, a stand-in mailer
  for the routes, and no test that reaches the real Outsider, its contract left to the human's
  delivery test H4 — is already carried by a current decision, tie F32 to it and write nothing new.
  Where it is not, write the proposed decision (new, or a change of D-84) on the branch through
  `the-way-record-decision`, commit it with the other entries, and return `blocked` with that
  question for the human, its options and your recommendation, as `foundation_step.md` gives —
  WAY-172 places its approval at a blocked draft request before the code that uses it.
- Every other question of the human the foundation step allows: write what you can, commit, and
  return `blocked` naming each question with its options and recommendation.

## What to read

Each element's skill selects the foundation entries it needs (its step 1), and step 2 of each runs
its search of the whole foundation for the entry's question. Start from the entries the plan's
rows and the task's *Decisions in play* name: D-13, D-17, D-44, D-84, D-73, D-79, D-105, D-109,
D-111, D-112, D-137; invariants `account-schema-lifecycle`, `account-database-schema`,
`account-startup-configuration`, `loop2-host-sharing`, `account-session-authorization`,
`account-mutation-request-guards`, `account-client-outcomes`, `blocked-account-access`,
`player-server-session`, `unblock-restores-no-session`; the part map (short, read whole); the
glossary entries the entries use.

For F29 (the Nodemailer 10 `requireTLS` fact) the spec's *Constraints* cites its source — the
Nodemailer 10.2.1 package, `dist/cjs/smtp-connection/index.js`; install nothing into the
worktree's `node_modules`. You may fetch the package from the npm registry into a directory under
`.runs/` to read it; name each such reach in your report.

## Return

Commit your entries, write your report as `make-change` gives — for each entry: its identifier,
its kind, the plan row it settles and one sentence of its meaning in Polish for the request — and
return your status, your commits, the one-line check result and the report's path.
