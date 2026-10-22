"""Invariant program-world-reference: A program the simulation holds names a thing of the world
only by its kind, never by a number or a position of its own.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `setProgram`, `send` and
`advanceMinutes`.

Reading of the sentence:
- a program the simulation holds: the program in the game state (`state.program`) after
  `setProgram` took one in, and as it stands after a send and after 30 game minutes of a map run;
- a thing of the world: a tile, or a resource lying on one; its kind: the identifier of a resource
  as the data files give it — `stick`, `berry`, `moss`, `fiber`, written out below;
- a number or a position of its own: an index, a coordinate or a number given to one tile or one
  thing. A whole number a condition compares a stock with names no thing: the `value` of a
  `hereBelow` condition, the one kind of condition that compares a stock today, written out in
  COMPARES_STOCK below. Read from the held program's JSON, a thing is named by a number or a
  position where:
  - a number stands anywhere but as that `value` (a coordinate pair, an index, a tile's number,
    a resource given by its index);
  - a string holds a digit (a number or a position written as text, such as `1,1` or `(1, 1)`);
  - a `resource` field holds anything but one of the identifiers written out.
  A number added to the program later for something that is no thing of the world (a rule's own
  number, for one) is read here as naming a thing, and needs a foundation step for this check;
- a program offered with a tile named by its number or position is either refused (`setProgram`
  throws, or the state keeps the program it had) or held without it — which the reading above
  checks of every program held.

Offers, each made on the sending screen and during a map run of Las (`forest`) with the archetype
`elementalMage` sent at the real time T, after the program BASE: the valid programs in LEGIT; and
programs in NAMING, each of which names a tile or a resource by a number or a position — a
`walkTo` with a coordinate pair, a tile's number, a column and row, an index of a tile, a number
of its own, a resource given by its index or as a tile's label; a `hereBelow` with a coordinate
pair or a tile's number; a rule and a program carrying a position of their own.

Controls, so the check can fail: every program of LEGIT is taken in and held as offered (the
offers reach the program the simulation holds); and the reading flags made-up held programs
holding, in turn, a coordinate pair, a tile's number, a column and row, a resource given by its
index, a tile's label as text, and a number at a rule's level, while a held program with
`hereBelow` values from 0 to 50 passes.

Does NOT cover: programs held by anything other than the simulation (the program editor's draft);
a position written in words.
"""

import copy as copying
import json
import os
import shutil
import tempfile
import unittest

import loop2_invariant_support as support

GAME_MODULE = "dist/public/sim/game.js"
SENT = {"mapId": "forest", "archetypeId": "elementalMage"}
T = 1760000000000
RESOURCE_IDS = ("stick", "berry", "moss", "fiber")
# The kinds of condition whose `value` is a whole number compared with a stock.
COMPARES_STOCK = ("hereBelow",)
ADVANCE = 30

ALWAYS = {"kind": "always"}


def rule(condition, action):
    return {"condition": condition, "action": action}


def walk(resource, **extra):
    return dict({"kind": "walkTo", "resource": resource}, **extra)


def below(resource, value, **extra):
    return dict({"kind": "hereBelow", "resource": resource, "value": value}, **extra)


BASE = {"rules": [rule(ALWAYS, {"kind": "wander"})]}

LEGIT = (
    {"rules": [rule(ALWAYS, walk("stick")), rule(ALWAYS, {"kind": "explore"})]},
    {"rules": [rule(below("berry", 0), walk("moss")), rule(below("fiber", 50), walk("berry")),
               rule(below("stick", 7), {"kind": "wander"}), rule(ALWAYS, walk("fiber"))]},
    {"rules": []},
)

NAMING = (
    ("walkTo with a coordinate pair", {"rules": [rule(ALWAYS, walk("stick", at={"q": 1, "r": 1}))]}),
    ("walkTo with a tile's number", {"rules": [rule(ALWAYS, walk("stick", tile=5))]}),
    ("walkTo with a column and row", {"rules": [rule(ALWAYS, walk("berry", col=1, row=2))]}),
    ("walkTo with a target position", {"rules": [rule(ALWAYS,
                                                      walk("berry", target={"col": 2, "row": 2}))]}),
    ("walkTo with an index of a tile", {"rules": [rule(ALWAYS, walk("moss", tileIndex=3))]}),
    ("walkTo with a number of its own", {"rules": [rule(ALWAYS, walk("moss", id=7))]}),
    ("walkTo with a resource by its index", {"rules": [rule(ALWAYS, walk(0))]}),
    ("walkTo with a resource as a tile's label", {"rules": [rule(ALWAYS, walk("(1, 1)"))]}),
    ("walkTo with a resource as a tile's key", {"rules": [rule(ALWAYS, walk("1,1"))]}),
    ("walkTo with the tile alone", {"rules": [rule(ALWAYS, {"kind": "walkTo",
                                                            "at": {"q": 2, "r": 0}})]}),
    ("hereBelow with a coordinate pair", {"rules": [rule(below("stick", 3, at={"q": 0, "r": 0}),
                                                         {"kind": "explore"})]}),
    ("hereBelow with a tile's number", {"rules": [rule(below("fiber", 3, tile=2),
                                                       {"kind": "wander"})]}),
    ("a rule with a position", {"rules": [dict(rule(ALWAYS, walk("stick")),
                                               at={"q": 1, "r": 0})]}),
    ("a program with a position", {"rules": [rule(ALWAYS, walk("stick"))],
                                   "target": {"q": 3, "r": 1}}),
)

DRIVER = r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, offersPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const { base, sent, realMs, advance, offers } = JSON.parse(readFileSync(offersPath, 'utf8'));
const copy = value => JSON.parse(JSON.stringify(value));
const results = [];
for (const program of offers) {
  for (const withRun of [false, true]) {
    let state = game.setProgram(game.newGame(), base).state;
    if (withRun) state = game.send(state, sent, realMs).state;
    const held = [];
    let threw = null;
    try {
      state = game.setProgram(state, program).state;
    } catch (error) {
      threw = String(error && error.message || error);
    }
    held.push(copy(state.program));
    if (!withRun) state = game.send(state, sent, realMs).state;
    held.push(copy(state.program));
    state = game.advanceMinutes(state, advance).state;
    held.push(copy(state.program));
    results.push({ withRun, threw, held });
  }
}
writeFileSync(outPath, JSON.stringify(results));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def drive(programs):
    """[[result without a map run, result with one]] per program offered."""
    game = support.built_copy().file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}")
    directory = tempfile.mkdtemp(prefix="loop2-program-world-reference-")
    try:
        script = os.path.join(directory, "driver.mjs")
        offers_path = os.path.join(directory, "offers.json")
        out_path = os.path.join(directory, "out.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(DRIVER)
        with open(offers_path, "w", encoding="utf-8", newline="\n") as handle:
            json.dump({"base": BASE, "sent": SENT, "realMs": T, "advance": ADVANCE,
                       "offers": list(programs)}, handle)
        code, output = support.run([node(), script, game, offers_path, out_path], directory)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            results = json.load(handle)
    finally:
        shutil.rmtree(directory, ignore_errors=True)
    return [results[i:i + 2] for i in range(0, len(results), 2)]


def naming(program):
    """Where a held program names a thing by a number or a position: [path: what]."""
    found = []

    def visit(value, path, parent):
        if isinstance(value, bool) or value is None:
            return
        if isinstance(value, (int, float)):
            compares = (path.endswith(".value") and isinstance(parent, dict)
                        and parent.get("kind") in COMPARES_STOCK)
            if not compares:
                found.append(f"{path}: the number {value}")
            return
        if isinstance(value, str):
            if any(ch.isdigit() for ch in value):
                found.append(f"{path}: the text {value!r} holds a number")
            elif path.endswith(".resource") and value not in RESOURCE_IDS:
                found.append(f"{path}: {value!r} is no resource identifier")
            return
        if isinstance(value, list):
            for index, item in enumerate(value):
                visit(item, f"{path}[{index}]", value)
            return
        if isinstance(value, dict):
            for name, item in value.items():
                if name == "resource" and not isinstance(item, str):
                    found.append(f"{path}.resource: {json.dumps(item)} is no resource identifier")
                    continue
                visit(item, f"{path}.{name}", value)
            return
        found.append(f"{path}: a value of no JSON kind read here: {value!r}")

    visit(program, "program", None)
    return found


def findings(label, pair):
    found = []
    for result in pair:
        where = "during a map run" if result["withRun"] else "on the sending screen"
        for moment, held in zip(("taken in", "after a send", f"after {ADVANCE} minutes"),
                                result["held"]):
            for item in naming(held):
                found.append(f"{label} ({where}), {moment}: {item}")
    return found


class ProgramWorldReference(unittest.TestCase):

    def test_held_programs_name_things_only_by_kind(self):
        # invariant: program-world-reference
        pairs = drive([p for p in LEGIT] + [p for _, p in NAMING])
        for program, pair in zip(LEGIT, pairs[:len(LEGIT)]):
            for result in pair:
                self.assertIsNone(result["threw"], f"a valid program was refused: {program}")
                self.assertEqual(result["held"][0], program,
                                 "a valid program is not held as offered, so the offers do not "
                                 "reach the program the simulation holds")
        found = []
        for program, pair in zip(LEGIT, pairs[:len(LEGIT)]):
            found += findings(json.dumps(program), pair)
        for (label, _program), pair in zip(NAMING, pairs[len(LEGIT):]):
            found += findings(label, pair)
        self.assertEqual(found, [])

    def test_control_the_reading_flags_numbers_and_positions(self):
        # invariant: program-world-reference
        self.assertEqual(naming({"rules": [rule(below("stick", 0), walk("moss")),
                                           rule(below("berry", 50), walk("fiber")),
                                           rule(ALWAYS, {"kind": "explore"})]}), [])
        held = {
            "a coordinate pair": {"rules": [rule(ALWAYS, walk("stick", at={"q": 1, "r": 1}))]},
            "a tile's number": {"rules": [rule(ALWAYS, walk("stick", tile=5))]},
            "a column and row": {"rules": [rule(ALWAYS, walk("berry", col=1, row=2))]},
            "a resource by its index": {"rules": [rule(ALWAYS, walk(0))]},
            "a tile's label": {"rules": [rule(ALWAYS, walk("(1, 1)"))]},
            "a number at a rule's level": {"rules": [dict(rule(ALWAYS, walk("moss")), tile=3)]},
            "a compared number on a position": {"rules": [rule(
                below("stick", 3, at={"q": 0, "r": 0}), walk("moss"))]},
            "a value of a condition that compares no stock": {"rules": [rule(
                {"kind": "always", "value": 4}, walk("moss"))]},
        }
        for label, program in held.items():
            with self.subTest(case=label):
                self.assertTrue(naming(copying.deepcopy(program)), f"{label} goes unseen")


if __name__ == "__main__":
    unittest.main()
