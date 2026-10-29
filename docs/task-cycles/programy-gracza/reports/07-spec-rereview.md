PASS

# Re-review of the revised spec — programy-gracza

This is the re-review of `.runs/task-cycles/programy-gracza/spec.md` after Revision 1. It works
under the same handoff, `reports/04-spec-review-handoff.md`, and the same method,
`.the-way/task-cycle/spec/review.md`, which asks for this: say for each earlier finding whether it
is resolved, and report only what the revision broke besides. It also reads:

- the earlier review, `reports/05-spec-review.md`;
- the orchestrator's revision handoff, `reports/06-spec-revision-handoff.md`. Its F2 answer — the
  suggested name is the field's value — is an autonomous choice, not the human's approval;
- the designer's *Revision 1* in `reports/02-design-report.md`.

`cycle.md` was not read.

## Earlier findings

- **F1 — resolved.** `spec.md:231` adds a part-map change, written through
  `the-way-update-part-map`. In it the part `simulation` gains, by name, the two invariant test files
  `tests/invariants/test_<id>.py` of rows 9 and 15. Any other new file under `tests/invariants/` is
  named in the part whose checks use it. New files under `src/browser/sim/**`, `src/browser/view/**`,
  `tests/sim/**` and `tests/view/**` stay claimed by the existing globs (`foundations/part_map.md:7`–`:22`,
  `:32`–`:53`). The part map no longer stands under "Entries this task does not change"
  (`spec.md:233`). The `<id>` placeholder is fine: the identifier is fixed when the invariant is
  recorded, in the foundation step.
- **F2 — resolved.** `spec.md:165` states the reading as the orchestrator chose it.
  - The field already holds „Program n” as its value, and the player may keep or change it.
  - The other reading, the name only as the empty field's hint (styleguide `:174`–`:175`), is named,
    with why it is not taken (To do 4 refuses an empty name) and the cost if wrong.
  - This agrees with decision 2's suggested name (`spec.md:77`) and with To do 4.
  - „Zmień nazwę” still pre-fills the current name (`spec.md:162`).
  - The phrase moved from `:163` into the new paragraph, so nothing about the field was lost.

## Earlier observations

- **Observation 1 (the counters) — addressed.** `spec.md:102` now says that "changed since" compares
  programs the way `setProgram` does, identity counters included (`src/browser/sim/game.ts:412`),
  consistent with D-131. Two loose ends remain, neither a finding:
  - The sentence stands on the second measure only. The first, "The copy has unsaved changes"
    (`spec.md:101`), says only "differs from its base", but the natural build uses the same
    comparison.
  - "edited and then put back counts as unchanged" now reads as edits of content put back.
- **Observation 2 (the kept name) — addressed.** `spec.md:62` says that the name a copy keeps after
  its program is deleted shows only in the heading and is no pointer. This matches the *Verification*
  "a pointer naming a program by name" (`spec.md:223`).

## What the revision broke besides

Nothing. The changed lines are `spec.md:62`, `:102`, `:163`, `:165`, `:231` and `:233`. None of
them contradicts the task, the foundation entries in the handoff, or the rest of the spec. The rest
of the spec reads as it did in the first review.

## Checks run

- `git rev-parse HEAD`: exit 0, `4bfb9623e9310220e335377df7fbb4c9ad413406`.
- `git status --short`: exit 0, clean.
- The pin holds:
  - `git -C .the-way rev-parse HEAD`: exit 0, `3aee7d958835cc19b95519f4d21b37538b78e3e1`;
  - `git ls-files --stage -- .the-way`: exit 0, the same commit.
- `grep -nE "TBD|TODO|\?\?\?|XXX" spec.md`: exit 1, no match (the expected result).
- `grep -n` for the revised passages: exit 0.

Not run: `npm test`, `python -B .the-way/elements/common/foundation_check.py` and every other gate
check. The handoff excludes them at the spec stage, and no product file changed.
