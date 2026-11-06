import os
import sys

from PIL import Image

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
        while pos != -1 and pos + row_s <= base + row_b:
            x = (pos - base) // 4
            if (pos - base) % 4 == 0 and x + sw <= bw:
                ok = True
                for j in range(1, sh):
                    seg = bdata[(y + j) * row_b + x * 4:(y + j) * row_b + x * 4 + row_s]
                    if seg != sdata[j * row_s:(j + 1) * row_s]:
                        ok = False
                        break
                if ok:
                    hits.append((x, y))
            pos = bdata.find(first, pos + 1, base + row_b)
    return hits


templates = sys.argv[1:]
smalls = {}
for t in templates:
    with Image.open(t) as im:
        smalls[t] = im.convert("RGBA")

for root, _dirs, files in os.walk(PACK):
    for name in files:
        if not name.lower().endswith(".png"):
            continue
        path = os.path.join(root, name)
        try:
            with Image.open(path) as im:
                big = im.convert("RGBA")
        except Exception as e:  # noqa: BLE001
            print("skip", path, e)
            continue
        for t, small in smalls.items():
            if big.size[0] < small.size[0] or big.size[1] < small.size[1]:
                continue
            hits = find_in(big, small)
            if hits:
                print(f"MATCH {os.path.basename(t)} in {path.replace(chr(92), '/')} at {hits[:5]} count={len(hits)} pack_size={big.size}")
print("done")
