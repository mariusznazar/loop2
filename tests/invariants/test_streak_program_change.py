"""Invariant streak-program-change: A change of the program rules or rule groups of the copy a map
run carries out, and every switch of the character to another program during the map run, to one
holding the same rules included, sets the streak of that map run to zero, on every map.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions by a Node script this check writes to a
temporary directory: `newGame`, `createCharacter`, `setProgram`, `send`, `advanceMinutes` and
`setPaused` in `dist/public/sim/game.js`, and `createProgram`, `editProgram` and `switchProgram` in
`dist/public/sim/programs.js`, each returning `{state, events}`. After every step the script
records the streak, the pause and the death of the map run. The new game starts from one whose
Understanding holds everything the built data modules list, as `KNOWING_GAME_JS` in
`program_fixture.py` gives it, so that the rules of the program stay what the check drives.

Reading of the sentence:
- a change of the program rules or rule groups: an edit that hands `setProgram` a program
  differing from the copy the map run carries out (task `rozwiazanie-lasu`, question 9 and row 6
  of its settlements). Here: a rule added, a rule deleted, two rules swapped (also two of the same
  content, which are two rules told apart by identity), the condition of a rule changed, the
  action of a rule changed, the name of a group changed, the condition of a group changed. An
  edit that hands back the same program, such as "↑" on the first rule, changes nothing and leaves
  the streak;
- of the copy a map run carries out: the map run holds its own copy of the program it was sent
  with, and within a map run `setProgram` edits that copy (task `programy-gracza`, To do 7). The
  rule the game writes at the first chill does not go through `setProgram` and is not driven here;
- every switch of the character to another program during the map run: `switchProgram` to a program
  of the list other than the one the copy belongs to, in a map run that runs and in one that is
  paused. Here: program 2, which holds other rules than the copy, and program 3, which holds the
  very rules of the copy; both set the streak to zero (To do 12; the sentence says "to one holding
  the same rules included");
- sets the streak to zero: read at once after the step, from a streak of 10 on the map Las
  (`forest`), reached by 10 game minutes in which the character explores and loses no health; a
  streak of 10 is the control's expected value, so the zero is the step's doing;
- during a map run and in a pause: each step is driven in a map run that runs and in one that is
  paused by `setPaused`; the pause stays as it was;
- a map run ended in death keeps its streak: the check gives the map run a death and a streak of
  7 by replacing those two fields of the state's map run, since a character that dies holds a
  streak of 0 on its own, and an edit then leaves the 7. A switch is refused in such a map run and
  is not driven there.

Controls, so the check can fail: the same scenario with the program handed back unchanged (a copy
with every field equal, rules in the same order), running and paused, leaves the streak at 10; and
a map run ended in death leaves its 7 where the edit differs.

Does NOT cover: a program of an earning loop's copy (task 18); the discard of the copy's changes
(tests/sim/copy-actions.test.mjs); maps other than Las; real time (`passRealTime`) as the way
minutes pass.
"""

import copy
import json
import os
import shutil
import tempfile
import unittest

import loop2_invariant_support as support
from program_fixture import KNOWING_GAME_JS, program_from_rules, program_rules

GAME_MODULE = "dist/public/sim/game.js"
SENT = {"mapId": "forest", "characterId": 1}
CREATE = ["createCharacter", "Ala"]
T = 1760000000000

ALWAYS = {"kind": "always"}
EXPLORE = {"kind": "explore"}
WANDER = {"kind": "wander"}

STREAK_BEFORE = 10
DEAD_STREAK = 7


def rule(condition, action):
    return {"condition": condition, "action": action}


def fewer_sticks_than(value):
    return {"kind": "hereBelow", "resource": "stick", "value": value}


def edited(base, change):
    """A deep copy of the program with `change(copy)` applied."""
    program = copy.deepcopy(base)
    change(program)
    return program


# Rule 0 never holds; rule 1 explores for 20 game minutes, which covers the first 10.
BASE = program_from_rules([rule(fewer_sticks_than(0), WANDER), rule(ALWAYS, EXPLORE)])
# Two rules of the same content, told apart by identity (1 and 2).
TWINS = program_from_rules([rule(ALWAYS, EXPLORE), rule(ALWAYS, EXPLORE)])


def group_of(program):
    return program["groups"][0]


def add_rule(program):
    program_rules(program).append({"id": program["nextRuleId"], "condition": ALWAYS, "action": WANDER})
    program["nextRuleId"] += 1


def delete_rule(program):
    program_rules(program).pop(0)


def swap_rules(program):
    rules = program_rules(program)
    rules[0], rules[1] = rules[1], rules[0]


def change_condition(program):
    program_rules(program)[0]["condition"] = fewer_sticks_than(1)


def change_action(program):
    program_rules(program)[1]["action"] = WANDER


def rename_group(program):
    group_of(program)["name"] = "Renamed"


def change_group_condition(program):
    group_of(program)["condition"] = fewer_sticks_than(5)


# (name, the program before, the program the edit hands over)
DIFFERING = [
    ("a rule added", BASE, edited(BASE, add_rule)),
    ("a rule deleted", BASE, edited(BASE, delete_rule)),
    ("two rules reordered", BASE, edited(BASE, swap_rules)),
    ("two rules of the same content swapped", TWINS, edited(TWINS, swap_rules)),
    ("the condition of a rule changed", BASE, edited(BASE, change_condition)),
    ("the action of a rule changed", BASE, edited(BASE, change_action)),
    ("a group renamed", BASE, edited(BASE, rename_group)),
    ("the condition of a group changed", BASE, edited(BASE, change_group_condition)),
]

DRIVER = KNOWING_GAME_JS + r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const [gamePath, stepsPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const programs = await import(pathToFileURL(join(dirname(gamePath), 'programs.js')).href);
const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));
let state;
const records = [];
for (const [name, ...args] of steps) {
  if (name === 'newGame') state = await newKnowingGame(game, gamePath);
  else if (name === 'replaceRun') state = { ...state, run: { ...state.run, ...args[0] } };
  else if (name.startsWith('programs.')) state = programs[name.slice(9)](state, ...args).state;
  else state = game[name](state, ...args).state;
  records.push({
    step: name,
    streak: state.run ? state.run.streak : null,
    paused: state.paused,
    death: state.run ? state.run.death !== null : null,
  });
}
writeFileSync(outPath, JSON.stringify(records));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def drive(steps):
    built = support.built_copy()
    game = built.file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}, so the simulation "
                             "cannot be driven")
    directory = tempfile.mkdtemp(prefix="loop2-streak-program-change-")
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


def after_edit(before, handed_over, paused=False, ended=False):
    """The record of the step `setProgram(handed_over)` in a map run that has passed
    STREAK_BEFORE game minutes under the program `before`."""
    steps = [["newGame"], CREATE, ["setProgram", before], ["send", SENT, T],
             ["advanceMinutes", STREAK_BEFORE]]
    if paused:
        steps.append(["setPaused", True])
    if ended:
        steps.append(["replaceRun", {"death": {"minute": STREAK_BEFORE, "cause": "cold"},
                                     "streak": DEAD_STREAK}])
    steps.append(["setProgram", handed_over])
    records = drive(steps)
    return records[-2], records[-1]


def after_switch(target, paused=False):
    """The records of the step before the switch to program `target` and of the switch, in a map
    run sent with program 1 holding BASE that has passed STREAK_BEFORE game minutes. Program 2 is
    made by `createProgram` and holds the empty group (other rules); program 3 holds BASE, the very
    rules of the copy."""
    steps = [["newGame"], CREATE, ["setProgram", BASE], ["programs.createProgram"],
             ["programs.createProgram"], ["programs.editProgram", 3, BASE],
             ["send", {**SENT, "programId": 1}, T], ["advanceMinutes", STREAK_BEFORE]]
    if paused:
        steps.append(["setPaused", True])
    steps.append(["programs.switchProgram", target])
    records = drive(steps)
    return records[-2], records[-1]


class StreakProgramChange(unittest.TestCase):

    def test_precondition_the_streak_stands_at_ten_before_the_edit(self):
        before, _ = after_edit(BASE, BASE)
        self.assertEqual(before["streak"], STREAK_BEFORE,
                         "the map run does not hold a streak of 10 after 10 game minutes of "
                         "exploring, so the zero below would prove nothing")

    def test_an_edit_that_changes_the_program_zeroes_the_streak(self):
        # invariant: streak-program-change
        for paused in (False, True):
            for name, base, handed_over in DIFFERING:
                with self.subTest(edit=name, paused=paused):
                    before, after = after_edit(base, handed_over, paused=paused)
                    self.assertEqual(before["streak"], STREAK_BEFORE)
                    self.assertEqual(after["streak"], 0,
                                     f"{name}: the streak was not set to zero")
                    self.assertEqual(after["paused"], paused, f"{name}: the pause changed")

    def test_control_an_edit_that_hands_back_the_same_program_leaves_the_streak(self):
        # invariant: streak-program-change
        for paused in (False, True):
            for name, base in (("the same program", BASE), ("twin rules", TWINS)):
                with self.subTest(program=name, paused=paused):
                    _, after = after_edit(base, copy.deepcopy(base), paused=paused)
                    self.assertEqual(after["streak"], STREAK_BEFORE,
                                     f"{name} handed back changed the streak")

    def test_a_map_run_ended_in_death_keeps_its_streak(self):
        # invariant: streak-program-change
        for name, base, handed_over in DIFFERING:
            with self.subTest(edit=name):
                before, after = after_edit(base, handed_over, ended=True)
                self.assertTrue(before["death"], "the map run did not end in death")
                self.assertEqual(after["streak"], DEAD_STREAK,
                                 f"{name}: an ended map run lost its streak")

    def test_a_switch_to_another_program_zeroes_the_streak(self):
        # invariant: streak-program-change
        for paused in (False, True):
            for target, name in ((2, "a program of other rules"), (3, "a program of the same rules")):
                with self.subTest(program=name, paused=paused):
                    before, after = after_switch(target, paused=paused)
                    self.assertEqual(before["streak"], STREAK_BEFORE)
                    self.assertEqual(after["streak"], 0,
                                     f"the switch to {name} did not set the streak to zero")
                    self.assertEqual(after["paused"], paused, f"the switch to {name} changed the pause")


if __name__ == "__main__":
    unittest.main()
