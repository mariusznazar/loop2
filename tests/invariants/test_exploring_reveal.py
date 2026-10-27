"""Invariant exploring-reveal: A program rule that explores reveals the tile the character stands
on when the exploring ends, and the character cannot carry it out on a revealed tile.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `createCharacter`, `setProgram`,
`send` and `advanceMinutes` one game minute at a time. After every input the script records the
JSON of the map run.
The `newGame` step starts from a game whose Understanding holds everything the built data
modules list, as `KNOWING_GAME_JS` in `program_fixture.py` gives it, so that the rules of the
program stay what the check drives.

Reading of the sentence:
- a program rule that explores, carried out: the map run's `current` activity is a rule whose
  action is `explore`, from its `startMinute` to its `endMinute`;
- reveals the tile the character stands on when the exploring ends: at the end minute the tile
  under the character is `revealed`, and it was not revealed at the minute before;
- cannot carry it out on a revealed tile: no exploring starts at a minute at which the tile under
  the character is revealed — checked with programs in which exploring is the first rule and its
  condition always holds, so that only this clause keeps it from starting.

Scenarios on the map Las (`forest`) with the archetype `elementalMage`; the entrance of Las is at
column 1, row 1, axial (1, 1), as the data file `maps.js` gives it, and exploring lasts 20 game
minutes, as `actions.js` gives it (both written out below):
- P_ONLY: "always → explore" alone: exploring at the entrance from minute 0 to 20, the entrance
  not revealed at minute 19 and revealed at minute 20, and at minutes 20 to 25 nothing started,
  since the only rule cannot be carried out on the revealed entrance;
- P_ROAM: "always → explore", "always → wander", 240 game minutes on the seeds of two real times
  T and T_OTHER, and P_GO: "always → explore", "always → go to berry", "always → wander", 240
  game minutes: every exploring must reveal the tile under the character at its end, and none may
  start on a revealed tile.

Controls, so the check can fail: the long runs must hold more than 5 explorings and more than 5
free minutes on a revealed tile at which exploring, the first rule, did not start; and the
comparison flags made-up records with an exploring that ends with the tile not revealed, one that
reveals the tile before its end, and one that starts on a revealed tile.

Does NOT cover: exploring by a rule whose condition can fail; maps other than Las.
"""

import copy as copying
import json
import os
import shutil
import tempfile
import unittest

import loop2_invariant_support as support
from program_fixture import KNOWING_GAME_JS, program_from_rules

GAME_MODULE = "dist/public/sim/game.js"
# The map sent to, as the data files name it (D-18), and the character sent: the first one a
# new game creates, which takes the id 1.
SENT = {"mapId": "forest", "characterId": 1}
CREATE = ["createCharacter", "Ala"]
T = 1760000000000
T_OTHER = 1760000123456

ENTRANCE = {"q": 1, "r": 1}  # maps.js: forest entrance, column 1, row 1
EXPLORE_MINUTES = 20         # actions.js: explore

ALWAYS = {"kind": "always"}
EXPLORE = {"kind": "explore"}
WANDER = {"kind": "wander"}


def rule(condition, action):
    return {"condition": condition, "action": action}


P_ONLY = program_from_rules([rule(ALWAYS, EXPLORE)])
P_ROAM = program_from_rules([rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER)])
P_GO = program_from_rules([rule(ALWAYS, EXPLORE), rule(ALWAYS, {"kind": "walkTo", "resource": "berry"}),
                           rule(ALWAYS, WANDER)])
LONG_MINUTES = 240

DRIVER = KNOWING_GAME_JS + r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, stepsPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));
let state;
const runs = [];
for (const [name, ...args] of steps) {
  state = name === 'newGame' ? await newKnowingGame(game, gamePath) : game[name](state, ...args).state;
  runs.push({ step: name, run: JSON.parse(JSON.stringify(state.run)) });
}
writeFileSync(outPath, JSON.stringify(runs));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def drive(program, minutes, real_ms=T):
    """The map run after the send and after each of `minutes` game minutes, by minute."""
    steps = ([["newGame"], CREATE, ["setProgram", program], ["send", SENT, real_ms]]
             + [["advanceMinutes", 1]] * minutes)
    game = support.built_copy().file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}")
    directory = tempfile.mkdtemp(prefix="loop2-exploring-")
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
    runs = [r["run"] for r in records if r["step"] in ("send", "advanceMinutes")]
    if [r["minute"] for r in runs] != list(range(minutes + 1)):
        raise AssertionError("the map run did not pass one game minute per input")
    return runs


def tile_at(run, at):
    return next(t for t in run["tiles"] if t["at"] == at)


def is_exploring(current):
    activity = current["activity"]
    return activity.get("kind") == "rule" and activity.get("action", {}).get("kind") == "explore"


def violations(runs):
    """(what breaks the sentence, number of explorings checked, number of free minutes on a
    revealed tile)."""
    found, explorings, refused = [], 0, 0
    for run in runs:
        current, minute = run["current"], run["minute"]
        if current["startMinute"] != minute:
            continue
        here = tile_at(run, run["character"]["at"])
        if not is_exploring(current):
            refused += here["revealed"]
            continue
        if here["revealed"]:
            found.append(f"minute {minute}: exploring starts on the revealed tile {here['at']}")
            continue
        end = current["endMinute"]
        if end >= len(runs):
            continue  # ends after the scenario
        explorings += 1
        before, at_end = runs[end - 1], runs[end]
        if not tile_at(at_end, at_end["character"]["at"])["revealed"]:
            found.append(f"minute {end}: the exploring from {minute} ends with the tile under "
                         "the character not revealed")
        if tile_at(before, before["character"]["at"])["revealed"]:
            found.append(f"minute {end - 1}: the exploring from {minute} revealed the tile "
                         "before its end")
    return found, explorings, refused


class ExploringReveal(unittest.TestCase):

    def test_exploring_at_the_entrance(self):
        # invariant: exploring-reveal
        runs = drive(P_ONLY, 25)
        self.assertEqual(runs[0]["character"]["at"], ENTRANCE)
        self.assertTrue(is_exploring(runs[0]["current"]))
        self.assertEqual(runs[0]["current"]["startMinute"], 0)
        self.assertEqual(runs[0]["current"]["endMinute"], EXPLORE_MINUTES)
        self.assertFalse(tile_at(runs[19], ENTRANCE)["revealed"],
                         "the entrance is revealed before the exploring ends")
        self.assertTrue(tile_at(runs[20], ENTRANCE)["revealed"],
                        "the exploring ended without revealing the entrance")
        for minute in range(20, 26):
            self.assertEqual(runs[minute]["character"]["at"], ENTRANCE)
            self.assertFalse(is_exploring(runs[minute]["current"]),
                             f"minute {minute}: exploring again on the revealed entrance")
            self.assertEqual(runs[minute]["current"]["activity"], {"kind": "wait"})

    def test_long_runs(self):
        # invariant: exploring-reveal
        for program, real_ms in ((P_ROAM, T), (P_ROAM, T_OTHER), (P_GO, T)):
            with self.subTest(program=json.dumps(program), real_ms=real_ms):
                found, explorings, refused = violations(drive(program, LONG_MINUTES, real_ms))
                self.assertEqual(found, [])
                self.assertGreater(explorings, 5, "too few explorings to mean much")
                self.assertGreater(refused, 5, "too few free minutes on a revealed tile")

    def test_control_the_comparison_flags_breaks(self):
        # invariant: exploring-reveal
        runs = drive(P_ROAM, 120)
        self.assertEqual(violations(runs)[0], [])
        # An exploring that ends without revealing: the tile of minute 20 kept unrevealed.
        unrevealed = copying.deepcopy(runs)
        for run in unrevealed[20:]:
            tile_at(run, ENTRANCE)["revealed"] = False
        self.assertTrue(violations(unrevealed)[0], "an exploring ending unrevealed goes unseen")
        early = copying.deepcopy(runs)
        tile_at(early[19], ENTRANCE)["revealed"] = True
        self.assertTrue(violations(early)[0], "a reveal before the end goes unseen")
        again = copying.deepcopy(runs)
        again[20]["current"] = {"activity": {"kind": "rule", "action": EXPLORE},
                                "startMinute": 20, "endMinute": 40, "stepTo": None}
        again[20]["character"]["at"] = ENTRANCE
        self.assertTrue(violations(again)[0], "exploring on a revealed tile goes unseen")


if __name__ == "__main__":
    unittest.main()
