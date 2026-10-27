// The status row's text (spec section 5): „Minuta {minute} · {activity}”, „ (pauza)” while paused;
// at death the minute and the cause, with no pause button (task ognisko-i-jedzenie, To do 3).
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { RESOURCES } from "../../dist/public/sim/data/resources.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setPaused,
  setProgram,
} from "../../dist/public/sim/game.js";
import {
  discoveryText,
  pauseLabel,
  statusText,
} from "../../dist/public/view/status-row.js";
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
      `Minuta 0 · Zbiera: ${RESOURCES[id].name}`,
    );
  }
  assert.equal(
    statusText(doing(state, { kind: "gather", resource: "berry" }).run, false),
    "Minuta 0 · Zbiera: jagoda",
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
      `Minuta 0 · ${text}`,
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

/** A document making elements with just what the status row and its buttons use. */
function fakeDocument() {
  return {
    createElement(tag) {
      return {
        tag,
        children: [],
        textContent: "",
        hidden: false,
        className: "",
        classList: { add() {}, toggle() {} },
        setAttribute() {},
        addEventListener() {},
        append(...items) {
          this.children.push(...items);
        },
      };
    },
  };
}

test("on the screen the pause button is hidden after death; „Restart” and „Zakończ” stay", async () => {
  const { createStatusRow } =
    await import("../../dist/public/view/status-row.js");
  const saved = globalThis.document;
  globalThis.document = fakeDocument();
  try {
    const row = createStatusRow({
      togglePause() {},
      restart() {},
      end() {},
    });
    const [text, pause, restartButton, endButton] = row.element.children;
    const running = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
    row.update(running);
    assert.equal(pause.hidden, false);
    assert.equal(pause.textContent, "Pauza");
    row.update(dead(running, 312, "cold"));
    assert.equal(text.textContent, "Minuta 312 · Mag zamarzł");
    assert.equal(pause.hidden, true);
    assert.equal(restartButton.hidden, false);
    assert.equal(endButton.hidden, false);
    assert.equal(restartButton.textContent, "Restart");
    assert.equal(endButton.textContent, "Zakończ");
  } finally {
    globalThis.document = saved;
  }
});

// Slice 12 (task odkrywanie, To do 5, odkrywanie_loop2.md line 144): the line under the status row
// says what was revealed, and goes when the player moves on.
const EXPLORED_REVEALED = {
  actions: ["walkTo", "gather"],
  conditions: ["hereBelow", "itemBelow"],
  items: ["stick", "berry"],
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
    }),
    "Odkryto: Eksploruj, Wędruj. W regułach można teraz sprawdzić: Temperatura poniżej … °C.",
  );
});

test("a discovery of an action alone has no second sentence, and the campfire is named with a capital letter", () => {
  assert.equal(
    discoveryText({
      actions: ["lightItem"],
      conditions: [],
      items: ["campfire"],
    }),
    "Odkryto: Zapal — patyk, Ognisko.",
  );
});

test("a condition that takes no number is named without a unit, and a discovery of conditions alone has no first sentence", () => {
  assert.equal(
    discoveryText({
      actions: [],
      conditions: ["awayFromCampfire"],
      items: [],
    }),
    "W regułach można teraz sprawdzić: Z dala od — ognisko.",
  );
});

test("on the screen the line is shown while the game holds a discovery and hidden after the player moves on", async () => {
  const { createStatusRow } =
    await import("../../dist/public/view/status-row.js");
  const saved = globalThis.document;
  globalThis.document = fakeDocument();
  try {
    const row = createStatusRow({ togglePause() {}, restart() {}, end() {} });
    const line = row.discovery;
    assert.equal(line.hidden, true);
    let state = createCharacter(newGame(), "Ala").state;
    state = send(state, SENT, 1760000000003).state;
    const stopped = advanceMinutes(state, 100).state;
    assert.equal(stopped.run.minute, 84);
    row.update(stopped);
    assert.equal(line.hidden, false);
    assert.equal(
      line.textContent,
      "Odkryto: Eksploruj, Wędruj. W regułach można teraz sprawdzić: Temperatura poniżej … °C.",
    );
    assert.equal(
      row.element.children[0].textContent,
      "Minuta 84 · Eksploruje (pauza)",
    );
    assert.equal(row.element.children[1].textContent, "Wznów");
    row.update(setPaused(stopped, false).state);
    assert.equal(line.hidden, true);
    assert.equal(line.textContent, "");
  } finally {
    globalThis.document = saved;
  }
});
