"""Composes the picture of the game behind the login card of loop2 (task logowanie-na-tle-gry).

Run once, outside the product, with Python 3 and Pillow:

    python3 compose.py <pack directory> <output PNG>

where <pack directory> is `assets/pixel-crawler/` of the repository loop (read only) and the
output is `assets/sprites/login-backdrop.png` of loop2. The script is not part of the product
(Q1 of the cycle): the product holds only the PNG it writes.

What it draws, at the pack's own pixel size, 480 x 270 (16:9): a snow-covered clearing tiled
from the pack's snow floor, winter trees of the pack's Model_01 around it, a bonfire burning on
the left and the pack's wizard standing at its left, facing it. Night is the whole picture
multiplied by a dark blue light, warmed around the fire, then dimmed once more so the card's
solid panel stands out. Nothing moves: one frame of each animated sheet.

Every pack file and region it takes stands in SOURCES below; nothing else of the pack is read.
The fire and the wizard stand around x = 84, 17.5 % of the width, which the stylesheet aligns
with 17.5 % of the window (background-position), so that from a 1280 px wide window they stand in
the strip left of the 400 px card whatever the window's height (see the report).

The output holds pixels alone: an RGB PNG with only the chunks IHDR, IDAT and IEND.
"""

import sys
import zlib
from pathlib import Path

from PIL import Image

WIDTH, HEIGHT = 480, 270

# name: (file of the pack, region (left, top, right, bottom) in that file's pixels)
SOURCES = {
    "snow": ("Environment/Tilesets/Floors_Tiles.png", (0, 352, 80, 384)),
    "tree_xl_a": ("Environment/Props/Static/Trees/Model_01/Size_05.png", (337, 2, 437, 160)),
    "tree_xl_b": ("Environment/Props/Static/Trees/Model_01/Size_05.png", (337, 162, 437, 320)),
    "tree_l_a": ("Environment/Props/Static/Trees/Model_01/Size_04.png", (246, 2, 315, 128)),
    "tree_l_b": ("Environment/Props/Static/Trees/Model_01/Size_04.png", (246, 130, 315, 256)),
    "tree_m_a": ("Environment/Props/Static/Trees/Model_01/Size_03.png", (144, 0, 192, 96)),
    "tree_m_b": ("Environment/Props/Static/Trees/Model_01/Size_03.png", (144, 96, 192, 192)),
    "tree_s": ("Environment/Props/Static/Trees/Model_01/Size_02.png", (225, 18, 251, 64)),
    "stump": ("Environment/Props/Static/Trees/Model_01/Size_05.png", (247, 326, 308, 368)),
    "bonfire": ("Environment/Structures/Stations/Bonfire/Bonfire_02-Sheet.png", (0, 0, 32, 32)),
    "flame": ("Environment/Structures/Stations/Bonfire/Fire_01-Sheet.png", (0, 0, 32, 48)),
    "wizard": ("Entities/Npc's/Wizzard/Idle/Idle-Sheet.png", (0, 0, 32, 32)),
}

# (sprite, x of its centre, y of its base); drawn from the back (smaller base y) to the front.
TREES = [
    ("tree_l_a", 22, 64), ("tree_m_b", 70, 52), ("tree_xl_b", 150, 96), ("tree_m_a", 214, 40),
    ("tree_l_b", 268, 70), ("tree_xl_a", 340, 88), ("tree_m_b", 404, 46), ("tree_l_a", 462, 76),
    ("tree_s", 120, 104), ("tree_s", 300, 112),
    ("tree_xl_a", 2, 214), ("tree_l_b", 190, 196), ("tree_m_a", 236, 150), ("tree_s", 30, 132),
    ("tree_l_a", 300, 176), ("tree_xl_b", 392, 196), ("tree_m_b", 458, 150), ("tree_s", 160, 236),
    ("stump", 150, 188), ("tree_xl_a", 168, 334), ("tree_l_b", 238, 292), ("tree_xl_b", 330, 300),
    ("tree_l_a", 440, 290), ("tree_s", 360, 240), ("tree_m_a", 40, 276),
]

FIRE = (100, 170)    # centre and base of the bonfire
WIZARD = (70, 168)   # centre and base of the wizard

AMBIENT = (0.26, 0.30, 0.48)   # night: the share of each channel left away from the fire
GLOW = (1.05, 0.62, 0.30)      # the fire's light added at its centre, falling off with distance
GLOW_RADIUS = 90.0
DIM = 0.72                     # the last dimming of the whole picture


def take(pack, name):
    file, region = SOURCES[name]
    return Image.open(pack / file).convert("RGBA").crop(region)


def place(canvas, sprite, centre_x, base_y):
    """Draws `sprite` over the canvas, its base centred at (centre_x, base_y); what falls outside
    the canvas is cut off."""
    left, top = centre_x - sprite.width // 2, base_y - sprite.height
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    layer.paste(sprite, (left, top), sprite)
    canvas.alpha_composite(layer)


def compose(pack):
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 255))
    snow = take(pack, "snow")
    for y in range(0, HEIGHT, snow.height):
        for x in range(0, WIDTH, snow.width):
            canvas.alpha_composite(snow, (x, y))

    things = [(name, x, y) for name, x, y in TREES]
    things.append(("bonfire", *FIRE))
    things.append(("wizard", *WIZARD))
    for name, x, y in sorted(things, key=lambda t: t[2]):
        place(canvas, take(pack, name), x, y)
        if name == "bonfire":
            place(canvas, take(pack, "flame"), x, y - 6)

    light = canvas.convert("RGB")
    pixels = light.load()
    fire_x, fire_y = FIRE[0], FIRE[1] - 12
    for y in range(HEIGHT):
        for x in range(WIDTH):
            distance = ((x - fire_x) ** 2 + ((y - fire_y) * 1.3) ** 2) ** 0.5
            warmth = max(0.0, 1.0 - distance / GLOW_RADIUS) ** 2
            r, g, b = pixels[x, y]
            pixels[x, y] = tuple(
                min(255, round(c * (a + w * warmth) * DIM))
                for c, a, w in zip((r, g, b), AMBIENT, GLOW, strict=True))
    return light


def png_chunks(path):
    data = path.read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n"
    names, at = [], 8
    while at < len(data):
        length = int.from_bytes(data[at:at + 4], "big")
        name = data[at + 4:at + 8]
        body = data[at + 8:at + 8 + length]
        crc = int.from_bytes(data[at + 8 + length:at + 12 + length], "big")
        assert zlib.crc32(name + body) == crc
        names.append(name.decode("ascii"))
        at += 12 + length
    return names


def main():
    pack, output = Path(sys.argv[1]), Path(sys.argv[2])
    picture = compose(pack)
    output.parent.mkdir(parents=True, exist_ok=True)
    picture.save(output, format="PNG", optimize=True)
    chunks = png_chunks(output)
    assert set(chunks) == {"IHDR", "IDAT", "IEND"}, chunks
    print(output, picture.size, picture.mode, output.stat().st_size, "bytes", chunks)


if __name__ == "__main__":
    main()
