# Handoff — the one author, `make-change`

## Delegation and boundary

The human who requested this cycle (through the adviser of the day) delegated intermediate choices to the orchestrator; no answer of the orchestrator is the human's approval. You are the one author of the whole change of one task, without a plan. You make the change, do the foundation step with its code, run focused checks, do your own-work check and return before any review. You do not run the product's full gate (`npm test`): it is the orchestrator's. You do not open a request, push, merge, or touch anything outside the worktree.

- Worktree (work only here, from its root): `the root of the task's worktree`
- Branch: `task/skrocic-wpisy-ponad-limit`, base `77a612cb81a6a5a23e622f62060c5531f48a66cc` (`.the-way` pinned at `bfb2e109735b5fff98802b8be0ff3c43c799262a`; run the-way's scripts from the worktree's root as `.the-way/<path>`). Never use another copy or version of the-way.
- Method: `.the-way/task-cycle/change/SKILL.md`, variant "the whole change as the one author". Read it whole; read a file it names (and `.the-way/task-cycle/skill/foundation_step.md`, which the foundation step needs, and the `SKILL.md` and template of the element when you write a decision or change an invariant) when the step that names it comes.
- Frozen task: `.runs/task-cycles/skrocic-wpisy-ponad-limit/task.md` (read it whole; it is the only authority; section "To do" points 1–6, "Acceptance criteria", "Context", "Decisions in play"). No spec and no plan exist: the task leaves no open design choice.
- Answers of step 4: trust boundary — yes: `src/server/**` is a trust boundary of the part `account-server`; you touch only comment text there (point 6), never code, strings or behaviour. Irreversible operation — no.
- Your directory for working copies: `.runs/author/` (scripts, probes, intermediate files; remove what is a working copy before you return and say so in the report). Your report: `.runs/task-cycles/skrocic-wpisy-ponad-limit/reports/author-report.md`. Name files you write there beginning with `author`.

## What a working copy is (copied word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## What to read (selected by the orchestrator)

- Product rules: `AGENTS.md` (done by this handoff's reading), `guidelines/coding.md`, `guidelines/testing.md` (you change tests and comments in them), whole. The guidelines files that carry a reference to D-112 and that point 6 changes: `guidelines/coding-database-access.md`, `guidelines/coding-session-store.md` (and `guidelines/testing.md`), whole.
- Foundation (current): the decisions of *Decisions in play* of the task — D-04, D-39, D-40, D-44, D-96, D-112, D-147, D-173, D-246, D-252, D-271, D-280, D-311, D-313, D-316, D-317, D-322, D-356, D-368, D-416, and D-157, D-222, D-225, D-287 — whole in `foundations/decisions.md`; also the decisions linked from D-112 by *Relations* (D-101, D-107, D-138, D-155, D-161, D-399, D-400) as far as the references of point 6 need them; the invariants `account-session-storage`, `password-reset-link`, `password-reset-ends-sessions` and every other invariant that cites D-112 in `foundations/invariants.md`; the part map entries of `product-foundation`, `account-server`, `deployment` and the part of the test files you touch; the glossary entries of terms you use. Select the rest by `.the-way/elements/common/way_of_working.md` ("Reading the foundation") as the foundation step needs; the foundation step's own reading is yours (`task-cycle/skill/foundation_step.md`).
- Counting definition (task, *Context*; the merged definition of the-way's request #152 was compared by the orchestrator and matches it; do not run a script from another copy of the-way, and do not use a script that counts for you from outside the pinned checkout — count by the definition, with a script of your own kept in `.runs/author/` if you wish): a paragraph of binding sentences (the paragraphs between an entry's heading and its first field) has at most 3 sentences and 300 words; a sentence begins at the start of the paragraph or after a full stop and a space, and a full stop inside quotation marks (`"…"`, `“…”`, `„…”`) ends no sentence; a word is a run of characters between spaces; the binding sentences of one entry, all paragraphs together, have at most 600 words.

## The work, summed (the task is the authority; where this differs, the task wins)

Three separate commits, in this order, each with a message in English following the style of `git log` in this repository, and `git add` by path only (never `-A`, `.` or `-a`):

1. Point 1: the paragraph breaks in the 19 entries of the table (a blank line before each listed sentence; no word, no order, no other line changes).
2. Points 2, 3, 5 and 6 together: N1 and N2 split from D-112 (next free number is D-435, N2 takes D-436; both stand at the end of the section "Account server: access, security and blocked accounts"), D-112 trimmed, the *Derives from* of the three invariants moved to N1, and every reference to D-112 in the repository renamed to D-112, N1 or N2 (including the 39 `decision:` comments of D-112 and their 18 + 5 rewritten as the task says). Write the entries through the-way's element skill for decisions (`.the-way/elements/decisions/skill/`, template `.the-way/elements/decisions/template.md`, per `foundation_step.md`), keeping the words of the task. The *Verification* of N1 and N2 as the task gives; the invariants that D-112 loses are moved by the invariants element.
3. Point 4: the 63 test comments (`decision:` lines whose quotation begins after a full stop inside quotation marks) moved to the true start of the sentence, one line each, in the form of the neighbouring `decision:` comments.

Before you begin, check each row of the tables of "To do" against the file (the orchestrator checked that the 26 opening sentences of point 1 stand in their entries; check the counts of point 4 and point 6 yourself). Where a row no longer agrees with the file — an opening is missing from the entry, a sentence changed, the number of comments differs — do not choose a new place yourself: return `returned` with a description of the discrepancy (task, *Acceptance criteria*, second item).

Weakest points for you to check and name in the report (not the whole list):
- that after commit 1 and 2 no paragraph of any entry of `decisions.md` has more than 3 sentences or 300 words and no entry more than 600 words (list any entry over the limit that is not in the task's tables, with its measures; do not divide it);
- that the words of every entry you divide are the same before and after except the changes the task names (compare the entry's text with all blank lines and runs of spaces made one space, before and after);
- that after commit 3 no `decision:` comment in the repository begins its quotation after a full stop inside quotation marks, by the rule of the task's *Context* (checked on all `decision:` comments of the repository, not only the 63);
- that every `decision:` comment that names D-112 now names the decision whose sentence it quotes, and that the quoted words stand in that decision (`python -B .the-way/elements/common/foundation_check.py` checks test citations too: run it without `--skip-test-citations`; its `listed:` lines are no error);
- that point 6 left no reference to D-112 that is about a sentence now in N1 or N2 (search every reference, by the task's list: other entries of `decisions.md`, `foundations/invariants.md`, `guidelines/`, comments in `src/server/`, tests).

Checks you run are focused ones (the foundation check; the node tests of the files you changed if they are quick and the guidelines allow; ruff/prettier checks that apply to files you changed). Report each with its command and exit code. Do not run `npm test`.

## Report

Write the full report to the report path, with as sections: status, commits (each with its hash, files and line counts), checks (command and exit code), the own-work check as `make-change` gives it, concerns, reach beyond this handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and working copies (where each stood and that it was removed). Return status, commits, the one-line check result, the report path, your questions and concerns.
