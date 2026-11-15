// The registry of the game's screens (D-280, D-281, D-283). These tests run the registry on jsdom
// through tests/view/page-document.mjs (D-264, D-268) with entries written here as plain objects
// that record their calls, and an address of their own: they prove which screen is built, shown,
// drawn and taken down and in what order, never what a screen draws (D-88).
import { assert, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createCharacter, newGame, send } from "../../dist/browser/sim/game.js";
import { createScreenRegistry } from "../../dist/browser/view/screen-registry.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

/** The document of the case's window, which the harness installs as the page's global. */
const page = () => globalThis.document;

const HEADQUARTERS = { kind: "headquarters" };
const PROGRAMS = { kind: "programs" };
const PROGRAM_1 = { kind: "program", programId: 1 };
const PROGRAM_2 = { kind: "program", programId: 2 };
const RUN = { kind: "run", characterId: 1 };
const CHARACTER_1 = { kind: "character", characterId: 1 };
const CHARACTER_2 = { kind: "character", characterId: 2 };
const MAPS = { kind: "maps" };
const MAP = { kind: "map", mapId: "forest" };

/**
 * An entry that records its calls into `log`, each as `name:call`. `instances` collects what it
 * built, so a case can tell two builds apart.
 */
function entryOf(name, kinds, log, lives = "always", key = undefined) {
  const instances = [];
  const entry = {
    kinds,
    lives,
    ...(key === undefined ? {} : { key }),
    instances,
    build(port, screen) {
      const element = page().createElement("section");
      element.tabIndex = -1;
      element.dataset.name = name;
      const instance = {
        element,
        builtOn: screen,
        commit: () => log.push(`${name}:commit`),
        leave: () => log.push(`${name}:leave on ${port.current().kind}`),
        placed: (placed) => log.push(`${name}:placed ${placed.kind}`),
        drawResult: (events) => log.push(`${name}:result ${events.length}`),
        drawReading: (shown) => log.push(`${name}:reading ${shown}`),
        dispose: () => {
          log.push(`${name}:dispose`);
          element.remove();
        },
      };
      log.push(`${name}:build ${screen.kind}`);
      instances.push(instance);
      return instance;
    },
  };
  return entry;
}

/** Asserts that `body` throws an error whose message matches `pattern`. */
function throwsLike(body, pattern) {
  let thrown = null;
  try {
    body();
  } catch (error) {
    thrown = error;
  }
  assert.ok(thrown instanceof Error, "it threw");
  assert.match(thrown.message, pattern);
}

/** An address that records what is written into `log`. */
function addressOf(log) {
  return {
    go: (hash) => log.push(`address go ${hash}`),
    replace: (hash) => log.push(`address replace ${hash}`),
  };
}

/**
 * The five entries of a game's table in the order of its document: Siedziba, Programy, Przejście,
 * Postać and Mapy, the last two `while-shown`.
 */
function table(log) {
  return [
    entryOf("hq", ["headquarters"], log),
    entryOf("programs", ["programs", "program"], log),
    entryOf("run", ["run"], log),
    entryOf("character", ["character"], log, "while-shown", (screen) =>
      String(screen.characterId),
    ),
    entryOf("maps", ["maps", "map"], log, "while-shown", () => "maps"),
  ];
}

/** Builds the registry on a page of its own and gives `body` it with the case's records. */
async function onRegistry(
  body,
  { first = HEADQUARTERS, state = newGame() } = {},
) {
  await withPage(async ({ root }) => {
    const element = page().createElement("div");
    root.append(element);
    const log = [];
    const places = [];
    const entries = table(log);
    const holder = { state };
    const registry = createScreenRegistry({
      element,
      entries,
      first,
      address: addressOf(log),
      state: () => holder.state,
      onPlace: (place) => places.push(place),
    });
    await body({ registry, element, log, places, entries, holder, root });
  });
}

const names = (element) =>
  [...element.children].map((child) => child.dataset.name);
const hiddenNames = (element) =>
  [...element.children]
    .filter((child) => child.hidden)
    .map((child) => child.dataset.name);

// decision: D-408 "A new screen of the game is added as a module of its own, one entry in the registry of screens, its address and its position on the menu bar"
// decision: D-408 "No function the game view shares between its screens names the new screen"
// Catches a screen that two entries both claim, which would be built twice, and one that no entry
// claims, which would show nothing.
test("a kind that two entries hold throws at creation, and so does a kind of `Screen` that no entry holds", async () => {
  await withPage(async ({ root }) => {
    const log = [];
    const make = (entries, first = HEADQUARTERS) =>
      createScreenRegistry({
        element: root,
        entries,
        first,
        address: addressOf(log),
        state: () => newGame(),
        onPlace: () => undefined,
      });
    throwsLike(
      () =>
        make([
          entryOf("one", ["headquarters"], log),
          entryOf("two", ["headquarters", "run"], log),
        ]),
      /two screen entries hold the kind headquarters/,
    );
    throwsLike(
      () => make([entryOf("one", ["programs"], log)]),
      /no screen entry holds the kind headquarters/,
    );
    // A table that leaves out the screens of Postać, Przejście and Mapy is refused when it is built,
    // not when the player first opens one of them.
    throwsLike(
      () => make(table(log).slice(0, 2)),
      /no screen entry holds the kind character/,
    );
    assert.equal(
      log.some((line) => line.startsWith("address")),
      false,
      "nothing was written before the refusal",
    );
  });
});

// decision: D-408 "No function the game view shares between its screens names the new screen"
// Catches elements placed in another order than the table's, which is the document's order, and
// a hidden flag left on the screen that shows.
test("the `always` instances' elements stand in table order and all but the shown one are hidden", async () => {
  await onRegistry(async ({ registry, element }) => {
    assert.deepEqual(names(element), ["hq", "programs", "run"]);
    registry.start();
    assert.deepEqual(hiddenNames(element), ["programs", "run"]);
    registry.show(PROGRAM_1, "go");
    assert.deepEqual(hiddenNames(element), ["hq", "run"]);
    registry.show(RUN, "go");
    assert.deepEqual(hiddenNames(element), ["hq", "programs"]);
    registry.show(MAPS, "go");
    assert.deepEqual(
      hiddenNames(element),
      ["hq", "programs", "run"],
      "a screen built while shown covers none of them",
    );
  });
});

// decision: D-408 "No function the game view shares between its screens names the new screen"
// Catches a screen of Postać or Mapy built before it is needed, built twice for one screen, or left
// behind when the player leaves it.
test("a `while-shown` entry is built at the entering, kept for the same key and taken down at the leaving", async () => {
  await onRegistry(async ({ registry, element, log, entries }) => {
    registry.start();
    const [, , , character, maps] = entries;
    assert.equal(character.instances.length, 0, "not built before it is shown");
    registry.show(CHARACTER_1, "go");
    assert.equal(character.instances.length, 1);
    assert.deepEqual(names(element), ["hq", "programs", "run", "character"]);
    log.length = 0;
    registry.show(CHARACTER_1, "none");
    assert.equal(character.instances.length, 1, "the same key is kept");
    assert.ok(log.includes("character:placed character"), "and told of it");
    assert.equal(log.includes("character:dispose"), false);
    registry.show(CHARACTER_2, "go");
    assert.equal(character.instances.length, 2, "another key builds anew");
    assert.ok(log.includes("character:dispose"), "the first was taken down");
    assert.deepEqual(names(element), ["hq", "programs", "run", "character"]);
    registry.show(MAPS, "go");
    assert.deepEqual(names(element), ["hq", "programs", "run", "maps"]);
    registry.show(MAP, "go");
    assert.equal(
      maps.instances.length,
      1,
      "both addresses of Mapy are one key",
    );
    registry.show(HEADQUARTERS, "go");
    assert.deepEqual(names(element), ["hq", "programs", "run"]);
  });
});

// decision: D-408 "No function the game view shares between its screens names the new screen"
// Catches Postać built after Mapy where the player moves from one to the other, which would put
// both elements on the page at once for a moment.
test("moving between two `while-shown` screens takes the first down before the second is built", async () => {
  await onRegistry(async ({ registry, log }) => {
    registry.start();
    registry.show(CHARACTER_1, "go");
    log.length = 0;
    registry.show(MAPS, "go");
    assert.ok(
      log.indexOf("character:dispose") < log.indexOf("maps:build maps"),
    );
  });
});

// decision: D-408 "No function the game view shares between its screens names the new screen"
// Catches a commit of the typed text that does not come before the address changes, which would
// carry the text to the program the player moves to, and a commit for a move that changes nothing.
test("`commit` of every living instance comes before a change of address, and a show of the same screen commits none", async () => {
  await onRegistry(async ({ registry, log }) => {
    registry.start();
    log.length = 0;
    registry.show(PROGRAMS, "go");
    const commits = log.filter((line) => line.endsWith(":commit"));
    assert.deepEqual(commits, ["hq:commit", "programs:commit", "run:commit"]);
    assert.ok(log.indexOf("hq:commit") < log.indexOf("address go #/programy"));
    log.length = 0;
    registry.show(PROGRAMS, "none");
    assert.equal(
      log.some((line) => line.endsWith(":commit")),
      false,
    );
  });
});

// decision: D-408 "No function the game view shares between its screens names the new screen"
// Catches a leave that runs after the address and the current screen changed, where the entry
// could not tell which screen the player is leaving, and one made for a move inside an entry.
test("`leave` runs for a move to another entry, before the address changes and while the current screen is the old one", async () => {
  await onRegistry(
    async ({ registry, log }) => {
      registry.start();
      log.length = 0;
      registry.show(PROGRAM_2, "go");
      assert.ok(log.includes("run:leave on run"), "it left while on the run");
      assert.ok(
        log.indexOf("run:leave on run") <
          log.indexOf("address go #/programy/2"),
      );
      log.length = 0;
      registry.show(PROGRAM_1, "go");
      assert.equal(
        log.some((line) => line.includes(":leave")),
        false,
        "Programy to another program of Programy leaves nothing",
      );
    },
    { first: RUN, state: runningState() },
  );
});

/** A game state with a map run, which has a way back to it from another screen. */
function runningState() {
  return send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
    { mapId: "forest", characterId: 1 },
    0,
  ).state;
}

// decision: D-281 "An address names a screen in the fragment after `#`"
// Catches an address written for a show that asks for none, and one that goes by the wrong word.
test("the address gets the fragment with a new entry, in place of the current one or not at all", async () => {
  await onRegistry(async ({ registry, log }) => {
    registry.start();
    log.length = 0;
    registry.show(PROGRAMS, "go");
    registry.show(MAPS, "replace");
    registry.show(HEADQUARTERS, "none");
    assert.deepEqual(
      log.filter((line) => line.startsWith("address")),
      ["address go #/programy", "address replace #/mapy"],
    );
  });
});

// decision: D-408 "No function the game view shares between its screens names the new screen"
// Catches a draw on a reading that tells a hidden screen it is shown.
test("a reading is drawn on every living instance, `shown` true for the screen that shows alone", async () => {
  await onRegistry(async ({ registry, log }) => {
    registry.start();
    registry.show(CHARACTER_1, "go");
    log.length = 0;
    registry.drawReading();
    assert.deepEqual(
      log.filter((line) => line.includes(":reading")),
      [
        "hq:reading false",
        "programs:reading false",
        "run:reading false",
        "character:reading true",
      ],
    );
  });
});

// decision: D-408 "No function the game view shares between its screens names the new screen"
// Catches events that do not reach the instances, or reach them out of the table's order.
test("a result is drawn on every living instance in table order, with the events of the call", async () => {
  await onRegistry(async ({ registry, log }) => {
    registry.start();
    registry.show(MAPS, "go");
    log.length = 0;
    registry.drawResult([{ kind: "mapRunEnded" }, { kind: "mapRunEnded" }]);
    assert.deepEqual(
      log.filter((line) => line.includes(":result")),
      ["hq:result 2", "programs:result 2", "run:result 2", "maps:result 2"],
    );
  });
});

// decision: D-408 "No function the game view shares between its screens names the new screen"
// decision: D-281 "An address names a screen in the fragment after `#`"
// Catches the start that shows the first screen before the instances have drawn once, and a first
// screen that is not written into the address in place of the entry the page opened at.
test("start draws the instances with no events, then shows the first screen with its address replaced", async () => {
  await onRegistry(async ({ registry, log, places }) => {
    registry.start();
    const firstResult = log.findIndex((line) => line.includes(":result"));
    const replaced = log.indexOf("address replace #/");
    assert.ok(firstResult !== -1 && replaced !== -1, "both happened");
    assert.ok(firstResult < replaced);
    assert.ok(
      log.includes("hq:result 0") &&
        log.includes("programs:result 0") &&
        log.includes("run:result 0"),
    );
    assert.equal(places.length, 1, "the page was told once");
  });
});

// decision: D-280 "The menu bar holds at its left the game's name, which stands alone on the waiting screens (D-262), and over the game the items Siedziba, Mapy and Programy, with no icons, and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta {m}”, which leads to the screen of that map run, its minute being the map run's game minute as the clock in the header of that screen writes it"
// Catches a page told of the same place twice, one that is never told of a way back to the map run,
// and a page told after the game was taken down.
test("the page is told its place once for each change, with the way back to a map run, and never after dispose", async () => {
  await onRegistry(
    async ({ registry, places }) => {
      registry.start();
      assert.equal(places.length, 1);
      assert.equal(places[0].screen.kind, "run");
      assert.equal(places[0].returnEntry, null, "on the run screen itself");
      registry.show(HEADQUARTERS, "go");
      assert.equal(places.length, 2);
      assert.notEqual(places[1].returnEntry, null, "the way back stands");
      registry.show(HEADQUARTERS, "none");
      registry.drawResult([]);
      assert.equal(places.length, 2, "the same place is told once");
      registry.show(MAPS, "go");
      assert.equal(places.length, 3);
      registry.dispose();
      registry.show(HEADQUARTERS, "none");
      registry.drawResult([]);
      assert.equal(places.length, 3, "nothing is told after dispose");
    },
    { first: RUN, state: runningState() },
  );
});

// decision: D-408 "No function the game view shares between its screens names the new screen"
// Catches a focus pulled from a field the player is typing in, or left on a hidden screen.
test("focusIfLost moves the focus only from the body or from a hidden element of the game", async () => {
  await onRegistry(async ({ registry, element, root }) => {
    registry.start();
    const outside = page().createElement("button");
    root.append(outside);
    const [headquarters, programs] = element.children;
    outside.focus();
    registry.focusIfLost();
    assert.equal(page().activeElement, outside, "a control outside the game");
    page().activeElement.blur();
    registry.focusIfLost();
    assert.equal(page().activeElement, headquarters, "from the body");
    programs.hidden = false;
    programs.focus();
    registry.focusIfLost();
    assert.equal(
      page().activeElement,
      headquarters,
      "from an element of the game that is not the shown one",
    );
    headquarters.focus();
    registry.focusIfLost();
    assert.equal(page().activeElement, headquarters, "kept where it is");
    outside.focus();
    registry.focusShown();
    assert.equal(page().activeElement, headquarters, "focusShown is plain");
  });
});

// decision: D-408 "No function the game view shares between its screens names the new screen"
// Catches an instance left alive after the game is taken down.
test("dispose takes every living instance down", async () => {
  await onRegistry(async ({ registry, log }) => {
    registry.start();
    registry.show(MAPS, "go");
    log.length = 0;
    registry.dispose();
    assert.deepEqual(log.filter((line) => line.endsWith(":dispose")).sort(), [
      "hq:dispose",
      "maps:dispose",
      "programs:dispose",
      "run:dispose",
    ]);
  });
});
