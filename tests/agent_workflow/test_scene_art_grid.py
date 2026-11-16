"""Checks of grid.mjs of the loop2-scene-art skill: a frame written as text, one letter to a pixel,
and made a PNG again with its faults named. Standard library only, with Node.js for the script."""

import os
import tempfile
import unittest

import scene_art_support as support

DARK, MID, LIGHT = (10, 10, 10, 255), (100, 50, 0, 255), (200, 200, 200, 255)
NONE = (0, 0, 0, 0)


def text_of(directory, name, content):
    path = os.path.join(directory, name)
    with open(path, "w", encoding="utf-8", newline="") as handle:
        handle.write(content)
    return path


def grid_to_png(directory, grid, *arguments):
    source = text_of(directory, "frame.txt", grid)
    return support.run_script("grid.mjs", "to-png", source, os.path.join(directory, "frame.png"), *arguments)


class Grid(unittest.TestCase):

    def test_a_picture_becomes_a_grid_with_its_colours_from_dark_to_light_and_a_dot_for_a_gap(self):
        with tempfile.TemporaryDirectory() as directory:
            picture = support.write_png(directory, "frame.png", [[NONE, LIGHT, DARK], [MID, MID, NONE]])
            result = support.run_script("grid.mjs", "to-grid", picture, os.path.join(directory, "frame.txt"))
            self.assertEqual(result.returncode, 0, result.stderr)
            with open(os.path.join(directory, "frame.txt"), encoding="utf-8", newline="") as handle:
                text = handle.read()
            self.assertEqual(text, "A #0a0a0a\nB #643200\nC #c8c8c8\n---\n.CA\nBB.\n")

    def test_a_grid_becomes_the_picture_it_says_and_the_one_the_picture_gave_comes_back(self):
        with tempfile.TemporaryDirectory() as directory:
            result = grid_to_png(directory, "A #0a0a0a\nB #643200\nC #c8c8c8\n---\n.CA\nBB.\n")
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, chunks = support.read_png(os.path.join(directory, "frame.png"))
            self.assertEqual(rows, [[NONE, LIGHT, DARK], [MID, MID, NONE]])
            self.assertEqual(chunks, ["IHDR", "IDAT", "IEND"])
            self.assertIn("info: figure 3 x 2 px", result.stdout)

    def test_a_grid_is_written_in_a_folder_that_is_not_there_yet(self):
        with tempfile.TemporaryDirectory() as directory:
            picture = support.write_png(directory, "frame.png", [[DARK]])
            out = os.path.join(directory, "new", "deeper", "frame.txt")
            result = support.run_script("grid.mjs", "to-grid", picture, out)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertTrue(os.path.exists(out))

    def test_a_trim_and_a_rectangle_cut_the_picture_to_what_the_frame_is(self):
        with tempfile.TemporaryDirectory() as directory:
            picture = support.write_png(directory, "frame.png", [[NONE, NONE, NONE, NONE],
                                                                 [NONE, DARK, MID, NONE],
                                                                 [NONE, NONE, NONE, NONE]])
            out = os.path.join(directory, "frame.txt")
            trimmed = support.run_script("grid.mjs", "to-grid", picture, out, "--trim")
            self.assertEqual(trimmed.returncode, 0, trimmed.stderr)
            with open(out, encoding="utf-8", newline="") as handle:
                self.assertEqual(handle.read(), "A #0a0a0a\nB #643200\n---\nAB\n")
            cut = support.run_script("grid.mjs", "to-grid", picture, out, "--at", "1,1", "--size", "1x1")
            self.assertEqual(cut.returncode, 0, cut.stderr)
            with open(out, encoding="utf-8", newline="") as handle:
                self.assertEqual(handle.read(), "A #0a0a0a\n---\nA\n")

    def test_a_picture_with_a_partly_transparent_pixel_or_too_many_colours_is_refused_and_nothing_is_written(self):
        with tempfile.TemporaryDirectory() as directory:
            out = os.path.join(directory, "frame.txt")
            partly = support.write_png(directory, "partly.png", [[(1, 2, 3, 128)]])
            result = support.run_script("grid.mjs", "to-grid", partly, out)
            self.assertEqual(result.returncode, 1)
            self.assertIn("pixel 0,0 is partly transparent", result.stderr)
            many = support.write_png(directory, "many.png", [[(i, 0, 0, 255) for i in range(63)]])
            result = support.run_script("grid.mjs", "to-grid", many, out)
            self.assertEqual(result.returncode, 1)
            self.assertIn("63 colours", result.stderr)
            self.assertFalse(os.path.exists(out))

    def test_a_grid_with_rows_of_unequal_width_or_a_key_without_a_colour_is_refused_and_no_picture_is_written(self):
        with tempfile.TemporaryDirectory() as directory:
            unequal = grid_to_png(directory, "A #0a0a0a\n---\nAA\nA\n")
            self.assertEqual(unequal.returncode, 1)
            self.assertIn("rows of unequal width (1, 2)", unequal.stderr)
            unknown = grid_to_png(directory, "A #0a0a0a\n---\nAB\n")
            self.assertEqual(unknown.returncode, 1)
            self.assertIn("keys outside the colours given: B", unknown.stderr)
            self.assertFalse(os.path.exists(os.path.join(directory, "frame.png")))

    def test_a_grid_without_its_divider_or_rows_or_with_a_wrong_colour_line_is_refused(self):
        with tempfile.TemporaryDirectory() as directory:
            for grid, said in (("A #0a0a0a\nAA\n", 'no line "---"'), ("A #0a0a0a\n---\n\n", "no rows of pixels"),
                               ("AB #0a0a0a\n---\nA\n", "is not written K #rrggbb"),
                               ("A 0a0a0a\n---\nA\n", "must be a colour written #rrggbb"),
                               ("A #0a0a0a\nA #ffffff\n---\nA\n", "the key A is given two colours")):
                result = grid_to_png(directory, grid)
                self.assertEqual(result.returncode, 1, grid)
                self.assertIn(said, result.stderr)

    def test_a_pixel_with_no_neighbour_and_a_figure_off_the_last_row_are_named_and_the_picture_is_written(self):
        with tempfile.TemporaryDirectory() as directory:
            result = grid_to_png(directory, "A #0a0a0a\n---\nAA...A\n......\n......\n")
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("pixels with no neighbour: 5,0", result.stdout)
            self.assertIn("the lowest pixel is in row 0 of 2, not on the last row", result.stdout)
            self.assertTrue(os.path.exists(os.path.join(directory, "frame.png")))

    def test_a_reference_grid_gives_the_number_of_pixels_that_differ_or_names_the_size_that_does(self):
        with tempfile.TemporaryDirectory() as directory:
            reference = text_of(directory, "reference.txt", "A #0a0a0a\nB #643200\n---\nAAB\nABB\n")
            same_size = grid_to_png(directory, "A #0a0a0a\nB #643200\n---\nABB\nAAA\n", "--reference", reference)
            self.assertIn("info: 3 pixels differ from the reference", same_size.stdout)
            recoloured = grid_to_png(directory, "A #0a0a0a\nB #ffffff\n---\nAAB\nABB\n", "--reference", reference)
            self.assertIn("info: 3 pixels differ from the reference", recoloured.stdout,
                          "the keys are the same and three pixels show another colour")
            renamed = grid_to_png(directory, "X #0a0a0a\nY #643200\n---\nXXY\nXYY\n", "--reference", reference)
            self.assertIn("info: 0 pixels differ from the reference", renamed.stdout,
                          "the keys differ and every pixel shows the same colour")
            other_size = grid_to_png(directory, "A #0a0a0a\nB #643200\n---\nAB\nAA\n", "--reference", reference)
            self.assertIn("warning: 2 x 2 where the reference is 3 x 2", other_size.stdout)


if __name__ == "__main__":
    unittest.main()
