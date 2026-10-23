# Handoff 30 — return step

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You take the cycle's return step. Questions go to the orchestrator, never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`, head and
  base of this step `b33aa2761e00fef538c569dc5860ecef4dd28e62`. You alone write in it now.
- Method: the project skill `the-way-make-change` — read `.the-way/task-cycle/change/` of the pinned
  the-way `f0b2130` whole. This stage is step 11 of `.the-way/task-cycle/skill/SKILL.md` (the
  paragraph "11. Take the return step"); read it whole, and the paragraph "The foundation step
  writes the entries the task carries" it refers to. Write each entry through its pinned element
  skill — this product's project skills `the-way-record-decision`, `the-way-record-invariant`,
  `the-way-record-environment-fact`, `the-way-record-glossary-term`, `the-way-update-part-map`.
- Read the product's `AGENTS.md`, follow its git and test rules; commit by explicit paths, English
  messages; do not push.

## Stage and boundary

Compare with the code the entries the change writes or changes, those the task names and those the
search of the foundation finds, and the part map of the touched parts; correct in this change
whatever no longer matches; write what step 11 names. No change to product behaviour; no review
finding becomes a foundation entry merely for being a finding.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; spec `spec.md`; plan `plan.md`.
- Cycle record `cycle.md` — questions table (answers bind) and *Events*.
- Foundation report `reports/07-foundation-report.md`; whole-change review
  `reports/29-whole-review.md` (its "Concerns" name candidates for this step, in the reviewer's
  words: S1-M1 "will" in D-39; S1-M2 the `browser-view-focus-outline` sentence read literally;
  S1-M3 Geist Mono placement and token naming carried by no decision; S1-M6 `design-token-sources`
  drops "directly"; S1-M7 D-43's example `var(--space-8)`; S2-3 `geist-licence` cites the readme at
  `d1d9ce6`, not the release commit `1d6dfdb`; S4-m6 the row-11 test rests on CSS Fonts 4 generic
  families and CSS Cascade 5 CSS-wide keywords, which no fact holds). Judge each against step 11:
  correct an entry that no longer matches the code; write a source outside the product the change
  rests on as an environment fact, read from the source, never from memory; write a choice that
  binds after the merge only as step 11 allows.
- Answers of step 4: trust boundary — yes (`assets/icons/**`, `assets/fonts/**`,
  `scripts/kitchen-sink.mjs`); irreversible operation — no.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/30-return-report.md`, filling what the
  record's "Return step" section asks (foundation compared with code; decisions, invariants, facts,
  glossary terms, part-map changes written or changed; rows written), each entry with one sentence
  of its meaning in Polish, every check with command and exit code.
- Return: status, head commit (or that nothing was committed), report path, a one-line check
  result, and every concern the next dispatch depends on.
