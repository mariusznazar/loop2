from PIL import Image

# Checks that fire.png equals Bonfire_02-Sheet.png shifted right by one pixel:
# fire[x + 1] == bonfire[x] for x in 0..126, under the alpha-aware rule; and reports column 127 of the source.
FIRE = "C:/Storage/repos/loop2-wt/scena-z-ludzikiem/assets/sprites/fire.png"
SRC = "C:/Storage/repos/loop/assets/pixel-crawler/Environment/Structures/Stations/Bonfire/Bonfire_02-Sheet.png"

with Image.open(FIRE) as im:
    fire = im.convert("RGBA")
with Image.open(SRC) as im:
    src = im.convert("RGBA")

fp = fire.load()
sp = src.load()
mismatch = 0
checked = 0
for y in range(32):
    for x in range(0, 127):
        a = sp[x, y]
        b = fp[x + 1, y]
        checked += 1
        if (a[3] > 0) != (b[3] > 0):
            mismatch += 1
        elif a[3] > 0 and a[:3] != b[:3]:
            mismatch += 1
print("fire vs Bonfire_02 shifted +1: checked", checked, "mismatch", mismatch)
col0 = [fp[0, y][3] for y in range(32)]
print("fire column 0 alpha max", max(col0))
col127 = [sp[127, y][3] for y in range(32)]
print("source column 127 alpha max", max(col127))
