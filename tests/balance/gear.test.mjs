import assert from "node:assert/strict";
import { test } from "node:test";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import {
  buildGear,
  buildSkills,
  makeState,
  runOnce,
  seedRange,
  startOf,
  sweep,
} from "../../balance/engine.mjs";
import { parseArgs, runCommand } from "../../balance/cli.mjs";
import {
  forestDeepBest,
  forestLoopWithStock,
} from "../sim/reference-programs.mjs";

// The gear of the measured character is a parameter of the starting state of a measurement, as its
// skills are: the engine puts it on the created character, a map run starts with it, and the flag
// `--gear` of the commands takes pairs `slot=item`, each refused by the usage error where the slot is
// unknown, the item is unknown or the item does not fit the slot. Where no gear is given the new
// character's gear is empty.

const EMPTY_SLOTS = [
  "mainHand",
  "secondHand",
  "head",
  "torso",
  "legs",
  "pocket1",
  "pocket2",
  "pocket3",
];

test("a character made with no gear given holds an empty gear in every slot", () => {
  const [character] = makeState({}).team.characters;
  assert.deepEqual(
    character.gear,
    Object.fromEntries(EMPTY_SLOTS.map((slot) => [slot, null])),
  );
});

test("the gear given is put on the created character and the other slots stay empty", () => {
  const state = makeState({ gear: buildGear({ mainHand: "stick" }) });
  const [character] = state.team.characters;
  assert.equal(character.gear.mainHand, "stick");
  for (const slot of EMPTY_SLOTS.filter((each) => each !== "mainHand"))
    assert.equal(character.gear[slot], null, slot);
});

test("a map run starts with the gear of the character it is started for", () => {
  const state = makeState({ gear: buildGear({ mainHand: "stick" }) });
  const { run } = startOf(state, "forest", 1, buildSkills());
  assert.equal(run.character.gear.mainHand, "stick");
  assert.equal(run.character.gear.head, null);
});

test("buildGear refuses a slot the data lacks, an item the data lacks and an item that does not fit its slot, each by name", () => {
  assert.throws(() => buildGear({ bogusSlot: "stick" }), /bogusSlot/);
  assert.throws(() => buildGear({ mainHand: "bogusItem" }), /bogusItem/);
  assert.throws(() => buildGear({ head: "stick" }), /stick/);
  assert.throws(() => buildGear({ mainHand: "bandage" }), /bandage/);
  assert.deepEqual(buildGear({ mainHand: "stick", pocket1: "bandage" }), {
    mainHand: "stick",
    pocket1: "bandage",
  });
});

test("the flag --gear reads slot=item pairs, and a pair the data refuses is refused with the usage error", () => {
  const sweepFlags = ["sweep", "--map", "forest", "--program", "forestBest"];
  assert.deepEqual(
    parseArgs([...sweepFlags, "--gear", "mainHand=stick"]).options.gear,
    { mainHand: "stick" },
  );
  assert.deepEqual(
    parseArgs([...sweepFlags, "--gear", "mainHand=stick,pocket1=bandage"])
      .options.gear,
    { mainHand: "stick", pocket1: "bandage" },
  );
  assert.deepEqual(parseArgs(sweepFlags).options.gear, {}, "no flag, no gear");
  const refused = [
    [[...sweepFlags, "--gear", "mainHand"], /--gear/],
    [[...sweepFlags, "--gear", "bogusSlot=stick"], /bogusSlot/],
    [[...sweepFlags, "--gear", "mainHand=bogusItem"], /bogusItem/],
    [[...sweepFlags, "--gear", "head=stick"], /stick/],
    [[...sweepFlags, "--gear", "mainHand=stick,mainHand=stick"], /--gear/],
  ];
  for (const [argv, pattern] of refused)
    assert.throws(() => parseArgs(argv), pattern, argv.join(" "));
});

test("the gear the sweep command is given reaches the engine: its summary is the engine's for the same gear", () => {
  const seeds = seedRange(1, 12);
  const gear = buildGear({ mainHand: "stick" });
  const direct = JSON.parse(
    JSON.stringify(
      sweep({ mapId: "forestDeep", program: forestDeepBest, seeds, gear })
        .summary,
    ),
  );
  const bare = JSON.parse(
    JSON.stringify(
      sweep({ mapId: "forestDeep", program: forestDeepBest, seeds }).summary,
    ),
  );
  assert.notDeepEqual(
    direct,
    bare,
    "precondition: the stick in the main hand changes this program's results",
  );
  const { options } = parseArgs([
    "sweep",
    "--map",
    "forestDeep",
    "--program",
    "forestDeepBest",
    "--seeds",
    "1-12",
    "--gear",
    "mainHand=stick",
  ]);
  const printed = JSON.parse(runCommand("sweep", options).printed);
  assert.deepEqual(printed.summary, direct);
});

test("a trace given the gear ends in the outcome the engine gives for the same seed and gear", () => {
  const gear = buildGear({ mainHand: "stick" });
  const engine = runOnce({
    mapId: "forest",
    program: forestLoopWithStock,
    seed: 3,
    chest: { stick: 8 },
    gear,
  });
  const { options } = parseArgs([
    "trace",
    "--map",
    "forest",
    "--program",
    "forestLoopWithStock",
    "--seeds",
    "3",
    "--chest",
    "stick=8",
    "--gear",
    "mainHand=stick",
  ]);
  const lines = runCommand("trace", options).printed.trimEnd().split("\n");
  assert.equal(
    lines.at(-1),
    `end: ${engine.outcome} at minute ${engine.minute}${engine.cause === null ? "" : `, cause ${engine.cause}`}`,
  );
});

test("the check of the map and the progression take the flag, and a stick of the data fits the main hand", () => {
  assert.equal(ITEMS.stick.fits, "mainHand");
  for (const command of ["check-map", "progression"]) {
    const { options } = parseArgs([
      command,
      ...(command === "check-map"
        ? ["--overlay", "balance/overlays/wasteland.json"]
        : []),
      "--gear",
      "mainHand=stick",
    ]);
    assert.deepEqual(options.gear, { mainHand: "stick" }, command);
  }
});
