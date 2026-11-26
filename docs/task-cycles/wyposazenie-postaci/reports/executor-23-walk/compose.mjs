// Working script of executor-23: builds a saved document of a character with a stick in the chest,
// a program and a map run of forestDeep stopped a few minutes before the first wolf attack.
// Usage: node .runs/executor-23/compose.mjs <A|B|C> [searchFrom]   (run in the repository's root)
import { pathToFileURL } from "node:url";
import { join } from "node:path";

const sim = join(process.cwd(), "dist", "browser", "sim");
const load = (name) => import(pathToFileURL(join(sim, name)).href);
const { newGame, createCharacter, send, setProgram, withSaveTime, advanceMinutes } =
  await load("game.js");
const { discover } = await load("understanding.js");
const { savedGame } = await load("saved-game.js");

const variant = process.argv[2] ?? "A";
const searchFrom = Number(process.argv[3] ?? 1);
const always = { kind: "always" };
const strike = { kind: "strikeWithStick" };
const kick = { kind: "kick" };
const equipStick = { kind: "equip", item: "stick" };
const emptyHand = { kind: "emptyPlace", place: "mainHand" };
const opponent = { kind: "opponentHealthBelow", value: 99 };

import { readFileSync } from "node:fs";
const best = JSON.parse(readFileSync(".runs/executor-23/programs/forestDeepBest.json", "utf8"));
const combatRules = {
  A: [[always, strike], [always, kick]],
  B: [[always, strike], [always, kick]],
  C: [[opponent, equipStick], [always, strike], [always, kick]],
}[variant];
const asRule = ([condition, action]) => ({ id: 0, condition, action });
const groups = best.groups.map((g) =>
  g.name === "Walka" ? { ...g, rules: combatRules.map(asRule) } : g,
);
if (variant === "B")
  groups.unshift({ id: 0, name: "Wyposazenie", condition: always, rules: [asRule([emptyHand, equipStick])] });
let ruleId = 1;
groups.forEach((g, i) => {
  g.id = i + 1;
  g.rules = g.rules.map((r) => ({ ...r, id: ruleId++ }));
});
const prog = { tripPlan: best.tripPlan, groups, nextGroupId: groups.length + 1, nextRuleId: ruleId };

let base = createCharacter(newGame(), "Agent").state;
base = {
  ...base,
  solvedMaps: ["forestEdge", "forest"],
  team: { ...base.team, chest: { pieces: { stick: 15, berry: 15 } } },
};
// Everything the Understanding can hold, as a player late in the game would have it.
const dataOf = async (file, name) => (await load(`data/${file}.js`))[name];
const ACTIONS = await dataOf("actions", "ACTIONS");
const CONDITIONS = await dataOf("conditions", "CONDITIONS");
const ITEMS = await dataOf("items", "ITEMS");
const CREATURES = await dataOf("creatures", "CREATURES");
const SKILLS = await dataOf("skills", "SKILLS");
base = {
  ...base,
  understanding: {
    actions: Object.keys(ACTIONS),
    conditions: Object.keys(CONDITIONS),
    items: [...Object.keys(ITEMS), "campfire"],
    creatures: Object.keys(CREATURES),
    trees: Object.keys(SKILLS),
  },
};
base = setProgram(base, prog).state;

if (process.argv[4] === "start") {
  const state = send(base, { mapId: "forestDeep", characterId: 1 }, 1).state;
  process.stdout.write(`${JSON.stringify(savedGame(withSaveTime(state, Date.now())))}
`);
  process.exit(0);
}
let chosen = null;
for (let realMs = searchFrom; realMs < searchFrom + 400 && !chosen; realMs += 1) {
  let state = send(base, { mapId: "forestDeep", characterId: 1 }, realMs).state;
  for (let minute = 1; minute <= 400; minute += 1) {
    const stepped = advanceMinutes(state, 1);
    if (stepped.events.some((e) => e.kind === "attacked")) {
      if (state.run.body.health >= 40 && state.run.body.satiety > 20) chosen = { realMs, attack: minute };
      break;
    }
    state = stepped.state;
    if (!state.run || state.run.ended || stepped.events.some((e) => e.kind === "died")) break;
  }
}
if (!chosen) throw new Error("no seed found");
// Stand 3 minutes before the attack.
let state = send(base, { mapId: "forestDeep", characterId: 1 }, chosen.realMs).state;
while (state.run.minute < chosen.attack - 3) state = advanceMinutes(state, 1).state;
state = { ...state, discovery: null };
if (process.argv[4] === "empty" && state.run.character.gear.mainHand !== null) {
  const character = state.run.character;
  state = { ...state, run: { ...state.run, character: { ...character,
    gear: { ...character.gear, mainHand: null },
    backpack: { ...character.backpack, stick: character.backpack.stick + 1 } } } };
}
process.stderr.write(`realMs ${chosen.realMs} attack at minute ${chosen.attack}, run at ${state.run.minute}\n`);
process.stdout.write(`${JSON.stringify(savedGame(withSaveTime(state, Date.now())))}\n`);
