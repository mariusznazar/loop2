# Handoff — the one author of the change (stage: make the whole change, the foundation step with it)

You are the one author of the task `decyzje-niezgodne-z-gra` in a task cycle of the-way, dispatched by the orchestrator of the cycle. This file is your whole handoff.

## Delegation

The human delegated the intermediate choices of this cycle to the orchestrator; the human reviews the request only. Never label an answer of yours as the human's approval. The orchestrator answers your questions from the task and its sources. Do not run the product's gate (`npm test` / `scripts/test.py` over everything): its run is the orchestrator's (and waits for a signal of the human's day advisor). You run focused checks only (the check of the foundation, the check of the instruction files, the tests you touch, the comparison script below).

## Where you work

- Worktree (your working directory): `the root of the task's worktree`, branch `task/decyzje-niezgodne-z-gra`, base `5327f55a6440ebd656fd88e9a53e65768f8fb109` (= `origin/main`). Work from its root only; edit no other checkout.
- The pinned the-way is `.the-way` in the worktree (commit `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink). Read every file of the process from there.
- Commits: on this branch, in English, in the style of `git log` of the repository (`type: :emoji: sentence (D-nnn)`), `git add` by explicit paths (never `git add -A`, `.` or `commit -a`), no push.
- Your directory for working copies: `.runs/author/`.
- Your report: `.runs/task-cycles/decyzje-niezgodne-z-gra/reports/author-report.md`.

## Method

- Read whole `.the-way/task-cycle/change/SKILL.md` (the method `make-change`) and follow it. Your variant is the row **"the whole change as the one author"**. Read a file the method names only when its step or variant comes.
- The foundation step: read whole `.the-way/task-cycle/skill/foundation_step.md`, and, when you write an entry of an element, the `SKILL.md` of that element at the path it gives. Foundation entries are written only through those methods (decisions: `record-decision`, invariants: `record-invariant`, glossary: `record-glossary-term`, environment facts: `record-environment-fact`, part map: `update-part-map`), each read as a file (you have no skill tool). After this change the orchestrator resumes you for the return step with its own handoff (`.the-way/task-cycle/skill/return_step.md`); do not take it now.

## The task

The frozen task is `.runs/task-cycles/decyzje-niezgodne-z-gra/task.md` (read it whole: To do 1–8, Acceptance criteria, Questions to settle with their answers, Decisions in play, Settlements to record (15 rows), Out of scope). It is the only authority for what to change. The first paragraph of *To do* item 6 names the places only "as a hint with the line number on `main` `b1904c5b`"; the lines of this branch's base differ, so find each by its text.

## Answers of the orchestrator at start (step 4)

- Trust boundary: **yes, formally** — you edit only comments, names and texts, but some files you touch lie in files the part map names as a trust boundary: `src/server/**`, `deploy/**` (`deploy/loop2-watch`) and `src/browser/sim/saved-game.ts`. In those files change comments and texts only; no executable line changes. Say in your report which files of those you touched and show, for them, that only comments changed.
- Irreversible operation: no.
- Open design choice: none. Every settlement, question and answer in the task is settled; where the task gives the new wording of a sentence in quotes, write that wording. A choice of how to make what the task settles is yours; name it in the report.
- Reserved choice: none.

## What to read (selected by the orchestrator)

- Foundation entries by identifier, each whole: the decisions of *Decisions in play* — D-03, D-04, D-14, D-17, D-28, D-61, D-82, D-108, D-113, D-179, D-189, D-190, D-195, D-262, D-271, D-377 — and, for what you touch beyond them, those the parts you touch carry (read as `Reading the foundation` in `.the-way/elements/common/way_of_working.md` gives: step 1 and 2, then 3 and 4). The invariants named in the task (`minute-span-split`, `account-client-requests`, `trip-run-end`, `catch-up-state`, `player-argon2-deployment-check`, `player-argon2-password-hash`, `nature-energy-range`, `loop2-container-sprites`, `cross-part-imports`, `first-map-stock`, `first-map-balance`) and the glossary entries `owner`, `operator`-in-use (the glossary has no entry named `operator`: its `owner` entry says *Not: the person who reaches the server and runs its commands — "operator"*), `blocked account`, `previous-save privilege`, and every term your changed sentence uses.
- `foundations/part_map.md` whole.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (some of the comments are in `browser-view` files) and `src/browser/AGENTS.md`; `.the-way/product-guidelines/reading.md` says how they are read.
- Foundation text rules of the task cycle that bind you: D-82 (a test comment names as source only a document of the foundation; a comment that carries nothing the code needs is not written).

## What you do

1. **Items 1–3, 4 (first half), 5 of *To do* and the 15 rows of *Settlements to record*:** write them as the task gives them, through the element methods. The task's acceptance criterion: the comparison of all decisions with all invariants finds no mismatch. The script is saved at `.runs/task-cycles/decyzje-niezgodne-z-gra/reports/inv-names-check.py` (the one named in the task, from commit `30a78d5931db6beadac8af260d5341c8c4db1542`); run it from the worktree's root as `python -B .runs/task-cycles/decyzje-niezgodne-z-gra/reports/inv-names-check.py <output file under .runs/author/>`; on the base it lists exactly six decisions: D-04, D-108, D-113, D-179, D-190, D-377. After your change it must list none; record its command, exit code and count.
2. **Item 4 (second half) and item 6:** correct the nineteen comments and test names the task lists, each by its own description; assertions are changed only where the case must check what its name promises (the task's question 4 answer: comments and names say only what the case checks, cite the decision that states it or none, carry no line numbers of the log and no document outside the foundation). Where the right fix is a changed name or comment, do that; where the description's claim cannot be told true or false from the code, name the doubt in your report instead of guessing. Run the touched tests focused (the way `guidelines/testing.md` gives) and record each command and exit code.
3. **Item 7 (the word `owner` for the person who runs the server):** since the panel of the owner the glossary says `owner` is an account with the role `owner`. Older texts use the word for the human who runs the server (the glossary's "operator"). Find every occurrence of the word `owner` / `owner's` in these places: `foundations/decisions.md` (about 70 lines of older decisions; 104 lines contain the word, the rest mean the role and stay), `.claude/skills/loop2-deploy/SKILL.md` and its twin `.agents/skills/loop2-deploy/SKILL.md` (kept identical: git holds one blob for both — keep it so, and the same for `references/*.md` there and `loop2-play/SKILL.md` where they use the word for the person), comments in code (`src/**`, `scripts/**`, `deploy/**`, `.github/workflows/check-address.yml`) and the titles of tests (`tests/**`). Classify each: (a) the person who runs the server → write `operator` (or the word the glossary accepts for that person), meaning unchanged; (b) the account role `owner`, the owner panel, `owner-*` identifiers, role value strings, file names, owner of a file/directory in the Unix sense (`owner root, group 1000`), the repository's owner on GitHub, and a quotation → stay unchanged. Keep a classification table (a file in `.runs/author/`, not committed) and put its counts and every doubtful case into your report. Edit only text, never an identifier, a role value, a string the program prints or matches, or a file name. Where a changed sentence stands in a decision that is also cited by an invariant, test, or other entry as a quotation of the sentence, keep them in step (the foundation check lists a quote that does not match).
4. **Item 8 (`cross-part-imports`):** the invariant rests on an environment fact marked `TODO` since 2026-11-08. Search the foundation (`foundations/environment_facts.md`, decisions, the invariant's *Rests on*, the-way's own documents at `.the-way/` for the source) for the source of that fact. When you find it, write the fact with its source through the element method (`record-environment-fact`); when not, leave the `TODO` as it is and write under "Needed from you" of your report what is missing — never fill a fact or a source from memory.
5. Where the change makes a foundation entry, a guideline, a test citation or a part-map line stale, correct it in the same change; the foundation check shows the citation mismatches.

## Checks you run (focused only; none is the gate)

- `python -B .the-way/elements/common/foundation_check.py` (exit code and the last lines), `python -B .the-way/instruction-files/check_instructions.py` (exit code and counts), the comparison script above, and each test file you touched, by the command `guidelines/testing.md` gives for it. Each with its command and exit code in the report.
- Your own-work check, as the method requires.

## Working copies (word for word from the process)

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

Your report in the file above, as your method gives it, with **Unread material** and **Searches not found or unclear** (each `none` or the items), the own-work check, every check with command and exit code, working copies and their removal. Return to me: status, your commits, a one-line check result naming what failed or did not run, and the report's path.
