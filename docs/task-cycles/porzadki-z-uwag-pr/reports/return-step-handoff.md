# Handoff - the return step (`make-change`, the return step)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
A statement of the task or of this handoff that does not pass your own reckoning, say so in the report instead of fitting an entry to it.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`. No other checkout of the product.
- Head you start from: `60d4047` (the change as the reviews accepted it; the full gate was run on it). Your range runs from `60d4047`. Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Class of model: not cheaper than the orchestrator's.

## Your stage and its boundary

- You take **the return step**. It takes none of the rows of the table of variants of `make-change`: read `.the-way/task-cycle/change/SKILL.md` whole for how a change is committed and reported, and
  `.the-way/task-cycle/skill/foundation_step.md` and `.the-way/task-cycle/skill/return_step.md` whole for what the step does. Write each entry through the pinned project skill of its element, reading the skill whole:
  `the-way-record-decision`, `the-way-record-environment-fact`, `the-way-record-glossary-term`, `the-way-record-invariant`, `the-way-update-part-map`, `the-way-maintain-coding-guidelines` (only those you need).
  Select your reading by "Reading the foundation" in `.the-way/elements/common/way_of_working.md`.
- Compare with the code, as `return_step.md` gives: the entries this change wrote or changed (D-352, D-353, D-354, the wrap of D-254, the rule "Recording a failure" in `guidelines/coding.md`), the decisions of the task's *Decisions in play*
  (D-84, D-77, D-252, D-137, D-207, D-213, D-96, D-281, D-156, D-224, D-160, D-13, D-17, D-113; the task is `.runs/task-cycles/porzadki-z-uwag-pr/task.md`, read it whole), the entries the search of the foundation found, and the part map entries of the touched parts
  (`foundations/part_map.md`: browser-view, simulation, account-server, build-tools, agent-workflow, product-foundation). Correct in the same change whatever no longer matches. The change adds no file that a part does not already claim (check `git diff --name-status 00aa818..60d4047`).
- Candidates the orchestrator knows of, to compare and decide (each is yours to settle; do not take it for granted):
  1. **An environment fact for the Docker documentation.** The skill text of item 28 (`.claude/skills/loop2-deploy/references/setup_and_secrets.md`, both copies) rests on what `docker compose down`, `docker system prune --volumes` and `docker volume prune` remove, taken from pages of the Docker documentation
     (`.runs/task-cycles/porzadki-z-uwag-pr/reports/05-docker-docs-excerpts.md`: docker/cli tag `v27.3.1` files `volume_prune.md`, `system_prune.md`; docker/compose tag `v2.29.7` file `compose_down.md`). The foundation's fact `docker-volume-lifecycle` does not cover these commands. Write the fact(s) through
     `the-way-record-environment-fact` if its rules say a source outside the product the change rests on is one; take the wording of each fact from the source, never from memory (the excerpts file is verbatim; the sources are public and you may fetch them again from the URLs it names). Keep the version-dependence honest: the Docker Engine version on the test server is recorded nowhere.
  2. **D-253 against the code.** D-253 says `measure-passwords` already has a last-resort handling of its own; the reports of Slice 11 and of the whole-change review say neither `scripts/measure-passwords.mjs` nor `src/server/measure-passwords.ts` has one (a mismatch from before this task; Slice 11 changed the script). Compare, and decide whether it is a mismatch this step corrects (an entry may only be corrected through its skill; you do not write code) or not; say which, with evidence.
  3. **D-281 and the other decisions of the page's address** against the reload of Slice 10 (D-352).
  4. **The failure names and places the change added** (`backup-cleanup`, the place `account-backup.run`, `local-start.proxy` lines) against the entries that list or define such names (D-252, D-231, D-233, D-255, D-258) and against the glossary.
  5. Anything in `foundations/glossary.md` the change uses in another meaning than its entry gives.
- Write no invariant unless the task, a decision or the human sets its rule. A choice that binds after the merge is written as `return_step.md` gives; every other choice stays a row of the questions table (the orchestrator's). Entries marked `the cycle's` go to the request for the human.
- Do not run the product's gate. Run `python -B .the-way/elements/common/foundation_check.py` after each foundation change. Commit with explicit paths (never `git add -A`); messages in English in the form of the repository's earlier commits. If you write nothing, commit nothing and say so.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/return-step-report.md`.

## What to return

Status (`done`, `done with concerns`, `questions`, `blocked`), the commits (or none), a one-line check result, the report path. The report holds: the table of the compared entries and the code (what no longer matched and its correction, or `none`); the *Return step* fields of the cycle record, one line each:
foundation compared with code, decisions written or changed, invariants written or changed (with the source that sets each rule), environment facts, glossary terms, part-map changes, projected entries written, rows of *Settlements to record* written; for each entry written or changed one English sentence of its meaning and one Polish sentence, and the mark `the cycle's`;
files changed with line counts; each check as command and exit code; the own-work check; choices with the way rejected and the cost if wrong; reaches beyond the handoff; and **Searches not found or unclear** (each thing looked for and not found, or unclear, or `none`).
