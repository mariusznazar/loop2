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
  const { ITEMS } = await data('items.js');
  return {
    ...game.newGame(),
    understanding: {
      actions: Object.keys(ACTIONS),
      conditions: Object.keys(CONDITIONS),
      items: [...Object.keys(ITEMS), CAMPFIRE.id],
    },
  };
}
"""
