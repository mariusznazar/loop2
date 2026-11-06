import os
import sys

from PIL import Image

# Usage: find_frames.py FRAME_W FRAME_H SHEET
# Splits SHEET into frames of FRAME_W x FRAME_H (one row, left to right) and searches the whole pack
# for an exact pixel match of each frame (RGBA, alpha included).
PACK = "C:/Storage/repos/loop/assets/pixel-crawler"


def find_in(big, small):
    bw, bh = big.size
    sw, sh = small.size
    if sw > bw or sh > bh:
        return []
    bdata = big.tobytes()
    sdata = small.tobytes()
    row_b = bw * 4
    row_s = sw * 4
    first = sdata[:row_s]
    hits = []
    for y in range(bh - sh + 1):
        base = y * row_b
        pos = bdata.find(first, base, base + row_b)
        while pos != -1:
            if (pos - base) % 4 == 0:
                x = (pos - base) // 4
                if x + sw <= bw:
                    ok = True
                    for j in range(1, sh):
                        s = (y + j) * row_b + x * 4
                        if bdata[s:s + row_s] != sdata[j * row_s:(j + 1) * row_s]:
                            ok = False
                            break
                    if ok:
                        hits.append((x, y))
            pos = bdata.find(first, pos + 1, base + row_b)
    return hits


fw = int(sys.argv[1])
fh = int(sys.argv[2])
sheet_path = sys.argv[3]
with Image.open(sheet_path) as im:
    sheet = im.convert("RGBA")
n = sheet.size[0] // fw
frames = []
for i in range(n):
    frames.append((i, sheet.crop((i * fw, 0, i * fw + fw, fh))))

found = {i: [] for i, _ in frames}
for root, _dirs, files in os.walk(PACK):
    for name in files:
        if not name.lower().endswith(".png"):
            continue
        path = os.path.join(root, name)
        try:
            with Image.open(path) as im:
                big = im.convert("RGBA")
        except Exception:  # noqa: BLE001
            continue
        for i, fr in frames:
            hits = find_in(big, fr)
            for h in hits:
                found[i].append((path.replace(chr(92), "/"), h, big.size))

for i, _ in frames:
    print("frame", i, "matches", len(found[i]))
    for m in found[i][:6]:
        print("   ", m)
print("done")
