// The scene (D-316 to D-322, D-272, D-43, D-04) on jsdom through tests/view/page-document.mjs
// (D-264): the parts it draws in each way it stands, the badge over the mage, the fire absent,
// burning and extinguished, the greys, that it is a picture nothing in which the keyboard reaches or
// a click moves, and of its motion what jsdom can show — where the mage stands at once and where it
// walks, the place kept where it stays, the stops that hold every animation, the bar of a new action,
// and the elements a redraw keeps. jsdom runs no animation: the motion itself, the beat and reduced
// motion are read from a stream of frames in the browser (D-254, D-88). Every comparison is of plain
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
  restart,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { createChronicle } from "../../dist/browser/view/chronicle.js";
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

/** Draws the scene of a state at its one size, 672 × 304, and returns its element. */
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

// Catches a scene that leaves out a part of D-316 (the background, the props, the mage), or draws a
// part from another file. The mage holds its idle sheet and its run sheet, which it shows on a walk
// (D-319).
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
// (336 × 152 pixels), so that the picture is right at its one size.
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
    const badge = one(scene, ".scene-badge-carrier .scene-badge");
    const icon = one(badge, ".icon-mask");
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
      one(other, ".scene-badge .icon-mask").style.getPropertyValue("--icon"),
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

// Catches a standing the scene does not mark, which the stylesheet's greys and the stops of the motion read.
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
// in colour. The two values are those D-322 and D-316 give.
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
      addDiscoveredRule: () => asked.push("addDiscoveredRule"),
    };
    const state = withFire(42, doing(GATHER_STICK));
    const screen = await inAct(() =>
      createRunScreen(panel, controls, createChronicle(state)),
    );
    root.append(screen.element);
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

// --- motion (D-319) -----------------------------------------------------------------------------

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

// D-319. Catches a mage that walks in from somewhere at the scene's first draw, after a load
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

// D-319. Catches a mage that jumps to its next place at an ordinary change of activity, walks
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

// D-319, the glossary's map run restart. Catches a mage that walks across the scene at the
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

// D-322. Catches a stop that leaves an animation of the scene running: the frames of
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
      ["badge's carrier", one(scene, ".scene-badge-carrier")],
      ["tint of the light", one(scene, ".scene-tint")],
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

// D-320. Catches a bar that runs back from the last action's fill to the next
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

// The wiring through run-screen.tsx and world-area.tsx (D-04, D-319). Catches a screen that
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
      addDiscoveredRule: () => {},
    });
    const before = doingFrom({ kind: "gather", resource: "berry" }, 0, 4);
    const restarted = restart(before);
    const mageAfter = async (events) => {
      const screen = await inAct(() =>
        createRunScreen(panel(), controls, createChronicle(before)),
      );
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

// --- the gathering as a spectacle (D-364, D-365, D-366) --------------------

const GATHER_FIBER = { kind: "gather", resource: "fiber" };
const PATROL_STICK = { kind: "patrol", resource: "stick" };

/** The state with `count` pieces of the resource in the character's backpack. */
const carrying = (state, item, count) =>
  withRun(state, {
    character: {
      ...state.run.character,
      backpack: { ...state.run.character.backpack, [item]: count },
    },
  });

/** The events of the end of an activity, as a game minute returns them. */
const ended = (action, minute = 10) => ({
  kind: "activityFinished",
  minute,
  activity: { kind: "rule", ruleId: 1, action },
});

/**
 * A scene that has drawn a gathering of the action with `before` pieces carried, then draws the same
 * map run again with `after` pieces and the events given, as the screen draws a reading that carries
 * the end of the gathering.
 */
async function reading(
  page,
  action,
  { before, after, events, patch = {}, next = action },
) {
  const item = action.resource;
  const mountedScene = await mounted(
    page,
    carrying(doingFrom(action, 0, 9), item, before),
  );
  await mountedScene.draw(
    carrying({ ...doingFrom(next, 10, 10), ...patch }, item, after),
    events,
  );
  return mountedScene;
}

/**
 * Fires the end of an element's animation. A browser fires `animationend`; React reads the name it
 * finds the page's style object able to prefix when it loads, which on jsdom, whose style object
 * holds the prefixed property, is `webkitAnimationEnd`, so the page gets both.
 */
function endAnimation(element) {
  const { Event } = element.ownerDocument.defaultView;
  for (const name of ["animationend", "webkitAnimationEnd"])
    element.dispatchEvent(new Event(name, { bubbles: true }));
}

const effectsOf = (scene) => [...scene.querySelectorAll(".scene-effect")];

// D-364. Catches a mage that stands through the gathering, one that bends at „Zbierz” only, or
// at a target with a prop only, and one that bends where it does something else.
test("the mage bends while it gathers, „Zbierz” and „Obchód”, fibre included, and stands otherwise", async () => {
  await withPage(async (page) => {
    for (const action of [GATHER_STICK, GATHER_FIBER, PATROL_STICK]) {
      const scene = await drawn(page, doing(action));
      assert.ok(
        one(scene, ".scene-mage").hasAttribute("data-bending"),
        action.kind + " " + action.resource,
      );
    }
    for (const state of [
      doing({ kind: "explore" }),
      doing({ kind: "eat" }),
      withRun(sent(), { current: WAITING }),
      withRun(doing(GATHER_STICK), { death: { minute: 3, cause: "cold" } }),
      withRun(doing(GATHER_STICK), { completion: { minute: 3 } }),
    ]) {
      const scene = await drawn(page, state);
      assert.equal(
        one(scene, ".scene-mage").hasAttribute("data-bending"),
        false,
      );
    }
  });
});

// D-364. Catches a bend sheet that is another file or has another frame count than the data's, and
// a stylesheet that shows the idle sheet with the bend, or the bend sheet while the mage does not bend.
test("the mage's bend sheet is the data's file, shown in place of the idle sheet while it bends and hidden otherwise", async () => {
  await withPage(async (page) => {
    const gathering = await drawn(page, doing(GATHER_STICK));
    const bend = one(gathering, ".scene-mage-bend");
    assert.deepEqual(sheetOf(bend), {
      src: "/sprites/mage-bend.png",
      alt: "",
      frames: "4",
    });
    assert.equal(computed(bend, "display"), "block");
    assert.equal(
      computed(one(gathering, ".scene-mage-idle"), "display"),
      "none",
    );

    const exploring = await drawn(page, doing({ kind: "explore" }));
    assert.equal(
      computed(one(exploring, ".scene-mage-bend"), "display"),
      "none",
    );
    assert.notEqual(
      computed(one(exploring, ".scene-mage-idle"), "display"),
      "none",
    );
  });
});

// D-364. Catches a mage that bends with its back to the prop: it walks left to the sticks, so its
// figure is mirrored, and the bend sheet, whose frames reach right, must not be.
test("a mage that walked left to the sticks bends facing right, toward them", async () => {
  await withPage(async (page) => {
    const { draw, mage } = await mounted(
      page,
      doingFrom({ kind: "explore" }, 0),
    );
    await draw(doingFrom(GATHER_STICK, 10), changed(GATHER_STICK, 10));
    assert.equal(mage().getAttribute("data-facing"), "left", "precondition");
    const sprite = one(mage(), ".scene-mage-sprite");
    assert.equal(computed(sprite, "transform"), "scaleX(-1)");
    assert.equal(
      computed(one(mage(), ".scene-mage-bend"), "transform"),
      "scaleX(-1)",
      "turned back inside the mirrored figure",
    );
  });
});

// D-365, D-04. Catches an end of gathering that shows no flight, a flight of another icon than
// the resource's, or one that comes without the backpack having gained a piece.
test("a gathering that ends with a piece more in the backpack sends the icon of the resource flying, on a plaque", async () => {
  await withPage(async (page) => {
    const { scene } = await reading(page, GATHER_STICK, {
      before: 0,
      after: 1,
      events: [ended(GATHER_STICK)],
    });
    const found = effectsOf(scene());
    assert.equal(found.length, 1);
    assert.ok(found[0].classList.contains("scene-flight"));
    assert.equal(scene().querySelectorAll(".scene-dust").length, 0);
    const icon = one(found[0], ".scene-flight-plaque .icon-mask");
    assert.equal(
      icon.style.getPropertyValue("--icon"),
      'url("/icons/wood-stick.svg")',
    );
    assert.equal(
      found[0].querySelector("img"),
      null,
      "the icon is a mask, not a picture of its file",
    );
    assert.equal(
      computed(icon, "color"),
      "var(--text-strong)",
      "no text stands beside it: text-strong (D-40, D-43)",
    );
    assert.equal(found[0].textContent, "", "no text");
    // It lands on the mage's body: the mage's frame at 42 plus 32, the line 136 less 18, as
    // percentages of 336 × 152 pixels.
    const plaque = one(found[0], ".scene-flight-plaque");
    near(plaque.style.left, (74 / 336) * 100, "lands at x 74");
    near(plaque.style.top, (118 / 152) * 100, "lands at y 118");
    // It starts at the middle of the sticks, 91 and 125.5, which is 17 pixels right of the landing
    // and 7.5 below it.
    near(
      found[0].style.getPropertyValue("--from-x"),
      (17 / 336) * 100,
      "from x",
    );
    near(
      found[0].style.getPropertyValue("--from-y"),
      (7.5 / 152) * 100,
      "from y",
    );
  });
});

// D-365. Catches a flight at „Obchód” that carries one icon per piece, or none for the whole result.
test("„Obchód” sends one icon for its whole result, however many pieces it brought", async () => {
  await withPage(async (page) => {
    const { scene } = await reading(page, PATROL_STICK, {
      before: 0,
      after: 7,
      events: [ended(PATROL_STICK)],
    });
    assert.equal(scene().querySelectorAll(".scene-flight").length, 1);
    assert.equal(
      scene().querySelectorAll(".scene-flight-plaque .icon-mask").length,
      1,
    );
  });
});

// D-365. Catches a flight of the fibre that starts at a prop it has none of, or at the mage's head.
test("the fibre's icon flies up from under the mage's feet, where it has no prop", async () => {
  await withPage(async (page) => {
    const { scene } = await reading(page, GATHER_FIBER, {
      before: 0,
      after: 1,
      events: [ended(GATHER_FIBER)],
    });
    const flight = one(scene(), ".scene-flight");
    assert.equal(
      one(flight, ".scene-flight-plaque .icon-mask").style.getPropertyValue(
        "--icon",
      ),
      'url("/icons/flax.svg")',
    );
    // The mage stands where it did, in the clearing at 144 (its body at 176); the feet are 3 above the
    // line, 133, and the body 118: the icon starts 15 pixels below where it lands.
    assert.equal(
      flight.style.getPropertyValue("--from-x"),
      "0%",
      "straight up",
    );
    near(flight.style.getPropertyValue("--from-y"), (15 / 152) * 100, "from y");
  });
});

// D-366, D-66. Catches a miss that shows no dust, dust where the backpack gained a piece, dust at
// „Obchód”, which never misses, and dust at another place than the prop's.
test("„Zbierz” that ends with no new piece puts a cloud of dust at the prop, and no icon flies", async () => {
  await withPage(async (page) => {
    const { scene } = await reading(page, GATHER_STICK, {
      before: 2,
      after: 2,
      events: [ended(GATHER_STICK)],
    });
    const found = effectsOf(scene());
    assert.equal(found.length, 1);
    assert.ok(found[0].classList.contains("scene-dust"));
    assert.equal(scene().querySelectorAll(".scene-flight").length, 0);
    assert.deepEqual(sheetOf(found[0]), {
      src: "/sprites/dust.png",
      alt: "",
      frames: "8",
    });
    // Its 16 × 16 frame is centred on the sticks (80 + 11 = 91), 83 from the left, with its bottom at
    // the line 132 and 2 below it.
    placedAt(
      found[0],
      [(83 / 336) * 100, (118 / 152) * 100, (16 / 336) * 100, (16 / 152) * 100],
      "dust",
    );
  });
});

test("a missed „Zbierz” of the fibre puts the cloud under the mage's feet", async () => {
  await withPage(async (page) => {
    const { scene } = await reading(page, GATHER_FIBER, {
      before: 0,
      after: 0,
      events: [ended(GATHER_FIBER)],
    });
    const dust = one(scene(), ".scene-dust");
    // Centred on the mage's body at 176, so 168 from the left, its bottom at the ground line 136 + 2.
    placedAt(
      dust,
      [
        (168 / 336) * 100,
        (122 / 152) * 100,
        (16 / 336) * 100,
        (16 / 152) * 100,
      ],
      "dust",
    );
  });
});

test("an „Obchód” that brought nothing shows no effect", async () => {
  await withPage(async (page) => {
    const { scene } = await reading(page, PATROL_STICK, {
      before: 3,
      after: 3,
      events: [ended(PATROL_STICK)],
    });
    assert.equal(effectsOf(scene()).length, 0);
  });
});

// D-367, D-317. Catches an effect that comes with no end of a gathering, from a first draw, or from
// a reading that carries two ends, which are overdue; and one at the start of a map run.
test("no effect without exactly one end of a gathering in a reading that has a previous reading", async () => {
  await withPage(async (page) => {
    // A reading with no end of a gathering: the backpack grew, nothing finished.
    const none = await reading(page, GATHER_STICK, {
      before: 0,
      after: 1,
      events: [],
    });
    assert.equal(effectsOf(none.scene()).length, 0);

    // The end of another action.
    const eating = await reading(page, GATHER_STICK, {
      before: 0,
      after: 1,
      events: [ended({ kind: "eat" })],
    });
    assert.equal(effectsOf(eating.scene()).length, 0);

    // Two ends in one reading, as after a catch-up: both overdue.
    const two = await reading(page, GATHER_STICK, {
      before: 0,
      after: 2,
      events: [ended(GATHER_STICK, 8), ended(GATHER_STICK, 10)],
    });
    assert.equal(effectsOf(two.scene()).length, 0);

    // A map run started in the same reading has no previous reading of its own.
    const started = await reading(page, GATHER_STICK, {
      before: 0,
      after: 1,
      events: [{ kind: "mapRunStarted", seed: 1 }, ended(GATHER_STICK)],
    });
    assert.equal(effectsOf(started.scene()).length, 0);

    // The first draw has no previous reading.
    const first = await mounted(
      page,
      carrying(doingFrom(GATHER_STICK, 10, 10), "stick", 1),
      [ended(GATHER_STICK)],
    );
    assert.equal(effectsOf(first.scene()).length, 0);
  });
});

// D-322, D-317. Catches an effect started at a stop, which would stand frozen over a discovery, and
// an effect already running that does not stand still with the rest of the scene at the pause.
test("an effect whose turn comes at a stop is dropped, and one running stands still with the scene at a stop", async () => {
  await withPage(async (page) => {
    const atDiscovery = await reading(page, GATHER_STICK, {
      before: 0,
      after: 1,
      events: [ended(GATHER_STICK)],
      patch: {},
    });
    assert.equal(effectsOf(atDiscovery.scene()).length, 1, "precondition");

    const stopped = await mounted(
      page,
      carrying(doingFrom(GATHER_STICK, 0, 9), "stick", 0),
    );
    await stopped.draw(
      {
        ...carrying(doingFrom(GATHER_STICK, 10, 10), "stick", 1),
        paused: true,
        discovery: NO_UNDERSTANDING_ITEMS,
      },
      [ended(GATHER_STICK)],
    );
    assert.equal(
      effectsOf(stopped.scene()).length,
      0,
      "dropped at a discovery",
    );

    // The pause comes while the effect runs: the effect stays and its animation is held.
    await atDiscovery.draw({
      ...carrying(doingFrom(GATHER_STICK, 10, 10), "stick", 1),
      paused: true,
    });
    const [held] = effectsOf(atDiscovery.scene());
    assert.ok(held, "the effect stays through the pause");
    assert.equal(computed(held, "animation-play-state"), "paused");
    assert.equal(
      computed(one(held, ".scene-flight-plaque"), "animation-play-state"),
      "paused",
    );
  });
});

// D-317. Catches an effect that lasts longer than 300 ms or stays after its animation, and one that a
// redraw at the next reading of the clock starts over.
test("an effect lasts 300 ms, is dropped when its animation ends, and a redraw does not restart it", async () => {
  await withPage(async (page) => {
    const { draw, scene } = await reading(page, GATHER_STICK, {
      before: 0,
      after: 1,
      events: [ended(GATHER_STICK)],
    });
    const [effect] = effectsOf(scene());
    assert.equal(computed(effect, "animation-duration"), "300ms");
    assert.equal(computed(effect, "animation-fill-mode"), "forwards");

    // The next reading of the clock, with no event, keeps the same element.
    await draw(carrying(doingFrom(GATHER_STICK, 10, 10), "stick", 1));
    assert.equal(effectsOf(scene())[0], effect, "the same element");

    // A child's animation ending is not the effect's end.
    await inAct(() => endAnimation(one(effect, ".scene-flight-plaque")));
    assert.equal(effectsOf(scene()).length, 1);

    await inAct(() => endAnimation(effect));
    assert.equal(effectsOf(scene()).length, 0, "gone after its animation");
  });
});

// D-317, „latest wins”. Catches a second effect that stands beside a running one, or one that the
// first's animation end removes.
test("a new effect takes the place of the one still running, and the old one's end does not remove it", async () => {
  await withPage(async (page) => {
    const { draw, scene } = await reading(page, GATHER_STICK, {
      before: 0,
      after: 1,
      events: [ended(GATHER_STICK)],
    });
    const [first] = effectsOf(scene());
    await draw(carrying(doingFrom(GATHER_STICK, 20, 20), "stick", 1), [
      ended(GATHER_STICK, 20),
    ]);
    const found = effectsOf(scene());
    assert.equal(found.length, 1);
    assert.ok(
      found[0].classList.contains("scene-dust"),
      "a miss follows the hit",
    );
    assert.notEqual(found[0], first);
  });
});

// D-317, D-322. Catches an effect left behind when the map run ends or restarts.
test("a map run started drops an effect still standing", async () => {
  await withPage(async (page) => {
    const { draw, scene } = await reading(page, GATHER_STICK, {
      before: 0,
      after: 1,
      events: [ended(GATHER_STICK)],
    });
    assert.equal(effectsOf(scene()).length, 1, "precondition");
    await draw(doingFrom(GATHER_STICK, 0, 0), [
      { kind: "mapRunStarted", seed: 2 },
    ]);
    assert.equal(effectsOf(scene()).length, 0);
  });
});

// D-367, D-365, D-366. Catches an effect placed by where the mage goes next instead of where it
// stood when the gathering ended: in the reading that carries the end the next action has started,
// and a walk to the right edge (275) or to the sticks (42) is no place the mage is at. The mage of
// every case stands at its place, which the first draw gives: the sticks 42, the bush 224, the
// clearing 144 for the fibre. Its body is 32 to the right of its frame's edge, its feet likewise.
test("an effect stands at the mage that gathered, though the next action walks elsewhere", async () => {
  await withPage(async (page) => {
    const EXPLORE = { kind: "explore" };
    const ended = (action) => [
      {
        kind: "activityFinished",
        minute: 10,
        activity: { kind: "rule", ruleId: 1, action },
      },
      {
        kind: "activityStarted",
        minute: 10,
        activity: { kind: "rule", ruleId: 1, action: EXPLORE },
        stepTo: null,
      },
    ];
    // A hit at the sticks, the mage's frame at 42: the icon lands at 74 and starts at 91, 17 right of it.
    const stick = await reading(page, GATHER_STICK, {
      before: 0,
      after: 1,
      events: ended(GATHER_STICK),
      next: EXPLORE,
    });
    const flight = one(stick.scene(), ".scene-flight");
    near(
      one(flight, ".scene-flight-plaque").style.left,
      (74 / 336) * 100,
      "the icon lands at the sticks' mage, not at 307",
    );
    near(flight.style.getPropertyValue("--from-x"), (17 / 336) * 100, "from x");

    // A hit at the bush, the mage's frame at 224, then back to the sticks: lands at 256.
    const BERRY = { kind: "gather", resource: "berry" };
    const berry = await reading(page, BERRY, {
      before: 0,
      after: 1,
      events: ended(BERRY),
      next: GATHER_STICK,
    });
    near(
      one(berry.scene(), ".scene-flight-plaque").style.left,
      (256 / 336) * 100,
      "the icon lands at the bush's mage",
    );

    // A hit of the fibre at the clearing, the mage's frame at 144: starts under its feet at 176.
    const fibre = await reading(page, GATHER_FIBER, {
      before: 0,
      after: 1,
      events: ended(GATHER_FIBER),
      next: EXPLORE,
    });
    const fibreFlight = one(fibre.scene(), ".scene-flight");
    near(
      one(fibreFlight, ".scene-flight-plaque").style.left,
      (176 / 336) * 100,
      "lands at the mage of the clearing",
    );
    assert.equal(fibreFlight.style.getPropertyValue("--from-x"), "0%");

    // A miss of the fibre: the cloud under the mage's feet, 168 from the left, not at the edge.
    const missed = await reading(page, GATHER_FIBER, {
      before: 0,
      after: 0,
      events: ended(GATHER_FIBER),
      next: EXPLORE,
    });
    near(
      one(missed.scene(), ".scene-dust").style.left,
      (168 / 336) * 100,
      "the cloud under the feet of the mage that gathered",
    );

    // A miss at the sticks stands at the sticks whatever comes next.
    const sticks = await reading(page, GATHER_STICK, {
      before: 1,
      after: 1,
      events: ended(GATHER_STICK),
      next: EXPLORE,
    });
    near(
      one(sticks.scene(), ".scene-dust").style.left,
      (83 / 336) * 100,
      "the cloud at the sticks",
    );
  });
});

// D-364. Catches a mage that bends with its back to its prop: the moss lies to the
// mage's left, the sticks and the bush to its right. The bend sheet's frames reach right and the mage's
// figure is mirrored when it walked left, so the sheet is mirrored again where the two differ.
test("the bending mage faces its prop whatever way it walked: sticks and bush to the right, moss to the left", async () => {
  await withPage(async (page) => {
    const MOSS = { kind: "gather", resource: "moss" };
    const BERRY = { kind: "gather", resource: "berry" };
    const bendMirror = (mage) =>
      computed(one(mage, ".scene-mage-bend"), "transform") === "scaleX(-1)";
    const walked = async (from, to) => {
      const { draw, mage } = await mounted(page, doingFrom(from, 0));
      await draw(doingFrom(to, 10), changed(to, 10));
      return mage();
    };

    // From the clearing's side to the sticks and the moss the mage walks left: its figure is mirrored.
    const sticks = await walked({ kind: "explore" }, GATHER_STICK);
    assert.equal(sticks.getAttribute("data-facing"), "left", "precondition");
    assert.equal(sticks.getAttribute("data-bend-facing"), "right");
    assert.equal(
      bendMirror(sticks),
      true,
      "the sticks: turned back, facing right",
    );

    const moss = await walked({ kind: "explore" }, MOSS);
    assert.equal(moss.getAttribute("data-facing"), "left", "precondition");
    assert.equal(moss.getAttribute("data-bend-facing"), "left");
    assert.equal(
      bendMirror(moss),
      false,
      "the moss: left with the figure, not turned back",
    );

    // To the bush from the sticks the mage walks right: its figure is not mirrored.
    const berry = await walked(GATHER_STICK, BERRY);
    assert.equal(berry.getAttribute("data-facing"), "right", "precondition");
    assert.equal(berry.getAttribute("data-bend-facing"), "right");
    assert.equal(bendMirror(berry), false, "the bush: right with the figure");

    // Placed at the moss at once, as at a first draw, the mage faces right: the bend turns over to the left.
    const placed = (await mounted(page, doingFrom(MOSS, 0))).mage();
    assert.equal(placed.getAttribute("data-facing"), "right", "precondition");
    assert.equal(
      bendMirror(placed),
      true,
      "the moss at a first draw: turned over",
    );

    // The fibre has no prop: the mage bends as it faces, whichever way that is.
    for (const from of [{ kind: "explore" }, BERRY]) {
      const fibre = await walked(from, GATHER_FIBER);
      assert.equal(fibre.getAttribute("data-bend-facing"), null, "no prop");
      assert.equal(bendMirror(fibre), false, "the fibre: as the mage faces");
    }
  });
});

// --- the tint of the light, the smaller flame and the frost -------------------------------------

/** The sent state at a streak, a body temperature and a standing, the rest of the map run as sent. */
const lit = (
  { streak = 0, temperature = 37, ...patch } = {},
  standing = {},
) => ({
  ...doing(GATHER_STICK, {
    streak,
    body: { ...sent().run.body, temperature },
    ...patch,
  }),
  paused: false,
  discovery: null,
  ...standing,
});

/** The names of the scene's direct children, in the order they are painted, from the bottom. */
const layersOf = (scene) =>
  [...scene.children].map((element) => element.className.split(" ")[0]);

// D-315, D-372. Catches a tint that lies under the mage or over the badge, a frost under the tint, a
// flying icon with its plaque over the tint (D-315 puts under the tint everything the scene draws but
// the badge and the frost), and a badge still inside the mage's element, which is under the tint.
test("the layers: the tint over everything the scene draws, the flying icon and the dust included, the frost and the badge over it", async () => {
  await withPage(async (page) => {
    const state = withFire(42, lit({ streak: 100, temperature: 36 }));
    const scene = await drawn(page, state);
    assert.deepEqual(layersOf(scene), [
      "scene-background",
      "scene-prop",
      "scene-prop",
      "scene-prop",
      "scene-fire",
      "scene-mage",
      "scene-tint",
      "scene-frost",
      "scene-badge-carrier",
    ]);
    assert.equal(
      scene.querySelector(".scene-mage .scene-badge"),
      null,
      "the badge is not inside the mage's element",
    );

    // A cloud of dust lies under the tint and a flying icon on its plaque over it.
    const dust = await reading(
      page,
      { kind: "gather", resource: "stick" },
      {
        before: 1,
        after: 1,
        events: [ended({ kind: "gather", resource: "stick" })],
      },
    );
    const layers = layersOf(dust.scene());
    assert.ok(
      layers.indexOf("scene-effect") < layers.indexOf("scene-tint"),
      "dust under the tint",
    );
    const flight = await reading(
      page,
      { kind: "gather", resource: "stick" },
      {
        before: 1,
        after: 2,
        events: [ended({ kind: "gather", resource: "stick" })],
      },
    );
    const flying = layersOf(flight.scene());
    assert.ok(
      flying.indexOf("scene-effect") < flying.indexOf("scene-tint"),
      "the plaque of the icon under the tint",
    );
    assert.ok(
      flying.indexOf("scene-effect") > flying.indexOf("scene-mage"),
      "and over the mage it flies to",
    );
  });
});

// D-320. Catches a badge that does not walk with the mage, or stands at another place than over its
// head: its carrier has the mage's box and the mage's walk, on both elements together.
test("the badge's carrier stands where the mage stands and walks as it walks", async () => {
  await withPage(async (page) => {
    const { draw, scene } = await mounted(page, doingFrom(GATHER_STICK, 0));
    const both = () => [
      standingOf(one(scene(), ".scene-mage")),
      standingOf(one(scene(), ".scene-badge-carrier")),
    ];
    const [mage, carrier] = both();
    assert.equal(carrier.left, mage.left);
    assert.equal(carrier.walking, false);
    await draw(
      doingFrom({ kind: "explore" }, 10),
      changed({ kind: "explore" }, 10),
    );
    const [walkingMage, walkingCarrier] = both();
    assert.equal(walkingMage.walking, true, "precondition: the mage walks");
    assert.equal(walkingCarrier.walking, true);
    assert.equal(walkingCarrier.left, walkingMage.left);
    assert.equal(walkingCarrier.from, walkingMage.from);
    assert.equal(
      one(scene(), ".scene-badge-carrier").style.top,
      one(scene(), ".scene-mage").style.top,
    );
  });
});

const tintOf = (scene) => one(scene, ".scene-tint");
const tintValue = (scene) => tintOf(scene).style.getPropertyValue("--tint");

// D-316. Catches a tint that does not follow the streak evenly to 0.8 at the streak the condition
// asks for, one that goes on past it, and one that is full before the completion.
test("the tint goes from 0 at streak 0 to 0.8 at the required streak, stays there and is 1 only at a completion", async () => {
  await withPage(async (page) => {
    const at = async (state) => tintValue(await drawn(page, state));
    assert.equal(await at(lit({ streak: 0 })), "0");
    assert.equal(await at(lit({ streak: 120 })), "0.2");
    assert.equal(await at(lit({ streak: 240 })), "0.4");
    assert.equal(await at(lit({ streak: 480 })), "0.8");
    assert.equal(await at(lit({ streak: 700 })), "0.8");
    assert.equal(
      await at(lit({ streak: 480, completion: { minute: 480 } })),
      "1",
    );
  });
});

// D-316. Catches a loss that takes the tint back at once, a return that runs on a rise,
// and a return that restarts when the streak grows again.
test("a loss of the streak in the map run's course returns the tint to the cool one on a new element, and a rise runs no return", async () => {
  await withPage(async (page) => {
    const { draw, scene } = await mounted(page, lit({ streak: 480 }));
    const first = tintOf(scene());
    assert.equal(tintValue(scene()), "0.8");
    assert.equal(first.hasAttribute("data-returning"), false);

    await draw(lit({ streak: 0 }));
    const back = tintOf(scene());
    assert.notEqual(back, first, "a return starts on an element of its own");
    assert.equal(back.hasAttribute("data-returning"), true);
    assert.equal(back.style.getPropertyValue("--tint-start"), "0.8");
    assert.equal(tintValue(scene()), "0");

    // The streak grows on while the return runs: the return is not restarted.
    await draw(lit({ streak: 24 }));
    assert.equal(tintOf(scene()), back);
    assert.equal(tintValue(scene()), "0.04");
    assert.equal(back.hasAttribute("data-returning"), true);

    // A return that ran to its end is over, so a scene shown anew does not run it again.
    await inAct(() => endAnimation(back));
    assert.equal(tintOf(scene()).hasAttribute("data-returning"), false);
    assert.equal(tintOf(scene()).style.getPropertyValue("--tint-start"), "");

    // A rise from standing runs no return.
    await draw(lit({ streak: 48 }));
    assert.equal(tintOf(scene()).hasAttribute("data-returning"), false);
    assert.equal(tintValue(scene()), "0.08");
  });
});

// D-316, D-322. Catches a pause that returns the tint while time stands: the
// loss in the pause shows no change, and the return runs where the scene goes on.
test("a loss of the streak in the player's pause or at a discovery returns the tint only where the scene goes on", async () => {
  await withPage(async (page) => {
    for (const standing of [
      { paused: true },
      { paused: true, discovery: NO_UNDERSTANDING_ITEMS },
    ]) {
      const { draw, scene } = await mounted(page, lit({ streak: 480 }));
      const before = tintOf(scene());
      await draw(lit({ streak: 0 }, standing));
      assert.equal(tintOf(scene()), before, "the same layer, unchanged");
      assert.equal(tintValue(scene()), "0.8", "the tint it had");
      assert.equal(before.hasAttribute("data-returning"), false);

      await draw(lit({ streak: 0 }));
      assert.equal(tintOf(scene()).hasAttribute("data-returning"), true);
      assert.equal(
        tintOf(scene()).style.getPropertyValue("--tint-start"),
        "0.8",
      );
      assert.equal(tintValue(scene()), "0");
    }
  });
});

// D-316. Catches a death or a completion that runs a return, a „Restart” that runs one, and a
// first draw, a load included, that shows anything but where the streak puts the tint.
test("at a death, a completion, a map run started and a first draw the tint stands at once where the streak puts it", async () => {
  await withPage(async (page) => {
    const standsAtOnce = (scene, value, name) => {
      assert.equal(tintValue(scene), value, name);
      assert.equal(tintOf(scene).hasAttribute("data-returning"), false, name);
    };

    const first = await drawn(page, lit({ streak: 300 }));
    standsAtOnce(first, "0.5", "first draw");

    const death = await mounted(page, lit({ streak: 480 }));
    await death.draw(lit({ streak: 0, death: { minute: 480, cause: "cold" } }));
    standsAtOnce(death.scene(), "0", "death");

    const completion = await mounted(page, lit({ streak: 479 }));
    await completion.draw(lit({ streak: 480, completion: { minute: 480 } }));
    standsAtOnce(completion.scene(), "1", "completion");

    const before = lit({ streak: 480 });
    const restarted = restart(before);
    const started = await mounted(page, before);
    await started.draw(restarted.state, restarted.events);
    standsAtOnce(started.scene(), "0", "a map run started");
    const read = await mounted(page, before);
    await read.draw(restarted.state, []);
    assert.equal(
      tintOf(read.scene()).hasAttribute("data-returning"),
      true,
      "the same state without the event is an ordinary loss",
    );
  });
});

// D-43. Catches a tint or a frost that reaches the stylesheet as anything but
// numbers from the state: the colour and the opacity are the stylesheet's, from the tokens.
test("the layer of the tint carries the number and no colour in its style", async () => {
  await withPage(async (page) => {
    const scene = await drawn(page, lit({ streak: 240, temperature: 36 }));
    const style = tintOf(scene).getAttribute("style");
    assert.match(style, /^--tint: 0\.4;?$/);
    assert.doesNotMatch(
      one(scene, ".scene-frost").getAttribute("style"),
      /#|rgb|hsl|oklch|color/i,
    );
  });
});

// D-372, D-271, D-349. Catches a frost at 37 °C, one that does not grow with the cold or has the wrong
// thickness at 36 °C and at 35 °C, and one that goes on below the chill or is built on another pixel
// than the scene's: a pixel is 1/336 of the frame's width and 1/152 of its height.
test("the frost is none at 37 °C, 8 pixels at 36 °C, the whole 16 at 35 °C and below, on the scene's pixel", async () => {
  await withPage(async (page) => {
    const frostAt = async (temperature) => {
      const scene = await drawn(page, lit({ temperature }));
      return scene.querySelector(".scene-frost");
    };
    assert.equal(await frostAt(37), null);
    for (const [temperature, thickness] of [
      [36.5, "4"],
      [36, "8"],
      [35.5, "12"],
      [35, "16"],
      [34, "16"],
      [-20, "16"],
    ]) {
      const frost = await frostAt(temperature);
      assert.equal(
        frost.style.getPropertyValue("--frost"),
        thickness,
        `${temperature} °C`,
      );
    }
    const frost = await frostAt(36);
    assert.equal(frost.style.getPropertyValue("--pixel-x"), "0.297619%");
    assert.equal(frost.style.getPropertyValue("--pixel-y"), "0.657895%");
  });
});

// D-372. Catches a frost that stays when the body is warmed at the fire, and one that is drawn at once
// at its place with no change to run: its thickness is the state's, reading by reading.
test("warming at the fire takes the frost back, reading by reading", async () => {
  await withPage(async (page) => {
    const { draw, scene } = await mounted(page, lit({ temperature: 35.5 }));
    const thickness = () =>
      scene().querySelector(".scene-frost")?.style.getPropertyValue("--frost");
    assert.equal(thickness(), "12");
    await draw(lit({ temperature: 36 }));
    assert.equal(thickness(), "8");
    await draw(lit({ temperature: 37 }));
    assert.equal(thickness(), undefined);
  });
});

// D-373, D-316. Catches a fire that shows the smaller flame too early or too late, the extinguished
// fire that takes it, and a smaller flame of another file or another frame count.
test("a burning fire shows the smaller flame in its last 20 minutes, the full one before and the extinguished fire always the full one", async () => {
  await withPage(async (page) => {
    const flame = async (minutesLeft) =>
      sheetOf(one(await drawn(page, withFire(minutesLeft)), ".scene-fire"));
    const FULL = { src: "/sprites/fire.png", alt: "", frames: "4" };
    const SMALL = { src: "/sprites/fire-small.png", alt: "", frames: "4" };
    assert.deepEqual(await flame(60), FULL);
    assert.deepEqual(await flame(21), FULL);
    assert.deepEqual(await flame(20), SMALL);
    assert.deepEqual(await flame(1), SMALL);
    assert.deepEqual(await flame(0), FULL, "the extinguished fire");
    const small = one(await drawn(page, withFire(5)), ".scene-fire");
    assert.equal(small.getAttribute("data-burning"), "true");
    placedAt(small, [36.9048, 65.7895, 9.5238, 21.0526], "the smaller flame");
  });
});

// D-373, the same beat. Catches a fire whose sheet is swapped on a new element, which would restart
// its frames and show a jump at the minute the flame grows small.
test("the fire's element stays the same when its flame turns small", async () => {
  await withPage(async (page) => {
    const { draw, scene } = await mounted(page, withFire(25));
    const fire = one(scene(), ".scene-fire");
    const frames = one(fire, "img");
    await draw(withFire(19));
    assert.equal(one(scene(), ".scene-fire"), fire);
    assert.equal(one(fire, "img"), frames);
    assert.equal(frames.getAttribute("src"), "/sprites/fire-small.png");
  });
});

// D-322. Catches a pause that leaves the tint or the frost out of its grey: they lie in the
// scene, so the pause's filter on the scene greys them with the rest.
test("the pause greys the tint and the frost with the whole scene, because they lie inside it", async () => {
  await withPage(async (page) => {
    const scene = await drawn(
      page,
      lit({ streak: 240, temperature: 36 }, { paused: true }),
    );
    assert.equal(filterOf(scene), "grayscale(1) brightness(0.5)");
    for (const part of [tintOf(scene), one(scene, ".scene-frost")])
      assert.ok(scene.contains(part), part.className);
    assert.equal(filterOf(tintOf(scene)), "", "no second grey of its own");
  });
});
