// A frame as text, one letter to a pixel, so that a few pixels of it can be changed by hand and
// the frame made a PNG again with its faults named.
//
//   node grid.mjs to-grid PICTURE.png OUT.txt [--at X,Y --size WxH] [--trim]
//   node grid.mjs to-png GRID.txt OUT.png [--reference GRID.txt]
//
// A grid file holds a line `K #rrggbb` for each colour, a line `---`, then one row of keys for
// each pixel row, `.` standing for a transparent pixel. `to-grid` takes the whole picture, or the
// rectangle `--at` and `--size` name, or with `--trim` the box of its visible pixels; it refuses a
// pixel that is partly transparent and a picture of more than 62 colours. `to-png` refuses a grid
// whose rows differ in width or that uses a key its colours lack, and writes nothing then; it only
// warns of a pixel with no neighbour above, below or at either side, of a figure whose lowest
// pixel is not on the last row, and of a size that differs from the `--reference` grid.
import { readFileSync, writeFileSync } from "node:fs";
import { Refusal, parseArgs, parseNumbers, runCli } from "./cli.mjs";
import {
  crop,
  hex,
  opaqueBox,
  parseHex,
  pixelAt,
  readPicture,
  writePicture,
} from "./image.mjs";

const KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function toGrid(file, out, options) {
  let picture = readPicture(file);
  if (options.at || options.size) {
    if (!options.at || !options.size)
      throw new Refusal("--at and --size go together");
    const [x, y] = parseNumbers(options.at, 2, ",", "--at");
    const [width, height] = parseNumbers(options.size, 2, "x", "--size");
    picture = crop(picture, x, y, width, height, file);
  }
  if (options.trim) {
    const box = opaqueBox(picture);
    if (box === null) throw new Refusal(`${file}: no visible pixel to trim to`);
    picture = crop(
      picture,
      box.left,
      box.top,
      box.right - box.left,
      box.bottom - box.top,
      file,
    );
  }
  const colours = new Map();
  for (let y = 0; y < picture.height; y++)
    for (let x = 0; x < picture.width; x++) {
      const [r, g, b, a] = pixelAt(picture, x, y);
      if (a === 0) continue;
      if (a !== 255)
        throw new Refusal(
          `${file}: the pixel ${x},${y} is partly transparent (alpha ${a}); a grid holds opaque or transparent pixels only`,
        );
      colours.set(hex([r, g, b]), [r, g, b]);
    }
  if (colours.size > KEYS.length)
    throw new Refusal(
      `${file}: ${colours.size} colours, and a grid has keys for ${KEYS.length}`,
    );
  const ordered = [...colours].sort(
    (p, q) => p[1].reduce((s, v) => s + v) - q[1].reduce((s, v) => s + v),
  );
  const keyOf = new Map(ordered.map(([name], i) => [name, KEYS[i]]));
  const lines = [...keyOf].map(([name, key]) => `${key} ${name}`);
  lines.push("---");
  for (let y = 0; y < picture.height; y++) {
    let row = "";
    for (let x = 0; x < picture.width; x++) {
      const [r, g, b, a] = pixelAt(picture, x, y);
      row += a === 0 ? "." : keyOf.get(hex([r, g, b]));
    }
    lines.push(row);
  }
  writeFileSync(out, `${lines.join("\n")}\n`);
  console.log(
    `grid ${picture.width} x ${picture.height}, ${colours.size} colours`,
  );
}

function readGrid(file) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch (error) {
    throw new Refusal(`${file}: cannot be read (${error.code ?? error.name})`);
  }
  const lines = text.split(/\r?\n/);
  const divider = lines.indexOf("---");
  if (divider < 0)
    throw new Refusal(
      `${file}: no line "---" between the colours and the rows`,
    );
  const palette = new Map();
  for (const line of lines.slice(0, divider).filter((l) => l.trim() !== "")) {
    const parts = line.trim().split(/\s+/);
    if (parts.length !== 2 || parts[0].length !== 1 || !KEYS.includes(parts[0]))
      throw new Refusal(
        `${file}: the colour line "${line}" is not written K #rrggbb with K a letter or a digit`,
      );
    if (palette.has(parts[0]))
      throw new Refusal(`${file}: the key ${parts[0]} is given two colours`);
    palette.set(
      parts[0],
      parseHex(parts[1], `${file}: the colour of ${parts[0]}`),
    );
  }
  const rows = lines.slice(divider + 1).filter((l) => l.trim() !== "");
  if (rows.length === 0) throw new Refusal(`${file}: no rows of pixels`);
  return { palette, rows };
}

function toPng(file, out, options) {
  const { palette, rows } = readGrid(file);
  const widths = new Set(rows.map((row) => row.length));
  if (widths.size !== 1)
    throw new Refusal(
      `${file}: rows of unequal width (${[...widths].sort((a, b) => a - b).join(", ")})`,
    );
  const unknown = new Set(
    [...rows.join("")].filter((key) => key !== "." && !palette.has(key)),
  );
  if (unknown.size > 0)
    throw new Refusal(
      `${file}: keys outside the colours given: ${[...unknown].sort().join(" ")}`,
    );
  const [width, height] = [rows[0].length, rows.length];
  const data = new Uint8Array(width * height * 4);
  const opaque = (x, y) =>
    x >= 0 && y >= 0 && x < width && y < height && rows[y][x] !== ".";
  const stray = [];
  let lowest = -1;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      if (!opaque(x, y)) continue;
      data.set([...palette.get(rows[y][x]), 255], (y * width + x) * 4);
      lowest = y;
      if (
        ![
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ].some(([dx, dy]) => opaque(x + dx, y + dy))
      )
        stray.push(`${x},${y}`);
    }
  const findings = [];
  if (stray.length > 0)
    findings.push(`warning: pixels with no neighbour: ${stray.join(" ")}`);
  if (lowest !== height - 1)
    findings.push(
      `warning: the lowest pixel is in row ${lowest} of ${height - 1}, not on the last row`,
    );
  if (options.reference) {
    const reference = readGrid(options.reference);
    const [refWidth, refHeight] = [
      reference.rows[0].length,
      reference.rows.length,
    ];
    if (reference.rows.some((row) => row.length !== refWidth))
      throw new Refusal(`${options.reference}: rows of unequal width`);
    if ([refWidth, refHeight].join() !== [width, height].join())
      findings.push(
        `warning: ${width} x ${height} where the reference is ${refWidth} x ${refHeight}`,
      );
    else {
      let differing = 0;
      for (let y = 0; y < height; y++)
        for (let x = 0; x < width; x++)
          if (rows[y][x] !== reference.rows[y][x]) differing++;
      findings.push(`info: ${differing} pixels differ from the reference`);
    }
  }
  const box = opaqueBox({ width, height, data });
  findings.push(
    box
      ? `info: figure ${box.right - box.left} x ${box.bottom - box.top} px`
      : "info: no visible pixel",
  );
  writePicture(out, { width, height, data });
  console.log(findings.join("\n"));
}

await runCli(async (argv) => {
  const { positional, options } = parseArgs(argv, {
    at: "value",
    size: "value",
    trim: "flag",
    reference: "value",
  });
  const [command, source, target] = positional;
  if (positional.length !== 3 || !["to-grid", "to-png"].includes(command))
    throw new Refusal(
      "usage: to-grid PICTURE.png OUT.txt [--at X,Y --size WxH] [--trim] | to-png GRID.txt OUT.png [--reference GRID.txt]",
    );
  if (command === "to-grid") toGrid(source, target, options);
  else toPng(source, target, options);
});
