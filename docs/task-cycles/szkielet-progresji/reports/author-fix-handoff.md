# Handoff — the author, `make-change`, the fix of a review's findings

Task `szkielet-progresji`. You are the one author, resumed for the fix of the Minor findings of the whole-change review.

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; no answer here is that person's approval. Questions go to the orchestrator.

## Worktree

`the root of the task's worktree (the repository root)`, branch `task/szkielet-progresji`, head `216b8bf92c2a3784acadd6ba66cb3c88d39184b2`. Your directory for working copies: `.runs/author/` (the same rules as in your first handoff, `reports/author-handoff.md`, section "Working copies", which stand unchanged). Your report path: `.runs/task-cycles/szkielet-progresji/reports/author-fix-report.md` (the report is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it). Do not run the product's gate.

## Variant and findings

Method `.the-way/task-cycle/change/SKILL.md`, variant "the fix of a review's findings". The findings file (no blocking findings; one Minor finding within the task): `reports/fix-findings.md`, in `.runs/task-cycles/szkielet-progresji/`. Read it whole.

## What the cycle's rule asks, and the evidence it carries

The cycle fixes every Minor finding of the whole-change review that the reviewer has not marked outside the task's scope, and this one is marked "within the task". The method lets you answer with evidence a finding you hold wrong. The evidence you must weigh before you change anything — the frozen task's *To do* item 1 and *Decisions in play* (`.runs/task-cycles/szkielet-progresji/task.md`) require the definition sentence "w brzmieniu rzutowanym z definicji projektu", the projected sentence being, word for word:

> A map that asks for something new — an item, a spell or another idea of a program — and without it is solved rarely.

and the reviewer's own finding says that changing it "means departing from the meaning approved at the readiness approval, so it belongs to the human, not to a fix of this cycle".

Decide, and say which in your report:

1. If a wording exists that makes the sentence a full sentence with a main verb and leaves every word and the meaning of the projected sentence in place (for instance only by adding the subject and verb in front, with the projected text otherwise unchanged), you may make that fix and commit it by path; state in the report exactly what was added and that no word of the projected sentence was removed or reworded. Do not touch the "item, a spell or another idea of a program" list: that second point is a reading note the reviewer says needs the human.
2. If the fix cannot be made without departing from the projected wording, make no change and no commit, and answer the finding with that evidence (the task passage above) in your report.

Either way, run the affected checks again (`python -B .the-way/elements/common/foundation_check.py`, `git diff --check`) and give each with its command and exit code.

## Report

As in your first handoff: status, commits (or none), checks with command and exit code, own-work check, **Unread material**, **Searches not found or unclear**, working copies and their removal, and the text of the entry as it stands.
