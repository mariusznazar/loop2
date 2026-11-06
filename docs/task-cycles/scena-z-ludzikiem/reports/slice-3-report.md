# Slice 3 report: what the scene draws, from the data and the game state

**Status:** done with concerns (one observation on the right edge, one choice of the props' lines; see below)

## Commits

- `e7c19c2` feat: :sparkles: add the scene's data and its picture from the map run: the mage's place, sheets, props, campfire, badge and how the scene stands
- `73564b5` test: :white_check_mark: check the scene's picture for each action's place, icon, progress and standing, and that its files stand in assets/sprites/

Branch `task/scena-z-ludzikiem`, on top of `bd7216b`. Worktree clean after the commits. Pinned the-way: `git -C .the-way rev-parse HEAD` = `61c72fb6347649a9bd61a71f0d2695f2e91e8b6a`, equal to the gitlink in `git ls-files --stage -- .the-way`.

## Files changed

| File | Change | Added | Removed |
|---|---|---|---|
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/src/browser/sim/data/scene.ts` | new (data) | 73 | 0 |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/src/browser/view/scene-picture.ts` | new (pure module) | 169 | 0 |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/tests/view/scene-picture.test.mjs` | new (30 cases) | 468 | 0 |

No file of the foundation, guidelines, styleguide or CSS was changed. The handoff's item-14 and item-15 changes (styleguide roles, coding-guidelines tables) are not in this slice's *Change* list and were not made.

## What was built

- `scene.ts` holds the background (`forest-scene.png`, 336 × 152), the ground line 136, the clearing 160 and the right edge 292; the mage's idle and run sheets keyed by `elementalMage` (64 × 64 frames, 4 and 6); the fire sheet (`fire.png`, 32 × 32, 4 frames) with its place and the mage's place at it; and the three props `stick`, `berry`, `moss` with file, size, place and mage place. There is no entry for `fiber`. It imports only type declarations from simulation files.
- `scene-picture.ts` exports `sceneDrawing(state)`, which returns plain data: `standing`, `background`, `mage` (idle and run sheets and a `goal`), `props` (always, each with its `resource`), `fire` (only on the character's tile, with `burning`), and `badge` (icon href and progress). It returns `null` when no map run stands. It has no DOM, no CSS value and no resource, archetype or map identifier.

## Checks

Command and exit code for each run. The handoff's `npm test -- …` form was used throughout.

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `npm test -- tests/view/scene-picture.test.mjs` (before any new file existed) | 1 | Failed at import: `ERR_MODULE_NOT_FOUND` for `dist/browser/sim/data/scene.js`. This is not the expected reason, so I went on to step 2. |
| 2 | Same command, with the data file written and a stub `sceneDrawing` that returns `null` | 1 | 26 failed, 4 passed. The passes are the no-run `null` case, the container case and two data checks, all satisfied by the stub or by the data alone. The 26 failures are assertion failures, the expected reason. |
| 3 | Same command, with the real module | 0 | 30 of 30 pass. |
| 4 | Invariant mutation: `sed` changed `sticks.png` to `nope.png` in `scene.ts`, then the same test | 1 | 2 failed, including the marked case: `AssertionError: nope.png is not in assets/sprites/`. The file was restored from a copy. |
| 5 | Same command after the restore | 0 | 30 of 30 pass. |
| 6 | `npm test -- tests/invariants/test_content_identifiers.py` | 0 | 4 tests OK. |
| 7 | `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | 5 tests OK. |
| 8 | `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK. The first run was exit 1 on `no-unused-vars` for an unused `advanceMinutes` import in my test; I removed it and reran. |
| 9 | `npm run typecheck` (touched code) | 0 | `node scripts/build.mjs --check`, passed. |
| 10 | `npm test -- tests/invariants/test_browser_view_token_values.py` (touched code) | 0 | OK. |
| 11 | `npm test -- tests/invariants/test_browser_view_framework.py` (touched code) | 0 | OK. |
| 12 | `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --check` on the three files | 0 | All formatted (I ran `--write` first on the two new TS/test files; it changed only layout). |
| 13 | `node_modules/.bin/eslint --max-warnings 0` on the two TS files | 0 | Clean. |

**Not run:**
- `npm test` with no arguments (the full gate). The handoff says the orchestrator runs it.
- `python -B .the-way/elements/common/foundation_check.py` (the foundation check). It was not in the handoff's checks, and this slice changes no foundation file. The one command runs it, so the orchestrator's gate covers it.
- `tests/invariants/test_loop2_container_sprites.py`, the Python test of the container. It needs Docker and was not in the handoff's checks. The marked case in my test checks only that each file the data names is a `.png` directly in `assets/sprites/`, which is what the handoff asked.
- Mutation testing with Stryker. The testing guidelines do not adopt it for browser-view.

## Own-work check (section 3)

- **Requirement:** every place the mage stands at keeps the mage's figure inside the 336 × 152 frame, so the scene shows the mage whole. The right-edge place is the most likely to break it. **Check:** arithmetic from the figure boxes in `slice-1-report.md`, idle (20, 32, 45, 64) and run (19, 29, 45, 64), where the right bound is exclusive, so the last figure column is 44. Placed at `rightEdgeX` 292, that column is 336. The frame's last column is 335. **Result:** the figure's right-most column falls one column outside the frame, for both sheets. This is an observation, not a test failure, and I did not change it. See *Problems observed*.
- **Requirement:** the scene's data names only files that stand in `assets/sprites/`. **Check:** test case 4 and the marked case, by a broken name. **Result:** met, and the broken name failed.

## Choices made

1. **Place semantics.** A place is the left edge (`x`) and the line the picture stands on, its bottom edge (`y`). The mage's place is its frame's left edge with its feet on `groundLine`. I took this from the old Loop's `Sprite` (`left: x`, `top: y - h`, in `sprites.tsx`) and `Scene.tsx`, where the mage sits at `translateX(x)` with `Sprite x={0} y={GROUND}`. *Rejected:* the centre of the picture. Cost if wrong: every place shifts by half the frame, 32 px, for the 64 px mage, so the mage would stand beside the prop rather than at it.
2. **The props' and fire's `y` lines.** The handoff gives the props' and fire's `x` only, and the ground line 136. I used the old Loop's own bottom lines: moss 128, sticks 132, berry bush 122, fire 132 (`Scene.tsx` lines 44–58 and the fire `FIRE`). *Rejected:* all props on the ground line 136. Cost: if the orchestrator wants one line, the change is three numbers in `scene.ts`; the layout reads as the old scene's depth order, and I did not check it against the old scene by eye.
3. **`stays` is its own value.** `MageGoal` is `{ kind: "stays" } | { kind: "at", place }`, so the view can keep its previous reading (Slice 5) and does not confuse it with the clearing.
4. **Standing order.** Death, then completion, then discovery (held in `state.discovery`), then the player's pause, then going. *Rejected:* a pause winning over a death. Cost: a player cannot see a grey scene after a death, which the handoff's To do 9 forbids anyway.
5. **Badge.** Shown while the action runs, at a pause and at a stop at a discovery. Hidden when waiting, in combat (no current activity), after a death and after a completion. Progress = (`minute` − `startMinute` + `realMsCarry`/1000) / length, clamped to [0, 1]. The clamp is not tested, because the state's own rules keep the fraction within [0, 1].
6. **Errors.** A character of the map run not in the team throws. *Rejected:* a default archetype, which would hide a broken state. The data's character-team invariant covers this case.
7. **Fire.** The module gives `burning` only. Extinguished and burning have the same `href`, so the view can grey it with no change of picture, as D-316 asks.
8. **Scene data holds no CSS.** The grey values (`grayscale(1) brightness(0.5)` and `…0.55`) are for the view and its styles, not the module; the module gives `standing` only.

## Problems observed

- **Right edge.** The mage at `rightEdgeX` 292 has its figure's right-most column at 336, one column past the frame's last column 335, in both the idle and run sheets (see the own-work check). The background fits, the mage does not. I left the handoff's 292. Decision for the orchestrator: move `rightEdgeX` to 291 (the figure then ends at column 335, inside the frame), or keep 292 and accept the one column clipped by the scene's `overflow`. I have not measured the pixels; the figure boxes are the ones slice 1 measured.
- **The props' lines.** See choice 2. The handoff did not name them, so I took the old scene's values.
- **Four passes on the stub.** The no-run `null` case and three data checks passed before the real module existed; this is expected for those checks, and the marked case was then shown to fail under a broken name (check 4).

## Searches not found or unclear

- The handoff's *Passages* name no `y` for the props or the fire. Unclear, see choice 2.
- The handoff's *Code* list did not name `Action` in `types.ts`, which is at line 46, outside the 150–284 range. I read it to know the action kinds, which are `explore`, `wander`, `walkTo`, `walkToCampfire`, `gather`, `patrol`, `craftCampfire`, `lightCampfire`, `lightItem`, `feedCampfire`, `eat`, `strikeWithStick`, `kick` and `dodge`. Only `walkTo`, `gather` and `patrol` carry a `resource`.
- I looked for the `// invariant: <id>` marker in `.mjs` tests and found it in `tests/account-api.test.mjs`, so I used the same form for the marked case.
- Not found: a reserved choice that the slice needs. `project-level/technology/reserved_choices.md` was not read, because the slice needs no language, framework, library, store or login method beyond what the foundation settles.
- `ui_check.md` was not read: the slice adds a data file and a pure module, not a screen, so the handoff's condition was not met.

## Reaches beyond the handoff

- `C:/Storage/The Brain/The Brain/.ai/rules/git.md`, read before the commits, because the vault's own rule requires it before a commit.
- Old Loop `C:/Storage/repos/loop/src/components/probe/Scene.tsx` lines 30–260 and `sprites.tsx` `Sprite`. The handoff named lines 44–58; I read the rest to learn what `x` and `y` mean (left edge and bottom line) and how the mage is placed.
- `src/browser/sim/types.ts` lines 46–66 (the `Action` type) and `src/browser/sim/hex.ts` (`sameHex`), for the action kinds and the campfire's tile.
- `foundations/glossary.md` (map run, extinguished campfire, archetype, completion), `foundations/decisions.md` D-18, D-212, the decisions named by the handoff, and `foundations/part_map.md` browser-view and simulation, to check where the new files sit and what they may import.
- `tests/invariants/test_content_identifiers.py` and `test_simulation_isolation.py` (their scan rules), `tests/quality/test_quality_invariants.py` (the lint scope), `tests/invariants/test_browser_view_token_values.py` (its scan rules), and the head of `tests/invariants/test_loop2_container_sprites.py` (the marker's meaning).
- `tests/sim/program-fixture.mjs` and `tests/sim/understanding-fixture.mjs`, the fixtures the terrain test uses.
- The commands in checks 9–13, which are checks of touched code beyond the handoff's four.

## Personal data

None involved. No secret or personal data is in this report.
