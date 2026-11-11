"""Invariant icon-credits: For each SVG icon file directly in `assets/icons/`, the game's section of
credits holds a credit that names the icon's title as its page on game-icons.net gives it, the
icon's author, that page and the licence CC BY 3.0, and says how the icon file differs from its
source.

The application is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written). The section of credits is a React component, `CreditsSection` of the built
`dist/browser/view/credits-section.js`; a Node script this check writes to a temporary directory
loads `react` and `react-dom/server` from the built copy (not from where the script stands),
renders the component with `renderToStaticMarkup`, which needs no document, and writes the HTML
out, which the check parses. The SVG files are the files with the extension `.svg` that git tracks
or would track directly in `assets/icons/`.

Reading of the sentence:
- the section of credits: the `<details>` that `CreditsSection` renders, folded, with the summary
  "Autorzy grafiki"; that the login card and Siedziba draw it is held by D-27 and by
  `tests/view/account-screen.test.mjs` and `tests/view/headquarters-screen.test.mjs`, not by this
  check;
- shows: stands in the section's text, or, for a page, as the target of a link (`href`) or in text;
- the icon's page on game-icons.net: `https://game-icons.net/1x1/<author folder>/<file name less
  .svg>.html`;
- a credit for a file: the largest element around that page's link or text that holds no page of
  another icon file; everything the sentence asks of the credit stands inside it;
- names the icon's title as its page on game-icons.net gives it: the credit's text, its white
  space run together, holds the title written out per icon file in TITLES below, letter case as
  written — the heading of the icon's page, as the environment facts `game-icons-<file name less
  .svg>-title` quote it. An icon file with no title written out has no title fact, and the check
  flags it as a gap instead of passing it;
- names the icon's author: the credit's text holds the name of the author folder of the page,
  letter case aside; and, for the files written out in AUTHORS below, the author named there,
  as game-icons.net and the game-icons/icons licence file give it;
- names the licence CC BY 3.0: the credit's text holds `CC BY 3.0`;
- says how the file differs from its source: the credit's text holds a statement of change, one
  of the stems written out in CHANGE_WORDS (Polish, the game's language, or English).

Controls, so the check can fail: a made-up section built with `createElement` is rendered by the
same script and gives the HTML it means, and the comparison flags made-up credits lacking, in turn,
a credit for one file, the title (also when another title or the title in other letter case stands
there), the author, the page, the licence (also when it stands once outside the credits) and the
statement of change, and an icon file with no title written out, while made-up credits holding all
of them pass.

Does NOT cover: whether the statement of change is true of the file; how the section looks in a
browser (it is not rendered); credits shown anywhere but the section; whether the login card or
Siedziba draws the section.
"""

import html.parser
import json
import os
import re
import shutil
import tempfile
import unittest

import loop2_invariant_support as support

ICON_DIRECTORY = "assets/icons/"
SECTION_MODULE = "dist/browser/view/credits-section.js"
SECTION_SUMMARY = "Autorzy grafiki"
LICENCE = "CC BY 3.0"
PAGE = re.compile(r"https://game-icons\.net/1x1/([\w-]+)/([\w-]+)\.html")
# Stems of a statement that a file was changed: zmienione, zmodyfikowane, przerobione; changed,
# modified, adapted.
CHANGE_WORDS = ("zmienion", "zmodyfikowan", "przerobion", "changed", "modified", "adapted")
# Authors of the current icon files, as their pages on game-icons.net and the contributors' list
# of the game-icons/icons licence file give them.
AUTHORS = {
    "wood-stick.svg": "Delapouite",
    "berry-bush.svg": "Delapouite",
    "fern.svg": "Delapouite",
    "flax.svg": "Delapouite",
    "campfire.svg": "Lorc",
    "binoculars.svg": "Delapouite",
    "hiking.svg": "Delapouite",
    "direction-sign.svg": "Delapouite",
    "grab.svg": "Lorc",
    "claw-hammer.svg": "Lorc",
    "match-tip.svg": "Lorc",
    "logging.svg": "Skoll",
    "meal.svg": "Delapouite",
    "deadly-strike.svg": "Lorc",
    "boot-kick.svg": "Lorc",
    "dodge.svg": "Felbrigg",
    "wood-pile.svg": "Delapouite",
}
# Titles of the current icon files, as the headings of their pages on game-icons.net give them
# (the environment facts game-icons-wood-stick-title, game-icons-berry-bush-title,
# game-icons-fern-title, game-icons-flax-title, game-icons-campfire-title,
# game-icons-binoculars-title, game-icons-hiking-title, game-icons-direction-sign-title,
# game-icons-grab-title, game-icons-claw-hammer-title, game-icons-match-tip-title,
# game-icons-logging-title, game-icons-meal-title, game-icons-deadly-strike-title,
# game-icons-boot-kick-title, game-icons-dodge-title and game-icons-wood-pile-title).
TITLES = {
    "wood-stick.svg": "Wood stick icon",
    "berry-bush.svg": "Berry bush icon",
    "fern.svg": "Fern icon",
    "flax.svg": "Flax icon",
    "campfire.svg": "Campfire icon",
    "binoculars.svg": "Binoculars icon",
    "hiking.svg": "Hiking icon",
    "direction-sign.svg": "Direction sign icon",
    "grab.svg": "Grab icon",
    "claw-hammer.svg": "Claw hammer icon",
    "match-tip.svg": "Match tip icon",
    "logging.svg": "Logging icon",
    "meal.svg": "Meal icon",
    "deadly-strike.svg": "Deadly strike icon",
    "boot-kick.svg": "Boot kick icon",
    "dodge.svg": "Dodge icon",
    "wood-pile.svg": "Wood Pile icon",
}

REACT_DRIVER = r"""
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const [modulePath, exportName, builtRoot, mode, outPath] = process.argv.slice(2);
// react and react-dom/server are resolved from the built copy, not from where this script stands.
const requireFromCopy = createRequire(pathToFileURL(join(builtRoot, 'package.json')).href);
const { createElement } = requireFromCopy('react');
const { renderToStaticMarkup } = requireFromCopy('react-dom/server');
const module = await import(pathToFileURL(modulePath).href);
const element = mode === 'component' ? createElement(module[exportName]) : module[exportName](createElement);
writeFileSync(outPath, JSON.stringify({ html: renderToStaticMarkup(element), documentStood: typeof globalThis.document !== 'undefined' }));
"""

MADE_UP_SECTION = r"""
export function made(createElement) {
  const item = (stem, ...rest) => createElement('li', { key: stem }, ...rest);
  return createElement('details', null,
    createElement('summary', null, 'Autorzy grafiki'),
    createElement('ul', null,
      item('fern', 'Paproć: „Fern icon”, Delapouite, ',
        createElement('a', { href: 'https://game-icons.net/1x1/delapouite/fern.html' }, 'game-icons.net'),
        ', CC BY 3.0, zmienione'),
      item('flax', 'Len: „Flax icon”, Delapouite, ',
        createElement('a', { href: 'https://game-icons.net/1x1/delapouite/flax.html' }, 'game-icons.net'),
        ', CC BY 3.0, zmienione')));
}
"""
MADE_UP_SECTION_EXPECTED = (
    '<details><summary>Autorzy grafiki</summary><ul><li>Paproć: „Fern icon”, Delapouite, '
    '<a href="https://game-icons.net/1x1/delapouite/fern.html">game-icons.net</a>, CC BY 3.0, '
    'zmienione</li><li>Len: „Flax icon”, Delapouite, '
    '<a href="https://game-icons.net/1x1/delapouite/flax.html">game-icons.net</a>, CC BY 3.0, '
    'zmienione</li></ul></details>'
)

class Tree(html.parser.HTMLParser):
    """Elements as dicts: {'tag', 'attrs', 'children'}; text as str."""
    VOID = {"br", "hr", "img", "input", "meta", "link", "wbr", "source"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = {"tag": "#root", "attrs": {}, "children": []}
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        element = {"tag": tag, "attrs": dict(attrs), "children": []}
        self.stack[-1]["children"].append(element)
        if tag not in self.VOID:
            self.stack.append(element)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i]["tag"] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        self.stack[-1]["children"].append(data)


def parse(markup):
    tree = Tree()
    tree.feed(markup)
    tree.close()
    return tree.root


def text_of(node):
    if isinstance(node, str):
        return node
    return "".join(text_of(c) for c in node["children"])


def pages_in(node):
    """The game-icons.net pages a node shows, in links' targets or in text."""
    if isinstance(node, str):
        return set(PAGE.findall(node))
    found = set(PAGE.findall(node["attrs"].get("href") or ""))
    for child in node["children"]:
        found |= pages_in(child)
    return found


def credit_for(root, stem):
    """The largest element holding the page of `stem` and no page of another file, or None."""
    def search(node):
        if isinstance(node, str):
            return None
        stems = {s for _, s in pages_in(node)}
        if stem not in stems:
            return None
        if stems == {stem}:
            return node
        for child in node["children"]:
            found = search(child)
            if found is not None:
                return found
        return None
    return search(root)


def violations(section_html, files, titles=None):
    titles = TITLES if titles is None else titles
    root = parse(section_html)
    found = []
    for name in files:
        stem = name[:-len(".svg")]
        credit = credit_for(root, stem)
        if credit is None:
            found.append(f"{name}: the section shows no credit with its page on game-icons.net")
            continue
        text = " ".join(text_of(credit).split())
        if name not in titles:
            found.append(f"{name}: no title is written out in the check, as no title fact names "
                         "it; the title of this icon file stays unchecked")
        elif titles[name] not in text:
            found.append(f"{name}: the credit does not name the title {titles[name]!r}: {text!r}")
        folders = [folder for folder, s in pages_in(credit) if s == stem]
        names = [folder.replace("-", " ").lower() for folder in folders]
        if not any(n in text.lower() or n.replace(" ", "") in text.lower().replace(" ", "")
                   for n in names):
            found.append(f"{name}: the credit does not name the author of {folders}: {text!r}")
        if name in AUTHORS and AUTHORS[name] not in text:
            found.append(f"{name}: the credit does not name the author {AUTHORS[name]}: {text!r}")
        if name in AUTHORS and (AUTHORS[name].lower(), stem) not in pages_in(credit):
            found.append(f"{name}: the credit does not show its page under the author's folder")
        if LICENCE not in text:
            found.append(f"{name}: the credit does not name the licence {LICENCE}: {text!r}")
        if not any(word in text.lower() for word in CHANGE_WORDS):
            found.append(f"{name}: the credit does not say how the file differs: {text!r}")
    return found


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def render_section(module_path, export_name, built_root, mode):
    """The HTML a React export renders with `renderToStaticMarkup` from the built copy's react."""
    work = tempfile.mkdtemp(prefix="loop2-icon-credits-section-")
    try:
        script = os.path.join(work, "driver.mjs")
        out_path = os.path.join(work, "section.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(REACT_DRIVER)
        code, output = support.run(
            [node(), script, module_path, export_name, built_root, mode, out_path], work)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            rendered = json.load(handle)
        if rendered["documentStood"]:
            raise AssertionError("a document stood while the section rendered")
        return rendered["html"]
    finally:
        shutil.rmtree(work, ignore_errors=True)


def icon_files():
    return sorted(p[len(ICON_DIRECTORY):] for p in support.listed_files()
                  if p.startswith(ICON_DIRECTORY) and "/" not in p[len(ICON_DIRECTORY):]
                  and p.endswith(".svg"))


def credit_html(stem, author="Delapouite", folder="delapouite", licence=LICENCE,
                change="zmienione (bez tła)", title=None):
    title = TITLES[stem + ".svg"] if title is None else title
    return (f'<li>{stem}: „{title}”, <a href="https://game-icons.net/1x1/{folder}/{stem}.html">'
            f'ikona</a>, {author}, <a href="https://creativecommons.org/licenses/by/3.0/">'
            f'{licence}</a>, {change}</li>')


class IconCredits(unittest.TestCase):

    def test_credits_section_credits_each_icon_file(self):
        # invariant: icon-credits
        files = icon_files()
        self.assertTrue(files, f"the working tree holds no SVG file in {ICON_DIRECTORY}")
        copy = support.built_copy()
        section = copy.file(SECTION_MODULE)
        self.assertTrue(os.path.isfile(section), f"`npm run build` placed no {SECTION_MODULE}")
        markup = render_section(section, "CreditsSection", copy.path, "component")
        root = parse(markup)
        details = root["children"]
        self.assertEqual([d["tag"] for d in details], ["details"], f"the section:\n{markup}")
        self.assertNotIn("open", details[0]["attrs"], "the section is not folded")
        summary = next(c for c in details[0]["children"] if not isinstance(c, str))
        self.assertEqual((summary["tag"], text_of(summary)), ("summary", SECTION_SUMMARY))
        self.assertEqual(violations(markup, files), [], f"the section:\n{markup}")

    def test_control_the_section_script_renders_what_a_section_means(self):
        # invariant: icon-credits
        copy = support.built_copy()
        work = tempfile.mkdtemp(prefix="loop2-icon-credits-made-")
        try:
            module = os.path.join(work, "made.mjs")
            with open(module, "w", encoding="utf-8", newline="\n") as handle:
                handle.write(MADE_UP_SECTION)
            markup = render_section(module, "made", copy.path, "factory")
        finally:
            shutil.rmtree(work, ignore_errors=True)
        self.assertEqual(markup, MADE_UP_SECTION_EXPECTED)
        self.assertEqual(violations(markup, ["fern.svg", "flax.svg"]), [])
        self.assertTrue(violations(markup.split("<li>Len")[0] + "</ul></details>", ["flax.svg"]),
                        "a section without the credit of a file goes unseen")

    def test_control_the_comparison_flags_missing_parts(self):
        # invariant: icon-credits
        files = ["fern.svg", "flax.svg"]
        good = "<section><ul>" + credit_html("fern") + credit_html("flax") + "</ul></section>"
        self.assertEqual(violations(good, files), [])
        broken = {
            "no credit for one file": "<section>" + credit_html("fern") + "</section>",
            "no author": "<section>" + credit_html("fern", author="") + credit_html("flax")
                         + "</section>",
            "another author": "<section>" + credit_html("fern", author="Lorc", folder="lorc")
                              + credit_html("flax") + "</section>",
            "no title": "<section>" + credit_html("fern", title="") + credit_html("flax")
                        + "</section>",
            "another title": "<section>" + credit_html("fern", title="Flax icon")
                             + credit_html("flax") + "</section>",
            "the title in other letter case": "<section>" + credit_html("fern", title="fern icon")
                                              + credit_html("flax") + "</section>",
            "no page": "<section><li>fern: Fern icon, Delapouite, CC BY 3.0, zmienione</li>"
                       + credit_html("flax") + "</section>",
            "no licence": "<section>" + credit_html("fern", licence="CC BY") + credit_html("flax")
                          + "</section>",
            "licence outside the credits": "<section><p>CC BY 3.0</p><ul>"
                                           + credit_html("fern", licence="licencja")
                                           + credit_html("flax", licence="licencja")
                                           + "</ul></section>",
            "no change": "<section>" + credit_html("fern", change="") + credit_html("flax")
                         + "</section>",
        }
        for label, markup in broken.items():
            with self.subTest(case=label):
                self.assertTrue(violations(markup, files), f"{label} goes unseen")
        no_fact = {name: title for name, title in TITLES.items() if name != "flax.svg"}
        self.assertTrue(violations(good, files, no_fact),
                        "an icon file with no title written out passes")


if __name__ == "__main__":
    unittest.main()
