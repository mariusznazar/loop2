import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  bodyMinute,
  minutesUntilChilled,
  minutesUntilStarving,
  needNotes,
} from "../../dist/browser/sim/body.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";
import {
  advanceMinutes,
  createCharacter,
  end,
  passRealTime,
  restart,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";

// Every expected number below is worked out by hand from the numbers of D-387 and D-388: on Las,
// at 25 °C, the body cools by 0.002 × (37 − 25) = 0.024 °C a minute, satiety falls by 0.6 a
// minute, health falls by 0.35 for chilled (below 35.0 °C) and 0.35 for starving (below 30), and
// rises by 0.05 otherwise.

const mapId = "forest";
const forest = MAPS[mapId];
// The first character a new game creates takes the id 1.
const characterId = 1;
const SENT = { mapId, characterId };
const REAL_MS = 1760000000000;

const ALWAYS = { kind: "always" };
const rule = (action) => ({ condition: ALWAYS, action });
const [stick] = forest.resources.map((resource) => resource.id);
/** A program of today's closed list: explore, walk to sticks, otherwise wander. */
const MIXED = programFromRules(
  rule({ kind: "explore" }),
  rule({ kind: "walkTo", resource: stick }),
  rule({ kind: "wander" }),
);
const EXPLORING = programFromRules(rule({ kind: "explore" }));

/** A game sent to Las with the program; the run stands at minute 0. */
function sent(program = MIXED) {
  return send(
    createCharacter(
      setProgram(withEdgeSolved(newKnowingGame()), program).state,
      "Ala",
    ).state,
    SENT,
    REAL_MS,
  ).state;
}

/** A game sent to Las whose body is replaced at minute 0 (explore runs until minute 20). */
function withBody(body) {
  const state = sent(EXPLORING);
  return { ...state, run: { ...state.run, body } };
}

const body = (temperature, satiety, health) => ({
  temperature,
  satiety,
  health,
});

test("Las is the map these numbers are worked out for", () => {
  assert.equal(forest.name, "Las");
  assert.equal(forest.ambientTemperature, 25);
});

test("a map run starts at 37.0 °C, satiety 100, health 100, alive", () => {
  const { run } = sent();
  assert.equal(run.minute, 0);
  assert.deepEqual(run.body, body(37, 100, 100));
  assert.equal(run.death, null);
});

test("on Las the body at named minutes is the one worked out by hand", () => {
  const expected = [
    [1, body(36.976, 99.4, 100)],
    [83, body(35.008, 50.2, 100)],
    [84, body(34.984, 49.6, 99.65)],
    [116, body(34.216, 30.4, 88.45)],
    [117, body(34.192, 29.8, 87.75)],
    [167, body(32.992, 0, 52.75)],
    [242, body(31.192, 0, 0.25)],
  ];
  let state = sent();
  for (const [minute, value] of expected) {
    state = advanceMinutes(state, minute - state.run.minute).state;
    assert.equal(state.run.minute, minute);
    assert.deepEqual(state.run.body, value, `minute ${minute}`);
    assert.equal(state.run.death, null, `minute ${minute}`);
  }
});

test("on Las a program of today's closed list is alive in minute 242 and dies of cold in minute 243", () => {
  const at242 = advanceMinutes(sent(), 242).state;
  assert.equal(at242.run.death, null);
  assert.ok(
    at242.run.current.endMinute > 243,
    "an action is in progress across minute 243",
  );
  const { state, events } = advanceMinutes(at242, 30);
  assert.equal(state.run.minute, 243, "the span stops at death");
  assert.deepEqual(state.run.body, body(31.168, 0, 0));
  assert.deepEqual(state.run.death, { minute: 243, cause: "cold" });
  assert.deepEqual(events, [
    { kind: "characterDied", minute: 243, cause: "cold" },
  ]);
  assert.deepEqual(
    state.run.current,
    at242.run.current,
    "the action in progress stays as it stood",
  );
  assert.deepEqual(state.run.tiles, at242.run.tiles);
  assert.deepEqual(state.run.character, at242.run.character);
  assert.equal(state.run.wanderRandom, at242.run.wanderRandom);
});

test("death falls during an action in progress, which gives no activityFinished", () => {
  // Explore runs from minute 0 to 20; the body dies in minute 1.
  const start = withBody(body(34, 50, 0.7));
  assert.equal(start.run.current.endMinute, 20);
  const { state, events } = advanceMinutes(start, 1);
  assert.equal(state.run.minute, 1);
  assert.deepEqual(state.run.body, body(33.976, 49.4, 0.35));
  assert.equal(state.run.death, null, "0.7 − 0.35 leaves 0.35");
  assert.deepEqual(events, []);
  const died = advanceMinutes(state, 30);
  assert.equal(died.state.run.minute, 2);
  assert.deepEqual(died.state.run.body, body(33.952, 48.8, 0));
  assert.deepEqual(died.state.run.death, { minute: 2, cause: "cold" });
  assert.deepEqual(died.events, [
    { kind: "characterDied", minute: 2, cause: "cold" },
  ]);
  assert.deepEqual(died.state.run.current, start.run.current);
});

test("a map run that is warm but hungry dies of hunger", () => {
  const { state, events } = advanceMinutes(withBody(body(37, 10, 0.35)), 5);
  assert.equal(state.run.minute, 1);
  assert.deepEqual(state.run.body, body(36.976, 9.4, 0));
  assert.deepEqual(state.run.death, { minute: 1, cause: "hunger" });
  assert.deepEqual(events, [
    { kind: "characterDied", minute: 1, cause: "hunger" },
  ]);
});

test("a map run both chilled and starving loses both and dies of cold", () => {
  const { state } = advanceMinutes(withBody(body(30, 10, 1)), 5);
  assert.equal(state.run.minute, 2);
  assert.deepEqual(state.run.body, body(29.952, 8.8, 0));
  assert.deepEqual(state.run.death, { minute: 2, cause: "cold" });
});

test("health rises by 0.05 where neither chilled nor starving, not above 100", () => {
  let state = withBody(body(37, 100, 99.9));
  state = advanceMinutes(state, 1).state;
  assert.equal(state.run.body.health, 99.95);
  state = advanceMinutes(state, 1).state;
  assert.equal(state.run.body.health, 100);
  state = advanceMinutes(state, 1).state;
  assert.equal(state.run.body.health, 100);
});

test("satiety does not fall below 0", () => {
  const { state } = advanceMinutes(withBody(body(37, 0.4, 100)), 2);
  assert.deepEqual(state.run.body, body(36.952, 0, 99.3));
});

test("the warmth on the tile warms the body, capped at 37.0 °C on the sum", () => {
  // Nothing burns yet, so the body module is given the warmth directly.
  const cases = [
    [body(37, 100, 100), 0.5, body(37, 99.4, 100)],
    [body(36.9, 100, 100), 0.5, body(37, 99.4, 100)],
    [body(36, 100, 100), 0.15, body(36.126, 99.4, 100)],
    [body(36.98, 100, 100), 0.03, body(36.986, 99.4, 100)],
  ];
  for (const [before, warmth, after] of cases) {
    const result = bodyMinute(before, warmth, forest);
    assert.deepEqual(result.body, after, `${before.temperature} + ${warmth}`);
    assert.equal(result.death, null);
  }
});

test("a value the decimal arithmetic puts exactly on a threshold does not cross it", () => {
  // 35.24 − 10 × 0.024 is 35.0 exactly: not chilled; binary arithmetic gives 34.99999999999998.
  let state = advanceMinutes(withBody(body(35.24, 100, 50)), 10).state;
  assert.deepEqual(state.run.body, body(35, 94, 50.5));
  state = advanceMinutes(state, 1).state;
  assert.deepEqual(state.run.body, body(34.976, 93.4, 50.15));
  // 33 − 5 × 0.6 is 30 exactly: not starving; binary arithmetic gives 29.999999999999993.
  state = advanceMinutes(withBody(body(37, 33, 50)), 5).state;
  assert.deepEqual(state.run.body, body(36.88, 30, 50.25));
  state = advanceMinutes(state, 1).state;
  assert.deepEqual(state.run.body, body(36.856, 29.4, 49.9));
});

/** The state after each of `minutes` calls of one minute each, index = calls made. */
function minuteByMinute(start, minutes) {
  const states = [start];
  const events = [];
  let state = start;
  for (let i = 0; i < minutes; i += 1) {
    const result = advanceMinutes(state, 1);
    state = result.state;
    states.push(state);
    events.push(...result.events);
  }
  return { states, events };
}

test("a span split into calls gives the same state and events at every minute up to and including death", () => {
  const reference = minuteByMinute(sent(), 260);
  assert.equal(reference.states[243].run.death?.minute, 243);
  assert.equal(reference.states[260].run.minute, 243);
  const splits = [
    [260],
    [243, 17],
    [242, 1, 17],
    [83, 1, 32, 1, 125, 18],
    [7, 50, 100, 70, 33],
  ];
  for (const split of splits) {
    let state = sent();
    let calls = 0;
    const events = [];
    for (const minutes of split) {
      const result = advanceMinutes(state, minutes);
      state = result.state;
      calls += minutes;
      events.push(...result.events);
      assert.deepEqual(
        state,
        reference.states[calls],
        `split ${split.join("+")} after ${calls} minutes`,
      );
    }
    assert.deepEqual(events, reference.events, `split ${split.join("+")}`);
  }
});

test("real time reaching death gives the same state however it is split", () => {
  const once = passRealTime(sent(), 243500).state;
  const split = passRealTime(passRealTime(sent(), 242500).state, 1500).state;
  assert.equal(once.run.death?.minute, 243);
  assert.deepEqual(split, once);
  const later = passRealTime(sent(), 300000).state;
  assert.deepEqual(later, once);
});

test("a map run ended in death passes no minute", () => {
  const dead = advanceMinutes(sent(), 300).state;
  assert.equal(dead.run.minute, 243);
  for (const minutes of [0, 1, 50]) {
    assert.deepEqual(advanceMinutes(dead, minutes), {
      state: dead,
      events: [],
    });
  }
  for (const realMs of [1, 1000, 60000]) {
    assert.deepEqual(passRealTime(dead, realMs), { state: dead, events: [] });
  }
});

test("restart and end take a map run ended in death as one in progress", () => {
  const dead = advanceMinutes(sent(), 300).state;
  const restarted = restart(dead);
  assert.deepEqual(restarted, restart(sent()));
  assert.equal(restarted.state.run.seed, dead.run.seed);
  assert.equal(restarted.state.run.minute, 0);
  assert.deepEqual(restarted.state.run.body, body(37, 100, 100));
  assert.equal(restarted.state.run.death, null);
  assert.equal(restarted.events[0].kind, "mapRunEnded");
  const ended = end(dead);
  assert.equal(ended.state.run, null);
  assert.deepEqual(ended.events, [{ kind: "mapRunEnded" }]);
  // „Zakończ” after death leads to the screen Postać of that character (D-53, D-62): no map run,
  // the team as it was, and the same character sent again.
  assert.deepEqual(ended.state.team, dead.team);
  const again = send(ended.state, SENT, REAL_MS + 1000).state;
  assert.equal(again.run.character.id, characterId);
  assert.equal(again.run.death, null);
});

test("the body step reports a loss only when the character is chilled or starving after it", () => {
  // Worked by hand: Las cools the body by 0.024 °C and satiety falls by 0.6 in a minute.
  const cases = [
    [body(37, 100, 100), false, "warm and fed"],
    [body(35.02, 100, 100), true, "35.02 − 0.024 = 34.996, below 35.0"],
    [body(35.1, 100, 100), false, "35.1 − 0.024 = 35.076, not below 35.0"],
    [body(37, 30.5, 100), true, "30.5 − 0.6 = 29.9, below 30"],
    [body(37, 31, 100), false, "31 − 0.6 = 30.4, not below 30"],
    [body(37, 100, 20), false, "wounded but neither chilled nor starving"],
    [body(34, 50, 0.2), true, "chilled to death in this minute"],
  ];
  for (const [before, lost, why] of cases) {
    assert.equal(bodyMinute(before, 0, forest).lostHealth, lost, why);
  }
});

test("the body step names the cause of its loss from the same reading: cold, hunger, both, or none", () => {
  // Worked by hand as in the case above: Las cools by 0.024 °C and satiety falls by 0.6 in a minute.
  const cases = [
    [body(37, 100, 100), null, "warm and fed"],
    [body(35.02, 100, 100), "cold", "35.02 − 0.024 = 34.996, below 35.0"],
    [body(37, 30.5, 100), "hunger", "30.5 − 0.6 = 29.9, below 30"],
    [body(35.02, 30.5, 100), "coldAndHunger", "chilled and starving together"],
    [body(34, 50, 0.2), "cold", "chilled to death in this minute"],
    [body(37, 30.5, 0.2), "hunger", "starved to death in this minute"],
  ];
  for (const [before, cause, why] of cases) {
    assert.equal(bodyMinute(before, 0, forest).healthLoss, cause, why);
  }
});

// Nature energy (D-176, D-377): the cap is 100 and every map run, a restart included, starts full;
// outside combat a game minute whose satiety after its fall of 0.6 is 60 or above gives back 0.5,
// not above the cap.

/** A game sent to Las with the program, its run's fields replaced at minute 0. */
function sentWith(fields, program = EXPLORING) {
  const state = sent(program);
  return { ...state, run: { ...state.run, ...fields } };
}

test("every map run starts with full nature energy, 100: a send, a restart and a send after „Zakończ”", () => {
  const first = sent();
  assert.equal(first.run.natureEnergy, 100);
  const spent = advanceMinutes(sentWith({ natureEnergy: 12 }), 3).state;
  assert.equal(restart(spent).state.run.natureEnergy, 100);
  const again = send(end(spent).state, SENT, REAL_MS + 1000).state;
  assert.equal(again.run.natureEnergy, 100);
});

test("nature energy comes back by 0.5 in a game minute whose satiety after its fall is 60 or above", () => {
  const cases = [
    [60.6, 40.5, "60.6 − 0.6 = 60, well fed"],
    [60.5, 40, "60.5 − 0.6 = 59.9, not well fed"],
    [100, 40.5, "99.4, well fed"],
    [30, 40, "29.4, starving"],
  ];
  for (const [satiety, energy, why] of cases) {
    const { state } = advanceMinutes(
      sentWith({ body: body(37, satiety, 100), natureEnergy: 40 }),
      1,
    );
    assert.equal(state.run.natureEnergy, energy, why);
  }
});

test("nature energy does not come back above its cap of 100", () => {
  for (const [from, to] of [
    [99.75, 100],
    [100, 100],
  ]) {
    const { state } = advanceMinutes(
      sentWith({ body: body(37, 100, 100), natureEnergy: from }),
      1,
    );
    assert.equal(state.run.natureEnergy, to, `from ${from}`);
  }
});

// Invariant nature-energy-range: the mage's nature energy lies between 0 and its cap in the data,
// 100, at every game minute. Two map runs on Las are read minute by minute: one well fed from a
// full energy, where every game minute gives energy back at the cap, and one hungry, lighting a
// stick as long as it can, so that its energy reaches 0 and the program goes on picking.
test("nature energy stays between 0 and its cap of 100 at every game minute", () => {
  // invariant: nature-energy-range
  const LIGHTING = programFromRules(
    rule({ kind: "lightItem" }),
    rule({ kind: "wander" }),
  );
  const lightingRun = (natureEnergy, satiety) => {
    const state = sentWith({ natureEnergy }, LIGHTING);
    const at = state.run.character.at;
    return {
      ...state,
      run: {
        ...state.run,
        // A free minute next: the program picks on the revealed tile from minute 1.
        current: {
          activity: { kind: "wait" },
          startMinute: 0,
          endMinute: 1,
          stepTo: null,
        },
        body: body(37, satiety, 100),
        tiles: state.run.tiles.map((tile) =>
          tile.at.q === at.q && tile.at.r === at.r
            ? { ...tile, revealed: true }
            : tile,
        ),
        character: {
          ...state.run.character,
          backpack: { ...state.run.character.backpack, [stick]: 15 },
        },
      },
    };
  };
  const scenarios = [
    // Well fed for 66 game minutes (100 − 0.6 × 66 = 60.4), lighting a stick every 5 minutes.
    ["well fed at the cap", lightingRun(100, 100), 120],
    // Hungry from the start: no energy comes back, so ten lightings spend all 100.
    ["hungry, lighting to empty", lightingRun(100, 50), 120],
  ];
  const seen = { atCapWellFed: false, atZero: false, pickedAtZero: false };
  for (const [name, start, minutes] of scenarios) {
    let state = start;
    for (let minute = 1; minute <= minutes; minute += 1) {
      const before = state.run;
      const result = advanceMinutes(state, 1);
      state = result.state;
      const energy = state.run.natureEnergy;
      assert.ok(
        energy >= 0 && energy <= 100,
        `${name}: ${energy} in minute ${state.run.minute}`,
      );
      if (before.natureEnergy === 100 && state.run.body.satiety >= 60)
        seen.atCapWellFed = true;
      if (energy === 0) {
        seen.atZero = true;
        if (result.events.some((event) => event.kind === "activityStarted"))
          seen.pickedAtZero = true;
      }
    }
  }
  // Controls: a minute that would give energy back at the cap, energy at 0, and a pick made there.
  assert.deepEqual(seen, {
    atCapWellFed: true,
    atZero: true,
    pickedAtZero: true,
  });
});

// The minutes each need lasts (D-337). Each expected number is worked out by hand from the numbers
// of D-387 and D-388: Las cools the body by 0.002 × (37 − 25) = 0.024 °C a minute, Las — głębiej by
// 0.002 × (37 − 7) = 0.06 °C, satiety falls by 0.6 a minute, chilled is below 35.0 °C and starving
// below 30.

const { forestDeep } = MAPS;
/** A map as warm as the body's start: it never cools the body. */
const warm = { ...forest, ambientTemperature: 37 };

test("from the starting temperature a body lasts 83 game minutes on Las and 33 on Las — głębiej before it is chilled", () => {
  // Las: the 83rd minute ends at 37 − 83 × 0.024 = 35.008 °C, the 84th at 34.984 °C.
  // Las — głębiej: the 33rd ends at 37 − 33 × 0.06 = 35.02 °C, the 34th at 34.96 °C.
  assert.equal(minutesUntilChilled(body(37, 100, 100), forest), 83);
  assert.equal(minutesUntilChilled(body(37, 100, 100), forestDeep), 33);
});

test("from 36.9 °C a body lasts 79 game minutes on Las, the whole minutes of 79.2", () => {
  // (36.9 − 35) / 0.024 = 79.17: the 79th minute ends at 36.9 − 1.896 = 35.004 °C, the 80th at
  // 34.98 °C.
  assert.equal(minutesUntilChilled(body(36.9, 100, 100), forest), 79);
});

test("a body at exactly 35.0 °C is not chilled but lasts no minute, and a chilled body lasts none either", () => {
  // 35.0 − 0.024 = 34.976 °C, below the threshold in the first minute.
  assert.equal(minutesUntilChilled(body(35, 100, 100), forest), 0);
  assert.equal(minutesUntilChilled(body(34, 100, 100), forest), 0);
});

test("a map that does not cool the body below the threshold gives no minutes until chilled", () => {
  // Ambient 37 °C: no cooling at all, the body keeps the temperature it has.
  assert.equal(minutesUntilChilled(body(37, 100, 100), warm), null);
  assert.equal(minutesUntilChilled(body(36.2, 100, 100), warm), null);
});

test("from full satiety a body lasts 116 game minutes before it starves, from 82 it lasts 86", () => {
  // 100 − 116 × 0.6 = 30.4, the 117th minute ends at 29.8 (below 30);
  // 82 − 86 × 0.6 = 30.4, the 87th minute ends at 29.8.
  assert.equal(minutesUntilStarving(body(37, 100, 100), forest), 116);
  assert.equal(minutesUntilStarving(body(37, 82, 100), forest), 86);
});

test("satiety lasts the same on a map of another ambient temperature", () => {
  assert.equal(minutesUntilStarving(body(37, 100, 100), forestDeep), 116);
});

test("satiety that falls to exactly 30 is not starving, and one below 30 lasts no minute", () => {
  // 30.6 − 0.6 = 30 exactly: not starving; the next minute ends at 29.4.
  assert.equal(minutesUntilStarving(body(37, 30.6, 100), forest), 1);
  // 30 − 0.6 = 29.4 and 29.9 − 0.6 = 29.3: starving in the first minute.
  assert.equal(minutesUntilStarving(body(37, 30, 100), forest), 0);
  assert.equal(minutesUntilStarving(body(37, 29.9, 100), forest), 0);
});

/** The run of a game sent to Las, its body replaced and its fields set. */
function noteRun(runBody, fields = {}) {
  const { run } = sent();
  return { ...run, body: runBody, ...fields };
}

test("the notes at minute zero read the minutes of both needs", () => {
  assert.deepEqual(needNotes(noteRun(body(37, 100, 100)), forest), {
    temperature: { kind: "minutes", minutes: 83 },
    satiety: { kind: "minutes", minutes: 116 },
  });
  assert.deepEqual(needNotes(noteRun(body(36.9, 82, 100)), forest), {
    temperature: { kind: "minutes", minutes: 79 },
    satiety: { kind: "minutes", minutes: 86 },
  });
});

test("the note of temperature reads chilled below 35.0 °C and minutes at 35.0 °C", () => {
  const at = (temperature) =>
    needNotes(noteRun(body(temperature, 100, 100)), forest).temperature;
  assert.deepEqual(at(35), { kind: "minutes", minutes: 0 });
  assert.deepEqual(at(34.99), { kind: "chilled" });
});

test("the note of satiety reads starving below 30 and minutes at 30", () => {
  const at = (satiety) =>
    needNotes(noteRun(body(37, satiety, 100)), forest).satiety;
  assert.deepEqual(at(30), { kind: "minutes", minutes: 0 });
  assert.deepEqual(at(29.99), { kind: "starving" });
});

test("a stick or a campfire burning on the character's tile gives by fire", () => {
  const at = noteRun(body(37, 100, 100)).character.at;
  const stick = { item: "stick", at, minutesLeft: 3 };
  const campfire = { at, minutesLeft: 40 };
  for (const fields of [{ burningItems: [stick] }, { campfires: [campfire] }]) {
    const notes = needNotes(noteRun(body(36.5, 100, 100), fields), forest);
    assert.deepEqual(notes.temperature, { kind: "fire" });
    assert.deepEqual(notes.satiety, { kind: "minutes", minutes: 116 });
  }
});

test("what does not warm the character's tile gives minutes, not fire", () => {
  const at = noteRun(body(37, 100, 100)).character.at;
  const elsewhere = { q: at.q + 1, r: at.r };
  const cases = [
    ["an extinguished campfire here", { campfires: [{ at, minutesLeft: 0 }] }],
    [
      "a campfire on another tile",
      { campfires: [{ at: elsewhere, minutesLeft: 40 }] },
    ],
    [
      "a stick burning on another tile",
      { burningItems: [{ item: "stick", at: elsewhere, minutesLeft: 3 }] },
    ],
  ];
  for (const [why, fields] of cases) {
    const notes = needNotes(noteRun(body(37, 100, 100), fields), forest);
    assert.deepEqual(notes.temperature, { kind: "minutes", minutes: 83 }, why);
  }
});

test("a chilled body by the fire still reads chilled", () => {
  const at = noteRun(body(37, 100, 100)).character.at;
  const notes = needNotes(
    noteRun(body(34.5, 100, 100), { campfires: [{ at, minutesLeft: 40 }] }),
    forest,
  );
  assert.deepEqual(notes.temperature, { kind: "chilled" });
});

test("a map at the body's starting temperature gives not cooling, and fire is read before it", () => {
  const at = noteRun(body(37, 100, 100)).character.at;
  assert.deepEqual(needNotes(noteRun(body(37, 100, 100)), warm).temperature, {
    kind: "not-cooling",
  });
  assert.deepEqual(
    needNotes(
      noteRun(body(37, 100, 100), { campfires: [{ at, minutesLeft: 40 }] }),
      warm,
    ).temperature,
    { kind: "fire" },
  );
});

test("the notes read the run they are given and change none of its values", () => {
  const at = noteRun(body(37, 100, 100)).character.at;
  const run = noteRun(body(36.9, 82, 100), {
    campfires: [{ at, minutesLeft: 40 }],
    burningItems: [{ item: "stick", at, minutesLeft: 3 }],
  });
  const before = structuredClone(run);
  const deepFreeze = (value) => {
    if (value !== null && typeof value === "object") {
      Object.freeze(value);
      Object.values(value).forEach(deepFreeze);
    }
    return value;
  };
  needNotes(deepFreeze(run), forest);
  minutesUntilChilled(run.body, forest);
  minutesUntilStarving(run.body, forest);
  assert.deepEqual(run, before);
});
