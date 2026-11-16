// Reads and writes PNG with node:zlib alone, no library. A picture is
// `{ width, height, data }` with `data` a Uint8Array of width * height * 4 bytes, one [r, g, b, a]
// per pixel, row after row. A file that is no whole, sound PNG of a kind this reader holds is
// refused with a message naming `label`, and nothing is returned.
import { crc32, deflateSync, inflateSync } from "node:zlib";
import { Refusal } from "./cli.mjs";

const SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];
const MAX_PIXELS = 50_000_000;
// colour type -> [samples per pixel, bit depths this reader holds]
const KINDS = {
  0: [1, [8]],
  2: [3, [8]],
  3: [1, [1, 2, 4, 8]],
  4: [2, [8]],
  6: [4, [8]],
};

export function decodePng(bytes, label) {
  const refuse = (why) => new Refusal(`${label}: ${why}`);
  if (bytes.length < 8 || SIGNATURE.some((value, i) => bytes[i] !== value))
    throw refuse(
      "not a PNG file (its first eight bytes are not the PNG signature)",
    );
  const buffer = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.length);
  const chunks = [];
  let at = 8;
  while (true) {
    if (at + 12 > buffer.length)
      throw refuse("truncated PNG (it ends before its IEND chunk)");
    const length = buffer.readUInt32BE(at);
    const type = buffer.toString("latin1", at + 4, at + 8);
    if (at + 12 + length > buffer.length)
      throw refuse(`truncated PNG (its ${type} chunk is cut short)`);
    const data = buffer.subarray(at + 8, at + 8 + length);
    const stored = buffer.readUInt32BE(at + 8 + length);
    if (crc32(buffer.subarray(at + 4, at + 8 + length)) !== stored)
      throw refuse(`damaged PNG (the checksum of its ${type} chunk is wrong)`);
    chunks.push({ type, data });
    at += 12 + length;
    if (type === "IEND") break;
  }
  if (at !== buffer.length)
    throw refuse("damaged PNG (bytes follow its IEND chunk)");
  if (chunks[0].type !== "IHDR" || chunks[0].data.length !== 13)
    throw refuse("damaged PNG (it does not start with a whole IHDR chunk)");
  const header = chunks[0].data;
  const width = header.readUInt32BE(0);
  const height = header.readUInt32BE(4);
  const [depth, colourType, , filterMethod, interlace] = header.subarray(8, 13);
  const kind = KINDS[colourType];
  if (width === 0 || height === 0) throw refuse("PNG of no size");
  if (width * height > MAX_PIXELS)
    throw refuse(
      `PNG of ${width} x ${height} pixels is larger than this reader takes`,
    );
  if (kind === undefined || !kind[1].includes(depth))
    throw refuse(
      `PNG of colour type ${colourType} and depth ${depth} is not a kind this reader holds`,
    );
  if (filterMethod !== 0 || interlace !== 0)
    throw refuse(
      interlace === 0
        ? "PNG with an unknown filter method"
        : "interlaced PNG is not held",
    );
  const bitsPerPixel = kind[0] * depth;
  const stride = Math.ceil((width * bitsPerPixel) / 8);
  const expected = height * (stride + 1);
  let raw;
  try {
    raw = inflateSync(
      Buffer.concat(chunks.filter((c) => c.type === "IDAT").map((c) => c.data)),
      { maxOutputLength: expected + 1 },
    );
  } catch {
    throw refuse(
      "damaged PNG (its pixel data does not inflate, or is longer than its header asks)",
    );
  }
  if (raw.length !== expected)
    throw refuse(
      `PNG whose pixel data has ${raw.length} bytes where its header of ${width} x ${height} asks ${expected}`,
    );
  const rows = unfilter(
    raw,
    height,
    stride,
    Math.max(1, bitsPerPixel >> 3),
    refuse,
  );
  return toRgba(rows, { width, height, depth, colourType, chunks }, refuse);
}

function unfilter(raw, height, stride, step, refuse) {
  const rows = [];
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    if (filter > 4)
      throw refuse(`damaged PNG (filter type ${filter} in row ${y})`);
    const line = Buffer.from(
      raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)),
    );
    const above = y === 0 ? Buffer.alloc(stride) : rows[y - 1];
    for (let i = 0; i < stride; i++) {
      const left = i < step ? 0 : line[i - step];
      const up = above[i];
      const upLeft = i < step ? 0 : above[i - step];
      line[i] = (line[i] + predictor(filter, left, up, upLeft)) & 255;
    }
    rows.push(line);
  }
  return rows;
}

function predictor(filter, left, up, upLeft) {
  if (filter === 0) return 0;
  if (filter === 1) return left;
  if (filter === 2) return up;
  if (filter === 3) return (left + up) >> 1;
  const estimate = left + up - upLeft;
  const [a, b, c] = [estimate - left, estimate - up, estimate - upLeft].map(
    Math.abs,
  );
  return a <= b && a <= c ? left : b <= c ? up : upLeft;
}

function toRgba(rows, { width, height, depth, colourType, chunks }, refuse) {
  const palette = chunks.find((c) => c.type === "PLTE")?.data;
  const transparency = chunks.find((c) => c.type === "tRNS")?.data;
  if (
    colourType === 3 &&
    (palette === undefined || palette.length % 3 !== 0 || palette.length === 0)
  )
    throw refuse("PNG with a palette that is missing or not whole");
  const data = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++) {
    const line = rows[y];
    for (let x = 0; x < width; x++) {
      const out = (y * width + x) * 4;
      if (colourType === 6) data.set(line.subarray(x * 4, x * 4 + 4), out);
      else if (colourType === 2) {
        data.set(line.subarray(x * 3, x * 3 + 3), out);
        data[out + 3] = hasColourKey(transparency, line, x * 3, 3) ? 0 : 255;
      } else if (colourType === 4) {
        data.fill(line[x * 2], out, out + 3);
        data[out + 3] = line[x * 2 + 1];
      } else if (colourType === 0) {
        data.fill(line[x], out, out + 3);
        data[out + 3] = hasColourKey(transparency, line, x, 1) ? 0 : 255;
      } else {
        const index = indexAt(line, x, depth);
        if (index * 3 + 2 >= palette.length)
          throw refuse(`damaged PNG (the palette has no entry ${index})`);
        data.set(palette.subarray(index * 3, index * 3 + 3), out);
        data[out + 3] = transparency?.[index] ?? 255;
      }
    }
  }
  return { width, height, data };
}

function indexAt(line, x, depth) {
  if (depth === 8) return line[x];
  const perByte = 8 / depth;
  const shift = 8 - depth * ((x % perByte) + 1);
  return (line[Math.floor(x / perByte)] >> shift) & ((1 << depth) - 1);
}

// A tRNS chunk of a grey or true-colour PNG names one colour that is transparent; it holds
// 16-bit samples, of which the low byte is the 8-bit value.
function hasColourKey(transparency, line, from, samples) {
  if (transparency === undefined || transparency.length !== samples * 2)
    return false;
  for (let i = 0; i < samples; i++)
    if (transparency[i * 2] !== 0 || transparency[i * 2 + 1] !== line[from + i])
      return false;
  return true;
}

function chunk(type, data) {
  const head = Buffer.alloc(8);
  head.writeUInt32BE(data.length, 0);
  head.write(type, 4, "latin1");
  const tail = Buffer.alloc(4);
  tail.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), data])), 0);
  return Buffer.concat([head, data, tail]);
}

/** A PNG of 8-bit RGBA with no chunk but IHDR, IDAT and IEND: pixels alone (D-271). */
export function encodePng({ width, height, data }) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header.set([8, 6, 0, 0, 0], 8);
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++)
    raw.set(
      data.subarray(y * width * 4, (y + 1) * width * 4),
      y * (width * 4 + 1) + 1,
    );
  return Buffer.concat([
    Buffer.from(SIGNATURE),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}
