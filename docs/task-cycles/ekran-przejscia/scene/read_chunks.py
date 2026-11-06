import struct, sys
data = open(sys.argv[1], "rb").read()
assert data[:8] == b"\x89PNG\r\n\x1a\n"
pos, types = 8, []
while pos < len(data):
    n, t = struct.unpack(">I4s", data[pos:pos+8])
    types.append(t.decode("ascii"))
    if t == b"IHDR":
        w, h = struct.unpack(">II", data[pos+8:pos+16]); depth, ctype = data[pos+16], data[pos+17]
    pos += 12 + n
print("size", w, "x", h, "bitdepth", depth, "colortype", ctype)
print("chunks", types)
allowed = {"IHDR", "PLTE", "tRNS", "IDAT", "IEND"}
print("only allowed chunks:", set(types) <= allowed)
