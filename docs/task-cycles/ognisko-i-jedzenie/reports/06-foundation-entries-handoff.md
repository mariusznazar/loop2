# Handoff — foundation entries F1–F20, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You
make the plan's **Foundation entries** (row `Foundation entries` of the cycle, before Slice 1) with
the project skill **`the-way-make-change`** (read its method and what it names, whole). The stage
is the cycle's **foundation step**: read whole the paragraph of
`.the-way/task-cycle/skill/SKILL.md` that begins "The foundation step writes the entries the task
carries" (in *Execute, verify and review*, before step 9), and write each entry through the pinned
project skill of its element — `the-way-record-decision`, `the-way-record-invariant`,
`the-way-record-glossary-term` — each read whole with what it names.

Boundary: write only F1–F20 into `foundations/` (and what the element skills themselves require in
the same files); write no code, no test, no data, and none of F21–F24 (Slices 10 and 13 write
those). Commit on the branch. Questions go to the orchestrator in your report — never to the human.
A question the foundation step allows to reach the human (the paragraph names them) you return with
status `blocked`, never writing a row with another meaning.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`, base
  (and this stage's base) a945cf1d4c62e8cdac222a7de47277c08a77b2c5. Pinned the-way `.the-way` at
  86b78ad.
- Frozen task (read whole): `.runs/task-cycles/ognisko-i-jedzenie/task.md`.
- Reviewed spec: `.runs/task-cycles/ognisko-i-jedzenie/spec.md` — read *Decisions* (lines 140–372)
  and *Foundation entries* (lines 414–475) whole.
- Plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`, section *Foundation entries* (lines 7–47) —
  copied below word for word.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/06-foundation-entries-report.md`.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**`; not touched by this stage.
- Irreversible operation: no.

## The plan's section (word for word, `plan.md:7-47`)

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| F1 — body temperature in °C with tenths | decision (new) | *Settlements to record*, row 1 | Slices 3, 4, 9, 11 |
| F2 — cooling by the map's ambient temperature, which stands in the map's data | decision (new) | *Settlements to record*, row 2 | Slices 3, 4 |
| F3 — warming capped at the starting temperature, eating at the starting satiety | decision (new) | *Settlements to record*, row 3 | Slices 3, 4, 6, 8 |
| F4 — health lost per minute of chill and per minute of hunger, regained otherwise up to full | decision (new) | *Settlements to record*, row 4 | Slices 3, 4 |
| F5 — death in the minute health reaches zero, also during an action, with its cause | decision (new) | *Settlements to record*, row 5 | Slices 4, 11 |
| F6 — the screen after death: state of the death minute, time stopped, „Restart” and „Zakończ” | decision (new) | *Settlements to record*, row 6 | Slices 4, 11 |
| F7 — `map run restart` also in place of a map run ended in death still on the screen | glossary term (changed) | *Settlements to record*, row 7 | Slices 4, 11 |
| F8 — „Zapal” an ordinary action paid with sticks until task 9 | decision (new) | *Settlements to record*, row 8 | Slice 8 |
| F9 — the backpack's cap counts all pieces together, its height the character's carrying capacity | decision (new) | *Settlements to record*, row 9 | Slices 3, 5, 7, 11 |
| F10 — gathering not feasible with a full backpack | decision (new) | *Settlements to record*, row 10 | Slice 7 |
| F11 — a missed gathering leaves the tile's stock and gives no piece | decision (new) | *Settlements to record*, row 11 | Slice 7 |
| F12 — renewal by one piece per renewal time, up to the starting stock | decision (new) | *Settlements to record*, row 12 | Slice 6 |
| F13 — an extinguished campfire stays on its tile and can be lit again | decision (new) | *Settlements to record*, row 13 | Slices 6, 8 |
| F14 — each feeding adds its minutes of burning to those left, without a cap | decision (new) | *Settlements to record*, row 14 | Slice 8 |
| F15 — the campfire's icon on the drawing, its state in the tile's row of the list of revealed tiles | decision (new) | *Settlements to record*, row 15 | Slices 10, 12 |
| F16 — D-25 gains: gathering takes only from a revealed tile, as much as lies on it | decision (changed D-25) | projected entry "How does a character move?" (plan item, task *Decisions in play*) | Slice 7 |
| F17 — D-26 gains: a tile holds at most one campfire, which warms only that tile | decision (changed D-26) | projected entry "How does a program point at things of the world?" (plan item, task *Decisions in play*) | Slices 6, 8, 9 |
| F18 — the order in which a game minute of a map run takes effect | decision (new) | spec, *Foundation entries*, first item; Decision 1 | Slices 4, 6, 7, 8, 13 |
| F19 — invariant `minute-span-split`; check: test `tests/invariants/test_minute_span_split.py`, written in Slice 13 | invariant (new) | spec, *Foundation entries*, second item | Slice 13 |
| F20 — crafting a campfire and lighting a stick are carried out on a revealed tile, as gathering is | decision (new) | spec, Decision 4 and *Foundation entries* (cycle Q-10) | Slices 8, 12 |

F1–F20 are written by the foundation step before Slice 1, each through the pinned skill of its
element. F21–F24 are written by the executor of the slice named in the entry, through the pinned
skill of its element, with the code that makes them true: the icon file and its author are not known
before Slice 10, and a part-map pattern naming a file git does not track yet fails
`foundation_check.py`. F19 stands before its test because F18's *Verification* names it.

## What binds the wording

- Each row's meaning is the row's (task, *Settlements to record*); the wording is yours, in the
  log's language (English). The human's rule for candidates built from MVP choices binds every
  entry from a row and F18, F20 (task, *Context*, the line beginning "Brzmienie kandydatów
  zbudowanych z wyborów na MVP"): it says what the game does now, opens with "In the MVP" (the
  log's rendering of „W MVP”), and holds no "only", "never", "always", "without" or other word that
  excludes an alternative; exclusions lasting beyond the task describe what the MVP game lacks, not
  what it may not have.
- F16 and F17 change D-25 and D-26 to the projected entries' approved wording quoted in the task's
  *Decisions in play* (the parts this task writes); keep everything of D-25 and D-26 that wording
  does not change.
- F18's proposed wording and its *Scope*, *Based on*, *Relations*, *Verification* and *Origin* stand
  in the spec's *Foundation entries*; F19's meaning, method and part too. F20's meaning stands in the
  spec's *Foundation entries* (item "Decision (new) from Decision 4").
- Where your search of the whole foundation finds a row's settlement already stated, write no second
  entry: tie the row to that entry and name both in your report.
- Run `python -B .the-way/elements/common/foundation_check.py` after the entries; name in your report
  any error it gives for F19 standing before its test file, and how the element's rules treat a test
  written later in the same change.
- For the request, keep one sentence of each entry's meaning **in Polish** (the task document's
  language), with its identifier, in your report.

## Read

Foundation (each entry whole): D-04, D-18–D-27, D-39, D-41, D-44 in `foundations/decisions.md`; the
invariants `program-rule-pick`, `action-in-progress`, `map-run-repeatability`,
`simulation-randomness`, `restart-seed`, `map-run-layout`, `map-run-tiles`, `icon-credits`,
`terrain-drawing-numbers` in `foundations/invariants.md`; the glossary whole
(`foundations/glossary.md`, short); `foundations/part_map.md` parts `simulation`, `browser-view`,
`product-foundation`. Each element skill adds what its operation needs.

Guidelines: `guidelines/coding.md` (for the commit and check conventions).
