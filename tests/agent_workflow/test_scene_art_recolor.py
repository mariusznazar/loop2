"""Checks of recolor.mjs of the loop2-scene-art skill: a change of colours that brings in no colour
the palette lacks. Standard library only, with Node.js for the script."""

import os
import tempfile
import unittest

import scene_art_support as support

GREY, LIGHT, BROWN, RED = (10, 10, 10), (20, 20, 20), (90, 60, 30), (255, 0, 0)


def picture_rows():
    return [
        [GREY + (255,), LIGHT + (255,), GREY + (128,), GREY + (0,)],
        [BROWN + (255,), GREY + (255,), LIGHT + (255,), BROWN + (255,)],
    ]


class Recolor(unittest.TestCase):
    def run_in(self, directory, *arguments):
        support.write_png(directory, "in.png", picture_rows())
        return support.run_script(
            "recolor.mjs",
            os.path.join(directory, "in.png"),
            os.path.join(directory, "out.png"),
            *arguments,
        )

    def test_each_pixel_of_the_colour_takes_the_new_one_with_its_alpha_and_a_wholly_transparent_pixel_stays(
        self,
    ):
        with tempfile.TemporaryDirectory() as directory:
            result = self.run_in(directory, "--map", "#0a0a0a=#141414")
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, chunks = support.read_png(os.path.join(directory, "out.png"))
            self.assertEqual(
                rows,
                [
                    [LIGHT + (255,), LIGHT + (255,), LIGHT + (128,), GREY + (0,)],
                    [BROWN + (255,), LIGHT + (255,), LIGHT + (255,), BROWN + (255,)],
                ],
            )
            self.assertEqual(chunks, ["IHDR", "IDAT", "IEND"])
            self.assertIn("#0a0a0a -> #141414: 3 pixels", result.stdout)

    def test_a_pixel_changed_by_one_map_is_not_carried_on_by_another(self):
        with tempfile.TemporaryDirectory() as directory:
            result = self.run_in(directory, "--map", "#0a0a0a=#141414", "--map", "#141414=#5a3c1e")
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, _ = support.read_png(os.path.join(directory, "out.png"))
            self.assertEqual(
                rows[0][0], LIGHT + (255,), "the grey became the light one and stopped there"
            )
            self.assertEqual(rows[0][1], BROWN + (255,))

    def test_a_colour_the_palette_lacks_is_refused_and_nothing_is_written(self):
        with tempfile.TemporaryDirectory() as directory:
            result = self.run_in(directory, "--map", "#0a0a0a=#ff0000")
            self.assertEqual(result.returncode, 1)
            self.assertIn("#ff0000 is held by no pixel of the palette", result.stderr)
            self.assertFalse(os.path.exists(os.path.join(directory, "out.png")))

    def test_a_colour_a_named_palette_picture_holds_may_be_written(self):
        with tempfile.TemporaryDirectory() as directory:
            palette = support.write_png(directory, "scene.png", [[RED + (255,), (1, 2, 3, 0)]])
            result = self.run_in(directory, "--map", "#0a0a0a=#ff0000", "--palette", palette)
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, _ = support.read_png(os.path.join(directory, "out.png"))
            self.assertEqual(rows[0][0], RED + (255,))

    def test_a_colour_only_wholly_transparent_pixels_of_the_palette_hold_is_not_held(self):
        with tempfile.TemporaryDirectory() as directory:
            palette = support.write_png(directory, "scene.png", [[RED + (0,)]])
            result = self.run_in(directory, "--map", "#0a0a0a=#ff0000", "--palette", palette)
            self.assertEqual(result.returncode, 1)
            self.assertIn("would be a new colour", result.stderr)

    def test_a_colour_to_replace_that_no_pixel_has_is_refused(self):
        with tempfile.TemporaryDirectory() as directory:
            result = self.run_in(directory, "--map", "#010101=#141414")
            self.assertEqual(result.returncode, 1)
            self.assertIn("no pixel of the region has the colour #010101", result.stderr)
            self.assertFalse(os.path.exists(os.path.join(directory, "out.png")))

    def test_a_region_limits_the_change_and_a_colour_only_outside_it_is_refused(self):
        with tempfile.TemporaryDirectory() as directory:
            result = self.run_in(directory, "--map", "#0a0a0a=#141414", "--region", "0,0,2,1")
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, _ = support.read_png(os.path.join(directory, "out.png"))
            self.assertEqual(rows[0][0], LIGHT + (255,))
            self.assertEqual(rows[1][1], GREY + (255,), "outside the region the grey stays")
            outside = self.run_in(directory, "--map", "#5a3c1e=#141414", "--region", "0,0,2,1")
            self.assertEqual(outside.returncode, 1)


if __name__ == "__main__":
    unittest.main()
