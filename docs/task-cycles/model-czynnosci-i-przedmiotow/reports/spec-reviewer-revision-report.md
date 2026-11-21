PASS

# Spec review of the revision — model-czynnosci-i-przedmiotow (write-spec, reviewing a revision)

- Method: `.the-way/task-cycle/spec/review.md` (read whole in the first review).
- Compared: `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md` (the revision) with
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec-reviewed.md` (the spec as first reviewed),
  using `diff`. I also read the paragraph *Revision* of `reports/designer-report.md`.

## Earlier findings

- **Finding 1 — resolved.**
  - **What changed:** the second bullet of *Trust boundary — crafted input*
    (`src/browser/sim/previous-programs.ts`). It now names what the reader skips: „Wytwórz” or
    „Opatrz” with a target the data do not give the verb, or with no `item`. It says that a field
    beyond `kind` and `item` is dropped by the check, and the program is appended without it, as
    for every action today. The comparison with what the check built belongs to the load alone.
  - **Against the code:** this matches `readItem` (`src/browser/sim/previous-programs.ts:105-110`,
    which calls only `checkProgram`) and `checkAction` (`src/browser/sim/programs.ts:144-188`,
    which builds each action from its known fields). The load's comparison stays at
    `src/browser/sim/saved-game.ts:259-268`.
  - **Against Decision 3, unit 2:** it no longer contradicts it.

## What else changed

Nothing. The diff shows one hunk, the lines of that bullet (spec-reviewed.md 368–369 replaced by
spec.md 368–372); the rest of the two files is identical.

## The fix against the foundation

- **D-401:** the reader „accepts the program of an item only through the check the program editor
  uses, skips every other item and goes on”. The revised bullet keeps the check as the only gate,
  skips what the check refuses and appends what it accepts, so it agrees with D-401.
- **Invariant `previous-save-programs-reader`:** its sentences are about the item's keys (`id`,
  `name`, `program`, the content revision). A field inside an action is not one of them, and the
  program is accepted „only through the check of the program editor”, which the bullet keeps. The
  bullet agrees with the invariant.
- **Task's *To do* 11 and the second sentence of the new decision:** the pull of today's actions is
  unchanged, since the reader gains no comparison.

Nothing in the revision is broken.

## Working copies

None were made. No directory `.runs/spec-reviewer/` was created; there is nothing to remove.

**Unread material:**

- `reports/designer-report.md` — I read only its paragraph *Revision* (lines 98–106) in this review.
  I read the rest in the first review.
- The other items are as listed in the first review's report
  (`reports/spec-reviewer-report.md`, **Unread material**). The revision touches none of them.

**Searches not found or unclear:**

- none
