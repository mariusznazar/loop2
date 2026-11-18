// Counts how many of the named seeds each program of the first-map and first-pass tests solves.
// node counts.mjs old | shared
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { programFromRules, programWithRules } from "../../tests/sim/program-fixture.mjs";
import { newKnowingGame } from "../../tests/sim/understanding-fixture.mjs";

const mode = process.argv[2];
const SENT = { mapId: "forestEdge", characterId: 1 };
const FIRST_REAL_MS = 1760000000000;
const MINUTES = 5000;

function oldPrograms() {
  const ALWAYS = { kind: "always" };
  const rule = (condition, action) => ({ condition, action });
  const below = (kind, value) => ({ kind, value });
  const itemBelow = (item, value) => ({ kind: "itemBelow", item, value });
  const gather = (resource) => ({ kind: "gather", resource });
  const walkTo = (resource) => ({ kind: "walkTo", resource });
  const stick = "stick";
  const berry = "berry";
  const naive = programFromRules(
    rule(ALWAYS, { kind: "explore" }),
    rule(below("satietyBelow", 50), { kind: "eat" }),
    rule(below("temperatureBelow", 36.5), { kind: "lightCampfire" }),
    rule(ALWAYS, { kind: "craftCampfire" }),
    rule(itemBelow(stick, 8), gather(stick)),
    rule(ALWAYS, gather(berry)),
  );
  const decent = programFromRules(
    rule(below("satietyBelow", 50), { kind: "eat" }),
    rule(below("satietyBelow", 50), gather(berry)),
    rule(below("satietyBelow", 50), walkTo(berry)),
    rule(below("temperatureBelow", 36), { kind: "lightCampfire" }),
    rule(below("temperatureBelow", 35.5), { kind: "walkToCampfire" }),
    rule(below("campfireLeftBelow", 1), { kind: "craftCampfire" }),
    rule(itemBelow(stick, 8), gather(stick)),
    rule(itemBelow(stick, 8), walkTo(stick)),
    rule(itemBelow(berry, 3), gather(berry)),
    rule(itemBelow(berry, 3), walkTo(berry)),
    rule(ALWAYS, { kind: "explore" }),
    rule(ALWAYS, { kind: "wander" }),
  );
  const S = (v) => ({ kind: "satietyBelow", value: v });
  const T = (v) => ({ kind: "temperatureBelow", value: v });
  const EXPLORE = { kind: "explore" };
  const WANDER = { kind: "wander" };
  const rules = [
    rule(S(75), { kind: "eat" }),
    rule(itemBelow(berry, 1), gather(berry)),
    rule(itemBelow(berry, 1), walkTo(berry)),
    rule(itemBelow(berry, 1), EXPLORE),
    rule(itemBelow(berry, 1), WANDER),
    rule(ALWAYS, { kind: "lightCampfire" }),
    rule(itemBelow(stick, 2), gather(stick)),
    rule(itemBelow(stick, 2), walkTo(stick)),
    rule(ALWAYS, { kind: "walkToCampfire" }),
    rule(ALWAYS, { kind: "craftCampfire" }),
    rule(itemBelow(stick, 6), gather(stick)),
    rule(itemBelow(stick, 6), walkTo(stick)),
    rule(itemBelow(stick, 2), gather(stick)),
    rule(itemBelow(berry, 2), gather(berry)),
    rule(itemBelow(stick, 8), gather(stick)),
    rule(itemBelow(berry, 4), gather(berry)),
    rule(itemBelow(stick, 2), walkTo(stick)),
    rule(itemBelow(berry, 2), walkTo(berry)),
    rule(ALWAYS, EXPLORE),
    rule(itemBelow(stick, 2), WANDER),
    rule(itemBelow(berry, 2), WANDER),
  ];
  const numbered = rules.map((each, index) => ({ ...each, id: index + 1 }));
  const group = (id, name, condition, rs) => ({ id, name, condition, rules: rs });
  const best = {
    ...programWithRules([]),
    groups: [
      group(1, "Jedzenie", ALWAYS, numbered.slice(0, 1)),
      group(2, "Głód", S(65), numbered.slice(1, 3)),
      group(3, "Szukaj jedzenia", S(60), numbered.slice(3, 5)),
      group(4, "Zimno", T(36), numbered.slice(5, 12)),
      group(5, "Zapasy", ALWAYS, numbered.slice(12)),
    ],
    nextGroupId: 6,
    nextRuleId: 22,
  };
  return { naive, decent, best };
}

async function sharedPrograms() {
  const m = await import("../../tests/sim/reference-programs.mjs");
  return { naive: m.forestNaive, decent: m.forestDecent, best: m.forestBest };
}

function solvedSeeds(game, program, count) {
  const ready = createCharacter(setProgram(game, program).state, "Ala").state;
  let solved = 0;
  for (let index = 0; index < count; index += 1) {
    let state = send(ready, SENT, FIRST_REAL_MS + index).state;
    while (
      state.run.completion === null &&
      state.run.death === null &&
      state.run.minute < MINUTES
    ) {
      state = advanceMinutes(state, MINUTES - state.run.minute).state;
    }
    if (state.run.completion !== null) solved += 1;
  }
  return solved;
}

const programs = mode === "old" ? oldPrograms() : await sharedPrograms();
const result = {
  mode,
  naive500: solvedSeeds(newKnowingGame(), programs.naive, 500),
  decent500: solvedSeeds(newKnowingGame(), programs.decent, 500),
  bestKnowing300: solvedSeeds(newKnowingGame(), programs.best, 300),
  bestFresh300: solvedSeeds(newGame(), programs.best, 300),
};
console.log(JSON.stringify(result));
