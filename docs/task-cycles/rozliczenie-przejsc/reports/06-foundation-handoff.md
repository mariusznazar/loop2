# Handoff — agent of the plan's *Foundation entries*, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the agent of the plan's *Foundation
entries*, a fresh agent: you write the entries before Slice 1 and no code. Your questions go to the
orchestrator, never to the human; you return at your boundary. A question the foundation step
leaves to the human returns as `blocked`, with the question.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`, head = base `95de83b` (`main`). Process pin `.the-way` at `a8dfe8a`,
  not moved by this task.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes. Your stage is the foundation step: you take
  none of that file's table of variants.
- Your stage: `.the-way/task-cycle/skill/foundation_step.md`. Read it whole. When you write an entry
  of an element, read that element's skill, by the project skills `the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-glossary-term`, each in the worktree's `.the-way`.
- Report path: `.runs/task-cycles/rozliczenie-przejsc/reports/06-foundation-report.md`
- Do not run the product's gate (`npm test`); it is the orchestrator's. Your check is
  `python -B .the-way/elements/common/foundation_check.py`; give its command and exit code.

## Git

Commit on the task branch, in the worktree, by explicit paths (`git add foundations/…`, never
`git add -A`, `.` or `commit -a`). Messages in English in the form of the repository's commits, for
instance `docs: :memo: …`. Do not push. Check that the commit's address is `mariusznn@gmail.com`
(`git log -1 --format='%h %ae'`).

## Answers of step 4

- Trust boundary: **yes**, `src/browser/sim/saved-game.ts`; you touch no code.
- Irreversible operation: **yes**, raising `SAVED_GAME_VERSION`; the cycle only prepares it, and
  the human performs it by merging. Name that in no entry beyond what the spec's rows say.

## What you write

The plan's section *Foundation entries*, word for word (`.runs/task-cycles/rozliczenie-przejsc/plan.md`):

> | Entry | Kind | From | What depends on it |
> |---|---|---|---|
> | `solved-map-manual-run` | invariant, new; check: cases of `tests/sim/trip.test.mjs` under the marker of this name | projected `solved-map-manual-run/1`, carried in full; To do 22; spec, *Foundation entries* | Slice 1 |
> | D-189 | decision, changed | projected „What pays, and what takes from the chest?”, the part this code makes true; To do 22; spec, *Foundation entries* | Slice 1 |
> | D-190 | decision, changed | projected „What does a character's death take?”, the part this code makes true; To do 22; spec, decision 11 and *Foundation entries* | Slice 3 |
> | `manual map run` | glossary term, stands in the foundation; nothing to write | projected, written by task 7 (task, *Context*) | Slice 1 |
> | Row 1 (spec: D-214) | decision, new | *Settlements to record*, row 1 | Slice 1 |
> | Row 2 (D-194) | decision, changed | *Settlements to record*, row 2; To do 22 | Slice 1 |
> | Row 3 (spec: D-215) | decision, new | *Settlements to record*, row 3 | Slice 4 |
> | Row 4 (spec: D-216) | decision, new | *Settlements to record*, row 4 | Slice 4 |
> | Row 5 (spec: D-217) | decision, new | *Settlements to record*, row 5 | Slice 5 |
> | Row 6 (spec: D-218) | decision, new | *Settlements to record*, row 6 | Slice 5 |
> | Row 7 (spec: D-219) | decision, new | *Settlements to record*, row 7 | Slice 3 · Slice 5 |
> | Row 8 (spec: D-220) | decision, new | *Settlements to record*, row 8 | Slice 2 |
> | Row 9 (`resurrection-renewal`) | invariant, new; check: cases of `tests/sim/death.test.mjs` under the marker of this name | *Settlements to record*, row 9 | Slice 2 · Slice 3 |
> | Row 10 (`death-settled-once`) | invariant, new; check: cases of `tests/sim/death.test.mjs` under the marker of this name, the load case of spec decision 10 included | *Settlements to record*, row 10 | Slice 3 |
> | Row 11 (`resurrection`) | glossary term, new | *Settlements to record*, row 11 | Slice 2 · Slice 3 |
> | Row 12 (`generation number`) | glossary term, new | *Settlements to record*, row 12 | Slice 2 · Slice 3 · Slice 5 |
> | D-04 | decision, changed | spec, decision 7 and *Foundation entries* | Slice 3 · Slice 5 |
> | D-03 | decision, changed | spec, decision 7 and *Foundation entries* | Slice 5 |
> | D-179 | decision, changed | spec, *Foundation entries*; To do 5 | Slice 1 |
> | `trip-transfer` | invariant, changed; check: its existing cases of `tests/sim/trip.test.mjs` under its marker, changed in Slice 1 | To do 22; spec, *Foundation entries* | Slice 1 |
> | `trip-run-end` | invariant, changed; check: its existing cases of `tests/sim/trip.test.mjs` under its marker, changed in Slice 1 | To do 22; spec, *Foundation entries* | Slice 1 |
>
> The agent of these entries writes them before Slice 1, from `spec.md:284-325`, as the foundation
> step gives. Each `// invariant:` marker of a slice names an entry that stands by then.

## What to read

- `.runs/task-cycles/rozliczenie-przejsc/spec.md:284`–`339`, *Foundation entries* and *Left to the
  maker*, and its decision 11 at the lines just above; decisions 1–9 where a row points to one.
- `.runs/task-cycles/rozliczenie-przejsc/task.md`, read whole, 254 lines, in two pages: the rows and
  the answers to *Questions to settle* give the entries' wording, Q9 the wording rule, and
  *Decisions in play* the projected wording.
- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md` (sha256
  `fda97782458d…`), lines 1450–1541 and 2178–2190: the approved wording, *Rationale*, *Rejected* and
  *Verification* of the projected entries.
- The entries you change, whole, and as each element's skill gives. Decisions you write beside:
  `foundations/decisions.md`, D-192 too, whose first sentence says what describes a character: the
  spec's lists do not name it. Compare it with the new keys, and report what you find.
- `foundations/part_map.md` for *Scope* and *Part* identifiers.

The spec's wording in a row is the meaning; the sentence you write goes by the element's skill.
Where the spec, the task and an entry disagree, return `questions`.
