"""Invariant map-run-tiles: When a map run starts, each tile holds, of each resource on its game
map's list of resources, either none or the stock per tile that the game map's data gives, and
holds no resource missing from that list.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written). A Node script this check writes to a temporary directory imports
`dist/public/sim/game.js` and, for each game map written out in MAP_RESOURCES, starts map runs
through the public functions `newGame`, `setProgram`, `send`, `advanceMinutes`, `restart` and
`end`, recording the map run's tiles at each start.

Reading of the sentence:
- a map run starts: the state a `send` returns, and the state a `restart` returns;
- the game map's list of resources and its stock per tile: written out below in MAP_RESOURCES,
  transcribed from the entries of `resources` of the game map in `MAPS`
  (`src/browser/sim/data/maps.ts`), each with its `id` and `stock`; the check does not read the
  data at run time for its expected values (WAY-228), so a game map added to the data is checked
  only once it is written out here, and a stock changed in the data fails the check until it is
  written out anew; a tripwire reads the game maps of `MAPS` (`dist/public/sim/data/maps.js`)
  with their lists of resources and stocks, only to fail when one of them is not written out
  here, telling the maintainer to add it;
- a tile holds of a resource: `tile.stock[id]`; holds none: the key is missing, or its value is 0;
- holds no resource missing from that list: every key of `tile.stock` is an `id` of the list.

Scenarios: for every game map of MAP_RESOURCES, with a character created in a new game, of the
archetype `elementalMage`, a send at each of 15 real times written out below, then 50 game
minutes, a restart, an end and a second send
(whose seed comes from the first), so 45 map run starts for each game map. Three of the real times
(SINGLE_TILE_TIMES) give, on Las, a map run in which berry, fiber or moss stands on one tile
alone, the outcome of a layout that places on one tile a resource its draw left on none.

Controls, so the check can fail: each send at SINGLE_TILE_TIMES gives its resource on exactly
one tile, read from the public state as the number of tiles whose stock of it is above 0 — a
draw of one tile and a resource placed after a draw of none look alike there, so the control shows
the starts reach that outcome, not which path gave it; over the starts, each resource of the list
stands on some tile with its stock and is missing from some tile, so a layout giving every tile
everything or nothing would show; and the comparison flags made-up tiles holding, of each
resource of the list, a stock one more, one less or half the stock written out, and a resource
off the list.

Tripwire: every game map of the data, and every resource of its list with its stock, stands in
MAP_RESOURCES; a control shows it fails on made-up data with a game map, a resource or a stock
that is not written out.

Does NOT cover: tiles after the start of a map run; whether a tile's resources follow the
densities of the data.
"""

import copy as copying
import json
import os
import shutil
import tempfile
import unittest

import loop2_invariant_support as support
from program_fixture import program_from_rules

BUILT_DIRECTORY = "dist/public/sim"
# The game maps and, for each, its list of resources with the stock per tile, as
# src/browser/sim/data/maps.ts gives them.
MAP_RESOURCES = {
    "forest": ({"id": "stick", "stock": 12}, {"id": "berry", "stock": 8},
               {"id": "moss", "stock": 6}, {"id": "fiber", "stock": 6}),
}
# The name of the character sent; the first character a new game creates takes the id 1.
CHARACTER_NAME = "Ala"
# Real times of a send from a new game whose map run of Las holds a resource on one tile alone —
# the outcome a layout gives where the draw left the resource on no tile and it is placed on one
# tile all the same, a case a few starts in a thousand reach: berry, fiber and moss in turn.
SINGLE_TILE_TIMES = {1760001609000: "berry", 1760002975000: "fiber", 1760006249000: "moss"}
REAL_TIMES = (1760000000000, 1760000123456, 1760000200000, 1760000300000, 1760000400000,
              1760000500000, 1, 86400000, 1700000000000, 1800000000000, 1760000000001,
              1765432109876) + tuple(SINGLE_TILE_TIMES)
ALWAYS = {"kind": "always"}
PROGRAM = program_from_rules([{"condition": ALWAYS, "action": {"kind": "explore"}},
                              {"condition": ALWAYS, "action": {"kind": "wander"}}])
STARTS_PER_TIME = 3

DRIVER = r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const [simDirectory, configPath, outPath] = process.argv.slice(2);
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const game = await import(pathToFileURL(join(simDirectory, 'game.js')).href);
const characterId = 1;
const out = { starts: [] };
for (const mapId of config.mapIds) {
  for (const realMs of config.realTimes) {
    let state = game.setProgram(game.newGame(), config.program).state;
    state = game.createCharacter(state, config.characterName).state;
    const record = (how) => out.starts.push({ mapId, how, realMs,
      tiles: JSON.parse(JSON.stringify(state.run.tiles)) });
    state = game.send(state, { mapId, characterId }, realMs).state;
    record('send');
    state = game.advanceMinutes(state, 50).state;
    state = game.restart(state).state;
    record('restart');
    state = game.end(state).state;
    state = game.send(state, { mapId, characterId }, realMs + 1000).state;
    record('second send');
  }
}
writeFileSync(outPath, JSON.stringify(out));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


_result = {}


def starts():
    if "value" not in _result:
        directory = support.built_copy().file(BUILT_DIRECTORY)
        if not os.path.isfile(os.path.join(directory, "game.js")):
            raise AssertionError(f"`npm run build` placed no {BUILT_DIRECTORY}/game.js")
        work = tempfile.mkdtemp(prefix="loop2-map-run-tiles-")
        try:
            script = os.path.join(work, "driver.mjs")
            config = os.path.join(work, "config.json")
            out_path = os.path.join(work, "starts.json")
            with open(script, "w", encoding="utf-8", newline="\n") as handle:
                handle.write(DRIVER)
            with open(config, "w", encoding="utf-8", newline="\n") as handle:
                json.dump({"realTimes": REAL_TIMES, "program": PROGRAM,
                           "characterName": CHARACTER_NAME,
                           "mapIds": list(MAP_RESOURCES)}, handle)
            code, output = support.run([node(), script, directory, config, out_path], work)
            if code != 0:
                raise AssertionError(f"the driver exited {code}:\n{output}")
            with open(out_path, encoding="utf-8") as handle:
                _result["value"] = json.load(handle)
        finally:
            shutil.rmtree(work, ignore_errors=True)
    return _result["value"]


READER = r"""
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const [simDirectory, outPath] = process.argv.slice(2);
const { MAPS } = await import(pathToFileURL(join(simDirectory, 'data', 'maps.js')).href);
const out = {};
for (const [mapId, map] of Object.entries(MAPS)) {
  out[mapId] = (map.resources || []).map((r) => ({ id: r.id, stock: r.stock }));
}
writeFileSync(outPath, JSON.stringify(out));
"""


def data_maps():
    """The game maps of the data with their lists — read only for the tripwire, never as an
    expected value."""
    directory = support.built_copy().file(BUILT_DIRECTORY)
    work = tempfile.mkdtemp(prefix="loop2-map-tripwire-")
    try:
        script = os.path.join(work, "reader.mjs")
        out_path = os.path.join(work, "maps.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(READER)
        code, output = support.run([node(), script, directory, out_path], work)
        if code != 0:
            raise AssertionError(f"the reader exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            return json.load(handle)
    finally:
        shutil.rmtree(work, ignore_errors=True)


def not_written_out(read, written):
    """What the data gives that `written` lacks, as messages for the maintainer."""
    where = "MAP_RESOURCES in tests/invariants/test_map_run_tiles.py"
    found = []
    for map_id, resources in read.items():
        if map_id not in written:
            found.append(f"the data gives the game map {map_id!r}, which {where} does not hold; "
                         "add it there with its resources and stocks")
            continue
        known = {(r["id"], r["stock"]) for r in written[map_id]}
        for resource in resources:
            if (resource["id"], resource["stock"]) not in known:
                found.append(f"the data gives {map_id!r} the resource {resource['id']!r} with "
                             f"the stock {resource['stock']!r}, which {where} does not hold; "
                             "write it out there")
    return found


def violations(start, resources):
    """What breaks the sentence in one start's tiles, given the game map's list."""
    stock_of = {r["id"]: r["stock"] for r in resources}
    found = []
    for tile in start["tiles"]:
        where = f"{start['mapId']} ({start['how']} at {start['realMs']}) tile " \
                f"{tile['col']},{tile['row']}"
        for resource, value in tile["stock"].items():
            if resource not in stock_of:
                found.append(f"{where} holds {resource}, missing from the map's list")
            elif value not in (0, stock_of[resource]) or isinstance(value, bool):
                found.append(f"{where} holds {value!r} of {resource}, neither none nor the "
                             f"stock per tile {stock_of[resource]}")
    return found


class MapRunTiles(unittest.TestCase):

    def test_tiles_at_each_start(self):
        # invariant: map-run-tiles
        result = starts()
        for map_id in MAP_RESOURCES:
            of_map = [s for s in result["starts"] if s["mapId"] == map_id]
            self.assertEqual(len(of_map), len(REAL_TIMES) * STARTS_PER_TIME)
        found = []
        for start in result["starts"]:
            self.assertTrue(start["tiles"], "a map run started with no tiles")
            found += violations(start, MAP_RESOURCES[start["mapId"]])
        self.assertEqual(found, [])

    def test_control_the_layouts_can_show_a_break(self):
        # invariant: map-run-tiles
        result = starts()
        for map_id, resources in MAP_RESOURCES.items():
            for resource in resources:
                tiles = [t for s in result["starts"] if s["mapId"] == map_id
                         for t in s["tiles"]]
                self.assertTrue(any(t["stock"].get(resource["id"]) == resource["stock"]
                                    for t in tiles),
                                f"no tile of {map_id} holds {resource['id']}")
                self.assertTrue(any(not t["stock"].get(resource["id"]) for t in tiles),
                                f"every tile of {map_id} holds {resource['id']}")

    def test_control_single_tile_starts_are_reached(self):
        # invariant: map-run-tiles
        result = starts()
        for real_ms, resource in SINGLE_TILE_TIMES.items():
            start = next(s for s in result["starts"] if s["mapId"] == "forest"
                         and s["how"] == "send" and s["realMs"] == real_ms)
            holding = [t for t in start["tiles"] if t["stock"].get(resource)]
            self.assertEqual(len(holding), 1,
                             f"the send at {real_ms} no longer gives {resource} on one tile alone, "
                             "so the starts may not reach a layout that places a resource no "
                             "tile drew")
            self.assertEqual(violations(start, MAP_RESOURCES["forest"]), [])

    def test_tripwire_every_map_and_resource_is_written_out(self):
        # invariant: map-run-tiles
        read = data_maps()
        self.assertTrue(read, "the tripwire read no game map of the data")
        self.assertEqual(not_written_out(read, MAP_RESOURCES), [])

    def test_control_the_tripwire_fails_on_what_is_not_written_out(self):
        # invariant: map-run-tiles
        same = {m: [dict(r) for r in rs] for m, rs in MAP_RESOURCES.items()}
        self.assertEqual(not_written_out(same, MAP_RESOURCES), [])
        new_map = dict(same, cave=[{"id": "stone", "stock": 4}])
        self.assertTrue(not_written_out(new_map, MAP_RESOURCES), "a new game map goes unseen")
        new_resource = {m: rs + [{"id": "stone", "stock": 4}] for m, rs in same.items()}
        self.assertTrue(not_written_out(new_resource, MAP_RESOURCES),
                        "a new resource on a map's list goes unseen")
        new_stock = {m: [dict(r, stock=r["stock"] + 1) for r in rs] for m, rs in same.items()}
        self.assertTrue(not_written_out(new_stock, MAP_RESOURCES), "a changed stock goes unseen")

    def test_control_the_comparison_flags_breaks(self):
        # invariant: map-run-tiles
        result = starts()
        start = result["starts"][0]
        resources = MAP_RESOURCES[start["mapId"]]
        self.assertEqual(violations(start, resources), [])
        changes = {"one more": lambda n: n + 1, "one less": lambda n: n - 1,
                   "half": lambda n: n / 2}
        for resource in resources:
            for label, change in changes.items():
                made_up = copying.deepcopy(start)
                made_up["tiles"][0]["stock"][resource["id"]] = change(resource["stock"])
                with self.subTest(resource=resource["id"], change=label):
                    self.assertTrue(violations(made_up, resources),
                                    f"{label} of {resource['id']} goes unseen")
        made_up = copying.deepcopy(start)
        made_up["tiles"][0]["stock"]["off-the-list"] = 1
        self.assertTrue(violations(made_up, resources), "a resource off the list goes unseen")


if __name__ == "__main__":
    unittest.main()
