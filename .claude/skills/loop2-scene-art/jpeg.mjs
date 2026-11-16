// Reads a baseline JPEG, the kind the frames of `loop2-play` are, with no library: 8-bit samples,
// Huffman coded, one scan with every component, any sampling factors, restart intervals. It
// returns the picture as png.mjs does, `{ width, height, data }` of RGBA. A file that is no whole
// JPEG, or one of another kind (progressive, arithmetic coded, four components), is refused with a
// message naming `label`. The colour planes of a frame, half the size of the picture, are enlarged
// by repeating their samples where other readers smooth them, so the colour at a sharp edge can
// differ from theirs by tens of levels, while the brightness of a flat area agrees to a level or
// two: a pixel read here is an approximation, good for a broad area and not for a thin line.
import { Refusal } from "./cli.mjs";

const MAX_PIXELS = 50_000_000;
const ZIGZAG = [
  0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40,
  48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29,
  22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54,
  47, 55, 62, 63,
];
// COSINES[x * 8 + u]: the weight of coefficient u at sample x in the one-dimensional inverse DCT.
const COSINES = Float64Array.from({ length: 64 }, (_, i) => {
  const [x, u] = [i >> 3, i & 7];
  return (
    ((u === 0 ? Math.SQRT1_2 : 1) *
      Math.cos(((2 * x + 1) * u * Math.PI) / 16)) /
    2
  );
});

export function decodeJpeg(bytes, label) {
  const refuse = (why) => new Refusal(`${label}: ${why}`);
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8)
    throw refuse("not a JPEG file (it does not start with the JPEG marker)");
  const state = {
    quant: [],
    dc: [],
    ac: [],
    restart: 0,
    frame: null,
    adobe: null,
  };
  let at = 2;
  while (true) {
    while (bytes[at] === 0xff && bytes[at + 1] === 0xff) at++;
    if (at + 2 > bytes.length || bytes[at] !== 0xff)
      throw refuse("truncated or damaged JPEG (no marker where one is due)");
    const marker = bytes[at + 1];
    at += 2;
    if (marker === 0xd9) throw refuse("JPEG with no image data");
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (at + 2 > bytes.length)
      throw refuse("truncated JPEG (a segment is cut short)");
    const length = (bytes[at] << 8) | bytes[at + 1];
    if (length < 2 || at + length > bytes.length)
      throw refuse("truncated JPEG (a segment is cut short)");
    const segment = bytes.subarray(at + 2, at + length);
    at += length;
    if (marker === 0xda) return scan(bytes, at, segment, state, refuse);
    readSegment(marker, segment, state, refuse);
  }
}

function readSegment(marker, segment, state, refuse) {
  if (marker === 0xdb) readQuantTables(segment, state, refuse);
  else if (marker === 0xc4) readHuffmanTables(segment, state, refuse);
  else if (marker === 0xdd) state.restart = (segment[0] << 8) | segment[1];
  else if (
    marker === 0xee &&
    segment.length >= 12 &&
    String.fromCharCode(...segment.subarray(0, 5)) === "Adobe"
  )
    state.adobe = segment[11];
  else if (marker === 0xc0 || marker === 0xc1)
    readFrame(segment, state, refuse);
  else if (marker === 0xc2)
    throw refuse(
      "progressive JPEG is not held; the frames of loop2-play are baseline",
    );
  else if (
    marker >= 0xc3 &&
    marker <= 0xcf &&
    marker !== 0xc4 &&
    marker !== 0xc8 &&
    marker !== 0xcc
  )
    throw refuse(
      "this kind of JPEG is not held (only baseline, Huffman coded)",
    );
}

function readQuantTables(segment, state, refuse) {
  for (let at = 0; at < segment.length;) {
    const wide = segment[at] >> 4 === 1;
    const id = segment[at] & 15;
    const size = wide ? 128 : 64;
    if (id > 3 || at + 1 + size > segment.length)
      throw refuse("damaged JPEG (a quantization table)");
    state.quant[id] = Array.from({ length: 64 }, (_, k) =>
      wide
        ? (segment[at + 1 + k * 2] << 8) | segment[at + 2 + k * 2]
        : segment[at + 1 + k],
    );
    at += 1 + size;
  }
}

function readHuffmanTables(segment, state, refuse) {
  for (let at = 0; at < segment.length;) {
    const [kind, id] = [segment[at] >> 4, segment[at] & 15];
    const counts = Array.from(segment.subarray(at + 1, at + 17));
    const total = counts.reduce((sum, n) => sum + n, 0);
    if (
      counts.length < 16 ||
      kind > 1 ||
      id > 3 ||
      at + 17 + total > segment.length
    )
      throw refuse("damaged JPEG (a Huffman table)");
    const table = huffmanTable(
      counts,
      segment.subarray(at + 17, at + 17 + total),
    );
    (kind === 0 ? state.dc : state.ac)[id] = table;
    at += 17 + total;
  }
}

function huffmanTable(counts, symbols) {
  const maxcode = new Int32Array(17).fill(-1);
  const mincode = new Int32Array(17);
  const valptr = new Int32Array(17);
  let code = 0;
  let k = 0;
  for (let len = 1; len <= 16; len++) {
    valptr[len] = k;
    mincode[len] = code;
    code += counts[len - 1];
    k += counts[len - 1];
    maxcode[len] = counts[len - 1] ? code - 1 : -1;
    code <<= 1;
  }
  return { maxcode, mincode, valptr, symbols };
}

function readFrame(segment, state, refuse) {
  if (state.frame) throw refuse("JPEG with two frames is not held");
  const [precision, count] = [segment[0], segment[5]];
  const height = (segment[1] << 8) | segment[2];
  const width = (segment[3] << 8) | segment[4];
  if (precision !== 8)
    throw refuse(`JPEG of ${precision}-bit samples is not held`);
  if (width === 0 || height === 0)
    throw refuse("JPEG of no size, or of a height given after the scan");
  if (width * height > MAX_PIXELS)
    throw refuse(
      `JPEG of ${width} x ${height} pixels is larger than this reader takes`,
    );
  if ((count !== 1 && count !== 3) || segment.length < 6 + count * 3)
    throw refuse(
      `JPEG of ${count} components is not held (grey or YCbCr only)`,
    );
  const components = Array.from({ length: count }, (_, i) => {
    const [id, sampling, table] = segment.subarray(6 + i * 3, 9 + i * 3);
    return {
      id,
      h: count === 1 ? 1 : sampling >> 4,
      v: count === 1 ? 1 : sampling & 15,
      table,
    };
  });
  if (components.some((c) => c.h < 1 || c.h > 4 || c.v < 1 || c.v > 4))
    throw refuse("damaged JPEG (a sampling factor)");
  state.frame = { width, height, components };
}

function scan(bytes, start, header, state, refuse) {
  const { frame } = state;
  if (!frame) throw refuse("damaged JPEG (a scan before its frame)");
  const count = header[0];
  if (count !== frame.components.length)
    throw refuse("JPEG whose scans split its components is not held");
  const { width, height, components } = frame;
  const hmax = Math.max(...components.map((c) => c.h));
  const vmax = Math.max(...components.map((c) => c.v));
  const mcusAcross = Math.ceil(width / (8 * hmax));
  const mcusDown = Math.ceil(height / (8 * vmax));
  for (let i = 0; i < count; i++) {
    const component = components.find((c) => c.id === header[1 + i * 2]);
    const tables = header[2 + i * 2];
    if (!component)
      throw refuse("damaged JPEG (a scan names a component the frame lacks)");
    component.dcTable = state.dc[tables >> 4];
    component.acTable = state.ac[tables & 15];
    component.quant = state.quant[component.table];
    if (!component.dcTable || !component.acTable || !component.quant)
      throw refuse("damaged JPEG (a scan uses a table that was never given)");
    component.previous = 0;
    component.stride = mcusAcross * component.h * 8;
    component.plane = new Uint8Array(
      component.stride * mcusDown * component.v * 8,
    );
  }
  const reader = bitReader(bytes, start, refuse);
  const restart = state.restart;
  let mcu = 0;
  for (let row = 0; row < mcusDown; row++) {
    for (let column = 0; column < mcusAcross; column++, mcu++) {
      if (restart && mcu > 0 && mcu % restart === 0) {
        reader.restart();
        for (const c of components) c.previous = 0;
      }
      for (const c of components) {
        for (let v = 0; v < c.v; v++)
          for (let h = 0; h < c.h; h++)
            block(reader, c, (column * c.h + h) * 8, (row * c.v + v) * 8);
      }
    }
  }
  reader.end();
  return toRgba(frame, hmax, vmax, state.adobe === 0);
}

function bitReader(bytes, start, refuse) {
  let at = start;
  let buffer = 0;
  let held = 0;
  const bit = () => {
    if (held === 0) {
      if (at >= bytes.length)
        throw refuse("truncated JPEG (its image data ends early)");
      buffer = bytes[at++];
      if (buffer === 0xff) {
        if (bytes[at] === 0) at++;
        else
          throw refuse(
            "damaged or truncated JPEG (a marker inside its image data)",
          );
      }
      held = 8;
    }
    held--;
    return (buffer >> held) & 1;
  };
  return {
    refuse,
    bit,
    bits(n) {
      let value = 0;
      for (let i = 0; i < n; i++) value = (value << 1) | bit();
      return value;
    },
    // After the last block the end marker stands, whole: a file cut after its data has none.
    end() {
      held = 0;
      while (bytes[at] === 0xff && bytes[at + 1] === 0xff) at++;
      if (bytes[at] !== 0xff || bytes[at + 1] !== 0xd9)
        throw refuse("truncated JPEG (its end marker is missing)");
    },
    // After a restart interval the entropy data stops at a byte boundary and a marker D0 to D7 stands.
    restart() {
      held = 0;
      while (bytes[at] === 0xff && bytes[at + 1] === 0xff) at++;
      if (bytes[at] !== 0xff || bytes[at + 1] < 0xd0 || bytes[at + 1] > 0xd7)
        throw refuse("damaged or truncated JPEG (a restart marker is missing)");
      at += 2;
    },
  };
}

function symbol(reader, table, refuse) {
  let code = 0;
  for (let len = 1; len <= 16; len++) {
    code = (code << 1) | reader.bit();
    if (table.maxcode[len] >= 0 && code <= table.maxcode[len])
      return table.symbols[table.valptr[len] + code - table.mincode[len]];
  }
  throw refuse("damaged JPEG (a code no Huffman table holds)");
}

function extend(value, size) {
  return value < 1 << (size - 1) ? value - (1 << size) + 1 : value;
}

function block(reader, component, x0, y0) {
  const { refuse } = reader;
  const coefficients = new Float64Array(64);
  const size = symbol(reader, component.dcTable, refuse);
  component.previous += size === 0 ? 0 : extend(reader.bits(size), size);
  coefficients[0] = component.previous * component.quant[0];
  let alternating = false;
  for (let k = 1; k < 64;) {
    const rs = symbol(reader, component.acTable, refuse);
    const [run, length] = [rs >> 4, rs & 15];
    if (length === 0) {
      if (run !== 15) break;
      k += 16;
      continue;
    }
    k += run;
    if (k > 63)
      throw refuse("damaged JPEG (a block runs past its 64 coefficients)");
    coefficients[ZIGZAG[k]] =
      extend(reader.bits(length), length) * component.quant[k];
    alternating = true;
    k++;
  }
  inverseDct(coefficients, alternating, component, x0, y0);
}

function inverseDct(coefficients, alternating, { plane, stride }, x0, y0) {
  if (!alternating) {
    const flat = clamp(coefficients[0] / 8 + 128);
    for (let y = 0; y < 8; y++)
      plane.fill(flat, (y0 + y) * stride + x0, (y0 + y) * stride + x0 + 8);
    return;
  }
  const rows = new Float64Array(64);
  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 8; x++) {
      let sum = 0;
      for (let u = 0; u < 8; u++)
        sum += COSINES[x * 8 + u] * coefficients[y * 8 + u];
      rows[y * 8 + x] = sum;
    }
  for (let x = 0; x < 8; x++)
    for (let y = 0; y < 8; y++) {
      let sum = 0;
      for (let v = 0; v < 8; v++) sum += COSINES[y * 8 + v] * rows[v * 8 + x];
      plane[(y0 + y) * stride + x0 + x] = clamp(sum + 128);
    }
}

const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));

function toRgba({ width, height, components }, hmax, vmax, rgbStored) {
  const data = new Uint8Array(width * height * 4);
  const sample = (c, x, y) =>
    c.plane[
      Math.floor((y * c.v) / vmax) * c.stride + Math.floor((x * c.h) / hmax)
    ];
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const out = (y * width + x) * 4;
      const first = sample(components[0], x, y);
      if (components.length === 1) data.fill(first, out, out + 3);
      else {
        const second = sample(components[1], x, y);
        const third = sample(components[2], x, y);
        if (rgbStored) data.set([first, second, third], out);
        else
          data.set(
            [
              clamp(first + 1.402 * (third - 128)),
              clamp(
                first - 0.344136 * (second - 128) - 0.714136 * (third - 128),
              ),
              clamp(first + 1.772 * (second - 128)),
            ],
            out,
          );
      }
      data[out + 3] = 255;
    }
  return { width, height, data };
}
