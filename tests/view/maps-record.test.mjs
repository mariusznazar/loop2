// The record of the most health the creature of a map lost in one fight (D-440, D-441), shown on the
// screen Mapy: in the row of the map in the catalog and on its card, in „Czyha”, where the map's data
// name a creature for it. The screen is built by the entry of Mapy on jsdom through
// tests/view/page-document.mjs (D-264), on a real judging cache over a storage backed by a map and the
// real simulation. The numbers in the cases that offer a record to the cache are the foundation's own
// examples (24 of the bear's 120, then 10 and 30); the cases that judge on the screen derive their
// expected number from the judging of the simulation itself, asked for apart from the screen, since
// no reference program takes exactly 24 of the bear's health. Real focus and rendering are the
// browser check's (D-88).
import { assert, inAct, press, withPage } from "./page-document.mjs";
import { gameStylesheetText } from "./game-stylesheets.mjs";
import { test } from "node:test";
import { CREATURES } from "../../dist/browser/sim/data/creatures.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { createCharacter } from "../../dist/browser/sim/game.js";
import { judgeOnSeeds } from "../../dist/browser/sim/judging.js";
import {
  createProgram,
  editProgram,
  pickProgram,
} from "../../dist/browser/sim/programs.js";
import { openJudgingCache } from "../../dist/browser/view/judging-cache.js";
import {
  attackerLines,
  recordLine,
} from "../../dist/browser/view/map-lines.js";
import { createMapsEntry } from "../../dist/browser/view/maps-entry.js";
import { REFERENCE_PROGRAMS } from "../sim/reference-programs.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const NOW = 1_800_000_000_000;
const ACCOUNT = "acct-1";
const MADE = 1_000;
const LAIR = "forestLair";
const BEAR = CREATURES.bear;
const OPEN_LAIR = ["forestEdge", "forest", "forestDeep", "forestPack"];
const LAIR_FACTS = "10 h · 1 do pokonania · ⊘ wnosisz 0 · bez ognia 33 min";

const all = (root, selector) => [...root.querySelectorAll(selector)];
const text = (root, selector) => root.querySelector(selector)?.textContent;

/** A storage backed by a map, as the browser's `Storage` answers. */
function mapStorage() {
  const held = new Map();
  return {
    held,
    get length() {
      return held.size;
    },
    key: (index) => [...held.keys()][index] ?? null,
    getItem: (key) => (held.has(key) ? held.get(key) : null),
    setItem: (key, value) => void held.set(key, String(value)),
    removeItem: (key) => void held.delete(key),
  };
}

/** The judging cache of the account's game made at `MADE`, opened on `storage` with `state` loaded. */
const cacheOn = (storage, state) =>
  openJudgingCache({
    accountId: ACCOUNT,
    state: { ...state, madeAtMs: MADE },
    afterRefusedSave: false,
    storage,
  });

/**
 * A stand-in of the state store whose game state the case can replace with `set`: `act` runs its body
 * with a `take` that keeps what is taken, `halted` answers as the store does after `halt()` (D-323).
 */
function standInStore(initial, { halted = false } = {}) {
  let state = initial;
  const acts = [];
  return {
    acts,
    set: (next) => {
      state = next;
    },
    get: () => state,
    moment: () => NOW,
    halted: () => halted,
    act(body) {
      acts.push("act");
      body((result) => {
        state = result.state;
      });
    },
    send: () => acts.push("send"),
    startLoop: () => acts.push("startLoop"),
  };
}

/** Ala with the program `program` on the list, the four maps before the lair solved, the lair open. */
function gameWith(program) {
  let state = createCharacter(newKnowingGame(), "Ala").state;
  state = editProgram(state, 1, program).state;
  return { ...state, solvedMaps: OPEN_LAIR };
}

/** Builds the entry of Mapy on the card of the lair in the page and gives the instance. */
async function enterLair(page, store, cache) {
  let instance = null;
  await inAct(() => {
    instance = createMapsEntry({ store, judgingCache: cache }).build(
      {
        current: () => ({ kind: "map", mapId: LAIR }),
        show() {},
        focusShown() {},
        focusIfLost() {},
      },
      { kind: "map", mapId: LAIR },
    );
    page.root.append(instance.element);
  });
  return instance;
}

const rowOf = (root, name) =>
  all(root, ".maps-list-item").find(
    (row) => text(row, ".maps-catalog-name") === name,
  );
const lairRow = (root) => rowOf(root, MAPS[LAIR].name);
const factsOf = (row) => text(row, ".maps-catalog-facts");
const part = (root, name) =>
  all(root, ".maps-card-part").find(
    (candidate) => text(candidate, ".maps-card-part-name") === name,
  );
const cardRecord = (root) =>
  all(part(root, "Czyha"), ".maps-card-attacker-record").map(
    (line) => line.textContent,
  );
const judgeButton = (root) => root.querySelector(".maps-who-judge button");

/** Presses the judge button and waits until the store has been asked to act and the screen has drawn. */
async function judge(page, store) {
  const before = store.acts.length;
  await press(judgeButton(page.root));
  await inAct(async () => {
    for (let round = 0; round < 800 && store.acts.length === before; round += 1)
      await new Promise((resolve) => setTimeout(resolve, 5));
  });
  assert.ok(store.acts.length > before, "the judging was asked for");
}

// Catches a record that stands in the row alone or on the card alone, in a role other than `text`, or
// outside the facts of the row.
test("a record of 24 of the bear's 120 stands in the row of Las — matecznik among its facts and on its card in „Czyha”, in the role text", async () => {
  // decision: D-325 "A map whose data name a creature for the record shows the number of D-440 in its row."
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  await withPage(async (page) => {
    const style = page.document.createElement("style");
    style.textContent = gameStylesheetText();
    page.document.head.append(style);
    const state = gameWith(REFERENCE_PROGRAMS.emptyProgram);
    const cache = cacheOn(mapStorage(), state);
    cache.offerRecord(LAIR, BEAR, 24);
    await enterLair(page, standInStore(state), cache);

    const row = lairRow(page.root);
    assert.equal(
      factsOf(row),
      `${LAIR_FACTS} · niedźwiedź: 24 ze 120`,
      "among the facts of the row, after the others",
    );
    const record = row.querySelector(".maps-catalog-record");
    assert.equal(record.textContent, "niedźwiedź: 24 ze 120");
    const colour = (element) => page.window.getComputedStyle(element).color;
    assert.equal(colour(record), "var(--text)", "the role text");
    assert.equal(
      colour(row.querySelector(".maps-catalog-fact")),
      "var(--text-secondary)",
      "the facts beside it keep their own role",
    );
    assert.deepEqual(cardRecord(page.root), ["niedźwiedź: 24 ze 120"]);
    const bear = part(page.root, "Czyha").querySelector(".maps-card-attacker");
    assert.equal(
      text(bear, ".maps-card-attacker-head"),
      "niedźwiedź · 120 zdrowia · cios 20",
      "the number stands at the bear's lines",
    );
    assert.ok(
      bear.querySelector(".maps-card-attacker-record") !== null,
      "inside the bear's own item",
    );
    assert.equal(
      colour(bear.querySelector(".maps-card-attacker-record")),
      colour(bear.querySelector(".maps-card-attacker-odds")),
      "the card's lines stand in the card's text role, as its other lines",
    );
  });
});

// Catches a number that falls with a lower judging, one that ignores a higher judging, and a row and a
// card that read the record at different moments.
test("a record offered lower leaves the number, one offered higher raises it, in the row and on the card alike", async () => {
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  await withPage(async (page) => {
    const state = gameWith(REFERENCE_PROGRAMS.emptyProgram);
    const cache = cacheOn(mapStorage(), state);
    const store = standInStore(state);
    cache.offerRecord(LAIR, BEAR, 24);
    const instance = await enterLair(page, store, cache);
    const shows = (number) => {
      const line = `niedźwiedź: ${number} ze 120`;
      assert.ok(factsOf(lairRow(page.root)).endsWith(line), `row ${line}`);
      assert.deepEqual(cardRecord(page.root), [line], `card ${line}`);
    };
    shows(24);
    for (const [offered, expected] of [
      [10, 24],
      [24, 24],
      [30, 30],
      [12, 30],
    ]) {
      cache.offerRecord(LAIR, BEAR, offered);
      await inAct(() => instance.drawResult());
      shows(expected);
    }
  });
});

// Catches a number or a „0” standing before the first judging on the map, and a first judging that took
// nothing leaving no number.
test("nothing stands in the row or on the card before the first judging on the map, and a first judging that took nothing stands as 0", async () => {
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  // decision: D-327 "It departs from the card of the predecessor game in five things only"
  await withPage(async (page) => {
    const state = gameWith(REFERENCE_PROGRAMS.emptyProgram);
    const cache = cacheOn(mapStorage(), state);
    const instance = await enterLair(page, standInStore(state), cache);
    assert.equal(factsOf(lairRow(page.root)), LAIR_FACTS);
    assert.equal(page.root.querySelector(".maps-catalog-record"), null);
    assert.deepEqual(cardRecord(page.root), []);
    assert.ok(
      !page.root.textContent.includes("ze 120"),
      "no number and no 0 anywhere on the screen",
    );
    cache.offerRecord(LAIR, BEAR, 0);
    await inAct(() => instance.drawResult());
    assert.equal(
      factsOf(lairRow(page.root)),
      `${LAIR_FACTS} · niedźwiedź: 0 ze 120`,
    );
    assert.deepEqual(cardRecord(page.root), ["niedźwiedź: 0 ze 120"]);
  });
});

// Catches a view that names the creature or the map itself: a record the cache holds for another map,
// or for one whose data name no creature for it, must show nowhere.
test("a record stands only at the map whose data name a creature for it: the other maps' rows and cards show none, whatever the cache holds", async () => {
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  // decision: D-325 "A map whose data name a creature for the record shows the number of D-440 in its row."
  await withPage(async (page) => {
    const state = gameWith(REFERENCE_PROGRAMS.emptyProgram);
    const cache = cacheOn(mapStorage(), state);
    const wolf = CREATURES.wolf;
    for (const mapId of Object.keys(MAPS).filter((id) => id !== LAIR)) {
      cache.offerRecord(mapId, wolf, 9);
      cache.offerRecord(mapId, BEAR, 9);
    }
    await enterLair(page, standInStore(state), cache);
    assert.equal(page.root.querySelectorAll(".maps-catalog-record").length, 0);
    for (const row of all(page.root, ".maps-list-item")) {
      assert.ok(
        !factsOf(row).includes("niedźwiedź"),
        `${text(row, ".maps-catalog-name")} shows no record`,
      );
    }
    // The card of the lair carries it only once the lair itself has one.
    assert.deepEqual(cardRecord(page.root), []);
  });
});

// Catches a record that is shown after the numbers of its creature changed.
test("a record made at other numbers of the bear shows nothing in the row or on the card", async () => {
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  await withPage(async (page) => {
    const state = gameWith(REFERENCE_PROGRAMS.emptyProgram);
    const cache = cacheOn(mapStorage(), state);
    cache.offerRecord(
      LAIR,
      { health: BEAR.health, strikeDamage: BEAR.strikeDamage + 1 },
      24,
    );
    cache.offerRecord(
      LAIR,
      { health: BEAR.health + 10, strikeDamage: BEAR.strikeDamage },
      24,
    );
    await enterLair(page, standInStore(state), cache);
    assert.equal(factsOf(lairRow(page.root)), LAIR_FACTS);
    assert.deepEqual(cardRecord(page.root), []);
  });
});

// Catches the entry that does not give the judging's damage to the record, one that gives the last seed
// instead of the largest, one that gives it before the halt is checked, and a record that falls with a
// worse judging.
test("a judging on the screen offers the largest damage of its twelve seeds to the record; a judging that took less leaves it, one that took more raises it", async () => {
  // decision: D-440 "On a map whose data name a creature for the record, the game remembers in the browser that made it the record of the most health of that creature that any judging took in one fight, a fight the character won giving the creature's whole health, a fight in which the character died counting as any other and a seed with no fight giving 0, and the largest of the twelve seeds of a judging counting."
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  await withPage(async (page) => {
    const small = REFERENCE_PROGRAMS.forestSettledPatrol;
    const large = REFERENCE_PROGRAMS.forestDeepBest;
    const base = gameWith(small);
    // A second program on the list, and each program's judging asked for apart from the screen.
    const second = createProgram(base).state;
    const largeProgramId = second.programs.at(-1).id;
    const withBoth = editProgram(second, largeProgramId, large).state;
    const smallProgramId = withBoth.programs[0].id;
    const damageOf = (programId) =>
      Math.max(
        ...judgeOnSeeds(withBoth, {
          mapId: LAIR,
          characterId: 1,
          programId,
        }).creatureDamage,
      );
    const smallDamage = damageOf(smallProgramId);
    const largeDamage = damageOf(largeProgramId);
    assert.ok(
      0 < smallDamage && smallDamage < largeDamage,
      "precondition: the two programs take different, non-zero damage from the bear",
    );

    const storage = mapStorage();
    const cache = cacheOn(storage, withBoth);
    const store = standInStore(pickProgram(withBoth, 1, smallProgramId).state);
    const instance = await enterLair(page, store, cache);
    assert.equal(cache.readRecord(LAIR, BEAR), null, "no judging yet");

    await judge(page, store);
    assert.equal(cache.readRecord(LAIR, BEAR), smallDamage);
    assert.equal(
      factsOf(lairRow(page.root)),
      `${LAIR_FACTS} · niedźwiedź: ${smallDamage} ze 120`,
      "the screen's one draw after the act shows the record",
    );
    assert.deepEqual(cardRecord(page.root), [
      `niedźwiedź: ${smallDamage} ze 120`,
    ]);

    store.set(pickProgram(store.get(), 1, largeProgramId).state);
    await inAct(() => instance.drawResult());
    await judge(page, store);
    assert.equal(
      cache.readRecord(LAIR, BEAR),
      largeDamage,
      "a judging that took more raises it",
    );
    assert.ok(
      factsOf(lairRow(page.root)).endsWith(`niedźwiedź: ${largeDamage} ze 120`),
    );

    store.set(pickProgram(store.get(), 1, smallProgramId).state);
    await inAct(() => instance.drawResult());
    await judge(page, store);
    assert.equal(
      cache.readRecord(LAIR, BEAR),
      largeDamage,
      "a judging that took less leaves it",
    );
    assert.deepEqual(cardRecord(page.root), [
      `niedźwiedź: ${largeDamage} ze 120`,
    ]);
  });
});

// Catches a record bound to the program or to the character: a change of the program, a deletion of the
// program judged and the death of the character each leave the number as it was.
test("a change of the program and the loss of the character leave the number as it was", async () => {
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  await withPage(async (page) => {
    const state = gameWith(REFERENCE_PROGRAMS.forestDeepBest);
    const cache = cacheOn(mapStorage(), state);
    const store = standInStore(state);
    const instance = await enterLair(page, store, cache);
    await judge(page, store);
    const damage = cache.readRecord(LAIR, BEAR);
    assert.ok(
      damage > 0,
      "precondition: the judging took health from the bear",
    );
    const line = `niedźwiedź: ${damage} ze 120`;
    assert.ok(
      text(page.root, ".maps-who-mark") !== undefined,
      "precondition: the judging's mark stands beside the list",
    );

    // The program is changed: the judging's mark goes, the record stays.
    const edited = editProgram(
      store.get(),
      1,
      REFERENCE_PROGRAMS.forestBest,
    ).state;
    store.set(edited);
    await inAct(() => instance.drawResult());
    assert.equal(
      text(page.root, ".maps-who-mark"),
      undefined,
      "the mark of the old program is gone",
    );
    assert.ok(factsOf(lairRow(page.root)).endsWith(line));
    assert.deepEqual(cardRecord(page.root), [line]);

    // The character is gone, as after a death that takes its practice: a new one stands in its place.
    const gone = { ...edited, team: { ...edited.team, characters: [] } };
    store.set(createCharacter(gone, "Ola").state);
    await inAct(() => instance.drawResult());
    assert.ok(factsOf(lairRow(page.root)).endsWith(line));
    assert.deepEqual(cardRecord(page.root), [line]);
  });
});

// Catches an entry that offers a record after the store has halted (D-323), where it must not remember
// the judging either.
test("a judging after the store has halted leaves no record", async () => {
  await withPage(async (page) => {
    const state = gameWith(REFERENCE_PROGRAMS.forestDeepBest);
    const storage = mapStorage();
    const cache = cacheOn(storage, state);
    const store = standInStore(state, { halted: true });
    await enterLair(page, store, cache);
    await judge(page, store);
    assert.equal(cache.readRecord(LAIR, BEAR), null);
    assert.equal(storage.held.size, 0, "nothing stored: no judging, no record");
  });
});

// Catches a record that does not come back with a screen built anew on the same storage (a reload).
test("a screen built anew on the same storage shows the record again, and a storage of another game shows none", async () => {
  // decision: D-441 "Beside the judgings the browser keeps the record of D-440 in its lasting storage, one value under a key of its own with its own version for each account, game and map, holding the number and the creature's numbers it was made at."
  await withPage(async (page) => {
    const state = gameWith(REFERENCE_PROGRAMS.emptyProgram);
    const storage = mapStorage();
    cacheOn(storage, state).offerRecord(LAIR, BEAR, 24);
    const first = await enterLair(
      page,
      standInStore(state),
      cacheOn(storage, state),
    );
    assert.ok(factsOf(lairRow(page.root)).endsWith("niedźwiedź: 24 ze 120"));
    await inAct(() => first.dispose());
    const other = openJudgingCache({
      accountId: ACCOUNT,
      state: { ...state, madeAtMs: MADE + 1 },
      afterRefusedSave: false,
      storage,
    });
    await enterLair(page, standInStore(state), other);
    assert.equal(factsOf(lairRow(page.root)), LAIR_FACTS);
  });
});

// Catches a line that names the creature or its health from the view's own text instead of from the
// data, one drawn where the map names no creature, one drawn with no record, and a record line on the
// attacker the map does not name for it.
test("the line of the record takes the creature's name and health from the data, and stands at the named attacker alone", () => {
  // decision: D-327 "It departs from the card of the predecessor game in five things only"
  const { forestLair, forestDeep } = MAPS;
  assert.equal(recordLine(forestLair, 24), "niedźwiedź: 24 ze 120");
  assert.equal(recordLine(forestLair, 0), "niedźwiedź: 0 ze 120");
  assert.equal(recordLine(forestLair, null), null, "no record, no line");
  assert.equal(
    recordLine(forestDeep, 24),
    null,
    "a map that names no creature",
  );
  assert.equal(
    recordLine({ ...forestLair, recordCreature: "wolf" }, 7),
    "wilk: 7 ze 24",
  );
  const [bear] = attackerLines(forestLair, 24);
  assert.equal(bear.record, "niedźwiedź: 24 ze 120");
  assert.equal(attackerLines(forestLair)[0].record, undefined);
  assert.equal(
    attackerLines(forestDeep, 24)[0].record,
    undefined,
    "the wolf of a map that names no creature for the record has none",
  );
  const other = {
    ...forestLair,
    attackers: [
      { id: "wolf", chancePerMinute: 0.01, cooldownMinutes: 180 },
      ...forestLair.attackers,
    ],
  };
  assert.deepEqual(
    attackerLines(other, 24).map((line) => line.record),
    [undefined, "niedźwiedź: 24 ze 120"],
    "only the attacker the map names for the record carries it",
  );
});
