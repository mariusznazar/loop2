# Report — executor of slice 37 (pictures, light, frame and camp of the scene)

## Status

done with concerns

## Commits

- `ef9891e6` test: mark the tests (lines `decision:`), base `6c1d23296e6bebe7fb0367f4c865be5aad660542`
- `b052a0c6` docs: the *Verification* fields of D-271, D-272, D-314, D-315, D-349, D-372, D-373, D-389

Author address checked after the commits: `mariusznn@gmail.com` (`git log --format='%h %ae %s' -3`).

## Files changed

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 102 | 76 |
| `tests/view/scene-picture.test.mjs` | 13 | 0 |
| `tests/view/scene.test.mjs` | 14 | 0 |
| `tests/view/camp-picture.test.mjs` | 7 | 0 |
| `tests/view/headquarters-screen.test.mjs` | 6 | 0 |
| `tests/view/world-area.test.mjs` | 2 | 0 |
| `tests/view/icons.test.mjs` | 1 | 0 |
| `tests/view/scene-frost-contrast.test.mjs` | 1 | 0 |

Files beyond the slice's *Change* (item 5 of "Work of every slice"):

- `tests/view/scene.test.mjs` — part `browser-view`; its styleguide was read whole; focused run below.
- `tests/view/world-area.test.mjs` — part `browser-view`; its styleguide was read whole; focused run below.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (at the base, before any edit) | 0, `0 errors`, no decision listed `held by nothing` |
| `python -B .the-way/elements/common/foundation_check.py` (after the edits, and again on the committed tree) | 0, `0 errors`, none of my nine decisions listed `held by nothing` (the run lists none at all) |
| `npm test -- tests/view/scene-frost-contrast.test.mjs` | 0 (2 tests, 2 pass) |
| `npm test -- tests/view/camp-picture.test.mjs` | 0 (7 tests, 7 pass) |
| `npm test -- tests/view/icons.test.mjs` | 0 (32 tests, 32 pass) |
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 (26 tests, 26 pass) |
| `npm test -- tests/view/scene-picture.test.mjs` | 0 (70 tests, 70 pass) |
| `npm test -- tests/view/world-area.test.mjs` | 0 (22 tests, 22 pass) |
| `npm test -- tests/view/scene.test.mjs` | 0 (71 tests, 71 pass) |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the seven changed `.mjs` files | 0 |
| `git diff -U0 6c1d2329… -- foundations/decisions.md`, read, plus a read-only script that maps each added line to the heading and field above it | every changed line, added and removed, lies in the *Verification* field of D-271, D-272, D-314, D-315, D-349, D-372, D-373 or D-389 (102 added lines checked, 0 outside) |

Not run: the full gate (`npm test` without a file), as the method says (the cycle runs it). Nothing else was skipped. `test_ruff_source_rules` and `test_shellcheck_source_rules` did not run, because no focused run reaches them. The handoff says they fail at the base.

## Own-work check

- **Requirement most likely missed:** that every line `decision:` I added quotes the start of a binding sentence exactly. A wrong quotation would leave a test pointing at nothing.
- **Check:** I broke one quotation for a moment (`"CSS may draw in the scene levels"` in `tests/view/scene-frost-contrast.test.mjs`) and ran `python -B .the-way/elements/common/foundation_check.py`.
  - With the broken quotation: exit 1, `tests/view/scene-frost-contrast.test.mjs:41: the quotation stands in no binding sentence of D-271`.
  - Restored, the check passed: exit 0, `0 errors`.
  - So the check reads every quotation, and its clean run on all my lines shows each one stands in its decision.
- **Second risk:** a test holding a sentence that I missed. I searched the tests by the content of each sentence, not only by number. The terms searched were: reduced motion, `styles.css`, the login backdrop (`login-backdrop`, `backdrop`), 672/304/336/twice/scale, `fire-small`/`SCENE_FIRE`, frost, the camp selectors and `campDrawing`, `sprite` in the Python tests, and every mention of D-271, D-272, D-273, D-314, D-315, D-349, D-372, D-373 and D-389. Nothing turned up beyond the cases judged below.

## Rows of my decisions

Test paths and lines are those of the test case in the committed tree.

### D-271 — Where do the scene's pictures come from?

- **Held in part by tests:**
  - S2 "The pictures of the camp at the top of Siedziba…": only "the chest is one still picture whatever it holds", `tests/view/camp-picture.test.mjs:93` "the chest is one still picture, the same empty and full".
  - S3 "A sprite file holds pixels alone…": pixels alone for the smaller flame, the death sheet, the wolf's sheets and the camp's clearing and chest:
    - `tests/view/scene-picture.test.mjs:873` "the smaller flame's file holds pixels alone, …"
    - `:1302` "the death sheet holds pixels alone, …"
    - `:1557` "the wolf's files hold pixels alone, …"
    - `:1599` "the camp's files hold pixels alone, in the size of the data"
  - S3, also: the pack LPC Wolf taken under CC BY 3.0, `tests/view/icons.test.mjs:320` "the section's last two lines credit the packs of the dust and of the wolf: …". The quotation of this line runs to the clause on CC BY 3.0.
  - S4 "CSS may draw in the scene layers…": specks and frost on the scene's pixel and grid, and the frost's outline 3:1 against the snow:
    - `tests/view/scene-picture.test.mjs:1252` "the specks of a completion rise over a part of the frame, on the scene's grid, over the open snow alone"
    - `tests/view/scene.test.mjs:2144` "the specks of a completion stand only while the effect plays, over the tint, each a pixel of the scene on its grid"
    - `tests/view/scene.test.mjs:1668` "the frost is none at 37 °C, …, on the scene's pixel"
    - `tests/view/scene-frost-contrast.test.mjs:40` "the frost's outline stands out from the snow at every tint, 3:1 at least"
- **Held by invariants:**
  - `loop2-container-sprites`: the pictures kept in `assets/sprites/` outside what the server serves and copied into the build (S1, and S2 "kept there in the same way"). Its test is `scene-picture.test.mjs:493`, which carries `invariant:` and got no `decision:` line (R1).
  - `sprite-file-content`: PNG only (part of S3).
  - `sprite-credits`: a credit for each pack whose licence asks for one (part of S3).
- **Held by nothing:**
  - where every picture comes from (the packs Pixel Crawler, LPC Wolf, and Smoke & Fire recoloured; the mage of Pixel Crawler as the character);
  - pixels alone for the sprite files no test reads;
  - the colours of the frost and the specks taken from the packs' palettes, and of the tint and the cold layer from the human's choice;
  - that whatever has a drawing comes from a pack;
  - that the colour of an effect stands out from its ground (the dust, and the specks' colour).
- **Verification:** pair rewritten.

### D-272 — Where may a picture of the game stand?

- **Held in part by tests:** S1 "A picture of the game stands behind the login card…". The tests hold the scene and the camp as pictures with no text in them, and the camp as a band at the top of Siedziba over the screen's panel and its heading:
  - `tests/view/scene.test.mjs:401` "the scene is a picture: hidden from assistive technology, no text, nothing the keyboard reaches"
  - `tests/view/world-area.test.mjs:483` "the scene is the picture of the forest at the one size of D-349, with no text inside or over it"
  - `tests/view/headquarters-screen.test.mjs:652` "the camp stands over the panel of the screen, the heading under it, and adds no text"
- **Held by invariants:** none.
- **Held by nothing:**
  - the picture behind the login card, with every sentence inside the card on its solid `panel`;
  - text laid over a picture from an element outside it;
  - „Teraz” and „Potem” on a solid background;
  - the screens with no picture.
- **Verification:** pair rewritten.

### D-273 — When do the files of `assets/sprites/` gain a refusal test?

- **Held by tests:** none. Both sentences are about the deferral and about review; no test checks them.
- **Held by invariants:** none (none named).
- **Held by nothing:** both sentences.
- **Verification:** unchanged (its pair stays).

### D-314 — What does the background of the scene show?

- **Held in part by tests:** S1, only that the background is the forest's picture in one still frame, `tests/view/scene-picture.test.mjs:222` "the background is the forest picture, a still frame of 336 × 152 pixels".
- **Held by invariants:** none.
- **Held by nothing:** the forest in snow, composed from loop's cut pictures of Pixel Crawler.
- **Verification:** pair rewritten (its words unchanged, now prefixed by `tests:` and limited to that part).

### D-315 — Where does the tint of the scene's light stand?

- **Held in part by tests:**
  - S1: only "the tint … is a layer over that picture", `tests/view/scene.test.mjs:1443` "the layers: the tint over everything the scene draws, …".
  - S2, held by the same test `:1443` and three others. Under the layer: the background, the props, the burning fire, the mage, the dust and the flying icon. Over it: the frost and the badge's carrier.
    - `:2609` "the mage keeps the way it turned after the fight, and the wolf and its cloud lie under the tint, …"
    - `:2144` "the specks of a completion …, over the tint, …"
    - `:2106` "the cold layer stands after a death of cold alone, over the tint and under the frost, …"
- **Held by invariants:** none.
- **Held by nothing:**
  - the background file in full light with no tint or darkness in it;
  - the extinguished campfire under the layer;
  - the plaques of a discovery over the layer;
  - the frost's colour staying the same with the streak.
- **Verification:** pair rewritten.

### D-349 — What size is the scene on the screen of a map run?

- **Held in part by tests:** S1. The scene's picture is given 672 × 304 at two window widths and in two states, with the frame sized by its picture alone, `tests/view/world-area.test.mjs:483` "the scene is the picture of the forest at the one size of D-349, …". The picture is 336 × 152, `tests/view/scene-picture.test.mjs:222`.
- **Held by invariants:** none.
- **Held by nothing:**
  - a style rule drawing the scene at a second or fractional size (jsdom reads attributes, not layout);
  - S2, effects made for this size alone.
- **Verification:** pair rewritten.

### D-372 — What does the frost on the edges of the scene's frame show?

- **Held in part by tests:**
  - S1: the thickness follows the body's temperature in whole pixels of the scene: none at 37 °C, 8 at 36 °C, 16 at 35 °C and below, not the streak, and taken back as the body warms at a fire.
    - `tests/view/scene-picture.test.mjs:961` "the frost is none at 37 °C, half of 16 pixels at 36 °C and the whole 16 at 35 °C and below"
    - `:980` "the frost follows the body's temperature and nothing else, the streak included"
    - `tests/view/scene.test.mjs:1668` "the frost is none at 37 °C, 8 pixels at 36 °C, …, on the scene's pixel"
    - `:1700` "warming at the fire takes the frost back, reading by reading"
  - S3 "The frost lies over the layer of the tint" is held whole by `tests/view/scene.test.mjs:1443`.
- **Held by invariants:** none.
- **Held by nothing:**
  - S1: on the edges of the frame, never over the whole area;
  - S2: a ragged inner edge, and the outline alone at the first pixel.
- **Verification:** pair rewritten.

### D-373 — How does the flame of the campfire show how long the fire has left?

- **Held in part by tests:**
  - S1: the full flame above 20 minutes and the smaller one at 20 or fewer, from its own file, with the same four frames, place and size. The fire keeps the same element, so its frames run on. The smaller file is the full sheet with only flame pixels cut down and no new colour.
    - `tests/view/scene-picture.test.mjs:771` "a burning fire draws the smaller flame with 20 minutes of burning left or fewer, …"
    - `:873` "the smaller flame's file holds pixels alone, …"
    - `tests/view/scene.test.mjs:1716` "a burning fire shows the smaller flame in its last 20 minutes, …"
    - `:1738` "the fire's element stays the same when its flame turns small"
  - S2 "An extinguished campfire stays as D-316 gives it": `scene-picture.test.mjs:771` and `scene.test.mjs:1716`, the extinguished fire in the full flame's picture, not burning. Its grey is D-316's, which D-316's own tests hold.
- **Held by invariants:** none.
- **Held by nothing:**
  - the smaller flame at the same beat (jsdom runs no animation);
  - the file and the 20 minutes standing in the scene's data rather than in the view's code.
- **Verification:** pair rewritten.

### D-389 — What does the camp at the top of Siedziba show, and how does it stand and move?

- **Held in part by tests:**
  - S1: the band over the screen's panel with the heading under it, 96 px high, its clearing (a 672 × 48 picture) drawn at twice its pixels.
    - `tests/view/headquarters-screen.test.mjs:652`
    - `:712` "the camp is drawn at twice the pixels of its pictures, in a band 96 px high"
    - `tests/view/scene-picture.test.mjs:1599`
  - S2: who stands in the camp, in the order of creation, as many as the widest band holds, „Drużyna” listing all, and the fire and the chest alone when nobody is in.
    - `tests/view/camp-picture.test.mjs:33` "a team with nobody in Siedziba shows the fire and the chest alone"
    - `:48` "only the characters in Siedziba stand in the camp, in the order of creation"
    - `:64` "the character of a manual map run is away while the run goes, is paused or has ended"
    - `:81` "the camp draws as many characters as the widest band holds, …"
    - `tests/view/headquarters-screen.test.mjs:735` "the camp follows the manual map run and the earning loops, …"
  - S3: the fire in its frames whatever the game state, each character in its idle sheet, and the camp a picture with no control, no key, no click, no text, hidden from readers.
    - `tests/view/camp-picture.test.mjs:106` "the fire of the camp is the burning fire in its frames, …"
    - `:116` "a character stands in the idle sheet of its archetype"
    - `tests/view/headquarters-screen.test.mjs:676` "the camp is a picture: …"
    - `:652`
- **Held by invariants:** `loop2-container-sprites` (the camp's files served).
- **Held by nothing:**
  - S1: under the row of warnings; the clearing in full light, composed of the forest's pictures; the fire in the middle; cropping in a narrower window, never scaling down;
  - S2: as many as the band holds at the width of the window;
  - S3: motion at the scene's beat by CSS with no loop of drawing, and still under reduced motion.
- **Verification:** pair rewritten.

## Pairs added or rewritten (for the human to accept at the merge)

D-271 (rewritten):

> tests: the files of the smaller flame, of the mage's death, of the wolf and of the camp's clearing and chest holding pixels alone; the chest of the camp one still picture, the same empty and full; the credit line of the pack LPC Wolf naming its licence CC BY 3.0; the frost's thickness in whole pixels of the scene, its pixel a part of the frame's width and height, and the specks of a completion whole pixels of the scene on its grid, rising by whole pixels over the open snow alone; the frost's outline standing out by at least 3:1 from the snow measured under every tint. For where the pictures come from, the sprite files no test reads and the colours CSS draws in, an agent compares a change with the part no invariant and no test holds:
> - complies: a picture composed from the pack's trees, fire and mage kept in `assets/sprites/` as a PNG file with no chunk but its pixels'; the clearing of the camp composed from the pack's snow ground and trees, and its chest cut from the pack's sheet with every pixel moved unchanged, the camp's characters and fire the files of the scene's mage and fire; the character of the scene drawn from a sprite file made from the pack's mage; the cloud of dust a sprite file made from the smoke of Smoke & Fire Animated Particle [16x16] in browns the scene holds, which the cloud of a scuffle is too; the wolf a set of sprite files made from the side views of the pack LPC Wolf, every pixel of them moved unchanged into frames of one size; the smaller flame of the campfire a sprite file made from the frames of the pack's fire with the flame cut down by hand; the fall of the mage a sprite file made from the pack's death sheet of the mage; the frost on the edges of the frame built by CSS of squares of one pixel of the scene on its grid in colours the pictures of the pack's trees hold; the specks of light after a completion in colours read from pixels of the pack's bonfire, standing out from the open snow they rise over; the tint layer and the cold layer in colours the human chose
> - violates: a sprite file no test reads carrying text or metadata chunks; a picture drawn from a pack other than the three named; the cloud of dust in a colour that does not stand out from the ground it stands on; the hooded figure of loop as the character of the scene; a mage, a creature or a prop drawn by CSS as a shape; a frost or a speck in a colour no picture of a pack holds; a speck in a colour that does not stand out from the snow it rises over; a cold layer whose colour no choice of the human gave; a chest of the camp drawn from an icon file as a mask

D-272 (rewritten):

> tests: the scene of a map run and the camp at the top of Siedziba, the camp over the screen's panel and its heading, each a picture with no text in it. For the login card, text laid over a picture from outside it and the screens with no picture, an agent compares a change with the part no invariant and no test holds:
> - complies: the screen of the login card with the picture over the whole window and every sentence of the page inside the card, on its solid `panel`; „Teraz” and „Potem” on the solid background under the scene; the waiting screens with no picture
> - violates: a sentence of the page standing on the picture outside the card; the card's background made half-transparent over the picture; the game minute or the name of the map laid over the scene from an element beside it

D-314 (rewritten, the pair's own words unchanged):

> tests: the background of the scene the forest's picture in one still frame. For what the forest shows and the pictures it is composed from, an agent compares a change with the part no invariant and no test holds:
> - complies: a background of pines, a tree and a sapling in their snow variants, composed from loop's cut pictures of Pixel Crawler
> - violates: a green forest; a background composed from pictures cut anew from the pack's sheets

D-315 (rewritten):

> tests: the layer of the tint over the background, the props, the burning campfire, the mage, the wolf with the cloud of its scuffle, the dust and the icon flying on its plaque, and under the frost and the carrier of the badge over the mage's head, which stands outside the mage's element; the specks of a completion over the layer; the cold layer after a death of cold over the layer of the tint and under the frost. For the picture's own file, the extinguished campfire, the plaques of a discovery and the colours that stay over the layer, an agent compares a change with the part no invariant and no test holds:
> - complies: the file of the background as light as the cut pictures it is composed from and in their colours, with no tint and no darkness in it; an extinguished campfire under the layer; the plaques of a discovery over the layer, on their solid `panel` background; the frost the same colours at streak 0 and at a completion
> - violates: the file of the background darkened, as the picture behind the login card is, or tinted; a tint drawn by putting another file in place of the background; an extinguished campfire left out of the layer; a plaque of a discovery under the layer; a frost whose colour changes with the streak

D-349 (rewritten):

> tests: the scene's picture given 672 × 304 px, twice its picture of 336 × 152, in a narrow window and in a wide one and in another state of the game, the frame sized by its picture alone. For the size the style sheet draws the scene at and what the scene draws, an agent compares a change with the part no invariant and no test holds:
> - complies: the scene of a map run drawn 672 × 304 px in a window 1280 px wide and in one 1920 px wide; an effect of the scene made for that size
> - violates: a style rule that draws the scene at a second size, such as 336 × 152 px, or at a fraction of twice its picture, such as one and a half times; an effect of the scene made for a second size of it

D-372 (rewritten):

> tests: the frost's thickness in whole pixels of the scene, none at 37 °C, growing evenly as the body cools, 8 at 36 °C and the full 16 at 35 °C and below, following the body's temperature and not the streak, and taken back reading by reading as the body warms at a fire; the frost over the layer of the tint. For where the frost lies on the frame and the shape of its inner edge, an agent compares a change with the part no invariant and no test holds:
> - complies: a frost on the four edges of the frame whose deepest teeth reach 8 pixels of the scene from each edge at 36 °C and 16 at 35 °C; its inner edge ragged; at the first pixel of thickness the outline alone, the fill coming with the next pixels
> - violates: a frost over the whole area of the scene; a frost whose inner edge is straight, every part of it at the full thickness; a fill with no outline at the first pixel of thickness

D-373 (rewritten):

> tests: a burning campfire with more than 20 minutes of burning left drawn with the full flame and with 20 or fewer with the smaller flame, from a file of its own, in the same four frames, place and size, on the same element, so that its frames run on; the smaller flame's file holding pixels alone and being the full flame's sheet with only pixels of its flame cut down to the pit's black and no new colour, every frame keeping part of its flame; an extinguished campfire in the full flame's picture, not burning. For the beat of the smaller flame and where its file and the 20 minutes stand, an agent compares a change with the part no invariant and no test holds:
> - complies: the frames of the smaller flame changing at the beat of the full one; the file of the smaller flame and the 20 minutes named in the scene's data
> - violates: the smaller flame at another beat than the full one; the file of the smaller flame or the 20 minutes named in the code of the browser view

D-389 (rewritten):

> invariants: loop2-container-sprites. tests: the band over the panel of Siedziba, the heading „Siedziba” under it, 96 px high, its clearing, a picture of 672 × 48, drawn at twice its pixels; the characters that stand in it, those neither in a manual map run, going, paused or ended, nor in an earning loop, in the order of creation, as many as the widest band holds, „Drużyna” listing them all, and the fire and the chest alone where none is in Siedziba, the camp following at once every change of the map run and of the earning loops; the fire in the frames of its burning flame whatever campfire the game state holds, and each character in the frames of its idle sheet; the camp a picture, with no control, no stop for the keyboard, no response to a click and no text, hidden from readers of the screen. For where the band stands under the menu bar, its clearing, the place of its fire, its cropping and its motion, an agent compares a change with the part no invariant and no test holds:
> - complies: the camp under the row of warnings below the menu bar, with the sentence of the page above the screen still above it; the clearing in full light with no tint, composed of the pictures the forest of the scene is composed of; the fire in the middle at every width of the window; in a window 400 px wide the clearing cropped at the sides around the fire and as many whole characters as the band holds; the frames of the fire and of the characters changing at the scene's beat by CSS and standing still under the setting for reduced motion
> - violates: the camp over the row of warnings; the clearing scaled down in a narrow window; a character cut in half at the edge of the band; a loop of drawing that moves the camp; a camp that moves under the setting for reduced motion

None added; D-273 unchanged.

## Choices, with the way rejected

1. **Tests that draw the mage, the props or the wolf from the data's sprite files got no D-271 line for "whatever has a drawing … comes from a pack".**
   - The tests: `scene.test.mjs:131` and `:2292`, `scene-picture.test.mjs:206` and `:536`.
   - Why: they check that the drawing uses the file the data names, not that the file comes from a pack. They would catch a CSS shape only as a side effect.
   - Rejected: marking them, in the spirit of R4. Cost if wrong: four lines missing, and the pair keeps that clause, which stays checked by review.
2. **The credit test `icons.test.mjs:320` got a D-271 line only for the clause on CC BY 3.0.**
   - Why: the credits themselves are stated by the invariant `sprite-credits` (R1, and the template's rule that a sentence held by a test gets no invariant). The line quotes S3 from its start up to the clause on CC BY 3.0.
   - Rejected: no line at all — that would leave the licence clause held by nothing.
3. **`scene-picture.test.mjs:1599` (the camp's files 672 × 48) got a D-389 line.**
   - Why: the band is drawn at twice that picture, so a file of another size breaks "drawn at twice the pixels of its picture" together with `headquarters-screen.test.mjs:712`.
   - Rejected: treating it as a test of file size only.
4. **D-315 S1 is marked on `scene.test.mjs:1443` only for "the tint … is a layer over that picture".**
   - The quotation stops at "The background picture of the scene is in full light", because it must begin at the start of the sentence. The "full light" part is not held and stays in the pair.
5. **D-373 S2 is treated as held by the two flame tests.** The sentence defers to D-316, whose tests hold the grey look. Its pair no longer carries "the extinguished fire in the smaller flame".
6. **Two loose phrases removed from rewritten pairs, because a test now holds them.**
   - D-271's old "a PNG file carrying text or metadata chunks" became "a sprite file no test reads carrying …".
   - D-349's "chosen by a constant … or by the width of the window" went: `world-area.test.mjs:483` holds the width and the state. The style-sheet case stays.

## Reach beyond the dispatch

Each reach is a read beyond the handoff's *Read*:

- `foundations/decisions.md`: D-316's lines, which earlier slices left in the tests, only as they stand at the cases I read, to avoid marking another slice's decision.
- `src/browser/sim/data/scene.ts`, by `grep` for `low`, `fire-small`, `clearing`, `chest`: to confirm that the smaller flame's file and threshold, and the camp's clearing size, live in the scene's data, for the D-373 and D-389 pairs.
- `.the-way/elements/common/foundation_check.py:690-737`: to learn why the base run listed no `held by nothing` lines (it notes them only when there are any).
- `tests/view/world-area.test.mjs:470-535` and `tests/view/scene.test.mjs`, by case: these are outside the slice's *Change* but hold my sentences (item 5).
- The Python tests and `tests/invariants/test_loop2_container_sprites.py`, by `grep` only: to look for tests of D-273 and of the sprites; none hold my sentences beyond the invariant.

## Working copies

- `.runs/executor-37/` holds the logs of the foundation check runs and the seven test runs. These are outputs, not copies of the product, and are left for the cycle.
- The first foundation-check output was written directly under `.runs/`, then moved into `.runs/executor-37/`.
- No worktree, clone or script file was made. The exploratory broken quotation was reverted before the commit; `git diff` showed one added line in that file.

## Unread material

- `tests/view/scene-picture.test.mjs`, `tests/view/scene.test.mjs`, `tests/view/headquarters-screen.test.mjs`, `tests/view/icons.test.mjs` and `tests/view/world-area.test.mjs` were read by case and line range, not whole, as the orchestrator directed. The method asks every changed file to be read whole.
  - Read: the case lists of each file, the headers of `scene-picture` (1-106) and `scene` (76-175), and every case I judged.
  - `scene-picture`: 200-231, 486-551, 760-990, 1240-1355, 1536-1612.
  - `scene`: 396-435, 1418-1552, 1640-1760, 2092-2181, 2286-2325, 2590-2631, 1934-1991.
  - `headquarters-screen`: 640-784.
  - `icons`: 1-52, 300-359, and the pack lines found by `grep` (205-232).
  - `world-area`: 470-553.
- `foundations/invariants.md`: only the three entries named, as given.
- Everything else the handoff names was read whole: the guidelines, the part map, the glossary, the template passages and the decision entries.

## Searches not found or unclear

- The base run of `foundation_check.py` printed only `0 errors`, with no `held by nothing` list. The handoff expected a list "shorter at your base". At this base it is empty, so none of my decisions was listed before or after.
- No test checks the picture behind the login card (`login-backdrop.png`, drawn from `src/browser/styles.css:666`). No test checks the camp's place under the row of warnings, its fire in the middle, its cropping in a narrow window, or its motion and its stillness under reduced motion.
- No test checks D-273's content; it stays held by its pair.

## Remarks on wording (R3; nothing changed)

- **D-271 S1 does not say where the picture behind the login card is kept.** S1 says the login card's picture comes from the packs and is kept in `assets/sprites/`. The invariant `loop2-container-sprites` covers only the files "the scene's drawing or the camp's drawing asks for". So `login-backdrop.png`, which the style sheet asks for, falls outside both the invariant and its test. The decision says more than its invariant holds.
- **D-389 S1 says "about 96 px high", while the tests hold exactly 96 px.** The word "about" is looser than the code.
- **Test comments name decisions the cases do not hold.** The comment of `camp-picture.test.mjs:1` cites D-272 for the whole file, and `headquarters-screen.test.mjs:671` cites D-272 for a case about controls and readers, which D-272 does not speak of. The mentions stay, as the task requires.
