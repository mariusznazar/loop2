"""Checks of contrast.mjs of the loop2-scene-art skill: the contrast of an effect's colours against
the ground and the prop it stands at. Standard library only, with Node.js for the script."""

import tempfile
import unittest

import scene_art_support as support

WHITE, BLACK, GREY = (255, 255, 255, 255), (0, 0, 0, 255), (118, 118, 118, 255)


class Contrast(unittest.TestCase):

    def test_the_ratio_is_the_one_wcag_gives_black_on_white_21_and_grey_767676_on_white_4_54(self):
        # 21:1 is the largest ratio WCAG 2.2 allows, and #767676 on white is its usual example of
        # the lightest grey that holds 4.5:1; neither is computed by the script.
        black = support.run_script("contrast.mjs", "--effect", "#000000", "--ground", "#ffffff")
        grey = support.run_script("contrast.mjs", "--effect", "#767676", "--ground", "#ffffff")
        self.assertEqual(black.returncode, 0, black.stderr)
        self.assertIn("#000000: 21.00:1", black.stdout)
        self.assertIn("#767676: 4.54:1", grey.stdout)

    def test_samples_come_from_pixels_of_pictures_and_each_role_is_named(self):
        with tempfile.TemporaryDirectory() as directory:
            effect = support.write_png(directory, "effect.png", [[GREY, GREY, WHITE, (9, 9, 9, 0)]])
            ground = support.write_png(directory, "ground.png", [[BLACK, WHITE]])
            prop = support.write_png(directory, "prop.png", [[BLACK], [GREY]])
            result = support.run_script("contrast.mjs", "--effect", effect, "--ground", ground + "@1,0",
                                        "--prop", prop + "@0,1")
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("effect colours: 2", result.stdout)
            lines = result.stdout.splitlines()
            ground_at = next(i for i, line in enumerate(lines) if line.startswith("ground "))
            prop_at = next(i for i, line in enumerate(lines) if line.startswith("prop "))
            # Against white: grey #767676 4.54, white 1.00. Against the prop's grey #767676 itself:
            # the same grey 1.00 and white 4.54.
            self.assertEqual(lines[ground_at + 1:ground_at + 4],
                             ["  #767676 (2 px): 4.54:1", "  #ffffff (1 px): 1.00:1", "  lowest: #ffffff at 1.00:1"])
            self.assertEqual(lines[prop_at + 1:prop_at + 4],
                             ["  #767676 (2 px): 1.00:1", "  #ffffff (1 px): 4.54:1", "  lowest: #767676 at 1.00:1"])

    def test_a_screenshot_of_the_page_gives_the_colour_of_a_pixel_of_the_scene_by_its_block_of_four(self):
        # The skill: a screenshot of 1280 x 720 px, the scene 672 x 304 px at left 33, top 60, so the
        # pixel 5,3 of the scene's picture is the block 2 x 2 whose top left is 33 + 2*5, 60 + 2*3.
        width, height = 1280, 720
        grey, white = bytes((118, 118, 118, 255)), bytes((255, 255, 255, 255))
        rows = []
        for y in range(height):
            row = grey * width
            if 66 <= y <= 67:
                row = row[:43 * 4] + white * 2 + row[45 * 4:]
            rows.append(bytes(1) + row)
        with tempfile.TemporaryDirectory() as directory:
            shot = support.write_bytes(directory, "shot.png",
                                       support.png_bytes(width, height, None, raw=b"".join(rows)))
            samples = ["--ground", shot + "@43,66", "--ground", shot + "@44,67", "--ground", shot + "@45,66"]
            result = support.run_script("contrast.mjs", "--effect", "#000000", *samples)
            self.assertEqual(result.returncode, 0, result.stderr)
            # Black on white is 21:1, black on the grey #767676 is 4.62:1 (0.2312 over 0.05, the grey 118 having the luminance 0.1812).
            ratios = [line.split(": ")[1] for line in result.stdout.splitlines() if line.startswith("  #000000")]
            self.assertEqual(ratios, ["21.00:1", "21.00:1", "4.62:1"])

    def test_a_low_ratio_sets_no_exit_code_because_the_script_gives_numbers_and_no_threshold(self):
        result = support.run_script("contrast.mjs", "--effect", "#fefefe", "--ground", "#ffffff")
        self.assertEqual(result.returncode, 0)
        self.assertIn("1.01:1", result.stdout)

    def test_a_sample_that_is_transparent_or_outside_its_picture_is_refused(self):
        with tempfile.TemporaryDirectory() as directory:
            ground = support.write_png(directory, "ground.png", [[WHITE, (5, 5, 5, 0)]])
            transparent = support.run_script("contrast.mjs", "--effect", "#000000", "--ground", ground + "@1,0")
            outside = support.run_script("contrast.mjs", "--effect", "#000000", "--ground", ground + "@2,0")
            self.assertEqual(transparent.returncode, 1)
            self.assertIn("wholly transparent", transparent.stderr)
            self.assertEqual(outside.returncode, 1)
            self.assertIn("outside the picture of 2 x 1", outside.stderr)

    def test_a_request_with_no_sample_or_a_sample_written_wrong_is_refused(self):
        self.assertEqual(support.run_script("contrast.mjs", "--effect", "#000000").returncode, 1)
        wrong = support.run_script("contrast.mjs", "--effect", "#000000", "--ground", "ground.png@1")
        self.assertEqual(wrong.returncode, 1)
        self.assertIn("must be written file@x,y", wrong.stderr)


if __name__ == "__main__":
    unittest.main()
