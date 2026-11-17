"""Invariant character-team: Every character belongs to exactly one team.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/browser/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `createCharacter`, `setProgram`,
`send`, `advanceMinutes`, `restart` and `end` of `game.js`, `startLoop`, `advanceLoopRun`,
`endLoopRun`, `stopLoop` and `catchUp` of `loop.js`, and the load of a saved game state
(`savedGame` and `loadSavedGame` of `saved-game.js`, as the `reload` step: the state stamped with
a save time, written as a document, read as the JSON text it becomes and loaded). After every input
the script records the JSON of the whole game state, or, where the function threw or the load
refused, the error and the state as it stood before.
The `newGame` step starts from a game whose Understanding holds everything the built data
modules list, as `KNOWING_GAME_JS` in `program_fixture.py` gives it, so that the rules of the
program stay what the check drives.

Reading of the sentence:
- a character: an entry of a team's list of characters, the character a map run carries, which
  names a character by its `id` — the map run the player sends a character to and the map run of
  each earning loop — and the character number each earning loop stands under;
- a team: the game state's one team, `team`, with its list `characters`;
- belongs to exactly one team: each id of a team's list stands once in the lists of all teams
  taken together, and the id of the map run's character, of each earning loop's and the number
  each earning loop stands under stand once in them.

Scenario (written out below): a new game, three characters created, two of them under the same
name and one typed with white space around it, a send of the second character to the map Las
(`forest`), 30 game minutes, a restart, an end, a send of the third character, a character created
during that map run, an end.

Scenario of the load and the earning loops (written out below): a new game, three characters
created, an earning loop of the first on Skraj lasu (`forestEdge`), a load, a send of the second
to Las beside the loop, the loop's map run to its end and the end taken, a load with a map run and a
loop at once, a character created, a loop of the fourth, a load, the catch-up of 400 game minutes
from the load's save time, which takes the loops through a death each, a load, the end of the map
run and a last load; after every one of them the team holds the characters it held.

Controls, so the check can fail: sends of character ids no team holds — 0, the next id not yet
given, the id written as a string, none — must each be refused, leaving the game state as it
stood, while a send of a character of the team is taken; a send of another id the simulation took
would give a map run whose character belongs to no team. Starts of an earning loop for such ids
must each be refused with the very state, while the start for a character of the team is taken.
Documents of a game with a map run and a loop, each altered so that a loop or the map run names a
character no team holds, the id of a map run's character is a string or absent, or two entries of
the team's list bear one id, must
each be refused by the load, leaving the game state as it stood, while the document unaltered is
loaded. The reading must flag made-up states of the same kinds. The scenarios must create more
than one character, two of them sharing a name, and send two different characters, so the compared
ids are not trivial.

Does NOT cover: a game state no function of the simulation returned; maps other than Las and Skraj
lasu.
"""

import json
import os
import shutil
import tempfile
import unittest

import loop2_invariant_support as support
from program_fixture import KNOWING_GAME_JS, program_from_rules

GAME_MODULE = "dist/browser/sim/game.js"
T = 1760000000000
T_OTHER = 1760000123456
ALWAYS = {"kind": "always"}
PROGRAM = program_from_rules([{"condition": ALWAYS, "action": {"kind": "explore"}},
                              {"condition": ALWAYS, "action": {"kind": "wander"}}])


def sent(character_id):
    """The ids `send` takes for the map Las and the given character."""
    return {"mapId": "forest", "characterId": character_id}


# Characters take the ids 1, 2, 3 … in the order they are created.
STEPS = [
    ["newGame"], ["setProgram", PROGRAM],
    ["createCharacter", "Ala"], ["createCharacter", "  Ola "], ["createCharacter", "Ala"],
    ["send", sent(2), T], ["advanceMinutes", 30], ["restart"], ["end"],
    ["send", sent(3), T_OTHER], ["createCharacter", "Ela"], ["advanceMinutes", 5], ["end"],
]
REFUSED_SENDS = [sent(0), sent(4), sent("1"), {"mapId": "forest"}]
CONTROL_STEPS = (
    [["newGame"], ["setProgram", PROGRAM], ["createCharacter", "Ala"],
     ["createCharacter", "Ola"], ["createCharacter", "Ela"]]
    + [["send", ids, T] for ids in REFUSED_SENDS]
    + [["send", sent(1), T]]
)

# The earning loops are on Skraj lasu (`forestEdge`), the one map the new game of the driver has
# solved. A game minute of a loop passes in 60 real seconds.
LOOP_MINUTE_MS = 60000
CATCH_UP_MINUTES = 400


def looped(character_id):
    """The ids `startLoop` takes for Skraj lasu and the given character."""
    return {"mapId": "forestEdge", "characterId": character_id}


# Characters take the ids 1, 2, 3, 4 in the order they are created.
LOAD_AT = T + 5000
LOOP_STEPS = [
    ["newGame"], ["setProgram", PROGRAM],
    ["createCharacter", "Ala"], ["createCharacter", "  Ola "], ["createCharacter", "Ala"],
    ["startLoop", looped(1), T], ["reload", T + 1000],
    ["send", sent(2), T_OTHER], ["advanceLoopRun", 1, 5000], ["endLoopRun", 1, T + 2000],
    ["reload", T + 3000],
    ["createCharacter", "Ela"], ["startLoop", looped(4), T + 4000], ["reload", LOAD_AT],
    ["catchUp", LOAD_AT + CATCH_UP_MINUTES * LOOP_MINUTE_MS],
    ["reload", LOAD_AT + CATCH_UP_MINUTES * LOOP_MINUTE_MS], ["end"],
    ["reload", LOAD_AT + CATCH_UP_MINUTES * LOOP_MINUTE_MS + 1000],
]

REFUSED_LOOP_STARTS = [looped(0), looped(4), looped("1"), {"mapId": "forestEdge"}]
LOOP_CONTROL_STEPS = (
    [["newGame"], ["setProgram", PROGRAM], ["createCharacter", "Ala"],
     ["createCharacter", "Ola"], ["createCharacter", "Ela"]]
    + [["startLoop", ids, T] for ids in REFUSED_LOOP_STARTS]
    + [["startLoop", looped(1), T]]
)


def change(path, **how):
    """One alteration of a saved document, at the path of keys and list places from its top."""
    return dict(path=path, **how)


# A game with the earning loop of character 1 and the map run of character 2, saved and altered at
# one place each, so that the document names a character no team holds or one twice.
ALTERED_DOCUMENTS = [
    ("a loop under a character no team holds", [change(["game", "loops", "1"], rename="9")]),
    ("a loop's map run carrying a character no team holds",
     [change(["game", "loops", "1", "run", "character", "id"], set=9)]),
    ("a loop's map run carrying a character id written as a string",
     [change(["game", "loops", "1", "run", "character", "id"], set="1")]),
    ("a loop's map run carrying no character id",
     [change(["game", "loops", "1", "run", "character", "id"], remove=True)]),
    ("a map run carrying a character no team holds",
     [change(["game", "run", "character", "id"], set=9)]),
    ("a map run carrying a character id written as a string",
     [change(["game", "run", "character", "id"], set="2")]),
    ("two entries of the team's list under one id",
     [change(["game", "team", "characters", 2, "id"], set=1)]),
]
LOAD_CONTROL_STEPS = (
    [["newGame"], ["setProgram", PROGRAM], ["createCharacter", "Ala"],
     ["createCharacter", "Ola"], ["createCharacter", "Ela"],
     ["startLoop", looped(1), T], ["send", sent(2), T_OTHER]]
    + [["reloadAltered", T + 1000, changes] for _label, changes in ALTERED_DOCUMENTS]
    + [["reload", T + 1000]]
)

DRIVER = KNOWING_GAME_JS + r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const [gamePath, stepsPath, outPath] = process.argv.slice(2);
const sibling = (name) => import(pathToFileURL(join(dirname(gamePath), name)).href);
const game = await import(pathToFileURL(gamePath).href);
const loop = await sibling('loop.js');
const saved = await sibling('saved-game.js');
const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));

// The document of `state` stamped with the save time `nowMs`, as the JSON text it becomes.
const documentOf = (state, nowMs) =>
  JSON.parse(JSON.stringify(saved.savedGame(game.withSaveTime(state, nowMs))));

// One alteration of a document: a value set, a key renamed or a key removed.
function alter(document, { path, set, rename, remove }) {
  let at = document;
  for (const part of path.slice(0, -1)) at = at[part];
  const last = path[path.length - 1];
  if (remove) delete at[last];
  else if (rename !== undefined) { at[rename] = at[last]; delete at[last]; }
  else at[last] = set;
}

function load(document) {
  const loaded = saved.loadSavedGame(document);
  if (!loaded.ok) throw new Error('the load refused the document as ' + loaded.reason);
  return loaded.state;
}

async function apply(name, state, args) {
  if (name === 'newGame') return newKnowingGame(game, gamePath);
  if (name === 'reload') return load(documentOf(state, args[0]));
  if (name === 'reloadAltered') {
    const document = documentOf(state, args[0]);
    for (const alteration of args[1]) alter(document, alteration);
    return load(document);
  }
  const step = game[name] ?? loop[name];
  return step(state, ...args).state;
}

let state;
const records = [];
for (const [name, ...args] of steps) {
  let error = null;
  try {
    state = await apply(name, state, args);
  } catch (thrown) {
    error = String(thrown);
  }
  records.push({ step: name, error, state: JSON.parse(JSON.stringify(state)) });
}
writeFileSync(outPath, JSON.stringify(records));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def drive(steps):
    game = support.built_copy().file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}")
    directory = tempfile.mkdtemp(prefix="loop2-character-team-")
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


def teams(state):
    """The teams of a game state: its one team."""
    return [state["team"]]


def team_ids(state):
    """The id of every entry of every team's list of characters, in order."""
    return [character["id"] for team in teams(state) for character in team["characters"]]


def membership_errors(index, record):
    """What breaks the sentence in one recorded state, as messages."""
    state = record["state"]
    ids = team_ids(state)
    found = [f"step {index} ({record['step']}): the character {i!r} stands {ids.count(i)} times "
             "in the lists of the teams" for i in sorted(set(ids), key=str) if ids.count(i) != 1]
    run = state.get("run")
    if run is not None:
        carried = run["character"].get("id")
        if ids.count(carried) != 1:
            found.append(f"step {index} ({record['step']}): the map run's character {carried!r} "
                         f"stands {ids.count(carried)} times in the lists of the teams")
    for key, loop in state.get("loops", {}).items():
        carried = loop["run"]["character"].get("id")
        if ids.count(carried) != 1:
            found.append(f"step {index} ({record['step']}): the character {carried!r} of the map "
                         f"run of the earning loop {key} stands {ids.count(carried)} times in the "
                         "lists of the teams")
        numbers = [str(i) for i in ids]
        if numbers.count(key) != 1:
            found.append(f"step {index} ({record['step']}): the earning loop stands under the "
                         f"character {key}, which stands {numbers.count(key)} times in the lists "
                         "of the teams")
    return found


class CharacterTeam(unittest.TestCase):

    def test_every_character_of_every_state_belongs_to_one_team(self):
        # invariant: character-team
        # decision: D-52 "A character has a name, which the player types when creating it; a name that is empty, also once the white space at its start and end is trimmed, creates no character, and two characters may bear the same name"
        # decision: D-56 "A map run names the team's character it carries by that number"
        records = drive(STEPS)
        self.assertEqual(len(records), len(STEPS))
        errors = [r["error"] for r in records if r["error"]]
        self.assertEqual(errors, [], "a step of the scenario was refused")
        found = [m for i, r in enumerate(records) for m in membership_errors(i, r)]
        self.assertEqual(found, [])
        last = records[-1]["state"]
        names = [c["name"] for c in last["team"]["characters"]]
        self.assertEqual(names, ["Ala", "Ola", "Ala", "Ela"],
                         "the scenario does not hold the characters it is meant to")
        carried = {r["state"]["run"]["character"]["id"] for r in records if r["state"]["run"]}
        self.assertEqual(carried, {2, 3}, "the scenario does not send two different characters")

    def test_a_send_of_a_character_no_team_holds_is_refused(self):
        # invariant: character-team
        # decision: D-56 "A map run names the team's character it carries by that number"
        records = drive(CONTROL_STEPS)
        found = [m for i, r in enumerate(records) for m in membership_errors(i, r)]
        self.assertEqual(found, [])
        first = len(CONTROL_STEPS) - len(REFUSED_SENDS) - 1
        before = records[first - 1]["state"]
        for offset, ids in enumerate(REFUSED_SENDS):
            record = records[first + offset]
            self.assertIsNotNone(record["error"], f"the send of {ids} was taken")
            self.assertEqual(record["state"], before, f"the refused send of {ids} changed the game")
        taken = records[-1]
        self.assertIsNone(taken["error"], "the send of a character of the team was refused")
        self.assertEqual(taken["state"]["run"]["character"]["id"], 1)

    def test_every_character_through_a_load_and_an_earning_loop_belongs_to_one_team(self):
        # invariant: character-team
        records = drive(LOOP_STEPS)
        self.assertEqual(len(records), len(LOOP_STEPS))
        errors = [(i, r["step"], r["error"]) for i, r in enumerate(records) if r["error"]]
        self.assertEqual(errors, [], "a step of the scenario was refused")
        found = [m for i, r in enumerate(records) for m in membership_errors(i, r)]
        self.assertEqual(found, [])
        names = [c["name"] for c in records[-1]["state"]["team"]["characters"]]
        self.assertEqual(names, ["Ala", "Ola", "Ala", "Ela"],
                         "the scenario does not hold the characters it is meant to")
        looping = {int(key) for r in records for key in r["state"]["loops"]}
        self.assertEqual(looping, {1, 4}, "the scenario does not put two characters into loops")
        beside = [i for i, r in enumerate(records) if r["state"]["run"] and r["state"]["loops"]]
        self.assertTrue(beside, "no state of the scenario holds a map run and a loop at once")
        loaded = [i for i, r in enumerate(records) if r["step"] == "reload"]
        self.assertTrue(any(i in beside for i in loaded),
                        "no load of the scenario brings back a map run and a loop at once")
        self.assertTrue(any(records[i]["state"]["loops"] for i in loaded[:3]),
                        "no load of the scenario brings back an earning loop")
        caught = next(i for i, r in enumerate(records) if r["step"] == "catchUp")
        for key in ("1", "4"):
            self.assertGreater(records[caught]["state"]["loops"][key]["runNumber"],
                               records[caught - 1]["state"]["loops"][key]["runNumber"],
                               "the catch-up carries a loop through no end of a map run")

    def test_a_start_of_a_loop_for_a_character_no_team_holds_is_refused(self):
        # invariant: character-team
        records = drive(LOOP_CONTROL_STEPS)
        found = [m for i, r in enumerate(records) for m in membership_errors(i, r)]
        self.assertEqual(found, [])
        first = len(LOOP_CONTROL_STEPS) - len(REFUSED_LOOP_STARTS) - 1
        before = records[first - 1]["state"]
        for offset, ids in enumerate(REFUSED_LOOP_STARTS):
            record = records[first + offset]
            self.assertIsNone(record["error"], f"the start for {ids} threw")
            self.assertEqual(record["state"], before, f"the refused start for {ids} changed the game")
        taken = records[-1]
        self.assertIsNone(taken["error"], "the start for a character of the team threw")
        self.assertEqual(sorted(taken["state"]["loops"]), ["1"],
                         "the start for a character of the team was refused")
        self.assertEqual(taken["state"]["loops"]["1"]["run"]["character"]["id"], 1)

    def test_a_load_naming_a_character_no_team_holds_or_one_twice_is_refused(self):
        # invariant: character-team
        records = drive(LOAD_CONTROL_STEPS)
        found = [m for i, r in enumerate(records) for m in membership_errors(i, r)]
        self.assertEqual(found, [])
        first = len(LOAD_CONTROL_STEPS) - len(ALTERED_DOCUMENTS) - 1
        before = records[first - 1]["state"]
        self.assertEqual(sorted(before["loops"]), ["1"], "the game saved holds no loop of 1")
        self.assertEqual(before["run"]["character"]["id"], 2, "the game saved holds no map run of 2")
        for offset, (label, _changes) in enumerate(ALTERED_DOCUMENTS):
            record = records[first + offset]
            self.assertIn("the load refused the document", record["error"] or "",
                          f"the load of a document with {label} was taken")
            self.assertEqual(record["state"], before, f"the refused load of {label} changed the game")
        taken = records[-1]
        self.assertIsNone(taken["error"], "the load of the document unaltered was refused")
        self.assertEqual(sorted(taken["state"]["loops"]), ["1"])
        self.assertEqual(taken["state"]["run"]["character"]["id"], 2)

    def test_control_the_reading_flags_a_loop_or_a_map_run_of_no_character_of_the_team(self):
        # invariant: character-team
        def record(characters, run, loops):
            return {"step": "made up", "state": {
                "team": {"characters": [{"id": i} for i in characters]}, "run": run, "loops": loops}}

        def loop(character):
            return {"run": {"character": {"id": character}}}

        self.assertEqual(membership_errors(0, record([1, 2], {"character": {"id": 2}}, {"1": loop(1)})), [])
        self.assertTrue(membership_errors(0, record([1, 2], None, {"1": loop(9)})),
                        "a loop whose map run carries no character of the team goes unseen")
        self.assertTrue(membership_errors(0, record([1, 2], None, {"9": loop(1)})),
                        "a loop under a character no team holds goes unseen")
        self.assertTrue(membership_errors(0, record([1, 2], None, {"1": loop("1")})),
                        "a loop whose map run carries the id as a string goes unseen")
        self.assertTrue(membership_errors(0, record([1, 1], None, {"1": loop(1)})),
                        "a character of the team listed twice goes unseen")


if __name__ == "__main__":
    unittest.main()
