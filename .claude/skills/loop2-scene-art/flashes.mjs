// Measures flashes in a series of frames of the running scene, as the frames `loop2-play` gives
// (JPEG) or any PNG frames, against the rule that the scene shows no flash of its whole area
// (D-317). It gives numbers and sets no threshold of its own.
//
//   node flashes.mjs --log FILE [--region X,Y,W,H] [--scale R]
//   node flashes.mjs FRAME... [--region X,Y,W,H] [--scale R]
//
// `--log` is the output of `save-frames.mjs` kept in a file, the lines `path +N ms`, which also
// gives the time of each frame; frames named one by one have none. `--region` is the rectangle of
// the scene in the frame, in the frame's pixels; the whole frame by default. A pixel counts as
// moved between two frames when its relative luminance (WCAG 2.2) moves by 0.10 or more and the
// darker of the two is under 0.80, the change a flash is made of; whether moved pixels make a
// flash, and of how much of the area, is for the reader of the numbers. The counts are in pixels
// of the frame. The field of 341 x 256 pixels and its quarter, 21,824, which WCAG 2.3.1 gives (it
// is the source of D-317, kept by D-42), are in pixels of the screen, so `--scale` is how many
// pixels of the frame one pixel of the screen is, the frame's width over `window.innerWidth`; the
// field and the threshold are scaled by it before the counts are set beside them. Without
// `--scale` no comparison with the field is printed. The frames must be of one size. A frame that
// cannot be read, frames of two sizes, fewer than two frames or a scale that is no positive number
// end the script with a message and a non-zero exit code.
import { readFileSync } from "node:fs";
import { Refusal, parseArgs, parseNumbers, runCli } from "./cli.mjs";
import { crop, readPicture } from "./image.mjs";

const MOVE = 0.1;
const DARKER_BELOW = 0.8;
// The general flash threshold of WCAG 2.3.1, the source of D-317: a quarter of a field of 341 x 256
// pixels of the screen, 21,824.
const FIELD = { width: 341, height: 256, threshold: 21824 };

const linear = Float64Array.from({ length: 256 }, (_, v) => {
  const unit = v / 255;
  return unit <= 0.04045 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
});

function luminances({ width, height, data }) {
  const values = new Float32Array(width * height);
  for (let i = 0; i < values.length; i++)
    values[i] =
      0.2126 * linear[data[i * 4]] +
      0.7152 * linear[data[i * 4 + 1]] +
      0.0722 * linear[data[i * 4 + 2]];
  return values;
}

function readLog(file) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch (error) {
    throw new Refusal(`${file}: cannot be read (${error.code ?? error.name})`);
  }
  const frames = text
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const match = /^(.+) \+(-?\d+) ms$/.exec(line.trim());
      if (!match)
        throw new Refusal(
          `${file}: the line "${line}" is not "path +N ms", as save-frames.mjs prints it`,
        );
      return { file: match[1], ms: Number(match[2]) };
    });
  return frames;
}

// The most pixels of `mask` inside one field of `fw` x `fh` pixels (the region where it is smaller).
function busiestField(mask, width, height, [fieldWidth, fieldHeight]) {
  const [fw, fh] = [Math.min(fieldWidth, width), Math.min(fieldHeight, height)];
  const sums = new Int32Array((width + 1) * (height + 1));
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      sums[(y + 1) * (width + 1) + x + 1] =
        mask[y * width + x] +
        sums[y * (width + 1) + x + 1] +
        sums[(y + 1) * (width + 1) + x] -
        sums[y * (width + 1) + x];
  let best = 0;
  for (let y = fh; y <= height; y++)
    for (let x = fw; x <= width; x++) {
      const total =
        sums[y * (width + 1) + x] -
        sums[(y - fh) * (width + 1) + x] -
        sums[y * (width + 1) + x - fw] +
        sums[(y - fh) * (width + 1) + x - fw];
      if (total > best) best = total;
    }
  return best;
}

function moved(a, b) {
  const mask = new Uint8Array(a.length);
  let count = 0;
  for (let i = 0; i < a.length; i++)
    if (Math.abs(a[i] - b[i]) >= MOVE && Math.min(a[i], b[i]) < DARKER_BELOW) {
      mask[i] = 1;
      count++;
    }
  return { mask, count };
}

await runCli(async (argv) => {
  const { positional, options } = parseArgs(argv, {
    log: "value",
    region: "value",
    scale: "value",
  });
  const scale = options.scale === undefined ? null : Number(options.scale);
  if (scale !== null && !(Number.isFinite(scale) && scale > 0))
    throw new Refusal(
      `--scale must be a positive number, the frame's width over window.innerWidth, got "${options.scale}"`,
    );
  const named = options.log
    ? readLog(options.log)
    : positional.map((file) => ({ file, ms: null }));
  if (options.log && positional.length > 0)
    throw new Refusal("name the frames in a log or one by one, not both");
  if (named.length < 2)
    throw new Refusal(
      "at least two frames are needed (a still map run gives one)",
    );
  const pictures = named.map(({ file }) => readPicture(file));
  const [first] = pictures;
  const sized = pictures.findIndex(
    (p) => p.width !== first.width || p.height !== first.height,
  );
  if (sized > 0)
    throw new Refusal(
      `${named[sized].file} is ${pictures[sized].width} x ${pictures[sized].height} px where ${named[0].file} is ${first.width} x ${first.height}`,
    );
  const [x, y, width, height] = options.region
    ? parseNumbers(options.region, 4, ",", "--region")
    : [0, 0, first.width, first.height];
  const values = pictures.map((p, i) =>
    luminances(crop(p, x, y, width, height, named[i].file)),
  );
  const area = width * height;
  const means = values.map(
    (v) => v.reduce((sum, value) => sum + value, 0) / area,
  );
  const at = (i) =>
    `frame ${i}${named[i].ms === null ? "" : `, +${named[i].ms} ms`}`;
  console.log(
    `frames: ${named.length} of ${first.width} x ${first.height} px; region ${width} x ${height} at ${x},${y} (${area} px)`,
  );
  console.log(
    `mean relative luminance: ${Math.min(...means).toFixed(3)} to ${Math.max(...means).toFixed(3)}`,
  );
  let worst = { count: -1 };
  for (let i = 1; i < values.length; i++) {
    const step = moved(values[i - 1], values[i]);
    if (step.count > worst.count) worst = { ...step, i };
  }
  console.log(
    `moved pixels between consecutive frames, at most ${worst.count} of ${area} (${((worst.count / area) * 100).toFixed(2)} %), frames ${worst.i - 1} and ${worst.i} (${at(worst.i)})`,
  );
  if (scale === null)
    console.log(
      "  no --scale given, so no comparison with the field and the flash threshold of WCAG 2.3.1; give --scale, the frame's width over window.innerWidth",
    );
  else {
    const field = [
      Math.round(FIELD.width * scale),
      Math.round(FIELD.height * scale),
    ];
    const threshold = Math.round(FIELD.threshold * scale * scale);
    console.log(
      `  at most ${busiestField(worst.mask, width, height, field)} of them in one field of ${Math.min(field[0], width)} x ${Math.min(field[1], height)} frame px (${FIELD.width} x ${FIELD.height} screen px at scale ${scale}); WCAG 2.3.1, the source of D-317, gives ${threshold} frame px (${FIELD.threshold} screen px) as the general flash threshold`,
    );
  }
  let apart = { count: -1 };
  for (let i = 1; i < values.length; i++) {
    const step = moved(values[0], values[i]);
    if (step.count > apart.count) apart = { ...step, i };
  }
  console.log(
    `moved pixels against the first frame, at most ${apart.count} of ${area} (${((apart.count / area) * 100).toFixed(2)} %), at ${at(apart.i)}`,
  );
});
