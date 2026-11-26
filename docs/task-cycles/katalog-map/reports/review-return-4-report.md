PASS 205b7ad66bbbea6ab0427db4e0ff8d6eeb0fd5c2

# Review of the fix of finding I1 (review of the return step), task `katalog-map`

- Worktree `the task's worktree`, branch `task/katalog-map`. `git rev-parse HEAD` = `205b7ad66bbbea6ab0427db4e0ff8d6eeb0fd5c2`, the head given.
- Fix range `20b4471f..205b7ad6`: one commit, `205b7ad6`, one file, `src/browser/view/map-card.tsx` (+5/-4).
- Method: `.the-way/task-cycle/review/SKILL.md` with `.the-way/task-cycle/review/fix.md`, both read whole. Read whole: the findings file `findings-return-3.md` and the fix report `fix-return-3-report.md`.

Counts: blocking 0, Minor 0 new, out of scope 0.

## Findings of the findings file

**I1 — fixed.** The doc comment of `MapCard` (`src/browser/view/map-card.tsx:100-107`) now reads: "…; under it the one short sentence of what the map demands, written by hand in the map's data; then two columns, the tables „Żąda” and „Teren” on the left, „Żąda” closing with the sentence of the solving condition (D-133), and „Czyha”, „Leży tu” and „Odbiera” on the right, one under the other in the phone layout. …".

Each statement checked:

- **Against D-327:** "under the heading stands the one short sentence of what the map demands, written by hand in the map's data", and „Żąda” "… and under them the sentence of the map's solving condition (D-133)". Agrees.
- **Against D-133:** "in its part „Żąda”, under the table". Agrees.
- **Against the code:** `goalSentence(mapId)` is in `<p className="maps-card-goal">` right under the top row (`:147` at the earlier head, same place now). `solvingSentence(mapId)` is in `CardPart name="Żąda"` after its `CardTable`. Agrees.
- **Against the module header** (`map-card.tsx:1-8`): "the one short sentence of what the map demands, … „Żąda” closing with the whole sentence of the solving condition". Agrees.

The rest of the comment (heading, button, columns, phone layout, parts the map lacks, the record of D-440) is unchanged and was true before.

## The fix diff

- `git diff 20b4471f..205b7ad6` changes only lines of the doc comment above `export function MapCard`. No code, no test, no foundation entry and no other file.
- Nothing new broken: the change is comment text alone, so no behaviour and no test outcome can change. Prettier, ESLint and the type check below pass on it.
- No code passing a test without meeting its requirement: there is no code in the diff.

## Checks

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `git rev-parse HEAD` | 0 | `205b7ad6…`, the given head |
| 2 | `git log 20b4471f..205b7ad6`, `git diff --stat`, `git diff` | 0 | one commit, one file, doc comment only |
| 3 | `npx prettier --check src/browser/view/map-card.tsx` | 0 | "All matched files use Prettier code style!" |
| 4 | `npx eslint --max-warnings 0 src/browser/view/map-card.tsx` | 0 | no output, no warning |
| 5 | `npm run --silent typecheck` | 0 | no output |
| 6 | `npm test -- tests/view/maps-screen.test.mjs` (runs `python -B scripts/test.py tests/view/maps-screen.test.mjs`) | 0 | tests 51, pass 51, fail 0 |
| 7 | `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors" |
| 8 | `python -B .the-way/instruction-files/check_instructions.py` | 0 | "0 error, 0 warn, 120 info"; no warning |
| 9 | `git status --short` after the checks | 0 | clean |

The fix report's claims (checks 3-8, each exit 0, only the doc comment changed) agree with my runs.

Not run: the product's full gate (handoff).

## Declined to judge

None. The two Minor findings of the earlier review (M1, M2) are not fixed in this round and, as directed, are not reported again.

## Reaches beyond the dispatch

None beyond what the dispatch named. D-327 and D-133 were read whole in the earlier review of this session (`review-return-3-report.md`); the fix diff touches neither.

## Working copies

- None under `.runs/review-return-4/`; that directory was not created.
- The output of check 6 was written to `.runs/task-cycles/katalog-map/reports/review-return-4-npmtest.log` to read its tail. It was removed with `rm -f` on that full path after reading. The figures it gave stand in the table above.

## Unread material

None. Read whole: the coordinator's message, `fix.md`, `findings-return-3.md`, `fix-return-3-report.md`, the fix diff, and the doc comment and module header of `map-card.tsx`.

## Searches not found or unclear

None.
