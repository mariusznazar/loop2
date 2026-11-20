# Handoff — the one author, `make-change`, whole change

Task `szkielet-progresji` of the product loop2. You are the one author of a change without a plan.

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; no answer or go-ahead here is that person's approval. Questions go to the orchestrator by returning `questions`; never ask the human.

## Worktree and branch

- Worktree (your working directory): `the root of the task's worktree (the repository root)`; branch `task/szkielet-progresji`, base `fec2ae7ed5b374a43a44803a296c4deb507696e4`. Work from the root of this worktree; `.the-way` there is at the pinned commit `19e5774aed6d1d628042e23deccc110ed9f112c0`.
- Your directory for working copies: `.runs/author/`.
- Your report path: `.runs/task-cycles/szkielet-progresji/reports/author-report.md` (the report file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it, the case that the rule on report-like file names leaves open). If you cannot write it, return the report whole as your answer.
- `cycle.md` and the other files of the cycle's record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. Do not run the product's gate (`npm test`); its run is the orchestrator's or CI's.

## Method and variant

Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is "the whole change as the one author". You do the foundation step with your change: read `.the-way/task-cycle/skill/foundation_step.md` whole and, for the glossary entry, `.the-way/elements/glossary/skill/SKILL.md` (the project skill `the-way-record-glossary-term`, read as a file; you have no skill tool) and the files beside it that it names when its step comes. The entry is a projected entry that the task carries and writes itself (its *Decisions in play*), so read `.the-way/elements/common/projected_mode.md` only if the glossary skill sends you there. After the change, the return step is a later dispatch.

## Task

The frozen task: `.runs/task-cycles/szkielet-progresji/task.md` (read whole). Its only item of *To do*, word for word:

> 1. Wpisać do słownika gry (`foundations/glossary.md`) pojęcie `wall` w brzmieniu rzutowanym z definicji projektu, przytoczonym w „Decisions in play”: nowy wpis `## wall` na końcu pliku, po wpisie `## overlay`, z samym zdaniem definicji i wierszem `- **Not:** none`. Zdanie „Meaning (pl)” do pliku nie wchodzi — jest zdaniem znaczenia z definicji projektu, a wpis słownika pisze się po angielsku.

The projected entry, word for word from the task's *Decisions in play*:

> `wall` (nagłówek w „Glossary”):
>
> > A map that asks for something new — an item, a spell or another idea of a program — and without it is solved rarely.
> >
> > - **Not:** none
> >
> > **Meaning (pl):** „Ściana” to mapa, która pyta o coś nowego i bez tego przechodzi rzadko.

No spec and no plan exist: the task's *Settlements to record* is `none`, and no design choice is open.

## Answers of the orchestrator (steps 4 and 6 of the cycle)

- Trust boundary: no (`product-foundation` has trust boundary `none`). Irreversible operation: no.
- The orchestrator's reading of the guidelines: none applies — the change writes no code and no test, and `product-foundation` is in the *Applies to* of no guideline file.
- Foundation entries to read by identifier: D-362 (named by the task; the one decision whose *Scope* names `product-foundation`). Its binding sentence is quoted in the task's *Decisions in play*; the entry you write must not name a note or a path outside the repository.
- The entry's form follows the neighbouring entries of `foundations/glossary.md` (the file's last entries `## owner` and `## overlay` are the pattern for place, blank lines and the `- **Not:**` line). The glossary skill's checks and the part map's rules for assigning the file apply as it gives them.
- Reconciliation already recorded by the orchestrator: the task document differs from its last vault commit only in the status and in the exactness of the To-do item above; you work from the item as quoted.

## Working copies (word for word)

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
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## Checks you run

The checks the glossary skill and `make-change` name for a foundation change: at least `python -B .the-way/elements/common/foundation_check.py` (exit code in the report), `python -B .the-way/instruction-files/check_instructions.py`, and `git diff --check`. Commit by path (`git add foundations/glossary.md`), commit message in English in the style of the repository's log (`docs: :card_file_box: ...`, see `git log -5`), never `git add -A`.

## Report

First line as `make-change` gives. Include: status, commits, every check with its command and exit code, the own-work check, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), working copies and their removal, and the text of the entry you wrote, whole.
