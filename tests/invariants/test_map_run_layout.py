"""Invariant map-run-layout: Two map runs of one game map on one seed have the same kinds of
resource present on each tile, whatever their amounts, at every game minute, whatever programs they
run under.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `setProgram`, `send`, `restart` and
`advanceMinutes` one game minute at a time. After every input the script records the JSON of the
map run.

Reading of the sentence:
- the resources on a tile: which resources the tile's `stock` holds — the keys of `stock`, a
  resource held with a stock of 0 counted as held — not how much; a tile is named by its column
  and row (`col`, `row`), and the two map runs must have the same tiles;
- one seed: the map run's `seed`; two map runs on one seed come about in two ways, and both are
  checked: two games each sent to the map at the same real time T (the first send of a game mixes
  the same last seed with the same real time), and one map run followed by a map run restart under
  a changed program (a restart keeps its seed, restart-seed); that the two seeds are equal is
  checked before the runs are compared;
- every game minute: the same minute of each map run, from 0 (the send or the restart) to 300;
- whatever programs: each pair runs under two different programs written out below, so that the
  characters reveal and walk differently; one of each pair is changed mid-run.

The sentence compares two runs of the product with each other, so neither side is written out:
the expected side is the other run.

Pairs, each on the seeds of the real times T, T_OTHER and MORE, on the map Las (`forest`) with the
archetype `elementalMage`: EXPLORE ("always → explore", "always → wander") with WANDER ("always →
wander", which never reveals a tile); GOING ("always → go to berry", "always → explore", "always →
wander") with EXPLORE; EMPTY (no rule: the character only waits) with GOING; the second program of
each pair is replaced by the first at minute 150.

Controls, so the check can fail: in each pair the two characters stand on different tiles, or the
two runs have different tiles revealed, at some minute (the programs made a difference); every
run's tiles hold some resource; two sends at different real times give map runs whose resources
differ on some tile (the comparison is not of empty or fixed layouts); and the comparison flags
made-up records with a resource taken off, or put on, one tile at one minute of one run.

Does NOT cover: how much of a resource a tile holds; maps other than Las; real time
(`passRealTime`) as the way minutes pass.
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
T_OTHER = 1760000123456
MORE = (1760000200000, 1760000300000, 1760000400000)
MINUTES = 300
CHANGE_AT = 150

ALWAYS = {"kind": "always"}


def rule(condition, action):
    return {"condition": condition, "action": action}


EXPLORE = {"rules": [rule(ALWAYS, {"kind": "explore"}), rule(ALWAYS, {"kind": "wander"})]}
WANDER = {"rules": [rule(ALWAYS, {"kind": "wander"})]}
GOING = {"rules": [rule(ALWAYS, {"kind": "walkTo", "resource": "berry"}),
                   rule(ALWAYS, {"kind": "explore"}), rule(ALWAYS, {"kind": "wander"})]}
EMPTY = {"rules": []}
PAIRS = (("EXPLORE", EXPLORE, "WANDER", WANDER), ("GOING", GOING, "EXPLORE", EXPLORE),
         ("EMPTY", EMPTY, "GOING", GOING))

DRIVER = r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, stepsPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));
let state;
const runs = [];
for (const [name, ...args] of steps) {
  state = name === 'newGame' ? game.newGame() : game[name](state, ...args).state;
  runs.push({ step: name, run: JSON.parse(JSON.stringify(state.run)) });
}
writeFileSync(outPath, JSON.stringify(runs));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def minutes(first, then, count=MINUTES):
    """Steps passing `count` game minutes one at a time, under `first`, replaced by `then` at
    CHANGE_AT."""
    steps = []
    for minute in range(1, count + 1):
        if minute == CHANGE_AT:
            steps.append(["setProgram", then])
        steps.append(["advanceMinutes", 1])
    return steps


def drive(steps):
    """The map runs the steps bring about, each as its list of states by minute: a new list
    begins at every send or restart."""
    game = support.built_copy().file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}")
    directory = tempfile.mkdtemp(prefix="loop2-map-run-layout-")
    try:
        script = os.path.join(directory, "driver.mjs")
        steps_path = os.path.join(directory, "steps.json")
        out_path = os.path.join(directory, "runs.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(DRIVER)
        with open(steps_path, "w", encoding="utf-8", newline="\n") as handle:
            json.dump(steps, handle)
        code, output = support.run([node(), script, game, steps_path, out_path], directory)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            records = json.load(handle)
    finally:
        shutil.rmtree(directory, ignore_errors=True)
    runs = []
    for record in records:
        if record["step"] in ("send", "restart"):
            runs.append([record["run"]])
        elif record["step"] == "advanceMinutes":
            runs[-1].append(record["run"])
    for run in runs:
        if [state["minute"] for state in run] != list(range(len(run))):
            raise AssertionError("a map run did not pass one game minute per input")
    return runs


def two_sends(first, second, real_ms):
    """Two games, each sent at `real_ms`: one under `first`, one under `second` (replaced by
    `first` at CHANGE_AT)."""
    one = drive([["newGame"], ["setProgram", first], ["send", SENT, real_ms]]
                + minutes(first, first))
    two = drive([["newGame"], ["setProgram", second], ["send", SENT, real_ms]]
                + minutes(second, first))
    return one[0], two[0]


def restarted(first, second, real_ms):
    """One game: a map run under `first`, then a restart under `second` (replaced by `first` at
    CHANGE_AT)."""
    runs = drive([["newGame"], ["setProgram", first], ["send", SENT, real_ms]]
                 + minutes(first, first)
                 + [["setProgram", second], ["restart"]] + minutes(second, first))
    if len(runs) != 2:
        raise AssertionError(f"the steps brought about {len(runs)} map runs, not 2")
    return runs[0], runs[1]


def layout(state):
    """{(col, row): the resources the tile holds} of one state of a map run."""
    return {(t["col"], t["row"]): sorted(t["stock"]) for t in state["tiles"]}


def differences(one, two):
    """Where two map runs, minute by minute, differ in the resources on a tile."""
    found = []
    if one[0]["seed"] != two[0]["seed"]:
        found.append(f"the two map runs are on different seeds: {one[0]['seed']}, "
                     f"{two[0]['seed']}")
        return found
    if len(one) != len(two):
        found.append(f"the map runs last {len(one)} and {len(two)} minutes")
    for a, b in zip(one, two):
        first, second = layout(a), layout(b)
        if sorted(first) != sorted(second):
            found.append(f"minute {a['minute']}: the map runs have different tiles")
            continue
        for tile in sorted(first):
            if first[tile] != second[tile]:
                found.append(f"minute {a['minute']}: tile {tile} holds {first[tile]} in one map "
                             f"run and {second[tile]} in the other")
    return found


def made_a_difference(one, two):
    return any(a["character"]["at"] != b["character"]["at"]
               or [t["revealed"] for t in a["tiles"]] != [t["revealed"] for t in b["tiles"]]
               for a, b in zip(one, two))


class MapRunLayout(unittest.TestCase):

    def check_pair(self, one, two, label):
        self.assertEqual(differences(one, two), [], label)
        self.assertTrue(made_a_difference(one, two),
                        f"{label}: the two programs made no difference, so the pair shows nothing")
        for run in (one, two):
            self.assertTrue(any(t["stock"] for t in run[0]["tiles"]),
                            f"{label}: no tile holds any resource")

    def test_two_sends_on_one_seed_have_one_layout(self):
        # invariant: map-run-layout
        for name_one, first, name_two, second in PAIRS:
            for real_ms in (T, T_OTHER) + MORE:
                with self.subTest(pair=(name_one, name_two), real_ms=real_ms):
                    one, two = two_sends(first, second, real_ms)
                    self.check_pair(one, two, f"{name_one} and {name_two} sent at {real_ms}")

    def test_a_restart_under_another_program_has_the_same_layout(self):
        # invariant: map-run-layout
        for name_one, first, name_two, second in PAIRS:
            for real_ms in (T, T_OTHER) + MORE:
                with self.subTest(pair=(name_one, name_two), real_ms=real_ms):
                    one, two = restarted(first, second, real_ms)
                    self.check_pair(one, two, f"{name_one}, restarted under {name_two}, "
                                              f"sent at {real_ms}")

    def test_control_the_comparison_flags_breaks(self):
        # invariant: map-run-layout
        one, two = two_sends(EXPLORE, WANDER, T)
        self.assertEqual(differences(one, two), [])
        other = two_sends(EXPLORE, EXPLORE, T_OTHER)[0]
        other_seed = [dict(state, seed=one[0]["seed"]) for state in other]
        self.assertTrue(differences(one, other_seed),
                        "map runs sent at different real times have one layout, so the "
                        "comparison shows nothing")
        holding = next(t for t in one[0]["tiles"] if t["stock"])
        resource = sorted(holding["stock"])[0]
        taken = copying.deepcopy(two)
        tile = next(t for t in taken[100]["tiles"]
                    if (t["col"], t["row"]) == (holding["col"], holding["row"]))
        del tile["stock"][resource]
        self.assertTrue(differences(one, taken), "a resource taken off a tile goes unseen")
        absent = next((t, r) for t in one[0]["tiles"] for r in ("stick", "berry", "moss", "fiber")
                      if r not in t["stock"])
        put = copying.deepcopy(two)
        tile = next(t for t in put[MINUTES]["tiles"]
                    if (t["col"], t["row"]) == (absent[0]["col"], absent[0]["row"]))
        tile["stock"][absent[1]] = 0
        self.assertTrue(differences(one, put),
                        "a resource put on a tile with a stock of 0 goes unseen")


if __name__ == "__main__":
    unittest.main()
