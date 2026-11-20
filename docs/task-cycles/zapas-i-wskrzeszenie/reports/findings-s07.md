# Findings of the review of slice 7 (blocking finding, in the reviewer's words)

Review report: `reports/review-s07-report.md`, first line `FAIL f27079574b735db808938191b8e77667457fa3df`.

## Findings

### Important

**I1. `tests/sim/saved-game.test.mjs:2474` — a `decision:` line the foundation check refuses: the D-179 quotation does not begin a sentence.**

```
  // decision: D-179 "at a completion only what that list names goes to the chest"
```

`python -B .the-way/elements/common/foundation_check.py` (exit 1, 74 errors) reports for this file exactly one error: `tests/sim/saved-game.test.mjs:2474: the quotation does not begin a sentence of `D-179``. The sentence of D-179 (`foundations/decisions.md:8352`) begins "The trip plan is a field of the program, both its lists are bound at the start of a map run — …"; the quotation is its tail. The one command runs the foundation check, so the gate fails on this file whatever the later slices do; the handoff asked that the check report none for this file. All the other `decision:` lines of the file, those of the altered cases included (D-190 twice, D-386, D-206, D-213), pass the check, which matches each against a binding sentence of the foundation as it stands now.

The line does not come from this range: `git blame` gives commit `814cb8b1` ("let the load admit the deposit of a completed run of a solved map …", an earlier slice of this task), and the base of the task `46cfec71` has no D-179 quotation in the file. It lies within the task and in the file this slice changes, and no later slice of the plan's *Change* that I know of reaches it, so I grade it here. The fix is one line: quote D-179 from the start of its sentence (as `tests/sim/trip.test.mjs:153` does, "The trip plan is a field of the program") or quote the whole sentence.

Contradiction: no

