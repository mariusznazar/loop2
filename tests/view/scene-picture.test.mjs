import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  SCENE,
  SCENE_DUST,
  SCENE_FIRE,
  SCENE_MAGES,
  SCENE_PROPS,
} from "../../dist/browser/sim/data/scene.js";
import {
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import {
  sceneDrawing,
  sceneEffect,
} from "../../dist/browser/view/scene-picture.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const SPRITES = fileURLToPath(
  new URL("../../assets/sprites/", import.meta.url),
);
const SENT = {
  mapId: Object.keys(MAPS)[0],
  // The first character a new game creates takes the id 1.
  characterId: 1,
};
const ALWAYS = { kind: "always" };

// The layout of the old Loop's scene (src/components/probe/Scene.tsx of the old Loop repository,
// lines 44-58 at cdc7c0d), in the pixels of the 336 × 152 frame. A place is the left edge and the line the
// picture stands on; the mage's place is its frame's left edge, its feet on the ground line. The
// mage's frame is 64 pixels wide and the old Loop's was 32, so each of its places is the old one
// moved 16 pixels left, which keeps the figure's centre where the old Loop had it.
const GROUND = 136;
const MAGE_AT_STICKS = 42;
const MAGE_AT_BERRY = 224;
const MAGE_AT_MOSS = 32;
const MAGE_AT_FIRE = 80;
const CLEARING = 144;
const RIGHT_EDGE = 275;
const COMBAT_KINDS = ["strikeWithStick", "kick", "dodge"];
const NO_UNDERSTANDING_ITEMS = {
  trees: [],
  actions: [],
  conditions: [],
  items: [],
  creatures: [],
};

/** A new game with one character sent into its map, its program explores at once. */
function sent() {
  const program = setProgram(
    newKnowingGame(),
    programFromRules({ condition: ALWAYS, action: { kind: "explore" } }),
  ).state;
  return send(createCharacter(program, "Ala").state, SENT, 1760000000000).state;
}

/** The state with some fields of its map run changed; the rest of the game stays as it is. */
function withRun(state, patch) {
  return { ...state, run: { ...state.run, ...patch } };
}

/** An action picked as the current activity from minute 0 to minute 10 of the map run. */
function current(action) {
  return {
    activity: { kind: "rule", ruleId: 1, action },
    startMinute: 0,
    endMinute: 10,
    stepTo: null,
  };
}

/** The sent state doing the action, at the start of the action. */
function doing(action, patch = {}) {
  return withRun(sent(), { current: current(action), ...patch });
}

const goalOf = (state) => sceneDrawing(state).mage.goal;
const at = (x) => ({ kind: "at", place: { x, y: GROUND } });
const STAYS = { kind: "stays" };

test("a game without a map run has no scene", () => {
  assert.equal(sceneDrawing(newGame()), null);
});

test("Zbierz walks the mage to the sticks, the berry bush or the moss, as its target says", () => {
  assert.deepEqual(
    goalOf(doing({ kind: "gather", resource: "stick" })),
    at(MAGE_AT_STICKS),
  );
  assert.deepEqual(
    goalOf(doing({ kind: "gather", resource: "berry" })),
    at(MAGE_AT_BERRY),
  );
  assert.deepEqual(
    goalOf(doing({ kind: "gather", resource: "moss" })),
    at(MAGE_AT_MOSS),
  );
});

test("Obchód walks the mage to the prop of its target too", () => {
  assert.deepEqual(
    goalOf(doing({ kind: "patrol", resource: "stick" })),
    at(MAGE_AT_STICKS),
  );
  assert.deepEqual(
    goalOf(doing({ kind: "patrol", resource: "moss" })),
    at(MAGE_AT_MOSS),
  );
});

test("a target with no prop, the fibre, leaves the mage where it stands", () => {
  assert.deepEqual(goalOf(doing({ kind: "gather", resource: "fiber" })), STAYS);
  assert.deepEqual(goalOf(doing({ kind: "patrol", resource: "fiber" })), STAYS);
});

test("Wytwórz, Zapal and Zasil — ognisko walk the mage to the place of the fire", () => {
  for (const kind of ["craftCampfire", "lightCampfire", "feedCampfire"]) {
    assert.deepEqual(goalOf(doing({ kind })), at(MAGE_AT_FIRE), kind);
  }
});

test("Zapal — patyk and Zjedz leave the mage where it stands", () => {
  for (const kind of ["lightItem", "eat"]) {
    assert.deepEqual(goalOf(doing({ kind })), STAYS, kind);
  }
});

test("Eksploruj, Wędruj, Idź and Idź — ognisko lead the mage to the right edge, always the same place", () => {
  const actions = [
    { kind: "explore" },
    { kind: "wander" },
    { kind: "walkTo", resource: "stick" },
    { kind: "walkToCampfire" },
  ];
  for (const action of actions) {
    assert.deepEqual(goalOf(doing(action)), at(RIGHT_EDGE), action.kind);
  }
});

test("while waiting, with no rule fitting, the mage goes to the middle of the clearing", () => {
  const waiting = withRun(sent(), {
    current: {
      activity: { kind: "wait" },
      startMinute: 0,
      endMinute: 10,
      stepTo: null,
    },
  });
  assert.deepEqual(goalOf(waiting), at(CLEARING));
});

test("in combat, with no current activity, the mage stays where it stands", () => {
  assert.deepEqual(goalOf(withRun(sent(), { current: null })), STAYS);
});

test("after a death or a completion the mage stays where it stands", () => {
  assert.deepEqual(
    goalOf(
      doing(
        { kind: "gather", resource: "stick" },
        { death: { minute: 4, cause: "cold" } },
      ),
    ),
    STAYS,
  );
  assert.deepEqual(
    goalOf(withRun(sent(), { current: null, completion: { minute: 4 } })),
    STAYS,
  );
});

test("the mage's two sheets come from the data of its archetype, with the frame size and the frame count of the files", () => {
  const drawing = sceneDrawing(sent());
  assert.deepEqual(drawing.mage.idle, {
    href: "/sprites/mage-idle.png",
    width: 64,
    height: 64,
    frames: 4,
  });
  assert.deepEqual(drawing.mage.run, {
    href: "/sprites/mage-run.png",
    width: 64,
    height: 64,
    frames: 6,
  });
});

test("the background is the forest picture, a still frame of 336 × 152 pixels", () => {
  assert.deepEqual(sceneDrawing(sent()).background, {
    href: "/sprites/forest-scene.png",
    width: 336,
    height: 152,
    frames: 1,
  });
});

test("the props stand always, also on a tile holding none of them, each at its place", () => {
  const state = sent();
  const ownTile = state.run.tiles.find(
    (tile) =>
      tile.at.q === state.run.character.at.q &&
      tile.at.r === state.run.character.at.r,
  );
  const bare = withRun(state, {
    tiles: state.run.tiles.map((tile) =>
      tile === ownTile ? { ...tile, stock: {} } : tile,
    ),
  });
  assert.deepEqual(sceneDrawing(bare).props, [
    {
      resource: "stick",
      href: "/sprites/sticks.png",
      width: 22,
      height: 13,
      frames: 1,
      x: 80,
      y: 132,
    },
    {
      resource: "berry",
      href: "/sprites/berry-bush.png",
      width: 29,
      height: 27,
      frames: 1,
      x: 252,
      y: 122,
    },
    {
      resource: "moss",
      href: "/sprites/moss.png",
      width: 12,
      height: 9,
      frames: 1,
      x: 40,
      y: 128,
    },
  ]);
});

test("the props stand the same whatever the mage is doing", () => {
  const idle = sceneDrawing(withRun(sent(), { current: null })).props;
  assert.deepEqual(sceneDrawing(doing({ kind: "explore" })).props, idle);
});

test("the mage's place is the prop's own mage place: the sticks' is 42, the bush's 224, the moss's 32", () => {
  assert.equal(SCENE_PROPS.stick.mageAt, MAGE_AT_STICKS);
  assert.equal(SCENE_PROPS.berry.mageAt, MAGE_AT_BERRY);
  assert.equal(SCENE_PROPS.moss.mageAt, MAGE_AT_MOSS);
});

test("no campfire on the character's tile: no fire, though a campfire stands elsewhere", () => {
  const state = sent();
  const elsewhere = withRun(state, {
    campfires: [{ at: { q: 99, r: 99 }, minutesLeft: 5 }],
  });
  assert.equal(sceneDrawing(state).fire, null);
  assert.equal(sceneDrawing(elsewhere).fire, null);
});

test("a burning campfire on the character's tile is drawn with its frames, at its place", () => {
  const state = withRun(sent(), {
    campfires: [{ at: sent().run.character.at, minutesLeft: 42 }],
  });
  assert.deepEqual(sceneDrawing(state).fire, {
    href: "/sprites/fire.png",
    width: 32,
    height: 32,
    frames: 4,
    x: 124,
    y: 132,
    burning: true,
  });
});

test("an extinguished campfire on the character's tile is drawn in the same picture, not burning", () => {
  const state = withRun(sent(), {
    campfires: [{ at: sent().run.character.at, minutesLeft: 0 }],
  });
  assert.deepEqual(sceneDrawing(state).fire, {
    href: "/sprites/fire.png",
    width: 32,
    height: 32,
    frames: 4,
    x: 124,
    y: 132,
    burning: false,
  });
});

test("the fire's data hold the place of the fire and the place the mage stands at it", () => {
  assert.equal(SCENE_FIRE.place.x, 124);
  assert.equal(SCENE_FIRE.mageAt, MAGE_AT_FIRE);
});

test("the badge shows the icon of the action, the file of the rule's row, for each action", () => {
  const ordinary = Object.keys(ACTIONS).filter(
    (kind) => !COMBAT_KINDS.includes(kind),
  );
  for (const kind of ordinary) {
    const action = ["walkTo", "gather", "patrol"].includes(kind)
      ? { kind, resource: "stick" }
      : { kind };
    const badge = sceneDrawing(doing(action)).badge;
    assert.equal(badge.href, `/icons/${ACTIONS[kind].icon}.svg`, kind);
  }
  assert.equal(
    sceneDrawing(doing({ kind: "explore" })).badge.href,
    "/icons/binoculars.svg",
  );
  assert.equal(
    sceneDrawing(doing({ kind: "gather", resource: "stick" })).badge.href,
    "/icons/grab.svg",
  );
  assert.equal(
    sceneDrawing(doing({ kind: "lightItem" })).badge.href,
    "/icons/match-tip.svg",
  );
});

test("the progress is 0 at the start of the action, 0.45 midway with a carry, and 1 at its end", () => {
  const start = sceneDrawing(doing({ kind: "gather", resource: "stick" }));
  assert.equal(start.badge.progress, 0);

  const midway = withRun(sent(), {
    current: current({ kind: "gather", resource: "stick" }),
    minute: 4,
  });
  const carried = sceneDrawing({ ...midway, realMsCarry: 500 });
  assert.ok(
    Math.abs(carried.badge.progress - 0.45) < 1e-9,
    `${carried.badge.progress}`,
  );

  const end = withRun(sent(), {
    current: current({ kind: "gather", resource: "stick" }),
    minute: 10,
  });
  assert.equal(sceneDrawing({ ...end, realMsCarry: 0 }).badge.progress, 1);
});

test("no badge while waiting, in combat, after a death and after a completion", () => {
  const waiting = withRun(sent(), {
    current: {
      activity: { kind: "wait" },
      startMinute: 0,
      endMinute: 10,
      stepTo: null,
    },
  });
  assert.equal(sceneDrawing(waiting).badge, null, "waiting");
  assert.equal(
    sceneDrawing(withRun(sent(), { current: null })).badge,
    null,
    "combat",
  );
  assert.equal(
    sceneDrawing(
      doing(
        { kind: "gather", resource: "stick" },
        { death: { minute: 4, cause: "cold" } },
      ),
    ).badge,
    null,
    "death",
  );
  assert.equal(
    sceneDrawing(
      doing(
        { kind: "gather", resource: "stick" },
        { completion: { minute: 4 } },
      ),
    ).badge,
    null,
    "completion",
  );
});

test("the badge stays at a pause and at a stop at a discovery", () => {
  const paused = {
    ...doing({ kind: "gather", resource: "stick" }),
    paused: true,
  };
  assert.notEqual(sceneDrawing(paused).badge, null, "pause");
  const discovery = {
    ...paused,
    discovery: NO_UNDERSTANDING_ITEMS,
  };
  assert.notEqual(sceneDrawing(discovery).badge, null, "discovery");
});

test("a running map run is going", () => {
  const state = {
    ...doing({ kind: "explore" }),
    paused: false,
    discovery: null,
  };
  assert.equal(sceneDrawing(state).standing, "going");
});

test("the player's pause stops the scene, which is then greyed", () => {
  const state = {
    ...doing({ kind: "explore" }),
    paused: true,
    discovery: null,
  };
  assert.equal(sceneDrawing(state).standing, "paused");
});

test("a loaded map run comes back paused, so it stands as at a pause", () => {
  const loaded = {
    ...doing({ kind: "explore" }),
    paused: true,
    discovery: null,
  };
  assert.equal(sceneDrawing(loaded).standing, "paused");
});

test("a stop at a discovery stands in colour: the discovery is held with the pause", () => {
  const state = {
    ...doing({ kind: "explore" }),
    paused: true,
    discovery: NO_UNDERSTANDING_ITEMS,
  };
  assert.equal(sceneDrawing(state).standing, "discovery");
});

test("a death stops the scene, the mage then grey", () => {
  const state = withRun(sent(), { death: { minute: 4, cause: "cold" } });
  assert.equal(sceneDrawing({ ...state, paused: false }).standing, "dead");
  assert.equal(sceneDrawing({ ...state, paused: true }).standing, "dead");
});

test("a completion stops the scene in colour", () => {
  const state = withRun(sent(), { completion: { minute: 4 } });
  assert.equal(sceneDrawing({ ...state, paused: false }).standing, "completed");
  assert.equal(
    sceneDrawing({ ...state, paused: true, discovery: NO_UNDERSTANDING_ITEMS })
      .standing,
    "completed",
  );
});

// invariant: loop2-container-sprites
test("every file the scene's data names stands directly in assets/sprites/ as a .png file", () => {
  const names = [
    SCENE.background.file,
    SCENE_FIRE.picture.file,
    SCENE_DUST.file,
    ...Object.values(SCENE_MAGES).flatMap((sheets) => [
      sheets.idle.file,
      sheets.run.file,
      sheets.bend.file,
    ]),
    ...Object.values(SCENE_PROPS).map((prop) => prop.picture.file),
  ];
  assert.ok(names.length > 0);
  for (const name of names) {
    assert.equal(basename(name), name, `${name} is in a subdirectory`);
    assert.match(name, /\.png$/, name);
    assert.ok(
      existsSync(join(SPRITES, name)),
      `${name} is not in assets/sprites/`,
    );
  }
});

test("the mage's third sheet, the bend, and the cloud of dust come from the data, with the frame size and the frame count of the files", () => {
  assert.deepEqual(sceneDrawing(sent()).mage.bend, {
    href: "/sprites/mage-bend.png",
    width: 64,
    height: 64,
    frames: 4,
  });
  assert.deepEqual(SCENE_DUST, {
    file: "dust.png",
    width: 16,
    height: 16,
    frames: 8,
  });
});

test("the mage bends while it gathers, whichever the target, and at nothing else", () => {
  const bending = (state) => sceneDrawing(state).mage.bending;
  for (const resource of ["stick", "berry", "moss", "fiber"]) {
    assert.equal(bending(doing({ kind: "gather", resource })), true, resource);
    assert.equal(bending(doing({ kind: "patrol", resource })), true, resource);
  }
  for (const kind of ["explore", "eat", "kick", "craftCampfire"])
    assert.equal(bending(doing({ kind })), false, kind);
  assert.equal(bending(withRun(sent(), { current: null })), false, "combat");
  assert.equal(
    bending(
      doing(
        { kind: "gather", resource: "stick" },
        { death: { minute: 3, cause: "cold" } },
      ),
    ),
    false,
    "dead",
  );
  assert.equal(
    bending(
      doing(
        { kind: "gather", resource: "stick" },
        { completion: { minute: 3 } },
      ),
    ),
    false,
    "completed",
  );
});

// --- the effect of the end of a gathering (D-04, D-66, D-317) ---------------------------------------

const STICK = { kind: "gather", resource: "stick" };
const FIBER = { kind: "gather", resource: "fiber" };

/** The state with `count` pieces of the resource carried. */
function carrying(state, item, count) {
  return withRun(state, {
    character: {
      ...state.run.character,
      backpack: { ...state.run.character.backpack, [item]: count },
    },
  });
}

const finished = (action) => ({
  kind: "activityFinished",
  minute: 10,
  activity: { kind: "rule", ruleId: 1, action },
});

/** The effect of a reading that carries `events`, from `before` pieces to `after`, mage at 42. */
function effectOf(resource, before, after, events, mageX = MAGE_AT_STICKS) {
  return sceneEffect(
    carrying(sent(), resource, before),
    carrying(sent(), resource, after),
    events,
    mageX,
  );
}

test("a hit flies the resource's icon from the middle of its prop to the mage's body, 32 right of its frame's edge and 18 over the ground line", () => {
  // Sticks at 80 × 132, 22 × 13: their middle is 91 and 125.5. The mage's frame at 42: body 74, line 136.
  assert.deepEqual(effectOf("stick", 0, 1, [finished(STICK)]), {
    kind: "flight",
    href: "/icons/wood-stick.svg",
    from: { x: 91, y: 125.5 },
    to: { x: 74, y: 118 },
  });
  // The bush at 252 × 122, 29 × 27: the middle is 266.5 and 108.5; the mage's frame at 224: body 256.
  assert.deepEqual(
    effectOf(
      "berry",
      1,
      2,
      [finished({ kind: "gather", resource: "berry" })],
      224,
    ),
    {
      kind: "flight",
      href: "/icons/berry-bush.svg",
      from: { x: 266.5, y: 108.5 },
      to: { x: 256, y: 118 },
    },
  );
});

test("a hit of the fibre, which has no prop, flies from under the mage's feet, 3 over the ground line", () => {
  assert.deepEqual(effectOf("fiber", 0, 1, [finished(FIBER)], 144), {
    kind: "flight",
    href: "/icons/flax.svg",
    from: { x: 176, y: 133 },
    to: { x: 176, y: 118 },
  });
});

test("„Obchód” flies one icon whatever it brought, and shows nothing when it brought nothing", () => {
  const patrol = { kind: "patrol", resource: "moss" };
  const brought = effectOf("moss", 0, 9, [finished(patrol)], 32);
  assert.equal(brought.kind, "flight");
  assert.equal(brought.href, "/icons/fern.svg");
  assert.equal(effectOf("moss", 4, 4, [finished(patrol)], 32), null);
});

test("a „Zbierz” that put no piece into the backpack puts the cloud of dust at the prop, centred on it with its bottom 2 under its line", () => {
  // Sticks: middle 91, so the 16-wide frame starts at 83; the line is 132, so its bottom is at 134.
  assert.deepEqual(effectOf("stick", 3, 3, [finished(STICK)]), {
    kind: "dust",
    sprite: {
      href: "/sprites/dust.png",
      width: 16,
      height: 16,
      frames: 8,
      x: 83,
      y: 134,
    },
  });
  // The fibre: under the mage's feet, centred on its body at 176, the ground line 136 and 2 under it.
  const fibre = effectOf("fiber", 0, 0, [finished(FIBER)], 144);
  assert.equal(fibre.kind, "dust");
  assert.equal(fibre.sprite.x, 168);
  assert.equal(fibre.sprite.y, 138);
});

test("no effect without exactly one end of a gathering, in a reading that has a map run before it", () => {
  assert.equal(effectOf("stick", 0, 1, []), null, "no end");
  assert.equal(effectOf("stick", 0, 1, [finished({ kind: "eat" })]), null);
  assert.equal(
    effectOf("stick", 0, 2, [finished(STICK), finished(STICK)]),
    null,
    "two ends are overdue",
  );
  assert.equal(
    effectOf("stick", 0, 1, [
      { kind: "mapRunStarted", seed: 1 },
      finished(STICK),
    ]),
    null,
    "a map run started",
  );
  assert.equal(
    sceneEffect(newGame(), carrying(sent(), "stick", 1), [finished(STICK)], 42),
    null,
    "no map run before",
  );
});

// Minor finding 3 of the review: a net change of the backpack decides hit or miss, so a reading in which
// an action that takes pieces out of it also ended cannot be read.
test("no effect where an action that takes pieces out of the backpack ended in the same reading", () => {
  for (const kind of [
    "craftCampfire",
    "lightCampfire",
    "lightItem",
    "feedCampfire",
    "eat",
  ])
    assert.equal(
      effectOf("stick", 2, 2, [finished(STICK), finished({ kind })]),
      null,
      kind,
    );
  // The ends of an action that takes none do not hinder it.
  assert.equal(
    effectOf("stick", 2, 3, [finished({ kind: "explore" }), finished(STICK)])
      .kind,
    "flight",
  );
});

test("the bending mage faces its prop: the sticks and the bush lie to its right, the moss to its left, and the fibre has none", () => {
  const facing = (action) => sceneDrawing(doing(action)).mage.bendFacing;
  assert.equal(facing({ kind: "gather", resource: "stick" }), "right");
  assert.equal(facing({ kind: "gather", resource: "berry" }), "right");
  assert.equal(facing({ kind: "patrol", resource: "moss" }), "left");
  assert.equal(facing({ kind: "gather", resource: "moss" }), "left");
  assert.equal(facing({ kind: "gather", resource: "fiber" }), null);
  assert.equal(facing({ kind: "explore" }), null);
});

// Derived from the places of the data, not from its `mageFaces`: the mage's figure is columns 20 to 44
// of its 64-pixel frame, so its middle is `SCENE.mageMiddle` right of the frame's edge, and a prop
// whose middle is to the right of it lies on the mage's right.
test("each prop's facing is the side its middle lies on, from the places of the data", () => {
  for (const [resource, prop] of Object.entries(SCENE_PROPS)) {
    const mageMiddle = prop.mageAt + SCENE.mageMiddle;
    const propMiddle = prop.place.x + prop.picture.width / 2;
    assert.equal(
      prop.mageFaces,
      propMiddle > mageMiddle ? "right" : "left",
      resource,
    );
  }
});
