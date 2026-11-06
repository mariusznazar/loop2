"""One-off: compose assets/sprites/forest-scene.png from loop's cut Pixel Crawler sprites.

Layout = DECOR of loop/src/components/probe/Scene.tsx:28, bare tree/sapling taken as snow variants.
Each piece sits at (x, y - h), y being the ground line; for the snow variants h is the real height
of the snow file (the bare ones were 47 and 30 high), so the foot stays on the ground line; pieces drawn in order of y, ties in array order.
Ground = ground.png tiled from (0, 0).
"""
import sys
from PIL import Image

SRC = "C:/Storage/repos/loop/public/sprites/"
W, H = 336, 152
# (file, w, h, x, y) -- bare variants replaced by snow variants
DECOR = [
    ("pine_tall.png", 37, 76, -8, 74),
    ("tree_snow.png", 26, 46, 34, 70),   # was tree_bare
    ("pine_low.png", 45, 47, 60, 78),
    ("pine_tall2.png", 37, 76, 100, 72),
    ("sap_snow.png", 16, 34, 140, 68),   # was sap_bare
    ("pine_low2.png", 45, 47, 166, 76),
    ("tree_snow.png", 26, 46, 212, 72),
    ("pine_tall.png", 37, 76, 246, 80),
    ("pine_low.png", 45, 47, 294, 76),
    ("pine_low.png", 45, 47, 16, 100),
    ("pine_low2.png", 45, 47, 108, 96),
    ("sap_snow.png", 16, 34, 182, 104),  # was sap_bare
]

out = sys.argv[1]
canvas = Image.new("RGBA", (W, H))
tile = Image.open(SRC + "ground.png").convert("RGBA")
for ty in range(0, H, tile.height):
    for tx in range(0, W, tile.width):
        canvas.paste(tile, (tx, ty))

order = sorted(range(len(DECOR)), key=lambda i: (DECOR[i][4], i))
for i in order:
    f, w, h, x, y = DECOR[i]
    im = Image.open(SRC + f).convert("RGBA")
    box = Image.new("RGBA", (w, h))
    box.paste(im.crop((0, 0, w, h)), (0, 0))
    left, top = x, y - h
    # clip to the frame
    cx0, cy0 = max(left, 0), max(top, 0)
    cx1, cy1 = min(left + w, W), min(top + h, H)
    part = box.crop((cx0 - left, cy0 - top, cx1 - left, cy1 - top))
    canvas.alpha_composite(part, (cx0, cy0))

assert canvas.getchannel("A").getextrema() == (255, 255)
rgb = canvas.convert("RGB")
rgb.save(out, format="PNG", optimize=True)
print("saved", out, rgb.size)
