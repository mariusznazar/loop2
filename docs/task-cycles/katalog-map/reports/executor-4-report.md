done with concerns

# Report - executor of Slice 4, task `katalog-map`

Branch `task/katalog-map`, base `e0342c5d`, one commit: **`ce585649`** (fix: lower the bear in the scene by 4 rows so that
its feet stand on the ground line, the rows given for each creature in `SCENE_FIGHT`). Nothing pushed to the product
repository. The full gate was not run. One push to the screenshots repository (below). This report replaces the earlier one
(status `questions`), whose question the coordinator answered with yes.

"Concerns": (1) one file beyond the slice's *Change* was touched, `tests/view/scene.test.mjs` (reason below); (2) the bear's
sheets, as the pack draws them, do not keep their feet on one row, so a residual of 2 rows remains while it bites; (3)
`guidelines/styleguide-browser-view.md` was read in the parts that touch this change, not whole.

## What changed

| File | Added / removed | What |
|---|---|---|
| `src/browser/sim/data/scene.ts` | +10 / -2 | `SCENE_FIGHT.sink: { wolf: 0, bear: 4 }`, typed `Record<CreatureId, number>` by a `satisfies` on the whole constant; doc comment says what it is |
| `src/browser/view/scene-picture.ts` | +9 / -2 | `SceneCreature.sink` (read from `SCENE_FIGHT.sink[creature.id]` in `drawnCreature`); the two effects of a combat's end (`creatureDown`, `creatureOut`) stand on `SCENE.groundLine + SCENE_FIGHT.sink[...]` |
| `src/browser/view/scene.tsx` | +1 / -1 | `Creature` places its box on `SCENE.groundLine + creature.sink` |
| `tests/view/scene-picture.test.mjs` | +74 | three cases (below) |
| `tests/view/scene.test.mjs` | +28 | one case (below) |

Why `SCENE_FIGHT` and not a field in `SCENE_CREATURES`: a first form with `sink` inside each creature's entry made the existing
test "the wolf's files hold pixels alone" fail (exit 1), since it walks the values of the wolf's entry as pictures; the number
lies with the other numbers of how a creature stands at the mage.

### How the 4 was measured (the sheets' own rows, in pixels of the scene's picture)

`node .claude/skills/loop2-scene-art/sheet-frames.mjs measure` gives each frame's box `y T-B` (bottom exclusive) of its frame
of 64 rows: bear idle 60; run 62, 61, 61, 60, 60; bite 58, 58, 58; death 59, 59, 57, 57. The wolf's sheets all end at 32 of 32
and the mage's at 64 of 64. The standing bear (idle, frame 0; the state seen longest, after a death) therefore stops 64 - 60 = 4
rows short of its frame's bottom edge, so lowering the frame by 4 brings its feet to the ground line. Checked in the running
game: the bottom of `.scene-creature` less the bottom of `.scene-mage` read from the page is 8.0 px at 1280 (4 rows at twice
the size) and 4.0 px at 360 (4 rows at once) for the bear, and 0 for the wolf; and the standing bear's paws stand on the line of
the lying mage's body in the screenshot. A new test holds the number to the pixels (below).

The other sheets differ: lowered by 4, bite stands 2 rows above the line (4 screen px at 1280), death 1 to 3 rows above (the
lying bear lay on the line in the frames I saw), run in and run off 0 to 2 rows below. The pack's rows are not made equal (D-271:
pixels unchanged), and the styleguide's sentence that the wolf's "bieg, gryzienie i śmierć nie podskakują" does not hold for
the bear: the bear, at its bite, stands 2 rows higher than at its idle. A sink per sheet needs a box per sheet in `Creature`
(its three sheets share one box); not done, named as concern 2.

## Tests added, and the break each catches

`tests/view/scene-picture.test.mjs`:
1. "each creature is lowered by the rows its standing figure stops short of the bottom of its frame": reads the lowest opaque
   row of each creature's idle sheet from the PNG and requires `SCENE_FIGHT.sink[id]` to equal `frame height - that row`; and
   the literal `{ wolf: 0, bear: 4 }`. Catches a wrong number and a sheet of the pack changed under the number.
2. "the drawing of the creature in the scene carries the rows it is lowered by, the bear's 4 and the wolf's none": the drawing of
   a fight with the bear has `sink` 4 and its bite sheet `/sprites/bear-bite.png`, the wolf's 0. Catches `drawnCreature` not
   passing the number on.
3. "the bear that falls or runs off stands on the ground line lowered by its rows, the wolf on the line": the death and the
   run-off effects of the bear stand on y 140 (136 + 4), the wolf's on 136 (the literals are written out). Catches either effect
   placed on the frame's bottom edge.

`tests/view/scene.test.mjs` (beyond the slice's *Change* list; named because without it the line in `scene.tsx` is unprotected:
`scene-picture.test.mjs` does not mount the component): "in the minutes of a combat the bear's frame is lowered by its rows below
the ground line": the bear's box stands from 191 across and 76 down (136 + 4 - 64) as percentages of the frame, 64 x 64. The
wolf's existing case (104 down, unchanged) guards the wolf's box.

Mutations, each seen failing with the code restored after (the command of the file, exit 1 each): `scene.tsx` reading no sink
(`scene.test.mjs`: the bear's box case failed); the two effects reading none (`scene-picture.test.mjs`: case 3 failed); the
bear's number 5 (cases 1, 2 and 3 failed); `drawnCreature` carrying 0 (case 2 failed). No decision line (`decision:`) was added:
no sentence of D-316 or D-271 says on which row a creature's feet stand.

## Checks (commands and exit codes), all at `ce585649`

| Command | Exit | Result |
|---|---|---|
| `node .claude/skills/loop2-scene-art/sheet-frames.mjs measure assets/sprites/mage-idle.png#64 assets/sprites/wolf-idle.png#64 assets/sprites/bear-idle.png#64` | 0 | mage 25 x 32 (y 32-64), wolf 63 x 31 (y 1-32), bear 59 x 51 (y 9-60) |
| `npm test -- tests/view/scene-picture.test.mjs` | 0 | 78 tests, 78 pass |
| `npm test -- tests/view/scene.test.mjs` | 0 | 75 tests, 75 pass |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | 5 tests, OK |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 | 2 tests, OK |
| `npm run --silent typecheck` | 0 | clean |
| `npx eslint --max-warnings 0` on the 3 source and 2 test files | 0 | clean |
| `npx prettier --check` on the same | 0 | all formatted |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (after `git add`) | 1 | 14 errors, the known ones (`maps-screen`, `map-lines`, `account-screen` tests; Slices 8 and 9); none of this slice |
| the full gate (`npm test` with no file) | not run | the orchestrator's |

Before the code (the failing run): the new tests were written after the code of the prototype was applied; each was then seen
failing under a mutation, above, with the command and exit 1. No test of the slice listed as failing at the base was run.

## Browser check after the final code (`loop2-play`, "Check the phone layout")

Final code built (`npm run local`), game state composed (the compose script of `loop2-play` with the four earlier maps added
to `solvedMaps`, copy `reports/executor-4-probes/compose-lair.mjs`), entered through Mapy at "Las — matecznik". Chromium of
Playwright CLI 0.1.22, Windows 11, the page area 1280 x 720 without touch and 360 x 740 with touch.

**Temporary edits for the running game, none committed, all reverted before the commit's final state was checked** (`git status`
clean): the lair's, and for the wolf run Las — głębiej's, ambient temperature 7 to 37 (a character with no program and no fire
freezes at about minute 320, before the bear's chance-based attack may come); for the wolf run the attack made frequent
(cooldown 10, chance 0.5). The outcomes "bear defeated" and "bear departs" cannot be reached by play (the character has at
most 14 damage a blow and dies in five blows of 20; the lair is unsolvable by design), so they were seen earlier with a changed
bear (rule "dodge", health 100, a kick program), frames in `reports/executor-4-probes/seq-defeated.log` and `seq-departed.log`,
with the first form of the same patch (the same number, read from another constant).

| Case | Where | Verdict |
|---|---|---|
| Bear at the discovery pause "Odkryto: Niedźwiedź.", plaque over the mage | 1280, final code, minute 211 | bear and mage as in the screenshot; the plaque touches neither; `.scene-creature` bottom less `.scene-mage` bottom = 8.0 px |
| Scuffle with the cloud, 1x | 1280, final code | the bear's bite frames, the cloud between the mage and the bear on the ground; the bear's paws 4 px above the line in the bite frame (the pack's rows); no overlap with the mage's figure |
| Mage dead, bear standing beside it | 1280 and 360, final code | the standing bear's paws on the line of the lying mage; 8.0 px (1280) and 4.0 px (360) below the mage's box bottom, as 4 rows |
| Wolf beside the mage, scale | 1280, final code, Las — głębiej | wolf on the line, box bottom level with the mage's (0 px); unchanged |
| Bear defeated, bear departs | 1280, first form of the patch | falls in four frames and lies on the line; runs off to the right over the berry bush (drawn over props) and out; seen, not re-seen with the final form (the effects' y is held by test case 3) |
| Phone measurement (`loop2-play`) on the bear and dead mage, 360 x 740 | final code | `scrollsToTheSide` false; `contentWiderThanItsBox`: `div.world-area` 330 > 318 and `div.scene-sheet` 384 > 64; `outsideTheWindow`: one `img` 156..540 (a clipped strip of a sheet); `controlsSmallerThan48` empty. The same three lines appear with the wolf on the earlier build: not caused by the bear; the 336-px scene is wider than the 318-px box of `.world-area`, in existing code, outside the slice, named for the orchestrator |

What I did not check: the run-in animation (300 ms) in a captured frame; the bear on the left of the mage (the right-edge
place); contrast check 2 of `loop2-scene-art` (the dust is the existing picture, no new colour); the attack at exactly 180 quiet
minutes (it is a 1% chance a minute after minute 180: it came at minutes 188, 211, 224 and 230 in four runs).

Layers (check 3): bottom to top in `scene.tsx` the background, props, creature, mage, cloud, tint; the mage covers the bear where
they meet (they do not: the gap of 2 px holds even in the bite swipe), the cloud covers both, no prop covers the bear, the
plaque of the discovery covers nothing of either.

## Screenshots (D-418, D-419)

Pushed with the owner's `gh` account (`mariusznazar`, signed in) to `mariusznazar/screenshots`, branch `loop2/katalog-map`. First
push, commit `5f2daa83d3248613afec1f5c28f2a7ec3f4207e1` (images from the first form of the patch, the same pixels); **second push,
the final code, commit `b641f02397e5498efe67e27bf3022d2c82c9aac1`**. I looked at each image before each push: no address, account
name or token; the account menu is closed; the screens show the character "Agent" only. Links, from the second commit:

- Bear beside the mage at the discovery, 1280, plaque: `https://github.com/mariusznazar/screenshots/blob/b641f02397e5498efe67e27bf3022d2c82c9aac1/loop2/katalog-map/bear-beside-mage-1280.png?raw=true`
- Bear in the scuffle, 1280: `https://github.com/mariusznazar/screenshots/blob/b641f02397e5498efe67e27bf3022d2c82c9aac1/loop2/katalog-map/bear-scuffle-1280.png?raw=true`
- Wolf beside the mage, 1280, Las — głębiej: `https://github.com/mariusznazar/screenshots/blob/b641f02397e5498efe67e27bf3022d2c82c9aac1/loop2/katalog-map/wolf-beside-mage-1280.png?raw=true`
- Bear beside the dead mage, 360: `https://github.com/mariusznazar/screenshots/blob/b641f02397e5498efe67e27bf3022d2c82c9aac1/loop2/katalog-map/bear-beside-dead-mage-360.png?raw=true`
- The three standing frames on the line, with the numbers of the first check (unchanged by the code): `https://github.com/mariusznazar/screenshots/blob/b641f02397e5498efe67e27bf3022d2c82c9aac1/loop2/katalog-map/mage-wolf-bear-scale.png?raw=true`
- The base before the change, bear 14 px above the mage's line: `https://github.com/mariusznazar/screenshots/blob/b641f02397e5498efe67e27bf3022d2c82c9aac1/loop2/katalog-map/bear-beside-mage-1280-before-shift.png?raw=true`

Numbers of the first check (frame 0, pixels of the scene's picture; the screen shows twice as much at 1280): mage 25 x 32, wolf
63 x 31 (height 0.97, width 2.52 times the mage's), bear 59 x 51 (height 1.59, width 2.36 times). The human judges the scale (D-415).

## Own-work check

- Requirement most likely unmet: "the bear stands right in the scene: its feet on the ground line, clear of the mage's figure, the
  cloud and the plaque" (task To do 3 and 8; the slice's Goal).
- Check: the page's own boxes (`getBoundingClientRect` of `.scene-creature` and `.scene-mage`), the sheets' rows by the measure
  script, the screenshots of the final build in both layouts, the test that reads the idle sheet's pixels, four mutations.
- Showed: the standing bear's feet on the line; clearance held; the remaining residual is the pack's own (bite 2 rows up), concern 2.
  The "before" screenshot shows the fault the change corrects.

## Walk of the running product (`walkthrough.md`)

The change alters what the scene shows (the bear's height on the ground, the effects of its fall and run-off). Cases and verdicts:
the table above ("Browser check after the final code"). Where: Chromium, Windows 11, the local start's HTTPS address; data of the
local runs temporarily changed as stated. What fell wrong: the bear's feet above the line, corrected by this change, with tests.
Not checked: listed above. Errors outside the task's scope: the `.world-area` 330 > 318 and `.scene-sheet` 384 > 64 lines of the
phone measurement (existing, same with the wolf).

## Reach beyond the dispatch

- The dispatch named `guidelines/coding.md`, `coding-browser-module.md`, `testing.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md`:
  read whole except the styleguide (see Unread material).
- `tests/view/scene.test.mjs` lines 90-115 and 2423-2535 and `scene-picture.test.mjs` 1400-1700 and its head (the helpers `decodePng`, `withRun`, `sent`): to write the cases.
- The first return's reach (scene-picture.ts, scene.tsx, `maps.ts`, `creatures.ts`, `balance.ts`, `run.ts`, `combat.ts`, `skills.ts`, `saved-game.ts` head, `compose-state.mjs`) stays as stated there.

## Working copies

- `.runs\executor-4\` (state files, scripts, local-start log): removed; kept in `.runs\task-cycles\katalog-map\reports\executor-4-probes\`: `compose-lair.mjs`, `setup2.sh`, `seq-departed.log`, `seq-defeated.log`.
- `.runs\screenshots\` (clone of the screenshots repository, twice): removed after each push.
- `.playwright-cli\`: removed. The mutation backups `.runs/mut/`: removed.
- The local start stopped (`npm run local:stop`), Playwright sessions closed, `dist/` rebuilt from the committed tree.
- Left on purpose: `.runs\task-cycles\katalog-map\reports\executor-4-sink-prototype.patch` (the first form of the patch, superseded by commit `ce585649`; the coordinator may delete it).

## Unread material

- `guidelines/styleguide-browser-view.md` (1507 lines): read lines 345-400 (a fault is fixed in its component; a stylesheet for each screen),
  481-653 (two layouts, nothing scrolls to the side, touch, a change is checked in both layouts) and 1072-1273 (the scene of a map run).
  Not read: lines 1-344 (roles, backgrounds, tokens, focus, contrast, states of shared controls), 400-480, 654-1071 (main button
  ... program editor), 1274-1507 (picture band, chronicle, end window, list of accounts, examples). The change adds no style, token, colour,
  control or text; the whole file is about 100 000 tokens, which does not fit beside the other required reading.
- `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-content-data.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`: read whole.
- Foundation entries D-316, D-271, D-349, D-415, D-418, D-419, `foundations/part_map.md`, `task.md`: not read (the styleguide section for the scene
  quotes D-316's content; the screenshots' place is in `loop2-play`).
- `.claude/skills/loop2-balance/SKILL.md` was opened by a mistaken command in the first round; no content used.

## Searches not found or unclear

- A decision sentence about the row a creature's feet stand on: none found (D-316 and the styleguide say the wolf's paws are on the bottom row of each frame, which the bear's sheets do not satisfy; the new number, not a decision, carries it). No `decision:` line was written.
- The slice's *Change* does not list `tests/view/scene.test.mjs`; the case that holds `scene.tsx` stands there because the component is mounted only in that file.
- "First attack after 180 quiet minutes": a chance of 1% a minute after minute 180, so the attack came at minutes 188, 211, 224, 230.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| `SCENE_FIGHT.sink` keyed by creature, 4 for the bear | `sink` in each creature's `SCENE_CREATURES` entry (broke the wolf's pixel test); a sink per sheet (needs a box per sheet in `Creature`); 5 (puts the standing bear 1 row into the ground) | one number; the bite's 2-row residual stays |
| A case in `tests/view/scene.test.mjs` for `scene.tsx` | leaving the `scene.tsx` line unprotected | one more file in the diff |
| The sink test reads the idle sheet's pixels | a bare literal (would not follow a changed sheet) | none |
