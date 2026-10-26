"""Invariant program-world-reference: A program the simulation holds names a thing of the world
only by its kind, never by a number or a position of its own.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `createCharacter`, `setProgram`,
`send` and `advanceMinutes`.

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
  - a number stands outside that `value` or the structural metadata below (a coordinate pair,
    an index, a tile's number, a resource given by its index);
  - a string outside a group name holds a digit (such as `1,1` or `(1, 1)`);
  - a `resource` field holds anything but one of the identifiers written out.
  Structural metadata of the task's grouped program is not a world reference: positive integer
  `nextGroupId` and `nextRuleId` at the program root, `id` on a direct group or its direct rule,
  and the group's string `name`. Only these exact locations are exempt; condition/action
  content and unexpected fields are still visited. The `value` exemption applies only to a
  direct rule or group condition. Flat fixtures remain readable until the production switch;
- a program offered with a tile named by its number or position is either refused (`setProgram`
  throws, or the state keeps the program it had) or held without it — which the reading above
  checks of every program held.

Offers, each made in the headquarters and during a map run of Las (`forest`) of a character
created in a new game, of the archetype `elementalMage`, sent at the real time T, after the program
BASE: the valid programs in LEGIT; and
programs in NAMING, each of which names a tile or a resource by a number or a position — a
`walkTo` with a coordinate pair, a tile's number, a column and row, an index of a tile, a number
of its own, a resource given by its index or as a tile's label; a `hereBelow` with a coordinate
pair or a tile's number; a rule and a program carrying a position of their own.

Controls, so the check can fail: every program of LEGIT is taken in and held as offered (the
offers reach the program the simulation holds); and the reading flags made-up held programs
holding, in turn, a coordinate pair, a tile's number, a column and row, a resource given by its
index, a tile's label as text, and a number at a rule's level, while a held program with
`hereBelow` values from 0 to 50 passes. Hand-written grouped programs with identity metadata,
numbered group names and group conditions also pass; numbers hidden in action ids, rule tiles,
coordinates, resource labels or unexpected metadata containers still fail.

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
from program_fixture import program_from_rules, program_rules

GAME_MODULE = "dist/public/sim/game.js"
# The map sent to, as the data files name it (D-18), and the character sent: the first one a
# new game creates, which takes the id 1.
SENT = {"mapId": "forest", "characterId": 1}
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


BASE = program_from_rules([rule(ALWAYS, {"kind": "wander"})])

LEGIT = (
    program_from_rules([rule(ALWAYS, walk("stick")), rule(ALWAYS, {"kind": "explore"})]),
    program_from_rules([rule(below("berry", 0), walk("moss")), rule(below("fiber", 50), walk("berry")),
               rule(below("stick", 7), {"kind": "wander"}), rule(ALWAYS, walk("fiber"))]),
    program_from_rules([]),
)

NAMING = (
    ("walkTo with a coordinate pair", program_from_rules([rule(ALWAYS, walk("stick", at={"q": 1, "r": 1}))])),
    ("walkTo with a tile's number", program_from_rules([rule(ALWAYS, walk("stick", tile=5))])),
    ("walkTo with a column and row", program_from_rules([rule(ALWAYS, walk("berry", col=1, row=2))])),
    ("walkTo with a target position", program_from_rules([rule(ALWAYS,
                                                      walk("berry", target={"col": 2, "row": 2}))])),
    ("walkTo with an index of a tile", program_from_rules([rule(ALWAYS, walk("moss", tileIndex=3))])),
    ("walkTo with a number of its own", program_from_rules([rule(ALWAYS, walk("moss", id=7))])),
    ("walkTo with a resource by its index", program_from_rules([rule(ALWAYS, walk(0))])),
    ("walkTo with a resource as a tile's label", program_from_rules([rule(ALWAYS, walk("(1, 1)"))])),
    ("walkTo with a resource as a tile's key", program_from_rules([rule(ALWAYS, walk("1,1"))])),
    ("walkTo with the tile alone", program_from_rules([rule(ALWAYS, {"kind": "walkTo",
                                                            "at": {"q": 2, "r": 0}})])),
    ("hereBelow with a coordinate pair", program_from_rules([rule(below("stick", 3, at={"q": 0, "r": 0}),
                                                         {"kind": "explore"})])),
    ("hereBelow with a tile's number", program_from_rules([rule(below("fiber", 3, tile=2),
                                                       {"kind": "wander"})])),
    ("a rule with a position", program_from_rules([dict(rule(ALWAYS, walk("stick")),
                                               at={"q": 1, "r": 0})])),
    ("a program with a position", {**program_from_rules([rule(ALWAYS, walk("stick"))]), "target": {"q": 3, "r": 1}}),
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
    state = game.createCharacter(state, 'Ala').state;
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
    # Locations, not field names alone, distinguish structural metadata from world references.
    # Flat fixtures remain readable until the grouped production contract replaces them.
    children = {
        ("program", "groups"): "groups", ("program", "rules"): "flat-rules",
        ("group", "rules"): "rules", ("group", "condition"): "condition",
        ("rule", "condition"): "condition", ("flat-rule", "condition"): "condition",
    }
    members = {"groups": "group", "rules": "rule", "flat-rules": "flat-rule"}

    def visit(value, path, position=None):
        if isinstance(value, bool) or value is None:
            return
        if isinstance(value, (int, float)):
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
                visit(item, f"{path}[{index}]", members.get(position))
            return
        if isinstance(value, dict):
            for name, item in value.items():
                identity = ((position == "program" and name in ("nextGroupId", "nextRuleId"))
                            or (position in ("group", "rule") and name == "id"))
                if identity and type(item) is int and item > 0:
                    continue
                if position == "group" and name == "name" and isinstance(item, str):
                    continue
                compares = (position == "condition" and name == "value"
                            and value.get("kind") in COMPARES_STOCK)
                if compares and isinstance(item, (int, float)):
                    continue
                if name == "resource" and not isinstance(item, str):
                    found.append(f"{path}.resource: {json.dumps(item)} is no resource identifier")
                    continue
                visit(item, f"{path}.{name}", children.get((position, name)))
            return
        found.append(f"{path}: a value of no JSON kind read here: {value!r}")

    visit(program, "program", "program")
    return found


def findings(label, pair):
    found = []
    for result in pair:
        where = "during a map run" if result["withRun"] else "in the headquarters"
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

    def test_control_grouped_metadata_is_not_a_world_reference(self):
        # invariant: program-world-reference
        # D-90 and the task plan: ids identify groups/rules; a group name is player text.
        grouped = {
            "nextGroupId": 9, "nextRuleId": 15,
            "groups": [
                {"id": 2, "name": "Grupa 2", "condition": {"kind": "always"},
                 "rules": [{"id": 4, "condition": {"kind": "hereBelow", "resource": "stick",
                                                 "value": 0},
                            "action": {"kind": "walkTo", "resource": "moss"}}]},
                {"id": 8, "name": "Route 1,2", "condition": {"kind": "hereBelow",
                                                             "resource": "berry", "value": 50},
                 "rules": [{"id": 14, "condition": {"kind": "always"},
                            "action": {"kind": "explore"}}]},
            ],
        }
        self.assertEqual(naming(grouped), [])
        # The same spelling in an action, condition or unexpected container is not metadata.
        intrusions = (
            ("action id", ("groups", 0, "rules", 0, "action"), "id", 7),
            ("rule tile", ("groups", 0, "rules", 0), "tile", 3),
            ("action coordinates", ("groups", 0, "rules", 0, "action"), "at", {"q": 1, "r": 2}),
            ("numbered resource", ("groups", 0, "rules", 0, "action"), "resource", "stick 2"),
            ("action name", ("groups", 0, "rules", 0, "action"), "name", "tile 2"),
            ("group coordinates", ("groups", 1), "at", {"q": 1, "r": 2}),
            ("group condition id", ("groups", 1, "condition"), "id", 3),
            ("nested group", ("groups", 0), "groups", [{"id": 3, "name": "Grupa 3"}]),
            ("root id", (), "id", 7),
            ("rule name", ("groups", 0, "rules", 0), "name", "tile 7"),
            ("group next id", ("groups", 0), "nextGroupId", 9),
            ("unexpected metadata container", (), "extra", {"nextRuleId": 15}),
            ("structured group name", ("groups", 0), "name", {"q": 1, "r": 2}),
            ("structured rule id", ("groups", 0, "rules", 0), "id", {"q": 1, "r": 2}),
            ("fake condition", ("groups", 0), "extra", {"kind": "hereBelow", "value": 3}),
        )
        for label, path, field, value in intrusions:
            with self.subTest(case=label):
                held = copying.deepcopy(grouped)
                target = held
                for part in path:
                    target = target[part]
                target[field] = value
                self.assertTrue(naming(held), f"{label} goes unseen")

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
        action_id = copying.deepcopy(BASE)
        program_rules(action_id)[0]["action"]["id"] = 7
        held["a number on an action"] = action_id
        for label, program in held.items():
            with self.subTest(case=label):
                self.assertTrue(naming(copying.deepcopy(program)), f"{label} goes unseen")


if __name__ == "__main__":
    unittest.main()
