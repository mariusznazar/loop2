"""Invariant walk-target: A program rule that goes to a resource takes the character one move
toward one of the revealed tiles holding some of that resource that lie nearest in game minutes of
walking.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `setProgram`, `send` and
`advanceMinutes` one game minute at a time. After every input the script records the JSON of the
map run.

Reading of the sentence:
- a program rule that goes to a resource, carried out: the map run's `current` activity is a rule
  whose action is `{kind: 'walkTo', resource}`, starting at its `startMinute`;
- a revealed tile holding some of the resource: a tile with `revealed` true and a stock of that
  resource above 0;
- game minutes of walking from one tile to another: the least sum, over the tiles entered on the
  way from one to its neighbour (axial offsets written out below), of the game minutes of entering
  each (`stepMinutes`); any tile of the map run may be passed through;
- one move toward one of the nearest: the move's target tile (`stepTo`) is a neighbour of the
  character's tile, the character stands on it at the move's end, and entering it plus walking on
  from it to some revealed tile holding the resource that lies nearest takes exactly the game
  minutes of walking from the character's tile to that tile; a going started where no revealed
  tile holds the resource is no move toward one, and one started where the character stands on
  such a tile is none either, since that tile itself lies nearest, at 0 minutes.

Where going to a resource can start at all is walk-feasibility, checked in
`test_walk_feasibility.py`; this check reads only the goings that were started.

Scenarios on the map Las (`forest`) with the archetype `elementalMage`: for each resource R of
stick, berry, moss and fiber, 800 game minutes on the seeds of the real times T, T_OTHER and MORE,
in which the program "always → go to R", "always → explore", "always → wander" alternates every 40
game minutes with "always → explore", "always → wander", so that the character roams away before
it goes again. Every going to the resource the runs start is checked.

Controls, so the check can fail: the runs together must start going to a resource more than 100
times, at more than 5 of which the nearest tiles lie two or more tiles away; and the comparison
flags made-up records with a move away from the nearest tiles, a move toward a tile farther than
another revealed one holding the resource, and a move whose end leaves the character elsewhere
than its target.

Does NOT cover: where going can start (walk-feasibility); conditions that can fail; maps other
than Las.
"""

import copy as copying
import heapq
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
# Further real times of a send, for more layouts in the main scenario.
MORE = (1760000200000, 1760000300000, 1760000400000)
RESOURCES = ("stick", "berry", "moss", "fiber")

# The six neighbours of a hexagonal tile in axial coordinates (q, r).
NEIGHBOUR_OFFSETS = ((1, 0), (1, -1), (0, -1), (-1, 0), (-1, 1), (0, 1))

ALWAYS = {"kind": "always"}


def rule(condition, action):
    return {"condition": condition, "action": action}


def program(resource):
    return {"rules": [rule(ALWAYS, {"kind": "walkTo", "resource": resource}),
                      rule(ALWAYS, {"kind": "explore"}), rule(ALWAYS, {"kind": "wander"})]}


# The program in force between spells of going, so that the character roams away from the
# revealed tiles holding a resource before it goes to them again.
ROAM = {"rules": [rule(ALWAYS, {"kind": "explore"}), rule(ALWAYS, {"kind": "wander"})]}
LONG_MINUTES = 800
SPELL_MINUTES = 40  # the programs alternate: going for 40 game minutes, roaming for 40

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


def drive(prog, minutes, real_ms=T, roam_spells=False):
    """(the map run after the send and after each of `minutes` game minutes, by minute; for each
    minute, whether `prog` was the program in force when it began). With `roam_spells`, `prog`
    and ROAM alternate every SPELL_MINUTES game minutes, starting with ROAM."""
    steps = [["newGame"], ["setProgram", ROAM if roam_spells else prog], ["send", SENT, real_ms]]
    in_force = [not roam_spells]
    for minute in range(1, minutes + 1):
        if roam_spells and minute % SPELL_MINUTES == 0:
            going = (minute // SPELL_MINUTES) % 2 == 1
            steps.append(["setProgram", prog if going else ROAM])
            in_force.append(going)
        else:
            in_force.append(in_force[-1])
        steps.append(["advanceMinutes", 1])
    game = support.built_copy().file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}")
    directory = tempfile.mkdtemp(prefix="loop2-walk-target-")
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
    return runs, in_force


def key(at):
    return (at["q"], at["r"])


def walking_minutes(tiles, start):
    """Game minutes of walking from `start` to every tile: entering a tile costs its stepMinutes."""
    cost_of = {key(t["at"]): t["stepMinutes"] for t in tiles}
    best = {start: 0}
    queue = [(0, start)]
    while queue:
        cost, here = heapq.heappop(queue)
        if cost > best.get(here, float("inf")):
            continue
        for dq, dr in NEIGHBOUR_OFFSETS:
            there = (here[0] + dq, here[1] + dr)
            if there in cost_of and cost + cost_of[there] < best.get(there, float("inf")):
                best[there] = cost + cost_of[there]
                heapq.heappush(queue, (best[there], there))
    return best


def holds_some(tile, resource):
    return tile["revealed"] and tile["stock"].get(resource, 0) > 0


def violations(runs, resource):
    """(what breaks the sentence, counts of what was checked) for every going to `resource` the
    runs start."""
    found = []
    counts = {"went": 0, "far": 0}
    for run in runs:
        current, minute = run["current"], run["minute"]
        if current["startMinute"] != minute:
            continue
        activity = current["activity"]
        going = activity.get("kind") == "rule" and activity.get("action") == {
            "kind": "walkTo", "resource": resource}
        if not going:
            continue
        here = key(run["character"]["at"])
        targets = [key(t["at"]) for t in run["tiles"] if holds_some(t, resource)]
        if not targets:
            found.append(f"minute {minute}: going to {resource} with no revealed tile holding "
                         "some to move toward")
            continue
        if here in targets:
            found.append(f"minute {minute}: going to {resource} while the character stands on "
                         "a nearest tile, so no move goes toward one")
            continue
        counts["went"] += 1
        from_here = walking_minutes(run["tiles"], here)
        nearest = min(from_here[t] for t in targets)
        nearest_tiles = [t for t in targets if from_here[t] == nearest]
        if any(max(abs(t[0] - here[0]), abs(t[1] - here[1]),
                   abs(t[0] + t[1] - here[0] - here[1])) >= 2 for t in nearest_tiles):
            counts["far"] += 1
        step_to = current["stepTo"]
        if step_to is None:
            found.append(f"minute {minute}: going to {resource} is no move")
            continue
        step = key(step_to)
        if (step[0] - here[0], step[1] - here[1]) not in NEIGHBOUR_OFFSETS:
            found.append(f"minute {minute}: the move's target {step} is no neighbour of {here}")
            continue
        entering = next(t["stepMinutes"] for t in run["tiles"] if key(t["at"]) == step)
        from_step = walking_minutes(run["tiles"], step)
        if not any(entering + from_step[t] == nearest for t in nearest_tiles):
            found.append(f"minute {minute}: the move from {here} to {step} is not toward the "
                         f"nearest tiles {nearest_tiles} holding {resource}")
        end = current["endMinute"]
        if end < len(runs) and key(runs[end]["character"]["at"]) != step:
            found.append(f"minute {end}: the move to {step} ends with the character elsewhere")
    return found, counts


class WalkTarget(unittest.TestCase):

    def test_going_to_each_resource(self):
        # invariant: walk-target
        totals = {"went": 0, "far": 0}
        for resource in RESOURCES:
            for real_ms in (T, T_OTHER) + MORE:
                with self.subTest(resource=resource, real_ms=real_ms):
                    runs, _in_force = drive(program(resource), LONG_MINUTES, real_ms,
                                            roam_spells=True)
                    found, counts = violations(runs, resource)
                    self.assertEqual(found, [])
                    for name, value in counts.items():
                        totals[name] += value
        self.assertGreater(totals["went"], 100, f"too few goings to mean much: {totals}")
        self.assertGreater(totals["far"], 5, f"too few goings toward a far tile: {totals}")

    def test_control_the_comparison_flags_breaks(self):
        # invariant: walk-target
        def tile(run, at):
            return next(t for t in run["tiles"] if key(t["at"]) == at)

        def far_pick(runs, resource, picks):
            """A going whose target is no tile holding the resource, with another neighbour of
            the character's tile: (index, that neighbour) or None."""
            for i in picks:
                run = runs[i]
                here = key(run["character"]["at"])
                step = key(run["current"]["stepTo"])
                if holds_some(tile(run, step), resource):
                    continue  # the target is itself a nearest tile
                for dq, dr in NEIGHBOUR_OFFSETS:
                    there = (here[0] + dq, here[1] + dr)
                    if there != step and any(key(t["at"]) == there for t in run["tiles"]):
                        return i, there
            return None

        chosen = None
        for resource in RESOURCES:
            for real_ms in (T, T_OTHER):
                runs, _in_force = drive(program(resource), LONG_MINUTES, real_ms,
                                        roam_spells=True)
                picks = [i for i, r in enumerate(runs) if r["current"]["startMinute"] == i
                         and r["current"]["activity"].get("action", {}).get("kind") == "walkTo"
                         and r["current"]["endMinute"] < len(runs)]
                farther = far_pick(runs, resource, picks)
                if farther:
                    chosen = (resource, runs, picks, farther)
                    break
            if chosen:
                break
        self.assertIsNotNone(chosen, "no going in the runs heads for a tile two or more away")
        resource, runs, picks, farther = chosen
        self.assertEqual(violations(runs, resource)[0], [])

        # A move away: a neighbour whose walking does not lead to the nearest tiles.
        index = picks[0]
        run = runs[index]
        here = key(run["character"]["at"])
        targets = [key(t["at"]) for t in run["tiles"] if holds_some(t, resource)]
        nearest = min(walking_minutes(run["tiles"], here)[t] for t in targets)
        away = None
        for dq, dr in NEIGHBOUR_OFFSETS:
            there = (here[0] + dq, here[1] + dr)
            if any(key(t["at"]) == there for t in run["tiles"]):
                after = walking_minutes(run["tiles"], there)
                if all(tile(run, there)["stepMinutes"] + after[t] > nearest for t in targets):
                    away = there
                    break
        self.assertIsNotNone(away, "no neighbour leads away from the nearest tiles")
        moved = copying.deepcopy(runs)
        moved[index]["current"]["stepTo"] = {"q": away[0], "r": away[1]}
        self.assertTrue(violations(moved, resource)[0], "a move away goes unseen")

        # A move toward a farther tile: another neighbour made a revealed tile with the resource.
        nearer = copying.deepcopy(runs)
        planted = tile(nearer[farther[0]], farther[1])
        planted["revealed"] = True
        planted["stock"][resource] = 5
        self.assertTrue(violations(nearer, resource)[0],
                        "a move toward a farther tile goes unseen")

        # A move whose end leaves the character elsewhere.
        elsewhere = copying.deepcopy(runs)
        end = elsewhere[index]["current"]["endMinute"]
        elsewhere[end]["character"]["at"] = dict(elsewhere[index]["character"]["at"])
        self.assertTrue(violations(elsewhere, resource)[0],
                        "a move ending off its target goes unseen")


if __name__ == "__main__":
    unittest.main()
