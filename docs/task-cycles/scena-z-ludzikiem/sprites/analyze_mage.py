from PIL import Image

# Reads the pack's mage sheets and prints the bounding box of the figure in each frame,
# and of the union of all frames of each sheet, to choose one alignment for both sheets.
SHEETS = {
    "idle": ("C:/Storage/repos/loop/assets/pixel-crawler/Entities/Npc's/Wizzard/Idle/Idle-Sheet.png", 32),
    "run": ("C:/Storage/repos/loop/assets/pixel-crawler/Entities/Npc's/Wizzard/Run/Run-Sheet.png", 64),
}

for name, (path, fs) in SHEETS.items():
    with Image.open(path) as im:
        sheet = im.convert("RGBA")
    w, h = sheet.size
    n = w // fs
    print(name, "sheet", sheet.size, "frames", n, "frame", fs, "x", h)
    ux0 = uy0 = 10**9
    ux1 = uy1 = -1
    for i in range(n):
        fr = sheet.crop((i * fs, 0, i * fs + fs, fs))
        bb = fr.getchannel("A").getbbox()
        print("  frame", i, "bbox(alpha)", bb)
        if bb:
            ux0 = min(ux0, bb[0])
            uy0 = min(uy0, bb[1])
            ux1 = max(ux1, bb[2])
            uy1 = max(uy1, bb[3])
    print("  union bbox", (ux0, uy0, ux1, uy1), "centre x", (ux0 + ux1) / 2, "bottom", uy1)
