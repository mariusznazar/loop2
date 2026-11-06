# Slice 1 report: the scene's sprite files

**Status:** done with concerns (three observations below; none blocks the slice)

## Commits

- `873f9f9` feat: :sparkles: add the scene's sprite files, the pack's mage in one frame size and its fire and props unchanged, each holding pixels alone
- `d3a04f3` docs: :memo: name the scene's new Pixel Crawler pictures in the README next to the login backdrop and the forest

Worktree is clean after the commits. Branch `task/scena-z-ludzikiem`, pinned the-way `61c72fb` (`git -C .the-way rev-parse HEAD` matched).

## Files changed

| File | Change | Bytes | Frames | Chunks |
|---|---|---|---|---|
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/assets/sprites/mage-idle.png` | new | 1564 | 4 of 64 × 64 (sheet 256 × 64) | IHDR, IDAT, IEND |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/assets/sprites/mage-run.png` | new | 2294 | 6 of 64 × 64 (sheet 384 × 64) | IHDR, IDAT, IEND |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/assets/sprites/fire.png` | new, byte copy | 1056 | 4 of 32 × 32 (sheet 128 × 32) | IHDR, IDAT, IEND |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/assets/sprites/sticks.png` | new, byte copy | 306 | 1 (22 × 13) | IHDR, IDAT, IEND |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/assets/sprites/berry-bush.png` | new, byte copy of old `bush.png` | 654 | 1 (29 × 27) | IHDR, IDAT, IEND |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/assets/sprites/moss.png` | new, byte copy | 203 | 1 (12 × 9) | IHDR, IDAT, IEND |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/README.md` | 1 line changed (+1 −1) | — | — | — |

The PNG files are binary, so git reports 0 insertions and 0 deletions for them.

## Sources (all under `C:/Storage/repos/loop/assets/pixel-crawler/`)

- **mage-idle.png:** `Entities/Npc's/Wizzard/Idle/Idle-Sheet.png` (128 × 32, four frames of 32 × 32). Each frame is placed in a 64 × 64 frame at offset (16, 32): horizontally centred and bottom-aligned. No flip.
- **mage-run.png:** `Entities/Npc's/Wizzard/Run/Run-Sheet.png` (384 × 64, six frames of 64 × 64). Placed at offset (0, 0), which is already centred and bottom-aligned.
- **fire.png:** traced to `Environment/Structures/Stations/Bonfire/Bonfire_02-Sheet.png`, not by an exact whole-picture match but by frames. Old `fire.png` frames 1–3 match Bonfire_02 frames exactly, and `check_fire_shift.py` confirms `fire[x+1] = Bonfire_02[x]` for all 4064 checked pixels with zero mismatches. Bonfire_02 column 127 is transparent, so no pixel is lost. The file is the old Loop's cut, copied unchanged.
- **sticks.png:** exact whole-picture match in `Environment/Props/Static/Resources.png` at (20, 97).
- **berry-bush.png:** exact whole-picture match in `Environment/Props/Static/Vegetation.png` at (98, 5). Copied from the old Loop's `bush.png`.
- **moss.png:** exact whole-picture match in `Environment/Props/Static/Vegetation.png` at (82, 279).

No picture was left out. All six trace to Pixel Crawler.

## Script and commands

- One-off cut script: `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/docs/task-cycles/scena-z-ludzikiem/sprites/build_sprites.py`, run as `python -I docs/task-cycles/scena-z-ludzikiem/sprites/build_sprites.py` from the worktree root (exit 0). It copies the four props with a SHA-256 check and writes the two mage files. It refuses to overwrite an existing file. Pillow 12.3.0 ran from the system Python 3.14.3; I installed nothing.
- Helper scripts in the same ignored directory: `inspect_chunks.py`, `find_source.py`, `find_frames.py`, `compare_same.py`, `analyze_mage.py`, `check_fire_shift.py`, `check_outputs.py`, `montage.py`.

## Checks

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `python -I docs/task-cycles/scena-z-ludzikiem/sprites/inspect_chunks.py assets/sprites/*.png` | 0 | Every new file holds IHDR, IDAT and IEND only. Mage sizes are 256 × 64 and 384 × 64. |
| 2 | `python -I docs/task-cycles/scena-z-ludzikiem/sprites/build_sprites.py` | 0 | Copied 4 props; wrote 2 mage files. |
| 3 | `npm run build` | 0 | Build succeeded; `dist/public/sprites/` holds the six new files and the two existing ones. |
| 4 | `git diff --no-index --stat assets/sprites dist/public/sprites` | 0 | Empty output; every file identical. |
| 5 | `python -B -m pytest -q tests/invariants/test_application_build_output.py` | 0 | 7 passed. This test covers the touched build output. |
| 6 | `python -I docs/task-cycles/scena-z-ludzikiem/sprites/check_fire_shift.py` | 0 | 4064 checked, 0 mismatches. |
| 7 | `python -I docs/task-cycles/scena-z-ludzikiem/sprites/check_outputs.py` | 0 | Placement numbers below. |

Not run: `npm test` (the handoff says the gate is the orchestrator's). The foundation check was not run either; this slice changes no foundation file.

No test was written. The change is assets and prose, so test-first does not apply. No invariant test was changed.

## Own-work check (section 3)

- **Requirement:** the mage frames share one 64 × 64 frame, and the figure sits at the bottom and centred, so it does not jump between idle and run. **Check:** `check_outputs.py`. **Result:** idle union figure box (20, 32, 45, 64), centre x 32.5, bottom 64. Run union figure box (19, 29, 45, 64), centre x 32.0, bottom 64. Every frame's bottom is row 63.
- **Requirement:** each file holds pixels only, and the props are unchanged. **Check:** check 1 and check 4. **Result:** met.

## Choices made

- **Mage alignment.** I placed each idle frame at the frame centre horizontally and at the bottom vertically, rather than centring each frame's figure bounding box. Per-frame figure centring would move the feet with the pack's own sway and make the scene jitter. The cost is a half-pixel difference: idle centres at 32.5 and run at 32.0. A 25-pixel-wide figure cannot sit exactly on the 64-pixel centre. Offset 15 would give 31.5, an equal distance, so the choice is arbitrary.
- **Props.** I copied the four old Loop files byte for byte, as the handoff asks, rather than cutting them again from the pack. The traced sources are listed above.

## Observations for the orchestrator

1. **Berry bush name.** `berry-bush.png` is the pack's `Vegetation.png` bush at (98, 5). In my view at 4× it looks like a round olive-gold bush and I see no berries. The name comes from the handoff. Check whether the name or the picture should change.
2. **Idle head at the top edge.** Idle frame 0 has pixels on row 0 of its 32 × 32 frame, so the pack's own frame may clip the head. I did not change the pixels. The view at 3× shows the hat complete.
3. **Half-pixel offset.** See the mage alignment choice above.

## Searches not found or unclear

- Whole-picture search of `fire.png` across the pack found no match, and a pixel comparison with the Bonfire_01 to Bonfire_08 sheets found none either. The match was only found frame by frame, with a one-pixel horizontal shift. Unclear: whether the old Loop cut it on purpose.
- Searched the whole pack for `sticks.png`, `bush.png` and `moss.png`: exact whole-picture matches found, as listed above.
- Nothing else was searched for or left unclear.

## Reaches beyond the handoff

- Read `C:/Storage/The Brain/The Brain/.ai/rules/git.md` before the commits. My own instructions require it; the handoff did not name it.
- Read `guidelines/styleguide-browser-view.md` whole, as the handoff's guideline list asks. It has no sprite rule relevant to this slice, and the slice changes no user interface.
- Read `.the-way/task-cycle/change/SKILL.md` and `slice.md` as the method names.
- Ran `tests/invariants/test_application_build_output.py`, a test of the touched build output that the handoff did not name.
- Read the README build sentence, the foundation entries and `scripts/static-files.mjs` as the handoff lists.
- Read the foundation entries D-271, D-273, D-314, D-315, the invariant `sprite-file-content` and the browser-view part of `foundations/part_map.md` at the ranges the handoff gives. I did not open `task.frozen.md`; I worked from the passages the handoff copies in.
