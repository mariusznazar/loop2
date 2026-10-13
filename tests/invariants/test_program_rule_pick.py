"""Invariant program-rule-pick/1: In each free game minute of a map run, the character starts to
carry out the first program rule whose condition holds and which the character can carry out
then, and carries out no program rule in a free game minute in which none has both.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `setProgram`, `send` and
`advanceMinutes` one game minute at a time. After every input the script records the JSON of the
map run.

Reading of the sentence:
- a free game minute: the minute at which the activity before it ends, and minute 0 of the map
  run; at it the map run's `current` activity starts at that minute;
- starts to carry out a program rule: `current.activity` is `{kind: 'rule', ruleIndex, action}`
  with that rule's index and action, starting at that minute; carries out no program rule: it is
  `{kind: 'wait'}`;
- a condition holds: `always` always holds; "fewer than 0 sticks here" never holds;
- the character can carry out: exploring only on a tile not revealed (exploring-reveal/1); going to
  a resource only where some revealed tile holds some of it and the character does not stand on
  one that does (walk-target/1); wandering on any tile of the 4 x 4 map Las, every one of which
  has a neighbour.

Scenarios on the map Las (`forest`) with the archetype `elementalMage`, sent at the real time T
(exploring lasts 20 game minutes and waiting 1, as the data files `actions.js` and `balance.js`
give them, written out below):
- P_NONE_AT_20: rule 0 "fewer than 0 sticks here → explore" (condition fails, action possible),
  rule 1 "always → go to berry" (condition holds; at minute 0 no tile is revealed, at minute 20
  only the entrance is), rule 2 "always → explore": minute 0 starts rule 2, exploring to 20; at
  minutes 20, 21 and 22 no rule has both, so the character carries out none;
- P_NEVER: only rule 0 above: no rule at any minute 0 to 30;
- order: "always → wander, always → explore" starts rule 0 (wander) at minute 0, "always →
  explore, always → wander" starts rule 0 (explore), and "fewer than 0 sticks here → wander,
  always → explore" starts rule 1 (explore);
- P_LONG, 600 game minutes on two seeds (T and T_OTHER) and two resources (berry, moss): rule 0
  "fewer than 0 sticks here → wander", rule 1 "always → go to the resource", rule 2 "always →
  explore", rule 3 "always → wander"; at every free minute the rule started must be 1 where going
  is possible, else 2 where the tile is not revealed, else 3; every minute at which the activity
  before ends must be a free minute with an activity starting at it.

Controls, so the check can fail: P_LONG's runs must start each of rules 1, 2 and 3 at some free
minute, so a pick that ignored the order or what can be carried out would show; and the comparison
of P_LONG flags made-up records in which the rule started at a free minute is another one, an
activity starts in the middle of another, or a free minute starts nothing.

Does NOT cover: conditions "fewer than N here" with N above 0; maps, archetypes and programs other
than those above; real time as the way minutes pass.
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

EXPLORE_MINUTES = 20  # actions.js: explore
WAIT_MINUTES = 1      # balance.js: waitMinutes

ALWAYS = {"kind": "always"}
NEVER = {"kind": "hereBelow", "resource": "stick", "value": 0}
EXPLORE = {"kind": "explore"}
WANDER = {"kind": "wander"}


def walk_to(resource):
    return {"kind": "walkTo", "resource": resource}


def rule(condition, action):
    return {"condition": condition, "action": action}


P_NONE_AT_20 = {"rules": [rule(NEVER, EXPLORE), rule(ALWAYS, walk_to("berry")),
                          rule(ALWAYS, EXPLORE)]}
P_NEVER = {"rules": [rule(NEVER, EXPLORE)]}
P_WANDER_FIRST = {"rules": [rule(ALWAYS, WANDER), rule(ALWAYS, EXPLORE)]}
P_EXPLORE_FIRST = {"rules": [rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER)]}
P_FIRST_FAILS = {"rules": [rule(NEVER, WANDER), rule(ALWAYS, EXPLORE)]}


def p_long(resource):
    return {"rules": [rule(NEVER, WANDER), rule(ALWAYS, walk_to(resource)),
                      rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER)]}


LONG_MINUTES = 600

EXPLORING_FROM_0_BY_2 = {"activity": {"kind": "rule", "ruleIndex": 2, "action": EXPLORE},
                         "startMinute": 0, "endMinute": EXPLORE_MINUTES, "stepTo": None}


def waiting(minute):
    return {"activity": {"kind": "wait"}, "startMinute": minute,
            "endMinute": minute + WAIT_MINUTES, "stepTo": None}


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


def drive(program, minutes, real_ms=T):
    """The map run after the send and after each of `minutes` game minutes, by minute."""
    steps = ([["newGame"], ["setProgram", program], ["send", SENT, real_ms]]
             + [["advanceMinutes", 1]] * minutes)
    game = support.built_copy().file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}")
    directory = tempfile.mkdtemp(prefix="loop2-rule-pick-")
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


def holds_some(tile, resource):
    return tile["revealed"] and tile["stock"].get(resource, 0) > 0


def can_go(run, resource):
    here = tile_at(run, run["character"]["at"])
    return any(holds_some(t, resource) for t in run["tiles"]) and not holds_some(here, resource)


def long_violations(runs, resource):
    """What breaks the expected picks of p_long(resource) in the runs, minute by minute."""
    found = []
    for index, run in enumerate(runs):
        current = run["current"]
        minute = run["minute"]
        free = index == 0 or runs[index - 1]["current"]["endMinute"] == minute
        if not free:
            if current != runs[index - 1]["current"]:
                found.append(f"minute {minute}: an activity starts while another goes on")
            continue
        if current["startMinute"] != minute:
            found.append(f"minute {minute}: a free minute starts nothing")
            continue
        here = tile_at(run, run["character"]["at"])
        expected = 1 if can_go(run, resource) else 2 if not here["revealed"] else 3
        activity = current["activity"]
        if activity.get("kind") != "rule" or activity.get("ruleIndex") != expected:
            found.append(f"minute {minute}: expected rule {expected}, started "
                         f"{json.dumps(activity)}")
    return found


class ProgramRulePick(unittest.TestCase):

    def test_no_rule_when_none_holds_and_can_be_carried_out(self):
        # invariant: program-rule-pick/1
        runs = drive(P_NONE_AT_20, 22)
        self.assertEqual(runs[0]["current"], EXPLORING_FROM_0_BY_2,
                         "minute 0: rules 0 and 1 lack one of the two, rule 2 has both")
        for minute in (20, 21, 22):
            self.assertEqual(runs[minute]["current"], waiting(minute),
                             f"minute {minute}: no rule has both, yet one was started")
        never = drive(P_NEVER, 30)
        for minute in range(31):
            self.assertEqual(never[minute]["current"], waiting(minute),
                             f"minute {minute}: the only rule's condition fails")

    def test_the_first_rule_with_both_is_started(self):
        # invariant: program-rule-pick/1
        first = drive(P_WANDER_FIRST, 0)[0]["current"]["activity"]
        self.assertEqual(first, {"kind": "rule", "ruleIndex": 0, "action": WANDER})
        first = drive(P_EXPLORE_FIRST, 0)[0]["current"]["activity"]
        self.assertEqual(first, {"kind": "rule", "ruleIndex": 0, "action": EXPLORE})
        first = drive(P_FIRST_FAILS, 0)[0]["current"]["activity"]
        self.assertEqual(first, {"kind": "rule", "ruleIndex": 1, "action": EXPLORE})

    def test_every_free_minute_of_long_runs(self):
        # invariant: program-rule-pick/1
        for real_ms in (T, T_OTHER):
            for resource in ("berry", "moss"):
                with self.subTest(real_ms=real_ms, resource=resource):
                    runs = drive(p_long(resource), LONG_MINUTES, real_ms)
                    self.assertEqual(long_violations(runs, resource), [])
                    started = {r["current"]["activity"].get("ruleIndex") for i, r in
                               enumerate(runs) if r["current"]["startMinute"] == r["minute"]}
                    self.assertTrue({1, 2, 3} <= started,
                                    f"the run starts only rules {sorted(started, key=str)}, so "
                                    "a wrong pick among rules 1 to 3 could go unseen")

    def test_control_the_comparison_flags_wrong_picks(self):
        # invariant: program-rule-pick/1
        runs = drive(p_long("berry"), 200)
        self.assertEqual(long_violations(runs, "berry"), [])
        free = [i for i, r in enumerate(runs) if r["current"]["startMinute"] == r["minute"]]
        other = copying.deepcopy(runs)
        index = free[3]
        activity = other[index]["current"]["activity"]
        activity["ruleIndex"] = 3 if activity["ruleIndex"] != 3 else 2
        self.assertTrue(long_violations(other, "berry"), "another rule started goes unseen")
        middle = copying.deepcopy(runs)
        inside = next(i for i in range(1, len(runs)) if i not in free)
        middle[inside]["current"] = dict(middle[inside]["current"], startMinute=inside)
        self.assertTrue(long_violations(middle, "berry"),
                        "an activity starting in the middle of another goes unseen")
        nothing = copying.deepcopy(runs)
        nothing[free[2]]["current"] = nothing[free[2] - 1]["current"]
        self.assertTrue(long_violations(nothing, "berry"), "a free minute starting nothing "
                                                           "goes unseen")


if __name__ == "__main__":
    unittest.main()
