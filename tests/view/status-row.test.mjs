// The status row's text (spec section 5): „Minuta {minute} · {activity}”, „ (pauza)” while paused.
import assert from "node:assert/strict";
import { test } from "node:test";
import { ARCHETYPES } from "../../dist/public/sim/data/archetypes.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { RESOURCES } from "../../dist/public/sim/data/resources.js";
import {
  advanceMinutes,
  newGame,
  send,
  setPaused,
  setProgram,
} from "../../dist/public/sim/game.js";
import { statusText } from "../../dist/public/view/status-row.js";

const SENT = {
  mapId: Object.keys(MAPS)[0],
  archetypeId: Object.keys(ARCHETYPES)[0],
};
const ALWAYS = { kind: "always" };

/** A game with a map run started by `send` under the given program rules. */
function sent(rules) {
  const program = setProgram(newGame(), { rules }).state;
  return send(program, SENT, 1760000000000).state;
}

/** The same game with the map run's current activity replaced by a rule's action. */
function doing(state, action) {
  const current = {
    ...state.run.current,
    activity: { kind: "rule", ruleIndex: 0, action },
  };
  return { ...state, run: { ...state.run, current } };
}

test("exploring shows the minute and „Eksploruje”", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  assert.equal(statusText(state.run, state.paused), "Minuta 0 · Eksploruje");
});

test("the minute shown is the map run's game minute", () => {
  const state = advanceMinutes(
    sent([{ condition: ALWAYS, action: { kind: "explore" } }]),
    7,
  ).state;
  assert.equal(state.run.minute, 7);
  assert.equal(statusText(state.run, state.paused), "Minuta 7 · Eksploruje");
});

test("wandering shows „Wędruje”", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "wander" } }]);
  assert.equal(state.run.current.activity.action.kind, "wander");
  assert.equal(statusText(state.run, state.paused), "Minuta 0 · Wędruje");
});

test("walking to a resource shows „Idzie po: ” and the resource's name from data, for each resource", () => {
  const state = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
  const ids = Object.keys(RESOURCES);
  assert.ok(ids.length > 1);
  for (const id of ids) {
    const walking = doing(state, { kind: "walkTo", resource: id });
    assert.equal(
      statusText(walking.run, false),
      `Minuta 0 · Idzie po: ${RESOURCES[id].name}`,
    );
  }
  assert.equal(
    statusText(doing(state, { kind: "walkTo", resource: ids[0] }).run, false),
    "Minuta 0 · Idzie po: patyk",
  );
});

test("waiting because no rule applies shows „Czeka — żadna reguła nie pasuje”", () => {
  const state = sent([]);
  assert.equal(state.run.current.activity.kind, "wait");
  assert.equal(
    statusText(state.run, state.paused),
    "Minuta 0 · Czeka — żadna reguła nie pasuje",
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
    "Minuta 3 · Eksploruje (pauza)",
  );
  const waiting = setPaused(sent([]), true).state;
  assert.equal(
    statusText(waiting.run, waiting.paused),
    "Minuta 0 · Czeka — żadna reguła nie pasuje (pauza)",
  );
  const resumed = setPaused(paused, false).state;
  assert.equal(
    statusText(resumed.run, resumed.paused),
    "Minuta 3 · Eksploruje",
  );
});
