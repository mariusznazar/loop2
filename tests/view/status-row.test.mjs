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
  setPace,
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

/** A document making elements with just what the status row and its buttons use. */
function fakeDocument() {
  return {
    createElement(tag) {
      const element = {
        tag,
        children: [],
        textContent: "",
        hidden: false,
        className: "",
        classes: new Set(),
        classList: {
          add(name) {
            element.classes.add(name);
          },
          toggle(name, force) {
            if (force) element.classes.add(name);
            else element.classes.delete(name);
          },
        },
        attributes: {},
        setAttribute(name, value) {
          this.attributes[name] = value;
        },
        listeners: {},
        addEventListener(type, listener) {
          this.listeners[type] = listener;
        },
        append(...items) {
          this.children.push(...items);
        },
      };
      return element;
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
      setPace() {},
      restart() {},
      end() {},
    });
    const [text, pause, , , , , , restartButton, endButton] =
      row.element.children;
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
      creatures: [],
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
      creatures: [],
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
    const row = createStatusRow({
      togglePause() {},
      setPace() {},
      restart() {},
      end() {},
    });
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
      "Minuta 84 · Eksploruje · Passa 0/480 (pauza)",
    );
    assert.equal(row.element.children[1].textContent, "Wznów");
    row.update(setPaused(stopped, false).state);
    assert.equal(line.hidden, true);
    assert.equal(line.textContent, "");
  } finally {
    globalThis.document = saved;
  }
});

/** The status row built on the hand-made document, with the paces its pace buttons asked for. */
async function rowAskingPaces() {
  const { createStatusRow } =
    await import("../../dist/public/view/status-row.js");
  const asked = [];
  const row = createStatusRow({
    togglePause() {},
    setPace(pace) {
      asked.push(pace);
    },
    restart() {},
    end() {},
  });
  return { row, asked, paceButtons: row.element.children.slice(2, 7) };
}

test("the row shows five pace buttons, 1× to 16×, with the one of the state's pace selected", async () => {
  const saved = globalThis.document;
  globalThis.document = fakeDocument();
  try {
    const { row, paceButtons } = await rowAskingPaces();
    assert.deepEqual(
      paceButtons.map((button) => button.textContent),
      ["1×", "2×", "4×", "8×", "16×"],
    );
    const running = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
    const selected = () =>
      paceButtons.map((button) => button.attributes["aria-pressed"]);
    row.update(running);
    assert.deepEqual(selected(), ["true", "false", "false", "false", "false"]);
    row.update(setPace(running, 8).state);
    assert.deepEqual(selected(), ["false", "false", "false", "true", "false"]);
  } finally {
    globalThis.document = saved;
  }
});

test("a click on a pace button asks for that pace; the buttons stay while paused and go with death", async () => {
  const saved = globalThis.document;
  globalThis.document = fakeDocument();
  try {
    const { row, asked, paceButtons } = await rowAskingPaces();
    const running = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
    paceButtons[4].listeners.click();
    paceButtons[1].listeners.click();
    assert.deepEqual(asked, [16, 2]);
    row.update(setPaused(running, true).state);
    assert.ok(paceButtons.every((button) => !button.hidden));
    row.update(dead(running, 312, "cold"));
    assert.ok(paceButtons.every((button) => button.hidden));
  } finally {
    globalThis.document = saved;
  }
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

test("on the screen the text is positive after a completion and only then; the pace and pause buttons go, Restart and Zakończ stay", async () => {
  const saved = globalThis.document;
  globalThis.document = fakeDocument();
  try {
    const { row, paceButtons } = await rowAskingPaces();
    const [text, pause, , , , , , restartButton, endButton] =
      row.element.children;
    const running = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
    row.update(running);
    assert.equal(text.classes.has("positive"), false);
    row.update(completed(running, 480));
    assert.equal(text.textContent, "Minuta 480 · Las rozwiązany");
    assert.equal(text.classes.has("positive"), true);
    assert.equal(pause.hidden, true);
    assert.ok(paceButtons.every((button) => button.hidden));
    assert.equal(restartButton.hidden, false);
    assert.equal(endButton.hidden, false);
    row.update(running);
    assert.equal(text.classes.has("positive"), false);
    assert.equal(pause.hidden, false);
    row.update(dead(running, 312, "cold"));
    assert.equal(text.classes.has("positive"), false);
  } finally {
    globalThis.document = saved;
  }
});

test("a discovery held at a completion stands under the completion's row", async () => {
  const saved = globalThis.document;
  globalThis.document = fakeDocument();
  try {
    const { row } = await rowAskingPaces();
    const running = sent([{ condition: ALWAYS, action: { kind: "explore" } }]);
    const discovery = {
      actions: ["explore"],
      conditions: [],
      items: [],
      creatures: [],
    };
    row.update({ ...completed(running, 480), discovery });
    assert.equal(row.discovery.hidden, false);
    assert.equal(row.discovery.textContent, "Odkryto: Eksploruj.");
    assert.equal(
      row.element.children[0].textContent,
      "Minuta 480 · Las rozwiązany",
    );
  } finally {
    globalThis.document = saved;
  }
});
