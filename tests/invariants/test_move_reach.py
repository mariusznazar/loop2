"""Invariant move-reach: Every move of the character ends with the character on a tile
neighbouring the tile the move started from.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `createCharacter`, `setProgram`,
`send` and `advanceMinutes` one game minute at a time. After every input the script records the
JSON of the map run.
The `newGame` step starts from a game whose Understanding holds everything the built data
modules list, as `KNOWING_GAME_JS` in `program_fixture.py` gives it, so that the rules of the
program stay what the check drives.

Reading of the sentence:
- a move: an activity of the map run with a target tile (`current.stepTo` not null) — wandering
  and going to a resource — and, so that no move escapes, any change of the character's tile
  (`character.at`) from one game minute to the next;
- ends with the character on a tile neighbouring the tile the move started from: at the move's
  end minute the character stands on a tile of the map run whose axial coordinates differ from
  those at its start minute by one of the six offsets written out below; and the character's tile
  changes only at the end minute of a move.

Scenarios on the map Las (`forest`) with the archetype `elementalMage`, 240 game minutes each:
"always → wander" on the seeds of two real times T and T_OTHER, and "always → go to berry",
"always → explore", "always → wander" on the seed of T.

Controls, so the check can fail: each run must hold more than 30 moves, and the runs together
go in at least four of the six directions; and the comparison flags made-up records with a move
ending two tiles away, a move ending on the tile it started from, a move ending off the map, and a
change of the character's tile in the middle of an exploring.

Does NOT cover: maps other than Las; programs other than those above.
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

# The six neighbours of a hexagonal tile in axial coordinates (q, r).
NEIGHBOUR_OFFSETS = ((1, 0), (1, -1), (0, -1), (-1, 0), (-1, 1), (0, 1))

ALWAYS = {"kind": "always"}


def rule(condition, action):
    return {"condition": condition, "action": action}


P_WANDER = program_from_rules([rule(ALWAYS, {"kind": "wander"})])
P_GO = program_from_rules([rule(ALWAYS, {"kind": "walkTo", "resource": "berry"}),
                           rule(ALWAYS, {"kind": "explore"}), rule(ALWAYS, {"kind": "wander"})])
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
    directory = tempfile.mkdtemp(prefix="loop2-move-reach-")
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


def offset(start, end):
    return (end["q"] - start["q"], end["r"] - start["r"])


def violations(runs):
    """(what breaks the sentence, the offsets of the moves checked)."""
    found, offsets = [], []
    move_ends = set()
    for run in runs:
        current, minute = run["current"], run["minute"]
        if current["startMinute"] != minute or current["stepTo"] is None:
            continue
        end = current["endMinute"]
        if end >= len(runs):
            continue  # ends after the scenario
        move_ends.add(end)
        start_at = run["character"]["at"]
        end_at = runs[end]["character"]["at"]
        if not any(t["at"] == end_at for t in runs[end]["tiles"]):
            found.append(f"the move from minute {minute} ends off the map, at {end_at}")
            continue
        step = offset(start_at, end_at)
        offsets.append(step)
        if step not in NEIGHBOUR_OFFSETS:
            found.append(f"the move from minute {minute} goes from {start_at} to {end_at}, "
                         "which is no neighbour")
    for previous, run in zip(runs, runs[1:]):
        if run["character"]["at"] != previous["character"]["at"] and \
                run["minute"] not in move_ends:
            found.append(f"minute {run['minute']}: the character's tile changes outside the end "
                         "of a move")
    return found, offsets


class MoveReach(unittest.TestCase):

    def test_every_move_ends_on_a_neighbour(self):
        # invariant: move-reach
        directions = set()
        for program, real_ms in ((P_WANDER, T), (P_WANDER, T_OTHER), (P_GO, T)):
            with self.subTest(program=json.dumps(program), real_ms=real_ms):
                found, offsets = violations(drive(program, LONG_MINUTES, real_ms))
                self.assertEqual(found, [])
                self.assertGreater(len(offsets), 30, "too few moves to mean much")
                directions |= set(offsets)
        self.assertGreaterEqual(len(directions), 4, f"the moves go in only {sorted(directions)}")

    def test_control_the_comparison_flags_breaks(self):
        # invariant: move-reach
        runs = drive(P_WANDER, 100)
        self.assertEqual(violations(runs)[0], [])
        start = runs[0]
        end = start["current"]["endMinute"]
        start_at = start["character"]["at"]

        def moved_to(at):
            changed = copying.deepcopy(runs)
            for run in changed[end:]:
                run["character"]["at"] = dict(at)
            return changed

        two_away = {"q": start_at["q"] + 2, "r": start_at["r"]}
        self.assertTrue(any(t["at"] == two_away for t in start["tiles"]),
                        "the control's tile two away is not on the map")
        self.assertTrue(violations(moved_to(two_away))[0], "a move of two tiles goes unseen")
        self.assertTrue(violations(moved_to(start_at))[0], "a move ending where it started "
                                                           "goes unseen")
        self.assertTrue(violations(moved_to({"q": 40, "r": 40}))[0],
                        "a move ending off the map goes unseen")
        explore = copying.deepcopy(drive(program_from_rules([rule(ALWAYS, {"kind": "explore"})]), 20))
        explore[10]["character"]["at"] = {"q": 2, "r": 1}
        self.assertTrue(violations(explore)[0], "a change of tile outside a move goes unseen")


if __name__ == "__main__":
    unittest.main()
