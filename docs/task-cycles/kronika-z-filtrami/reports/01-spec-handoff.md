# Handoff 01 — designer of the spec (stage: write-spec, the designer)

You are the designer of the spec of one task of a the-way cycle. You write `spec.md`; you write no
plan, no code and no foundation entry, and you run no test or other check of the product. Your
boundary is the spec returned `done`, before any plan, slice or code.

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator
(Sonnet 5.5), and the orchestrator delegates to you the settling of the open design choice below.
Questions you cannot answer from the sources go to the orchestrator in your report (status
`questions`), never to the human. Never widen the task. An answer the orchestrator gives you is
never the human's approval.

## Where you work

- Worktree (work from its root): `the worktree root`, branch
  `task/kronika-z-filtrami`, base `6f36c7ab998ceaf996afb617ca95881b3f007b2d` (`main` after the merge
  of PR #65, task 14). The worktree is clean; change no tracked file.
- Method: `.the-way/task-cycle/spec/SKILL.md` (the designer's part; it names `design.md` for you
  to read when its step comes). The pinned the-way is `.the-way` at `294af7f`; the skills of the-way
  read it from the worktree's `.the-way`. Do not use a personal skill of the same name without the
  `the-way-` prefix.
- Spec path: `docs/task-cycles/kronika-z-filtrami/spec.md`
- Report path: `docs/task-cycles/kronika-z-filtrami/reports/01-spec-report.md`
- Frozen task, read whole: `docs/task-cycles/kronika-z-filtrami/task.md` (sha256 prefix
  cd12745e0f8566f7). It is Polish; write the spec in English as the-way's examples do, quoting the
  task's Polish strings exactly.

## Answers of step 4

- Trust boundary: no. The task forbids a change of the saved game's shape, so
  `src/browser/sim/saved-game.ts` (the trust boundary of `simulation`) is not touched, and
  `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**` (the boundary of `browser-view`) are not
  touched. If your design needs to read or change `saved-game.ts` or those assets, say so in the
  spec: the answer then turns into yes and every review is told.
- Irreversible operation: no.

## The open design choice (word for word from the frozen task, § Questions carried to cycle)

- Skąd widok bierze przyczynę utraty passy i opis zmiany programu: z nowych zdarzeń symulacji czy z porównania odczytów stanu gry? Kształt zapisu gry nie może się przy tym zmienić (pytanie 1); plan: „każde zadanie, które zmienia kształt stanu gry, podbija wersję raz w swojej zmianie".
- Skąd gra wie, że ognisko wygasło, skoro dziś nie zgłasza tego żadne zdarzenie symulacji (`src/browser/sim/run.ts:62-82`)?
- Gdzie w widoku żyje kronika, żeby przetrwała przejście do Siedziby i z powrotem, a nie weszła do stanu gry?
- Jak lista wpisów zostaje płynna przy 16× i długim przejściu (ryzyko z wpisu o tym, skąd agent wie, co poszło nie tak: „a tab left overnight may slow down under a growing chronicle")?

These four bind each other. Settle them together, as one design, and add any other choice of the
design that no settlement row, answer or decision in play settles (for example: what a "reading of
the game state" and a "game minute" mean for the first entry after a load; how the entry of a
change of the copy is told from the edit of another saved program; how the kind of an entry and the
filter relate; where the selected tab and the selected filter live; what the entries hold so that a
text of the chronicle needs no recomputation at 16×). The task's To do items 1–9 and its answers to
questions 1–12 settle what the player sees and are not to be reopened; the spec decides how the
code gets there, and names each of the following that the design changes or adds: simulation
functions and events, view modules, the game state (it must not change its shape: D-206's
`save-version` stays at 3), tests the design makes necessary at the level of kind (not the tests
themselves), and the foundation entries the task's *Decisions in play* and *Settlements to record*
leave to the cycle.

Facts the spec must check against the code at the base, because the task cites line numbers of
`b97fdd0` (task 14 has moved code since): `GameEvent` in `src/browser/sim/run.ts`; `setProgram` in
`src/browser/sim/game.ts` and the switch of program in `src/browser/sim/programs.ts`; where the
streak falls to zero (`run.ts`, `body.ts`, `programs.ts`); what `lastCombat` holds
(`src/browser/sim/types.ts`) and how `src/browser/view/world-area.tsx` builds the paragraph of the
last encounter; the screen `src/browser/view/run-screen.tsx` and its right area; the tokens in
`src/browser/tokens.css`; the pace buttons and the tabs of the login card for the controls the task
reuses (D-276). Quote the places you rely on at the base.

## What to read

Foundation entries of `foundations/decisions.md`, each read whole (heading to the next heading):
D-04, D-39, D-46, D-122, D-131, D-132, D-133, D-147, D-171, D-173, D-174, D-185, D-206, D-207,
D-212, D-216, D-255, D-276, D-283, D-291, D-292, D-308, D-309, D-311, D-312, D-316, D-324, D-334,
D-335, D-336, D-337 — those of the task's *Decisions in play* plus the ones task 14 and task 12
(already merged) wrote that the chronicle's neighbours depend on. Invariants of
`foundations/invariants.md`: `simulation-isolation`, `simulation-inputs`, `save-version`,
`streak-program-change`, `rule-state-from-pick`. Glossary (`foundations/glossary.md`): `chronicle`
and the terms those entries use that you need. The part map (`foundations/part_map.md`): the entries
`browser-view` and `simulation`.

Guideline files, each whole: `guidelines/coding-browser-module.md`,
`guidelines/coding-simulation-module.md`, `guidelines/styleguide-browser-view.md`,
`src/browser/AGENTS.md`.

Sources outside the repository (the task's own, read only the passages the task cites and only if
you need them to see the ways open): the vault note for the old Loop's chronicle is
`old-Loop-repo/src/components/probe/EventLog.tsx` and `old-Loop-repo/src/sim/policy.ts`
at `cdc7c0d`; reading outside the product repository is yours, writing there is not. Quote nothing
from private notes into the spec.

## What the report holds

As `design.md` gives: status (`questions`, `done` or `reserved`), the spec path, every reach beyond
this handoff (what, where, why), and **Searches not found or unclear** (each thing looked for and
not found or unclear, or `none`). Return your status, the spec path and the report path in one short
message; the report's full text lives at the report path.
