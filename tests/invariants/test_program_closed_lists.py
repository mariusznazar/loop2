"""Invariant program-closed-lists: The simulation refuses a program holding a condition or an
action of the character whose kind the data files of `src/browser/sim/data/` do not list.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `setProgram` and `send`.

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
  with valid fields, is taken in as offered (the control that shows refusal is no blanket refusal).

Every offer is made twice: on the sending screen (no map run) and during a map run of Las
(`forest`) with the archetype `elementalMage`, sent at the real time T. The unlisted kind stands
in rule 1 of three, between two valid rules, once bare and once with the fields a listed kind
takes (`resource`, `value`), so that a reader that guesses a kind from its fields is caught.

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

GAME_MODULE = "dist/public/sim/game.js"
BUILT_DATA = "dist/public/sim/data"
SENT = {"mapId": "forest", "archetypeId": "elementalMage"}
T = 1760000000000

# The kinds the data files list today: the keys of CONDITIONS (conditions.ts) and of ACTIONS
# (actions.ts).
CONDITION_KINDS = ("always", "hereBelow")
ACTION_KINDS = ("explore", "wander", "walkTo")

ALWAYS = {"kind": "always"}


def rule(condition, action):
    return {"condition": condition, "action": action}


# The program in force before each offer.
BASE = {"rules": [rule(ALWAYS, {"kind": "wander"})]}

# A program holding every listed kind, each with valid fields.
VALID = {"rules": [
    rule(ALWAYS, {"kind": "explore"}),
    rule({"kind": "hereBelow", "resource": "stick", "value": 3}, {"kind": "wander"}),
    rule(ALWAYS, {"kind": "walkTo", "resource": "berry"}),
]}

# Kinds no data file lists: made-up kinds, letter-case variants, names every JavaScript object
# answers to, the other list's kinds, the empty string, and kinds that are no string.
MISSING = "__missing__"
UNLISTED_CONDITION_KINDS = ("never", "hereAbove", "hereAtLeast", "stockBelow", "Always", "ALWAYS",
                            "herebelow", "", "toString", "constructor", "__proto__",
                            "hasOwnProperty", "explore", "wander", "walkTo", MISSING, None, 0,
                            ["always"])
UNLISTED_ACTION_KINDS = ("gather", "rest", "walkToTile", "goTo", "Explore", "WANDER", "walkto", "",
                         "toString", "constructor", "__proto__", "valueOf", "always",
                         "hereBelow", MISSING, None, 1, ["explore"])
# Fields a listed kind takes, given to an unlisted one in the second offer of each kind.
PLAUSIBLE_FIELDS = {"resource": "stick", "value": 3}

DRIVER = r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, dataPath, offersPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const { CONDITIONS } = await import(pathToFileURL(dataPath + '/conditions.js').href);
const { ACTIONS } = await import(pathToFileURL(dataPath + '/actions.js').href);
const { base, sent, realMs, offers } = JSON.parse(readFileSync(offersPath, 'utf8'));
const results = [];
for (const { withRun, program } of offers) {
  let state = game.setProgram(game.newGame(), base).state;
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
                          {"rules": [VALID["rules"][0], bad, VALID["rules"][2]]}))
    for kind in UNLISTED_ACTION_KINDS:
        for fields in ({}, PLAUSIBLE_FIELDS):
            bad = rule(ALWAYS, with_kind(kind, fields))
            found.append((f"action kind {kind!r} with fields {fields}",
                          {"rules": [VALID["rules"][0], bad, VALID["rules"][2]]}))
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
    return [f"{label} ({'during a map run' if with_run else 'on the sending screen'}): taken in "
            f"as {json.dumps(result['program'])}"
            for with_run, result in pairs if taken_in(result)]


def acceptance_findings(pairs, expected):
    return [f"the valid program was not taken in as offered "
            f"({'during a map run' if with_run else 'on the sending screen'}): {json.dumps(result)}"
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
        bad = {"rules": [rule({"kind": "never"}, {"kind": "explore"})]}
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
