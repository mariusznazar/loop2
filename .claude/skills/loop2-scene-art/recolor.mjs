// Replaces colours of a picture without bringing in a new one: each colour written must be held
// by a pixel of a picture named as the palette (the picture itself where none is named), so the
// result holds no colour the scene's pictures do not hold.
//
//   node recolor.mjs IN.png OUT.png --map #from=#to [--map ...] [--palette PICTURE.png ...]
//                    [--region X,Y,W,H]
//
// Only pixels that are not wholly transparent are recoloured, and their alpha stays. A colour is
// replaced by what the picture held before the run, so `--map #aaaaaa=#bbbbbb --map #bbbbbb=#cccccc`
// does not carry a pixel on. `--region` limits the change to a rectangle of the picture. A colour
// that is not held by the palette, a colour to replace that no pixel of the region has, or a file
// that cannot be read ends the script with a message and a non-zero exit code, and writes nothing.
import { Refusal, parseArgs, parseNumbers, runCli } from "./cli.mjs";
import {
  coloursOf,
  crop,
  hex,
  parseHex,
  readPicture,
  writePicture,
} from "./image.mjs";

function parseMaps(texts) {
  const maps = new Map();
  for (const text of texts) {
    const parts = text.split("=");
    if (parts.length !== 2)
      throw new Refusal(`--map must be written #from=#to, got "${text}"`);
    const from = hex(parseHex(parts[0], "--map colour"));
    if (maps.has(from)) throw new Refusal(`--map names ${from} twice`);
    maps.set(from, hex(parseHex(parts[1], "--map colour")));
  }
  return maps;
}

await runCli(async (argv) => {
  const { positional, options } = parseArgs(argv, {
    map: "list",
    palette: "list",
    region: "value",
  });
  if (positional.length !== 2 || !options.map)
    throw new Refusal(
      "usage: IN.png OUT.png --map #from=#to [--map ...] [--palette PICTURE.png ...] [--region X,Y,W,H]",
    );
  const [input, output] = positional;
  const picture = readPicture(input);
  const maps = parseMaps(options.map);
  const palette = new Set();
  for (const file of options.palette ?? [input])
    for (const colour of coloursOf(readPicture(file)).keys())
      palette.add(colour);
  const [x, y, width, height] = options.region
    ? parseNumbers(options.region, 4, ",", "--region")
    : [0, 0, picture.width, picture.height];
  const region = crop(picture, x, y, width, height, input);
  const held = coloursOf(region);
  const counts = new Map();
  for (const [from, to] of maps) {
    if (!held.has(from))
      throw new Refusal(
        `${input}: no pixel of the region has the colour ${from}`,
      );
    if (!palette.has(to))
      throw new Refusal(
        `${to} is held by no pixel of the palette (${(options.palette ?? [input]).join(", ")}): it would be a new colour`,
      );
    counts.set(from, 0);
  }
  const out = { ...picture, data: Uint8Array.from(picture.data) };
  for (let row = y; row < y + height; row++)
    for (let column = x; column < x + width; column++) {
      const at = (row * picture.width + column) * 4;
      if (out.data[at + 3] === 0) continue;
      const from = hex(picture.data.subarray(at, at + 3));
      const to = maps.get(from);
      if (to === undefined) continue;
      out.data.set(parseHex(to, "colour"), at);
      counts.set(from, counts.get(from) + 1);
    }
  writePicture(output, out);
  for (const [from, to] of maps)
    console.log(`${from} -> ${to}: ${counts.get(from)} pixels`);
  console.log(`new colours: 0 (every colour written is held by the palette)`);
});
