# Findings to fix — review of the whole change, cycle `ognisko-i-jedzenie`

Review: `.runs/task-cycles/ognisko-i-jedzenie/reports/20-whole-review-report.md`, first line
`FAIL c8260e6f3cda1a22a7fc83adfdfba85df99f8b3b`. Its one blocking finding, in the reviewer's words:

**I-1 — A resource with no time to renew cannot be written in a game map's data, though the task
makes "no time meaning a resource that does not renew" true.** Slice: none — a gap of the plan (its
*Coverage* row "Projected entries the task makes true in part … renewal" carries the renewal but not
this clause); the code lies in Slice 3 (`7a273ae`, the data type) and Slice 6 (`cc0669d`,
`worldMinute`).

- Place: `src/browser/sim/data/maps.ts:9` — `renewMinutes: number;` (required);
  `src/browser/sim/world.ts:51` — `minute % resource.renewMinutes === 0`, no branch for a resource
  without a time.
- What the task requires: *Decisions in play*, "(new) — What is a map made of?" — „zadanie 4 czyni
  prawdziwym: “What is not on the map's list of resources cannot be gathered or revealed there.” i
  część o odnawianiu: “each resource with its density, stock per tile and time to renew one piece,
  no time meaning a resource that does not renew””. The handoff asks this review to check "the parts
  it makes true of those other tasks write".
- Why it matters: the change makes renewal real, but only for a resource that has a time. A game map
  with a resource that does not renew — which the projected entry allows and task 8 will write into
  the foundation — cannot be added by a change of data alone: `MapDef` refuses a resource without
  `renewMinutes` at the type check, so it takes a code change, against D-18 ("A game map … of a
  kind the simulation already handles is added by a change of data alone"). Today Las renews all
  four resources, so the player sees nothing; the gap shows the first time a map's data omits the
  time.
- Evidence: the two lines above; no test of `tests/sim/world.test.mjs` or `tests/sim/data.test.mjs`
  covers a resource without a time; `grep -n "no time\|does not renew"` over the spec, the plan and
  the slice reports finds nothing that settles it.
- Fix size: `renewMinutes` optional (or `null`) in `MapDef`, `worldMinute` skipping a resource
  without it, one test on a hand-made map whose resource has no time.
