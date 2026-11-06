"""Invariant terrain-drawing-numbers: The drawing of the game map shows no number of the stock a
tile holds.

The application is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written). A Node script this check writes to a temporary directory takes React's
`jsx` and `renderToStaticMarkup` of `react-dom/server` from the copy's own packages, as the built
modules resolve them, draws the component `TerrainDrawing` of the built
`dist/browser/view/terrain-drawing.js` with `renderToStaticMarkup`, and drives the simulation of
the built `dist/browser/sim/game.js` (`newGame`, `createCharacter`, `setProgram`, `send`,
`advanceMinutes`), starting from a game whose Understanding holds everything the built data
modules list, as `KNOWING_GAME_JS` in `program_fixture.py` gives it, so that the rules of the
program stay what the check drives, and handing the component each game state at the minutes
below whole, as the screen hands it. For each state it writes out the markup of the drawing with no
tile hovered and with the first tile of the map run hovered, with the map run's tiles; the check
reads each markup back as a tree and reads that tree. A report React makes through `console.error`
while it draws stops the script, so a drawing React refused is no pass.

Reading of the sentence:
- the drawing of the game map: the element `TerrainDrawing` draws, which a built module of the
  game's view other than `terrain-drawing.js` imports and renders (checked by a scan of the built
  modules' text), and nothing else. The line of a tile under the drawing and the table of revealed
  tiles stand outside it, so outside this reading: D-19 puts the numbers of stock in that table and
  in that line, never on the drawing. That decision is why this check no longer builds the terrain
  panel's DOM module and reads everything in it but its table (`guidelines/testing.md`,
  "Changing an existing test"): with the line of a tile beside the drawing, numbers stand outside
  the table by D-19, and the drawing is a component of its own;
- shows: the drawing's text (every text node, a `title` or `desc` element's included, as the
  browser shows a `title` as a tooltip), and the attributes the browser shows or reads out for an
  element, written out in SHOWN_ATTRIBUTES, with the text of the elements `aria-labelledby` and
  `aria-describedby` point at. Such an attribute pointing at an element the drawing does not hold
  is a finding: its text, which the browser reads out with the drawing, stands where this check
  does not read it. Coordinates, sizes and the address of an icon file are drawn, not shown as
  numbers;
- a number of the stock a tile holds: a run of digits in what the drawing shows that equals the
  stock of some resource on some tile of the map run in that state — 0 counted only where some
  tile holds a resource with a stock of 0. The icons of resources, including the dimmed icon of a
  resource whose stock is 0, are no number.

States handed to the component, on the map Las (`forest`) with the archetype `elementalMage`, sent
at the real times T and T_OTHER under "always → explore", "always → wander", over 240 game minutes:
the game before a send, minute 0, and every 20th minute; and, since the simulation does not reach
a stock of 0 today, the state of minute 240 with the stock of the first resource on every revealed
tile that holds it set to 0, handed to the component as it is.

Controls, so the check can fail: the reading back of markup, given the markup React draws for a
made-up element — attributes, escaped text, an element with no children, nesting — gives the tree
that element means, and refuses markup whose tags do not close in order; the drawing holds an
element per tile once a map run exists; and the reading flags made-up drawings holding a stock in
a text element, in a `title` element, in a `title` attribute, in an `aria-label`, and in an
`aria-labelledby` that points at an element outside the drawing, while one holding only
coordinates passes.

Does NOT cover: how the drawing looks in a browser (it is not rendered, and CSS is not applied);
a number written in words; the line of a tile and the table of revealed tiles.
"""

from html.parser import HTMLParser
import json
import os
import re
import shutil
import tempfile
import unittest

import loop2_invariant_support as support
from program_fixture import KNOWING_GAME_JS, program_from_rules

GAME_MODULE = "dist/browser/sim/game.js"
DRAWING_MODULE = "dist/browser/view/terrain-drawing.js"
TILE_LIST_MODULE = "dist/browser/view/tile-list.js"
VIEW_DIRECTORY = "dist/browser"
# The map sent to, as the data files name it (D-18), and the character sent: the first one a
# new game creates, which takes the id 1.
SENT = {"mapId": "forest", "characterId": 1}
CREATE = ["createCharacter", "Ala"]
T = 1760000000000
T_OTHER = 1760000123456
MINUTES = 240
EVERY = 20
ALWAYS = {"kind": "always"}
ROAM = program_from_rules([{"condition": ALWAYS, "action": {"kind": "explore"}},
                          {"condition": ALWAYS, "action": {"kind": "wander"}}])
# The attributes a browser shows for an element or reads out as its name or description.
SHOWN_ATTRIBUTES = ("title", "aria-label", "aria-description", "aria-roledescription",
                    "aria-valuetext", "aria-valuenow", "aria-placeholder", "alt", "placeholder",
                    "value", "label")
POINTING_ATTRIBUTES = ("aria-labelledby", "aria-describedby")
DIGITS = re.compile(r"\d+")

# React's packages as the built modules resolve them, from the copy; a report React makes through
# console.error ends the script with a failure.
REACT_JS = r"""
import { createRequire } from 'node:module';
const reported = [];
console.error = (...args) => { reported.push(args.map(String).join(' ')); };
function reactOf(modulePath) {
  const fromBuild = createRequire(modulePath);
  return { jsx: fromBuild('react/jsx-runtime').jsx,
           renderToStaticMarkup: fromBuild('react-dom/server').renderToStaticMarkup };
}
function drawnWithoutReport(markup) {
  if (reported.length) throw new Error('React reported while drawing:\n' + reported.join('\n'));
  return markup;
}
"""

DRIVER = (
    KNOWING_GAME_JS
    + "import { readFileSync, writeFileSync } from 'node:fs';\n"
    "import { pathToFileURL } from 'node:url';\n"
    + REACT_JS
    + r"""
const [gamePath, drawingPath, tileListPath, stepsPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const { TerrainDrawing } = await import(pathToFileURL(drawingPath).href);
const { tileKey } = await import(pathToFileURL(tileListPath).href);
const { jsx, renderToStaticMarkup } = reactOf(drawingPath);
const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));
const draw = (state, hovered) => drawnWithoutReport(renderToStaticMarkup(
  jsx(TerrainDrawing, { state, hovered, onHover: () => {} })));
let state;
const drawn = [];
for (const [name, ...args] of steps) {
  if (name === 'newGame') state = await newKnowingGame(game, gamePath);
  else if (name === 'draw') {
    const tiles = state.run ? state.run.tiles : [];
    drawn.push({ label: args[0], tiles, markup: draw(state, null) });
    if (tiles.length)
      drawn.push({ label: args[0] + ', first tile hovered', tiles, markup: draw(state, tileKey(tiles[0])) });
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

# A made-up element drawn by the copy's React, for the control of the reading back of markup.
MADE_UP_DRIVER = (
    "import { writeFileSync } from 'node:fs';\n"
    + REACT_JS
    + r"""
const [drawingPath, outPath] = process.argv.slice(2);
const { jsx, renderToStaticMarkup } = reactOf(drawingPath);
const made = jsx('svg', { className: 'drawing', viewBox: '0 0 8 8', children: [
  jsx('g', { 'data-tile': '1,2', className: 'tile hovered', children: [
    jsx('polygon', { points: '0,0 4,4' }, 'p'),
    jsx('image', { href: '/icons/stick.svg', x: 1, width: 6 }, 'i'),
    jsx('title', { children: 'a < b & "c"' }, 't'),
  ] }, 'a'),
  jsx('text', { 'aria-label': 'x', children: ['one', 'two'] }, 'b'),
] });
writeFileSync(outPath, JSON.stringify(drawnWithoutReport(renderToStaticMarkup(made))));
"""
)
MADE_UP_EXPECTED = {
    "tag": "svg", "attrs": {"class": "drawing", "viewbox": "0 0 8 8"},
    "children": [
        {"tag": "g", "attrs": {"data-tile": "1,2", "class": "tile hovered"},
         "children": [
             {"tag": "polygon", "attrs": {"points": "0,0 4,4"}, "children": []},
             {"tag": "image", "attrs": {"href": "/icons/stick.svg", "x": "1", "width": "6"},
              "children": []},
             {"tag": "title", "attrs": {}, "children": ['a < b & "c"']}]},
        {"tag": "text", "attrs": {"aria-label": "x"}, "children": ["onetwo"]}]}


class MarkupReader(HTMLParser):
    """Reads markup of one element back as a tree of {tag, attrs, children}, a text node as a
    string; markup whose tags do not close in order, or that holds more than one element at its
    top, is refused."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = {"tag": "#root", "attrs": {}, "children": []}
        self.open = [self.root]

    def handle_starttag(self, tag, attrs):
        element = {"tag": tag, "attrs": {k: "" if v is None else v for k, v in attrs},
                   "children": []}
        self.open[-1]["children"].append(element)
        self.open.append(element)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.open.pop()

    def handle_endtag(self, tag):
        if len(self.open) == 1 or self.open[-1]["tag"] != tag:
            raise AssertionError(f"the markup closes <{tag}> where "
                                 f"<{self.open[-1]['tag']}> is open")
        self.open.pop()

    def handle_data(self, data):
        children = self.open[-1]["children"]
        if children and isinstance(children[-1], str):
            children[-1] += data
        else:
            children.append(data)

    def unknown_decl(self, data):
        raise AssertionError(f"the markup holds a declaration not read here: {data!r}")


def read_tree(markup):
    reader = MarkupReader()
    reader.feed(markup)
    reader.close()
    if len(reader.open) != 1:
        raise AssertionError(f"the markup leaves <{reader.open[-1]['tag']}> open")
    top = reader.root["children"]
    if len(top) != 1 or isinstance(top[0], str):
        raise AssertionError(f"the markup holds no single element at its top: {markup[:200]!r}")
    return top[0]


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def run_driver(script_text, arguments, files=()):
    """Run a Node script with the given arguments, then the paths of `files` (name, content)
    written beside it, then the path it writes its JSON to; return that JSON."""
    work = tempfile.mkdtemp(prefix="loop2-terrain-drawing-numbers-")
    try:
        script = os.path.join(work, "driver.mjs")
        out_path = os.path.join(work, "out.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(script_text)
        paths = []
        for name, content in files:
            path = os.path.join(work, name)
            with open(path, "w", encoding="utf-8", newline="\n") as handle:
                handle.write(content)
            paths.append(path)
        code, output = support.run([node(), script, *arguments, *paths, out_path], work)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            return json.load(handle)
    finally:
        shutil.rmtree(work, ignore_errors=True)


def built(module):
    path = support.built_copy().file(module)
    if not os.path.isfile(path):
        raise AssertionError(f"`npm run build` placed no {module}")
    return path


def drawings(real_ms):
    steps = [["newGame"], CREATE, ["setProgram", ROAM], ["draw", "before a send"],
             ["send", SENT, real_ms], ["draw", "minute 0"]]
    for minute in range(1, MINUTES + 1):
        steps.append(["advanceMinutes", 1])
        if minute % EVERY == 0:
            steps.append(["draw", f"minute {minute}"])
    steps += [["zeroStock", "stick"], ["draw", f"minute {MINUTES}, stock of stick set to 0"]]
    records = run_driver(DRIVER, [built(GAME_MODULE), built(DRAWING_MODULE),
                                  built(TILE_LIST_MODULE)],
                         [("steps.json", json.dumps(steps))])
    return [dict(r, tree=read_tree(r["markup"])) for r in records]


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


def shown(drawing):
    """[(where, text)] of what the drawing shows: its text nodes and the shown attributes of its
    elements, with the text of the elements its pointing attributes name; a name the drawing
    does not hold gives the text None."""
    found = []
    by_id = {e["attrs"]["id"]: e for e in elements(drawing) if e["attrs"].get("id")}

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
                target = by_id.get(ref)
                found.append((f"{name} of {here} -> #{ref}",
                              None if target is None else text_of(target)))
        for child in node["children"]:
            visit(child, here)

    visit(drawing, "")
    return found


def stock_numbers(tiles):
    values = {v for t in tiles for v in t["stock"].values()}
    return {str(v) for v in values}


def findings(record):
    numbers = stock_numbers(record["tiles"])
    found = []
    for where, text in shown(record["tree"]):
        if text is None:
            found.append(f"{record['label']}: {where} points at an element outside the "
                         "drawing, whose text this check does not read")
            continue
        hits = [n for n in DIGITS.findall(text) if str(int(n)) in numbers]
        if hits:
            found.append(f"{record['label']}: {where} shows {hits} in {text!r}")
    return found


class TerrainDrawingNumbers(unittest.TestCase):

    def test_the_drawing_shows_no_stock(self):
        # invariant: terrain-drawing-numbers
        drawing_module = built(DRAWING_MODULE)
        callers = []
        for current, _dirs, names in os.walk(support.built_copy().file(VIEW_DIRECTORY)):
            for name in names:
                path = os.path.join(current, name)
                if name.endswith(".js") and \
                        os.path.abspath(path) != os.path.abspath(drawing_module):
                    text = support.read_text(path)
                    if re.search(r"from\s*['\"][./]*(?:view/)?terrain-drawing\.js['\"]", text) \
                            and re.search(r"(?:jsxs?|jsxDEV|createElement)\(\s*TerrainDrawing\b",
                                          text):
                        callers.append(name)
        self.assertTrue(callers, "no module of the game imports terrain-drawing.js and renders "
                                 "TerrainDrawing, so the drawing is not the game's")
        found = []
        for real_ms in (T, T_OTHER):
            records = drawings(real_ms)
            for record in records:
                found += findings(record)
                if record["tiles"]:
                    self.assertGreaterEqual(len(elements(record["tree"])) - 1,
                                            len(record["tiles"]),
                                            f"{record['label']}: the drawing holds fewer "
                                            "elements than the map run has tiles, so it is "
                                            "not drawn")
            self.assertTrue("set to 0" in records[-1]["label"]
                            and "0" in stock_numbers(records[-1]["tiles"]),
                            "the state with a stock of 0 did not come about")
        self.assertEqual(found, [])

    def test_control_the_markup_reads_back_as_the_tree_it_means(self):
        # invariant: terrain-drawing-numbers
        markup = run_driver(MADE_UP_DRIVER, [built(DRAWING_MODULE)])
        self.assertEqual(read_tree(markup), MADE_UP_EXPECTED)
        # React closes an element of no children of SVG with its end tag, an empty element of
        # HTML such as `img` with `/>`; both read as an element with no children.
        self.assertEqual(read_tree('<svg><image x="1"/><text>12</text></svg>'),
                         {"tag": "svg", "attrs": {}, "children": [
                             {"tag": "image", "attrs": {"x": "1"}, "children": []},
                             {"tag": "text", "attrs": {}, "children": ["12"]}]})
        for broken in ("<svg><g></svg>", "<svg><g>", "<svg></svg><svg></svg>", "12"):
            with self.subTest(markup=broken), self.assertRaises(AssertionError):
                read_tree(broken)

    def test_control_the_reading_flags_shown_stock(self):
        # invariant: terrain-drawing-numbers
        tiles = [{"col": 1, "row": 2, "revealed": True, "stock": {"stick": 12, "berry": 0}}]

        def element(tag, attrs=None, children=None):
            return {"tag": tag, "attrs": attrs or {}, "children": children or []}

        def drawing(*drawn):
            return {"label": "made up", "tiles": tiles, "tree": element("svg", {}, list(drawn))}

        clean = drawing(element("g", {"data-tile": "1,2", "transform": "translate(12 12)"},
                                [element("polygon", {"points": "0,0 12,12"}),
                                 element("text", {}, ["(1, 2)"])]))
        self.assertEqual(findings(clean), [])
        broken = {
            "a text element": drawing(element("text", {}, ["patyk: 12"])),
            "a title element": drawing(element("g", {}, [element("title", {}, ["jagoda 0"])])),
            "a title attribute": drawing(element("g", {"title": "12 szt."})),
            "an aria-label": drawing(element("g", {"aria-label": "patyk 12"})),
            "an aria-labelledby pointing outside the drawing":
                drawing(element("g", {"aria-labelledby": "tile-line"})),
        }
        for label, record in broken.items():
            with self.subTest(case=label):
                self.assertTrue(findings(record), f"a stock in {label} goes unseen")


if __name__ == "__main__":
    unittest.main()
