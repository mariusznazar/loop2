"""Shared reading of the code of the balance instrument for the checks of its invariants: which
files of the working tree are that code and their text cut into code, comments, strings, template
text and regular expressions, enough for a scan of names.

The code of the balance instrument is the files of code git tracks or would track under
`balance/`, the overlay files and the player descriptions, which are JSON, left out. The cut is a
lexer of the forms TypeScript and JavaScript share, written for the scan of names only, like the
one the check of `simulation-isolation` holds.

Nothing here computes a value a check expects; the checks write their expected values out as
literals (WAY-228).
"""

import os
import re

import loop2_invariant_support as support

INSTRUMENT_DIRECTORY = "balance/"
COMMAND_LINE_FILE = "balance/cli.mjs"
CODE_EXTENSIONS = (".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs")

REGEX_AFTER = set("(,=:[!&|?{};+-*%<>~^")
REGEX_AFTER_WORDS = (
    "return",
    "typeof",
    "case",
    "do",
    "else",
    "in",
    "of",
    "new",
    "delete",
    "void",
    "throw",
    "yield",
    "await",
    "instanceof",
)


def instrument_files(paths):
    """The files of code of the balance instrument among the relative paths given, with '/'."""
    return [
        path
        for path in paths
        if path.startswith(INSTRUMENT_DIRECTORY) and path.endswith(CODE_EXTENSIONS)
    ]


def instrument_sources():
    """(relative path, text) of every file of code of the balance instrument in the working tree."""
    return [
        (relative, support.read_text(os.path.join(support.ROOT, relative)))
        for relative in instrument_files(support.listed_files())
    ]


def segments(text):
    """The text cut into ('code' | 'comment' | 'string' | 'template' | 'regex', text) pieces."""
    out, buf, braces = [], [], []
    i, n = 0, len(text)

    def flush():
        if buf:
            out.append(("code", "".join(buf)))
            buf.clear()

    def last_code():
        for kind, piece in reversed(out + [("code", "".join(buf))]):
            if kind == "comment":
                continue
            stripped = piece.rstrip()
            if kind != "code":
                return "x"  # an operand
            if stripped:
                return stripped
        return ""

    def template(start):
        """From a backtick or the brace closing a substitution, to the end of the template or
        the opening of its next substitution."""
        j = start + 1
        while j < n:
            if text[j] == "\\":
                j += 2
                continue
            if text[j] == "`":
                out.append(("template", text[start : j + 1]))
                return j + 1
            if text.startswith("${", j):
                out.append(("template", text[start : j + 2]))
                braces.append(0)
                return j + 2
            j += 1
        out.append(("template", text[start:]))
        return n

    while i < n:
        c = text[i]
        if text.startswith("//", i) or text.startswith("/*", i):
            flush()
            if text[i + 1] == "/":
                j = text.find("\n", i)
                j = n if j < 0 else j
            else:
                j = text.find("*/", i + 2)
                j = n if j < 0 else j + 2
            out.append(("comment", text[i:j]))
            buf.append(" ")
            i = j
            continue
        if c in "'\"":
            j = i + 1
            while j < n and text[j] != c and text[j] != "\n":
                j += 2 if text[j] == "\\" else 1
            flush()
            out.append(("string", text[i : j + 1]))
            i = j + 1
            continue
        if c == "`":
            flush()
            i = template(i)
            continue
        if c == "}" and braces:
            if braces[-1] == 0:
                braces.pop()
                flush()
                i = template(i)
                continue
            braces[-1] -= 1
        if c == "{" and braces:
            braces[-1] += 1
        if c == "/":
            before = last_code()
            word = re.search(r"([A-Za-z_$][\w$]*)$", before)
            if (
                not before
                or before[-1] in REGEX_AFTER
                or (word and word.group(1) in REGEX_AFTER_WORDS)
            ):
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
                j += 1
                while j < n and (text[j].isalnum() or text[j] == "_"):
                    j += 1
                flush()
                out.append(("regex", text[i:j]))
                i = j
                continue
        buf.append(c)
        i += 1
    flush()
    return out


def code_only(text):
    """Comments removed, the content of strings, template text and regular expressions blanked."""
    parts = []
    for kind, piece in segments(text):
        if kind == "code":
            parts.append(piece)
        elif kind in ("string", "template"):
            parts.append(" '' ")
        elif kind == "regex":
            parts.append(" /re/ ")
        else:
            parts.append(" ")
    return "".join(parts)


def string_values(text):
    """The content of every string literal and the text of every template, quotes taken off."""
    return [
        piece[1:-1] if kind == "string" else piece.strip("`${}")
        for kind, piece in segments(text)
        if kind in ("string", "template")
    ]
