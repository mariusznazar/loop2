// Probe of the review of the whole change: does a gear act at a character in an earning loop,
// on a slot whose piece the map run going on holds, make a piece out of nothing?
// Run from the root of a built worktree: node tests/sim/probe-gear-duplication.mjs
import { createCharacter, setProgram } from "../../dist/browser/sim/game.js";
import { putOnPiece, takeOffPiece } from "../../dist/browser/sim/gear.js";
import { advanceLoopRun, endLoopRun, startLoop } from "../../dist/browser/sim/loop.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const T0 = 1_760_000_000_000;
const ALA = 1;
const FOREST = { mapId: "forest", characterId: ALA };

function game(chest) {
  let state = setProgram(newKnowingGame(), programFromRules()).state;
  state = createCharacter(state, "Ala").state;
  return {
    ...state,
    solvedMaps: ["forestEdge", "forest"],
    team: { ...state.team, chest: { pieces: { ...chest } } },
  };
}
const ala = (state) => state.team.characters.find((c) => c.id === ALA);
const sticks = (state, label) => {
  const chest = state.team.chest.pieces.stick ?? 0;
  const gear = ala(state).gear.mainHand === "stick" ? 1 : 0;
  const run = state.loops[ALA]?.run;
  const inRun = run
    ? (run.character.gear.mainHand === "stick" ? 1 : 0) + (run.character.backpack.stick ?? 0)
    : 0;
  console.log(`${label}: chest ${chest}, character's gear ${gear}, map run going on ${inRun}`);
};
function completeLoopRun(state) {
  const loop = state.loops[ALA];
  const run = loop.run;
  const completing = {
    ...run,
    body: { temperature: 37, satiety: 100, health: 100 },
    streak: 479,
    current: {
      activity: { kind: "rule", ruleId: 1, action: { kind: "explore" } },
      startMinute: run.minute,
      endMinute: run.minute + 1,
      stepTo: null,
    },
  };
  const passed = advanceLoopRun(
    { ...state, loops: { ...state.loops, [ALA]: { ...loop, run: completing } } },
    ALA,
    1,
  ).state;
  if (!passed.loops[ALA].run.completion) throw new Error("precondition: no completion");
  return endLoopRun(passed, ALA, T0).state;
}

console.log("Case 1: one stick, put on at the camp, taken off during the loop's map run");
let s = game({ stick: 1 });
s = putOnPiece(s, ALA, "mainHand", "stick").state;
sticks(s, "at the camp after the put on");
s = startLoop(s, FOREST, T0).state;
sticks(s, "loop started");
s = takeOffPiece(s, ALA, "mainHand").state;
sticks(s, "after Zdejmij in the loop");
s = completeLoopRun(s);
sticks(s, "after the map run's completion (merge)");

console.log("Case 2: two sticks, one put on at the camp, the other put on during the loop's map run");
s = game({ stick: 2 });
s = putOnPiece(s, ALA, "mainHand", "stick").state;
s = startLoop(s, FOREST, T0).state;
sticks(s, "loop started");
s = putOnPiece(s, ALA, "mainHand", "stick").state;
sticks(s, "after the second put on in the loop");
s = completeLoopRun(s);
sticks(s, "after the map run's completion (merge)");

function dieLoopRun(state) {
  const loop = state.loops[ALA];
  const dying = { ...loop.run, body: { temperature: 30, satiety: 100, health: 0.1 } };
  const passed = advanceLoopRun(
    { ...state, loops: { ...state.loops, [ALA]: { ...loop, run: dying } } },
    ALA,
    1,
  ).state;
  if (!passed.loops[ALA].run.death) throw new Error("precondition: no death");
  return endLoopRun(passed, ALA, T0).state;
}

console.log("Case 3: one stick, put on at the camp, taken off in the loop, then a death with no use left");
s = game({ stick: 1 });
s = putOnPiece(s, ALA, "mainHand", "stick").state;
s = startLoop(s, FOREST, T0).state;
s = takeOffPiece(s, ALA, "mainHand").state;
s = { ...s, team: { ...s.team, resurrectionUsesSpent: 3, resurrectionNextReturnAtMs: T0 + 1e9 } };
s = dieLoopRun(s);
sticks(s, "after the death (expected 0 in all)");

console.log("Case 4: chest holds two sticks, one put on in the loop over an empty hand, then taken off");
s = game({ stick: 2 });
s = startLoop(s, FOREST, T0).state;
s = putOnPiece(s, ALA, "mainHand", "stick").state;
sticks(s, "after the put on in the loop");
s = takeOffPiece(s, ALA, "mainHand").state;
sticks(s, "after Zdejmij of the piece put on in the loop (expected chest 2)");

console.log("Case 5: full chest, the run's stick taken off in the loop");
s = game({ stick: 1, berry: 59 });
s = putOnPiece(s, ALA, "mainHand", "stick").state;
s = startLoop(s, FOREST, T0).state;
const off = takeOffPiece(s, ALA, "mainHand");
console.log(`refusal: ${off.refusal}`);
s = off.state;
s = completeLoopRun(s);
sticks(s, "after the merge with the chest at 59 berries (room 1)");
