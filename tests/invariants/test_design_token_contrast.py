"""Invariant design-token-contrast: In `src/browser/tokens.css`, each of `text-strong`, `text`,
`text-secondary`, `text-label`, `positive`, `warning`, `danger`, `discovery` and `player-change`
has a contrast ratio of at least 4.5:1 against each of `page`, `panel` and `highlight`,
`control-border` and `focus` have at least 3:1 against each of those three, `character` has at
least 3:1 against `tile-revealed` and against `tile-hidden`, and `tile-revealed` has at least 3:1
against `tile-hidden`, each ratio computed from the values of those roles as WCAG 2.2 defines the
contrast ratio.

The file is read from the working tree as text; nothing is built, rendered or computed by the
cascade.

Reading of the sentence:
- the value of a role: the value of the custom property `--<role>` declared in the file, its
  comments left out; each role named above is declared exactly once, and its value is a
  six-digit hexadecimal colour `#rrggbb` — a role missing, declared twice or holding anything
  else cannot be shown to keep its pairs, and is flagged;
- the pairs and thresholds are written out below as the sentence lists them; `text-disabled` is
  in none of them;
- the contrast ratio is computed by the definitions the environment fact `wcag-contrast-ratio`
  quotes from WCAG 2.2 — (L1 + 0.05) / (L2 + 0.05) with L1 the lighter and L2 the darker relative
  luminance, L = 0.2126 R + 0.7152 G + 0.0722 B, each component q = c / 255 taken as q / 12.92
  where q <= 0.04045 and ((q + 0.055) / 1.055) ^ 2.4 otherwise — and compared unrounded: "at
  least" 4.5 means a ratio of 4.5 or more.

Covers: every pair of the sentence on the file's values; and controls: the ratio of hand-checked
colour pairs (black on white 21, mid grey #808080 on white 3.949 and on black 5.317, #a0a0a0 on
white 2.615, a dark grey on black through the linear branch 1.061), made-up token text whose pairs
all pass, with `text-disabled` at a ratio of 1, and made-up token text failing each kind of pair,
missing a role, declaring one only inside a comment, declaring one twice and giving one a value
that is no `#rrggbb`.

Does NOT cover: colours that touch on a screen without being a pair of the sentence; text sizes;
whether a style uses the roles where their meaning asks for them (review).
"""

import os
import re
import unittest

import loop2_invariant_support as support

TOKEN_FILE = "src/browser/tokens.css"

BACKGROUNDS = ("page", "panel", "highlight")
TEXT_ROLES = ("text-strong", "text", "text-secondary", "text-label", "positive", "warning",
              "danger", "discovery", "player-change")
TEXT_THRESHOLD = 4.5
NON_TEXT_THRESHOLD = 3.0

# (foreground, background, least ratio), as the invariant's sentence lists them.
PAIRS = tuple(
    [(role, background, TEXT_THRESHOLD) for role in TEXT_ROLES for background in BACKGROUNDS]
    + [(role, background, NON_TEXT_THRESHOLD)
       for role in ("control-border", "focus") for background in BACKGROUNDS]
    + [("character", "tile-revealed", NON_TEXT_THRESHOLD),
       ("character", "tile-hidden", NON_TEXT_THRESHOLD),
       ("tile-revealed", "tile-hidden", NON_TEXT_THRESHOLD)]
)
ROLES = tuple(dict.fromkeys(role for pair in PAIRS for role in pair[:2]))

# The constants of WCAG 2.2's definitions, as the environment fact wcag-contrast-ratio quotes them.
LUMINANCE_WEIGHTS = (0.2126, 0.7152, 0.0722)
LINEAR_LIMIT = 0.04045
LINEAR_DIVISOR = 12.92
GAMMA_OFFSET = 0.055
GAMMA_DIVISOR = 1.055
GAMMA = 2.4
RATIO_OFFSET = 0.05

COMMENT = re.compile(r"/\*.*?\*/", re.S)
HEX_COLOUR = re.compile(r"#[0-9a-fA-F]{6}")


def relative_luminance(colour):
    luminance = 0.0
    for weight, start in zip(LUMINANCE_WEIGHTS, (1, 3, 5), strict=True):
        q = int(colour[start:start + 2], 16) / 255
        linear = q / LINEAR_DIVISOR if q <= LINEAR_LIMIT else \
            ((q + GAMMA_OFFSET) / GAMMA_DIVISOR) ** GAMMA
        luminance += weight * linear
    return luminance


def contrast_ratio(first, second):
    lighter, darker = sorted((relative_luminance(first), relative_luminance(second)),
                             reverse=True)
    return (lighter + RATIO_OFFSET) / (darker + RATIO_OFFSET)


def role_values(text):
    """({role: value} of the roles read, [what could not be read])."""
    code = COMMENT.sub(" ", text)
    values, problems = {}, []
    for role in ROLES:
        declared = re.findall(r"(?<![\w-])--" + re.escape(role) + r"\s*:([^;}]*)", code)
        if len(declared) != 1:
            problems.append(f"--{role} is declared {len(declared)} times, not once")
            continue
        value = declared[0].strip()
        if not HEX_COLOUR.fullmatch(value):
            problems.append(f"--{role} holds {value!r}, not a colour #rrggbb")
            continue
        values[role] = value
    return values, problems


def findings(text):
    values, found = role_values(text)
    for foreground, background, least in PAIRS:
        if foreground in values and background in values:
            ratio = contrast_ratio(values[foreground], values[background])
            if ratio < least:
                found.append(f"--{foreground} {values[foreground]} on --{background} "
                             f"{values[background]}: {ratio:.3f}:1, less than {least}:1")
    return found


def tokens(values):
    lines = [f"  --{role}: {value}; /* Source: made up */" for role, value in values.items()]
    return ":root {\n" + "\n".join(lines) + "\n}\n"


# Made-up values whose pairs all pass: #808080 is 5.317:1 on black and 3.949:1 on white.
PASSING = {
    "page": "#000000", "panel": "#000000", "highlight": "#000000",
    **dict.fromkeys(TEXT_ROLES, "#808080"),
    "text-disabled": "#000000",
    "control-border": "#808080", "focus": "#808080",
    "tile-hidden": "#000000", "tile-revealed": "#ffffff", "character": "#808080",
}


def changed(values):
    return tokens({**PASSING, **values})


def without(role):
    return tokens({r: v for r, v in PASSING.items() if r != role})


WHITE_BACKGROUNDS = {"page": "#ffffff", "panel": "#ffffff", "highlight": "#ffffff",
                     **dict.fromkeys(TEXT_ROLES, "#000000"), "focus": "#000000"}

# Made-up token text, and a part of the finding it must give.
FLAGGED = {
    "text roles at 3.949:1 on page": (changed({"page": "#ffffff"}), "on --page #ffffff"),
    "text roles at 3.949:1 on highlight": (changed({"highlight": "#ffffff"}),
                                           "on --highlight #ffffff"),
    "a signal colour at 1:1 on panel": (changed({"player-change": "#000000"}),
                                        "--player-change #000000 on --panel"),
    "control-border at 2.615:1": (changed({**WHITE_BACKGROUNDS, "control-border": "#a0a0a0"}),
                                  "--control-border #a0a0a0 on --page"),
    "focus at 1:1 on panel": (changed({"focus": "#000000"}), "--focus #000000 on --panel"),
    "character at 1:1 on tile-hidden": (changed({"character": "#000000"}),
                                        "--character #000000 on --tile-hidden"),
    "character at 1:1 on tile-revealed": (changed({"character": "#ffffff"}),
                                          "--character #ffffff on --tile-revealed"),
    "tile-revealed at 1:1 against tile-hidden": (
        changed({"tile-revealed": "#000000", "character": "#ffffff"}),
        "--tile-revealed #000000 on --tile-hidden"),
    "a role missing": (without("text-label"), "--text-label is declared 0 times"),
    "a role only inside a comment": (without("warning") + "/* :root { --warning: #808080; } */\n",
                                     "--warning is declared 0 times"),
    "a role declared twice": (changed({}) + ":root {\n  --danger: #808080;\n}\n",
                              "--danger is declared 2 times"),
    "a role written as #rgb": (changed({"discovery": "#888"}), "--discovery holds '#888'"),
    "a role written as var()": (changed({"text": "var(--other)"}), "--text holds 'var(--other)'"),
}


class DesignTokenContrast(unittest.TestCase):

    def test_token_file_keeps_every_pair(self):
        # invariant: design-token-contrast
        path = os.path.join(support.ROOT, *TOKEN_FILE.split("/"))
        self.assertTrue(os.path.isfile(path), f"{TOKEN_FILE} does not exist")
        self.assertEqual(findings(support.read_text(path)), [])

    def test_control_ratios_of_hand_checked_pairs(self):
        # invariant: design-token-contrast
        self.assertAlmostEqual(contrast_ratio("#000000", "#ffffff"), 21.0, places=9)
        self.assertAlmostEqual(contrast_ratio("#ffffff", "#000000"), 21.0, places=9)
        self.assertAlmostEqual(contrast_ratio("#123456", "#123456"), 1.0, places=9)
        self.assertAlmostEqual(contrast_ratio("#808080", "#ffffff"), 3.949, delta=0.001)
        self.assertAlmostEqual(contrast_ratio("#808080", "#000000"), 5.317, delta=0.001)
        self.assertAlmostEqual(contrast_ratio("#a0a0a0", "#ffffff"), 2.615, delta=0.001)
        # 10 / 255 = 0.0392 lies below 0.04045: 0.0392 / 12.92 = 0.003035, (0.053035) / 0.05.
        self.assertAlmostEqual(contrast_ratio("#0a0a0a", "#000000"), 1.0607, delta=0.0001)

    def test_control_made_up_tokens(self):
        # invariant: design-token-contrast
        self.assertEqual(findings(changed({})), [], "passing made-up tokens are flagged")
        for name, (text, expected) in FLAGGED.items():
            with self.subTest(case=name):
                found = findings(text)
                self.assertTrue(any(expected in f for f in found),
                                f"the check does not flag {name} as {expected!r}: {found}")


if __name__ == "__main__":
    unittest.main()
