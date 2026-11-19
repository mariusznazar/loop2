"""Every script of the loop2-scene-art skill reads pictures that come from outside the repository,
the sheets of a pack and the frames of a run. Each refuses a PNG that is no whole, sound PNG with a
message naming the file and a non-zero exit code, and writes no output file. Standard library only,
with Node.js for the scripts."""

import os
import struct
import tempfile
import unittest
import zlib

import scene_art_support as support

GOOD_ROWS = [[(i * 30, j * 60, 7, 255) for i in range(4)] for j in range(3)]


def bad_pngs():
    """Each kind of PNG the readers refuse, as bytes, with the words the message holds."""
    good = support.png_bytes(4, 3, GOOD_ROWS)
    flipped = bytearray(good)
    flipped[-20] ^= 0xFF  # a byte of the IDAT chunk's checksum
    rows_of_three = b"".join(b"\x00" + bytes(12) for _ in range(3))
    return {
        "a file that is no PNG": (b"GIF89a" + bytes(40), "not a PNG file"),
        "an empty file": (b"", "not a PNG file"),
        "a PNG cut short": (good[:-20], "truncated PNG"),
        "a PNG cut inside its header": (good[:20], "truncated PNG"),
        "a PNG whose checksum is wrong": (bytes(flipped), "checksum"),
        "bytes after the end": (good + b"\x00\x00", "bytes follow its IEND"),
        "pixel data of another size than the header": (
            support.png_bytes(4, 3, None, raw=rows_of_three),
            "pixel data has 39 bytes where its header of 4 x 3 asks 51",
        ),
        "a PNG with a second header": (
            support.SIGNATURE
            + support.chunk(b"IHDR", struct.pack(">IIBBBBB", 4, 3, 8, 6, 0, 0, 0)) * 2
            + support.chunk(b"IDAT", zlib.compress(bytes(17 * 3)))
            + support.chunk(b"IEND", b""),
            "more than one IHDR",
        ),
        "a PNG of no width": (support.png_bytes(0, 3, None, raw=b""), "PNG of no size"),
        "an interlaced PNG": (
            support.png_bytes(4, 3, GOOD_ROWS, interlace=1),
            "interlaced PNG is not held",
        ),
        "a PNG of 16 bits": (
            support.png_bytes(4, 3, GOOD_ROWS, depth=16),
            "colour type 6 and depth 16",
        ),
        "pixel data that is no zlib stream": (
            support.SIGNATURE
            + support.chunk(b"IHDR", struct.pack(">IIBBBBB", 4, 3, 8, 6, 0, 0, 0))
            + support.chunk(b"IDAT", b"not a zlib stream")
            + support.chunk(b"IEND", b""),
            "does not inflate",
        ),
        "data that stops being a stream": (
            support.SIGNATURE
            + support.chunk(b"IHDR", struct.pack(">IIBBBBB", 4, 3, 8, 6, 0, 0, 0))
            + support.chunk(b"IDAT", zlib.compress(bytes(2000)))
            + support.chunk(b"IEND", b""),
            "longer than its header asks",
        ),
    }


def commands(bad, good, out):
    """The command of each script that takes `bad` as an input, with the file it would write."""
    return {
        "sheet-frames cut": (
            [
                "sheet-frames.mjs",
                "cut",
                bad,
                "--at",
                "0,0",
                "--frame",
                "2x2",
                "--count",
                "1",
                "--out",
                out,
            ],
            out,
        ),
        "sheet-frames compare": (
            [
                "sheet-frames.mjs",
                "compare",
                good,
                "--at",
                "0,0",
                "--frame",
                "2x2",
                "--count",
                "1",
                bad,
            ],
            None,
        ),
        "sheet-frames measure": (["sheet-frames.mjs", "measure", bad], None),
        "recolor input": (["recolor.mjs", bad, out, "--map", "#000000=#ffffff"], out),
        "recolor palette": (
            ["recolor.mjs", good, out, "--map", "#000000=#ffffff", "--palette", bad],
            out,
        ),
        "grid to-grid": (["grid.mjs", "to-grid", bad, out], out),
        "contrast effect": (["contrast.mjs", "--effect", bad, "--ground", "#ffffff"], None),
        "contrast ground": (
            ["contrast.mjs", "--effect", "#000000", "--ground", bad + "@0,0"],
            None,
        ),
        "preview scene": (
            ["preview.mjs", "--scene", bad, "--put", good + "@0,0", "--out", out],
            out,
        ),
        "preview put": (["preview.mjs", "--scene", good, "--put", bad + "@0,0", "--out", out], out),
        "flashes frame": (["flashes.mjs", good, bad], None),
    }


class Refusals(unittest.TestCase):
    def test_each_script_refuses_each_unsound_png_with_a_message_naming_the_file_and_writes_nothing(
        self,
    ):
        with tempfile.TemporaryDirectory() as directory:
            good = support.write_png(directory, "good.png", GOOD_ROWS)
            for kind, (content, said) in bad_pngs().items():
                bad = support.write_bytes(directory, "bad.png", content)
                for script, (arguments, written) in commands(
                    bad, good, os.path.join(directory, "out.png")
                ).items():
                    if script == "grid to-grid":
                        written = os.path.join(directory, "out.png")
                    with self.subTest(kind=kind, script=script):
                        result = support.run_script(*arguments)
                        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
                        self.assertTrue(result.stderr.startswith("error: "), result.stderr)
                        self.assertIn("bad.png", result.stderr)
                        self.assertIn(said, result.stderr)
                        self.assertNotIn("    at ", result.stderr, "a refusal is no stack trace")
                        if written:
                            self.assertFalse(os.path.exists(written), "no output file is written")

    def test_a_file_that_is_not_there_is_refused_the_same_way(self):
        with tempfile.TemporaryDirectory() as directory:
            result = support.run_script(
                "recolor.mjs",
                os.path.join(directory, "missing.png"),
                os.path.join(directory, "out.png"),
                "--map",
                "#000000=#ffffff",
            )
            self.assertEqual(result.returncode, 1)
            self.assertIn("missing.png: cannot be read (ENOENT)", result.stderr)

    def test_a_palette_png_with_its_colours_in_a_table_is_read_as_the_colours_it_shows(self):
        with tempfile.TemporaryDirectory() as directory:
            # 2 x 1, 2 bits to a pixel: the entries 1 and 2 of a table of three; entry 1 is half transparent.
            table = support.chunk(b"PLTE", bytes([0, 0, 0, 10, 20, 30, 200, 100, 50]))
            alpha = support.chunk(b"tRNS", bytes([255, 128, 255]))
            header = support.chunk(b"IHDR", struct.pack(">IIBBBBB", 2, 1, 2, 3, 0, 0, 0))
            data = support.chunk(b"IDAT", zlib.compress(bytes([0, 0b01100000])))
            path = support.write_bytes(
                directory,
                "palette.png",
                support.SIGNATURE + header + table + alpha + data + support.chunk(b"IEND", b""),
            )
            out = os.path.join(directory, "frame.txt")
            result = support.run_script("grid.mjs", "to-grid", path, out)
            self.assertEqual(result.returncode, 1)
            self.assertIn("pixel 0,0 is partly transparent (alpha 128)", result.stderr)
            self.assertFalse(os.path.exists(out))
            contrast = support.run_script(
                "contrast.mjs", "--effect", "#c86432", "--ground", path + "@1,0"
            )
            self.assertEqual(contrast.returncode, 0, contrast.stderr)
            self.assertIn("ground " + path + "@1,0 = #c86432", contrast.stdout)


if __name__ == "__main__":
    unittest.main()
