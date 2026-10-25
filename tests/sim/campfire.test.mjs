import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/public/sim/data/actions.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  hexDistance,
  neighbours,
  offsetToAxial,
  sameHex,
} from "../../dist/public/sim/hex.js";
import {
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import { actionFeasible } from "../../dist/public/sim/program.js";
import { newMapRun, stepMinute } from "../../dist/public/sim/run.js";
import { programFromRules } from "./program-fixture.mjs";

// The campfire, the burning stick and eating (task, To do 7–12; D-26, D-63, D-68, D-69, D-71,
// D-72). Every number below is written out by hand from the task: crafting lasts 20 game minutes
// and uses 6 sticks, lighting a campfire 5 minutes and 2 sticks and gives it 60 minutes of
// burning, lighting a stick 5 minutes and the stick, which burns 3 minutes, feeding 5 minutes and
// one stick, which adds 20 minutes, eating 5 minutes and one berry, which gives 25 satiety, not
// above 100. On Las the body cools by 0.002 × (37 − 25) = 0.024 °C a minute; a burning campfire
// warms the character on its tile by 0.5 °C and a burning stick by 0.15 °C a minute.

const [mapId, forest] = Object.entries(MAPS)[0];
// The first character a new game creates takes the id 1.
const characterId = 1;
const [stick, berry, moss] = forest.resources.map((resource) => resource.id);
const entrance = offsetToAxial(forest.entrance.col, forest.entrance.row);

const ALWAYS = { kind: "always" };
const WANDER = { kind: "wander" };
const CRAFT = { kind: "craftCampfire" };
const LIGHT_CAMPFIRE = { kind: "lightCampfire" };
const LIGHT_ITEM = { kind: "lightItem" };
const FEED = { kind: "feedCampfire" };
const EAT = { kind: "eat" };
const TO_CAMPFIRE = { kind: "walkToCampfire" };
const NEW_ACTIONS = [CRAFT, LIGHT_CAMPFIRE, LIGHT_ITEM, FEED, EAT, TO_CAMPFIRE];
const rule = (condition, action) => ({ condition, action });
const IDLE = programFromRules();

const body = (temperature, satiety, health) => ({
  temperature,
  satiety,
  health,
});

/** A map run of Las at minute 0 with no program rules, with the given fields replaced. */
function handMade(fields = {}) {
  const { run } = newMapRun(forest, 3, IDLE, { mapId, characterId });
  return { ...run, ...fields };
}

/** The run with the character's tile revealed or not. */
function revealedHere(run, revealed) {
  return {
    ...run,
    tiles: run.tiles.map((tile) =>
      sameHex(tile.at, run.character.at) ? { ...tile, revealed } : tile,
    ),
  };
}

/** A backpack holding the given pieces and nothing else. */
function backpackOf(run, pieces) {
  const backpack = Object.fromEntries(
    Object.keys(run.character.backpack).map((id) => [id, 0]),
  );
  return { ...backpack, ...pieces };
}

function carrying(run, pieces) {
  return {
    ...run,
    character: { ...run.character, backpack: backpackOf(run, pieces) },
  };
}

/**
 * A revealed entrance, the given backpack and campfires, and a body at 5 °C, so that warmth shows
 * minute by minute, far below the cap of 37.0 °C.
 */
function at(pieces = {}, campfires = [], revealed = true) {
  return carrying(
    revealedHere(handMade({ campfires, body: body(5, 100, 100) }), revealed),
    pieces,
  );
}

/** The run at a free minute: its current activity is a wait ending at the next minute. */
function freeNextMinute(run) {
  return {
    ...run,
    current: {
      activity: { kind: "wait" },
      startMinute: run.minute,
      endMinute: run.minute + 1,
      stepTo: null,
    },
  };
}

/** The run with `action` as its current activity, ending in the next minute. */
function endingNext(run, action) {
  return {
    ...run,
    current: {
      activity: { kind: "rule", ruleIndex: 0, action },
      startMinute: run.minute - 4,
      endMinute: run.minute + 1,
      stepTo: null,
    },
  };
}

/** The run after `minutes` game minutes, each one step, with `stepProgram`. */
function after(run, minutes, stepProgram = IDLE) {
  let current = run;
  for (let i = 0; i < minutes; i += 1)
    current = stepMinute(current, forest, stepProgram).run;
  return current;
}

/** The minutes, from `run.minute + 1` on, in which the body warmed rather than cooled. */
function warmMinutes(run, minutes) {
  const warm = [];
  let current = run;
  for (let i = 0; i < minutes; i += 1) {
    const next = stepMinute(current, forest, IDLE).run;
    if (next.body.temperature > current.body.temperature)
      warm.push(next.minute);
    current = next;
  }
  return warm;
}

const range = (from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

const burning = (minutesLeft) => [{ at: entrance, minutesLeft }];

test("the six actions are on the closed list with the task's labels and minutes", () => {
  const listed = Object.fromEntries(
    NEW_ACTIONS.map(({ kind }) => [
      kind,
      [ACTIONS[kind]?.label, ACTIONS[kind]?.minutes],
    ]),
  );
  assert.deepEqual(listed, {
    craftCampfire: ["Wytwórz — ognisko", 20],
    lightCampfire: ["Zapal — ognisko", 5],
    lightItem: ["Zapal — patyk", 5],
    feedCampfire: ["Zasil — ognisko", 5],
    eat: ["Zjedz — jagoda", 5],
    walkToCampfire: ["Idź — ognisko", null],
  });
  for (const { kind } of NEW_ACTIONS)
    assert.ok(ACTIONS[kind].status.length > 0, `${kind} has a status text`);
});

test("„Wytwórz — ognisko” is feasible on a revealed tile without a campfire, with 6 sticks", () => {
  assert.equal(actionFeasible(at({ [stick]: 6 }), forest, CRAFT), true);
  assert.equal(actionFeasible(at({ [stick]: 9 }), forest, CRAFT), true);
  assert.equal(
    actionFeasible(at({ [stick]: 5, [berry]: 4 }), forest, CRAFT),
    false,
    "5 sticks",
  );
  assert.equal(
    actionFeasible(at({ [stick]: 6 }, [], false), forest, CRAFT),
    false,
    "a tile not revealed",
  );
  for (const minutesLeft of [0, 30]) {
    assert.equal(
      actionFeasible(at({ [stick]: 6 }, burning(minutesLeft)), forest, CRAFT),
      false,
      `a campfire with ${minutesLeft} minutes already stands here`,
    );
  }
  const away = neighbours(handMade().tiles, entrance)[0].at;
  assert.equal(
    actionFeasible(
      at({ [stick]: 6 }, [{ at: away, minutesLeft: 0 }]),
      forest,
      CRAFT,
    ),
    true,
    "a campfire on another tile",
  );
});

test("„Zapal — ognisko” is feasible at a campfire here that is not burning, with 2 sticks", () => {
  assert.equal(
    actionFeasible(at({ [stick]: 2 }, burning(0)), forest, LIGHT_CAMPFIRE),
    true,
  );
  assert.equal(
    actionFeasible(at({ [stick]: 1 }, burning(0)), forest, LIGHT_CAMPFIRE),
    false,
    "1 stick",
  );
  assert.equal(
    actionFeasible(at({ [stick]: 2 }, burning(12)), forest, LIGHT_CAMPFIRE),
    false,
    "already burning",
  );
  assert.equal(
    actionFeasible(at({ [stick]: 2 }), forest, LIGHT_CAMPFIRE),
    false,
    "no campfire",
  );
  const away = neighbours(handMade().tiles, entrance)[0].at;
  assert.equal(
    actionFeasible(
      at({ [stick]: 2 }, [{ at: away, minutesLeft: 0 }]),
      forest,
      LIGHT_CAMPFIRE,
    ),
    false,
    "a campfire on another tile",
  );
});

test("„Zapal — patyk” is feasible on a revealed tile with a stick, and nowhere else", () => {
  assert.equal(actionFeasible(at({ [stick]: 1 }), forest, LIGHT_ITEM), true);
  assert.equal(
    actionFeasible(at({ [stick]: 1 }, burning(30)), forest, LIGHT_ITEM),
    true,
    "beside a campfire too",
  );
  assert.equal(
    actionFeasible(at({ [stick]: 1 }, [], false), forest, LIGHT_ITEM),
    false,
    "a tile not revealed",
  );
  assert.equal(
    actionFeasible(at({ [berry]: 3, [moss]: 2 }), forest, LIGHT_ITEM),
    false,
    "nothing that can be lit",
  );
});

test("„Zasil — ognisko” is feasible at a burning campfire here, with a piece of fuel", () => {
  assert.equal(
    actionFeasible(at({ [stick]: 1 }, burning(1)), forest, FEED),
    true,
  );
  assert.equal(
    actionFeasible(at({ [stick]: 1 }, burning(0)), forest, FEED),
    false,
    "extinguished",
  );
  assert.equal(
    actionFeasible(at({ [berry]: 2 }, burning(30)), forest, FEED),
    false,
    "no fuel",
  );
  assert.equal(
    actionFeasible(at({ [stick]: 1 }), forest, FEED),
    false,
    "no campfire",
  );
  const away = neighbours(handMade().tiles, entrance)[0].at;
  assert.equal(
    actionFeasible(
      at({ [stick]: 1 }, [{ at: away, minutesLeft: 30 }]),
      forest,
      FEED,
    ),
    false,
    "a campfire on another tile",
  );
});

test("„Zjedz — jagoda” is feasible with a piece of food, and not without", () => {
  assert.equal(actionFeasible(at({ [berry]: 1 }), forest, EAT), true);
  assert.equal(
    actionFeasible(at({ [berry]: 1 }, [], false), forest, EAT),
    true,
    "on a tile not revealed too",
  );
  assert.equal(actionFeasible(at({ [stick]: 5 }), forest, EAT), false);
  assert.equal(actionFeasible(at(), forest, EAT), false);
});

test("each action lasts its minutes and takes nothing from the backpack at its start", () => {
  const cases = [
    [CRAFT, at({ [stick]: 6 }), 20],
    [LIGHT_CAMPFIRE, at({ [stick]: 2 }, burning(0)), 5],
    [LIGHT_ITEM, at({ [stick]: 1 }), 5],
    [FEED, at({ [stick]: 1 }, burning(30)), 5],
    [EAT, at({ [berry]: 1 }), 5],
  ];
  for (const [action, run, minutes] of cases) {
    const begun = stepMinute(
      freeNextMinute(run),
      forest,
      programFromRules(rule(ALWAYS, action)),
    ).run;
    assert.deepEqual(begun.current.activity.action, action, action.kind);
    assert.equal(begun.current.startMinute, 1, action.kind);
    assert.equal(begun.current.endMinute, 1 + minutes, action.kind);
    assert.equal(begun.current.stepTo, null, action.kind);
    assert.deepEqual(
      begun.character.backpack,
      run.character.backpack,
      action.kind,
    );
  }
});

test("crafting puts an unlit campfire on the tile at its end and uses 6 sticks", () => {
  const run = after(endingNext(at({ [stick]: 8, [berry]: 1 }), CRAFT), 1);
  assert.deepEqual(run.campfires, [{ at: entrance, minutesLeft: 0 }]);
  assert.deepEqual(
    run.character.backpack,
    backpackOf(run, { [stick]: 2, [berry]: 1 }),
  );
  assert.equal(run.body.temperature, 4.976, "an unlit campfire warms nothing");
  assert.equal(after(run, 1).body.temperature, 4.952);
});

test("a campfire lit in minute m warms from minute m + 1 for 60 minutes and uses 2 sticks", () => {
  const lit = after(
    endingNext(at({ [stick]: 3 }, burning(0)), LIGHT_CAMPFIRE),
    1,
  );
  assert.equal(lit.minute, 1);
  assert.deepEqual(lit.campfires, [{ at: entrance, minutesLeft: 60 }]);
  assert.deepEqual(lit.character.backpack, backpackOf(lit, { [stick]: 1 }));
  assert.equal(lit.body.temperature, 4.976, "minute 1 only cools");
  assert.deepEqual(warmMinutes(lit, 70), range(2, 61));
  const at61 = after(lit, 60);
  assert.equal(at61.body.temperature, 33.536);
  assert.deepEqual(at61.campfires, [{ at: entrance, minutesLeft: 0 }]);
});

test("lighting and feeding land on the campfire of the character's tile alone", () => {
  const away = neighbours(handMade().tiles, entrance)[0].at;
  const lit = after(
    endingNext(
      at({ [stick]: 2 }, [
        { at: away, minutesLeft: 0 },
        { at: entrance, minutesLeft: 0 },
      ]),
      LIGHT_CAMPFIRE,
    ),
    1,
  );
  assert.deepEqual(lit.campfires, [
    { at: away, minutesLeft: 0 },
    { at: entrance, minutesLeft: 60 },
  ]);
  const fed = after(
    endingNext(
      at({ [stick]: 1 }, [
        { at: entrance, minutesLeft: 10 },
        { at: away, minutesLeft: 10 },
      ]),
      FEED,
    ),
    1,
  );
  assert.deepEqual(fed.campfires, [
    { at: entrance, minutesLeft: 29 },
    { at: away, minutesLeft: 9 },
  ]);
});

test("a stick lit in minute m burns on the tile, warms in minutes m + 1 to m + 3 and is used", () => {
  const lit = after(endingNext(at({ [stick]: 2 }), LIGHT_ITEM), 1);
  assert.deepEqual(lit.burningItems, [
    { item: stick, at: entrance, minutesLeft: 3 },
  ]);
  assert.deepEqual(lit.character.backpack, backpackOf(lit, { [stick]: 1 }));
  assert.deepEqual(warmMinutes(lit, 10), [2, 3, 4]);
  assert.deepEqual(after(lit, 3).burningItems, []);
});

test("feeding a burning campfire adds 20 minutes, without a cap, and uses one stick", () => {
  for (const [left, expected] of [
    [150, 169],
    [1000, 1019],
  ]) {
    const fed = after(endingNext(at({ [stick]: 2 }, burning(left)), FEED), 1);
    assert.deepEqual(fed.campfires, burning(expected), `${left} minutes left`);
    assert.deepEqual(fed.character.backpack, backpackOf(fed, { [stick]: 1 }));
  }
});

test("a feeding during which the campfire burns out makes it burn 20 minutes again", () => {
  // Minute 1: the campfire drops to 3 and the feeding starts; minutes 2–4 burn it out; minute 6
  // ends the feeding on the extinguished campfire.
  const start = freeNextMinute(at({ [stick]: 1 }, burning(4)));
  const feeding = programFromRules(rule(ALWAYS, FEED));
  const at1 = after(start, 1, feeding);
  assert.deepEqual(at1.current.activity.action, FEED);
  assert.equal(at1.current.endMinute, 6);
  const at5 = after(at1, 4, feeding);
  assert.deepEqual(at5.campfires, burning(0));
  const at6 = after(at5, 1, feeding);
  assert.deepEqual(at6.campfires, burning(20));
  assert.deepEqual(at6.character.backpack, backpackOf(at6, {}));
  assert.deepEqual(warmMinutes(at6, 30), range(7, 26));
});

test("eating adds 25 satiety at its end, not above 100, and uses a berry", () => {
  for (const [satiety, expected] of [
    [50, 74.4],
    [76, 100],
    [90, 100],
  ]) {
    const run = endingNext(
      { ...at({ [berry]: 2, [stick]: 1 }), body: body(36, satiety, 100) },
      EAT,
    );
    const eaten = after(run, 1);
    assert.equal(eaten.body.satiety, expected, `satiety ${satiety}`);
    assert.deepEqual(
      eaten.character.backpack,
      backpackOf(eaten, { [berry]: 1, [stick]: 1 }),
    );
  }
});

test("„Idź — ognisko” takes one move toward the nearest campfire, in the minutes of the tile it enters", () => {
  const near = neighbours(handMade().tiles, entrance)[0];
  const far = offsetToAxial(3, 3);
  assert.equal(hexDistance(far, entrance), 3);
  const run = freeNextMinute(
    at({}, [
      { at: far, minutesLeft: 0 },
      { at: near.at, minutesLeft: 0 },
    ]),
  );
  const next = stepMinute(
    run,
    forest,
    programFromRules(rule(ALWAYS, TO_CAMPFIRE)),
  ).run;
  assert.deepEqual(next.current.activity.action, TO_CAMPFIRE);
  assert.equal(next.current.startMinute, 1);
  assert.equal(next.current.endMinute, 1 + near.stepMinutes);
  assert.deepEqual(next.current.stepTo, near.at);
  const arrived = after(next, near.stepMinutes);
  assert.deepEqual(arrived.character.at, near.at);
});

test("„Idź — ognisko” walks to a far campfire step by step and stays there", () => {
  const far = offsetToAxial(3, 3);
  const walking = programFromRules(rule(ALWAYS, TO_CAMPFIRE));
  let run = freeNextMinute(at({}, [{ at: far, minutesLeft: 30 }]));
  const distances = [];
  for (let i = 0; i < 40; i += 1) {
    const next = stepMinute(run, forest, walking).run;
    if (!sameHex(next.character.at, run.character.at))
      distances.push(hexDistance(next.character.at, far));
    run = next;
  }
  assert.deepEqual(distances, [2, 1, 0]);
  assert.deepEqual(run.character.at, far);
  assert.equal(run.current.activity.kind, "wait");
});

test("„Idź — ognisko” cannot be carried out where there is no campfire or on a campfire's tile", () => {
  const away = neighbours(handMade().tiles, entrance)[0].at;
  assert.equal(actionFeasible(at(), forest, TO_CAMPFIRE), false, "none");
  for (const minutesLeft of [0, 30]) {
    assert.equal(
      actionFeasible(at({}, [{ at: away, minutesLeft }]), forest, TO_CAMPFIRE),
      true,
      `a campfire with ${minutesLeft} minutes on another tile`,
    );
    assert.equal(
      actionFeasible(
        at({}, [
          { at: away, minutesLeft: 30 },
          { at: entrance, minutesLeft },
        ]),
        forest,
        TO_CAMPFIRE,
      ),
      false,
      `standing on a campfire with ${minutesLeft} minutes`,
    );
  }
});

test("„Idź — ognisko” is passed over on a campfire's tile, and the next program rule is picked", () => {
  const away = neighbours(handMade().tiles, entrance)[0].at;
  const run = freeNextMinute(
    at({}, [
      { at: entrance, minutesLeft: 0 },
      { at: away, minutesLeft: 0 },
    ]),
  );
  const next = stepMinute(
    run,
    forest,
    programFromRules(rule(ALWAYS, TO_CAMPFIRE), rule(ALWAYS, WANDER)),
  ).run;
  assert.deepEqual(next.current.activity.action, WANDER);
});

test("the action ending in the minute of death takes no effect", () => {
  // Health 0.35 and chilled: the minute's body kills the character before the berry lands.
  const run = endingNext(
    { ...at({ [berry]: 1 }), body: body(34, 50, 0.35) },
    EAT,
  );
  const dead = after(run, 1);
  assert.deepEqual(dead.death, { minute: 1, cause: "cold" });
  assert.equal(dead.body.satiety, 49.4);
  assert.deepEqual(dead.character.backpack, run.character.backpack);
});

test("the program check takes the six actions before sending and during a map run", () => {
  const rules = NEW_ACTIONS.map((action) => rule(ALWAYS, action));
  const during = send(
    createCharacter(newGame(), "Ala").state,
    { mapId, characterId },
    1760000000000,
  ).state;
  for (const state of [newGame(), during]) {
    const input = programFromRules(...rules);
    assert.deepEqual(setProgram(state, input).state.program, input);
  }
  const withField = setProgram(
    newGame(),
    programFromRules(rule(ALWAYS, { kind: "eat", item: berry })),
  );
  assert.deepEqual(
    withField.state.program,
    programFromRules(rule(ALWAYS, EAT)),
  );
});
