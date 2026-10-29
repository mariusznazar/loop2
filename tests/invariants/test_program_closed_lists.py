"""Invariant program-closed-lists: The simulation refuses a program holding a condition or an
action of the character whose kind the data files of `src/browser/sim/data/` do not list.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `createCharacter`, `setProgram` and
`send`.
The new game of each game with a map run is one whose Understanding holds everything the built data
modules list, as `KNOWING_GAME_JS` in `program_fixture.py` gives it, so that the rules of the
program stay what the check drives.

Reading of the sentence:
- the lists: the kinds of condition are the keys of `CONDITIONS` (`conditions.ts`), the kinds of
  action of the character the keys of `ACTIONS` (`actions.ts`); they are written out below in
  CONDITION_KINDS and ACTION_KINDS, transcribed from the data, and the check does not read the data
  for its expected values (WAY-228). A tripwire reads the keys of both, as `npm run build` compiles
  them, only to fail when they differ from what is written out here, in either direction: a kind
  added to the data, or one taken out of it, is a foundation step for this check;
- a condition whose kind the data do not list: a condition whose `kind` is no key of CONDITIONS
  (an action's kind included); an action likewise against ACTIONS; a missing `kind` or one that is
  no string is no listed kind either;
- refuses: `setProgram`, the simulation's function that replaces the program, does not take the
  program in — it throws, or the state it returns holds the program the state had before,
  unchanged (written out below as BASE);
- a kind listed there is accepted with its fields valid: a program of rules of every listed kind,
  with valid fields, including all nine condition kinds on groups, is taken in as offered (the control
  that shows refusal is no blanket refusal).

Every offer is made twice: in the headquarters (no map run) and during a map run of Las
(`forest`) of a character created in a new game, of the archetype `elementalMage`, sent at the
real time T. The unlisted kind stands
in rule 1 of three, between two valid rules, and on a group between valid groups, once bare and
once with the fields a listed kind takes (`resource`, `value`), so that a reader that guesses a
kind from its fields is caught.

Controls, so the check can fail: the comparison flags a made-up result in which a program with an
unlisted kind was taken in, and a made-up result in which the valid program was refused; the
tripwire fails on made-up data holding a kind not written out, and on data lacking one.

Does NOT cover: whether the simulation acts on the program it takes in (program-rule-pick);
fields of a listed kind beyond those named above.
"""

import copy as copying
import json
import os
import shutil
import tempfile
import unittest

import loop2_invariant_support as support
from program_fixture import KNOWING_GAME_JS, program_from_rules, program_rules

GAME_MODULE = "dist/public/sim/game.js"
BUILT_DATA = "dist/public/sim/data"
# The map sent to, as the data files name it (D-18), and the character sent: the first one a
# new game creates, which takes the id 1.
SENT = {"mapId": "forest", "characterId": 1}
T = 1760000000000

# The kinds the data files list today: the keys of CONDITIONS (conditions.ts) and of ACTIONS
# (actions.ts).
CONDITION_KINDS = ("always", "hereBelow", "temperatureBelow", "satietyBelow", "itemBelow",
                   "campfireLeftBelow", "awayFromCampfire", "healthBelow", "opponentHealthBelow")
ACTION_KINDS = ("explore", "wander", "walkTo", "walkToCampfire", "gather", "craftCampfire",
                "lightCampfire", "lightItem", "feedCampfire", "eat", "strikeWithStick", "kick", "dodge")

ALWAYS = {"kind": "always"}


def rule(condition, action):
    return {"condition": condition, "action": action}


# The program in force before each offer.
BASE = program_from_rules([rule(ALWAYS, {"kind": "wander"})])

# A program holding every listed kind, each with valid fields.
VALID = program_from_rules([
    rule(ALWAYS, {"kind": "explore"}),
    rule({"kind": "hereBelow", "resource": "stick", "value": 3}, {"kind": "wander"}),
    rule(ALWAYS, {"kind": "walkTo", "resource": "berry"}),
    rule({"kind": "temperatureBelow", "value": 36.5}, {"kind": "wander"}),
    rule({"kind": "satietyBelow", "value": 50}, {"kind": "wander"}),
    rule({"kind": "itemBelow", "item": "berry", "value": 8}, {"kind": "wander"}),
    rule({"kind": "campfireLeftBelow", "value": 20}, {"kind": "wander"}),
    rule({"kind": "awayFromCampfire"}, {"kind": "wander"}),
    rule(ALWAYS, {"kind": "gather", "resource": "moss"}),
    rule(ALWAYS, {"kind": "walkToCampfire"}),
    rule(ALWAYS, {"kind": "craftCampfire"}),
    rule(ALWAYS, {"kind": "lightCampfire"}),
    rule(ALWAYS, {"kind": "lightItem"}),
    rule(ALWAYS, {"kind": "feedCampfire"}),
    rule(ALWAYS, {"kind": "eat"}),
    rule({"kind": "healthBelow", "value": 50}, {"kind": "strikeWithStick"}),
    rule({"kind": "opponentHealthBelow", "value": 10}, {"kind": "kick"}),
    rule(ALWAYS, {"kind": "dodge"}),
])

# Kinds no data file lists: made-up kinds, letter-case variants, names every JavaScript object
# answers to, the other list's kinds, the empty string, and kinds that are no string.
MISSING = "__missing__"
UNLISTED_CONDITION_KINDS = ("never", "hereAbove", "hereAtLeast", "stockBelow", "Always", "ALWAYS",
                            "herebelow", "", "toString", "constructor", "__proto__",
                            "hasOwnProperty", "explore", "wander", "walkTo", "gather", MISSING,
                            None, 0, ["always"])
UNLISTED_ACTION_KINDS = ("collect", "gatherAll", "Gather", "rest", "walkToTile", "goTo", "Explore",
                         "WANDER", "walkto", "craft", "light", "feed", "Eat", "lightcampfire",
                         "walkToFire", "",
                         "toString", "constructor", "__proto__", "valueOf", "always",
                         "hereBelow", MISSING, None, 1, ["explore"])
# Fields a listed kind takes, given to an unlisted one in the second offer of each kind.
PLAUSIBLE_FIELDS = {"resource": "stick", "value": 3}

DRIVER = KNOWING_GAME_JS + r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, dataPath, offersPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const { CONDITIONS } = await import(pathToFileURL(dataPath + '/conditions.js').href);
const { ACTIONS } = await import(pathToFileURL(dataPath + '/actions.js').href);
const { base, sent, realMs, offers } = JSON.parse(readFileSync(offersPath, 'utf8'));
const results = [];
for (const { withRun, program } of offers) {
  let state = game.setProgram(
    withRun ? await newKnowingGame(game, gamePath) : game.newGame(), base).state;
  state = game.createCharacter(state, 'Ala').state;
  if (withRun) state = game.send(state, sent, realMs).state;
  try {
    const after = game.setProgram(state, program).state;
    results.push({ threw: false, program: JSON.parse(JSON.stringify(after.program)) });
  } catch (error) {
    results.push({ threw: true, error: String(error && error.message || error) });
  }
}
writeFileSync(outPath, JSON.stringify({
  conditionKinds: Object.keys(CONDITIONS), actionKinds: Object.keys(ACTIONS), results,
}));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def with_kind(kind, fields):
    value = dict(fields)
    if kind != MISSING:
        value["kind"] = kind
    return value


def offers():
    """[(label, program)] of the programs holding one unlisted kind each."""
    found = []
    for kind in UNLISTED_CONDITION_KINDS:
        for fields in ({}, PLAUSIBLE_FIELDS):
            bad = rule(with_kind(kind, fields), {"kind": "explore"})
            found.append((f"condition kind {kind!r} with fields {fields}",
                          program_from_rules([program_rules(VALID)[0], bad, program_rules(VALID)[2]])))
    for kind in UNLISTED_ACTION_KINDS:
        for fields in ({}, PLAUSIBLE_FIELDS):
            bad = rule(ALWAYS, with_kind(kind, fields))
            found.append((f"action kind {kind!r} with fields {fields}",
                          program_from_rules([program_rules(VALID)[0], bad, program_rules(VALID)[2]])))
    return found


def drive(programs):
    """(the condition kinds and action kinds the built data lists, [(with a map run, result)] per
    program, each offered without and with a map run)."""
    copy = support.built_copy()
    game = copy.file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}")
    listed = [{"withRun": with_run, "program": p} for p in programs for with_run in (False, True)]
    directory = tempfile.mkdtemp(prefix="loop2-program-closed-lists-")
    try:
        script = os.path.join(directory, "driver.mjs")
        offers_path = os.path.join(directory, "offers.json")
        out_path = os.path.join(directory, "out.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(DRIVER)
        with open(offers_path, "w", encoding="utf-8", newline="\n") as handle:
            json.dump({"base": BASE, "sent": SENT, "realMs": T, "offers": listed}, handle)
        code, output = support.run([node(), script, game, copy.file(BUILT_DATA), offers_path,
                                    out_path], directory)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            out = json.load(handle)
    finally:
        shutil.rmtree(directory, ignore_errors=True)
    pairs = [(o["withRun"], r) for o, r in zip(listed, out["results"])]
    return out["conditionKinds"], out["actionKinds"], pairs


def taken_in(result):
    """Whether `setProgram` took the offered program in: it did not throw, and the program it
    holds is no longer BASE."""
    return not result["threw"] and result["program"] != BASE


def refusal_findings(label, pairs):
    return [f"{label} ({'during a map run' if with_run else 'in the headquarters'}): taken in "
            f"as {json.dumps(result['program'])}"
            for with_run, result in pairs if taken_in(result)]


def acceptance_findings(pairs, expected):
    return [f"the valid program was not taken in as offered "
            f"({'during a map run' if with_run else 'in the headquarters'}): {json.dumps(result)}"
            for with_run, result in pairs
            if result["threw"] or result["program"] != expected]


def tripwire(condition_kinds, action_kinds):
    found = []
    if sorted(condition_kinds) != sorted(CONDITION_KINDS):
        found.append(f"the data lists the condition kinds {sorted(condition_kinds)}, the check "
                     f"writes out {sorted(CONDITION_KINDS)}: update CONDITION_KINDS through a "
                     "foundation step")
    if sorted(action_kinds) != sorted(ACTION_KINDS):
        found.append(f"the data lists the action kinds {sorted(action_kinds)}, the check writes "
                     f"out {sorted(ACTION_KINDS)}: update ACTION_KINDS through a foundation step")
    return found


class ProgramClosedLists(unittest.TestCase):

    def test_group_conditions_accept_listed_values_and_refuse_unlisted_kinds(self):
        # invariant: program-closed-lists
        valid = {
            "nextGroupId": 10, "nextRuleId": 1,
            "groups": [
                {"id": index + 1, "name": "Group", "condition": condition, "rules": []}
                for index, condition in enumerate([
                    ALWAYS,
                    {"kind": "hereBelow", "resource": "stick", "value": 3},
                    {"kind": "temperatureBelow", "value": 36.5},
                    {"kind": "satietyBelow", "value": 50},
                    {"kind": "itemBelow", "item": "berry", "value": 8},
                    {"kind": "campfireLeftBelow", "value": 20},
                    {"kind": "awayFromCampfire"},
                    {"kind": "healthBelow", "value": 50},
                    {"kind": "opponentHealthBelow", "value": 10},
                ])
            ],
        }
        invalid = []
        for kind in UNLISTED_CONDITION_KINDS:
            for fields in ({}, PLAUSIBLE_FIELDS):
                candidate = copying.deepcopy(valid)
                candidate["groups"][3]["condition"] = with_kind(kind, fields)
                invalid.append(candidate)
        _, _, pairs = drive([valid, *invalid])
        self.assertEqual(acceptance_findings(pairs[:2], valid), [])
        self.assertEqual(refusal_findings("unlisted group condition", pairs[2:]), [])

    def test_programs_with_unlisted_kinds_are_refused(self):
        # invariant: program-closed-lists
        labelled = offers()
        condition_kinds, action_kinds, pairs = drive([VALID] + [p for _, p in labelled])
        self.assertEqual(tripwire(condition_kinds, action_kinds), [])
        self.assertEqual(acceptance_findings(pairs[:2], VALID), [])
        found = []
        for index, (label, _program) in enumerate(labelled):
            found += refusal_findings(label, pairs[2 + 2 * index:4 + 2 * index])
        self.assertEqual(found, [])

    def test_control_the_comparison_and_the_tripwire_flag_breaks(self):
        # invariant: program-closed-lists
        bad = program_from_rules([rule({"kind": "never"}, {"kind": "explore"})])
        self.assertTrue(refusal_findings("made up", [(True, {"threw": False, "program": bad})]),
                        "an unlisted kind taken in goes unseen")
        self.assertEqual(refusal_findings("made up", [(True, {"threw": True, "error": "x"}),
                                                      (False, {"threw": False,
                                                               "program": copying.deepcopy(BASE)})]),
                         [])
        self.assertTrue(acceptance_findings([(False, {"threw": True, "error": "x"})], VALID),
                        "a refused valid program goes unseen")
        self.assertTrue(acceptance_findings([(False, {"threw": False, "program": BASE})], VALID),
                        "a valid program left out goes unseen")
        self.assertTrue(tripwire(list(CONDITION_KINDS) + ["hereAbove"], ACTION_KINDS),
                        "a condition kind added to the data goes unseen")
        self.assertTrue(tripwire(CONDITION_KINDS, [k for k in ACTION_KINDS if k != "wander"]),
                        "an action kind taken out of the data goes unseen")
        self.assertEqual(tripwire(CONDITION_KINDS, ACTION_KINDS), [])


if __name__ == "__main__":
    unittest.main()
