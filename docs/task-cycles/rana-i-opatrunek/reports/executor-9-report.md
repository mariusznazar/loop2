# Executor report — Slice 9, Ucisk in the pick of the program editor

**Status:** `done with concerns`

Concerns, in short: (1) one test outside the plan's named test was also stale and failing on the base, and I updated it because it sits in this slice's *Change* file; the orchestrator should confirm that. (2) The view's pick cell carries no icon, so the icon of „Ucisk” is checked only on the data, not drawn by a pure view module (the plan asked to report such a gap).

## Base and worktree

- Worktree: `the worktree's root`, branch `task/rana-i-opatrunek`.
- Base checked at start: `8829f36f208efa93b124ad950a343908f4bdbb2c` (matches the handoff).
- Pinned the-way: `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f` (matches).
- Head after this slice: `3e458949`.

## Commits

- `3e458949` test: „Ucisk” stands in the pick of the rule panel after „Odskocz” and before „Załóż” … (D-290, D-363, D-293, D-289, D-309)

Files changed:
- `tests/view/pressure-pick.test.mjs` — new, 144 lines added (7 tests). Prettier-formatted.
- `tests/view/program-editor.test.mjs` — 2 lines added: `"Ucisk"` after `"Odskocz"` in the cell list of the test at line 1068 (plan's named test), and `"pressure"` after `"dodge"` in the action-kinds list of the test at line 801 (see concern 1).

No product code, no view module, no data changed.

## Checks run (commands and exit codes)

Baseline on the base `8829f36f`, before any edit:
- `npm test -- tests/view/program-editor.test.mjs` — exit 1, 63 tests, 61 pass, 2 fail:
  - line 1068 "the actions of the pick stand in five named groups…": actual group „Żywność i walka” has `Ucisk` between `Odskocz` and `Załóż`; expected list lacks it.
  - line 801 "every program the editor builds passes setProgram, before sending and during a run": actual `actionKinds` (from the data) includes `pressure` after `dodge`; expected list lacks it.

After the edits:
- `npm test -- tests/view/pressure-pick.test.mjs` — first run exit 1, 7 tests, 6 pass, 1 fail. The failure was a bug in my test helper (I applied the sections helper to the flat cell list returned by `actionTargetPick`); it is my error, not a product finding. Fixed. Rerun after the fix: exit 0, 7/7. Rerun after Prettier: exit 0, 7/7.
- `npm test -- tests/view/program-editor.test.mjs` — exit 0, 63/63.
- `npm test -- tests/view/item-verb-panel.test.mjs` — exit 0, 6/6.
- `npm test -- tests/view/gear-rule-panel.test.mjs` — exit 0, 4/4.
- `node node_modules/prettier/bin/prettier.cjs --check` on both test files — pass (after `--write` of the new file).
- `node node_modules/eslint/bin/eslint.js` on both test files — exit 0.

Not run: the whole suite (`npm test` with no file), as the handoff forbids; `foundation_check.py` and `check_instructions.py` (not in this slice's Checks).

## Own-work check (section 3 of `make-change`)

- Requirement most likely not met: the icon. Plan: „Ucisk” has the icon of „Opatrz”. The pick cell (`PickCell`) has no icon field; the icon is drawn by React from `ACTIONS[kind].icon`. Check written: `ACTIONS.pressure.icon === ACTIONS.tend.icon` (data-level only, in `pressure-pick.test.mjs`). Shown: passes. Gap reported: the view gives no icon on the pick cell, so the drawing itself is not covered by a pure test in this slice.
- Mutations thought through: wrong group position → caught by the group test; a price at the cell → caught by the cell test; wrong target label → caught by the target test; wrong chosen field → caught by the field test; wrong time → caught by the time test; a missing greyed reason → caught by the reasons test; a missing amber sign → caught by the amber test. The icon mutation is not caught (see above).
- Test-first note: the new file's tests describe behaviour the view already computes, so they passed at first run (apart from my helper bug). The only true failing-first evidence is the baseline failure of the line-1068 test listed above.

## Choices and adaptations

1. **Concern 1 — the test at line 801 was failing on the base, and the plan does not name it.** The plan names only the line-1068 test. The line-801 test lists every action kind in the data and lacks `pressure`, so it breaks by the same cause (Ucisk already in the data). Both tests live in `tests/view/program-editor.test.mjs`, which is in this slice's *Change*, and the slice's Checks run that file; so I updated its expected list (one line) rather than leave the file failing. The cause is the data (decisions D-290 and D-363 name Ucisk), not a weakened assertion. Rejected: leaving it failing and reporting it as unchecked — then the slice's own Check would fail. Cost if wrong: one line to revert, and the orchestrator can assign it elsewhere.
2. **Adaptation of section 4 (plan vs code):** none structural. The plan said the cell test „holds Ucisk in its place and passes again”; it did not fail for a missing view behaviour, it failed on the stale list. Handled as concern 1.
3. **Icon:** the view has no icon on the pick cell; checked on data only (see own-work check). Not a view change, as the plan requires.
4. **Expected values:** all Polish strings (`„Opatrunek (1 opatrunek)”`, `„Ucisk — Opatrunek (1 opatrunek)”`, `„tura”`, `„gałąź niewykupiona”`, `„wybierzesz w przejściu postaci, która ją kupiła”`, `„tylko w walce”`) are written literally in the test, not read from the code under test. The branch in the bought-branch helper uses the skill shape of `tests/sim/pressure.test.mjs` (`tending`, practice 60, `pressure: 1`).
5. **Decision lines:** each test carries a `// decision:` line quoting a sentence of D-290, D-363, D-293, D-289 or D-309 from the current ranges in the handoff.

## Reads beyond the dispatch (section 1)

- `src/browser/sim/program.ts` lines 480–500 and 562–640 (`actionRefusal` path that gives „tylko w walce”, `judgeRule`, `judgeProgram`).
- `src/browser/sim/game.ts` lines 223–235 (`ruleSigns`, to know which judgement the rule panel shows).
- `src/browser/sim/data/skills.ts` lines 60–100 and 250–270 (skill `tending`, branch `pressure`).
- `src/browser/sim/data/actions.ts` lines 225–250 (action `pressure`).
- `tests/sim/understanding-fixture.mjs` whole (`newKnowingGame`, `withEdgeSolved`).
- `tests/sim/pressure.test.mjs` lines 1–62 (its helpers and the shape of the bought branch).
- `tests/sim/gear-combat-wear.test.mjs` lines 314–328 and 399–412 (how the amber sign is built in a test).
- `tests/view/program-editor.test.mjs` lines 801–860 (test at 801), 998–1060 (helpers `withBought`, `runningGame`, `knowing`), 1187–1217 and 1676–1690 (the greyed-branch tests, for their setup).
- `tests/view/program-editor.test.mjs` lines 1068–1118 (the plan's test) and 1–80 (imports) — as the plan names.
- Greps for `pressure|Ucisk` in `src/browser` and for `tylko w walce` in `tests/` (locating the code, not reading it whole).
- Not opened: `tests/sim/program-fixture.mjs` (only its signature is used, as `tests/sim/pressure.test.mjs` uses it; the test runs and passes).

## Unread material

- `foundations/part_map.md:3-33` (listed in the *Read* of the plan): **not read**.
- `guidelines/styleguide-browser-view.md`: read lines 1–539 of 1980 only; the rest not read. The change is test-only and changes no screen, so the rest of the styleguide applies to no change of this slice.
- `guidelines/testing.md`: read whole (lines 1–510).
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`: read whole.
- `src/browser/view/item-target-pick.ts`: read whole.
- `src/browser/view/program-editor.ts`: read lines 590–911 (the plan's 700–911 plus the constants above it).
- Foundation decisions: D-290, D-363, D-293, D-289, D-309 and D-196 read at the current ranges given in the handoff.
- Not read because this slice changes no screen: `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md` (`SKILL.md` section 3 sends here only for a change that alters what a screen shows).

## Searches not found or unclear

- "row 10" in the plan's Goal (the icon of „Opatrz” „row 10”): I did not locate what row 10 refers to; I used the data icon instead.
- The view's pick-cell icon: no field found on `PickCell`; the icon is drawn elsewhere (React), not searched beyond that.

## Working copies

- No worktree, clone, or separate checkout made. The slice ran in the task's worktree.
- Scratch files written in `.runs/executor-9/` (the commit message file) and in the worktree's `.runs/` root (run logs): removed before return, listed in the next line.
- Removed: `.runs/executor-9/commit-msg.txt` and the logs `.runs/executor-9-base-pe.log`, `.runs/executor-9-pe.log`, `.runs/executor-9-pp.log`, `.runs/executor-9-pp2.log`, `.runs/executor-9-ivp.log`, `.runs/executor-9-grp.log`, `.runs/executor-9-eslint.log`. The evidence they held is in this report (the baseline failures and the check results above).
