"""Invariant action-in-progress: The character's action in progress lasts its full duration
unless its map run ends first, even where the program changes or the condition of another program
rule comes to hold before it ends.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `createCharacter`, `setProgram`,
`send` and `advanceMinutes` one game minute at a time, each returning `{state, events}`. After
every input the script records the JSON of the map run.

Reading of the sentence:
- the character's action in progress: the map run's `current` activity (the action a program rule
  starts, D-23, D-25); its full duration: its action kind and end minute remain unchanged,
  its effect occurs only at that end minute, and the next action follows the changed
  program then. Rule indices and the full activity representation are not requirements;
  this reading follows accepted task przewodnik_testow_loop2.md, Q7a;
- the condition of another program rule comes to hold: a program rule other than the one being
  carried out whose condition did not hold now holds and whose action can start; in the simulation
  this check drives, a condition changes only through the program or at the end of an action, so it
  comes to hold here through a change of the rule's value;
- the program changes: `setProgram` with a different program;
- unless its map run ends first: the map runs below pass at most 45 game minutes, and none ends
  within them; a map run ended in the character's death is the invariant `minute-span-split`'s.

Scenario (map Las, entrance tile at column 1, row 1, which starts unrevealed; exploring lasts 20
game minutes and a step onto a tile of Las lasts 5, as the data files `actions.ts` and
`maps.ts` give them, D-18, D-24):
- program PA: rule 0 "fewer than 0 sticks here → wander" (never holds), rule 1 "always →
  explore"; at minute 0 the character starts exploring by rule 1, ending at minute 20;
- at minute 5 the program becomes PA_HOLDS, in which rule 0 reads "fewer than 50 sticks here",
  which holds on the unrevealed tile, and wandering can start; minutes 5 to 19 must still show the
  exploration started at minute 0, the tile unrevealed and the character on it;
- at minute 20 the exploration ends (the tile is revealed) and the next activity follows
  PA_HOLDS: rule 0, wander, from minute 20 to 25, towards a neighbouring tile;
- at minute 22 the program becomes PC: rule 0 "always → explore", rule 1 "always → wander";
  minutes 22 to 24 must still show the step started at minute 20; at minute 25 the character
  stands on the step's target and the next activity follows PC: rule 0, explore, from 25 to 45.

Controls, so the check can fail — the same send with:
- PA_HOLDS from the start: at minute 0 the character starts wandering by rule 0 (5 minutes), so
  a change taking effect at once at minute 5 would show;
- PA kept: at minute 20 no rule applies and the character waits; so the wandering at minute 20
  is the changed program's choice, visible as a difference;
- PA_HOLDS kept through minute 25: at minute 25 the character wanders again by rule 0, so the
  exploration at minute 25 is PC's choice, visible as a difference.

Does NOT cover: other actions, durations, maps or programs; a change made at the minute an action
ends; real time (`passRealTime`) as the way minutes pass.
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
T = 1760000000000

# The entrance of Las, (column 1, row 1), as `maps.ts` gives it (D-24), in the axial coordinates
# of the map run's tiles.
ENTRANCE = {"q": 1, "r": 1}
ENTRANCE_COLUMN, ENTRANCE_ROW = 1, 1

ALWAYS = {"kind": "always"}
EXPLORE = {"kind": "explore"}
WANDER = {"kind": "wander"}


def rule(condition, action):
    return {"condition": condition, "action": action}


def fewer_sticks_than(value):
    return {"kind": "hereBelow", "resource": "stick", "value": value}


PA = program_from_rules([rule(fewer_sticks_than(0), WANDER), rule(ALWAYS, EXPLORE)])
PA_HOLDS = program_from_rules([rule(fewer_sticks_than(50), WANDER), rule(ALWAYS, EXPLORE)])
PC = program_from_rules([rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER)])

MINUTE = ["advanceMinutes", 1]


def scenario(changes, last_minute):
    """Steps: a new game with PA (or the program changes[0]), a send, then one game minute at a
    time up to last_minute, with `setProgram` before the minute step given in changes."""
    steps = [["newGame"], CREATE, ["setProgram", changes.get(0, PA)], ["send", SENT, T]]
    for minute in range(1, last_minute + 1):
        if minute - 1 in changes and minute - 1 != 0:
            steps.append(["setProgram", changes[minute - 1]])
        steps.append(MINUTE)
    return steps


MAIN = {0: PA, 5: PA_HOLDS, 22: PC}

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


def drive(steps):
    copy = support.built_copy()
    game = copy.file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}, so the simulation "
                             "cannot be driven")
    directory = tempfile.mkdtemp(prefix="loop2-action-in-progress-")
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
    by_minute = {}
    for record in records:
        if record["step"] in ("send", "advanceMinutes"):
            run = record["run"]
            by_minute[run["minute"]] = run
    return by_minute


def entrance_tile(run):
    return next(t for t in run["tiles"]
                if t["col"] == ENTRANCE_COLUMN and t["row"] == ENTRANCE_ROW)


class ActionInProgress(unittest.TestCase):

    def assert_action_until(self, run, kind, end_minute, message):
        current = run["current"]
        activity = current["activity"]
        action = activity.get("action", activity)["kind"]
        self.assertEqual(action, kind, message)
        self.assertEqual(current["endMinute"], end_minute, message)

    def test_actions_last_their_full_duration_through_program_changes(self):
        # invariant: action-in-progress
        runs = drive(scenario(MAIN, 25))
        self.assertEqual(sorted(runs), list(range(0, 26)), "the run did not pass minute by minute")

        self.assert_action_until(runs[0], "explore", 20, "the exploration at minute 0")
        self.assertEqual(runs[0]["character"]["at"], ENTRANCE)
        for minute in range(1, 20):
            run = runs[minute]
            self.assert_action_until(run, "explore", 20,
                                     f"at minute {minute} the exploration started at minute 0 was "
                                     f"replaced, after the program changed at minute 5")
            self.assertFalse(entrance_tile(run)["revealed"],
                             f"the entrance tile is revealed at minute {minute}, before the "
                             "exploration's 20 minutes")
            self.assertEqual(run["character"]["at"], ENTRANCE,
                             f"the character left the entrance at minute {minute}")

        at_20 = runs[20]
        self.assertTrue(entrance_tile(at_20)["revealed"],
                        "the exploration did not end at minute 20")
        self.assert_action_until(at_20, "wander", 25,
                                 "the activity chosen at minute 20 by the changed program")
        target = at_20["current"]["stepTo"]
        self.assertIsNotNone(target, "the wandering started at minute 20 has no target tile")
        self.assertNotEqual(target, ENTRANCE)
        for minute in range(21, 25):
            run = runs[minute]
            self.assert_action_until(run, "wander", 25,
                                     f"at minute {minute} the step started at minute 20 was replaced, "
                                     "after the program changed at minute 22")
            self.assertEqual(run["character"]["at"], ENTRANCE,
                             f"the character reached its target before minute 25, at {minute}")

        at_25 = runs[25]
        self.assertEqual(at_25["character"]["at"], target,
                         "the character is not on the step's target at minute 25")
        self.assert_action_until(at_25, "explore", 45,
                                 "the activity chosen at minute 25 by the changed program")

    def test_control_the_changed_programs_choose_otherwise(self):
        # invariant: action-in-progress
        holds_from_start = drive(scenario({0: PA_HOLDS}, 0))
        self.assert_action_until(holds_from_start[0], "wander", 5,
                                 "PA_HOLDS at minute 0 (a change taking effect at once would show)")

        kept = drive(scenario({0: PA}, 20))
        self.assert_action_until(kept[20], "wait", 21,
                                 "PA kept through minute 20 (no rule applies on the revealed tile)")

        holds_kept = drive(scenario({0: PA, 5: PA_HOLDS}, 25))
        self.assert_action_until(holds_kept[25], "wander", 30,
                                 "PA_HOLDS kept through minute 25")


if __name__ == "__main__":
    unittest.main()
