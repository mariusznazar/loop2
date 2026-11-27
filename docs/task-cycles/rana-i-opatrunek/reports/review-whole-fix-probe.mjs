// Probe of the fix review: documents the game itself writes, with turns of „Ucisk” in the combat
// record of a manual map run and of a map run of an earning loop, load; the same documents with the
// branch taken off the map run's character are refused. Also the paragraph of an encounter.
import { writeFileSync } from "node:fs";
import { advanceMinutes, send } from "./dist/browser/sim/game.js";
import { advanceLoopRun, startLoop } from "./dist/browser/sim/loop.js";
import { loadSavedGame, savedGame } from "./dist/browser/sim/saved-game.js";
import { withSaveTime } from "./dist/browser/sim/game.js";
import { combatText } from "./dist/browser/view/combat-line.js";
import { makeState, prerequisitesOf } from "./balance/engine.mjs";
import { forestBandages } from "./tests/sim/reference-programs.mjs";

const SKILLS = {
  tending: { practice: 60, ranks: { pressure: 1 } },
};
const pressed = (run) =>
  run?.lastCombat?.result?.exchanges.some(
    (e) => e.characterAction?.action.kind === "pressure",
  );
const out = [];

function base(solved) {
  const state = makeState({
    program: forestBandages,
    gear: { pocket1: "bandage" },
    chest: { bandage: 4, stick: 8, berry: 7 },
    solvedMaps: solved,
  });
  const [ch] = state.team.characters;
  return {
    ...state,
    team: {
      ...state.team,
      characters: [{ ...ch, skills: { ...ch.skills, ...SKILLS } }],
    },
  };
}

// A manual map run.
for (let seed = 1; seed <= 30; seed += 1) {
  let state = send(
    base(prerequisitesOf("forestPack")),
    { mapId: "forestPack", characterId: 1 },
    seed,
  ).state;
  let found = false;
  for (let m = 0; m < 2000 && state.run && !state.run.death && !state.run.completion; m += 1) {
    state = advanceMinutes(state, 1).state;
    if (pressed(state.run)) {
      found = true;
      break;
    }
  }
  if (!found) continue;
  const doc = savedGame(withSaveTime(state, 1_760_000_100_000));
  const loaded = loadSavedGame(JSON.parse(JSON.stringify(doc)));
  out.push(`manual seed ${seed}: load ok=${loaded.ok} ${loaded.ok ? "" : loaded.reason}`);
  out.push(`  paragraph: ${combatText(state.run.lastCombat)}`);
  const stripped = JSON.parse(JSON.stringify(doc));
  stripped.game.run.character.skills.tending.ranks = {};
  const refused = loadSavedGame(stripped);
  out.push(`  without the rank: ok=${refused.ok} ${refused.ok ? "" : refused.reason}`);
  break;
}

// A map run of an earning loop.
for (let seed = 1; seed <= 30; seed += 1) {
  let state = startLoop(
    base([...prerequisitesOf("forestPack"), "forestPack"]),
    { mapId: "forestPack", characterId: 1 },
    1_760_000_000_000 + seed,
  ).state;
  if (!state.loops[1]) {
    out.push("loop did not start");
    break;
  }
  let found = false;
  for (let m = 0; m < 3000; m += 1) {
    state = advanceLoopRun(state, 1, 1).state;
    if (pressed(state.loops[1]?.run)) {
      found = true;
      break;
    }
  }
  if (!found) continue;
  const doc = savedGame(withSaveTime(state, 1_760_000_100_000));
  const loaded = loadSavedGame(JSON.parse(JSON.stringify(doc)));
  out.push(`loop try ${seed}: load ok=${loaded.ok} ${loaded.ok ? "" : loaded.reason}`);
  const stripped = JSON.parse(JSON.stringify(doc));
  stripped.game.loops[1].run.character.skills.tending.ranks = {};
  const refused = loadSavedGame(stripped);
  out.push(`  without the rank: ok=${refused.ok} ${refused.ok ? "" : refused.reason}`);
  break;
}
writeFileSync(process.argv[2], out.join("\n") + "\n", "utf8");
console.log(out.length);
