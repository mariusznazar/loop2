# Return step report — progi-drzew-walki

## Status

`done`. The foundation matches the code; nothing needed writing. No commit made by this step.

## Commits

None. Head stays `52772de3`. Tree clean.

## Comparison: foundation with code

Entries the change writes or changes, and the entries the task names:

- **D-379** (character-skill curves, effects, prices). Compared with `src/browser/sim/data/skills.ts`:
  - `oneHandedCombat.thresholds` [15, 40, 100, 300] = D-379 „at 15, 40, 100 and 300”;
  - `kicking.thresholds` [10, 30] = „at 10 and 30”;
  - `dodging.thresholds` [4, 15] = „at 4 and 15”;
  - `strongerStrike.costs` [1, 1, 1, 1] = „prices 1 · 1 · 1 · 1”;
  - `heavierKick.costs` [1, 1] = „prices 1 · 1”;
  - other skills and branches unchanged, as D-379 lists them.
  - The Verification example „fourth rank … 14 damage” matches the base 6 and step 2 in data.
  Result: matches.
- **D-144** (combat actions): the rationale clause naming D-379's ranks matches `strongerStrike` (4) and `heavierKick` (2). Result: matches.
- **D-191** (growth by practice) and **D-199** (screen Postać): no number in them; the code's row format (`rank/costs.length`, preview from `base`/`step`) is unchanged. Result: matches.
- **D-18** (content in data): the numbers are in data as it says. Result: matches.
- **D-387** cites D-379 for the character-skill numbers: still true. Result: matches.

Part map of the touched parts (`simulation`, `browser-view`): the change adds no file, changes no responsibility, dependency or surface. Searched `foundations/part_map.md` for skill, skills, umiejętności and `sim/data`: no hit. Nothing to change.

Glossary: the terms the change uses are `character skill`, `practice`, `threshold` (`well fed` is unrelated), and `bought ranks` (in the entry of resurrection, with the same meaning). No term is used in a second meaning, so no entry is due and no term is corrected. Searched for `rank`, `branch`, `threshold`, `level`, `poziom`, `stopień`: no second meaning found.

Invariants: `foundations/invariants.md` line 950 (an action shortened by bought branches lasts at least one minute) and line 1040 (a solved map's manual run adds no practice) hold with the new numbers. No invariant states a threshold, a price or a rank count. Nothing to change.

Environment facts: the change rests on no source outside the product (D-379 *Based on: none*), so none is due.

## Fields for the record's *Return step*

- Foundation compared with code: yes, as above; matches.
- Decisions written or changed by this request: D-379 (changed in place, `fb3313f9`, and `52772de3` for the clarified wording and rejected line); D-144 (rationale clause, `52772de3`). Both were written earlier through the decision element's steps; the return step writes nothing further.
- Invariants written or changed: none.
- Environment facts written or changed: none.
- Glossary terms written or changed: none.
- Part-map changes: none.
- Projected entries: none (the task is independent; *Project relation: independent*).
- Rows of *Settlements to record*: none (the frozen task lists none).
- Choices that bind after the merge and need a row: none beyond D-379 itself.

## Checks (command → exit code)

1. `python -B .the-way/elements/common/foundation_check.py` (run on its own) → exit 0, "0 errors".
2. Data-to-decision comparison by `grep` on `src/browser/sim/data/skills.ts` and `foundations/decisions.md` (no exit code of its own; read by hand against the lines above).

No test was run; no code changed by this step.

## Unread material

- `foundations/part_map.md`: searched by grep, not read whole. The handoff asked for the part map of the touched parts; the change touches no entry of it.
- `foundations/glossary.md` and `foundations/invariants.md`: searched by grep for the terms and numbers; the entries found were read in full (glossary `character skill`, `practice`, `well fed`; invariant `solved-map-manual-run`; invariant at line 950 read in its neighbourhood only, its sentence read in full).
- `.the-way/task-cycle/skill/foundation_step.md` was read whole earlier in this task.

## Searches not found or unclear

- None for the entries the change touches. The term `rank` has no glossary entry of its own; the glossary uses „bought ranks” with the meaning the change uses, so no entry is due.
