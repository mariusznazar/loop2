// Own-work check of the fix of finding 1: across two map runs of an earning loop, with the player's acts
// on the main hand before each end, no stick is made or lost but by a death that takes the gear.
// Run from the worktree root after a build: node .runs/fix-code/own-check-two-runs.mjs
import { createCharacter, setProgram } from "../../dist/browser/sim/game.js";
import { putOnPiece, takeOffPiece } from "../../dist/browser/sim/gear.js";
import {
  advanceLoopRun,
  endLoopRun,
  startLoop,
} from "../../dist/browser/sim/loop.js";
import { programFromRules } from "../../tests/sim/program-fixture.mjs";
import { newKnowingGame } from "../../tests/sim/understanding-fixture.mjs";

const T0 = 1_760_000_000_000;
const ALA = 1;
const FAR = T0 + 10_000 * 60_000;

function game(sticks, hand, practised, noneLeft) {
  let state = setProgram(newKnowingGame(), programFromRules()).state;
  state = createCharacter(state, "Ala").state;
  state = {
    ...state,
    solvedMaps: ["forestEdge", "forest"],
    team: {
      ...state.team,
      chest: { pieces: sticks ? { stick: sticks } : {} },
      ...(noneLeft
        ? { resurrectionUsesSpent: 3, resurrectionNextReturnAtMs: FAR }
        : {}),
      characters: state.team.characters.map((c) => ({
        ...c,
        gear: { ...c.gear, mainHand: hand },
        skills: practised
          ? Object.fromEntries(
              Object.entries(c.skills).map(([k, v]) => [
                k,
                { ...v, practice: v.practice + 1 },
              ]),
            )
          : c.skills,
      })),
    },
  };
  return startLoop(state, { mapId: "forest", characterId: ALA }, T0).state;
}
const ala = (s) => s.team.characters.find((c) => c.id === ALA);
const owned = (s) =>
  (s.team.chest.pieces.stick ?? 0) + (ala(s).gear.mainHand === "stick" ? 1 : 0);
const end = (s, dying) => {
  const loop = s.loops[ALA];
  const run = dying
    ? { ...loop.run, body: { temperature: 30, satiety: 100, health: 0.1 } }
    : {
        ...loop.run,
        body: { temperature: 37, satiety: 100, health: 100 },
        streak: 479,
        current: {
          activity: { kind: "rule", ruleId: 1, action: { kind: "explore" } },
          startMinute: loop.run.minute,
          endMinute: loop.run.minute + 1,
          stepTo: null,
        },
      };
  const passed = advanceLoopRun(
    { ...s, loops: { ...s.loops, [ALA]: { ...loop, run } } },
    ALA,
    1,
  ).state;
  return endLoopRun(passed, ALA, T0).state;
};
const acts = {
  on: (s) => putOnPiece(s, ALA, "mainHand", "stick").state,
  off: (s) => takeOffPiece(s, ALA, "mainHand").state,
};
const seqs = [[], ["on"], ["off"], ["on", "off"], ["off", "on"], ["on", "on"]];
let checked = 0;
let failed = 0;
for (const sticks of [0, 1, 2])
  for (const hand of [null, "stick"])
    for (const [practised, noneLeft, takes] of [
      [false, false, false],
      [true, false, false],
      [true, true, true],
      [false, true, true],
    ])
      for (const first of seqs)
        for (const second of seqs) {
          let s = game(sticks, hand, practised, noneLeft);
          const total = owned(s);
          s = first.reduce((c, n) => acts[n](c), s);
          s = end(s, false);
          if (owned(s) !== total) failed += 1;
          checked += 1;
          if (!s.loops[ALA]) continue;
          const entered = ala(s).gear.mainHand === "stick" ? 1 : 0;
          s = second.reduce((c, n) => acts[n](c), s);
          s = end(s, true);
          const expected = total - (takes ? entered : 0);
          if (owned(s) !== expected) {
            failed += 1;
            console.log("FAIL", sticks, hand, practised, noneLeft, first, second, owned(s), expected);
          }
          checked += 1;
        }
console.log(`checked ${checked}, failed ${failed}`);
process.exitCode = failed === 0 ? 0 : 1;
