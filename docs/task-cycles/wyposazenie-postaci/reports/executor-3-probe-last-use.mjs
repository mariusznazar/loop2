// Probe: Ala (practice) and Ola (no practice) both die in the first minute of the catch-up with one use
// left. Ala, earlier on the list, spends the last use and keeps her gear; Ola then finds none left and
// loses hers, though her death spends no use (D-190, D-240).
import { createCharacter, setProgram, withSaveTime } from "../../dist/browser/sim/game.js";
import { catchUp, startLoop } from "../../dist/browser/sim/loop.js";
import { programFromRules } from "../../tests/sim/program-fixture.mjs";
import { newKnowingGame } from "../../tests/sim/understanding-fixture.mjs";
const T0 = 1_760_000_000_000;
const MIN = 60_000;
const STICK = { mainHand: "stick", secondHand: null, head: null, torso: null, legs: null, pocket1: null, pocket2: null, pocket3: null };
let s = setProgram(newKnowingGame(), programFromRules()).state;
s = createCharacter(s, "Ala").state;
s = createCharacter(s, "Ola").state;
s = { ...s, solvedMaps: ["forestEdge", "forest"] };
s = { ...s, team: { ...s.team, resurrectionUsesSpent: 2, resurrectionNextReturnAtMs: T0 + 10_000 * MIN,
  characters: s.team.characters.map((c) => ({ ...c, gear: STICK,
    skills: c.id === 1 ? Object.fromEntries(Object.entries(c.skills).map(([k, v]) => [k, { ...v, practice: 1 }])) : c.skills })) } };
s = startLoop(s, { mapId: "forest", characterId: 1 }, T0).state;
s = startLoop(s, { mapId: "forest", characterId: 2 }, T0).state;
for (const id of [1, 2]) s = { ...s, loops: { ...s.loops, [id]: { ...s.loops[id], run: { ...s.loops[id].run, body: { temperature: 30, satiety: 100, health: 0.1 } } } } };
s = withSaveTime(s, T0);
const after = catchUp(s, T0 + 2 * MIN).state;
const g = (id) => after.team.characters.find((c) => c.id === id).gear.mainHand;
console.log("uses spent", after.team.resurrectionUsesSpent, "Ala hand", g(1), "Ola hand", g(2), "Ola loop", after.loops[2] !== undefined);
