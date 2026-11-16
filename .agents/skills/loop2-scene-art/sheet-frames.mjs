// Frames of a pack's sheet for the scene: cuts a strip of frames out of a sheet with every pixel
// moved unchanged, compares a strip with the sheet pixel by pixel, and measures the figure a
// frame draws.
//
//   node sheet-frames.mjs cut SHEET --at X,Y --frame WxH --count N --out FILE
//   node sheet-frames.mjs compare SHEET --at X,Y --frame WxH --count N FILE
//   node sheet-frames.mjs measure FILE[#W]... [--frame W]
//
// `--at` is the top left pixel of the first frame in the sheet; the N frames of W x H lie side by
// side from there. Two pixels are the same where both are wholly transparent, or where all four
// channels are equal. `measure` takes the frames of each file as W pixels wide, as `#W` after its
// name says, else as `--frame` does, else the whole picture as one frame; it gives the box of the
// visible pixels of each frame and, for the first frame of each file after the first, its size
// against the first file's. A file that cannot be read as a PNG ends the script with a message
// and a non-zero exit code, and `cut` writes nothing then.
import { Refusal, parseArgs, parseNumbers, runCli } from "./cli.mjs";
import { crop, opaqueBox, readPicture, writePicture } from "./image.mjs";

const OPTIONS = { at: "value", frame: "value", count: "value", out: "value" };

function stripRequest(options, label) {
  for (const name of ["at", "frame", "count"])
    if (options[name] === undefined)
      throw new Refusal(`${label} needs --${name}`);
  const [x, y] = parseNumbers(options.at, 2, ",", "--at");
  const [width, height] = parseNumbers(options.frame, 2, "x", "--frame");
  const [count] = parseNumbers(options.count, 1, ",", "--count");
  if (count === 0) throw new Refusal("--count must be at least 1");
  return { x, y, width, height, count };
}

/** The pixels of `strip` that differ from the sheet's strip; each as `{ frame, x, y }`. */
function differences(sheetStrip, strip, { width }) {
  const found = [];
  for (let at = 0; at < sheetStrip.data.length; at += 4) {
    const [a, b] = [
      sheetStrip.data.subarray(at, at + 4),
      strip.data.subarray(at, at + 4),
    ];
    const same =
      (a[3] === 0 && b[3] === 0) || a.every((value, i) => value === b[i]);
    if (same) continue;
    const pixel = at / 4;
    const x = pixel % sheetStrip.width;
    found.push({
      frame: Math.floor(x / width),
      x: x % width,
      y: Math.floor(pixel / sheetStrip.width),
    });
  }
  return found;
}

function compare(sheet, request, file, sheetName) {
  const { x, y, width, height, count } = request;
  const sheetStrip = crop(sheet, x, y, width * count, height, sheetName);
  const strip = readPicture(file);
  if (strip.width !== sheetStrip.width || strip.height !== sheetStrip.height)
    throw new Refusal(
      `${file}: ${strip.width} x ${strip.height} pixels where ${count} frames of ${width} x ${height} are ${sheetStrip.width} x ${sheetStrip.height}`,
    );
  const found = differences(sheetStrip, strip, request);
  const total = sheetStrip.width * sheetStrip.height;
  console.log(`differing pixels: ${found.length} of ${total}`);
  for (const { frame, x: fx, y: fy } of found.slice(0, 5))
    console.log(`  frame ${frame}, pixel ${fx},${fy}`);
  if (found.length > 0) process.exitCode = 1;
}

function measure(files, options) {
  const frameWidth =
    options.frame === undefined
      ? null
      : parseNumbers(options.frame, 1, ",", "--frame")[0];
  let first = null;
  for (const spec of files) {
    const named = /^(.+)#(\d+)$/.exec(spec);
    const file = named ? named[1] : spec;
    const picture = readPicture(file);
    const width = named ? Number(named[2]) : (frameWidth ?? picture.width);
    if (width === 0 || picture.width % width !== 0)
      throw new Refusal(
        `${file}: ${picture.width} pixels wide is no whole number of frames of ${width} pixels`,
      );
    const frames = picture.width / width;
    for (let i = 0; i < frames; i++) {
      const box = opaqueBox(
        crop(picture, i * width, 0, width, picture.height, file),
      );
      if (box === null) {
        console.log(`${file} frame ${i}: no visible pixel`);
        continue;
      }
      const size = { w: box.right - box.left, h: box.bottom - box.top };
      console.log(
        `${file} frame ${i}: figure ${size.w} px wide, ${size.h} px high (x ${box.left}-${box.right}, y ${box.top}-${box.bottom} of its frame of ${width} x ${picture.height})`,
      );
      if (i > 0) continue;
      first ??= { file, ...size };
      if (first.file !== file)
        console.log(
          `  against ${first.file}: height ${(size.h / first.h).toFixed(2)} times, width ${(size.w / first.w).toFixed(2)} times`,
        );
    }
  }
}

await runCli(async (argv) => {
  const { positional, options } = parseArgs(argv, OPTIONS);
  const [command, ...rest] = positional;
  if (command === "measure") {
    if (rest.length === 0) throw new Refusal("measure needs at least one file");
    return measure(rest, options);
  }
  if ({ cut: 1, compare: 2 }[command] !== rest.length)
    throw new Refusal(
      "usage: cut SHEET --at X,Y --frame WxH --count N --out FILE | compare SHEET (same options) FILE | measure FILE[#W]... [--frame W]",
    );
  const request = stripRequest(options, command);
  const sheet = readPicture(rest[0]);
  if (command === "compare") return compare(sheet, request, rest[1], rest[0]);
  if (options.out === undefined) throw new Refusal("cut needs --out");
  const { x, y, width, height, count } = request;
  writePicture(options.out, crop(sheet, x, y, width * count, height, rest[0]));
  compare(sheet, request, options.out, rest[0]);
});
