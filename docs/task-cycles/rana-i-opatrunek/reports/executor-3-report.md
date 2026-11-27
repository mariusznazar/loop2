# Executor report — rana-i-opatrunek, Slice 3 („Mocniejszy zwój” in the healing and „Szybkie gojenie” in the health that comes back)

**Status:** done with concerns. The concern is the walk of the running game (section "Walk"), which I did not perform.

**Base:** be60238e3c93685d529fdb0e66c70077c06542b8 (HEAD at start, matched the handoff).
**Branch:** task/rana-i-opatrunek, worktree `the worktree's root`. Nothing pushed.

## Commits

1. `dad76033` — test: the new cases, written first (red on the base for two of them, see below). 94 lines added, 0 removed:
   - `tests/sim/body.test.mjs` +54
   - `tests/sim/craft-and-tend.test.mjs` +40
2. `0b18ce2a` — feat: the change. 27 lines added, 5 removed:
   - `src/browser/sim/body.ts` +5 −2
   - `src/browser/sim/run.ts` +11 −3
   - `src/browser/sim/skills.ts` +11 −0

The first commit is red on purpose: its two failing cases are the ones that the second commit makes pass.

## What changed

- `skills.ts`: new `healingOf(skills, item)` — the item's `healing.health` of the data plus `skillBonus(skills, "healing")` (5 per rank of „Mocniejszy zwój”); 0 for an item with no healing property. It imports `ITEMS` from `data/items.ts`.
- `body.ts`: `bodyMinute` takes a fourth argument `healthRegain`, default `BALANCE.body.healthRegain` (0.05). The health step is `decimal(health + healthRegain)`, capped at full health as before.
- `run.ts`:
  - `landUse`, case `tend` („Opatrz”): `tendedBody(state.body, healingOf(character.skills, action.item))`. The guard for a missing bandage and for full health is unchanged. Doc comment of `landUse` extended by one sentence.
  - `minuteBeforePick`: the body step gets `BALANCE.body.healthRegain + skillBonus(run.character.skills, "healthRegain")` (0.05 per rank of „Szybkie gojenie”). It is only called on the non-combat path, so combat minutes still stand still.

## Checks

Command form: `npm test -- <file>` as the Checks name them. Every one ran as written; no other command was needed.

Red on the base (before the code commit, HEAD be60238e plus the test commit's content):
- `npm test -- tests/sim/body.test.mjs` — exit 1. Failing case: "each bought rank of „Szybkie gojenie” adds 0.05 …", `1 ranks`: `99.05 !== 99.1`. The case stops at its first failing rank, so the 2-rank row was not reached on the base.
- `npm test -- tests/sim/craft-and-tend.test.mjs` — exit 1. Failing case: "„Opatrz” gives back the bandage's healing with 5 more for each bought rank of „Mocniejszy zwój”", `{"strongerRoll":1}`: `45.05 !== 50.05`.

Two new cases passed on the base, and that is expected: "the health regained with bought ranks … stops at full health" and "a minute of combat leaves the body standing still …". They hold behaviour the base already has (the cap; D-60's standing still). They are guards for the change, not red cases. The handoff asked for new cases "failing on the base"; I disclose that these two do not fail there.

Green after the change (all with exit 0):
- `npm test -- tests/sim/body.test.mjs` — exit 0, 39/39 pass.
- `npm test -- tests/sim/craft-and-tend.test.mjs` — exit 0, 30/30.
- `npm test -- tests/sim/combat.test.mjs` — exit 0, 11/11.
- `npm test -- tests/sim/encounters.test.mjs` — exit 0, 29/29.
- `npm test -- tests/sim/catch-up.test.mjs` — exit 0, 35/35.
- `npm test -- tests/view/body-row.test.mjs` — exit 0, 27/27.
- `npm test -- tests/balance/agreement.test.mjs` — exit 0, 9/9.
- `npm test -- tests/quality/test_function_and_file_size.py` — exit 0, "Ran 2 tests … OK". Baseline before the change, `node tests/quality/eslint-size-rules.mjs`: "0 functions and files over a threshold in 383 files", exit 0. So `run.ts` and `minuteBeforePick` stay under D-425's thresholds after the change.
- `npm run typecheck` — exit 0 (`node scripts/build.mjs --check`).

Extra checks I ran beyond the Checks, because the change touches what they cover:
- `npm test -- tests/sim/tending.test.mjs` — exit 0, 8/8.
- `npm test -- tests/invariants/test_simulation_inputs.py` — exit 0 (`bodyMinute` is in its list; the new argument has a default and does not change the arguments).
- `npx prettier --check` on the five changed TS/JS files — exit 0, after one wrap in `run.ts` that prettier asked for (the base was clean).
- `npx eslint` on the five changed files — exit 0.

Not run: the whole suite (`npm test` with no file), as the handoff forbids. The foundation check and the instruction check are the cycle's, not this slice's.

## Own-work check (section 3 of make-change)

Requirement: „Opatrz” gives back the item's healing plus 5 per rank of „Mocniejszy zwój”, never above full health (D-145); the body regains 0.05 plus 0.05 per rank of „Szybkie gojenie” in a minute neither chilled nor starving, never above full health (D-387); combat minutes stand still (D-60); a character with no rank heals and regains exactly as before (To do, item 6).

Check: the new cases in both files. Mutations I judged in my head:
- `healingOf` ignoring the skills → the rank case in craft-and-tend fails (seen red: 45.05 against 50.05).
- Regain ignoring the ranks → the rank case in body.test fails (seen red: 99.05 against 99.1).
- Combat minutes regaining → the combat case in body.test fails (99 → 99.1 would show).
- No cap in `tendedBody` → the cap case (90 + 40 → 130) fails.
- Default argument removed from `bodyMinute` → the existing 0.05 tests fail, unchanged.
All of the above is covered. What the walk would catch and the tests do not is listed below.

## Choices made (with the way rejected and its cost if wrong)

1. `healingOf` returns 0 for an item without a healing property, rather than the bought bonus alone. Rejected: returning the bonus. Cost if wrong: none now; the one caller tests for healing first.
2. The regain sum is passed to `bodyMinute` unrounded (0.05 plus ranks × 0.05), and the step rounds `health + regain` at the body's six decimal places. Rejected: rounding the sum in `run.ts`, because `decimal` is private to `body.ts` and exporting it widens that module's surface. Cost: none observed; the 2-decimal values of the data round the same way.
3. `bodyMinute` gets a fourth argument with the data's default. Rejected: making `body.ts` read the character's skills itself — that would change its signature to take the whole character.
4. The two new cases that pass on the base are kept as guards (see Checks).

No adaptation of section 4 of make-change was needed: the plan matched the code (`landUse`, `minuteBeforePick`, `bodyMinute`, `tendedBody` and the skill bonuses are where the plan put them). No changed invariant test. No reserved choice met.

## Walk of the running game (walkthrough.md)

The change alters behaviour a player sees: the health a bandage gives back, and the health a character regains by itself, both grow with the bought ranks. So the walk applies, and I did not skip it silently. **Not performed.**

- The way exists: `.claude/skills/loop2-play/SKILL.md` (`npm run local`, an account through the login card, Playwright CLI). I read its first 60 lines only.
- Why not performed here: reaching a bought rank needs a real play session — crafting a bandage to reveal the tree „Opatrywanie małych ran”, earning 10 practice points, buying „Mocniejszy zwój” on the character screen, then an „Opatrz” at a lowered health — and this slice did not run that session.
- The cases the walk should check, with their expected results from the tests: (1) no rank, „Opatrz” from 20 health gives 45.05 after the minute; (2) one rank bought, 50.05; (3) two ranks, 55.05; (4) two ranks of „Szybkie gojenie”, one minute at 99 health gives 99.15 on the character screen; (5) „Opatrz” at 90 health with three ranks ends at 100. Verdict of each: unchecked, reason as above.
- What I did not check and why: the screen values in the browser (only the simulation); the phone layout; the „Ucisk” branch (Slice 4).
- No view file changed, so `ui_check.md` gives no screenshot requirement for this slice, but the displayed health figures may change, which is why the walk matters.

Decision for the orchestrator: run that walk before the request, or accept the simulation-level tests as the check for this slice.

## Unread material and reaches

Named in the handoff and read whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/testing.md`, `src/browser/sim/data/skills.ts`, `data/balance.ts`, `data/items.ts`, `skills.ts`, `body.ts`, `run.ts`, `tests/sim/body.test.mjs`, `tests/sim/craft-and-tend.test.mjs`; the decision passages D-145, D-387, D-60, D-379, D-192 at their current ranges; invariants `simulation-inputs` (226–235); glossary `trait` (192–197); part map `simulation` (34–66, read by range).

Reaches beyond the dispatch (each named):
- `src/browser/AGENTS.md` — read whole, because the change is under `src/browser/` (AGENTS.md of the repository says so).
- `foundations/invariants.md` `function-and-file-size` (1428–1437) — read by a grep window, not as a range read.
- `foundations/decisions.md` D-425 — only its heading was located; the entry is **unread whole**.
- `tests/quality/eslint-size-rules.mjs` — first 80 lines read; the rest unread.
- `.the-way/task-cycle/change/walkthrough.md` and `ui_check.md` — read whole (sections 3 and 6 of make-change send here).
- `.claude/skills/loop2-play/SKILL.md` — first 60 lines only (walk route).
- `tests/sim/tending.test.mjs`, `tests/invariants/test_simulation_inputs.py`, `src/browser/view/body-row.ts`, `src/browser/sim/data/actions.ts`, `tests/sim/data.test.mjs` — located with grep and, for the first two, run; not read whole.

Searches not found or unclear: none that changed the work. One unclear point: the handoff asks for the new cases to be "failing on the base"; two of mine pass on the base (disclosed above).

## Working copies

- `.runs/executor-3/` (logs of check runs and one copy of the base `run.ts` used for a prettier comparison) — removed with `rm -rf` by its full path. Confirmed absent.
- No worktree or clone was made by this agent. The `node_modules` junction was left as it was.
- No screenshot was taken.
