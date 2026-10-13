"""Invariant content-identifiers/1: No TypeScript file under `src/browser/` outside
`src/browser/sim/data/` names a game map, a resource or an archetype, outside its comments, by the
identifier or the name that the files of `src/browser/sim/data/` give it.

The identifiers and names are written out below in ENTRIES, transcribed from the files of
`src/browser/sim/data/`: the keys of `MAPS` (`maps.ts`), `RESOURCES` (`resources.ts`) and
`ARCHETYPES` (`archetypes.ts`), and the `name` each entry gives. The check does not read the data
at run time (WAY-69), so a map, a resource or an archetype added to the data is scanned for only
once it is written out here. The files scanned are the TypeScript files (`.ts`, `.tsx`, `.mts`,
`.cts`) git tracks or would track under `src/browser/`, less those under `src/browser/sim/data/`.

Reading of the sentence:
- names ... outside its comments: the identifier or the name stands in the file's text with its
  `//` and `/* */` comments removed — in code, in a string or in a template alike;
- names it by the identifier or the name: the identifier or name stands as a whole token, case
  as the data gives it, not preceded or followed by a letter, a digit, `_`, `$` or `-`; so `stick`
  in `'stick'`, `stick:`, `/icons/stick.svg` or `RESOURCES.stick` names the resource, while
  `wood-stick` (an icon file's name) and `stickCount` do not.

Covers:
- the scan of every such file against every identifier and name written out;
- control of the scan: made-up text naming each identifier and each name written out, in code, in a
  string and in a template, is flagged; the same names in comments only, in `wood-stick`-like
  compounds or inside longer identifiers are not; a file under `src/browser/sim/data/` and a file
  that is no TypeScript are not scanned.

Does NOT cover: a map, a resource or an archetype named otherwise (by an index, or built from
pieces at run time, or written with escape sequences); files outside `src/browser/`.
"""

import json
import os
import re
import unittest

import loop2_invariant_support as support

BROWSER_DIRECTORY = "src/browser/"
DATA_DIRECTORY = "src/browser/sim/data/"
TYPESCRIPT_EXTENSIONS = (".ts", ".tsx", ".mts", ".cts")
# The game maps, resources and archetypes, with the identifier and the name the data gives each.
ENTRIES = (
    {"kind": "map", "id": "forest", "name": "Las"},
    {"kind": "resource", "id": "stick", "name": "patyk"},
    {"kind": "resource", "id": "berry", "name": "jagoda"},
    {"kind": "resource", "id": "moss", "name": "mech"},
    {"kind": "resource", "id": "fiber", "name": "włókno"},
    {"kind": "archetype", "id": "elementalMage", "name": "Mag żywiołów"},
)

REGEX_AFTER = set("(,=:[!&|?{};+-*%<>~^")
REGEX_AFTER_WORDS = ("return", "typeof", "case", "do", "else", "in", "of", "new", "delete",
                     "void", "throw", "yield", "await", "instanceof")


def without_comments(text):
    """The text with its comments replaced by spaces, strings, templates and regular expressions
    kept, by the forms TypeScript and JavaScript share."""
    out = []
    braces = []
    i, n = 0, len(text)

    def last_significant():
        joined = "".join(out[-60:]).rstrip()
        return joined

    def template(start):
        j = start + 1
        while j < n:
            if text[j] == "\\":
                j += 2
                continue
            if text[j] == "`":
                out.append(text[start:j + 1])
                return j + 1
            if text.startswith("${", j):
                out.append(text[start:j + 2])
                braces.append(0)
                return j + 2
            j += 1
        out.append(text[start:])
        return n

    while i < n:
        c = text[i]
        if text.startswith("//", i):
            j = text.find("\n", i)
            i = n if j < 0 else j
            out.append(" ")
            continue
        if text.startswith("/*", i):
            j = text.find("*/", i + 2)
            i = n if j < 0 else j + 2
            out.append(" ")
            continue
        if c in "'\"":
            j = i + 1
            while j < n and text[j] != c and text[j] != "\n":
                j += 2 if text[j] == "\\" else 1
            out.append(text[i:j + 1])
            i = j + 1
            continue
        if c == "`":
            i = template(i)
            continue
        if c == "}" and braces:
            if braces[-1] == 0:
                braces.pop()
                i = template(i)
                continue
            braces[-1] -= 1
        if c == "{" and braces:
            braces[-1] += 1
        if c == "/":
            before = last_significant()
            word = re.search(r"([A-Za-z_$][\w$]*)$", before)
            if not before or before[-1] in REGEX_AFTER or (
                    word and word.group(1) in REGEX_AFTER_WORDS):
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
                out.append(text[i:j])
                i = j
                continue
        out.append(c)
        i += 1
    return "".join(out)


def token_pattern(word):
    return re.compile(r"(?<![\w$-])" + re.escape(word) + r"(?![\w$-])")


def scanned(relative):
    return (relative.startswith(BROWSER_DIRECTORY) and not relative.startswith(DATA_DIRECTORY)
            and relative.endswith(TYPESCRIPT_EXTENSIONS))


def findings(relative, text, entries):
    if not scanned(relative):
        return []
    code = without_comments(text)
    found = []
    for entry in entries:
        for label, word in (("identifier", entry["id"]), ("name", entry["name"])):
            if word and token_pattern(word).search(code):
                found.append(f"{relative} names the {entry['kind']} {entry['id']} by its "
                             f"{label} {word!r}")
    return found


class ContentIdentifiers(unittest.TestCase):

    def test_browser_files_outside_the_data_name_no_content(self):
        # invariant: content-identifiers/1
        entries = ENTRIES
        files = [p for p in support.listed_files() if scanned(p)]
        self.assertTrue(files, "no TypeScript file under src/browser/ outside the data")
        found = []
        for relative in files:
            found += findings(relative, support.read_text(os.path.join(support.ROOT, relative)),
                              entries)
        self.assertEqual(found, [], "a file outside the data names content by its identifier "
                                    "or name")

    def test_control_the_scan_flags_named_content(self):
        # invariant: content-identifiers/1
        entries = ENTRIES
        probe = "src/browser/view/probe.ts"
        for entry in entries:
            for word in (entry["id"], entry["name"]):
                for text in (f"const x = {json.dumps(word, ensure_ascii=False)};\n",
                             f"const x = `<b>${{n}} {word}</b>`;\n",
                             f"const p = '/icons/{word}.svg';\n",
                             f"const s = {{ {json.dumps(word, ensure_ascii=False)}: 1 }};\n"):
                    with self.subTest(text=text):
                        self.assertTrue(findings(probe, text, entries),
                                        f"the scan does not flag {text!r}")
                with self.subTest(comment=word):
                    text = f"// {word}\n/* {word} */\nconst y = 1;\n"
                    self.assertEqual(findings(probe, text, entries), [],
                                     f"the scan flags {word!r} standing in comments only")
                    compound = f"const z = 'wood-{word}-bush'; const w{word}Count = 2;\n"
                    self.assertEqual(findings(probe, compound, entries), [],
                                     f"the scan flags {word!r} inside a compound token")
            self.assertTrue(findings(probe, f"RESOURCES.{entry['id']};\n", entries))
        named = f"export const a = {json.dumps(entries[0]['id'], ensure_ascii=False)};\n"
        self.assertEqual(findings("src/browser/sim/data/probe.ts", named, entries), [])
        self.assertEqual(findings("src/browser/index.html", named, entries), [])


if __name__ == "__main__":
    unittest.main()
