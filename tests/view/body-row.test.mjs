// The row of the body and the backpack under the scene: the temperature in tenths with a decimal
// comma (D-57), cut down, never rounded; a value below its threshold in alarm; the backpack's pieces
// of its cap (D-64). The row ends with nature energy, cut down to a whole number like satiety and
// health, never in alarm (D-178). Under temperature and satiety stands a note of the minutes the need
// lasts (D-337); health and nature energy stand with none.
import assert from "node:assert/strict";
import { test } from "node:test";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { createCharacter, newGame, send } from "../../dist/browser/sim/game.js";
import {
  backpackText,
  bodyExplanation,
  bodyRowCells,
  satietyNoteText,
  temperatureNoteText,
  temperatureZones,
} from "../../dist/browser/view/body-row.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

const LAS = MAPS.forest;

/** A map run of „Ala” on Las at game minute zero, her body and nature energy and fields replaced. */
function runOf(body, natureEnergy = 100, fields = {}) {
  const state = send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
    { mapId: "forest", characterId: 1 },
    1760000000000,
  ).state;
  return { ...state.run, body, natureEnergy, ...fields };
}

/** The character of a map run with the given backpack and carrying capacity. */
function character(backpack, carryingCapacity = 15) {
  return {
    id: 1,
    at: { q: 0, r: 0 },
    traits: { carryingCapacity },
    backpack: { stick: 0, berry: 0, moss: 0, fiber: 0, ...backpack },
  };
}

test("an empty backpack reads „Plecak 0/15”", () => {
  assert.equal(backpackText(character({})), "Plecak 0/15");
});

test("a backpack holding items reads its count, its cap and each held item in the data's order", () => {
  // decision: D-64 "The backpack's cap counts the pieces of all items together"
  assert.equal(
    backpackText(character({ berry: 2, stick: 5 })),
    "Plecak 7/15: patyk 5, jagoda 2",
  );
  assert.equal(
    backpackText(character({ fiber: 1, berry: 3 })),
    "Plecak 4/15: jagoda 3, włókno 1",
  );
});

test("the cap is the character's carrying capacity", () => {
  // decision: D-64 "The backpack's cap counts the pieces of all items together, and its height is the character's carrying capacity"
  assert.equal(backpackText(character({ moss: 2 }, 20)), "Plecak 2/20: mech 2");
});

test("the words of the note under temperature, one for each state", () => {
  // decision: D-337 "The note under temperature reads the first of these that holds"
  // D-337: „marznie” in red; otherwise „przy ogniu”, „nie stygnie” or „bez ognia {n} min”.
  assert.deepEqual(temperatureNoteText({ kind: "chilled" }), {
    text: "marznie",
    danger: true,
  });
  assert.deepEqual(temperatureNoteText({ kind: "fire" }), {
    text: "przy ogniu",
    danger: false,
  });
  assert.deepEqual(temperatureNoteText({ kind: "not-cooling" }), {
    text: "nie stygnie",
    danger: false,
  });
  assert.deepEqual(temperatureNoteText({ kind: "minutes", minutes: 79 }), {
    text: "bez ognia 79 min",
    danger: false,
  });
  assert.deepEqual(temperatureNoteText({ kind: "minutes", minutes: 0 }), {
    text: "bez ognia 0 min",
    danger: false,
  });
});

test("the words of the note under satiety, one for each state", () => {
  // decision: D-337 "The note under temperature reads the first of these that holds"
  // D-337: „głoduje” in red; otherwise „bez jedzenia {n} min”.
  assert.deepEqual(satietyNoteText({ kind: "starving" }), {
    text: "głoduje",
    danger: true,
  });
  assert.deepEqual(satietyNoteText({ kind: "minutes", minutes: 86 }), {
    text: "bez jedzenia 86 min",
    danger: false,
  });
  assert.deepEqual(satietyNoteText({ kind: "minutes", minutes: 0 }), {
    text: "bez jedzenia 0 min",
    danger: false,
  });
});

test("each note at its threshold: 35,0 °C and 30 % still read minutes, 34,99 °C and 29,99 % read chilled and starving", () => {
  // decision: D-337 "The note under temperature reads the first of these that holds"
  // decision: D-337 "{n} is the whole game minutes, rounded down, left until the character starts to be chilled or to starve"
  // Thresholds of the body: chilled below 35.0 °C, starving below 30 (D-337, D-39).
  const notesAt = (temperature, satiety) => {
    const [t, s] = bodyRowCells(
      runOf({ temperature, satiety, health: 50 }),
      LAS,
    );
    return [t.note, s.note];
  };
  assert.deepEqual(notesAt(35, 30), [
    { text: "bez ognia 0 min", danger: false },
    { text: "bez jedzenia 0 min", danger: false },
  ]);
  assert.deepEqual(notesAt(34.99, 29.99), [
    { text: "marznie", danger: true },
    { text: "głoduje", danger: true },
  ]);
});

test("by a fire the note under temperature reads „przy ogniu” and the note under satiety keeps its minutes", () => {
  // decision: D-337 "The note under temperature reads the first of these that holds"
  const run = runOf({ temperature: 36.5, satiety: 82, health: 100 });
  const at = run.character.at;
  const cells = bodyRowCells(
    { ...run, campfires: [{ at, minutesLeft: 40 }] },
    LAS,
  );
  assert.deepEqual(cells[0].note, { text: "przy ogniu", danger: false });
  assert.deepEqual(cells[1].note, {
    text: "bez jedzenia 86 min",
    danger: false,
  });
});

test("a chilled body by the fire still reads „marznie” in danger", () => {
  // decision: D-337 "The note under temperature reads the first of these that holds"
  const run = runOf({ temperature: 34.5, satiety: 82, health: 100 });
  const at = run.character.at;
  const cells = bodyRowCells(
    { ...run, campfires: [{ at, minutesLeft: 40 }] },
    LAS,
  );
  assert.deepEqual(cells[0].note, { text: "marznie", danger: true });
});

test("on a map that does not cool the body the note under temperature reads „nie stygnie”", () => {
  // decision: D-18 "The game's content — game maps, items, creatures, character skills and their numbers — stands in data files"
  // decision: D-58 "A character's body cools in each game minute outside combat by more, the further the game map's ambient temperature lies below the body's starting temperature"
  // decision: D-337 "The note under temperature reads the first of these that holds"
  const warm = { ...LAS, ambientTemperature: 37 };
  const cells = bodyRowCells(
    runOf({ temperature: 37, satiety: 82, health: 100 }),
    warm,
  );
  assert.deepEqual(cells[0].note, { text: "nie stygnie", danger: false });
});

test("health and nature energy stand with no note, at their lowest too", () => {
  // decision: D-337 "The body row holds each of its values in a cell of its own"
  const cells = bodyRowCells(
    runOf({ temperature: 34, satiety: 10, health: 1 }, 0),
    LAS,
  );
  assert.deepEqual(
    cells.map((cell) => cell.note !== null),
    [true, true, false, false],
  );
});

// The cells as they are drawn (D-337, D-178, D-450): name and number apart, the meter under them — a
// bar, or for temperature the scale with its marker —, the alarm, the note and the frame of the
// temperature cell, and the words of the explanations. Each case writes out the body it feeds.

/** The shares of the meters of the cells, at six decimal places, in the order of the cells. */
const shares = (cells) =>
  cells.map((cell) => Number(cell.meter.share.toFixed(6)));

/** Runs `check` with the game's data changed by `patch` and puts the data back, whatever `check` does. */
function withData(patch, check) {
  const kept = patch.map(([owner, key]) => [owner, key, owner[key]]);
  try {
    for (const [owner, key, value] of patch) owner[key] = value;
    return check();
  } finally {
    for (const [owner, key, value] of kept) owner[key] = value;
  }
}

test("a cell of the body row holds its name and its number apart, the meter, the alarm, the note and the frame, as D-337 gives for Las", () => {
  // decision: D-337 "Each of the four values — temperature, satiety, health and nature energy — stands in its cell as in loop: its name at the left and its number at the right on one line, a bar under them and its note under the bar"
  // decision: D-57 "A character's warmth is its body temperature in degrees Celsius, counted with tenths and written with a decimal comma"
  // 36,9 °C is 6.9 of the 11 degrees of the scale, 62.727273 %; the bars of 82, 100 and 90 stand at those percents.
  const cells = bodyRowCells(
    runOf({ temperature: 36.9, satiety: 82, health: 100 }, 90),
    LAS,
  );
  assert.deepEqual(
    cells.map((cell) => [cell.id, cell.name, cell.number, cell.alarm]),
    [
      ["temperature", "Temperatura", "36,9 °C", false],
      ["satiety", "Sytość", "82 %", false],
      ["health", "Zdrowie", "100", false],
      ["natureEnergy", "Energia natury", "90", false],
    ],
  );
  assert.deepEqual(
    cells.map((cell) => cell.meter.kind),
    ["scale", "bar", "bar", "bar"],
  );
  assert.deepEqual(shares(cells), [62.727273, 82, 100, 90]);
  assert.deepEqual(cells[0].meter.zone, "safe");
  assert.deepEqual(
    cells.map((cell) => cell.note),
    [
      { text: "bez ognia 79 min", danger: false },
      { text: "bez jedzenia 86 min", danger: false },
      null,
      null,
    ],
  );
  assert.deepEqual(
    cells.map((cell) => cell.frame),
    ["cooling", null, null, null],
  );
});

test("the numbers are cut down as they are today: tenths of a degree, whole satiety, health and energy", () => {
  // decision: D-57 "A character's warmth is its body temperature in degrees Celsius, counted with tenths and written with a decimal comma"
  // decision: D-178 "The body row ends with „Energia natury {n}”, the mage's nature energy cut down to a whole number"
  const cells = bodyRowCells(
    runOf({ temperature: 36.976, satiety: 82.999999, health: 99.95 }, 89.5),
    LAS,
  );
  assert.deepEqual(
    cells.map((cell) => cell.number),
    ["36,9 °C", "82 %", "99", "89"],
  );
  // A whole degree keeps its tenth: 37 reads „37,0 °C”, and 34.99, below the threshold, „34,9 °C”.
  for (const [temperature, written] of [
    [37, "37,0 °C"],
    [34.99, "34,9 °C"],
  ])
    assert.equal(
      bodyRowCells(runOf({ temperature, satiety: 100, health: 100 }), LAS)[0]
        .number,
      written,
    );
});

test("the bars of satiety, health and nature energy are empty at 0 and full at 100, and stand between in proportion", () => {
  // decision: D-337 "The bar of satiety is empty at 0 and full at 100, that of health full at the starting health and that of nature energy full at its cap"
  for (const [body, energy, expected] of [
    [{ temperature: 37, satiety: 0, health: 0 }, 0, [0, 0, 0]],
    [{ temperature: 37, satiety: 14, health: 37 }, 89.5, [14, 37, 89.5]],
    [{ temperature: 37, satiety: 100, health: 100 }, 100, [100, 100, 100]],
  ]) {
    assert.deepEqual(
      shares(bodyRowCells(runOf(body, energy), LAS)).slice(1),
      expected,
    );
  }
  // The bar is the exact share, not the cut-down number of the cell.
  assert.deepEqual(
    shares(
      bodyRowCells(
        runOf({ temperature: 37, satiety: 82.5, health: 50 }, 5),
        LAS,
      ),
    ).slice(1),
    [82.5, 50, 5],
  );
});

test("each bar reads its full length from the game's data: the starting satiety, the starting health and the cap of the energy", () => {
  // decision: D-337 "The bar of satiety is empty at 0 and full at 100, that of health full at the starting health and that of nature energy full at its cap, both from the game's data"
  // With the starting satiety 50, the starting health 200 and the cap 40, the values 25, 100 and 10 are half of each bar.
  withData(
    [
      [BALANCE.body, "startSatiety", 50],
      [BALANCE.body, "startHealth", 200],
      [BALANCE.natureEnergy, "max", 40],
    ],
    () => {
      const cells = bodyRowCells(
        runOf({ temperature: 37, satiety: 25, health: 100 }, 10),
        LAS,
      );
      assert.deepEqual(shares(cells).slice(1), [50, 50, 25]);
    },
  );
});

test("the marker of temperature stands on the scale from 30 to 41 °C, at its left end at 30 and below, at its right end at 41", () => {
  // decision: D-337 "Temperature stands on a linear scale from 30 °C at its left end to 41 °C at its right"
  // decision: D-337 "Temperature stands on a linear scale from 30 °C at its left end to 41 °C at its right, whose track is three zones — chill from 30 to 35 °C, safe from 35 to 39 °C, with 37.0 °C inside it, and overheating from 39 to 41 °C, drawn though the game knows no overheating — and on which a short upright marker the height of the bar stands at the temperature now, at the left end below 30 °C"
  // 35.5 is the middle of the scale, 5.5 of 11 degrees; 37 is 7 of 11, 63.636364 %.
  const at = (temperature) =>
    Number(
      bodyRowCells(
        runOf({ temperature, satiety: 100, health: 100 }),
        LAS,
      )[0].meter.share.toFixed(6),
    );
  assert.equal(at(30), 0);
  assert.equal(at(35.5), 50);
  assert.equal(at(37), 63.636364);
  assert.equal(at(41), 100);
  assert.equal(at(28.4), 0);
  assert.equal(at(18), 0);
});

test("the marker stands in the zone of chill below 35 °C, of safety from 35 to 39 and of overheating from 39 °C, 37,0 °C inside safety", () => {
  // decision: D-337 "Temperature stands on a linear scale from 30 °C at its left end to 41 °C at its right, whose track is three zones — chill from 30 to 35 °C, safe from 35 to 39 °C, with 37.0 °C inside it, and overheating from 39 to 41 °C, drawn though the game knows no overheating"
  const zoneAt = (temperature) =>
    bodyRowCells(runOf({ temperature, satiety: 100, health: 100 }), LAS)[0]
      .meter.zone;
  assert.deepEqual([28.4, 30, 34.99, 35, 37, 38.99, 39, 41].map(zoneAt), [
    "chill",
    "chill",
    "chill",
    "safe",
    "safe",
    "safe",
    "overheating",
    "overheating",
  ]);
});

test("the zones of the scale are drawn from 30 to 35, 35 to 39 and 39 to 41 °C, as wide as 5 : 4 : 2", () => {
  // decision: D-337 "Temperature stands on a linear scale from 30 °C at its left end to 41 °C at its right"
  // 5, 4 and 2 of the 11 degrees: 45.454545, 36.363636 and 18.181818 percent.
  assert.deepEqual(
    temperatureZones().map((zone) => [
      zone.zone,
      zone.from,
      zone.to,
      Number(zone.share.toFixed(6)),
    ]),
    [
      ["chill", 30, 35, 45.454545],
      ["safe", 35, 39, 36.363636],
      ["overheating", 39, 41, 18.181818],
    ],
  );
});

test("a value is in alarm below its threshold: temperature below 35 °C, satiety below 30, health below 35, never nature energy", () => {
  // decision: D-337 "Below its threshold — temperature below 35 °C and satiety below 30, as the game's data give them, and health below 35, a threshold of the look alone that the game does not know — the number of a value stands in red"
  // decision: D-337 "Below its threshold — temperature below 35 °C and satiety below 30, as the game's data give them, and health below 35, a threshold of the look alone that the game does not know — the number of a value stands in red and its fill pulses in its own colour, on the scale the marker together with the zone it stands in, still under the system's setting for reduced motion; no fill takes the colour of the alarm, and nature energy has no alarm"
  const alarms = (temperature, satiety, health, energy) =>
    bodyRowCells(runOf({ temperature, satiety, health }, energy), LAS).map(
      (cell) => cell.alarm,
    );
  assert.deepEqual(alarms(35, 30, 35, 0), [false, false, false, false]);
  assert.deepEqual(alarms(34.99, 29.99, 34.99, 0), [true, true, true, false]);
  assert.deepEqual(alarms(20, 0, 0, 0), [true, true, true, false]);
  // decision: D-178 "The body row ends with „Energia natury {n}”, the mage's nature energy cut down to a whole number, from game minute zero, in the role `text` at every value of the energy, zero included"
  for (const energy of [0, 90, 100])
    assert.equal(alarms(37, 100, 100, energy)[3], false, `energy ${energy}`);
  // The health shown cut down, 34, is below 35 whenever the health is.
  const [, , health] = bodyRowCells(
    runOf({ temperature: 37, satiety: 100, health: 34.5 }),
    LAS,
  );
  assert.deepEqual([health.number, health.alarm], ["34", true]);
});

test("the alarm of temperature and satiety follows the thresholds of the game's data, and the marker is in the zone of chill exactly then", () => {
  // decision: D-337 "Below its threshold — temperature below 35 °C and satiety below 30, as the game's data give them,"
  // With chill below 36 and hunger below 40, 35.5 °C and satiety 35 are in alarm, 36 °C and satiety 40 are not.
  withData(
    [
      [BALANCE.body, "chilledBelow", 36],
      [BALANCE.body, "starvingBelow", 40],
    ],
    () => {
      const cold = bodyRowCells(
        runOf({ temperature: 35.5, satiety: 35, health: 100 }),
        LAS,
      );
      assert.deepEqual(
        [cold[0].alarm, cold[0].meter.zone, cold[1].alarm],
        [true, "chill", true],
      );
      const fine = bodyRowCells(
        runOf({ temperature: 36, satiety: 40, health: 100 }),
        LAS,
      );
      assert.deepEqual(
        [fine[0].alarm, fine[0].meter.zone, fine[1].alarm],
        [false, "safe", false],
      );
    },
  );
});

test("the notes of the cells are those of today, in danger below the thresholds", () => {
  // decision: D-337 "The note under temperature reads the first of these that holds"
  const cells = bodyRowCells(
    runOf({ temperature: 34.5, satiety: 10, health: 20 }, 0),
    LAS,
  );
  assert.deepEqual(
    cells.map((cell) => cell.note),
    [
      { text: "marznie", danger: true },
      { text: "głoduje", danger: true },
      null,
      null,
    ],
  );
});

test("the frame of the temperature cell is warming while something burns on the character's tile, also at 37,0 °C and while chilled", () => {
  // decision: D-337 "The frame of the button of the temperature cell says what acts on the character: amber while something burns on the character's tile, also once the temperature stands at 37.0 °C"
  const frameOf = (temperature, fields) =>
    bodyRowCells(
      runOf({ temperature, satiety: 80, health: 100 }, 100, fields),
      LAS,
    )[0].frame;
  const at = runOf({ temperature: 37, satiety: 80, health: 100 }).character.at;
  const elsewhere = { q: at.q + 3, r: at.r };
  assert.equal(
    frameOf(37, { campfires: [{ at, minutesLeft: 40 }] }),
    "warming",
  );
  assert.equal(
    frameOf(34.5, { campfires: [{ at, minutesLeft: 40 }] }),
    "warming",
  );
  assert.equal(
    frameOf(36.5, { burningItems: [{ item: "stick", at, minutesLeft: 2 }] }),
    "warming",
  );
  // A campfire out, or burning on another tile, warms nothing.
  assert.equal(
    frameOf(36.5, { campfires: [{ at, minutesLeft: 0 }] }),
    "cooling",
  );
  assert.equal(
    frameOf(36.5, { campfires: [{ at: elsewhere, minutesLeft: 40 }] }),
    "cooling",
  );
});

test("the frame of the temperature cell is cooling while nothing warms the character on a map that cools the body", () => {
  // decision: D-337 "The frame of the button of the temperature cell says what acts on the character: amber while something burns on the character's tile, also once the temperature stands at 37.0 °C, bluish while nothing warms the character and its map is colder than its body"
  const frames = [LAS, MAPS.forestDeep].map(
    (map) =>
      bodyRowCells(runOf({ temperature: 37, satiety: 80, health: 100 }), map)[0]
        .frame,
  );
  assert.deepEqual(frames, ["cooling", "cooling"]);
  assert.equal(
    bodyRowCells(runOf({ temperature: 34.5, satiety: 80, health: 100 }), LAS)[0]
      .frame,
    "cooling",
  );
});

test("the frame of the temperature cell is plain on a map that does not cool the body, whatever the temperature", () => {
  // decision: D-337 "The frame of the button of the temperature cell says what acts on the character: amber while something burns on the character's tile, also once the temperature stands at 37.0 °C, bluish while nothing warms the character and its map is colder than its body, and the plain frame of the button on a map that does not cool it"
  const warm = { ...LAS, ambientTemperature: 37 };
  for (const temperature of [37, 33]) {
    assert.equal(
      bodyRowCells(runOf({ temperature, satiety: 80, health: 100 }), warm)[0]
        .frame,
      "plain",
    );
  }
});

test("the explanation of temperature gives the threshold, what happens below it and how fast it changes on the map, from the data", () => {
  // decision: D-450 "A click on the cell of temperature, satiety or nature energy (D-337) opens, right under the four cells and above the backpack, the explanation of its value — its threshold, what happens to the character below it and how fast the value changes, with the numbers of the game's data"
  // Las: ambient 25, 12 degrees below 37, cooling 0.002 × 12 = 0.024 °C a minute; Las — głębiej: 30 below, 0.06.
  // The threshold 35 °C and the loss of 0,35 health a minute below it, the campfire's 0,5 °C a minute.
  const forest = bodyExplanation("temperature", LAS);
  const deep = bodyExplanation("temperature", MAPS.forestDeep);
  for (const text of [forest, deep]) {
    for (const word of ["35 °C", "marznie", "0,35", "passa", "0,5 °C", "37 °C"])
      assert.ok(text.includes(word), `${word} in ${text}`);
  }
  assert.ok(forest.includes("0,024 °C na minutę") && !forest.includes("0,06"));
  assert.ok(deep.includes("0,06 °C na minutę") && !deep.includes("0,024"));
  const warm = bodyExplanation("temperature", {
    ...LAS,
    ambientTemperature: 37,
  });
  assert.ok(warm.includes("nie stygnie") && warm.includes("35 °C"));
  assert.ok(!warm.includes("0,024"));
});

test("the explanation of satiety gives the threshold, the loss of health below it and the fall a minute, from the data", () => {
  // decision: D-450 "A click on the cell of temperature, satiety or nature energy (D-337) opens, right under the four cells and above the backpack, the explanation of its value — its threshold, what happens to the character below it and how fast the value changes, with the numbers of the game's data"
  const text = bodyExplanation("satiety", LAS);
  for (const word of [
    "30 %",
    "głoduje",
    "0,35",
    "passa",
    "0,6 % na minutę",
    "każdej mapie",
  ])
    assert.ok(text.includes(word), `${word} in ${text}`);
  assert.equal(text, bodyExplanation("satiety", MAPS.forestDeep));
  // The numbers are the data's: with the fall 0.9 and the threshold 25 the words follow.
  withData(
    [
      [BALANCE.body, "satietyLossPerMinute", 0.9],
      [BALANCE.body, "starvingBelow", 25],
    ],
    () => {
      const changed = bodyExplanation("satiety", LAS);
      assert.ok(
        changed.includes("0,9 % na minutę") && changed.includes("25 %"),
      );
    },
  );
});

test("the explanation of nature energy gives what empty energy does, how fast it comes back and from which satiety, from the data", () => {
  // decision: D-450 "A click on the cell of temperature, satiety or nature energy (D-337) opens, right under the four cells and above the backpack, the explanation of its value — its threshold, what happens to the character below it and how fast the value changes, with the numbers of the game's data"
  // decision: D-377 "In a game minute outside combat in which the mage's satiety, taken after its fall in that minute, is at least 60, the mage's nature energy comes back by 0.5, up to its cap"
  const text = bodyExplanation("natureEnergy", LAS);
  for (const word of ["czary", "0,5 na minutę", "60 %", "100"])
    assert.ok(text.includes(word), `${word} in ${text}`);
  withData(
    [
      [BALANCE.natureEnergy, "regain", 0.7],
      [BALANCE.natureEnergy, "wellFedFrom", 65],
      [BALANCE.natureEnergy, "max", 80],
    ],
    () => {
      const changed = bodyExplanation("natureEnergy", LAS);
      assert.ok(
        changed.includes("0,7 na minutę") &&
          changed.includes("65 %") &&
          changed.includes("80"),
        changed,
      );
    },
  );
});

test("health has no explanation: its cell is no button", () => {
  // decision: D-337 "The cells of temperature, satiety and nature energy are buttons that open the explanation of their value, and the health cell, which is no button and holds the place of their frame"
  assert.equal(bodyExplanation("health", LAS), null);
});
