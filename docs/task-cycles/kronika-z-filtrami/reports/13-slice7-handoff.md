# Handoff — slice 7 of the plan (stage: make-change, a slice, or the retry of a slice)

You are the executor of slice 7 of the plan of one task of a the-way cycle. You make the code of
this slice, test first where it fits, commit it, and report. You write no plan, you do not widen the
slice, and you run no full gate (`npm test` with no file) — the orchestrator runs it; you run the
focused checks the slice's *Checks* lists, each with its command and exit code.

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator
(Sonnet 5.5). Questions that change what the work means go to the orchestrator in your report
(status `questions`), never to the human. An answer from the orchestrator is never the human's
approval.

## Where you work

- Worktree (work from its root): `the worktree root`, branch
  `task/kronika-z-filtrami`. Slice base (the head before your first commit): `2ca73e1`. The
  worktree is clean when you start. Pinned the-way: `.the-way` at `294af7f`; use no personal skill of
  the same name without the `the-way-` prefix.
- Method: `.the-way/task-cycle/change/SKILL.md` — your variant is **a slice, or the retry of a
  slice**, so read `.the-way/task-cycle/change/slice.md` whole; where your slice changes a user
  interface read `.the-way/task-cycle/change/ui_check.md` when its step comes.
- Frozen task: `docs/task-cycles/kronika-z-filtrami/task.md` (sha256 prefix cd12745e0f8566f7). Reviewed spec:
  `docs/task-cycles/kronika-z-filtrami/spec.md`. Plan: `docs/task-cycles/kronika-z-filtrami/plan.md`. Read the passages of these that your slice's *Read*
  names; the task binds where the spec and the task differ, the spec where it settles more than the
  task, and the plan's slice where it divides the work. Do not reopen a design the spec settles.
- Your report: `docs/task-cycles/kronika-z-filtrami/reports/13-slice7-report.md`.
- Commits: on this branch, messages in English in the repository's form (`feat: :sparkles: <what>`,
  `fix: :bug: <what>`, `test: :white_check_mark: <what>`, `docs: :memo: <what>`; look at
  `git log` for the form), added **by path** (`git add <path>…`), never `git add -A`, `.` or
  `commit -a`. Leave no uncommitted change. The code is in English (identifiers, comments);
  what the code writes to the player stays in Polish as the task gives it.
- Answers of step 4: trust boundary no, irreversible operation no; every *Risk* is `none`.

## Foundation entries, with their current ranges

The foundation step has written and changed entries since the plan was made, so the plan's ranges
are stale. **These ranges hold** (they are the entries as the foundation step left them, at the
head `2ca73e1` or later). Read each whole:

- the glossary term `chronicle`: `foundations/glossary.md:248-252`

Entries of the plan's *Foundation entries* are named in your slice as F-numbers: none named.
Ranges in your slice's *Read* below for `foundations/decisions.md` are the plan's; use the ones above.

## Your slice (word for word from `plan.md`)

### Slice 7 — The coding guidelines' tables know the new files

- **Goal:** through the project skill `the-way-maintain-coding-guidelines`, whose table says that in
  a task cycle the cycle's author writes the files of the coding guidelines as
  `.the-way/product-guidelines/coding/template.md` gives, the table *Files of this kind* of
  `guidelines/coding-browser-module.md` has a row for each new file of `src/browser/view/` this
  change added (the chronicle memory, the composing of entries, the band's text function and the
  right-area component, under the names Slices 3 and 5 gave them), each with the status of the
  rows of its like — a pure module or a React screen part after the exemplar — and `—` as its
  decision; `guidelines/coding-simulation-module.md` gains a row only for a new file of
  `src/browser/sim/`, and where the change added none it stays as it is and the report says so.
- **Change:** `guidelines/coding-browser-module.md` · `guidelines/coding-simulation-module.md`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:39-39` To do (item 12) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:429-467` D10. Units and their interfaces ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:563-567` Foundation entries (guideline changes) ·
  the new files Slices 1 to 5 added ·
  `foundations/part_map.md:118-133` agent-workflow ·
  `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.the-way/product-guidelines/coding/SKILL.md` ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `guidelines/coding.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 3 · Slice 5


## The new files of the change (from the slices' reports and `git diff --name-status`)

Run `git diff --name-status 3ea46e8..HEAD -- src` for the files the slices added or changed; as of
the head the new files of `src/browser/view/` are: `chronicle.ts`, `chronicle-entries.ts`,
`discovery-band-text.ts` and `right-area.tsx`; `src/browser/sim/` has no new file (the two new
events changed `run.ts`, `body.ts`, `programs.ts` and `game.ts`). `chronicle.ts` has no React and no
DOM (a stateful module read by a screen); `chronicle-entries.ts` and `discovery-band-text.ts` are
pure; `right-area.tsx` is a React screen part. The plan's slice 3 and 5 reports name them:
`docs/task-cycles/kronika-z-filtrami/reports/09-slice3-report.md`,
`docs/task-cycles/kronika-z-filtrami/reports/11-slice5-report.md`. Task 14's slice gave its two new
view files (`now-lines.ts`, `now-rows.tsx`) the status `copy` in the table
(`git show 434f32b -- guidelines/coding-browser-module.md`): that is the precedent for the status of
a file of its like; a status you give differently is a remark in your report.

## What the report holds

As `make-change` and `slice.md` give: status (`done`, `done with concerns`, `questions`,
`returned`, `reserved` or `blocked`), your commits (hashes) and the range from the slice base to
your head, each check with its command and exit code, whether you saw each new test fail first, the
**own-work check** (the requirement you were most likely to miss and the check you made of it),
every reach beyond this handoff (what, where, why), the files you changed beyond the slice's
*Change* (a small mismatch, one line each), and **Searches not found or unclear** (each thing
looked for and not found or unclear, or `none`). Return your status, your commits and the report
path in one short message.
