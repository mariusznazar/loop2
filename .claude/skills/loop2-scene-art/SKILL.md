---
name: loop2-scene-art
description: Ready scripts and an order of steps for the pictures of the game's scene - frames cut from a pack's sheet, recoloured, reworked as text or taken from a new pack - with three checks of a new picture or effect (scale, colour against the prop, what covers it) and a measure of flashes. Use in a task that adds or changes a picture or an effect of the scene.
---

# loop2-scene-art

Scripts and an order of steps for a task that adds or changes a picture or an effect of the scene:
the scene of a map run, the camp at the top of Siedziba, the picture behind the login card. The
scripts read and write PNG with Node.js alone, so there is nothing to install. Run every command
below in the repository's root.

The rules stay where they are, and this skill does not repeat them; read them before the steps:
D-271 (where the pictures come from, and that the colour of an effect stands out from the ground it
stands on), D-317 (how long effects last, and that the scene shows no flash of its whole area), D-349
(the scene is 672 × 304 px, twice its picture of 336 × 152), D-415 (the human judges the colour of
an effect against its prop and whether another element covers it, and no threshold decides) and the
section "The scene of a map run" of `guidelines/styleguide-browser-view.md`.

The options of a script stand in the comment at its head. A file that is no sound PNG (or, for the
frames of `loop2-play` that `flashes.mjs` and `contrast.mjs` read, no baseline JPEG) ends a script with `error: <file>: <what is wrong>` and
exit code 1, and no output file is written. Working files, cuts, previews and grids go under `.runs/`,
which git ignores; a picture reaches `assets/sprites/` only as a PNG with pixels alone, which the
scripts write. A preview shown to the human goes as a screenshot, as `loop2-play` gives it.

## The order of steps

A task goes through as many steps as its picture needs; most stop at the second.

1. **The picture from the pack.** The pack's sheet is outside the repository, in the pack's own
   download. Look at a piece of it, and write down where the frames are: the pixel of the first
   frame's top left corner, the size of a frame and their number.

   ```sh
   node .claude/skills/loop2-scene-art/preview.mjs --scene <sheet.png> --crop <x>,<y>,<w>,<h> --scale 4 --out .runs/<name>/look.png
   ```

2. **The frames moved unchanged.** The cut takes every pixel of the strip as the sheet holds it, and
   reads the file it wrote back and compares it with the sheet, pixel by pixel:

   ```sh
   node .claude/skills/loop2-scene-art/sheet-frames.mjs cut <sheet.png> --at <x>,<y> --frame <w>x<h> --count <n> --out assets/sprites/<name>.png
   ```

   It ends with `differing pixels: 0 of …`; any other number is exit code 1 and the first pixels that
   differ. `compare` runs the same comparison on a file that is already there, which is how to check
   a file somebody else cut.

3. **The colours changed.** `recolor.mjs` writes only colours that a pixel of a named picture holds,
   so no new colour comes in; name the pictures the colours may come from, those of the scene and of
   the packs, with `--palette`, and limit the change to a rectangle with `--region`.

   ```sh
   node .claude/skills/loop2-scene-art/recolor.mjs <in.png> <out.png> --map #aaaaaa=#5a3d23 --palette assets/sprites/forest-scene.png --palette assets/sprites/sticks.png
   ```

4. **A frame reworked as text.** A frame becomes one letter to a pixel, a few pixels are changed by
   hand in the text, and the text becomes a PNG again, with the faults it has named. The warnings
   (a pixel with no neighbour, a figure that does not reach the last row, a size that differs from
   the reference) leave the file written and are for you to weigh.

   ```sh
   node .claude/skills/loop2-scene-art/grid.mjs to-grid <sheet.png> .runs/<name>/frame.txt --at <x>,<y> --size <w>x<h> --trim
   node .claude/skills/loop2-scene-art/grid.mjs to-png .runs/<name>/frame.txt <out.png> --reference <the grid before the edit>
   ```

5. **A new pack.** D-271 names the packs the pictures of the game come from, and a picture of another
   pack is a violation of it, so the change that brings a pack in also writes, each through its
   project skill of the-way:
   - the change of D-271 that names the pack and what its pictures are for (`the-way-record-decision`);
   - the fact of the pack's licence in `foundations/environment_facts.md`: the author, the licence and
     the passage of its page, quoted, with the date it was read, as `lpc-wolf-licence` is
     (`the-way-record-environment-fact`);
   - where the licence asks for a credit, a line in the game's credits, `PACK_CREDITS` in
     `src/browser/view/credits.ts`, that names what the pack is for, its title, author, page with a
     link, licence with a link and how the files of the game differ from the source; the invariant
     `sprite-credits` asks for it and then rests on the fact of that licence (`the-way-record-invariant`);
   - a row in the table "External context" of `foundations/part_map.md`, `them → us`, `untrusted`
     (`the-way-update-part-map`).

   Before the pack is proposed, make the first check below: its scale against Pixel Crawler's.

## The three checks

Each check gives numbers and an image for the description of the request, and the human judges them
(D-415). A check sets no threshold: a threshold binds only where a decision gives one, as D-271
gives the frost 3:1 against the snow, and a number that looks low is no ground to write a threshold
into a decision, a test or a rule of style.

1. **The scale of a new pack against Pixel Crawler.** Measure the figure each frame draws, the new
   one and the mage's, and set the numbers side by side; `#<w>` after a file name is the width of
   its frames:

   ```sh
   node .claude/skills/loop2-scene-art/sheet-frames.mjs measure assets/sprites/mage-idle.png#64 <new-frame-file>#<w>
   ```

   The numbers are in pixels of the scene's picture, which the screen shows twice as large (D-349).
   Choose the figure to compare with: the mage for a character, the mage or the wolf for a creature.

2. **The colour of an effect against the prop it stands at, and not against the ground alone.**

   ```sh
   node .claude/skills/loop2-scene-art/contrast.mjs --effect <effect.png or #rrggbb> --ground assets/sprites/forest-scene.png@<x>,<y> --prop assets/sprites/sticks.png@<x>,<y>
   ```

   A sample is `<picture>@<x>,<y>`, one pixel of a picture, or `#rrggbb`. Name a sample for each
   colour of the prop that the effect lies over or against, not for one convenient pixel, and as
   many of the ground. Which prop an effect stands at, and where, is in `src/browser/sim/data/scene.ts`.
   Samples of picture files are before the tint of the scene's light. A frame of the running game
   (`loop2-play`) shows the tint, and `--ground` and `--prop` read it, but a frame is the screen
   scaled down to fit 800 px, lossy (JPEG) and with its colour at half resolution, so a pixel of it
   is an approximation: good for a broad area such as the snow, not for a prop drawn in thin
   strokes. For such a prop take the sample from its sprite file or from a full-size PNG screenshot,
   which `--ground` and `--prop` read as they read any picture. Take it with a map run going and not
   paused, since the pause greys the scene, and read the page's numbers beside it:

   ```sh
   playwright-cli screenshot --filename=.playwright-cli/shot.png
   playwright-cli eval "JSON.stringify({ ratio: window.devicePixelRatio, scene: document.querySelector('.scene').getBoundingClientRect() })"
   node .claude/skills/loop2-scene-art/contrast.mjs --effect <effect.png> --ground .playwright-cli/shot.png@<x>,<y> --prop .playwright-cli/shot.png@<x>,<y>
   ```

   The screenshot is the page at its full size, a window of 1280 × 720 px at the pixel ratio 1 giving
   a file of 1280 × 720 px, saved where `--filename` says, as `loop2-play` gives it. The scene is
   672 × 304 px on the screen, twice its picture (D-349), so the pixel `sx,sy` of the scene's picture
   is the block of 2 × 2 pixels of the screenshot whose top left lies `round(left) + 2*sx` across
   and `round(top) + 2*sy` down, with `left` and `top` of the rectangle the second command prints;
   any of the four pixels of the block is the sample. Where the ratio is not 1, multiply every number
   by it first.

3. **Whether the effect is covered by another element of the scene.** Lay the effect and every
   element that may cover it over the forest, in the order the section "The scene of a map run" of
   the style guide gives the layers, the last `--put` on top, and look at the preview:

   ```sh
   node .claude/skills/loop2-scene-art/preview.mjs --crop <x>,<y>,<w>,<h> --out .runs/<name>/layers.png --put <prop.png>@<x>,<y> --put <effect.png>@<x>,<y>#<frame>/<w> --put assets/sprites/mage-idle.png@<x>,<y>#0/64
   ```

   A picture is laid by the box of its visible pixels, its top left corner at the place named in the
   pixels of the scene's picture. The game places a frame by its whole cell (`ScenePicture` and
   `SceneSpot` in `src/browser/sim/data/scene.ts`: the cell's left edge and the line it stands on,
   its bottom edge). Turn the game's place into the preview's with the box `sheet-frames.mjs measure`
   prints for that frame, `x L-R, y T-B` of its cell: the preview's x is the cell's left edge plus L,
   its y the cell's top, which is its bottom edge less the frame's height, plus T. The box differs
   from frame to frame, so take it for each frame laid. Try the places the mage and the wolf stand
   at, not one.

## Flashes

An effect is also measured against the rule that the scene shows no flash of its whole area (D-317).
With a map run going, `loop2-play` gives the frames; keep what
`.claude/skills/loop2-play/save-frames.mjs` prints, which holds the time of each frame. A frame is the
screen scaled down to fit 800 px (a window of 1280 × 720 px gives frames of 800 × 450 px), so give the
script the ratio of the frame's width to `window.innerWidth` as `--scale`, and the rectangle of the
scene in the frame's pixels, `getBoundingClientRect()` of the element `.scene` times that ratio, in
whole pixels. The script prints the size of the frames on its first line, and the page's numbers
come from one command:

```sh
playwright-cli eval "JSON.stringify({ width: window.innerWidth, scene: document.querySelector('.scene').getBoundingClientRect() })"
playwright-cli --raw run-code --filename .claude/skills/loop2-play/frames.js | node .claude/skills/loop2-play/save-frames.mjs > .playwright-cli/frames.log
node .claude/skills/loop2-scene-art/flashes.mjs --log .playwright-cli/frames.log --region <x>,<y>,<w>,<h> --scale <ratio>
```

It gives the share of the region whose luminance moved by 0.10 or more between frames, and the
most of it inside one field. The field of 341 × 256 px and its quarter, 21,824 px, are the general
flash threshold of WCAG 2.3.1 at the screen, which D-317 rests on (D-42 keeps it); the script scales
both by `--scale` to the frame's pixels before it sets them beside the counts, and without `--scale`
it prints the counts in frame pixels and no comparison. The paused map run gives one frame, and the
script needs two.

## Who judges, and the reviewer

The numbers and the preview go into the description of the request, and the human judges them
(D-415); this skill's checks decide nothing.

A reviewer who checks a result with the same script and the same samples as the author has stopped
checking independently: the script's arithmetic is held by its tests, but the choice of what to
measure is where the mistakes are. The reviewer uses the scripts and chooses for themselves which
pixels of the ground and of the prop are the samples, what may cover the effect, which figure the
scale is compared with and which part of the sheet was the source, and looks at the preview
themselves.
