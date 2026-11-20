# Handoff — the one author, `make-change`, "the whole change as the one author"

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Nothing here is that person's approval. You answer to the orchestrator; you ask it, never a human.

## Where

- Worktree (work only here, from its root): `.runs/worktrees/locations-key-wording`, branch `task/locations-key-wording`, base commit `ba67f04503afc56dc965bd197897b0a8f2adbeae`.
- Your directory for working copies: `.runs/author/` of the worktree.
- Your report: `.runs/task-cycles/locations-key-wording/reports/author-report.md`. It is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); the rule of Claude Code against a subagent writing a file named `report…` does not apply to this name, which begins with the role. If the write is refused, return the report whole as your answer.
- `cycle.md` and the other files of `.runs/task-cycles/locations-key-wording/` (other agents' handoffs, reports, findings) are not yours to read, except the frozen task named below.

## Method and variant

Read `.the-way/task-cycle/change/SKILL.md` whole (method `make-change`), variant "the whole change as the one author". Read a file it names only when the step or variant that names it comes. Also read `.the-way/task-cycle/skill/foundation_step.md` whole (the foundation step), and, when you write the entry of an element, the `SKILL.md` of that element in the pinned the-way: `.the-way/elements/decisions/skill/SKILL.md` for D-362 and `.the-way/elements/invariants/skill/SKILL.md` for the invariant. Use only `the-way-` project skills' files by those paths; you have no skill tool.

## Task (frozen copy, read whole)

`.runs/task-cycles/locations-key-wording/task.md` — status `ready for cycle`, project relation independent, no spec, no plan. Its three items of *To do*, the two answered questions, *Decisions in play*, *Settlements to record* (row 1 → "sentence of D-362") and *Out of scope* are the requirement.

## Stage and boundary

Make the whole change on the task branch and commit it, run your own-work check, write the report, return. You run neither the product's full gate (`npm test`) nor the review. The change has three parts:

1. `AGENTS.md`, section `## Backlog`, the three lines `- Projects:`, `- Tasks:`, `- Task rules:` — "entry"/"entries" meaning a name under `loop2` in the locations file → "key"/"keys"; the rest of the wording as it is.
2. D-362 in `foundations/decisions.md` (heading `### D-362 — How does loop2 point to places outside the repository that its readers cannot reach?`, about line 753) — the binding sentence, *Rationale* and *Rejected*; swap the word (with its article) where it means a name in the locations file; an "entry" meaning an entry of the foundation stays (the *Rationale* "finds the reasoning where it stands in the entry", the *Verification* "a comment, an entry or a guideline", "an entry or a comment that leaves out…"). The meaning of the decision does not change. Write it through the method of the decisions element (`.the-way/elements/decisions/skill/SKILL.md`), as a change of an existing decision, with its checks.
3. Invariant `tracked-file-private-names` in `foundations/invariants.md` (about line 1298) — "by naming the entry `projects`, `tasks` or `task-rules`" → "by naming the key …"; the meaning does not change. Write it through the method of the invariants element (`.the-way/elements/invariants/skill/SKILL.md`).

Answer your own search question before you finish: search the tracked files of the worktree (`git grep`) for other places that say "entry" or "entries" about a name in the locations file `~/.the-way/locations.json` (for instance in `guidelines/`, `foundations/`, `README.md`, `.claude/skills/`). The task scope is the three places above; report any other place you find in the report, with its path and line, and do not change it (it is outside the task's scope unless it is the same sentence of D-362 or of the invariant).

Before you write or change the text of a decision, an invariant or an instruction file, read `the author's global rule file on artifacts of knowledge, which lies outside the repository` (rule of the author of the task: artifacts describe the present state, not the way to it) — here it means: the new text carries no history of the rename ("formerly entry", dates, notes about the pin).

## Checks you run

- `python -B .the-way/elements/common/foundation_check.py` from the worktree root: report command and exit code, and the number of errors it counts. (The worktree has no `node_modules`; do not run `npm test`, do not run `npm ci`.)
- `python -B .the-way/instruction-files/check_instructions.py` from the worktree root: command and exit code (a warning is no stop).
- Compare the diff with the task line by line: every occurrence the task lists changed; every occurrence the task keeps (entry of the foundation) unchanged; no other character changed. Report the weakest point of your change and the check that covers it.
- Commit by path (`git add <path> <path>`, never `git add -A` or `.`), message in English in the form of the repository's recent commits (`type: :emoji: text`, see `git log --oneline -10`); one commit per logical part is fine. Do not push.

## Read for this task (decisions, invariants, parts)

- Foundation entries by identifier: D-362; invariants `tracked-file-private-names` and `tracked-file-private-paths` (the sentence of both, whole); D-13 (named by the invariant).
- Parts (`foundations/part_map.md`): `agent-workflow` (holds `AGENTS.md`), `product-foundation` (holds `foundations/**`).
- Glossary of the pinned the-way, `.the-way/foundations/glossary.md`, the entry "entry" (a text of the foundation about one thing it records) and any entry for "key" if there is one.
- No guideline file applies: the task writes no code and no test.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

## Report form

The report holds, as `make-change` gives it: status, commits, checks with command and exit code, the own-work check, your meaning sentences for each foundation entry you wrote (one in English, one in Polish, the mark `row 1` for D-362's sentence, and for the invariant the mark that fits: `row 1` is the settlement for D-362 only; the invariant's change comes from the task's question 2, so mark it `the cycle's` unless the task shows otherwise — state which you chose and why), **Unread material** (or `none`), **Searches not found or unclear** (or `none`), and the line on working copies (where each stood and that it was removed).
