"""What the tests of the loop2-scene-art skill share: pictures written and read with the standard
library alone, so that the scripts of the skill are tried on inputs they did not make, and a way to
run a script of the skill. Standard library only, with Node.js for the scripts."""

import os
import struct
import subprocess
import zlib

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SKILL = os.path.join(ROOT, ".claude", "skills", "loop2-scene-art")
SPRITES = os.path.join(ROOT, "assets", "sprites")
SIGNATURE = b"\x89PNG\r\n\x1a\n"


def chunk(kind, data):
    body = kind + data
    return struct.pack(">I", len(data)) + body + struct.pack(">I", zlib.crc32(body))


def png_bytes(width, height, rows, colour_type=6, depth=8, interlace=0, raw=None):
    """A PNG of 8-bit RGBA (or of the colour type given, with `raw` the rows' bytes) from rows of
    (r, g, b, a) tuples; `raw`, where given, is the filtered image data as it is stored."""
    if raw is None:
        raw = b"".join(b"\x00" + bytes(v for pixel in row for v in pixel) for row in rows)
    header = struct.pack(">IIBBBBB", width, height, depth, colour_type, 0, 0, interlace)
    return SIGNATURE + chunk(b"IHDR", header) + chunk(b"IDAT", zlib.compress(raw)) + chunk(b"IEND", b"")


def write_png(directory, name, rows):
    path = os.path.join(directory, name)
    with open(path, "wb") as handle:
        handle.write(png_bytes(len(rows[0]), len(rows), rows))
    return path


def write_bytes(directory, name, content):
    path = os.path.join(directory, name)
    with open(path, "wb") as handle:
        handle.write(content)
    return path


def read_png(path):
    """The rows of (r, g, b, a) of an 8-bit RGBA PNG file, and the types of its chunks."""
    with open(path, "rb") as handle:
        data = handle.read()
    assert data[:8] == SIGNATURE, "not a PNG"
    at, kinds, idat, header = 8, [], b"", None
    while at < len(data):
        length = struct.unpack(">I", data[at:at + 4])[0]
        kind = data[at + 4:at + 8]
        kinds.append(kind.decode("latin1"))
        if kind == b"IHDR":
            header = struct.unpack(">IIBBBBB", data[at + 8:at + 21])
        if kind == b"IDAT":
            idat += data[at + 8:at + 8 + length]
        at += 12 + length
    width, height, depth, colour_type, _, _, interlace = header
    assert (depth, colour_type, interlace) == (8, 6, 0), "the script writes 8-bit RGBA, not interlaced"
    raw, stride, rows, above = zlib.decompress(idat), width * 4, [], bytes(width * 4)
    for y in range(height):
        filter_type = raw[y * (stride + 1)]
        line = bytearray(raw[y * (stride + 1) + 1:(y + 1) * (stride + 1)])
        for i in range(stride):
            left = line[i - 4] if i >= 4 else 0
            up = above[i]
            up_left = above[i - 4] if i >= 4 else 0
            guess = left + up - up_left
            near_left, near_up, near_corner = abs(guess - left), abs(guess - up), abs(guess - up_left)
            if near_left <= near_up and near_left <= near_corner:
                nearest = left
            else:
                nearest = up if near_up <= near_corner else up_left
            line[i] = (line[i] + [0, left, up, (left + up) // 2, nearest][filter_type]) & 255
        rows.append([tuple(line[x * 4:x * 4 + 4]) for x in range(width)])
        above = bytes(line)
    return rows, kinds


def run_script(name, *args, cwd=None, stdin=None):
    return subprocess.run(["node", os.path.join(SKILL, name), *args], cwd=cwd, input=stdin,
                          capture_output=True, text=True, encoding="utf-8", timeout=60, check=False)


def run_script_text(source, *args):
    """Runs a piece of ES module code with Node.js, given on standard input, with the arguments."""
    return subprocess.run(["node", "--input-type=module", "-", *args], input=source, capture_output=True,
                          text=True, encoding="utf-8", timeout=60, check=False)
