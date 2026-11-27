done with concerns

# Planner report — mechanizm-drabiny

- Plan: `.runs/task-cycles/mechanizm-drabiny/plan.md`
- Size report: `.runs/task-cycles/mechanizm-drabiny/plan-size.md`
- Check result: `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/mechanizm-drabiny/plan.md` — every slice fits (exit 0); Slices 2 and 8 fit by ranges of `tests/view/maps-screen.test.mjs`; Slice 8 reads about 147 800 tokens, near the limit of 150 000. No test, typecheck or gate was run: the plan writes no code.

## Open design choice

None found. Reading the code showed no entry the change needs beyond the five rows and D-327, and no way the code makes costly to turn back that the task leaves open, with one weighing named under *Concerns* 6 (the rungs' identifiers), which is a choice of how to make the change and stands in the plan's *Choices*.

## The plan in short

Foundation entries first (row 4 glossary term `rung`, then decisions rows 2, 3, 5, then D-327 changed), then eight slices:

1. the mechanism of a rung and the three rungs in `src/browser/sim/data/maps.ts`, with the sim data tests and two invariant tests (leaves five view tests failing, named);
2. the tests of the catalog follow the eight maps;
3. the tests of the map list and the end window follow the eight maps (the two „Otwarte” lines in order);
4. the measure with one character in `progression` (independent of the data; second table with both shares and both verdicts);
5. the skill `loop2-balance`, both byte-identical copies;
6. the rungs' numbers settled by the check, one full run on seeds 1–500 at the end, the table kept in `reports/`;
7. the heading's icons in `cardHeading` and the styleguide's rule of the card;
8. the card draws them, checked in both layouts, screenshot per D-418.

The instrument: Slice 4 runs a narrowed check (`--maps forest --seeds 1-20`); Slice 6 tunes on fewer seeds narrowed by `--maps` and runs the full `progression` on 1–500 once, at its end. No slice's *Checks* holds `npm test` without a file.

## Reconciliation with the sources

1. **A third hand-written sentence.** The task (To do 2, Q2, row 2) names two sentences a rung's row writes by hand: the solving condition (`solvingText`) and the completion text. At the base, `MapDef` in `src/browser/sim/data/maps.ts:64-69` has a third one, `goalText`, "the one short sentence of what the map demands, written by hand", which D-327 (`foundations/decisions.md:10444`) places under the card's heading and which gives the hours and attacks of the map's own condition. A rung whose streak rises cannot take it from its opener. The plan has each rung row write it by hand too (Slice 1, *Choices*); the row-2 decision should name it among the sentences by hand — see *Concerns* 1.
2. **D-448, D-449 and the maps of task 3 are on the base.** The task's *Context* (lines 105–108) has them only on `task/katalog-map`; at `e84a73ce` they stand at `foundations/decisions.md:6195-6226`, `forestPack` and `forestLair` are in `MAPS`, and `REGIONS` and the field `region` exist. D-448's *Verification* "violates" example has no qualification about a new rule, as the task's *Context* says.
3. **The D-133 quote.** The task quotes D-133 as „Las — 480 minut …”; at the base D-133 (`foundations/decisions.md:5927`) shows the sentence in „Żąda” without the map's name, and `solvingText` holds no name. The plan follows the base: a rung's `solvingText` holds no name.
4. **Test names in To do 3** match `tests/sim/data.test.mjs:91` and `:108`.
5. **Five view tests count or list the five maps.** The task names only `tests/sim/data.test.mjs`. The view tests `tests/view/catalog-lines.test.mjs` („Las · 0 z 5”, `empty: 4`), `tests/view/map-catalog.test.mjs`, `tests/view/maps-screen.test.mjs:239`, `tests/view/map-lines.test.mjs:63-94` and `tests/view/end-window-lines.test.mjs:433-438` expect them too, and `tests/invariants/test_map_run_tiles.py` has a tripwire table per map. The plan gives them Slices 1–3. These were found by searching, not by running; Slice 1's executor measures which tests fail.
6. **The skill has two copies.** To do 7 names `.claude/skills/loop2-balance/SKILL.md`; `.agents/skills/loop2-balance/SKILL.md` is a byte-identical copy that `tests/agent_workflow/test_loop2_balance_skill.py` holds. Slice 5 changes both.
7. **The skill's sentence on „harder”** (`.claude/skills/loop2-balance/SKILL.md:179-180`) reads the order of difficulty from each map's own chain, the measure D-448 rejects. Slice 5 replaces it.
8. **Numbers of *Context* line 111** were measured at `97936c24`. Tasks 3 and 6 have merged since, so the plan uses none of them as an expected value.
9. **Trust boundaries.** `src/browser/sim/saved-game.ts:1044` and `:1401` accept map identifiers by membership in `MAPS`, and `src/browser/view/screen-address.ts:54` does the same. A rung in `MAPS` is accepted without a change to either file, so no slice touches a trust-boundary file and every *Risk* is `none`.

## Decisions the change might make untrue

I read D-388, D-397, D-325, D-331, D-132, D-53, D-133, D-136, D-149, D-24, D-333, D-438, D-448 and D-449, and the `decision:` lines of the tests the plan changes (`tests/sim/data.test.mjs`, `tests/view/end-window-lines.test.mjs`, `tests/view/catalog-lines.test.mjs`, `tests/view/map-catalog.test.mjs`, `tests/view/map-lines.test.mjs`, `tests/view/maps-screen.test.mjs`). Results:

- D-327 is the only entry the change makes untrue (*To do* 8). It is in the plan's *Foundation entries*.
- D-333's usual step stays true because the rungs keep step 5 (*Choices*).
- D-132 and D-53 say „the map it opened” in the singular — see *Concerns* 4.

## Guidelines missing or uncertain

- **The styleguide's size.** `guidelines/styleguide-browser-view.md` applies to every file of `browser-view`, including tests under `tests/view/` (`AGENTS.md`, `foundations/part_map.md:15`). It is about 174 000 characters (about 70 000 tokens). With `guidelines/testing.md` (about 35 000 tokens), any slice touching the part spends most of its reading budget before its own files. That forced the split of the view slices (2, 3, 7, 8). It is uncertain whether a change of expected counts in a view test needs the styleguide whole; the plan follows `.the-way/product-guidelines/reading.md` and gives it whole.
- **How a cycle changes the styleguide.** The guidelines do not say whether a cycle changes the styleguide directly or through `the-way-maintain-styleguide`. That skill's description leads a styleguide task's refinement with the human, while earlier cycles changed the rule of a screen directly (for example `2c53300a`, `db955ab0`). The plan changes the rule of the card directly in Slice 7 (*Choices*).
- **No decision for `progression`'s output.** `guidelines/coding-balance-instrument.md` and the foundation hold no decision on what the mode `progression` prints; D-428 covers the map check alone. The second table of Slice 4 stands on the plan's *Choices*.

## The styleguide's order-of-work example

The example (`guidelines/styleguide-browser-view.md:1966-1973`) runs: environment and library, then values in their source, then one screen, then its states.

- The change brings no environment, library or token value, so the first two steps are empty.
- Slice 7 gives the screen's data (the heading's icons in `cardHeading`) and its rule.
- Slice 8 draws the one screen, the card, in its states (with an attacker, without one) and both layouts.

If Slice 8 finds that a size the icon needs has no token, that is the "values in their source" step. Its *Goal* sends the missing value to its report for a human source instead of choosing one (`src/browser/AGENTS.md`).

## Reaches beyond the dispatch

- `.the-way/product-guidelines/reading.md` — which guideline files each slice's *Read* must hold whole. It made the styleguide whole in every browser-view slice.
- `.the-way/task-cycle/skill/SKILL.md`, a search for "Foundation entries" — who writes the plan's entries (a fresh agent, before slice 1).
- `src/browser/sim/saved-game.ts` and `src/browser/view/screen-address.ts`, by search only — whether a rung's identifier reaches a trust-boundary file (it does not; *Reconciliation* 9).
- `balance/overlay.mjs` whole, `balance/cli.mjs:60-130` and `:480-600` — how the instrument reads `MAPS` and the flags of `progression`.
- Searches in `tests/view/`, `tests/sim/` and `tests/invariants/` for tests that count or iterate the maps (*Reconciliation* 5), with the ranges read around each hit.
- `tests/agent_workflow/test_loop2_balance_skill.py`, its test names, and the byte comparison of the two skill copies.
- `.claude/skills/the-way-maintain-styleguide/SKILL.md`, its header, and `git log` of the styleguide — how cycles change the styleguide.
- `.claude/skills/loop2-play/SKILL.md`, its section headings — for the ranges of Slice 8.
- `package.json`, its scripts — the command `npm run typecheck`.
- Entries read whole because they stood inside the ranges read: D-21, D-22, D-55, D-71, D-129–D-131, D-134, D-135, D-214, D-215, D-404, D-143, D-326, D-328–D-330, D-426, D-433, D-434.

## Working copies

None made. The directory `.runs/planner/` was not created. I edited the plan in place with short Python scripts given on standard input; they left no file behind. No tracked file changed (`git status --short` is empty).

## Unread material

- `.claude/skills/loop2-play/SKILL.md` — section headings only. The handoff names it as a reference for a slice that runs the game; Slice 8 reads its sections „Check the phone layout” and „Show a screenshot to the human”.
- `tests/sim/data.test.mjs` — lines 1–170 and its test names and `decision:` lines by search; not read whole.
- `tests/sim/discovery.test.mjs` — lines 335–360; `tests/sim/map-card.test.mjs` and `tests/sim/first-map-balance.test.mjs` — test names only.
- `balance/engine.mjs` — by search only (`prerequisitesOf` at line 99); `balance/check-map.mjs` — not read; `balance/cli.mjs` — lines 60–130 and 480–600.
- `tests/balance/progression.test.mjs` — lines 1–60 and 184–346; `tests/balance/agreement.test.mjs` — by search only.
- `tests/invariants/test_content_identifiers.py` — by search (the list `ENTRIES` and its tests).
- `src/browser/view/catalog-lines.ts` and `src/browser/view/end-window-lines.ts` — not read; `src/browser/view/map-lines.ts` and `src/browser/view/map-card.tsx` — by search of their functions and the heading; the card's tests in `tests/view/` — by search and the ranges named under *Reconciliation* 5.

Read whole:

- the handoff, the frozen task, the method;
- the orchestrator's index, the part map, the glossary;
- every decision and invariant the handoff names;
- `guidelines/coding.md`, `guidelines/coding-content-data.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-balance-instrument.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`;
- `.claude/skills/loop2-balance/SKILL.md`, `src/browser/sim/data/maps.ts`, `balance/progression.mjs`;
- `the earlier measurement's scratch script (outside git, in the ignored working directory of the main checkout)` and its `result.md`.

## Searches not found or unclear

- **A decision on what the mode `progression` prints.** None found; a search for `progression` in `foundations/` finds D-438 and D-448 only.
- **Whether `tests/view/maps-record.test.mjs` and `tests/view/end-window.test.mjs` fail once the rungs stand in the data.** Not run. They iterate or name maps; Slices 2 and 3 hold them in their *Checks*, and their executors measure.
- **Whether a token holds a size for an icon in the card's heading.** Unclear. `src/browser/maps-screen.css:357` has a rule `.maps-card-icon`, which may serve; Slice 8 decides or reports.
- **How a cycle changes the styleguide.** Unclear (*Guidelines missing or uncertain*).

## Concerns

1. **Row 2 must name the short sentence of the demand.** The row-2 decision should name `goalText`, the short sentence of the demand that D-327 places under the card's heading, among the sentences a rung's row writes by hand. Without it, the decision says less than the data must hold, and task 16 could take the sentence from the opener. Proposed: the orchestrator carries this into the handoff of the agent of the plan's *Foundation entries*. Evidence: *Reconciliation* 1.
2. **The D-327 entry needs the old Loop's card.** Rewriting „in six things only” needs the card of the old Loop (https://kantarion.bieda.it/, in both layouts) beside the card as the game stands, and remark R1 of https://github.com/mariusznazar/loop2/pull/177, „For you to decide”, item 1, variant c. The entry's agent needs those sources in its handoff, as well as `gh` access to the PR.
3. **Slice 8 is near the reading limit.** It reads about 147 800 of 150 000 tokens. An addition to its *Read* by the orchestrator should be checked with the size script again.
4. **D-132 and D-53 are singular.** Both say „Otwarte: {mapa} →” leads to „the map it opened”, in the singular. After this change Las — głębiej opens two maps, and the end window shows a button for each, in the data's order. Read as "each map it opened", both stay true, and the task marks D-132 "bez zmiany". The plan writes no change of either. If the orchestrator reads them as untrue, they join the *Foundation entries*.
5. **The scratch script is out of reach.** `the earlier measurement's scratch script (outside git, in the ignored working directory of the main checkout)` lies outside the worktree, so the size script cannot count it and leaves the slice "unchecked". I dropped it from Slice 4's *Read*; Slice 4's *Goal* states the measure in full. The orchestrator may add it (57 lines, a scratch example, never run) by copying it under the worktree's `.runs/`.
6. **The rungs' identifiers cost more to change later.** `forestDeep2`–`forestDeep4` will stand in saved games and addresses. Changing them after players solve a rung would make those saves refuse or lose it. The plan's *Choices* names this.

## Questions

None.
