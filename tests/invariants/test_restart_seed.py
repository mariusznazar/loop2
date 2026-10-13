"""Invariant restart-seed/1: A restart has the seed of the map run it replaces.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `setProgram`, `send`,
`advanceMinutes`, `passRealTime`, `setPaused`, `restart` and `end`. After every input the script
records the JSON of the map run.

Reading of the sentence:
- a restart: the map run in the state `restart` returns; the map run it replaces: the map run of
  the state `restart` was given;
- has the seed: its `seed` equals the replaced map run's `seed`.

Scenario (map Las, `forest`, archetype `elementalMage`; inputs written out below): a send at the
real time T, 30 game minutes, a restart, 45 game minutes with real time passed and a pause, a
change of the program, a restart, a restart at once, an end, a send at the real time T_OTHER,
20 game minutes, a restart. Each restart's seed is compared with the seed of the map run just
before it, and its minute must be 0 while the minute before it was above 0 or the restart came at
once, so that the restart did replace the map run.

Controls, so the check can fail: the two sends give map runs of different seeds, and a send right
after the first map run's end gives another seed again, so a restart that took a new seed as a
send does would show.

Does NOT cover: how a send's seed is chosen; restarts of map runs on other maps.
"""

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
ALWAYS = {"kind": "always"}
P1 = {"rules": [{"condition": ALWAYS, "action": {"kind": "explore"}},
                {"condition": ALWAYS, "action": {"kind": "wander"}}]}
P2 = {"rules": [{"condition": ALWAYS, "action": {"kind": "walkTo", "resource": "berry"}},
                {"condition": ALWAYS, "action": {"kind": "wander"}}]}

STEPS = [
    ["newGame"], ["setProgram", P1], ["send", SENT, T],
    ["advanceMinutes", 30], ["restart"],
    ["advanceMinutes", 20], ["passRealTime", 15000], ["setPaused", True],
    ["passRealTime", 9000], ["setPaused", False], ["advanceMinutes", 10],
    ["setProgram", P2], ["restart"], ["restart"],
    ["end"], ["send", SENT, T_OTHER], ["advanceMinutes", 20], ["restart"],
]
CONTROL_STEPS = [["newGame"], ["setProgram", P1], ["send", SENT, T], ["end"],
                 ["send", SENT, T], ["end"], ["send", SENT, T_OTHER]]

DRIVER = r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, stepsPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));
let state;
const records = [];
for (const [name, ...args] of steps) {
  state = name === 'newGame' ? game.newGame() : game[name](state, ...args).state;
  records.push({ step: name, run: state.run ? { seed: state.run.seed, minute: state.run.minute } : null });
}
writeFileSync(outPath, JSON.stringify(records));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def drive(steps):
    game = support.built_copy().file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}")
    directory = tempfile.mkdtemp(prefix="loop2-restart-seed-")
    try:
        script = os.path.join(directory, "driver.mjs")
        steps_path = os.path.join(directory, "steps.json")
        out_path = os.path.join(directory, "records.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(DRIVER)
        with open(steps_path, "w", encoding="utf-8", newline="\n") as handle:
            json.dump(steps, handle)
        code, output = support.run([node(), script, game, steps_path, out_path], directory)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            return json.load(handle)
    finally:
        shutil.rmtree(directory, ignore_errors=True)


class RestartSeed(unittest.TestCase):

    def test_each_restart_keeps_the_seed_of_the_run_it_replaces(self):
        # invariant: restart-seed/1
        records = drive(STEPS)
        restarts = [i for i, step in enumerate(STEPS) if step[0] == "restart"]
        self.assertEqual(len(restarts), 4)
        for index in restarts:
            before, after = records[index - 1]["run"], records[index]["run"]
            self.assertIsNotNone(before, f"step {index}: no map run to restart")
            self.assertIsNotNone(after, f"step {index}: the restart left no map run")
            self.assertEqual(after["minute"], 0, f"step {index}: the restart did not start anew")
            if STEPS[index - 1][0] != "restart":
                self.assertGreater(before["minute"], 0, f"step {index}: the run before the "
                                                        "restart had not moved on")
            self.assertEqual(after["seed"], before["seed"],
                             f"step {index}: the restart's seed differs from the seed of the "
                             "map run it replaces")

    def test_control_sends_take_other_seeds(self):
        # invariant: restart-seed/1
        records = drive(CONTROL_STEPS)
        seeds = [records[i]["run"]["seed"] for i, s in enumerate(CONTROL_STEPS) if s[0] == "send"]
        self.assertEqual(len(seeds), 3)
        self.assertEqual(len(set(seeds)), 3, f"sends gave the seeds {seeds}, so a restart taking "
                                             "a new seed as a send does could go unseen")
        main = drive(STEPS)
        first, second = main[2]["run"]["seed"], main[15]["run"]["seed"]
        self.assertNotEqual(first, second, "the two sends of the scenario share a seed")


if __name__ == "__main__":
    unittest.main()
