// Working script of correction-1b: builds a saved document for one scenario of the walk.
// Usage (repository's root, after `npm run build`): node .runs/correction-1b/compose.mjs <scenario> [searchFrom]
// Scenarios:
//   teraz     - program with "Puste - Reka glowna -> Zaloz - patyk", map run of forestDeep at minute 0, hand empty
//   fightA    - the wolf meets the empty hand, rule list of the reference ("Walka": Uderz, Kopnij), 3 min before the attack
//   fightB    - same with the first group "Wyposazenie" holding the rule Puste->Zaloz patyk
//   fightC    - "Walka" holds "Przeciwnik ponizej 99 -> Zaloz patyk" first
//   already   - hand holds a stick, rule "Zawsze -> Zaloz - patyk" (refusal "juz zalozone")
//   full      - three pockets full, rule "Zawsze -> Zaloz - opatrunek" (refusal "kieszenie pelne")
//   pockets   - rule "Puste - Kieszen -> Zaloz - opatrunek", 3 bandages in the backpack, pockets empty
//   camp      - no map run; gear and a chest for the screen Postac
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { readFileSync } from "node:fs";

const sim = join(process.cwd(), "dist", "browser", "sim");
const load = (name) => import(pathToFileURL(join(sim, name)).href);
const { newGame, createCharacter, send, setProgram, withSaveTime, advanceMinutes } =
  await load("game.js");
const { savedGame, loadSavedGame } = await load("saved-game.js");

const scenario = process.argv[2] ?? "teraz";
const searchFrom = Number(process.argv[3] ?? 1);
const always = { kind: "always" };
const strike = { kind: "strikeWithStick" };
const kick = { kind: "kick" };
const equipStick = { kind: "equip", item: "stick" };
const equipBandage = { kind: "equip", item: "bandage" };
const emptyHand = { kind: "emptyPlace", place: "mainHand" };
const emptyPocket = { kind: "emptyPlace", place: "pocket" };
const opponent = { kind: "opponentHealthBelow", value: 99 };

const best = JSON.parse(
  readFileSync(".runs/correction-1b/programs/forestDeepBest.json", "utf8"),
);
const asRule = ([condition, action]) => ({ id: 0, condition, action });
const withCombat = (rules) =>
  best.groups.map((g) =>
    g.name === "Walka" ? { ...g, rules: rules.map(asRule) } : g,
  );
function program(source, take = best.tripPlan.take) {
  const groups = structuredClone(source);
  let ruleId = 1;
  groups.forEach((g, i) => {
    g.id = i + 1;
    g.rules = g.rules.map((r) => ({ ...r, id: ruleId++ }));
  });
  return {
    tripPlan: { ...best.tripPlan, take },
    groups,
    nextGroupId: groups.length + 1,
    nextRuleId: ruleId,
  };
}
const front = (rules) => ({ id: 0, name: "Wyposazenie", condition: always, rules: rules.map(asRule) });
const stdCombat = [[always, strike], [always, kick]];

let base = createCharacter(newGame(), "Agent").state;
base = {
  ...base,
  solvedMaps: ["forestEdge", "forest"],
  team: { ...base.team, chest: { pieces: { stick: 15, berry: 15, bandage: 6 } } },
};
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
    items: [...Object.keys(ITEMS), "campfire", "bandage"].filter((v, i, a) => a.indexOf(v) === i),
    creatures: Object.keys(CREATURES),
    trees: Object.keys(SKILLS),
  },
};

const programs = {
  teraz: program([front(a note of the author's private notes), ...withCombat(stdCombat)]),
  fightA: program(withCombat(stdCombat)),
  fightB: program([front(a note of the author's private notes), ...withCombat(stdCombat)]),
  fightC: program(withCombat([[opponent, equipStick], ...stdCombat])),
  already: program([front(a note of the author's private notes), ...withCombat(stdCombat)]),
  full: program([front(a note of the author's private notes), ...withCombat(stdCombat)]),
  pockets: program([front(a note of the author's private notes), ...withCombat(stdCombat)]),
  camp: program(withCombat(stdCombat)),
  gear: program(
    [
      front([
        [emptyHand, equipStick],
        [emptyPocket, equipBandage],
        [always, equipStick],
        [always, equipBandage],
      ]),
      ...withCombat(stdCombat),
    ],
    [{ item: "stick", count: 5 }, { item: "berry", count: 6 }, { item: "bandage", count: 4 }],
  ),
};
const prog = programs[scenario];
if (!prog) throw new Error(`no scenario ${scenario}`);
base = setProgram(base, prog).state;

function emit(state) {
  const saved = savedGame(withSaveTime(state, Date.now()));
  const loaded = loadSavedGame(JSON.parse(JSON.stringify(saved)));
  process.stderr.write(`loadSavedGame: ${JSON.stringify(loaded).slice(0, 160)}\n`);
  process.stdout.write(`${JSON.stringify(saved)}\n`);
}
const withRun = (state, patchCharacter) => {
  const c = state.run.character;
  return { ...state, run: { ...state.run, character: { ...c, ...patchCharacter(c) } } };
};

if (scenario === "camp") {
  // A character at the camp: stick in the hand, bandage in pocket 1 and 3, pocket 2 empty, chest holds bandages.
  const c = base.team.characters[0];
  const state = {
    ...base,
    team: {
      ...base.team,
      characters: [
        { ...c, gear: { ...c.gear, mainHand: "stick", pocket1: "bandage", pocket2: null, pocket3: "bandage" } },
      ],
    },
  };
  emit(state);
  process.exit(0);
}

if (["teraz", "already", "full", "pockets", "gear"].includes(scenario)) {
  let state = send(base, { mapId: "forestDeep", characterId: 1 }, 1).state;
  state = { ...state, discovery: null };
  if (scenario === "teraz")
    state = withRun(state, (c) => ({
      gear: { ...c.gear, mainHand: null },
      backpack: { ...c.backpack, stick: Math.max(c.backpack.stick, 8) },
    }));
  if (scenario === "already")
    state = withRun(state, (c) => ({
      gear: { ...c.gear, mainHand: "stick" },
      backpack: { ...c.backpack, stick: 5 },
    }));
  if (scenario === "full")
    state = withRun(state, (c) => ({
      gear: { ...c.gear, pocket1: "bandage", pocket2: "bandage", pocket3: "bandage" },
      backpack: { ...c.backpack, bandage: 2 },
    }));
  if (scenario === "pockets")
    state = withRun(state, (c) => ({
      gear: { ...c.gear, pocket1: null, pocket2: null, pocket3: null },
      backpack: { ...c.backpack, bandage: 3 },
    }));
  process.stderr.write(
    `minute ${state.run.minute} gear ${JSON.stringify(state.run.character.gear)} backpack ${JSON.stringify(state.run.character.backpack)}\n`,
  );
  emit(state);
  process.exit(0);
}

// A fight: the first realMs whose first wolf attack finds the character with health left.
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
let state = send(base, { mapId: "forestDeep", characterId: 1 }, chosen.realMs).state;
while (state.run.minute < chosen.attack - 3) state = advanceMinutes(state, 1).state;
state = { ...state, discovery: null };
if (state.run.character.gear.mainHand !== null)
  state = withRun(state, (c) => ({
    gear: { ...c.gear, mainHand: null },
    backpack: { ...c.backpack, stick: c.backpack.stick + 1 },
  }));
process.stderr.write(`realMs ${chosen.realMs} attack at minute ${chosen.attack}, run at ${state.run.minute}\n`);
emit(state);
