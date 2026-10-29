"""Invariant copy-save: „Zapisz w programie” and „Zapisz jako nowy program” leave the content of the
copy a map run carries out and the map run's streak as they were, and „Zapisz jako nowy program” is
no switch of the character to another program.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions by a Node script this check writes to a
temporary directory: `newGame`, `createCharacter`, `setProgram`, `send`, `advanceMinutes` and
`setPaused` in `dist/public/sim/game.js`, and `createProgram`, `editProgram`, `saveCopyIntoProgram`,
`saveCopyAsNewProgram` and `switchProgram` in `dist/public/sim/programs.js`, each returning
`{state, events}`. The new game starts from one whose Understanding holds everything the built data
modules list, as `KNOWING_GAME_JS` in `program_fixture.py` gives it, so that the rules of the program
stay what the check drives. The map run is on the map Las (`forest`), sent with program 1; its copy
is edited at once to differ from the program, and 10 game minutes in which the character explores
follow, so the streak stands at 10.

Reading of the sentence:
- „Zapisz w programie”: `saveCopyIntoProgram` on a copy that differs from its program, after each of
  three edits of the copy (a rule added, a group renamed, the condition of a rule changed);
- „Zapisz jako nowy program”: `saveCopyAsNewProgram` with the name „Nocna”, after the same edits;
- the content of the copy: `state.run.copy.program`, read as JSON before and after the save;
- the map run's streak: `state.run.streak`;
- is no switch: the streak is the one thing a switch sets to zero, so a save that left the streak
  is none; the copy's program number is checked besides: it stays program 1 for the save into the
  program and becomes the new program's number for the save as a new program;
- in a map run that runs and in one that is paused by `setPaused`; the pause stays as it was.

Controls, so the check can fail: in the same scenario `switchProgram` to program 2, made by
`createProgram`, sets the streak to zero (the 10 of the scenario is its start), also where program 2
holds the very rules of the copy; and the saves were made: the program 1 holds the copy's content
after the first, and the list holds a new program with it after the second.

Does NOT cover: the counts of the copy (tests/sim/copy-actions.test.mjs); a save after death or a
completion; maps other than Las; real time (`passRealTime`) as the way minutes pass.
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


def add_rule(program):
    program_rules(program).append({"id": program["nextRuleId"], "condition": ALWAYS, "action": WANDER})
    program["nextRuleId"] += 1


def rename_group(program):
    program["groups"][0]["name"] = "Renamed"


def change_condition(program):
    program_rules(program)[0]["condition"] = fewer_sticks_than(1)


# (name, the content the copy is edited to)
EDITS = [
    ("a rule added", edited(BASE, add_rule)),
    ("a group renamed", edited(BASE, rename_group)),
    ("the condition of a rule changed", edited(BASE, change_condition)),
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
    paused: state.paused,
    copy: state.run ? state.run.copy : null,
    saved: state.programs.map((p) => ({ id: p.id, name: p.name, program: p.program })),
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
    directory = tempfile.mkdtemp(prefix="loop2-copy-save-")
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


def after_step(edit, step, paused=False, other=None):
    """The records of the step before `step` and of `step`, in a map run sent with program 1
    holding BASE, whose copy is edited to `edit` and has passed STREAK_BEFORE game minutes since;
    program 2 is made by `createProgram` and holds `other`, the empty group where that is None."""
    steps = [["newGame"], CREATE, ["setProgram", BASE], ["programs.createProgram"]]
    if other is not None:
        steps.append(["programs.editProgram", 2, other])
    steps += [["send", SENT, T], ["setProgram", edit], ["advanceMinutes", STREAK_BEFORE]]
    if paused:
        steps.append(["setPaused", True])
    steps.append(step)
    records = drive(steps)
    return records[-2], records[-1]


class CopySave(unittest.TestCase):

    def test_precondition_the_streak_stands_at_ten_before_the_save(self):
        before, _ = after_step(EDITS[0][1], ["programs.saveCopyIntoProgram"])
        self.assertEqual(before["streak"], STREAK_BEFORE,
                         "the map run does not hold a streak of 10 after 10 game minutes of "
                         "exploring, so what is left unchanged below would prove nothing")
        self.assertNotEqual(before["copy"]["program"], before["copy"]["base"],
                            "the copy does not differ from its program, so there is nothing to save")

    def test_save_into_the_program_leaves_the_copy_and_the_streak(self):
        # invariant: copy-save
        for paused in (False, True):
            for name, edit in EDITS:
                with self.subTest(edit=name, paused=paused):
                    before, after = after_step(edit, ["programs.saveCopyIntoProgram"], paused=paused)
                    self.assertEqual(after["copy"]["program"], before["copy"]["program"],
                                     f"{name}: the content of the copy changed")
                    self.assertEqual(after["streak"], STREAK_BEFORE, f"{name}: the streak changed")
                    self.assertEqual(after["copy"]["programId"], 1,
                                     f"{name}: the copy moved to another program")
                    self.assertEqual(after["paused"], paused, f"{name}: the pause changed")

    def test_save_as_a_new_program_leaves_the_copy_and_the_streak_and_is_no_switch(self):
        # invariant: copy-save
        for paused in (False, True):
            for name, edit in EDITS:
                with self.subTest(edit=name, paused=paused):
                    before, after = after_step(edit, ["programs.saveCopyAsNewProgram", "Nocna"],
                                               paused=paused)
                    self.assertEqual(after["copy"]["program"], before["copy"]["program"],
                                     f"{name}: the content of the copy changed")
                    self.assertEqual(after["streak"], STREAK_BEFORE, f"{name}: the streak changed")
                    self.assertEqual(after["copy"]["programId"], 3,
                                     f"{name}: the copy does not belong to the new program")
                    self.assertEqual(after["paused"], paused, f"{name}: the pause changed")

    def test_control_the_saves_were_made(self):
        # invariant: copy-save
        for name, edit in EDITS:
            with self.subTest(edit=name):
                before, after = after_step(edit, ["programs.saveCopyIntoProgram"])
                self.assertEqual(after["saved"][0]["program"], before["copy"]["program"],
                                 f"{name}: program 1 does not hold the copy")
                before, after = after_step(edit, ["programs.saveCopyAsNewProgram", "Nocna"])
                self.assertEqual([saved["id"] for saved in after["saved"]], [1, 2, 3])
                self.assertEqual(after["saved"][2]["name"], "Nocna")
                self.assertEqual(after["saved"][2]["program"], before["copy"]["program"],
                                 f"{name}: the new program does not hold the copy")
                self.assertEqual(after["saved"][0], before["saved"][0],
                                 f"{name}: program 1 changed")

    def test_control_a_switch_in_the_same_scenario_zeroes_the_streak(self):
        # invariant: copy-save
        for paused in (False, True):
            for name, edit in EDITS:
                for program, other in (("other rules", None), ("the rules of the copy", edit)):
                    with self.subTest(edit=name, program=program, paused=paused):
                        before, after = after_step(edit, ["programs.switchProgram", 2],
                                                   paused=paused, other=other)
                        self.assertEqual(before["streak"], STREAK_BEFORE)
                        self.assertEqual(after["streak"], 0, f"{name}: the switch kept the streak")
                        self.assertEqual(after["copy"]["programId"], 2)


if __name__ == "__main__":
    unittest.main()
