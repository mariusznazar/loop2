// The clock and the bar of the solving condition in the header of the screen of a map run (D-311,
// D-122, D-132, D-62, D-133): „Minuta {game minute}”, „ (pauza)” after it at every pause, the stop
// at a discovery included, and at the game minute of the end, with no „ (pauza)”, after a death and
// a completion; the character's action and the streak are not in it. The words and the share of
// each requirement of the solving condition. And the text of a pause button and of a discovery
// (D-122).
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { RESOURCES } from "../../dist/browser/sim/data/resources.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setPaused,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { solvingRequirements } from "../../dist/browser/sim/run.js";
import {
  clockText,
  discoveryText,
  pauseLabel,
  requirementShare,
  requirementText,
} from "../../dist/browser/view/status-row.js";
import { programFromRules, ruleActivity } from "../sim/program-fixture.mjs";
import {
  newKnowingGame,
  withEdgeSolved,
} from "../sim/understanding-fixture.mjs";

const SENT = {
  mapId: "forest",
  // The first character a new game creates takes the id 1.
  characterId: 1,
};
const ALWAYS = { kind: "always" };

/** A game with a map run started by `send` under the given program rules. */
function sent(rules) {
  const program = setProgram(
    withEdgeSolved(newKnowingGame()),
    programFromRules(...rules),
  ).state;
  return send(createCharacter(program, "Ala").state, SENT, 1760000000000).state;
}

/** The same game with the map run's current activity replaced by a rule's action. */
function doing(state, action) {
  const current = {
    ...state.run.current,
    activity: ruleActivity(action),
  };
  return { ...state, run: { ...state.run, current } };
}

/** The same game with its map run ended in a completion at the given minute. */
function completed(state, minute) {
  return {
    ...state,
    run: { ...state.run, minute, completion: { minute } },
  };
}

/** The same game with its map run ended in death of the given cause at the given minute. */
function dead(state, minute, cause) {
  return {
    ...state,
    run: { ...state.run, minute, death: { minute, cause } },
  };
}

// D-311, D-122. Catches a clock that is the old status row (the minute followed by the activity
// and the streak) or that leaves out „ (pauza)” at a pause.
test("a running map run reads „Minuta {game minute}” and a paused one adds „ (pauza)”", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  const run = { ...state.run, minute: 312 };
  assert.equal(clockText(run, false), "Minuta 312");
  assert.equal(clockText(run, true), "Minuta 312 (pauza)");
});

test("the minute shown is the map run's game minute", () => {
  const state = advanceMinutes(
    sent([{ condition: ALWAYS, action: { kind: "explore" } }]),
    7,
  ).state;
  assert.equal(state.run.minute, 7);
  assert.equal(clockText(state.run, state.paused), "Minuta 7");
});

// D-311: the character's action is no longer in the header, and the streak is the bar's. The
// activities are the ones the status row once worded one by one: exploring, wandering, walking
// to and gathering each resource, a step to the campfire, waiting, an encounter.
test("the clock names no activity, resource, creature or streak, whatever the character does", () => {
  const base = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  const withStreak = {
    ...base,
    run: { ...base.run, streak: 120, defeatedAttacks: 1 },
  };
  const actions = [
    { kind: "explore" },
    { kind: "wander" },
    { kind: "walkToCampfire" },
    { kind: "eat" },
    ...Object.keys(RESOURCES).flatMap((resource) => [
      { kind: "walkTo", resource },
      { kind: "gather", resource },
    ]),
  ];
  for (const action of actions) {
    const run = doing(withStreak, action).run;
    assert.equal(clockText(run, false), "Minuta 0", JSON.stringify(action));
    assert.equal(clockText(run, true), "Minuta 0 (pauza)");
  }
  const waiting = sent([]);
  assert.equal(waiting.run.current.activity.kind, "wait");
  assert.equal(clockText(waiting.run, false), "Minuta 0");
  const encounter = {
    ...withStreak.run,
    mapId: "forestDeep",
    minute: 12,
    activeCombat: {
      creatureId: "wolf",
      attackMinute: 10,
      resolveMinute: 15,
      result: null,
    },
    current: null,
  };
  assert.equal(clockText(encounter, false), "Minuta 12");
});

test("a paused map run gets „ (pauza)” appended, and loses it when resumed", () => {
  const running = advanceMinutes(
    sent([{ condition: ALWAYS, action: { kind: "explore" } }]),
    3,
  ).state;
  const paused = setPaused(running, true).state;
  assert.equal(clockText(paused.run, paused.paused), "Minuta 3 (pauza)");
  const waiting = setPaused(sent([]), true).state;
  assert.equal(clockText(waiting.run, waiting.paused), "Minuta 0 (pauza)");
  const resumed = setPaused(paused, false).state;
  assert.equal(clockText(resumed.run, resumed.paused), "Minuta 3");
});

// D-122: the stop at a discovery is the same pause, so its clock reads „ (pauza)” too. The game is
// stopped by the simulation at the first chill, game minute 84 (the minute the case of the screen
// of a map run, tests/view/run-screen.test.mjs, relies on).
test("at a stop at a discovery the clock reads „ (pauza)” as at the player's pause, and loses it at „Wznów”", () => {
  const started = send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
    { ...SENT, mapId: "forest" },
    1760000000000,
  );
  const stopped = advanceMinutes(started.state, 100).state;
  assert.equal(stopped.run.minute, 84, "precondition: the first chill");
  assert.ok(stopped.discovery !== null, "precondition: a discovery is held");
  assert.equal(clockText(stopped.run, stopped.paused), "Minuta 84 (pauza)");
  const resumed = setPaused(stopped, false).state;
  assert.equal(clockText(resumed.run, resumed.paused), "Minuta 84");
});

// D-62, D-334: the cause of the death is „Teraz”'s (tests/view/now-lines.test.mjs), the clock only
// stands at the game minute of the death.
test("after a death the clock stands at the minute of the death, with no cause and no „ (pauza)”, paused or not", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  assert.equal(clockText(dead(state, 312, "cold").run, false), "Minuta 312");
  assert.equal(clockText(dead(state, 287, "hunger").run, false), "Minuta 287");
  assert.equal(clockText(dead(state, 15, "combat").run, false), "Minuta 15");
  const paused = setPaused(state, true).state;
  assert.equal(clockText(dead(paused, 312, "cold").run, true), "Minuta 312");
});

// D-132: the completion text is „Teraz”'s, the clock only stands at the game minute of the
// completion.
test("after a completion the clock stands at the minute of the completion, with no completion text and no „ (pauza)”, paused or not", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  const done = completed(state, 480);
  assert.equal(clockText(done.run, false), "Minuta 480");
  assert.equal(clockText(done.run, true), "Minuta 480");
});

test("„Pauza” while running, „Wznów” while paused, and no pause button after death", () => {
  const running = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  assert.equal(pauseLabel(running), "Pauza");
  const paused = setPaused(running, true).state;
  assert.equal(pauseLabel(paused), "Wznów");
  assert.equal(pauseLabel(dead(running, 312, "cold")), null);
  assert.equal(pauseLabel(dead(paused, 312, "hunger")), null);
});

test("a mage left without a program dies, and the clock reads the minute of its death", () => {
  const ended = advanceMinutes(sent([]), 1000).state;
  assert.ok(ended.run.death, "the mage died within 1000 minutes");
  assert.ok(ended.run.death.minute < 1000);
  assert.equal(ended.run.death.cause, "cold");
  assert.equal(
    clockText(ended.run, ended.paused),
    `Minuta ${ended.run.death.minute}`,
  );
  assert.equal(pauseLabel(ended), null);
});

// D-122: the band under the header says what was revealed, and goes when the player moves on.
const EXPLORED_REVEALED = {
  actions: ["walkTo", "gather"],
  conditions: ["hereBelow", "itemBelow"],
  items: ["stick", "berry"],
  trees: [],
  creatures: [],
};

test("the text for the first finished exploration of a tile with sticks and berries is the example of D-122", () => {
  assert.equal(
    discoveryText(EXPLORED_REVEALED),
    "Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach można teraz sprawdzić: Tu leży mniej niż … szt., Zapas poniżej … szt.",
  );
});

test("the text for the first chill names its actions and its condition with the unit", () => {
  assert.equal(
    discoveryText({
      actions: ["explore", "wander"],
      conditions: ["temperatureBelow"],
      items: [],
      trees: ["exploration"],
      creatures: [],
    }),
    "Odkryto: Eksploruj, Wędruj, drzewo umiejętności Eksploracja. W regułach można teraz sprawdzić: Temperatura poniżej … °C.",
  );
});

test("a discovery of an action alone has no second sentence, and the campfire is named with a capital letter", () => {
  assert.equal(
    discoveryText({
      actions: ["lightItem"],
      conditions: [],
      items: ["campfire"],
      trees: [],
      creatures: [],
    }),
    "Odkryto: Zapal — patyk, Ognisko.",
  );
});

test("a discovered creature is named from the creature data", () => {
  assert.equal(
    discoveryText({
      actions: [],
      conditions: [],
      items: [],
      trees: [],
      creatures: ["wolf"],
    }),
    "Odkryto: Wilk.",
  );
});

test("a condition that takes no number is named without a unit, and a discovery of conditions alone has no first sentence", () => {
  assert.equal(
    discoveryText({
      actions: [],
      conditions: ["awayFromCampfire"],
      items: [],
      trees: [],
      creatures: [],
    }),
    "W regułach można teraz sprawdzić: Z dala od — ognisko.",
  );
});

test("no pause button after a completion, as after death", () => {
  const running = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  assert.equal(pauseLabel(completed(running, 480)), null);
  assert.equal(
    pauseLabel(completed(setPaused(running, true).state, 480)),
    null,
  );
});

/** The requirements of a map as the simulation gives them for a map run of the given counts. */
function requirementsOf(mapId, counts) {
  const base = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  const run = { ...base.run, mapId, ...counts };
  return solvingRequirements(run, MAPS[mapId]);
}

// D-133. Catches words in the wrong form, a requirement left out and the two out of their order.
test("the words of Las read „Passa {streak}/{required}” and those of Las — głębiej read the passa before the beaten attacks", () => {
  assert.deepEqual(
    requirementsOf("forest", { streak: 120 }).map(requirementText),
    ["Passa 120/480"],
  );
  assert.deepEqual(
    requirementsOf("forestDeep", { streak: 120, defeatedAttacks: 1 }).map(
      requirementText,
    ),
    ["Passa 120/540", "Pokonane napaści 1/2"],
  );
});

// D-133: one met requirement does not make the other met. The words carry the numbers, not the role.
test("on Las — głębiej a requirement that is met reads its own numbers while the other stays unmet", () => {
  const requirements = requirementsOf("forestDeep", {
    streak: 120,
    defeatedAttacks: 2,
  });
  assert.deepEqual(requirements.map(requirementText), [
    "Passa 120/540",
    "Pokonane napaści 2/2",
  ]);
  assert.deepEqual(
    requirements.map((requirement) => requirement.met),
    [false, true],
  );
});

// D-135: the bar shows the streak as it stands, which a death of cold or hunger has set to zero.
test("the words after a death of cold show the streak at zero", () => {
  assert.deepEqual(
    requirementsOf("forest", { streak: 0 }).map(requirementText),
    ["Passa 0/480"],
  );
});

// D-39, D-40: the fill is as long as the share of the count in the number required, never more
// than whole. Catches a share that exceeds 1, one that is a percentage and one that is inverted.
test("the share of a requirement is the count over the number required, never above 1", () => {
  const share = (mapId, counts, index = 0) =>
    requirementShare(requirementsOf(mapId, counts)[index]);
  assert.equal(share("forest", { streak: 0 }), 0);
  assert.equal(share("forest", { streak: 120 }), 0.25);
  assert.equal(share("forest", { streak: 480 }), 1);
  assert.equal(share("forestDeep", { streak: 600 }), 1);
  assert.equal(share("forestDeep", { streak: 0, defeatedAttacks: 1 }, 1), 0.5);
});
