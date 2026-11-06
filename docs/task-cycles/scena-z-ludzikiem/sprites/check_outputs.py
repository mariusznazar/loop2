from PIL import Image

# Own-work check: per-frame alpha bounding boxes of the two mage files in the 64 x 64 frame.
# The figure must reach the bottom row (63) in every frame, and the union centre x must be near 32.
for name, n in (("mage-idle.png", 4), ("mage-run.png", 6)):
    path = "C:/Storage/repos/loop2-wt/scena-z-ludzikiem/assets/sprites/" + name
    with Image.open(path) as im:
        sheet = im.convert("RGBA")
    ux0, uy0, ux1, uy1 = 10**9, 10**9, -1, -1
    rows = []
    for i in range(n):
        fr = sheet.crop((i * 64, 0, i * 64 + 64, 64))
        bb = fr.getchannel("A").getbbox()
        rows.append(bb)
        if bb:
            ux0 = min(ux0, bb[0]); uy0 = min(uy0, bb[1]); ux1 = max(ux1, bb[2]); uy1 = max(uy1, bb[3])
    print(name, "frames", n, "frame 64x64, bboxes", rows)
    print("  union", (ux0, uy0, ux1, uy1), "centre x", (ux0 + ux1) / 2, "bottom row (exclusive)", uy1)
