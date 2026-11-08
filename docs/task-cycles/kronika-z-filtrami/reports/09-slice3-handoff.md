# Handoff — slice 3 of the plan (stage: make-change, a slice, or the retry of a slice)

You are the executor of slice 3 of the plan of one task of a the-way cycle. You make the code of
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
  `task/kronika-z-filtrami`. Slice base (the head before your first commit): `6392714`. The
  worktree is clean when you start. Pinned the-way: `.the-way` at `294af7f`; use no personal skill of
  the same name without the `the-way-` prefix.
- Method: `.the-way/task-cycle/change/SKILL.md` — your variant is **a slice, or the retry of a
  slice**, so read `.the-way/task-cycle/change/slice.md` whole; where your slice changes a user
  interface read `.the-way/task-cycle/change/ui_check.md` when its step comes.
- Frozen task: `docs/task-cycles/kronika-z-filtrami/task.md` (sha256 prefix cd12745e0f8566f7). Reviewed spec:
  `docs/task-cycles/kronika-z-filtrami/spec.md`. Plan: `docs/task-cycles/kronika-z-filtrami/plan.md`. Read the passages of these that your slice's *Read*
  names; the task binds where the spec and the task differ, the spec where it settles more than the
  task, and the plan's slice where it divides the work. Do not reopen a design the spec settles.
- Your report: `docs/task-cycles/kronika-z-filtrami/reports/09-slice3-report.md`.
- Commits: on this branch, messages in English in the repository's form (`feat: :sparkles: <what>`,
  `fix: :bug: <what>`, `test: :white_check_mark: <what>`, `docs: :memo: <what>`; look at
  `git log` for the form), added **by path** (`git add <path>…`), never `git add -A`, `.` or
  `commit -a`. Leave no uncommitted change. The code is in English (identifiers, comments);
  what the code writes to the player stays in Polish as the task gives it.
- Answers of step 4: trust boundary no, irreversible operation no; every *Risk* is `none`.

## Foundation entries, with their current ranges

The foundation step has written and changed entries since the plan was made, so the plan's ranges
are stale. **These ranges hold** (they are the entries as the foundation step left them, at the
head `6392714` or later). Read each whole:

- `foundations/decisions.md:52-124` D-04
- `foundations/decisions.md:852-865` D-39
- `foundations/decisions.md:2220-2263` D-122
- `foundations/decisions.md:2265-2296` D-123
- `foundations/decisions.md:2472-2504` D-131
- `foundations/decisions.md:2506-2531` D-132
- `foundations/decisions.md:2792-2805` D-147
- `foundations/decisions.md:3039-3052` D-164
- `foundations/decisions.md:3179-3192` D-173
- `foundations/decisions.md:3194-3207` D-174
- `foundations/decisions.md:3926-3964` D-212
- `foundations/decisions.md:6284-6301` D-292
- `foundations/decisions.md:6751-6790` D-312
- `foundations/decisions.md:7232-7276` D-334
- `foundations/decisions.md:7380-7400` D-338
- `foundations/decisions.md:7402-7441` D-339
- `foundations/decisions.md:7443-7471` D-340
- `foundations/decisions.md:7473-7501` D-341
- `foundations/decisions.md:7503-7535` D-342
- `foundations/decisions.md:7537-7569` D-343
- `foundations/decisions.md:7571-7603` D-344
- `foundations/decisions.md:7605-7628` D-345
- `foundations/decisions.md:7630-7653` D-346
- the glossary term `chronicle`: `foundations/glossary.md:248-252`
- invariant `content-identifiers`: `foundations/invariants.md:236-246`
- invariant `rule-state-from-pick`: `foundations/invariants.md:1219-1227`
- invariant `saved-program-edit`: `foundations/invariants.md:839-847`

Entries of the plan's *Foundation entries* are named in your slice as F-numbers: F1 = glossary term `chronicle`, F2 = D-338, F3 = D-339, F4 = D-340, F5 = D-341, F6 = D-342, F8 = D-343, F9 = D-344, F10 = D-345, F11 = D-346, F12 = D-04, F14 = D-122, F15 = D-147.
Ranges in your slice's *Read* below for `foundations/decisions.md` are the plan's; use the ones above.

## Your slice (word for word from `plan.md`)

### Slice 3 — The chronicle memory and the composing of its entries

- **Goal:** a view module with no React and no DOM, the chronicle memory, exists as the spec's D2,
  D6 and D7 give: created from a game state (empty, the place of the paragraph where the state's map
  run holds a `lastCombat`, at its attack minute, the wait mark from the current activity,
  „Kronika” and „Wszystko”); it records a result with the state before it and, for an act on the
  copy, the act's description; it clears and keeps as D2 gives for a send, „Restart” and „Zakończ”;
  it is told the tab and the filter picked; it gives the newest entries of a filter in a window,
  the place of the paragraph, the tab, the filter and the number that changes at every change, each
  kind's entries kept apart as well as in the whole order. Beside it, the pure composing of entries
  gives each event or act its kind, minute, text and role as the spec's D3, D4 and D5 give —
  including the comparison of the copy before and after an act with the optional hint of a move —
  and the type of that hint, which Slice 4 carries from the editor. A pure function gives the
  band's text for a game state without its buttons (spec, D8); `discovery-band.tsx` uses it, and
  the chronicle calls it on the state returned with the `discovered` event. The words shared with
  „Teraz” — the wait and the causes of death — are read by both from `now-lines.ts`. Nothing
  renders the chronicle yet. The unit tests of the spec's D11 for recording, for the comparison of
  copies and for the discovery's entry equal to the band's text exist and pass. The file names below
  are the plan's; a name the maker finds clearer is a small mismatch to report.
- **Change:** `src/browser/view/chronicle.ts` · `src/browser/view/chronicle-entries.ts` ·
  `src/browser/view/discovery-band-text.ts` · `src/browser/view/discovery-band.tsx` ·
  `src/browser/view/now-lines.ts` · `tests/view/chronicle.test.mjs` ·
  `tests/view/chronicle-entries.test.mjs`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:26-34` To do (items 1 to 7) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:47-78` Questions to settle (Pytanie 1 to Pytanie 5) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:93-102` Questions to settle (Pytanie 8 and Pytanie 9) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:111-116` Questions to settle (Pytanie 12) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:199-219` Settlements to record and Out of scope ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:16-62` Intent and Goals and non-goals ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:64-151` Constraints ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:199-405` D2 to D8 ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:442-467` D10. Units and their interfaces (View) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:489-499` D11. Tests the design makes necessary, by kind (view: recording, comparison, discovery) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:569-585` Left to the maker ·
  F1 · F2 · F3 · F4 · F5 · F6 · F8 · F9 · F10 · F11 · F12 · F14 · F15 ·
  `foundations/decisions.md:52-119` D-04 (as F12 leaves it) · `foundations/decisions.md:846-859` D-39 ·
  `foundations/decisions.md:2214-2257` D-122 (as F14 leaves it) · `foundations/decisions.md:2259-2290` D-123 ·
  `foundations/decisions.md:2466-2498` D-131 · `foundations/decisions.md:2500-2525` D-132 ·
  `foundations/decisions.md:2786-2799` D-147 (as F15 leaves it) · `foundations/decisions.md:3033-3046` D-164 ·
  `foundations/decisions.md:3173-3186` D-173 · `foundations/decisions.md:3188-3201` D-174 ·
  `foundations/decisions.md:3920-3958` D-212 · `foundations/decisions.md:6278-6295` D-292 ·
  `foundations/decisions.md:6735-6774` D-312 · `foundations/decisions.md:7216-7260` D-334 ·
  `foundations/invariants.md:236-246` content-identifiers · `foundations/invariants.md:839-847` saved-program-edit ·
  `foundations/invariants.md:1219-1227` rule-state-from-pick ·
  `foundations/glossary.md:53-71` program rule, rule group, map run restart ·
  `foundations/glossary.md:80-85` extinguished campfire · `foundations/glossary.md:130-154` manual map run, completion, solved map, streak ·
  `foundations/glossary.md:174-178` copy · `foundations/glossary.md:199-203` trip plan ·
  `foundations/glossary.md:217-221` earning loop · `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/run.ts` · `src/browser/sim/types.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/understanding.ts:460-482` · `src/browser/view/status-row.ts` ·
  `src/browser/view/program-editor.ts:780-830` · `src/browser/view/discovery-rule.ts` ·
  `tests/view/discovery-band.test.mjs` · `tests/view/now-lines.test.mjs`
- **Model:** strongest — the comparison of the copy before and after an act has to find a moved rule
  or group without a hint by an algorithm the spec leaves to the maker (D4), and the memory holds the
  clearing rules, the window and the paragraph's place at once.
- **Risk:** none
- **Checks:** `tests/view/chronicle.test.mjs` and `tests/view/chronicle-entries.test.mjs` written
  first and seen failing: `npm test -- tests/view/chronicle.test.mjs`,
  `npm test -- tests/view/chronicle-entries.test.mjs`; then
  `npm test -- tests/view/discovery-band.test.mjs`, `npm test -- tests/view/now-lines.test.mjs`,
  `npm test -- tests/view/run-screen.test.mjs`; after `npm run build`:
  `npm test -- tests/invariants/test_content_identifiers.py`; `npm run typecheck`;
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 2 · F1 · F2 · F3 · F4 · F5 · F6 · F9 · F10 · F11 · F12 · F14 · F15

## What the report holds

As `make-change` and `slice.md` give: status (`done`, `done with concerns`, `questions`,
`returned`, `reserved` or `blocked`), your commits (hashes) and the range from the slice base to
your head, each check with its command and exit code, whether you saw each new test fail first, the
**own-work check** (the requirement you were most likely to miss and the check you made of it),
every reach beyond this handoff (what, where, why), the files you changed beyond the slice's
*Change* (a small mismatch, one line each), and **Searches not found or unclear** (each thing
looked for and not found or unclear, or `none`). Return your status, your commits and the report
path in one short message.
