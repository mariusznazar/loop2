"""Invariant program-rule-pick: In each free game minute of a map run, the character starts to
carry out the first feasible rule whose condition holds, in the first group whose condition holds
and offers such a rule. Empty and infeasible groups pass on; no qualifying group means waiting.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `createCharacter`, `setProgram`,
`send` and `advanceMinutes` one game minute at a time. After every input the script records the
JSON of the map run and of the program the map run carries out: the copy of the map run
(`heldProgram` in `HELD_PROGRAMS_JS` of `program_fixture.py`, D-164), taken from the player's list
by the send.
The new game of each sent character is one whose Understanding holds everything the built data
modules list, as `KNOWING_GAME_JS` in `program_fixture.py` gives it, so that the rules of the
program stay what the check drives; the scenario of a rule outside the repertoire takes from that
Understanding the actions it names.

Reading of the sentence:
- a free game minute: the minute at which the activity before it ends, and minute 0 of the map
  run; at it the map run's `current` activity starts at that minute;
- starts to carry out a program rule: `current.activity` is `{kind: 'rule', ruleId, action}`
  with that rule's stable identity and copied action, starting at that minute; carries out no
  program rule: it is `{kind: 'wait'}`;
- a condition holds: `always` always holds; "fewer than 0 sticks here" never holds;
- the character can carry out: exploring only on a tile not revealed (exploring-reveal); going to
  a resource only where some revealed tile holds some of it and the character does not stand on
  one that does (walk-feasibility); wandering on any tile of the 4 x 4 map Las, every one of which
  has a neighbour.

Scenarios on the map Las (`forest`) with the archetype `elementalMage`, sent at the real time T
(exploring lasts 20 game minutes and waiting 1, as the data files `actions.js` and `balance.js`
give them, written out below):
- P_NONE_AT_20: rule 1 "fewer than 0 sticks here → explore" (condition fails, action possible),
  rule 2 "always → go to berry" (condition holds; at minute 0 no tile is revealed, at minute 20
  only the entrance is), rule 3 "always → explore": minute 0 starts rule 3, exploring to 20; at
  minutes 20, 21 and 22 no rule has both, so the character carries out none;
- P_NEVER: only rule 1 above: no rule at any minute 0 to 30;
- order: "always → wander, always → explore" starts rule 1 (wander) at minute 0, "always →
  explore, always → wander" starts rule 1 (explore), and "fewer than 0 sticks here → wander,
  always → explore" starts rule 2 (explore);
- P_LONG, 240 game minutes on two seeds (T and T_OTHER) and two resources (berry, moss): rule 1
  "fewer than 0 sticks here → wander", rule 2 "always → go to the resource", rule 3 "always →
  explore", rule 4 "always → wander"; at every free minute the rule started must be 2 where going
  is possible, else 3 where the tile is not revealed, else 4; every minute at which the activity
  before ends must be a free minute with an activity starting at it.

Controls, so the check can fail: P_LONG's runs must start each of rules 2, 3 and 4 at some free
minute, so a pick that ignored the order or what can be carried out would show; and the comparison
of P_LONG flags made-up records in which the rule started at a free minute is another one, a
matching identity carries the wrong action, an activity starts in the middle of another, or a
free minute starts nothing.

Rule outside the repertoire: in a game whose Understanding lacks the action "explore", the program
"always -> explore, always -> wander" starts rule 2 (wander) at minute 0, because the action of
rule 1 is not one the character can carry out; the same program in a game that knows the action
starts rule 1 (the control, so the check can fail: a pick that ignored the repertoire would start
rule 1 in both).

Condition and group outside the repertoire, with STOCK = "fewer than 5 sticks in the backpack"
(`itemBelow`), which holds at minute 0, since a map run starts with a new backpack: in a game whose
Understanding lacks the item "stick", the program "STOCK -> wander, always -> explore" starts rule 2
(explore), because the target of rule 1's condition is not in the repertoire; in a game whose
Understanding lacks the condition "itemBelow", a program whose first group stands under STOCK and
holds "always -> wander", followed by a group under "always" holding "always -> explore", starts the
explore rule of the second group, because the first group's condition is not in the repertoire. In
both, the program the map run carries out after the send, its copy, is the program set. Controls: in the game that
knows everything, the same programs start the wander rule, so STOCK holds and a pick that ignored
the repertoire would start it in both.

The grouped scenario skips a false outer condition, an empty group and an infeasible group,
then skips a false rule and chooses rule id 74 before a later feasible rule and group. Stable
identities deliberately differ from positions. The original long scenarios use one always group.

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
from program_fixture import HELD_PROGRAMS_JS, KNOWING_GAME_JS, program_from_rules

GAME_MODULE = "dist/public/sim/game.js"
# The map sent to, as the data files name it (D-18), and the character sent: the first one a
# new game creates, which takes the id 1.
SENT = {"mapId": "forest", "characterId": 1}
CREATE = ["createCharacter", "Ala"]
T = 1760000000000
T_OTHER = 1760000123456

EXPLORE_MINUTES = 20  # actions.js: explore
WAIT_MINUTES = 1      # balance.js: waitMinutes

ALWAYS = {"kind": "always"}
NEVER = {"kind": "hereBelow", "resource": "stick", "value": 0}
STOCK = {"kind": "itemBelow", "item": "stick", "value": 5}
EXPLORE = {"kind": "explore"}
WANDER = {"kind": "wander"}


def walk_to(resource):
    return {"kind": "walkTo", "resource": resource}


def rule(condition, action):
    return {"condition": condition, "action": action}


P_NONE_AT_20 = program_from_rules([
    rule(NEVER, EXPLORE), rule(ALWAYS, walk_to("berry")), rule(ALWAYS, EXPLORE),
])
P_NEVER = program_from_rules([rule(NEVER, EXPLORE)])
P_WANDER_FIRST = program_from_rules([rule(ALWAYS, WANDER), rule(ALWAYS, EXPLORE)])
P_EXPLORE_FIRST = program_from_rules([rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER)])
P_FIRST_FAILS = program_from_rules([rule(NEVER, WANDER), rule(ALWAYS, EXPLORE)])


def p_long(resource):
    return program_from_rules([
        rule(NEVER, WANDER), rule(ALWAYS, walk_to(resource)),
        rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER),
    ])


LONG_MINUTES = 240

EXPLORING_FROM_0_BY_3 = {"activity": {"kind": "rule", "ruleId": 3, "action": EXPLORE},
                         "startMinute": 0, "endMinute": EXPLORE_MINUTES, "stepTo": None}


def waiting(minute):
    return {"activity": {"kind": "wait"}, "startMinute": minute,
            "endMinute": minute + WAIT_MINUTES, "stepTo": None}


DRIVER = KNOWING_GAME_JS + HELD_PROGRAMS_JS + r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, stepsPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));
let state;
const runs = [];
for (const [name, ...args] of steps) {
  if (name === 'newGame') {
    state = await newKnowingGame(game, gamePath);
    const lacking = args[0] ?? {};
    const keep = (list, name) => list.filter((id) => !(lacking[name] ?? []).includes(id));
    state = { ...state, understanding: {
      ...state.understanding,
      actions: keep(state.understanding.actions, 'actions'),
      conditions: keep(state.understanding.conditions, 'conditions'),
      items: keep(state.understanding.items, 'items'),
      creatures: keep(state.understanding.creatures, 'creatures') } };
  } else {
    state = game[name](state, ...args).state;
  }
  runs.push({ step: name, run: JSON.parse(JSON.stringify(state.run)),
              program: JSON.parse(JSON.stringify(heldProgram(state))) });
}
writeFileSync(outPath, JSON.stringify(runs));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def records(program, minutes, real_ms=T, lacking=None):
    """The map run and the program after the send and after each of `minutes` game minutes, by
    minute. The game starts knowing everything the data lists except what `lacking` names, a
    dict of lists under "actions", "conditions" and "items"."""
    steps = ([["newGame", lacking or {}], CREATE, ["setProgram", program],
              ["send", SENT, real_ms]] + [["advanceMinutes", 1]] * minutes)
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
            recorded = json.load(handle)
    finally:
        shutil.rmtree(directory, ignore_errors=True)
    sent = [r for r in recorded if r["step"] in ("send", "advanceMinutes")]
    if [r["run"]["minute"] for r in sent] != list(range(minutes + 1)):
        raise AssertionError("the map run did not pass one game minute per input")
    return sent


def drive(program, minutes, real_ms=T, lacking=None):
    """The map run after the send and after each of `minutes` game minutes, by minute."""
    return [r["run"] for r in records(program, minutes, real_ms, lacking)]


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
        expected = 2 if can_go(run, resource) else 3 if not here["revealed"] else 4
        activity = current["activity"]
        expected_action = walk_to(resource) if expected == 2 else EXPLORE if expected == 3 else WANDER
        if (activity.get("kind") != "rule" or activity.get("ruleId") != expected
                or activity.get("action") != expected_action):
            found.append(f"minute {minute}: expected rule {expected}, started "
                         f"{json.dumps(activity)}")
    return found


class ProgramRulePick(unittest.TestCase):

    def test_groups_skip_false_empty_and_infeasible_before_first_feasible_rule(self):
        # invariant: program-rule-pick
        program = {
            "tripPlan": {"take": [], "bring": []},
            "nextGroupId": 6, "nextRuleId": 90,
            "groups": [
                {"id": 1, "name": "False", "condition": NEVER,
                 "rules": [{"id": 41, **rule(ALWAYS, WANDER)}]},
                {"id": 2, "name": "Empty", "condition": ALWAYS, "rules": []},
                {"id": 3, "name": "Infeasible", "condition": ALWAYS,
                 "rules": [{"id": 52, **rule(ALWAYS, walk_to("berry"))}]},
                {"id": 4, "name": "First", "condition": ALWAYS,
                 "rules": [{"id": 63, **rule(NEVER, WANDER)},
                           {"id": 74, **rule(ALWAYS, EXPLORE)},
                           {"id": 85, **rule(ALWAYS, WANDER)}]},
                {"id": 5, "name": "Later", "condition": ALWAYS,
                 "rules": [{"id": 89, **rule(ALWAYS, WANDER)}]},
            ],
        }
        activity = drive(program, 0)[0]["current"]["activity"]
        self.assertEqual(activity, {"kind": "rule", "ruleId": 74, "action": EXPLORE})

    def test_no_rule_when_none_holds_and_can_be_carried_out(self):
        # invariant: program-rule-pick
        runs = drive(P_NONE_AT_20, 22)
        self.assertEqual(runs[0]["current"], EXPLORING_FROM_0_BY_3,
                         "minute 0: rules 1 and 2 lack one of the two, rule 3 has both")
        for minute in (20, 21, 22):
            self.assertEqual(runs[minute]["current"], waiting(minute),
                             f"minute {minute}: no rule has both, yet one was started")
        never = drive(P_NEVER, 30)
        for minute in range(31):
            self.assertEqual(never[minute]["current"], waiting(minute),
                             f"minute {minute}: the only rule's condition fails")

    def test_the_first_rule_with_both_is_started(self):
        # invariant: program-rule-pick
        first = drive(P_WANDER_FIRST, 0)[0]["current"]["activity"]
        self.assertEqual(first, {"kind": "rule", "ruleId": 1, "action": WANDER})
        first = drive(P_EXPLORE_FIRST, 0)[0]["current"]["activity"]
        self.assertEqual(first, {"kind": "rule", "ruleId": 1, "action": EXPLORE})
        first = drive(P_FIRST_FAILS, 0)[0]["current"]["activity"]
        self.assertEqual(first, {"kind": "rule", "ruleId": 2, "action": EXPLORE})

    def test_a_rule_outside_the_repertoire_is_passed_over(self):
        # invariant: program-rule-pick
        known = drive(P_EXPLORE_FIRST, 0)[0]["current"]["activity"]
        self.assertEqual(known, {"kind": "rule", "ruleId": 1, "action": EXPLORE},
                         "control: with the action known, rule 1 is started")
        lacking = drive(P_EXPLORE_FIRST, 0,
                        lacking={"actions": ["explore"]})[0]["current"]["activity"]
        self.assertEqual(lacking, {"kind": "rule", "ruleId": 2, "action": WANDER},
                         "the action of rule 1 is outside the repertoire, so rule 2 is started")

    def test_a_rule_whose_condition_names_a_target_outside_the_repertoire_is_passed_over(self):
        # invariant: program-rule-pick
        program = program_from_rules([rule(STOCK, WANDER), rule(ALWAYS, EXPLORE)])
        known = records(program, 0)[0]
        self.assertEqual(known["run"]["current"]["activity"],
                         {"kind": "rule", "ruleId": 1, "action": WANDER},
                         "control: with the stick known, rule 1's condition holds and it is started")
        lacking = records(program, 0, lacking={"items": ["stick"]})[0]
        self.assertEqual(lacking["run"]["current"]["activity"],
                         {"kind": "rule", "ruleId": 2, "action": EXPLORE},
                         "the stick rule 1's condition names is outside the repertoire, so rule 2 "
                         "is started")
        self.assertEqual(lacking["program"], program, "the passed-over rule left the program")

    def test_a_group_whose_condition_lies_outside_the_repertoire_is_passed_over(self):
        # invariant: program-rule-pick
        program = {
            "tripPlan": {"take": [], "bring": []},
            "nextGroupId": 3, "nextRuleId": 30,
            "groups": [
                {"id": 1, "name": "Stock", "condition": STOCK,
                 "rules": [{"id": 11, **rule(ALWAYS, WANDER)}]},
                {"id": 2, "name": "Rest", "condition": ALWAYS,
                 "rules": [{"id": 22, **rule(ALWAYS, EXPLORE)}]},
            ],
        }
        known = records(program, 0)[0]
        self.assertEqual(known["run"]["current"]["activity"],
                         {"kind": "rule", "ruleId": 11, "action": WANDER},
                         "control: with the condition known, the first group holds and is taken")
        lacking = records(program, 0, lacking={"conditions": ["itemBelow"]})[0]
        self.assertEqual(lacking["run"]["current"]["activity"],
                         {"kind": "rule", "ruleId": 22, "action": EXPLORE},
                         "the first group's condition is outside the repertoire, so the second "
                         "group's rule is started")
        self.assertEqual(lacking["program"], program, "the passed-over group left the program")

    def test_every_free_minute_of_long_runs(self):
        # invariant: program-rule-pick
        for real_ms in (T, T_OTHER):
            for resource in ("berry", "moss"):
                with self.subTest(real_ms=real_ms, resource=resource):
                    runs = drive(p_long(resource), LONG_MINUTES, real_ms)
                    self.assertEqual(long_violations(runs, resource), [])
                    started = {r["current"]["activity"].get("ruleId") for i, r in
                               enumerate(runs) if r["current"]["startMinute"] == r["minute"]}
                    self.assertTrue({2, 3, 4} <= started,
                                    f"the run starts only rules {sorted(started, key=str)}, so "
                                    "a wrong pick among rules 2 to 4 could go unseen")

    def test_control_the_comparison_flags_wrong_picks(self):
        # invariant: program-rule-pick
        runs = drive(p_long("berry"), 200)
        self.assertEqual(long_violations(runs, "berry"), [])
        free = [i for i, r in enumerate(runs) if r["current"]["startMinute"] == r["minute"]]
        other = copying.deepcopy(runs)
        index = free[3]
        activity = other[index]["current"]["activity"]
        activity["ruleId"] = 4 if activity["ruleId"] != 4 else 3
        self.assertTrue(long_violations(other, "berry"), "another rule started goes unseen")
        wrong_action = copying.deepcopy(runs)
        wrong_action[index]["current"]["activity"]["action"] = {"kind": "eat"}
        self.assertTrue(long_violations(wrong_action, "berry"),
                        "a matching identity with the wrong action goes unseen")
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
