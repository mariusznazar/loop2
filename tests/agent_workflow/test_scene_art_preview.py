"""Checks of preview.mjs of the loop2-scene-art skill: pictures laid on a piece of the scene and
scaled up. Standard library only, with Node.js for the script."""

import os
import re
import tempfile
import unittest

import scene_art_support as support

BLUE, RED, GREEN, NONE = (0, 0, 255, 255), (255, 0, 0, 255), (0, 255, 0, 255), (0, 0, 0, 0)


def scene_rows():
    return [[BLUE] * 6 for _ in range(4)]


class Preview(unittest.TestCase):
    def test_the_visible_box_of_a_picture_is_laid_at_the_place_and_scaled_with_square_pixels(self):
        with tempfile.TemporaryDirectory() as directory:
            scene = support.write_png(directory, "scene.png", scene_rows())
            # 3 x 3 with its visible pixels in the lower right 2 x 2: the box is that, laid at 1,1.
            figure = support.write_png(
                directory, "figure.png", [[NONE] * 3, [NONE, RED, RED], [NONE, RED, RED]]
            )
            out = os.path.join(directory, "preview.png")
            result = support.run_script(
                "preview.mjs",
                "--scene",
                scene,
                "--put",
                figure + "@1,1",
                "--crop",
                "0,0,4,3",
                "--scale",
                "2",
                "--out",
                out,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, chunks = support.read_png(out)
            # The scene's pixels 1..2 of rows 1..2 are red, the rest of the 4 x 3 piece blue, each pixel 2 x 2.
            piece = [
                [RED if 1 <= x <= 2 and 1 <= y <= 2 else BLUE for x in range(4)] for y in range(3)
            ]
            self.assertEqual(rows, [[piece[y // 2][x // 2] for x in range(8)] for y in range(6)])
            self.assertEqual(chunks, ["IHDR", "IDAT", "IEND"])
            self.assertIn("preview 8 x 6 px, scale 2, 1 laid", result.stdout)

    def test_the_cell_of_the_game_turned_by_the_box_of_measure_lays_the_pixels_where_the_cell_would(
        self,
    ):
        # The instruction of the skill: the preview's x is the cell's left edge plus L, its y the
        # cell's top plus T, with `x L-R, y T-B` read from `measure`.
        with tempfile.TemporaryDirectory() as directory:
            cell = [[NONE] * 5 for _ in range(5)]
            for y, x in ((2, 1), (2, 2), (3, 1), (3, 2)):
                cell[y][x] = RED
            figure = support.write_png(directory, "cell.png", cell)
            scene = support.write_png(directory, "scene.png", [[BLUE] * 8 for _ in range(8)])
            measured = support.run_script("sheet-frames.mjs", "measure", figure)
            box = re.search(r"\(x (\d+)-\d+, y (\d+)-\d+ of", measured.stdout)
            left, top = int(box.group(1)), int(box.group(2))
            cell_left, cell_top = 2, 1  # where the game puts the cell, its top left corner
            out = os.path.join(directory, "preview.png")
            result = support.run_script(
                "preview.mjs",
                "--scene",
                scene,
                "--put",
                f"{figure}@{cell_left + left},{cell_top + top}",
                "--scale",
                "1",
                "--out",
                out,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, _ = support.read_png(out)
            # The cell's red pixels at its own (1,2), (2,2), (1,3), (2,3), the cell at 2,1 of the scene.
            red_at = {(cell_left + x, cell_top + y) for y, x in ((2, 1), (2, 2), (3, 1), (3, 2))}
            for y in range(8):
                for x in range(8):
                    self.assertEqual(rows[y][x], RED if (x, y) in red_at else BLUE, (x, y))

    def test_a_frame_of_a_strip_is_the_one_named_and_a_later_picture_lies_over_an_earlier_one(self):
        with tempfile.TemporaryDirectory() as directory:
            scene = support.write_png(directory, "scene.png", scene_rows())
            strip = support.write_png(
                directory, "strip.png", [[GREEN, GREEN, RED, RED], [GREEN, GREEN, RED, RED]]
            )
            single = support.write_png(directory, "single.png", [[(255, 255, 0, 255)]])
            out = os.path.join(directory, "preview.png")
            result = support.run_script(
                "preview.mjs",
                "--scene",
                scene,
                "--put",
                strip + "@0,0#1/2",
                "--put",
                single + "@1,1",
                "--scale",
                "1",
                "--out",
                out,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, _ = support.read_png(out)
            self.assertEqual(rows[0][:3], [RED, RED, BLUE])
            self.assertEqual(rows[1][:3], [RED, (255, 255, 0, 255), BLUE])

    def test_a_half_transparent_pixel_blends_with_the_scene_and_a_picture_past_the_edge_is_clipped(
        self,
    ):
        with tempfile.TemporaryDirectory() as directory:
            scene = support.write_png(directory, "scene.png", scene_rows())
            veil = support.write_png(directory, "veil.png", [[(255, 255, 255, 128)] * 2] * 2)
            out = os.path.join(directory, "preview.png")
            result = support.run_script(
                "preview.mjs",
                "--scene",
                scene,
                "--put",
                veil + "@5,3",
                "--scale",
                "1",
                "--out",
                out,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, _ = support.read_png(out)
            # White at 128 of 255 over blue: 255 * 128/255 = 128 for red and green, blue stays 255.
            self.assertEqual(rows[3][5], (128, 128, 255, 255))
            self.assertEqual(rows[3][4], BLUE)

    def test_a_crop_outside_the_scene_or_a_picture_with_nothing_visible_is_refused_and_nothing_is_written(
        self,
    ):
        with tempfile.TemporaryDirectory() as directory:
            scene = support.write_png(directory, "scene.png", scene_rows())
            empty = support.write_png(directory, "empty.png", [[NONE]])
            out = os.path.join(directory, "preview.png")
            crop = support.run_script(
                "preview.mjs",
                "--scene",
                scene,
                "--put",
                empty + "@0,0",
                "--crop",
                "0,0,7,4",
                "--out",
                out,
            )
            nothing = support.run_script(
                "preview.mjs", "--scene", scene, "--put", empty + "@0,0", "--out", out
            )
            self.assertEqual(nothing.returncode, 1)
            self.assertIn("has no visible pixel", nothing.stderr)
            self.assertEqual(crop.returncode, 1)
            self.assertFalse(os.path.exists(out))

    def test_with_nothing_to_put_a_piece_of_a_sheet_is_only_scaled_so_that_it_can_be_looked_at(
        self,
    ):
        with tempfile.TemporaryDirectory() as directory:
            sheet = support.write_png(
                directory, "sheet.png", [[RED, GREEN, BLUE], [BLUE, RED, GREEN]]
            )
            out = os.path.join(directory, "look.png")
            result = support.run_script(
                "preview.mjs", "--scene", sheet, "--crop", "1,0,2,2", "--scale", "3", "--out", out
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, _ = support.read_png(out)
            piece = [[GREEN, BLUE], [RED, GREEN]]
            self.assertEqual(rows, [[piece[y // 3][x // 3] for x in range(6)] for y in range(6)])

    def test_without_a_scene_named_the_forest_of_the_game_is_the_ground(self):
        with tempfile.TemporaryDirectory() as directory:
            figure = support.write_png(directory, "figure.png", [[RED]])
            out = os.path.join(directory, "preview.png")
            result = support.run_script(
                "preview.mjs",
                "--put",
                figure + "@0,0",
                "--crop",
                "0,0,4,4",
                "--scale",
                "1",
                "--out",
                out,
                cwd=support.ROOT,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            rows, _ = support.read_png(out)
            self.assertEqual(rows[0][0], RED)
            self.assertEqual((len(rows), len(rows[0])), (4, 4))
            # The forest picture is 336 x 152 and the crop 4 x 4 of it; a pixel next to the figure
            # is the forest's own, not red.
            self.assertNotEqual(rows[0][1], RED)


if __name__ == "__main__":
    unittest.main()
