**Status:** done

# Slice 5 report: the view reads the team's resurrection through a function of the simulation

## Commit

- `fc64661c` on branch `task/zapas-i-wskrzeszenie`, base `a007dd9b`. Committed by path.

## Files changed

- `src/browser/sim/game.ts`: +17 / -0. Adds the exported type `ResurrectionStock` and the pure function `resurrectionAt(team, nowMs)`, placed right after `resurrectionReady`.
- `src/browser/view/team-lines.ts`: +5 / -9. `resurrectionLine` now takes `team: Team` and reads it through `resurrectionAt`. The import of `resurrectionReady` is replaced by `resurrectionAt`. The field `resurrectionReadyAtMs` is no longer named in the view, and no `Pick<Team, ...>` is left there.

No test file changed. No text, role or wording of the line changed.

## What the function does

`resurrectionAt(team, nowMs)` returns `{ usesLeft, nextReturnMs }`:

- ready at `nowMs` (the existing `resurrectionReady`): `{ usesLeft: 1, nextReturnMs: null }`
- not ready: `{ usesLeft: 0, nextReturnMs: team.resurrectionReadyAtMs }`

This matches the slice's goal: one use at most today, and `null` where no use is missing.

In the view the branch reads: `if (usesLeft > 0 || nextReturnMs === null)` gives the "gotowe" line. Otherwise the minutes are computed from `nextReturnMs`. The `|| nextReturnMs === null` clause exists so TypeScript narrows `nextReturnMs` to `number` for the countdown. It is unreachable in today's model, since `usesLeft === 0` implies a non-null moment.

## Checks

Commands run, each with exit code 0:

- `npm run typecheck`: exit 0
- `npm test -- tests/view/team-lines.test.mjs`: exit 0
- `npm test -- tests/view/character-screen.test.mjs`: exit 0
- `npm test -- tests/view/headquarters-screen.test.mjs`: exit 0
- `npm test -- tests/view/maps-screen.test.mjs`: exit 0
- `npm test -- tests/sim/death.test.mjs`: exit 0
- `npx prettier --check src/browser/sim/game.ts src/browser/view/team-lines.ts`: exit 0 after one line was reflowed to Prettier's layout
- `node tests/quality/eslint-size-rules.mjs`: "0 functions and files over a threshold in 325 files", exit 0. It was run before and after the edit. `game.ts` is 681 code lines (counted without comments and blanks), under the 800 limit.

Not run, by design of the slice: the full `npm test`, the foundation check and the instruction check. The gate is the orchestrator's or CI's.

No test was written first. This is a refactor with no new behaviour, and the existing `team-lines.test.mjs` cases cover the line. No failing run occurred, so no failing and passing pair needs recording.

## Own-work check (section 3 of the method)

- Requirement: no behaviour change; every text and role of the line stays; the view no longer names the field.
- Check: the five focused test files and the typecheck above.
- Result: all pass on the first run. The cases that would catch a wrong boundary or rounding are the readiness boundary at "the moment itself" (`team-lines.test.mjs`, the test at about line 128) and the countdown rounding cases (about lines 75-124). Both pass.

## Choices made

- Name: `resurrectionAt`, returning `{ usesLeft, nextReturnMs }`. Rejected: keeping the view's ready test on `nextReturnMs === null` alone. The line says "gotowe" when a use is left, so keying on `usesLeft` keeps the meaning right when Slice 6 gives several uses. Cost if wrong: small; the two readings coincide today.
- Parameter type `Team` for the new function, not `Pick<Team, "resurrectionReadyAtMs">`. The function is the place that will change with the team's shape in Slice 6.
- `resurrectionReady` kept as it was, because the simulation and balance code still use it.

## Concerns

- `tests/view/team-lines.test.mjs` still calls `resurrectionLine({ resurrectionReadyAtMs: ... }, now)` with a plain object. It passes at runtime because `resurrectionAt` reads only that field. The slice said no test changes, so I left it. The test still depends on the field name, which Slice 6 will need to handle.
- The commit author is `mariusznn@gmail.com`, taken from the repository's configured identity, which the project rules say applies to this repo.

## Scope and reaches beyond the handoff

- I read the whole of `guidelines/styleguide-browser-view.md` (1174 lines, in three ranges), which the handoff names.
- I searched `tests/` for `team-lines`, `resurrectionAt` and `resurrectionLine` to see if any test reads the source text. Only `tests/view/team-lines.test.mjs` matched.
- I grepped the callers of `resurrectionReady` across `src`, `tests`, `balance` and `scripts` to confirm it stays unchanged.

## User-visible behaviour and UI state

This slice changes no behaviour, no text and no screen. Per the handoff, there is no state to check under `task-cycle/change/ui_check.md`, and no walkthrough is needed.

## Unread material

None. The foundation entries were found by identifier and read whole: D-190 (from its heading to the next heading, D-216), D-217 (now at `foundations/decisions.md:6287`, not 6265 as the plan's range says), and D-219 (`foundations/decisions.md:6330`). `foundations/part_map.md` was read at lines 1-70, which covers 3-64. The invariant `resurrection-renewal` and the glossary term `resurrection` were not read, since the handoff does not name them.

## Searches not found or unclear

- The plan's line range for D-217 (6265-6285) no longer matched. The entry was found by its heading at line 6287, as the handoff allows. Not unclear.
- No other search failed.

## Working copies

- Made: `.runs/slice-05-executor/` with `checks.sh` and `checks.log`, plus two short-lived files in `.runs/` (a typecheck log and a copy of the base `game.ts`).
- Removed: all of them, by full path, before this report. Remainder: none.
