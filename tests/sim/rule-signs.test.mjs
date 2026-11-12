// What the pick judges of a program rule and rule group: the bar, the reason and the winner, from
// the one function that picks the rule (D-308, D-309, D-310 and D-380). The reasons are those of
// D-380 and D-309, the bars those of D-308.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { sameHex } from "../../dist/browser/sim/hex.js";
import {
  advanceMinutes,
  createCharacter,
  nowAndNext,
  programOf,
  ruleSigns,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import {
  actionFeasible,
  actionRefusal,
  chooseActivity,
  judgeProgram,
} from "../../dist/browser/sim/program.js";
import { newMapRun } from "../../dist/browser/sim/run.js";
import {
  editorRepertoire,
  knownRepertoire,
} from "../../dist/browser/sim/understanding.js";
import { programFromRules } from "./program-fixture.mjs";
import { fullUnderstanding, newKnowingGame } from "./understanding-fixture.mjs";

const map = MAPS.forest;
const T0 = 1_760_000_000_000;
const SENT = { mapId: "forest", characterId: 1 };
const ALWAYS = { kind: "always" };
const NEVER = { kind: "hereBelow", resource: "stick", value: 0 };
const act = (kind) => ({ kind });
const resourceAction = (kind, resource) => ({ kind, resource });
const rule = (id, condition, action) => ({ id, condition, action });
const group = (id, condition, rules) => ({
  id,
  name: `Group ${id}`,
  condition,
  rules,
});
const program = (...groups) => ({
  tripPlan: { take: [], bring: [] },
  nextGroupId: 100,
  nextRuleId: 1000,
  groups,
});

/** A fresh map run of the forest at minute 0, the character on a tile not yet revealed. */
function freshRun() {
  return newMapRun(map, 3, programFromRules(), {
    mapId: "forest",
    characterId: 1,
  }).run;
}

/** The run with the character's tile replaced by `change(tile)`. */
function withHere(run, change) {
  return {
    ...run,
    tiles: run.tiles.map((tile) =>
      sameHex(tile.at, run.character.at) ? change({ ...tile }) : tile,
    ),
  };
}

const revealedHere = (run, stock = {}) =>
  withHere(run, (tile) => ({ ...tile, revealed: true, stock }));

const carrying = (run, pieces) => ({
  ...run,
  character: {
    ...run.character,
    backpack: { ...run.character.backpack, ...pieces },
  },
});

const campfireHere = (run, minutesLeft) => ({
  ...run,
  campfires: [{ at: { ...run.character.at }, minutesLeft }],
});

const refusalOf = (run, action) => actionRefusal(run, map, action);

// What refuses the action, and the words of the reason (D-380). Each case writes the state out.
test("each refusal of an action gives the reason of its row in D-380", () => {
  const here = revealedHere(freshRun(), { stick: 3 });
  const bare = revealedHere(freshRun());
  const alone = { ...freshRun(), tiles: [freshRun().tiles[0]] };
  const aloneAtIt = {
    ...alone,
    character: { ...alone.character, at: alone.tiles[0].at },
  };
  const cases = [
    ["explore on a revealed tile", bare, act("explore"), "kafelek już odkryty"],
    ["wander with no neighbour", aloneAtIt, act("wander"), "nie ma dokąd iść"],
    [
      "walk to a thing no revealed tile holds",
      bare,
      resourceAction("walkTo", "stick"),
      "nie znasz miejsca, gdzie leży patyk",
    ],
    [
      "walk to a thing lying on the character's tile",
      here,
      resourceAction("walkTo", "stick"),
      "patyk leży już tutaj",
    ],
    [
      "walk to a campfire where there is none",
      bare,
      act("walkToCampfire"),
      "nie ma ogniska",
    ],
    [
      "walk to a campfire the character stands at",
      campfireHere(bare, 10),
      act("walkToCampfire"),
      "już przy ognisku",
    ],
    [
      "gather what does not lie here",
      bare,
      resourceAction("gather", "moss"),
      "tu nie leży mech",
    ],
    [
      "patrol what does not lie here",
      bare,
      resourceAction("patrol", "berry"),
      "tu nie leży jagoda",
    ],
    [
      "gather into a full backpack",
      carrying(here, { berry: 60 }),
      resourceAction("gather", "stick"),
      "plecak pełny",
    ],
    [
      "craft a campfire on an unrevealed tile",
      carrying(freshRun(), { stick: 6 }),
      act("craftCampfire"),
      "kafelek nieodkryty",
    ],
    [
      "craft a campfire where one stands",
      carrying(campfireHere(bare, 0), { stick: 6 }),
      act("craftCampfire"),
      "tu już stoi ognisko",
    ],
    [
      "craft a campfire short of sticks",
      carrying(bare, { stick: 2 }),
      act("craftCampfire"),
      "brakuje 4 × patyk",
    ],
    [
      "light a campfire where none stands",
      carrying(bare, { stick: 2 }),
      act("lightCampfire"),
      "tu nie stoi ognisko",
    ],
    [
      "light a campfire that burns",
      carrying(campfireHere(bare, 12), { stick: 2 }),
      act("lightCampfire"),
      "ognisko już płonie",
    ],
    [
      "light a campfire short of sticks",
      carrying(campfireHere(bare, 0), { stick: 1 }),
      act("lightCampfire"),
      "brakuje 1 × patyk",
    ],
    [
      "light a stick on an unrevealed tile",
      carrying(freshRun(), { stick: 1 }),
      act("lightItem"),
      "kafelek nieodkryty",
    ],
    [
      "light a stick with none in the backpack",
      bare,
      act("lightItem"),
      "brakuje 1 × patyk",
    ],
    [
      "feed a campfire that does not burn",
      carrying(campfireHere(bare, 0), { stick: 1 }),
      act("feedCampfire"),
      "tu nie płonie ognisko",
    ],
    [
      "feed a campfire with no fuel",
      campfireHere(bare, 12),
      act("feedCampfire"),
      "brak opału: patyk",
    ],
    ["eat with no berry", bare, act("eat"), "brakuje 1 × jagoda"],
    ["a combat action outside combat", bare, act("kick"), "tylko w walce"],
    [
      "a combat action with a stick outside combat",
      carrying(bare, { stick: 1 }),
      act("strikeWithStick"),
      "tylko w walce",
    ],
  ];
  for (const [name, run, action, reason] of cases) {
    assert.equal(refusalOf(run, action), reason, name);
    assert.equal(actionFeasible(run, map, action), false, name);
  }
});

test("an action that can start gives no reason", () => {
  const run = carrying(revealedHere(freshRun(), { stick: 3 }), {
    stick: 6,
    berry: 1,
  });
  for (const action of [
    act("wander"),
    resourceAction("gather", "stick"),
    act("craftCampfire"),
    act("lightItem"),
    act("eat"),
  ])
    assert.equal(refusalOf(run, action), null, action.kind);
  assert.equal(refusalOf(freshRun(), act("explore")), null);
});

test("a spell short of nature energy gives the energy the character has, rounded down, of what it costs", () => {
  const ready = carrying(revealedHere(freshRun()), { stick: 1 });
  const tired = { ...ready, natureEnergy: 9.5 };
  assert.equal(
    refusalOf(tired, act("lightItem")),
    "brak energii natury: 9 z 10",
  );
  assert.equal(
    refusalOf({ ...ready, natureEnergy: 10 }, act("lightItem")),
    null,
  );
});

test("of several reasons the world and the backpack come before the nature energy", () => {
  const drained = { ...revealedHere(freshRun()), natureEnergy: 0 };
  assert.equal(
    refusalOf(drained, act("lightCampfire")),
    "tu nie stoi ognisko",
    "the energy is not the reason while the world refuses",
  );
  assert.equal(
    refusalOf(carrying(drained, { stick: 1 }), act("lightItem")),
    "brak energii natury: 0 z 10",
  );
});

test("the bar of every rule is judged, below the winning rule too", () => {
  const judged = judgeProgram(
    freshRun(),
    map,
    program(
      group(1, ALWAYS, [
        rule(11, ALWAYS, act("explore")),
        rule(12, ALWAYS, act("wander")),
        rule(13, NEVER, act("wander")),
        rule(14, ALWAYS, act("eat")),
      ]),
    ),
  );
  assert.equal(judged.winner?.id, 11);
  assert.deepEqual(judged.rules[11], { bar: "go", reason: null });
  assert.deepEqual(
    judged.rules[12],
    { bar: "go", reason: null },
    "a rule below the winner that could start is green too",
  );
  assert.deepEqual(judged.rules[13], { bar: "unmet", reason: null });
  assert.deepEqual(judged.rules[14], {
    bar: "blocked",
    reason: "brakuje 1 × jagoda",
  });
});

test("the winner is the first green rule of the first group that holds", () => {
  const judged = judgeProgram(
    freshRun(),
    map,
    program(
      group(1, NEVER, [rule(11, ALWAYS, act("explore"))]),
      group(2, ALWAYS, [
        rule(21, ALWAYS, act("eat")),
        rule(22, ALWAYS, act("wander")),
        rule(23, ALWAYS, act("explore")),
      ]),
    ),
  );
  assert.equal(judged.winner?.id, 22);
});

test("no rule goes: no winner", () => {
  const judged = judgeProgram(
    freshRun(),
    map,
    program(group(1, ALWAYS, [rule(11, ALWAYS, act("eat"))])),
  );
  assert.equal(judged.winner, null);
});

test("every rule of a group whose condition does not hold shows dark with no reason, whatever the rule would say", () => {
  const judged = judgeProgram(
    freshRun(),
    map,
    program(
      group(1, NEVER, [
        rule(11, ALWAYS, act("explore")),
        rule(12, ALWAYS, act("eat")),
      ]),
    ),
  );
  assert.equal(judged.groups[1], "unmet");
  assert.deepEqual(judged.rules[11], { bar: "unmet", reason: null });
  assert.deepEqual(judged.rules[12], { bar: "unmet", reason: null });
});

test("the bar of a group is green when one of its rules can start, amber when none can, and amber when it holds no rule", () => {
  const judged = judgeProgram(
    freshRun(),
    map,
    program(
      group(1, ALWAYS, [
        rule(11, ALWAYS, act("eat")),
        rule(12, NEVER, act("explore")),
      ]),
      group(2, ALWAYS, []),
      group(3, ALWAYS, [
        rule(31, ALWAYS, act("eat")),
        rule(32, ALWAYS, act("explore")),
      ]),
      group(4, NEVER, [rule(41, ALWAYS, act("explore"))]),
    ),
  );
  assert.deepEqual(judged.groups, {
    1: "blocked",
    2: "blocked",
    3: "go",
    4: "unmet",
  });
});

test("a combat rule outside combat is amber with „tylko w walce” when its condition holds, dark when it does not", () => {
  const judged = judgeProgram(
    freshRun(),
    map,
    program(
      group(1, ALWAYS, [
        rule(11, ALWAYS, act("kick")),
        rule(12, NEVER, act("kick")),
      ]),
    ),
  );
  assert.deepEqual(judged.rules[11], {
    bar: "blocked",
    reason: "tylko w walce",
  });
  assert.deepEqual(judged.rules[12], { bar: "unmet", reason: null });
  assert.equal(judged.winner, null);
});

test("in combat the rule the first turn would choose wins, an ordinary rule is amber with „trwa walka”, and a combat action short of its stick says what it lacks", () => {
  const judged = judgeProgram(
    freshRun(),
    map,
    program(
      group(1, ALWAYS, [
        rule(11, ALWAYS, act("explore")),
        rule(12, ALWAYS, act("strikeWithStick")),
        rule(13, ALWAYS, act("kick")),
        rule(14, ALWAYS, act("dodge")),
        rule(15, NEVER, act("kick")),
      ]),
    ),
    { combat: { health: 100, opponentHealth: 24 } },
  );
  assert.equal(judged.winner?.id, 13);
  assert.deepEqual(judged.rules[11], { bar: "blocked", reason: "trwa walka" });
  assert.deepEqual(judged.rules[12], {
    bar: "blocked",
    reason: "brakuje 1 × patyk",
  });
  assert.deepEqual(judged.rules[13], { bar: "go", reason: null });
  assert.deepEqual(
    judged.rules[14],
    { bar: "go", reason: null },
    "a combat rule below the winner that could be chosen is green",
  );
  assert.deepEqual(judged.rules[15], { bar: "unmet", reason: null });
});

test("combat conditions read the health of the two sides given", () => {
  const rules = program(
    group(1, ALWAYS, [
      rule(11, { kind: "healthBelow", value: 50 }, act("kick")),
      rule(12, { kind: "opponentHealthBelow", value: 25 }, act("dodge")),
    ]),
  );
  const at = (health, opponentHealth) =>
    judgeProgram(freshRun(), map, rules, {
      combat: { health, opponentHealth },
    }).rules;
  assert.equal(at(49, 24)[11].bar, "go");
  assert.equal(at(50, 25)[11].bar, "unmet");
  assert.equal(at(50, 24)[12].bar, "go");
  assert.equal(at(50, 25)[12].bar, "unmet");
});

test("stopping at the winner leaves the rules below it unjudged", () => {
  const rules = program(
    group(1, ALWAYS, [
      rule(11, ALWAYS, act("explore")),
      rule(12, ALWAYS, act("wander")),
    ]),
    group(2, ALWAYS, [rule(21, ALWAYS, act("wander"))]),
  );
  const judged = judgeProgram(freshRun(), map, rules, { throughWinner: true });
  assert.equal(judged.winner?.id, 11);
  assert.deepEqual(Object.keys(judged.rules), ["11"]);
  assert.equal(chooseActivity(freshRun(), map, rules).ruleId, 11);
});

/** The state of a map run of the forest for a character that knows everything, program `groups`. */
function sentWith(groups, understanding = fullUnderstanding()) {
  const created = createCharacter(
    { ...newKnowingGame(), understanding },
    "Ala",
  ).state;
  const set = setProgram(created, program(...groups)).state;
  return send(set, SENT, T0).state;
}

test("a rule outside the repertoire is amber with its reason, whether or not its own condition holds", () => {
  // „Obchód” is of a branch the mage did not buy; fibre is a thing the Understanding lacks.
  const understanding = {
    ...fullUnderstanding(),
    items: fullUnderstanding().items.filter((item) => item !== "fiber"),
  };
  const state = sentWith(
    [
      group(1, ALWAYS, [
        rule(11, ALWAYS, resourceAction("patrol", "stick")),
        rule(12, NEVER, resourceAction("patrol", "stick")),
        rule(13, ALWAYS, resourceAction("gather", "fiber")),
        rule(
          14,
          { kind: "itemBelow", item: "fiber", value: 3 },
          act("explore"),
        ),
        rule(15, ALWAYS, act("explore")),
      ]),
    ],
    understanding,
  );
  const { judgement } = ruleSigns(state);
  assert.deepEqual(judgement.rules[11], {
    bar: "blocked",
    reason: "gałąź niewykupiona",
  });
  assert.deepEqual(judgement.rules[12], {
    bar: "blocked",
    reason: "gałąź niewykupiona",
  });
  assert.deepEqual(judgement.rules[13], {
    bar: "blocked",
    reason: "jeszcze nieodkryte: włókno",
  });
  assert.deepEqual(judgement.rules[14], {
    bar: "blocked",
    reason: "jeszcze nieodkryte: włókno",
  });
  assert.deepEqual(judgement.rules[15], { bar: "go", reason: null });
  assert.equal(judgement.winner?.id, 15);
});

test("an undiscovered condition or action is named by its label", () => {
  const known = fullUnderstanding();
  const state = sentWith(
    [
      group(1, ALWAYS, [
        rule(11, { kind: "satietyBelow", value: 50 }, act("explore")),
        rule(12, ALWAYS, act("eat")),
      ]),
    ],
    {
      ...known,
      conditions: known.conditions.filter((kind) => kind !== "satietyBelow"),
      actions: known.actions.filter((kind) => kind !== "eat"),
    },
  );
  const { judgement } = ruleSigns(state);
  assert.equal(
    judgement.rules[11].reason,
    "jeszcze nieodkryte: Sytość poniżej",
  );
  assert.equal(
    judgement.rules[12].reason,
    "jeszcze nieodkryte: Zjedz — jagoda",
  );
});

test("a group whose condition lies outside the repertoire shows dark with its rules, which give no reason though they lie outside it", () => {
  const known = fullUnderstanding();
  const cold = { kind: "temperatureBelow", value: 36 };
  const sent = sentWith(
    [
      group(1, cold, [
        rule(11, ALWAYS, act("explore")),
        rule(12, ALWAYS, resourceAction("patrol", "stick")),
      ]),
      group(2, ALWAYS, [rule(21, ALWAYS, act("wander"))]),
    ],
    {
      ...known,
      conditions: known.conditions.filter(
        (kind) => kind !== "temperatureBelow",
      ),
      actions: known.actions.filter((kind) => kind !== "explore"),
    },
  );
  // The body stands at 34 degrees, so the condition of group 1 holds: only the repertoire can
  // make the group dark.
  const state = {
    ...sent,
    run: { ...sent.run, body: { ...sent.run.body, temperature: 34 } },
  };
  assert.equal(
    judgeProgram(state.run, map, state.run.copy.program).groups[1],
    "go",
    "precondition: without the repertoire the group goes",
  );
  const { judgement } = ruleSigns(state);
  assert.equal(judgement.groups[1], "unmet");
  assert.deepEqual(judgement.rules[11], { bar: "unmet", reason: null });
  assert.deepEqual(judgement.rules[12], { bar: "unmet", reason: null });
  assert.equal(judgement.groups[2], "go");
  assert.equal(judgement.winner?.id, 21);
});

test("the repertoire is checked before the condition, so a rule outside it never wins", () => {
  const known = fullUnderstanding();
  const rules = program(
    group(1, ALWAYS, [
      rule(11, ALWAYS, act("explore")),
      rule(12, ALWAYS, act("wander")),
    ]),
  );
  const state = sentWith(rules.groups, {
    ...known,
    actions: known.actions.filter((kind) => kind !== "explore"),
  });
  assert.equal(ruleSigns(state).judgement.winner.id, 12);
});

test("the winner the signs show is the rule the pick takes, minute after minute, over the program as the character can use it", () => {
  const known = fullUnderstanding();
  const state = sentWith(
    [
      group(1, ALWAYS, [
        rule(11, ALWAYS, resourceAction("patrol", "stick")),
        rule(12, { kind: "satietyBelow", value: 95 }, act("eat")),
        rule(13, ALWAYS, resourceAction("gather", "stick")),
        rule(14, ALWAYS, act("explore")),
        rule(15, ALWAYS, act("wander")),
      ]),
    ],
    { ...known, items: known.items.filter((item) => item !== "berry") },
  );
  let current = state;
  for (let minute = 0; minute < 60; minute += 1) {
    const run = current.run;
    const reduced = programOf(
      current,
      run.copy.program,
      run.character.id,
      run.character.skills,
    );
    const picked = chooseActivity(run, MAPS[run.mapId], reduced);
    assert.equal(
      ruleSigns(current).judgement.winner?.id,
      picked.kind === "rule" ? picked.ruleId : undefined,
      `minute ${run.minute}`,
    );
    current = advanceMinutes(current, 1).state;
  }
});

test("the repertoire the signs read is the editor's, and the knowledge is what the Understanding holds of the archetype with every branch bought", () => {
  const state = sentWith([group(1, ALWAYS, [])]);
  assert.equal(editorRepertoire(state).actions.includes("patrol"), false);
  assert.equal(knownRepertoire(state).actions.includes("patrol"), true);
});

// What the player sees as running, on top of the winner.
const EXPLORE_RULE = rule(7, ALWAYS, act("explore"));
const WANDER_RULE = rule(8, ALWAYS, act("wander"));

test("the rule whose action goes on stands as running when another rule wins now, and not when it is the winner", () => {
  const started = sentWith([group(1, ALWAYS, [EXPLORE_RULE])]);
  assert.equal(started.run.current.activity.ruleId, 7, "precondition");
  assert.equal(ruleSigns(started).running, null, "it is the winner");
  const edited = setProgram(
    started,
    program(group(1, ALWAYS, [WANDER_RULE, EXPLORE_RULE])),
  ).state;
  const signs = ruleSigns(edited);
  assert.equal(signs.judgement.winner.id, 8);
  assert.equal(signs.running, 7);
});

test("a fix of the copy shows at once: a rule that could not start turns green", () => {
  const started = sentWith([group(1, ALWAYS, [EXPLORE_RULE])]);
  const before = setProgram(
    started,
    program(group(1, ALWAYS, [rule(9, ALWAYS, act("eat")), EXPLORE_RULE])),
  ).state;
  assert.equal(ruleSigns(before).judgement.rules[9].bar, "blocked");
  const fixed = {
    ...before,
    run: {
      ...before.run,
      character: {
        ...before.run.character,
        backpack: { ...before.run.character.backpack, berry: 1 },
      },
    },
  };
  assert.equal(ruleSigns(fixed).judgement.rules[9].bar, "go");
});

test("no map run, no signs", () => {
  assert.equal(ruleSigns(newKnowingGame()), null);
});

/** The map run after a death of cold in the next game minute, the activity of the death still on. */
function diedOfCold() {
  const started = sentWith([group(1, ALWAYS, [EXPLORE_RULE])]);
  const dying = {
    ...started,
    run: {
      ...started.run,
      body: { temperature: 34, satiety: 100, health: 0.1 },
    },
  };
  const fallen = advanceMinutes(dying, 1).state;
  assert.equal(fallen.run.death?.cause, "cold", "precondition");
  return fallen;
}

test("after a death of cold the rule whose action was going on stands as running, on the stopped minute", () => {
  const fallen = diedOfCold();
  const edited = setProgram(
    fallen,
    program(group(1, ALWAYS, [WANDER_RULE, EXPLORE_RULE])),
  ).state;
  const signs = ruleSigns(edited);
  assert.equal(signs.judgement.winner.id, 8);
  assert.equal(signs.running, 7);
});

test("after a completion a finished action is no longer running, one still going is", () => {
  const started = sentWith([group(1, ALWAYS, [WANDER_RULE, EXPLORE_RULE])]);
  const completed = (endMinute) => ({
    ...started,
    run: {
      ...started.run,
      minute: 50,
      completion: { minute: 50 },
      current: {
        activity: { kind: "rule", ruleId: 7, action: act("explore") },
        startMinute: 30,
        endMinute,
        stepTo: null,
      },
    },
  });
  assert.equal(ruleSigns(completed(50)).running, null);
  assert.equal(ruleSigns(completed(60)).running, 7);
});

// The minutes of an attack: the first turn's pick, no action going on.
const WOLF_HEALTH = 24;
function fighting(groups) {
  const started = sentWith(groups);
  const activeCombat = {
    creatureId: "wolf",
    attackMinute: 181,
    resolveMinute: 186,
  };
  return {
    ...started,
    run: {
      ...started.run,
      minute: 181,
      current: null,
      activeCombat,
      lastCombat: { ...activeCombat, result: null },
    },
  };
}

test("in the minutes of an attack the signs show the first turn's pick at the health of the mage and of the wolf, and no action is running", () => {
  const state = fighting([
    group(1, ALWAYS, [
      rule(11, ALWAYS, act("explore")),
      rule(
        12,
        { kind: "opponentHealthBelow", value: WOLF_HEALTH },
        act("dodge"),
      ),
      rule(
        13,
        { kind: "opponentHealthBelow", value: WOLF_HEALTH + 1 },
        act("kick"),
      ),
      rule(14, ALWAYS, act("kick")),
    ]),
  ]);
  const signs = ruleSigns(state);
  assert.equal(signs.running, null);
  assert.deepEqual(signs.judgement.rules[11], {
    bar: "blocked",
    reason: "trwa walka",
  });
  assert.equal(
    signs.judgement.rules[12].bar,
    "unmet",
    "the wolf has 24, which is not below 24",
  );
  assert.equal(signs.judgement.winner.id, 13);
  assert.equal(signs.judgement.rules[14].bar, "go");
});

test("after a death in combat no action is running", () => {
  const state = fighting([group(1, ALWAYS, [rule(11, ALWAYS, act("kick"))])]);
  const dying = {
    ...state,
    run: {
      ...state.run,
      minute: 185,
      body: { temperature: 37, satiety: 100, health: 5 },
    },
  };
  const fallen = advanceMinutes(dying, 1).state;
  assert.equal(fallen.run.death?.cause, "combat", "precondition");
  const signs = ruleSigns(fallen);
  assert.equal(signs.running, null);
  assert.equal(signs.judgement.rules[11].bar, "blocked");
  assert.equal(signs.judgement.rules[11].reason, "tylko w walce");
});

// What „Teraz” and „Potem” name (D-334, D-335, D-147): the one function beside `ruleSigns`. The
// expected values are written out from the examples of those decisions and from the data (the
// explore action takes 20 game minutes).
const NOW_WOLF = { kind: "combat", creatureId: "wolf" };

/** The state of a rule's action in its sixth game minute: 5 of 5 minutes at the start, 3 at minute 12. */
function underWay(overrides = {}) {
  const started = sentWith([group(1, ALWAYS, [EXPLORE_RULE])]);
  return {
    ...started,
    ...overrides,
    run: {
      ...started.run,
      minute: 12,
      current: {
        activity: { kind: "rule", ruleId: 7, action: act("explore") },
        startMinute: 10,
        endMinute: 15,
        stepTo: null,
      },
    },
  };
}

/** The state after a death of hunger in the next game minute, the activity of the death still on. */
function diedOfHunger() {
  const started = sentWith([group(1, ALWAYS, [EXPLORE_RULE])]);
  const starving = {
    ...started,
    run: {
      ...started.run,
      body: { temperature: 37, satiety: 20, health: 0.1 },
    },
  };
  const fallen = advanceMinutes(starving, 1).state;
  assert.equal(fallen.run.death?.cause, "hunger", "precondition");
  return fallen;
}

const KICK_OR_WANDER = [
  group(1, ALWAYS, [
    rule(11, ALWAYS, act("kick")),
    rule(12, ALWAYS, act("wander")),
  ]),
];

test("no map run, nothing for Teraz and Potem to name", () => {
  assert.equal(nowAndNext(newKnowingGame()), null);
});

test("Teraz names the action under way with its rule, the minutes left and the minutes in all, as at the start of a map run", () => {
  const started = sentWith([group(1, ALWAYS, [EXPLORE_RULE])]);
  assert.deepEqual(nowAndNext(started).now, {
    kind: "action",
    ruleId: 7,
    action: act("explore"),
    minutesLeft: 20,
    minutes: 20,
  });
  const later = advanceMinutes(started, 2).state;
  assert.equal(later.run.minute, 2, "precondition");
  assert.deepEqual(nowAndNext(later).now, {
    kind: "action",
    ruleId: 7,
    action: act("explore"),
    minutesLeft: 18,
    minutes: 20,
  });
});

test("Teraz reads 3 of 5 minutes at game minute 12 of an action from 10 to 15, paused or not", () => {
  const expected = {
    kind: "action",
    ruleId: 7,
    action: act("explore"),
    minutesLeft: 3,
    minutes: 5,
  };
  assert.deepEqual(nowAndNext(underWay()).now, expected);
  assert.deepEqual(nowAndNext(underWay({ paused: true })).now, expected);
});

test("an action picked in the minute the last one ended has all its minutes left, and one fewer a minute later", () => {
  // Explore takes 20 game minutes and reveals the tile, which turns the rule below it, wander, on.
  const started = sentWith([group(1, ALWAYS, [EXPLORE_RULE, WANDER_RULE])]);
  const picked = advanceMinutes(started, 20).state;
  assert.equal(picked.run.minute, 20, "precondition");
  assert.equal(picked.run.current.startMinute, 20, "precondition");
  const now = nowAndNext(picked).now;
  assert.equal(now.kind, "action");
  assert.equal(now.ruleId, 8);
  assert.equal(now.minutesLeft, now.minutes);
  const next = nowAndNext(advanceMinutes(picked, 1).state).now;
  assert.equal(next.ruleId, 8);
  assert.equal(next.minutesLeft, now.minutes - 1);
  assert.equal(next.minutes, now.minutes);
});

test("Teraz names a wait without a rule or minutes, and Potem names no rule", () => {
  const waiting = sentWith([
    group(1, ALWAYS, [rule(7, NEVER, act("explore"))]),
  ]);
  assert.equal(waiting.run.current.activity.kind, "wait", "precondition");
  assert.deepEqual(nowAndNext(waiting), {
    now: { kind: "wait" },
    next: { kind: "none" },
  });
});

test("Teraz names the creature fought in every minute of an attack, the minute of the attack and the minute of the resolution included, though an ordinary action starts in the latter", () => {
  let state = fighting(KICK_OR_WANDER);
  assert.equal(state.run.minute, 181, "precondition: the minute of the attack");
  for (let minute = 181; minute <= 185; minute += 1) {
    assert.equal(state.run.minute, minute);
    assert.deepEqual(nowAndNext(state).now, NOW_WOLF, `minute ${minute}`);
    state = advanceMinutes(state, 1).state;
  }
  assert.equal(state.run.minute, 186, "precondition: the resolution minute");
  assert.equal(state.run.activeCombat, null, "precondition");
  assert.equal(state.run.death, null, "precondition");
  assert.equal(state.run.current.startMinute, 186, "precondition");
  assert.equal(state.run.current.activity.ruleId, 12, "precondition");
  assert.deepEqual(nowAndNext(state).now, NOW_WOLF);
  const after = advanceMinutes(state, 1).state;
  assert.equal(after.run.minute, 187);
  assert.deepEqual(nowAndNext(after).now, {
    kind: "action",
    ruleId: 12,
    action: act("wander"),
    minutesLeft: after.run.current.endMinute - 187,
    minutes: after.run.current.endMinute - 186,
  });
});

test("Teraz names the cause of a death of cold, of hunger and in combat", () => {
  assert.deepEqual(nowAndNext(diedOfCold()).now, {
    kind: "death",
    cause: "cold",
  });
  assert.deepEqual(nowAndNext(diedOfHunger()).now, {
    kind: "death",
    cause: "hunger",
  });
  const state = fighting([group(1, ALWAYS, [rule(11, ALWAYS, act("kick"))])]);
  const fallen = advanceMinutes(
    {
      ...state,
      run: {
        ...state.run,
        minute: 184,
        body: { temperature: 37, satiety: 100, health: 5 },
      },
    },
    2,
  ).state;
  assert.equal(fallen.run.death?.cause, "combat", "precondition");
  assert.equal(fallen.run.lastCombat.resolveMinute, 186, "precondition");
  assert.equal(
    fallen.run.minute,
    fallen.run.lastCombat.resolveMinute,
    "precondition: the death is in the resolution minute",
  );
  assert.deepEqual(nowAndNext(fallen).now, { kind: "death", cause: "combat" });
});

test("a death after an encounter names its cause, not the fight", () => {
  const state = fighting(KICK_OR_WANDER);
  const resolved = advanceMinutes(state, 5).state;
  const later = {
    ...advanceMinutes(resolved, 1).state,
  };
  const dying = {
    ...later,
    run: {
      ...later.run,
      body: { temperature: 34, satiety: 100, health: 0.1 },
    },
  };
  const fallen = advanceMinutes(dying, 1).state;
  assert.equal(fallen.run.death?.cause, "cold", "precondition");
  assert.notEqual(fallen.run.lastCombat, null, "precondition");
  assert.deepEqual(nowAndNext(fallen).now, { kind: "death", cause: "cold" });
});

test("Teraz names the completion with the text of the map, also while an action goes on and in a resolution minute", () => {
  const started = sentWith([group(1, ALWAYS, [WANDER_RULE, EXPLORE_RULE])]);
  const completed = {
    ...started,
    run: {
      ...started.run,
      minute: 50,
      completion: { minute: 50 },
      current: {
        activity: { kind: "rule", ruleId: 7, action: act("explore") },
        startMinute: 30,
        endMinute: 60,
        stepTo: null,
      },
    },
  };
  assert.deepEqual(nowAndNext(completed).now, {
    kind: "completion",
    text: "Las rozwiązany",
  });
  // The resolution minute of an attack on the second map, the map run complete in it.
  const deep = send(
    {
      ...setProgram(
        createCharacter({ ...newKnowingGame(), solvedMaps: ["forest"] }, "Ala")
          .state,
        program(...KICK_OR_WANDER),
      ).state,
    },
    { mapId: "forestDeep", characterId: 1 },
    T0,
  ).state;
  const activeCombat = {
    creatureId: "wolf",
    attackMinute: 181,
    resolveMinute: 186,
  };
  const fought = advanceMinutes(
    {
      ...deep,
      run: {
        ...deep.run,
        minute: 181,
        current: null,
        activeCombat,
        lastCombat: { ...activeCombat, result: null },
      },
    },
    5,
  ).state;
  assert.equal(fought.run.lastCombat.resolveMinute, fought.run.minute);
  assert.deepEqual(
    nowAndNext({
      ...fought,
      run: { ...fought.run, completion: { minute: 186 } },
    }).now,
    { kind: "completion", text: "Las — głębiej rozwiązany" },
  );
});

test("Potem names the winner of the judgement the signs show: the rule that wins now, which is not the rule under way", () => {
  const started = sentWith([group(1, ALWAYS, [EXPLORE_RULE])]);
  assert.deepEqual(nowAndNext(started).next, {
    kind: "rule",
    ruleId: 7,
    action: act("explore"),
  });
  const edited = setProgram(
    started,
    program(group(1, ALWAYS, [WANDER_RULE, EXPLORE_RULE])),
  ).state;
  const named = nowAndNext(edited);
  assert.equal(named.now.ruleId, 7, "Teraz stays with the rule that started");
  assert.deepEqual(named.next, {
    kind: "rule",
    ruleId: 8,
    action: act("wander"),
  });
  assert.equal(named.next.ruleId, ruleSigns(edited).judgement.winner.id);
});

test("Potem names no rule where none wins, in the minutes of an attack too", () => {
  const idle = sentWith([group(1, ALWAYS, [rule(7, NEVER, act("explore"))])]);
  assert.deepEqual(nowAndNext(idle).next, { kind: "none" });
  const fight = fighting([group(1, ALWAYS, [rule(7, ALWAYS, act("explore"))])]);
  const named = nowAndNext(fight);
  assert.deepEqual(named.now, NOW_WOLF);
  assert.deepEqual(named.next, { kind: "none" });
});

test("in the minutes of an attack Potem names the combat rule the turn would choose, not the rule an ordinary pick would take", () => {
  const state = fighting([
    group(1, ALWAYS, [
      rule(11, ALWAYS, act("explore")),
      rule(
        12,
        { kind: "opponentHealthBelow", value: WOLF_HEALTH },
        act("dodge"),
      ),
      rule(13, ALWAYS, act("kick")),
    ]),
  ]);
  assert.equal(
    chooseActivity(state.run, MAPS.forest, state.run.copy.program).ruleId,
    11,
    "precondition: an ordinary pick takes the first rule",
  );
  const named = nowAndNext(state);
  assert.deepEqual(named.now, NOW_WOLF);
  assert.deepEqual(named.next, {
    kind: "rule",
    ruleId: 13,
    action: act("kick"),
  });
  assert.equal(named.next.ruleId, ruleSigns(state).judgement.winner.id);
});

test("after a death Potem names the rule that wins at the stopped minute", () => {
  const fallen = diedOfCold();
  const edited = setProgram(
    fallen,
    program(group(1, ALWAYS, [WANDER_RULE, EXPLORE_RULE])),
  ).state;
  const named = nowAndNext(edited);
  assert.deepEqual(named.now, { kind: "death", cause: "cold" });
  assert.deepEqual(named.next, {
    kind: "rule",
    ruleId: 8,
    action: act("wander"),
  });
  assert.equal(named.next.ruleId, ruleSigns(edited).judgement.winner.id);
});

test("Teraz and Potem change nothing in the state they read", () => {
  for (const state of [underWay(), fighting(KICK_OR_WANDER), diedOfCold()]) {
    const before = structuredClone(state);
    nowAndNext(state);
    assert.deepEqual(state, before);
  }
});
