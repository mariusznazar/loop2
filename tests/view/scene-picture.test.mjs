import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  SCENE,
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
import { sceneDrawing } from "../../dist/browser/view/scene-picture.js";
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

// The layout of the old Loop's scene (C:\Storage\repos\loop\src\components\probe\Scene.tsx lines
// 44-58 at cdc7c0d), in the pixels of the 336 × 152 frame. A place is the left edge and the line the
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
    ...Object.values(SCENE_MAGES).flatMap((sheets) => [
      sheets.idle.file,
      sheets.run.file,
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
