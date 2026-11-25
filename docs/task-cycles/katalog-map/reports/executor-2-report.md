done

# Report - executor of Slice 2, task `katalog-map`

Branch `task/katalog-map`. Base `a0949dec`; head now `5766c306`. Nothing pushed. The full gate was not run.

Status history: `blocked` at the first return, for the missing environment fact `game-icons-bear-head-title`. The coordinator
recorded the fact in commit `23d8c7bb` (the head then); I then added the bear's title to `TITLES` and the checks pass. Status `done`.

## Commits

- `7a132107` feat: :sparkles: add the bear to the creatures with 120 health, a strike of 20 and its icon bear-head, its name after z and its credit (D-27, D-271)
- `5766c306` test: :white_check_mark: add the title of the icon bear-head to the icon credits check, from the environment fact game-icons-bear-head-title (D-27)

## Files changed (added / removed lines)

| File | Added / removed | Note |
|---|---|---|
| `assets/icons/bear-head.svg` | +1 (new, 2617 bytes) | the icon prepared as `wolf-head.svg` |
| `src/browser/sim/data/creatures.ts` | +14 / -0 | `nameWith` field, the wolf's `nameWith`, the bear's entry |
| `src/browser/sim/data/scene.ts` | +9 / -2 | `SCENE_CREATURES.bear` (four sheets); doc comment of `SceneCreatureSheets` corrected |
| `src/browser/view/credits.ts` | +5 / -0 | `ICON_CREDITS["bear-head"]` after the wolf's |
| `tests/sim/data.test.mjs` | +17 / -0 | wolf's `deepEqual` gets `nameWith`; new bear test |
| `tests/view/icons.test.mjs` | +30 / -3 | `TITLES`, `CREATURE_ICONS` (wolf, then bear), section and data tests for the bear |
| `tests/invariants/test_icon_credits.py` | +3 / -1 | `TITLES` gets `"bear-head.svg": "Bear head icon"`; comment lists the new fact |

## The bear's data

- `bear`: name `niedźwiedź`, `nameWith` `niedźwiedziem`, icon `bear-head`, `iconTitle` `Bear head icon`, `revealedBy` attacked by `bear`,
  health 120, strike 20, one rule `always → strike` (the old game's program).
- `SCENE_CREATURES.bear`: `bear-idle.png` frames 1, `bear-run.png` frames 5, `bear-bite.png` frames 3, `bear-death.png` frames 4; each
  64 x 64.

## Icon source check

- The old repository's `assets/game-icons/delapouite/bear-head.svg` (read with `git show feat/archetypes:...`) equals the file at the pinned
  commit `82d948812bfe3f269ef8f731dcdb07b08160edc4` of game-icons/icons (`cmp` exit 0).
- The wolf's file is reproduced exactly from its source by two edits: removing the background path `<path d="M0 0h512v512H0z"/>` and
  changing `fill="#fff"` to `fill="#f4f4f5"`. The bear's file was made the same way.

## Checks (command and exit code)

| Check | Exit | Result |
|---|---|---|
| `npm test -- tests/invariants/test_icon_credits.py` | 0 | 3 tests, OK (before the fix: 1 failure, the missing title) |
| `npm test -- tests/invariants/test_icon_file_content.py` | 0 | 2 tests, OK |
| `npm test -- tests/view/icons.test.mjs` | 0 | 43 pass |
| `npm test -- tests/sim/data.test.mjs` | 0 | 40 pass |
| `npm test -- tests/view/scene-picture.test.mjs` | 0 | 75 pass |
| `npm test -- tests/sim/discovery.test.mjs` | 0 | 50 pass |
| `python -B -m unittest discover -s tests/invariants -p test_loop2_container_icons.py` | 0 | 1 test, OK (run once more, not in the slice's list) |
| `npm run --silent typecheck` | 0 | clean |
| `npx eslint --max-warnings 0 src/browser/sim/data/creatures.ts src/browser/sim/data/scene.ts src/browser/view/credits.ts` | 0 | clean |
| `npx prettier --check` on the three source files and the two test files `.mjs` | 0 | all formatted |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 | 14 errors, all the known ones (`account-screen.test.mjs`, `map-lines.test.mjs`, `maps-screen.test.mjs`); none in this slice's files |
| ruff format check of `tests/invariants/test_icon_credits.py` | not run | the quality venv `.runs/quality-venv` is absent in this worktree, so the command did not start; the edit is one dict line and comment lines of under 100 characters |

Not run: the full gate (`npm test` with no file argument), per the handoff.

## Walk of the running product (earlier, before the test fix)

I started `npm run local` and opened the login card with Playwright CLI (`https://127.0.0.1:63587` at that start). Unfolding "Autorzy grafiki"
showed the bear's line after the wolf's and before "Mag żywiołów":
`niedźwiedź: „Bear head icon”, Delapouite, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)`, linked to
`https://game-icons.net/1x1/delapouite/bear-head.html`. The built copy `dist/public/icons/bear-head.svg` is byte-identical to the repository
file. Side observation: the login card logs `401` on `/api/account` (no session, expected) and `404` on `/favicon.ico`. The local start was
stopped and the browser session closed. Not checked: the look of the line, the phone layout, Siedziba, the bear's plaque (no map attacks
with the bear yet).

## Concern for Slice 4 (the bear's feet)

- `src/browser/view/scene.tsx:134` places a sprite by its bottom edge, `top: percent(sprite.y - sprite.height, frame.height)`, and
  `scene-picture.ts` gives creature sprites `y: SCENE.groundLine` (136).
- The bear's feet are not on its frame's bottom row in its own sheets: idle lowest figure row 60 of 64, run 60-62, bite 58, death 57-59. So
  in the scene the bear stands about 3 rows (6 screen pixels at 2x) above the ground, and its bite starts 2 rows higher than its idle. No
  shift was made here; Slice 4 decides.

## Own-work check

- Requirement most likely unmet: the bear's credit names the title from its environment fact, and the entry holds the old game's numbers
  with the new field.
- Checks: the icon credits test (after the fix, exit 0) and the section and data tests above. The first run of `test_icon_credits.py`
  before the fix failed on exactly the missing title, as the requirement predicts.
- Mutation thought: a change of the bear's health, strike, name or icon fails the `deepEqual` of `tests/sim/data.test.mjs` and the icon
  tests; a change of its sheets fails `tests/view/scene-picture.test.mjs`.

## Choices (the way rejected, and its cost if wrong)

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Icon prepared as the wolf's (background removed, fill `#f4f4f5`) | keeping the black background; another light colour | one edit and a new copy |
| Field `nameWith` with a doc comment naming the preposition „z” | `nameAfterZ`; a Polish name in code | a rename in Slice 2b, which reads the field |
| The bear's rule: one `always → strike`, as in the old game | a dodge rule the old game does not have | none for this slice |
| `SceneCreatureSheets` comment corrected (it said the feet stand on the bottom row) | leaving it, which would be false for the bear | a misleading comment |
| `TITLES` of the Python test extended only after the fact existed | adding the title before the fact (breaks the rule that titles are the facts' quotations) | none now |
| `TITLES` in `icons.test.mjs` also has the bear's title (same page) | leaving it out, so the JS test would fail on the bear's line | if the fact's wording changes, both tests need the same change |

## Unread material

- `.runs/task-cycles/katalog-map/reports/executor-1-report.md`: read to its 20 000-byte cut, which ends inside "Searches not found or unclear"; its tail not read. Its concerns for this slice were read in full.
- `.runs/task-cycles/katalog-map/task.md`: lines 28-32, 126-131 and 180-184 only; the rest not read.
- `foundations/invariants.md` `icon-credits` and `sprite-credits`: `icon-credits` read only as far as its `Rests on` list; `sprite-credits` not read.
- `foundations/environment_facts.md`: lines 198-203 (wolf title) and 204-207 (bear title, the new fact) read; the rest not read.
- `tests/invariants/test_icon_credits.py`: lines 1-40, 85-130, 232-262 and 323-340 read; the rest not read.
- `tests/invariants/test_icon_file_content.py`: lines 1-80 read; the rest not read.
- `tests/view/icons.test.mjs`: the title table, the creature and section tests read; the item, pack and sprite tests only as far as the grep showed.
- `tests/sim/data.test.mjs`: the wolf test and its neighbours read; the rest not read.
- `src/browser/view/scene-picture.ts`: lines 140-160, 240-330 and 725-760 read; the rest not read.
- `src/browser/view/scene.tsx`: lines 134 and 406-508 only, by grep.
- Read whole: the guidelines the handoff names (`coding.md`, `coding-content-data.md`, `coding-browser-module.md`, `testing.md`, `styleguide-browser-view.md`), `src/browser/AGENTS.md`, `foundations/part_map.md` lines 1-66, `foundations/decisions.md` D-27 and D-271, the method files `SKILL.md`, `slice.md`, `ui_check.md`, `walkthrough.md`, and `.claude/skills/loop2-play/SKILL.md` lines 23-95.
- Not read: the other method files of `task-cycle/change/` (`fix.md`) and `reserved_choices.md`; the case did not come.

## Searches not found or unclear

- A decision on the bear's numbers (120 health, strike 20): none found in `foundations/decisions.md` or the invariants; the numbers come from the old game's entry, as the handoff says.
- `SCENE_CREATURES` readers in `src/browser/view`: only `scene-picture.ts` (lines 152, 248, 733); the scene component reads none directly.
- The ruff check of the Python test: not run (quality venv absent).

## Working copies

- `.runs\executor-2\` (icon copies, title pages, check logs): removed.
- `.playwright-cli\` (browser session logs): removed in the first round.
- `dist\` in the worktree is the product's build output (git-ignored), not a copy of mine.
