"""Invariant browser-view-focus-outline: In the stylesheets of the part browser-view, `outline`
and the `outline-*` properties are declared only in rules whose selector is `:focus-visible`, each
drawing the outline from the role `focus`, `src/browser/styles.css` holds such a rule, and only
the rule of `src/browser/kitchen-sink/kitchen-sink.css` has one more selector beside
`:focus-visible`, that of the page's sample of the focused state.

The stylesheets are read from the working tree as text; nothing is rendered and no cascade is
computed.

Reading of the sentence:
- the stylesheets of the part browser-view: the `.css` files git tracks or would track whose part,
  by the *Files* patterns of `foundations/part_map.md` resolved with git as
  `test_application_package_layout.py` resolves them, is browser-view — the token file included;
- declared: a declaration in any block of a stylesheet, at any depth (rules inside `@media` and
  nested rules included), its comments left out, whose property name in any letter case is
  `outline` or begins with `outline-`; a custom property such as `--outline-x`, a class
  `.outline` in a selector and a word in a comment or string are none;
- a rule whose selector is `:focus-visible`: a block whose prelude, white space collapsed and in
  lower case, is exactly `:focus-visible`;
- drawing the outline from the role `focus`: the rule declares `outline` or `outline-color` with a
  value that reads `var(--focus)` or `var(--focus, …)`, `--focus` being the whole name, so a rule
  reading only `var(--focus-width)` does not;
- `src/browser/styles.css` holds such a rule: a rule there whose selector is exactly
  `:focus-visible` declaring an outline drawn from `focus`;
- one more selector beside `:focus-visible`, in `src/browser/kitchen-sink/kitchen-sink.css`
  alone: there a rule declaring an outline may have, instead, a selector list of exactly two
  selectors, one of them `:focus-visible`; a rule anywhere else with such a list, and a list of
  three selectors anywhere, are flagged.

Covers: the stylesheets of the part; and controls: the population holds the token file and every
other `.css` file of `src/browser/` directly; made-up stylesheets holding an outline in another
rule, `outline: none`, an `outline-*` property in upper case or inside `@media`, a
`:focus-visible` rule drawing from another role or only with `outline-offset`, a second selector
outside the kitchen-sink's stylesheet, three selectors there, and a `styles.css` without the rule
are flagged, while one rule `:focus-visible` drawing from `focus`, the kitchen-sink's rule with
the selector of its sample, a class `.outline` and a custom property `--outline-…` pass.

Does NOT cover: an outline set from TypeScript or in HTML, and an outline turned off in another
way, such as `all: unset` (review, D-47); whether the browser shows the outline on every element
the keyboard reaches.
"""

import re
import unittest
from pathlib import Path

import loop2_invariant_support as support
from test_browser_view_token_values import blocks, part_files

STYLESHEET = "src/browser/styles.css"
KITCHEN_SINK_STYLESHEET = "src/browser/kitchen-sink/kitchen-sink.css"
FOCUS_VISIBLE = ":focus-visible"
FROM_FOCUS = re.compile(r"var\(\s*--focus\s*[,)]")


def is_outline(prop):
    return prop == "outline" or prop.startswith("outline-")


def selectors(prelude):
    return [" ".join(part.split()).lower() for part in prelude.split(",")]


def findings(sheets):
    """The findings for the stylesheets `sheets`, a mapping of path to text."""
    found = []
    has_rule = False
    for path, text in sorted(sheets.items()):
        for prelude, declarations, line in blocks(text):
            outlines = [(prop, value) for prop, value, _ in declarations if is_outline(prop)]
            if not outlines:
                continue
            chosen = selectors(prelude)
            where = f"{path}: line {line}: the rule {prelude!r}"
            allowed = chosen == [FOCUS_VISIBLE] or (
                path == KITCHEN_SINK_STYLESHEET and len(chosen) == 2 and FOCUS_VISIBLE in chosen)
            if not allowed:
                found.append(f"{where} declares {', '.join(p for p, _ in outlines)}")
                continue
            drawn = any(prop in ("outline", "outline-color") and FROM_FOCUS.search(value)
                        for prop, value in outlines)
            if not drawn:
                found.append(f"{where} does not draw its outline from the role focus")
            elif path == STYLESHEET and chosen == [FOCUS_VISIBLE]:
                has_rule = True
    if not has_rule:
        found.append(f"{STYLESHEET} holds no rule {FOCUS_VISIBLE} drawing its outline from the "
                     "role focus")
    return found


RULE = ":focus-visible {\n  outline: var(--focus-width) solid var(--focus);\n" \
       "  outline-offset: var(--focus-offset);\n}\n"
KITCHEN_SINK_RULE = ":focus-visible,\n.sample-focus {\n" \
                    "  outline: var(--focus-width) solid var(--focus);\n}\n"

FLAGGED = {
    "no stylesheet": {},
    "a styles.css without the rule": {STYLESHEET: "a { color: var(--text); }\n"},
    "an outline in another rule": {STYLESHEET: RULE + "button { outline: none; }\n"},
    "an outline on :focus": {STYLESHEET: RULE + ":focus { outline: 0; }\n"},
    "an outline-* property in upper case": {STYLESHEET: RULE + "a { OUTLINE-WIDTH: 0; }\n"},
    "an outline inside @media":
        {STYLESHEET: RULE + "@media (max-width: 720px) { a { outline-style: none; } }\n"},
    "an outline in a nested rule": {STYLESHEET: RULE + "a { &:hover { outline: 0; } }\n"},
    "an outline in another stylesheet": {STYLESHEET: RULE, "src/browser/other.css":
                                         "a { outline: 0; }\n"},
    "an outline in the token file": {STYLESHEET: RULE, "src/browser/tokens.css":
                                     ":root { --focus: #f4f4f5; }\na { outline: 0; }\n"},
    "the rule drawing from another role":
        {STYLESHEET: ":focus-visible { outline: var(--focus-width) solid var(--text); }\n"},
    "the rule reading only the focus width":
        {STYLESHEET: ":focus-visible { outline: var(--focus-width) solid; }\n"},
    "the rule with outline-offset alone":
        {STYLESHEET: ":focus-visible { outline-offset: var(--focus-offset); }\n"},
    "a second selector in styles.css":
        {STYLESHEET: ":focus-visible,\nbutton { outline: var(--focus-width) solid var(--focus); }\n"},
    "a second selector in another stylesheet": {STYLESHEET: RULE, "src/browser/other.css":
                                                KITCHEN_SINK_RULE},
    "three selectors in the kitchen-sink's stylesheet":
        {STYLESHEET: RULE, KITCHEN_SINK_STYLESHEET:
         ":focus-visible, .a, .b { outline: var(--focus-width) solid var(--focus); }\n"},
    "the kitchen-sink's rule without :focus-visible":
        {STYLESHEET: RULE, KITCHEN_SINK_STYLESHEET:
         ".a, .b { outline: var(--focus-width) solid var(--focus); }\n"},
    "the rule only in the kitchen-sink's stylesheet": {KITCHEN_SINK_STYLESHEET: RULE},
}
CLEAN = {
    STYLESHEET: (
        "/* button { outline: none; } */\n"
        ".terrain-drawing .outline { fill: none; stroke: var(--character); }\n"
        ":root { --outline-gap: var(--space-s); }\n"
        'a::after { content: "outline: none"; }\n'
        + RULE.replace(":focus-visible", ":FOCUS-VISIBLE  ")
    ),
    KITCHEN_SINK_STYLESHEET: KITCHEN_SINK_RULE,
    "src/browser/tokens.css": ":root {\n  --focus: #f4f4f5;\n  --focus-width: 2px;\n}\n",
}


class BrowserViewFocusOutline(unittest.TestCase):

    def test_the_outline_stands_only_in_the_focus_visible_rule(self):
        # invariant: browser-view-focus-outline
        sheets = {path: support.read_text(str(Path(support.ROOT, *path.split("/"))))
                  for path in part_files() if path.endswith(".css")}
        self.assertEqual(findings(sheets), [])

    def test_control_the_population_holds_the_part_stylesheets(self):
        # invariant: browser-view-focus-outline
        sheets = [path for path in part_files() if path.endswith(".css")]
        directly = sorted(path for path in support.listed_files()
                          if re.fullmatch(r"src/browser/[^/]+\.css", path))
        self.assertTrue(directly, "src/browser holds no stylesheet")
        for path in directly:
            self.assertIn(path, sheets)

    def test_control_the_reading_flags_each_other_outline(self):
        # invariant: browser-view-focus-outline
        for name, sheets in FLAGGED.items():
            with self.subTest(case=name):
                self.assertTrue(findings(sheets), f"the check does not flag {name}")
        self.assertEqual(findings(CLEAN), [], "the check flags clean made-up stylesheets")


if __name__ == "__main__":
    unittest.main()
