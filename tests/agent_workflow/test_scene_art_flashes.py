"""Checks of flashes.mjs of the loop2-scene-art skill and of the JPEG reader it reads the frames of
loop2-play with. Standard library only, with Node.js for the scripts."""

import base64
import os
import pathlib
import tempfile
import unittest

import scene_art_support as support

BLACK, WHITE = (0, 0, 0, 255), (255, 255, 255, 255)

# 32 x 16, the left half (20, 20, 20) and the right half (230, 230, 230), JPEG quality 90, chroma
# halved; made by Pillow, which is what the pixel values below were read back with.
FLAT_JPEG = base64.b64decode(
    "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQ"
    "ERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU"
    "FBQUFBQUFBQUFBQUFBT/wAARCAAQACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAA"
    "AgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6"
    "Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXG"
    "x8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREA"
    "AgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5"
    "OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPE"
    "xcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD836KKKAP6MKKKKAP/2Q=="
)
# 16 x 16, no chroma halving, JPEG quality 95: a pattern with detail in every block.
DETAIL_JPEG = base64.b64decode(
    "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsI"
    "CQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK"
    "CgoKCgoKCgoKCgoKCgr/wAARCAAQABADAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAA"
    "AgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6"
    "Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXG"
    "x8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREA"
    "AgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5"
    "OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPE"
    "xcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD83/gx+yH/AKr/AIlfp/BRg8Z5h4eeIfwe"
    "+fW3wX/ZDz5X/Er9P4K+qweM21P7r8PPEP4PfPpT4L/sh48r/iV+n8FfleDxm2p/hT4eeIfwe+fW3wY/ZD/1X/Er9P4K+qwe"
    "M8z+6/DzxD+D3z//2Q=="
)
PROGRESSIVE_JPEG = base64.b64decode(
    "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQ"
    "ERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU"
    "FBQUFBQUFBQUFBQUFBT/wgARCAAQACADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAgJ/8QAFAEBAAAAAAAAAAAA"
    "AAAAAAAAAP/aAAwDAQACEAMQAAABm8GjAP/EABQQAQAAAAAAAAAAAAAAAAAAADD/2gAIAQEAAQUCD//EABQRAQAAAAAAAAAA"
    "AAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABQQAQAAAAAAAAAAAAAAAAAA"
    "ADD/2gAIAQEABj8CD//EABQQAQAAAAAAAAAAAAAAAAAAADD/2gAIAQEAAT8hD//aAAwDAQACAAMAAAAQAA//xAAUEQEAAAAA"
    "AAAAAAAAAAAAAAAQ/9oACAEDAQE/ED//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/ED//xAAUEAEAAAAAAAAAAAAA"
    "AAAAAAAw/9oACAEBAAE/EA//2Q=="
)
# Pixels of DETAIL_JPEG as Pillow reads it back: (x, y) -> (r, g, b).
DETAIL_PIXELS = {(0, 0): (0, 0, 2), (5, 3): (79, 48, 64), (9, 12): (144, 192, 168), (15, 15): (240, 240, 238),
                 (2, 14): (33, 224, 129), (13, 1): (207, 16, 111)}
# Pixels of FLAT_JPEG as Pillow reads it back.
FLAT_PIXELS = {(0, 0): (20, 20, 20), (15, 15): (20, 20, 20), (16, 0): (230, 230, 230), (31, 15): (230, 230, 230)}

READ_PIXELS = """
import { readFileSync } from "node:fs";
import { decodeJpeg } from "%s";
const [file, ...spots] = process.argv.slice(2);
const picture = decodeJpeg(readFileSync(file), file);
console.log(`${picture.width} x ${picture.height}`);
for (const spot of spots) {
  const [x, y] = spot.split(",").map(Number);
  console.log(spot, Array.from(picture.data.subarray((y * picture.width + x) * 4, (y * picture.width + x) * 4 + 4)).join(" "));
}
"""


def solid(width, height, pixel):
    return [[pixel] * width for _ in range(height)]


def flashes(*arguments, cwd=None):
    return support.run_script("flashes.mjs", *arguments, cwd=cwd)


class Flashes(unittest.TestCase):

    def test_a_frame_that_goes_from_black_to_white_over_the_whole_region_is_counted_whole(self):
        with tempfile.TemporaryDirectory() as directory:
            frames = [support.write_png(directory, name, solid(8, 8, pixel))
                      for name, pixel in (("a.png", BLACK), ("b.png", WHITE), ("c.png", WHITE))]
            result = flashes(*frames)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("moved pixels between consecutive frames, at most 64 of 64 (100.00 %), frames 0 and 1",
                          result.stdout)
            self.assertIn("mean relative luminance: 0.000 to 1.000", result.stdout)

    def test_a_change_in_half_of_the_region_is_counted_as_half(self):
        with tempfile.TemporaryDirectory() as directory:
            left_changes = [BLACK] * 4 + [WHITE] * 4
            first = support.write_png(directory, "a.png", [[WHITE] * 8 for _ in range(8)])
            second = support.write_png(directory, "b.png", [left_changes for _ in range(8)])
            result = flashes(first, second)
            self.assertIn("at most 32 of 64 (50.00 %)", result.stdout)

    def test_a_move_under_a_tenth_of_luminance_or_between_two_light_frames_is_no_flash(self):
        # WCAG 2.2 relative luminance of grey v/255: 100 -> 0.127, 110 -> 0.156, a move of 0.029;
        # 240 -> 0.871 and 255 -> 1.0, a move of 0.129 but with the darker one above 0.80.
        with tempfile.TemporaryDirectory() as directory:
            for name, one, other in (("dim", (100,) * 3 + (255,), (110,) * 3 + (255,)),
                                     ("light", (240,) * 3 + (255,), WHITE)):
                first = support.write_png(directory, name + "-a.png", solid(4, 4, one))
                second = support.write_png(directory, name + "-b.png", solid(4, 4, other))
                self.assertIn("at most 0 of 16", flashes(first, second).stdout, name)

    def test_the_region_limits_the_measure_to_the_scene_in_the_frame(self):
        with tempfile.TemporaryDirectory() as directory:
            before = [[WHITE] * 8 + [BLACK] * 8 for _ in range(8)]
            after = [[WHITE] * 8 + [WHITE] * 8 for _ in range(8)]
            first = support.write_png(directory, "a.png", before)
            second = support.write_png(directory, "b.png", after)
            scene = flashes(first, second, "--region", "0,0,8,8")
            beside = flashes(first, second, "--region", "8,0,8,8")
            self.assertIn("at most 0 of 64", scene.stdout)
            self.assertIn("at most 64 of 64", beside.stdout)
            self.assertIn("region 8 x 8 at 8,0 (64 px)", beside.stdout)

    def test_the_log_of_save_frames_gives_the_time_of_each_frame(self):
        with tempfile.TemporaryDirectory() as directory:
            frames = [support.write_png(directory, name, solid(4, 4, pixel))
                      for name, pixel in (("a.png", WHITE), ("b.png", WHITE), ("c.png", BLACK))]
            log = os.path.join(directory, "frames.log")
            with open(log, "w", encoding="utf-8", newline="") as handle:
                handle.write("".join(f"{path} +{ms} ms\n" for path, ms in zip(frames, (0, 480, 1010), strict=True)))
            result = flashes("--log", log)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("frames 1 and 2 (frame 2, +1010 ms)", result.stdout)
            wrong = os.path.join(directory, "wrong.log")
            with open(wrong, "w", encoding="utf-8", newline="") as handle:
                handle.write("a.png at 5\n")
            self.assertEqual(flashes("--log", wrong).returncode, 1)

    def test_one_frame_or_frames_of_two_sizes_are_refused(self):
        with tempfile.TemporaryDirectory() as directory:
            small = support.write_png(directory, "small.png", solid(4, 4, WHITE))
            large = support.write_png(directory, "large.png", solid(8, 8, WHITE))
            one = flashes(small)
            two_sizes = flashes(small, large)
            self.assertEqual(one.returncode, 1)
            self.assertIn("at least two frames", one.stderr)
            self.assertEqual(two_sizes.returncode, 1)
            self.assertIn("is 8 x 8 px where", two_sizes.stderr)

    def test_a_jpeg_frame_of_loop2_play_is_read_and_set_against_a_png_frame(self):
        with tempfile.TemporaryDirectory() as directory:
            jpeg = support.write_bytes(directory, "000.jpeg", FLAT_JPEG)
            dark = support.write_png(directory, "dark.png", solid(32, 16, (20, 20, 20, 255)))
            result = flashes(dark, jpeg)
            self.assertEqual(result.returncode, 0, result.stderr)
            # The right half, 16 x 16 pixels of 512, goes from 20 to 230 of 255: a move of 0.78.
            self.assertIn("at most 256 of 512 (50.00 %)", result.stdout)

    def read_pixels(self, directory, content, spots):
        path = support.write_bytes(directory, "frame.jpeg", content)
        module = pathlib.Path(support.SKILL, "jpeg.mjs").as_uri()
        return support.run_script_text(READ_PIXELS % module, path, *spots)

    def test_the_jpeg_reader_gives_the_pixels_a_library_reads_from_a_flat_and_a_detailed_picture(self):
        with tempfile.TemporaryDirectory() as directory:
            for content, wanted, size in ((FLAT_JPEG, FLAT_PIXELS, "32 x 16"), (DETAIL_JPEG, DETAIL_PIXELS, "16 x 16")):
                result = self.read_pixels(directory, content, [f"{x},{y}" for x, y in wanted])
                self.assertEqual(result.returncode, 0, result.stderr)
                lines = result.stdout.splitlines()
                self.assertEqual(lines[0], size)
                for line, ((x, y), colour) in zip(lines[1:], wanted.items(), strict=True):
                    got = [int(v) for v in line.split()[1:]]
                    # The two readers round differently, so a pixel may differ by a few levels.
                    self.assertTrue(all(abs(a - b) <= 3 for a, b in zip(got[:3], colour, strict=True)),
                                    f"{x},{y}: {got} against {colour}")
                    self.assertEqual(got[3], 255)

    def test_a_progressive_a_truncated_and_a_damaged_jpeg_are_refused_with_a_message(self):
        with tempfile.TemporaryDirectory() as directory:
            png = support.write_png(directory, "ok.png", solid(32, 16, WHITE))
            damaged = bytearray(FLAT_JPEG)
            damaged[2:4] = b"\x00\x00"
            for name, content, said in (("progressive", PROGRESSIVE_JPEG, "progressive JPEG is not held"),
                                        ("cut in its data", FLAT_JPEG[:-60], "truncated"),
                                        ("cut in its header", FLAT_JPEG[:40], "truncated"),
                                        ("no marker", bytes(damaged), "damaged JPEG")):
                bad = support.write_bytes(directory, "bad.jpeg", content)
                result = flashes(png, bad)
                self.assertEqual(result.returncode, 1, name)
                self.assertIn(said, result.stderr, name)
                self.assertIn("bad.jpeg", result.stderr, name)


if __name__ == "__main__":
    unittest.main()
