"""Invariant character-team: Every character belongs to exactly one team.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `createCharacter`, `setProgram`,
`send`, `advanceMinutes`, `restart` and `end`. After every input the script records the JSON of the
whole game state, or, where the function threw, the error and the state as it stood before.
The `newGame` step starts from a game whose Understanding holds everything the built data
modules list, as `KNOWING_GAME_JS` in `program_fixture.py` gives it, so that the rules of the
program stay what the check drives.

Reading of the sentence:
- a character: an entry of a team's list of characters, and the character a map run carries,
  which names a character by its `id`;
- a team: the game state's one team, `team`, with its list `characters`;
- belongs to exactly one team: each id of a team's list stands once in the lists of all teams
  taken together, and the id of the map run's character stands once in them.

Scenario (written out below): a new game, three characters created, two of them under the same
name and one typed with white space around it, a send of the second character to the map Las
(`forest`), 30 game minutes, a restart, an end, a send of the third character, a character created
during that map run, an end.

Controls, so the check can fail: sends of character ids no team holds — 0, the next id not yet
given, the id written as a string, none — must each be refused, leaving the game state as it
stood, while a send of a character of the team is taken; a send of another id the simulation took
would give a map run whose character belongs to no team. The scenario must create more than one character,
two of them sharing a name, and send two different characters, so the compared ids are not
trivial.

Does NOT cover: a game state no function of the simulation returned; maps other than Las.
"""

import json
import os
import shutil
import tempfile
import unittest

import loop2_invariant_support as support
from program_fixture import KNOWING_GAME_JS, program_from_rules

GAME_MODULE = "dist/public/sim/game.js"
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

DRIVER = KNOWING_GAME_JS + r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, stepsPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const steps = JSON.parse(readFileSync(stepsPath, 'utf8'));
let state;
const records = [];
for (const [name, ...args] of steps) {
  let error = null;
  try {
    state = name === 'newGame' ? await newKnowingGame(game, gamePath) : game[name](state, ...args).state;
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
    return found


class CharacterTeam(unittest.TestCase):

    def test_every_character_of_every_state_belongs_to_one_team(self):
        # invariant: character-team
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


if __name__ == "__main__":
    unittest.main()
