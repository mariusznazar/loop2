# Handoff — the one author: the shortened `guidelines/coding.md`, in two places

The person who requested this cycle (Mariusz) delegated intermediate choices to the cycle's
orchestrator; nothing you answer or choose is his approval. Ask the orchestrator only through your
report (`questions` status); do not seek the human.

Method: `.the-way\task-cycle\change\SKILL.md`
(the pinned the-way; read it whole, and a file it names when the step that names it comes).
Variant: **the whole change as the one author**.

## Worktrees and branches (two, never edit one from the other)

1. **Main change.** Worktree `the worktree of the task`, branch
   `task/proba-krotszych-wytycznych` (base `df0f1256fe7ff85bca7c77f938900d8932168719`). This is the
   change that goes into the request and can reach `main`.
2. **Trial file.** Worktree `the worktree of the trial file branch`, branch
   `trial/shorter-coding` (same base). A measurement copy; it is never merged and never pushed.

Both worktrees have `.the-way` checked out at the pinned commit and `node_modules` linked. Run the-way's
scripts from the worktree's root as `.the-way/<path>`. Commit only with `git add <path>`
for the paths you changed (never `git add -A`, `.` or `commit -a`), messages in English in the
repo's form (`docs: :memo: <what>`; look at `git log --oneline -8`).

## The task

The frozen task: `docs/task-cycles/proba-krotszych-wytycznych/task.md`
(read whole). Your part is its To-do items 1 and 5 as a text change: you shorten
`guidelines/coding.md` by the classification of its sentences that two independent agents made. You
do not write the trial tasks, the tests of the measurement or run any agent — the cycle does that
apart from you.

## What decides what changes

`docs/task-cycles/proba-krotszych-wytycznych/reports\classification-merged.md`
is the table made from the two classifiers' reports. For every unit (ids S001–S120, S901, the
numbering of `reports\inputs-sentences.md` in the same directory, with line ranges) it gives the
action on the **trial file** and on **main**. The two reports
`reports\classification-A.md` and `reports\classification-B.md` hold the full sentences of the
split units, the reasons and the names of the known practices; read them for any unit you act on.
Units absent from the table's non-trivial rows are structure (table rows, list bullets, paths) and
stay everywhere.

Actions:

- `keep` — the sentence stays word for word.
- `remove` — the sentence leaves the file. Where this empties the body of a rule so that only its
  field lines (*Decision*, *Invariant*, *Good*, *Bad*) remain, the form of the file (WAY-171 and
  the template `.the-way/product-guidelines/coding/template.md`) decides whether that is allowed;
  see "Limits" below.
- `replace by name` (trial file only) — the sentence is replaced by the name of the practice it
  describes, and nothing else of it. The classifiers' proposals: S047 → "error cause chaining" and
  "log once, at the point that handles it (no log-and-rethrow)"; S049 → "a last-resort handler
  for what nothing handled"; S055 → "fail loudly"; S064a → "never log secrets"; S065a → "no
  personal data in logs"; S066a is not in this list because that unit is a disagreement. Use the
  shortest grammatical line in the file's language that holds the name (the English term may stay
  in quotes); do not add words that restate what the practice requires. `replace by name|remove` and
  `remove|keep` in a cell give the action per member (a, b) in order.
- A cell `keep (form: an example needs its text; author confirms)` — keep, unless you establish
  that the file would still satisfy its form with the sentence removed. If it would not, keep it and
  say so; do not leave a heading without text unless the form allows it.

## Limits (these override the table)

A removal is done only when it loses nothing the reader needs. For every sentence the table gives
as `remove` on main, check that what it says stands in a place the agent reads anyway — the
decision it repeats (`foundations/decisions.md`, the heading `### D-nn`), the config file it names,
a kind file (`guidelines/coding-*.md`) — and that no other file, test or script refers to the
sentence or to a heading of the rule that becomes bodyless (grep `coding.md` across the repository,
including `tests/`, `scripts/`, `foundations/`, `guidelines/`, `src/browser/AGENTS.md`, `AGENTS.md`).
Where a removed sentence carries a fact that stands nowhere else, or a form check or test fails with
it removed, **keep the sentence** and list it in the report with the reason and the evidence (a
sentence kept this way is a finding for the human, not an error). The same for the trial file, but
there the fact standing in a template of the the-way is also enough (the trial file is a
measurement copy).

Whether a removal changes the meaning of the guideline in the sense of WAY-172 (a new or changed
meaning is a decision of the product's log) you judge too: the classification rests on the claim
that removing such a sentence does not change the meaning because the decision carries it. List in
the report, with the sentence quoted whole, each removal where you hold that claim false or doubtful
and keep that sentence. Write no decision, invariant or other foundation entry; if you think one is
needed, return `questions` (report only).

Do not write the shortened file from memory of the old one: edit with Edit on the old text of the
base. Fenced examples, headings and the `Decision/Invariant/Good/Bad/Where in code` lines of rules
stay. Nothing outside `guidelines/coding.md` changes in either worktree, unless a cross-reference
the check above found needs a fix; then change only that line and say so.

## Checks you run and report (command and exit code each)

In each worktree, from its root: `python -B .the-way/elements/common/foundation_check.py`; then
find which test files read `guidelines/coding.md` or the guidelines directory (grep) and run each
with `npm test -- <that test file>` (exactly one file per call). Do not run the full `npm test`: the
orchestrator runs the gate on the reviewed change. Already failing on the base and not yours:
`tests/quality/test_quality_invariants.py` cases `test_ruff_source_rules` and
`test_shellcheck_source_rules` (the venv tools are missing on this computer); the other cases of
that file pass on the base. Report `wc -l guidelines/coding.md` before and
after in each worktree.

## Report

`docs/task-cycles/proba-krotszych-wytycznych/reports\author-1-report.md`,
by the method's report form, with also: the commit of each worktree; per worktree a table of the
units you changed (id, action done, one-line evidence) and of the units where you did not do what the
table says (id, why); the meaning-change list above; and **Searches not found or unclear**.
Return the status, your commits, a one-line check result and the report's path.
