# Report — slice 3 of `edytor-programu`: six icons of actions, with their credits

Saved by the orchestrator from the executor's returned text (its tool refused the file). The words are the executor's.

**Status:** done with concerns. **Commit:** `9a8c4e2` (base `fccc084`), not pushed.

## Files changed (12; 138 added, 7 removed)
Six new `assets/icons/*.svg` (binoculars, hiking, direction-sign, grab, claw-hammer, match-tip); `src/browser/sim/data/actions.ts` (+22: `icon?` and `iconTitle?` on `ActionDef`, nine actions get both); `src/browser/view/credits.ts` (+30: six `ICON_CREDITS`); `src/browser/view/footer.ts` (+40/-3: footer lines per icon file, resources, campfire, then actions, one line per file); `tests/invariants/test_icon_credits.py` (+15/-1: `AUTHORS`, `TITLES`); `tests/sim/data.test.mjs` (+6: `deepEqual` of `explore`, `wander`, `walkTo` includes the icon fields); `tests/view/icons.test.mjs` (+22/-3: `TITLES`, `ACTION_ICONS`, `NAMED`).

## How the icon files were made
- Source: `https://raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/{delapouite|lorc}/<name>.svg` (the `ICON_SOURCE_COMMIT` of `credits.ts`); all six HTTP 200; nothing from the old Loop.
- Recipe, as the five existing files: remove the background path `<path d="M0 0h512v512H0z"/>`, change `fill="#fff"` to `fill="#f4f4f5"`, keep the shape path's `d` untouched. The recipe applied to `campfire` and `wood-stick` sources gives output byte-identical to the repository's files. For the six new files the shape `d` equals the source's (compared by hash).
- Authors from the source folders: Delapouite for binoculars, hiking, direction-sign; Lorc for grab, claw-hammer, match-tip.
- Titles from the environment facts `game-icons-<name>-title`: "Binoculars icon", "Hiking icon", "Direction sign icon", "Grab icon", "Claw hammer icon", "Match tip icon". The game-icons pages were not reopened.

## Design choices
1. Footer: one line per icon file, actions named together in data order (`Idź, Idź — ognisko`; `Zbierz, Obchód`; `Zapal — ognisko, Zapal — patyk`). Rejected: one line per action (would credit `direction-sign` twice). Cost if wrong: long names on the line; one function.
2. Icon fields on each action, duplicated for shared icons, as `resources.ts` and `campfire.ts` give theirs; `footer.ts` throws if an action's icon has no title or two titles disagree. Cost: the title string appears twice for `direction-sign`, `grab`, `match-tip`.
3. Both fields optional in `ActionDef` until slice 4.

## Changed existing tests outside the plan's change list
- `tests/view/icons.test.mjs` hard-coded the footer as five lines; with the action lines it failed four subtests (11 lines against 5). Expectations updated: the six action lines written out literally in `ACTION_ICONS`, joined into `NAMED`. No assertion weakened.
- `tests/sim/data.test.mjs` is in the plan's *Checks* but not its change list; one `deepEqual` failed because the data now carries the icon fields; fields added to the expectation.

## Checks (command, exit code)
1. `npm test -- tests/invariants/test_icon_credits.py` red run (files, TITLES, AUTHORS written, credits not yet): exit 1, 2 failures, six messages "the footer shows no credit with its page on game-icons.net".
2. same, after the code: exit 0, 5 tests OK.
3. `npm test -- tests/invariants/test_icon_file_content.py`: exit 0, 2 tests OK.
4. `npm test -- tests/view/icons.test.mjs` before updating expectations: exit 1, 4 subtests (footer 11 against 5). 5. After: exit 0, 29 tests.
6. `npm test -- tests/invariants/test_loop2_container_icons.py`: exit 0, 1 test, 127.6 s (Docker available).
7. `npm test -- tests/invariants/test_content_identifiers.py`: exit 0, 4 tests.
8. `npm test -- tests/sim/data.test.mjs` before updating: exit 1, 1 subtest. 9. After: exit 0.
10. `npm test -- tests/sim/rules.test.mjs`: exit 0.
11. `npm run typecheck`: exit 0.
12. `npm test -- tests/quality/test_quality_invariants.py`: exit 1; 2 errors `test_ruff_source_rules`, `test_shellcheck_source_rules` (`FileNotFoundError`, tools not installed: base state); no other failure.
13. `npm test --` on `tests/sim/actions.test.mjs`, `campfire.test.mjs`, `acceptance.test.mjs`, `tests/view/account-screen.test.mjs`, `program-editor.test.mjs`: exit 0 each.
14. `npm test -- tests/invariants/test_simulation_isolation.py`: exit 0, 5 tests.
15. `npx prettier --no-config --no-editorconfig --check` on the five changed TS/MJS files: exit 0.
Not run, by instruction: the full gate.

## Own-work check
- Requirement most likely unmet: "the statement of change of the credits stays true". Check: `d` of each new file against the source's shape path, the recipe against two existing files byte for byte. Showed: all six `d` equal; recipe reproduces existing files exactly; check 3 passed.
- Weakest point: the footer line for a shared icon. Check: the literal expected lines in `icons.test.mjs`. Showed: passes with the eleven lines expected. No deliberate mutation of `footer.ts` was run, so sensitivity is argued, not observed.
- Test-first: TITLES and AUTHORS first, red run (check 1) for the expected reason, then the code.

## Reaches beyond the handoff
Read `guidelines/coding.md`, `coding-content-data.md`, `coding-browser-module.md`, `styleguide-browser-view.md`, `testing.md`, `src/browser/AGENTS.md`, `.the-way/task-cycle/change/ui_check.md`; D-27, D-43, D-291, D-18, D-34 whole; part-map entries; the `invariants.md` icon entries and `environment_facts.md` lines 1–130; did not open `task.frozen.md`; read the vault rules `.ai/rules/git.md` and `.ai/rules/search.md`; two test files outside the change list changed; fetched the six SVGs and three comparison SVGs from `raw.githubusercontent.com` at the pinned commit into a temporary folder outside the repository.

## Searches not found or unclear
- A rule on how a footer line names several actions that share one icon file: nothing in the foundation or the task settles the format; chosen as above, for the reviewer.
- A direct test that each of the nine actions carries an icon field: none exists; coverage is indirect (the literal footer lines in `icons.test.mjs`, three `deepEqual` in `data.test.mjs`); the other six actions' icon fields are asserted by no test.
- The icon titles come from the environment facts as recorded; the pages were not reopened.

## Concerns
- Two tests changed outside the plan's change list.
- `test_quality_invariants.py` has two errors (ruff and shellcheck missing): the base state; the gate cannot pass on this computer until those tools are installed.
- No visual check: nothing draws the icons yet.
