import assert from "node:assert/strict";
import { test } from "node:test";
import { programFromRules, programRules } from "./program-fixture.mjs";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  passRealTime,
  restart,
  send,
  setPaused,
  setProgram,
} from "../../dist/public/sim/game.js";
import { newKnowingGame } from "./understanding-fixture.mjs";

const [mapId, map] = Object.entries(MAPS)[0];
const [stick, berry] = map.resources.map((resource) => resource.id);
// The first character a new game creates takes the id 1.
const SENT = { mapId, characterId: 1 };
const REAL_MS = 1760000000000;

const ALWAYS = { kind: "always" };
const rule = (condition, action) => ({ condition, action });
const PROGRAM = programFromRules(
  rule({ kind: "hereBelow", resource: stick, value: 1 }, { kind: "explore" }),
  rule(ALWAYS, { kind: "walkTo", resource: berry }),
  rule(ALWAYS, { kind: "wander" }),
);
const OTHER = programFromRules(rule(ALWAYS, { kind: "wander" }));

/** Freezes a value and everything it holds, so a write to it throws in strict code. */
function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const inner of Object.values(value)) deepFreeze(inner);
  }
  return value;
}

/** Calls fn on frozen inputs and checks they still equal a copy taken before the call. */
function assertPure(name, fn, ...inputs) {
  const before = JSON.parse(JSON.stringify(inputs));
  for (const input of inputs) deepFreeze(input);
  assert.doesNotThrow(() => fn(...inputs), `${name} wrote to its input`);
  assert.deepEqual(
    JSON.parse(JSON.stringify(inputs)),
    before,
    `${name} changed its input`,
  );
}

function freshGame() {
  return createCharacter(setProgram(newKnowingGame(), PROGRAM).state, "Ala")
    .state;
}

/** A game mid-run: some minutes passed, a revealed tile, a carry of real time. */
function midRun() {
  let state = send(freshGame(), SENT, REAL_MS).state;
  state = advanceMinutes(state, 47).state;
  return passRealTime(state, 1500).state;
}

test("no public function of the game changes its inputs", () => {
  assertPure("createCharacter", createCharacter, freshGame(), "  Ola ");
  assertPure("createCharacter during a run", createCharacter, midRun(), "Ela");
  assertPure("setProgram", setProgram, newGame(), structuredClone(PROGRAM));
  assertPure(
    "setProgram with a run",
    setProgram,
    midRun(),
    structuredClone(OTHER),
  );
  assertPure("send", (state, ids) => send(state, ids, REAL_MS), freshGame(), {
    ...SENT,
  });
  assertPure("restart", restart, midRun());
  assertPure("end", end, midRun());
  assertPure("setPaused", setPaused, midRun(), true);
  assertPure(
    "setPaused to resume",
    (state) => setPaused(state, false),
    setPaused(midRun(), true).state,
  );
  assertPure("passRealTime", passRealTime, midRun(), 30500);
  assertPure("advanceMinutes", advanceMinutes, midRun(), 300);
});

test("the program held by the state does not follow later changes of the object passed in", () => {
  const program = structuredClone(PROGRAM);
  const { state } = setProgram(newGame(), program);
  programRules(program).pop();
  programRules(program)[0].condition.value = 7;
  assert.deepEqual(state.programs[0].program, PROGRAM);
});

test("a returned state is plain JSON", () => {
  const state = midRun();
  assert.deepEqual(JSON.parse(JSON.stringify(state)), state);
});
