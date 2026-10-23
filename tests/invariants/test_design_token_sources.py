"""Invariant design-token-sources: The text of `src/browser/tokens.css` holds no rule but one
`:root` rule of custom properties and `@font-face` rules, and each of their declarations is
followed, on the line of the `;` that ends it, by a comment opening with `Source:` and some
further text.

The file is read from the working tree as text. The check says that each entry is there, not that
it is true.

Reading of the sentence:
- a rule: what stands outside comments at the top of the file — a prelude and a block in braces,
  or an at-rule ending in `;`; the one `:root` rule is the rule whose prelude is exactly `:root`,
  an `@font-face` rule one whose prelude is `@font-face` in any letter case; any other rule, a
  rule inside a block and a second or missing `:root` rule are flagged;
- of custom properties: each declaration of the `:root` rule has a name beginning with `--`;
- a declaration: in a block, from its name to the `;` that ends it, over however many lines it
  runs, a `;` inside a quoted string or a comment not ending it; a declaration with no `:`, an
  empty one, and one the block's `}` ends without a `;` are flagged;
- followed, on the line of its `;`: after that `;`, on the same line, only spaces or tabs stand
  before the comment opens;
- a comment opening with `Source:` and some further text: the comment's text, less the spaces at
  its start, begins with `Source:` (that letter case), and after it stands some text other than
  white space before the comment closes; the comment may close on a later line;
- a comment or string never closed and a block never closed leave the file unread, and are
  flagged.

Covers: the file; and controls: made-up token text breaking each part of the reading in turn is
flagged, while made-up token text with a declaration over three lines, a `;` inside a quoted
`url()`, comments standing apart on lines of their own and a source comment closing on the next
line passes.

Does NOT cover: whether a source is true or names the source its value was settled with
(review); which descriptors an `@font-face` rule holds.
"""

import os
import re
import unittest

import loop2_invariant_support as support

TOKEN_FILE = "src/browser/tokens.css"
SOURCE = "Source:"


def line_at(text, index):
    return text.count("\n", 0, index) + 1


def comment_end(text, index):
    """The index after the comment that opens at index, or None when it never closes."""
    end = text.find("*/", index + 2)
    return None if end < 0 else end + 2


def string_end(text, index):
    """The index after the quoted string that opens at index, or None when it never closes."""
    quote = text[index]
    cursor = index + 1
    while cursor < len(text):
        if text[cursor] == "\\":
            cursor += 2
            continue
        if text[cursor] == quote:
            return cursor + 1
        if text[cursor] == "\n":
            return None
        cursor += 1
    return None


class Unread(Exception):
    pass


def skip_blank(text, index):
    """The index of the first character at or after index outside white space and comments."""
    while index < len(text):
        if text[index].isspace():
            index += 1
        elif text.startswith("/*", index):
            end = comment_end(text, index)
            if end is None:
                raise Unread(f"line {line_at(text, index)}: a comment never closed")
            index = end
        else:
            break
    return index


def scan_to(text, index, stops):
    """The index of the first character of `stops` at or after index outside strings and
    comments, or len(text)."""
    while index < len(text) and text[index] not in stops:
        if text.startswith("/*", index):
            end = comment_end(text, index)
        elif text[index] in "\"'":
            end = string_end(text, index)
        else:
            index += 1
            continue
        if end is None:
            raise Unread(f"line {line_at(text, index)}: a comment or string never closed")
        index = end
    return index


def skip_block(text, index):
    """The index after the block whose `{` stands at index."""
    depth = 0
    while True:
        index = scan_to(text, index, "{}")
        if index >= len(text):
            raise Unread("a block never closed")
        depth += 1 if text[index] == "{" else -1
        index += 1
        if depth == 0:
            return index


def source_finding(text, semicolon, name):
    line_end = text.find("\n", semicolon)
    rest = text[semicolon + 1:len(text) if line_end < 0 else line_end]
    opening = re.match(r"[ \t]*/\*", rest)
    where = f"line {line_at(text, semicolon)}: the declaration {name!r}"
    if not opening:
        return f"{where} has no comment after its `;` on that line"
    start = semicolon + 1 + opening.end()
    end = comment_end(text, start - 2)
    body = text[start:len(text) if end is None else end - 2].lstrip()
    if not body.startswith(SOURCE):
        return f"{where} has a comment after its `;` that does not open with {SOURCE!r}"
    if not body[len(SOURCE):].strip():
        return f"{where} has a {SOURCE!r} comment with no further text"
    return None


def block_findings(text, index, custom_properties):
    """(findings of the declarations of the block opening after index, index after its `}`)."""
    found = []
    while True:
        index = skip_blank(text, index)
        if index >= len(text):
            raise Unread("a block never closed")
        if text[index] == "}":
            return found, index + 1
        end = scan_to(text, index, ";{}")
        declaration = text[index:end]
        name = declaration.split(":", 1)[0].strip()
        where = f"line {line_at(text, index)}"
        if end < len(text) and text[end] == "{":
            found.append(f"{where}: a rule {name!r} inside a block")
            index = skip_block(text, end)
            continue
        if end >= len(text) or text[end] != ";":
            found.append(f"{where}: the declaration {name!r} has no `;`")
            index = end
            continue
        if not declaration.strip():
            found.append(f"{where}: an empty declaration")
        elif ":" not in declaration:
            found.append(f"{where}: {declaration.strip()!r} is no declaration")
        else:
            if custom_properties and not name.startswith("--"):
                found.append(f"{where}: the :root rule declares {name!r}, no custom property")
            problem = source_finding(text, end, name)
            if problem:
                found.append(problem)
        index = end + 1


def findings(text):
    found = []
    roots = 0
    index = 0
    try:
        while True:
            index = skip_blank(text, index)
            if index >= len(text):
                break
            end = scan_to(text, index, "{;}")
            prelude = re.sub(r"/\*.*?\*/", " ", text[index:end], flags=re.S).strip()
            where = f"line {line_at(text, index)}"
            if end >= len(text) or text[end] != "{":
                found.append(f"{where}: {prelude!r} is neither the :root rule nor an "
                             "@font-face rule")
                index = end + 1
                continue
            if prelude == ":root":
                roots += 1
                block, index = block_findings(text, end + 1, custom_properties=True)
                found += block
            elif prelude.lower() == "@font-face":
                block, index = block_findings(text, end + 1, custom_properties=False)
                found += block
            else:
                found.append(f"{where}: the rule {prelude!r} is neither the :root rule nor an "
                             "@font-face rule")
                index = skip_block(text, end)
    except Unread as unread:
        return [*found, f"the text cannot be read: {unread}"]
    if roots != 1:
        found.append(f"the text holds {roots} :root rules, not one")
    return found


FONT_FACE = ('@font-face {\n  font-family: "Geist"; /* Source: made up */\n'
             '  src: url("/fonts/a.woff2") format("woff2"); /* Source: made up */\n}\n')
ROOT = ":root {\n  --page: #09090b; /* Source: made up */\n}\n"

FLAGGED = {
    "a declaration without a comment": ":root {\n  --page: #09090b;\n}\n",
    "the comment on the next line": ":root {\n  --page: #09090b;\n  /* Source: made up */\n}\n",
    "the comment before the `;`": ":root {\n  --page: #09090b /* Source: made up */;\n}\n",
    "a comment not opening with Source:": ":root {\n  --page: #09090b; /* from loop */\n}\n",
    "a lower-case source:": ":root {\n  --page: #09090b; /* source: made up */\n}\n",
    "Source: with nothing after it": ":root {\n  --page: #09090b; /* Source: */\n}\n",
    "Source: with white space only": ":root {\n  --page: #09090b; /* Source:  \n  */\n}\n",
    "text between the `;` and the comment": ":root {\n  --page: #09090b; x /* Source: a */\n}\n",
    "the comment of a long declaration on its first line":
        ':root {\n  --font: /* Source: made up */\n    "Geist",\n    sans-serif;\n}\n',
    "a last declaration without `;`": ":root {\n  --page: #09090b /* Source: made up */\n}\n",
    "an @font-face descriptor without a comment":
        ROOT + '@font-face {\n  font-family: "Geist";\n}\n',
    "a property of the :root rule that is no custom property":
        ":root {\n  color: #f4f4f5; /* Source: made up */\n}\n",
    "a second :root rule": ROOT + ROOT,
    "no :root rule": FONT_FACE,
    "another rule": ROOT + "body {\n  color: #f4f4f5; /* Source: made up */\n}\n",
    "an @media rule": ROOT + "@media (max-width: 720px) {\n" + ROOT + "}\n",
    "a rule inside the :root rule":
        ":root {\n  .a {\n    --b: 1px; /* Source: made up */\n  }\n}\n",
    "an @import": '@import "other.css";\n' + ROOT,
    "a block never closed": ":root {\n  --page: #09090b; /* Source: made up */\n",
    "a comment never closed": ROOT + "/* the end",
    "a declaration with no colon": ":root {\n  --page #09090b; /* Source: made up */\n}\n",
    "an empty declaration": ":root {\n  ; /* Source: made up */\n}\n",
}
CLEAN = (
    "/* Design tokens, made up. */\n"
    ":root {\n"
    "  /* Backgrounds */\n"
    "  --page: #09090b; /* Source: made up */\n"
    "  --font-family-text:\n"
    '    "Geist",\n'
    "    sans-serif; /* Source: made up,\n"
    "       over two lines */\n"
    "  --depleted: 0.35;\t/* Source: made up */\n"
    "}\n"
    "\n"
    '@font-face {\n  font-family: "Geist"; /* Source: made up */\n'
    '  src: url("/fonts/a;b.woff2") format("woff2"); /* Source: made up */\n'
    "  font-weight: 400; /*Source: made up */\n"
    "}\n"
)


class DesignTokenSources(unittest.TestCase):

    def test_every_token_has_a_source_entry(self):
        # invariant: design-token-sources
        path = os.path.join(support.ROOT, *TOKEN_FILE.split("/"))
        self.assertTrue(os.path.isfile(path), f"{TOKEN_FILE} does not exist")
        text = support.read_text(path)
        self.assertEqual(findings(text), [])

    def test_control_the_reading_flags_each_missing_entry(self):
        # invariant: design-token-sources
        for name, text in FLAGGED.items():
            with self.subTest(case=name):
                self.assertTrue(findings(text), f"the check does not flag {name}")
        self.assertEqual(findings(CLEAN), [], "the check flags clean made-up token text")


if __name__ == "__main__":
    unittest.main()
