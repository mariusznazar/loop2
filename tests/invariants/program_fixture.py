"""Construct program inputs without validating rules or computing expected results."""


def program_from_rules(rules):
    identified = (
        [{**rule, "id": index + 1} if isinstance(rule, dict) else rule
         for index, rule in enumerate(rules)]
        if isinstance(rules, list) else rules
    )
    return {
        "groups": [{"id": 1, "name": "Program", "condition": {"kind": "always"},
                    "rules": identified}],
        "nextGroupId": 2,
        "nextRuleId": len(rules) + 1 if isinstance(rules, list) else 1,
    }


def program_rules(program):
    """Expose fixture rules for input edits without predicting product behavior."""
    return program["groups"][0]["rules"]


# Source text of a JavaScript function for the Node drivers of invariant tests to embed. It gives
# a new game whose Understanding holds everything the built data modules next to `game.js` list:
# every action, every condition, every item and the campfire. It reads the data, so it stays full
# as the data grows. Pass the module `game.js` was imported as and the path it was imported from.
KNOWING_GAME_JS = """
async function newKnowingGame(game, gamePath) {
  const { dirname, join } = await import('node:path');
  const { pathToFileURL } = await import('node:url');
  const data = (name) => import(pathToFileURL(join(dirname(gamePath), 'data', name)).href);
  const { ACTIONS } = await data('actions.js');
  const { CAMPFIRE } = await data('campfire.js');
  const { CONDITIONS } = await data('conditions.js');
  const { CREATURES } = await data('creatures.js');
  const { ITEMS } = await data('items.js');
  return {
    ...game.newGame(),
    understanding: {
      actions: Object.keys(ACTIONS),
      conditions: Object.keys(CONDITIONS),
      items: [...Object.keys(ITEMS), CAMPFIRE.id],
      creatures: Object.keys(CREATURES),
    },
  };
}
"""


# Source text of JavaScript functions for the Node drivers to embed, reading the programs of a game
# state the way the player's list and the map run hold them (D-152): `heldProgram` is the program
# the state edits and carries out, the copy of the map run during one and else the program of the
# list the team goes with (the one last entered with while it is on the list, else the first);
# `heldPrograms` is every program the state holds, the list's programs and the copy.
HELD_PROGRAMS_JS = """
function heldProgram(state) {
  if (state.run) return state.run.copy.program;
  const saved = state.programs.find((p) => p.id === state.lastEnteredProgram) ?? state.programs[0];
  return saved.program;
}
function heldPrograms(state) {
  const programs = state.programs.map((p) => p.program);
  return state.run ? [...programs, state.run.copy.program] : programs;
}
"""
