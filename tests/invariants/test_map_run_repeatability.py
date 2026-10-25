"""Invariant map-run-repeatability: Two simulations of one program from one starting game state
with one seed give the same map run, game minute by game minute, when they receive the same
real-time inputs.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `createCharacter`, `setProgram`,
`send`, `passRealTime`, `setPaused` and `restart`, each returning `{state, events}`. After every
input the script records the JSON of the whole game state and the events that input gave.

Reading of the sentence:
- one program, one starting game state, one seed: a new game given the program P1 below and sent
  to the map with the real time T below, so that both simulations take the seed the send derives
  from the same game state and the same T;
- the same real-time inputs: one fixed list of inputs written out below — 1000 ms passes of real
  time covering more than 230 game minutes and fewer than 240, a pause with real time passed while
  paused and a resume, four 250 ms passes, and a change of the program to P2 in the middle;
- the same map run game minute by game minute: the recorded state and events after each input are
  equal, input by input, which with 1000 ms inputs is minute by minute.

Covers:
- two simulations in two separate Node processes, so that a hidden use of process-wide
  randomness or of the clock shows as a difference;
- a replay inside one process: after the scenario the script sets P1 again and restarts the map
  run (a restart keeps the run's seed and starts at minute 0 with the program in force), then
  feeds the same inputs, the change to P2 included; the replay's map run and events must equal
  the first run's from minute 0;
- controls, so the check can fail: a send with another real time T_OTHER gives a different layout
  of tiles; the scenario reveals more than one tile, moves the character to more than one tile
  and reaches game minute 230, so the compared runs are not trivial.

Does NOT cover: inputs other than the scenario's; maps, archetypes and programs other than those
below; the view's clock; a seed reached otherwise than by these sends.
"""

import json
import os
import shutil
import tempfile
import unittest

import loop2_invariant_support as support
from program_fixture import program_from_rules

GAME_MODULE = "dist/public/sim/game.js"

# The map sent to, as the data files name it (D-18), and the character sent: the first one a
# new game creates, which takes the id 1.
SENT = {"mapId": "forest", "characterId": 1}
CREATE = ["createCharacter", "Ala"]

# Real time, in ms, given to `send`; the seed derives from it and the game state.
T = 1760000000000
T_OTHER = 1760000123456


def rule(condition, action):
    return {"condition": condition, "action": action}


ALWAYS = {"kind": "always"}
AWAY = {"kind": "awayFromCampfire"}


def here_below(resource, value):
    return {"kind": "hereBelow", "resource": resource, "value": value}


def below(kind, value):
    return {"kind": kind, "value": value}


def item_below(item, value):
    return {"kind": "itemBelow", "item": item, "value": value}


EXPLORE = {"kind": "explore"}
WANDER = {"kind": "wander"}


def walk_to(resource):
    return {"kind": "walkTo", "resource": resource}


def gather(resource):
    return {"kind": "gather", "resource": resource}


# The starting program: every condition kind and every action kind (the acceptance program of
# tests/sim/acceptance.test.mjs).
P1 = program_from_rules([
    rule(below("satietyBelow", 35), {"kind": "eat"}),
    rule(below("temperatureBelow", 36), {"kind": "lightCampfire"}),
    rule(below("temperatureBelow", 36.5), {"kind": "feedCampfire"}),
    rule(below("temperatureBelow", 35.2), {"kind": "walkToCampfire"}),
    rule(below("campfireLeftBelow", 1), {"kind": "craftCampfire"}),
    rule(item_below("berry", 1), gather("berry")),
    rule(item_below("berry", 1), walk_to("berry")),
    rule(here_below("berry", 1), EXPLORE),
    rule(item_below("berry", 1), WANDER),
    rule(item_below("stick", 8), gather("stick")),
    rule(item_below("stick", 8), walk_to("stick")),
    rule(below("temperatureBelow", 36), {"kind": "lightItem"}),
    rule(ALWAYS, EXPLORE),
    rule(AWAY, {"kind": "walkToCampfire"}),
    rule(ALWAYS, gather("stick")),
    rule(ALWAYS, gather("berry")),
    rule(ALWAYS, WANDER),
])
# The program set in the middle of the scenario.
P2 = program_from_rules([
    rule(below("satietyBelow", 50), {"kind": "eat"}),
    rule(item_below("stick", 3), gather("stick")),
    rule(here_below("fiber", 2), walk_to("stick")),
    rule(ALWAYS, WANDER),
    rule(ALWAYS, EXPLORE),
])

SECOND = ["passRealTime", 1000]
SCENARIO_INPUTS = (
    [SECOND] * 80
    + [["setProgram", P2]]
    + [SECOND] * 40
    + [["setPaused", True]]
    + [SECOND] * 5
    + [["setPaused", False]]
    + [["passRealTime", 250]] * 4
    + [SECOND] * 115
)
START = [["newGame"], CREATE, ["setProgram", P1], ["send", SENT, T]]
REPLAY_START = [["setProgram", P1], ["restart"]]
STEPS = START + SCENARIO_INPUTS + REPLAY_START + SCENARIO_INPUTS

SEND_INDEX = len(START) - 1
FIRST_INPUT = len(START)
RESTART_INDEX = FIRST_INPUT + len(SCENARIO_INPUTS) + len(REPLAY_START) - 1
REPLAY_FIRST_INPUT = RESTART_INDEX + 1

MINIMUM_MINUTES = 230

# Drives the public functions of the built game module through a list of steps and records, after
# each step, the JSON of the whole state and the events the step gave.
DRIVER = r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, stepsPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));
let state;
const records = [];
for (const [name, ...args] of steps) {
  if (name === 'newGame') {
    state = game.newGame();
    records.push({ step: name, state: JSON.parse(JSON.stringify(state)), events: [] });
    continue;
  }
  const result = game[name](state, ...args);
  state = result.state;
  records.push({ step: name, state: JSON.parse(JSON.stringify(state)),
                 events: JSON.parse(JSON.stringify(result.events)) });
}
writeFileSync(outPath, JSON.stringify(records));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def drive(copy, steps):
    """Run the steps in a new Node process against the built copy; return its records."""
    game = copy.file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}, so the simulation "
                             "cannot be driven")
    directory = tempfile.mkdtemp(prefix="loop2-repeatability-")
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


_records = {}


def records(name, steps):
    """The records of one named run of steps, run once per test run."""
    if name not in _records:
        _records[name] = drive(support.built_copy(), steps)
    return _records[name]


def minute(record):
    run = record["state"].get("run")
    return None if run is None else run.get("minute")


class MapRunRepeatability(unittest.TestCase):

    def test_two_processes_give_the_same_run_minute_by_minute(self):
        # invariant: map-run-repeatability
        first = records("first", STEPS)
        second = records("second", STEPS)
        self.assertEqual(len(first), len(STEPS))
        self.assertEqual(len(second), len(STEPS))
        self.assertIsNotNone(minute(first[SEND_INDEX]), "the send started no map run")
        for index, (a, b) in enumerate(zip(first, second)):
            if a != b:
                self.fail(f"the two processes differ at step {index} ({STEPS[index][0]}), "
                          f"game minute {minute(a)} against {minute(b)}:\n"
                          f"first:  {json.dumps(a)[:2000]}\nsecond: {json.dumps(b)[:2000]}")

    def test_restart_with_the_same_program_replays_the_run(self):
        # invariant: map-run-repeatability
        run = records("first", STEPS)
        sent, restarted = run[SEND_INDEX], run[RESTART_INDEX]
        self.assertEqual(restarted["state"]["run"], sent["state"]["run"],
                         "the restarted map run at minute 0 is not the sent map run at minute 0")
        tail = restarted["events"][-len(sent["events"]):] if sent["events"] else []
        self.assertEqual(tail, sent["events"],
                         "the restart does not end with the events the send gave")
        for offset in range(len(SCENARIO_INPUTS)):
            a, b = run[FIRST_INPUT + offset], run[REPLAY_FIRST_INPUT + offset]
            if (a["state"]["run"], a["events"]) != (b["state"]["run"], b["events"]):
                self.fail(f"the replay differs at input {offset} "
                          f"({SCENARIO_INPUTS[offset][0]}), game minute {minute(a)} "
                          f"against {minute(b)}:\nfirst:  {json.dumps(a)[:2000]}\n"
                          f"replay: {json.dumps(b)[:2000]}")

    def test_controls_the_compared_runs_can_differ(self):
        # invariant: map-run-repeatability
        run = records("first", STEPS)
        other = records("other-seed",
                        [["newGame"], CREATE, ["setProgram", P1], ["send", SENT, T_OTHER]])
        self.assertNotEqual(other[-1]["state"]["run"]["tiles"],
                            run[SEND_INDEX]["state"]["run"]["tiles"],
                            f"a send with real time {T_OTHER} gives the same layout as one "
                            f"with {T}, so a difference of seeds would not show")
        scenario = run[FIRST_INPUT:RESTART_INDEX - 1]
        last = scenario[-1]["state"]["run"]
        self.assertGreaterEqual(last["minute"], MINIMUM_MINUTES,
                                "the scenario does not cover the minutes it is meant to")
        revealed = [t for t in last["tiles"] if t.get("revealed")]
        self.assertGreater(len(revealed), 1, "the scenario reveals at most one tile")
        positions = {json.dumps(r["state"]["run"]["character"]["at"], sort_keys=True)
                     for r in [run[SEND_INDEX]] + scenario}
        self.assertGreater(len(positions), 1, "the scenario never moves the character")


if __name__ == "__main__":
    unittest.main()
