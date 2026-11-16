# Handoff to the reviewer of the whole change — `przywrocic-decyzje-drogi-agenta`

You review the whole change of this task cycle with the method `review-change`. You did not make
any of it. The orchestrator of `implement-task` has delegated the choices around the review to
itself; you grade and scope every finding yourself, and nothing here lowers or raises a grade.

- **Method:** `.the-way/task-cycle/review/SKILL.md`, read whole, in the variant "the whole change";
  it sends you to `whole_change.md` beside it — read that file too, and a file the method names
  only when its step comes. The method is read from the worktree's pinned the-way; never another
  copy.
- **Worktree (work from its root):** the root of the task's worktree,
  branch `task/przywrocic-decyzje-drogi-agenta`. The pinned the-way is `bfb2e109735b5fff98802b8be0ff3c43c799262a`
  and stays there on purpose (task *Questions to settle* 3). Dependencies are installed.
- **Range:** base `f6b410bab5e496a54203a3ee9549fbafb2f09372` (`origin/main`) to head `787acccd`
  (check `git rev-parse HEAD` first). Commits: `38e84eee` (decisions D-417 to D-420 and nine
  facts) and `787acccd` (both copies of the skill, one comment of a test).
- **The frozen task, whole:** `docs/task-cycles/przywrocic-decyzje-drogi-agenta/task.md`
  (Polish; *To do* 1–6, *Questions to settle*, *Settlements to record* rows 1–4 and *Context* bind
  the change). No spec and no plan: the route is one author without a plan; there are no slices.
- **The author's report** (claims to verify, not evidence):
  `docs/task-cycles/przywrocic-decyzje-drogi-agenta/reports/author-report.md`.
- **Two questions at start:** no trust boundary, no irreversible operation.
- **Your own directory for working copies:** `.runs/review-whole/` of the worktree. The report
  path: `docs/task-cycles/przywrocic-decyzje-drogi-agenta/reports/review-whole-report.md`.
  You write no code and change no tracked file; you run checks that change none.

## What the orchestrator asks you to look at hardest

These are pointers, not findings; you select the rest yourself.

1. **Source fidelity of the restored entries.** The old entries are in git:
   `git show 1a56e519^:foundations/decisions.md` (`### D-254`, `### D-357`, `### D-358`,
   `### D-359`) and `git show 1a56e519^:foundations/environment_facts.md` (the nine facts). Compare
   each restored decision and fact with its old entry word by word. The only allowed changes are
   the new numbers and identifiers, the references the task orders and what the current template
   requires; the author reports these: the join of two broken lines in D-417's *Rejected*, and one
   clause the author *added* to D-417's *Rationale* ("that measurement is the product's own, and its
   record is not open to a reader of the repository"), which the old text did not carry. Check
   whether the pinned template (`.the-way/elements/decisions/template.md`, rules of the
   foundation in `.the-way/elements/common/rules.md`) really requires such a clause, and whether
   it changes what the entry says beyond the task's *To do* 1. Source discipline: an addition the
   source does not hold is a finding unless a binding rule demands it.
2. **Every number and identifier.** No text refers to a withdrawn number or identifier except the
   rows of the withdrawn tables; D-417 to D-420 are the next free numbers; the nine new fact
   identifiers name what the fact is about (template of facts, "Where entries go"), are unique and
   none repeats a withdrawn one; the *Based on* of each new decision carries the right new
   identifiers; the *Successors* column of both withdrawn tables; the *Why* of the four decision
   rows no longer says it is not a decision of the product or that the rule stands in the skill.
3. **The read dates** (task *To do* 4): eight facts keep old dates, one live-address fact got
   2026-11-16 after a re-read; the author says it re-read the address with `curl`. Judge only what
   the record shows; do not repeat network reads unless you doubt a source.
4. **The skill copies** (*To do* 6): the three removals listed in the task are gone, the rule steps
   stay, the four sections cite D-417 to D-420 as the task says, both copies are identical, and no
   test or file that cites the skill's sentences depends on a removed one.
5. **The section** "The gate, test tools and the local start" of `foundations/decisions.md`: its
   sentence now names the screenshots; the four decisions stand there; the rest of the section and
   its other entries are untouched. D-264 and D-347 changed only as *To do* 5 says; the comment of
   `tests/view/scene.test.mjs` the same.
6. **The author's marks:** the nine facts and the edits of both withdrawn tables are marked
   `the cycle's` in the report (no row of *Settlements to record* carries them whole). Say if you
   see a row that does.
7. **D-362** (no file git tracks names a note of the author's private notes or a repository its
   readers cannot reach) against the restored text, and the check of private paths of the
   repository (`tests/agent_workflow/test_tracked_file_private_paths.py`).
8. **Unread material in the author's report:** it read `guidelines/styleguide-browser-view.md` in
   part and eleven decisions of the section only by the index. You select your own guidelines and
   decisions; read each guideline file whole.

You run the focused checks you need (the foundation check
`python -B .the-way/elements/common/foundation_check.py`, the check of the instruction files, the
tests that cite the files the change touches). You do not run the full gate `npm test`: the
orchestrator runs it.

## Working copies

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

## What you return

Write the full report to the report path with its first line `PASS <sha>` or `FAIL <sha>` (or
`questions`), as the method gives, and return only that first line, the path, a one-line result of
the checks you ran naming what failed or did not run, and the number of decisions of your index you
read whole. The report holds the **Unread material** and **Searches not found or unclear** sections
as the method gives them, and each reach beyond this handoff.
