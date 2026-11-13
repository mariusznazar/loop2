# Handoff — the return step, task oboz-w-siedzibie

## Delegation

As before: the orchestrator has the person's delegation; you never ask the human; questions go to the
orchestrator in your report. Never label an answer as the human's approval.

## Stage and boundary

- You are the one author, resumed for the return step (your class `same`). Your stage is the return
  step: `.the-way/task-cycle/skill/return_step.md` — read it whole; and
  `.the-way/task-cycle/skill/foundation_step.md` whole, since the return step writes as the foundation
  step writes; and the skill of an element when you write an entry of that element
  (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`,
  `the-way-record-environment-fact`, `the-way-update-part-map`).
- Where you work: `the old game's repository on the author's disk2-wt\oboz-w-siedzibie`, branch `task/oboz-w-siedzibie`, from
  head `9dd6ab22621748cb352c6b2c978a7db5512b1b51` (the fix of the review's Minor findings, reviewed:
  `reports/review-2-report.md`, `PASS 9dd6ab22…`).
- The frozen task: `docs/task-cycles/oboz-w-siedzibie/task.md`; the whole change's range is
  `2b4d760c517a8b399b2d9b80f77531455e32d11c..9dd6ab22621748cb352c6b2c978a7db5512b1b51`.
- Compare the foundation with the code as the return step gives: the entries the change writes or
  changes (D-272, D-271, D-389, `loop2-container-sprites`), those the task names (*Decisions in play*),
  those a search of the foundation finds, and the part map of the touched parts (browser-view,
  simulation, deployment, agent-workflow, product-foundation). Correct in this change what no longer
  matches. Write an invariant only for a rule the task, a decision or the human sets. A foundation
  entry you write or change is committed; commit nothing if nothing changes (then report `none`).
- Things the reviews raised that bear on this step (judge each; correct what is a mismatch of an entry
  with the code, leave what is a matter of the request's list):
  - the two Minor findings left for the request: M2 (the title of D-271 does not name the camp; the
    method has no way to change a current decision's question) and the new N1 of the review of the fix
    (the styleguide rule "The camp of Siedziba" says "no name for screen readers", D-389 says "hidden
    from readers"; the code hides the camp with `aria-hidden`) and N2 (the new case "the clearing has
    no clear pixel" cannot fail on today's file) — `reports/review-2-report.md` gives them in full. N1
    is a mismatch of a rule with D-389 and the code: correct it if you agree, within this return step.
  - the `loop2-container-sprites` invariant is **unchecked on this computer** (no Docker daemon; its
    Python test skips and the gate still exits 0): do not claim it passed; say in your report what
    the entry and its *Verification* promise and what ran.
  - the file table of `guidelines/coding-browser-module.md` needs no row for the two new view files
    (the review judged it; do not edit it).
- Do not run the product's full gate; the orchestrator does. Run the focused checks of what you touch
  and report each with command and exit code. Commit as before (path-wise `git add`, English messages
  with the type and emoji); do not push.

## Report

Write it to `docs/task-cycles/oboz-w-siedzibie/reports/return-report.md`: status, commits, a one-line
check result, the path; the return step's items as `task-cycle/record_template.md` lists them
under *Return step* (foundation compared with code, decisions, invariants, environment facts, glossary
terms, part-map changes, projected entries written whole or in part, rows of *Settlements to record*
written — row number and identifier), your own-work check, **Unread material** and **Searches not
found or unclear** (each `none` where nothing).
