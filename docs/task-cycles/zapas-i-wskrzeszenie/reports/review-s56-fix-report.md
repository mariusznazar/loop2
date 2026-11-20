PASS 20e6eaab982cec79aa3cfbec77f7222e455e55e6

# Review of the fix of slices 5-6 — `zapas-i-wskrzeszenie`, range `7e3869c2..20e6eaab`

Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`, bounded by
`reports/findings-s56.md` (one blocking finding, I-1). `git rev-parse HEAD` in the worktree is
`20e6eaab…`, the head given; one commit in the range (`saved-game.ts`, `coding-saved-game.md`,
`tests/sim/team.test.mjs`).

Counts: blocking 0; Minor 1 (new, in the fix diff); out of scope 0.

## Findings of the findings file

**I-1 — fixed.** `src/browser/sim/saved-game.ts:839` now reads
`if (usesLeft > BALANCE.resurrectionUses) refuse();`, the plan's "exceed"; the guideline sentence
(`guidelines/coding-saved-game.md:119-120`) reads „zostaje ich nie więcej niż ta liczba”; the
refusal table of `tests/sim/team.test.mjs` lost the "equal" variant and keeps the "above" one, and
a new case "a settlement whose uses left equal the data's count loads, and one above it is refused"
(`tests/sim/team.test.mjs:657-676`) holds both sides, the equal settlement loading with
`usesLeft: 3` as it stood. Evidence: the probe of hostile documents rerun on the head (below):
`usesLeft` 3 (equal), 2 and 0 admitted and kept as given; 4, 2^53, −1, 0.5, 2.5, NaN, ±Infinity,
null, true, a text, a list, a BigInt, an extra key and a missing key refused whole as `shape`, none
thrown. The fix report's statement that the game never writes `usesLeft` equal to the count agrees
with `teamAfterDeath` (`usesLeft = count − spent − 1`, spent ≥ 0). The residual for a lowering by
two or more is the orchestrator's to record, as the dispatch says, and is no finding here.

## New findings in the fix diff

### Minor

**M-F1. The new test's comment points to the task document.** `tests/sim/team.test.mjs:657-658`:
"// Task question 15: a lowering of the count refuses only a save with more spent than the new
count, …". `guidelines/testing.md` ("Where the expected value comes from"): „Komentarz testu nie
wskazuje dokumentu spoza fundamentu”, and a requirement a test needs that the foundation does not
yet carry goes to the foundation first. The bound "at most the data's count" for a settlement
stands in the guideline (`coding-saved-game.md:119-120`) and in the frozen task, not in a
foundation entry (D-190, D-386 do not name it). It blocks nothing; the comment could name the
guideline's rule, or the bound could reach the foundation with the residual the orchestrator
records.

No Critical or Important finding in the fix diff: the change is the one comparison, its comment,
the guideline word and the tests; the team's own bound (`spent > count`, `saved-game.ts:509`) and
the moment's consistency check are untouched and still refuse (probe lines 21-42).

## Probe of hostile documents at the head (trust boundary)

`reports/review-s56-fix-probe.mjs` (my earlier probe with the settlement's variants widened and
given expectations) against the built head: 70 checks, 0 bad (`reports/review-s56-fix-probe-head.txt`).

- Team: count 4, −1, NaN, −Infinity, null, true, [], {}, 2^53, BigInt, `new Number`, an accessor;
  moment NaN, undefined, 1.5, false, −2^53; a moment standing with none spent, missing with one
  spent; the old key added; either key missing — each refused as `shape`. Admitted as D-386 gives:
  count 3 with a moment, a moment negative and at ±`Number.MAX_SAFE_INTEGER`, and the view's
  reading of each does not throw at today's moment and in 2100.
- A version-7 document refused as `version`.
- Settlement `resurrectionUsed`: as listed under I-1.
- The rules of the resurrection (deaths, returns, first solvings) as in the first review, all OK.

## Declined to judge

None.

## Checks run

- `npm test -- tests/sim/team.test.mjs` (worktree, head) — exit 0, 22 pass.
- `npm run typecheck` — exit 0.
- `npx prettier --check src/browser/sim/saved-game.ts tests/sim/team.test.mjs` — clean;
  `npx eslint` on the same two files — exit 0.
- Probe script `node …/probe.mjs <worktree> <output>` — exit 0, 0 bad of 70.
- Not run: the simulation invariant tests (the fix touches no import and no argument handling; the
  fix report gives them exit 0); StrykerJS (needs all of `tests/sim` green, not yet); the full gate.

## Reaches beyond the dispatch

- `guidelines/testing.md`, section "Where the expected value comes from" — reread to judge the new
  test's comment (M-F1).

## Working copies

- `.runs/review-s56-fix/` (probe copy and
  its output); removed. No worktree made: the checks needed no changed file. Kept beside this
  report: `review-s56-fix-probe.mjs`, `review-s56-fix-probe-head.txt`. The `dist/` build that
  `npm test` made in the reviewed worktree is the product's own output. Remainder: none.

## Unread material

- `reports/slice-06-fix-before-run.txt` (the failing run before the code change) — not opened;
  the claim that the new case failed on `>=` follows from its assertion and the old comparison.

## Searches not found or unclear

- None.
