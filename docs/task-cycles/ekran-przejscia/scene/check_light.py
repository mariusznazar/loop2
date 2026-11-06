from PIL import Image
out = Image.open("assets/sprites/forest-scene.png")
g = Image.open("C:/Storage/repos/loop/public/sprites/ground.png").convert("RGB")
# bottom 40 rows hold no sprite: must equal tiled ground exactly
bad = 0
for y in range(112, 152):
    for x in range(336):
        if out.getpixel((x, y)) != g.getpixel((x % 32, y % 32)):
            bad += 1
print("mode", out.mode, "ground mismatches in rows 112-151:", bad)
src = Image.open("C:/Storage/repos/loop/public/sprites/pine_tall.png").convert("RGBA")
# pine_tall at x=246,y=80 (top 4) is the last drawn at that spot: compare its opaque pixels
diff = 0; n = 0
for yy in range(76):
    for xx in range(37):
        p = src.getpixel((xx, yy))
        if p[3] == 255:
            n += 1
            if out.getpixel((246 + xx, 4 + yy)) != p[:3]:
                diff += 1
print("pine_tall opaque px", n, "differing", diff)
