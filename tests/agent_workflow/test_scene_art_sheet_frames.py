"""Checks of sheet-frames.mjs of the loop2-scene-art skill: cutting frames out of a sheet, the
comparison with the sheet, and the measure of a figure. Standard library only, with Node.js for the
script."""

import os
import tempfile
import unittest

import scene_art_support as support

SHEET_WIDTH, SHEET_HEIGHT = 12, 4


def sheet_rows():
    """A sheet no two pixels of which agree, with a wholly transparent column at x = 5."""
    return [
        [(x * 20, y * 50, (x + y * 7) % 256, 0 if x == 5 else 255) for x in range(SHEET_WIDTH)]
        for y in range(SHEET_HEIGHT)
    ]


def cut_arguments(directory, out="strip.png"):
    return [
        "cut",
        os.path.join(directory, "sheet.png"),
        "--at",
        "3,1",
        "--frame",
        "4x2",
        "--count",
        "2",
        "--out",
        os.path.join(directory, out),
    ]


class SheetFrames(unittest.TestCase):
    def test_a_strip_cut_from_the_sheet_holds_the_sheets_pixels_unchanged_and_nothing_else(self):
        with tempfile.TemporaryDirectory() as directory:
            support.write_png(directory, "sheet.png", sheet_rows())
            result = support.run_script("sheet-frames.mjs", *cut_arguments(directory))
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, chunks = support.read_png(os.path.join(directory, "strip.png"))
            # Two frames of 4 x 2 side by side from the pixel 3,1 of the sheet, written out here.
            expected = [sheet_rows()[1][3:11], sheet_rows()[2][3:11]]
            for row, wanted in zip(rows, expected, strict=True):
                for pixel, want in zip(row, wanted, strict=True):
                    self.assertEqual(pixel[3] == 0, want[3] == 0)
                    if want[3]:
                        self.assertEqual(pixel, want)
            self.assertEqual(
                chunks, ["IHDR", "IDAT", "IEND"], "a sprite file holds pixels alone (D-271)"
            )
            self.assertIn("differing pixels: 0 of 16", result.stdout)

    def test_compare_names_the_frame_and_the_pixel_that_differs_and_ends_with_exit_code_1(self):
        with tempfile.TemporaryDirectory() as directory:
            support.write_png(directory, "sheet.png", sheet_rows())
            rows = [sheet_rows()[1][3:11], sheet_rows()[2][3:11]]
            rows[1][6] = (1, 2, 3, 255)
            strip = support.write_png(directory, "strip.png", rows)
            result = support.run_script(
                "sheet-frames.mjs",
                "compare",
                os.path.join(directory, "sheet.png"),
                "--at",
                "3,1",
                "--frame",
                "4x2",
                "--count",
                "2",
                strip,
            )
            self.assertEqual(result.returncode, 1)
            self.assertIn("differing pixels: 1 of 16", result.stdout)
            self.assertIn("frame 1, pixel 2,1", result.stdout)

    def test_pixels_that_are_wholly_transparent_are_the_same_whatever_colour_they_hold(self):
        with tempfile.TemporaryDirectory() as directory:
            support.write_png(directory, "sheet.png", sheet_rows())
            rows = [list(sheet_rows()[1][3:11]), list(sheet_rows()[2][3:11])]
            rows[0][2] = (9, 9, 9, 0)  # the sheet's column x = 5 is transparent: 5 - 3 = 2
            strip = support.write_png(directory, "strip.png", rows)
            result = support.run_script(
                "sheet-frames.mjs",
                "compare",
                os.path.join(directory, "sheet.png"),
                "--at",
                "3,1",
                "--frame",
                "4x2",
                "--count",
                "2",
                strip,
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_a_strip_of_another_size_than_the_frames_ask_is_refused(self):
        with tempfile.TemporaryDirectory() as directory:
            support.write_png(directory, "sheet.png", sheet_rows())
            strip = support.write_png(
                directory, "strip.png", [sheet_rows()[1][3:10], sheet_rows()[2][3:10]]
            )
            result = support.run_script(
                "sheet-frames.mjs",
                "compare",
                os.path.join(directory, "sheet.png"),
                "--at",
                "3,1",
                "--frame",
                "4x2",
                "--count",
                "2",
                strip,
            )
            self.assertEqual(result.returncode, 1)
            self.assertIn("7 x 2 pixels where 2 frames of 4 x 2 are 8 x 2", result.stderr)

    def test_frames_that_reach_past_the_sheet_are_refused_and_nothing_is_written(self):
        with tempfile.TemporaryDirectory() as directory:
            support.write_png(directory, "sheet.png", sheet_rows())
            arguments = cut_arguments(directory)
            arguments[arguments.index("--count") + 1] = (
                "3"  # 3 frames of 4 from x = 3 end at 15 of 12
            )
            result = support.run_script("sheet-frames.mjs", *arguments)
            self.assertEqual(result.returncode, 1)
            self.assertIn("does not lie inside the picture of 12 x 4", result.stderr)
            self.assertFalse(os.path.exists(os.path.join(directory, "strip.png")))

    def test_measure_gives_the_height_and_the_width_of_the_figure_of_each_frame(self):
        with tempfile.TemporaryDirectory() as directory:
            blank = (0, 0, 0, 0)
            red = (200, 0, 0, 255)
            # Two frames of 6 x 6: the first draws a figure 3 wide and 5 high, the second is empty.
            frame_one = [
                [red if 2 <= x < 5 and 1 <= y < 6 else blank for x in range(6)] for y in range(6)
            ]
            frame_two = [[blank] * 6 for _ in range(6)]
            sheet = support.write_png(
                directory, "figure.png", [a + b for a, b in zip(frame_one, frame_two, strict=True)]
            )
            result = support.run_script("sheet-frames.mjs", "measure", sheet, "--frame", "6")
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("frame 0: figure 3 px wide, 5 px high (x 2-5, y 1-6", result.stdout)
            self.assertIn("frame 1: no visible pixel", result.stdout)

    def test_the_box_of_the_visible_pixels_of_frame_0_of_the_idle_files_of_the_wolf_and_the_mage(
        self,
    ):
        # Frame 0 of each file, its frames 64 px wide: the wolf's figure is 63 px wide and 31 px
        # high, the mage's 25 px wide and 32 px high.
        wolf = os.path.join(support.SPRITES, "wolf-idle.png")
        mage = os.path.join(support.SPRITES, "mage-idle.png")
        result = support.run_script("sheet-frames.mjs", "measure", wolf, mage, "--frame", "64")
        self.assertEqual(result.returncode, 0, result.stderr)
        lines = result.stdout.splitlines()
        self.assertIn(
            "figure 63 px wide, 31 px high",
            next(line for line in lines if "wolf-idle.png frame 0" in line),
        )
        self.assertIn(
            "figure 25 px wide, 32 px high",
            next(line for line in lines if "mage-idle.png frame 0" in line),
        )
        self.assertIn("height 1.03 times, width 0.40 times", result.stdout)

    def test_a_width_after_the_name_gives_each_file_its_own_frames_and_the_second_is_set_against_the_first(
        self,
    ):
        with tempfile.TemporaryDirectory() as directory:
            blank, red = (0, 0, 0, 0), (200, 0, 0, 255)
            # A figure 2 wide and 4 high in a frame of 5 x 5, and one 4 wide and 2 high in two frames of 8 x 5.
            small = [
                [red if 1 <= x < 3 and 1 <= y < 5 else blank for x in range(5)] for y in range(5)
            ]
            wide = [
                [red if 2 <= x < 6 and 3 <= y < 5 else blank for x in range(8)] * 2
                for y in range(5)
            ]
            first = support.write_png(directory, "small.png", small)
            second = support.write_png(directory, "wide.png", wide)
            result = support.run_script("sheet-frames.mjs", "measure", first, second + "#8")
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("small.png frame 0: figure 2 px wide, 4 px high", result.stdout)
            self.assertIn("wide.png frame 1: figure 4 px wide, 2 px high", result.stdout)
            self.assertIn(
                "against " + first + ": height 0.50 times, width 2.00 times", result.stdout
            )

    def test_a_width_that_does_not_divide_the_picture_into_frames_is_refused(self):
        with tempfile.TemporaryDirectory() as directory:
            support.write_png(directory, "sheet.png", sheet_rows())
            result = support.run_script(
                "sheet-frames.mjs", "measure", os.path.join(directory, "sheet.png"), "--frame", "5"
            )
            self.assertEqual(result.returncode, 1)
            self.assertIn("12 pixels wide is no whole number of frames of 5 pixels", result.stderr)


if __name__ == "__main__":
    unittest.main()
