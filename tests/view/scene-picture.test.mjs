import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { inflateSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  SCENE,
  SCENE_CREATURES,
  SCENE_DUST,
  SCENE_FIGHT,
  SCENE_FIRE,
  SCENE_MAGES,
  SCENE_MOMENTS,
  SCENE_PROPS,
} from "../../dist/browser/sim/data/scene.js";
import {
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import {
  creatureEffect,
  creaturePlace,
  endEffectBegins,
  momentBegins,
  sceneDrawing,
  sceneEffect,
  scuffleCloud,
  tintShown,
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

// The places of the scene (D-318) in the pixels of the 336 × 152 frame, as the data of the scene
// holds them (src/browser/sim/data/scene.ts). A place is the left edge and the line the picture
// stands on; the mage's place is its frame's left edge, its feet on the ground line. The mage's frame
// is 64 pixels wide and the old Loop's was 32, so the places of the sticks, the berry bush, the fire
// and the clearing are the old Loop's moved 16 pixels left, which keeps the figure's centre where
// the old Loop had it; the moss place and the right edge are set otherwise in the data.
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
    SCENE_FIRE.low.picture.file,
    SCENE_DUST.file,
    ...Object.values(SCENE_MAGES).flatMap((sheets) => [
      sheets.idle.file,
      sheets.run.file,
      sheets.bend.file,
      sheets.death.file,
    ]),
    ...Object.values(SCENE_PROPS).map((prop) => prop.picture.file),
    ...Object.values(SCENE_CREATURES).flatMap((sheets) => [
      sheets.idle.file,
      sheets.run.file,
      sheets.bite.file,
      sheets.death.file,
    ]),
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

// D-367. A net change of the backpack decides hit or miss, so a reading in which an action that takes
// pieces out of it also ended cannot be read.
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

// --- the smaller flame, the tint of the light and the frost -------------------------------------

const FIRE_AT = () => sent().run.character.at;
const burningWith = (minutesLeft) =>
  sceneDrawing(withRun(sent(), { campfires: [{ at: FIRE_AT(), minutesLeft }] }))
    .fire;

// D-373. Catches a smaller flame that comes at the wrong minute (the last 20 minutes of burning are
// the ones with 20 or fewer left), one an extinguished fire takes, and a burning fire left with the
// full flame.
test("a burning fire draws the smaller flame with 20 minutes of burning left or fewer, and the full flame with more", () => {
  const FULL = "/sprites/fire.png";
  const SMALL = "/sprites/fire-small.png";
  assert.equal(burningWith(60).href, FULL);
  assert.equal(burningWith(20.5).href, FULL);
  assert.equal(burningWith(20).href, SMALL);
  assert.equal(burningWith(0.5).href, SMALL);
  const out = burningWith(0);
  assert.equal(out.href, FULL, "the extinguished fire stays as it is");
  assert.equal(out.burning, false);
  const small = burningWith(10);
  assert.deepEqual(
    { ...small, href: undefined },
    {
      href: undefined,
      width: 32,
      height: 32,
      frames: 4,
      x: 124,
      y: 132,
      burning: true,
    },
    "the same place, size and frame count as the full flame",
  );
});

/**
 * Pixels of a PNG file of 8-bit RGBA or RGB, rows of [r, g, b, a] (a is 255 for RGB) by the chunks of
 * its text, no library.
 */
function decodePng(file) {
  const bytes = readFileSync(join(SPRITES, file));
  assert.deepEqual(
    [...bytes.subarray(0, 8)],
    [137, 80, 78, 71, 13, 10, 26, 10],
  );
  const chunks = [];
  for (let at = 8; at < bytes.length;) {
    const length = bytes.readUInt32BE(at);
    chunks.push({
      type: bytes.toString("latin1", at + 4, at + 8),
      data: bytes.subarray(at + 8, at + 8 + length),
    });
    at += 12 + length;
  }
  const header = chunks[0].data;
  const width = header.readUInt32BE(0);
  const height = header.readUInt32BE(4);
  assert.equal(header[8], 8, "8 bits");
  assert.ok(header[9] === 6 || header[9] === 2, "RGBA or RGB");
  const bytesPerPixel = header[9] === 6 ? 4 : 3;
  const raw = inflateSync(
    Buffer.concat(chunks.filter((c) => c.type === "IDAT").map((c) => c.data)),
  );
  const stride = width * bytesPerPixel;
  const rows = [];
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = Buffer.from(
      raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)),
    );
    const above = y === 0 ? Buffer.alloc(stride) : rows[y - 1];
    for (let i = 0; i < stride; i++) {
      const left = i < bytesPerPixel ? 0 : line[i - bytesPerPixel];
      const up = above[i];
      const upLeft = i < bytesPerPixel ? 0 : above[i - bytesPerPixel];
      const predictor = [
        0,
        left,
        up,
        (left + up) >> 1,
        (() => {
          const p = left + up - upLeft;
          const [a, b, c] = [
            Math.abs(p - left),
            Math.abs(p - up),
            Math.abs(p - upLeft),
          ];
          return a <= b && a <= c ? left : b <= c ? up : upLeft;
        })(),
      ][filter];
      line[i] = (line[i] + predictor) & 255;
    }
    rows.push(line);
  }
  const pixels = rows.map((line) =>
    Array.from({ length: width }, (_, x) => [
      ...line.subarray(x * bytesPerPixel, x * bytesPerPixel + bytesPerPixel),
      ...(bytesPerPixel === 3 ? [255] : []),
    ]),
  );
  return { types: chunks.map((c) => c.type), width, height, pixels };
}

// D-373, D-271, D-273. A new file of assets/sprites/ does not change that trust boundary of the part,
// which review keeps until the boundary changes (sprite-file-content), but its content is checked: it must hold
// pixels alone and be the full flame's sheet with the flame cut down, on the same stones. Catches a file
// with a chunk that carries text or a profile, a sheet of another size, a colour the pack's fire does
// not have, and any change to a pixel that is not the flame's, a stone and a log included.
test("the smaller flame's file holds pixels alone, is the full flame's sheet with only the flame's pixels cut down, and has no new colour", () => {
  // The five reds and browns the full flame is drawn in, as the pixels of fire.png hold them.
  const FLAME = ["124,9,12", "178,24,24", "222,83,37", "40,22,19", "76,44,28"];
  const BLACK = [0, 0, 0, 255];
  const full = decodePng("fire.png");
  const small = decodePng("fire-small.png");
  assert.deepEqual(small.types, ["IHDR", "IDAT", "IEND"], "pixels alone");
  assert.deepEqual(
    [small.width, small.height],
    [128, 32],
    "four frames of 32 × 32",
  );
  const cut = [0, 0, 0, 0];
  for (let y = 0; y < 32; y++)
    for (let x = 0; x < 128; x++) {
      const was = full.pixels[y][x];
      const is = small.pixels[y][x];
      if (was.join() === is.join()) continue;
      assert.ok(
        FLAME.includes(was.slice(0, 3).join(",")),
        `${x},${y} was no flame`,
      );
      assert.deepEqual(is, BLACK, `${x},${y} is the pit's black`);
      cut[Math.floor(x / 32)]++;
    }
  // Each of the four frames loses part of its flame, none all of it.
  const flame = (image, frame) => {
    let count = 0;
    for (let y = 0; y < 32; y++)
      for (let x = frame * 32; x < frame * 32 + 32; x++)
        if (FLAME.includes(image.pixels[y][x].slice(0, 3).join(","))) count++;
    return count;
  };
  for (let frame = 0; frame < 4; frame++) {
    assert.ok(cut[frame] > 0, `frame ${frame} is smaller`);
    assert.ok(flame(small, frame) > 0, `frame ${frame} still has a flame`);
    assert.ok(
      flame(small, frame) <= flame(full, frame) * 0.7,
      `frame ${frame} is clearly smaller`,
    );
  }
});

const run = (patch) => withRun(sent(), patch);
const tintAt = (patch) => sceneDrawing(run(patch)).tint;

// D-316. Catches a tint that is not even in the streak, one that reaches 0.8 at another
// streak than the map asks for (Las 480, Las — głębiej 540), one that goes past 0.8 without a
// completion, and one that is 1 before it. The required streaks are the maps' own data.
test("the tint is the streak's share of the required streak times 0.8, and 1 at a completion alone", () => {
  assert.equal(tintAt({ streak: 0 }), 0);
  assert.equal(tintAt({ streak: 120 }), 0.2);
  assert.equal(tintAt({ streak: 480 }), 0.8);
  assert.equal(tintAt({ streak: 481 }), 0.8);
  assert.equal(tintAt({ streak: 100000 }), 0.8);
  assert.equal(tintAt({ streak: 480, completion: { minute: 480 } }), 1);
  assert.equal(tintAt({ streak: 0, completion: { minute: 1 } }), 1);
  const deep = Object.keys(MAPS)[1];
  assert.equal(tintAt({ mapId: deep, streak: 270 }), 0.4);
  assert.equal(tintAt({ mapId: deep, streak: 540 }), 0.8);
  assert.equal(
    tintAt({ mapId: deep, streak: 540, defeatedAttacks: 1 }),
    0.8,
    "a streak that meets only one requirement is no completion",
  );
});

test("the tint grows evenly in the streak, never down", () => {
  let last = -1;
  for (let streak = 0; streak <= 600; streak++) {
    const tint = tintAt({ streak });
    assert.ok(tint >= last, `streak ${streak}`);
    last = tint;
  }
  assert.equal(tintAt({ streak: 240 }) * 2, tintAt({ streak: 480 }));
});

const frostAt = (temperature) =>
  sceneDrawing(run({ body: { ...sent().run.body, temperature } })).frost;

// D-372. Catches a frost at 37 °C, a thickness that does not follow the cold evenly from 37 to 35 °C
// (half, 8 pixels, at 36 °C), one that is not whole pixels, one that goes on below 35 °C, and one that
// shrinks as the body cools.
test("the frost is none at 37 °C, half of 16 pixels at 36 °C and the whole 16 at 35 °C and below", () => {
  assert.equal(frostAt(37), 0);
  assert.equal(frostAt(36.5), 4);
  assert.equal(frostAt(36), 8);
  assert.equal(frostAt(35.5), 12);
  assert.equal(frostAt(35), 16);
  assert.equal(frostAt(34.99), 16);
  assert.equal(frostAt(10), 16);
  assert.equal(frostAt(-300), 16);
  let last = -1;
  for (let degrees = 37; degrees >= 34; degrees -= 0.01) {
    const thickness = frostAt(degrees);
    assert.ok(Number.isInteger(thickness), `${degrees}`);
    assert.ok(thickness >= last, `${degrees}`);
    last = thickness;
  }
});

test("the frost follows the body's temperature and nothing else, the streak included", () => {
  assert.equal(sceneDrawing(run({ streak: 400 })).frost, 0);
  assert.equal(
    sceneDrawing(
      run({ streak: 400, body: { ...sent().run.body, temperature: 36 } }),
    ).frost,
    8,
  );
});

/** A tint shown after a first draw at `shown` (an unplaced first one). */
const SHOWN = (shown, from = null, serial = 1) => ({ shown, from, serial });

// D-316, D-322. Catches a tint that returns at once, one that returns while time stands, one that
// jumps at a death or a completion, and one that is restarted by a return already running.
test("the tint shown stands at once at a first draw and where a map run starts, wherever it stood", () => {
  assert.deepEqual(tintShown(null, 0.4, "going", false), SHOWN(0.4));
  assert.deepEqual(tintShown(SHOWN(0.8), 0, "going", true), SHOWN(0, null, 2));
  assert.deepEqual(
    tintShown(SHOWN(0.8, 0.8), 0, "paused", true),
    SHOWN(0, null, 2),
  );
});

test("while the scene goes on, a fall of the target starts a return from the tint shown, and a rise only follows", () => {
  assert.deepEqual(tintShown(SHOWN(0.8), 0, "going", false), SHOWN(0, 0.8, 2));
  assert.deepEqual(
    tintShown(SHOWN(0.8), 0.7, "going", false),
    SHOWN(0.7, 0.8, 2),
  );
  assert.deepEqual(
    tintShown(SHOWN(0.2), 0.3, "going", false),
    SHOWN(0.3, null, 1),
  );
  const same = SHOWN(0.2);
  assert.equal(tintShown(same, 0.2, "going", false), same, "nothing changed");
  // A return that runs is kept, a rise and a further fall alike: no jump from where it has got to.
  const running = SHOWN(0, 0.8, 2);
  assert.deepEqual(
    tintShown(running, 0.04, "going", false),
    SHOWN(0.04, 0.8, 2),
  );
  assert.deepEqual(
    tintShown(SHOWN(0.04, 0.8, 2), 0, "going", false),
    SHOWN(0, 0.8, 2),
  );
});

test("while time stands, in the player's pause and at a discovery, the tint shown is kept, and the return starts where the scene goes on", () => {
  for (const standing of ["paused", "discovery"]) {
    const held = SHOWN(0.8);
    assert.equal(tintShown(held, 0, standing, false), held, standing);
    assert.equal(tintShown(held, 0.9, standing, false), held, standing);
  }
  const held = SHOWN(0.8);
  assert.deepEqual(
    tintShown(tintShown(held, 0, "paused", false), 0, "going", false),
    SHOWN(0, 0.8, 2),
  );
});

test("at a death and at a completion the tint stands at once where the streak or the completion puts it, and a return running is dropped", () => {
  assert.deepEqual(tintShown(SHOWN(0.6), 0, "dead", false), SHOWN(0, null, 2));
  assert.deepEqual(
    tintShown(SHOWN(0.8), 1, "completed", false),
    SHOWN(1, null, 2),
  );
  assert.deepEqual(
    tintShown(SHOWN(0, 0.8, 2), 0, "dead", false),
    SHOWN(0, null, 3),
  );
  const stood = SHOWN(1);
  assert.equal(tintShown(stood, 1, "completed", false), stood);
});

// --- the three moments in which time stands still (D-322) ---------

const NOTHING = NO_UNDERSTANDING_ITEMS;
/** The state at a stop at a discovery of what `found` lists, the rest of the Understanding empty. */
const discovering = (found) => ({
  ...doing({ kind: "explore" }),
  paused: true,
  discovery: { ...NOTHING, ...found },
});
const dying = (cause) =>
  withRun({ ...sent(), paused: false }, { death: { minute: 4, cause } });
const completing = () =>
  withRun({ ...sent(), paused: false }, { completion: { minute: 4 } });
const momentOf = (state) => sceneDrawing(state).moment;

// Catches a scene that shows an effect of a moment while the map run goes on or the player pauses it.
test("the scene shows a moment only at a discovery, after a death and after a completion", () => {
  assert.equal(momentOf({ ...doing(ACT_EXPLORE), paused: false }), null);
  assert.equal(momentOf({ ...doing(ACT_EXPLORE), paused: true }), null);
  assert.equal(
    momentOf(discovering({ actions: ["explore"] })).kind,
    "discovery",
  );
  assert.equal(momentOf(dying("hunger")).kind, "death");
  assert.equal(momentOf(completing()).kind, "completion");
});

const ACT_EXPLORE = { kind: "explore" };

// D-322. Catches a scene that begins a moment from anything but the events of a
// simulation call: a scene drawn again has none, and the events must be those of its own moment.
test("a moment has just begun where the events of the call carry its discovery, death or completion", () => {
  const discovered = { kind: "discovered", minute: 3, ...NOTHING };
  const died = { kind: "characterDied", minute: 3, cause: "cold" };
  const solved = { kind: "mapRunCompleted", minute: 3 };
  const other = { kind: "moved", minute: 3, from: {}, to: {} };
  assert.equal(momentBegins("discovery", [other, discovered]), true);
  assert.equal(momentBegins("dead", [other, died]), true);
  assert.equal(momentBegins("completed", [solved]), true);
  assert.equal(momentBegins("discovery", []), false, "a scene drawn again");
  assert.equal(momentBegins("dead", [discovered, solved]), false);
  assert.equal(momentBegins("completed", [died]), false);
  assert.equal(momentBegins("going", [discovered, died, solved]), false);
  assert.equal(momentBegins("paused", [discovered, died, solved]), false);
});

// D-322. The game view waits for the effect of an end only where the scene plays one.
test("the end effect begins at the game minute of a death or a completion, not at a discovery", () => {
  assert.equal(
    endEffectBegins([{ kind: "characterDied", minute: 1, cause: "cold" }]),
    true,
  );
  assert.equal(endEffectBegins([{ kind: "mapRunCompleted", minute: 1 }]), true);
  assert.equal(
    endEffectBegins([{ kind: "discovered", minute: 1, ...NOTHING }]),
    false,
  );
  assert.equal(endEffectBegins([]), false);
});

// D-322. The icons are the files of the game's data: a discovered action's, a discovered
// item's and the campfire's, in the order of the band's text, each on a plaque in a row over the
// clearing centred on the mage's middle, 144 + 32 = 176, the line 56, a step of 22. Catches a plaque for
// a thing with no icon, a missing icon, a row that is not centred and a plaque that comes out of the
// wrong pine: the left half of a row from the left pine, the right half from the right one.
test("a discovery shows the icon of each thing it revealed that has one, in a centred row over the clearing", () => {
  const moment = momentOf(
    discovering({
      actions: ["explore", "wander"],
      items: ["stick", "campfire"],
      conditions: ["always"],
      creatures: ["wolf"],
    }),
  );
  const left = { x: 120, y: 50 };
  const right = { x: 265, y: 50 };
  assert.deepEqual(
    moment.plaques.map((p) => [p.href, p.x, p.y, p.from]),
    [
      ["/icons/binoculars.svg", 143, 56, left],
      ["/icons/hiking.svg", 165, 56, left],
      ["/icons/wood-stick.svg", 187, 56, right],
      ["/icons/campfire.svg", 209, 56, right],
    ],
  );
  assert.equal(moment.key, "discovery:" + sent().run.minute);
});

// Catches two plaques of one icon: „Idź” and „Idź — ognisko” share the direction sign, „Zbierz” and
// „Obchód” the grab; one discovery shows each picture once.
test("a discovery shows an icon once, however many of the things it revealed share it", () => {
  const moment = momentOf(
    discovering({
      actions: ["walkTo", "walkToCampfire", "gather", "patrol"],
    }),
  );
  assert.deepEqual(
    moment.plaques.map((p) => [p.href, p.x]),
    [
      ["/icons/direction-sign.svg", 165],
      ["/icons/grab.svg", 187],
    ],
  );
});

// Catches a plaque, or a band, for what the data gives no icon: conditions, creatures and skill trees
// are named by the band over the program alone (D-122).
test("a discovery of conditions and creatures alone shows no plaque", () => {
  const moment = momentOf(
    discovering({
      conditions: ["always", "temperatureBelow"],
      creatures: ["wolf"],
    }),
  );
  assert.equal(moment.kind, "discovery");
  assert.deepEqual(moment.plaques, []);
});

// Catches a row that runs out of the frame: eight to a row, the ninth in a second row 22 above the
// first, centred alone.
test("nine plaques stand in two rows, eight and one, each row centred", () => {
  const moment = momentOf(
    discovering({
      actions: [
        "explore",
        "wander",
        "walkTo",
        "gather",
        "craftCampfire",
        "lightCampfire",
        "feedCampfire",
        "eat",
        "kick",
      ],
    }),
  );
  assert.equal(moment.plaques.length, 9);
  assert.deepEqual(
    moment.plaques.map((p) => [p.x, p.y]),
    [
      [99, 56],
      [121, 56],
      [143, 56],
      [165, 56],
      [187, 56],
      [209, 56],
      [231, 56],
      [253, 56],
      [176, 34],
    ],
  );
});

// D-322. Catches a cold layer after a death of hunger or in a fight, which the scene
// does not show, and a death of cold with none.
test("after a death the scene shows the fall, and the cold layer after a death of cold alone", () => {
  assert.deepEqual(momentOf(dying("cold")), {
    kind: "death",
    key: "death:4",
    cold: true,
  });
  assert.equal(momentOf(dying("hunger")).cold, false);
  assert.equal(momentOf(dying("combat")).cold, false);
});

// D-322. Catches plaques of a discovery over a death or a completion in the game minute
// of that discovery: the scene shows the effect of the end alone.
test("a death or a completion in the game minute of a discovery shows the effect of the end alone", () => {
  const held = { ...NOTHING, actions: ["explore"] };
  const died = withRun(
    { ...sent(), paused: true, discovery: held },
    { death: { minute: 4, cause: "hunger" } },
  );
  assert.equal(momentOf(died).kind, "death");
  const done = withRun(
    { ...sent(), paused: false, discovery: held },
    { completion: { minute: 4 } },
  );
  assert.equal(momentOf(done).kind, "completion");
});

// D-322, D-271. The specks lie in a part of the frame, not over the whole scene, each a
// whole pixel of the scene on its grid rising by whole pixels, over the snow of the open ground the
// forest picture holds there: a speck that rose over a tree would be a colour on a ground it does not
// stand out from.
test("the specks of a completion rise over a part of the frame, on the scene's grid, over the open snow alone", () => {
  const { specks } = momentOf(completing());
  assert.ok(specks.length >= 12, "enough of them to be a shower");
  const frame = decodePng(SCENE.background.file);
  const luminance = ([r, g, b]) => {
    const linear = (v) => ((v / 255 + 0.055) / 1.055) ** 2.4;
    return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
  };
  for (const { x, y, rise, delay, shade } of specks) {
    for (const value of [x, y, rise, delay / 100])
      assert.ok(Number.isInteger(value), `${x},${y}: a whole number`);
    assert.ok(rise >= 1 && delay >= 0 && delay <= 900);
    assert.ok(["ember", "bronze"].includes(shade));
    for (let row = y - rise; row <= y; row++)
      assert.ok(
        luminance(frame.pixels[row][x]) > 0.5,
        `speck ${x},${y} passes over ${row} where the picture is no snow`,
      );
  }
  const xs = specks.map((speck) => speck.x);
  const tops = specks.map((speck) => speck.y - speck.rise);
  const area =
    ((Math.max(...xs) - Math.min(...xs)) *
      (SCENE.groundLine - Math.min(...tops))) /
    (frame.width * frame.height);
  assert.ok(area < 0.25, "a part of the frame, not the whole scene");
});

// Catches a plaque row that would stand over the mage's badge or outside the frame, and a death sheet
// that is not the mage's own size: the places the data gives are inside the frame of 336 × 152.
test("the places of the moments in the data lie inside the frame", () => {
  const { centreX, y, step, perRow, rowStep, from } = SCENE_MOMENTS.discovery;
  assert.equal(centreX, SCENE.clearingX + SCENE.mageMiddle);
  assert.ok(centreX - (perRow / 2) * step > 0);
  assert.ok(centreX + (perRow / 2) * step < SCENE.background.width);
  assert.ok(y - rowStep > 0, "a second row stands in the frame");
  for (const point of Object.values(from)) {
    assert.ok(point.x > 0 && point.x < SCENE.background.width);
    assert.ok(point.y > 0 && point.y < SCENE.background.height);
  }
});

// D-322, D-271, D-273. The death sheet holds pixels alone and six frames of 64 × 64 pixels;
// in the first the mage stands, taller than wide, in the last it lies, wider than tall, and in every one
// its lowest pixel is the frame's bottom row, the ground line, so the fall does not float. Catches a file
// with a chunk of text or a profile, a sheet of another size, a frame whose mage hangs above the ground
// and a last frame in which the mage still stands. Where the pixels come from is not tested: the sheet is
// the pack's death sheet of the mage moved into the frames of the scene, which only the source can show.
test("the death sheet holds pixels alone, six frames of the mage's size, the first standing and the last lying on the ground line", () => {
  const sheet = decodePng("mage-death.png");
  assert.deepEqual(sheet.types, ["IHDR", "IDAT", "IEND"], "pixels alone");
  assert.deepEqual([sheet.width, sheet.height], [384, 64]);
  assert.deepEqual(
    [
      SCENE_MAGES.elementalMage.death.width,
      SCENE_MAGES.elementalMage.death.height,
      SCENE_MAGES.elementalMage.death.frames,
    ],
    [64, 64, 6],
  );
  const boxes = [];
  for (let frame = 0; frame < 6; frame++) {
    let [left, top, right, bottom] = [64, 64, -1, -1];
    for (let y = 0; y < 64; y++)
      for (let x = 0; x < 64; x++)
        if (sheet.pixels[y][frame * 64 + x][3] > 0) {
          [left, top] = [Math.min(left, x), Math.min(top, y)];
          [right, bottom] = [Math.max(right, x), Math.max(bottom, y)];
        }
    boxes.push({ width: right - left + 1, height: bottom - top + 1, bottom });
  }
  for (const box of boxes) assert.equal(box.bottom, 63, "on the ground line");
  assert.ok(boxes[0].height > boxes[0].width, "the first frame stands");
  assert.ok(boxes[5].width > boxes[5].height, "the last frame lies");
});

// --- the creature that attacks (D-316, D-271, D-317) -----------------------------------------------

const FIGHT_FROM = 181;
const ACTIVE = {
  creatureId: "wolf",
  attackMinute: FIGHT_FROM,
  resolveMinute: FIGHT_FROM + 5,
};
const RESULT = (outcome) => ({ outcome });
const SCENE_WIDTH = 336;
const MAGE_WIDTH = 64;

/** The sent state in the minutes of a combat: no current activity, the combat active. */
const fighting = () =>
  withRun(sent(), {
    current: null,
    minute: FIGHT_FROM,
    activeCombat: ACTIVE,
    lastCombat: { ...ACTIVE, result: null },
  });

/** The state after a combat that had the result given. */
const afterFight = (outcome, patch = {}) =>
  withRun(sent(), {
    minute: FIGHT_FROM + 5,
    activeCombat: null,
    lastCombat: { ...ACTIVE, result: RESULT(outcome) },
    ...patch,
  });

const creatureOf = (state) => sceneDrawing(state).creature;

// D-316. Catches a scene that shows no creature in the minutes of a combat, one that shows it with no
// scuffle, and a creature drawn from files the data does not name or from another size than theirs.
test("through the minutes of a combat the scene draws the wolf scuffling, from the files and frames of the data", () => {
  const creature = creatureOf(fighting());
  assert.equal(creature.scuffling, true);
  assert.equal(creature.key, "fight:181");
  assert.deepEqual(
    [creature.idle, creature.run, creature.bite, creature.death],
    [
      { href: "/sprites/wolf-idle.png", width: 64, height: 32, frames: 1 },
      { href: "/sprites/wolf-run.png", width: 64, height: 32, frames: 5 },
      { href: "/sprites/wolf-bite.png", width: 64, height: 32, frames: 5 },
      { href: "/sprites/wolf-death.png", width: 64, height: 32, frames: 4 },
    ],
  );
  assert.deepEqual(creature.cloud, {
    href: "/sprites/dust.png",
    width: 16,
    height: 16,
    frames: 8,
  });
});

// D-316, Q4. Catches a wolf left in the scene after any end of a combat but the mage's death and a
// map run solved in the combat, and one that disappears at those two.
test("the wolf stays after the mage's death in the fight and after a map run solved in a combat, and after no other end", () => {
  assert.equal(creatureOf(sent()), null, "no combat yet");
  for (const outcome of ["creatureDefeated", "creatureDeparted"])
    assert.equal(creatureOf(afterFight(outcome)), null, outcome);
  const died = afterFight("characterDied", {
    death: { minute: FIGHT_FROM + 5, cause: "combat" },
  });
  assert.deepEqual(
    [creatureOf(died).scuffling, creatureOf(died).key],
    [false, "fight:181"],
  );
  const solved = withRun(fighting(), {
    activeCombat: null,
    completion: { minute: FIGHT_FROM + 2 },
  });
  assert.equal(creatureOf(solved).scuffling, false);
  // A completion after a combat that had a result leaves none, and nor does a death of cold.
  assert.equal(
    creatureOf(afterFight("creatureDefeated", { completion: { minute: 300 } })),
    null,
  );
  assert.equal(
    creatureOf(
      afterFight("creatureDefeated", { death: { minute: 300, cause: "cold" } }),
    ),
    null,
  );
});

// D-316, Q2. Catches a wolf on the wrong side, one that overlaps the figure of the mage or leaves the
// picture, and a gap that differs from the data's. The mage's figure is columns 20 to 44 of its frame:
// at 144 it ends at 189, so the wolf starts at 191; at the right edge, 275, the figure faces left and
// starts at column 19, 294, so the wolf's frame of 64 ends at 292 and starts at 228.
test("the wolf stands on the right of the mage, 2 pixels from its figure, and on the left where the right would leave the picture", () => {
  assert.equal(SCENE_FIGHT.gap, 2);
  assert.deepEqual(creaturePlace(144, MAGE_WIDTH, 64, SCENE_WIDTH), {
    side: "right",
    x: 191,
    middle: 190,
  });
  assert.deepEqual(creaturePlace(275, MAGE_WIDTH, 64, SCENE_WIDTH), {
    side: "left",
    x: 228,
    middle: 293,
  });
  // Every place the mage stands at but the right edge has the wolf on its right, inside the picture:
  // at the berry bush, 224, its frame ends at 335 of 336.
  for (const x of [32, 42, 80, 144, 224]) {
    const place = creaturePlace(x, MAGE_WIDTH, 64, SCENE_WIDTH);
    assert.equal(place.side, "right", `mage at ${x}`);
    assert.ok(place.x + 64 <= SCENE_WIDTH, `mage at ${x}`);
  }
  assert.equal(creaturePlace(224, MAGE_WIDTH, 64, SCENE_WIDTH).x, 271);
});

// D-316, Q3. Catches a cloud of the scuffle that stands off the gap or in the air, and a size other
// than the dust's.
test("the cloud of the scuffle stands over the middle of the gap, its bottom 3 above the ground line", () => {
  const cloud = creatureOf(fighting()).cloud;
  const right = scuffleCloud(creaturePlace(144, 64, 64, 336), cloud);
  assert.deepEqual(
    [right.x, right.y, right.width, right.height],
    [182, 133, 16, 16],
  );
  const left = scuffleCloud(creaturePlace(275, 64, 64, 336), cloud);
  assert.equal(left.x, 285);
});

const ATTACKED = { kind: "attacked", minute: FIGHT_FROM, creature: "wolf" };
const ENDED = (outcome) => ({
  kind: "combatEnded",
  minute: FIGHT_FROM + 5,
  outcome,
});

// D-317, D-316. Catches an effect that is not made at the attack, a run in that carries the wrong
// fight, and a reading with no previous reading, a map run started or several ends that shows one.
test("the wolf runs in at the reading whose events carry its attack, and at none else", () => {
  const before = sent();
  const effect = creatureEffect(
    before,
    fighting(),
    [ATTACKED],
    144,
    MAGE_WIDTH,
    SCENE_WIDTH,
  );
  assert.deepEqual(effect, { kind: "creatureIn", key: "fight:181" });
  const none = (events, from = before, to = fighting()) =>
    creatureEffect(from, to, events, 144, MAGE_WIDTH, SCENE_WIDTH);
  assert.equal(none([]), null, "no event of a fight");
  assert.equal(none([ATTACKED, ENDED("creatureDefeated")]), null, "overdue");
  assert.equal(
    none([{ kind: "mapRunStarted", seed: 1 }, ATTACKED]),
    null,
    "a map run started",
  );
  assert.equal(
    none([ATTACKED], { ...before, run: null }),
    null,
    "no run before",
  );
});

// D-317, Q4. Catches an end that shows the wrong effect, one that is made for the mage's death, where
// the wolf stands, one for a reading whose previous state held no combat, and a run off that does not
// reach the right edge of the frame.
test("the wolf falls where it stood when defeated and runs off to the right edge when it departs, and the mage's death shows no effect", () => {
  const was = fighting();
  const run = (outcome, mageX = 144) =>
    creatureEffect(was, afterFight(outcome), [ENDED(outcome)], mageX, 64, 336);
  const down = run("creatureDefeated");
  assert.equal(down.kind, "creatureDown");
  assert.equal(down.faces, "left");
  assert.deepEqual(
    [down.sprite.href, down.sprite.x, down.sprite.y, down.sprite.frames],
    ["/sprites/wolf-death.png", 191, 136, 4],
  );
  const out = run("creatureDeparted");
  assert.equal(out.kind, "creatureOut");
  assert.equal(out.faces, "right");
  assert.deepEqual(
    [out.sprite.href, out.sprite.x, out.run, out.sprite.frames],
    ["/sprites/wolf-run.png", 191, 336 - 191, 5],
  );
  assert.equal(run("characterDied"), null, "the mage's death");
  assert.equal(
    creatureEffect(
      sent(),
      afterFight("creatureDefeated"),
      [ENDED("creatureDefeated")],
      144,
      64,
      336,
    ),
    null,
    "no combat before",
  );
  // On the left of the mage, at the right edge, the wolf faces right where it falls.
  assert.equal(run("creatureDefeated", 275).faces, "right");
  assert.equal(run("creatureDefeated", 275).sprite.x, 228);
});

// D-271, D-273, D-316. The wolf's files hold pixels alone, are the sheets of the data in size, hold only
// fully opaque or fully clear pixels (the pack's own), and each frame has the wolf's feet on its bottom row,
// the first frame of the death sheet standing and the last lying, so the bite, the death and the run do not
// jump when the animation changes. Catches a file with a chunk that carries text or a profile, a sheet of
// another size, a frame cut off the ground and a death sheet that does not end lying. Where the pixels come
// from is not tested: they are the pack's own pixels moved unchanged into frames of 64 × 32, which only
// the source sheet can show.
test("the wolf's files hold pixels alone, in frames of 64 × 32 with the feet on the bottom row", () => {
  const frameOf = (image, frame) => {
    let [left, top, right, bottom] = [64, 32, -1, -1];
    for (let y = 0; y < 32; y++)
      for (let x = 0; x < 64; x++) {
        const alpha = image.pixels[y][frame * 64 + x][3];
        assert.ok(alpha === 0 || alpha === 255, "no half-clear pixel");
        if (alpha > 0) {
          [left, top] = [Math.min(left, x), Math.min(top, y)];
          [right, bottom] = [Math.max(right, x), Math.max(bottom, y)];
        }
      }
    return { width: right - left + 1, height: bottom - top + 1, bottom };
  };
  for (const [name, picture] of Object.entries(SCENE_CREATURES.wolf)) {
    const image = decodePng(picture.file);
    assert.deepEqual(
      image.types,
      ["IHDR", "IDAT", "IEND"],
      `${name}: pixels alone`,
    );
    assert.deepEqual(
      [image.width, image.height],
      [64 * picture.frames, 32],
      `${name}: the data's size`,
    );
    for (let frame = 0; frame < picture.frames; frame++)
      assert.equal(frameOf(image, frame).bottom, 31, `${name} frame ${frame}`);
  }
  const death = decodePng(SCENE_CREATURES.wolf.death.file);
  const first = frameOf(death, 0);
  const last = frameOf(death, 3);
  assert.ok(first.height > 25, "the first frame stands");
  assert.ok(last.width > last.height * 2, "the last frame lies");
});
