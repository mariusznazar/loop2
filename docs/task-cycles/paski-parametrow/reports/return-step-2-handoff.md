# Handoff — the return step again, after correction 1 — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## Where you work and what you make
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`, HEAD at the start of your work `713c4def`. `.the-way` is at `b502011f`, equal to the gitlink; `node_modules` is installed in the worktree.
- Your stage: the return step again (step 11 of the cycle, repeated for correction 1). You take no row of the variants of `make-change`. Read `.the-way/task-cycle/change/SKILL.md` whole for how a change is made, committed and reported, then `.the-way/task-cycle/skill/return_step.md` whole and `.the-way/task-cycle/skill/foundation_step.md` whole (the return step writes as the foundation step writes); read the `SKILL.md` of an element, at the path `foundation_step.md` gives, when you write an entry of that element.
- Commit on the branch, by path (`git add <path>…`, never `-A`, `.` or `commit -a`), in English, in the form of the repository's earlier commits (`type: :emoji: text`). Do not push. Where you find nothing to write or correct, commit nothing and say so with the evidence of your search.
- Your directory for working copies: `.runs/return-step-2/`.
- Report path: `.runs/task-cycles/paski-parametrow/reports/return-step-2-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness refuses the write, return the report whole as your answer. It ends with **Unread material** and **Searches not found or unclear** (`none` is an answer), holds each check with its command and exit code, and names the place each settlement you write went to, as the record's *Return step* gives it.
- Run no full gate (no bare `npm test`): focused checks only; after any foundation edit run `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py`. The full gate is CI's on the request.
- Frozen task, read whole: `.runs/task-cycles/paski-parametrow/task.md`. `cycle.md` and the other agents' handoffs are not yours to read; the reports you may read are named here.

## What changed since the first return step, and only that is yours
The first return step (commit `38e5dbf0`, range `e058ab30..38e5dbf0`, report `reports/return-step-report.md`) compared the entries with the code of `e058ab30` and wrote the *Verification* fields of nine decisions. After it, the human's remarks (`reports/correction-1-remarks.md`) were answered by correction 1 (report `reports/correction-1-report.md`, which you may read), range `18c16b69..713c4def`, three commits:
- `c9441aa2` — tests: a `decision:` line for D-311 at the test of the bar under each value (`tests/view/body-row-cells.test.mjs`), a case for the energy's number in `text` at 100, a case that the open explanation stands in the flow of the row and so moves the backpack down (`tests/view/body-row-explanation.test.mjs`), and one of two identical D-450 lines removed.
- `4f886004` — the `tests:` clauses of D-178 and D-450 in `foundations/decisions.md`, named after those tests (the agent marked them `the cycle's`).
- `713c4def` — the text of a creature's blow no longer rises while it fades: it stands still under the health bar and only fades (`src/browser/run-screen.css`), the motion case in `tests/view/body-row-motion.test.mjs` changed with it, and the sentence of the rule "The body row of a map run" in `guidelines/styleguide-browser-view.md` says what the text now does. The cycle's autonomous choice for it is Q7: the human said "Co wyjdzie źle — popraw", real blows showed the rise inside the health cell was crossed by the bar; the rise of the old Loop's text is dropped (for the human's veto at the request).
Compute the diff yourself: `git diff 18c16b69..713c4def`.

Compare with the code of `713c4def`, by identifier, each read whole: D-450, D-42, D-337, D-178, D-311, D-04, D-396, D-39, D-40, D-44, and the invariants `design-token-contrast` and `design-token-sources`; plus the entries your own search by the words the correction's code and tests add finds — for example `body-blow-text-fade`, the fade `ease-in`, `stands still`, `fades`, `rise`/`rises`/`unosi` (must now stand nowhere as the text's motion), `flow of the row`, `moves the backpack down`, `decision: D-311`. Compare: whether any *Verification*, *Rationale*, *Rejected*, binding sentence of a decision, or the *Verification* `tests:` clauses written by you in the first return step and by the correction now say more or less than the code and the tests hold; whether a `decision:` line the correction added quotes a binding sentence from its beginning (the foundation check reads that), and whether the test it stands on holds the part it quotes; whether the part map, the glossary and the environment facts need anything for the correction (probably not; say so with the search). Correct in the same change whatever no longer matches; write no entry that is only a wish; no entry is deferred.
Known open points that are **not yours** to settle: the text of a blow no longer rises as the old Loop's does (Q7, for the human's veto); the sum of the creature's blows on a killing blow (the human let it through); the marker of the temperature scale's look and the other choices the human accepted by merging; the style-guide rule repeating decisions (the human let it through, finding N-1).

## Working copies — copied word for word from the cycle's skill
An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
