// The scene drawn still (task scena-z-ludzikiem, To do 1, 2, 4, 6, 8, 9 and 11; D-316, D-320, D-321,
// D-322, D-272, D-43) on jsdom through tests/view/page-document.mjs (D-264): the parts it draws in each
// way it stands, the badge over the mage, the fire absent, burning and extinguished, the greys, and
// that it is a picture nothing in which the keyboard reaches or a click moves. Motion is the next
// slice's. The look and the real events are checked in the browser (D-88). Every comparison is of plain
// data or of a handful of words (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { createRunScreen } from "../../dist/browser/view/run-screen.js";
import { Scene } from "../../dist/browser/view/scene.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const STYLES = readFileSync(
  new URL("../../src/browser/styles.css", import.meta.url),
  "utf8",
);
const SENT = { mapId: Object.keys(MAPS)[0], characterId: 1 };
const ALWAYS = { kind: "always" };
const GATHER_STICK = { kind: "gather", resource: "stick" };
const NO_UNDERSTANDING_ITEMS = {
  trees: [],
  actions: [],
  conditions: [],
  items: [],
  creatures: [],
};
const WAITING = {
  activity: { kind: "wait" },
  startMinute: 0,
  endMinute: 10,
  stepTo: null,
};

/** A new game with one character sent into its map, its program explores at once. */
function sent() {
  const program = setProgram(
    newKnowingGame(),
    programFromRules({ condition: ALWAYS, action: { kind: "explore" } }),
  ).state;
  return send(createCharacter(program, "Ala").state, SENT, 1760000000000).state;
}

const withRun = (state, patch) => ({
  ...state,
  run: { ...state.run, ...patch },
});

/** An action picked as the current activity from minute 0 to minute 10 of the map run. */
const current = (action) => ({
  activity: { kind: "rule", ruleId: 1, action },
  startMinute: 0,
  endMinute: 10,
  stepTo: null,
});

/** The sent state doing the action, at the start of the action. */
const doing = (action, patch = {}) =>
  withRun(sent(), { current: current(action), ...patch });

/** The sent state with a campfire on the character's tile that has this many minutes left. */
const withFire = (minutesLeft, state = sent()) =>
  withRun(state, { campfires: [{ at: state.run.character.at, minutesLeft }] });

/** Draws the scene of a state at the size of the scale 2 and returns its element. */
async function drawn({ document }, state) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  await inAct(() =>
    root.render(createElement(Scene, { state, width: 672, height: 304 })),
  );
  const scene = container.firstElementChild;
  assert.ok(scene, "the scene stands in the page");
  return scene;
}

const one = (scene, selector) => {
  const found = scene.querySelectorAll(selector);
  assert.equal(found.length, 1, `exactly one ${selector}`);
  return found[0];
};
const near = (text, expected, message) => {
  assert.match(text, /^-?[\d.]+%$/, message);
  assert.ok(
    Math.abs(Number.parseFloat(text) - expected) < 0.001,
    `${message}: expected ${expected}%, got ${text}`,
  );
};

/** Whether a place (left, top, width, height as percentages of the frame) is the one given. */
function placedAt(element, [left, top, width, height], name) {
  near(element.style.left, left, `${name} left`);
  near(element.style.top, top, `${name} top`);
  near(element.style.width, width, `${name} width`);
  near(element.style.height, height, `${name} height`);
}

/** The picture of a sheet, or of the element that holds one: its file, its alt and its frames. */
const sheetOf = (element) => {
  const sheet = element.classList.contains("scene-sheet")
    ? element
    : one(element, ".scene-sheet");
  const image = one(sheet, "img");
  return {
    src: image.getAttribute("src"),
    alt: image.getAttribute("alt"),
    frames: sheet.style.getPropertyValue("--frames"),
  };
};

// Catches a scene that leaves out a part of To do 1, 2 or 4, or draws a part from another file.
test("a scene going on draws the background, the three props and the mage on its first idle frame, and no fire", async () => {
  await withPage(async (page) => {
    const scene = await drawn(page, doing(GATHER_STICK));
    assert.equal(scene.className, "scene");
    assert.equal(scene.getAttribute("data-standing"), "going");

    const background = one(scene, ".scene-background");
    assert.equal(background.getAttribute("src"), "/sprites/forest-scene.png");
    assert.equal(background.getAttribute("alt"), "");
    assert.equal(background.getAttribute("width"), "672");
    assert.equal(background.getAttribute("height"), "304");

    const props = [...scene.querySelectorAll(".scene-prop")];
    assert.deepEqual(
      props.map((prop) => prop.getAttribute("data-resource")),
      ["stick", "berry", "moss"],
    );
    assert.deepEqual(props.map(sheetOf), [
      { src: "/sprites/sticks.png", alt: "", frames: "1" },
      { src: "/sprites/berry-bush.png", alt: "", frames: "1" },
      { src: "/sprites/moss.png", alt: "", frames: "1" },
    ]);

    const mage = one(scene, ".scene-mage");
    assert.deepEqual(sheetOf(one(mage, ".scene-mage-sprite")), {
      src: "/sprites/mage-idle.png",
      alt: "",
      frames: "4",
    });
    assert.equal(scene.querySelector(".scene-fire"), null, "no fire");
  });
});

// Catches a prop or the mage drawn at a place other than the data's, in percentages of the frame
// (336 × 152 pixels), so that the picture is right at either scale.
test("the props and the mage stand at the places of the data, as percentages of the frame", async () => {
  await withPage(async (page) => {
    const scene = await drawn(page, doing(GATHER_STICK));
    const prop = (resource) =>
      one(scene, `.scene-prop[data-resource="${resource}"]`);
    placedAt(prop("stick"), [23.8095, 78.2895, 6.5476, 8.5526], "sticks");
    placedAt(prop("berry"), [75, 62.5, 8.631, 17.7632], "berry bush");
    placedAt(prop("moss"), [11.9048, 78.2895, 3.5714, 5.9211], "moss");
    // At the sticks the mage stands at 58, its feet on the line 136.
    placedAt(
      one(scene, ".scene-mage"),
      [17.2619, 47.3684, 19.0476, 42.1053],
      "mage",
    );
  });
});

// Catches a mage that stands at the same place whatever it does, or one that has no place where it
// stays (the previous reading of the scene is the next slice's; until then it stands in the clearing).
test("the mage stands where the activity leads it: the sticks, the fire, the right edge, the clearing", async () => {
  await withPage(async (page) => {
    const leftOf = async (state) =>
      (await drawn(page, state)).querySelector(".scene-mage").style.left;
    near(await leftOf(doing(GATHER_STICK)), 17.2619, "sticks 58");
    near(
      await leftOf(doing({ kind: "gather", resource: "berry" })),
      71.4286,
      "berry 240",
    );
    near(await leftOf(doing({ kind: "craftCampfire" })), 28.5714, "fire 96");
    near(await leftOf(doing({ kind: "explore" })), 86.6071, "right edge 291");
    near(
      await leftOf(withRun(sent(), { current: WAITING })),
      47.619,
      "clearing 160",
    );
    near(
      await leftOf(withRun(sent(), { current: null })),
      47.619,
      "combat: no place yet",
    );
  });
});

// Catches a badge that is missing, has another icon or a bar of another length than the progress,
// or whose icon is not the mask of the stylesheet's action icon.
test("the badge over the mage holds the icon of the action as a mask and a fill as long as the progress", async () => {
  await withPage(async (page) => {
    const state = {
      ...withRun(sent(), { current: current(GATHER_STICK), minute: 4 }),
      realMsCarry: 500,
    };
    const scene = await drawn(page, state);
    const badge = one(scene, ".scene-mage .scene-badge");
    const icon = one(badge, ".action-icon");
    assert.equal(
      icon.style.getPropertyValue("--icon"),
      'url("/icons/grab.svg")',
    );
    const fill = one(badge, ".scene-badge-bar .scene-badge-fill");
    // Midway: 4 minutes and 0.5 of one, of 10.
    near(
      `${Number(fill.style.getPropertyValue("--progress")) * 100}%`,
      45,
      "fill",
    );

    const other = await drawn(page, doing({ kind: "explore" }));
    assert.equal(
      one(other, ".scene-badge .action-icon").style.getPropertyValue("--icon"),
      'url("/icons/binoculars.svg")',
    );
    assert.equal(
      one(other, ".scene-badge-fill").style.getPropertyValue("--progress"),
      "0",
    );
  });
});

// Catches a sign over the head while waiting, in combat or after an end of the map run.
test("no badge while waiting, in combat, after a death and after a completion", async () => {
  await withPage(async (page) => {
    const none = async (state, name) =>
      assert.equal(
        (await drawn(page, state)).querySelector(".scene-badge"),
        null,
        name,
      );
    await none(withRun(sent(), { current: WAITING }), "waiting");
    await none(withRun(sent(), { current: null }), "combat");
    await none(
      doing(GATHER_STICK, { death: { minute: 4, cause: "cold" } }),
      "death",
    );
    await none(
      doing(GATHER_STICK, { completion: { minute: 4 } }),
      "completion",
    );
  });
});

// Catches a fire that stands off the character's tile, one that is not the same picture when out, or
// one that is not marked out.
test("the fire is absent without a campfire on the tile, burning with minutes left and the same picture extinguished", async () => {
  await withPage(async (page) => {
    const elsewhere = withRun(sent(), {
      campfires: [{ at: { q: 99, r: 99 }, minutesLeft: 5 }],
    });
    assert.equal(
      (await drawn(page, elsewhere)).querySelector(".scene-fire"),
      null,
    );

    const burning = one(await drawn(page, withFire(42)), ".scene-fire");
    const out = one(await drawn(page, withFire(0)), ".scene-fire");
    assert.equal(burning.getAttribute("data-burning"), "true");
    assert.equal(out.getAttribute("data-burning"), "false");
    assert.deepEqual(sheetOf(burning), {
      src: "/sprites/fire.png",
      alt: "",
      frames: "4",
    });
    assert.deepEqual(sheetOf(out), sheetOf(burning), "the same picture");
    for (const fire of [burning, out]) {
      placedAt(fire, [36.9048, 65.7895, 9.5238, 21.0526], "fire");
    }
  });
});

/** The five ways the scene stands, as a state each. */
const STANDINGS = {
  going: () => ({ ...doing(GATHER_STICK), paused: false, discovery: null }),
  paused: () => ({ ...doing(GATHER_STICK), paused: true, discovery: null }),
  discovery: () => ({
    ...doing(GATHER_STICK),
    paused: true,
    discovery: NO_UNDERSTANDING_ITEMS,
  }),
  dead: () =>
    withRun(
      { ...sent(), paused: false },
      { death: { minute: 4, cause: "cold" } },
    ),
  completed: () =>
    withRun({ ...sent(), paused: false }, { completion: { minute: 4 } }),
};

// Catches a standing the scene does not mark, which the stylesheet's greys and Slice 5's stops read.
test("the scene marks how it stands: going, paused, at a discovery, dead, completed", async () => {
  await withPage(async (page) => {
    for (const [standing, make] of Object.entries(STANDINGS)) {
      const scene = await drawn(page, make());
      assert.equal(scene.getAttribute("data-standing"), standing);
    }
  });
});

/** The greys of D-322 as the stylesheet gives them, read from the real file laid on a scene. */
function filterOf(element) {
  const { document, getComputedStyle } = element.ownerDocument.defaultView;
  if (!document.querySelector("style[data-test-styles]")) {
    const style = document.createElement("style");
    style.setAttribute("data-test-styles", "");
    style.textContent = STYLES;
    document.head.append(style);
  }
  const filter = getComputedStyle(element).getPropertyValue("filter");
  return filter === "none" ? "" : filter;
}

// Catches a pause that leaves the scene in colour, a discovery that greys it, a death that greys the
// whole scene instead of the mage, a completion that greys the mage, and an extinguished fire left
// in colour. The two values are the old Loop's (D-322, D-316).
test("the greys: the whole scene at the player's pause, the mage after a death, the extinguished fire; every other stop in colour", async () => {
  await withPage(async (page) => {
    const PAUSE = "grayscale(1) brightness(0.5)";
    const OUT = "grayscale(1) brightness(0.55)";
    const mage = (scene) => one(scene, ".scene-mage-sprite");
    const going = await drawn(page, STANDINGS.going());
    assert.equal(filterOf(going), "");
    assert.equal(filterOf(mage(going)), "");

    const paused = await drawn(page, STANDINGS.paused());
    assert.equal(filterOf(paused), PAUSE);

    const discovery = await drawn(page, STANDINGS.discovery());
    assert.equal(filterOf(discovery), "", "a discovery keeps its colours");
    assert.equal(filterOf(mage(discovery)), "");

    const dead = await drawn(page, STANDINGS.dead());
    assert.equal(filterOf(dead), "", "a death does not grey the whole scene");
    assert.equal(filterOf(mage(dead)), OUT);

    const completed = await drawn(page, STANDINGS.completed());
    assert.equal(filterOf(completed), "");
    assert.equal(filterOf(mage(completed)), "", "the mage stands in colour");

    assert.equal(
      filterOf(one(await drawn(page, withFire(42)), ".scene-fire")),
      "",
    );
    assert.equal(
      filterOf(one(await drawn(page, withFire(0)), ".scene-fire")),
      OUT,
    );
  });
});

// Catches a scene read by assistive technology, with text on it or a stop for the keyboard.
test("the scene is a picture: hidden from assistive technology, no text, nothing the keyboard reaches", async () => {
  await withPage(async (page) => {
    const states = [
      doing(GATHER_STICK),
      withFire(42, doing(GATHER_STICK)),
      withRun(sent(), { current: WAITING }),
    ];
    for (const state of states) {
      const scene = await drawn(page, state);
      assert.equal(scene.getAttribute("aria-hidden"), "true");
      assert.equal(scene.textContent, "", "no text on it");
      for (const element of [scene, ...scene.querySelectorAll("*")]) {
        assert.equal(element.getAttribute("tabindex"), null, element.className);
        assert.equal(element.getAttribute("title"), null, element.className);
        assert.ok(
          !element.matches(
            "a, button, input, select, textarea, [contenteditable]",
          ),
          `${element.nodeName} is no control`,
        );
      }
      for (const image of scene.querySelectorAll("img")) {
        assert.equal(image.getAttribute("alt"), "");
      }
    }
  });
});

// Catches the old Loop's pause by a click on the scene (D-321): a click on any part of it calls no
// control of the screen and changes nothing the page shows.
test("a click on the scene, on any part of it, does nothing", async () => {
  await withPage(async ({ window, document, root }) => {
    const asked = [];
    const controls = {
      togglePause: () => asked.push("togglePause"),
      setPace: () => asked.push("setPace"),
      restart: () => asked.push("restart"),
      end: () => asked.push("end"),
    };
    const panel = {
      element: document.createElement("div"),
      update: () => {},
      placeRulePanel: () => {},
      addDiscoveredRule: () => asked.push("addDiscoveredRule"),
    };
    const screen = await inAct(() => createRunScreen(panel, controls));
    root.append(screen.element);
    const state = withFire(42, doing(GATHER_STICK));
    await inAct(() => screen.update(state, state.run, []));

    const scene = one(screen.element, ".scene");
    const before = screen.element.innerHTML;
    for (const part of [scene, ...scene.querySelectorAll("*")]) {
      await inAct(() =>
        part.dispatchEvent(
          new window.MouseEvent("click", { bubbles: true, cancelable: true }),
        ),
      );
    }
    assert.deepEqual(asked, []);
    assert.equal(screen.element.innerHTML, before);
  });
});

// A game without a map run draws no scene.
test("a game with no map run draws no scene", async () => {
  await withPage(async ({ document }) => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    await inAct(() =>
      root.render(
        createElement(Scene, { state: newGame(), width: 672, height: 304 }),
      ),
    );
    assert.equal(container.childElementCount, 0);
  });
});
