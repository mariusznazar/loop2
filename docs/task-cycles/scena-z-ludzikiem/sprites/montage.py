import sys

from PIL import Image

# Usage: montage.py OUT SCALE PATH... ; places the images side by side on a grey ground, scaled up.
out = sys.argv[1]
scale = int(sys.argv[2])
paths = sys.argv[3:]
imgs = []
for p in paths:
    with Image.open(p) as im:
        imgs.append(im.convert("RGBA").resize((im.size[0] * scale, im.size[1] * scale), Image.NEAREST))
W = sum(i.size[0] for i in imgs) + 16 * (len(imgs) + 1)
H = max(i.size[1] for i in imgs) + 32
canvas = Image.new("RGBA", (W, H), (90, 90, 90, 255))
x = 16
for i in imgs:
    canvas.alpha_composite(i, (x, 16))
    x += i.size[0] + 16
canvas.save(out)
print("saved", out, canvas.size)
