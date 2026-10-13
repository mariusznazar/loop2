"""Invariant player-map-run-pace/1: Real time passed to the simulation for a map run the player
starts moves the map run on by one game minute for each whole real second passed while it is not
paused, and by no game minute for real time passed while it is paused.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `setProgram`, `send`,
`passRealTime`, `setPaused`, `restart` and `end`, each returning `{state, events}`. After every
input the script records the map run's game minute and whether the game is paused.

Reading of the sentence:
- a map run the player starts: one begun by `send`, and one begun anew by `restart`;
- real time passed to the simulation: `passRealTime(state, realMs)` with a positive number of
  milliseconds;
- one game minute for each whole real second passed while it is not paused: after each input the
  map run's minute is the number of whole seconds in all the real time passed to that map run
  while not paused — parts of a second carry over from one input to the next, and real time
  passed to an earlier map run counts for none of a later one;
- by no game minute while paused: real time passed between `setPaused(true)` and
  `setPaused(false)` leaves the minute where it is, and does not count towards the next second.

The expected minute after each input is written out beside it below.

Control, so the check can fail: the same inputs without the pause move the map run on by the
real time that the paused inputs would have brought (minute 9 to 10, 70 and 71), and whether the
game is paused is checked after each `setPaused`, so the paused part of the scenario is not
vacuous.

Does NOT cover: real time passed with no map run; zero, negative or non-finite real time; inputs
whose sum is not exact in binary floating point; the view's clock.
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
PROGRAM = {"rules": [
    {"condition": {"kind": "hereBelow", "resource": "stick", "value": 1},
     "action": {"kind": "explore"}},
    {"condition": {"kind": "always"}, "action": {"kind": "wander"}},
]}


def passed(ms):
    return ["passRealTime", ms]


PAUSE = ["setPaused", True]
RESUME = ["setPaused", False]

START = [["newGame"], ["setProgram", PROGRAM], ["send", SENT, T]]

# (input, the map run's game minute after it, whether the game is paused after it). Steps whose
# expected minute is None leave no map run.
PREFIX = (
    (passed(1000), 1, False),
    (passed(1000), 2, False),
    (passed(3000), 5, False),
    (passed(500), 5, False),
    (passed(499), 5, False),
    (passed(1), 6, False),
    (passed(250), 6, False),
    (passed(250), 6, False),
    (passed(250), 6, False),
    (passed(250), 7, False),
    (passed(333.5), 7, False),
    (passed(666.5), 8, False),
    (passed(1500), 9, False),
)
SCENARIO = PREFIX + (
    (PAUSE, 9, True),
    (passed(1000), 9, True),
    (passed(60000), 9, True),
    (passed(500), 9, True),
    (RESUME, 9, False),
    (passed(499), 9, False),
    (passed(1), 10, False),
    (passed(3600000), 3610, False),
    (PAUSE, 3610, True),
    (passed(2000), 3610, True),
    (RESUME, 3610, False),
    (passed(2000), 3612, False),
    (passed(500), 3612, False),
    (["restart"], 0, None),
    (RESUME, 0, False),
    (passed(600), 0, False),
    (passed(400), 1, False),
    (passed(1000), 2, False),
    (passed(700), 2, False),
    (["end"], None, None),
    (["send", SENT, T_OTHER], 0, None),
    (RESUME, 0, False),
    (passed(300), 0, False),
    (passed(700), 1, False),
    (passed(5000), 6, False),
)
CONTROL = PREFIX + (
    (passed(1000), 10, False),
    (passed(60000), 70, False),
    (passed(500), 71, False),
)

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
  records.push({ step: name, minute: state.run ? state.run.minute : null, paused: state.paused });
}
writeFileSync(outPath, JSON.stringify(records));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def drive(steps):
    copy = support.built_copy()
    game = copy.file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}, so the simulation "
                             "cannot be driven")
    directory = tempfile.mkdtemp(prefix="loop2-pace-")
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


class PlayerMapRunPace(unittest.TestCase):

    def run_and_compare(self, table):
        records = drive(START + [list(step) for step, _minute, _paused in table])
        self.assertEqual(len(records), len(START) + len(table))
        self.assertEqual(records[len(START) - 1]["minute"], 0, "the send started no map run "
                                                               "at minute 0")
        self.assertFalse(records[len(START) - 1]["paused"], "the sent map run is paused")
        for index, (step, minute, paused) in enumerate(table):
            record = records[len(START) + index]
            where = f"input {index}, {json.dumps(step)}"
            self.assertEqual(record["minute"], minute, f"game minute after {where}")
            if paused is not None:
                self.assertEqual(record["paused"], paused, f"paused after {where}")

    def test_whole_unpaused_seconds_move_the_run_on(self):
        # invariant: player-map-run-pace/1
        self.run_and_compare(SCENARIO)

    def test_control_the_paused_inputs_would_move_an_unpaused_run(self):
        # invariant: player-map-run-pace/1
        self.run_and_compare(CONTROL)


if __name__ == "__main__":
    unittest.main()
