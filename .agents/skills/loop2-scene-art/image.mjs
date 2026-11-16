// Reading and writing pictures for the scripts of this skill, and the small pixel helpers they
// share. A picture is `{ width, height, data }` of RGBA, as png.mjs gives it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { Refusal } from "./cli.mjs";
import { decodeJpeg } from "./jpeg.mjs";
import { decodePng, encodePng } from "./png.mjs";

/** Reads a PNG or a JPEG file, whichever its first bytes say it is. */
export function readPicture(path) {
  let bytes;
  try {
    bytes = readFileSync(path);
  } catch (error) {
    throw new Refusal(`${path}: cannot be read (${error.code ?? error.name})`);
  }
  return bytes[0] === 0xff && bytes[1] === 0xd8
    ? decodeJpeg(bytes, path)
    : decodePng(bytes, path);
}

/** Writes the picture as a PNG with pixels alone; the folder is made where it is missing. */
export function writePicture(path, picture) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, encodePng(picture));
}

export const pixelAt = ({ width, data }, x, y) => {
  const at = (y * width + x) * 4;
  return [data[at], data[at + 1], data[at + 2], data[at + 3]];
};

/** The part of a picture inside the rectangle, which must lie wholly inside it. */
export function crop(picture, x, y, width, height, label) {
  if (
    x + width > picture.width ||
    y + height > picture.height ||
    width === 0 ||
    height === 0
  )
    throw new Refusal(
      `${label}: the rectangle ${width} x ${height} at ${x},${y} does not lie inside the picture of ${picture.width} x ${picture.height}`,
    );
  const data = new Uint8Array(width * height * 4);
  for (let row = 0; row < height; row++) {
    const from = ((y + row) * picture.width + x) * 4;
    data.set(picture.data.subarray(from, from + width * 4), row * width * 4);
  }
  return { width, height, data };
}

/** The box of the pixels that are not wholly transparent, or null where there are none. */
export function opaqueBox({ width, height, data }) {
  let box = null;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] === 0) continue;
      box ??= { left: x, top: y, right: x + 1, bottom: y + 1 };
      box.left = Math.min(box.left, x);
      box.top = Math.min(box.top, y);
      box.right = Math.max(box.right, x + 1);
      box.bottom = Math.max(box.bottom, y + 1);
    }
  return box;
}

/** The colour as "#rrggbb". */
export const hex = ([r, g, b]) =>
  `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;

export function parseHex(text, what) {
  if (!/^#[0-9a-fA-F]{6}$/.test(text))
    throw new Refusal(
      `${what} must be a colour written #rrggbb, got "${text}"`,
    );
  return [1, 3, 5].map((at) => parseInt(text.slice(at, at + 2), 16));
}

/** The distinct colours of the pixels that are not wholly transparent, with their pixel counts. */
export function coloursOf({ data }) {
  const counts = new Map();
  for (let at = 0; at < data.length; at += 4) {
    if (data[at + 3] === 0) continue;
    const key = hex(data.subarray(at, at + 3));
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

/** "file.png@12,34" as the file and the pixel it names. */
export function parseSpot(text, what) {
  const at = text.lastIndexOf("@");
  const place = at < 0 ? null : /^(\d+),(\d+)$/.exec(text.slice(at + 1));
  if (!place)
    throw new Refusal(`${what} must be written file@x,y, got "${text}"`);
  return { file: text.slice(0, at), x: Number(place[1]), y: Number(place[2]) };
}
