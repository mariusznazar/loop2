# Handoff — the one author

Delegation: the person who requested this cycle has delegated intermediate choices to the
orchestrator of `implement-task`; nothing here is that person's approval.

- Worktree (work only here, from its root): `the task's worktree`, branch `task/slowa-procesu-w-dwoch-znaczeniach`, base `331688e00b0d5a3cc82ffa13f0d54aeb92c30733`.
- Method: `.the-way/task-cycle/change/SKILL.md`. Your variant: "the whole change as the one author". Read that `SKILL.md` whole; read a file it names only when the step or variant that names it comes.
- Stage and boundary: make the change of the task, do the foundation step with it, commit, write your report, and return. Do not review, do not run the product's gate (`npm test`, `foundation_check.py`): the orchestrator runs it. You may run focused checks of your own (for example `git diff`, `git grep`).
- Frozen task (read whole): `docs/task-cycles/slowa-procesu-w-dwoch-znaczeniach/task.md`. Source: the task document `zadanie_loop2_slowa_procesu_w_dwoch_znaczeniach.md` of the author's private backlog, `Status: ready for cycle`, accepted 2026-11-08. No spec and no plan exist: step 4 found no open design choice.
- Answers of step 4: trust boundary — no (part `product-foundation`, trust boundary `none`); irreversible operation — no; open design choice — none; route — one author without a plan.
- Report path (write it there, in the form `task-cycle/change/SKILL.md` gives): `docs/task-cycles/slowa-procesu-w-dwoch-znaczeniach/reports/author_report.md`.

## Reconciliation the orchestrator made

The task lists line numbers of `foundations/decisions.md` at loop2 `01b26d5`; the base is `331688e`, three foundation commits later (D-166, D-288, D-311, D-349, D-350). The six places are unchanged in wording but their lines moved: D-23 *Verification* line 546, D-103 *Verification* line 1910 and *Rationale* line 1914, D-109 *Rejected* line 1995, D-120 *Rejected* line 2184, D-253 binding sentence line 5167, D-309 *Rejected* line 6682. Locate each place by its wording, not by a line number.

## What to change (copied from the task's *To do*, word for word)

1. D-23, pole *Verification*: „since a sentence naming what a kind of condition may take” czyta „since a sentence of this decision naming what a kind of condition may take”.
2. D-109, *Rejected*: „and one more sentence here” czyta „and one more sentence in this decision”.
3. D-120, *Rejected*: „while leaving the sentence unchanged” czyta „while leaving this decision's sentence unchanged”.
4. D-253, zdanie wiążące: „which the sentences above ask no more of” czyta „which the sentences of this decision above ask no more of”.
5. D-309, *Rejected*: „and the approved sentence gets an exception” czyta „and the approved sentence of D-308 gets an exception”.
6. D-103, pole *Verification* i *Rationale*: „a full gate refuses immediately” czyta „a full password gate refuses immediately”, a „The measured gate shares the host processor” czyta „The measured password gate shares the host processor”; zdanie wiążące D-103 („One bounded gate without a waiting queue covers password hashing and verification”) zostaje bez zmian.

Acceptance criterion: apart from the places of points 1–6 the change alters no sentence of the foundation. The wording of a line break inside a sentence may differ from the one-line quotation above — keep the file's own line wrapping and its width rule if the file has one, and change no word beyond the stated insertion. Settlements to record: none. Out of scope: withdrawing qualifiers added under the earlier wording of WAY-104; reviewing the rest of the foundation.

## What to read

- Rule the change follows: WAY-104 in `.the-way/foundations/decisions.md` (whole entry, with its *Verification* examples „complies”/„violates”).
- Entries of `foundations/decisions.md`, each whole, from its heading to the next heading: D-23, D-103, D-109, D-120, D-253, D-308, D-309, and D-225 (it names D-109's sentence and that sentence stays).
- `foundations/part_map.md`: the entry `product-foundation`. That part has no guidelines and no tests of its own.
- Foundation step: `.the-way/task-cycle/skill/foundation_step.md` (whole). Each edit of a decision is written through the project skill `the-way-record-decision` (its `SKILL.md` is `.the-way/elements/decisions/skill/SKILL.md`; read it whole, and the files it names when its step comes); write no decision by hand outside it.
- Glossary: `foundations/glossary.md` (short) and the glossary of the-way at `.the-way/foundations/glossary.md`, for the terms „sentence” and „gate”.

## Commits

English messages in the style of the repository's history (`docs: :memo: …`). Commit with explicit paths (`git add <path>`), never `git add -A` or `git commit -a`. Leave the worktree clean. Do not push. The ignored `.runs/` is the cycle's and is not committed.
