"""Invariant saved-program-edit: An edit of a saved program during a map run leaves the copy the map
run carries out, the map run's streak and the firing counts of the copy's program rules as they
were.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions by a Node script this check writes to a
temporary directory: `newGame`, `createCharacter`, `setProgram`, `send`, `advanceMinutes` and
`setPaused` in `dist/public/sim/game.js`, and `createProgram` and `editProgram` in
`dist/public/sim/programs.js`, each returning `{state, events}`. The new game starts from one whose
Understanding holds everything the built data modules list, as `KNOWING_GAME_JS` in
`program_fixture.py` gives it, so that the rules of the program stay what the check drives. The
map run is on the map Las (`forest`), sent with program 1 after 10 game minutes in which the
character explores, so the streak stands at 10 and the counts at `{1: 0, 2: 1}`.

Reading of the sentence:
- an edit of a saved program: `editProgram` with the number of a program on the list and a content
  that differs from the program's. Cases: the program the copy was taken from (program 1), whose
  content the edit changes in each way of the sibling check `streak-program-change` (a rule added,
  a rule deleted, two rules reordered, the condition of a rule changed, the action of a rule
  changed, a group renamed, the condition of a group changed), and another program (program 2,
  made by `createProgram`);
- the copy the map run carries out: `state.run.copy`, the whole record, read as JSON before and
  after the edit;
- the map run's streak: `state.run.streak`, and with it the beaten attacks, `state.run.defeatedAttacks`;
- the firing counts of the copy's program rules: `state.ruleCounts`, read before and after;
- during a map run: each edit is driven in a map run that runs and in one that is paused by
  `setPaused`; the pause stays as it was.

Controls, so the check can fail: in the same scenario `setProgram`, the edit of the copy, handed the
same differing content, sets the streak to zero (the 10 of the scenario is its start) and, for the
edits that change the action of the rule the counts stand beside, starts that rule's count again at
zero, `{1: 0, 2: 0}`; and the saved program's content really becomes the edit's content, so the
edit was made.

Does NOT cover: the counts that stand beside a saved program after „Zakończ” (tests/sim/program-list.test.mjs);
the save of the copy into its program (invariant `copy-save`); maps other than Las; real time
(`passRealTime`) as the way minutes pass.
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
SENT = {"mapId": "forest", "characterId": 1, "programId": 1}
CREATE = ["createCharacter", "Ala"]
T = 1760000000000

ALWAYS = {"kind": "always"}
EXPLORE = {"kind": "explore"}
WANDER = {"kind": "wander"}

STREAK_BEFORE = 10
COUNTS_BEFORE = {"1": 0, "2": 1}


def rule(condition, action):
    return {"condition": condition, "action": action}


def fewer_sticks_than(value):
    return {"kind": "hereBelow", "resource": "stick", "value": value}


def edited(base, change):
    """A deep copy of the program with `change(copy)` applied."""
    program = copy.deepcopy(base)
    change(program)
    return program


# Rule 1 never holds; rule 2 explores for 20 game minutes, which covers the first 10.
BASE = program_from_rules([rule(fewer_sticks_than(0), WANDER), rule(ALWAYS, EXPLORE)])


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


# (name, the content the edit hands over, the counts the edit of the copy leaves)
DIFFERING = [
    ("a rule added", edited(BASE, add_rule), {"1": 0, "2": 1, "3": 0}),
    ("a rule deleted", edited(BASE, delete_rule), {"2": 1}),
    ("two rules reordered", edited(BASE, swap_rules), {"1": 0, "2": 1}),
    ("the condition of a rule changed", edited(BASE, change_condition), {"1": 0, "2": 1}),
    ("the action of a rule changed", edited(BASE, change_action), {"1": 0, "2": 0}),
    ("a group renamed", edited(BASE, rename_group), {"1": 0, "2": 1}),
    ("the condition of a group changed", edited(BASE, change_group_condition), {"1": 0, "2": 1}),
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
  else if (name.startsWith('programs.')) state = programs[name.slice(9)](state, ...args).state;
  else state = game[name](state, ...args).state;
  records.push({
    step: name,
    streak: state.run ? state.run.streak : null,
    defeatedAttacks: state.run ? state.run.defeatedAttacks : null,
    paused: state.paused,
    copy: state.run ? state.run.copy : null,
    counts: state.ruleCounts,
    saved: state.programs.map((p) => p.program),
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
    directory = tempfile.mkdtemp(prefix="loop2-saved-program-edit-")
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


def after_edit(edit_step, paused=False):
    """The records of the step before `edit_step` and of `edit_step`, in a map run that has passed
    STREAK_BEFORE game minutes sent with program 1 holding BASE; program 2 is made by
    `createProgram` and holds the empty group."""
    steps = [["newGame"], CREATE, ["setProgram", BASE], ["programs.createProgram"],
             ["send", SENT, T], ["advanceMinutes", STREAK_BEFORE]]
    if paused:
        steps.append(["setPaused", True])
    steps.append(edit_step)
    records = drive(steps)
    return records[-2], records[-1]


class SavedProgramEdit(unittest.TestCase):

    def test_precondition_the_map_run_stands_at_ten_with_its_counts(self):
        before, _ = after_edit(["programs.editProgram", 1, BASE])
        self.assertEqual(before["streak"], STREAK_BEFORE,
                         "the map run does not hold a streak of 10 after 10 game minutes of "
                         "exploring, so what is left unchanged below would prove nothing")
        self.assertEqual(before["counts"], COUNTS_BEFORE)
        self.assertEqual(before["copy"]["programId"], 1)

    def test_an_edit_of_a_saved_program_leaves_the_copy_the_streak_and_the_counts(self):
        # invariant: saved-program-edit
        for paused in (False, True):
            for program_id, owner in ((1, "the program the copy came from"), (2, "another program")):
                for name, handed_over, _ in DIFFERING:
                    with self.subTest(program=owner, edit=name, paused=paused):
                        before, after = after_edit(["programs.editProgram", program_id, handed_over],
                                                   paused=paused)
                        self.assertEqual(before["streak"], STREAK_BEFORE)
                        self.assertEqual(after["copy"], before["copy"], f"{name}: the copy changed")
                        self.assertEqual(after["streak"], STREAK_BEFORE,
                                         f"{name}: the streak changed")
                        self.assertEqual(after["defeatedAttacks"], before["defeatedAttacks"],
                                         f"{name}: the beaten attacks changed")
                        self.assertEqual(after["counts"], COUNTS_BEFORE,
                                         f"{name}: the firing counts changed")
                        self.assertEqual(after["paused"], paused, f"{name}: the pause changed")

    def test_control_the_edit_was_made_to_the_saved_program(self):
        # invariant: saved-program-edit
        for program_id in (1, 2):
            for name, handed_over, _ in DIFFERING:
                with self.subTest(program=program_id, edit=name):
                    before, after = after_edit(["programs.editProgram", program_id, handed_over])
                    self.assertNotEqual(after["saved"][program_id - 1], before["saved"][program_id - 1],
                                        f"{name}: the saved program did not change")
                    self.assertEqual(after["saved"][2 - program_id], before["saved"][2 - program_id],
                                     f"{name}: the other saved program changed")

    def test_control_the_edit_of_the_copy_zeroes_the_streak_and_restarts_changed_counts(self):
        # invariant: saved-program-edit
        for paused in (False, True):
            for name, handed_over, counts in DIFFERING:
                with self.subTest(edit=name, paused=paused):
                    before, after = after_edit(["setProgram", handed_over], paused=paused)
                    self.assertEqual(before["streak"], STREAK_BEFORE)
                    self.assertEqual(after["streak"], 0, f"{name}: the edit of the copy kept the streak")
                    self.assertEqual(after["counts"], counts, f"{name}: the counts after the edit of the copy")
                    self.assertNotEqual(after["copy"], before["copy"])


if __name__ == "__main__":
    unittest.main()
