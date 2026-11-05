# Report — Slice 1, the picture of the forest frame

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done
- **Commit:** `be3f408` „feat: :sparkles: add the still frame of a forest in snow for the scene, composed from loop's cut Pixel Crawler sprites”; base `cd8ff84`; not pushed.
- **Check result:** nothing failed; the whole gate was not run, as the handoff says.

## Files changed
- `assets/sprites/forest-scene.png` new (11133 bytes, sha256 5b2dffeb10a6d76f948bba8e91dd34f8d55a3f5945cefa9d1c85a17ae00e6198).
- `README.md` +1 −1: the `npm run build` sentence names `assets/sprites/forest-scene.png` beside `login-backdrop.png`, as composed from Pixel Crawler pictures whose terms ask for no mention.

## Recipe
- Script: `.runs/task-cycles/ekran-przejscia/scene/compose_forest.py` (ignored by git), Pillow 12.3.0. Command: `python -B .runs/task-cycles/ekran-przejscia/scene/compose_forest.py assets/sprites/forest-scene.png`.
- Sources: `C:\Storage\repos\loop\public\sprites\`.
- Ground: `ground.png` (32 × 32, opaque) tiled from (0, 0) over 336 × 152, as the old scene does with `background-repeat: repeat`.
- Order: the twelve pieces of `DECOR` (`Scene.tsx:28`) drawn at (x, y − h) with y the ground line, in order of y, ties in array order, as the old scene's z-index does.

| # | file | x | y | note |
|---|---|---|---|---|
| 1 | pine_tall.png | -8 | 74 | clipped at the left edge |
| 2 | tree_snow.png | 34 | 70 | `tree_bare` taken as its snow variant |
| 3 | pine_low.png | 60 | 78 | |
| 4 | pine_tall2.png | 100 | 72 | |
| 5 | sap_snow.png | 140 | 68 | `sap_bare` taken as its snow variant |
| 6 | pine_low2.png | 166 | 76 | |
| 7 | tree_snow.png | 212 | 72 | |
| 8 | pine_tall.png | 246 | 80 | |
| 9 | pine_low.png | 294 | 76 | clipped at the right edge |
| 10 | pine_low.png | 16 | 100 | |
| 11 | pine_low2.png | 108 | 96 | |
| 12 | sap_snow.png | 182 | 104 | `sap_bare` taken as its snow variant |

- No prop, fire, figure or creature drawn.
- Chunks: `IHDR`, `IDAT`, `IEND`; 8-bit RGB, fully opaque, so no `PLTE` or `tRNS`; no text, time, gamma, colour-profile or physical-size chunk.

## Checks
| Check | Command | Exit | Result |
|---|---|---|---|
| chunk types and size | `python -B .runs/task-cycles/ekran-przejscia/scene/read_chunks.py assets/sprites/forest-scene.png` | 0 | 336 × 152, 8-bit RGB, chunks `['IHDR','IDAT','IEND']`, only allowed chunks: True |
| build | `npm run build` | 0 | built |
| byte comparison | `cmp assets/sprites/forest-scene.png dist/public/sprites/forest-scene.png` | 0 | identical |
| script directory ignored | `git check-ignore -v .runs/task-cycles/ekran-przejscia/scene/` | 0 | `.gitignore:1:.runs/` |
| own-work check | `python -B .runs/task-cycles/ekran-przejscia/scene/check_light.py` | 0 | see below |

Viewed enlarged 3× once: pale-blue snow ground with pines, two frosted bare trees and saplings, no text or figure (preview in the executor's scratchpad).

## Own-work check
- Requirement: full light, not darkened (D-315), no figure, fire or prop.
- Check: `check_light.py`. Rows 112–151, where no piece stands, equal the tiled `ground.png` pixel for pixel (0 mismatches); the 1788 opaque pixels of `pine_tall.png` equal the file's pixels at its last placement (0 differ). No darkening or colour change applied.

## Choices
- Snow variants at their own height: the bare tree and sapling of `DECOR` are 47 and 30 px high, their snow variants 46 and 34 px; each placed at its own height with its foot on the same ground line (top = y − 46 or y − 34). Rejected: keeping the bare box height — it would cut the four bottom rows of the sapling's foot and leave an empty row under the tree. Cost if wrong: the first tree and both saplings sit a few pixels differently from a literal reading of the array.
- RGB output: fully opaque, so saved as RGB with no `tRNS`.

## Trust boundary
- `assets/sprites/**`: the file holds pixels alone, as the chunk list shows.
- Build copy: `scripts/static-files.mjs` read, unchanged; it copies only `.png` files directly in `assets/sprites/` into `dist/public/sprites/`.
- `src/browser/sim/saved-game.ts` untouched.

## Reaches beyond the handoff
- `C:\Storage\repos\loop\src\components\probe\Scene.tsx:155-200`, grep for `ground` and `DECOR`: how the old scene draws its ground (tiles `ground.png`, top = y − h, z-index = y).
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` (the user's global rule before any script).
- `README.md` line 25 and `git ls-files --eol README.md` (LF).

## Searches not found or unclear
- The plan does not say what to do about the snow variants' heights differing from the bare ones in `DECOR`; handled as under Choices.
- Otherwise none.
