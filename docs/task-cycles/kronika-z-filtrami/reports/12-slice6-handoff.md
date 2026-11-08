# Handoff — slice 6 of the plan (stage: make-change, a slice, or the retry of a slice)

You are the executor of slice 6 of the plan of one task of a the-way cycle. You make the code of
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
  `task/kronika-z-filtrami`. Slice base (the head before your first commit): `2b74988`. The
  worktree is clean when you start. Pinned the-way: `.the-way` at `294af7f`; use no personal skill of
  the same name without the `the-way-` prefix.
- Method: `.the-way/task-cycle/change/SKILL.md` — your variant is **a slice, or the retry of a
  slice**, so read `.the-way/task-cycle/change/slice.md` whole; where your slice changes a user
  interface read `.the-way/task-cycle/change/ui_check.md` when its step comes.
- Frozen task: `docs/task-cycles/kronika-z-filtrami/task.md` (sha256 prefix cd12745e0f8566f7). Reviewed spec:
  `docs/task-cycles/kronika-z-filtrami/spec.md`. Plan: `docs/task-cycles/kronika-z-filtrami/plan.md`. Read the passages of these that your slice's *Read*
  names; the task binds where the spec and the task differ, the spec where it settles more than the
  task, and the plan's slice where it divides the work. Do not reopen a design the spec settles.
- Your report: `docs/task-cycles/kronika-z-filtrami/reports/12-slice6-report.md`.
- Commits: on this branch, messages in English in the repository's form (`feat: :sparkles: <what>`,
  `fix: :bug: <what>`, `test: :white_check_mark: <what>`, `docs: :memo: <what>`; look at
  `git log` for the form), added **by path** (`git add <path>…`), never `git add -A`, `.` or
  `commit -a`. Leave no uncommitted change. The code is in English (identifiers, comments);
  what the code writes to the player stays in Polish as the task gives it.
- Answers of step 4: trust boundary no, irreversible operation no; every *Risk* is `none`.

## Foundation entries, with their current ranges

The foundation step has written and changed entries since the plan was made, so the plan's ranges
are stale. **These ranges hold** (they are the entries as the foundation step left them, at the
head `2b74988` or later). Read each whole:

- `foundations/decisions.md:852-865` D-39
- `foundations/decisions.md:867-880` D-40
- `foundations/decisions.md:957-970` D-46
- `foundations/decisions.md:2449-2470` D-130
- `foundations/decisions.md:5830-5866` D-276
- `foundations/decisions.md:6696-6749` D-311
- `foundations/decisions.md:7187-7200` D-331
- `foundations/decisions.md:7537-7569` D-343
- `foundations/decisions.md:7571-7603` D-344
- the glossary term `chronicle`: `foundations/glossary.md:248-252`

Entries of the plan's *Foundation entries* are named in your slice as F-numbers: F7 = D-343, F8 = D-343, F9 = D-344, F16 = D-311, F19 = D-276.
Ranges in your slice's *Read* below for `foundations/decisions.md` are the plan's; use the ones above.

## Your slice (word for word from `plan.md`)

### Slice 6 — The styleguide says how the chronicle uses roles, font and shared controls

- **Goal:** through the project skill `the-way-maintain-styleguide`, whose table says that in a
  task cycle the cycle's author writes the styleguide's file as
  `.the-way/product-guidelines/styleguide/template.md` gives, each rule citing its decision,
  `guidelines/styleguide-browser-view.md` says how the chronicle uses the roles (`panel`,
  `text-label` for the minute, `discovery`, `player-change`, `danger`, `positive`, `text`,
  `text-secondary` for „Nic tu jeszcze nie ma.”), Geist Mono for the list, the tabs „Kronika” and
  „Teren” of the right area as a second place of the look of a tab, and the filter row in the look
  of the pace buttons — as the code of Slices 3 and 5 does it and the task and F7, F8, F9, F16 and
  F19 settle it. It writes no meaning the task did not settle; where F19 left D-276 as it stood,
  the styleguide is where the second place of tabs is recorded (spec, *Foundation entries*).
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:35-38` To do (items 8, 9 and 11) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:85-92` Questions to settle (Pytanie 7) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:111-116` Questions to settle (Pytanie 12) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:333-355` D5. Readings of the task's wording this design writes down ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:407-427` D9. The right area: tabs, filters, list ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:563-567` Foundation entries (guideline changes) ·
  F7 · F8 · F9 · F16 · F19 ·
  the right-area component Slice 5 made and its rules in `src/browser/styles.css` ·
  `foundations/decisions.md:846-874` D-39, D-40 · `foundations/decisions.md:951-964` D-46 ·
  `foundations/decisions.md:2443-2464` D-130 · `foundations/decisions.md:5824-5860` D-276 (as F19 leaves it) ·
  `foundations/decisions.md:6690-6733` D-311 (as F16 leaves it) · `foundations/decisions.md:7171-7184` D-331 ·
  `foundations/part_map.md:118-133` agent-workflow ·
  `.claude/skills/the-way-maintain-styleguide/SKILL.md` · `.the-way/product-guidelines/styleguide/SKILL.md` ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/styleguide/template.md` ·
  `src/browser/styles.css` · `src/browser/tokens.css`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`;
  `npm test -- tests/invariants/test_browser_view_token_values.py` (the guideline's examples)
- **Depends on:** Slice 5 · F7 · F8 · F9 · F16 · F19


## What the earlier slices left, from their reports

- Slice 5's report, `docs/task-cycles/kronika-z-filtrami/reports/11-slice5-report.md` (read its
  sections "What was made" and "Choices"), and the code it made: `src/browser/view/right-area.tsx`
  (the tabs in a container of class `right-tabs tabs`, the filter row `chronicle-filters`, the list
  `chronicle-list` with `chronicle-row`, `chronicle-minute`, `chronicle-text` and the role class,
  `chronicle-empty`) and its rules in `src/browser/styles.css`. Write the styleguide from what the
  code does and what the task and the decisions settle, not from this summary. The screenshots of
  the real browser are in `docs/task-cycles/kronika-z-filtrami/screenshots/` (read the ones you
  need with an image reader; they are not committed).
- The foundation entries D-338 … D-347 and the changes of D-04, D-122, D-147, D-185, D-272 and
  D-311 are written; the ranges above are current.
- Report in **Concerns** of slice 5, item 1: the table of revealed tiles under „Teren" is cut at the
  right edge by an existing width and `overflow-x`; it is not this task's and you do not fix it. If
  the styleguide already says something about that table, say nothing new; do not write about it.

## What the report holds

As `make-change` and `slice.md` give: status (`done`, `done with concerns`, `questions`,
`returned`, `reserved` or `blocked`), your commits (hashes) and the range from the slice base to
your head, each check with its command and exit code, whether you saw each new test fail first, the
**own-work check** (the requirement you were most likely to miss and the check you made of it),
every reach beyond this handoff (what, where, why), the files you changed beyond the slice's
*Change* (a small mismatch, one line each), and **Searches not found or unclear** (each thing
looked for and not found or unclear, or `none`). Return your status, your commits and the report
path in one short message.
