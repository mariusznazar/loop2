# Handoff — return step, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You
take the cycle's **return step** on the planned route, a fresh agent with the project skill
**`the-way-make-change`** (read its method and what it names, whole). Read whole step 11 of
`.the-way/task-cycle/skill/SKILL.md` ("Take the return step: …") and the paragraph it points to that
begins "The foundation step writes the entries the task carries" (in *Execute, verify and review*),
and write each entry through the pinned project skill of its element (`the-way-record-decision`,
`the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-record-environment-fact`,
`the-way-update-part-map`), each read whole.

Boundary: compare the foundation with the code and correct in this change whatever no longer
matches; write what step 11 lists; change no product code or test unless an entry's correction needs
nothing else (name it if so). Commit by explicit paths. Return `done`, `done with concerns`,
`questions` or `blocked` (a question the foundation step allows to reach the human — never write a
row with another meaning). Questions go to the orchestrator in your report.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`; head and
  your base: 4dc4ca442f963e490db204d332495473c0f478f0 (reviewed; the product gate ran on it).
- Change range: a945cf1d4c62e8cdac222a7de47277c08a77b2c5..4dc4ca4 (task base on `main` to head).
- Frozen task (read whole): `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md` (*Foundation entries*, its last item lists what the
  return step judges); plan `.runs/task-cycles/ognisko-i-jedzenie/plan.md` (*Foundation entries*).
- Map of the plan's F-entries to identifiers: `.runs/task-cycles/ognisko-i-jedzenie/reports/foundation-map.md`
  (F21 `game-icons-campfire-title`, F22 `icon-credits` *Rests on*, F23 `game-icons-licence` with
  Lorc, F24 part map line for `tests/invariants/test_minute_span_split.py` were written in Slices 10
  and 13).
- Review of the whole change: `.runs/task-cycles/ognisko-i-jedzenie/reports/20-whole-review-report.md`
  (its Minor and out-of-scope findings are not yours to fix; they are no foundation entries).
- Write your report to `.runs/task-cycles/ognisko-i-jedzenie/reports/24-return-step-report.md`; for
  each entry written or corrected, its identifier and one sentence of its meaning **in Polish**.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**`; not touched by this step.
- Irreversible operation: no.

## What the cycle has already named for this step to judge

1. The spec's last item of *Foundation entries*: whether `player-map-run-pace` and D-21 need "until
   the map run ends" now that a map run ended in death stands on the screen and passes no time;
   whether D-22's list of kinds of draw ("the game map's layout and wandering among them") names
   gathering now (the projected entry that adds it is task 18's to write — do not write task 18's
   entry; judge whether D-22 as it stands is false); whether D-23's *Verification* gets a second
   example with tenths.
2. The foundation step's concern: the invariant `action-in-progress` ("The character's action in
   progress lasts its full duration …") read literally against death cutting an action short; D-54
   states the exception.
3. The foundation step's concern: `minute-span-split` reads `Method: test`; its test
   `tests/invariants/test_minute_span_split.py` now exists (Slice 13) — check the entry against it.
4. Choices of the cycle that may bind after the merge (cycle questions table, copied here): a
   feeding adds its 20 minutes to the campfire it started on whatever its state at its end (spec
   Decision 1 step 5; D-62?); a never-lit campfire and a burnt-out one share one state, shown
   „ognisko — wygasłe”; a resource without a renewal time does not renew (fix 4dc4ca4); renewal at
   whole multiples of the renewal time counted from the map run's minute 0 (spec Decision 1 step 4,
   D-60?). Judge each by WAY-36: a choice that binds after the merge is written; every other stays a
   row of the cycle's questions table (report it, write nothing).
5. Words: whether the change uses a word in a meaning other than the usual one or against its
   glossary entry (for instance „wygasłe” for a never-lit fire, "trait", "carrying capacity",
   "chilled", "starving").

## Read

Select by "Reading the foundation" for the parts `simulation`, `browser-view`,
`product-foundation`; at least D-04, D-18–D-27, D-50–D-65 and the invariants of those parts, each
whole; `foundations/glossary.md` whole; `foundations/environment_facts.md` entries
`game-icons-*`; `foundations/part_map.md`. Guidelines: `guidelines/coding.md`.

Checks after your commits: `python -B .the-way/elements/common/foundation_check.py`; any test an
entry's correction touches.
