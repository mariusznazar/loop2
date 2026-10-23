"""Invariant browser-view-token-values: No file of the part browser-view other than
`src/browser/tokens.css` holds in its text a value written in place of a design token, as D-43
defines it.

The files are read from the working tree as text: nothing is built, rendered or parsed as code,
no value is traced to where it comes from, and no cascade is computed.

Reading of the sentence:
- the files of the part browser-view: the files git tracks or would track whose part, by the
  *Files* patterns of `foundations/part_map.md` resolved with git as
  `test_application_package_layout.py` resolves them, is browser-view, and whose name ends in
  `.css`, `.html`, `.ts`, `.mts` or `.cts`, less `src/browser/tokens.css`;
- the text of styles: a `.css` file, and in an HTML file the content of each `<style>` element and
  the value of each `style` attribute, HTML comments left out. Of it only the values of
  declarations are read, at any depth of blocks (`@media` blocks included) — never a selector, a
  prelude of an at-rule, a property name or the name of a custom property. In a value, comments,
  quoted strings (save for font names, below), the inside of `url()` and the name a `var()`
  reads are left out; the value of a custom property declared outside the token file is read like
  any other;
- a colour in any notation, as the environment fact `css-colour-values` gives the `<color>` type
  of CSS Color 4: a hexadecimal colour (`#` and 3, 4, 6 or 8 hexadecimal digits as a whole word);
  a colour function of its § 4.1 (`rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()`, `lab()`,
  `lch()`, `oklab()`, `oklch()`, `color()`), by its name before `(` in any letter case; a named
  colour of its § 6.1, a system colour of its § 6.2 or a deprecated system colour of its
  Appendix A, as a whole word in any letter case. The three lists below are copied from
  https://www.w3.org/TR/2026/CRD-css-color-4-20261022/, the edition the fact cites, read
  2026-10-23: the `<dfn>` keywords of each list (148, 19 and 23). `transparent` and
  `currentColor` are no such colour (D-43);
- a whole word: a run of letters, digits, `-` and `_` (cycle answer FE-2), so `panel-background`
  or `--highlight` holds no colour;
- in styles, a size or spacing: a number other than zero followed by the unit `px`, `rem` or `em`,
  in any letter case — except in the layout dimensions D-43 leaves out, the properties `width`,
  `height`, `min-width`, `min-height`, `max-width`, `max-height`, `grid-template-columns`,
  `grid-template-rows` and `grid-template`;
- in styles, a font name: in a value of `font-family`, a quoted string, or an identifier other
  than the function name `var`, a generic family keyword of CSS Fonts 4 § 2.1.5 and a CSS-wide
  keyword of CSS Cascade 5 § 7.3 (both lists below; read 2026-10-23 from
  https://www.w3.org/TR/2026/WD-css-fonts-4-20261022/ and
  https://www.w3.org/TR/2022/CR-css-cascade-5-20220113/), a `generic()` family left out with its
  argument; in a value of `font`, a quoted string;
- in styles, a unitless stroke width, dash pattern, opacity or font weight — those four kinds
  being all (D-43): a number other than zero with no unit and no `%` in a value of
  `stroke-width`, `stroke-dasharray`, `opacity`, `fill-opacity`, `stroke-opacity`,
  `flood-opacity`, `stop-opacity` or `font-weight`, and in a value of `font` a number with no
  unit and no `%` that does not follow `/` (after `/` stands the line height, which D-43 does not
  count);
- in TypeScript: only the text of string literals and the text parts of template literals is
  read — never comments, identifiers or other code; the code inside `${...}` is code, and its own
  literals are read in their turn. In that text, a colour as above: a hexadecimal colour, a
  colour function, or a named, system or deprecated system colour as a whole word, never
  `transparent` or `currentColor`; the names of the 23 roles (Q18 of the task, the styleguide's
  table Roles) are no colour there, so the role `highlight` is not read as the system colour
  Highlight;
- in an HTML file, nothing outside `<style>` elements and `style` attributes is read.

Covers: the files of the part; and controls: the population holds the part's HTML and TypeScript
files and none of the simulation's or the token file; made-up style text, HTML and TypeScript
holding each kind of value above in each place it is read are flagged, while made-up text holding
each exemption of D-43, selectors, property names, comments, strings and HTML text outside styles
passes.

Does NOT cover: a colour a module builds from numbers and writes into a style (review, D-43);
presentation attributes such as `fill` on an SVG element of an HTML file; a family named by
identifiers in a `font` value; colour functions outside CSS Color 4 § 4.1 (such as
`color-mix()`); a value that only a browser's reading of malformed CSS would see.
"""

import html
import re
import unittest
from pathlib import Path

import loop2_invariant_support as support
from test_application_package_layout import file_owners

PART = "browser-view"
TOKEN_FILE = "src/browser/tokens.css"
EXTENSIONS = (".css", ".html", ".ts", ".mts", ".cts")
TYPESCRIPT = (".ts", ".mts", ".cts")

# CSS Color 4, https://www.w3.org/TR/2026/CRD-css-color-4-20261022/, read 2026-10-23.
NAMED_COLOURS = (
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black",
    "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse",
    "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan",
    "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta",
    "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
    "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink",
    "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen",
    "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow",
    "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender",
    "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan",
    "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon",
    "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue",
    "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine",
    "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue",
    "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream",
    "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange",
    "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
    "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple",
    "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell",
    "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen",
    "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white",
    "whitesmoke", "yellow", "yellowgreen",
)
SYSTEM_COLOURS = (
    "AccentColor", "AccentColorText", "ActiveText", "ButtonBorder", "ButtonFace", "ButtonText",
    "Canvas", "CanvasText", "Field", "FieldText", "GrayText", "Highlight", "HighlightText",
    "LinkText", "Mark", "MarkText", "SelectedItem", "SelectedItemText", "VisitedText",
)
DEPRECATED_SYSTEM_COLOURS = (
    "ActiveBorder", "ActiveCaption", "AppWorkspace", "Background", "ButtonHighlight",
    "ButtonShadow", "CaptionText", "InactiveBorder", "InactiveCaption", "InactiveCaptionText",
    "InfoBackground", "InfoText", "Menu", "MenuText", "Scrollbar", "ThreeDDarkShadow",
    "ThreeDFace", "ThreeDHighlight", "ThreeDLightShadow", "ThreeDShadow", "Window", "WindowFrame",
    "WindowText",
)
COLOUR_WORDS = frozenset(
    word.lower() for word in NAMED_COLOURS + SYSTEM_COLOURS + DEPRECATED_SYSTEM_COLOURS)
COLOUR_FUNCTIONS = ("rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color")

# CSS Fonts 4 § 2.1.5, https://www.w3.org/TR/2026/WD-css-fonts-4-20261022/, read 2026-10-23.
GENERIC_FAMILIES = ("serif", "sans-serif", "cursive", "fantasy", "monospace", "system-ui", "math",
                    "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded")
# CSS Cascade 5 § 7.3, https://www.w3.org/TR/2022/CR-css-cascade-5-20220113/, read 2026-10-23.
CSS_WIDE_KEYWORDS = ("initial", "inherit", "unset", "revert", "revert-layer")

# The roles of Q18 of the task, as the styleguide's table Roles names them.
ROLE_NAMES = frozenset((
    "page", "panel", "highlight", "divider", "control-border", "selected", "text-strong", "text",
    "text-secondary", "text-label", "text-disabled", "positive", "warning", "danger", "discovery",
    "player-change", "character", "tile-hidden", "tile-revealed", "tile-edge", "link-highlight",
    "depleted", "focus"))

LAYOUT_PROPERTIES = frozenset((
    "width", "height", "min-width", "min-height", "max-width", "max-height",
    "grid-template-columns", "grid-template-rows", "grid-template"))
UNITLESS_PROPERTIES = frozenset((
    "stroke-width", "stroke-dasharray", "opacity", "fill-opacity", "stroke-opacity",
    "flood-opacity", "stop-opacity", "font-weight"))

WORD = re.compile(r"[\w-]+")
HEX = re.compile(r"#([0-9a-fA-F]+)(?![\w-])")
FUNCTION = re.compile(r"(?<![\w-])(" + "|".join(COLOUR_FUNCTIONS) + r")\s*\(", re.IGNORECASE)
NUMBER = r"[+-]?(?:\d+(?:\.\d*)?|\.\d+)"
LENGTH = re.compile(r"(?<![\w.#-])(" + NUMBER + r")(px|rem|em)(?![\w-])", re.IGNORECASE)
UNITLESS = re.compile(r"(?<![\w.#-])(" + NUMBER + r")(?![\w.%-])")
STRING = re.compile(r""""(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'""")


def line_at(text, index):
    return text.count("\n", 0, index) + 1


# --- reading CSS ----------------------------------------------------------------------------

def without_comments(css):
    """CSS text with each comment outside strings blanked, its line breaks kept."""
    out, i, n = [], 0, len(css)
    while i < n:
        if css.startswith("/*", i):
            end = css.find("*/", i + 2)
            end = n if end < 0 else end + 2
            out.append(re.sub(r"[^\n]", " ", css[i:end]))
            i = end
        elif css[i] in "\"'":
            match = STRING.match(css, i)
            end = match.end() if match else i + 1
            out.append(css[i:end])
            i = end
        else:
            out.append(css[i])
            i += 1
    return "".join(out)


def blocks(css):
    """Every block of the CSS text, nested blocks included, as (prelude, declarations, line);
    a declaration is (property name in lower case, value, line). Text at the top level that
    ends in `;`, such as an `@import`, is no declaration."""
    css = without_comments(css)
    found, stack = [], []
    start, depth, i, n = 0, 0, 0, len(css)

    def declaration(end):
        text = css[start:end]
        name, colon, value = text.partition(":")
        if stack and colon and name.strip():
            line = line_at(css, start + len(text) - len(text.lstrip()))
            stack[-1][1].append((name.strip().lower(), value, line))

    while i < n:
        c = css[i]
        if c in "\"'":
            match = STRING.match(css, i)
            i = match.end() if match else i + 1
            continue
        if c == "(":
            depth += 1
        elif c == ")":
            depth = max(0, depth - 1)
        elif depth == 0 and c == "{":
            prelude = css[start:i]
            stack.append((" ".join(prelude.split()), [],
                          line_at(css, start + len(prelude) - len(prelude.lstrip()))))
            start = i + 1
        elif depth == 0 and c == ";":
            declaration(i)
            start = i + 1
        elif depth == 0 and c == "}":
            declaration(i)
            if stack:
                found.append(stack.pop())
            start = i + 1
        i += 1
    while stack:
        declaration(n)
        found.append(stack.pop())
        start = n
    return found


def colour_findings(text, not_colours=frozenset()):
    """The colours in a text of a value or of a literal, as the reading gives them; a whole word
    of `not_colours` is none."""
    found = [f"the colour #{digits}" for digits in HEX.findall(text)
             if len(digits) in (3, 4, 6, 8)]
    found += [f"the colour function {name}()" for name in FUNCTION.findall(text)]
    found += [f"the colour {word}" for word in WORD.findall(text)
              if word.lower() in COLOUR_WORDS and word.lower() not in not_colours]
    return found


def font_name_findings(prop, value):
    strings = [match.group(0) for match in STRING.finditer(value)]
    found = [f"the font name {string}" for string in strings]
    if prop == "font-family":
        rest = STRING.sub(" ", value)
        rest = re.sub(r"var\(\s*--[\w-]*", " ", rest)
        rest = re.sub(r"generic\([^)]*\)", " ", rest, flags=re.IGNORECASE)
        rest = re.sub(r"!\s*important", " ", rest, flags=re.IGNORECASE)
        allowed = {*GENERIC_FAMILIES, *CSS_WIDE_KEYWORDS, "var"}
        found += [f"the font name {word}" for word in re.findall(r"-?[A-Za-z_][\w-]*", rest)
                  if word.lower() not in allowed]
    return found


def value_findings(prop, value):
    """The values in place of a design token in the value of a declaration of `prop`."""
    found = []
    if prop in ("font-family", "font"):
        found += font_name_findings(prop, value)
    rest = STRING.sub(" ", value)
    rest = re.sub(r"url\([^)]*\)", " ", rest, flags=re.IGNORECASE)
    rest = re.sub(r"var\(\s*--[\w-]*", "var(", rest)
    found += colour_findings(rest)
    if prop not in LAYOUT_PROPERTIES:
        found += [f"the length {number}{unit}" for number, unit in LENGTH.findall(rest)
                  if float(number) != 0]
    if prop in UNITLESS_PROPERTIES or prop == "font":
        for match in UNITLESS.finditer(rest):
            if float(match.group(1)) == 0:
                continue
            if prop == "font" and re.search(r"/\s*$", rest[:match.start()]):
                continue
            found.append(f"the unitless {prop} value {match.group(1)}")
    return found


def css_findings(css, first_line=1):
    found = []
    for _prelude, declarations, _line in blocks(css):
        for prop, value, line in declarations:
            found += [f"line {first_line + line - 1}: {prop}: {finding}"
                      for finding in value_findings(prop, value)]
    return found


# --- reading HTML and TypeScript ------------------------------------------------------------

STYLE_ELEMENT = re.compile(r"(<style\b[^>]*>)(.*?)</style\s*>", re.IGNORECASE | re.DOTALL)
TAG = re.compile(r"<[A-Za-z][^>]*>")
STYLE_ATTRIBUTE = re.compile(
    r"""\sstyle\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))""", re.IGNORECASE)


def html_findings(text):
    text = re.sub(r"<!--.*?-->", lambda m: re.sub(r"[^\n]", " ", m.group(0)), text, flags=re.S)
    found = []
    for match in STYLE_ELEMENT.finditer(text):
        found += css_findings(match.group(2), line_at(text, match.start(2)))
    outside = STYLE_ELEMENT.sub(lambda m: re.sub(r"[^\n]", " ", m.group(0)), text)
    for tag in TAG.finditer(outside):
        for attribute in STYLE_ATTRIBUTE.finditer(tag.group(0)):
            value = html.unescape(next(v for v in attribute.groups() if v is not None))
            line = line_at(outside, tag.start())
            found += [f"line {line}: style attribute: {finding.split(': ', 1)[1]}"
                      for finding in css_findings("x{" + value + "}")]
    return found


REGEX_AFTER = "(,=:[!&|?{};+-*%<>~^"
REGEX_AFTER_WORD = re.compile(
    r"(?<![\w$])(?:return|typeof|case|do|else|in|of|void|yield|await|delete|new|throw)\s*$")


def literal_texts(text):
    """(line, text) of each string literal and each text part of a template literal of a
    TypeScript text, outside comments; the code inside `${...}` is read as code."""
    found, holes = [], []
    depth, last, i, n = 0, "", 0, len(text)
    while i < n:
        c = text[i]
        if c.isspace():
            i += 1
        elif text.startswith("//", i):
            end = text.find("\n", i)
            i = n if end < 0 else end
        elif text.startswith("/*", i):
            end = text.find("*/", i + 2)
            i = n if end < 0 else end + 2
        elif c in "'\"":
            j = i + 1
            while j < n and text[j] not in (c, "\n"):
                j += 2 if text[j] == "\\" else 1
            found.append((line_at(text, i), text[i + 1:j]))
            i, last = j + 1, c
        elif c == "`" or (c == "}" and holes and depth == holes[-1]):
            if c == "}":
                holes.pop()
            j = start = i + 1
            while j < n:
                if text[j] == "\\":
                    j += 2
                elif text[j] == "`":
                    found.append((line_at(text, start), text[start:j]))
                    j += 1
                    break
                elif text.startswith("${", j):
                    found.append((line_at(text, start), text[start:j]))
                    holes.append(depth)
                    j += 2
                    break
                else:
                    j += 1
            else:
                found.append((line_at(text, start), text[start:]))
            i, last = j, "`"
        elif c == "/" and (last == "" or last in REGEX_AFTER or REGEX_AFTER_WORD.search(text[:i])):
            j, in_class = i + 1, False
            while j < n and text[j] != "\n":
                if text[j] == "\\":
                    j += 2
                    continue
                if text[j] == "[":
                    in_class = True
                elif text[j] == "]":
                    in_class = False
                elif text[j] == "/" and not in_class:
                    break
                j += 1
            i, last = j + 1, "/"
        else:
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
            i, last = i + 1, c
    return found


def typescript_findings(text):
    found = []
    for line, literal in literal_texts(text):
        found += [f"line {line}: in a literal: {finding}"
                  for finding in colour_findings(literal, ROLE_NAMES)]
    return found


def findings(path, text):
    if path.endswith(".css"):
        return css_findings(text)
    if path.endswith(".html"):
        return html_findings(text)
    if path.endswith(TYPESCRIPT):
        return typescript_findings(text)
    return []


def part_files():
    """The files git tracks or would track that the part map gives browser-view, with the
    extensions read here."""
    tracked = set(support.listed_files())
    owners = file_owners(Path(support.ROOT), tracked)
    return sorted(path for path, owner in owners.items()
                  if owner == PART and path.endswith(EXTENSIONS))


def population():
    return [path for path in part_files() if path != TOKEN_FILE]


# --- controls -------------------------------------------------------------------------------

FLAGGED = {
    "a.css": {
        "a hexadecimal colour": "a { color: #fff; }",
        "an upper-case hexadecimal colour": "a { color: #09090B; }",
        "a hexadecimal colour of four digits": "a { color: #0008; }",
        "a hexadecimal colour of eight digits": "a { color: #09090bff; }",
        "rgb()": "a { color: rgb(0 0 0); }",
        "RGBA() in upper case": "a { color: RGBA(0, 0, 0, 0.5); }",
        "hsl()": "a { background: hsl(0 0% 0%); }",
        "oklch()": "a { color: oklch(0.5 0.1 200); }",
        "color()": "a { color: color(srgb 0 0 0); }",
        "a named colour": "a { color: red; }",
        "a named colour in mixed case": "a { border: var(--frame-width) solid RebeccaPurple; }",
        "a system colour": "a { background: Canvas; }",
        "a system colour in lower case": "a { color: canvastext; }",
        "a deprecated system colour": "a { color: ThreeDFace; }",
        "a deprecated system colour that is a common word": "a { background: Window; }",
        "a length in px": "a { padding: 4px; }",
        "a length in em": "a { padding-left: 1.6em; }",
        "a length in rem": "a { font-size: 1.6rem; }",
        "a negative length": "a { margin: -2px; }",
        "a length without its leading zero": "a { margin: .5em; }",
        "a length in upper case": "a { margin: 4PX; }",
        "a length inside calc()": "a { margin: calc(100% - 2px); }",
        "a length as the fallback of var()": "a { gap: var(--space-s, 8px); }",
        "a quoted font name": 'a { font-family: "Geist"; }',
        "an unquoted font name": "a { font-family: Arial, sans-serif; }",
        "a font name of two words": "a { font-family: system-ui, Helvetica Neue; }",
        "a font name in a font value": "a { font: 13px/1.4 'Geist'; }",
        "a font weight": "a { font-weight: 600; }",
        "a font weight in a font value": "a { font: 500 var(--font-size-body) var(--f); }",
        "an opacity": "a { opacity: 0.3; }",
        "an opacity without its leading zero": "a { fill-opacity: .5; }",
        "a stroke width": "polygon { stroke-width: 1; }",
        "a dash pattern": "polygon { stroke-dasharray: 5 4; }",
        "a custom property holding a length": ":root { --gap: 4px; }",
        "a length in a rule inside @media":
            "@media (max-width: 720px) { a { gap: 8px; } }",
        "a length in a nested rule": "a { color: var(--text); &:hover { gap: 8px; } }",
        "a last declaration without `;`": "a { color: var(--text); margin: 4px }",
        "an @font-face of a stylesheet": '@font-face { font-family: "Geist"; }',
    },
    "a.html": {
        "a <style> element": "<html><style>a { color: #fff; }</style></html>",
        "a <STYLE> element in upper case": "<STYLE type='text/css'>a{gap:4px}</STYLE>",
        "a style attribute": '<p style="color: red">x</p>',
        "a style attribute in single quotes": "<p style='margin: 4px'>x</p>",
        "an unquoted style attribute": "<p style=opacity:0.5>x</p>",
        "a style attribute holding an entity": '<p style="font-family: &quot;Geist&quot;">x</p>',
    },
    "a.ts": {
        "a hexadecimal colour in a string": 'element.style.color = "#fff";',
        "a colour function in a string": "const c = 'rgb(1, 2, 3)';",
        "a named colour in a template literal": "const s = `color: ${x}; background: red`;",
        "a system colour in a string": 'const c = "Canvas";',
        "a colour in a template inside ${}": 'const s = `a ${`b ${"#000"}`} c`;',
        "a colour after a regex literal": 'const r = /a"b/; const c = "#fff";',
        "a colour after a division": 'const x = a / b; const s = "red"; const y = c / d;',
        "a colour in a string after a ${} closing a block":
            "const s = `${(() => { return 1; })()}`; const c = 'navy';",
    },
}
CLEAN = {
    "a.css": (
        "/* color: #fff; padding: 4px */\n"
        ".highlight, #red, .red > .canvas:hover { color: var(--text); }\n"
        ":root { --red: var(--danger); }\n"
        "a {\n"
        "  background: transparent;\n"
        "  border-color: currentColor;\n"
        "  border-color: CURRENTCOLOR;\n"
        "  margin: 0;\n"
        "  padding: 0px;\n"
        "  width: 4em;\n"
        "  min-width: 260px;\n"
        "  max-height: 50vh;\n"
        "  height: 100%;\n"
        "  grid-template-columns: minmax(260px, 1fr) minmax(320px, 1.4fr);\n"
        "  line-height: 1.4;\n"
        "  flex: 1;\n"
        "  z-index: 2;\n"
        "  opacity: var(--depleted);\n"
        "  opacity: 0;\n"
        "  font-family: var(--font-family-text);\n"
        "  font-family: inherit;\n"
        "  font-family: system-ui, sans-serif, generic(kai);\n"
        "  font-weight: normal;\n"
        "  font-weight: var(--font-weight-emphasis);\n"
        "  font: inherit;\n"
        "  stroke-width: var(--frame-width);\n"
        "  stroke-dasharray: var(--step-target-dash);\n"
        "  background: url(red.svg);\n"
        "  content: \"red; #fff 4px\";\n"
        "  gap: var(--space-s);\n"
        "  color-scheme: dark;\n"
        "  outline-color: var(--panel-background);\n"
        "}\n"
        "@media (max-width: 720px) { .columns { grid-template-columns: 1fr; } }\n"
    ),
    "a.html": (
        "<!doctype html>\n<html><head><!-- <style>a{color:red}</style> -->\n"
        '<link rel="stylesheet" href="/styles.css" />\n'
        "<style>a { color: var(--text); }</style></head>\n"
        '<body><p title="red">red #fff 4px</p><img width="16" height="16" />\n'
        '<p style="color: var(--text); margin: 0">x</p></body></html>\n'
    ),
    "a.ts": (
        "// #fff red rgb(0, 0, 0)\n"
        "/* Canvas */\n"
        "const red = field;\n"
        'const a = "panel-background";\n'
        "const b = 'highlight';\n"
        'const c = "transparent currentColor";\n'
        "const d = `tile ${red ? \"revealed\" : \"hidden\"} --highlight`;\n"
        'const e = /"#fff"/g;\n'
        "const f = a / b;\n"
        'const g = "var(--page)";\n'
    ),
}


class BrowserViewTokenValues(unittest.TestCase):

    def test_no_file_of_the_part_holds_a_value_in_place_of_a_token(self):
        # invariant: browser-view-token-values
        found = []
        for path in population():
            text = support.read_text(str(Path(support.ROOT, *path.split("/"))))
            found += [f"{path}: {finding}" for finding in findings(path, text)]
        self.assertEqual(found, [])

    def test_control_the_population_is_the_part_less_the_token_file(self):
        # invariant: browser-view-token-values
        files = population()
        for expected in ("src/browser/index.html", "src/browser/main.ts",
                         "src/browser/view/app.ts", "src/browser/view/terrain-panel.ts"):
            self.assertIn(expected, files)
        self.assertNotIn(TOKEN_FILE, files)
        self.assertEqual([path for path in files if path.startswith("src/browser/sim/")], [])
        self.assertEqual([path for path in files if not path.endswith(EXTENSIONS)], [])

    def test_control_the_reading_flags_each_kind_of_value(self):
        # invariant: browser-view-token-values
        for path, cases in FLAGGED.items():
            for name, text in cases.items():
                with self.subTest(file=path, case=name):
                    self.assertTrue(findings(path, text), f"the check does not flag {name}")

    def test_control_the_reading_passes_what_d43_leaves_out(self):
        # invariant: browser-view-token-values
        for path, text in CLEAN.items():
            with self.subTest(file=path):
                self.assertEqual(findings(path, text), [])


if __name__ == "__main__":
    unittest.main()
