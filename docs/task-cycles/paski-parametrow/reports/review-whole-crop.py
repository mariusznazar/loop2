"""Crop a box of a screenshot and enlarge it for viewing.

Usage: python crop.py SRC DST LEFT TOP RIGHT BOTTOM SCALE
"""

import sys

from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
left, top, right, bottom, scale = (int(v) for v in sys.argv[3:8])
img = Image.open(src).convert("RGB").crop((left, top, right, bottom))
img = img.resize((img.width * scale, img.height * scale), Image.NEAREST)
img.save(dst)
print(img.width, img.height)
