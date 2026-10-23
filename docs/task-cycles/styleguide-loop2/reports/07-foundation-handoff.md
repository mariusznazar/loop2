# Handoff 07 — foundation entries (before slice 1)

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the agent that writes the plan's *Foundation entries*. Questions go to the orchestrator,
never to the human; the human accepts the entries by merging the request.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Base of
  this row and of slice 1: `00e53aee5bd21692ddd3b2f7c7541625a3114a3f`. You alone write in this
  worktree now.
- Method: the project skill `the-way-make-change` — read `.the-way/task-cycle/change/` (its skill and
  every file it names) of the pinned the-way `f0b2130` whole and follow it. This stage is the
  foundation step of `.the-way/task-cycle/skill/SKILL.md`: read the paragraph that begins "The
  foundation step writes the entries the task carries" (section "Execute, verify and review") whole.
- Write each entry through the pinned skill of its element, i.e. this product's project skills
  `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact`,
  `the-way-update-part-map` (and `the-way-record-glossary-term` where a search finds a term). Each
  reads its skill from `.the-way/elements/<element>/skill/`. Never a personal skill of the same name.
- Read the product's `AGENTS.md` and follow its git and test rules. Commit by explicit paths
  (`git add <path> …`, never `-A`/`.`), English commit messages in the repository's style
  (`docs: …` for foundation entries, as `git log` shows). Do not push.

## Stage and boundary

Write exactly the entries of `plan.md`, section "Foundation entries", on the task branch, commit
them, and return. No code, no test, no guideline, no instruction file — slices 1–9 make those.

## Inputs

- Frozen task: `.runs/task-cycles/styleguide-loop2/task.md` — its *Settlements to record*, rows
  1–20, bind: each row whole, as an entry of its kind, its meaning the row's and its wording yours;
  its *Questions to settle* and *Context* hold the sources.
- Reviewed spec: `.runs/task-cycles/styleguide-loop2/spec.md` (its section "Foundation entries" and
  Decision 8a).
- Plan: `.runs/task-cycles/styleguide-loop2/plan.md`, section "Foundation entries" (the table, the
  pattern table and the paragraph on test names).
- Cycle record: `.runs/task-cycles/styleguide-loop2/cycle.md`, questions table — QA-1..QA-4, R1,
  Q-P1, Q-P3, Q-P4 bind.
- Answers of step 4: trust boundary — yes (`assets/icons/**`, `assets/fonts/**`,
  `scripts/kitchen-sink.mjs`); irreversible operation — no.

## Notes the plan's review carries for you (Q-P4, Q-P3)

- The focus invariant (row 12) rests on the WCAG 2.2 2.4.7 fact (row 18). The contrast invariant
  (row 13) rests on the 1.4.3 and 1.4.11 facts (rows 16, 17) and on the fact of WCAG 2.2's
  definitions of "contrast ratio" and "relative luminance" (QA-4).
- Environment facts that quote a source are read from the source, never from memory: WCAG 2.2 at
  https://www.w3.org/TR/2024/REC-WCAG22-20241212/ (the three criteria verbatim as the task's
  *Context* gives them — verify against the page — and the two definitions, with their constants);
  the Geist licence from the README of https://github.com/vercel/geist-font. Record the date you read
  each. If you cannot reach a source, return `blocked` naming it.
- Row 10 changes D-28 in place; `guidelines/coding.md` restates D-28 and Slice 1 brings it in line —
  do not edit it here, but note in your report whether the foundation check complains.
- Name each invariant and its test file by the repository's convention (look at
  `foundations/invariants.md` and `tests/invariants/`). Where your identifiers give test file names
  other than the plan's proposal, use yours in the part-map lines and report the five names.
- The part-map lines include `src/browser/AGENTS.md` under `agent-workflow` (plan choice C9).
- After your commit, `python -B .the-way/elements/common/foundation_check.py` is expected to exit 1
  with exactly the pattern errors of the plan's pattern table (Q-P1, plan choice C2) and no other
  error. Report its full error list.
- For the request, keep one sentence of each entry's meaning in Polish (the task document's
  language), and for each row tied to an entry already stated, both.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/07-foundation-report.md`, as
  `make-change` gives it, with the identifiers written, the meaning sentences, the read dates of
  the sources, and every check with its command and exit code.
- Return: status (`done`, `done with concerns`, `questions`, `returned` or `blocked`), head commit,
  report path, a one-line check result naming what failed or did not run, and every question or
  concern the next dispatch depends on.
