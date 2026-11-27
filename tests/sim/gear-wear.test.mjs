// The action „Załóż — {rzecz}” outside combat: its targets, how long it lasts, what it takes from the
// backpack and puts into the gear at its end and nothing before it, the first empty pocket, the piece
// the slot held going to the backpack, the words of its refusals, an attack before its end, its game
// minutes as a kind of their own in the record of a manual map run, and its place in the repertoire
// and in the pick. The expectations come from D-458 (what the action does), D-140 (its time), D-142
// (an action still running is lost on an attack), D-380 (the reasons), D-443 (the targets follow
// the items' rows), D-456 (what fits which slot), D-363 (it uses nothing up), D-126 and D-290 in
// foundations/decisions.md; every gear, backpack and number expected is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  backpackCap,
  backpackCount,
} from "../../dist/browser/sim/character.js";
import {
  itemTargets,
  takesItem,
} from "../../dist/browser/sim/action-targets.js";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { setProgram } from "../../dist/browser/sim/game.js";
import {
  actionPrice,
  actionRefusal,
  judgeProgram,
} from "../../dist/browser/sim/program.js";
import { ProgramCheckError } from "../../dist/browser/sim/programs.js";
import { nextRandom } from "../../dist/browser/sim/random.js";
import { newMapRun, stepMinute } from "../../dist/browser/sim/run.js";
import {
  MINUTE_KINDS,
  minuteKind,
  nextRecord,
  startRecord,
} from "../../dist/browser/sim/run-record.js";
import {
  outsideReason,
  repertoireOf,
  ruleInRepertoire,
} from "../../dist/browser/sim/understanding.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const forest = MAPS.forest;
const deep = MAPS.forestDeep;
const characterId = 1;
const ALWAYS = { kind: "always" };
const WANDER = { kind: "wander" };
const EQUIP_STICK = { kind: "equip", item: "stick" };
const EQUIP_BANDAGE = { kind: "equip", item: "bandage" };
const IDLE = programFromRules();
const rule = (condition, action) => ({ condition, action });

/** The gear of a character with nothing on: the eight slots of the data, each holding none. */
const NO_GEAR = {
  mainHand: null,
  secondHand: null,
  head: null,
  torso: null,
  legs: null,
  pocket1: null,
  pocket2: null,
  pocket3: null,
};
const POCKETS_FULL = {
  pocket1: "bandage",
  pocket2: "bandage",
  pocket3: "bandage",
};

/** An item the data never hold, which fits the main hand: the piece a slot holds when a stick comes. */
const CLUB = {
  name: "maczuga",
  plural: { few: "x", many: "y" },
  icon: "first-aid-kit",
  iconTitle: "First aid kit icon",
  revealedBy: { kind: "gathered", item: "moss" },
  fits: "mainHand",
};
/** An item with no place of the gear, one the data give no `fits`. */
const BOARD = { ...CLUB, name: "deska", fits: undefined };

/** Runs `body` with the rows laid on the built data of `table`, and takes them off again after it. */
function withRows(table, rows, body) {
  for (const id of Object.keys(rows))
    assert.ok(
      !Object.hasOwn(table, id),
      `precondition: ${id} is no row of the data`,
    );
  Object.assign(table, rows);
  try {
    return body();
  } finally {
    for (const id of Object.keys(rows)) delete table[id];
  }
}

/** A map run of `map` at minute 0, its backpack holding `pieces` and nothing else, its gear `gear`. */
function runWith(pieces, gear = {}, map = forest, mapId = "forest") {
  const { run } = newMapRun(map, 3, IDLE, { mapId, characterId });
  const empty = Object.fromEntries(
    Object.keys(run.character.backpack).map((id) => [id, 0]),
  );
  return {
    ...run,
    character: {
      ...run.character,
      backpack: { ...empty, ...pieces },
      gear: { ...NO_GEAR, ...gear },
    },
  };
}

/** The run with `action` as its current activity, ending `minutes` game minutes from now. */
function carrying(run, action, minutes = 1) {
  return {
    ...run,
    current: {
      activity: { kind: "rule", ruleId: 1, action },
      startMinute: run.minute - 4,
      endMinute: run.minute + minutes,
      stepTo: null,
    },
  };
}

/** The run after `minutes` game minutes, each one step. */
function after(run, minutes, program = IDLE, map = forest) {
  let current = run;
  for (let i = 0; i < minutes; i += 1)
    current = stepMinute(current, map, program).run;
  return current;
}

test("„Załóż — patyk” lasts one game minute and moves no piece at its start", () => {
  // decision: D-140 "„Załóż” can be carried out in combat and out of it, and like every action it takes the one rule that a free minute or a turn of combat starts: in combat one turn of the character, in which the wolf acts as in any turn, and out of combat 1 minute."
  const start = runWith({ stick: 2 });
  const begun = stepMinute(
    start,
    forest,
    programFromRules(rule(ALWAYS, EQUIP_STICK)),
  ).run;
  assert.deepEqual(begun.current.activity.action, EQUIP_STICK);
  assert.equal(begun.current.startMinute, 1);
  assert.equal(begun.current.endMinute, 2);
  assert.equal(begun.current.stepTo, null);
  assert.deepEqual(begun.character.backpack, start.character.backpack);
  assert.deepEqual(begun.character.gear, NO_GEAR);
});

test("„Załóż — patyk” takes one stick from the backpack into the empty main hand at its end, together, and nothing before it", () => {
  // decision: D-458 "The action „Załóż — {rzecz}”, one for all slots, takes one piece of its item from the backpack into the slot the item fits, into the first empty pocket for an item of a pocket, and puts the piece that slot held, if any, into the backpack, so that the count of the backpack's pieces never rises."
  const run = runWith({ stick: 2, moss: 1 });
  assert.equal(actionRefusal(run, EQUIP_STICK), null);
  const going = after(carrying(run, EQUIP_STICK, 2), 1);
  assert.deepEqual(going.character.backpack, run.character.backpack, "midway");
  assert.deepEqual(going.character.gear, NO_GEAR, "midway");
  const done = after(carrying(run, EQUIP_STICK), 1);
  assert.deepEqual(done.character.gear, { ...NO_GEAR, mainHand: "stick" });
  assert.deepEqual(done.character.backpack, {
    ...run.character.backpack,
    stick: 1,
    moss: 1,
  });
  assert.deepEqual(done.practice, {}, "no practice of any skill");
});

test("„Załóż — opatrunek” puts the bandage into the first empty pocket, whichever pockets are taken before it", () => {
  // decision: D-458 "The action „Załóż — {rzecz}”, one for all slots, takes one piece of its item from the backpack into the slot the item fits, into the first empty pocket for an item of a pocket"
  const cases = [
    ["no pocket taken", {}, { pocket1: "bandage" }],
    [
      "the first pocket taken",
      { pocket1: "bandage" },
      { pocket1: "bandage", pocket2: "bandage" },
    ],
    [
      "the second pocket taken, the first empty",
      { pocket2: "bandage" },
      { pocket1: "bandage", pocket2: "bandage" },
    ],
    [
      "the first two pockets taken",
      { pocket1: "bandage", pocket2: "bandage" },
      POCKETS_FULL,
    ],
  ];
  for (const [name, gear, expected] of cases) {
    const run = runWith({ bandage: 2 }, gear);
    const done = after(carrying(run, EQUIP_BANDAGE), 1);
    assert.deepEqual(done.character.gear, { ...NO_GEAR, ...expected }, name);
    assert.equal(done.character.backpack.bandage, 1, name);
  }
});

test("an item goes only into the slot of its own place: a bandage leaves the main hand as it was and a stick leaves the pockets", () => {
  // decision: D-456 "The data of each item name the place it fits: the stick fits the main hand and the bandage a pocket."
  const hand = runWith({ bandage: 1 }, { mainHand: "stick" });
  const bandaged = after(carrying(hand, EQUIP_BANDAGE), 1);
  assert.deepEqual(bandaged.character.gear, {
    ...NO_GEAR,
    mainHand: "stick",
    pocket1: "bandage",
  });
  // The pockets all taken do not stand in the way of a stick: it goes to the hand.
  const pockets = runWith({ stick: 1 }, POCKETS_FULL);
  assert.equal(actionRefusal(pockets, EQUIP_STICK), null);
  const sticked = after(carrying(pockets, EQUIP_STICK), 1);
  assert.deepEqual(sticked.character.gear, {
    ...NO_GEAR,
    ...POCKETS_FULL,
    mainHand: "stick",
  });
});

test("the piece a slot held goes to the backpack when another piece comes, so the count of the backpack never rises, a full backpack included", () => {
  // decision: D-458 "The action „Załóż — {rzecz}”, one for all slots, takes one piece of its item from the backpack into the slot the item fits, into the first empty pocket for an item of a pocket, and puts the piece that slot held, if any, into the backpack, so that the count of the backpack's pieces never rises."
  withRows(ITEMS, { club: CLUB }, () => {
    const run = runWith({ stick: 1 }, { mainHand: "club" });
    assert.equal(actionRefusal(run, EQUIP_STICK), null);
    const done = after(carrying(run, EQUIP_STICK), 1);
    assert.equal(done.character.gear.mainHand, "stick");
    assert.equal(done.character.backpack.stick, 0);
    assert.equal(done.character.backpack.club, 1);

    const cap = backpackCap(run.character);
    const full = runWith({ stick: 1, berry: cap - 1 }, { mainHand: "club" });
    assert.equal(backpackCount(full.character.backpack), cap, "precondition");
    const swapped = after(carrying(full, EQUIP_STICK), 1);
    assert.equal(swapped.character.gear.mainHand, "stick");
    assert.deepEqual(swapped.character.backpack, {
      ...full.character.backpack,
      stick: 0,
      club: 1,
    });
    assert.equal(backpackCount(swapped.character.backpack), cap);
  });
});

test("a piece put into an empty slot lowers the count of the backpack by one", () => {
  // decision: D-458 "The action „Załóż — {rzecz}”, one for all slots, takes one piece of its item from the backpack into the slot the item fits, into the first empty pocket for an item of a pocket, and puts the piece that slot held, if any, into the backpack, so that the count of the backpack's pieces never rises."
  const run = runWith({ stick: 2, berry: 3, bandage: 1 });
  const done = after(carrying(run, EQUIP_STICK), 1);
  assert.equal(backpackCount(run.character.backpack), 6);
  assert.equal(backpackCount(done.character.backpack), 5);
});

test("the reason of a refusal reads „brakuje 1 × {rzecz}”, „już założone: {rzecz}” or „kieszenie pełne”, the state of the slot before the lack in the backpack", () => {
  // decision: D-380 "„Załóż — {rzecz}” short of the thing in the backpack reads „brakuje 1 × {rzecz}”, where the slot it fits already holds the thing „już założone: {rzecz}”, and for an item of a pocket with every pocket taken „kieszenie pełne” in place of „już założone”, each reason about the state of things standing before „brakuje …”."
  const cases = [
    ["a stick lacking everywhere", {}, {}, EQUIP_STICK, "brakuje 1 × patyk"],
    [
      "a stick in the hand, none in the backpack",
      { mainHand: "stick" },
      {},
      EQUIP_STICK,
      "już założone: patyk",
    ],
    [
      "a stick in the hand and another in the backpack",
      { mainHand: "stick" },
      { stick: 1 },
      EQUIP_STICK,
      "już założone: patyk",
    ],
    [
      "a bandage lacking everywhere",
      {},
      {},
      EQUIP_BANDAGE,
      "brakuje 1 × opatrunek",
    ],
    [
      "a bandage in one pocket, none in the backpack: no „już założone” for a pocket",
      { pocket1: "bandage" },
      {},
      EQUIP_BANDAGE,
      "brakuje 1 × opatrunek",
    ],
    [
      "every pocket taken, a bandage in the backpack",
      POCKETS_FULL,
      { bandage: 1 },
      EQUIP_BANDAGE,
      "kieszenie pełne",
    ],
    [
      "every pocket taken, no bandage in the backpack",
      POCKETS_FULL,
      {},
      EQUIP_BANDAGE,
      "kieszenie pełne",
    ],
    [
      "a bandage in one pocket and another in the backpack",
      { pocket1: "bandage" },
      { bandage: 1 },
      EQUIP_BANDAGE,
      null,
    ],
    [
      "an empty hand and a stick in the backpack",
      {},
      { stick: 1 },
      EQUIP_STICK,
      null,
    ],
  ];
  for (const [name, gear, pieces, action, reason] of cases)
    assert.equal(actionRefusal(runWith(pieces, gear), action), reason, name);
  // A stick in a hand that holds another piece is no refusal: the stick takes its place.
  withRows(ITEMS, { club: CLUB }, () => {
    const run = runWith({ stick: 1 }, { mainHand: "club" });
    assert.equal(actionRefusal(run, EQUIP_STICK), null);
  });
});

test("a rule with „Załóż” that cannot start is blocked with its reason and passed over for the next rule, and one that can start is chosen", () => {
  // decision: D-380 "„Załóż — {rzecz}” short of the thing in the backpack reads „brakuje 1 × {rzecz}”, where the slot it fits already holds the thing „już założone: {rzecz}”, and for an item of a pocket with every pocket taken „kieszenie pełne” in place of „już założone”, each reason about the state of things standing before „brakuje …”."
  const program = programFromRules(
    rule(ALWAYS, EQUIP_STICK),
    rule(ALWAYS, WANDER),
  );
  const held = judgeProgram(
    runWith({ stick: 1 }, { mainHand: "stick" }),
    program,
  );
  assert.deepEqual(held.rules[1], {
    bar: "blocked",
    reason: "już założone: patyk",
  });
  assert.equal(held.winner.id, 2);
  const empty = judgeProgram(runWith({ stick: 1 }), program);
  assert.deepEqual(empty.rules[1], { bar: "go", reason: null });
  assert.equal(empty.winner.id, 1);
});

test("an attack before the end of „Załóż” leaves the piece in the backpack and the slot empty, and one in the minute it ends comes after its effect", () => {
  // decision: D-142 "Each eligible ordinary game minute tries its attack after the ending action's effect and the completion check, including a minute inside a longer action; an action still running is lost on an attack, while a finished action keeps its effect."
  const wolf = deep.attackers[0];
  let drawing = 1;
  while (nextRandom(drawing).value >= wolf.chancePerMinute) drawing += 1;
  const attacked = (endMinute) => ({
    ...carrying(
      { ...runWith({ stick: 1 }, {}, deep, "forestDeep"), minute: 180 },
      EQUIP_STICK,
      endMinute - 180,
    ),
    attackRandom: drawing,
  });

  const lost = attacked(190);
  const hit = stepMinute(lost, deep, IDLE);
  assert.ok(hit.events.some((event) => event.kind === "attacked"));
  assert.equal(hit.run.current, null);
  assert.deepEqual(hit.run.character.backpack, lost.character.backpack);
  assert.deepEqual(hit.run.character.gear, NO_GEAR);

  const finished = stepMinute(attacked(181), deep, IDLE);
  assert.ok(finished.events.some((event) => event.kind === "attacked"));
  assert.equal(finished.run.character.gear.mainHand, "stick");
  assert.equal(finished.run.character.backpack.stick, 0);
});

test("where the state at its end no longer lets „Załóż” put the piece on, nothing changes and nothing is taken", () => {
  // decision: D-458 "The action „Załóż — {rzecz}”, one for all slots, takes one piece of its item from the backpack into the slot the item fits, into the first empty pocket for an item of a pocket, and puts the piece that slot held, if any, into the backpack, so that the count of the backpack's pieces never rises."
  const cases = [
    ["the backpack holds no stick", EQUIP_STICK, {}, {}],
    [
      "the hand holds a stick already",
      EQUIP_STICK,
      { stick: 1 },
      { mainHand: "stick" },
    ],
    ["every pocket is taken", EQUIP_BANDAGE, { bandage: 1 }, POCKETS_FULL],
  ];
  for (const [name, action, pieces, gear] of cases) {
    const run = runWith(pieces, gear);
    const done = after(carrying(run, action), 1);
    assert.deepEqual(done.character.gear, run.character.gear, name);
    assert.deepEqual(done.character.backpack, run.character.backpack, name);
  }
});

test("its game minutes count as a kind of their own in the record of a manual map run", () => {
  // decision: D-369 "A manual map run keeps, in the map run of the game state and so in the saved game state"
  const run = carrying(runWith({ stick: 1 }), EQUIP_STICK, 3);
  assert.ok(MINUTE_KINDS.includes("equip"));
  assert.equal(minuteKind(run), "equip");
  const record = startRecord(run.character.backpack);
  assert.equal(record.minutesByAction.equip, 0);
  const next = nextRecord(record, run, stepMinute(run, forest, IDLE).run);
  assert.equal(next.minutesByAction.equip, 1);
  assert.equal(next.minutesByAction.wait, 0);
});

test("„Załóż” uses nothing up and costs no nature energy, so it has no price", () => {
  assert.deepEqual(actionPrice("equip", {}, "stick"), {
    pieces: [],
    natureEnergy: 0,
  });
  assert.deepEqual(actionPrice("equip", {}, "bandage"), {
    pieces: [],
    natureEnergy: 0,
  });
});

test("the targets of „Załóż” are the items whose row names a place of the gear, today the stick and the bandage, and follow the rows", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  assert.equal(takesItem("equip"), true);
  assert.deepEqual(itemTargets("equip"), ["stick", "bandage"]);
  withRows(ITEMS, { club: CLUB, board: BOARD }, () => {
    assert.deepEqual(itemTargets("equip"), ["stick", "bandage", "club"]);
  });
});

test("the program check takes „Załóż” with an item that fits a place and refuses an item that fits none and a value that is no item", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  const game = newKnowingGame();
  const taking = (item) =>
    setProgram(game, programFromRules(rule(ALWAYS, { kind: "equip", item })));
  for (const item of ["stick", "bandage"])
    assert.doesNotThrow(() => taking(item), item);
  for (const item of ["moss", "berry", "fiber", "wolf", "toString", "", 7])
    assert.throws(() => taking(item), ProgramCheckError, String(item));
  assert.throws(
    () => setProgram(game, programFromRules(rule(ALWAYS, { kind: "equip" }))),
    ProgramCheckError,
  );
  withRows(ITEMS, { club: CLUB, board: BOARD }, () => {
    assert.doesNotThrow(() => taking("club"));
    assert.throws(() => taking("board"), ProgramCheckError);
  });
});

test("a rule with „Załóż” lies in the repertoire only where the Understanding holds its target, and names the target it lacks", () => {
  // decision: D-126 "The simulation passes over a program rule whose condition, action or the target of either lies outside the character's repertoire to the next program rule, as over a program rule whose action cannot be carried out in that game minute, and the program rule stays in the program."
  const understanding = (items) => ({
    trees: [],
    actions: ["explore", "equip"],
    conditions: ["always"],
    items,
    creatures: [],
  });
  const stick = rule(ALWAYS, EQUIP_STICK);
  const bandage = rule(ALWAYS, EQUIP_BANDAGE);
  const knowingStick = repertoireOf(understanding(["stick"]), []);
  assert.equal(ruleInRepertoire(knowingStick, stick), true);
  assert.equal(outsideReason(knowingStick, knowingStick, stick), null);
  assert.equal(ruleInRepertoire(knowingStick, bandage), false);
  assert.equal(
    outsideReason(knowingStick, knowingStick, bandage),
    "jeszcze nieodkryte: opatrunek",
  );
  const knowingNothing = repertoireOf(understanding([]), []);
  assert.equal(ruleInRepertoire(knowingNothing, stick), false);
  assert.equal(
    outsideReason(knowingNothing, knowingNothing, stick),
    "jeszcze nieodkryte: patyk",
  );
});

test("„Załóż” ends the group „Żywność i walka” of the pick", () => {
  // decision: D-290 "The pick of the rule panel sets the actions in five named groups"
  const group = Object.keys(ACTIONS).filter(
    (id) => ACTIONS[id].group === "foodAndCombat",
  );
  assert.deepEqual(group, [
    "eat",
    "tend",
    "strikeWithStick",
    "kick",
    "dodge",
    "equip",
  ]);
});
