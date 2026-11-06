import hashlib
import os
import shutil

from PIL import Image

# One-off cut of the scene's sprite files into assets/sprites/ of the worktree.
# The mage: each sheet's frames are placed in a common 64 x 64 frame, horizontally centred and
# bottom-aligned, one row per file. The props: copied unchanged from the old Loop's cut pictures,
# each traced to Pixel Crawler (see the report). Refuses to overwrite an existing file.

ROOT = "C:/Storage/repos/loop2-wt/scena-z-ludzikiem"
OUT = ROOT + "/assets/sprites"
PACK = "C:/Storage/repos/loop/assets/pixel-crawler"
OLD = "C:/Storage/repos/loop/public/sprites"
FRAME = 64

MAGE_SHEETS = {
    "mage-idle.png": (PACK + "/Entities/Npc's/Wizzard/Idle/Idle-Sheet.png", 32),
    "mage-run.png": (PACK + "/Entities/Npc's/Wizzard/Run/Run-Sheet.png", 64),
}

PROPS = {
    "fire.png": OLD + "/fire.png",
    "sticks.png": OLD + "/sticks.png",
    "berry-bush.png": OLD + "/bush.png",
    "moss.png": OLD + "/moss.png",
}


def sha(path):
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()


def cut_mage(src, fs):
    with Image.open(src) as im:
        sheet = im.convert("RGBA")
    w, h = sheet.size
    n = w // fs
    out = Image.new("RGBA", (n * FRAME, FRAME), (0, 0, 0, 0))
    x_off = (FRAME - fs) // 2
    y_off = FRAME - fs
    for i in range(n):
        fr = sheet.crop((i * fs, 0, i * fs + fs, fs))
        # Nothing non-transparent may fall outside the frame after placement.
        if fs != FRAME:
            assert fr.getchannel("A").getbbox() is not None
        out.paste(fr, (i * FRAME + x_off, y_off))
    return out, n, (x_off, y_off)


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, src in PROPS.items():
        dst = os.path.join(OUT, name)
        assert not os.path.exists(dst), "refuses to overwrite " + dst
        shutil.copyfile(src, dst)
        assert sha(src) == sha(dst)
        print("copied", name, "from", src.replace(chr(92), "/"))
    for name, (src, fs) in MAGE_SHEETS.items():
        dst = os.path.join(OUT, name)
        assert not os.path.exists(dst), "refuses to overwrite " + dst
        out, n, off = cut_mage(src, fs)
        out.save(dst, format="PNG")
        print("wrote", name, "frames", n, "frame", FRAME, "x", FRAME, "offset", off, "size", out.size)


if __name__ == "__main__":
    main()
