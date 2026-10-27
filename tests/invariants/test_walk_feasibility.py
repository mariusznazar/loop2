"""Invariant walk-feasibility: The character can carry out a program rule that goes to a resource
where some revealed tile holds some of that resource and the character does not stand on one that
does, and nowhere else.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `createCharacter`, `setProgram`,
`send` and `advanceMinutes` one game minute at a time. After every input the script records the
JSON of the map run.
The new game of each sent character is one whose Understanding holds everything the built data
modules list, as `KNOWING_GAME_JS` in `program_fixture.py` gives it, so that the rules of the
program stay what the check drives.

Reading of the sentence:
- can carry out: at a free game minute (one at which the map run starts or at which the
  character's action or waiting ends; there the map run's `current` activity starts at that
  minute), a program rule whose condition holds and whose action is `{kind: 'walkTo', resource}`
  is started there. Both directions bind:
  - where some revealed tile holds some of the resource and the character does not stand on one
    that does, and the rule is the first whose condition holds, `current.activity` is that rule
    (`{kind: 'rule', action}`), checked by its explicit action;
  - where no revealed tile holds some of the resource, or the character stands on one that does,
    the rule is passed over: the activity started is not that rule but a later one (each program
    below ends with "always → wander", which can always start on the 4 x 4 map Las);
- a revealed tile holding some of the resource: a tile with `revealed` true and a stock of that
  resource above 0; a tile whose stock of it is 0 does not hold some;
- a condition holds: `always` always holds; "fewer than 0 sticks here" never holds.

Scenarios on the map Las (`forest`) with the archetype `elementalMage`, for each resource R of
stick, berry, moss and fiber, on the seeds of the real times T, T_OTHER and MORE:
- GOING_FIRST(R): "always → go to R", "always → explore", "always → wander"; and GOING_SECOND(R):
  "fewer than 0 sticks here → explore", "always → go to R", "always → wander", where the going
  rule is the first whose condition holds though not the first rule. Each alternates every 40 game
  minutes with ROAM ("always → explore", "always → wander"), so that the character roams away
  before it goes again; 240 game minutes. Free minutes under ROAM are checked too: there no rule
  goes to R, so none may be started;
- a stock of 0, which the programs above, gathering nothing, never reach: in the runs of
  GOING_FIRST(R) above, on the first of the seeds T, T_OTHER and MORE that holds each case, the
  state of the game minute before a free minute is changed before that minute passes. The free
  minute is no whole multiple of R's renewal time on Las (RENEW_MINUTES below), since in such a
  minute the tiles renew their stock before the program picks (D-67, D-71) and a stock written
  over to 0 would hold a piece again when the going is picked or passed over:
  - ZERO_ALL: the stock of R on every tile that holds R is set to 0, at a minute before a going
    was started — so no tile holds some, and the going must be passed over;
  - ZERO_HERE: the stock of R on the tile the character stands on at the free minute is set to 0,
    at a minute before a going was passed over because the character stood on such a tile while
    another revealed tile held some — so the going must be started.
  The changed state is the state the simulation returned, with only those stocks written over; it
  is passed on to `advanceMinutes`.

Controls, so the check can fail: the runs together must start going to a resource more than 100
times and pass it over more than 5 times where no revealed tile holds the resource and more than
100 times where the character stands on one; each ZERO case must occur for every resource; and the
comparison flags made-up records with a going started where no revealed tile holds the resource,
where the character stands on one, where every such tile holds 0, and with no going started where
it was possible and first.

Does NOT cover: which tile a going heads for (walk-target); conditions other than the two
above; maps other than Las.
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
MORE = (1760000200000, 1760000300000, 1760000400000, 1760000500000, 1760000600000,
        1760000700000, 1760000800000, 1760000900000, 1760001000000)
RESOURCES = ("stick", "berry", "moss", "fiber")
# Game minutes in which a tile of Las below its stock gains a piece of each resource, as the map's
# data gives them: renewal falls in every game minute that is a whole multiple of these.
RENEW_MINUTES = {"stick": 30, "berry": 40, "moss": 60, "fiber": 60}

ALWAYS = {"kind": "always"}
NEVER = {"kind": "hereBelow", "resource": "stick", "value": 0}


def rule(condition, action):
    return {"condition": condition, "action": action}


def going_first(resource):
    return program_from_rules([rule(ALWAYS, {"kind": "walkTo", "resource": resource}),
                              rule(ALWAYS, {"kind": "explore"}), rule(ALWAYS, {"kind": "wander"})])


def going_second(resource):
    return program_from_rules([rule(NEVER, {"kind": "explore"}),
                              rule(ALWAYS, {"kind": "walkTo", "resource": resource}),
                              rule(ALWAYS, {"kind": "wander"})])


# (program, whether its fallback may explore an unrevealed tile)
PROGRAMS = ((going_first, True), (going_second, False))

ROAM = program_from_rules([rule(ALWAYS, {"kind": "explore"}), rule(ALWAYS, {"kind": "wander"})])
LONG_MINUTES = 240
SPELL_MINUTES = 40

DRIVER = KNOWING_GAME_JS + r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, stepsPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));
let state;
const runs = [];
for (const [name, ...args] of steps) {
  if (name === 'newGame') state = await newKnowingGame(game, gamePath);
  else if (name === 'setStock') {
    // Write over the stock of the named tiles; everything else stays as the simulation left it.
    const [changes] = args;
    const tiles = state.run.tiles.map(tile => {
      const mine = changes.filter(([col, row]) => col === tile.col && row === tile.row);
      if (mine.length === 0) return tile;
      const stock = { ...tile.stock };
      for (const [, , resource, value] of mine) stock[resource] = value;
      return { ...tile, stock };
    });
    state = { ...state, run: { ...state.run, tiles } };
  } else state = game[name](state, ...args).state;
  runs.push({ step: name, run: JSON.parse(JSON.stringify(state.run)) });
}
writeFileSync(outPath, JSON.stringify(runs));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def steps_for(prog, minutes, real_ms, roam_spells):
    """(steps, for each game minute whether `prog` was in force when it began)."""
    steps = [["newGame"], CREATE, ["setProgram", ROAM if roam_spells else prog],
             ["send", SENT, real_ms]]
    in_force = [not roam_spells]
    for minute in range(1, minutes + 1):
        if roam_spells and minute % SPELL_MINUTES == 0:
            going = (minute // SPELL_MINUTES) % 2 == 1
            steps.append(["setProgram", prog if going else ROAM])
            in_force.append(going)
        else:
            in_force.append(in_force[-1])
        steps.append(["advanceMinutes", 1])
    return steps, in_force


def drive(steps):
    """The map run after the send and after each game minute passed, by minute."""
    game = support.built_copy().file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}")
    directory = tempfile.mkdtemp(prefix="loop2-walk-feasibility-")
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
    if [r["minute"] for r in runs] != list(range(len(runs))):
        raise AssertionError("the map run did not pass one game minute per input")
    return runs


def key(at):
    return (at["q"], at["r"])


def holds_some(tile, resource):
    return tile["revealed"] and tile["stock"].get(resource, 0) > 0


def is_going(activity, resource):
    return activity.get("kind") == "rule" and activity.get("action") == {
        "kind": "walkTo", "resource": resource}


def findings(runs, resource, explore_fallback, in_force=None):
    """(what breaks the sentence, counts of what was checked). `in_force[minute]` says whether the
    going program was in force at that minute (always, without
    it); under any other program no going to `resource` may start. `explore_fallback` says
    whether its exploration rule has an always condition rather than the never condition."""
    found = []
    counts = {"went": 0, "none": 0, "standing": 0, "zero none": 0, "zero here": 0}
    for run in runs:
        current, minute = run["current"], run["minute"]
        if current["startMinute"] != minute:
            continue  # no free game minute
        activity = current["activity"]
        going = is_going(activity, resource)
        if in_force is not None and not in_force[minute]:
            if going:
                found.append(f"minute {minute}: going to {resource} under a program without it")
            continue
        here = key(run["character"]["at"])
        holding = [key(t["at"]) for t in run["tiles"] if holds_some(t, resource)]
        zeros = [t for t in run["tiles"] if t["revealed"] and t["stock"].get(resource) == 0]
        standing = here in holding
        if holding and not standing:
            if not going:
                found.append(f"minute {minute}: going to {resource} was possible and first, and "
                             f"not started: {json.dumps(activity)}")
                continue
            counts["went"] += 1
            if any(key(t["at"]) == here for t in zeros):
                counts["zero here"] += 1
            continue
        why = "the character stands on such a tile" if standing else "no revealed tile holds some"
        if going:
            found.append(f"minute {minute}: going to {resource} started where {why}")
            continue
        can_explore = explore_fallback and not tile_at(run, here)["revealed"]
        fallback = {"kind": "explore" if can_explore else "wander"}
        if activity.get("kind") != "rule" or activity.get("action") != fallback:
            found.append(f"minute {minute}: going to {resource} not passed over where {why}: "
                         f"{json.dumps(activity)}")
            continue
        counts["standing" if standing else "none"] += 1
        if not holding and zeros:
            counts["zero none"] += 1
    return found, counts


def advance_index(steps):
    """{minute: the index of the step that brings the map run to it}; the send brings minute 0."""
    found = {}
    for index, step in enumerate(steps):
        if step[0] == "send":
            found[0] = index
        elif step[0] == "advanceMinutes":
            found[len(found)] = index
    return found


def zero_cases(runs, resource, in_force):
    """{(case, free minute M): the stocks to write over in the state of minute M - 1}, for the
    first minute of each case under the program with the going rule first, M no whole multiple of
    the resource's renewal time:
    - "zero none": a going was started at M; every stock of the resource is set to 0;
    - "zero here": the going was passed over at M because the character stood on a tile holding
      some while another revealed tile held some; that tile's stock is set to 0."""
    found = {}
    for run in runs[1:]:
        minute = run["minute"]
        if run["current"]["startMinute"] != minute or not in_force[minute]:
            continue
        if minute % RENEW_MINUTES[resource] == 0:
            continue  # renewal would give the zeroed tiles a piece back before the pick
        before = runs[minute - 1]
        here = key(run["character"]["at"])
        holding = [key(t["at"]) for t in run["tiles"] if holds_some(t, resource)]
        if is_going(run["current"]["activity"], resource):
            if not any(name == "zero none" for name, _ in found):
                found[("zero none", minute)] = [[t["col"], t["row"], resource, 0]
                                                for t in before["tiles"] if resource in t["stock"]]
        elif here in holding and len(holding) > 1:
            if not any(name == "zero here" for name, _ in found):
                tile = tile_at(run, here)
                found[("zero here", minute)] = [[tile["col"], tile["row"], resource, 0]]
    return found


def tile_at(run, at):
    return next(t for t in run["tiles"] if key(t["at"]) == at)


class WalkFeasibility(unittest.TestCase):

    def test_going_is_started_where_possible_and_nowhere_else(self):
        # invariant: walk-feasibility
        totals = {"went": 0, "none": 0, "standing": 0}
        for resource in RESOURCES:
            for make, explore_fallback in PROGRAMS:
                for real_ms in (T, T_OTHER) + MORE:
                    with self.subTest(resource=resource, program=make.__name__, real_ms=real_ms):
                        steps, in_force = steps_for(make(resource), LONG_MINUTES, real_ms, True)
                        found, counts = findings(drive(steps), resource, explore_fallback, in_force)
                        self.assertEqual(found, [])
                        for name in totals:
                            totals[name] += counts[name]
        self.assertGreater(totals["went"], 100, f"too few goings to mean much: {totals}")
        self.assertGreater(totals["none"], 5, f"too few pass-overs for no tile: {totals}")
        self.assertGreater(totals["standing"], 100, f"too few pass-overs while standing on such a "
                                                    f"tile: {totals}")

    def test_a_stock_of_zero_is_no_stock(self):
        # invariant: walk-feasibility
        for resource in RESOURCES:
            with self.subTest(resource=resource):
                cases = {}
                for real_ms in (T, T_OTHER) + MORE:
                    steps, in_force = steps_for(going_first(resource), LONG_MINUTES, real_ms, True)
                    runs = drive(steps)
                    self.assertEqual(findings(runs, resource, True, in_force)[0], [])
                    for minute, change in zero_cases(runs, resource, in_force).items():
                        cases.setdefault(minute[0], (steps, minute[1], change))
                    if len(cases) == 2:
                        break
                self.assertEqual(sorted(cases), ["zero here", "zero none"],
                                 f"the runs on {resource} hold no minute for each ZERO case")
                for name, (steps, minute, change) in sorted(cases.items()):
                    changed = drive(steps[:advance_index(steps)[minute]]
                                    + [["setStock", change], ["advanceMinutes", 1]])
                    found, counts = findings(changed[-1:], resource, True)
                    self.assertEqual(found, [], f"{name} at minute {minute}")
                    self.assertEqual(counts[name], 1,
                                     f"{name} did not come about at minute {minute}: {counts}")

    def test_control_the_comparison_flags_breaks(self):
        # invariant: walk-feasibility
        resource = "berry"
        steps, in_force = steps_for(going_first(resource), LONG_MINUTES, T, False)
        runs = drive(steps)
        self.assertEqual(findings(runs, resource, True, in_force)[0], [])
        free = [i for i, r in enumerate(runs) if r["current"]["startMinute"] == i and in_force[i]]
        went = next(i for i in free if is_going(runs[i]["current"]["activity"], resource))
        passed = [i for i in free if not is_going(runs[i]["current"]["activity"], resource)]
        none = next(i for i in passed
                    if not any(holds_some(t, resource) for t in runs[i]["tiles"]))
        stood = next(i for i in passed if any(holds_some(t, resource) for t in runs[i]["tiles"]))
        going = {"kind": "rule",
                 "action": {"kind": "walkTo", "resource": resource}}

        not_started = copying.deepcopy(runs)
        not_started[went]["current"]["activity"] = {"kind": "rule",
                                                    "action": {"kind": "wander"}}
        self.assertTrue(findings(not_started, resource, True, in_force)[0],
                        "a going not started where possible goes unseen")
        wrong_resource = copying.deepcopy(runs)
        wrong_resource[went]["current"]["activity"] = {
            "kind": "rule", "action": {"kind": "walkTo", "resource": "moss"}}
        self.assertTrue(findings(wrong_resource, resource, True, in_force)[0],
                        "going to the wrong resource goes unseen")
        for label, index in (("where no tile holds some", none), ("while standing", stood)):
            started = copying.deepcopy(runs)
            started[index]["current"]["activity"] = copying.deepcopy(going)
            self.assertTrue(findings(started, resource, True, in_force)[0],
                            f"a going started {label} goes unseen")
        zeroed = copying.deepcopy(runs)
        for t in zeroed[went]["tiles"]:
            if resource in t["stock"]:
                t["stock"][resource] = 0
        self.assertTrue(findings(zeroed, resource, True, in_force)[0],
                        "a going started where every such tile holds 0 goes unseen")
        wrong_fallback = copying.deepcopy(runs)
        wrong_fallback[stood]["current"]["activity"] = {
            "kind": "rule", "action": {"kind": "explore"}}
        self.assertTrue(findings(wrong_fallback, resource, True, in_force)[0],
                        "exploring a revealed tile instead of the feasible fallback goes unseen")
        # GOING_SECOND's exploration condition never holds, even on an unrevealed tile.
        second = copying.deepcopy(runs[none])
        self.assertFalse(tile_at(second, key(second["character"]["at"]))["revealed"],
                         "precondition: the fallback example is on an unrevealed tile")
        second["current"]["activity"] = {"kind": "rule", "action": {"kind": "wander"}}
        self.assertEqual(findings([second], resource, False)[0], [])
        second["current"]["activity"] = {"kind": "rule", "action": {"kind": "explore"}}
        self.assertTrue(findings([second], resource, False)[0],
                        "exploration with a false condition goes unseen")
        waited = copying.deepcopy(runs)
        waited[none]["current"]["activity"] = {"kind": "wait"}
        self.assertTrue(findings(waited, resource, True, in_force)[0],
                        "a going not passed over goes unseen")


if __name__ == "__main__":
    unittest.main()
