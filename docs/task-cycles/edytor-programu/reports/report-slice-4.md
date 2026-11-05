# Report — slice 4 of `edytor-programu`: the other five icons of actions, and the icon field required

Saved by the orchestrator from the executor's returned text (its tool refused the file). The words are the executor's.

**Status:** done with concerns. **Commit:** `ad60b00` (base `9a8c4e2`), not pushed.

## Files changed (10; 91 added, 3 removed)
- New `assets/icons/logging.svg`, `meal.svg`, `deadly-strike.svg`, `boot-kick.svg`, `dodge.svg`.
- `src/browser/sim/data/actions.ts` (+12/-2): `icon` and `iconTitle` required on `ActionDef`; `feedCampfire` logging, `eat` meal, `strikeWithStick` deadly-strike, `kick` boot-kick, `dodge` dodge.
- `src/browser/view/credits.ts` (+25): five `ICON_CREDITS`. Logging by Skoll, meal by Delapouite, deadly-strike and boot-kick by Lorc, dodge by Felbrigg.
- `tests/invariants/test_icon_credits.py` (+13/-1): `AUTHORS`, `TITLES` gain the five files.
- `tests/view/icons.test.mjs` (+30): five `TITLES`, five `ACTION_ICONS` lines in data order, a case that every action names an icon and title and the file exists, a case on the footer order (actions after the campfire).
- `tests/sim/data.test.mjs` (+6): the three combat actions' expectations gain icon fields. Not in the plan's change list, as in slice 3; no assertion weakened.

## Icon files
Sources `https://raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/<author>/<name>.svg`, folders `skoll`, `delapouite`, `lorc`, `felbrigg`; all HTTP 200; nothing from the old Loop. Recipe as slice 3 (background path removed, `#fff` → `#f4f4f5`, shape `d` unchanged, verified by diff). Authors and titles from `foundations/environment_facts.md` lines 130–156; the game-icons pages not reopened.

## Design choices
1. Both `icon` and `iconTitle` required (rejected: title optional — the footer would throw at runtime).
2. The "every action names an icon" case iterates all of `ACTIONS` (rejected: only the `NAMED` list).
3. The footer-order case is a separate test.

## Checks (command, exit code)
1. `npm test -- tests/view/icons.test.mjs` red first: exit 1 ("feedCampfire names no icon"; footer 11 lines where 16 expected).
2. `npm test -- tests/invariants/test_icon_credits.py` red first: exit 1, 2 failures, five "the footer shows no credit" messages.
3. `npm test -- tests/view/icons.test.mjs` after: exit 0, 31 tests. 4. `test_icon_credits.py`: exit 0, 5 tests. 5. `test_icon_file_content.py`: exit 0. 6. `test_loop2_container_icons.py`: exit 0, 80.7 s, Docker available.
7. `npm test -- tests/sim/data.test.mjs`: exit 1 first (combat `deepEqual`, expected), exit 0 after the expectation update, 33 tests.
8. `tests/sim/rules.test.mjs`: exit 0. 9. `tests/sim/actions.test.mjs`, `campfire.test.mjs`, `acceptance.test.mjs`: exit 0 each.
10. `npm run typecheck`: exit 0.
11. Prettier `--check` on four changed TS/MJS files: exit 1 first (one line over 80 columns), exit 0 after wrapping.
12. `npm test -- tests/quality/test_quality_invariants.py`: exit 1, 2 errors (ruff and shellcheck `FileNotFoundError`), no other failure.
Not run: the full gate.

## Own-work check
Weakest point: the runtime guarantee. Removing `icon: "dodge"` made the icons test exit 1, but the build's type check stopped the run first (TS2741) and `npm run typecheck` exited 1 too: the compile gate catches it; the runtime case was seen failing only in check 1. Line restored; checks 3 and 10 re-run, exit 0.

## Reaches beyond the handoff
Read whole: `guidelines/coding.md`, `coding-content-data.md`, `coding-browser-module.md`, `testing.md`, `.the-way/task-cycle/change/ui_check.md`, `src/browser/AGENTS.md`; part map lines 1–60; D-18, D-27, D-291; invariants 319–353; environment facts 39–156; `footer.ts`, `test_icon_file_content.py`, `credits.ts`, `actions.ts`, `test_icon_credits.py`, `icons.test.mjs`, the combat case in `data.test.mjs`, the change SKILL and slice.md, slice 3's report; old Loop `activities.ts` lines 30–53 at `cdc7c0d` (same mapping as the handoff); vault `.ai/rules/git.md`.

## Searches not found or unclear
- No foundation entry says how a footer line names several actions sharing one icon file (same as slice 3; this slice follows slice 3's form).
- The five game-icons pages were not reopened; titles and authors come from the environment facts.
- The screenshot route in `ui_check.md` is `loop2-play`, which the handoff does not name.

## Concerns
- Screenshot unchecked: the footer gains five credit lines; states checked in code, the game not run in a browser; the footer draws these lines from data through existing code and nothing draws the icons yet.
- Dead guards in `src/browser/view/footer.ts`: with both fields required, `actionIcons()` has two unreachable checks (`icon === undefined`, `iconTitle === undefined`); the file is outside the change list; compiles and passes.
- `tests/sim/data.test.mjs` outside the change list, as in slice 3.
- Base gate failures (ruff and shellcheck not installed) unchanged.
