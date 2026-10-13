# Design phase B2 — spec revised after the spec review

Input: `reports/spec-review.md` and the orchestrator's rulings 1–11 (provisional, under the user's delegation). Spec revised in place: `spec.md`. No code; nothing committed.

## Changes by ruling

1. Icons (§ 6, § 9.2): the two exact namespace declarations `xmlns="http://www.w3.org/2000/svg"` and `xmlns:xlink="http://www.w3.org/1999/xlink"` are allowed; the test removes exactly those before scanning; every other `http:`/`https:`/`//`/`data:` stays forbidden. Choice C10.
2. Content in data: new spec rule S2 (§ 3, § 4.1). Map, resource and archetype id types are derived from the data files (`keyof typeof …`), not closed unions in `types.ts`. `setProgram` validates resources against the map's list in `MAPS` (the run's map, or any map's list without a run). `send` now takes `{ mapId, archetypeId }` that the view reads from `MAPS`/`ARCHETYPES` and that are validated against them. The view takes every name, label and icon from data: „Mapa: Las” is `MAPS[mapId].name`. Action and condition kinds stay in code, their labels in data (§ 4.2). Unit tests for the validation and an S2 source scan were added (§ 9.1). Choice C9.
3. Repeatability check (§ 9.3): the first run's starting program P1 and the mid-run P2 are named. Before `restart` the script sets P1 again, and the replay must equal the first run from minute 0. The spec says why.
4. Program editor (§ 5): commits on `change` only. The number field rounds and clamps to the data's range and keeps the previous value when it holds no valid number. The editor is not rebuilt on value edits: controls update in place, so focus stays. Structural edits restore focus to a named control. Clock ticks never touch the editor. Choice C12.
5. Settlement row 4 (§ 11): the foundation step words it as "A map run the player starts passes …". It does not use "manual map run" and adds no new term.
6. Trust boundary (§ 10): `assets/icons/**` on `browser-view`. The § 9.2 icon test is its crafted-input check, with made-up bad SVGs as negative controls. Choice C13.
7. No change to the build invariants' Part fields or to D-06's Scope (§ 10, choice C11).
8. § 11: both new invariants' *Derives from* uses the `TODO — <decision, where expected>` form, naming the randomness decision task 18 writes.
9. Removed "catch-up" for the hidden-tab span (§ 4.6, § 9.1, Q7). The spec now says "real time elapsed while the tab was hidden".
10. `restart` emits `mapRunEnded`, then `mapRunStarted`. `end` emits `mapRunEnded` (§ 4.3, § 9.1). Choice C14.
11. § 10 note for planning: each part-map change lands with or after the commit that adds its files, because the guard rejects a Files pattern that matches no tracked file.

## Self-review after the revision

- No TBD/TODO placeholders. The only "TODO" is the guard's required form, named in § 11.
- No leftover literal content ids in code descriptions. `elementalMage`, „Las” and „Mag żywiołów” appear only as data values or as examples of what the data yields.
- `send`'s new signature is used consistently (§ 4.3, § 5).
- No control characters in the file.

## Open

None new. The phase-B questions on C1 (choosing the next activity in the same minute) and on who writes the S1/S2 scans (the code's author, in `tests/sim/`) still stand unless already ruled.
