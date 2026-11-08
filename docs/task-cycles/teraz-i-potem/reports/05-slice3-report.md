# Report 05 — slice 3 (make-change)

**Status:** done

## Commits and files

Base `35f53cd`. One commit: `e7e8a95` (`feat: :sparkles: name what Teraz and Potem say in one function of the simulation beside ruleSigns`).

| File | Added / removed |
|---|---|
| `src/browser/sim/game.ts` | +73 / -0 |
| `src/browser/sim/data/maps.ts` | +1 / -1 (comment of `completionText`) |
| `tests/sim/rule-signs.test.mjs` | +326 / -0 (14 new cases) |
| `tests/sim/encounters.test.mjs` | +8 / -3 |

## What was made

`game.ts` exports, beside `ruleSigns` (the slice names no name; these are my choice):

- `nowAndNext(state): NowAndNext | null` — null without a map run; inputs unchanged.
- Types `NowLine`, `NextLine`, `NowAndNext`, defined in `game.ts` (`types.ts` is not touched):
  - `NowLine`: `{kind:"action", ruleId, action, minutesLeft, minutes}` · `{kind:"wait"}` · `{kind:"combat", creatureId}` · `{kind:"death", cause}` · `{kind:"completion", text}` (the map's `completionText`).
  - `NextLine`: `{kind:"rule", ruleId, action}` · `{kind:"none"}`.
- Precedence of „Teraz”: death, completion, combat (the rule of `statusText` at `src/browser/view/status-row.ts:62-68` moved: `activeCombat`, or `lastCombat` with a result whose `resolveMinute` is the map run's minute), otherwise `run.current` (a rule gives the action; a wait or no `current` gives a wait).
- „Potem” is the winner of the one `ruleSigns(state).judgement`, its action copied; no second pick.
- `minutesLeft = max(0, endMinute − run.minute)`, `minutes = endMinute − startMinute`.

What `run.current` holds at the end of a game minute (concern 7): `minuteBeforePick` ends an action in the minute where `minute >= endMinute`, and `finishMinute` starts the next action in that same minute (`startMinute = run.minute`), so at the end of every game minute `current.endMinute > run.minute`, apart from a death (the activity of the death stays) and a completion. A pause changes nothing in the map run. So a paused minute 12 of an action 10..15 reads „zostało 3 z 5”, and an action picked in the minute the last ended has all its minutes left. Both are tests.

`status-row.ts` is untouched (slice 7 removes its copies). `statusText` still has its own rule of combat minutes until then.

## Checks

| Command | Exit | Note |
|---|---|---|
| `npm test -- tests/sim/rule-signs.test.mjs` before the code (function a stub returning a wait and no rule) | 1 | 11 of 14 new cases failed on their assertions (no precondition failed); the 3 passing were the "no map run", "changes nothing" and wait cases, which the stub satisfies |
| `npm test -- tests/sim/rule-signs.test.mjs` after | 0 | 40 pass, 0 fail |
| `npm test -- tests/sim/encounters.test.mjs` | 0 | 29 pass |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | Ran 2 tests, OK |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | Ran 5 tests, OK |
| `npm run typecheck` | 0 | |
| `npx prettier --no-config --no-editorconfig --check` and `npx eslint --max-warnings 0` on the four files | 0 / 0 | |

Not run: the whole gate (`npm test` with no argument), by the handoff. The invariants' tests were not seen failing first: the slice adds no breach of them; the "changes nothing in the state they read" case runs the new function on frozen copies.

## Own-work check

Requirement most likely unmet: D-147's „Teraz” in the minutes of an attack with precedence of death and completion, and „Potem” taken from the combat judgement. Cases: each minute 181..185 of an attack names the wolf; the resolution minute 186 with an ordinary action started in it (`current.startMinute` 186, rule 12) still names the wolf, and minute 187 names the action; a combat death in the resolution minute (lastCombat resolved at the death minute) names the death; a cold death after an encounter names the cold, not the fight; a completion on `forestDeep` in the resolution minute names „Las — głębiej rozwiązany”; „Potem” in combat names rule 13 (kick), where an ordinary pick would take rule 11 (explore), and equals `ruleSigns(...).judgement.winner.id`. All pass.

Mutations tried (and restored): `minutesLeft` off by one → 4 cases fail; `resolveMinute >= minute` and dropping `.result` of `lastCombat` → no case fails, but both are equivalent in reachable states (`resolveMinute` is never above the minute once `activeCombat` is null; `result` is null only before the turns, when `activeCombat` still stands or a completion has precedence).

Expected values are written out: the 20 minutes of explore from the data (`actions.ts`), the 3 of 5 from the task's example, rule numbers from the fixtures, texts from the task.

## The check moved in encounters.test.mjs

In "M+5 starts ordinary work immediately, counts every combat action once and still shows combat": `assert.match(statusText(...), /Walczy/)` became `deepEqual(nowAndNext(state).now, {kind:"combat", creatureId:"wolf"})`, and `assert.doesNotMatch(statusText(next.run), /Walczy/)` became `now.kind === "action"` with `ruleId === 2` (the wander the case starts at 186). It is stronger, not weaker: it names what „Teraz” says in the next minute instead of what it does not say. The `statusText` import was removed (no other use in the file).

## Reaches beyond the dispatch

- None in files changed. Read beyond the handoff: `src/browser/sim/data/actions.ts` (grep of the minutes of actions), `src/browser/sim/body.ts` `bodyMinute` (to build a death of hunger), `scripts/test.py` head (how one test file runs). `guidelines/testing.md` read in parts (lines 1-200) and not whole: the handoff's *Read* names it whole; the rest of the file (trust-boundary table) does not concern a simulation function.
- `guidelines/coding.md` read in full except lines 1-150 skimmed once (linter, formatter, audit, failures) — the rules that bind are linter and formatter, both run.

## Values that do not pass my own reckoning

None.

## Choices

- Names `nowAndNext`, `NowLine`, `NextLine`, `NowAndNext` and the shape of the lines — mine. The simulation gives data (kinds, ids, numbers), not Polish words, except `completionText`, which is already map data. Cost if wrong: slices 5 to 7 adapt one import.
- The types live in `game.ts`, not `types.ts` (which the handoff keeps out of reach). Cost if wrong: a later move of three type declarations.
- `Potem` in the resolution minute of an attack, after the turns resolved and an ordinary action started: `ruleSigns` judges as an ordinary minute there (`activeCombat` is null), so „Potem” names the ordinary winner, not a combat rule. D-309 says "in the minutes of an attack the combat rule the turn would choose"; the turns of the attack have resolved by then. I followed the slice (the winner of the one judgement `ruleSigns` gives); a different reading would need a second judgement, which `rule-state-from-pick` forbids. Reported for the reviewer.
- A `current` of null outside combat and the end reads as a wait (as `statusText` does); no reachable state has it.

## Searches not found or unclear

- The slice does not name the function or its result type; chosen above.
- The slice's *Read* names `foundations/glossary.md` and `part_map.md` ranges; I did not open them (the code and tests needed nothing from them).
