// A preview of pictures laid on a piece of the scene's forest, in the order they are named, scaled
// up with every pixel kept a square. With no `--put` it only scales a piece of the picture, a
// sheet of a pack included, so that it can be looked at.
//
//   node preview.mjs --out FILE [--put PUT ...] [--scene PICTURE] [--crop X,Y,W,H] [--scale N]
//
// PUT is `picture.png@x,y`, or `picture.png@x,y#index/width` for the frame number `index` of a
// strip of frames `width` pixels wide. What is laid is the box of the picture's visible pixels, its
// top left corner at x,y in the pixels of the scene's picture, the 336 x 152 pixels of
// `forest-scene.png`; `--crop` chooses the part shown, the whole picture by default. `--scale`
// defaults to 2, the size the scene has on the screen (D-349). A file that cannot be read as a
// picture, a crop outside the scene or a picture with no visible pixel ends the script with a
// message and a non-zero exit code, and writes nothing.
import { Refusal, parseArgs, parseNumbers, runCli } from "./cli.mjs";
import { crop, opaqueBox, readPicture, writePicture } from "./image.mjs";

const SCENE = "assets/sprites/forest-scene.png";

function parsePut(text) {
  const match = /^(.+)@(\d+),(\d+)(?:#(\d+)\/(\d+))?$/.exec(text);
  if (!match)
    throw new Refusal(
      `--put must be written picture.png@x,y or picture.png@x,y#index/width, got "${text}"`,
    );
  const [, file, x, y, index, width] = match;
  return {
    file,
    x: Number(x),
    y: Number(y),
    index: Number(index ?? 0),
    width: width === undefined ? null : Number(width),
  };
}

function figure({ file, index, width }) {
  const picture = readPicture(file);
  const frameWidth = width ?? picture.width;
  if (frameWidth === 0 || (index + 1) * frameWidth > picture.width)
    throw new Refusal(
      `${file}: there is no frame ${index} of ${frameWidth} pixels in a picture ${picture.width} pixels wide`,
    );
  const frame = crop(
    picture,
    index * frameWidth,
    0,
    frameWidth,
    picture.height,
    file,
  );
  const box = opaqueBox(frame);
  if (box === null)
    throw new Refusal(`${file}: frame ${index} has no visible pixel`);
  return crop(
    frame,
    box.left,
    box.top,
    box.right - box.left,
    box.bottom - box.top,
    file,
  );
}

// Lays `top` on `base` at x,y, clipping what falls outside; the usual "over" of straight alpha.
function lay(base, top, x, y) {
  for (let row = 0; row < top.height; row++)
    for (let column = 0; column < top.width; column++) {
      const [bx, by] = [x + column, y + row];
      if (bx >= base.width || by >= base.height) continue;
      const from = (row * top.width + column) * 4;
      const to = (by * base.width + bx) * 4;
      const alpha = top.data[from + 3] / 255;
      const under = (base.data[to + 3] / 255) * (1 - alpha);
      const total = alpha + under;
      if (total === 0) continue;
      for (let i = 0; i < 3; i++)
        base.data[to + i] = Math.round(
          (top.data[from + i] * alpha + base.data[to + i] * under) / total,
        );
      base.data[to + 3] = Math.round(total * 255);
    }
}

await runCli(async (argv) => {
  const { options } = parseArgs(argv, {
    out: "value",
    put: "list",
    scene: "value",
    crop: "value",
    scale: "value",
  });
  if (!options.out)
    throw new Refusal(
      "usage: --out FILE [--put picture.png@x,y ...] [--scene PICTURE] [--crop X,Y,W,H] [--scale N]",
    );
  const scale =
    options.scale === undefined
      ? 2
      : parseNumbers(options.scale, 1, ",", "--scale")[0];
  if (scale < 1 || scale > 16)
    throw new Refusal("--scale must be from 1 to 16");
  const sceneFile = options.scene ?? SCENE;
  const scene = readPicture(sceneFile);
  const [cx, cy, cw, ch] = options.crop
    ? parseNumbers(options.crop, 4, ",", "--crop")
    : [0, 0, scene.width, scene.height];
  const puts = (options.put ?? []).map(parsePut);
  const base = { ...scene, data: Uint8Array.from(scene.data) };
  for (const put of puts) {
    const top = figure(put);
    lay(base, top, put.x, put.y);
    if (
      put.x + top.width <= cx ||
      put.y + top.height <= cy ||
      put.x >= cx + cw ||
      put.y >= cy + ch
    )
      console.log(`note: ${put.file} lies outside the part shown`);
  }
  const shown = crop(base, cx, cy, cw, ch, sceneFile);
  const big = new Uint8Array(cw * scale * ch * scale * 4);
  for (let y = 0; y < ch * scale; y++)
    for (let x = 0; x < cw * scale; x++) {
      const from = (Math.floor(y / scale) * cw + Math.floor(x / scale)) * 4;
      big.set(shown.data.subarray(from, from + 4), (y * cw * scale + x) * 4);
    }
  writePicture(options.out, {
    width: cw * scale,
    height: ch * scale,
    data: big,
  });
  console.log(
    `preview ${cw * scale} x ${ch * scale} px, scale ${scale}, ${puts.length} laid`,
  );
});
