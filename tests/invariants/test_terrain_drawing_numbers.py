"""Invariant terrain-drawing-numbers: The terrain panel's drawing of the game map shows no number
of the stock a tile holds.

The application is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written). A Node script this check writes to a temporary directory installs a small
stand-in for the page's `document` (elements in their namespaces, text, attributes, properties
such as `className`, `dataset` and `scope` reflected to attributes, class lists, and the selectors
`[attr]`, `[attr=value]`, `.class`, a tag and descendants of these, for `querySelectorAll` and
`closest`), builds the terrain panel with `createTerrainPanel()` of the built
`dist/public/view/terrain-panel.js`, as the game's view does, and drives the simulation of the
built `dist/public/sim/game.js` (`newGame`, `setProgram`, `send`, `advanceMinutes`), handing the
panel each game state at the minutes below through its `update`. After each update it writes out
the panel's element as a tree, with the map run's tiles; the check reads both.

Reading of the sentence:
- the terrain panel: the element `createTerrainPanel()` returns, which a built module of the game's
  view other than `terrain-panel.js` imports and calls (checked by a scan of the built modules'
  text); its drawing of the game map: everything in that element but the list of revealed tiles,
  which is the panel's `table` and stands beside the drawing — so text placed anywhere in the panel
  outside that list counts as the drawing's;
- shows: the drawing's text (every text node, a `title` or `desc` element's included, as the
  browser shows a `title` as a tooltip), and the attributes the browser shows or reads out for an
  element, written out in SHOWN_ATTRIBUTES, with the text of the elements `aria-labelledby` and
  `aria-describedby` point at. Coordinates, sizes and the address of an icon file are drawn, not
  shown as numbers;
- a number of the stock a tile holds: a run of digits in what the drawing shows that equals the
  stock of some resource on some tile of the map run in that state — 0 counted only where some
  tile holds a resource with a stock of 0. The icons of resources, including the dimmed icon of a
  resource whose stock is 0, are no number.

States handed to the panel, on the map Las (`forest`) with the archetype `elementalMage`, sent at
the real times T and T_OTHER under "always → explore", "always → wander", over 240 game minutes:
the game before a send, minute 0, and every 20th minute; and, since the simulation does not reach
a stock of 0 today, the state of minute 240 with the stock of the first resource on every revealed
tile that holds it set to 0, handed to the panel as it is.

Controls, so the check can fail: the stand-in `document`, given a made-up panel built with
`createElement`, `createElementNS`, `dataset`, `className`, `classList`, `scope`, `textContent`,
`append` and `replaceChildren`, writes out the tree the made-up panel means, and finds its
elements by `querySelectorAll` and `closest`; the cut-out list of the real panel holds the stock
of every revealed tile (what is cut out is the list, and digits are found where they stand); the
drawing of the real panel holds an element per tile once a map run exists; and the reading flags
made-up drawings holding a stock in a text element, in a `title` element, in a `title`
attribute, in an `aria-label`, and in an element `aria-labelledby` points at, while one holding
only coordinates passes.

Does NOT cover: how the drawing looks in a browser (it is not rendered, and CSS is not applied);
a number written in words; the list of revealed tiles.
"""

import json
import os
import re
import shutil
import tempfile
import unittest

import loop2_invariant_support as support

GAME_MODULE = "dist/public/sim/game.js"
PANEL_MODULE = "dist/public/view/terrain-panel.js"
VIEW_DIRECTORY = "dist/public"
SENT = {"mapId": "forest", "archetypeId": "elementalMage"}
T = 1760000000000
T_OTHER = 1760000123456
MINUTES = 240
EVERY = 20
ALWAYS = {"kind": "always"}
ROAM = {"rules": [{"condition": ALWAYS, "action": {"kind": "explore"}},
                  {"condition": ALWAYS, "action": {"kind": "wander"}}]}
# The attributes a browser shows for an element or reads out as its name or description.
SHOWN_ATTRIBUTES = ("title", "aria-label", "aria-description", "aria-roledescription",
                    "aria-valuetext", "aria-valuenow", "aria-placeholder", "alt", "placeholder",
                    "value", "label")
POINTING_ATTRIBUTES = ("aria-labelledby", "aria-describedby")
DIGITS = re.compile(r"\d+")

FAKE_DOCUMENT = r"""
const HTML_NS = 'http://www.w3.org/1999/xhtml';
const PROPERTY_ATTRIBUTES = { className: 'class', htmlFor: 'for' };
const kebab = (s) => String(s).replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
class Node {
  get nextSibling() { const p = this.parentNode; if (!p) return null; const i = p.childNodes.indexOf(this); return p.childNodes[i + 1] || null; }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
}
class Text extends Node {
  constructor(text) { super(); this.nodeType = 3; this.data = String(text); this.parentNode = null; }
  get textContent() { return this.data; }
  set textContent(v) { this.data = String(v); }
  toTree() { return this.data; }
}
const toNode = (n) => (typeof n === 'object' && n !== null ? n : new Text(n));
function parseSelector(selector) {
  return selector.trim().split(/\s+/).map((part) => {
    const tests = [];
    const re = /\[([\w-]+)(?:="?([^"\]]*)"?)?\]|\.([\w-]+)|^([\w-]+)|(\*)/g;
    let m; let consumed = 0;
    while ((m = re.exec(part)) !== null) {
      if (m.index !== consumed) throw new Error('stand-in document: selector not read: ' + selector);
      consumed = re.lastIndex;
      if (m[1] !== undefined) { const [a, v] = [m[1], m[2]]; tests.push((e) => e.hasAttribute(a) && (v === undefined || e.getAttribute(a) === v)); }
      else if (m[3] !== undefined) { const c = m[3]; tests.push((e) => e.classList.contains(c)); }
      else if (m[4] !== undefined) { const t = m[4].toLowerCase(); tests.push((e) => e.localName === t); }
    }
    if (consumed !== part.length) throw new Error('stand-in document: selector not read: ' + selector);
    return (e) => tests.every((t) => t(e));
  });
}
function matches(element, selector) {
  return selector.split(',').some((one) => {
    const parts = parseSelector(one);
    if (!parts[parts.length - 1](element)) return false;
    let node = element.parentNode; let i = parts.length - 2;
    while (i >= 0 && node && node.nodeType === 1) { if (parts[i](node)) i -= 1; node = node.parentNode; }
    return i < 0;
  });
}
class Element extends Node {
  constructor(tag, ns) {
    super();
    this.nodeType = 1; this.namespaceURI = ns || HTML_NS; this.localName = String(tag);
    if (this.namespaceURI === HTML_NS) this.localName = this.localName.toLowerCase();
    this.tagName = this.localName.toUpperCase(); this.childNodes = []; this.attributes = {};
    this.parentNode = null; this.listeners = [];
    this.style = { setProperty() {}, removeProperty() {} };
    const self = this;
    const classes = () => (self.attributes.class || '').split(/\s+/).filter(Boolean);
    this.classList = {
      add: (...c) => { const s = new Set(classes()); c.forEach((x) => s.add(x)); self.attributes.class = [...s].join(' '); },
      remove: (...c) => { self.attributes.class = classes().filter((x) => !c.includes(x)).join(' '); },
      toggle: (c, force) => { const has = classes().includes(c); const on = force === undefined ? !has : !!force; if (on) self.classList.add(c); else self.classList.remove(c); return on; },
      contains: (c) => classes().includes(c),
    };
    this.dataset = new Proxy({}, {
      get: (_t, prop) => self.attributes['data-' + kebab(prop)],
      set: (_t, prop, value) => { self.attributes['data-' + kebab(prop)] = String(value); return true; },
      has: (_t, prop) => ('data-' + kebab(prop)) in self.attributes,
    });
    return new Proxy(this, {
      set(target, prop, value) {
        if (prop in target || typeof prop === 'symbol') { target[prop] = value; return true; }
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          const name = PROPERTY_ATTRIBUTES[prop] || String(prop).toLowerCase();
          if (value === false) delete target.attributes[name]; else target.attributes[name] = value === true ? '' : String(value);
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
  get className() { return this.attributes.class || ''; }
  set className(v) { this.attributes.class = String(v); }
  get id() { return this.attributes.id || ''; }
  set id(v) { this.attributes.id = String(v); }
  get hidden() { return 'hidden' in this.attributes; }
  set hidden(v) { if (v) this.attributes.hidden = ''; else delete this.attributes.hidden; }
  get children() { return this.childNodes.filter((n) => n.nodeType === 1); }
  get firstChild() { return this.childNodes[0] || null; }
  get lastChild() { return this.childNodes[this.childNodes.length - 1] || null; }
  get textContent() { return this.childNodes.map((n) => n.textContent).join(''); }
  set textContent(v) { this.replaceChildren(String(v)); }
  get innerText() { return this.textContent; }
  set innerText(v) { this.textContent = v; }
  set innerHTML(_v) { throw new Error('stand-in document: innerHTML is not read here'); }
  setAttribute(name, value) { this.attributes[String(name)] = String(value); }
  setAttributeNS(_ns, name, value) { this.setAttribute(name, value); }
  getAttribute(name) { const v = this.attributes[String(name)]; return v === undefined ? null : v; }
  hasAttribute(name) { return String(name) in this.attributes; }
  removeAttribute(name) { delete this.attributes[String(name)]; }
  toggleAttribute(name, force) { const on = force === undefined ? !this.hasAttribute(name) : !!force; if (on) this.setAttribute(name, ''); else this.removeAttribute(name); return on; }
  addEventListener(type, listener) { this.listeners.push([type, listener]); }
  removeEventListener() {}
  appendChild(node) { this.append(node); return node; }
  append(...nodes) {
    for (const n of nodes.map(toNode)) {
      if (n.nodeType === 11) { for (const c of [...n.childNodes]) this.append(c); n.childNodes = []; continue; }
      if (n.parentNode) n.parentNode.removeChild(n);
      n.parentNode = this; this.childNodes.push(n);
    }
  }
  prepend(...nodes) { const rest = this.childNodes; this.childNodes = []; this.append(...nodes); for (const n of rest) this.childNodes.push(n); }
  insertBefore(node, ref) { const rest = this.childNodes; const i = ref ? rest.indexOf(ref) : rest.length; this.childNodes = rest.slice(0, i); this.append(node); this.childNodes.push(...rest.slice(i)); return node; }
  replaceChildren(...nodes) { for (const n of this.childNodes) n.parentNode = null; this.childNodes = []; this.append(...nodes); }
  removeChild(node) { this.childNodes = this.childNodes.filter((n) => n !== node); node.parentNode = null; return node; }
  descendants() { const out = []; for (const c of this.children) { out.push(c, ...c.descendants()); } return out; }
  querySelectorAll(selector) { return this.descendants().filter((e) => matches(e, selector)); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  matches(selector) { return matches(this, selector); }
  closest(selector) { let e = this; while (e && e.nodeType === 1) { if (matches(e, selector)) return e; e = e.parentNode; } return null; }
  toTree() {
    return { tag: this.localName, ns: this.namespaceURI, attrs: { ...this.attributes }, children: this.childNodes.map((n) => n.toTree()) };
  }
}
class Fragment extends Element { constructor() { super('#fragment'); this.nodeType = 11; } }
globalThis.Node = Node;
globalThis.Element = Element;
globalThis.HTMLElement = Element;
globalThis.SVGElement = Element;
globalThis.document = {
  createElement: (tag) => new Element(tag),
  createElementNS: (ns, tag) => new Element(tag, ns),
  createTextNode: (text) => new Text(text),
  createDocumentFragment: () => new Fragment(),
  addEventListener() {},
};
"""

DRIVER = (
    "import { readFileSync, writeFileSync } from 'node:fs';\n"
    "import { pathToFileURL } from 'node:url';\n"
    + FAKE_DOCUMENT
    + r"""
const [gamePath, panelPath, stepsPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const { createTerrainPanel } = await import(pathToFileURL(panelPath).href);
const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));
const panel = createTerrainPanel();
let state;
const drawn = [];
for (const [name, ...args] of steps) {
  if (name === 'newGame') state = game.newGame();
  else if (name === 'draw') {
    panel.update(state);
    drawn.push({ label: args[0], tiles: state.run ? state.run.tiles : [], tree: panel.element.toTree() });
  } else if (name === 'zeroStock') {
    const [resource] = args;
    const tiles = state.run.tiles.map(tile => (tile.revealed && resource in tile.stock
      ? { ...tile, stock: { ...tile.stock, [resource]: 0 } } : tile));
    state = { ...state, run: { ...state.run, tiles } };
  } else state = game[name](state, ...args).state;
}
writeFileSync(outPath, JSON.stringify(drawn));
"""
)

MADE_UP_PANEL = r"""
export function made() {
  const panel = document.createElement('div');
  panel.className = 'panel';
  const drawing = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  drawing.classList.add('drawing');
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('data-tile', '1,2');
  group.classList.add('tile');
  drawing.append(group);
  const table = document.createElement('table');
  const row = document.createElement('tr');
  row.dataset.tile = '1,2';
  const cell = document.createElement('th');
  cell.scope = 'row';
  cell.textContent = '(1, 2)';
  row.append(cell);
  table.replaceChildren(row);
  panel.append(drawing, table);
  for (const e of panel.querySelectorAll('[data-tile]')) e.classList.toggle('hovered', e.getAttribute('data-tile') === '1,2');
  const found = cell.closest('tr[data-tile]');
  return { tree: panel.toTree(), closest: found ? found.getAttribute('data-tile') : null,
           counted: panel.querySelectorAll('svg .tile').length };
}
"""
MADE_UP_EXPECTED = {
    "tree": {"tag": "div", "ns": "http://www.w3.org/1999/xhtml", "attrs": {"class": "panel"},
             "children": [
                 {"tag": "svg", "ns": "http://www.w3.org/2000/svg", "attrs": {"class": "drawing"},
                  "children": [{"tag": "g", "ns": "http://www.w3.org/2000/svg",
                                "attrs": {"data-tile": "1,2", "class": "tile hovered"},
                                "children": []}]},
                 {"tag": "table", "ns": "http://www.w3.org/1999/xhtml", "attrs": {},
                  "children": [{"tag": "tr", "ns": "http://www.w3.org/1999/xhtml",
                                "attrs": {"data-tile": "1,2", "class": "hovered"},
                                "children": [{"tag": "th", "ns": "http://www.w3.org/1999/xhtml",
                                              "attrs": {"scope": "row"},
                                              "children": ["(1, 2)"]}]}]}]},
    "closest": "1,2",
    "counted": 1,
}


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def run_driver(script_text, arguments):
    work = tempfile.mkdtemp(prefix="loop2-terrain-drawing-numbers-")
    try:
        script = os.path.join(work, "driver.mjs")
        out_path = os.path.join(work, "out.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(script_text)
        files = []
        for name, content in arguments:
            path = os.path.join(work, name)
            with open(path, "w", encoding="utf-8", newline="\n") as handle:
                handle.write(content)
            files.append(path)
        code, output = support.run([node(), script, *files, out_path], work)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            return json.load(handle)
    finally:
        shutil.rmtree(work, ignore_errors=True)


def drawings(real_ms):
    copy = support.built_copy()
    game, panel = copy.file(GAME_MODULE), copy.file(PANEL_MODULE)
    for path, module in ((game, GAME_MODULE), (panel, PANEL_MODULE)):
        if not os.path.isfile(path):
            raise AssertionError(f"`npm run build` placed no {module}")
    steps = [["newGame"], ["setProgram", ROAM], ["draw", "before a send"], ["send", SENT, real_ms],
             ["draw", "minute 0"]]
    for minute in range(1, MINUTES + 1):
        steps.append(["advanceMinutes", 1])
        if minute % EVERY == 0:
            steps.append(["draw", f"minute {minute}"])
    steps += [["zeroStock", "stick"], ["draw", f"minute {MINUTES}, stock of stick set to 0"]]
    work = tempfile.mkdtemp(prefix="loop2-terrain-drawing-steps-")
    try:
        script = os.path.join(work, "driver.mjs")
        steps_path = os.path.join(work, "steps.json")
        out_path = os.path.join(work, "out.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(DRIVER)
        with open(steps_path, "w", encoding="utf-8", newline="\n") as handle:
            json.dump(steps, handle)
        code, output = support.run([node(), script, game, panel, steps_path, out_path], work)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            return json.load(handle)
    finally:
        shutil.rmtree(work, ignore_errors=True)


def elements(tree):
    if isinstance(tree, str):
        return []
    found = [tree]
    for child in tree["children"]:
        found += elements(child)
    return found


def text_of(tree):
    if isinstance(tree, str):
        return tree
    return "".join(text_of(c) for c in tree["children"])


def split_list(tree):
    """(the drawing: the panel less its `table` elements, [those tables])."""
    tables = []

    def cut(node):
        if isinstance(node, str):
            return node
        if node["tag"].lower() == "table":
            tables.append(node)
            return None
        children = [c for c in (cut(c) for c in node["children"]) if c is not None]
        return dict(node, children=children)

    return cut(tree), tables


def shown(drawing, whole):
    """[(where, text)] of what the drawing shows: its text nodes and the shown attributes of its
    elements, with the text of the elements its pointing attributes name (looked up in `whole`)."""
    found = []
    by_id = {e["attrs"]["id"]: e for e in elements(whole) if e["attrs"].get("id")}

    def visit(node, path):
        if isinstance(node, str):
            found.append((f"text in {path}", node))
            return
        here = f"{path}/{node['tag']}"
        for name in SHOWN_ATTRIBUTES:
            if name in node["attrs"]:
                found.append((f"{name} of {here}", node["attrs"][name]))
        for name in POINTING_ATTRIBUTES:
            for ref in node["attrs"].get(name, "").split():
                if ref in by_id:
                    found.append((f"{name} of {here} -> #{ref}", text_of(by_id[ref])))
        for child in node["children"]:
            visit(child, here)

    visit(drawing, "")
    return found


def stock_numbers(tiles):
    values = {v for t in tiles for v in t["stock"].values()}
    return {str(v) for v in values}


def findings(record):
    drawing, _tables = split_list(record["tree"])
    numbers = stock_numbers(record["tiles"])
    found = []
    for where, text in shown(drawing, record["tree"]):
        hits = [n for n in DIGITS.findall(text) if str(int(n)) in numbers]
        if hits:
            found.append(f"{record['label']}: {where} shows {hits} in {text!r}")
    return found


class TerrainDrawingNumbers(unittest.TestCase):

    def test_the_drawing_shows_no_stock(self):
        # invariant: terrain-drawing-numbers
        copy = support.built_copy()
        panel = copy.file(PANEL_MODULE)
        self.assertTrue(os.path.isfile(panel), f"`npm run build` placed no {PANEL_MODULE}")
        callers = []
        for current, _dirs, names in os.walk(copy.file(VIEW_DIRECTORY)):
            for name in names:
                path = os.path.join(current, name)
                if name.endswith(".js") and os.path.abspath(path) != os.path.abspath(panel):
                    text = support.read_text(path)
                    if re.search(r"from\s*['\"][./]*(?:view/)?terrain-panel\.js['\"]", text) and \
                            re.search(r"\bcreateTerrainPanel\s*\(", text):
                        callers.append(name)
        self.assertTrue(callers, "no module of the game imports terrain-panel.js and calls "
                                 "createTerrainPanel, so the panel is not the game's")
        found = []
        for real_ms in (T, T_OTHER):
            records = drawings(real_ms)
            for record in records:
                found += findings(record)
                drawing, tables = split_list(record["tree"])
                if not record["tiles"]:
                    continue
                self.assertGreaterEqual(len(elements(drawing)) - 1, len(record["tiles"]),
                                        f"{record['label']}: the drawing holds fewer elements "
                                        "than the map run has tiles, so it is not drawn")
                listed = [n for t in tables for e in elements(t) for c in e["children"]
                          if isinstance(c, str) for n in DIGITS.findall(c)]
                for tile in record["tiles"]:
                    if tile["revealed"]:
                        for value in tile["stock"].values():
                            self.assertIn(str(value), listed,
                                          f"{record['label']}: the cut-out list does not hold "
                                          f"the stock {value} of a revealed tile, so it may not "
                                          "be the list of revealed tiles")
            self.assertTrue("set to 0" in records[-1]["label"]
                            and "0" in stock_numbers(records[-1]["tiles"]),
                            "the state with a stock of 0 did not come about")
        self.assertEqual(found, [])

    def test_control_the_stand_in_document_builds_what_a_panel_means(self):
        # invariant: terrain-drawing-numbers
        driver = ("import { writeFileSync } from 'node:fs';\n"
                  "import { pathToFileURL } from 'node:url';\n" + FAKE_DOCUMENT + r"""
const [modulePath, outPath] = process.argv.slice(2);
const module = await import(pathToFileURL(modulePath).href);
writeFileSync(outPath, JSON.stringify(module.made()));
""")
        self.assertEqual(run_driver(driver, [("made.mjs", MADE_UP_PANEL)]), MADE_UP_EXPECTED)

    def test_control_the_reading_flags_shown_stock(self):
        # invariant: terrain-drawing-numbers
        svg = "http://www.w3.org/2000/svg"
        tiles = [{"col": 1, "row": 2, "revealed": True, "stock": {"stick": 12, "berry": 0}}]

        def element(tag, attrs=None, children=None):
            return {"tag": tag, "ns": svg, "attrs": attrs or {}, "children": children or []}

        def panel(*drawn):
            listing = {"tag": "table", "ns": "", "attrs": {},
                       "children": [element("tr", {}, ["(1, 2) 12 0"]),
                                    element("td", {"id": "cell"}, ["12"])]}
            return {"label": "made up", "tiles": tiles,
                    "tree": element("div", {}, [element("svg", {}, list(drawn)), listing])}

        clean = panel(element("g", {"data-tile": "1,2", "transform": "translate(12 12)"},
                               [element("polygon", {"points": "0,0 12,12"}),
                                element("text", {}, ["(1, 2)"])]))
        self.assertEqual(findings(clean), [])
        broken = {
            "a text element": panel(element("text", {}, ["patyk: 12"])),
            "a title element": panel(element("g", {}, [element("title", {}, ["jagoda 0"])])),
            "a title attribute": panel(element("g", {"title": "12 szt."})),
            "an aria-label": panel(element("g", {"aria-label": "patyk 12"})),
            "an element aria-labelledby names": panel(element("g", {"aria-labelledby": "cell"})),
        }
        for label, record in broken.items():
            with self.subTest(case=label):
                self.assertTrue(findings(record), f"a stock in {label} goes unseen")


if __name__ == "__main__":
    unittest.main()
