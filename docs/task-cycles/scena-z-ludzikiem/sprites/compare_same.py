import glob
import sys

from PIL import Image

# Compares the template with every PNG of the same size in the given glob directory.
# Reports the number of pixels differing under the alpha-aware rule.
template_path = sys.argv[1]
pattern = sys.argv[2]

with Image.open(template_path) as im:
    tpl = im.convert("RGBA")
tp = list(tpl.getdata())
for path in sorted(glob.glob(pattern, recursive=True)):
    with Image.open(path) as im:
        if im.size != tpl.size:
            continue
        big = list(im.convert("RGBA").getdata())
    diff = 0
    for a, b in zip(tp, big):
        if (a[3] > 0) != (b[3] > 0):
            diff += 1
        elif a[3] > 0 and a[:3] != b[:3]:
            diff += 1
    print(diff, path.replace(chr(92), "/"))
print("done")
