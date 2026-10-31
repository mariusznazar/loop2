import {
  advanceMinutes, createCharacter, mapRunEnded, newGame, send, setPaused,
  setProgram, settleDeath,
} from "/sim/game.js";
import { emptyProgram } from "/sim/programs.js";
import { loadSavedGame, savedGame } from "/sim/saved-game.js";
import { createGameView } from "/view/game-view.js";

const entry = (item, count) => ({ item, count });
const plan = { take: [entry("stick", 5)], bring: [entry("stick", 3), entry("berry", 4)] };

function sent(solved) {
  let state = createCharacter(newGame(), "Tester").state;
  state = { ...state, solvedMaps: solved ? ["forest"] : [], team: { ...state.team, chest: { pieces: { stick: 10 } } } };
  state = setProgram(state, { ...emptyProgram(), tripPlan: plan }).state;
  return setPaused(send(state, { mapId: "forest", characterId: 1 }, 23).state, true).state;
}
const completed = (s) =>
  advanceMinutes({ ...s, run: { ...s.run, minute: 479, streak: 479 } }, 1).state;
function died(s, readyAtMs) {
  const characters = s.team.characters.map((c) => ({ ...c, resurrectionReadyAtMs: readyAtMs }));
  let d = { ...s, team: { ...s.team, characters } };
  for (let i = 0; i < 50 && !mapRunEnded(d.run); i += 1)
    d = advanceMinutes(setPaused(d, false).state, 5000).state;
  return settleDeath(d, 1000).state;
}
function headquartersState() {
  const t = Date.now();
  let st = newGame();
  for (const name of ["Ala", "Bob", "Cyra", "Dan"]) st = createCharacter(st, name).state;
  const rows = [
    { generation: 1, resurrectionReadyAtMs: 0 },
    { generation: 2, resurrectionReadyAtMs: t + 3 * 3600000 + 20 * 60000 },
    { generation: 3, resurrectionReadyAtMs: t + 25 * 60000 },
    { generation: 1, resurrectionReadyAtMs: t + 45000 },
  ];
  const characters = st.team.characters.map((c, i) => ({ ...c, ...rows[i] }));
  return { ...st, team: { ...st.team, characters } };
}
const STATES = {
  hq: headquartersState,
  "going-unmarked": () => sent(false),
  "going-marked": () => sent(true),
  "done-unmarked": () => completed(sent(false)),
  "done-marked": () => completed(sent(true)),
  "death-used-unmarked": () => died(sent(false), 0),
  "death-lost-unmarked": () => died(sent(false), 9e9),
  "death-used-marked": () => died(sent(true), 0),
  "death-lost-marked": () => died(sent(true), 9e9),
};
const key = location.hash.slice(1);
const loaded = key.startsWith("loaded-");
let state = STATES[loaded ? key.slice(7) : key]();
if (loaded) {
  const l = loadSavedGame(savedGame(state));
  if (!l.ok) throw new Error("load refused " + l.reason);
  state = l.state;
}
const client = { saveGame: async () => ({ kind: "saved", revision: 1 }) };
const view = createGameView({ client, state, revision: 0, onConflict() {}, onOutdated() {}, onSignedOut() {} });
document.body.append(view.saveLine, view.element);
document.title = "ready " + key;
