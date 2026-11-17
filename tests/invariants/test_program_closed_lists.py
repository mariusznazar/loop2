"""Invariant program-closed-lists: The simulation refuses a program holding a condition or an
action of the character whose kind the data files of `src/browser/sim/data/` do not list.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/browser/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `createCharacter`, `setProgram` and
`send` of `game.js`, `startLoop` of `loop.js` and, for the load of a saved game state, `savedGame`
and `loadSavedGame` of `saved-game.js`. The program the check reads after `setProgram` is the one
it edits (`heldProgram` in `HELD_PROGRAMS_JS` of `program_fixture.py`): the copy of the map run
during a map run, outside a map run the program of the player's list the team goes with (D-164;
the copy is the program the map run carries out). During an earning loop that is the program of the
list as well, and the program the earning loop carries (`loops[1].program`) is read too.
The new game of each game with a map run or an earning loop is one whose Understanding holds
everything the built data modules list, as `KNOWING_GAME_JS` in `program_fixture.py` gives it, so
that the rules of the program stay what the check drives.

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
  unchanged (written out below as BASE); the program the state holds is the copy of the map run
  during a map run, and outside a map run the program of the list the team goes with;
- a kind listed there is accepted with its fields valid: a program of rules of every listed kind,
  with valid fields, including all ten condition kinds on groups, is taken in as offered (the control
  that shows refusal is no blanket refusal);
- the load of a saved game state refuses a program as `setProgram` does: a saved document whose
  program, at the one place it stands, holds a kind the data do not list is not loaded (`loadSavedGame`
  gives no game state), where the document with the valid program there is loaded and holds the
  program as offered. The places are the player's list of programs, the copy of a map run, the base
  of that copy and the program an earning loop carries.

Every offer of `setProgram` is made three times: outside a map run, during a map run of Las
(`forest`) of a character created in a new game, of the archetype `elementalMage`, sent at the
real time T, and during an earning loop of that character on Skraj lasu (`forestEdge`), put into the
earning loop at T; there `setProgram` refuses as it does elsewhere, and the program the earning loop carries does not
become the offered one. The unlisted kind stands
in rule 1 of three, between two valid rules, and on a group between valid groups, once bare and
once with the fields a listed kind takes (`resource`, `value`), so that a reader that guesses a
kind from its fields is caught. Every program offered to `setProgram` is also written into a saved
document at each of the four places, the document being that of the game just described stamped with
a save time and made the JSON text it becomes; where the place is the copy, the counts of its rules
are made to match the program written there, so that the load refuses on the kind and on nothing else.

Controls, so the check can fail: the comparison flags a made-up result in which a program with an
unlisted kind was taken in, and a made-up result in which the valid program was refused, and the
same for a made-up load; the tripwire fails on made-up data holding a kind not written out, and on
data lacking one.

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
from program_fixture import (HELD_PROGRAMS_JS, KNOWING_GAME_JS, SAVED_DOCUMENT_JS,
                             program_from_rules, program_rules)

GAME_MODULE = "dist/browser/sim/game.js"
BUILT_DATA = "dist/browser/sim/data"
# The map sent to, as the data files name it (D-18), and the character sent: the first one a
# new game creates, which takes the id 1.
SENT = {"mapId": "forest", "characterId": 1}
# The map the earning loop of that character is put on: the one map the new game of the driver has
# solved.
LOOPED = {"mapId": "forestEdge", "characterId": 1}
T = 1760000000000
# Where an offer of `setProgram` is made, and where a program is written into a saved document.
WHERES = {"outside": "outside a map run", "run": "during a map run", "loop": "during an earning loop"}
PLACES = {"list": "the player's list", "copy": "the copy of a map run",
          "base": "the base of the copy of a map run", "loop": "an earning loop"}

# The kinds the data files list today: the keys of CONDITIONS (conditions.ts) and of ACTIONS
# (actions.ts).
CONDITION_KINDS = ("always", "hereBelow", "temperatureBelow", "satietyBelow", "natureEnergyBelow",
                   "itemBelow", "campfireLeftBelow", "awayFromCampfire", "healthBelow",
                   "opponentHealthBelow")
ACTION_KINDS = ("explore", "wander", "walkTo", "walkToCampfire", "gather", "patrol", "craftCampfire",
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
    rule({"kind": "natureEnergyBelow", "value": 30}, {"kind": "wander"}),
    rule({"kind": "itemBelow", "item": "berry", "value": 8}, {"kind": "wander"}),
    rule({"kind": "campfireLeftBelow", "value": 20}, {"kind": "wander"}),
    rule({"kind": "awayFromCampfire"}, {"kind": "wander"}),
    rule(ALWAYS, {"kind": "gather", "resource": "moss"}),
    rule(ALWAYS, {"kind": "patrol", "resource": "berry"}),
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

DRIVER = KNOWING_GAME_JS + HELD_PROGRAMS_JS + SAVED_DOCUMENT_JS + r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, dataPath, offersPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const loop = await siblingModule(gamePath, 'loop.js');
const saved = await siblingModule(gamePath, 'saved-game.js');
const { CONDITIONS } = await import(pathToFileURL(dataPath + '/conditions.js').href);
const { ACTIONS } = await import(pathToFileURL(dataPath + '/actions.js').href);
const { base, sent, looped, realMs, offers, loads } = JSON.parse(readFileSync(offersPath, 'utf8'));
const copy = (value) => JSON.parse(JSON.stringify(value));

// The game of an offer: the program `base` on the list, one character, and the map run or the
// earning loop of that character where the offer is made during one.
async function gameOf(where) {
  let state = game.setProgram(
    where === 'outside' ? game.newGame() : await newKnowingGame(game, gamePath), base).state;
  state = game.createCharacter(state, 'Ala').state;
  if (where === 'run') state = game.send(state, sent, realMs).state;
  if (where === 'loop') state = loop.startLoop(state, looped, realMs).state;
  return state;
}

const results = [];
for (const { where, program } of offers) {
  const state = await gameOf(where);
  try {
    const after = game.setProgram(state, program).state;
    results.push({
      threw: false,
      program: copy(heldProgram(after)),
      loopProgram: where === 'loop' ? copy(after.loops[looped.characterId].program) : null,
    });
  } catch (error) {
    results.push({ threw: true, error: String(error && error.message || error) });
  }
}

const documentOf = async (where) => savedDocument(game, saved, await gameOf(where), realMs);
const documents = {
  list: await documentOf('outside'), copy: await documentOf('run'),
  base: await documentOf('run'), loop: await documentOf('loop'),
};
const ruleCounts = (program) => Object.fromEntries(
  program.groups.flatMap((group) => group.rules.map((rule) => [rule.id, 0])));
const writeProgram = (document, place, program) => {
  const held = document.game;
  if (place === 'list') held.programs[0].program = program;
  if (place === 'copy') {
    held.run.copy.program = program;
    held.ruleCounts = ruleCounts(program);
  }
  if (place === 'base') held.run.copy.base = program;
  if (place === 'loop') held.loops[looped.characterId].program = program;
};
const programAt = (state, place) => ({
  list: () => state.programs[0].program, copy: () => state.run.copy.program,
  base: () => state.run.copy.base, loop: () => state.loops[looped.characterId].program,
})[place]();
const loaded = [];
for (const { place, program } of loads) {
  const document = copy(documents[place]);
  writeProgram(document, place, program);
  const result = saved.loadSavedGame(document);
  loaded.push(result.ok
    ? { ok: true, program: copy(programAt(result.state, place)) }
    : { ok: false, reason: result.reason });
}
writeFileSync(outPath, JSON.stringify({
  conditionKinds: Object.keys(CONDITIONS), actionKinds: Object.keys(ACTIONS), results, loaded,
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


def drive(programs, written=()):
    """(the condition kinds and action kinds the built data lists, [(where, result)] per program,
    each offered to `setProgram` at each of WHERES, [(place, result of the load)] per program of
    `written`, each written into a saved document at each of PLACES)."""
    copy = support.built_copy()
    game = copy.file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}")
    listed = [{"where": where, "program": p} for p in programs for where in WHERES]
    loads = [{"place": place, "program": p} for p in written for place in PLACES]
    directory = tempfile.mkdtemp(prefix="loop2-program-closed-lists-")
    try:
        script = os.path.join(directory, "driver.mjs")
        offers_path = os.path.join(directory, "offers.json")
        out_path = os.path.join(directory, "out.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(DRIVER)
        with open(offers_path, "w", encoding="utf-8", newline="\n") as handle:
            json.dump({"base": BASE, "sent": SENT, "looped": LOOPED, "realMs": T,
                       "offers": listed, "loads": loads}, handle)
        code, output = support.run([node(), script, game, copy.file(BUILT_DATA), offers_path,
                                    out_path], directory)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            out = json.load(handle)
    finally:
        shutil.rmtree(directory, ignore_errors=True)
    pairs = [(o["where"], r) for o, r in zip(listed, out["results"])]
    loaded = [(o["place"], r) for o, r in zip(loads, out["loaded"])]
    return out["conditionKinds"], out["actionKinds"], pairs, loaded


def taken_in(result):
    """Whether `setProgram` took the offered program in: it did not throw, and the program it
    holds is no longer BASE, nor is the program an earning loop carries."""
    carried = result.get("loopProgram")
    return not result["threw"] and (result["program"] != BASE or carried not in (None, BASE))


def refusal_findings(label, pairs):
    return [f"{label} ({WHERES[where]}): taken in as {json.dumps(result['program'])}"
            for where, result in pairs if taken_in(result)]


def acceptance_findings(pairs, expected):
    return [f"the valid program was not taken in as offered ({WHERES[where]}): "
            f"{json.dumps(result)}"
            for where, result in pairs
            if result["threw"] or result["program"] != expected]


def load_refusal_findings(label, loaded):
    return [f"{label} written into a saved document at {PLACES[place]}: loaded as "
            f"{json.dumps(result['program'])}"
            for place, result in loaded if result["ok"]]


def load_acceptance_findings(loaded, expected):
    return [f"the valid program written into a saved document at {PLACES[place]} was not loaded "
            f"as offered: {json.dumps(result)}"
            for place, result in loaded if not result["ok"] or result["program"] != expected]


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


def group_programs():
    """(a program of ten groups, each under a condition of one listed kind, and the programs that
    hold an unlisted kind in the condition of its fourth group instead)."""
    valid = {
        "tripPlan": {"take": [], "bring": []},
        "nextGroupId": 11, "nextRuleId": 1,
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
                {"kind": "natureEnergyBelow", "value": 30},
            ])
        ],
    }
    invalid = []
    for kind in UNLISTED_CONDITION_KINDS:
        for fields in ({}, PLAUSIBLE_FIELDS):
            candidate = copying.deepcopy(valid)
            candidate["groups"][3]["condition"] = with_kind(kind, fields)
            invalid.append(candidate)
    return valid, invalid


class ProgramClosedLists(unittest.TestCase):

    def test_group_conditions_accept_listed_values_and_refuse_unlisted_kinds(self):
        # invariant: program-closed-lists
        valid, invalid = group_programs()
        _, _, pairs, _ = drive([valid, *invalid])
        self.assertEqual(acceptance_findings(pairs[:len(WHERES)], valid), [])
        self.assertEqual(refusal_findings("unlisted group condition", pairs[len(WHERES):]), [])

    def test_programs_with_unlisted_kinds_are_refused(self):
        # invariant: program-closed-lists
        labelled = offers()
        condition_kinds, action_kinds, pairs, _ = drive([VALID] + [p for _, p in labelled])
        self.assertEqual(tripwire(condition_kinds, action_kinds), [])
        self.assertEqual(acceptance_findings(pairs[:len(WHERES)], VALID), [])
        found = []
        width = len(WHERES)
        for index, (label, _program) in enumerate(labelled):
            found += refusal_findings(label, pairs[width * (1 + index):width * (2 + index)])
        self.assertEqual(found, [])

    def test_a_saved_game_state_holding_a_program_with_an_unlisted_kind_is_not_loaded(self):
        # invariant: program-closed-lists
        labelled = offers()
        valid_groups, invalid_groups = group_programs()
        programs = [VALID, valid_groups] + [p for _, p in labelled] + invalid_groups
        _, _, _, loaded = drive([], programs)
        width = len(PLACES)
        self.assertEqual(load_acceptance_findings(loaded[:width], VALID), [])
        self.assertEqual(load_acceptance_findings(loaded[width:2 * width], valid_groups), [])
        found = []
        for index, (label, _program) in enumerate(labelled):
            found += load_refusal_findings(label, loaded[width * (2 + index):width * (3 + index)])
        found += load_refusal_findings("unlisted group condition",
                                       loaded[width * (2 + len(labelled)):])
        self.assertEqual(found, [])

    def test_control_the_comparison_and_the_tripwire_flag_breaks(self):
        # invariant: program-closed-lists
        bad = program_from_rules([rule({"kind": "never"}, {"kind": "explore"})])
        self.assertTrue(refusal_findings("made up", [("run", {"threw": False, "program": bad})]),
                        "an unlisted kind taken in goes unseen")
        self.assertTrue(refusal_findings("made up", [("loop", {
            "threw": False, "program": copying.deepcopy(BASE), "loopProgram": bad})]),
                        "an unlisted kind taken into the program of an earning loop goes unseen")
        self.assertEqual(refusal_findings("made up", [("run", {"threw": True, "error": "x"}),
                                                      ("outside", {"threw": False,
                                                                   "program": copying.deepcopy(BASE)}),
                                                      ("loop", {"threw": False,
                                                                "program": copying.deepcopy(BASE),
                                                                "loopProgram": copying.deepcopy(BASE)})]),
                         [])
        self.assertTrue(acceptance_findings([("outside", {"threw": True, "error": "x"})], VALID),
                        "a refused valid program goes unseen")
        self.assertTrue(acceptance_findings([("loop", {"threw": False, "program": BASE})], VALID),
                        "a valid program left out goes unseen")
        self.assertTrue(load_refusal_findings("made up", [("loop", {"ok": True, "program": bad})]),
                        "an unlisted kind loaded goes unseen")
        self.assertEqual(load_refusal_findings("made up", [("list", {"ok": False,
                                                                     "reason": "shape"})]), [])
        self.assertTrue(load_acceptance_findings([("copy", {"ok": False, "reason": "shape"})], VALID),
                        "a refused load of the valid program goes unseen")
        self.assertTrue(load_acceptance_findings([("base", {"ok": True, "program": BASE})], VALID),
                        "a valid program changed by the load goes unseen")
        self.assertEqual(load_acceptance_findings([("list", {"ok": True, "program": VALID})], VALID),
                         [])
        self.assertTrue(tripwire(list(CONDITION_KINDS) + ["hereAbove"], ACTION_KINDS),
                        "a condition kind added to the data goes unseen")
        self.assertTrue(tripwire(CONDITION_KINDS, [k for k in ACTION_KINDS if k != "wander"]),
                        "an action kind taken out of the data goes unseen")
        self.assertEqual(tripwire(CONDITION_KINDS, ACTION_KINDS), [])


if __name__ == "__main__":
    unittest.main()
