"""Invariant map-run-tiles/1: When a map run starts, each tile holds, of each resource on its game
map's list of resources, either none or the stock per tile that the game map's data gives, and
holds no resource missing from that list.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written). A Node script this check writes to a temporary directory imports
`dist/public/sim/game.js` and the data modules `dist/public/sim/data/maps.js` and
`dist/public/sim/data/archetypes.js`, and for every game map of `MAPS` starts map runs through the
public functions `newGame`, `setProgram`, `send`, `advanceMinutes`, `restart` and `end`, recording
the map run's tiles at each start, together with the game map's list of resources as the data
gives it.

Reading of the sentence:
- a map run starts: the state a `send` returns, and the state a `restart` returns;
- the game map's list of resources and its stock per tile: the entries of `resources` of the game
  map in `MAPS`, each with its `id` and `stock`, as the data module gives them when the check runs;
- a tile holds of a resource: `tile.stock[id]`; holds none: the key is missing, or its value is 0;
- holds no resource missing from that list: every key of `tile.stock` is an `id` of the list.

Scenarios: for every game map of `MAPS`, with the first archetype of `ARCHETYPES`, a send at each
of 12 real times written out below, then 50 game minutes, a restart, an end and a second send
(whose seed comes from the first), so 36 map run starts for each game map.

Controls, so the check can fail: the data read gives every game map a non-empty list with a
positive stock for each resource; over the starts, each resource of the list stands on some tile
with its stock and is missing from some tile, so a layout giving every tile everything or nothing
would show; and the comparison flags made-up tiles holding a stock one less than the data's, a
resource off the list, and a stock of half the data's.

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

BUILT_DIRECTORY = "dist/public/sim"
REAL_TIMES = (1760000000000, 1760000123456, 1760000200000, 1760000300000, 1760000400000,
              1760000500000, 1, 86400000, 1700000000000, 1800000000000, 1760000000001,
              1765432109876)
ALWAYS = {"kind": "always"}
PROGRAM = {"rules": [{"condition": ALWAYS, "action": {"kind": "explore"}},
                     {"condition": ALWAYS, "action": {"kind": "wander"}}]}
STARTS_PER_TIME = 3

DRIVER = r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const [simDirectory, configPath, outPath] = process.argv.slice(2);
const config = JSON.parse(readFileSync(configPath, 'utf8'));
const load = (path) => import(pathToFileURL(join(simDirectory, path)).href);
const game = await load('game.js');
const { MAPS } = await load('data/maps.js');
const { ARCHETYPES } = await load('data/archetypes.js');
const archetypeId = Object.keys(ARCHETYPES)[0];
const out = { maps: {}, starts: [] };
for (const [mapId, map] of Object.entries(MAPS)) {
  out.maps[mapId] = JSON.parse(JSON.stringify(map.resources));
  for (const realMs of config.realTimes) {
    let state = game.setProgram(game.newGame(), config.program).state;
    const record = (how) => out.starts.push({ mapId, how, realMs,
      tiles: JSON.parse(JSON.stringify(state.run.tiles)) });
    state = game.send(state, { mapId, archetypeId }, realMs).state;
    record('send');
    state = game.advanceMinutes(state, 50).state;
    state = game.restart(state).state;
    record('restart');
    state = game.end(state).state;
    state = game.send(state, { mapId, archetypeId }, realMs + 1000).state;
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
                json.dump({"realTimes": REAL_TIMES, "program": PROGRAM}, handle)
            code, output = support.run([node(), script, directory, config, out_path], work)
            if code != 0:
                raise AssertionError(f"the driver exited {code}:\n{output}")
            with open(out_path, encoding="utf-8") as handle:
                _result["value"] = json.load(handle)
        finally:
            shutil.rmtree(work, ignore_errors=True)
    return _result["value"]


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
        # invariant: map-run-tiles/1
        result = starts()
        self.assertTrue(result["maps"], "the data gives no game map")
        for map_id in result["maps"]:
            of_map = [s for s in result["starts"] if s["mapId"] == map_id]
            self.assertEqual(len(of_map), len(REAL_TIMES) * STARTS_PER_TIME)
        found = []
        for start in result["starts"]:
            self.assertTrue(start["tiles"], "a map run started with no tiles")
            found += violations(start, result["maps"][start["mapId"]])
        self.assertEqual(found, [])

    def test_control_the_data_and_the_layouts_can_show_a_break(self):
        # invariant: map-run-tiles/1
        result = starts()
        for map_id, resources in result["maps"].items():
            self.assertTrue(resources, f"the game map {map_id} lists no resource")
            for resource in resources:
                self.assertIsInstance(resource["stock"], (int, float))
                self.assertGreater(resource["stock"], 0, f"{map_id} {resource['id']}")
                tiles = [t for s in result["starts"] if s["mapId"] == map_id
                         for t in s["tiles"]]
                self.assertTrue(any(t["stock"].get(resource["id"]) == resource["stock"]
                                    for t in tiles),
                                f"no tile of {map_id} holds {resource['id']}")
                self.assertTrue(any(not t["stock"].get(resource["id"]) for t in tiles),
                                f"every tile of {map_id} holds {resource['id']}")

    def test_control_the_comparison_flags_breaks(self):
        # invariant: map-run-tiles/1
        result = starts()
        start = result["starts"][0]
        resources = result["maps"][start["mapId"]]
        self.assertEqual(violations(start, resources), [])
        first = resources[0]
        for change in ("less", "foreign", "half"):
            made_up = copying.deepcopy(start)
            stock = made_up["tiles"][0]["stock"]
            if change == "less":
                stock[first["id"]] = first["stock"] - 1
            elif change == "foreign":
                stock["off-the-list"] = 1
            else:
                stock[first["id"]] = first["stock"] / 2
            with self.subTest(change=change):
                self.assertTrue(violations(made_up, resources), f"a {change} stock goes unseen")


if __name__ == "__main__":
    unittest.main()
