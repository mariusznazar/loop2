# Handoff — slice 4 of the plan (stage: make-change, a slice, or the retry of a slice)

You are the executor of slice 4 of the plan of one task of a the-way cycle. You make the code of
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
  `task/kronika-z-filtrami`. Slice base (the head before your first commit): `416c10d`. The
  worktree is clean when you start. Pinned the-way: `.the-way` at `294af7f`; use no personal skill of
  the same name without the `the-way-` prefix.
- Method: `.the-way/task-cycle/change/SKILL.md` — your variant is **a slice, or the retry of a
  slice**, so read `.the-way/task-cycle/change/slice.md` whole; where your slice changes a user
  interface read `.the-way/task-cycle/change/ui_check.md` when its step comes.
- Frozen task: `docs/task-cycles/kronika-z-filtrami/task.md` (sha256 prefix cd12745e0f8566f7). Reviewed spec:
  `docs/task-cycles/kronika-z-filtrami/spec.md`. Plan: `docs/task-cycles/kronika-z-filtrami/plan.md`. Read the passages of these that your slice's *Read*
  names; the task binds where the spec and the task differ, the spec where it settles more than the
  task, and the plan's slice where it divides the work. Do not reopen a design the spec settles.
- Your report: `docs/task-cycles/kronika-z-filtrami/reports/10-slice4-report.md`.
- Commits: on this branch, messages in English in the repository's form (`feat: :sparkles: <what>`,
  `fix: :bug: <what>`, `test: :white_check_mark: <what>`, `docs: :memo: <what>`; look at
  `git log` for the form), added **by path** (`git add <path>…`), never `git add -A`, `.` or
  `commit -a`. Leave no uncommitted change. The code is in English (identifiers, comments);
  what the code writes to the player stays in Polish as the task gives it.
- Answers of step 4: trust boundary no, irreversible operation no; every *Risk* is `none`.

## Foundation entries, with their current ranges

The foundation step has written and changed entries since the plan was made, so the plan's ranges
are stale. **These ranges hold** (they are the entries as the foundation step left them, at the
head `416c10d` or later). Read each whole:

- `foundations/decisions.md:52-124` D-04
- `foundations/decisions.md:2472-2504` D-131
- `foundations/decisions.md:3039-3052` D-164
- `foundations/decisions.md:3149-3162` D-171
- `foundations/decisions.md:3179-3192` D-173
- `foundations/decisions.md:3194-3207` D-174
- `foundations/decisions.md:3926-3964` D-212
- `foundations/decisions.md:5474-5514` D-265
- `foundations/decisions.md:5544-5571` D-267
- `foundations/decisions.md:6047-6064` D-283
- `foundations/decisions.md:7082-7095` D-324
- `foundations/decisions.md:7402-7441` D-339
- `foundations/decisions.md:7503-7535` D-342
- `foundations/decisions.md:7630-7653` D-346
- the glossary term `chronicle`: `foundations/glossary.md:248-252`
- invariant `copy-save`: `foundations/invariants.md:849-857`
- invariant `saved-program-edit`: `foundations/invariants.md:839-847`

Entries of the plan's *Foundation entries* are named in your slice as F-numbers: F1 = glossary term `chronicle`, F3 = D-339, F6 = D-342, F11 = D-346, F12 = D-04.
Ranges in your slice's *Read* below for `foundations/decisions.md` are the plan's; use the ones above.

## Your slice (word for word from `plan.md`)

### Slice 4 — The game view records every result into the chronicle; moves carry their hint

- **Goal:** the game view creates the chronicle memory of Slice 3 when it is built, from the game
  state it is built from, beside `createFolding`, and records into it every result in
  `store.apply`, after the result passes and before the screens draw, with the state before it; the
  five acts on the copy — `editCopy`, `saveCopy`, `saveCopyAsNew`, `discardCopy`, `switchProgram` —
  give the act's description with their result (spec, D2, D4; how it reaches `store.apply` is the
  maker's, *Left to the maker*). The three move sites of the editor — „↑”/„↓”, the drop of a rule,
  the drop of a group — give which rule or group the player moved, which travels through the
  panel's edit and `editCopy` to the chronicle and never into the simulation; an edit with no hint
  goes on as today. The memory is not yet handed to the screen of a map run (Slice 5). Tests show the
  hint reaching `editCopy` from each of the three sites, and no edit of a saved program carrying
  one.
- **Change:** `src/browser/view/game-view.ts` · `src/browser/view/program-panel.tsx` ·
  `src/browser/view/rule-list.tsx` · `tests/view/rule-editor.test.mjs` ·
  `tests/view/program-panel.test.mjs`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:28-28` To do (item 1) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:32-32` To do (item 5) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:47-52` Questions to settle (Pytanie 1) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:67-71` Questions to settle (Pytanie 4) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:138-143` Questions carried to cycle ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:64-151` Constraints ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:199-250` D2. The game view owns the chronicle in the memory of the page and records every result in store.apply ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:281-331` D4. The entries of a change of the copy ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:442-467` D10. Units and their interfaces (View) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:569-585` Left to the maker ·
  F1 · F3 · F6 · F11 · F12 · the modules Slice 3 made, the chronicle memory and the composing of entries ·
  `foundations/decisions.md:52-119` D-04 (as F12 leaves it) · `foundations/decisions.md:2466-2498` D-131 ·
  `foundations/decisions.md:3033-3046` D-164 · `foundations/decisions.md:3143-3156` D-171 ·
  `foundations/decisions.md:3173-3186` D-173 · `foundations/decisions.md:3188-3201` D-174 ·
  `foundations/decisions.md:3920-3958` D-212 · `foundations/decisions.md:5468-5508` D-265 ·
  `foundations/decisions.md:5538-5565` D-267 · `foundations/decisions.md:6041-6058` D-283 ·
  `foundations/decisions.md:7066-7079` D-324 ·
  `foundations/invariants.md:839-847` saved-program-edit · `foundations/invariants.md:849-857` copy-save ·
  `foundations/glossary.md:65-71` map run restart · `foundations/glossary.md:130-134` manual map run ·
  `foundations/glossary.md:174-178` copy · `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/clock.ts` · `src/browser/view/program-editor.ts:60-330`
- **Model:** same — set by the orchestrator in the plan's review: the recording sits in `store.apply`, which every result passes, and the hint crosses three sites of the editor, so a wrong first attempt costs more than the class
- **Risk:** none
- **Checks:** the hint cases written first and seen failing:
  `npm test -- tests/view/rule-editor.test.mjs`, `npm test -- tests/view/program-panel.test.mjs`;
  then `npm test -- tests/view/end-question.test.mjs`, `npm test -- tests/view/account-screen.test.mjs`,
  `npm test -- tests/view/uncaught-failure.test.mjs`, `npm test -- tests/view/chronicle.test.mjs`;
  `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3 · F3 · F6 · F11 · F12


## What the earlier slices left, from their reports (the interfaces you build on)

Reports: `docs/task-cycles/kronika-z-filtrami/reports/09-slice3-report.md` (read its section "What the
slice gives" whole). In short, the chronicle modules of Slice 3 are `src/browser/view/chronicle.ts`
(`createChronicle(state)` with `record(result, before, act?)`, `pickTab`, `pickFilter`, `snapshot()`,
`window(filter, size)`; no React, no DOM, no `subscribe`) and `src/browser/view/chronicle-entries.ts`
(pure composing; the types `MoveHint` — `{kind:"rule"; ruleId} | {kind:"group"; groupId}` — and
`CopyAct` — `{kind:"edit"; move: MoveHint|null} | discard | save | saveAsNew | switch`). The
simulation reports the events `streakLost` (Slice 1) and `campfireExtinguished` (Slice 2).
Read these files whole before you use them; the report is a summary, the code is the interface.

## What the report holds

As `make-change` and `slice.md` give: status (`done`, `done with concerns`, `questions`,
`returned`, `reserved` or `blocked`), your commits (hashes) and the range from the slice base to
your head, each check with its command and exit code, whether you saw each new test fail first, the
**own-work check** (the requirement you were most likely to miss and the check you made of it),
every reach beyond this handoff (what, where, why), the files you changed beyond the slice's
*Change* (a small mismatch, one line each), and **Searches not found or unclear** (each thing
looked for and not found or unclear, or `none`). Return your status, your commits and the report
path in one short message.
