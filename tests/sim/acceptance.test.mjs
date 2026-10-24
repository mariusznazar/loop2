import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";

// The task's acceptance criterion: on Las a program drawn from the closed list as this task leaves
// it passes 480 game minutes alive on a seed named here, and the empty program dies. The program
// below was found by trying seeds: the send with the real time ALIVE_REAL_MS, which takes the seed
// ALIVE_SEED, is one on which it lives. The empty program's death in minute 243, of cold, is worked
// out by hand: on Las the body cools by 0.024 °C a minute, so it is chilled from minute 84
// (37 − 0.024 × 84 = 34.984), and starving from minute 117 (100 − 0.6 × 117 = 29.8); health,
// full at 100, falls by 0.35 a minute from 84 to 116 (33 minutes, 11.55) and by 0.7 from 117 on,
// so 88.45 − 0.7 × 126 = 0.25 at minute 242 and below zero in minute 243, while chilled.

const [mapId, forest] = Object.entries(MAPS)[0];
// The first character a new game creates takes the id 1.
const characterId = 1;
const [stick, berry] = forest.resources.map((resource) => resource.id);
const SENT = { mapId, characterId };

const ALIVE_REAL_MS = 1760000800000;
const ALIVE_SEED = 1946377216;
const MINUTES = 480;

const rule = (condition, action) => ({ condition, action });
const ALWAYS = { kind: "always" };
const below = (kind, value) => ({ kind, value });
const itemBelow = (item, value) => ({ kind: "itemBelow", item, value });
const gather = (resource) => ({ kind: "gather", resource });
const walkTo = (resource) => ({ kind: "walkTo", resource });

/** Eats when hungry, keeps a campfire, keeps a berry and 8 sticks at hand, and seeks berries. */
const ACCEPTANCE_PROGRAM = {
  rules: [
    rule(below("satietyBelow", 35), { kind: "eat" }),
    rule(below("temperatureBelow", 36), { kind: "lightCampfire" }),
    rule(below("temperatureBelow", 36.5), { kind: "feedCampfire" }),
    rule(below("temperatureBelow", 35.2), { kind: "walkToCampfire" }),
    rule(below("campfireLeftBelow", 1), { kind: "craftCampfire" }),
    rule(itemBelow(berry, 1), gather(berry)),
    rule(itemBelow(berry, 1), walkTo(berry)),
    rule({ kind: "hereBelow", resource: berry, value: 1 }, { kind: "explore" }),
    rule(itemBelow(berry, 1), { kind: "wander" }),
    rule(itemBelow(stick, 8), gather(stick)),
    rule(itemBelow(stick, 8), walkTo(stick)),
    rule(below("temperatureBelow", 36), { kind: "lightItem" }),
    rule(ALWAYS, { kind: "explore" }),
    rule({ kind: "awayFromCampfire" }, { kind: "walkToCampfire" }),
    rule(ALWAYS, gather(stick)),
    rule(ALWAYS, gather(berry)),
    rule(ALWAYS, { kind: "wander" }),
  ],
};
const EMPTY_PROGRAM = { rules: [] };

/** The game sent to Las with the program on the named seed, then advanced by `minutes`. */
function played(program, minutes) {
  const ready = createCharacter(
    setProgram(newGame(), program).state,
    "Ala",
  ).state;
  const sent = send(ready, SENT, ALIVE_REAL_MS).state;
  return advanceMinutes(sent, minutes);
}

/** The kinds of the actions of the character that ended in the events. */
function finishedKinds(events) {
  return new Set(
    events
      .filter(
        (e) => e.kind === "activityFinished" && e.activity.kind === "rule",
      )
      .map((e) => e.activity.action.kind),
  );
}

test("the map is Las and the send takes the seed named here", () => {
  assert.equal(forest.name, "Las");
  const sent = send(
    createCharacter(newGame(), "Ala").state,
    SENT,
    ALIVE_REAL_MS,
  ).state;
  assert.equal(sent.run.seed, ALIVE_SEED);
});

test("the program holds every kind of condition and action of the closed list", () => {
  const conditions = new Set(
    ACCEPTANCE_PROGRAM.rules.map((r) => r.condition.kind),
  );
  const actions = new Set(ACCEPTANCE_PROGRAM.rules.map((r) => r.action.kind));
  assert.deepEqual([...conditions].sort(), [
    "always",
    "awayFromCampfire",
    "campfireLeftBelow",
    "hereBelow",
    "itemBelow",
    "satietyBelow",
    "temperatureBelow",
  ]);
  assert.deepEqual([...actions].sort(), [
    "craftCampfire",
    "eat",
    "explore",
    "feedCampfire",
    "gather",
    "lightCampfire",
    "lightItem",
    "walkTo",
    "walkToCampfire",
    "wander",
  ]);
});

test("on Las the program passes 480 game minutes alive on the named seed", () => {
  const { state, events } = played(ACCEPTANCE_PROGRAM, MINUTES);
  assert.equal(state.run.minute, MINUTES);
  assert.equal(state.run.death, null);
  assert.ok(state.run.body.health > 0);
  assert.ok(!events.some((e) => e.kind === "characterDied"));
  // It lives by what this task brings: it gathers, eats, builds, lights and feeds a campfire.
  const kinds = finishedKinds(events);
  for (const kind of [
    "gather",
    "eat",
    "craftCampfire",
    "lightCampfire",
    "feedCampfire",
  ]) {
    assert.ok(kinds.has(kind), `the program never ends a ${kind}`);
  }
});

test("on the same seed the empty program dies in game minute 243, of cold", () => {
  const { state, events } = played(EMPTY_PROGRAM, MINUTES);
  assert.deepEqual(state.run.death, { minute: 243, cause: "cold" });
  assert.equal(state.run.minute, 243);
  assert.deepEqual(
    events.filter((e) => e.kind === "characterDied"),
    [{ kind: "characterDied", minute: 243, cause: "cold" }],
  );
});
