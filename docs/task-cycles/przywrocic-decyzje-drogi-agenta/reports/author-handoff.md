# Handoff to the one author — `przywrocic-decyzje-drogi-agenta`

You are the one author of this change (agent type `the-way-author`). The orchestrator of the cycle
`implement-task` has delegated to you the choices the change leaves open; none of them is the
human's approval, and you ask the human nothing.

## What you make

- **Variant of the method:** "the whole change as the one author" of
  `.the-way/task-cycle/change/SKILL.md` (the pinned the-way, read from the worktree below). Read
  that `SKILL.md` whole, and a file it names only when the step that names it comes.
- **Foundation step:** `.the-way/task-cycle/skill/foundation_step.md`, read whole. You write the
  foundation entries the task carries by following the `SKILL.md` of their element, each read as a
  file (you have no skill tool): `.the-way/elements/decisions/skill/SKILL.md` for the four
  decisions and `.the-way/elements/environment-facts/skill/SKILL.md` for the nine facts; a skill
  those files name by its name alone is the `SKILL.md` whose frontmatter `name:` is that name.
- **Boundary:** the whole change of the task, its foundation entries and its code (here: the text
  of the two copies of the skill and one comment of a test file), committed on the task branch,
  then return. You do not run the product's gate (`npm test`) — the orchestrator runs it. You run
  the focused checks your change needs (at least `python -B .the-way/elements/common/foundation_check.py`
  and `python -B .the-way/instruction-files/check_instructions.py`, and the tests that cite the
  files you change). You do not push, open a request, move the pin or touch anything outside the
  worktree. Later the orchestrator resumes you for fixes and for the return step; you do not take
  the return step now.

## Where

- Worktree (work from its root): the root of the task's worktree
  — branch `task/przywrocic-decyzje-drogi-agenta`, base `f6b410bab5e496a54203a3ee9549fbafb2f09372`
  (`origin/main`). Dependencies are installed (`npm ci` done; `.runs/quality-venv` is being
  installed by the orchestrator and may need a minute). `.the-way` stands at the pinned commit
  `bfb2e109735b5fff98802b8be0ff3c43c799262a`; never use another copy of the-way.
- Directory for your working copies: `.runs/author/` of the worktree.
- Report path: `docs/task-cycles/przywrocic-decyzje-drogi-agenta/reports/author-report.md`.

## What you read

- The frozen task, whole: `docs/task-cycles/przywrocic-decyzje-drogi-agenta/task.md` (Polish). It
  is the binding source: its *To do* 1–6, its *Questions to settle* with their answers, its
  *Context* and its *Settlements to record* rows 1–4 (mark each entry you write `row 1` … `row 4`
  as `foundation_step.md` gives; the entries of the facts are marks of the task's *To do* 4, which
  `foundation_step.md` calls `the cycle's` unless a row carries them whole — judge it and say so).
  There is no spec and no plan.
- The old entries, from git, not from memory: `git show 1a56e519^:foundations/decisions.md`
  (entries `### D-254`, `### D-357`, `### D-358`, `### D-359`) and
  `git show 1a56e519^:foundations/environment_facts.md` (the nine facts the task lists), and
  `git show 1a56e519 --stat` to see what the withdrawal changed. Source discipline: the wording,
  fields, *Rationale*, *Rejected*, *Based on* values and read dates come from those entries; the
  only changes are the new numbers and identifiers, the references the task orders, and what the
  current templates require. What you do not find in the source you name unknown or leave to the
  orchestrator in your report; you do not fill it from memory (point data — dates, addresses,
  numbers — only from the old entries or from a reading of the cited source).
- Decisions by identifier, each whole (an entry runs to the next heading of any level):
  D-75, D-88, D-264, D-347, D-362 (the task's *Decisions in play*), and the sixteen entries of the
  section "The gate, test tools and the local start" of `foundations/decisions.md` — choose by the
  index the script writes; the skill of the decisions gives the rest of the reading
  (`python -B .the-way/elements/common/decision_index.py --output .runs/author/index.txt …`, files
  of your own in `.runs/author/`).
- The table `## Withdrawn identifiers` of `foundations/decisions.md` (the numbers there are never
  free again) and the one of `foundations/environment_facts.md`; the entries of the glossary and
  the invariants your decisions or facts link to, as the skills direct.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/testing.md` (you change a comment of
  a test file) and `guidelines/styleguide-browser-view.md` (AGENTS.md names it for any file of the
  part `browser-view`, and `tests/view/scene.test.mjs` is one; the change touches no screen). No
  kind file of the coding index matches. `AGENTS.md` and `.claude/skills/loop2-play/SKILL.md`
  (both copies: `.claude/skills/loop2-play/SKILL.md` and `.agents/skills/loop2-play/SKILL.md`) are
  files you change or must know: read each whole before you change it.
- The part map: `foundations/part_map.md`, whole. Parts touched: `product-foundation`
  (`foundations/**`), `agent-workflow` (`.claude/**`, `.agents/**`), `browser-view`
  (`tests/view/**`).

## Answers of the orchestrator that bind you

1. Two questions at start: no trust boundary, no irreversible operation.
2. The pinned template of decisions (question 1, "Where it goes") would send an instruction for
   how an agent works to a skill. The human's accepted answer in the task (*Questions to settle* 1
   and 3, *Context* bullets 3–4) is the opposite and binds: write the four decisions in
   `foundations/decisions.md`; the pin stays. Say in your report, in one sentence, where the
   pinned template and this change part.
3. Numbers: the four decisions take the next four free numbers after the highest number the log
   uses, withdrawn numbers counted as used (check the withdrawn table). Put them in the section
   "The gate, test tools and the local start" in the order D-254, D-357, D-358, D-359 would have
   (the playwright-way first), amend the section's sentence as *To do* 3 says. The nine facts take
   identifiers that name what each fact is about, as the template of facts directs (read its
   "Where entries go" and the rule on identifiers), and none of the withdrawn identifiers; a new
   identifier is checked against the whole file and the withdrawn table before it is used.
4. A reference in the old texts to D-254 or D-357 (for example D-357's *Relations*, D-358's, D-359's)
   becomes the new number of the decision that now answers that question; no text refers to a
   withdrawn number, as the rules of the foundation say.
5. D-362: the repository `mariusznazar/screenshots` is public and a pull request of `loop2` is
   public; the entries name no note of the author's private notes and no repository its readers
   cannot reach. Check each sentence you restore against D-362 and say in the report what you
   found.
6. *To do* 4 sets the read dates: sources frozen in a version keep their old date; the fact read
   from a live address (`screenshots-repository-visibility`) gets a new date only after you read
   the address again. Read it with the tool that reads it (the `gh api` or the public address the
   old entry cites; the account is the author's, you only read) — a failed reading leaves the old
   date with a note, never a new date.
7. Skill copies (*To do* 6): the two copies of `loop2-play` stay identical in the sentences you
   change; check the sentences listed there are gone, the rule steps stay, and each section named
   there now cites its decision by the new number. Other files that cite the skill's sentences
   (search the repository, tests under `tests/agent_workflow` included) are read and, where they
   depend on a removed sentence, changed or named in your report.
8. The comment of `tests/view/scene.test.mjs` and the sentence of D-264 and the *Relations* of
   D-347 change as *To do* 5 says; nothing else of those files.
9. No other file changes. If the task and the code disagree (a sentence the task lists does not
   stand in the file, a number is taken), say so in your report; where it changes what the work
   means, return `questions` or `returned` as the method gives.

## Commits

English messages in the form of the repository's log (`docs: :card_file_box: …` for entries of the
foundation, `docs: :memo: …` for text), `git add <path> <path>` by path (never `git add -A`, `.` or
`git commit -a`), nothing under `.runs/` in any commit, the author address of the repository
(check `git log --format='%h %ae'` after the first commit). Several commits are fine — the entries
of the foundation apart from the text of the skill and the comment.

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

Write the full report to the report path and return only: status, commits, a one-line check result
naming what failed or did not run, the report's path. The report holds, as `make-change` and
`foundation_step.md` give: the own-work check with each command and its exit code, per entry one
sentence of its meaning in English and one in Polish with its mark (`row <n>` or `the cycle's`),
every reach beyond this handoff (what, where, why), **Unread material** (what this handoff names
that stayed unread or was read in part, or `none`), **Searches not found or unclear** (each thing
looked for and not found or unclear, or `none`), and the working copies line. Name the new numbers
and identifiers in a table old → new for the orchestrator. Secrets and personal data stay out of
the report and out of the commits.
