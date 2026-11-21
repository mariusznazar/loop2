"""The one cutting of TypeScript and JavaScript source text for the checks of the invariants that
scan names: the text cut into code, comments, strings, template text and regular expressions, by
the forms the two languages share. It is a lexer written for the scan of names only, not a parser:
it tells a regular expression from a division by the last token before the `/`, and it reads no
other form of either language.

The checks of `simulation-isolation`, `simulation-randomness` and `content-identifiers` and the
shared reading of the code of the balance instrument (`balance_source_scan.py`, which the checks of
`balance-instrument-file-writes` and `balance-instrument-repeatability` use) take their cut from
here, each the view it needs.

Nothing here computes a value a check expects; the checks write their expected values out as
literals (WAY-228).
"""

import re

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


def segments(text):
    """The text cut into ('code' | 'comment' | 'string' | 'template' | 'regex', text) pieces, by
    the forms TypeScript and JavaScript share — enough for a scan of names and specifiers. A
    string keeps its quotes, a regular expression its flags, and a template piece its marks: the
    backtick or the `}` that closes a substitution at its start, the backtick or the `${` that
    opens a substitution at its end."""
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
            if kind == "template" and piece.endswith("${"):
                return "{"  # a substitution opens: what follows starts an expression
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


def without_comments(text):
    """The text with each comment replaced by spaces; code, strings, template text and regular
    expressions stay as written."""
    return "".join(" " if kind == "comment" else piece for kind, piece in segments(text))


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


def _string_body(piece):
    """The text of a string piece between its quotes, as written: up to the closing quote, or to
    the end of the line or of the text where the string is not closed."""
    quote, j = piece[0], 1
    while j < len(piece) and piece[j] != quote and piece[j] != "\n":
        j += 2 if piece[j] == "\\" else 1
    return piece[1:j]


def _unescaped(body):
    """The body of a string with each backslash taken off and the character it escapes kept."""
    out, j = [], 0
    while j < len(body):
        if body[j] == "\\":
            out.append(body[j + 1 : j + 2])
            j += 2
        else:
            out.append(body[j])
            j += 1
    return "".join(out)


def _template_text(piece):
    """The text of a template piece without its marks, escapes as written."""
    text = piece[1:]
    if text.endswith("${"):
        return text[:-2]
    if text.endswith("`"):
        return text[:-1]
    return text


def string_values(text):
    """The texts of every string literal and every piece of template text, each as the readings a
    scan for a name must not miss. A string is read as written between its quotes and with its
    escapes taken off (`'cry\\pto'` reads `crypto`); a template piece is read between its marks
    and, as the old cut of the balance instrument read it, with every backtick, `$`, `{` and `}`
    taken off its two ends. A reading that equals another of the same piece stands once."""
    values = []
    for kind, piece in segments(text):
        if kind == "string":
            body = _string_body(piece)
            readings = [body, _unescaped(body)]
        elif kind == "template":
            readings = [_template_text(piece), piece.strip("`${}")]
        else:
            continue
        values += [
            reading for index, reading in enumerate(readings) if reading not in readings[:index]
        ]
    return values
