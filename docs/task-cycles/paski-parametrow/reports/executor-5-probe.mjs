import { newGame, createCharacter, send, advanceMinutes, setPaused } from "../../dist/browser/sim/game.js";
import { blowMarker } from "../../dist/browser/view/body-blow.js";
import { withEdgeSolved } from "../../tests/sim/understanding-fixture.mjs";
let found = 0;
for (let seed = 0; seed < 40 && found < 3; seed += 1) {
  let state = createCharacter(withEdgeSolved(newGame()), "Ala").state; state = { ...state, solvedMaps: ["forestEdge","forest"] };
  state = send(state, { mapId: "forestDeep", characterId: 1 }, 1760000000000 + seed * 7919).state;
  for (let i = 0; i < 600 && state.run && !state.run.death; i += 1) {
    const before = state.run.body.health;
    const r = advanceMinutes(setPaused(state, false).state, 1);
    state = r.state;
    const ex = r.events.filter((e) => e.kind === "combatExchange");
    if (ex.length > 0) {
      const taken = ex.reduce((n, e) => n + (e.exchange.creatureAction.kind === "strike" ? e.exchange.creatureAction.damage : 0), 0);
      console.log("seed", seed, "minute", state.run.minute, "attacked in call:", r.events.some((e) => e.kind === "attacked"), "health", before, "->", state.run.body.health, "sum", taken, "marker@1x", JSON.stringify(blowMarker(r.events, state.run.lastCombat, 1)), "@8x", JSON.stringify(blowMarker(r.events, state.run.lastCombat, 8)));
      found += 1;
    }
  }
}
console.log("combats found", found);
