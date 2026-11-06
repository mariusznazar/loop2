// The scene (task scena-z-ludzikiem, To do 1 to 11; D-316 to D-322, D-272, D-43, D-04) on jsdom
// through tests/view/page-document.mjs (D-264): the parts it draws in each way it stands, the badge
// over the mage, the fire absent, burning and extinguished, the greys, that it is a picture nothing
// in which the keyboard reaches or a click moves, and of its motion what jsdom can show — where the
// mage stands at once and where it walks, the place kept where it stays, the stops that hold every
// animation, the bar of a new action, and the elements a redraw keeps. jsdom runs no animation: the
// motion itself, the beat and reduced motion are read from a stream of frames in the browser (D-254,
// D-88). Every comparison is of plain data or of a handful of words (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  createCharacter,
  newGame,
  restart,
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

// Catches a scene that leaves out a part of To do 1, 2 or 4, or draws a part from another file. The
// mage holds its idle sheet and its run sheet, which it shows on a walk (To do 5).
test("a scene going on draws the background, the three props and the mage with its idle and run sheets, and no fire", async () => {
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
    const figure = one(mage, ".scene-mage-sprite");
    assert.deepEqual(sheetOf(one(figure, ".scene-mage-idle")), {
      src: "/sprites/mage-idle.png",
      alt: "",
      frames: "4",
    });
    assert.deepEqual(sheetOf(one(figure, ".scene-mage-run")), {
      src: "/sprites/mage-run.png",
      alt: "",
      frames: "6",
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
    // At the sticks the mage stands at 42, its feet on the line 136.
    placedAt(
      one(scene, ".scene-mage"),
      [12.5, 47.3684, 19.0476, 42.1053],
      "mage",
    );
  });
});

// Catches a mage that stands at the same place whatever it does, or one that has no place where it
// stays at a first draw, which has no previous reading: there it stands in the clearing.
test("the mage stands where the activity leads it: the sticks, the fire, the right edge, the clearing", async () => {
  await withPage(async (page) => {
    const leftOf = async (state) =>
      (await drawn(page, state)).querySelector(".scene-mage").style.left;
    near(await leftOf(doing(GATHER_STICK)), 12.5, "sticks 42");
    near(
      await leftOf(doing({ kind: "gather", resource: "berry" })),
      66.6667,
      "berry 224",
    );
    near(await leftOf(doing({ kind: "craftCampfire" })), 23.8095, "fire 80");
    near(await leftOf(doing({ kind: "explore" })), 81.8452, "right edge 275");
    near(
      await leftOf(withRun(sent(), { current: WAITING })),
      42.8571,
      "clearing 144",
    );
    near(
      await leftOf(withRun(sent(), { current: null })),
      42.8571,
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

/**
 * A property of an element as the real stylesheet, laid on its page, gives it. jsdom reads no rule
 * inside an `@media` rule of a feature, so this shows what the scene does under any setting of motion.
 */
function computed(element, property) {
  const { document, getComputedStyle } = element.ownerDocument.defaultView;
  if (!document.querySelector("style[data-test-styles]")) {
    const style = document.createElement("style");
    style.setAttribute("data-test-styles", "");
    style.textContent = STYLES;
    document.head.append(style);
  }
  return getComputedStyle(element).getPropertyValue(property);
}

/** The greys of D-322 as the stylesheet gives them. */
function filterOf(element) {
  const filter = computed(element, "filter");
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

// --- motion (Slice 5) -----------------------------------------------------------------------------

/**
 * A scene mounted once and drawn again at each state given, with the events of the simulation call
 * that returned it, as the screen draws it at each reading of the clock.
 */
async function mounted({ document }, state, events = []) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const draw = (next, nextEvents = []) =>
    inAct(() =>
      root.render(
        createElement(Scene, {
          state: next,
          width: 672,
          height: 304,
          events: nextEvents,
        }),
      ),
    );
  await draw(state, events);
  return {
    draw,
    scene: () => one(container, ".scene"),
    mage: () => one(container, ".scene-mage"),
  };
}

/** The sent state doing the action from `startMinute`, for ten minutes, at `minute`. */
const doingFrom = (action, startMinute, minute = startMinute) =>
  withRun(sent(), {
    current: { ...current(action), startMinute, endMinute: startMinute + 10 },
    minute,
  });

/** The events of an ordinary change of activity at `minute`, as a game minute returns them. */
const changed = (action, minute) => [
  {
    kind: "activityFinished",
    minute,
    activity: { kind: "rule", ruleId: 1, action: GATHER_STICK },
  },
  {
    kind: "activityStarted",
    minute,
    activity: { kind: "rule", ruleId: 1, action },
    stepTo: null,
  },
];

/** How the mage stands: its left edge, whether it walks, the offset it walks from and its facing. */
const standingOf = (mage) => ({
  left: mage.style.left,
  walking: mage.hasAttribute("data-walking"),
  from: mage.style.getPropertyValue("--walk-start"),
  facing: mage.getAttribute("data-facing"),
});

// To do 5, D-319. Catches a mage that walks in from somewhere at the scene's first draw, after a load
// included, instead of standing at its place at once.
test("at its first draw, after a load included, the mage stands at its place at once, with no walk", async () => {
  await withPage(async (page) => {
    const { mage } = await mounted(page, doing({ kind: "explore" }));
    const placed = standingOf(mage());
    near(placed.left, 81.8452, "right edge 275");
    assert.equal(placed.walking, false, "no walk");
    assert.equal(placed.from, "", "no place it walks from");
  });
});

// To do 5, D-319. Catches a mage that jumps to its next place at an ordinary change of activity, walks
// from another place than the one it stands at, or faces away from the way it walks. The offset the
// walk starts from is a percentage of the mage's own frame of 64 pixels: from 42 to 275 it starts
// 233 pixels to the left, -364.0625 %.
test("at an ordinary change of activity the mage walks from where it stands to its next place, facing the way it walks", async () => {
  await withPage(async (page) => {
    const { draw, mage } = await mounted(page, doingFrom(GATHER_STICK, 0));
    await draw(
      doingFrom({ kind: "explore" }, 10),
      changed({ kind: "explore" }, 10),
    );
    const there = standingOf(mage());
    near(there.left, 81.8452, "heading to the right edge 275");
    assert.deepEqual(
      { walking: there.walking, from: there.from, facing: there.facing },
      { walking: true, from: "-364.0625%", facing: "right" },
    );

    await draw(doingFrom(GATHER_STICK, 30), changed(GATHER_STICK, 30));
    const back = standingOf(mage());
    near(back.left, 12.5, "heading back to the sticks 42");
    assert.deepEqual(
      { walking: back.walking, from: back.from, facing: back.facing },
      { walking: true, from: "364.0625%", facing: "left" },
    );
  });
});

// To do 5, D-319, the glossary's map run restart. Catches a mage that walks across the scene at the
// start of a map run or after „Restart”: the event `mapRunStarted` the simulation returned places it
// at once, where the same state read without that event is an ordinary change and a walk.
test("at „Restart”, the event of a map run started, the mage stands at its place at once, crossing nothing", async () => {
  await withPage(async (page) => {
    const before = doingFrom({ kind: "gather", resource: "berry" }, 0, 4);
    const restarted = restart(before);
    assert.ok(
      restarted.events.some((event) => event.kind === "mapRunStarted"),
      "precondition: „Restart” returns the event of a map run started",
    );
    assert.equal(
      restarted.state.run.current.activity.action.kind,
      "explore",
      "precondition: the restarted map run explores at once",
    );

    const started = await mounted(page, before);
    await started.draw(restarted.state, restarted.events);
    const placed = standingOf(started.mage());
    near(placed.left, 81.8452, "the right edge 275");
    assert.equal(placed.walking, false, "no walk at the start of a map run");

    const read = await mounted(page, before);
    await read.draw(restarted.state, []);
    assert.equal(
      standingOf(read.mage()).walking,
      true,
      "the same state without the event is an ordinary change",
    );
  });
});

// D-318, D-04 (the scene's previous reading). Catches a mage that goes to the clearing, or anywhere,
// where its activity leaves it standing: „Zjedz”, combat and a death keep the place it had.
test("where the activity leaves the mage standing, it keeps the place of the previous reading, in combat and after a death too", async () => {
  await withPage(async (page) => {
    const berry = { kind: "gather", resource: "berry" };
    const { draw, mage } = await mounted(page, doingFrom(berry, 0));
    near(mage().style.left, 66.6667, "precondition: at the berry bush 224");
    const states = {
      eating: doingFrom({ kind: "eat" }, 10),
      combat: withRun(sent(), { current: null, minute: 20 }),
      dead: withRun(doingFrom(berry, 30), {
        death: { minute: 31, cause: "cold" },
      }),
    };
    for (const [name, state] of Object.entries(states)) {
      await draw(state);
      const kept = standingOf(mage());
      near(kept.left, 66.6667, `${name}: the berry bush kept`);
      assert.equal(kept.walking, false, `${name}: no walk`);
    }
  });
});

// To do 8 and 9, D-322. Catches a stop that leaves an animation of the scene running: the frames of
// the mage's sheets, the fire's or the mage's walk, at the player's pause, a discovery, a death or a
// completion; and a scene going on whose animations stand.
test("every stop holds every animation of the scene where it is, and a scene going on runs them", async () => {
  await withPage(async (page) => {
    const animated = (scene) => [
      ["mage", one(scene, ".scene-mage")],
      ["idle frames", one(scene, ".scene-mage-idle img")],
      ["run frames", one(scene, ".scene-mage-run img")],
      ["run sheet", one(scene, ".scene-mage-run")],
      ["idle sheet", one(scene, ".scene-mage-idle")],
      ["fire frames", one(scene, ".scene-fire img")],
    ];
    for (const [standing, make] of Object.entries(STANDINGS)) {
      const scene = await drawn(page, withFire(42, make()));
      assert.equal(scene.getAttribute("data-standing"), standing);
      for (const [name, element] of animated(scene)) {
        const state = computed(element, "animation-play-state");
        if (standing === "going")
          assert.notEqual(state, "paused", `${standing}: ${name}`);
        else assert.equal(state, "paused", `${standing}: ${name}`);
      }
    }
  });
});

// Carried question 4, D-320. Catches a bar that runs back from the last action's fill to the next
// action's — the same action again at the same place, where the mage does not walk, and the first
// action after „Restart”, which starts at the same minute 0 as the last — and a bar rebuilt at every
// reading, which could not fill smoothly from one reading to the next.
test("a new action's bar starts empty as a bar of its own, and one action's bar stays the same bar from reading to reading", async () => {
  await withPage(async (page) => {
    const fill = (scene) => one(scene, ".scene-badge-fill");
    const progress = (element) =>
      Number(element.style.getPropertyValue("--progress"));
    const { draw, scene } = await mounted(page, doingFrom(GATHER_STICK, 0, 9));
    const first = fill(scene());
    near(`${progress(first) * 100}%`, 90, "precondition: nine minutes of ten");

    await draw({ ...doingFrom(GATHER_STICK, 0, 9), realMsCarry: 500 });
    assert.equal(fill(scene()), first, "the same action, the same bar");
    near(`${progress(first) * 100}%`, 95, "it fills on");

    await draw(doingFrom(GATHER_STICK, 10), changed(GATHER_STICK, 10));
    assert.equal(
      one(scene(), ".scene-mage").hasAttribute("data-walking"),
      false,
      "precondition: the same place, no walk",
    );
    const next = fill(scene());
    assert.notEqual(next, first, "a new action, a bar of its own");
    assert.equal(progress(next), 0, "empty");

    const restarted = restart(doingFrom(GATHER_STICK, 0, 9));
    const again = await mounted(page, doingFrom(GATHER_STICK, 0, 9));
    const last = fill(again.scene());
    await again.draw(restarted.state, restarted.events);
    assert.equal(
      restarted.state.run.current.startMinute,
      0,
      "precondition: the first action after „Restart” starts at minute 0",
    );
    assert.notEqual(
      fill(again.scene()),
      last,
      "after „Restart” a bar of its own",
    );
  });
});

// D-03's accepted risk: the screen redraws five times a second, and a rebuilt element restarts its
// CSS animations, so the figure would shake. Catches a redraw that rebuilds an element running an
// animation — the mage, its sheets and their pictures, the fire's — or starts a walk where the place
// is the same.
test("a redraw at each reading of the clock keeps every element that runs an animation and starts no walk", async () => {
  await withPage(async (page) => {
    const reading = (minute) =>
      withFire(42, {
        ...doingFrom(GATHER_STICK, 0, minute),
        realMsCarry: 200 * minute,
      });
    const { draw, scene } = await mounted(page, reading(1));
    const parts = () =>
      [
        ".scene-mage",
        ".scene-mage-sprite",
        ".scene-mage-idle",
        ".scene-mage-idle img",
        ".scene-mage-run",
        ".scene-mage-run img",
        ".scene-fire",
        ".scene-fire img",
        ".scene-badge-fill",
      ].map((selector) => one(scene(), selector));
    const before = parts();
    for (const minute of [2, 3, 4]) {
      await draw(reading(minute));
      const now = parts();
      before.forEach((element, index) =>
        assert.equal(now[index], element, `minute ${minute}: element ${index}`),
      );
      assert.equal(
        one(scene(), ".scene-mage").hasAttribute("data-walking"),
        false,
      );
    }
  });
});

// To do 5, the plan's wiring through run-screen.tsx and world-area.tsx (D-04). Catches a screen that
// does not hand the events of its update to the scene, so the mage walks across the scene at
// „Restart”.
test("the screen of a map run hands the events of each update to the scene", async () => {
  await withPage(async ({ document, root }) => {
    const controls = {
      togglePause: () => {},
      setPace: () => {},
      restart: () => {},
      end: () => {},
    };
    const panel = () => ({
      element: document.createElement("div"),
      update: () => {},
      placeRulePanel: () => {},
      addDiscoveredRule: () => {},
    });
    const before = doingFrom({ kind: "gather", resource: "berry" }, 0, 4);
    const restarted = restart(before);
    const mageAfter = async (events) => {
      const screen = await inAct(() => createRunScreen(panel(), controls));
      root.append(screen.element);
      await inAct(() => screen.update(before, before.run, []));
      await inAct(() =>
        screen.update(restarted.state, restarted.state.run, events),
      );
      return standingOf(one(screen.element, ".scene-mage"));
    };
    assert.equal((await mageAfter(restarted.events)).walking, false);
    assert.equal((await mageAfter([])).walking, true);
  });
});
