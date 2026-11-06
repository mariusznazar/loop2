import struct
import sys

from PIL import Image


def chunks(path):
    with open(path, "rb") as f:
        data = f.read()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", "not a PNG: " + path
    pos = 8
    out = []
    while pos < len(data):
        (length,) = struct.unpack(">I", data[pos:pos + 4])
        ctype = data[pos + 4:pos + 8].decode("latin-1")
        out.append((ctype, length))
        pos += 12 + length
    return out, len(data)


for path in sys.argv[1:]:
    cs, size = chunks(path)
    with Image.open(path) as im:
        w, h = im.size
        mode = im.mode
    names = " ".join(f"{c}({n})" for c, n in cs)
    print(f"{path} bytes={size} size={w}x{h} mode={mode} chunks={names}")
