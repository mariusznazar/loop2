// The band of a discovery in React (D-122, D-312, D-313, D-44, D-279)
// on jsdom through tests/view/page-document.mjs (D-264): the text of the discovery, the sentence about
// the rule the game wrote and the group it names, „Wznów” and „Dodaj regułę z tym”, the band gone
// without a discovery and the band gone at the end of a map run, where the window of the end names
// the discovery (D-122). Real events and
// the look are checked in the browser (D-88). Every comparison is of plain data or of a handful of
// words (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setPaused,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { DiscoveryBand } from "../../dist/browser/view/discovery-band.js";

const SENT = { mapId: "forest", characterId: 1 };
// A real time whose seed lays berries and moss, but no sticks, on the entrance tile.
const REAL_MS = 1760000000003;
const SENTENCE = "Gra dopisała regułę w grupie „Program”: Zawsze → Eksploruj.";
const CHILL_TEXT =
  "Odkryto: Eksploruj, Wędruj, drzewo umiejętności Eksploracja. W regułach można teraz sprawdzić: Temperatura poniżej … °C.";

// What the first finished exploration of a tile with sticks and berries reveals.
const EXPLORED = {
  actions: ["walkTo", "gather"],
  conditions: ["hereBelow", "itemBelow"],
  items: ["stick", "berry"],
  trees: [],
  creatures: [],
};

const group = (id, name, rules = []) => ({
  id,
  name,
  condition: { kind: "always" },
  rules,
});

/** A program of the given groups, the next identities past every identity they hold. */
function programOfGroups(...groups) {
  return {
    groups,
    tripPlan: { take: [], bring: [] },
    nextGroupId: Math.max(0, ...groups.map((one) => one.id)) + 1,
    nextRuleId:
      Math.max(
        0,
        ...groups.flatMap((one) => one.rules.map((rule) => rule.id)),
      ) + 1,
  };
}

/** A new game with one character sent, its program the given one or the empty group of a new game. */
function sentNew(program) {
  let state = newGame();
  if (program) state = setProgram(state, program).state;
  state = createCharacter(state, "Ala").state;
  return send(state, SENT, REAL_MS).state;
}

/** The game stopped at the first chill, game minute 84, where the game wrote its rule. */
function chilled(program) {
  const state = advanceMinutes(sentNew(program), 100).state;
  assert.equal(
    state.run.minute,
    84,
    "precondition: stopped at the first chill",
  );
  assert.equal(state.paused, true, "precondition: paused at the discovery");
  return state;
}

/** The game with the copy's program edited while the band stands; `change` gets a clone. */
function editedCopy(state, change) {
  const program = structuredClone(state.run.copy.program);
  change(program);
  return setProgram(state, program).state;
}

/** The same game with its map run ended in a completion at the given minute. */
const completed = (state, minute) => ({
  ...state,
  paused: false,
  run: { ...state.run, minute, completion: { minute } },
});

/** The same game with its map run ended in death at the given minute. */
const dead = (state, minute, cause) => ({
  ...state,
  paused: false,
  run: { ...state.run, minute, death: { minute, cause } },
});

/**
 * Draws the band in a root of its own; `show(state)` draws it anew from another state, as the screen
 * does at each tick, and `asked` collects what the buttons asked for.
 */
async function draw(document, state) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const asked = [];
  const props = {
    onAddRule: () => asked.push("addRule"),
    onResume: () => asked.push("resume"),
  };
  const show = (next) =>
    inAct(() =>
      root.render(createElement(DiscoveryBand, { state: next, ...props })),
    );
  await show(state);
  return { container, asked, show };
}

const bandOf = (container) => container.querySelector(".discovery-band");
const textOf = (container) => {
  const text = container.querySelector(".discovery-band-text");
  assert.ok(text, "the text of the band stands");
  return text.textContent;
};
const buttonNamed = (container, name) => {
  const found = [...container.querySelectorAll("button")].find(
    (button) => button.textContent === name,
  );
  assert.ok(found, `the button ${name} stands`);
  return found;
};
const labels = (container) =>
  [...container.querySelectorAll("button")].map((b) => b.textContent);
const click = (element) =>
  inAct(() => {
    element.click();
  });

test("the first finished exploration of a tile with sticks and berries gives the band its text and no sentence about a rule", async () => {
  await withPage(async ({ document }) => {
    const state = { ...chilled(), discovery: EXPLORED };
    const { container } = await draw(document, state);
    assert.equal(
      textOf(container),
      "Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach można teraz sprawdzić: Tu leży mniej niż … szt., Zapas poniżej … szt.",
    );
    assert.deepEqual(labels(container), ["Dodaj regułę z tym", "Wznów"]);
  });
});

test("the first chill of a new game gives the text of the discovery and the sentence naming the group Program, with no number of the rule", async () => {
  await withPage(async ({ document }) => {
    const { container } = await draw(document, chilled());
    assert.equal(textOf(container), `${CHILL_TEXT} ${SENTENCE}`);
    assert.doesNotMatch(textOf(container), /\d\.\d/);
  });
});

test("a renamed first group gives its name, and a group dragged above the one holding the rule leaves the sentence on the group that holds it", async () => {
  await withPage(async ({ document }) => {
    const first = chilled(programOfGroups(group(1, "Ogień"), group(2, "Głód")));
    const sentence = (name) =>
      `Gra dopisała regułę w grupie „${name}”: Zawsze → Eksploruj.`;
    const { container, show } = await draw(document, first);
    assert.equal(textOf(container), `${CHILL_TEXT} ${sentence("Ogień")}`);

    const renamed = editedCopy(first, (program) => {
      program.groups[0].name = "Ciepło";
    });
    await show(renamed);
    assert.equal(textOf(container), `${CHILL_TEXT} ${sentence("Ciepło")}`);

    const dragged = editedCopy(first, (program) => program.groups.reverse());
    assert.deepEqual(
      dragged.run.copy.program.groups.map((one) => one.name),
      ["Głód", "Ogień"],
      "precondition: Głód stands first",
    );
    await show(dragged);
    assert.equal(textOf(container), `${CHILL_TEXT} ${sentence("Ogień")}`);
  });
});

test("the rule deleted while the band stands leaves the text of the discovery with no sentence about the rule", async () => {
  await withPage(async ({ document }) => {
    const first = chilled();
    const { container, show } = await draw(document, first);
    const deleted = editedCopy(first, (program) => {
      program.groups[0].rules = [];
    });
    await show(deleted);
    assert.equal(textOf(container), CHILL_TEXT);
  });
});

test("there is no band without a discovery, and none once the player goes on", async () => {
  await withPage(async ({ document }) => {
    const stopped = chilled();
    const { container, show } = await draw(document, {
      ...stopped,
      discovery: null,
    });
    assert.equal(bandOf(container), null);
    assert.equal(container.textContent, "");

    await show(stopped);
    assert.ok(bandOf(container), "the band stands at the discovery");
    assert.equal(textOf(container), `${CHILL_TEXT} ${SENTENCE}`);

    const going = setPaused(stopped, false).state;
    assert.equal(going.discovery, null, "precondition: going on drops it");
    await show(going);
    assert.equal(bandOf(container), null);
    assert.equal(container.textContent, "");
  });
});

// Catches a band drawn once the map run has ended in a completion or a death: the window of the end
// names the discovery of its game minute instead (D-122, „Dodaj regułę z tym” in the window, D-313).
test("a discovery of an ended map run, in a completion or a death, draws no band, and a run that goes on keeps the band with „Wznów”", async () => {
  await withPage(async ({ document }) => {
    const discovery = {
      actions: ["explore"],
      conditions: [],
      items: [],
      trees: [],
      creatures: [],
    };
    const running = sentNew();
    const { container, show } = await draw(document, {
      ...completed(running, 480),
      discovery,
    });
    assert.equal(bandOf(container), null);
    assert.equal(container.textContent, "");

    await show({ ...dead(running, 312, "cold"), discovery });
    assert.equal(bandOf(container), null);
    assert.equal(container.textContent, "");

    await show({ ...running, paused: true, discovery });
    assert.equal(textOf(container), "Odkryto: Eksploruj.");
    assert.deepEqual(labels(container), ["Dodaj regułę z tym", "Wznów"]);
  });
});

test("each button calls its own callback and nothing else", async () => {
  await withPage(async ({ document }) => {
    const { container, asked } = await draw(document, chilled());
    await click(buttonNamed(container, "Wznów"));
    assert.deepEqual(asked, ["resume"]);
    await click(buttonNamed(container, "Dodaj regułę z tym"));
    assert.deepEqual(asked, ["resume", "addRule"]);
    await click(buttonNamed(container, "Wznów"));
    assert.deepEqual(asked, ["resume", "addRule", "resume"]);
  });
});

test("both buttons are the shared plain button (D-44)", async () => {
  await withPage(async ({ document }) => {
    const { container } = await draw(document, chilled());
    for (const name of ["Dodaj regułę z tym", "Wznów"]) {
      assert.equal(buttonNamed(container, name).className, "button", name);
    }
  });
});

test("„Dodaj regułę z tym” is disabled where the copy holds no rule group, and „Wznów” stays usable", async () => {
  await withPage(async ({ document }) => {
    const first = chilled();
    const { container, asked, show } = await draw(document, first);
    assert.equal(buttonNamed(container, "Dodaj regułę z tym").disabled, false);

    const bare = editedCopy(first, (program) => {
      program.groups = [];
    });
    assert.deepEqual(
      bare.run.copy.program.groups,
      [],
      "precondition: the copy holds no rule group",
    );
    await show(bare);
    const add = buttonNamed(container, "Dodaj regułę z tym");
    assert.equal(add.disabled, true);
    assert.equal(buttonNamed(container, "Wznów").disabled, false);
    await click(add);
    assert.deepEqual(asked, []);
  });
});
