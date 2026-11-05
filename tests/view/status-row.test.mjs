// The status row's text (spec section 5): „Minuta {minute} · {activity}”, „ (pauza)” while paused;
// at death the minute and the cause, with no pause button (task ognisko-i-jedzenie, To do 3).
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { RESOURCES } from "../../dist/browser/sim/data/resources.js";
import {
  advanceMinutes,
  createCharacter,
  send,
  setPaused,
  setProgram,
} from "../../dist/browser/sim/game.js";
import {
  discoveryText,
  pauseLabel,
  statusText,
} from "../../dist/browser/view/status-row.js";
import { programFromRules, ruleActivity } from "../sim/program-fixture.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const SENT = {
  mapId: Object.keys(MAPS)[0],
  // The first character a new game creates takes the id 1.
  characterId: 1,
};
const ALWAYS = { kind: "always" };

/** A game with a map run started by `send` under the given program rules. */
function sent(rules) {
  const program = setProgram(
    newKnowingGame(),
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

/** The same game with its map run's streak set. */
function withStreak(state, streak) {
  return { ...state, run: { ...state.run, streak } };
}

test("a running map run on the forest with a streak of 120 reads the minute, the activity and the streak against 480", () => {
  const state = withStreak(
    advanceMinutes(
      sent([{ condition: ALWAYS, action: { kind: "explore" } }]),
      3,
    ).state,
    120,
  );
  const run = { ...state.run, minute: 312 };
  assert.equal(
    statusText(run, false),
    "Minuta 312 · Eksploruje · Passa 120/480",
  );
  assert.equal(
    statusText(run, true),
    "Minuta 312 · Eksploruje · Passa 120/480 (pauza)",
  );
});

test("progress text shows only the solving requirements present in the map data", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  const deep = {
    ...state,
    run: {
      ...state.run,
      mapId: "forestDeep",
      streak: 120,
      defeatedAttacks: 1,
    },
  };
  assert.equal(
    statusText(deep.run, false),
    "Minuta 0 · Eksploruje · Passa 120/540 · Pokonane napaści 1/2",
  );
});

test("the encounter takes the activity label through its resolution minute, before the next ordinary action", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  const lastCombat = {
    creatureId: "wolf",
    attackMinute: 10,
    resolveMinute: 15,
    result: null,
  };
  const active = {
    ...state.run,
    mapId: "forestDeep",
    minute: 12,
    activeCombat: lastCombat,
    current: null,
  };
  assert.equal(
    statusText(active, false),
    "Minuta 12 · Walczy z wilkiem · Passa 0/540 · Pokonane napaści 0/2",
  );
  const resolved = {
    ...active,
    minute: 15,
    activeCombat: null,
    current: {
      activity: ruleActivity({ kind: "explore" }),
      startMinute: 15,
      endMinute: 35,
      stepTo: null,
    },
    lastCombat: { ...lastCombat, result: { outcome: "creatureDefeated" } },
  };
  assert.equal(
    statusText(resolved, false),
    "Minuta 15 · Walczy z wilkiem · Passa 0/540 · Pokonane napaści 0/2",
  );
  assert.equal(
    statusText({ ...resolved, death: { minute: 15, cause: "combat" } }, false),
    "Minuta 15 · Mag zginął w walce",
  );
});

test("exploring shows the minute and „Eksploruje”", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  assert.equal(
    statusText(state.run, state.paused),
    "Minuta 0 · Eksploruje · Passa 0/480",
  );
});

test("the minute shown is the map run's game minute", () => {
  const state = advanceMinutes(
    sent([{ condition: ALWAYS, action: { kind: "explore" } }]),
    7,
  ).state;
  assert.equal(state.run.minute, 7);
  assert.equal(
    statusText(state.run, state.paused),
    "Minuta 7 · Eksploruje · Passa 7/480",
  );
});

test("wandering shows „Wędruje”", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "wander" } }]);
  assert.equal(state.run.current.activity.action.kind, "wander");
  assert.equal(
    statusText(state.run, state.paused),
    "Minuta 0 · Wędruje · Passa 0/480",
  );
});

test("walking to a resource shows „Idzie po: ” and the resource's name from data, for each resource", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  const ids = Object.keys(RESOURCES);
  assert.ok(ids.length > 1);
  for (const id of ids) {
    const walking = doing(state, { kind: "walkTo", resource: id });
    assert.equal(
      statusText(walking.run, false),
      `Minuta 0 · Idzie po: ${RESOURCES[id].name} · Passa 0/480`,
    );
  }
  assert.equal(
    statusText(doing(state, { kind: "walkTo", resource: ids[0] }).run, false),
    "Minuta 0 · Idzie po: patyk · Passa 0/480",
  );
});

test("waiting because no rule applies shows „Czeka — żadna reguła nie pasuje”", () => {
  const state = sent([]);
  assert.equal(state.run.current.activity.kind, "wait");
  assert.equal(
    statusText(state.run, state.paused),
    "Minuta 0 · Czeka — żadna reguła nie pasuje · Passa 0/480",
  );
});

test("a paused map run gets „ (pauza)” appended, and loses it when resumed", () => {
  const running = advanceMinutes(
    sent([{ condition: ALWAYS, action: { kind: "explore" } }]),
    3,
  ).state;
  const paused = setPaused(running, true).state;
  assert.equal(
    statusText(paused.run, paused.paused),
    "Minuta 3 · Eksploruje · Passa 3/480 (pauza)",
  );
  const waiting = setPaused(sent([]), true).state;
  assert.equal(
    statusText(waiting.run, waiting.paused),
    "Minuta 0 · Czeka — żadna reguła nie pasuje · Passa 0/480 (pauza)",
  );
  const resumed = setPaused(paused, false).state;
  assert.equal(
    statusText(resumed.run, resumed.paused),
    "Minuta 3 · Eksploruje · Passa 3/480",
  );
});

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

test("gathering shows „Zbiera: ” and the resource's name from data, for each resource", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  for (const id of Object.keys(RESOURCES)) {
    const gathering = doing(state, { kind: "gather", resource: id });
    assert.equal(
      statusText(gathering.run, false),
      `Minuta 0 · Zbiera: ${RESOURCES[id].name} · Passa 0/480`,
    );
  }
  assert.equal(
    statusText(doing(state, { kind: "gather", resource: "berry" }).run, false),
    "Minuta 0 · Zbiera: jagoda · Passa 0/480",
  );
});

test("an action without a target shows its status text from data alone", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  const expected = {
    walkToCampfire: "Idzie do ogniska",
    craftCampfire: "Wytwarza ognisko",
    lightCampfire: "Zapala ognisko",
    lightItem: "Zapala patyk",
    feedCampfire: "Zasila ognisko",
    eat: "Je jagodę",
  };
  for (const [kind, text] of Object.entries(expected)) {
    assert.equal(
      statusText(doing(state, { kind }).run, false),
      `Minuta 0 · ${text} · Passa 0/480`,
    );
  }
});

test("a death of cold reads „Minuta <n> · Mag zamarzł”, of hunger „Mag umarł z głodu”", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  assert.equal(
    statusText(dead(state, 312, "cold").run, false),
    "Minuta 312 · Mag zamarzł",
  );
  assert.equal(
    statusText(dead(state, 287, "hunger").run, false),
    "Minuta 287 · Mag umarł z głodu",
  );
});

test("after death no „ (pauza)” is appended, even to a paused game", () => {
  const state = setPaused(
    sent([{ condition: ALWAYS, action: { kind: "explore" } }]),
    true,
  ).state;
  assert.equal(
    statusText(dead(state, 312, "cold").run, true),
    "Minuta 312 · Mag zamarzł",
  );
});

test("„Pauza” while running, „Wznów” while paused, and no pause button after death", () => {
  const running = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  assert.equal(pauseLabel(running), "Pauza");
  const paused = setPaused(running, true).state;
  assert.equal(pauseLabel(paused), "Wznów");
  assert.equal(pauseLabel(dead(running, 312, "cold")), null);
  assert.equal(pauseLabel(dead(paused, 312, "hunger")), null);
});

test("a mage left without a program dies, and the status row reads the minute of its death", () => {
  const ended = advanceMinutes(sent([]), 1000).state;
  assert.ok(ended.run.death, "the mage died within 1000 minutes");
  assert.ok(ended.run.death.minute < 1000);
  assert.equal(ended.run.death.cause, "cold");
  assert.equal(
    statusText(ended.run, ended.paused),
    `Minuta ${ended.run.minute} · Mag zamarzł`,
  );
  assert.equal(pauseLabel(ended), null);
});

// Slice 12 (task odkrywanie, To do 5, odkrywanie_loop2.md line 144): the line under the status row
// says what was revealed, and goes when the player moves on.
const EXPLORED_REVEALED = {
  actions: ["walkTo", "gather"],
  conditions: ["hereBelow", "itemBelow"],
  items: ["stick", "berry"],
  trees: [],
  creatures: [],
};

test("the text for the first finished exploration of a tile with sticks and berries is the task's example", () => {
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

test("after a completion the status reads the minute and the map's completion text, and no pause is appended", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  const done = completed(state, 480);
  assert.equal(statusText(done.run, false), "Minuta 480 · Las rozwiązany");
  assert.equal(statusText(done.run, true), "Minuta 480 · Las rozwiązany");
});

test("no pause button after a completion, as after death", () => {
  const running = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  assert.equal(pauseLabel(completed(running, 480)), null);
  assert.equal(
    pauseLabel(completed(setPaused(running, true).state, 480)),
    null,
  );
});
