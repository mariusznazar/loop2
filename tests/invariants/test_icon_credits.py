"""Invariant icon-credits: For each SVG icon file directly in `assets/icons/`, the game's footer
shows a credit that names the icon's title as its page on game-icons.net gives it, the icon's
author, that page and the licence CC BY 3.0, and says how the icon file differs from its source.

The application is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written). A Node script this check writes to a temporary directory installs a small
stand-in for the page's `document` (elements, text, attributes, properties such as `href`, and
`innerHTML` kept as written), calls `createFooter()` of the built `dist/public/view/footer.js` and
writes the element it returns out as HTML, which the check parses. The SVG files are the files
with the extension `.svg` that git tracks or would track directly in `assets/icons/`.

Reading of the sentence:
- the game's footer: the element `createFooter()` returns, which a built module of the game's view
  other than `footer.js` imports and calls (checked by a scan of the built modules' text);
- shows: stands in the footer's text, or, for a page, as the target of a link (`href`) or in text;
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

Controls, so the check can fail: the stand-in `document`, given a made-up footer built with
`createElement`, `textContent`, `append`, `appendChild`, `setAttribute`, the `href` property,
`className`, `innerHTML` and a fragment, writes out the HTML the made-up footer means; and the
comparison flags made-up footers lacking, in turn, a credit for one file, the title (also when
another title or the title in other letter case stands there), the author, the page, the licence
(also when it stands once outside the credits) and the statement of change, and an icon file with
no title written out, while a made-up footer holding all of them passes.

Does NOT cover: whether the statement of change is true of the file; how the footer looks in a
browser (it is not rendered); credits shown anywhere but the footer.
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
FOOTER_MODULE = "dist/public/view/footer.js"
VIEW_DIRECTORY = "dist/public"
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
}
# Titles of the current icon files, as the headings of their pages on game-icons.net give them
# (the environment facts game-icons-wood-stick-title, game-icons-berry-bush-title,
# game-icons-fern-title, game-icons-flax-title and game-icons-campfire-title).
TITLES = {
    "wood-stick.svg": "Wood stick icon",
    "berry-bush.svg": "Berry bush icon",
    "fern.svg": "Fern icon",
    "flax.svg": "Flax icon",
    "campfire.svg": "Campfire icon",
}

FAKE_DOCUMENT = r"""
const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'wbr', 'source']);
const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttribute = (s) => escapeText(s).replace(/"/g, '&quot;');
const PROPERTY_ATTRIBUTES = { className: 'class', htmlFor: 'for' };
class Text {
  constructor(text) { this.nodeType = 3; this.data = String(text); this.parentNode = null; }
  get textContent() { return this.data; }
  set textContent(v) { this.data = String(v); }
  toHTML() { return escapeText(this.data); }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
}
class Raw {
  constructor(html) { this.nodeType = 99; this.html = String(html); this.parentNode = null; }
  get textContent() { return this.html.replace(/<[^>]*>/g, ''); }
  toHTML() { return this.html; }
}
const toNode = (n) => (typeof n === 'object' && n !== null ? n : new Text(n));
class Element {
  constructor(tag) {
    this.nodeType = 1; this.localName = String(tag).toLowerCase();
    this.tagName = this.localName.toUpperCase(); this.childNodes = []; this.attributes = {};
    this.parentNode = null; this.style = { setProperty() {}, removeProperty() {} };
    this.dataset = {};
    const self = this;
    this.classList = {
      add: (...c) => { const s = new Set((self.attributes.class || '').split(/\s+/).filter(Boolean)); c.forEach((x) => s.add(x)); self.attributes.class = [...s].join(' '); },
      remove: (...c) => { self.attributes.class = (self.attributes.class || '').split(/\s+/).filter((x) => x && !c.includes(x)).join(' '); },
      toggle: (c, force) => { const has = (self.attributes.class || '').split(/\s+/).includes(c); if (force === undefined ? !has : force) self.classList.add(c); else self.classList.remove(c); },
      contains: (c) => (self.attributes.class || '').split(/\s+/).includes(c),
    };
    return new Proxy(this, {
      set(target, prop, value) {
        if (prop in target || typeof prop === 'symbol') { target[prop] = value; return true; }
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          target.attributes[PROPERTY_ATTRIBUTES[prop] || String(prop).toLowerCase()] = String(value);
          return true;
        }
        target[prop] = value; return true;
      },
      get(target, prop) {
        if (prop in target || typeof prop === 'symbol') return target[prop];
        const name = PROPERTY_ATTRIBUTES[prop] || String(prop).toLowerCase();
        if (name in target.attributes) return target.attributes[name];
        return undefined;
      },
    });
  }
  get children() { return this.childNodes.filter((n) => n.nodeType === 1); }
  get firstChild() { return this.childNodes[0] || null; }
  get textContent() { return this.childNodes.map((n) => n.textContent).join(''); }
  set textContent(v) { this.replaceChildren(String(v)); }
  get innerText() { return this.textContent; }
  set innerText(v) { this.textContent = v; }
  set innerHTML(v) { this.childNodes = [new Raw(v)]; }
  get innerHTML() { return this.childNodes.map((n) => n.toHTML()).join(''); }
  setAttribute(name, value) { this.attributes[String(name).toLowerCase()] = String(value); }
  getAttribute(name) { const v = this.attributes[String(name).toLowerCase()]; return v === undefined ? null : v; }
  hasAttribute(name) { return String(name).toLowerCase() in this.attributes; }
  removeAttribute(name) { delete this.attributes[String(name).toLowerCase()]; }
  toggleAttribute(name, force) { if (force === false || (force === undefined && this.hasAttribute(name))) this.removeAttribute(name); else this.setAttribute(name, ''); }
  addEventListener() {}
  removeEventListener() {}
  appendChild(node) { this.append(node); return node; }
  append(...nodes) {
    for (const n of nodes.map(toNode)) {
      if (n.nodeType === 11) { for (const c of [...n.childNodes]) this.append(c); n.childNodes = []; continue; }
      if (n.parentNode) n.parentNode.removeChild(n);
      n.parentNode = this; this.childNodes.push(n);
    }
  }
  prepend(...nodes) { const rest = this.childNodes; this.childNodes = []; this.append(...nodes); this.childNodes.push(...rest); }
  insertBefore(node, ref) { const rest = this.childNodes; const i = ref ? rest.indexOf(ref) : rest.length; this.childNodes = rest.slice(0, i); this.append(node); this.childNodes.push(...rest.slice(i)); return node; }
  replaceChildren(...nodes) { this.childNodes = []; this.append(...nodes); }
  removeChild(node) { this.childNodes = this.childNodes.filter((n) => n !== node); node.parentNode = null; return node; }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
  toHTML() {
    const attributes = Object.entries(this.attributes).map(([k, v]) => ` ${k}="${escapeAttribute(v)}"`).join('');
    if (VOID.has(this.localName)) return `<${this.localName}${attributes}>`;
    return `<${this.localName}${attributes}>${this.childNodes.map((n) => n.toHTML()).join('')}</${this.localName}>`;
  }
}
globalThis.document = {
  createElement: (tag) => new Element(tag),
  createElementNS: (_ns, tag) => new Element(tag),
  createTextNode: (text) => new Text(text),
  createDocumentFragment: () => { const f = new Element('template'); f.nodeType = 11; return f; },
  addEventListener() {},
};
"""

DRIVER = (
    "import { writeFileSync } from 'node:fs';\n"
    "import { pathToFileURL } from 'node:url';\n"
    + FAKE_DOCUMENT
    + r"""
const [modulePath, exportName, outPath] = process.argv.slice(2);
const module = await import(pathToFileURL(modulePath).href);
const element = module[exportName]();
writeFileSync(outPath, JSON.stringify({ html: element.toHTML() }));
"""
)

MADE_UP_FOOTER = r"""
export function made() {
  const footer = document.createElement('footer');
  footer.className = 'credits';
  const list = document.createElement('ul');
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.href = 'https://game-icons.net/1x1/delapouite/fern.html';
  link.textContent = 'Fern icon';
  item.append('Mech: ', link, ' — Delapouite, ');
  const licence = document.createElement('a');
  licence.setAttribute('href', 'https://creativecommons.org/licenses/by/3.0/');
  licence.appendChild(document.createTextNode('CC BY 3.0'));
  item.append(licence, '; zmienione');
  const fragment = document.createDocumentFragment();
  fragment.append(item);
  list.appendChild(fragment);
  const note = document.createElement('p');
  note.innerHTML = '<b>Ikony</b> &amp; więcej';
  footer.append(list, note);
  return footer;
}
"""
MADE_UP_EXPECTED = (
    '<footer class="credits"><ul><li>Mech: <a href="https://game-icons.net/1x1/delapouite/'
    'fern.html">Fern icon</a> — Delapouite, <a href="https://creativecommons.org/licenses/by/3.0/">'
    'CC BY 3.0</a>; zmienione</li></ul><p><b>Ikony</b> &amp; więcej</p></footer>'
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


def violations(footer_html, files, titles=None):
    titles = TITLES if titles is None else titles
    root = parse(footer_html)
    found = []
    for name in files:
        stem = name[:-len(".svg")]
        credit = credit_for(root, stem)
        if credit is None:
            found.append(f"{name}: the footer shows no credit with its page on game-icons.net")
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


def render(module_path, export_name):
    work = tempfile.mkdtemp(prefix="loop2-icon-credits-")
    try:
        script = os.path.join(work, "driver.mjs")
        out_path = os.path.join(work, "footer.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(DRIVER)
        code, output = support.run([node(), script, module_path, export_name, out_path], work)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            return json.load(handle)["html"]
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

    def test_footer_credits_each_icon_file(self):
        # invariant: icon-credits
        files = icon_files()
        self.assertTrue(files, f"the working tree holds no SVG file in {ICON_DIRECTORY}")
        copy = support.built_copy()
        footer = copy.file(FOOTER_MODULE)
        self.assertTrue(os.path.isfile(footer), f"`npm run build` placed no {FOOTER_MODULE}")
        callers = []
        for current, _dirs, names in os.walk(copy.file(VIEW_DIRECTORY)):
            for name in names:
                path = os.path.join(current, name)
                if name.endswith(".js") and os.path.abspath(path) != os.path.abspath(footer):
                    text = support.read_text(path)
                    if re.search(r"from\s*['\"][./]*(?:view/)?footer\.js['\"]", text) and \
                            re.search(r"\bcreateFooter\s*\(", text):
                        callers.append(name)
        self.assertTrue(callers, "no module of the game imports footer.js and calls "
                                 "createFooter, so the footer is not the game's")
        markup = render(footer, "createFooter")
        self.assertEqual(violations(markup, files), [], f"the footer:\n{markup}")

    def test_control_the_stand_in_document_writes_what_a_footer_means(self):
        # invariant: icon-credits
        work = tempfile.mkdtemp(prefix="loop2-icon-credits-made-")
        try:
            module = os.path.join(work, "made.mjs")
            with open(module, "w", encoding="utf-8", newline="\n") as handle:
                handle.write(MADE_UP_FOOTER)
            markup = render(module, "made")
        finally:
            shutil.rmtree(work, ignore_errors=True)
        self.assertEqual(markup, MADE_UP_EXPECTED)
        self.assertEqual(violations(markup, ["fern.svg"]), [])

    def test_control_the_comparison_flags_missing_parts(self):
        # invariant: icon-credits
        files = ["fern.svg", "flax.svg"]
        good = "<footer><ul>" + credit_html("fern") + credit_html("flax") + "</ul></footer>"
        self.assertEqual(violations(good, files), [])
        broken = {
            "no credit for one file": "<footer>" + credit_html("fern") + "</footer>",
            "no author": "<footer>" + credit_html("fern", author="") + credit_html("flax")
                         + "</footer>",
            "another author": "<footer>" + credit_html("fern", author="Lorc", folder="lorc")
                              + credit_html("flax") + "</footer>",
            "no title": "<footer>" + credit_html("fern", title="") + credit_html("flax")
                        + "</footer>",
            "another title": "<footer>" + credit_html("fern", title="Flax icon")
                             + credit_html("flax") + "</footer>",
            "the title in other letter case": "<footer>" + credit_html("fern", title="fern icon")
                                              + credit_html("flax") + "</footer>",
            "no page": "<footer><li>fern: Fern icon, Delapouite, CC BY 3.0, zmienione</li>"
                       + credit_html("flax") + "</footer>",
            "no licence": "<footer>" + credit_html("fern", licence="CC BY") + credit_html("flax")
                          + "</footer>",
            "licence outside the credits": "<footer><p>CC BY 3.0</p><ul>"
                                           + credit_html("fern", licence="licencja")
                                           + credit_html("flax", licence="licencja")
                                           + "</ul></footer>",
            "no change": "<footer>" + credit_html("fern", change="") + credit_html("flax")
                         + "</footer>",
        }
        for label, markup in broken.items():
            with self.subTest(case=label):
                self.assertTrue(violations(markup, files), f"{label} goes unseen")
        no_fact = {name: title for name, title in TITLES.items() if name != "flax.svg"}
        self.assertTrue(violations(good, files, no_fact),
                        "an icon file with no title written out passes")


if __name__ == "__main__":
    unittest.main()
