done

# Slice 2 — the tests of the catalog follow the eight maps of the data

Branch `task/mechanizm-drabiny`, worktree `the task's worktree`. Base `48c1e0fc`; `.the-way` at `6ed3cb36` (the pinned commit, checked).

## Commits

- `93e116d4` test: the three view test files follow the eight maps (catalog-lines, map-catalog, maps-screen; 3 files, +108 / −36 in the first commit).
- `ee702cda` test: the facts case of catalog-lines checks the rung's identifier and order, not its numbers (1 file, follow-up to my own first commit; I found in review that I had pinned rung numbers, which the slice forbids while the rungs are provisional).

Only the three files of the slice's *Change* are touched. No product code under `src/` changed. No foundation entry written.

## Checks (command → exit code)

Base = the branch at `48c1e0fc` before any edit of mine (the worktree was clean at that commit; see *Working copies*).

| Check | Base | After the slice |
|---|---|---|
| `npm test -- tests/view/catalog-lines.test.mjs` | exit 1, 7 of 14 fail | exit 0, 15 pass, 0 fail |
| `npm test -- tests/view/map-catalog.test.mjs` | exit 1, 7 of 13 fail | exit 0, 13 pass, 0 fail (one intermediate run exit 1 on my own regex, fixed, see below) |
| `npm test -- tests/view/maps-screen.test.mjs` | exit 1, 1 of 51 fails | exit 0, 51 pass, 0 fail |
| `npm test -- tests/view/maps-record.test.mjs` | not run on base (passes after the change) | exit 0, 10 pass, 0 fail |
| `npx prettier --check` on the three edited files (extra, not in *Checks*) | — | exit 0 |

Not run, by the handoff: the whole gate `npm test` without a file, `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`. Nothing else is claimed.

### Failing tests on the base (result on `48c1e0fc`)

catalog-lines.test.mjs (7):
- region counter „the region's counter counts all five maps …”: header `Las · 0 z 8` (actual) vs `Las · 0 z 5` (expected).
- solved fold „a solved map folds under one row …”: `Las · 1 z 8` vs `Las · 1 z 5`.
- facts „the facts of a row keep the old order …”: rows `[forestDeep2, forestLair]` vs `[forestLair]`.
- „Postęp” empty places: header `Las · 0 z 8` vs `Las · 0 z 5`, empty `7` vs `4`.
- record stands last „the record stands last …”: `lairOf` took `rows[0]`, which is now `forestDeep2`, so the fact `bez ognia 33 min` vs the expected record.
- record is asked „the record is asked for only …”: `rows[0]` is `forestLair`, expected `forestDeep2` (the expectation was the list's first row).
- counters „the counters of „Dokąd” and „Postęp” …”: `5 poznanych · 3 rozwiązane` vs `4 poznane · 3 rozwiązane`.

map-catalog.test.mjs (7):
- opens on „Dokąd” …: `6 poznanych · 4 rozwiązane` vs `5 poznanych · 4 rozwiązane`.
- a row holds the state circle …: the first row is `Las — głębiej II`, not `Las — matecznik`.
- no solved map has no fold row: header `Las · 0 z 8` vs `Las · 0 z 5`.
- „Postęp” empty places: header `Las · 1 z 8` vs `Las · 1 z 5`.
- typed text finds open maps: names `[Las — głębiej II, Las — matecznik]` vs `[Las — matecznik]`.
- every row is a link: picked row order `[forestDeep2, forestLair, forestDeep]` vs `[forestLair, forestDeep]`.
- record drawn among the facts of the lair's row: the first row is `forestDeep2`, its last fact `bez ognia 33 min` vs `niedźwiedź: 24 ze 120`.

maps-screen.test.mjs (1):
- with no map named „the catalog holds the open maps alone …”: header `Las · 0 z 8` vs `Las · 0 z 5` (the first failing assertion of the test; the names before it pass).

Every failure above has the same cause: the data holds eight maps and three rungs open at different points.

### Own-work check (make-change section 3)

- Requirement (the slice's Goal and D-466's Verification): the catalog shows the three rungs of Las in the data's order, after Las — wataha and before Las — matecznik, once Las — głębiej and the rungs before each are solved; and the list of each view follows the data's order.
- Check: the new case `„Postęp” shows the three rungs in the data's order, after Las — wataha and before Las — matecznik` in catalog-lines.test.mjs, solved `forestEdge, forest, forestDeep, forestPack, forestDeep2, forestDeep3`, expects the eight rows in the order Edge, Forest, Deep, Pack, Deep2, Deep3, Deep4 (open), Lair (open), with counter `6 rozwiązanych z 8 poznanych`, header `Las · 6 z 8`, empty `0`. Run: exit 0.
- What it showed: passes. I did not run a deliberately wrong order to see it fail (no mutation run; a rung placed after the lair would change the id list and fail the `deepEqual`, by reading, not by run).

### Intermediate failure, fixed

- `npm test -- tests/view/map-catalog.test.mjs`, first run after my edits: exit 1, the link test failed with `expected a true value`. Cause: the regex `/^#\/mapy\/[A-Za-z]+$/` rejects the identifier `forestDeep2` (a digit). Fixed by `[A-Za-z0-9]+`; rerun exit 0. Both runs are the same command.

## Changed expectations, each with its cause

Cause in every case: the data now holds eight maps in Las (five before, plus `forestDeep2`, `forestDeep3`, `forestDeep4`); `forestDeep2` opens after `forestDeep` is solved, `forestDeep3` after `forestDeep2`, `forestDeep4` after `forestDeep3`, `forestLair` after `forestPack` (`src/browser/sim/data/maps.ts`, commit `48c1e0fc`).

catalog-lines.test.mjs:
1. test name „counts all five maps” → „counts all eight maps”; header `Las · 0 z 5` → `Las · 0 z 8` (region counter counts all maps of the data).
2. header `Las · 1 z 5` → `Las · 1 z 8` (same).
3. facts case: rows `[lairRow]` → ids `["forestDeep2", "forestLair"]` plus `lairRow` looked up by id (the rung is open once `forestDeep` is solved; the numbers of the rung are not pinned, see commit `ee702cda`).
4. „Postęp” case: header `Las · 0 z 5` → `Las · 0 z 8`; empty `4` → `7` (eight maps, one open).
5. record cases: `lairOf` took `rows[0]`; now looks up the row by id `forestLair` (the new first row of the list is `forestDeep2`; the case chooses data by identifier, as the testing guideline asks). Likewise the „asked” case: `[rows[0]]` → ids `["forestLair"]`, and the unnamed case looks up the lair by id.
6. counters: case of three solved (`forestEdge, forest, forestDeep`): `4 poznane · 3 rozwiązane` → `5 poznanych · 3 rozwiązane`, Postęp `3 rozwiązane z 4 poznanych` → `3 rozwiązane z 5 poznanych` (`forestDeep2` is open); case of four solved: `5 poznanych · 4 rozwiązane` → `6 poznanych · 4 rozwiązane`, Postęp `4 rozwiązane z 5 poznanych` → `4 rozwiązane z 6 poznanych` (`forestDeep2` open next to `forestLair`). The comment above the test was updated from „five maps” to „cases give one to six open maps”, and D-149 was added as a decision line.
7. Comments only: „its four maps” → „its maps”; „7 °C on the four others” → „7 °C on the others”.
8. New case (not a changed expectation): „Postęp” shows the three rungs in the data's order (D-466), see *Own-work check*.

map-catalog.test.mjs:
9. counter `5 poznanych · 4 rozwiązane` → `6 poznanych · 4 rozwiązane` (`forestDeep2` open).
10. region header `Las · 4 z 5` → `Las · 4 z 8`; `Las · 0 z 5` → `Las · 0 z 8`; `Las · 1 z 5` → `Las · 1 z 8` (eight maps).
11. the lair's row is picked by href `#/mapy/forestLair` instead of `[0]` (the first row is now `forestDeep2`).
12. „Postęp” empty places: `Las · 1 z 5` → `Las · 1 z 8`; empty places `3` → `6` (eight maps, two open) with the three-to-six message changed; the places' texts and `aria-hidden` lists extended to six entries of `""` and `"true"`.
13. typed text „las”: the open maps first in data order, now `[Las — głębiej II, Las — matecznik, Skraj lasu, Las, Las — głębiej, Las — wataha]`; the fold results and the cleared-text result `[Las — głębiej II, Las — matecznik]`; the „WATA” result stays `[Las — wataha]`.
14. the row-link test: picked-deep hrefs `[forestLair, forestDeep]` → `[forestDeep2, forestLair, forestDeep]`; unfolded `[forestLair, …]` → `[forestDeep2, forestLair, …]`; „Postęp” list gains `#/mapy/forestDeep2` before `#/mapy/forestLair`.
15. the same test's pattern `/^#\/mapy\/[A-Za-z]+$/` → `/^#\/mapy\/[A-Za-z0-9]+$/`. Cause: identifier `forestDeep2` has a digit; D-332 takes the identifier as it stands in the data. This widens a check; please review it as a change of expectation with the data as the cause.
16. the record test picks the lair by href instead of `[0]`.
17. comment „four maps” → „maps”.

maps-screen.test.mjs:
18. header `Las · 0 z 5` → `Las · 0 z 8` (region of eight maps).

## Reaches beyond the handoff

- Read `guidelines/testing.md` whole and `guidelines/coding.md` (required by the repository's AGENTS for test changes; the testing guideline is in the handoff's *Read*).
- Read `foundations/decisions.md` D-466 whole (the handoff's conditional list) because the new case quotes it. Not read: D-464, D-465 (see *Unread material*).
- No file outside the three of the *Change* was edited.

## Choices

- Selecting the lair and the rung by identifier (`rowOf`, `href` lookups) rather than by position, because a position in a list the data grows is the thing that broke. Rejected: changing the index to 1 — it would pass today and break again with the next rung.
- The rung's facts are not pinned in the catalog tests (commit `ee702cda`): the rung numbers are not settled (Slice 6), and the handoff says no test of this slice expects one. Cost if wrong: the facts case no longer shows the rung's numbers; the balance slice does that.
- The link regex widened to letters and digits (change 15). Rejected: renaming the identifier, which would break saved games and identifiers the task keeps.

## Working copies

- No worktree, clone or prepared input was made by me. The base measurement was run in the slice's own worktree at `48c1e0fc` before any edit; I did not create a separate base copy under `.runs/executor-2/`. The worktree was clean at that commit, so the result is the base's. This is a deviation from the handoff's wording (a working copy of the base); reported as such.
- `.runs/executor-2/` (ignored) holds my run logs (`base-*.txt`, `run*.txt`) and two commit-message files. No copy to remove; the one temporary file I made there was deleted.

## Unread material

- `foundations/decisions.md` D-149 (`:6032-6048`), D-325 (`:10436-10467`), D-331 (`:10599-10623`), D-464 (`:6227-6241`), D-465 (`:6242-6256`): not read whole. I read D-466 whole. The test comments cite D-149, D-325 and D-332 by the decision lines already present in the test files (copied from the tests, not checked against the foundation text).
- `foundations/glossary.md` term `rung`: not read.
- `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`, `foundations/part_map.md`: not read (no product code changed).
- `src/browser/view/catalog-lines.ts:1-120`: not read (the test expectations were derived from the data and the tests' own rules, not from the view code; the view produced the actual values, which I checked against my hand derivation).
- `src/browser/sim/data/maps.ts`: read lines 1-60 and an outline of fields by grep; the rung composition code (lines 60-421) read only through the grep outline and the rung rows (`forestDeep2` to `forestLair`) — enough for the numbers used (streak, defeatedAttacks, temperature, attackers, opener), not the whole composer.
- `tests/view/maps-screen.test.mjs:1-60` and `:228-360`: read. `tests/view/map-catalog.test.mjs`: read whole (not named in the handoff's *Read*; it is in the *Change*).
- `task_frozen.md` lines 25–35 and 68–80 (the passages named): read.

## Searches not found or unclear

- The test names of D-149 and D-325 in the test files quote decisions I did not check against the foundation text.
- The handoff says the rungs' numbers are provisional and no test of this slice expects one; the handoff's Goal mentions D-449 for that rule. I did not read D-449, so I did not cite it.
- Nothing else not found.

## Concerns

- Change 15 widens a check on the identifier shape; review it as a deliberate data-caused change.
- The new order case was not seen failing against a wrong order (no mutation run); by reading, it would fail.
- The base measurement was taken in the worktree, not in a separate copy (see *Working copies*).
- The whole gate and the two foundation/instruction checks were not run by me, per the handoff; the orchestrator's gate runs them.

## Walkthrough

This change alters no behaviour a user sees: it changes test files only, and no product code.
